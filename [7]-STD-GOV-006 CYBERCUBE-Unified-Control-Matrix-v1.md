# CYBERCUBE Unified Control Matrix (UCM)

| Metadata | Value |
|----------|-------|
| **Standard ID** | STD-GOV-006 |
| **Catalog Number** | 6.4 |
| **Version** | 1.0 |
| **Status** | Active |
| **Owner** | CISO + Compliance Lead |
| **Effective** | 2026-02-16 |
| **Classification** | INTERNAL |
| **Compliance Level** | Mandatory |
| **Next Review** | 2026-Q3 (post SOC 2 Type II audit) |

> **Purpose:** Single-source traceability from every CYBERCUBE control to external regulatory and certification frameworks. Enables coverage gap analysis, overlap detection, and auditor-ready evidence mapping.

**Related Standards:**
- FWK-GOV-001 (1.1) — Framework Compliance (CYBERCUBE scoring)
- STD-GOV-004 (6.1) — Internal Audit & Assurance (uses UCM for audit scoping)
- STD-GOV-005 (6.2) — Metrics/KRIs/Dashboards (UCM feeds compliance KRIs)
- STD-GOV-003 (6.3) — Policy Exception & Waiver (exceptions tracked against UCM)
- STD-ERM-001 (1.3) — ERM Policy (risk register links to UCM controls)

---

## Table of Contents

