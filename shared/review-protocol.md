# Protocolo de revisão — vale para toda role que revisa

> Lido pelas skills que revisam um plano, um diff ou um caminho: engenharia,
> CEO, produto, UX, design. **Não** vale para os canvas, que conduzem uma pessoa
> em vez de avaliar um artefato.
>
> O que vale para qualquer sessão conduzida — o portão, as partes, o menu, onde
> gravar, as alternativas — está no `session-protocol.md`, e é lido junto com
> este. Aqui fica só o **formato de revisar**, escrito a partir de defeito
> encontrado, não de teoria.

## 1. Em que mundo estou

Antes de qualquer parte, decida e diga em uma linha: **há código para ler, ou o
alvo é um plano de algo que ainda não existe?** O teste é barato — existe
repositório? o plano cita arquivo que dá para abrir?

**Com código:** leia o que o plano toca antes de opinar. Opinar sem abrir o que
existe produz a revisão genérica que não muda nada. Mapeie cada pedaço ao que já
existe: o que dá para reusar, o que está sendo recriado por desconhecimento.

**Sem código:** o desafio de escopo não é pulado, troca de alvo. Confronte o
plano com o que ainda é verificável — o contrato do fornecedor que ele nomeia, o
formato do dado que entra, a restrição que o autor declarou, o que já existe em
outro projeto dele. E o que o autor **disse que não sabe** vira pergunta,
nunca premissa — inclusive o que a API dele devolve, campo a campo: arbitrar um
valor e revisar em cima dele é revisar o seu palpite, não o plano dele.

**Feche o escopo e comprometa-se.** Decidido aqui, não se rediscute nas partes
seguintes — revisão que reabre escopo a cada parte nunca termina.

## 2. O relatório

Grave em `specs/canvas/<role>/report-<alvo>.md`, com o título
`## RELATÓRIO DE REVISÃO`. **Não escreva no arquivo do plano:** ele é da pessoa,
e o relatório é seu — misturar os dois faz a próxima revisão reescrever o plano
de alguém.

Esta ordem, e ela não é decorativa: quem lê para agir lê de cima para baixo e
para quando acaba o tempo.

```
## RELATÓRIO DE REVISÃO
### Escopo revisado          o que foi revisado, o que faltou e o que a falta impede
### Barra o plano            as lacunas críticas. Se não houver, escreva "nenhuma"
### Por parte                os demais problemas, na ordem das partes
### Alternativas             com a recomendação e o que mudaria sua opinião
### Adiado                   com o gatilho que cobra cada item
```

**"Barra o plano" é uma posição, não um adjetivo.** Toda lacuna crítica entra
ali, mesmo que você já a tenha descrito no meio de uma parte. Dizer "isto é o
topo" dentro de uma parte não a põe no topo; a lista põe. E se ela não aparece
nessa lista, ela não era crítica: escolha.

**Antes de escrever a lista, junte o que as partes separaram.** Uma lacuna
crítica quase nunca nasce inteira — revisar parte por parte é justamente o que
faz cada peça parecer um problema médio sozinha. Sua role define quais
combinações contam; percorra os itens e pergunte se dois ou três deles são, na
verdade, um só.

**Quando não havia código para ler, o relatório diz isso e nomeia o que ficou
sem verificação** — uma linha com os pontos concretos, não um aviso genérico de
que plano muda.

**E quando faltam partes, o relatório diz o que não pôde concluir.** Uma linha
por parte pendente, com o que a ausência dela impede — não "revisão parcial",
que não ajuda ninguém.

O caso que mais importa é a junção das lacunas críticas: ela precisa das partes
que a compõem, e com duas das três **a junção não pode ser feita**. Escreva
isso com essas palavras. Relatório de meia revisão com cara de revisão inteira é
pior que relatório nenhum, porque quem lê para de procurar.

**E nada do que o plano não deu entra como fato.** Número, nome de tabela,
tecnologia, volume, frequência — e **o que o fornecedor devolve**: que campo
vem, em que formato, com que conteúdo.

**Inclusive o que você sabe do mundo.** Como um sistema público funciona, o que
a lei exige, que cada tribunal roda a própria instância: pode estar certo e
ainda assim não ser fato sobre o sistema **dela**. Vai com "pelo que eu sei,
confirme" — a versão da sua cabeça pode estar velha, e ela é quem tem como
checar. Ou o plano disse, ou você propõe dizendo
que é proposta ("sugiro X porque"), ou você pergunta. Afirmar como decidido o
que você mesmo supôs é o jeito mais rápido de a revisão perder a confiança de
quem a lê — e o mais difícil de a pessoa perceber, porque veio na sua voz.

Pergunte: **Aprovar · Revisar · Recomeçar**.

## 3. O handoff

Aqui acaba o seu trabalho. O handoff é o documento que a pessoa entrega a quem
vai construir: outro agente, outro editor, um dev da equipe.

**No fechamento de toda sessão que respondeu ao menos uma parte, leia o
`handoff.md` que está ao lado deste arquivo e siga o que ele diz.** Ele tem
como montar, o formato e a regra que mais importa — proposta que ninguém
confirmou **não** vira tarefa, vai para "Confirmar antes de executar".

Ele não é lido no começo da sessão de propósito: o formato dele importa uma vez,
no fim, e o que é lido em todo turno precisa caber numa resposta.

## 4. Autoverificação — a parte que é da revisão

- [ ] Disse em que mundo estava, e li o código real quando havia?
- [ ] Toda lacuna crítica está na lista "Barra o plano" — e não apenas descrita
      no meio de uma parte?
- [ ] Dois achados de partes diferentes são, juntos, um só? Junte.
- [ ] Se não havia código, o relatório nomeia o que ficou sem verificação?
- [ ] Se faltaram partes, o relatório nomeia o que elas impedem de concluir?
- [ ] Escrevi algum número, nome, tecnologia ou campo de payload que o plano
      não deu, como se fosse dele?
- [ ] O relatório foi salvo num arquivo, e não só respondido no chat?
- [ ] O handoff foi gerado, e cada item dele cita a parte e a frase que o
      autoriza?
- [ ] Alguma proposta minha, que ninguém confirmou, virou tarefa no handoff?
      Ela vai para "Confirmar antes de executar".
