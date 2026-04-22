# M-29 — Configuration Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.29 (lines 1864–1928)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.29 Configuration Module (M-29) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IConfigurationService                                                   │
│  MODULE: M-29 Configuration                                                        │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Configuration Retrieval                                                         │
│  get<T>(key: ConfigKey) → Result<T, ConfigError>                                   │
│  getRequired<T>(key: ConfigKey) → T                   // Throws on missing         │
│  getOptional<T>(key: ConfigKey, fallback: T) → T                                   │
│  getNamespace(namespace: String) → Result<ConfigMap, ConfigError>                  │
│                                                                                     │
│  // Typed Accessors                                                                 │
│  getString(key: ConfigKey, fallback?: String) → String                             │
│  getInt(key: ConfigKey, fallback?: Int) → Int                                      │
│  getFloat(key: ConfigKey, fallback?: Float) → Float                                │
│  getBool(key: ConfigKey, fallback?: Boolean) → Boolean                             │
│  getDuration(key: ConfigKey, fallback?: Duration) → Duration                       │
│  getUrl(key: ConfigKey, fallback?: URL) → URL                                      │
│  getList<T>(key: ConfigKey, fallback?: List<T>) → List<T>                          │
│                                                                                     │
│  // Schema Validation                                                               │
│  validate(schema: ConfigSchema) → Result<ValidatedConfig, List<ConfigError>>       │
│  registerSchema(namespace: String, schema: ConfigSchema) → void                    │
│                                                                                     │
│  // Environment                                                                     │
│  getEnvironment() → Environment       // "production" | "staging" | "development"  │
│  isProduction() → Boolean                                                          │
│  isDevelopment() → Boolean                                                          │
│                                                                                     │
│  // Hot Reload (optional capability)                                                │
│  onConfigChange(key: ConfigKey, handler: (old: T, new: T) → void) → Subscription  │
│  refresh() → Result<void, ConfigError>                                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CONFIG SOURCES (priority order, highest wins):                                     │
│  1. Runtime overrides (hot reload)                                                  │
│  2. Environment variables                                                           │
│  3. Config files (JSON/YAML, per-environment)                                       │
│  4. Remote config (e.g., Consul, Parameter Store)                                   │
│  5. Schema-defined defaults                                                         │
│                                                                                     │
│  ENV VAR NAMING: CYBERCUBE_{NAMESPACE}_{KEY} (uppercase, underscores)              │
│  Example: CYBERCUBE_AUTH_TOKEN_TTL_SECONDS=900                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Fails fast on missing required config at startup                                 │
│  • Schema validation before module initialization                                   │
│  • Secrets NEVER appear in config dumps/logs (→ M-17 for secrets)                  │
│  • Environment-aware (prod vs staging vs dev defaults differ)                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: CONFIG_LOADED | CONFIG_REFRESHED | CONFIG_VALIDATION_FAILED               │
│  ERROR CODES: CFG_001 Key not found | CFG_002 Type mismatch |                      │
│               CFG_003 Schema validation failed | CFG_004 Source unavailable         │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
