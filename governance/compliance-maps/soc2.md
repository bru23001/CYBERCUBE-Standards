---
regulation:
  id: "soc2"
  name: "SOC 2 Trust Services Criteria"
  version: "2017 (revised 2022)"
  authority: "AICPA — Auditing Standards Board"
  effective: "2017-12-15"
  published_map: "2026-04-22"
  owner: "sec-lead"
  authoritative: false
rows:
  # ──────────────────────────────────────────────────────────────────────
  # CC1 — Control Environment
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-001"
    regulation_ref: "CC1.1"
    relationship: "direct"
    notes: "Common Criteria: Control Environment — 'the entity demonstrates a commitment to integrity and ethical values'. STD-GOV-001 governance lifecycle + POL-GOV-001 policy-of-record implement CC1.1."
    evidence_artifact: "POL-GOV-001 document, governance-approval records."
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "CC1.1"
    relationship: "direct"
    notes: "CC1.1 control-environment commitment — STD-SEC-001 is the security-policy-of-record."
    evidence_artifact: "Approved STD-SEC-001 document, annual review log."
  - ucm_id: "CTL-SEC-002"
    regulation_ref: "CC1.2, CC1.3"
    relationship: "direct"
    notes: "CC1.2 board-level oversight / CC1.3 structures, reporting lines, authorities — STD-SEC-001 §Roles RACI + CISO appointment satisfy both."
    evidence_artifact: "Security RACI matrix, CISO appointment record, board reporting minutes."
  - ucm_id: "CTL-SEC-033"
    regulation_ref: "CC1.4"
    relationship: "partial"
    notes: "CC1.4 commitment to attract/develop/retain competent individuals — STD-SEC-008 baseline security training is one input; HR competency framework + role-based training (CTL-SEC-034) complete the criterion."
    evidence_artifact: "LMS completion records, competency matrix, training policy."
  # ──────────────────────────────────────────────────────────────────────
  # CC2 — Communication & Information
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-005"
    regulation_ref: "CC2.2"
    relationship: "direct"
    notes: "CC2.2 internally communicates information, including objectives and responsibilities — POL-GOV-001 semantic versioning + citation records provide the audit trail of what was communicated when."
    evidence_artifact: "Standards registry with version history, published changelog, citation graph."
  - ucm_id: "CTL-GOV-011"
    regulation_ref: "CC2.2"
    relationship: "direct"
    notes: "ADRs (POL-GOV-002) record architectural decisions with rationale; the ADR registry is the primary channel for communicating technical-design intent internally."
    evidence_artifact: "ADR registry, ADR approval records, ARB minutes."
  - ucm_id: "CTL-ENG-013"
    regulation_ref: "CC2.2"
    relationship: "direct"
    notes: "STD-ENG-007 RFC standard governs how material changes are proposed, discussed, and accepted. The rfcs/ directory is the auditable record of CC2.2 internal communication of change proposals."
    evidence_artifact: "rfcs/accepted/*.md, RFC index, comment-thread captures."
  - ucm_id: "CTL-SEC-027"
    regulation_ref: "CC2.3"
    relationship: "direct"
    notes: "CC2.3 communicates with external parties on matters affecting functioning of internal control — the vulnerability disclosure program (VDP) under STD-SEC-006 is the documented external channel for security concerns."
    evidence_artifact: "VDP page, security.txt, coordinated-disclosure acknowledgment records."
  # ──────────────────────────────────────────────────────────────────────
  # CC3 — Risk Assessment
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-006"
    regulation_ref: "CC3.1, CC3.2"
    relationship: "direct"
    notes: "STD-ERM-001 ERM program is the entity-level risk-assessment process: CC3.1 specifies objectives, CC3.2 identifies and analyzes risks. Risk register + risk-appetite statement are the primary artifacts."
    evidence_artifact: "Risk register, risk-appetite statement, ERM policy document."
  - ucm_id: "CTL-GOV-007"
    regulation_ref: "CC3.2, CC3.3"
    relationship: "direct"
    notes: "CC3.2 identifies risks, CC3.3 considers potential for fraud — STD-ERM-001 §6 risk identification + scoring methodology covers both; fraud-risk category is explicit in the risk taxonomy."
    evidence_artifact: "Risk-scoring matrix, risk-assessment records, fraud-risk assessment."
  - ucm_id: "CTL-GOV-014"
    regulation_ref: "CC3.2"
    relationship: "partial"
    notes: "Product Classification Scheme (PCL) drives risk-tiering at the product level — a PCL code produces the applicable T1/T2/T3 compliance posture. Pair with CTL-GOV-006/007 for entity-level risk coverage."
    evidence_artifact: "Product registry (PRD-xxx records), PCL codes per product."
  - ucm_id: "CTL-SEC-025"
    regulation_ref: "CC3.2"
    relationship: "direct"
    notes: "Vulnerability severity classification (CVSS + business context) under STD-SEC-006 operationalizes CC3.2 at the technical-vulnerability level."
    evidence_artifact: "Severity classification records, CVSS scoring rationale, business-context overrides."
  - ucm_id: "CTL-GOV-004"
    regulation_ref: "CC3.4, CC5.3"
    relationship: "direct"
    notes: "Exception & waiver management (STD-GOV-003) — CC3.4 identifies and assesses changes (exceptions are controlled changes to baseline) + CC5.3 deploys through policies/procedures."
    evidence_artifact: "Exception registry, waiver approvals, expiry dates, review records."
  # ──────────────────────────────────────────────────────────────────────
  # CC4 — Monitoring Activities
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-009"
    regulation_ref: "CC4.1, CC4.2"
    relationship: "direct"
    notes: "CC4.1 ongoing and separate evaluations + CC4.2 evaluates and communicates deficiencies — STD-ERM-001 risk monitoring & KRIs are the ongoing evaluation; KRI threshold breaches are the deficiency-communication trigger."
    evidence_artifact: "KRI dashboards, threshold-alert config, KRI-breach tickets."
  - ucm_id: "CTL-GOV-015"
    regulation_ref: "CC4.1"
    relationship: "partial"
    notes: "FWK-GOV-001 9-dimensional compliance scoring provides a recurring evaluation signal per product. Pair with CTL-AUD-001 for the separate-evaluation component of CC4.1."
    evidence_artifact: "Compliance scorecards, scoring history, per-product trend lines."
  - ucm_id: "CTL-AUD-001"
    regulation_ref: "CC4.1, CC4.2"
    relationship: "direct"
    notes: "STD-GOV-004 internal audit program — annual risk-based audit plan is the classic SOC 2 'separate evaluation'; findings feed CC4.2 deficiency communication."
    evidence_artifact: "Annual audit plan, audit reports, finding register."
  - ucm_id: "CTL-AUD-002"
    regulation_ref: "CC4.2"
    relationship: "direct"
    notes: "Audit finding classification & SLAs operationalize CC4.2 — deficiency severity and remediation time are tracked, not just logged."
    evidence_artifact: "Finding tracker, SLA compliance dashboard."
  - ucm_id: "CTL-AUD-005"
    regulation_ref: "CC4.1"
    relationship: "partial"
    notes: "STD-GOV-005 governance metrics & KRIs are the dashboard layer feeding CC4.1. Pair with CTL-GOV-009 entity-level KRIs for full coverage."
    evidence_artifact: "Governance KRI dashboards, threshold config."
  - ucm_id: "CTL-AUD-007"
    regulation_ref: "CC4.1"
    relationship: "direct"
    notes: "STD-GOV-006 UCM maintenance — this control matrix itself is the master monitoring artifact; gap register + maintenance cadence satisfy CC4.1 at the control-framework level."
    evidence_artifact: "UCM document, gap register, quarterly UCM review minutes."
  # ──────────────────────────────────────────────────────────────────────
  # CC5 — Control Activities
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-003"
    regulation_ref: "CC5.2"
    relationship: "direct"
    notes: "CC5.2 selects and develops general control activities over technology — POL-GOV-001 §Compliance enforces T1/T2/T3 tier application; exception registry tracks every deviation."
    evidence_artifact: "Exception registry, compliance reports, tier-applicability decisions."
  - ucm_id: "CTL-AUD-006"
    regulation_ref: "CC5.3, CC3.4"
    relationship: "direct"
    notes: "STD-GOV-003 policy exception process is the deployed 'through policies and procedures' mechanism for CC5.3, and the controlled-change mechanism for CC3.4."
    evidence_artifact: "Exception registry, approval records, exception expiry tracking."
  - ucm_id: "CTL-POL-004"
    regulation_ref: "CC5.2"
    relationship: "partial"
    notes: "POL-AI-001 AI tool approval registry — domain-specific control-activity instance over emerging AI technology. Pair with CTL-GOV-003 for entity-wide CC5.2 coverage."
    evidence_artifact: "Approved AI tools list, assessment records, approval decisions."
  # ──────────────────────────────────────────────────────────────────────
  # CC6 — Logical and Physical Access Controls
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-003"
    regulation_ref: "CC6.1"
    relationship: "direct"
    notes: "Logical and Physical Access Controls — CC6.1 requires restriction of access to information assets; STD-SEC-003 AuthN-before-access is the implementing control."
    evidence_artifact: "Auth config, login-flow tests, access-review records."
  - ucm_id: "CTL-SEC-004"
    regulation_ref: "CC6.1"
    relationship: "direct"
    notes: "MFA for privileged access — CC6.1 explicit 'privileged access' attribute of logical access. STD-SEC-003 §MFA enforces."
    evidence_artifact: "MFA enrollment records, policy config, privileged-access reports."
  - ucm_id: "CTL-SEC-010"
    regulation_ref: "CC6.2, CC6.3"
    relationship: "direct"
    notes: "RBAC + default DENY — CC6.2 (register/authorize) + CC6.3 (least-privilege) both map to STD-SEC-004 authorization model."
    evidence_artifact: "Role definitions, permission registry, access-certification records."
  - ucm_id: "CTL-SEC-011"
    regulation_ref: "CC6.1"
    relationship: "direct"
    notes: "Tenant isolation (AuthZ layer) extends CC6.1 to the multi-tenant SaaS dimension — STD-SEC-004 §Tenant + STD-DAT-004 together."
    evidence_artifact: "RLS config, cross-tenant test results, tenant-ID provenance checks."
  - ucm_id: "CTL-SEC-012"
    regulation_ref: "CC6.8"
    relationship: "partial"
    notes: "Monitoring of access — CTL-SEC-012 AuthZ audit logging contributes; full CC6.8 compliance also requires STD-OPS-003 T2/T3 observability and STD-GOV-005 KRI tracking."
    evidence_artifact: "Audit log samples, SIEM config, KRI dashboard."
  - ucm_id: "CTL-SEC-014"
    regulation_ref: "CC6.7"
    relationship: "direct"
    notes: "Transmission confidentiality — CC6.7 maps directly to STD-SEC-005 TLS-1.2+ enforcement."
    evidence_artifact: "TLS config, cipher-suite list, SSL Labs scan."
  - ucm_id: "CTL-SEC-016"
    regulation_ref: "CC6.7"
    relationship: "direct"
    notes: "Secrets in approved manager only — CC6.7 transmission-and-storage of protected information requires that secrets not traverse unauthorized channels (code, env, logs)."
    evidence_artifact: "Secret Manager config, code-scan results (gitleaks/truffleHog), secret-rotation logs."
  - ucm_id: "CTL-SEC-022"
    regulation_ref: "CC6.7"
    relationship: "direct"
    notes: "No secrets in code/configs/env/logs — operationalizes CC6.7 at the code-review and CI level."
    evidence_artifact: "Pre-commit hooks, CI scan reports, secret-sprawl audits."
  - ucm_id: "CTL-SEC-036"
    regulation_ref: "CC6.6"
    relationship: "direct"
    notes: "Hardened baselines & patching — CC6.6 requires logical access restrictions through physical-and-logical system security; baselined and patched systems are the substrate."
    evidence_artifact: "CIS benchmark reports, patch records, baseline attestation."
  - ucm_id: "CTL-DAT-015"
    regulation_ref: "CC6.1"
    relationship: "direct"
    notes: "Customer data isolation (multi-tenancy) — the data-plane instantiation of CC6.1 logical-access restriction at the tenant boundary."
    evidence_artifact: "RLS config, cross-tenant test results, tenant-data-exposure test suite."
  # ──────────────────────────────────────────────────────────────────────
  # CC7 — System Operations
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-021"
    regulation_ref: "CC7.1"
    relationship: "partial"
    notes: "System operations — CC7.1 detection of new vulnerabilities; CTL-SEC-021 dependency scanning + CTL-SEC-024/025/026 vulnerability-management pipeline together address the criterion."
    evidence_artifact: "npm audit / Snyk reports, vulnerability register (STD-SEC-006)."
  - ucm_id: "CTL-SEC-024"
    regulation_ref: "CC7.1"
    relationship: "direct"
    notes: "Vulnerability intake & central aggregation — direct mapping for CC7.1 'detects ... for new vulnerabilities'."
    evidence_artifact: "Vulnerability-management tool config, intake queue, triage records."
  - ucm_id: "CTL-SEC-028"
    regulation_ref: "CC7.3"
    relationship: "direct"
    notes: "CC7.3 evaluates security events to determine whether they represent security incidents — STD-SEC-007 detection & triage is the implementing control."
    evidence_artifact: "IR playbooks, SIEM/alert config, triage decision logs."
  - ucm_id: "CTL-SEC-029"
    regulation_ref: "CC7.3, CC7.4"
    relationship: "direct"
    notes: "Incident response lifecycle — CC7.4 responds to identified security incidents; STD-SEC-007 DETECT → CONTAIN → ERADICATE → RECOVER → REVIEW is the lifecycle implementation."
    evidence_artifact: "IR runbooks, incident records, per-incident timeline."
  - ucm_id: "CTL-SEC-032"
    regulation_ref: "CC7.5"
    relationship: "direct"
    notes: "CC7.5 identifies, develops, and implements activities to recover from identified security incidents — STD-SEC-007 §Review post-incident reviews + action items fulfill."
    evidence_artifact: "Postmortem reports, action-item tracker, closure verification."
  - ucm_id: "CTL-OPS-006"
    regulation_ref: "CC7.3"
    relationship: "partial"
    notes: "Operational incident response (STD-OPS-004) addresses the non-security-breach operational-event side of CC7.3 (outages, degradations). Pair with CTL-SEC-028/029 for security incidents."
    evidence_artifact: "Operational incident playbooks, incident records, PIR reports."
  - ucm_id: "CTL-OPS-008"
    regulation_ref: "CC7.2"
    relationship: "direct"
    notes: "CC7.2 monitors system components for anomalies indicative of malicious acts, etc. — structured JSON logging (STD-OPS-003 §Logging) is the foundational CC7.2 signal source."
    evidence_artifact: "Log format config, log-schema review, sample outputs."
  - ucm_id: "CTL-OPS-013"
    regulation_ref: "CC7.2"
    relationship: "direct"
    notes: "Prometheus golden-signal metrics (STD-OPS-003 §Metrics) provide the automated CC7.2 monitoring signal."
    evidence_artifact: "Metric definitions, Grafana/Prometheus config, dashboard screenshots."
  - ucm_id: "CTL-OPS-014"
    regulation_ref: "CC7.3"
    relationship: "partial"
    notes: "Alerting rules with severity routing feed CC7.3 event evaluation. Pair with CTL-SEC-028 for the security-incident classification output."
    evidence_artifact: "Alert rule config, runbook links, severity-routing tests."
  - ucm_id: "CTL-OPS-015"
    regulation_ref: "CC7.2"
    relationship: "direct"
    notes: "Audit log immutability & retention (2yr) — CC7.2 monitoring signal durability; also supports CC4.2 deficiency-evaluation historical review."
    evidence_artifact: "Immutability config, retention policy, sample retrieved-from-archive audit trail."
  - ucm_id: "CTL-SEC-019"
    regulation_ref: "CC7.2"
    relationship: "direct"
    notes: "Input validation (allowlist) — CC7.2 detects anomalous-input conditions through explicit allowlist schemas."
    evidence_artifact: "Zod/JSONSchema validators, validation test results, rejection samples."
  # ──────────────────────────────────────────────────────────────────────
  # CC8 — Change Management
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-ENG-004"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "CC8.1 authorizes, designs, develops, configures, documents, tests, approves, and implements changes — IaC (Terraform) is the 'configures + documents' substrate; every infra change is code-reviewed + applied through audited pipelines."
    evidence_artifact: "Terraform state, plan/apply logs, IaC PR history."
  - ucm_id: "CTL-ENG-007"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "Quality gates in CI/CD (blocking) — CC8.1 'tests' component; STD-ENG-005 mandates coverage/security/lint gates before merge."
    evidence_artifact: "CI pipeline config, gate pass/fail logs, bypass-audit records."
  - ucm_id: "CTL-ENG-010"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "Release/deployment standard (STD-ENG-006) — CC8.1 'approves and implements' component."
    evidence_artifact: "Release checklist, deployment logs, change-tickets per release."
  - ucm_id: "CTL-ENG-011"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "Change management approval workflows (POL-ENG-001) — the entity-level change-control policy satisfying CC8.1 'authorizes'."
    evidence_artifact: "Change records, approval trails, CAB/ARB minutes where applicable."
  - ucm_id: "CTL-ENG-012"
    regulation_ref: "CC8.1"
    relationship: "partial"
    notes: "Emergency change process — CC8.1 must still apply to urgent fixes; POL-ENG-001 §Emergency documents the expedited-but-auditable path. Partial until retrospective loop is closed."
    evidence_artifact: "Emergency change records, post-emergency retrospectives."
  - ucm_id: "CTL-ENG-015"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "Technology stack standard (STD-ENG-009) — CC8.1 'designs' component; stack decisions are governed, not ad-hoc."
    evidence_artifact: "Stack document, technology radar, version matrix."
  - ucm_id: "CTL-GOV-012"
    regulation_ref: "CC8.1"
    relationship: "direct"
    notes: "Technology Radar governance (POL-GOV-002) — ring transitions (ASSESS → TRIAL → ADOPT → HOLD) are the governed-change mechanism for the stack itself."
    evidence_artifact: "Radar document, ADR links for ring changes, quarterly radar review minutes."
  # ──────────────────────────────────────────────────────────────────────
  # CC9 — Risk Mitigation
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-GOV-008"
    regulation_ref: "CC9.1"
    relationship: "direct"
    notes: "CC9.1 identifies, selects, and develops risk-mitigation activities for risks arising from potential business disruptions — STD-ERM-001 §Treatment + acceptance governance."
    evidence_artifact: "Treatment plans, acceptance approvals, risk-treatment register."
  - ucm_id: "CTL-AUD-004"
    regulation_ref: "CC9.1"
    relationship: "direct"
    notes: "Risk acceptance governance (STD-GOV-004) — CC9.1 explicit 'selects' component; executive-level acceptance of residual risk is governed, not implicit."
    evidence_artifact: "Risk-acceptance records, re-review dates, executive sign-offs."
  - ucm_id: "CTL-POL-001"
    regulation_ref: "CC9.2"
    relationship: "direct"
    notes: "CC9.2 assesses and manages risks associated with vendors and business partners — POL-VEN-001 pre-engagement vendor risk assessment."
    evidence_artifact: "Vendor assessment records, risk ratings, pre-engagement checklist."
  - ucm_id: "CTL-POL-002"
    regulation_ref: "CC9.2"
    relationship: "direct"
    notes: "Vendor contractual security clauses (POL-VEN-001) — CC9.2 contractual-control-requirement component; DPA + BAA templates enforce at contract signing."
    evidence_artifact: "Contract templates (TPL-LGL-001, TPL-LGL-002), signed agreements, clause-compliance register."
  - ucm_id: "CTL-POL-003"
    regulation_ref: "CC9.2"
    relationship: "partial"
    notes: "Ongoing vendor monitoring — PLANNED per UCM; required for full CC9.2 coverage once implemented."
    evidence_artifact: "Monitoring schedule, reassessment records, vendor-incident tracking."
