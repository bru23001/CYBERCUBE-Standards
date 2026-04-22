# CYBERCUBE Standards Portfolio — Audit Report v1

**Status:** Draft — Pass 1 + Pass 2 complete
**Pending passes:** Pass 3 (Friction Audit), Pass 4 (Scenario Integration Test)
**Scope:** All 45 top-level standards at repo root (`[1]-…` through `[45]-…`). `registries/` and other subfolders excluded.

---

## 0. How to Read This Report

This Pass 1 output is **structural only**. It maps what exists, where content overlaps, and where content is missing. It does **not** rate, tier, or rewrite any standard — that work comes in Passes 2–4.

Three deliverables below:
1. **Coverage Heatmap** — Standard × Lifecycle Phase × Concern.
2. **Overlap Register** — exact duplicated topics across multiple standards.
3. **Gap Register** — domains not adequately covered by any existing standard.

---

## 1. Portfolio At a Glance

| Metric | Value |
|---|---|
| Total standards reviewed | 45 |
| Total normative lines (approx.) | ~63,000 |
| Largest single doc | [33]-STD-ENG-008 Reusable Modules (~4,600 lines) |
| Smallest single doc | [6]-STD-GOV-003 Policy Exception (~427 lines) |
| Docs with `high` normative density | 33 / 45 (73%) |
| Docs with explicit owner | 38 / 45 (84%) |
| Docs lacking a declared owner | [16] TPL-LGL-001, [30] STD-ENG-007, [32] STD-ENG-003, [35] STD-ENG-005, [37] STD-ENG-006, [39] STD-OPS-005, [41]/[42] — partial (SRE/Platform named generically) |
| External frameworks most cited | SOC2, ISO 27001, GDPR, NIST (CSF + SP800 series), OWASP, PCI DSS |

**Immediate observation:** The portfolio is large (~63k lines of normative text). Even if every rule were necessary, a new project would need weeks just to *read* the canon. This will be the central tension Pass 2/3 must resolve.

---

## 2. Coverage Heatmap — Standard × Lifecycle Phase

Legend: `X` = primary concern, `·` = touches but not primary, blank = not in scope.

| # | Doc | Plan | Design | Build | Test | Release | Run | Retire |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | Name-Registry | X | X | X | X | X | X | X |
| 2 | POL-GOV-001 Standards Gov | X | X | X | X | X | X | X |
| 3 | POL-GOV-002 Architecture Gov | X | X | X | X | X | X | X |
| 4 | FWK-GOV-001 Framework Compliance | X | X | X | X | X | X | · |
| 5 | STD-GOV-001 Product Registry (PRCS) | X | X | X | X | X | X | X |
| 6 | STD-GOV-003 Exception/Waiver | X | · | · | · | · | X | · |
| 7 | STD-GOV-006 Unified Control Matrix | X | X | X | X | X | X | X |
| 8 | STD-ERM-001 ERM Policy | X | X | X | X | X | X | X |
| 9 | POL-VEN-001 Vendor Risk | X | X | X | X | X | X | X |
| 10 | POL-AUP-001 Acceptable Use | · | · | · | · | · | X | X |
| 11 | POL-AI-001 AI Usage & Ethics | X | X | X | X | X | X | · |
| 12 | POL-PRI-001 Privacy (public) | · | · | · | · | · | X | · |
| 13 | POL-PRI-002 Privacy Handling | X | · | · | · | · | X | · |
| 14 | POL-REC-001 Records Mgmt | · | · | · | · | · | X | X |
| 15 | STD-LGL-001 Legal Hold | · | · | · | · | · | X | · |
| 16 | TPL-LGL-001 DPA Template | X | · | X | · | · | X | X |
| 17 | STD-SEC-001 Security Policy | X | X | X | X | X | X | X |
| 18 | STD-SEC-003 AuthN | · | X | X | X | X | X | · |
| 19 | STD-SEC-004 AuthZ | X | X | X | X | X | X | · |
| 20 | STD-SEC-005 Crypto/KMS | X | X | X | X | X | X | X |
| 21 | STD-SEC-002 Secure Coding | · | X | X | X | X | X | · |
| 22 | STD-SEC-006 Vuln Mgmt | X | · | X | X | X | X | · |
| 23 | STD-SEC-007 Sec Incident | · | · | · | · | · | X | · |
| 24 | STD-SEC-008 Sec Training | X | · | · | · | · | X | X |
| 25 | STD-DAT-001 Data Class/Retention | X | X | X | · | · | X | X |
| 26 | STD-DAT-002 Soft-Delete Lifecycle | · | X | X | X | X | X | X |
| 27 | STD-DAT-004 Tenant Isolation | X | X | X | X | X | X | · |
| 28 | STD-ENG-009 Tech Stack | X | X | X | X | X | X | · |
| 29 | STD-ENG-001 Naming/Identifiers | X | X | X | X | X | X | X |
| 30 | STD-ENG-007 Docs/RFC | X | X | X | X | X | X | X |
| 31 | STD-ENG-002 API Design | · | X | X | X | X | X | · |
| 32 | STD-ENG-003 Webhooks | · | X | X | X | X | X | · |
| 33 | STD-ENG-008 Reusable Modules | X | X | X | X | X | X | · |
| 34 | STD-ENG-004 IaC | X | X | X | X | X | X | · |
| 35 | STD-ENG-005 Testing/QA | · | · | X | X | X | · | · |
| 36 | POL-ENG-001 Change Mgmt | X | · | · | X | X | X | · |
| 37 | STD-ENG-006 Release/Deploy | · | · | X | X | X | X | · |
| 38 | STD-OPS-003 Observability | · | · | X | · | · | X | · |
| 39 | STD-OPS-005 SRE | X | X | X | X | X | X | · |
| 40 | STD-SLP-001 Service Level | X | · | · | · | X | X | · |
| 41 | STD-OPS-004 Incident Response | · | · | · | X | · | X | · |
| 42 | STD-OPS-002 Backup/DR | X | · | · | X | · | X | · |
| 43 | PLN-OPS-001 BCP | X | · | · | X | · | X | · |
| 44 | STD-GOV-004 Internal Audit | X | · | · | · | · | X | · |
| 45 | STD-GOV-005 Metrics/KRIs | X | · | · | X | · | X | · |

