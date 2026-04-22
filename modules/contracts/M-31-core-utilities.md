# M-31 — Core Utilities Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.31 (lines 1997–2097)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.31 Core Utilities Module (M-31) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IDateTimeService                                                        │
│  MODULE: M-31 Core Utilities (Date & Time)                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Timestamp Operations (all UTC — per STD-OPS-003)                                │
│  now() → Timestamp                                    // ISO 8601 UTC ms            │
│  parse(input: String) → Result<Timestamp, ParseError>                              │
│  format(ts: Timestamp, pattern?: String) → String                                  │
│  toISO8601(ts: Timestamp) → String                    // "2026-02-11T14:30:00.000Z"│
│                                                                                     │
│  // Arithmetic                                                                      │
│  add(ts: Timestamp, duration: Duration) → Timestamp                                │
│  subtract(ts: Timestamp, duration: Duration) → Timestamp                           │
│  diff(a: Timestamp, b: Timestamp) → Duration                                       │
│                                                                                     │
│  // Comparisons                                                                     │
│  isBefore(a: Timestamp, b: Timestamp) → Boolean                                   │
│  isAfter(a: Timestamp, b: Timestamp) → Boolean                                    │
│  isBetween(ts: Timestamp, range: TimeRange) → Boolean                              │
│  isExpired(ts: Timestamp, ttl: Duration) → Boolean                                 │
│                                                                                     │
│  // Timezone-Aware Display (for UI, never for storage)                              │
│  toTimezone(ts: Timestamp, tz: TimezoneId) → LocalDateTime                         │
│  fromTimezone(local: LocalDateTime, tz: TimezoneId) → Timestamp                    │
│                                                                                     │
│  // Duration Helpers                                                                │
│  milliseconds(n: Number) → Duration                                                │
│  seconds(n: Number) → Duration                                                     │
│  minutes(n: Number) → Duration                                                     │
│  hours(n: Number) → Duration                                                       │
│  days(n: Number) → Duration                                                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  INTERFACE: IStringService                                                          │
│  MODULE: M-31 Core Utilities (String)                                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Safe Operations                                                                 │
│  slugify(input: String) → String                      // URL-safe slug              │
│  truncate(input: String, maxLength: Int, suffix?: String) → String                 │
│  capitalize(input: String) → String                                                │
│  camelCase(input: String) → String                                                 │
│  snakeCase(input: String) → String                                                 │
│  kebabCase(input: String) → String                                                 │
│                                                                                     │
│  // PII-Safe Operations (per STD-DAT-001)                                           │
│  maskEmail(email: String) → String                    // "j***@example.com"         │
│  maskPhone(phone: String) → String                    // "***-***-7890"             │
│  redactFull(input: String) → "[REDACTED]"                                          │
│  maskPartial(input: String, visibleChars: Int) → String                            │
│                                                                                     │
│  // Comparison & Search                                                             │
│  isBlank(input: String?) → Boolean                                                 │
│  isNotBlank(input: String?) → Boolean                                              │
│  equalsIgnoreCase(a: String, b: String) → Boolean                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  INTERFACE: IMathService                                                            │
│  MODULE: M-31 Core Utilities (Math)                                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Precision Math (for financial / currency calculations)                           │
│  add(a: Decimal, b: Decimal, precision?: Int) → Decimal                            │
│  subtract(a: Decimal, b: Decimal, precision?: Int) → Decimal                       │
│  multiply(a: Decimal, b: Decimal, precision?: Int) → Decimal                       │
│  divide(a: Decimal, b: Decimal, precision?: Int) → Result<Decimal, DivByZeroError>│
│  round(value: Decimal, precision: Int, mode?: RoundingMode) → Decimal              │
│                                                                                     │
│  // Percentage & Ratio                                                              │
│  percentage(value: Decimal, total: Decimal) → Decimal                              │
│  applyPercentage(value: Decimal, percent: Decimal) → Decimal                       │
│                                                                                     │
│  // Clamping & Ranges                                                               │
│  clamp(value: Number, min: Number, max: Number) → Number                           │
│  isInRange(value: Number, min: Number, max: Number) → Boolean                      │
│                                                                                     │
│  // Safe Conversions                                                                │
│  toInt(value: String) → Result<Int, ParseError>                                    │
│  toFloat(value: String) → Result<Float, ParseError>                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • All timestamps stored/transmitted in UTC (timezone for display only)             │
│  • Financial math uses Decimal (never floating-point)                               │
│  • PII masking follows STD-DAT-001 / STD-OPS-003 redaction rules                  │
│  • All operations are pure functions (no side effects, stateless)                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ERROR CODES: UTL_001 Date parse failed | UTL_002 Invalid timezone |               │
│               UTL_003 Division by zero | UTL_004 Numeric overflow                   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
