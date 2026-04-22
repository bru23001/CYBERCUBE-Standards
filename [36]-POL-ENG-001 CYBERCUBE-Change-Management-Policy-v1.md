# CYBERCUBE Change Management Policy (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Change
Management Policy.

All definitions are normative unless stated otherwise.

### A

**Approval Authority**

Person or body authorized to approve a change request.

Varies by: Change type, risk level

**Assessment**

Evaluation of a change's risk, impact, and readiness.

Components: Risk, impact, readiness, rollback

### B

**Backout Plan**

See Rollback Plan.

**Blast Radius**

The scope of impact if a change causes problems.

Factors: Systems affected, users affected, data at risk

### C

**CAB (Change Advisory Board)**

Body responsible for reviewing and approving changes.

Composition: Cross-functional stakeholders

**Change**

Any addition, modification, or removal to IT services, systems, or
infrastructure.

Types: Standard, Normal, Emergency

**Change Calendar**

Schedule of approved and planned changes.

Purpose: Coordination, conflict avoidance

**Change Freeze**

Period during which non-emergency changes are prohibited.

Triggers: Holidays, major events, stabilization

**Change Record**

Documentation of a change request and its lifecycle.

Contains: Details, assessment, approvals, implementation, review

**Change Request (CR)**

Formal proposal to make a change.

Format: CR-YYYY-NNNNN

**CI (Configuration Item)**

Any component that needs to be managed to deliver IT services.

Examples: Servers, applications, databases, network devices

**Collision**

Conflict between changes affecting the same systems.

Prevention: Change calendar, coordination

### D

**Downtime**

Period when a service is unavailable.

Types: Planned, unplanned

### E

**Emergency Change**

Change required to resolve a critical incident or prevent imminent failure.

Process: Expedited approval, retrospective review

### F

**Failed Change**

Change that did not achieve its objectives or caused incidents.

Action: Rollback, incident, post-implementation review

**Forward Schedule of Change (FSC)**

Calendar of upcoming approved changes.

Publication: Weekly, accessible to all stakeholders

### I

**Impact**

The effect a change will have on services, users, and business.

Levels: Critical, High, Medium, Low

**Implementation Plan**

Detailed steps to execute a change.

Includes: Steps, timing, resources, verification

### M

**Maintenance Window**

Scheduled time for implementing changes.

Standard: Low-traffic periods, weekends

### N

**Normal Change**

Change that follows the full change management process.

Requires: Assessment, CAB review, approval

### P

**PIR (Post-Implementation Review)**

Assessment of a change after implementation.

Purpose: Learn, improve, close change record

**Pre-Approved Change**

See Standard Change.

### R

**RFC (Request for Change)**

Formal request document for a normal or emergency change.

Synonym: Change Request

**Risk**

Probability and impact of a change causing problems.

Assessment: Likelihood × Impact

**Rollback (also: Backout Plan)**

Reverting a change to restore previous state.

Required: Documented plan for all non-standard changes

### S

**Standard Change**

Pre-approved, low-risk, routine change.

Examples: Patching, config updates, user provisioning

**Success Criteria**

Measurable conditions indicating a change succeeded.

Defined: Before implementation

### T

**Test Plan**

Verification steps to confirm change success.

Types: Pre-deployment, post-deployment

### U

**Urgency**

How quickly a change must be implemented.

Factors: Business need, risk of delay

### W

**Window**

Time period allocated for implementing a change.

Types: Maintenance window, change window

---

# CYBERCUBE Change Management Policy (v1)

**Standard ID:** POL-ENG-001  
**Status:** Active  
**Effective:** 2026-01-17  
**Owner:** Director of Engineering  
**Next Review:** 2027-01-17  
**Classification:** INTERNAL  
**Applies to:** All changes to CYBERCUBE production systems and services

---

## 0. Purpose & Design Principles

This policy establishes the governance framework for managing changes to
CYBERCUBE's production systems, applications, and infrastructure. It ensures
changes are assessed, approved, implemented, and reviewed in a controlled
manner to minimize risk and service disruption.

