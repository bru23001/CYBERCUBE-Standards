Glossary

This glossary defines key terms used throughout the CYBERCUBE Customer Data
Isolation & Multi-Tenancy Standard.

All definitions are normative unless stated otherwise.

B

Break-Glass Access

Emergency privileged access to customer data outside normal authorization flows.

Rules:
- Requires pre-approval and justification
- Time-limited
- Fully audited
- Does not bypass tenant isolation boundaries

C

Cross-Tenant Access

Any access attempt where the requesting principal's tenant differs from
the target resource's tenant.

Default: DENIED
Exception: Requires formal federation agreement (see Authorization Standard STD-SEC-004)

Cross-Tenant Exposure

An incident where data belonging to one tenant is visible, accessible, or
inferable by another tenant.

Severity: SEV-1 / Critical
Response: Immediate per Incident Response Standard (STD-SEC-007)

D

Dedicated Resources

A tenancy model where a customer receives isolated infrastructure
(database, compute, storage) separate from other tenants.

Use case: High-risk, regulated, or contractually required tenants

I

Isolation Boundary

A security perimeter that prevents data, operations, and side-effects
from crossing between tenants.

Enforcement points:
- Application layer (middleware)
- API layer (request validation)
- Data layer (RLS, query filtering)
- Async layer (job context)

L

Logical Multi-Tenancy

A tenancy model where tenants share infrastructure but are isolated
through software-enforced boundaries (tenant_id filtering, RLS, scoped keys).

This is the default CYBERCUBE tenancy model.

R

Row-Level Security (RLS)

A database-level enforcement mechanism where the database engine itself
filters rows based on tenant context, preventing application-layer bugs
from leaking cross-tenant data.

Required: PostgreSQL RLS policies on all tenant-scoped tables

T

Tenant

A logical isolation boundary representing a customer account.

In CYBERCUBE: Tenant = Account (ACC)
Identifier: `ACC-XXXXXX-X` (CC-PID format)

Tenant Context

The resolved tenant identity attached to every request, derived from the
authenticated session or token.

Rules:
- MUST be extracted from authentication context
- MUST NOT be accepted from user input (headers, query params, body)
- MUST be validated on every request

Tenant ID (tenant_id)

The primary isolation key for all customer data.

Format: Account CC-PID (`ACC-XXXXXX-X`)
Properties:
- Globally unique
- Immutable
- Present on all tenant-scoped data
- Mandatory in all queries

---

CYBERCUBE Customer Data Isolation & Multi-Tenancy Standard (v1)

**Standard ID:** STD-DAT-004
**Status:** Active
**Effective:** 2026-01-17
**Classification:** INTERNAL
**Owner:** Platform Engineering / Security Architecture
**Applies to:** All CYBERCUBE products, services, systems, and environments

---

## 0. Purpose & Design Principles

This standard defines mandatory controls and architectural requirements that ensure
strict isolation of customer data in multi-tenant CYBERCUBE systems.

This standard guarantees that:
- One customer cannot access, infer, or impact another customer's data
- Tenant boundaries are enforced by design, not by convention
- Isolation controls are consistent, auditable, and testable

Customer data isolation is a foundational trust requirement for CYBERCUBE.

**Industry Alignment:**
- SOC 2 Type II (CC6.1, CC6.3 — Logical and Physical Access Controls)
- ISO/IEC 27001 (A.8 Asset Management, A.9 Access Control)
- GDPR Article 32 (Security of Processing)
- NIST SP 800-53 (AC-4 Information Flow Enforcement)

**Design Principles:**

1. **Isolation by Default** — Tenants are isolated unless explicitly federated
2. **Defense in Depth** — Isolation enforced at every layer (app, API, data, async)
3. **Fail-Secure** — Missing tenant context = request denied
4. **Auditability** — All tenant boundary decisions are logged
5. **Infrastructure-Enforced** — Isolation relies on RLS and middleware, not application logic alone

This document does NOT define:
- Authentication mechanisms — see Authentication & Identity Standard (STD-SEC-003)
- Authorization policies — see Authorization & Access Control Standard (STD-SEC-004)
- Data classification rules — see Data Classification & Retention Standard (STD-DAT-003)
- Incident response procedures — see Incident Response Standard (STD-SEC-007)

---

## 1. Scope

This standard applies to:
- All multi-tenant CYBERCUBE applications and services
- All data stores (databases, caches, object storage, logs, telemetry)
- All APIs, background jobs, and asynchronous workflows
- All environments (development, staging, production)
- All personnel and systems with access to customer data

This standard applies regardless of deployment model (cloud, hybrid).

---

## 2. Multi-Tenancy Model

### 2.1 Supported Tenancy Models

CYBERCUBE supports the following tenancy models, based on risk and use case:

