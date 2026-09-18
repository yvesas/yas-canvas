#!/usr/bin/env bash
# Helpers compartilhados pelos hooks do baseline.
# A pasta que agrupa projetos (o workspace) NÃO é um repo git — cada projeto
# dentro dela é.
# Por isso todo hook resolve a raiz do projeto a partir do arquivo/comando,
# nunca a partir do diretório do próprio hook.

# O JSON do tool chega no stdin, e stdin só pode ser consumido uma vez.
#
# `campo="$(json_field x)"` roda em subshell: se o parse lesse o stdin ali
# dentro, o subshell levaria o payload embora e a chamada seguinte voltaria
# vazia — o hook liberaria tudo sem avisar. Por isso o payload é lido pelo
# shell PAI, uma vez, e as consultas trabalham em cima da variável.
#
# Todo hook que usa json_field precisa chamar read_hook_payload primeiro, fora
# de qualquer $(...).
HOOK_PAYLOAD=""
# Vem do ambiente quando alguém quer forçar um parser — é assim que a suíte
# exercita o caminho de bash puro numa máquina que tem python3.
HOOK_JSON_BIN="${HOOK_JSON_BIN:-}"

read_hook_payload() {
  HOOK_PAYLOAD="$(cat)"
}

# Quem lê o JSON. **Não assuma node**: este baseline vale para projeto em Go,
# Python ou Rust, e numa máquina dessas o `node -e` do guard falhava — devolvia
# vazio, e vazio, para um guard, significa "pode passar". A pior falha possível
# é a silenciosa, então há três níveis e o último é bash puro.
json_parser() {
  if [ -z "$HOOK_JSON_BIN" ]; then
    for bin in python3 node; do
      if command -v "$bin" >/dev/null 2>&1; then
        HOOK_JSON_BIN="$bin"
        break
      fi
    done
    [ -n "$HOOK_JSON_BIN" ] || HOOK_JSON_BIN="bash"
  fi
  printf '%s' "$HOOK_JSON_BIN"
}

# Último recurso, quando não há python3 nem node na máquina. Cobre o formato
# real do payload — um campo string dentro de tool_input — e nada além disso.
_json_field_bash() {
  printf '%s' "$HOOK_PAYLOAD" | tr '\n' ' ' |
    sed -nE "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"((\\\\.|[^\"\\\\])*)\".*/\1/p" |
    head -1 |
    sed -e 's/\\"/"/g' -e 's/\\\\/\\/g'
}

# Lê um campo de tool_input do payload já capturado. Uso: json_field file_path
json_field() {
  case "$(json_parser)" in
    python3)
      printf '%s' "$HOOK_PAYLOAD" | python3 -c '
import json, sys
key = sys.argv[1]
try:
    data = json.load(sys.stdin)
except Exception:
    data = {}
value = (data.get("tool_input") or {}).get(key) or ""
sys.stdout.write(value if isinstance(value, str) else "")
' "$1"
      ;;
    node)
      printf '%s' "$HOOK_PAYLOAD" | node -e '
        const key = process.argv[1];
        let d = "";
        process.stdin.on("data", c => (d += c)).on("end", () => {
          try {
            const j = JSON.parse(d || "{}");
            const v = (j.tool_input && j.tool_input[key]) || "";
            process.stdout.write(typeof v === "string" ? v : "");
          } catch { process.stdout.write(""); }
        });
      ' "$1"
      ;;
    *)
      _json_field_bash "$1"
      ;;
  esac
}

# Marcadores de raiz de projeto, do mais específico ao mais genérico. A lista é
# a única coisa neste arquivo que conhece ecossistema — e conhece só o nome do
# arquivo que marca a raiz, nunca um comando.
PROJECT_MARKERS="go.mod go.work package.json pyproject.toml setup.py Cargo.toml pom.xml build.gradle build.gradle.kts composer.json Gemfile mix.exs Makefile"

# Sobe a partir de um caminho até achar a raiz do projeto.
# `-e` no .git porque num worktree ele é um arquivo.
project_root_of() {
  dir="$(cd "$(dirname "$1")" 2>/dev/null && pwd)" || return 1
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    [ -e "$dir/.git" ] && { printf '%s' "$dir"; return 0; }
    for marker in $PROJECT_MARKERS; do
      [ -f "$dir/$marker" ] && { printf '%s' "$dir"; return 0; }
    done
    dir="$(dirname "$dir")"
  done
  return 1
}

# Raiz do workspace (a pasta que contém este .claude/).
workspace_root() {
  cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd
}
