---
regulation:
  id: "hipaa-security-rule"
  name: "HIPAA Security Rule (45 CFR §164.306-318)"
  version: "Omnibus Rule (2013)"
  authority: "U.S. Department of Health and Human Services — Office for Civil Rights"
  effective: "2013-09-23"
  published_map: "2026-04-22"
  owner: "privacy-lead + legal-lead"
  authoritative: false
rows:
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "164.308(a)(1)(i)"
    relationship: "direct"
    notes: "Security Management Process (Administrative Safeguards) — STD-SEC-001 governance is the implementing CYBERCUBE control. Business Associates (BAs) under a Covered Entity (CE) inherit this obligation."
    evidence_artifact: "STD-SEC-001 approved policy, annual review log."
  - ucm_id: "CTL-SEC-004"
    regulation_ref: "164.312(a)(2)(i)"
    relationship: "direct"
    notes: "Unique user identification + access controls — STD-SEC-003 T3 MFA combined with CTL-SEC-010 RBAC implement HIPAA's 164.312(a) access-control requirements."
    evidence_artifact: "MFA enrollment records, RBAC registry, access-review records."
  - ucm_id: "CTL-SEC-018"
    regulation_ref: "164.312(a)(2)(iv)"
    relationship: "direct"
    notes: "Encryption at rest — HIPAA 164.312(a)(2)(iv) 'Encryption and Decryption' is addressable; CYBERCUBE treats it as IMPLEMENT for any system storing ePHI (classification RESTRICTED per STD-DAT-001 T3)."
    evidence_artifact: "Storage-encryption config, KMS audit log."
  - ucm_id: "CTL-SEC-012"
    regulation_ref: "164.312(b)"
    relationship: "partial"
    notes: "Audit controls — CTL-SEC-012 AuthZ audit logging + CTL-OPS telemetry together address 164.312(b). Full compliance requires an immutable audit-log pipeline (STD-OPS-003 T3) and a documented review cadence."
    evidence_artifact: "Audit log samples, retention config, review-cadence SOP."
  - ucm_id: "CTL-SEC-014"
    regulation_ref: "164.312(e)(1)"
    relationship: "direct"
    notes: "Transmission security — TLS 1.2+ (STD-SEC-005) implements HIPAA 164.312(e)(1) for ePHI in motion."
    evidence_artifact: "TLS config, cipher-suite list, network-encryption attestation."
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "164.308(b)(1)"
    relationship: "partial"
    notes: "Business Associate Contracts — CYBERCUBE executes a BAA using [46] TPL-LGL-002 with each Covered Entity. This UCM row covers the policy posture; the BAA execution itself is the regulation-specific artifact."
    evidence_artifact: "Executed BAA per [46] TPL-LGL-002; vendor register row in [9] POL-VEN-001."
---

# HIPAA Security Rule — CYBERCUBE UCM crosswalk

**Non-authoritative.** This map is CYBERCUBE's self-assessment under the HIPAA Security Rule (45 CFR §164.306–318). The Rule text and HHS/OCR guidance are the authorities. CYBERCUBE operates as a **Business Associate** (BA) of Covered Entity (CE) customers when ePHI is in scope; this map is read accordingly.

**Scope of v1 seed:** 6 rows demonstrating the format across Administrative / Physical / Technical safeguards. Bulk population of the remaining ~25 relevant UCM rows is a follow-on ticket owned by `privacy-lead` + `legal-lead` per RFC-0005 §3.2.

## Addressable vs Required

HIPAA classifies implementation specifications as **Required** or **Addressable**. CYBERCUBE treats every Addressable spec as IMPLEMENT when any system stores or processes ePHI; this is a policy choice (stricter than HIPAA permits). A formal risk-based substitution for an Addressable spec requires [6] STD-GOV-003 waiver with risk assessment.

## Seed crosswalk

### Administrative Safeguards (§164.308)

| UCM ID | UCM Control | HIPAA Ref | Relationship | Notes |
|--------|-------------|-----------|--------------|-------|
| CTL-SEC-001 | Security policy & governance | 164.308(a)(1)(i) | direct | STD-SEC-001 implements the Security Management Process. |
| CTL-SEC-001 | Security policy & governance | 164.308(b)(1) | partial | BAA execution via [46] TPL-LGL-002 is the regulation-specific artifact. |

### Physical Safeguards (§164.310)

*(to be populated — facility-access and device-control rows for the engineering-office physical footprint; pending bulk-population)*

### Technical Safeguards (§164.312)

| UCM ID | UCM Control | HIPAA Ref | Relationship | Notes |
|--------|-------------|-----------|--------------|-------|
| CTL-SEC-004 | MFA for privileged access | 164.312(a)(2)(i) | direct | Unique user identification + MFA. |
| CTL-SEC-018 | Encryption at rest | 164.312(a)(2)(iv) | direct | Treated as IMPLEMENT for ePHI; STD-DAT-001 T3 classification drives the requirement. |
| CTL-SEC-012 | AuthZ audit logging | 164.312(b) | partial | Pair with STD-OPS-003 T3 immutable audit-log pipeline + documented review cadence. |
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | 164.312(e)(1) | direct | Transmission security. |

### Organizational Requirements (§164.314)

*(BAA/subcontractor flow-down; covered by [46] TPL-LGL-002 once that template ships — pending bulk-population to enumerate each flow-down clause as its own row)*

### Policies, Procedures, and Documentation (§164.316)

*(pending bulk-population — the CYBERCUBE policy-documentation posture largely maps to CTL-GOV rows)*

### Breach Notification Rule (§164.404–414)

*(referenced for context — not part of §164.306-318 Security Rule proper; breach-notification requirements surface in the BAA [46] TPL-LGL-002 §Breach-Notification and in [23] STD-SEC-007 T3)*

## How to consume this map

When a CYBERCUBE product declares HIPAA / BA scope:

1. Reference this file by slug (`hipaa-security-rule`) in the product's PCL row per [5] STD-GOV-001 and scope declaration per [7] STD-GOV-006 T2.
2. Execute a BAA with the CE using [46] TPL-LGL-002, customized per deal with `legal-lead` sign-off.
3. Any system storing or processing ePHI carries classification RESTRICTED per [25] STD-DAT-001; all Addressable technical safeguards are treated as IMPLEMENT.
4. De-identified ePHI follows [47] STD-DAT-005 (Safe-Harbor or Expert-Determination path); a documented de-id method exits the data from HIPAA scope per 164.514(b).
5. Audit-evidence pack per [44] STD-GOV-004 T3 cites this map as the starting point for Security-Rule walkthrough.

## Ownership

- **Owners:** `privacy-lead` + `legal-lead` (joint per RFC-0005 §3.1 — HIPAA crosses both functions).
- **Review cadence:** annual minimum; on HHS/OCR guidance updates; on [46] / [47] / [25] / [23] material changes.
- **Staleness SLO:** >13 months since `published_map` is a lint finding.

## Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 seed | 2026-04-22 | Standards Council | Initial publication per RFC-0005 §3.2. 6 seed rows across Administrative + Technical safeguards; Physical + Organizational + Documentation sections pending bulk population. |
