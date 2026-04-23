---
regulation:
  id: "pci-dss-4.0"
  name: "Payment Card Industry Data Security Standard"
  version: "4.0"
  authority: "PCI SSC"
  effective: "2024-03-31"
  published_map: "2026-04-22"
  owner: "sec-lead"
  authoritative: false
rows:
  # ──────────────────────────────────────────────────────────────────────
  # Req 1 — Install and maintain network security controls
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-ENG-004"
    regulation_ref: "1.2, 1.3"
    relationship: "partial"
    notes: "Infrastructure-as-Code (Terraform) is the CYBERCUBE substrate for network-security-control configuration (NSCs): VPC layout, security groups, routing, peering. PCI 1.2 (NSC config standards) and 1.3 (restrict connections to/from the CDE) are satisfied when the CDE's Terraform module enforces explicit ingress/egress allowlists. Pair with per-product network diagrams and DFDs (PCI 1.2.4 requirement not in UCM)."
    evidence_artifact: "Terraform state for CDE modules, plan/apply logs, reviewed network diagram, DFD per CDE product."
  - ucm_id: "CTL-SEC-011"
    regulation_ref: "1.3.1"
    relationship: "adjacent"
    notes: "Tenant-isolation (AuthZ layer) is not a PCI network-segmentation primitive on its own, but it is the application-plane counterpart that reduces lateral exposure of CHD when a CDE service is multi-tenant. Auditor context only; not evidence of Req 1."
    evidence_artifact: "RLS config, cross-tenant test results."
  # ──────────────────────────────────────────────────────────────────────
  # Req 2 — Apply secure configurations to all system components
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-036"
    regulation_ref: "2.2"
    relationship: "direct"
    notes: "Hardened baselines & patching — PCI 2.2 requires system-component configuration standards that address all known security vulnerabilities. STD-SEC-001 §System Security enforces CIS benchmarks + patch SLAs."
    evidence_artifact: "CIS benchmark reports, patch records, baseline-drift alerts."
  - ucm_id: "CTL-SEC-022"
    regulation_ref: "2.2.2"
    relationship: "direct"
    notes: "No secrets in code/configs/env/logs — PCI 2.2.2 prohibits vendor default passwords / credentials in system components. CTL-SEC-022 + STD-SEC-002 §Secrets enforce via CI scans + Secret Manager."
    evidence_artifact: "gitleaks/truffleHog scan results, Secret Manager audit log, default-credential change records."
  - ucm_id: "CTL-ENG-015"
    regulation_ref: "2.2.1"
    relationship: "partial"
    notes: "Technology stack standard (STD-ENG-009) governs which system-component types are approved. Complement to CIS hardening — removes classes of insecure defaults at the technology-selection gate."
    evidence_artifact: "Stack document, technology radar, version matrix."
  # ──────────────────────────────────────────────────────────────────────
  # Req 3 — Protect stored account data
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-018"
    regulation_ref: "3.5.1"
    relationship: "direct"
    notes: "Encryption at rest for PAN — STD-SEC-005 requires encryption of all RESTRICTED-class data at rest. PAN is RESTRICTED per STD-DAT-001; Req 3.5.1 is satisfied by AES-256 at the storage layer."
    evidence_artifact: "DB-encryption config, storage-encryption attestation, KMS audit log."
  - ucm_id: "CTL-SEC-017"
    regulation_ref: "3.6, 3.7"
    relationship: "direct"
    notes: "Envelope encryption (DEK/KEK) — PCI 3.6 (protection of cryptographic keys used to encrypt stored account data) + 3.7 (key-management lifecycle processes) are both structural requirements satisfied by the DEK/KEK architecture documented in STD-SEC-005."
    evidence_artifact: "Encryption architecture doc, KMS config, key-hierarchy diagram."
  - ucm_id: "CTL-SEC-015"
    regulation_ref: "3.6.1, 3.7.1, 3.7.4"
    relationship: "direct"
    notes: "Key management lifecycle — generation, storage, distribution, usage, change, retirement, and destruction of keys protecting stored CHD. STD-SEC-005 §Key Management operationalizes."
    evidence_artifact: "Key rotation schedules, KMS config, key-retirement attestation."
  - ucm_id: "CTL-DAT-008"
    regulation_ref: "3.2.1"
    relationship: "partial"
    notes: "Data classification at creation — CHD must be labeled so encryption/retention/masking policies apply. STD-DAT-001 classification is the upstream control; the PCI-specific data-flow inventory (PCI 3.2.1 requirement to know where CHD is stored, processed, transmitted) is additional."
    evidence_artifact: "Classification labels, CHD data-flow diagram."
  - ucm_id: "CTL-DAT-010"
    regulation_ref: "3.3, 3.3.1"
    relationship: "direct"
    notes: "PAN masking in logs/displays — STD-DAT-001 PII masking applies to PAN. PCI 3.3 requires PAN masking when displayed; 3.3.1 restricts full PAN display to those with a business need."
    evidence_artifact: "Log samples, display-masking config, PAN-truncation rules."
  - ucm_id: "CTL-DAT-011"
    regulation_ref: "3.2.1"
    relationship: "direct"
    notes: "Retention schedules per category — PCI 3.2.1 requires CHD retention be limited to legal/regulatory/business need; STD-DAT-001 §Retention + STD-DAT-002 soft-delete lifecycle implement."
    evidence_artifact: "Retention schedule, deletion-purge attestation per CHD class."
  # ──────────────────────────────────────────────────────────────────────
  # Req 4 — Protect cardholder data with strong cryptography during transmission
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-014"
    regulation_ref: "4.2.1"
    relationship: "direct"
    notes: "TLS 1.2+ with forward secrecy — STD-SEC-005 approved-algorithms list. PCI 4.2.1 requires strong cryptography on networks transmitting CHD, with tested certificate management."
    evidence_artifact: "TLS config, cipher-suite list, SSL Labs scan output, certificate rotation log."
  - ucm_id: "CTL-SEC-013"
    regulation_ref: "4.2.1"
    relationship: "direct"
    notes: "Approved crypto algorithms only — the allowlist/denylist layer that backs CTL-SEC-014. Prohibited-protocol enforcement (SSL/TLS ≤1.1, weak cipher suites) lives here."
    evidence_artifact: "Algorithm policy, prohibited-protocols list, enforcement-test results."
  # ──────────────────────────────────────────────────────────────────────
  # Req 5 — Protect all systems/networks from malicious software
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-036"
    regulation_ref: "5.2, 5.3"
    relationship: "partial"
    notes: "Anti-malware is not explicitly a CYBERCUBE UCM row (endpoint EDR on corporate devices is typically the answer; the platform layer is container-image hardening). STD-SEC-001 §System Security + CIS baselines cover the platform-component side; full Req 5 compliance requires a corporate endpoint-protection program distinct from this UCM."
    evidence_artifact: "CIS benchmark reports, container-image scan results, corporate EDR policy (out of UCM)."
  # ──────────────────────────────────────────────────────────────────────
  # Req 6 — Develop and maintain secure systems and software
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-021"
    regulation_ref: "6.3.3"
    relationship: "direct"
    notes: "Dependency security / lock files + vulnerability scanning — PCI 6.3.3 requires system components be protected from known vulnerabilities via patches/updates. STD-SEC-002 + CI dep-scanning implement."
    evidence_artifact: "npm audit / Snyk reports, lock files, vulnerability register (STD-SEC-006)."
  - ucm_id: "CTL-SEC-024"
    regulation_ref: "6.3.1"
    relationship: "direct"
    notes: "Vulnerability intake & central aggregation — PCI 6.3.1 requires identification of new vulnerabilities using reputable sources + risk ranking. STD-SEC-006 intake pipeline implements."
    evidence_artifact: "Vulnerability-management tool config, intake queue, risk-ranking rationale."
  - ucm_id: "CTL-SEC-025"
    regulation_ref: "6.3.1"
    relationship: "direct"
    notes: "Vulnerability severity classification (CVSS + business context) — the risk-ranking output required by PCI 6.3.1."
    evidence_artifact: "Severity classification records, CVSS scoring rationale, business-context overrides."
  - ucm_id: "CTL-SEC-026"
    regulation_ref: "6.3.3"
    relationship: "direct"
    notes: "Remediation SLAs (Critical 24h / High 7d) — PCI 6.3.3 requires critical / high-risk vulnerabilities be addressed within 1 month of release; STD-SEC-006 SLAs are stricter."
    evidence_artifact: "SLA compliance dashboard, per-vuln remediation timeline."
  - ucm_id: "CTL-ENG-005"
    regulation_ref: "6.2.1"
    relationship: "partial"
    notes: "Test pyramid (70/25/5) — PCI 6.2.1 requires bespoke/custom software be developed securely, which includes testing. STD-ENG-005 pyramid is one input; secure-coding review (PCI 6.2.3) is a separate process concern."
    evidence_artifact: "Coverage reports, test run logs."
  - ucm_id: "CTL-ENG-007"
    regulation_ref: "6.2.2"
    relationship: "direct"
    notes: "Quality gates in CI/CD (blocking) — PCI 6.2.2 requires secure-coding training + review for custom software; blocking CI gates operationalize the 'review' (SAST/SCA must pass)."
    evidence_artifact: "CI pipeline config, gate pass/fail logs, bypass-audit records."
  - ucm_id: "CTL-ENG-008"
    regulation_ref: "6.2.3, 6.2.4"
    relationship: "direct"
    notes: "Security scanning in CI (SAST, SCA, secrets) — PCI 6.2.3 (vulnerabilities reviewed) + 6.2.4 (common attacks — injection, XSS, access-control flaws) are both signaled by automated scanning."
    evidence_artifact: "SAST scan reports, SCA reports, secret-scan results, blocking-rule config."
  - ucm_id: "CTL-SEC-019"
    regulation_ref: "6.2.4"
    relationship: "direct"
    notes: "Input validation (allowlist-based) — PCI 6.2.4 explicitly calls out injection-attack prevention. Zod/JSONSchema allowlists are the implementing control."
    evidence_artifact: "Zod/JSONSchema validators, validation-test results, injection-test suite."
  - ucm_id: "CTL-SEC-020"
    regulation_ref: "6.2.4"
    relationship: "direct"
    notes: "Output encoding & injection prevention — PCI 6.2.4 XSS / template-injection coverage; parameterized queries cover SQLi."
    evidence_artifact: "Parameterized-query enforcement, template-auto-escaping config, encoding tests."
  - ucm_id: "CTL-SEC-023"
    regulation_ref: "6.2.4"
    relationship: "partial"
    notes: "Error handling (fail-secure, no stack traces) — information-disclosure prevention flank of PCI 6.2.4."
    evidence_artifact: "Error-response samples, prod error-handler config."
  - ucm_id: "CTL-ENG-011"
    regulation_ref: "6.5.1, 6.5.2"
    relationship: "direct"
    notes: "Change management (approval workflows) — PCI 6.5.1 (impact analysis) + 6.5.2 (documented change-approval). POL-ENG-001 implements."
    evidence_artifact: "Change records, approval trails, impact-analysis artifacts."
  - ucm_id: "CTL-ENG-004"
    regulation_ref: "6.5.3"
    relationship: "direct"
    notes: "Separation of test/production environments — enforced via distinct Terraform workspaces + distinct cloud accounts. PCI 6.5.3 requires logical/network separation."
    evidence_artifact: "Terraform workspace config, cloud-account inventory, cross-env access-log review."
  # ──────────────────────────────────────────────────────────────────────
  # Req 7 — Restrict access by business need-to-know
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-010"
    regulation_ref: "7.1, 7.2, 7.3"
    relationship: "direct"
    notes: "RBAC + default DENY — PCI Req 7 is the least-privilege requirement family: 7.1 (process), 7.2 (role-based + default deny), 7.3 (automated access-control system)."
    evidence_artifact: "Role definitions, permission registry, access-certification records, default-deny verification."
  - ucm_id: "CTL-SEC-011"
    regulation_ref: "7.2.5"
    relationship: "partial"
    notes: "Tenant isolation (AuthZ layer) — PCI 7.2.5 requires access be restricted to only the minimum necessary. Tenant-boundary enforcement at the application plane is the SaaS-specific instance."
    evidence_artifact: "RLS config, cross-tenant test results."
  # ──────────────────────────────────────────────────────────────────────
  # Req 8 — Identify users and authenticate access
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-003"
    regulation_ref: "8.2, 8.3"
    relationship: "partial"
    notes: "STD-SEC-003 AuthN-before-access implements PCI 8.2/8.3 identifier-uniqueness and authentication-in-place at the application layer. Full compliance also requires network-segment controls (PCI 1.x) and logging (PCI 10.x)."
    evidence_artifact: "Auth config, login-flow tests, identity-provider attestation."
  - ucm_id: "CTL-SEC-004"
    regulation_ref: "8.4, 8.5"
    relationship: "direct"
    notes: "MFA for privileged access — PCI 8.4 (MFA for all non-console access to the CDE + remote access from outside the entity's network) + 8.5 (MFA systems configured to prevent replay, etc.). STD-SEC-003 T3 satisfies when CDE scope is declared."
    evidence_artifact: "MFA enrollment records, MFA-policy config, replay-prevention verification, CDE-scope access-log review."
  - ucm_id: "CTL-SEC-005"
    regulation_ref: "8.3.6, 8.3.8"
    relationship: "direct"
    notes: "Password policy (NIST 800-63B) — PCI 8.3.6 (min length + complexity) + 8.3.8 (rotation if password-only). STD-SEC-003 enforces NIST-aligned policy."
    evidence_artifact: "Password policy config, Argon2id config, enforcement tests."
  - ucm_id: "CTL-SEC-006"
    regulation_ref: "8.6"
    relationship: "direct"
    notes: "Session management (server-side) — PCI 8.6 covers re-authentication on session idle, secure session handling, and application-/system-account usage."
    evidence_artifact: "Session-timeout config, httpOnly/Secure flags, server-side session storage."
  - ucm_id: "CTL-SEC-007"
    regulation_ref: "8.3.9"
    relationship: "partial"
    notes: "Token lifecycle (JWT ≤15m, refresh rotation) — short-lived tokens reduce replay/theft window. PCI 8.3.9 lifecycle obligations for account-types partly satisfied; full compliance also needs account-audit cadence (PCI 8.2.4)."
    evidence_artifact: "Token lifetime config, refresh-rotation tests."
  - ucm_id: "CTL-SEC-008"
    regulation_ref: "8.3.4"
    relationship: "direct"
    notes: "Account protection (lockout, rate limiting) — PCI 8.3.4 requires lockout after ≤10 invalid attempts + minimum 30-minute lockout duration."
    evidence_artifact: "Lockout config, rate-limit rules, login-failure-response tests."
  - ucm_id: "CTL-SEC-009"
    regulation_ref: "8.6"
    relationship: "partial"
    notes: "OAuth 2.0 + PKCE only — PCI 8.6 authentication-mechanism requirements partly satisfied by prohibiting insecure flows (implicit, ROPC)."
    evidence_artifact: "OAuth config, PKCE enforcement tests, prohibited-flow rejection tests."
  # ──────────────────────────────────────────────────────────────────────
  # Req 9 — Restrict physical access to cardholder data
  # ──────────────────────────────────────────────────────────────────────
  # (Cloud-inherited — see "Req 9" body section for cloud-provider-responsibility note)
  # ──────────────────────────────────────────────────────────────────────
  # Req 10 — Log and monitor all access
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-012"
    regulation_ref: "10.2.1, 10.2.2"
    relationship: "direct"
    notes: "AuthZ audit logging (all decisions) — PCI 10.2.1 (all individual user access to CHD) + 10.2.2 (all actions taken by privileged users). STD-SEC-004 §Audit implements."
    evidence_artifact: "Audit log samples, retention config, access-to-CHD log subset."
  - ucm_id: "CTL-OPS-008"
    regulation_ref: "10.2"
    relationship: "direct"
    notes: "Structured JSON logging — the substrate making PCI 10.2 event-content requirements machine-verifiable (user, event type, timestamp, success/fail, origin, affected resource)."
    evidence_artifact: "Log format config, log-schema review, sample outputs."
  - ucm_id: "CTL-OPS-009"
    regulation_ref: "10.2"
    relationship: "partial"
    notes: "Log-level standardization — supports 10.2 by ensuring security-relevant events aren't drowned by DEBUG chatter."
    evidence_artifact: "Log-level matrix, production config."
  - ucm_id: "CTL-OPS-011"
    regulation_ref: "10.2.2"
    relationship: "partial"
    notes: "Correlation IDs (request, trace, span) — enable audit-trail reconstruction for PCI 10.2.2 privileged-action forensics."
    evidence_artifact: "Trace-propagation config, W3C trace-context samples."
  - ucm_id: "CTL-OPS-015"
    regulation_ref: "10.5.1, 10.5.2"
    relationship: "direct"
    notes: "Audit log immutability & retention (2yr) — PCI 10.5.1 (immutability + integrity) + 10.5.2 (1-year retention, 90 days immediately available). STD-OPS-003 T3 exceeds PCI retention minimum."
    evidence_artifact: "Immutability config, retention-policy attestation, sample retrieved-from-archive trail."
  - ucm_id: "CTL-OPS-014"
    regulation_ref: "10.4.1"
    relationship: "partial"
    notes: "Alerting rules with severity routing — PCI 10.4.1 requires review of audit logs at least daily; automated alerts reduce the manual-review scope to exceptions."
    evidence_artifact: "Alert-rule config, runbook links, daily-review-exception records."
  - ucm_id: "CTL-SEC-028"
    regulation_ref: "10.7.1, 10.7.2, 10.7.3"
    relationship: "direct"
    notes: "Security incident detection & triage — PCI 10.7 failure-detection requirements (failures of critical security control systems) map to STD-SEC-007 detection + triage."
    evidence_artifact: "IR playbooks, SIEM/alert config, control-failure-detection tests."
  # ──────────────────────────────────────────────────────────────────────
  # Req 11 — Test security of systems and networks regularly
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-ENG-008"
    regulation_ref: "11.3.1, 11.3.2"
    relationship: "partial"
    notes: "Security scanning in CI covers internal-software vulnerability scanning; PCI 11.3.1 (internal vuln scans) + 11.3.2 (external ASV scans) require additional QSA/ASV-coordinated scanning programs."
    evidence_artifact: "CI SAST/SCA reports; QSA/ASV scan reports (out of UCM)."
  - ucm_id: "CTL-SEC-024"
    regulation_ref: "11.3"
    relationship: "partial"
    notes: "Vulnerability intake — aggregates findings from multiple PCI 11.3 scan types into one queue for triage."
    evidence_artifact: "Vulnerability-management tool config, intake queue."
  - ucm_id: "CTL-ENG-005"
    regulation_ref: "11.4"
    relationship: "adjacent"
    notes: "Test pyramid is about software quality + security-regression catching; PCI 11.4 penetration testing is a separate engagement. Adjacent context only — auditor should expect a pentest report distinct from test-pyramid evidence."
    evidence_artifact: "Annual pentest report (out of UCM)."
  # ──────────────────────────────────────────────────────────────────────
  # Req 12 — Information security policy and program
  # ──────────────────────────────────────────────────────────────────────
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "12.1"
    relationship: "direct"
    notes: "Overall information-security policy — STD-SEC-001 is the policy-of-record; PCI 12.1 requires annual review and version-controlled change history."
    evidence_artifact: "Approved STD-SEC-001 document, annual review log, version history."
  - ucm_id: "CTL-GOV-001"
    regulation_ref: "12.1.1"
    relationship: "direct"
    notes: "Standards governance lifecycle (POL-GOV-001) — PCI 12.1.1 requires formal governance for security-policy maintenance."
    evidence_artifact: "Standards registry, approval records, governance-meeting minutes."
  - ucm_id: "CTL-SEC-002"
    regulation_ref: "12.4.1, 12.4.2"
    relationship: "direct"
    notes: "Security roles & responsibilities — PCI 12.4.1 (formally defined responsibilities) + 12.4.2 (executive-level accountability). STD-SEC-001 §Roles RACI + CISO appointment implement."
    evidence_artifact: "Security RACI matrix, CISO appointment record."
  - ucm_id: "CTL-SEC-033"
    regulation_ref: "12.6.1"
    relationship: "direct"
    notes: "Security training (baseline, all personnel) — PCI 12.6.1 upon hire + annually."
    evidence_artifact: "LMS completion records, assessment scores, annual-refresh attestation."
  - ucm_id: "CTL-SEC-034"
    regulation_ref: "12.6.2, 12.6.3"
    relationship: "direct"
    notes: "Role-based security training — PCI 12.6.2 covers role-specific content; 12.6.3 covers phishing/social-engineering awareness (pair with CTL-SEC-035)."
    evidence_artifact: "Training matrix, role-assignment records, content-audit log."
  - ucm_id: "CTL-SEC-035"
    regulation_ref: "12.6.3"
    relationship: "direct"
    notes: "Phishing simulation program — PCI 12.6.3 explicit phishing/social-engineering awareness component."
    evidence_artifact: "Phishing-test results, click-rate reports, remediation-training assignments."
  - ucm_id: "CTL-SEC-029"
    regulation_ref: "12.10.1"
    relationship: "direct"
    notes: "Incident response lifecycle (STD-SEC-007) — PCI 12.10.1 requires a documented IR plan covering detection, response, containment, eradication, recovery, and post-incident review."
    evidence_artifact: "IR runbooks, incident records, IR-plan annual-review log."
  - ucm_id: "CTL-SEC-031"
    regulation_ref: "12.10.2"
    relationship: "direct"
    notes: "Breach notification — PCI 12.10.2 includes notification of appropriate entities on CHD breach (card brands, acquiring banks). STD-SEC-007 §Notification implements."
    evidence_artifact: "Notification templates, card-brand-contact list, past-notification timeline records."
  - ucm_id: "CTL-SEC-032"
    regulation_ref: "12.10.6"
    relationship: "direct"
    notes: "Post-incident review — PCI 12.10.6 requires lessons-learned / IR-plan modification after each incident."
    evidence_artifact: "Postmortem reports, IR-plan-change records triggered by incidents."
  - ucm_id: "CTL-POL-001"
    regulation_ref: "12.8.1, 12.8.2"
    relationship: "direct"
    notes: "Vendor risk assessment (pre-engagement) — PCI 12.8.1 (TPSP inventory) + 12.8.2 (written agreements acknowledging PCI DSS responsibility)."
    evidence_artifact: "Vendor assessment records, TPSP inventory, risk ratings."
  - ucm_id: "CTL-POL-002"
    regulation_ref: "12.8.2, 12.8.5"
    relationship: "direct"
    notes: "Vendor contractual security clauses — PCI 12.8.2 (written agreements) + 12.8.5 (documented description of which PCI requirements are managed by which party)."
    evidence_artifact: "Contract templates, signed agreements, PCI-responsibility-matrix per TPSP."
  - ucm_id: "CTL-POL-003"
    regulation_ref: "12.8.4"
    relationship: "partial"
    notes: "Ongoing vendor monitoring — PCI 12.8.4 annual monitoring of TPSP compliance posture. STD-POL-003 is PLANNED per UCM; required for full Req 12.8 coverage."
    evidence_artifact: "Monitoring schedule, annual-reassessment records."
