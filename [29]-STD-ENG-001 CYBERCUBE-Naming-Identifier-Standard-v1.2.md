# CYBERCUBE Naming & Identifier Standard (v1.2)

**Standard ID:** STD-ENG-001  
**Status:** Active  
**Effective:** 2026-02-10  
**Classification:** INTERNAL  
**Owner:** Engineering Lead  
**Review Cycle:** Annual + on major version change

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

| | |
|---|---|
| **Status** | Active |
| **Applies to** | All CYBERCUBE products, services, repositories, databases, and integrations |

This standard defines how names and identifiers are created, used, governed, and validated
across CYBERCUBE systems. This document unifies CYBERCUBE’s  artifact naming
convention and the new Public Entity ID  scheme under a single standard. This standard does
not define authentication mechanisms, authorization models, encryption schemes, or API
security patterns.

Design principles:


• Separation of concerns (naming ≠ identifying ≠ authorization)

• Human-safe but system-rigorous identifiers

• Immutability for external references

• Auditability & future-proofing

It defines four namespaces that must never be confused:

• Namespace A — Artifact Naming (files, repos, branches, tickets-as-artifacts, and other

build or release artifacts.)

• Namespace B — Public Entity Identifiers (CC-PID) used for user‑facing identifiers stored in

databases (clients, projects, invoices, etc.).

• Namespace G — Governance Registry Identifiers (product and module registration IDs).
Immutable, sequential.

• Namespace M — Module, Component & File Naming (internal anatomy of software modules:
identification, component naming, file conventions, directory structure). Convention-based.

These namespaces MUST NOT be mixed.

Each namespace has its own pattern and rules but shares a common code registry and governance process. Keeping the namespaces separate prevents mutable metadata (like version or date) from leaking into IDs that must remain immutable, and prevents governance-layer identifiers from colliding with runtime entity identifiers.

---

## 1. Namespace A — Artifact Naming

Artifacts include files, repositories, branches, CI/CD outputs, release packages, documentation, and internal issue tracker keys. They encode metadata such as the project name, semantic version and environment directly in their names. This section preserves the existing naming conventions and examples.

⚠️ **Important:** Artifact names may change over time. They are not identifiers.

### Artifact Naming Flow

1. **Assign PARENT + SUB codes** (domain classification)
2. **Add Project Name** (human-readable)
3. **Add mutable metadata:** Version (SemVer), Date (YYYYMMDD), Environment (DEV/STG/PRD)
4. **Result:** e.g., `WA-SS_MyApp_v1.2.0_20250116_PRD.zip`

### 1.1 Pattern

```
<PARENT>-<SUB>_<ProjectName>_v<SemVer>_<YYYYMMDD>_<ENV>.<ext>
```

• `<PARENT>`: 2–3 character top‑level code (uppercase).

• `<SUB>`: 2–3 character subtype code (uppercase; digits allowed).

• `<ProjectName>`: alphanumeric with dashes only (A–Z, 0–9 and `-`).

• `<SemVer>`: semantic version as `MAJOR.MINOR.PATCH` (e.g. `1.4.0`).

• `<YYYYMMDD>`: build/release date in UTC (e.g. `20251106`).

• `<ENV>`: environment: one of `DEV`, `STG`, `PRD`, `OPS`, `LAB`.

• `<ext>`: standard file extension (md, pdf, json, zip, apk, ipa, yml, etc.).

### 1.2 Validation Regex

**For filenames (with extension):**

```
^(WA|MA|DA|CS|AP|A1|DT|DC|SC|I1|GM|BC|RP|IN|MN|CM|QA)-[A-Z0-9]{2,3}_[A-Z0-9-]+_v[0-9]+\.[0-9]+\.[0-9]+_[0-9]{8}_(DEV|STG|PRD|OPS|LAB)\.[A-Za-z0-9]+$
```

**For parent–subtype codes only (folder or tag):**

```
^(WA|MA|DA|CS|AP|A1|DT|DC|SC|I1|GM|BC|RP|IN|MN|CM|QA)-[A-Z0-9]{2,3}$
```

### 1.3 Examples

**Files:**
- `WA-EC_EXP-PORTAL_v1.2.0_20251106_PRD.md`
- `A1-NL_CHAT-ASSIST_v0.6.3_20251106_STG.json`
- `DC-CD_PIPELINE_v2.0.0_20251106_OPS.yml`

**Branch:**
- `feature/MA-XP_NewAuthFlow_v0.3.0`

### 1.4 Ticket / Internal Issue as Artifact (WOE — Work-Oriented Entries)

These are referred to as **Work-Oriented Entries (WOE)**. Internal engineering work items (bugs, chores, refactors) are artifacts, not entities. They are sequential or tracker-generated, used in branches, commits, sprint board.

⚠️ **Critical:** WOE are NOT exposed to customers and do NOT appear in URLs, emails, invoices, exports, or webhooks.

**Examples:**
- `CS-ER-1427`
- `AP-RS-0913`

---

## 2. Namespace B — Public Entity IDs (CC-PID v1)

Public Entity IDs are human-friendly, user-facing identifiers for database entities that are externally referenced.

**Used in:**
- UIs
- URLs
- Invoices
- PDFs
- Exports
- APIs
- Support tickets

**Properties:**
- ✅ Immutable
- ✅ Non-semantic
- ✅ Safe to share publicly
- ❌ Never used for authentication
- ❌ Never used for authorization

⚠️ **Critical:** They are labels, not secrets.

### Generation Flow

```
Entity Created (e.g., Project)
    ↓
Assign ENTITY CODE (ACC, PRJ, INV, etc.)
    ↓
Generate Random TOKEN (Base32, human-safe)
    ↓
Compute Check Digit (CHK) - Deterministic typo guard
    ↓
Persist Public Entity ID: PRJ-X2M8KD-F (Immutable forever)
```

### 2.1 Canonical Format (check digit required)

```
<ENTITY>-<TOKEN>-<CHK>
```

**Example:** `PRJ-X2M8KD-F`

#### 1. `<ENTITY>` Component

**Format:** Exactly 3 uppercase letters that identify the type of entity

**Examples:** `CLT` (client), `PRJ` (project), `INV` (invoice)

**Rules:**
- ✅ Uppercase only
- ✅ Centrally registered
- ✅ Never reused
- ❌ Must NOT encode business logic

**Case Handling:**
- Stored and displayed in **UPPERCASE**
- Input MAY be accepted case-insensitively
- Validators MUST normalize to uppercase before parsing and checksum validation

#### 2. `<TOKEN>` Component

**Format:** 6- or 8-character random string

**Alphabet (human-safe Base32):**
```
ABCDEFGHJKLMNPQRSTUVWXYZ23456789
```

⚠️ **Note:** Excludes `I`, `O`, `0`, `1` to prevent confusion

• Internationalization (Normative): The CC-PID alphabet is ASCII-only and is safe across all

locales and keyboards. Systems MUST treat CC-PID values as UTF-8 strings at
boundaries, but MUST normalize by trimming and uppercasing using locale-invariant rules
(ASCII semantics) before validation. Non-ASCII lookalike characters (e.g., Unicode
homoglyphs) MUST be rejected by the validation regex.

• The token MUST be generated using a cryptographically secure random number generator

(CSPRNG) and MUST NOT use non-cryptographic randomness (e.g., Math.random()).

• The token MUST have no semantic meaning.

• Default length is 6 characters; high-volume entity types (e.g., AUD, LOG, JOB) MUST use 8

characters.

• Future versioning reserve (Guidance): CC-PID v1 does not embed a version marker inside

the ID. However, CYBERCUBE reserves the right to introduce a future “Token Version
Prefix” by reserving the first token character for a version indicator if a breaking format
change is ever required. If activated in a future major version, v1 IDs remain valid
indefinitely and validation MUST accept both formats by version-aware parsing.

• Capacity guidance (non-normative): 6 characters yields 32^6 = 1,073,741,824 possible

tokens (~1.07B) per entity code; 8 characters yields 32^8 = 1,099,511,627,776 (~1.1T). Use
8 characters for very high-volume entities, long-lived systems, or when manual imports/
backfills may create large record counts over time.

3. <CHK>

• a single character check digit from the same alphabet, derived from `<ENTITY><TOKEN>`

to catch typos.

• It is mandatory and deterministic.

• Not cryptographic.

• Not a security control.

• QR compatibility (Guidance): CC-PIDs are QR-friendly because they are short, ASCII, and

restricted to a stable alphanumeric alphabet. Systems MAY render CC-PIDs as QR codes in
invoices, printed documents, or support workflows.

Example: CLT-9F4K7Q-F.

#### 2.1.1 Check Digit Rationale

The check digit is not a security feature. It exists solely to detect transcription errors when IDs are read over the phone or copied from screenshots. Always derive the check digit deterministically on the server side.

#### 2.1.2 Mandatory Check Digit Algorithm (CC-PID v1)

⚠️ **Critical:** All CC-PID v1 implementations MUST use the SHA-256 algorithm specified below to ensure cross-language and cross-service interoperability.

**Algorithm:**
```
CHK = alphabet[ SHA256(entity + "|" + token)[0] mod 32 ]
```

**Where:**
- `entity` = 3-letter entity code (uppercase)
- `token` = 6 or 8 character random token
- `SHA256()` = SHA-256 hash function
- `[0]` = first byte of the hash digest
- `mod 32` = modulo 32 (alphabet length)
- `alphabet` = `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`

**Rationale:**
- SHA-256 is universally available in all programming languages
- Deterministic output ensures consistent results across all implementations
- First byte provides sufficient entropy for check digit purposes
- Simple modulo operation maps to alphabet range

**Example Calculation:**
```
Entity: "PRJ"
Token: "X2M8KD"
Input: "PRJ|X2M8KD"
SHA256: [first byte] = 0x05 = 5
5 mod 32 = 5
alphabet[5] = "F"
Result: PRJ-X2M8KD-F
```

**Implementation Requirements:**
- MUST use SHA-256 (not SHA-1, MD5, or other hash functions)
- MUST use UTF-8 encoding for input string
- MUST use pipe character "|" as separator
- MUST use first byte (index 0) of digest
- MUST apply modulo 32 before alphabet lookup

**Cross-Language Interoperability:**

All implementations in any programming language MUST produce identical check digits for the same input. This ensures that:
- A Python service can validate IDs generated by a TypeScript service
- A Go service can validate IDs generated by a Java service
- Client-side JavaScript can validate server-generated IDs
- All services in a distributed system produce consistent results

**Test Vectors (Normative):**

Implementations MUST pass these test cases:

| Entity | Token | Expected CHK | Full CC-PID |
|--------|-------|--------------|-------------|
| PRJ | X2M8KD | F | PRJ-X2M8KD-F |
| CLT | 9F4K7Q | F | CLT-9F4K7Q-F |
| INV | 4Q7T9P | N | INV-4Q7T9P-N |
| USR | 7M3KPQ | M | USR-7M3KPQ-M |
| TKT | 2R7W9D | U | TKT-2R7W9D-U |

