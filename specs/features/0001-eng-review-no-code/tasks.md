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

**Done when:**
- `npm run check` valida a fixture (três arquivos, ids únicos, driver bem formado);
- `YAS_EVAL=1 npm run eval` roda a fixture e ela **falha**, com o veredito
  apontando premissa inventada ou limitação não declarada;
- a falha está colada na task, literal.

---

## T2 — O ramo "sem código" no Passo 4 `[REQ-001, REQ-002]`

**O quê:** o `Passo 4` do `SKILL.md` passa a decidir entre os dois mundos por um
teste declarado, e o caminho sem código redireciona o desafio de escopo para o
que é verificável fora do repositório.

**Onde:** `skills/eng-review/SKILL.md`

**Reusa:** o texto do desafio de escopo que já existe; o ramo novo é um
parágrafo, não uma segunda skill.

**Done when:**
- `npm run check` verde (inclui o teto de 400 linhas — se estourar, corta);
- o ramo cabe em até 12 linhas.

---

## T3 — Declarar a limitação e não inventar `[REQ-003, REQ-004, REQ-005]`

**O quê:** o relatório ganha a linha do que não pôde ser verificado; a regra de
não escrever fato que o plano não deu sai do instinto nº 6 e vira regra do
Passo 7; a 5.2 diz por que está curta quando não há código.

**Onde:** `skills/eng-review/SKILL.md` (Passos 5.2 e 7)

**Depende de:** T2

**Done when:**
- `npm run check` verde;
- a fixture da T1 passa nas duas camadas;
- `no-target`, `vague-scale` e `webhook-cpf` continuam verdes — mexer no molde
  é onde a regressão cruzada aparece.

---

## T4 — Fechar a feature `[REQ-006]`

**O quê:** `ROADMAP.md` ganha a linha do que saiu e o `STATE.md` é reescrito com
o estágio novo. Faz parte da feature, não é opcional.

**Onde:** `specs/project/ROADMAP.md`, `specs/project/STATE.md`

**Depende de:** T3

**Done when:**
- suíte completa **8 de 8** (as quatro fixtures × duas camadas), colada aqui;
- o item sai de "Próximo" e entra em "Entregue" no roadmap;
- PR aberto contra `main`, com o corpo informado explicitamente.
