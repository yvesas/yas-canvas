# 0003 — menu de partes e pasta de respostas

**Status:** especificado (2026-09-21) · **Decisões:** `context.md`
**Origem:** conversa com o Yves depois do merge da 0002 — "vamos deixar mais
flexível, podemos ter um tipo de menu (…) meio que um banco de dados, mas em
markdowns".

## O problema

**Todo o valor da sessão está no fim.** O protocolo percorre cinco seções
parando para resposta, e só depois escreve relatório, alternativas e a tarefa.
Quem sai na terceira seção sai com nada no disco — e sair na terceira é o
comportamento esperado de um fundador ocupado, não a exceção.

Os evals nunca viram isso porque o usuário deles é um script que responde nove
vezes seguidas *"Concordo com a sua recomendação. Siga para a próxima seção"*.
Ninguém nunca discordou, pulou ou desistiu. A ausência é estrutural: o único
usuário que a bancada conhece é infinitamente paciente.

E há um segundo problema, que só aparece com a segunda role: **cada sessão
recomeça do zero.** A role de CEO não sabe o que a de engenharia já perguntou, e
a pessoa responde duas vezes o que já respondeu uma.

## A forma

Cada parte de uma role fecha **sozinha**, em arquivo, no projeto da pessoa. O
menu mostra o que já fechou e sugere a próxima. O `/canvas` lê esses arquivos
para saber onde a pessoa está — um banco de dados em markdown, com o frontmatter
fazendo o papel de índice.

```
<projeto-da-pessoa>/
└── specs/canvas/
    └── eng-review/
        ├── architecture.md      status: respondido
        ├── quality.md           status: pendente
        └── security-and-data.md status: descartado
```

## Requisitos

- **REQ-001 — Menu depois do portão, nunca antes.**
  WHEN o portão de escopo foi respondido, THEN a role SHALL apresentar as partes
  com o status de cada uma e **sugerir** a próxima na ordem do protocolo,
  aceitando qualquer outra que a pessoa escolher.
  O portão continua sendo a primeira chamada de ferramenta: menu é o passo
  seguinte, não um substituto.

- **REQ-002 — Cada parte fecha em arquivo, sozinha.**
  WHEN uma parte termina, THEN a skill SHALL gravar
  `specs/canvas/<role>/<parte>.md` no projeto da pessoa, com frontmatter de
  máquina (`role`, `alvo`, `parte`, `status`, `atualizado`) e corpo em três
  seções: **O que você disse** (citação literal), **O que eu propus**, **Em
  aberto**.
  A sessão pode terminar ali. Uma parte respondida é entregável completo.

- **REQ-003 — A máquina nunca reescreve o corpo.**
  WHEN o arquivo já existe, THEN a skill SHALL lê-lo antes de escrever,
  preservar o corpo e **acrescentar** seção datada; só o frontmatter é
  reescrito.
  Se a skill atropelar uma edição feita à mão uma única vez, ninguém edita de
  novo — e a pasta vira saída de robô que todo mundo ignora.

- **REQ-004 — Revisão parcial declara o que não pôde concluir.**
  WHEN o relatório é escrito com partes pendentes, THEN ele SHALL nomear quais
  faltam e **o que a ausência impede**, em uma linha por parte.
  Em especial a junção das lacunas críticas: *sem teste + sem tratamento +
  falha silenciosa* nasce partida entre três seções. Sem elas respondidas, a
  junção não acontece — e o relatório tem que dizer isso em vez de entregar cara
  de completo. É a mesma regra que a 0001 criou para "não havia código".

- **REQ-005 — Proposta não pode virar fato na leitura seguinte.**
  WHEN outra role (ou a mesma, depois) lê um arquivo de resposta, THEN a
  separação entre **o que a pessoa disse** e **o que a skill propôs** SHALL ser
  mecânica, não inferida da prosa.
  Este é o defeito que a rodada 3 de eval da 0002 encontrou — exemplo citado
  duas vezes vira dado do usuário na terceira — agora com um arquivo `.md` para
  dar autoridade a ele.

- **REQ-006 — O `/canvas` vira controlador, e só lê.**
  WHEN invocado, THEN ele SHALL montar o estado lendo **apenas o frontmatter**
  dos arquivos em `specs/canvas/**`, dizer o que já foi respondido e sugerir o
  próximo passo. Nunca escreve, nunca edita, nunca move (D-CANVAS-003).
  Ler só o frontmatter é barato e não depende de o controlador entender prosa.

- **REQ-007 — A validação estática cobra o formato.**
  WHEN `npm run check` roda, THEN ele SHALL falhar em arquivo de resposta sem
  frontmatter obrigatório, com `status` fora do conjunto, ou com `parte` que não
  existe na role que o escreveu.
  O contrato entre skills é o formato; contrato sem validador diverge.

- **REQ-008 — O eval cobre a volta, não só a ida.**
  WHEN a suíte roda, THEN SHALL existir fixture que **já nasce com respostas no
  disco**, uma delas editada à mão, verificando que o menu reflete o estado e
  que a skill não atropela a edição.
  Hoje o harness encena um projeto vazio a cada rodada: "a pessoa volta na
  terça" é exatamente o caso que nenhuma fixture sabe montar.

## Fora de escopo

- **Controlador que escreve** — D-CANVAS-003. Precisa de regra de conflito, e
  isso é o dobro desta feature.
- **Orquestrador rodando roles em sequência** — item 5 do ROADMAP, e só se paga
  com três ou quatro roles existindo.
- **Migrar os canvas (CTO, tech lead) para o formato** — eles conduzem uma
  pessoa, não avaliam um artefato. Decidir depois de a primeira role usar isto
  de verdade.
- **Índice, cache ou banco de verdade.** O frontmatter é o índice. Se um dia
  ficar lento, aí sim.

## O que isso muda no que já existe

| Arquivo | O quê |
|---|---|
| `shared/review-protocol.md` | menu (§3), relatório parcial (§5), formato do arquivo de resposta |
| `skills/eng-review/SKILL.md` | as cinco seções viram as cinco **partes**, nomeadas |
| `skills/canvas/SKILL.md` | de roteador a controlador — passa a declarar `Read` |
| `scripts/check.mjs` | REQ-007 |
| `test/` | fixture com estado prévio (REQ-008) + o harness sabendo semeá-la |

O `/eng-review` está em 149 das 400 linhas; o menu cabe. Se não couber, é sinal
de que a parte nova é protocolo, não role.

## Como saber se deu certo

O gate continua sendo o de sempre (`npm run check`, `npm test`, evals 8 de 8 +
a nova fixture). Mas o teste que importa nesta feature não é nenhum deles:
**uma pessoa responder uma parte, fechar o laptop, e voltar dois dias depois
sem perder nada.** Isso não tem eval — tem sessão real, que é a pendência aberta
no `STATE.md` desde a 0002.
