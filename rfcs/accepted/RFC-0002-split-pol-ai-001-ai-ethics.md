# RFC-0002 — Split `POL-AI-001 AI Usage & Ethics Policy` into a personnel policy + an engineering standard

| Field | Value |
|---|---|
| **RFC ID** | RFC-0002 |
| **Status** | ACCEPTED (2026-04-22) |
| **Author** | Standards Council (Pass-3 friction audit) |
| **Owners (approvers required)** | `eng-lead`, `sec-lead`, `oncall-sre`, + Legal (for personnel-policy side) |
| **Target standard(s)** | [11] POL-AI-001 v1.1 |
| **Related standards** | STD-ENG-007 (RFC process), POL-GOV-001 §8, STD-SEC-002 (prompt-injection guidance), STD-ENG-005 (adversarial testing), POL-AUP-001 (acceptable use overlap) |
| **Created** | 2026-04-22 |
| **Window** | Comment close 2026-05-06 · decision 2026-05-20 (extra week for Legal) |

---

## 1. Summary

Split `POL-AI-001` (1,060 lines, 6 MUSTs, Pass-3 composite 2.5) along the **personnel-policy / engineering-standard** seam. The current document mixes two fundamentally different artifacts: *rules about what humans are allowed to do with AI tools* (stable, legal-reviewed, T1/T2) and *rules about how to build production systems using AI* (fast-moving, engineering-reviewed, mostly T2/T3 and mostly ROADMAP today).

- **`POL-AI-001` AI Use Policy** (~400 lines) — personnel rules, approved tools, prohibited data, acceptable use. Stays as a policy; Legal-reviewed; changes quarterly at most.
- **`STD-AI-001` AI Engineering Standard** (~500 lines at first draft, grows as the domain matures) — rules for building product AI: prompt-engineering patterns, model versioning, evaluation, observability, adversarial testing, bias/fairness audits, model cards. Engineering-reviewed; evolves as model-ops matures.

No semantic change to the 3 current T1 MUST rules. They all move to the new `POL-AI-001` (the personnel-policy side).

## 2. Problem

Pass-3 friction audit flagged [11] as **🔴 Severe** with composite 2.5:

- Clarity = 3, Actionability = 3, Automatability = **1**, Proportionality = 3.
- The low Automatability is partly domain-natural (*this is a personnel policy*, M = 1 is expected) **and** partly a defect (the engineering parts of the document *could* be automated but are buried in a policy document).
- The domain (generative AI, model ops, prompt engineering) is moving fast; forcing Legal to review every engineering-practice update slows the doc; forcing engineers to thread technical changes through Legal review kills iteration speed.
- The current document's 6 MUSTs sit mostly in personnel rules; the engineering practice guidance is expressed via SHOULD / ROADMAP — which is correct, but mixing these tiers in one doc makes ownership ambiguous.
- STD-SEC-002 "secure coding" and STD-ENG-005 "testing" both want to cross-link specific AI engineering practices (prompt injection, adversarial tests) but can only link to §-numbers deep inside a policy doc.

## 3. Proposal — a personnel policy + an engineering standard

### 3.1 `POL-AI-001` AI Use Policy (v2.0 — renamed / rescoped)

**Audience:** every employee who uses AI tools for any work-related task.
**Reviewer:** Legal + sec-lead.
**Change cadence:** quarterly at most.
**Target size:** ≤ 400 lines.

Keeps:

- The three existing T1 MUSTs (approved-tools list, prohibited data, human review before merge).
- Approved-tools registry (§2 of current doc).
- Prohibited data rules (§3).
- AUP overlap clarifications (cross-refs POL-AUP-001).
- Data-handling rules for AI inputs (cross-refs STD-DAT-001).
- Disclosure rules (AI-generated content labeling).
- Training / awareness material links.

Removes (moved to `STD-AI-001`):

- Model versioning / model cards / evaluation harness.
- Bias / fairness audit rules.
- Prompt engineering and prompt-injection guidance.
- Monitoring / drift detection / unsafe-output rate KRI.
- AI Governance Committee structure (stays in POL-AI-001 as a *policy body*; its engineering remit moves).

### 3.2 `STD-AI-001` AI Engineering Standard (v1.0 — NEW)

**Audience:** engineers building product features that call an AI model (own or third-party).
**Reviewer:** eng-lead + sec-lead.
**Change cadence:** monthly if needed (domain is moving fast).
**Target size:** ≤ 500 lines at v1.0. Expected to grow as model-ops practice matures.

Scope:

- Tier 2/3 only (no T1 rules initially — by design; T1 for model-ops is premature).
- Model lifecycle: versioning, deployment, rollback, deprecation.
- Evaluation harness: golden datasets, regression gates, red-team protocol.
- Prompt engineering patterns: system-prompt management, context-window discipline, prompt injection mitigation (cross-ref STD-SEC-002).
- Observability: unsafe-output rate, drift score, token-usage metrics (cross-ref STD-OPS-003, STD-GOV-005).
- Bias / fairness audit protocol (tier-gated to T3).
- Model cards and documentation.
- Provenance / supply-chain for foundation models.

Explicitly out of scope:

- Personnel rules (→ `POL-AI-001`).
- Approved-tools registry (→ `POL-AI-001`).
- Data-handling rules (→ `STD-DAT-001`).

## 4. Out of scope of this RFC

- Changing any current T1 MUST. They are stable and stay in `POL-AI-001`.
- Writing `STD-AI-001` v1.0 content. That's a follow-on deliverable after this RFC is accepted; this RFC only commits to the split and the section-allocation table (§6).

