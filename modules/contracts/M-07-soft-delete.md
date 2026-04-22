# M-07 — Soft-Delete Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.9 (lines 1089–1126)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.9 Soft-Delete Module (M-07) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ISoftDeleteService                                                      │
│  MODULE: M-07 Soft-Delete                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Lifecycle Operations                                                            │
│  softDelete(resourceId: ResourceId) → Result<void, Error>                          │
│  restore(resourceId: ResourceId) → Result<void, RestoreError>                      │
│  purge(resourceId: ResourceId) → Result<void, PurgeError>                          │
│  getLifecycleState(resourceId: ResourceId) → Result<LifecycleState, NotFoundError> │
│                                                                                     │
│  // Queries                                                                         │
│  findDeleted(filter: Filter, page: Page) → Result<PagedResult<DeletedResource>>    │
│  getGracePeriodEnd(resourceId: ResourceId) → Result<Timestamp, Error>              │
│  isRestorable(resourceId: ResourceId) → Boolean                                    │
│                                                                                     │
│  // Cascade                                                                         │
│  getCascadeTargets(resourceId: ResourceId) → List<ResourceId>                      │
│  softDeleteCascade(resourceId: ResourceId) → Result<CascadeResult, Error>          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LIFECYCLE STATES: ACTIVE → DELETED → PURGED                                        │
│  Grace Period: Configurable (default 30 days)                                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: RESOURCE_SOFT_DELETED | RESOURCE_RESTORED | RESOURCE_PURGED               │
│  ERROR CODES: DEL_001 Already deleted | DEL_002 Grace period expired |             │
│               DEL_003 Cascade blocked                                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
