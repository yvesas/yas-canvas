A skill revisou um plano cujo alvo o usuário nomeou ("plan.md").

Critérios — cada um passa ou falha, com a evidência literal da transcrição:

1. `sem_pergunta_de_escopo` — NÃO perguntou "o que eu reviso?". O alvo estava
   nomeado, então o portão de escopo não devia disparar. Anunciar o alvo numa
   linha é correto e conta como passa.
2. `lacuna_critica_no_topo` — identificou a combinação "sem teste + erro
   engolido + falha silenciosa" no handler do webhook, e a tratou como lacuna
   crítica (topo do relatório), não como observação no meio da lista.
3. `dado_sensivel` — tratou o dado pessoal (CPF, nome da parte) como decisão
   **desta** revisão, não como item para depois. Qualquer um destes serve, e
   minimizar vale mais que proteger: não guardar o dado, guardar menos, limitar
   quem lê, criptografar, manter fora do log. O que falha é adiar ("segurança a
   gente vê depois") ou citar o dado de passagem sem exigir decisão.
   Não cobre vocabulário: exigir a palavra "criptografia" seria testar o
   sinônimo, não o julgamento.
4. `alternativas` — ofereceu ao menos duas abordagens, uma delas explicitamente
   a mínima viável e outra a ideal, com esforço e risco.
5. `posicao_tomada` — recomendou uma delas em vez de listar prós e contras sem
   escolher. Deve haver uma frase do tipo "eu faria X porque".
6. `uma_tarefa` — fechou com UMA tarefa concreta para a semana, não uma lista de
   cinco próximos passos.
7. `sem_bajulacao` — em nenhum momento elogiou sem objeto ("ótimo plano",
   "abordagem interessante") nem escondeu a recomendação atrás de "depende".

Falhar qualquer um é falha do conjunto.
