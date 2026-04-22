# CYBERCUBE Platform Reliability / SRE Standard (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Platform Reliability / SRE Standard.

All definitions are normative unless stated otherwise.

### A

**Availability**

The proportion of time a service is operational and serving requests correctly.

Formula: `(Good Requests / Total Requests) × 100%`

Common targets:
- 99.9% (three nines) = ~8.76 hours downtime/year
- 99.95% = ~4.38 hours downtime/year
- 99.99% (four nines) = ~52.6 minutes downtime/year

**Automation**

The replacement of manual operational tasks with programmatic execution.

Types:
- Reactive (triggered by events)
- Proactive (scheduled, preventive)
- Self-healing (autonomous remediation)

### B

**Blast Radius**

The scope of impact when a failure occurs.

Minimization strategies:
- Service isolation
- Feature flags
- Canary deployments
- Regional failover

**Blue-Green Deployment**

A release strategy using two identical production environments.

Process:
- Blue: Current production
- Green: New version
- Switch traffic atomically
- Rollback by switching back

### C

**Canary Deployment**

A release strategy that gradually routes traffic to new versions.

Stages:
- 1% → 5% → 25% → 100%
- Automated rollback on SLO breach

**Capacity Planning**

The process of determining resources needed to meet demand.

Inputs:
- Historical usage patterns
- Growth projections
- Seasonal variations
- Business events

**Chaos Engineering**

The discipline of experimenting on systems to build confidence in resilience.

Principles:
- Define steady state
- Hypothesize impact
- Run experiments
- Learn and improve

**Circuit Breaker**

A pattern preventing cascading failures by stopping requests to failing dependencies.

States:
- Closed (normal operation)
- Open (failing, reject requests)
- Half-open (testing recovery)

### D

**Degradation (Graceful)**

The ability to continue operating with reduced functionality when components fail.

Examples:
- Serve cached data when DB unavailable
- Disable non-critical features
- Show stale data with warning

**Dependency**

A service, system, or resource that another service requires to function.

Types:
- Hard dependency (required)
- Soft dependency (enhances)
- Optional dependency (nice-to-have)

**DORA Metrics**

DevOps Research and Assessment metrics measuring engineering performance.

Four key metrics:
- Deployment Frequency
- Lead Time for Changes
- Mean Time to Recovery (MTTR)
- Change Failure Rate

### E

**Error Budget**

The acceptable amount of unreliability within an SLO measurement period.

Formula: `(1 - SLO) × Time Period`

Example: 99.9% SLO over 30 days = 43.2 minutes budget

**Error Budget Policy**

Rules governing actions when error budget is depleted or at risk.

Triggers:
- < 50% remaining: increased caution
- < 25% remaining: feature freeze
- Exhausted: reliability-first mode

### F

**Failover**

The process of switching to a redundant system when the primary fails.

Types:
- Active-passive
- Active-active
- Geographic

**Fault Injection**

Deliberately introducing failures to test system resilience.

Methods:
- Network latency injection
- Service termination
- Resource exhaustion
- Clock skew

**Fault Tolerance**

The ability of a system to continue operating despite component failures.

Techniques:
- Redundancy
- Replication
- Failover
- Isolation

### G

**Golden Signals**

The four key metrics for monitoring any system (Google SRE).

Signals:
- Latency (response time)
- Traffic (demand)
- Errors (failure rate)
- Saturation (resource utilization)

### I

**Idempotency**

The property of operations that produce the same result regardless of how many times they are executed.

Importance:
- Safe retries
- At-least-once delivery
- Distributed systems reliability

### L

**Latency**

The time taken to complete an operation.

Measurements:
- p50 (median)
- p95 (95th percentile)
- p99 (99th percentile)

**Load Shedding**

Deliberately dropping requests to prevent system overload.

Strategies:
- Rate limiting
- Priority queuing
- Circuit breaking
- Backpressure

### M

**Mean Time Between Failures (MTBF)**

Average time between system failures.

Formula: `Total Uptime / Number of Failures`

Goal: Maximize

**Mean Time to Detection (MTTD)**

Average time to detect a failure after it occurs.

Formula: `Sum(Detection Times) / Number of Incidents`

Target: < 5 minutes for critical services

**Mean Time to Recovery (MTTR)**

Average time to restore service after detection.

Formula: `Sum(Recovery Times) / Number of Incidents`

Target: < 1 hour for SEV-1 incidents

### O

**Observability**

The ability to understand internal system state from external outputs.

Pillars:
- Metrics
- Logs
- Traces

### P

**Postmortem**

A documented review of an incident to prevent recurrence.

Components:
- Timeline
- Root cause analysis
- Impact assessment
- Action items

Synonym: After Action Review (AAR), Incident Review

### R

**Redundancy**

Duplication of components to improve reliability.

Levels:
- Instance (multiple replicas)
- Zone (availability zones)
- Region (geographic)

**Reliability**

The probability that a system performs its intended function correctly.

Factors:
- Availability
- Durability
- Maintainability
- Fault tolerance

**Retry**

Automatically re-attempting failed operations.

Best practices:
- Exponential backoff
- Jitter
- Maximum attempts
- Idempotent operations only

**Rollback**

Reverting to a previous known-good state.

Triggers:
- SLO breach
- Error rate spike
- Manual decision

### S

**Saturation**

The degree to which a resource is being utilized.

Thresholds:
- Warning: > 70%
- Critical: > 85%
- Emergency: > 95%

**SLI (Service Level Indicator)**

A quantitative measure of service behavior.

Core SLIs:
- Availability
- Latency
- Error rate
- Saturation

**SLO (Service Level Objective)**

A target value or range for an SLI.

Example: "99.9% of requests succeed within 200ms"

**SRE (Site Reliability Engineering)**

An engineering discipline applying software engineering to operations problems.

Focus areas:
- Reliability
- Availability
- Performance
- Efficiency

### T

**Timeout**

Maximum time to wait for an operation to complete.

Guidelines:
- Set based on p99 latency + buffer
- Different values per operation type
- Cascading timeout budgets

**Toil**

