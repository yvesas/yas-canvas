# Estado — 2026-09-22

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

O repositório é **público e MIT** (`Copyright (c) 2026 Yves Siqueira (Yaslab)`).
Na `main`: as features 0001 e 0002. A **0003 — menu de partes e pasta de
respostas** está pronta na branch `feat/parts-menu-and-answers`, com o gate
fechado: evals **10 de 10**, cinco fixtures, na terceira rodada, sem tocar em
nenhuma fixture antiga.

Cada parte de uma role agora fecha sozinha em
`specs/canvas/<role>/<parte>.md`, no projeto da pessoa. O menu vem depois do
desafio de escopo e sugere a próxima parte sem obrigar. O `/canvas` virou
controlador que só lê.

A próxima é a **0004 — desacoplar do baseline e entregar o handoff**,
especificada em 22/09. Ela vem da mesma conversa em que o Yves nomeou a fronteira dos dois
repositórios: **yas-canvas é estratégico; o baseline é operacional.** O pack não
aponta para ferramenta operacional; ele produz o material que um agente
operacional pega depois.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

## O que a 0003 ensinou

**Menu em cima de premissa não examinada só organiza o palpite.** Na primeira
versão o menu vinha logo depois do portão. Num pedido vago ("quero deixar o
sistema mais escalável"), a sessão gastou o único turno oferecendo cinco partes,
sem perguntar escalável onde. O desafio de escopo tem que vir antes de qualquer
escolha.

**Menu é para escolher, não pedágio.** O menu voltava a cada parte mesmo depois
de a pessoa pedir "siga, e quando terminar as cinco escreva o relatório", e a
sessão não chegou ao fim em nove turnos. Repetir a pergunta que a pessoa já
respondeu era o atrito que a feature existia para tirar.

**Título ausente é ambíguo.** Quando a pessoa só disse "pode seguir", a skill
omitiu `### O que você disse`, e quem lê depois não sabe se ela ficou calada ou
se a skill esqueceu. O vazio agora diz que está vazio.

**O entregável deixou de ser um arquivo só, e a bancada precisou acompanhar.**
O juiz reprovou a sessão por não achar na transcrição uma citação que estava
gravada em três arquivos que ninguém lhe mostrou. Agora ele recebe todos os
arquivos de parte.

**Em squash merge, "commits à frente" mente.** Commit de branch nunca vira
ancestral da `main`. No niklas, `feat/route-names` aparecia 7 commits à frente
com **zero** arquivos diferentes: tudo já tinha entrado. O que conta é
`git diff --name-only origin/main <branch>`, diferença de conteúdo, não de
histórico.

As lições da 0002 (exemplo concreto dentro de regra é funcional, "não invente
fato" precisa listar o que conta como fato, o juiz não pode enxergar o próprio
ambiente) estão no `tasks.md` dela e no `specs/codebase/TESTING.md`.

## Decisões tomadas

- **yas-canvas é estratégico, o baseline é operacional** (2026-09-22). O pack
  não aponta para `/commit`, `/pr`, `.claude/rules/` nem `stack.env`: ele
  **produz** um handoff para um agente operacional, em formato próprio,
  agnóstico de agente, com campos que mapeiam 1:1 para o spec-driven
  (compatível sem depender). É a 0004.
- **MIT no repo inteiro** (2026-09-22), texto das skills incluído. O pack
  antecede o SaaS e existe para validar o método, então adoção vale mais que
  proteção. MIT no código com CC BY-SA na prosa foi considerado e descartado.
  O titular é a pessoa física, não a YAS Softwares Ltda.: o pack não foi cedido.
- **A marca é Yaslab no texto e yaslab no logotipo e no domínio** (2026-09-22) —
  a forma do site em produção, a que o cliente já vê. "YAS Labs" era a grafia
  antiga.
- **A pasta de respostas vive no projeto da pessoa**, o menu sugere sem obrigar,
  e o controlador só lê (2026-09-21) — D-CANVAS-001/002/003, em
  `specs/features/0003-parts-menu-and-answers/context.md`.
- **`shared/` declarado no frontmatter**, copiado pelo instalador (2026-09-20) —
  ADR 0002.
- **Repo próprio, separado do baseline** (2026-09-18) · **instalação no
  usuário**, com `--project` como exceção · **Markdown, sem gerador** (ADR 0001)
  · **prosa em português, nomes de arquivo em inglês** · **conteúdo autoral**,
  a partir de `docs_yaslab/` (docs 21, 25, 26).

## Pendências e bloqueios

- **O ADR do formato do arquivo de parte está adiado, com gatilho.** O formato
  sobreviveu à 0003, mas ele só vira contrato **entre roles** quando uma segunda
  role ler o que a primeira escreveu. O ADR é escrito nessa hora, não antes.
- **Nenhuma fixture tem código.** As cinco são `plan.md`, então o caminho "com
  código" do protocolo (ler o que o plano toca antes de opinar, mapear o que dá
  para reusar) nunca foi exercitado. E as fixtures multi-turno ainda respondem
  sempre concordando.
- **Validação com fundador real ainda não aconteceu.** Continua sendo o teste
  que importa, e agora pode acontecer: o menu torna sobrevivível o abandono no
  meio, que é o que uma sessão real vai produzir.
- **O baseline instalado aqui está 1 arquivo atrás** (`guard-main-bash.sh`). O
  PR #6 do claude-base entrou em 18/09; falta rodar
  `../claude-base/bin/install .` numa branch própria.
- **A separação de material de cliente foi feita?** Era condição para abrir o
  repositório, e a abertura aconteceu sem registro disso aqui. Fixtures são
  sintéticas; o resto não foi auditado.
- **Bun 1.4.2 instalado, e não é usado.** `bun test` sai verde sem rodar nada.
  O comando é `node --test` — ver `specs/codebase/TESTING.md`.

## Fora deste repositório, e esperando alguém

- **yaslab-site PR #15** (marca na documentação) — aberto. O merge publica em
  produção; o site gerado sai idêntico, mas a decisão é do Yves.
- **niklas PR #66** (marca no README e no PROJECT) — aberto, esperando o CI.
- **alfred** — a branch `docs/realinhamento`, sem commit, já troca `yaslabs/`
  por `yaslab/`. Duas armadilhas nela: a troca quebrou a referência
  `01-visao-yaslab-suite.md` (o arquivo real é `01-visao-yaslabs-suite.md`), e
  quatro das edições estão em `.claude/`, que a próxima instalação do baseline
  sobrescreve.
- **audova** — nada a trocar: todas as ocorrências são o domínio `yaslab.io`.
- **Arquivos de exemplo de ambiente do site e do audova** — o hook de segredos
  não deixa o agente lê-los. O do site tem "YAS Labs" três vezes.

## Perguntas em aberto para o Yves

1. A 0004 está pronta para implementar: spec, decisões, design e seis tasks. O
   requisito que mais pesa é o REQ-006: **proposta não confirmada não vira
   tarefa.** O handoff vai para um executor, e um agente que implementa palpite
   da skill como decisão põe palpite em produção.
2. A próxima role é `/cto-canvas` ou `/ceo-review`? O ROADMAP diz canvas
   primeiro, e agora ela nasce com menu e handoff prontos.
3. O `/design-review` cobre design visual e UX na mesma skill, ou os dois papéis
   ficam separados como estão no roteador hoje?
