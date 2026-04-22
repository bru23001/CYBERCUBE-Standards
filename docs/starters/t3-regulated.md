# Starter: T3 Regulated (T1 + T2 + T3)

**Archetype:** Regulated / high-risk product. Two sibling variants: **Fintech** (PCI DSS 4.0, GDPR) and **Healthcare** (HIPAA Security Rule, BAA).
**Cites:** [4] FWK-GOV-001 v1.4 Tier Cheat-Sheet · [7] STD-GOV-006 v1.2 · `governance/compliance-maps/` · [46] TPL-LGL-002 (BAA) · [47] STD-DAT-005 (de-identification).
**Addresses:** Pass-4 F1 (starter kits) · F2/F3 closure chain (via [7] + [46] + [47]).

> **Prereq:** the `governance/compliance-maps/*.md` files must exist. They shipped in RFC-0005 execution (2026-04-22); seed rows are in place, per-regulation bulk population is a follow-on per owner cadence.

---

## 1. Applicability

Use this archetype **only** when one of the following holds:

- **Fintech:** PCI DSS 4.0 card-data scope (direct or scope-adjacent via tokenization), regulated financial data (broker-dealer / bank / FINRA-scoped), or cross-border financial obligations (MiFID II, PSD2)
- **Healthcare:** HIPAA PHI processing (Covered Entity, or Business Associate with direct PHI access), HITECH, state-level health privacy (CMIA, etc.)
- **Externally audited:** SOC 2 Type II as a **contractual deliverable** (not a voluntary marketing asset), ISO 27001 scoped-in, GDPR DPIA-required processing

Most products are **not** T3. Default to `t2-saas.md` unless a trigger fires and is documented in the PCL row ([5]) with date + reason.

---

## 2. Fill-ins

| Key | Value |
|---|---|
| Product name | `[FILL]` |
| PCL code ([5]) | `[FILL]` |
| PCL `C` tier | `Tier-1-Critical` (expected default for T3) |
| Data classification ([25]) | `RESTRICTED` (expected: card data / PHI / regulated financial data) |
| **Variant** | `fintech` / `healthcare` / `both` |
| Regulation scope | `pci-dss-4.0` / `hipaa-security-rule` / `soc2` / combination — **link each to the corresponding `governance/compliance-maps/*.md`** |
| Compliance map reference | `[FILL]` — path in `governance/compliance-maps/` |
| Compliance owner ([4] T3) | `[FILL]` |
| Privacy owner | `[FILL]` |
| Security owner (`sec-lead`) | `[FILL]` |
| Vendor owner | `[FILL]` |
| **CISO or equivalent** | `[FILL]` ([17] T3 controls-monitoring lead) |
| Risk-committee chair | `[FILL]` ([8] T3 executive review) |
| Independent internal audit lead | `[FILL]` ([44] T3) |
| Business Continuity owner | `[FILL]` |
| External IR retainer | `[FILL]` — vendor + SLA ([23] T3) |
| External auditor (SOC 2 / regulatory) | `[FILL]` |

---

## 3. T1 + T2 baseline

**All items from [t2-saas.md](./t2-saas.md) §3 and §4 apply in full.** T3 overrides and additions are below.

No T1/T2 item is skipped at T3. If a T2 item looks redundant with a T3 upgrade, both remain: T3 is additive, not replacement.

---

## 4. T3 Pre-GA Checklist

### Governance & Compliance

- [ ] **[3] POL-GOV-002 T3** — Formal ARB chartering; scheduled architecture reviews with attendance records; enterprise reference-architecture compliance; external review (cloud well-architected framework).
- [ ] **[4] FWK-GOV-001 T3** — External framework-compliance validation; published compliance scores; board-level reporting; SOC-2/ISO-27001 cross-map via UCM.
- [ ] **[5] STD-GOV-001 T3** — Regulator-facing product inventory attestation; external PCL validation; authoritative asset-management linkage.
- [ ] **[6] STD-GOV-003 T3** — External audit of the exception register; board-level review of critical exceptions; regulator-facing waiver attestations.
- [ ] **[7] STD-GOV-006 T3** — **External-auditor evidence packs derived from UCM**; live multi-framework crosswalk (`governance/compliance-maps/`); automated evidence collection. Compliance-map row for each in-scope regulation referenced in evidence pack.
- [ ] **[8] STD-ERM-001 T3** — Executive risk committee; independent review of residual ratings; board-level reporting; GRC-platform integration.
- [ ] **[44] STD-GOV-004 T3** — Independent internal audit function; scheduled compliance audits; audit-universe refresh.
- [ ] **[45] STD-GOV-005 T3** — Audit-grade metric pipeline (source-to-dashboard traceability); externally verifiable metrics; **quarterly board KRI report**; metric change control.

