# 0002 — extrair o protocolo de revisão

**Status:** entregue (2026-09-20) · **Origem:** pergunta em aberto no `STATE.md` — o
`/eng-review` chegou a 265 das 400 linhas do teto, e a segunda role ia copiar
esse esqueleto.

## O problema

O `/eng-review` é o molde. Escrever a segunda role copiando-o cria o defeito
clássico: duas cópias do mesmo protocolo que passam a envelhecer em ritmos
diferentes — e é pior aqui do que em código, porque ninguém compila markdown
para descobrir que divergiu.

As últimas três rodadas de eval mostraram **quais** partes são protocolo e quais
são papel. O que mudou por causa de um defeito encontrado — o esqueleto do
relatório, "Barra o plano" como posição, juntar o que as seções separaram — não
tem nada de engenharia: vale igual para uma revisão de produto, de UX ou de
projeto. Já as preferências e os instintos são de quem lidera a técnica, e não
fazem sentido em outra role.

## A divisão

| Fica na role | Vai para o compartilhado |
|---|---|
| preferências declaradas ("o que eu valorizo") | o portão de escopo e sua exceção |
| instintos do papel | decidir em que mundo está: há código ou não |
| as seções e o que cada uma procura | uma seção por vez, com teto |
| a combinação crítica específica do papel | alternativas obrigatórias |
| autoverificação do que é seu | o esqueleto do relatório e "Barra o plano" |
| | juntar o que as seções separaram |
| | não afirmar o que o plano não deu |

## Requisitos

- **REQ-001** — O que é comum às roles de revisão sai do `/eng-review` e vira
  `shared/review-protocol.md`, lido em runtime, como o preâmbulo. Uma fonte.

- **REQ-002** — Cada skill **declara no frontmatter** quais arquivos
  compartilhados precisa (`shared: [preamble, review-protocol]`), e o
  instalador copia só esses. Um canvas não carrega protocolo de relatório ao
  lado, porque arquivo que ninguém lê vira dúvida para quem mantém.

- **REQ-003** — A validação estática cobra o contrato inteiro: o arquivo
  declarado existe, a skill manda lê-lo, e nenhuma skill cola trecho de nenhum
  dos dois.

- **REQ-004** — **O comportamento não muda.** A suíte fecha 8 de 8 sem que
  nenhuma fixture seja tocada. Refactor que precisa afrouxar teste não é
  refactor.

- **REQ-005** — O `/eng-review` fica abaixo de 150 linhas, sobrando espaço para
  a role crescer sem esbarrar no teto.

## Fora de escopo

- Mudar o que a revisão faz. Nenhuma regra nova entra aqui.
- Escrever a segunda role — é a feature seguinte, e esta existe para ela nascer
  sem cópia.

## Como ficou — o que o plano não previu

- **REQ-004 cumpriu o gate e não cumpriu a letra.** A suíte fechou 8 de 8 sem
  fixture tocada, mas "o diff move texto, não inventa" não se sustenta: a 4.2
  longa e o "nada do que o plano não deu entra como fato" não existem na `main`.
  Vieram junto com a extração, e a rodada 1 de eval mostrou que faltava ainda
  mais — conteúdo de payload não estava coberto. Regra nova num refactor não é
  crime; **regra nova que o spec jura não existir** é o que faz o próximo leitor
  ler o diff errado.
- **REQ-005 precisou do frontmatter.** 149 linhas, sim — mas 14 delas saíram da
  lista de `allowed-tools`, não da prosa. Só apertando texto o piso era ~160, e
  o primeiro corte de prosa levou junto três exemplos que o eval provou serem
  funcionais. **Teto de linha compra um custo que só o eval cobra.**
- **A bancada mudou três vezes para o gate rodar** (juiz em diretório vazio,
  teto por turno em 15 min, seletor de escopo por diff). Nada disso estava no
  spec, e é metade do diff.
