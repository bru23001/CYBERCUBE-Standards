# CYBERCUBE Internal Audit & Assurance Standard (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Internal Audit &
Assurance Standard. All definitions are normative unless stated otherwise.

### A

**Assurance**

Independent confirmation that controls are operating effectively.

Types: Reasonable assurance, limited assurance

**Audit Lead**

Person responsible for planning, executing, and reporting on a specific audit
engagement.

Authority: Full access to evidence and personnel within audit scope

**Audit Universe**

The complete inventory of auditable domains, standards, and processes within
CYBERCUBE.

Purpose: Ensures comprehensive coverage over time

### C

**CAP (Corrective Action Plan)**

A documented plan to remediate an audit finding, including specific steps, owner,
timeline, and verification method.

Requirement: Mandatory for all Critical and High findings

**Control**

A safeguard or countermeasure designed to mitigate risk or enforce policy
compliance.

Types: Preventive, detective, corrective, compensating

**Control Owner**

The individual accountable for a specific control's design, operation, and
evidence provision.

Responsibility: Evidence production and remediation execution

### E

**Evidence**

Verifiable information supporting an audit conclusion. Must be current, relevant,
traceable, and tamper-resistant.

Types: Documentation, configurations, logs, screenshots, interviews

### F

**Finding**

A gap, weakness, or deficiency identified during an audit engagement.

Classification: Critical, High, Medium, Low, Observation

### R

**Risk Acceptance**

A formal decision to accept a residual risk without further remediation, subject
to approval authority and time limits.

Requirement: Documented justification and executive approval

**Root Cause Analysis**

A systematic process to identify the underlying reason for a finding, as opposed
to its symptoms.

Requirement: Mandatory for Critical and High findings

---

# CYBERCUBE Internal Audit & Assurance Standard (v1)

**Standard ID:** STD-GOV-004
**Status:** Active
**Effective:** 2026-02-07
**Classification:** INTERNAL
**Owner:** Executive Leadership / Governance Function
**Review Cycle:** Annual + after any material organizational or regulatory change

---

## 0. Purpose & Scope

This standard defines a formal Internal Audit & Assurance framework for
CYBERCUBE that provides independent, objective assurance regarding:

- Compliance with internal policies and standards
- Effectiveness of security, operational, and governance controls
- Accuracy and completeness of risk management activities
- Readiness for external audits and regulatory reviews

Internal audit exists to validate **control reality**, not merely policy intent.

**Industry Alignment:**
- IIA (Institute of Internal Auditors) Standards
- ISO 19011 (Auditing Management Systems)
- SOC 2 Type II (Trust Services Criteria)
- NIST Cybersecurity Framework (governance functions)

**Scope:**
- All CYBERCUBE governance artifacts (policies, standards, procedures)
- All information systems, platforms, and infrastructure
- All business processes supporting product delivery and operations
- All personnel and third-party activities within CYBERCUBE's control
- Security, privacy, reliability, compliance, AI governance, vendor risk, and
  operational controls

**Out of Scope:**
- External financial audits — see external auditors
- Customer-initiated audits — see contractual audit clauses
- Penetration testing — see Security Testing Standard

**Design Principles:**

1. **Independence** — Auditors must not audit their own work
2. **Objectivity** — Findings are evidence-based and unbiased
3. **Risk-Based** — Higher-risk areas receive greater scrutiny
4. **Repeatable** — Audit methods are consistent and documented
5. **Traceable** — Findings link to specific controls and evidence
6. **Constructive** — Audits drive remediation, not blame

---

## 1. Audit Governance & Roles

### 1.1 Roles & Responsibilities

| Role | Responsibilities | Authority |
|------|------------------|-----------|
| Executive Leadership | Oversight, prioritization, escalation, risk acceptance | Final authority on audit program |
| Audit Lead / Function | Audit planning, execution, reporting, follow-up | Full access to evidence and personnel |
| Control Owners | Evidence provision, control operation, remediation | Accountable for their control domain |
| Risk Owners | Risk context, acceptance decisions, escalation | Accountable for risk treatment |
| Audited Teams | Cooperation, evidence access, corrective action | Must respond within defined timelines |

### 1.2 Independence Requirements

- Auditors MUST NOT audit controls they design or operate
- Independence may be organizational (separate reporting line) or procedural
  (rotation, peer review)
- External auditors may supplement internal audits where required
- Conflict of interest MUST be declared before engagement begins

### 1.3 Conflict of Interest Disclosure

