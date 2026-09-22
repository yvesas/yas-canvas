# 0004 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`

A ordem é a do `design.md` §10: o contrato primeiro, quem o lê depois, a guarda
e a bancada por último — e a causa no fim, porque corrigi-la antes das skills
deixaria a regra dizendo uma coisa e o código outra.

> **A mesma exceção declarada da 0003.** O eval do handoff exercita protocolo,
> preâmbulo e role juntos, e não passa antes de T1–T3 existirem. As tasks
> intermediárias carregam o gate barato; o caro fecha em T5.

---

## T1 — o contrato: memória × vista, território e handoff `[REQ-002..007]`

**O quê:** o `review-protocol.md` ganha a distinção memória × vista (design §1),
o território `specs/canvas/` (§2), o relatório em
`specs/canvas/<role>/report-<alvo>.md` com o `<alvo>` derivado do caminho, e o
handoff: quando é gerado (§5), como é montado (§3) e o formato (§4). Os exemplos
de alvo passam a usar `docs/plano-webhook.md`.

**Onde:** `shared/review-protocol.md`

**Done when:** `npm run check` verde · o protocolo não cita `specs/features/`,
`specs/quick/` nem `docs-and-specs` · a regra "proposta não confirmada não vira
tarefa" está escrita com a tabela de destino item a item, não como intenção ·
as frases-âncora do `check.mjs` continuam existindo, ou mudam **junto**.

---

## T2 — o preâmbulo: a fronteira e o fechamento `[REQ-001, REQ-002, REQ-008]`

**O quê:** "A saída é um documento" aponta para `specs/canvas/`; "onde salvar"
sai; "O que este pack não faz" diz a fronteira com as palavras do Yves — o pack
entrega o handoff e para, e commit, PR, deploy e segredo são do fluxo de quem
executa. O fechamento: a **uma tarefa** é a primeira do handoff, e a sessão diz
onde ele está e o que fazer com ele, sem nomear ferramenta.

**Onde:** `shared/preamble.md`

**Depende de:** T1

**Done when:** `npm run check` verde · o preâmbulo não cita comando, pasta ou
regra do baseline · a regra "uma tarefa, **uma**" continua intacta — o handoff
tem várias tarefas, mas a sessão entrega uma.

---

## T3 — as skills `[REQ-001]`

**O quê:** `/eng-review` perde o parêntese do `ci-minutes.md` (instinto 10) e o
`TEST_CMD` (`tests`), que vira "o comando que o projeto documenta". `/canvas`
diz a fronteira em termos de comportamento, e o controlador passa a listar os
handoffs de `specs/canvas/handoff/` pelo frontmatter (`alvo`, `gerado`,
`nao_cobertas`) — só lendo, como tudo nele.

**Onde:** `skills/eng-review/SKILL.md`, `skills/canvas/SKILL.md`

**Depende de:** T1

**Done when:** `npm run check` verde · `/canvas` continua **sem** `Write` e
sem `Edit` · `/eng-review` abaixo de 200 linhas.

---

## T4 — a guarda `[REQ-009]`

**O quê:** o `check.mjs` falha quando `shared/` ou `skills/` citam os padrões
do design §8, com o arquivo e o padrão na mensagem. A lista `external` do
roteador — que autorizava os comandos do baseline — sai.

**Onde:** `scripts/check.mjs`

**Depende de:** T2, T3

**Done when:** reintroduzir cada padrão de propósito é apontado pelo nome · a
exceção `.claude/skills` não é acusada · `CLAUDE.md`, `docs/`, `specs/` e
`test/` **não** são varridos · `npm run check` verde depois de desfazer.

---

## T5 — a bancada e a armadilha `[REQ-010]`

**O quê:** a chave `writtenMustNotContainAny` no harness, varrendo tudo que a
sessão escreveu em `specs/canvas/`, e na lista de chaves válidas do `check.mjs`.
E a fixture nova: nasce com partes, uma delas com uma proposta tentadora que só
existe em `### O que eu propus`, nunca confirmada.

**Onde:** `test/lib/harness.mjs`, `scripts/check.mjs`, `test/fixtures/<nova>/`

**Depende de:** T2, T3

**Done when:** a suíte fecha **12 de 12** · as cinco fixtures de hoje **não
foram tocadas** · a proposta-armadilha aparece em **Confirmar antes de
executar** e em nenhuma tarefa · nenhum arquivo gravado cita ferramenta do
baseline.

---

## T6 — a causa, e o fechamento `[design §7]`

**O quê:** a golden rule do `CLAUDE.md` deste repositório deixa de mandar a
skill apontar para `/commit` e `/pr` — passa a mandar entregar o handoff e
parar. O princípio 1 do `PROJECT.md` diz a fronteira estratégico × operacional.
`ROADMAP.md` e `STATE.md` fecham a feature.

**ADR:** a fronteira estratégico × operacional é estrutural e permanente — vira
ADR. E o formato do arquivo de parte, adiado na 0003 até "alguém além da role
ler o que ela escreveu": **o gerador do handoff é esse leitor.** O gatilho
disparou; decidir aqui se vira ADR próprio ou parte do mesmo.

**Depende de:** T5

**Done when:** o `CLAUDE.md` e o `PROJECT.md` não prescrevem mais o
acoplamento · ADR escrito · PR aberto com corpo informado.
