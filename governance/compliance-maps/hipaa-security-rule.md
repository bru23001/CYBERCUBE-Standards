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
  # ============================================================
  # §164.308 — Administrative Safeguards
  # ============================================================
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "164.308(a)(1)(i)"
    relationship: "direct"
    notes: "R. Security Management Process — STD-SEC-001 governance implements this. BAs inherit when processing ePHI for a CE."
    evidence_artifact: "STD-SEC-001 approved policy; annual review log."
  - ucm_id: "CTL-GOV-007"
    regulation_ref: "164.308(a)(1)(ii)(A)"
    relationship: "direct"
    notes: "R. Risk Analysis — STD-ERM-001 §6 risk-identification + risk-register row for each ePHI-processing system satisfy the analysis requirement."
    evidence_artifact: "ePHI-scoped rows in governance/risk-register.json; DPIA if applicable."
  - ucm_id: "CTL-GOV-008"
    regulation_ref: "164.308(a)(1)(ii)(B)"
    relationship: "direct"
    notes: "R. Risk Management — STD-ERM-001 §7 treatment/acceptance; each ePHI risk must have a documented treatment plan."
    evidence_artifact: "Treatment plans in risk register; acceptance approvals."
  - ucm_id: "CTL-AUD-006"
    regulation_ref: "164.308(a)(1)(ii)(C)"
    relationship: "direct"
    notes: "R. Sanction Policy — STD-GOV-003 waiver/exception process + POL-AUP-001 enforcement provisions provide the disciplinary posture for workforce non-compliance."
    evidence_artifact: "AUP acknowledgment records; exception registry; HR sanction procedure."
  - ucm_id: "CTL-OPS-015"
    regulation_ref: "164.308(a)(1)(ii)(D)"
    relationship: "partial"
    notes: "R. Information System Activity Review — CTL-OPS-015 immutable audit-log retention + documented review cadence. Complete compliance requires the review-cadence SOP actually be executed; pair with CTL-AUD-001."
    evidence_artifact: "Audit-log samples; documented review SOP; evidence of periodic review sign-off."
  - ucm_id: "CTL-SEC-002"
    regulation_ref: "164.308(a)(2)"
    relationship: "direct"
    notes: "R. Assigned Security Responsibility — STD-SEC-001 names the CISO as accountable role; BA relationship names the Security Official for ePHI scope."
    evidence_artifact: "RACI matrix; CISO appointment record; BAA §Security-Official row."
  - ucm_id: "CTL-SEC-033"
    regulation_ref: "164.308(a)(3)(i)"
    relationship: "direct"
    notes: "R. Workforce Security — STD-SEC-008 baseline training + STD-SEC-004 RBAC cover the 'authorization and supervision' and 'workforce clearance' implementation specs. Termination procedures pair with CTL-SEC-010."
    evidence_artifact: "LMS completion records; access-review records; termination checklist."
  - ucm_id: "CTL-SEC-010"
    regulation_ref: "164.308(a)(4)(i)"
    relationship: "direct"
    notes: "R. Information Access Management — STD-SEC-004 RBAC + default DENY, with access-review cadence, implements 'isolating health care clearinghouse functions', 'access authorization', and 'access establishment/modification'."
    evidence_artifact: "RBAC registry; quarterly access-review records."
  - ucm_id: "CTL-SEC-034"
    regulation_ref: "164.308(a)(5)(i)"
    relationship: "direct"
    notes: "R. Security Awareness & Training — STD-SEC-008 role-based training. Addressable sub-specs (security reminders, malicious-software protection, log-in monitoring, password management) are treated as IMPLEMENT per §Addressable-vs-Required."
    evidence_artifact: "Training matrix; phishing-sim results; password-manager deployment evidence."
  - ucm_id: "CTL-SEC-028"
    regulation_ref: "164.308(a)(6)(i)"
    relationship: "direct"
    notes: "R. Security Incident Procedures — STD-SEC-007 IR lifecycle. Reportable-incident flow-down to CE per BAA is governed by [46] TPL-LGL-002."
    evidence_artifact: "IR playbooks; incident records; BAA breach-notification clause."
  - ucm_id: "CTL-OPS-001"
    regulation_ref: "164.308(a)(7)(i)"
    relationship: "direct"
    notes: "R. Contingency Plan — PLN-OPS-001 BCP + STD-OPS-002 backup/DR implement Data Backup Plan (R), Disaster Recovery Plan (R), Emergency Mode Operation Plan (R); Testing & Revision and Applications/Data Criticality Analysis (A) treated as IMPLEMENT."
    evidence_artifact: "BCP document; DR test results; restore-test logs; tier/criticality matrix."
  - ucm_id: "CTL-AUD-001"
    regulation_ref: "164.308(a)(8)"
    relationship: "direct"
    notes: "R. Evaluation — STD-GOV-004 internal-audit program performs periodic technical + non-technical evaluation of Security Rule posture, at least annually and upon material environmental/operational change."
    evidence_artifact: "Annual HIPAA Security Rule evaluation report; CAP records."
  - ucm_id: "CTL-SEC-001"
    regulation_ref: "164.308(b)(1)"
    relationship: "partial"
    notes: "R. Business Associate Contracts — CYBERCUBE executes a BAA via [46] TPL-LGL-002 with each CE. This row covers policy posture; the executed BAA is the regulation-specific artifact. Subcontractor flow-down per [46] TPL-LGL-002 §Subcontractors."
    evidence_artifact: "Executed BAA per [46] TPL-LGL-002; subcontractor register row in [9] POL-VEN-001; BAA flow-down to subcontractor BAs."
  # ============================================================
  # §164.310 — Physical Safeguards
  # ============================================================
  - ucm_id: "CTL-GOV-006"
    regulation_ref: "164.310(a)(1)"
    relationship: "adjacent"
    notes: "R. Facility Access Controls — CYBERCUBE operates cloud-native; ePHI resides with the IaaS provider whose SOC 2 Type II + HIPAA attestations inherit physical safeguards. Offices hold no ePHI. ERM risk row documents cloud-inheritance rationale; re-scope to 'direct' if an on-prem system is introduced."
    evidence_artifact: "Cloud-provider SOC 2 / HIPAA attestation; ERM row 'ePHI physical-safeguard inheritance'; office-access SOP confirming no-ePHI posture."
  - ucm_id: "CTL-SEC-036"
    regulation_ref: "164.310(b)"
    relationship: "direct"
    notes: "A (→IMPLEMENT). Workstation Use — STD-SEC-002 hardened baselines + POL-AUP-001 workstation acceptable-use rules define permitted functions and workstation posture for roles that can access ePHI."
    evidence_artifact: "Endpoint MDM config; AUP acknowledgment; CIS-benchmark attestation."
  - ucm_id: "CTL-SEC-036"
    regulation_ref: "164.310(c)"
    relationship: "partial"
    notes: "A (→IMPLEMENT). Workstation Security — MDM + FDE + screen-lock policy across managed endpoints. Complete mapping pairs with CTL-SEC-018 (encryption at rest) extended to endpoint disks."
    evidence_artifact: "MDM FDE/screen-lock config; endpoint-compliance dashboard."
  - ucm_id: "CTL-DAT-012"
    regulation_ref: "164.310(d)(1)"
    relationship: "direct"
    notes: "R. Device & Media Controls — STD-DAT-001 §Secure Deletion + IaaS media-sanitization attestation cover disposal, media re-use, accountability, and backup/storage. No physical media leaves cloud provider custody in the CYBERCUBE baseline; BYOK/HSM scenarios trigger a waiver if physical media handling would be required."
    evidence_artifact: "Secure-deletion procedure; IaaS media-sanitization attestation; BYOK/HSM waiver if applicable."
  # ============================================================
  # §164.312 — Technical Safeguards
  # ============================================================
  - ucm_id: "CTL-SEC-004"
    regulation_ref: "164.312(a)(2)(i)"
    relationship: "direct"
    notes: "R. Unique User Identification — STD-SEC-003 unique account-per-human + STD-SEC-004 RBAC; shared accounts forbidden."
    evidence_artifact: "MFA enrollment records; RBAC registry; no-shared-accounts attestation."
  - ucm_id: "CTL-OPS-001"
    regulation_ref: "164.312(a)(2)(ii)"
    relationship: "direct"
    notes: "R. Emergency Access Procedure — PLN-OPS-001 break-glass procedure named in BCP; break-glass accounts logged immutably and reviewed per CTL-OPS-015."
    evidence_artifact: "Break-glass SOP; break-glass-usage audit trail."
  - ucm_id: "CTL-SEC-006"
    regulation_ref: "164.312(a)(2)(iii)"
    relationship: "direct"
    notes: "A (→IMPLEMENT). Automatic Logoff — STD-SEC-003 session idle-timeout + MFA re-challenge. Thresholds vary by surface (15 min admin, 30 min user) per STD-SEC-003 §Sessions."
    evidence_artifact: "Session-timeout config; SSO policy enforcement evidence."
  - ucm_id: "CTL-SEC-018"
    regulation_ref: "164.312(a)(2)(iv)"
    relationship: "direct"
    notes: "A (→IMPLEMENT). Encryption & Decryption — STD-SEC-005 + STD-DAT-001 T3. Any system storing ePHI is classified RESTRICTED → encryption at rest with KMS-managed keys is mandatory."
    evidence_artifact: "Storage-encryption config; KMS audit log; approved-algorithms list."
  - ucm_id: "CTL-SEC-012"
    regulation_ref: "164.312(b)"
    relationship: "partial"
    notes: "R. Audit Controls — CTL-SEC-012 AuthZ decision logging + CTL-OPS-015 immutable audit-log retention. Complete compliance requires the documented review cadence from CTL-OPS-015 actually be executed."
    evidence_artifact: "Audit log samples; retention config; review-cadence SOP + sign-off records."
  - ucm_id: "CTL-DAT-008"
    regulation_ref: "164.312(c)(1)"
    relationship: "direct"
    notes: "R. Integrity — STD-DAT-001 classification + STD-DAT-002 soft-delete lifecycle + CTL-OPS-005 backup-integrity checksums protect ePHI from improper alteration/destruction. Addressable Mechanism-to-Authenticate-ePHI (164.312(c)(2)) covered by CTL-SEC-013/014 crypto integrity primitives."
    evidence_artifact: "Backup integrity checksums; soft-delete lifecycle config; classification labels on ePHI stores."
  - ucm_id: "CTL-SEC-003"
    regulation_ref: "164.312(d)"
    relationship: "direct"
    notes: "R. Person or Entity Authentication — STD-SEC-003 AuthN; MFA required for any ePHI-accessing role per CTL-SEC-004; phishing-resistant factors for privileged roles (STD-SEC-003 T3)."
    evidence_artifact: "Auth config; MFA enrollment for ePHI-scoped roles; phishing-resistant factor attestation for T3."
  - ucm_id: "CTL-SEC-014"
    regulation_ref: "164.312(e)(1)"
    relationship: "direct"
    notes: "R. Transmission Security — TLS 1.2+ with forward secrecy for all ePHI in motion. Addressable sub-specs Integrity Controls (164.312(e)(2)(i)) and Encryption (164.312(e)(2)(ii)) are both treated as IMPLEMENT; public networks never carry unencrypted ePHI."
    evidence_artifact: "TLS config; cipher-suite list; network-encryption attestation; SMTP-TLS enforcement for ePHI-bearing email."
  # ============================================================
  # §164.314 — Organizational Requirements
  # ============================================================
  - ucm_id: "CTL-DAT-020"
    regulation_ref: "164.314(a)(1)"
    relationship: "direct"
    notes: "R. Business Associate Contracts — BAA template [46] TPL-LGL-002 carries required clauses: permitted uses/disclosures, safeguards, subcontractor flow-down, reporting, termination, return/destruction of ePHI. Each executed BAA cited in vendor-inventory row."
    evidence_artifact: "Executed BAAs per [46] TPL-LGL-002; vendor-inventory.json BAA references."
  - ucm_id: "CTL-SEC-031"
    regulation_ref: "164.314(a)(2)(i)(C)"
    relationship: "direct"
    notes: "R. BA reporting of security incidents / breaches to CE — STD-SEC-007 T3 + BAA [46] §Breach-Notification define the timing (≤ agreed window, typically 30 days for breach per HIPAA Breach Notification Rule §164.410) and content of the notification."
    evidence_artifact: "IR records with CE-notification timestamps; BAA breach-notification clause; notification templates."
  - ucm_id: "CTL-GOV-001"
    regulation_ref: "164.314(b)(2)"
    relationship: "direct"
    notes: "R. Group Health Plan sponsor requirements — not applicable to the default CYBERCUBE BA posture (we do not sponsor a group health plan). Row preserved for scope-completeness; re-scope to 'n/a' in the per-deal assessment if the customer is a group health plan asking for plan-sponsor-specific language."
    evidence_artifact: "Per-deal scope memo; plan-sponsor clauses added to BAA if required."
  # ============================================================
  # §164.316 — Policies, Procedures, and Documentation
  # ============================================================
  - ucm_id: "CTL-GOV-001"
    regulation_ref: "164.316(a)"
    relationship: "direct"
    notes: "R. Policies & Procedures — the entire CYBERCUBE standards portfolio (POL-GOV-001, the STD-* family) is the documented set of reasonable and appropriate policies and procedures."
    evidence_artifact: "Approved standards at `[N]-*.md`; registries/standards.json; approval records."
  - ucm_id: "CTL-GOV-005"
    regulation_ref: "164.316(b)(1)"
    relationship: "direct"
    notes: "R. Documentation — POL-GOV-001 §Versioning mandates written documentation of actions/assessments/activities and retains it via git history + approval records."
    evidence_artifact: "Git history; approved-standards version history; exception registry; risk register; audit reports."
  - ucm_id: "CTL-GOV-005"
    regulation_ref: "164.316(b)(2)(i)"
    relationship: "direct"
    notes: "R. Retention — documentation retained ≥ 6 years from date of creation or last effective date (whichever is later). STD-DAT-001 retention schedule must carry a 'HIPAA documentation' row with 6y retention where distinct from the default."
    evidence_artifact: "Retention schedule row for HIPAA documentation; archival-bucket config if applicable."
  - ucm_id: "CTL-GOV-001"
    regulation_ref: "164.316(b)(2)(ii)"
    relationship: "direct"
    notes: "R. Availability — standards portfolio published to all workforce via the engineering knowledge base; acknowledgment captured via LMS + onboarding."
    evidence_artifact: "Knowledge-base access logs; LMS acknowledgment of relevant standards."
  - ucm_id: "CTL-GOV-005"
    regulation_ref: "164.316(b)(2)(iii)"
    relationship: "direct"
    notes: "R. Updates — POL-GOV-001 review cadence + STD-GOV-004 internal-audit + STD-GOV-005 KRI triggers drive periodic review and update of policies in response to environmental/operational changes affecting ePHI security."
    evidence_artifact: "Annual review log; KRI-triggered update records; audit-finding CAPs."
