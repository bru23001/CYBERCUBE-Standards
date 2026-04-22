# CYBERCUBE Governance Artifacts

Runtime register files validated by `tools/validate-schemas.py` against `schemas/*.schema.json`. Introduced by Pass-3 post-tranche-2 (2026-04-22) to give the validator a real target and allow `--strict` mode in CI.

## Contents

| File | Schema | Owner | Bound standard |
|------|--------|-------|----------------|
| `adrs/ADR-*.json` | `adr.schema.json` | `eng-lead` (ARB) | [3] POL-GOV-002 |
| `risk-register.json` | `risk-register.schema.json` | `sec-lead` / risk owners | [8] STD-ERM-001 |
| `vendor-inventory.json` | `vendor-inventory.schema.json` | `procurement` / vendor owners | [9] POL-VEN-001 |
| `audit-findings.json` | `audit-finding.schema.json` | Internal Audit | [44] STD-GOV-004 |

## Current state — BOOTSTRAP

Each register currently contains a single **bootstrap seed entry** whose `title` starts with "Bootstrap …". These seeds exist only to satisfy `--strict` validation while the real registers are being populated. They MUST be replaced or removed before the first real entry in each register lands. CI warning: once a register contains a seed entry **and** any real entry, the validator emits `SEED_STILL_PRESENT` (non-blocking for now; promoted to error at the first quarterly governance review).

## Validation

```bash
pip install jsonschema
python3 tools/validate-schemas.py --strict --json
```

Exit 0 → clean. Exit 1 → at least one register failed validation. See `schemas/README.md` for the CI job stub.

## Change control

- Schema changes → POL-GOV-001 §8 (RFC required for breaking changes).
- Artifact changes → per-register owner listed above. No standard version bump required; history preserved via git.
