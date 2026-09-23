# 0008 — `/pm-review`, descoberta e validação

**Status:** especificado (2026-09-23) · **Fonte:** `docs_yaslab/26`, etapa 2.

## O problema e a fronteira

A `/ceo-review` decide **escopo e ambição**: que problema, de quem, o que fica
de fora, a menor fatia, o número. Ela pressupõe que você **sabe** o suficiente
para decidir.

Esta pergunta se você sabe. **Hipótese não escrita não pode ser invalidada** —
e produto que nunca escreveu as suas descobre no lançamento.

**O que é dela e não da `/ceo-review`:** hipótese com o que a derruba, evidência
observada de primeira mão, validação barata antes de construir, e o que já
existe no mercado. **O que não é dela:** quem sofre e como resolve hoje — isso
é `problem-and-who` e `status-quo`, da outra role.

## Requisitos

- **REQ-001 — A skill existe.** `skills/pm-review/SKILL.md`, com
  `shared: [preamble, session-protocol, review-protocol, handoff]` e quatro
  partes: `hypotheses` · `first-hand-evidence` · `cheap-validation` ·
  `whats-already-there`.

- **REQ-002 — Hipótese sem o que a invalida não é hipótese.**
  WHEN a pessoa afirmar algo sobre o usuário ou o mercado, THEN a skill SHALL
  pedir a forma "acreditamos que X porque Y" **e** o que faria essa crença cair.
  Crença que nada derruba é premissa disfarçada.

- **REQ-003 — Evidência de primeira mão separada de relato.**
  WHEN a pessoa citar evidência, THEN a skill SHALL distinguir **o que ela
  observou** do que alguém contou, e registrar cada uma como o que é.

- **REQ-004 — A combinação crítica.**
  WHEN as três aparecerem — nenhuma hipótese escrita, nenhuma observação direta,
  e validação que só acontece construindo o produto —, THEN elas SHALL virar
  **um** item em "Barra o plano": *você vai descobrir no lançamento, quando o
  erro já custou tudo*.

- **REQ-005 — Validar barato é uma pergunta concreta.**
  WHEN a skill cobrar validação, THEN ela SHALL pedir **o experimento**: com
  quem, em quantos dias, e qual resultado mataria a ideia. "Vamos validar com
  usuários" não é resposta.

- **REQ-006 — Ela não decide escopo.**
  WHEN aparecer decisão de escopo, prioridade ou número de sucesso, THEN a skill
  SHALL nomear em uma linha e mandar para a `/ceo-review`.

- **REQ-007 — Roteador e validação acompanham.**

- **REQ-008 — Fixture escrita depois de observar uma sessão** (padrão da 0007).

## Fora de escopo

- Escopo, prioridade e métrica de sucesso — são da `/ceo-review`.
- Jornada dentro do produto e telas — são da `/ux-review`.
- Pesquisa de mercado ou tese comercial: o framework não tem fonte escrita.
