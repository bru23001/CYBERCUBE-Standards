# CYBERCUBE Metrics, Key Risk Indicators (KRIs) & Governance Dashboards Standard

**Standard ID:** STD-GOV-005
**Version:** v1.0
**Status:** Active
**Effective Date:** 2026-02-07
**Applies To:** All CYBERCUBE systems, products, services, and governance functions
**Owner:** Governance / Platform Intelligence

---

## 1. Purpose

This standard defines a formal framework for:

- Defining and managing metrics and Key Risk Indicators (KRIs)
- Translating operational and control data into decision-grade governance insight
- Ensuring leadership, governance, and audit functions have accurate, timely, and actionable visibility into CYBERCUBE's risk posture and performance

Metrics under this standard exist to drive action, not merely to observe.

---

## 2. Scope

This standard applies to:

- All CYBERCUBE platforms, applications, and infrastructure
- All governance domains (security, privacy, reliability, delivery, AI, vendors)
- All operational, risk, compliance, and performance metrics
- All dashboards used for executive, governance, or operational decision-making

This standard governs what is measured, how it is measured, and how it is used.

This standard does NOT define:

- Internal monitoring/alerting tool configuration — see Observability & Telemetry Standard
- SLO/SLA definitions — see Platform Reliability / SRE Standard and Service Level Policy
- Incident severity classification — see Incident Response Standard

---

## 3. Guiding Principles

Metrics and dashboards at CYBERCUBE are governed by the following principles:

- **Decision-oriented** — Every metric must support a decision or action
- **Risk-aware** — Metrics must map to risk or control objectives
- **Objective** — Quantifiable, reproducible, and evidence-based
- **Owned** — Each metric has a named owner role
- **Traceable** — Source systems and calculation logic are documented
- **Consistent** — Definitions do not change silently

---

## 4. Metrics Taxonomy

### 4.1 Metric Categories

CYBERCUBE metrics are classified into non-overlapping categories:

| Category | Purpose | Primary Source |
|----------|---------|----------------|
| Operational Metrics | System health, performance, capacity | Observability platform |
| Reliability Metrics | Availability, latency, error budgets | SRE / monitoring |
| Security Metrics | Auth failures, vulnerabilities, incidents | SIEM / vulnerability scanner |
| Privacy Metrics | DPIAs, DSR SLAs, data exposure events | Privacy tooling / manual |
| Quality Metrics | Test coverage, defect escape rate | CI/CD / issue tracker |
| Delivery Metrics | Lead time, deploy frequency (DORA) | CI/CD pipeline |
| Compliance Metrics | Control coverage, audit findings | Audit / GRC tooling |
| AI & Model Metrics | Drift, unsafe outputs, validation status | ML platform / manual |

### 4.2 Metric Definition Requirements

Each metric MUST document:

| Field | Required | Description |
|-------|----------|-------------|
| Metric Name | Yes | Unique, human-readable identifier |
| Description | Yes | What this metric measures and why it matters |
| Category | Yes | One of the categories in Section 4.1 |
| Calculation Logic | Yes | Formula or algorithm (reproducible) |
| Data Source(s) | Yes | Authoritative system(s) of record |
| Unit | Yes | Percentage, count, duration, ratio, etc. |
| Owner Role | Yes | Role accountable for this metric |
| Review Cadence | Yes | How often the metric definition is reviewed |
| Collection Cadence | Yes | How often the metric value is collected |
| Thresholds | Yes | Green / Amber / Red values |

Metrics without owners are non-compliant and MUST NOT appear on governance dashboards.

### 4.3 Baseline Metric Catalog

The following baseline metrics MUST be tracked. Teams MAY add domain-specific metrics following the definition requirements in Section 4.2.

**Operational Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| API Availability | Uptime % over rolling 30 days | >= 99.5% | 99.0–99.5% | < 99.0% | Real-time | Platform Engineering |
| P95 API Latency | 95th percentile response time | <= 500ms | 500–1000ms | > 1000ms | Real-time | Platform Engineering |
| Infrastructure CPU Utilization | Avg CPU across production fleet | <= 60% | 60–80% | > 80% | Hourly | Platform Engineering |
| Error Rate | 5xx responses / total requests | <= 0.5% | 0.5–2% | > 2% | Real-time | Platform Engineering |

