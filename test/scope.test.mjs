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

  test("mexer numa role roda as fixtures daquela role, e só", () => {
    const eng = pick(["skills/eng-review/SKILL.md"]);
    const cto = pick(["skills/cto-canvas/SKILL.md"]);

    assert.ok(eng.length > 0 && cto.length > 0, "as duas skills têm fixtures");
    assert.deepEqual(
      eng.filter((f) => cto.includes(f)),
      [],
      "nenhuma fixture é das duas: mexer numa role não paga a sessão da outra",
    );
    assert.deepEqual([...eng, ...cto].sort(), all, "juntas, cobrem todas");
  });

  test("mexer numa fixture roda só ela", () => {
    assert.deepEqual(pick(["test/fixtures/no-target/plan.md"]), ["no-target"]);
  });

  test("mexer no protocolo roda as skills que o declaram, e só", () => {
    // O corte da 0005 fez isto valer dinheiro: o review-protocol é declarado
    // só pelo eng-review, então mexer nele não paga mais a sessão do canvas.
    const review = pick(["shared/review-protocol.md"]);
    assert.deepEqual(review, pick(["skills/eng-review/SKILL.md"]));
    assert.ok(!review.some((f) => f.startsWith("cto-")), "canvas não declara review-protocol");

    // Já o session-protocol é declarado pelas duas.
    assert.deepEqual(pick(["shared/session-protocol.md"]), all);
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
