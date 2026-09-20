# 0002 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`

---

## T1 — `shared/review-protocol.md` e o `/eng-review` enxuto `[REQ-001, REQ-005]`

**O quê:** mover portão, dois mundos, seção-por-vez, alternativas e todo o
esqueleto do relatório para o arquivo novo. A role fica com preferências,
instintos, as cinco seções e a autoverificação do que é dela.

**Onde:** `shared/review-protocol.md`, `skills/eng-review/SKILL.md`

**Done when:** `npm run check` verde · `/eng-review` abaixo de 150 linhas ·
nenhuma regra nova introduzida (o diff move texto, não inventa).

**Feito** (2026-09-20) — 265 → **149** linhas. Duas ressalvas honestas:

- O corte de 187 para 149 tirou 14 linhas de **frontmatter** (a lista de
  `allowed-tools` virou a forma separada por vírgula) e 24 de prosa. Sem isso o
  piso do corpo era ~160: a role não cabia em 150 só apertando texto.
- **"O diff move texto, não inventa" não se cumpriu.** A 4.2 longa e o "nada do
  que o plano não deu entra como fato" **não existem na `main`** — nasceram
  aqui. São regras novas, e boas, mas entraram por uma tarefa que prometia não
  trazer nenhuma. Ver a nota do REQ-004 no `spec.md`.

---

## T2 — `shared:` no frontmatter, instalador e validação `[REQ-002, REQ-003]`

**O quê:** frontmatter declara os arquivos compartilhados; `bin/install` copia
só os declarados; `check.mjs` verifica os três lados do contrato (declarado
existe · skill manda ler · ninguém cola).

**Onde:** `skills/*/SKILL.md`, `bin/install`, `scripts/check.mjs`

**Depende de:** T1

**Done when:** `npm run check` verde · quebrar o contrato de propósito (declarar
arquivo que não existe, e colar um trecho) é apontado pelo nome do arquivo.

**Feito** (2026-09-20). O `check.mjs` cobra os três lados e mais um que não
estava previsto: **frase-âncora que sumiu da fonte** vira erro. Âncora morta não
protege nada, e em silêncio — o mesmo defeito de gate que some, uma camada
acima.

---

## T3 — O gate do refactor `[REQ-004]`

**O quê:** rodar a suíte inteira **sem tocar em nenhuma fixture**.

**Depende de:** T2

**Done when:** 8 de 8, colado aqui. Se alguma cair, o texto movido mudou de
sentido no caminho — conserta o texto, nunca a fixture.

**Feito** (2026-09-20), na terceira rodada, sem tocar em fixture nenhuma:

```
greenfield-plan  ok · ok      no-target   ok · ok
vague-scale      ok · ok      webhook-cpf ok · ok
escopo por diff  7/7          # pass 15 · # fail 0
```

**Rodada 1 — 7 de 8.** `greenfield-plan` caiu em dois critérios, e os dois eram
defeito de texto:

- `sem_recheio_generico`: *"**5. Nomes que o domínio já tem.** `Processo`,
  `Movimentacao`… use as palavras que o advogado usa"* — conselho que serve para
  qualquer software. Causa: a compressão tinha cortado os três exemplos do que é
  genérico, e um deles era **"nomeie bem"**. Exemplo concreto ali não era
  ilustração: era como o modelo reconhece a própria recaída. Restaurados.
- `nao_inventou_fato`: *"Movimentação traz nome das partes, CPF e teor"* escrito
  como fato, sobre uma API que o autor do plano declara não conhecer. A lista do
  protocolo cobria número, tabela, tecnologia, volume e frequência — **conteúdo
  de payload não estava nela**. Agora está, em três lugares que se cobrem.

**Rodada 2 — dois defeitos da bancada, nenhum da skill.** Duas fixtures com
`ETIMEDOUT` (uma delas de **um turno só**: API lenta, não protocolo longo), e o
juiz reprovando o `no-target` com uma justificativa que termina em *"o critério
é satisfeito (passa)"*. O motivo: ele rodava com `cwd` no repositório, leu no
**próprio** contexto que estava num repo git e usou isso para desmentir a sessão,
que dizia a verdade sobre o projeto de teste (`mkdtemp`, sem git). Juiz agora
roda em diretório vazio, com a instrução escrita. Teto por turno: 10 → 15 min.

---

## T4 — Fechar a feature

**O quê:** `ROADMAP.md` ganha a linha, `STATE.md` é reescrito, PR aberto contra
`main` com corpo informado.

**Depende de:** T3