---

# SOC 2 Trust Services Criteria — CYBERCUBE UCM crosswalk

**Non-authoritative.** This map is CYBERCUBE's self-assessment against the AICPA Trust Services Criteria (TSC, 2017 criteria with 2022 revised points of focus). A SOC 2 auditor's Report is the authority; this map is a preparation aid for audit engagements and an internal navigation tool.

**Scope of v1.1 (2026-04-22 bulk-pop):** Common Criteria CC1–CC9 are now populated end-to-end (46 rows). The category-specific criteria (Availability A-series, Confidentiality C-series, Processing Integrity PI-series, Privacy P-series) are still pending and added per engagement scope — see "Category-Specific Criteria" below.

## TSC categories

SOC 2 consists of Common Criteria (CC) that apply to all engagements, plus optional category-specific criteria:

| Category | Prefix | In scope by default? |
|----------|--------|----------------------|
| Security (Common Criteria) | CC | **Yes** (every SOC 2 engagement) |
| Availability | A | Per engagement — typical for SaaS/customer-facing |
| Confidentiality | C | Per engagement — typical when handling INTERNAL+ customer data |
| Processing Integrity | PI | Per engagement — typical for transactional systems |
| Privacy | P | Per engagement — add when personal data is in engagement scope |

CYBERCUBE's default SOC 2 engagement scope: Security + Availability + Confidentiality. Processing Integrity and Privacy are added per product engagement.

