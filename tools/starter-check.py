#!/usr/bin/env python3
"""
CYBERCUBE starter-kit linter (RFC-0004 §7 Risks mitigation).

Validates `docs/starters/*.md` against the current portfolio to prevent
starter rot (starters referencing clauses that moved, standards that
version-bumped, or IDs that no longer exist).

For each starter file, checks:

  1. Every cited standard bracket-reference (e.g. "[4] FWK-GOV-001",
     "[33] STD-ENG-008") resolves to a file at the repository root
     whose filename starts with "[N]-<ID>". The ID must match.
  2. Every cited path-reference under `governance/compliance-maps/`
     exists as a file in that directory.
  3. Every cited archetype cross-link (to a sibling `docs/starters/*.md`
     file or `VENDOR-ONBOARDING.md`) resolves.
  4. No stale version numbers — if a starter cites a specific vN.M
     (e.g. "FWK-GOV-001 v1.4"), that version must match the current
     filename on disk.

Exit code:
  0 — every starter reference resolves cleanly.
  1 — at least one finding.

Usage:
  python tools/starter-check.py
  python tools/starter-check.py --json
  python tools/starter-check.py --path DIR
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass, field
from pathlib import Path

STARTERS_DIR = "docs/starters"
COMPLIANCE_MAPS_DIR = "governance/compliance-maps"

# Bracket reference like "[4] FWK-GOV-001", "[33] STD-ENG-008", or
# "[49] STD-ENG-001A" (post-RFC-0001 split sub-standards may carry a
# single trailing uppercase letter after the three-digit slot).
BRACKET_REF_RE = re.compile(
    r"\[(?P<n>\d+)\]\s*"
    r"(?P<id>(?:POL|STD|FWK|TPL|PLN)-[A-Z]+-\d{3}[A-Z]?)"
)

# Version reference immediately following an ID, like "FWK-GOV-001 v1.4"
VERSION_RE = re.compile(
    r"(?P<id>(?:POL|STD|FWK|TPL|PLN)-[A-Z]+-\d{3}[A-Z]?)\s+v(?P<ver>\d+(?:\.\d+)?)"
)

# Standard filename: "[N]-<ID> <...>-v<version>.md"
# ID may carry an optional single trailing uppercase letter suffix
# (introduced by RFC-0001 sub-standards: STD-ENG-001A/B/C).
STANDARD_FILENAME_RE = re.compile(
    r"^\[(?P<n>\d+)\]-"
    r"(?P<id>(?:POL|STD|FWK|TPL|PLN)-[A-Z]+-\d{3}[A-Z]?)\s"
    r".*?-v(?P<ver>\d+(?:\.\d+)?)\.md$"
)

# Path references to governance/compliance-maps/ (either markdown link or bare path)
COMPLIANCE_MAP_PATH_RE = re.compile(
    r"governance/compliance-maps/(?P<file>[a-z0-9.\-]+)"
)

# Relative cross-links between starter files ("./internal-tool.md", etc.)
STARTER_CROSSLINK_RE = re.compile(
    r"\]\(\.?/?(?P<file>[A-Za-z0-9.\-]+\.md)\)"
)


@dataclass
class Finding:
    file: str
    kind: str
    detail: str
    line: int = 0


@dataclass
class StarterReport:
    file: str
    findings: list[Finding] = field(default_factory=list)


def _index_standards(root: Path) -> dict[str, dict]:
    """Return {standard_id: {bracket, version, filename}} for all [N]-*.md at root."""
    index: dict[str, dict] = {}
    for p in root.iterdir():
        if not p.is_file() or not p.name.endswith(".md"):
            continue
        m = STANDARD_FILENAME_RE.match(p.name)
        if not m:
            continue
        index[m.group("id")] = {
            "bracket": int(m.group("n")),
            "version": m.group("ver"),
            "filename": p.name,
        }
    return index


def _index_compliance_maps(root: Path) -> set[str]:
    maps_dir = root / COMPLIANCE_MAPS_DIR
    if not maps_dir.is_dir():
        return set()
    return {p.name for p in maps_dir.iterdir() if p.is_file() and p.suffix == ".md"}


def _lint_starter(
    starter_path: Path,
    standards_idx: dict[str, dict],
    map_files: set[str],
    starter_files: set[str],
) -> StarterReport:
    report = StarterReport(file=starter_path.name)
    text = starter_path.read_text(encoding="utf-8")
    lines = text.splitlines()

    # 1. Bracket + ID references — confirm bracket number matches the one on disk
    for m in BRACKET_REF_RE.finditer(text):
        sid = m.group("id")
        bracket = int(m.group("n"))
        entry = standards_idx.get(sid)
        if entry is None:
            report.findings.append(
                Finding(
                    file=starter_path.name,
                    kind="UNKNOWN_STANDARD",
                    detail=f"[{bracket}] {sid} — no file matches this ID at repo root",
                )
            )
            continue
        if entry["bracket"] != bracket:
            report.findings.append(
                Finding(
                    file=starter_path.name,
                    kind="BRACKET_MISMATCH",
                    detail=(
                        f"cited [{bracket}] {sid} but file is "
                        f"[{entry['bracket']}]-{sid} ({entry['filename']})"
                    ),
                )
            )

    # 2. Version references — confirm the cited version matches current filename
    for m in VERSION_RE.finditer(text):
        sid = m.group("id")
        cited = m.group("ver")
        entry = standards_idx.get(sid)
        if entry is None:
            continue  # UNKNOWN_STANDARD already flagged above
        if entry["version"] != cited:
            report.findings.append(
                Finding(
                    file=starter_path.name,
                    kind="STALE_VERSION",
                    detail=(
                        f"cites {sid} v{cited} but current portfolio "
                        f"has v{entry['version']} ({entry['filename']})"
                    ),
                )
            )

    # 3. Compliance-map path references
    for m in COMPLIANCE_MAP_PATH_RE.finditer(text):
        fname = m.group("file")
        if fname.endswith("/"):
            continue  # directory reference, skip
        # allow wildcard-ish globs "governance/compliance-maps/*" in prose
        if "*" in fname:
            continue
        if fname not in map_files:
            report.findings.append(
                Finding(
                    file=starter_path.name,
                    kind="MISSING_COMPLIANCE_MAP",
                    detail=f"governance/compliance-maps/{fname} — no such file",
                )
            )

    # 4. Starter cross-links (relative markdown links to sibling files)
    for m in STARTER_CROSSLINK_RE.finditer(text):
        fname = m.group("file")
        # only flag names that look like starter-dir files
        if fname not in starter_files:
            continue  # link points elsewhere; not our concern
        # else: resolves within the starters directory — OK

    # detect dead cross-links: a link-text that names a file ending in .md
    # in the prose but the file is not in starter_files — flag only if the
    # link syntax clearly points to the starters dir
    for i, line in enumerate(lines, start=1):
        for m in re.finditer(
            r"\]\((?:\./|docs/starters/)(?P<f>[A-Za-z0-9.\-]+\.md)\)", line
        ):
            fname = m.group("f")
            if fname not in starter_files:
                report.findings.append(
                    Finding(
                        file=starter_path.name,
                        kind="MISSING_STARTER_CROSSLINK",
                        detail=f"link to ./{fname} — file not present in {STARTERS_DIR}/",
                        line=i,
                    )
                )

    return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0] if __doc__ else None)
    parser.add_argument("--path", type=Path, default=Path.cwd(), help="repo root (default: cwd)")
    parser.add_argument("--json", action="store_true", help="emit JSON to starter-check-report.json")
    args = parser.parse_args()

    root = args.path.resolve()
    starters_dir = root / STARTERS_DIR
    if not starters_dir.is_dir():
        print(f"starter-check: {STARTERS_DIR}/ not found at {root}", file=sys.stderr)
        return 1

    standards_idx = _index_standards(root)
    map_files = _index_compliance_maps(root)
    starter_files = {
        p.name for p in starters_dir.iterdir() if p.is_file() and p.suffix == ".md"
    }

    starter_paths = sorted(
        p for p in starters_dir.iterdir()
        if p.is_file() and p.suffix == ".md" and p.name != "README.md"
    )

    all_reports: list[StarterReport] = []
    total_findings = 0
    for sp in starter_paths:
        report = _lint_starter(sp, standards_idx, map_files, starter_files)
        all_reports.append(report)
        total_findings += len(report.findings)

    print(f"starter-check: scanned {len(starter_paths)} starter file(s) under {STARTERS_DIR}/")
    print(f"  standards indexed: {len(standards_idx)}")
    print(f"  compliance maps indexed: {len(map_files)}")
    for r in all_reports:
        if not r.findings:
            print(f"  OK   {r.file}")
            continue
        print(f"  FAIL {r.file}  ({len(r.findings)} finding(s))")
        for f in r.findings:
            loc = f" (line {f.line})" if f.line else ""
            print(f"    - {f.kind}: {f.detail}{loc}")

    if args.json:
        payload = {
            "reports": [
                {"file": r.file, "findings": [asdict(f) for f in r.findings]}
                for r in all_reports
            ],
            "total_findings": total_findings,
        }
        out = root / "starter-check-report.json"
        out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        print(f"  wrote {out.name}")

    if total_findings > 0:
        print(f"starter-check: {total_findings} finding(s) — FAIL")
        return 1
    print("starter-check: all clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
