# ADR 0001 — O preâmbulo é uma fonte no repositório e uma cópia por skill

**Data:** 2026-09-18 · **Status:** aceito

## Contexto

Toda skill deste pack precisa da mesma base: voz, anti-bajulação, formato de
pergunta, o que é uma parada dura, como fechar a sessão. São ~100 linhas que,
copiadas em sete arquivos, envelhecem em sete ritmos — e a divergência aparece
justamente onde ninguém olha, no meio de uma skill de 200 linhas.

Três caminhos existiam:

1. **Colar em cada `SKILL.md`.** Zero máquina, divergência garantida.
2. **Gerador**, no estilo template + placeholder + arquivo commitado gerado, com
   teste de freshness no CI. É o que faz quem tem sessenta skills: lá, 77% de
   cada arquivo é injetado, e sem gerador seria impossível.
3. **Uma fonte lida pela skill**, com cópia posta pelo instalador ao lado dela.

## Decisão

O caminho 3. `shared/preamble.md` é a única fonte no repositório. O
`bin/install` copia esse arquivo para dentro de cada pasta de skill instalada,
e sobrescreve a cada instalação. A skill começa mandando ler o `preamble.md`
que está ao lado dela.

A validação estática (`npm run check`) cobra as duas metades do contrato:
falha se um `SKILL.md` **não** mandar ler o preâmbulo, e falha se um `SKILL.md`
**colar** um trecho dele — as frases-âncora estão em `scripts/check.mjs`.

## Por quê

- **Com sete skills, gerador é máquina a mais.** O ganho dele aparece na dezena;
  o custo (build, arquivo gerado no diff, teste de freshness, gente esquecendo
  de rodar) aparece no primeiro dia.
- **A cópia não pode divergir**, porque ninguém a edita: ela é sobrescrita pelo
  instalador, e o repositório é a única fonte.
- **Caminho relativo funciona em qualquer destino.** Ao lado da skill vale para
  `~/.claude/skills/`, para `.claude/skills/` de um projeto e para um clone
  qualquer, sem o pack precisar saber onde foi instalado.
- Custa uma leitura de arquivo por invocação. É barato, e o contrário —
  preâmbulo que não é lido — é o defeito que a skill inteira depende de não ter.

## Quando revisitar

Se o pack passar de **dez skills**, ou se o preâmbulo precisar variar por skill
(blocos condicionais), o caminho 2 passa a se pagar. Aí a migração é mecânica:
o `preamble.md` vira template e o `check.mjs` ganha o teste de freshness.
