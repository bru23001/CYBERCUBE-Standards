# Starter: Vendor Onboarding

Canonical "first-vendor" flow. Referenced from [t2-saas.md](./t2-saas.md) and [t3-regulated.md](./t3-regulated.md).
**Cites:** [9] POL-VEN-001 · [16] TPL-LGL-001 (DPA) · [46] TPL-LGL-002 (BAA) · [25] STD-DAT-001 · [7] STD-GOV-006 · `governance/compliance-maps/`.

**Addresses:** Pass-4 S2 under-spec flag — "every team re-invents the vendor-onboarding flow because there's no `VENDOR-ONBOARDING.md`."

---

## 1. When to run this flow

**Before any vendor gets access to customer data, PII, PHI, or production systems.** Run once per new vendor; re-run annually per [9] T2 for existing vendors.

Scope is broad: SaaS dependencies, subprocessors, analytics/observability providers, foundation-model API vendors, CI/CD platforms, managed databases, payment processors.

---

## 2. Roles

| Role | Accountability |
|---|---|
| **Vendor owner** | Single named engineering/product person responsible for this vendor relationship. Renews annually. |
| **Security reviewer (`sec-lead`)** | Confirms security posture of the vendor; signs off on risk rating. |
| **Legal / Privacy (`legal-lead`, `privacy-lead`)** | Owns contract execution (DPA, BAA where applicable) and sub-processor review. |
| **Finance / Procurement** | Owns spend, contract lifecycle, SLA-credit tracking. |

---

## 3. Seven-step flow

### Step 1 — Intent and scope

Vendor owner files an onboarding request with:

- Vendor name, product, primary contact
- Purpose (what problem this vendor solves)
- **Data classification handled** per [25] (`PUBLIC` / `INTERNAL` / `CONFIDENTIAL` / `RESTRICTED`)
- **Regulation scope touched** (`none` / `GDPR` / `PCI DSS` / `HIPAA` / `SOC 2 customer-audit-scope`)
- Estimated spend tier

If classification is `CONFIDENTIAL` or higher, Steps 3 and 5 are **required**. If regulation scope is `HIPAA`, Step 5 includes a BAA via [46] TPL-LGL-002. If PCI / HIPAA / SOC 2, cross-link the relevant `governance/compliance-maps/*` row now.

### Step 2 — Risk rating

`sec-lead` assigns a risk rating (`LOW` / `MEDIUM` / `HIGH` / `CRITICAL`) based on:

- Data classification handled
- System criticality (Tier-1 production path vs. side-car)
- Vendor track record (SOC 2 Type II? ISO 27001? breach history?)
- Data residency / transfer path (cross-border triggers SCCs/BCRs)

Rating lands in the vendor register and the ERM risk register per [8] STD-ERM-001.

### Step 3 — Security assessment

**For LOW risk:** vendor SOC 2 Type II report review is sufficient; attach to the vendor register row.

**For MEDIUM / HIGH / CRITICAL:**
- SOC 2 Type II **or** equivalent (ISO 27001, PCI AOC)
- Security questionnaire (CAIQ-equivalent) answered by vendor
- Pen-test summary within last 12 months
- Sub-processor list reviewed
- Incident-notification commitment ≤72h (or regulation-specific: GDPR 72h, HIPAA 60d)
- For `CRITICAL`: on-site audit rights clause negotiated ([9] T3 pattern)

`sec-lead` signs off before Step 5.

### Step 4 — Regulation-specific checks

Run the relevant blocks based on regulation scope:

**GDPR in scope:**
- Confirm vendor is a processor or sub-processor under GDPR Art. 28
- Cross-border transfer mechanism identified (adequacy / SCCs / BCRs)
- Processor agreement clauses prepared for Step 5 ([16] TPL-LGL-001)

**PCI DSS in scope (card-data handling):**
- Confirm vendor PCI AOC (Attestation of Compliance) covers the services used
- Cross-link to `governance/compliance-maps/pci-dss-4.0.md` row for the relevant UCM control
- Scope-reduction preference: use a PCI-compliant provider (tokenization) to keep your product out of PCI scope where possible

**HIPAA in scope (PHI access):**
- Confirm vendor will sign a BAA using **[46] TPL-LGL-002**
- Cross-link to `governance/compliance-maps/hipaa-security-rule.md`
- Confirm Minimum Necessary scope for PHI access
- Sub-processor BAA flow-down verified

