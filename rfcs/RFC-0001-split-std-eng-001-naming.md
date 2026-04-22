# RFC-0001 — Split `STD-ENG-001 Naming & Identifier Standard` into three sub-standards

| Field | Value |
|---|---|
| **RFC ID** | RFC-0001 |
| **Status** | DRAFT |
| **Author** | Standards Council (Pass-3 friction audit) |
| **Owners (approvers required)** | `eng-lead`, `sec-lead`, `oncall-sre` |
| **Target standard(s)** | [29] STD-ENG-001 v1.3 |
| **Related standards** | STD-ENG-007 (RFC process), POL-GOV-001 §8, STD-ENG-008 Namespace-M, STD-SEC-003/004 (CC-PID rules) |
| **Created** | 2026-04-22 |
| **Window** | Comment close 2026-05-06 · decision 2026-05-13 |

---

## 1. Summary

Split `STD-ENG-001` (3,265 lines, 78 MUSTs, Pass-3 Clarity score = 1) into three focused sub-standards aligned to the four existing namespaces defined in §0. Retain `STD-ENG-001` as an **umbrella** document that holds the shared glossary, namespace matrix, and cross-references. No semantic change to the T1 baseline.

## 2. Problem

Pass-3 friction audit (§21.2–§21.4 of `CYBERCUBE-Standards-Audit-Report-v1.md`) flagged [29] as **🔴 Severe** with Clarity = 1:

- 3,265 lines — largest standard except [33] STD-ENG-008.
- 78 MUSTs — highest count in portfolio; MUST density 23.9/kLOC.
- Readers grep for the rule they need; none read end-to-end.
- Delivery-team survey candidates rate "could not find which rule applies" high.
- Four namespaces (A/B/G/M) live in one file despite serving four different audiences:
  - Namespace A = authors of standards/policies (touches anyone writing Markdown).
  - Namespace B = application engineers exposing public IDs (API/UI engineers).
  - Namespace G = governance authors (ADR/RFC/waiver IDs).
  - Namespace M = anyone structuring code files (every engineer).
- Cross-references from STD-SEC-003/004 and STD-ENG-008 have to cite sections deep in the file, creating fragile links.

## 3. Proposal — three sub-standards + umbrella

```
STD-ENG-001  (umbrella) ─┬─► STD-ENG-001A  Public Entity IDs (CC-PID)         [Namespace B]
                         ├─► STD-ENG-001B  Artifact & Governance Identifiers  [Namespaces A + G]
                         └─► STD-ENG-001C  Module / Component / File Naming   [Namespace M]
```

### 3.1 Umbrella `STD-ENG-001` (≤ 250 lines)

- Applicability Tier Table (unchanged — 5 T1 rules).
- Glossary (normative shared terms).
- Namespace-at-a-glance matrix (one table pointing to each sub-standard).
- Cross-reference / defers-to map.
- Version history aggregating sub-standard bumps.

### 3.2 `STD-ENG-001A` Public Entity IDs (CC-PID) — target ≤ 1,200 lines

Pulls in §2 (Namespace B), §5 (CC-PID Implementation), §6 Tables, §Appendix A Support SOP. Primary audience: API, database, UI, and support engineers. Binds to STD-SEC-003/004 "CC-PID MUST NOT drive authN/authZ" rule.

### 3.3 `STD-ENG-001B` Artifact & Governance Identifiers — target ≤ 800 lines

Pulls in §1 (Namespace A — artifact naming) and §3 (Namespace G — governance registry IDs like ADR/RFC/waiver). Primary audience: standards authors, ARB, governance council.

### 3.4 `STD-ENG-001C` Module / Component / File Naming — target ≤ 900 lines

Pulls in §4 (Namespace M) and the developer cheat-sheet. Primary audience: every engineer writing code. Binds to STD-ENG-008 (Reusable Modules) — moved from "see §4" to a direct sub-standard reference.

## 4. Out of scope

- Changing any of the 5 T1 rules. Those remain in the umbrella Tier Table verbatim.
- Renaming CC-PID format or entity-code registry.
- Changing STD-ENG-008 module conventions; only the binding reference changes.

## 5. Migration plan

| Step | Action | Owner | When |
|------|--------|-------|------|
| 1 | Accept this RFC | eng-lead + sec-lead + oncall-sre | decision-date |
| 2 | Create `[29A]-STD-ENG-001A … v1.md`, `[29B]-STD-ENG-001B … v1.md`, `[29C]-STD-ENG-001C … v1.md` | Standards Council | week 1 |
| 3 | Move content with `git mv` + `git add -p` to preserve blame; no rewrites | Standards Council | week 1 |
| 4 | Shrink `[29]-STD-ENG-001` to umbrella (keep Tier Table + glossary + pointer tables) → bump to v2.0 | Standards Council | week 1 |
| 5 | Update cross-refs in all citing standards: STD-SEC-003, STD-SEC-004, STD-ENG-008, POL-GOV-001, STD-GOV-001, STD-ENG-009 | subagent (`explore` + `StrReplace`) | week 2 |
| 6 | Re-run `tools/freeze-check.py` and re-score Pass-3 composite | Standards Council | week 2 |
| 7 | Delivery-team announcement in `#eng-standards` | eng-lead | week 2 |

## 6. Expected impact

| Axis | Before | After (projected) |
|------|-------:|------------------:|
| STD-ENG-001 (umbrella) Clarity | 1 | 5 |
| STD-ENG-001A Clarity | — | 4 |
| STD-ENG-001B Clarity | — | 4 |
| STD-ENG-001C Clarity | — | 4 |
| Composite (weighted by usage) | 3.00 | 3.75 |

Friction-Risk flag 🔴 → 🟡 (minor) or clean, conditional on the post-split Pass-3-v2 scoring in §21.8.

## 7. Risks

- **Cross-reference rot** during migration (week 2). Mitigated by a subagent sweep + CI link-check.
- **T1 rule drift.** Reviewers must verify the Tier Table in the umbrella is byte-identical before and after the split. Gate: mandatory code-review checklist item.
- **Over-fragmentation.** If readers end up chasing three files, the split failed. Monitored via §21.9 delivery-team re-survey after 8 weeks.

## 8. Alternatives considered

- **(a) Keep as-is, add navigation anchors.** Rejected — tried already (Quick links §22 of v1.3). Didn't move the Clarity score.
- **(b) Two-way split (IDs vs Modules).** Rejected — Namespace A + G merge is clean but Namespace B alone is 1,400+ lines and still too dense to carry alone.
- **(c) Four-way split (one file per namespace).** Rejected — Namespace A and G are structurally similar (artifact-governance lifecycle) and share many rules; splitting them forces duplication.

## 9. Decision record

Acceptance requires sign-off from the Named Approver Trio (STD-ENG-007 Appendix X):

- [ ] `eng-lead` — decision on the structural split.
- [ ] `sec-lead` — confirms no AuthN/AuthZ rule drift.
- [ ] `oncall-sre` — confirms no operational-identifier churn.

After acceptance, this RFC file moves to `rfcs/accepted/` and the umbrella standard cross-links it from its version-history row.

---

*End of RFC-0001.*
