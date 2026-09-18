# Regra — Estilo de código

> Enforçada por: os comandos **do próprio projeto** — hook `format-lint`
> (PostToolUse) e `check` (Stop), que leem `.claude/stack.env`. O baseline não
> escolhe formatter nem linter: ele exige que existam, e roda os seus.

## Princípios — valem em qualquer linguagem

- **SOLID + Clean Code.** Função pequena, um motivo para mudar, nome que diz o
  que faz.
- **Dependência externa fica atrás de uma interface**, com implementação real e
  mock. O domínio não conhece o formato do fornecedor.
- **Payload despadronizado é normalizado na borda**, numa camada só. O resto do
  código vê o tipo do domínio.
- **Entrada externa é validada por schema, na borda.** O que é validado e o que
  é publicado saem da mesma definição, para não divergirem — Zod, Pydantic,
  `encoding/json` + validator, serde: o que o projeto usar.
- **Erro nunca é engolido.** `catch {}` vazio, `err` ignorado, `except: pass`,
  `unwrap()` em cima de erro esperado — tudo a mesma falha: o programa segue
  sem saber que não deu certo.
- **Tipagem estrita onde a linguagem tem.** Sem escape hatch solto: `any` em
  TypeScript, `interface{}` em Go, `Any` em Python. Quando o tipo é mesmo
  desconhecido, use o mecanismo de narrowing da linguagem antes de usar o valor.
- Reutilizar o que já existe antes de criar abstração nova. Padrão novo precisa
  de justificativa no PR — dependência nova, mais ainda.
- Comentário explica **por quê**, não o quê. Código que precisa de comentário
  para dizer o quê deve ser reescrito.

## Idioma e nome de arquivo

- **Código em inglês**: identificador, função, tipo, comentário, docstring,
  mensagem de log e texto de erro.
- **Commit, título e corpo de PR em inglês.** Ver `git-flow.md`.
- **Nome de arquivo e de pasta em inglês, sempre** — documentação inclusive.
  `docs-and-specs.md`, nunca `docs-e-specs.md`. Nome é interface: aparece em
  import, link, caminho, busca e autocomplete, e um nome misturado obriga quem
  lê a adivinhar em que língua procurar.
- Fora do código, kebab-case (`ci-minutes.md`). Dentro, manda a convenção da
  linguagem: `snake_case.py`, `handler_test.go`, `UserCard.tsx`.
- **A prosa pode ser em português.** Ela é para gente, e o time é brasileiro.
  O nome do arquivo não é para gente só — é para ferramenta também.

## O que o projeto precisa declarar

Toda linguagem responde às quatro perguntas abaixo; o baseline não presume
nenhuma resposta. Os comandos vão em `.claude/stack.env` (é o que os hooks
leem), e o porquê de cada escolha vai no `CLAUDE.md` do projeto.

| Variável | Pergunta | TypeScript | Go | Python |
|---|---|---|---|---|
| `FMT_CMD` | quem formata? | `prettier --write` | `gofmt -w` | `ruff format` |
| `LINT_CMD` | quem reclama? | `eslint --fix` | `golangci-lint run` | `ruff check --fix` |
| `CHECK_CMD` | o que prova que ainda compila? | `tsc --noEmit` | `go build ./... && go vet ./...` | `mypy .` |
| `TEST_CMD` | qual é a suíte? | `vitest run` | `go test ./...` | `pytest` |

Sem `stack.env`, os hooks detectam pelo marcador do ecossistema e usam o padrão
da linguagem — serve para começar, e o `/stack` fixa quando não servir.

**Projeto sem `CHECK_CMD` não tem gate de "está pronto".** Pode ser uma escolha
legítima (linguagem sem verificação estática), mas então está escrito no
`CLAUDE.md`, não acontece por esquecimento.

## Antes de considerar pronto

- Lint limpo · `CHECK_CMD` sem erro · testes verdes.
- O hook `Stop` roda o `CHECK_CMD` nos projetos com árvore suja. Se ele
  reclamar, o trabalho não está pronto.
- Ferramenta que não está instalada é pulada pelo hook, em silêncio. Isso
  significa que **hook verde não prova que o lint rodou** — na dúvida, rode o
  comando à mão.
