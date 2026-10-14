#!/usr/bin/env bash
# Runs the acceptance tests. CI runs exactly this.
#
#   yarn test:acceptance
#
# 1. the release APK: built and signed with a throwaway key generated for this run and passed
#    through the KQ_UPLOAD_* variables, which win over the Gradle properties of the same names
#    (DEC-45) — the real upload key stays with Maciej (DEC-09, DEC-44),
#    then checked with apksigner and aapt (AC-01-01-5, AC-01-01-3), and its embedded bundle for
#    the shipped content (AC-01-02-7);
# 2. the flows tagged `debug-build` — TC-00-01 only, the one test of the debug start itself — against
#    the app started with the documented start command (`yarn stack` = `bash scripts/stack.sh`,
#    which also installs the dependencies on a fresh clone): the debug build, its JavaScript served
#    by Metro;
# 3. every other flow (TC-00-03, TC-01-01, AC-01-01-4 offline, and any new flow by default) against
#    that release APK, installed on the device with Metro stopped. The debug build crashes
#    intermittently on `launchApp: clearState` (a native SIGSEGV on the JS thread mqt_v_js right
#    after `Running "main"`, about 1 flow in 6 per run, a different flow each time), so the owner
#    decided on 2026-10-15 that the flows run on the release build; offline, only the release build
#    can start at all (a debug build needs Metro);
# 4. the unit tests.
#
# JUnit reports land in $OG_RUN_DIR (default: test-results/):
#   junit/unit.xml               — Jest
#   junit/release.xml            — the release APK's checks (steps 1 and 3)
#   junit/screen.xml             — TC-02-02 step 2, the category entries' width (step 2)
#   maestro/report.xml           — Maestro on the debug build (TC-00-01), evidence under maestro/
#   maestro/report-release.xml   — Maestro on the release build (all other flows), evidence under
#                                  maestro/release/
# The consoles are kept beside them: release-build.log, stack.log; the APK checks under release/.
#
# Needs a running Android device (the emulator CI boots, or one you start first): the release
# APK is installed and its flows run on it after the stack stops, so it must outlive the start command. Exits at once when
# none is attached.
#
# Exits non-zero when any test failed or the stack could not be started.
set -uo pipefail

cd "$(dirname "$0")/.."

OUT="${OG_RUN_DIR:-test-results}"
mkdir -p "$OUT/junit" "$OUT/maestro" "$OUT/release"
OUT="$(cd "$OUT" && pwd)"

