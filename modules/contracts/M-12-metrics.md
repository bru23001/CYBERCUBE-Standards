# M-12 — Metrics Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.12 (lines 1214–1253)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.12 Metrics Module (M-12) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IMetricsService                                                         │
│  MODULE: M-12 Metrics                                                               │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Metric Types                                                                    │
│  counter(name: String, tags?: Tags) → ICounter                                     │
│  gauge(name: String, tags?: Tags) → IGauge                                         │
│  histogram(name: String, buckets: List<Number>, tags?: Tags) → IHistogram          │
│  timer(name: String, tags?: Tags) → ITimer                                         │
│                                                                                     │
│  // Counter Operations                                                              │
│  ICounter.increment(value?: Number) → void                                         │
│  ICounter.get() → Number                                                           │
│                                                                                     │
│  // Gauge Operations                                                                │
│  IGauge.set(value: Number) → void                                                  │
│  IGauge.increment(value?: Number) → void                                           │
│  IGauge.decrement(value?: Number) → void                                           │
│                                                                                     │
│  // Histogram/Timer Operations                                                      │
│  IHistogram.observe(value: Number) → void                                          │
│  ITimer.time<T>(fn: () → T) → T                                                    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GOLDEN SIGNALS (Required for all services):                                        │
│  • Latency: cybercube_http_request_duration_ms (histogram)                           │
│  • Traffic: cybercube_http_requests_total (counter)                                 │
│  • Errors: cybercube_http_errors_total (counter by type)                            │
│  • Saturation: cybercube_queue_depth, cybercube_connection_pool_usage (gauges)      │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
