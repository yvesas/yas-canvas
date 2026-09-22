# 0004 — desacoplar do baseline e entregar o handoff

**Status:** especificado (2026-09-22) · **Decisões:** `context.md`
**Origem:** o Yves, ao ver o pack público apontando para comandos que só existem
no baseline privado: "o importante é gerar resultado de nível estratégico, com
algum material para o usuário orientar outro agente depois".

## O problema

O repositório é público, e o pack manda quem o instala para coisas que não
existem na máquina dela. O preâmbulo — lido por **toda** skill — diz "mande
para `/commit`, `/pr` e as regras do baseline". O protocolo manda seguir
`.claude/rules/docs-and-specs.md`. A role manda ler `TEST_CMD` de
`.claude/stack.env`. Quem instala o yas-canvas sem o claude-base recebe
instruções para um sistema que não tem, e conclui que instalou errado.

Medido em 22/09, são **nove pontos em duas classes**:

| Classe | O que faz | Onde |
|---|---|---|
| **A — aponta para ferramenta operacional** | manda usar um comando ou ler um arquivo do baseline | preâmbulo (2), `/canvas` (2), protocolo (1), `/eng-review` (2) |
| **B — presume a estrutura de pastas do baseline** | manda salvar em `specs/features/NNNN-slug/`, `specs/quick/`, numerado "pela regra do projeto" | preâmbulo (1), protocolo (1) |

A classe B é a mais traiçoeira: ela não quebra nada visível, só faz a skill
inventar estrutura no repositório de alguém.

E a bancada nunca viu nada disso. O projeto de teste já recebe **só o pack**,
sem o baseline — as skills citavam `/commit` sem nunca executá-lo, e nenhum
critério perguntava se a citação fazia sentido naquela máquina.

## A forma

**yas-canvas é estratégico; o operacional é de quem executa** (D-HANDOFF-001).
O pack para de apontar para o operacional e passa a **entregar** o material que
um agente operacional pega depois:

```
specs/canvas/                      ← território do pack, e só ele (D-HANDOFF-004)
├── eng-review/
│   ├── architecture.md            partes: memória, editadas pela pessoa (0003)
│   ├── …
│   └── report.md                  o relatório, que sai do arquivo do plano
└── handoff/
    └── webhook.md                 um por alvo, gerado a partir das partes
```

O handoff é a fronteira. Tudo antes dele é decisão; tudo depois é execução, e é
de outro.

## Requisitos

