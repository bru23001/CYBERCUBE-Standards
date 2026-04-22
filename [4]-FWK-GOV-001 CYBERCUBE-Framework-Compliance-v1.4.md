# CYBERCUBE Framework Compliance (v1.3)

**Standard ID:** FWK-GOV-001  
**Status:** Active  
**Effective:** 2026-01-17 (v1), 2026-04-22 (v1.1), 2026-04-22 (v1.2), 2026-04-22 (v1.3)  
**Classification:** INTERNAL  
**Owner:** Standards Council

---

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Framework | Waiver Path |
| ------------- | ---- | ------------------------------------ | ----------- |
| All projects | **T1 MUST** | (1) The CYBERCUBE acronym definitions in this document are canonical and MUST NOT be reinterpreted elsewhere. (2) Every project MUST complete a self-assessment against the checklist at project inception and again before GA. (3) Any FAIL item MUST either be fixed before GA or covered by an approved waiver per STD-GOV-003. | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Checklist re-scored at each release cycle, scores logged in the project's `docs/compliance/`, compliance owner named per project. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | External framework-compliance validation, published compliance scores, board-level compliance reporting, cross-mapped to SOC-2/ISO-27001 via STD-GOV-006 UCM. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

---

This is the official CYBERCUBE Framework Compliance Definitions for each element of the acronym. These definitions are structured to serve as compliance checkpoints for evaluating future digital projects, deliverables, or product features.

Use this checklist during design, development, and QA phases to ensure full adherence to the CYBERCUBE framework standards.

> **Note:** The CYBERCUBE acronym definitions in this section are canonical and must not be reinterpreted differently in other governance documents.

| Element                       | Description Summary                                       | Compliant (Y/N) | Notes or Evidence |
| ----------------------------- | --------------------------------------------------------- | --------------- | ----------------- |
| **C** — Content        | Clear, accurate, and purpose-driven content               |                 |                   |
| **Y** — Yield          | Delivers measurable value (efficiency, revenue, outcomes) |                 |                   |
| **B** — Brand          | Aligned with brand voice, design, and naming standards    |                 |                   |
| **E** — Engagement     | Designed for user interaction, with feedback and CTAs     |                 |                   |
| **R** — Responsiveness | Responsive across devices, browsers, and accessible       |                 |                   |
| **C** — Conversion     | Optimized for user success (forms, funnels, actions)      |                 |                   |
| **U** — UX             | Intuitive, tested, and free of ambiguity                  |                 |                   |
| **B** — Backend        | Secure, scalable, documented, and maintainable systems    |                 |                   |
| **E** — Experience     | Emotionally positive, helpful, and reassuring experience  |                 |                   |

---

## C — Content

All written, visual, or media content must be:

- Clear, accurate, and purpose-driven
- Emotionally resonant and aligned with brand tone
- Optimized for both comprehension and discoverability (e.g., SEO, readability)
- Free from unnecessary filler, duplications, or contradictions
- Reviewed for factual accuracy and appropriate language for the target audience

**Additional Considerations:**

- Maintain consistent terminology across all platforms and documentation
- Ensure all media assets (images, videos, icons) have appropriate alt text and captions
- Content should be localization-ready where applicable
- Apply version control to content updates for audit trails
- Headlines, microcopy, and error messages should be human-centered and actionable

**Compliance Check:** Is every content element meaningful, intentional, and aligned with project goals?

**Evidence Examples:** Content audit reports, SEO scores, readability analysis, editorial review sign-off

---

## Y — Yield

The feature or product must deliver measurable business value. This may include:

- Efficiency improvements (time/cost savings, workflow reduction)
- Revenue impact (sales, retention, conversion, expansion)
- Data yield (insights, reports, tracking for decision-making)
- Customer outcomes (engagement, satisfaction, task success)

**Additional Considerations:**

- Define KPIs before development begins — what does success look like?
- Track ROI through analytics dashboards and periodic reviews
- Prioritize features that deliver compound value (e.g., automation that saves time AND reduces errors)
- Avoid vanity metrics; focus on actionable data that drives decisions
- Document expected vs. actual yield in post-launch retrospectives

**Compliance Check:** Does the output directly support quantifiable or qualitative business benefit?

**Evidence Examples:** KPI dashboards, ROI calculations, user adoption metrics, time-saved reports

---

## B — Brand

All visual and verbal elements must reflect brand identity, including:

- Voice, tone, and style consistency
- Color palette and typography usage
- Logo, icons, UI components, and imagery guidelines
- Adherence to naming conventions and internal UX vocabulary

**Additional Considerations:**

- Reference the official brand style guide for all design decisions
- Ensure third-party integrations (widgets, embeds) align with brand aesthetics
- Apply brand voice consistently across error messages, notifications, and system feedback
- Use approved iconography and avoid mixing icon styles
- White-labeling requirements should be documented and tested