**Industry Alignment:**
- ITIL 4 Change Enablement
- ISO/IEC 20000-1 (Service Management)
- ISO/IEC 27001 (Change Management Controls)
- SOC 2 Type II (Change Management)
- DevOps/SRE practices

**Design Principles:**

1. **Controlled** — All changes follow defined processes
2. **Assessed** — Risks and impacts are evaluated before approval
3. **Approved** — Appropriate authority approves each change
4. **Documented** — Complete records of all changes
5. **Reversible** — Changes can be rolled back if needed
6. **Reviewed** — Post-implementation learning

**This policy does NOT define:**
- Technical implementation details — see Release & Deployment Standard
- Incident response — see Incident Response Standard
- Architecture changes — see Architecture Governance Policy

---

## 1. Scope

### 1.1 What Constitutes a Change

This policy applies to any:

| Category | Examples |
|----------|----------|
| **Application** | Code deployments, configuration changes, feature flags |
| **Infrastructure** | Server changes, network changes, cloud resources |
| **Database** | Schema changes, data migrations, index changes |
| **Security** | Access changes, firewall rules, certificate updates |
| **Integration** | API changes, third-party connections, webhooks |
| **Platform** | Kubernetes, CI/CD pipelines, monitoring tools |

**Note:** Automated deployments via CI/CD remain subject to this policy. The
pipeline is the implementation mechanism, not an exemption from change
governance.

### 1.2 Exclusions

The following are NOT subject to this policy:

| Exclusion | Governance |
|-----------|------------|
| Development/staging environments | Team discretion |
| Documentation changes | Documentation Standard |
| Non-production data | Data governance |
| Local development | Individual responsibility |
| Incident response actions | Incident Response Standard |

### 1.3 Environments in Scope

| Environment | Change Management |
|-------------|-------------------|
| Production | Full policy applies |
| Staging | Abbreviated (team approval) |
| Development | Exempt |
| Sandbox | Exempt |

---

## 2. Change Types

### 2.1 Change Type Definitions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CHANGE TYPE OVERVIEW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     STANDARD CHANGE                                  │   │
│  │  Pre-approved, low-risk, routine                                    │   │
│  │  • Follows documented procedure                                     │   │
│  │  • No CAB review required                                           │   │
│  │  • Logged but not individually approved                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     NORMAL CHANGE                                    │   │
│  │  Follows full change process                                        │   │
│  │  • Risk assessment required                                         │   │
│  │  • CAB review required                                              │   │
│  │  • Scheduled in change window                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     EMERGENCY CHANGE                                 │   │
│  │  Expedited for critical issues                                      │   │
│  │  • Rapid assessment                                                 │   │
│  │  • Emergency CAB (eCAB) approval                                    │   │
│  │  • Retrospective full review                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Standard Changes

**Definition:** Pre-approved, low-risk changes that follow established procedures.

**Characteristics:**
- Well-understood and documented
- Low risk, limited impact
- Performed regularly
- Reversible
- Pre-approved by CAB

**Examples:**

| Standard Change | Procedure |
|-----------------|-----------|
| Security patching (approved list) | Patch management procedure |
| User account provisioning | Access management procedure |
| Password resets | Self-service or IT procedure |
| SSL certificate renewal | Certificate management procedure |
| Minor config updates (pre-defined) | Configuration procedure |
| Adding monitoring alerts | Observability procedure |
| Feature flag toggles (approved) | Feature flag procedure |

**Process:**
1. Verify change matches standard change definition
2. Follow documented procedure
3. Log change in change management system
4. No individual approval required

**Governance:**
- Standard changes are pre-approved by CAB annually
- Changes failing during implementation become Normal changes
- New standard change types require CAB approval

**Annual Standard Change Review:**
The CAB reviews the standard change catalog annually (Q1) to confirm each
entry remains low-risk, well-documented, and correctly scoped. Entries that
no longer qualify are reclassified as Normal changes. The review outcome is
recorded in CAB meeting minutes.

### 2.3 Normal Changes

**Definition:** Changes requiring assessment, approval, and scheduled implementation.

