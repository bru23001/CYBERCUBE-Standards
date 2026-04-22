# Enterprise Risk Management (ERM) Policy (v1.1)

**Standard ID:** STD-ERM-001
**Version:** v1.1
**Status:** Approved
**Applies To:** All CYBERCUBE personnel, contractors, systems, and operations
**Owner:** Executive Leadership
**Effective Date:** 2026-02-05 (v1), 2026-04-22 (v1.1)

---

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Policy | Waiver Path |
| ------------- | ---- | --------------------------------- | ----------- |
| All projects | **T1 MUST** | (1) Every project MUST use the canonical ERM Risk Register (schema in §8.1). (2) Risk acceptance at residual rating `HIGH` or `CRITICAL` MUST be documented with a named approver. (3) Undocumented risk acceptance is prohibited. | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Periodic (at least semi-annual) risk review per product, KRI tracking per §9, register kept in a controlled governance artifact with access logged. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Executive-level risk committee, independent review of residual ratings, board-level reporting cadence, integration with external ERM / GRC platform. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

---

## 1. Purpose

The purpose of this policy is to establish a formal Enterprise Risk Management (ERM) framework for CYBERCUBE that enables the consistent identification, assessment, treatment, monitoring, and reporting of risks that may affect the organization's strategic objectives, operations, customers, compliance obligations, financial stability, and reputation.

This policy ensures that risk management is proactive, integrated, and decision-driven, rather than reactive.

---

## 2. Scope

This policy applies to:

- All CYBERCUBE business units, products, and services
- All information systems, infrastructure, and data
- All employees, contractors, and third-party relationships
- All categories of risk, including but not limited to security, operational, legal, financial, privacy, AI, and vendor risk

ERM applies across the entire lifecycle of CYBERCUBE activities, including design, development, deployment, operations, and decommissioning.

---

## 3. Risk Management Principles

CYBERCUBE's ERM program is guided by the following principles:

- **Enterprise-wide:** Risks are considered across the organization, not in isolation
- **Risk-based:** Decisions are informed by likelihood, impact, and tolerance
- **Forward-looking:** Emphasis on early indicators and prevention
- **Accountable:** Every material risk has a named owner
- **Documented:** Risk decisions are traceable and auditable
- **Integrated:** Risk management is embedded in governance, SDLC, and operations

---

## 4. Risk Governance and Accountability

### 4.1 Governance Structure

| Role                 | Responsibilities                             |
| -------------------- | -------------------------------------------- |
| Executive Leadership | Defines risk appetite and provides oversight |
| Risk Owner           | Accountable for managing assigned risks      |
| Control Owner        | Implements and maintains mitigating controls |
| Standards Owners     | Ensure alignment between risks and standards |
| All Personnel        | Identify and escalate risks                  |

### 4.2 Risk Appetite and Tolerance

CYBERCUBE defines risk appetite as the amount and type of risk the organization is willing to accept in pursuit of its objectives.

- Risk appetite is defined at the enterprise level
- Risk tolerance thresholds are defined per risk category
- Appetite and tolerance are reviewed annually or upon material change

Risk acceptance above defined tolerance requires executive approval.

---

## 5. Risk Categories

CYBERCUBE classifies risks into the following non-exclusive categories:

| Category                     | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| Strategic Risk               | Business direction, market, and product decisions       |
| Operational Risk             | Availability, reliability, scalability, process failure |
| Security Risk                | Confidentiality, integrity, and availability threats    |
| Privacy Risk                 | Personal data misuse and regulatory exposure            |
| Compliance and Legal Risk    | Regulatory, contractual, and legal obligations          |
| Financial Risk               | Revenue, cost, insurance, and financial controls        |
| Vendor and Supply Chain Risk | Third-party dependencies and supply chain exposure      |
| Technology and AI Risk       | Model behavior, bias, misuse, and system failure        |

---

## 6. Risk Identification and Assessment

### 6.1 Risk Identification

Risks may be identified through:

- Architecture and design reviews
- Incident and near-miss analysis
- Vulnerability assessments
- Audits and compliance reviews
- Vendor assessments
- Change management and new initiatives

