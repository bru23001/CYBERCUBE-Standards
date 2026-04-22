# M-13 — Tracing Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.13 (lines 1252–1285)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.13 Tracing Module (M-13) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ITracingService                                                         │
│  MODULE: M-13 Tracing                                                               │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Span Management                                                                 │
│  startSpan(name: String, options?: SpanOptions) → ISpan                            │
│  getCurrentSpan() → ISpan?                                                         │
│  withSpan<T>(name: String, fn: (span: ISpan) → T) → T                              │
│                                                                                     │
│  // Context Propagation                                                             │
│  inject(carrier: Object) → void              // Add trace headers                  │
│  extract(carrier: Object) → SpanContext?     // Read trace headers                 │
│                                                                                     │
│  // Span Operations                                                                 │
│  ISpan.setAttribute(key: String, value: Any) → void                                │
│  ISpan.addEvent(name: String, attributes?: Object) → void                          │
│  ISpan.setStatus(status: SpanStatus) → void                                        │
│  ISpan.recordException(error: Error) → void                                        │
│  ISpan.end() → void                                                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  PROPAGATION HEADERS: traceparent, tracestate (W3C Trace Context)                  │
│  EXPORT FORMAT: OpenTelemetry Protocol (OTLP)                                       │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