## Crosswalk — Common Criteria (complete)

### CC1 — Control Environment

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-001 | Standards governance lifecycle | CC1.1 | direct | POL-GOV-001 implements the control-environment commitment. |
| CTL-SEC-001 | Security policy & governance | CC1.1 | direct | STD-SEC-001 policy-of-record. |
| CTL-SEC-002 | Security roles & responsibilities | CC1.2, CC1.3 | direct | RACI + CISO appointment. |
| CTL-SEC-033 | Security training (baseline) | CC1.4 | partial | Pair with CTL-SEC-034 role-based training. |

### CC2 — Communication & Information

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-005 | Semantic versioning & traceability | CC2.2 | direct | Standards registry + changelog. |
| CTL-GOV-011 | Architecture Decision Records (ADRs) | CC2.2 | direct | ADR registry + ARB minutes. |
| CTL-ENG-013 | Documentation & RFC standard | CC2.2 | direct | `rfcs/accepted/*.md`. |
| CTL-SEC-027 | Responsible disclosure (VDP) | CC2.3 | direct | External-party communication channel. |

### CC3 — Risk Assessment

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-006 | Enterprise risk management | CC3.1, CC3.2 | direct | STD-ERM-001 ERM program. |
| CTL-GOV-007 | Risk identification & assessment | CC3.2, CC3.3 | direct | Includes fraud-risk category. |
| CTL-GOV-014 | Product registry & classification (PRCS) | CC3.2 | partial | Product-level PCL risk tiering. |
| CTL-SEC-025 | Vulnerability severity classification | CC3.2 | direct | CVSS + business context. |
| CTL-GOV-004 | Exception & waiver management | CC3.4, CC5.3 | direct | Controlled changes to baseline. |

