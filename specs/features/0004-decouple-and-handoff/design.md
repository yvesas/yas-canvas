# 0004 — design

> O que este documento decide: onde cada arquivo do pack mora, o formato exato
> do handoff, como ele é montado a partir das partes, o texto que substitui cada
> um dos nove pontos de acoplamento, e o que a guarda cobra. O que ele **não**
> decide: a prosa final das skills — isso é escrita, e sai nas tasks.

## 1. Memória e vistas: a regra que a 0003 escreveu estreita demais

A 0003 disse "a skill nunca apaga texto". Ela estava falando das **partes**, e a
regra certa é mais precisa:

| | O que é | Quem edita | A skill pode reescrever? |
|---|---|---|---|
| **Parte** (`<role>/<parte>.md`) | **memória** — o que foi dito e proposto | a pessoa | **nunca**: só frontmatter e rodada nova no fim |
| **Relatório** (`<role>/report-<alvo>.md`) | **vista** para a pessoa agir | ninguém — gerado | sim, a cada fechamento |
| **Handoff** (`handoff/<alvo>.md`) | **vista** para quem executa | ninguém — gerado, exceto as notas | sim, preservando `## Notas para quem executa` |

**A fonte da verdade é uma só: as partes.** Relatório e handoff são leituras
delas, como um build é leitura do código. Quem quer mudar o que o handoff diz
muda a parte e gera de novo.

**Achado deste design — o REQ-007 dizia "a única exceção".** Com o relatório
saindo do plano e virando arquivo do pack, ele também é regenerado. São duas
vistas, e a regra que vale para as duas é esta tabela. Corrigido no spec.

## 2. O território

```
specs/canvas/
├── eng-review/
│   ├── architecture.md                parte — memória (0003)
│   ├── …
│   └── report-docs-plano-webhook.md   vista para a pessoa
└── handoff/
    └── docs-plano-webhook.md          vista para quem executa
```

**Um relatório por role e por alvo**, porque a mesma role pode revisar dois
planos no mesmo projeto, e o relatório de um não pode sobrescrever o do outro.

**O `<alvo>` é derivado do caminho, deterministicamente:** sem extensão, `/`
vira `-`, minúsculo. `docs/plano-webhook.md` → `docs-plano-webhook`. Feio e sem
colisão: dois `plan.md` em pastas diferentes geram nomes diferentes, e ninguém
precisa escolher nome. O caminho completo fica no frontmatter.

## 3. Como o handoff é montado

A 0003 deixou as partes parseáveis sem querer: cada rodada abre com
`## AAAA-MM-DD — <alvo>`. Para gerar o handoff de um alvo:

1. `Glob` em `specs/canvas/*/*.md` — **todas as roles**, não só a que está
   rodando (REQ-004).
2. Em cada parte, só as rodadas cujo título nomeia **este** alvo.
3. Cada item vai para um lugar, por uma regra mecânica (REQ-006):

| Onde o item está na parte | Para onde vai no handoff |
|---|---|
| em `### O que você disse` | Decisões, Requisitos, Restrições, Tarefas |
| só em `### O que eu propus`, e a pessoa depois confirmou (citação) | idem, com a citação da confirmação |
| só em `### O que eu propus`, sem confirmação | **Confirmar antes de executar** |
| em `### Em aberto` | **Confirmar antes de executar** |
| parte `pendente` ou sem arquivo | **O que esta revisão não cobriu** |

**Todo item rastreia até a fonte:** parte, data e a citação que o autoriza.
Sem citação, não é decisão — e o REQ-006 fica verificável item a item, em vez
de depender de o modelo "ter entendido".

## 4. O formato do handoff

