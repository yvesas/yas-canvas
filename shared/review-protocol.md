# Protocolo de revisão — vale para toda role que revisa

> Lido pelas skills que revisam um plano, um diff ou um caminho: engenharia,
> CEO, produto, UX, design. **Não** vale para os canvas, que conduzem uma pessoa
> em vez de avaliar um artefato.
>
> Uma fonte só, como o preâmbulo. O que muda de role para role — preferências,
> instintos, as partes — mora na role. O que está aqui é o **formato de
> revisar**, e ele foi escrito a partir de defeito encontrado, não de teoria.

## 1. O portão de escopo mora na role, não aqui

Cada skill de revisão traz o portão **inline, no topo do próprio arquivo**, e é
de propósito: ele precisa disparar antes de qualquer leitura — inclusive a deste
arquivo. Uma regra que só existe depois de dois `Read` já perdeu a corrida que
ela existia para vencer.

É a única coisa repetida entre as roles, e a repetição é a decisão.

## 2. Em que mundo estou

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

## 3. Uma parte por vez, e quem escolhe é a pessoa

Sua role define quais são as **partes** e em que ordem elas fazem sentido. O
formato de cada uma é sempre o mesmo: no máximo **oito** problemas, e **pare
para a resposta** antes da próxima.

Menos, e melhor, sempre. Oito problemas reais valem mais que trinta observações
— e o teto é o que força a escolha, que é o trabalho.

**Depois do portão — nunca antes — apresente o menu.** Ler o estado do projeto
já é leitura, e o portão vem antes de qualquer leitura.

```
Onde você quer trabalhar? (sugiro `quality` — é a próxima na ordem)

  ✓ architecture        respondido, 21/09
  → quality             pendente
    tests               pendente — sem ela não dá para fechar a lacuna crítica
    security-and-data   pendente — é aqui que mora o que barra o plano
    delivery-and-ci     pendente
```

- **Sugira a próxima na ordem da sua role, e aceite qualquer outra** — sem
  discutir a escolha e sem repetir a sugestão. A ordem existe porque uma parte
  dá vocabulário à seguinte, não para prender ninguém.
- **Parte pendente que impede uma conclusão carrega a frase do que ela impede.**
  Sem isso o menu vira bufê: todo mundo escolhe arquitetura e ninguém escolhe
  dado sensível, que é justamente onde mora o que barra o plano.
- **Cada parte fecha sozinha.** Terminada uma, grave o arquivo dela (§4) e
  ofereça o menu de novo. A sessão pode terminar ali sem perder nada — e vai
  terminar ali, porque quem revisa tem o dia ocupado.

## 4. O arquivo da parte

Terminada uma parte, o resultado dela vai para
`specs/canvas/<role>/<parte>.md`, **no projeto da pessoa** — versionado junto
com o código que descreve. Se o projeto não tiver `specs/`, pergunte **uma vez**
onde gravar; não invente estrutura no repositório de ninguém.

```markdown
---
role: eng-review
parte: architecture
status: respondido          # pendente | respondido | descartado
alvo: specs/features/0004-webhook/plan.md
atualizado: 2026-09-21
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-21 — specs/features/0004-webhook/plan.md

### O que você disse
> citação literal, e só isso

### O que eu propus
…

### Em aberto
- pergunta que ficou sem resposta
```

**A separação é o título, não a prosa.** `### O que você disse` só recebe
citação literal; `### O que eu propus` recebe tudo que saiu de você. Quem lê
esse arquivo depois — outra role, ou você mesmo daqui a um mês — é um modelo, e
modelo que precisa inferir pela linguagem o que era proposta acaba tratando
proposta como decisão tomada.

**Os três títulos estão sempre lá, mesmo vazios.** Quando a pessoa não disse
nada sobre a parte além de "pode seguir", escreva exatamente isso sob
`### O que você disse` — nunca omita o título. Título ausente é ambíguo: quem lê
não sabe se a pessoa ficou calada ou se a skill esqueceu, e passa a tratar tudo
que está no arquivo como se tivesse vindo dela.

**Nunca reescreva o corpo.** Leia o arquivo, reescreva **só o bloco de
frontmatter**, e **acrescente** a rodada nova ao final. Não existe operação que
apague texto, e é por isso que não é preciso detectar se alguém editou à mão —
editar é esperado. Atropelar a edição de alguém uma vez faz com que ninguém
edite de novo, e aí a pasta vira saída de robô que todo mundo ignora.

**Se a rodada nova contradiz uma anterior, diga isso na rodada nova.** Duas
rodadas paradas lado a lado, discordando em silêncio, é pior que nenhuma.

## 5. Alternativas (obrigatório, não opcional)

Antes de fechar, ponha **duas ou três abordagens** na mesa, sempre incluindo:

- a **mínima viável** — o menor caminho que resolve de verdade;
- a **ideal** — o que você faria sem restrição de prazo;

e, para cada uma: esforço (P/M/G/GG), risco, o que dá para reusar, e o que ela
custa daqui a um ano. Termine com a sua recomendação e **que evidência mudaria
sua opinião**.

Sem alternativas, a revisão vira aprovação com comentários — e ninguém aprende
o que foi descartado nem por quê.

## 6. O relatório

Escreva no arquivo do plano, ao final, uma seção `## RELATÓRIO DE REVISÃO`. Se
não houver arquivo de plano, crie `specs/quick/NNN-<role>-<slug>/review.md` — a
numeração e o lugar seguem `.claude/rules/docs-and-specs.md` do projeto.

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
vem, em que formato, com que conteúdo. Ou o plano disse, ou você propõe dizendo
que é proposta ("sugiro X porque"), ou você pergunta. Afirmar como decidido o
que você mesmo supôs é o jeito mais rápido de a revisão perder a confiança de
quem a lê — e o mais difícil de a pessoa perceber, porque veio na sua voz.

Pergunte: **Aprovar · Revisar · Recomeçar**.

## 7. Autoverificação — a parte que é do formato

- [ ] O portão de escopo foi a primeira chamada de ferramenta?
- [ ] Disse em que mundo estava, e li o código real quando havia?
- [ ] Cada parte parou para resposta antes da seguinte?
- [ ] As alternativas incluem mínima viável **e** ideal, com esforço e risco?
- [ ] Toda lacuna crítica está na lista "Barra o plano" — e não apenas descrita
      no meio de uma parte?
- [ ] Dois achados de partes diferentes são, juntos, um só? Junte.
- [ ] Se não havia código, o relatório nomeia o que ficou sem verificação?
- [ ] Escrevi algum número, nome, tecnologia ou campo de payload que o plano
      não deu, como se fosse dele?
- [ ] Alguma recomendação ficou em cima do muro? Tome posição ou diga o que
      falta para decidir.
- [ ] O relatório foi salvo num arquivo, e não só respondido no chat?
- [ ] Cada parte terminada virou arquivo em `specs/canvas/<role>/`, com os três
      títulos presentes — inclusive `### O que você disse` quando ela só disse
      "pode seguir"?
- [ ] Escrevi por cima do corpo de algum arquivo que já existia? Nunca.
- [ ] Se faltaram partes, o relatório nomeia o que elas impedem de concluir?
