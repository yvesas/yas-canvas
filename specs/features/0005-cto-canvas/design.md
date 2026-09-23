# 0005 — design

> Decide o corte entre os dois protocolos, o portão de estágio e o roteamento,
> os nomes das seis partes, o formato do documento do canvas e as fixtures. Não
> decide a prosa das perguntas — isso é escrita, e sai nas tasks a partir do
> `docs_yaslab/25`.

## 1. O corte

O `review-protocol.md` tem hoje oito seções. Quatro não são de revisão:

| Hoje | Vai para | Por quê |
|---|---|---|
| §1 o portão mora na skill | **session-protocol** | toda sessão conduzida tem um portão; o da revisão é escopo, o do canvas é estágio |
| §2 em que mundo estou (há código?) | fica em **review** | só faz sentido revisando um artefato |
| §3 uma parte por vez, menu | **session-protocol** | genérico: a 0003 nasceu para revisão e não tem nada de revisão |
| §4 território e arquivo de parte | **session-protocol** | onde o pack escreve não depende do que a skill faz |
| §5 alternativas | **session-protocol** | a fonte do canvas exige alternativas na fase 4, igual |
| §6 relatório, "Barra o plano" | fica em **review** | é a saída de uma revisão |
| §7 handoff (ponteiro) | fica em **review** | handoff pressupõe alvo; canvas não tem |
| §8 autoverificação | **divide** | o que é de arquivo e menu vai; o que é de relatório fica |

Depois do corte:

```
shared/
├── preamble.md          voz, anti-bajulação, fechamento      todas
├── session-protocol.md  portão, partes, menu, arquivo, alternativas
├── review-protocol.md   mundo, relatório, "Barra o plano", handoff
└── handoff.md           lido no fechamento de uma revisão
```

| Skill | `shared:` |
|---|---|
| `/eng-review` | `[preamble, session-protocol, review-protocol, handoff]` |
| `/cto-canvas` | `[preamble, session-protocol]` |
| `/canvas` | `[preamble]` |

**É mudança de endereço, não de conteúdo.** Cada frase movida vai inteira. O
que mudar de sentido no caminho, o eval das seis fixtures existentes pega — é
exatamente o gate que a 0002 usou quando fez o primeiro corte.

**As frases-âncora do `check.mjs` mudam de arquivo junto**, e o próprio check
falha se uma âncora sumir da fonte — a guarda que a 0002 criou funciona aqui
sem ninguém mexer nela.

## 2. O portão de estágio

Primeira chamada de ferramenta, parada dura, inline na skill (como manda o
§1 do session-protocol):

> Onde você está hoje?
>
> A) Nada em produção — estou construindo.
> B) MVP no ar, com os primeiros usuários.
> C) Clientes pagando.
> D) Infra ou motor, sem produto na frente.

**Exceção, e só uma:** se a pessoa já disse o estágio na primeira mensagem
("tenho três clientes pagando"), use o que ela disse e anuncie em uma linha.

O estágio escolhe o que o menu sugere:

| Estágio | Perguntas |
|---|---|
| A — nada em produção | `status-quo` · `risk-specifics` · `smallest-slice` |
| B — MVP no ar | `production-reality` · `risk-specifics` · `observation` |
| C — clientes pagando | `production-reality` · `observation` · `future-architecture` |
| D — infra pura | `risk-specifics` · `future-architecture` |

As outras continuam no menu, marcadas como fora do estágio — a pessoa escolhe
se quiser, e a skill não insiste. **Três perguntas bem feitas valem mais que
seis corridas**, e o roteamento é o que garante que as três sejam as certas.

## 3. As seis partes

| Slug | Pergunta | Empurrar até ouvir |
|---|---|---|
| `production-reality` | o que roda hoje, e quem reclama se cair 20 minutos | um serviço nomeado, um usuário real, um incidente |
| `status-quo` | como o problema é resolvido hoje sem o sistema | o fluxo real, quem digita o quê, onde quebra |
| `risk-specifics` | qual o pior modo de falha concreto | um dado nomeado, uma consequência específica |
| `smallest-slice` | a menor coisa que entra em produção esta semana | um módulo, uma tabela, um fluxo ponta a ponta |
| `observation` | já viu alguém usar sem ajuda, ou quebrar em produção | um comportamento inesperado, um log, uma métrica |
| `future-architecture` | 100x volume, 10 pessoas, IA escrevendo a maior parte | uma tese sobre o que muda e se a fundação aguenta |

