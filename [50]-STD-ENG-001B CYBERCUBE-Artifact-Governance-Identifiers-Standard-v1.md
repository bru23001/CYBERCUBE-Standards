# CYBERCUBE Artifact & Governance Identifiers Standard (v1.0)

**Standard ID:** STD-ENG-001B  
**Status:** Active  
**Effective:** 2026-04-22  
**Classification:** INTERNAL  
**Owner:** Engineering Lead  
**Review Cycle:** Annual + on major version change  
**Parent (umbrella):** [29] STD-ENG-001 (Naming & Identifier Standard, v2.0)  
**Created by:** RFC-0001 — Split STD-ENG-001 (executed 2026-04-22)

> This sub-standard owns **Namespace A — Artifact Naming** and **Namespace G — Governance Registry Identifiers (PRD/MOD/future ADR/STD)**, plus the Ticket-vs-Issue (WOE) separation rules. Shared glossary lives in [29] STD-ENG-001. Section numbering below is preserved from the v1.2 umbrella for cross-reference continuity.

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects producing artifacts, standards, policies, or governance assets | **T1 MUST** | (1) All standards, policies, and governance artifacts MUST follow the Namespace-A and Namespace-G naming conventions defined here (filenames, IDs, and identifiers). | None (non-waivable — coordination standard) |
| SaaS / customer-facing | **T2 SHOULD** | Automated lint for artifact filenames, WOE tracker key validation, governance-ID registry hook, developer quick-reference card. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Centralized artifact registry with version audit trail, immutability enforcement on published governance records, pre-commit hooks blocking non-conformant names. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8. Rule numbered (1) maps to the umbrella's full T1 set (rules 1–5); see [29] STD-ENG-001 for the aggregate Tier Table.

## Scope

This standard covers:
- §1 Namespace A — Artifact Naming (files, repos, branches, CI/CD, WOE tracker keys)
- §3 Namespace G — Governance Registry Identifiers (PRD-XXX, MOD-XXX, reserved ADR/STD)
- §7 Ticket-vs-Issue (WOE) Separation

For public entity IDs (CC-PID) and module/component/file naming, see sibling sub-standards [49] STD-ENG-001A and [51] STD-ENG-001C.

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

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-22 | Migrated from [29] STD-ENG-001 v1.3 per RFC-0001. Carves §1 (Namespace A), §3 (Namespace G), §7 (Ticket vs WOE). Content byte-preserved from v1.3; section numbers retained for cross-reference continuity. |

---

## Implementation Status

**Last Updated:** 2026-04-22

| Component | Status |
|-----------|--------|
| Namespace A artifact-naming convention in use across repos | COMPLETE |
| Namespace G governance registry (PRD-XXX, MOD-XXX) | IN PLACE |
| Automated lint for artifact filenames | ROADMAP |
| WOE tracker-key validation hook | ROADMAP |
| Ticket↔WOE linking schema deployed | PARTIAL |
| Governance-ID registry UI / self-service | ROADMAP |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [29] STD-ENG-001 (umbrella v2.0) | Shared glossary, cross-namespace rules, aggregated Tier Table |
| [49] STD-ENG-001A Public Entity IDs (CC-PID) | Namespace B — sibling sub-standard |
| [51] STD-ENG-001C Module/Component/File Naming | Namespace M — sibling sub-standard |
| [30] STD-ENG-007 Documentation & RFC | ADR/RFC identifier governance (Namespace G future-reserved prefixes) |
| [33] STD-ENG-008 Reusable Modules | MOD-XXX governance binding |
| [2] POL-GOV-001 Standards Governance | Artifact versioning and governance-record lifecycle |
| [3] POL-GOV-002 Architecture Governance | ADR lifecycle; Namespace G ADR prefix reserved |
