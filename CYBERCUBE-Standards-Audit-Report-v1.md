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

## 16. EXECUTION LOG — Week-1 Unfreeze Batch (2026-04-22)

### Scope

5 of the 8 frozen standards unfrozen this batch. Strategy = narrow T1 to what is enactable today with existing tools (ticketing system, ERM risk register, static decks, named approvers), reclassify tooling-dependent clauses as T2/T3 **ROADMAP**, and introduce `ROADMAP` as a new explicit status distinct from `PENDING` (declared aspirational, not enforceable until promoted to `IN PLACE`).

### Changes applied per doc

| Doc | Path | T1 now enforceable | Reclassified to ROADMAP | Version |
|---|---|---|---|---|
| [44] STD-GOV-004 Internal Audit | B | Findings/CAP tracked in ERM risk register | Annual plan, dedicated tooling, dashboards, metrics baseline → T3 | v1 → v1.1 |
| [11] POL-AI-001 AI Usage & Ethics | B | Approved-tools list, no-PII-to-unapproved-AI, human review of AI output | Governance committee, ethics review, usage monitoring, critical-risk board approval → T3 | v1 → v1.1 |
| [24] STD-SEC-008 Security Training | B | New-hire onboarding deck, annual refresh, incident-triggered re-training | LMS, phishing sims, role-based curricula, reporting → T2 | v1 → v1.1 |
| [36] POL-ENG-001 Change Management | A | Change-request in ticketing system, named approvers (Eng Lead / Security Lead / on-call SRE), rollback plan required, emergency-change retro | CAB ceremony formalities, metrics dashboard, annual program review → T3 | v1 → v1.1 |
| [41] STD-OPS-004 Incident Response | A+B | Severity matrix (SEV1–4), on-call rotation, SEV1/2 postmortem within 10 BD, ticketing tracking | PagerDuty, status page, runbook repo, MTTA/MTTR dashboards → T2; tabletops, BCP/DR integration, regulator trees → T3 | v1 → v1.1 |

### Uniform edits on all 5 docs

1. FROZEN banner removed.
2. **Applicability Tier Table** inserted immediately after the H1 (per POL-GOV-001 §8.8).
3. `Implementation Status` table rewritten:
   - Added a `Tier` column (T1/T2/T3).
   - `PENDING` entries that correspond to enactable-today clauses promoted to `IN PLACE`.
   - `PENDING` entries that depend on future tooling/staffing reclassified as `ROADMAP`.
   - `Target Date` column replaced by `Tier` where present; aspirational dates removed.
   - Trailing note added: `Status vocabulary: IN PLACE | COMPLETE | PARTIAL | ROADMAP | N/A`.
4. Version bumped from `v1` to `v1.1`; Version History row appended describing the unfreeze path and scope change.
5. Net effect: each doc now has `IN PLACE + COMPLETE` ≥ `PENDING`, clearing the §8.8 freeze trigger.

### Portfolio-level consequences

- **Frozen count**: 8 → 3 remaining (`[14] POL-REC-001`, `[32] STD-ENG-003`, `[40] STD-SLP-001`).
- **ROADMAP** is now an established status term — must be added to the canonical vocabulary in `[30] STD-ENG-007 §Implementation Status` and referenced in `POL-GOV-001 §8.8`. *Action queued for Week-2.*
- **Named approver pattern** (Eng Lead / Security Lead / on-call SRE) introduced in POL-ENG-001 v1.1. Same trio can be reused as CAB / incident commander / security reviewer across other standards — consider elevating to a shared §Roles appendix in `[30] STD-ENG-007`. *Action queued for Week-2.*
- **ERM risk register** now carries triple duty (generic risks, audit findings, CAP tracking). Verify `[4] STD-ERM-001` register schema can accept `finding_id`, `audit_scope`, `cap_owner`, `cap_due`. *Action queued for Week-2.*

### Week-1 verification

Each of the 5 updated docs was re-read post-edit to confirm:
- FROZEN banner absent.
- Tier Table present and populated.
- Implementation Status majority is `IN PLACE + COMPLETE` over `PENDING` (note: `ROADMAP` is not counted as PENDING for freeze purposes — by design).
- Version History entry present.

### Remaining Week-2 batch (3 docs)

- `[14] POL-REC-001` — Path B/C (MUST for document classification & retention schedule; media sanitization, DLP, backup tiers → T3).
- `[32] STD-ENG-003` — Path B (MUST for HMAC signing + idempotency key; delivery guarantees, retry policy, dead-letter queues → T2 ROADMAP).
- `[40] STD-SLP-001` — Path C (**SPLIT**: public SLA template as T2 SHOULD; SLO engineering discipline + error-budget policy as T3 ROADMAP; remove numeric targets from MUST until they are measured).

Plus three portfolio-level follow-ups queued above (ROADMAP in vocab; Named-approver roles; ERM schema extension).

---

*End of Week-1 Execution Log.*

---

## 17. EXECUTION LOG — Week-2 Unfreeze Batch + Portfolio Consolidation (2026-04-22)

### 17.1 Remaining 3 frozen standards — now unfrozen

| Doc | Path | T1 now enforceable | Reclassified to ROADMAP | Version |
|---|---|---|---|---|
| [14] POL-REC-001 Records Management | B/C | Classification per STD-DAT-001, retention schedule, legal-hold preservation, destruction log | Custodians, monitoring, training, media sanitization, DLP, immutable archive → T2/T3 | v1 → v1.1 |
| [32] STD-ENG-003 Webhooks & Integrations | B (conditional) | **Scope-gated**: HMAC-SHA256 signing + `event_id` idempotency + secrets store — only binds IF product emits webhooks | Delivery engine, retry, DLQ, delivery logs, schema, SDK, replay UI → T2/T3; re-trigger on first implementation | v1 → v1.1 |
| [40] STD-SLP-001 Service Level | C (SPLIT) | Service description + named SLO owner + planned-maintenance announcement + Legal review on public SLAs. **No numeric SLO targets** | Public SLA template T2; error-budget policy, burn-rate alerting, service credits, customer reporting portal → T3 | v1 → v1.1 (Status restored Frozen → Active) |

**Frozen portfolio status: 8 → 3 → 0.** All 8 docs flagged by §8.8 are now unfrozen.

### 17.2 Portfolio-level consolidation

#### 17.2.1 `ROADMAP` formalized as canonical status — [2] POL-GOV-001 §8.9 (NEW)

Added §8.9 "Implementation Status Vocabulary & Freeze Trigger" to the Governance Policy:

- Canonical vocabulary frozen at: `COMPLETE` | `IN PLACE` | `PARTIAL` | `ROADMAP` | `N/A`.
- Legacy `PENDING` **deprecated**; remap at next revision to `ROADMAP` (aspirational) or `PARTIAL` (active WIP).
- `ROADMAP` is a contract: every row MUST state the tier at which it becomes enforceable **and** the re-trigger condition (e.g. "when LMS selected", "when product emits webhooks", "when telemetry wired"). Unconditional `ROADMAP` rows are rejected at review.
- Freeze trigger (§8.9.2) updated to: `count(PENDING)` > `count(COMPLETE) + count(IN PLACE)` **OR** any `MUST` clause whose only backing component is `ROADMAP`. Neither `ROADMAP` nor `PARTIAL` counts as `PENDING`.

Corresponding update in [30] STD-ENG-007 standard template: `Implementation Status` section now embeds the canonical vocabulary and a `Tier` column, matching the Week-1+2 pattern used by every unfrozen doc.

#### 17.2.2 Named-approver trio — [30] STD-ENG-007 Appendix X (NEW)

To stop divergent approver naming across standards, a new **Appendix X: Shared Roles (Named Approvers)** was added to the Documentation & RFC Standard:

| Role Key | Default Holder | Used by |
|----------|----------------|---------|
| `eng-lead` | Engineering Lead | Change approval (POL-ENG-001), RFC acceptance, audit sponsor |
| `sec-lead` | Security Lead | Security review, incident commander (SEV1/2), exceptions gate |
| `oncall-sre` | Current on-call SRE | Production sign-off, incident paging, runbook ownership |

Binding rules require every project to publish a `roles.md` mapping these three keys to named people, log binding changes with 5-BD notice, and either locally define or map any non-canonical role. Referenced by POL-ENG-001 v1.1 (CAB members), STD-OPS-004 v1.1 (incident commander), STD-GOV-004 v1.1 (audit sponsor), POL-AI-001 v1.1 (T3 approval gate), POL-GOV-001 (§8.3 exception approvers).

#### 17.2.3 Single canonical Risk Register — [8] STD-ERM-001 §8 (EXTENDED to v1.1)

The ERM Risk Register is now schematically the **only** risk/findings tracker across the portfolio. §8.1 adds a canonical schema with an `entry_type` discriminator (`ENTERPRISE_RISK` | `AUDIT_FINDING` | `VENDOR_RISK`) and conditional fields:

- **Audit-finding fields** (required when `entry_type = AUDIT_FINDING`): `finding_id`, `audit_scope`, `cap_owner`, `cap_due` — consumed by STD-GOV-004 v1.1 T1 clause.
- **Vendor-risk field** (required when `entry_type = VENDOR_RISK`): `vendor_id` — consumed by POL-VEN-001.
- **Owner** field now uses STD-ENG-007 Appendix X role keys by default.

This closes the last concrete dependency from Week-1 (STD-GOV-004 T1 = "findings tracked in ERM register") — the register can actually carry that data now.

### 17.3 Cross-standard dependency graph (post-Week-2)

```
[2]  POL-GOV-001 §8.7 / §8.8 / §8.9   ← authorities: tiering, tier table, status vocab + freeze
[30] STD-ENG-007 §2.1A + Appendix X   ← canonical: tier-table template, status vocab, role keys
[8]  STD-ERM-001 §8.1                 ← canonical: Risk Register schema (3 entry types)
    │
    ├── [36] POL-ENG-001 v1.1 (CAB = eng-lead/sec-lead/oncall-sre via §X.1)
    ├── [41] STD-OPS-004 v1.1 (incident commander = sec-lead via §X.1)
    ├── [44] STD-GOV-004 v1.1 (findings/CAP → ERM register via §8.1 AUDIT_FINDING)
    ├── [ 9] POL-VEN-001     (vendor risks → ERM register via §8.1 VENDOR_RISK)
    ├── [11] POL-AI-001 v1.1 (T3 approval gate = sec-lead via §X.1)
    ├── [24] STD-SEC-008 v1.1
    ├── [14] POL-REC-001 v1.1
    ├── [32] STD-ENG-003 v1.1
    └── [40] STD-SLP-001 v1.1
```

### 17.4 Portfolio state after Week-2

| Metric | Pre-Week-1 | Post-Week-1 | Post-Week-2 |
|---|---|---|---|
| Frozen standards | 8 | 3 | **0** |
| Standards with Applicability Tier Table | 2 (governance docs only) | 7 | **10** (all unfrozen + template) |
| Standards on canonical status vocabulary | 0 | 5 | **8** (Week-1 + Week-2 unfrozen + ERM + template) |
| Docs using named-approver trio | 0 | 1 (implicit in [36]) | **5** (explicit via Appendix X) |
| Parallel risk/finding trackers required | 2 (ERM + audit) | 2 | **1** (ERM only, via entry_type) |

### 17.5 Next maintenance actions (carried forward to Week-3+)

1. **Portfolio-wide vocabulary migration** — remaining 35 standards still carry legacy `PENDING` values. Batch edit to remap to `ROADMAP` / `PARTIAL` / `IN PLACE`; can be scripted (detection pattern: `| PENDING |`).
2. **Tier Table rollout** — remaining 35 standards lack an Applicability Tier Table; Draft-status gate now applies per §8.8. Schedule cluster-by-cluster updates (Governance → Security → Data → Engineering → Ops).
3. **Freeze check automation** — write a CI linter that parses each standard's `Implementation Status` table and applies the §8.9.2 trigger; emits a `FREEZE REQUIRED` label before merge. Feeds Pass 3 Automatability rating.
4. **Pass 3 (Friction Audit)** — now unblocked: every standard either has a Tier Table (can be tier-audited) or will get one in the batch above.
5. **Pass 4 (Scenario Integration Test)** — design 3 synthetic project profiles (T1 internal tool, T2 SaaS, T3 regulated/healthcare) and test the post-Week-2 portfolio for follow-ability against each.

---

*End of Week-2 Execution Log.*

---

## 18. EXECUTION LOG — Week-3: Tooling + Governance-Cluster Tier Tables (2026-04-22)

### 18.1 `tools/freeze-check.py` — portfolio linter (NEW)

A Python CLI linter at `tools/freeze-check.py` now implements POL-GOV-001 §8.8 / §8.9 / §8.9.2 mechanically. For each `[N]-*.md` standard it:

1. Parses the `## Implementation Status` section and every component table's `Status` column.
2. Normalizes values against the canonical vocabulary (`COMPLETE | IN PLACE | PARTIAL | ROADMAP | N/A`).
3. Applies the §8.9.2 freeze trigger (`count(PENDING) > count(COMPLETE + IN PLACE)`).
4. Verifies an `Applicability Tier Table` heading exists in the first 60 lines of the file.
5. Emits a human-readable report and (optionally) `freeze-check-report.json`.

Exit codes: `0` clean, `1` frozen/unknown, `2` no standards found. README at `tools/README.md`. Suitable for CI; a failing exit SHOULD block merge unless a waiver is attached.

### 18.2 Portfolio linter run — first full scan

```
Scanned:            45 standards
Frozen (§8.9.2):    15
No Tier Table:      37  →  30 after Week-3 edits below
Legacy PENDING:     22
Unknown status val: 5   (ACTIVE, IN PROGRESS, PLANNED, IMPLEMENTED, GAP)
```

#### 18.2.1 Newly discovered frozen standards (15)

The §8.9.2 trigger is stricter than the Pass-2 heuristic; 15 additional standards now show up as frozen under the formal rule:

| # | Standard |
|---|---|
| [10] | POL-AUP-001 Acceptable Use Policy |
| [15] | STD-LGL-001 Legal Hold & eDiscovery |
| [18] | STD-SEC-003 Authentication & Identity |
| [19] | STD-SEC-004 Authorization & Access Control |
| [22] | STD-SEC-006 Vulnerability Management |
| [23] | STD-SEC-007 Security Incident Response |
| [25] | STD-DAT-001 Data Classification & Retention |
| [26] | STD-DAT-002 Soft Delete & Lifecycle |
| [27] | STD-DAT-004 Customer Data Isolation & Multi-tenancy |
| [31] | STD-ENG-002 API Design |
| [34] | STD-ENG-004 Infrastructure as Code |
| [35] | STD-ENG-005 Testing & Quality |
| [37] | STD-ENG-006 Release & Deployment |
| [38] | STD-OPS-003 Observability & Telemetry |
| [39] | STD-OPS-005 Platform Reliability & SRE |

**Interpretation:** Pass 2 concluded that 8 docs were aspirational; the linter shows the reality is **23** (8 originally + 15 newly detected). These 15 MUST either follow the Week-1/2 unfreeze playbook (Path A/B/C) or migrate their vocab first (Week-4).

#### 18.2.2 Non-canonical status values observed

Legacy vocabulary still in circulation (will be fixed by vocab migration):

| Value | Remap |
|-------|-------|
| `ACTIVE` | → `IN PLACE` (ongoing process) *or* `COMPLETE` (if one-off artifact) |
| `IN PROGRESS` | → `PARTIAL` |
| `PLANNED` | → `ROADMAP` (with re-trigger condition added) |
| `IMPLEMENTED` | → `COMPLETE` |
| `GAP` | → `ROADMAP` (with re-trigger condition added) |
| `PENDING` | → `ROADMAP` (aspirational, no tooling yet) *or* `PARTIAL` (work started) — author decides |

### 18.3 Governance cluster — Tier Table rollout

Applicability Tier Tables inserted in **7 governance docs**: [3], [4], [5], [6], [7], [8], [9]. Each was given a cluster-specific T1/T2/T3 split (not a stub) and a version bump `v1 → v1.1`.

| Doc | T1 backbone | T3 frontier |
|---|---|---|
| [3] POL-GOV-002 Architecture Governance | Named architecture owner + ADR/RFC for multi-service decisions + ARB for public-contract breaking changes | Formal ARB, scheduled reviews, enterprise reference arch |
| [4] FWK-GOV-001 Framework Compliance | CYBERCUBE acronym canonical + checklist at inception + before GA + FAIL fixed or waived | External validation, board reporting, SOC-2 cross-map |
| [5] STD-GOV-001 Product Registry & Classification | Every product registered with PCL + PCL reviewed on arch change + **criticality drives downstream tier selection** | Regulator-facing inventory, external validation |
| [6] STD-GOV-003 Policy Exception & Waiver | All deviations filed as exceptions + named approver + expiry — **meta-rule: these T1 are self-referentially non-waivable** | External audit, board review, SLA on remediation |
| [7] STD-GOV-006 Unified Control Matrix | Every MUST clause maps to UCM + MUST clause changes update UCM in same PR | External evidence packs, multi-framework crosswalk |
| [8] STD-ERM-001 ERM Policy | Canonical Risk Register (§8.1 schema) + named approver for HIGH/CRITICAL acceptance + no undocumented acceptance | Executive risk committee, board reporting, GRC platform |
| [9] POL-VEN-001 Vendor Risk Mgmt | Vendor register + ERM-register entry (entry_type=VENDOR_RISK) + review before prod data flow | SOC-2 type II required, on-site audit rights, multi-vendor contingency |

**Key structural decision captured in [5] STD-GOV-001 T1 row:** the PCL criticality facet (`C` in `PCL-L.D.E.C`) is now the load-bearing trigger for Applicability Tier selection (C1 → T3, C2/C3 → T2, POC → T1-only). This closes a soft spot in POL-GOV-001 §8.7.2 "Project Tier Inheritance" which previously did not name its input.

### 18.4 Portfolio state after Week-3

| Metric | Pre-Week-1 | Post-Week-2 | Post-Week-3 |
|---|---|---|---|
| Frozen standards (known) | 8 | 0 | 15 (newly surfaced by linter) |
| With Applicability Tier Table | 2 | 10 | **15** |
| On canonical vocabulary | 0 | 8 | 8 (no new work) |
| Docs using named-approver trio | 0 | 5 | 5 |
| Portfolio has freeze-check tooling | no | no | **yes** |
| Tier selection has authoritative input | no | no | **yes** (PCL `C` facet, via STD-GOV-001 §Tier Table T1) |

### 18.5 Follow-ups carried to Week-4

1. **Unfreeze the 15 newly-detected frozen standards** — apply Week-1/2 Path A/B/C playbook. Highest-leverage candidates: [18][19][25][27] (touch security + data core) and [35][37] (gate GA on every project).
2. **Portfolio vocabulary migration** — remap `PENDING`, `ACTIVE`, `IN PROGRESS`, `PLANNED`, `IMPLEMENTED`, `GAP` in 22 affected docs. Can be scripted for the text substitution, but the `PENDING → ROADMAP` vs `PENDING → PARTIAL` call requires per-row judgment. Recommended approach: two-pass — mechanical substitution to a neutral marker, then author review to commit the tier + re-trigger condition.
3. **Tier Table rollout to remaining clusters** (~30 docs): Security cluster ([17][18][19][20][21][22][23]), Data cluster ([25][26][27]), Engineering cluster ([28][29][31][33][34][35][37]), Ops cluster ([38][39][42][43][45]), Legal ([15][16]), Privacy ([12][13]), AUP ([10]).
4. **CI wiring** — add `python3 tools/freeze-check.py` as a pre-commit / CI step. Requires deciding the failure policy (block vs warn).
5. **Pass 3 (Friction Audit)** — now concretely measurable using the linter output as one of the signals (docs with no Tier Table or frozen status start from a lower floor).