---

# PCI DSS 4.0 — CYBERCUBE UCM crosswalk

**Non-authoritative.** This is CYBERCUBE's self-assessment. The PCI DSS v4.0 standard text is the authority. This map is a navigation aid for products declaring CDE (Cardholder Data Environment) scope — it does not constitute a Report on Compliance (RoC), Self-Assessment Questionnaire (SAQ), or Attestation of Compliance (AoC).

**Scope of v1.1 (2026-04-22 bulk-pop):** 5 seed rows → 46 rows covering Req 1–12 at the CYBERCUBE-platform layer. Req 9 (physical access) is cloud-provider-inherited for managed CYBERCUBE products and is documented as a provider-responsibility section rather than individual UCM rows. Req 5 (anti-malware) is partially covered by CIS-baselined containers; corporate endpoint EDR is out of UCM scope.

## CDE scope preliminaries

Before consuming this map, the product team MUST:

1. **Define CDE scope.** Network segmentation, data flows (DFD), and system-component inventory per PCI 12.5.2.
2. **Declare in the PCL row** per [5] STD-GOV-001 — reference this file by slug (`pci-dss-4.0`).
3. **Adopt the shared-responsibility split** with the underlying cloud provider (AWS/GCP/Azure). Req 9 and parts of Req 1 are cloud-inherited; record the split in the product's audit-evidence pack per [44] STD-GOV-004 T3.
4. **Apply [7] STD-GOV-006 T2 scope declaration** — T2/T3 mandates for any CDE-scoped product.

