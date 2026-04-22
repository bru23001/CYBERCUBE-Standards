# CYBERCUBE Product Registry & Classification Standard (v1.1)

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects | **T1 MUST** | (1) Every CYBERCUBE product MUST be registered with a PCL (Layer.Delivery.Extensibility.Criticality) code before first production deployment. (2) The PCL MUST be reviewed and updated on any architectural change that affects a facet. (3) Criticality tier (`C`) MUST be used to drive Applicability Tier selection in downstream standards (C1 → T3; C2/C3 → T2; internal/POC → T1 only). | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Automated registry sync from source repositories, public-or-internal product list maintained by the Standards Council, CMDB integration, quarterly PCL recertification. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Regulator-facing product inventory and classification attestation, external validation of PCL assignments, linkage to authoritative asset management systems. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8. **Note:** This standard is load-bearing for the whole tiering model (POL-GOV-001 §8.7.2 inherits tier from PCL criticality).

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Product Registry
& Classification Standard.

All definitions are normative unless stated otherwise.

### C

**Classification Code (PCL)**

A numeric encoding of a product's architectural facets.

Format: `PCL-L.D.E.C` (Layer.Delivery.Extensibility.Criticality)

Rule: Numbers encode, never define. Semantic facet names are authoritative.

**Composite (Predefined)**

A single numeric code representing a known combination of facet values.

Example: Extensibility `3` = API + Webhooks

Rule: Only listed composites are valid. Unlisted → code `9`.

**Controlled Vocabulary**

A curated, versioned list of allowed values.

Applies to: Domain tags, facet values

### D

**Domain Tag**

A label describing the functional area a product serves.

Source: Controlled vocabulary (Section 4)

Rule: Multi-value. Products MAY have multiple domain tags.

### E

**Encoding (Numeric Facet)**

The numeric representation of a facet value for machine processing.

Principle: Derived artifact. Never reassigned. Never the source of truth.

### F

**Facet**

An independent dimension used to classify a product's architectural
characteristics.

CYBERCUBE facets: Layer, Delivery, Extensibility, Criticality

**Function Descriptor**

A free-form label describing specific product capabilities.

Examples: Task tracking, Workflow automation, Kanban boards

Rule: Searchable, not governed. No controlled vocabulary required.

### L

**Layer**

Facet describing where a product sits in the technology stack.

Values: Application, Platform, Infrastructure, Data, Embedded

### P

**Product**

A distinct, long-lived software system with its own identity, architecture,
and lifecycle.

Distinction: A product is NOT a project. Products are strategic and stable;
projects are tactical and volatile.

**Product Record (PRD)**

The authoritative registration of a product in the CYBERCUBE catalog.

Format: `PRD-XXX` (sequential, never reused)

Contents: Identity, classification, domain, function, status, history

**PRCS (Product Registry & Classification System)**

The overall system defined by this standard for registering and classifying
software products.

Components: Faceted classification (PCL), domain tags, function descriptors,
product records (PRD)

### P (continued)

**Primary Tag**

The dominant work type tag for a project or sprint.

Rule: Exactly one per project. Describes the core deliverable.

### S

**Secondary Tag**

Additional work type tags describing supplementary domains a project touches.

Rule: Zero or more per project.

**SP-NFS (Semantic-Primary Numeric-Facet System)**

The encoding methodology where semantic facet names are authoritative and
numeric codes are derived representations.

Principle: Semantics define, numbers encode.

### W

**Work Type Tag**

A two-part code classifying the kind of work being done on a project or sprint.

Format: `{Parent}-{Subtype}` (e.g., `WA-SS`, `DC-CD`, `MN-BG`)

Scope: Tactical, short-lived. See Section 8.

---

# CYBERCUBE Product Registry & Classification Standard (v1)

**Standard ID:** STD-GOV-001
**Status:** Active
**Effective:** 2026-02-07
**Owner:** CTO / Architecture Lead
**Applies to:** All CYBERCUBE software products

---

## 0. Purpose & Design Principles

This standard establishes a single, auditable source of truth for CYBERCUBE
software products. It defines how products are registered, classified by
architectural facets, and tagged by functional domain.

This standard covers **both** product-level classification (strategic) and
project-level work tagging (tactical) in a single unified system.

**Industry alignment:**

- TOGAF Architecture Classification
- ISO/IEC 12207 Software Lifecycle
- NIST Software Asset Management

**Core principles:**

1. **Products are classified** (strategic, stable) — **Work is tagged** (tactical, volatile)
2. **Semantics are authoritative** — Facet names define meaning, not numbers
3. **Numbers encode, never define** — Numeric codes are derived artifacts for machines
4. **Product identity ≠ project activity** — A product lives across many projects
5. **Readability > mathematical purity** — Predefined composites over bitmasks
6. **Controlled evolution** — Facet schemas are finite, versioned, and immutable once assigned

**This standard does NOT define:**

- Team ownership or staffing models
- Roadmaps or execution tracking
- Customer-facing product naming
- Project management methodology (Agile, Waterfall, etc.)

---

## 1. System Architecture

### 1.1 Two-Layer Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLASSIFICATION SYSTEM LAYERS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LAYER 1 — PRODUCT LEVEL (This Standard)                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Faceted classification (PCL) + Domain tags + Function descriptors    │  │
│  │ Long-lived, architecture-driving                                     │  │
│  │ Drives: Compliance, security posture, risk, architecture decisions  │  │
│  │ Stored as: Product Records (PRD-XXX)                                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              │ Products contain projects                    │
│                              ▼                                              │
│  LAYER 2 — PROJECT LEVEL (Section 8)                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Work type tags (WA-SS, AP-RS, DC-CD, MN-BG, etc.)                  │  │
│  │ Short-lived, execution-driving                                       │  │
│  │ Drives: Sprint reporting, team assignment, cross-cutting tracking   │  │
│  │ Stored as: Project / sprint metadata                                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  RELATIONSHIP                                                              │
│  One product → many projects over its lifetime                             │
│  Product classification is stable; project codes change per sprint          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Product Record Structure

