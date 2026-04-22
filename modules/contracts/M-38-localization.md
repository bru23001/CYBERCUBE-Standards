# M-38 — Localization Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.38 (lines 2903–2974)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.38 Localization Module (M-38) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ILocalizationService                                                    │
│  MODULE: M-38 Localization                                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Translation                                                                     │
│  t(key: TranslationKey, params?: Map<String, any>, locale?: Locale) → String       │
│  tPlural(key: TranslationKey, count: Int, params?: Map, locale?: Locale) → String  │
│  hasTranslation(key: TranslationKey, locale?: Locale) → Boolean                    │
│                                                                                     │
│  // Locale Management                                                               │
│  getLocale() → Locale                                                              │
│  setLocale(locale: Locale) → void                                                  │
│  getSupportedLocales() → List<Locale>                                              │
│  detectLocale(request: RequestContext) → Locale   // Accept-Language → best match  │
│                                                                                     │
│  // Formatting                                                                      │
│  formatNumber(value: Number, opts?: NumberFormatOpts, locale?: Locale) → String    │
│  formatCurrency(amount: Decimal, currency: CurrencyCode, locale?: Locale) → String │
│  formatDate(date: Timestamp, format?: DateFormat, locale?: Locale) → String        │
│  formatRelativeTime(date: Timestamp, locale?: Locale) → String                     │
│  formatList(items: List<String>, style?: ListStyle, locale?: Locale) → String      │
│                                                                                     │
│  // Translation Management                                                          │
│  loadNamespace(namespace: String, locale: Locale) → Result<void, I18nError>        │
│  addTranslations(locale: Locale, translations: TranslationMap) → void              │
│  getMissingKeys(locale: Locale) → List<TranslationKey>                             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LOCALE RESOLUTION (priority order):                                                │
│  1. Explicit user preference (stored per user)                                     │
│  2. Accept-Language header (request-scoped)                                        │
│  3. Tenant default locale (via M-10)                                               │
│  4. System default: "en-US"                                                        │
│                                                                                     │
│  Format: BCP 47 (e.g., "en-US", "de-DE", "ja-JP")                                │
│  RTL support: automatic direction detection per locale                             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  TRANSLATION KEY FORMAT:                                                            │
│  {namespace}.{section}.{key} — e.g., "auth.login.title"                            │
│  Namespaces loaded lazily (per module / per page)                                  │
│  Fallback chain: exact locale → language → default locale → key itself             │
│  ICU MessageFormat for pluralization + interpolation                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Stateless (locale per request context, no server state)                         │
│  • Missing key → returns key itself + logs warning (never throws)                  │
│  • Number/currency formatting uses Intl standards (ICU)                             │
│  • Currency amounts via Decimal (M-31), never floating point                       │
│  • PII-safe: no user data in translation keys                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES:                                                                      │
│  • M-29 Config    — Default locale, supported locales, fallback chain              │
│  • M-30 Errors    — i18n-ready error messages (error codes → localized strings)    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: (none — stateless, in-process)                                             │
│  ERROR CODES: I18N_001 Locale not supported | I18N_002 Namespace load failed |     │
│               I18N_003 Format error | I18N_004 Translation file parse error         │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