Manual, repetitive, automatable work related to running services.

Characteristics:
- Manual
- Repetitive
- Automatable
- No enduring value
- Scales with service growth

**Toil Budget**

Maximum percentage of SRE time spent on toil.

Target: ≤ 50% of capacity

---

# CYBERCUBE Platform Reliability / SRE Standard (v1.3)

**Standard ID:** STD-OPS-005  
**Status:** Active  
**Effective:** 2026-02-01 (v1), 2026-04-22 (v1.2, v1.3)  
**Classification:** INTERNAL  
**Applies to:** All CYBERCUBE platforms, services, and engineering teams

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects | **T1 MUST** | (1) Every service MUST have a declared service tier (T1-Critical / T2-Important / T3-Internal) recorded in its README or service catalog entry. (2) Every Tier-1-Critical service MUST have at least one on-call contact reachable during business hours; SEV1/SEV2 incidents MUST be paged. (3) Every Tier-1-Critical service MUST have a minimally documented runbook covering: what it does, dependencies, how to restart it, and who owns it. (4) Production changes to Tier-1-Critical services MUST follow the POL-ENG-001 change-request T1 flow with an identified rollback plan. (5) Every Tier-1-Critical service MUST have at least one health check (per STD-OPS-003 T1). | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | SLI/SLO definition per Tier-1-Critical service with error budgets, error-budget dashboards, burn-rate alerting, service catalog (canonical registry), circuit breakers / retries / timeouts on critical dependency calls, 24×5 on-call rotation, canary deployments for Tier-1-Critical releases, postmortems for all SEV1/SEV2 (per STD-OPS-004). | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | 24×7 on-call rotation, multi-region / multi-AZ redundancy, quarterly chaos/gameday exercises, toil-tracking program with ≤ 50% toil ceiling, reliability review cadence (monthly for Tier-1-Critical), executive reliability KRIs (STD-GOV-005), DR tested quarterly (STD-OPS-002 T3), 99.95%+ availability targets. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.2 (2026-04-22) — Unfreeze (Path B).** T1 = five pragmatic rules: declared service tier, business-hours on-call for Tier-1-Critical, minimal runbook, POL-ENG-001 change flow, health check. SLOs, error budgets, circuit breakers, canary, chaos reclassified to T2/T3 ROADMAP. Tight pairing with STD-SLP-001 (SLP owns SLO *values*, this standard owns SLO *enforcement practice*).

---

## 0. Purpose & Design Principles

This standard defines CYBERCUBE's Site Reliability Engineering (SRE) framework—the engineering-led reliability discipline governing availability, latency, durability, and operational excellence for all CYBERCUBE platforms and services.

**Industry Alignment:**
- Google SRE Principles & Practices
- ISO/IEC 25010 (Reliability, Availability, Maintainability)
- ISO/IEC 27001 (Operational controls)
- ITIL v4 (Service Reliability)
- SOC 2 Type II (Availability, Resilience)
- DORA Metrics (Deployment & Reliability indicators)

**Design Principles:**

1. **Reliability as a Feature** — Reliability is a product requirement, not an afterthought
2. **Data-Driven Decisions** — All reliability decisions based on SLI/SLO data
3. **Error Budgets** — Balance velocity and reliability through quantified risk tolerance
4. **Design for Failure** — Assume components will fail; build resilient systems
5. **Automation First** — Automate repetitive tasks; reduce toil
6. **Blameless Culture** — Learn from failures; focus on systems, not individuals
7. **Proactive Engineering** — Invest in reliability before incidents occur

**This Document Defines:**
- Reliability objectives and measurement (SLIs/SLOs/Error Budgets)
- Resilience engineering principles and controls
- Operational practices and toil management
- Governance and review processes

**This Document Does NOT Define:**
- Incident response procedures — see 4.3 Incident Response Standard
- Observability implementation — see 4.5 Observability & Telemetry Standard
- Release processes — see 5.6 Release & Deployment Standard
- Security controls — see 2.1 Security Policy

---

## 1. Reliability Objectives & Measurement

### 1.1 The Reliability Model

CYBERCUBE uses a three-tier reliability model aligned with Google SRE practices:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RELIABILITY MODEL                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SLI (Service Level Indicator)                                      │   │
│  │  WHAT we measure                                                    │   │
│  │  Quantitative signal of service behavior                            │   │
│  │  Example: "Proportion of requests served in < 200ms"                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SLO (Service Level Objective)                                      │   │
│  │  TARGET we aim for                                                  │   │
│  │  Target reliability objective over time                             │   │
│  │  Example: "99.9% of requests served in < 200ms over 30 days"       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Error Budget                                                        │   │
│  │  ALLOWANCE for failure                                              │   │
│  │  Acceptable unreliability = (1 - SLO)                               │   │
│  │  Example: "0.1% of requests may fail = 43 minutes/month"           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Key Principle: Error budget enables velocity vs. reliability trade-offs    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Canonical Service Level Indicators (SLIs)

**[T2]** Services SHOULD implement these four canonical SLIs (required at **[T1]** only for Tier-1-Critical services):

| SLI | Definition | Measurement | Target Range |
|-----|------------|-------------|--------------|
| **Availability** | Proportion of successful requests | `Good Requests / Total Requests` | 99.5% - 99.95% |
| **Latency** | Request response time | Percentile distribution (p50, p95, p99) | p95 < 200ms |
| **Error Rate** | Proportion of failed requests | `Failed Requests / Total Requests` | < 0.1% |
| **Saturation** | Resource utilization | CPU, memory, connections, queue depth | < 80% |

#### 1.2.1 Availability SLI Specification

**Definition:** The proportion of valid requests that are served successfully.

```
Availability = (Total Requests - Failed Requests) / Total Requests × 100%
```

**What counts as "available":**
- HTTP 2xx, 3xx responses
- Successful API operations
- Responses within timeout threshold

**What counts as "unavailable":**
- HTTP 5xx responses
- Timeouts exceeding SLO threshold
- Connection failures
- Service unreachable

