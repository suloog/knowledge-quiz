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
#    that release APK, installed on the device with Metro stopped. The flows tagged
#    `device-language` (the cards, TC-03-01…TC-03-05, TC-03-07…TC-03-10, TC-03-16, TC-03-17, the
#    continue entry, TC-02-05…TC-02-07, and the language switch, TC-02-10 and TC-02-12) run after
#    the others, on the device set to Polish — their test data; TC-02-11 (tagged
#    `other-device-language`) runs last, on the device set to German (DEC-60). Every one of these
#    flows is given the app's own words (STRINGS) and the 3+ deck's questions and answers in both
#    languages, for the language switch (US-02-03).
#    TC-03-11 (tagged `saved-deck`) runs on its own, still in Polish, after its saved deck has been
#    made unreadable as root (DEC-55); so does each of TC-03-12…TC-03-15 (the end card, also tagged
#    `saved-deck`), after its saved deck has been written one card from its end (DEC-56); so do TC-02-08
#    (`saved-deck`: the 3+ deck saved finished and used last) and TC-02-09 (`saved-deck`: every saved
#    file made unreadable), each after its saved data has been written as root (DEC-59); so does each of
#    TC-03-20…TC-03-22 (the illustrations, tagged `illustration`), after its saved 3+ deck has been
#    written with the question it needs first, TC-03-22 switching the device to English in the middle
#    of its flow (DEC-66). TC-03-18,
#    TC-03-19 and TC-02-13 (tagged `deck-state`) run after the Polish flows, still in Polish, with
#    scripts/saved-deck-server.js reading the saved 3+ deck from the device as root while they run
#    (DECK_STATE_URL), for the app state their steps note (DEC-58). The device's
#    language is set as root (system locale property and setting, then a restart of the Android framework) and
#    put back afterwards. The debug build crashes
#    intermittently on `launchApp: clearState` (a native SIGSEGV on the JS thread mqt_v_js right
#    after `Running "main"`, about 1 flow in 6 per run, a different flow each time), so the owner
#    decided on 2026-10-15 that the flows run on the release build; offline, only the release build
#    can start at all (a debug build needs Metro);
# 4. the unit tests.
#
# JUnit reports land in $OG_RUN_DIR (default: test-results/):
#   junit/unit.xml               — Jest
#   junit/release.xml            — the release APK's checks (steps 1 and 3)
#   junit/screen.xml             — TC-02-02 step 2, the category entries' width (step 3)
#   junit/screen-colours.xml     — AC-02-01-4 step 4, the category screen's pixels (step 3);
#                                  skipped when the device draws one colour only (nothing rendered)
#   junit/continue-screen-colours.xml
#                                — the same check on the screen with the continue entry, before
#                                  TC-02-08 runs (NFR-07); evidence under maestro/release-continue/TC-02-08/
#   maestro/report.xml           — Maestro on the debug build (TC-00-01), evidence under maestro/
#   maestro/report-release.xml   — Maestro on the release build (all other flows), evidence under
#                                  maestro/release/
#   maestro/report-release-pl.xml, maestro/report-release-de.xml
#                                — the `device-language` flows on the device set to Polish, and
#                                  TC-02-11 on it set to German; evidence under maestro/release-pl/
#                                  and maestro/release-de/
#   maestro/report-release-deck-state.xml
#                                — TC-03-18, TC-03-19, TC-02-13 on the device set to Polish; evidence under
#                                  maestro/release-deck-state/, the saved deck each step read beside it
#   maestro/report-release-saved-deck.xml
#                                — TC-03-11, evidence (the saved deck before and after) under
#                                  maestro/release-saved-deck/
#   maestro/report-release-TC-03-12.xml … report-release-TC-03-15.xml
#                                — the end card, one flow each; evidence (the saved deck written,
#                                  before and after) under maestro/release-end-card/<TC>/
#   maestro/report-release-TC-02-08.xml, report-release-TC-02-09.xml
#                                — the continue entry on saved data written as root; evidence (the
#                                  saved files written and read back) under maestro/release-continue/<TC>/
#   maestro/report-release-TC-03-20.xml … report-release-TC-03-22.xml
#                                — the illustrations, one flow each; evidence (the saved deck written
#                                  and read back) under maestro/release-illustrations/<TC>/, where
#                                  each picture was found on the screen beside them
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
# TC-02-01, TC-02-02: the categories expected on screen, in order — the labels MOD-02-F02 names,
# literally "3+", "4+", "5+" (DEC-48), then any other label the shipped decks hold, by its leading
# age — as Maestro patterns (3\+), comma-separated (CATEGORIES), and how many (CATEGORY_COUNT).
CATEGORY_ARGS=()
while read -r arg; do CATEGORY_ARGS+=(-e "$arg"); done < <(node -e '
  const fs = require("fs");
  const dir = "src/content/decks";
  const known = ["3+", "4+", "5+"];
  const age = c => { const n = Number.parseInt(c, 10); return Number.isNaN(n) ? Number.MAX_SAFE_INTEGER : n; };
  const shipped = fs.readdirSync(dir).filter(f => f.endsWith(".json")).sort()
    .map(f => JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8")).category);
  const expected = [...known, ...shipped.filter(c => !known.includes(c)).sort((a, b) => age(a) - age(b))];
  console.log(`CATEGORIES=${expected.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(",")}`);
  console.log(`CATEGORY_COUNT=${expected.length}`);
')
say() { printf '[acceptance] %s\n' "$*"; }
# The colour check on the screen with the continue entry (NFR-07), as its JUnit case is named.
CONTINUE_COLOURS="TC-02-08 step 2 — the category screen with the continue entry is drawn in #000000 and #FFFFFF only, outside the text glyphs (screencap, NFR-07)"

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

# ------------------------------------------------------- the device's language
# TC-00-03 and the flows that wait on the title: the app's title in the language the app opens in on
# first launch — Polish on a device set to Polish, English on any other (DEC-33, DEC-61) —
# read from src/content/app.json for the device's current language (CONTENT_TITLE).
device_locale() {
  local tag
  tag="$("$ADB" shell getprop persist.sys.locale 2>/dev/null | tr -d '\r')"
  [ -n "$tag" ] || tag="$("$ADB" shell getprop ro.product.locale 2>/dev/null | tr -d '\r')"
  printf '%s' "${tag:-en-US}"
}
content_title() {
  local language=en
  case "$(device_locale)" in pl*) language=pl ;; esac
  node -p "require('./src/content/app.json').title['$language']"
}
# What the language switch's flows check against (US-02-03): the app's own words in both languages
# (STRINGS, src/strings.json), the app's title in both (TITLES, src/content/app.json; DEC-61) and
# the 3+ deck's questions and answers in each, in the deck's order (JSON lists).
LANGUAGE_ARGS=(
  -e STRINGS="$(node -p "JSON.stringify(require('./src/strings.json'))")"
  -e TITLES="$(node -p "JSON.stringify(require('./src/content/app.json').title)")"
  -e PL_QUESTIONS="$(node -p "JSON.stringify(require('./src/content/decks/3-plus.json').questions.map(q => q.pl.question))")"
  -e EN_QUESTIONS="$(node -p "JSON.stringify(require('./src/content/decks/3-plus.json').questions.map(q => q.en.question))")"
  -e EN_ANSWERS="$(node -p "JSON.stringify(require('./src/content/decks/3-plus.json').questions.map(q => q.en.answer))")"
)
# blocked <what failed>: why a group of flows could not run. A device that is no longer attached
# (an emulator lost mid-run) is said as such, not mistaken for an image that cannot be rooted.
blocked() {
  if [ "$("$ADB" get-state 2>/dev/null)" != device ]; then
    say "BLOCKED: $1 (the device is no longer attached: lost mid-run)"
  else
    say "BLOCKED: $1 (adb root needs an emulator image without Google Play)"
  fi
}
# device_back: before each group of flows that needs root, the device attached, booted and rooted.
# An emulator that dropped off adb mid-run (on CI its adbd restarted under load, unrooted, and the
# groups after it were all blocked within a second) is waited for, up to three minutes, and rooted
# again, so the groups after it still run. Nothing is re-run: a flow that failed while it was gone
# stays failed. An image that cannot be rooted is not waited on: the group says so as blocked.
device_back() {
  local _
  if [ "$("$ADB" get-state 2>/dev/null)" != device ]; then
    say "the device is no longer attached: waiting for it (up to 3 minutes)"
    for _ in $(seq 1 90); do
      [ "$("$ADB" get-state 2>/dev/null)" = device ] && break
      sleep 2
    done
  fi
  for _ in $(seq 1 60); do
    [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = 1 ] && break
    sleep 2
  done
  [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" = 0 ] && return 0
  "$ADB" root >/dev/null 2>&1 || return 1
  for _ in $(seq 1 15); do
    [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" = 0 ] && return 0
    sleep 1
  done
  return 1
}
# set_device_locale <pl-PL|en-US…>: the device's system language, as root (an emulator image
# without Google Play): the locale property and the system_locales setting, then a restart of the
# Android framework, waited out until the new configuration is in force and the package manager
# answers again. The setting wins over the property when the framework starts, and a language
# changed in the running system (Settings, or SetLocale in TC-03-22) leaves it written; the
# restart waits until the settings file on disk has changed, or it would lose the new value.
set_device_locale() {
  local tag="$1" config settings_file=/data/system/users/0/settings_system.xml before
  config="-$(printf '%s' "${tag%%-*}")-r$(printf '%s' "${tag#*-}")-"
  "$ADB" root >/dev/null 2>&1 || return 1
  "$ADB" wait-for-device
  [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" = 0 ] || return 1
  if "$ADB" shell am get-config 2>/dev/null | grep -q -- "$config"; then return 0; fi
  if [ "$("$ADB" shell settings get system system_locales | tr -d '\r')" != "$tag" ]; then
    before="$("$ADB" shell md5sum "$settings_file")"
    "$ADB" shell settings put system system_locales "$tag" || return 1
    for _ in $(seq 1 40); do
      [ "$("$ADB" shell md5sum "$settings_file")" != "$before" ] && break
      sleep 0.5
    done
  fi
  "$ADB" shell "setprop persist.sys.locale $tag; setprop ctl.restart zygote" || return 1
  for _ in $(seq 1 90); do
    sleep 2
    "$ADB" shell am get-config 2>/dev/null | grep -q -- "$config" || continue
    "$ADB" shell pm path android >/dev/null 2>&1 || continue
    "$ADB" shell dumpsys window 2>/dev/null | grep -q 'mCurrentFocus=Window' || continue
    return 0
  done
  return 1
}
# run_language_flows <locale> <language> <report> <output dir> <maestro arguments…>: the flows on
# the device set to that language, given the 3+ deck's questions and answers in it (TC-03-07) and
# LANGUAGE_ARGS.
run_language_flows() {
  local tag="$1" language="$2" report="$3" dir="$4"
  shift 4
  say "maestro flows on the release build, the device set to $tag"
  if ! set_device_locale "$tag"; then
    # No results: the collector counts these flows as not run (blocked), not failed.
    blocked "could not set the device's language to $tag"
    return
  fi
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    --exclude-tags debug-build \
    -e APP_ID="$APP_ID" \
    -e LANGUAGE="$language" \
    -e CARD_QUESTIONS="$(node -p "JSON.stringify(require('./src/content/decks/3-plus.json').questions.map(q => q['$language'].question))")" \
    -e CARD_ANSWERS="$(node -p "JSON.stringify(require('./src/content/decks/3-plus.json').questions.map(q => q['$language'].answer))")" \
    "${LANGUAGE_ARGS[@]}" \
    "$@"; then
    status=1
  fi
}

# run_deck_state_flows <report> <output dir>: TC-03-18, TC-03-19, TC-02-13 — the flows tagged `deck-state`,
# with scripts/saved-deck-server.js on the host's loopback reading the saved 3+ deck from the device
# as root whenever a step notes the app state (DECK_STATE_URL); what it read is kept in the output
# dir, named after the step. The release build has no app-state bridge (DEC-55, DEC-58). Needs the
# device rooted and set to Polish, as run_language_flows leaves it.
run_deck_state_flows() {
  local report="$1" dir="$2" port=8765 server
  say "TC-03-18, TC-03-19, TC-02-13: the flows that note the saved deck, read from the device as root"
  mkdir -p "$dir"
  if [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" != 0 ]; then
    # No results: the collector counts these flows as not run (blocked), not failed.
    blocked "could not read the saved deck as root"
    return
  fi
  node scripts/saved-deck-server.js "$ADB" "$APP_ID" "$port" "$dir" &
  server=$!
  for _ in $(seq 1 20); do
    curl -fs "http://127.0.0.1:$port/" >/dev/null 2>&1 && break
    sleep 0.5
  done
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    --include-tags deck-state \
    -e APP_ID="$APP_ID" \
    -e DECK_STATE_URL="http://127.0.0.1:$port" \
    "${LANGUAGE_ARGS[@]}" \
    tests/maestro; then
    status=1
  fi
  kill "$server" 2>/dev/null || true
  wait "$server" 2>/dev/null || true
}

# run_saved_deck_flow <report> <output dir>: TC-03-11 — the saved 3+ deck replaced, as root, with
# content that is not JSON (no double quotes in it: Maestro's -e splits a value at them), in the file the app keeps it in (src/storage.ts:
# deck-3%2B.json in its private files); then the flow opens the app on it, given what the file
# holds (SAVED_DECK). The release build has no app-state bridge (DEC-55). Needs the device rooted,
# as run_language_flows leaves it.
run_saved_deck_flow() {
  local report="$1" dir="$2" home="/data/data/$APP_ID" files owner
  files="$home/files"
  say "TC-03-11: the saved 3+ deck made unreadable, then the app opened on it"
  mkdir -p "$dir"
  "$ADB" shell pm clear "$APP_ID" >/dev/null 2>&1
  owner="$("$ADB" shell stat -c %u "$home" 2>/dev/null | tr -d '\r')"
  if [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" != 0 ] || [ -z "$owner" ] ||
    ! "$ADB" shell "mkdir -p $files && printf '%s' '{order: [3p-0' >$files/deck-3%2B.json && chown -R $owner:$owner $files && restorecon -R $files"; then
    # No results: the collector counts the flow as not run (blocked), not failed.
    blocked "could not replace the saved deck as root"
    return
  fi
  "$ADB" shell cat "$files/deck-3%2B.json" >"$dir/saved-deck-before.txt" 2>&1
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    -e APP_ID="$APP_ID" \
    -e SAVED_DECK="$(cat "$dir/saved-deck-before.txt")" \
    tests/maestro/TC-03-11-unreadable-saved-deck.yaml; then
    status=1
  fi
  "$ADB" shell cat "$files/deck-3%2B.json" >"$dir/saved-deck-after.txt" 2>&1
}

# run_end_card_flow <flow> <report> <output dir>: TC-03-12…TC-03-15 — the saved 3+ deck written, as
# root, with 49 of its 50 answers revealed (its questions in data order), so the flow reaches the
# end card in one card, not fifty; then the flow, given what the saved deck holds read back from the
# device (SAVED_SEEN of SAVED_TOTAL), the last card (LAST_POSITION, LAST_QUESTION in Polish) and the
# end card's words (src/strings.json). The release build has no app-state bridge (DEC-55, DEC-56).
# TC-03-13's step 2 then checks the saved deck after "again": 0 of 50 seen, a new order. Needs the
# device rooted and set to Polish, as run_language_flows leaves it.
run_end_card_flow() {
  local flow="$1" report="$2" dir="$3" home="/data/data/$APP_ID" files owner name args=()
  files="$home/files"
  name="$(basename "$flow" .yaml)"
  say "$name: the saved 3+ deck one card from its end, then the app opened on it"
  mkdir -p "$dir"
  node -e '
    const deck = require("./src/content/decks/3-plus.json");
    const order = deck.questions.map(q => q.id);
    process.stdout.write(JSON.stringify({ order, seen: order.length - 1 }));
  ' >"$dir/saved-deck-written.json"
  "$ADB" shell pm clear "$APP_ID" >/dev/null 2>&1
  owner="$("$ADB" shell stat -c %u "$home" 2>/dev/null | tr -d '\r')"
  if [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" != 0 ] || [ -z "$owner" ] ||
    ! "$ADB" push "$dir/saved-deck-written.json" /data/local/tmp/kq-deck.json >/dev/null 2>&1 ||
    ! "$ADB" shell "mkdir -p $files && cp /data/local/tmp/kq-deck.json $files/deck-3%2B.json && rm /data/local/tmp/kq-deck.json && chown -R $owner:$owner $files && restorecon -R $files"; then
    # No results: the collector counts the flow as not run (blocked), not failed.
    blocked "could not write the saved deck as root"
    return
  fi
  "$ADB" shell cat "$files/deck-3%2B.json" >"$dir/saved-deck-before.json" 2>&1
  while read -r arg; do args+=(-e "$arg"); done < <(node -e '
    const fs = require("fs");
    const regex = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const deck = require("./src/content/decks/3-plus.json");
    const strings = require("./src/strings.json").pl;
    let saved = {};
    try { saved = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); } catch {}
    const order = Array.isArray(saved.order) ? saved.order : [];
    const last = deck.questions.find(q => q.id === order[saved.seen]);
    console.log(`SAVED_SEEN=${saved.seen}`);
    console.log(`SAVED_TOTAL=${order.length}`);
    console.log(`LAST_POSITION=${saved.seen}`);
    console.log(`LAST_QUESTION=${last ? regex(last.pl.question) : "(none)"}`);
    console.log(`END_FINISHED=${regex(strings.deckFinished)}`);
    console.log(`END_AGAIN=${regex(strings.again)}`);
    console.log(`END_CATEGORIES=${regex(strings.categories)}`);
  ' "$dir/saved-deck-before.json")
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    -e APP_ID="$APP_ID" \
    ${args[@]+"${args[@]}"} \
    "$flow"; then
    status=1
  fi
  "$ADB" shell cat "$files/deck-3%2B.json" >"$dir/saved-deck-after.json" 2>&1
  if [ "$name" = TC-03-13-again-restarts-deck ]; then
    local check="TC-03-13 step 2 — after \"again\" the saved 3+ deck shows 0 of 50 seen and a new order"
    local why
    why="$(node -e '
      const fs = require("fs");
      const ids = require("./src/content/decks/3-plus.json").questions.map(q => q.id);
      const before = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
      let after;
      try { after = JSON.parse(fs.readFileSync(process.argv[2], "utf8")); } catch { console.log("the saved deck after \"again\" is not readable"); process.exit(); }
      const order = after.order || [];
      if (after.seen !== 0) console.log(`${after.seen} of ${order.length} seen, not 0`);
      else if (order.length !== 50 || [...order].sort().join() !== [...ids].sort().join()) console.log("the order is not the 50 questions of 3+, each once");
      else if (order.join() === before.order.join()) console.log("the order is the one saved before");
    ' "$dir/saved-deck-before.json" "$dir/saved-deck-after.json" 2>&1)"
    if [ -z "$why" ]; then record "$check" ok; else record "$check" fail "$why (saved-deck-after.json)"; fi
  fi
}

# write_app_files <dir> <name>…: the files <dir>/<name> written, as root, into the app's private
# files under the same names (what src/storage.ts keeps there), after the app's data has been
# cleared; each read back from the device into <dir>/<name>.before. Fails when the device is not
# rooted. The release build has no app-state bridge (DEC-55).
write_app_files() {
  local dir="$1" home="/data/data/$APP_ID" files owner name
  shift
  files="$home/files"
  "$ADB" shell pm clear "$APP_ID" >/dev/null 2>&1
  owner="$("$ADB" shell stat -c %u "$home" 2>/dev/null | tr -d '\r')"
  [ "$("$ADB" shell id -u 2>/dev/null | tr -d '\r')" = 0 ] && [ -n "$owner" ] || return 1
  "$ADB" shell "mkdir -p $files" || return 1
  for name in "$@"; do
    "$ADB" push "$dir/$name" /data/local/tmp/kq-file >/dev/null 2>&1 &&
      "$ADB" shell "cp /data/local/tmp/kq-file '$files/$name' && rm /data/local/tmp/kq-file" || return 1
  done
  "$ADB" shell "chown -R $owner:$owner $files && restorecon -R $files" || return 1
  for name in "$@"; do "$ADB" shell cat "'$files/$name'" >"$dir/$name.before" 2>&1; done
}

# run_continue_finished_flow <report> <output dir>: TC-02-08 — the saved 3+ deck written with all 50
# answers revealed, and 3+ as the last category used; then the flow, given what the device holds
# (SAVED_SEEN of SAVED_TOTAL, SAVED_LAST) and the end card's words (src/strings.json). Needs the
# device rooted and set to Polish, as run_language_flows leaves it.
run_continue_finished_flow() {
  local report="$1" dir="$2" args=()
  say "TC-02-08: the 3+ deck saved finished and used last, then the app opened on it"
  mkdir -p "$dir"
  node -e '
    const order = require("./src/content/decks/3-plus.json").questions.map(q => q.id);
    process.stdout.write(JSON.stringify({ order, seen: order.length }));
  ' >"$dir/deck-3%2B.json"
  printf '"3+"' >"$dir/last-category.json"
  if ! write_app_files "$dir" deck-3%2B.json last-category.json; then
    # No results: the collector counts the flow as not run (blocked), not failed.
    blocked "could not write the saved data as root"
    return
  fi
  while read -r arg; do args+=(-e "$arg"); done < <(node -e '
    const fs = require("fs");
    const read = f => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return undefined; } };
    const deck = read(process.argv[1]) || {};
    const order = Array.isArray(deck.order) ? deck.order : [];
    console.log(`SAVED_SEEN=${deck.seen}`);
    console.log(`SAVED_TOTAL=${order.length}`);
    console.log(`SAVED_LAST=${read(process.argv[2])}`);
    console.log(`END_FINISHED=${require("./src/strings.json").pl.deckFinished.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  ' "$dir/deck-3%2B.json.before" "$dir/last-category.json.before")
  # NFR-07 on the screen with the continue entry, as AC-02-01-4 step 4 checks the first launch's.
  say "TC-02-08 step 2: the category screen with the continue entry, its colours on the device"
  "$ADB" shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
  for _ in $(seq 1 60); do
    "$ADB" shell uiautomator dump /sdcard/kq-ui.xml >/dev/null 2>&1 &&
      "$ADB" exec-out cat /sdcard/kq-ui.xml >"$dir/continue-hierarchy.txt" 2>/dev/null
    grep -q 'resource-id="continue-category"' "$dir/continue-hierarchy.txt" 2>/dev/null && break
    sleep 1
  done
  "$ADB" exec-out screencap >"$dir/continue-screen.raw" 2>/dev/null
  "$ADB" exec-out screencap -p >"$dir/step-02-continue-colours.png" 2>/dev/null
  if ! grep -q 'resource-id="continue-category"' "$dir/continue-hierarchy.txt" 2>/dev/null; then
    printf '<?xml version="1.0" encoding="UTF-8"?>\n<testsuites><testsuite name="continue-screen-colours" tests="1" failures="1"><testcase classname="category-screen" name="%s"><failure message="the continue entry never showed (continue-hierarchy.txt)"/></testcase></testsuite></testsuites>\n' \
      "$CONTINUE_COLOURS" >"$OUT/junit/continue-screen-colours.xml"
    status=1
  elif ! node scripts/check-black-and-white.js "$dir/continue-screen.raw" "$dir/continue-hierarchy.txt" \
    "$density" "$OUT/junit/continue-screen-colours.xml" "$CONTINUE_COLOURS"; then
    status=1
  fi
  rm -f "$dir/continue-screen.raw"
  "$ADB" shell am force-stop "$APP_ID" >/dev/null 2>&1
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    -e APP_ID="$APP_ID" \
    ${args[@]+"${args[@]}"} \
    tests/maestro/TC-02-08-continue-finished-deck.yaml; then
    status=1
  fi
}

# run_unreadable_data_flow <report> <output dir>: TC-02-09 — every file the app saves (the last
# category used, each category's deck) replaced with content that is not JSON (no double quotes in
# it: Maestro's -e splits a value at them); then the flow, given what the last category's file holds
# (SAVED_DATA). Needs the device rooted and set to Polish, as run_language_flows leaves it.
run_unreadable_data_flow() {
  local report="$1" dir="$2" names=(last-category.json) category
  say "TC-02-09: the app's saved data made unreadable, then the app opened on it"
  mkdir -p "$dir"
  printf '%s' '{last: 4' >"$dir/last-category.json"
  while read -r category; do
    names+=("deck-$category.json")
    printf '%s' '{order: [' >"$dir/deck-$category.json"
  done < <(node -e 'for (const f of require("fs").readdirSync("src/content/decks").filter(f => f.endsWith(".json")).sort())
    console.log(encodeURIComponent(require(`./src/content/decks/${f}`).category))')
  if ! write_app_files "$dir" "${names[@]}"; then
    # No results: the collector counts the flow as not run (blocked), not failed.
    blocked "could not replace the saved data as root"
    return
  fi
  if ! "$MAESTRO" test \
    --format JUNIT \
    --output "$report" \
    --test-output-dir "$dir" \
    -e APP_ID="$APP_ID" \
    -e SAVED_DATA="$(cat "$dir/last-category.json.before")" \
    tests/maestro/TC-02-09-unreadable-saved-data.yaml; then
    status=1
  fi
}

# run_illustration_flows <output dir>: TC-03-20…TC-03-22 — each after the saved 3+ deck has been
# written as root with the question its test case needs first and nothing seen (TC-03-20: the first
# question without an illustration; TC-03-21, TC-03-22: the first with one), and read back for the
# flow: the question in Polish and English (QUESTION, QUESTION_PL, QUESTION_EN) and its picture's file
# (ILLUSTRATION), with every shipped picture's file (ILLUSTRATIONS). scripts/illustration-server.js
# runs on the host's loopback (ILLUSTRATION_URL) to look for a picture on the screen and, for
# TC-03-22, to set the device's language, through scripts/SetLocale.java compiled here (javac, d8).
# The release build has no app-state bridge (DEC-55). Needs the device rooted and set to Polish, as
# run_language_flows leaves it; TC-03-22 leaves it set to English.
run_illustration_flows() {
  local dir="$1" port=8766 dex=/data/local/tmp/kq-set-locale.dex classes server flow name tc first args
  say "TC-03-20…TC-03-22: the illustrations, each on the saved 3+ deck with its question first"
  mkdir -p "$dir"
  classes="$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/kq-set-locale.XXXXXX")"
  if ! javac --release 8 -d "$classes" scripts/SetLocale.java >"$dir/set-locale-build.log" 2>&1 ||
    ! "$BUILD_TOOLS/d8" --min-api 31 --output "$classes" "$classes/SetLocale.class" >>"$dir/set-locale-build.log" 2>&1 ||
    ! "$ADB" push "$classes/classes.dex" "$dex" >>"$dir/set-locale-build.log" 2>&1; then
    rm -rf "$classes"
    # No results: the collector counts these flows as not run (blocked), not failed.
    say "BLOCKED: could not build the language switch for the device (set-locale-build.log)"
    return
  fi
  rm -rf "$classes"
  node scripts/illustration-server.js "$ADB" "$port" "$dir" "$dex" &
  server=$!
  for _ in $(seq 1 20); do
    curl -s "http://127.0.0.1:$port/" >/dev/null 2>&1 && break
    sleep 0.5
  done
  for flow in tests/maestro/TC-03-2[0-2]-*.yaml; do
    name="$(basename "$flow" .yaml)"
    tc="${name%%-[a-z]*}"
    first=illustrated
    [ "$tc" = TC-03-20 ] && first=text-only
    mkdir -p "$dir/$tc"
    node -e '
      const questions = require("./src/content/decks/3-plus.json").questions;
      const pick = process.argv[1] === "text-only" ? q => !q.illustration : q => q.illustration;
      const ids = questions.map(q => q.id);
      const first = questions.find(pick).id;
      process.stdout.write(JSON.stringify({ order: [first, ...ids.filter(id => id !== first)], seen: 0 }));
    ' "$first" >"$dir/$tc/deck-3%2B.json"
    if ! write_app_files "$dir/$tc" deck-3%2B.json; then
      # No results: the collector counts the flow as not run (blocked), not failed.
      say "BLOCKED: $tc could not write the saved deck as root (adb root needs an emulator image without Google Play)"
      continue
    fi
    args=()
    while read -r arg; do args+=(-e "$arg"); done < <(node -e '
      const fs = require("fs");
      const regex = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let saved = {};
      try { saved = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); } catch {}
      const question = require("./src/content/decks/3-plus.json").questions.find(q => q.id === (saved.order || [])[0]);
      console.log(`QUESTION=${question ? regex(question.pl.question) : "(none)"}`);
      console.log(`QUESTION_PL=${question ? regex(question.pl.question) : "(none)"}`);
      console.log(`QUESTION_EN=${question ? regex(question.en.question) : "(none)"}`);
      console.log(`ILLUSTRATION=${(question && question.illustration) || "(none)"}`);
      console.log(`ILLUSTRATIONS=${fs.readdirSync("src/content/illustrations").filter(f => f.endsWith(".png")).join(",")}`);
    ' "$dir/$tc/deck-3%2B.json.before")
    say "$tc: the saved 3+ deck with $(head -c 200 "$dir/$tc/deck-3%2B.json.before" | sed -E 's/.*"order":\["([^"]*)".*/\1/') first"
    if ! "$MAESTRO" test \
      --format JUNIT \
      --output "$OUT/maestro/report-release-$tc.xml" \
      --test-output-dir "$dir/$tc" \
      -e APP_ID="$APP_ID" \
      -e ILLUSTRATION_URL="http://127.0.0.1:$port" \
      ${args[@]+"${args[@]}"} \
      "$flow"; then
      status=1
    fi
  done
  kill "$server" 2>/dev/null || true
  wait "$server" 2>/dev/null || true
  "$ADB" shell rm -f "$dex" >/dev/null 2>&1 || true
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
      -e CONTENT_TITLE="$(content_title)" \
      tests/maestro; then
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
        --exclude-tags debug-build,device-language,other-device-language,saved-deck,deck-state,illustration \
        -e APP_ID="$APP_ID" \
        -e CONTENT_TITLE="$(content_title)" \
        ${CATEGORY_ARGS[@]+"${CATEGORY_ARGS[@]}"} \
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

      # TC-02-02 step 2: each category entry's bounds, from the accessibility layer, against the
      # screen's width (the override if one is set) — a width Maestro cannot select by.
      say "TC-02-02 step 2: the category entries' width"
      screen_width="$("$ADB" shell wm size | tr -d '\r' | awk -F'[ x]' '/^Physical size/ { p = $3 } /^Override size/ { o = $3 } END { print o ? o : p }')"
      "$ADB" shell am force-stop "$APP_ID" >/dev/null 2>&1
      "$ADB" shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
      # A file left by an earlier run into the same directory would end the wait at once.
      rm -f "$OUT/maestro/TC-02-02-hierarchy.txt"
      for _ in $(seq 1 60); do
        "$ADB" shell uiautomator dump /sdcard/kq-ui.xml >/dev/null 2>&1 &&
          "$ADB" exec-out cat /sdcard/kq-ui.xml >"$OUT/maestro/TC-02-02-hierarchy.txt" 2>/dev/null
        grep -q 'resource-id="category-0"' "$OUT/maestro/TC-02-02-hierarchy.txt" 2>/dev/null && break
        sleep 1
      done
      if ! node scripts/check-full-width.js "$OUT/maestro/TC-02-02-hierarchy.txt" "$screen_width" \
        "$(printf '%s\n' ${CATEGORY_ARGS[@]+"${CATEGORY_ARGS[@]}"} | sed -n 's/^CATEGORY_COUNT=//p')" "$OUT/junit/screen.xml"; then
        status=1
      fi

      # AC-02-01-4 step 4: the same screen's pixels — #000000 and #FFFFFF only outside the text
      # glyphs (NFR-07). The raw screenshot is read by the check; the PNG is kept as evidence.
      say "AC-02-01-4 step 4: the category screen's colours on the device"
      density="$("$ADB" shell wm density | tr -d '\r' | awk -F': ' '/^Physical density/ { p = $2 } /^Override density/ { o = $2 } END { print o ? o : p }')"
      rm -f "$OUT/maestro/AC-02-01-4-screen.raw"
      "$ADB" exec-out screencap >"$OUT/maestro/AC-02-01-4-screen.raw" 2>/dev/null
      "$ADB" exec-out screencap -p >"$OUT/maestro/AC-02-01-4-step-04-screen.png" 2>/dev/null
      if ! node scripts/check-black-and-white.js "$OUT/maestro/AC-02-01-4-screen.raw" \
        "$OUT/maestro/TC-02-02-hierarchy.txt" "$density" "$OUT/junit/screen-colours.xml"; then
        status=1
      fi
      rm -f "$OUT/maestro/AC-02-01-4-screen.raw"

      # TC-03-01…TC-03-05, TC-03-07…TC-03-11 (the cards), TC-02-10, TC-02-12, TC-02-13 (the language
      # switch): with the device set to Polish, their test data; TC-02-11 with it set to German. On
      # first launch the app takes the device's language (MOD-02-F11).
      original_locale="$("$ADB" shell settings get system system_locales | tr -d '\r')"
      original_locale="${original_locale%%,*}"
      [ "$original_locale" != null ] || original_locale=""
      [ -n "$original_locale" ] || original_locale="$(device_locale)"
      run_language_flows pl-PL pl "$OUT/maestro/report-release-pl.xml" "$OUT/maestro/release-pl" \
        --include-tags device-language tests/maestro
      # Each group after the first waits for the device, should it have dropped off (device_back).
      device_back
      run_deck_state_flows "$OUT/maestro/report-release-deck-state.xml" "$OUT/maestro/release-deck-state"
      device_back
      run_saved_deck_flow "$OUT/maestro/report-release-saved-deck.xml" "$OUT/maestro/release-saved-deck"
      for flow in tests/maestro/TC-03-1[2-5]-*.yaml; do
        name="$(basename "$flow" .yaml)"
        device_back
        run_end_card_flow "$flow" "$OUT/maestro/report-release-${name%%-[a-z]*}.xml" "$OUT/maestro/release-end-card/${name%%-[a-z]*}"
      done
      device_back
      run_continue_finished_flow "$OUT/maestro/report-release-TC-02-08.xml" "$OUT/maestro/release-continue/TC-02-08"
      device_back
      run_unreadable_data_flow "$OUT/maestro/report-release-TC-02-09.xml" "$OUT/maestro/release-continue/TC-02-09"
      device_back
      run_illustration_flows "$OUT/maestro/release-illustrations"
      device_back
      run_language_flows de-DE en "$OUT/maestro/report-release-de.xml" "$OUT/maestro/release-de" \
        --include-tags other-device-language tests/maestro
      say "putting the device's language back to $original_locale"
      set_device_locale "$original_locale" || say "WARNING: could not put the device's language back to $original_locale"
      "$ADB" unroot >/dev/null 2>&1 || true
      "$ADB" wait-for-device
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
