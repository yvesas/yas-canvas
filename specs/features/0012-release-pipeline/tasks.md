# 0012 — tasks

> Depois da 0011: sem `npm run build` não há o que anexar.

## T1 — Metadado e `.nvmrc` (REQ-201)

Corrigir a `description` do `package.json` (sai o canvas de Tech Lead, que não
existe); criar `.nvmrc` com a versão de Node usada.

**Done when:** `jq -r .description package.json` descreve só o que existe;
`.nvmrc` existe e `node -v` local bate com ele.

## T2 — `CHANGELOG.md` (REQ-202)

Keep a Changelog, com as entregas de 0001 a 0012 resumidas em uma linha cada —
o `ROADMAP.md` já tem o texto longo, o changelog não o repete.

**Done when:** o arquivo existe, a seção `0.2.0` lista a `/founder-canvas`, o
mecanismo de `references/` e o build portátil.

## T3 — A Action (REQ-205, REQ-206)

`.github/workflows/release.yml` como no `design.md`, mais o passo que extrai a
seção do changelog.

**Done when:** o checklist de `ci-minutes.md` passa item por item: um job,
`ubuntu-latest`, `timeout-minutes`, sem matrix, cache e `npm ci`, `concurrency`
sem cancelamento, `permissions` mínimo.

## T4 — Ensaio `v0.2.0-rc.1` (REQ-207)

**Done when:** a pré-release existe no GitHub com oito zips, oito `.md`, o zip do
pack e o corpo vindo do changelog — e o run levou menos que o `timeout-minutes`.

## T5 — Release `v0.2.0` (REQ-203, REQ-204)

**Done when:** a tag `v0.2.0` (sem data — a exceção está escrita no `spec.md`)
aponta para commit da `main` com o changelog dentro, e a release tem os anexos.

## T6 — Fechar

**Done when:** `ROADMAP.md` e `STATE.md` atualizados; a linha "CI em PR" entra
como próximo no `ROADMAP.md`, não aqui.