## Crosswalk — PCI DSS 4.0 requirements

### Req 1 — Install and maintain network security controls

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-ENG-004 | Infrastructure as Code (Terraform) | 1.2, 1.3 | partial | NSC config via IaC; pair with DFD per PCI 1.2.4. |
| CTL-SEC-011 | Tenant isolation (AuthZ layer) | 1.3.1 | adjacent | App-plane lateral-exposure reducer; auditor context only. |

### Req 2 — Apply secure configurations

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-036 | Hardened baselines & patching | 2.2 | direct | CIS benchmarks + patch SLAs. |
| CTL-SEC-022 | No secrets in code/configs/env/logs | 2.2.2 | direct | Prohibits vendor defaults. |
| CTL-ENG-015 | Technology stack standard | 2.2.1 | partial | Removes insecure-defaults classes at tech-selection gate. |

### Req 3 — Protect stored account data

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-018 | Encryption at rest | 3.5.1 | direct | AES-256 on RESTRICTED-class PAN storage. |
| CTL-SEC-017 | Envelope encryption (DEK/KEK) | 3.6, 3.7 | direct | Key-hierarchy protection. |
| CTL-SEC-015 | Key management lifecycle | 3.6.1, 3.7.1, 3.7.4 | direct | Generate / store / rotate / retire / destroy. |
| CTL-DAT-008 | Data classification at creation | 3.2.1 | partial | Pair with CHD data-flow inventory. |
| CTL-DAT-010 | PII masking in logs/displays | 3.3, 3.3.1 | direct | PAN masking when displayed. |
| CTL-DAT-011 | Retention schedules per category | 3.2.1 | direct | CHD retention limited to business need. |