**Future Algorithm Versions:**

If a future version of CC-PID requires a different check digit algorithm:
- It will be designated CC-PID v2 (or higher)
- All v1 IDs remain valid indefinitely
- Services MUST support validation of all version formats
- The version MAY be indicated by a reserved character in the token (future specification)

---

### 2.2 Allowed and Forbidden Uses

Public IDs  may be used  anywhere a human or external system needs to refer to an entity
safely: UI labels, URLs, invoices, support tickets, exports, logs and webhooks payloads,
support communication.

Canonical URL format (Guidance): When embedding Public Entity IDs in product URLs, use the
pattern `/{entity-plural}/{CC-PID}` (example: `/projects/PRJ-X2M8KD-F`, `/clients/CLT-9F4K7Q-F`). The path segment is a human-friendly resource name; the authoritative identifier is the CC-PID.

**REST Resources**

```
GET /api/v1/projects/PRJ-X2M8KD-F
GET /api/v1/invoices/INV-4Q7T9P-N
GET /api/v1/users/USR-7M3KPQ-M
```

**Customer-facing URLs**

```
https://app.cybercube.software/projects/PRJ-X2M8KD-F
https://app.cybercube.software/invoices/INV-4Q7T9P-N
```

Hierarchical URL references (Guidance, URL-only): For nested resources, URLs MAY use a
parent/child reference by concatenating CC-PIDs with a slash for routing clarity (example: `/ projects/PRJ-X2M8KD-F/tasks/TSK-9F4K7Q-2` or compact form `PRJ-X2M8KD-F/ TSK-9F4K7Q-2`). This is for URL composition only; CC-PIDs MUST remain flat identifiers in
storage (no embedded hierarchy) and MUST NOT be stored as concatenated path strings.

Public IDs  must not be used  for authentication, authorization, permission checks or capability
grants because Public Entity IDs MUST NOT be treated as capabilities or access tokens.
Possession of an ID alone MUST NEVER grant access to data or actions.

Voice readability (Guidance): For phone support, CC-PIDs MAY be read using the NATO
phonetic alphabet for letters (A=Alpha, B=Bravo, C=Charlie, D=Delta, E=Echo, F=Foxtrot,
G=Golf, H=Hotel, J=Juliett, K=Kilo, L=Lima, M=Mike, N=November, P=Papa,
Q=Quebec, R=Romeo, S=Sierra, T=Tango, U=Uniform, V=Victor, W=Whiskey, X=X-ray,
Y=Yankee, Z=Zulu). Digits are read as spoken numbers (2–9).

> **Note:** I (India) and O (Oscar) are excluded from the CC-PID token alphabet and will never
> appear in tokens or check digits. If a customer reads "I" or "O", treat it as a likely
> transcription error and ask them to re-verify. The full NATO alphabet is provided in
> Appendix A for support reference.

1. Not secret  – public IDs are deliberately exposed in URLs and documents, so anyone can

obtain them.

2. Guessable  – even with a large namespace, random IDs leak via screenshots and logs;
   security must never rely on obscurity.
3. No identity proof  – knowing an ID proves only that someone has seen it, not that they are
   authorized to act on that entity.  Possession ≠ identity
4. No policy context  – authorization requires user/session roles and ownership checks, not an
   entity label.
5. Check digit ≠ crypto  – the mandatory check digit only detects typos; it is not a
   cryptographic signature.

Use proper authentication (passwords, magic links, OAuth, SSO) and authorization (role‑based
or attribute‑based access control) systems to protect data. Email verification and passwordless
login flows MUST use separate secret, time-limited, single-use verification tokens; Public Entity
IDs (e.g., USR-*) may appear only as non-authoritative context and MUST NOT be used as
verification proofs

Partial ID search (Guidance): When implementing search-by-ID in UIs, accept only prefix
matches of the `<TOKEN>` portion and require a minimum of 3 characters after the entity code.
Example: allow searching `PRJ-X2M` to match `PRJ-X2M8KD-F`. Do not implement arbitrary
substring search for IDs to reduce accidental matches and enumeration risk.

### 2.3 Uniqueness Model

#### 2.3.1 Current Model: Per-Entity-Type Uniqueness (CC-PID v1)

The `<TOKEN>` must be unique **within its entity type**. This means `CLT-9F4K7Q-F` and `PRJ-9F4K7Q-4` may coexist because they refer to different entity types.

**Implementation:**
- Store `entity_code` and `public_token` separately
- Add unique index on `(entity_code, public_token)`
- Collision detection scoped per entity type

**Advantages:**
- ✅ Smaller collision probability per entity type
- ✅ Simpler database constraints
- ✅ Faster uniqueness checks (smaller index per entity)
- ✅ Natural partitioning by entity type

**Disadvantages:**
- ⚠️ Same token can appear in different entity types
- ⚠️ Potential user confusion when seeing similar tokens
- ⚠️ Cannot use token alone for lookups

#### 2.3.2 Alternative Model: Global Token Uniqueness (Recommended for v2)

For enhanced user experience and system simplicity, implementations MAY enforce **global token uniqueness** across all entity types.

**Implementation:**
- Add unique index on `public_token` alone (across all tables)
- OR use a centralized token registry table
- Collision detection across entire system

**Advantages:**
- ✅ Each token is globally unique
- ✅ Reduced user confusion
- ✅ Simpler mental model
- ✅ Can lookup by token alone (faster routing)
- ✅ Better for distributed systems
- ✅ Easier debugging and support

**Disadvantages:**
- ⚠️ Slightly higher collision probability (shared namespace)
- ⚠️ More complex database constraints (cross-table)
- ⚠️ Requires coordination in distributed generation

**Collision Probability Analysis:**

Per-generation collision probability (existing_count / namespace_size) with 6-character tokens and global uniqueness:
- Namespace: 32^6 = 1,073,741,824 (~1.07 billion)
- At 1 million total entities across all types: ~0.09% collision probability per generation
- At 10 million total entities: ~0.93% collision probability per generation
- At 100 million total entities: ~9.3% collision probability per generation

**Recommendation:** Use 8-character tokens for global uniqueness (32^8 = ~1.1 trillion combinations).

#### 2.3.3 Migration Path

**For New Implementations:**
Consider global token uniqueness from the start:
1. Use 8-character tokens by default
2. Implement global token registry or cross-table unique constraint
3. Retry generation on collision (up to 10 attempts)

**For Existing Implementations:**
Maintain per-entity-type uniqueness (backward compatible):
1. Continue with current model
2. Plan migration to global uniqueness in future version
3. Use longer tokens (8 chars) for high-volume entities

**Database Schema for Global Uniqueness:**

```sql
-- Option 1: Centralized token registry
CREATE TABLE public_id_tokens (
    token VARCHAR(8) PRIMARY KEY,
    entity_code CHAR(3) NOT NULL,
    entity_table VARCHAR(50) NOT NULL,
    entity_pk UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tokens_entity ON public_id_tokens(entity_code, entity_table, entity_pk);

-- Option 2: Cross-table unique constraint (PostgreSQL)
CREATE UNIQUE INDEX global_token_unique 
    ON public_id_tokens (token);
```

**CC-PID v1 Compliance:**

Both models are compliant with CC-PID v1 specification. The choice is an implementation decision based on system requirements.

**Decision Matrix:**

| Factor | Per-Entity-Type | Global Uniqueness |
|--------|-----------------|-------------------|
| **User Experience** | ⚠️ Duplicate tokens possible | ✅ All tokens unique |
| **Database Complexity** | ✅ Simple per-table constraints | ⚠️ Requires coordination |
| **Lookup Performance** | ✅ Fast (scoped index) | ✅ Fast (can skip entity type) |
| **Collision Probability** | ✅ Lower (smaller namespace) | ⚠️ Higher (shared namespace) |
| **Distributed Systems** | ⚠️ Requires entity-aware routing | ✅ Simpler coordination |
| **Support/Debugging** | ⚠️ Must specify entity type | ✅ Token alone sufficient |
| **Token Length** | ✅ 6 chars sufficient | ⚠️ 8 chars recommended |
| **Migration Complexity** | ✅ Simpler | ⚠️ More complex |

**Recommendation by System Type:**

| System Type | Recommended Model | Rationale |
|-------------|-------------------|-----------|
| **Small-Medium SaaS** | Per-Entity-Type | Simpler implementation, adequate namespace |
| **Large Enterprise** | Global Uniqueness | Better UX, easier support, scales better |
| **Distributed/Microservices** | Global Uniqueness | Simpler routing, less coordination |
| **Monolithic Application** | Per-Entity-Type | Simpler constraints, faster lookups |
| **Customer-Facing Platform** | Global Uniqueness | Better UX, less confusion |
| **Internal Tools** | Per-Entity-Type | Adequate for internal use |

### 2.4 Validation Regex

```
^[A-Z]{3}-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$
```

UTF-8 handling note: validators MUST reject any characters outside the allowed ASCII set; do
not attempt transliteration of Unicode lookalikes.

Test vectors (Normative): Implementations MUST include automated tests covering known-
good and known-bad CC-PID examples. At minimum, include the following cases (expected
results shown):

Known-good (format-valid; checksum must validate if generated by the official algorithm):

- PRJ-X2M8KD-F  -> VALID (if checksum matches)
- CLT-9F4K7Q-F  -> VALID (if checksum matches)
- INV-4Q7T9P-N  -> VALID (if checksum matches)
- TKT-2R7W9D-U  -> VALID (if checksum matches)
- USR-8H3K6P-D  -> VALID (if checksum matches)

Known-bad (must FAIL with the indicated error code):

- prj-x2m8kd-f        -> VALID after normalize (uppercase); DO NOT fail solely for casing
- PRJ- X2M8KD-F       -> INVALID_TOKEN_FORMAT (internal whitespace)
- PRJ-X2M8K-F         -> INVALID_TOKEN_FORMAT (token too short)
- PRJ-X2M8KDI-F       -> INVALID_TOKEN_FORMAT (contains I; disallowed)
- PRJ-X2M8KDO-F       -> INVALID_TOKEN_FORMAT (contains O; disallowed)
- PRJ-X2M8KD-0        -> INVALID_TOKEN_FORMAT (check digit contains 0; disallowed)
- PRJ-X2M8KD-1        -> INVALID_TOKEN_FORMAT (check digit contains 1; disallowed)
- PRJ-X2M8KD-X        -> CHECKSUM_MISMATCH (if X is not the computed CHK)
- PRJ-X2M8KD-F\n      -> VALID after trim; DO NOT allow internal whitespace
- PRJ-X2M8KD-F-EXTRA  -> INVALID_TOKEN_FORMAT (extra segment)

Note: For “Known-good” vectors, compute the correct CHK using the official algorithm and
lock the final strings as deterministic fixtures within the test suite.

Copy/paste rule: Public Entity IDs MUST NOT contain leading or trailing whitespace. All
validators MUST `trim()` input before validation and MUST reject IDs that contain internal
whitespace characters.