### CC4 — Monitoring Activities

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-009 | Risk monitoring & KRIs | CC4.1, CC4.2 | direct | KRI breach = deficiency signal. |
| CTL-GOV-015 | CYBERCUBE compliance scoring | CC4.1 | partial | FWK-GOV-001 9-dim recurring eval. |
| CTL-AUD-001 | Internal audit program | CC4.1, CC4.2 | direct | Annual risk-based audit plan. |
| CTL-AUD-002 | Audit finding classification & SLAs | CC4.2 | direct | Finding tracker + SLA dashboard. |
| CTL-AUD-005 | Governance metrics & KRIs | CC4.1 | partial | STD-GOV-005 dashboards. |
| CTL-AUD-007 | UCM maintenance | CC4.1 | direct | This document + gap register. |

### CC5 — Control Activities

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-003 | Compliance levels enforcement | CC5.2 | direct | T1/T2/T3 applicability + exception reg. |
| CTL-AUD-006 | Policy exception & waiver process | CC5.3, CC3.4 | direct | Deployed-through-policies mechanism. |
| CTL-POL-004 | AI tool approval registry | CC5.2 | partial | Emerging-tech control-activity instance. |

### CC6 — Logical and Physical Access Controls

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-003 | AuthN before access | CC6.1 | direct | STD-SEC-003 implementing control. |
| CTL-SEC-004 | MFA for privileged access | CC6.1 | direct | Privileged-access attribute. |
| CTL-SEC-010 | RBAC + default DENY | CC6.2, CC6.3 | direct | STD-SEC-004 authorization model. |
| CTL-SEC-011 | Tenant isolation (AuthZ layer) | CC6.1 | direct | Multi-tenant SaaS extension. |
| CTL-SEC-012 | AuthZ audit logging | CC6.8 | partial | Pair with STD-OPS-003 observability. |
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | CC6.7 | direct | STD-SEC-005 transmission confidentiality. |
| CTL-SEC-016 | Secrets in approved manager only | CC6.7 | direct | Secret Manager config. |
| CTL-SEC-022 | No secrets in code/configs/env/logs | CC6.7 | direct | CI secret-sprawl enforcement. |
| CTL-SEC-036 | Hardened baselines & patching | CC6.6 | direct | CIS benchmark + patch records. |
| CTL-DAT-015 | Customer data isolation (multi-tenancy) | CC6.1 | direct | Data-plane tenant-boundary enforcement. |

