# CYBERCUBE Module, Component & File Naming Standard (v1.0)

**Standard ID:** STD-ENG-001C  
**Status:** Active  
**Effective:** 2026-04-22  
**Classification:** INTERNAL  
**Owner:** Engineering Lead  
**Review Cycle:** Annual + on major version change  
**Parent (umbrella):** [29] STD-ENG-001 (Naming & Identifier Standard, v2.0)  
**Created by:** RFC-0001 — Split STD-ENG-001 (executed 2026-04-22)

> This sub-standard owns **Namespace M** — the internal anatomy of software modules: module identification (MOD-XXX + slug), component naming, file naming, directory structure, module boundary rules, and the Developer Cheat Sheet. Shared glossary lives in [29] STD-ENG-001. Section numbering below is preserved from the v1.2 umbrella for cross-reference continuity.

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects authoring modules, components, or source files | **T1 MUST** | (4) All new modules/components MUST follow Namespace-M conventions (directory, file, export naming). | None (non-waivable — coordination standard) |
| SaaS / customer-facing | **T2 SHOULD** | Automated lint for component-type vocabulary (file/class suffixes), directory-structure CI check, module-boundary import lint, developer quick-reference cards, onboarding training on Namespace-M. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Code-generation tools emitting conformant file names only, pre-commit hooks blocking non-conformant identifiers, architecture-review gates on new component-type suffixes. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8. Rule numbered (4) maps to the umbrella's full T1 set (rules 1–5); see [29] STD-ENG-001 for the aggregate Tier Table.

## Scope

This standard covers:
- §4 Namespace M — Module identification (MOD-XXX + slug), Module Records, component naming, file naming, directory structure, module boundary rules
- Developer Cheat Sheet — distilled quick reference (four namespaces, CC-PID, entity codes, module/component rules)

For public entity IDs (CC-PID) and artifact/governance identifiers, see sibling sub-standards [49] STD-ENG-001A and [50] STD-ENG-001B.

---

## 4. Namespace M — Module, Component & File Naming

This section defines the naming and identification system for the internal anatomy of software modules: module registration, component naming, file naming, and directory structure.

**Supersedes:** CYBERCUBE Module ID Standard (v1), which is now fully absorbed into this section.

### 4.1 Position in the Classification Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IDENTITY & CLASSIFICATION BOUNDARIES                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRODUCT LEVEL (Strategic, Stable)                                          │
│  ├── Product ID        → PRD-XXX          (Namespace G)                     │
│  ├── Product Class     → PCL-L.D.E.C      (PRCS facets)                    │
│  └── Domain / Function → Controlled + Free-form                             │
│                                                                             │
│  MODULE LEVEL (Architectural, Reusable)                                     │
│  ├── Module ID         → MOD-XXX          (Namespace G)                     │
│  ├── Module Slug       → kebab-case       (Namespace M)                     │
│  ├── Module Scope      → Platform / Core / Domain / ...                     │
│  └── Module Role       → Identity, Metrics, Workflow, etc.                  │
│                                                                             │
│  COMPONENT LEVEL (Implementation, Named)                                    │
│  ├── Component Name    → {descriptor}.{type}.{ext}   (Namespace M)          │
│  └── Component Type    → .service / .controller / .page / ...               │
│                                                                             │
│  PROJECT LEVEL (Tactical, Volatile)                                         │
│  └── Work Type Tags    → WA-SS, AP-RS, MN-BG, …     (Namespace A)          │
│                                                                             │
│  RULE                                                                        │
│  • Products are classified (PCL)                                            │
│  • Modules are identified (MOD)                                             │
│  • Components are named (type-suffixed)                                     │
│  • Work is tagged (XX-YY)                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Core Principles

1. **Modules are architectural assets, not products** — they exist within and across products
2. **Semantics are authoritative** — names define meaning, numbers encode
3. **IDs are stable and never reused** — MOD-XXX is permanent
4. **No lifecycle coupling** between products and modules — a module may outlive the product that created it
5. **Human-readable first, machine-readable second** — slugs over codes in daily work
6. **No mathematical encoding or bitmasks** — simple sequential assignment
7. **Convention over configuration** — component and file naming follows predictable patterns

