---
alvo: plan.md
gerado: 2026-09-22
fontes: [eng-review/architecture, eng-review/security-and-data]
nao_cobertas: [eng-review/quality, eng-review/tests, eng-review/delivery-and-ci]
---

<!-- GERADO a partir de specs/canvas/<role>/<parte>.md. Para mudar o que está
     aqui, edite a parte e gere de novo. A única seção que sobrevive à
     regeneração é "Notas para quem executa", no fim. -->

# Handoff — plan.md

## Contexto
O escritório quer que o cliente acompanhe o próprio caso sem ligar: fase atual,
data do próximo prazo e documentos que já assinou. Hoje a secretária responde
um por um no WhatsApp. O portal é uma rota nova no monólito Node + Postgres que
a equipe já usa. A revisão foi feita **sem código** (o monólito não foi lido)
e cobriu só arquitetura e dados sensíveis. **Leia "Confirmar antes de
executar" antes de começar.** Um item de lá bloqueia a T2.

## Decisões
- **D-001** — O portal é uma rota nova no monólito existente. Não se cria
  outro serviço.
  · eng-review/architecture, 2026-09-20 · > "o portal é uma rota nova no monólito que já existe, não quero outro serviço"
- **D-002** — Login por link mágico enviado por e-mail, sem senha.
  · eng-review/architecture, 2026-09-20 · > "link mágico por e-mail, sem senha, isso está decidido"

## Requisitos
- **REQ-001** — O portal SHALL mostrar ao cliente a fase do caso, a data do
  próximo prazo e os documentos que ele já assinou.
  · plan.md · > "O portal mostra: em que fase o caso está, a data do próximo prazo e os documentos que o cliente já assinou."
- **REQ-002** — WHEN um cliente autenticado pede dados de um caso que não é
  dele, THEN o portal SHALL negar o acesso.
  · eng-review/security-and-data, 2026-09-20 · > "o cliente só pode ver o caso dele, isso não é negociável"
- **REQ-003** — O documento assinado SHALL NOT aparecer em nenhum log.
  · eng-review/security-and-data, 2026-09-20 · > "documento assinado não pode aparecer no log de jeito nenhum"

## Restrições — o que não fazer
- Não criar serviço separado para o portal. · D-001
- Não criar login com senha. · D-002
- Não gravar documento assinado em log: nem no corpo da requisição, nem no da
  resposta, nem na mensagem de erro. · REQ-003

## Confirmar antes de executar
- **Troca de e-mail no meio do processo: quem autoriza, e como o link antigo
  deixa de valer.** Em aberto. **Bloqueia T2.** Como o login é só pelo e-mail,
  errar aqui expõe o caso de um cliente a outra pessoa.
  · eng-review/security-and-data, 2026-09-20 · em aberto · não execute sem perguntar
- **Validade do link mágico de 15 minutos, invalidado ao usar.** Proposto, não
  confirmado.
  · eng-review/security-and-data, 2026-09-20 · não execute sem perguntar
- **Separar o portal num serviço próprio.** Proposto, não confirmado, e
  **contradiz D-001**. A revisão de 2026-09-22 recomenda descartar.
  · eng-review/architecture, 2026-09-20 · não execute
- **Cache de leitura na frente das consultas de fase e prazo.** Proposto, não
  confirmado. A revisão de 2026-09-22 recomenda adiar até haver número de
  acesso.
  · eng-review/architecture, 2026-09-20 · não execute sem perguntar
- **Quantos clientes por escritório acessam ao mesmo tempo.** Em aberto.
  · eng-review/architecture, 2026-09-20 · pergunte, não suponha
- **Resolver o escopo num ponto só: a rota do portal recebe o cliente da
  sessão, nunca de parâmetro.** Proposto no relatório de 2026-09-22, não
  confirmado. É a forma sugerida de cumprir REQ-002.
  · eng-review/report-plan · confirme a forma; o requisito já está decidido

## Tarefas
- **T1** — Rota do portal, só de leitura, que devolve os três dados do REQ-001
  apenas para o cliente dono do caso.
  Autorizada por: D-001, REQ-001, REQ-002, REQ-003.
  Pronto quando: um cliente autenticado vê os dados do próprio caso; o mesmo
  cliente pedindo um caso de outro recebe negação; e nenhum log produzido
  nesse caminho contém o documento assinado.
- **T2** — Login por link mágico no e-mail, emitindo uma sessão de cliente.
  Autorizada por: D-002.
  Pronto quando: um cliente com e-mail cadastrado recebe o link e, ao usá-lo,
  chega à T1. **Não comece antes de resolver a troca de e-mail** (ver
  "Confirmar antes de executar"). Validade e uso único dependem da
  confirmação.

## Primeira tarefa
T1. É onde mora o requisito não negociável (REQ-002), e dá para começar sem
esperar a decisão sobre troca de e-mail, que bloqueia só a T2.

## O que esta revisão não cobriu
- `tests` — nenhum modo de quebra em produção foi levantado por caminho, e
  nenhum comando de teste foi lido. Use o que o repositório do monólito já
  documenta.
- `quality` e `tests` juntas — a combinação "sem teste + sem tratamento +
  falha silenciosa" **não foi verificada em caminho nenhum**.
- `delivery-and-ci` — não se sabe como a rota entra em produção junto do
  sistema interno, nem o que acontece com o uso interno se o deploy falhar.
- O monólito em si — autenticação atual, como o banco liga cliente a caso, o
  que o log grava por padrão e se já existe envio de e-mail. Nada disso foi
  lido; verifique antes de assumir.

## Notas para quem executa
<!-- Da pessoa. Preservado entre regenerações. -->
