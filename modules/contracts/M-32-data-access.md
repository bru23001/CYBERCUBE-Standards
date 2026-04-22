# M-32 — Data Access Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.32 (lines 2100–2226)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.32 Data Access Module (M-32) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IDataAccessService                                                      │
│  MODULE: M-32 Data Access                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Repository Factory                                                              │
│  getRepository<T, ID>(entity: EntityType<T>) → IRepository<T, ID>                  │
│  getReadOnlyRepository<T, ID>(entity: EntityType<T>) → IReadRepository<T, ID>      │
│                                                                                     │
│  // IRepository<T, ID> (implements skeleton §3.2 port)                              │
│  findById(id: ID) → Result<T?, RepositoryError>                                    │
│  findAll(query: QuerySpec, page: Page) → Result<PagedResult<T>, RepositoryError>   │
│  findOne(query: QuerySpec) → Result<T?, RepositoryError>                           │
│  save(entity: T) → Result<T, RepositoryError>                                      │
│  saveBatch(entities: List<T>) → Result<List<T>, RepositoryError>                   │
│  delete(id: ID) → Result<void, RepositoryError>        // Delegates to M-07        │
│  exists(id: ID) → Result<Boolean, RepositoryError>                                 │
│  count(query?: QuerySpec) → Result<Int, RepositoryError>                           │
│                                                                                     │
│  // Query Builder                                                                   │
│  query<T>(entity: EntityType<T>) → IQueryBuilder<T>                                │
│                                                                                     │
│  IQueryBuilder<T>:                                                                  │
│    where(field: String, op: Operator, value: any) → IQueryBuilder<T>              │
│    and(field: String, op: Operator, value: any) → IQueryBuilder<T>                │
│    or(field: String, op: Operator, value: any) → IQueryBuilder<T>                 │
│    orderBy(field: String, direction: "ASC"|"DESC") → IQueryBuilder<T>             │
│    limit(n: Int) → IQueryBuilder<T>                                               │
│    offset(n: Int) → IQueryBuilder<T>                                              │
│    include(relation: String) → IQueryBuilder<T>                                    │
│    select(fields: List<String>) → IQueryBuilder<T>                                │
│    build() → QuerySpec                                                             │
│    execute() → Result<List<T>, RepositoryError>                                   │
│    executeOne() → Result<T?, RepositoryError>                                     │
│    count() → Result<Int, RepositoryError>                                         │
│                                                                                     │
│  // Operators                                                                       │
│  Operator = "eq"|"neq"|"gt"|"gte"|"lt"|"lte"|"in"|"notIn"|"like"|"isNull"|"isNotNull"│
│                                                                                     │
│  // Unit of Work (implements skeleton §3.2 port)                                    │
│  beginTransaction(opts?: TransactionOpts) → Result<ITransaction, TransactionError> │
│                                                                                     │
│  ITransaction:                                                                      │
│    commit() → Result<void, TransactionError>                                       │
│    rollback() → Result<void, TransactionError>                                     │
│    isActive() → Boolean                                                            │
│    savepoint(name: String) → Result<void, TransactionError>                        │
│    rollbackToSavepoint(name: String) → Result<void, TransactionError>              │
│                                                                                     │
│  // Convenience: run in transaction                                                 │
│  withTransaction<T>(fn: (tx: ITransaction) → Result<T, E>) → Result<T, E>         │
│                                                                                     │
│  // Connection Pool Management                                                      │
│  getPoolStatus() → PoolStatus                                                      │
│  drainPool(timeout: Duration) → Result<void, Error>                                │
│                                                                                     │
│  // Migration Runner                                                                │
│  migrate(direction: "up"|"down", steps?: Int) → Result<MigrationResult, Error>     │
│  getMigrationStatus() → List<MigrationInfo>                                        │
│  createMigration(name: String) → Result<MigrationFile, Error>                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  TENANT-AWARE QUERY DECORATION (automatic via M-10):                                │
│                                                                                     │
│  All queries automatically decorated with:                                          │
│  • WHERE tenant_id = {currentTenant}    (from M-10 TenantContext)                  │
│  • WHERE deleted_at IS NULL             (from M-07 Soft-Delete, unless explicit)    │
│  • Parameterized queries ONLY           (per STD-SEC-002 injection prevention)     │
│                                                                                     │
│  Cross-tenant queries: FORBIDDEN (returns DAL_004)                                  │
│  Disabled soft-delete filter: explicit opt-in via includeDeleted()                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CONNECTION POOL:                                                                   │
│                                                                                     │
│  PoolStatus = {                                                                     │
│    total: Int, active: Int, idle: Int, waiting: Int,                               │
│    maxSize: Int,          // Default: 20 (configurable via M-29)                   │
│    minSize: Int,          // Default: 5                                             │
│    acquireTimeout: Duration, // Default: 5s                                         │
│    idleTimeout: Duration    // Default: 30s                                         │
│  }                                                                                  │
│                                                                                     │
│  Health alert: pool usage >80% → DEGRADED | >90% → UNHEALTHY (→ M-15 Health)      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  READ REPLICA ROUTING:                                                              │
│                                                                                     │
│  • Writes → primary (always)                                                        │
│  • Reads → replica (default) | primary (opt-in for consistency)                    │
│  • Inside transaction → primary (always)                                            │
│  • Replication lag awareness: configurable staleness tolerance                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • All queries parameterized (no string interpolation — STD-SEC-002)               │
│  • Tenant isolation enforced at query layer (STD-DAT-004)                          │
│  • Soft-delete filtering by default (STD-DATA-002)                                 │
│  • Connection pool bounded and monitored                                            │
│  • Transactions auto-rollback on unhandled errors                                   │
│  • All write operations emit audit events (→ M-09)                                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • ITenantContext          — Tenant-scoped query decoration (M-10)                  │
│  • ILogger                 — Query logging (M-11)                                   │
│  • IAuditPort              — Write operation audit events (M-09)                    │
│  • IConfigProvider         — Pool sizing, timeouts (M-29)                           │
│  • IErrorFactory           — Error creation (M-30)                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: MIGRATION_APPLIED | MIGRATION_ROLLED_BACK | POOL_EXHAUSTED |              │
│          SLOW_QUERY (>1s) | DEADLOCK_DETECTED                                       │
│  ERROR CODES: DAL_001 Connection failed | DAL_002 Query timeout |                  │
│               DAL_003 Transaction failed | DAL_004 Cross-tenant query blocked |    │
│               DAL_005 Migration failed | DAL_006 Pool exhausted |                  │
│               DAL_007 Deadlock detected | DAL_008 Constraint violation              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
