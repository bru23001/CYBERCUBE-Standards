# RFC-0004 — Starter kits & project templates (onboarding acceleration)

| Field | Value |
|---|---|
| **RFC ID** | RFC-0004 |
| **Status** | ACCEPTED (2026-04-22) |
| **Author** | Standards Council (Pass-4 scenario integration test) |
| **Owners (approvers required)** | `eng-lead`, `sec-lead`, `oncall-sre`, `standards-council` |
| **Target standard(s)** | [4] FWK-GOV-001 v1.2 (consumer), [33] STD-ENG-008 v1.1 (small-project exclusion), new `docs/starters/*` tree |
| **Related standards** | [5] STD-GOV-001 (PCL), [6] STD-GOV-003 (waivers), [25] STD-DAT-001 (classification), [30] STD-ENG-007 (RFC/runbook templates), [41] STD-OPS-004 (runbook), [44] STD-GOV-004 (audit), POL-GOV-001 §8 (version bumps) |
| **Created** | 2026-04-22 |
| **Window** | Comment close 2026-05-20 · decision 2026-05-27 |

---

## 1. Summary

Ship four **starter kits** — one per Pass-4 scenario archetype — that pre-wire the CYBERCUBE deliverables a new team must produce. Each starter is a pair: a `docs/starters/<archetype>.md` onboarding checklist (authored alongside the portfolio) plus a companion template repo (authored after RFC acceptance). Also introduces a small-project exclusion clause for [33] STD-ENG-008 to resolve Pass-4 F6.

Archetypes:

```
docs/starters/
├── internal-tool.md      T1 only  (addresses F1 + F6)
├── t2-saas.md            T1 + T2  (addresses F1)
├── t3-regulated.md       T1 + T2 + T3  (addresses F1)
└── ai-feature.md         T2 + AI-specific  (addresses F1 + RFC-0002 bridge)
```

Non-normative deliverables in the portfolio repo; normative change is limited to a single additive clause in [33] (small-project exclusion) and an acknowledgment paragraph in [4] FWK-GOV-001 pointing to the starters.

## 2. Problem

Pass-4 scenario integration test (`CYBERCUBE-Standards-Audit-Report-v1.md` §24.3–§24.4) surfaced two portfolio-level findings that a single RFC can resolve:

### F1 — Systemic under-investment in starter kits & templates

All five scenarios (S1 internal tool, S2 B2B SaaS, S3 fintech, S4 healthcare, S5 AI feature) independently invented the same onboarding artifacts because the portfolio specifies *what* must be true for compliance but ships no *starter assets* a new team can clone.

Concretely observed in §24.3:

- S1 had to hand-write a minimum runbook template (no one-page baseline exists).
- S2 reinvented the vendor-onboarding flow because there's no `VENDOR-ONBOARDING.md`.
- S3 hand-rolled DPIA and board-reporting templates for each new service.
- S4 built HIPAA primitives (BAA, de-identification) from scratch.
- S5 improvised a foundation-model vendor-inventory row and a prompt-versioning stub.

The throughline: every new team re-does the same ~30 T1 + ~25 T2 + ~35 T3 bootstrap steps. A canonical clone-and-fill starter collapses days → hours of non-feature overhead per team, per project.

### F6 — [33] STD-ENG-008 M-NN audit is overreach for very small projects

[33] T1 #1 — "Any piece of functionality reused across ≥ 2 projects MUST be a registered module" — is sized for product-grade reuse. Forcing a 2-eng internal tool with 3 services to audit against the 40-module catalog is ceremony without payoff. S1 flagged this directly.

Scope-down exists today only through waivers (STD-GOV-003), which adds governance burden where the standard itself should carry an exclusion clause.

## 3. Proposal

### 3.1 Four starter kits — one per archetype

Each starter is two artifacts:

1. **`docs/starters/<archetype>.md`** (in the standards repo) — the *checklist* authored under this RFC. Mirrors the [4] FWK-GOV-001 v1.2 Tier Cheat-Sheet but filtered to the archetype's tier, with fill-in sections for project-specific values (PCL code, owner roles, data classification).

