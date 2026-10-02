# 0010 — design

## O frontmatter

```yaml
name: founder-canvas
shared: [preamble, session-protocol]
references: [questions, concepts, templates]
parts: [context-and-stage, founder-why, problem-and-pains, audience-and-roles,
        jobs-and-alternatives, value-proposition, lean-canvas, aha-and-wow,
        growth-model, north-star-and-experiments]
description: >
  Canvas de produto para fundador early-stage …
allowed-tools: Read, Glob, Write, Edit, AskUserQuestion
triggers: [proposta de valor, lean canvas, público-alvo, pitch, momento aha,
           product-led growth, fundamentos de produto]
```

`shared` igual à `/cto-canvas` — preâmbulo e protocolo de sessão, sem
`review-protocol` (não há artefato para avaliar) e sem `handoff` (REQ-009: o que
sai é o resumo de uma página, não um documento de execução).

## `references:` — o mecanismo novo (REQ-011 a REQ-013)

Hoje uma skill é um arquivo. Dez fases com banco de perguntas, conceitos e
modelos não cabem em 400 linhas, e inflar o teto seria trocar um limite que
funciona por um arquivo que ninguém lê inteiro.

**A solução é a mesma do `shared:`, com outro escopo**: conteúdo declarado no
frontmatter, copiado pelo instalador, lido **sob demanda** pelo corpo.

| | `shared/` | `references/` |
|---|---|---|
| De quem é | do pack: uma fonte, várias skills | **de uma skill só** |
| Onde mora | `shared/<item>.md` | `skills/<skill>/references/<item>.md` |
| Quando é lido | no começo da sessão | **na fase que precisa** |
| Instalado em | `<skill>/<item>.md` | `<skill>/references/<item>.md` |

Três mudanças de código, pequenas:

1. **`bin/install`** — depois do laço de `shared`, um laço de `references`, lendo
   a lista do frontmatter com o mesmo `sed` já usado lá.
2. **`scripts/check.mjs`** — a régua do `shared:` replicada: declarada e
   inexistente, existente e não lida, presente em disco e não declarada.
3. **ADR 0006** — porque é estrutural: define o que entra numa reference (texto
   consultado por fase) e o que não entra (regra que vale sempre, que é `shared/`
   ou corpo da skill).

**O corpo diz quando ler cada uma**, e isso é o que faz o custo valer: o
`concepts.md` é lido antes das fases 4, 6, 7, 8 e 9; o `questions.md`, na fase
corrente; o `templates.md`, só na hora de gravar.

## O portão (REQ-003, REQ-004)

Primeira chamada de ferramenta, parada dura, no topo do arquivo — como nas
outras sete, e pelo mesmo motivo: regra que só existe depois de dois `Read` já
perdeu a corrida.

```
Em que ponto está o produto? RECOMENDAÇÃO: nenhuma — só você sabe.

  A) Ideia — nada construído ainda.
  B) Protótipo sem clientes.
  C) Primeiros clientes, sem receita.
  D) Primeira receita.
```

Exceção única, igual às outras: se a pessoa já nomeou o estágio, use o que ela
disse e anuncie em uma linha.

**O estágio calibra a profundidade** — e esta tabela é o REQ-004:

| Estágio | O que a sessão cobra | O que ela marca como prematuro |
|---|---|---|
| Ideia | problema, público, jobs | lean canvas inteiro, PLG, North Star |
| Protótipo | + proposta de valor, aha | modelo de entrada, PQL |
| Primeiros clientes | + experiência, crescimento | — |
| Primeira receita | tudo, com número | — |

"Prematuro" vira **frase no menu**, não bloqueio: a parte continua escolhível, e
quem escolhe sabe o que está pulando. O oposto — cobrar North Star de quem tem
uma ideia — ensina a inventar número, que é o que o REQ-007 proíbe.

## As dez partes

Cada uma fecha sozinha, com o conteúdo do material em `references/`:

