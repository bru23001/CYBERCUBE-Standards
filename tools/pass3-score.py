#!/usr/bin/env python3
"""
CYBERCUBE Pass-3 Friction Audit scorer (§20.7 framework).

Consumes:
  - freeze-check-report.json                     (objective signals)
  - Every [N]-*.md in repo root                  (line count, MUST count, cross-refs)
  - forms/responses/author-<N>.yaml              (author self-assessment, optional)
  - forms/responses/survey-<N>.yaml              (delivery-team aggregate, optional)
  - forms/responses/m-overrides.yaml             (Automatability manual map, optional)

Emits per §20.7.1:
  C (Clarity) · A (Actionability) · M (Automatability) · P (Proportionality)
  Composite = (C+A+M+P)/4, rounded to 1dp
  Friction flag: any axis ≤ 2 → 🔴 (avg ≤ 2.5) / 🟡 (otherwise)

Usage:
    python3 tools/pass3-score.py                 # markdown table to stdout
    python3 tools/pass3-score.py --json          # machine-readable
    python3 tools/pass3-score.py --write §21     # append to audit report
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from dataclasses import asdict, dataclass, field
from typing import Any

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
FREEZE_REPORT = REPO_ROOT / "freeze-check-report.json"
STANDARDS_GLOB = "[[]*[]]-*.md"
RESPONSES_DIR = REPO_ROOT / "forms" / "responses"

STD_FILE_RE = re.compile(r"^\[(\d+)\]-(.+)\.md$")
MUST_RE = re.compile(r"\b(MUST|MUST NOT)\b")
CROSS_REF_RE = re.compile(r"\b(POL|STD|FWK|TPL|PLN)-[A-Z]{3}-\d{3}\b")
META_EXEMPT_NUMBERS = {1, 2, 16}


# ---------------------------------------------------------------------------
# Objective proxies (§20.7.2 items 1-3)
# ---------------------------------------------------------------------------

def must_density_to_score(must_per_kloc: float) -> int:
    """Clarity proxy: high MUST density → low Clarity."""
    if must_per_kloc <= 10: return 5
    if must_per_kloc <= 20: return 4
    if must_per_kloc <= 30: return 3
    if must_per_kloc <= 45: return 2
    return 1


def roadmap_ratio_to_score(ratio: float) -> int:
    """Actionability proxy: high ROADMAP ratio → low Actionability (aspirational)."""
    if ratio <= 0.10: return 5
    if ratio <= 0.25: return 4
    if ratio <= 0.50: return 3
    if ratio <= 0.75: return 2
    return 1


def crossref_fanout_to_score(n: int) -> int:
    """Proportionality proxy (coarse): high fan-out → coordination burden."""
    if n <= 5:  return 5
    if n <= 15: return 4
    if n <= 25: return 3
    if n <= 40: return 2
    return 1


# ---------------------------------------------------------------------------
# Data collection
# ---------------------------------------------------------------------------

@dataclass
class StandardSignals:
    number: int
    file: str
    meta_exempt: bool
    line_count: int
    must_count: int
    must_density_per_kloc: float
    roadmap_ratio: float
    crossref_count: int


@dataclass
class SubjectiveScores:
    C: float | None = None
    A: float | None = None
    M: float | None = None
    P: float | None = None
    source: list[str] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)


@dataclass
class ScoreRow:
    number: int
    file: str
    meta_exempt: bool
    signals: dict
    objective: dict     # {C,A,M,P}
    subjective: dict    # {C,A,M,P,source,notes}
    composite: dict     # {C,A,M,P,mean,flag}


def collect_signals(freeze_report: dict) -> list[StandardSignals]:
    signals: list[StandardSignals] = []
    by_number = {s["number"]: s for s in freeze_report.get("standards", [])}

    for md in sorted(REPO_ROOT.glob(STANDARDS_GLOB)):
        m = STD_FILE_RE.match(md.name)
        if not m:
            continue
        n = int(m.group(1))
        txt = md.read_text(errors="replace")
        lines = txt.count("\n") + 1
        must = len(MUST_RE.findall(txt))
        xrefs = len(set(CROSS_REF_RE.findall(txt)))
        counts = by_number.get(n, {}).get("counts", {})
        total = sum(counts.values())
        rmap = counts.get("ROADMAP", 0)
        ratio = (rmap / total) if total else 0.0

        signals.append(StandardSignals(
            number=n,
            file=md.name,
            meta_exempt=(n in META_EXEMPT_NUMBERS),
            line_count=lines,
            must_count=must,
            must_density_per_kloc=round(must / max(1, lines) * 1000, 1),
            roadmap_ratio=round(ratio, 3),
            crossref_count=xrefs,
        ))
    return signals


def load_subjective(number: int) -> SubjectiveScores:
    """Load author + survey YAML if present. No PyYAML dependency: minimal parser."""
    subj = SubjectiveScores()
    for kind in ("author", "survey"):
        p = RESPONSES_DIR / f"{kind}-{number}.yaml"
        if not p.exists():
            continue
        scores = _parse_minimal_yaml_scores(p.read_text())
        if not scores:
            continue
        subj.source.append(p.name)
        for axis in ("C", "A", "M", "P"):
            if axis in scores:
                prior = getattr(subj, axis)
                v = float(scores[axis])
                # Average if both sources provided this axis.
                setattr(subj, axis, v if prior is None else (prior + v) / 2)
        if "notes" in scores:
            subj.notes.append(f"{kind}: {scores['notes']}")
    return subj


def _parse_minimal_yaml_scores(text: str) -> dict:
    """Extract top-level scalar keys C/A/M/P/notes. Tiny footprint — no PyYAML.

    Accepts either:
        C: 4
        A: 3
    Or nested under a `scores:` key. Ignores everything else.
    """
    out: dict = {}
    in_scores = False
    for raw in text.splitlines():
        line = raw.rstrip()
        if not line or line.lstrip().startswith("#"):
            continue
        stripped = line.strip()
        if stripped in ("scores:", "score:"):
            in_scores = True
            continue
        if ":" not in line:
            continue
        # Accept top-level keys OR indented keys under scores:
        indent = len(line) - len(line.lstrip())
        if indent == 0:
            in_scores = False
        key, _, val = stripped.partition(":")
        key = key.strip()
        val = val.strip().strip("'\"")
        if key in ("C", "A", "M", "P") and val:
            try:
                out[key] = float(val)
            except ValueError:
                pass
        elif key == "notes" and val and "notes" not in out:
            out["notes"] = val
    return out


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

def score_one(s: StandardSignals, m_overrides: dict[int, int]) -> ScoreRow:
    obj = {
        "C": must_density_to_score(s.must_density_per_kloc),
        "A": roadmap_ratio_to_score(s.roadmap_ratio),
        "M": m_overrides.get(s.number, 3),   # neutral default; overrides set per §21.11 schemas wiring
        "P": crossref_fanout_to_score(s.crossref_count),
    }
    subj = load_subjective(s.number)

    # Blend: subjective weighted 0.6, objective 0.4, per axis. If no subjective, use objective.
    composite_per_axis: dict[str, float] = {}
    for axis in ("C", "A", "M", "P"):
        sv = getattr(subj, axis)
        if sv is None:
            composite_per_axis[axis] = float(obj[axis])
        else:
            composite_per_axis[axis] = round(0.4 * obj[axis] + 0.6 * sv, 2)

    mean = round(sum(composite_per_axis.values()) / 4, 1)
    min_axis = min(composite_per_axis.values())
    if s.meta_exempt:
        flag = "(exempt)"
    elif min_axis <= 2:
        flag = "🔴" if mean <= 2.5 else "🟡"
    else:
        flag = "—"

    return ScoreRow(
        number=s.number,
        file=s.file,
        meta_exempt=s.meta_exempt,
        signals=asdict(s),
        objective=obj,
        subjective={k: getattr(subj, k) for k in ("C", "A", "M", "P")} | {
            "source": subj.source,
            "notes": subj.notes,
        },
        composite=composite_per_axis | {"mean": mean, "flag": flag},
    )


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def emit_markdown(rows: list[ScoreRow]) -> str:
    out = []
    out.append("| # | Standard | Lines | MUSTs | MUST/kLOC | ROADMAP% | C | A | M | P | Composite | Flag | Inputs |")
    out.append("|---|----------|------:|------:|----------:|---------:|--:|--:|--:|--:|----------:|:----:|--------|")
    for r in rows:
        s = r.signals
        c = r.composite
        subj_src = ",".join(r.subjective["source"]) or "objective-only"
        out.append(
            f"| {r.number} | {pathlib.Path(s['file']).stem[:55]} | "
            f"{s['line_count']} | {s['must_count']} | {s['must_density_per_kloc']} | "
            f"{int(s['roadmap_ratio']*100)}% | "
            f"{c['C']} | {c['A']} | {c['M']} | {c['P']} | "
            f"**{c['mean']}** | {c['flag']} | {subj_src} |"
        )
    objective_only = sum(1 for r in rows if not r.subjective["source"] and not r.meta_exempt)
    scored = sum(1 for r in rows if not r.meta_exempt)
    exempt = sum(1 for r in rows if r.meta_exempt)
    flagged = sum(1 for r in rows if r.composite["flag"] in ("🔴", "🟡"))
    severe = sum(1 for r in rows if r.composite["flag"] == "🔴")
    out.append("")
    out.append(
        f"**Summary:** scored={scored} · exempt={exempt} · "
        f"objective-only={objective_only} · friction-flagged={flagged} (severe={severe})"
    )
    return "\n".join(out)


def emit_json(rows: list[ScoreRow]) -> str:
    return json.dumps([asdict(r) for r in rows], indent=2, default=str)


def main() -> int:
    ap = argparse.ArgumentParser(description="CYBERCUBE Pass-3 friction audit scorer.")
    ap.add_argument("--json", action="store_true", help="Emit JSON instead of markdown.")
    ap.add_argument("--freeze-report", default=str(FREEZE_REPORT),
                    help="Path to freeze-check JSON. Runs freeze-check.py if missing.")
    args = ap.parse_args()

    fr_path = pathlib.Path(args.freeze_report)
    if not fr_path.exists():
        print(f"ERROR: {fr_path} not found. Run `python3 tools/freeze-check.py --json` first.",
              file=sys.stderr)
        return 1

    freeze_report = json.loads(fr_path.read_text())

    # §21.11 — standards with machine-readable schemas bound get M override to 4.
    m_overrides_path = RESPONSES_DIR / "m-overrides.yaml"
    m_overrides: dict[int, int] = {}
    if m_overrides_path.exists():
        for line in m_overrides_path.read_text().splitlines():
            line = line.split("#", 1)[0].strip()
            if not line or ":" not in line:
                continue
            k, _, v = line.partition(":")
            try:
                m_overrides[int(k.strip())] = int(v.strip())
            except ValueError:
                pass

    signals = collect_signals(freeze_report)
    rows = [score_one(s, m_overrides) for s in signals]
    rows.sort(key=lambda r: r.number)

    if args.json:
        print(emit_json(rows))
    else:
        print(emit_markdown(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
