# CYBERCUBE Records Management Policy (v2.0)

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Policy | Waiver Path |
| ------------- | ---- | --------------------------------- | ----------- |
| All projects | **T1 MUST** | (1) Records that meet the "Constitutes a Record" criteria (§1) MUST have a named **records custodian** accountable for their lifecycle. (2) Destruction of records past retention MUST be authorized by the **disposition authority** (§4) before the deletion-audit event (per STD-DAT-001 T1 #4) is fired. | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Named records custodian per department, standardized repositories, automated retention/disposal where platform allows, periodic (annual) inventory. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Formal records-management training module, DLP coverage of records repositories, tiered backup/archive with immutable storage, certified media sanitization, quarterly monitoring program, external records-retention attestation. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v2.0 (2026-04-22) — RFC-0003 reshape (breaking).** This policy's T1 count reduced from 4 → 2 by **delegating** three previously-listed rules to the standards that actually own them:
>
> - *Classification per STD-DAT-001* — delegated to [25] STD-DAT-001 T1 #1 (already in force there; was duplicated here).
> - *Retention per canonical schedule* — delegated to [25] STD-DAT-001 T1 #2 (already in force there; was duplicated here).
> - *No deletion under legal hold* — delegated to [15] STD-LGL-001 T1 (legal-hold mechanics are owned end-to-end by the Legal-Hold Standard; was duplicated here).
>
> The previous T1 #4 "Destruction MUST be logged (who, what, when, method)" is **not removed** — it has been merged into [25] STD-DAT-001 T1 #4 (v1.2), which now explicitly names the destruction method and positions `deletion_log` as the canonical destruction record for both data entities and records-management dispositions.
>
> The two new T1 rules (custodian + disposition authority) are the rules **uniquely owned** by records governance and not covered elsewhere. No normative weakening occurs; every obligation the previous v1.1 T1 enumerated remains in force via the pointed-to standard.

---

## 1. What Constitutes a Record

### 1.1 Record Definition

A **record** is information that is (a) created or received in the course of business **and** (b) has value requiring retention for one or more reasons:

- Legal requirement
- Regulatory requirement
- Business operational need
- Financial / audit requirement
- Historical / reference value
- Evidence of decisions or transactions

A record can be in **any format**: paper documents, electronic files, emails, database entries, chat/messaging content, audio/video recordings, system logs, any other medium.

### 1.2 Record Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Corporate Records** | Governance, legal standing | Bylaws, board minutes, contracts, policies |
| **Financial Records** | Transactions, accounting, audit | Invoices, statements, tax filings, budgets |
| **Customer Records** | Customer relationships, transactions | Contracts, communications, support tickets |
| **Employee Records** | Employment relationship | Offer letters, reviews, payroll, benefits |
| **Operational Records** | Business operations | Procedures, reports, correspondence |
| **Technical Records** | Systems, architecture | Designs, configurations, documentation |
| **Legal Records** | Legal matters | Litigation files, legal opinions, IP filings |
| **Compliance Records** | Regulatory compliance | Audit reports, certifications, filings |

### 1.3 Record vs. Non-Record

| Records (managed per this policy) | Non-records (not subject) |
|-----------------------------------|---------------------------|
| Final, approved documents | Drafts superseded by final |
| Contracts and agreements | Personal notes |
| Official correspondence | Convenience copies |
| Financial transactions | Reference materials (external) |
| Board/committee minutes | Spam and junk mail |
| Policies and procedures | Duplicates of official record |
| Customer communications | Personal papers |
| Audit evidence | Transitory messages |
| Regulatory filings | Superseded drafts |
| Employment decisions | Working calculations |

**When in doubt → treat as record until clarified.**

### 1.4 Record Determination Test

Ask, in order:

1. Was it created or received in the course of business? (No → not a record.)
2. Does it have any of these values: legal / regulatory / evidence-of-transaction / evidence-of-decision / ongoing-business / historical / audit? (Any yes → likely a record.)
3. Is it unique or the official version? (Yes → record. No → convenience copy, not a record.)
4. Is it a completed, final version? (Yes → record. No → working document, not yet a record.)

When uncertain, consult the Records Manager or Legal.

> **Note.** Classification labels (`PUBLIC` / `INTERNAL` / `CONFIDENTIAL` / `RESTRICTED`) and retention periods are **not** defined here. See [25] STD-DAT-001 for both. This policy governs **what qualifies as a record and who is accountable for it**, not how it is classified or for how long it is retained.

---

## 2. Retention Authority

[25] STD-DAT-001 is the canonical retention schedule for all data — including data that qualifies as a record under §1. This policy does not restate retention periods; it defines **who is authorized to act on** the schedule.

### 2.1 Governance Structure

| Role | Scope |
|------|-------|
| **Records Management Sponsor** (`coo`) | Executive accountability; resource allocation; policy approval; escalation. |
| **Records Manager** (`legal-lead` delegate) | Program management; retention-schedule maintenance coordinated with [25] data-owner; policy maintenance; training; compliance monitoring; destruction authorization (see §4 Disposition Authority). |
| **Legal Counsel** (`legal-lead`) | Legal / regulatory retention interpretation; legal-hold issuance (see [15] STD-LGL-001); litigation support. |
| **Records Custodians** (department leads) | **T1 accountable role.** Department-level implementation; identify records in their area; ensure correct storage; apply retention schedule; report issues to Records Manager. |
| **All Employees** | Create and manage records properly; store in correct locations; apply classification per [25]; follow retention; report concerns. |

### 2.2 Retention Schedule Authority

| Activity | Authority | Approval |
|----------|-----------|----------|
| Create retention schedule (the schedule is authored in [25]; records-context input flows from this policy) | `data-owner` + Records Manager | Legal + COO |
| Modify retention periods | `data-owner` + Records Manager | Legal + affected departments |
| Add new record types | Records Manager | Legal |
| Exception requests | Records Manager | Legal + COO |
| Legal hold | Legal Counsel (authority inherent; mechanics in [15]) | — |
| Destruction authorization (records-management dispositions) | Records Manager (disposition authority, §4) | Per schedule (no individual approval unless exception) |
| Early destruction | Requires Legal approval; permitted for DSAR erasure (GDPR Art. 17) or accidental data collection | Legal counsel |
| Extended retention | Records Manager | Department + justification |

### 2.3 Retention Holds

| Hold Type | Authority | Duration |
|-----------|-----------|----------|
| **Legal hold** | Legal Counsel | Until released by Legal (see [15] STD-LGL-001 for mechanics) |
| **Regulatory hold** | Compliance | Until regulatory matter closed |
| **Audit hold** | Finance/Compliance | Until audit completed |
| **Investigation hold** | HR/Legal | Until investigation closed |

Hold semantics (override retention; apply to all formats/copies; release only by issuing authority) are enforced through [15] STD-LGL-001. This policy recognizes the categories; it does not define the enforcement mechanism.

---

## 3. Roles & Responsibilities

### 3.1 RACI Matrix (records-governance scope)

| Activity | Records Mgr | Legal | Custodian | Employee |
|----------|-------------|-------|-----------|----------|
| Define retention requirements (input to [25]) | A | R | C | I |
| Maintain retention schedule ([25] owner carries the pen) | R/A | C | I | I |
| Identify records & ensure proper storage | C | I | A | R |
| Apply retention | A | C | R | R |
| Issue legal holds | I | R/A | I | I |
| Authorize destruction (disposition authority, §4) | A | C | R | I |
| Training | R/A | C | R | R |
| Compliance monitoring | R/A | C | R | I |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed.

### 3.2 Records Custodian Responsibilities ([T1 #1] accountable role)

| Responsibility | Description |
|----------------|-------------|
| Identify records | Know what records exist in the department. |
| Ensure proper storage | Records in designated repositories per [25] classification. |
| Apply retention | Follow retention schedule (authored in [25]). |
| Manage access | Apply permissions appropriate to classification. |
| Respond to requests | Provide records when requested (including DSAR flow per [13] POL-PRI-002). |
| Report issues | Escalate concerns to the Records Manager. |
| Train team | Ensure team follows this policy and [25]. |

### 3.3 Employee Responsibilities

| Responsibility | Description |
|----------------|-------------|
| Create properly | Use official systems; apply classification per [25]. |
| Store correctly | Put records in designated locations. |
| Protect records | Follow security requirements (classification-driven). |
| Don't destroy early | Follow retention schedule. |
| Preserve on hold | Comply with legal holds (per [15]). |
| Ask questions | When unsure, consult the Records Manager. |

---

## 4. Disposition Authority

Destruction of records past retention is authorized by the **disposition authority**. This section defines that authority and the pre-destruction checklist; it does **not** define the destruction log schema — that is owned by [25] STD-DAT-001 T1 #4 (`deletion_log` is the canonical record).

### 4.1 Disposition Authority (T1 #2)

| Scope | Authority | Notes |
|-------|-----------|-------|
| **Routine destruction per schedule** | Records Manager | No per-event approval needed; authorization is implicit in the published schedule. |
| **Early destruction** | Records Manager + Legal | Requires Legal approval; permitted for DSAR erasure (GDPR Art. 17) or accidental data collection. |
| **Extended retention** | Records Manager + department | Requires justification; updated in [25] schedule if recurring. |
| **Destruction during hold** | **Prohibited.** | Any hold (§2.3) blocks destruction until released. Verified through [15] STD-LGL-001. |

**T1 #2 obligation:** destruction past retention MUST be authorized by this disposition authority *before* the `deletion_log` event is fired (per [25] T1 #4). The authorization is recorded in `deletion_log` through the `retention_policy` and `legal_hold_checked` fields (see [25] §destruction schema).

### 4.2 Pre-Destruction Checklist

Before destruction is authorized:

- Retention period has expired (per [25] schedule).
- No active legal hold (verified against [15] hold register).
- No pending litigation or investigation.
- No regulatory or audit hold.
- No ongoing business need.
- Destruction authorized per schedule (or by exception with Legal approval).

### 4.3 Destruction Methods

Methods and verification are owned by [25] STD-DAT-001 (`deletion_log.deletion_method` field enumerates: `soft-delete` / `hard-delete` / `secure-delete` / `cryptographic-erasure`). Paper records use cross-cut shredding (minimum) or certified destruction vendor; the destruction vendor's certificate is attached to the `deletion_log` row via `certificate_id`.

---

## 5. Special Record Types

### 5.1 Email as Records

**Email is a record if it:** documents a business decision, contains approval or authorization, documents a transaction, contains contractual content, is required for regulatory compliance, documents project milestones, or has ongoing business/legal/historical value.

**Email is not a record if it:** is purely scheduling / logistics, is a personal message, is spam or junk, is a simple acknowledgment, is FYI with no substantive content, or is superseded by later communication.

**Management approach:** business-critical email retained per content-type schedule; general correspondence retained 3 years (default; overridden by [25] schedule if category applies); transitory deleted when no longer needed; subject to legal hold, preserved regardless.

### 5.2 Chat and Messaging

| Platform | Record Status | Management |
|----------|---------------|------------|
| Slack (business) | May be record | Retain business-substantive; archive. |
| Teams messages | May be record | Retain per content. |
| SMS (business) | May be record | Capture if business content. |
| Video recordings | May be record | Retain if business value. |

**Key rule:** substance determines record status, not format.

### 5.3 Database Records

| Consideration | Approach |
|---------------|----------|
| Transaction data | Retain per data-type schedule ([25]). |
| Audit trails | Retain per audit requirements. |
| Configuration | Retain while system active + 3 years. |
| Backups | Per backup retention ([25] + [42] STD-OPS-002). |

### 5.4 Vital Records

**Definition:** records essential for business continuity or legal obligations.

**Examples:** corporate charter and bylaws; key contracts; insurance policies; intellectual-property filings; financial records; backup and recovery documentation.

**Protection requirements:** multiple copies in different locations; disaster-recovery accessible; regular verification; enhanced backup frequency (coordinate with [42] STD-OPS-002 + [43] PLN-OPS-001 vital-systems register).

---

## 6. Compliance & Monitoring

### 6.1 Compliance Requirements

| Requirement | Evidence |
|-------------|----------|
| Policy exists | This policy document. |
| Custodian named (T1 #1) | Named in department charter / PCL row. |
| Disposition authority documented (T1 #2) | §4 of this policy + audit trail in `deletion_log`. |
| Training | Training records (T3 formal program; T1/T2 ad-hoc OK). |
| Destruction certificates | `deletion_log` (in [25]). |
| Hold compliance | Hold tracking (in [15]). |
| Regular review | Review documentation. |

### 6.2 Monitoring Activities

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Retention compliance spot-check | Quarterly (T2 SHOULD) | Records Manager |
| Hold compliance verification | Per hold | Legal |
| Storage location audit | Annual (T2 SHOULD) | Records Manager |
| Destruction log review | Quarterly (T2 SHOULD) | Records Manager |
| Policy compliance assessment | Annual | Records Manager + Audit |

### 6.3 Non-Compliance

| Violation | Response |
|-----------|----------|
| Early destruction without authorization | Investigation; potential discipline. |
| Failure to preserve under hold | Serious; escalate to Legal (per [15]). |
| Improper storage | Training; correction. |
| Classification failure | Training; correction (owned by [25]). |
| Repeated violations | Escalation; discipline. |

---

## Quick Reference Card

```
Is It a Record?
  Created in business? + Has lasting value? →
    YES → RECORD  (apply retention from STD-DAT-001)
    NO  → delete when no longer needed

Records vs Working Documents
  OFFICIAL RECORD:  final, approved, in official repo, follow retention
  WORKING DOCUMENT: draft, in progress, can delete when final exists

Never Destroy If
  □ Retention period not expired (see STD-DAT-001 schedule)
  □ Legal hold in place (see STD-LGL-001)
  □ Litigation pending / investigation ongoing / audit in progress

Questions
  Records Manager: records@cybercube.software
  Legal: legal@cybercube.software
```

---

## Implementation Status

**Last Updated:** 2026-04-22  
**Policy Version:** v2.0

### Core Implementation

| Component | Status | Tier | Notes |
|-----------|--------|------|-------|
| Policy document | IN PLACE | T1 | This policy (v2.0 reshape) |
| Records custodian accountability (T1 #1) | PARTIAL | T1 | Role defined; per-department assignment tracks PCL row ([5] STD-GOV-001) |
| Disposition authority (T1 #2) | IN PLACE | T1 | Records Manager + Legal per §4 |
| Retention schedule (canonical, in [25]) | IN PLACE | T1 | STD-DAT-001 v1.2 |
| Legal-hold preservation (in [15]) | IN PLACE | T1 | Enforced via STD-LGL-001 |
| Destruction log (`deletion_log`, in [25]) | IN PLACE | T1 | STD-DAT-001 v1.2 schema; `deletion_method` explicit |
| Storage locations inventory | PARTIAL | T2 | Standardize repositories — in progress |
| Monitoring program | ROADMAP | T2 | Annual inventory cadence |
| Training module | ROADMAP | T3 | Bundle into STD-SEC-008 expansion |
| Certified media sanitization | ROADMAP | T3 | Required for T3 projects |
| Immutable archive / DLP coverage | ROADMAP | T3 | Required for T3 projects |

Status vocabulary: `IN PLACE` | `COMPLETE` | `PARTIAL` | `ROADMAP` | `N/A`.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release. |
| v1.1 | 2026-04-22 | Unfreeze (Path B/C): added Applicability Tier Table; T1 reduced to classification + retention schedule + legal hold + destruction log. Custodians, monitoring, training, media sanitization, DLP, immutable archive reclassified as T2/T3 ROADMAP. Status vocabulary normalized. |
| v2.0 | 2026-04-22 | **RFC-0003 structural reshape (breaking).** Policy shrunk 941 → ~330 lines. Cut: §2 "Document Classifications" (duplicated [25]), §4 "Records Lifecycle" mechanics (duplicated [25]), §3.3 retention schedule (duplicated [25] canonical), glossary duplications. T1 count 4 → 2: (old) classify-per-[25], retention-per-[25], legal-hold-blocks-deletion, destruction-logged → delegated to [25] / [25] / [15] / merged into [25] T1 #4. (new) named custodian + disposition authority — the rules uniquely owned by records governance. No normative weakening: every obligation remains in force via the pointed-to standard. |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [25] STD-DAT-001 Data Classification & Retention Standard | **Canonical** for classification, retention schedule, deletion-log schema. |
| [15] STD-LGL-001 Legal Hold & eDiscovery Standard | **Canonical** for legal-hold mechanics. |
| [17] STD-SEC-001 Security Policy | Information protection. |
| [13] POL-PRI-002 Privacy Handling Policy | Personal-data records. |
| [43] PLN-OPS-001 Business Continuity Plan | Vital records. |
| [9] POL-VEN-001 Vendor Risk Management Policy | Records held by third parties (DPA-governed). |
