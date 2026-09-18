#!/usr/bin/env bash
# Format + lint ao editar.
# Audiência: Claude (PostToolUse em Edit|Write|MultiEdit).
#
# O hook não conhece linguagem nenhuma: ele pergunta ao projeto (stack.sh) quais
# são os comandos e roda os do projeto. Antes daqui ele falava `npx prettier` e
# só isso — num repo Go não formatava nada e também não avisava, que é o jeito
# mais caro de uma conveniência falhar.
#
# Nunca bloqueia (sempre exit 0): é conveniência, não gate.
set -uo pipefail
HOOK_DIR="$(dirname "${BASH_SOURCE[0]}")"
# shellcheck source=lib.sh
. "$HOOK_DIR/lib.sh"
# shellcheck source=stack.sh
. "$HOOK_DIR/stack.sh"

read_hook_payload
file="$(json_field file_path)"
[ -n "$file" ] || exit 0
[ -f "$file" ] || exit 0

root="$(project_root_of "$file")" || exit 0
load_stack "$root"
[ -n "$FMT_CMD$LINT_CMD" ] || exit 0

# A lista de extensões é do projeto. Vazia = sem filtro, roda em tudo.
if [ -n "$FMT_EXTS" ]; then
  ext="${file##*.}"
  case " $FMT_EXTS " in
    *" $ext "*) ;;
    *) exit 0 ;;
  esac
fi

cd "$root" || exit 0
rel="${file#"$root"/}"
dir="$(dirname "$rel")"
ran=""

for template in "$FMT_CMD" "$LINT_CMD"; do
  [ -n "$template" ] || continue
  # Ferramenta não instalada é motivo para pular, não para reclamar: quem clonou
  # o repo e ainda não instalou dependência continua editando.
  stack_cmd_available "$template" || continue
  eval "$(stack_render "$template" "$rel" "$dir")" >/dev/null 2>&1 || true
  ran="yes"
done

[ -n "$ran" ] && echo "✓ format+lint [$STACK]: $rel" >&2
exit 0
