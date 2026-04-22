#!/usr/bin/env python3
"""
Extract per-module ICD sections from [33]-STD-ENG-008 into modules/contracts/.

Pass-3 post-tranche-2 deliverable. Separates per-module interface contracts
from the standard text so module interface revisions no longer require
bumping the STD-ENG-008 version.

Output:
    modules/contracts/M-01-identity.md
    modules/contracts/M-02-authentication.md
    ...
    modules/contracts/M-40-cache.md
    modules/contracts/_manifest.json   (generated index)

Governance:
    Contracts are owned by `eng-lead`. Changes to contracts follow
    semver per ICD-6 (API Versioning Contract). STD-ENG-008 only
    indexes them; the body lives here.
"""

from __future__ import annotations

import json
import pathlib
import re
import sys
from datetime import datetime, timezone

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_DOC = REPO_ROOT / "[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md"
OUT_DIR = REPO_ROOT / "modules" / "contracts"

MODULE_HEADING_RE = re.compile(r"^#### ICD-3\.(\d+)\s+(.+?)\s+Module\s+\((M-\d{2})\)\s+Interfaces\s*$")
NEXT_SECTION_RE = re.compile(r"^(?:### |#### ICD-3\.\d+\s)")


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def extract() -> int:
    if not SOURCE_DOC.exists():
        print(f"ERROR: source not found: {SOURCE_DOC}", file=sys.stderr)
        return 1

    lines = SOURCE_DOC.read_text().splitlines()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    sections: list[dict] = []
    for i, line in enumerate(lines):
        m = MODULE_HEADING_RE.match(line)
        if not m:
            continue
        idx, name, mid = m.group(1), m.group(2).strip(), m.group(3)
        start = i
        end = len(lines)
        for j in range(i + 1, len(lines)):
            if NEXT_SECTION_RE.match(lines[j]):
                end = j
                break
        sections.append({
            "icd_index": idx, "module_id": mid, "name": name,
            "start_line": start + 1, "end_line": end,
        })

    manifest: list[dict] = []
    for s in sections:
        slug = slugify(s["name"])
        filename = f"{s['module_id']}-{slug}.md"
        body = "\n".join(lines[s["start_line"] - 1 : s["end_line"]]).rstrip() + "\n"
        header = (
            f"# {s['module_id']} — {s['name']} Module Interface Contract\n\n"
            f"**Status:** EXTRACTED (owner: `eng-lead`)  \n"
            f"**Source:** `{SOURCE_DOC.name}` §ICD-3.{s['icd_index']} "
            f"(lines {s['start_line']}–{s['end_line']})  \n"
            f"**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  \n"
            f"**Change control:** non-breaking edits may be made without STD-ENG-008 "
            f"version bump; breaking changes require RFC (STD-ENG-007).\n\n"
            f"---\n\n"
        )
        (OUT_DIR / filename).write_text(header + body)
        manifest.append({
            "module_id": s["module_id"],
            "name": s["name"],
            "slug": slug,
            "contract_file": f"modules/contracts/{filename}",
            "source_icd": f"ICD-3.{s['icd_index']}",
            "source_lines": [s["start_line"], s["end_line"]],
        })

    manifest_doc = {
        "schema": "cybercube.modules.contracts.v1",
        "generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": SOURCE_DOC.name,
        "count": len(manifest),
        "owner": "eng-lead",
        "notes": (
            "Per-module ICD contracts extracted from STD-ENG-008. "
            "STD-ENG-008 indexes these via modules/modules.json and retains "
            "shared contracts (ICD-4 through ICD-9) inline."
        ),
        "contracts": manifest,
    }
    (OUT_DIR / "_manifest.json").write_text(json.dumps(manifest_doc, indent=2) + "\n")
    print(f"Extracted {len(manifest)} module contracts → {OUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(extract())
