# 0001 — `/eng-review` quando não há código para ler

**Status:** especificado · **Origem:** rodada 1 de evals (ver `specs/project/STATE.md`)

## O problema

O `Passo 4` do `/eng-review` manda **ler o código real** antes de opinar — a
guarda que existe justamente para a revisão não sair genérica. Ela assume um
repositório.

Na primeira rodada de evals, a fixture era um plano de um sistema que **ainda
não existe**. A sessão registrou "não tenho o código" e seguiu assim mesmo. A
skill não diz o que fazer nesse caso, e plano de coisa nova é metade dos casos
reais — é exatamente o cenário do fundador que chega com um plano antes da
primeira linha.

Dois riscos, e o segundo é pior:

1. A revisão perde a âncora e vira lista de boas práticas.
2. O modelo **preenche a lacuna com arquitetura imaginada** e depois trata o
   próprio palpite como fato do usuário. Já aconteceu, com número: a fixture
   `vague-scale` pegou a skill falando de "os três serviços" num plano que nunca
   disse quantos eram.

## Requisitos

- **REQ-001** — O `Passo 4` reconhece dois mundos: existe código a ler, ou não
  existe. A skill decide qual é o caso **antes** de começar as seções, por um
  teste barato e declarado (há repositório? o plano cita arquivo que existe?).

- **REQ-002** — Sem código, o desafio de escopo não é pulado: ele muda de alvo.
  Em vez de "leia o que já existe", passa a confrontar o plano com o que dá para
  verificar fora do código — contrato do fornecedor citado, formato de dado
  nomeado, restrição declarada, o que já existe em outro projeto do usuário.

- **REQ-003** — Sem código, a skill **declara a limitação no relatório**, com o
  que não pôde ser verificado. Uma linha nomeando o que ficou por confirmar, não
  um aviso genérico.

- **REQ-004** — Sem código, a skill não escreve fato que o plano não deu:
  número de serviços, nome de tabela, tecnologia, volume. Quando precisa de um
  desses para opinar, ela **pergunta** em vez de assumir.

- **REQ-005** — As seções que só fazem sentido sobre código existente (5.2
  Qualidade) dizem por que estão curtas, em vez de inventar conteúdo para
  parecerem completas.

- **REQ-006** — Uma fixture de eval cobre o caso greenfield, e a suíte continua
  verde por inteiro.

## Fora de escopo

- Mudar as cinco seções ou a obrigatoriedade das alternativas.
- Qualquer coisa nas outras roles: elas ainda não existem. O que for aprendido
  aqui entra no molde quando a segunda role for escrita.

## Como se sabe que funcionou

`YAS_EVAL=1 npm run eval` verde com a fixture nova incluída, e o relatório da
sessão greenfield nomeando o que não pôde ser verificado.