**SOC 2 customer-audit scope:**
- Cross-link to `governance/compliance-maps/soc2.md` if this vendor's controls are inherited into your SOC 2 report

### Step 5 — Contract execution

Instruments by scope:

| Scope | Instrument(s) |
|---|---|
| Any customer personal data | DPA via [16] TPL-LGL-001 |
| PHI access (HIPAA) | DPA + **BAA via [46] TPL-LGL-002** |
| Card-data handling (direct) | DPA + PCI-specific addendum |
| Spend only, no data | MSA only |

`legal-lead` owns execution; contract stored in the vendor register row.

### Step 6 — Integration and first-use

Before production data flows:

- [ ] Secrets stored in secrets manager ([20] STD-SEC-005); no vendor API keys in source
- [ ] Vendor access minimally scoped (least-privilege; per-service credentials)
- [ ] Network path documented (mTLS / API / webhook / data export)
- [ ] Logs include vendor-relevant correlation IDs ([38] STD-OPS-003)
- [ ] Vendor API errors wired into incident paging ([41] STD-OPS-004) where on critical path
- [ ] If vendor is on critical path → BC contingency documented ([43] PLN-OPS-001); multi-vendor fallback required at T3
- [ ] First use under monitoring; SEV tracking active

### Step 7 — Register and track

Vendor owner completes the vendor register row per [9] §2 with these fields (machine-readable schema in `schemas/vendor-inventory.schema.v1.1.json`):

- `vendor_id`, `name`, `category`, `owner`, `criticality`, `data_classification`, `regulation_scope`, `risk_rating`
- `dpa_signed_date`, `baa_signed_date` (if HIPAA), `soc2_type_ii_expiry`
- `sub_processors[]`, `data_residency`, `incident_notification_sla`
- `compliance_map_ref` (path to `governance/compliance-maps/*` row if regulation-scoped)
- `next_review_date` (annual for LOW/MEDIUM, semi-annual for HIGH/CRITICAL)

---

## 4. Ongoing obligations

| Cadence | Action | Owner |
|---|---|---|
| Annual | Re-assessment (questionnaire refresh, SOC 2 renewal, sub-processor list diff) | Vendor owner |
| Semi-annual (HIGH/CRITICAL) | Risk review; rating re-confirmation | `sec-lead` + Vendor owner |
| On breach notification | Incident entry per [23] STD-SEC-007; triage; customer-notification decision | `sec-lead` + `legal-lead` |
| On sub-processor change | Review + customer notification per DPA obligations (typically 30d) | `legal-lead` |
| On material service change | Re-run Steps 2-4 | Vendor owner |

---

## 5. Offboarding

Triggered by contract end, risk rating upgrade beyond tolerance, or business decision to exit.

- [ ] Access revoked (vendor API keys rotated; SSO access removed)
- [ ] Data return or certified destruction per contract (evidence filed with contract)
- [ ] Customer notification if vendor was a named sub-processor in public sub-processor list ([12] POL-PRI-001)
- [ ] Vendor register row marked `offboarded` with date + reason
- [ ] Any compliance-map references decoupled
- [ ] Final SLA-credit reconciliation (Finance / Procurement)

---

## 6. Anti-patterns

- **No DPA, customer data flowing.** Violates [9] T2. Pause the integration; execute DPA; backfill retroactively is **not** acceptable — this is a reportable finding per [44].
- **AI-vendor "quick prototype" exception.** Foundation-model API vendors handling customer prompts require the full flow; classification of prompt content (usually `CONFIDENTIAL` or higher if it embeds customer context) drives the scope. See [ai-feature.md](./ai-feature.md).
- **Single-vendor critical dependency without contingency.** T3 mandates multi-vendor contingency ([9] T3). T2 strongly recommends. Document the BC plan in [43].
- **Sub-processor added silently.** Customer notification obligations in your DPA template ([16]) usually require ≥30d notice. Track sub-processor changes at Step 4 cadence.

---

*This document is a starter-kit asset, not a standard. The normative rules live in [9] POL-VEN-001. When [9] updates, this flow is updated in the same commit and `tools/starter-check.py` verifies the references resolve.*
