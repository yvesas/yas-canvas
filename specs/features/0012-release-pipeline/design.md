# 0012 — design

## O workflow

`.github/workflows/release.yml` — um job, do `checkout` ao `gh release upload`.

```yaml
on:
  push:
    tags: ['v*']

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  # sem cancel-in-progress: release cancelada no meio publica artefato parcial
  cancel-in-progress: false

permissions:
  contents: write          # criar a release e anexar; nada além disso

jobs:
  release:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc      # uma versão, a que o projeto fixou
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
      - run: |
          gh release create "$GITHUB_REF_NAME" \
            --title "$GITHUB_REF_NAME" \
            --notes-file CHANGELOG-current.md \
            dist/*.zip dist/*.md
        env:
          GH_TOKEN: ${{ github.token }}
```

Decisões embutidas aí, cada uma com motivo:

- **Um job.** Separar "build" de "publish" dobraria checkout e `npm ci` para
  ganhar organização nenhuma (`ci-minutes.md`).
- **`timeout-minutes: 10`** — o build é Node puro em markdown; dez minutos é
  folga larga. O padrão do GitHub é 360.
- **`permissions` explícito.** Sem isso o token vem com o default do repo, que é
  mais do que esta Action precisa.
- **Sem `push: branches: [main]`.** Release roda por tag; não há segunda rodada
  de teste do mesmo commit.
- **`.nvmrc` precisa existir** — hoje não existe. Criar com a versão que você usa
  é task da T1; sem ele, `node-version-file` falha.

## O changelog

`CHANGELOG.md` no formato Keep a Changelog, seção por versão. O corpo da release
sai da seção da versão — extraído por um passo pequeno do build
(`CHANGELOG-current.md`), não copiado à mão: nota de release escrita duas vezes
divergem na segunda.

## A versão

`package.json` é a fonte. `npm version <patch|minor|major>` cria o commit e a
tag local; o push da tag dispara a Action. **A tag nasce de commit já na `main`**,
com o changelog dentro — nunca de branch.

| Quando | Bump |
|---|---|
| skill nova, mecanismo novo (`references/`, build) | minor |
| correção de texto de skill, fixture, documentação | patch |
| mudança que quebra o formato do arquivo de parte ou do handoff | major |

Enquanto o pack está em `0.x`, "quebrar" não pula para `1.0` — mas vai escrito no
changelog com a palavra **quebra**, porque é o que faz alguém reler antes de
atualizar.

## Ensaio (REQ-207)

`v0.2.0-rc.1` primeiro. O `gh release create` marca pré-release
automaticamente quando a tag tem sufixo, então o ensaio não aparece como release
estável. Conferir, na release gerada: oito zips, oito `.md`, um zip do pack, e o
corpo vindo do changelog.

## Alternativas

| | O que é | Esforço | Risco |
|---|---|---|---|
| **Mínima viável** | release à mão: rodar `npm run build` local e subir os anexos pelo site | P | depende de quem lembra de rodar o check antes; artefato publicado pode não ser o do commit da tag |
| **Recomendada** | a Action acima, um job, disparada por tag | P/M | é a primeira automação do repo; erro aparece publicado |
| **Ideal, descartada** | release-please ou semantic-release, versão e changelog gerados do commit | M | duas dependências novas e um bot commitando na `main`; o pack tem uma release a cada duas semanas, não a cada hora |