| Scenario | Required Action |
|----------|-----------------|
| Auditor previously operated the control | Recuse; assign alternate auditor |
| Auditor reports to control owner | Escalate to executive sponsor for independence review |
| Auditor has personal relationship with audited team | Disclose; executive decides whether to reassign |
| No qualified alternate available | Document conflict; engage external auditor or peer reviewer |

---

## 2. Audit Planning & Coverage

### 2.1 Annual Audit Planning

Internal audits are planned using a risk-based methodology, informed by:

- Enterprise Risk Register (ERM)
- Incident history and near misses
- Regulatory and contractual obligations
- Prior audit findings and open CAPs
- Material system or organizational changes
- External threat landscape changes

**Minimum Cadence:**

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Annual audit plan approval | Annually (Q1) | Executive Leadership |
| Comprehensive audit cycle | Annually — all critical domains covered | Audit Lead |
| Targeted risk-based audits | Quarterly — high-risk areas | Audit Lead |
| Follow-up audits | As needed — open Critical/High CAPs | Audit Lead |
| Ad-hoc audits | On trigger — incidents, changes, requests | Audit Lead |

> **Note:** The annual audit plan MUST ensure 100% coverage of the audit universe
> over a rolling 2-year period, with critical domains audited annually.

### 2.2 Audit Universe — Domain Coverage Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUDIT UNIVERSE — CYBERCUBE DOMAINS                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CRITICAL (Audit Annually)                                                  │
│  ├── Security controls (access, encryption, monitoring)                    │
│  ├── Privacy & data protection (GDPR, CCPA, DPA)                          │
│  ├── Incident response & disaster recovery                                 │
│  ├── Change management & release controls                                  │
│  └── Vendor risk & third-party management                                  │
│                                                                             │
│  HIGH (Audit Annually or Biennially)                                       │
│  ├── Infrastructure & cloud operations (IaC, SRE)                         │
│  ├── API security & integration controls                                   │
│  ├── Business continuity readiness                                         │
│  ├── AI usage & ethics governance                                          │
│  └── Data classification & retention                                       │
│                                                                             │
│  STANDARD (Audit Biennially)                                               │
│  ├── Documentation & RFC governance                                        │
│  ├── Testing & quality assurance                                           │
│  ├── Naming & identifier compliance                                        │
│  ├── Observability & telemetry                                             │
│  └── Service level management                                              │
│                                                                             │
│  LOWER (Audit on Change or Triennially)                                    │
│  ├── Training & awareness program                                          │
│  ├── Records management                                                    │
│  ├── Policy exception & waiver process                                     │
│  └── Metrics & KRI dashboards                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Domain Coverage Tracking

| Domain | Standard(s) | Risk Tier | Audit Frequency | Last Audit | Next Audit |
|--------|-------------|-----------|-----------------|------------|------------|
| Security Controls | 2.1–2.8 | Critical | Annual | — | Q2 2026 |
| Privacy & Data | 3.1–3.8 | Critical | Annual | — | Q2 2026 |
| Incident Response | 4.3 | Critical | Annual | — | Q3 2026 |
| Backup & DR | 4.2 | Critical | Annual | — | Q3 2026 |
| Change Management | 5.7 | Critical | Annual | — | Q3 2026 |
| Vendor Risk | 7.1 | Critical | Annual | — | Q2 2026 |
| Infrastructure/SRE | 4.4, 5.4 | High | Annual | — | Q3 2026 |
| API & Integrations | 5.2, 5.3 | High | Annual | — | Q4 2026 |
| Business Continuity | 4.1 | High | Annual | — | Q3 2026 |
| AI Governance | 7.2 | High | Annual | — | Q4 2026 |
| Data Classification | 3.3 | High | Annual | — | Q2 2026 |
| Testing & QA | 5.5 | Standard | Biennial | — | 2027 |
| Release & Deploy | 5.6 | Standard | Biennial | — | 2027 |
| Documentation/RFC | 5.8 | Standard | Biennial | — | 2027 |
| Observability | 4.5 | Standard | Biennial | — | 2027 |
| Service Levels | 4.6 | Standard | Biennial | — | 2027 |
| Naming/Identifiers | 5.1 | Standard | Biennial | — | 2027 |

### 2.4 Audit Types

| Audit Type | Purpose | Typical Duration |
|------------|---------|------------------|
| Compliance Audit | Verify adherence to policies & standards | 1–2 weeks |
| Control Effectiveness Audit | Validate controls operate as designed | 1–3 weeks |
| Readiness Audit | Prepare for SOC 2 / ISO / customer audits | 2–4 weeks |
| Thematic Audit | Deep dive on a specific risk domain | 1–2 weeks |
| Follow-Up Audit | Verify remediation closure | 2–5 days |

---

## 3. Audit Lifecycle

