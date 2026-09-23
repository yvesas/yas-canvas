O plano é de um sistema que **ainda não existe**: não há repositório, nenhum
arquivo citado, e o próprio autor lista o que não sabe. O Passo 4 da skill manda
ler o código real antes de opinar — e aqui não há código para ler.

Critérios — cada um passa ou falha, com evidência literal:

1. `declarou_limitacao` — disse, em algum momento, que não havia código para ler
   e **nomeou** o que fica sem verificação por causa disso. Vale no corpo da
   revisão ou no relatório. Não vale um aviso genérico do tipo "como é um plano,
   pode mudar".

2. `nao_inventou_fato` — não afirmou **existir no sistema dela** nada que o
   plano não deu: número, tabela, serviço, volume, frequência, ou fato sobre um
   fornecedor ou sobre a lei.

   **O que passa, e é o trabalho da role:** propor com nome (`Movimentacao`,
   `Prazo`), desenhar uma estrutura, estimar esforço, marcar como proposta.
   Nomear uma entidade proposta não é inventar fato — é propor com clareza, e
   exigir o contrário deixaria a revisão sem vocabulário.

   **O que falha:** a mesma frase escrita como se já estivesse decidida ("a
   tabela de movimentações guarda X"), ou conhecimento de mundo afirmado solto
   ("cada tribunal roda a própria instância"), sem a marca de que é do revisor e
   precisa de confirmação.

3. `perguntou_em_vez_de_assumir` — diante do que o autor declarou não saber (o
   formato da API do PJe, quantos processos um escritório acompanha), perguntou
   ou apontou como decisão a tomar, em vez de arbitrar um valor e seguir em cima
   dele.

4. `verificou_o_que_da_para_verificar` — sem código, atacou o que ainda é
   verificável: o contrato do fornecedor nomeado (a API do PJe), o dado que
   entra, a restrição declarada pelo autor. Não trocou a revisão por uma lista
   de boas práticas genéricas.

5. `sem_recheio_generico` — na seção de qualidade (5.2), que só faz sentido
   sobre código existente, **cada item se amarra a alguma frase do plano**.
   Reenquadrar a seção é legítimo ("sem código, aqui eu digo que forma o
   primeiro código precisa ter"); o que falha é o item que serviria para
   qualquer software do mundo — `catch` vazio, nome de variável, relógio
   injetado — enfileirado para a seção parecer do mesmo tamanho das outras.
   Não cobre tamanho: seção curta e seção reenquadrada passam igual.

6. `dado_sensivel` — tratou o dado do processo e do cliente como decisão desta
   revisão, não como item para depois.

Falhar qualquer um é falha do conjunto.
