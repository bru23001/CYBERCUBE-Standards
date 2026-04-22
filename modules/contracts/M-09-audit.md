# M-09 — Audit Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.4 (lines 871–933)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.4 Audit Module (M-09) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IAuditService                                                           │
│  MODULE: M-09 Audit                                                                 │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Event Emission (Non-Blocking)                                                   │
│  emit(event: AuditEvent) → void                        // Fire-and-forget           │
│  emitBatch(events: List<AuditEvent>) → void            // Bulk emission             │
│                                                                                     │
│  // Event Queries (Admin Only)                                                      │
│  query(filter: AuditFilter, pagination: Page) → Result<AuditPage, Error>           │
│  getEvent(eventId: EventId) → Result<AuditEvent, NotFoundError>                    │
│  getEventsByUser(userId: UserId, timeRange: TimeRange) → Result<List<AuditEvent>>  │
│  getEventsByResource(resourceId: ResourceId, timeRange: TimeRange) → Result<...>   │
│                                                                                     │
│  // Export (Compliance)                                                             │
│  export(filter: AuditFilter, format: ExportFormat) → Result<ExportJob, Error>      │
│  getExportStatus(jobId: JobId) → Result<ExportStatus, Error>                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  AUDIT EVENT SCHEMA (All Modules Must Comply):                                      │
│  {                                                                                  │
│    eventId: UUID,                  // Auto-generated                                │
│    eventType: String,              // "USER_LOGIN" | "AUTHZ_DECISION" | etc.       │
│    timestamp: ISO8601,             // Server time (UTC)                             │
│    correlationId: UUID,            // Request trace ID                              │
│    tenantId: TenantId,             // Multi-tenant isolation                        │
│                                                                                     │
│    actor: {                                                                         │
│      type: "USER" | "SYSTEM" | "SERVICE",                                          │
│      id: String,                   // UserId or ServiceId                           │
│      ip: String?,                  // Client IP (if applicable)                     │
│      userAgent: String?            // Client UA (if applicable)                     │
│    },                                                                               │
│                                                                                     │
│    action: String,                 // "CREATE" | "READ" | "UPDATE" | "DELETE"      │
│    resource: {                                                                      │
│      type: String,                 // "USER" | "SESSION" | "DOCUMENT"              │
│      id: String                    // Resource identifier                           │
│    },                                                                               │
│                                                                                     │
│    outcome: "SUCCESS" | "FAILURE",                                                  │
│    reason: String?,                // Failure reason (if applicable)                │
│    metadata: Object?               // Additional context (no PII/secrets)           │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Events are immutable once written                                                │
│  • Events are tamper-evident (hash chain)                                           │
│  • emit() never blocks the caller (async buffer)                                    │
│  • Maximum event latency: 30 seconds to durable storage                             │
│  • Retention: Configurable per tenant (default 2 years, immutable)                  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
