# yas-canvas

Skills de **método** para liderança técnica. Cada uma é um papel com um
protocolo próprio: cinco roles que revisam um plano antes de virar código, e um
canvas que estrutura o fundador técnico em vez do plano.

Elas conduzem uma conversa — uma pergunta por vez, até aparecer um nome próprio,
um número, um incidente real — e terminam num documento que você entrega a quem
vai construir.

**Elas propõem; quem enforça é o seu repositório.** Nenhuma skill daqui commita,
abre PR, publica nem toca em segredo. Regra viaja com o código; método viaja com
a pessoa.

**Primeira vez? Comece por [docs/getting-started.md](docs/getting-started.md)** —
instalação, a primeira sessão comentada de ponta a ponta e o que fazer com o que
ela grava.

## Instalar

Precisa do [Claude Code](https://claude.com/claude-code) instalado.

```bash
git clone https://github.com/yvesas/yas-canvas.git
cd yas-canvas
bin/install            # copia para ~/.claude/skills (o padrão)
bin/install --check    # mostra o que mudaria, sem escrever
bin/install --project ../algum-repo   # só naquele repositório
```

Abra uma sessão nova do Claude Code depois de instalar.

## As sete skills

Cinco revisões, cinco perguntas diferentes sobre o mesmo plano:

| Skill | A pergunta que ela faz |
|---|---|
| `/pm-review` | você **sabe** o suficiente para decidir? |
| `/ceo-review` | **devia** ser construído assim, deste tamanho, agora? |
| `/eng-review` | está **bem construído**? |
| `/security-review` | o que acontece quando **vaza, é atacado ou cai**? |
| `/ux-review` | o que acontece **fora do caminho feliz**? |

E mais duas:

| Skill | O que faz |
|---|---|
| `/cto-canvas` | estrutura **você**: onde está, o que está adiando, qual a próxima decisão |
| `/canvas` | roteador: diz onde você parou e manda o pedido para a role certa |

Na dúvida sobre qual usar, invoque `/canvas` e descreva o problema.

**A diferença entre revisão e canvas é o objeto.** A revisão avalia um artefato
que já existe escrito; o canvas estrutura a pessoa. Se há um documento para ler,
é revisão. Se o que existe está na sua cabeça, é canvas.

**Ainda não existem:** revisão de design visual e canvas de tech lead. As duas
estão bloqueadas por conteúdo, não por tempo — ver
[`specs/project/ROADMAP.md`](specs/project/ROADMAP.md).

## O que sai de uma sessão

Cada parte respondida vira um arquivo em `specs/canvas/`, **no seu projeto**,
versionado junto com o código que descreve. No fechamento sai o **handoff**:
um documento por alvo revisado, em que cada item cita a parte, a data e a frase
que o autoriza — e o que você não confirmou fica separado, em "Confirmar antes
de executar".

É o que você entrega a quem vai construir: outro agente, outro editor, um dev do
time. O detalhe está no [guia](docs/getting-started.md#o-que-aparece-no-seu-projeto).

## Contribuir

A bancada de teste, as regras de escrever uma skill e o fluxo de PR estão em
[CONTRIBUTING.md](CONTRIBUTING.md). O produto é markdown; o único código aqui é
a bancada.

MIT.
