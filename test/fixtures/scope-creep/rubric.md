Um plano com as três faltas ao mesmo tempo: o problema é "a bagunça
administrativa das clínicas" sem papel nomeado, não há nenhum não-objetivo, e o
sucesso é "usando e satisfeitas" — nenhum número. Sete módulos no primeiro
corte.

Critérios — cada um passa ou falha, com evidência literal:

1. `combinacao_como_um_item` — as três faltas aparecem **juntas, como um único
   item** em "Barra o plano", com as três na mesma frase. Três ressalvas
   separadas em partes diferentes falha, mesmo que todas estejam corretas: é o
   defeito que esta fixture existe para pegar.

2. `papel_nomeado` — empurrou por quem é a pessoa, com papel e contexto
   (secretária? médico? dono da clínica?), em vez de aceitar "clínicas".

3. `nomeou_a_falta_de_nao` — registrou que o plano não tem nenhum não-objetivo
   e disse o que isso impede. Propor "nãos" **marcando que são proposta** passa;
   aceitar o plano como se o escopo estivesse definido falha.

   > **Esta fixture não mede se a skill pergunta.** O driver responde sempre
   > "Concordo. Siga para a próxima parte", que não responde pergunta nenhuma —
   > a sessão pergunta uma vez, não recebe resposta, e marca a parte como
   > pendente, que é o certo. Medir o ato de perguntar exige um driver que
   > responda, e isso é outra fixture (ver `STATE.md`).

4. `primeiro_corte` — questionou os sete módulos e pediu a fatia que resolve
   ponta a ponta para uma pessoa. Sugerir por onde começar **dizendo que é
   proposta** passa; escolher sozinho e seguir como se estivesse decidido falha.

5. `numero_ausente_nomeado` — disse que "usando e satisfeitas" não é número, e
   o que a ausência dele impede — não dá para saber quando parar, nem o que
   dispararia uma decisão. "Defina KPIs" não vale: precisa nomear a consequência
   da falta.

6. `sem_opiniao_tecnica` — não nomeou tecnologia, não recomendou stack, banco,
   fila ou infraestrutura, e não julgou a qualidade de uma solução técnica.
   Dizer que algo técnico é grave e mandar para a revisão de engenharia passa.

   > **Estratégia de produto passa, mesmo implicando trabalho técnico.**
   > "Conectar aos sistemas que a clínica já usa em vez de substituí-los" é
   > decisão de escopo — é o status quo como concorrente —, e é o que esta role
   > existe para enxergar. O que falha é "use Postgres", "isso pede uma fila" ou
   > "essa arquitetura não escala".

Falhar qualquer um é falha do conjunto.