---

# HIPAA Security Rule — CYBERCUBE UCM crosswalk

**Non-authoritative.** This map is CYBERCUBE's self-assessment under the HIPAA Security Rule (45 CFR §164.306–318). The Rule text and HHS/OCR guidance are the authorities. CYBERCUBE operates as a **Business Associate** (BA) of Covered Entity (CE) customers when ePHI is in scope; this map is read accordingly.

## Ownership, countersign, and draft posture

- **Owners:** `privacy-lead` + `legal-lead` — joint per RFC-0005 §3.1.
- **Status as of `published_map`:** **RATIFIED** — privacy-lead 2026-04-22, legal-lead 2026-04-22 (single principal covering both roles at current org size).
- **Countersign record:** tracked in commit trailer on the ratification commit (`Countersigned-by: privacy-lead (done: 2026-04-22)` + `Countersigned-by: legal-lead (done: 2026-04-22)`). Future row-level changes re-enter DRAFT on edit and require fresh countersign before re-RATIFIED.

## Addressable vs Required

HIPAA classifies implementation specifications as **Required (R)** or **Addressable (A)**. CYBERCUBE treats every Addressable spec as **IMPLEMENT** when any system stores or processes ePHI; this is a policy choice (stricter than HIPAA permits). A formal risk-based substitution for an Addressable spec requires [6] STD-GOV-003 waiver with risk assessment cited on the waiver.

