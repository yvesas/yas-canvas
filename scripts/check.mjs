#!/usr/bin/env node
// Validação estática das skills. Roda em Node puro de propósito: precisa
// funcionar na máquina de quem acabou de clonar, antes de instalar qualquer
// coisa. É a camada barata — pega 90% dos defeitos em menos de um segundo.
//
// O que ela não faz: julgar se a skill conduz bem uma conversa. Isso é eval
// com modelo juiz, mora em test/, custa dinheiro e exige Bun.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKILLS = join(ROOT, "skills");
const SHARED = join(ROOT, "shared");
const PREAMBLE = join(SHARED, "preamble.md");

// Teto de linhas por skill. Skill que ninguém lê inteira não é seguida
// inteira — e o agente paga o contexto de qualquer jeito.
const MAX_LINES = 400;

// Markdown quebra linha a cada ~80 colunas, então uma sentença inteira nunca
// casa com `includes` cru. Comparar sem quebra é o que permite âncora longa —
// e âncora precisa ser longa para não acusar cópia por coincidência.
const flat = (t) => t.replace(/\s+/g, " ");

const errors = [];
const warnings = [];

const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

if (!existsSync(PREAMBLE)) {
  fail("shared/preamble.md", "não existe — é a fonte única do preâmbulo");
}
const preamble = existsSync(PREAMBLE) ? readFileSync(PREAMBLE, "utf8") : "";

// Frases do preâmbulo que não podem aparecer coladas dentro de uma skill.
// Se aparecerem, alguém duplicou a fonte e as duas vão divergir.
const FINGERPRINTS = {
  preamble: [
    "Concordar por educação destrói o valor da sessão inteira",
    "Despejar seis perguntas de uma vez produz seis respostas rasas",
    "Inventar API, comando ou comportamento é a falha mais cara",
  ],
  // Âncora é sentença inteira e distintiva, nunca expressão curta: a primeira
  // versão acusou cópia por causa de "aprovação com comentários", quatro
  // palavras que qualquer texto sobre revisão usa — e acusar errado é como um
  // validador ensina a ignorá-lo.
  "review-protocol": [
    "Opinar sem abrir o que existe produz a revisão genérica que não muda nada",
    "arbitrar um valor e revisar em cima dele é revisar o seu palpite",
    "quem lê para agir lê de cima para baixo e para quando acaba o tempo",
  ],
};

const fingerprintsOf = (item) => FINGERPRINTS[item] || [];

// Frase-âncora que sumiu da fonte deixa de proteger coisa nenhuma, em silêncio.
for (const [item, phrases] of Object.entries(FINGERPRINTS)) {
  const file = join(SHARED, `${item}.md`);
  if (!existsSync(file)) {
    fail(`shared/${item}.md`, "citado em FINGERPRINTS e não existe");
    continue;
  }
  const content = flat(readFileSync(file, "utf8"));
  for (const phrase of phrases) {
    if (!content.includes(flat(phrase))) {
      fail("scripts/check.mjs", `a frase-âncora "${phrase.slice(0, 40)}…" sumiu de ${item}.md; atualize FINGERPRINTS junto`);
    }
  }
}

// --- frontmatter mínimo ------------------------------------------------------
const REQUIRED = ["name", "shared", "description", "allowed-tools", "triggers"];

function frontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  return text.slice(4, end);
}

const skills = existsSync(SKILLS)
  ? readdirSync(SKILLS).filter((d) => statSync(join(SKILLS, d)).isDirectory()).sort()
  : [];

if (skills.length === 0) fail("skills/", "nenhuma skill encontrada");

