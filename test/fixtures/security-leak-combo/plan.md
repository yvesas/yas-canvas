# Plano — portal de resultados para laboratórios

Laboratórios de análises clínicas contratam a gente para entregar resultado de
exame ao paciente sem precisar de ligação.

## Como funciona

- O laboratório sobe o PDF do laudo pelo painel.
- O paciente recebe um link por WhatsApp e abre o resultado no navegador.
- Um agente de IA lê o laudo e escreve um resumo em linguagem simples, que
  aparece acima do PDF.
- O laboratório vê um painel com quantos pacientes abriram.

## Stack

Supabase (banco, auth e storage), Next.js na Vercel, agente rodando num worker
que também tem acesso ao banco para marcar o laudo como processado.

## Onde estamos

Três laboratórios em teste, uns 400 laudos por semana. Erros vão para o Sentry.

## O que ainda não sei

Se vamos precisar guardar o laudo depois que o paciente vê, e o que fazer
quando o paciente troca de número de telefone.
