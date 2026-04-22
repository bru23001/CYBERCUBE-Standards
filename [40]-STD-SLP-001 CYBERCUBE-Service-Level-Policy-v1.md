# CYBERCUBE Service Level Policy (v1)

> **FROZEN — MUST language suspended.** Per POL-GOV-001 §8.8 (ratified 2026-04-22), this standard's Implementation Status section is majority-PENDING. All normative MUST/SHALL clauses are temporarily downgraded to SHOULD until Implementation Status reaches majority IN-PLACE/COMPLETE. This status blocks advancement to Active per POL-GOV-001 §2.2. Lift the freeze by: (a) completing PENDING components, or (b) formally downgrading MUST language and re-submitting for review.

**Standard ID:** STD-SLP-001  
**Status:** Frozen (was: Active)  
**Effective:** 2026-01-17  
**Version:** 1.0  
**Classification:** INTERNAL (SLOs), PUBLIC (SLAs)  
**Owner:** VP Engineering  
**Approver:** CTO  
**Applies to:** All CYBERCUBE production services

---

## Table of Contents

0. [Purpose & Design Principles](#0-purpose--design-principles)
1. [Service Level Indicators (SLIs)](#1-service-level-indicators-slis)
2. [Service Level Objectives (SLOs)](#2-service-level-objectives-slos)
3. [Error Budgets](#3-error-budgets)
4. [Service Level Agreements (SLAs)](#4-service-level-agreements-slas)
5. [Service Credits](#5-service-credits)
6. [Breach Handling](#6-breach-handling)
7. [Monitoring & Reporting](#7-monitoring--reporting)
8. [SLO Lifecycle](#8-slo-lifecycle)
- [Quick Reference Card](#quick-reference-card)
- [Appendix A: Glossary](#appendix-a-glossary)

---

## 0. Purpose & Design Principles

This policy establishes the framework for defining, measuring, and managing
service levels at CYBERCUBE. It governs both internal Service Level Objectives
(SLOs) used for engineering decisions and external Service Level Agreements
(SLAs) committed to customers.

**Industry Alignment:**
- Google SRE Workbook
- ITIL 4 Service Level Management
- ISO/IEC 20000-1
- SOC 2 Type II
- Enterprise SaaS best practices

**Design Principles:**

1. **Measurable** — All service levels based on quantifiable metrics
2. **Customer-Centric** — SLIs reflect customer experience
3. **Realistic** — Targets are achievable and meaningful
4. **Actionable** — Breach triggers defined responses
5. **Transparent** — Status visible to stakeholders
6. **Balanced** — Reliability vs. velocity trade-offs explicit

**Relationship Between SLI, SLO, and SLA:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVICE LEVEL HIERARCHY                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SLI (Service Level Indicator)                                      │   │
│  │  What we measure                                                    │   │
│  │  Example: "Percentage of requests completing in < 200ms"           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SLO (Service Level Objective)                                      │   │
│  │  Internal target (stricter)                                         │   │
│  │  Example: "99.95% of requests complete in < 200ms"                 │   │
│  │  Buffer for engineering to catch issues before customer impact     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SLA (Service Level Agreement)                                      │   │
│  │  External commitment (published)                                    │   │
│  │  Example: "99.9% of requests complete in < 200ms"                  │   │
│  │  Breach → Service credits                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Key: SLO target > SLA commitment (safety buffer)                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Service Level Indicators (SLIs)

### 1.1 Core SLI Categories

| Category | Description | Measurement |
|----------|-------------|-------------|
| **Availability** | Service is up and responding | Successful requests / Total requests |
| **Latency** | Response time for requests | Percentile distribution (p50, p95, p99) |
| **Error Rate** | Requests resulting in errors | Failed requests / Total requests |
| **Throughput** | Capacity to handle load | Requests per second |
| **Durability** | Data not lost | Data objects retained / Data objects stored |
| **Freshness** | Data recency | Time since last update |

### 1.2 SLI Specifications

#### 1.2.1 Availability SLI

**Definition:** The proportion of valid requests that are served successfully.

```
Availability = (Total Requests - Failed Requests) / Total Requests × 100%
```

**What counts as "available":**
- HTTP 2xx, 3xx responses
- HTTP 4xx (client errors) — NOT counted as unavailable
- Successful API operations

**What counts as "unavailable":**
- HTTP 5xx responses
- Timeouts (> configured threshold)
- Connection failures
- Service unreachable

**Measurement points:**
- Load balancer logs (primary)
- Application metrics (secondary)
- Synthetic monitoring (tertiary)

#### 1.2.2 Latency SLI

**Definition:** The time taken to serve a request, measured at specific percentiles.

**Percentile definitions:**

| Percentile | Meaning | Use Case |
|------------|---------|----------|
| **p50** (median) | 50% of requests faster | Typical user experience |
| **p90** | 90% of requests faster | Most users' experience |
| **p95** | 95% of requests faster | Customer commitment |
| **p99** | 99% of requests faster | Worst-case monitoring |

**Measurement:**
- From request received to response sent
- Excludes network latency to/from client
- Per endpoint or aggregated

#### 1.2.3 Error Rate SLI

**Definition:** The proportion of requests resulting in errors.

```
Error Rate = Failed Requests / Total Requests × 100%
```

**Error classification:**

| Category | Examples | Counts as Error? |
|----------|----------|------------------|
| Server errors | 5xx, timeouts, crashes | Yes |
| Client errors | 4xx (bad request, auth) | No |
| Partial success | Degraded response | Configurable |
| Rate limiting | 429 responses | No (expected behavior) |

#### 1.2.4 Durability SLI

**Definition:** The probability that stored data will not be lost.

```
Durability = (Objects Stored - Objects Lost) / Objects Stored × 100%
```

**Applies to:** Databases, file storage, backups

### 1.3 SLI Implementation

```typescript
// Example SLI calculation
interface SLIConfig {
  name: string;
  type: 'availability' | 'latency' | 'error_rate' | 'throughput';
  window: '5m' | '1h' | '1d' | '30d';
  good_events_query: string;
  total_events_query: string;
  threshold?: number;  // For latency
  percentile?: number; // For latency
}

const availabilitySLI: SLIConfig = {
  name: 'api_availability',
  type: 'availability',
  window: '30d',
  good_events_query: 'sum(http_requests_total{status!~"5.."})',
  total_events_query: 'sum(http_requests_total)',
};

const latencySLI: SLIConfig = {
  name: 'api_latency_p95',
  type: 'latency',
  window: '30d',
  good_events_query: 'sum(http_request_duration_seconds_bucket{le="0.2"})',
  total_events_query: 'sum(http_request_duration_seconds_count)',
  threshold: 0.2,  // 200ms
  percentile: 95,
};
```

---

## 2. Service Level Objectives (SLOs)

### 2.1 Internal SLO Definitions

SLOs are internal targets that engineering teams use to guide reliability
investments. They should be stricter than external SLAs.

#### 2.1.1 Tiered Service Classification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVICE TIER CLASSIFICATION                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIER 1 — CRITICAL                                                         │
│  ├── Customer-facing core services                                         │
│  ├── Authentication / Authorization                                        │
│  ├── Payment processing                                                    │
│  └── Data storage (primary)                                                │
│                                                                             │
│  TIER 2 — HIGH                                                              │
│  ├── Customer-facing secondary services                                    │
│  ├── API gateway                                                           │
│  ├── Notifications                                                         │
│  └── Reporting / Analytics                                                 │
│                                                                             │
│  TIER 3 — STANDARD                                                          │
│  ├── Internal tools                                                        │
│  ├── Admin portals                                                         │
│  ├── Background jobs                                                       │
│  └── Development infrastructure                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.1.2 SLO Targets by Tier

| Metric | Tier 1 (Critical) | Tier 2 (High) | Tier 3 (Standard) |
|--------|-------------------|---------------|-------------------|
| **Availability** | 99.95% | 99.9% | 99.5% |
| **Latency (p95)** | < 200ms | < 500ms | < 2000ms |
| **Latency (p99)** | < 500ms | < 1000ms | < 5000ms |
| **Error Rate** | < 0.05% | < 0.1% | < 0.5% |

**Availability in context:**

| Target | Monthly Downtime | Annual Downtime |
|--------|------------------|-----------------|
| 99.99% | 4.3 minutes | 52.6 minutes |
| 99.95% | 21.9 minutes | 4.4 hours |
| 99.9% | 43.8 minutes | 8.8 hours |
| 99.5% | 3.6 hours | 1.8 days |
| 99% | 7.3 hours | 3.7 days |

#### 2.1.3 Service-Specific SLOs

| Service | Availability | Latency (p95) | Error Rate |
|---------|--------------|---------------|------------|
| **Web Application** | 99.95% | 200ms | 0.05% |
| **API Platform** | 99.95% | 150ms | 0.05% |
| **Authentication** | 99.99% | 100ms | 0.01% |
| **Database (Primary)** | 99.99% | 50ms | 0.01% |
| **Database (Replicas)** | 99.9% | 100ms | 0.1% |
| **File Storage** | 99.95% | 500ms | 0.05% |
| **Background Jobs** | 99.5% | N/A | 0.5% |
| **Email Delivery** | 99.9% | N/A | 0.1% |
| **Webhook Delivery** | 99.9% | N/A | 0.1% |
| **Admin Portal** | 99.5% | 500ms | 0.5% |

#### 2.1.4 Data Durability SLOs

| Data Type | Durability Target | RPO | RTO |
|-----------|-------------------|-----|-----|
| **Customer data** | 99.999999999% (11 nines) | 1 hour | 4 hours |
| **Transaction records** | 99.999999999% | 0 (synchronous) | 1 hour |
| **Audit logs** | 99.99999% (7 nines) | 1 hour | 24 hours |
| **User uploads** | 99.99999% | 1 hour | 4 hours |
| **Analytics data** | 99.999% (5 nines) | 24 hours | 48 hours |
| **Temporary data** | 99.9% | N/A | N/A |

### 2.2 SLO Measurement Window

| Window Type | Duration | Use Case |
|-------------|----------|----------|
| **Rolling** | 30 days | Primary measurement |
| **Calendar Month** | 1 month | Billing alignment |
| **Quarterly** | 3 months | Trend analysis |

**Primary measurement:** Rolling 30-day window, calculated continuously.

### 2.3 SLO Documentation Template

```markdown
## SLO Definition: [Service Name]

### Service Information
- **Service:** [Name]
- **Tier:** [1/2/3]
- **Owner:** [Team]
- **Last Review:** [Date]

### SLIs & Targets

| SLI | Target | Measurement |
|-----|--------|-------------|
| Availability | [X]% | [Query/Method] |
| Latency (p95) | [X]ms | [Query/Method] |
| Error Rate | [X]% | [Query/Method] |

### Error Budget

- **Budget (30d):** [X] minutes / [X] requests
- **Current Burn Rate:** [X]x normal
- **Budget Remaining:** [X]%

### Alerting

| Condition | Severity | Response |
|-----------|----------|----------|
| [Threshold] | [P1-P4] | [Action] |

### Dependencies

| Service | Impact if Degraded |
|---------|-------------------|
| [Service] | [Impact] |

### Review History

| Date | Change | Rationale |
|------|--------|-----------|
| [Date] | [Change] | [Why] |
```

---

## 3. Error Budgets

### 3.1 Error Budget Concept

Error budget is the acceptable amount of unreliability within a measurement
period. It quantifies how much failure is tolerable before breaching the SLO.

```
Error Budget = (1 - SLO) × Measurement Window
```

**Examples (30-day window):**

| SLO | Error Budget (Time) | Error Budget (%) |
|-----|---------------------|------------------|
| 99.99% | 4.3 minutes | 0.01% |
| 99.95% | 21.9 minutes | 0.05% |
| 99.9% | 43.8 minutes | 0.1% |
| 99.5% | 3.6 hours | 0.5% |

### 3.2 Error Budget Calculation

```typescript
interface ErrorBudget {
  service: string;
  slo_target: number;           // e.g., 0.9995 for 99.95%
  window_days: number;          // e.g., 30
  total_requests: number;       // In window
  failed_requests: number;      // In window
}

function calculateErrorBudget(budget: ErrorBudget) {
  // Total budget
  const totalBudget = (1 - budget.slo_target) * budget.total_requests;
  
  // Consumed budget
  const consumedBudget = budget.failed_requests;
  
  // Remaining
  const remainingBudget = totalBudget - consumedBudget;
  const remainingPercent = (remainingBudget / totalBudget) * 100;
  
  // Burn rate (1.0 = normal consumption)
  const expectedConsumption = consumedBudget / budget.window_days;
  const normalRate = totalBudget / budget.window_days;
  const burnRate = expectedConsumption / normalRate;
  
  return {
    total: totalBudget,
    consumed: consumedBudget,
    remaining: remainingBudget,
    remainingPercent,
    burnRate,
    daysUntilExhausted: burnRate > 0 ? remainingBudget / (consumedBudget / budget.window_days) : Infinity,
  };
}
```

### 3.3 Burn Rate Alerting

Burn rate indicates how fast error budget is being consumed relative to normal.

| Burn Rate | Meaning | Time to Exhaustion (30d budget) |
|-----------|---------|--------------------------------|
| 1x | Normal | 30 days |
| 2x | Double normal | 15 days |
| 6x | Significant issue | 5 days |
| 14.4x | Critical | 2 days |
| 36x | Severe | ~20 hours |

**Alert thresholds:**

| Alert | Burn Rate | Window | Page? |
|-------|-----------|--------|-------|
| Ticket | 2x | 72h | No |
| Warning | 6x | 6h | No |
| Critical | 14.4x | 1h | Yes |
| Emergency | 36x | 5m | Yes |

### 3.4 Error Budget Policy

#### 3.4.1 Budget Status Levels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ERROR BUDGET STATUS LEVELS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟢 GREEN — Budget > 50% remaining                                  │   │
│  │  • Normal feature development                                       │   │
│  │  • Standard change process                                          │   │
│  │  • Regular deployment cadence                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟡 YELLOW — Budget 25-50% remaining                                │   │
│  │  • Increased monitoring attention                                   │   │
│  │  • Review recent incidents                                          │   │
│  │  • Prioritize reliability improvements                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟠 ORANGE — Budget 10-25% remaining                                │   │
│  │  • Feature freeze for this service                                  │   │
│  │  • Only reliability work                                            │   │
│  │  • Reduced deployment frequency                                     │   │
│  │  • Root cause analysis required                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔴 RED — Budget < 10% remaining or exhausted                       │   │
│  │  • Complete feature freeze                                          │   │
│  │  • Emergency reliability focus                                      │   │
│  │  • No deployments except fixes                                      │   │
│  │  • Executive escalation                                             │   │
│  │  • SLA breach risk assessment                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.4.2 Actions by Budget Status

| Status | Development | Deployments | Meetings | Escalation |
|--------|-------------|-------------|----------|------------|
| 🟢 Green | Normal | Normal | Weekly SLO review | None |
| 🟡 Yellow | Continue with caution | Extra validation | Daily standup | Engineering Lead |
| 🟠 Orange | Reliability only | Reliability fixes only | Daily review | Director |
| 🔴 Red | Freeze | Emergency only | Incident mode | Executive |

#### 3.4.3 Budget Reset

- Error budget resets at the start of each measurement window
- No "banking" of unused budget
- Historical budget performance tracked for trends

---

## 4. Service Level Agreements (SLAs)

### 4.1 External SLA Commitments

SLAs are contractual commitments to customers. They must be:
- **Achievable:** Based on proven SLO performance
- **Measurable:** Using defined SLIs
- **Clear:** Unambiguous terms
- **Enforceable:** With defined consequences

**SLA Buffer:** SLA target should be at least one "nine" less than SLO.

```
Example:
  SLO: 99.95% availability
  SLA: 99.9% availability (safer commitment)
```

### 4.2 Published SLA Tiers

#### 4.2.1 Standard SLA (All Plans)

| Metric | Commitment |
|--------|------------|
| **Monthly Uptime** | 99.9% |
| **Latency (p95)** | < 500ms |
| **Data Durability** | 99.99999% |
| **Planned Maintenance** | 8 hours notice, max 4 hours/month |
| **Support Response** | Business hours |

**Monthly Uptime Calculation:**

```
Monthly Uptime % = (Total Minutes - Downtime Minutes) / Total Minutes × 100
```

#### 4.2.2 Professional SLA

| Metric | Commitment |
|--------|------------|
| **Monthly Uptime** | 99.9% |
| **Latency (p95)** | < 500ms |
| **Data Durability** | 99.99999% |
| **Planned Maintenance** | 24 hours notice, max 2 hours/month |
| **Support Response** | < 4 hours (business hours) |

#### 4.2.3 Enterprise SLA

| Metric | Commitment |
|--------|------------|
| **Monthly Uptime** | 99.9% |
| **Latency (p95)** | < 300ms |
| **Data Durability** | 99.999999999% |
| **Planned Maintenance** | 72 hours notice, max 1 hour/month |
| **Support Response** | < 1 hour (24/7) |
| **Dedicated Support** | Named contacts |

### 4.3 SLA Exclusions

The following events do NOT count against SLA calculations:

| Exclusion | Description |
|-----------|-------------|
| **Planned Maintenance** | Scheduled downtime with proper notice |
| **Customer-Caused** | Issues from customer code, configuration, or usage |
| **Force Majeure** | Natural disasters, war, government actions |
| **Third-Party** | Failures of customer's ISP, DNS, etc. |
| **Beta/Preview** | Features marked as beta or preview |
| **API Abuse** | Rate limiting due to excessive requests |
| **Security Response** | Downtime to address security threats |

### 4.4 SLA Measurement

**Measurement period:** Calendar month (UTC)

**Data source:** CYBERCUBE monitoring systems (authoritative)

**Reporting:**
- Monthly SLA report available in customer portal
- Real-time status at status.cybercube.io
- Incident reports for any service disruption

---

## 5. Service Credits

### 5.1 Credit Calculation

When SLA is breached, eligible customers receive service credits.

#### 5.1.1 Availability Credits

| Monthly Uptime | Credit (% of Monthly Fee) |
|----------------|---------------------------|
| ≥ 99.9% | 0% (within SLA) |
| 99.0% - 99.9% | 10% |
| 95.0% - 99.0% | 25% |
| 90.0% - 95.0% | 50% |
| < 90.0% | 100% |

*All plans share the same availability SLA (99.9%). Credit percentages apply
equally; absolute credit amounts scale with plan pricing.*

#### 5.1.2 Credit Calculation Example

```
Scenario:
- Plan: Enterprise (99.9% SLA)
- Monthly fee: $10,000
- Month: 30 days = 43,200 minutes
- Downtime: 60 minutes
- Uptime: (43,200 - 60) / 43,200 = 99.86%

Credit Tier: 99.0% - 99.9% → 10%
Credit Amount: $10,000 × 10% = $1,000
```

### 5.2 Credit Request Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SERVICE CREDIT PROCESS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. INCIDENT         2. REPORT           3. VALIDATE                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ SLA breach   │──▶│ Customer     │──▶│ CYBERCUBE    │                   │
│  │ occurs       │   │ submits      │   │ validates    │                   │
│  │              │   │ credit       │   │ claim        │                   │
│  │              │   │ request      │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                      ┌────────────────────────┼─────────────────┐          │
│                      │                        │                 │          │
│                      ▼                        ▼                 ▼          │
│               ┌──────────────┐        ┌──────────────┐  ┌──────────────┐  │
│               │   APPROVED   │        │   DENIED     │  │   PARTIAL    │  │
│               └──────────────┘        └──────────────┘  └──────────────┘  │
│                      │                        │                 │          │
│                      ▼                        ▼                 ▼          │
│  4. APPLY        ┌──────────────┐   Notify customer    Notify +          │
│                  │ Credit       │   with reason        apply partial     │
│                  │ applied to   │                                        │
│                  │ next invoice │                                        │
│                  └──────────────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Credit Terms

| Term | Requirement |
|------|-------------|
| **Request Window** | Within 30 days of incident |
| **Request Method** | Support ticket or portal |
| **Maximum Credit** | 100% of monthly fee (per month) |
| **Credit Form** | Applied to future invoice (no cash refunds) |
| **Exclusions** | Do not apply to excluded events |
| **Documentation** | Customer must describe impact |

### 5.4 Credit Request Template

```markdown
## Service Credit Request

**Customer:** [Company Name]
**Account ID:** [CC-CID]
**Contact:** [Name, Email]
**Date:** [Date]

### Incident Details

**Incident Date(s):** [Date/Time range]
**Service(s) Affected:** [Services]
**Duration:** [Total downtime]

**Description of Impact:**
[How the outage affected your business]

**Reference:**
- CYBERCUBE Incident ID: [If known]
- Status page link: [URL]
- Support ticket: [If applicable]

### Requested Credit

**SLA Tier:** [Standard/Professional/Enterprise]
**Monthly Fee:** [$X]
**Calculated Uptime:** [X%]
**Requested Credit:** [$X or X%]

### Supporting Information

[Any additional details, logs, or evidence]
```

---

## 6. Breach Handling

### 6.1 SLO Breach (Internal)

SLO breach = Internal target missed, SLA may still be met.

**Response Process:**

| Step | Action | Owner | Timing |
|------|--------|-------|--------|
| 1 | Detect breach | Monitoring | Automatic |
| 2 | Alert team | On-call | Immediate |
| 3 | Assess impact | Engineering | < 1 hour |
| 4 | Initiate error budget policy | Engineering Lead | < 4 hours |
| 5 | Root cause analysis | Service Owner | < 24 hours |
| 6 | Remediation plan | Service Owner | < 48 hours |
| 7 | Review at SLO meeting | Team | Weekly |

### 6.2 SLA Breach (External)

SLA breach = Contractual commitment missed, credits may apply.

**Response Process:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SLA BREACH RESPONSE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  IMMEDIATE (0-1 hour)                                                      │
│  ├── Incident response activated                                           │
│  ├── Customer communication initiated                                      │
│  ├── Status page updated                                                   │
│  └── Executive notification                                                │
│                                                                             │
│  SHORT-TERM (1-24 hours)                                                   │
│  ├── Service restored                                                      │
│  ├── Impact assessment completed                                           │
│  ├── Affected customers identified                                         │
│  └── Initial RCA started                                                   │
│                                                                             │
│  FOLLOW-UP (1-7 days)                                                      │
│  ├── Full RCA completed                                                    │
│  ├── Customer incident report published                                    │
│  ├── Credit calculations performed                                         │
│  ├── Remediation actions identified                                        │
│  └── Process improvements documented                                       │
│                                                                             │
│  LONG-TERM (1-4 weeks)                                                     │
│  ├── Remediation implemented                                               │
│  ├── Credits applied                                                       │
│  ├── SLO/SLA review                                                        │
│  └── Preventive measures deployed                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Customer Communication

#### 6.3.1 During Incident

| Stage | Communication | Channel |
|-------|---------------|---------|
| Detection | Status page update | Public |
| Ongoing | Updates every 30 min | Status page |
| Resolution | All-clear notice | Status page, email |

#### 6.3.2 Post-Incident

| Timing | Communication | Audience |
|--------|---------------|----------|
| < 24 hours | Initial incident summary | Affected customers |
| < 72 hours | Full incident report | Affected customers |
| < 7 days | Credit notification (if applicable) | Eligible customers |

#### 6.3.3 Incident Report Template

```markdown
## Incident Report: [Title]

**Incident ID:** INC-2026-00001
**Date:** [Date]
**Duration:** [X hours Y minutes]
**Severity:** [SEV-1/2/3/4]
**Services Affected:** [List]

### Summary

[Brief description of what happened and impact]

### Timeline (UTC)

| Time | Event |
|------|-------|
| HH:MM | [Event] |
| HH:MM | [Event] |

### Impact

- **Customers Affected:** [Number/Percentage]
- **Requests Failed:** [Number/Percentage]
- **Data Impact:** [None/Description]

### Root Cause

[Explanation of why the incident occurred]

### Resolution

[How the incident was resolved]

### Preventive Measures

| Action | Status | ETA |
|--------|--------|-----|
| [Action] | [In Progress/Complete] | [Date] |

### SLA Impact

- **SLA Commitment:** [X%]
- **Actual Performance:** [X%]
- **Credit Applicable:** [Yes/No]
```

### 6.4 Escalation Matrix

| Condition | Escalation | Contact |
|-----------|------------|---------|
| SLO breach (single service) | Engineering Lead | [Contact] |
| SLO breach (multiple services) | Director of Engineering | [Contact] |
| SLA at risk (< 10% buffer) | VP Engineering | [Contact] |
| SLA breach confirmed | CTO + CEO | [Contact] |
| Major SLA breach (> 1 hour) | Executive team | [Contact] |

---

## 7. Monitoring & Reporting

### 7.1 SLO Dashboard Requirements

Every service must have a dashboard showing:

| Metric | Visualization | Alert Threshold |
|--------|---------------|-----------------|
| Current SLI values | Real-time gauge | Per SLO |
| SLO compliance (30d) | Time series | < 100% |
| Error budget remaining | Gauge + trend | < 50%, 25%, 10% |
| Burn rate | Time series | 2x, 6x, 14.4x |
| Incident correlation | Timeline | Any |

### 7.2 Alerting Configuration

```yaml
# Example SLO alerting rules
groups:
  - name: slo_alerts
    rules:
      # Error budget warning
      - alert: ErrorBudgetWarning
        expr: |
          1 - (
            sum(rate(http_requests_total{status!~"5.."}[30d]))
            /
            sum(rate(http_requests_total[30d]))
          ) > 0.0005 * 0.5  # 50% of 99.95% budget consumed
        labels:
          severity: warning
        annotations:
          summary: "Error budget 50% consumed for {{ $labels.service }}"
          
      # High burn rate (will exhaust in 2 days)
      - alert: HighBurnRate
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[1h]))
            /
            sum(rate(http_requests_total[1h]))
          ) > (1 - 0.9995) * 14.4
        labels:
          severity: critical
        annotations:
          summary: "High error burn rate for {{ $labels.service }}"
```

### 7.3 Regular Reviews

| Review | Frequency | Participants | Outputs |
|--------|-----------|--------------|---------|
| SLO Standup | Weekly | Service owners | Budget status, action items |
| SLA Review | Monthly | Engineering, Product | Monthly report, trends |
| Quarterly Review | Quarterly | Leadership | Strategic adjustments |
| Annual Review | Annually | Executive | SLO/SLA target revisions |

### 7.4 Reporting

#### 7.4.1 Internal Reports

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| SLO Status | Weekly | Engineering | All SLOs, budgets, incidents |
| Error Budget | Weekly | Product | Budget consumption, feature impact |
| Reliability | Monthly | Leadership | Trends, investments, risks |

#### 7.4.2 External Reports

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| Status Page | Real-time | Public | Current status, incidents |
| SLA Report | Monthly | Customers | Uptime, latency, incidents |
| Incident Reports | Per incident | Affected customers | RCA, remediation |

---

## 8. SLO Lifecycle

### 8.1 Creating New SLOs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NEW SLO CREATION PROCESS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PROPOSE           2. MEASURE          3. BASELINE                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Identify     │──▶│ Implement    │──▶│ Collect 30   │                   │
│  │ SLIs that    │   │ measurement  │   │ days of      │                   │
│  │ matter       │   │              │   │ baseline     │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  4. SET TARGET       5. IMPLEMENT         6. ITERATE                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Define SLO   │──▶│ Dashboard,   │──▶│ Review and   │                   │
│  │ based on     │   │ alerting,    │   │ adjust       │                   │
│  │ baseline +   │   │ error        │   │ quarterly    │                   │
│  │ aspirations  │   │ budget       │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Modifying SLOs

| Reason | Process | Approval |
|--------|---------|----------|
| Tightening (more strict) | Proposal + 30-day baseline | Engineering Lead |
| Loosening (less strict) | Justification + impact analysis | Director + Product |
| New metric | Full creation process | Engineering Lead |
| Retiring | Deprecation notice, 30 days | Service Owner |

### 8.3 SLO-to-SLA Promotion

When an internal SLO should become an external SLA commitment:

1. **Demonstrate stability** — SLO met for 6+ consecutive months
2. **Buffer analysis** — Ensure SLO > SLA by appropriate margin
3. **Legal review** — Terms and credit structure
4. **Customer communication** — Announce new SLA
5. **Monitoring update** — Add SLA breach alerting

---

## Quick Reference Card

Print it. Keep it handy.

### SLI → SLO → SLA

```
SLI: What we measure
SLO: Internal target (stricter)
SLA: Customer commitment (with buffer)
```

### Availability Targets

| Tier | SLO | SLA | Monthly Budget |
|------|-----|-----|----------------|
| Critical | 99.95% | 99.9% | 22 min / 44 min |
| High | 99.9% | 99.5% | 44 min / 3.6 hr |
| Standard | 99.5% | 99% | 3.6 hr / 7.3 hr |

### Error Budget Status

| Status | Budget | Action |
|--------|--------|--------|
| 🟢 Green | > 50% | Normal |
| 🟡 Yellow | 25-50% | Caution |
| 🟠 Orange | 10-25% | Feature freeze |
| 🔴 Red | < 10% | Emergency |

### Burn Rate Alerts

| Rate | Exhaustion | Response |
|------|------------|----------|
| 2x | 15 days | Ticket |
| 6x | 5 days | Warning |
| 14.4x | 2 days | Page |
| 36x | 20 hours | Emergency |

### Service Credits

| Uptime | Credit |
|--------|--------|
| < 99.9% | 10% |
| < 99.0% | 25% |
| < 95.0% | 50% |
| < 90.0% | 100% |

### Key Contacts

```
SLO Owner: [Service team]
SLA Questions: [Support]
Status Page: status.cybercube.io
```

---

## Implementation Status

**Last Updated:** 2026-01-17  
**Policy Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| SLI definitions | COMPLETE | This policy |
| SLO targets | COMPLETE | Per service |
| SLA terms | PARTIAL | Finalize legal review |
| Error budget tracking | PENDING | Implement dashboards |
| Burn rate alerting | PENDING | Configure alerts |
| Service credits process | PENDING | Billing integration |
| Status page | PARTIAL | Enhance automation |
| Customer reporting | PENDING | Portal integration |
| Review cadence | PENDING | Schedule meetings |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Author | Engineering Operations | — | 2026-01-17 |
| Reviewer | VP Engineering | — | 2026-01-17 |
| Approver | CTO | — | 2026-01-17 |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-01-17 | Engineering Operations | Initial release |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Platform Reliability & SRE Standard | SRE practices governing this policy |
| Business Continuity Plan | RTO/RPO alignment with durability SLOs |
| Backup & Disaster Recovery Standard | Durability SLO backing infrastructure |
| Observability & Telemetry Standard | Metrics collection |
| Incident Response Standard | Breach handling |
| Change Management Policy | Change-related SLO impact |
| Customer Terms of Service | SLA legal basis |

---

## Appendix A: Glossary

This glossary defines key terms used throughout the CYBERCUBE Service Level
Policy. All definitions are normative unless stated otherwise.

| Term | Definition |
|------|------------|
| **Availability** | Proportion of time a service is operational. Formula: (Total Time - Downtime) / Total Time × 100% |
| **Alert** | Notification triggered when a metric crosses a threshold (warning or critical) |
| **Breach** | Failure to meet an SLA commitment; triggers service credits and remediation |
| **Burn Rate** | Rate at which error budget is consumed. Formula: Error Rate / (1 - SLO) |
| **Compensating Control** | Alternative measure when primary SLO cannot be met |
| **Credit** | Financial compensation for SLA breach, applied to future billing |
| **Degradation** | Partial service impairment not constituting full outage |
| **Downtime** | Period when a service is unavailable or significantly degraded (planned or unplanned) |
| **Error Budget** | Allowable unreliability within an SLO period. Formula: (1 - SLO) × Time Period |
| **Error Budget Policy** | Rules governing actions when error budget is depleted |
| **Exclusion** | Events not counted against SLA calculations (e.g., planned maintenance, force majeure) |
| **Force Majeure** | Unforeseeable circumstances preventing SLA fulfillment |
| **Incident** | Unplanned event causing service degradation or outage (SEV-1 through SEV-4) |
| **Latency** | Time taken to respond to a request, measured at p50, p90, p95, p99 |
| **MTBF** | Mean Time Between Failures. Formula: Total Uptime / Number of Failures |
| **MTTR** | Mean Time to Recovery. Formula: Total Downtime / Number of Incidents |
| **Measurement Window** | Time period over which SLIs are calculated (rolling 30 days or calendar month) |
| **Nines** | Shorthand for availability (e.g., 99.9% = "three nines", 99.99% = "four nines") |
| **Percentile** | Statistical measure for latency distribution (p50 median, p95, p99) |
| **Planned Maintenance** | Scheduled downtime for updates or improvements, per SLA notice terms |
| **RPO** | Recovery Point Objective — maximum acceptable data loss measured in time |
| **RTO** | Recovery Time Objective — maximum acceptable time to restore service |
| **Service Credit** | Compensation issued for SLA breach, per SLA terms |
| **SLA** | Service Level Agreement — contractual commitment to customers (SLOs + consequences) |
| **SLI** | Service Level Indicator — quantitative measure of service behavior |
| **SLO** | Service Level Objective — internal target for performance (stricter than SLA) |
| **Throughput** | Rate of successful operations, measured in requests per second |
| **Toil** | Repetitive, manual operational work reduced by healthy error budgets |
| **Uptime** | Time when service is available (opposite of downtime) |