**Phase balance (primary-coverage counts):**

| Phase | # docs primary | Notes |
|---|---|---|
| Plan | 24 | heavy — governance/policy dominant |
| Design | 18 | solid |
| Build | 22 | solid |
| Test | 19 | solid |
| Release | 17 | solid |
| Run | 42 | **over-concentrated** — almost every doc is about run-time ops/compliance |
| Retire | 12 | **light** — only records, privacy, lifecycle, naming, ERM cover end-of-life |

> **Finding 2.1** Portfolio skews heavily to **Run** phase (operations + compliance). **Retire** is thin: decommissioning of products, data, vendors, access, and keys is scattered across 4–5 docs with no single canonical offboarding/decommission standard.

---

## 3. Coverage Heatmap — Standard × Concern Domain

Concerns: Sec (Security) · Data · Priv (Privacy) · Ops · Gov (Governance) · Lgl (Legal) · Eng (Engineering) · Risk · HR

| Concern | Primary docs | Count |
|---|---|---|
| **Security** | 17, 18, 19, 20, 21, 22, 23, 24, 27 | 9 |
| **Data** | 25, 26, 27 | 3 |
| **Privacy** | 12, 13, 16 | 3 |
| **Ops** | 38, 39, 40, 41, 42, 43 | 6 |
| **Governance** | 1, 2, 3, 4, 5, 6, 7, 44, 45 | 9 |
| **Legal** | 14, 15, 16 | 3 |
| **Engineering** | 28, 29, 30, 31, 32, 33, 34, 35, 36, 37 | 10 |
| **Risk** | 8, 9 | 2 |
| **HR** | 10 (partial), 24 (partial), 43 (partial) | 0 dedicated |

> **Finding 3.1** No dedicated HR/People standard. Acceptable Use (10), Security Training (24) and Business Continuity (43) each cover a slice, but onboarding, access provisioning/deprovisioning lifecycle, separation of duties, and background-check expectations are fragmented.

---

## 4. Overlap Register

Each row lists a topic and every standard that contains normative clauses on it. **"Primary home"** proposes where the canonical rule should live; others should reference, not redefine.

