---
role: eng-review
parte: architecture
status: respondido
alvo: plan.md
atualizado: 2026-09-20
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-20 — plan.md

### O que você disse
> "o portal é uma rota nova no monólito que já existe, não quero outro serviço"
> "link mágico por e-mail, sem senha, isso está decidido"

### O que eu propus
- **Separar o portal num serviço próprio, com deploy independente.** O tráfego
  do cliente é imprevisível e o monólito interno não foi feito para ele; um
  serviço à parte isola a falha e deixa escalar só o que precisa.
- Cache de leitura na frente das consultas de fase e prazo.

### Em aberto
- Quantos clientes por escritório acessam ao mesmo tempo — sem isso não dá para
  dimensionar nada.
