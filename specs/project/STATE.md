# Estado — 2026-09-20

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Fundação e evals estão na `main` (PR #1). A feature **0002 — protocolo de
revisão** está pronta na branch `refactor/extract-review-protocol`, **sem commit
e sem PR**: `npm run check` verde, `npm test` 7/7, e a suíte de evals fechou
**8 de 8** na terceira rodada, sem nenhuma fixture tocada.

O `/eng-review` saiu de 265 para **149** linhas. O que era formato de revisar
virou `shared/review-protocol.md`, lido em runtime como o preâmbulo; cada skill
declara no frontmatter o que precisa (`shared: [...]`) e o instalador copia só
isso — ver ADR 0002. A segunda role agora nasce sem copiar esqueleto.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

## O que esta feature ensinou (e a `main` ainda não sabe)

**Exemplo concreto dentro de uma regra é funcional, não ilustrativo.** A 4.2
dizia "item que serviria para qualquer software — *não engula exceção, injete o
relógio, nomeie bem* — sai". A compressão cortou os três exemplos por parecerem
enfeite; na rodada seguinte a sessão produziu um item chamado "Nomes que o
domínio já tem", que é o terceiro exemplo em pessoa. Exemplo ali é como o modelo
reconhece a própria recaída.

**"Não invente fato" precisa listar o que conta como fato.** A lista cobria
número, tabela, tecnologia, volume e frequência. A sessão afirmou que "a
movimentação traz nome das partes, CPF e teor" sobre uma API que o autor do
plano declara não conhecer — **conteúdo de payload** não estava na lista. Está
agora, em três lugares que se cobrem: §2, §5 e a autoverificação.

**O juiz não pode enxergar o próprio ambiente.** Rodando com `cwd` no
repositório, ele leu no contexto dele que estava num repo git e usou isso para
desmentir a sessão, que dizia a verdade sobre o projeto de teste (`mkdtemp`, sem
git). A justificativa do veredito termina em "o critério é satisfeito (passa)" —
e ele marcou falha. Agora roda em diretório vazio, com a instrução escrita.
É o mesmo defeito da rodada 3 da feature anterior, por uma porta nova.

**Refactor trouxe regra nova, e o spec jurava que não.** O `REQ-004` diz "o diff
move texto, não inventa". Comparando com a `main`: a 4.2 longa ("sem código, esta
seção é a que mais tenta encher") e o "nada do que o plano não deu entra como
fato" **não existem lá** — nasceram na extração. São boas regras, e a rodada 1 de
eval mostrou que ainda faltava uma (conteúdo de payload). O problema não é a
regra nova; é o próximo leitor abrir o diff acreditando que ele só move texto, e
ler como "isso já era assim" o que nunca foi. **Quando uma task promete não
inventar nada, a promessa tem que valer ou ser corrigida por escrito.**

**Teto de linha cobra em outro lugar.** As 149 linhas só couberam porque 14
saíram do frontmatter (`allowed-tools` em forma compacta). Só apertando prosa o
piso era ~160 — e o primeiro aperto foi justamente o que quebrou a 4.2.

**`ETIMEDOUT` não é veredito.** Uma fixture de **um turno só** estourou dez
minutos: API lenta, não protocolo longo. Teto por turno agora é 15 min, e existe
para o turno travado, não para o devagar.

## Decisões tomadas

- **`shared/` declarado no frontmatter**, copiado pelo instalador (2026-09-20) —
  ADR 0002. O portão de escopo fica *inline* em cada role de propósito: precisa
  disparar antes de qualquer leitura, inclusive a do protocolo.
- **Repo próprio, separado do baseline de convenções** (2026-09-18). Método
  viaja com a pessoa; regra viaja com o repositório.
- **Instalação no usuário** (`~/.claude/skills`), com `--project` como exceção.
- **Markdown, sem gerador de skill** — ADR 0001.
- **Prosa em português, nomes de arquivo em inglês.** Tradução adiada, ver
  ROADMAP.
- **Conteúdo autoral**, escrito do zero a partir do framework de liderança
  técnica (docs 21, 25, 26 em `docs_yaslab/`).

## Pendências e bloqueios

- **A branch não foi commitada nem virou PR.** É o T4 da 0002, e é o próximo
  passo mecânico.
- **Bun 1.4.2 instalado, e não é usado.** `bun test` sai `0 pass, 0 fail` — verde
  sem ter rodado nada. O comando é `node --test`. Ver `specs/codebase/TESTING.md`.
- **O baseline instalado aqui veio de uma branch não mergeada** do repo de
  convenções (`refactor/stack-agnostic-baseline`, PR #6). Quando entrar, rodar
  `claude-base/bin/install ../yas-canvas` de novo.
- **Visibilidade.** O repositório é privado. Distribuir exige decidir licença e
  separar o que é material de cliente.
- **Validação com fundador real ainda não aconteceu.** Continua sendo o teste que
  importa: duas sessões de verdade antes de escrever a terceira role.

## Perguntas em aberto para o Yves

1. A próxima é `/cto-canvas` (a skill que é só sua) ou `/ceo-review`? O ROADMAP
   diz canvas primeiro; nada mudou nesta feature que justifique inverter.
2. O `/design-review` cobre design visual e UX na mesma skill, ou os dois papéis
   ficam separados como estão no roteador hoje?
3. A primeira role a usar o `review-protocol.md` vai mostrar se a divisão está no
   lugar certo. Se a segunda role precisar de um bloco que hoje está na role, ele
   é protocolo — e a hora de mover é lá, não agora.