**Characteristics:**
- Medium to high impact or risk
- Not routine or pre-approved
- Requires planning and coordination
- May require maintenance window

**Examples:**

| Normal Change | Typical Risk |
|---------------|--------------|
| New feature deployment | Medium |
| Database schema migration | High |
| Infrastructure scaling | Medium |
| New integration setup | Medium-High |
| Security configuration change | High |
| Major version upgrades | High |
| Network topology changes | High |

**Process:**
1. Submit change request
2. Risk assessment
3. Impact analysis
4. CAB review
5. Approval/rejection
6. Schedule implementation
7. Implement change
8. Verify success
9. Post-implementation review

### 2.4 Emergency Changes

**Definition:** Changes required to resolve critical incidents or prevent imminent service failure.

**Characteristics:**
- Time-critical
- High urgency
- Addresses active incident or imminent risk
- Cannot wait for normal process

**Criteria for Emergency Change:**
- Active SEV-1 or SEV-2 incident
- Imminent security threat
- Critical compliance deadline
- Imminent system failure

**Process:**
1. Declare emergency change need
2. Obtain eCAB approval (verbal, documented later)
3. Implement change
4. Verify resolution
5. Document retroactively
6. Full retrospective review

**Restrictions:**
- Must not be used to bypass normal process for convenience
- Retrospective review is mandatory
- Repeated emergency changes for same issue require root cause analysis

---

## 3. Risk Classification

### 3.1 Risk Assessment Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RISK ASSESSMENT MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Likelihood                                                                 │
│       │                                                                     │
│  HIGH │  ┌─────────────┬─────────────┬─────────────┐                       │
│       │  │   MEDIUM    │    HIGH     │  CRITICAL   │                       │
│       │  │             │             │             │                       │
│  MED  │  ├─────────────┼─────────────┼─────────────┤                       │
│       │  │    LOW      │   MEDIUM    │    HIGH     │                       │
│       │  │             │             │             │                       │
│  LOW  │  ├─────────────┼─────────────┼─────────────┤                       │
│       │  │    LOW      │    LOW      │   MEDIUM    │                       │
│       │  │             │             │             │                       │
│       │  └─────────────┴─────────────┴─────────────┘                       │
│                  LOW          MED          HIGH                            │
│                           Impact                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Impact Assessment

| Level | Customer Impact | System Impact | Data Impact |
|-------|-----------------|---------------|-------------|
| **Critical** | All customers affected | Core systems down | Data loss/corruption risk |
| **High** | Many customers affected | Major feature unavailable | Sensitive data exposed |
| **Medium** | Some customers affected | Minor feature degraded | Limited data impact |
| **Low** | Few/no customers affected | No visible impact | No data impact |

### 3.3 Likelihood Assessment

| Level | Description | Indicators |
|-------|-------------|------------|
| **High** | Likely to cause issues | Untested, complex, first time, many dependencies |
| **Medium** | Possible to cause issues | Tested but complex, some dependencies |
| **Low** | Unlikely to cause issues | Well-tested, simple, no dependencies, proven procedure |

### 3.4 Risk Level Requirements

| Risk Level | Assessment | Approval | Testing | Rollback | Window |
|------------|------------|----------|---------|----------|--------|
| **Critical** | Full + Security | CAB + Executive | Full + Staging | Mandatory + Tested | Maintenance only |
| **High** | Full | CAB | Full staging | Mandatory + Tested | Scheduled |
| **Medium** | Standard | CAB or delegated | Staging | Mandatory | Scheduled |
| **Low** | Abbreviated | Team lead | Basic | Documented | Flexible |

### 3.5 Risk Factors

| Factor | Higher Risk | Lower Risk |
|--------|-------------|------------|
| **Scope** | Multiple systems | Single system |
| **Complexity** | Many moving parts | Simple change |
| **Testing** | Limited testing | Extensive testing |
| **Reversibility** | Hard to rollback | Easy rollback |
| **Experience** | First time | Done before |
| **Dependencies** | Many dependencies | No dependencies |
| **Timing** | Peak hours | Low traffic |
| **Data** | Data changes | No data changes |

---