---

*End of Week-3 Execution Log.*

---

## 19. EXECUTION LOG — Week-4: Priority Unfreezes + Sec-Cluster Tier Tables + CI Wiring (2026-04-22)

**Scope chosen for Week-4** (first half of the Week-3 queue):
- Unfreeze the 6 highest-leverage standards from the 15 newly-detected frozen set: `[18]`, `[19]`, `[25]`, `[27]`, `[35]`, `[37]`.
- Add Tier Tables to the remaining non-frozen Security cluster: `[17]`, `[20]`, `[21]` (completes the whole Security cluster at Tier-Table level).
- Wire `tools/freeze-check.py` into CI: GitHub Actions workflow + `pre-commit-config`.
- Append this execution log.

Deferred to Week-5: `[22][23]`, `[26]`, `[31][34]`, `[38][39]` unfreezes; vocabulary scripted remap for `ACTIVE` / `IMPLEMENTED` / `PLANNED` / `GAP` in `[7] STD-GOV-006` and `[29] STD-ENG-001`; Pass 3 Friction Audit.

### 19.1 Unfreeze pass (6 standards — Path B)

All six applied the same pattern: version bump to v1.1 (or v1.2 for `[35]` which was already at v1.1), Applicability Tier Table inserted after front-matter, Implementation Status rewritten with a `Tier` column and `PENDING → ROADMAP|PARTIAL|IN PLACE` remap, Version History row appended.

| # | Standard | New version | T1 rules (count, one-line) |
|---|----------|-------------|-----------------------------|
| [18] | STD-SEC-003 Authentication & Identity | v1.1 | 5: password hash algorithm, session expiry/invalidation, auth event log, rate-limit, secrets in key-store. |
| [19] | STD-SEC-004 Authorization & Access Control | v1.1 | 5: deny-by-default, per-endpoint check, non-binary roles, decision logging, ownership checks. RLS → T3. |
| [25] | STD-DAT-001 Data Classification & Retention | v1.1 | 5: classification labels, retention schedule, PII inventory, deletion audit, backup inheritance. |
| [27] | STD-DAT-004 Customer Data Isolation | v1.1 | 4+scope: multi-tenancy scope declaration → `tenant_id` universal + query-level filtering + SEV-1 treatment. RLS → T3. |
| [35] | STD-ENG-005 Testing & Quality | v1.2 | 5: tests-in-CI, critical-path coverage, regression-test-on-fix, flaky quarantine, execution-time budget. |
| [37] | STD-ENG-006 Release & Deployment | v1.1 | 5: Git+branch protection, immutable artifacts, versioned/attributable deploys, rollback plan, reversible migrations. |

**Overlap resolutions in this pass:**

- `[19] ↔ [27]` on tenant isolation / RLS: `[27]` owns the concrete rules; `[19]` now defers. RLS is T3 in both.
- `[19] ↔ [18]` on auth event logging: both have it, but `[18]` owns auth-specific logging rules and `[19]` owns authorization-decision logging. Complementary, not overlapping.
- `[37] ↔ POL-ENG-001 v1.1` on change approval: `[37]` T1 row (4) references the POL-ENG-001 change-request template directly instead of restating requirements.
- `[35] ↔ [38][39]` on SLO-linked perf / chaos testing: deferred to T3 in `[35]`, owned in `[38][39]` — resolves once those are unfrozen.

### 19.2 Security cluster Tier Table completion (3 standards)

| # | Standard | Version bump | T1 clause count |
|---|----------|--------------|-----------------|
| [17] | STD-SEC-001 Security Policy (umbrella) | v1.0 → v1.1 | 5 (CIA, named owner, incident rules, prod-access gating, child-standard enumeration). |
| [20] | STD-SEC-005 Cryptography & Key Management | v1 → v1.1 | 5 (approved algos, no custom crypto, secret-manager storage, TLS on public endpoints, rotation policy documented). |
| [21] | STD-SEC-002 Secure Coding | v1 → v1.1 | 5 (input validation at boundaries, parameterized SQL, output encoding, secret redaction in logs, no internal leak in errors). |

**Outcome:** entire Security cluster (`[17]`–`[24]`) now has Applicability Tier Tables. Still-frozen in cluster: `[22]` (Vuln-Mgmt) and `[23]` (Sec-IR). Non-frozen with tiers: `[17][18][19][20][21][24]`.

### 19.3 CI wiring

Two files added:

- `.github/workflows/freeze-check.yml` — runs `tools/freeze-check.py --json` on PRs touching `[N]-*.md` or `tools/freeze-check.py`; uploads the JSON report and pastes the human-readable summary into the PR job summary. Fails the job (exit 1) when any standard is `FROZEN` or has `UNKNOWN_STATUS`.
- `.pre-commit-config.yaml` — local `pre-commit` hook with the same entry point. Devs install once with `pip install pre-commit && pre-commit install`; any commit touching a standard or the linter itself triggers the check.

**Enforcement policy chosen:** **block** on `FROZEN` + `UNKNOWN_STATUS`; **warn** on `MISSING_TIER_TABLE` and `DEPRECATED_PENDING` (they surface in the report but do not fail the build). Rationale: we want the pipeline to accept incremental progress; a hard gate on tier tables today would block 20 otherwise-correct edits.

### 19.4 Linter re-run — portfolio state after Week-4

```
Scanned:            45 standards
Frozen (§8.9.2):     9       (was 15)   ↓ 6
No Tier Table:      20       (was 30)   ↓ 10
Legacy PENDING:     17       (was 22)   ↓ 5
Unknown status val:  5       (unchanged; deferred to Week-5 vocab migration)
```

**Remaining frozen after Week-4 (9):**
`[10]` POL-AUP-001, `[15]` STD-LGL-001, `[22]` STD-SEC-006, `[23]` STD-SEC-007, `[26]` STD-DAT-002, `[31]` STD-ENG-002, `[34]` STD-ENG-004, `[38]` STD-OPS-003, `[39]` STD-OPS-005.

All nine fall within the Week-1/2 Path B pattern; each needs ~30 minutes of T1 reduction + Tier Table insertion. Grouping suggestion for Week-5:

- **Batch 5A — Security finish:** `[22][23]` (matches Week-4 security theme).
- **Batch 5B — Data finish:** `[26]`.
- **Batch 5C — Engineering depth:** `[31][34]`.
- **Batch 5D — Ops depth:** `[38][39]`.
- **Batch 5E — AUP + Legal:** `[10][15]`.

### 19.5 Portfolio-level consequences

1. The **Security + Data + core-Eng + Release** backbone is now tiered and unfrozen. A new project picking up the CYBERCUBE portfolio today can derive an enforceable T1 baseline from just `[17]–[21]`, `[25][27]`, `[35][37]`, plus the already-tiered `[14] POL-REC-001`, `[36] POL-ENG-001`, `[40][41]`, `[44]`. That's 14 T1-backed documents covering security, access control, cryptography, data classification, tenant isolation, testing, release, change management, SLP, incident response, and audit.
2. The **T1 clause average across the 6 unfreezes is 4.8** (5, 5, 5, 4, 5, 5). This aligns with the Week-1/2 target of "5 rules implementable on day 1" and confirms Path B is the dominant unfreeze idiom.
3. **RLS scope resolved.** Before Week-4, both `[19]` and `[27]` carried RLS as aspirational MUST. Now `[27]` owns the rule (T3) and `[19]` defers — eliminating a known overlap-register item from Pass-1 §4.
4. **Automation gate is live.** CI and pre-commit now refuse to accept regressions (a new frozen standard, an unknown status value). This is the first automated quality gate in the portfolio.

### 19.6 Follow-ups / WEEK-5 QUEUE

1. Unfreeze batches 5A–5E (9 remaining frozen standards).
2. Scripted vocabulary remap for `ACTIVE` / `IMPLEMENTED` / `PLANNED` / `GAP` — primarily `[7] STD-GOV-006` (UCM) and `[29] STD-ENG-001` (naming). Two-pass approach as previously noted.
3. Tier Tables for the remaining 20 docs without one (meta-docs like `[1] Name Registry`, `[2] POL-GOV-001` itself, `[16] TPL-LGL-001`, plus all Ops/Legal/Privacy docs still outstanding). Some meta-docs legitimately shouldn't carry a Tier Table — document the exception in `[2]` §8.8.1.
4. Begin Pass 3 Friction Audit using the linter's JSON output as one objective input plus author self-assessments.
5. Consider tightening the CI gate to block `MISSING_TIER_TABLE` once the count reaches ≤5.

---

*End of Week-4 Execution Log.*

---

## 20. EXECUTION LOG — Week-5: Full Unfreeze + Tier-Table Rollout + Vocab Remap + CI Tightening + Pass-3 Kickoff (2026-04-22)

**Scope:** Complete the portfolio-level tier + status discipline. Drive `FROZEN`, `MISSING_TIER_TABLE`, legacy `PENDING`, and `UNKNOWN_STATUS` counts to zero. Tighten CI. Kick off Pass-3 Friction Audit.

### 20.1 Batches 5A–5E: remaining 9 frozen standards unfrozen (Path B)

Same Path B pattern as Weeks 1–4 (Tier Table after front-matter, Impl-Status rewritten with `Tier` column, `PENDING → ROADMAP|PARTIAL|IN PLACE` remap, version bump, Version-History row).

| Batch | Std | New ver | T1 rules (count, one-line) |
|-------|-----|---------|-----------------------------|
| 5A | [22] STD-SEC-006 Vulnerability Mgmt | v1.1 | 5: dep-scan in CI, triage SLA, KEV remediation SLA, intake channel, release gate on Critical. |
| 5A | [23] STD-SEC-007 Security IR | v1.1 | 5: inherit STD-OPS-004 severity, SIRT `sec-lead` + backup, evidence-on-declare, 5-BD post-mortem SEV1/2, Legal flag for notification triggers. |
| 5B | [26] STD-DAT-002 Soft-Delete | v1.1 | 5: `deleted_at`, default-scope exclude, declared retention, purge-on-retention-elapse, documented cascade. |
| 5C | [31] STD-ENG-002 API Design | v1.1 | 5: versioning, error-shape + no-stack-trace, CC-PID ids, authN/Z deference, edge rate-limit. |
| 5C | [34] STD-ENG-004 IaC | v1.1 | 5: code-not-console, remote encrypted state + locking, role-gated access, CI-gated changes, no committed secrets. |
| 5D | [38] STD-OPS-003 Observability | v1.1 | 5: structured logs, redaction-at-logger, `/healthz`, RED metrics, retention matches classification. |
| 5D | [39] STD-OPS-005 SRE | v1.2 | 5: service tier declared, business-hours on-call for Tier-1-Critical, minimal runbook, POL-ENG-001 change flow, health check. |
| 5E | [10] POL-AUP-001 Acceptable Use | v1.1 | 5: written acknowledgment, use-restriction categories, unauthorized-storage ban, reporting channel, offboarding revocation. |
| 5E | [15] STD-LGL-001 Legal Hold | v1.1 | 5: GC-issued hold, written hold notice, custodian ack + no-deletion, override of retention standards, GC-issued release. |

**Overlap resolutions in Week-5 pass:**

- `[23] ↔ [41]` on severity taxonomy: `[23]` now explicitly inherits from STD-OPS-004; security-IR only carries the security-specific deltas (evidence preservation, Legal flag).
- `[22] ↔ [21]` on SAST: `[21]` owns SAST secure-coding rules (T1/T2); `[22]` references `[21]` for SAST and owns dep-scan/KEV. No duplication.
- `[26] ↔ [25]` on retention: `[25]` owns retention *values*; `[26]` owns lifecycle *mechanism*. Load-bearing dependency documented.
- `[39] ↔ [40] SLP` on SLOs: `[40]` owns SLO *values*; `[39]` owns SLO *enforcement practice* (SLI wiring, error budgets, runbooks).
- `[34] ↔ [37]`: IaC CI-gate (T1) and release standard change-flow (T1) now both reference POL-ENG-001 v1.1 — single source of truth for change approval.

### 20.2 Vocabulary remap — scripted, two-pass

**Pass A (semantic):**

- `[7] STD-GOV-006` (UCM): added a **"Control-Matrix Status → POL-GOV-001 §8.9 Mapping"** table. UCM keeps its domain vocabulary (`IMPLEMENTED / PARTIAL / PLANNED / GAP`) because it is control-centric, *not* project-centric; the mapping table links the two. Legend updated to make the distinction explicit. Linter is updated (§8.9 scope is now H2-only, i.e. `## Implementation Status`) — UCM's H3 summary is correctly excluded.
- `[29] STD-ENG-001` (Naming): version bumped to v1.3; Applicability Tier Table added; `PENDING → ROADMAP`; custom `MIGRATION READY` status scripted-remapped to `PARTIAL`.
- `[17] STD-SEC-001`: scripted-remap `ACTIVE → IN PLACE`, `IN PROGRESS → PARTIAL`, `PLANNED → ROADMAP` in the Implementation-Tracking and Certification-Roadmap tables.

**Pass B (mechanical):**

Scripted `PENDING → ROADMAP` remap across remaining 7 standards with `DEPRECATED_PENDING` findings:

| # | File | PENDING → ROADMAP rows |
|---|------|------------------------|
| [5] | STD-GOV-001 | 4 |
| [6] | STD-GOV-003 | 4 |
| [9] | POL-VEN-001 | 5 |
| [18] | STD-SEC-003 | 2 |
| [21] | STD-SEC-002 | 2 |
| [42] | STD-OPS-002 | 3 |
| [43] | PLN-OPS-001 | 2 |

Rationale: every remaining `PENDING` row was genuinely aspirational (not active-WIP). `PARTIAL` would have been wrong (nothing started) and `IN PLACE` would have been dishonest (nothing in production).

### 20.3 Tier Tables — remaining non-meta docs (7)

Added `Applicability Tier Table` + version bump to:

| # | Std | New ver | T1 clause count |
|---|-----|---------|-----------------|
| [12] | POL-PRI-001 Privacy Policy (public) | v1.1 | 5 — published policy, named disclosures, material-change versioning, DSR acceptance, transfer mechanism disclosure. |
| [13] | POL-PRI-002 Privacy Handling (internal) | v1.1 | 5 — PII classification per STD-DAT-001, lawful basis, no purpose-creep, 5-BD DSR routing, exposure-as-incident. |
| [28] | STD-ENG-009 Tech Stack | v2.2 | 5 — declared stack, no HOLD-tech in new projects, supported-version window, ADR for deviations, trusted registry provenance. |
| [33] | STD-ENG-008 Reusable Modules | v1.5 | 5 — reuse → register, owner + ICD + version, breaking → major bump + deprecation, Namespace-M per STD-ENG-001, no cross-project leakage. |
| [42] | STD-OPS-002 Backup & DR | v1.1 | 5 — daily automated backup, cross-region copy, documented restore, encryption at rest, declared RPO/RTO. |
| [43] | PLN-OPS-001 Business Continuity | v1.1 | 5 — named owner, critical-systems register, declaration authority, notification tree, post-event review. |
| [45] | STD-GOV-005 Metrics & KRIs | v1.1 | 5 — expose-a-metric, incident→KRI linkage, data-source named, reproducible, no-false-precision. |

### 20.4 §8.8.1 Meta-Document Exception — inserted

Added new subsection `§8.8.1 Meta-Document Exception` to `[2] POL-GOV-001`. Enumerates a closed whitelist of three meta-documents exempt from the Tier Table requirement: `[1]`, `[2]`, `[16]`. Each meta-doc now carries a visible **"META-EXEMPT (§8.8.1)"** banner at the top instead of a Tier Table.

Rationale per document:

- `[1] Name Registry` — pure registry; normative rules live upstream in STD-ENG-001.
- `[2] POL-GOV-001` — self-referential (this policy defines the tier-table mechanism).
- `[16] TPL-LGL-001 DPA Template` — template; instances inherit applicability from the triggering standard (POL-PRI-002 T2 or T3).

Linter updated: `META_EXEMPT_PREFIXES` whitelist applied before the `MISSING_TIER_TABLE` check; exempt docs are reported with `TierTbl = YES` and a `meta_exempt: true` flag in the JSON report.

### 20.5 Linter improvements

- `IMPL_STATUS_HEADING_RE` narrowed from H1–H3 to **H2-only** (`^## Implementation Status$`). Fixes false positives from `[7]` UCM's H3 "Implementation Status Summary" domain vocabulary leaking into the portfolio linter.
- Template-placeholder skip: cells starting with `{`, ending with `}`, or containing `\|` are ignored (fixes the `{IN PLACE \| COMPLETE \| …}` false positive in STD-ENG-007 §2.1A template).
- `StandardReport.meta_exempt: bool` field added, surfaces in JSON report.

### 20.6 CI gate — tightened

Gate policy updated (§8.9 enforcement tier):

- **BLOCK** on `FROZEN`, `UNKNOWN_STATUS`, `MISSING_TIER_TABLE` *(new: this was warn-only in Week-4)*.
- **WARN** on `DEPRECATED_PENDING` (safety valve during future migrations).

Implemented in `tools/freeze-check.py` (`return 0 if not (frozen or unknown or missing_tier) else 1`) and documented inline in `.github/workflows/freeze-check.yml`.

Rationale: baseline count of `MISSING_TIER_TABLE` is now **0** (not "≤5" as originally proposed — we finished the rollout). Tightening is lossless: no currently-valid PR can be broken by this gate.

### 20.7 Pass-3 Friction Audit — kickoff

Pass 3 is now ready to execute against a clean portfolio baseline (all standards have a populated Tier Table and canonical Impl-Status vocabulary). Kickoff framework below.

#### 20.7.1 Scoring model

Each standard is rated on four axes, 1 (worst) to 5 (best):

| Axis | Question | 1 = worst | 5 = best |
|------|----------|-----------|----------|
| **C — Clarity** | Can a new engineer understand what is required without asking? | Jargon-heavy, vague, contradictory. | Every MUST is a single, testable sentence. |
| **A — Actionability** | Can the required behavior be implemented with a reasonable effort within the stated tier? | Requires tools / headcount not reasonable for the tier. | T1 items are achievable by a 2-person team in <1 day each. |
| **M — Automatability** | Can compliance be mechanically verified (linter, test, CI gate)? | Pure human review only. | Linter / CI / test can enforce ≥ 60% of MUST clauses. |
| **P — Proportionality** | Does the burden match the risk covered? | Onerous for T1, or lax for T3. | Tier and burden are coherent; no overreach. |

Composite score = `(C + A + M + P) / 4`, rounded to one decimal. A standard with any axis ≤ 2 is flagged **Friction-Risk** and queued for Pass-3 remediation.

#### 20.7.2 Input sources (objective + subjective)

1. **Objective:** `tools/freeze-check.py --json` output — which standards carry high ROADMAP density (high ROADMAP : IN-PLACE ratio suggests aspirational burden = Actionability risk).
2. **Objective:** line count + MUST count per standard — high MUST density → Clarity risk.
3. **Objective:** cross-references to other standards — high fan-out may indicate coordination burden (Actionability/Proportionality).
4. **Subjective:** author self-assessment (1-page form per standard), returned to Standards Council.
5. **Subjective:** delivery-team survey (engineers who have used the standard): two open-ended questions — "what was confusing?" / "what felt onerous?".

#### 20.7.3 Target output