### 6.2 Risk Assessment Methodology

Each identified risk is evaluated using:

- **Likelihood** — Probability of occurrence
- **Impact** — Potential business, customer, legal, or reputational harm

Risks are evaluated in two states:

- **Inherent Risk** — Risk level before controls are applied
- **Residual Risk** — Risk level after controls are applied

#### Risk Scoring Matrix

Risk scores are calculated as **Likelihood x Impact** using the following scales:

**Likelihood Scale:**

| Rating         | Score | Definition                                      |
| -------------- | ----- | ----------------------------------------------- |
| Rare           | 1     | Unlikely to occur; no history of occurrence     |
| Unlikely       | 2     | Could occur but not expected; limited precedent |
| Possible       | 3     | May occur occasionally; some precedent exists   |
| Likely         | 4     | Expected to occur in most circumstances         |
| Almost Certain | 5     | Expected to occur frequently or is imminent     |

**Impact Scale:**

| Rating     | Score | Definition                                               |
| ---------- | ----- | -------------------------------------------------------- |
| Negligible | 1     | Minimal impact; no disruption to operations              |
| Minor      | 2     | Limited impact; short-term disruption, easily remediated |
| Moderate   | 3     | Noticeable impact; requires significant response         |
| Major      | 4     | Severe impact; significant harm to operations or trust   |
| Critical   | 5     | Catastrophic impact; existential or regulatory threat    |

**Combined Risk Score (Likelihood x Impact):**

| Score Range | Severity | Required Action                                          |
| ----------- | -------- | -------------------------------------------------------- |
| 1 - 4       | Low      | Monitor; accept within tolerance                         |
| 5 - 9       | Medium   | Mitigate with controls; assign risk owner                |
| 10 - 16     | High     | Prioritize mitigation; escalate to leadership            |
| 17 - 25     | Critical | Immediate action required; executive oversight mandatory |

Risk scoring may be qualitative, quantitative, or hybrid depending on the risk category and available data.

---

## 7. Risk Treatment and Acceptance

CYBERCUBE recognizes four risk treatment strategies:

| Strategy | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| Avoid    | Eliminate the risk entirely by removing the source or activity                |
| Mitigate | Reduce likelihood or impact through controls and safeguards                   |
| Transfer | Shift risk to a third party via insurance, contractual terms, or partnerships |
| Accept   | Formally accept the risk within defined tolerance                             |

A combination of strategies may be applied to a single risk. The chosen strategy must be documented in the Risk Register along with the rationale.

### 7.1 Risk Acceptance

- Risk acceptance must be explicit and documented
- Acceptance beyond tolerance requires executive approval
- Accepted risks must be reviewed periodically

---

## 8. Risk Register and Documentation

CYBERCUBE maintains a **single centralized Risk Register** that serves three distinct workloads: (a) enterprise risks (this policy), (b) internal-audit findings and Corrective Action Plans (STD-GOV-004), and (c) vendor risks (POL-VEN-001). A single register avoids parallel tracking systems, duplicate reporting, and status drift.

### 8.1 Canonical Register Schema (v1.1)

Every Risk Register entry MUST populate the fields below. Fields marked *(finding)* are required only when `entry_type = AUDIT_FINDING`; fields marked *(vendor)* are required only when `entry_type = VENDOR_RISK`.

