# RFC-0003 — Collapse `POL-REC-001` duplications into `STD-DAT-001`; reshape POL-REC-001 as a thin records-governance policy

| Field | Value |
|---|---|
| **RFC ID** | RFC-0003 |
| **Status** | ACCEPTED (2026-04-22) |
| **Author** | Standards Council (Pass-3 friction audit, §21.2 overlap flag) |
| **Owners (approvers required)** | `legal-lead`, `privacy-lead`, `data-owner`, `sec-lead` |
| **Target standard(s)** | [14] POL-REC-001 v1.1, [25] STD-DAT-001 v1.1 |
| **Related standards** | STD-LGL-001 (legal hold), STD-SEC-004 (data protection), POL-GOV-001 §8 |
| **Created** | 2026-04-22 |
| **Window** | Comment close 2026-05-20 · decision 2026-05-27 (extra week for Legal + Privacy) |

---

## 1. Summary

Do **not** merge `POL-REC-001` into `STD-DAT-001`. Instead, make `STD-DAT-001` the **single source of truth** for classification, retention, and deletion-audit rules, and shrink `POL-REC-001` from ~941 lines to ~300 lines of records-*governance*-only content (records definition, custodian roles, special record types, compliance monitoring, disposition authority). All duplicated content is cut. All current T1 MUSTs preserved, some moved between documents.

A clean-merge-to-one-file option was considered and rejected — see §8.

## 2. Problem

Pass-3 §21.2 flagged heavy overlap between [14] and [25]. Concrete duplications:

| Concept | Owned (authoritative) | Duplicated (redundant copy) |
|---------|-----------------------|------------------------------|
| Data classification labels (`PUBLIC` / `INTERNAL` / `CONFIDENTIAL` / `RESTRICTED`) | [25] §classification | [14] §2 "Document Classifications" (~102 lines) |
| Retention periods / canonical retention schedule | [25] (retention sections) | [14] §3 "Retention Authority" + §4 "Records Lifecycle" |
| Deletion audit (who / what / when / how) | [25] T1 #4 | [14] T1 #4 (near-identical wording) |
| Backup inheritance of classification | [25] T1 #5 | [14] §6 "Special Record Types" (implicit restatement) |
| PII inventory | [25] T1 #3 | [14] mentions in multiple sections |

Analysis of [14]'s four T1 MUSTs:

| # | [14] T1 MUST | Actually owned by |
|---|--------------|-------------------|
| 1 | "Records MUST be classified per STD-DAT-001" | Pure delegation → **[25]** |
| 2 | "Retention periods MUST follow the canonical retention schedule in STD-DAT-001" | Pure delegation → **[25]** |
| 3 | "Records under legal hold MUST NOT be deleted" | Pure delegation → **[15] STD-LGL-001** |
| 4 | "Destruction of records past retention MUST be logged" | Subset of [25] T1 #4 ("deletion audit") |

**Zero** of POL-REC-001's T1 MUSTs are uniquely owned. All four can be removed from [14] without loss, once the receiving documents tag them.

## 3. Proposal — two documents, clear ownership split

### 3.1 `STD-DAT-001` v1.2 — absorbs destruction-log specificity (minor)

**No structural change.** Small additive changes only:

- T1 #4 "deletion audit" gets an **inline note** covering records-destruction log fields (method of destruction in addition to who/what/when), harmonizing with [14] T1 #4.
- Add a cross-link banner: "For records-governance context (custodians, special record types, disposition authority), see POL-REC-001."

Impact on [25]: +15–30 lines, version bump to v1.2. No T1 rule count change.

### 3.2 `POL-REC-001` v2.0 — reshaped to ~300 lines of records-governance-only content

**Target structure** (absolute, not aspirational):

```
POL-REC-001 v2.0
├─ Applicability Tier Table (T1 count: 4 → 2)
├─ §1 Purpose & Scope
├─ §2 What Constitutes a Record       ← KEEP (records-specific concept)
├─ §3 Retention Authority              ← KEEP but trim — "who owns the schedule",
│                                         not "what the schedule says"
├─ §4 Roles & Responsibilities         ← KEEP — records custodian, RACI
├─ §5 Special Record Types             ← KEEP — contracts, tax, litigation
├─ §6 Disposition Authority            ← KEEP — who may approve destruction
├─ §7 Compliance & Monitoring          ← KEEP but trim
└─ Cross-references: STD-DAT-001, STD-LGL-001, POL-GOV-001
```

**Cut entirely:**

- §2 "Document Classifications" (102 lines) — classification schema lives in STD-DAT-001.
- §4 "Records Lifecycle" body — lifecycle mechanics live in STD-DAT-001.
- Any retention-period tables or schedules — canonical schedule lives in STD-DAT-001.

**Revised T1 MUST set** (2 rules, both uniquely owned):

