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

---

## T2 — o roteador `[REQ-007]`

**O quê:** o `/canvas` roteia para ela, com a linha que separa as duas revisões:
uma pergunta se está bem construído, a outra se devia ser construído assim.

**Depende de:** T1

**Done when:** `npm run check` verde, sem aviso de skill não roteada.

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

---

## T4 — fechar

**O quê:** `ROADMAP.md`, `STATE.md`, PR.

**E a pergunta que esta feature existe para responder**, registrada no `STATE`
com a resposta: **o `review-protocol` precisou de alguma exceção por papel?**
Se em algum momento eu escrever "quando for a role X" dentro dele, o corte da
0005 foi no lugar errado, e isso vale mais que a skill nova.

**Depende de:** T3