| # | Topic | Docs with overlapping clauses | Proposed Primary Home | Overlap Severity |
|---|---|---|---|---|
| O-01 | **Exceptions / Waivers / Deviations** | [2] §8, [3] §4 (Deviations), [6] entire doc | [6] STD-GOV-003 | **HIGH** — three parallel processes |
| O-02 | **Naming / Identifiers (CC-PID, PRD, MOD)** | [1] Name-Registry, [29] STD-ENG-001, [5] PRCS | [29] STD-ENG-001 (authoritative rules), [1] as registry index | HIGH — content partly duplicated |
| O-03 | **Product/Project classification (PRCS, PCL, domain tags)** | [1] Name-Registry §3, [5] STD-GOV-001 | [5] STD-GOV-001 | MEDIUM |
| O-04 | **Incident response (security vs operational)** | [23] STD-SEC-007, [41] STD-OPS-004, [43] PLN-OPS-001 activation | Two-doc split is justified; consolidate severity matrix into [7] UCM cross-ref | MEDIUM |
| O-05 | **Tenant isolation / cross-tenant access** | [19] STD-SEC-004 §7, [27] STD-DAT-004 §3, [38] STD-OPS-003 §2 (logging redaction) | [27] STD-DAT-004 | HIGH |
| O-06 | **Encryption at rest / key lifecycle / secrets** | [20] STD-SEC-005, [21] STD-SEC-002 §7 (Secrets), [25] STD-DAT-001, [33] STD-ENG-008 module ICDs | [20] STD-SEC-005 | HIGH |
| O-07 | **Password hashing / session tokens** | [18] STD-SEC-003, [20] STD-SEC-005, [21] STD-SEC-002 | [18] STD-SEC-003 | MEDIUM |
| O-08 | **Dependency management / SCA / SAST** | [21] STD-SEC-002 §6, [22] STD-SEC-006, [35] STD-ENG-005 quality gates, [37] STD-ENG-006 pipelines | [22] STD-SEC-006 (policy), [35]/[37] (enforcement hooks) | MEDIUM |
| O-09 | **Change management + release + CAB** | [3] POL-GOV-002 §3, [36] POL-ENG-001, [37] STD-ENG-006 §6 | [36] POL-ENG-001 | MEDIUM |
| O-10 | **SLO / error budget / SLA** | [39] STD-OPS-005 §1, [40] STD-SLP-001, [35] STD-ENG-005 (perf targets) | [40] STD-SLP-001 (customer-facing), [39] STD-OPS-005 (internal SLO practice) | MEDIUM |
| O-11 | **Retention schedules & disposition** | [14] POL-REC-001, [25] STD-DAT-001, [13] POL-PRI-002, [16] TPL-LGL-001 | [25] STD-DAT-001 (technical schedules), [14] POL-REC-001 (business records) — split is defensible but must cross-ref explicitly | MEDIUM |
| O-12 | **Legal hold / preservation** | [15] STD-LGL-001, [14] POL-REC-001, [25] STD-DAT-001, [26] STD-DAT-002 §4 | [15] STD-LGL-001 | LOW |
| O-13 | **Breach notification (privacy vs security)** | [13] POL-PRI-002, [23] STD-SEC-007, [43] PLN-OPS-001, [25] STD-DAT-001 | [23] STD-SEC-007 (process), [13] POL-PRI-002 (regulatory triggers) | MEDIUM |
| O-14 | **Vendor/third-party risk** | [9] POL-VEN-001, [8] STD-ERM-001 (vendor risk category), [16] TPL-LGL-001 (DPA terms) | [9] POL-VEN-001 | LOW |
| O-15 | **AI usage constraints** | [11] POL-AI-001, [10] POL-AUP-001 (tool use), [13] POL-PRI-002 (data in AI) | [11] POL-AI-001 | LOW |
| O-16 | **Observability / logging / PII redaction** | [38] STD-OPS-003, [21] STD-SEC-002, [25] STD-DAT-001, [33] STD-ENG-008 module ICDs | [38] STD-OPS-003 | MEDIUM |
| O-17 | **ADR / RFC / documentation structure** | [3] POL-GOV-002 §2 (ADR), [30] STD-ENG-007 | [30] STD-ENG-007 | LOW |
| O-18 | **Backup/DR vs BCP** | [42] STD-OPS-002, [43] PLN-OPS-001, [39] STD-OPS-005 resilience | [42] (technical DR), [43] (organizational BCP) — boundary is correct but cross-refs use wrong ID in [42] | LOW |
| O-19 | **Metrics / KRIs / dashboards** | [45] STD-GOV-005, [39] STD-OPS-005, [40] STD-SLP-001, [8] STD-ERM-001 §9 | [45] STD-GOV-005 (registry), others define the metrics themselves | MEDIUM |
| O-20 | **Control catalog / framework mapping** | [7] STD-GOV-006 (UCM), per-doc Control Matrix appendices in most SEC/DAT/OPS docs | [7] STD-GOV-006 | MEDIUM — per-doc matrices risk drift |

**Overlap summary:** 20 meaningful overlaps; 4 HIGH severity. High-severity overlaps (O-01, O-02, O-05, O-06) each involve ≥3 documents with parallel normative text and are the top candidates for Pass 2/3 consolidation.

---

## 5. Gap Register

Domains/topics not adequately covered by any of the 45 existing standards. Each entry lists impact, suggested owner, and proposed home (new doc or absorb into existing).

