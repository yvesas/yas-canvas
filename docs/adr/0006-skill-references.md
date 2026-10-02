# ADR 0006 — `references/`: o conteúdo que uma skill lê sob demanda

- **Data:** 2026-10-02
- **Status:** aceito
- **Contexto da decisão:** feature 0010 (`/founder-canvas`)

## O problema

A `/founder-canvas` conduz dez fases e carrega material autoral que não é
protocolo: um banco de perguntas por fase, as definições dos conceitos (JTBD,
aha × wow, PLG, PQL, North Star) e os modelos de cada documento. São ~200 linhas
de conteúdo consultado **em uma fase cada**.

Três saídas, e as duas primeiras são piores:

1. **Inline no `SKILL.md`.** Estoura o teto de 400 linhas, ou obriga a resumir o
   banco de perguntas — que é justamente o conteúdo autoral, o que o
   `PROJECT.md` chama de diferencial. E o agente paga o contexto das dez fases
   para conduzir uma.
2. **Em `shared/`.** O `shared/` é a fonte comum do pack: preâmbulo, protocolo de
   sessão, protocolo de revisão, handoff. Pôr lá o banco de perguntas de uma
   skill só mistura "o que vale para todas" com "o que é de uma", e a próxima
   pessoa não sabe qual dos dois está lendo.
3. **`references/` dentro da skill** — esta decisão.

## A decisão

Uma skill pode declarar `references: [<nome>…]` no frontmatter. Cada item é um
arquivo em `skills/<skill>/references/<nome>.md`, instalado em
`<skill>/references/<nome>.md`, e **lido na fase que precisa dele** — nunca no
começo da sessão.

| | `shared/` | `references/` |
|---|---|---|
| De quem é | do pack: uma fonte, várias skills | de **uma** skill |
| O que é | protocolo — regra que vale sempre | material de consulta |
| Quando é lido | no começo da sessão | na fase que precisa |
| Onde mora | `shared/<item>.md` | `skills/<skill>/references/<item>.md` |
| Instalado em | `<skill>/<item>.md` | `<skill>/references/<item>.md` |

**A pergunta que separa os dois:** a regra depende da fase? Se sim, é reference.
Se ela vale do primeiro turno ao último, é `shared/` ou corpo da skill.

O mesmo contrato de três lados do `shared:` (ADR 0002) vale aqui, cobrado pelo
`check.mjs`:

- declarada e **inexistente** falha;
- existente e **nunca lida** no corpo falha — arquivo copiado que ninguém abre;
- em disco e **não declarada** falha — o instalador copia só o que é declarado,
  então o arquivo não chega na máquina de ninguém, e a skill manda ler o que não
  existe lá. É a terceira cobrança, e é a que não tem equivalente no `shared:`:
  lá a pasta é do pack e todo arquivo dela é fonte de alguém.

Reference **viaja**, então entra na varredura que proíbe citar o que só existe
neste repositório (ADR 0003).

## Consequências

- O teto de 400 linhas continua valendo para o `SKILL.md`, e passa a ser
  sustentável para skill grande: a `/founder-canvas` cabe em ~250 linhas com dez
  fases.
- **Lazy loading de verdade:** o corpo diz quando ler cada reference, e a sessão
  que para na fase 2 nunca abre os conceitos da fase 8.
- **Mecanismo com um usuário só.** Se nenhuma segunda skill precisar de
  references, isto é código mantido para um caso — e aí a decisão certa é
  inliná-lo de volta, não guardá-lo por simetria.
- O build portátil (feature 0011) tem de empacotar references junto, no zip e
  no arquivo único. Está escrito lá como requisito.

## Alternativa descartada

**Partes como arquivos próprios** (`skills/<skill>/parts/<id>.md`), carregadas
sob demanda. É mais poderoso e reescreve o instalador, o `check.mjs` e as sete
skills existentes — custo que só se paga com mais de uma skill grande. Quando a
segunda aparecer, esta ADR é o lugar de reabrir a conversa.
