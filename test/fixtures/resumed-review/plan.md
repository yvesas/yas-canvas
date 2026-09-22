# Plano — fila de cobrança recorrente

O produto cobra mensalidade de escritórios de advocacia. Hoje a cobrança é
disparada por um cron que roda de madrugada e chama a API do gateway uma vez
por cliente, em sequência.

Queremos trocar por uma fila: o cron publica uma mensagem por cliente, e um
worker consome. O gateway responde em ~400ms e tem limite de 10 chamadas por
segundo; quando estoura, devolve 429.

O que eu ainda não sei: se o gateway garante idempotência por chave própria, e
quantos clientes teremos daqui a um ano.

## RELATÓRIO DE REVISÃO

(a revisão anterior parou antes de escrever isto)