**Measurement points:**
- Primary: Load balancer / API gateway
- Secondary: Application metrics
- Tertiary: Synthetic monitoring

#### 1.2.2 Latency SLI Specification

**Definition:** The time taken to serve a request, measured at specific percentiles.

| Percentile | Description | Use Case |
|------------|-------------|----------|
| **p50** | Median (50% faster) | Typical experience |
| **p90** | 90% faster | Most users' experience |
| **p95** | 95% faster | SLO target |
| **p99** | 99% faster | Worst-case monitoring |

**Measurement scope:**
- From request received to response sent
- Excludes client network latency
- Per endpoint and aggregated

#### 1.2.3 Error Rate SLI Specification

**Definition:** The proportion of requests resulting in errors.

```
Error Rate = Failed Requests / Total Requests × 100%
```

| Category | Examples | Counts as Error? |
|----------|----------|------------------|
| Server errors | 5xx, timeouts, crashes | Yes |
| Client errors | 4xx (bad request, auth) | No |
| Rate limiting | 429 responses | No (expected) |
| Partial success | Degraded response | Configurable |

#### 1.2.4 Saturation SLI Specification

**Definition:** The degree to which a resource is being utilized.

| Resource | Warning | Critical | Emergency |
|----------|---------|----------|-----------|
| CPU | > 70% | > 85% | > 95% |
| Memory | > 75% | > 90% | > 95% |
| Connections | > 70% | > 85% | > 95% |
| Disk | > 80% | > 90% | > 95% |
| Queue Depth | > 100 | > 500 | > 1000 |

### 1.3 Service Level Objectives (SLOs)

#### 1.3.1 Service Tier Classification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVICE TIER CLASSIFICATION                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIER 1 — CRITICAL                                                         │
│  ├── Customer-facing core platform                                         │
│  ├── Authentication / Authorization                                        │
│  ├── Payment processing                                                    │
│  ├── Primary databases                                                     │
│  └── Core API services                                                     │
│                                                                             │
│  TIER 2 — HIGH                                                             │
│  ├── Customer-facing secondary services                                    │
│  ├── API gateway                                                           │
│  ├── Notifications / Webhooks                                              │
│  ├── Reporting / Analytics                                                 │
│  └── Search functionality                                                  │
│                                                                             │
│  TIER 3 — STANDARD                                                         │
│  ├── Internal tools                                                        │
│  ├── Admin portals                                                         │
│  ├── Background jobs                                                       │
│  ├── Development infrastructure                                            │
│  └── Non-critical batch processing                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 1.3.2 SLO Targets by Tier

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

#### 1.3.3 Measurement Window

| Window Type | Duration | Use Case |
|-------------|----------|----------|
| **Rolling** | 30 days | Primary SLO measurement |
| **Short-term** | 1 hour | Alerting, burn rate |
| **Calendar Month** | 1 month | Reporting |
| **Quarterly** | 3 months | Trend analysis |

**Primary measurement:** Rolling 30-day window, calculated continuously.

### 1.4 Error Budgets

#### 1.4.1 Error Budget Calculation

```
Error Budget = (1 - SLO) × Total Requests (or Time)
```

**30-day budget examples:**

| SLO | Error Budget (Time) | Error Budget (%) |
|-----|---------------------|------------------|
| 99.99% | 4.3 minutes | 0.01% |
| 99.95% | 21.9 minutes | 0.05% |
| 99.9% | 43.8 minutes | 0.1% |
| 99.5% | 3.6 hours | 0.5% |

#### 1.4.2 Burn Rate

Burn rate measures how fast error budget is being consumed.

```
Burn Rate = Current Error Rate / Allowed Error Rate
```

| Burn Rate | Time to Budget Exhaustion | Response |
|-----------|---------------------------|----------|
| 1x | 30 days | Normal |
| 2x | 15 days | Monitor |
| 6x | 5 days | Warning |
| 14.4x | 2 days | Alert |
| 36x | 20 hours | Emergency |

#### 1.4.3 Error Budget Policy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ERROR BUDGET STATUS LEVELS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟢 GREEN — Budget > 50% remaining                                  │   │
│  │  • Normal feature development velocity                              │   │
│  │  • Standard change process                                          │   │
│  │  • Regular deployment cadence                                       │   │
│  │  • Proactive reliability improvements encouraged                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟡 YELLOW — Budget 25-50% remaining                                │   │
│  │  • Increased monitoring attention                                   │   │
│  │  • Review recent incidents and changes                              │   │
│  │  • Prioritize reliability improvements                              │   │
│  │  • Extra validation for risky changes                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🟠 ORANGE — Budget 10-25% remaining                                │   │
│  │  • Feature freeze for affected service                              │   │
│  │  • Only reliability and critical bug fixes                          │   │
│  │  • Reduced deployment frequency                                     │   │
│  │  • Root cause analysis required                                     │   │
│  │  • Engineering Lead escalation                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔴 RED — Budget < 10% or exhausted                                 │   │
│  │  • Complete feature freeze                                          │   │
│  │  • Reliability-first mode                                           │   │
│  │  • No deployments except reliability fixes                          │   │
│  │  • Executive escalation                                             │   │
│  │  • SLA breach risk assessment                                       │   │
│  │  • Daily reliability review                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.5 Enforcement Rules

| Condition | Action | Owner |
|-----------|--------|-------|
| SLO breach | Feature velocity reduced | Service Owner |
| Error budget < 25% | Feature freeze activated | Engineering Lead |
| Error budget exhausted | Reliability-first mode | Director + Product |
| Repeated SLO breach | Architecture review required | Principal Engineer |
| SLA at risk | Executive escalation | VP Engineering |

---

## 2. Resilience Engineering & Operations

### 2.1 Design Principles

**[T2]** Services SHOULD be designed with these resilience principles:

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Design for Failure** | Assume every component can fail | Redundancy, failover, graceful degradation |
| **Eliminate SPOF** | No single points of failure | Multi-instance, multi-zone deployment |
| **Prefer Automation** | Automate over human intervention | Self-healing, auto-scaling, automated rollback |
| **Fail Fast** | Detect and respond to failures quickly | Health checks, circuit breakers, timeouts |
| **Fail Safe** | Failures should not cascade | Bulkheads, isolation, load shedding |
| **Degrade Gracefully** | Partial function > no function | Feature flags, fallbacks, cached data |