| Field                 | Type / values                                         | Description                                                                 |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| `risk_id`             | `RISK-YYYY-NNNN`                                      | Primary identifier (immutable).                                             |
| `entry_type`          | `ENTERPRISE_RISK` \| `AUDIT_FINDING` \| `VENDOR_RISK` | Routing discriminator — determines which conditional fields apply.          |
| `title`               | string                                                | Short human-readable label.                                                 |
| `description`         | text                                                  | Risk / finding / vendor-risk description.                                   |
| `category`            | enum (Security, Operational, Privacy, Vendor, …)      | Taxonomy — see §2 of this policy.                                           |
| `inherent_rating`     | L / M / H / C                                         | Pre-mitigation risk rating.                                                 |
| `residual_rating`     | L / M / H / C                                         | Post-mitigation risk rating.                                                |
| `owner`               | role key (see STD-ENG-007 Appendix X)                 | Named accountable individual. Default `eng-lead` \| `sec-lead` \| `oncall-sre` unless domain-specific. |
| `controls`            | list                                                  | Mitigating controls in place or planned.                                    |
| `status`              | `OPEN` \| `IN_PROGRESS` \| `ACCEPTED` \| `CLOSED`     | Lifecycle state.                                                            |
| `acceptance_approver` | role key                                              | Required if `status = ACCEPTED`.                                            |
| `review_date`         | ISO date                                              | Next scheduled review.                                                      |
| `finding_id` *(finding)*   | `FND-YYYY-NNNN`                                  | Links the entry to the audit report that generated it (STD-GOV-004 §6.3).   |
| `audit_scope` *(finding)*  | string                                           | Audit domain (e.g. "Security controls — access management").                |
| `cap_owner` *(finding)*    | role key                                         | Corrective-Action-Plan owner. Often but not necessarily `owner`.            |
| `cap_due` *(finding)*      | ISO date                                         | Target remediation date. SLA from STD-GOV-004 §5 applies.                   |
| `vendor_id` *(vendor)*     | `VND-NNNN`                                       | Links to vendor record per POL-VEN-001.                                     |
| `links`               | list of URLs                                          | Tickets, runbooks, evidence artifacts.                                      |

### 8.2 Operational Rules

1. Audit findings from STD-GOV-004 MUST be filed in this register (not a separate tracker); this is the T1 clause for that standard.
2. Vendor risks from POL-VEN-001 MUST use the same register with `entry_type = VENDOR_RISK`.
3. Views, filters, and dashboards may present `entry_type`-specific cuts, but the underlying record is one and the same.
4. Schema changes are breaking; increment this standard's minor version and update STD-GOV-004 + POL-VEN-001 references in the same revision.

The Risk Register is a controlled governance artifact.

---

## 9. Monitoring, KRIs, and Reporting

### 9.1 Monitoring

Risks are continuously monitored using:

- **Key Risk Indicators (KRIs)** — Measurable thresholds that signal increasing risk
- **Metrics and thresholds** — Quantitative data points tracked over time
- **Incident and trend analysis** — Pattern recognition from historical events

**Example KRIs:**

| Risk Category | Example KRI                                              | Threshold         |
| ------------- | -------------------------------------------------------- | ----------------- |
| Security      | Number of critical vulnerabilities unpatched past SLA    | Zero tolerance    |
| Operational   | System uptime percentage                                 | Below 99.9%       |
| Privacy       | Data subject access requests exceeding response deadline | Above 0           |
| Vendor        | Vendor security assessment failures                      | Any critical fail |

For the full KRI catalog and dashboard specifications, refer to **6.2 CYBERCUBE Metrics, KRIs and Governance Dashboards Standard**.

### 9.2 Reporting

Risk reporting includes:

- Executive risk summaries
- Board-level reporting (as applicable)
- Incident-driven updates
- Audit and compliance evidence

Escalation is required when risk thresholds are breached.

---

## 10. Integration with CYBERCUBE Standards

The ERM Policy integrates with and is supported by:

| Standard                                             | Relevance                                 |
| ---------------------------------------------------- | ----------------------------------------- |
| 2.1 Security Policy                                  | Security risk identification and controls |
| 2.7 Security Incident Response Standard              | Incident-driven risk assessment           |
| 4.4 Platform Reliability and SRE Standard            | Operational risk and availability         |
| 7.1 Vendor Risk Management Policy                    | Third-party and supply chain risk         |
| 3.1 Privacy Policy and 3.2 Privacy Handling Policy   | Privacy risk and data protection          |
| 7.2 AI Usage and Ethics Policy                       | Technology and AI risk governance         |
| 1.2 Standards Governance Policy                      | Standards alignment and lifecycle         |
| 6.2 Metrics, KRIs and Governance Dashboards Standard | Risk monitoring and reporting             |

ERM acts as the unifying risk lens across all CYBERCUBE standards.

---

## 11. Exceptions and Violations

- Deviations from this policy require formal exception approval
- Undocumented risk acceptance is prohibited
- Policy violations may result in corrective action

