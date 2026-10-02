# 0012 — versão, changelog e release

> Origem: `docs/skills-handoff/1-PROMPT-yas-canvas.md`, Parte C (a parte de
> README que fala dos três caminhos de uso é da **0011**).

## Por que

O pack é público e tem versão `0.1.0` no `package.json` e nada mais: sem
`CHANGELOG.md`, sem tag, sem artefato baixável. Quem quer usar precisa clonar o
repositório — e quem usa outra IA precisaria rodar o build na mão.

**Este repositório não tem nenhum workflow hoje.** O `.github/` não existe, e
`npm test` roda só na máquina de quem escreve. A primeira Action do repo é a
desta feature, e é por isso que ela carrega a regra de minuto inteira.

## Requisitos

- **REQ-201 — Corrigir o `package.json`.** A `description` cita "canvas de Tech
  Lead", que não existe — e é justamente o que está bloqueado por conteúdo no
  `ROADMAP.md`. Prometer skill inexistente no pacote é o mesmo defeito que o
  README tinha até a 25/09.
- **REQ-202 — Versionamento semântico com `CHANGELOG.md`**, atualizado e
  mergeado **antes** da tag.
- **REQ-203 — Tag `v<semver>`, sem data.** A regra do baseline (`git-flow.md`)
  pede `v<semver>-<AAAA-MM-DD>` **para projeto que faz deploy por tag**; aqui não
  há deploy — há pacote. A exceção fica escrita aqui para ninguém "corrigir" a
  tag depois.
- **REQ-204 — Primeira release `v0.2.0`**, com a `/founder-canvas` dentro.
- **REQ-205 — Action de release**: ao criar tag `v*`, roda `check` + `build` e
  anexa à release um zip por skill, um `.md` portátil por skill e um zip do pack
  completo.
- **REQ-206 — A Action segue `ci-minutes.md`**: um job só, `ubuntu-latest`,
  `timeout-minutes` perto do tempo real, instalação por lockfile com cache, sem
  matrix. E **sem `cancel-in-progress`** — cancelar release pela metade publica
  artefato parcial.
- **REQ-207 — Ensaio antes da release de verdade**: tag `v0.2.0-rc.1` gera os
  anexos esperados, e é ela que prova o pipeline.

## Fora de escopo

- **Workflow de CI em PR** (rodar `check` e `npm test` a cada pull request). Faz
  sentido e **não entra aqui**: é outro gatilho, outro job e outra conversa sobre
  minuto. Fica como linha no `ROADMAP.md`.
- Publicar no npm. O pacote não é consumido por `import`; o artefato é markdown.

## Riscos

- **A release é a primeira coisa do repo que corre sozinha num servidor.** Erro
  nela aparece publicado, não no terminal de quem escreveu.
- **Tag errada não se corrige, se abandona.** `v0.2.0` apontando para o commit
  errado vira `v0.2.1`; reescrever tag publicada quebra quem já baixou.
- **O repositório é público, então minuto de Action não consome cota** — o que
  torna o `timeout-minutes` mais importante, não menos: sem fatura para doer,
  job travado só aparece quando alguém olha.
