# RFC-0005 — Regulation mapping artifacts (PCI DSS 4.0, HIPAA Security Rule, SOC2) + HIPAA primitives

| Field | Value |
|---|---|
| **RFC ID** | RFC-0005 |
| **Status** | DRAFT |
| **Author** | Standards Council (Pass-4 scenario integration test) |
| **Owners (approvers required)** | `sec-lead`, `legal-lead`, `privacy-lead`, `standards-council` |
| **Target standard(s)** | [7] STD-GOV-006 UCM v1 (consumer), [25] STD-DAT-001 v1 (cross-reference), new `governance/compliance-maps/*`, new `[46]-TPL-LGL-002` (BAA template), new `[47]-STD-DAT-005` (De-identification standard) |
| **Related standards** | POL-GOV-001 §8, STD-ENG-007 (RFC + doc template), STD-GOV-004 (audit), [9] POL-VEN-001, [15] STD-LGL-001 |
| **Created** | 2026-04-22 |
| **Window** | Comment close 2026-05-20 · decision 2026-05-27 |

---

## 1. Summary

Scope two deliverable classes that emerged from Pass-4:

1. **Regulation-mapping artifacts** (`governance/compliance-maps/*.md`) — machine-readable + human-readable tables mapping [7] STD-GOV-006 Unified Control Matrix (UCM) control IDs to each of PCI DSS 4.0, HIPAA Security Rule (§164.306–318), and SOC2 Trust Service Criteria. This RFC scopes **schema + governance**; actual mapping population is a follow-on per-regulation ticket.

2. **HIPAA primitives** the portfolio currently lacks:
   - **`TPL-LGL-002`** — Business Associate Agreement (BAA) template, sibling to [16] TPL-LGL-001 DPA template.
   - **`STD-DAT-005`** — De-identification standard, covering HIPAA Safe-Harbor and Expert-Determination paths plus GDPR pseudonymization guidance.

Non-normative changes to the existing 45 standards; two new numbered entries ([46] + [47]) joining the portfolio and one new template-class file ([16] → sibling). Addresses §24.4 F2 and F3.

## 2. Problem

Pass-4 (`CYBERCUBE-Standards-Audit-Report-v1.md` §24.3.3–§24.3.4) surfaced two structural gaps:

### F2 — Regulation mappings are absent

Scenarios S3 (fintech, PCI-adjacent) and S4 (healthcare, HIPAA) both needed to answer: *"which UCM rows map to PCI DSS Requirement Z / HIPAA Safeguard Y?"* [7] STD-GOV-006 UCM is the natural home for the traceability; today it does not carry per-regulation crosswalks. Teams roll their own mappings, often inconsistently across products, duplicating work and surfacing no portfolio-level evidence pack when external audits land.

T3-tier products explicitly owe this work ([44] STD-GOV-004 T3 "External-audit-ready finding register"; [7] T2 SHOULD "mapping to at least one external framework"). The SHOULD clause exists; the artifact does not.

### F3 — T3 scope blurs GDPR and HIPAA

Current portfolio codifies "T3 = regulated / high-risk" with GDPR-shaped primitives (DPIA, lawful basis, cross-border residency). HIPAA needs its own primitives: BAA template, de-identification standard. S4 had to hand-roll both, and [25] STD-DAT-001 T3 references "HIPAA BAA" in passing without shipping an artifact.

Related: [16] TPL-LGL-001 is a DPA template that serves GDPR / DPAs but does not carry BAA-specific clauses (breach notification windows, subcontractor flow-down, Minimum Necessary Rule acknowledgment, Required Access for HHS).

## 3. Proposal

### 3.1 `governance/compliance-maps/` directory + schema

New subdirectory under `governance/`. Each regulation gets one file:

```
governance/compliance-maps/
├── README.md                     index, schema, contribution workflow
├── _compliance-map.schema.json   JSON schema (for the machine-readable front-matter)
├── pci-dss-4.0.md                Payment Card Industry DSS v4.0
├── hipaa-security-rule.md        45 CFR §164.306–318
└── soc2.md                       AICPA TSC (2017 revised)
```

**File structure** (each mapping file):

