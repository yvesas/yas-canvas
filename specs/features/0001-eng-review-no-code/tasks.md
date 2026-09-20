# 0001 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`
(ver `specs/codebase/TESTING.md`; o completo custa ~8min e tokens).

---

## T1 — Fixture greenfield primeiro `[REQ-006]`

**O quê:** `test/fixtures/greenfield-plan/` com um plano de sistema que ainda não
existe: sem repositório, sem arquivo citado, com uma premissa verificável fora
do código (um fornecedor nomeado) e uma lacuna que exige pergunta em vez de
palpite.

**Onde:** `test/fixtures/greenfield-plan/{plan.md,prompt.txt,expect.json,rubric.md}`

**Por que primeiro:** a fixture escrita antes da correção **tem que falhar** —
é o que prova que ela mede o buraco, e não o contrário. Fixture escrita depois
passa por acidente e ninguém descobre.

**Done when:** ✔ concluída.

`test/fixtures/greenfield-plan/` — plano de assistente de prazos que ainda não
existe, com duas lacunas que o próprio autor declara não saber: o formato da API
do PJe e o volume de processos. São o convite ao palpite.

Resultado: **determinístico passa, juiz reprova** — 1 de 6 critérios. Literal:

> `qualidade_curta_com_motivo`: A abertura da seção só justifica a mudança de
> natureza do exercício ("Não há código, então aqui eu não corrijo — eu digo que
> forma o primeiro código precisa ter para não nascer com esses defeitos"), mas
> nunca diz que a seção está curta nem por quê — e em seguida entrega 7 itens
> extensos, do mesmo tamanho da seção de arquitetura, incluindo conselhos
> genéricos de engenharia embutidos (item 4: "except Exception: pass, catch {},
> if err != nil { } vazio — nenhum entra"; item 6: "Relógio injetado, fuso
> explícito") em vez de reconhecer a limitação e manter a seção enxuta.

**O que isso mudou.** Cinco dos seis critérios já passavam: a skill declara a
limitação, pergunta em vez de assumir, não inventa fato e ataca o que dá para
verificar. **O buraco é mais estreito do que a spec supunha** — a rodada 1 de
evals exagerou o diagnóstico porque era de um turno só.

E o critério que reprovou prescrevia solução em vez de cobrar propriedade.
Reescrito como `sem_recheio_generico`; continua reprovando a sessão de hoje.

**Consequência:** T2 encolhe — o ramo do Passo 4 é um parágrafo, não uma
reescrita — e T3 fica com um item só, o que importa: amarrar cada achado a uma
frase do plano.

---

## T2 — O ramo "sem código" no Passo 4 `[REQ-001, REQ-002]`

**O quê:** o `Passo 4` do `SKILL.md` passa a decidir entre os dois mundos por um
teste declarado, e o caminho sem código redireciona o desafio de escopo para o
que é verificável fora do repositório.

**Onde:** `skills/eng-review/SKILL.md`

**Reusa:** o texto do desafio de escopo que já existe; o ramo novo é um
parágrafo, não uma segunda skill.

**Done when:** ✔ concluída. O ramo ficou em 8 linhas no `Passo 4`: decide o
mundo em uma linha, e sem código redireciona o desafio de escopo para o que é
verificável fora do repositório — contrato do fornecedor nomeado, formato do
dado, restrição declarada. O que o autor disse não saber virou pergunta
explícita: *"arbitrar um valor e revisar em cima dele é revisar o seu palpite,
não o plano dele."*

---

## T3 — Declarar a limitação e não inventar `[REQ-003, REQ-004, REQ-005]`

**O quê:** o relatório ganha a linha do que não pôde ser verificado; a regra de
não escrever fato que o plano não deu sai do instinto nº 6 e vira regra do
Passo 7; a 5.2 diz por que está curta quando não há código.

**Onde:** `skills/eng-review/SKILL.md` (Passos 5.2 e 7)

**Depende de:** T2

**Done when:** ✔ concluída — suíte **8 de 8**.

Três rodadas até fechar, e cada uma achou coisa diferente:

1. `greenfield-plan` passou logo (a 5.2 amarrada ao plano resolveu), mas
   `webhook-cpf` caiu em `lacuna_critica_no_topo`: a skill escreveu *"é o topo do
   relatório"* dentro da seção 5.3 — e o relatório não tinha topo definido. O
   `Passo 7` listava o conteúdo sem ordem. **"Topo" era adjetivo, virou posição:**
   o relatório ganhou esqueleto, com "Barra o plano" logo depois do escopo.
2. Caiu de novo, por outro motivo: a lacuna estava no topo, mas partida — o teste
   faltante num item, o erro engolido em outro. **A combinação quase nunca nasce
   inteira**, porque as seções são revisadas uma por vez. A junção virou passo
   explícito na hora de escrever o relatório, com as três perguntas por caminho
   de código.
3. Caiu por orçamento: a skill cresceu (229 → 266 linhas) e o protocolo passou a
   precisar de mais de 7 turnos. Teto para 9 — e a distinção entre **orçamento** e
   **asserção** ficou escrita no `TESTING.md`.

---

## T4 — Fechar a feature `[REQ-006]`

**O quê:** `ROADMAP.md` ganha a linha do que saiu e o `STATE.md` é reescrito com
o estágio novo. Faz parte da feature, não é opcional.

**Onde:** `specs/project/ROADMAP.md`, `specs/project/STATE.md`

**Depende de:** T3

**Done when:** ✔ concluída.

```
ok 1 - greenfield-plan    (protocolo + juiz)
ok 2 - no-target          (protocolo + juiz)
ok 3 - vague-scale        (protocolo + juiz)
ok 4 - webhook-cpf        (protocolo + juiz)
# tests 8 · pass 8 · fail 0
```
