# Starter: T2 SaaS (T1 + T2)

**Archetype:** Customer-facing multi-tenant SaaS v1. T1 baseline + T2 obligations.
**Cites:** [4] FWK-GOV-001 v1.4 Tier Cheat-Sheet · [5] STD-GOV-001 · [25] STD-DAT-001 · [27] STD-DAT-004 · [9] POL-VEN-001 · [16] TPL-LGL-001.
**Addresses:** Pass-4 F1 (starter kits); Pass-4 S2 vendor-onboarding under-spec (via [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md)).

---

## 1. Applicability

Use this archetype if the product is customer-facing (external users, customer UIs, public/partner APIs, or billed endpoints) and any of:

- Multi-tenant (tenant_id-scoped data)
- Subject to contractual DPAs
- Classification `CONFIDENTIAL` or below per [25] (customer PII)
- **Not** in HIPAA / PCI / regulated-finance scope (if it is → `t3-regulated.md`)

If AI features are layered on top → keep this archetype for the parent product and overlay [ai-feature.md](./ai-feature.md).

---

## 2. Fill-ins

| Key | Value |
|---|---|
| Product name | `[FILL]` |
| PCL code ([5]) | `[FILL]` |
| PCL `C` tier | `Tier-1-Critical` or `Tier-1-Standard` |
| Data classification ([25]) | `CONFIDENTIAL` (customer PII) |
| Multi-tenant? | `yes` (default for this archetype) / `no` → revisit [27] applicability |
| Compliance owner ([4] T2) | `[FILL]` |
| Privacy owner (DPO contact) | `[FILL]` |
| Security owner (`sec-lead`) | `[FILL]` |
| Vendor owner ([9] T2) | `[FILL]` |
| On-call primary / backup | `[FILL]` / `[FILL]` |
| Architecture owner ([3]) | `[FILL]` |
| First-vendor list | `[FILL]` — see [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) |

---

## 3. T1 baseline

All items from [internal-tool.md](./internal-tool.md) §3 apply **in full**, with these T1 upgrades:

- [ ] **[27] STD-DAT-004 T1** — `tenant_id` on every scoped table / index / cache / path; every query filters by it; cross-tenant leakage tests in CI.
- [ ] **[25] STD-DAT-001 T1** — classification fields include `CONFIDENTIAL` marking for customer PII; DSAR-accessible fields identified.
- [ ] **[12] POL-PRI-001 T1** — published, version-dated public Privacy Policy with full GDPR/CCPA categories. **Required** (no skip).
- [ ] **[13] POL-PRI-002 T1** — classify all personal data; declare lawful basis before collection.
- [ ] **[9] POL-VEN-001 T1** — every customer-data-touching vendor in the register with risk rating and assessment before data flows.
- [ ] **[33] STD-ENG-008** — small-project exclusion does **not** apply (customer-facing).

---

## 4. T2 Pre-GA Checklist

### Governance & Compliance

- [ ] **[3] POL-GOV-002 T2** — Maintained C4-level architecture diagram + tech-debt log; quarterly ARB sync.
- [ ] **[4] FWK-GOV-001 T2** — Checklist re-scored each release; scores logged in `docs/compliance/`; named compliance owner.
- [ ] **[5] STD-GOV-001 T2** — Automated registry sync from source repos; quarterly PCL recertification; CMDB integration.
- [ ] **[6] STD-GOV-003 T2** — Exception register in controlled location; quarterly review; compliance-dashboard visibility.
- [ ] **[7] STD-GOV-006 T2** — Quarterly UCM refresh; gap analysis; optional: map to an external framework via `governance/compliance-maps/` (PCI / HIPAA / SOC 2) — **required only if regulation scope declared**, and if so the map is referenced in the PCL row and [44] evidence pack.
- [ ] **[8] STD-ERM-001 T2** — Semi-annual risk review per product; KRI tracking.
- [ ] **[44] STD-GOV-004 T2** — Annual audit plan; findings tracking; CAP process; periodic dashboard.
- [ ] **[45] STD-GOV-005 T2** — KRI catalog with thresholds per domain; quarterly review; automated collection.

### People & Vendors

- [ ] **[9] POL-VEN-001 T2** — Annual vendor assessment; **DPA signed before data access** (use [16] TPL-LGL-001 template); named vendor owner; offboarding + sub-processor list. Follow [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) for the first-vendor flow.
- [ ] **[10] POL-AUP-001 T2** — AUP integrated into employment contract; annual re-acknowledgment; documented BYOD / MDM enrollment; automated offboarding.
- [ ] **[11] POL-AI-001 T2** — Tool approval workflow; usage logging; AI-use disclosure in customer-facing features; AUP-aligned training cadence. *If you ship AI-backed features → overlay [ai-feature.md](./ai-feature.md) and [48] STD-AI-001 T2.*
- [ ] **[24] STD-SEC-008 T2** — Quarterly phishing simulations; role-based curricula; LMS-backed tracking.

### Privacy & Records

- [ ] **[12] POL-PRI-001 T2** — Per-jurisdiction notices (GDPR / CCPA / LGPD / UK-DPA); cookie banner with granular consent; DPO contact listed.
- [ ] **[13] POL-PRI-002 T2** — DPIA triage workflow; consent platform; DSR ticket workflow with SLA; DPA inventory; annual privacy training.
- [ ] **[14] POL-REC-001 T2** — Named records custodian per department; automated retention/disposal where the platform allows.
- [ ] **[15] STD-LGL-001 T2** — Centralized hold register; custodian acknowledgment; system-level hold capability; audit log of hold actions.
- [ ] **[47] STD-DAT-005 T2** — *If the product exports personal data for secondary use (analytics, benchmarks, research):* documented de-identification procedure per data-flow; method-selection rationale; periodic residual-risk review; de-id output held to source classification until risk validated `low`.

