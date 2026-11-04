#!/usr/bin/env node
// Gera `dist/` — o que a release anexa. Feature 0011.
//
//   dist/<skill>/        a pasta que o `bin/install` produziria (SKILL.md, os
//                        shared declarados, as references declaradas)
//   dist/<skill>.zip     a mesma pasta, para enviar ao app do Claude
//   dist/<skill>.md      tudo num markdown só, sem nada que só exista no
//                        Claude Code — para colar em outra IA
//   dist/yas-canvas.zip  as oito pastas, para copiar para a pasta de skills
//   dist/notes/<v>.md    a seção do CHANGELOG da versão, corpo da release
//
// Determinístico: duas execuções seguidas produzem os mesmos bytes, zip
// incluído. Nada aqui escreve fora de `dist/`.

import { execFileSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { body, frontmatter, listField, scalarField } from "./lib/frontmatter.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SKILLS = join(ROOT, "skills");
const SHARED = join(ROOT, "shared");
const DIST = join(ROOT, "dist");

// --- a neutralização ----------------------------------------------------------
//
// É a parte que mais vai mudar, por isso mora aqui em cima, numa lista, e não
// espalhada pelo código (design da 0011). Cada regra troca uma instrução que só
// faz sentido no Claude Code pelo comportamento que ela pede. Frase quebrada em
// linha casa do mesmo jeito: o espaço da regra vale qualquer espaço do texto.
//
// A ordem importa: as regras de "ao lado" rodam antes da troca de nome de
// arquivo por nome de seção, porque elas casam com o nome do arquivo.

const SECTIONS = {
  preamble: "Preâmbulo",
  "session-protocol": "Protocolo de sessão",
  "review-protocol": "Protocolo de revisão",
  handoff: "Handoff",
};

const words = (s) => new RegExp(s.trim().split(/\s+/).map(escape).join("\\s+"), "g");
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const RULES = [
  // Nota de quem mantém o pack, não de quem usa a skill.
  [/> Toda skill lê este arquivo no primeiro passo\.[\s\S]*?0001-shared-preamble\.md`\.\n\n/g, ""],
  [/\s*\(no repositório do\s+pack:\s+`shared\/preamble\.md`\)/g, ""],

  // O portão: "chamada de ferramenta" é garantia do Claude Code; em outra IA a
  // regra precisa ser dita em palavras.
  [words("primeira chamada de ferramenta é"), "primeira coisa que você faz é"],
  [words("primeira chamada de ferramenta?"), "primeira coisa que você fez?"],
  [words("dois `Read`"), "duas leituras"],

  // Os arquivos "ao lado" viraram anexos no fim deste.
  [words("os dois arquivos ao lado deste"), "os dois anexos no fim deste arquivo"],
  [words("os arquivos ao lado deste"), "os anexos no fim deste arquivo"],
  [words("que está **ao lado deste arquivo**"), "anexado **no fim deste arquivo**"],
  [words("que está ao lado deste arquivo"), "anexado no fim deste arquivo"],
  [words("`handoff.md` ao lado"), "`handoff.md`"],
  [words("uma cópia ao lado de cada skill"), "uma cópia junto de cada skill"],

  // O roteador fala das próprias ferramentas.
  [words("Não tem `Write` nem `Edit` no `allowed-tools`, e é de propósito"), "Não grava arquivo nenhum, e é de propósito"],
  [words("com `Glob` em `specs/canvas/**/*.md` e `Read` no que aparecer"), "listando `specs/canvas/**/*.md` e lendo o que aparecer"],

  // Nome de arquivo vira nome de seção — por último. Itálico, e não negrito:
  // o nome costuma estar dentro de uma frase em negrito, e negrito dentro de
  // negrito fecha o primeiro.
  ...Object.entries(SECTIONS).map(([file, title]) => [words(`\`${file}.md\``), `_${title}_`]),
  [/\bde `references\/([a-z0-9-]+)\.md`/g, "da referência _$1_"],
  [/`references\/([a-z0-9-]+)\.md`/g, "a referência _$1_"],
];

