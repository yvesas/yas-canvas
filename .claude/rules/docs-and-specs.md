# Regra — Onde vive cada documento

> Todo projeto que usa este baseline tem `docs/` e `specs/`. A divisão evita o problema
> clássico: plano e verdade misturados no mesmo arquivo, os dois envelhecendo.

## A divisão em uma linha

**`specs/` é o plano — muda o tempo todo. `docs/` é o produto acabado — muda
quando o sistema muda.**

| Pergunta | Onde |
|---|---|
| O que vamos construir e por quê? | `specs/features/NNNN-slug/spec.md` |
| Como vamos construir? | `specs/features/NNNN-slug/design.md` |
| Quais os passos e o que já foi feito? | `specs/features/NNNN-slug/tasks.md` |
| Em que pé está o projeto agora? | `specs/project/STATE.md` |
| O que vem depois? | `specs/project/ROADMAP.md` |
| Qual a visão e os princípios? | `specs/project/PROJECT.md` |
| Como o sistema é, hoje? | `docs/architecture.md` |
| Por que decidimos assim, para sempre? | `docs/adr/NNNN-titulo.md` |
| Como rodo / opero / debugo isso? | `docs/runbooks/`, `README.md` |
| Qual o contrato da API? | `docs/api.md` (ou OpenAPI gerado) |
| Qual a linguagem e por que essa? | `CLAUDE.md` do projeto (e ADR, se foi disputado) |
| Que comando formata, verifica e testa? | `.claude/stack.env` — é o que os hooks leem |

## Estrutura

```
<projeto>/
├── CLAUDE.md              # índice para o agente (≤80 linhas)
├── README.md              # para humano: o que é, como rodar
├── docs/
│   ├── architecture.md    # como o sistema é hoje
│   ├── decisions.md       # decisões menores, uma linha por row
│   ├── adr/               # decisões estruturais, uma por arquivo
│   └── runbooks/          # operação, deploy, troubleshooting
└── specs/
    ├── project/
    │   ├── PROJECT.md     # visão, objetivos, princípios, stack
    │   ├── ROADMAP.md     # features e marcos, com o que já saiu
    │   └── STATE.md       # memória: estado, decisões, blockers, pendências
    ├── codebase/          # só em projeto existente (brownfield mapping)
    │   ├── STACK.md  ARCHITECTURE.md  CONVENTIONS.md
    │   ├── STRUCTURE.md  TESTING.md  INTEGRATIONS.md  CONCERNS.md
    ├── features/
    │   └── NNNN-slug/
    │       ├── spec.md    # requisitos com IDs rastreáveis (REQ-001…)
    │       ├── context.md # decisões do usuário em áreas cinzentas (opcional)
    │       ├── design.md  # arquitetura e componentes (features grandes)
    │       └── tasks.md   # tasks atômicas com critério de verificação
    └── quick/NNN-slug/    # tarefas ad-hoc (≤3 arquivos)
```

## Regras de uso

- **Stack se declara em dois lugares, e só dois**: o `CLAUDE.md` do projeto
  explica a escolha para quem lê, e o `.claude/stack.env` dá os comandos para
  quem executa. Um terceiro documento dizendo o mesmo é o problema que esta
  regra existe para evitar — em projeto brownfield, `specs/codebase/STACK.md` é
  o retrato do que foi encontrado no mapeamento, não uma segunda fonte.
- **Numeração de feature é sequencial e contínua no projeto**, 4 dígitos:
  `0001-`, `0002-`… Nunca renumere.
- **`STATE.md` é memória de trabalho e é reescrito.** Decisão que precisa
  sobreviver a uma reescrita vira ADR em `docs/adr/`.
- **Requisito recebe ID** (`REQ-001`) e decisão recebe ID (`D-XYZ-001`), para
  o `design.md` e o `tasks.md` poderem citar a origem.
- **Registrar o que ficou pendente de terceiro** (decisão de produto, acesso,
  credencial) explicitamente — em `STATE.md` ou num arquivo de perguntas. O que
  não está escrito vira retrabalho.
- Ao terminar uma feature, o `ROADMAP.md` ganha a linha do que saiu e o
  `STATE.md` é atualizado. Isso faz parte da feature, não é opcional.
- A skill `spec-driven` conduz esse fluxo e dimensiona a profundidade pelo
  tamanho da mudança — mudança pequena não precisa de `design.md` nem `tasks.md`.
