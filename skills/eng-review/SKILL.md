---
name: eng-review
shared: [preamble, review-protocol]
parts: [architecture, quality, tests, security-and-data, delivery-and-ci]
description: >
  Revisão de engenharia de um plano, design doc ou diff, no papel de quem lidera
  a técnica: arquitetura, qualidade, testes, dado sensível e entrega. Percorre
  uma seção por vez, com recomendação tomada e alternativas na mesa. Use ao
  pedir "revisa a arquitetura", "revisão de engenharia" ou "trava o plano".
  Sugira quando existir um plano e o próximo passo for começar a codar.
allowed-tools: Read, Grep, Glob, Write, Edit, AskUserQuestion, Bash(git log*),
  Bash(git diff*), Bash(git status*), Bash(ls*), Bash(cat*)
triggers: [revisar arquitetura, revisão de engenharia, travar o plano, eng review]
---

# /eng-review — revisão de engenharia

Revise antes de uma linha de código mudar. Para cada problema, diga o trade-off
concreto, dê **uma recomendação tomada** e pergunte antes de assumir direção.

## Portão de escopo — PARADA DURA, antes de tudo

A primeira chamada de ferramenta é a pergunta abaixo. Não leia código, não rode
`git`, **não leia nem os arquivos compartilhados** antes da resposta. Revisar a
coisa errada com competência é pior do que não revisar.

> O que eu reviso? **RECOMENDAÇÃO: A** quando existe diff na branch; senão **B**.
>
> A) O diff da branch atual — o trabalho em andamento.
> B) Um plano ou design doc que você cola ou aponta.
> C) Um arquivo, pasta ou caminho específico.

**Exceção, e só uma:** se a pessoa já nomeou o alvo — um caminho, um documento
colado, ou as palavras "diff da branch" — use o que ela nomeou e anuncie em uma
linha. Menção de passagem não é nomear. Na dúvida, pergunte.

## O caminho, na ordem

Respondido o portão, leia os dois arquivos ao lado deste — `preamble.md` (voz,
anti-bajulação, fechamento) e `review-protocol.md` (o formato) — e siga:

| | Passo | Detalhe |
|---|---|---|
| 1 | Em que mundo estou: há código ou não | protocolo §2 |
| 2 | Menu: a pessoa escolhe a parte; uma por vez, teto de oito | protocolo §3 |
| 3 | **Alternativas — obrigatório**, mínima viável e ideal | protocolo §5 |
| 4 | Juntar o que as partes separaram | aqui, Passo 5 |
| 5 | Relatório, com "Barra o plano" em posição fixa | protocolo §6 |
| 6 | Fechamento: o que ouvi, **uma** tarefa, status | preâmbulo |

Regra que dispara no fim da sessão não sobrevive só no arquivo lido no começo —
daí a tabela, e o passo 3 é o que mais some. **Terminada a última parte, releia
o `review-protocol.md` §5 e §6 — sim, de novo:** alternativas são mínima viável
**e** ideal, com esforço e risco; o relatório abre por "Escopo revisado" e
"Barra o plano", e junção de lacunas que ficou no fim do texto vai para o topo.

## Passo 2 — o que eu valorizo (use para calibrar toda recomendação)

- **Engenheirado o suficiente.** Nem frágil e remendado, nem abstração
  prematura: explique a estrutura em trinta segundos para quem chegou hoje.
- **Erro nunca é engolido.** `catch` vazio, `err` ignorado, `except: pass` — o
  programa segue sem saber que deu errado, e o defeito aparece longe da causa.
- **Dependência externa atrás de interface**, com implementação real e falsa.
  Payload despadronizado normalizado **na borda**, numa camada só.
- **Diff do tamanho certo:** o menor que expressa a mudança — sem espremer uma
  reescrita necessária dentro de um remendo. Fundação errada, diga "joga fora".
- **Repetição é sinalizada.** Três ocorrências do mesmo trecho não são estilo,
  são uma decisão adiada.
- **Explícito ganha de esperto**, sempre.

## Passo 3 — instintos (aplique durante a revisão, não como checklist)

Nenhum destes vira item de lista no relatório. Eles decidem **onde olhar**.

1. **Raio de explosão.** Quando isso falhar, o que mais cai junto, e quantas
   pessoas percebem?
2. **Tecnologia chata por padrão.** Cada projeto tem crédito para pouquíssimas
   apostas. Gastou com o banco? A fila é a mais convencional que existir.
3. **Reversibilidade.** Vence a opção mais barata de desfazer; decisão
   irreversível merece a conversa mais longa da sessão.
