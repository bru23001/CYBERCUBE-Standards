# M-04 — API Gateway Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.6 (lines 972–1014)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.6 API Gateway Module (M-04) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IApiGateway                                                             │
│  MODULE: M-04 API Gateway                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Request Processing                                                              │
│  handleRequest(req: HttpRequest) → Result<HttpResponse, GatewayError>              │
│  validateRequest(req: HttpRequest, schema: Schema) → Result<void, ValidationError> │
│  routeRequest(req: HttpRequest) → Result<RouteMatch, NotFoundError>                │
│                                                                                     │
│  // Response Formatting                                                             │
│  wrapResponse<T>(data: T, meta: ResponseMeta) → ApiResponse<T>                     │
│  wrapError(error: ModuleError) → ApiErrorResponse                                  │
│                                                                                     │
│  // Versioning                                                                      │
│  getApiVersion(req: HttpRequest) → ApiVersion                                      │
│  isVersionSupported(version: ApiVersion) → Boolean                                 │
│  getDeprecationInfo(version: ApiVersion) → DeprecationInfo?                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  RESPONSE ENVELOPE:                                                                 │
│  {                                                                                  │
│    "data": T,                        // Payload                                     │
│    "meta": {                                                                        │
│      "requestId": String,            // Correlation ID                              │
│      "timestamp": ISO8601,           // Server time                                 │
│      "version": String               // API version used                            │
│    }                                                                                │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ERROR CODES: API_001 Route not found | API_002 Version unsupported |              │
│               API_003 Request too large | API_004 Unsupported media type           │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