### 2.5 Governance and Security Rules

1. Entity code registry  – every entity type (client, project, invoice, etc.) must be assigned a
   unique 3‑letter code.  Codes are never reused, even if an entity type is deprecated. ID
   generation MUST retry on collision until a unique (entity_code, token) pair is persisted.
2. Immutability  – once generated, a public ID never changes.  Do not embed mutable
   metadata like version, date or environment.
3. Generation authority  – public IDs are generated server‑side only using cryptographically
   secure randomness.  Clients must never supply or choose their own IDs.
4. Versioning  – this specification is version 1.1 (CC-PID v1).  If the format changes in the
   future, new versions must co‑exist with v1; old IDs remain valid indefinitely.
5. **Business logic separation** – Applications must not infer business logic, permissions, workflows, or UI behavior solely from the public ID or entity code. Entity codes exist for routing and classification only.
   
   **Guidance:** Entity codes MAY be used for service routing and storage partitioning (e.g., dispatch to the owning service or table family), but MUST NOT be used as an authorization signal.

6. **Deprecated entity types** – Retain their codes indefinitely. No new records are created, but existing IDs remain valid for historical references, exports, and audits. No reuse under any circumstances.

   **6.1 Deprecation protocol (Guidance):** When an entity instance is retired or soft-deleted, its CC-PID remains reserved and MUST NOT be reused. Public-facing APIs SHOULD return HTTP 410 Gone for requests referencing a permanently retired entity (as opposed to 404 Not Found), and MAY include a non-sensitive error payload indicating the resource was retired.

7. **Collision Handling (Mandatory):** Generation MUST retry on collision. Minimum retries: up to 10 attempts. Collisions MUST be logged with entity code and timestamp. Repeated collisions MUST trigger alerting (possible RNG or constraint failure). If all retry attempts fail, the system MUST surface an operational error and MUST emit a high-severity alert. Collision rates above a minimal baseline SHOULD be treated as an indicator of RNG misuse, mis-scoped uniqueness constraints, or an implementation defect.

8. **Capability separation** – Public Entity IDs MUST NOT be treated as capabilities or access tokens. Possession of an ID alone MUST NEVER grant access to data or actions.

9. **Entropy Source (Mandatory):** Token generation MUST use a CSPRNG. Non-cryptographic randomness (e.g., Math.random()) is forbidden.

10. **Timing-Safe Comparison (Guidance):** Public Entity IDs are non-secret labels; constant-time string comparison is REQUIRED for secrets (passwords, auth tokens, API key secrets) but OPTIONAL for Public Entity ID validation. Do not rely on timing behavior as a security boundary.

11. **Logging Guidance (Normative):** CC-PIDs are safe to log because they contain no PII and no semantic meaning. However, logs MUST NOT include CC-PIDs alongside user-identifying context (email, phone, name, IP address, session identifiers) in a way that creates a durable PII linkage. When correlation is required, use internal request IDs or hashed/rotating correlation identifiers.

12. **Rate Limiting (Guidance):** ID generation endpoints SHOULD enforce rate limits to prevent enumeration attacks and resource exhaustion. Recommended defaults: 100 IDs/second per entity type under normal operation; burst allowance of 500 IDs in a 10-second window for batch imports. Sustained generation exceeding 50 IDs/second SHOULD trigger monitoring alerts. Rate limiting is a defense-in-depth measure and does not replace proper authentication and authorization controls.

---

## 3. Namespace G — Governance Registry Identifiers

Governance Registry Identifiers are immutable, sequential IDs assigned to strategic and architectural assets that require formal registration, ownership tracking, and lifecycle governance.

**Used for:**
- Products (PRD-XXX, per PRCS 1.5)
- Modules (MOD-XXX, see §4)

**NOT used for:**
- ❌ Database entities (use CC-PID, Namespace B)
- ❌ Build artifacts (use Namespace A)
- ❌ Source files or components (use Namespace M)

### 3.1 Canonical Format

```
<PREFIX>-<NNN>
```

| Component | Rules |
|-----------|-------|
| **PREFIX** | 3 uppercase letters; centrally registered; identifies the asset class |
| **NNN** | 3-digit zero-padded sequential number (001–999); assigned by registry |

**Example:** `MOD-001`, `PRD-003`

### 3.2 Registered Prefixes

| Prefix | Asset Class | Governed By |
|--------|-------------|-------------|
| **PRD** | Product Record | PRCS 1.5 |
| **MOD** | Module Record | This standard, §4 |

**Future-reserved (not yet active):**
| Prefix | Intended Use |
|--------|--------------|
| **ADR** | Architecture Decision Records |
| **STD** | Standards |

### 3.3 Governance Rules

1. **Sequential assignment** — IDs are assigned in order from the central registry. No gaps permitted unless a registration is voided before publication.
2. **Immutability** — once assigned, a governance ID never changes.
3. **No reuse** — retired or deprecated IDs remain reserved indefinitely.
4. **Registry-controlled** — only the designated registry authority may assign IDs. Self-assignment is PROHIBITED.
5. **No semantic encoding** — the numeric portion has no meaning; semantics live in the associated record (Module Record, Product Record).

### 3.4 Validation Regex

```
^[A-Z]{3}-[0-9]{3}$
```

### 3.5 Relationship to Other Namespaces

| Namespace | Example | Relationship |
|-----------|---------|--------------|
| **G** (this) | MOD-001 | Governance identity — "which module" |
| **B** (CC-PID) | MOD-X2M8KD-F | Runtime entity identity — reserved for future use if modules become database entities |
| **A** (Artifact) | SC-AU_IdentityModule_v1.0.0_PRD.zip | Build artifact naming for a module's release package |
| **M** (Module Naming) | `modules/identity/src/...` | Internal file and component structure |

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

## 5. CC-PID Implementation Guidelines

Although this document defines the patterns and rules, implementers may benefit from
reference code and database schemas.  The following guidelines reflect best practices:

Performance SLAs (Guidance): Reference implementations SHOULD meet the following per-
call targets on typical server hardware:

- generate: < 1 ms
- validate: < 0.1 ms
- parse: < 0.1 ms

These are guidance targets intended to keep CC-PID handling negligible in request latency.

Distributed Generation (Guidance): For horizontally-scaled deployments generating CC-PIDs

across multiple service instances, entity codes MAY be used as a routing key for partitioned

uniqueness enforcement. Recommended approaches: (1) Each instance generates tokens

independently and relies on database-level unique constraint with retry on collision; (2)

Centralized ID service with entity-code-based sharding; (3) Coordination-free generation

using 8-character tokens (lower collision probability ~1 in 1.1T). Implementations MUST NOT

embed instance identifiers or timestamps in tokens—tokens remain purely random.

### 5.1. UUIDs vs Public Entity IDs

| Aspect | UUID | CC-PID |
|--------|------|--------|
| **Visibility** | Internal only | External |
| **Mutability** | Immutable | Immutable |
| **Human-readable** | No | Yes |
| **Security** | Opaque | Non-secret |

**Rules:**

• UUIDs MUST NEVER be exposed externally.

• CC-PIDs MUST NEVER be used for authentication, authorization, or permission checks.

• Public Entity IDs MUST NOT be treated as capabilities or access tokens.

### 5.2 Entity Code Registry

Entity codes are governed via a central registry: `entity-codes.json`

⚠️ **Governance:** Adding or modifying entity codes requires explicit review and approval by platform governance. Deprecated codes are retained indefinitely. Codes are never reused.

**Registry Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `code` | String | 3-letter entity code |
| `name` | String | Human-readable name |
| `description` | String | Purpose and usage |
| `owner` | String | Team/service owner |
| `status` | Enum | `ACTIVE` or `DEPRECATED` |
| `created_at` | Timestamp | Creation date |

---

### 5.3 Service Contract (Required)

All services handling CC-PID MUST implement:

**Core Methods:**
- `generate(entityCode, length)` - Generate new CC-PID
- `validate(publicId)` - Validate format and checksum
- `parse(publicId)` - Parse and extract components

⚠️ **Critical:** Checksum validation is REQUIRED at all input boundaries.

#### Standard Error Codes (Normative)

All services and SDKs handling CC-PIDs MUST use the following stable error identifiers:

| Error Code | Description |
|------------|-------------|
| `INVALID_ENTITY_CODE` | Entity segment invalid |
| `INVALID_TOKEN_FORMAT` | Token/CHK invalid chars/length/whitespace/segment count |
| `CHECKSUM_MISMATCH` | Checksum does not match computed CHK |
| `ID_NOT_FOUND` | Syntactically valid CC-PID that fails to resolve to a record |

**Notes:**
- ✅ Use these codes in API responses, logs, and client SDKs for consistent handling
- ✅ Human-readable messages MAY vary, but the code identifiers MUST remain stable

#### SDK Contract (Normative, language-agnostic)

In addition to generate/validate/parse, implementations SHOULD expose a minimal cross-language interface:

| Method | Signature | Description |
|--------|-----------|-------------|
| `normalize` | `(input: string) -> string` | Returns canonical uppercase CC-PID after trimming; rejects internal whitespace |
| `validateDetailed` | `(input: string) -> { ok: boolean, code?: string, normalized?: string, parts?: { entity, token, chk, publicId } }` | If ok=true, returns normalized CC-PID and parsed parts. If ok=false, code MUST be one of: `INVALID_ENTITY_CODE`, `INVALID_TOKEN_FORMAT`, `CHECKSUM_MISMATCH` |
| `format` | `(entity: string, token: string) -> string` | Returns canonical CC-PID string (ENTITY-TOKEN-CHK). Must compute CHK deterministically |
| `prefixQuery` | `(entity: string, tokenPrefix: string) -> string` | Returns canonical prefix pattern for UI lookup (ENTITY-TOKENPREFIX). Requires >=3 token chars; prefix match only |

**Important Notes:**
- Storage lookups (`ID_NOT_FOUND`) are not validation errors
- Services MAY return `ID_NOT_FOUND` only when a syntactically valid CC-PID fails to resolve to an entity

**Normalization Requirements:**
Services MUST normalize candidate CC-PID input by:
1. Trimming leading/trailing whitespace
2. Converting to uppercase
3. Applying regex and checksum validation

---

### 5.4 ID Generation Service

Implement a `PublicIdService` (e.g., in TypeScript) with methods to:

**Required Methods:**

| Method | Purpose |
|--------|---------|
| **Generate** | Create a new ID given an entity code and optional token length (6 or 8 characters) |
| **Parse** | Validate an existing ID, verifying the check digit |
| **Check** | Determine whether a string is a valid public ID (boolean return) |
| **Compute** | Calculate the check digit deterministically (e.g., first byte of SHA-256 of `<ENTITY>\|<TOKEN>` modulo the alphabet length) |

#### Validation Behavior (Guidance)

`validateDetailed()` SHOULD distinguish failures using standard codes:

| Error Code | Trigger Condition |
|------------|-------------------|
| `INVALID_ENTITY_CODE` | Entity segment invalid |
| `INVALID_TOKEN_FORMAT` | Token/CHK invalid chars/length/whitespace/segment count |
| `CHECKSUM_MISMATCH` | Checksum does not match computed CHK |
| `ID_NOT_FOUND` | Syntactically valid CC-PID that fails to resolve to a record |

#### Batch Generation (Guidance)

For bulk imports or migrations, implementations MAY provide a batch generator that returns up to **1000 generated IDs** per request/call (e.g., `generateBatch(entityCode, count, length)`).

⚠️ **Requirements:** Batch generation MUST apply the same:
- CSPRNG requirements
- Checksum rules
- Collision retry behavior as single ID generation

**Security:** The service should use a cryptographically secure random number generator for token generation and must retry on database uniqueness conflicts.

> 📄 **Reference Implementation:** See the accompanying `public-id-service.ts` file for a complete example.

#### 5.4.1 Reference Implementation: `public-id-service.ts`

```typescript
import crypto from "crypto";

export type EntityCode = string; // validated at runtime

export type PublicIdParts = {
  entity: string;
  token: string;
  chk: string;
  publicId: string;
};

export type PublicIdErrorCode =
  | "INVALID_ENTITY_CODE"
  | "INVALID_TOKEN_FORMAT"
  | "CHECKSUM_MISMATCH"
  | “ID_NOT_FOUND";

export type PublicIdValidationResult =
  | { ok: true; normalized: string; parts: PublicIdParts }
  | { ok: false; code: PublicIdErrorCode };

/**

* Service for generating and validating CYBERCUBE public IDs (CC-PID v1).
* 
* A public ID has the form `<ENTITY>-<TOKEN>-<CHK>` where:
* - ENTITY: exactly 3 uppercase letters identifying the entity type (e.g. CLT, PRJ).
* - TOKEN: a 6- or 8-character string from a human-safe alphabet (no I, O, 0, 1).
* - CHK: a single character check digit derived from ENTITY and TOKEN to detect typos.
    */
    export class PublicIdService {
    // Human-safe Base32-ish alphabet: no I, O, 0, 1
    public static readonly ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    public static readonly TOKEN_LEN_DEFAULT = 6;
    public static readonly TOKEN_LEN_HIGH_VOLUME = 8;

  // Regex for mandatory check digit format: ENTITY-TOKEN-CHK
  public static readonly PUBLIC_ID_REGEX =
  /^([A-Z]{3})-([A-HJ-NP-Z2-9]{6,8})-([A-HJ-NP-Z2-9])$/;

  /**
* Generate a new Public Entity ID (checksum mandatory).
* @param entity 3-letter entity code (validated).
* @param tokenLength length of the random token (6 or 8 characters).
  */
  static generate(entity: EntityCode, tokenLength: 6 | 8 = 6): PublicIdParts {
  this.assertEntity(entity);
  this.assertTokenLength(tokenLength);

  const token = this.randomToken(tokenLength);
  const chk = this.checkDigit(entity, token);
  const publicId =`${entity}-${token}-${chk}`;

  return { entity, token, chk, publicId };
  }

  /**
* Parse and validate a public id; verifies checksum.
* @param publicId candidate ID
* @returns the parsed components if valid; throws otherwise

   */
  static parse(publicId: string): PublicIdParts {
  // Normalize: trim + uppercase (copy/paste + case-insensitive input)
  const normalized = publicId.trim().toUpperCase();

  // Reject internal whitespace (tabs/newlines/spaces inside the ID)
  if (/\s/.test(normalized)) {
    throw new Error("Invalid Public ID: whitespace is not allowed");
  }

  const m = normalized.match(this.PUBLIC_ID_REGEX);
  if (!m) throw new Error("Invalid Public ID format");

  const entity = m[1];
  const token = m[2];
  const chk = m[3];

  // Verify check digit
  const expected = this.checkDigit(entity, token);
  if (chk !== expected) throw new Error("Invalid Public ID checksum");

  return { entity, token, chk, publicId: `${entity}-${token}-${chk}` };
}

/**

* Normalize candidate CC-PID input (copy/paste + case-insensitive input).
* - trims leading/trailing whitespace
* - uppercases for canonical form
* - rejects internal whitespace
    */
    static normalize(input: string): string {
    const normalized = input.trim().toUpperCase();
    if (/\s/.test(normalized)) {
    throw new Error("Invalid Public ID: whitespace is not allowed");
    }
    return normalized;
    }

/**

* Prefix-search helper for UIs (Guidance):
* - requires at least 3 token chars after the entity code
* - prefix match only (no substring search)
* Examples:
* - "PRJ-X2M" matches "PRJ-X2M8KD-F"
* - "prj-x2m" is accepted and normalized
    */
    static prefixQuery(entity: EntityCode, tokenPrefix: string): string {
    this.assertEntity(entity);

  const prefix = tokenPrefix.trim().toUpperCase();
  if (/\s/.test(prefix)) throw new Error("Invalid token prefix: whitespace is not allowed");
  if (prefix.length < 3) throw new Error("Token prefix must be at least 3 characters");

  // validate prefix chars against allowed token alphabet
  if (!new RegExp(`^[A-HJ-NP-Z2-9]{${prefix.length}}$`).test(prefix)) {
  throw new Error("Invalid token prefix characters");
  }

  // Caller can use this pattern to build LIKE queries: `${entity}-${prefix}%`
  return `${entity}-${prefix}`;
  }

  /**
* Format a canonical CC-PID string from entity code and token.
* Computes CHK deterministically.
* @param entity 3-letter entity code (uppercase)
* @param token random token string (6 or 8 chars)
* @returns canonical CC-PID string (ENTITY-TOKEN-CHK)
  */
  static format(entity: EntityCode, token: string): string {
  this.assertEntity(entity);
  const chk = this.checkDigit(entity, token);
  return `${entity}-${token}-${chk}`;
  }

  /**
* True/false validation (no throws).
* @param publicId candidate ID
* @returns true if valid, false otherwise
  */
  static isValid(publicId: string): boolean {
  try {
  this.parse(publicId);
  return true;
  } catch {
  return false;
  }
  }

/**

* Detailed validation with standardized error codes.
* This is validation-only; ID_NOT_FOUND must be handled by the caller
* after a successful parse when querying storage.
  */

static validateDetailed(input: string): PublicIdValidationResult {
  let normalized: string;

  try {
    normalized = this.normalize(input);
  } catch {
    return { ok: false, code: "INVALID_TOKEN_FORMAT" };
  }

  const match = normalized.match(this.PUBLIC_ID_REGEX);
  if (!match) {
    return { ok: false, code: "INVALID_TOKEN_FORMAT" };
  }

  const entity = match[1];
  const token = match[2];
  const chk = match[3];

  // NOTE: This format check is redundant with PUBLIC_ID_REGEX (defensive).
  // For registry-level validation (checking if the entity code is registered),
  // callers should verify entity against the entity-codes registry after parsing.
  if (!/^[A-Z]{3}$/.test(entity)) {
    return { ok: false, code: "INVALID_ENTITY_CODE" };
  }

  if (!/^[A-HJ-NP-Z2-9]{6,8}$/.test(token)) {
    return { ok: false, code: "INVALID_TOKEN_FORMAT" };
  }

  const expectedChk = this.checkDigit(entity, token);
  if (chk !== expectedChk) {
    return { ok: false, code: "CHECKSUM_MISMATCH" };
  }

  return {
    ok: true,
    normalized,
    parts: {
      entity,
      token,
      chk,
      publicId: normalized,
    },
  };
}

/**

* Validate + resolve helper (Guidance).
* Caller supplies a resolver function (DB lookup).
  */
  static async validateAndResolve<T>(
  input: string,
  resolver: (entity: string, token: string) => Promise<T | null>
  ): Promise<{ ok: true; entity: T } | { ok: false; code: PublicIdErrorCode }> {
  const result = this.validateDetailed(input);
  if (!result.ok) return result;

  const { entity, token } = result.parts;
  const record = await resolver(entity, token);

  if (!record) {
  return { ok: false, code: "ID_NOT_FOUND" };
  }

  return { ok: true, entity: record };
  }

  /**
* Compute 1-char check digit using SHA-256 algorithm (CC-PID v1 mandatory).
* Not a security feature—detects typos only.
* 
* Algorithm: CHK = alphabet[ SHA256(entity + "|" + token)[0] mod 32 ]
* 
* @param entity 3-letter entity code (uppercase)
* @param token random token string (6 or 8 chars)
* @returns single character check digit from ALPHABET
  */
  static checkDigit(entity: string, token: string): string {
  this.assertEntity(entity);

  // CC-PID v1 Mandatory Algorithm: SHA-256(entity|token) -> first byte -> mod 32
  const input = `${entity}|${token}`;
  const digest = crypto.createHash("sha256").update(input, "utf8").digest();
  const idx = digest[0] % this.ALPHABET.length; // mod 32
  return this.ALPHABET[idx];
  }

  /**
* Validate entity code. Throws if invalid.

   * @param entity candidate code
   */
  static assertEntity(entity: string): asserts entity is EntityCode {
    if (!/^[A-Z]{3}$/.test(entity)) {
      throw new Error("Entity code must be exactly 3 uppercase letters");
    }
  }

  /**

* Ensure token length is 6 or 8.
* @param n candidate length
  */
  private static assertTokenLength(n: number): asserts n is 6 | 8 {
  if (n !== 6 && n !== 8) throw new Error("Token length must be 6 or 8");
  }

  /**
* Generate a random token of given length using ALPHABET.
* @param length length of token
  */
  static randomToken(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
  const idx = crypto.randomInt(0, this.ALPHABET.length);
  out += this.ALPHABET[idx];
  }
  return out;
  }
  }
```

#### 5.4.2 Cross-Language Reference Implementations

To ensure interoperability, here are reference implementations of the check digit algorithm in common languages:

**Python:**
```python
import hashlib

ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

def check_digit(entity: str, token: str) -> str:
    """Compute CC-PID v1 check digit using SHA-256."""
    input_str = f"{entity}|{token}"
    digest = hashlib.sha256(input_str.encode('utf-8')).digest()
    idx = digest[0] % len(ALPHABET)  # mod 32
    return ALPHABET[idx]

# Test
assert check_digit("PRJ", "X2M8KD") == "F"
assert check_digit("CLT", "9F4K7Q") == "F"
```

**Go:**
```go
package ccpid

import (
    "crypto/sha256"
)

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

func CheckDigit(entity, token string) string {
    input := entity + "|" + token
    hash := sha256.Sum256([]byte(input))
    idx := hash[0] % 32
    return string(alphabet[idx])
}

// Test: CheckDigit("PRJ", "X2M8KD") == "F"
```

**Java:**
```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CCPIDCheckDigit {
    private static final String ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    
    public static String checkDigit(String entity, String token) 
            throws NoSuchAlgorithmException {
        String input = entity + "|" + token;
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
        int idx = (hash[0] & 0xFF) % 32;
        return String.valueOf(ALPHABET.charAt(idx));
    }
    
    // Test: checkDigit("PRJ", "X2M8KD").equals("F")
}
```

