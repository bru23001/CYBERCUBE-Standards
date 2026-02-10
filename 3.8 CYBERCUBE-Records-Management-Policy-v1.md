# CYBERCUBE Records Management Policy (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Records
Management Policy.

All definitions are normative unless stated otherwise.

### A

**Active Record**

Record currently in use for business operations.

Storage: Primary systems, readily accessible

**Archive**

Long-term storage for records past active use.

Purpose: Retention compliance, historical reference

### B

**Business Record**

Document created or received in business activities with ongoing value.

Status: Official record, subject to retention

### C

**Classification**

Categorization of records by type, sensitivity, or retention.

Alignment: Data Classification Standard

**Custody**

Responsibility for managing and protecting records.

Transfer: Documented handoff between custodians

### D

**Destruction**

Permanent elimination of records.

Requirement: Certificate, audit trail

**Document**

Any recorded information regardless of format.

Types: Records, working documents, transitory

**Draft**

Preliminary version of a document.

Status: Working document until finalized

### E

**Electronic Record**

Record created, stored, or transmitted electronically.

Formats: Email, files, databases, messages

### F

**Final Record**

Completed, approved version of a document.

Status: Official record

### H

**Hold**

Suspension of destruction due to legal/regulatory requirement.

See: Legal Hold Standard

### I

**Inactive Record**

Record no longer needed for current operations.

Storage: Archive or destruction per schedule

### L

**Legal Hold**

Mandatory preservation for litigation or investigation.

Authority: Legal counsel

**Lifecycle**

Stages a record passes through from creation to disposition.

Stages: Create, active, inactive, archive/destroy

### M

**Metadata**

Information about a record (date, author, classification).

Requirement: Preserved with record

### O

**Official Record**

Authoritative version of a business record.

Characteristic: Retained per schedule

**Original**

First or source version of a record.

Preference: Preserve originals when possible

### P

**Personal Papers**

Documents of personal nature, not business records.

Status: Not subject to this policy

**Preservation**

Protecting records from loss, damage, or unauthorized change.

Methods: Backup, access control, format migration

### R

**Record**

Information created/received in business with value requiring retention.

Test: Business, legal, regulatory, or historical value

**Records Custodian**

Person responsible for managing records in their area.

Role: Department-level responsibility

**Records Manager**

Person overseeing the records management program.

Role: Organization-wide coordination

**Retention Period**

Length of time a record must be kept.

Basis: Legal, regulatory, business requirements

**Retention Schedule**

Document specifying retention periods by record type.

Authority: Records Manager + Legal

### T

**Transitory Record**

Information of temporary usefulness with no lasting value.

Disposition: Delete when no longer needed

### V

**Version**

Iteration of a document through its development.

Control: Track versions, identify official

**Vital Record**

Record essential for business continuity or legal obligations.

Protection: Enhanced backup, disaster recovery

### W

**Working Document**

Document in development, not yet finalized.

Status: Not official record until complete

---

# CYBERCUBE Records Management Policy (v1)

**Policy ID:** POL-REC-001  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Owner:** Legal + Operations  
**Applies to:** All CYBERCUBE records and personnel

---

## 0. Purpose & Scope

This policy establishes the framework for managing CYBERCUBE's business
records throughout their lifecycle—from creation through retention to
disposition. Proper records management ensures compliance, supports
business operations, and manages risk.

**Industry Alignment:**
- ISO 15489 (Records Management)
- ISO 30300 (Management Systems for Records)
- SOC 2 Type II (Availability, Confidentiality)
- GDPR (Storage Limitation)
- Generally Accepted Recordkeeping Principles (GARP)

**This policy applies to:**
- All business records in any format
- All employees, contractors, and agents
- All systems containing business records
- Records of any CYBERCUBE entity

**Goals:**
1. Identify and protect business records
2. Ensure appropriate retention and disposition
3. Support legal and regulatory compliance
4. Enable efficient information retrieval
5. Reduce risk from improper records handling
6. Support business continuity

**Design Principles:**

1. **Systematic** — Consistent approach across organization
2. **Accountable** — Clear ownership and responsibility
3. **Compliant** — Meet legal and regulatory requirements
4. **Efficient** — Balance retention with storage costs
5. **Accessible** — Records findable when needed
6. **Protected** — Secure from unauthorized access or loss

---

## 1. What Constitutes a Record

