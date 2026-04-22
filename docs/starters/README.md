# CYBERCUBE Starter Kits

Onboarding checklists that pre-wire the CYBERCUBE deliverables a new project must produce.

**Scope of this directory:** the `docs/starters/*.md` files are *checklists* — the scoped, ordered form of [4] FWK-GOV-001 Tier Cheat-Sheet filtered by archetype. Each archetype checklist is the authoritative navigation aid; the standards cited remain the normative text.

**Not in this directory:** the companion **template repos** (`cybercube-starter-<archetype>`) live out-of-tree. They ship clonable project skeletons (service skeleton, RUNBOOK.md, ADR-0001 bootstrap, CI gate stubs). Repo creation is tracked per RFC-0004 §5 step 8 (follow-on).

## Archetypes

| Archetype | Tier | For | File |
|-----------|------|-----|------|
| Internal tool | T1 only | ≤5 eng, ≤5 services, INTERNAL data, no customer interface | [internal-tool.md](./internal-tool.md) |
| T2 SaaS | T1 + T2 | Customer-facing multi-tenant SaaS with DPAs / CONFIDENTIAL customer data | [t2-saas.md](./t2-saas.md) |
| T3 regulated | T1 + T2 + T3 | Fintech / healthcare / externally-audited; PCI or HIPAA scope | [t3-regulated.md](./t3-regulated.md) |
| AI feature | T2 + AI-specific | LLM-backed feature inside an existing T2 parent product | [ai-feature.md](./ai-feature.md) |

## Supporting files

- [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) — "first-vendor" flow referenced by `t2-saas.md` and `t3-regulated.md`, closing the Pass-4 S2 under-spec flag for the vendor-onboarding path.

## How to pick an archetype

1. **Classify.** Open [5] STD-GOV-001 (product registry / PCL criticality) and [25] STD-DAT-001 (data classification). These two pick your tier.
2. **Match.** Internal tool → `internal-tool.md`. Customer-facing SaaS → `t2-saas.md`. Regulated or externally audited → `t3-regulated.md`. AI layered on a parent → start from the parent's archetype and overlay `ai-feature.md`.
3. **Fork.** Clone the companion template repo when it ships; until then the checklist + the standards it cites are the canonical start.
4. **Fill.** Each checklist has `[FILL]` markers for per-project values (PCL code, owner roles, data classification). Complete them in your first planning session.
5. **Tick.** As each deliverable lands, mark the checklist item in the repo. The archived checklist is the audit evidence that [44] STD-GOV-004 reviewers use.

## Checklist contract

Every archetype file has this structure:

1. **Applicability** — explicit boundaries of "this archetype applies to projects where …".
2. **Fill-ins** — project-specific values captured once at project start.
3. **Pre-GA checklist** — T1 MUSTs filtered by archetype. Each item cites a standard.
4. **Post-GA / ongoing** — periodic obligations (T2/T3 if applicable).
5. **Exclusions and escapes** — which clauses intentionally don't apply, and the waiver path ([6] STD-GOV-003) if one is later needed.

## Staleness

Starters mirror the Tier Cheat-Sheet in [4] FWK-GOV-001. When the Tier Cheat-Sheet changes (e.g., a standard bumps major; a new standard joins the portfolio), the starters are updated in the **same commit** as the Tier Cheat-Sheet update. `tools/starter-check.py` (see `tools/`) lints the starters against the current portfolio as a CI gate.

## Addresses Pass-4 audit findings

- **F1** (systemic under-investment in starter kits) — closed on this directory + four archetype files shipping.
- **F6** (small-project M-NN audit overreach) — closed separately by [33] STD-ENG-008 v1.7 §Small-Project Exclusion (RFC-0004 §27 partial execution, 2026-04-22). Referenced from `internal-tool.md`.

See `CYBERCUBE-Standards-Audit-Report-v1.md` §30 for the RFC-0004 residual execution log.