**Ruby:**
```ruby
require 'digest'

ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

def check_digit(entity, token)
  input = "#{entity}|#{token}"
  digest = Digest::SHA256.digest(input)
  idx = digest.bytes[0] % 32
  ALPHABET[idx]
end

# Test
raise unless check_digit("PRJ", "X2M8KD") == "F"
raise unless check_digit("CLT", "9F4K7Q") == "F"
```

**PHP:**
```php
<?php
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function checkDigit(string $entity, string $token): string {
    $input = $entity . "|" . $token;
    $digest = hash('sha256', $input, true);
    $idx = ord($digest[0]) % 32;
    return ALPHABET[$idx];
}

// Test
assert(checkDigit("PRJ", "X2M8KD") === "F");
assert(checkDigit("CLT", "9F4K7Q") === "F");
```

**Rust:**
```rust
use sha2::{Sha256, Digest};

const ALPHABET: &[u8] = b"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

fn check_digit(entity: &str, token: &str) -> char {
    let input = format!("{}|{}", entity, token);
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    let result = hasher.finalize();
    let idx = (result[0] % 32) as usize;
    ALPHABET[idx] as char
}

// Test: assert_eq!(check_digit("PRJ", "X2M8KD"), 'F');
```

**C#:**
```csharp
using System;
using System.Security.Cryptography;
using System.Text;

public class CCPIDCheckDigit
{
    private const string ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    
    public static string CheckDigit(string entity, string token)
    {
        string input = $"{entity}|{token}";
        using (var sha256 = SHA256.Create())
        {
            byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            int idx = hash[0] % 32;
            return ALPHABET[idx].ToString();
        }
    }
    
    // Test: CheckDigit("PRJ", "X2M8KD") == "F"
}
```

---

### 5.5 Database Constraints

For each table storing public IDs, define columns similar to:

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| `entity_code` | `CHAR(3)` | The 3-letter entity code (e.g., CLT) |
| `public_token` | `VARCHAR(8)` | Random token (6 or 8 characters) |
| `public_id` | `VARCHAR(16)` | Full ID (`<ENTITY>-<TOKEN>-<CHK>`) |
| `other columns` | … | Entity-specific data |

**Constraints:**
- ✅ Enforce a unique index on `(entity_code, public_token)`
- ✅ Optionally add unique index on `public_id`
- ✅ Add a check constraint matching the validation regex above

---

### 5.6 Sample Implementation

A full TypeScript implementation of the `PublicIdService` (with deterministic checksum logic and parse/validate methods) is provided alongside this document in `public-id-service.ts`. A sample PostgreSQL migration with recommended constraints is provided in `db_migration.sql`.

> ℹ️ **Note:** These files are not part of the specification but serve as a reference for implementers.

#### Migration Path (Guidance)

When migrating from legacy identifiers (numeric IDs, GUIDs previously exposed, or third-party keys):

**Recommended Approach:**

1. **Introduce CC-PID alongside legacy field** and maintain a mapping
2. **Store mapping columns:** `legacy_source` and `legacy_id`
3. **Enforce uniqueness** on `(legacy_source, legacy_id)`

**During Migration:**

| Step | Action |
|------|--------|
| 1 | Accept CC-PID when present |
| 2 | Accept legacy IDs for a defined transition window |
| 3 | Respond with canonical CC-PID in all new outputs |

**Example Mapping:**
```
LEGACY:<old-id> → PRJ-<newtoken>-<chk>
```

⚠️ **Critical:** Legacy IDs must never be re-emitted once clients are updated.

---

#### 5.6.1 Reference Implementation: `db_migration.sql`

Sample PostgreSQL migration for adding public ID columns, constraints, and prefix-search support.

**Purpose:** This example shows how to modify an existing `clients` table to support CYBERCUBE public IDs (CC-PID v1).

**CC-PID Format:** `<ENTITY>-<TOKEN>-<CHK>`  
**Example:** `CLT-9F4K7Q-F`

**Notes:**
- ✅ Public IDs are stored/displayed in UPPERCASE
- ✅ Input validation must trim whitespace and normalize to uppercase in the application layer
- ✅ This migration enforces format, uniqueness, and supports fast prefix-search
- ⚠️ This example uses per-entity-type uniqueness (see §2.3 for global uniqueness option)

> 📝 **Reusability:** Apply similar changes to other entity tables (projects, invoices, etc.), adjusting the default `entity_code` accordingly.

```sql
BEGIN;

-- 1) Add columns (idempotency guards optional; remove IF NOT EXISTS if you prefer strict
migrations)
ALTER TABLE clients
    -- 3-letter entity code; defaults to 'CLT' for clients
    ADD COLUMN IF NOT EXISTS entity_code CHAR(3) NOT NULL DEFAULT 'CLT',
    -- Random token (6 or 8 characters)
    ADD COLUMN IF NOT EXISTS public_token VARCHAR(8) NOT NULL,
    -- Full public ID (`<ENTITY>`-`<TOKEN>`-`<CHK>`)
    ADD COLUMN IF NOT EXISTS public_id VARCHAR(16) NOT NULL;

-- 2) Entity code must be exactly 3 uppercase letters
ALTER TABLE clients
    ADD CONSTRAINT IF NOT EXISTS clients_entity_code_format_chk
        CHECK (entity_code ~ '^[A-Z]{3}$');

-- 3) Token must be 6 or 8 chars from the human-safe alphabet (no I, O, 0, 1)
ALTER TABLE clients
    ADD CONSTRAINT IF NOT EXISTS clients_public_token_format_chk
        CHECK (public_token ~ '^[A-HJ-NP-Z2-9]{6,8}$');

-- 4) Public ID must match mandatory format with check digit
-- (Whitespace trimming and case normalization are enforced in the application layer.)
ALTER TABLE clients
    ADD CONSTRAINT IF NOT EXISTS clients_public_id_format_chk
        CHECK (public_id ~ '^[A-Z]{3}-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$');

-- 5) Optional consistency check: public_id should begin with entity_code + '-'
-- Helps prevent mismatches if public_id is constructed incorrectly.
ALTER TABLE clients
    ADD CONSTRAINT IF NOT EXISTS clients_public_id_entity_prefix_chk
        CHECK (left(public_id, 4) = entity_code || '-');

-- 6) Ensure uniqueness per entity type (entity_code + token)
CREATE UNIQUE INDEX IF NOT EXISTS clients_public_entity_token_uq
    ON clients (entity_code, public_token);

-- 7) Ensure the concatenated public ID is unique
CREATE UNIQUE INDEX IF NOT EXISTS clients_public_id_uq
    ON clients (public_id);

-- 8) Prefix-search index (recommended) for fast UI partial searches:
-- Query pattern:
--   WHERE entity_code = 'CLT' AND public_token LIKE 'X2M%'
-----------------------------------------------------------

-- Note: varchar_pattern_ops is appropriate for VARCHAR columns.
CREATE INDEX IF NOT EXISTS clients_public_token_prefix_idx
    ON clients (entity_code, public_token varchar_pattern_ops);

-- 9) Optional: prefix-search on full public_id (if your UI searches "CLT-X2M")
-- Query pattern:
--   WHERE public_id LIKE 'CLT-X2M%'
CREATE INDEX IF NOT EXISTS clients_public_id_prefix_idx
    ON clients (public_id varchar_pattern_ops);

COMMIT;
```

> 📝 **Reusability:** Repeat similar statements for other entity tables (projects, invoices, etc.), adjusting the default `entity_code` accordingly (e.g., 'PRJ', 'INV').

#### 5.6.2 Global Token Uniqueness Implementation (Optional)

For implementations choosing global token uniqueness (see §2.3.2), use this approach:

**Centralized Token Registry:**

```sql
-- Create global token registry table
CREATE TABLE public_id_tokens (
    token VARCHAR(8) PRIMARY KEY,  -- Globally unique
    entity_code CHAR(3) NOT NULL,
    entity_table VARCHAR(50) NOT NULL,
    entity_pk UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT token_format_chk 
        CHECK (token ~ '^[A-HJ-NP-Z2-9]{6,8}$'),
    CONSTRAINT entity_code_format_chk 
        CHECK (entity_code ~ '^[A-Z]{3}$')
);

-- Index for reverse lookup (entity → token)
CREATE UNIQUE INDEX idx_tokens_entity_pk 
    ON public_id_tokens(entity_code, entity_table, entity_pk);

-- Index for entity type queries
CREATE INDEX idx_tokens_entity_code 
    ON public_id_tokens(entity_code);
```

**Entity Table Schema (Simplified):**

```sql
-- Entity tables only store the token (not entity_code)
ALTER TABLE clients
    ADD COLUMN IF NOT EXISTS public_token VARCHAR(8) NOT NULL,
    ADD COLUMN IF NOT EXISTS public_id VARCHAR(16) NOT NULL;

-- Foreign key to token registry
ALTER TABLE clients
    ADD CONSTRAINT clients_token_fk 
        FOREIGN KEY (public_token) 
        REFERENCES public_id_tokens(token);

-- Unique constraint on public_id
CREATE UNIQUE INDEX clients_public_id_uq 
    ON clients(public_id);
```

**ID Generation with Global Uniqueness:**

```typescript
async function generateGloballyUniqueId(
  entityCode: string, 
  entityTable: string,
  entityPk: string,
  tokenLength: 6 | 8 = 8  // Recommend 8 for global uniqueness
): Promise<PublicIdParts> {
  const maxRetries = 10;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const token = PublicIdService.randomToken(tokenLength);
    
    try {
      // Insert into global registry (will fail on collision)
      await db.query(`
        INSERT INTO public_id_tokens (token, entity_code, entity_table, entity_pk)
        VALUES ($1, $2, $3, $4)
      `, [token, entityCode, entityTable, entityPk]);
      
      const chk = PublicIdService.checkDigit(entityCode, token);
      const publicId = `${entityCode}-${token}-${chk}`;
      
      return { entity: entityCode, token, chk, publicId };
      
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        // Retry with new token
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Failed to generate unique token after max retries');
}
```

**Advantages of Global Uniqueness:**
- ✅ Simpler user experience (no duplicate-looking tokens)
- ✅ Can route by token alone (faster lookup)
- ✅ Better for distributed systems
- ✅ Easier debugging and support
- ✅ Future-proof for cross-entity operations

**Trade-offs:**
- Requires centralized token registry or coordination
- Slightly higher collision probability (mitigated by 8-char tokens)
- More complex database schema

**Recommendation:** Use global uniqueness for new systems, especially if:
- Building a distributed architecture
- Expecting high entity volumes across multiple types
- Prioritizing user experience and simplicity
- Using 8-character tokens

---

## 6. Tables

### 6.1. Crosswalk Table (Parent → Subtype → Full Code)