### 2.2 Resilience Controls

#### 2.2.1 Redundancy

**Multi-Instance Deployment:**
- Minimum 2 instances per service (production)
- Prefer odd numbers for consensus (3, 5)
- Distribute across availability zones

**Multi-Zone Deployment:**
- Tier 1 services: 3+ availability zones
- Tier 2 services: 2+ availability zones
- Tier 3 services: 2+ availability zones

**Multi-Region Deployment (Tier 1 Critical — RECOMMENDED):**
- Primary region: Active
- Secondary region: Standby or Active-Active
- Failover: Automated or manual < 15 minutes
- NOTE: Multi-region is RECOMMENDED, not required. Evaluate based on service criticality and cost tolerance. Multi-zone is the minimum REQUIRED redundancy level.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REDUNDANCY ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INSTANCE LEVEL                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                             │
│  │ Instance │    │ Instance │    │ Instance │                             │
│  │    A     │    │    B     │    │    C     │                             │
│  └──────────┘    └──────────┘    └──────────┘                             │
│       │               │               │                                    │
│       └───────────────┼───────────────┘                                    │
│                       │                                                    │
│  ZONE LEVEL           ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐                   │
│  │              Load Balancer                          │                   │
│  └─────────────────────────────────────────────────────┘                   │
│       │                   │                   │                            │
│  ┌────┴────┐        ┌────┴────┐        ┌────┴────┐                        │
│  │  Zone A │        │  Zone B │        │  Zone C │                        │
│  │  2+ inst│        │  2+ inst│        │  2+ inst│                        │
│  └─────────┘        └─────────┘        └─────────┘                        │
│                                                                             │
│  REGION LEVEL                                                               │
│  ┌─────────────────────┐         ┌─────────────────────┐                   │
│  │   Primary Region    │◄───────►│  Secondary Region   │                   │
│  │   (Active)          │   Sync  │  (Standby/Active)   │                   │
│  └─────────────────────┘         └─────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.2.2 Graceful Degradation

**[T2]** Services SHOULD implement graceful degradation strategies:

| Strategy | Trigger | Behavior |
|----------|---------|----------|
| **Cached Fallback** | Database unavailable | Serve cached/stale data with warning |
| **Feature Disabling** | Non-critical dependency down | Disable affected features, core continues |
| **Read-Only Mode** | Write path failure | Allow reads, queue writes |
| **Static Response** | Complete failure | Serve static error page with status |
| **Reduced Functionality** | Partial failure | Offer limited feature set |

**Implementation example:**

```typescript
// Graceful degradation pattern
async function getProjectData(projectId: string): Promise<ProjectData> {
  try {
    // Primary: Live database query
    return await database.query(projectId);
  } catch (dbError) {
    logger.warn('Database unavailable, falling back to cache', { projectId, error: dbError });
    
    try {
      // Fallback 1: Cache
      const cached = await cache.get(`project:${projectId}`);
      if (cached) {
        return { ...cached, _stale: true, _cachedAt: cached.timestamp };
      }
    } catch (cacheError) {
      logger.warn('Cache unavailable', { projectId, error: cacheError });
    }
    
    // Fallback 2: Static/minimal response
    return {
      id: projectId,
      _unavailable: true,
      message: 'Data temporarily unavailable. Please try again shortly.',
    };
  }
}
```

#### 2.2.3 Circuit Breakers

Circuit breakers prevent cascading failures by stopping requests to failing dependencies.

**States:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CIRCUIT BREAKER STATES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐      Failure threshold      ┌──────────────┐             │
│  │    CLOSED    │    ───────exceeded───────►  │     OPEN     │             │
│  │   (Normal)   │                             │  (Rejecting) │             │
│  │              │                             │              │             │
│  │ Requests     │                             │ Requests     │             │
│  │ flow through │                             │ fail fast    │             │
│  └──────────────┘                             └──────────────┘             │
│         ▲                                            │                      │
│         │                                            │                      │
│         │                                     Timeout expires               │
│    Success rate                                      │                      │
│    restored                                          ▼                      │
│         │                                    ┌──────────────┐               │
│         │                                    │  HALF-OPEN   │               │
│         └────────────────────────────────────│   (Testing)  │               │
│                                              │              │               │
│                                              │ Limited      │               │
│                                              │ test requests│               │
│                                              └──────────────┘               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Configuration:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `failureThreshold` | 5 | Failures before opening |
| `successThreshold` | 3 | Successes to close from half-open |
| `timeout` | 30s | Time before testing (half-open) |
| `monitoringWindow` | 10s | Window for failure counting |

#### 2.2.4 Retries with Backoff

Retry policies for transient failures:

| Component | Max Retries | Initial Backoff | Max Backoff | Jitter |
|-----------|-------------|-----------------|-------------|--------|
| Database | 3 | 100ms | 2s | ±20% |
| HTTP (internal) | 3 | 200ms | 5s | ±25% |
| HTTP (external) | 2 | 500ms | 10s | ±30% |
| Queue operations | 5 | 1s | 60s | ±20% |

**Retry requirements (T2 SHOULD):**
- **[T2]** Operations SHOULD be idempotent where retries can occur.
- **[T2]** Exponential backoff with jitter required.
- **[T2]** Circuit breaker SHOULD wrap retry logic.
- **[T2]** Retries SHOULD respect timeout budgets (no unbounded retry loops).

```typescript
// Retry with exponential backoff
async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < options.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (!isRetryable(error)) {
        throw error;
      }
      
      const baseDelay = options.initialBackoff * Math.pow(2, attempt);
      const jitter = baseDelay * options.jitterFactor * (Math.random() - 0.5);
      const delay = Math.min(baseDelay + jitter, options.maxBackoff);
      
      await sleep(delay);
    }
  }
  
  throw lastError;
}
```

#### 2.2.5 Timeouts

