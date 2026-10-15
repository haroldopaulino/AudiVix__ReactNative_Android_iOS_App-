#!/usr/bin/env bash
# Owner: Haroldo Paulino
set -euo pipefail
serial="${1:-3A131FDJG0040Y}"
cd "$(dirname "$0")/.."
adb -s "$serial" wait-for-device
adb -s "$serial" reverse tcp:8081 tcp:8081
adb -s "$serial" shell am force-stop com.audivix || true
adb -s "$serial" shell monkey -p com.audivix 1
printf 'Metro must be running in a separate terminal: npm start\n'
