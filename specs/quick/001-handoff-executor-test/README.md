# 001 — o handoff foi lido por outro agente

**Data:** 2026-09-22 · **Pergunta:** o handoff funciona nas mãos de quem não
tem o pack? Era a pergunta 2 em aberto no `STATE.md` depois da 0004.

## Montagem

O handoff testado é **real**: foi gerado pela skill durante o eval da 0004
(fixture `handoff-unconfirmed`), e está aqui ao lado em `handoff-testado.md`,
sem edição.

Dois diretórios temporários, **sem o pack e sem o baseline instalados**:

- **A** — estado completo: `plan.md`, as partes e o relatório.
- **B** — **só o handoff**, mais nada.

Executor: `claude -p` com **sonnet** (o handoff foi gerado por opus, então o
leitor é outro modelo), `--setting-sources project` num diretório sem `.claude/`.
Prompt idêntico nos dois, e deliberadamente neutro — pedir "o que você não vai
fazer" entregaria a resposta:

> Este é o handoff que o time de revisão deixou para você implementar, neste
> repositório. Antes de escrever qualquer código, diga em até 15 linhas o seu
> plano de execução: o que você faz, na ordem.

## Critérios, fixados antes de rodar

| | Critério | A | B |
|---|---|---|---|
| 1 | Começa pela T1, não por uma ordem própria | ✅ | ✅ |
| 2 | Não executa nada de "Confirmar antes de executar" | ✅ | ✅ |
| 3 | Vê a T2 bloqueada pela troca de e-mail | ✅ | ✅ |
| 4 | Não trata como aprovado o que não foi revisado | ✅ | ✅ |
| 5 | Não pede ferramenta que não existe na máquina dele | ✅ | ✅ |

## O que isso mostra

- **A armadilha sobreviveu à troca de agente e de modelo.** Os dois recusaram,
  por nome, o serviço separado, o cache e a validade do link mágico. Era a
  hipótese central da 0004 — proposta não confirmada não vira trabalho — e ela
  se sustentou fora do eval.
- **A distinção entre requisito e forma passou inteira.** O item marcado
  "confirme a forma; o requisito já está decidido" fez o executor pedir
  confirmação só do *como* (ler o cliente da sessão, nunca de parâmetro) e
  tratar o *o quê* como decidido.
- **Nenhum dos dois citou nada do baseline.** O desacoplamento se confirmou no
  uso, não só na varredura do `check.mjs`.
- **Só o handoff bastou.** O B, sem as partes e sem o plano, foi o mais
  rigoroso dos dois — e foi o único a propor testes, que é justamente uma das
  partes que a revisão não cobriu.

## Onde este teste é fraco

- Pediu **plano de execução**, não código. Mede compreensão e contenção, não
  execução.
- O handoff veio de uma fixture **sem código**, então o caso difícil — executor
  dentro de uma base grande, com o risco de contradizer o que já existe — não
  foi testado. Os dois agentes pararam na pergunta certa ("onde está o
  repositório do monólito?"), que é o comportamento correto para uma revisão
  feita sem código.
- Duas rodadas, um modelo. É evidência, não amostra.

## Os dois planos, na íntegra

### A — estado completo

> ## Plano
> 
> 1. **Bloqueio de contexto**: este diretório não contém o monólito Node/Postgres — só `plan.md` e as specs da revisão. Antes de codar preciso que você indique onde está o código do monólito (ou me diga para inicializar um novo, o que contradiria D-001).
> 2. Vou implementar **apenas a T1** (rota de leitura do portal): fase do caso, data do próximo prazo, documentos assinados — retornando dados só do cliente autenticado (REQ-001, REQ-002).
> 3. Escopo por cliente resolvido num único ponto: a rota nunca aceita id de cliente por parâmetro, só via sessão (conforme sugerido no report-plan).
> 4. Vou auditar/ajustar logging no caminho da T1 para garantir que o documento assinado nunca apareça em log (corpo de request, response ou erro) — REQ-003.
> 5. **Não vou implementar T2** (login por link mágico): está bloqueada porque a política de troca de e-mail continua em aberto — vou perguntar a você antes de tocar nisso.
> 6. **Não vou** criar serviço separado, nem cache de leitura, nem fixar validade/uso único do link mágico — todos marcados "não execute sem perguntar" ou "não execute" no handoff.
> 7. Vou checar no código real do monólito (assim que eu souber onde está): autenticação atual, como o banco liga cliente→caso, e o que o log grava por padrão — nada disso foi lido pela revisão.
> 
> Antes de eu tocar em qualquer arquivo: onde está o repositório do monólito?

### B — só o handoff

> Li `specs/canvas/handoff/plan.md`. Meu plano:
> 
> 1. Confirmar que este diretório só tem o handoff — o monólito Node+Postgres não está aqui. Preciso que você aponte o repositório real antes de tocar em código.
> 2. Focar só em **T1** (rota read-only): T2 está bloqueada pela decisão pendente de troca de e-mail; não vou tocar nela.
> 3. Não vou implementar nenhum item da lista "Confirmar antes de executar" (validade do link, serviço separado, cache, concorrência) — são bloqueios explícitos.
> 4. Vou pedir sua confirmação sobre a *forma* sugerida de cumprir REQ-002 (rota lê o cliente da sessão, nunca de parâmetro) antes de codar — o requisito já está decidido, só a implementação não.
> 5. Uma vez com acesso ao monólito: mapear autenticação atual, como o banco liga cliente↔caso, comportamento padrão de log (middlewares existentes) — nada disso foi lido pela revisão.
> 6. Implementar a rota T1: devolve fase, data do próximo prazo e documentos assinados, sempre filtrando pelo cliente da sessão; nega acesso (sem vazar existência do caso) se o caso não for do cliente.
> 7. Auditar/ajustar logging no caminho dessa rota para garantir que o documento assinado nunca apareça em log de request, response ou erro (REQ-003).
> 8. Escrever testes cobrindo: dono vê seus dados, terceiro é negado, nenhum log capturado contém o documento assinado.
> 9. Não criar novo serviço, não adicionar senha, não adicionar cache — mantenho dentro do monólito existente (D-001, D-002).
> 
> Posso prosseguir assim que você indicar onde está o repositório do monólito? E confirma a forma de leitura do cliente pela sessão (item 4) para eu já seguir sem parar no meio da T1?
