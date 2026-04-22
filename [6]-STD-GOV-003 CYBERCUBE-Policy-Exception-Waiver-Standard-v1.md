# CYBERCUBE Policy Exception & Waiver Standard (v1)

**Standard ID:** STD-GOV-003  
**Status:** Active  
**Effective:** 2026-02-01  
**Classification:** INTERNAL  
**Owner:** Governance / Executive Leadership  
**Approver:** CEO  
**Applies to:** All CYBERCUBE policies, standards, controls, personnel, contractors, and third parties  
**Review Cycle:** Annual + after any major policy framework change

---

## 1. Purpose

This standard defines a controlled, transparent, and auditable mechanism for requesting, approving, tracking, and revoking temporary exceptions or waivers to CYBERCUBE policies and standards.

Deviations from approved controls must be:
- **Explicit**, not implicit
- **Risk-assessed**, not ignored
- **Time-bound**, not permanent
- **Visible** to governance, audit, and risk management

Exceptions are a governance safety valve, not a workaround mechanism.

---

## 2. Scope

This standard applies to:
- All CYBERCUBE policies, standards, and governance artifacts
- All systems, processes, products, and environments
- All personnel, contractors, and third parties operating under CYBERCUBE authority

Exceptions may apply to specific controls or requirements, but **never** to the policy framework as a whole.

---

## 3. Guiding Principles

| Principle | Description |
|-----------|-------------|
| **No silent non-compliance** | All deviations must be documented |
| **Risk-first** | Every exception includes a risk assessment |
| **Temporary by default** | Exceptions are time-limited with defined maximums |
| **Accountable** | Every exception has a named owner |
| **Auditable** | Exceptions are reviewable by internal and external auditors |
| **Minimize scope** | Exceptions cover the narrowest possible scope |

---

## 4. Definitions

| Term | Definition |
|------|------------|
| **Exception** | Temporary deviation from a specific policy or standard requirement |
| **Waiver** | Formal approval to not meet a requirement for a defined period |
| **Control Owner** | Owner of the affected policy or standard |
| **Exception Owner** | Person accountable for managing the exception through its lifecycle |
| **Compensating Control** | Alternative measure that reduces risk when the primary control is not met |
| **Residual Risk** | Risk remaining after compensating controls are applied |
| **Exception ID** | Unique identifier in format `EXC-{YYYY}-{NNN}` (e.g., `EXC-2026-001`) |

---

## 5. Eligibility & Restrictions

### 5.1 Eligible Exceptions

Exceptions may be considered for:
- Legacy systems with active remediation plans
- Temporary operational constraints (e.g., resource limitations, vendor dependencies)
- Transitional states during approved change initiatives
- Technical debt with documented migration timelines
- Third-party limitations outside CYBERCUBE's direct control

### 5.2 Non-Eligible Exceptions

The following **cannot** be waived under any circumstances:
- Legal or regulatory obligations (GDPR, state breach laws, contractual mandates)
- Fundamental security principles (authentication, authorization, encryption at rest)
- Explicit contractual commitments without Legal approval
- Data Classification Standard (3.3) requirements for Confidential/Restricted data
- Incident Response Standard (4.3) core response procedures

---

## 6. Exception Request Process

### 6.1 Request Requirements

All exception requests must include every field in the Exception Request Template (§6.4).

### 6.2 Risk Assessment

Each request must assess:
- **Likelihood** and **impact** of the deviation
- **Data sensitivity** involved (per Data Classification Standard 3.3)
- **Customer and regulatory exposure**
- **Alignment with risk appetite** (per Enterprise Risk Management Policy)

Risk is scored on a 4-level scale:

| Risk Level | Criteria |
|------------|----------|
| **Low** | No customer impact, no data exposure, internal tooling only |
| **Medium** | Limited customer impact, no sensitive data, workaround available |
| **High** | Customer-facing impact, sensitive data involved, SLA risk |
| **Critical** | Regulatory exposure, PII/confidential data, breach risk |

### 6.3 Emergency / Expedited Exceptions

When a deviation is needed urgently (e.g., during an active incident or time-critical operational need):

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Verbal approval from Control Owner + Executive Leadership | Immediate |
| 2 | Implement deviation with compensating controls | Immediate |
| 3 | File formal exception request in registry | Within 48 hours |
| 4 | Complete full risk assessment | Within 5 business days |
| 5 | Obtain written approval or remediate | Within 5 business days |

Emergency exceptions that are not formalized within 48 hours are treated as unauthorized deviations (§11).

Cross-references:
- Incident Response break-glass: Incident Response Standard (4.3)
- IaC emergency changes: Infrastructure as Code Standard (5.4 §2.5)

### 6.4 Exception Request Template