| Model | Description | Use Case |
|-------|-------------|----------|
| Logical Multi-Tenancy | Shared infrastructure with enforced tenant isolation | Default for all services |
| Dedicated Resources | Isolated resources for high-risk or regulated tenants | By contract or regulation |

The selected model MUST be documented per service.

### 2.2 Tenant Identifier (tenant_id)

- Every customer is assigned a globally unique `tenant_id`
- `tenant_id` uses the Account CC-PID format: `ACC-XXXXXX-X`
- `tenant_id` is the primary isolation boundary
- `tenant_id` MUST be immutable
- `tenant_id` usage is mandatory across all layers

---

## 3. Isolation Requirements (MANDATORY)

### 3.1 Application Layer Isolation

- All customer-scoped requests MUST include tenant context
- `tenant_id` MUST be resolved from authentication context, not user input
- Authorization decisions MUST enforce tenant ownership

Cross-tenant access is explicitly prohibited unless formally approved via
federation (see Authorization Standard STD-SEC-004, §7.5).

**Middleware enforcement (reference):**

```typescript
function enforceTenantContext(req, res, next) {
  const tenantId = extractTenantFromToken(req.auth);

  if (!tenantId) {
    // FAIL-SECURE: No tenant context = deny
    return res.status(403).json({ error: 'TENANT_CONTEXT_REQUIRED' });
  }

  req.tenantContext = {
    tenant_id: tenantId,
    extracted_from: 'token',
    validated_at: new Date()
  };

  next();
}
```

### 3.2 API Isolation

- All APIs MUST enforce tenant scoping at request entry
- Queries MUST be filtered by `tenant_id`
- API responses MUST never include cross-tenant data
- APIs MUST return 403 (not 404) for cross-tenant resource access attempts

APIs without tenant enforcement are non-compliant.

### 3.3 Data Layer Isolation

All data storage mechanisms MUST enforce isolation:

| Storage Type | Isolation Mechanism |
|-------------|---------------------|
| Databases (PostgreSQL) | Row-Level Security (RLS) + mandatory `tenant_id` column |
| Object storage | Tenant-scoped paths or buckets (`s3://bucket/{tenant_id}/...`) |
| Caches (Redis) | Tenant-scoped keys (`{tenant_id}:resource:id`) |
| Search indexes | Tenant-filtered queries with mandatory `tenant_id` filter |

Shared tables without tenant scoping are prohibited.

**RLS enforcement (reference — PostgreSQL):**

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_projects ON projects
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- CORRECT: Tenant filter included
SELECT * FROM projects
WHERE id = $1 AND tenant_id = current_setting('app.current_tenant_id')::uuid;