| Parent | Parent Name | Subtype | Subtype Name | Full Code |
|--------|-------------|---------|--------------|-----------|
| WA | Web Apps | SS | SaaS | WA-SS |
| WA | Web Apps | PO | Portals | WA-PO |
| WA | Web Apps | EC | E-Commerce | WA-EC |
| WA | Web Apps | CM | Content Management | WA-CM |
| MA | Mobile Apps | IO | iOS native | MA-IO |
| MA | Mobile Apps | AD | Android native | MA-AD |
| MA | Mobile Apps | XP | Cross-Platform | MA-XP |
| MA | Mobile Apps | PW | PWA | MA-PW |
| DA | Desktop Apps | MC | macOS | DA-MC |
| DA | Desktop Apps | WN | Windows | DA-WN |
| DA | Desktop Apps | LX | Linux | DA-LX |
| DA | Desktop Apps | XP | Cross-Platform | DA-XP |
| CS | Custom Software | WF | Custom Workflow | CS-WF |
| CS | Custom Software | ER | ERP/CRM Systems | CS-ER |
| CS | Custom Software | IT | Internal Tools | CS-IT |
| CS | Custom Software | ST | Suites | CS-ST |
| AP | API & Backend | RS | REST API | AP-RS |
| AP | API & Backend | GQ | GraphQL | AP-GQ |
| AP | API & Backend | MS | Microservices | AP-MS |
| AP | API & Backend | RT | Real-Time API | AP-RT |
| AP | API & Backend | BE | Backend Services | AP-BE |
| A1 | AI & Machine Learning | AS | AI Assistants | A1-AS |
| A1 | AI & Machine Learning | PD | Predictive | A1-PD |
| A1 | AI & Machine Learning | RC | Recommender | A1-RC |
| A1 | AI & Machine Learning | NL | NLP/CV/RAG | A1-NL |
| DT | Data & Analytics | BI | Business Intelligence | DT-BI |
| DT | Data & Analytics | ET | ETL Pipelines | DT-ET |
| DT | Data & Analytics | DW | Data Warehouse | DT-DW |
| DT | Data & Analytics | RP | Reporting | DT-RP |
| DC | DevOps & Cloud | CD | CI/CD | DC-CD |
| DC | DevOps & Cloud | MG | Cloud Migration | DC-MG |
| DC | DevOps & Cloud | IA | IaC | DC-IA |
| DC | DevOps & Cloud | MN | Monitoring | DC-MN |
| SC | Security & Compliance | AU | Authentication/Identity | SC-AU |
| SC | Security & Compliance | KM | Encryption/KMS | SC-KM |
| SC | Security & Compliance | PT | Pen Testing | SC-PT |
| SC | Security & Compliance | CM | Compliance | SC-CM |
| I1 | Embedded/IoT | FW | Firmware | I1-FW |
| I1 | Embedded/IoT | SY | Sync | I1-SY |
| I1 | Embedded/IoT | SN | Sensors | I1-SN |
| I1 | Embedded/IoT | RT | RTOS | I1-RT |
| GM | Games & Interactive | 2D | 2D Games | GM-2D |
| GM | Games & Interactive | 3D | 3D Games | GM-3D |
| GM | Games & Interactive | SM | Simulation | GM-SM |
| GM | Games & Interactive | VR | VR/AR | GM-VR |
| BC | Blockchain/Web3 | SC | Smart Contracts | BC-SC |
| BC | Blockchain/Web3 | NF | NFT | BC-NF |
| BC | Blockchain/Web3 | WL | Wallet | BC-WL |
| BC | Blockchain/Web3 | DF | DeFi | BC-DF |
| RP | Automation/RPA | BT | Bots | RP-BT |
| RP | Automation/RPA | WF | RPA Workflow | RP-WF |
| RP | Automation/RPA | NC | No-code Automation | RP-NC |
| IN | System Integrations | ER | ERP/CRM Integration | IN-ER |
| IN | System Integrations | PM | Payment Integration | IN-PM |
| IN | System Integrations | BR | API Bridge | IN-BR |
| IN | System Integrations | LG | Legacy Integration | IN-LG |
| MN | Maintenance/Support | BG | Bug Fixing | MN-BG |
| MN | Maintenance/Support | UP | Updates | MN-UP |
| MN | Maintenance/Support | OP | Optimization | MN-OP |
| MN | Maintenance/Support | TN | Configuration | MN-TN |
| CM | Communication | CH | Chat/Messaging | CM-CH |
| CM | Communication | EM | Email Systems | CM-EM |
| CM | Communication | VC | Video Conferencing | CM-VC |
| CM | Communication | CL | Collaboration | CM-CL |
| QA | Testing/QA | AT | Automated Testing | QA-AT |
| QA | Testing/QA | PT | Performance Testing | QA-PT |
| QA | Testing/QA | MT | Manual Testing | QA-MT |
| QA | Testing/QA | MN | Monitoring | QA-MN |

**Governance Classification (cross-domain overlay):**

| Classification | Applies To | Artifact Naming | Example |
|----------------|------------|-----------------|---------|
| **One-off project** | Any PARENT-SUB | Standard: `<PARENT>-<SUB>_<Name>_v...` | `WA-SS_ClientPortal_v1.0.0_20260101_PRD.zip` |
| **Product / Platform** | Any PARENT-SUB | Standard: `<PARENT>-<SUB>_<Name>_v...` | `WA-SS_MyWebsite_v2.1.0_20260115_PRD.zip` |
| **Reusable Standard Module (RSM)** | Any PARENT-SUB | Standard: `<PARENT>-<SUB>_<Name>_v...` | `SC-AU_IdentityModule_v1.0.0_20260110_PRD.zip` |

> ℹ️ **Note:** RSM, One-off, and Product/Platform are governance attributes — not domain codes. They classify how a deliverable is funded, versioned, and reused. All three use the same PARENT-SUB domain codes from the table above. See §4.1.0 for full definitions.

---

#### 6.1.0 Top-level Project Classification (Governance)

All deliverables are classified first by **Top-level Project Classification** (governance), then by Domain (PARENT–SUB) per §4.1.1. This governance layer distinguishes how work is funded, versioned, and reused.

| Classification                           | Purpose                                                                        | Key distinction                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **One-off project**                | Single delivery for a client or internal need.                                 | ❌ Not versioned for reuse; ❌ Not a product/platform; ✅ Scoped to one engagement or release. |
| **Product / Platform**             | Customer-facing product or internal platform.                                  | ❌ Not a one-off project; ❌ Not a reusable module; ✅ Own roadmap, lifecycle, and delivery.   |
| **Reusable Standard Module (RSM)** | Versioned, governed, standalone module reused across multiple future projects. | ❌ Not a one-off project; ❌ Not a product/platform; ✅ A certified building block.            |

**Reusable Standard Module (RSM) — Definition**

**Purpose:** A Reusable Standard Module is a versioned, governed, standalone module designed to be reused across multiple future projects. It is a *productized internal asset* that sits between projects and platforms.

**Key distinction:**
- ❌ Not a one-off project
- ❌ Not a product/platform
- ✅ A certified building block

> ℹ️ **Note:** RSMs use the same Domain (PARENT–SUB) codes as other deliverables (e.g., WA-SS, SC-AU) for artifact naming; the RSM classification is a governance attribute applied to the module (versioning, certification, reuse policy), not a substitute for domain coding.

---

#### 6.1.1 Project Classification Criteria

##### 6.1.1.1 WA — Web Applications

Web-based systems accessed through browsers, requiring frontend + backend architecture.

| Subtype | Requirements |
|---------|--------------|
| **WA-SS** (SaaS) | • Multi-user authentication<br>• Subscription or tiered access<br>• Cloud-hosted backend<br>• Multi-tenant capable architecture<br>• Continuous delivery of features |
| **WA-PO** (Portals) | • User-specific views and dashboards<br>• Role-based content access<br>• Aggregated data from multiple sources<br>• Personalized user experience |
| **WA-EC** (E-Commerce) | • Product catalog management<br>• Shopping cart and checkout workflow<br>• Payment gateway integration<br>• Order and inventory management |
| **WA-CM** (Content Management) | • Content creation and editing interface<br>• Version control and publishing workflow<br>• Media library management<br>• Multi-channel content delivery |

##### 6.1.1.2 MA — Mobile Applications

Apps built for mobile devices (iOS/Android), native or cross-platform.

| Subtype | Requirements |
|---------|--------------|
| **MA-IO** (iOS native) | • Native iOS SDK and frameworks<br>• App Store distribution<br>• iOS platform-specific features and UX patterns |
| **MA-AD** (Android native) | • Native Android SDK and frameworks<br>• Google Play distribution<br>• Android platform-specific features and UX patterns |
| **MA-XP** (Cross-Platform) | • Unified codebase for iOS and Android<br>• Cross-platform framework (e.g., Flutter, React Native, Xamarin)<br>• Platform-specific adaptations where needed |
| **MA-PW** (PWA) | • Installable web application<br>• Offline functionality via service workers<br>• Native-like user experience<br>• Progressive enhancement strategy |

##### 6.1.1.3 DA — Desktop Applications

Installable applications for macOS, Windows, or Linux.

| Subtype | Platform | Requirements |
|---------|----------|--------------|
| **DA-MC** | macOS | • Native macOS frameworks and APIs<br>• Mac App Store or direct distribution<br>• macOS-specific UX conventions and integrations |
| **DA-WN** | Windows | • Native Windows frameworks and APIs<br>• Windows installer package (.exe/.msi)<br>• Windows-specific UX conventions and integrations |
| **DA-LX** | Linux | • Linux-native packaging (deb, rpm, AppImage, Flatpak)<br>• Desktop environment integration<br>• Linux distribution compatibility |
| **DA-XP** | Cross-Platform | • Single codebase for multiple desktop platforms<br>• Cross-platform framework (e.g., Electron, Tauri, Qt)<br>• Platform-specific adaptations where needed |

##### 6.1.1.4 CS — Custom Software

Bespoke internal tools or systems built specifically for a business workflow.

| Subtype | Requirements |
|---------|--------------|
| **CS-WF** (Custom Workflow) | • Business-specific process automation<br>• Custom business rules and logic<br>• Workflow state management<br>• Integration with existing business systems |
| **CS-ER** (ERP/CRM Systems) | • Enterprise resource planning or customer relationship management<br>• Multi-module business operations (finance, inventory, sales, etc.)<br>• Centralized business data management |
| **CS-IT** (Internal Tools) | • Organization-specific functionality<br>• Internal user base only<br>• Specialized operational requirements |
| **CS-ST** (Software Suites) | • Multiple integrated applications or modules<br>• Unified authentication and user management<br>• Consistent UI/UX across modules<br>• Shared data model |

##### 6.1.1.5 AP — API & Backend Services

Backend systems exposing programmatic interfaces or providing server-side functionality.