### 1.1 Record Definition

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WHAT IS A RECORD?                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  A RECORD is information that:                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Created or received in the course of business                       │   │
│  │                     AND                                              │   │
│  │  Has value requiring retention for one or more reasons:             │   │
│  │  • Legal requirement                                                │   │
│  │  • Regulatory requirement                                           │   │
│  │  • Business operational need                                        │   │
│  │  • Financial/audit requirement                                      │   │
│  │  • Historical/reference value                                       │   │
│  │  • Evidence of decisions or transactions                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  A record can be in ANY FORMAT:                                            │
│  • Paper documents                                                         │
│  • Electronic files                                                        │
│  • Emails                                                                  │
│  • Database entries                                                        │
│  • Chat/messaging content                                                  │
│  • Audio/video recordings                                                  │
│  • System logs                                                             │
│  • Any other medium                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RECORD VS. NON-RECORD                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RECORDS (Manage per this policy)          NON-RECORDS (Not subject)       │
│  ─────────────────────────────────         ─────────────────────────       │
│  • Final, approved documents               • Drafts superseded by final    │
│  • Contracts and agreements                • Personal notes                │
│  • Official correspondence                 • Convenience copies            │
│  • Financial transactions                  • Reference materials (external)│
│  • Board/committee minutes                 • Spam and junk mail           │
│  • Policies and procedures                 • Duplicates of official record│
│  • Customer communications                 • Personal papers              │
│  • Audit evidence                          • Transitory messages          │
│  • Regulatory filings                      • Superseded drafts            │
│  • Employment decisions                    • Working calculations         │
│                                                                             │
│  When in doubt → Treat as record until clarified                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Record Determination Test

```markdown
## Is This a Record?

Ask these questions:

1. Was it created or received in the course of business?
   □ Yes → Continue
   □ No → Not a record

2. Does it have one or more of these values?
   □ Legal requirement to keep
   □ Regulatory requirement to keep
   □ Evidence of business transaction
   □ Evidence of decision or action
   □ Needed for ongoing business
   □ Historical or reference value
   □ Audit requirement
   
   If ANY checked → Likely a RECORD
   If NONE checked → Likely NOT a record

3. Is it unique or the official version?
   □ Yes, it's the original/official → RECORD
   □ No, it's a copy of an official record → NON-RECORD (convenience copy)

4. Is it a completed, final version?
   □ Yes, finalized → RECORD
   □ No, working draft → WORKING DOCUMENT (not yet a record)

When uncertain → Consult Records Manager or Legal
```

---

## 2. Document Classifications

### 2.1 Official Records vs. Working Documents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OFFICIAL RECORDS VS. WORKING DOCUMENTS                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  OFFICIAL RECORD                                                           │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: The authoritative, final version of a business record        │
│                                                                             │
│  Characteristics:                                                          │
│  • Completed and approved (where approval required)                       │
│  • Designated as the official version                                     │
│  • Stored in official repository                                          │
│  • Subject to retention schedule                                          │
│  • Protected from unauthorized modification                               │
│  • May be only one official version                                       │
│                                                                             │
│  Examples:                                                                  │
│  • Signed contracts (in contract management system)                       │
│  • Approved policies (in policy repository)                               │
│  • Board minutes (approved by board)                                      │
│  • Financial statements (audited/approved)                                │
│  • Final deliverables (accepted by customer)                              │
│                                                                             │
│  WORKING DOCUMENT                                                          │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: Documents in development, not yet finalized                  │
│                                                                             │
│  Characteristics:                                                          │
│  • In draft or review status                                              │
│  • May have multiple versions                                             │
│  • Not yet approved or finalized                                          │
│  • May be deleted once final version exists                               │
│  • Creator retains control                                                │
│  • Not subject to retention until finalized                               │
│                                                                             │
│  Examples:                                                                  │
│  • Draft proposals                                                        │
│  • Work-in-progress documents                                             │
│  • Review copies with comments                                            │
│  • Preliminary analyses                                                   │
│  • Brainstorming notes (unless needed as record)                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Transitory Information

**Definition:** Information of temporary usefulness with no lasting business value.

**Characteristics:**
- Useful only for a short period
- No legal, regulatory, or business requirement to keep
- No evidence of decisions or transactions
- Can be deleted when no longer needed

**Examples:**

| Transitory | Rationale |
|------------|-----------|
| Meeting scheduling emails | No business content |
| "Thank you" acknowledgments | No substantive information |
| Spam and junk mail | No value |
| Personal messages | Not business records |
| Superseded drafts | Final version is record |
| Routine notifications | Transient operational info |
| FYI copies | Original is record of record |

**Disposition:** Delete when no longer needed (no retention requirement).

### 2.3 Convenience Copies

**Definition:** Duplicates of official records kept for reference convenience.