**Reliability Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Error Budget Remaining | (1 - consumed budget) % per SLO period | >= 50% | 25–50% | < 25% | Daily | SRE |
| MTTR (Mean Time to Recover) | Avg recovery time for Sev1/Sev2 incidents | <= 1 hour | 1–4 hours | > 4 hours | Per incident | SRE |
| MTTD (Mean Time to Detect) | Avg time from onset to detection | <= 10 min | 10–30 min | > 30 min | Per incident | SRE |
| Change Failure Rate | Failed deploys / total deploys over 30 days | <= 5% | 5–15% | > 15% | Weekly | SRE |

**Security Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Critical Vulnerability Age | Avg days open for critical CVEs | <= 7 days | 7–14 days | > 14 days | Daily | Security |
| Failed Auth Rate | Failed logins / total login attempts | <= 2% | 2–10% | > 10% | Real-time | Security |
| Security Incident Count | Open Sev1/Sev2 security incidents | 0 | 1–2 | >= 3 | Daily | Security |
| Secrets Rotation Compliance | % of secrets rotated within policy window | >= 95% | 80–95% | < 80% | Weekly | Security |

**Privacy Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| DSR Response Time | Avg days to fulfill data subject requests | <= 15 days | 15–25 days | > 25 days | Per request | Privacy / Legal |
| DPIA Completion Rate | Completed DPIAs / required DPIAs | 100% | 80–99% | < 80% | Monthly | Privacy / Legal |
| Data Exposure Events | Count of unintended data exposure incidents | 0 | 1 | >= 2 | Monthly | Privacy / Legal |

**Quality Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Test Coverage | Lines covered / total lines (critical services) | >= 80% | 60–80% | < 60% | Per merge | Engineering |
| Defect Escape Rate | Prod bugs found / total bugs found | <= 5% | 5–15% | > 15% | Monthly | QA / Engineering |
| Open Critical Bugs | Count of open P1/P2 bugs > 7 days old | 0 | 1–3 | >= 4 | Weekly | Engineering |

**Delivery Metrics (DORA-aligned):**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Deployment Frequency | Deploys to production per week | >= 5/week | 1–5/week | < 1/week | Weekly | Engineering |
| Lead Time for Changes | Commit to production (median) | <= 2 days | 2–7 days | > 7 days | Weekly | Engineering |
| Change Failure Rate | (See Reliability above) | — | — | — | — | — |
| MTTR | (See Reliability above) | — | — | — | — | — |

**Compliance Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Control Coverage | Implemented controls / required controls | >= 95% | 80–95% | < 80% | Quarterly | Governance |
| Open Audit Findings | Count of open findings > 30 days | 0 | 1–3 | >= 4 | Monthly | Governance |
| Policy Exception Count | Active approved exceptions | <= 3 | 4–8 | >= 9 | Monthly | Governance |
| Training Completion Rate | Employees completed required training / total | >= 95% | 80–95% | < 80% | Quarterly | HR / Governance |

**AI & Model Metrics:**

| Metric | Calculation | Green | Amber | Red | Cadence | Owner Role |
|--------|-------------|-------|-------|-----|---------|------------|
| Model Drift Score | Distribution divergence from training baseline | <= 0.1 | 0.1–0.3 | > 0.3 | Weekly | AI / ML Engineering |
| Unsafe Output Rate | Flagged outputs / total outputs | <= 0.1% | 0.1–1% | > 1% | Daily | AI / ML Engineering |
| Model Validation Status | % of production models with current validation | 100% | 80–99% | < 80% | Monthly | AI / ML Engineering |

---

## 5. Key Risk Indicators (KRIs)

### 5.1 KRI Definition

KRIs are forward-looking indicators that signal increasing risk before incidents occur.

KRIs differ from operational metrics in that they:

