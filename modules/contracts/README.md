# Module Interface Contracts

Per-module Interface Control Documents (ICDs) extracted from `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard`. Introduced by the Pass-3 post-tranche-2 action (2026-04-22) to decouple rapidly-evolving module contracts from the standard's version cadence.

## Structure

```
modules/
├── modules.json              # module catalog (Pass-3 tranche-1 extract)
├── CHANGELOG.md              # catalog change log
└── contracts/
    ├── _manifest.json        # generated index of all 40 contracts
    ├── M-01-identity.md
    ├── M-02-authentication.md
    ├── ...
    └── M-40-cache.md
```

## Ownership & change control

| Scope | Owner | Approver | Version cadence |
|-------|-------|----------|-----------------|
| Per-module contract body (non-breaking) | module author | `eng-lead` | as needed; no STD-ENG-008 bump required |
| Per-module contract (breaking, per ICD-6) | module author | RFC via STD-ENG-007 | consumers notified via RFC window |
| Shared contracts (ICD-4…ICD-9) | Engineering Architecture | `eng-lead` + `sec-lead` | STD-ENG-008 version bump |
| Manifest `_manifest.json` (regeneration) | CI | — | auto on merge |

## Regeneration

```bash
python3 tools/extract-icds.py
```

The extractor is idempotent: running it again overwrites the per-module contract files from the current source of truth (`[33]-STD-ENG-008…md` §ICD-3.x). Until the ICD-3.x sections are removed from the source doc and replaced with a pointer, the source doc remains authoritative. After the `[33]` v2.0 refactor, `modules/contracts/` becomes authoritative and the extractor is decommissioned.

## Current state

- **Extraction mode:** mirrored. Source-doc ICD-3.x sections remain canonical; per-module files are generated copies for downstream linking (RFCs, PR reviews, module-consumer docs).
- **Next step (tracked):** cut ICD-3.x from the source doc after first real reuse event (PR cites `modules/contracts/M-NN-…md` directly). That event triggers `[33]` v2.0.

## Cross-references

- `STD-ENG-008` §ICD-1 — Interface Classification (T1 / T2 / T3 surfaces).
- `STD-ENG-008` §ICD-6 — API Versioning Contract (semver rules for module contracts).
- `STD-ENG-007` — RFC process for breaking-change ICDs.
- `modules/modules.json` — module catalog; each entry links to its contract file.