**Rules:**
- Official record exists elsewhere
- Convenience copy is not the record of record
- May be deleted at any time (unless on legal hold)
- Should not be retained longer than official record
- Clearly identify as "copy" if possible

**Examples:**
- Personal copy of signed contract (official in contract system)
- Downloaded copy of policy (official in policy repo)
- Saved email attachment (official in source system)

### 2.4 Version Control

| Version Type | Status | Retention |
|--------------|--------|-----------|
| **Final/Official** | Approved, complete | Per retention schedule |
| **Minor revision drafts** | Superseded | Delete when final approved |
| **Major version (prior)** | May have historical value | Evaluate case-by-case |
| **Working drafts** | In progress | Delete when final approved |
| **Review copies** | Temporary | Delete after review complete |

---

## 3. Retention Authority

### 3.1 Governance Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RECORDS MANAGEMENT GOVERNANCE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RECORDS MANAGEMENT SPONSOR (COO)                                          │
│  ├── Executive accountability                                              │
│  ├── Resource allocation                                                   │
│  ├── Policy approval                                                       │
│  └── Escalation point                                                      │
│                                                                             │
│  RECORDS MANAGER (Operations/Legal)                                        │
│  ├── Program management                                                    │
│  ├── Retention schedule development                                        │
│  ├── Policy maintenance                                                    │
│  ├── Training and guidance                                                 │
│  ├── Compliance monitoring                                                 │
│  └── Destruction authorization                                             │
│                                                                             │
│  LEGAL COUNSEL                                                             │
│  ├── Legal retention requirements                                          │
│  ├── Legal hold issuance                                                   │
│  ├── Regulatory interpretation                                             │
│  └── Litigation support                                                    │
│                                                                             │
│  RECORDS CUSTODIANS (Department Leads)                                     │
│  ├── Department-level implementation                                       │
│  ├── Ensure team compliance                                                │
│  ├── Identify records in their area                                        │
│  ├── Apply retention schedule                                              │
│  └── Report issues to Records Manager                                      │
│                                                                             │
│  ALL EMPLOYEES                                                             │
│  ├── Create and manage records properly                                    │
│  ├── Store records in correct locations                                    │
│  ├── Apply classification                                                  │
│  ├── Follow retention requirements                                         │
│  └── Report concerns                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Retention Schedule Authority

| Activity | Authority | Approval |
|----------|-----------|----------|
| **Create retention schedule** | Records Manager | Legal + COO |
| **Modify retention periods** | Records Manager | Legal + affected departments |
| **Add new record types** | Records Manager | Legal |
| **Exception requests** | Records Manager | Legal + COO |
| **Legal hold** | Legal Counsel | N/A (authority inherent) |
| **Destruction authorization** | Records Manager | Per schedule (no individual approval) |
| **Early destruction** | Requires Legal approval; permitted for DSAR erasure (GDPR Art. 17) or accidental data collection | Legal counsel |
| **Extended retention** | Records Manager | Department + justification |

### 3.3 Retention Schedule

**Reference:** See Data Classification & Retention Standard for detailed retention periods.

**Summary by Category:**

| Record Category | Minimum Retention | Trigger |
|-----------------|-------------------|---------|
| **Corporate governance** | Permanent | N/A |
| **Contracts** | Term + 7 years | Contract end |
| **Financial records** | 7 years | Fiscal year end |
| **Tax records** | 7 years | Filing date |
| **Employee records** | Employment + 7 years | Termination |
| **Customer records** | Relationship + 7 years | Relationship end |
| **Operational records** | 3-7 years | Creation |
| **Technical documentation** | Life of system + 3 years | System retirement |
| **Audit records** | 7 years | Audit completion |
| **Compliance records** | Per regulation | Per regulation |

### 3.4 Retention Holds

| Hold Type | Authority | Duration |
|-----------|-----------|----------|
| **Legal hold** | Legal Counsel | Until released by Legal |
| **Regulatory hold** | Compliance | Until regulatory matter closed |
| **Audit hold** | Finance/Compliance | Until audit completed |
| **Investigation hold** | HR/Legal | Until investigation closed |

**Hold Rules:**
- Holds override retention schedule (no destruction)
- All affected records preserved
- Applies to all formats/copies
- Release only by issuing authority
- See Legal Hold Standard for procedures

---

## 4. Records Lifecycle

