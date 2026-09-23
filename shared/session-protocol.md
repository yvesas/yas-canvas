# Protocolo de sessão — vale para toda skill que conduz uma conversa

> Lido por toda skill que conduz alguém: as roles de revisão e os canvas. O que
> está aqui não depende de **o que** a sessão faz — é onde o pack escreve, como
> uma parte fecha, como o menu funciona e por que alternativas são obrigatórias.
>
> Uma fonte só, como o preâmbulo. O que é de revisar um artefato está no
> `review-protocol.md`; o que é do papel, na skill.

## 1. O portão mora na skill, não aqui

Cada skill traz o seu portão **inline, no topo do próprio arquivo**, e é
de propósito: ele precisa disparar antes de qualquer leitura — inclusive a deste
arquivo. Uma regra que só existe depois de dois `Read` já perdeu a corrida que
ela existia para vencer.

É a única coisa repetida entre as skills, e a repetição é a decisão.
O portão de uma revisão pergunta o **escopo**; o de um canvas, o
**estágio** — o que não muda é ele vir antes de tudo.

## 2. Uma parte por vez, e quem escolhe é a pessoa

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

## 3. O que o pack escreve, e onde

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

## 4. Alternativas (obrigatório, não opcional)

Antes de fechar, ponha **duas ou três abordagens** na mesa, sempre incluindo:

- a **mínima viável** — o menor caminho que resolve de verdade;
- a **ideal** — o que você faria sem restrição de prazo;

e, para cada uma: esforço (P/M/G/GG), risco, o que dá para reusar, e o que ela
custa daqui a um ano. Termine com a sua recomendação e **que evidência mudaria
sua opinião**.

Sem alternativas, a revisão vira aprovação com comentários — e ninguém aprende
o que foi descartado nem por quê.

## 5. Autoverificação — a parte que é da sessão

- [ ] O portão foi a primeira chamada de ferramenta?
- [ ] Cada parte parou para resposta antes da seguinte?
- [ ] As alternativas incluem mínima viável **e** ideal, com esforço e risco?
- [ ] Cada parte terminada virou arquivo em `specs/canvas/<role>/`, com os três
      títulos presentes — inclusive `### O que você disse` quando ela só disse
      "pode seguir"?
- [ ] Escrevi por cima do corpo de algum arquivo que já existia? Nunca.
- [ ] Escrevi em algum arquivo fora de `specs/canvas/`? Só lá.
- [ ] Alguma recomendação ficou em cima do muro? Tome posição ou diga o que
      falta para decidir.
