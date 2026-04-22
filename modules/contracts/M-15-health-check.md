# M-15 — Health Check Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.15 (lines 1321–1356)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.15 Health Check Module (M-15) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IHealthCheckService                                                     │
│  MODULE: M-15 Health Check                                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Probes                                                                          │
│  liveness() → HealthResult                   // Is process alive?                  │
│  readiness() → HealthResult                  // Can accept traffic?                │
│  startup() → HealthResult                    // Has initialization completed?      │
│                                                                                     │
│  // Dependency Checks                                                               │
│  checkDependency(name: String) → DependencyHealth                                  │
│  checkAllDependencies() → List<DependencyHealth>                                   │
│  registerDependency(name: String, checker: HealthChecker) → void                   │
│                                                                                     │
│  // Status Endpoint                                                                 │
│  getStatus() → SystemStatus {                                                       │
│    status: "HEALTHY" | "DEGRADED" | "UNHEALTHY",                                   │
│    version: String,                                                                 │
│    uptime: Duration,                                                                │
│    dependencies: List<DependencyHealth>                                             │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ENDPOINTS: GET /health/live | GET /health/ready | GET /health/status              │
│  K8S INTEGRATION: Configurable thresholds for probe failures                        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