Row notes tag each mapping with `R.` or `A. (→IMPLEMENT)` so auditors can read classification at a glance.

## Crosswalk

### Administrative Safeguards (§164.308) — 13 rows

| UCM ID | UCM Control | HIPAA Ref | Spec | Relationship |
|--------|-------------|-----------|:----:|--------------|
| CTL-SEC-001 | Security policy & governance | 164.308(a)(1)(i) | R | direct |
| CTL-GOV-007 | Risk identification & assessment | 164.308(a)(1)(ii)(A) | R | direct |
| CTL-GOV-008 | Risk treatment & acceptance | 164.308(a)(1)(ii)(B) | R | direct |
| CTL-AUD-006 | Policy exception & waiver process (sanction posture) | 164.308(a)(1)(ii)(C) | R | direct |
| CTL-OPS-015 | Audit log immutability & retention | 164.308(a)(1)(ii)(D) | R | partial |
| CTL-SEC-002 | Security roles & responsibilities | 164.308(a)(2) | R | direct |
| CTL-SEC-033 | Security training (baseline) | 164.308(a)(3)(i) | R | direct |
| CTL-SEC-010 | RBAC + default DENY | 164.308(a)(4)(i) | R | direct |
| CTL-SEC-034 | Role-based security training | 164.308(a)(5)(i) | R | direct |
| CTL-SEC-028 | Security incident detection & triage | 164.308(a)(6)(i) | R | direct |
| CTL-OPS-001 | Business continuity plan | 164.308(a)(7)(i) | R | direct |
| CTL-AUD-001 | Internal audit program | 164.308(a)(8) | R | direct |
| CTL-SEC-001 | Security policy & governance (BAA posture) | 164.308(b)(1) | R | partial |

