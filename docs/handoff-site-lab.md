# Handoff para o site — o yas-canvas no `yaslab.io/lab`

> Texto-fonte para a sessão do repositório `site` montar o card do yas-canvas,
> no mesmo formato do Niklas e do Audova (texto curto no card, detalhe num
> `<details>`). Escrito em 2026-11-04 e atualizado com a `v0.2.0`, publicada no
> mesmo dia.
> **Só fato verificável:** cada número abaixo sai de um comando ou arquivo deste
> repositório, e a última seção diz de onde.

## O que muda em relação aos outros dois cards

O Niklas e o Audova são código privado; o máximo que oferecem é "posso mostrar
em conversa". **O yas-canvas é o único projeto do /lab que a pessoa pode pegar e
usar**: público, licença MIT. O fechamento do card é **instalar**, com link para
o GitHub — e não a conversa de 30 minutos, que continua no fechamento da página.

Recomendação: **o card de skills que já abre o /lab vira este card.** O texto
que está lá hoje ("organizar o código em camadas…") descreve o baseline de
convenções, que é outro repositório; o selo "em breve" sai. O mesmo selo aparece
em `bio.skills` e precisa mudar junto.

## Card

- **Tag:** `SKILLS · CÓDIGO ABERTO`
- **Estado:** no ar (D-LAB-004 do site).
- **Título:** yas-canvas
- **Texto:** Oito skills de método para o Claude Code. Cada uma é um papel —
  produto, CEO, engenharia, segurança, UX, fundador, CTO — que conduz uma
  conversa até aparecer um nome próprio, um número ou um caso real, e termina
  num documento que você entrega a quem vai construir. Nenhuma delas escreve
  código: elas decidem antes.
- **Stack:** Markdown · Claude Code Skills · Node.js (bancada) · avaliação com
  modelo juiz
- **Link:** `Baixar a v0.2.0 ↗` → `https://github.com/yvesas/yas-canvas/releases/latest`
  (a release tem o zip do pack, o zip de cada skill para o app do Claude e o
  `.md` portátil). Link secundário, se couber: `Ver no GitHub` →
  `https://github.com/yvesas/yas-canvas`.
- **Nota:** Público, licença MIT. Feito para o Claude Code; roda também no app
  do Claude.

**Painel de demonstração** (ilustrativo, como o do Niklas — não é transcrição de
sessão real):

```
> /founder-canvas
? Em que estágio está o produto:
  ideia, protótipo, primeiros clientes ou primeira receita?
— protótipo no Lovable, três nutricionistas testando
? Qual foi a última vez que uma delas reclamou
  disso? O que ela disse, com as palavras dela?
✓ specs/canvas/founder-canvas/problem-and-pains.md
```

## Detalhe (`<details>`)

**Abertura:**

- A regra que decide o projeto: o pack é estratégico; o operacional é de quem
  executa. Nenhuma skill commita, abre PR ou publica. O que sai é um handoff, e
  a skill para.
- Em desenvolvimento desde setembro de 2026, público desde o início.

### A pergunta de cada skill

| Skill | Pergunta |
|---|---|
| `/founder-canvas` | o produto tem base: problema, público, valor, métrica? |
| `/pm-review` | você sabe o suficiente para decidir? |
| `/ceo-review` | devia ser construído assim, deste tamanho, agora? |
| `/eng-review` | está bem construído? |
| `/security-review` | e quando vaza, é atacado ou cai? |
| `/ux-review` | e fora do caminho feliz? |
| `/cto-canvas` | onde você está, e qual a próxima decisão? |
| `/canvas` | roteia, e diz onde você parou |

As revisões avaliam um plano escrito; os canvas estruturam a pessoa. Se há um
documento para ler, é revisão; se o que existe está na cabeça, é canvas.

### Em números

- 8 skills: cinco revisões, dois canvas e um roteador
- 29 entregas na `main`, todas por pull request
- 12 especificações de feature e 6 ADRs (registros de decisão de arquitetura)
- 17 cenários de avaliação conduzidos por turnos, julgados por um segundo modelo
- Nenhuma skill passa de 200 linhas; o teto é 400

