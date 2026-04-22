# CYBERCUBE Governance Schemas

Machine-readable contracts for governance artifacts. Introduced by Pass-3 tranche-2 (2026-04-22) to raise Automatability (M) for standards whose rules previously had no mechanical verifier.

## Files

| Schema | Bound Standard | Artifact location (default) | Purpose |
|--------|----------------|-----------------------------|---------|
| `adr.schema.json` | [3] POL-GOV-002 | `governance/adrs/ADR-*.json` | ADR front-matter. Enables an ADR index generator + status/superseded-by validation. |
| `risk-register.schema.json` | [8] STD-ERM-001 | `governance/risk-register.json` | Enterprise risk register rows. Lints against the STD-GOV-006 UCM control IDs and STD-GOV-005 KRI IDs. |
| `vendor-inventory.schema.json` | [9] POL-VEN-001 | `governance/vendor-inventory.json` | Vendor inventory. Lints against PCL criticality (STD-GOV-001) and DPA template (TPL-LGL-001). |
| `audit-finding.schema.json` | [44] STD-GOV-004 | `governance/audit-findings.json` | Internal-audit findings. Cross-refs UCM controls + RISK-IDs + waiver IDs. |

## Usage

```bash
# one-shot validation
pip install jsonschema
python tools/validate-schemas.py --json

# extra artifact paths
python tools/validate-schemas.py --path custom/my-risks.json --path custom/my-findings.json

# strict mode — fail if no artifacts found
python tools/validate-schemas.py --strict
```

Exit code `0` → all found artifacts validate. Exit code `1` → at least one failure.

## Governance

- **Schemas are versioned** via `$id` (`.v1.json` suffix). Breaking changes bump to `.v2.json` and run both validators in parallel during transition.
- **Schema changes** follow POL-GOV-001 §8 change control. Adding optional properties is not a breaking change; changing required properties or enum values is.
- **Owner:** Engineering Architecture. Approver for schema changes: `eng-lead`.
- **Artifact absence** is currently allowed (bootstrap). Flip to `--strict` in CI once each governance team has published its first real artifact.

## CI integration (stub)

Once artifacts exist, add a job mirroring `freeze-check.yml`:

```yaml
jobs:
  schema-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install jsonschema
      - run: python tools/validate-schemas.py --strict --json
```
