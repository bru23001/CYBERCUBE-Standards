# M-20 — Security Headers Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.20 (lines 1520–1555)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.20 Security Headers Module (M-20) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ISecurityHeadersService                                                 │
│  MODULE: M-20 Security Headers                                                      │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Header Application                                                              │
│  applyHeaders(response: HttpResponse) → HttpResponse                               │
│  getHeaders() → Map<String, String>                                                │
│                                                                                     │
│  // Configuration                                                                   │
│  setCSP(policy: ContentSecurityPolicy) → void                                      │
│  setCORS(config: CORSConfig) → void                                                │
│  setHSTS(maxAge: Duration, includeSubdomains: Boolean) → void                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEFAULT HEADERS:                                                                   │
│  • Strict-Transport-Security: max-age=31536000; includeSubDomains                  │
│  • X-Content-Type-Options: nosniff                                                  │
│  • X-Frame-Options: DENY                                                            │
│  • X-XSS-Protection: 0  // Deprecated, rely on CSP                                 │
│  • Content-Security-Policy: default-src 'self'; script-src 'self'                  │
│  • Referrer-Policy: strict-origin-when-cross-origin                                 │
│  • Permissions-Policy: geolocation=(), microphone=(), camera=()                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CORS: Configurable origins, methods, headers, credentials, max-age                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
