# Starter: Internal Tool (T1 only)

**Archetype:** Internal-only product. T1 baseline; T2/T3 not applicable.
**Cites:** [4] FWK-GOV-001 v1.4 Tier Cheat-Sheet · [33] STD-ENG-008 v1.7 §Small-Project Exclusion · [5] STD-GOV-001 · [25] STD-DAT-001.
**Addresses:** Pass-4 F1 (starter kits) · F6 ([33] small-project exclusion).

---

## 1. Applicability

Use this archetype if **all** of these hold:

- ≤ 5 engineering FTEs
- ≤ 5 production services
- Data classification `INTERNAL` or below per [25] STD-DAT-001
- No customer-facing interface (public APIs, customer UIs, billed endpoints)
- No PII, no PHI, no regulated data

If **any** condition fails → switch to `t2-saas.md` (customer-facing) or `t3-regulated.md` (regulated).

If conditions hold at start but a threshold is later crossed, the `[33]` small-project exclusion lapses at the next release and full T1 module-catalog audit applies.

---

## 2. Fill-ins (complete at project start)

| Key | Value |
|---|---|
| Product name | `[FILL]` |
| PCL code ([5]) | `[FILL]` — register before first production deploy |
| PCL `C` tier | `internal` |
| Data classification ([25]) | `INTERNAL` (default; downgrade to `PUBLIC` requires justification) |
| Product owner | `[FILL]` |
| Security owner (`sec-lead`) | `[FILL]` or delegated org-wide default |
| On-call contact ([41]) | `[FILL]` — named person + backup |
| Architecture owner ([3]) | `[FILL]` |
| Stack declaration ([28]) | `[FILL]` — README section listing radar status |
| Repo URL | `[FILL]` |

---

## 3. Pre-GA Checklist (T1 MUSTs filtered for internal tool)

### Governance & Registry

- [ ] **[3] POL-GOV-002** — Name an architecture owner; file ADR-0001 (stack, tenant model). *Bootstrap skeleton ships in the template repo.*
- [ ] **[4] FWK-GOV-001** — Run the self-assessment at inception; schedule the pre-GA run; remediate or waive every FAIL.
- [ ] **[5] STD-GOV-001** — Register in the PCL with `C` tier = `internal` before first production deploy.
- [ ] **[6] STD-GOV-003** — Path for filing waivers confirmed; no silent deviations.
- [ ] **[7] STD-GOV-006** — If you author a MUST clause, map it to a UCM row in the same change.
- [ ] **[8] STD-ERM-001** — Canonical Risk Register used; HIGH/CRITICAL residuals have a named approver (usually org-level).
- [ ] **[44] STD-GOV-004** — Audit findings land in the ERM register.
- [ ] **[45] STD-GOV-005** — At least one business/operational metric exposed.

### People & Vendors

- [ ] **[9] POL-VEN-001** — Any vendor (even a SaaS dependency for this tool) in the vendor register with risk rating.
- [ ] **[10] POL-AUP-001** — AUP acknowledgment is an org-level control; confirm team is covered.
- [ ] **[11] POL-AI-001** — AI coding assistants used? Confirm they are on the Approved list; no customer data in prompts. (Internal tools usually have no customer data → constraint is trivial but non-waivable.)
- [ ] **[24] STD-SEC-008** — Security-awareness training done before access (org-level control).

### Privacy & Records

- [ ] **[12] POL-PRI-001** — *Skip unless you collect personal data of any kind.* If your tool touches employee data for HR/operations purposes, the org privacy notice covers it.
- [ ] **[13] POL-PRI-002** — *Skip unless you collect personal data.*
- [ ] **[14] POL-REC-001** — If this tool stores records meeting §1 criteria (financial, HR, legal), name a custodian.
- [ ] **[15] STD-LGL-001** — Legal-hold path understood (org-level).

### Security

- [ ] **[17] STD-SEC-001** — `sec-lead` for this product named (may be org-level default).
- [ ] **[18] STD-SEC-003** — Any authN uses Argon2id / bcrypt ≥12; SSO-backed preferred for internal tools; auth events logged.
- [ ] **[19] STD-SEC-004** — Deny-by-default on every endpoint; authZ check before business logic.
- [ ] **[20] STD-SEC-005** — Approved algorithms only (AES-GCM / TLS 1.2+ / SHA-256+ / Argon2id / RSA≥2048 / Ed25519). No custom crypto.
- [ ] **[21] STD-SEC-002** — Parameterized SQL; template-escaped output; input validation at trust boundaries.
- [ ] **[22] STD-SEC-006** — Dependency scan in every CI build; Critical/High triaged ≤5 BD; CISA KEV remediated in SLA.
- [ ] **[23] STD-SEC-007** — If a security incident hits, it follows STD-OPS-004 SEV; `sec-lead` + backup named; evidence preserved.

