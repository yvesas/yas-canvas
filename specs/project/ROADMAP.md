# Roadmap

## Entregue

> Os quatro itens sem pasta em `specs/features/` são anteriores à numeração —
> por isso há dois "0001" e um "0002" que não é o desta lista. Nada é
> renumerado: número gasto fica gasto.

- **0003 — menu de partes e pasta de respostas** (2026-09-22,
  `specs/features/0003-parts-menu-and-answers/`): cada parte de uma role fecha
  sozinha em `specs/canvas/<role>/<parte>.md`, no projeto da pessoa, com o que
  ela disse separado do que a skill propôs **pelo título**, não pela prosa. O
  menu vem depois do desafio de escopo e sugere a próxima sem obrigar; o
  relatório diz o que as partes que faltam impedem de concluir. O `/canvas`
  virou controlador que só lê — sem `Write` no `allowed-tools`. Suíte:
  **10 de 10**, com a fixture da volta.
- **0002 — protocolo de revisão extraído** (2026-09-20,
  `specs/features/0002-review-protocol/`): o que é formato de revisar saiu do
  `/eng-review` e virou `shared/review-protocol.md`, lido em runtime como o
  preâmbulo. Cada skill **declara** o que precisa (`shared: [...]`) e o
  instalador copia só isso. A role caiu de 265 para **149** linhas sem perder
  regra, e a segunda role nasce sem cópia. Ganhos que vieram junto: seletor de
  fixture por diff (`npm run eval:changed`), juiz isolado do próprio ambiente,
  e a regra de não afirmar como fato o que o fornecedor devolve. Suíte:
  **8 de 8**.
- **0001 — `/eng-review` sem código para ler** (2026-09-18): o `Passo 4` decide
  entre os dois mundos; o relatório ganhou esqueleto com "Barra o plano" em
  posição fixa; a combinação sem teste + sem tratamento + falha silenciosa é
  reunida na hora de escrever, porque nasce partida entre as seções. Fixture
  `greenfield-plan`. Suíte: **8 de 8**.
- **0003 — eval multi-turno** (2026-09-18): sessão conduzida por turnos
  (`--session-id` + `--resume`), teto por ferramenta de investigação, juiz
  recebendo a lista de chamadas como fato. Suíte: **6 de 6**.
- **0002 — evals** (2026-09-18): bancada em duas camadas (determinística e
  modelo juiz), três fixtures, validação das fixtures no `check`.
- **0001 — fundação** (2026-09-18): preâmbulo compartilhado, roteador `/canvas`,
  `/eng-review` como molde, validação estática (`npm run check`), instalador
  para `~/.claude/skills`, ADR do preâmbulo.

## Em desenvolvimento

- **0004 — desacoplar do baseline e entregar o handoff**
  (`specs/features/0004-decouple-and-handoff/`, especificada em 22/09): o
  pack para de **apontar** para ferramenta operacional (`/commit`, `/pr`,
  `.claude/rules/`, `stack.env` — cinco pontos medidos) e passa a **produzir** o
  material que um agente operacional pega depois. yas-canvas é estratégico;
  o operacional é de quem executa, com o baseline ou sem ele. Decidido em 22/09:
  handoff em formato próprio, agnóstico de agente, com campos que mapeiam 1:1
  para o spec-driven — compatível sem depender. **Um handoff por alvo**,
  regenerado a partir das partes; o pack só escreve em `specs/canvas/`, e o
  relatório sai do arquivo do plano. E uma guarda no `check.mjs` para o
  acoplamento não voltar. Especificada, desenhada e quebrada em seis tasks.

## Próximo

1. **`/cto-canvas`** — as seis perguntas técnicas, roteamento por estágio
   (nada em produção / MVP no ar / clientes pagando), desafio de premissas,
   alternativas, sinais de maturidade, documento salvo.
2. **`/ceo-review`** — escopo e ambição: o que cortar, o que é apetite e o que
   é necessidade.
3. **`/techlead-canvas`** — evolução de dev, review, velocidade real, gargalo.
4. **`/pm-review`**, **`/ux-review`**, **`/design-review`**.
5. **Orquestrador** — rodar as roles em sequência com princípios de decisão que
   respondem o intermediário, e **um** portão humano no fim. Só depois de três
   ou quatro roles existirem: orquestrar duas não paga a complexidade.

## Decisões adiadas (não são tarefas até alguém decidir)

- **Tradução para inglês.** Hoje a prosa é em português. Traduzir cria duas
  versões que envelhecem em ritmos diferentes; só vale com a decisão de
  distribuir tomada.