```markdown
---
alvo: docs/plano-webhook.md
gerado: 2026-09-22
fontes: [eng-review/architecture, eng-review/security-and-data]
nao_cobertas: [eng-review/tests, eng-review/quality, eng-review/delivery-and-ci]
---

<!-- GERADO a partir de specs/canvas/<role>/<parte>.md. Para mudar o que está
     aqui, edite a parte e gere de novo. A única seção que sobrevive à
     regeneração é "Notas para quem executa", no fim. -->

# Handoff — docs/plano-webhook.md

## Contexto
Duas ou três frases: o que o plano quer, e em que mundo ele está (§2).

## Decisões
- **D-001** — o webhook só guarda o número do processo; CPF não entra.
  · eng-review/security-and-data, 2026-09-22 · > "CPF não precisa ficar"

## Requisitos
- **REQ-001** — WHEN o PJe devolve 429, THEN o worker SHALL esperar e
  tentar de novo, sem perder a mensagem. · eng-review/architecture

## Restrições — o que não fazer
- Não logar o corpo da movimentação. · eng-review/security-and-data

## Confirmar antes de executar
- Fila dedicada por escritório — **proposto, não confirmado**.
  · eng-review/architecture · não execute sem perguntar

## Tarefas
- **T1** — isolar o PJe atrás de uma interface, com implementação falsa.
  Pronto quando: um teste roda sem rede.

## Primeira tarefa
T1 — …, porque destrava as outras duas.

## O que esta revisão não cobriu
- `tests` — sem ela, a lacuna "sem teste + sem tratamento + falha silenciosa"
  não foi verificada em caminho nenhum.

## Notas para quem executa
<!-- Da pessoa. Preservado entre regenerações. -->
```

**Achado deste design — faltava "O que esta revisão não cobriu" no REQ-005.**
A 0003 obrigou o relatório a dizer o que as partes pendentes impedem de
concluir. O handoff vai para um executor, que precisa saber isso **mais** do
que a pessoa: ele vai construir em cima, e área não revisada parece área
aprovada. Acrescentado ao spec.

**IDs locais ao handoff** (`D-001`, `REQ-001`, `T1`): mapeiam 1:1 para o
spec-driven sem presumir a numeração de um projeto que talvez nem o use.

## 5. Quando o handoff é gerado

**No fechamento de toda sessão que respondeu ao menos uma parte**, e sempre
inteiro. O REQ-008 obriga a "uma tarefa" do fechamento a ser a primeira do
handoff, e para isso ele precisa existir naquela hora. Gerar só sob pedido
deixaria o handoff velho em relação às partes — exatamente o que um arquivo
derivado não pode ser.

## 6. Os nove pontos, um por um

| Onde | Hoje | Passa a dizer |
|---|---|---|
| preâmbulo, "a saída" | "no lugar que a regra `docs-and-specs.md` do projeto define" | em `specs/canvas/`, o território do pack |
| preâmbulo, "onde salvar" | `specs/features/NNNN-slug/`, `specs/quick/`, `docs/adr/` | a estrutura do §2 |
| preâmbulo, "não faz" | "mande para `/commit`, `/pr` e as regras do baseline" | o pack entrega o handoff e para; commit, PR, deploy e segredo são do fluxo de quem executa |
| `/canvas`, "não é daqui" (2) | "é do `.claude/` do projeto… aponte para `/commit`, `/pr`" | a mesma fronteira, e o controlador aponta o handoff |
| protocolo §6 | "seguem `.claude/rules/docs-and-specs.md`" | relatório em `specs/canvas/<role>/` |
| protocolo §6 | `specs/quick/NNN-<role>-<slug>/review.md` | idem |
| `/eng-review`, instinto 10 | "(`ci-minutes.md` do projeto)" | sai o parêntese; o instinto se sustenta sozinho |
| `/eng-review`, `tests` | "`TEST_CMD` no `.claude/stack.env`" | "o comando que o projeto documenta — README, contribuição, CI" |

E dois que não estão na contagem porque não são instrução, mas ensinam o
formato: os **exemplos** do protocolo §4 usam `specs/features/0004-webhook/plan.md`
como alvo. Passam a usar `docs/plano-webhook.md`.

## 7. A causa, não só os sintomas

Os nove pontos têm uma origem, e ela não está em `shared/` nem em `skills/`:

- **O `CLAUDE.md` deste repositório manda acoplar.** A golden rule diz: "quando
  o trabalho chega nesse ponto, a skill aponta para `/commit`, `/pr` ou a regra
  em `.claude/rules/`". Foi seguindo-a que o acoplamento entrou. Corrigir as
  skills sem corrigir a regra é consertar o vazamento e deixar o cano aberto.