### 4.3 Module Identification (MOD-XXX)

#### 4.3.1 Format

```
MOD-NNN
```

| Component | Meaning |
|-----------|---------|
| MOD | Module Identifier prefix (Namespace G) |
| NNN | Sequential numeric ID (001–999), zero-padded |

**Grammar:**
```
MOD := "MOD-" DIGIT DIGIT DIGIT
```

#### 4.3.2 Why Module IDs Are Numeric-Only

Unlike CC-PIDs which use random tokens for runtime entities:

- Modules are **governance assets**, not runtime entities
- Modules are **few in number** (tens to low hundreds, not millions)
- Sequential IDs are **easier to discuss** ("MOD-001" vs. "MOD-X2M8KD-F")
- Semantic meaning belongs in the **Module Record**, not the identifier

#### 4.3.3 Module Slug

Every module MUST have a **slug** in addition to its MOD-XXX identifier.

| Property | Rule |
|----------|------|
| Format | kebab-case, lowercase, alphanumeric + hyphens only |
| Derivation | Derived from the module's human-readable name |
| Mutability | Immutable once assigned |
| Registration | Registered alongside MOD-XXX in the Module Registry |
| Uniqueness | Globally unique across all modules |
| Usage | Directory paths, import paths, config references, package names |

**Examples:**
- `identity` (from "Identity Module")
- `billing-engine` (from "Billing Engine")
- `metrics-collector` (from "Metrics Collector")

**Validation Regex:**
```
^[a-z][a-z0-9]*(-[a-z0-9]+)*$
```

**Forbidden slugs:** Reserved words (`shared`, `common`, `utils`, `lib`, `core`, `platform`, `internal`, `test`, `config`, `docs`, `scripts`, `build`, `dist`, `node_modules`, `vendor`).

### 4.4 Module Record (Authoritative Metadata)

Every Module ID MUST have a Module Record. The record is the authoritative source of all semantic information about a module.

#### 4.4.1 Required Fields

| Field | Requirement |
|-------|-------------|
| Module ID | Required, immutable (MOD-XXX) |
| Slug | Required, immutable, kebab-case |
| Name | Human-readable, descriptive |
| Scope | One of the controlled vocabulary terms (§4.4.3) |
| Primary Responsibility | One-sentence purpose statement |
| Reusability Level | Global / Portfolio / Product |
| Stability | Experimental / Beta / Stable / Deprecated / Retired |
| Owner | Team or role |
| Dependencies | Other Module IDs (MOD-XXX references) |
| Used By Products | PRD-XXX references |
| First Introduced | Date (YYYY-MM-DD) |
| Last Reviewed | Date (YYYY-MM-DD) |

#### 4.4.2 Module Record Template

```
# Module Record: MOD-001

**Module ID:** MOD-001
**Slug:** identity
**Name:** Identity Module
**Scope:** Platform
**Reusability:** Global
**Stability:** Stable
**Owner:** Platform Team

## Responsibility
Authentication, credential lifecycle, MFA orchestration, and session control.

## Dependencies
- MOD-004 (Cryptography Module)
- MOD-006 (Configuration Module)

## Used By
- PRD-001 (Kanban Platform)
- PRD-003 (API Gateway)

## Lifecycle
- **First Introduced:** 2025-11-12
- **Last Reviewed:** 2026-02-07
```

#### 4.4.3 Scope Vocabulary (Controlled)

| Scope | Meaning |
|-------|---------|
| **Platform** | Cross-cutting foundation modules |
| **Core** | Business-agnostic engines and services |
| **Domain** | Business-capability-specific modules |
| **Integration** | External systems and automation |
| **UI** | Visual components and frontends |
| **Governance** | Audit, policy, risk, compliance |
| **Experimental** | R&D, pre-governance |

#### 4.4.4 Reusability Levels

| Level | Meaning |
|-------|---------|
| **Global** | Reusable across all products |
| **Portfolio** | Reusable across a product group |
| **Product** | Bound to a single product |

Product-bound modules still REQUIRE Module IDs if they are architecturally significant.

#### 4.4.5 Lifecycle States

```
Experimental → Beta → Stable → Deprecated → Retired
```

