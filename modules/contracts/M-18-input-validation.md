# M-18 — Input Validation Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.18 (lines 1443–1477)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.18 Input Validation Module (M-18) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IInputValidationService                                                 │
│  MODULE: M-18 Input Validation                                                      │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Schema Validation                                                               │
│  validate<T>(schema: Schema<T>, data: unknown) → Result<T, ValidationError>        │
│  validatePartial<T>(schema: Schema<T>, data: unknown) → Result<Partial<T>, Error>  │
│  isValid<T>(schema: Schema<T>, data: unknown) → Boolean                            │
│                                                                                     │
│  // Sanitization                                                                    │
│  sanitize(input: String, rules: SanitizeRules) → String                            │
│  sanitizeHtml(input: String, allowedTags?: List<String>) → String                  │
│  escapeForSql(input: String) → String                // Prefer parameterized       │
│  escapeForShell(input: String) → String              // Prefer avoid shell         │
│                                                                                     │
│  // Type Coercion                                                                   │
│  coerceToInt(input: String) → Result<Int, CoercionError>                           │
│  coerceToDate(input: String, format: String) → Result<Date, CoercionError>         │
│  coerceToEnum<E>(input: String, enumType: E) → Result<E, CoercionError>            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  PREVENTION: SQL Injection | XSS | Command Injection | Path Traversal              │
│  ERROR CODES: VAL_001 Invalid format | VAL_002 Required missing |                  │
│               VAL_003 Out of range | VAL_004 Pattern mismatch                       │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
