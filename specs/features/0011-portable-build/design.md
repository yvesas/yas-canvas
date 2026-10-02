# 0011 — design

> Rascunho deliberado: a tabela de neutralização (REQ-103) só fica completa
> depois de rodar o build contra a `/founder-canvas` real.

## Onde o código vive

`bin/build` (executável, como `bin/install`) e `scripts/build.mjs` (a lógica,
Node puro, como `scripts/check.mjs`). `package.json` ganha
`"build": "node scripts/build.mjs"`.

**Por que não dentro do `check.mjs`:** ele é o gate barato que roda a cada hook e
em todo commit. Build escreve em disco; gate não escreve.

## O pipeline, por skill

```
skills/<s>/SKILL.md ──┐
shared/<declarados>  ─┼─→ montagem ─→ dist/<s>/        (REQ-101)
skills/<s>/references ┘        │
                               ├─→ dist/<s>.zip
                               └─→ neutralização ─→ dist/<s>.md   (REQ-102/103)
```

1. **Ler o frontmatter** com o mesmo parser do `check.mjs` — uma fonte, não duas
   (é o erro que a 0005 pagou: conhecimento escondido em campo de metadado).
2. **`dist/<s>/`**: copiar `SKILL.md`, cada `shared/<item>.md` e
   `references/<item>.md` — a mesma árvore que o `bin/install` produz. Se as duas
   divergirem, a skill testada não é a skill distribuída: um teste compara as
   duas listas.
3. **`dist/<s>.md`**: concatenar na ordem **SKILL → shared → references**, com
   `## Preâmbulo`, `## Protocolo de sessão` e `## Referências` como títulos, e
   trocar cada "leia o arquivo ao lado" pela referência à seção.
4. **Neutralizar** pela tabela do REQ-103, aplicada como lista de regras
   declarada no topo do `build.mjs` — nunca espalhada pelo código, porque é a
   parte que mais vai mudar.

## Determinismo (REQ-104)

- Ordem: `skills/` em ordem alfabética, `shared` e `references` na ordem do
  frontmatter (é a ordem que a pessoa escreveu, e ela tem significado).
- Fim de linha LF, uma linha em branco entre seções, sem data de geração no
  conteúdo — data no artefato quebra o byte igual e não serve para nada que a
  release já não diga.
- **Zip**: decisão aberta entre `zip -X` com `mtime` fixo (depende do binário,
  presente no macOS e no `ubuntu-latest`) e um escritor de zip em Node (~60
  linhas, sem dependência, mais código nosso). Recomendo o `zip -X` com
  verificação de existência e mensagem clara quando faltar — é menos código e o
  CI tem o binário.

## Testes (REQ-105)

`test/build.test.mjs`, determinístico e sem rede:

- **vazamento**: nenhum `dist/*.md` casa com `/AskUserQuestion|allowed-tools|
  Bash\(|specs\/canvas|shared\//`;
- **completude**: todo `shared` e toda `reference` declarada aparece como seção;
- **paridade com o instalador**: a lista de arquivos de `dist/<s>/` é igual à que
  o `bin/install --check` produziria;
- **determinismo**: rodar duas vezes e comparar hash de tudo.

## Alternativas

| | O que é | Esforço | Risco |
|---|---|---|---|
| **Mínima viável** | só o `dist/<s>.md` portátil, sem zip nem pasta | P | o app do Claude e as ferramentas que leem `SKILL.md` ficam de fora — metade do motivo da feature |
| **Recomendada** | pasta + zip + `.md`, build em Node puro, zip via `zip -X` | M | depende de um binário externo; mitigado por mensagem de erro clara |
| **Ideal, descartada** | gerar também `AGENTS.md` e formato de cada ferramenta | G | cada formato é uma fonte a manter, e nenhum está estável; entra quando alguém pedir |