2. **Template repo** (out-of-tree, named `cybercube-starter-<archetype>`) — a clonable project skeleton that ships the following pre-wired:
   - **Pre-wired Tier Table** — classification row from [5] / [25] filled in; T1/T2/T3 rows matching the archetype.
   - **Minimal runbook template** — one-page `RUNBOOK.md` covering sev levels, on-call contact, restart/redeploy commands, common-failure triage. Satisfies [41] STD-OPS-004 T1.
   - **ADR-0001 bootstrap** — skeleton ADR recording the first architectural decision (stack, tenant model). Satisfies [3] POL-GOV-002 T1.
   - **CI gate stubs** — GitHub Actions / GitLab CI workflows pre-wired for the archetype's T1 obligations: dep-scan ([22]), secret-scan, test-gate ([35]), linter ([29] CC-PID), `freeze-check`-equivalent schema gate where governance artifacts are produced.
   - **README onboarding checklist** — mirror of `docs/starters/<archetype>.md` at the root of the cloned repo; teams tick items as they complete them.

### 3.2 Archetype contents

#### 3.2.1 `internal-tool.md` (T1 only)

For: ≤ 5 eng, ≤ 5 services, INTERNAL classification, no customer data, no PII. Example: ops-automation tool, internal dashboard, back-office batch job.

Checklist:

- Register in PCL ([5]) with `C` tier = internal.
- Classify data per [25] — expected `INTERNAL`.
- Adopt T1 MUSTs from [29] naming, [35] test gate, [37] deploys, [38] logs, [41] runbook, [42] backups, [21] secure coding, [18]/[19]/[20] security minimum.
- **Skip T2 and above** (no waiver needed — tier routing handles this).
- Reference the §3.3 [33] small-project exclusion if applicable.
- Lightweight runbook (one page, not per-service).

Template repo ships with: Python/Node basic service skeleton, SQLite/Postgres choice, single-service Dockerfile, minimal CI (lint + test + dep-scan), one-page RUNBOOK.

#### 3.2.2 `t2-saas.md` (T1 + T2)

For: customer-facing SaaS, multi-tenant, subject to contractual DPAs, CONFIDENTIAL customer data. Example: a generic B2B SaaS v1.

Checklist: full T1 baseline + T2 obligations enumerated in [4] v1.2 Tier Cheat-Sheet.

Template repo ships with: multi-tenant service skeleton (tenant_id on every scoped table per [27] T1), DSAR stub endpoint ([25] T2), privacy-notice markdown ([12] T1) + consent banner, DPA-received-date tracking table, vendor-inventory seed row, SLO definition file ([39] T2), staging/prod env config, CI with SAST + dep-scan + coverage gate.

Includes a `VENDOR-ONBOARDING.md` that documents the "first-vendor" flow (addresses §24.3.2 under-spec flag).

#### 3.2.3 `t3-regulated.md` (T1 + T2 + T3)

For: regulated / high-risk — fintech, healthcare, externally-audited, PCI-adjacent. Not a scenario's default; selected explicitly.

Checklist: full T1 + T2 + T3 from the Tier Cheat-Sheet. Two sibling variants embedded:

- **Fintech variant** — pre-wired for PCI DSS 4.0 scope-adjacency (card-data tokenization via provider), GDPR mapping slots.
- **Healthcare variant** — pre-wired for HIPAA BAA, de-identification paths (safe-harbor / expert-determination).

Template repo ships with (on top of T2 skeleton): KMS/BYOK integration stubs, SIEM-exportable audit-log pipeline, board-report template, DPIA template, DR runbook, quarterly-gameday calendar, IR external-retainer placeholder.

Depends on RFC-0005 landing for the `governance/compliance-maps/*` artifacts — the T3 starters reference them. This RFC does not block on RFC-0005; the starters will cross-link placeholders that resolve when RFC-0005 ships.

#### 3.2.4 `ai-feature.md` (T2 + AI-specific)

For: AI-backed product feature layered on an existing T2 parent. Example: LLM-powered feature inside an existing SaaS.

Checklist: parent-project T2 set + AI-specific obligations from [11] POL-AI-001 + [21] STD-SEC-002 prompt-injection clauses + [35] adversarial testing.

Template repo ships with: foundation-model vendor-inventory row (uses the `foundation-model` category added in §24.4 F5 / TASK-0002), prompt-template directory with version-control convention, model-id pinning file, prompt-injection test fixture, unsafe-output KRI definition (consumer of [45] STD-GOV-005).

Cross-links RFC-0002 (`STD-AI-001`). When RFC-0002 lands, the prompt/system-prompt versioning convention moves authoritatively to `STD-AI-001`; this starter updates to cite it. Until then, the starter is the interim canonical location.