### CC7 — System Operations

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-021 | Dependency security | CC7.1 | partial | Pair with STD-SEC-006 pipeline. |
| CTL-SEC-024 | Vulnerability intake & aggregation | CC7.1 | direct | STD-SEC-006 intake queue. |
| CTL-SEC-028 | Security incident detection & triage | CC7.3 | direct | STD-SEC-007 implementing control. |
| CTL-SEC-029 | Incident response lifecycle | CC7.3, CC7.4 | direct | DETECT → CONTAIN → ERADICATE → RECOVER → REVIEW. |
| CTL-SEC-032 | Post-incident review | CC7.5 | direct | Postmortems + action items. |
| CTL-OPS-006 | Operational incident response | CC7.3 | partial | Non-security-breach operational events. |
| CTL-OPS-008 | Structured JSON logging | CC7.2 | direct | CC7.2 signal source. |
| CTL-OPS-013 | Prometheus golden-signal metrics | CC7.2 | direct | Automated monitoring signal. |
| CTL-OPS-014 | Alerting rules with severity routing | CC7.3 | partial | Pair with CTL-SEC-028. |
| CTL-OPS-015 | Audit log immutability & retention (2yr) | CC7.2 | direct | Signal durability. |
| CTL-SEC-019 | Input validation (allowlist) | CC7.2 | direct | Anomalous-input detection. |