### People & Vendors

- [ ] **[9] POL-VEN-001 T3** — SOC-2 Type II attestation required from vendors; pen-test evidence; on-site audit rights; **multi-vendor contingency for critical dependencies**; bi-annual vendor-origin IR tabletops. Run [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) Step 3 at MEDIUM+ rating.
- [ ] **[10] POL-AUP-001 T3** — Role-based AUP addenda; training-completion gate **before** access; insider-threat monitoring; prohibited-software allowlist/denylist via MDM; disciplinary matrix codified.
- [ ] **[11] POL-AI-001 T3** — AI Governance Committee (policy body); ethics review board; board approval for critical-risk AI use cases. *If product has AI features → overlay [ai-feature.md](./ai-feature.md) + [48] STD-AI-001 T3.*
- [ ] **[24] STD-SEC-008 T3** — PCI-specific training (Req 12.6 if in PCI scope); sector-specific modules; executive crisis simulations; bi-annual tabletops.

### Privacy & Records

- [ ] **[12] POL-PRI-001 T3** — Sector-specific disclosures (HIPAA NPP / COPPA / GLBA as applicable); layered notice; DPIA summary referenced; automated DSR portal.
- [ ] **[13] POL-PRI-002 T3** — Full Art. 35 DPIAs; data-minimization-by-design; pseudonymization / differential privacy; BCRs / SCCs for cross-border transfers.
- [ ] **[14] POL-REC-001 T3** — Formal records-management training; DLP coverage; immutable/WORM archive tier; certified media sanitization; external attestation.
- [ ] **[15] STD-LGL-001 T3** — Automated preservation (vault + hold flag); forensic chain-of-custody; eDiscovery tooling; regulator-clock automation.
- [ ] **[47] STD-DAT-005 T3** — *If de-identifying PHI/GDPR data:* **Formal Expert-Determination review by qualified statistician** (HIPAA §164.514(b)(1)); statistical disclosure control; differential privacy where applicable; external audit of releases; k-anonymity / l-diversity / t-closeness thresholds declared + enforced.

### Security

- [ ] **[17] STD-SEC-001 T3** — Continuous controls monitoring mapped to UCM; CISO-owned risk register; scheduled third-party pen tests; executive-reported KRIs.
- [ ] **[18] STD-SEC-003 T3** — **Enforced MFA**; enterprise SSO (SAML); **FIDO2 keys**; step-up auth for privileged ops; session recording for admin actions; SCIM; continuous auth telemetry.
- [ ] **[19] STD-SEC-004 T3** — PostgreSQL RLS authoritative on tenant tables; dedicated policy engine (OPA); quarterly access certification; **SoD matrix**; JIT privileged access; break-glass with auto-revocation.
- [ ] **[20] STD-SEC-005 T3** — **BYOK/HYOK**; HSM-backed key storage; FIPS 140-2/3 modules; post-quantum planning (hybrid KEMs); SoD on key admin; formal crypto-review gate.
- [ ] **[21] STD-SEC-002 T3** — SAST on every PR with blocking gate; IAST/DAST in staging; secure-code review for privileged modules; threat modeling; memory-safety-first language preference.
- [ ] **[22] STD-SEC-006 T3** — Bug bounty; DAST in staging; cloud CSPM; executive KRI reporting; scheduled third-party pen tests; UCM-wired dashboard.
- [ ] **[23] STD-SEC-007 T3** — **External IR retainer with SLA**; chain-of-custody forms; 24×7 security on-call; executive-briefing cadence; forensic toolchain (EDR / memory / disk); regulator-notification automation (**GDPR 72h / HIPAA 60d**).

### Data

- [ ] **[25] STD-DAT-001 T3** — Legal-hold system with per-entity flags; BYOK/HYOK; automated DSAR with ID-verification; immutable audit trails; tokenization / pseudonymization; residency controls; **GDPR DPIA / HIPAA BAA (via [46] TPL-LGL-002) / PCI SecDepth** artifacts.
- [ ] **[26] STD-DAT-002 T3** — Archival (cold) tier before purge; suspension distinct from deletion; per-tenant retention; legal-hold integration; cryptographic erasure; SIEM-immutable audit.
- [ ] **[27] STD-DAT-004 T3** — PostgreSQL RLS authoritative; tenant federation (isolated schemas / DBs); break-glass with auto-revocation; **per-tenant encryption keys (BYOK)**.

