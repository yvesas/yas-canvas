# 0003 — decisões do usuário

> Áreas cinzentas onde havia mais de um caminho válido. A decisão é do Yves; a
> citação é literal, para ninguém reinterpretar depois.

## D-CANVAS-001 — a pasta de respostas vive no projeto da pessoa

> "no projeto da pessoa (`specs/canvas/<role>/`)"

**Alternativa descartada:** `~/.claude/`, junto com as skills instaladas.

**Por quê:** a resposta é sobre o sistema *dela*, não sobre o pack. No projeto,
ela é versionada junto com o código que descreve, o time enxerga, e sobrevive à
troca de máquina. Em `~/.claude/` seria invisível para todo mundo menos para
quem rodou a sessão — e morreria no primeiro notebook novo.

## D-CANVAS-002 — o menu sugere, não obriga

> "o menu sugere a próxima parte na ordem do protocolo"

**Alternativa descartada:** menu livre, sem ordem; e o oposto, ordem fixa como
hoje.

**Por quê:** a ordem do protocolo não é arbitrária — arquitetura antes de
qualidade existe porque a segunda depende da primeira. Mas ordem fixa é o que
faz a pessoa abandonar na terceira seção e sair com nada no disco. Sugerir
preserva o raciocínio e devolve o controle.

**O que isso cobra:** menu vira bufê se ninguém disser o que falta. Todo mundo
escolhe arquitetura; ninguém escolhe dado sensível, que é onde mora o que barra
o plano. Ver REQ-004.

## D-CANVAS-003 — o controlador só lê

> "controlador só ler os docs, para evitar que ele edite."

**Alternativa descartada:** controlador que também escreve — consolida
respostas, monta material derivado.

**Por quê:** controlador que escreve no material das roles precisa de regra de
conflito (quem ganha quando os dois mexeram), e isso dobra o tamanho da feature.
Só leitura entrega o valor inteiro do menu — saber o que já foi respondido — sem
comprar o problema difícil.

**Quando revisitar:** quando o orquestrador do ROADMAP existir. Aí a escrita é
o assunto dele, não um efeito colateral do roteador.
