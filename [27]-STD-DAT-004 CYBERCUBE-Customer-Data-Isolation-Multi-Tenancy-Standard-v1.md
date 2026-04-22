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

CYBERCUBE Customer Data Isolation & Multi-Tenancy Standard (v1.2)

**Standard ID:** STD-DAT-004
**Status:** Active
**Effective:** 2026-01-17 (v1), 2026-04-22 (v1.1, v1.2)
**Classification:** INTERNAL
**Owner:** Platform Engineering / Security Architecture
**Applies to:** All CYBERCUBE products, services, systems, and environments

### Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects (single- or multi-tenant) | **T1 MUST** | (1) If the product is multi-tenant, every tenant-scoped table, index, cache key, object-storage path, and async-job payload MUST carry a `tenant_id`. (2) Every query on a tenant-scoped resource MUST filter by `tenant_id` in application code (query-level tenant filtering). (3) Cross-tenant data exposure is a SEV-1 incident; missing `tenant_id` in a query is release-blocking (P0). (4) Single-tenant products MUST declare so explicitly in their `docs/architecture/` so this standard's T2/T3 clauses are correctly scoped. | None (non-waivable *when multi-tenant*) |
| SaaS / customer-facing (multi-tenant) | **T2 SHOULD** | Tenant context middleware on all API routes, tenant-scoped cache keys (prefix convention), tenant-scoped object storage paths, async jobs carry tenant context through the queue, cross-tenant audit logging, negative isolation tests in CI. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | PostgreSQL Row-Level Security (RLS) on all tenant-scoped tables as the *authoritative* enforcement (query-level is defense-in-depth), tenant federation with isolated schemas/databases for enterprise customers, break-glass access procedure with automatic revocation, per-tenant encryption keys (BYOK), periodic isolation penetration tests. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.1 (2026-04-22) — Unfreeze (Path B, scope-gated).** T1 is conditional on multi-tenancy. For multi-tenant products, T1 = declarative + query-level filtering (enforceable today in code review). RLS is T3 only. Resolves prior overlap with [19] STD-SEC-004; that standard now defers to this one for tenant-isolation details.

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

## 3. Isolation Requirements

> **Tier legend:** each rule carries an inline `[T1]`, `[T2]`, or `[T3]` tag mapping
> to the Applicability Tier Table above. Only `[T1]` rules are universally mandatory
> for multi-tenant products; `[T2]` and `[T3]` scope follows POL-GOV-001 §8.7.

### 3.1 Application Layer Isolation

- **[T1]** Every customer-scoped request SHALL carry resolved tenant context.
- **[T1]** `tenant_id` SHALL be resolved from authentication context — never from client input (headers, query, body).
- **[T2]** Authorization checks SHOULD verify tenant ownership of the target resource as a first-class step (see STD-SEC-004).

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

- **[T1]** Every query against a tenant-scoped resource SHALL include `tenant_id` as a filter (query-level tenant filtering).
- **[T2]** APIs SHOULD enforce tenant scoping at request entry via shared middleware.
- **[T2]** Cross-tenant resource access attempts SHOULD return `403`, not `404`, to preserve existence semantics.
- API responses must never include cross-tenant data (this is a correctness property — not a tier-scoped rule).

APIs without tenant enforcement are non-compliant.

### 3.3 Data Layer Isolation

All data storage mechanisms SHALL enforce isolation at the tier indicated below:

| Storage Type | Isolation Mechanism | Tier |
|-------------|---------------------|:----:|
| Databases (PostgreSQL) | Mandatory `tenant_id` column + query-level filtering | **T1** |
| Databases (PostgreSQL) | Row-Level Security (RLS) as authoritative enforcement | **T3** |
| Object storage | Tenant-scoped paths or buckets (`s3://bucket/{tenant_id}/...`) | **T2** |
| Caches (Redis) | Tenant-scoped keys (`{tenant_id}:resource:id`) | **T2** |
| Search indexes | Tenant-filtered queries with mandatory `tenant_id` filter | **T2** |

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

- **[T2]** Jobs SHOULD carry tenant context explicitly through the queue payload.
- **[T2]** Workers SHOULD validate tenant scope before processing (fail-secure on absence).
- Cross-tenant batch processing requires explicit approval and audit logging.

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

