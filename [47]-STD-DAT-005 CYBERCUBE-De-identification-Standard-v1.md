# CYBERCUBE De-identification Standard (v1.0)

**Standard ID:** STD-DAT-005  
**Catalog Number:** 3.6 (Data & Privacy / De-identification)  
**Version:** 1.0  
**Status:** Active  
**Effective:** 2026-04-22  
**Classification:** INTERNAL  
**Owner:** Privacy Lead + Data Owner  
**Compliance Level:** Mandatory (T1); Recommended (T2); Advisory (T3)  
**Applies to:** Every CYBERCUBE product or internal system that exports, discloses, shares, or otherwise permits secondary use of personal data — particularly Protected Health Information (PHI) under HIPAA and personal data under GDPR — outside the data-subject-consented primary purpose.

---

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects handling PHI or GDPR-scope personal data exported for secondary use | **T1 MUST** | (1) Every de-identified data release MUST declare the de-identification **method** used — Safe-Harbor (HIPAA §164.514(b)(2)), Expert-Determination (HIPAA §164.514(b)(1)), or GDPR pseudonymization (Art. 4(5)). (2) Every release MUST record a residual re-identification **risk class** — `low`, `medium`, or `high` — justified with a one-paragraph rationale. (3) Every release MUST be logged per §8 with operator, date, sample-size, method, approver, and destination. (4) Safe-Harbor releases MUST remove or generalize all 18 identifier categories enumerated at 45 CFR §164.514(b)(2)(i) AND carry actual-knowledge attestation per §164.514(b)(2)(ii). | None (non-waivable) |
| SaaS / customer-facing (T2 SHOULD) | **T2 SHOULD** | Documented de-identification procedure per data-flow (not per ad-hoc release); method-selection rationale recorded (Safe-Harbor vs Expert-Determination vs pseudonymization); periodic review of residual risk (≥ annually for `medium`, semi-annually for `high`); de-identified output held to same classification as the source until risk class is validated `low`. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk (T3 MAY) | **T3 MAY** | Formal Expert-Determination review by a qualified statistician/data-scientist per HIPAA §164.514(b)(1); statistical disclosure control (SDC); differential-privacy implementation where applicable; external audit of de-identified releases; automated de-identification pipeline with lineage tracking; k-anonymity / l-diversity / t-closeness thresholds declared and enforced. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.0 (2026-04-22) — Initial publication per RFC-0005 §3.4.** Shipping with 3 T1 MUST rules that apply whenever PHI or GDPR-scope personal data is exported for secondary use; the fourth T1 rule specifically targets Safe-Harbor releases. This standard is **load-bearing** for the HIPAA scope: [46] TPL-LGL-002 §2.4 references this standard as the only permitted path to move PHI out of BAA scope via de-identification.

**Related Standards:**

- [25] STD-DAT-001 — Data Classification & Retention (classification follows the data; de-identified releases drop classification only when method + risk class support it).
- [13] POL-PRI-002 — Lawful-basis register (de-identification can be the legal basis shift that enables secondary use).
- [7] STD-GOV-006 — UCM (new row `CTL-DAT-022` de-id method declaration).
- [38] STD-OPS-003 — Observability (§8 logging pipeline hosts the release log).
- [46] TPL-LGL-002 — BAA Template (§2.4 references this standard).
- [12] POL-PRI-001 — Public Privacy Policy (commitments on de-identified research use surface here).

---

## 1. Purpose and Scope

### 1.1 Why this standard exists

De-identified data is a powerful enabler of research, analytics, product improvement, and data sharing — but "de-identified" is a term of art with regulatory definitions. A checklist approach (remove the obvious fields; call it done) produces releases that look safe and are not. HIPAA and GDPR both recognize this and prescribe specific methods; compliance requires *using a named method*, not intuition.

This standard gives CYBERCUBE teams three named methods, a residual-risk framework, and a logging contract. Outputs become defensible at audit time.

### 1.2 Scope

This standard applies when any of the following is true:

- PHI (per HIPAA definition at 45 CFR §160.103) is exported, shared, or used outside the primary treatment / payment / operations purpose.
- GDPR-scope personal data is used for a secondary purpose not covered by the original lawful basis, and pseudonymization is being invoked (GDPR Art. 6(4), Recital 26).
- A research, analytics, or product-feature use-case is proposed against source data that is PHI or personal data.

Out of scope:

