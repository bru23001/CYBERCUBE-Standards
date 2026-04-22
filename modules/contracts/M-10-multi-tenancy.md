# M-10 — Multi-Tenancy Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.5 (lines 934–971)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.5 Multi-Tenancy Module (M-10) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ITenantContext                                                          │
│  MODULE: M-10 Multi-Tenancy                                                         │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Context Management                                                              │
│  getCurrentTenant() → TenantId                         // From request context      │
│  setTenant(tenantId: TenantId) → void                  // Explicit override         │
│  clearTenant() → void                                  // Reset context             │
│  runInTenantContext<T>(tenantId: TenantId, fn: () → T) → T  // Scoped execution    │
│                                                                                     │
│  // Tenant Operations                                                               │
│  getTenant(tenantId: TenantId) → Result<Tenant, NotFoundError>                     │
│  createTenant(tenant: TenantCreate) → Result<Tenant, Error>                        │
│  updateTenant(tenantId: TenantId, patch: TenantPatch) → Result<Tenant, Error>      │
│  suspendTenant(tenantId: TenantId, reason: String) → Result<void, Error>           │
│  activateTenant(tenantId: TenantId) → Result<void, Error>                          │
│                                                                                     │
│  // Query Isolation                                                                 │
│  applyTenantFilter<T>(query: Query<T>) → Query<T>      // Adds WHERE tenant_id = X │
│  validateTenantAccess(resourceTenantId: TenantId) → Result<void, AccessDenied>     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ISOLATION GUARANTEES:                                                              │
│  • All database queries automatically filtered by tenant_id                         │
│  • Cross-tenant queries rejected at ORM/repository level                            │
│  • Tenant context propagated through async operations                               │
│  • API responses never leak data from other tenants                                 │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