| Subtype | Requirements |
|---------|--------------|
| **AP-RS** (REST API) | • RESTful endpoint architecture<br>• Resource-based URL structure<br>• Standard HTTP methods and status codes<br>• Stateless request handling |
| **AP-GQ** (GraphQL) | • GraphQL schema definition<br>• Query and mutation operations<br>• Resolver implementation<br>• Type-safe API contracts |
| **AP-MS** (Microservices) | • Independently deployable services<br>• Service-to-service communication<br>• Distributed architecture<br>• Domain-driven service boundaries |
| **AP-RT** (Real-Time API) | • Persistent connection support (WebSockets, SSE, etc.)<br>• Live data streaming<br>• Push-based updates<br>• Low-latency communication |
| **AP-BE** (Backend Services) | • Server-side business logic<br>• Background processing<br>• Scheduled jobs and workers<br>• Non-API backend functionality |

##### 6.1.1.6 A1 — AI & Machine Learning

Systems using ML models, RAG, NLP, vision, or inference.

| Subtype | Requirements |
|---------|--------------|
| **A1-AS** (AI Assistants) | • Conversational interface<br>• LLM or NLP engine<br>• Action execution or reasoning |
| **A1-PD** (Predictive) | • Forecasting models<br>• Historical dataset training |
| **A1-RC** (Recommender) | • Personalized suggestions<br>• Behavioral or content-based models |
| **A1-NL** (NLP/CV/RAG) | • Natural language, vision, or retrieval-augmented tasks<br>• Embeddings or vector search |

##### 6.1.1.7 DT — Data & Analytics

Data-heavy or analytics-centric systems.

| Subtype | Requirements |
|---------|--------------|
| **DT-BI** (Business Intelligence) | • Strategic analytics and insights<br>• Multi-dimensional data analysis<br>• Executive dashboards and KPI visualization<br>• Historical trend analysis and forecasting |
| **DT-ET** (ETL Pipelines) | • Data extraction from multiple sources<br>• Data transformation and cleansing logic<br>• Data loading to target systems<br>• Batch or streaming data processing |
| **DT-DW** (Data Warehouse) | • Centralized enterprise data repository<br>• OLAP and analytical query optimization<br>• Historical data storage and archival<br>• Data mart and cube structures |
| **DT-RP** (Reporting) | • Operational report generation<br>• Scheduled and on-demand reporting<br>• Report distribution and delivery<br>• Standard metric calculations |

##### 6.1.1.8 DC — DevOps & Cloud

Infrastructure, automation, and cloud platform engineering.

| Subtype | Requirements |
|---------|--------------|
| **DC-CD** (CI/CD) | • Automated builds<br>• Automated tests<br>• Deployment pipelines |
| **DC-MG** (Cloud Migration) | • Movement of workloads<br>• Replatforming or containerization |
| **DC-IA** (IaC) | • Terraform/Pulumi/CloudFormation<br>• Version-controlled infrastructure |
| **DC-MN** (Monitoring) | • Logging + alerting<br>• Observability tooling |

##### 6.1.1.9 SC — Security & Compliance

Security-focused systems or enhancements.

| Subtype | Requirements |
|---------|--------------|
| **SC-AU** (Authentication/Identity) | • User identity management<br>• SSO/OAuth2/JWT |
| **SC-KM** (Encryption/KMS) | • Key storage<br>• Encryption strategy |
| **SC-PT** (Pen Testing) | • Vulnerability scanning<br>• Threat reports |
| **SC-CM** (Compliance) | • Auditing<br>• Regulatory alignment |

##### 6.1.1.10 I1 — Embedded / IoT

Hardware-connected or low-level software.

| Subtype | Requirements |
|---------|--------------|
| **I1-FW** (Firmware) | • Hardware-level logic<br>• Microcontroller code |
| **I1-SY** (Sync) | • Cloud-hardware data sync<br>• Device provisioning |
| **I1-SN** (Sensors) | • Sensor data handling<br>• Real-time readings |
| **I1-RT** (RTOS) | • Real-time operating constraints |

##### 6.1.1.11 GM — Games & Interactive

Graphical or interactive entertainment systems.

| Subtype | Requirements |
|---------|--------------|
| **GM-2D** (2D Games) | • 2D rendering and graphics pipeline<br>• Sprite-based or vector graphics<br>• 2D physics and collision detection |
| **GM-3D** (3D Games) | • 3D rendering and graphics pipeline<br>• 3D models, textures, lighting, and shaders<br>• 3D physics and spatial audio |
| **GM-SM** (Simulation) | • Real-world or abstract system modeling<br>• Simulation logic and state management<br>• Configurable simulation parameters |
| **GM-VR** (VR/AR) | • Virtual or augmented reality device support<br>• Immersive 3D environments<br>• Motion tracking and spatial interaction |

##### 6.1.1.12 BC — Blockchain/Web3

Distributed-ledger or decentralized systems.

| Subtype | Requirements |
|---------|--------------|
| **BC-SC** (Smart Contracts) | • On-chain executable logic<br>• Smart contract development and deployment<br>• Contract interaction interfaces |
| **BC-NF** (NFT) | • Non-fungible token minting and management<br>• Token metadata storage and retrieval<br>• Marketplace or trading functionality |
| **BC-WL** (Wallet) | • Cryptographic key management<br>• Transaction signing and broadcasting<br>• Multi-chain or multi-asset support |
| **BC-DF** (DeFi) | • Decentralized finance protocols<br>• Liquidity pools or yield mechanisms<br>• On-chain financial operations |

##### 6.1.1.13 RP — Automation / RPA

Automated workflows or software robots.

| Subtype | Requirements |
|---------|--------------|
| **RP-BT** (Bots) | • Automated agent execution<br>• Task automation logic<br>• Scripted or AI-driven control |
| **RP-WF** (RPA Workflow) | • Robotic process automation platform<br>• Trigger-based action sequences<br>• Multi-step flow orchestration<br>• UI automation and screen scraping |
| **RP-NC** (No-code Automation) | • Visual workflow builder<br>• Drag-and-drop logic composition<br>• No-code or low-code interface<br>• Pre-built automation templates |

##### 6.1.1.14 IN — System Integrations

Bridging systems or connecting services.

| Subtype | Requirements |
|---------|--------------|
| **IN-ER** (ERP/CRM Integration) | • Enterprise system integration<br>• Bidirectional data synchronization<br>• Business process alignment |
| **IN-PM** (Payment Integration) | • Payment gateway integration<br>• Secure transaction processing<br>• Payment reconciliation<br>• Multi-currency support |
| **IN-BR** (API Bridge) | • System-to-system middleware<br>• Data format transformation<br>• Protocol translation<br>• Message routing and orchestration |
| **IN-LG** (Legacy Integration) | • Legacy system connectivity<br>• Modernization bridge<br>• Data migration support<br>• Backward compatibility layer |

##### 6.1.1.15 MN — Maintenance / Support

Ongoing maintenance and support activities for existing systems.

| Subtype | Requirements |
|---------|--------------|
| **MN-BG** (Bug Fixing) | • Defect identification and resolution<br>• Patch releases and hotfixes<br>• Regression testing<br>• Root cause analysis |
| **MN-UP** (Updates) | • Feature enhancements and additions<br>• Minor version releases<br>• Dependency updates<br>• Security patches |
| **MN-OP** (Optimization) | • Performance improvements<br>• Resource utilization optimization<br>• Code refactoring<br>• Query and algorithm optimization |
| **MN-TN** (Configuration) | • System configuration adjustments<br>• Parameter tuning<br>• Environment-specific settings<br>• Infrastructure optimization |

##### 6.1.1.16 CM — Communication Systems

Messaging, collaboration, and communication platforms.

| Subtype | Requirements |
|---------|--------------|
| **CM-CH** (Chat/Messaging) | • Real-time messaging<br>• User presence and status<br>• Message history and search<br>• Group conversations |
| **CM-EM** (Email Systems) | • Email composition and delivery<br>• Inbox management<br>• Email threading and organization<br>• Attachment handling |
| **CM-VC** (Video Conferencing) | • Real-time video and audio streaming<br>• Multi-participant support<br>• Screen sharing<br>• Recording capabilities |
| **CM-CL** (Collaboration) | • Real-time collaborative editing<br>• Shared workspaces<br>• Activity feeds and notifications<br>• Team coordination tools |

##### 6.1.1.17 QA — Testing & Quality Assurance

Testing frameworks, tools, and quality assurance systems.

| Subtype | Requirements |
|---------|--------------|
| **QA-AT** (Automated Testing) | • Test automation framework<br>• Test case management<br>• Continuous integration support<br>• Test result reporting |
| **QA-PT** (Performance Testing) | • Load and stress testing<br>• Performance metrics collection<br>• Bottleneck identification<br>• Scalability testing |
| **QA-MT** (Manual Testing) | • Test case documentation<br>• Bug tracking and reporting<br>• Test execution tracking<br>• Defect lifecycle management |
| **QA-MN** (Monitoring) | • Application health monitoring<br>• Error tracking and alerting<br>• User experience monitoring<br>• Service level monitoring |

---

### 6.2 Public Entity Codes (CC-PID v1)

Below are the 3-letter codes used in the CYBERCUBE Public Entity ID scheme.

| Code | Entity Name | Code | Entity Name |
|------|-------------|------|-------------|
| **CLT** | Client | **TSK** | Task |
| **ACC** | Organization / Account | **COM** | Comment |
| **USR** | User | **ATT** | Attachment |
| **CON** | Contact | **TAG** | Tag |
| **ADR** | Address | **SPR** | Sprint / Iteration |
| **TKT** | Support Ticket | **MLN** | Milestone |
| **NTF** | Notification | **BEN** | Benchmark |
| **PRJ** | Project | **PHZ** | Phase |
| **BRD** | Board | **INV** | Invoice |
| **COL** | Column | **PAY** | Payment |
| **CRD** | Card | **SUB** | Subscription |
| **PLN** | Plan | **API** | API Key record |
| **QTE** | Quote | **AUD** | Audit Event |
| **EST** | Estimate | **LOG** | Log Entry |
| **TXN** | Transaction | **JOB** | Background Job |
| **PRC** | Price / Rate | **WEB** | Webhook |
| **DSC** | Discount / Coupon | **INT** | Integration |
| **DOC** | Document | **ENV** | Environment |
| **PGS** | Page | **RLE** | Role |
| **FLE** | File | **PRM** | Permission |
| **FDR** | Folder | **POL** | Policy |
| **TMP** | Template | **SES** | Session |
| **FRM** | Form | **TOK** | Token (non-secret reference) |
| **SIG** | Signature Request | **DLV** | Deliverable |
| **MSG** | Message | **TEN** | Time Entry |
| **ACT** | Activity | **TMB** | Team Member |

#### 6.2.1 Entities Classification Reasoning

These 3-letter codes prefix all user-facing Public IDs. They identify the type of database entity. Each code should be used when generating or referencing an ID for that entity type.

**Customer & Organization:**
- **CLT** — Client: identifies a client record in the customer management system
- **ACC** — Organization/Account: represents an organizational tenant or account
- **USR** — User: used for individual user accounts
- **CON** — Contact: denotes a contact person tied to a client or organization
- **ADR** — Address: represents a physical or mailing address entity

