# 0011 — tasks

> Começa **depois** da 0010 mergeada: a `/founder-canvas` é a primeira skill com
> `references/`, e sem ela o build empacota um caso que não existe.

## T1 — Extrair o leitor de frontmatter

`scripts/lib/frontmatter.mjs`, usado pelo `check.mjs` e pelo `build.mjs`.

**Done when:** `npm run check` verde sem mudança de comportamento; o
`check.mjs` não tem mais parser próprio.

## T2 — `dist/<skill>/` e paridade com o instalador (REQ-101)

**Done when:** `npm run build` produz uma pasta por skill com `SKILL.md`, shared
e references; o teste de paridade com `bin/install --check` passa; `dist/` está
no `.gitignore` (REQ-106).

## T3 — O portátil e a neutralização (REQ-102, REQ-103)

Regras declaradas numa lista no topo do `build.mjs`.

**Done when:** `dist/<skill>.md` existe para as oito skills; o teste de vazamento
passa; abrir um deles e ler não revela nada que só exista no Claude Code.

## T4 — Zip e determinismo (REQ-104)

**Done when:** `npm run build` duas vezes seguidas gera bytes iguais, zip
incluído; sem o binário `zip`, a mensagem diz o que instalar.

## T5 — README: os três caminhos (REQ-107)

Seção "Como usar": app do Claude (zip), Claude Code (`bin/install`), outra IA
(`.md` portátil). Cada ferramenta de terceiro só entra com a data em que a
documentação dela foi conferida.

**Done when:** a seção existe, nenhuma linha diz "deve funcionar", e o
`getting-started.md` aponta para ela.

## T6 — Fechar

**Done when:** `npm test` verde, `ROADMAP.md` e `STATE.md` atualizados, PR com um
assunto só.
