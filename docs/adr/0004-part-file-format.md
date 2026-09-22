# ADR 0004 — O arquivo de parte é o contrato entre as roles

**Data:** 2026-09-22 · **Status:** aceito · **Estende:** ADR 0003

## Contexto

A feature 0003 criou o arquivo de parte: `specs/canvas/<role>/<parte>.md`, com
o que a pessoa disse separado do que a skill propôs **pelo título**, não pela
prosa. O ADR dele foi **adiado de propósito**, com um gatilho escrito: o formato
só viraria contrato quando alguém além da role que escreveu passasse a ler.

O gatilho disparou na 0004. O gerador do handoff lê `specs/canvas/*/*.md` — as
partes de **todas** as roles — e decide, item a item, o que vira decisão e o que
vira "confirmar antes de executar". Ele é o primeiro leitor que não escreveu.

## Decisão

O arquivo de parte é o contrato entre tudo que o pack produz. Ele tem:

- **frontmatter de máquina** (`role`, `parte`, `status`, `alvo`, `atualizado`):
  é o que o controlador e o gerador leem sem precisar entender prosa;
- **rodadas datadas**, `## AAAA-MM-DD — <alvo>`, acrescentadas ao fim, nunca
  reescritas;
- **três títulos fixos em cada rodada**, presentes mesmo vazios:
  `### O que você disse` (só citação literal), `### O que eu propus`,
  `### Em aberto`.

**A parte é memória; relatório e handoff são vistas dela** — geradas de novo a
partir das partes, como um build. Só a parte nunca é reescrita.

## Por quê

- **A separação precisa ser mecânica porque quem lê é um modelo.** Inferir pela
  linguagem o que era proposta e o que era decisão é exatamente como uma
  sugestão vira "fato do usuário" duas leituras depois — defeito que o eval da
  0002 pegou em texto e que a 0004 impediria de virar código.
- **Título ausente é pior que título vazio.** Quando a pessoa só disse "pode
  seguir", quem lê depois não sabe se ela ficou calada ou se a skill esqueceu —
  e atribui a ela tudo que está no arquivo. Custou uma rodada de eval para
  aparecer.
- **Um arquivo por parte, acumulando rodadas**, e não um por alvo: o valor é
  saber o que já foi dito sobre aquele assunto **neste projeto**, não sobre um
  plano que já virou código.

## Quando revisitar

Quando a segunda role existir de verdade e escrever partes — hoje só o
`/eng-review` escreve. Se ela precisar de um quarto título, ou se um arquivo de
parte passar de umas 300 linhas, o formato volta para a mesa.