### Security

- [ ] **[17] STD-SEC-001 T2** — Threat modeling for new services; dependency scanning; security review of high-risk changes.
- [ ] **[18] STD-SEC-003 T2** — Email verification; secure password reset; **TOTP MFA offered**; refresh-token rotation; account lockout.
- [ ] **[19] STD-SEC-004 T2** — Permission registry; named roles with inheritance; **tenant isolation at query layer**; periodic access reviews.
- [ ] **[20] STD-SEC-005 T2** — Automated secrets rotation; encryption at rest for PII (platform-managed); mTLS internal; cert auto-renewal.
- [ ] **[21] STD-SEC-002 T2** — Linter + security rules in CI; dep-vuln scan; centralized input-validation + output-encoding libs; secure cookie flags; CSP.
- [ ] **[22] STD-SEC-006 T2** — **SAST on every PR with blocking gate**; container scanning pre-push; published VDP / `security.txt`.
- [ ] **[23] STD-SEC-007 T2** — Per-category playbooks; annual tabletop; legal-reviewed notification templates; quarterly IR metrics.

### Data

- [ ] **[25] STD-DAT-001 T2** — **DSAR workflow with SLA**; lawful-basis map per field group; encryption at rest; non-prod data masking.
- [ ] **[26] STD-DAT-002 T2** — Grace-period restore API (30d default); `410 Gone` standard; tombstone records; user-visible Trash.
- [ ] **[27] STD-DAT-004 T2** — Tenant-context middleware on routes; tenant-scoped cache / storage; async jobs carry tenant context; **negative-isolation tests**.

### Engineering

- [ ] **[28] STD-ENG-009 T2** — Quarterly radar refresh; compatibility matrix; SBOM at build; license-policy enforcement.
- [ ] **[29] STD-ENG-001 T2** — Automated lint for component-type vocabulary; CC-PID format validator; module-boundary import lint.
- [ ] **[31] STD-ENG-002 T2** — **Published OpenAPI spec**; standard response envelope; cursor pagination; idempotency keys; deprecation headers.
- [ ] **[32] STD-ENG-003 T2** — *Webhook emitters only:* canonical event schema; exponential-backoff retry; delivery logs queryable; DLQ; signed timestamp.
- [ ] **[33] STD-ENG-008 T2** — Internal `modules.json` registry; semver compatibility tests; contract tests per ICD; automated version-bump PRs.
- [ ] **[34] STD-ENG-004 T2** — IaC security scanning in CI (tfsec / Checkov); version pinning via lockfiles; CODEOWNERS on sensitive modules; drift detection.
- [ ] **[35] STD-ENG-005 T2** — Coverage ≥70% unit / ≥50% integration; SAST + dep scan; E2E on top journeys; coverage dashboard.
- [ ] **[36] POL-ENG-001 T2** — CAB review for medium/high-risk changes; change calendar; customer-impact notification.
- [ ] **[37] STD-ENG-006 T2** — CI with tests + security scan gating merge; staging ≥80% parity with prod; `/healthz` + `/readyz`; artifact registry; feature flags.

### Operations

- [ ] **[38] STD-OPS-003 T2** — Correlation / trace IDs; OpenTelemetry SDK; RED+saturation dashboards; SLO-linked alerts; on-call paging integration.
- [ ] **[39] STD-OPS-005 T2** — SLI / SLO per Tier-1-Critical; error-budget dashboards + burn-rate alerting; **24×5 on-call**; canary deploys.
- [ ] **[40] STD-SLP-001 T2** — **Public SLA doc**; status page; customer-visible incident comms; quarterly service review.
- [ ] **[41] STD-OPS-004 T2** — Paging tool (PagerDuty or equivalent); public status page; runbook repo; MTTA / MTTR targets.
- [ ] **[42] STD-OPS-002 T2** — Quarterly backup-restore tests; integrity verification; per-service DR runbook; backup alerts.
- [ ] **[43] PLN-OPS-001 T2** — Annual BC tabletop; BIA per business unit; alternate-workspace fallback; vendor contingency; pre-drafted customer notification templates.

---

## 5. Post-GA / ongoing

- Re-score the [4] checklist **at each release** → log in `docs/compliance/`.
- Review the [6] exception register **quarterly**.
- Recertify PCL row ([5]) **quarterly**.
- Run [22] scans continuously; block merges on Critical.
- Refresh vendors [9]: new DPA signed before data flows; annual assessments.
- Run [41] quarterly tabletop; publish MTTA / MTTR.
- Revisit [27] isolation tests at each schema change.

---

## 6. Exclusions

| Standard | Clause | Reason |
|---|---|---|
| [11] POL-AI-001 / [48] STD-AI-001 | AI-specific engineering T2 | Only if product has AI features → overlay [ai-feature.md](./ai-feature.md) |
| [32] STD-ENG-003 | Webhooks | Only if product emits webhooks |
| [47] STD-DAT-005 | De-identification | Only if personal data exported for secondary use |
| All T3 rows | — | Not regulated / high-risk |

---

## 7. Escalation to T3

Crossing into T3 is **explicit**, not automatic. Triggers:

- PCI DSS card-data handling (not merely tokenization via provider → direct handling)
- HIPAA PHI processing (covered entity or BA with direct PHI access)
- Regulated financial data (broker-dealer, bank charter, FINRA-scoped)
- Contractual obligation with external-auditor (SOC 2 Type II as *required* deliverable, not optional)

If any trigger fires → switch to `t3-regulated.md` and file the escalation in the PCL row ([5]) with date + reason.

---

*Template repo: `cybercube-starter-t2-saas` (follow-on). Until it ships, this checklist + [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) + the cited standards are the canonical start.*
