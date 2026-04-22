# M-19 — Rate Limiting Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.19 (lines 1480–1519)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.19 Rate Limiting Module (M-19) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IRateLimitingService                                                    │
│  MODULE: M-19 Rate Limiting                                                         │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Rate Check                                                                      │
│  checkLimit(key: RateLimitKey, limit: RateLimit) → RateLimitResult {               │
│    allowed: Boolean,                                                                │
│    remaining: Int,                                                                  │
│    resetAt: Timestamp,                                                              │
│    retryAfter: Duration?                                                            │
│  }                                                                                  │
│                                                                                     │
│  // Quota Management                                                                │
│  getQuota(key: RateLimitKey) → Quota                                               │
│  setQuota(key: RateLimitKey, quota: Quota) → Result<void, Error>                   │
│  resetQuota(key: RateLimitKey) → Result<void, Error>                               │
│                                                                                     │
│  // Policy                                                                          │
│  setPolicy(endpoint: String, policy: RateLimitPolicy) → Result<void, Error>        │
│  getPolicy(endpoint: String) → RateLimitPolicy                                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ALGORITHMS: Token Bucket | Sliding Window | Fixed Window | Leaky Bucket           │
│  HEADERS: X-RateLimit-Limit | X-RateLimit-Remaining | X-RateLimit-Reset |          │
│           Retry-After (on 429)                                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEFAULT LIMITS: 100 req/min (anonymous) | 1000 req/min (authenticated)            │
│  ERROR CODE: SYS_003 Rate limit exceeded                                            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
