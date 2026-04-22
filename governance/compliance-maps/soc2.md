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
  - ucm_id: "CTL-SEC-003"
    regulation_ref: "CC6.1"
    relationship: "direct"
    notes: "Logical and Physical Access Controls — CC6.1 requires restriction of access to information assets; STD-SEC-003 AuthN-before-access is the implementing control."
    evidence_artifact: "Auth config, login-flow tests, access-review records."
  - ucm_id: "CTL-SEC-010"
    regulation_ref: "CC6.2, CC6.3"
    relationship: "direct"
    notes: "RBAC + default DENY — CC6.2 (register/authorize) + CC6.3 (least-privilege) both map to STD-SEC-004 authorization model."
    evidence_artifact: "Role definitions, permission registry, access-certification records."
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
  - ucm_id: "CTL-SEC-021"
    regulation_ref: "CC7.1"
    relationship: "partial"
    notes: "System operations — CC7.1 detection of new vulnerabilities; CTL-SEC-021 dependency scanning + CTL-SEC-024/025/026 vulnerability-management pipeline together address the criterion."
    evidence_artifact: "npm audit / Snyk reports, vulnerability register (STD-SEC-006)."
---

# SOC 2 Trust Services Criteria — CYBERCUBE UCM crosswalk

**Non-authoritative.** This map is CYBERCUBE's self-assessment against the AICPA Trust Services Criteria (TSC, 2017 criteria with 2022 revised points of focus). A SOC 2 auditor's Report is the authority; this map is a preparation aid for audit engagements and an internal navigation tool.

**Scope of v1 seed:** 7 rows spanning the Common Criteria (CC1–CC7). Bulk population for the remaining ~53 relevant UCM rows — and for the non-Common TSC categories (Availability A-series, Confidentiality C-series, Processing Integrity PI-series, Privacy P-series) when in scope — is a follow-on ticket owned by `sec-lead` per RFC-0005 §3.2.

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

## Seed crosswalk

### CC1 — Control Environment

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-GOV-001 | Standards governance lifecycle | CC1.1 | direct | POL-GOV-001 implements the control-environment commitment. |
| CTL-SEC-001 | Security policy & governance | CC1.1 | direct | STD-SEC-001 policy-of-record. |

### CC6 — Logical and Physical Access Controls

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-003 | AuthN before access | CC6.1 | direct | STD-SEC-003 implementing control. |
| CTL-SEC-010 | RBAC + default DENY | CC6.2, CC6.3 | direct | STD-SEC-004 authorization model. |
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | CC6.7 | direct | STD-SEC-005 transmission confidentiality. |
| CTL-SEC-012 | AuthZ audit logging | CC6.8 | partial | Pair with STD-OPS-003 observability + STD-GOV-005 KRIs. |

### CC7 — System Operations

| UCM ID | UCM Control | TSC Ref | Relationship | Notes |
|--------|-------------|---------|--------------|-------|
| CTL-SEC-021 | Dependency security | CC7.1 | partial | Pair with STD-SEC-006 vulnerability-management pipeline. |

### Other Common Criteria (CC2–CC5, CC8–CC9)

*(pending bulk-population — risk assessment (CC3) maps to CTL-GOV-007/008/009; change management (CC8) maps to CTL-ENG-006 release + POL-ENG-001 change-management; monitoring (CC4) maps to CTL-AUD and STD-GOV-005)*

### Category-Specific Criteria (A / C / PI / P)

*(pending bulk-population — A-series typically maps to CTL-OPS (backup, DR, SLO); C-series maps to CTL-DAT classification + encryption rows; PI-series maps to CTL-ENG API contract + testing; P-series maps to CTL-DAT privacy rows)*

## How to consume this map

When a CYBERCUBE product enters SOC 2 audit scope:

1. Confirm the engagement's TSC scope (Security minimum; Availability / Confidentiality / PI / Privacy per engagement letter).
2. Reference this file by slug (`soc2`) in the product's PCL row per [5] STD-GOV-001 and scope declaration per [7] STD-GOV-006 T2.
3. Produce the evidence artifacts named in this map's `evidence_artifact` fields — they become the Type 1 (design) or Type 2 (operating-effectiveness over a period) auditor requests.
4. `partial` rows are the seed of the "additional controls" auditor walkthrough.
5. Audit findings land in [44] STD-GOV-004's finding register; material gaps produce [8] STD-ERM-001 risk entries.

## Ownership

- **Owner:** `sec-lead` (per RFC-0005 §3.1).
- **Review cadence:** annual minimum; on TSC revision (AICPA publishes periodic point-of-focus updates); on material UCM churn.
- **Staleness SLO:** >13 months since `published_map` is a lint finding.

## Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 seed | 2026-04-22 | Standards Council | Initial publication per RFC-0005 §3.2. 7 seed rows spanning CC1, CC6, CC7. Remaining CC sections + A/C/PI/P categories pending bulk population. |
