# Estado — 2026-09-18

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Fundação no ar, na branch `feat/foundation`: preâmbulo, roteador, `/eng-review`,
validação estática, instalador, ADR 0001. `npm run check` passa com 2 skills.

Nada foi instalado em `~/.claude/skills` ainda — só `bin/install --check`.

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

- **Bun não está instalado nesta máquina.** `bun test` não roda; por isso a
  validação estática foi escrita em Node puro e o `CHECK_CMD` do `stack.env`
  aponta para ela. Instalar Bun é pré-requisito do item 1 do roadmap.
- **O baseline instalado aqui veio de uma branch não mergeada** do repo de
  convenções (`refactor/stack-agnostic-baseline`, PR #6). Quando o PR entrar,
  rodar `claude-base/bin/install ../yas-canvas` de novo.
- **Sem remote.** O repositório é local; falta decidir nome e visibilidade no
  GitHub.
- **Validação com fundador real ainda não aconteceu.** É o teste que importa:
  duas sessões de verdade antes de escrever a terceira role.

## Perguntas em aberto para o Yves

1. Qual role vem depois do `/eng-review` — `/ceo-review` ou `/cto-canvas`? O
   roadmap assume evals primeiro; isso pode mudar se houver sessão marcada com
   um fundador.
2. O `/design-review` cobre design visual e UX na mesma skill, ou os dois
   papéis ficam separados como estão no roteador hoje?
