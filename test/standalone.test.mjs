// Independência: uma skill que roda sozinha não pode citar outra.
//
// Por que isto é teste e não regra do `check.mjs`: lá mora a régua de **todas**
// as skills, e citar a vizinha é legítimo na maioria — o roteador existe para
// isso. Aqui a cobrança é de quem **declarou** que roda sozinha, e a lista é
// curta e explícita de propósito: skill nova não entra por engano, entra porque
// alguém escreveu o nome dela aqui.
//
// O que a regra protege, concretamente: quem instala só a `/founder-canvas`
// — pelo zip, pelo portátil, ou copiando uma pasta — recebe um texto que manda
// invocar algo que não existe na máquina dela, e conclui que instalou errado.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./lib/harness.mjs";

// Skills que precisam rodar sozinhas, com o motivo de cada uma.
const STANDALONE = {
  "founder-canvas": "chega nela quem ainda não tem plano nem o resto do pack (REQ-001 da 0010)",
};

// O roteador é a exceção por definição: a função dele é apontar para as outras.
const ROUTER = "canvas";

const skillNames = readdirSync(join(ROOT, "skills")).sort();

describe("skill independente não cita outra", () => {
  for (const [skill, motivo] of Object.entries(STANDALONE)) {
    const dir = join(ROOT, "skills", skill);

    test(`${skill}: ${motivo}`, () => {
      assert.ok(existsSync(dir), `skills/${skill}/ não existe`);

      // O texto que viaja é o da skill mais o das references dela.
      const refs = join(dir, "references");
      const files = [
        join(dir, "SKILL.md"),
        ...(existsSync(refs)
          ? readdirSync(refs).filter((f) => f.endsWith(".md")).map((f) => join(refs, f))
          : []),
      ];

      const outras = skillNames.filter((s) => s !== skill && s !== ROUTER);

      for (const file of files) {
        const text = readFileSync(file, "utf8");
        for (const outra of outras) {
          // `/nome` com barra: é assim que se invoca, e é o que faz a pessoa
          // procurar o que não tem. Mencionar a palavra solta não é o defeito.
          const citação = new RegExp(`/${outra}\\b`);
          assert.ok(
            !citação.test(text),
            `${file.replace(ROOT, "")} cita \`/${outra}\` — ${skill} tem de rodar sozinha`,
          );
        }
      }
    });
  }

  test("a lista de independentes só nomeia skill que existe", () => {
    for (const skill of Object.keys(STANDALONE)) {
      assert.ok(
        skillNames.includes(skill),
        `STANDALONE nomeia \`${skill}\`, que não está em skills/ — renomeada ou removida`,
      );
    }
  });
});
