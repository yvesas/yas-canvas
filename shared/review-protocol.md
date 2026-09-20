# Protocolo de revisão — vale para toda role que revisa

> Lido pelas skills que revisam um plano, um diff ou um caminho: engenharia,
> CEO, produto, UX, design. **Não** vale para os canvas, que conduzem uma pessoa
> em vez de avaliar um artefato.
>
> Uma fonte só, como o preâmbulo. O que muda de role para role — preferências,
> instintos, as seções — mora na role. O que está aqui é o **formato de
> revisar**, e ele foi escrito a partir de defeito encontrado, não de teoria.

## 1. O portão de escopo mora na role, não aqui

Cada skill de revisão traz o portão **inline, no topo do próprio arquivo**, e é
de propósito: ele precisa disparar antes de qualquer leitura — inclusive a deste
arquivo. Uma regra que só existe depois de dois `Read` já perdeu a corrida que
ela existia para vencer.

É a única coisa repetida entre as roles, e a repetição é a decisão.

## 2. Em que mundo estou

Antes de qualquer seção, decida e diga em uma linha: **há código para ler, ou o
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

**Feche o escopo e comprometa-se.** Decidido aqui, não se rediscute nas seções
seguintes — revisão que reabre escopo a cada seção nunca termina.

## 3. Uma seção por vez

Sua role define quais são as seções. O formato é sempre o mesmo: uma seção, no
máximo **oito** problemas, e **pare para a resposta** antes da próxima.

Menos, e melhor, sempre. Oito problemas reais valem mais que trinta observações
— e o teto é o que força a escolha, que é o trabalho.

## 4. Alternativas (obrigatório, não opcional)

Antes de fechar, ponha **duas ou três abordagens** na mesa, sempre incluindo:

- a **mínima viável** — o menor caminho que resolve de verdade;
- a **ideal** — o que você faria sem restrição de prazo;

e, para cada uma: esforço (P/M/G/GG), risco, o que dá para reusar, e o que ela
custa daqui a um ano. Termine com a sua recomendação e **que evidência mudaria
sua opinião**.

Sem alternativas, a revisão vira aprovação com comentários — e ninguém aprende
o que foi descartado nem por quê.

## 5. O relatório

Escreva no arquivo do plano, ao final, uma seção `## RELATÓRIO DE REVISÃO`. Se
não houver arquivo de plano, crie `specs/quick/NNN-<role>-<slug>/review.md` — a
numeração e o lugar seguem `.claude/rules/docs-and-specs.md` do projeto.

Esta ordem, e ela não é decorativa: quem lê para agir lê de cima para baixo e
para quando acaba o tempo.

```
## RELATÓRIO DE REVISÃO
### Escopo revisado          uma linha; e se não havia código, o que ficou sem verificar
### Barra o plano            as lacunas críticas. Se não houver, escreva "nenhuma"
### Por seção                os demais problemas, na ordem das seções
### Alternativas             com a recomendação e o que mudaria sua opinião
### Adiado                   com o gatilho que cobra cada item
```

**"Barra o plano" é uma posição, não um adjetivo.** Toda lacuna crítica entra
ali, mesmo que você já a tenha descrito no meio de uma seção. Dizer "isto é o
topo" dentro de uma seção não a põe no topo; a lista põe. E se ela não aparece
nessa lista, ela não era crítica: escolha.

**Antes de escrever a lista, junte o que as seções separaram.** Uma lacuna
crítica quase nunca nasce inteira — revisar seção por seção é justamente o que
faz cada peça parecer um problema médio sozinha. Sua role define quais
combinações contam; percorra os itens e pergunte se dois ou três deles são, na
verdade, um só.

**Quando não havia código para ler, o relatório diz isso e nomeia o que ficou
sem verificação** — uma linha com os pontos concretos, não um aviso genérico de
que plano muda.

**E nada do que o plano não deu entra como fato.** Número, nome de tabela,
tecnologia, volume, frequência — e **o que o fornecedor devolve**: que campo
vem, em que formato, com que conteúdo. Ou o plano disse, ou você propõe dizendo
que é proposta ("sugiro X porque"), ou você pergunta. Afirmar como decidido o
que você mesmo supôs é o jeito mais rápido de a revisão perder a confiança de
quem a lê — e o mais difícil de a pessoa perceber, porque veio na sua voz.

Pergunte: **Aprovar · Revisar · Recomeçar**.

## 6. Autoverificação — a parte que é do formato

- [ ] O portão de escopo foi a primeira chamada de ferramenta?
- [ ] Disse em que mundo estava, e li o código real quando havia?
- [ ] Cada seção parou para resposta antes da seguinte?
- [ ] As alternativas incluem mínima viável **e** ideal, com esforço e risco?
- [ ] Toda lacuna crítica está na lista "Barra o plano" — e não apenas descrita
      no meio de uma seção?
- [ ] Dois achados de seções diferentes são, juntos, um só? Junte.
- [ ] Se não havia código, o relatório nomeia o que ficou sem verificação?
- [ ] Escrevi algum número, nome, tecnologia ou campo de payload que o plano
      não deu, como se fosse dele?
- [ ] Alguma recomendação ficou em cima do muro? Tome posição ou diga o que
      falta para decidir.
- [ ] O relatório foi salvo num arquivo, e não só respondido no chat?
