// Bancada dos evals: roda uma skill numa sessão real do Claude Code e devolve a
// transcrição em pedaços que dá para afirmar coisa sobre.
//
// Duas camadas, nesta ordem, porque a ordem é o que segura o custo:
//   1. checagens determinísticas — string, contagem de tool call, arquivo
//      escrito. Grátis, e pega a maioria das regressões de protocolo.
//   2. modelo juiz — só o que é julgamento ("empurrou por especificidade?").
//
// Nada aqui roda no hook: eval custa dinheiro e demora. É `npm run eval`,
// à mão, e no CI só quando alguém pedir.
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtempSync, mkdirSync, cpSync, readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const FIXTURES = join(ROOT, "test", "fixtures");

// O sujeito é o modelo que usa a skill; o juiz é outro, de propósito — modelo
// que julga a própria transcrição tende a se achar ótimo.
const SUBJECT_MODEL = process.env.YAS_EVAL_SUBJECT_MODEL || "opus";
const JUDGE_MODEL = process.env.YAS_EVAL_JUDGE_MODEL || "sonnet";
const BUDGET_USD = process.env.YAS_EVAL_BUDGET_USD || "2";
// Por TURNO, não por fixture. Com nove turnos e o relatório escrito em arquivo,
// a transcrição cresce e um turno sozinho passou dos cinco minutos — a suíte
// caiu com ETIMEDOUT, que não é falha de skill nem de juiz e custa a rodada
// inteira para descobrir.
//
// Dez minutos ainda derrubaram uma fixture de UM turno, o que não é protocolo
// longo: é a API lenta naquela hora. O teto existe para o turno travado, não
// para o turno devagar — então ele é generoso de propósito.
const TIMEOUT_MS = Number(process.env.YAS_EVAL_TIMEOUT_MS || 900000);

// Ferramenta que olha o projeto. O portão de escopo proíbe ISTO antes da
// pergunta — não "chamar ferramenta". Contar tudo reprovava a sessão por um
// ToolSearch, que carrega schema e não lê arquivo nenhum: teste medindo o
// sintoma errado reprova comportamento correto, que é como um teste perde a
// confiança de quem o lê.
export const INVESTIGATIVE_TOOLS = new Set([
  "Read", "Grep", "Glob", "LS", "Bash", "BashOutput",
  "Edit", "Write", "MultiEdit", "NotebookEdit",
  "WebFetch", "WebSearch", "Agent", "Task",
]);

export function claudeAvailable() {
  return spawnSync("claude", ["--version"], { encoding: "utf8" }).status === 0;
}

export function listFixtures() {
  if (!existsSync(FIXTURES)) return [];
  return readdirSync(FIXTURES)
    .filter((d) => statSync(join(FIXTURES, d)).isDirectory())
    .sort();
}

export function readFixture(name) {
  const dir = join(FIXTURES, name);
  return {
    name,
    dir,
    prompt: readFileSync(join(dir, "prompt.txt"), "utf8").trim(),
    rubric: readFileSync(join(dir, "rubric.md"), "utf8"),
    expect: JSON.parse(readFileSync(join(dir, "expect.json"), "utf8")),
  };
}

// Um projeto descartável com o pack instalado do jeito que o usuário instala.
// Testar o repositório em vez do resultado da instalação já deixou passar
// bug de instalador em todo projeto que tenta o atalho.
function stageProject(fixture) {
  const dir = mkdtempSync(join(tmpdir(), "yas-eval-"));
  mkdirSync(join(dir, ".claude"), { recursive: true });

  for (const file of readdirSync(fixture.dir)) {
    if (file === "prompt.txt" || file === "rubric.md" || file === "expect.json") continue;
    // `recursive`: a fixture que semeia estado traz `specs/canvas/<role>/…`, e
    // `cpSync` sem isto lança em diretório. Sem a linha, a fixture da volta não
    // chega nem a rodar.
    cpSync(join(fixture.dir, file), join(dir, file), { recursive: true });
  }

  const install = spawnSync(join(ROOT, "bin", "install"), ["--project", dir], { encoding: "utf8" });
  if (install.status !== 0) {
    throw new Error(`bin/install falhou no projeto de teste:\n${install.stderr || install.stdout}`);
  }
  return dir;
}

// A transcrição vem como NDJSON. O que interessa: o texto que o usuário veria e
// a ORDEM das chamadas de ferramenta — é ela que prova se o portão de escopo
// disparou antes de qualquer leitura.
function parseStream(stdout) {
  const text = [];
  const toolCalls = [];
  let result = "";

  for (const line of stdout.split("\n")) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (event.type === "assistant" && event.message?.content) {
      for (const block of event.message.content) {
        if (block.type === "text") text.push(block.text);
        if (block.type === "tool_use") toolCalls.push({ name: block.name, input: block.input });
      }
    }
    if (event.type === "result" && typeof event.result === "string") result = event.result;
  }

  return { text: [...text, result].join("\n\n"), toolCalls };
}

