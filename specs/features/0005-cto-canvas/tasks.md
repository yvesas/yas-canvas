# 0005 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`

A ordem é a do `design.md` §6. A **T2 é um gate sozinha**, e é o que separa dois
diagnósticos que juntos ficariam indistinguíveis: "o corte quebrou alguma coisa"
e "a skill nova está errada".

---

## T1 — o corte `[REQ-001]`

**O quê:** `shared/session-protocol.md` nasce com o portão (§1), as partes e o
menu (§3), o território e o arquivo de parte (§4) e as alternativas (§5). O
`review-protocol.md` fica com "em que mundo estou", o relatório, "Barra o plano"
e o ponteiro do handoff. A autoverificação se divide. O `/eng-review` passa a
declarar os dois, e as referências `§n` dele acompanham a renumeração.

**Onde:** `shared/session-protocol.md`, `shared/review-protocol.md`,
`skills/eng-review/SKILL.md`, `scripts/check.mjs` (as âncoras mudam de arquivo)

**Done when:** `npm run check` verde · **nenhuma frase mudou de conteúdo** —
o diff move texto e ajusta número de seção, nada mais · `bin/install --project`
copia os quatro arquivos para o lado da role.

---

## T2 — o gate do corte `[REQ-001]`

**O quê:** rodar a suíte inteira com as **seis fixtures de hoje**, sem nenhuma
skill nova existir.

**Depende de:** T1

**Done when:** **12 de 12**, colado aqui. Se cair, o texto mudou de sentido ao
mudar de arquivo — conserta o texto, nunca a fixture. E conserta **antes** de
escrever a skill nova: diagnosticar as duas coisas ao mesmo tempo é o que fez a
rodada 2 da 0004 custar caro.

---

## T3 — a skill `[REQ-002..REQ-009]`

**O quê:** `skills/cto-canvas/SKILL.md`. Portão de estágio como primeira chamada
(parada dura, inline), roteamento por estágio, as seis partes com o empurrar-até
e as bandeiras, os padrões de empurrão, as premissas como afirmações, os sinais
com citação e sem nota, e o documento do canvas.

**Onde:** `skills/cto-canvas/SKILL.md`

**Depende de:** T2

**Done when:** `npm run check` verde · abaixo de **250 linhas** (o genérico está
no `session-protocol`; se não couber, alguma coisa que eu escrevi é protocolo) ·
nenhuma frase do gstack copiada · os sinais não viram nota em lugar nenhum do
texto.

---

## T4 — o roteador `[REQ-010]`

**O quê:** o `/canvas` passa a rotear para `/cto-canvas`, com a linha que separa
as duas: revisão avalia um artefato, canvas estrutura a pessoa.

**Onde:** `skills/canvas/SKILL.md`

**Depende de:** T3

**Done when:** `npm run check` verde — ele já cobra que o roteador cite toda
skill que existe, e agora existem duas.

---

## T5 — as fixtures `[REQ-011]`

**O quê:** `cto-stage-gate` (um turno: a primeira chamada é a pergunta de
estágio, sem leitura antes) e `cto-push-specific` (multi-turno: o driver
responde vago duas vezes, e a skill precisa insistir até o concreto e nomear a
bandeira vermelha como bandeira).

**Onde:** `test/fixtures/cto-stage-gate/`, `test/fixtures/cto-push-specific/`

**Depende de:** T3, T4

**Done when:** **16 de 16** · as seis fixtures antigas não foram tocadas · a
fixture do empurrão falha se a skill aceitar a primeira resposta genérica.

---

## T6 — fechar

**O quê:** `ROADMAP.md`, `STATE.md`, e o PR.

**ADR:** o corte entre `session-protocol` e `review-protocol` é estrutural — ele
define o que uma skill lê por ser **sessão conduzida** e o que lê por ser
**revisão**. Se sobreviver à feature, vira ADR: é a terceira vez que a divisão
de `shared/` muda, e as duas primeiras estão registradas.

**Depende de:** T5
