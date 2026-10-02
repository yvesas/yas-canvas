# 0010 — decisões em área cinzenta

> O que o material e o prompt deixaram aberto, com quem decidiu. Decisão sem
> citação é palpite meu — e está marcada como **pendente de aprovação**.

## Decidido pelo Yves

**D-FC-001 — Três features, as três especificadas antes de codar.** O prompt
trazia skill, build portátil e release num documento só.

> "Três features, spec das três agora"

Consequência: a numeração gasta 0010, 0011 e 0012 de uma vez, e parte do
`design.md` da 0011 será reescrita depois que a skill existir — aceito
conscientemente.

## Pendente de aprovação (minha recomendação, com o motivo)

**D-FC-002 — Uma pergunta por vez, e o banco de perguntas é fonte, não
roteiro.** O material manda "blocos de 3 a 4 perguntas por vez"; o pack tem uma
pergunta por vez como princípio (`PROJECT.md` §3), e o próprio prompt pede o
ritmo do pack no requisito 4. Os dois não cabem juntos.

Recomendo o pack, por um motivo medido: pergunta em bloco é o que faz a sessão
despejar pergunta dentro de arquivo em vez de esperar resposta — o defeito que a
0003 e a 0006 corrigiram duas vezes. O que o material chama de "síntese depois de
cada bloco" vira a síntese de fechamento da parte, antes de gravar.

**D-FC-003 — Alternativas (`session-protocol` §4) ficam na decisão, não em toda
fase.** §4 exige mínima viável e ideal antes de fechar. Numa revisão isso é o
trabalho; numa fase que só registra realidade — como "o porquê do founder" — pedir
duas abordagens não significa nada.

Recomendo seguir a `/cto-canvas`: a sessão fecha com **a decisão desta sessão**,
e é ela que carrega as alternativas. Dentro das partes, o mecanismo equivalente é
o REQ-006 (duas ou três versões da frase, ajustadas até o fundador validar).
Onde a fase **produz escolha** — modelo de entrada, PLG × consultiva × híbrido,
North Star — as alternativas valem na própria parte.

**D-FC-004 — Nome de reference em inglês, prosa em português.**
`perguntas.md` → `questions.md`, `conceitos.md` → `concepts.md`,
`modelos.md` → `templates.md`. É a regra de `code-style.md` (nome de arquivo é
interface; prosa é para gente), e vale para o material adaptado como vale para o
resto do repo.

**D-FC-005 — Os documentos numerados do material viram part ids.** O material
grava `00-contexto`, `01-founder`, …, `09-metricas`. O pack grava
`<parte>.md` com id em inglês, e a ordem já está no `parts:` do frontmatter.
Número no nome do arquivo seria uma segunda fonte de ordenação, que envelhece
contra a primeira.

**D-FC-006 — O material fica onde está.** `docs/skills-handoff/` entra no git
como material de origem, versionado junto. Alternativa descartada: mover para
`specs/features/0010-founder-canvas/material/`, que é mais fiel à divisão
`specs/` × `docs/` — não movi porque foi você que escolheu o lugar, e o custo de
movê-lo depois é um `git mv`.

## O que fica pendente de terceiro

Nada. Todo o conteúdo necessário está no material aprovado.