- Retired modules remain in the registry for audit purposes
- IDs are never removed or reused
- Deprecated modules MUST document their replacement

### 4.5 Component Naming Convention

Components are named functional units within modules. They do NOT receive governance IDs (MOD-XXX) or CC-PIDs — they use a **controlled type-suffix convention**.

#### 4.5.1 File Naming Pattern

```
{descriptor}.{type}.{ext}
```

| Segment | Rules |
|---------|-------|
| **descriptor** | kebab-case; describes what it does, not how (e.g., `session`, `invoice-create`, `oauth`) |
| **type** | Controlled vocabulary suffix from §4.5.2 or §4.5.3 |
| **ext** | Standard file extension (`.ts`, `.tsx`, `.test.ts`, etc.) |

**Examples:**
- `session.service.ts`
- `oauth.adapter.ts`
- `invoice-create.form.tsx`
- `revenue.chart.tsx`
- `auth.guard.ts`

#### 4.5.2 Architectural Component Types (Controlled Vocabulary)

| Suffix | Purpose | Example |
|--------|---------|---------|
| `.service` | Business logic | `session.service.ts` |
| `.controller` | Request handling (HTTP, RPC) | `project.controller.ts` |
| `.repository` | Data access layer | `invoice.repository.ts` |
| `.adapter` | External system integration | `oauth.adapter.ts` |
| `.provider` | Dependency injection / factory | `cache.provider.ts` |
| `.guard` | Auth and access guards | `auth.guard.ts` |
| `.middleware` | Request pipeline processing | `tenant.middleware.ts` |
| `.handler` | Event/message/job handling | `webhook.handler.ts` |
| `.validator` | Input validation logic | `payment.validator.ts` |
| `.transformer` | Data transformation / mapping | `invoice.transformer.ts` |
| `.engine` | Complex processing pipelines | `aggregation.engine.ts` |
| `.gateway` | External API gateway wrappers | `stripe.gateway.ts` |

#### 4.5.3 UI Component Types (Controlled Vocabulary)

| Suffix | Purpose | Example |
|--------|---------|---------|
| `.page` | Full page component | `login.page.tsx` |
| `.layout` | Page layout scaffold | `dashboard.layout.tsx` |
| `.form` | User input form | `invoice-create.form.tsx` |
| `.dialog` | Modal/dialog | `confirm-delete.dialog.tsx` |
| `.card` | Content card | `project-summary.card.tsx` |
| `.list` | List/collection view | `task.list.tsx` |
| `.table` | Data table | `invoice.table.tsx` |
| `.chart` | Visualization | `revenue.chart.tsx` |
| `.widget` | Self-contained widget | `activity-feed.widget.tsx` |
| `.panel` | Side/info panel | `project-details.panel.tsx` |

#### 4.5.4 Supporting File Types

| Suffix | Purpose | Example |
|--------|---------|---------|
| `.types` | Type definitions | `session.types.ts` |
| `.dto` | Data transfer object | `invoice.dto.ts` |
| `.constants` | Constants and enums | `permissions.constants.ts` |
| `.config` | Module configuration | `identity.config.ts` |
| `.utils` | Utility functions | `date.utils.ts` |
| `.test` | Unit test | `session.service.test.ts` |
| `.integration.test` | Integration test | `auth.guard.integration.test.ts` |
| `.e2e.test` | End-to-end test | `login.e2e.test.ts` |
| `.mock` | Test mock/fixture | `user.mock.ts` |
| `.factory` | Test data factory | `invoice.factory.ts` |

#### 4.5.5 Adding New Component Types

New type suffixes MUST be approved through architecture review before use. The criteria:
- The type represents a **distinct architectural role** not covered by existing types
- At least **2 modules** would use the new type
- The type has a **clear, non-overlapping definition**

Ad-hoc invention of type suffixes is PROHIBITED.

### 4.6 File Naming Convention

#### 4.6.1 Hybrid Prefixing Rule (Mandatory)

> **If the directory path unambiguously identifies the parent module, the file name does NOT repeat it. If the file lives outside its module's directory tree, it MUST carry the module slug as a prefix.**