for (const dir of skills) {
  const rel = `skills/${dir}/SKILL.md`;
  const file = join(SKILLS, dir, "SKILL.md");

  if (!/^[a-z0-9-]+$/.test(dir)) {
    fail(rel, `nome de pasta fora do padrão: kebab-case, sem acento (regra code-style.md)`);
  }
  if (!existsSync(file)) {
    fail(rel, "pasta de skill sem SKILL.md");
    continue;
  }

  const text = readFileSync(file, "utf8");
  const fm = frontmatter(text);
  if (!fm) {
    fail(rel, "sem frontmatter YAML no topo");
    continue;
  }

  for (const key of REQUIRED) {
    if (!new RegExp(`^${key}:`, "m").test(fm)) fail(rel, `frontmatter sem \`${key}\``);
  }

  const name = (fm.match(/^name:\s*(\S+)/m) || [])[1];
  if (name && name !== dir) fail(rel, `\`name: ${name}\` não bate com a pasta \`${dir}\``);

  // O contrato do compartilhado tem três lados, e todos os três são cobrados:
  // o arquivo declarado existe, a skill manda lê-lo, e ninguém cola trecho.
  const declared = ((fm.match(/^shared:\s*\[(.*)\]/m) || [])[1] || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  if (!declared.includes("preamble")) {
    fail(rel, "não declara `preamble` em `shared:` — toda skill começa por ele");
  }

  for (const item of declared) {
    if (!existsSync(join(SHARED, `${item}.md`))) {
      fail(rel, `declara \`${item}\` em shared:, e shared/${item}.md não existe`);
      continue;
    }
    if (!new RegExp(`${item}\\.md`).test(text)) {
      fail(rel, `declara \`${item}\` e nunca manda lê-lo — arquivo copiado que ninguém abre`);
    }
    for (const phrase of fingerprintsOf(item)) {
      if (flat(text).includes(flat(phrase))) {
        fail(rel, `copiou um trecho de ${item}.md ("${phrase.slice(0, 40)}…") — leia, não cole`);
      }
    }
  }

  // --- as partes --------------------------------------------------------
  //
  // Role de revisão é a que declara o protocolo; só ela tem partes. Um canvas
  // conduz uma pessoa em vez de avaliar um artefato, e não tem o que listar
  // num menu — por isso a cobrança sai do `shared:`, e não de uma lista de
  // nomes aqui dentro, que envelheceria a cada skill nova.
  const parts = ((fm.match(/^parts:\s*\[(.*)\]/m) || [])[1] || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  if (declared.includes("review-protocol") && parts.length === 0) {
    fail(rel, "declara `review-protocol` e não declara `parts:` — sem partes não há menu");
  }

  const body = text.slice(text.indexOf("\n---", 3));
  for (const part of parts) {
    if (!/^[a-z0-9-]+$/.test(part)) {
      fail(rel, `parte \`${part}\` fora do padrão: kebab-case, sem acento (regra code-style.md)`);
      continue;
    }
    // Com crase, porque é assim que a skill se refere a uma parte — e porque
    // `tests` solto casaria com qualquer frase sobre teste.
    if (!body.includes(`\`${part}\``)) {
      fail(rel, `declara a parte \`${part}\` e não a conduz no corpo — parte que só existe no frontmatter não aparece em menu nenhum`);
    }
  }

  const lines = text.split("\n").length;
  if (lines > MAX_LINES) warn(rel, `${lines} linhas (teto ${MAX_LINES}) — corte ou divida`);
}

// --- o roteador só pode apontar para skill que existe ------------------------
const routerFile = join(SKILLS, "canvas", "SKILL.md");
if (existsSync(routerFile)) {
  const router = readFileSync(routerFile, "utf8");
  const routed = [...router.matchAll(/`\/([a-z0-9-]+)`/g)].map((m) => m[1]);
  const known = new Set(skills);
  // Comandos do baseline do projeto, que o roteador cita para mandar embora.
  const external = new Set(["commit", "pr", "spec", "branch", "state", "stack", "new-project"]);
  for (const target of new Set(routed)) {
    if (!known.has(target) && !external.has(target)) {
      fail("skills/canvas/SKILL.md", `roteia para \`/${target}\`, que não existe em skills/`);
    }
  }
  for (const skill of skills) {
    if (skill !== "canvas" && !routed.includes(skill)) {
      warn("skills/canvas/SKILL.md", `\`/${skill}\` existe mas o roteador não cita — ninguém vai achar`);
    }
  }
}

// --- fixtures de eval --------------------------------------------------------
//
// A camada barata valida a entrada da camada cara: fixture torta só aparece
// depois de gastar uma sessão de modelo, e aí o erro parece da skill.
const FIXTURES = join(ROOT, "test", "fixtures");
const FIXTURE_FILES = ["prompt.txt", "rubric.md", "expect.json"];
const STATUS = new Set(["pendente", "respondido", "descartado"]);

// Os arquivos de parte que uma fixture semeia, em qualquer profundidade.
function answerFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) answerFiles(full, out);
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}
const EXPECT_KEYS = new Set([
  "descricao", "mustContainAll", "mustNotContainAny",
  "mustWriteFileContaining", "maxInvestigativeCalls", "minToolCalls", "driver",
]);

