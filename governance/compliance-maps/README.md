# CYBERCUBE Compliance Maps

This directory holds CYBERCUBE's self-assessed crosswalks between the **Unified Control Matrix (UCM)** in [7] STD-GOV-006 and external regulatory frameworks. Each regulation lives in its own Markdown file with a machine-readable YAML front-matter block validated by `schemas/compliance-map.schema.json`.

**These maps are non-authoritative.** They are CYBERCUBE's good-faith self-assessment; they are *not* a regulator attestation, QSA report of compliance, or auditor opinion. The regulation text is always the authority; our map is a navigation aid.

## File structure

Every mapping file has this shape:

```markdown
---
regulation:
  id: <slug>
  name: <full regulation name>
  version: <regulation version string>
  authority: <issuing body>
  effective: <YYYY-MM-DD>
  published_map: <YYYY-MM-DD>        # date this snapshot is valid as of
  owner: <role>                       # accountable for keeping this map current
  authoritative: false                # MUST be false
rows:
  - ucm_id: CTL-SEC-003
    regulation_ref: "8.3.6"
    relationship: direct              # direct | partial | adjacent
    notes: "optional explanation"
    evidence_artifact: "optional evidence pointer"
---

# <Regulation> — CYBERCUBE UCM crosswalk

Human-readable Markdown tables, grouped by regulation domain. The rows in the
YAML front-matter and the rows in the Markdown tables MUST stay in sync —
the YAML is the source of truth for tooling; the Markdown is the reviewable surface.
```

## Relationship enum

| Value | Meaning |
|-------|---------|
| `direct` | The CYBERCUBE UCM row fully satisfies the regulation requirement. An auditor can consume the UCM row's evidence artifact directly. |
| `partial` | The CYBERCUBE UCM row contributes to compliance but is not sufficient alone. `notes` MUST name the additional controls needed for full compliance. |
| `adjacent` | The UCM row is related to the regulation requirement but is not a compliance control for it. Useful for auditor context; never evidence. |

Conservative-by-design: prefer `partial` when in doubt. `direct` asserts evidence-readiness and should be defensible at audit time.

## Ownership

Each map file carries a `regulation.owner` role. Owners are accountable for:

- Keeping the map current as the regulation updates (new version, new interpretation).
- Keeping the map current as UCM rows churn in [7] STD-GOV-006.
- Annual review (`published_map` date refresh at minimum once every 12 months; >13 months stale is a lint finding).
- Advisory review with `legal-lead` before a `direct` rating is asserted for a row that has audit-evidence implications.

Current owner assignments:

| Map | Owner |
|-----|-------|
| `pci-dss-4.0.md` | `sec-lead` |
| `hipaa-security-rule.md` | `privacy-lead` + `legal-lead` |
| `soc2.md` | `sec-lead` |

## Contribution workflow

1. New regulation → new file. Filename slug is `{regulation-id}.md` matching the YAML `regulation.id`.
2. New row → add both the YAML entry and the Markdown table row in the same commit. A CI lint asserts YAML/Markdown row-count parity.
3. Rating change (`partial` → `direct`, etc.) → note the rationale in the commit message; owner MUST be a reviewer.
4. Regulation version bump → create a new file for the new version (e.g. `pci-dss-5.0.md`) alongside the current one during a migration window.
5. Scope change in the regulation (row additions/deletions) → bump `published_map` date, even if the UCM side is unchanged.

## Relationship to other artifacts

- **[7] STD-GOV-006 UCM** — source of truth for `ucm_id`. Compliance maps consume UCM rows; UCM does not back-reference maps (to keep the matrix stable and the maps loosely coupled).
- **[5] STD-GOV-001 Product Registry** — products in regulated scope MUST reference the relevant map file in their PCL row per [7] STD-GOV-006 T2.
- **[44] STD-GOV-004 Internal Audit** — audit-evidence packs for T2/T3 products reference the appropriate map as a starting point for scope walkthrough.
- **[8] STD-ERM-001 Risk Register** — gaps surfaced by a map (a row marked `partial` that should be `direct` for a regulated product) are logged as risks.
- **Starter kits (`docs/starters/*`, RFC-0004)** — the `t3-regulated` starter references the relevant map(s) by slug when scoping a regulated product at onboarding time.

## Validation

- JSON schema: `schemas/compliance-map.schema.json`.
- Validator: `tools/validate-schemas.py` (extended to extract YAML front-matter from `governance/compliance-maps/*.md`).
- `tools/freeze-check.py` is not involved — compliance maps are not standards and carry no Applicability Tier Table.

## Index

| File | Regulation | Authority | Effective | Owner | Last published |
|------|------------|-----------|-----------|-------|----------------|
| [pci-dss-4.0.md](./pci-dss-4.0.md) | PCI DSS 4.0 | PCI SSC | 2024-03-31 | `sec-lead` | 2026-04-22 |
| [hipaa-security-rule.md](./hipaa-security-rule.md) | HIPAA Security Rule | HHS / OCR | 2013-09-23 (Omnibus Rule) | `privacy-lead` + `legal-lead` | 2026-04-22 |
| [soc2.md](./soc2.md) | SOC 2 Trust Services Criteria | AICPA | 2017-12-15 (2022 revision) | `sec-lead` | 2026-04-22 |

## Roadmap

- **Bulk population.** Each map ships at initial publication with seed rows sufficient to demonstrate the format. Per-regulation bulk population is tracked as separate tickets owned by each map's owner per RFC-0005 §3.2 — PCI ≈3 weeks / 1 FTE, HIPAA ≈2 weeks, SOC2 ≈2 weeks.
- **Future regulations.** GDPR / UK-DPA / LGPD crosswalks deferred (GDPR primitives already distributed across [12] / [13] / [25]). ISO 27001 / NIST CSF deferred to later pass or auditor demand.
- **Tooling.** The validator currently parses the YAML front-matter and enforces the JSON schema. A future enhancement will also enforce YAML/Markdown row parity.

---

*See RFC-0005 for the governance rationale and the phased rollout plan.*