| # | Gap | Why it matters | Suggested Owner | Proposed Home |
|---|---|---|---|---|
| G-01 | **Frontend / UX engineering standard** (component architecture, state mgmt, bundling, perf budgets, CSP) | Most CYBERCUBE work is web/app; no rule for FE quality. [4] FWK-GOV-001 is outcome-oriented (CYBERCUBE letters), not engineering-normative. | Engineering Lead | New STD-ENG-010 Frontend Standard |
| G-02 | **Accessibility (WCAG) standard** | WCAG is only mentioned incidentally in [33] modules and [4] FWK-GOV-001 scoring. No normative A11y targets, audit cadence, or CI check. | Engineering + Legal | New STD-ENG-011 Accessibility, or merge into G-01 |
| G-03 | **Internationalization / localization** | Zero coverage. Multi-market CYBERCUBE projects need string extraction, locale handling, RTL, date/number/currency rules. | Engineering Lead | New STD-ENG-012 i18n |
| G-04 | **Mobile (iOS/Android) standard** | Tech Stack ([28]) names mobile frameworks but no mobile-specific security, store submission, or OTA rules. | Engineering + Security | New STD-ENG-013 Mobile, or section in [28] |
| G-05 | **ML / AI engineering (MLOps)** | [11] POL-AI-001 is ethics/usage. No MLOps standard: model registry, eval, versioning, drift monitoring, training data lineage, feature store. | AI Lead + Engineering | New STD-ENG-014 MLOps |
| G-06 | **Data engineering / ETL / analytics lineage** | Data standards cover classification/retention/deletion but not pipelines, warehouse modelling, or lineage. | Data Lead | New STD-DAT-005 Data Engineering |
| G-07 | **Performance & capacity engineering** | Performance targets appear in [35] testing and [39] SRE but no load/stress/capacity-planning standard. | SRE | Extend [39] STD-OPS-005 or new STD-OPS-006 |
| G-08 | **FinOps / cloud cost** | No cost governance: tagging, budget alerts, showback, rightsizing. | Finance + Platform Eng | New STD-OPS-007 FinOps |
| G-09 | **DevEx / local dev environment / SDK policy** | No standard for devcontainers, local secrets, onboarding time-to-first-commit, SDK/CLI quality. | Engineering Lead | New STD-ENG-015 DevEx |
| G-10 | **Open-source licensing / dependency policy** | License obligations, SBOM, third-party code ingestion rules are implicit only. [22] vuln mgmt touches dependencies but not licensing. | Legal + Engineering | New STD-LGL-002 OSS & SBOM |
| G-11 | **Browser/client-side security (CSP, SRI, cookies, CORS)** | Referenced only inside other docs. No canonical rule set. | Security + Frontend | Section in G-01 or STD-SEC-009 |
| G-12 | **Email / messaging / notification standard** | Transactional email, SPF/DKIM/DMARC, unsubscribe, delivery SLAs, localization all uncovered. | Platform Eng | New STD-ENG-016 Notifications |
| G-13 | **HR / Workforce lifecycle** (joiner-mover-leaver, SoD, background checks) | Fragmented across [10], [24], [43]; no authoritative J/M/L standard. | HR + Security | New POL-HR-001 |
| G-14 | **Product decommission / sunset** | Retire phase is thin. No standard for customer notification, data export, final retention, registry updates, vendor offboarding interplay. | Product + Engineering | New STD-GOV-007 Product Retirement |
| G-15 | **Environmental / sustainability** | Modern RFP requirement (carbon, efficiency). Absent. | Platform Eng | Optional new POL-ESG-001 |
| G-16 | **Data portability / customer data export** | Hinted at in [13] POL-PRI-002 (DSAR), but no engineering standard for export formats, SLAs, or retention after export. | Data + Engineering | Section in [25] or new STD-DAT-006 |
| G-17 | **Third-party API consumption (outbound)** | [32] STD-ENG-003 is webhooks/integrations. Outbound client reliability patterns (circuit breakers, quotas, vendor health) are thin. | Engineering Lead | Extend [32] |
| G-18 | **Public API versioning + deprecation lifecycle for customers** | [31] covers design + versioning, but external deprecation communication, sunset headers, and migration SLAs are implicit. | Engineering + Product | Extend [31] §§ 7–9 |
| G-19 | **Tabletop exercises / chaos engineering cadence** | [39] mentions resilience; [42] mentions restore testing; [41]/[43] mention drills. No unified exercise calendar. | SRE | Section in [39] |
| G-20 | **Model of applicability per project size** | No "which standards apply to which project tier" tiering. All 45 apply to all projects by default — the core problem this audit exists to solve. | Standards Council | New STD-GOV-008 Applicability Tiering (or insert into [2] POL-GOV-001) |

**Gap summary:** 20 gaps identified; the highest-leverage are **G-01 (Frontend)**, **G-02 (Accessibility)**, **G-10 (OSS/SBOM)**, **G-13 (HR J/M/L)**, **G-14 (Decommission)**, and **G-20 (Applicability Tiering)**. G-20 is the meta-gap and should be addressed before creating new standards to avoid expanding the compliance surface.

---

## 6. Cross-Cutting Observations

1. **Cross-reference IDs are inconsistent.** Multiple docs cite standards by mixed schemes: chapter numbers (e.g. "2.1 Security Policy"), canonical IDs (e.g. "STD-SEC-001"), or historic/wrong IDs (e.g. [42] references BCP as "STD-OPS-001"; [8] uses "POL-ERM-001" instead of "STD-ERM-001"). Creates brittle linkage.
2. **Each SEC/DAT/OPS doc carries its own Control Matrix appendix**, while [7] STD-GOV-006 is the Unified Control Matrix. Risk of drift unless [7] is declared the sole source of truth and per-doc matrices become generated views.
3. **Owner assignment is inconsistent.** 7 of 45 docs have no owner or only a team-level owner; this undermines [2] POL-GOV-001's own requirement that every standard have a named accountable owner.
4. **Normative density is high across the board.** 73% of docs self-classify as high density. Without applicability tiering (G-20), the default compliance surface is ~63k lines — infeasible for small projects.
5. **Registries and controlled vocabularies are duplicated in prose.** [1] Name-Registry, [5] PRCS facets, [33] module registry, [7] UCM, [45] metrics registry, [9] vendor registry — all live inside markdown rather than a machine-readable source. The `registries/` folder exists but is not referenced as canonical by most docs.

