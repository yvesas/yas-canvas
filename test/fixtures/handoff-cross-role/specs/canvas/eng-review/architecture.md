---
role: eng-review
parte: architecture
status: respondido
alvo: plan.md
atualizado: 2026-09-21
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-21 — plan.md

### O que você disse
> "a conciliação tem que ser idempotente, o banco reenvia confirmação"
> "o job do dia 5 roda uma vez por escola, isso está decidido"

### O que eu propus
- Guardar o identificador da cobrança do banco como chave única, para o reenvio
  não criar linha nova.

### Em aberto
- O que fazer quando o pagamento chega parcial.