```markdown
---
# machine-readable front-matter — validated by _compliance-map.schema.json
regulation:
  id: "pci-dss-4.0"
  name: "Payment Card Industry Data Security Standard"
  version: "4.0"
  authority: "PCI SSC"
  effective: "2024-03-31"
  published_map: "2026-05-27"  # date this mapping is valid as of
rows:
  - ucm_id: "UCM-AUTH-001"
    regulation_ref: "8.3.6"
    relationship: "direct"       # direct | partial | adjacent
    notes: "CYBERCUBE MFA enforcement implements PCI DSS 8.3.6 multi-factor requirement."
  - ...
---

# PCI DSS 4.0 — CYBERCUBE UCM crosswalk

Human-readable tables follow, grouped by PCI DSS domain (Build & Maintain, Protect Account Data, Maintain a Vulnerability Management Program, Implement Strong Access Control, Regularly Monitor and Test, Maintain an Information Security Policy).
```

**Schema** (`_compliance-map.schema.json`): validated via the existing `tools/validate-schemas.py` — add a discovery entry for `governance/compliance-maps/*.md` (extract YAML front-matter, validate against schema). Follow-up PR: extend validator to YAML-in-Markdown front-matter.

**Relationship enum:** `direct | partial | adjacent`.

- `direct` — CYBERCUBE UCM row fully satisfies the regulation requirement (evidence-ready).
- `partial` — CYBERCUBE UCM row contributes; complete compliance requires additional controls named in `notes`.
- `adjacent` — related but not sufficient; useful for auditor context, not evidence.

**Governance:** each mapping file has a named `owner` role (`sec-lead` for PCI + SOC2; `privacy-lead` + `legal-lead` for HIPAA). Owners are accountable for keeping the mapping current as the regulation updates or UCM rows churn.

**Cross-cutting rule added to [7] STD-GOV-006** (additive, v1 → v1.1):

> [T2] When a CYBERCUBE product declares scope for a regulation listed in `governance/compliance-maps/`, the product MUST reference the relevant mapping file in its PCL row (STD-GOV-001) and include the mapping in its audit-evidence pack (STD-GOV-004 T2/T3).

### 3.2 Mapping population — scope of this RFC

This RFC scopes the **schema, governance, and ownership** of the mapping artifacts. The per-row mapping population (writing the actual UCM→reg_ref crosswalks) is a follow-on deliverable:

- PCI DSS 4.0 — ~300 requirements, mapping to ~40-50 relevant UCM rows. Owner: `sec-lead`. Estimated 3 weeks elapsed, 1 FTE.
- HIPAA Security Rule — ~40 standards + implementation specs, mapping to ~30 relevant UCM rows. Owner: `privacy-lead` + `legal-lead`. Estimated 2 weeks elapsed.
- SOC2 TSC — 5 categories × ~20 common criteria + category-specific. Mapping to ~60 relevant UCM rows. Owner: `sec-lead`. Estimated 2 weeks elapsed.

Follow-on tickets filed at RFC acceptance. The mapping files ship with a non-empty header + 3-5 seed rows per regulation at acceptance time so validators pass; bulk population lands in separate PRs per regulation.

### 3.3 `[46]-TPL-LGL-002` — BAA template

New template file, sibling to [16] TPL-LGL-001:

- Filename: `[46]-TPL-LGL-002 CYBERCUBE-BAA-Standard-Template-v1.md`.
- ID: `TPL-LGL-002` (namespace matches [16]).
- Scope: Business Associate Agreement template covering 45 CFR §164.504(e) required content:
  - Permitted/required uses & disclosures.
  - Safeguards (physical, administrative, technical) referencing UCM rows.
  - Breach notification (60-day max, HIPAA §164.410).
  - Subcontractor flow-down clause.
  - HHS access rights (§164.504(e)(2)(ii)(I)).
  - Term + termination.
  - Return-or-destroy-or-extend on termination.
  - Minimum Necessary acknowledgment.
- Meta-exempt banner (template class, per [16] precedent) — no Applicability Tier Table.
- Cross-links: [9] POL-VEN-001 (vendor register row when BAA is signed), [15] STD-LGL-001 (legal-hold compatibility), [25] STD-DAT-001 + new [47] STD-DAT-005.

### 3.4 `[47]-STD-DAT-005` — De-identification standard

New standard file:

- Filename: `[47]-STD-DAT-005 CYBERCUBE-De-identification-Standard-v1.md`.
- ID: `STD-DAT-005` (namespace aligns with [25]/[26]/[27]).
- Applicability Tier Table (required; not meta-exempt):
  - **T1 MUST:** projects handling PHI or GDPR-scope personal data that is exported for secondary use (analytics, research, sharing) MUST declare the de-identification method and record residual re-identification risk class (low/medium/high).
  - **T2 SHOULD:** documented de-identification procedure per data-flow; periodic review of residual risk; method selection justified (Safe-Harbor vs Expert-Determination vs pseudonymization).
  - **T3 MAY:** formal expert-determination review (HIPAA §164.514(b)(1)); statistical disclosure control; differential-privacy where applicable; external audit of de-identified releases.