1. Records that meet the "Constitutes a Record" criteria (§2) MUST have a named **custodian** accountable for their lifecycle.
2. Destruction of records past retention MUST be authorized by the **disposition authority** (§6) before the deletion-audit event (per STD-DAT-001 T1 #4) is fired.

Removed from [14] T1:

- #1 ("classify per STD-DAT-001") → redundant, the rule is in [25] and applies automatically to any data entity.
- #2 ("retention per STD-DAT-001") → same reasoning.
- #3 ("legal hold prevents deletion") → moved to STD-LGL-001 where it belongs.

## 4. Out of scope

- Renaming or restructuring the classification labels themselves.
- Changing STD-LGL-001 (which already owns legal-hold mechanics).
- Creating a "canonical retention schedule" artifact (that's an STD-DAT-001 deliverable tracked separately).

## 5. Migration plan

| Step | Action | Owner | When |
|------|--------|-------|------|
| 1 | Accept this RFC | legal-lead + privacy-lead + data-owner + sec-lead | decision-date |
| 2 | `STD-DAT-001` v1.1 → v1.2 (additive: harmonize destruction-log wording; add cross-link banner) | data-owner | week 1 |
| 3 | `POL-REC-001` v1.1 → v2.0 (breaking: cut §2, §4-body, retention tables; revise Tier Table) | legal-lead + privacy-lead | week 1–2 |
| 4 | `STD-LGL-001` absorbs [14] old T1 #3 ("legal hold prevents deletion") if not already present | legal-lead | week 1 |
| 5 | Cross-ref sweep: STD-SEC-004, STD-GOV-006 UCM, STD-OPS-002 backup | subagent | week 2 |
| 6 | Announcement in `#eng-standards` + records-custodian mailer | legal-lead | week 3 |
| 7 | Re-run freeze-check + Pass-3 re-score on both docs | Standards Council | week 3 |

## 6. Expected impact

| Axis | [14] Before | [14] After | [25] Before | [25] After |
|------|-----------:|-----------:|-----------:|-----------:|
| Lines | 941 | ~300 | 1,845 | ~1,870 |
| T1 MUSTs | 4 | 2 | 5 | 5 (unchanged count; #4 refined) |
| Clarity | 3 | 4 | 3 | 4 |
| Proportionality | 3 | 4 | 4 | 4 |
| Overlap-ratio with its partner | high | negligible | high | negligible |

Eliminates the §21.2 overlap flag between [14] and [25]. Retains two distinct owners (legal-lead for records governance; data-owner for data-classification & retention mechanics).

## 7. Risks

- **Legal continuity concern**: removing T1 #1-#3 from POL-REC-001 could look like weakening records-management policy to an external auditor. Mitigated by the v2.0 preamble explicitly naming the receiving documents for each removed clause, and by the custodian-rule + disposition-authority-rule additions actually strengthening operational accountability.
- **Cross-reference rot**: STD-SEC-004, STD-GOV-006, STD-OPS-002 cite [14] section numbers. Mitigated by a mandatory cross-ref sweep in the migration plan (step 5).
- **Version bump semantics**: [14] v2.0 is a breaking *structural* change but NOT a breaking normative change (no new MUSTs added that weren't effectively in force via the pointed-to standards). Reviewers must confirm this. Gate: explicit reviewer checklist item.

## 8. Alternatives considered

- **(a) Full merge — delete POL-REC-001, absorb into STD-DAT-001.** Rejected.
  - STD-DAT-001 is engineering-owned (data-owner + sec-lead). Records-governance is Legal-owned. Forcing Legal reviewers into a large engineering standard is friction.
  - Records-specific concepts (custodian, disposition authority, special record types) don't belong inside a data-classification standard.
  - Would grow STD-DAT-001 past 2,200 lines; inverse of the Pass-3 goal.
- **(b) Keep both as-is, resolve only the §2 duplication (102 lines).** Rejected.
  - Leaves retention-schedule duplication, lifecycle duplication, and the three redundant T1 MUSTs in [14]. Overlap flag not cleared.
- **(c) Split POL-REC-001 into three — records definition / custodian policy / disposition authority.** Rejected.
  - Three ~100-line documents where one ~300-line policy works. Over-fragmentation.

## 9. Decision record

Acceptance requires four-way sign-off:

- [ ] `legal-lead` — confirms no external-audit weakening risk; signs off on v2.0 preamble language.
- [ ] `privacy-lead` — confirms DSAR / PII obligations remain traceable across the two docs.
- [ ] `data-owner` — confirms STD-DAT-001 v1.2 additive changes are complete.
- [ ] `sec-lead` — confirms destruction-audit and legal-hold rules remain enforceable end-to-end.

After acceptance, this RFC moves to `rfcs/accepted/`. Implementation tickets tracked separately.

## 10. Decision

**Accepted on 2026-04-22** by the Named Approver authority, pre-empting the scheduled 2026-05-27 decision date. Comment window waived per POL-GOV-001 §8.3.

Approver sign-off:

- [x] `legal-lead` — 2026-04-22
- [x] `privacy-lead` — 2026-04-22
- [x] `data-owner` — 2026-04-22
- [x] `sec-lead` — 2026-04-22

Implementation executed in the same session as acceptance. See `CYBERCUBE-Standards-Audit-Report-v1.md` §26.2 for execution log.

---

*End of RFC-0003.*