### Req 4 — Transmission cryptography

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | 4.2.1 | direct | STD-SEC-005 approved algorithms. |
| CTL-SEC-013 | Approved crypto algorithms only | 4.2.1 | direct | Prohibited-protocol enforcement. |

### Req 5 — Protect systems from malicious software

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-036 | Hardened baselines & patching | 5.2, 5.3 | partial | Platform-component side; corporate EDR is out of UCM. |

### Req 6 — Develop and maintain secure systems and software

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-021 | Dependency security | 6.3.3 | direct | Lock files + vuln scanning. |
| CTL-SEC-024 | Vulnerability intake | 6.3.1 | direct | Reputable-source identification. |
| CTL-SEC-025 | Vulnerability severity classification | 6.3.1 | direct | Risk-ranking output. |
| CTL-SEC-026 | Remediation SLAs (Critical 24h / High 7d) | 6.3.3 | direct | Stricter than PCI 1-month. |
| CTL-ENG-005 | Test pyramid | 6.2.1 | partial | Pair with secure-coding review process. |
| CTL-ENG-007 | Quality gates in CI/CD | 6.2.2 | direct | Automated review. |
| CTL-ENG-008 | Security scanning (SAST/SCA/secrets) | 6.2.3, 6.2.4 | direct | Injection / XSS / access-control coverage. |
| CTL-SEC-019 | Input validation (allowlist) | 6.2.4 | direct | Injection prevention. |
| CTL-SEC-020 | Output encoding | 6.2.4 | direct | XSS / template-injection / SQLi (via param queries). |
| CTL-SEC-023 | Error handling | 6.2.4 | partial | Information-disclosure flank. |
| CTL-ENG-011 | Change management (approvals) | 6.5.1, 6.5.2 | direct | Impact analysis + approval. |
| CTL-ENG-004 | Infrastructure as Code | 6.5.3 | direct | Test/prod separation via workspaces + accounts. |