- **O `check.mjs` tinha uma lista de exceções para ele**:
  `external = ["commit", "pr", "spec", "branch", "state", "stack", "new-project"]`,
  "comandos do baseline que o roteador cita para mandar embora". A guarda do
  REQ-009 não funciona enquanto essa lista existir, e ela sai.
- O princípio 1 do `PROJECT.md` ("Skill propõe; hook enforça") continua certo, mas
  passa a dizer a fronteira com as palavras do Yves: estratégico aqui,
  operacional em quem executa.

## 8. A guarda (REQ-009)

O `check.mjs` falha quando `shared/` ou `skills/` citar:

| Padrão | Por quê |
|---|---|
| `` `/commit` ``, `` `/pr` ``, `` `/branch` ``, `` `/spec` ``, `` `/state` ``, `` `/stack` ``, `` `/new-project` `` | comando do baseline |
| `.claude/` — **exceto** `.claude/skills` | pasta do baseline; `~/.claude/skills` é onde o próprio pack se instala |
| `docs-and-specs`, `ci-minutes` | regra do baseline pelo nome |
| `TEST_CMD`, e o arquivo de stack do baseline | configuração do baseline |
| `specs/features/`, `specs/quick/` | estrutura de pastas presumida |

Com o arquivo e o padrão na mensagem. O padrão do arquivo de stack é escrito na
fonte sem a sequência literal de arquivo de ambiente, que o hook de segredos
barra — o mesmo cuidado que custou três comandos bloqueados nesta sessão.

**Fora da guarda, de propósito:** `CLAUDE.md`, `docs/`, `specs/` e `test/`
deste repositório. Eles descrevem como **desenvolver** o pack, e este
repositório usa o baseline. A guarda é sobre o que **viaja** para a máquina de
quem instala.

## 9. A bancada

- **Chave nova no `expect.json`: `writtenMustNotContainAny`.** Hoje o
  `mustNotContainAny` olha a transcrição. O acoplamento que importa é o que fica
  **gravado** — num handoff que outra pessoa vai abrir daqui a uma semana. A
  chave varre tudo que a sessão escreveu em `specs/canvas/`. Entra também na
  lista de chaves válidas do `check.mjs`, senão ele reprova a fixture.
- **A fixture nova já nasce com partes**, como a da volta, e com uma armadilha
  deliberada: uma proposta tentadora que só existe em `### O que eu propus`,
  nunca confirmada. O critério do juiz: ela aparece em **Confirmar antes de
  executar** e **não** em Tarefas. É o REQ-006 medido.
- As fixtures existentes **não são tocadas**. O relatório muda de lugar, e
  nenhuma depende do lugar: a bancada procura `RELATÓRIO DE REVISÃO` em
  qualquer arquivo do projeto de teste (verificado antes do spec).

## 10. Ordem de implementação

1. **O contrato** — `review-protocol.md`: memória × vista, território, relatório,
   montagem e formato do handoff.
2. **O preâmbulo** — onde salvar, a fronteira, o fechamento apontando o handoff.
3. **As skills** — `/eng-review` (dois pontos), `/canvas` (fronteira e handoffs).
4. **A guarda** — REQ-009, e a lista `external` sai.
5. **A bancada e a fixture** — `writtenMustNotContainAny` e a armadilha.
6. **A causa** — `CLAUDE.md` e `PROJECT.md` deste repositório; fechamento, com
   ADR.

Gate de cada uma: `npm run check`. Gate do conjunto: evals **12 de 12** — as
cinco fixtures de hoje, intocadas, mais a nova, duas camadas cada.

## Riscos que este design não elimina

- **O gerador pode classificar mal.** A tabela do §3 é mecânica, mas quem a
  aplica é um modelo lendo markdown. A citação obrigatória por item é o que
  torna o erro visível — não o que o impede.
- **Handoff grande demais para ser lido.** Cinco partes de duas roles podem
  virar trinta itens. O teto de oito por parte (protocolo §3) ajuda; se não
  bastar, a "Primeira tarefa" é o que salva — quem executa começa por ela.
- **Ninguém usar a seção de notas** e editar o corpo do handoff mesmo assim. O
  comentário no topo avisa; a próxima regeneração apaga. É o custo de o arquivo
  ser derivado, e está escrito onde a pessoa vai ver.
