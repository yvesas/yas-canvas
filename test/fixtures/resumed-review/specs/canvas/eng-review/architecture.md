---
role: eng-review
parte: architecture
status: respondido
alvo: plan.md
atualizado: 2026-09-18
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-18 — plan.md

### O que você disse
> "o cron roda de madrugada e chama o gateway uma vez por cliente, em sequência"

### O que eu propus
- Publicar uma mensagem por cliente e deixar o worker controlar a vazão, em vez
  de o cron segurar a sequência inteira.

### Em aberto
- Idempotência por chave própria do gateway — pergunta para o fornecedor.

MINHA NOTA À MÃO: o financeiro fecha o mês no dia 5, então cobrança atrasada
depois do dia 3 vira problema contábil, não só de produto.
