# ADR 0002 — Cada skill declara o que precisa de `shared/`

**Data:** 2026-09-20 · **Status:** aceito · **Estende:** ADR 0001

## Contexto

O ADR 0001 resolveu um arquivo: o `preamble.md`, que **toda** skill precisa, é
copiado ao lado de cada uma pelo instalador. Com a segunda role a caminho,
apareceu um arquivo que só **parte** das skills precisa.

O `/eng-review` tinha 265 linhas, e boa parte delas não era engenharia: o portão
de escopo, a decisão entre "há código" e "não há", uma seção por vez com teto,
alternativas obrigatórias, o esqueleto do relatório. Isso vale igual para uma
revisão de produto, de UX ou de design — e nada disso vale para um **canvas**,
que conduz uma pessoa em vez de avaliar um artefato.

Copiar tudo para todo mundo resolveria a distribuição e criaria outra coisa:
arquivo ao lado de uma skill que não o lê. Quem mantém abre, não acha referência,
e fica sem saber se é dependência esquecida ou lixo.

## Decisão

O frontmatter declara: `shared: [preamble, review-protocol]`.

O `bin/install` lê essa lista e copia **só o que está nela**. O `npm run check`
cobra os três lados do contrato, por nome de arquivo:

1. o que foi declarado existe em `shared/`;
2. a skill manda ler cada arquivo que declarou;
3. nenhuma skill cola trecho de nenhum deles.

E um quarto lado, que é sobre o próprio validador: **frase-âncora que sumiu da
fonte vira erro**. Âncora morta não protege nada, e não protege em silêncio.

## Por quê

- **O `preamble` continua obrigatório** — o `check` falha se alguém não o
  declarar. O que é opcional é o resto.
- **A declaração é a documentação.** Quem abre um `SKILL.md` vê, na primeira
  tela, de que ele depende — sem precisar procurar o `Read` no meio do texto.
- **O portão de escopo fica inline, repetido em cada role, de propósito.** Ele
  precisa disparar antes de qualquer leitura, inclusive a do próprio protocolo:
  regra que só existe depois de dois `Read` já perdeu a corrida que existia para
  vencer. É a única duplicação aceita, e ela está escrita no `review-protocol.md`
  como decisão, não como descuido.

## Quando revisitar

Se um arquivo de `shared/` passar a ser declarado por **todas** as skills, ele é
preâmbulo — junte, em vez de manter duas listas. E se a lista de uma skill passar
de três ou quatro itens, a pergunta deixa de ser "o que copiar" e vira "esta
skill faz coisa demais".
