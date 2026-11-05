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

Uma decisão que eu tomei escrevendo e o Yves reverteu em 02/10: eu havia trocado
"product-led growth" por "crescimento pelo produto" no corpo. **O termo em inglês
voltou** — ver D-FC-007 no `context.md`. Traduzir um termo que nomeia uma coisa
tira o nome dela, e é o nome que a pessoa vai reencontrar em tudo que ler depois.
A explicação sob demanda, que era o meu objetivo, já estava no `concepts.md`.

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

**✅ fechada em 05/11, com ressalva** — decisão do Yves. A sessão foi a do
Elmer (29/10), com o produto real dele, e não um diretório descartável: seis
partes gravadas em `elmer/specs/canvas/founder-canvas/`. **Mas a skill não foi
invocada.** Ela não estava instalada (o `bin/install` ainda ignorava o
`CLAUDE_CONFIG_DIR`), e o agente leu o `SKILL.md` com `cat` e seguiu como
roteiro, sem o preâmbulo. Por isso a sessão serve para metade do que a T5
existe para dar: **como o fundador responde**. O comportamento da skill
invocada fica para a T8, que roda a skill instalada contra essas falas.

O que o fundador fez, e que as fixtures agora reproduzem:

- **Respondeu longo, por áudio transcrito, com três ou quatro assuntos numa
  resposta só.** Foi o que levou à D-FC-008.
- **Corrigiu premissa da sessão** ("não, não precisa") e corrigiu o estágio
  que o agente presumiu ("não tem protótipo"). Presumir o estágio é o que o
  portão existe para impedir.
- **A transcrição trocou nome próprio**: "WeDiet", "Wealth", "Else" para as
  ferramentas reais. A sessão confirmou os nomes antes de gravar, e acertou.
- **Respondeu com funcionalidade quando a pergunta era a dor** (painel
  financeiro, funil, equipe). A sessão marcou o financeiro como hipótese, porque
  não veio de queixa.
- **Pediu para acelerar na terceira pergunta.** Foi aí que a conversa ficou
  pesada, e a resposta errada — oito perguntas de três partes, "o silêncio
  aceita" — é o que a sessão fez de pior.

O que a sessão fez que não estava previsto: **completou o perfil do público com
um número que o fundador nunca deu** ("20 a 80 pacientes ativos"), e **ofereceu
desviar o canvas para modelo de dados**, saindo do método no meio.

Violado ou não exercido: o portão (nada disparou a skill), uma pergunta por vez,
o menu e o fechamento com uma tarefa. As partes de crescimento não rodaram — no
estágio de ideia são prematuras, e ninguém escolheu.

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

**✅ escrita em 05/11, com uma troca.** `npm run check` valida as quatro, e cada
rubrica diz, no topo, o que a T5 viu e de onde vem cada critério. As falas são
sintéticas (salão de beleza, controle financeiro, aulas de música, fisioterapia),
mas a **forma** é a do Elmer: resposta longa e misturada, nome trocado pela
transcrição, relato de terceiro no lugar de cena, pressa.

**A troca: `plg-without-aha` saiu, `founder-asks-to-speed-up` entrou.** A T5
não chegou a `growth-model` — no estágio de ideia ela é prematura —, então uma
rubrica sobre PLG seria exatamente a fixture escrita antes da sessão que esta
ordem existe para evitar. Ela espera uma sessão que chegue lá; a linha continua
`⚠️` no `VERIFICATION.md`. No lugar entrou o defeito mais caro que a T5 mostrou:
o pedido para acelerar respondido com oito perguntas e "o silêncio aceita".

| Fixture | O que ela cobra | De onde veio |
|---|---|---|
| `founder-solution-first` | portão primeiro; estágio calibra; dor na voz do cliente | funcionalidade no lugar de dor; o portão que a T5 não exerceu |
| `audience-too-broad` | segmento, quatro papéis, early adopter, anti-persona, **sem número inventado** | o "20 a 80 pacientes" |
| `numbers-without-source` | prematuro sem bloquear; a origem, não o valor; a marca fica no arquivo | o financeiro como hipótese; o número próprio sem fonte |
| `founder-asks-to-speed-up` | até duas perguntas sob pressa; silêncio não aceita; confirmar nome | a terceira pergunta do Elmer |

Todas cobram `duas_perguntas_no_maximo` ou equivalente, porque a D-FC-008 vale
em toda sessão, e é a regra mais nova do pack.

## T8 — Medir (ciclo, passo 5)

`YAS_EVAL=1 YAS_EVAL_ONLY=<fixture> npm run eval`, uma por vez.

**Done when:** as quatro passam, cada uma com o tempo e a data registrados em
`specs/project/VERIFICATION.md`. Critério que falhar três rodadas com exemplo
diferente a cada vez vira limite conhecido no `VERIFICATION.md`, não quarta
reescrita.

**✅ medida em 05/11, três rodadas, e as quatro não passam.** Só a
`founder-asks-to-speed-up` fechou verde (rodadas 2 e 3). O resultado critério a
critério está no `VERIFICATION.md`: seis comportamentos provados, um limite
conhecido (duas perguntas de assuntos diferentes, três de três) e quatro
critérios que oscilam. Cada fixture leva ~2 min. O `Done when` pedia as quatro
verdes; o que a task permite em troca é exatamente o limite registrado, e foi
o que se fez.

O que cada rodada consertou:

- **Rodada 1 → 2, a bancada.** O juiz recebia as ferramentas numa lista plana,
  sem turno e sem as falas do usuário, e reprovou o portão que tinha
  funcionado. Agora a transcrição vai turno a turno (`renderLog` no
  `harness.mjs`). Isso muda o juiz de **todas** as fixtures.
- **Rodada 1 → 2, a skill.** A D-FC-008 nunca tinha entrado no texto: o
  preâmbulo dizia "até duas", mas não que silêncio não confirma, e a sessão
  repetiu o Elmer ("onde você não responder eu sigo a recomendação"). Entrou
  "**Silêncio não confirma**" no preâmbulo; exemplo sem número e "quem contou
  não foi observado" na skill; a coluna "como testar" no Lean Canvas.
- **Rodada 1 → 2, as rubricas.** Cinco critérios meus estavam errados: contavam
  pergunta retórica, cobravam a cena do fundador como evidência forte (a skill
  manda marcá-la hipótese), e cobravam os três títulos no `canvas.md`.
- **Rodada 2 → 3, a skill.** "Mandar fechar não fecha" (a sessão gravou
  `respondido` com dores deduzidas das funcionalidades) e "conte as perguntas
  antes de mandar". A segunda não mudou o resultado — por isso virou limite.

## T9 — Fechar (ciclo, passo 6)

Vereditos aqui; linha no `ROADMAP.md`; `STATE.md` atualizado; ADR 0006 referido
onde couber.

**Done when:** `npm test` verde, PR aberto contra `main` com um assunto só, e o
`ROADMAP.md` dizendo o que saiu.
