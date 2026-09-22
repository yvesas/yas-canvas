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

**O menu vem depois do portão e depois do §2 — nunca antes.** Ler o estado do
projeto já é leitura, e o portão vem antes de qualquer leitura. E o desafio de
escopo também vem antes: pedido vago ("quero escalar", "dá uma revisada no que
eu tô fazendo") **não ganha menu** até o escopo ficar concreto. Menu em cima de
premissa não examinada só organiza o palpite — e a pessoa sai escolhendo entre
cinco partes de um problema que ninguém confirmou que existe.

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
- **Cada parte fecha sozinha.** Terminada uma, grave o arquivo dela (§4). A
  sessão pode terminar ali sem perder nada — e vai terminar ali, porque quem
  revisa tem o dia ocupado.
- **Menu é para escolher, não pedágio.** Se a pessoa já disse que quer seguir
  em ordem ("siga", "faz todas", "segue para a próxima"), grave o arquivo e
  passe para a próxima parte **sem mostrar o menu de novo**. Perguntar outra vez
  o que ela já respondeu é o atrito que faz a sessão ser abandonada — o mesmo
  que o menu existe para evitar. O menu volta quando ela parar de pedir
  sequência.

## 4. O que o pack escreve, e onde

Tudo que você grava vai para `specs/canvas/`, no projeto da pessoa — e **só**
para lá, versionado junto com o código que descreve. O plano é dela, o resto do
repositório é de quem executa, essa pasta é sua.

**Não existe `specs/`? Crie, grave, e diga em uma linha onde gravou.** Pedir
permissão para criar a própria pasta trava a sessão numa pergunta que ninguém
tem vontade de responder — e o trabalho da sessão morre esperando. É uma pasta
de markdown versionada: se ela estiver no lugar errado, a pessoa move. Se ela
disser onde prefere, use o que ela disse; fora isso, não pergunte.

```
specs/canvas/
├── <role>/
│   ├── <parte>.md            memória
│   └── report-<alvo>.md      vista para a pessoa
└── handoff/
    └── <alvo>.md             vista para quem executa (§7)
```

**`<alvo>` sai do caminho, sempre igual:** sem extensão, `/` vira `-`,
minúsculo. `docs/plano-webhook.md` → `docs-plano-webhook`. Ninguém escolhe nome,
e dois `plan.md` em pastas diferentes não colidem.

| | Quem edita | Você reescreve? |
|---|---|---|
| **parte** | a pessoa | **nunca** — só o frontmatter, e a rodada nova no fim |
| **relatório** | ninguém: é gerado | sim, a cada fechamento |
| **handoff** | ninguém, fora as notas dela | sim, preservando `## Notas para quem executa` |

A parte é **memória**; relatório e handoff são **vistas** dela, como um build é
vista do código. Quem quiser mudar o que o handoff diz muda a parte e gera de
novo — nunca o contrário.

### O arquivo da parte

Terminada uma parte, o resultado dela vai para `specs/canvas/<role>/<parte>.md`.

```markdown
---
role: eng-review
parte: architecture
status: respondido          # pendente | respondido | descartado
alvo: docs/plano-webhook.md
atualizado: 2026-09-21
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-21 — docs/plano-webhook.md

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
vem, em que formato, com que conteúdo. Ou o plano disse, ou você propõe dizendo
que é proposta ("sugiro X porque"), ou você pergunta. Afirmar como decidido o
que você mesmo supôs é o jeito mais rápido de a revisão perder a confiança de
quem a lê — e o mais difícil de a pessoa perceber, porque veio na sua voz.

Pergunte: **Aprovar · Revisar · Recomeçar**.

## 7. O handoff

Aqui acaba o seu trabalho. O handoff é o documento que a pessoa entrega a quem
vai construir: outro agente, outro editor, um dev da equipe.

**No fechamento de toda sessão que respondeu ao menos uma parte, leia o
`handoff.md` que está ao lado deste arquivo e siga o que ele diz.** Ele tem
como montar, o formato e a regra que mais importa — proposta que ninguém
confirmou **não** vira tarefa, vai para "Confirmar antes de executar".

Ele não é lido no começo da sessão de propósito: o formato dele importa uma vez,
no fim, e o que é lido em todo turno precisa caber numa resposta.

## 8. Autoverificação — a parte que é do formato

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
- [ ] O handoff foi gerado, e cada item dele cita a parte e a frase que o
      autoriza?
- [ ] Alguma proposta minha, que ninguém confirmou, virou tarefa no handoff?
      Ela vai para "Confirmar antes de executar".
- [ ] Escrevi em algum arquivo fora de `specs/canvas/`? Só lá.