if (existsSync(FIXTURES)) {
  const dirs = readdirSync(FIXTURES).filter((d) => statSync(join(FIXTURES, d)).isDirectory()).sort();
  if (dirs.length === 0) warn("test/fixtures/", "nenhuma fixture — os evals não exercitam nada");

  for (const dir of dirs) {
    const rel = `test/fixtures/${dir}`;
    for (const file of FIXTURE_FILES) {
      if (!existsSync(join(FIXTURES, dir, file))) fail(rel, `falta ${file}`);
    }

    const expectPath = join(FIXTURES, dir, "expect.json");
    if (existsSync(expectPath)) {
      let expect;
      try {
        expect = JSON.parse(readFileSync(expectPath, "utf8"));
      } catch (err) {
        fail(`${rel}/expect.json`, `JSON inválido: ${err.message}`);
      }
      if (expect) {
        if (!expect.descricao) fail(`${rel}/expect.json`, "sem `descricao` — ela vira a mensagem de falha do teste");

        // O driver conduz a sessão por vários turnos. Campo torto aqui custa
        // uma rodada inteira de modelo para aparecer.
        const d = expect.driver;
        if (d !== undefined) {
          if (typeof d !== "object" || d === null) {
            fail(`${rel}/expect.json`, "`driver` precisa ser um objeto");
          } else {
            if (typeof d.reply !== "string" || !d.reply.trim()) {
              fail(`${rel}/expect.json`, "`driver.reply` vazio — é a resposta que o usuário daria a cada seção");
            }
            if (typeof d.maxTurns !== "number" || d.maxTurns < 2 || d.maxTurns > 12) {
              fail(`${rel}/expect.json`, "`driver.maxTurns` fora de 2..12 — abaixo não conduz, acima é dinheiro queimado");
            }
            if (d.stopWhen !== undefined && typeof d.stopWhen !== "string") {
              fail(`${rel}/expect.json`, "`driver.stopWhen` precisa ser string");
            }
          }
        }
        for (const key of Object.keys(expect)) {
          if (!EXPECT_KEYS.has(key)) fail(`${rel}/expect.json`, `chave desconhecida \`${key}\` — o harness ignora, e um teste que ignora expectativa mente`);
        }
      }
    }

    // Fixture que semeia estado carrega arquivos de parte prontos, como se uma
    // sessão anterior os tivesse escrito. Eles são o contrato de verdade que
    // este repositório consegue validar: o arquivo de um projeto de terceiro
    // nunca passa por aqui (ver 0003/design.md §8).
    const seeded = join(FIXTURES, dir, "specs", "canvas");
    if (existsSync(seeded)) {
      for (const file of answerFiles(seeded)) {
        const relFile = `${rel}/${file.slice(join(FIXTURES, dir).length + 1)}`;
        const fm = frontmatter(readFileSync(file, "utf8"));
        if (!fm) {
          fail(relFile, "arquivo de parte sem frontmatter — é ele que o controlador lê");
          continue;
        }
        for (const key of ["role", "parte", "status"]) {
          if (!new RegExp(`^${key}:`, "m").test(fm)) fail(relFile, `frontmatter sem \`${key}\``);
        }
        const status = (fm.match(/^status:\s*(\S+)/m) || [])[1];
        if (status && !STATUS.has(status)) {
          fail(relFile, `\`status: ${status}\` fora do conjunto (${[...STATUS].join(" | ")})`);
        }
      }
    }

    const rubricPath = join(FIXTURES, dir, "rubric.md");
    if (existsSync(rubricPath)) {
      const ids = [...readFileSync(rubricPath, "utf8").matchAll(/^\d+\.\s+`([a-z0-9_]+)`/gm)].map((m) => m[1]);
      if (ids.length === 0) fail(`${rel}/rubric.md`, "nenhum critério no formato `1. \`id\` — ...`; o juiz precisa de ids");
      const seen = new Set();
      for (const id of ids) {
        if (seen.has(id)) fail(`${rel}/rubric.md`, `critério duplicado: \`${id}\``);
        seen.add(id);
      }
    }

    const promptPath = join(FIXTURES, dir, "prompt.txt");
    if (existsSync(promptPath)) {
      const invoked = (readFileSync(promptPath, "utf8").match(/^\/([a-z0-9-]+)/) || [])[1];
      if (!invoked) {
        warn(`${rel}/prompt.txt`, "não invoca skill nenhuma (/nome no começo) — o eval vira teste do modelo, não da skill");
      } else if (!skills.includes(invoked)) {
        fail(`${rel}/prompt.txt`, `invoca \`/${invoked}\`, que não existe em skills/`);
      }
    }
  }
}

// --- saída -------------------------------------------------------------------
for (const w of warnings) console.warn(`  ⚠ ${w}`);
if (errors.length > 0) {
  for (const e of errors) console.error(`  ⛔ ${e}`);
  console.error(`\n✗ ${errors.length} erro(s) em ${skills.length} skill(s)`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skill(s) válidas${warnings.length ? ` · ${warnings.length} aviso(s)` : ""}`);
