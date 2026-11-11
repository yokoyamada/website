#!/usr/bin/env bash
# Sert le site en local. Ancienne version : http://localhost:8000/  — nouvelle : http://localhost:8000/target/
cd "$(dirname "$0")/.." && exec python3 -m http.server "${1:-8000}"
