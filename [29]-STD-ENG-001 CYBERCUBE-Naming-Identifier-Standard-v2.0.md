# CYBERCUBE Naming & Identifier Standard (v2.0 — umbrella)

**Standard ID:** STD-ENG-001  
**Status:** Active  
**Effective:** 2026-02-10 (v1.2), 2026-04-22 (v1.3 drift-backfill), 2026-04-22 (v2.0 structural split)  
**Classification:** INTERNAL  
**Owner:** Engineering Lead  
**Review Cycle:** Annual + on major version change

> **Umbrella.** This document carries the shared Applicability Tier Table, Glossary, namespace-at-a-glance matrix, and defers-to map for the CYBERCUBE naming and identifier family. Normative content has been **carved into three focused sub-standards** per RFC-0001 (executed 2026-04-22):
>
> - **[49] STD-ENG-001A — Public Entity IDs (CC-PID)** — Namespace B, §2 + §5 + §6 + Support SOP.
> - **[50] STD-ENG-001B — Artifact & Governance Identifiers** — Namespaces A + G, §1 + §3 + §7 (Ticket vs WOE).
> - **[51] STD-ENG-001C — Module, Component & File Naming** — Namespace M, §4 + Developer Cheat Sheet.
>
> All prior v1.x IDs, conventions, and rules remain in force. The sub-standards reproduce the v1.3 content byte-preserved. See the [Namespace-at-a-glance matrix](#namespace-at-a-glance-matrix) and [defers-to map](#defers-to-map) below to find the clause you need.

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects producing artifacts, IDs, or modules | **T1 MUST** | (1) All standards, policies, and governance artifacts MUST follow the Namespace-A and Namespace-G naming conventions defined here (filenames, IDs, and identifiers). (2) Public entity identifiers exposed to external systems (APIs, URLs, logs) MUST follow the CC-PID format; raw database primary keys MUST NOT be exposed. (3) CC-PIDs MUST NOT be used for authentication or authorization — per STD-SEC-003/004 T1. (4) All new modules/components MUST follow Namespace-M conventions (directory, file, export naming). (5) Entity-code registration MUST precede first use in code; unregistered entity codes MUST NOT appear in production. | None (non-waivable — naming is a coordination standard) |
| SaaS / customer-facing | **T2 SHOULD** | Automated lint for component-type vocabulary (file/class suffixes), directory-structure CI check, module-boundary import lint, CC-PID format validator in API middleware, developer quick-reference cards, onboarding training on namespaces. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | CC-PID integrity signature (tamper-evidence), per-tenant namespace partitioning in IDs, identifier audit trail (who created which CC-PID, when), identifier-change workflow with approval, code-generation tools emitting conformant IDs only, pre-commit hooks blocking non-conformant identifiers. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.3 (2026-04-22) — Applicability Tier Table + status vocabulary normalization.** T1 = five rules enforceable today. Pre-existing non-canonical statuses (`PENDING`, `PARTIAL         `) remapped to `ROADMAP` and `PARTIAL` respectively.

**Quick links:** [Glossary](#glossary) · [0. Purpose](#0-purpose--design-principles) · [1. Artifact Naming](#1-namespace-a--artifact-naming) · [2. Public Entity IDs](#2-namespace-b--public-entity-ids-cc-pid-v1) · [3. Governance Registry IDs](#3-namespace-g--governance-registry-identifiers) · [4. Module, Component & File Naming](#4-namespace-m--module-component--file-naming) · [5. CC-PID Implementation](#5-cc-pid-implementation-guidelines) · [6. Tables](#6-tables) · [7. Tickets vs WOE](#7-ticket-vs-issue-woe-separation) · [8. Version History](#8-version-history) · [Cheat Sheet](#developer-cheat-sheet) · [Appendix A: Support SOP](#appendix-a-support-sop--reading-and-collecting-public-entity-ids-cc-pid) · [Implementation Status](#implementation-status)

---

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Naming & Identifier Standard. All definitions are **normative** unless stated otherwise.

### A

#### ACC (Account)

A top-level organizational entity representing a customer account, tenant, or organization within
CYBERCUBE systems.

An ACC may own users, projects, billing records, and configurations.

| Property | Value |
|----------|-------|
| **Entity Code** | ACC |
| **Notes** | Canonical replacement for "Organization". Used for multi-tenant scoping. Never reused once assigned. |

#### Artifact

Any non-database object produced or managed during software development or operations, including:
- Source files
- Repositories
- Branches
- Build outputs
- Deployment artifacts
- Documentation files

Artifacts use **Namespace A** (Artifact Naming) and may include mutable metadata (version, date, environment).

#### Authentication (AuthN)

The process of verifying the identity of a user or system actor (e.g., via password, OAuth, SSO, magic link).

⚠️ **Critical:** Public Entity IDs MUST NOT be used for authentication.

#### Authorization (AuthZ)

The process of determining what actions an authenticated user or system is allowed to perform.

⚠️ **Critical:** Public Entity IDs MUST NOT be used for authorization or permission checks.

### C

#### Check Digit (CHK)

A single-character suffix derived deterministically from an entity code and token, appended to all Public Entity IDs.

**Purpose:**
- ✅ Detect transcription and manual entry errors
- ❌ Not cryptographic
- ❌ Not a security feature
- ✅ Mandatory in CC-PID v1

**Example:** `INV-4Q7T9P-N`

#### Client (CLT)

A customer entity representing a business or individual receiving services.

| Property | Value |
|----------|-------|
| **Entity Code** | CLT |
| **Relationship** | Typically associated with one ACC |
| **Data Access** | May own projects, invoices, and contacts |

---

### E

#### Entity

A persistent domain object stored in a database and represented by an internal identifier (e.g., UUID) and a Public Entity ID.

**Examples:**
- Account
- User
- Project
- Invoice

Entities use **Namespace B** (Public Entity IDs).

#### Entity Code

A fixed, three-letter uppercase code identifying the type of a Public Entity.

**Examples:** `ACC`, `USR`, `PRJ`, `INV`

**Properties:**
- ✅ Immutable
- ✅ Never reused
- ✅ Used only for classification and routing

#### Environment (Artifact Context)

A deployment or execution context such as:
- **DEV** (Development)
- **STG** (Staging)
- **PRD** (Production)

Used only in artifact naming suffixes.

> ⚠️ **Note:** This is distinct from the ENV Public Entity code.

#### Environment (Entity)

A database entity representing a logical or physical environment configuration.

⚠  Note:

The Entity Code "ENV" is used for system configuration records only and it’s unrelated to
artifact environment suffixes

---

### G

#### Governance Rules

Mandatory policies that define how naming, identifiers, and codes are created, managed, and preserved over time.

**Key principles:**
- ✅ Immutability
- ✅ No reuse
- ✅ Central registry
- ✅ Server-side generation

---

### I

#### Identifier (ID)

A value used to uniquely reference an object.

**In CYBERCUBE, two main types exist:**

| Type | Scope | Visibility |
|------|-------|------------|
| **Internal ID** (e.g., UUIDv7) | System-only | Hidden |
| **Public Entity ID** | User-facing | Exposed |

#### Immutability

The principle that once assigned, an identifier or code must never change.

**Applies to:**
- ✅ Public Entity IDs
- ✅ Entity Codes
- ✅ Historical references

---

### N

#### Namespace

A logical partition defining naming rules, formats, and constraints.

**CYBERCUBE defines two namespaces:**

| Namespace | Purpose | Mutability |
|-----------|---------|------------|
| **Namespace A** | Artifact Naming | Mutable |
| **Namespace B** | Public Entity IDs (CC-PID) | Immutable |

⚠️ **Critical:** Namespaces must never be mixed.

---

### P

#### Permission (PRM)

A granular access rule defining an allowed action within the system.

> ⚠️ **Critical:** The Entity Code "PRM" is used in authorization systems and must NEVER be inferred from Public Entity IDs.

#### Policy (POL)

A higher-level rule or configuration governing system behavior or access control.

| Property | Value |
|----------|-------|
| **Entity Code** | POL |
| **Examples** | Security policies, access policies |

#### Public Entity ID (CC-PID)

A human-readable, non-sensitive identifier used to reference entities externally.

**Canonical format:** `<ENTITY>-<TOKEN>-<CHK>`

**Example:** `PRJ-X2M8KD-F`

**Properties:**
- ✅ Safe to expose
- ✅ Immutable
- ❌ Not a secret
- ❌ Not proof of identity or access

---

### R

#### Reusable Standard Module (RSM)

A top-level project classification for versioned, governed, standalone modules designed to be reused across multiple future projects. RSMs are productized internal assets that sit between one-off projects and product/platform deliverables.

**Classification:**
- ❌ Not a one-off project
- ❌ Not a product or platform
- ✅ A certified building block

**Governance:** Versioned, standalone, subject to certification and reuse governance.

---

### M

#### Module (MOD)

A reusable software unit that exists within products, may be shared across products, and has an independent lifecycle requiring governance, ownership, and dependency tracking.

| Property | Value |
|----------|-------|
| **Registry ID** | MOD-XXX (Namespace G, sequential, immutable) |
| **Scope** | Platform, Core, Domain, Integration, UI, Governance, Experimental |
| **Reusability** | Global, Portfolio, Product |

#### Module Slug

A kebab-case, human-readable name assigned alongside a Module ID. Used in directory paths, import paths, and configuration references.

**Properties:**
- ✅ Derived from the module name (e.g., `identity`, `billing-engine`)
- ✅ Immutable once assigned
- ✅ Registered in the Module Registry alongside MOD-XXX
- ❌ Must NOT contain version, date, or environment metadata

#### Component Type Suffix

A controlled vocabulary term appended to file names to classify the role of a component within a module. Uses dot-notation before the file extension.

**Examples:** `.service`, `.controller`, `.repository`, `.adapter`, `.page`, `.form`, `.chart`

**Properties:**
- ✅ From a controlled vocabulary (architectural or UI)
- ✅ Centrally governed; new suffixes require review
- ❌ Must NOT be invented ad-hoc

---

### N-G

#### Namespace G (Governance Registry Identifiers)

A logical partition for immutable, sequential governance identifiers used to register strategic and architectural assets.

**Format:** `{PREFIX}-{NNN}` (e.g., `PRD-001`, `MOD-003`)

**Properties:**
- ✅ Sequential assignment, registry-controlled
- ✅ Immutable, never reused
- ❌ Not random (unlike CC-PID tokens)
- ❌ Not mutable (unlike Namespace A artifacts)

#### Namespace M (Module, Component & File Naming)

A logical partition defining naming conventions for the internal anatomy of software modules: module identification, component naming, file naming, and directory structure.

---

### T

#### Token

The random component of a Public Entity ID.

**Properties:**
- ✅ Generated using a human-safe alphabet
- ✅ No semantic meaning
- ✅ Unique per (entity_code, token) pair

---

### U

#### User (USR)

An individual human or service account that can authenticate into the system.

| Property | Value |
|----------|-------|
| **Entity Code** | USR |
| **Features** | Belongs to an ACC; Subject to roles and permissions |

---

### V

#### Versioning

The practice of evolving standards while preserving backward compatibility.

**Current standard:** CC-PID v1

**Future changes:** Require a major version increment. All prior versions remain valid indefinitely.

---

## 0. Purpose & Design Principles

This umbrella standard unifies CYBERCUBE's artifact naming, public entity identifiers, governance registry IDs, and module/component/file naming under a single coordination envelope. It does **not** define authentication mechanisms, authorization models, encryption schemes, or API security patterns.

Design principles (unchanged from v1.x):

- Separation of concerns (naming ≠ identifying ≠ authorization)
- Human-safe but system-rigorous identifiers
- Immutability for external references
- Auditability & future-proofing

Four namespaces, carved into three sub-standards (see matrix below), MUST NEVER be mixed.

---

## Namespace-at-a-glance matrix

| Namespace | Owning sub-standard | Audience | Mutability | Example |
|-----------|---------------------|----------|------------|---------|
| **A** — Artifact Naming | [50] STD-ENG-001B | Authors of files, repos, branches, CI/CD, WOE | Mutable | `WA-SS_MyApp_v1.2.0_20250116_PRD.zip`, `CS-ER-1427` |
| **B** — Public Entity IDs (CC-PID v1) | [49] STD-ENG-001A | API, database, UI, support engineers | Immutable, random | `PRJ-X2M8KD-F`, `CLT-9F4K7Q-F` |
| **G** — Governance Registry IDs | [50] STD-ENG-001B | Standards authors, ARB, governance council | Immutable, sequential | `PRD-001`, `MOD-003` (future: `ADR-NNN`, `STD-NNN`) |
| **M** — Module / Component / File | [51] STD-ENG-001C | Every engineer writing code | Convention-based | `modules/identity/src/services/session.service.ts` |

## Defers-to map

| Question / clause | Defers to |
|-------------------|-----------|
| "How do I name a build artifact, file, repo, branch, or WOE?" | [50] STD-ENG-001B §1 |
| "What is a CC-PID? Format, check digit, regex, test vectors?" | [49] STD-ENG-001A §2 |
| "How do I implement CC-PID generation / validation / SDK?" | [49] STD-ENG-001A §5 |
| "Which entity codes are reserved? What's the PARENT-SUB crosswalk?" | [49] STD-ENG-001A §6 |
| "How do I read a CC-PID over the phone (support SOP)?" | [49] STD-ENG-001A Appendix A |
| "What's the format of a PRD-XXX or MOD-XXX governance ID?" | [50] STD-ENG-001B §3 |
| "How do customer tickets relate to internal WOE?" | [50] STD-ENG-001B §7 |
| "How do I name a module, component, file, or directory?" | [51] STD-ENG-001C §4 |
| "Quick-reference cheat sheet for all four namespaces?" | [51] STD-ENG-001C Developer Cheat Sheet |
| "T1 baseline rules (aggregate, all 5)?" | This umbrella, Tier Table above |

## Binding rules (applicable across all sub-standards)

1. **No namespace mixing** — A/B/G/M each have distinct pattern rules; an identifier MUST NOT simultaneously claim two namespaces.
2. **Immutability** — Entity codes, CC-PIDs, MOD-XXX, PRD-XXX, and module slugs, once assigned, are never renamed or reused.
3. **Central registry precedence** — entity-code, governance-ID, and module-slug registries are authoritative; unregistered identifiers MUST NOT appear in production.
4. **CC-PID is not a capability** — binds to [18] STD-SEC-003 and [19] STD-SEC-004 T1: possession of a CC-PID MUST NEVER grant access.
5. **Server-side generation** — CC-PID tokens, governance sequence numbers, and module IDs MUST be assigned by the authoritative service, never by clients.

---

## 8. Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-12 | Initial release: artifact naming conventions, CC-PID format, entity code registry. |
| v1.1 | 2026-01 | Added mandatory SHA-256 check digit algorithm, cross-language reference implementations (7 languages), SDK contract with standard error codes, batch generation guidance, global uniqueness model and decision matrix, collision handling requirements, rate limiting guidance, Support SOP. |
| v1.2 | 2026-02 | Added Namespace G (Governance Registry Identifiers: PRD-XXX, MOD-XXX). Added Namespace M (Module, Component & File Naming): absorbed Module ID Standard v1, module identification (MOD-XXX), module slugs, Module Records, component type-suffix convention (architectural + UI), hybrid file naming rule, canonical directory structure, module boundary rules, anti-patterns. Renumbered sections 3–6 to 5–8. Updated glossary, cheat sheet, and related documents. |
| v1.3 | 2026-04-22 | **Drift-backfill.** Reconciles filename-vs-header version drift (filename was v1.2, header had claimed v1.3). Applicability Tier Table added and status vocabulary normalized (legacy `PENDING`/`PARTIAL        ` remapped to `ROADMAP`/`PARTIAL`). No semantic rule changes. |
| v2.0 | 2026-04-22 | **Structural split per RFC-0001.** Umbrella shrunk to Tier Table + Glossary + namespace matrix + defers-to map + aggregated history. Normative content carved to [49] STD-ENG-001A (CC-PID), [50] STD-ENG-001B (Artifact + Governance IDs), [51] STD-ENG-001C (Module/Component/File). All v1.x rules preserved byte-for-byte in the sub-standards. Sub-standards start at v1.0 (2026-04-22). |

---

## Implementation Status

**Last Updated:** 2026-04-22

Implementation tracking now lives in each sub-standard. This umbrella holds pointers only.

| Sub-standard | Bracket | Current Version | Implementation Status Reference |
|--------------|---------|-----------------|---------------------------------|
| Public Entity IDs (CC-PID) | [49] | v1.0 | See `[49]-STD-ENG-001A` §Implementation Status |
| Artifact & Governance Identifiers | [50] | v1.0 | See `[50]-STD-ENG-001B` §Implementation Status |
| Module, Component & File Naming | [51] | v1.0 | See `[51]-STD-ENG-001C` §Implementation Status |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [49] STD-ENG-001A Public Entity IDs (CC-PID) | Namespace B — carved sub-standard |
| [50] STD-ENG-001B Artifact & Governance Identifiers | Namespaces A + G — carved sub-standard |
| [51] STD-ENG-001C Module, Component & File Naming | Namespace M — carved sub-standard |
| [2] POL-GOV-001 Standards Governance | Versioning, Tier Table, freeze-check discipline |
| [3] POL-GOV-002 Architecture Governance | ADR lifecycle; Namespace G ADR prefix reserved |
| [33] STD-ENG-008 Reusable Modules | MOD-XXX governance and module certification lifecycle |
| [18] STD-SEC-003 Authentication & Identity | CC-PID MUST NOT drive authN |
| [19] STD-SEC-004 Authorization & Access Control | CC-PID MUST NOT drive authZ |
| `rfcs/accepted/RFC-0001-split-std-eng-001-naming.md` | Structural split decision |