## 4. Change Advisory Board (CAB)

### 4.1 CAB Purpose

The Change Advisory Board provides governance, oversight, and approval for
changes to production systems.

**Responsibilities:**
- Review and approve/reject normal changes
- Pre-approve standard change types
- Assess change risks and impacts
- Coordinate changes to avoid conflicts
- Review emergency changes retrospectively
- Continuous improvement of change process

### 4.2 CAB Composition

| Role | Responsibility | Required |
|------|----------------|----------|
| **CAB Chair** | Lead meetings, final decisions | Yes |
| **Engineering Lead** | Technical assessment | Yes |
| **Operations Lead** | Operational impact | Yes |
| **Security Representative** | Security assessment | Yes |
| **Product Representative** | Business impact | As needed |
| **Change Requestor** | Present change details | For their changes |
| **Subject Matter Experts** | Technical expertise | As needed |

**CAB Chair:** Director of Engineering or delegate

### 4.3 CAB Meetings

| Meeting Type | Frequency | Purpose |
|--------------|-----------|---------|
| **Scheduled CAB** | Weekly (Tuesday) | Review normal changes |
| **Emergency CAB (eCAB)** | As needed | Approve emergency changes |
| **CAB Review** | Monthly | Process improvement |

**Scheduled CAB Agenda:**
1. Review of previous changes (successes, failures)
2. Emergency changes since last meeting
3. New change requests
4. Change calendar review
5. Upcoming change freezes
6. Process improvements

### 4.4 CAB Decision Making

| Decision | Criteria |
|----------|----------|
| **Approved** | Risk acceptable, plan adequate, resources ready |
| **Approved with Conditions** | Minor issues to address before implementation |
| **Deferred** | Needs more information or planning |
| **Rejected** | Risk too high, plan inadequate, not justified |

**Quorum:** CAB Chair + 2 other members

**Voting:** Consensus preferred; Chair decides if no consensus

### 4.5 Emergency CAB (eCAB)

| Element | Requirement |
|---------|-------------|
| **Convening** | CAB Chair or delegate + 1 technical |
| **Method** | Phone, video, Slack, or in person |
| **Timeframe** | Within 30 minutes of request |
| **Documentation** | Document verbally, formalize within 24 hours |
| **Retrospective** | Full review at next scheduled CAB |

---

## 5. Change Process

### 5.1 Standard Change Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      STANDARD CHANGE PROCESS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │   IDENTIFY   │──▶│   EXECUTE    │──▶│     LOG      │                   │
│  │              │   │              │   │              │                   │
│  │ Confirm this │   │ Follow       │   │ Record in    │                   │
│  │ is a standard│   │ documented   │   │ change       │                   │
│  │ change       │   │ procedure    │   │ system       │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
│  No individual approval required — pre-approved by CAB                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Normal Change Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NORMAL CHANGE PROCESS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. REQUEST          2. ASSESS           3. REVIEW                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Submit CR    │──▶│ Risk &       │──▶│ CAB reviews  │                   │
│  │ with details │   │ impact       │   │ and decides  │                   │
│  │              │   │ assessment   │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                      ┌────────────────────────┼────────────────────┐       │
│                      │                        │                    │       │
│                      ▼                        ▼                    ▼       │
│               ┌──────────────┐        ┌──────────────┐     ┌──────────────┐│
│               │   APPROVED   │        │   DEFERRED   │     │   REJECTED   ││
│               └──────────────┘        └──────────────┘     └──────────────┘│
│                      │                        │                    │       │
│                      ▼                        ▼                    │       │
│               ┌──────────────┐        Address issues              Close   │
│               │ 4. SCHEDULE  │        and resubmit                        │
│               └──────────────┘                                            │
│                      │                                                     │
│                      ▼                                                     │
│  5. IMPLEMENT       6. VERIFY           7. REVIEW                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Execute per  │──▶│ Confirm      │──▶│ Post-impl    │                   │
│  │ plan         │   │ success      │   │ review       │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│         │                                                                  │
│         │ If failed                                                        │
│         ▼                                                                  │
│  ┌──────────────┐                                                         │
│  │   ROLLBACK   │──▶ Incident if needed                                   │
│  └──────────────┘                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Emergency Change Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EMERGENCY CHANGE PROCESS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DECLARE          2. ASSESS           3. APPROVE                        │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Emergency    │──▶│ Rapid risk   │──▶│ eCAB verbal  │                   │
│  │ declared     │   │ assessment   │   │ approval     │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  4. IMPLEMENT       5. VERIFY           6. DOCUMENT                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Execute      │──▶│ Confirm      │──▶│ Complete CR  │                   │
│  │ immediately  │   │ resolution   │   │ within 24h   │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│                                        7. RETROSPECTIVE                    │
│                                        ┌──────────────┐                   │
│                                        │ Full CAB     │                   │
│                                        │ review       │                   │
│                                        └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Change Request Submission

