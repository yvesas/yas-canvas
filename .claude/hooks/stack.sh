#!/usr/bin/env bash
# Resolve os comandos de um projeto: formatar, lintar, verificar, testar.
#
# O baseline não sabe em que linguagem o seu projeto é escrito, e fingir que
# sabe é justamente o que quebrava antes — um hook que só falava `npx prettier`
# vira no-op silencioso num repo Go, que é pior do que não existir.
#
# Duas fontes, nesta ordem:
#
#   1. `.claude/stack.env` do projeto — a fonte da verdade. Escrito pelo
#      agente via /stack (ou à mão), versionado, e o instalador NUNCA o
#      sobrescreve: é do projeto, não do baseline.
#   2. Detecção pelo marcador do ecossistema (go.mod, package.json, …), com os
#      comandos padrão daquela linguagem.
#
# Sem nenhuma das duas, todas as variáveis ficam vazias e o hook vira no-op —
# em silêncio de propósito: linguagem que o baseline não conhece não deve virar
# aviso a cada edição.
#
# Variáveis resolvidas: STACK · FMT_EXTS · FMT_CMD · LINT_CMD · CHECK_CMD · TEST_CMD

STACK=""
FMT_EXTS=""
FMT_CMD=""
LINT_CMD=""
CHECK_CMD=""
TEST_CMD=""

stack_reset() {
  STACK=""
  FMT_EXTS=""
  FMT_CMD=""
  LINT_CMD=""
  CHECK_CMD=""
  TEST_CMD=""
}

# O binário do template existe nesta máquina? Um linter não instalado é motivo
# para pular, nunca para falhar: quem não tem golangci-lint continua editando.
stack_cmd_available() {
  set -- $1
  [ -n "${1:-}" ] || return 1
  command -v "$1" >/dev/null 2>&1
}

# Aplica os placeholders do template: {file} é o arquivo editado, {dir} a pasta
# dele. Template sem placeholder roda como está (`go vet ./...` não recebe
# arquivo). O {dir} existe porque nem todo linter aceita arquivo solto —
# golangci-lint linta pacote, e pacote é diretório.
stack_render() {
  rendered="${1//\{file\}/$2}"
  printf '%s' "${rendered//\{dir\}/$3}"
}

_detect_node_pm() {
  root="$1"
  [ -f "$root/pnpm-lock.yaml" ] && { printf 'pnpm'; return; }
  [ -f "$root/yarn.lock" ] && { printf 'yarn'; return; }
  [ -f "$root/bun.lockb" ] && { printf 'bun'; return; }
  printf 'npm'
}

detect_stack() {
  root="$1"
  stack_reset

  if [ -f "$root/go.mod" ] || [ -f "$root/go.work" ]; then
    STACK="go"
    FMT_EXTS="go"
    FMT_CMD="gofmt -w {file}"
    command -v golangci-lint >/dev/null 2>&1 && LINT_CMD="golangci-lint run ./{dir}"
    CHECK_CMD="go build ./... && go vet ./..."
    TEST_CMD="go test ./..."
    return 0
  fi

  if [ -f "$root/package.json" ]; then
    pm="$(_detect_node_pm "$root")"
    STACK="node/$pm"
    FMT_EXTS="ts tsx js jsx mjs cjs mts cts json css scss md"
    FMT_CMD="npx --no-install prettier --write {file}"
    LINT_CMD="npx --no-install eslint --fix {file}"
    TEST_CMD="$pm test"
    # O script do projeto manda; o `tsc` direto é o plano B, e só faz sentido
    # onde há tsconfig.
    if grep -q '"typecheck"' "$root/package.json" 2>/dev/null; then
      CHECK_CMD="$pm run --silent typecheck"
    elif [ -f "$root/tsconfig.json" ]; then
      CHECK_CMD="npx --no-install tsc --noEmit"
    fi
    return 0
  fi

  if [ -f "$root/pyproject.toml" ] || [ -f "$root/setup.py" ] || [ -f "$root/requirements.txt" ]; then
    STACK="python"
    FMT_EXTS="py pyi"
    if command -v ruff >/dev/null 2>&1; then
      FMT_CMD="ruff format {file}"
      LINT_CMD="ruff check --fix {file}"
    elif command -v black >/dev/null 2>&1; then
      FMT_CMD="black --quiet {file}"
    fi
    command -v mypy >/dev/null 2>&1 && CHECK_CMD="mypy ."
    TEST_CMD="pytest"
    return 0
  fi

  if [ -f "$root/Cargo.toml" ]; then
    STACK="rust"
    FMT_EXTS="rs"
    FMT_CMD="rustfmt --edition 2021 {file}"
    LINT_CMD="cargo clippy --quiet"
    CHECK_CMD="cargo check --quiet"
    TEST_CMD="cargo test"
    return 0
  fi

  return 0
}

# Carrega a configuração do projeto em $1.
#
# O `.` num arquivo do repo executa o que estiver lá — é o mesmo nível de
# confiança de rodar os testes do projeto, e por isso o stack.env é versionado
# e revisado como qualquer outro arquivo, não gerado em tempo de execução.
load_stack() {
  root="$1"
  stack_reset

  if [ -f "$root/.claude/stack.env" ]; then
    # shellcheck disable=SC1091
    . "$root/.claude/stack.env"
    [ -n "$STACK" ] || STACK="stack.env"
    return 0
  fi

  detect_stack "$root"
}
