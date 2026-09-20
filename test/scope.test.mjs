// O seletor de escopo, sem gastar um token.
//
// Ele decide o que NÃO rodar, e essa é a decisão perigosa: errar para o lado de
// pular é como um gate desaparece sem ninguém ver. Por isso o mapa é testado
// aqui, de graça, em vez de ser descoberto numa rodada cara.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { selectFixtures } from "./lib/scope.mjs";
import { listFixtures } from "./lib/harness.mjs";

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

  test("mexer numa role roda as fixtures daquela role", () => {
    const selected = pick(["skills/eng-review/SKILL.md"]);
    assert.ok(selected.length > 0, "eng-review tem fixtures");
    assert.deepEqual(selected, all, "hoje todas as fixtures são de eng-review");
  });

  test("mexer numa fixture roda só ela", () => {
    assert.deepEqual(pick(["test/fixtures/no-target/plan.md"]), ["no-target"]);
  });

  test("mexer no protocolo roda as skills que o declaram", () => {
    assert.deepEqual(pick(["shared/review-protocol.md"]), all);
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