### 3.3 Small-project exclusion clause for [33] STD-ENG-008

Additive T1 clause to [33] §Applicability Tier Table — does not weaken [33] T1 obligations for products that meet the threshold. Proposed text:

> **[T1] Small-project exclusion.** The M-NN module-catalog audit obligation in T1 #1 ("reuse across ≥ 2 projects") does not apply to products that meet **all** of the following:
>
> - ≤ 5 engineering FTEs,
> - ≤ 5 production services,
> - Data classification `INTERNAL` or below per STD-DAT-001,
> - No customer-facing interface (public APIs, customer UIs, or billed endpoints).
>
> Excluded products MUST still follow T1 #2 (owner + ICD + version for any module they *choose* to register) and T1 #3 (breaking-change semver). The exclusion is self-asserted in the product's README and recorded in the PCL row (STD-GOV-001); no waiver is required. When any threshold is crossed, the exclusion lapses at the next release and the full T1 audit obligation applies.

Mechanics:

- [33] version bump v1.1 → v1.2 (minor; additive clause, no existing rule altered).
- `modules/contracts/` mirror unaffected.
- `tools/freeze-check.py` unaffected (it counts Tier Table rows, not clauses).
- Document impact in [33] Version History row.

### 3.4 [4] FWK-GOV-001 pointer to starters

Additive paragraph under the existing Tier Cheat-Sheet "How to use" section — one line pointing at `docs/starters/` with per-archetype descriptions. No version bump (handoff convention: additive pointer text is mirror-level, not a new clause). If approvers disagree, v1.2 → v1.3 minor bump.

## 4. Out of scope

- Populating the template *repos* (cybercube-starter-*). This RFC scopes the checklist + bootstrap spec; repo authoring is a follow-on ticket post-acceptance.
- Regulation-specific mapping artifacts (PCI, HIPAA, SOC2) — covered by RFC-0005.
- A fifth starter for mobile/edge products — defer; Pass-4 did not evaluate that archetype.
- Any change to the 5 T1 rules of [29] STD-ENG-001 (owned by RFC-0001).
- Any change to [11] POL-AI-001 structure (owned by RFC-0002).
- Any change to [14] POL-REC-001 / [25] STD-DAT-001 structure (owned by RFC-0003).

## 5. Migration plan

| Step | Action | Owner | When |
|------|--------|-------|------|
| 1 | Accept this RFC | eng-lead + sec-lead + oncall-sre + standards-council | decision-date |
| 2 | Author `docs/starters/internal-tool.md` | Standards Council | week 1 |
| 3 | Author `docs/starters/t2-saas.md` + `docs/starters/VENDOR-ONBOARDING.md` | Standards Council + `sec-lead` | week 1-2 |
| 4 | Author `docs/starters/t3-regulated.md` (fintech + healthcare variants) | Standards Council + `legal-lead` | week 2-3; depends on RFC-0005 placeholders |
| 5 | Author `docs/starters/ai-feature.md` | Standards Council + `eng-lead` | week 2 |
| 6 | Apply [33] small-project exclusion clause; bump v1.1 → v1.2 | Standards Council + `eng-lead` | week 3 |
| 7 | Author pointer paragraph in [4] FWK-GOV-001 Tier Cheat-Sheet | Standards Council | week 3 |
| 8 | Create template repos `cybercube-starter-<archetype>` (four repos) | `eng-lead` + per-domain lead | weeks 4-6 (follow-on) |
| 9 | Re-run `tools/freeze-check.py` + `tools/validate-schemas.py --strict` | CI | week 3 |
| 10 | Re-run `tools/pass3-score.py` after survey-window close to quantify F4/F1 impact | Standards Council | post-2026-05-06 |
| 11 | Announce in `#eng-standards` and open a delivery-team feedback channel | `eng-lead` | week 3 |

## 6. Expected impact

