// Que fixtures a mudança pode quebrar.
//
// Eval custa minuto e token, e rodar oito sessões para conferir uma vírgula em
// documentação é desperdício. Mas o mapa não é um-para-um: quem mexe no
// preâmbulo mexe em todas as skills de uma vez, e quem mexe na bancada mexe na
// régua. Errar para o lado de pular é como um gate desaparece sem ninguém ver,
// então **na dúvida, roda tudo** — e a dúvida é sempre declarada em voz alta.
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, FIXTURES, listFixtures } from "./harness.mjs";

// Toca a régua ou o que todas as skills leem → roda tudo.
const GLOBAL_PATHS = [
  "test/lib/",
  "test/eng-review.eval.test.mjs",
  "scripts/check.mjs",
  "bin/install",
  "shared/preamble.md",
  "package.json",
];

function changedFiles(base) {
  const merged = spawnSync("git", ["merge-base", base, "HEAD"], { cwd: ROOT, encoding: "utf8" });
  if (merged.status !== 0) return null;
  const diff = spawnSync("git", ["diff", "--name-only", merged.stdout.trim()], { cwd: ROOT, encoding: "utf8" });
  if (diff.status !== 0) return null;
  const untracked = spawnSync("git", ["ls-files", "--others", "--exclude-standard"], { cwd: ROOT, encoding: "utf8" });
  return [...diff.stdout.split("\n"), ...(untracked.stdout || "").split("\n")].map((f) => f.trim()).filter(Boolean);
}

// Qual skill cada fixture exercita — sai do próprio prompt dela.
function skillOf(fixture) {
  const file = join(FIXTURES, fixture, "prompt.txt");
  if (!existsSync(file)) return null;
  return (readFileSync(file, "utf8").match(/^\/([a-z0-9-]+)/) || [])[1] || null;
}

// Quais skills declaram um arquivo compartilhado.
function skillsUsing(sharedName) {
  const out = new Set();
  for (const fixture of listFixtures()) {
    const skill = skillOf(fixture);
    if (!skill) continue;
    const file = join(ROOT, "skills", skill, "SKILL.md");
    if (!existsSync(file)) continue;
    const declared = (readFileSync(file, "utf8").match(/^shared:\s*\[(.*)\]/m) || [])[1] || "";
    if (declared.split(",").map((x) => x.trim()).includes(sharedName)) out.add(skill);
  }
  return out;
}

export function selectFixtures(base = process.env.YAS_EVAL_BASE || "origin/main", changedOverride = null) {
  const all = listFixtures();
  const changed = changedOverride ?? changedFiles(base);

  if (!changed) {
    return { fixtures: all, reason: `não consegui comparar com '${base}' — rodando tudo, que é o lado seguro de errar` };
  }
  if (changed.length === 0) {
    return { fixtures: [], reason: `nada mudou em relação a '${base}'` };
  }

  const hitGlobal = changed.find((f) => GLOBAL_PATHS.some((p) => f.startsWith(p)));
  if (hitGlobal) {
    return { fixtures: all, reason: `'${hitGlobal}' alcança todas as skills ou a própria bancada` };
  }

  const selected = new Set();
  const because = [];

  for (const file of changed) {
    let m;
    if ((m = file.match(/^skills\/([a-z0-9-]+)\//))) {
      const skill = m[1];
      const hits = all.filter((f) => skillOf(f) === skill);
      hits.forEach((f) => selected.add(f));
      because.push(`${file} → ${hits.length ? hits.join(", ") : "nenhuma fixture exercita essa skill"}`);
    } else if ((m = file.match(/^test\/fixtures\/([a-z0-9-]+)\//))) {
      selected.add(m[1]);
      because.push(`${file} → ${m[1]}`);
    } else if ((m = file.match(/^shared\/([a-z0-9-]+)\.md$/))) {
      const skills = skillsUsing(m[1]);
      const hits = all.filter((f) => skills.has(skillOf(f)));
      hits.forEach((f) => selected.add(f));
      because.push(`${file} → skills que o declaram: ${[...skills].join(", ") || "nenhuma"}`);
    }
  }

  return {
    fixtures: all.filter((f) => selected.has(f)),
    reason: because.length ? because.join(" · ") : "só documentação mudou",
  };
}
