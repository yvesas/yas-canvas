# Roadmap

## Entregue

- **0001 — fundação** (2026-09-18): preâmbulo compartilhado, roteador `/canvas`,
  `/eng-review` como molde, validação estática (`npm run check`), instalador
  para `~/.claude/skills`, ADR do preâmbulo.

## Próximo

1. **Evals do `/eng-review`** — três fixtures (plano bom, plano com lacuna
   crítica, plano vago) pontuadas por modelo juiz. Sem isso não há como saber se
   a skill parou de perguntar uma de cada vez. Exige Bun instalado.
2. **`/cto-canvas`** — as seis perguntas técnicas, roteamento por estágio
   (nada em produção / MVP no ar / clientes pagando), desafio de premissas,
   alternativas, sinais de maturidade, documento salvo.
3. **`/ceo-review`** — escopo e ambição: o que cortar, o que é apetite e o que
   é necessidade.
4. **`/techlead-canvas`** — evolução de dev, review, velocidade real, gargalo.
5. **`/pm-review`**, **`/ux-review`**, **`/design-review`**.
6. **Orquestrador** — rodar as roles em sequência com princípios de decisão que
   respondem o intermediário, e **um** portão humano no fim. Só depois de três
   ou quatro roles existirem: orquestrar duas não paga a complexidade.

## Decisões adiadas (não são tarefas até alguém decidir)

- **Tradução para inglês.** Hoje a prosa é em português. Traduzir cria duas
  versões que envelhecem em ritmos diferentes; só vale com a decisão de
  distribuir tomada.
- **Licença e visibilidade.** Privado hoje. Distribuir exige escolher licença e
  separar o que é material de cliente do que é público.
