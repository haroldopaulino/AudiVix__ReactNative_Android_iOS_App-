#!/usr/bin/env bash
# Owner: Haroldo Paulino
set -euo pipefail
serial="${1:-3A131FDJG0040Y}"
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
if [ ! -d node_modules ]; then
  npm install
fi
node scripts/align-gradle-versions.js
node scripts/patch-track-player.js
node scripts/patch-third-party-warnings.js
cd android
./gradlew clean assembleRelease
apk="app/build/outputs/apk/release/app-release.apk"
test -f "$apk"
echo "APK: $(pwd)/$apk"
adb -s "$serial" install -r "$apk"
adb -s "$serial" shell am force-stop com.audivix || true
adb -s "$serial" shell monkey -p com.audivix 1