### Engineering

- [ ] **[28] STD-ENG-009 T3** — Formal architecture review per new stack entry; vendor-risk assessment per technology; **SLSA attestation**; reproducible builds; FIPS-validated crypto libs; golden-image requirement.
- [ ] **[49] STD-ENG-001A T3** — CC-PID integrity signature (tamper-evidence); per-tenant namespace partitioning in IDs; identifier audit trail; code-gen emits conformant IDs only; pre-commit blocks non-conformant identifiers.
- [ ] **[50] STD-ENG-001B T3** — Centralized artifact registry with version audit trail; immutability enforcement on published governance records.
- [ ] **[51] STD-ENG-001C T3** — Architecture-review gates on new component-type suffixes; pre-commit hooks on non-conformant module/file names.
- [ ] **[31] STD-ENG-002 T3** — **mTLS between services**; signed-request scheme for partners; full audit-store recording; contract testing (Pact); API gateway with policy enforcement; client-cert auth.
- [ ] **[32] STD-ENG-003 T3** — *Webhook emitters only:* event replay UI; typed SDKs; per-subscription rate limiting; customer delivery dashboard; SOC-2-grade delivery audit trail.
- [ ] **[33] STD-ENG-008 T3** — Module-level SBOM + provenance; license-compatibility policy per consumer; **signed release artifacts**; LTS branches; RFC for new modules; ARB-reviewed dependency graph.
- [ ] **[34] STD-ENG-004 T3** — **Policy-as-code (OPA / Sentinel / Conftest) blocking gates**; production-apply approval workflow; break-glass for emergencies; tested state-recovery runbook; cost-budget guardrails; multi-region state; SoD on IaC.
- [ ] **[35] STD-ENG-005 T3** — Mutation testing; property-based testing; performance baselines with regression alerts; chaos / resilience testing; archived test evidence; contract testing; **OWASP ASVS mapping**.
- [ ] **[36] POL-ENG-001 T3** — Formal CAB ceremony; **segregation of duties on approval**; metrics dashboard; annual program review; compliance attestation.
- [ ] **[37] STD-ENG-006 T3** — **Artifact signing (cosign / sigstore)** with verify-at-deploy policy; SBOM per release; build/deploy SoD; canary / blue-green; automated rollback on health regression; SIEM-exported deploy audit.

### Operations

- [ ] **[38] STD-OPS-003 T3** — End-to-end distributed tracing; **audit-log pipeline separate from ops logs** (immutable, SIEM-exportable); anomaly detection; synthetic monitoring; executive observability KRIs; multi-tenant log isolation.
- [ ] **[39] STD-OPS-005 T3** — **24×7 on-call**; multi-region / multi-AZ redundancy; quarterly chaos / gamedays; toil tracking ≤50%; monthly reliability review; DR tested quarterly; **99.95%+ availability**.
- [ ] **[40] STD-SLP-001 T3** — Measured SLO engineering (SLI + burn-rate + error-budget-driven change freezes); service-credits billing integration; customer reporting portal; contractual SLA with remedies.
- [ ] **[41] STD-OPS-004 T3** — Quarterly IR tabletops; BCP/DR integration; SEV-specific customer/regulator notification trees; external IR retainer; formal metrics dashboard.
- [ ] **[42] STD-OPS-002 T3** — **Quarterly full-DR gameday**; 3-2-1 backup rule; hardened immutable/WORM tier; legal-hold-compatible backups; per-tenant restore; DR-audit reports.
- [ ] **[43] PLN-OPS-001 T3** — **Annual live exercise** (not just tabletop); alternate-site tested; regulatory continuity reports; ISO 22301 BCMS; board reporting; business-interruption insurance; BIA refresh ≤ annual.

---

## 5. Variant: Fintech

Additional items specific to PCI DSS 4.0 / regulated financial data. Reference: `governance/compliance-maps/pci-dss-4.0.md`.