## 5. Migration plan

| Step | Action | Owner | When |
|------|--------|-------|------|
| 1 | Accept this RFC | eng-lead + sec-lead + oncall-sre + Legal | decision-date |
| 2 | Fork content: `[11]-POL-AI-001` stays; new `[11a]-STD-AI-001 v1.0` created | Standards Council | week 1 |
| 3 | Move engineering-practice sections (from §6 table) via `git mv` + targeted `git add -p` | Standards Council | week 1 |
| 4 | `POL-AI-001` bumped to v2.0 (breaking: content removed) | Legal + sec-lead | week 2 |
| 5 | `STD-AI-001` reviewed by eng-lead + sec-lead | Engineering Council | week 2 |
| 6 | Cross-link in STD-SEC-002 (prompt-injection) and STD-ENG-005 (adversarial tests) | subagent sweep | week 3 |
| 7 | Add Tier Table to `STD-AI-001` (T2/T3 only; no T1 at v1.0) | Standards Council | week 3 |
| 8 | Announcement in `#eng-standards` + `#sec` + all-hands note for policy change | eng-lead + sec-lead | week 3 |

## 6. Section-allocation table

| Current `POL-AI-001` section | Destination |
|------------------------------|-------------|
| §1 Scope | `POL-AI-001` (rewritten for personnel scope) |
| §2 Approved Tools Registry | `POL-AI-001` |
| §3 Prohibited Data (T1 MUST) | `POL-AI-001` |
| §4 Human Review Before Merge (T1 MUST) | `POL-AI-001` |
| §5 AUP Overlap & Training | `POL-AI-001` |
| §6 Tool approval workflow | `POL-AI-001` §2 annex |
| §7 Model versioning / model cards | `STD-AI-001` §2 |
| §8 Evaluation harness / regression | `STD-AI-001` §3 |
| §9 Prompt engineering / injection | `STD-AI-001` §4 (cross-ref STD-SEC-002) |
| §10 Monitoring / drift / unsafe-output | `STD-AI-001` §5 (cross-ref STD-OPS-003, STD-GOV-005) |
| §11 Bias / fairness audits | `STD-AI-001` §6 (T3 gated) |
| §12 AI Governance Committee (body) | `POL-AI-001` §7 |
| §13 AI Governance Committee (eng remit) | `STD-AI-001` §7 |
| Appendix: Disclosure templates | `POL-AI-001` Appendix A |
| Appendix: Model card template | `STD-AI-001` Appendix A |

## 7. Expected impact

| Axis | Before (combined) | After `POL-AI-001` | After `STD-AI-001` |
|------|------------------:|-------------------:|-------------------:|
| Clarity | 3 | 4 | 4 |
| Actionability | 3 | 4 | 3 (fast-moving domain) |
| Automatability | **1** | 1 (domain-natural) | 3 (model-ops is automatable) |
| Proportionality | 3 | 4 | 4 |
| Composite | 2.50 | 3.25 | 3.50 |

Friction-Risk flag: 🔴 → 🟡(D) for `POL-AI-001` (domain-natural low-M, not a defect) and 🟡 → clean for `STD-AI-001` once v1.0 Tier Table is added.

## 8. Risks

- **Legal review lag on `POL-AI-001` v2.0.** Mitigated by not changing any T1 MUST rule content; Legal only reviews the structural trimming.
- **`STD-AI-001` v1.0 too thin to stand on its own.** Acceptable for v1.0 — the point is to create a home that can grow with the domain. Engineering Council commits to quarterly updates for the first 12 months.
- **Dual-ownership friction.** `POL-AI-001` and `STD-AI-001` both touch "AI tools" — risk of contradictions. Mitigated by the section-allocation table (§6) being part of the accepted RFC; any future text that could live in either doc defers to this table.

## 9. Alternatives considered

- **(a) Keep as-is, accept the M = 1 score as domain-natural.** Rejected — the engineering practice sections *could* be automated but are hidden in a policy doc; the domain-natural argument only covers the personnel side.
- **(b) Three-way split (personnel policy / model-ops standard / prompt-engineering standard).** Rejected — prompt engineering is small at v1.0; fold into `STD-AI-001` and promote to its own standard later if/when it outgrows 500 lines.
- **(c) Move everything to `STD-SEC-002` and `STD-ENG-005`.** Rejected — that dilutes both standards and loses the AI-specific domain framing. Keeping `STD-AI-001` as a named home is worth the overhead.

## 10. Decision record

Acceptance requires sign-off from the Named Approver Trio + Legal:

- [ ] `eng-lead` — decision on the structural split.
- [ ] `sec-lead` — confirms prompt-injection / adversarial-test ownership path.
- [ ] `oncall-sre` — confirms AI observability hooks (unsafe-output KRI, drift score) integrate cleanly with STD-OPS-003.
- [ ] `legal-lead` — confirms `POL-AI-001` v2.0 does not weaken any personnel-side obligation.

After acceptance, this RFC moves to `rfcs/accepted/`.

---

## 10. Decision

**Accepted on 2026-04-22** by the Named Approver authority, pre-empting the scheduled 2026-05-20 decision date. Comment window waived per POL-GOV-001 §8.3.

Approver sign-off:

- [x] `eng-lead` — 2026-04-22
- [x] `sec-lead` — 2026-04-22
- [x] `oncall-sre` — 2026-04-22
- [x] `legal-lead` — 2026-04-22

Implementation tickets open separately; see `CYBERCUBE-Standards-Audit-Report-v1.md` §26 for execution log.

---

*End of RFC-0002.*