---

## 12. Review and Maintenance

- This policy is reviewed at least annually
- Updates require executive approval
- Material changes trigger immediate review

---

## 13. Approval

This policy is approved and adopted by CYBERCUBE executive leadership and is effective as of the stated effective date.

---

## 9. Machine-Readable Schema

The canonical Risk Register (§8) is validated by [`schemas/risk-register.schema.json`](../schemas/risk-register.schema.json). The schema is the **authoritative contract** for the register's structure.

- **Run:** `python tools/validate-schemas.py --path governance/risk-register.json`.
- **Required fields:** `id` (`RISK-####`), `title`, `category`, `owner`, `inherent_rating`, `residual_rating`, `status`, `last_reviewed`.
- **Cross-references:** `controls[]` map to STD-GOV-006 UCM IDs; `kri_ids[]` to STD-GOV-005 KRIs; `linked_incidents[]` to STD-OPS-004; `linked_exceptions[]` to STD-GOV-003 waivers.
- **Governance:** schema changes follow POL-GOV-001 §8 change-control. Breaking changes bump `$id` to `.v2.json`.

---

## Version History

| Version | Date       | Changes         | Author               |
| ------- | ---------- | --------------- | -------------------- |
| v1.0    | 2026-02-05 | Initial release | Executive Leadership |
| v1.1    | 2026-04-22 | §8 extended with canonical Risk Register schema supporting three entry types: `ENTERPRISE_RISK`, `AUDIT_FINDING`, `VENDOR_RISK`. Added fields `entry_type`, `finding_id`, `audit_scope`, `cap_owner`, `cap_due`, `vendor_id` to enable reuse by STD-GOV-004 (audit findings/CAP) and POL-VEN-001 (vendor risks) without a separate tracker. Owner field now aligns with STD-ENG-007 Appendix X role keys. | Executive Leadership |
| v1.2    | 2026-04-22 | Pass-3 tranche-2: canonical Risk Register is now machine-validated against [`schemas/risk-register.schema.json`](../schemas/risk-register.schema.json). Validator: `python tools/validate-schemas.py --path governance/risk-register.json`. Enables CI enforcement of `id` pattern (`RISK-####`), required fields (`owner`, ratings, `status`, `last_reviewed`), and enum constraints on `category` / `treatment` / `status`. No rule change; raises Automatability (M) from 2 → 3. | Executive Leadership |


