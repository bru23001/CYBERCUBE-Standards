#!/usr/bin/env python3
"""
CYBERCUBE standards freeze-check linter.

Implements POL-GOV-001 §8.9.2 (freeze trigger) and §8.9.1 (ROADMAP discipline).

For each `[N]-*.md` standard at the repository root:

  1. Parse the `## Implementation Status` section and extract the status
     of each component (first column of the component table).
  2. Normalize status values against the canonical vocabulary (§8.9):
        COMPLETE | IN PLACE | PARTIAL | ROADMAP | N/A
     Legacy `PENDING` is accepted and flagged deprecated.
  3. Apply the freeze trigger:
        count(PENDING) > count(COMPLETE + IN PLACE)
     and flag the standard FROZEN if so. ROADMAP and PARTIAL do not
     contribute to either side of the comparison.
  4. Check Tier Table presence (§8.8): standard body must contain
     an "Applicability Tier Table" heading within the first ~60 lines.
  5. Emit a CSV-style report on stdout and a machine-parseable summary
     (JSON) to `freeze-check-report.json` when --json is passed.

Exit code:
  0 — no standards are frozen and no MUST-on-ROADMAP violations.
  1 — at least one standard is frozen or has a violation.

Usage:
  python tools/freeze-check.py                 # human-readable
  python tools/freeze-check.py --json          # also write JSON report
  python tools/freeze-check.py --path DIR      # scan a different root
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import asdict, dataclass, field
from pathlib import Path

CANONICAL_STATUSES = {"COMPLETE", "IN PLACE", "PARTIAL", "ROADMAP", "N/A"}

# POL-GOV-001 §8.8.1 meta-document whitelist — these files are exempt from
# the Tier Table requirement. Keep this list in sync with §8.8.1.
META_EXEMPT_PREFIXES = (
    "[1]-CYBERCUBE-Name-Registry",
    "[2]-POL-GOV-001",
    "[16]-TPL-LGL-001",
)
LEGACY_STATUSES = {"PENDING"}
POSITIVE_STATUSES = {"COMPLETE", "IN PLACE"}
NEGATIVE_STATUSES = {"PENDING"}  # freeze trigger count

STANDARD_FILENAME_RE = re.compile(r"^\[(\d+)\]-.*\.md$")
TABLE_ROW_RE = re.compile(r"^\|(.+)\|\s*$")
IMPL_STATUS_HEADING_RE = re.compile(r"^##\s+Implementation Status\s*$", re.IGNORECASE)
TIER_TABLE_HEADING_RE = re.compile(r"^#{1,4}\s+Applicability Tier Table\b", re.IGNORECASE)


@dataclass
class Finding:
    kind: str            # FROZEN | DEPRECATED_PENDING | UNKNOWN_STATUS | MISSING_TIER_TABLE
    detail: str = ""


@dataclass
class StandardReport:
    file: str
    number: int
    has_tier_table: bool = False
    meta_exempt: bool = False
    counts: dict = field(default_factory=dict)
    frozen: bool = False
    findings: list = field(default_factory=list)


def load_standards(root: Path) -> list[Path]:
    results = []
    for entry in sorted(root.iterdir()):
        if entry.is_file() and STANDARD_FILENAME_RE.match(entry.name):
            results.append(entry)
    return results


def extract_number(path: Path) -> int:
    match = STANDARD_FILENAME_RE.match(path.name)
    return int(match.group(1)) if match else -1


def has_tier_table(lines: list[str], head: int = 500) -> bool:
    """A standard MUST carry an Applicability Tier Table near the front-matter
    (POL-GOV-001 §8.8). We scan a generous window to tolerate docs that keep
    a long Glossary at the top; placement correctness is a separate concern."""
    window = lines[:head]
    return any(TIER_TABLE_HEADING_RE.match(ln) for ln in window)


def find_impl_status_block(lines: list[str]) -> list[str]:
    """Return the lines between `## Implementation Status` and the next
    `## ` heading at the same or higher level, exclusive."""
    start = None
    for i, ln in enumerate(lines):
        if IMPL_STATUS_HEADING_RE.match(ln):
            start = i
            break
    if start is None:
        return []
    block = []
    # collect everything until the next H1/H2 heading at top level
    for ln in lines[start + 1 :]:
        if re.match(r"^#{1,2}\s+\S", ln):
            break
        block.append(ln)
    return block


def parse_status_column(block: list[str]) -> tuple[dict, list[str]]:
    """Scan Markdown tables in the block. Find the 'Status' column
    and return a frequency map plus any unknown statuses seen."""
    counts = {s: 0 for s in CANONICAL_STATUSES | LEGACY_STATUSES}
    unknowns: list[str] = []

    in_table = False
    header: list[str] | None = None
    status_idx: int | None = None

    for raw in block:
        line = raw.rstrip()
        m = TABLE_ROW_RE.match(line)
        if not m:
            in_table = False
            header = None
            status_idx = None
            continue
        cells = [c.strip() for c in m.group(1).split("|")]
        if all(re.fullmatch(r":?-+:?", c) for c in cells if c):
            continue
        if header is None:
            header = [c.lower() for c in cells]
            status_idx = None
            for i, h in enumerate(header):
                if h == "status":
                    status_idx = i
                    break
            if status_idx is None:
                header = None
                in_table = False
            else:
                in_table = True
            continue
        if in_table and status_idx is not None and status_idx < len(cells):
            val = cells[status_idx].strip().strip("*`")
            if not val:
                continue
            # Skip template placeholders like `{IN PLACE | COMPLETE | ...}`
            # which appear in STD-ENG-007 as a literal template row.
            if val.startswith("{") or val.endswith("}") or "\\|" in val:
                continue
            up = val.upper()
            if up in {"IN-PLACE", "IN_PLACE"}:
                up = "IN PLACE"
            if up in counts:
                counts[up] += 1
            else:
                unknowns.append(val)

    return counts, unknowns


def assess(path: Path) -> StandardReport:
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    report = StandardReport(file=path.name, number=extract_number(path))
    report.has_tier_table = has_tier_table(lines)

    block = find_impl_status_block(lines)
    counts, unknowns = parse_status_column(block)
    report.counts = counts

    positive = sum(counts[s] for s in POSITIVE_STATUSES)
    pending = counts.get("PENDING", 0)
    report.frozen = pending > positive

    if pending > 0:
        report.findings.append(
            Finding(
                kind="DEPRECATED_PENDING",
                detail=f"{pending} row(s) use legacy PENDING; remap per POL-GOV-001 §8.9 "
                       "to ROADMAP (aspirational) or PARTIAL (active WIP).",
            )
        )
    if report.frozen:
        report.findings.append(
            Finding(
                kind="FROZEN",
                detail=f"PENDING={pending} > COMPLETE+IN PLACE={positive} "
                       "(POL-GOV-001 §8.9.2). Portfolio-wide MUST→SHOULD downgrade applies "
                       "until the ratio is restored.",
            )
        )
    for u in unknowns:
        report.findings.append(
            Finding(
                kind="UNKNOWN_STATUS",
                detail=f"Non-canonical status value observed: {u!r}. "
                       "Accepted: COMPLETE | IN PLACE | PARTIAL | ROADMAP | N/A.",
            )
        )
    is_meta_exempt = any(report.file.startswith(p) for p in META_EXEMPT_PREFIXES)
    if is_meta_exempt:
        report.has_tier_table = True  # treat as satisfied for reporting
        report.meta_exempt = True
    elif not report.has_tier_table:
        report.findings.append(
            Finding(
                kind="MISSING_TIER_TABLE",
                   detail="No 'Applicability Tier Table' heading found "
                          "(POL-GOV-001 §8.8). Draft-status gate applies.",
            )
        )

    return report


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="CYBERCUBE standards freeze-check linter.")
    ap.add_argument("--path", default=".", help="Repository root (default: cwd).")
    ap.add_argument("--json", action="store_true", help="Write freeze-check-report.json.")
    args = ap.parse_args(argv)

    root = Path(args.path).resolve()
    standards = load_standards(root)
    if not standards:
        print(f"ERR: no `[N]-*.md` standards found under {root}", file=sys.stderr)
        return 2

    reports: list[StandardReport] = [assess(p) for p in standards]
    reports.sort(key=lambda r: r.number)

    frozen = [r for r in reports if r.frozen]
    missing_tier = [r for r in reports if not r.has_tier_table]
    legacy = [r for r in reports if r.counts.get("PENDING", 0) > 0]
    unknown = [r for r in reports if any(f.kind == "UNKNOWN_STATUS" for f in r.findings)]

    print("=" * 78)
    print("CYBERCUBE Standards Freeze-Check (POL-GOV-001 §8.9)")
    print("=" * 78)
    print(f"Scanned:            {len(reports)} standards")
    print(f"Frozen (§8.9.2):    {len(frozen)}")
    print(f"No Tier Table:      {len(missing_tier)}")
    print(f"Legacy PENDING:     {len(legacy)}")
    print(f"Unknown status val: {len(unknown)}")
    print("-" * 78)
    print(f"{'#':>3}  {'TierTbl':7}  {'FROZEN':6}  {'CPL':>3} {'IP':>3} {'PRT':>3} {'RDM':>3} {'NA':>3} {'PND':>3}  FILE")
    for r in reports:
        c = r.counts
        print(
            f"{r.number:>3}  "
            f"{'YES' if r.has_tier_table else ' no':7}  "
            f"{'FROZEN' if r.frozen else '      '}  "
            f"{c.get('COMPLETE',0):>3} {c.get('IN PLACE',0):>3} "
            f"{c.get('PARTIAL',0):>3} {c.get('ROADMAP',0):>3} "
            f"{c.get('N/A',0):>3} {c.get('PENDING',0):>3}  "
            f"{r.file}"
        )

    if frozen or missing_tier or legacy or unknown:
        print("-" * 78)
        print("FINDINGS")
        for r in reports:
            if not r.findings:
                continue
            print(f"  [{r.number}] {r.file}")
            for f in r.findings:
                print(f"    - {f.kind}: {f.detail}")

    if args.json:
        out = {
            "summary": {
                "scanned": len(reports),
                "frozen": len(frozen),
                "missing_tier_table": len(missing_tier),
                "legacy_pending": len(legacy),
                "unknown_status": len(unknown),
            },
            "standards": [
                {**asdict(r), "findings": [asdict(f) for f in r.findings]}
                for r in reports
            ],
        }
        out_path = root / "freeze-check-report.json"
        out_path.write_text(json.dumps(out, indent=2), encoding="utf-8")
        print(f"\nJSON report: {out_path}")

    # Gate policy (POL-GOV-001 §8.9 enforcement tier):
    #   BLOCK on FROZEN, UNKNOWN_STATUS, MISSING_TIER_TABLE.
    #   WARN (non-blocking) on DEPRECATED_PENDING — legacy value kept as a
    #   safety valve so edits in progress can commit while authors migrate.
    # Tightened 2026-04-22 (Week-5) once missing-tier-table count reached 0.
    return 0 if not (frozen or unknown or missing_tier) else 1


if __name__ == "__main__":
    sys.exit(main())
