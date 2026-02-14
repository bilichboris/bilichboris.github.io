#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

if ! command -v bundle >/dev/null 2>&1; then
  echo "Bundler is required. Install Ruby + Bundler first."
  exit 1
fi

CPU_COUNT="$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 4)"

export BUNDLE_USER_HOME="${BUNDLE_USER_HOME:-${PROJECT_ROOT}/.bundle}"
export BUNDLE_APP_CONFIG="${BUNDLE_APP_CONFIG:-${PROJECT_ROOT}/.bundle}"
mkdir -p "${BUNDLE_USER_HOME}"

bundle config set --local path "vendor/bundle"
bundle config set --local jobs "${CPU_COUNT}"
bundle install

if command -v npm >/dev/null 2>&1; then
  if [ -f package-lock.json ]; then
    npm ci
  elif [ -f package.json ]; then
    npm install
  fi
fi

echo
echo "Setup complete."
echo "Run 'make preview-local' for local Jekyll or 'make preview-podman' for containers."