### Conceitos aplicados

- **A fronteira é um documento.** A sessão termina num handoff — decisões,
  requisitos, restrições, tarefas — que serve a qualquer ferramenta de quem
  executa. Proposta que a pessoa não confirmou não vira tarefa.
- **O que você disse × o que a skill propôs.** Cada parte da conversa vira um
  arquivo com três títulos fixos, e o que a pessoa falou fica só como citação
  literal. Quem lê depois é outro modelo, e modelo que precisa adivinhar pela
  prosa trata palpite como decisão.
- **O estágio calibra a profundidade.** Ideia, protótipo, primeiros clientes,
  primeira receita: a primeira pergunta é sempre essa, e o que é prematuro para
  o momento é dito, não cobrado.
- **Fato × hipótese.** Número sem fonte leva a marca `(hipótese)` e a próxima
  pergunta é de onde ele veio.
- **Alternativas obrigatórias.** A mínima viável e a ideal, com esforço e risco.
  Revisão sem alternativa é aprovação com comentários.
- **Sessão e revisão são dois protocolos.** Conduzir uma pessoa e avaliar um
  artefato têm regras diferentes, e cada skill declara qual usa.
- **Prompt testado como código.** Cada comportamento prometido tem um cenário
  que conversa com a skill turno a turno e um modelo juiz que confere a
  rubrica. O que está escrito e ainda não foi medido fica listado, com o
  comando que mediria.

### O que o projeto ensinou

- **Teste verde não viu o que a primeira pessoa viu.** Um bloco de código mal
  fechado apagou, por seis semanas, o formato que os canvas gravam. Treze
  cenários passaram, porque o modelo deduzia o formato. A primeira sessão com
  um fundador achou — e a verificação estática passou a recusar o defeito.
- **Critério que passa por sorte parece critério que passa.** Uma regra que o
  teste cobrava nunca tinha sido escrita na skill; passava quando o modelo
  inferia.
- **Regra nova atropela regra antiga.** Três vezes num dia o defeito eram duas
  regras brigando, não uma faltando. Antes de acrescentar uma regra, relê-se a
  vizinha.
- **Quem responde por áudio responde em bloco.** "Uma pergunta por vez" virou
  "até duas, do mesmo assunto", porque a resposta longa costuma cobrir as duas.

### Status

Sete skills medidas pela bancada de avaliação; a oitava, `/founder-canvas`, está
escrita e em validação com fundadores. Primeira release, `v0.2.0`, publicada em
4 de novembro de 2026, com download para o Claude Code, para o app do Claude e
uma versão portátil para outras IAs, ainda não testada nelas.

## O que não afirmar

- Que as skills **funcionam em outras IAs**: a versão portátil existe, mas não
  foi testada em nenhuma. O que se pode dizer: "uma versão portátil para colar
  em outra IA". O app do Claude aceita o zip (conferido na central de ajuda em
  4/11), sem medição do pack lá.
- Que foram **validadas com fundadores**: houve uma sessão, em que a skill foi
  usada como roteiro e não invocada. "Em validação" é o termo honesto.
- Que existe **canvas de tech lead** ou **revisão de design visual**: as duas
  estão bloqueadas por falta de conteúdo autoral.
- Número de usuários, instalações ou estrelas: não há medição.
- Nenhuma menção a serviço pago dentro do card. O pack é o degrau gratuito; a
  ponte para a consultoria é o fechamento da página, que já existe.

## Pendências que afetam o card

- **Nas três línguas:** a prosa das skills é só em português. O card em inglês
  e espanhol precisa dizer isso, para ninguém instalar esperando outra língua.

## De onde vem cada número (conferido em 2026-11-04)

| Número | Comando |
|---|---|
| 8 skills | `ls skills` |
| 29 entregas | `gh pr list --state merged -L 200 --json number \| jq length` |
| 12 specs, 6 ADRs | `ls specs/features`, `ls docs/adr` |
| 17 cenários | `ls test/fixtures` |
| maior skill: 193 linhas | `wc -l skills/*/SKILL.md` |
| início em setembro | `git log --reverse --format=%ad --date=short \| head -1` → 2026-09-18 |