---

## 7. Pass 1 — Conclusions

1. The portfolio is **wide enough for security, data, ops, and governance** — those domains are over-covered rather than under-covered.
2. The portfolio has **real gaps on the engineering-execution side** (frontend, accessibility, i18n, mobile, FinOps, DevEx, OSS) and on **workforce lifecycle** and **product decommission**.
3. Overlap, not under-coverage, is the dominant risk. Four HIGH-severity overlaps alone consolidate into [6], [18]/[20], [27], and [29] respectively.
4. Before any new standard is written (Gaps), the portfolio needs **applicability tiering** (G-20). Otherwise new standards compound the "un-followable" problem.
5. The report is ready for Pass 2 (Tiering): rank every clause MUST/SHOULD/MAY per project tier, starting with the 4 HIGH-overlap clusters and the governance meta-docs.

---

## 8. Next Actions (before Pass 2)

- [ ] Confirm the 4 HIGH overlaps (O-01, O-02, O-05, O-06) as the Pass 2 priority set.
- [ ] Confirm G-20 (Applicability Tiering) as the first structural change (ahead of any new standard).
- [ ] Fix cross-reference ID drift portfolio-wide (mechanical cleanup, candidate for a separate ticket).
- [ ] Declare [7] STD-GOV-006 UCM as the single source of truth for control-to-framework mapping and deprecate per-doc matrices (policy change in [2] POL-GOV-001).

---

# PASS 2 — CLAUSE TIERING

Each standard was classified section-level (not per sentence) into three tiers of applicability:

- **T1 MUST** — every CYBERCUBE project, no exception.
- **T2 SHOULD** — standard customer-facing / SaaS projects; internal tools may skip with lightweight waiver.
- **T3 MAY** — high-risk / regulated projects only (PII at scale, payments, multi-tenant, safety-critical).

## 9. Tier Mix — All 45 Standards