// O que nunca pode sobrar num portátil. O teste da 0011 cobra a mesma lista.
export const LEAKS =
  /AskUserQuestion|allowed-tools|Bash\(|chamada de ferramenta|ao lado deste|`(Read|Write|Edit|Glob|Grep)`|shared\//;

const neutralize = (text) => RULES.reduce((t, [pattern, to]) => t.replace(pattern, to), text);

// Os anexos entram um nível abaixo do título da skill, fora de bloco de código.
function demote(text) {
  let fenced = false;
  return text
    .split("\n")
    .map((line) => {
      if (/^ {0,3}(`{3,}|~{3,})/.test(line)) fenced = !fenced;
      return !fenced && /^#{1,5} /.test(line) ? `#${line}` : line;
    })
    .join("\n");
}

// --- leitura ------------------------------------------------------------------

function readSkill(name) {
  const text = readFileSync(join(SKILLS, name, "SKILL.md"), "utf8");
  const fm = frontmatter(text);
  if (!fm) throw new Error(`skills/${name}/SKILL.md sem frontmatter — rode npm run check`);
  return {
    name,
    text,
    description: scalarField(fm, "description") ?? "",
    shared: listField(fm, "shared"),
    references: listField(fm, "references"),
  };
}

// A mesma árvore que o `bin/install` copia: os testes comparam as duas.
export function installTree(skill) {
  return [
    ["SKILL.md", join(SKILLS, skill.name, "SKILL.md")],
    ...skill.shared.map((item) => [`${item}.md`, join(SHARED, `${item}.md`)]),
    ...skill.references.map((item) => [`references/${item}.md`, join(SKILLS, skill.name, "references", `${item}.md`)]),
  ];
}

export function portable(skill) {
  const header = [
    `# /${skill.name}`,
    "",
    `> ${skill.description}`,
    ">",
    "> **Versão portátil do yas-canvas** — https://github.com/yvesas/yas-canvas",
    "> (MIT). Cole este arquivo inteiro como instrução de sistema, ou no começo da",
    "> conversa, e diga à IA o que você quer trabalhar. Três coisas para saber:",
    ">",
    "> - Os anexos no fim (preâmbulo, protocolos, referências) fazem parte da",
    ">   skill: são lidos quando o texto manda, não antes.",
    "> - Onde o texto manda gravar um arquivo (`specs/canvas/...`) e a IA não",
    ">   grava arquivo, ela entrega o conteúdo em markdown, e você salva com",
    ">   esse nome — é o que permite retomar a sessão depois.",
    "> - A regra de parar na primeira pergunta é dita em palavras aqui; no Claude",
    ">   Code ela é garantida pela ferramenta. Se a IA sair lendo antes de",
    ">   perguntar, lembre-a.",
    "",
  ].join("\n");

  const annexes = [
    ...skill.shared.map((item) => [`Anexo — ${SECTIONS[item] ?? item}`, join(SHARED, `${item}.md`)]),
    ...skill.references.map((item) => [`Anexo — referência ${item}`, join(SKILLS, skill.name, "references", `${item}.md`)]),
  ].map(([title, file]) => `---\n\n# ${title}\n\n${demote(readFileSync(file, "utf8")).trim()}\n`);

  const main = body(skill.text).trim();
  return `${neutralize([header, main, "", ...annexes].join("\n"))}`.replace(/\n{3,}/g, "\n\n");
}

// --- escrita determinística ----------------------------------------------------

// 1980-01-01, o menor horário que um zip guarda: data de geração no artefato
// quebraria o byte igual e não diria nada que a release já não diga.
const EPOCH = new Date("1980-01-01T00:00:00Z");

function put(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content.endsWith("\n") ? content : `${content}\n`);
  chmodSync(path, 0o644);
  utimesSync(path, EPOCH, EPOCH);
}

function filesUnder(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) filesUnder(path, base, out);
    else out.push(relative(base, path));
  }
  return out;
}

function zip(output, cwd, files) {
  try {
    execFileSync("zip", ["-X", "-D", "-q", output, ...files], { cwd, env: { ...process.env, TZ: "UTC" } });
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("o binário `zip` não está instalado — no macOS já vem; no Debian/Ubuntu: apt install zip");
    }
    throw err;
  }
  chmodSync(output, 0o644);
}

// A seção `## [x.y.z]` do CHANGELOG, até a próxima seção de versão.
export function releaseNotes(changelog, version) {
  const start = changelog.indexOf(`## [${version}]`);
  if (start === -1) return null;
  const next = changelog.indexOf("\n## [", start + 1);
  const section = changelog.slice(start, next === -1 ? undefined : next);
  return section.slice(section.indexOf("\n") + 1).trim();
}

export function build() {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST);

  const names = readdirSync(SKILLS)
    .filter((d) => statSync(join(SKILLS, d)).isDirectory())
    .sort();

  for (const name of names) {
    const skill = readSkill(name);
    for (const [rel, src] of installTree(skill)) put(join(DIST, name, rel), readFileSync(src, "utf8"));
    zip(join(DIST, `${name}.zip`), DIST, filesUnder(join(DIST, name)).map((f) => join(name, f)));
    put(join(DIST, `${name}.md`), portable(skill));
  }

  zip(join(DIST, "yas-canvas.zip"), DIST, names.flatMap((n) => filesUnder(join(DIST, n)).map((f) => join(n, f))));

  const { version } = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const changelog = join(ROOT, "CHANGELOG.md");
  const notes = existsSync(changelog) ? releaseNotes(readFileSync(changelog, "utf8"), version) : null;
  if (notes) put(join(DIST, "notes", `${version}.md`), notes);

  return { names, version, notes: Boolean(notes) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { names, version, notes } = build();
  console.log(`✓ dist/: ${names.length} skill(s) · pasta, zip e portátil de cada · yas-canvas.zip`);
  console.log(notes ? `✓ notas da ${version} em dist/notes/${version}.md` : `⚠ CHANGELOG.md sem seção [${version}] — a release ficaria sem corpo`);
}
