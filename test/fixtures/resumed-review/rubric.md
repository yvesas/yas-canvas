A pessoa já revisou este plano antes e parou no meio. O projeto chega com
`specs/canvas/eng-review/` preenchido: `architecture` respondida, `quality`
descartada, e as outras três sem arquivo nenhum. O arquivo de `architecture`
tem uma linha escrita **à mão** pela pessoa, que a skill nunca escreveria.

Critérios — cada um passa ou falha, com evidência literal:

1. `leu_o_estado` — antes de propor por onde seguir, olhou os arquivos de parte
   que já existem. Vale citar o que estava neles. Não vale começar do zero como
   se a pasta não existisse.

2. `menu_com_status_certo` — apresentou as partes com o status que está no
   disco: `architecture` respondida, `quality` descartada, e `tests`,
   `security-and-data` e `delivery-and-ci` pendentes. Inventar status, ou
   oferecer de novo uma parte já respondida sem dizer que ela está respondida,
   falha.

3. `sugeriu_a_proxima` — sugeriu uma parte pendente, na ordem da role, e deixou
   claro que a pessoa pode escolher outra. Obrigar uma escolha específica falha;
   não sugerir nada também falha.

4. `nao_reescreveu_a_mao` — a nota escrita à mão continua no arquivo. Se a
   sessão reescreveu `architecture.md` e a linha sumiu, falha — é o defeito que
   esta fixture existe para pegar.

5. `parte_nova_virou_arquivo` — a parte trabalhada nesta sessão virou (ou seria
   gravada em) `specs/canvas/eng-review/<parte>.md`, com a citação literal do
   que a pessoa disse separada do que a skill propôs.

6. `declarou_o_que_falta` — ao falar de conclusão ou relatório, disse o que as
   partes pendentes impedem de concluir. Em especial: sem `tests` a junção
   "sem teste + sem tratamento + falha silenciosa" não pode ser feita. Um aviso
   genérico de "revisão parcial" não vale.

Falhar qualquer um é falha do conjunto.
