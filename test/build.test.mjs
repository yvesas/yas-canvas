// O build da 0011: o que a release anexa precisa ser a skill testada, inteira,
// sem nada que só exista no Claude Code, e igual byte a byte a cada execução.
//
// Determinístico e sem rede: roda no `npm test` de todo mundo, ao contrário dos
// evals.
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { ROOT } from "./lib/harness.mjs";
import { LEAKS, build, releaseNotes } from "../scripts/build.mjs";

const DIST = join(ROOT, "dist");

const filesUnder = (dir, base = dir, out = []) => {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) filesUnder(path, base, out);
    else out.push(relative(base, path));
  }
  return out;
};

const hashes = () =>
  Object.fromEntries(
    filesUnder(DIST).map((f) => [f, createHash("sha256").update(readFileSync(join(DIST, f))).digest("hex")]),
  );

let names;
before(() => {
  ({ names } = build());
});

describe("build portátil (0011)", () => {
  test("nenhum portátil cita ferramenta do Claude Code nem caminho de shared/ (REQ-105)", () => {
    for (const name of names) {
      const text = readFileSync(join(DIST, `${name}.md`), "utf8");
      const m = text.match(LEAKS);
      assert.equal(m, null, `dist/${name}.md ainda tem "${m?.[0]}" — falta uma regra em RULES`);
    }
  });

  test("todo shared e toda reference declarada vira anexo do portátil (REQ-102)", () => {
    for (const name of names) {
      const text = readFileSync(join(DIST, `${name}.md`), "utf8");
      const tree = filesUnder(join(DIST, name)).filter((f) => f !== "SKILL.md");
      const annexes = text.match(/^# Anexo — /gm) ?? [];
      assert.equal(annexes.length, tree.length, `dist/${name}.md tem ${annexes.length} anexos para ${tree.length} arquivos`);
    }
  });

  test("a pasta de cada skill é a que o instalador produziria (REQ-101)", () => {
    const target = mkdtempSync(join(tmpdir(), "yas-canvas-install-"));
    try {
      const out = execFileSync(join(ROOT, "bin/install"), ["--check", "--project", target], { encoding: "utf8" });
      const installed = out
        .split("\n")
        .filter((l) => l.startsWith("  + "))
        .map((l) => l.slice(4))
        .sort();
      const built = names.flatMap((n) => filesUnder(join(DIST, n)).map((f) => join(n, f))).sort();
      assert.deepEqual(built, installed);
    } finally {
      rmSync(target, { recursive: true, force: true });
    }
  });

  test("duas execuções seguidas produzem os mesmos bytes, zip incluído (REQ-104)", () => {
    const first = hashes();
    build();
    assert.deepEqual(hashes(), first);
  });

  test("as notas da release saem da seção da versão no CHANGELOG", () => {
    const changelog = "# Changelog\n\n## [0.2.0] — 2026-11-04\n\n- nova\n\n## [0.1.0]\n\n- velha\n";
    assert.equal(releaseNotes(changelog, "0.2.0"), "- nova");
    assert.equal(releaseNotes(changelog, "0.3.0"), null);
  });
});
