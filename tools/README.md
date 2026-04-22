# tools/

Small scripts that check and enforce the CYBERCUBE standards portfolio.

## `freeze-check.py`

Implements the freeze trigger defined in **POL-GOV-001 §8.9.2** and the ROADMAP discipline in **§8.9.1**.

For every `[N]-*.md` standard at the repository root the script:

1. Parses the `## Implementation Status` section and extracts the `Status` column of each component table.
2. Normalises values against the canonical vocabulary: `COMPLETE | IN PLACE | PARTIAL | ROADMAP | N/A`.
3. Applies `count(PENDING) > count(COMPLETE + IN PLACE)` and reports any standard that trips the freeze trigger.
4. Checks that an `Applicability Tier Table` heading exists near the top (POL-GOV-001 §8.8).

### Usage

```bash
# from the repository root
python3 tools/freeze-check.py           # human-readable report
python3 tools/freeze-check.py --json    # also writes freeze-check-report.json
```

Exit codes:

| Code | Meaning |
|------|---------|
| 0 | No standards frozen and no unknown status values. |
| 1 | At least one standard is frozen or carries a non-canonical status. |
| 2 | No standards found under `--path`. |

### Intended use in CI

Run on every pull request that touches `[N]-*.md`. A non-zero exit SHOULD block merge unless a waiver is attached per POL-GOV-001 §8.3.

### Extending

* Freeze thresholds or weights: edit `POSITIVE_STATUSES` / `NEGATIVE_STATUSES`.
* New canonical status values: extend `CANONICAL_STATUSES` and update POL-GOV-001 §8.9 in lockstep.
* Additional section parsers (e.g. Tier Table contents): follow the `parse_status_column` pattern.
