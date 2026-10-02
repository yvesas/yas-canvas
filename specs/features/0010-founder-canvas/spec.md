# 0010 — `/founder-canvas`

> Origem: `docs/skills-handoff/1-PROMPT-yas-canvas.md`, Parte A, e o material
> aprovado em `docs/skills-handoff/material-founder-canvas/`. A tarefa é
> **adaptar ao formato do pack**, não reescrever o método.

## Por que

O pack tem cinco revisões e um canvas, e todos pressupõem que já existe um plano
— ou, no caso da `/cto-canvas`, que a pergunta é técnica. Falta a fase anterior:
o fundador que tem um protótipo e não sabe dizer o problema sem citar a própria
solução. É também a persona que o `PROJECT.md` põe em primeiro lugar, e a única
que hoje não tem porta de entrada.

A `/founder-canvas` é a oitava skill e o **segundo canvas**: ela estrutura a
pessoa, não um artefato.

## Requisitos

Cada um tem ID porque o `design.md` e o `tasks.md` citam a origem.

### A skill

- **REQ-001 — Independente.** Roda do começo ao fim sem depender de outra skill,
  e **não cita nenhuma** no corpo. As fases de problema, público e métricas são
  dela, mesmo parecendo com partes da `/pm-review` ou da `/ceo-review`.
- **REQ-002 — Formato do pack.** Frontmatter com `name: founder-canvas`,
  `shared: [preamble, session-protocol]`, `parts:` com as dez fases em ids curtos
  em inglês, `description`, `allowed-tools`, `triggers`.
- **REQ-003 — Portão de estágio primeiro**, no padrão da `/cto-canvas`: ideia ·
  protótipo sem clientes · primeiros clientes · primeira receita. Primeira
  chamada de ferramenta, parada dura, antes de qualquer leitura.
- **REQ-004 — O estágio muda a profundidade** de cada fase, e o menu diz quando
  uma fase é prematura — sem bloquear a escolha.
- **REQ-005 — Uma pergunta por vez**, até aparecer nome próprio, número ou caso
  real. Respostas longas e ditadas por áudio são aceitas: interpretar pelo
  contexto e **confirmar nome próprio** antes de gravar.
- **REQ-006 — Frase do produto na voz do fundador.** Proposta de valor, conceito
  de alto nível e pitch saem em duas ou três versões e são ajustados até ele
  dizer que soa como ele.
- **REQ-007 — Fato × hipótese.** O que não foi comprovado com cliente real é
  marcado como hipótese, com a forma de testar. Nunca inventar número, nome de
  cliente, data ou resultado.
- **REQ-008 — Saída por parte.** Cada fase fechada grava
  `specs/canvas/founder-canvas/<parte>.md` no formato do ADR 0004, com o
  conteúdo organizado pelos modelos do material.
- **REQ-009 — Resumo de uma página** no fechamento, regenerado, em
  `specs/canvas/founder-canvas/canvas.md` — mesma convenção da `/cto-canvas`.
- **REQ-010 — Armadilhas apontadas quando aparecerem**: solução antes do
  problema · público amplo demais · proposta de valor que descreve tecnologia ·
  usuário confundido com pagador · PLG com aha que exige reunião · medir cadastro
  em vez de ativação · pitch na voz de quem conduz · número sem fonte · história
  que apaga sócios.

### O mecanismo que ela exige

- **REQ-011 — `references/` passa a existir no pack.** A skill carrega conteúdo
  que ela lê **sob demanda** (banco de perguntas, conceitos, modelos) em
  `skills/founder-canvas/references/<nome>.md`, declarado no frontmatter.
- **REQ-012 — O instalador copia as references** declaradas, no `--project` e no
  padrão. Hoje ele copia só `SKILL.md` e os `shared/` — uma pasta `references/`
  seria instalada em lugar nenhum, **sem erro e sem aviso**.
- **REQ-013 — O `check.mjs` cobra references** com a mesma régua do `shared:`:
  declarada e inexistente falha; existente e nunca lida falha; arquivo em
  `references/` que ninguém declarou falha.

### Integração

- **REQ-014 — O roteador reconhece produto.** `/canvas` ganha a linha de
  proposta de valor, público, pitch, lean canvas e "me ajuda a pensar meu
  produto" apontando para `/founder-canvas`.
- **REQ-015 — A documentação de usuário inclui a oitava skill**: tabela do
  `README.md`, do `CLAUDE.md` e a ordem de uso no `docs/getting-started.md`.

### Prova

- **REQ-016 — Quatro fixtures**, escritas **depois** de uma sessão real
  (`WRITING-SKILLS.md`, ciclo passo 3):
  - fundador que só fala da solução e não descreve o problema;
  - público amplo demais ("pequenas empresas");
  - PLG escolhido por moda, com aha que exige reunião;
  - número sem fonte — a skill marca como hipótese e pergunta a origem.
- **REQ-017 — A independência é testada**, não só escrita: um teste falha se o
  corpo da skill citar outra skill do pack (REQ-001).

## Fora de escopo

O build portátil e o release são as features **0011** e **0012**. Esta entrega
não gera `dist/`, não cria tag e não mexe no `package.json`.

## Riscos

- **Dez partes é quase o dobro da maior role de hoje** (cinco na `/eng-review`,
  seis na `/cto-canvas`). O teto de 400 linhas do `SKILL.md` vai apertar, e é o
  que obriga as references a existirem — ver `design.md`.
- **Sessão longa tem mais chance de ser abandonada no meio.** O protocolo já
  resolve (cada parte fecha sozinha), mas o menu de dez itens é o maior já
  tentado: se a pessoa sair sempre na mesma fase, o problema é a ordem.
- **A fase de métricas pede número que um fundador de ideia não tem.** Sem o
  REQ-004 funcionando, a sessão cobra o que não existe e ensina a inventar — o
  oposto do REQ-007.