- Data that was never personal data to begin with (e.g., pure telemetry without identifiers).
- Access-control and viewing of personal data in its primary, identified form (that is [25] STD-DAT-001's domain).
- Records retention and destruction (that is [25] + [14] POL-REC-001).

### 1.3 Relationship to anonymization

This standard uses **de-identification** as the umbrella term. Within it:

- **Anonymization** (GDPR Recital 26 sense) — de-identification where re-identification is not reasonably likely by any means reasonably likely to be used; the output is no longer personal data. High bar.
- **Pseudonymization** (GDPR Art. 4(5)) — replacement of identifiers with pseudonyms; re-identification is possible via a key held separately. The output is still personal data under GDPR, but the security posture is strengthened. Not the same as anonymization.
- **Safe-Harbor de-identification** (HIPAA §164.514(b)(2)) — specific checklist; produces non-PHI for HIPAA purposes; does not automatically satisfy GDPR anonymization.
- **Expert-Determination** (HIPAA §164.514(b)(1)) — statistical method producing non-PHI.

The legal status of a "de-identified" output depends on which law is invoked and which method was used. This standard requires teams to declare method + jurisdiction explicitly.

---

## 2. The Three Methods

### 2.1 Safe-Harbor Path — HIPAA §164.514(b)(2)

Remove or generalize the following 18 identifier categories from the data about the individual AND the individual's relatives, employers, or household members:

1. Names
2. Geographic subdivisions smaller than a State (street, city, county, ZIP > 3 digits for most ZIPs)
3. All elements of dates (birth, admission, discharge, death) except year, and ages > 89 (aggregate as 90+)
4. Telephone numbers
5. Fax numbers
6. Email addresses
7. Social security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate / license numbers
12. Vehicle identifiers + license plate numbers
13. Device identifiers + serial numbers
14. URLs
15. IP addresses
16. Biometric identifiers (finger/voice prints)
17. Full-face photos + comparable images
18. Any other unique identifying number, characteristic, or code

PLUS the "**actual knowledge**" test — the covered entity must not have actual knowledge that the remaining information could be used alone or in combination to identify an individual (45 CFR §164.514(b)(2)(ii)).

**CYBERCUBE Safe-Harbor procedure:**

1. Run data through the identifier-redaction pipeline (see §4 Verification Checklist for the minimum checks).
2. The data owner attests in the release log that the actual-knowledge test has been applied.
3. Output is tagged `de-identified: safe-harbor`.

**Limitations:** Safe-Harbor is conservative about direct identifiers but silent on quasi-identifier combinations. The actual-knowledge step is where re-identification-attack awareness matters; §5 lists the attack classes teams must consider.

### 2.2 Expert-Determination Path — HIPAA §164.514(b)(1)

A qualified expert applies generally-accepted statistical/scientific principles to determine that the risk of re-identification is "very small" and documents the method and results. Documentation is retained for re-use of the same technique on comparable data.

**Qualified expert definition** (HHS guidance 2012):

- Appropriate training or professional experience in statistical/scientific methods for rendering information non-identifying; AND
- Current knowledge of generally accepted methods.

A degree is not required, but demonstrable relevant experience is. Internal CYBERCUBE staff may qualify if they meet the standard; external engagement is common for T3 engagements.

**CYBERCUBE Expert-Determination procedure:**

1. Scope engagement with the CE (if BAA applies) and `privacy-lead`.
2. Expert applies recognized SDC / k-anonymity / differential-privacy technique appropriate to the dataset.
3. Expert produces a written determination (method, parameters, residual-risk estimate, assumptions) — this document is retained with the release log.
4. Output is tagged `de-identified: expert-determination`.

### 2.3 GDPR Pseudonymization — Art. 4(5), Recital 26

Replacement of identifiers with pseudonyms, with the re-identification key held separately and protected. The output is **still personal data** under GDPR — it is not anonymization — but the reduced risk may change the lawful-basis analysis for secondary use.

**CYBERCUBE Pseudonymization procedure:**

1. Generate a cryptographic pseudonym (e.g., HMAC with per-dataset key, or random UUID + mapping table).
2. Store the re-identification key in a Key Management Service (KMS) per [21] STD-SEC-005 with access restricted to named roles.
3. Treat the pseudonymized output as personal data for classification / retention / DSAR purposes ([25] STD-DAT-001).
4. Output is tagged `de-identified: pseudonymized`.

For release where re-identification is not desired at all under GDPR: aim for anonymization (which is closer to Expert-Determination in mindset) and declare it separately.

---

## 3. Residual Re-identification Risk Class

Every release carries one of three risk classes. The class drives review cadence (T2) and auditor-attention level.

| Class | Definition | Typical scenarios | Review cadence |
|-------|------------|-------------------|----------------|
| **Low** | Re-identification would require non-public auxiliary data AND specialized attack infrastructure. Plausible threat model is limited to motivated adversaries with significant resources. | Safe-Harbor output on large population-level datasets; Expert-Determination output with documented k-anonymity ≥ 10. | Annual revalidation |
| **Medium** | Re-identification is possible with moderately available auxiliary data (e.g., voter rolls, public directories, social media). Smaller or more skewed populations increase risk. | Safe-Harbor output on small or skewed datasets; Pseudonymization where key access risk is non-zero. | Semi-annual revalidation |
| **High** | Re-identification is plausible with commonly available data. Small populations, rare conditions, rich quasi-identifier sets, or linkable output. Release is avoided unless mandated and justified. | Rare-disease cohort releases; small-facility clinical datasets; any release where sample-uniqueness is common. | Quarterly revalidation; `privacy-lead` approval required |

**Who rates the risk class:** data owner proposes; `privacy-lead` signs off for `high`. The rating is recorded in the release log (§8).

---

## 4. Verification Checklist

Before a de-identified release exits CYBERCUBE control, the releaser verifies:

- [ ] Method declared (Safe-Harbor / Expert-Determination / Pseudonymization) and recorded.
- [ ] Jurisdiction declared (US-HIPAA / EU-GDPR / both / other).
- [ ] For Safe-Harbor: all 18 identifier categories addressed; actual-knowledge attestation recorded.
- [ ] For Expert-Determination: written determination document on file.
- [ ] For Pseudonymization: key held in KMS with documented access roles; key residency compatible with data residency.
- [ ] Residual risk class rated (`low` / `medium` / `high`) with justification.
- [ ] Sample size recorded. Sub-population sizes for any stratification recorded (small sub-groups are the #1 re-identification vector).
- [ ] Quasi-identifier combinations reviewed (see §5 attack classes).
- [ ] Destination recorded — who is receiving; are they a trusted recipient (BAA in place?); will they re-share?
- [ ] Release logged per §8.
- [ ] For `high` class: `privacy-lead` approver signature obtained.

---

## 5. Re-identification Attack Classes to Consider

The actual-knowledge step (Safe-Harbor §2.1) and residual-risk rating (§3) must consider at minimum:

- **Linkage attack** — join with publicly available data (voter rolls, social media) to re-identify via quasi-identifier combinations.
- **Singling-out attack** — an individual is unique in the released data on some combination of attributes (even without external linkage).
- **Inference attack** — a sensitive attribute can be inferred from released non-sensitive attributes with high confidence.
- **Membership inference** — determining that a specific individual was in the dataset (relevant for rare-disease data where membership itself is sensitive).
- **Temporal correlation** — dates-of-service or event sequences that produce a unique signature per individual.
- **Small-cell / small-sub-population** — cells < 5 in stratified releases; the known weakness of K-anonymity boundary conditions.
- **Demographic outliers** — 90+ ages, rare ethnicities in the dataset location, rare occupations (Safe-Harbor addresses 90+ ages specifically).
- **Geographic outliers** — small ZIPs (< 20,000 population) are required to be removed to 3-digit under Safe-Harbor.

No mitigation checklist can be exhaustive; the purpose of the actual-knowledge attestation is to force a deliberate review against the threat model.

---

## 6. Differential Privacy (T3 optional)

Differential privacy (DP) provides a formal mathematical bound on re-identification risk by injecting calibrated noise. T3 products may adopt DP when:

- The dataset is released as aggregate statistics or queryable output.
- Privacy budget (`ε`) is declared per release and tracked.
- A DP-aware release pipeline enforces the budget across queries.

DP is not required; when used, the privacy budget parameters are logged alongside the release per §8.

---

## 7. Lineage and Derived Data

De-identified data can re-combine to produce re-identifiable output. This standard requires:

- **Source lineage tracking** — every de-identified release carries a lineage pointer to its source dataset (primary system + snapshot / query at a given timestamp).
- **Combinability review** — before joining multiple de-identified releases, a fresh risk review is performed (the combined dataset's risk class MAY be higher than its parts).
- **Further de-identification** — de-identifying already-de-identified output does not "reset" risk; the analysis is done against the original source.

---

## 8. Release Logging (Contract with [38] STD-OPS-003)

Every de-identified release produces a log event with at minimum:

| Field | Description |
|-------|-------------|
| `release_id` | ULID / UUID of the release. |
| `source_dataset` | Lineage pointer to the source system + snapshot. |
| `method` | `safe-harbor` \| `expert-determination` \| `pseudonymization` \| `differential-privacy`. |
| `jurisdiction` | `us-hipaa` \| `eu-gdpr` \| `both` \| other. |
| `sample_size` | Number of records released. |
| `risk_class` | `low` \| `medium` \| `high`. |
| `risk_rationale` | One-paragraph justification. |
| `operator` | Who performed the release. |
| `approver` | Who approved (required for `high`). |
| `destination` | Recipient identity + scope (BAA, DUA, or internal-only). |
| `timestamp` | UTC ISO-8601. |
| `expert_determination_doc` | Pointer to written determination (Expert-Determination method only). |
| `dp_epsilon` | Privacy budget used (Differential-Privacy method only). |

Log events are written to the audit-log pipeline per [38] STD-OPS-003 with retention per [25] STD-DAT-001 T3 immutable-audit-trail rule (minimum 7 years for HIPAA-scope releases).

---

## 9. Roles and Responsibilities

| Role | Responsibility |
|------|----------------|
| Data owner | Proposes release scope, method, risk class; performs Safe-Harbor checks; runs verification checklist. |
| Privacy Lead | Approves `high` risk-class releases; reviews method-selection rationale for the data-flow; advises on jurisdiction questions. |
| Qualified Expert | For Expert-Determination path — produces written determination per §2.2. |
| Engineering Lead | Owns the de-identification pipeline tooling; ensures integration with the release log. |
| Legal Lead | Reviews destination contracts (DUAs, research agreements) that govern re-use; advises on international transfer. |

---

## 10. Examples (Non-Normative)

### 10.1 Analytics cohort export (Safe-Harbor, low risk)

A product analytics team wants to release a 500,000-record user-behavior dataset to a vendor partner for benchmarking. The source contains user-ids, email, IP, timestamps, events.

- **Method:** Safe-Harbor.
- **Operations:** Remove email, IP, user-id; replace timestamps with year+month bucketing; remove any geography < 3-digit ZIP equivalent.
- **Risk class:** Low (large population; no rare conditions; no quasi-identifier survive).
- **Destination:** Vendor under DUA with `privacy-lead`-reviewed terms.

### 10.2 Clinical-outcome cohort (Expert-Determination, medium risk)

A T3 health product wants to release a 2,000-record outcomes dataset for academic research.

- **Method:** Expert-Determination via engaged biostatistician.
- **Determination:** k-anonymity ≥ 5 on the quasi-identifier combination (age-decade, 3-digit ZIP, sex, primary diagnosis); suppression applied to sub-5 cells.
- **Risk class:** Medium (smaller population; some rare-condition rows suppressed).
- **Destination:** University research partner under DUA referencing [46] TPL-LGL-002 subcontractor terms.

### 10.3 Rare-disease registry extract (Expert-Determination, high risk)

Research request for a 50-person rare-disease registry excerpt.

- **Decision:** `privacy-lead` evaluates the request. In most cases, the release is refused or limited to aggregate statistics (DP-noised); a single-patient-level release is re-scoped.
- If released with Expert-Determination: risk class `high`; quarterly review; `privacy-lead` signs off.

---

## Implementation Status

| Component | Status | Tier | Notes |
|-----------|--------|------|-------|
| STD-DAT-005 document itself | IN PLACE | — | v1.0 initial publication. |
| Release-logging schema fields | ROADMAP | T1 | §8 contract; integration with STD-OPS-003 pipeline pending. |
| Safe-Harbor automated pipeline | ROADMAP | T2 | Scripted identifier redaction + actual-knowledge attestation workflow. |
| Expert-Determination vendor roster | ROADMAP | T3 | `privacy-lead` maintains; qualified external experts for engagement. |
| Differential-privacy tooling | ROADMAP | T3 | Adopted per-product when aggregate releases are the interface. |
| k-anonymity enforcement tooling | ROADMAP | T3 | For stratified / cohort releases. |
| BAA §2.4 integration | IN PLACE | — | [46] TPL-LGL-002 §2.4 references this standard. |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-22 | Privacy Lead + Data Owner + Standards Council | Initial publication per RFC-0005 §3.4. T1/T2/T3 tier table defined; Safe-Harbor / Expert-Determination / Pseudonymization methods documented; residual-risk taxonomy established; release-log contract with [38] STD-OPS-003 established; integration with [46] TPL-LGL-002 §2.4 established. |

---

*End of CYBERCUBE De-identification Standard.*