function claudeArgs(extra) {
  return [
    ...extra,
    "--output-format", "stream-json",
    "--verbose",
    "--model", SUBJECT_MODEL,
    "--permission-mode", "acceptEdits",
    // Sem as configurações do usuário: o eval mede a skill, não o setup de
    // quem roda. E sem busca na web, que torna a sessão não reproduzível.
    "--setting-sources", "project",
    "--disallowedTools", "WebSearch", "WebFetch",
    "--max-budget-usd", BUDGET_USD,
  ];
}

// O protocolo destas skills é interativo: uma seção por vez, parando para a
// resposta. `claude -p` é um turno só, então a primeira versão desta bancada
// cobrava da sessão, num turno, o que a skill só faz em vários — e a fixture
// ficava vermelha por defeito do teste, não da skill.
//
// Aqui a sessão é conduzida: turno 1 com `--session-id`, os seguintes com
// `--resume`, mandando a resposta roteirizada da fixture até aparecer o marco
// de parada (`stopWhen`) ou acabar o teto de turnos. É o usuário dizendo
// "concordo, segue" — que é exatamente o que o protocolo espera receber.
export function runSubject(fixture) {
  const cwd = stageProject(fixture);
  const sessionId = randomUUID();
  const driver = fixture.expect.driver;

  const text = [];
  const toolCalls = [];
  let turns = 0;
  let reachedStop = false;

  const turn = (args) => {
    const run = spawnSync("claude", claudeArgs(args), {
      cwd,
      encoding: "utf8",
      timeout: TIMEOUT_MS,
      maxBuffer: 64 * 1024 * 1024,
    });
    if (run.error) {
      const hint = run.error.code === "ETIMEDOUT"
        ? ` — o turno passou de ${Math.round(TIMEOUT_MS / 1000)}s; suba YAS_EVAL_TIMEOUT_MS ou encurte o protocolo`
        : "";
      throw new Error(`claude não rodou para '${fixture.name}': ${run.error.message}${hint}`);
    }
    const parsed = parseStream(run.stdout || "");
    text.push(parsed.text);
    toolCalls.push(...parsed.toolCalls);
    turns += 1;
    return run;
  };

  turn(["-p", fixture.prompt, "--session-id", sessionId]);

  if (driver) {
    const maxTurns = driver.maxTurns ?? 5;
    while (turns < maxTurns) {
      if (driver.stopWhen && text.join("\n").includes(driver.stopWhen)) {
        reachedStop = true;
        break;
      }
      turn(["-p", driver.reply, "--resume", sessionId]);
    }
    if (!reachedStop && driver.stopWhen) {
      reachedStop = text.join("\n").includes(driver.stopWhen);
    }
  }

  // Ler o `preamble.md` ou o `review-protocol.md` que vieram instalados ao lado
  // da skill não é investigar o projeto de ninguém: é a skill carregando o
  // próprio texto. Contar isso reprovava o portão de escopo por cumprir a
  // instrução seguinte.
  const ownFile = (t) =>
    t.name === "Read" && typeof t.input?.file_path === "string" && t.input.file_path.includes("/.claude/skills/");
  const investigative = toolCalls.filter((t) => INVESTIGATIVE_TOOLS.has(t.name) && !ownFile(t));
  return { text: text.join("\n\n"), toolCalls, investigative, cwd, turns, reachedStop, driver };
}

// --- camada 1: o que dá para afirmar sem gastar token ------------------------
export function deterministicFailures(fixture, session) {
  const e = fixture.expect;
  const problems = [];
  const haystack = session.text.toLowerCase();

  for (const needle of e.mustContainAll || []) {
    if (!haystack.includes(needle.toLowerCase())) problems.push(`faltou dizer "${needle}"`);
  }
  for (const needle of e.mustNotContainAny || []) {
    if (haystack.includes(needle.toLowerCase())) problems.push(`disse o que não devia: "${needle}"`);
  }
  if (typeof e.maxInvestigativeCalls === "number" && session.investigative.length > e.maxInvestigativeCalls) {
    const nomes = session.investigative.map((t) => t.name).join(", ");
    problems.push(
      `investigou ${session.investigative.length} vez(es) (teto ${e.maxInvestigativeCalls}): ${nomes}`,
    );
  }
  if (typeof e.minToolCalls === "number" && session.toolCalls.length < e.minToolCalls) {
    problems.push(`usou ${session.toolCalls.length} ferramenta(s), esperado ao menos ${e.minToolCalls}`);
  }
  if (e.driver?.stopWhen && !session.reachedStop) {
    problems.push(
      `a sessão não chegou a "${e.driver.stopWhen}" em ${session.turns} turno(s) — ` +
        `o protocolo não fechou, ou o teto de turnos é baixo demais`,
    );
  }
  if (e.mustWriteFileContaining) {
    if (!wroteFileContaining(session.cwd, e.mustWriteFileContaining)) {
      problems.push(`nenhum arquivo escrito contém "${e.mustWriteFileContaining}" — a sessão terminou só no chat`);
    }
  }
  return problems;
}

