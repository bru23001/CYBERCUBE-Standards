# M-30 — Error Handling Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.30 (lines 1927–1996)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.30 Error Handling Module (M-30) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IErrorHandlingService                                                   │
│  MODULE: M-30 Error Handling                                                        │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Error Factory                                                                   │
│  createError(code: ErrorCode, message: String, opts?: ErrorOpts) → ModuleError     │
│  createRetryable(code: ErrorCode, message: String, opts?: ErrorOpts) → ModuleError │
│  createFromException(error: Error, module: ModuleCode) → ModuleError               │
│  wrap(error: Error, code: ErrorCode, message?: String) → ModuleError               │
│                                                                                     │
│  // Error Classification                                                            │
│  classify(error: ModuleError) → ErrorCategory                                      │
│  isRetryable(error: ModuleError) → Boolean                                         │
│  isClientError(error: ModuleError) → Boolean                                       │
│  isServerError(error: ModuleError) → Boolean                                       │
│  getHttpStatus(error: ModuleError) → HttpStatusCode                                │
│                                                                                     │
│  // Serialization (ICD-5 compliant)                                                 │
│  serialize(error: ModuleError) → ErrorResponse        // User-safe JSON            │
│  serializeInternal(error: ModuleError) → InternalError // Full detail, logs only   │
│                                                                                     │
│  // Error Registry                                                                  │
│  registerNamespace(module: ModuleCode, prefix: String) → void                      │
│  registerErrorCode(code: ErrorCode, meta: ErrorMeta) → void                        │
│  getErrorMeta(code: ErrorCode) → Result<ErrorMeta, NotFoundError>                  │
│  listErrorCodes(namespace?: String) → List<ErrorCodeInfo>                          │
│                                                                                     │
│  // i18n Support                                                                    │
│  setLocale(locale: Locale) → void                                                  │
│  getMessage(code: ErrorCode, locale?: Locale, params?: Object) → String            │
│                                                                                     │
│  // Error Aggregation (for batch operations)                                        │
│  aggregate(errors: List<ModuleError>) → AggregateError                             │
│  isAggregate(error: ModuleError) → Boolean                                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ERROR TAXONOMY (implements ICD-5):                                                 │
│                                                                                     │
│  ErrorCategory    → HTTP Status Mapping:                                            │
│  CLIENT_ERROR     → 400 Bad Request                                                │
│  UNAUTHORIZED     → 401 Unauthorized                                               │
│  FORBIDDEN        → 403 Forbidden                                                  │
│  NOT_FOUND        → 404 Not Found                                                  │
│  CONFLICT         → 409 Conflict                                                   │
│  VALIDATION       → 422 Unprocessable Entity                                       │
│  RATE_LIMITED     → 429 Too Many Requests                                          │
│  TRANSIENT        → 503 Service Unavailable (retryable)                            │
│  SERVER_ERROR     → 500 Internal Server Error                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Exceptions NEVER cross module boundaries (→ Result<T,E>)                        │
│  • User-facing messages NEVER contain stack traces, internal paths, or PII         │
│  • Error codes are globally unique via namespace prefix                             │
│  • All error codes have documentation links                                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ERROR CODES: ERR_001 Unknown error code | ERR_002 Namespace collision |            │
│               ERR_003 Serialization failed                                          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
