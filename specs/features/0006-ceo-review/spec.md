# 0006 — `/ceo-review`, escopo e ambição

**Status:** especificado (2026-09-23) · **Decisões:** `context.md`
**Fonte:** `docs_yaslab/26-mapa-construcao-app.md`, etapas 1 a 3.

## O problema

O `/eng-review` responde "isto está bem construído?". Ninguém no pack responde
**"isto devia ser construído, deste tamanho, agora?"** — que é a pergunta que
mata mais produto que qualquer decisão de arquitetura.

E é a segunda role de revisão: até hoje o `review-protocol.md` serviu a um papel
só. Ela é quem prova se ele serve a mais de um, do mesmo jeito que a
`/cto-canvas` provou o `session-protocol`.

## Requisitos

- **REQ-001 — A skill existe, e declara o que usa.**
  `skills/ceo-review/SKILL.md`, com
  `shared: [preamble, session-protocol, review-protocol, handoff]` e as cinco
  partes de D-CEO-002 em `parts:`.

- **REQ-002 — O portão é de escopo, com as opções desta role.**
  WHEN invocada, THEN a primeira chamada de ferramenta SHALL ser a pergunta de
  alvo, e as opções SHALL ser de artefato escrito — plano, ideia colada,
  documento apontado. **Diff não é opção aqui:** revisar ambição olhando código
  é a confusão que esta role existe para não fazer.

- **REQ-003 — Cinco partes, cada uma com o que empurrar.**
  `problem-and-who` · `status-quo` · `non-goals` · `first-cut` · `the-number`.
  Cada uma SHALL dizer até ouvir o quê: um usuário nomeado, o fluxo real de
  hoje, um "não" escrito, a fatia que cabe numa semana, o número e quem olha.

- **REQ-004 — A combinação crítica é nomeada e montada.**
  WHEN o relatório é escrito, THEN a skill SHALL procurar a combinação de
  D-CEO-003 — problema sem dono, nenhum não-objetivo, nenhum número — e, se as
  três aparecerem, SHALL escrevê-las como **um** item em "Barra o plano", não
  como três ressalvas.

- **REQ-005 — Ela não opina sobre tecnologia.**
  WHEN o plano contém decisão técnica, THEN a skill SHALL NOT avaliá-la.
  Se for grave, nomeia em uma linha e manda para a `/eng-review` (D-CEO-004).

- **REQ-006 — O handoff soma as duas roles.**
  WHEN existe parte de outra role sobre o mesmo alvo, THEN o handoff gerado
  SHALL conter os itens das duas, cada um com a sua fonte.
  É o que a 0004 desenhou e nunca pôde ser exercitado — e a regra do REQ-006 da
  0004 continua valendo item a item: proposta que ninguém confirmou não vira
  tarefa, venha de qual role vier.

- **REQ-007 — O roteador e a validação acompanham.**
  O `/canvas` roteia para ela, dizendo em uma linha o que a separa da
  `/eng-review`: uma pergunta se está bem construído, a outra se devia ser
  construído assim.

- **REQ-008 — O eval cobre o que é novo.**
  Fixtures para: **o escopo que cresce para sempre** (as três faltas juntas,
  que precisam virar um item só) e **o handoff entre roles** (partes de
  `eng-review` já no disco, e o handoff gerado contendo as duas fontes). As oito
  fixtures existentes continuam passando.

## Fora de escopo

- **`/pm-review` e `/ux-review`.** Discovery de usuário e jornada são delas; a
  fronteira está em D-CEO-002.
- **Modelo de negócio, preço, mercado.** Esta role revisa **escopo e ambição de
  um plano**, não a tese comercial. Quem quiser revisar tese precisa de outra
  fonte que o framework ainda não tem escrita.
- **Qualquer juízo técnico** — D-CEO-004.

## Como saber se deu certo

Gate de sempre, **18 de 18**. E o que só esta feature pode mostrar: se o
`review-protocol` serve a dois papéis sem ganhar exceção para nenhum. **Se eu
precisar escrever "quando for a role X" dentro dele, o corte da 0005 foi no
lugar errado.**