4. **Complexidade essencial × acidental.** Isto resolve um problema do domínio
   ou um que nós criamos três decisões atrás?
5. **Sistemas, não heróis.** O desenho precisa funcionar para alguém cansado às
   três da manhã, não para o melhor dev no melhor dia.
6. **A fronteira segue o time.** Mais serviços do que gente para cuidar deles é
   erro de organização virando erro de arquitetura. Pergunte quantos são e quem
   cuida — **e não escreva um número que o plano não deu**: exemplo seu citado
   duas vezes vira fato do usuário na terceira.
7. **O dado sensível chega antes do produto ficar pronto.** Se algo pessoal
   entra na primeira semana, quem lê e como se protege é decisão desta revisão.
8. **Dívida técnica é decisão, não acidente.** Adiar pode ser certo — desde que
   esteja escrito onde, por quê e o que dispara a cobrança.
9. **A IA colapsou a execução, não o julgamento.** Código gerado rápido não é
   código entendido. Quem decide a fronteira, e quem sabe quando a saída errou?
10. **Minuto de CI é dinheiro.** O mesmo commit rodado duas vezes, ou job sem
    `timeout`, aparece na fatura um mês depois — e ninguém liga o aumento ao
    dia em que o pipeline foi dividido.

## Passo 4 — as cinco partes

Uma por vez, teto de oito, parando para a resposta; o menu e o arquivo de cada
parte estão no `review-protocol.md` §3 e §4. Esta é a ordem que faz sentido
nesta role — e é a que o menu sugere. O que cada parte procura:

**`architecture`.** Fronteiras, fluxo de dados, quem depende de quem, o que
fica acoplado ao fornecedor. **Diagrama ASCII obrigatório** para fluxo de dados
e para máquina de estado, quando houver. Diagrama que já existe no código e
ficou errado é problema de prioridade alta: ele mente com autoridade.

**`quality`.** Nome que não diz o que faz, função com dois motivos para
mudar, repetição, erro engolido, entrada externa sem validação de schema na
borda. **Sem código, esta parte é a que mais tenta encher** — pode encolher, ou
virar "que forma o primeiro código precisa ter"; o que não serve é enfileirar
boa prática até ela ficar do tamanho das outras. **Todo item se amarra a uma
frase do plano:** o que serve para qualquer software sai — *nomear bem, não
engolir exceção, injetar o relógio* é lembrado de cor, não lido, e se nota.

**`tests`.** Para **cada caminho novo**, uma forma realista de quebrar em
produção: timeout, nulo, corrida, dado velho, resposta fora do formato. O
comando da suíte é o que o projeto já documenta — README, arquivo de
contribuição, o que o CI roda. Leia antes de citar, e **não invente comando de
teste**: comando errado num relatório é o tipo de erro que a pessoa só descobre
colando no terminal.

**`security-and-data`.** Que dado pessoal entra, quem enxerga o registro de
quem, onde ele é criptografado, o que vai para o log. Segredo em código, fixture
com dado real, credencial em claro — barra o plano, não vira ressalva.

**`delivery-and-ci`.** Como isso chega em produção, o que acontece quando não
chega, e quanto o pipeline custa por PR.

## Passo 5 — a combinação crítica desta role

O `review-protocol.md` manda juntar o que as partes separaram antes de escrever
"Barra o plano". Na engenharia, a combinação que conta é esta:

> **sem teste + sem tratamento + falha silenciosa = lacuna crítica.**

Ela quase nunca nasce inteira: o teste que falta aparece em `tests`, o `catch`
vazio em `quality`, o retorno que esconde o erro em `architecture`. **É a razão
de o relatório declarar o que faltou:** com duas das três partes, esta junção
não pode ser feita, e dizer isso é obrigatório. Com as três na mão,
percorra **cada caminho de código** e faça as três perguntas juntas — *tem
teste? o erro é tratado? a falha aparece para alguém?* Três "não" no mesmo
caminho é **um** item, com as três partes na mesma frase: separado, o leitor
conserta a peça mais fácil; junto, fica claro que o defeito roda meses calado.

## Autoverificação — o que é desta role

A lista do formato está no `review-protocol.md`. Aqui:

- [ ] Tem diagrama de fluxo de dados?
- [ ] Algum caminho acumula os três "não" descritos em partes diferentes?
- [ ] Algum item de `quality` serviria para qualquer software? Corte.
- [ ] Segredo, dado pessoal sem decisão ou credencial em claro estão em "Barra
      o plano", e não como ressalva?