**Support & Communication:**
- **TKT** — Support Ticket: used for customer support tickets
- **NTF** — Notification: used for notification records (e.g., push or email notifications)
- **MSG** — Message: used for direct messages or conversation records
- **COM** — Comment: used for comments attached to tasks, cards, or tickets

**Project Management:**
- **PRJ** — Project: identifies a project in the project management system
- **BRD** — Board: denotes a board (e.g., Kanban or Scrum board)
- **COL** — Column: represents a column within a board
- **CRD** — Card: used for cards or tasks in a board
- **TSK** — Task: identifies a task item
- **SPR** — Sprint/Iteration: used for a sprint or iteration
- **MLN** — Milestone: identifies milestones in project timelines
- **BEN** — Benchmark: used for benchmark records or performance tests
- **PHZ** — Phase: identifies a phase in a larger program or project
- **DLV** — Deliverable: identifies a project deliverable or work product
- **ACT** — Activity: used for activity log records or tracked actions
- **TMB** — Team Member: identifies a team member assignment within a project or organization

**Billing & Finance:**
- **INV** — Invoice: used for invoices in billing modules
- **PAY** — Payment: used for payment transactions
- **SUB** — Subscription: identifies subscription records (recurring billing)
- **PLN** — Plan: denotes a pricing or service plan
- **QTE** — Quote: used for formal quotes provided to clients
- **EST** — Estimate: for cost or time estimates
- **TXN** — Transaction: used for transactional records in finance modules
- **PRC** — Price/Rate: represents pricing tiers or rates
- **DSC** — Discount/Coupon: used for discount codes or coupons

**Content & Documents:**
- **DOC** — Document: generic document entity
- **PGS** — Page: denotes a page (e.g., wiki page, CMS page)
- **FLE** — File: generic file stored in the system
- **FDR** — Folder: used for folders or directories in file management modules
- **TMP** — Template: identifies templates (e.g., email or document templates)
- **FRM** — Form: used for forms in form builders or workflows
- **SIG** — Signature Request: denotes a digital signature request
- **ATT** — Attachment: identifies uploaded attachments or files
- **TAG** — Tag: used for tags or labels applied to entities

**System & Integration:**
- **SES** — Session: used for user sessions or login sessions
- **TOK** — Token: records non-secret reference tokens (not auth tokens)
- **API** — API Key Record: identifies an API key record (not the secret itself)
- **AUD** — Audit Event: used for audit log events
- **LOG** — Log Entry: denotes log entries or system logs
- **JOB** — Background Job: identifies asynchronous jobs or tasks
- **WEB** — Webhook: used for webhook records
- **INT** — Integration: denotes integrations with external services
- **ENV** — Environment: identifies environments (e.g., dev, staging, prod) in system config
- **TEN** — Time Entry: used for time tracking records tied to tasks or projects

**Access Control:**
- **RLE** — Role: used for role definitions in role-based access control
- **PRM** — Permission: identifies permissions or entitlements
- **POL** — Policy: denotes policies (e.g., access policies, security policies)

---

## 7. Ticket vs Issue (WOE) Separation

### 7.1 Customer Tickets (Entity)

Customer-facing support items are entities.

**Properties:**
- ✅ Identifier: `TKT-*` (CC-PID)
- ✅ Stored in database
- ✅ Shown to customers
- ✅ Used in URLs, emails, invoices, exports, and webhooks

### 7.2 Internal Issues / Work-Oriented Entries (WOE)

Engineering work items are artifacts.

**Properties:**
- ✅ Identifier: WOE artifact key (e.g., `CS-ER-1427`)
- ✅ Lives in Jira / GitHub / Linear
- ❌ Never exposed externally

### 7.3 Linking Rule (Mandatory)

If a customer ticket requires internal work:

**Rules:**
- ✅ The Ticket entity stores one or more WOE references
- ✅ Internal issues may reference the Ticket CC-PID

#### 7.3.1 Recommended Schema

```sql
external_key_source  -- JIRA | GITHUB | LINEAR | CYBERCUBE
external_key

-- Uniqueness constraint:
UNIQUE(external_key_source, external_key)
```

---

## 8. Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-12 | Initial release: artifact naming conventions, CC-PID format, entity code registry |
| v1.1 | 2026-01 | Added mandatory SHA-256 check digit algorithm, cross-language reference implementations (7 languages), SDK contract with standard error codes, batch generation guidance, global uniqueness model and decision matrix, collision handling requirements, rate limiting guidance, Support SOP |
| v1.2 | 2026-02 | Added Namespace G (Governance Registry Identifiers: PRD-XXX, MOD-XXX). Added Namespace M (Module, Component & File Naming): absorbed Module ID Standard v1, module identification (MOD-XXX), module slugs, Module Records, component type-suffix convention (architectural + UI), hybrid file naming rule, canonical directory structure, module boundary rules, anti-patterns. Renumbered sections 3–6 to 5–8. Updated glossary, cheat sheet, and related documents. |

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

## Appendix A: Support SOP — Reading and Collecting Public Entity IDs (CC-PID)

### A.1 What to request from the customer

- Ask for the full CC-PID exactly as shown (format: ENTITY-TOKEN-CHK).
- If they can copy/paste, prefer copy/paste over typing.
- If they only have a screenshot, ask them to zoom in and read it slowly.

### A.2 Confirm format verbally

- Confirm the 3-letter entity code first (e.g., "PRJ", "TKT", "INV").
- Then confirm the token in groups of 2–3 characters.
- Then confirm the final check digit (CHK) as the last character.

### A.3 Phonetic reading (letters)

Use NATO phonetics for letters:

A=Alpha, B=Bravo, C=Charlie, D=Delta, E=Echo, F=Foxtrot, G=Golf, H=Hotel,

I=India, J=Juliett, K=Kilo, L=Lima, M=Mike, N=November, O=Oscar, P=Papa,

Q=Quebec, R=Romeo, S=Sierra, T=Tango, U=Uniform, V=Victor, W=Whiskey,

X=X-ray, Y=Yankee, Z=Zulu.

Digits are spoken as numbers (“two” through “nine”).

Note: Token alphabet excludes I and O to reduce confusion.

### A.4 How to handle common confusion

- If the customer says “I” or “O”, ask them to re-check: those letters are not valid in CC-PID
  tokens.
- If they say “one” or “zero”, ask them to re-check: 1 and 0 are not valid in CC-PID tokens.
- If a customer reads a lowercase ID, accept it and normalize to uppercase internally.

### A.5 Verification checks (support-side)

- Confirm there are no spaces before/after the ID.
- If the system reports “invalid checksum,” ask the customer to re-read ONLY the last character
  (CHK) and then the last 2–3 token characters.

### A.6 If the customer cannot provide full ID

- Ask for entity code + first 3 token characters (prefix).
- Use prefix search only (example: “PRJ-X2M…”).
- Never accept substring fragments from the middle of the token.

### A.7 Security reminder (non-negotiable)

- CC-PIDs are public labels and are NOT proof of identity.
- Never authenticate or authorize based on possession of a CC-PID.
- Always verify the customer using standard authentication and account verification steps.

---

## Implementation Status

**Last Updated:** 2026-02-10

### Namespace G & M (v1.2 Additions)

| Component | Status |
|-----------|--------|
| Namespace G standard (Section 3) | COMPLETE |
| Namespace M standard (Section 4) | COMPLETE |
| Module Registry population | PENDING |
| Component type vocabulary enforcement (lint rule) | PENDING |
| Directory structure validation (CI check) | PENDING |
| Module boundary enforcement (import lint) | PENDING |

### Core Implementation (CC-PID)

| Component             | Status   | File                                                      |
| --------------------- | -------- | --------------------------------------------------------- |
| PublicIdService       | COMPLETE | `api/shared/public-id-service.ts`                       |
| Entity Codes Registry | COMPLETE | `api/shared/entity-codes.ts`                            |
| Database Migration    | COMPLETE | `api/migrations/029_add_public_id_columns.sql`          |
| Unit Tests            | COMPLETE | `api/tests/shared/public-id-service.test.ts` (54 tests) |
| Backfill Script       | COMPLETE | `api/scripts/backfill-public-ids.ts`                    |
| Middleware Helper     | COMPLETE | `api/middleware/validators/public-id.validators.ts`     |
| Quick Reference       | COMPLETE | `docs/guides/CC_PID_QUICK_REFERENCE.md`                 |

### Entity Support

| Entity       | Code | Repository                   | Routes              | Status          |
| ------------ | ---- | ---------------------------- | ------------------- | --------------- |
| Project      | PRJ  | `ProjectRepository.ts`     | `projects.ts`     | COMPLETE        |
| Task         | TSK  | `TaskRepository.ts`        | `tasks.ts`        | COMPLETE        |
| Milestone    | MLN  | `MilestoneRepository.ts`   | `tasks.ts`        | COMPLETE        |
| Invoice      | INV  | `InvoiceRepository.ts`     | `billing.ts`      | COMPLETE        |
| Deliverable  | DLV  | `DeliverableRepository.ts` | `deliverables.ts` | COMPLETE        |
| User         | USR  | -                            | -                   | MIGRATION READY |
| Message      | MSG  | -                            | -                   | MIGRATION READY |
| Time Entry   | TEN  | -                            | -                   | MIGRATION READY |
| Audit Log    | AUD  | -                            | -                   | MIGRATION READY |
| Activity     | ACT  | -                            | -                   | MIGRATION READY |
| Session      | SES  | -                            | -                   | MIGRATION READY |
| Role         | RLE  | -                            | -                   | MIGRATION READY |
| Permission   | PRM  | -                            | -                   | MIGRATION READY |
| Notification | NTF  | -                            | -                   | MIGRATION READY |
| Team Member  | TMB  | -                            | -                   | MIGRATION READY |

### Deployment Steps

```bash
# 1. Run database migration
npm run migrate

# 2. Backfill existing records with CC-PIDs
npx tsx api/scripts/backfill-public-ids.ts
```

### API Compatibility

All endpoints accepting entity IDs now support both formats:

- Numeric IDs: `/api/v1/projects/123`
- CC-PIDs: `/api/v1/projects/PRJ-X2M8KD-F`

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Product Registry & Classification Standard (PRCS 1.5) | PRD-XXX governance IDs (Namespace G); PCL classification; product-module relationship |
| Architecture Governance Policy (1.4) | Module registration triggers architecture review; ADR future-reserved prefix |
| API Design Standard (5.2) | CC-PID usage in REST endpoints, URL patterns |
| Data Classification & Retention Standard (3.3) | Classification levels for entity data referenced by CC-PIDs |
| Soft-Delete Lifecycle Standard (3.5) | Deprecation and 410 Gone semantics for retired CC-PIDs |
| Webhooks & Integrations Standard (5.3) | CC-PID format in webhook payloads and integration events |
| Testing & Quality Standard (5.5) | Test vector validation, reference implementation testing; test file naming conventions (§4.5.4) |
| Module ID Standard (v1) | **SUPERSEDED** — fully absorbed into this standard, Section 4 (Namespace M) |