**Compliance Check:** Does the design and messaging match our internal brand standards and public perception goals?

**Evidence Examples:** Brand audit checklist, design system compliance, style guide adherence review

---

## E — Engagement

*Scope: Functional interaction design — how users interact with the system and how the system responds.*

User interaction must feel purposeful and frictionless. Includes:

- Clear call-to-actions (CTAs)
- Interactive feedback (animations, confirmations, microcopy)
- Personalized or contextual responses
- Seamless flow between tasks

**Additional Considerations:**

- Use progressive disclosure to avoid overwhelming users with information
- Implement loading states, skeleton screens, and optimistic UI where appropriate
- Design for empty states — guide users on what to do next
- Provide undo/redo capabilities for destructive actions
- Gamification elements (if used) should enhance, not distract from core tasks
- Notifications should be timely, relevant, and dismissible

**Compliance Check:** Does the experience invite and sustain meaningful user interaction?

**Evidence Examples:** Heatmaps, click-through rates, session recordings, user feedback surveys

---

## R — Responsiveness

The application or component must adapt cleanly across:

- Mobile, tablet, and desktop breakpoints
- Major browsers and platforms
- Variable network or device performance
- Accessibility needs (screen readers, reduced motion, keyboard navigation)

**Additional Considerations:**

- Test across minimum supported browsers (define browser matrix)
- Implement graceful degradation for older browsers and devices
- Optimize for slow networks (lazy loading, compression, caching)
- Ensure touch targets meet minimum size requirements (44x44px)
- Support both portrait and landscape orientations on mobile
- Test with actual assistive technologies, not just automated tools
- Page load time should target less than 3 seconds on 3G connections

**Compliance Check:** Is the system performant, accessible, and visually consistent across devices?

**Evidence Examples:** Lighthouse scores, cross-browser test results, WCAG compliance audit, performance benchmarks

---

## C — Conversion

The system must guide users toward clear outcomes:

- Funnel integrity (visitor to user to goal completion)
- Optimized forms, buttons, and actions
- Reduced drop-offs, cognitive load, and guesswork
- Support for testing (A/B, funnel analytics)

**Additional Considerations:**

- Minimize form fields — ask only what is necessary
- Provide inline validation with helpful error messages
- Use social proof (testimonials, trust badges) where appropriate
- Implement progress indicators for multi-step processes
- Exit-intent strategies should be non-intrusive
- Track micro-conversions, not just final goals
- Ensure CTAs are visible without scrolling (above the fold) on key pages

**Compliance Check:** Is the design and flow optimized to support user and business conversion goals?

**Evidence Examples:** Funnel analytics, form completion rates, A/B test results, drop-off analysis

---

## U — UX (User Experience)

*Scope: Functional usability — how intuitive, learnable, and efficient the interface is to use.*

The experience must be:

- Intuitive and self-explanatory
- Grounded in user research, testing, or journey mapping
- Free of ambiguity, redundancy, or dead ends
- Governed by standard usability heuristics (Nielsen) and platform guidelines (Apple HIG, Material Design)

**Additional Considerations:**

- Conduct usability testing with real users before major releases
- Document user personas and reference them in design decisions
- Maintain consistency in navigation patterns across the application
- Provide clear breadcrumbs and wayfinding for complex flows
- Error recovery should be easy — users should not lose work
- Support common shortcuts and gestures users expect
- Information architecture should be validated through card sorting or tree testing

**Compliance Check:** Has the experience been intentionally designed, tested, and refined for clarity and simplicity?

**Evidence Examples:** Usability test reports, user journey maps, heuristic evaluation, task success rates

---

## B — Backend

Systems must be architected for:

- Scalability, maintainability, and modularity
- Secure APIs, authenticated access, encrypted data
- Log tracking, error handling, and fallback safety
- Documentation for deployment, upgrades, and developer onboarding

**Additional Considerations:**

- Follow SOLID principles and clean architecture patterns
- Implement rate limiting and abuse prevention on all endpoints
- Use environment-based configuration (dev, staging, production)
- Maintain test coverage targets (unit, integration, e2e)
- Database migrations should be reversible and version-controlled
- Implement health checks and monitoring alerts
- API versioning strategy must be documented and enforced
- Secrets management should use vault solutions, never hardcoded

**Compliance Check:** Is the backend infrastructure clean, scalable, and supportable by technical teams?

**Evidence Examples:** Code review approvals, test coverage reports, architecture diagrams, security audit results

---

## E — Experience (Emotional/Operational)

*Scope: Emotional and operational trust — how the product makes users feel and how well they are supported.*

The final product must feel:

- Reliable, thoughtful, and emotionally reassuring
- Well-supported with onboarding, documentation, or help features
- Consistent with the customer's expectations and industry standards
- Respectful of time, attention, and user trust