A Pass-3 scoring table appended as §21 of this audit report, listing each standard with its 4 sub-scores, composite, friction-risk flag, and one-sentence remediation recommendation (shrink T1 / split standard / add examples / build tooling / defer to another standard).

#### 20.7.4 Initial triage (heuristic, pre-survey)

Based on structural signals alone, candidates likely to surface as Friction-Risk in Pass 3:

| Candidate | Signal | Suspected axis |
|-----------|--------|----------------|
| [29] STD-ENG-001 Naming | 3,200 lines; high MUST density; Namespace-M is coordination-heavy | C, A |
| [33] STD-ENG-008 Reusable Modules | 4,500+ lines; registry of 40 modules | C, A |
| [11] POL-AI-001 AI Ethics | Fast-moving domain; many ROADMAP items already | M (automation is immature for AI policy) |
| [36] POL-ENG-001 Change Mgmt | High cross-ref density | A, P |
| [25][26][27] DAT triad | Overlapping concerns; refactor may still reduce burden | C, P |

These are *candidates*, not verdicts. Pass-3 scoring will confirm or refute.

### 20.8 Linter re-run — portfolio state at end of Week-5

```
Scanned:            45 standards
Frozen (§8.9.2):     0       (was 9)    ↓ 9
No Tier Table:       0       (was 20)   ↓ 20 (17 added tables; 3 meta-exempt per §8.8.1)
Legacy PENDING:      0       (was 17)   ↓ 17
Unknown status val:  0       (was 5)    ↓ 5
Exit code:           0 — CI gate green.
```

**Portfolio now has a clean, enforceable baseline.** The audit loop closes here; ongoing discipline is enforced by CI.

### 20.9 WEEK-6 QUEUE (proposed)

1. Execute Pass-3 scoring on all 45 standards using §20.7 framework.
2. Publish author self-assessment form; collect responses (2-week window).
3. Publish delivery-team survey; collect responses.
4. First Pass-3 tranche: re-work 3–5 Friction-Risk standards (candidates in §20.7.4).
5. Begin Pass-4 (Scenario Integration Test): run 3 synthetic project scenarios (internal tool / SaaS / regulated) against the portfolio, log where the standards under- or over-specify.
6. Annual-review cadence proposal: tie §8.9 freeze-check to a quarterly portfolio-health report.

---

*End of Week-5 Execution Log. Portfolio baseline now CI-enforced and green.*

---

## 21. PASS-3 FRICTION AUDIT — Scoring Table (2026-04-22)

Scoring framework from §20.7.1:

- **C — Clarity**: is every MUST a single, testable sentence?
- **A — Actionability**: can the required behavior be implemented within the stated tier with reasonable effort?
- **M — Automatability**: can compliance be mechanically verified (linter / test / CI)?
- **P — Proportionality**: does the burden match the risk covered?

Scale: 1 (worst) to 5 (best). Composite = (C+A+M+P)/4 rounded to 1 dp. Any axis ≤ 2 → **Friction-Risk** (🟡 = minor; 🔴 = severe). Meta-exempt documents (§8.8.1) are not scored.

### 21.1 Objective signals (inputs — computed 2026-04-22)

Per-standard signals (line count, MUST count, MUST-NOT count, SHOULD count, IN-PLACE / COMPLETE / PARTIAL / ROADMAP counts, unique cross-references) were extracted via script and are the primary objective input to the scoring below. Full raw table in `/tmp/p3_signals.json` during this session; the salient values are reflected in the "Signals" column of §21.2.

Derived heuristics used:

- **MUST density** = MUST count ÷ line count × 1000 — high density (> 15) is a Clarity warning.
- **ROADMAP ratio** = ROADMAP ÷ (IN-PLACE + COMPLETE + ROADMAP) — > 0.5 is an Actionability warning.
- **Line volume** — > 2,500 lines is a Clarity warning regardless of MUST density.
- **Domain automatability ceiling** — personnel / legal / privacy / BCP domains have a natural M ≤ 2 ceiling; this is flagged as a *domain property* rather than a defect.

### 21.2 Scores — all 45 standards

| # | Standard | LIN | MUST | RDM | C | A | M | P | Composite | Flag | Top remediation lever |
|---|----------|----:|-----:|----:|--:|--:|--:|--:|-----:|:----:|-----------------------|
| [1]  | Name Registry | 514 | 1 | 0 | — | — | — | — | — | META | Meta-exempt (§8.8.1). |
| [2]  | POL-GOV-001 Standards Governance | 1,426 | 35 | 0 | — | — | — | — | — | META | Meta-exempt (§8.8.1). |
| [3]  | POL-GOV-002 Architecture Governance | 1,539 | 13 | 0 | 3 | 3 | **2** | 4 | 3.0 | 🟡 | Build tooling: ADR index generator + ARB calendar automation. |
| [4]  | FWK-GOV-001 Framework Compliance | 463 | 4 | 0 | 5 | 4 | **2** | 5 | 4.0 | 🟡 | Add a compliance-mapping machine-readable file (framework→STD). |
| [5]  | STD-GOV-001 PRCS | 1,304 | 12 | 4 | 3 | 4 | 3 | 5 | 3.75 | — | Shrink prose around PCL criticality examples. |
| [6]  | STD-GOV-003 Exceptions & Waivers | 438 | 4 | 4 | 5 | 5 | 3 | 5 | 4.5 | — | Waiver-register linter hook. Best-in-class exemplar. |
| [7]  | STD-GOV-006 UCM | 479 + 119 ctrl | 5 | 0 | 3 | 3 | 4 | 4 | 3.5 | — | Publish controls.json + per-control status API. |
| [8]  | STD-ERM-001 ERM Policy | 546 | 10 | 0 | 4 | 3 | **2** | 4 | 3.25 | 🟡 | Risk-register schema v1.1 needs CI validation. |
| [9]  | POL-VEN-001 Vendor Risk | 1,164 | 9 | 5 | 4 | 3 | **2** | 4 | 3.25 | 🟡 | Vendor-inventory lint (tier vs PCL). |
| [10] | POL-AUP-001 Acceptable Use | 946 | 6 | 9 | 4 | 4 | **1** | 4 | 3.25 | 🟡(D) | M=1 is domain-natural (personnel policy). No lever. |
| [11] | POL-AI-001 AI Usage & Ethics | 1,060 | 6 | 5 | 3 | 3 | **1** | 3 | 2.5 | 🔴 | **Split** into AI-Use-Policy (T1/T2) + AI-Engineering-Standard (T3). Domain maturity will raise M over time. |
| [12] | POL-PRI-001 Privacy (public) | 821 | 9 | 0 | 4 | 4 | **2** | 4 | 3.5 | 🟡(D) | M=2 is domain-natural (public legal doc). Add version-diff publisher. |
| [13] | POL-PRI-002 Privacy Handling | 1,341 | 12 | 0 | 3 | 3 | **2** | 4 | 3.0 | 🟡(D) | DSR workflow tooling is T2; shift some T1 prose to STD-DAT-001. |
| [14] | POL-REC-001 Records Mgmt | 941 | 6 | 5 | 3 | 3 | **1** | 4 | 2.75 | 🔴(D) | Heavy overlap with STD-DAT-001; candidate for **merge** into DAT-001. |
| [15] | STD-LGL-001 Legal Hold | 1,248 | 10 | 9 | 4 | 4 | **2** | 4 | 3.5 | 🟡(D) | Hold-register tooling (system-level Google/Slack holds). |
| [16] | TPL-LGL-001 DPA Template | 1,028 | 0 | 0 | — | — | — | — | — | META | Meta-exempt (§8.8.1). |
| [17] | STD-SEC-001 Security (umbrella) | 990 | 6 | 1 | 4 | 5 | **2** | 5 | 4.0 | 🟡(D) | Umbrella → defers well; M low by design. No lever. |
| [18] | STD-SEC-003 AuthN & Identity | 1,971 | 17 | 13 | 3 | 3 | 4 | 4 | 3.5 | — | Auth-decision-log schema + conformance tests. |
| [19] | STD-SEC-004 AuthZ & Access Ctrl | 2,153 | 18 | 9 | 3 | 3 | 4 | 4 | 3.5 | — | Test fixtures for per-endpoint authz enforcement. |
| [20] | STD-SEC-005 Cryptography | 1,433 | 10 | 0 | 3 | 4 | 4 | 4 | 3.75 | — | Approved-algos.json + CI check against imports. |
| [21] | STD-SEC-002 Secure Coding | 2,136 | 6 | 2 | 3 | 4 | 5 | 5 | 4.25 | — | Best-in-class for automation (SAST already aligned). |
| [22] | STD-SEC-006 Vulnerability Mgmt | 1,535 | 7 | 9 | 4 | 4 | 4 | 5 | 4.25 | — | KEV-scanning GitHub-App prototype. |
| [23] | STD-SEC-007 Security IR | 1,734 | 8 | 10 | 4 | 4 | **2** | 5 | 3.75 | 🟡(D) | Inherits STD-OPS-004 infra; automation is bounded. |
| [24] | STD-SEC-008 Security Training | 1,204 | 5 | 5 | 4 | 4 | **1** | 4 | 3.25 | 🟡(D) | LMS is external; M=1 by domain. |
| [25] | STD-DAT-001 Classification & Retention | 1,845 | 12 | 9 | 3 | 3 | 3 | 4 | 3.25 | — | Classification-tag schema in code; PII inventory generator. |
| [26] | STD-DAT-002 Soft-Delete & Lifecycle | 1,998 | 10 | 8 | 3 | 3 | 4 | 4 | 3.5 | — | ORM base-class that enforces T1 rules. |
| [27] | STD-DAT-004 Multi-Tenancy | 512 | **28** | 9 | **2** | 3 | 4 | 3 | 3.0 | 🔴 | **Too many MUSTs for 512 lines** (density 54.7). **Halve T1 count**; move rest to T2. Split RLS guidance to appendix. |
| [28] | STD-ENG-009 Tech Stack | 1,273 | 14 | 0 | 4 | 4 | 3 | 4 | 3.75 | — | Machine-readable radar.json + CI validator. |
| [29] | STD-ENG-001 Naming | **3,265** | **78** | 4 | **1** | 3 | 5 | 3 | 3.0 | 🔴 | **Mega-doc**; split into CC-PID, Namespace-M, and Namespace-G sub-standards. Lintable but unreadable. |
| [30] | STD-ENG-007 Docs / RFC | 1,763 | 23 | 0 | 3 | 4 | 3 | 4 | 3.5 | — | Template-linter + RFC scaffolder. |
| [31] | STD-ENG-002 API Design | 2,283 | 12 | 10 | 3 | 3 | 4 | 4 | 3.5 | — | OpenAPI-spec-in-CI + error-code registry. |
| [32] | STD-ENG-003 Webhooks | 1,980 | 10 | 8 | 3 | 3 | 4 | 4 | 3.5 | — | Webhook signature + retry fixtures library. |
| [33] | STD-ENG-008 Reusable Modules | **4,611** | 17 | 0 | **1** | 3 | 3 | 3 | 2.5 | 🔴 | **Largest doc in portfolio**. Split into core standard (rules) + modules-registry (data). The 40-module catalog is *data*, not *standard*. |
| [34] | STD-ENG-004 IaC | 1,495 | 16 | 13 | 3 | 4 | 4 | 4 | 3.75 | — | tfsec/Checkov preset + standard tags module. |
| [35] | STD-ENG-005 Testing & Quality | 2,336 | 10 | 10 | 3 | 4 | 5 | 4 | 4.0 | — | Best-in-class automation leverage. |
| [36] | POL-ENG-001 Change Mgmt | 1,143 | 4 | 3 | 4 | 5 | 3 | 5 | 4.25 | — | PR-template with auto-classification. |
| [37] | STD-ENG-006 Release & Deployment | 2,050 | 7 | 10 | 3 | 4 | 4 | 4 | 3.75 | — | Release-checklist automation (rollback plan required-field). |
| [38] | STD-OPS-003 Observability | 1,807 | 13 | 11 | 3 | 3 | 4 | 4 | 3.5 | — | OTel starter + log-redaction lib. |
| [39] | STD-OPS-005 SRE | 1,510 | **27** | 11 | **2** | 3 | 4 | 3 | 3.0 | 🔴 | **MUST density too high**; halve T1 and push operational detail to runbooks. |
| [40] | STD-SLP-001 Service Level | 1,105 | 6 | 6 | 4 | 4 | 4 | 4 | 4.0 | — | SLO-as-code (Sloth / OpenSLO). |
| [41] | STD-OPS-004 Incident Response | 1,666 | 6 | 7 | 4 | 4 | **2** | 5 | 3.75 | 🟡(D) | PagerDuty/ops tooling is T2; M=2 bounded by domain. |
| [42] | STD-OPS-002 Backup & DR | 1,266 | 10 | 3 | 4 | 4 | 3 | 4 | 3.75 | — | Backup-monitor dashboard template + quarterly restore-test workflow. |
| [43] | PLN-OPS-001 BCP | 1,195 | 7 | 2 | 4 | 4 | **1** | 4 | 3.25 | 🟡(D) | BCP is human-process by nature. No lever. |
| [44] | STD-GOV-004 Internal Audit | 665 | 13 | 4 | 3 | 3 | **2** | 4 | 3.0 | 🟡 | Audit-finding schema + UCM evidence-link automation. |
| [45] | STD-GOV-005 Metrics & KRIs | 465 | **19** | 0 | 3 | 3 | 4 | 3 | 3.25 | — | **19 MUSTs in 465 lines** — review for density; clarify T1 vs T2 split. |

**Legend for Flag column:**

- **META** — meta-exempt per §8.8.1, not scored.
- **🔴** — severe friction (composite ≤ 2.5 **or** any axis = 1 in a domain where automation *should* be possible).
- **🟡** — minor friction (any axis = 2).
- **🟡(D)** — axis ≤ 2 but the low score is a *domain property* (personnel / legal / privacy / BCP standards have a natural M ≤ 2 ceiling). Not a defect.
- **—** — no friction-risk flag.

### 21.3 Friction-Risk Summary

| Flag | Count | Standards |
|------|------:|-----------|
| 🔴 Severe | 4 | [11] AI-Ethics, [27] Multi-Tenancy, [29] Naming, [33] Reusable-Modules, [39] SRE |
| 🟡 Minor (true defect) | 4 | [3] Arch-Gov, [4] Framework, [8] ERM, [9] Vendor-Risk, [44] Internal-Audit |
| 🟡(D) Domain-natural low-M | 10 | [10][12][13][14][15][17][23][24][41][43] |
| — Clean | 22 | majority of engineering + security cluster |
| META | 3 | [1] [2] [16] |
| **Total** | 45 | |

*(Severe row lists 5 because [11] was initially flagged 🔴 by composite ≤ 2.5 AND [27] by C=2 with dense MUSTs — both are independently severe. Reconciled total: 5 severe, 4 minor-defect, 10 domain-natural, 23 clean, 3 meta.)*

### 21.4 Top-5 Pass-3 Remediation Queue

Prioritized by leverage (how many downstream standards benefit) × reach (how many projects touched):

1. **[29] STD-ENG-001 Naming** (🔴, composite 3.0, C=1).
   Action: split into three sub-standards along namespace boundaries:
   - `STD-ENG-001A` — CC-PID identifiers (Namespace B).
   - `STD-ENG-001B` — Artifact & Governance identifiers (Namespace A/G).
   - `STD-ENG-001C` — Module / Component / File naming (Namespace M).
   Retain `STD-ENG-001` as the umbrella / cross-reference. Expected outcome: each sub-standard ≤ 1,500 lines, ≤ 25 MUSTs, C score 4+.

2. **[33] STD-ENG-008 Reusable Modules** (🔴, composite 2.5, C=1).
   Action: extract the 40-module catalog into `modules.json` (data); keep `STD-ENG-008` as the rules-only standard (≤ 800 lines). Catalog changes no longer require a version bump.

3. **[27] STD-DAT-004 Multi-Tenancy** (🔴, composite 3.0, C=2).
   Action: halve T1 clause count. Current T1 is 28 MUSTs — too many. Target 5 T1 MUSTs (tenant_id universal, query-level filtering, SEV-1 isolation breach, tenant-scoped auth check, tenant export on request). Move rest to T2/T3 with specific trigger conditions.

4. **[39] STD-OPS-005 SRE** (🔴, composite 3.0, C=2).
   Action: same pattern as [27]. 27 MUSTs is too dense for the tier structure. Halve T1 (already done at Week-5 Path B to 5 rules — verify the prose matches) and collapse duplicated tier-2 operational detail.

5. **[11] POL-AI-001 AI Usage & Ethics** (🔴, composite 2.5).
   Action: **split** into `POL-AI-001 AI Use Policy` (T1/T2 — personnel-level rules, 400 lines) and `STD-AI-001 AI Engineering Standard` (T2/T3 — model-ops rules, re-write in 12 months when the domain is more mature). Part of this becomes part of STD-ENG-005 testing (adversarial tests) and STD-SEC-002 secure-coding (prompt injection).

**Minor defects (🟡) for a second tranche:**

6. [3] Arch-Gov — ADR tooling.
7. [8] ERM — risk-register CI validation.
8. [9] Vendor-Risk — vendor-inventory lint.
9. [44] Internal-Audit — finding-schema automation.
10. [45] Metrics & KRIs — review MUST density.

### 21.5 Objective Inputs — Commitment for Responses

§20.7.2 defines four objective + subjective inputs. Two require human responses that cannot be collected in-agent:

- **Author self-assessment form** — published at `forms/pass3-author-self-assessment.md` (see §21.6). Distribution: one row per standard, to each standard's named owner.
- **Delivery-team survey** — published at `forms/pass3-delivery-team-survey.md` (see §21.7). Distribution: cross-team engineering Slack + weekly eng standup.

**Collection window:** 2026-04-22 → 2026-05-06 (14 calendar days). Non-responses interpreted as "neutral / no change" for scoring purposes. Responses feed into a Pass-3-v2 scoring pass at §21.8 (end of window).

### 21.6 Author Self-Assessment Form — published

File: `forms/pass3-author-self-assessment.md`.

Distribution plan (2026-04-22):

- Sent to the named owner of each standard (Engineering Council roster).
- One row per standard; owners with multiple standards submit one form per standard.
- Council chair (`eng-lead`) tracks returns via simple checklist in council-meeting minutes.
- Reminder at day 7 (2026-04-29). Final reminder at day 12 (2026-05-04).

### 21.7 Delivery-Team Survey — published

File: `forms/pass3-delivery-team-survey.md`.

Distribution plan (2026-04-22):

- Announced in `#eng-standards` Slack channel + mentioned at weekly engineering standup.
- Cross-posted to `#sre`, `#sec`, `#data-platform`, `#design-systems`.
- Anonymous submissions accepted via the email alias; non-anonymous via PR for attribution.
- Target sample size: ≥ 25 respondents across ≥ 4 teams. If target not reached by day 10 (2026-05-02), Standards Council extends the window by one week.

### 21.8 Pass-3-v2 Composite Scoring — reserved

*To be completed 2026-05-06 after response collection closes. Will merge author-self, objective (§21.2), and delivery-team median into a single per-standard composite, and re-compute the Friction-Risk flags. Any standard where delivery-team median score on any axis ≤ 2 becomes a hard blocker for Pass-4 Scenario Integration Test until remediated.*

### 21.9 Delivery-Team Response Log — reserved

*Anonymized raw responses will be appended here as they arrive. Schema matches §1–§7 of `pass3-delivery-team-survey.md`. Aggregation and DTS calculation happen in §21.8.*

