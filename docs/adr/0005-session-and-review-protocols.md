# ADR 0005 — Sessão e revisão são dois protocolos

**Data:** 2026-09-23 · **Status:** aceito · **Estende:** ADR 0002

## Contexto

A 0002 dividiu o que é **papel** do que é **protocolo de revisão**, e o
`review-protocol.md` nasceu com o cabeçalho dizendo que **não vale para os
canvas**. Era verdade e incompleto: metade do que estava ali não tinha nada de
revisão.

A 0003 acrescentou, dentro dele, o território `specs/canvas/`, o formato do
arquivo de parte e o menu. Nada disso depende de haver um artefato sendo
avaliado — mas ficou no arquivo de revisão porque era a única skill que existia.

O `/cto-canvas` é a primeira skill que **conduz uma pessoa**, e expôs a costura:
ela precisa do portão, das partes, do menu, de onde gravar e das alternativas, e
não precisa de relatório, de "Barra o plano" nem de handoff. O `STATE.md` previa
essa verificação desde a 0002 — "a primeira role a usar o `review-protocol` vai
mostrar se a divisão está no lugar certo".

## Decisão

Dois protocolos, e a pergunta que separa é **de que a regra depende**:

| Arquivo | Contém | Depende de |
|---|---|---|
| `session-protocol.md` | portão, partes, menu, território, alternativas | conduzir alguém |
| `review-protocol.md` | em que mundo estou, relatório, "Barra o plano", handoff | avaliar um artefato |

O `/eng-review` declara os dois; o `/cto-canvas`, só o primeiro. O portão
continua **inline em cada skill** — o que muda é a pergunta: a revisão pergunta
o **escopo**, o canvas pergunta o **estágio**.

## Por quê

- **Ler regra que não se aplica custa duas vezes:** contexto em todo turno, e
  confusão quando a regra fala de "relatório" para quem não escreve relatório.
  Na 0004 isso já tinha aparecido — protocolo grande demais fez uma sessão de um
  turno parar de tomar posição.
- **A alternativa era duplicar**, e é o que a 0002 existe para impedir.
- **O corte tem prova:** as seis fixtures da role fecharam 12 de 12 com a
  separação feita e **antes** de a skill nova existir. Sem esse passo, as três
  falhas seguintes teriam sido investigadas contra dois suspeitos ao mesmo
  tempo.
- **E ele economiza sessão:** mexer no `review-protocol` não roda mais as
  fixtures do canvas, porque ele não as declara. O seletor de escopo transformou
  a decisão de arquitetura em minuto de eval não gasto — o teste em
  `test/scope.test.mjs` cobra isso.

## Quando revisitar

Quando a terceira família aparecer. Se um dia existir uma skill que não conduz
ninguém — que só lê e produz, sem parar para resposta —, ela vai expor esta
divisão como o `/cto-canvas` expôs a anterior. **A regra para o próximo corte é
a mesma:** pergunte de que a regra depende, não em que arquivo ela está hoje.
