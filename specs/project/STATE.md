# Estado — 2026-09-18 (fim do dia)

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Fundação e evals mergeados na `main` via PR #1. Repositório em
`github.com/yvesas/yas-canvas`, privado, remote em SSH.

`npm run check` passa. A suíte de evals **não**: 4 de 6 passam, e as duas que
falham são a fixture `webhook-cpf` — ver abaixo, porque o motivo é bom.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

## O que a primeira rodada de evals ensinou

`no-target` e `vague-scale` passaram nas duas camadas. `webhook-cpf` falhou, e
o veredito do juiz aponta três coisas distintas — só uma é defeito da skill:

**1. O eval está mal desenhado (meu erro).** O protocolo é interativo por
construção: uma seção por vez, parando para a resposta. `claude -p` é **um
turno**. A sessão fez o certo — revisou a 5.1, parou e disse "responda e eu sigo
para 5.2 Qualidade" — e a rubrica cobrou dela, no mesmo turno, alternativas
rotuladas, decisão sobre CPF (que é da 5.4), relatório salvo e a tarefa de
fechamento. A fixture cobra o que a skill não deve fazer num turno só.

Conserto de verdade: **eval multi-turno**, alimentando respostas roteirizadas
(`--input-format stream-json` ou `--resume`). Paliativo: cada fixture afirmar só
sobre o trecho de protocolo que cabe no turno dela.

**2. Falta um caso na skill (defeito real).** O `Passo 4` manda ler o código
real antes de opinar. A fixture é um plano de sistema que **ainda não existe**,
e a sessão registrou "não tenho o código" e seguiu. A skill não diz o que fazer
quando não há código para ler — e plano de coisa nova é metade dos casos reais.

**3. Um sinal a confirmar.** O plano diz, com todas as letras, "sem teste no
handler por enquanto". A lacuna crítica do topo citou o `catch` que engole e o
dado perdido, mas não nomeou a ausência de teste. Pode ser porque a seção 5.3
nunca rodou (ver item 1). Só dá para saber depois do eval multi-turno.

**4. Footgun meu, na coleta.** Rodei a suíte com `| tail -60`: o exit code
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

1. Conserto do eval multi-turno **antes** da próxima role, ou escrevo
   `/cto-canvas` e conserto os dois evals juntos? O risco de adiar é escrever a
   segunda role em cima de um esqueleto que ainda não foi medido de verdade.
2. O `/design-review` cobre design visual e UX na mesma skill, ou os dois
   papéis ficam separados como estão no roteador hoje?
