#!/usr/bin/env bash
# Starts the whole stack: the app on an Android emulator, with its Metro bundler.
#
#   yarn stack
#
# 1. checks the tools it needs and says what is missing;
# 2. installs the dependencies when they are missing or out of date;
# 3. uses the running emulator, or boots one (KQ_AVD names it; otherwise an Android 12 AVD);
# 4. builds the app, installs it, opens it and keeps the bundler running.
#
# Ctrl-C (or SIGTERM) stops the bundler and the Gradle daemon, and the emulator too when this
# script booted it — nothing it started keeps running.
set -euo pipefail

cd "$(dirname "$0")/.."

say() { printf '[stack] %s\n' "$*"; }
fail() {
  printf '[stack] ERROR: %s\n' "$*" >&2
  exit 1
}

# ---------------------------------------------------------------- 1. tools
missing=()
command -v node >/dev/null 2>&1 || missing+=("Node.js 22 or newer (https://nodejs.org)")
command -v yarn >/dev/null 2>&1 || missing+=("Yarn 1 (npm install -g yarn@1.22.22)")
command -v java >/dev/null 2>&1 || missing+=("a JDK 17 or newer (java on the PATH)")
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$SDK" ] && [ -d "$HOME/Library/Android/sdk" ]; then SDK="$HOME/Library/Android/sdk"; fi
if [ -z "$SDK" ] && [ -d "$HOME/Android/Sdk" ]; then SDK="$HOME/Android/Sdk"; fi
if [ -z "$SDK" ] || [ ! -d "$SDK" ]; then
  missing+=("the Android SDK (set ANDROID_HOME; Android Studio installs it)")
else
  export ANDROID_HOME="$SDK"
  [ -x "$SDK/platform-tools/adb" ] || missing+=("Android SDK platform-tools (adb) in $SDK")
fi
if [ ${#missing[@]} -gt 0 ]; then
  printf '[stack] ERROR: missing:\n' >&2
  printf '  - %s\n' "${missing[@]}" >&2
  exit 1
fi
ADB="$ANDROID_HOME/platform-tools/adb"
EMULATOR="$ANDROID_HOME/emulator/emulator"

# ---------------------------------------------------------- 2. dependencies
if [ ! -d node_modules ] || [ yarn.lock -nt node_modules/.yarn-integrity ]; then
  say "installing dependencies"
  yarn install --frozen-lockfile
fi

# --------------------------------------------------------------- 3. device
EMULATOR_PID=""
EMULATOR_LOG=""
APP_PID=""
cleanup() {
  trap - EXIT INT TERM
  if [ -n "$APP_PID" ] && kill -0 "$APP_PID" 2>/dev/null; then
    say "stopping the bundler"
    pkill -TERM -P "$APP_PID" 2>/dev/null || true
    kill -TERM "$APP_PID" 2>/dev/null || true
    wait "$APP_PID" 2>/dev/null || true
  fi
  if [ -x android/gradlew ]; then
    say "stopping the Gradle daemon"
    (cd android && ./gradlew --stop >/dev/null 2>&1) || true
  fi
  if [ -n "$EMULATOR_PID" ]; then
    say "stopping the emulator this script started"
    "$ADB" emu kill >/dev/null 2>&1 || kill -TERM "$EMULATOR_PID" 2>/dev/null || true
  fi
  if [ -n "$EMULATOR_LOG" ]; then rm -f "$EMULATOR_LOG"; fi
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

running_device() { "$ADB" devices | awk 'NR > 1 && $2 == "device" { print $1; exit }'; }

if [ -n "$(running_device)" ]; then
  say "using the running device $(running_device)"
else
  [ -x "$EMULATOR" ] || fail "no device is running and the Android emulator is not installed in $ANDROID_HOME/emulator"
  AVD="${KQ_AVD:-}"
  if [ -z "$AVD" ]; then
    for candidate in $("$EMULATOR" -list-avds 2>/dev/null); do
      config="$HOME/.android/avd/$candidate.avd/config.ini"
      if grep -qE '^image\.sysdir\.1=system-images/android-3[12]/' "$config" 2>/dev/null; then
        AVD="$candidate"
        break
      fi
    done
  fi
  [ -n "$AVD" ] || fail "no device is running and no Android 12 (API 31) AVD was found — create one in Android Studio (Device Manager), or name an AVD with KQ_AVD=<name>"
  tmp="${TMPDIR:-/tmp}"
  EMULATOR_LOG="$(mktemp "${tmp%/}/kq-emulator.XXXXXX")"
  say "booting the emulator $AVD (its console: $EMULATOR_LOG)"
  "$EMULATOR" -avd "$AVD" -no-snapshot-save -no-boot-anim >"$EMULATOR_LOG" 2>&1 &
  EMULATOR_PID=$!
  emulator_failed() {
    printf '[stack] ERROR: %s — the end of its console:\n' "$1" >&2
    tail -n 20 "$EMULATOR_LOG" >&2
    EMULATOR_LOG="" # kept: the error names it
    exit 1
  }
  booted=""
  for _ in $(seq 1 300); do
    kill -0 "$EMULATOR_PID" 2>/dev/null || {
      EMULATOR_PID=""
      emulator_failed "the emulator $AVD exited while booting"
    }
    if [ -n "$(running_device)" ] &&
      [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; then
      booted=1
      break
    fi
    sleep 1
  done
  [ -n "$booted" ] || emulator_failed "the emulator $AVD did not finish booting in 5 minutes"
fi

# ------------------------------------------------------ 4. build, install, run
say "building the app, installing it and starting the bundler"
yarn expo run:android &
APP_PID=$!
wait "$APP_PID"