```markdown
# Exception Request: EXC-{YYYY}-{NNN}

**Requested By:** [Name, Role]
**Date Submitted:** [YYYY-MM-DD]

## Policy Reference
- **Policy/Standard:** [e.g., Infrastructure as Code Standard (5.4)]
- **Specific Requirement:** [e.g., §3.1.1 — All production infrastructure managed via IaC]
- **Section/Control ID:** [If applicable]

## Business Justification
[Why this exception is needed. What business outcome requires it.]

## Scope
- **Systems affected:** [List specific systems, services, or environments]
- **Data involved:** [Classification level per Data Classification Standard 3.3]
- **Users/teams affected:** [Who is impacted]
- **Environments:** [dev/staging/production]

## Duration
- **Requested start date:** [YYYY-MM-DD]
- **Requested end date:** [YYYY-MM-DD — must not exceed maximum per §7.3]
- **Remediation plan:** [How and when full compliance will be achieved]

## Risk Assessment
- **Inherent risk (without controls):** [Low / Medium / High / Critical]
- **Compensating controls:** [Specific measures — see §6.5 for guidance]
- **Residual risk (with compensating controls):** [Low / Medium / High / Critical]
- **Customer impact:** [None / Degraded / Significant]
- **Regulatory exposure:** [None / Possible / Likely]

## Monitoring Plan
- **How will compensating controls be monitored?** [Describe]
- **Review cadence:** [Weekly / Monthly — per §7.3]
- **Who monitors?** [Exception Owner name]

## Approval
- **Control Owner:** [Name] — Approve / Reject — Date
- **Governance Lead:** [Name, if Medium+] — Approve / Reject — Date
- **Executive:** [Name, if High/Critical] — Approve / Reject — Date
- **Legal:** [Name, if Critical] — Approve / Reject — Date
```

### 6.5 Compensating Controls Guidance

Compensating controls must:
- **Address the same risk** that the original control mitigates
- **Be documented** with clear implementation details
- **Be monitorable** — the Exception Owner must be able to verify they are operating
- **Be proportionate** to the risk level of the exception

Examples by category:

| Original Control | Compensating Control Example |
|-----------------|------------------------------|
| IaC-managed infrastructure | Manual change log + weekly audit + 24h backport SLA |
| Automated security scanning | Manual security review per PR + quarterly penetration test |
| Encrypted storage | Network isolation + enhanced access controls + audit logging |
| Automated backup | Manual backup procedure + verified restore test |
| Peer code review | Senior engineer self-review + post-merge audit within 48h |

Compensating controls that are weaker than the original control require **one risk level higher** approval authority.

---

## 7. Review & Approval

### 7.1 Approval Authority

| Risk Level | Approval Required | Decision SLA |
|------------|-------------------|--------------|
| **Low** | Control Owner | 10 business days |
| **Medium** | Governance Lead | 5 business days |
| **High** | Executive Leadership | 2 business days |
| **Critical** | Executive Leadership + Legal | 2 business days |

If the decision SLA is not met, the request escalates to the next approval tier.

### 7.2 Approval Conditions

All approved exceptions must define:
- Explicit expiration date (within maximum duration per §7.3)
- Required compensating controls (per §6.5)
- Monitoring and review cadence
- Conditions that trigger immediate revocation
- Remediation plan with target completion date

**Approval is invalid without a defined end date.**

### 7.3 Maximum Exception Duration

| Risk Level | Maximum Duration | Review Cadence | Maximum Renewals |
|------------|-----------------|----------------|------------------|
| **Low** | 180 days | Quarterly | 2 |
| **Medium** | 90 days | Monthly | 1 |
| **High** | 30 days | Bi-weekly | 1 (Executive re-approval) |
| **Critical** | 14 days | Weekly | 0 (must remediate or escalate) |

Exceptions exceeding maximum renewals require a formal remediation plan approved by Executive Leadership, or the exception is revoked and the deviation becomes a policy violation.

---

## 8. Exception Registry & Documentation

### 8.1 Exception Registry

CYBERCUBE maintains a central **Exception & Waiver Registry** containing:

| Field | Description |
|-------|-------------|
| **Exception ID** | `EXC-{YYYY}-{NNN}` |
| **Description** | Summary of the deviation |
| **Affected policy/standard** | Document ID and section reference |
| **Exception Owner** | Named individual |
| **Risk rating** | Low / Medium / High / Critical |
| **Compensating controls** | Summary of alternative measures |
| **Approval authority** | Who approved and when |
| **Effective date** | Start of exception |
| **Expiration date** | End of exception |
| **Review history** | Dates and outcomes of periodic reviews |
| **Renewal history** | If renewed: re-assessment details |
| **Status** | Active / Expired / Revoked / Remediated |

The registry is a governance-controlled artifact, accessible to:
- Governance Lead (full access)
- Internal Audit (read access)
- Control Owners (their exceptions)
- Executive Leadership (full access)

### 8.2 Registry Maintenance

- Registry is reviewed monthly by Governance Lead
- Expired exceptions are archived (retained for 3 years for audit)
- Dashboard view maintained per Metrics & Governance Dashboards Standard (6.2)

---

## 9. Monitoring, Renewal & Revocation

### 9.1 Monitoring

Exception Owners are responsible for:
- Ensuring compensating controls operate as approved
- Monitoring for changes in risk level
- Reporting material changes to Governance Lead immediately
- Completing scheduled reviews per §7.3 cadence

Monitoring failures are treated as compensating control failures and may trigger revocation.