| # | Doc | T1 | T2 | T3 | Outlier Flag | Recommendation |
|---|---|:-:|:-:|:-:|---|---|
| 1 | Name-Registry | 40 | 45 | 15 | under-scoped | Merge-with [5] |
| 2 | POL-GOV-001 Standards Gov | 40 | 45 | 15 | duplicative | Trim |
| 3 | POL-GOV-002 Architecture Gov | 35 | 45 | 20 | over-scoped | Rewrite |
| 4 | FWK-GOV-001 Framework Compliance | **15** | 55 | 30 | **aspirational (no T1)** | Split |
| 5 | STD-GOV-001 PRCS | 45 | 35 | 20 | over-scoped | Trim |
| 6 | STD-GOV-003 Exception/Waiver | 50 | 35 | 15 | duplicative | Merge-with [2] |
| 7 | STD-GOV-006 UCM | 30 | 40 | 30 | over-scoped | Keep |
| 8 | STD-ERM-001 ERM | 55 | 30 | 15 | none | Trim |
| 9 | POL-VEN-001 Vendor Risk | 35 | 40 | 25 | over-scoped | Split |
| 10 | POL-AUP-001 Acceptable Use | 55 | 32 | 13 | none | Keep |
| 11 | POL-AI-001 AI Usage | 28 | 47 | 25 | aspirational | Trim |
| 12 | POL-PRI-001 Privacy (public) | **18** | 62 | 20 | under-scoped | Trim |
| 13 | POL-PRI-002 Privacy Handling | 48 | 35 | 17 | over-scoped | Merge (with IR/DPA) |
| 14 | POL-REC-001 Records Mgmt | 42 | 45 | 13 | none | Keep |
| 15 | STD-LGL-001 Legal Hold | 32 | 38 | 30 | **over-reach** | Split |
| 16 | TPL-LGL-001 DPA Template | 52 | 33 | 15 | none | Keep |
| 17 | STD-SEC-001 Security Policy | 30 | 55 | 15 | over-scoped | Keep (tier) |
| 18 | STD-SEC-003 AuthN | 40 | 45 | 15 | aspirational | Keep (split T1/T2) |
| 19 | STD-SEC-004 AuthZ | 35 | 50 | 15 | over-scoped | Merge with [27] on RLS |
| 20 | STD-SEC-005 Crypto/KMS | 25 | 50 | 25 | **over-reach** | Keep (tier) |
| 21 | STD-SEC-002 Secure Coding | 45 | 50 | 5 | none | Keep |
| 22 | STD-SEC-006 Vuln Mgmt | **20** | 60 | 20 | aspirational | Keep (split) |
| 23 | STD-SEC-007 Sec IR | 25 | 55 | 20 | over-scoped | Keep (split) |
| 24 | STD-SEC-008 Sec Training | 30 | 60 | 10 | disproportionate | Keep (tier) |
| 25 | STD-DAT-001 Data Class/Retention | 30 | 50 | 20 | over-scoped | Merge with [26]/privacy |
| 26 | STD-DAT-002 Soft-Delete | 40 | 50 | 10 | none | Keep |
| 27 | STD-DAT-004 Tenant Isolation | 45 | 40 | 15 | **over-reach** | Keep (tier RLS) |
| 28 | STD-ENG-009 Tech Stack | 35 | 45 | 20 | over-scoped | Split |
| 29 | STD-ENG-001 Naming | **60** | 30 | 10 | over-scoped | Split |
| 30 | STD-ENG-007 Docs/RFC | **70** | 22 | 8 | aspirational | Trim |
| 31 | STD-ENG-002 API Design | 25 | 60 | 15 | none | Merge webhooks |
| 32 | STD-ENG-003 Webhooks | **15** | 72 | 13 | aspirational | Trim |
| 33 | STD-ENG-008 Reusable Modules | 28 | 42 | 30 | over-scoped | Split |
| 34 | STD-ENG-004 IaC | 42 | 45 | 13 | none | Trim |
| 35 | STD-ENG-005 Testing/QA | 38 | 48 | 14 | none | Trim |
| 36 | POL-ENG-001 Change Mgmt | 32 | 48 | 20 | none | Merge with [37] |
| 37 | STD-ENG-006 Release/Deploy | 40 | 47 | 13 | none | Merge with [36] |
| 38 | STD-OPS-003 Observability | 33 | 54 | 13 | none | Trim |
| 39 | STD-OPS-005 SRE | 24 | 52 | 24 | aspirational | Merge with [40]/[41] |
| 40 | STD-SLP-001 Service Level | **12** | 58 | 30 | **over-reach** | Trim |
| 41 | STD-OPS-004 IR | 22 | 56 | 22 | none | Merge with [39] |
| 42 | STD-OPS-002 Backup/DR | 36 | 44 | 20 | none | Trim |
| 43 | PLN-OPS-001 BCP | **18** | 37 | 45 | over-scoped | Trim |
| 44 | STD-GOV-004 Internal Audit | **8** | 32 | 60 | under-scoped | Keep |
| 45 | STD-GOV-005 Metrics/KRIs | **14** | 46 | 40 | aspirational | Trim |
| **Avg** | — | **33** | **46** | **21** | — | — |

**Interpretation of the averages:**
- A typical standard's *real* baseline surface (T1) is only ~33% of its normative content. The remaining ~67% is either SaaS-scale (T2) or regulated-scale (T3).
- If the portfolio were filtered to only T1 clauses, the mandatory compliance surface drops from ~63k lines to ~21k lines — **~3x reduction** — while still covering every domain.

## 10. Outlier Analysis

### 10.1 Over-reach (too much marked MUST)

Standards where too many clauses are framed as universal MUSTs when the content is really SaaS-scale or regulated-scale. Top offenders by T1% × breadth:

| Doc | T1% | Why over-reach | Corrective action |
|---|:-:|---|---|
| [30] STD-ENG-007 Docs/RFC | 70 | Fixed 2-week RFC windows, 30-day breaking-change notice, full docs taxonomy applied uniformly to internal tools | Introduce fast-path for low-risk changes; T1 = "every change has a decision record"; move cadence to T2 |
| [29] STD-ENG-001 Naming | 60 | CC-PID + 4 namespaces mandated even for single-team internal codebases | T1 = artifact + module naming only; CC-PID + governance registry → T2 |
| [15] STD-LGL-001 Legal Hold | 32 T1 but heavy MUSTs | FRCP-style eDiscovery as universal baseline | Split "hold recognition + preserve (T1)" from "eDiscovery/TAR/forensics (T3)" |
| [20] STD-SEC-005 Crypto | 25 T1 but FIPS/HSM framed absolute | HSM + M-of-N ceremony treated as universal | T1 = TLS + strong hash + KMS-for-secrets; HSM/FIPS → T3 |
| [27] STD-DAT-004 Tenant Isolation | 45 | Postgres RLS REQUIRED on all tenant tables regardless of DB engine | Tier RLS by datastore; keep "deny cross-tenant" universal |
| [40] STD-SLP-001 Service Level | 12 | Commercial SLA/credit language risks being treated as universal engineering law | Narrow scope to customer-contracted services only |

### 10.2 Aspirational (too little MUST, or MUST marked PENDING)

Standards that use normative language while `Implementation Status` declares components PENDING, or whose T1 floor is <25% — the standard is effectively recommending, not mandating.