```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CYBERCUBE ENTERPRISE RISK MANAGEMENT (ERM) — DIRECTIVE BLOCK               │
│  Source: 1.3 | Owner: Executive Leadership | Binding: MANDATORY             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AUTHORITY                                                                  │
│  Applies to: ALL personnel, systems, products, services, vendors            │
│  Undocumented risk acceptance is PROHIBITED                                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  PURPOSE                                                                    │
│  Establish a unified, proactive, decision-driven framework to identify,     │
│  assess, treat, monitor, and report enterprise risks.                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ERM PRINCIPLES                                                             │
│    • Enterprise-wide (no siloed risk)                                       │
│    • Risk-based decision making                                             │
│    • Forward-looking (early indicators)                                     │
│    • Named ownership for every material risk                                │
│    • Documented and auditable                                               │
│    • Integrated with governance, SDLC, and operations                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  GOVERNANCE & ACCOUNTABILITY                                                │
│    • Executive Leadership: defines risk appetite & oversight                │
│    • Risk Owner: accountable for each risk                                  │
│    • Control Owner: implements mitigations                                  │
│    • Standards Owners: ensure policy alignment                              │
│    • All Personnel: identify and escalate risks                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK APPETITE & TOLERANCE                                                  │
│    • Defined at enterprise level                                            │
│    • Tolerance thresholds per risk category                                 │
│    • Reviewed annually or upon material change                              │
│    • Acceptance above tolerance REQUIRES executive approval                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK CATEGORIES (NON-EXCLUSIVE)                                            │
│  Strategic | Operational | Security | Privacy | Compliance & Legal          │
│  Financial | Vendor & Supply Chain | Technology & AI                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK IDENTIFICATION (MANDATORY SOURCES)                                    │
│    • Architecture & design reviews                                          │
│    • Incidents & near-misses                                                │
│    • Vulnerability & security assessments                                   │
│    • Audits & compliance reviews                                            │
│    • Vendor assessments                                                     │
│    • Change management & new initiatives                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK ASSESSMENT MODEL                                                      │
│    • Likelihood (1–5) x Impact (1–5)                                        │
│    • Inherent risk (before controls)                                        │
│    • Residual risk (after controls)                                         │
│                                                                             │
│  Severity Bands:                                                            │
│    1–4  Low       → Monitor                                                 │
│    5–9  Medium    → Mitigate                                                │
│    10–16 High     → Escalate                                                │
│    17–25 Critical → Immediate executive oversight                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK TREATMENT STRATEGIES                                                  │
│    • Avoid    — eliminate source                                            │
│    • Mitigate — reduce likelihood/impact                                    │
│    • Transfer — insurance/contractual shift                                 │
│    • Accept   — explicit, documented, approved                              │
│                                                                             │
│  Treatment rationale MUST be recorded.                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK ACCEPTANCE RULES                                                      │
│    • Acceptance MUST be explicit and documented                             │
│    • Above-tolerance acceptance requires executive approval                 │
│    • Accepted risks REQUIRE periodic review                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  RISK REGISTER (AUTHORITATIVE)                                              │
│  MUST include:                                                              │
│    • Risk description & category                                            │
│    • Inherent & residual scores                                             │
│    • Risk owner & controls                                                  │
│    • Acceptance status & approvals                                          │
│    • Review dates & status                                                  │
│                                                                             │
│  Centralized. Controlled. Auditable.                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  MONITORING & KRIs                                                          │
│    • Key Risk Indicators (KRIs) REQUIRED                                    │
│    • Thresholds defined per risk                                            │
│    • Continuous monitoring                                                  │
│    • Breach triggers escalation                                             │
│                                                                             │
│  KRI catalog governed by 6.2 Metrics & Dashboards Standard                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  REPORTING & ESCALATION                                                     │
│    • Executive risk summaries                                               │
│    • Board-level reporting (where applicable)                               │
│    • Incident-driven updates                                                │
│    • Audit-ready evidence                                                   │
│                                                                             │
│  Threshold breaches REQUIRE escalation                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  STANDARDS INTEGRATION                                                      │
│  ERM is the unifying risk lens across:                                      │
│  Security | Privacy | Architecture | Vendor Risk | AI Ethics | Metrics      │
│  Standards MUST align to ERM posture                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  EXCEPTIONS & VIOLATIONS                                                    │
│    • Deviations require formal approval                                     │
│    • Undocumented acceptance is prohibited                                  │
│    • Violations may trigger corrective action                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  REVIEW & MAINTENANCE                                                       │
│    • Annual review MINIMUM                                                  │
│    • Executive approval REQUIRED for changes                                │
│    • Material changes trigger immediate review                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  OUTCOME                                                                    │
│    • Predictable, auditable risk posture                                    │
│    • Early risk detection                                                   │
│    • Decision-driven governance                                             │
│    • No silent or unmanaged risk                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```


