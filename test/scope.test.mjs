// O seletor de escopo, sem gastar um token.
//
// Ele decide o que NÃO rodar, e essa é a decisão perigosa: errar para o lado de
// pular é como um gate desaparece sem ninguém ver. Por isso o mapa é testado
// aqui, de graça, em vez de ser descoberto numa rodada cara.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { selectFixtures } from "./lib/scope.mjs";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { listFixtures, FIXTURES, ROOT } from "./lib/harness.mjs";

const all = listFixtures();
const pick = (changed) => selectFixtures("origin/main", changed).fixtures;

describe("escopo por diff", () => {
  test("mexer no preâmbulo alcança todas as skills", () => {
    assert.deepEqual(pick(["shared/preamble.md"]), all);
  });

  test("mexer na bancada alcança tudo — é a régua", () => {
    assert.deepEqual(pick(["test/lib/harness.mjs"]), all);
    assert.deepEqual(pick(["bin/install"]), all);
  });

  // Derivado das declarações, não enumerado: esta suíte já quebrou duas vezes
  // porque eu tinha escrito "hoje as fixtures são todas de X". Toda skill nova
  // quebrava o teste sem que nada estivesse errado — e teste que quebra sem
  // defeito ensina a ignorar teste.
  const skillOf = (f) =>
    (readFileSync(join(FIXTURES, f, "prompt.txt"), "utf8").match(/^\/([a-z0-9-]+)/) || [])[1];
  const declares = (skill, item) =>
    ((readFileSync(join(ROOT, "skills", skill, "SKILL.md"), "utf8").match(/^shared:\s*\[(.*)\]/m) || [])[1] || "")
      .split(",")
      .map((x) => x.trim())
      .includes(item);
  const skills = [...new Set(all.map(skillOf))];

  test("mexer numa role roda as fixtures daquela role, e só", () => {
    for (const skill of skills) {
      const suas = all.filter((f) => skillOf(f) === skill);
      assert.deepEqual(pick([`skills/${skill}/SKILL.md`]), suas, skill);
    }
    assert.ok(skills.length > 1, "mais de uma role, senão o teste não prova nada");
  });

  test("mexer numa fixture roda só ela", () => {
    assert.deepEqual(pick(["test/fixtures/no-target/plan.md"]), ["no-target"]);
  });

  test("mexer num compartilhado roda só quem o declara", () => {
    // É aqui que o corte da 0005 vira dinheiro: quem não declara, não paga.
    for (const item of ["session-protocol", "review-protocol", "handoff"]) {
      const esperado = all.filter((f) => declares(skillOf(f), item));
      assert.deepEqual(pick([`shared/${item}.md`]), esperado, item);
    }
  });

  test("só documentação não roda nada", () => {
    assert.deepEqual(pick(["README.md", "docs/adr/0001-shared-preamble.md", "specs/project/STATE.md"]), []);
  });

  test("diff indisponível roda tudo — o lado seguro de errar", () => {
    const r = selectFixtures("branch-que-nao-existe-xyz");
    assert.deepEqual(r.fixtures, all);
    assert.match(r.reason, /lado seguro/);
  });
});
