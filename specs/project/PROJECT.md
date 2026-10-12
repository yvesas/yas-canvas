# yas-canvas — visão

## O problema

A IA colapsou o custo de **construir**; não colapsou o de construir a coisa
certa, do jeito certo. O fundador que gera um MVP em dois dias no Lovable — e
que não é técnico — tem um app que funciona e não sabe **o que a IA decidiu por
ele**: arquitetura, dado exposto, o que aguenta crescer. O muro aparece no
primeiro crescimento real, quando já é caro: a falha que a IA não corrige, o
limite da plataforma, a conta de infra e de tokens subindo.

Falta a esse fundador um **protocolo**: uma conversa conduzida que force
especificidade, desafie premissas, ponha alternativas na mesa e termine numa
decisão escrita — **no momento certo do produto**, porque o certo para quem
valida não é o certo para quem já tem cliente pagando.

## O que este pack é

Skills de método. Cada uma é um **papel** com um protocolo próprio:

- **Canvas** — estruturam a pessoa, não o plano: onde ela está, o que ela não
  sabe que não sabe, qual a próxima decisão. Fundador (base de produto) e
  CTO/fundador técnico.
- **Roles de revisão** — produto, CEO, engenharia, segurança, UX. Revisam um
  plano antes de virar código, cada uma no seu modo cognitivo.

**Na escada da Yaslab, o pack é o degrau gratuito.** O método é aberto — é o
*Give First*; o pago é profundidade e responsabilidade na decisão (sessão,
diagnóstico, acompanhamento, CTO fracionado). O pack não vende nada e não cita
serviço: quem usa e quer ir além sabe onde achar o autor.

## Princípios

1. **Estratégico aqui; operacional em quem executa.** Este pack entende,
   desafia, decide e escreve — e entrega um **handoff**. Construir, commitar,
   publicar é de quem recebe, com as ferramentas do repositório dele, que a
   skill não conhece e não precisa conhecer. A fronteira é um documento, não
   uma referência: é o que faz o método viajar com a pessoa e funcionar em
   qualquer projeto.
2. **O próximo passo certo para o momento do produto.** Toda skill calibra pelo
   estágio — ideia, protótipo, primeiros clientes, receita. O `.vercel.app` é
   certo enquanto valida; exigir maturidade de produto num protótipo é o erro
   que os concorrentes cometem.
3. **Especificidade é a moeda.** Resposta genérica não vale nada; o protocolo
   empurra até aparecer um nome próprio, um número, um incidente real.
4. **Uma pergunta por vez.** Seis perguntas de uma vez produzem seis respostas
   rasas.
5. **Alternativas são obrigatórias.** Mínima viável e ideal, sempre, com
   esforço e risco. Revisão sem alternativa é aprovação com comentários.
6. **A sessão termina em documento e em uma tarefa.** O que fica só no chat
   evapora.
7. **Sem hype, sem terror, sem deboche.** A favor do vibe coding como porta de
   entrada; contra fingir que protótipo é produto. O momento do fundador é
   legítimo e nunca é ridicularizado.
8. **O nível técnico fica.** A skill não simplifica o conteúdo para caber em
   quem não é técnico — a profundidade é de propósito: é o que mostra ao
   fundador que há teoria por trás do método, e não um checklist. O que se
   ajusta é o caminho até ela, não ela.
9. **A voz é autoral.** O conteúdo sai do framework de liderança técnica do
   Yves — Conpass do zero ao exit, times liderados, LGPD, jurídico brasileiro.
   Sem isso o pack é genérico, e genérico já existe de graça.

## Personas

- **Fundador não técnico, early stage** (principal) — solo ou dupla, pré-seed
  ou seed; fez o app com IA, tem cliente ou está entrando numa aceleradora.
  *"Quando meu protótipo começa a ter cliente, quero entender o que tenho e
  qual o próximo passo certo, para crescer sem refazer tudo nem queimar
  caixa."* As entrevistas mostraram **dois níveis**:
  - **Iniciante** — está começando e ainda não sabe o que não sabe. Chega pelo
    conteúdo e pela consultoria; o pack, para ele, é vitrine do método.
  - **Já aprendeu o básico** — usa Claude Code ou Codex, git, Vercel,
    Supabase. É quem **instala e roda** as skills, e quem a profundidade
    técnica convence.
- **Não técnico dentro de empresa** (oportunidade) — vibe-coda ferramenta
  interna para o time. *"Quero saber se ela é segura e se aguenta, para não
  expor dados da empresa."*
- **CTO / fundador técnico** (também servido) — arquitetura inicial, construir
  × validar, primeiro time. O método é o mesmo.

O **tech lead** saiu das personas por ora (2026-10-12), junto com o
`/techlead-canvas`, que já estava bloqueado por conteúdo.

**Fora:** quem quer aval em vez de opinião, ou garantia em vez de próximo
passo. O protocolo desafia premissas — para essa pessoa ele é atrito, não
valor.

## Stack

Markdown é o produto; skill não tem runtime. A bancada é `npm run check`
(validação estática, Node puro) e `node --test` com modelo juiz — **nunca
`bun test`**, que não enxerga `node:test` e sai verde sem rodar nada.

## Fora de escopo

- Substituir o baseline de convenções. Este pack não tem hook nem permissão.
- Virar SaaS. O SaaS de aceleração é outro assunto; este pack **antecede** e
  valida a metodologia com fundador real, gerando sessões salvas.
- Vender ou citar serviço dentro de uma skill. A ponte para a consultoria é o
  site, não o pack.
- Reimplementar ferramenta de browser, QA ou deploy.
