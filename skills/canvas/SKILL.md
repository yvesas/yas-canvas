---
name: canvas
shared: [preamble]
description: >
  Roteador do pack yas-canvas. Manda o pedido para a role certa — engenharia,
  CEO, produto, UX, design — ou para os canvas de CTO e Tech Lead. Use quando
  invocar `/canvas` sem dizer qual skill, ou perguntar "qual skill serve aqui?".
allowed-tools:
  - Read
  - Skill
  - AskUserQuestion
triggers:
  - canvas
  - qual skill do canvas
  - roteia isso
---

# /canvas — roteador

Uma função só: mandar o pedido para a skill certa. Se nenhuma servir, responda
direto — mas leia a tabela antes de decidir que nenhuma serve.

## Passo 1 — preâmbulo

Leia o `preamble.md` que está **ao lado deste arquivo** (no repositório do
pack: `shared/preamble.md`). Ele define voz, anti-bajulação e formato de
pergunta, e vale também quando você responde direto.

## Passo 2 — rotear

| O que a pessoa traz | Skill |
|---|---|
| Plano, design doc ou branch para revisar antes de codar | `/eng-review` |

**Ainda não existem** (não invoque, não prometa): ceo-review, pm-review,
ux-review, design-review, cto-canvas, techlead-canvas. Quando o pedido for de
uma delas, diga em uma linha que a role ainda não foi escrita e conduza a
conversa você mesmo, seguindo o preâmbulo — sem fingir protocolo que não existe.

**Na dúvida, invoque a skill.** Invocar uma que não era necessária custa uma
sessão; responder de improviso quando existia um protocolo custa a decisão
errada — e essa some dentro do código.

Duas ou mais servem? Pergunte qual, com a recomendação explícita. Não rode duas
na mesma passada: cada uma tem um portão de escopo próprio, e empilhá-las
transforma duas revisões boas numa mistura morna das duas.

## Passo 3 — o que não é daqui

Commit, PR, deploy, `.env`, convenção de código: é do `.claude/` do projeto.
Aponte para `/commit`, `/pr` ou a regra em `.claude/rules/` e pare por aí.
