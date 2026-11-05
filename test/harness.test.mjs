// A régua dos evals também é código, e régua errada reprova skill certa. A
// rodada de 05/11 achou dois defeitos dela — caminho de arquivo sem a pasta da
// role, citação do juiz que não existia — e os dois custaram fixture vermelha
// antes de alguém olhar a bancada. Estes testes rodam no `npm test`, sem rede.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writtenArtifacts, partFileFailures, normalize, citationFound, rubricKinds } from "./lib/harness.mjs";

const part = (status, headings = true) =>
  [
    "---",
    "role: founder-canvas",
    "parte: problem-and-pains",
    `status: ${status}`,
    "---",
    "",
    "## 2026-11-05 — ideia",
    ...(headings ? ["### O que você disse", "> fala", "### O que eu propus", "- (hipótese) x", "### Em aberto", "- y"] : ["texto solto"]),
  ].join("\n");

function canvas(files) {
  const root = mkdtempSync(join(tmpdir(), "yas-harness-"));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(root, path, ".."), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

describe("bancada dos evals", () => {
  test("o caminho do arquivo gravado mantém a pasta da role", () => {
    const root = canvas({ "founder-canvas/problem-and-pains.md": part("pendente") });
    try {
      assert.deepEqual(writtenArtifacts(root, "").map((a) => a.path), ["founder-canvas/problem-and-pains.md"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("arquivo de parte sem os três títulos falha; o resumo não precisa deles", () => {
    const root = canvas({
      "founder-canvas/problem-and-pains.md": part("pendente", false),
      "founder-canvas/canvas.md": "---\nrole: founder-canvas\ntipo: resumo\n---\n\nresumo",
    });
    try {
      const problems = partFileFailures({ partsHaveThreeHeadings: true }, root);
      assert.equal(problems.length, 1);
      assert.match(problems[0], /problem-and-pains\.md sem/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("status e marca obrigatória são conferidos no arquivo, e arquivo ausente falha", () => {
    const root = canvas({ "founder-canvas/problem-and-pains.md": part("respondido") });
    try {
      const problems = partFileFailures(
        {
          partStatusIn: { "founder-canvas/problem-and-pains.md": ["pendente"] },
          fileMustContain: { "founder-canvas/problem-and-pains.md": ["(hipótese)"], "founder-canvas/lean-canvas.md": ["x"] },
        },
        root,
      );
      assert.deepEqual(problems, [
        "specs/canvas/founder-canvas/problem-and-pains.md com `status: respondido`, esperado pendente",
        "specs/canvas/founder-canvas/lean-canvas.md não foi gravado",
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("citação do juiz vale só se estiver no texto, palavra por palavra", () => {
    const haystack = normalize("**Agente:** Gravei como *pendente*, porque nenhuma dor foi contada por um cliente.");
    assert.ok(citationFound("“Gravei como pendente, porque nenhuma dor foi contada”", haystack));
    assert.ok(!citationFound("Gravei como respondido, porque nenhuma dor foi contada", haystack));
    assert.ok(!citationFound("Gravei como pendente", haystack), "menos de seis palavras não sustenta");
  });

  test("a rubrica marca o que barra e o que só informa", () => {
    const kinds = rubricKinds("1. `portao_primeiro` — x\n\n2. `duas_perguntas_no_maximo` *(informa)* — y\n");
    assert.deepEqual([...kinds], [["portao_primeiro", "barra"], ["duas_perguntas_no_maximo", "informa"]]);
  });
});