Every registered product has a **Product Record** (`PRD-XXX`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PRODUCT RECORD (PRD-XXX)                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  IDENTITY                                                                  │
│  ├── Product ID:      PRD-XXX (sequential, never reused)                  │
│  ├── Name:            {Product name}                                       │
│  ├── Description:     {One-paragraph purpose}                              │
│  └── Status:          Active | Sunset | Deprecated | Archived              │
│                                                                             │
│  CLASSIFICATION (PCL)                                                      │
│  ├── Code:            PCL-L.D.E.C                                          │
│  ├── Layer:           {Semantic value}                                     │
│  ├── Delivery:        {Semantic value}                                     │
│  ├── Extensibility:   {Semantic value}                                     │
│  ├── Criticality:     {Semantic value}                                     │
│  └── Rationale:       {Why this classification}                            │
│                                                                             │
│  DOMAIN & FUNCTION                                                         │
│  ├── Domain:          [{Controlled vocabulary tags}]                       │
│  └── Function:        [{Free-form capability descriptors}]                 │
│                                                                             │
│  CONTEXT                                                                   │
│  ├── Owner:           {Team or person}                                     │
│  ├── Created:         {YYYY-MM-DD}                                         │
│  ├── Last Reviewed:   {YYYY-MM-DD}                                         │
│  └── Related Products:{PRD-XXX links}                                      │
│                                                                             │
│  HISTORY                                                                   │
│  └── Status changes, reclassifications, notes                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Facet Definitions & Encoding

### 2.1 Facet Overview

The PCL code encodes four architectural facets in fixed order:

```
PCL-L.D.E.C
    │ │ │ │
    │ │ │ └── C = Criticality    (single-value)
    │ │ └──── E = Extensibility   (predefined composites)
    │ └────── D = Delivery        (single-value)
    └──────── L = Layer           (predefined composites)
```

**Rules:**

- Facet order is **immutable** — always L.D.E.C
- Semantic facet names are **authoritative** — numbers are derived
- Numeric meanings are **never reassigned** — deprecated codes are retired, not reused
- Facets with composites: **Layer, Extensibility**
- Facets without composites: **Delivery, Criticality** (single-value only)

### 2.2 L — Layer

Where the product sits in the technology stack.

| Code | Value                        | Description                                             |
| ---- | ---------------------------- | ------------------------------------------------------- |
| 0    | Data                         | Data storage, processing, or pipeline systems           |
| 1    | Application                  | End-user software with UI                               |
| 2    | Platform                     | Foundation that other software builds on                |
| 3    | Application + Platform       | App with platform capabilities (e.g., extensible SaaS)  |
| 4    | Infrastructure               | Compute, network, or deployment systems                 |
| 5    | Application + Infrastructure | App with infrastructure management (e.g., PaaS with UI) |
| 6    | Platform + Infrastructure    | Platform providing infrastructure services              |
| 7    | Full Stack                   | Application + Platform + Infrastructure                 |
| 8    | Embedded                     | Firmware, IoT, or hardware-coupled software             |
| 9    | Other                        | Specify in Product Record rationale                     |

### 2.3 D — Delivery

How the product is deployed and consumed.

| Code | Value                | Description                                |
| ---- | -------------------- | ------------------------------------------ |
| 0    | Library / Package    | Consumed as a dependency, not standalone   |
| 1    | SaaS                 | Cloud-hosted, vendor-managed, subscription |
| 2    | On-Premises          | Installed on customer infrastructure       |
| 3    | Hybrid               | Both cloud and on-prem components          |
| 4    | Managed Service      | Cloud-hosted, customer-dedicated instance  |
| 5    | Embedded             | Shipped as part of hardware or firmware    |
| 6    | Desktop Distribution | Installed on end-user workstations         |
| 7    | Mobile Distribution  | Distributed via app stores                 |
| 9    | Other                | Specify in Product Record rationale        |

### 2.4 E — Extensibility

How third parties or internal teams can extend the product.

| Code | Value                    | Description                                       |
| ---- | ------------------------ | ------------------------------------------------- |
| 0    | None                     | Closed system, no extension points                |
| 1    | API                      | Programmatic access via REST, GraphQL, gRPC, etc. |
| 2    | Webhooks                 | Event-driven outbound notifications               |
| 3    | API + Webhooks           | Programmatic access + event notifications         |
| 4    | Plugins                  | Loadable extension modules                        |
| 5    | SDK                      | Development kit for building on the product       |
| 6    | API + Plugins            | Programmatic access + extension modules           |
| 7    | API + Webhooks + Plugins | Full integration + extension surface              |
| 8    | Open Source              | Source-level extensibility                        |
| 9    | Other                    | Specify in Product Record rationale               |

### 2.5 C — Criticality

The operational and regulatory risk level of the product.

| Code | Value           | Description                                               |
| ---- | --------------- | --------------------------------------------------------- |
| 0    | Low             | Internal tools, non-sensitive, failure is inconvenient    |
| 1    | Medium          | Business-important, moderate data sensitivity             |
| 2    | High            | Customer-facing, handles sensitive data, SLA-bound        |
| 3    | Regulated       | Subject to regulatory compliance (GDPR, SOC 2, PCI, etc.) |
| 4    | Safety-Critical | Failure could cause physical harm or life safety risk     |
| 9    | Other           | Specify in Product Record rationale                       |

### 2.6 Multi-Value Encoding Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-VALUE ENCODING STRATEGY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  APPROACH: Predefined Composites                                           │
│                                                                             │
│  Facets with composites:    Layer (L), Extensibility (E)                   │
│  Facets without composites: Delivery (D), Criticality (C) — single only   │
│                                                                             │
│  RULES                                                                     │
│  • Only listed combinations are valid                                      │
│  • Unlisted combinations → code 9 with documentation                      │
│  • This is NOT a bitmask or additive system                                │
│  • Numbers are NOT calculated from component values                        │
│  • Each composite code is an independent, assigned meaning                 │
│                                                                             │
│  RATIONALE                                                                 │
│  Readability > mathematical purity.                                        │
│  At mid-market scale (~5-30 products), predefined composites cover         │
│  90%+ of real cases. The remaining edge cases use code 9 with              │
│  documentation.                                                             │
│                                                                             │
│  VERSIONING TRIGGER                                                        │
│  If >15% of products use code 9 for any single facet, add new             │
│  predefined composites in the next minor version of this standard.         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Criticality → Governance Mapping

Product criticality drives minimum governance requirements.

### 3.1 Governance by Criticality

| Criticality                   | Minimum Governance                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Low (0)**             | Team lead approval; standard development process                                                                     |
| **Medium (1)**          | Architecture review; security checklist; documented risk assessment                                                  |
| **High (2)**            | Formal architecture review; security review (per 2.1 Security Policy); SLA definition (per 4.6 Service Level Policy) |
| **Regulated (3)**       | Everything in High + compliance verification; audit trail; regulatory mapping; legal review                          |
| **Safety-Critical (4)** | Everything in Regulated + formal sign-off from CTO; external audit; incident simulation                              |

### 3.2 Criticality Determines

| Area                          | Driven By Criticality                                   |
| ----------------------------- | ------------------------------------------------------- |
| **Security review**     | Required at High+                                       |
| **Architecture review** | Required at Medium+                                     |
| **Compliance audit**    | Required at Regulated+                                  |
| **SLA requirements**    | Required at High+                                       |
| **Change management**   | Standard at Low/Medium; formal at High+                 |
| **Incident response**   | Standard at Low/Medium; priority at High+               |
| **Backup/DR**           | Best effort at Low; defined at Medium+; tested at High+ |

---

## 4. Domain Tags (Controlled Vocabulary)

Domain tags describe **what the product does** — its functional area. They are
separate from the PCL classification, which describes architectural traits.

### 4.1 Domain Vocabulary (v1)

| Domain Tag                   | Description                         | Examples                         |
| ---------------------------- | ----------------------------------- | -------------------------------- |
| **Analytics**          | Data analysis, reporting, insights  | BI dashboards, metrics platforms |
| **Collaboration**      | Team coordination and communication | Chat, shared workspaces          |
| **Commerce**           | Buying, selling, transactions       | Storefronts, marketplaces        |
| **Communication**      | Messaging, notifications, channels  | Email, SMS, push                 |
| **Compliance**         | Regulatory adherence, audit         | GRC tools, audit platforms       |
| **Data Management**    | Storage, transformation, governance | ETL, data catalogs               |
| **Developer Tools**    | Software development support        | IDEs, CI/CD, testing             |
| **Education**          | Learning, training, certification   | LMS, course platforms            |
| **Finance**            | Accounting, billing, payments       | Invoicing, ledger systems        |
| **Healthcare**         | Clinical, patient, medical          | EHR, telehealth                  |
| **Identity / Auth**    | Authentication, authorization       | SSO, IAM, MFA                    |
| **Infrastructure**     | Compute, network, deployment        | Cloud management, orchestration  |
| **Marketing**          | Campaigns, content, engagement      | CMS, email marketing             |
| **Operations**         | Business process management         | Workflow, logistics              |
| **Productivity**       | Individual and team efficiency      | Notes, calendars, task lists     |
| **Project Management** | Planning, tracking, delivery        | Kanban, Gantt, sprints           |
| **Security**           | Threat detection, prevention        | SIEM, vulnerability scanning     |
| **Other**              | Unlisted domain (justify in record) | —                               |

**Rules:**

- Products MUST have at least one domain tag
- Products MAY have multiple domain tags (no limit)
- Tags come from this controlled vocabulary only
- "Other" requires justification in the Product Record
- Vocabulary is versioned — additions require a minor version bump to this standard

### 4.2 Function Descriptors (Free-Form)

Function descriptors are **free-form labels** describing specific product
capabilities. They are not governed by a controlled vocabulary.

**Purpose:** Enable search and discoverability beyond domain tags.

**Examples:**

```
Domain:   [Collaboration, Project Management]
Function: [Task tracking, Kanban boards, Workflow automation, Sprint planning]
```

**Rules:**

- Products SHOULD have at least one function descriptor
- Use lowercase, descriptive phrases
- No formal governance — these are search aids, not classification axes

---

## 5. Product Record Template

### 5.1 Template

```markdown
# Product Record: PRD-{XXX}

**Product ID:** PRD-{XXX}
**Name:** {Product Name}
**Description:** {One-paragraph purpose and scope}
**Status:** {Active | Sunset | Deprecated | Archived}
**Owner:** {Team or person accountable}
**Created:** {YYYY-MM-DD}
**Last Reviewed:** {YYYY-MM-DD}

## Classification

**PCL Code:** PCL-{L}.{D}.{E}.{C}

| Facet | Code | Value | Rationale |
|-------|------|-------|-----------|
| Layer | {L} | {semantic} | {why} |
| Delivery | {D} | {semantic} | {why} |
| Extensibility | {E} | {semantic} | {why} |
| Criticality | {C} | {semantic} | {why} |

## Domain & Function

**Domain:** {tag1}, {tag2}, ...
**Function:** {descriptor1}, {descriptor2}, ...

## Technical Context

- **Primary Tech Stack:** {languages, frameworks}
- **Deployment Target:** {cloud provider, on-prem, etc.}
- **Data Sensitivity:** {classification level}
- **Related Products:** {PRD-XXX links}

## History

| Date | Change | By |
|------|--------|----|
| {YYYY-MM-DD} | {What changed} | {Who} |
```

### 5.2 Example: Kanban Platform

```markdown
# Product Record: PRD-001

**Product ID:** PRD-001
**Name:** CYBERCUBE Kanban Platform
**Description:** Collaborative work management platform providing Kanban boards,
sprint planning, and workflow automation for internal and client teams.
**Status:** Active
**Owner:** Platform Team
**Created:** 2026-02-07
**Last Reviewed:** 2026-02-07

## Classification

**PCL Code:** PCL-3.1.3.2

| Facet | Code | Value | Rationale |
|-------|------|-------|-----------|
| Layer | 3 | Application + Platform | End-user app with extensible platform capabilities |
| Delivery | 1 | SaaS | Cloud-hosted, subscription-based |
| Extensibility | 3 | API + Webhooks | REST API for integrations; webhooks for event notifications |
| Criticality | 2 | High | Customer-facing, handles project data, SLA-bound |

## Domain & Function

**Domain:** Collaboration, Project Management
**Function:** Task tracking, Kanban boards, Workflow automation, Sprint planning,
Team dashboards

## Technical Context

- **Primary Tech Stack:** TypeScript, React, Node.js, PostgreSQL
- **Deployment Target:** Google Cloud (Cloud Run)
- **Data Sensitivity:** Internal (per 3.3 Data Classification Standard)
- **Related Products:** PRD-003 (API Gateway)

## History

| Date | Change | By |
|------|--------|----|
| 2026-02-07 | Initial registration | Platform Team |
```

### 5.3 Example: Internal Analytics Dashboard

```markdown
# Product Record: PRD-002

**Product ID:** PRD-002
**Name:** CYBERCUBE Insights
**Description:** Internal business intelligence platform for operational
metrics, revenue tracking, and executive reporting.
**Status:** Active
**Owner:** Data Team
**Created:** 2026-02-07
**Last Reviewed:** 2026-02-07

## Classification

**PCL Code:** PCL-1.1.1.1

| Facet | Code | Value | Rationale |
|-------|------|-------|-----------|
| Layer | 1 | Application | End-user dashboard, no platform capabilities |
| Delivery | 1 | SaaS | Cloud-hosted, internal access |
| Extensibility | 1 | API | Read-only API for data export |
| Criticality | 1 | Medium | Internal use, business-important but not customer-facing |

## Domain & Function

**Domain:** Analytics, Finance
**Function:** KPI dashboards, Revenue reporting, Operational metrics,
Executive summaries

## Technical Context

- **Primary Tech Stack:** Python, dbt, Metabase, BigQuery
- **Deployment Target:** Google Cloud
- **Data Sensitivity:** Confidential (per 3.3 Data Classification Standard)
- **Related Products:** PRD-001 (Kanban — data source)

## History

| Date | Change | By |
|------|--------|----|
| 2026-02-07 | Initial registration | Data Team |
```

---

## 6. Governance Rules

### 6.1 Registry Rules

| Rule                                          | Detail                                                     |
| --------------------------------------------- | ---------------------------------------------------------- |
| **Product IDs are sequential**          | PRD-001, PRD-002, ... PRD-999                              |
| **IDs are never reused**                | Deprecated products keep their ID                          |
| **Every product MUST be registered**    | No unregistered products in production                     |
| **PCL code MUST match semantic facets** | If facets change, code changes                             |
| **Semantic facets are authoritative**   | In case of conflict, semantic value overrides numeric code |
| **Review cadence**                      | Product records MUST be reviewed annually (at minimum)     |

### 6.2 Facet Schema Rules

| Rule                                            | Detail                                                |
| ----------------------------------------------- | ----------------------------------------------------- |
| **Facet order is immutable**              | Always L.D.E.C                                        |
| **Numeric meanings are never reassigned** | Code `3` always means the same thing within a facet |
| **Deprecated codes are retired**          | Marked deprecated, never reused                       |
| **New codes are appended**                | Added at next available number (before `9`)         |
| **Code `9` requires documentation**     | Rationale MUST be in the Product Record               |
| **Facet schema is versioned**             | Changes require a minor version bump to this standard |

### 6.3 Domain Vocabulary Rules

| Rule                                               | Detail                                                 |
| -------------------------------------------------- | ------------------------------------------------------ |
| **Tags come from the controlled vocabulary** | No ad-hoc tags                                         |
| **"Other" requires justification**           | Documented in Product Record                           |
| **Additions require standard update**        | New tags need minor version bump                       |
| **Tags are never removed**                   | Deprecated, not deleted                                |
| **Vocabulary versioning trigger**            | If >15% of products use "Other," expand the vocabulary |

### 6.4 Product Status Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRODUCT STATUS LIFECYCLE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐     ┌──────────┐     ┌────────────┐     ┌──────────┐        │
│  │  ACTIVE  │────▶│  SUNSET  │────▶│ DEPRECATED │────▶│ ARCHIVED │        │
│  └──────────┘     └──────────┘     └────────────┘     └──────────┘        │
│       │                │                 │                  │               │
│       ▼                ▼                 ▼                  ▼               │
│   In production    End-of-life       Not supported      Record-only        │
│   Fully supported  announced         Migration path     preserved for      │
│                    No new features    provided           audit              │
│                    Maintenance only                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Product Registry Format

The product registry is maintained as a single index file linking to individual
Product Records.

### 7.1 Registry Index Template

```markdown
# CYBERCUBE Product Registry

**Last Updated:** {YYYY-MM-DD}
**Total Products:** {count}

## Active Products

| ID | Name | PCL Code | Domain | Criticality | Owner |
|----|------|----------|--------|-------------|-------|
| PRD-001 | Kanban Platform | PCL-3.1.3.2 | Collaboration, PM | High | Platform Team |
| PRD-002 | CYBERCUBE Insights | PCL-1.1.1.1 | Analytics, Finance | Medium | Data Team |

## Sunset Products

| ID | Name | PCL Code | Sunset Date | Migration |
|----|------|----------|-------------|-----------|

## Archived Products

| ID | Name | PCL Code | Archived Date | Reason |
|----|------|----------|---------------|--------|
```

### 7.2 Querying the Registry

The registry supports queries by any combination of facets and domain tags:

```
"Show me all SaaS products"              → Filter: D=1
"Show me High criticality platforms"     → Filter: L=2 or L=3, C=2
"Show me Collaboration products"         → Filter: Domain contains Collaboration
"Show me API-extensible SaaS"            → Filter: D=1, E∈{1,3,6,7}
"What products does Platform Team own?"  → Filter: Owner = Platform Team
```

---

## 8. Work Type Tags (Project Level)

Work type tags classify **what kind of work** is being done on a project or
sprint. They are tactical and short-lived, in contrast to the strategic PCL
classification of the product itself.

### 8.1 When to Use Work Type Tags

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WORK TYPE TAGS vs PCL                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USE PCL (Sections 2-4) FOR:                                               │
│  "What is this product?"                                                   │
│  ├── Architecture decisions                                                │
│  ├── Compliance posture                                                    │
│  ├── Security requirements                                                 │
│  └── Strategic portfolio queries                                           │
│                                                                             │
│  USE WORK TYPE TAGS (this section) FOR:                                    │
│  "What kind of work are we doing this sprint?"                             │
│  ├── Cross-cutting projects (CI/CD setup, migrations)                     │
│  ├── Maintenance and support work                                         │
│  ├── Infrastructure projects not tied to a single product                 │
│  ├── Pre-product exploration and prototyping                              │
│  └── Sprint-level reporting and team assignment                           │
│                                                                             │
│  DO NOT USE WORK TYPE TAGS WHEN:                                           │
│  The work is product-bound and the product's PCL already describes it.    │
│  A sprint on PRD-001 (Kanban Platform) does not need a WA-SS tag —        │
│  the product's PCL-3.1.3.2 already carries that information.              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Tag Format

```
Format:  {XX}-{YY}
         ││    ││
         ││    └┘── Subtype (2 letters)
         └┘──────── Parent  (2 letters)

Primary:   WA-SS
Secondary: AP-RS, DC-CD
Display:   WA-SS (+AP-RS, DC-CD)
```

**Rules:**

- One primary tag (exactly one), zero or more secondary tags
- Primary = core deliverable of the work
- Secondary = supporting domains the work touches
- Governance is driven by the **product's criticality** (Section 3), not the work type tag

### 8.3 Work Type Registry

| Code | Category              | Domain                                                 |
| ---- | --------------------- | ------------------------------------------------------ |
| WA   | Web Applications      | Frontend + Backend                                     |
| CL   | Client Applications   | Mobile / Desktop (iOS, Android, macOS, Windows, Linux) |
| CS   | Custom Software       | Bespoke internal systems                               |
| AP   | API Development       | Backend interfaces                                     |
| AI   | AI & Machine Learning | Models, NLP, inference                                 |
| DT   | Data & Analytics      | BI, ETL, warehousing                                   |
| DC   | DevOps & Cloud        | Infrastructure, CI/CD                                  |
| SC   | Security & Compliance | Auth, encryption, audit                                |
| IO   | Embedded / IoT        | Hardware, firmware, sensors                            |
| GM   | Games & Interactive   | 2D/3D, simulation, VR/AR                               |
| BC   | Blockchain / Web3     | Smart contracts, DeFi                                  |
| RP   | Automation / RPA      | Bots, workflows, no-code                               |
| IN   | System Integrations   | Bridges, payments, legacy                              |
| MN   | Maintenance / Support | Bugs, updates, optimization                            |

### 8.4 Subtype Reference

**WA — Web Applications**

| Code  | Name                  | Criteria                                                                                                             |
| ----- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| WA-SS | SaaS                  | Multi-user auth; subscription access; cloud-hosted; multi-tenant; continuous delivery                                |
| WA-DS | Dashboards / Portals  | User-facing portal; interactive dashboards; admin capabilities; API-integrated data                                  |
| WA-EC | E-Commerce            | Product catalog; checkout; payment gateway; inventory/order management                                               |
| WA-MT | Multi-Tenant Platform | Tenant separation; per-tenant RBAC; data isolation; centralized admin.*White-label/on-prem, not subscription SaaS* |

**CL — Client Applications**

| Code  | Name                  | Criteria                                                                     |
| ----- | --------------------- | ---------------------------------------------------------------------------- |
| CL-IO | iOS (Native)          | iOS-native (Swift, SwiftUI, Objective-C); Xcode pipeline; HIG compliance     |
| CL-AD | Android (Native)      | Android-native (Kotlin, Java); Android Studio pipeline; Material Design      |
| CL-XP | Cross-Platform Mobile | Single codebase for iOS + Android (Flutter, React Native, .NET MAUI, etc.)   |
| CL-PW | PWA                   | Web app with install capability; service workers; offline caching            |
| CL-MC | macOS                 | macOS-native (Swift, AppKit, Objective-C);`.app` bundling                  |
| CL-WN | Windows               | Windows-native (WinUI, .NET, WPF);`.exe`/`.msi` installer                |
| CL-LX | Linux                 | Linux-native packaging (`.deb`, `.rpm`, AppImage); GTK/Qt or terminal UI |
| CL-EL | Electron / Tauri      | Web tech packaged as desktop app; cross-platform distribution                |

**CS — Custom Software**

| Code  | Name                | Criteria                                                                                                              |
| ----- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| CS-WF | Workflow Automation | Custom-built business processes; triggers; workflow visualization.*Built from scratch — see RP-WF for tool-driven* |
| CS-ER | ERP / CRM Systems   | Custom-built CRM/ERP; ops/finance/inventory modules.*Building new — see IN-ER for integrating existing*            |
| CS-IT | Internal Tools      | Private org tools; specialized roles or operations                                                                    |
| CS-ST | Suites              | Multiple integrated modules; centralized auth; unified UX                                                             |

**AP — API Development**

| Code  | Name          | Criteria                                                      |
| ----- | ------------- | ------------------------------------------------------------- |
| AP-RS | REST API      | RESTful endpoints; JSON payloads; stateless                   |
| AP-GQ | GraphQL       | GraphQL schema; query/mutation/resolver logic                 |
| AP-MS | Microservices | Independent components; networked comms; separate deployments |
| AP-RT | Real-Time API | Persistent connections (WebSockets, SSE); live data           |

**AI — AI & Machine Learning**

| Code  | Name           | Criteria                                                       |
| ----- | -------------- | -------------------------------------------------------------- |
| AI-AS | AI Assistants  | Conversational interface; LLM/NLP engine; action execution     |
| AI-PD | Predictive     | Forecasting models; historical training data                   |
| AI-RC | Recommender    | Personalized suggestions; behavioral/content models            |
| AI-NL | NLP / CV / RAG | Language, vision, or retrieval tasks; embeddings/vector search |

**DT — Data & Analytics**

| Code  | Name                  | Criteria                                                 |
| ----- | --------------------- | -------------------------------------------------------- |
| DT-BI | Business Intelligence | Analytics-first; KPI dashboards backed by warehouse/OLAP |
| DT-ET | ETL Pipelines         | Extract/transform/load; batch or streaming               |
| DT-DW | Data Warehouse        | Centralized structured storage; OLAP; schema-on-write    |
| DT-KP | KPI / Reporting       | Report generation; metric calculations; scheduled output |

**DC — DevOps & Cloud**

| Code  | Name            | Criteria                                                             |
| ----- | --------------- | -------------------------------------------------------------------- |
| DC-CD | CI/CD           | Automated builds, tests, deployment pipelines                        |
| DC-MG | Cloud Migration | Workload movement; replatforming/containerization                    |
| DC-IA | IaC             | Infrastructure in code (Terraform, Pulumi, etc.); version-controlled |
| DC-MN | Monitoring      | Logging + alerting; observability tooling                            |

**SC — Security & Compliance**

| Code  | Name                      | Criteria                                                  |
| ----- | ------------------------- | --------------------------------------------------------- |
| SC-AU | Authentication / Identity | Identity management; SSO, OAuth2, JWT                     |
| SC-KM | Encryption / KMS          | Key storage/rotation; encryption strategy                 |
| SC-PT | Pen Testing               | Vulnerability scanning; threat modeling; security reports |
| SC-CM | Compliance                | Auditing; regulatory alignment (SOC 2, GDPR, etc.)        |

**IO — Embedded / IoT**

| Code  | Name     | Criteria                                                  |
| ----- | -------- | --------------------------------------------------------- |
| IO-FW | Firmware | Hardware-level logic; microcontroller code                |
| IO-SY | Sync     | Cloud-to-hardware data sync; device provisioning          |
| IO-SN | Sensors  | Sensor data ingestion; real-time readings                 |
| IO-RT | RTOS     | Real-time operating constraints; deterministic scheduling |

**GM — Games & Interactive**

| Code  | Name       | Criteria                                                  |
| ----- | ---------- | --------------------------------------------------------- |
| GM-2D | 2D Games   | 2D rendering engine; sprite/tile-based gameplay           |
| GM-3D | 3D Games   | 3D engine (Unity, Unreal, Godot); mesh, lighting, physics |
| GM-SM | Simulation | Simulation model; real-world or abstract system modeling  |
| GM-VR | VR / AR    | Headset or AR device support; immersive environments      |

**BC — Blockchain / Web3**

| Code  | Name            | Criteria                                       |
| ----- | --------------- | ---------------------------------------------- |
| BC-SC | Smart Contracts | On-chain logic; Solidity, Rust, Move           |
| BC-NF | NFT             | Token minting; metadata; marketplace features  |
| BC-WL | Wallet          | Cryptographic key storage; transaction signing |
| BC-DF | DeFi            | Liquidity pools; yield logic; on-chain finance |

**RP — Automation / RPA**

| Code  | Name                | Criteria                                                                                                                     |
| ----- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| RP-BT | Bots                | Automated agents; scripted or AI-controlled                                                                                  |
| RP-WF | Workflow Automation | Platform/low-code orchestration (Zapier, n8n, Temporal); trigger→action flows.*Tool-driven — see CS-WF for custom-built* |
| RP-NC | No-Code / Low-Code  | Visual logic blocks; no-code builder                                                                                         |

**IN — System Integrations**

| Code  | Name                  | Criteria                                                                                                  |
| ----- | --------------------- | --------------------------------------------------------------------------------------------------------- |
| IN-ER | ERP / CRM Integration | Connecting to existing ERP/CRM (Salesforce, SAP); data sync.*Integrating — see CS-ER for building new* |
| IN-PM | Payments              | Payment processor integration; secure transactions                                                        |
| IN-BR | API Bridges           | Middleware; data transformations between systems                                                          |
| IN-LG | Legacy                | Modernization bridges; legacy system adapters                                                             |

**MN — Maintenance / Support**

| Code  | Name         | Criteria                                                                                      |
| ----- | ------------ | --------------------------------------------------------------------------------------------- |
| MN-BG | Bug Fixing   | Patch releases; regression correction                                                         |
| MN-UP | Updates      | Feature increments; minor version updates                                                     |
| MN-OP | Optimization | Code-level performance; algorithmic efficiency.*Code changes — see MN-TN for infra/config* |
| MN-TN | Tuning       | Infrastructure/config refinement; resource scaling.*Infra/config — see MN-OP for code*     |

### 8.5 Classification Examples

| Project                         | Primary | Secondary | Product             | Notes                                     |
| ------------------------------- | ------- | --------- | ------------------- | ----------------------------------------- |
| CI/CD pipeline for all products | DC-CD   | DC-IA     | N/A (cross-cutting) | Not product-bound                         |
| Legacy SAP integration          | IN-LG   | IN-ER     | PRD-001             | Product-linked but work type adds context |
| Bug fix sprint                  | MN-BG   | —        | PRD-002             | Maintenance on known product              |
| AI chatbot prototype            | AI-AS   | AP-RS     | N/A (pre-product)   | Exploration, no PRD yet                   |
| Quarterly security audit        | SC-PT   | SC-CM     | All products        | Cross-cutting compliance                  |

---

## Quick Reference Card

Print it. Keep it handy.

### PCL Code Format

```
PCL-L.D.E.C

L = Layer           D = Delivery        E = Extensibility    C = Criticality
0 Data              0 Library            0 None               0 Low
1 Application       1 SaaS              1 API                1 Medium
2 Platform          2 On-Prem           2 Webhooks           2 High
3 App+Platform      3 Hybrid            3 API+WH             3 Regulated
4 Infrastructure    4 Managed Svc       4 Plugins            4 Safety-Critical
5 App+Infra         5 Embedded          5 SDK                9 Other
6 Platform+Infra    6 Desktop           6 API+Plugins
7 Full Stack        7 Mobile            7 API+WH+Plugins
8 Embedded          9 Other             8 Open Source
9 Other                                 9 Other
```

### Product Record Must Have

```
PRD-XXX             → Unique product ID
PCL-L.D.E.C        → Classification code
Semantic facets     → Authoritative values + rationale
Domain tags         → From controlled vocabulary
Function descriptors → Free-form capabilities
Owner + status      → Accountability
```

### Domain Vocabulary

```
Analytics        Collaboration    Commerce        Communication
Compliance       Data Management  Developer Tools  Education
Finance          Healthcare       Identity/Auth    Infrastructure
Marketing        Operations       Productivity     Project Management
Security         Other (justify)
```

### Work Type Codes (Section 8)

```
WA  Web Apps          AI  AI / ML            SC  Security
CL  Client Apps       DT  Data / Analytics   IO  Embedded / IoT
CS  Custom Software   DC  DevOps / Cloud     GM  Games
AP  API Development   BC  Blockchain         RP  Automation / RPA
IN  Integrations      MN  Maintenance
```

### Key Rules

```
✓ Semantics define, numbers encode
✓ Facet order: always L.D.E.C
✓ Composites: Layer and Extensibility only
✓ Code 9 = Other, always requires documentation
✓ IDs are sequential, never reused
✓ Annual review minimum
✓ Work type tags for cross-cutting / maintenance / pre-product work
✗ Numbers are NEVER reassigned
✗ This is NOT a bitmask system
✗ Don't tag product-bound sprints — PCL already covers it
```

### Criticality → Governance

```
Low (0)       → Team lead approval
Medium (1)    → Architecture review + security checklist
High (2)      → Formal reviews + SLA definition
Regulated (3) → Compliance verification + audit trail
Safety (4)    → CTO sign-off + external audit
```

---

## Implementation Status

**Last Updated:** 2026-02-07
**Standard Version:** v1

### Core Implementation

| Component                    | Status   | Notes                                   |
| ---------------------------- | -------- | --------------------------------------- |
| PRCS standard document       | COMPLETE | This standard                           |
| Facet definitions + encoding | COMPLETE | 4 facets, predefined composites         |
| Domain controlled vocabulary | COMPLETE | 18 tags defined                         |
| Product Record template      | COMPLETE | With 2 examples                         |
| Registry index template      | COMPLETE | Markdown-based                          |
| Work type tags (Layer 2)     | COMPLETE | 14 parents, 55 subtypes, boundary notes |
| Product registry population  | ROADMAP  | Register existing products              |
| Annual review process        | ROADMAP  | Schedule first review                   |
| Automated PCL validation     | ROADMAP  | CI check for format compliance          |
| Portfolio dashboard          | ROADMAP  | Query layer over registry               |

### Migration Path

1. **Phase 1:** Publish this standard
2. **Phase 2:** Register all existing products as PRD records
3. **Phase 3:** Apply work type tags to active cross-cutting projects
4. **Phase 4:** Implement automated PCL validation
5. **Phase 5:** Build portfolio dashboard for facet-based queries

---

## Related Documents

| Document                                               | Relationship                           |
| ------------------------------------------------------ | -------------------------------------- |
| 1.4 CYBERCUBE Architecture Governance Policy           | Architecture review triggers           |
| 2.1 CYBERCUBE Security Policy                          | Security review for High+ criticality  |
| 3.3 CYBERCUBE Data Classification & Retention Standard | Data sensitivity alignment             |
| 4.6 CYBERCUBE Service Level Policy                     | SLA requirements for High+ criticality |
| 5.5 CYBERCUBE Testing & Quality Standard               | Testing requirements by criticality    |
| 5.6 CYBERCUBE Release & Deployment Standard            | Deployment process by criticality      |
| 5.7 CYBERCUBE Change Management Policy                 | Change process by criticality          |
| 7.2 CYBERCUBE AI Usage & Ethics Policy                 | Ethics review for AI projects          |

---

## Version History

| Version | Date       | Changes                                                                                                                                                                                                                                                            |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| v1      | 2026-02-07 | Initial release. Faceted classification (PCL), domain vocabulary, product records, governance mapping, predefined composite encoding strategy. Merged project-level work type tags (formerly 1.5) into Section 8; MA+DA consolidated into CL (Client Applications) |


```
 ┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  CYBERCUBE PRODUCT REGISTRY & CLASSIFICATION SYSTEM (PRCS)                  │
│  Standard: v1  |  Status: Active  |  Authority: CTO / Architecture Lead     │
│  Applies to: ALL software products                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PURPOSE                                                                     │
│                                                                             │
│ Define a single, auditable source of truth for software products using      │
│ faceted semantic classification with numeric encoding, decoupled from       │
│ project and sprint execution.                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ CORE PRINCIPLES                                                             │
│                                                                             │
│  • Products are classified (strategic, stable)                              │
│  • Work is tagged (tactical, volatile)                                      │
│  • Semantics are authoritative                                              │
│  • Numbers encode, never define                                             │
│  • Product identity ≠ project activity                                      │
│  • Readability > mathematical purity                                        │
│  • Controlled evolution only                                                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SYSTEM MODEL                                                                │
│                                                                             │
│  LAYER 1 — PRODUCT LEVEL (This Standard)                                    │
│  ├── Faceted classification (PCL)                                           │
│  ├── Domain tags (controlled vocabulary)                                    │
│  ├── Function descriptors (free-form)                                       │
│  ├── Stored as Product Records (PRD-XXX)                                    │
│  └── Drives: architecture, security, compliance, risk                       │
│                                                                             │
│  LAYER 2 — PROJECT LEVEL (Section 8)                                        │
│  ├── Work Type Tags (WA-SS, AP-RS, MN-OP, ...)                             │
│  ├── Short-lived, execution-focused                                         │
│  ├── Drives: sprint reporting, ownership, cross-cutting tracking            │
│  └── EXPLICITLY NOT product classification                                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PRODUCT CLASSIFICATION (PCL)                                                │
│                                                                             │
│  Canonical format: PCL-L.D.E.C                                              │
│  Facet order: IMMUTABLE                                                     │
│  Semantic values are authoritative                                          │
│  Numeric meanings are NEVER reassigned                                      │
│                                                                             │
│  L — Layer             (composites allowed)                                 │
│  D — Delivery          (single-value only)                                  │
│  E — Extensibility     (predefined composites only)                         │
│  C — Criticality       (single-value only)                                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ ENCODING RULES                                                              │
│                                                                             │
│  • Predefined composites ONLY (no bitmasks)                                 │
│  • Unlisted combinations → code 9 + rationale                               │
│  • If >15% use code 9 → extend facet table (minor version bump)            │
│  • Facet schema is finite and versioned                                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PRODUCT RECORD (PRD-XXX) — MANDATORY                                        │
│                                                                             │
│  MUST include:                                                              │
│  • Unique product ID (never reused)                                         │
│  • PCL code + semantic facet breakdown + rationale                          │
│  • Domain tags (controlled vocabulary)                                      │
│  • Function descriptors (free-form)                                         │
│  • Owner, status, lifecycle history                                         │
│                                                                             │
│  Products MUST be registered before production use.                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ DOMAIN & FUNCTION                                                           │
│                                                                             │
│  • Domain Tags: controlled, multi-value, versioned                          │
│  • Function Descriptors: free-form, searchable, non-governed                │
│  • At least one domain tag REQUIRED                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ CRITICALITY → GOVERNANCE                                                    │
│                                                                             │
│  Low        → team lead approval                                            │
│  Medium+    → architecture review                                           │
│  High+      → security review + SLA definition                              │
│  Regulated+ → compliance verification + audit trail                         │
│  Safety     → CTO sign-off + external audit                                 │
│                                                                             │
│  Governance is driven by PRODUCT criticality, not work type.                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ WORK TYPE TAGS (PROJECT LEVEL ONLY)                                         │
│                                                                             │
│  • Format: XX-YY (Primary) (+Secondary, ...)                                │
│  • One primary, zero or more secondary                                      │
│  • Used ONLY for: cross-cutting, maintenance, integration, pre-product      │
│  • MUST NOT duplicate product PCL meaning                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ REGISTRY & LIFECYCLE                                                        │
│                                                                             │
│  Active ──▶ Sunset ──▶ Deprecated ──▶ Archived                              │
│                                                                             │
│  • Archived = record-only (audit retention)                                 │
│  • Annual review MINIMUM                                                    │
│  • Registry maintained via indexed PRD records                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ EXPLICIT NON-GOALS                                                          │
│                                                                             │
│  • Sprint management                                                        │
│  • Team staffing models                                                     │
│  • Roadmaps or delivery methodology                                         │
│  • Customer-facing marketing taxonomy                                       │
│  • Bitmask or calculated encodings                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ OUTCOME                                                                     │
│                                                                             │
│  • Human-readable architectural clarity                                     │
│  • Machine-readable governance                                              │
│  • Zero coupling between strategy and execution                             │
│  • Audit-grade, scalable product catalog                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```




┌──────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE PRODUCT REGISTRY & CLASSIFICATION — SCORABLE MATRIX (0–5)          │
├──────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                                 │
│ 0 = Not defined / ignored                                                     │
│ 1 = Defined but not applied                                                   │
│ 2 = Partially applied, inconsistent                                          │
│ 3 = Implemented, baseline compliant                                          │
│ 4 = Enforced, reviewed, minor gaps                                           │
│ 5 = Institutionalized, audited, exemplary                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ P1 — PRODUCT REGISTRATION DISCIPLINE                                         │
│ CRITERIA:                                                                     │
│ • All products registered as PRD-XXX                                         │
│ • IDs sequential, never reused                                               │
│ • Registration before production use                                        │
│ 0–1: Products unregistered or ad-hoc                                         │
│ 2–3: Registry exists, incomplete                                             │
│ 4–5: Complete, authoritative registry                                       │
│ EVIDENCE: Product registry index, PRD records                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ P2 — FACET CLASSIFICATION INTEGRITY                                          │
│ CRITERIA:                                                                     │
│ • PCL format enforced (L.D.E.C, immutable order)                             │
│ • Semantic facets authoritative                                              │
│ • Numeric meanings never reassigned                                          │
│ 0–1: Facets unclear or misused                                               │
│ 2–3: Facets applied, inconsistencies present                                 │
│ 4–5: Facets precise, stable, auditable                                       │
│ EVIDENCE: PRD facet tables, validation rules                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ P3 — COMPOSITE & ENCODING GOVERNANCE                                         │
│ CRITERIA:                                                                     │
│ • Composites only where allowed (L, E)                                       │
│ • Code 9 usage documented                                                    │
│ • Versioning rules followed                                                  │
│ 0–1: Encodings improvised                                                    │
│ 2–3: Encoding rules known, weak enforcement                                  │
│ 4–5: Encoding controlled and versioned                                      │
│ EVIDENCE: Facet tables, rationale entries                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ P4 — DOMAIN TAG VOCABULARY CONTROL                                          │
│ CRITERIA:                                                                     │
│ • Controlled domain vocabulary only                                         │
│ • At least one domain tag per product                                       │
│ • Additions via standard update                                             │
│ 0–1: Ad-hoc or missing tags                                                 │
│ 2–3: Tags used, occasional drift                                            │
│ 4–5: Vocabulary strictly enforced                                           │
│ EVIDENCE: PRD domain fields, vocabulary version                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ P5 — FUNCTION DESCRIPTOR QUALITY                                            │
│ CRITERIA:                                                                     │
│ • Clear free-form capability descriptors                                    │
│ • Searchable and meaningful                                                  │
│ • Not misused as classification                                             │
│ 0–1: Missing or meaningless descriptors                                     │
│ 2–3: Descriptors present, uneven quality                                   │
│ 4–5: High-quality, discovery-friendly                                       │
│ EVIDENCE: PRD function fields                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ P6 — PRODUCT vs PROJECT SEPARATION                                          │
│ CRITERIA:                                                                     │
│ • Clear separation of PCL (product) vs work tags (project)                  │
│ • No duplication of meaning                                                 │
│ • Correct use of work type tags                                              │
│ 0–1: Product/project concepts conflated                                     │
│ 2–3: Separation defined, occasionally violated                              │
│ 4–5: Clean strategic vs tactical split                                      │
│ EVIDENCE: Sprint metadata, PRD linkage                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ P7 — CRITICALITY-DRIVEN GOVERNANCE                                          │
│ CRITERIA:                                                                     │
│ • Criticality correctly assigned                                            │
│ • Governance mapped to criticality                                          │
│ • Reviews, audits, SLAs triggered                                           │
│ 0–1: Criticality ignored                                                    │
│ 2–3: Criticality assigned, weak enforcement                                 │
│ 4–5: Criticality actively drives governance                                 │
│ EVIDENCE: Review logs, compliance artifacts                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ P8 — REGISTRY LIFECYCLE & STATUS                                           │
│ CRITERIA:                                                                     │
│ • Active → Sunset → Deprecated → Archived                                   │
│ • Status changes documented                                                 │
│ • Archived records retained for audit                                      │
│ 0–1: Status unmanaged                                                       │
│ 2–3: Lifecycle defined, inconsistently applied                              │
│ 4–5: Predictable, auditable lifecycle                                       │
│ EVIDENCE: Status history, registry sections                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ P9 — REVIEW CADENCE & AUDITABILITY                                         │
│ CRITERIA:                                                                     │
│ • Annual review minimum                                                     │
│ • Change history maintained                                                 │
│ • Registry usable for portfolio queries                                     │
│ 0–1: Registry stale                                                         │
│ 2–3: Reviews occur, irregular                                               │
│ 4–5: Regular reviews, audit-ready                                           │
│ EVIDENCE: Review dates, query outputs                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                │
│ • Max: 45 points                                                           │
│ • ≥40 = Portfolio-Grade                                                     │
│ • 32–39 = Governed with gaps                                                │
│ • 24–31 = Classification risk                                              │
│ • <24 = Registry failure                                                   │
│                                                                              │
│ HARD FAIL CONDITIONS:                                                        │
│ • P1 < 3  (Products not registered)                                         │
│ • P2 < 3  (Facet integrity broken)                                          │
│ • P6 < 3  (Product vs project conflation)                                   │
└──────────────────────────────────────────────────────────────────────────────┘