**Lead Times:**

| Risk Level | Minimum Lead Time |
|------------|-------------------|
| Critical | 5 business days |
| High | 3 business days |
| Medium | 2 business days |
| Low | 1 business day |
| Emergency | Immediate (with justification) |

**Submission Deadline:** Thursday 10:00 AM (2 business days before Tuesday CAB)

---

## 6. Change Request Documentation

### 6.1 Change Request Template

```markdown
## Change Request

### CR Information
- **CR Number:** CR-2026-00001
- **Title:** [Brief descriptive title]
- **Requestor:** [Name]
- **Date Submitted:** [Date]
- **Target Date:** [Implementation date]

### Change Classification
- **Change Type:** ☐ Standard ☐ Normal ☐ Emergency
- **Risk Level:** ☐ Critical ☐ High ☐ Medium ☐ Low
- **Priority:** ☐ Critical ☐ High ☐ Medium ☐ Low

### Change Details

**Description:**
[What is being changed and why]

**Business Justification:**
[Why this change is needed]

**Scope:**
- Systems affected: [List]
- Services affected: [List]
- Data affected: [Yes/No, details]

### Risk Assessment

**Impact Analysis:**
- Customer impact: [Description]
- Service impact: [Description]
- Data impact: [Description]

**Risk Factors:**
| Factor | Assessment | Mitigation |
|--------|------------|------------|
| Complexity | H/M/L | [Mitigation] |
| Testing | H/M/L | [Mitigation] |
| Dependencies | H/M/L | [Mitigation] |

**Overall Risk:** [Critical/High/Medium/Low]

### Implementation Plan

**Pre-Implementation:**
1. [Step]
2. [Step]

**Implementation Steps:**
1. [Step with timing]
2. [Step with timing]

**Post-Implementation:**
1. [Verification step]
2. [Verification step]

**Estimated Duration:** [Time]
**Maintenance Window Required:** ☐ Yes ☐ No

### Rollback Plan

**Rollback Trigger:** [Conditions that trigger rollback]

**Rollback Steps:**
1. [Step]
2. [Step]

**Rollback Duration:** [Time]
**Data Recovery:** [If applicable]

### Testing

**Test Environment:** [Where tested]
**Test Results:** [Summary or link]
**Test Sign-off:** [Name, Date]

### Success Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Resources Required

- **Personnel:** [Names/Roles]
- **Access:** [Special access needed]
- **Tools:** [Tools required]

### Communication Plan

- **Stakeholders to Notify:** [List]
- **Notification Timing:** [When]
- **Status Page Update:** ☐ Yes ☐ No

### Approvals

| Role | Name | Decision | Date |
|------|------|----------|------|
| Requestor | | Submitted | |
| Technical Review | | | |
| CAB | | | |
| Security (if required) | | | |
```

### 6.2 Required Documentation by Risk Level

| Document | Low | Medium | High | Critical |
|----------|-----|--------|------|----------|
| Change description | ✓ | ✓ | ✓ | ✓ |
| Business justification | ✓ | ✓ | ✓ | ✓ |
| Risk assessment | Abbreviated | ✓ | ✓ | ✓ |
| Impact analysis | Abbreviated | ✓ | ✓ | ✓ |
| Implementation plan | ✓ | ✓ | Detailed | Detailed |
| Rollback plan | Documented | ✓ | Tested | Tested |
| Test results | Basic | ✓ | ✓ | ✓ |
| Communication plan | Optional | ✓ | ✓ | ✓ |
| Security review | No | If security-related | ✓ | ✓ |
| Executive approval | No | No | No | ✓ |

