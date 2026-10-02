# 0011 — build portátil: usar o pack em qualquer IA

> Origem: `docs/skills-handoff/1-PROMPT-yas-canvas.md`, Parte B.
>
> **Esta spec será revisada depois da 0010.** O que o build precisa neutralizar
> depende do que a `/founder-canvas` escrever — e ela é a primeira skill com
> `references/`, que o build tem de empacotar. Especificar antes foi decisão
> registrada em `0010-founder-canvas/context.md` (D-FC-001).

## Por que

As skills do pack dependem de três coisas que só existem no Claude Code:
`allowed-tools`, `AskUserQuestion` e a cópia de `shared/` pelo instalador. Quem
usa ChatGPT, Gemini, Cursor ou Codex não consegue usar o método — e o método é
o produto.

Hoje o pack tem **um** caminho de distribuição (`bin/install`) e ele serve a
**uma** ferramenta.

## Requisitos

- **REQ-101 — Pasta de skill completa.** `dist/<skill>/` e `dist/<skill>.zip`
  no formato Agent Skills: `SKILL.md`, os `shared/` declarados e as
  `references/` **já dentro**. Serve ao app do Claude (enviar o zip), ao Claude
  Code e a qualquer ferramenta que leia `SKILL.md`.
- **REQ-102 — Arquivo único portátil.** `dist/<skill>.md` junta SKILL + shared +
  references num markdown só, sem frontmatter específico do Claude, com um
  cabeçalho curto de uso.
- **REQ-103 — Instrução dependente de ferramenta vira texto neutro.** A tabela de
  tradução é o coração desta feature:

  | No pack | No portátil |
  |---|---|
  | "use `AskUserQuestion`" | "pergunte e espere a resposta" |
  | "a primeira chamada de ferramenta é…" | "a primeira coisa que você faz é…" |
  | "grave em `specs/canvas/<role>/<parte>.md`" | "ao fim de cada parte, entregue o documento em markdown para a pessoa salvar" |
  | "leia o `preamble.md` ao lado" | "a seção **Preâmbulo** abaixo" |
  | `allowed-tools`, `triggers`, `shared:` | removidos do cabeçalho |

- **REQ-104 — `npm run build` determinístico**, Node puro, sem dependência nova,
  rodando `npm run check` antes. Duas execuções seguidas produzem **bytes
  iguais** — inclusive no zip.
- **REQ-105 — Teste de vazamento.** Nenhum `dist/<skill>.md` contém nome de
  ferramenta do Claude Code, caminho de `shared/` ou `references/` sem o conteúdo
  correspondente inline.
- **REQ-106 — `dist/` fora do git.** Os artefatos são anexo de release
  (feature 0012).
- **REQ-107 — README diz o que foi confirmado.** Para cada ferramenta de
  terceiro, só entra na lista o que foi verificado na documentação dela, com a
  data da verificação. "Deve funcionar" não entra.

## Fora de escopo

A tag, o `CHANGELOG.md` e a GitHub Action são a **0012**. Esta feature produz
`dist/` na máquina de quem roda.

## Riscos

- **O portão perde o que o torna duro.** "Primeira chamada de ferramenta" é uma
  garantia do Claude Code; em texto colado numa Gem, o modelo pode ler tudo antes
  de perguntar. O portátil precisa dizer a regra em palavras — e o
  comportamento vai ser pior. Honestidade no cabeçalho vale mais que promessa.
- **Zip determinístico é chato.** Timestamp e ordem de entrada entram no byte.
  Fixar `mtime` e ordenar a lista resolve; `zip -X` ajuda, mas a dependência de
  binário externo é uma decisão a tomar no `design.md`.
- **Duas distribuições envelhecem em ritmos diferentes.** É o mesmo argumento da
  tradução para inglês, adiada no `ROADMAP.md`: só vale com o build gerando tudo
  de uma fonte, nunca com cópia mantida à mão.
