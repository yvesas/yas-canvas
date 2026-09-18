# Estado — 2026-09-18 (fim do dia, 2ª revisão)

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Fundação e evals mergeados na `main` via PR #1. Repositório em
`github.com/yvesas/yas-canvas`, privado, remote em SSH.

`npm run check` passa e a suíte de evals passa inteira: **6 de 6**, com a
`webhook-cpf` conduzida por sete turnos. Levou três rodadas para chegar lá, e
cada rodada ensinou algo diferente — ver abaixo.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

## O que as três rodadas de eval ensinaram

`no-target` e `vague-scale` passaram nas duas camadas. `webhook-cpf` falhou, e
o veredito do juiz aponta três coisas distintas — só uma é defeito da skill:

**Rodada 1 — o eval estava mal desenhado (meu erro).** O protocolo é interativo por
construção: uma seção por vez, parando para a resposta. `claude -p` é **um
turno**. A sessão fez o certo — revisou a 5.1, parou e disse "responda e eu sigo
para 5.2 Qualidade" — e a rubrica cobrou dela, no mesmo turno, alternativas
rotuladas, decisão sobre CPF (que é da 5.4), relatório salvo e a tarefa de
fechamento. A fixture cobra o que a skill não deve fazer num turno só.

Consertado: o runner abre o turno 1 com `--session-id` e continua com
`--resume`, mandando a resposta roteirizada da fixture até o marco de parada.
`no-target` e `vague-scale` seguem de um turno só, de propósito.

**Ainda aberto — falta um caso na skill.** O `Passo 4` manda ler o código
real antes de opinar. A fixture é um plano de sistema que **ainda não existe**,
e a sessão registrou "não tenho o código" e seguiu. A skill não diz o que fazer
quando não há código para ler — e plano de coisa nova é metade dos casos reais.

**Resolvido pelo multi-turno.** A ausência de teste no handler não aparecia
porque a seção 5.3 nunca chegava a rodar.

**Rodada 2 — duas rubricas erradas e um contrato frouxo.** A rubrica cobrava a
palavra "criptografia": vocabulário, não julgamento — e *minimizar* o dado é
resposta melhor que criptografá-lo. E o preâmbulo dizia "uma tarefa" com folga
suficiente para a skill entregar a principal mais um "enquanto isso, comece
por X". Duas tarefas viram nenhuma.

**Rodada 3 — dois defeitos da bancada e um vazamento da skill.**

- O teto de ferramentas contava *qualquer* chamada e reprovou a sessão por um
  `ToolSearch`, que carrega schema e não lê nada. Agora conta só ferramenta de
  investigação (`maxInvestigativeCalls`). Teste que reprova comportamento certo
  perde a confiança de quem lê o resultado.
- O juiz **deduzia** uso de ferramenta a partir da prosa e acusou um `git` que
  nunca rodou. Agora ele recebe a lista de chamadas como fato, com instrução de
  julgar a lista e não o texto.
- O instinto nº 6 da skill dizia "duas pessoas, três serviços". O modelo ecoou
  o número e depois reafirmou "os três serviços" como fato do plano, que nunca
  disse quantos eram. **Exemplo citado duas vezes vira dado do usuário na
  terceira** — o instinto perdeu o numeral e ganhou o aviso.

**Footgun da coleta.** Rodei a suíte com `| tail -60`: o exit code
virou o do `tail` (0, parecendo verde) e a evidência das primeiras falhas foi
jogada fora. Eval se roda sem cano, ou com `tee`.

## Decisões tomadas

- **Repo próprio, separado do baseline de convenções** (2026-09-18). Método
  viaja com a pessoa; regra viaja com o repositório. O baseline é privado e
  carrega material da empresa; este pack nasce para ser distribuível.
- **Instalação no usuário** (`~/.claude/skills`), com `--project` como exceção.
- **Markdown + Bun só na bancada.** Sem gerador de skill — ver ADR 0001.
- **Prosa em português, nomes em inglês.** Tradução adiada, ver ROADMAP.
- **Conteúdo autoral.** O método é escrito do zero a partir do framework de
  liderança técnica (docs 21, 25, 26 em `docs_yaslab/`), sem herdar texto de
  terceiro.

## Pendências e bloqueios

- **Bun 1.4.2 instalado, e não é usado.** `bun test` executa o arquivo, não
  enxerga os registros de `node:test` e sai com `0 pass, 0 fail` — verde sem
  ter rodado nada. O comando é `node --test`. Ver `specs/codebase/TESTING.md`.
- **O baseline instalado aqui veio de uma branch não mergeada** do repo de
  convenções (`refactor/stack-agnostic-baseline`, PR #6). Quando o PR entrar,
  rodar `claude-base/bin/install ../yas-canvas` de novo.
- **Visibilidade.** O repositório nasceu **privado**. Distribuir (`npx skills
  add`) exige decidir licença e separar o que é material de cliente.
- **Validação com fundador real ainda não aconteceu.** É o teste que importa:
  duas sessões de verdade antes de escrever a terceira role.

## Perguntas em aberto para o Yves

1. Com a bancada verde, a próxima é `/cto-canvas` ou o caso "não há código para
   ler" do `/eng-review`? O segundo é pequeno e fecha um buraco conhecido.
2. O `/design-review` cobre design visual e UX na mesma skill, ou os dois
   papéis ficam separados como estão no roteador hoje?
