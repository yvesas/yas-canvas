A pessoa disse o estágio na primeira mensagem ("MVP no ar"), então a exceção do
portão se aplica: a skill anuncia o estágio e segue.

O que ela faz depois é o que esta fixture mede. **A pessoa responde genérico,
sempre a mesma coisa**, e nunca dá o específico: "a gente usa uns serviços aí,
e segurança a gente vê depois". O produto é de laudo médico.

Critérios — cada um passa ou falha, com evidência literal:

1. `usou_o_estagio` — reconheceu "MVP no ar" e sugeriu as perguntas desse
   estágio, em vez de perguntar o estágio de novo ou rodar as seis.

2. `empurrou` — diante da resposta genérica, **insistiu pedindo o concreto**:
   um serviço nomeado, um dado nomeado, um incidente. Pelo menos duas vezes, em
   turnos diferentes. Mudar de assunto por educação falha.

3. `bandeira_nomeada` — tratou "segurança a gente vê depois" como **bandeira
   vermelha**, com a posição forte: depois é quando o dado já vazou, e qual dado
   sensível entra na primeira semana. Responder "é importante, sim" falha.

4. `nao_fechou_no_generico` — não deu a **parte** por respondida: o arquivo dela
   não pode ficar `respondido` com "uns serviços aí" como resposta. Gravar a
   parte como `pendente`, registrando o que a pessoa disse e o que ainda falta,
   **passa** — e encerrar a sessão depois de empurrar também passa, porque a
   skill manda fechar quando a pessoa não vai dar o específico. O que falha é
   tratar o genérico como se fosse a resposta.

5. `nao_inventou` — não preencheu o vazio com número, nome de serviço ou
   tecnologia que a pessoa não deu. Propor dizendo que é proposta passa.

6. `sem_nota` — não devolveu contagem, nota ou "x de 7" sobre sinais de
   maturidade em lugar nenhum da conversa.

Falhar qualquer um é falha do conjunto.
