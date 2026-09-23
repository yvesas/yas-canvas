# 0005 — `/cto-canvas`, a segunda skill

**Status:** especificado (2026-09-22) · **Decisões:** `context.md`
**Fonte do conteúdo:** `docs_yaslab/25-gstack-extracao-canvas-framework.md`
(as seis perguntas, o roteamento, os padrões de empurrão e os sinais) e o
`21-framework-lideranca-tecnica.md`.

## O problema

O pack tem uma role de revisão e nenhum canvas. A diferença não é de assunto, é
de objeto: **a revisão avalia um artefato; o canvas estrutura uma pessoa** —
onde ela está, o que ela não sabe que não sabe, qual a próxima decisão.

E o fundador que a `/cto-canvas` atende é o do `PROJECT.md`: gera um MVP em dois
dias com IA e bate no muro no primeiro crescimento real, porque ninguém o fez
responder o que ele está adiando.

## O que já está decidido pela fonte

O `docs_yaslab/25` traz, pronto e testado contra o gstack:

- **As seis perguntas técnicas**, cada uma com "empurrar até ouvir" e as
  bandeiras vermelhas: realidade do sistema, status quo, especificidade do
  risco, menor fatia técnica, observação, futuro técnico.
- **O roteamento por estágio**: nada em produção → T2, T3, T4 · MVP no ar →
  T1, T3, T5 · clientes pagando → T1, T5, T6 · infra pura → T3, T6.
- **Os padrões de empurrão**: "é só um CRUD", "a IA gera o código",
  "microsserviços desde o início", "segurança a gente vê depois", "vamos
  contratar quando crescer" — cada um com a resposta forte.
- **Os sinais de fundador técnico maduro**, sete, com o que cada um exige.

Esta feature **transcreve isso para skill**, no formato do pack. Ela não
inventa método novo.

## Requisitos

- **REQ-001 — O que é de qualquer sessão conduzida sai para
  `shared/session-protocol.md`.**
  WHEN uma skill conduz uma sessão, THEN ela SHALL ler ali o território
  (`specs/canvas/`), o arquivo de parte, o menu e as alternativas obrigatórias.
  O `review-protocol.md` fica com o relatório, "Barra o plano" e a junção das
  lacunas, e o `/eng-review` passa a declarar os dois (D-CTO-001).
  **Nenhuma regra muda de conteúdo aqui — é mudança de endereço.** O que mudar
  de sentido no caminho, o eval pega.

- **REQ-002 — A skill existe e declara o que usa.**
  `skills/cto-canvas/SKILL.md`, com `shared: [preamble, session-protocol]` e
  `parts:` com as seis perguntas em slug de inglês.

- **REQ-003 — O portão é o estágio, e ele roteia.**
  WHEN a skill é invocada, THEN a **primeira chamada de ferramenta** SHALL ser a
  pergunta de estágio — nada em produção · MVP no ar · clientes pagando · infra
  pura —, e o estágio SHALL escolher quais perguntas o menu sugere.
  É uma parada dura, como o portão de escopo da revisão: perguntar as seis a
  quem não tem nada em produção gasta a sessão nas erradas.

- **REQ-004 — Uma pergunta por vez, empurrando até o específico.**
  WHEN a skill faz uma pergunta, THEN ela SHALL parar e esperar, e SHALL
  insistir até ouvir o concreto que aquela pergunta exige — um serviço nomeado,
  um dado nomeado, um incidente real. Resposta genérica não fecha a parte.
  WHEN a pessoa dá sinal de impaciência, THEN a skill SHALL fazer **as duas mais
  críticas** do estágio e seguir para o fechamento.
  WHEN uma pergunta já foi respondida dentro de outra, THEN a skill SHALL dizer
  isso e não repetir.

- **REQ-005 — As bandeiras vermelhas são nomeadas como bandeira.**
  WHEN a pessoa diz uma das frases conhecidas — "é só um CRUD", "a IA gera o
  código", "microsserviços desde o início", "segurança a gente vê depois",
  "vamos contratar quando crescer" —, THEN a skill SHALL responder com a
  posição forte correspondente, e SHALL NOT responder com "pode ser prematuro"
  ou "é importante, sim".

- **REQ-006 — Premissas viram afirmações antes de qualquer decisão.**
  WHEN a skill vai recomendar, THEN ela SHALL primeiro listar as premissas
  técnicas como afirmações numeradas e perguntar com quais a pessoa discorda.
  Premissa que ninguém confirmou não sustenta decisão — é a mesma regra que o
  handoff aplica a proposta não confirmada.

- **REQ-007 — Os sinais são contados com evidência, e não viram nota.**
  WHEN a sessão fecha, THEN a skill SHALL registrar no documento do canvas
  quais dos sete sinais apareceram, **cada um com a citação literal** que o
  sustenta.
  E SHALL NOT devolver à pessoa uma nota, contagem ou classificação. Dizer "você
  tem dois de sete" transforma a conversa numa avaliação, e a partir daí ela
  responde para pontuar, não para pensar. A contagem serve a quem vai ler
  depois; a citação é o que a torna verificável.

- **REQ-008 — O canvas sai em documento.**
  WHEN a sessão fecha, THEN SHALL existir `specs/canvas/cto-canvas/canvas.md`,
  gerado a partir das partes respondidas: estágio, premissas confirmadas,
  decisão técnica com as alternativas, sinais com citação, e o que ficou sem
  resposta. É **vista**, não memória: regenerado a cada fechamento, como o
  relatório (`session-protocol`).

- **REQ-009 — A voz e o conteúdo são do Yves.**
  Nenhuma frase do gstack é copiada; o que veio de lá é a forma (D-CTO-004). Os
  exemplos são do contexto brasileiro que o `PROJECT.md` declara.

- **REQ-010 — A validação e o roteador acompanham.**
  WHEN `npm run check` roda, THEN a skill nova SHALL passar em tudo que já é
  cobrado — `parts:` declaradas e conduzidas, nada do baseline citado, teto de
  linhas — e o `/canvas` SHALL rotear para ela.

- **REQ-011 — O eval cobre o que é novo.**
  Fixtures novas para: **o portão de estágio** (a primeira chamada é a pergunta,
  e o estágio muda quais perguntas vêm) e **o empurrão** (resposta genérica não
  fecha a parte; bandeira vermelha é nomeada). As seis fixtures existentes
  continuam passando.

## Fora de escopo

- **Handoff** — D-CTO-003, com gatilho escrito.
- **`/techlead-canvas`** — é a outra persona, e vem depois.
- **Nota, painel ou classificação de fundador** — REQ-007. O que o acelerador
  faria com os sinais é assunto do SaaS, não desta skill.
- **Ler o repositório da pessoa para mapear a arquitetura.** A fonte prevê
  ("ler o repo antes de perguntar"), e isso é uma feature própria: exige teto de
  leitura, estratégia e fixture com código — que o pack ainda não tem em lugar
  nenhum.

## Como saber se deu certo

O gate de sempre. E o que ele não mede, que nesta skill é quase tudo: **uma
sessão real com um fundador técnico**, que é a pendência mais velha do
`STATE.md`. A `/eng-review` sobrevive a um teste automatizado porque revisa um
texto; o canvas conduz uma pessoa, e pessoa nenhuma respondeu a este protocolo
até hoje.