### CC8 — Change Management

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-ENG-004 | Infrastructure as Code (Terraform) | CC8.1 | direct | Configures + documents via IaC. |
| CTL-ENG-007 | Quality gates in CI/CD (blocking) | CC8.1 | direct | Tests component. |
| CTL-ENG-010 | Release/deployment standard | CC8.1 | direct | Approves + implements component. |
| CTL-ENG-011 | Change management (approvals) | CC8.1 | direct | Authorizes component. |
| CTL-ENG-012 | Emergency change process | CC8.1 | partial | Post-emergency retrospective loop. |
| CTL-ENG-015 | Technology stack standard | CC8.1 | direct | Designs component. |
| CTL-GOV-012 | Technology Radar governance | CC8.1 | direct | Ring transitions = governed change. |

### CC9 — Risk Mitigation

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-008 | Risk treatment & acceptance | CC9.1 | direct | STD-ERM-001 §Treatment. |
| CTL-AUD-004 | Risk acceptance governance | CC9.1 | direct | Executive-level acceptance path. |
| CTL-POL-001 | Vendor risk assessment (pre-engagement) | CC9.2 | direct | POL-VEN-001. |
| CTL-POL-002 | Vendor contractual security clauses | CC9.2 | direct | DPA + BAA templates. |
| CTL-POL-003 | Ongoing vendor monitoring | CC9.2 | partial | Remediation PLANNED per UCM status. |