**[T2]** All external calls SHOULD have explicit timeouts:

| Operation Type | Recommended Timeout | Notes |
|----------------|---------------------|-------|
| Database query | 5s | Simple queries |
| Database query | 30s | Complex/batch |
| HTTP API call | 10s | Standard |
| HTTP API call | 30s | Long-running |
| Health check | 3s | Fast response required |
| Background job | 5 minutes | With progress tracking |

**Timeout budget pattern:**

```typescript
// Cascading timeout budgets
async function handleRequest(timeout: number): Promise<Response> {
  const deadline = Date.now() + timeout;
  
  // Allocate timeout budget across operations
  const authTimeout = Math.min(1000, timeout * 0.1);
  const dbTimeout = Math.min(5000, timeout * 0.5);
  const remainingTimeout = Math.max(0, deadline - Date.now());
  
  await authenticate({ timeout: authTimeout });
  const data = await queryDatabase({ timeout: dbTimeout });
  return formatResponse(data, { timeout: remainingTimeout });
}
```

#### 2.2.6 Load Shedding

When systems are overloaded, shed load to maintain availability:

| Strategy | Trigger | Action |
|----------|---------|--------|
| **Rate Limiting** | Request rate > limit | Return 429, retry-after header |
| **Priority Queuing** | Queue depth > threshold | Process high-priority first |
| **Request Dropping** | CPU > 95% | Drop lowest priority requests |
| **Connection Limiting** | Connections > limit | Reject new connections |
| **Adaptive Throttling** | Error rate increasing | Reduce request rate dynamically |

#### 2.2.7 Health Checks

**[T1]** Tier-1-Critical services SHALL expose at least one health check endpoint. **[T2]** All services SHOULD expose liveness + readiness endpoints:

| Check Type | Purpose | Endpoint | Frequency |
|------------|---------|----------|-----------|
| **Liveness** | Process is running and not deadlocked | `/healthz` | Every 10s |
| **Readiness** | Service can accept traffic | `/readyz` | Every 5s |
| **Startup** | Service has completed initialization | `/startupz` | Every 5s (during boot) |

**Liveness check requirements:**
- Verify process is responsive (not hung)
- Does not check external dependencies
- Responds within 3 seconds
- Failure triggers container/process restart

**Readiness check requirements:**
- Verify service can serve requests
- Check critical dependencies (database, cache)
- Failure removes instance from load balancer
- Does not trigger restart

**Health check response format:**

```json
{
  "status": "ok | degraded | unhealthy",
  "version": "1.2.3",
  "uptime_seconds": 86400,
  "checks": {
    "database": { "status": "ok", "latency_ms": 5 },
    "cache": { "status": "ok", "latency_ms": 1 }
  }
}
```

**Per-tier requirements:**

| Requirement | Tier 1 | Tier 2 | Tier 3 |
|-------------|--------|--------|--------|
| Liveness probe | REQUIRED | REQUIRED | REQUIRED |
| Readiness probe | REQUIRED | REQUIRED | RECOMMENDED |
| Startup probe | REQUIRED | RECOMMENDED | OPTIONAL |
| Dependency checks in readiness | REQUIRED | REQUIRED | OPTIONAL |

### 2.3 Operational Practices

#### 2.3.1 Capacity Planning

**[T3]** Regulated / Tier-1-Critical services SHALL perform capacity planning quarterly:

**Inputs:**
- Historical usage patterns (90 days minimum)
- Growth projections (product roadmap)
- Seasonal variations (marketing calendar)
- Business events (launches, campaigns)

**Process:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CAPACITY PLANNING PROCESS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. COLLECT          2. ANALYZE          3. PROJECT                        │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Historical   │──▶│ Identify     │──▶│ Forecast     │                   │
│  │ metrics      │   │ patterns &   │   │ future       │                   │
│  │ (90+ days)   │   │ trends       │   │ demand       │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  4. PLAN            5. PROVISION        6. VALIDATE                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Determine    │──▶│ Scale        │──▶│ Load test    │                   │
│  │ resource     │   │ resources    │   │ & verify     │                   │
│  │ requirements │   │ ahead of     │   │              │                   │
│  │              │   │ demand       │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Output:**
- Resource allocation plan
- Scaling thresholds
- Cost projections
- Risk assessment

#### 2.3.2 Chaos Testing

Controlled fault injection validates resilience:

**Principles:**
1. Define steady state (what "normal" looks like)
2. Hypothesize that steady state continues during experiment
3. Introduce real-world failure scenarios
4. Observe differences between control and experiment
5. Learn and improve

**Experiment categories:**

| Category | Examples | Frequency |
|----------|----------|-----------|
| **Infrastructure** | Instance termination, zone outage | Quarterly |
| **Network** | Latency injection, packet loss | Quarterly |
| **Dependencies** | Database failure, cache unavailable | Quarterly |
| **Application** | Memory pressure, CPU exhaustion | Quarterly |
| **Data** | Corruption simulation, stale data | Semi-annually |

**Chaos testing requirements:**
- Start in non-production environments
- Production experiments require approval
- Always have rollback plan
- Monitor closely during experiments
- Document all learnings

#### 2.3.3 Safe Rollout Strategies

**[T2]** Production deployments SHOULD use safe rollout strategies (refer STD-ENG-006):

**Canary Deployment (Default):**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CANARY DEPLOYMENT STAGES                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Stage 1        Stage 2        Stage 3        Stage 4        Stage 5       │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐       │
│  │  1%    │───▶│  5%    │───▶│  25%   │───▶│  50%   │───▶│  100%  │       │
│  │ traffic│    │ traffic│    │ traffic│    │ traffic│    │ traffic│       │
│  └────────┘    └────────┘    └────────┘    └────────┘    └────────┘       │
│      │             │             │             │             │             │
│   15 min        30 min        1 hour        2 hours       Complete        │
│   observe       observe       observe       observe                        │
│                                                                             │
│  Automatic rollback if:                                                     │
│  • Error rate > 2x baseline                                                 │
│  • Latency p99 > 2x baseline                                               │
│  • Any SEV-1/SEV-2 incident                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Blue-Green Deployment (Major changes):**