### 4.1 Lifecycle Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RECORDS LIFECYCLE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. CREATION                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Record created or received                                         │  │
│  │  • Classification assigned                                            │  │
│  │  • Metadata captured                                                  │  │
│  │  • Stored in appropriate system                                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  2. ACTIVE USE                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Record used for business purposes                                  │  │
│  │  • Readily accessible                                                 │  │
│  │  • May be updated (with version control)                             │  │
│  │  • Protected from unauthorized access                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  3. INACTIVE                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • No longer needed for current operations                           │  │
│  │  • May be moved to archive storage                                   │  │
│  │  • Still subject to retention requirements                           │  │
│  │  • Still accessible if needed                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  4. DISPOSITION                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Retention period expired?                                           │  │
│  │  • Yes + No hold → DESTROY (secure destruction)                      │  │
│  │  • Yes + Hold → RETAIN until hold lifted                            │  │
│  │  • Permanent retention → ARCHIVE permanently                         │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Creation Requirements

| Requirement | Description |
|-------------|-------------|
| **Official repository** | Store records in designated systems |
| **Classification** | Apply data classification |
| **Naming convention** | Follow naming standards |
| **Metadata** | Capture required metadata |
| **Version control** | Track versions where applicable |
| **Access control** | Apply appropriate permissions |

### 4.3 Storage Requirements

| Record Type | Storage Location | Access |
|-------------|------------------|--------|
| **Contracts** | Contract management system | Legal, relevant parties |
| **Policies** | Policy repository | All employees |
| **Financial** | Accounting system, secure drive | Finance, authorized |
| **Customer** | CRM, customer systems | Customer-facing teams |
| **Employee** | HRIS, secure HR drive | HR, management |
| **Technical** | Documentation system, wiki | Relevant teams |
| **Email records** | Email archive | Original parties |

### 4.4 Destruction Requirements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RECORDS DESTRUCTION PROCESS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRE-DESTRUCTION CHECKLIST                                                 │
│  ──────────────────────────────────────────────────────────────────────    │
│  □ Retention period has expired                                            │
│  □ No active legal hold                                                    │
│  □ No pending litigation or investigation                                  │
│  □ No regulatory hold                                                      │
│  □ No audit hold                                                           │
│  □ No ongoing business need                                                │
│  □ Destruction authorized per schedule                                     │
│                                                                             │
│  DESTRUCTION METHODS                                                       │
│  ──────────────────────────────────────────────────────────────────────    │
│  Paper:                                                                    │
│  • Cross-cut shredding (minimum)                                          │
│  • Certified destruction vendor                                           │
│                                                                             │
│  Electronic:                                                               │
│  • Secure deletion (overwrite or cryptographic erase)                     │
│  • Physical destruction for decommissioned media                          │
│                                                                             │
│  DOCUMENTATION                                                             │
│  ──────────────────────────────────────────────────────────────────────    │
│  • Certificate of destruction                                              │
│  • Date of destruction                                                     │
│  • Record types destroyed                                                  │
│  • Destruction method                                                      │
│  • Authorizing party                                                       │
│  • Retain destruction records for 7 years minimum,                         │
│  •   or matching original record retention if longer (e.g. permanent)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Roles & Responsibilities

### 5.1 RACI Matrix

| Activity | Records Mgr | Legal | Custodian | Employee |
|----------|-------------|-------|-----------|----------|
| Define retention requirements | A | R | C | I |
| Maintain retention schedule | R/A | C | I | I |
| Classify records | C | C | A | R |
| Store records properly | C | I | A | R |
| Apply retention | A | C | R | R |
| Issue legal holds | I | R/A | I | I |
| Authorize destruction | A | C | R | I |
| Training | R/A | C | R | R |
| Compliance monitoring | R/A | C | R | I |

**Legend:** R=Responsible, A=Accountable, C=Consulted, I=Informed

### 5.2 Records Custodian Responsibilities

| Responsibility | Description |
|----------------|-------------|
| **Identify records** | Know what records exist in department |
| **Ensure proper storage** | Records in correct repositories |
| **Apply retention** | Follow retention schedule |
| **Manage access** | Appropriate permissions |
| **Respond to requests** | Provide records when requested |
| **Report issues** | Escalate concerns to Records Manager |
| **Train team** | Ensure team follows policy |

### 5.3 Employee Responsibilities

| Responsibility | Description |
|----------------|-------------|
| **Create properly** | Use official systems, apply classification |
| **Store correctly** | Put records in designated locations |
| **Protect records** | Follow security requirements |
| **Don't destroy early** | Follow retention schedule |
| **Preserve on hold** | Comply with legal holds |
| **Ask questions** | When unsure, consult Records Manager |

---

## 6. Special Record Types