APP_ID="$(node -p "require('./app.json').expo.android.package")"
CONTENT_TITLE="$(node -p "require('./src/content/app.json').title")"
# TC-02-01, TC-02-02: the labels 3+, 4+, 5+ the shipped decks hold, in that order, as Maestro
# patterns (3\+) — CATEGORIES, comma-separated — and how many (CATEGORY_COUNT); 3+ alone until
# US-01-03 and US-01-04 ship 4+ and 5+ (DEC-48).
CATEGORY_ARGS=()
while read -r arg; do CATEGORY_ARGS+=(-e "$arg"); done < <(node -e '
  const fs = require("fs");
  const dir = "src/content/decks";
  const shipped = fs.readdirSync(dir).filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8")).category);
  const expected = ["3+", "4+", "5+"].filter(c => shipped.includes(c));
  console.log(`CATEGORIES=${expected.map(c => c.replace("+", "\\+")).join(",")}`);
  console.log(`CATEGORY_COUNT=${expected.length}`);
')
say() { printf '[acceptance] %s\n' "$*"; }

status=0

# The same SDK lookup as scripts/stack.sh.
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$SDK" ] && [ -d "$HOME/Library/Android/sdk" ]; then SDK="$HOME/Library/Android/sdk"; fi
if [ -z "$SDK" ] && [ -d "$HOME/Android/Sdk" ]; then SDK="$HOME/Android/Sdk"; fi
export ANDROID_HOME="$SDK"
ADB="$SDK/platform-tools/adb"
BUILD_TOOLS="$SDK/build-tools/$(ls "$SDK/build-tools" 2>/dev/null | sort -V | tail -n 1)"

# Started by the stack, the emulator would be stopped with it — before the release flows run.
if [ -z "$("$ADB" devices 2>/dev/null | awk 'NR > 1 && $2 == "device" { print $1; exit }')" ]; then
  say "ERROR: no Android device is attached — start the Android 12 emulator first, then run yarn test:acceptance"
  exit 1
fi

# Step 1 runs expo before the start command would install anything: the same check as stack.sh.
if [ ! -d node_modules ] || [ yarn.lock -nt node_modules/.yarn-integrity ]; then
  say "installing dependencies"
  yarn install --frozen-lockfile || { say "ERROR: yarn install failed"; exit 1; }
fi

STACK_PID=""
KEY_DIR=""
stop_stack() {
  if [ -n "$STACK_PID" ] && kill -0 "$STACK_PID" 2>/dev/null; then
    say "stopping the stack"
    kill -TERM "$STACK_PID" 2>/dev/null || true
    wait "$STACK_PID" 2>/dev/null || true
  fi
  STACK_PID=""
}
on_exit() {
  stop_stack
  if [ -n "$KEY_DIR" ]; then rm -rf "$KEY_DIR"; fi
  if [ -x android/gradlew ]; then (cd android && ./gradlew --stop >/dev/null 2>&1) || true; fi
}
trap on_exit EXIT

# ------------------------------------------------------- JUnit for the shell checks
CASES=""
CASES_RUN=0
CASES_FAILED=0
xml_escape() { sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'; }
# record <name> <ok|fail> [why]
record() {
  local name what
  name="$(printf '%s' "$1" | xml_escape)"
  CASES_RUN=$((CASES_RUN + 1))
  if [ "$2" = ok ]; then
    say "pass: $1"
    CASES="$CASES    <testcase classname=\"release-apk\" name=\"$name\"/>"$'\n'
  else
    say "FAIL: $1 — $3"
    what="$(printf '%s' "$3" | xml_escape)"
    CASES_FAILED=$((CASES_FAILED + 1))
    CASES="$CASES    <testcase classname=\"release-apk\" name=\"$name\"><failure message=\"$what\"/></testcase>"$'\n'
    status=1
  fi
}
write_junit() {
  {
    printf '<?xml version="1.0" encoding="UTF-8"?>\n'
    printf '<testsuites>\n  <testsuite name="release-apk" tests="%s" failures="%s">\n' "$CASES_RUN" "$CASES_FAILED"
    printf '%s' "$CASES"
    printf '  </testsuite>\n</testsuites>\n'
  } >"$OUT/junit/release.xml"
}

# ---------------------------------------------------------------- 1. release APK
STEP4="AC-01-01-5 step 4 — a release APK is built, signed with a key from outside the repository passed through KQ_UPLOAD_*"
STEP5="AC-01-01-5 step 5 — apksigner verifies the APK's signature, made with that key and not the debug key"
STEP6="AC-01-01-5 step 6 — the APK installs on Android 12 (API 31) and newer only (sdkVersion 31)"
CONTENT="AC-01-02-7 step 2 — the release APK's embedded JavaScript bundle holds every deck's questions and answers, in Polish and English"
PERMS="AC-01-01-3 step 2 — the built release APK declares no INTERNET, ACCESS_NETWORK_STATE or ACCESS_WIFI_STATE permission"
PRE="AC-01-01-4 precondition — the release build with its JavaScript embedded is installed and no bundler is reachable"
POST="AC-01-01-4 the app loaded no code from a bundler (logcat)"
KEY_DN="CN=knowledge-quiz throwaway acceptance key"
RELEASE_APK="android/app/build/outputs/apk/release/app-release.apk"

say "release APK, signed with a throwaway key (console: $OUT/release-build.log)"
KEY_DIR="$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/kq-throwaway-key.XXXXXX")"
key_pass="$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 24)"
built=""
# The password through keytool's environment, not its command line.
if ! KQ_THROWAWAY_PASS="$key_pass" keytool -genkeypair -noprompt -storetype PKCS12 \
  -keystore "$KEY_DIR/upload.p12" -alias kq-throwaway -keyalg RSA -keysize 2048 -validity 2 \
  -dname "$KEY_DN" -storepass:env KQ_THROWAWAY_PASS -keypass:env KQ_THROWAWAY_PASS \
  >"$OUT/release-build.log" 2>&1; then
  record "$STEP4" fail "keytool could not generate the throwaway key (release-build.log)"
else
  rm -rf android/app/build/outputs/apk/release
  if CI=1 node_modules/.bin/expo prebuild --platform android --no-install >>"$OUT/release-build.log" 2>&1 &&
    (cd android && KQ_UPLOAD_STORE_FILE="$KEY_DIR/upload.p12" KQ_UPLOAD_STORE_PASSWORD="$key_pass" \
      KQ_UPLOAD_KEY_ALIAS=kq-throwaway KQ_UPLOAD_KEY_PASSWORD="$key_pass" \
      ./gradlew assembleRelease --console=plain) >>"$OUT/release-build.log" 2>&1 &&
    [ -f "$RELEASE_APK" ]; then
    built=1
    record "$STEP4" ok
  else
    record "$STEP4" fail "the release build failed (end of release-build.log: $(tail -n 3 "$OUT/release-build.log" | tr '\n' ' '))"
  fi
fi
rm -rf "$KEY_DIR"
KEY_DIR=""
unset key_pass

if [ -z "$built" ]; then
  for name in "$STEP5" "$STEP6" "$PERMS" "$CONTENT"; do record "$name" fail "no release APK was built"; done
else
  "$BUILD_TOOLS/apksigner" verify --print-certs "$RELEASE_APK" >"$OUT/release/apksigner.txt" 2>&1
  signed=$?
  if [ "$signed" -ne 0 ]; then
    record "$STEP5" fail "apksigner verify exited $signed (release/apksigner.txt)"
  elif ! grep -q "certificate DN: $KEY_DN" "$OUT/release/apksigner.txt" ||
    grep -q 'CN=Android Debug' "$OUT/release/apksigner.txt"; then
    record "$STEP5" fail "the APK is not signed with the key passed in (release/apksigner.txt)"
  else
    record "$STEP5" ok
  fi

  "$BUILD_TOOLS/aapt" dump badging "$RELEASE_APK" >"$OUT/release/badging.txt" 2>&1
  if grep -qx "sdkVersion:'31'" "$OUT/release/badging.txt"; then
    record "$STEP6" ok
  else
    record "$STEP6" fail "aapt reports $(grep '^sdkVersion' "$OUT/release/badging.txt" || echo 'no sdkVersion') (release/badging.txt)"
  fi

  "$BUILD_TOOLS/aapt" dump permissions "$RELEASE_APK" >"$OUT/release/permissions.txt" 2>&1
  network="$(grep -oE "android\.permission\.(INTERNET|ACCESS_NETWORK_STATE|ACCESS_WIFI_STATE)" "$OUT/release/permissions.txt" | sort -u | tr '\n' ' ')"
  if ! grep -q '^package:' "$OUT/release/permissions.txt"; then
    record "$PERMS" fail "aapt could not read the APK (release/permissions.txt)"
  elif [ -n "$network" ]; then
    record "$PERMS" fail "the APK declares $network(release/permissions.txt)"
  else
    record "$PERMS" ok
  fi

  if ! unzip -p "$RELEASE_APK" assets/index.android.bundle >"$OUT/release/index.android.bundle" 2>/dev/null ||
    [ ! -s "$OUT/release/index.android.bundle" ]; then
    record "$CONTENT" fail "the APK has no embedded JavaScript bundle"
  elif node scripts/check-bundle-content.js "$OUT/release/index.android.bundle" >"$OUT/release/bundle-content.txt" 2>&1; then
    record "$CONTENT" ok
  else
    record "$CONTENT" fail "$(head -n 1 "$OUT/release/bundle-content.txt") (release/bundle-content.txt)"
  fi
fi

# ---------------------------------------------------------- 2. debug build, Maestro
MAESTRO="$(command -v maestro || true)"
[ -z "$MAESTRO" ] && [ -x "$HOME/.maestro/bin/maestro" ] && MAESTRO="$HOME/.maestro/bin/maestro"
if [ -z "$MAESTRO" ]; then
  say "ERROR: Maestro is not installed (curl -Ls https://get.maestro.mobile.dev | bash)"
  record "$PRE" fail "Maestro is not installed (curl -Ls https://get.maestro.mobile.dev | bash)"
  status=1
else
  # A copy of the app left on the device would satisfy the readiness check below before the
  # start command has installed anything: remove it, so the flows run against this build.
  "$ADB" uninstall "$APP_ID" >/dev/null 2>&1 || true

  # stack.sh itself (what `yarn stack` runs), not through yarn: yarn 1 does not wait for its
  # child on SIGTERM, so the stack's cleanup (bundler, Gradle daemon, emulator) would be cut short.
  say "starting the stack with: bash scripts/stack.sh (console: $OUT/stack.log)"
  bash scripts/stack.sh >"$OUT/stack.log" 2>&1 &
  STACK_PID=$!

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
    say "maestro flows on the debug build"
    if ! "$MAESTRO" test \
      --format JUNIT \
      --output "$OUT/maestro/report.xml" \
      --test-output-dir "$OUT/maestro" \
      --include-tags debug-build \
      -e APP_ID="$APP_ID" \
      -e CONTENT_TITLE="$CONTENT_TITLE" \
      "${CATEGORY_ARGS[@]}" \
      tests/maestro; then
      status=1
    fi

    # TC-02-02 step 2: each category entry's bounds, from the accessibility layer, against the
    # screen's width (the override if one is set) — a width Maestro cannot select by (DEC-48).
    say "TC-02-02 step 2: the category entries' width"
    screen_width="$("$ADB" shell wm size | tr -d '\r' | awk -F'[ x]' '/^Physical size/ { p = $3 } /^Override size/ { o = $3 } END { print o ? o : p }')"
    "$ADB" shell am force-stop "$APP_ID" >/dev/null 2>&1
    "$ADB" shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
    for _ in $(seq 1 60); do
      "$ADB" shell uiautomator dump /sdcard/kq-ui.xml >/dev/null 2>&1 &&
        "$ADB" exec-out cat /sdcard/kq-ui.xml >"$OUT/maestro/TC-02-02-hierarchy.txt" 2>/dev/null
      grep -q 'resource-id="category-0"' "$OUT/maestro/TC-02-02-hierarchy.txt" 2>/dev/null && break
      sleep 1
    done
    if ! node scripts/check-full-width.js "$OUT/maestro/TC-02-02-hierarchy.txt" "$screen_width" \
      "$(printf '%s\n' "${CATEGORY_ARGS[@]}" | sed -n 's/^CATEGORY_COUNT=//p')" "$OUT/junit/screen.xml"; then
      status=1
    fi
  fi
  stop_stack

  # -------------------------------------------------- 3. release build, Maestro
  # Every flow not tagged `debug-build`. Metro is stopped and the port forwarding
  # `expo run:android` set up (adb reverse, which airplane mode does not cut) is removed: nothing on
  # the device can reach a bundler. The app must run the JavaScript embedded in the APK. The
  # release APK has the debug build's package, so `launchApp` / `clearState` reach it by APP_ID.
  if [ -z "$built" ]; then
    record "$PRE" fail "no release APK was built"
  elif ! "$ADB" get-state >/dev/null 2>&1; then
    record "$PRE" fail "no device is attached after the stack stopped"
  else
    "$ADB" uninstall "$APP_ID" >/dev/null 2>&1 || true
    "$ADB" reverse --remove-all >/dev/null 2>&1 || true
    why=""
    "$ADB" install "$RELEASE_APK" >"$OUT/release/install.txt" 2>&1 || why="adb install failed (release/install.txt)"
    # Into files first: with pipefail, `grep -q` closing a pipe early fails the pipeline.
    unzip -l "$RELEASE_APK" >"$OUT/release/apk-contents.txt" 2>&1
    "$ADB" shell dumpsys package "$APP_ID" >"$OUT/release/installed-package.txt" 2>&1
    if [ -z "$why" ] && ! grep -q 'assets/index\.android\.bundle$' "$OUT/release/apk-contents.txt"; then
      why="the APK has no embedded JavaScript bundle (release/apk-contents.txt)"
    fi
    if [ -z "$why" ] && ! grep -q 'pkgFlags=' "$OUT/release/installed-package.txt"; then
      why="the app is not installed (release/installed-package.txt)"
    fi
    if [ -z "$why" ] && grep -q 'pkgFlags=.*DEBUGGABLE' "$OUT/release/installed-package.txt"; then
      why="the installed app is a debuggable build (release/installed-package.txt)"
    fi
    if [ -z "$why" ] && curl -fs --max-time 3 "http://localhost:8081/status" >/dev/null 2>&1; then
      why="a bundler still answers on localhost:8081"
    fi
    if [ -z "$why" ] && [ -n "$("$ADB" reverse --list 2>/dev/null)" ]; then
      why="adb reverse still forwards ports to the host: $("$ADB" reverse --list | tr '\n' ' ')"
    fi
    if [ -n "$why" ]; then
      record "$PRE" fail "$why"
    else
      record "$PRE" ok
      "$ADB" logcat -c >/dev/null 2>&1 || true
      say "maestro flows on the release build"
      if ! "$MAESTRO" test \
        --format JUNIT \
        --output "$OUT/maestro/report-release.xml" \
        --test-output-dir "$OUT/maestro/release" \
        --exclude-tags debug-build \
        -e APP_ID="$APP_ID" \
        -e CONTENT_TITLE="$CONTENT_TITLE" \
        tests/maestro; then
        status=1
      fi
      "$ADB" logcat -d >"$OUT/release/AC-01-01-4-logcat.txt" 2>&1
      # What a React Native debug build logs when it looks for its bundler.
      if grep -qE 'Unable to load script|isMetroRunning|DevServerHelper|(10\.0\.2\.2|localhost):8081' \
        "$OUT/release/AC-01-01-4-logcat.txt"; then
        record "$POST" fail "logcat shows the app looking for a bundler (release/AC-01-01-4-logcat.txt)"
      else
        record "$POST" ok
      fi
    fi
    # The flow switches the network back on itself; this covers a flow that never ran.
    "$ADB" shell cmd connectivity airplane-mode disable >/dev/null 2>&1 || true
    "$ADB" uninstall "$APP_ID" >/dev/null 2>&1 || true
  fi
fi
write_junit

# ------------------------------------------------------------------ 4. unit tests
say "unit tests"
if ! JEST_JUNIT_OUTPUT_DIR="$OUT/junit" JEST_JUNIT_OUTPUT_NAME=unit.xml \
  yarn -s jest --ci --reporters=default --reporters=jest-junit; then
  status=1
fi

exit "$status"