- **[T2]** Logs that reference customer data SHOULD include `tenant_id`.
- **[T2]** Telemetry SHOULD NOT expose cross-tenant data; aggregation pipelines SHOULD redact tenant identifiers before cross-tenant reporting.
- Sensitive-data-in-logs rules defer to STD-DAT-001 (Classification & Retention).

---

## 6. Testing & Validation

### 6.1 Isolation Testing

- **[T1]** Isolation failures (missing tenant filter landing in production) are release-blocking defects (P0).
- **[T2]** CI SHOULD include negative tests for cross-tenant access (Tenant A → Tenant B resources).
- **[T3]** Regulated projects SHALL include RLS validation tests (direct DB queries without app context must return zero cross-tenant rows).

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

**Don't (release-blocking)**

```
- Accept tenant_id from client input
- Query tenant-scoped tables without tenant filter
- Rely on UI-only tenant separation
- Hard-code tenant logic
- Aggregate metrics across tenants without redaction
```

**Do (T1 baseline)**

```
- Extract tenant from auth context on every request
- Include tenant_id in all tenant-scoped queries
- Treat cross-tenant exposure as SEV-1
```

**Do (T2 / T3 — see tier table)**

```
- T2: log tenant_id on tenant-scoped entries
- T2: write negative tests for cross-tenant access
- T3: enable RLS on all tenant-scoped PostgreSQL tables
```

*(Cheat-sheet only; normative requirements are in §3 with inline tier tags.)*

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

| Component | Status | Tier | Notes |
|-----------|--------|------|-------|
| `tenant_id` on tenant-scoped tables | IN PLACE | T1 | Present on all multi-tenant schemas |
| Query-level tenant filtering (application code) | IN PLACE | T1 | Enforced via repo-layer + code-review checklist |
| SEV-1 / P0 classification for isolation breaches | IN PLACE | T1 | Documented in §Cross-Tenant & STD-OPS-004 severity matrix |
| Single- vs multi-tenant declaration per product | PARTIAL | T1 | Template added to `docs/architecture/`; enforcement ROADMAP |
| Tenant context middleware (API routes) | PARTIAL | T2 | Basic extraction exists; universal coverage ROADMAP |
| Tenant-scoped cache keys | ROADMAP | T2 | Pattern defined; rollout pending cache audit |
| Object storage isolation (path convention) | ROADMAP | T2 | Convention defined; rollout pending storage audit |
| Async job tenant context propagation | ROADMAP | T2 | Re-trigger: queue infrastructure audit |
| Negative isolation tests in CI | ROADMAP | T2 | Re-trigger: test-framework consolidation (see STD-ENG-005) |
| Cross-tenant audit logging | PARTIAL | T2 | Basic logging exists; alerting ROADMAP |
| RLS policies (PostgreSQL) | ROADMAP | T3 | Authoritative enforcement for T3 only |
| Tenant federation (isolated schemas/DBs) | ROADMAP | T3 | Only for enterprise T3 customers |
| Break-glass access procedure | ROADMAP | T3 | Regulated projects only |
| Per-tenant encryption keys (BYOK) | ROADMAP | T3 | Enterprise T3 customers |
| Isolation pentest cadence | ROADMAP | T3 | Regulated projects only |

Status vocabulary: `IN PLACE` | `COMPLETE` | `PARTIAL` | `ROADMAP` | `N/A`.

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
| v1.1 | 2026-04-22 | Unfreeze (Path B, scope-gated): added Applicability Tier Table; T1 conditional on multi-tenancy (single-tenant products declare scope). T1 = `tenant_id` universal + query-level filtering + SEV-1 treatment. RLS reclassified to T3 only. Resolves overlap with STD-SEC-004 (that standard now defers to this one for tenant-isolation details). Status vocabulary normalized. |
| v1.2 | 2026-04-22 | Pass-3 friction remediation: inline `[T1]/[T2]/[T3]` tags on every rule in §3 / §5 / §6; MUST density reduced from 54.7 per 1,000 lines to ~20 per 1,000 lines; Quick Reference Card converted from dual MUST/MUST-NOT lists to cheat-sheet tone ("Do / Don't / Policy"); STD-DAT-003 reference corrected to STD-DAT-001 (§5). No semantic change to T1 baseline — only tiering clarity. |
