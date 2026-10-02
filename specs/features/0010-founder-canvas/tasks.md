# 0010 — tasks

> A ordem é a do ciclo do `WRITING-SKILLS.md`: mecanismo, skill inteira, **sessão
> real**, fixtures escritas a partir do que foi visto, medição, fechamento.
> Fixture escrita antes da sessão custou três correções na 0005 — a ordem aqui é
> a lição, não burocracia.

## T1 — `references:` no instalador e no gate (REQ-011 a REQ-013)

Laço de references no `bin/install`; a régua do `shared:` replicada no
`check.mjs` (declarada e inexistente · existente e não lida · em disco e não
declarada); ADR 0006 com a divisão `shared/` × `references/`.

**Done when:** `npm run check` verde com as sete skills atuais (nenhuma declara
`references`, e isso não pode falhar); uma reference de teste declarada e
ausente **falha**; `bin/install --check` lista `references/<item>.md` quando ela
existe. ADR 0006 escrito.

**✅ feito em 02/10.** As três cobranças foram provadas uma a uma, com a
`/cto-canvas` como cobaia e desfeitas depois: declarada e inexistente · existente
e nunca lida · em disco e não declarada. As sete skills seguem verdes sem
declarar nada (`references:` é opcional), e o caminho feliz pôs
`cto-canvas/references/questions.md` na lista do `--check`.

Duas coisas que só apareceram implementando:

- **A terceira cobrança não tem equivalente no `shared:`** — lá a pasta é do
  pack e todo arquivo dela é fonte de alguém. Aqui, arquivo não declarado é
  arquivo que não viaja, e a skill manda ler o que não chegou. Foi para o ADR.
- **O `check.mjs` rodando dentro do `bin/install` já é a guarda** do caso
  "declarada e o arquivo não existe": a instalação aborta antes de copiar, então
  o `copy` não precisa de tratamento próprio para fonte ausente.

## T2 — As references da skill (REQ-002, D-FC-004)

`skills/founder-canvas/references/`: `questions.md`, `concepts.md`,
`templates.md`, adaptados do material — prosa em português, nome em inglês, ids
de parte no lugar dos nomes numerados (D-FC-005).

**Done when:** os três arquivos existem; nenhum menciona ferramenta do Claude
Code nem caminho do baseline (o `check.mjs` cobra); `templates.md` cobre as dez
partes.

**✅ escrito em 02/10** — 295 linhas nos três arquivos, as dez partes cobertas no
`questions.md` e no `templates.md`, e a varredura do que viaja passou limpa.

**Mas a T2 não fecha sozinha, e a culpa é desta divisão.** Pasta de skill sem
`SKILL.md` é erro no `check.mjs` — e deve ser: skill pela metade instalada falha
na frente da pessoa. Então o gate fica vermelho entre a T2 e a T3, e as duas
viram **um commit só**. A alternativa seria afrouxar o gate para tolerar pasta
sem skill, o que é trocar um defeito real por conveniência de ordem de tarefa.

Lição para a próxima feature: **task que cria metade de uma unidade que o gate
valida inteira não é task.** A fronteira do commit é a unidade que o gate aceita.

## T3 — A skill inteira (REQ-001 a REQ-010)

`skills/founder-canvas/SKILL.md`: portão de estágio no topo, tabela de calibragem
por estágio, as dez partes conduzidas no corpo, fato × hipótese, as versões da
frase na voz do fundador, armadilhas, e o fechamento com o `canvas.md`.

**Done when:** `npm run check` verde (frontmatter, teto de 400 linhas, parte
declarada é parte conduzida, nada de ferramenta que só existe aqui); o corpo não
cita outra skill; `bin/install --check` mostra a skill com `preamble`,
`session-protocol` e as três references.

**✅ feito em 02/10, junto com a T2** (ver o achado lá). **191 linhas** — bem
abaixo do teto, e esse número é o argumento do ADR 0006 medido: as dez fases
cabem porque perguntas, conceitos e modelos saíram do corpo. Zero menções a
outra skill. O `--check` lista os seis arquivos, references inclusive.

Uma decisão tomada escrevendo: **"product-led growth" virou "crescimento pelo
produto"** no corpo e nas armadilhas. O jargão fica em `concepts.md`, onde é
definido, e nos `triggers` — que existem para casar com o que a pessoa escreve.
Cobrar "PLG" de quem não conhece o termo é a mesma falha que a skill aponta na
fase de valor: descrever a tecnologia em vez do resultado.

A linha do roteador e a ordem do amadurecimento (parte da T4) entraram no mesmo
commit: sem elas o `check` fica com aviso, e aviso que fica é aviso que ninguém
lê.