**Additional Considerations:**

- First-time user experience (FTUE) should be guided and welcoming
- Provide contextual help tooltips and inline documentation
- Support channels (chat, email, knowledge base) should be easily accessible
- System status and maintenance windows should be communicated proactively
- Celebrate user achievements and milestones where appropriate
- Respect user preferences (dark mode, notification settings, data privacy)
- Exit and offboarding experience should be as polished as onboarding

**Compliance Check:** Does the product leave users feeling confident, respected, and satisfied?

**Evidence Examples:** NPS scores, customer satisfaction surveys, support ticket trends, churn analysis

---

## Related Documentation

**CYBERCUBE Standards** (separate from this Framework) are maintained alongside this document and include comprehensive company policies and technical standards:

- Security policies (Secure Coding, Security Policy, Incident Response)
- API Design and Architecture Governance
- Authentication and Authorization Standards
- Data Classification and Retention
- Testing and Quality Standards
- Release and Deployment Standards
- Privacy and Compliance Policies
- And 25+ additional standard documents

When referencing "standards" in conversation, this refers to the full set of CYBERCUBE policy and technical standard documents, not this Framework checklist.

---

## How to Use This Framework

**During Planning:**

- Review each element to identify requirements early
- Use the compliance table to track progress

**During Development:**

- Reference specific sections when making design or technical decisions
- Document evidence in the "Notes or Evidence" column

**During QA/Review:**

- Complete the compliance table as a sign-off checklist
- Flag any non-compliant items for remediation before release

**Post-Launch:**

- Review actual performance against expected yield
- Update documentation based on learnings


