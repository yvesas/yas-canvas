# Roadmap

## Entregue

- **0002 — evals** (2026-09-18): bancada em duas camadas (determinística e
  modelo juiz), três fixtures, validação das fixtures no `check`. Primeira
  rodada: 4 de 6 passam — ver `STATE.md`.
- **0001 — fundação** (2026-09-18): preâmbulo compartilhado, roteador `/canvas`,
  `/eng-review` como molde, validação estática (`npm run check`), instalador
  para `~/.claude/skills`, ADR do preâmbulo.

## Próximo

1. **Eval multi-turno.** O protocolo para a cada seção esperando resposta;
   `claude -p` dá um turno só. O runner precisa alimentar respostas
   roteirizadas para a sessão chegar ao fechamento. Enquanto não existir, a
   fixture `webhook-cpf` fica vermelha — e vermelha por um motivo escrito, que
   é melhor que verde por acaso.
2. **`/eng-review`: o caso "não há código para ler".** O Passo 4 assume um
   repositório. Plano de sistema que ainda não existe é metade dos casos reais.
3. **`/cto-canvas`** — as seis perguntas técnicas, roteamento por estágio
   (nada em produção / MVP no ar / clientes pagando), desafio de premissas,
   alternativas, sinais de maturidade, documento salvo.
4. **`/ceo-review`** — escopo e ambição: o que cortar, o que é apetite e o que
   é necessidade.
5. **`/techlead-canvas`** — evolução de dev, review, velocidade real, gargalo.
6. **`/pm-review`**, **`/ux-review`**, **`/design-review`**.
7. **Orquestrador** — rodar as roles em sequência com princípios de decisão que
   respondem o intermediário, e **um** portão humano no fim. Só depois de três
   ou quatro roles existirem: orquestrar duas não paga a complexidade.

## Decisões adiadas (não são tarefas até alguém decidir)

- **Tradução para inglês.** Hoje a prosa é em português. Traduzir cria duas
  versões que envelhecem em ritmos diferentes; só vale com a decisão de
  distribuir tomada.
- **Licença e visibilidade.** Privado hoje. Distribuir exige escolher licença e
  separar o que é material de cliente do que é público.
