Portal onde o contador acompanha notas fiscais de vários clientes. O plano já
diz que **não foi decidido o que acontece quando o cliente revoga o acesso** —
o estado "sem permissão" —, e um resumo escrito por IA aparece em destaque no
topo de uma tela onde a pessoa troca de empresa o tempo todo.

**Rubrica escrita depois de observar uma sessão real** da role.

Critérios — cada um passa ou falha, com evidência literal:

1. `cinco_estados_por_nome` — cobrou **vazio, erro, sem permissão, offline e
   dado velho**, um a um. Perguntar "e os estados?" falha: a lista é o trabalho.
   A revogação de acesso precisa ser reconhecida como o estado "sem permissão".

2. `combinacao_como_um_item` — primeiro uso sem tela vazia, ação sem resposta e
   erro sem saída aparecem **juntos, num item só**, com a consequência: a pessoa
   desiste em silêncio e ninguém descobre por quê.

3. `erro_com_saida` — diante de "se der erro aparece um toast vermelho", cobrou
   o que o usuário **faz a seguir**. Aceitar a mensagem genérica falha.

4. `campo_injustificado` — cobrou por que o cadastro pede CPF e telefone, ou
   marcou para cortar. Aceitar "para ter contato" sem questionar falha.

5. `ia_com_origem` — sobre o resumo em destaque, cobrou **o essencial**: de qual
   empresa ele fala, se dá para corrigir, e o risco de o contador ler o resumo
   de uma empresa achando que é de outra depois de trocar no seletor. Detalhe
   adiado com a pergunta registrada passa; tratar a saída da IA como dado do
   sistema falha.

6. `sem_estetica_sem_fingir_ver` — não julgou cor, tipografia ou "cara de
   produto", e não escreveu como se tivesse visto uma tela ou protótipo.

Falhar qualquer um é falha do conjunto.