```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  CYBERCUBE COMPLIANCE — SCORABLE MATRIX (0–5)                               │
│  Acronym: CYBERCUBE  (C-Y-B-E-R-C-U-B-E)                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                               │
│                                                                             │
│  0 = Not addressed / missing                                                │
│  1 = Acknowledged only (no execution)                                       │
│  2 = Partially implemented, inconsistent                                    │
│  3 = Implemented, meets baseline expectations                               │
│  4 = Well-executed, measurable, minor gaps                                  │
│  5 = Exemplary, fully validated, evidence-backed                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ C — CONTENT                                                                 │
│                                                                             │
│  Score criteria:                                                            │
│  • Clarity, accuracy, purpose                                               │
│  • Consistent terminology, localization-ready                               │
│  • Versioned, audited, human-centered copy                                  │
│                                                                             │
│  0–1: Unclear / inconsistent                                                │
│  2–3: Clear but uneven or weakly governed                                   │
│  4–5: Clear, intentional, audited, reusable                                 │
│                                                                             │
│  Evidence: Content audits, editorial sign-off                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Y — YIELD                                                                   │
│                                                                             │
│  Score criteria:                                                            │
│  • Defined KPIs and success metrics                                         │
│  • Measurable efficiency, revenue, or insight                               │
│  • Post-launch validation                                                   │
│                                                                             │
│  0–1: No metrics or value hypothesis                                        │
│  2–3: Metrics defined but weak tracking                                     │
│  4–5: ROI proven, dashboards + retrospectives                               │
│                                                                             │
│  Evidence: KPI dashboards, ROI analysis                                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ B — BRAND                                                                   │
│                                                                             │
│  Score criteria:                                                            │
│  • Voice, tone, visuals aligned                                             │
│  • Naming, iconography, typography compliant                                │
│  • White-label rules defined                                                │
│                                                                             │
│  0–1: Brand ignored or inconsistent                                         │
│  2–3: Mostly aligned, some drift                                            │
│  4–5: Fully compliant with style governance                                 │
│                                                                             │
│  Evidence: Brand audit, design-system review                                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ E — ENGAGEMENT                                                              │
│                                                                             │
│  Score criteria:                                                            │
│  • Clear CTAs, feedback, task flow                                          │
│  • Progressive disclosure, undo/redo                                        │
│  • Meaningful interaction signals                                           │
│                                                                             │
│  0–1: Passive or confusing interaction                                      │
│  2–3: Functional but friction present                                       │
│  4–5: Smooth, intuitive, engagement-tested                                  │
│                                                                             │
│  Evidence: Heatmaps, CTRs, session data                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ R — RESPONSIVENESS                                                          │
│                                                                             │
│  Score criteria:                                                            │
│  • Multi-device, multi-browser support                                      │
│  • Accessibility (WCAG), performance targets                                │
│  • Graceful degradation                                                     │
│                                                                             │
│  0–1: Breaks across devices                                                 │
│  2–3: Works but accessibility/perf gaps                                     │
│  4–5: Accessible, performant, verified                                      │
│                                                                             │
│  Evidence: Lighthouse, WCAG audit                                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ C — CONVERSION                                                              │
│                                                                             │
│  Score criteria:                                                            │
│  • Clear outcomes and funnels                                               │
│  • Optimized forms, validation, micro-conversions                           │
│  • Drop-off analysis                                                        │
│                                                                             │
│  0–1: No guided outcomes                                                    │
│  2–3: Basic funnel, limited optimization                                    │
│  4–5: Data-driven conversion optimization                                   │
│                                                                             │
│  Evidence: Funnel analytics, A/B tests                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ U — UX                                                                      │
│                                                                             │
│  Score criteria:                                                            │
│  • Intuitive, learnable, ambiguity-free                                     │
│  • Based on research, heuristics, testing                                   │
│  • Strong IA and recovery paths                                             │
│                                                                             │
│  0–1: Confusing or undocumented UX                                          │
│  2–3: Usable but inconsistent                                               │
│  4–5: Deliberately designed and validated                                   │
│                                                                             │
│  Evidence: Usability tests, journey maps                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ B — BACKEND                                                                 │
│                                                                             │
│  Score criteria:                                                            │
│  • Scalable, modular architecture                                           │
│  • Security, logging, monitoring                                            │
│  • Versioned APIs, reversible migrations                                    │
│                                                                             │
│  0–1: Fragile or undocumented                                               │
│  2–3: Works but lacks governance                                            │
│  4–5: Production-grade, audited, observable                                 │
│                                                                             │
│  Evidence: Code reviews, coverage, security audits                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ E — EXPERIENCE (Emotional / Operational)                                    │
│                                                                             │
│  Score criteria:                                                            │
│  • Trust, clarity, reliability                                              │
│  • Polished onboarding/offboarding                                          │
│  • Transparent support and status                                           │
│                                                                             │
│  0–1: Frustrating or opaque                                                 │
│  2–3: Acceptable but impersonal                                             │
│  4–5: Confidence-building and supportive                                    │
│                                                                             │
│  Evidence: NPS, CSAT, support trends                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                 │
│                                                                             │
│  Max: 45 points (9 dimensions x 5)                                          │
│                                                                             │
│  >= 40  Release-grade                                                       │
│  32–39  Conditional (remediation required)                                  │
│  < 32   Blocked                                                             │
│                                                                             │
│  OPTIONAL: Weight factors may be applied per product class (see 1.5 PRCS)   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tier Cheat-Sheet

*Aggregated from the Applicability Tier Tables of all 45 standards (v1.x portfolio). Each line names the standard + the deliverable a new team must produce to satisfy that tier. Use as the "opening-checklist" when scoping a new project; the full clause text lives in the cited standard.*

> **How to read this:** Pick your tier from STD-GOV-001 (PCL criticality) and STD-DAT-001 (data classification). T1 applies to everything. T2 adds SaaS / customer-facing obligations. T3 adds regulated / high-risk obligations. Meta-exempt ([1] Name Registry, [2] POL-GOV-001, [16] TPL-LGL-001) provide infrastructure for the framework itself and don't produce tier-scoped deliverables.
>
> **Addresses Pass-4 Finding F4** (coordination cost grows linearly with tier depth — no single-page cheat-sheet). See `CYBERCUBE-Standards-Audit-Report-v1.md` §24.4.

### T1 — MUST (every project)

Baseline applicable to internal tools, SaaS, and regulated products alike. ~30 deliverables across 22 standards.

**Governance & Registry**

- **[3] POL-GOV-002** — Named architecture owner; ADR/RFC for any cross-service / cross-datastore change.
- **[4] FWK-GOV-001** — Self-assessment against the checklist at inception + pre-GA; remediate or waive every FAIL.
- **[5] STD-GOV-001** — Register product with a PCL code before first production deploy; review on architectural change.
- **[6] STD-GOV-003** — File a waiver for any documented deviation; no silent deviations.
- **[7] STD-GOV-006** — Every new MUST clause you author maps to a UCM row in the same change.
- **[8] STD-ERM-001** — Use the canonical Risk Register; HIGH/CRITICAL residual risks have a named approver.
- **[44] STD-GOV-004** — Audit findings tracked in the ERM risk register.
- **[45] STD-GOV-005** — Expose at least one business/operational metric; SEV1/SEV2 produce a KRI entry at portfolio level.

**People & Vendors**

- **[9] POL-VEN-001** — Vendor register with risk rating; vendor risks in the ERM register; assessment before production data flows.
- **[10] POL-AUP-001** — Every employee/contractor acknowledges AUP before access; no personal/illegal use of company assets.
- **[11] POL-AI-001** — AI tools from Approved list; no PII/secrets/customer data to unapproved services; human review of AI output before merge. *(No T1 rules in [48] STD-AI-001 at v1.0 by design — engineering-side MUSTs are T2/T3.)*
- **[24] STD-SEC-008** — Security-awareness onboarding before access; annual refresh; incident-triggered re-training.

**Privacy & Records**

- **[12] POL-PRI-001** — Published, version-dated public Privacy Policy with all GDPR/CCPA categories.
- **[13] POL-PRI-002** — Classify personal data (via STD-DAT-001); declare lawful basis before collection.
- **[14] POL-REC-001** — Records that qualify per §1 have a named custodian; destruction past retention authorized by disposition authority before `deletion_log` event (per STD-DAT-001 T1 #4).
- **[15] STD-LGL-001** — On credible claim/subpoena, GC issues a written legal hold that pauses deletion.

**Security**

- **[17] STD-SEC-001** — Named security owner (`sec-lead`); security incidents tracked; CIA as primary objective.
- **[18] STD-SEC-003** — Passwords Argon2id (or bcrypt ≥12); session expiry + invalidation on logout/credential change; auth events logged.
- **[19] STD-SEC-004** — Deny-by-default; authZ check before business logic on every endpoint; no "admin-or-nothing" roles.
- **[20] STD-SEC-005** — Approved algorithms only (AES-GCM, TLS 1.2+, SHA-256+, Argon2id, RSA≥2048/Ed25519); no roll-your-own crypto.
- **[21] STD-SEC-002** — Input validation at trust boundaries; parameterized SQL; template-escaped HTML output.
- **[22] STD-SEC-006** — Dependency scan in every CI build; Critical/High triaged ≤5 BD; CISA KEV remediated in SLA.
- **[23] STD-SEC-007** — Security incidents follow STD-OPS-004 SEV taxonomy; `sec-lead` + backup named; evidence preserved.

**Data**

- **[25] STD-DAT-001** — Classification label per entity; declared retention; PII fields identified; deletion audit; backup inheritance.
- **[26] STD-DAT-002** — User-initiated deletes are soft-deletes by default; soft-deleted excluded from default scope; retention before purge.
- **[27] STD-DAT-004** — *Multi-tenant only:* `tenant_id` on every scoped table/index/cache/path; every query filters by it; no cross-tenant leakage.

**Engineering**

- **[28] STD-ENG-009** — Declare stack in README against the radar; no HOLD technologies for new projects.
- **[29] STD-ENG-001** — Namespace-A / Namespace-G naming; CC-PID for external identifiers; raw DB PKs not leaked.
- **[31] STD-ENG-002** — Versioned endpoints; consistent machine-readable error shape; no stack traces to clients.
- **[32] STD-ENG-003** — *Webhook emitters only:* HMAC-SHA256 signing per endpoint; unique `event_id`; secrets per-consumer.
- **[33] STD-ENG-008** — Functionality reused across ≥2 projects is a registered module with owner + ICD + version; breaking changes bump major. *Small-project exclusion available (self-asserted, no waiver required) for products ≤5 FTEs, ≤5 services, INTERNAL-or-below, no customer-facing interface — see [33] §Small-Project Exclusion.*
- **[34] STD-ENG-004** — All cloud infra in code; remote state with locking; console drift reverted.
- **[35] STD-ENG-005** — Automated test suite gates merge; critical paths have a test; bug fixes ship with regression tests.
- **[36] POL-ENG-001** — Every production-impacting change filed with rollback + approver; emergency changes get a retro.
- **[37] STD-ENG-006** — Git with protected default branch; deploys from versioned immutable artifacts; identifiable deploy record.

**Operations**

- **[38] STD-OPS-003** — Structured logs (no secrets/PII); health endpoint per service.
- **[39] STD-OPS-005** — Declared service tier; on-call contact per Tier-1-Critical; SLI defined.
- **[40] STD-SLP-001** — Written service description + named SLO owner; announced planned maintenance; Legal-reviewed public SLAs.
- **[41] STD-OPS-004** — SEV1–SEV4 taxonomy; on-call per production service; postmortem ≤10 BD on SEV1/2.
- **[42] STD-OPS-002** — Daily automated backup per datastore; at least one copy on different storage/region; documented restore procedure.
- **[43] PLN-OPS-001** — Named BC owner + backup; Critical Systems register with RTO; declare-BC authority.

### T2 — SHOULD (SaaS / customer-facing)

Adds to T1. ~25 deliverables — what separates a customer-facing SaaS v1 from an internal tool.

**Governance & Compliance**

- **[3]** Maintained C4-level architecture diagram + tech-debt log; quarterly ARB sync.
- **[4]** Checklist re-scored each release; scores logged in `docs/compliance/`; named compliance owner.
- **[5]** Automated registry sync from source repos; quarterly PCL recertification; CMDB integration.
- **[6]** Exception register in controlled location; quarterly review; visible in compliance dashboard.
- **[7]** Quarterly UCM refresh; gap analysis; mapping to one external framework (SOC-2 / NIST CSF / ISO-27001).
- **[8]** Semi-annual risk review per product; KRI tracking.
- **[44]** Annual audit plan; findings tracking; CAP process; periodic dashboard.
- **[45]** KRI catalog with thresholds per domain; quarterly review; automated collection.

**People & Vendors**

- **[9]** Annual assessment; DPA signed before data access; named vendor owner; offboarding + sub-processor list.
- **[10]** AUP integrated into contract; annual re-acknowledgment; documented BYOD / MDM enrollment; automated offboarding.
- **[11]** Tool approval workflow; usage logging; AI-use disclosure in customer-facing features; AUP-aligned training cadence. *Engineering-side T2 deliverables for AI features (registered model identity, prompt versioning, eval harness, prompt-injection mitigations, observability, disclosure-banner pattern) owned by [48] STD-AI-001.*
- **[48]** Registered model identity (model registry row per production model; owner; version; classification envelope); prompt versioning under `prompts/`; evaluation harness (golden dataset + regression gate in CI); prompt-injection mitigation per [21] STD-SEC-002 §11; observability metrics (unsafe-output rate, drift, refusal rate, token usage); customer-facing AI disclosure banner implementation.
- **[24]** Quarterly phishing simulations; role-based curricula; LMS-backed tracking.

**Privacy & Records**

- **[12]** Per-jurisdiction notices (GDPR/CCPA/LGPD/UK-DPA); cookie banner with granular consent; DPO contact listed.
- **[13]** DPIA triage workflow; consent platform; DSR ticket workflow with SLA; DPA inventory; annual privacy training.
- **[14]** Named records custodian per department; automated retention/disposal where platform allows.
- **[15]** Centralized hold register; custodian acknowledgment; system-level hold capability; audit log of hold actions.

**Security**

- **[17]** Threat modeling for new services; dependency scanning; security review of high-risk changes.
- **[18]** Email verification; secure password reset; TOTP MFA offered; refresh-token rotation; account lockout.
- **[19]** Permission registry; named roles with inheritance; tenant isolation at query layer; periodic access reviews.
- **[20]** Automated secrets rotation; encryption at rest for PII (platform-managed); mTLS internal; cert auto-renewal.
- **[21]** Linter + security rules in CI; dependency-vuln scan; centralized input-validation + output-encoding libs; secure cookie flags; CSP.
- **[22]** SAST on every PR with blocking gate; container scanning pre-push; published VDP / security.txt.
- **[23]** Per-category playbooks; annual tabletop; legal-reviewed notification templates; quarterly IR metrics.

**Data**

- **[25]** DSAR workflow with SLA; lawful-basis map per field group; encryption at rest; non-prod data masking.
- **[26]** Grace-period restore API (30d default); `410 Gone` standard; tombstone records; user-visible Trash.
- **[27]** Tenant-context middleware on routes; tenant-scoped cache/storage; async jobs carry tenant context; negative-isolation tests.

**Engineering**

- **[28]** Quarterly radar refresh; compatibility matrix; SBOM at build; license-policy enforcement.
- **[29]** Automated lint for component-type vocabulary; CC-PID format validator; module-boundary import lint.
- **[31]** Published OpenAPI spec; standard response envelope; cursor pagination; idempotency keys; deprecation headers.
- **[32]** Canonical event schema; exponential-backoff retry; delivery logs queryable; DLQ; signed timestamp.
- **[33]** Internal `modules.json` registry; semver compatibility tests; contract tests per ICD; automated version-bump PRs.
- **[34]** IaC security scanning in CI (tfsec/Checkov); version pinning via lockfiles; CODEOWNERS on sensitive modules; drift detection.
- **[35]** Coverage ≥70% unit / ≥50% integration; SAST + dep scan; E2E on top journeys; coverage dashboard.
- **[36]** CAB review for medium/high-risk; change calendar; customer-impact notification.
- **[37]** CI with tests + security scan gating merge; staging ≥80% parity; `/healthz` + `/readyz`; artifact registry; feature flags.

**Operations**

- **[38]** Correlation/trace IDs; OpenTelemetry SDK; RED+saturation dashboards; SLO-linked alerts; on-call paging integration.
- **[39]** SLI/SLO per Tier-1-Critical; error-budget dashboards + burn-rate alerting; 24×5 on-call; canary deploys.
- **[40]** Public SLA doc; status page; customer-visible incident comms; quarterly service review.
- **[41]** Paging tool (PagerDuty or equivalent); public status page; runbook repo; MTTA/MTTR targets.
- **[42]** Quarterly backup-restore tests; integrity verification; per-service DR runbook; backup alerts.
- **[43]** Annual BC tabletop; BIA per business unit; alternate-workspace fallback; vendor contingency; pre-drafted customer notification templates.

### T3 — MAY (regulated / high-risk)

Adds to T1 + T2. ~35 deliverables — kicks in for fintech, healthcare, PCI-adjacent, externally-audited products. Most teams do *not* need this tier; waivers flow the other way (STD-GOV-003) when partially applicable.

**Governance & Compliance**

- **[3]** Formal ARB chartering; scheduled architecture reviews with attendance; enterprise reference-architecture compliance; external review (cloud well-architected).
- **[4]** External framework-compliance validation; published compliance scores; board-level reporting; SOC-2/ISO-27001 cross-map via UCM.
- **[5]** Regulator-facing product inventory attestation; external PCL validation; authoritative asset-management linkage.
- **[6]** External audit of the exception register; board-level review of critical exceptions; regulator-facing waiver attestations.
- **[7]** External-auditor evidence packs derived from UCM; live multi-framework crosswalk; automated evidence collection.
- **[8]** Executive risk committee; independent review of residual ratings; board-level reporting; GRC-platform integration.
- **[44]** Independent internal audit function; scheduled compliance audits; audit-universe refresh.
- **[45]** Audit-grade metric pipeline (source-to-dashboard traceability); externally verifiable metrics; quarterly board KRI report; metric change control.

**People & Vendors**

- **[9]** SOC-2 Type II attestation required; pen-test evidence; on-site audit rights; multi-vendor contingency for critical dependencies; bi-annual tabletops on vendor-originated incidents.
- **[10]** Role-based AUP addenda; training completion gate before access; insider-threat monitoring; prohibited-software allowlist/denylist via MDM; disciplinary matrix codified.
- **[11]** AI Governance Committee (policy body); ethics review board (personnel-side intake); board approval for critical-risk AI use cases.
- **[48]** Bias / fairness audit protocol (pre-GA + annual + on material model change); model cards per production model (using §Appendix A template); foundation-model provenance (vendor certifications, SBOM, vendor model cards); fine-tune provenance (training-data classification, pipeline attestation, artifact signing); red-team protocol pre-GA for automated-decision features; AI Governance Committee engineering agenda (model-registry review, bias-audit review, KRI trend review, red-team findings review).
- **[24]** PCI-specific training (Req 12.6); sector-specific modules; executive crisis simulations; bi-annual tabletops.

**Privacy & Records**

- **[12]** Sector-specific disclosures (HIPAA NPP / COPPA / GLBA); layered notice; DPIA summary referenced; automated DSR portal.
- **[13]** Full Art. 35 DPIAs; data-minimization-by-design; pseudonymization / differential privacy; BCRs / SCCs for transfers.
- **[14]** Formal records-management training; DLP coverage; immutable/WORM archive tier; certified media sanitization; external attestation.
- **[15]** Automated preservation (vault + hold flag); forensic chain-of-custody; eDiscovery tooling; regulator-clock automation.

**Security**

- **[17]** Continuous controls monitoring mapped to UCM; CISO-owned risk register; scheduled third-party pen tests; executive-reported KRIs.
- **[18]** Enforced MFA; enterprise SSO (SAML); FIDO2 keys; step-up auth for privileged ops; session recording for admin actions; SCIM; continuous auth telemetry.
- **[19]** PostgreSQL RLS authoritative on tenant tables; dedicated policy engine (OPA); quarterly access certification; SoD matrix; JIT privileged access; break-glass with auto-revocation.
- **[20]** BYOK/HYOK; HSM-backed storage; FIPS 140-2/3 modules; post-quantum planning (hybrid KEMs); SoD on key admin; formal crypto-review gate.
- **[21]** SAST on every PR with blocking gate; IAST/DAST in staging; secure-code review for privileged modules; threat modeling; memory-safety-first language preference.
- **[22]** Bug bounty; DAST in staging; cloud CSPM; executive KRI reporting; scheduled third-party pen tests; UCM-wired dashboard.
- **[23]** External IR retainer with SLA; chain-of-custody forms; 24×7 security on-call; executive-briefing cadence; forensic toolchain (EDR/memory/disk); regulator-notification automation (GDPR 72h / HIPAA).

**Data**

- **[25]** Legal-hold system with per-entity flags; BYOK/HYOK; automated DSAR with ID-verification; immutable audit trails; tokenization/pseudonymization; residency controls; GDPR DPIA / HIPAA BAA / PCI SecDepth artifacts.
- **[26]** Archival (cold) tier before purge; suspension distinct from deletion; per-tenant retention; legal-hold integration; cryptographic erasure; SIEM-immutable audit.
- **[27]** PostgreSQL RLS authoritative; tenant federation (isolated schemas/DBs); break-glass with auto-revocation; per-tenant encryption keys (BYOK).

**Engineering**

- **[28]** Formal architecture review per new stack entry; vendor-risk assessment per technology; SLSA attestation; reproducible builds; FIPS-validated crypto libs; golden-image requirement.
- **[29]** CC-PID integrity signature (tamper-evidence); per-tenant namespace partitioning; identifier audit trail; code-gen emits conformant IDs only; pre-commit blocks non-conformant identifiers.
- **[31]** mTLS between services; signed-request scheme for partners; full audit-store recording; contract testing (Pact); API gateway with policy enforcement; client-cert auth.
- **[32]** Event replay UI; typed SDKs; per-subscription rate limiting; customer delivery dashboard; SOC-2-grade delivery audit trail.
- **[33]** Module-level SBOM + provenance; license-compatibility policy per consumer; signed release artifacts; LTS branches; RFC for new modules; ARB-reviewed dependency graph.
- **[34]** Policy-as-code (OPA/Sentinel/Conftest) blocking gates; production-apply approval workflow; break-glass for emergencies; tested state-recovery runbook; cost-budget guardrails; multi-region state; SoD on IaC.
- **[35]** Mutation testing; property-based testing; performance baselines with regression alerts; chaos/resilience testing; archived test evidence; contract testing; OWASP ASVS mapping.
- **[36]** Formal CAB ceremony; segregation of duties on approval; metrics dashboard; annual program review; compliance attestation.
- **[37]** Artifact signing (cosign/sigstore) with verify-at-deploy policy; SBOM per release; build/deploy SoD; canary / blue-green; automated rollback on health regression; SIEM-exported deploy audit.

**Operations**

- **[38]** End-to-end distributed tracing; audit-log pipeline separate from ops logs (immutable, SIEM-exportable); anomaly detection; synthetic monitoring; executive observability KRIs; multi-tenant log isolation.
- **[39]** 24×7 on-call; multi-region / multi-AZ redundancy; quarterly chaos/gamedays; toil tracking ≤50%; monthly reliability review; DR tested quarterly; 99.95%+ availability.
- **[40]** Measured SLO engineering (SLI + burn-rate + error-budget-driven change freezes); service-credits billing integration; customer reporting portal; contractual SLA with remedies.
- **[41]** Quarterly IR tabletops; BCP/DR integration; SEV-specific customer/regulator notification trees; external IR retainer; formal metrics dashboard.
- **[42]** Quarterly full-DR gameday; 3-2-1 backup rule; hardened immutable/WORM tier; legal-hold-compatible backups; per-tenant restore; DR-audit reports.
- **[43]** Annual live exercise (not just tabletop); alternate-site tested; regulatory continuity reports; ISO 22301 BCMS; board reporting; business-interruption insurance; BIA refresh ≤ annual.

### How to use this cheat-sheet

1. **At project inception** — open [5] STD-GOV-001 and classify your product (PCL); open [25] STD-DAT-001 and classify your data. These two pick your tier.
2. **Build your T1 checklist** — 45 items above under "T1 MUST" are the floor. Every line cites its source standard; open only the standards whose T1 rules you do not yet satisfy.
3. **Add T2 if customer-facing** — multi-tenant SaaS, public APIs, anything with a DPA or contractual SLA triggers T2.
4. **Add T3 only if regulated** — PCI card-data, HIPAA PHI, regulated financial data, or contractual audit obligations. Defaults to "not T3" — escalation requires named justification.
5. **Waivers (STD-GOV-003)** — any deliverable you can't produce gets filed as a waiver with compensating control + expiry; no silent skips.
6. **Waiver inverse (scope-down)** — if a T2/T3 deliverable clearly doesn't fit (e.g. a single-tenant internal tool hitting [27] multi-tenant clauses), document the non-applicability in the same channel.

*Cross-reference: starter-kit templates that pre-wire the T1/T2/T3 deliverables are scoped in RFC-0004 (accepted 2026-04-22, execution pending). Until RFC-0004 execution lands, this cheat-sheet is the canonical summary.*

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-01-17 | Standards Council | Initial framework publication. |
| v1.1 | 2026-04-22 | Standards Council | Added Applicability Tier Table per POL-GOV-001 §8.8. |
| v1.2 | 2026-04-22 | Standards Council | Added **Tier Cheat-Sheet** — aggregates T1/T2/T3 deliverables across all 45 standards into a single onboarding reference. Addresses Pass-4 audit finding F4 (coordination cost). Non-normative — no existing clauses changed. |
| v1.3 | 2026-04-22 | Standards Council | **RFC-0002 execution reflection (additive).** Tier Cheat-Sheet updated to reflect the POL-AI-001 split: [11] T2/T3 rows rescoped to personnel-policy deliverables; new rows for **[48] STD-AI-001** enumerate the engineering-side AI deliverables at T2 (model registry, prompt versioning, eval harness, prompt-injection mitigation, observability, disclosure banner) and T3 (bias audit, model cards, provenance, red-team, governance engineering remit). T1 note clarifies no T1 MUST exists in [48] at v1.0 by design. Portfolio size grows from 45 → 46 standards. |