| Doc | T1% | Aspiration symptom |
|---|:-:|---|
| [44] STD-GOV-004 Internal Audit | 8 | Full IA program without a live audit calendar |
| [40] STD-SLP-001 | 12 | SLA credits without contractual anchoring |
| [45] STD-GOV-005 Metrics/KRIs | 14 | Taxonomy without mandated minimums per tier |
| [32] STD-ENG-003 Webhooks | 15 | Most components PENDING |
| [4] FWK-GOV-001 | 15 | Scoring matrix as audit without a scorer |
| [43] PLN-OPS-001 BCP | 18 | BIA + exec comms without executive sponsor ownership |
| [12] POL-PRI-001 | 18 | Placeholder addresses, representatives, cookies |
| [22] STD-SEC-006 Vuln Mgmt | 20 | VDP public disclosure normative but PENDING |
| [41] STD-OPS-004 IR | 22 | Status-page comms without public comms capability |
| [39] STD-OPS-005 SRE | 24 | SLO program without instrumentation commitment |

**Meta-finding:** every "aspirational" flag traces back to missing applicability tiering plus `Implementation Status: PENDING` text inside a document that otherwise uses MUST language. Both problems are solved in the same Pass 2 deliverable (G-20).

### 10.3 Over-scoped

13 docs flagged `over-scoped` — content extends beyond the stated purpose (typical symptom: per-doc Control Matrix appendix duplicating UCM [7]; embedded code samples; cross-domain prose that belongs to another standard).

Primary remediation: move duplicated content to a cross-reference, don't re-state it. This aligns with Pass 1's Overlap Register O-20 ("Control catalog duplication").

### 10.4 Under-scoped

3 docs flagged `under-scoped`: [1] Name-Registry (registry data but no normative rules of its own), [12] POL-PRI-001 (public notice with placeholders), [44] STD-GOV-004 (assurance without authority). Each needs either absorption into a sibling standard or formal completion before they can be enforced.

## 11. Aggregated Clause-Level Issues

Across all 45 docs, **~210 specific clauses** were flagged. Distribution by issue type:

| Issue type | Count | % | Typical remediation |
|---|:-:|:-:|---|
| disproportionate | ~70 | 33% | Demote to T2/T3, add applicability gate |
| duplicative | ~55 | 26% | Replace with cross-reference; designate single source of truth |
| aspirational | ~40 | 19% | Remove from MUST language until `Implementation Status: IN PLACE` |
| unclear | ~30 | 14% | Rewrite with concrete acceptance criteria |
| unenforceable | ~15 | 7% | Either remove or specify a verifiable signal (CI check / audit artifact) |

**Biggest single lever:** resolving the 55 duplicative clauses (26%) eliminates most drift risk and cuts ~15–20% of total normative text without losing coverage.

## 12. Tiering-Based Target State (Preview)

If Pass 2 tiering were enforced today, a typical T1 baseline (applies to ALL projects) would cover:

**T1 baseline set (~14 docs contributing their T1 portion):**
- [2] Standards Gov + [6] Exceptions (consolidated)
- [5] PRCS (registration only)
- [8] ERM (register + classify risks)
- [10] AUP
- [17] Security Policy (floor: TLS, patching, MFA for admin, access review)
- [18] AuthN (password/session basics)
- [19] AuthZ (default deny, tenant scoping)
- [20] Crypto (TLS + approved hashes + KMS)
- [21] Secure Coding (OWASP top risks only)
- [25] Data Classification (labels + retention pointers)
- [26] Soft-Delete (lifecycle states)
- [29] Naming (artifact + module)
- [30] Docs/RFC (lightweight decision record)
- [38] Observability (structured logs + no-secrets-in-logs)

A small internal tool (Scenario A in Pass 4) would have to demonstrate compliance with ~14 lightweight rules — tractable in days, not weeks.

A customer-facing SaaS (Scenario B) would add the T2 clauses from those 14 plus ~20 additional docs.

A regulated flagship (Scenario C) would inherit the full 45.

## 13. Pass 2 — Conclusions

1. **Portfolio is T2/T3-heavy masquerading as T1.** Average T1 mix is 33% — meaning 2/3 of the portfolio is optional for a typical project but is written as mandatory. This is the root cause of the "un-followable" problem.
2. **10 standards are clearly aspirational** (T1% ≤ 24 while using MUST language with PENDING status). These undermine the credibility of the entire portfolio and should be fixed first.
3. **5 standards over-reach** by forcing high-assurance controls onto every project; each has a clean split point between baseline and regulated tiers.
4. **55 duplicative clauses** are the fastest quality win — no rewrites needed, just cross-references.
5. **Merge targets confirmed:** [6]→[2], [1]→[5], [36]↔[37], [39]/[40]/[41] reliability cluster, [27]↔[19] tenant/RLS boundary.
6. **Applicability Tiering (G-20)** is now the validated #1 structural change. Without it, Passes 3 and 4 cannot produce actionable ratings.

## 14. Next Actions (before Pass 3)

