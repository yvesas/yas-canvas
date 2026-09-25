# Começando

Guia de quem nunca rodou nenhuma destas skills. Ao final você terá uma revisão
completa de um plano seu, gravada no seu projeto, e um handoff para entregar a
quem vai construir.

Leva de quinze a quarenta minutos, e **dá para parar no meio** — cada parte fecha
sozinha.

## Antes

Você precisa de:

- **[Claude Code](https://claude.com/claude-code) instalado** e funcionando.
- **Algo para revisar**: um plano, um design doc, um diff de branch, ou só o
  problema na sua cabeça. Não precisa estar bem escrito — o protocolo existe
  justamente para empurrar até ficar específico.

Você **não** precisa de: projeto em produção, time, ou repositório. As skills
funcionam numa conversa com quem ainda não escreveu uma linha.

## 1. Instalar

```bash
git clone https://github.com/yvesas/yas-canvas.git
cd yas-canvas
bin/install
```

O instalador copia cada skill para `~/.claude/skills/<nome>/`, junto com os
arquivos de protocolo que aquela skill declara precisar. Ele valida tudo antes
de escrever: skill quebrada instalada é pior que skill não instalada, porque só
falha na sua frente, no meio de uma sessão.

Saída esperada:

```
yas-canvas → /Users/voce/.claude/skills

  + canvas/SKILL.md
  + canvas/preamble.md
  ...

✓ 30 arquivo(s) instalados · 0 já estavam em dia
  Abra uma sessão nova do Claude Code para as skills aparecerem.
```

Quer ver o que mudaria sem escrever nada: `bin/install --check`. Quer as skills
só dentro de um repositório, em vez de para o seu usuário:
`bin/install --project ../algum-repo`.

**Abra uma sessão nova do Claude Code.** Skill instalada no meio de uma sessão
não aparece nela.

### Não apareceu?

- **Sessão nova mesmo** — sair e entrar, não `/clear`.
- **Você usa `CLAUDE_CONFIG_DIR`?** O instalador escreve em `~/.claude/skills`,
  que é onde o Claude Code procura por padrão. Se a sua configuração mora em
  outro lugar, copie a pasta para `$CLAUDE_CONFIG_DIR/skills` ou instale com
  `--project` no repositório onde você vai trabalhar.
- **Confira que chegou**: `ls ~/.claude/skills` deve listar as sete pastas.

## 2. Escolher a skill

Se você sabe qual quer, invoque direto: `/eng-review`. Se não sabe, invoque
`/canvas` e descreva o problema em uma frase — ele diz onde você parou e manda
para a role certa.

A pergunta que separa uma role da outra é o critério, não o assunto:

| Você está pensando… | Skill |
|---|---|
| "isso está bem construído?" | `/eng-review` |
| "isso é grande demais? o que eu corto?" | `/ceo-review` |
| "e quando vazar, cair ou alguém atacar?" | `/security-review` |
| "será que alguém quer isso? como eu valido?" | `/pm-review` |
| "por que ninguém termina o cadastro?" | `/ux-review` |
| "por onde eu começo? me ajuda a estruturar a técnica" | `/cto-canvas` |

**Uma de cada vez.** Duas roles no mesmo alvo somam no mesmo handoff, mas rodadas
juntas viram uma mistura morna das duas — cada uma tem o seu portão de escopo.

## 3. A sessão, passo a passo

O exemplo é uma `/eng-review`, mas a forma vale para todas.

### O portão de escopo vem antes de qualquer leitura

A primeira coisa que a skill faz — antes de ler o seu código, antes de rodar
`git`, antes de ler os próprios arquivos de protocolo — é perguntar o que
revisar:

```
> O que eu reviso? RECOMENDAÇÃO: A — existe diff na branch.

  A) O diff da branch atual — o trabalho em andamento.
  B) Um plano ou design doc que você cola ou aponta.
  C) Um arquivo, pasta ou caminho específico.
```

É uma parada dura, e é de propósito: revisar a coisa errada com competência é
pior do que não revisar. **Se você já nomeou o alvo** ao invocar
(`/eng-review docs/plano-webhook.md`), ela usa o que você nomeou e avisa em uma
linha.

Pedido vago não passa direto. "Dá uma revisada no que eu tô fazendo" ganha um
desafio de escopo antes de qualquer outra coisa — organizar um palpite em cinco
partes só deixa o palpite mais arrumado.

### O menu: você escolhe a parte

Concreto o escopo, ela mostra as partes da role e sugere a próxima:

```
Onde você quer trabalhar? (sugiro `architecture` — é a primeira na ordem)

  → architecture        pendente
    quality             pendente
    tests               pendente — sem ela não dá para fechar a lacuna crítica
    security-and-data   pendente — é aqui que mora o que barra o plano
    delivery-and-ci     pendente
```

Escolha qualquer uma; a ordem existe porque uma parte dá vocabulário à seguinte,
não para prender ninguém. **Parte que impede uma conclusão diz o que ela
impede** — é o que evita que todo mundo escolha arquitetura e ninguém escolha
dado sensível.

Se você não quer escolher toda vez, diga "siga" ou "faz todas": o menu some e ela
segue na ordem. As **perguntas continuam** — o que você dispensou foi escolher a
parte, não respondê-las.

### Uma parte por vez, com teto

Dentro de cada parte: no máximo **oito** problemas, cada um com o trade-off
concreto e uma recomendação tomada. O teto é o que força a escolha — oito
problemas reais valem mais que trinta observações.

Ela pergunta uma coisa por vez e **espera**. Quando a resposta for genérica, ela
empurra: o protocolo cobra um nome próprio, um número, um incidente que
aconteceu. Quando ela propuser algo, o texto separa o que é proposta dela do que
é fato seu — e o que ela não pôde verificar sai marcado, não afirmado.

Antes de fechar a parte vêm as **alternativas**, que são obrigatórias: a mínima
viável e a ideal, com esforço, risco, o que dá para reusar e o que cada uma custa
daqui a um ano. Fecha com a recomendação dela e **que evidência mudaria essa
opinião**. Revisão sem alternativa é aprovação com comentários.

### A parte vira arquivo

Terminada a parte, ela grava e diz onde gravou. Aí você pode parar: a sessão
seguinte começa de onde esta terminou, e quem lê `/canvas` vê o que falta.

### O fechamento

Quando você encerra, sai o relatório (escopo revisado · **barra o plano** ·
por parte · alternativas · adiado), o handoff, e três coisas nesta ordem: duas ou
três **citações literais** do que você disse, **uma** tarefa concreta para esta
semana, e o status (`PRONTO`, `PRONTO_COM_RESSALVAS`, `BLOQUEADO`,
`FALTA_CONTEXTO`).

Uma tarefa quer dizer uma. Duas viram nenhuma, porque a gente escolhe a mais
fácil e esquece a que importava.

## O que aparece no seu projeto

Tudo que uma skill grava vai para `specs/canvas/`, e só para lá. Se a pasta não
existir, ela cria e avisa em uma linha.

```
specs/canvas/
├── eng-review/
│   ├── architecture.md          o que ficou decidido naquela parte
│   ├── security-and-data.md
│   └── report-docs-plano-webhook.md     a vista para você
└── handoff/
    └── docs-plano-webhook.md            a vista para quem executa
```

O nome do alvo sai do caminho, sempre igual: sem extensão, `/` vira `-`,
minúsculo. `docs/plano-webhook.md` vira `docs-plano-webhook`. Ninguém escolhe
nome, e dois `plan.md` em pastas diferentes não colidem.

**Versione essa pasta junto com o código.** É a memória da decisão; daqui a três
meses ela é a única coisa que explica por que o sistema é assim.

### Quem edita o quê

| | Quem edita | A skill reescreve? |
|---|---|---|
| **parte** (`<role>/<parte>.md`) | você | **nunca** — só o frontmatter, e acrescenta a rodada nova no fim |
| **relatório** (`report-<alvo>.md`) | ninguém: é gerado | sim, a cada fechamento |
| **handoff** (`handoff/<alvo>.md`) | ninguém, fora as suas notas | sim, preservando `## Notas para quem executa` |

A parte é **memória**; relatório e handoff são **vistas** dela, como um build é
vista do código. Para mudar o que o handoff diz, edite a parte e gere de novo —
nunca o contrário.

Dentro do arquivo de parte, três títulos fixos, e a separação é o ponto todo:
`### O que você disse` · `### O que eu propus` · `### Em aberto`. O que é seu
fica separado do que ela propôs **pelo título**, não pela prosa.

## O handoff, e por que ele para aí

O handoff é o documento que você entrega a quem vai construir — outro agente,
outro editor, um dev do time. Ele não presume ferramenta nenhuma instalada na
máquina de ninguém.

Cada item dele cita a fonte: a parte, a data e a frase que o autoriza. E a regra
que faz ele valer alguma coisa:

- o que **você disse**, ou o que ela propôs **e você confirmou**, vira decisão,
  requisito, restrição ou tarefa;
- o que ela propôs e **você não confirmou** vai para **"Confirmar antes de
  executar"**;
- parte pendente, descartada ou que nunca rodou vai para **"O que esta revisão
  não cobriu"**.

Uma proposta da skill implementada como se fosse decisão sua é um palpite virando
código em produção, e daqui a três meses ninguém lembra de onde ele saiu.

**Daí para a frente é com você e com o seu repositório.** Escrever o código,
commitar, abrir PR, publicar, seguir a convenção da casa: nenhuma skill daqui faz
isso, e não é limitação — é a fronteira que faz o método funcionar em qualquer
projeto, com qualquer ferramenta.

## Voltando depois

Invoque `/canvas`. Ele lê só o frontmatter do que está em `specs/canvas/` e diz
em uma ou duas linhas o que já foi respondido, o que falta e o que a falta
impede:

```
eng-review    ✓ architecture   → quality, tests, security-and-data pendentes
handoff       docs-plano-webhook.md, gerado 22/09 — 2 partes fora
```

Ele não escreve nada, de propósito: o material das roles é delas.

## Perguntas que aparecem

**Ela pode mexer no meu código?** Não. As skills gravam em `specs/canvas/` e em
nenhum outro lugar. Leem o que você apontou — e as de revisão leem `git log`,
`git diff` e arquivos, para saber do que estão falando.

**Editei um arquivo de parte à mão. Perdi?** Não. A skill nunca reescreve o
corpo do que já está lá; ela acrescenta a rodada nova no fim.

**A sessão ficou longa e eu parei no meio.** É o esperado. Cada parte fecha
sozinha, e o que você respondeu já está em arquivo.

**Ela discordou de mim.** É o trabalho dela. O protocolo proíbe concordar por
educação e exige tomar posição — e exige também dizer que evidência mudaria a
opinião dela. Se a evidência existe, mostre.

**Como desinstalo?** `rm -rf ~/.claude/skills/<nome>` para uma, ou apague as sete
pastas. O que as sessões gravaram no seu projeto continua lá: é seu.

## Onde continuar

- [`specs/project/PROJECT.md`](../specs/project/PROJECT.md) — a visão e os
  princípios: por que especificidade é a moeda, e por que a sessão termina em
  documento.
- [`docs/adr/`](adr/) — as decisões estruturais, uma por arquivo. A 0003 (a
  fronteira é um documento) e a 0005 (sessão e revisão são dois protocolos) são
  as que mais explicam o formato.
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — se você vai mexer no pack.