## T4 — O roteador e a documentação (REQ-014, REQ-015)

Linha no `/canvas` com a ordem de amadurecimento; `/founder-canvas` nas tabelas
do `README.md` e do `CLAUDE.md`; ordem de uso no `docs/getting-started.md`.

**Done when:** `npm run check` verde (roteador aponta só para skill que existe);
as três tabelas listam oito skills; o `CLAUDE.md` não passa de 95 linhas.

**✅ feito em 02/10.** `CLAUDE.md` em **93 linhas**, dentro do teto que eu mesmo
pus. O roteador já tinha entrado no commit da T3 (sem ele o gate ficava com
aviso), então aqui foram as três tabelas, mais duas coisas que não estavam na
task e fazem falta:

- **O bloco "quando usar cada uma"** no `README.md`, como diagrama da ordem do
  amadurecimento — era item da Parte C do prompt original, e é o que responde
  "qual primeiro" quando tudo parece ao mesmo tempo. Com a linha de que não é
  trilha obrigatória, senão vira processo.
- **Uma linha no `getting-started.md`** dizendo que a `/founder-canvas` é a única
  que **não pressupõe um plano** — dá para chegar nela com o produto só na
  cabeça. É a informação que faz um fundador saber que o pack serve para ele.

O `CLAUDE.md` também ganhou a linha de `references/` na tabela de estrutura: o
mecanismo existe desde a T1 e um agente que lê o índice precisa saber dele.

## T5 — Sessão real (ciclo, passo 3)

Instalar num diretório descartável com `bin/install --project`, rodar uma sessão
de verdade — de preferência com um produto real do Yves — e **ler o que ela
gravou**.

**Done when:** existe a sessão, os arquivos de parte estão em
`specs/canvas/founder-canvas/` do diretório de teste, e as observações estão
anotadas nesta task: o que a skill fez que não estava previsto, e em que fase a
conversa ficou pesada.

## T6 — O teste de independência (REQ-017)

`test/standalone.test.mjs`: falha se o corpo da `founder-canvas` citar outra
skill do pack.

**Done when:** `npm test` verde; o teste falha de verdade quando se insere
`/pm-review` no corpo (verificado à mão, e desfeito).

**✅ feito em 02/10.** Nove testes verdes. Inseri `/pm-review` no corpo e o teste
falhou nomeando o arquivo e a citação; desfeito com `git checkout`.

Duas decisões de implementação:

- **A varredura cobre as references também**, não só o `SKILL.md`. Elas viajam
  no mesmo zip, e uma reference que manda invocar outra skill tem o mesmo
  defeito.
- **A lista de independentes é explícita, com o motivo de cada skill**, em vez de
  valer para todas por padrão. Citar a vizinha é legítimo na maioria — o roteador
  existe para isso. E tem um teste que cobra a própria lista: se alguém renomear
  a skill, a lista aponta para nome que não existe e o teste diz isso, em vez de
  passar vazio. Guarda contra o pior defeito de um teste de grep: deixar de medir
  em silêncio.

## T7 — As quatro fixtures (REQ-016)

`test/fixtures/`, escritas **depois** da T5, com `driver.replies` conversando
turno a turno:

| Fixture | O que ela cobra |
|---|---|
| `founder-solution-first` | só fala da solução; a skill não deixa a fase de problema fechar sem dor na voz do cliente |
| `audience-too-broad` | "pequenas empresas"; a skill empurra até segmento, early adopter e anti-persona |
| `plg-without-aha` | PLG por moda com aha que exige reunião; a skill diz que não serve |
| `numbers-without-source` | número sem fonte; vira hipótese, com a pergunta da origem |

**Done when:** `npm run check` valida as quatro (prompt, rubrica, expect, driver);
cada rubrica cobra comportamento **visto** na T5, não imaginado.

## T8 — Medir (ciclo, passo 5)

`YAS_EVAL=1 YAS_EVAL_ONLY=<fixture> npm run eval`, uma por vez.

**Done when:** as quatro passam, cada uma com o tempo e a data registrados em
`specs/project/VERIFICATION.md`. Critério que falhar três rodadas com exemplo
diferente a cada vez vira limite conhecido no `VERIFICATION.md`, não quarta
reescrita.

## T9 — Fechar (ciclo, passo 6)

Vereditos aqui; linha no `ROADMAP.md`; `STATE.md` atualizado; ADR 0006 referido
onde couber.

**Done when:** `npm test` verde, PR aberto contra `main` com um assunto só, e o
`ROADMAP.md` dizendo o que saiu.
