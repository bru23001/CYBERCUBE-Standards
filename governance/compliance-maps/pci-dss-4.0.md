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
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "12.1"
    relationship: "direct"
    notes: "Overall information security policy — STD-SEC-001 is the CYBERCUBE policy-of-record. PCI Requirement 12.1 is fully satisfied when STD-SEC-001 is in force and reviewed annually."
    evidence_artifact: "Approved STD-SEC-001 document, annual review log."
  - ucm_id: "CTL-SEC-003"
    regulation_ref: "8.2, 8.3"
    relationship: "partial"
    notes: "STD-SEC-003 AuthN-before-access implements PCI 8.2/8.3 identifier-uniqueness and authentication-in-place requirements at the application layer. Full compliance also requires network-segment controls (PCI 1.x) and logging (PCI 10.x) — cross-reference CTL-OPS and CTL-SEC-012."
    evidence_artifact: "Auth config, login-flow tests, identity-provider attestation."
  - ucm_id: "CTL-SEC-004"
    regulation_ref: "8.4"
    relationship: "direct"
    notes: "MFA for privileged access — STD-SEC-003 T3 requires enforced MFA; PCI 8.4 requires MFA for all access to the CDE from outside the CDE network. When the CYBERCUBE product declares CDE scope, the STD-SEC-003 T3 MFA clause is the implementing control."
    evidence_artifact: "MFA enrollment records, policy config, CDE-scope access-log review."
  - ucm_id: "CTL-SEC-014"
    regulation_ref: "4.1"
    relationship: "direct"
    notes: "TLS 1.2+ with forward secrecy — STD-SEC-005 approved-algorithms list. PCI 4.1 requires strong cryptography on networks transmitting cardholder data."
    evidence_artifact: "TLS config, cipher-suite list, SSL Labs scan output."
  - ucm_id: "CTL-SEC-021"
    regulation_ref: "6.3"
    relationship: "partial"
    notes: "Dependency security / vulnerability scanning — CTL-SEC-021 (STD-SEC-002) + CTL-SEC-024/025/026 (STD-SEC-006) together implement PCI 6.3 (system-components patched). Full compliance also requires PCI 11.3 internal/external vulnerability scanning cadence."
    evidence_artifact: "npm audit / Snyk reports, lock files, vulnerability register (STD-SEC-006)."
---

# PCI DSS 4.0 — CYBERCUBE UCM crosswalk

**Non-authoritative.** This is CYBERCUBE's self-assessment. The PCI DSS v4.0 standard text is the authority. This map is a navigation aid for products declaring CDE (Cardholder Data Environment) scope — it does not constitute a Report on Compliance (RoC), Self-Assessment Questionnaire (SAQ), or Attestation of Compliance (AoC).

**Scope of v1 seed:** 5 rows demonstrating the format and seeding five high-value requirement areas. Bulk population of the remaining ~40-50 relevant UCM rows is a follow-on ticket owned by `sec-lead` per RFC-0005 §3.2.

## Seed crosswalk

### Build & Maintain a Secure Network (PCI §1–§2)

*(to be populated — network-segmentation controls live in CTL-OPS and CTL-ENG-004 IaC rows; this section is pending bulk-population)*

### Protect Account Data (PCI §3–§4)

| UCM ID | UCM Control | PCI DSS 4.0 Ref | Relationship | Notes |
|--------|-------------|-----------------|--------------|-------|
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | 4.1 | direct | STD-SEC-005 approved-algorithms list. PCI 4.1 requires strong cryptography on networks transmitting CHD. |

### Vulnerability Management (PCI §5–§6)

| UCM ID | UCM Control | PCI DSS 4.0 Ref | Relationship | Notes |
|--------|-------------|-----------------|--------------|-------|
| CTL-SEC-021 | Dependency security (lock files, vuln scanning) | 6.3 | partial | CTL-SEC-021 + CTL-SEC-024/025/026 implement patching; PCI 11.3 vulnerability-scanning cadence is additional. |

### Strong Access Control (PCI §7–§8)

| UCM ID | UCM Control | PCI DSS 4.0 Ref | Relationship | Notes |
|--------|-------------|-----------------|--------------|-------|
| CTL-SEC-003 | AuthN before access | 8.2, 8.3 | partial | App-layer auth; full compliance also needs PCI 1.x (network) + 10.x (logging). |
| CTL-SEC-004 | MFA for privileged access | 8.4 | direct | STD-SEC-003 T3 MFA enforcement maps to PCI 8.4 for CDE access. |

### Monitor and Test (PCI §10–§11)

*(to be populated — logging controls live in CTL-OPS / CTL-AUD; pending bulk-population)*

### Maintain an Information Security Policy (PCI §12)

| UCM ID | UCM Control | PCI DSS 4.0 Ref | Relationship | Notes |
|--------|-------------|-----------------|--------------|-------|
| CTL-SEC-001 | Security policy & governance | 12.1 | direct | STD-SEC-001 is the policy of record; PCI 12.1 is satisfied when in-force + annually reviewed. |

## How to consume this map

When a CYBERCUBE product declares PCI DSS scope:

1. Reference this file by slug (`pci-dss-4.0`) in the product's PCL row per [5] STD-GOV-001 and the scope declaration per [7] STD-GOV-006 T2.
2. For each row of this map that applies to the product's CDE, the product's audit-evidence pack per [44] STD-GOV-004 T2/T3 MUST include the artifact named in the `evidence_artifact` field.
3. `partial` and `adjacent` rows are starting points; the product team is responsible for identifying the additional controls named in `notes` and producing their evidence.
4. The QSA / auditor consumes the regulation text first, our map second. Disagreements between this map and a QSA interpretation are resolved in favor of the regulation text; the map owner (`sec-lead`) updates the map accordingly.

## Ownership

- **Owner:** `sec-lead` (per RFC-0005 §3.1).
- **Review cadence:** annual minimum; on PCI DSS version change; on any material UCM row churn in [7].
- **Staleness SLO:** >13 months since `published_map` is a lint finding.

## Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 seed | 2026-04-22 | Standards Council | Initial publication per RFC-0005 §3.2. 5 seed rows; bulk population deferred to follow-on ticket owned by `sec-lead`. |