### Req 7 — Restrict access by need-to-know

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-010 | RBAC + default DENY | 7.1, 7.2, 7.3 | direct | Least-privilege family. |
| CTL-SEC-011 | Tenant isolation (AuthZ layer) | 7.2.5 | partial | SaaS-specific minimum-access instance. |

### Req 8 — Identify users and authenticate access

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-003 | AuthN before access | 8.2, 8.3 | partial | App-layer auth; pair with 1.x/10.x. |
| CTL-SEC-004 | MFA for privileged access | 8.4, 8.5 | direct | CDE-scope MFA enforcement. |
| CTL-SEC-005 | Password policy (NIST 800-63B) | 8.3.6, 8.3.8 | direct | Min length + rotation if password-only. |
| CTL-SEC-006 | Session management (server-side) | 8.6 | direct | Re-auth on idle + secure sessions. |
| CTL-SEC-007 | Token lifecycle | 8.3.9 | partial | Pair with account-audit cadence (8.2.4). |
| CTL-SEC-008 | Account protection (lockout, rate limit) | 8.3.4 | direct | ≤10 attempts + ≥30m lockout. |
| CTL-SEC-009 | OAuth 2.0 + PKCE only | 8.6 | partial | Prohibits insecure flows. |

### Req 9 — Restrict physical access