-- FORBIDDEN: Missing tenant filter
-- SELECT * FROM projects WHERE id = $1;
```

### 3.4 Background Jobs & Async Processing

- All jobs MUST carry tenant context explicitly
- Job workers MUST validate tenant scope before processing
- Cross-tenant batch processing requires explicit approval and audit logging
- Queue messages MUST include `tenant_id` in payload

---

## 4. Identity, Access & Privileged Operations

### 4.1 Customer Access

- Customers may only access their own tenant data
- Role-based access applies within tenant scope only (see STD-SEC-004)

### 4.2 Internal Access

- Internal access to customer data is restricted by role
- Privileged access is logged and monitored
- Break-glass access requires approval and justification
- Internal users do not bypass tenant isolation
- `super_admin` role may access cross-tenant only for platform operations (see STD-SEC-004, §2.2)

---

## 5. Logging, Telemetry & Observability

- Logs MUST include `tenant_id` where customer data is referenced
- Telemetry MUST NOT expose cross-tenant data
- Metrics aggregation MUST avoid tenant data leakage
- Log queries for tenant-specific data MUST include `tenant_id` filter
- Sensitive data in logs is governed by the Data Classification & Retention Standard (STD-DAT-003)

---

## 6. Testing & Validation

### 6.1 Isolation Testing (REQUIRED)

All multi-tenant systems MUST include:
- Automated tests for tenant boundary enforcement
- Negative tests for cross-tenant access attempts (Tenant A accessing Tenant B resources)
- Regression tests for isolation failures
- RLS validation tests (direct DB queries without app context must return zero cross-tenant rows)

Isolation failures are release-blocking defects (P0).

### 6.2 Audit Validation

- Isolation controls are subject to internal audit
- Evidence must demonstrate tenant enforcement in practice
- RLS policies must be verified as enabled on all tenant-scoped tables

---

## 7. Incident Handling

- Any cross-tenant data exposure is a **SEV-1 / Critical** security incident
- Incidents are handled under the Incident Response Standard (STD-SEC-007)
- Customer notification follows the Customer Incident Notification Standard
- Cross-tenant exposure requires:
  - Immediate containment
  - Root cause analysis within 24 hours
  - Customer notification within contractual SLA
  - Post-incident review and control remediation

---

## 8. Exceptions & Special Cases

- Exceptions require formal approval under the Policy Exception & Waiver Standard
- Compensating controls MUST be documented
- Exceptions are time-bound and reviewed
- Cross-tenant federation is not an exception — it follows the federation process (STD-SEC-004, §7.5)

---

## 9. Prohibited Practices

The following are explicitly prohibited:

| Practice | Risk |
|----------|------|
| Shared mutable data without tenant scoping | Cross-tenant data leakage |
| Relying on UI-only tenant separation | Bypass via API or direct DB access |
| Hard-coded tenant logic | Unmaintainable, error-prone |
| Cross-tenant queries without approval | Data leakage |
| Using customer identifiers instead of `tenant_id` for isolation | Inconsistent boundary enforcement |
| Accepting `tenant_id` from client input (headers, query params, body) | Tenant spoofing |
| Disabling RLS on tenant-scoped tables | Removes infrastructure-level isolation |

---

## 10. Compliance & Auditability

Compliance with this standard is verified through:
- Architecture reviews (design-time)
- Automated testing evidence (build-time)
- RLS policy audit (deploy-time)
- Access logs and telemetry (runtime)
- Internal audits (periodic)

Non-compliance is treated as a high-risk finding.

---

## 11. Integration with CYBERCUBE Standards

| Standard | Relationship |
|----------|-------------|
| CYBERCUBE Authentication & Identity Standard (STD-SEC-003) | Tenant context extracted from authenticated sessions/tokens |
| CYBERCUBE Authorization & Access Control Standard (STD-SEC-004) | Tenant isolation enforcement, federation, RLS patterns |
| CYBERCUBE Data Classification & Retention Standard (STD-DAT-003) | Classification rules for tenant data, log governance |
| CYBERCUBE Privacy Handling Policy (STD-DAT-002) | Privacy controls within tenant scope |
| CYBERCUBE Incident Response Standard (STD-SEC-007) | SEV-1 handling for cross-tenant exposure |
| CYBERCUBE Enterprise Risk Management (ERM) Policy | Tenant isolation as enterprise risk control |

Tenant isolation is a shared responsibility across all layers.

---

## 12. Review & Maintenance

- Reviewed annually or upon material architectural change
- Updates require executive approval
- Material changes trigger re-validation of RLS policies and isolation tests

---

## Quick Reference Card

Print it. Pin it. Reference it.

**Core Rule: Isolation by Default**

```
No tenant context = DENY
Cross-tenant request = DENY
Missing tenant_id in query = NON-COMPLIANT
RLS disabled on tenant table = NON-COMPLIANT
```

**Tenant ID Format**

```
tenant_id = Account CC-PID: ACC-XXXXXX-X
Source: authentication token (NEVER client input)
```

**Isolation by Layer**

```
App layer    → Middleware extracts tenant from token
API layer    → Request validation + tenant scoping
Data layer   → RLS + mandatory tenant_id column
Cache layer  → Tenant-scoped keys ({tenant_id}:key)
Async layer  → Tenant context in job payload
Logs/metrics → tenant_id in all tenant-scoped entries
```

**What You MUST NOT Do**

```
- Accept tenant_id from client input
- Query tenant-scoped tables without tenant filter
- Disable RLS on tenant-scoped tables
- Rely on UI-only tenant separation
- Hard-code tenant logic
- Aggregate metrics across tenants without redaction
```

**What You MUST Do**

```
- Extract tenant from auth context on every request
- Include tenant_id in all tenant-scoped queries
- Enable RLS on all tenant-scoped PostgreSQL tables
- Write negative tests for cross-tenant access
- Log tenant_id in all tenant-scoped log entries
- Treat cross-tenant exposure as SEV-1
```

**Incident Severity**

```
Cross-tenant data exposure = SEV-1 / Critical
Missing tenant_id in query = P0 / Release-blocking
RLS not enabled = P0 / Release-blocking
```

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Tenant context middleware | PARTIAL | Basic extraction exists |
| RLS policies (PostgreSQL) | PENDING | Design complete in STD-SEC-004 |
| Tenant-scoped cache keys | PENDING | Pattern defined |
| Object storage isolation | PENDING | Path convention needed |
| Async job tenant context | PENDING | Design needed |
| Negative isolation tests | PENDING | Test framework needed |
| Cross-tenant audit logging | PARTIAL | Basic logging exists |
| Tenant federation | PENDING | Defined in STD-SEC-004 |

### Migration Path

1. **Phase 1**: Enable RLS on all existing tenant-scoped tables
2. **Phase 2**: Tenant context middleware on all API routes
3. **Phase 3**: Cache and object storage tenant scoping
4. **Phase 4**: Async job tenant context enforcement
5. **Phase 5**: Negative isolation test suite
6. **Phase 6**: Audit validation + compliance evidence

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release — restructured to framework standard |
