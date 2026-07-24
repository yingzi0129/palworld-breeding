#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

bucket = "palworld-breeding-assets"
local_dir = Path("tmp/pal-icons")
files = sorted(local_dir.glob("*.webp"))

def upload(f: Path):
    key = f"pals/{f.name}"
    cmd = [
        "wrangler", "r2", "object", "put", f"{bucket}/{key}",
        "--file", str(f),
        "--content-type", "image/webp",
        "--remote",
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        ok = result.returncode == 0 and "Uploaded" in result.stdout or result.returncode == 0
        return (f.name, ok, result.stderr[:200] if not ok else "")
    except Exception as e:
        return (f.name, False, str(e)[:200])

success = 0
failed = 0
with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(upload, f): f for f in files}
    for future in as_completed(futures):
        name, ok, err = future.result()
        if ok:
            success += 1
        else:
            failed += 1
            print(f"FAIL {name}: {err}")
        print(f"\rUploaded {success}/{len(files)}, failed {failed}", end="")

print(f"\nDone. Success: {success}, Failed: {failed}")
