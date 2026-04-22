# CYBERCUBE Modules Registry — Change Log

This log tracks non-breaking changes to `modules/modules.json`.

`modules.json` is **data** (the catalog of reusable modules). The governing
**standard** — `[33] STD-ENG-008` — defines the *rules* modules must follow.

Catalog changes that do **not** alter the rules in STD-ENG-008 are recorded
here. Changes that alter the rules require a version bump of STD-ENG-008
under POL-GOV-001 §8 change-control.

## Governance

- **Owner:** Engineering Architecture.
- **Add/rename/remove a module:** PR against `modules/modules.json` + row
  in this changelog. Approver: `eng-lead` (POL-GOV-001 §8).
- **Rewire a module's `source_standard` or `group`:** same.
- **Change the module's rules (interface contract, security posture,
  compatibility envelope):** version bump of STD-ENG-008 + ADR.

## Entries

| Date | Change | Reason | PR |
|------|--------|--------|----|
| 2026-04-22 | Catalog extracted from `[33] STD-ENG-008 v1.1` into `modules/modules.json` (40 modules). No semantic change — split of data from rules per Pass-3 friction audit §21.4 item #2. | Reduce standard line-count (4,611 → rules-only target ≤ 1,500). Decouple catalog updates from standard version bumps. | Pass-3 tranche-1 |
