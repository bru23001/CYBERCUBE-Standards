# M-39 — Search Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.39 (lines 2975–3062)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.39 Search Module (M-39) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ISearchService                                                          │
│  MODULE: M-39 Search                                                                │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Querying                                                                        │
│  search(index: IndexName, query: SearchQuery) → Result<SearchResult, SearchError>  │
│  suggest(index: IndexName, prefix: String, opts?: SuggestOpts) → List<Suggestion>  │
│  count(index: IndexName, query: SearchQuery) → Result<Int, SearchError>            │
│                                                                                     │
│  // Indexing                                                                        │
│  index(index: IndexName, doc: SearchDocument) → Result<void, SearchError>          │
│  indexBatch(index: IndexName, docs: List<SearchDocument>) → Result<BatchResult>    │
│  delete(index: IndexName, docId: String) → Result<void, SearchError>              │
│  reindex(index: IndexName) → Result<ReindexJob, SearchError>                       │
│                                                                                     │
│  // Index Management                                                                │
│  createIndex(config: IndexConfig) → Result<IndexName, SearchError>                 │
│  deleteIndex(index: IndexName) → Result<void, SearchError>                         │
│  getIndexStats(index: IndexName) → IndexStats                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SEARCH QUERY:                                                                      │
│                                                                                     │
│  SearchQuery = {                                                                    │
│    text?       : String,                // Full-text query                          │
│    filters?    : List<Filter>,          // Exact match / range filters              │
│    facets?     : List<FacetConfig>,     // Faceted aggregation                      │
│    sort?       : List<Sort>,            // Relevance (default) or field sort        │
│    page?       : Page,                  // Offset + limit pagination                │
│    highlight?  : HighlightConfig,       // Hit highlighting                         │
│    tenantId    : TenantId,              // MANDATORY — tenant-scoped (STD-DAT-004) │
│  }                                                                                  │
│                                                                                     │
│  SearchResult = {                                                                   │
│    hits        : List<SearchHit>,       // Matching documents                       │
│    total       : Int,                   // Total matches (not just page)            │
│    facets?     : Map<String, List<FacetValue>>,                                    │
│    duration    : Duration,              // Search latency                           │
│    queryId     : String,                // For analytics / relevance tuning         │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SEARCH ENGINE ABSTRACTION:                                                         │
│                                                                                     │
│  Supported backends (swap via M-29 config):                                         │
│  • Elasticsearch (default)                                                          │
│  • Typesense                                                                        │
│  • OpenSearch                                                                       │
│                                                                                     │
│  Adapter interface: ISearchAdapter (implemented per backend)                        │
│  Index naming: {tenant_id}_{entity_type} (tenant-scoped)                           │
│  Sync strategy: Event-driven (M-34 events trigger index updates)                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Tenant-scoped indices (no cross-tenant search per STD-DAT-004)                  │
│  • Eventually consistent with source (M-32 DAL is source of truth)                │
│  • Search engine down → search degraded, CRUD unaffected                           │
│  • PII-aware: searchable fields configurable, no PII in search logs                │
│  • Reindex without downtime (alias swap pattern)                                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES:                                                                      │
│  • M-10 Tenant    — Tenant-scoped index names                                      │
│  • M-29 Config    — Engine connection, index settings                              │
│  • M-30 Errors    — Error creation                                                 │
│  • M-32 DAL       — Source of truth for indexed data                               │
│  • M-34 MsgBus    — Event-driven index sync (entity.created/updated/deleted)       │
│  • M-40 Cache     — Search result caching (short TTL)                              │
│  • M-11 Logging   — Query logging (no PII)                                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: INDEX_CREATED | INDEX_DELETED | REINDEX_STARTED | REINDEX_COMPLETED |      │
│          REINDEX_FAILED | SLOW_QUERY                                                │
│  ERROR CODES: SRC_001 Engine unavailable | SRC_002 Index not found |               │
│               SRC_003 Query parse error | SRC_004 Index write failed |             │
│               SRC_005 Reindex failed | SRC_006 Document too large                  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
