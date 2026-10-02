#!/usr/bin/env python3
"""
Script utilitário para gerar o workspace_index.json (Nível 1 da persistência de governança).
"""
import os
import json
import hashlib
from datetime import datetime, timezone

EXCLUDE_DIRS = {'.git', 'node_modules', 'dist', '.context', '.firebase'}

def calculate_file_hash(filepath: str) -> str:
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()[:12]

def generate_index(root_dir: str = '.'):
    index = {
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "project": "appmy",
        "description": "Base Fullstack Cloud Run & Firebase",
        "files": []
    }

    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            filepath = os.path.join(root, file)
            relpath = os.path.relpath(filepath, root_dir).replace('\\', '/')
            if relpath.startswith('.'):
                continue
            try:
                index["files"].append({
                    "path": relpath,
                    "size_bytes": os.path.getsize(filepath),
                    "hash": calculate_file_hash(filepath)
                })
            except Exception as e:
                pass

    with open('workspace_index.json', 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2, ensure_ascii=False)
    print(f"[OK] workspace_index.json gerado com sucesso ({len(index['files'])} arquivos mapeados).")

if __name__ == '__main__':
    generate_index('.')