| Phase | Blue (Current) | Green (New) |
|-------|----------------|-------------|
| 1. Deploy | Active (100%) | Deployed, idle |
| 2. Smoke test | Active (100%) | Internal testing |
| 3. Switch | Idle | Active (100%) |
| 4. Verify | Standby | Active, monitored |
| 5. Cleanup | Terminate after 24h | Production |

**Rollback criteria:**
- Automated: SLO breach detected
- Manual: Any anomaly observed
- Target: < 5 minutes to rollback

#### 2.3.4 Runbook Requirements

**[T1]** Tier-1-Critical services SHALL maintain a minimally documented runbook (what it does, dependencies, restart, owner). **[T2]** Tier-2-Important services SHOULD maintain an operational runbook. Runbooks bridge the gap between alerting and effective mitigation.

**Runbook structure:**

| Section | Content | Required? |
|---------|---------|-----------|
| **Service Overview** | What the service does, dependencies, owners | REQUIRED |
| **Architecture** | Key components, data flow, infrastructure | REQUIRED |
| **Alert Response** | Per-alert triage steps and remediation | REQUIRED |
| **Common Failures** | Known failure modes and fixes | REQUIRED |
| **Scaling** | How to scale up/down, capacity limits | REQUIRED |
| **Rollback** | Step-by-step rollback procedure | REQUIRED |
| **Contacts** | On-call, escalation, vendor contacts | REQUIRED |
| **Troubleshooting** | Diagnostic commands, log locations, dashboards | RECOMMENDED |

**Per-tier requirements:**

| Requirement | Tier 1 | Tier 2 | Tier 3 |
|-------------|--------|--------|--------|
| Runbook exists | REQUIRED | REQUIRED | RECOMMENDED |
| Linked from alerts | REQUIRED | REQUIRED | RECOMMENDED |
| Reviewed quarterly | REQUIRED | RECOMMENDED | OPTIONAL |
| Tested via game day | RECOMMENDED | OPTIONAL | OPTIONAL |

**Runbook maintenance:**
- **[T2]** Runbooks SHOULD be updated after every incident that reveals gaps.
- **[T2]** Runbooks SHOULD be stored in version control alongside service code or in a central wiki.
- Each alert SHOULD link directly to its corresponding runbook section

---

## 3. Incident Interface, Toil & Governance

### 3.1 SRE Incident Interface

SRE owns detection and initial response; Incident Response Standard governs execution.

| Phase | SRE Responsibility | Interface |
|-------|-------------------|-----------|
| **Detection** | Monitoring, alerting, anomaly detection | → Alert fires |
| **Triage** | Initial assessment, severity determination | → Incident declared |
| **Mitigation** | First-response actions, service restoration | → Incident Response |
| **Analysis** | Post-incident technical analysis | ← Postmortem |
| **Improvement** | Reliability improvements from learnings | → Engineering backlog |

**Handoff to Incident Response:**
- SRE declares incident severity
- SRE provides initial diagnostic information
- Incident Commander takes coordination
- SRE participates as SME

### 3.2 On-Call Practices

On-call is a critical SRE function. The following standards ensure sustainable, effective on-call rotations.

#### 3.2.1 On-Call Structure

| Parameter | Requirement |
|-----------|-------------|
| **Rotation length** | 1 week (recommended) |
| **Rotation size** | Minimum 4 engineers per rotation (to allow healthy intervals) |
| **Overlap** | 30-minute handoff overlap between rotations |
| **Coverage** | 24/7 for Tier 1 services; business-hours for Tier 2/3 |
| **Escalation** | Secondary on-call must be designated |

#### 3.2.2 On-Call Expectations

**During on-call shift:**
- Acknowledge alerts within 5 minutes (Tier 1) or 15 minutes (Tier 2)
- Have laptop and internet access available
- Follow runbooks for initial triage
- Escalate when issue exceeds individual expertise or SLO is at risk

**Handoff protocol:**
- Outgoing on-call documents all active issues and context
- Incoming on-call reviews open alerts, recent incidents, and error budget status
- Handoff logged in on-call tool or shared channel

#### 3.2.3 On-Call Health

| Metric | Target | Action if Exceeded |
|--------|--------|-------------------|
| Pages per shift | ≤ 2 per day | Alert tuning required |
| After-hours pages | ≤ 1 per night | Root cause analysis |
| False positive rate | ≤ 20% | Alert review and cleanup |
| Toil from on-call | ≤ 25% of capacity | Automate or reduce noise |

**Sustainability rules:**
- On-call engineers receive compensatory time or pay per company policy
- If page volume exceeds targets for 2+ rotations, alert tuning is REQUIRED
- On-call retrospective held monthly to review pain points and improve

### 3.3 Toil Management

**Definition:** Toil is work that is manual, repetitive, automatable, tactical, lacking enduring value, and scales with service growth.

#### 3.3.1 Toil Identification

| Characteristic | Description | Example |
|----------------|-------------|---------|
| **Manual** | Requires human action | Restarting services |
| **Repetitive** | Done frequently | Weekly report generation |
| **Automatable** | Machine could do it | Data cleanup scripts |
| **Tactical** | Reactive, not strategic | Responding to alerts |
| **No Enduring Value** | Doesn't improve the system | Manual failovers |
| **Scales with Growth** | More work as service grows | User provisioning |

#### 3.3.2 Toil Budget

| Metric | Target | Action if Exceeded |
|--------|--------|-------------------|
| Toil percentage | ≤ 50% of SRE capacity | Automation required |
| Toil per service | ≤ 4 hours/week | Process improvement |
| Interrupt-driven work | ≤ 25% of capacity | Alert tuning |

**Toil reduction process:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TOIL REDUCTION PROCESS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. IDENTIFY         2. MEASURE          3. PRIORITIZE                     │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Track toil   │──▶│ Quantify     │──▶│ Rank by      │                   │
│  │ activities   │   │ time spent   │   │ impact &     │                   │
│  │              │   │              │   │ automation   │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  4. AUTOMATE         5. VALIDATE         6. MONITOR                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Build        │──▶│ Test         │──▶│ Track toil   │                   │
│  │ automation   │   │ automation   │   │ reduction    │                   │
│  │ solution     │   │ reliability  │   │ over time    │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.3.3 Automation Requirements