- **Predict deterioration** — leading indicators, not lagging
- **Trigger escalation** — breach thresholds initiate governance action
- **Inform ERM decisions** — feed directly into the Enterprise Risk Register

### 5.2 KRI Design Rules

All KRIs MUST:

- Be mapped to an ERM risk category
- Have defined Green / Amber / Red thresholds
- Trigger predefined escalation responses at Amber and Red
- Be reviewed monthly by the metric owner and quarterly by Governance

### 5.3 KRI Registry

| KRI | ERM Risk Category | Green | Amber | Red | Escalation (Red) | Owner Role | Review |
|-----|-------------------|-------|-------|-----|-------------------|------------|--------|
| Error Budget Burn Rate | Operational / Reliability | <= 1x normal | 1x–2x normal | > 2x normal | SRE freeze + Governance review | SRE | Monthly |
| Critical Vuln Backlog Growth | Security | Declining or stable | Growing <= 10%/month | Growing > 10%/month | Security incident escalation | Security | Monthly |
| Privileged Access Growth | Security / Compliance | Stable or declining | Growing <= 5%/quarter | Growing > 5%/quarter | Access review + Governance audit | Security | Monthly |
| Failed Auth Anomaly | Security | Within baseline | 2x–5x baseline | > 5x baseline | Potential breach investigation | Security | Monthly |
| DSR SLA Breach Trend | Privacy / Legal | 0 breaches | 1 breach in quarter | >= 2 breaches in quarter | Privacy incident + regulator prep | Privacy / Legal | Monthly |
| Change Failure Trend | Delivery / Quality | Declining or stable | Growing <= 5%/month | Growing > 5%/month | Deploy freeze + retrospective | Engineering | Monthly |
| Audit Finding Aging | Compliance | All < 30 days | Any 30–60 days | Any > 60 days | Executive escalation | Governance | Monthly |
| Model Drift Acceleration | AI Risk | Stable | Increasing <= 10%/week | Increasing > 10%/week | Model validation hold | AI / ML Engineering | Monthly |
| Vendor SLA Breach Count | Vendor Risk | 0 | 1–2 in quarter | >= 3 in quarter | Vendor review + re-assessment | Vendor Management | Monthly |
| Incident Recurrence Rate | Operational | 0% same-root-cause repeat | <= 10% repeat | > 10% repeat | Post-incident program review | SRE | Monthly |

### 5.4 KRI Lifecycle

1. **Proposal** — Any team may propose a KRI via governance review
2. **Approval** — Governance approves, assigns owner, sets thresholds
3. **Active** — KRI is tracked, reported, and escalated per thresholds
4. **Review** — Monthly owner review; quarterly governance review
5. **Retirement** — Deprecated via formal governance decision with documented rationale

---

## 6. Thresholds, Status & Escalation

### 6.1 Threshold Models

Thresholds may be:

- **Static** — Fixed numeric limits (e.g., ">= 99.5% availability")
- **Dynamic** — Baseline or trend-based (e.g., "> 2x normal burn rate")

Threshold changes require governance approval and MUST be version-tracked.

### 6.2 Status States

All metrics and KRIs MUST resolve to one of three standardized states:

| State | Meaning | Visual |
|-------|---------|--------|
| Green | Within tolerance — no action required | Green indicator |
| Amber | Degrading — attention and investigation required | Yellow/amber indicator |
| Red | Threshold breached — immediate action required | Red indicator |

### 6.3 Escalation Rules

| Trigger | Action | Timeline | Responsible |
|---------|--------|----------|-------------|
| Amber | Owner notified; investigation begins | Within 24 hours | Metric Owner |
| Sustained Amber (> 7 days) | Governance review scheduled | Within 48 hours of sustained threshold | Governance |
| Red | Owner acts; ERM risk rating updated | Immediately | Metric Owner + Governance |
| Sustained Red (> 48 hours) | Executive escalation; potential incident declaration | Immediately | Governance + Executive |

All escalation actions MUST be documented in the governance log.

---

## 7. Governance Dashboards

### 7.1 Dashboard Layers

Dashboards are role-based and layered:

