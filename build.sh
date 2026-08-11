#!/usr/bin/env bash
set -euo pipefail
rm -rf _openjarvis

git clone --depth 1 https://github.com/open-jarvis/OpenJarvis.git _openjarvis
cp -a _openjarvis/frontend/. ./
rm -rf _openjarvis

python3 - <<'PY'
from pathlib import Path
p = Path('vite.config.ts')
s = p.read_text()
s = s.replace("outDir: '../src/openjarvis/server/static'", "outDir: 'dist'")
p.write_text(s)
PY
npm ci
npm run build