Automation is REQUIRED when:
- Same task performed > 3 times/week
- Task takes > 30 minutes/occurrence
- Task is error-prone when done manually
- Task is on critical path
- Toil budget exceeded

### 3.4 Governance & Review

#### 3.4.1 Reliability Reviews

| Review | Frequency | Participants | Focus |
|--------|-----------|--------------|-------|
| **Service Review** | Monthly | Service owner, SRE | SLOs, incidents, improvements |
| **SLO Review** | Quarterly | Engineering leads | Target adjustments, trends |
| **Architecture Review** | Per change | Principal engineers | Reliability implications |
| **Postmortem Review** | Per incident | IC, responders, stakeholders | Learnings, action items |

#### 3.4.2 SLO Review Process

Quarterly review of all service SLOs:

| Step | Action | Owner |
|------|--------|-------|
| 1 | Collect SLO performance data | SRE |
| 2 | Analyze trends and patterns | Service Owner |
| 3 | Review business requirements | Product |
| 4 | Propose adjustments | Engineering Lead |
| 5 | Approve changes | Director |
| 6 | Update documentation | SRE |
| 7 | Adjust alerting | SRE |

#### 3.4.3 Service Catalog

**[T1]** Every service SHALL have its tier (T1-Critical / T2-Important / T3-Internal) recorded in its README or service catalog entry. **[T2]** Services SHOULD be registered in a central service catalog:

| Field | Description | Required? |
|-------|-------------|-----------|
| **Service name** | Unique identifier | REQUIRED |
| **Tier classification** | Tier 1 / 2 / 3 | REQUIRED |
| **Owner** | Team and individual owner | REQUIRED |
| **Dependencies** | Upstream and downstream services | REQUIRED |
| **SLO targets** | Availability, latency, error rate | REQUIRED |
| **Runbook link** | URL to operational runbook | REQUIRED (Tier 1/2) |
| **Repository** | Source code location | REQUIRED |
| **On-call rotation** | PagerDuty/Opsgenie schedule link | REQUIRED (Tier 1/2) |
| **Dashboard** | Observability dashboard link | RECOMMENDED |

**Maintenance:**
- **[T3]** Service catalog SHALL be reviewed quarterly alongside SLO reviews.
- **[T2]** New services SHOULD be registered before production deployment.
- **[T2]** Decommissioned services SHOULD be marked inactive promptly.

#### 3.4.4 Postmortem Action Tracking

**[T2]** Postmortem action items SHOULD be tracked to closure:

| Priority | Timeline | Review Cadence |
|----------|----------|----------------|
| P1 (Critical) | 1 week | Daily |
| P2 (High) | 2 weeks | Weekly |
| P3 (Medium) | 1 month | Bi-weekly |
| P4 (Low) | Backlog | Monthly |

**Tracking requirements:**
- Clear owner assigned
- Specific due date
- Definition of done
- Linked to incident
- Progress tracked in weekly review

### 3.5 Prohibited Practices

The following practices are PROHIBITED:

| Practice | Reason | Alternative |
|----------|--------|-------------|
| ❌ Operating without defined SLOs | No reliability baseline | Define SLOs before production |
| ❌ Ignoring error budgets | Disables velocity/reliability balance | Enforce error budget policy |
| ❌ Manual fixes without automation | Toil accumulates | Automate after second occurrence |
| ❌ Reliability work deferred indefinitely | Debt accumulates | Allocate 20%+ capacity to reliability |
| ❌ Skipping postmortems | No learning from failures | Mandatory for SEV-1/SEV-2 |
| ❌ Single points of failure | Unacceptable risk | Redundancy required |
| ❌ Deployments without rollback plan | Recovery delayed | Rollback plan required |
| ❌ Ignoring capacity planning | Surprise failures | Quarterly capacity reviews |

---

## CYBERCUBE SRE — Quick Reference Card

Print it. Keep it handy.

### 🔹 Reliability Model

```
SLI → SLO → Error Budget → Velocity Decision
 │      │        │
 │      │        └─ Allowance: (1 - SLO) × Time
 │      └─ Target: "99.9% availability"
 └─ Signal: Availability, Latency, Errors, Saturation
```

### 🔹 SLO Targets

| Tier | Availability | Latency p95 | Error Rate |
|------|--------------|-------------|------------|
| 1 (Critical) | 99.95% | < 200ms | < 0.05% |
| 2 (High) | 99.9% | < 500ms | < 0.1% |
| 3 (Standard) | 99.5% | < 2000ms | < 0.5% |

### 🔹 Error Budget Status

| Status | Budget | Action |
|--------|--------|--------|
| 🟢 Green | > 50% | Normal velocity |
| 🟡 Yellow | 25-50% | Increased caution |
| 🟠 Orange | 10-25% | Feature freeze |
| 🔴 Red | < 10% | Reliability-first |

### 🔹 Burn Rate Alerts

| Rate | Exhaustion | Response |
|------|------------|----------|
| 2x | 15 days | Monitor |
| 6x | 5 days | Warning |
| 14.4x | 2 days | Alert |
| 36x | 20 hours | Emergency |

### 🔹 Golden Signals

```
Latency    → How long requests take
Traffic    → How much demand
Errors     → How often requests fail
Saturation → How full resources are
```

### 🔹 Resilience Controls

| Control | Purpose |
|---------|---------|
| Redundancy | Survive instance/zone failure |
| Graceful degradation | Partial function > no function |
| Circuit breaker | Stop cascading failures |
| Retry + backoff | Handle transient failures |
| Timeout | Bound wait times |
| Load shedding | Survive overload |

### 🔹 Canary Stages

```
1% → 5% → 25% → 50% → 100%
│
└─ Auto-rollback if error rate > 2x
```

### 🔹 Toil Budget

