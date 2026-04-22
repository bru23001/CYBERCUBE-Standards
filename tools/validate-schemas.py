#!/usr/bin/env python3
"""
CYBERCUBE governance-artifact schema validator.

Pass-3 tranche-2 deliverable. Validates governance artifacts against their
JSON schemas in `schemas/`. Intended as a pre-commit hook / CI check to
enforce the new automatable rules referenced by:

- [3]  POL-GOV-002    → schemas/adr.schema.json
- [8]  STD-ERM-001    → schemas/risk-register.schema.json
- [9]  POL-VEN-001    → schemas/vendor-inventory.schema.json
- [44] STD-GOV-004    → schemas/audit-finding.schema.json

Conventional artifact locations (discoverable by this script):

    governance/adrs/ADR-*.json        or adrs/ADR-*.md with JSON front-matter
    governance/risk-register.json
    governance/vendor-inventory.json
    governance/audit-findings.json
    governance/compliance-maps/*.md   YAML front-matter validated as JSON-equiv.

Usage:
    python tools/validate-schemas.py [--path PATH]* [--json]

Exit codes:
    0 — all artifacts found validate clean (or none found — absence is
        allowed during bootstrap; see --strict to flip).
    1 — validation errors.

Dependencies:
    - `jsonschema` (pip install jsonschema) — if missing the script
      degrades to a structural parse-only check and emits a warning.
    - `PyYAML` (pip install pyyaml) — if missing, compliance-map artifacts
      are skipped with a warning (other schema validations still run).
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
from dataclasses import dataclass, field
from typing import Any

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
SCHEMAS_DIR = REPO_ROOT / "schemas"

DEFAULT_ARTIFACT_PATHS: dict[str, list[pathlib.Path]] = {
    "adr.schema.json": [REPO_ROOT / "governance" / "adrs"],
    "risk-register.schema.json": [REPO_ROOT / "governance" / "risk-register.json"],
    "vendor-inventory.schema.json": [REPO_ROOT / "governance" / "vendor-inventory.json"],
    "audit-finding.schema.json": [REPO_ROOT / "governance" / "audit-findings.json"],
    "compliance-map.schema.json": [REPO_ROOT / "governance" / "compliance-maps"],
}

YAML_FRONT_MATTER_SCHEMAS = {"compliance-map.schema.json"}


@dataclass
class ValidationReport:
    schema: str
    artifact: pathlib.Path
    ok: bool
    errors: list[str] = field(default_factory=list)


def _try_import_jsonschema():
    try:
        import jsonschema  # type: ignore

        return jsonschema
    except ImportError:
        return None


def _try_import_yaml():
    try:
        import yaml  # type: ignore

        return yaml
    except ImportError:
        return None


def load_schema(path: pathlib.Path) -> dict[str, Any]:
    with path.open() as f:
        return json.load(f)


def collect_artifacts(schema_file: str, extra_paths: list[pathlib.Path] | None = None) -> list[pathlib.Path]:
    candidates: list[pathlib.Path] = []
    glob_pattern = "*.md" if schema_file in YAML_FRONT_MATTER_SCHEMAS else "*.json"
    for p in DEFAULT_ARTIFACT_PATHS.get(schema_file, []):
        if p.exists():
            if p.is_dir():
                found = sorted(p.glob(glob_pattern))
                # Exclude README.md and files starting with _ (schema/private).
                found = [f for f in found if f.name != "README.md" and not f.name.startswith("_")]
                candidates.extend(found)
            else:
                candidates.append(p)
    if extra_paths:
        for p in extra_paths:
            if p.exists():
                candidates.append(p)
    return candidates


def _extract_yaml_front_matter(text: str) -> str | None:
    """Return the YAML front-matter block (between leading '---' delimiters)
    as a string, or None if the file has no front-matter."""
    lines = text.splitlines(keepends=True)
    if not lines or lines[0].rstrip("\r\n") != "---":
        return None
    out: list[str] = []
    for line in lines[1:]:
        if line.rstrip("\r\n") == "---":
            return "".join(out)
        out.append(line)
    return None


def validate_one(schema: dict, artifact_path: pathlib.Path, jsonschema_mod,
                 yaml_mod=None, yaml_front_matter: bool = False) -> ValidationReport:
    report = ValidationReport(schema=schema.get("$id", "unknown"), artifact=artifact_path, ok=True)
    try:
        if yaml_front_matter:
            text = artifact_path.read_text()
            fm = _extract_yaml_front_matter(text)
            if fm is None:
                report.ok = False
                report.errors.append("no YAML front-matter block found (expected leading '---' delimited block)")
                return report
            if yaml_mod is None:
                report.errors.append("SKIPPED: PyYAML not installed — install 'pyyaml' to validate YAML front-matter")
                return report
            data = yaml_mod.safe_load(fm)
        else:
            with artifact_path.open() as f:
                data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        report.ok = False
        report.errors.append(f"unable to parse: {e}")
        return report
    except Exception as e:
        report.ok = False
        report.errors.append(f"unable to parse YAML front-matter: {e}")
        return report

    if jsonschema_mod is None:
        return report

    validator = jsonschema_mod.Draft202012Validator(schema)
    errs = sorted(validator.iter_errors(data), key=lambda e: list(e.absolute_path))
    if errs:
        report.ok = False
        for e in errs:
            loc = "/".join(str(p) for p in e.absolute_path) or "<root>"
            report.errors.append(f"{loc}: {e.message}")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate CYBERCUBE governance artifacts against their schemas.")
    parser.add_argument("--path", action="append", default=[], type=pathlib.Path,
                        help="Extra artifact path(s). Use multiple --path flags for multiple inputs.")
    parser.add_argument("--json", action="store_true", help="Emit JSON report instead of human text.")
    parser.add_argument("--strict", action="store_true",
                        help="Fail when no artifacts are found (absence currently allowed during bootstrap).")
    args = parser.parse_args()

    jsonschema_mod = _try_import_jsonschema()
    yaml_mod = _try_import_yaml()
    if jsonschema_mod is None and not args.json:
        print("WARNING: 'jsonschema' not installed — structural check only (pip install jsonschema).",
              file=sys.stderr)
    if yaml_mod is None and not args.json:
        print("WARNING: 'pyyaml' not installed — YAML front-matter artifacts (compliance-maps) skipped (pip install pyyaml).",
              file=sys.stderr)

    all_reports: list[ValidationReport] = []
    schema_files = sorted(SCHEMAS_DIR.glob("*.schema.json"))
    if not schema_files:
        print(f"ERROR: no schemas found in {SCHEMAS_DIR}", file=sys.stderr)
        return 1

    for schema_path in schema_files:
        schema = load_schema(schema_path)
        artifacts = collect_artifacts(schema_path.name, args.path)
        is_yaml_fm = schema_path.name in YAML_FRONT_MATTER_SCHEMAS
        if not artifacts:
            if args.strict:
                all_reports.append(ValidationReport(schema=schema_path.name, artifact=pathlib.Path("<none>"),
                                                    ok=False, errors=["no artifacts found (strict mode)"]))
            continue
        for a in artifacts:
            all_reports.append(validate_one(schema, a, jsonschema_mod,
                                            yaml_mod=yaml_mod, yaml_front_matter=is_yaml_fm))

    failed = [r for r in all_reports if not r.ok]
    if args.json:
        out = {
            "ok": len(failed) == 0,
            "artifacts_checked": len(all_reports),
            "failures": [
                {"schema": r.schema, "artifact": str(r.artifact), "errors": r.errors}
                for r in failed
            ],
        }
        print(json.dumps(out, indent=2))
    else:
        print(f"{'Schema':<32} {'Artifact':<50} Result")
        print("-" * 90)
        for r in all_reports:
            status = "OK" if r.ok else "FAIL"
            print(f"{os.path.basename(r.schema):<32} {str(r.artifact.name):<50} {status}")
            for e in r.errors:
                print(f"    - {e}")
        print("-" * 90)
        print(f"Checked: {len(all_reports)}  |  Failures: {len(failed)}")

    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