*Cloud-inherited.* For CYBERCUBE products running on managed cloud infrastructure (AWS/GCP/Azure), PCI Req 9 is a cloud-provider-responsibility item and is satisfied by the provider's own PCI DSS AoC. The CYBERCUBE product team MUST:

1. Reference the cloud provider's current PCI AoC in the audit-evidence pack.
2. Record the shared-responsibility split per CTL-POL-002 (vendor contractual clauses) in the product's [44] STD-GOV-004 T3 evidence pack.
3. For any on-premises or colocated component (rare), open a separate ticket with `sec-lead` to scope Req 9 physical controls explicitly — this map does not cover that case.

### Req 10 — Log and monitor

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-012 | AuthZ audit logging | 10.2.1, 10.2.2 | direct | User access + privileged actions. |
| CTL-OPS-008 | Structured JSON logging | 10.2 | direct | Event-content substrate. |
| CTL-OPS-009 | Log-level standardization | 10.2 | partial | Signal/noise separation. |
| CTL-OPS-011 | Correlation IDs | 10.2.2 | partial | Forensic trail reconstruction. |
| CTL-OPS-015 | Audit log immutability & retention (2yr) | 10.5.1, 10.5.2 | direct | Exceeds PCI 1-year minimum. |
| CTL-OPS-014 | Alerting rules with severity routing | 10.4.1 | partial | Daily-review scope reduction. |
| CTL-SEC-028 | Security incident detection & triage | 10.7.1, 10.7.2, 10.7.3 | direct | Control-failure detection. |

