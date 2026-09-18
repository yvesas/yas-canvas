// Evals do /eng-review.
//
// Custam dinheiro e minutos, então ficam atrás de YAS_EVAL=1 e nunca rodam num
// hook. Sem a variável, a suíte passa reportando que pulou — um teste que
// desaparece em silêncio é pior que um teste vermelho.
//
//   YAS_EVAL=1 npm run eval                      todas as fixtures
//   YAS_EVAL=1 npm run eval -- --test-name-pattern no-target
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { claudeAvailable, listFixtures, readFixture, runSubject, deterministicFailures, judge, config } from "./lib/harness.mjs";

const ENABLED = process.env.YAS_EVAL === "1";

describe("/eng-review — evals", { skip: ENABLED ? false : "YAS_EVAL=1 para rodar (custa tokens)" }, () => {
  before(() => {
    assert.ok(claudeAvailable(), "o CLI `claude` precisa estar no PATH");
    console.log(`  sujeito: ${config.SUBJECT_MODEL} · juiz: ${config.JUDGE_MODEL} · teto: US$ ${config.BUDGET_USD}/chamada`);
  });

  for (const name of listFixtures()) {
    describe(name, () => {
      let fixture;
      let session;

      before(() => {
        fixture = readFixture(name);
        session = runSubject(fixture);
      });

      // Camada 1. Roda primeiro porque é grátis, e porque quando ela falha o
      // veredito do juiz não acrescenta nada: o protocolo já quebrou.
      test("protocolo (determinístico)", () => {
        const problems = deterministicFailures(fixture, session);
        assert.deepEqual(
          problems,
          [],
          `${fixture.expect.descricao}\n\n` +
            problems.map((p) => `  - ${p}`).join("\n") +
            `\n\nferramentas usadas: ${session.toolCalls.map((t) => t.name).join(", ") || "(nenhuma)"}`,
        );
      });

      // Camada 2. O que só um leitor consegue dizer: empurrou por
      // especificidade? tomou posição? inventou alguma coisa?
      test("julgamento (modelo juiz)", () => {
        const criterios = judge(fixture, session);
        const falhas = criterios.filter((c) => !c.passou);
        assert.deepEqual(
          falhas.map((c) => c.id),
          [],
          falhas.map((c) => `  - ${c.id}: ${c.evidencia}`).join("\n"),
        );
      });
    });
  }
});