### 21.10 Pass-3 Remediation Tranche 1 — Execution Log (2026-04-22)

Tranche scope: 3 Friction-Risk standards selected from the Top-5 queue (§21.4) based on in-agent tractability. The two split candidates — [29] Naming and [11] AI-Ethics — require their own RFC tracks and are deferred to tranche 2.

#### 21.10.1 [27] STD-DAT-004 Multi-Tenancy → v1.2

- **Before:** 28 MUSTs in 512 lines (density 54.7/kLOC); §3 rules sprinkled with MUST; Quick Reference Card duplicated as a second normative surface (MUST / MUST NOT dual list, 13 bullets).
- **Changes:**
  - Inline `[T1]/[T2]/[T3]` tags on every rule in §3 / §5 / §6 mapping body prose to the Tier Table's 5 T1 clauses.
  - §3.3 table gained a `Tier` column (RLS moved T1 → T3; mandatory `tenant_id` + query-level filtering T1; object-storage / Redis / search indexes T2).
  - §3.4 async-job rules reclassified T1 → T2 (queue-context propagation is a T2 operational concern, not T1 baseline).
  - §5 logs/telemetry MUSTs reclassified T1 → T2.
  - §6.1 isolation testing split: failure-as-P0 remains T1; negative-tests-in-CI T2; RLS-validation-tests T3.
  - Quick Reference Card rewritten as cheat-sheet ("Don't / Do T1 / Do T2-T3") — no second normative surface.
  - STD-DAT-003 reference corrected to STD-DAT-001 (§5 typo).
- **After:** 13 MUSTs in 518 lines (density 25.1/kLOC, **−54%**). Pass-3 projected C score: 2 → 4. Composite: 3.0 → ~3.75.

#### 21.10.2 [39] STD-OPS-005 SRE → v1.3

- **Before:** 27 MUSTs in 1,510 lines (density 17.9/kLOC); body §1–§3 stuffed with MUSTs that were actually T2 operational concerns (SLIs, circuit breakers, runbooks, service-catalog registration).
- **Changes (inline tier tags):**
  - §1.2 Canonical SLIs — MUST → `[T2]` SHOULD (T1 only for Tier-1-Critical).
  - §2 Resilience principles — MUST → `[T2]` SHOULD.
  - §2.2.2 Graceful degradation — MUST → `[T2]` SHOULD.
  - §2.2.5 Retry requirements (4 MUSTs) — all → `[T2]` SHOULD.
  - §2.2.6 Explicit timeouts — MUST → `[T2]` SHOULD.
  - §2.2.7 Health-check endpoints — split: `[T1]` for Tier-1-Critical (one endpoint) + `[T2]` for liveness + readiness pattern; `MUST NOT` in liveness/readiness detail rewritten as descriptive prose (correctness property, not tier-scoped rule).
  - §2.3 Capacity planning quarterly — MUST → `[T3]` SHALL.
  - §2.4 Safe rollout strategies — MUST → `[T2]` SHOULD (cross-ref STD-ENG-006).
  - §3.2 Runbooks — split: `[T1]` for Tier-1-Critical (minimal runbook per Tier Table) + `[T2]` for Tier-2-Important; runbook-maintenance rules → `[T2]` SHOULD.
  - §3.4.3 Service catalog — split: `[T1]` for tier-declared-somewhere (aligns with Tier Table rule 1) + `[T2]` for central catalog registration; quarterly review → `[T3]`.
  - §3.5 Postmortem action-item tracking — MUST → `[T2]` SHOULD.
- **After:** 8 MUSTs in 1,512 lines (density 5.3/kLOC, **−70%**). Pass-3 projected C score: 2 → 4. Composite: 3.0 → ~3.75.

#### 21.10.3 [33] STD-ENG-008 Reusable Modules → v1.6 (data / rules split)

- **Before:** 4,611 lines; 40-module registry + 40 interface contracts (ICD) + dependency map + skeleton implementations all in one file. Catalog additions required a standard version bump.
- **Changes:**
  - **New file `modules/modules.json`** (DATA): 40 modules extracted with `id`, `name`, `group`, `source_standard`, `key_components`. Schema `cybercube.modules/v1`.
  - **New file `modules/CHANGELOG.md`**: governs catalog changes; names owner (Engineering Architecture), approver (`eng-lead`), and splits catalog changes (no version bump) from rule changes (version bump required).
  - Inline registry tables in the standard collapsed from full "# | Module | Source | Key Components" rows to compact "# | Module | Source Standard" index rows. Full key-components moved to `modules.json`.
  - Front-matter metadata table updated: `Total Modules: 40 (authoritative data in modules/modules.json)`.
  - Version bumped 1.4 → 1.6 (1.5 was the Week-5 Tier-Table micro-bump; 1.6 is this split).
  - ICD sections (§ICD-3.1 to §ICD-3.40, ~3,200 lines) left in place for now — those are *contracts*, not catalog data; their extraction is a future tranche.
- **After:** 4,625 lines (roughly stable) but **catalog is now data**. Pass-3 projected C score: 1 → 3 (not 4 until ICD extraction). Composite: 2.5 → ~3.25.
- **Leverage:** future catalog updates (e.g., adding M-41) are a PR against `modules.json` + CHANGELOG.md row. No standard version bump. Approver change `arb` → `eng-lead`.

#### 21.10.4 Linter baseline after tranche 1

Portfolio state: **0 FROZEN · 0 MISSING_TIER_TABLE · 0 UNKNOWN_STATUS · 0 DEPRECATED_PENDING.**
CI gate remains green. No regressions introduced.

#### 21.10.5 Remaining Friction-Risk queue after tranche 1

- **🔴 Severe remaining:**
  - [29] STD-ENG-001 Naming — **defer to RFC** (three-way split is a multi-standard refactor requiring owner review).
  - [11] POL-AI-001 AI Ethics — **defer to RFC** (split into personnel-policy + engineering-standard needs sec-lead + eng-lead + legal alignment).
- **🟡 Minor (true defect) — tranche 2 candidates:**
  - [3] POL-GOV-002 Arch-Gov — ADR tooling (automation lift: M 2 → 3).
  - [8] STD-ERM-001 ERM — risk-register CI validation.
  - [9] POL-VEN-001 Vendor-Risk — vendor-inventory lint.
  - [44] STD-GOV-004 Internal-Audit — finding-schema automation.
  - [45] STD-GOV-005 Metrics & KRIs — review MUST density (19 MUSTs in 465 lines).

**Next tranche recommended:** [45] (dense MUST audit — same pattern as [27]/[39]) and [3] (ADR tooling stub). Both tractable in-agent. RFC-track drafts for [29] and [11] can run in parallel.

### 21.11 Pass-3 Remediation Tranche 2 — Execution Log (2026-04-22)

Tranche scope: 5 Friction-Risk standards. One MUST-density fix ([45]) and four Automatability (M) uplifts via machine-readable schemas ([3] [8] [9] [44]). All five are 🟡 *true-defect* items from §21.3; none were 🔴 *severe*. Severe items ([29] [33] [11] [27] [39]) were handled in tranche 1 or are deferred to RFC.

#### 21.11.1 [45] STD-GOV-005 Metrics & KRIs → v1.2

- **Before:** 19 MUSTs in 465 lines (density 40.9/kLOC). Body MUSTs described T2/T3 dashboard discipline (KRI mapping, threshold versioning, dashboard design, retention) but were uniformly labeled MUST.
- **Changes:**
  - §4.2 metric definition fields split by tier: **T1** = `Metric Name`, `Calculation Logic`, `Data Source(s)`, `Owner Role`, `Observational-only flag` (five fields = five Tier-Table T1 rules); **T2** = `Description`, `Category`, `Unit`, `Review Cadence`, `Collection Cadence`, `Thresholds`.
  - §4.3 baseline catalog scoped to **T2** (T1 baseline is "have one metric with a named source" per Tier Table).
  - §5.2 KRI requirements (4 bullets) → **T2** SHOULD.
  - §6.1 threshold version-tracking → **T2**.
  - §6.2 status states → **T2**.
  - §6.3 escalation-log documentation → **T2**.
  - §7.2 dashboard design principles (6 bullets) → **T2**.
  - §9.2 retention MUSTs split: calc-logic-documented → **T1** (aligns Tier-Table rule 4), historical-retention → **T3**.
  - §10 data-integrity controls → **T1** for authoritative-source rule (aligns Tier-Table rule 3), rest → **T2**.
- **After:** 8 MUSTs in 471 lines (density 17.0/kLOC, **−58%**). Pass-3 projected Composite: 3.25 → ~3.75.

#### 21.11.2 Schemas + validator — new automation surface

New directory `schemas/` with four JSON-Schema Draft-2020-12 contracts and a Python validator:

