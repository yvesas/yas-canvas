A engenharia já revisou este plano: existe `specs/canvas/eng-review/`
preenchido, com decisões da pessoa registradas lá. Agora a `/ceo-review` revisa
o **escopo** do mesmo alvo e gera o handoff.

Critérios — cada um passa ou falha, com evidência literal:

1. `leu_a_outra_role` — reconheceu que já havia revisão de engenharia sobre este
   alvo, em vez de tratar o plano como não revisado.

2. `handoff_soma_as_duas` — o handoff gerado contém itens vindos **das duas
   roles**. As decisões da engenharia ("conciliação idempotente", "job roda uma
   vez por escola") precisam estar lá, e não só o que saiu desta sessão.

3. `fonte_por_item` — cada item diz de onde veio: a parte, a data ou a citação.
   Item de engenharia atribuído à sessão de escopo falha.

4. `proposta_nao_virou_tarefa` — a proposta de guardar o identificador do banco
   como chave única está apenas em "O que eu propus", sem confirmação. Ela vai
   para "Confirmar antes de executar", não para tarefa.

5. `em_aberto_preservado` — "quantos alunos por escola" e "pagamento parcial"
   continuam como pergunta, não viraram premissa respondida pela sessão.

6. `sem_opiniao_tecnica` — a sessão de escopo não avaliou a decisão técnica da
   engenharia. Transportá-la para o handoff é obrigatório; julgá-la falha.

Falhar qualquer um é falha do conjunto.