**Inside module directory (NO prefix — path provides context):**
```
modules/identity/src/services/session.service.ts          ✅
modules/identity/src/adapters/oauth.adapter.ts             ✅
modules/identity/src/components/pages/login.page.tsx       ✅
```

**Inside module directory (prefix is FORBIDDEN — redundant):**
```
modules/identity/src/services/identity.session.service.ts  ❌
modules/identity/src/adapters/identity.oauth.adapter.ts    ❌
```

**Outside module directory (prefix REQUIRED — context is lost):**
```
shared/validators/identity.token.validator.ts              ✅
shared/types/billing.invoice.types.ts                      ✅
shared/validators/token.validator.ts                       ❌ (ambiguous origin)
```

**Rationale:**
- Avoids redundancy (directory already identifies the module)
- Prevents rename pressure if module slug changes
- Aligns with ecosystem conventions (NestJS, Angular, Spring)
- Ensures disambiguation in shared locations

#### 4.6.2 Class and Export Naming

Publicly exported names SHOULD carry module context to avoid ambiguity in consuming code:

```typescript
// Inside module — short name is fine for internal use
export class SessionService { }

// Public API / barrel export — scoped name recommended
export { SessionService as IdentitySessionService } from './services/session.service';
```

#### 4.6.3 Index / Barrel Files

Each module MUST have a root `index.ts` (or equivalent) that serves as the public API:
- Explicitly exports only the public interface
- Internal implementation details are NOT exported
- Re-exports MAY use module-scoped names for disambiguation

### 4.7 Directory Structure Standard

#### 4.7.1 Canonical Module Layout

```
modules/{module-slug}/
├── src/
│   ├── controllers/          # Request handlers
│   ├── services/             # Business logic
│   ├── repositories/         # Data access
│   ├── adapters/             # External integrations
│   ├── guards/               # Auth/access guards
│   ├── handlers/             # Event/message handlers
│   ├── validators/           # Input validation
│   ├── transformers/         # Data transformation
│   ├── types/                # Type definitions and DTOs
│   ├── constants/            # Constants and enums
│   ├── utils/                # Utility functions
│   └── components/           # UI components (if applicable)
│       ├── pages/
│       ├── layouts/
│       ├── forms/
│       ├── dialogs/
│       ├── charts/
│       └── shared/           # Shared UI primitives within module
├── tests/
│   ├── unit/                 # Unit tests (mirror src/ structure)
│   ├── integration/          # Integration tests
│   └── fixtures/             # Test data and factories
├── docs/
│   ├── README.md             # Module overview (REQUIRED)
│   └── CHANGELOG.md          # Module change log
├── config/                   # Module-specific configuration
└── index.ts                  # Public API barrel (REQUIRED)
```

#### 4.7.2 Required vs Optional Directories

| Directory | Required | Condition |
|-----------|----------|-----------|
| `src/` | REQUIRED | Always |
| `src/services/` | REQUIRED | If module contains business logic |
| `src/types/` | REQUIRED | If module defines types |
| `src/components/` | Optional | Only if module includes UI |
| `tests/` | REQUIRED | Always (per Testing Standard 5.5) |
| `tests/unit/` | REQUIRED | Always |
| `tests/integration/` | Optional | If integration tests exist |
| `docs/` | REQUIRED | Always |
| `docs/README.md` | REQUIRED | Always |
| `config/` | Optional | If module-specific config exists |
| `index.ts` | REQUIRED | Always (public API barrel) |

Empty directories SHOULD NOT be committed. Create directories when the first file is added.

#### 4.7.3 Shared / Cross-Module Code

Code that is genuinely shared across multiple modules lives outside the module tree:

```
shared/
├── types/                    # Cross-module type definitions
├── utils/                    # Cross-module utilities
├── validators/               # Cross-module validators
└── constants/                # Cross-module constants
```

**Rules for shared code:**
- Files MUST carry the originating module slug as prefix (§4.6.1)
- Shared code MUST NOT import from any specific module's internal paths
- If shared code grows into a cohesive unit, it SHOULD become its own module

### 4.8 Module Boundary Rules

#### 4.8.1 What Belongs Inside a Module

- All code that implements the module's **primary responsibility**
- Types, constants, and utilities **specific to** the module
- Tests for the module's own code
- Module-specific documentation and configuration

