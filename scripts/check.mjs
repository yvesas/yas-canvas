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
const PREAMBLE = join(ROOT, "shared", "preamble.md");

// Teto de linhas por skill. Skill que ninguém lê inteira não é seguida
// inteira — e o agente paga o contexto de qualquer jeito.
const MAX_LINES = 400;

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
const FINGERPRINTS = [
  "Concordar por educação destrói o valor da sessão inteira",
  "Despejar seis perguntas de uma vez produz seis respostas rasas",
  "Inventar API, comando ou comportamento é a falha mais cara",
];
for (const phrase of FINGERPRINTS) {
  if (preamble && !preamble.includes(phrase)) {
    fail("scripts/check.mjs", `a frase-âncora "${phrase.slice(0, 40)}…" sumiu do preâmbulo; atualize FINGERPRINTS junto`);
  }
}

// --- frontmatter mínimo ------------------------------------------------------
const REQUIRED = ["name", "description", "allowed-tools", "triggers"];

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

  // O preâmbulo é lido, nunca copiado.
  if (!/preamble\.md/.test(text)) {
    fail(rel, "não manda ler o preamble.md — toda skill começa por ele");
  }
  for (const phrase of FINGERPRINTS) {
    if (text.includes(phrase)) {
      fail(rel, `copiou um trecho do preâmbulo ("${phrase.slice(0, 40)}…") — leia, não cole`);
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

// --- saída -------------------------------------------------------------------
for (const w of warnings) console.warn(`  ⚠ ${w}`);
if (errors.length > 0) {
  for (const e of errors) console.error(`  ⛔ ${e}`);
  console.error(`\n✗ ${errors.length} erro(s) em ${skills.length} skill(s)`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skill(s) válidas${warnings.length ? ` · ${warnings.length} aviso(s)` : ""}`);
