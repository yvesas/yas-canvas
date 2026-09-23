# 0006 — decisões

> A 0005 foi decidida com três perguntas ao Yves. Esta tem menos área cinzenta:
> o formato de revisão já existe e foi exercitado. O que está aqui são as
> escolhas que eu tomei e que mudam o desenho — se alguma estiver errada, ela
> é barata de inverter agora e cara depois.

## D-CEO-001 — o alvo é o mesmo do `/eng-review`, e isso é o ponto

Ela revisa **o mesmo artefato** que a role de engenharia: um plano, uma ideia
de produto escrita, um documento de escopo. A diferença é o assento de onde se
lê.

**Por que importa:** o handoff (0004) foi desenhado para reunir as partes **de
todas as roles** que tocaram um alvo, e até hoje só existiu uma role. A
`/ceo-review` é a primeira chance de exercitar isso de verdade — e a fixture
`handoff-cross-role` existe para provar que funciona.

## D-CEO-002 — cinco partes, tiradas do doc 26

`problem-and-who` · `status-quo` · `non-goals` · `first-cut` · `the-number`.

Saem das etapas 1 a 3 do `docs_yaslab/26`, que já trazem o que perguntar. Não
são as etapas inteiras: o que é de discovery de UX fica para a `/ux-review`, e o
que é de requisito técnico já está na `/eng-review`.

## D-CEO-003 — a combinação crítica desta role

Cada role de revisão tem a sua (a de engenharia é *sem teste + sem tratamento +
falha silenciosa*). A desta:

> **problema sem dono + nenhum não-objetivo + nenhum número = escopo que cresce
> para sempre.**

As três aparecem em partes diferentes e parecem médias sozinhas. Juntas, são o
motivo mais comum de um produto nunca sair — e ninguém percebe porque cada
sintoma foi discutido numa reunião diferente.

## D-CEO-004 — ela não fala de tecnologia, e isso é regra, não estilo

Stack, arquitetura, banco, fila: **não são desta role**, mesmo quando estão
errados no plano. Se aparecer algo técnico grave, ela nomeia em uma linha e
manda para a `/eng-review` — não opina.

**Por quê:** duas roles opinando sobre a mesma coisa com pesos diferentes é como
uma revisão perde autoridade. E o preâmbulo já proíbe afirmar o que não se sabe;
aqui a fronteira é mais estreita de propósito.