| Layer | Audience | Refresh Cadence | Max Metrics |
|-------|----------|-----------------|-------------|
| Executive | CEO, CTO, leadership team | Daily | 10–15 |
| Governance | Governance, compliance, audit, risk | Daily | 20–30 |
| Operational | Engineering, SRE, security, QA teams | Real-time / hourly | Unlimited (team-scoped) |

### 7.2 Dashboard Design Principles

Dashboards MUST:

- Use a single source of truth per metric
- Prioritize trends over point-in-time snapshots
- Support drill-down from summary to root cause
- Avoid metric overload (respect layer max above)
- Display RAG status for all metrics and KRIs
- Show time-series trend (minimum 90-day window)

Dashboards are governance instruments, not monitoring toys.

### 7.3 Dashboard Content Specifications

**Executive Dashboard:**

| Section | Content | Source |
|---------|---------|--------|
| Risk Posture Summary | Aggregate RAG across all KRIs | KRI Registry |
| Reliability Health | API Availability, Error Budget Remaining, MTTR | Observability / SRE |
| Security Posture | Critical Vuln Age, Incident Count, Failed Auth Rate | SIEM / vulnerability scanner |
| Delivery Velocity | Deployment Frequency, Lead Time | CI/CD pipeline |
| Compliance Status | Control Coverage, Open Audit Findings | GRC tooling |
| Trend Indicators | Month-over-month direction arrows for all KRIs | KRI Registry |

**Governance Dashboard:**

| Section | Content | Source |
|---------|---------|--------|
| Full KRI Registry | All KRIs with current status, thresholds, trend | KRI Registry |
| Compliance Detail | Control coverage by domain, exception count, training rate | GRC / Audit |
| Audit Findings | Open findings, aging, resolution trend | Audit tracking |
| Privacy Tracker | DSR SLA compliance, DPIA status, exposure events | Privacy tooling |
| AI Risk Panel | Model drift, unsafe output rate, validation status | ML platform |
| Vendor Health | Vendor SLA breaches, risk assessment status | Vendor management |
| Escalation Log | Active Amber/Red escalations with timeline | Governance log |

**Operational Dashboard:**

| Section | Content | Source |
|---------|---------|--------|
| Service Health | Availability, latency, error rate per service | Observability platform |
| Error Budgets | Per-SLO budget remaining with burn-rate trend | SRE monitoring |
| Deployment Pipeline | Deploy frequency, change failure rate, rollback count | CI/CD pipeline |
| Quality Gate | Test coverage, open critical bugs, defect escape rate | CI/CD / issue tracker |
| Incident Tracker | Active incidents, MTTD, MTTR | Incident management |
| Infrastructure | CPU utilization, memory, disk, network saturation | Infrastructure monitoring |

---

## 8. Ownership & Accountability (RACI)

### 8.1 Metric Lifecycle RACI

| Activity | Engineering | Metric Owner | Governance | Executive |
|----------|-------------|--------------|------------|-----------|
| Propose new metric | R | C | A | I |
| Define calculation & thresholds | C | R | A | I |
| Implement data collection | R | A | I | — |
| Monitor & report | R | A | I | I |
| Investigate Amber/Red | C | R | I | I (if Red) |
| Escalate to governance | — | R | A | I |
| Approve threshold changes | — | C | A | I |
| Retire metric | C | R | A | I |

**R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed

### 8.2 Owner Role Assignments

| Category | Default Owner Role |
|----------|--------------------|
| Operational Metrics | Platform Engineering Lead |
| Reliability Metrics | SRE Lead |
| Security Metrics | Security Lead |
| Privacy Metrics | Privacy / Legal Lead |
| Quality Metrics | QA / Engineering Lead |
| Delivery Metrics | Engineering Manager |
| Compliance Metrics | Governance Lead |
| AI & Model Metrics | AI / ML Engineering Lead |

Individual metric ownership MAY be delegated but the category owner retains accountability.

---

## 9. Integration with ERM & Audit

### 9.1 ERM Integration

- KRIs feed directly into the Enterprise Risk Register
- Threshold breaches (Red) trigger risk rating updates within 48 hours
- Risk acceptance decisions MUST reference current metric data
- Quarterly governance review includes KRI trend analysis