### Category-Specific Criteria (A / C / PI / P)

*(pending bulk-population — per-engagement scoping by `sec-lead` + product lead)*

**A-series (Availability)** — typically maps to CTL-OPS-001 (BCP), CTL-OPS-002 (RTO/RPO), CTL-OPS-003 through CTL-OPS-005 (backups + restore testing + integrity), CTL-OPS-007 (SLIs/SLOs), CTL-OPS-016 (service level definitions).

**C-series (Confidentiality)** — typically maps to CTL-SEC-013 (approved crypto), CTL-SEC-017 (envelope encryption), CTL-SEC-018 (encryption at rest), CTL-DAT-008 through CTL-DAT-012 (classification, encryption, masking, retention, deletion).

**PI-series (Processing Integrity)** — typically maps to CTL-ENG-002 (API design + OpenAPI contract), CTL-ENG-003 (webhook HMAC signatures), CTL-ENG-005 (test pyramid), CTL-ENG-006 (coverage thresholds), CTL-ENG-009 (no real customer data in tests).

**P-series (Privacy)** — typically maps to CTL-DAT-001 (privacy policy), CTL-DAT-002 (lawful basis), CTL-DAT-003 (consent management), CTL-DAT-004 (DSAR handling), CTL-DAT-005 (DPIA), CTL-DAT-006 (cookie consent), CTL-DAT-007 (cross-border transfers), CTL-DAT-020 (DPA with processors), CTL-OPS-010 (PII redaction in telemetry).