// O relatório é escrito NO ARQUIVO, não no chat. O juiz lia só a transcrição e
// reprovava por não achar o que estava no disco — julgando a narração em vez do
// entregável. Aqui a bancada recolhe o que a sessão escreveu.
export function writtenArtifacts(dir, needle, depth = 0, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".claude" || entry === ".git" || entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      writtenArtifacts(full, needle, depth + 1, out);
      continue;
    }
    try {
      const content = readFileSync(full, "utf8");
      if (content.includes(needle)) out.push({ path: full.slice(dir.length + 1), content });
    } catch {
      /* binário, ignora */
    }
  }
  return out;
}

function wroteFileContaining(dir, needle, depth = 0) {
  if (depth > 6) return false;
  for (const entry of readdirSync(dir)) {
    if (entry === ".claude" || entry === ".git" || entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (wroteFileContaining(full, needle, depth + 1)) return true;
      continue;
    }
    try {
      if (readFileSync(full, "utf8").includes(needle)) return true;
    } catch {
      /* binário, ignora */
    }
  }
  return false;
}

// --- camada 2: o juiz --------------------------------------------------------
const JUDGE_SCHEMA = {
  type: "object",
  properties: {
    criterios: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          passou: { type: "boolean" },
          evidencia: { type: "string" },
        },
        required: ["id", "passou", "evidencia"],
      },
    },
  },
  required: ["criterios"],
};

export function judge(fixture, session) {
  const marker = fixture.expect.mustWriteFileContaining || fixture.expect.driver?.stopWhen;
  const artifacts = marker ? writtenArtifacts(session.cwd, marker) : [];

  const prompt = [
    "Você julga a transcrição de uma sessão de agente contra critérios objetivos.",
    "Não seja generoso: a dúvida conta como falha, e evidência é citação literal da transcrição.",
    "Responda apenas o JSON do schema, com um item por critério, usando o id exato do critério.",
    "",
    "## Critérios",
    fixture.rubric,
    "",
    "## Ferramentas que a sessão chamou, em ordem",
    session.toolCalls.length
      ? session.toolCalls.map((t, i) => `${i + 1}. ${t.name}`).join("\n")
      : "(nenhuma)",
    "",
    "Esta lista é o fato. Não deduza uso de ferramenta a partir do texto: o",
    "agente sabe o diretório e o estado do git pelo contexto da sessão, sem",
    "rodar comando. Se a lista não traz a ferramenta, ela não foi chamada.",
    "",
    "E o ambiente do agente NÃO é o seu. Ele rodou num projeto descartável, que",
    "não é repositório git e não tem os arquivos que você enxerga daqui. O que o",
    "seu próprio contexto diz sobre diretório, git ou arquivo não é prova de",
    "nada sobre a sessão julgada — a transcrição é a única fonte.",
    "",
    "## Transcrição",
    "<<<TRANSCRICAO",
    session.text.slice(0, 100000),
    "TRANSCRICAO",
    "",
    ...(artifacts.length
      ? [
          "## O que a sessão escreveu em arquivo",
          "Isto é entregável, não narração — julgue os dois juntos. Conteúdo que",
          "está aqui conta como produzido, mesmo que o chat não o repita.",
          ...artifacts.map((a) => `### ${a.path}\n<<<ARQUIVO\n${a.content.slice(0, 40000)}\nARQUIVO`),
        ]
      : []),
  ].join("\n");

  const run = spawnSync(
    "claude",
    [
      "-p",
      "--output-format", "json",
      "--model", JUDGE_MODEL,
      "--json-schema", JSON.stringify(JUDGE_SCHEMA),
      "--setting-sources", "project",
      "--disallowedTools", "WebSearch", "WebFetch", "Read", "Bash",
      "--max-budget-usd", BUDGET_USD,
    ],
    {
      input: prompt,
      encoding: "utf8",
      timeout: TIMEOUT_MS,
      maxBuffer: 16 * 1024 * 1024,
      // Num diretório vazio: rodando dentro do repo, o juiz lia o PRÓPRIO
      // contexto ("Is a git repository: true") como se fosse o da sessão e
      // reprovou o agente por dizer a verdade sobre o projeto de teste.
      cwd: mkdtempSync(join(tmpdir(), "yas-judge-")),
    },
  );

  if (run.error) throw new Error(`o juiz não rodou: ${run.error.message}`);

  const envelope = JSON.parse(run.stdout);
  // O objeto estruturado pode vir pronto ou como string em `result`, conforme a
  // versão do CLI. Tentar os dois é mais barato que fixar uma e quebrar depois.
  const raw = envelope.structured_output ?? envelope.structuredOutput ?? envelope.result;
  const verdict = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!verdict?.criterios) throw new Error(`resposta do juiz sem 'criterios': ${run.stdout.slice(0, 400)}`);
  return verdict.criterios;
}

export const config = { SUBJECT_MODEL, JUDGE_MODEL, BUDGET_USD, TIMEOUT_MS };