### Data

- [ ] **[25] STD-DAT-001** — Classification label on every entity (`INTERNAL`); declared retention; PII fields identified (expected: none); deletion audit; backup inheritance.
- [ ] **[26] STD-DAT-002** — User-initiated deletes are soft-deletes by default; retention before purge.
- [ ] **[27] STD-DAT-004** — *Skip.* Single-tenant internal tool.
- [ ] **[47] STD-DAT-005** — *Skip.* No PHI, no GDPR-scope personal data export expected.
- [ ] **[32] STD-ENG-003** — *Skip unless this tool emits webhooks.*

### Engineering

- [ ] **[28] STD-ENG-009** — Stack declared in README vs. the radar; no HOLD technologies for new work.
- [ ] **[49] STD-ENG-001A** — CC-PID for external identifiers; raw DB PKs never leaked; entity-code registry precedes first use.
- [ ] **[50] STD-ENG-001B** — Namespace-A / Namespace-G naming (artifacts, governance IDs).
- [ ] **[51] STD-ENG-001C** — Namespace-M module / component / file naming.
- [ ] **[31] STD-ENG-002** — Versioned endpoints; consistent machine-readable error shape; no stack traces to clients.
- [ ] **[33] STD-ENG-008** — **Small-project exclusion applies.** Self-assert in README; record in PCL row. Module-catalog audit (T1 #1 — "reuse across ≥ 2 projects") is **skipped**. You still follow T1 #2 (owner + ICD + version for any module you *choose* to register) and T1 #3 (breaking-change semver). No waiver required.
- [ ] **[34] STD-ENG-004** — Infra in code; remote state with locking; console drift reverted.
- [ ] **[35] STD-ENG-005** — Automated test suite gates merge; critical paths tested; bug fixes ship with regression tests.
- [ ] **[36] POL-ENG-001** — Production-impacting changes filed with rollback + approver; emergency changes get a retro.
- [ ] **[37] STD-ENG-006** — Git with protected default branch; deploys from versioned immutable artifacts; deploy record kept.

### Operations

- [ ] **[38] STD-OPS-003** — Structured logs (no secrets / PII); `/healthz` per service.
- [ ] **[39] STD-OPS-005** — Declared service tier (expect `Tier-2` or `Tier-3`); SLI defined; on-call only required at Tier-1-Critical (so may be N/A).
- [ ] **[40] STD-SLP-001** — Written service description; named SLO owner; internal SLA (no customer-facing SLA).
- [ ] **[41] STD-OPS-004** — SEV1–SEV4 taxonomy understood; postmortem ≤10 BD on SEV1/2. **One-page `RUNBOOK.md`** ships in the template repo.
- [ ] **[42] STD-OPS-002** — Daily automated backup per datastore; one copy on different storage/region; documented restore procedure.
- [ ] **[43] PLN-OPS-001** — BC owner named (org-level); this tool in the Critical Systems register only if warranted (usually not for internal tools).

---

## 4. Post-GA / ongoing

- Re-run the [4] FWK-GOV-001 self-assessment at **major architectural change** and annually.
- Re-check the [33] exclusion thresholds at each release; if any threshold crosses, lapse the exclusion and add the full T1 audit to the next release's scope.
- Keep the [22] dependency-scan gate green; treat a new CISA KEV entry on your dependencies as a SEV-3 at minimum.
- Confirm at each release that classification is still `INTERNAL`; if it shifts (new integration, customer data introduced), switch archetype.

---

## 5. Exclusions (intentional, no waiver)

| Standard | Clause | Reason |
|---|---|---|
| [12] POL-PRI-001 | Public privacy notice | No personal-data collection in scope |
| [27] STD-DAT-004 | Multi-tenant isolation | Single-tenant |
| [33] STD-ENG-008 | T1 #1 M-NN module-catalog audit | Small-project exclusion, self-asserted |
| [47] STD-DAT-005 | De-identification | No PHI / GDPR-scope data export |
| All T2 rows | — | Not customer-facing |
| All T3 rows | — | Not regulated |

If a condition later holds (e.g., tool starts ingesting customer data), the exclusions lapse and the team **MUST** switch archetype at the next release.

---

## 6. Escapes

If any T1 item cannot be produced, file a waiver per [6] STD-GOV-003 with compensating control + expiry. No silent skips.

---

*Template repo: `cybercube-starter-internal-tool` (follow-on per RFC-0004 §5 step 8). Until it ships, this checklist + the cited standards are the canonical start.*
