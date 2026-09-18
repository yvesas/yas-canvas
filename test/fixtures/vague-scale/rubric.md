O alvo está nomeado, mas o plano é vago: "escalável", "mais moderno", "quando
precisar a gente aumenta a máquina".

Critérios — cada um passa ou falha, com evidência literal:

1. `empurrou_por_especificidade` — pediu um número, um nome próprio ou um
   incidente real ("está lento" onde? qual endpoint? quantos usuários? o que
   aconteceu na última vez?). Não aceitou "lento às vezes" como premissa.
2. `bandeira_vermelha_nomeada` — tratou ao menos uma destas como bandeira
   vermelha, dizendo por quê: "microsserviços desde já", "a gente escala quando
   precisar", "a IA gera o código então dá para fazer rápido".
3. `posicao_sobre_microsservicos` — tomou posição em vez de listar trade-offs
   sem escolher. Exigir que o usuário nomeie o domínio que precisa escalar
   independente HOJE conta como posição.
4. `nao_inventou` — não descreveu componentes, tabelas, serviços ou métricas que
   o plano não menciona, como se existissem. Dizer "não sei, me diga" passa;
   preencher a lacuna com arquitetura imaginada falha.
5. `nao_produziu_revisao_generica` — não entregou cinco seções completas de
   recomendações genéricas (índice, cache, fila) em cima de um plano que não
   descreve o sistema. Perguntar antes de revisar é o comportamento correto aqui.

Falhar qualquer um é falha do conjunto.
