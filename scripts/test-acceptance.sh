#!/usr/bin/env bash
# Runs the acceptance tests: the Maestro flows against the app started with the documented start
# command (`yarn stack`, which also installs the dependencies on a fresh clone), then the unit
# tests. CI runs exactly this.
#
#   yarn test:acceptance
#
# JUnit reports land in $OG_RUN_DIR (default: test-results/):
#   junit/unit.xml       — Jest
#   maestro/report.xml   — Maestro, with each flow's evidence under maestro/
# The start command's console is kept in stack.log beside them.
#
# Exits non-zero when any test failed or the stack could not be started.
set -uo pipefail

cd "$(dirname "$0")/.."

OUT="${OG_RUN_DIR:-test-results}"
mkdir -p "$OUT/junit" "$OUT/maestro"
OUT="$(cd "$OUT" && pwd)"

APP_ID="$(node -p "require('./app.json').expo.android.package")"
CONTENT_TITLE="$(node -p "require('./src/content/app.json').title")"
say() { printf '[acceptance] %s\n' "$*"; }

status=0

# -------------------------------------------------------------------- maestro
MAESTRO="$(command -v maestro || true)"
[ -z "$MAESTRO" ] && [ -x "$HOME/.maestro/bin/maestro" ] && MAESTRO="$HOME/.maestro/bin/maestro"
if [ -z "$MAESTRO" ]; then
  say "ERROR: Maestro is not installed (curl -Ls https://get.maestro.mobile.dev | bash)"
  exit 1
fi

say "starting the stack with: yarn stack (console: $OUT/stack.log)"
yarn -s stack >"$OUT/stack.log" 2>&1 &
STACK_PID=$!
stop_stack() {
  if kill -0 "$STACK_PID" 2>/dev/null; then
    say "stopping the stack"
    kill -TERM "$STACK_PID" 2>/dev/null || true
    wait "$STACK_PID" 2>/dev/null || true
  fi
}
trap stop_stack EXIT

# The same SDK lookup as scripts/stack.sh.
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$SDK" ] && [ -d "$HOME/Library/Android/sdk" ]; then SDK="$HOME/Library/Android/sdk"; fi
if [ -z "$SDK" ] && [ -d "$HOME/Android/Sdk" ]; then SDK="$HOME/Android/Sdk"; fi
ADB="$SDK/platform-tools/adb"
ready=""
for _ in $(seq 1 1200); do
  kill -0 "$STACK_PID" 2>/dev/null || break
  if curl -fs "http://localhost:8081/status" 2>/dev/null | grep -q 'packager-status:running' &&
    [ -n "$("$ADB" shell pidof "$APP_ID" 2>/dev/null | tr -d '\r')" ]; then
    ready=1
    break
  fi
  sleep 1
done
if [ -z "$ready" ]; then
  say "ERROR: the app was not running after the start command (it exited, or 20 minutes passed):"
  tail -n 40 "$OUT/stack.log"
  status=1
else
  say "maestro flows"
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$OUT/maestro/report.xml" \
    --test-output-dir "$OUT/maestro" \
    -e APP_ID="$APP_ID" \
    -e CONTENT_TITLE="$CONTENT_TITLE" \
    tests/maestro; then
    status=1
  fi
fi
stop_stack

# ------------------------------------------------------------------ unit tests
say "unit tests"
if ! JEST_JUNIT_OUTPUT_DIR="$OUT/junit" JEST_JUNIT_OUTPUT_NAME=unit.xml \
  yarn -s jest --ci --reporters=default --reporters=jest-junit; then
  status=1
fi

exit "$status"