| Parte | Fase do material | O que a parte precisa produzir |
|---|---|---|
| `context-and-stage` | 0 | o que o produto faz, o que **não** é, recursos, quem decide |
| `founder-why` | 1 | porquê em cena concreta, afinidade com o mercado |
| `problem-and-pains` | 2 | dores na voz do cliente, com evidência e nota; **três** principais |
| `audience-and-roles` | 3 | usuário × cliente × pagador × decisor, early adopter, anti-persona |
| `jobs-and-alternatives` | 4 | job statement e a tabela de alternativas, com "não fazer nada" |
| `value-proposition` | 5 | proposta, conceito de alto nível e pitch, na voz dele |
| `lean-canvas` | 6 | os onze blocos, cada um marcado fato ou hipótese |
| `aha-and-wow` | 7 | aha, wow, passos e minutos até o valor |
| `growth-model` | 8 | PLG × consultiva × híbrido, modelo de entrada, ativação, PQL |
| `north-star-and-experiments` | 9 | North Star com alvo e prazo, métricas de entrada, experimentos |

## O arquivo de parte (REQ-008)

ADR 0004 manda três títulos, sempre presentes mesmo vazios. Os modelos do
material são **formulário**, e o mapeamento precisa ser mecânico para não virar
decisão a cada fase:

| O que é | Vai para |
|---|---|
| o que o fundador disse, com citação literal | `### O que você disse` |
| a síntese, o formulário preenchido, a frase proposta | `### O que eu propus` |
| hipótese não comprovada, com a forma de testar, e a pergunta que sobrou | `### Em aberto` |

A marca `(hipótese)` acompanha o item onde ele estiver — o REQ-007 vale dentro
dos três títulos, não só no terceiro.

## O fechamento (REQ-009)

`specs/canvas/founder-canvas/canvas.md`, regenerado a cada fechamento, uma
página: estágio · porquê · três dores · público · proposta de valor · pitch ·
aha · decisão de crescimento · North Star · três primeiros experimentos · o que
ficou em aberto.

É **vista**, como o `canvas.md` da `/cto-canvas`: para mudar o que ele diz,
muda-se a parte e gera de novo.

Depois dele, o fechamento do preâmbulo — duas ou três citações literais, **uma**
tarefa, status.

## Independência (REQ-001, REQ-017)

O corpo não cita `/pm-review`, `/ceo-review`, `/cto-canvas` nem nenhuma outra. A
tentação é concreta: a fase 2 parece a `/pm-review` e a fase 9 toca métrica, que
a `/ceo-review` também cobra. **Parecer não é depender** — e a pessoa que chega
pela `/founder-canvas` pode ter instalado só ela.

O teste é um grep: `test/standalone.test.mjs` falha se o corpo da
`founder-canvas` casar com `/\/(pm|ceo|eng|security|ux|cto)-(review|canvas)/`.
Fica em teste, não no `check.mjs`, porque a regra é de **uma** skill — e o
`check.mjs` é a régua de todas.

## O roteador (REQ-014)

Uma linha na tabela de roteamento, e a ordem de amadurecimento no corpo:
`founder-canvas` (ideia, protótipo) → `pm-review` → `ceo-review` → `cto-canvas`
→ `eng-review` · `security-review` · `ux-review`. O `check.mjs` já cobra que o
roteador só aponte para skill existente.

## Alternativas de implementação

| | O que é | Esforço | Risco |
|---|---|---|---|
| **Mínima viável** | dez partes no `SKILL.md`, sem `references/`: perguntas e modelos resumidos no corpo | P | estoura o teto de 400 linhas ou corta o banco de perguntas, que é o conteúdo autoral |
| **Recomendada** | `references/` como mecanismo novo (três mudanças pequenas) + skill em ~250 linhas | M | o mecanismo é novo e nenhuma outra skill o usa ainda; vira dívida se a segunda nunca vier |
| **Ideal, descartada** | partes como arquivos próprios (`skills/<skill>/parts/<id>.md`), carregadas sob demanda | G | reescreve o instalador, o `check.mjs` e as sete skills; só se paga com mais de uma skill grande |

**Recomendo a do meio.** O que mudaria minha opinião: se o corpo couber em 400
linhas com os modelos inline **sem** resumir o banco de perguntas, a mínima
viável vence — e isso se descobre escrevendo a skill, não discutindo.
