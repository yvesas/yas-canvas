# ADR 0003 — A fronteira é um documento: o handoff

**Data:** 2026-09-22 · **Status:** aceito

## Contexto

O pack nasceu ao lado de um baseline de convenções privado, instalado nos mesmos
repositórios. Era natural — e errado — que as skills apontassem para as
ferramentas dele: "quando chegar nesse ponto, mande para `/commit`, `/pr` e as
regras do baseline".

Quando o repositório virou público, isso quebrou de um jeito silencioso: quem
instala o pack sem o baseline recebe instruções para comandos, pastas e regras
que não existem na máquina dele. Não dá erro; a pessoa conclui que instalou
errado. Eram **nove pontos**, em duas classes: os que mandam usar uma ferramenta
e os que presumem a estrutura de pastas do baseline — estes últimos fazendo a
skill criar pasta no repositório de alguém.

A causa não estava nas skills. Estava na **golden rule** deste repositório, que
mandava apontar para `/commit` e `/pr`, e numa lista de exceções do
`check.mjs` que liberava exatamente esses nomes.

## Decisão

**O yas-canvas é estratégico; o operacional é de quem executa.** O pack entende,
desafia, decide e escreve. Construir, commitar, publicar é de quem recebe, com
as ferramentas do repositório dele.

A fronteira entre os dois é um **documento**, não uma referência: o
**handoff** (`specs/canvas/handoff/<alvo>.md`), que a pessoa entrega a quem vai
construir — outro agente, outro editor, um dev do time.

Disso decorrem três regras:

1. **Nada que viaja cita o que só existe aqui.** Nem comando, nem pasta de
   configuração, nem regra pelo nome. O `npm run check` falha se `shared/` ou
   `skills/` citarem, com o arquivo e o trecho na mensagem.
2. **O pack só escreve em `specs/canvas/`.** O resto do repositório é da pessoa
   e de quem executa.
3. **Proposta que ninguém confirmou não vira tarefa no handoff.** Ela vai para
   "Confirmar antes de executar".

## Por quê

- **Um documento funciona em qualquer máquina.** Uma referência só funciona
  onde o alvo dela está instalado — e o pack é distribuído justamente para
  máquinas que ninguém conhece.
- **A regra 3 é a que impede o dano.** Quem lê o relatório decide; quem lê o
  handoff **executa**. Uma proposta da skill implementada como se fosse decisão
  da pessoa é palpite virando código em produção, e três meses depois ninguém
  lembra de onde saiu.
- **Trocar `/commit` por "o fluxo de commit do repositório dele" não bastava.**
  Continuaria sendo o pack apontando para fora, só que sem nome. A entrega é o
  que fecha a fronteira.

## Quando revisitar

Se um dia o pack precisar **executar** alguma coisa — abrir PR, rodar deploy —
esta decisão cai, e com ela some a razão de o pack ser instalável em qualquer
projeto. O caminho mais provável não é esse: é o orquestrador do ROADMAP
entregar o handoff a um agente operacional automaticamente, o que **respeita**
a fronteira em vez de removê-la.
