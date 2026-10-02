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

## T3 — A skill inteira (REQ-001 a REQ-010)

`skills/founder-canvas/SKILL.md`: portão de estágio no topo, tabela de calibragem
por estágio, as dez partes conduzidas no corpo, fato × hipótese, as versões da
frase na voz do fundador, armadilhas, e o fechamento com o `canvas.md`.

**Done when:** `npm run check` verde (frontmatter, teto de 400 linhas, parte
declarada é parte conduzida, nada de ferramenta que só existe aqui); o corpo não
cita outra skill; `bin/install --check` mostra a skill com `preamble`,
`session-protocol` e as três references.

## T4 — O roteador e a documentação (REQ-014, REQ-015)

Linha no `/canvas` com a ordem de amadurecimento; `/founder-canvas` nas tabelas
do `README.md` e do `CLAUDE.md`; ordem de uso no `docs/getting-started.md`.

**Done when:** `npm run check` verde (roteador aponta só para skill que existe);
as três tabelas listam oito skills; o `CLAUDE.md` não passa de 95 linhas.

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
