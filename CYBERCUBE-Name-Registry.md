# CYBERCUBE Unified Name Registry

**Status:** Active
**Effective:** 2026-02-10
**Classification:** INTERNAL
**Owner:** Engineering Lead / Architecture Lead
**Review Cycle:** Quarterly + on namespace change
**Source Standard:** 5.1 Naming & Identifier Standard v1.2 + 1.5 PRCS v1

---

**Purpose:** Single authoritative lookup for ALL identifier names across the four CYBERCUBE namespaces (A/B/G/M), plus WOE prefixes, UUID mappings, and project records.

**Data source:** Tables marked with `Source of truth` are auto-generated from JSON files in `registries/`. Edit the JSON, then run `node registries/render-registry.mjs` to regenerate. See `registries/README.md` for workflow.

**Quick links:** [A — Artifacts](#1-namespace-a--artifact-domain-codes) · [A-WOE](#12-woe-prefixes) · [B — Entity Codes](#2-namespace-b--public-entity-codes-cc-pid) · [G — Governance IDs](#3-namespace-g--governance-registry) · [M — Modules](#4-namespace-m--module-registry) · [UUID Map](#5-uuid-to-cc-pid-crosswalk) · [Projects](#6-project-registry) · [Lookup Guide](#7-lookup-guide)

---

## 1. Namespace A — Artifact Domain Codes

**Format:** `<PARENT>-<SUB>_<ProjectName>_v<SemVer>_<YYYYMMDD>_<ENV>.<ext>`
**Regex:** `^(WA|MA|DA|CS|AP|A1|DT|DC|SC|I1|GM|BC|RP|IN|MN|CM|QA)-[A-Z0-9]{2,3}_[A-Z0-9-]+_v[0-9]+\.[0-9]+\.[0-9]+_[0-9]{8}_(DEV|STG|PRD|OPS|LAB)\.[A-Za-z0-9]+$`
**ENV codes:** DEV | STG | PRD | OPS | LAB

### 1.1 Parent → Subtype Crosswalk

| Parent | Parent Name | Sub | Subtype Name | Full Code |
|--------|-------------|-----|--------------|-----------|
| WA | Web Apps | SS | SaaS | WA-SS |
| WA | Web Apps | PO | Portals | WA-PO |
| WA | Web Apps | EC | E-Commerce | WA-EC |
| WA | Web Apps | CM | Content Management | WA-CM |
| MA | Mobile Apps | IO | iOS Native | MA-IO |
| MA | Mobile Apps | AD | Android Native | MA-AD |
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
| A1 | AI & ML | AS | AI Assistants | A1-AS |
| A1 | AI & ML | PD | Predictive | A1-PD |
| A1 | AI & ML | RC | Recommender | A1-RC |
| A1 | AI & ML | NL | NLP/CV/RAG | A1-NL |
| DT | Data & Analytics | BI | Business Intelligence | DT-BI |
| DT | Data & Analytics | ET | ETL Pipelines | DT-ET |
| DT | Data & Analytics | DW | Data Warehouse | DT-DW |
| DT | Data & Analytics | RP | Reporting | DT-RP |
| DC | DevOps & Cloud | CD | CI/CD | DC-CD |
| DC | DevOps & Cloud | MG | Cloud Migration | DC-MG |
| DC | DevOps & Cloud | IA | IaC | DC-IA |
| DC | DevOps & Cloud | MN | Monitoring | DC-MN |
| SC | Security & Compliance | AU | Auth/Identity | SC-AU |
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

### 1.2 WOE Prefixes (Work-Oriented Entries)

**Format:** `<PARENT>-<SUB>-<SEQ>` (e.g., `CS-ER-1427`)
**Scope:** Internal engineering work items only. NEVER exposed to customers.
**Source:** Jira / GitHub / Linear

| WOE Pattern | Meaning | Example |
|-------------|---------|---------|
| `WA-SS-*` | SaaS web app work item | `WA-SS-0042` |
| `CS-ER-*` | ERP/CRM custom software work item | `CS-ER-1427` |
| `AP-RS-*` | REST API work item | `AP-RS-0315` |
| `MN-BG-*` | Bug fix work item | `MN-BG-0891` |
| `SC-AU-*` | Auth/identity security work item | `SC-AU-0107` |
| `DC-CD-*` | CI/CD pipeline work item | `DC-CD-0053` |

> Any valid `PARENT-SUB` from §1.1 is a valid WOE prefix. Sequence numbers are tracker-assigned.

### 1.3 Governance Classifications (Overlay)

| Classification | Purpose | Versioned for Reuse | Own Roadmap |
|----------------|---------|---------------------|-------------|
| **One-off Project** | Single delivery for a client or internal need | No | No |
| **Product / Platform** | Customer-facing product or internal platform | Yes | Yes |
| **Reusable Standard Module (RSM)** | Governed building block reused across projects | Yes | No (roadmap via parent) |

---

## 2. Namespace B — Public Entity Codes (CC-PID)

**Format:** `<ENTITY>-<TOKEN>-<CHK>` (e.g., `PRJ-X2M8KD-F`)
**Token charset:** `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (32 chars, no I/O/0/1)
**Token length:** 6 (default) or 8 (high-volume/global)
**Checksum:** `alphabet[ SHA256(entity + "|" + token)[0] mod 32 ]`
**Regex:** `^[A-Z]{3}-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$`

### 2.1 Entity Code Registry

<!-- BEGIN:ENTITY_CODES -->
| Code | Entity Name | Category | Status | DB Table |
|------|-------------|----------|--------|----------|
| **CLT** | Client | Customer & Org | ACTIVE | `clients` |
| **ACC** | Organization / Account | Customer & Org | ACTIVE | `accounts` |
| **USR** | User | Customer & Org | ACTIVE | `users` |
| **CON** | Contact | Customer & Org | ACTIVE | `contacts` |
| **ADR** | Address | Customer & Org | ACTIVE | `addresses` |
| **TKT** | Support Ticket | Support & Comms | ACTIVE | `tickets` |
| **NTF** | Notification | Support & Comms | ACTIVE | `notifications` |
| **MSG** | Message | Support & Comms | ACTIVE | `messages` |
| **COM** | Comment | Support & Comms | ACTIVE | `comments` |
| **PRJ** | Project | Project Mgmt | ACTIVE | `projects` |
| **BRD** | Board | Project Mgmt | ACTIVE | `boards` |
| **COL** | Column | Project Mgmt | ACTIVE | `columns` |
| **CRD** | Card | Project Mgmt | ACTIVE | `cards` |
| **TSK** | Task | Project Mgmt | ACTIVE | `tasks` |
| **SPR** | Sprint / Iteration | Project Mgmt | ACTIVE | `sprints` |
| **MLN** | Milestone | Project Mgmt | ACTIVE | `milestones` |
| **BEN** | Benchmark | Project Mgmt | ACTIVE | `benchmarks` |
| **PHZ** | Phase | Project Mgmt | ACTIVE | `phases` |
| **DLV** | Deliverable | Project Mgmt | ACTIVE | `deliverables` |
| **ACT** | Activity | Project Mgmt | ACTIVE | `activities` |
| **TMB** | Team Member | Project Mgmt | ACTIVE | `team_members` |
| **INV** | Invoice | Billing & Finance | ACTIVE | `invoices` |
| **PAY** | Payment | Billing & Finance | ACTIVE | `payments` |
| **SUB** | Subscription | Billing & Finance | ACTIVE | `subscriptions` |
| **PLN** | Plan | Billing & Finance | ACTIVE | `plans` |
| **QTE** | Quote | Billing & Finance | ACTIVE | `quotes` |
| **EST** | Estimate | Billing & Finance | ACTIVE | `estimates` |
| **TXN** | Transaction | Billing & Finance | ACTIVE | `transactions` |
| **PRC** | Price / Rate | Billing & Finance | ACTIVE | `prices` |
| **DSC** | Discount / Coupon | Billing & Finance | ACTIVE | `discounts` |
| **DOC** | Document | Content & Docs | ACTIVE | `documents` |
| **PGS** | Page | Content & Docs | ACTIVE | `pages` |
| **FLE** | File | Content & Docs | ACTIVE | `files` |
| **FDR** | Folder | Content & Docs | ACTIVE | `folders` |
| **TMP** | Template | Content & Docs | ACTIVE | `templates` |
| **FRM** | Form | Content & Docs | ACTIVE | `forms` |
| **SIG** | Signature Request | Content & Docs | ACTIVE | `signatures` |
| **ATT** | Attachment | Content & Docs | ACTIVE | `attachments` |
| **TAG** | Tag | Content & Docs | ACTIVE | `tags` |
| **SES** | Session | System & Integration | ACTIVE | `sessions` |
| **TOK** | Token | System & Integration | ACTIVE | `tokens` |
| **API** | API Key Record | System & Integration | ACTIVE | `api_keys` |
| **AUD** | Audit Event | System & Integration | ACTIVE | `audit_events` |
| **LOG** | Log Entry | System & Integration | ACTIVE | `log_entries` |
| **JOB** | Background Job | System & Integration | ACTIVE | `jobs` |
| **WEB** | Webhook | System & Integration | ACTIVE | `webhooks` |
| **INT** | Integration | System & Integration | ACTIVE | `integrations` |
| **ENV** | Environment | System & Integration | ACTIVE | `environments` |
| **TEN** | Time Entry | System & Integration | ACTIVE | `time_entries` |
| **RLE** | Role | Access Control | ACTIVE | `roles` |
| **PRM** | Permission | Access Control | ACTIVE | `permissions` |
| **POL** | Policy | Access Control | ACTIVE | `policies` |

**Total:** 52 entity codes (52 ACTIVE)
<!-- END:ENTITY_CODES -->

### 2.2 Test Vectors

| Input | Valid | Notes |
|-------|-------|-------|
| `PRJ-X2M8KD-F` | Yes | Standard 6-char token |
| `CLT-9F4K7Q-F` | Yes | — |
| `INV-4Q7T9P-N` | Yes | — |
| `USR-7M3KPQ-M` | Yes | — |
| `TKT-2R7W9D-U` | Yes | — |

---

## 3. Namespace G — Governance Registry

**Format:** `<PREFIX>-<NNN>` (e.g., `PRD-003`, `MOD-012`)
**Regex:** `^[A-Z]{3}-[0-9]{3}$`
**Rules:** Sequential, zero-padded, immutable, never reused, registry-controlled.

### 3.1 Prefix Registry

| Prefix | Asset Class | Governed By | Status |
|--------|-------------|-------------|--------|
| **PRD** | Product Record | PRCS 1.5 | ACTIVE |
| **MOD** | Module Record | 5.1 §4 | ACTIVE |
| **ADR** | Architecture Decision Record | 1.4 | RESERVED |
| **STD** | Standard Record | 1.2 | RESERVED |

### 3.2 Product Records (PRD-XXX)

> **Source of truth:** `registries/products.json` — auto-rendered by `render-registry.mjs`

<!-- BEGIN:PRODUCTS -->
| ID | Product Name | PCL Code | Domain Tags | Criticality | Owner | Status |
|----|-------------|----------|-------------|-------------|-------|--------|
| *(none registered yet — add to `registries/products.json`)* | | | | | | |

**Total:** 0 products
<!-- END:PRODUCTS -->

> **Instructions:** Populate per PRCS 1.5. PCL = `PCL-{Layer}.{Delivery}.{Extensibility}.{Criticality}`. Every product MUST be registered before production use.

### 3.3 Module Records (MOD-XXX)

> **Source of truth:** `registries/modules.json` — auto-rendered by `render-registry.mjs`

<!-- BEGIN:MODULES -->
| ID | Slug | Name | Scope | Reusability | Stability | Owner | Source Std |
|----|------|------|-------|-------------|-----------|-------|-----------|
| MOD-001 | `identity` | Identity Module | Core | Global | Stable | Engineering | 2.3 |
| MOD-002 | `authentication` | Authentication Module | Core | Global | Stable | Engineering | 2.3 |
| MOD-003 | `authorization` | Authorization Module | Core | Global | Stable | Engineering | 2.4 |
| MOD-004 | `api-gateway` | API Gateway Module | Platform | Global | Stable | Engineering | 5.2 |
| MOD-005 | `identifier` | Identifier Module | Core | Global | Stable | Engineering | 5.1 |
| MOD-006 | `data-classification` | Data Classification Module | Core | Global | Stable | Engineering | 3.3 |
| MOD-007 | `soft-delete` | Soft-Delete Module | Core | Global | Stable | Engineering | 3.5 |
| MOD-008 | `records-management` | Records Management Module | Governance | Global | Stable | Engineering | 3.8 |
| MOD-009 | `audit-log` | Audit Log Module | Core | Global | Stable | Engineering | 4.5 |
| MOD-010 | `multi-tenancy` | Multi-Tenancy Module | Platform | Global | Stable | Engineering | 3.4 |
| MOD-011 | `logging` | Logging Module | Platform | Global | Stable | SRE | 4.5 |
| MOD-012 | `metrics` | Metrics Module | Platform | Global | Stable | SRE | 4.5 |
| MOD-013 | `tracing` | Tracing Module | Platform | Global | Stable | SRE | 4.5 |
| MOD-014 | `alerting` | Alerting Module | Platform | Global | Stable | SRE | 4.5 |
| MOD-015 | `health-check` | Health Check Module | Platform | Global | Stable | SRE | 4.4 |
| MOD-016 | `cryptography` | Cryptography Module | Core | Global | Stable | Security | 2.5 |
| MOD-017 | `secret-management` | Secret Management Module | Core | Global | Stable | Security | 2.5 |
| MOD-018 | `input-validation` | Input Validation Module | Core | Global | Stable | Security | 2.2 |
| MOD-019 | `rate-limiting` | Rate Limiting Module | Platform | Global | Stable | Engineering | 5.2 |
| MOD-020 | `security-headers` | Security Headers Module | Core | Global | Stable | Security | 2.2 |
| MOD-021 | `webhook` | Webhook Module | Integration | Global | Stable | Engineering | 5.3 |
| MOD-022 | `notification` | Notification Module | Domain | Global | Stable | Engineering | 4.3 |
| MOD-023 | `email` | Email Module | Integration | Global | Stable | Engineering | 2.3 |
| MOD-024 | `file-upload` | File Upload Module | Domain | Global | Stable | Engineering | 5.2 |
| MOD-025 | `incident-management` | Incident Management Module | Governance | Global | Stable | SRE | 4.3 |
| MOD-026 | `change-management` | Change Management Module | Governance | Global | Stable | Engineering | 5.7 |
| MOD-027 | `feature-flag` | Feature Flag Module | Platform | Global | Stable | Engineering | 5.6 |
| MOD-028 | `backup` | Backup Module | Platform | Global | Stable | SRE | 4.2 |

**Total:** 28 modules registered
<!-- END:MODULES -->

---

## 4. Namespace M — Module Anatomy Quick Reference

**Component pattern:** `{descriptor}.{type}.{ext}`
**Directory:** `modules/{slug}/src/...`

### 4.1 Architectural Types

| Suffix | Purpose |
|--------|---------|
| `.service` | Business logic |
| `.controller` | HTTP/route handlers |
| `.repository` | Data access |
| `.adapter` | External system integration |
| `.provider` | Dependency injection / factory |
| `.guard` | Access control middleware |
| `.middleware` | Request/response pipeline |
| `.handler` | Event/message handlers |
| `.validator` | Input/schema validation |
| `.transformer` | Data transformation |
| `.engine` | Rule/workflow engine |
| `.gateway` | External service gateway |

### 4.2 UI Types

| Suffix | Purpose |
|--------|---------|
| `.page` | Full page component |
| `.layout` | Layout wrapper |
| `.form` | Form component |
| `.dialog` | Modal/dialog |
| `.card` | Card component |
| `.list` | List component |
| `.table` | Table component |
| `.chart` | Chart/visualization |
| `.widget` | Self-contained widget |
| `.panel` | Panel/sidebar |

### 4.3 Supporting Types

| Suffix | Purpose |
|--------|---------|
| `.types` | Type definitions |
| `.dto` | Data transfer objects |
| `.constants` | Constants/enums |
| `.config` | Configuration |
| `.utils` | Utility functions |
| `.test` | Unit test |
| `.integration.test` | Integration test |
| `.mock` | Test mock |
| `.factory` | Test data factory |

---

## 5. UUID-to-CC-PID Crosswalk

**Rule:** UUIDv7 = internal PK (NEVER exposed). CC-PID = external label (NEVER used for auth).

> **Source of truth:** `registries/entity-codes.json` (ccpidStatus field) — auto-rendered by `render-registry.mjs`

<!-- BEGIN:UUID_CROSSWALK -->
| Entity | CC-PID Code | UUID Column | CC-PID Column | CC-PID Status |
|--------|-------------|-------------|---------------|---------------|
| Project | PRJ | `id` (UUIDv7) | `public_id` | COMPLETE |
| Task | TSK | `id` (UUIDv7) | `public_id` | COMPLETE |
| Milestone | MLN | `id` (UUIDv7) | `public_id` | COMPLETE |
| Deliverable | DLV | `id` (UUIDv7) | `public_id` | COMPLETE |
| Invoice | INV | `id` (UUIDv7) | `public_id` | COMPLETE |
| User | USR | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Notification | NTF | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Message | MSG | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Activity | ACT | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Team Member | TMB | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Session | SES | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Audit Event | AUD | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Time Entry | TEN | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Role | RLE | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Permission | PRM | `id` (UUIDv7) | `public_id` | MIGRATION READY |
| Client | CLT | `id` (UUIDv7) | `public_id` | PENDING |
| Organization / Account | ACC | `id` (UUIDv7) | `public_id` | PENDING |
| Contact | CON | `id` (UUIDv7) | `public_id` | PENDING |
| Address | ADR | `id` (UUIDv7) | `public_id` | PENDING |
| Support Ticket | TKT | `id` (UUIDv7) | `public_id` | PENDING |
| Comment | COM | `id` (UUIDv7) | `public_id` | PENDING |
| Board | BRD | `id` (UUIDv7) | `public_id` | PENDING |
| Column | COL | `id` (UUIDv7) | `public_id` | PENDING |
| Card | CRD | `id` (UUIDv7) | `public_id` | PENDING |
| Sprint / Iteration | SPR | `id` (UUIDv7) | `public_id` | PENDING |
| Benchmark | BEN | `id` (UUIDv7) | `public_id` | PENDING |
| Phase | PHZ | `id` (UUIDv7) | `public_id` | PENDING |
| Payment | PAY | `id` (UUIDv7) | `public_id` | PENDING |
| Subscription | SUB | `id` (UUIDv7) | `public_id` | PENDING |
| Plan | PLN | `id` (UUIDv7) | `public_id` | PENDING |
| Quote | QTE | `id` (UUIDv7) | `public_id` | PENDING |
| Estimate | EST | `id` (UUIDv7) | `public_id` | PENDING |
| Transaction | TXN | `id` (UUIDv7) | `public_id` | PENDING |
| Price / Rate | PRC | `id` (UUIDv7) | `public_id` | PENDING |
| Discount / Coupon | DSC | `id` (UUIDv7) | `public_id` | PENDING |
| Document | DOC | `id` (UUIDv7) | `public_id` | PENDING |
| Page | PGS | `id` (UUIDv7) | `public_id` | PENDING |
| File | FLE | `id` (UUIDv7) | `public_id` | PENDING |
| Folder | FDR | `id` (UUIDv7) | `public_id` | PENDING |
| Template | TMP | `id` (UUIDv7) | `public_id` | PENDING |
| Form | FRM | `id` (UUIDv7) | `public_id` | PENDING |
| Signature Request | SIG | `id` (UUIDv7) | `public_id` | PENDING |
| Attachment | ATT | `id` (UUIDv7) | `public_id` | PENDING |
| Tag | TAG | `id` (UUIDv7) | `public_id` | PENDING |
| Token | TOK | `id` (UUIDv7) | `public_id` | PENDING |
| API Key Record | API | `id` (UUIDv7) | `public_id` | PENDING |
| Log Entry | LOG | `id` (UUIDv7) | `public_id` | PENDING |
| Background Job | JOB | `id` (UUIDv7) | `public_id` | PENDING |
| Webhook | WEB | `id` (UUIDv7) | `public_id` | PENDING |
| Integration | INT | `id` (UUIDv7) | `public_id` | PENDING |
| Environment | ENV | `id` (UUIDv7) | `public_id` | PENDING |
| Policy | POL | `id` (UUIDv7) | `public_id` | PENDING |
<!-- END:UUID_CROSSWALK -->

---

## 6. Project Registry

Projects are CC-PID entities (PRJ) and optionally linked to Product Records (PRD-XXX) and WOE items.

> **Source of truth:** `registries/projects.json` — auto-rendered by `render-registry.mjs`

<!-- BEGIN:PROJECTS -->
| CC-PID | Project Name | Product (PRD) | Domain Code | Classification | WOE Prefix | Status |
|--------|-------------|---------------|-------------|----------------|------------|--------|
| *(none registered yet — add to `registries/projects.json`)* | | | | | | |
<!-- END:PROJECTS -->

> **Instructions:** Each project gets a CC-PID at creation (auto-generated). Link to PRD-XXX if the project builds a registered product. WOE prefix = the `PARENT-SUB` used for internal work items in the tracker.

---

## 7. Lookup Guide

### By identifier type — "I have an ID, what is it?"

| Pattern | Namespace | What It Is | Where to Look |
|---------|-----------|-----------|----------------|
| `XXX-XXXXXX-X` | B (CC-PID) | Public entity ID | §2 Entity Code Registry → match first 3 chars |
| `PRD-NNN` | G (Governance) | Product record | §3.2 Product Records |
| `MOD-NNN` | G (Governance) | Module record | §3.3 Module Records |
| `XX-YY-NNNN` | A (WOE) | Internal work item | §1.2 WOE Prefixes → Jira/GitHub/Linear |
| `XX-YY_Name_vN.N.N_DATE_ENV.ext` | A (Artifact) | Build/deploy artifact | §1.1 Crosswalk → find PARENT-SUB |
| `UUIDv7` | Internal PK | Database primary key | §5 UUID Crosswalk → find entity |

### By purpose — "I need to create an ID for..."

| Purpose | Namespace | Format | Generator |
|---------|-----------|--------|-----------|
| New database entity visible to users | B | `<ENTITY>-<TOKEN>-<CHK>` | `PublicIdService.generate()` |
| New product registration | G | `PRD-NNN` | Registry authority (sequential) |
| New module registration | G | `MOD-NNN` | Registry authority (sequential) |
| New internal work item | A | `<PARENT>-<SUB>-<SEQ>` | Tracker (Jira/GitHub/Linear) |
| New build/deploy artifact | A | Full artifact pattern | CI/CD pipeline |
| Internal DB primary key | — | UUIDv7 | Database/ORM auto-generation |

---

## 8. Governance

### Adding a new entity code (Namespace B)

1. Verify no existing code covers the entity
2. Choose 3-letter code (unique, descriptive, not easily confused)
3. Submit for platform governance review
4. Add entry to `registries/entity-codes.json`
5. Also update `api/shared/entity-codes.ts` (runtime code)
6. Run `node registries/validate-registry.mjs`
7. Run `node registries/render-registry.mjs`
8. Commit JSON + markdown together
9. Codes are NEVER reused (even if deprecated)

### Adding a new module (Namespace G/M)

1. Architecture review required
2. Add entry to `registries/modules.json` with next sequential `MOD-NNN`
3. Assign immutable kebab-case slug
4. Fill all mandatory fields (scope, reusability, stability, owner, sourceStandard)
5. Run `node registries/validate-registry.mjs`
6. Run `node registries/render-registry.mjs`
7. Commit JSON + markdown together

### Adding a new product (Namespace G)

1. Per PRCS 1.5 requirements
2. Add entry to `registries/products.json` with next sequential `PRD-NNN`
3. Assign PCL code (`PCL-L.D.E.C`) and domain tags
4. Fill all mandatory fields (name, owner, status)
5. Run `node registries/validate-registry.mjs`
6. Run `node registries/render-registry.mjs`
7. Commit JSON + markdown together

### Adding a new project

1. Generate CC-PID via PublicIdService (or note from app)
2. Add entry to `registries/projects.json`
3. Link to `PRD-NNN` if the project builds a registered product
4. Run `node registries/validate-registry.mjs`
5. Run `node registries/render-registry.mjs`
6. Commit JSON + markdown together

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| 5.1 Naming & Identifier Standard v1.2 | Source standard (all namespace definitions) |
| 1.5 Product Registry & Classification (PRCS) | PRD-XXX records, PCL classification |
| 1.4 Architecture Governance | Module registration triggers arch review |
| 5.2 API Design Standard | CC-PID in REST endpoints |
| 3.5 Soft-Delete Lifecycle | 410 Gone for deprecated CC-PIDs |
| 5.3 Webhooks & Integrations | CC-PID in webhook payloads |
| Reusable modules list.md | Source for MOD-001 through MOD-028 |