### 3.1 Audit Phases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUDIT LIFECYCLE                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1: PLANNING (1-2 weeks before fieldwork)                            │
│  ├── Define scope, objectives, and criteria                                │
│  ├── Identify control owners and key contacts                              │
│  ├── Request preliminary evidence                                          │
│  └── Issue formal audit notification                                       │
│                                                                             │
│  PHASE 2: NOTIFICATION (2 weeks before fieldwork)                          │
│  ├── Send engagement letter to audited teams                               │
│  ├── Schedule kickoff meeting                                              │
│  ├── Share audit scope and evidence request list                           │
│  └── Confirm availability of key personnel                                 │
│                                                                             │
│  PHASE 3: FIELDWORK (1-3 weeks)                                            │
│  ├── Conduct documentation review                                          │
│  ├── Perform evidence sampling and testing                                 │
│  ├── Inspect configurations and system settings                            │
│  ├── Conduct interviews and walkthroughs                                   │
│  ├── Validate metrics and log data                                         │
│  └── Document preliminary observations                                     │
│                                                                             │
│  PHASE 4: DRAFT FINDINGS (1 week)                                          │
│  ├── Classify findings by severity                                         │
│  ├── Perform root cause analysis (Critical/High)                           │
│  ├── Share draft findings with control owners                              │
│  ├── Allow 5 business days for factual correction                          │
│  └── Incorporate valid corrections                                         │
│                                                                             │
│  PHASE 5: FINAL REPORT (1 week)                                            │
│  ├── Issue final audit report                                              │
│  ├── Distribute to stakeholders per severity                               │
│  ├── Register findings in tracking system                                  │
│  └── Initiate CAP process for Critical/High                                │
│                                                                             │
│  PHASE 6: FOLLOW-UP (Ongoing)                                              │
│  ├── Track CAP progress against SLAs                                       │
│  ├── Verify remediation with independent evidence                          │
│  ├── Escalate overdue items                                                │
│  └── Close findings when fully remediated                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Advance Notification Requirements

| Audit Type | Minimum Notice | Exception |
|------------|----------------|-----------|
| Scheduled audit | 2 weeks | — |
| Follow-up audit | 1 week | — |
| Ad-hoc / triggered audit | 48 hours | Executive-approved waiver for urgent investigations |
| Readiness audit | 3 weeks | — |

### 3.3 Evidence Requirements

Evidence must be:

- **Current** — Reflects the state during the audit period
- **Relevant** — Directly related to the control being tested
- **Tamper-resistant** — Immutable logs, signed configurations, or screenshots with timestamps
- **Traceable** — Linked to a specific control, policy, or standard section
- **Retained** — Per Records Management Policy (minimum 3 years for audit artifacts)

---

## 4. Findings & Classification

### 4.1 Finding Severity Levels

| Severity | Description | Remediation SLA | Escalation |
|----------|-------------|-----------------|------------|
| **Critical** | Control failure with immediate risk exposure | **7 calendar days** | Immediate — Executive Leadership |
| **High** | Material weakness requiring prompt remediation | **30 calendar days** | Within 48 hours — Audit Lead to Leadership |
| **Medium** | Partial control gap or inconsistency | **90 calendar days** | If overdue — Audit Lead to Control Owner's manager |
| **Low** | Improvement opportunity, no immediate risk | **180 calendar days** | If overdue — noted in next audit report |
| **Observation** | Informational, best-practice suggestion | **Next review cycle** | No escalation |

### 4.2 Root Cause Analysis

All Critical and High findings require:

- Root cause identification (not just symptom description)
- Determination of whether the root cause affects other controls
- Corrective action plan (CAP) with assigned owner and due date
- Assessment of whether compensating controls exist

### 4.3 Finding Lifecycle

```
Finding Identified
    ↓
Classified (Critical / High / Medium / Low / Observation)
    ↓
Draft shared with Control Owner (5 business days for factual correction)
    ↓
Final finding issued → CAP required (Critical / High mandatory)
    ↓
Remediation in progress → Owner implements CAP
    ↓
Verification → Audit Lead independently verifies evidence
    ↓
Closed (or Escalated if overdue / incomplete)
```

---

## 5. Corrective Actions & Assurance

### 5.1 Corrective Action Plans (CAPs)

Each CAP must include:

| Field | Requirement |
|-------|-------------|
| Finding reference | Link to specific finding ID |
| Root cause | Underlying reason for the gap |
| Remediation steps | Specific, actionable steps |
| Responsible owner | Named individual (not a team) |
| Target date | Within remediation SLA for the severity level |
| Verification method | How closure will be independently confirmed |
| Compensating controls | Interim measures if full remediation is delayed |

