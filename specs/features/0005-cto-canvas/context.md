# 0005 — decisões do usuário

## D-CTO-001 — o que é de qualquer sessão conduzida sai do protocolo de revisão

> escolhido: "Separar o genérico"

`shared/session-protocol.md` nasce com o território `specs/canvas/`, o arquivo
de parte, o menu e as alternativas obrigatórias. O `review-protocol.md` fica com
o que é de revisão: o relatório, "Barra o plano", a junção das lacunas.

**Alternativas descartadas:** um `canvas-protocol.md` escrito do zero, que é a
duplicação que a 0002 existiu para evitar; e o canvas lendo o `review-protocol`
inteiro, que faria a skill ler em todo turno regras que não valem para ela — e
o cabeçalho daquele arquivo diz, desde a 0002, que ele **não** vale para os
canvas.

**Por quê:** a divisão da 0002 era "papel × protocolo de revisão". A 0003
acrescentou ali dentro coisas que não são de revisão nenhuma — onde gravar,
como é o arquivo de parte, como o menu funciona. O `/cto-canvas` é o primeiro
leitor que expõe isso, e era exatamente o teste que o `STATE.md` previa.

## D-CTO-002 — as seis perguntas são partes, com menu

> escolhido: "Sim, como nas roles"

Cada pergunta técnica é uma parte em `specs/canvas/cto-canvas/<parte>.md`. O
estágio sugere quais; o menu aceita qualquer uma.

**Alternativa descartada:** um documento de sessão só, gravado no fim.

**Por quê:** é o mesmo ganho que a 0003 mediu — quem sai no meio sai com o que
já respondeu, e volta depois sem repetir. Numa conversa de seis perguntas com
"empurrar até ouvir o específico", sair no meio é o normal, não a exceção.

## D-CTO-003 — sem handoff nesta feature, com gatilho escrito

> escolhido: "Não agora, com gatilho"

**Por quê:** o canvas conduz uma **pessoa**; não há artefato para entregar a
quem executa. Ele fecha com o documento do canvas e uma tarefa.

**Gatilho para revisitar:** a pergunta da menor fatia técnica (T4) produz algo
concreto para construir na semana. No dia em que essa resposta virar alvo — um
plano, um módulo nomeado —, existe o que entregar, e aí o handoff faz sentido.

## D-CTO-004 — a forma vem do gstack; o conteúdo é do Yves

Não foi escolha desta sessão: está no `docs_yaslab/25`, que é a fonte deste
canvas, e é repetido aqui porque vale como requisito.

> "copiar a **forma** (protocolo, ritmo, postura), nunca o conteúdo"

O gstack (`garrytan/gstack`, MIT) deu a estrutura: seis perguntas uma por vez,
roteamento por estágio, desafio de premissas, alternativas, sinais, fechamento
com citação. As perguntas técnicas, os exemplos e as bandeiras são do Yves —
Conpass, LGPD, jurídico brasileiro. Sem isso, como o próprio doc 25 diz, o
canvas vira "gstack em português" e o diferencial some.