### 9.2 Renewal

- Exceptions **do not auto-renew**
- Renewal requires full re-assessment and re-approval (same process as §6)
- Renewal requests must be submitted **at least 10 business days before expiration**
- Renewals are scrutinized more heavily than initial requests
- Each renewal must demonstrate progress toward remediation
- Maximum renewals per risk level are defined in §7.3

### 9.3 Revocation

Exceptions are revoked immediately if:
- Compensating controls fail or are not maintained
- Risk increases beyond the approved tolerance
- Expiration date is reached without renewal
- Underlying condition no longer exists
- Exception Owner leaves the organization without transfer

Revocation process:
1. Governance Lead or Control Owner issues revocation notice
2. Exception Owner has 5 business days to achieve compliance or file new exception
3. Non-compliance after revocation is a policy violation (§12)

---

## 10. Audit & Assurance Integration

- All exceptions are subject to internal audit review per Internal Audit & Assurance Standard (6.1)
- Auditors may challenge justification, scope, duration, or compensating control adequacy
- Repeated exceptions for the same control trigger a **control redesign review**
- Patterns of exceptions across teams trigger a **policy suitability assessment**

Exceptions feed directly into:
- Internal Audit & Assurance Standard (6.1) — audit findings
- Enterprise Risk Management — risk register
- Metrics & Governance Dashboards Standard (6.2) — KRI reporting

### 10.1 Governance KRIs

The following Key Risk Indicators are tracked and reported on the governance dashboard:

| KRI | Target | Escalation Threshold |
|-----|--------|----------------------|
| Total active exceptions | Decreasing trend | > 15 active exceptions |
| Overdue exceptions (past expiration, not renewed) | 0 | Any overdue > 5 days |
| High/Critical risk exceptions | Minimizing | > 3 active at any time |
| Average exception duration | Decreasing | > 90 days average |
| Renewal rate | < 30% | > 50% of exceptions renewed |
| Exceptions without completed review | 0 | Any missed review |

---

## 11. Prohibited Practices

The following are **explicitly prohibited**:

| Practice | Risk |
|----------|------|
| Undocumented exceptions | Silent non-compliance, audit failure |
| Retroactive approvals (except emergency per §6.3) | Governance bypass |
| Indefinite or open-ended waivers | Permanent non-compliance |
| Blanket exceptions covering multiple unrelated controls | Uncontrolled scope |
| Exceptions used to bypass remediation | Avoidance of compliance obligations |
| Transferring exception ownership without governance notification | Accountability gap |
| Operating under an expired exception | Unauthorized deviation |

---

## 12. Enforcement & Violations

- Unauthorized deviations constitute policy violations
- Violations are reported to the Exception Owner's manager and Governance Lead
- Repeated violations escalate to Executive Leadership
- Violation patterns are included in quarterly governance reporting

| Violation | Response |
|-----------|----------|
| First occurrence (unintentional) | Corrective action plan + formal exception filing |
| Repeated occurrence | Manager escalation + mandatory remediation timeline |
| Willful non-compliance | Executive review + potential disciplinary action |

---

## 13. Review & Maintenance

- This standard is reviewed annually by Governance Lead
- Updates require Executive Leadership approval
- Material changes to the policy framework trigger immediate review
- Feedback from audit findings is incorporated into revisions

---

## 14. Approval

This Policy Exception & Waiver Standard is approved and adopted by CYBERCUBE executive leadership and is effective as of the stated effective date.

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Internal Audit & Assurance Standard (6.1) | Audit of exceptions |
| Metrics, KRIs & Governance Dashboards Standard (6.2) | Exception KRI reporting |
| Data Classification & Retention Standard (3.3) | Data sensitivity for risk assessment |
| Privacy Handling Policy (3.2) | PII-related exceptions |
| Incident Response Standard (4.3) | Emergency break-glass cross-reference |
| Infrastructure as Code Standard (5.4) | IaC emergency change cross-reference |
| Enterprise Risk Management Policy | Risk scoring alignment |
| Standards Governance Policy | Policy framework oversight |

---

## Implementation Status

**Last Updated:** 2026-02-01  
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Exception request template | COMPLETE | Defined in §6.4 |
| Approval authority matrix | COMPLETE | Defined in §7.1 |
| Maximum duration limits | COMPLETE | Defined in §7.3 |
| Exception registry | PENDING | Select tooling (Notion/Jira) |
| Governance dashboard integration | PENDING | Align with 6.2 |
| KRI tracking & alerting | PENDING | Define dashboard views |
| Emergency exception process | COMPLETE | Defined in §6.3 |
| Audit integration | PENDING | Align with 6.1 |

### Migration Path

1. **Phase 1**: Adopt template and approval workflow for all new exceptions
2. **Phase 2**: Inventory and register existing undocumented exceptions
3. **Phase 3**: Implement registry tooling and dashboard
4. **Phase 4**: Integrate with audit and ERM processes
5. **Phase 5**: Begin KRI tracking and reporting

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-01 | Initial release — full reformat, added template, durations, SLAs, emergency process, KRIs |