### 9.2 Audit Integration

- Metrics and dashboards serve as primary audit evidence
- Historical metric data MUST be retained for audit purposes (see Section 11)
- Calculation logic MUST be documented and reproducible
- Dashboard snapshots are captured at each governance review for the audit trail

---

## 10. Data Integrity & Controls

- Metric sources MUST be authoritative systems of record
- Manual data manipulation is prohibited unless documented and approved
- Metric data pipelines are subject to access control (least privilege)
- Changes to metric calculation logic are version-controlled and require governance approval
- Automated collection is preferred; manual collection MUST be flagged and reviewed quarterly

---

## 11. Data Retention

| Data Type | Retention Period | Purpose |
|-----------|-----------------|---------|
| Raw metric values | 1 year | Operational trend analysis |
| Aggregated metric values | 3 years | Audit evidence, governance reporting |
| KRI status history | 3 years | ERM analysis, audit trail |
| Dashboard snapshots | 3 years | Governance review evidence |
| Metric definition change log | Indefinite | Traceability and reproducibility |
| Escalation records | 3 years | Audit evidence |

Retention periods align with the Records Management Policy.

---

## 12. Prohibited Practices

The following are explicitly prohibited:

- **Vanity metrics** — Metrics with no actionability or decision linkage
- **Ownerless metrics** — Metrics without an assigned owner role
- **Silent changes** — Modifying thresholds or calculation logic without governance approval
- **Cherry-picked reporting** — Selectively presenting favorable metrics while omitting unfavorable ones
- **Dashboard-as-RCA** — Using dashboard status to replace root cause analysis
- **Stale metrics** — Metrics not reviewed within their defined cadence (owner is non-compliant)

---

## 13. Integration with CYBERCUBE Standards

This standard integrates with:

| Standard | Integration Point |
|----------|-------------------|
| Enterprise Risk Management (ERM) Policy | KRIs feed risk register; Red triggers risk rating update |
| Observability & Telemetry Standard | Data source for operational and reliability metrics |
| Platform Reliability / SRE Standard | Error budgets, SLOs, MTTR definitions |
| Service Level Policy | SLA thresholds aligned with metric Green/Amber/Red |
| Incident Response Standard | Incident metrics (MTTD, MTTR, recurrence rate) |
| Internal Audit & Assurance Standard | Metrics as audit evidence; finding aging tracked |
| Security Standard | Security metrics and KRIs sourced from SIEM/scanner |
| Privacy Standard | DSR SLAs, DPIA tracking, exposure event counting |
| AI Usage & Ethics Policy | Model drift, unsafe output, validation metrics |
| Vendor Risk Management Policy | Vendor SLA breach KRI |
| Policy Exception & Waiver Standard | Exception count metric |
| Standards Governance Policy | Metric lifecycle governance |

Metrics are the connective tissue of CYBERCUBE governance.

---

## 14. Review & Maintenance

| Activity | Cadence | Responsible |
|----------|---------|-------------|
| Individual metric review (definition + thresholds) | Quarterly | Metric Owner |
| KRI review (thresholds + escalation actions) | Monthly (owner), Quarterly (Governance) |  Metric Owner / Governance |
| Metric catalog completeness review | Quarterly | Governance |
| Dashboard content review | Quarterly | Governance |
| Standard review (this document) | Annually or upon major governance change | Governance / Executive |
| Metric retirement decisions | As needed, approved by Governance | Metric Owner / Governance |

- Retired metrics are formally deprecated with documented rationale
- New metrics undergo governance review before appearing on dashboards
- Updates to this standard require executive approval
- Material changes trigger re-validation of affected dashboards and KRI thresholds

Metrics evolve, but discipline is preserved.

---

## 15. Approval

This Metrics, KRIs & Governance Dashboards Standard is approved and adopted by CYBERCUBE executive leadership and is effective as of the stated effective date.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-02-07 | Initial release — full metric catalog, KRI registry, dashboard specs, RACI, retention |
