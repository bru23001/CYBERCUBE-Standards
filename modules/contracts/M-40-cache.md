# M-40 — Cache Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.40 (lines 3063–3162)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.40 Cache Module (M-40) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ICacheService                                                           │
│  MODULE: M-40 Cache                                                                 │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Core Operations                                                                 │
│  get<T>(key: CacheKey) → Result<T?, CacheError>                                   │
│  set<T>(key: CacheKey, value: T, opts?: CacheOpts) → Result<void, CacheError>     │
│  delete(key: CacheKey) → Result<void, CacheError>                                  │
│  exists(key: CacheKey) → Boolean                                                   │
│                                                                                     │
│  // Batch Operations                                                                │
│  getMany<T>(keys: List<CacheKey>) → Map<CacheKey, T?>                             │
│  setMany<T>(entries: Map<CacheKey, T>, opts?: CacheOpts) → Result<void>           │
│  deleteMany(keys: List<CacheKey>) → Result<Int, CacheError>                       │
│                                                                                     │
│  // Pattern Operations                                                              │
│  getOrSet<T>(key: CacheKey, loader: () → T, opts?: CacheOpts) → T                │
│  invalidatePattern(pattern: String) → Result<Int, CacheError>                      │
│  invalidateTag(tag: CacheTag) → Result<Int, CacheError>                            │
│                                                                                     │
│  // Management                                                                      │
│  getStats() → CacheStats                                                           │
│  flush(namespace?: String) → Result<void, CacheError>                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CACHE KEY FORMAT:                                                                  │
│                                                                                     │
│  {tenant_id}:{namespace}:{entity}:{id}[:{variant}]                                 │
│  Examples:                                                                          │
│    ACC-123456-7:users:profile:USR-789012-3                                         │
│    ACC-123456-7:api:rate_limit:192.168.1.1                                         │
│    ACC-123456-7:search:results:query_hash_abc123                                   │
│                                                                                     │
│  Tenant prefix MANDATORY on all tenant-scoped data (STD-DAT-004)                   │
│  System keys (non-tenant): _system:{namespace}:{key}                               │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CACHE OPTIONS:                                                                     │
│                                                                                     │
│  CacheOpts = {                                                                      │
│    ttl?       : Duration,              // Default: 5 min (configurable via M-29)   │
│    tags?      : List<CacheTag>,        // Tag-based invalidation groups            │
│    strategy?  : CacheStrategy,         // Default: CACHE_ASIDE                     │
│  }                                                                                  │
│                                                                                     │
│  CacheStrategy = "CACHE_ASIDE"         // Read: cache → miss → origin → cache      │
│                | "WRITE_THROUGH"       // Write: cache + origin simultaneously      │
│                | "WRITE_BEHIND"        // Write: cache now, origin async            │
│                | "READ_THROUGH"        // Read: cache auto-loads from origin        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  STAMPEDE PROTECTION:                                                               │
│                                                                                     │
│  • Singleflight: concurrent requests for same key → one origin call, share result  │
│  • Early expiry: refresh at 80% of TTL (probabilistic, configurable)               │
│  • Lock-based: distributed lock for expensive recomputes                            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  BACKEND ABSTRACTION:                                                               │
│                                                                                     │
│  Supported backends (swap via M-29 config):                                         │
│  • Redis (default) — single, sentinel, or cluster                                  │
│  • Memcached                                                                        │
│  • In-Memory (test/development only — NOT for production)                          │
│                                                                                     │
│  Adapter interface: ICacheAdapter (implemented per backend)                         │
│  Connection: pooled, health-checked, auto-reconnect                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Tenant-scoped keys (STD-DAT-004) — no cross-tenant cache access                │
│  • Cache unavailable → passthrough to origin (NEVER block on cache failure)        │
│  • No PII in cache keys (use hashed identifiers)                                   │
│  • Serialization: JSON (default), MessagePack for large payloads                   │
│  • Metrics: hit rate, miss rate, eviction count, latency                           │
│  • CONFIDENTIAL+ data: encrypted at rest if cached (via M-16)                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES:                                                                      │
│  • M-10 Tenant    — Tenant-scoped key prefix                                       │
│  • M-29 Config    — Backend connection, TTL defaults, strategy                     │
│  • M-30 Errors    — Error creation                                                 │
│  • M-11 Logging   — Cache hit/miss logging (DEBUG level)                           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: (none — synchronous, in-process; metrics emitted via M-12)                │
│  ERROR CODES: CSH_001 Backend unavailable | CSH_002 Serialization failed |         │
│               CSH_003 Key too large | CSH_004 Value too large |                    │
│               CSH_005 Connection pool exhausted | CSH_006 Flush failed             │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
