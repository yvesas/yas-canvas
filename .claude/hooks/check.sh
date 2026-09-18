#!/usr/bin/env bash
# Verificação estática ao finalizar — o gate do "está pronto?".
# Audiência: Claude (hook Stop).
#
# O que "verificar" significa é do projeto: `tsc --noEmit` num repo TypeScript,
# `go build ./... && go vet ./...` num repo Go, `mypy` num Python. O hook só
# pergunta (stack.sh) e roda. Projeto sem CHECK_CMD não tem gate — e é melhor
# não ter do que ter um que sempre passa por não saber o que rodar.
#
# O mesmo hook serve os dois modos de abrir o Claude Code, porque o baseline é
# instalado tanto na raiz de um workspace quanto dentro de um projeto:
#   - raiz é um repo   → verifica o próprio projeto
#   - raiz não é repo  → verifica os projetos irmãos (workspace multi-projeto)
#
# Só verifica o que está sujo: rodar em projeto sem alteração é caro e ruidoso.
# exit 2 = sinaliza o erro de volta ao Claude.
set -uo pipefail
HOOK_DIR="$(dirname "${BASH_SOURCE[0]}")"
# shellcheck source=lib.sh
. "$HOOK_DIR/lib.sh"
# shellcheck source=stack.sh
. "$HOOK_DIR/stack.sh"

ROOT="$(workspace_root)"
failed=""

check_project() {
  proj="$1"
  name="$(basename "$proj")"

  # Sem alteração pendente não há o que conferir.
  [ -n "$(git -C "$proj" status --porcelain 2>/dev/null)" ] || return 0

  load_stack "$proj"
  [ -n "$CHECK_CMD" ] || return 0
  stack_cmd_available "$CHECK_CMD" || {
    echo "› check ($name): '${CHECK_CMD%% *}' não está no PATH — pulando." >&2
    return 0
  }

  echo "› check ($name): $CHECK_CMD" >&2
  if out="$(cd "$proj" && eval "$CHECK_CMD" 2>&1)"; then
    echo "✓ check ok ($name)" >&2
    return 0
  fi

  echo "⛔ check falhou em '$name':" >&2
  printf '%s\n' "$out" | tail -30 >&2
  failed="$failed $name"
}

# `-e`, não `-d`: num worktree o `.git` é um arquivo. Com `-d`, o hook tomava um
# worktree por workspace, saía procurando projetos nos subdiretórios e não
# checava nada — em silêncio, que é o pior jeito de um gate falhar.
if [ -e "$ROOT/.git" ]; then
  check_project "$ROOT"
else
  for proj in "$ROOT"/*/; do
    [ -e "$proj/.git" ] || continue
    check_project "${proj%/}"
  done
fi

if [ -n "$failed" ]; then
  echo "⛔ Verificação falhou em:$failed — corrija antes de considerar pronto." >&2
  echo "   Ver .claude/rules/code-style.md." >&2
  exit 2
fi
exit 0