1. [How to Use This Matrix](#1-how-to-use-this-matrix)
2. [External Framework Key](#2-external-framework-key)
3. [Control Matrix — 1.x Governance](#3-control-matrix--1x-governance)
4. [Control Matrix — 2.x Security](#4-control-matrix--2x-security)
5. [Control Matrix — 3.x Data & Privacy](#5-control-matrix--3x-data--privacy)
6. [Control Matrix — 4.x Operations](#6-control-matrix--4x-operations)
7. [Control Matrix — 5.x Engineering](#7-control-matrix--5x-engineering)
8. [Control Matrix — 6.x Audit & Metrics](#8-control-matrix--6x-audit--metrics)
9. [Control Matrix — 7.x Policies](#9-control-matrix--7x-policies)
10. [Coverage Dashboard](#10-coverage-dashboard)
11. [Gap Register](#11-gap-register)
12. [Maintenance & Governance](#12-maintenance--governance)

---

## 1. How to Use This Matrix

### Control ID Scheme

```
CTL-{DOMAIN}-{SEQ}
```

| Prefix | Domain | CYBERCUBE Catalog |
|--------|--------|-------------------|
| CTL-GOV | Governance | 1.x |
| CTL-SEC | Security | 2.x |
| CTL-DAT | Data & Privacy | 3.x |
| CTL-OPS | Operations | 4.x |
| CTL-ENG | Engineering | 5.x |
| CTL-AUD | Audit & Metrics | 6.x |
| CTL-POL | Policies | 7.x |

### Column Definitions

| Column | Description |
|--------|-------------|
| **Control ID** | Unique, immutable UCM identifier |
| **Control Name** | Human-readable title |
| **CYBERCUBE Policy** | Governing policy document (POL-xxx) |
| **CYBERCUBE Standard** | Implementing standard (STD-xxx) |
| **Catalog §** | Catalog number + section reference |
| **Owner** | Named team or role |
| **ISO 27001:2022** | Annex A control reference |
| **SOC 2 TSC** | Trust Services Criteria reference |
| **NIST CSF 2.0** | Function.Category.Subcategory |
| **GDPR** | Article reference |
| **EU AI Act** | Article reference (where applicable) |
| **PCI DSS 4.0** | Requirement reference (where applicable) |
| **Evidence Artifact** | What the auditor inspects |
| **Impl. Status** | IMPLEMENTED / PARTIAL / PLANNED / GAP |

### Reading the Matrix

- **One row = one CYBERCUBE control.** A control may map to multiple external clauses.
- **Dash (—)** means the external framework has no equivalent requirement.
- **Multiple external refs** are comma-separated.
- **Evidence Artifact** describes the proof object, not a file path.

---

## 2. External Framework Key

| Framework | Edition | Scope | Certification Target |
|-----------|---------|-------|---------------------|
| **ISO 27001** | 2022 (Annex A) | Information security management | 2026-Q4 |
| **SOC 2** | 2017 TSC (AICPA) | Trust services: CC, A, C, PI, P | Type II 2026-Q2 |
| **NIST CSF** | 2.0 (2024) | Cybersecurity framework | Alignment (no cert) |
| **GDPR** | Regulation 2016/679 | EU personal data protection | Active compliance |
| **CCPA/CPRA** | As amended 2023 | California consumer privacy | Active compliance |
| **EU AI Act** | Regulation 2024/1689 | AI system regulation | Active compliance |
| **PCI DSS** | 4.0 | Payment card data security | Where applicable |
| **OWASP** | Top 10 (2021) + LLM Top 10 (2025) | Application security | Alignment |

### SOC 2 TSC Quick Reference

| Code | Criteria |
|------|----------|
| CC1 | Control Environment |
| CC2 | Communication & Information |
| CC3 | Risk Assessment |
| CC4 | Monitoring Activities |
| CC5 | Control Activities |
| CC6 | Logical & Physical Access Controls |
| CC7 | System Operations |
| CC8 | Change Management |
| CC9 | Risk Mitigation |
| A1 | Availability |
| C1 | Confidentiality |
| PI1 | Processing Integrity |
| P1 | Privacy |

---

## 3. Control Matrix — 1.x Governance

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | EU AI Act | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-----------|-------------------|--------|
| CTL-GOV-001 | Standards governance lifecycle | POL-GOV-001 | — | 1.2 §Lifecycle | Standards Council | A.5.1, A.5.2 | CC1.1, CC1.2 | GV.OC-01 | — | — | Standards registry, approval records | IMPLEMENTED |
| CTL-GOV-002 | Standard creation gates | POL-GOV-001 | — | 1.2 §Creation | Standards Council | A.5.1 | CC1.3 | GV.OC-02 | — | — | Proposal templates, rejection records | IMPLEMENTED |
| CTL-GOV-003 | Compliance levels enforcement | POL-GOV-001 | — | 1.2 §Compliance | Standards Council | A.5.36 | CC5.2 | GV.OC-03 | — | — | Exception registry, compliance reports | PARTIAL |
| CTL-GOV-004 | Exception & waiver management | POL-GOV-001 | STD-GOV-003 | 1.2/6.3 | Standards Council | A.5.36 | CC3.4, CC5.3 | GV.RM-07 | — | — | Exception registry, approvals, expiry dates | PARTIAL |
| CTL-GOV-005 | Semantic versioning & traceability | POL-GOV-001 | — | 1.2 §Versioning | Standards Council | A.5.37 | CC2.2 | GV.OC-04 | — | — | Version history, citation records | IMPLEMENTED |
| CTL-GOV-006 | Enterprise risk management program | — | STD-ERM-001 | 1.3 | Executive Leadership | A.5.3 | CC3.1, CC3.2 | GV.RM-01 to -06 | — | Art. 9(1) | Risk register, risk appetite statement | PARTIAL |
| CTL-GOV-007 | Risk identification & assessment | — | STD-ERM-001 | 1.3 §6 | Risk Owners | A.5.3 | CC3.2, CC3.3 | ID.RA-01 to -10 | Art. 32(2) | Art. 9(2) | Risk scoring matrix, assessment records | PARTIAL |
| CTL-GOV-008 | Risk treatment & acceptance | — | STD-ERM-001 | 1.3 §7 | Executive Leadership | A.5.3, A.5.6 | CC3.4, CC9.1 | GV.RM-07 | — | Art. 9(4) | Treatment plans, acceptance approvals | PARTIAL |
| CTL-GOV-009 | Risk monitoring & KRIs | — | STD-ERM-001 | 1.3 §9 | Risk Owners | A.5.3 | CC4.1, CC4.2 | GV.RM-05 | — | Art. 9(3) | KRI dashboards, threshold alerts | PLANNED |
| CTL-GOV-010 | Architecture governance structure | POL-GOV-002 | — | 1.4 §Structure | CTO / ARB | A.5.8 | CC1.1 | GV.OC-01 | — | — | ARB charter, meeting minutes | IMPLEMENTED |
| CTL-GOV-011 | Architecture Decision Records (ADRs) | POL-GOV-002 | — | 1.4 §ADR | CTO / ARB | A.5.8 | CC8.1, CC2.2 | GV.OC-04 | — | — | ADR registry, approval records | IMPLEMENTED |
| CTL-GOV-012 | Technology Radar governance | POL-GOV-002 | STD-ENG-009 | 1.4/5.10 | CTO / ARB | A.5.8 | CC8.1 | GV.SC-07 | — | — | Radar docs, ADR links for ring changes | IMPLEMENTED |
| CTL-GOV-013 | Technical debt management | POL-GOV-002 | — | 1.4 §Debt | Engineering Lead | A.5.8 | CC7.4 | PR.PS-02 | — | — | Debt register, remediation roadmap | PLANNED |
| CTL-GOV-014 | Product registry & classification (PRCS) | — | STD-GOV-001 | 1.5 | CTO / Arch Lead | A.5.9 | CC3.2 | ID.AM-01 | — | Art. 6 | Product records (PRD-xxx), PCL codes | IMPLEMENTED |
| CTL-GOV-015 | CYBERCUBE compliance scoring (9-dim) | FWK-GOV-001 | — | 1.1 | Standards Council | A.5.36 | CC4.1 | GV.OC-03 | — | — | Compliance scorecards per product | PARTIAL |

---

## 4. Control Matrix — 2.x Security

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | EU AI Act | PCI DSS 4.0 | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-----------|-------------|-------------------|--------|
| CTL-SEC-001 | Security policy & governance | STD-SEC-001 | — | 2.1 §Governance | CISO | A.5.1, A.5.2 | CC1.1 | GV.OC-01 | Art. 32 | Art. 15(1) | 12.1 | Approved policy document, review log | IMPLEMENTED |
| CTL-SEC-002 | Security roles & responsibilities | STD-SEC-001 | — | 2.1 §Roles | CISO | A.5.2, A.5.4 | CC1.2, CC1.3 | GV.RR-01 to -04 | Art. 24(1) | — | 12.4 | RACI matrix, role descriptions | IMPLEMENTED |
| CTL-SEC-003 | AuthN before access | STD-SEC-001 | STD-SEC-003 | 2.1/2.3 | Security Team | A.5.15, A.8.5 | CC6.1 | PR.AA-01 | — | — | 8.2, 8.3 | Auth config, login flow tests | PARTIAL |
| CTL-SEC-004 | MFA for privileged access | STD-SEC-001 | STD-SEC-003 | 2.3 §MFA | Security Team | A.8.5 | CC6.1 | PR.AA-02 | — | — | 8.4 | MFA enrollment records, policy config | PARTIAL |
| CTL-SEC-005 | Password policy (NIST 800-63B) | — | STD-SEC-003 | 2.3 §Password | Security Team | A.5.17 | CC6.1 | PR.AA-01 | — | — | 8.3.6 | Password policy config, Argon2id config | PARTIAL |
| CTL-SEC-006 | Session management (server-side) | — | STD-SEC-003 | 2.3 §Sessions | Security Team | A.8.5 | CC6.1 | PR.AA-05 | — | — | 8.6 | Session config, httpOnly/secure flags | PARTIAL |
| CTL-SEC-007 | Token lifecycle (JWT ≤15m, refresh rotation) | — | STD-SEC-003 | 2.3 §Tokens | Security Team | A.8.5 | CC6.1 | PR.AA-05 | — | — | — | Token config, rotation tests | PARTIAL |
| CTL-SEC-008 | Account protection (lockout, rate limiting) | — | STD-SEC-003 | 2.3 §Protection | Security Team | A.8.5 | CC6.1 | PR.AA-03 | — | — | 8.3.4 | Lockout config, rate limit rules | PARTIAL |
| CTL-SEC-009 | OAuth 2.0 + PKCE only (implicit/ROPC forbidden) | — | STD-SEC-003 | 2.3 §Methods | Security Team | A.8.5 | CC6.1 | PR.AA-01 | — | — | — | OAuth config, PKCE enforcement tests | PARTIAL |
| CTL-SEC-010 | RBAC + default DENY | STD-SEC-001 | STD-SEC-004 | 2.4 §Model | Security Team | A.5.15, A.5.18 | CC6.2, CC6.3 | PR.AA-05 | Art. 25 | — | 7.1 | Role definitions, permission registry | PARTIAL |
| CTL-SEC-011 | Tenant isolation (AuthZ layer) | — | STD-SEC-004 | 2.4 §Tenant | Security Team | A.5.15 | CC6.1 | PR.AA-06 | Art. 25, 32 | — | — | RLS config, cross-tenant test results | PARTIAL |
| CTL-SEC-012 | AuthZ audit logging (all decisions) | — | STD-SEC-004 | 2.4 §Audit | Security Team | A.8.15 | CC6.8 | DE.AE-03 | — | Art. 12 | Audit log samples, retention config | PARTIAL |
| CTL-SEC-013 | Approved crypto algorithms only | — | STD-SEC-005 | 2.5 §Algorithms | Security Team | A.8.24 | CC6.1, C1.1 | PR.DS-01 | Art. 32 | Art. 15(3) | Algorithm policy, prohibited list | PARTIAL |
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | — | STD-SEC-005 | 2.5 §TLS | Security Team | A.8.24 | CC6.7 | PR.DS-02 | Art. 32 | — | 4.1 | TLS config, cipher suite list | PARTIAL |
| CTL-SEC-015 | Key management lifecycle | — | STD-SEC-005 | 2.5 §Key Mgmt | Security Team | A.8.24 | CC6.1 | PR.DS-01 | Art. 32 | — | 3.5, 3.6, 3.7 | Key rotation schedules, KMS config | PARTIAL |
| CTL-SEC-016 | Secrets in approved manager only | — | STD-SEC-005 | 2.5 §Secrets | Security Team | A.8.24 | CC6.7 | PR.DS-01 | — | — | — | Secret Manager config, code scan results | PARTIAL |
| CTL-SEC-017 | Envelope encryption (DEK/KEK) | — | STD-SEC-005 | 2.5 §Envelope | Security Team | A.8.24 | C1.1 | PR.DS-01 | Art. 32 | — | 3.5 | Encryption architecture doc, KMS config | PLANNED |
| CTL-SEC-018 | Encryption at rest (INTERNAL+ data) | — | STD-SEC-005 | 2.5 §At Rest | Security Team | A.8.24 | C1.1 | PR.DS-01 | Art. 32(1)(a) | — | 3.4 | DB encryption config, storage encryption | PARTIAL |
| CTL-SEC-019 | Input validation (allowlist-based, all external) | — | STD-SEC-002 | 2.2 §Input | Security Team | A.8.26 | CC7.2 | PR.DS-10 | — | Art. 15(4) | Zod schemas, validation test results | PARTIAL |
| CTL-SEC-020 | Output encoding & injection prevention | — | STD-SEC-002 | 2.2 §Output | Security Team | A.8.26 | CC7.2 | PR.DS-10 | — | — | — | Parameterized query config, encoding tests | PARTIAL |
| CTL-SEC-021 | Dependency security (lock files, vuln scanning) | — | STD-SEC-002 | 2.2 §Deps | Security Team | A.8.28 | CC7.1 | PR.DS-08 | — | — | 6.3 | npm audit / Snyk reports, lock files | PARTIAL |
| CTL-SEC-022 | No secrets in code/configs/env/logs | — | STD-SEC-002 | 2.2 §Secrets | Security Team | A.8.24, A.8.28 | CC6.7 | PR.DS-01 | — | — | — | gitleaks/truffleHog scan results | PARTIAL |
| CTL-SEC-023 | Error handling (fail-secure, no stack traces) | — | STD-SEC-002 | 2.2 §Errors | Security Team | A.8.26 | CC7.2 | PR.DS-10 | — | — | — | Error response samples, config | PARTIAL |
| CTL-SEC-024 | Vulnerability intake & central aggregation | — | STD-SEC-006 | 2.6 §Sources | Security Team | A.8.8 | CC7.1 | ID.RA-01 | — | Art. 15(4) | Vuln management tool config | PARTIAL |
| CTL-SEC-025 | Vulnerability severity classification (CVSS + context) | — | STD-SEC-006 | 2.6 §Severity | Security Team | A.8.8 | CC3.2 | ID.RA-04 | — | — | Severity classification records | PARTIAL |
| CTL-SEC-026 | Remediation SLAs (Critical 24h / High 7d) | — | STD-SEC-006 | 2.6 §SLAs | Security Team | A.8.8 | CC7.4 | RS.MI-02 | — | Art. 15(4) | SLA compliance dashboard | PLANNED |
| CTL-SEC-027 | Responsible disclosure (VDP) | — | STD-SEC-006 | 2.6 §Disclosure | Security Team | A.5.5, A.5.6 | CC2.3 | RS.CO-01 | — | — | VDP page, acknowledgment records | PLANNED |
| CTL-SEC-028 | Security incident detection & triage | STD-SEC-001 | STD-SEC-007 | 2.7 §Detect/Triage | Security Team | A.5.24, A.5.25 | CC7.3 | DE.AE-02, RS.AN-03 | Art. 33 | Art. 15(5) | IR playbooks, SIEM/alert config | PARTIAL |
| CTL-SEC-029 | Incident response lifecycle (DETECT → REVIEW) | — | STD-SEC-007 | 2.7 §Lifecycle | Security Team | A.5.24-A.5.28 | CC7.3, CC7.4 | RS.MA-01 to -05 | Art. 33, 34 | — | IR runbooks, incident records | PARTIAL |
| CTL-SEC-030 | Evidence handling & forensics | — | STD-SEC-007 | 2.7 §Evidence | Security Team | A.5.28 | CC7.3 | RS.AN-06 | Art. 33(3) | — | Chain of custody logs, forensic images | PLANNED |
| CTL-SEC-031 | Breach notification (≤72h GDPR) | — | STD-SEC-007 | 2.7 §Notification | Security Team + Legal | A.5.26 | CC7.4 | RS.CO-02, RS.CO-03 | Art. 33, 34 | — | Notification templates, timeline records | PLANNED |
| CTL-SEC-032 | Post-incident review | — | STD-SEC-007 | 2.7 §Review | Security Team | A.5.27 | CC7.5 | RC.RP-05 | — | — | Postmortem reports, action item tracker | PLANNED |
| CTL-SEC-033 | Security training (baseline, all personnel) | — | STD-SEC-008 | 2.8 §Baseline | Security + HR | A.6.3 | CC1.4 | GV.AT-01, GV.AT-02 | Art. 39 | Art. 4(1) | LMS completion records, assessment scores | PLANNED |
| CTL-SEC-034 | Role-based security training | — | STD-SEC-008 | 2.8 §Role-Based | Security + HR | A.6.3 | CC1.4 | GV.AT-01 | — | Art. 4(1) | Training matrix, role assignments | PLANNED |
| CTL-SEC-035 | Phishing simulation program | — | STD-SEC-008 | 2.8 §Phishing | Security Team | A.6.3 | CC1.4 | GV.AT-02 | — | — | Phishing test results, click-rate reports | PLANNED |
| CTL-SEC-036 | Hardened baselines & patching | STD-SEC-001 | — | 2.1 §System Security | Engineering | A.8.9 | CC6.6, CC7.1 | PR.PS-01 | Art. 32 | — | 6.3 | CIS benchmark reports, patch records | PARTIAL |

---

## 5. Control Matrix — 3.x Data & Privacy

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | CCPA/CPRA | EU AI Act | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-----------|-----------|-------------------|--------|
| CTL-DAT-001 | Privacy policy (public) | POL-PRI-001 | — | 3.1 | Executive / Privacy | A.5.34 | P1.1 | GV.OC-02 | Art. 12, 13, 14 | §1798.100(b) | Art. 13 | Published privacy policy, review log | IMPLEMENTED |
| CTL-DAT-002 | Lawful basis documentation | POL-PRI-002 | — | 3.1/3.2 | Privacy Lead | A.5.34 | P1.1 | GV.OC-02 | Art. 6 | — | — | ROPA, lawful basis records | PARTIAL |
| CTL-DAT-003 | Consent management (opt-in, revocable) | POL-PRI-002 | — | 3.2 §Consent | Privacy Lead | A.5.34 | P1.1 | GV.OC-02 | Art. 7 | §1798.120 | — | Consent records, withdrawal mechanism | PARTIAL |
| CTL-DAT-004 | DSAR handling (30/45-day SLA) | POL-PRI-002 | — | 3.2 §DSAR | Privacy Lead | A.5.34 | P1.1 | GV.OC-02 | Art. 12-23 | §1798.105-110 | — | DSAR log, response time metrics | PARTIAL |
| CTL-DAT-005 | Data Protection Impact Assessment (DPIA) | POL-PRI-002 | — | 3.2 §DPIA | Privacy Lead | A.5.34, A.5.35 | P1.2 | GV.RM-01 | Art. 35 | — | Art. 9 | DPIA records, risk assessments | PLANNED |
| CTL-DAT-006 | Cookie & tracking consent | POL-PRI-001 | POL-PRI-002 | 3.1/3.2 §Cookies | Privacy Lead | — | P1.1 | — | Art. 6(1)(a) | §1798.120 | — | Consent banner config, cookie inventory | PARTIAL |
| CTL-DAT-007 | Cross-border transfer safeguards | POL-PRI-001 | POL-PRI-002 | 3.1/3.2 §Transfers | Privacy + Legal | A.5.34 | P1.1 | — | Art. 44-49 | — | — | SCCs, TIA records | PLANNED |
| CTL-DAT-008 | Data classification at creation | — | STD-DAT-001 | 3.3 §Classification | Security / Data Protection | A.5.12, A.5.13 | C1.1 | ID.AM-07 | Art. 5(1)(f) | — | — | Classification labels, handling rules | PARTIAL |
| CTL-DAT-009 | Encryption by classification level | — | STD-DAT-001 | 3.3 §Encryption | Security Team | A.8.24 | C1.1 | PR.DS-01 | Art. 32(1)(a) | — | — | Encryption config per level (CON+: AES-256) | PARTIAL |
| CTL-DAT-010 | PII masking in logs/displays | — | STD-DAT-001 | 3.3 §Masking | Security Team | A.8.11 | C1.1 | PR.DS-10 | Art. 25(1) | — | — | Log samples, redaction rules | PARTIAL |
| CTL-DAT-011 | Retention schedules per category | — | STD-DAT-001 | 3.3 §Retention | Security / Legal | A.5.33 | C1.2 | PR.DS-11 | Art. 5(1)(e) | §1798.105 | — | Retention schedule document | PARTIAL |
| CTL-DAT-012 | Secure deletion (CON/RST) | — | STD-DAT-001 | 3.3 §Deletion | Security Team | A.8.10 | C1.2 | PR.DS-11 | Art. 17 | §1798.105 | — | Deletion procedures, verification certs | PLANNED |
| CTL-DAT-013 | Legal hold (suspends all deletion) | — | STD-LGL-001 | 3.7 | Legal Counsel | A.5.33 | C1.2 | — | Art. 17(3) | — | — | Hold notices, release approvals | PLANNED |
| CTL-DAT-014 | Data inventory & ownership | — | STD-DAT-001 | 3.3 §Ownership | Data Protection | A.5.9, A.5.12 | P1.2 | ID.AM-01 to -05 | Art. 30 | §1798.100 | Art. 10 | Data inventory, category owners | PARTIAL |
| CTL-DAT-015 | Customer data isolation (multi-tenancy) | — | STD-DAT-004 | 3.4 | Platform Eng / Security | A.5.15 | CC6.1 | PR.AA-06 | Art. 25, 32 | — | — | RLS config, cross-tenant test results | PARTIAL |
| CTL-DAT-016 | Tenant ID from auth token only | — | STD-DAT-004 | 3.4 §Tenant ID | Platform Engineering | A.5.15 | CC6.1 | PR.AA-06 | Art. 25 | — | — | Middleware config, code review records | PARTIAL |
| CTL-DAT-017 | RLS on all tenant-scoped tables | — | STD-DAT-004 | 3.4 §Data Layer | Platform Engineering | A.5.15 | CC6.1 | PR.AA-06 | Art. 32 | — | — | RLS audit report, DB schema review | PARTIAL |
| CTL-DAT-018 | Cross-tenant exposure = SEV-1 | — | STD-DAT-004 | 3.4 §Incident | Security Team | A.5.24 | CC7.3 | RS.AN-03 | Art. 33, 34 | — | — | IR classification rules, SEV-1 config | PARTIAL |
| CTL-DAT-019 | Soft-delete lifecycle (ACTIVE→DELETED→PURGED) | — | STD-DAT-002 | 3.5 | Engineering | A.8.10 | CC7.2 | PR.DS-11 | Art. 17 | §1798.105 | — | Lifecycle config, grace period settings | PARTIAL |
| CTL-DAT-020 | DPA with all processors | POL-PRI-002 | TPL-LGL-001 | 3.2/3.6 | Legal / Privacy | A.5.20 | P1.1 | GV.SC-06 | Art. 28 | — | — | Signed DPAs, processor register | PARTIAL |
| CTL-DAT-021 | Records management lifecycle | POL-REC-001 | — | 3.8 | Legal + Operations | A.5.33 | C1.2 | PR.DS-11 | Art. 5(1)(e) | — | — | Retention schedules, destruction certs | PARTIAL |
| CTL-DAT-022 | Vital records protection | POL-REC-001 | — | 3.8 §Vital | Legal / Operations | A.5.33 | A1.2 | PR.DS-11 | — | — | — | Vital records inventory, DR location | PLANNED |

---

## 6. Control Matrix — 4.x Operations

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-------------------|--------|
| CTL-OPS-001 | Business continuity plan | — | BCP (4.1) | 4.1 | Executive Leadership | A.5.29, A.5.30 | A1.1, A1.2 | RC.RP-01 to -05 | Art. 32(1)(b) | BCP document, DR test results | PARTIAL |
| CTL-OPS-002 | RTO/RPO per system tier | — | BCP (4.1) | 4.1 §Tiers | SRE | A.5.29 | A1.2 | RC.RP-02 | — | Tier classification, RTO/RPO matrix | PARTIAL |
| CTL-OPS-003 | Automated backups with retention | — | STD-OPS-002 | 4.2 | SRE | A.8.13 | A1.2 | PR.DS-11 | Art. 32(1)(c) | Backup schedules, retention configs | PARTIAL |
| CTL-OPS-004 | Backup restore testing | — | STD-OPS-002 | 4.2 §Testing | SRE | A.8.13 | A1.2 | RC.RP-04 | — | Restore test logs, recovery time records | PLANNED |
| CTL-OPS-005 | Backup integrity verification | — | STD-OPS-002 | 4.2 §Verification | SRE | A.8.13 | A1.2 | PR.DS-06 | — | Checksum verification logs | PLANNED |
| CTL-OPS-006 | Operational incident response | — | STD-OPS-004 | 4.3 | SRE | A.5.24 | CC7.3 | RS.MA-01 | — | Incident playbooks, incident records | PARTIAL |
| CTL-OPS-007 | Platform reliability (SLIs/SLOs) | — | SRE (4.4) | 4.4 | SRE | A.5.23 | A1.1 | DE.CM-09 | — | SLO definitions, error budget policy | PARTIAL |
| CTL-OPS-008 | Structured JSON logging | — | STD-OPS-003 | 4.5 §Logging | SRE | A.8.15 | CC7.2 | DE.AE-03 | — | Log format config, sample outputs | PARTIAL |
| CTL-OPS-009 | Log level standardization | — | STD-OPS-003 | 4.5 §Levels | SRE | A.8.15 | CC7.2 | DE.AE-03 | — | Log level matrix, production config | PARTIAL |
| CTL-OPS-010 | PII redaction in telemetry | — | STD-OPS-003 | 4.5 §Redaction | SRE | A.8.11 | P1.1 | PR.DS-10 | Art. 25(1) | Redaction pipeline config, test results | PARTIAL |
| CTL-OPS-011 | Correlation IDs (request, trace, span) | — | STD-OPS-003 | 4.5 §Correlation | SRE | A.8.15 | CC7.2 | DE.AE-02 | — | Propagation config, W3C trace context | PARTIAL |
| CTL-OPS-012 | Distributed tracing (OpenTelemetry) | — | STD-OPS-003 | 4.5 §Tracing | SRE | A.8.15 | CC7.2 | DE.AE-06 | — | OTel config, sampling rules | PLANNED |
| CTL-OPS-013 | Prometheus metrics (golden signals) | — | STD-OPS-003 | 4.5 §Metrics | SRE | A.8.16 | CC7.2 | DE.CM-09 | — | Metric definitions, dashboard screenshots | PARTIAL |
| CTL-OPS-014 | Alerting rules with severity routing | — | STD-OPS-003 | 4.5 §Alerting | SRE | A.8.16 | CC7.3 | DE.AE-08 | — | Alert rule config, runbook links | PLANNED |
| CTL-OPS-015 | Audit log immutability & retention (2yr) | — | STD-OPS-003 | 4.5 §Audit | SRE | A.8.15 | CC7.2 | DE.AE-03 | Art. 5(2) | Immutability config, retention policy | PARTIAL |
| CTL-OPS-016 | Service level definitions | — | STD-SLP-001 | 4.6 | SRE / Product | A.5.23 | A1.1 | GV.OC-05 | — | SLA documents, measurement methodology | PARTIAL |

---

## 7. Control Matrix — 5.x Engineering

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-------------------|--------|
| CTL-ENG-001 | CC-PID identifier standard | — | STD-ENG-001 | 5.1 | Engineering | A.5.9 | CC7.2 | ID.AM-01 | — | Identifier registry, entity codes | IMPLEMENTED |
| CTL-ENG-002 | API design (REST, OpenAPI, versioning) | — | STD-ENG-002 | 5.2 | Engineering | A.8.26 | CC7.2, PI1.2 | PR.DS-10 | — | OpenAPI specs, API review records | PARTIAL |
| CTL-ENG-003 | Webhook security (signatures, retry, HMAC) | — | STD-ENG-003 | 5.3 | Engineering | A.8.26 | CC7.2 | PR.DS-02 | — | Webhook config, signature verification | PARTIAL |
| CTL-ENG-004 | Infrastructure as Code (Terraform) | — | STD-ENG-004 | 5.4 | Engineering / SRE | A.8.9 | CC8.1 | PR.PS-01 | — | Terraform state, plan/apply logs | PARTIAL |
| CTL-ENG-005 | Test pyramid (70/25/5 unit/integ/e2e) | — | STD-ENG-005 | 5.5 §Pyramid | Engineering | A.8.25 | CC7.1 | PR.DS-08 | — | Coverage reports, test run logs | PARTIAL |
| CTL-ENG-006 | Coverage thresholds (80/70/60 by tier) | — | STD-ENG-005 | 5.5 §Coverage | Engineering | A.8.25 | CC7.1 | PR.DS-08 | — | Codecov reports, CI gate config | PLANNED |
| CTL-ENG-007 | Quality gates in CI/CD (blocking) | — | STD-ENG-005 | 5.5 §Gates | Engineering | A.8.25, A.8.32 | CC8.1 | PR.DS-08 | — | CI pipeline config, gate pass/fail logs | PARTIAL |
| CTL-ENG-008 | Security scanning in CI (SAST, SCA, secrets) | — | STD-ENG-005 | 5.5 §Security | Security Team | A.8.28 | CC7.1 | PR.DS-08, DE.CM-06 | — | Scan reports, blocking rules | PARTIAL |
| CTL-ENG-009 | No real customer data in tests | — | STD-ENG-005 | 5.5 §Prohibited | Engineering | A.8.11 | P1.1 | PR.DS-10 | Art. 25 | Test data factory code, safe data config | PARTIAL |
| CTL-ENG-010 | Release/deployment standard | — | STD-ENG-006 | 5.6 | Engineering | A.8.32 | CC8.1 | PR.PS-04 | — | Release checklist, deployment logs | PARTIAL |
| CTL-ENG-011 | Change management (approval workflows) | POL-ENG-001 | — | 5.7 | Engineering | A.8.32 | CC8.1 | PR.PS-04 | — | Change records, approval trails | PARTIAL |
| CTL-ENG-012 | Emergency change process | POL-ENG-001 | — | 5.7 §Emergency | Engineering | A.8.32 | CC8.1 | RS.MI-01 | — | Emergency change records, retrospectives | PLANNED |
| CTL-ENG-013 | Documentation & RFC standard | — | STD-ENG-007 | 5.8 | Engineering | A.5.37 | CC2.2 | GV.OC-04 | — | RFC index, doc review records | IMPLEMENTED |
| CTL-ENG-014 | Reusable module registry | — | STD-ENG-008 | 5.9 | Architecture Team | A.5.8 | CC7.2 | PR.PS-02 | — | modules.json, ICD contracts | IMPLEMENTED |
| CTL-ENG-015 | Technology stack standard | — | STD-ENG-009 | 5.10 | Engineering Lead | A.5.8 | CC8.1 | GV.SC-07 | — | Stack document, radar, version matrix | IMPLEMENTED |

---

## 8. Control Matrix — 6.x Audit & Metrics

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-------------------|--------|
| CTL-AUD-001 | Internal audit program (risk-based) | — | STD-GOV-004 | 6.1 | Audit Lead | A.5.35, A.5.36 | CC4.1, CC4.2 | GV.OC-03 | Art. 5(2) | Annual audit plan, audit reports | PLANNED |
| CTL-AUD-002 | Audit finding classification & SLAs | — | STD-GOV-004 | 6.1 §Findings | Audit Lead | A.5.36 | CC4.2 | GV.OC-03 | — | Finding tracker, SLA compliance | PLANNED |
| CTL-AUD-003 | Corrective Action Plans (CAPs) | — | STD-GOV-004 | 6.1 §CAPs | Control Owners | A.5.36 | CC4.2 | RS.IM-01 | — | CAP records, closure verification | PLANNED |
| CTL-AUD-004 | Risk acceptance governance | — | STD-GOV-004 | 6.1 §Acceptance | Executive Leadership | A.5.3, A.5.6 | CC3.4, CC9.1 | GV.RM-07 | — | Acceptance records, re-review dates | PLANNED |
| CTL-AUD-005 | Governance metrics & KRIs | — | STD-GOV-005 | 6.2 | Governance Function | A.5.36 | CC4.1 | GV.OC-05 | — | KRI dashboards, threshold config | PLANNED |
| CTL-AUD-006 | Policy exception & waiver process | — | STD-GOV-003 | 6.3 | Governance Function | A.5.36 | CC5.3, CC3.4 | GV.RM-07 | — | Exception registry, approval records | PARTIAL |
| CTL-AUD-007 | Unified Control Matrix maintenance | — | STD-GOV-006 | 6.4 | CISO + Compliance | A.5.36 | CC4.1 | GV.OC-03 | Art. 5(2) | This document, gap register | IMPLEMENTED |

---

## 9. Control Matrix — 7.x Policies

| Control ID | Control Name | CYBERCUBE Policy | CYBERCUBE Standard | Catalog § | Owner | ISO 27001:2022 | SOC 2 TSC | NIST CSF 2.0 | GDPR | EU AI Act | Evidence Artifact | Status |
|------------|-------------|-----------------|-------------------|-----------|-------|---------------|-----------|-------------|------|-----------|-------------------|--------|
| CTL-POL-001 | Vendor risk assessment (pre-engagement) | POL-VEN-001 | — | 7.1 | Security + Legal | A.5.19, A.5.20 | CC9.2 | GV.SC-03, GV.SC-06 | Art. 28 | — | Vendor assessment records, risk ratings | PARTIAL |
| CTL-POL-002 | Vendor contractual security clauses | POL-VEN-001 | — | 7.1 §Contracts | Legal | A.5.20 | CC9.2 | GV.SC-06 | Art. 28 | — | Contract templates, signed agreements | PARTIAL |
| CTL-POL-003 | Ongoing vendor monitoring | POL-VEN-001 | — | 7.1 §Monitoring | Security | A.5.22 | CC9.2 | GV.SC-10 | Art. 28(3)(h) | — | Monitoring schedule, reassessment records | PLANNED |
| CTL-POL-004 | AI tool approval registry | POL-AI-001 | — | 7.2 §2 | AI Governance Committee | — | CC5.2, CC6.7 | GV.OC-02 | — | Art. 6, 52 | Approved tools list, assessment records | PARTIAL |
| CTL-POL-005 | AI data restrictions (NEVER list) | POL-AI-001 | — | 7.2 §3 | AI Governance Committee | A.5.12, A.8.11 | C1.1, P1.1 | PR.DS-10 | Art. 5(1)(c) | Art. 10 | Data classification × AI tool matrix | PARTIAL |
| CTL-POL-006 | Human-in-the-loop (HITL) requirements | POL-AI-001 | — | 7.2 §6 | AI Governance Committee | — | CC5.2, PI1.5 | — | Art. 22 | Art. 14 | HITL review records, output approvals | PLANNED |
| CTL-POL-007 | AI ethics review process | POL-AI-001 | — | 7.2 §7 | AI Ethics Review | — | — | GV.OC-02 | — | Art. 9, 69 | Ethics review records, bias assessments | PLANNED |
| CTL-POL-008 | AI-specific incident response | POL-AI-001 | — | 7.2 §8 | Security + AI Committee | — | CC7.3 | RS.MA-01 | — | Art. 62 | AI incident playbooks, containment records | PLANNED |
| CTL-POL-009 | AI IP & output accountability | POL-AI-001 | — | 7.2 §5 | Legal | — | — | — | — | Art. 52 | IP policy, AI disclosure records | PARTIAL |
| CTL-POL-010 | Acceptable use policy (all personnel) | POL-AUP-001 | — | 7.3 | Director of Engineering | A.5.10 | CC1.4 | GV.AT-01 | — | — | Signed AUP acknowledgments | PARTIAL |

---

## 10. Coverage Dashboard

### Framework Coverage Summary

| External Framework | Total Controls Mapped | Covered (IMPL+PARTIAL) | Gaps (PLANNED+GAP) | Coverage % |
|-------------------|----------------------|----------------------|-------------------|-----------|
| **ISO 27001:2022** | 93 Annex A controls | ~65 mapped | ~28 not mapped | ~70% |
| **SOC 2 TSC** | 64 criteria | ~55 mapped | ~9 not mapped | ~86% |
| **NIST CSF 2.0** | 106 subcategories | ~60 mapped | ~46 not mapped | ~57% |
| **GDPR** | ~50 operative articles | ~35 mapped | ~15 not mapped | ~70% |
| **EU AI Act** | ~20 relevant articles | ~12 mapped | ~8 not mapped | ~60% |
| **PCI DSS 4.0** | ~12 applicable reqs | ~8 mapped | ~4 not mapped | ~67% |

> **Note:** Percentages approximate. Full gap analysis pending per GAP-xxx items below.

### Implementation Status Summary

| Status | Count | % |
|--------|-------|---|
| IMPLEMENTED | 18 | 17% |
| PARTIAL | 60 | 57% |
| PLANNED | 24 | 23% |
| GAP | 3 | 3% |
| **Total Controls** | **105** | — |

---

## 11. Gap Register

| Gap ID | Description | Affected Frameworks | Risk Level | Remediation Target | Owner |
|--------|-------------|--------------------|-----------|--------------------|-------|
| GAP-001 | No physical security controls documented | ISO A.7.x (14 controls), SOC 2 CC6.4 | Medium | 2026-Q3 | Facilities / Security |
| GAP-002 | No formal supplier/cloud security assessment template | ISO A.5.21-A.5.23, SOC 2 CC9.2 | High | 2026-Q2 | Security + Procurement |
| GAP-003 | No human resources security lifecycle (screening, termination) | ISO A.6.1-A.6.5, SOC 2 CC1.4 | Medium | 2026-Q3 | HR + Security |
| GAP-004 | NIST CSF Recovery (RC) domain weakly covered | NIST RC.RP-01 to -06 | Medium | 2026-Q3 | SRE |
| GAP-005 | EU AI Act Art. 6 high-risk classification process not formalized | EU AI Act Art. 6-7, 9 | High | 2026-Q2 | AI Governance Committee |
| GAP-006 | No DAST in CI/CD pipeline (only SAST/SCA) | OWASP, STD-ENG-005 §9, STD-SEC-006 | Medium | 2026-Q2 | Security + Engineering |
| GAP-007 | Audit program not yet operational | ISO A.5.35-36, SOC 2 CC4.x | Critical | 2026-Q2 | Audit Lead |
| GAP-008 | OpenTelemetry distributed tracing not deployed | STD-OPS-003 §4, NIST DE.AE-06 | Medium | 2026-Q3 | SRE |
| GAP-009 | Security training program not launched | ISO A.6.3, SOC 2 CC1.4, STD-SEC-008 | High | 2026-Q2 | Security + HR |
| GAP-010 | No PCI DSS formal scope definition | PCI DSS scope requirements | Low | 2026-Q3 (if applicable) | Security + Finance |

---

## 12. Maintenance & Governance

### Review Cadence

| Trigger | Action | Responsible |
|---------|--------|-------------|
| **Quarterly** | Full matrix review, update status, refresh coverage % | CISO + Compliance Lead |
| **New standard published** | Add controls, map to frameworks, update gaps | Standard Owner + Compliance |
| **External framework update** | Re-map affected controls, flag new gaps | Compliance Lead |
| **Post-audit** | Incorporate findings, update status, close gaps | Audit Lead |
| **Pre-certification** | Validate all mapped controls, prepare evidence | CISO + External Auditor |
| **Material incident** | Assess control failure, update FMEA/gaps | Security Team |

### Evidence Collection Protocol

| Artifact Type | Collection Method | Storage | Retention |
|--------------|------------------|---------|-----------|
| Policy documents | Version-controlled (Git) | Standards repository | Permanent |
| Configuration evidence | Screenshots + exports, timestamped | Compliance drive | 3 years |
| Test results | CI/CD artifacts, automated export | Artifact registry | 3 years |
| Approval records | Signed forms / tracked decisions | Compliance drive | 5 years |
| Audit reports | Final PDFs | Compliance drive | 5 years |
| Training records | LMS export | HR system | Employment + 7 years |
| Incident records | IR system export | IR system | Per STD-SEC-007 |

### Control Lifecycle

```
PROPOSED → APPROVED → IMPLEMENTING → PARTIAL → IMPLEMENTED → VERIFIED (by audit)
                                                     ↑              │
                                                     └── REMEDIATION ←┘ (if finding)
```

### Accountability

| Role | Responsibility |
|------|---------------|
| **CISO** | UCM ownership, overall compliance posture, gap prioritization |
| **Compliance Lead** | Matrix maintenance, framework mapping accuracy, evidence coordination |
| **Standard Owners** | Control implementation, status updates, evidence provision |
| **Audit Lead** | Independent verification, finding linkage to UCM controls |
| **Executive Leadership** | Gap remediation funding, risk acceptance for open gaps |

---

## Appendix A: Framework Cross-Reference Index

### ISO 27001:2022 Annex A → UCM

| ISO Control | UCM Control(s) | Status |
|-------------|---------------|--------|
| A.5.1 Policies for information security | CTL-SEC-001, CTL-GOV-001 | IMPL |
| A.5.2 Information security roles | CTL-SEC-002 | IMPL |
| A.5.3 Segregation of duties | CTL-GOV-006, CTL-GOV-008 | PARTIAL |
| A.5.4 Management responsibilities | CTL-SEC-002 | IMPL |
| A.5.5 Contact with authorities | CTL-SEC-027 | PLANNED |
| A.5.6 Contact with special interest groups | CTL-GOV-008, CTL-SEC-027 | PLANNED |
| A.5.8 Information security in project mgmt | CTL-GOV-010, CTL-GOV-014 | IMPL |
| A.5.9 Inventory of information assets | CTL-GOV-014, CTL-DAT-014 | PARTIAL |
| A.5.10 Acceptable use | CTL-POL-010 | PARTIAL |
| A.5.12 Classification of information | CTL-DAT-008, CTL-POL-005 | PARTIAL |
| A.5.13 Labelling of information | CTL-DAT-008 | PARTIAL |
| A.5.15 Access control | CTL-SEC-003, CTL-SEC-010, CTL-DAT-015 | PARTIAL |
| A.5.17 Authentication information | CTL-SEC-005 | PARTIAL |
| A.5.18 Access rights | CTL-SEC-010 | PARTIAL |
| A.5.19 Infosec in supplier relationships | CTL-POL-001 | PARTIAL |
| A.5.20 Addressing infosec in supplier agreements | CTL-POL-002 | PARTIAL |
| A.5.22 Monitoring of supplier services | CTL-POL-003 | PLANNED |
| A.5.23 Infosec for use of cloud services | CTL-OPS-007, CTL-OPS-016 | PARTIAL |
| A.5.24 Incident mgmt planning | CTL-SEC-028, CTL-OPS-006 | PARTIAL |
| A.5.25 Assessment of infosec events | CTL-SEC-028 | PARTIAL |
| A.5.26 Response to infosec incidents | CTL-SEC-031 | PLANNED |
| A.5.27 Learning from infosec incidents | CTL-SEC-032 | PLANNED |
| A.5.28 Collection of evidence | CTL-SEC-030 | PLANNED |
| A.5.29 Infosec during disruption | CTL-OPS-001 | PARTIAL |
| A.5.30 ICT readiness for business continuity | CTL-OPS-001, CTL-OPS-002 | PARTIAL |
| A.5.33 Protection of records | CTL-DAT-011, CTL-DAT-021 | PARTIAL |
| A.5.34 Privacy and PII protection | CTL-DAT-001 to -007 | PARTIAL |
| A.5.35 Independent review of infosec | CTL-AUD-001 | PLANNED |
| A.5.36 Compliance with policies/standards | CTL-GOV-003, CTL-GOV-015, CTL-AUD-001 | PARTIAL |
| A.5.37 Documented operating procedures | CTL-GOV-005, CTL-ENG-013 | IMPL |
| A.6.1-6.5 Personnel security | — | **GAP-003** |
| A.6.3 Awareness/education/training | CTL-SEC-033, CTL-SEC-034, CTL-SEC-035 | PLANNED |
| A.7.x Physical controls | — | **GAP-001** |
| A.8.5 Secure authentication | CTL-SEC-003 to -009 | PARTIAL |
| A.8.8 Management of technical vulns | CTL-SEC-024 to -027 | PARTIAL |
| A.8.9 Configuration management | CTL-SEC-036, CTL-ENG-004 | PARTIAL |
| A.8.10 Information deletion | CTL-DAT-012, CTL-DAT-019 | PARTIAL |
| A.8.11 Data masking | CTL-DAT-010, CTL-OPS-010, CTL-ENG-009 | PARTIAL |
| A.8.13 Information backup | CTL-OPS-003, CTL-OPS-004, CTL-OPS-005 | PARTIAL |
| A.8.15 Logging | CTL-OPS-008 to -011, CTL-SEC-012, CTL-OPS-015 | PARTIAL |
| A.8.16 Monitoring activities | CTL-OPS-013, CTL-OPS-014 | PARTIAL |
| A.8.24 Use of cryptography | CTL-SEC-013 to -018 | PARTIAL |
| A.8.25 Secure development lifecycle | CTL-ENG-005 to -008 | PARTIAL |
| A.8.26 Application security requirements | CTL-SEC-019, CTL-SEC-020, CTL-ENG-002 | PARTIAL |
| A.8.28 Secure coding | CTL-SEC-021, CTL-SEC-022 | PARTIAL |
| A.8.32 Change management | CTL-ENG-010, CTL-ENG-011, CTL-ENG-012 | PARTIAL |

### SOC 2 TSC → UCM (Top-Level Mapping)

| SOC 2 Criteria | UCM Controls | Coverage |
|---------------|-------------|----------|
| CC1 Control Environment | CTL-GOV-001, -002, CTL-SEC-001, -002, -033, -034, CTL-POL-010 | PARTIAL |
| CC2 Communication & Info | CTL-GOV-005, CTL-ENG-013, CTL-SEC-027 | PARTIAL |
| CC3 Risk Assessment | CTL-GOV-006 to -009, CTL-SEC-025, CTL-AUD-004 | PARTIAL |
| CC4 Monitoring | CTL-GOV-015, CTL-AUD-001, -005, -007 | PLANNED |
| CC5 Control Activities | CTL-GOV-003, CTL-POL-004, -006, CTL-AUD-006 | PARTIAL |
| CC6 Logical & Physical Access | CTL-SEC-003 to -012, CTL-DAT-015 to -017 | PARTIAL |
| CC7 System Operations | CTL-SEC-019 to -023, CTL-OPS-006 to -016, CTL-ENG-005 to -007 | PARTIAL |
| CC8 Change Management | CTL-ENG-010 to -012, CTL-GOV-011, -012 | PARTIAL |
| CC9 Risk Mitigation | CTL-GOV-008, CTL-POL-001 to -003 | PARTIAL |
| A1 Availability | CTL-OPS-001 to -005, CTL-OPS-016, CTL-DAT-022 | PARTIAL |
| C1 Confidentiality | CTL-SEC-013 to -018, CTL-DAT-008 to -010, CTL-POL-005 | PARTIAL |
| PI1 Processing Integrity | CTL-ENG-002, CTL-POL-006 | PARTIAL |
| P1 Privacy | CTL-DAT-001 to -007, CTL-DAT-020, CTL-OPS-010, CTL-ENG-009 | PARTIAL |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-16 | — | Initial UCM with 105 controls across 7 domains; ISO 27001, SOC 2, NIST CSF, GDPR, EU AI Act, PCI DSS mappings |