| Axis | Before (Pass-4) | After (projected) |
|------|------|------|
| S1 verdict | ✅ follow-able with friction | ✅ follow-able clean |
| S2 verdict | ✅ follow-able | ✅ follow-able, faster onboarding |
| S3 verdict | ⚠️ follow-able with effort | ⚠→✅ (conditional on RFC-0005) |
| S4 verdict | ⚠️ follow-able with gaps | ⚠→✅ (conditional on RFC-0005) |
| S5 verdict | ⚠️ blocked pending RFC-0002 | ⚠ unchanged pre-RFC-0002; starter unblocks the interim case |
| Coordination cost (S2) | 25 docs opened | 5 docs opened + 1 starter README |
| Coordination cost (S3) | 40 docs opened | 10 docs + 1 starter README + 1 compliance-map |
| §24.4 F1 | open | closed on this RFC acceptance (+ template-repo ship) |
| §24.4 F6 | open | closed on [33] clause application |

## 7. Risks

- **Starter rot.** If starters drift from the underlying standards, they mislead rather than help. Mitigation: add a `freeze-check`-equivalent that verifies each `docs/starters/<archetype>.md` references only clauses that exist at their current version. Shipped as `tools/starter-check.py` in week 3.
- **Over-prescription.** Starters ossify a single stack choice. Mitigation: archetype READMEs list stack choices as "default — replaceable", and the Tier Table row is the normative part (not the stack).
- **Template-repo maintenance load.** Four repos to keep current. Mitigation: designate `eng-lead` as owner with a semi-annual refresh cadence; repos pin to a specific FWK-GOV-001 version and are bumped deliberately.
- **Small-project exclusion abuse.** Teams self-assert to skip [33] audits. Mitigation: threshold is auditable via the PCL row; exclusion lapses automatically when threshold crossed; annual sample-audit by Standards Council on PCL-declared exclusions.
- **AI starter pre-empting RFC-0002.** `ai-feature.md` sets de-facto conventions before `STD-AI-001` exists. Mitigation: the starter explicitly marks the prompt-versioning section as "interim — will move to STD-AI-001 on RFC-0002 acceptance"; a one-line find-replace when RFC-0002 lands.

## 8. Alternatives considered

- **(a) Starters without template repos.** Rejected — checklists alone don't move the needle; the leverage is in clonable skeletons.
- **(b) One universal starter with "pick your tier" toggles.** Rejected — the tiers diverge enough (multi-tenant, AI, regulated) that a single conditional template becomes unreadable.
- **(c) Third-party starter (e.g. generic Next.js / FastAPI template) + a CYBERCUBE overlay script.** Rejected — keeps the governance layer outside the repo it's meant to govern; drift becomes invisible.
- **(d) Add the small-project exclusion as an STD-GOV-003 waiver template instead of a [33] clause.** Rejected — normalizes a pattern that should be in-standard, not in-waiver. Creates recurring exception-register load for a case that is structurally legitimate.
- **(e) Six starters (adding mobile + platform/infra).** Deferred — not evaluated in Pass-4; revisit after a Pass-5 scenario pass covers those archetypes.

## 9. Decision record

Acceptance requires sign-off from the Named Approver Quartet (STD-ENG-007 Appendix X + standards-council due to portfolio-wide impact):

- [ ] `eng-lead` — confirms archetype scope + [33] exclusion clause language.
- [ ] `sec-lead` — confirms T1 security baseline is preserved in all four starters + no AuthN/AuthZ rule drift.
- [ ] `oncall-sre` — confirms runbook-minimum + on-call contract preserved across starters.
- [ ] `standards-council` — confirms portfolio-wide governance (FWK-GOV-001 pointer, cross-RFC coordination with RFC-0002/0005).

Optional advisory reviewers (non-gating):

- `legal-lead` — for the T3 healthcare / fintech variants and the VENDOR-ONBOARDING doc.
- `privacy-lead` — for the DSAR / DPIA template stubs in T2 / T3 starters.

After acceptance, this RFC file moves to `rfcs/accepted/` and the Standards Council opens four tickets for template-repo creation (§5 step 8). The audit report §25 accretes a sub-log per authored starter.

---

## 10. Decision

**Accepted on 2026-04-22** by the Named Approver authority, pre-empting the scheduled 2026-05-27 decision date. Comment window waived per POL-GOV-001 §8.3.

Approver sign-off:

- [x] `eng-lead` — 2026-04-22
- [x] `sec-lead` — 2026-04-22
- [x] `oncall-sre` — 2026-04-22
- [x] `standards-council` — 2026-04-22

Implementation scheduled in phased follow-ons (per §5 migration plan). See `CYBERCUBE-Standards-Audit-Report-v1.md` §26 for the current execution state.

---

*End of RFC-0004.*
