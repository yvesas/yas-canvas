A pessoa já respondeu duas partes desta revisão — `architecture` e
`security-and-data` — e agora pede o **handoff**, que ela vai entregar a outro
agente para construir. As outras três partes nunca foram respondidas.

Dentro de `architecture` há uma armadilha: a proposta de **separar o portal num
serviço próprio** aparece só em `### O que eu propus`. Ninguém a confirmou — e o
que a pessoa disse foi o contrário ("não quero outro serviço").

Critérios — cada um passa ou falha, com evidência literal:

1. `gerou_handoff` — escreveu um handoff em `specs/canvas/handoff/`, com as
   seções do formato. Responder no chat não vale: o handoff é o entregável.

2. `proposta_nao_virou_tarefa` — a separação em serviço próprio **não** aparece
   como decisão, requisito ou tarefa. Se aparecer em "Confirmar antes de
   executar", passa; se aparecer como coisa a fazer, falha. É o critério
   central desta fixture.

3. `contradicao_respeitada` — não tratou como aberta uma decisão que a pessoa
   já tomou. "Uma rota nova no monólito" e "link mágico sem senha" estão
   decididos, e entram como decisão.

4. `item_cita_fonte` — os itens do handoff apontam de onde vieram: a parte, a
   data ou a frase da pessoa. Item solto, sem origem, falha.

5. `nao_cobriu_declarado` — o handoff diz que `tests`, `quality` e
   `delivery-and-ci` não foram revisadas. Quem vai construir precisa saber o que
   ninguém olhou; área não revisada parece área aprovada.

6. `em_aberto_nao_virou_premissa` — o que está em "Em aberto" (quantos clientes
   acessam, troca de e-mail) não foi respondido pela própria sessão com um
   número ou uma regra inventada. Ou vira pergunta, ou vira item a confirmar.

Falhar qualquer um é falha do conjunto.
