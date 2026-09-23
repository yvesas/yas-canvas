# Roadmap

## Entregue

> Os quatro itens sem pasta em `specs/features/` são anteriores à numeração —
> por isso há dois "0001" e um "0002" que não é o desta lista. Nada é
> renumerado: número gasto fica gasto.

- **0007 — `/security-review`** (2026-09-23,
  `specs/features/0007-security-review/`): a terceira role de revisão, das
  etapas 10 e 11 do `docs_yaslab/26`. Seis partes — ciclo de vida do dado,
  separação entre clientes, chaves, superfície de ataque, responsabilidade do
  agente, observabilidade e incidente. Abre dizendo **você não verificou nada**,
  e o relatório nomeia o que ficou sem verificação. Combinação crítica: dado
  sensível + sem escopo por tenant + log sem filtro = vazamento que roda meses
  sem ninguém saber. **Primeira feature com a ordem invertida**: skill, sessão
  real, rubrica.
- **0006 — `/ceo-review`, escopo e ambição** (2026-09-23,
  `specs/features/0006-ceo-review/`): a segunda role de revisão, e a primeira a
  provar que o `review-protocol` serve a mais de um papel — **sem precisar de
  exceção por papel**. Cinco partes das etapas 1 a 3 do `docs_yaslab/26`, e a
  combinação crítica que dá razão à role: problema sem dono + nenhum
  não-objetivo + nenhum número = escopo que cresce para sempre, num item só.
  Ela não opina sobre tecnologia: *o que o sistema faz é seu; como ele faz não
  é* — e assumir a pergunta não é respondê-la.
- **0005 — `/cto-canvas`, a segunda skill** (2026-09-23,
  `specs/features/0005-cto-canvas/`): o primeiro **canvas** — estrutura a pessoa
  em vez de avaliar um artefato. Seis perguntas técnicas com empurrão e
  bandeiras, roteadas por estágio; portão de estágio como parada dura; premissas
  como afirmações ("com qual você discorda"); sinais registrados com citação e
  **nunca** como nota. Conteúdo do `docs_yaslab/25`, forma do gstack.
  E o corte que ela cobrou: `shared/session-protocol.md` nasce com o que vale
  para qualquer sessão conduzida — ADR 0005. Suíte: **16 de 16**.
- **0004 — desacoplada do baseline, com handoff** (2026-09-22,
  `specs/features/0004-decouple-and-handoff/`): o pack parou de apontar para
  ferramenta que só existe onde o baseline está instalado — eram nove pontos, e
  a causa era a golden rule deste repositório. A fronteira virou um documento: o
  **handoff** (`specs/canvas/handoff/<alvo>.md`), montado a partir das partes de
  todas as roles, onde proposta que ninguém confirmou **não** vira tarefa. O
  pack só escreve em `specs/canvas/`, e o relatório saiu do arquivo do plano.
  Guarda no `check.mjs` para o acoplamento não voltar. ADRs 0003 e 0004.
  Suíte: **12 de 12**.
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

_Nada em andamento._

## Próximo

1. **Orquestrador** — rodar as roles em sequência sobre o mesmo alvo, com **um**
   portão humano no fim. **Deixou de ser prematuro:** a condição que ele mesmo
   declarava era "três ou quatro roles existirem", e hoje são **cinco revisões**
   somando no mesmo handoff. O que ele precisa decidir: em que ordem rodam, o
   que passa de uma para a outra, e onde a pessoa entra sem virar carimbo.

2. **Uma sessão real com fundador.** Sete skills existem e **nenhuma foi usada
   por gente** — é a pendência mais velha do `STATE.md`, e agora a mais cara de
   adiar: cada role nova aumenta o que pode estar errado sem ninguém ter visto.

## Bloqueadas por conteúdo, não por tempo

- **`/techlead-canvas`** — o doc 21 tem o mapa de competências pronto, e as
  seções de acompanhar dev, performance e indicadores estão marcadas como não
  amadurecidas. Escrever agora seria inventar o método do Yves em vez de
  transcrevê-lo (decisão de 23/09).
- **Revisão de design visual** — tipografia, hierarquia, marca: sem fonte
  autoral. O que a etapa 6 cobre foi para a `/ux-review` (decisão de 23/09).

## Decisões adiadas (não são tarefas até alguém decidir)

- **Tradução para inglês.** Hoje a prosa é em português. Traduzir cria duas
  versões que envelhecem em ritmos diferentes; só vale com a decisão de
  distribuir tomada.