#### 4.8.2 What Belongs Outside (Shared)

- Types or utilities used by **3+ modules** without modification
- Cross-cutting infrastructure (logging, telemetry, config loading)
- Framework-level abstractions (base classes, decorators)

#### 4.8.3 Cross-Module Import Rules

| Import Direction | Allowed | Mechanism |
|------------------|---------|-----------|
| Module A → Module B's **public API** (`index.ts`) | YES | Barrel import only |
| Module A → Module B's **internal path** (`src/services/...`) | NO | Encapsulation violation |
| Module → **shared/** | YES | Prefix-named shared code |
| **shared/** → Module internal | NO | Dependency inversion violation |

#### 4.8.4 Circular Dependency Prohibition

Circular dependencies between modules are PROHIBITED. If Module A depends on Module B and Module B depends on Module A:
1. Extract the shared concern into a new module
2. Or invert the dependency using interfaces/events
3. Or merge the two modules if they are not independently meaningful

### 4.9 Module Registry Index (Required)

All modules MUST be listed in a single registry index file.

```
# CYBERCUBE Module Registry

| Module ID | Slug             | Name                  | Scope       | Reusability | Stability  | Owner          |
|-----------|------------------|-----------------------|-------------|-------------|------------|----------------|
| MOD-001   | identity         | Identity Module       | Platform    | Global      | Stable     | Platform Team  |
| MOD-002   | authorization    | Authorization Engine  | Platform    | Global      | Stable     | Platform Team  |
| MOD-003   | metrics          | Metrics Engine        | Core        | Global      | Stable     | Data Team      |
```

### 4.10 Governance Rules

| Rule | Enforcement |
|------|-------------|
| Module ID assigned at design time | Architecture review |
| IDs are sequential, zero-padded | Registry control |
| IDs never reused | Absolute |
| Slugs never reused | Absolute |
| Semantic meaning never encoded in ID | Mandatory |
| All dependencies use Module IDs | Required |
| All PRDs reference modules by MOD-XXX | Required |
| Component type suffixes from controlled vocabulary only | Architecture review |
| Directory structure follows canonical layout | Code review |

### 4.11 Forbidden Anti-Patterns

| Anti-Pattern | Why It Is Forbidden | Correct Approach |
|--------------|---------------------|------------------|
| Encoding scope or domain into IDs (e.g., `MOD-PLT-001`) | Violates "numbers encode, never define" | Use Module Record metadata |
| Renaming modules to "fix" IDs | IDs are immutable | Update Module Record name only |
| Reusing deprecated IDs or slugs | Breaks audit trail | Assign new ID/slug |
| Using work type tags as module identifiers | Conflates project and module layers | Use MOD-XXX for modules, XX-YY for work |
| Coupling Module ID to Product ID | Modules may outlive products | Keep independent lifecycles |
| Inventing ad-hoc component type suffixes | Inconsistency across codebase | Propose new type through architecture review |
| Importing module internals directly | Breaks encapsulation | Import from barrel `index.ts` only |
| Prefixing file names inside their own module directory | Redundant with path | Let directory provide context |
| Placing module-specific code in `shared/` | Blurs module boundaries | Keep inside module tree |

### 4.12 Compatibility Statement

This section is:
- Fully compatible with PRCS (v1) — PRD-XXX and MOD-XXX coexist in Namespace G
- Fully compatible with PCL-L.D.E.C — products are classified, modules are identified
- Explicitly separated from Work Type Tags (Namespace A) — modules are not projects
- Aligned with Namespace B (CC-PID) — MOD is reserved as a Namespace G prefix, not a CC-PID entity code

---

---

## Developer Cheat Sheet

Below is a developer-first cheat sheet distilled from the final CYBERCUBE Naming & Identifier
Standard (v1.2).

This is meant to be printed, pinned, or dropped into a repo (/docs/ID_CHEATSHEET.md).

No theory. No prose. Just rules and examples.

### 🔹 Four Namespaces (DO NOT MIX)

| Namespace A — Artifacts | Namespace B — Entities (CC-PID) | Namespace G — Governance IDs | Namespace M — Modules/Components/Files |
|-------------------------|----------------------------------|------------------------------|----------------------------------------|
| **Used for:** Code & workflow | **Used for:** Data & external refs | **Used for:** Product & module registration | **Used for:** Module internal anatomy |
| Mutable | Immutable, random | Immutable, sequential | Convention-based |
| Files, repos, branches, CI/CD, WOE | DB entities, URLs, PDFs, emails, webhooks | PRD-XXX, MOD-XXX | Slugs, type-suffixed files, directories |

### 🔹 Namespace A — Artifact Naming

**Canonical Pattern:**
```
<PARENT>-<SUB>_<ProjectName>_v<SemVer>_<YYYYMMDD>_<ENV>.<ext>
```

**Example:**
```
WA-SS_MyApp_v1.2.0_20250116_PRD.zip
```

**Artifact Rules:**
- ✅ May include version, date, environment
- ✅ May change over time
- ❌ NOT an identifier
- ❌ NOT stored as a primary key

### 🔹 Internal Work Items (WOE)

**WOE = Work-Oriented Entry**

**Examples:**
- `CS-ER-1427`
- `AP-RS-0912`

**Rules:**
- ✅ Internal only
- ✅ Tracker-generated (Jira/GitHub/Linear)
- ✅ Used in branches & commits
- ❌ Never shown to customers
- ❌ Never used in URLs or APIs

---

### 🔹 Namespace B — Public Entity IDs (CC-PID)

**Canonical Format (MANDATORY):**
```
<ENTITY>-<TOKEN>-<CHK>
```

**Example:**
```
TKT-9F4K7Q-V
```

**What CC-PID is:**
- ✅ Immutable
- ✅ Human-readable
- ✅ Safe to expose
- ❌ NOT a secret
- ❌ NOT auth
- ❌ NOT authorization

---

### 🔹 Entity Codes (3 letters)

**Examples:**
- `ACC` — Account / Tenant
- `USR` — User
- `PRJ` — Project
- `TKT` — Customer Ticket
- `INV` — Invoice

**Rules:**
- ✅ Uppercase
- ✅ Centrally registered
- ❌ NEVER reused
- ❌ NEVER encode logic

---

### 🔹 Token Rules

**Alphabet (human-safe):**
```
ABCDEFGHJKLMNPQRSTUVWXYZ23456789
```

**Length:**
- Default: **6** characters
- High-volume entities: **8** characters
- Global uniqueness: **8** characters (recommended)

**Uniqueness (Choose One):**
- **Per-entity-type:** Token unique within entity type (e.g., `CLT-9F4K7Q-F` and `PRJ-9F4K7Q-4` can coexist)
- **Global:** Token unique across all entity types (recommended for better UX)

**Rules:**
- ✅ Random (CSPRNG)
- ✅ No meaning
- ✅ Unique (per chosen model)
- ✅ Cross-language compatible

---

### 🔹 Check Digit (CHK)

**Purpose:**
- ✅ Detect typos
- ✅ Manual entry safety

**Mandatory Algorithm (CC-PID v1):**
```
CHK = alphabet[ SHA256(entity + "|" + token)[0] mod 32 ]
```

**Implementation:**
- Input: `entity + "|" + token` (UTF-8 encoded)
- Hash: SHA-256 digest
- Select: First byte [0]
- Map: Modulo 32, then lookup in alphabet

**Rules:**
- ✅ Mandatory
- ✅ Deterministic (SHA-256 only)
- ✅ Cross-language compatible
- ✅ Interoperable across all services
- ❌ Not cryptographic
- ❌ Not security

---

### 🔹 Validation Regex (Copy-Safe)

```regex
^[A-Z]{3}-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$
```

**Always validate at:**
- ✅ API boundaries
- ✅ UI input
- ✅ Import/export pipelines

---

### 🔹 URL Format (Guidance)

Canonical URL pattern when embedding CC-PIDs:

/{entity-plural}/{CC-PID}

Examples:

- /projects/PRJ-X2M8KD-F
- /clients/CLT-9F4K7Q-F

Notes:

- The path segment is a human-friendly resource name.
- The authoritative identifier is the CC-PID.

---

### 🔹 Hierarchical URL References (Guidance)

CC-PIDs are flat identifiers and MUST remain flat in storage.

For routing and readability, URLs MAY express hierarchy by composing CC-PIDs:

Examples:

- /projects/PRJ-X2M8KD-F/tasks/TSK-9F4K7Q-2
- /PRJ-X2M8KD-F/TSK-9F4K7Q-2

Rules:

- Hierarchy is URL-only.
- Never store concatenated IDs (no parent/child embedding in CC-PID).
- Always parse and validate each CC-PID independently.

---

### 🔹 Versioning (Future-Reserved)

CC-PID v1 does NOT embed a version marker in the ID.

Guidance:

- Validation logic MUST be version-aware in the future.
- CYBERCUBE reserves the right to introduce a future token version prefix

  (e.g., reserving the first token character) if a breaking format change is required.
- All v1 IDs remain valid indefinitely.

---

### 🔹 Internationalization & Encoding

Rules:

- CC-PIDs are ASCII-only and locale-safe.
- Treat CC-PIDs as UTF-8 strings at system boundaries.
- Normalize using ASCII rules only (trim + uppercase).
- Reject Unicode homoglyphs or non-ASCII characters.

---

### 🔹 Deprecation & Deletion Semantics

Rules:

- CC-PIDs are never reused.
- Soft-deleted or retired entities retain their CC-PID forever.

API behavior (recommended):

- Return HTTP 410 Gone for permanently retired entities.
- Do NOT return 404 when the ID is known but retired.

---

### 🔹 Migration from Legacy IDs (Guidance)

When migrating legacy identifiers:

- Introduce CC-PID alongside legacy ID.
- Maintain a mapping: (legacy_source, legacy_id) → CC-PID.
- Accept legacy IDs only during a defined transition window.
- Always emit CC-PID in new responses.

Example:

LEGACY:12345 → PRJ-X2M8KD-F

---

### 🔹 Analytics & Observability Safety

CC-PIDs:

- Contain no PII
- Have no semantic meaning
- Use only URL/CSV-safe characters

Safe to use in:

- Analytics pipelines
- Event streams
- Logs and metrics
- Data warehouses

Access control must still protect underlying data.

---

### 🔹 Input Normalization (REQUIRED)

Copy/paste + case rules:

- IDs MUST NOT contain leading/trailing whitespace.
- Validators MUST trim() input before validation.
- IDs are stored/displayed in UPPERCASE.
- Input MAY be accepted case-insensitively, but validators MUST normalize to uppercase
  before regex + checksum validation.
- Reject IDs containing any internal whitespace characters (spaces, tabs, newlines).

---

### 🔹 Partial ID Search (Guidance)

UI search-by-ID behavior:

- Prefix match ONLY (no substring search).
- Require minimum 3 characters after the entity code.

Example:

- Search “PRJ-X2M” matches “PRJ-X2M8KD-F”

Reason:

- Reduces accidental matches and enumeration-style probing.

---

### 🔹 UUID vs CC-PID

| Use Case | Use |
|----------|-----|
| Internal DB PK | UUIDv7 |
| External reference | CC-PID |

**Rules:**
- ❌ Never expose UUIDs
- ❌ Never auth with CC-PID
- ❌ ID ≠ capability

---

### 🔹 Tickets vs Issues (IMPORTANT)

| Customer Tickets | Internal Issues (WOE) |
|------------------|------------------------|
| • Entity<br>• CC-PID: TKT-*<br>• Stored in DB<br>• Shown to customers<br>• Used in URLs, emails, invoices | • Artifact<br>• Tracker key (CS-ER-1427)<br>• Internal only<br>• Never customer-visible |

---

### 🔹 Linking Tickets ↔ Internal Work

Required when support triggers engineering work.

**Ticket entity stores:**
```sql
external_key_source  -- (JIRA | GITHUB | LINEAR | CYBERCUBE)
external_key         -- (CS-ER-1427)

-- Constraint:
UNIQUE(external_key_source, external_key)
```

**Rules:**
- ✅ Ticket is canonical
- ✅ WOE is a reference
- ❌ Never expose WOE externally

---

### 🔹 What You MUST NOT Do

- ❌ Use CC-PID for authentication
- ❌ Use CC-PID for authorization
- ❌ Parse meaning from IDs
- ❌ Reuse entity codes
- ❌ Let clients generate IDs
- ❌ Expose UUIDs

---

### 🔹 Required Service Contract

Every service handling CC-PID MUST implement:

**Methods:**
- `generate(entityCode, length)`
- `validate(publicId)`
- `parse(publicId)`

**Requirements:**
- ✅ Validate format + checksum (SHA-256)
- ✅ Retry on collision (up to 10 attempts)
- ✅ Route by ENTITY code
- ✅ Document uniqueness model (per-entity or global)

---

### 🔹 Mental Model (memorize this)

| Type | Namespace | Purpose | Mutability |
|------|-----------|---------|------------|
| **Artifact** | A | Workflow label | Mutable |
| **WOE** | A | Internal work | Tracker-owned |
| **CC-PID** | B | External entity label | Immutable, random |
| **MOD-XXX** | G | Module registration | Immutable, sequential |
| **PRD-XXX** | G | Product registration | Immutable, sequential |
| **Component** | M | Type-suffixed file | Convention-based |
| **UUID** | — | Internal key | Hidden |

---

### 🔹 Namespace G — Governance IDs

**Format:** `{PREFIX}-{NNN}` (e.g., `MOD-001`, `PRD-003`)

**Rules:**
- Sequential, zero-padded, immutable, never reused
- Registry-controlled
- NOT random (unlike CC-PID), NOT for runtime entities

---

### 🔹 Namespace M — Module, Component & File Naming

**Module ID:** `MOD-XXX` + slug (e.g., `MOD-001` / `identity`)

**Component file pattern:** `{descriptor}.{type}.{ext}`

**Architectural types:** `.service`, `.controller`, `.repository`, `.adapter`, `.provider`, `.guard`, `.middleware`, `.handler`, `.validator`, `.transformer`, `.engine`, `.gateway`

**UI types:** `.page`, `.layout`, `.form`, `.dialog`, `.card`, `.list`, `.table`, `.chart`, `.widget`, `.panel`

**Hybrid prefixing rule:**
- Inside module dir: NO prefix (`modules/identity/src/services/session.service.ts`)
- Outside module dir: prefix REQUIRED (`shared/validators/identity.token.validator.ts`)

**Directory:** `modules/{slug}/src/{type-dir}/{descriptor}.{type}.{ext}`

---

### 🔹 One-Line Rule (if you remember nothing else)

If it leaves the system, it uses a CC-PID.

If it is a registered asset, it uses a Governance ID (MOD/PRD).

If it drives work, it’s an artifact.

If it’s internal, it’s a UUID or WOE.

---

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-22 | Migrated from [29] STD-ENG-001 v1.3 per RFC-0001. Carves §4 (Namespace M) and the Developer Cheat Sheet. Content byte-preserved from v1.3; section numbers retained for cross-reference continuity. |

---

## Implementation Status

**Last Updated:** 2026-04-22

| Component | Status |
|-----------|--------|
| Namespace M standard (§4) | COMPLETE |
| Module Registry population | ROADMAP |
| Component type vocabulary enforcement (lint rule) | ROADMAP |
| Directory structure validation (CI check) | ROADMAP |
| Module boundary enforcement (import lint) | ROADMAP |
| Developer Cheat Sheet published to `/docs/ID_CHEATSHEET.md` | PARTIAL |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [29] STD-ENG-001 (umbrella v2.0) | Shared glossary, cross-namespace rules, aggregated Tier Table |
| [49] STD-ENG-001A Public Entity IDs (CC-PID) | Namespace B — sibling sub-standard |
| [50] STD-ENG-001B Artifact & Governance Identifiers | Namespaces A + G — sibling sub-standard; MOD-XXX governance binding |
| [33] STD-ENG-008 Reusable Modules | Module certification lifecycle; depends on Namespace-M conventions here |
| [35] STD-ENG-005 Testing & Quality | Test file naming conventions (`.test`, `.integration.test`, `.e2e.test`, `.mock`, `.factory`) |
| [21] STD-SEC-002 Secure Coding | Component-type vocabulary used for review scoping (`.guard`, `.validator`, `.middleware`) |
