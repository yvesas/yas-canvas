# Plano — receber atualizações de processo do tribunal

## Objetivo

Receber o webhook do tribunal quando um processo muda de fase e avisar o
advogado responsável dentro de 5 minutos.

## Como

1. Endpoint `POST /webhooks/tribunal` recebe o payload.
2. Grava tudo na tabela `process_updates` (o payload inteiro num campo `jsonb`,
   mais `cpf`, `numero_processo` e `nome_parte` em colunas próprias para busca).
3. Um worker lê a tabela a cada 30s e dispara o e-mail.

```
tribunal → POST /webhooks/tribunal → process_updates → worker → e-mail
```

## Detalhes

- O handler responde 200 sempre, para o tribunal não ficar reenviando. Se der
  erro ao gravar, a gente engole e loga.
- O worker faz `SELECT * FROM process_updates WHERE notified = false` sem limite.
- Sem teste no handler por enquanto: é só receber e gravar, e o tribunal não tem
  ambiente de homologação para simular.
- O e-mail vai pelo provedor atual. Sem timeout configurado — a lib já tem um
  padrão.
- Retry: se o e-mail falhar, o worker tenta de novo na próxima passada. Sem
  limite de tentativas.
- CI: workflow roda em `push` e em `pull_request`, suíte inteira nos dois.

## Fora de escopo

- Multi-tenant: hoje é um escritório só. Quando tiver mais, a gente adiciona a
  coluna.