### Req 11 — Test security regularly

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-ENG-008 | Security scanning in CI | 11.3.1, 11.3.2 | partial | Internal; pair with ASV scans (out of UCM). |
| CTL-SEC-024 | Vulnerability intake | 11.3 | partial | Queue for all Req 11 scan outputs. |
| CTL-ENG-005 | Test pyramid | 11.4 | adjacent | Not a substitute for pentesting. |

### Req 12 — Information security policy and program

| UCM ID | UCM Control | PCI Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-001 | Security policy & governance | 12.1 | direct | STD-SEC-001 policy-of-record. |
| CTL-GOV-001 | Standards governance lifecycle | 12.1.1 | direct | POL-GOV-001 formal governance. |
| CTL-SEC-002 | Security roles & responsibilities | 12.4.1, 12.4.2 | direct | RACI + CISO accountability. |
| CTL-SEC-033 | Security training (baseline) | 12.6.1 | direct | Hire + annually. |
| CTL-SEC-034 | Role-based training | 12.6.2, 12.6.3 | direct | Role-specific + awareness. |
| CTL-SEC-035 | Phishing simulation program | 12.6.3 | direct | Awareness component. |
| CTL-SEC-029 | Incident response lifecycle | 12.10.1 | direct | Documented IR plan. |
| CTL-SEC-031 | Breach notification | 12.10.2 | direct | Card-brand / acquirer notification path. |
| CTL-SEC-032 | Post-incident review | 12.10.6 | direct | Lessons learned + plan modification. |
| CTL-POL-001 | Vendor risk assessment | 12.8.1, 12.8.2 | direct | TPSP inventory + agreements. |
| CTL-POL-002 | Vendor contractual security clauses | 12.8.2, 12.8.5 | direct | PCI-responsibility matrix. |
| CTL-POL-003 | Ongoing vendor monitoring | 12.8.4 | partial | Remediation PLANNED per UCM status. |

