# 0004 — decisões do usuário

> A citação é literal, para ninguém reinterpretar depois.

## D-HANDOFF-001 — yas-canvas é estratégico; o operacional é de outro

> "o importante é gerar resultado de nível estratégico, com algum material
> para o usuário orientar outro agente depois para seguir no nível
> operacional. yas-claude-base tem características operacionais. yas-canvas é
> estratégico, planejamento, etc."

**Alternativa descartada:** trocar `/commit` por uma frase genérica ("o fluxo
de commit do repositório dele"). Continuaria sendo o pack **apontando** para o
operacional — só que sem nome.

**Por quê:** a fronteira passa a ser um **documento**, não uma referência. O pack
entrega o handoff e para. Quem executa — um agente com o baseline, um sem, outro
editor, uma pessoa — pega dali. Funciona em qualquer máquina porque não depende
de nada estar instalado nela.

## D-HANDOFF-002 — formato próprio, compatível sem depender

> escolhido: "Próprio, compatível"

**Alternativas descartadas:** gerar `spec.md` + `tasks.md` direto no formato do
baseline (reacopla o que esta feature desfaz); brief livre em prosa (outro
agente interpretaria a prosa — o mesmo problema que a 0003 resolveu com título
mecânico).

**Por quê:** o formato é do yas-canvas e legível por qualquer agente, mas os
campos mapeiam 1:1 para o spec-driven — `D-`, `REQ-` com WHEN/THEN/SHALL,
tarefas com critério de pronto. Quem tem o baseline pega direto; quem não tem
entende igual.

## D-HANDOFF-003 — um handoff por alvo, regenerado a partir das partes

> escolhido: "Um por alvo, regenerado"

**Alternativas descartadas:** um por sessão, acumulando (o agente operacional
teria de descobrir qual é o mais recente — e pegaria o errado); um por role (o
agente receberia o material fatiado por papel e teria de juntar sozinho, que é o
trabalho que o handoff existe para fazer).

**Por quê:** o alvo — o plano revisado — é a mesma unidade de uma feature no
spec-driven. E o handoff é **derivado**: a fonte da verdade são os arquivos de
parte. A pessoa edita as partes; o handoff é regenerado a partir delas, como um
build. O agente operacional sempre tem um ponto de entrada atual.

**O que isso cobra:** regenerar é apagar texto, e a 0003 proibiu a skill de
apagar texto. O handoff é a **única** exceção, e ela é delimitada: o arquivo
avisa no topo que é gerado, e uma seção de notas escritas à mão passa intacta de
uma regeneração para a outra (REQ-007).

## D-HANDOFF-004 — o pack só escreve dentro de `specs/canvas/`

> escolhido: "Só specs/canvas/"

**Alternativa descartada:** o relatório continuar acrescentado ao fim do plano
revisado.

**Por quê:** é o que resolve a classe B do acoplamento. O pack mandava salvar
em `specs/features/NNNN-slug/` e `specs/quick/`, estrutura que só existe onde o
baseline está instalado, e passava a inventar pasta no repositório de alguém.
Com território próprio, o pack não presume nada sobre o resto do projeto: o
plano é da pessoa, o código é do agente operacional, e `specs/canvas/` é do
pack.

**O que isso cobra:** muda um comportamento que existe hoje — o relatório
deixa de ficar ao lado do que revisa. Nenhuma fixture depende disso (verificado:
a bancada procura o relatório em qualquer arquivo do projeto).