Cada uma carrega as bandeiras vermelhas da fonte. O arquivo de parte é o mesmo
da 0003 — `### O que você disse` com citação literal, `### O que eu propus`,
`### Em aberto` — sem exceção: é o que o ADR 0004 fixou como contrato.

## 4. O documento do canvas

`specs/canvas/cto-canvas/canvas.md`, **vista** regenerada a cada fechamento, do
mesmo jeito que o relatório:

```markdown
---
role: cto-canvas
estagio: mvp-no-ar
gerado: 2026-09-22
respondidas: [production-reality, risk-specifics]
fora: [observation]
---

# Canvas técnico — <o que a pessoa está construindo>

## Onde você está
Estágio, em uma linha, com a frase dela que o define.

## Premissas que você confirmou
1. … · > "citação"

## A decisão técnica desta sessão
Com as alternativas — mínima viável e ideal —, esforço, risco, e o que
mudaria a recomendação.

## Sinais
- **Nomeou o dado sensível** · > "o CPF entra no cadastro, e é o que me
  preocupa"
- (os que não apareceram simplesmente não são listados)

## O que ficou sem resposta
`observation` — sem ela, não dá para saber se o sistema já surpreendeu alguém.

## A tarefa desta semana
Uma. Com o arquivo, o comando ou a conversa.
```

**Os sinais aparecem com a citação e sem contagem** (REQ-007). Quem lê depois
conta se quiser; a pessoa na sessão não recebe nota. Sessão que vira avaliação
passa a receber resposta calibrada para pontuar.

## 5. As fixtures

Duas novas, e as duas medem o que é próprio desta skill:

- **`cto-stage-gate`** (um turno) — a primeira chamada de ferramenta é a
  pergunta de estágio, e nenhuma leitura do projeto acontece antes. O prompt
  não diz o estágio, então a exceção não se aplica.
- **`cto-push-specific`** (multi-turno) — a pessoa responde genérico ("a gente
  usa uns serviços", "segurança a gente vê depois"). A skill precisa insistir
  até o concreto e **nomear a bandeira vermelha** como bandeira, com a posição
  forte. O driver responde vago duas vezes antes de concretizar: é assim que
  mede empurrão, e não gentileza.

Suíte: **16 de 16** (oito fixtures, duas camadas).

## 6. Ordem de implementação

1. **O corte** — `session-protocol.md` nasce, `review-protocol.md` encolhe, o
   `/eng-review` declara os dois, âncoras do `check.mjs` acompanham.
2. **O gate do corte** — a suíte de seis fixtures fecha **12 de 12** sem
   nenhuma skill nova existir. Se cair aqui, o texto mudou de sentido ao mudar
   de arquivo, e não há nada de canvas envolvido para confundir o diagnóstico.
3. **A skill** — `/cto-canvas`, com portão, roteamento, as seis partes e o
   documento.
4. **O roteador** — `/canvas` passa a conhecê-la.
5. **As fixtures** — as duas novas; suíte inteira em 16 de 16.
6. **Fechamento** — ROADMAP, STATE, e o ADR do corte se ele sobreviver.

O passo 2 é o que separa dois diagnósticos que, juntos, ficariam impossíveis de
distinguir: "o corte quebrou alguma coisa" e "a skill nova está errada".

## Riscos que este design não elimina

- **Empurrar até o específico é o que nenhum teste garante.** O eval mede se a
  skill insistiu; não mede se a insistência foi útil ou irritante. Só sessão
  real diz.
- **Seis perguntas com empurrão é uma conversa longa.** O menu e as partes
  tornam o abandono sobrevivível, mas se a pessoa sair sempre na segunda, o
  problema é o protocolo, não ela.
- **O canvas não lê o repositório**, e a fonte diz que deveria. Está fora de
  escopo por falta de fixture com código — a mesma lacuna que o `STATE.md` já
  carrega desde a 0003.