```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CYBERCUBE ERM — SCORABLE COMPLIANCE MATRIX (0–5)                          │
│  Dimensions: R1–R9 | Scale: 0–5 | Max: 45 points (9 x 5)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SCORING SCALE                                                              │
│  0 = Not defined / unmanaged                                                │
│  1 = Defined but unused                                                     │
│  2 = Partially applied, informal                                            │
│  3 = Implemented, baseline compliant                                        │
│  4 = Measured, reviewed, minor gaps                                         │
│  5 = Embedded, proactive, executive-grade                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  R1 — RISK GOVERNANCE & ACCOUNTABILITY                                      │
│  Criteria:                                                                  │
│    • Executive ownership and oversight                                      │
│    • Named risk owners and control owners                                   │
│    • Defined risk appetite and tolerance                                    │
│  0–1: No ownership or unclear accountability                                │
│  2–3: Roles defined, weak enforcement                                       │
│  4–5: Clear ownership, executive oversight                                  │
│  Evidence: Org charts, approvals, risk ownership records                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  R2 — ENTERPRISE SCOPE & INTEGRATION                                        │
│  Criteria:                                                                  │
│    • Applies across business units, systems, lifecycle                      │
│    • Integrated with SDLC and operations                                    │
│    • Covers internal and third-party risk                                   │
│  0–1: Isolated or siloed risk handling                                      │
│  2–3: Broad scope, uneven integration                                       │
│  4–5: Fully enterprise-wide and lifecycle-integrated                        │
│  Evidence: SDLC mappings, policy references                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  R3 — RISK IDENTIFICATION DISCIPLINE                                        │
│  Criteria:                                                                  │
│    • Defined identification sources                                         │
│    • Proactive discovery (design, audits, incidents)                        │
│    • Coverage of all risk categories                                        │
│  0–1: Reactive only                                                         │
│  2–3: Periodic identification                                               │
│  4–5: Continuous, forward-looking                                           │
│  Evidence: Review logs, audit findings                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  R4 — RISK ASSESSMENT METHODOLOGY                                           │
│  Criteria:                                                                  │
│    • Likelihood x Impact scoring                                            │
│    • Inherent vs residual risk                                              │
│    • Severity thresholds with actions                                       │
│  0–1: Subjective or undocumented                                            │
│  2–3: Scoring exists, inconsistently applied                                │
│  4–5: Consistent, decision-driving                                          │
│  Evidence: Risk matrices, scoring records                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  R5 — RISK TREATMENT & ACCEPTANCE                                           │
│  Criteria:                                                                  │
│    • Avoid / Mitigate / Transfer / Accept defined                           │
│    • Acceptance thresholds enforced                                         │
│    • Executive approval for high-risk acceptance                            │
│  0–1: Risks ignored or implicitly accepted                                  │
│  2–3: Treatments applied, weak approvals                                    │
│  4–5: Formal, disciplined treatment                                         │
│  Evidence: Treatment plans, approvals                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  R6 — RISK REGISTER & DOCUMENTATION                                         │
│  Criteria:                                                                  │
│    • Centralized, controlled Risk Register                                  │
│    • Owners, controls, status, review dates                                 │
│    • Auditable and traceable                                                │
│  0–1: No central register                                                   │
│  2–3: Register exists, incomplete                                           │
│  4–5: Authoritative, current                                                │
│  Evidence: Risk register, CMDB links                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  R7 — MONITORING & KRIs                                                     │
│  Criteria:                                                                  │
│    • Defined KRIs with thresholds                                           │
│    • Continuous monitoring                                                   │
│    • Early warning capability                                               │
│  0–1: No indicators                                                         │
│  2–3: Indicators defined, weak follow-up                                    │
│  4–5: Proactive, automated monitoring                                       │
│  Evidence: KRI dashboards, alerts                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  R8 — REPORTING & ESCALATION                                                │
│  Criteria:                                                                  │
│    • Executive and board-level reporting                                    │
│    • Threshold-based escalation                                             │
│    • Incident-driven updates                                                │
│  0–1: No formal reporting                                                   │
│  2–3: Reports exist, slow escalation                                        │
│  4–5: Timely, decision-oriented                                             │
│  Evidence: Risk reports, escalation logs                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  R9 — STANDARDS & POLICY ALIGNMENT                                          │
│  Criteria:                                                                  │
│    • ERM integrated with security, privacy, AI, vendor standards            │
│    • Single risk lens across policies                                       │
│    • Traceable cross-references                                             │
│  0–1: Policies disconnected                                                 │
│  2–3: Partial alignment                                                     │
│  4–5: Unified governance fabric                                             │
│  Evidence: Policy cross-maps                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  THRESHOLDS                                                                 │
│  >=40  → Enterprise Risk Mature                                             │
│  32–39 → Managed with minor gaps                                            │
│  24–31 → Elevated risk posture                                              │
│  <24   → Unacceptable risk exposure                                         │
│                                                                             │
│  HARD FAIL CONDITIONS                                                       │
│  R1 < 3 → No accountable ownership                                         │
│  R4 < 3 → No reliable risk scoring                                          │
│  R7 < 3 → No early warning capability                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
