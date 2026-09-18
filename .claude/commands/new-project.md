---
description: Cria um projeto novo (repo próprio) com docs/, specs/ e as guardas do baseline
argument-hint: <nome-do-projeto> [uma linha do que é]
allowed-tools: Bash(git -C *), Bash(git init*), Bash(git config*), Bash(mkdir*), Bash(chmod*), Bash(cp*), Bash(ls*), Read, Write, Edit
---

Faça o scaffold de um projeto novo — repositório próprio — na pasta onde a
sessão está aberta.

Entrada do usuário: `$ARGUMENTS` — primeiro token é o nome (kebab-case); o resto,
a descrição de uma linha.

## Step 0 — Guardas

```bash
git rev-parse --show-toplevel 2>/dev/null   # vazio = não estou dentro de um repo
ls -d ./<nome>
```

- **O diretório atual já é um repositório git?** PARE. Este comando cria um
  projeto **ao lado**, não dentro de outro. O baseline é instalado em todo
  projeto, então este comando também aparece lá; isso não significa que seja
  para usar lá.
- **Pasta já existe?** PARE e pergunte: continuar dentro dela ou escolher outro nome.
- Nome fora de kebab-case → normalize e confirme com o usuário.

## Step 1 — Entender o projeto antes de criar arquivo

Não gere `PROJECT.md` com placeholder. Pergunte, de forma conversacional (não
como checklist), o que ainda não estiver claro na conversa:

- Que problema resolve, e para quem?
- **Em que linguagem, e por quê?** Esta pergunta vem antes da estrutura de
  pastas, porque é ela que decide a estrutura. Se ainda está em aberto, discuta
  o trade-off (o que o time já sabe, o que o problema pede, onde vai rodar) —
  **não escolha sozinho, e não assuma a linguagem do último projeto**.
- Runtime, banco, framework — já decididos ou em aberto?
- Existe uma **golden rule** — uma invariante que domina as decisões do projeto?
  (ex.: *"o harness nunca conhece domínio de produto"*). Se existir, ela precisa
  vir com um **teste operacional**, não como slogan.
- O que está explicitamente **fora** de escopo?

Se o usuário ainda não souber algo, registre como decisão em aberto no `STATE.md`
em vez de inventar.

## Step 2 — Estrutura

`docs/` e `specs/` são iguais em todo projeto:

```bash
mkdir -p <nome>/{docs/adr,docs/runbooks,specs/project,specs/features,specs/quick}
```

O resto **segue a convenção da linguagem escolhida**, não um layout genérico:
`cmd/` + `internal/` em Go, `src/` + `tests/` em Node, o pacote com o nome do
projeto em Python, `src/` em Rust. Na dúvida, o layout que a comunidade daquela
linguagem documenta — projeto que inventa estrutura própria custa caro no
primeiro colaborador.

## Step 3 — Git + baseline

```bash
cd <nome>
git init -b main
```

Instale o baseline — ele traz `.claude/` (settings, hooks, rules, commands,
skills) e o `.githooks/commit-msg`, e aponta o `core.hooksPath`:

```bash
<caminho-do-claude-base>/bin/install .
```

> **Por que copiar para dentro do projeto:** sessão de Claude Code no celular ou
> na web clona o repositório do projeto. Um `.claude/` que viva na pasta de cima
> não existe naquela sessão. As regras só valem em todo lugar se estiverem
> versionadas junto do código.

Para quem clonar receber o hook sozinho, automatize o `core.hooksPath` do jeito
do stack — em Node, `"scripts": { "prepare": "git config core.hooksPath
.githooks" }`; em Go ou Python, um alvo `setup` no `Makefile` que o README manda
rodar. Sem isso o hook existe e não roda.

**Verifique o hook antes de seguir** — hook que não roda é pior que nenhum,
porque dá falsa sensação de segurança:

```bash
printf 'chore: test\n\nCo-Authored-By: Someone <x@y.z>\n' > /tmp/msg && \
  .githooks/commit-msg /tmp/msg; echo "exit=$?  (esperado: 1)"
```

## Step 4 — `/stack`

Rode **`/stack`** para gravar `.claude/stack.env` com os comandos do projeto:
formatar, lintar, verificar, testar. É o que os hooks `format-lint` e `check`
leem; sem o arquivo eles caem na detecção por marcador, que serve para começar
mas não conhece decisão sua.

## Step 5 — `.gitignore` e `.env.example`

`.gitignore` barra `.env*` (exceto `.env.example`), o diretório de build e o de
dependência **da linguagem escolhida** (`node_modules/`, `dist/`; `bin/`,
`vendor/`; `__pycache__/`, `.venv/`; `target/`) e `.DS_Store`. O jeito mais
seguro é começar do template oficial da linguagem (`gitignore.io`, o
`.gitignore` do `go`/`cargo new`) e acrescentar.

`.env.example` versionado com **só os nomes** das variáveis e um comentário do
que cada uma é. Ver `.claude/rules/secrets.md`.

## Step 6 — `CLAUDE.md` do projeto

Máximo ~80 linhas, no formato de índice (ver `CONVENTIONS.md` §1 do baseline):
o que é · golden rule com teste · **stack e por que essa** · arquitetura (tabela
pasta → responsabilidade) · comandos · convenções (link para `.claude/rules/`) ·
commit e PR · footguns conhecidos · onde ficam `docs/` e `specs/`.

Crie também um `AGENTS.md` de ~10 linhas apontando para o `CLAUDE.md` e repetindo
as regras inegociáveis (golden rule + sem atribuição de IA).

## Step 7 — `specs/project/`

Use a skill **`spec-driven`** (`initialize project`) para gerar `PROJECT.md`,
`ROADMAP.md` e `STATE.md` a partir do que foi levantado no Step 1. Não escreva
esses três à mão fora da skill — ela define o formato que os comandos seguintes
esperam.

## Step 8 — Verificar e resumir

```bash
find <nome> -type f -not -path "*/.git/*" | sort
```

Mostre a árvore criada, confirme que o hook `commit-msg` rejeita
`Co-Authored-By` (resultado do Step 3), diga qual `CHECK_CMD` passou a valer
(Step 4) e sugira o próximo passo: especificar a primeira feature com `/spec`.

**Não** faça o primeiro commit sem o usuário pedir, e **não** crie repositório
remoto no GitHub por conta própria — é ação externa, precisa de aprovação
explícita.