---

## 7. Approval Authority

### 7.1 Approval Matrix

| Change Type | Risk Level | Approver |
|-------------|------------|----------|
| Standard | (Pre-approved) | No individual approval |
| Normal | Low | Team Lead |
| Normal | Medium | CAB |
| Normal | High | CAB |
| Normal | Critical | CAB + Executive |
| Emergency | Any | eCAB (retrospective full review) |

### 7.2 Delegation of Authority

| Delegator | Delegate | Scope |
|-----------|----------|-------|
| CAB Chair | Engineering Lead | Low/Medium risk |
| CAB Chair | On-call Lead | Emergency decisions |
| Executive | CAB Chair | Critical risk co-approval (specific, time-bound situations only) |

**Delegation conditions:**
- Documented in writing
- Time-limited or scope-limited
- Delegator retains accountability

### 7.3 Conflict of Interest

- Requestor may not approve their own change
- Manager may approve direct report's changes (except their own)
- Technical reviewers should not have implemented the change

---

## 8. Change Windows

### 8.1 Standard Maintenance Windows

| Window | Time (UTC) | Suitable For |
|--------|------------|--------------|
| **Primary** | Saturday 02:00-08:00 | High-risk, downtime |
| **Secondary** | Sunday 02:00-08:00 | High-risk, downtime |
| **Weekday** | Tuesday/Thursday 02:00-06:00 | Medium-risk |
| **Flexible** | Any low-traffic period | Low-risk, no downtime |

### 8.2 Window Selection by Risk

| Risk Level | Required Window |
|------------|-----------------|
| Critical | Primary or Secondary only |
| High | Primary, Secondary, or Weekday |
| Medium | Any defined window |
| Low | Flexible (avoid peak hours) |

### 8.3 Change Freeze Periods

| Period | Dates | Changes Allowed |
|--------|-------|-----------------|
| Year-end | Dec 15 - Jan 5 | Emergency only |
| Major releases | As announced | Emergency only |
| Peak events | As announced | Emergency only |

**Change Freeze Process:**
1. Announced minimum 2 weeks in advance
2. All non-emergency changes deferred
3. Emergency changes require Executive + CAB Chair approval
4. Post-freeze review of any changes made

---

## 9. Post-Implementation Review

### 9.1 PIR Requirements

| Change Type | PIR Required | Timing |
|-------------|--------------|--------|
| Standard | No (unless failed) | — |
| Normal (Low/Medium) | If failed, caused incident, or exceeded planned duration by >50% | Within 5 days |
| Normal (High/Critical) | Always | Within 5 days |
| Emergency | Always | Within 3 days |
| Failed Change | Always | Within 24 hours |

### 9.2 PIR Template

```markdown
## Post-Implementation Review

### Change Information
- **CR Number:** CR-2026-00001
- **Title:** [Title]
- **Implementation Date:** [Date]
- **Reviewer:** [Name]
- **Review Date:** [Date]

### Outcome
- ☐ Successful
- ☐ Successful with issues
- ☐ Failed (rolled back)
- ☐ Partially successful

### Implementation Summary

**Planned Duration:** [Time]
**Actual Duration:** [Time]
**Variance:** [Explanation if significant]

### Success Criteria Review

| Criterion | Met? | Notes |
|-----------|------|-------|
| [Criterion 1] | ☐ Yes ☐ No | |
| [Criterion 2] | ☐ Yes ☐ No | |

### Issues Encountered

| Issue | Impact | Resolution |
|-------|--------|------------|
| [Issue 1] | [Impact] | [How resolved] |

### Lessons Learned

**What went well:**
- [Item]

**What could be improved:**
- [Item]

**Action items:**
| Action | Owner | Due Date |
|--------|-------|----------|
| [Action] | [Name] | [Date] |

### Metrics

- **Downtime:** [Duration]
- **Incidents caused:** [Count]
- **Rollback required:** ☐ Yes ☐ No

### Sign-off

- **Reviewer:** [Name, Date]
- **Change Owner:** [Name, Date]
```