## How to consume this map

When a CYBERCUBE product declares PCI DSS scope:

1. Reference this file by slug (`pci-dss-4.0`) in the product's PCL row per [5] STD-GOV-001 and the scope declaration per [7] STD-GOV-006 T2.
2. For each row of this map that applies to the product's CDE, the product's audit-evidence pack per [44] STD-GOV-004 T2/T3 MUST include the artifact named in the `evidence_artifact` field.
3. `partial` and `adjacent` rows are starting points; the product team is responsible for identifying the additional controls named in `notes` and producing their evidence.
4. **Req 9 and parts of Req 1 are cloud-inherited** — record the shared-responsibility split in the audit-evidence pack; do not produce individual CYBERCUBE evidence for cloud-provider-owned items.
5. The QSA / auditor consumes the regulation text first, our map second. Disagreements between this map and a QSA interpretation are resolved in favor of the regulation text; the map owner (`sec-lead`) updates the map accordingly.

## Gaps / known limitations

- **Anti-malware (Req 5.2 / 5.3)** — corporate endpoint EDR program is out of UCM scope; add reference to the HR / IT-Ops EDR policy at QSA engagement.
- **External ASV scans (Req 11.3.2)** — QSA/ASV engagement-managed; CTL-ENG-008 covers internal signal only.
- **Penetration testing (Req 11.4)** — annual pentest report is a distinct deliverable; not covered by any UCM row.
- **Physical access (Req 9)** — cloud-inherited; if any on-prem component exists, open a separate UCM extension ticket.

## Ownership, countersign, and draft posture

- **Owner:** `sec-lead` (single, per RFC-0005 §3.1).
- **Status as of `published_map`:** **RATIFIED** — sec-lead 2026-04-22 (single principal covering sec-lead role at current org size).
- **Countersign record:** tracked in commit trailer on the ratification commit (`Countersigned-by: sec-lead (done: 2026-04-22)`). Future row-level changes re-enter DRAFT on edit and require fresh countersign before re-RATIFIED.
- **Review cadence:** annual minimum; on PCI DSS version change; on any material UCM row churn in [7].
- **Staleness SLO:** >13 months since `published_map` is a lint finding.

## Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 seed | 2026-04-22 | Standards Council | Initial publication per RFC-0005 §3.2. 5 seed rows; bulk population deferred to follow-on ticket owned by `sec-lead`. |
| v1.1    | 2026-04-22 | sec-lead (RFC-0005 follow-on, PYF) | Bulk-population across Req 1–12. 5 → 57 rows. Req 9 documented as cloud-inherited; Req 5 flagged as partial with corporate-EDR gap; Req 11 ASV + pentest noted as out-of-UCM. Schema-valid per compliance-map.schema.json. |
| v1.1 ratified | 2026-04-22 | sec-lead | Countersign complete — single principal covering sec-lead role at current org size; all 57 rows move DRAFT → RATIFIED. Future row edits re-enter DRAFT until re-ratified. |
