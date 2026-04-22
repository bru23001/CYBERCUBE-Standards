# M-33 — HTTP Client Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.33 (lines 2227–2354)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.33 HTTP Client Module (M-33) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IHttpClientService                                                      │
│  MODULE: M-33 HTTP Client                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Request Methods                                                                 │
│  get(url: URL, opts?: RequestOpts) → Result<HttpResponse, HttpClientError>         │
│  post(url: URL, body: any, opts?: RequestOpts) → Result<HttpResponse, HttpErr>     │
│  put(url: URL, body: any, opts?: RequestOpts) → Result<HttpResponse, HttpErr>      │
│  patch(url: URL, body: any, opts?: RequestOpts) → Result<HttpResponse, HttpErr>    │
│  delete(url: URL, opts?: RequestOpts) → Result<HttpResponse, HttpClientError>      │
│  request(method: HttpMethod, url: URL, opts?: RequestOpts) → Result<HttpResponse>  │
│                                                                                     │
│  // Client Factory (per-host configuration)                                         │
│  createClient(config: HttpClientConfig) → IHttpClient                              │
│  getDefaultClient() → IHttpClient                                                  │
│                                                                                     │
│  // Circuit Breaker Management                                                      │
│  getCircuitState(host: String) → CircuitState                                      │
│  resetCircuit(host: String) → void                                                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  REQUEST OPTIONS:                                                                   │
│                                                                                     │
│  RequestOpts = {                                                                    │
│    headers?      : Map<String, String>,                                            │
│    timeout?      : Duration,            // Default: 30s (configurable via M-29)    │
│    retries?      : RetryConfig,         // Default: 3 retries, exponential backoff │
│    circuitBreaker?: Boolean,            // Default: true                            │
│    followRedirects?: Boolean,           // Default: true, max 5                    │
│    responseType? : "json"|"text"|"binary"|"stream",                                │
│    auth?         : AuthConfig,          // Bearer, Basic, mTLS cert                │
│    proxy?        : ProxyConfig,                                                    │
│    signal?       : AbortSignal,         // Cancellation                            │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  RETRY CONFIGURATION:                                                               │
│                                                                                     │
│  RetryConfig = {                                                                    │
│    maxRetries    : Int,                 // Default: 3                               │
│    baseDelay     : Duration,            // Default: 200ms                           │
│    maxDelay      : Duration,            // Default: 30s                             │
│    backoffFactor : Float,               // Default: 2.0 (exponential)              │
│    retryOn       : List<Int>,           // Default: [429, 502, 503, 504]           │
│    retryOnNetworkError: Boolean,        // Default: true                            │
│    jitter        : Boolean,             // Default: true (decorrelated)             │
│  }                                                                                  │
│                                                                                     │
│  Retry-After header: MUST be honored when present (RFC 7231)                       │
│  Idempotent methods (GET/HEAD/PUT/DELETE): safe to retry by default                │
│  Non-idempotent (POST/PATCH): retry only if explicitly opted in                    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CIRCUIT BREAKER (per-host):                                                        │
│                                                                                     │
│  CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN"                                    │
│                                                                                     │
│  Thresholds (configurable via M-29):                                                │
│  • Failure threshold: 5 failures in 60s → OPEN                                     │
│  • Open duration: 30s → HALF_OPEN (allow 1 probe request)                          │
│  • Success in HALF_OPEN → CLOSED | Failure → OPEN again                            │
│                                                                                     │
│  When OPEN: fast-fail with HTP_003 (no network call made)                          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CORRELATION PROPAGATION (MANDATORY — per STD-OPS-003):                             │
│                                                                                     │
│  All outbound requests automatically include:                                       │
│  • X-Request-ID      : {current requestId}                                         │
│  • traceparent       : {W3C Trace Context from M-13}                               │
│  • X-Tenant-ID       : {current tenantId} (internal calls only, never external)    │
│  • User-Agent        : "CYBERCUBE/{service}/{version}"                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LOGGING (PII-redacted — per STD-OPS-003 / STD-SEC-002):                            │
│                                                                                     │
│  Request log:  method, url (path only, no query params with PII), status,          │
│                duration_ms, retry_count, circuit_state                              │
│  NEVER log:    Authorization headers, request/response bodies (unless DEBUG),       │
│                cookies, API keys, tokens                                            │
│  Slow request: >1s → WARN with full timing breakdown                               │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  RESPONSE:                                                                          │
│                                                                                     │
│  HttpResponse = {                                                                   │
│    status     : Int,                    // HTTP status code                         │
│    headers    : Map<String, String>,                                               │
│    body       : T,                      // Deserialized per responseType            │
│    duration   : Duration,               // Total including retries                  │
│    retries    : Int,                    // Number of retries performed              │
│    requestId  : String,                 // Correlation                              │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Correlation IDs propagated on every outbound request (STD-OPS-003)              │
│  • No secrets in logs (STD-SEC-002)                                                │
│  • Circuit breaker isolates per-host failures                                       │
│  • Retry respects Retry-After headers                                              │
│  • Connection pooling per host (keep-alive)                                        │
│  • TLS 1.2+ enforced on all HTTPS calls (STD-SEC-005)                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • ILogger                 — Request/response logging (M-11)                        │
│  • ITracer                 — Span context propagation (M-13)                        │
│  • IConfigProvider         — Timeouts, retry config, circuit thresholds (M-29)      │
│  • IErrorFactory           — Error creation (M-30)                                  │
│  • ICryptoPort             — mTLS certificate handling (M-16)                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: CIRCUIT_OPENED | CIRCUIT_CLOSED | CIRCUIT_HALF_OPEN | SLOW_REQUEST        │
│  ERROR CODES: HTP_001 Connection refused | HTP_002 Request timeout |               │
│               HTP_003 Circuit open | HTP_004 DNS resolution failed |               │
│               HTP_005 TLS handshake failed | HTP_006 Response too large |          │
│               HTP_007 Max retries exhausted | HTP_008 Invalid response              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
