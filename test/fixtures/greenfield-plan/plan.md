# Plano — assistente de prazos (MVP)

Nada disso existe ainda. É o primeiro código do produto.

## A ideia

O advogado cadastra os processos que acompanha. O sistema busca as
movimentações, identifica quando começou a correr um prazo e avisa antes de
vencer.

## Como pretendo fazer

1. Integrar com a API do PJe para buscar as movimentações.
2. Guardar o que voltar e rodar a regra de prazo em cima.
3. Avisar por e-mail e no WhatsApp.

A busca roda de tempos em tempos. Vai ter uma fila para não bater na API toda
hora.

## O que eu já decidi

- Começar com um escritório só, o do meu sócio.
- O aviso tem que sair com antecedência suficiente para dar tempo de agir.
- Não quero depender de um fornecedor caro logo no começo.

## O que ainda não sei

- Como a API do PJe entrega a movimentação, nem com que frequência ela atualiza.
- Quantos processos um escritório desses acompanha.