### 5.2 Verification & Closure

- Remediation MUST be independently verified (not self-certified)
- Closure requires evidence review by someone other than the control owner
- Partial remediation is NOT considered closure
- If a CAP target date cannot be met, a formal extension request with justification
  is required before the due date

### 5.3 Risk Acceptance Process

When a finding cannot or will not be fully remediated, a formal risk acceptance
is required.

| Criteria | Requirement |
|----------|-------------|
| **Who can accept** | Executive Leadership only (Critical/High); Control Owner's VP (Medium/Low) |
| **Documentation** | Written justification including residual risk, business rationale, compensating controls |
| **Maximum acceptance period** | 6 months for Critical; 12 months for High/Medium; 24 months for Low |
| **Re-review** | Accepted risks MUST be re-evaluated at each acceptance period expiry |
| **Tracking** | All accepted risks logged in the risk register with next review date |
| **Prohibition** | Permanent risk acceptance without periodic re-review is prohibited |

---

## 6. Reporting & Escalation

### 6.1 Audit Reports

Audit reports include:

- Executive summary
- Scope, objectives, and methodology
- Detailed findings with severity classification
- Root cause analysis (Critical/High)
- CAP assignments and timelines
- Risk impact assessment
- Positive observations (controls working well)
- Comparison with prior audit findings (repeat finding tracking)

**Distribution:**

| Severity Present | Distribution |
|-----------------|--------------|
| Critical | Executive Leadership + Board notification |
| High | Executive Leadership + relevant VP |
| Medium | Control Owner's VP + Audit Lead |
| Low / Observation | Control Owner + Audit Lead |

### 6.2 Escalation Matrix

| Trigger | Escalation To | Timeline |
|---------|---------------|----------|
| Critical finding identified | Executive Leadership | Immediate (same day) |
| High finding identified | Audit Lead → relevant VP | Within 48 hours |
| CAP overdue (Critical) | Executive Leadership | Day 1 past due |
| CAP overdue (High) | Control Owner's VP | Day 7 past due |
| CAP overdue (Medium/Low) | Noted in next audit report | Next reporting cycle |
| Repeat finding (same control, same gap) | Executive Leadership | With audit report |
| Audited team non-cooperation | Executive Leadership | Within 48 hours |

### 6.3 Audit Report Template

```markdown
## Internal Audit Report

### Engagement Information
- **Audit ID:** [AUD-YYYY-NNN]
- **Audit Type:** [Compliance / Control Effectiveness / Readiness / Thematic / Follow-Up]
- **Domain:** [Audited domain or standard]
- **Audit Lead:** [Name]
- **Audit Period:** [Start Date] — [End Date]
- **Report Date:** [Date]

### Executive Summary
[2-3 paragraph summary of scope, key findings, and overall assessment]

**Overall Assessment:** [Satisfactory / Needs Improvement / Unsatisfactory]

### Scope & Methodology
- **Standards Covered:** [List]
- **Controls Tested:** [Count]
- **Evidence Sources:** [List]
- **Sampling Approach:** [Description]

### Findings Summary

| ID | Finding | Severity | Control Owner | CAP Due | Status |
|----|---------|----------|---------------|---------|--------|
| F-001 | [Description] | [Critical/High/Med/Low/Obs] | [Name] | [Date] | [Open/In Progress/Closed] |

### Detailed Findings

#### F-001: [Finding Title]
- **Severity:** [Level]
- **Control Reference:** [Standard § Section]
- **Observation:** [What was found]
- **Expected State:** [What should be in place]
- **Evidence:** [Evidence reviewed]
- **Root Cause:** [If Critical/High]
- **Risk Impact:** [Description]
- **Recommendation:** [Suggested remediation]

### Positive Observations
- [Controls found to be effective]

### Comparison with Prior Audits
| Prior Finding | Prior Severity | Current Status | Notes |
|---------------|----------------|----------------|-------|
| | | | |

### CAP Summary
| Finding | Owner | Target Date | Verification Method |
|---------|-------|-------------|---------------------|
| | | | |

### Sign-off
- **Audit Lead:** [Name, Date]
- **Executive Sponsor:** [Name, Date]
```

---

## 7. Audit Program Metrics

### 7.1 Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| Audit universe coverage | 100% of critical domains annually | Domains audited / total critical domains |
| On-time CAP closure (Critical) | 100% within 7 days | Closed on-time / total Critical CAPs |
| On-time CAP closure (High) | 90% within 30 days | Closed on-time / total High CAPs |
| On-time CAP closure (Medium) | 80% within 90 days | Closed on-time / total Medium CAPs |
| Repeat finding rate | < 10% | Repeat findings / total findings |
| Average time to closure | < 45 days (all severities) | Sum(days to close) / total findings |
| Audit plan completion | 100% of planned audits executed | Completed / planned |
| Finding acceptance rate | < 15% of total findings | Accepted risks / total findings |

