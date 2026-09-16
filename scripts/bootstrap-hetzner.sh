#!/usr/bin/env bash
# One-time setup on Hetzner. Run as root on the server:
#   curl -fsSL https://raw.githubusercontent.com/elsvit/tareitas-web/main/scripts/bootstrap-hetzner.sh | bash
# Or after cloning locally:
#   bash scripts/bootstrap-hetzner.sh

set -euo pipefail

REPO_URL="${TAREITAS_WEB_REPO_URL:-https://github.com/elsvit/tareitas-web.git}"
APP_DIR="${TAREITAS_WEB_DIR:-/var/www/tareitas-web}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root on the Hetzner server."
  exit 1
fi

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "Cloning tareitas-web into $APP_DIR..."
  mkdir -p "$(dirname "$APP_DIR")"
  git clone "$REPO_URL" "$APP_DIR"
else
  echo "Repository already exists at $APP_DIR"
fi

cd "$APP_DIR"

echo "Installing dependencies..."
yarn install --frozen-lockfile

echo "Building production site..."
yarn build

echo ""
echo "Bootstrap complete."
echo "Next: point nginx root to $APP_DIR/dist"
echo "Then deploy from GitHub: Actions -> Deploy production -> Run workflow"