- [ ] **PCI scope-reduction preferred** — use a PCI-compliant provider for tokenization; keep your product out of direct cardholder data (CHD) handling where possible. Document the scope-reduction decision in ADR-0001.
- [ ] **If direct CHD handling is unavoidable:** network segmentation per PCI Req 1; CDE (Cardholder Data Environment) boundary documented; CDE has its own VPC / subnet; CDE traffic is mTLS-only (T3 [31]); CDE has dedicated key management (BYOK + HSM per T3 [20]).
- [ ] **Quarterly ASV scans** — Approved Scanning Vendor, PCI Req 11.3.2
- [ ] **Annual penetration test** — covering CDE + internal + external surfaces, PCI Req 11.4
- [ ] **PCI AOC (Attestation of Compliance)** — SAQ-A / SAQ-D depending on scope; renewed annually
- [ ] **File integrity monitoring** on CDE systems — PCI Req 11.5
- [ ] **PCI Req 12.6 training** — role-specific; tracked (T3 [24] overlaps)
- [ ] **Incident notification** includes card brands and acquirer per PCI Req 12.10
- [ ] **GDPR overlay if EU users** — DPIA, SCCs for transfers, DPO designation if required (T3 [13])
- [ ] **MiFID II / PSD2 if applicable** — consult `legal-lead`; add bespoke controls; map to UCM in [7]

**Scope-adjacency decision tree:** if the product only *displays* a tokenized PAN from a provider (stripe, adyen) and never sees the full PAN, scope-adjacency is achieved; PCI obligations reduce to vendor management ([9] T3) plus customer-data protection ([25] T3). Document this in ADR-0001.

---

## 6. Variant: Healthcare

Additional items specific to HIPAA Security Rule / PHI processing. Reference: `governance/compliance-maps/hipaa-security-rule.md`.

- [ ] **BAA executed** with every vendor / sub-processor touching PHI — **use [46] TPL-LGL-002** (standard BAA template). Schedules A-D customized per vendor.
- [ ] **Covered Entity vs Business Associate** role identified; if BA, flow-down BAAs to sub-processors required
- [ ] **Security Risk Analysis** per §164.308(a)(1)(ii)(A) — documented, reviewed at material change and annually
- [ ] **Administrative safeguards** per §164.308 — workforce training, access authorization procedures, incident response, evaluation — map to UCM per [7]
- [ ] **Physical safeguards** per §164.310 — typically inherited from cloud-provider BAA (AWS / GCP / Azure BAA on record); facility-access controls where workplace handles PHI (print / fax / workstation)
- [ ] **Technical safeguards** per §164.312 — access control, audit controls, integrity, transmission security. Covered by T3 [18], [19], [20], [38].
- [ ] **Breach notification pipeline** — 60-day max to individuals per §164.404; without-unreasonable-delay to HHS (<500 affected → annual log; ≥500 → within 60 days per §164.408); media notification if ≥500 in a state per §164.406
- [ ] **Minimum Necessary** enforcement — access to PHI scoped to role necessity ([19] permission registry at T3 granularity)
- [ ] **De-identification paths** documented — Safe-Harbor and/or Expert-Determination per [47] STD-DAT-005 T3; release logs maintained per [38]
- [ ] **Workforce training** — HIPAA-specific module per [24]; annual refresh; attestation tracked
- [ ] **HHS OIG access rights** in BAA — inspection of records where required
- [ ] **State-level overlay** — CMIA (California), and similar state laws; consult `legal-lead`
- [ ] **HITECH breach-notification rule applied** where applicable
- [ ] **ePHI transmission always encrypted** per §164.312(e)(1) — TLS 1.2+ (T1 [20])
- [ ] **ePHI at rest always encrypted** — platform-managed at T2, BYOK/HYOK at T3 ([20])
- [ ] **ePHI audit logs immutable + SIEM-exportable** — T3 [38]

---

## 7. Post-GA / ongoing

- **Board KRI report** — quarterly ([45] T3)
- **Risk committee review** — quarterly / on material change ([8] T3)
- **Independent internal audit** — per audit-universe schedule ([44] T3)
- **External auditor** — SOC 2 Type II annually; PCI AOC annually; HIPAA evaluation at material change and annually
- **Pen test** — annual + on major change ([22] T3)
- **DR gameday** — quarterly ([42] T3)
- **BC live exercise** — annually ([43] T3)
- **Compliance-map review** — re-read the relevant `governance/compliance-maps/*.md` row at each release; cross-ref to evidence pack; flag if >13 months stale

---

## 8. Exclusions

| Standard | Clause | Reason |
|---|---|---|
| [33] STD-ENG-008 | Small-project exclusion | Not applicable at T3 — always audited |
| (none else) | — | T3 is additive; no T1/T2 rows skipped |

---

## 9. Escapes

T3 waivers flow through [6] STD-GOV-003 with **external-audit-visible** exception register ([6] T3). Board notification required for critical exceptions. No informal skips.

---

*Template repo: `cybercube-starter-t3-regulated` (follow-on). Fintech and healthcare sub-templates. Until it ships, this checklist + [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) + the `governance/compliance-maps/*` files + the cited standards are the canonical start.*