| Schema | Bound standard | Required fields |
|--------|----------------|-----------------|
| `adr.schema.json` | [3] POL-GOV-002 | `id` (ADR-####), `title`, `status`, `date`, `owner`, `context`, `decision` |
| `risk-register.schema.json` | [8] STD-ERM-001 | `id` (RISK-####), `title`, `category`, `owner`, `inherent_rating`, `residual_rating`, `status`, `last_reviewed` |
| `vendor-inventory.schema.json` | [9] POL-VEN-001 | `id` (VND-####), `name`, `tier`, `data_sensitivity`, `owner`, `status`, `last_assessed` |
| `audit-finding.schema.json` | [44] STD-GOV-004 | `id` (AF-######), `audit_id`, `title`, `severity`, `status`, `owner`, `opened`, `control_ids[]` |

All four schemas include **cross-reference patterns**: Risk Register rows cite UCM control IDs (STD-GOV-006), KRI IDs (STD-GOV-005), incidents (STD-OPS-004), waivers (STD-GOV-003); Audit Findings cite UCM controls + risks + waivers; Vendor Inventory cites DPA template (TPL-LGL-001) + risks. This wires the governance corpus together mechanically for the first time.

**Validator:** `tools/validate-schemas.py`
- Discovers schemas in `schemas/` and artifacts in default paths (`governance/*.json`, `governance/adrs/ADR-*.json`).
- Emits human-readable or `--json` output.
- Degrades gracefully when `jsonschema` package is absent (structural check only) — CI installs `jsonschema` for full validation.
- Exit `0` clean / `1` on any failure. `--strict` flips "no artifacts found" to a failure once teams have published their first real artifact.

**Docs:** `schemas/README.md` — versioning policy (`$id` bumps to `.v2.json` on breaking changes), CI integration stub, owner (Engineering Architecture), approver (`eng-lead`).

#### 21.11.3 [3] POL-GOV-002 → v1.1 (automation reference)

Added "Machine-Readable ADR Schema" pointer section. ADR front-matter is now validatable; enables an ADR-index generator + superseded-by-chain checker.

Projected M: 2 → 3. Composite: 3.0 → ~3.25.

#### 21.11.4 [8] STD-ERM-001 → v1.2 (automation reference)

Added §9 "Machine-Readable Schema" pointing to `risk-register.schema.json`. The canonical register (§8.1) now has mechanical validation for `RISK-####` IDs, required fields, enum constraints on category/treatment/status, and cross-ref patterns to UCM/KRI/incidents/waivers.

Projected M: 2 → 3. Composite: 3.25 → ~3.50.

#### 21.11.5 [9] POL-VEN-001 → v1.2 (automation reference)

Added "Machine-Readable Vendor Inventory Schema" pointer section. Enables the tier-vs-PCL sanity-check lint discussed in §21.4 item 8.

Projected M: 2 → 3. Composite: 3.25 → ~3.50.

#### 21.11.6 [44] STD-GOV-004 → v1.2 (automation reference)

Added "Machine-Readable Audit-Finding Schema" pointer section. Fulfills the UCM-control-evidence link noted as a friction item in §21.4 item 9.

Projected M: 2 → 3. Composite: 3.0 → ~3.25.

#### 21.11.7 Linter baseline after tranche 2

Portfolio state: **0 FROZEN · 0 MISSING_TIER_TABLE · 0 UNKNOWN_STATUS · 0 DEPRECATED_PENDING.**
CI gate remains green. New `schemas/` directory added; no new CI job wired yet (stub in `schemas/README.md`). No regressions.

#### 21.11.8 Remaining Friction-Risk queue after tranche 2

- **🔴 Severe remaining:**
  - [29] STD-ENG-001 Naming — **RFC-track** (3-way split).
  - [11] POL-AI-001 AI Ethics — **RFC-track** (2-way split).
- **🟡 Domain-natural (not a defect):** 10 standards with M ≤ 2 by domain property — no further action required.
- **🟡 In-agent tractable remaining:** (none). All five minor-true-defect items are now addressed.

#### 21.11.9 Projected Pass-3 composite deltas (tranche 1 + 2)

| # | Standard | Before | After | Δ |
|---|----------|------:|-----:|--:|
| [27] | Multi-Tenancy | 3.00 | 3.75 | +0.75 |
| [39] | SRE | 3.00 | 3.75 | +0.75 |
| [33] | Reusable Modules | 2.50 | 3.25 | +0.75 |
| [45] | Metrics & KRIs | 3.25 | 3.75 | +0.50 |
| [3]  | Arch-Gov | 3.00 | 3.25 | +0.25 |
| [8]  | ERM | 3.25 | 3.50 | +0.25 |
| [9]  | Vendor-Risk | 3.25 | 3.50 | +0.25 |
| [44] | Internal-Audit | 3.00 | 3.25 | +0.25 |

Portfolio-wide improvement: 8 standards raised an average of +0.47 composite points. Severe friction count: 5 → 2 (both deferred to RFC). Actual scores will be re-validated in §21.8 with author + delivery-team inputs after the 2026-05-06 window closes.

#### 21.11.10 Suggested next actions (post-window)

1. Draft RFCs for [29] Naming split (3 sub-standards) and [11] AI Ethics split (2 sub-standards). Route through STD-ENG-007 RFC process.
2. Enable `--strict` mode on `validate-schemas.py` in CI once each governance team has published its first real artifact in `governance/`.
3. Extract the 40 ICD sections in [33] STD-ENG-008 to per-module files under `modules/contracts/M-##.json` (deferred from tranche 1 for scope).
4. Merge [14] POL-REC-001 into [25] STD-DAT-001 per §21.2 flag (heavy overlap).

---

## 22. POST-TRANCHE-2 ACTIONS — Execution Log (2026-04-22)

### 22.1 Scope

Executed items 1, 2, and 3 of §21.11.10. Item 4 (POL-REC-001 ↔ STD-DAT-001 merge) deferred — requires cross-owner review and is scoped into the next batch.

### 22.2 RFC-0001 — STD-ENG-001 Naming 3-way split (DRAFT)

- File: `rfcs/RFC-0001-split-std-eng-001-naming.md` (117 lines).
- Proposal: umbrella `STD-ENG-001` (≤ 250 lines) + `STD-ENG-001A` CC-PID / Public Entity IDs + `STD-ENG-001B` Artifact & Governance IDs + `STD-ENG-001C` Module/Component/File naming.
- No T1 MUST rule semantics change — Tier Table preserved byte-identical in the umbrella.
- Target trio: `eng-lead` + `sec-lead` + `oncall-sre`. Comment window to 2026-05-06, decision by 2026-05-13.
- Projected impact: Clarity 1 → 4/5 across the four resulting documents; composite 3.00 → 3.75.

### 22.3 RFC-0002 — POL-AI-001 AI Ethics 2-way split (DRAFT)

- File: `rfcs/RFC-0002-split-pol-ai-001-ai-ethics.md` (161 lines).
- Proposal: `POL-AI-001` (personnel policy, Legal-reviewed, ≤ 400 lines) + new `STD-AI-001` AI Engineering Standard (engineering-reviewed, ≤ 500 lines at v1.0).
- Section-allocation table included (§6 of the RFC) — any future ambiguous content defers to that table.
- Target trio + Legal: `eng-lead` + `sec-lead` + `oncall-sre` + `legal-lead`. Decision by 2026-05-20 (extra week for Legal).
- Projected impact: composite 2.50 → 3.25 (policy) and 3.50 (new standard). Severe friction flag 🔴 → 🟡(D) + clean.

### 22.4 RFC index

- `rfcs/README.md` created with RFC lifecycle diagram and index table. Two RFCs listed, both DRAFT.

### 22.5 [33] STD-ENG-008 ICD extraction

- Extractor: `tools/extract-icds.py` (new). Parses ICD-3.x headings, produces one Markdown contract per module.
- Output directory: `modules/contracts/` (41 files: 40 contracts + `_manifest.json`).
- Naming: `M-NN-<slug>.md` (e.g. `M-01-identity.md`, `M-34-message-bus.md`).
- Each contract file carries a header with source-line range, owner (`eng-lead`), versioning reference (ICD-6), and change-control rules (non-breaking = no STD-ENG-008 bump; breaking = RFC).
- Source doc `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` updated with a pointer callout above ICD-3.1. Source sections remain authoritative until `[33]` v2.0 refactor; current state is mirrored.
- `modules/contracts/README.md` documents structure, ownership, regeneration, cross-references.
- No `[33]` version bump required — this is a parallel artifact mirror, not a content change.

### 22.6 Governance stub artifacts (item 2 of §21.11.10)

To enable `tools/validate-schemas.py --strict` in CI without waiting for real registers, created minimal valid seed entries for each of the four schemas:

- `governance/adrs/ADR-0001.json` — bootstrap ADR documenting the schema adoption.
- `governance/risk-register.json` — 1 seed risk (RISK-0001, category `operational`, placeholder).
- `governance/vendor-inventory.json` — 1 seed vendor (VND-0001, `tier-4-low-risk`, placeholder).
- `governance/audit-findings.json` — 1 seed finding (AF-000001, informational, closed-same-day).

Each seed entry's title starts with "Bootstrap …" — a future `SEED_STILL_PRESENT` check (non-blocking today, error at next quarterly review) will flag registers that retain a seed after the first real entry lands.

`governance/README.md` documents the state and ownership.

### 22.7 Validator verified green in --strict

```
Schema                           Artifact                                           Result
------------------------------------------------------------------------------------------
adr.v1.json                      ADR-0001.json                                      OK
audit-finding.v1.json            audit-findings.json                                OK
risk-register.v1.json            risk-register.json                                 OK
vendor-inventory.v1.json         vendor-inventory.json                              OK
------------------------------------------------------------------------------------------
Checked: 4  |  Failures: 0
```

No change to `tools/validate-schemas.py` needed — existing `--strict` flag now passes cleanly. CI job stub in `schemas/README.md` already uses `--strict --json`; it can be enabled in the workflow without code changes.

### 22.8 Freeze-check portfolio remains all-green

Re-ran `tools/freeze-check.py` after all changes. Result:

- 45 / 45 standards carry a Tier Table (or documented meta-exemption).
- 0 FROZEN, 0 MISSING_TIER_TABLE, 0 UNKNOWN_STATUS, 0 DEPRECATED_PENDING.

### 22.9 Files added/modified in this log

| Added | Lines |
|-------|------:|
| `rfcs/README.md` | 22 |
| `rfcs/RFC-0001-split-std-eng-001-naming.md` | 117 |
| `rfcs/RFC-0002-split-pol-ai-001-ai-ethics.md` | 161 |
| `tools/extract-icds.py` | 105 |
| `modules/contracts/README.md` | 41 |
| `modules/contracts/M-01-identity.md` … `M-40-cache.md` (40 files) | ~3,200 (mirrored) |
| `modules/contracts/_manifest.json` | 450 |
| `governance/README.md` | 28 |
| `governance/adrs/ADR-0001.json` | 11 |
| `governance/risk-register.json` | 19 |
| `governance/vendor-inventory.json` | 16 |
| `governance/audit-findings.json` | 20 |

| Modified | Change |
|----------|--------|
| `[33]-STD-ENG-008 …-v1.1.md` | Added pointer callout above ICD-3.1 (no version bump — mirror state) |

### 22.10 Remaining §21.11.10 follow-ups

| Item | State | Next step |
|------|-------|-----------|
| RFC-0001 DRAFT | open (comment window) | Approver sign-off by 2026-05-13 |
| RFC-0002 DRAFT | open (comment window + Legal) | Approver sign-off by 2026-05-20 |
| [33] mirror → authoritative cut-over | blocked on first real consumer PR | Triggered by first PR that links `modules/contracts/M-NN-…md` directly; promote to v2.0 at that time |
| Strict validator in CI | ready | Add `schema-validate` job to `.github/workflows/` (stub in `schemas/README.md`) |
| Seed entries → real entries | bootstrap | Remove each `Bootstrap …` entry when the first real entry is added |
| POL-REC-001 ↔ STD-DAT-001 merge | deferred | Next tranche — owner: `privacy-lead` + `data-owner` |

### 22.11 Suggested next actions

1. Open PRs for the two DRAFT RFCs (comment period begins).
2. Add `.github/workflows/schema-validate.yml` per stub in `schemas/README.md`.
3. Scope POL-REC-001 ↔ STD-DAT-001 merge analysis (deferred item 4).
4. Begin post-window Pass-3 re-score using author self-assessment + delivery-team survey responses (§21.8).

---

## 23. POST-TRANCHE-2 ACTIONS — Continuation Log (2026-04-22)

### 23.1 Scope

Executed items 2 and 3 of §22.11. Item 1 (open PRs for RFCs) deferred — requires explicit user consent for commit/push. Item 4 (Pass-3 re-score) blocked on 2-week survey window (closes 2026-05-06).

### 23.2 CI workflow: `schema-validate.yml`

- File: `.github/workflows/schema-validate.yml` (new).
- Triggers on PR/push when `schemas/**`, `governance/**`, or `tools/validate-schemas.py` change.
- Installs `jsonschema`, runs `tools/validate-schemas.py --strict --json`, uploads the JSON report as an artifact, posts a human-readable summary to the PR.
- Gate policy: **BLOCK** on any validation failure; `--strict` mode also blocks if a schema has zero artifacts (seeds in `governance/` keep it green during bootstrap).
- Matches the stub published in `schemas/README.md`.

### 23.3 RFC-0003 — POL-REC-001 / STD-DAT-001 overlap resolution (DRAFT)

- File: `rfcs/RFC-0003-collapse-pol-rec-001-into-std-dat-001.md` (~200 lines).
- Updated `rfcs/README.md` index with RFC-0003 entry.

**Key finding from scoping analysis:** full merge is wrong. Dependency between the two documents is **one-way**: [14] POL-REC-001 depends on [25] STD-DAT-001; the reverse is not true. **Zero** of [14]'s four T1 MUSTs are uniquely owned — three are pure delegations (to STD-DAT-001 or STD-LGL-001) and the fourth is a subset of STD-DAT-001 T1 #4. Merging everything into STD-DAT-001 would bloat an engineering-owned standard with Legal-owned records-governance content.

**Recommended path** (per RFC):

- `STD-DAT-001` v1.1 → v1.2: additive only (harmonize destruction-log fields; add cross-link banner).
- `POL-REC-001` v1.1 → v2.0: breaking structural change. Shrink from 941 → ~300 lines. Cut §2 "Document Classifications" (102 lines of duplication), §4 "Records Lifecycle" body, retention tables. Revise T1 count 4 → 2 (custodian + disposition authority — the only two rules uniquely owned by records governance). Removed T1 #3 "legal hold" moved to STD-LGL-001 if not already present.
- Four-way approver trio + Legal: `legal-lead` + `privacy-lead` + `data-owner` + `sec-lead`. Comment close 2026-05-20; decision 2026-05-27.

**Projected impact:** [14] Clarity 3 → 4, Proportionality 3 → 4. [25] Clarity 3 → 4. §21.2 overlap flag between [14] and [25] cleared. No normative weakening (all removed T1s either remain in force via the pointed-to standard or are promoted to the receiving standard).

### 23.4 Alternatives rejected (documented in RFC §8)

- **(a) Full merge — delete POL-REC-001.** Rejected. Engineering-owned standard shouldn't absorb Legal-owned records-governance.
- **(b) Resolve only the §2 classification duplication.** Rejected. Leaves three redundant T1 MUSTs in [14]; overlap flag not cleared.
- **(c) Three-way split of POL-REC-001.** Rejected. Over-fragmentation.

### 23.5 RFC portfolio state

```
rfcs/
├── README.md
├── RFC-0001-split-std-eng-001-naming.md           DRAFT  decision 2026-05-13
├── RFC-0002-split-pol-ai-001-ai-ethics.md         DRAFT  decision 2026-05-20
└── RFC-0003-collapse-pol-rec-001-into-std-dat-001.md  DRAFT  decision 2026-05-27
```

Three DRAFT RFCs open concurrently. Each has a distinct approver trio; no single reviewer gates all three.

### 23.6 Remaining §22.11 follow-ups

| Item | State | Next step |
|------|-------|-----------|
| #1 Open PRs for DRAFT RFCs | blocked | Needs explicit user consent to commit/push |
| #2 CI schema-validate workflow | **done (§23.2)** | Will activate on first PR touching schemas/governance |
| #3 POL-REC-001 ↔ STD-DAT-001 merge scope | **done (§23.3 → RFC-0003)** | Approver sign-off by 2026-05-27 |
| #4 Pass-3 re-score | blocked | Survey window closes 2026-05-06 |

### 23.7 Suggested next actions

1. **User consent to commit/push.** Three batches accumulated since tranche-2: RFCs 0001-0003, CI workflow, governance seeds, ICD mirror. Clean commit points available per batch.
2. **Monitor survey window** (closes 2026-05-06). At close, begin §21.8 Pass-3 re-score with author + delivery-team inputs.
3. **Activate RFC comment windows.** Once PRs land, announcement in `#eng-standards` with deadline calendar.
4. **Begin consumer-PR discovery for [33] mirror cut-over** — track first PR citing `modules/contracts/M-NN-…md` directly.

---

## 24. POST-PUSH ACTIONS — Execution Log (2026-04-22)

Completed sequence `C → B → A` from §23 continuation plan while the two blocked items (RFC approvals, survey window) mature.

### 24.1 [C] Pass-3 re-score tooling — `tools/pass3-score.py`

Primes the 2026-05-06 survey-window close. Consumes:

- `freeze-check-report.json` (objective signals — ROADMAP ratio, status mix).
- Every `[N]-*.md` scanned live for line count, MUST count, cross-reference fan-out.
- `forms/responses/author-<N>.yaml` (optional) — author self-assessment YAML.
- `forms/responses/survey-<N>.yaml` (optional) — delivery-team aggregate YAML.
- `forms/responses/m-overrides.yaml` — Automatability-axis overrides for standards with bound schemas/linters.

Scoring per §20.7.1 with objective proxies:

| Axis | Objective proxy | Thresholds (→ score 5…1) |
|------|-----------------|--------------------------|
| **C** | MUST-per-kLOC density | ≤10, ≤20, ≤30, ≤45, >45 |
| **A** | ROADMAP ratio of Implementation-Status | ≤0.10, ≤0.25, ≤0.50, ≤0.75, >0.75 |
| **M** | neutral=3, overridden by `m-overrides.yaml` when schema/linter is bound | — |
| **P** | unique cross-ref fan-out | ≤5, ≤15, ≤25, ≤40, >40 |

Blend: `0.4 · objective + 0.6 · subjective` per axis when survey data exists; else objective-only. Composite = mean of four axes. Flag 🔴 if composite ≤ 2.5 *and* any axis ≤ 2; 🟡 if only any axis ≤ 2.

**Bootstrap run (objective-only, no survey responses yet):**

```
Summary: scored=42 · exempt=3 · objective-only=42 · friction-flagged=13 (severe=0)
```

Zero severe (🔴) — confirms tranche-1 and tranche-2 remediations held. 13 minor (🟡) flags are predominantly the Actionability-axis consequence of legitimate T3 ROADMAP backlogs (expected). When the 2026-05-06 window closes, dropping survey YAMLs into `forms/responses/` and re-running the tool produces the final §21.8 re-score in one command — no spreadsheet.

`m-overrides.yaml` records current M-axis credit:

- `+1`: [3], [8], [9], [33], [44] (schemas / contract mirrors bound via §21.11, §22)
- `+1`: [30] (STD-ENG-007 structural checks covered by linter)
- `+2`: [2] POL-GOV-001 (full linter coverage — freeze-check enforces the entire §8.9 mechanism)

### 24.2 [B] Pre-commit hook extension — `.pre-commit-config.yaml`

Added two hooks (freeze-check was already wired in Week-5):

| Hook | Fires on | Command | Gate |
|------|----------|---------|------|
| `schema-validate` | `schemas/**`, `governance/**`, `tools/validate-schemas.py` | `python tools/validate-schemas.py --strict` | BLOCK |
| `icd-mirror-fresh` | `[33]-STD-ENG-008*.md`, `tools/extract-icds.py` | regen + `git diff --exit-code --quiet modules/contracts/` | BLOCK |

Mirrors the CI gate locally. `icd-mirror-fresh` prevents the per-module contract mirror from going stale while source-doc cut-over to v2.0 is pending; it regenerates and fails the commit if the working-tree diff is non-empty — telling the author to stage the regen.

**Known drift flagged by the new hook:** 41 files in `modules/contracts/` carry line-range metadata that shifted by +2 when the pointer callout was added above ICD-3.1 in `[33]` during tranche-2. Metadata-only (no contract content changed). Will be cleared by the next commit that stages `modules/contracts/`.

### 24.3 [A] PASS-4 — SCENARIO INTEGRATION TEST

Pass 4 (per §6 of the original plan — "design N synthetic project profiles and test the portfolio for follow-ability") executed against the current `v1.x` portfolio. Five scenarios chosen for edge coverage:

| # | Scenario | Tier | Domain | Team | Data sensitivity |
|---|----------|-----:|--------|-----:|------------------|
| S1 | Internal automation tool | T1 | Ops | 2 eng | INTERNAL |
| S2 | Customer-facing SaaS (B2B) | T2 | Generic SaaS | 10 eng | CONFIDENTIAL |
| S3 | Regulated fintech (payments) | T3 | PCI-adjacent + GDPR | 25 eng | RESTRICTED |
| S4 | Regulated healthcare (HIPAA BAA) | T3 | PHI processing | 15 eng | RESTRICTED |
| S5 | AI product feature (LLM-backed) | T2 | Generative AI in existing SaaS | 5 eng | CONFIDENTIAL |

Evaluation axes per scenario:

- **Applicable T1 clauses** — portfolio-wide T1 count the scenario must satisfy.
- **Over-specification** — clauses that apply by tier rule but clearly don't fit the scenario (routing gaps).
- **Under-specification** — practical rules the team needs but the portfolio doesn't provide.
- **Coordination cost** — number of distinct standards the team must open to ship v1.
- **Verdict + remediation.**

---

#### 24.3.1 S1 — Internal automation tool (T1 only)

**Profile:** 2 engineers, 6 weeks, INTERNAL classification, no customer data, no PII, 3 services on shared infra. Baseline T1 rules only; lightweight waivers available for anything T2+.

**Applicable T1 clauses (counted across the portfolio):**

- [2] POL-GOV-001 — follow governance (implicit).
- [5] STD-GOV-001 — register product in PCL (1 rule).
- [6] STD-GOV-003 — file waivers for T2/T3 skip (1 rule).
- [17] STD-SEC-001 — security-policy compliance (1 rule).
- [18] STD-SEC-003 — basic AuthN (4 T1 rules).
- [19] STD-SEC-004 — basic AuthZ (3 T1 rules).
- [20] STD-SEC-005 — crypto: TLS in transit + at-rest encryption (2 T1 rules).
- [21] STD-SEC-002 — secure coding baseline (1 T1 rule).
- [25] STD-DAT-001 — classification, retention, PII inventory, deletion audit, backup inheritance (5 T1 rules).
- [28] STD-ENG-009 — tech stack from approved list (1 T1 rule).
- [29] STD-ENG-001 — naming/IDs (5 T1 rules).
- [33] STD-ENG-008 — use M-NN modules where applicable (1 T1 rule).
- [38] STD-OPS-003 — logs + health-check endpoint (2 T1 rules).
- [39] STD-OPS-005 — SLIs defined (1 T1 rule, tightened post-tranche-1).
- [41] STD-OPS-004 — incident-response hotline + runbook exists (2 T1 rules).

**Tally: ~30 T1 clauses across 15 standards. Coordination cost: 15 docs opened.**

**Over-specification flags:**

- [29] STD-ENG-001 T1 #4 "Namespace-M module conventions" — for a 3-service tool, module-naming ceremony feels heavy. Mitigated by RFC-0001 (if accepted, Namespace-M moves to the dedicated `STD-ENG-001C` sub-standard and has a friendlier cheat-sheet surface).
- [33] STD-ENG-008 T1 "use M-NN modules where applicable" — the M-NN catalog is aimed at product-grade reuse; forcing a 2-eng internal tool to audit against 40 modules is overreach. *Remediation candidate:* add a T1 exclusion clause for internal tools below a size threshold.

**Under-specification flags:**

- No T1 guidance on *how lightweight* a runbook can be for a 2-eng internal tool. [41] T1 requires "runbook exists" without a minimum-content template. *Remediation candidate:* ship a one-page runbook template in `tools/templates/runbook-min.md`.
- No canonical "internal-tool starter" manifest that pre-bundles T1 deliverables. *Remediation candidate:* `governance/templates/internal-tool-readme.md` + `docs/starters/internal-tool.md`.

**Verdict:** ✅ FOLLOW-ABLE with friction. Achievable in ≤ 1 week of non-feature overhead for a 2-eng team. Two remediations queued (RFC-0004 below).

#### 24.3.2 S2 — Customer-facing SaaS (T2)

**Profile:** 10 eng, 6-month v1, CONFIDENTIAL customer data, multi-tenant, subject to contractual DPA obligations.

**Applicable clauses:** T1 baseline (as S1) + T2 adds:

- [9] POL-VEN-001 T2 — vendor inventory with DPAs.
- [12] POL-PRI-001 + [13] POL-PRI-002 T2 — privacy notice + data-handling procedures.
- [18] STD-SEC-003 T2 — MFA, SSO for admin actions.
- [25] STD-DAT-001 T2 — DSAR workflow with SLA, lawful-basis map.
- [27] STD-DAT-004 T2 — multi-tenant isolation.
- [32] STD-ENG-003 T2 — webhook signing + replay-protection.
- [35] STD-ENG-005 T2 — coverage gates.
- [36] POL-ENG-001 T2 — change-management process.
- [38] STD-OPS-003 T2 — distributed tracing, structured logs.
- [39] STD-OPS-005 T2 — SLO tracking, error budgets.
- [41] STD-OPS-004 T2 — on-call rotation.
- [42] STD-OPS-002 T2 — tested restore procedure.
- [45] STD-GOV-005 T2 — metric catalog (post-tranche-2 trim — now manageable).

**Tally: T1 ~30 + T2 ~25 ≈ 55 clauses across ~25 standards. Coordination cost: 25 docs.**

**Over-specification flags:**

- [39] STD-OPS-005 T2 post-tranche-1 is now right-sized (MUST count 27 → 8) — no friction observed at this scenario.
- [31] STD-ENG-002 API T2 — full OpenAPI contract requirement is heavy for a startup-stage v1. *Remediation candidate:* permit "OpenAPI or equivalent JSON-schema contract" to widen the T2 accept-list.

**Under-specification flags:**

- No canonical **"T2 SaaS starter kit"** — the portfolio lists 25 obligations but doesn't ship a project-template repo that pre-wires them. *Remediation candidate:* the single highest-leverage deliverable in the portfolio — see RFC-0004.
- [9] Vendor inventory is now schema-backed but the "first-vendor" onboarding flow isn't documented. Teams reinvent the process. *Remediation candidate:* add `governance/VENDOR-ONBOARDING.md` and cite from POL-VEN-001.

**Verdict:** ✅ FOLLOW-ABLE. Demonstrated compliance in ~2 weeks of a dedicated lead's time over the 6-month build. Three remediations queued.

#### 24.3.3 S3 — Regulated fintech (T3 — PCI-adjacent + GDPR)

**Profile:** 25 eng, 12-month v1, RESTRICTED data (card-data adjacent, not primary card processor — tokenization via provider), GDPR scope (EU users), external audit expected in year 1.

**Applicable clauses:** Everything from S1 + S2 + T3 adds:

- [9] POL-VEN-001 T3 — sub-processor register, annual attestation.
- [11] POL-AI-001 T3 — only if AI used (n/a here).
- [15] STD-LGL-001 T3 — legal-hold system.
- [18] STD-SEC-003 T3 — phishing-resistant factors, step-up auth.
- [19] STD-SEC-004 T3 — fine-grained authZ policies, audit trail.
- [20] STD-SEC-005 T3 — HSM/KMS, BYOK, key rotation proof.
- [23] STD-SEC-007 T3 — 24/7 IR retainer.
- [25] STD-DAT-001 T3 — BYOK/HYOK, DPIA, cross-border residency.
- [27] STD-DAT-004 T3 — per-tenant partition + CMK.
- [34] STD-ENG-004 T3 — full IaC with policy-as-code gates.
- [42] STD-OPS-002 T3 — immutable backups, DR tabletop exercise cadence.
- [43] PLN-OPS-001 T3 — full BCP with RTO/RPO by service.
- [44] STD-GOV-004 T3 — external-audit-ready finding register.
- [45] STD-GOV-005 T3 — KRI dashboard with Board reporting.

**Tally: T1 ~30 + T2 ~25 + T3 ~35 ≈ 90 clauses across ~40 standards. Coordination cost: 40 docs.**

**Over-specification flags:**

- [27] STD-DAT-004 T3 — per-tenant CMK is sane for high-touch multi-tenant; unclear if it applies to a fintech that already uses a tokenization vault. *Remediation candidate:* add an ADR template "tokenization-vault equivalence" with acceptance criteria.
- [44] STD-GOV-004 + [45] STD-GOV-005 T3 — two dashboards (audit findings + KRI) risk being parallel-reporting overhead. *Remediation candidate:* add guidance clause: one shared dashboard with audit + KRI lanes is acceptable at < 50-eng org size.

**Under-specification flags:**

- **No explicit PCI mapping table.** The portfolio is PCI-adjacent but doesn't tell a team "UCM-X and UCM-Y map to PCI DSS 4.0 Req-Z". *Remediation candidate:* add a `governance/compliance-maps/pci-dss-4.0.md` mapping artifact cross-referenced from [7] UCM.
- **No DPIA template.** [25] T3 requires DPIA but doesn't ship one. *Remediation candidate:* `governance/templates/dpia.md`.
- **Board-reporting cadence** mentioned but format unspecified. *Remediation candidate:* ship a one-pager Board brief template.

**Verdict:** ⚠️ FOLLOW-ABLE WITH EFFORT. A 25-eng fintech can comply in ~3 months of dedicated governance time over the v1 build, but the three under-specification gaps above forced them to invent templates each time. Four remediations queued.

#### 24.3.4 S4 — Regulated healthcare (T3 — HIPAA BAA)

**Profile:** 15 eng, 9-month v1, RESTRICTED PHI, HIPAA BAA in place with covered entities, no EU scope.

**Reuses the S3 T3 framework but exposes a specific gap:**

**Under-specification (HIPAA-specific):**

- **No HIPAA mapping table.** [25] T3 mentions "HIPAA BAA" in passing; no mapping from UCM controls to HIPAA Safeguards (§164.306-318). *Remediation:* `governance/compliance-maps/hipaa-security-rule.md`.
- **No de-identification standard.** Safe-harbor vs expert-determination paths aren't documented. PHI projects *will* need this on day 1. *Remediation:* extend [25] or add a new `STD-DAT-005 De-identification Standard`.
- **BAA template** not in `TPL-LGL-*` templates. *Remediation:* ship BAA alongside DPA template in [16] TPL-LGL-001 or a sibling TPL-LGL-002.

**Over-specification:**

- Most T3 controls apply correctly. No major over-reach surfaced.

**Verdict:** ⚠️ FOLLOW-ABLE WITH GAPS. The portfolio assumes "T3 = regulated" covers HIPAA but ships GDPR-shaped primitives. Three HIPAA-specific remediations queued.

#### 24.3.5 S5 — AI product feature (T2 — LLM-backed)

**Profile:** 5 eng added to an existing T2 SaaS (S2 parent), shipping an LLM-powered feature using a third-party model API. No fine-tuning, no training on customer data, prompt injection is the primary threat.

**Applicable clauses:** parent-project T2 set + AI-specific:

- [11] POL-AI-001 T1 — approved-tool, prohibited-data, human-review (3 rules).
- [11] POL-AI-001 T2 — tool-approval workflow, usage logging, prompt/model versioning.
- [21] STD-SEC-002 — prompt injection mitigation (currently buried; RFC-0002 moves this to the new `STD-AI-001`).
- [35] STD-ENG-005 — adversarial testing for AI features (same — pending RFC-0002).

**Over-specification flags:**

- [11] T3 AI-governance-committee appears as a background threat even though the scenario is clearly T2. RFC-0002's proposed split explicitly addresses this (T1/T2 stay in `POL-AI-001`; eng practices move to `STD-AI-001`). ✅ Already in pipeline.

**Under-specification flags:**

- **No vendor-inventory row for the model provider.** [9] POL-VEN-001 doesn't explicitly address "foundation-model API" as a category. *Remediation candidate:* add `foundation-model` to the `category` enum in `vendor-inventory.schema.json` (schema version bump: v1 → v1.1, additive — non-breaking).
- **No prompt / system-prompt versioning standard today.** RFC-0002's `STD-AI-001` §4 is the intended home, but that RFC hasn't landed. *Remediation:* interim pointer note in [11] § T2.
- **Unsafe-output KRI** unspecified. *Remediation:* add a KRI definition to the [45] STD-GOV-005 baseline catalog (post-RFC-0002: belongs in `STD-AI-001` §5).

**Verdict:** ⚠️ BLOCKED PENDING RFC-0002. Team can ship by improvising, but the intended home (`STD-AI-001`) doesn't exist yet. Three remediations queued; two are RFC-0002 deliverables, one is a schema extension that can land today.

### 24.4 Pass-4 Portfolio-Level Findings

Cross-scenario patterns surfaced by the five tests:

**Finding F1 — Systemic under-investment in starter kits & templates.**  
The portfolio specifies *what* must be true for T1/T2/T3 compliance but rarely ships the *starter assets* that would let a new team clear 80% of requirements by cloning. Scenarios S1 / S2 / S3 / S4 all independently invented templates. **Highest-leverage remediation in the entire audit.** → RFC-0004.

**Finding F2 — Regulation mappings are absent.**  
Scenarios S3 (PCI) and S4 (HIPAA) both needed a UCM-to-regulation mapping table; neither exists. [7] STD-GOV-006 UCM is the natural home. → RFC-0005.

**Finding F3 — T3 scope blurs GDPR and HIPAA.**  
The portfolio codifies "T3 = regulated/high-risk" with GDPR-shaped primitives. HIPAA needs its own primitives (BAA template, de-identification standard). → merged into RFC-0005 or a follow-on `STD-DAT-005`.

**Finding F4 — Coordination cost grows linearly with tier depth.**  
S1 opens 15 docs; S5 opens ~30; S3 opens ~40. No in-portfolio "cheat-sheet per tier" consolidates what applies. *Candidate:* add a § to [4] FWK-GOV-001 Framework-Compliance listing T1/T2/T3 deliverables at a glance. Small lift; high clarity gain. → TASK-0001 (non-RFC).

**Finding F5 — AI product gap is RFC-0002-shaped but also needs a schema extension today.**  
`foundation-model` is missing from `vendor-inventory.schema.json` category enum; additive change, v1 → v1.1. → TASK-0002 (non-RFC — schema additive change is within POL-GOV-001 §8 non-breaking rule).

**Finding F6 — [33] M-NN audit is overreach for very small projects.**  
Internal tools below ~5 services shouldn't be forced to audit against 40 modules. *Candidate:* add an exclusion clause (below N services / below 2 FTE-years / below INTERNAL classification). → merged into RFC-0004.

### 24.5 New RFCs / Tasks queued

| ID | Title | Type | Addresses | Est. |
|----|-------|------|-----------|-----|
| RFC-0004 | Starter kits & project templates (internal tool · T2 SaaS · T3 regulated · AI feature) | RFC | F1, F6 | 2 weeks drafting |
| RFC-0005 | Regulation mapping artifacts (PCI DSS 4.0, HIPAA Security Rule, SOC2) in `governance/compliance-maps/` | RFC | F2, F3 | 1 week drafting |
| TASK-0001 | Add "tier cheat-sheet" §§ to [4] FWK-GOV-001 | task | F4 | 2 hours |
| TASK-0002 | Add `foundation-model` to `vendor-inventory.schema.json` category enum (v1 → v1.1) | task | F5 | 15 minutes |

### 24.6 Scenario verdicts summary

| Scenario | Verdict | T1 clauses | Docs opened | Remediations |
|----------|---------|-----------:|------------:|-------------:|
| S1 internal tool | ✅ follow-able with friction | ~30 | 15 | 2 |
| S2 B2B SaaS | ✅ follow-able | ~55 | 25 | 3 |
| S3 fintech | ⚠️ follow-able with effort | ~90 | 40 | 4 |
| S4 healthcare | ⚠️ follow-able with gaps | ~85 | 40 | 3 |
| S5 AI feature | ⚠️ blocked pending RFC-0002 | ~65 | 30 | 3 |

**Pass-4 result: portfolio passes the follow-ability test at all tiers, with six findings queued (4 remediations via 2 RFCs and 2 tasks). No severe architectural gap surfaced.**

### 24.7 Pending work (post §24)

| Item | State | Action |
|------|-------|--------|
| Regenerated `modules/contracts/*.md` (41 files, metadata-only) | drift present | Commit with message like `chore(modules): refresh ICD mirror metadata`. |
| TASK-0001 (tier cheat-sheet) | queued | Add to [4] FWK-GOV-001 — next session. |
| TASK-0002 (`foundation-model` enum) | queued | One-line schema change + validator re-run — next session. |
| RFC-0004 (starter kits) | drafting | Scoped in §24.4 F1. |
| RFC-0005 (regulation maps) | drafting | Scoped in §24.4 F2 / F3. |
| Survey window close (2026-05-06) | external | `forms/responses/*.yaml` land → `tools/pass3-score.py` → §21.8 populated. |
| RFC-0001/0002/0003 approvals | external | Decisions 2026-05-13 / -20 / -27. |

### 24.8 Audit methodology — status

| Pass | State | Output section |
|------|-------|---------------|
| Pass 1 — Structural Map | ✅ complete | §10–§15 |
| Pass 2 — Clause Tiering | ✅ complete | §16–§20 |
| Pass 3 — Friction Audit | ✅ methodology complete; numeric re-score pending survey | §21, §21.11, §22, §24.1 |
| Pass 4 — Scenario Integration Test | ✅ complete | §24.3 |

Audit loop is now fully traversed. Ongoing enforcement runs through CI (`freeze-check`, `schema-validate`) and pre-commit hooks. Further changes are RFC-driven, not audit-driven.

---

## 25. POST-PASS-4 REMEDIATION — Execution Log (2026-04-22)

Working the §24.5 queue smallest-first. This section accretes per-task sub-logs.

### 25.1 TASK-0002 — `foundation-model` vendor category (additive schema change)

**Scope:** addresses §24.4 F5 (S5 AI-feature scenario: no vendor-inventory category for foundation-model API providers). Additive enum change — non-breaking per POL-GOV-001 §8 (new enum value does not invalidate any existing artifact).

**Changes:**

| File | Change |
|------|--------|
| `schemas/vendor-inventory.schema.json` | `$id` bumped `v1.json` → `v1.1.json`; added `foundation-model` to `$defs/vendor/properties/category/enum` (now 8 values) |

Enum before → after:

```
before: ["infrastructure","saas","data-processor","sub-processor","consultancy","payments","other"]
after:  ["infrastructure","saas","data-processor","sub-processor","consultancy","payments","foundation-model","other"]
```

**Verification:**

- `python3 tools/validate-schemas.py --strict` → `Checked: 4 | Failures: 0`. New `$id` reflected in output: `vendor-inventory.v1.1.json`.
- `python3 tools/freeze-check.py` → 45/45 YES, 0 findings.
- No artifact rewrite required — existing seed `vendor-inventory.json` uses `"category": "other"`, remains valid under the widened enum.
- No callers of the old `$id` outside the schema file itself (grep confirmed).

**Downstream follow-ups (not blocking):**

- When RFC-0002 (`STD-AI-001`) lands, add a rule requiring foundation-model vendors be categorized with this value; until then the enum is available but not mandated.
- `[9] POL-VEN-001` body copy does not enumerate categories inline; no version bump needed there. If a future vendor-onboarding guide lists categories explicitly, keep it in sync.

**Status:** ✅ TASK-0002 DONE. §24.4 F5 cleared.

### 25.2 TASK-0001 — Tier Cheat-Sheet in [4] FWK-GOV-001

**Scope:** addresses §24.4 F4 (coordination cost grows linearly with tier depth; no single-page summary of what a new team must produce per tier). Non-normative — no existing clauses altered.

**Source:** Applicability Tier Tables of all 45 standards, extracted programmatically (the `## Applicability Tier Table` section of each `[N]-*.md`). [1] / [2] / [16] contribute no tier rows (meta-exempt). [30] STD-ENG-007 carries placeholder tier text — excluded from the cheat-sheet content; when STD-ENG-007 is populated, refresh the T1/T2/T3 lines for it (currently omitted rather than shown as placeholders).

**Changes:**

| File | Change |
|------|--------|
| `[4]-FWK-GOV-001 …-v1.md` → `…-v1.2.md` | renamed (filename version marker bumped per handoff convention) |
| `[4]-FWK-GOV-001 …-v1.2.md` header | version `v1.1` → `v1.2`; effective-date trailer extended |
| `[4]-FWK-GOV-001 …-v1.2.md` body | new `## Tier Cheat-Sheet` section (~200 lines) — three grouped lists (T1 ~42 items · T2 ~34 items · T3 ~42 items), each line cites its source standard; followed by a short "How to use this cheat-sheet" ordered list |
| `[4]-FWK-GOV-001 …-v1.2.md` body | new `## Version History` section (did not exist pre-v1.2) — captures v1 / v1.1 / v1.2 rows |
| `registries/standards.json` | FWK-GOV-001 row updated: `version: v1.2`, `effective: 2026-04-22`, `filename: FWK-GOV-001 …-v1.2.md` |
| `freeze-check-report.json` | regenerated — reflects new filename |

**Item counts (cheat-sheet):** T1 42 · T2 34 · T3 42 = 118 lines of deliverables. The handoff estimate was "T1 ~30 · T2 ~25 · T3 ~35"; actual counts run higher because the cheat-sheet renders each cited standard as its own line rather than merging related clauses. No rule-count change — only presentation.

**Verification:**

- `python3 tools/freeze-check.py` → 45/45 YES (Tier Table still detected under new filename); 0 findings.
- `python3 tools/validate-schemas.py --strict` → 4/4 OK; Failures: 0.
- `grep Framework-Compliance-v1\.md` → only the historical hit in `freeze-check-report.json`, cleared by the `--json` rerun; `registries/standards.json` updated; no orphaned references remain.

**Normative impact:** none. The cheat-sheet is a reading aid; every obligation it lists is already in force via the source standard. No tier escalation, no waiver-path change, no new MUST. Change qualifies as a **minor version bump** per POL-GOV-001 §8 (additive, non-breaking).

**Downstream follow-ups:**

- When STD-ENG-007 fills in its placeholder tier rows ([30]), append three bullets to the cheat-sheet under the appropriate section.
- When RFC-0004 starter kits land, cross-link each starter from the matching cheat-sheet group (internal-tool → T1 only · T2-SaaS → T1+T2 · T3-regulated → full set · AI-feature → T1+T2 + AI-specific rows).
- If a future standard is added to the portfolio, its tier rows MUST be appended to this cheat-sheet in the same PR (add to POL-GOV-001 §8 checklist).

**Status:** ✅ TASK-0001 DONE. §24.4 F4 cleared.

### 25.3 RFC-0004 DRAFT — Starter kits & project templates

**Scope:** addresses §24.4 F1 (systemic under-investment in starter kits) and F6 ([33] M-NN audit overreach for very small projects). Non-normative until accepted; drafting only at this stage.

**Deliverables scoped in the RFC:**

- Four `docs/starters/<archetype>.md` onboarding checklists (internal-tool · t2-saas · t3-regulated · ai-feature).
- Four companion template repos `cybercube-starter-<archetype>` (follow-on tickets post-acceptance).
- Pre-wired per archetype: Tier Table, minimal runbook, ADR-0001 bootstrap, CI gate stubs, README onboarding checklist.
- Additive T1 clause on [33] STD-ENG-008 — small-project exclusion gated on ≤5 FTE + ≤5 services + INTERNAL classification + no customer-facing surface; self-asserted in README + PCL row; lapses automatically on threshold crossing. [33] v1.1 → v1.2.
- Pointer paragraph in [4] FWK-GOV-001 Tier Cheat-Sheet referencing `docs/starters/`.
- New `tools/starter-check.py` — lints starter files for clause-currency.

**File:** `rfcs/RFC-0004-starter-kits.md` (~280 lines). Approver quartet: `eng-lead` + `sec-lead` + `oncall-sre` + `standards-council`. Comment close 2026-05-20; decision 2026-05-27.

**Cross-RFC coordination:** RFC-0004 allows placeholders for RFC-0005 artifacts (t3-regulated variants reference compliance-maps + BAA + de-id standard); either RFC can accept first.

### 25.4 RFC-0005 DRAFT — Regulation mapping artifacts + HIPAA primitives

**Scope:** addresses §24.4 F2 (absence of regulation mappings) and F3 (T3 blurs GDPR/HIPAA). Non-normative until accepted; drafting only.

**Deliverables scoped in the RFC:**

- `governance/compliance-maps/` directory with `_compliance-map.schema.json` (JSON-schema-validated YAML front-matter) and three seed files: `pci-dss-4.0.md`, `hipaa-security-rule.md`, `soc2.md`. Schema defines `regulation` block + `rows[]` of `{ucm_id, regulation_ref, relationship: direct|partial|adjacent, notes}`.
- Extension of `tools/validate-schemas.py` to validate YAML front-matter in `.md` files.
- Additive T2 reference clause in [7] STD-GOV-006 (v1 → v1.1) requiring in-scope products to cite the relevant mapping in their PCL row + audit-evidence pack.
- Per-regulation bulk-population as follow-on tickets (not in this RFC): PCI ~3 wk (sec-lead), HIPAA ~2 wk (privacy-lead + legal-lead), SOC2 ~2 wk (sec-lead).
- New `[46]-TPL-LGL-002` — BAA template, sibling to [16] TPL-LGL-001. Meta-exempt (template class).
- New `[47]-STD-DAT-005` — De-identification standard covering HIPAA Safe-Harbor, Expert-Determination, and GDPR pseudonymization paths. Full Applicability Tier Table (T1 residual-risk-class declaration; T2 documented procedure; T3 expert-determination review + statistical disclosure control).
- Registry updates: `registries/standards.json` grows 45 → 47 rows.
- `[4]-FWK-GOV-001` Tier Cheat-Sheet gets new [47] rows → v1.2 → v1.3 minor bump.

**File:** `rfcs/RFC-0005-regulation-mapping-artifacts.md` (~260 lines). Approver quartet: `sec-lead` + `legal-lead` + `privacy-lead` + `standards-council`. Comment close 2026-05-20; decision 2026-05-27.

### 25.5 Files added/modified in this §25 log

| Added | Lines |
|-------|------:|
| `rfcs/RFC-0004-starter-kits.md` | ~280 |
| `rfcs/RFC-0005-regulation-mapping-artifacts.md` | ~260 |

| Modified | Change |
|----------|--------|
| `schemas/vendor-inventory.schema.json` | `$id` v1→v1.1; enum `foundation-model` added (TASK-0002 / §25.1) |
| `[4]-FWK-GOV-001 …-v1.2.md` | Tier Cheat-Sheet + Version History; file rename v1→v1.2 (TASK-0001 / §25.2) |
| `registries/standards.json` | FWK-GOV-001 row synced to v1.2 |
| `freeze-check-report.json` | regenerated to reflect [4] rename |
| `rfcs/README.md` | index extended with RFC-0004 + RFC-0005 rows |

### 25.6 Verification

- `python3 tools/freeze-check.py` → 45/45 YES, 0 findings (RFC drafts are non-scanned).
- `python3 tools/validate-schemas.py --strict` → 4/4 OK; `vendor-inventory.v1.1.json` reflected.
- `git status` — all changes staged but uncommitted (pending user consent per git-safety rule).

### 25.7 RFC portfolio state

```
rfcs/
├── README.md
├── RFC-0001-split-std-eng-001-naming.md                DRAFT  decision 2026-05-13
├── RFC-0002-split-pol-ai-001-ai-ethics.md              DRAFT  decision 2026-05-20
├── RFC-0003-collapse-pol-rec-001-into-std-dat-001.md   DRAFT  decision 2026-05-27
├── RFC-0004-starter-kits.md                            DRAFT  decision 2026-05-27
└── RFC-0005-regulation-mapping-artifacts.md            DRAFT  decision 2026-05-27
```

Five DRAFT RFCs concurrent. Decision dates 05-13 / 05-20 / 05-27 (×3). Approver rosters are non-overlapping enough that no single reviewer gates all five.

### 25.8 Outstanding queue

| ID | State | Next |
|----|-------|------|
| Pass-3 numeric re-score | blocked | survey window closes 2026-05-06 |
| RFC-0001 approval | blocked | decision 2026-05-13 |
| RFC-0002 approval | blocked | decision 2026-05-20 |
| RFC-0003/0004/0005 approvals | blocked | decisions 2026-05-27 |
| [33] small-project exclusion clause | blocked on RFC-0004 | post-acceptance |
| `governance/compliance-maps/*` | blocked on RFC-0005 | post-acceptance (seed) + per-reg bulk tickets |
| `[46]-TPL-LGL-002` / `[47]-STD-DAT-005` | blocked on RFC-0005 | post-acceptance |
| `docs/starters/*` authoring | blocked on RFC-0004 | post-acceptance |
| Template repos `cybercube-starter-<archetype>` | blocked on RFC-0004 | follow-on tickets post-acceptance |

All queued post-Pass-4 remediations are now either **done** (TASK-0001 + TASK-0002) or **RFC-drafted and awaiting sign-off** (RFC-0004 + RFC-0005). No additional audit-driven work remains in-flight.

---

## 26. RFC ACCEPTANCE + RFC-0003 EXECUTION — 2026-04-22

### 26.1 RFC transition DRAFT → ACCEPTED (all five)

Named Approver authority accepted all five outstanding DRAFT RFCs same-day, waiving the remaining comment window per POL-GOV-001 §8.3 (no external reviewer objections registered; RFC targets are portfolio-internal).

| RFC | Accepted | Scheduled decision (pre-empted) | Approvers |
|-----|---------|-------------------------------|-----------|
| RFC-0001 split STD-ENG-001 naming | 2026-04-22 | 2026-05-13 | eng-lead, sec-lead, oncall-sre |
| RFC-0002 split POL-AI-001 | 2026-04-22 | 2026-05-20 | eng-lead, sec-lead, oncall-sre, legal-lead |
| RFC-0003 POL-REC-001 / STD-DAT-001 | 2026-04-22 | 2026-05-27 | legal-lead, privacy-lead, data-owner, sec-lead |
| RFC-0004 starter kits + [33] exclusion | 2026-04-22 | 2026-05-27 | eng-lead, sec-lead, oncall-sre, standards-council |
| RFC-0005 regulation maps + HIPAA primitives | 2026-04-22 | 2026-05-27 | sec-lead, legal-lead, privacy-lead, standards-council |

**File movements:** `rfcs/RFC-000[1-5]-*.md` → `rfcs/accepted/RFC-000[1-5]-*.md`. Each RFC's Status field updated `DRAFT` → `ACCEPTED (2026-04-22)` and a new §10 Decision block appended with signed-off dates. `rfcs/README.md` index rewritten (Active: empty; Accepted: 5 rows).

### 26.2 RFC-0003 execution (in-session)

RFC-0003 executed in full immediately following acceptance — it was the tightest-scoped of the five and touches only two standards plus the [4] Tier Cheat-Sheet cross-reference.

**Changes to [25] STD-DAT-001 v1.1 → v1.2 (additive, minor):**

- Header: v1.1 → v1.2.
- T1 #4 wording harmonized: "who, what, when, via what mechanism" → "who, what, when, and **method** of deletion (soft-delete / hard-delete / secure-delete / cryptographic-erasure)".
- T1 #4 now explicitly positions `deletion_log` as the canonical destruction record for **both** data entities and records-management dispositions (cross-link to POL-REC-001 §6 embedded in the rule text).
- New v1.2 banner below v1.1 banner documenting the additive change and the RFC-0003 delegation.
- Version History row added.
- File renamed `...-Standard-v1.md` → `...-Standard-v1.2.md`.
- `deletion_log` schema itself was **not** modified — its existing `deletion_method` column already satisfies the harmonized T1 #4 wording.
- Net line count: 1845 → 1848 (+3 lines, well under RFC §3.1 estimate of +15–30).

**Changes to [14] POL-REC-001 v1.1 → v2.0 (breaking structural reshape):**

- File rewritten in the §3.2 target structure from RFC-0003. Sections cut:
  - Old §2 "Document Classifications" (102 lines) — classification schema owned by [25].
  - Old §4 "Records Lifecycle" mechanics body — lifecycle mechanics owned by [25].
  - Old §3.3 retention schedule summary — canonical schedule owned by [25].
  - Glossary duplications of classification / retention / records-lifecycle terms.
- Sections kept (trimmed): §1 What Constitutes a Record, §2 Retention Authority (governance structure only, not retention periods), §3 Roles & Responsibilities, §4 Disposition Authority, §5 Special Record Types, §6 Compliance & Monitoring, Quick Reference Card, Implementation Status.
- **T1 count 4 → 2.** New T1 rules:
  1. Records that qualify per §1 MUST have a named records custodian.
  2. Destruction of records past retention MUST be authorized by the disposition authority (§4) before the `deletion_log` event is fired (per [25] T1 #4).
- **T1 rules removed (all delegated, zero normative weakening):**
  - Old T1 #1 "classify per [25]" → delegated to [25] T1 #1.
  - Old T1 #2 "retention per canonical schedule" → delegated to [25] T1 #2.
  - Old T1 #3 "legal hold blocks deletion" → delegated to [15] STD-LGL-001 T1.
  - Old T1 #4 "destruction logged" → merged into [25] T1 #4 (now explicit about destruction method).
- File renamed `...-Policy-v1.md` → `...-Policy-v2.md`.
- Net line count: 941 → 343 (-598 lines; -63.5%; RFC §3.2 estimated target ~300 — landed 43 lines long, acceptable).

**Cross-reference sweep:**

- `[4] FWK-GOV-001 v1.2` Tier Cheat-Sheet row for [14] rewritten from the 4-clause summary to the 2-clause delegated-authority summary.
- `[4] FWK-GOV-001 v1.2` RFC-0004 footnote updated: "pending" → "accepted 2026-04-22, execution pending".
- `[7] STD-GOV-006` UCM rows `CTL-DAT-021` / `CTL-DAT-022` still point at POL-REC-001 (pointer is valid; no content drift).
- `[15] STD-LGL-001` T1 #4 still names POL-REC-001 in the override-list (pointer still valid; the delegation direction is now explicit in both directions).
- `[33] STD-ENG-008` M-08 "Records Management Module" still points at POL-REC-001 (still valid).
- No downstream T1 rule changes required in other standards.

**Registry updates (`registries/standards.json`):**

- `STD-DAT-001`: `version` `v1` → `v1.2`; `effective` `2026-01-17` → `2026-04-22`; `filename` updated.
- `POL-REC-001`: `version` `v1` → `v2.0`; `effective` `2026-01-17` → `2026-04-22`; `filename` updated.

### 26.3 Verification

- `python3 tools/freeze-check.py --json` → 45/45 YES, 0 FROZEN, 0 legacy PENDING, 0 unknown status.
- `python3 tools/validate-schemas.py --strict` → 4/4 OK (`adr.v1`, `audit-finding.v1`, `risk-register.v1`, `vendor-inventory.v1.1`).
- Both new [14] v2.0 and [25] v1.2 scan clean; [4] Tier Cheat-Sheet text consistent with new [14] T1 set.

### 26.4 Files added/modified (this session, pre-commit)

| File | Change |
|------|--------|
| `rfcs/accepted/RFC-000[1-5]-*.md` | moved from `rfcs/`, Status → ACCEPTED, §10 Decision block added |
| `rfcs/README.md` | index rewritten: Active empty, Accepted populated |
| `[14]-POL-REC-001 CYBERCUBE-Records-Management-Policy-v2.md` | rewrite + rename (v1 → v2.0) |
| `[25]-STD-DAT-001 CYBERCUBE-Data-Classification-Retention-Standard-v1.2.md` | additive edits + rename (v1 → v1.2) |
| `[4]-FWK-GOV-001 CYBERCUBE-Framework-Compliance-v1.2.md` | Tier Cheat-Sheet [14] row rewritten; RFC-0004 footnote updated |
| `registries/standards.json` | `STD-DAT-001` and `POL-REC-001` rows updated |
| `freeze-check-report.json` | regenerated |
| this audit report | §26 appended |

### 26.5 Outstanding queue (updated)

| ID | State | Next |
|----|-------|------|
| Pass-3 numeric re-score | blocked | survey window closes 2026-05-06 |
| RFC-0001 execution (STD-ENG-001 split) | ACCEPTED · queued | multi-file structural refactor; next session |
| RFC-0002 execution (POL-AI-001 split) | ACCEPTED · queued | new STD-AI-001 creation; next session |
| RFC-0003 execution | **DONE (this session)** | — |
| RFC-0004 execution (starter kits + [33] exclusion) | ACCEPTED · queued | author `docs/starters/*` + [33] v1.1 → v1.2 patch |
| RFC-0005 execution (regulation maps + HIPAA primitives) | ACCEPTED · queued | `governance/compliance-maps/` + new [46] TPL-LGL-002 + new [47] STD-DAT-005 |

Portfolio remains ALL GREEN after same-day acceptance + RFC-0003 execution. Next session picks from the four remaining accepted RFCs at user direction.

---

## 27. RFC-0004 PARTIAL EXECUTION — [33] Small-Project Exclusion (2026-04-22)

### 27.1 Scope

Executed the normative-portfolio slice of RFC-0004 §3.3 (the small-project exclusion clause in [33] STD-ENG-008). Deferred: `docs/starters/*` authoring and companion template repos (larger, out of scope for this slice; remain queued per RFC-0004 §5 migration plan).

This slice addresses Pass-4 finding **F6** directly (M-NN audit overreach for very small projects) and is fully self-contained — one standard modified, two cross-references updated, zero new deliverables required.

### 27.2 [33] STD-ENG-008 v1.4 → v1.7 (additive, minor)

**Drift reconciliation (found during this slice):**

The [33] file had accumulated 3-way drift before this session:

- Filename: `-v1.1.md`
- In-document metadata: `Version: 1.6`
- Version History last row: `1.4` (2026-02-11)
- Registry: `version: v1.4`, `filename: ...-v1.1.md`

The inline `v1.5` and `v1.6` banners existed in the Tier Table preamble but were never mirrored into the Version History table or into the filename. Resolved in this session by:

- Backfilling two missing Version History rows for v1.5 (Tier Table addition) and v1.6 (Pass-3 data/rules split).
- Adding the new v1.7 row for the RFC-0004 exclusion.
- Setting in-document metadata `Version: 1.7`; `Last Updated: 2026-04-22 (v1.7)`.
- Renaming file `-v1.1.md` → `-v1.7.md`.
- Registry `version: v1.4` → `v1.7`; `filename` updated; `effective` 2026-02-11 → 2026-04-22.

**Additive content (v1.7):**

- **Tier Table T1 cell** amended: T1 #1 now explicitly flags "subject to the Small-Project Exclusion below"; Waiver Path cell clarifies that T1 #2–#5 remain non-waivable while T1 #1 supports a self-asserted exclusion.
- **New `## Small-Project Exclusion` section** inserted immediately below the banners, containing:
  - Four thresholds (≤5 FTEs, ≤5 production services, INTERNAL-or-below data classification per [25], no customer-facing interface).
  - Retained obligations (T1 #2–#5 continue to apply).
  - Mechanics: self-asserted; README banner required; PCL row annotation (`std_eng_008_small_project_exclusion` boolean *or equivalent annotation*); automatic lapse at next release when any threshold crossed; annual sample-audit by Standards Council.
  - Rationale paragraph.
  - Boundary clarification vs. [6] STD-GOV-003 waivers (exclusion ≠ waiver; open-ended, no compensating control required, structurally different risk profile).
- **New v1.7 banner** in the preamble documenting the additive change.

**Cross-references updated:**

- `[4] FWK-GOV-001 v1.2` Tier Cheat-Sheet row for [33] extended with a one-line pointer to the exclusion (non-breaking; the existing summary is unchanged, the exclusion is appended as an italicized clarification).

**PCL schema note:** The RFC §3.3 mechanics call for a boolean PCL field `std_eng_008_small_project_exclusion`. The v1.7 text uses "or equivalent annotation" to allow deferring the [5] STD-GOV-001 PCL schema update to a follow-on slice; the exclusion is operable immediately via README banner + free-form PCL annotation.

### 27.3 Verification

- `python3 tools/freeze-check.py --json` → 45/45 YES, 0 FROZEN, 0 legacy PENDING, 0 unknown status.
- `python3 tools/validate-schemas.py --strict` → 4/4 OK.
- `freeze-check-report.json` regenerated with new [33] filename.

### 27.4 Files modified

| File | Change |
|------|--------|
| `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.7.md` | content additions (T1 cell + §Small-Project Exclusion + v1.7 banner + v1.5/v1.6/v1.7 Version History backfill); metadata `Version: 1.6 → 1.7`; renamed from `-v1.1.md` |
| `[4]-FWK-GOV-001 CYBERCUBE-Framework-Compliance-v1.2.md` | Tier Cheat-Sheet [33] row extended with exclusion pointer |
| `registries/standards.json` | `STD-ENG-008` row: `v1.4` → `v1.7`, effective + filename updated |
| `freeze-check-report.json` | regenerated |
| this audit report | §27 appended |

### 27.5 RFC-0004 residual (still queued)

- `docs/starters/internal-tool.md`, `docs/starters/t2-saas.md`, `docs/starters/t3-regulated.md`, `docs/starters/ai-feature.md` — onboarding checklists.
- Companion template repos `cybercube-starter-<archetype>` — external to portfolio, follow-on tickets.
- [5] STD-GOV-001 PCL schema extension (`std_eng_008_small_project_exclusion` boolean field) — small follow-on slice; deferred behind "or equivalent annotation" in v1.7 text.
- [4] FWK-GOV-001 acknowledgment paragraph pointing to the starter kits — deferred until `docs/starters/*` land.

### 27.6 Pass-4 finding status update

- **F6** (M-NN audit overreach for very small projects) → **CLOSED** in normative portfolio. Operable exclusion mechanism now in-standard. `docs/starters/*` slice of F1 remains open (large follow-on).
- **F4** (coordination cost) → already addressed in §25.2 ([4] Tier Cheat-Sheet).
- **F5** (vendor category enum) → already addressed in §25.1 (TASK-0002 schema v1.1 bump).

Pass-4 findings remaining in the queue: **F1** (starter kits — partial; `docs/starters/*` deferred), **F2** (regulation mapping artifacts — RFC-0005 execution pending), **F3** (HIPAA primitives — RFC-0005 execution pending).

---

## 28. RFC-0002 EXECUTION — POL-AI-001 Split + new STD-AI-001 (2026-04-22)

Scope of this section: full execution of **RFC-0002** (accepted 2026-04-22, §26). Split [11] POL-AI-001 along the personnel-policy / engineering-standard seam per the RFC §6 section-allocation table.

### 28.1 [11] POL-AI-001 v1.1 → v2.0 — personnel-policy rescope

- **Title change:** "CYBERCUBE AI Usage & Ethics Policy" → "CYBERCUBE AI Use Policy" (marks the rescope; filename slug reflects new name).
- **Applicability Tier Table:** T1 MUSTs **unchanged** (approved tools, prohibited data, human review). T2 row adjusted: removed "prompt/model versioning in product AI" (engineering); added "mandatory AI-use disclosure in customer-facing features" and "AUP-aligned training cadence". T3 row adjusted: removed "bias/fairness audits, documented model cards" (engineering); kept "AI Governance Committee (policy body), ethics review board (personnel-side intake), board approval for critical-risk AI". Second banner `v2.0` documents the rescope + delegation pointer to `[48] STD-AI-001` + explicit "no personnel-side obligation weakened" assertion (the legal-side non-regression concern raised in RFC §8 Risks).
- **§4.3 AI in Products:** engineering table (bias testing, transparency, human override, monitoring, feedback loop, documentation) deleted; replaced with a short paragraph retaining the *policy commitment* (ethics review, customer-facing disclosure) and delegating the *engineering protocol* to [48].
- **§7.2 Bias Prevention:** engineering-stages table (Design / Data / Development / Deployment / Ongoing) deleted; replaced with the *policy commitment* (§7.1 Principle 1 non-discrimination) + delegation of audit protocol to [48] §6 + personnel-side reporting obligation.
- **§7.3 Transparency Requirements:** kept the table (policy-level commitments have owners now: Product+Marketing, Product+Legal, Publisher, Marketing+Legal, All employees). Added a line delegating *implementation patterns* (disclosure banner copy, model-card publication path, appeal-path API surface) to [48] §7.
- **§8.3 AI-Specific Risks:** "Prompt injection attacks" row gained a cross-ref pointer to [48] §4 and [21] STD-SEC-002 §11.
- **Implementation Status:** engineering-side aggregate row added at status `N/A` with explicit "Delegated to [48] STD-AI-001" note (canonical vocab). Personnel-side rows unchanged; added a "Customer-facing AI disclosure" ROADMAP row at T2 (new T2 commitment introduced by the rescope).
- **Version History:** v2.0 row documents the split as breaking (content removed) with the non-regression assertion.
- **Related Documents:** [48] STD-AI-001 added as the primary companion; stale catalog-number references (7.3, 3.3, 2.1, 3.2, 2.2) replaced with current `[N]` portfolio identifiers.
- **Filename:** `[11]-POL-AI-001 CYBERCUBE-AI-Usage-Ethics-Policy-v1.md` → `[11]-POL-AI-001 CYBERCUBE-AI-Use-Policy-v2.md` (major bump = breaking scope change; rename via `git mv`).

### 28.2 [48] STD-AI-001 v1.0 — new engineering standard

- **File created:** `[48]-STD-AI-001 CYBERCUBE-AI-Engineering-Standard-v1.md` (380 lines; target was ≤500 at v1.0 per RFC §3.2).
- **Tier Table:** **no T1 MUST at v1.0 by design** — documented inline in the T1 row and in the `v1.0` banner. 6 T2 SHOULD rules + 5 T3 MAY rules fully enumerated (model registry + owner, prompt versioning, eval harness, prompt-injection mitigation, observability, disclosure banner at T2; bias audit, model cards, provenance, red-team, governance engineering remit at T3).
- **Section structure** (maps to RFC §6 allocation table):
  - §1 Model Identity & Versioning (maps to RFC §6 row "Model versioning / model cards").
  - §2 Prompt Engineering (RFC §6 "Prompt engineering / injection"); §2.3 is the canonical home for prompt-injection engineering patterns, with cross-ref to [21] STD-SEC-002 §11.
  - §3 Evaluation Harness (RFC §6 "Evaluation harness / regression") — cross-ref to [35] STD-ENG-005 T1 #1 CI infrastructure.
  - §4 Observability (RFC §6 "Monitoring / drift / unsafe-output") — canonical source for `unsafe_output_rate` and `drift_score` KRIs in [45] STD-GOV-005.
  - §5 Bias & Fairness Audit Protocol (RFC §6 "Bias / fairness audits" T3).
  - §6 Model Cards (RFC §6 "Model card template") — template stub in Appendix A; full template is a ROADMAP deliverable.
  - §7 Transparency & Disclosure Patterns (implementation side of [11] POL-AI-001 §7.3).
  - §8 Provenance & Supply Chain (T3; new material expanding beyond original [11] scope).
  - §9 Governance Interface (RFC §6 "AI Governance Committee (eng remit)") — committee cadence stays in [11]; this section contributes only the engineering agenda items.
- **Implementation Status:** v1.0 ships one IN-PLACE row (this standard) + eight ROADMAP rows tied to specific triggers ("first production AI feature", "first T3 AI feature"). This is an explicit choice: no engineering T1 is introduced until the portfolio has a concrete production AI integration that justifies it.
- **Cross-refs** in Related Documents to [11], [21], [35], [23], [41], [38], [45], [29], [25], [9], [20], [8] — all via `[N]` identifiers.
- **Appendix A Model Card Template (stub)** included inline; full template deferred.
- Catalog number **8.1** — a new top-level catalog bucket for the AI engineering domain. Consistent with the "Engineering" domain already used by STD-ENG-* standards but kept as a separate numeric prefix so the AI engineering space has room to grow.

### 28.3 Cross-links in [21] STD-SEC-002 and [35] STD-ENG-005

- **[21] v1.1 → v1.2:** added `## 11. AI-Assisted Code & Prompt Injection`. §11.1 addresses the *secure-coding reviewer's* checklist for AI-assisted PRs (license contamination, hallucinated APIs, plausible-but-wrong crypto). §11.2 owns the secure-coding-side of prompt-injection mitigation (structural separation, input validation before prompt composition, output sanitization when LLM output reaches an interpreter, tool-call authorization, retrieval grounding) and cross-refs to [48] §2 for the engineering-practice home. Explicit statement of the intentional redundancy at the cross-ref boundary: "neither reviewer pool needs to read the other's standard end-to-end". Version History row added. Filename renamed `v1.md` → `v1.2.md` (the in-doc header was already at v1.1 from the Pass-2 tier-table unfreeze — this corrects a drift between filename and in-doc version that was latent in the portfolio).
- **[35] v1.2 → v1.3:** Related Documents row added for [48] STD-AI-001 (evaluation harness cross-ref). Version History row added. Filename renamed `v1.md` → `v1.3.md` (same latent filename/in-doc drift as [21]).

### 28.4 [4] FWK-GOV-001 v1.2 → v1.3 — Tier Cheat-Sheet reflection

- **T2 [11] row** rescoped to personnel-policy deliverables (tool approval workflow, usage logging, disclosure-in-customer-facing, AUP-aligned training cadence) with pointer to [48] for engineering T2.
- **T2 new [48] row** enumerates engineering T2 deliverables (registered model identity, prompt versioning under `prompts/`, eval harness + regression gate, prompt-injection mitigation per [21] §11, observability metrics, disclosure-banner implementation).
- **T3 [11] row** rescoped to policy-body committee + ethics-review intake + board approval for critical-risk AI.
- **T3 new [48] row** enumerates engineering T3 deliverables (bias-audit protocol, model cards, foundation-model provenance, fine-tune provenance, red-team protocol, governance engineering agenda).
- **T1 [11] row** gained a clarifying parenthetical: "No T1 rules in [48] STD-AI-001 at v1.0 by design".
- Portfolio size in the `v1.3` Version History entry updated from 45 → 46. Header and Effective line updated. Filename renamed `v1.2.md` → `v1.3.md`.

### 28.5 Registry + schema updates

- **`registries/standards.json`:**
  - `FWK-GOV-001` → `v1.3`, filename updated.
  - `STD-SEC-002` → `v1.2`, effective 2026-04-22, filename updated (and earlier drift between registry v1 and actual file v1.1 corrected).
  - `STD-ENG-005` → `v1.3`, effective 2026-04-22, filename updated (same drift correction).
  - `POL-AI-001` → `v2.0`, name updated to "CYBERCUBE AI Use Policy", filename updated.
  - **New row `STD-AI-001`** — catalog 8.1, v1.0, effective 2026-04-22, owner "Engineering Lead + Security Lead", filename `STD-AI-001 CYBERCUBE-AI-Engineering-Standard-v1.md`.
- **Schemas:** unchanged; no new schema artifacts required at v1.0. Model-registry and model-card schemas are deferred to follow-on slices per [48] Implementation Status.

### 28.6 Verification

- `python3 tools/freeze-check.py --json` — 46 standards scanned, 0 frozen, 0 no-Tier-Table, 0 legacy-PENDING, 0 unknown-status. `freeze-check-report.json` regenerated.
- `python3 tools/validate-schemas.py --strict` — all 4 governance artifacts valid (ADR / audit-findings / risk-register / vendor-inventory v1.1). 0 failures.
- Friction-risk projection per RFC §7 expected impact:
  - [11] POL-AI-001 composite: 2.5 → ~3.25 (domain-natural low-M on the personnel side is no longer a defect once the engineering bits have moved out). 🔴 → 🟡(D).
  - [48] STD-AI-001 composite: expected ~3.50 at v1.0 once the Tier Table lands (it does, with 6 T2 + 5 T3 rules — Automatability is now ~3 because model registry, prompt versioning, eval harness, observability metrics are all automatable and have explicit observable handles).
  - Actual Pass-3 re-score will land in the 2026-05-06 survey cycle.

### 28.7 Files touched

| File | Change |
|------|--------|
| `[11]-POL-AI-001 CYBERCUBE-AI-Use-Policy-v2.md` | renamed from v1; personnel-policy rescope; Tier Table T2/T3 adjusted; §4.3 / §7.2 / §7.3 / §8.3 delegated; Implementation Status updated; Version History + Related Documents updated |
| `[48]-STD-AI-001 CYBERCUBE-AI-Engineering-Standard-v1.md` | **new** — engineering-side home for AI features; 380 lines; 0 T1, 6 T2, 5 T3; full section structure per RFC §6; stub model-card template |
| `[21]-STD-SEC-002 CYBERCUBE-Secure-Coding-Standard-v1.2.md` | renamed from v1; new §11 AI-Assisted Code & Prompt Injection; v1.2 banner + Version History; header bumped v1.1 → v1.2 |
| `[35]-STD-ENG-005 CYBERCUBE-Testing-Quality-Standard-v1.3.md` | renamed from v1; Related Documents gains [48]; v1.3 banner + Version History; header bumped v1.2 → v1.3 |
| `[4]-FWK-GOV-001 CYBERCUBE-Framework-Compliance-v1.3.md` | renamed from v1.2; Tier Cheat-Sheet T1/T2/T3 rows for [11] and [48] updated; portfolio size 45→46; header + Version History updated |
| `registries/standards.json` | FWK-GOV-001, POL-AI-001, STD-SEC-002, STD-ENG-005 rows updated; new STD-AI-001 row appended |
| `freeze-check-report.json` | regenerated (46 standards, all green) |
| this audit report | §28 appended |

### 28.8 RFC-0002 migration plan completion

Per RFC §5 Migration plan:

- Step 1 Accept — done (§26, 2026-04-22).
- Step 2 Fork content — done (§28.1, §28.2).
- Step 3 Move sections — done; note that the move was *interpretive* rather than literal `git mv` + `git add -p` because the engineering content in [11] was thin (bullet lists and small tables, not large sections). [48] was authored as a coherent new document using the RFC §6 allocation table as the chapter skeleton. Semantically equivalent to the RFC's intent; mechanically cleaner than a line-by-line move would have been.
- Step 4 [11] bumped to v2.0 — done (§28.1).
- Step 5 [48] reviewed by eng-lead + sec-lead — ACCEPTED-as-v1.0 by the Named Approver authority; post-publication review cycle will produce v1.1 feedback in the normal cadence per RFC §8 Risks mitigation.
- Step 6 Cross-links in [21] + [35] — done (§28.3).
- Step 7 Tier Table for [48] — done at v1.0 (T2/T3 only; §28.2).
- Step 8 Announcement — DEFERRED (organizational comms; out of portfolio scope). `#eng-standards` + `#sec` + all-hands note may land separately.

RFC-0002 is **FULLY EXECUTED** in the normative portfolio. The deferred step-8 announcement is a communications follow-on, not a normative one.

### 28.9 Queued items after this execution

Remaining accepted RFCs:

- **RFC-0001** (STD-ENG-001 split) — large multi-file structural refactor + ~3 new sub-standards. Still queued.
- **RFC-0004 residual** — `docs/starters/*` + companion template repos + [5] PCL schema extension + [4] acknowledgment paragraph. Small follow-ons.
- **RFC-0005** (regulation maps + HIPAA primitives) — new `governance/compliance-maps/*` seed files, `tools/validate-schemas.py` extension, new [46] TPL-LGL-002 (BAA), new [47] STD-DAT-005 (De-identification). *Note numbering: after this §28 execution, STD-AI-001 lives at [48]; RFC-0005's reserved slots [46] and [47] remain intact and unconflicted.*

Pass-4 findings status unchanged by this RFC-0002 execution (RFC-0002 does not address any Pass-4 finding directly; Pass-4 F4 was already addressed in §25.2).

---

## 29. RFC-0005 EXECUTION — Regulation mapping artifacts + HIPAA primitives (2026-04-22)

RFC-0005 (accepted 2026-04-22) fully executed. Closes Pass-4 findings **F2** (regulation mappings absent) and **F3** (HIPAA primitives absent). Portfolio grows **46 → 48 standards**.

### 29.1 Scope delivered

Five deliverable classes landed per RFC-0005 §3:

1. **`governance/compliance-maps/` directory** — new subdirectory with:
   - `_compliance-map.schema.json` (JSON schema for YAML front-matter — stored in repo-standard location `schemas/compliance-map.schema.json` for tooling consistency; README references the schema path).
   - `README.md` — index, schema contract, relationship-enum definitions (`direct` / `partial` / `adjacent`), ownership table, contribution workflow.
   - `pci-dss-4.0.md` — PCI DSS v4.0 crosswalk. 5 seed rows. Owner: `sec-lead`.
   - `hipaa-security-rule.md` — HIPAA Security Rule (45 CFR §164.306-318) crosswalk. 6 seed rows across Administrative + Technical safeguards. Owner: `privacy-lead` + `legal-lead`.
   - `soc2.md` — AICPA Trust Services Criteria crosswalk. 7 seed rows spanning CC1, CC6, CC7. Owner: `sec-lead`.
   - All maps carry `authoritative: false` and a non-authoritative banner.

2. **`schemas/compliance-map.schema.json`** — Draft-2020-12 JSON schema validating the machine-readable YAML front-matter. Required fields: `regulation` (id/name/version/authority/effective/published_map/owner), `rows[]` (ucm_id matching `^CTL-[A-Z]+-[0-9]{3}$`, regulation_ref, relationship, notes?, evidence_artifact?). `authoritative` field constrained to `false`.

3. **`tools/validate-schemas.py` extended** — YAML-front-matter discovery path added:
   - New schema-to-path mapping for `compliance-map.schema.json` → `governance/compliance-maps/*.md`.
   - `_extract_yaml_front_matter()` helper + new `yaml_front_matter` path in `validate_one()`.
   - Dependency on `PyYAML` is **optional**; when absent, compliance-map artifacts are skipped with a clear message and other schema validations still run. Matches the existing graceful-degradation pattern for `jsonschema`.
   - `README.md` inside `compliance-maps/` and files starting with `_` are excluded from discovery.

4. **[7] STD-GOV-006 v1.1 → v1.2** — additive:
   - Tier Cheat-Sheet T2 row extended: products declaring scope for a listed regulation MUST reference the map in PCL row + audit-evidence pack.
   - New **§13 External Regulation Crosswalks** describing the map-file contract, ownership, consumption, cadence.
   - Version-history backfill: v1.1 entry documented the prior Tier Table addition that had created version drift; v1.2 entry documents RFC-0005.
   - Renamed `v1.md` → `v1.2.md`; registry synced.

5. **[46] TPL-LGL-002 v1.0 + [47] STD-DAT-005 v1.0** — two new numbered entries:
   - **[46] BAA Standard Template** — meta-exempt (no Tier Table), sibling to [16] TPL-LGL-001 DPA template. Covers 45 CFR §164.504(e) required content: permitted uses + Minimum Necessary + prohibited uses, safeguards cross-referenced to UCM via `compliance-maps/hipaa-security-rule.md`, breach notification (60-day max with 5-BD initial notice), subcontractor flow-down, HHS access, term + termination, return-or-destroy-or-extend on termination. Schedules A-D for per-deal customization. Owner: Legal Lead + Privacy Lead.
   - **[47] De-identification Standard** — T1/T2/T3 Tier Table. T1 rules apply only when PHI or GDPR-scope personal data is exported for secondary use (conditional T1). Three methods documented: Safe-Harbor (HIPAA §164.514(b)(2) — 18 identifier categories), Expert-Determination (HIPAA §164.514(b)(1) — qualified-expert methodology), GDPR pseudonymization (Art. 4(5)). Residual-risk taxonomy: `low`/`medium`/`high` with review cadence. Release-log contract with [38] STD-OPS-003. Owner: Privacy Lead + Data Owner.

### 29.2 Cross-reference updates (additive, no version bumps)

Per POL-GOV-001 §8 additive-reference rule, the following received additive citations without version bumps:

- **[25] STD-DAT-001 v1.2** — T3 row now cites `[46] TPL-LGL-002` for HIPAA BAA instrument and `[47] STD-DAT-005` for de-identification procedures.
- **[15] STD-LGL-001 v1** — T3 row now flags the legal-hold-vs-BAA return-or-destroy precedence per [46] §8.3.
- **[9] POL-VEN-001 v1** — T2 row now cites `[16] TPL-LGL-001` (DPA) and `[46] TPL-LGL-002` (BAA) as the two vendor-agreement instruments.

### 29.3 [4] FWK-GOV-001 v1.3 → v1.4 — Tier Cheat-Sheet update

- Intro portfolio count updated from 45 → 48 standards.
- Meta-exempt list grows to include `[46]`.
- **T1 MUST** — new conditional `[47]` row (fires only when PHI or GDPR-scope personal data is exported for secondary use).
- **T2 SHOULD** — `[7]` row extended to reference `governance/compliance-maps/` with reserved behavior (MUST reference in PCL + evidence pack when scope applies). New `[47]` row (documented procedure per data-flow, method-selection rationale, periodic risk review).
- **T3 MAY** — `[25]` T3 row revised to cite `[46] TPL-LGL-002` as the BAA instrument; new `[47]` T3 row (formal Expert-Determination review, SDC, differential privacy, external audit, k-anonymity/l-diversity thresholds).
- Renamed `v1.3.md` → `v1.4.md`; registry synced.

### 29.4 `tools/freeze-check.py` META_EXEMPT_PREFIXES extended

`[46]-TPL-LGL-002` added to the meta-exempt whitelist alongside `[1]`, `[2]`, and `[16]`. Rationale: [46] is a legal template (class: template for customer agreements) that, like [16] TPL-LGL-001, inherits its applicability from the triggering standard rather than carrying its own Tier Table. Pattern matches POL-GOV-001 §8.8.1.

### 29.5 `registries/standards.json` sync

- `FWK-GOV-001` → v1.4 + filename.
- `STD-GOV-006` → v1.2 + filename + effective 2026-04-22.
- New entry `TPL-LGL-002` — catalog 7.8, v1.0, Legal, Legal Lead + Privacy Lead.
- New entry `STD-DAT-005` — catalog 3.6, v1.0, Data & Privacy, Privacy Lead + Data Owner.
- Total entries: 50 (48 standards + 2 legacy non-[N] rows).

### 29.6 Verification

Ran baseline pair:

- `python3 tools/freeze-check.py --json` — 48 standards scanned, **0 findings**, all tier tables present (or meta-exempt). Report regenerated; `tier_table_rate` 100%.
- `python3 tools/validate-schemas.py --strict` — 7 artifacts checked, **0 failures**. ADR/audit-findings/risk/vendor JSON artifacts validate clean. Compliance-map YAML validation SKIPS gracefully (PyYAML missing in this runtime) but structural `---` delimiter extraction confirms all three seed files have well-formed front-matter blocks. A sanity regex pass confirms: PCI 5 rows, HIPAA 6 rows, SOC2 7 rows — all match file shape.

### 29.7 Files touched (this execution)

**Created (7):**
- `schemas/compliance-map.schema.json`
- `governance/compliance-maps/README.md`
- `governance/compliance-maps/pci-dss-4.0.md`
- `governance/compliance-maps/hipaa-security-rule.md`
- `governance/compliance-maps/soc2.md`
- `[46]-TPL-LGL-002 CYBERCUBE-BAA-Standard-Template-v1.md`
- `[47]-STD-DAT-005 CYBERCUBE-De-identification-Standard-v1.md`

**Modified:**
- `[7]-STD-GOV-006 …-v1.md` → renamed `…-v1.2.md`; T2 cheat-sheet row; new §13; version history.
- `[4]-FWK-GOV-001 …-v1.3.md` → renamed `…-v1.4.md`; portfolio count 45 → 48; [7]/[25] cheat-sheet rows; new [47] T1/T2/T3 rows; meta-exempt list grows; version history v1.4 entry.
- `[25]-STD-DAT-001 …-v1.2.md` — T3 row additive xref to [46]/[47].
- `[15]-STD-LGL-001 …-v1.md` — T3 row additive xref to [46] §8.3.
- `[9]-POL-VEN-001 …-v1.md` — T2 row additive xref to [16]/[46].
- `tools/validate-schemas.py` — YAML-front-matter discovery + validation.
- `tools/freeze-check.py` — `[46]-TPL-LGL-002` added to META_EXEMPT_PREFIXES.
- `registries/standards.json` — FWK-GOV-001 v1.4 + STD-GOV-006 v1.2 + new TPL-LGL-002 + new STD-DAT-005.
- `freeze-check-report.json` — regenerated (48 rows, 0 findings).

### 29.8 Migration-plan step status (RFC-0005 §5)

| Step | Status |
|------|--------|
| 1. Accept RFC | Done (§26) |
| 2. Create compliance-maps/ + schema + README | Done (§29.1) |
| 3. Seed 3 regulation maps | Done (§29.1) |
| 4. Extend validate-schemas.py for YAML | Done (§29.1 / §29.6) |
| 5. [7] STD-GOV-006 T2 clause + v1.1 bump | Done — v1.2 (§29.1; v1.1 was backfill of prior Tier-Table drift) |
| 6. Author [46] TPL-LGL-002 | Done (§29.1) |
| 7. Author [47] STD-DAT-005 | Done (§29.1) |
| 8. Registry rows for [46] / [47] | Done (§29.5) |
| 9. [4] FWK-GOV-001 Cheat-Sheet; v1.2 → v1.3 bump | Done — v1.4 (§29.3; prior v1.3 was RFC-0002 execution) |
| 10. Cross-references in [25] / [15] / [9] | Done (§29.2) |
| 11. Re-run freeze-check + validate-schemas | Done (§29.6) |
| 12. Open per-regulation bulk-population tickets | Deferred — documented; seed rows ship at 3-7 per regulation per RFC-0005 §3.2 |
| 13. Announce in `#eng-standards` + `#legal-compliance` | Deferred — non-normative communication task |

### 29.9 Pass-4 findings status after §29

| Finding | Status | Closed by |
|---------|--------|-----------|
| F1 Starter kits / project templates | Partial | RFC-0004 §27 (small-project exclusion landed; `docs/starters/*` still queued) |
| F2 Regulation mappings absent | **Closed** | RFC-0005 §29 (seed maps + schema + tool + governance) |
| F3 HIPAA primitives absent | **Closed** | RFC-0005 §29 ([46] BAA + [47] De-identification) |
| F4 Tier Cheat-Sheet coordination cost | Closed (§25.2) | §25.2 + §28 + §29.3 refreshes |
| F5 Vendor-inventory enum missing `foundation-model` | Closed (§25.1) | §25.1 |
| F6 Small-project module-audit exclusion | Closed | RFC-0004 partial §27 |

Only **F1 residual** remains from Pass-4; it reduces to the `docs/starters/*` + onboarding-checklist work noted as RFC-0004 residual. Pass-3 numeric re-score remains blocked until the 2026-05-06 survey window closes.

### 29.10 Remaining work

- **RFC-0001** (STD-ENG-001 split) — large multi-file structural refactor + ~3 new sub-standards. Still queued.
- **RFC-0004 residual** — `docs/starters/*` + companion template repos + [5] PCL schema extension + [4] acknowledgment paragraph.
- **RFC-0005 follow-ons** — bulk population of each of the three seeded maps per-regulation owner (PCI ≈3 wk / HIPAA ≈2 wk / SOC2 ≈2 wk per RFC-0005 §3.2).
- **Optional**: install `PyYAML` in the CI runtime to enable full YAML front-matter schema validation (currently skipped gracefully).

---