- Core content sections:
  - **Safe-Harbor path** (HIPAA §164.514(b)(2)) — the 18 identifier categories, removal procedure, actual-knowledge caveat.
  - **Expert-Determination path** (HIPAA §164.514(b)(1)) — qualified-expert definition, documentation requirement, risk-threshold articulation.
  - **GDPR pseudonymization** (Art. 4(5), Recital 26) — distinct from anonymization; legal status.
  - **Re-identification-risk taxonomy** — low/medium/high with example contexts.
  - **Verification checklist** — what evidence makes a de-identified release defensible at audit time.
  - **Logging** — every de-identified release event logged per [38] STD-OPS-003 audit-log pipeline; record method, operator, date, sample-size, approver.
- Cross-links: [25] STD-DAT-001 (classification), [13] POL-PRI-002 (lawful-basis register), [7] UCM (new row for de-id method declaration), [46] TPL-LGL-002 (BAA references de-identification path as part of permitted uses).

### 3.5 Portfolio bookkeeping for [46] + [47]

- `registries/standards.json` — two new rows appended with `FWK` / `STD` types, domain `Legal` and `Data` respectively, version `v1`, effective date = acceptance date.
- `freeze-check-report.json` — auto-regenerated; scanned count grows 45 → 47.
- `tools/freeze-check.py` — no code change needed; scans by filename pattern.
- `[4]-FWK-GOV-001` Tier Cheat-Sheet — append one line per standard to the appropriate tier groups. Treated as a mirror update (same as F6 handling in RFC-0004); bumps v1.2 → v1.3 minor.
- Cross-references from [25] STD-DAT-001 T3 and [15] STD-LGL-001 updated to cite [46] + [47] (additive, no version bump per POL-GOV-001 §8 additive-reference rule).

## 4. Out of scope

- Bulk population of the three mapping files beyond seed rows (scheduled as follow-on tickets; this RFC establishes the governance).
- GDPR / UK-DPA / LGPD mapping files — deferred. GDPR primitives are already distributed across [12] / [13] / [25]; a crosswalk can be a future RFC when an external-audit scenario demands it.
- ISO 27001 / NIST CSF mappings — not surfaced by Pass-4 scenarios; defer to Pass-5 or auditor demand.
- Any change to existing T1 clauses of [25] / [15] / [9] (owned by their respective standards).
- Any change to [14] POL-REC-001 structure (owned by RFC-0003).
- Starter-kit integration (owned by RFC-0004; `t3-regulated.md` variants will cross-link these artifacts once both RFCs are accepted).

## 5. Migration plan

| Step | Action | Owner | When |
|------|--------|-------|------|
| 1 | Accept this RFC | sec-lead + legal-lead + privacy-lead + standards-council | decision-date |
| 2 | Create `governance/compliance-maps/` + `_compliance-map.schema.json` + `README.md` | Standards Council | week 1 |
| 3 | Seed `pci-dss-4.0.md` / `hipaa-security-rule.md` / `soc2.md` with valid headers + 3-5 seed rows each | sec-lead + privacy-lead | week 1 |
| 4 | Extend `tools/validate-schemas.py` to validate YAML front-matter in compliance-maps | Standards Council | week 1 |
| 5 | Add [7] STD-GOV-006 T2 reference-clause; bump v1 → v1.1 | sec-lead + Standards Council | week 1 |
| 6 | Author `[46]-TPL-LGL-002 …-v1.md` BAA template | legal-lead | week 2 |
| 7 | Author `[47]-STD-DAT-005 …-v1.md` De-identification standard | privacy-lead + `data-owner` | week 2-3 |
| 8 | Update `registries/standards.json` with [46] + [47] rows | Standards Council | week 3 |
| 9 | Update [4] FWK-GOV-001 Tier Cheat-Sheet to include [47] T1/T2/T3 rows; bump v1.2 → v1.3 | Standards Council | week 3 |
| 10 | Update cross-references in [25] / [15] / [9] (additive citation only) | Standards Council | week 3 |
| 11 | Re-run `tools/freeze-check.py --json` and `tools/validate-schemas.py --strict` | CI | week 3 |
| 12 | Open follow-on tickets for per-regulation bulk population (PCI / HIPAA / SOC2) | Standards Council | week 3 |
| 13 | Announce in `#eng-standards` + `#legal-compliance` | sec-lead | week 3 |

## 6. Expected impact