## How to consume this map

When a CYBERCUBE product enters SOC 2 audit scope:

1. Confirm the engagement's TSC scope (Security minimum; Availability / Confidentiality / PI / Privacy per engagement letter).
2. Reference this file by slug (`soc2`) in the product's PCL row per [5] STD-GOV-001 and scope declaration per [7] STD-GOV-006 T2.
3. Produce the evidence artifacts named in this map's `evidence_artifact` fields — they become the Type 1 (design) or Type 2 (operating-effectiveness over a period) auditor requests.
4. `partial` rows are the seed of the "additional controls" auditor walkthrough — name the paired controls in the management response.
5. Audit findings land in [44] STD-GOV-004's finding register; material gaps produce [8] STD-ERM-001 risk entries.
6. If the engagement adds A / C / PI / P categories, open a ticket with `sec-lead` to populate the relevant rows before audit kickoff; the pointers in "Category-Specific Criteria" above are the starting inventory.

## Ownership, countersign, and draft posture

- **Owner:** `sec-lead` (single, per RFC-0005 §3.1).
- **Status as of `published_map`:** **RATIFIED** — sec-lead 2026-04-22 (single principal covering sec-lead role at current org size).
- **Countersign record:** tracked in commit trailer on the ratification commit (`Countersigned-by: sec-lead (done: 2026-04-22)`). Future row-level changes re-enter DRAFT on edit and require fresh countersign before re-RATIFIED. Per-engagement category-specific additions (A / C / PI / P) are scoped as new DRAFT rows and countersigned when the engagement lands.
- **Review cadence:** annual minimum; on TSC revision (AICPA publishes periodic point-of-focus updates); on material UCM churn.
- **Staleness SLO:** >13 months since `published_map` is a lint finding.

## Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 seed | 2026-04-22 | Standards Council | Initial publication per RFC-0005 §3.2. 7 seed rows spanning CC1, CC6, CC7. Remaining CC sections + A/C/PI/P categories pending bulk population. |
| v1.1    | 2026-04-22 | sec-lead (RFC-0005 follow-on, PYF) | Common-Criteria bulk-population. 7 → 55 rows: CC1 extended (+2 rows), CC2 new (4 rows), CC3 new (5 rows), CC4 new (6 rows), CC5 new (3 rows), CC6 extended (+6 rows), CC7 extended (+10 rows), CC8 new (7 rows), CC9 new (5 rows). Category-specific A/C/PI/P rows still pending per-engagement scoping. Schema-valid per compliance-map.schema.json. |
| v1.1 ratified | 2026-04-22 | sec-lead | Countersign complete for Common-Criteria rows (CC1–CC9). All 55 CC rows move DRAFT → RATIFIED. Category-specific rows (A/C/PI/P) remain per-engagement — added as new DRAFT rows when a product declares that category. |
