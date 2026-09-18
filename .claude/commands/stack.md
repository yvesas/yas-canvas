---
description: Descobre (perguntando e analisando) a linguagem do projeto e grava .claude/stack.env
argument-hint: [linguagem, se você já sabe]
allowed-tools: Bash(ls*), Bash(cat*), Bash(command -v*), Bash(git -C *), Bash(go version*), Bash(node --version*), Bash(python3 --version*), Bash(cargo --version*), Read, Write, Edit, Glob, Grep
---

Descubra em que o projeto é escrito e registre os comandos dele em
`.claude/stack.env` — é de lá que os hooks `format-lint` e `check` tiram o que
rodar.

Entrada do usuário: `$ARGUMENTS` (pode estar vazia).

> **Por que este comando existe.** O baseline não sabe a sua linguagem, e
> adivinhar era o defeito antigo: hook que só falava `npx prettier` virava
> no-op silencioso num repo Go. Aqui a resposta vem de você e do repositório,
> não de um padrão presumido.

## Step 0 — Onde estou

```bash
git rev-parse --show-toplevel        # a raiz do projeto
ls -a                                # o que já existe aqui
```

Se houver mais de um projeto na árvore (monorepo com `api/` e `app/`, por
exemplo), **pergunte de qual estamos falando** — cada um tem seus comandos, e
`stack.env` é por raiz de projeto.

## Step 1 — Analisar antes de perguntar

Olhe os sinais e chegue com uma hipótese, não com uma pergunta em branco:

| Sinal | Diz |
|---|---|
| `go.mod`, `go.work` | Go; a versão está no próprio arquivo |
| `package.json` + lockfile | Node; o lockfile diz o gerenciador (`pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`) |
| `pyproject.toml`, `uv.lock`, `requirements.txt` | Python; `[tool.ruff]`/`[tool.mypy]` dizem as ferramentas |
| `Cargo.toml` | Rust |
| `Makefile`, `Taskfile.yml` | os comandos de verdade podem estar aqui — leia antes de inventar |
| `.github/workflows/*.yml` | **a melhor fonte**: o que o CI roda é o que precisa passar |
| `tsconfig.json`, `.golangci.yml`, `.eslintrc*`, `ruff.toml` | a ferramenta já escolhida |

Confira também o que existe **na máquina** (`command -v golangci-lint`), porque
comando que não está no PATH é pulado pelo hook em silêncio.

**Projeto vazio, sem nenhum sinal?** Então a pergunta é de verdade e vem antes
de qualquer arquivo — ver Step 2.

## Step 2 — Perguntar o que a análise não responde

Pergunte de forma conversacional, e **só o que ficou em aberto**:

- Qual linguagem e versão? (Projeto novo: já está decidido ou está em aberto?
  Se está em aberto, discuta trade-off — não escolha por conta própria.)
- Gerenciador de pacote/dependência — quando há mais de um plausível.
- Formatter e linter: os padrões da linguagem servem, ou o projeto usa outro?
- **O que prova que o código ainda compila/tipa?** É o gate do "está pronto".
  Em linguagem sem verificação estática, a resposta pode ser "não existe" — e
  aí isso fica escrito, em vez de virar um gate que sempre passa.
- Qual o comando da suíte de testes?

Regra: **não invente comando**. Se o usuário não souber, registre como decisão
em aberto (`specs/project/STATE.md`) e deixe a variável vazia.

## Step 3 — Escrever `.claude/stack.env`

Use `.claude/stack.example.env` como modelo. Só as variáveis que você tem
resposta; vazio é melhor que chute.

```bash
STACK=go
FMT_EXTS="go"
FMT_CMD="gofmt -w {file}"
LINT_CMD="golangci-lint run ./{dir}"
CHECK_CMD="go build ./... && go vet ./..."
TEST_CMD="go test ./..."
```

- `{file}` = arquivo editado · `{dir}` = pasta dele.
- `FMT_CMD` e `LINT_CMD` rodam **a cada arquivo editado** — precisam ser
  rápidos. Verificação de projeto inteiro é `CHECK_CMD`, não aqui.
- O arquivo é **do projeto**: versionado e nunca sobrescrito pelo instalador.

## Step 4 — Provar que funciona

Hook que não roda é pior que hook nenhum, porque dá falsa sensação de segurança:

```bash
command -v <primeiro-binário-de-cada-comando>   # está no PATH?
<CHECK_CMD>                                     # passa num repo limpo?
```

Se o `CHECK_CMD` falha numa árvore que deveria estar boa, o comando está errado
— conserte agora, senão o hook `Stop` vai brigar com o usuário a sessão inteira.

## Step 5 — Registrar para humano

O `stack.env` é para a máquina. Atualize também o `CLAUDE.md` do projeto com a
seção de stack e comandos, e **o porquê** da escolha quando ela foi disputada
(isso vira ADR em `docs/adr/` se for estrutural). Ver
`.claude/rules/docs-and-specs.md`.

Feche dizendo, em duas linhas, o que passou a valer: o que formata ao editar e
o que barra o "está pronto".
