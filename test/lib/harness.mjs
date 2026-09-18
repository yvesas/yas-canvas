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
const TIMEOUT_MS = Number(process.env.YAS_EVAL_TIMEOUT_MS || 300000);

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
    cpSync(join(fixture.dir, file), join(dir, file));
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

export function runSubject(fixture) {
  const cwd = stageProject(fixture);
  const args = [
    "-p", fixture.prompt,
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

  const run = spawnSync("claude", args, { cwd, encoding: "utf8", timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 });
  if (run.error) throw new Error(`claude não rodou para '${fixture.name}': ${run.error.message}`);

  const parsed = parseStream(run.stdout || "");
  return { ...parsed, cwd, stderr: run.stderr, status: run.status };
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
  if (typeof e.maxToolCalls === "number" && session.toolCalls.length > e.maxToolCalls) {
    const nomes = session.toolCalls.map((t) => t.name).join(", ");
    problems.push(`usou ${session.toolCalls.length} ferramenta(s) (teto ${e.maxToolCalls}): ${nomes}`);
  }
  if (typeof e.minToolCalls === "number" && session.toolCalls.length < e.minToolCalls) {
    problems.push(`usou ${session.toolCalls.length} ferramenta(s), esperado ao menos ${e.minToolCalls}`);
  }
  if (e.mustWriteFileContaining) {
    if (!wroteFileContaining(session.cwd, e.mustWriteFileContaining)) {
      problems.push(`nenhum arquivo escrito contém "${e.mustWriteFileContaining}" — a sessão terminou só no chat`);
    }
  }
  return problems;
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
  const prompt = [
    "Você julga a transcrição de uma sessão de agente contra critérios objetivos.",
    "Não seja generoso: a dúvida conta como falha, e evidência é citação literal da transcrição.",
    "Responda apenas o JSON do schema, com um item por critério, usando o id exato do critério.",
    "",
    "## Critérios",
    fixture.rubric,
    "",
    "## Transcrição",
    "<<<TRANSCRICAO",
    session.text.slice(0, 120000),
    "TRANSCRICAO",
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
    { input: prompt, encoding: "utf8", timeout: TIMEOUT_MS, maxBuffer: 16 * 1024 * 1024 },
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
