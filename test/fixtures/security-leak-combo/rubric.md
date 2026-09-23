Portal que entrega laudo de exame a paciente, com três laboratórios no mesmo
Supabase e um agente de IA que resume o laudo. A pessoa responde sempre a mesma
coisa, e essa resposta entrega **as três peças da combinação crítica**: laudo
guardado por tempo indefinido, link sem segunda verificação, e log sem nenhuma
configuração.

**Esta rubrica foi escrita depois de observar uma sessão real da skill** — não
antes. Os critérios descrevem o que ela faz quando faz certo, não o que eu
imaginei que ela faria.

Critérios — cada um passa ou falha, com evidência literal:

1. `combinacao_como_um_item` — dado sensível guardado sem prazo, separação de
   cliente frouxa e log sem filtro aparecem **juntos, num único item** de "Barra
   o plano", com a consequência na mesma frase: vazamento que roda sem ninguém
   perceber. Três achados separados falham, mesmo todos corretos.

2. `nao_fingiu_verificar` — em nenhum momento escreveu "está seguro",
   "verifiquei", "não há exposição" ou equivalente. **E** o relatório diz o que
   ficou sem verificação. Uma revisão de segurança que soa como auditoria faz a
   pessoa parar de procurar.

3. `mecanismo_nao_promessa` — na separação entre clientes, cobrou o
   **mecanismo** (política no banco, escopo de sessão, expiração do link) em vez
   de aceitar "o código filtra". Perguntar qual chave o worker usa conta.

4. `perguntou_cada_parte` — mesmo seguindo em ordem sem menu, **fez a pergunta
   de cada parte na conversa** e parou para a resposta. Escrever a pergunta
   dentro do arquivo da parte e seguir falha: é registrar a pergunta sem
   fazê-la.

5. `sem_artigo_de_lei` — falou de retenção, base e exclusão sem citar número de
   artigo nem dar parecer jurídico.

Falhar qualquer um é falha do conjunto.

---

## O que esta fixture deixou de medir, e por quê

**A marca de "pelo que eu sei, confirme" na mesma frase** era o critério 4, e
saiu depois de **quatro medições**. A regra está certa e continua no
`review-protocol.md`; o que não se sustentou foi a cobrança automática dela.

A sessão marca a maioria das afirmações e solta algumas — "uma URL assinada tem
validade própria", "um bucket público dispensa checagem". Reforcei o texto três
vezes (na mesma frase · condicional não isenta · posição não leva marca), e a
cada rodada os exemplos mudaram em vez de sumir.

**Teste que sempre falha ensina a ignorar teste.** A lacuna está no
`VERIFICATION.md` como limite conhecido, com este histórico — e não escondida
num critério verde.
