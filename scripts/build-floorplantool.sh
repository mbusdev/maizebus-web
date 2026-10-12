#!/usr/bin/env bash
# Build the Floor Plan Digitizer (git submodule in ./floorplantool) and drop
# its static output into client/dist/floorplantool, so the GitHub Pages
# artifact serves it at https://www.maizebus.com/floorplantool/ next to the
# main site. It is an internal tool: nothing on the site links to it.
#
# Run AFTER `cd client && npm run build` — that step wipes client/dist.
#
# To ship a newer version of the tool, bump the submodule pointer:
#   git submodule update --remote floorplantool
#   git add floorplantool && git commit -m "Update floor plan tool"
set -euo pipefail
cd "$(dirname "$0")/.."

TOOL_DIR=floorplantool
OUT_DIR=client/dist/floorplantool
BASE_PATH=/floorplantool/

if [ ! -f "$TOOL_DIR/package.json" ]; then
  echo "error: $TOOL_DIR is empty — run 'git submodule update --init' first" >&2
  exit 1
fi
if [ ! -f client/dist/index.html ]; then
  echo "error: client/dist is missing — run 'cd client && npm run build' first" >&2
  exit 1
fi

echo "==> Building floor plan tool (base $BASE_PATH)"
(
  cd "$TOOL_DIR"
  npm ci --no-audit --no-fund
  npm run typecheck
  npx vite build --base="$BASE_PATH"
)

echo "==> Copying into $OUT_DIR"
rm -rf "$OUT_DIR"
cp -R "$TOOL_DIR/dist" "$OUT_DIR"
echo "==> Done: $(find "$OUT_DIR" -type f | wc -l | tr -d ' ') files in $OUT_DIR"
