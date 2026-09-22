# O handoff — o que sai para quem vai executar

> Lido **no fechamento**, por quem gera o handoff — não no começo da sessão. O
> formato dele importa uma vez por sessão; o `review-protocol.md` importa em
> todo turno, e o que é lido sempre precisa ser curto.

Aqui acaba o seu trabalho. O handoff é o documento que a pessoa entrega a quem
vai construir: outro agente, outro editor, um dev da equipe. Ele não presume
ferramenta nenhuma instalada na máquina de ninguém.

**Gere no fechamento de toda sessão que respondeu ao menos uma parte**, inteiro,
em `specs/canvas/handoff/<alvo>.md`. A **uma tarefa** do fechamento (preâmbulo)
é a primeira tarefa dele.

**Como montar.** Leia `specs/canvas/*/*.md` — **todas as roles**, não só a sua —
e use apenas as rodadas cujo título nomeia este alvo. Cada item tem um destino,
e a regra é mecânica:

| Onde o item está, na parte | Para onde vai |
|---|---|
| em `### O que você disse` | Decisões · Requisitos · Restrições · Tarefas |
| em `### O que eu propus`, **com** confirmação dela depois | idem, citando a confirmação |
| em `### O que eu propus`, **sem** confirmação | **Confirmar antes de executar** |
| em `### Em aberto` | **Confirmar antes de executar** |
| parte `pendente`, `descartado`, ou sem arquivo | **O que esta revisão não cobriu** |

**Todo item cita a fonte**: a parte, a data e a frase que o autoriza. Item sem
citação não é decisão — é proposta sua, e o lugar dela é "Confirmar antes de
executar".

Essa linha é dura de propósito. Quem lê o relatório decide; **quem lê o handoff
executa**. Uma proposta sua implementada como se fosse decisão dela é o seu
palpite virando código em produção, e daqui a três meses ninguém lembra de onde
ele saiu.

```markdown
---
alvo: docs/plano-webhook.md
gerado: 2026-09-22
fontes: [eng-review/architecture, eng-review/security-and-data]
nao_cobertas: [eng-review/tests, eng-review/quality]
---

<!-- GERADO a partir de specs/canvas/<role>/<parte>.md. Para mudar o que está
     aqui, edite a parte e gere de novo. A única seção que sobrevive à
     regeneração é "Notas para quem executa", no fim. -->

# Handoff — docs/plano-webhook.md

## Contexto
Duas ou três frases: o que o plano quer, e em que mundo ele está (§2).

## Decisões
- **D-001** — o webhook guarda o número do processo; CPF não entra.
  · eng-review/security-and-data, 2026-09-22 · > "CPF não precisa ficar"

## Requisitos
- **REQ-001** — WHEN o fornecedor devolve 429, THEN o worker SHALL esperar e
  tentar de novo sem perder a mensagem. · eng-review/architecture

## Restrições — o que não fazer
- Não logar o corpo da movimentação. · eng-review/security-and-data

## Confirmar antes de executar
- Fila dedicada por cliente — **proposto, não confirmado**.
  · eng-review/architecture · não execute sem perguntar

## Tarefas
- **T1** — isolar o fornecedor atrás de uma interface, com implementação falsa.
  Pronto quando: um teste roda sem rede.

## Primeira tarefa
T1, porque destrava as outras duas.

## O que esta revisão não cobriu
- `tests` — sem ela, "sem teste + sem tratamento + falha silenciosa" não foi
  verificada em caminho nenhum.

## Notas para quem executa
<!-- Da pessoa. Preservado entre regenerações. -->
```

**O handoff é gerado, não editado.** Ao regenerar, reescreva tudo — menos
`## Notas para quem executa`, que é dela e passa intacta. É a diferença entre
vista e memória do §4: a parte você nunca reescreve; esta aqui, sempre.

**Os IDs são locais ao handoff** (`D-001`, `REQ-001`, `T1`). Eles mapeiam para
o que um fluxo de specs faria com eles, sem presumir a numeração de um projeto
que talvez nem use um.