### 9.3 Failed Change Process

1. Initiate rollback immediately
2. Declare incident if customer-impacting
3. Document failure in change record
4. Mandatory PIR within 24 hours
5. Root cause analysis
6. Action items for prevention
7. Update change procedures if needed

---

## 10. Metrics & Reporting

### 10.1 Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| **Change Success Rate** | % of changes without incidents | > 95% |
| **Emergency Change Rate** | % of changes that are emergency | < 5% |
| **Change Lead Time** | Time from request to implementation | Per risk level |
| **Failed Change Rate** | % of changes requiring rollback | < 2% |
| **Change-Related Incidents** | Incidents caused by changes | Decreasing |
| **PIR Completion Rate** | % of required PIRs completed | 100% |

### 10.2 Reporting

| Report | Frequency | Audience |
|--------|-----------|----------|
| Change Calendar | Weekly | All stakeholders |
| CAB Meeting Summary | Weekly | Engineering |
| Change Metrics | Monthly | Leadership |
| Quarterly Review | Quarterly | Executive |

### 10.3 Continuous Improvement

- Monthly review of failed changes
- Quarterly process review
- Annual policy review
- Feedback incorporation from PIRs

---

## 11. Compliance & Enforcement

### 11.1 Compliance Requirements

| Requirement | Verification |
|-------------|--------------|
| All production changes logged | Automated + audit |
| Appropriate approval obtained | System-enforced |
| Documentation complete | Checklist + review |
| PIRs completed | Tracking dashboard |

### 11.2 Non-Compliance

| Violation | Response |
|-----------|----------|
| Undocumented change | Retrospective documentation + coaching |
| Unapproved change | Review with management + coaching |
| Repeated violations | Escalation to management |
| Intentional bypass | Disciplinary action |

### 11.3 Audit Trail

All changes are logged with:
- Who requested
- Who approved
- What was changed
- When implemented
- Outcome
- Any incidents

Retention: 7 years for audit purposes

---

## Quick Reference Card

Print it. Keep it handy.

### Change Types

| Type | Process | Approval |
|------|---------|----------|
| Standard | Procedure only | Pre-approved |
| Normal | Full process | CAB |
| Emergency | Expedited | eCAB |

### Risk Levels & Requirements

| Risk | Lead Time | Approval | Rollback |
|------|-----------|----------|----------|
| Critical | 5 days | CAB + Exec | Tested |
| High | 3 days | CAB | Tested |
| Medium | 2 days | CAB | Required |
| Low | 1 day | Team Lead | Documented |

### CAB Schedule

```
Scheduled CAB: Tuesday 10:00 AM
Submission Deadline: Thursday before
Emergency CAB: As needed (30 min response)
```

### Change Windows

```
Primary: Saturday 02:00-08:00 UTC
Secondary: Sunday 02:00-08:00 UTC
Weekday: Tue/Thu 02:00-06:00 UTC
```

### Emergency Change Criteria

- Active SEV-1 or SEV-2 incident
- Imminent security threat
- Critical compliance deadline
- Imminent system failure

### Key Contacts

```
CAB Chair: [Name]
eCAB Line: [Contact]
Change System: [URL]
```

---

## Implementation Status

**Last Updated:** 2026-01-17  
**Policy Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Change types defined | COMPLETE | This policy |
| CAB established | PARTIAL | Formalize membership |
| Change request system | PARTIAL | Use ticketing system |
| Approval workflow | PENDING | Implement in system |
| Change calendar | PENDING | Set up shared calendar |
| Metrics dashboard | PENDING | Build dashboard |
| Training | PENDING | Develop materials |
| Annual review process | PENDING | Schedule |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Release & Deployment Standard | Technical implementation |
| Incident Response Standard | Failed change handling |
| Architecture Governance Policy | Architectural changes |
| Security Policy | Security-related changes |