### 6.1 Email as Records

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EMAIL RECORDS MANAGEMENT                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EMAIL IS A RECORD IF IT:                                                  │
│  ├── Documents a business decision                                         │
│  ├── Contains approval or authorization                                    │
│  ├── Documents a transaction                                               │
│  ├── Contains contractual content                                          │
│  ├── Is required for regulatory compliance                                 │
│  ├── Documents project milestones                                          │
│  └── Has ongoing business, legal, or historical value                     │
│                                                                             │
│  EMAIL IS NOT A RECORD IF IT:                                              │
│  ├── Is purely scheduling/logistics                                        │
│  ├── Is a personal message                                                 │
│  ├── Is spam or junk                                                       │
│  ├── Is a simple acknowledgment                                            │
│  ├── Is FYI with no substantive content                                   │
│  └── Is superseded by later communication                                 │
│                                                                             │
│  MANAGEMENT APPROACH                                                       │
│  ├── Business-critical email: Retain per content type schedule            │
│  ├── General correspondence: Retain 3 years                               │
│  ├── Transitory: Delete when no longer needed                             │
│  └── Subject to legal hold: Preserve regardless                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Chat and Messaging

| Platform | Record Status | Management |
|----------|---------------|------------|
| **Slack (business)** | May be record | Retain business-substantive, archive |
| **Teams messages** | May be record | Retain per content |
| **SMS (business)** | May be record | Capture if business content |
| **Video recordings** | May be record | Retain if business value |

**Key Rule:** Substance determines record status, not format.

### 6.3 Database Records

| Consideration | Approach |
|---------------|----------|
| **Transaction data** | Retain per data type schedule |
| **Audit trails** | Retain per audit requirements |
| **Configuration** | Retain while system active + 3 years |
| **Backups** | Per backup retention schedule |

### 6.4 Vital Records

**Definition:** Records essential for business continuity or legal obligations.

**Examples:**
- Corporate charter and bylaws
- Key contracts
- Insurance policies
- Intellectual property filings
- Financial records
- Backup and recovery documentation

**Protection Requirements:**
- Multiple copies in different locations
- Disaster recovery accessible
- Regular verification
- Enhanced backup frequency

---

## 7. Compliance & Monitoring

### 7.1 Compliance Requirements

| Requirement | Evidence |
|-------------|----------|
| **Policy exists** | This policy document |
| **Retention schedule** | Published schedule |
| **Training** | Training records |
| **Destruction certificates** | Destruction log |
| **Hold compliance** | Hold tracking |
| **Regular review** | Review documentation |

### 7.2 Monitoring Activities

| Activity | Frequency | Owner |
|----------|-----------|-------|
| **Retention compliance spot-check** | Quarterly | Records Manager |
| **Hold compliance verification** | Per hold | Legal |
| **Storage location audit** | Annual | Records Manager |
| **Destruction log review** | Quarterly | Records Manager |
| **Policy compliance assessment** | Annual | Records Manager + Audit |

### 7.3 Non-Compliance

| Violation | Response |
|-----------|----------|
| Early destruction | Investigation, potential discipline |
| Failure to preserve (hold) | Serious, escalate to Legal |
| Improper storage | Training, correction |
| Classification failure | Training, correction |
| Repeated violations | Escalation, discipline |

---

## Quick Reference Card

Print it. Keep it handy.

### Is It a Record?

```
Created in business? + Has lasting value?
= YES → RECORD (follow retention)
= NO → Delete when no longer needed
```

### Official vs. Working

```
OFFICIAL RECORD:
• Final, approved version
• In official repository
• Follow retention schedule

WORKING DOCUMENT:
• Draft, in progress
• Can delete when final exists
```

### Key Retention Periods

| Type | Retention |
|------|-----------|
| Contracts | Term + 7 years |
| Financial | 7 years |
| Employee | Employment + 7 years |
| Customer | Relationship + 7 years |
| Corporate | Permanent |

### Never Destroy If

```
□ Retention period not expired
□ Legal hold in place
□ Litigation pending
□ Investigation ongoing
□ Audit in progress
```

### Questions?

```
Records Manager: records@cybercube.software
Legal: legal@cybercube.software
```

---

## Implementation Status

**Last Updated:** 2026-01-17  
**Policy Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Policy document | COMPLETE | This policy |
| Retention schedule | COMPLETE | Data Classification Standard |
| Records custodian assignments | PENDING | Assign per department |
| Training | PENDING | Develop module |
| Storage locations | PARTIAL | Standardize repositories |
| Destruction process | PENDING | Formalize procedure |
| Monitoring program | PENDING | Establish schedule |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Data Classification & Retention Standard | Retention periods, data handling |
| Legal Hold & eDiscovery Standard | Hold procedures |
| Security Policy | Information protection |
| Privacy Handling Policy | Personal data records |
| Business Continuity Plan | Vital records |