- **REQ-001 — Nenhuma referência a ferramenta ou arquivo operacional.**
  WHEN uma skill ou arquivo compartilhado descreve o que não é do pack, THEN ele
  SHALL descrever o comportamento ("commit, PR e deploy são do fluxo do
  repositório de quem executa") e SHALL NOT nomear comando, pasta ou arquivo que
  só existe no baseline.

- **REQ-002 — O pack só escreve dentro de `specs/canvas/`.**
  WHEN uma skill grava qualquer coisa — parte, relatório, handoff —, THEN ela
  SHALL gravar em `specs/canvas/` e SHALL NOT presumir outra estrutura de pastas
  no projeto. Se o projeto não tem `specs/`, a regra da 0003 continua: pergunta
  uma vez onde gravar.

- **REQ-003 — O relatório sai do arquivo do plano.**
  WHEN a revisão fecha, THEN o relatório SHALL ser gravado em
  `specs/canvas/<role>/`, nunca acrescentado ao arquivo revisado. O plano é da
  pessoa.

- **REQ-004 — Um handoff por alvo.**
  WHEN existe pelo menos uma parte respondida sobre um alvo, THEN a skill SHALL
  poder gerar `specs/canvas/handoff/<alvo>.md`, reunindo as partes **de todas as
  roles** que revisaram aquele alvo. Um ponto de entrada, sempre atual.

- **REQ-005 — O formato é próprio, e compatível com o spec-driven.**
  O handoff SHALL ter, nesta ordem: **Contexto** · **Decisões** (`D-`) ·
  **Requisitos** (`REQ-`, com WHEN/THEN/SHALL) · **Restrições** (o que não
  fazer) · **Confirmar antes de executar** · **Tarefas** (com critério de
  pronto) · **Primeira tarefa**. Nenhum campo depende de ferramenta instalada;
  todos mapeiam 1:1 para o spec-driven (D-HANDOFF-002).

- **REQ-006 — Proposta não confirmada não vira tarefa.**
  WHEN a skill gera o handoff, THEN só o que está em `### O que você disse` —
  ou o que a pessoa confirmou explicitamente — SHALL virar decisão, requisito
  ou tarefa. O que está só em `### O que eu propus` SHALL ir para **Confirmar
  antes de executar**.
  Este é o requisito que mais importa aqui. A 0003 separou dito e proposto para
  um **leitor** não confundir os dois; o handoff vai para um **executor**. Um
  agente operacional que implementa uma proposta como se fosse decisão
  transforma o palpite da skill em código em produção.

- **REQ-007 — O handoff é regenerado, e as notas da pessoa sobrevivem.**
  WHEN o handoff é gerado de novo, THEN ele SHALL ser reescrito a partir das
  partes — é a única exceção à regra da 0003 de nunca apagar texto — e SHALL
  preservar, intacta, a seção `## Notas para quem executa`, que é da pessoa. O
  topo do arquivo diz que ele é gerado e onde se edita a fonte.

- **REQ-008 — O fechamento aponta para o handoff.**
  WHEN a sessão fecha, THEN a **uma tarefa** do preâmbulo SHALL ser a primeira
  tarefa do handoff, e o fechamento SHALL dizer onde ele está e o que fazer com
  ele — "entregue este arquivo a quem vai executar" —, sem nomear ferramenta.

- **REQ-009 — O acoplamento não volta.**
  WHEN `npm run check` roda, THEN ele SHALL falhar se `shared/` ou `skills/`
  citar um nome que só existe no baseline, apontando o arquivo e o nome.
  Contrato sem validador diverge — e este já divergiu uma vez sem ninguém ver.

- **REQ-010 — O eval cobra o handoff e a separação.**
  WHEN a suíte roda, THEN SHALL existir fixture que termina com o handoff no
  disco e verifica que (a) proposta não confirmada **não** aparece como tarefa,
  e (b) nenhum arquivo escrito pela sessão cita ferramenta do baseline. As
  fixtures existentes continuam passando.

## Fora de escopo

- **Gerar `spec.md` e `tasks.md` no formato do baseline** — D-HANDOFF-002. O
  handoff é compatível, não idêntico.
- **Handoff para os canvas** (CTO, tech lead). Eles conduzem uma pessoa, não um
  alvo; o que sai deles é outra coisa, e se decide quando existirem.
- **Executar o handoff.** O pack entrega e para. Essa é a fronteira inteira.
- **Validar o handoff num projeto de terceiro.** Mesma razão do REQ-007 da 0003:
  o `check` roda aqui e nunca veria o arquivo.

## O que isso muda no que já existe

| Arquivo | O quê |
|---|---|
| `shared/preamble.md` | "onde salvar" e "o que este pack não faz" reescritos; o fechamento aponta para o handoff |
| `shared/review-protocol.md` | relatório em `specs/canvas/`; o handoff como passo final; sem `docs-and-specs.md` |
| `skills/canvas/SKILL.md` | a fronteira em termos de comportamento; o controlador passa a mostrar os handoffs |
| `skills/eng-review/SKILL.md` | sem `ci-minutes.md` nem `TEST_CMD` |
| `scripts/check.mjs` | a guarda do REQ-009 |
| `test/` | a fixture do REQ-010 |

## Como saber se deu certo

O gate de sempre, e mais um que não tem eval: **alguém que nunca instalou o
claude-base instala o yas-canvas, roda uma revisão, e entrega o handoff a outro
agente sem precisar perguntar nada sobre ferramenta.** Se ele precisar
perguntar, o acoplamento só mudou de lugar.