### Physical Safeguards (§164.310) — 4 rows

CYBERCUBE is cloud-native; most physical safeguards are inherited from the IaaS provider's attestations. Endpoint-level specs are implemented directly.

| UCM ID | UCM Control | HIPAA Ref | Spec | Relationship |
|--------|-------------|-----------|:----:|--------------|
| CTL-GOV-006 | ERM (cloud-inheritance rationale) | 164.310(a)(1) | R | adjacent |
| CTL-SEC-036 | Hardened baselines & patching (workstation use) | 164.310(b) | A | direct |
| CTL-SEC-036 | Hardened baselines & patching (workstation security) | 164.310(c) | A | partial |
| CTL-DAT-012 | Secure deletion (device & media controls) | 164.310(d)(1) | R | direct |

### Technical Safeguards (§164.312) — 8 rows

| UCM ID | UCM Control | HIPAA Ref | Spec | Relationship |
|--------|-------------|-----------|:----:|--------------|
| CTL-SEC-004 | MFA for privileged access (unique user ID) | 164.312(a)(2)(i) | R | direct |
| CTL-OPS-001 | BCP (emergency access procedure) | 164.312(a)(2)(ii) | R | direct |
| CTL-SEC-006 | Session management (automatic logoff) | 164.312(a)(2)(iii) | A | direct |
| CTL-SEC-018 | Encryption at rest | 164.312(a)(2)(iv) | A | direct |
| CTL-SEC-012 | AuthZ audit logging | 164.312(b) | R | partial |
| CTL-DAT-008 | Data classification at creation (integrity) | 164.312(c)(1) | R | direct |
| CTL-SEC-003 | AuthN before access | 164.312(d) | R | direct |
| CTL-SEC-014 | TLS 1.2+ with forward secrecy | 164.312(e)(1) | R | direct |