### 7.2 Reporting Cadence

| Report | Frequency | Audience |
|--------|-----------|----------|
| Individual audit reports | Per engagement | Per distribution rules above |
| Quarterly audit dashboard | Quarterly | Executive Leadership |
| Annual audit summary | Annually (Q1 for prior year) | Executive Leadership + Board |
| CAP status tracker | Monthly | Audit Lead + Control Owners |

---

## 8. Integration with CYBERCUBE Governance

This standard integrates with:

| Standard / Policy | Integration Point |
|-------------------|-------------------|
| Enterprise Risk Management (ERM) | Audit findings inform risk ratings |
| Standards Governance Policy | Audit validates standard compliance |
| Incident Response Standard | Post-incident audits validate response effectiveness |
| Vendor Risk Management Policy | Vendor control audits |
| Privacy & DPA Standards | Privacy control assurance |
| AI Usage & Ethics Policy | AI governance control validation |
| Business Continuity Plan | BCP readiness audits |
| Change Management Policy | Change control compliance audits |
| Records Management Policy | Audit artifact retention |
| Policy Exception & Waiver Standard | Waiver audit trail review |

Audit findings directly inform risk ratings and governance decisions.

---

## 9. Prohibited Practices

The following are explicitly prohibited:

- Undocumented audits (all engagements MUST produce a formal report)
- Evidence-free conclusions (all findings MUST cite verifiable evidence)
- Ignoring or suppressing findings (all findings MUST be registered)
- Self-certification without independent review
- Permanent open findings without documented risk acceptance and re-review
- Retaliation against personnel who cooperate with auditors or raise concerns
- Destruction or alteration of evidence requested during an audit

---

## 10. Record Retention

| Artifact | Retention Period | Location |
|----------|-----------------|----------|
| Audit plans | 5 years | Compliance folder |
| Audit reports | 5 years | Compliance folder |
| Evidence packages | 3 years (or per Records Management Policy, whichever is longer) | Secure audit drive |
| CAP records | 5 years | Compliance folder |
| Risk acceptance records | Lifetime of accepted risk + 3 years | Risk register |
| Audit correspondence | 3 years | Audit drive |

All audit artifacts MUST be available for external audit review upon request.

---

## 11. Review & Maintenance

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Full standard review | Annually | Audit Lead + Executive Leadership |
| Audit universe update | Annually (with new standards or org changes) | Audit Lead |
| Audit plan refresh | Quarterly | Audit Lead |
| Post-incident standard review | After any Critical finding or major incident | Audit Lead |

Updates require executive approval. Material changes trigger interim review.

---

## Implementation Status

**Last Updated:** 2026-02-07
**Plan Version:** v1

### Core Implementation

| Component | Status | Target Date | Notes |
|-----------|--------|-------------|-------|
| Standard document | COMPLETE | — | This document |
| Audit universe definition | COMPLETE | — | Section 2.2–2.3 |
| Annual audit plan (2026) | PENDING | Q1 2026 | First annual plan |
| Audit report template | COMPLETE | — | Section 6.3 |
| Finding tracking system | PENDING | Q2 2026 | Select and configure tool |
| CAP tracking process | PENDING | Q2 2026 | Integrate with finding tracker |
| Quarterly dashboard | PENDING | Q3 2026 | First dashboard after initial audits |
| First compliance audit | PENDING | Q2 2026 | Target: Security controls domain |
| Audit program metrics baseline | PENDING | Q4 2026 | After first full audit cycle |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-07 | Initial release: full rewrite to CYBERCUBE standard format with audit lifecycle, coverage matrix, remediation SLAs, report template, metrics, risk acceptance process |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Enterprise Risk Management Policy | Risk register informs audit planning |
| Standards Governance Policy | Defines standards that audit validates |
| Incident Response Standard | Post-incident audits |
| Vendor Risk Management Policy | Vendor control audits |
| Privacy & DPA Standards | Privacy assurance audits |
| AI Usage & Ethics Policy | AI governance audits |
| Business Continuity Plan | BCP readiness audits |
| Change Management Policy | Change control audits |
| Records Management Policy | Audit artifact retention rules |
| Policy Exception & Waiver Standard | Waiver audit trail |
| Metrics, KRIs & Governance Dashboards Standard | Audit metrics feed governance dashboards |