- [ ] Ratify the T1/T2/T3 model in [2] POL-GOV-001 (adds one section, ~2 pages).
- [ ] Require every standard to carry an Applicability Tier Table at the top (template in [30] STD-ENG-007).
- [ ] Freeze any standard whose `Implementation Status` is majority-PENDING until status is resolved or language is downgraded from MUST.
- [ ] Approve Pass 3 (Friction Audit: /10 ratings on Clarity, Actionability, Automatability, Proportionality) to run on the T1 baseline set first (14 docs), then the rest.

---

*End of Pass 2.*

---

# EXECUTION LOG — Pass 2 Actions Applied (2026-04-22)

Three Pass 2 structural actions were executed against the repository.

## E1. Tiering ratified in [2] POL-GOV-001

Added subsections **§8.7 Applicability Tiers** and **§8.8 Tier Table Requirement** to [`[2]-POL-GOV-001 CYBERCUBE-Standards-Governance-Policy-v1.md`]([2]-POL-GOV-001%20CYBERCUBE-Standards-Governance-Policy-v1.md).

Content:
- §8.7.1 T1/T2/T3 tier definitions with applicability criteria.
- §8.7.2 Project Tier Inheritance mapped to PRCS facets and ERM risk.
- §8.7.3 Authoring rules (unlabeled MUST defaults to T1; no cross-standard duplication).
- §8.7.4 Tier Exemption vs Waiver distinction.
- §8.8 Mandatory Tier Table at top of every standard; missing table blocks advancement to Active.

No other section was renumbered (inserted as subsections under existing §8).

## E2. Applicability Tier Table template added to [30] STD-ENG-007

Added the canonical `Applicability Tier Table` block to the Standard Document Structure template in [`[30]-STD-ENG-007 CYBERCUBE-Documentation-RFC-Standard-v1.md`]([30]-STD-ENG-007%20CYBERCUBE-Documentation-RFC-Standard-v1.md), inserted between the front-matter (`Status/Effective/Applies to`) and `### 0. Purpose & Design Principles`.

All new standards MUST use this template. Existing standards must be retrofitted during their next scheduled review.

## E3. FROZEN notice applied to 8 majority-PENDING standards

Criterion: Implementation Status table has more `PENDING` rows than `COMPLETE` + `IN PLACE` rows combined, with total sample ≥ 6 rows.

| # | Doc | PENDING / Other | Action |
|---|---|---|---|
| [11] | POL-AI-001 AI Usage | 5 / 2 | FROZEN banner applied |
| [14] | POL-REC-001 Records Mgmt | 4 / 3 | FROZEN banner applied |
| [24] | STD-SEC-008 Security Training | 6 / 2 | FROZEN banner applied |
| [32] | STD-ENG-003 Webhooks | 9 / 0 | FROZEN banner applied (all components PENDING) |
| [36] | POL-ENG-001 Change Management | 5 / 3 | FROZEN banner applied |
| [40] | STD-SLP-001 Service Level | 5 / 4 | FROZEN banner applied + Status changed `Active` → `Frozen (was: Active)` |
| [41] | STD-OPS-004 Incident Response | 9 / 3 | FROZEN banner applied |
| [44] | STD-GOV-004 Internal Audit | 6 / 3 | FROZEN banner applied |

Banner text (uniform across all 8):
> **FROZEN — MUST language suspended.** Per POL-GOV-001 §8.8 (ratified 2026-04-22), this standard's Implementation Status section is majority-PENDING. All normative MUST/SHALL clauses are temporarily downgraded to SHOULD until Implementation Status reaches majority IN-PLACE/COMPLETE. This status blocks advancement to Active per POL-GOV-001 §2.2. Lift the freeze by: (a) completing PENDING components, or (b) formally downgrading MUST language and re-submitting for review.

### Candidates reviewed but NOT frozen

| Doc | Reason not frozen |
|---|---|
| [25] STD-DAT-001 | PENDING 7 / IN PLACE 6 — marginal majority; parked for owner review |
| [22] STD-SEC-006 | PENDING 5 / IN PLACE 8 — IN PLACE majority |
| [39] STD-OPS-005 | PENDING 5 / IN PLACE 10 — IN PLACE majority |
| [23] STD-SEC-007 | PENDING 7 / IN PLACE 8 — IN PLACE majority (close; re-check next review) |
| [3] POL-GOV-002 | PENDING 5 / IN PLACE 4 — marginal; parked |
| [13] POL-PRI-002 | PENDING 4 — but Implementation Status table uses different status vocabulary; needs manual audit |
| [19] STD-SEC-004 | PENDING 7 — as above, different status vocabulary; needs manual audit |
| [27] STD-DAT-004 | PENDING 6 — as above |

Recommended next maintenance action: normalize the `Implementation Status` vocabulary portfolio-wide to exactly `COMPLETE | IN PLACE | PARTIAL | PENDING | N/A` so the freeze check can be automated in CI (feeds Pass 3 Automatability rating).

---

*End of Execution Log.*
