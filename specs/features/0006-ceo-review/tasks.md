# 0006 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`

**Sem `design.md`, de propósito.** A 0005 precisou de um porque cortava
`shared/` ao meio. Aqui o formato de revisão já existe e foi exercitado em
quatro features; o que havia de escolha está no `context.md`. Escrever um
documento de design para dizer "segue o que já está lá" custa contexto e
envelhece.

---

## T1 — a skill `[REQ-001..REQ-005]`

**O quê:** `skills/ceo-review/SKILL.md`. Portão de escopo com opções de
artefato escrito (sem diff), as cinco partes com o que empurrar até ouvir, a
combinação crítica de D-CEO-003, e a fronteira com a engenharia: nomeia o
problema técnico e manda para a outra role, sem opinar.

**Done when:** `npm run check` verde · abaixo de **200 linhas** · nenhuma
avaliação técnica no texto · a combinação crítica está escrita como **um** item,
com as três faltas na mesma frase.

**Feito** (2026-09-23) — **138 linhas**. A combinação crítica está como um item
só, e a fronteira com a engenharia precisou de duas correções que o eval achou:
primeiro ela estava larga demais e proibia o que é da role (decisão de produto
que aparece numa revisão técnica); depois ficou clara demais para o lado oposto
e a sessão **decidiu** a pergunta em vez de assumi-la. A linha final:
**o que o sistema faz é seu; como ele faz não é** — e assumir a pergunta não é
respondê-la.

---

## T2 — o roteador `[REQ-007]`

**O quê:** o `/canvas` roteia para ela, com a linha que separa as duas revisões:
uma pergunta se está bem construído, a outra se devia ser construído assim.

**Depende de:** T1

**Done when:** `npm run check` verde, sem aviso de skill não roteada.

**Feito** (2026-09-23). O roteador ganhou o critério que separa as duas
revisões: uma pergunta se está **bem construído**, a outra se **devia ser
construído assim** — e a regra que evita o erro provável, *plano que não diz
para quem serve nem o que fica de fora é da segunda, mesmo cheio de decisão
técnica*.

---

## T3 — as fixtures `[REQ-008, REQ-006]`

**O quê:**

- `scope-creep` — um plano com problema sem dono, sem não-objetivos e sem
  número. As três faltas precisam virar **um** item em "Barra o plano". Se
  aparecerem como três ressalvas, falha.
- `handoff-cross-role` — nasce com partes de `eng-review` no disco sobre o
  mesmo alvo. O handoff gerado tem que conter itens das **duas** roles, cada um
  com a sua fonte. É a primeira vez que o desenho da 0004 é exercitado.

**Depende de:** T1, T2

**Done when:** **18 de 18** · as oito fixtures antigas não foram tocadas · a
`scope-creep` falha se a skill listar as três faltas separadas.

**Feito** (2026-09-23), e o "18 de 18" **não foi assim que fechou** — a
política de teste mudou no meio da feature, a pedido do Yves: a suíte completa
deixou de rodar a cada skill.

O que foi medido, e como:

```
handoff-cross-role  ok · ok     na última rodada completa (25 de 27)
scope-creep         ok · ok     medido isolado, 10 turnos, 184s
greenfield-plan     ok · ok     medido isolado, 11 turnos, 354s
```

**A `scope-creep` custou três medições e três correções de rubrica**, e isso é o
veredito mais útil desta task. Os três critérios estavam errados de jeitos
diferentes: um cobrava a frase canônica em vez do julgamento; outro exigia que a
sessão perguntasse a um driver que **nunca responde**; o terceiro listava
"integração" junto com stack, e reprovou "conectar em vez de substituir", que é
decisão de escopo.

A causa comum: **eu escrevi a rubrica antes de ver uma sessão da role.** As
fixtures do `/eng-review` e da `/cto-canvas` nasceram depois de eu ter visto
aquelas skills rodando; esta nasceu junto com a role. Critério para
comportamento que ninguém observou é adivinhação — e agora medir uma sessão
custa três minutos (`YAS_EVAL_ONLY`), então não há desculpa.

**E uma coisa ficou sem teste, registrada em vez de fingida:** nenhuma fixture
mede se a role **pergunta**, porque o driver responde sempre a mesma
concordância — que serve para quem propõe achados, não para quem interroga.
Está no `STATE.md` e marcada `⚠️` no `VERIFICATION.md`.

---

## T4 — fechar

**O quê:** `ROADMAP.md`, `STATE.md`, PR.

**E a pergunta que esta feature existe para responder**, registrada no `STATE`
com a resposta: **o `review-protocol` precisou de alguma exceção por papel?**
Se em algum momento eu escrever "quando for a role X" dentro dele, o corte da
0005 foi no lugar errado, e isso vale mais que a skill nova.

**Feito** (2026-09-23). **Resposta: não precisou.** Nenhuma linha de
`review-protocol.md` ou de `session-protocol.md` diz "quando for a role X". As
duas correções que a `/ceo-review` exigiu ficaram **dentro dela** — a fronteira
com a engenharia é conteúdo de papel, não de protocolo.

O corte da 0005 se sustentou no primeiro uso real, e sustentou também o que veio
junto: as regras que nasceram no meio da 0006 (esforço sem base é invenção; a
alternativa é sua, os fatos que a sustentam não; a pergunta se faz na conversa)
foram todas para o `session-protocol` e valem para as três skills — sem exceção
para nenhuma.

**Depende de:** T3