### Organizational Requirements (§164.314) — 3 rows

| UCM ID | UCM Control | HIPAA Ref | Spec | Relationship |
|--------|-------------|-----------|:----:|--------------|
| CTL-DAT-020 | DPA/BAA with all processors | 164.314(a)(1) | R | direct |
| CTL-SEC-031 | Breach notification (BA → CE) | 164.314(a)(2)(i)(C) | R | direct |
| CTL-GOV-001 | Standards governance lifecycle (group-health-plan sponsor) | 164.314(b)(2) | R | direct |

### Policies, Procedures, and Documentation (§164.316) — 5 rows

| UCM ID | UCM Control | HIPAA Ref | Spec | Relationship |
|--------|-------------|-----------|:----:|--------------|
| CTL-GOV-001 | Policies & procedures | 164.316(a) | R | direct |
| CTL-GOV-005 | Semantic versioning & traceability | 164.316(b)(1) | R | direct |
| CTL-GOV-005 | Retention (≥6 years) | 164.316(b)(2)(i) | R | direct |
| CTL-GOV-001 | Availability to workforce | 164.316(b)(2)(ii) | R | direct |
| CTL-GOV-005 | Updates on environmental/operational change | 164.316(b)(2)(iii) | R | direct |

### Breach Notification Rule (§164.404–414)

Referenced for context — **not part of §164.306-318 Security Rule proper**. Breach-notification obligations surface in the executed BAA via [46] TPL-LGL-002 §Breach-Notification and in [23] STD-SEC-007 T3; CE-notification timing is governed contractually (typically ≤ 30 days from discovery, faster if BAA specifies).

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
| v1.1 bulk-pop | 2026-04-22 | Standards Council | RFC-0005 §3.2 bulk-population: expanded from 6 to **33 rows** covering all five subparts (§164.308 Admin ×13, §164.310 Physical ×4, §164.312 Technical ×8, §164.314 Organizational ×3, §164.316 Documentation ×5). Rows published as DRAFT pending joint `privacy-lead` + `legal-lead` countersign (tracked via commit trailer). |
| v1.1 ratified | 2026-04-22 | privacy-lead + legal-lead | Joint countersign complete — single principal covering both roles at current org size; all 33 rows move DRAFT → RATIFIED. Future row edits re-enter DRAFT until re-ratified. |