| Axis | Before (Pass-4) | After (projected) |
|------|------|------|
| S3 verdict | ⚠️ follow-able with effort | ✅ follow-able (PCI map + DPIA template in starters) |
| S4 verdict | ⚠️ follow-able with gaps | ✅ follow-able (HIPAA map + BAA + de-id standard) |
| External-audit evidence pack | hand-rolled per product | referenceable from UCM crosswalk |
| §24.4 F2 | open | closed on mapping-file creation (seed rows) |
| §24.4 F3 | open | closed on [46] + [47] acceptance |
| Portfolio count | 45 | 47 |
| [7] STD-GOV-006 T2 SHOULD "mapping to at least one external framework" | unstarted | three frameworks in flight |

## 7. Risks

- **Mapping drift.** Regulations revise; UCM rows churn. A stale map misleads audit prep. Mitigation: each compliance-map file carries `published_map` date; owners review annually; a lint flags maps >13 months stale.
- **Legal-scope overreach.** A mapping is engineering-authored; HHS or a QSA may disagree with a `direct` rating. Mitigation: `relationship: direct|partial|adjacent` is deliberately conservative; maps carry "non-authoritative" banner directing auditors to the regulation text, not our map.
- **BAA template misuse.** A Covered Entity's legal counsel may require non-standard clauses. Mitigation: [46] is a template, not a binding form; customization workflow per [16] TPL-LGL-001 precedent — legal-lead signs off per-deal.
- **De-identification false-confidence.** Safe-Harbor is a checklist; it does not guarantee non-re-identifiability. [47] T1 requires residual-risk class declaration specifically to force the conversation. Mitigation: [47] §Verification section lists the known re-identification-attack classes teams must consider.
- **New-standard-bootstrap friction.** Two new numbered entries ([46] + [47]) — registry updates, cheat-sheet updates, cross-reference sweeps. Mitigation: scripted in step 8-10 of §5; `tools/freeze-check.py` catches any missed Tier Table.
- **Cross-RFC coordination with RFC-0004.** RFC-0004 starters reference this RFC's artifacts. Mitigation: RFC-0004 deliberately allows placeholders; either RFC can accept first, and the other fills in.

## 8. Alternatives considered

- **(a) Single `governance/compliance-maps.md` combining all regulations.** Rejected — regulations have different update cadences + different owners; coupling them forces joint review for every tweak.
- **(b) Embed mappings directly in [7] STD-GOV-006.** Rejected — UCM document is already dense; adding three regulation crosswalks inline would bloat it beyond usability (cf. [29] STD-ENG-001 pre-RFC-0001).
- **(c) Merge BAA into [16] TPL-LGL-001 DPA template.** Rejected — DPAs (GDPR-shaped) and BAAs (HIPAA-shaped) have incompatible content (different breach windows, different subcontractor rules, different regulator-access clauses). Merging produces a confusing hybrid.
- **(d) Extend [25] STD-DAT-001 with de-identification sections instead of new [47].** Rejected — [25] is already a large standard covering classification + retention. De-identification is methodologically distinct and regularly cited standalone; a sibling standard is cleaner. Aligned with the §24.3.4 finding recommendation.
- **(e) Defer HIPAA primitives until a healthcare-scope product lands.** Rejected — Pass-4 S4 demonstrates the "need at day 1" problem; shipping primitives proactively is the remediation.
- **(f) Machine-readable mappings only, no human-readable Markdown tables.** Rejected — auditors + reviewers read Markdown; the YAML front-matter is for tooling, but the tables are for humans.

## 9. Decision record

Acceptance requires sign-off from the Named Approver Quartet:

- [ ] `sec-lead` — confirms mapping-schema design + PCI/SOC2 owner assignment + [7] UCM T2 reference-clause.
- [ ] `legal-lead` — confirms [46] TPL-LGL-002 BAA template scope and legal-review workflow.
- [ ] `privacy-lead` — confirms [47] STD-DAT-005 T1/T2/T3 tiering + HIPAA de-id paths coverage.
- [ ] `standards-council` — confirms portfolio bookkeeping (registry, cheat-sheet, cross-refs) + cross-RFC coordination with RFC-0004.

Optional advisory reviewers (non-gating):

- `data-owner` — for the [47] residual-risk-classification taxonomy.
- `eng-lead` — for the `tools/validate-schemas.py` YAML-front-matter extension.

After acceptance, this RFC moves to `rfcs/accepted/`, three per-regulation bulk-population tickets open, and the audit report §25 accretes a sub-log per landed artifact ([46] / [47] / each mapping seed).

---

*End of RFC-0005.*
