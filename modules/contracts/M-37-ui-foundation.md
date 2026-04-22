# M-37 — UI Foundation Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.37 (lines 2768–2900)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.37 UI Foundation Module (M-37) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IUIFoundationService                                                    │
│  MODULE: M-37 UI Foundation                                                         │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Design Tokens                                                                   │
│  getTokens(theme?: ThemeId) → DesignTokenSet                                       │
│  getToken(category: TokenCategory, name: String, theme?: ThemeId) → TokenValue     │
│  getBreakpoints() → BreakpointMap                                                  │
│                                                                                     │
│  // Theme Engine                                                                    │
│  getTheme(themeId: ThemeId) → Result<Theme, UIError>                               │
│  setTheme(themeId: ThemeId) → void                                                 │
│  getActiveTheme() → Theme                                                          │
│  registerTheme(theme: ThemeDefinition) → Result<ThemeId, UIError>                  │
│  getTenantTheme(tenantId: TenantId) → Result<Theme, UIError>                       │
│                                                                                     │
│  // Component Registry                                                              │
│  getComponent(name: ComponentName) → ComponentDefinition                            │
│  listComponents(category?: ComponentCategory) → List<ComponentDefinition>          │
│                                                                                     │
│  // Layout                                                                          │
│  getLayout(name: LayoutName) → LayoutDefinition                                    │
│  getPageTemplate(name: TemplateName) → PageTemplate                                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DESIGN TOKEN CATEGORIES:                                                           │
│                                                                                     │
│  TokenCategory = "color" | "spacing" | "typography" | "elevation"                  │
│                 | "borderRadius" | "motion" | "breakpoint" | "opacity"             │
│                                                                                     │
│  Token format: cybercube-{category}-{semantic}-{variant}                           │
│  Examples:                                                                          │
│    cybercube-color-primary-500                                                      │
│    cybercube-spacing-md                                                             │
│    cybercube-typography-heading-lg                                                  │
│    cybercube-elevation-card                                                         │
│    cybercube-motion-ease-in-out                                                     │
│                                                                                     │
│  Output formats: CSS Custom Properties (default), JSON, SCSS, Tailwind config      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  THEME ENGINE:                                                                      │
│                                                                                     │
│  Built-in themes: "light" (default) | "dark"                                       │
│  Tenant themes: override any token via M-10 tenant config (white-label)            │
│  Theme switching: runtime, no page reload, CSS custom properties                   │
│  System preference: auto-detect prefers-color-scheme (user override persists)      │
│                                                                                     │
│  ThemeDefinition = {                                                                │
│    id          : ThemeId,                                                           │
│    name        : String,                                                            │
│    extends?    : ThemeId,              // Inherit + override                        │
│    tokens      : Partial<DesignTokenSet>,  // Only override what changes           │
│    metadata    : { brand?: String, logo?: URL, favicon?: URL }                     │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  COMPONENT LIBRARY:                                                                 │
│                                                                                     │
│  Categories & primitives:                                                           │
│  • Layout:    Shell, Sidebar, Header, Footer, Grid, Stack, Container               │
│  • Input:     Button, TextField, Select, Checkbox, Radio, Toggle, DatePicker       │
│  • Display:   Text, Heading, Badge, Avatar, Card, Table, List, EmptyState          │
│  • Feedback:  Toast, Alert, Modal, Dialog, ProgressBar, Spinner, Skeleton          │
│  • Navigation: Tabs, Breadcrumb, Pagination, Menu, Link, NavItem                   │
│  • Data:      DataTable (sort/filter/page), Chart (wrapper), Stat, KPI             │
│                                                                                     │
│  Component contract:                                                                │
│  • Props: TypeScript interfaces, documented, with defaults                          │
│  • Variants: size (sm/md/lg), intent (primary/secondary/danger/ghost)              │
│  • Slots: composable children pattern (no render-prop spaghetti)                   │
│  • Events: onAction callbacks, not DOM events (framework-agnostic contract)        │
│  • Test IDs: data-testid="{component}-{element}[-{variant}]" (per STD-ENG-005)    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LAYOUT SYSTEM:                                                                     │
│                                                                                     │
│  Responsive grid: 12-column, configurable gutter, breakpoint-aware                 │
│  Breakpoints (from tokens):                                                         │
│    sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px                  │
│                                                                                     │
│  Page templates:                                                                    │
│  • Dashboard: sidebar + header + content grid                                       │
│  • Form: centered content, max-width, stepped/tabbed                                │
│  • List/Table: full-width, toolbar + data table + pagination                        │
│  • Detail: breadcrumb + content + sidebar actions                                   │
│  • Auth: centered card, minimal chrome                                              │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ACCESSIBILITY (WCAG 2.1 AA — MANDATORY):                                          │
│                                                                                     │
│  • Color contrast: 4.5:1 text, 3:1 large text / UI components                     │
│  • Keyboard navigation: all interactive elements focusable + operable              │
│  • Focus management: visible focus ring, logical tab order, focus trap in modals   │
│  • ARIA: roles, labels, live regions on all components                              │
│  • Screen reader: meaningful alt text, landmark regions, heading hierarchy          │
│  • Motion: respect prefers-reduced-motion, no auto-play without control            │
│  • Touch targets: minimum 44x44px on mobile                                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • All components token-driven (no hardcoded colors/sizes)                         │
│  • White-label support via M-10 tenant theme overrides                             │
│  • WCAG 2.1 AA compliance on every component                                      │
│  • Framework-agnostic contracts (React impl primary, contracts portable)           │
│  • Storybook documentation for every component                                      │
│  • Visual regression tests on all components                                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES:                                                                      │
│  • M-29 Config       — Theme configuration, feature flags for component variants   │
│  • M-10 Tenant       — Tenant-scoped theme overrides (white-label branding)        │
│  • M-27 Feature Flag — Component-level feature gates                                │
│                                                                                     │
│  NOTE: M-37 is CLIENT-SIDE only. No server-side dependencies (no DAL, no Audit).   │
│  Theme config loaded at app init via M-29; tenant theme resolved via M-10 API.     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: (none — client-side module, no server-side event bus integration)          │
│  ERROR CODES: UI_001 Theme not found | UI_002 Token not found |                    │
│               UI_003 Component not found | UI_004 Layout not found |               │
│               UI_005 Accessibility violation detected                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
