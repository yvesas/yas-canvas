# Estado — 2026-09-22 (fim do dia)

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

O repositório é **público e MIT** (`Copyright (c) 2026 Yves Siqueira (Yaslab)`).
Na `main`: 0001, 0002 e 0003. A **0004 — desacoplar do baseline e entregar o
handoff** está pronta na branch `feat/decouple-and-handoff`, com o gate fechado:
**12 de 12**, seis fixtures, `# pass 19 · # fail 0`.

**O pack agora é instalável por um estranho.** Os nove pontos que mandavam a
pessoa para `/commit`, `/pr`, `.claude/rules/` ou `TEST_CMD` foram a zero, e o
`npm run check` falha se voltarem. A fronteira virou um documento: o **handoff**
(`specs/canvas/handoff/<alvo>.md`), montado a partir das partes de todas as
roles, onde proposta que ninguém confirmou não vira tarefa.

`shared/` tem três arquivos: `preamble.md` e `review-protocol.md`, lidos no
começo, e `handoff.md`, lido no fechamento por quem gera o handoff. A role
declara os três; o `/canvas` declara só o preâmbulo.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

## O que a 0004 ensinou

**Pedir permissão para criar a própria pasta custa a sessão.** A regra "se o
projeto não tiver `specs/`, pergunte uma vez onde gravar" era inofensiva na
0003, onde o relatório ia para o arquivo do plano. Com tudo indo para
`specs/canvas/`, virou muro: uma fixture fechou com "espero a resposta para
gravar" em vez da tarefa da semana. Crie, grave, e diga onde gravou.

**Arquivo lido em todo turno precisa caber numa resposta.** Com o handoff
dentro dele, o protocolo foi a 338 linhas, e uma fixture de um turno só parou de
nomear bandeira vermelha e de tomar posição — duas rodadas seguidas, não foi
ruído. Separado (`handoff.md`, lido no fechamento), o protocolo voltou para 269
e a fixture voltou a passar. **O que importa uma vez por sessão não mora onde se
lê sempre.**

**A régua que olha só o que foi dito reprova quem entregou sem narrar.** É a
terceira vez que este defeito aparece por uma porta nova: o juiz lendo só a
transcrição, o juiz sem ver os arquivos de parte, e agora o marco de parada, que
reprovou uma sessão por não recitar no chat o título do relatório que ela tinha
gravado.

**Consertei uma fixture por um defeito da bancada, e só descobri porque fui
conferir.** Subi o teto de turnos de duas fixtures; uma precisava, a outra não —
ela já fechava, e quem errava era a régua. A regra "conserta o texto, nunca a
fixture" só protege se alguém desfizer o conserto depois de corrigir a régua.

**Acoplamento tem causa, e ela costuma estar na regra, não no código.** Os nove
pontos existiam porque a golden rule deste repositório mandava a skill apontar
para `/commit` e `/pr`, e o `check.mjs` tinha uma lista de exceções liberando
justamente esses nomes. Corrigir só as skills teria deixado a próxima role
acoplar de novo.

## Decisões tomadas

- **A fronteira é um documento** (2026-09-22) — ADR 0003. Estratégico aqui,
  operacional em quem executa; o handoff no meio. Proposta não confirmada não
  vira tarefa.
- **O arquivo de parte é o contrato** (2026-09-22) — ADR 0004. Estava adiado
  desde a 0003, com gatilho escrito: valeria quando alguém além da role que
  escreveu passasse a ler. O gerador do handoff é esse leitor.
- **MIT no repo inteiro**, titular pessoa física (2026-09-22). O pack antecede
  o SaaS; adoção vale mais que proteção.
- **A marca é Yaslab** no texto e `yaslab` no logotipo e domínio (2026-09-22).
- **Menu, partes e controlador que só lê** (2026-09-21) — D-CANVAS-001/002/003.
- **`shared/` declarado no frontmatter** (2026-09-20) — ADR 0002. Na 0004 ele
  serviu pela primeira vez para um arquivo que **nem toda** skill usa.
- **Repo próprio**, instalação no usuário, Markdown sem gerador (ADR 0001),
  prosa em português com nomes em inglês, conteúdo autoral.

## Pendências e bloqueios

- **Validação com fundador real ainda não aconteceu.** É a pendência mais velha
  e a que mais importa. Agora há mais motivo para ela: o menu torna o abandono
  sobrevivível, e o handoff é a parte que ninguém nunca viu em uso — ele foi
  desenhado para um executor que ainda não existiu.
- **Nenhuma fixture tem código.** As seis são plano. Todo o caminho "com
  código" do protocolo nunca foi exercitado, e as fixtures multi-turno
  respondem sempre concordando.
- **O baseline instalado aqui está 1 arquivo atrás** (`guard-main-bash.sh`).
  Falta rodar `../claude-base/bin/install .` numa branch própria.
- **A separação de material de cliente foi feita?** Era condição para abrir o
  repositório e nunca foi registrada. As fixtures são sintéticas; o resto não
  foi auditado.
- **Bun 1.4.2 instalado, e não é usado.** `bun test` sai verde sem rodar nada.

## Fora deste repositório, e esperando alguém

- **yaslab-site PR #15** (marca na documentação) — aberto. O merge publica em
  produção; o build sai idêntico, mas a decisão é do Yves.
- **niklas PR #66** (marca no README e no PROJECT) — aberto, esperando o CI.
- **alfred** — a branch `docs/realinhamento`, sem commit, troca `yaslabs/` por
  `yaslab/`. Duas armadilhas: a troca quebrou a referência
  `01-visao-yaslab-suite.md` (o arquivo real é `01-visao-yaslabs-suite.md`), e
  quatro edições estão em `.claude/`, que a próxima instalação sobrescreve.
- **audova** — nada a trocar: tudo é o domínio `yaslab.io`.
- Os arquivos de exemplo de ambiente do site e do audova têm a grafia antiga; o
  hook de segredos não deixa o agente lê-los.

## Perguntas em aberto para o Yves

1. A próxima é a segunda role — `/cto-canvas` ou `/ceo-review`? O ROADMAP diz
   canvas primeiro. Ela nasce com menu, partes, handoff e a fronteira prontos,
   e é ela que vai provar se a divisão entre protocolo e role está no lugar.
2. O handoff nunca foi lido por um agente operacional de verdade. Vale gastar
   uma sessão testando isso — pegar um handoff gerado e mandar outro agente
   executar — antes de escrever a segunda role?
3. O `/design-review` cobre design visual e UX na mesma skill, ou os dois papéis
   ficam separados como estão no roteador hoje?