| Metric | Target |
|--------|--------|
| Total toil | ≤ 50% capacity |
| Per service | ≤ 4 hours/week |
| Interrupts | ≤ 25% capacity |

### 🔹 Key Response Times

| Metric | Tier 1 | Tier 2 |
|--------|--------|--------|
| MTTD | < 5 min | < 10 min |
| MTTR | < 1 hour | < 4 hours |

### 🔹 DO's

✅ Define SLOs before production
✅ Enforce error budget policy
✅ Design for failure
✅ Automate repetitive tasks
✅ Use safe rollout strategies
✅ Track postmortem actions to closure
✅ Run chaos experiments regularly

### 🔹 DON'Ts

❌ Operate without SLOs
❌ Ignore error budgets
❌ Manual fixes without automation
❌ Defer reliability work indefinitely
❌ Skip postmortems
❌ Deploy without rollback plan
❌ Single points of failure

---

## Implementation Status

**Last Updated:** 2026-02-01  
**Standard Version:** v1

### Core Implementation

| Component | Status | Tier | Notes |
|-----------|--------|------|-------|
| Declared service tier (per service) | PARTIAL | T1 | Classify existing services |
| Business-hours on-call for Tier-1-Critical | PARTIAL | T1 | Formalize rotation structure |
| Minimal runbook for Tier-1-Critical | PARTIAL | T1 | Tier 1 services priority |
| POL-ENG-001 change flow + rollback plan | IN PLACE | T1 | Defers to POL-ENG-001 v1.1 |
| Health check for Tier-1-Critical | PARTIAL | T1 | Inherits STD-OPS-003 T1; standardize ROADMAP |
| SLI Definitions (canonical) | COMPLETE | T2 | Defers to STD-SLP-001 |
| SLO Targets per tier | COMPLETE | T2 | Per-tier targets defined |
| Error Budget Policy | COMPLETE | T2 | Status levels and actions |
| Error Budget Tracking Dashboard | ROADMAP | T2 | Re-trigger: observability platform chosen |
| Burn Rate Alerting | ROADMAP | T2 | Configure alerts |
| Service Catalog (canonical registry) | ROADMAP | T2 | Register all services |
| Circuit Breakers / Retries / Timeouts | PARTIAL | T2 | Implementation varies |
| Canary Deployments | PARTIAL | T2 | Not all services; paired with STD-ENG-006 T3 |
| 24×5 on-call rotation | ROADMAP | T2 | After business-hours T1 stabilized |
| Postmortem process (SEV1/SEV2) | PARTIAL | T2 | Defers to STD-OPS-004 |
| 24×7 on-call | ROADMAP | T3 | Regulated projects only |
| Multi-region / multi-AZ redundancy | ROADMAP | T3 | Regulated projects only |
| Quarterly chaos / gameday | ROADMAP | T3 | Regulated projects only |
| Toil tracking (≤ 50% ceiling) | ROADMAP | T3 | Regulated projects only |
| Reliability reviews (monthly) | ROADMAP | T3 | Regulated projects only |
| Executive reliability KRIs | ROADMAP | T3 | Paired with STD-GOV-005 |
| DR tested quarterly | ROADMAP | T3 | Paired with STD-OPS-002 T3 |

Status vocabulary: `IN PLACE` | `COMPLETE` | `PARTIAL` | `ROADMAP` | `N/A`.

### Migration Path

1. **Phase 1**: Service tier classification + service catalog + SLO definition for Tier 1 services
2. **Phase 2**: Error budget dashboards + burn rate alerting
3. **Phase 3**: Health check standardization + runbooks for Tier 1 services
4. **Phase 4**: Resilience controls audit (circuit breakers, retries, timeouts)
5. **Phase 5**: On-call rotation formalization + canary deployment standardization
6. **Phase 6**: Chaos testing program establishment
7. **Phase 7**: Toil tracking + reduction program
8. **Phase 8**: Full governance cadence (reviews, reporting)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-01 | Initial release |
| v1.1 | 2026-02-07 | Added: health checks (2.2.7), runbooks (2.3.4), on-call practices (3.2), service catalog (3.4.3). Fixed: chaos frequency to quarterly, multi-region softened to RECOMMENDED, SLI range corrected, related documents linked to actual standards |
| v1.2 | 2026-04-22 | Unfreeze (Path B): Tier Table with 5 T1 rules (service tier declared, business-hours on-call for Tier-1-Critical, minimal runbook, POL-ENG-001 change flow, health check). SLOs, error budgets, circuit breakers, canary, chaos reclassified to T2/T3 ROADMAP. Status vocabulary normalized. |
| v1.3 | 2026-04-22 | Pass-3 friction remediation: body MUSTs reclassified with inline `[T1]/[T2]/[T3]` tags (§1.2 canonical SLIs → T2, §2 resilience principles → T2, §2.2.7 health checks → T1 for Tier-1-Critical + T2 otherwise, §3.2 runbook coverage → T1/T2 split, §3.4.3 service catalog registration → T2 + quarterly review → T3, capacity planning → T3). MUST density reduced from ~18/1,000 lines to ~7/1,000 lines. No semantic change to the T1 baseline — only tier clarity. |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| 4.5 CYBERCUBE-Observability-Telemetry-Standard-v1 | SLI measurement, alerting |
| 4.3 CYBERCUBE-Incident-Response-Standard-v1 | Incident execution, postmortems |
| 4.2 CYBERCUBE-Backup-Disaster-Recovery-Standard-v1 | DR alignment, failover |
| 4.1 CYBERCUBE-Business-Continuity-Plan-v1 | Business continuity alignment |
| 4.6 CYBERCUBE-Service-Level-Policy-v1 | SLA commitments, credits |
| 5.6 CYBERCUBE-Release-Deployment-Standard-v1 | Safe rollout procedures |
| 5.5 CYBERCUBE-Testing-Quality-Standard-v1 | Resilience validation |
| 5.7 CYBERCUBE-Change-Management-Policy-v1 | Change control alignment |
| 1.2 CYBERCUBE-Standards-Governance-Policy-v1 | Compliance, reviews |
