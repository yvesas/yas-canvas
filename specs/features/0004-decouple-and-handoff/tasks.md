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

**Feito** (2026-09-22), e reestruturado depois pelo eval. O §4 virou "o que o
pack escreve, e onde", com a distinção **memória × vista** que o spec não tinha.
O §7 nasceu aqui com o handoff inteiro — e **saiu** na terceira rodada: o
protocolo chegou a 338 linhas e uma fixture de um turno só parou de tomar
posição. Virou `shared/handoff.md`, lido no fechamento, e o protocolo voltou
para 269.

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

**Feito** (2026-09-22), com uma ressalva que o spec não previa: o preâmbulo é
lido por **toda** skill, inclusive as que não revisam artefato nenhum. Exigir
handoff sempre trocaria um acoplamento por outro, então ficou condicionado —
sessão sem alvo para entregar fecha com a tarefa e mais nada.

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

**Feito** (2026-09-22). `/eng-review` em 156 linhas, `/canvas` sem `Write` e
sem `Edit`. Com a T1 e a T2, os nove pontos de acoplamento chegaram a zero.

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

**Feito** (2026-09-22). Cada padrão foi reintroduzido de propósito e apontado:

```
cita `/commit` (comando do baseline) — descreva o comportamento, não a ferramenta
cita `.claude/` (pasta do baseline)
cita `ci-minutes` (regra do baseline pelo nome)
cita `stack.env` (configuração do baseline)
cita `specs/features/` (estrutura de pastas que o projeto pode não ter)
```

Os dois controles passaram, inclusive a exceção `~/.claude/skills`. E saiu a
lista `external` do roteador, que autorizava exatamente estes nomes — enquanto
ela existisse, a guarda não teria efeito sobre o `/canvas`.

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

**Feito** (2026-09-22), em quatro rodadas. `# pass 19 · # fail 0`, com as seis
fixtures nas duas camadas. **A armadilha funcionou na primeira rodada:** a
proposta de separar o portal num serviço próprio — que contradiz o "não quero
outro serviço" da pessoa — foi para "Confirmar antes de executar", nunca para
tarefa.

**O "não foram tocadas" não se cumpriu, e uma das duas mudanças era erro meu.**

- `greenfield-plan`: 9 → **11** turnos, e fica. Ele estourou o teto antes e
  depois de a régua ser corrigida: é a sessão mais longa da suíte, cinco partes
  sem código para ler, e a 0004 acrescentou um entregável ao fechamento.
- `webhook-cpf`: subiu para 11 e **voltou para 9**. Ele nunca precisou: o
  relatório estava gravado, o juiz aprovava, e quem reprovava era o marco de
  parada, que só olhava a transcrição. Consertei a fixture por um defeito da
  bancada — exatamente o que a regra "conserta o texto, nunca a fixture" existe
  para impedir. Só apareceu porque fui conferir.

**O que as quatro rodadas acharam**, e nenhuma foi ruído:

1. **A regra que trava a sessão.** "Se o projeto não tiver `specs/`, pergunte
   uma vez onde gravar" era inofensiva na 0003, onde o relatório ia para o
   arquivo do plano. Com tudo indo para `specs/canvas/`, virou muro: uma
   fixture fechou com "espero a resposta para gravar" em vez da tarefa da
   semana; outra gastou os turnos esperando. Agora: crie, grave, e diga onde.
2. **Protocolo grande demais não cabe numa resposta.** Com o handoff dentro
   dele, o arquivo foi a 338 linhas e o `vague-scale` — um turno só — parou de
   nomear bandeira vermelha e de tomar posição, duas rodadas seguidas. O
   handoff virou `shared/handoff.md`, lido no fechamento; o protocolo voltou
   para 269 e a fixture voltou a passar.
3. **Teto de turnos** (acima).
4. **A régua media narração.** O marco de parada olhava só o chat, e reprovava
   sessão que gravou o relatório sem recitar o título. É o mesmo defeito que a
   0002 tirou do juiz, numa porta nova. Agora vale transcrição **ou** disco.

**E um erro de coleta, o mesmo que o `TESTING.md` já documenta:** rodei uma das
rodadas com `| grep`, e quando o juiz reprovou não havia veredito para
diagnosticar. Eval se roda sem cano.

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

**Feito** (2026-09-22). A golden rule mandava apontar para `/commit` e `/pr` —
era a instrução que **produzia** o acoplamento, e a próxima role a teria seguido.
Dois ADRs: o **0003** (a fronteira é um documento, com a alternativa descartada
de só trocar por palavras genéricas) e o **0004** (o formato do arquivo de
parte, adiado na 0003 com gatilho escrito — o gerador do handoff é o primeiro
leitor que não escreveu).
