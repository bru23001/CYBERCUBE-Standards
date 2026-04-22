# M-11 — Logging Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.11 (lines 1165–1213)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.11 Logging Module (M-11) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ILoggingService                                                         │
│  MODULE: M-11 Logging                                                               │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Logging Methods                                                                 │
│  debug(message: String, context?: LogContext) → void                               │
│  info(message: String, context?: LogContext) → void                                │
│  warn(message: String, context?: LogContext) → void                                │
│  error(message: String, error?: Error, context?: LogContext) → void                │
│  fatal(message: String, error?: Error, context?: LogContext) → void                │
│                                                                                     │
│  // Context Management                                                              │
│  withContext(context: LogContext) → ILogger                                        │
│  withCorrelationId(correlationId: UUID) → ILogger                                  │
│                                                                                     │
│  // Configuration                                                                   │
│  setLevel(level: LogLevel) → void                                                  │
│  addRedactionRule(pattern: Regex, replacement: String) → void                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LOG FORMAT (JSON — STD-OPS-003 compliant):                                         │
│  {                                                                                  │
│    "timestamp": ISO8601,        // UTC with milliseconds (required)                │
│    "level": "INFO",             // FATAL|ERROR|WARN|INFO|DEBUG|TRACE               │
│    "message": String,                                                               │
│    "service": String,           // Service name (required)                          │
│    "version": String,           // Service version (required)                       │
│    "environment": String,       // prod|staging|dev (required)                      │
│    "correlationId": UUID,       // Request correlation (when available)             │
│    "tenantId": TenantId,        // Tenant context (when available)                  │
│    "request_id": String,        // req_{base62_22} format                           │
│    "trace_id": String,          // 32 hex (W3C Trace Context)                       │
│    "span_id": String,           // 16 hex                                           │
│    "context": Object            // No PII — auto-redacted                           │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES: PII auto-redacted | Correlation IDs propagated | Structured JSON      │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
