CYBERCUBE Data Classification & Retention Standard (v1)

Glossary

This glossary defines key terms used throughout the CYBERCUBE Data Classification &
Retention Standard.

All definitions are normative unless stated otherwise.

A

Access Control

Mechanisms restricting who can view, modify, or delete data based on classification level
and authorization.

Higher classification = stricter access controls.

Archive

Long-term storage of data that is no longer actively used but must be retained.

Properties:

- Read-only (immutable)
- Lower-cost storage tier
- Longer retrieval time
- Full retention compliance

Audit Log

A chronological record of system activities and data access events.

Classification: INTERNAL (default) or CONFIDENTIAL (if contains user actions)

Retention: 2 years minimum (regulatory dependent)

B

Backup

A copy of data created for recovery purposes.

Types:

- Full backup
- Incremental backup
- Differential backup

Backups inherit the classification of their source data.

Breach Notification

The legal requirement to notify authorities and affected individuals when personal data
is compromised.

GDPR: 72 hours to authority, without undue delay to individuals
CCPA: "The most expedient time possible and without unreasonable delay"

C

Classification

The process of categorizing data based on sensitivity and risk.

CYBERCUBE levels:

- PUBLIC
- INTERNAL
- CONFIDENTIAL
- RESTRICTED

Cold Storage

Archival storage with infrequent access patterns.

Properties:

- Lowest cost
- Retrieval delay (minutes to hours)
- Used for compliance retention

Consent

Permission granted by a data subject for processing their personal data.

Requirements:

- Freely given
- Specific
- Informed
- Unambiguous
- Withdrawable

Controller (Data Controller)

The entity determining purposes and means of personal data processing.

CYBERCUBE acts as controller for:

- Employee data
- Marketing contacts
- Website visitors

CYBERCUBE acts as processor for:

- Customer-owned data

Cryptographic Erasure

Rendering data unreadable by destroying encryption keys.

Used when:

- Physical deletion impractical
- Backup tapes
- Distributed storage

D

Data Inventory

A catalog of all data assets, their classification, location, and owners.

Required fields:

- Data category
- Classification level
- Storage location
- Retention period
- Data owner
- Processing purpose

Data Minimization

The principle of collecting only data necessary for specified purposes.

GDPR Article 5(1)(c): "adequate, relevant and limited"

Data Owner

The individual or team responsible for a data category.

Responsibilities:

- Classification decisions
- Access approvals
- Retention compliance
- Incident response

Data Protection Impact Assessment (DPIA)

A risk assessment for high-risk data processing activities.

Required when:

- Processing sensitive data at scale
- Systematic monitoring
- Automated decision-making
- New technology deployment

Data Subject

An identified or identifiable natural person whose data is processed.

Rights (GDPR):

- Access
- Rectification
- Erasure ("right to be forgotten")
- Portability
- Object to processing

Data Subject Access Request (DSAR)

A formal request from a data subject to exercise their rights.

Response time: 30 days (GDPR), 45 days (CCPA)

Deletion

The permanent removal of data from all systems.

Types:

- Logical deletion (soft delete)
- Physical deletion (hard delete)
- Cryptographic erasure

Destruction

The secure elimination of data beyond recovery.

Methods:

- Cryptographic erasure
- Physical destruction
- Secure overwrite (NIST SP 800-88 Guidelines for Media Sanitization)

E

Encryption

The process of encoding data to prevent unauthorized access.

Requirements by classification:

- PUBLIC: optional
- INTERNAL: in transit required
- CONFIDENTIAL: at rest + in transit required
- RESTRICTED: at rest + in transit + field-level

Encryption at Rest

Data encrypted while stored on disk or other media.

Algorithms: AES-256 (required)

Encryption in Transit

Data encrypted during transmission over networks.

Protocols: TLS 1.2+ (required)

G

GDPR (General Data Protection Regulation)

EU regulation governing personal data processing.

Key requirements:

- Lawful basis for processing
- Data subject rights
- Breach notification (72 hours)
- Data protection by design
- DPO appointment (in some cases)

H

Hard Delete

Physical removal of data from storage systems.

Properties:

- Irreversible
- Removed from backups (after retention)
- No recovery possible

Hot Storage

Primary storage with immediate access.

Properties:

- Highest performance
- Highest cost
- Active data

I

Incident

A security event that may compromise data confidentiality, integrity, or availability.

Classification determines:

- Notification requirements
- Response urgency
- Investigation depth

L

Legal Hold

A directive to preserve data relevant to pending or anticipated litigation.

Properties:

- Suspends normal retention/deletion
- Applies to all copies (including backups)
- Documented by legal counsel
- Removed only by legal authorization

Lifecycle

The stages data passes through from creation to deletion.

Stages:

1. Creation/Collection
2. Processing/Use
3. Storage
4. Archival
5. Deletion/Destruction

M

Masking

Obscuring portions of data while preserving format.

Examples:

- Credit card: `****-****-****-1234`
- Email: `j***@example.com`
- Phone: `+1-***-***-7890`

Used for:

- Display purposes
- Non-production environments
- Support access

Minimum Necessary

The principle of limiting data access to the minimum required for a task.

Also known as: Need-to-know basis

P

Personal Data

Any information relating to an identified or identifiable natural person.

Examples:

- Name, email, phone
- IP address (when linkable)
- Location data
- Online identifiers
- Employment information

Personal Identifiable Information (PII)

Data that can directly or indirectly identify a person.

Direct PII: Name, SSN, email
Indirect PII: DOB + ZIP code + gender

Processing

Any operation performed on personal data.

Includes:

- Collection
- Recording
- Storage
- Retrieval
- Use
- Disclosure
- Deletion

Processor (Data Processor)

An entity processing personal data on behalf of a controller.

CYBERCUBE acts as processor when handling customer data.

Requirements:

- Written contract
- Follow controller instructions
- Implement security measures
- Assist with DSARs

Pseudonymization

Replacing identifying fields with artificial identifiers.

Properties:

- Reversible (with key)
- Reduces risk
- Not anonymization

Purpose Limitation

The principle of using data only for specified, explicit purposes.

GDPR Article 5(1)(b)

R

Retention Period

The duration data is kept before deletion.

Factors:

- Legal requirements
- Business need
- Contractual obligations
- Consent scope

Retention Schedule

A documented plan specifying retention periods for all data categories.

Contents:

- Data category
- Retention period
- Legal basis
- Deletion method
- Exceptions

Right to be Forgotten

A data subject's right to have their personal data erased.

GDPR Article 17

Exceptions:

- Legal obligation
- Public interest
- Archiving purposes
- Legal claims

S

Sensitive Personal Data

Special categories requiring additional protection.

Categories (GDPR Article 9):

- Racial/ethnic origin
- Political opinions
- Religious beliefs
- Trade union membership
- Genetic data
- Biometric data
- Health data
- Sexual orientation

CYBERCUBE classification: RESTRICTED

Soft Delete

Marking data as deleted without physical removal.

Properties:

- Reversible (within period)
- Hidden from normal access
- Enables recovery
- Eventually hard deleted

Storage Limitation

The principle of keeping data only as long as necessary.

GDPR Article 5(1)(e)

T

Tenant Data

Data owned by a CYBERCUBE customer (tenant).

CYBERCUBE role: Processor
Customer role: Controller

Classification: Per customer agreement (minimum CONFIDENTIAL)

Third Party

An external entity receiving or processing data.

Requirements:

- Data Processing Agreement (DPA)
- Security assessment
- Classification-appropriate controls

W

Warm Storage

Intermediate storage tier between hot and cold.

Properties:

- Balanced cost/performance
- Moderate retrieval time
- Infrequently accessed data

---

CYBERCUBE Data Classification & Retention Standard (v1)

**Standard ID:** STD-DAT-001**Status:** Active**Effective:** 2026-01-17**Classification:** INTERNAL**Owner:** Security Team / Data Protection**Applies to:** All data processed, stored, or transmitted by CYBERCUBE systems

0. Purpose & Design Principles

This standard defines how data is classified, protected, retained, and deleted across
CYBERCUBE systems. It establishes controls for regulatory compliance and risk management.

Regulatory alignment:

- GDPR (EU General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- ISO 27001 Annex A.8 (Asset Management)
- SOC 2 Type II (Trust Services Criteria)
- HIPAA (where applicable)

Design principles:

1. **Data Minimization** — Collect only what's necessary
2. **Purpose Limitation** — Use only for stated purposes
3. **Storage Limitation** — Retain only as long as needed
4. **Classification by Default** — All data classified on creation
5. **Defense in Depth** — Layered protection controls
6. **Accountability** — Clear ownership and audit trails

This document does NOT define:

- Encryption algorithms — see Cryptography Standard
- Access control models — see Authorization Standard
- Incident response — see Security Incident Standard
- Backup procedures — see Operations Standard

1. Data Classification

All data MUST be classified according to sensitivity and risk. Classification determines
handling, storage, access, and retention requirements.

1.1 Classification Levels

| Level        | Code | Description                       | Examples                         |
| ------------ | ---- | --------------------------------- | -------------------------------- |
| PUBLIC       | PUB  | Non-sensitive, publicly shareable | Marketing content, docs, pricing |
| INTERNAL     | INT  | Business data, not for public     | Reports, metrics, internal comms |
| CONFIDENTIAL | CON  | Sensitive business/personal data  | PII, contracts, customer data    |
| RESTRICTED   | RST  | Highest sensitivity               | Credentials, keys, health data   |

1.2 Classification Matrix

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RESTRICTED (RST)                            │
│  Credentials, encryption keys, secrets, sensitive PII, health data  │
│  Access: Need-to-know only, MFA required, full audit               │
├─────────────────────────────────────────────────────────────────────┤
│                        CONFIDENTIAL (CON)                           │
│  PII, customer data, contracts, financial records, source code     │
│  Access: Role-based, audit logged, encrypted at rest               │
├─────────────────────────────────────────────────────────────────────┤
│                          INTERNAL (INT)                             │
│  Business documents, internal reports, non-sensitive metrics       │
│  Access: All employees, encrypted in transit                       │
├─────────────────────────────────────────────────────────────────────┤
│                           PUBLIC (PUB)                              │
│  Marketing materials, public documentation, press releases         │
│  Access: Anyone, no restrictions                                   │
└─────────────────────────────────────────────────────────────────────┘
```

1.3 Classification by Data Type

| Data Category                          | Classification        | Notes                                              |
| -------------------------------------- | --------------------- | -------------------------------------------------- |
| **User Identity**                |                       |                                                    |
| Full name                              | CONFIDENTIAL          | PII                                                |
| Email address                          | CONFIDENTIAL          | PII, direct identifier                             |
| Phone number                           | CONFIDENTIAL          | PII                                                |
| Profile photo                          | INTERNAL              | If uploaded by user                                |
| User preferences                       | INTERNAL              | Non-identifying                                    |
| **Authentication**               |                       |                                                    |
| Password hash                          | RESTRICTED            | Never logged or exported                           |
| MFA secrets                            | RESTRICTED            | Encrypted at rest                                  |
| Session tokens                         | RESTRICTED            | Short-lived                                        |
| API keys                               | RESTRICTED            | Hashed storage                                     |
| OAuth tokens                           | RESTRICTED            | Encrypted at rest                                  |
| **Business Data**                |                       |                                                    |
| Project names                          | CONFIDENTIAL          | Customer-owned                                     |
| Task content                           | CONFIDENTIAL          | Customer-owned                                     |
| Invoices                               | CONFIDENTIAL          | Financial PII                                      |
| Payment card data (tokenized PAN only) | RESTRICTED            | PCI-DSS scope; SAD (CVV, PIN, stripe) NEVER stored |
| Bank details                           | RESTRICTED            | Financial PII                                      |
| **System Data**                  |                       |                                                    |
| Audit logs                             | INTERNAL/CONFIDENTIAL | Depends on content                                 |
| Error logs                             | INTERNAL              | Scrubbed of PII                                    |
| Access logs                            | CONFIDENTIAL          | Contains user actions                              |
| Performance metrics                    | INTERNAL              | Aggregated                                         |
| **Communications**               |                       |                                                    |
| Support messages                       | CONFIDENTIAL          | May contain PII                                    |
| Internal chat                          | INTERNAL              | Business comms                                     |
| Customer notifications                 | CONFIDENTIAL          | Contains PII                                       |

1.4 Classification Inheritance

Data inherits the highest classification of its components:

```
Document containing:
  - Public content (PUB)
  - Internal metrics (INT)  
  - Customer name (CON)
  
  → Document classification: CONFIDENTIAL (CON)
```

1.5 Classification Labeling

| Context   | Labeling Method                           |
| --------- | ----------------------------------------- |
| Database  | `classification` column on tables       |
| Files     | Metadata tag or filename suffix           |
| APIs      | Response header `X-Data-Classification` |
| Documents | Header/footer classification marking      |
| Emails    | Subject prefix `[CONFIDENTIAL]`         |

1.6 Reclassification

Classification changes require:

1. Data owner approval
2. Risk assessment (if upgrading)
3. Control adjustment
4. Audit log entry

Direction rules:

- Upgrading (e.g., INT → CON): Allowed with approval
- Downgrading (e.g., CON → INT): Requires DPIA review

2. Data Handling Controls

Each classification level has specific handling requirements.

2.1 Control Matrix

| Control                 | PUBLIC      | INTERNAL      | CONFIDENTIAL  | RESTRICTED     |
| ----------------------- | ----------- | ------------- | ------------- | -------------- |
| **Access**        |             |               |               |                |
| Authentication          | Optional    | Required      | Required      | Required       |
| Authorization           | None        | Role-based    | Role-based    | Need-to-know   |
| MFA                     | No          | No            | Recommended   | Required       |
| Access logging          | No          | Yes           | Yes           | Yes (detailed) |
| **Storage**       |             |               |               |                |
| Encryption at rest      | No          | No            | Required      | Required       |
| Encryption in transit   | Recommended | Required      | Required      | Required       |
| Field-level encryption  | No          | No            | No            | Required       |
| Secure deletion         | No          | Recommended   | Required      | Required       |
| **Transmission**  |             |               |               |                |
| TLS required            | No          | Yes           | Yes           | Yes (TLS 1.3)  |
| Email encryption        | No          | No            | Recommended   | Required       |
| External sharing        | Allowed     | With approval | Restricted    | Prohibited     |
| **Handling**      |             |               |               |                |
| Printing                | Allowed     | Allowed       | Restricted    | Prohibited     |
| Screenshots             | Allowed     | Allowed       | Restricted    | Prohibited     |
| Copy to removable media | Allowed     | Restricted    | Prohibited    | Prohibited     |
| Cloud storage           | Allowed     | Approved only | Approved only | Prohibited     |
| **Monitoring**    |             |               |               |                |
| DLP scanning            | No          | No            | Yes           | Yes            |
| Access alerts           | No          | No            | Sensitive ops | All access     |
| Anomaly detection       | No          | No            | Yes           | Yes            |

2.2 Storage Requirements

| Classification | Storage Tier | Encryption                | Backup    |
| -------------- | ------------ | ------------------------- | --------- |
| PUBLIC         | Any          | Optional                  | Optional  |
| INTERNAL       | Standard     | Transit                   | Daily     |
| CONFIDENTIAL   | Secure       | At rest + transit         | Daily     |
| RESTRICTED     | Isolated     | At rest + transit + field | Real-time |

2.3 Access Control Requirements

**PUBLIC:**

- No authentication required
- May be cached by CDNs
- No access logging required

**INTERNAL:**

- Authentication required
- All employees may access
- Access logged (aggregate)
- Not shared externally by default

**CONFIDENTIAL:**

- Authentication required
- Role-based access only
- All access logged (individual)
- External sharing requires approval
- Data Processing Agreement for third parties

**RESTRICTED:**

- Authentication + MFA required
- Need-to-know basis only
- All access logged with context
- No external sharing
- Dedicated security review for access

2.4 Data Masking Rules

| Data Type   | Display Masking            | Log Masking   |
| ----------- | -------------------------- | ------------- |
| Email       | `j***@example.com`       | `[EMAIL]`   |
| Phone       | `+1-***-***-7890`        | `[PHONE]`   |
| Credit Card | `****-****-****-1234`    | `[PAN]`     |
| SSN         | `***-**-1234`            | `[SSN]`     |
| API Key     | `sk_live_****XYZ`        | `[API_KEY]` |
| Password    | `••••••••`       | Never logged  |
| Name        | Not masked (if authorized) | `[NAME]`    |

2.5 Encryption Requirements

| Classification | At Rest | In Transit | Key Management |
| -------------- | ------- | ---------- | -------------- |
| PUBLIC         | None    | Optional   | N/A            |
| INTERNAL       | None    | TLS 1.2+   | N/A            |
| CONFIDENTIAL   | AES-256 | TLS 1.2+   | HSM or KMS     |
| RESTRICTED     | AES-256 | TLS 1.3    | HSM required   |

3. Personal Data (PII) Handling

Personal data requires special handling under privacy regulations.

3.1 PII Categories

| Category                                     | Examples                        | Classification |
| -------------------------------------------- | ------------------------------- | -------------- |
| **Direct Identifiers**                 |                                 |                |
| Name                                         | Full name, maiden name          | CONFIDENTIAL   |
| Government ID                                | SSN, passport, driver's license | RESTRICTED     |
| Financial accounts                           | Bank account, credit card       | RESTRICTED     |
| **Contact Information**                |                                 |                |
| Email                                        | Personal, work email            | CONFIDENTIAL   |
| Phone                                        | Mobile, landline                | CONFIDENTIAL   |
| Address                                      | Physical, mailing               | CONFIDENTIAL   |
| **Online Identifiers**                 |                                 |                |
| IP address                                   | When linkable to person         | CONFIDENTIAL   |
| Device ID                                    | When linkable                   | CONFIDENTIAL   |
| Cookies                                      | Tracking cookies                | CONFIDENTIAL   |
| **Sensitive PII (Special Categories)** |                                 |                |
| Health data                                  | Medical records, conditions     | RESTRICTED     |
| Biometric data                               | Fingerprint, face recognition   | RESTRICTED     |
| Racial/ethnic origin                         |                                 | RESTRICTED     |
| Political opinions                           |                                 | RESTRICTED     |
| Religious beliefs                            |                                 | RESTRICTED     |
| Sexual orientation                           |                                 | RESTRICTED     |
| Genetic data                                 |                                 | RESTRICTED     |
| Criminal history                             |                                 | RESTRICTED     |

3.2 PII Processing Principles

| Principle          | Requirement               | CYBERCUBE Implementation |
| ------------------ | ------------------------- | ------------------------ |
| Lawfulness         | Valid legal basis         | Consent or contract      |
| Purpose limitation | Specific, stated purposes | Privacy policy           |
| Data minimization  | Only necessary data       | Collection review        |
| Accuracy           | Keep data accurate        | User self-service        |
| Storage limitation | Retain only as needed     | Retention schedule       |
| Integrity          | Protect from loss/damage  | Encryption + backups     |
| Accountability     | Demonstrate compliance    | Audit logs + DPIAs       |

3.3 Legal Bases for Processing

| Basis               | Description              | Use Cases                  |
| ------------------- | ------------------------ | -------------------------- |
| Consent             | Explicit permission      | Marketing, analytics       |
| Contract            | Necessary for contract   | Service delivery           |
| Legal obligation    | Required by law          | Tax records, compliance    |
| Vital interests     | Protect life             | Emergency contact          |
| Public interest     | Public task              | N/A for CYBERCUBE          |
| Legitimate interest | Business need (balanced) | Security, fraud prevention |

3.4 Data Subject Rights

| Right         | Description             | Response Time | Implementation         |
| ------------- | ----------------------- | ------------- | ---------------------- |
| Access        | Copy of their data      | 30 days       | Export API             |
| Rectification | Correct inaccurate data | 30 days       | Self-service + support |
| Erasure       | Delete their data       | 30 days       | Deletion workflow      |
| Portability   | Machine-readable export | 30 days       | JSON/CSV export        |
| Restriction   | Limit processing        | 30 days       | Account flags          |
| Object        | Stop processing         | 30 days       | Opt-out mechanisms     |

3.5 Data Subject Request (DSAR) Workflow

```
1. Request received
      ↓
2. Verify identity (prevent fraud)
      ↓
3. Log request in DSAR tracker
      ↓
4. Determine request type
      ↓
5. Search all systems for data
      ↓
6. Compile response / execute action
      ↓
7. Review for exemptions
      ↓
8. Respond to data subject
      ↓
9. Document completion
```

Response times:

- GDPR: 30 days (extendable to 90 for complex)
- CCPA: 45 days (extendable to 90)

3.6 PII Inventory Requirements

Maintain inventory of all PII:

| Field               | Description                 |
| ------------------- | --------------------------- |
| Data element        | Name, email, etc.           |
| Classification      | CONFIDENTIAL, RESTRICTED    |
| Storage location    | Database, file storage      |
| Legal basis         | Consent, contract           |
| Purpose             | Service delivery, marketing |
| Retention period    | Per schedule                |
| Data owner          | Team/individual             |
| Third-party sharing | Yes/No, with whom           |

4. Retention Periods

Data retention periods are based on legal requirements, business need, and risk.

4.1 Retention Schedule

| Data Category                  | Retention Period                | Legal Basis         | Deletion Method     |
| ------------------------------ | ------------------------------- | ------------------- | ------------------- |
| **User Account Data**    |                                 |                     |                     |
| Active user profile            | Account lifetime + 30 days      | Contract            | Soft → hard delete |
| Inactive user profile          | 2 years after last login        | Legitimate interest | Automatic purge     |
| Deleted user profile           | 30 days (recovery window)       | User request        | Hard delete         |
| **Authentication Data**  |                                 |                     |                     |
| Password hashes                | Until changed                   | Contract            | Immediate replace   |
| Session tokens                 | Session duration + 24 hours     | Contract            | Automatic purge     |
| Login history                  | 2 years                         | Security            | Rolling purge       |
| MFA recovery codes             | Until used/regenerated          | Contract            | Immediate delete    |
| **Business Data**        |                                 |                     |                     |
| Projects (active)              | Account lifetime                | Contract            | With account        |
| Projects (archived)            | 7 years                         | Legal/business      | Hard delete         |
| Tasks                          | With parent project             | Contract            | Cascade delete      |
| Messages/comments              | With parent entity              | Contract            | Cascade delete      |
| **Financial Data**       |                                 |                     |                     |
| Invoices                       | 7 years                         | Tax law             | Archive → delete   |
| Payment records                | 7 years                         | Tax law             | Archive → delete   |
| Payment card tokens (PAN)      | Transaction + 90 days           | PCI-DSS             | Secure purge        |
| Sensitive auth data (CVV, PIN) | NEVER stored post-authorization | PCI-DSS 3.2         | N/A                 |
| Bank details                   | 7 years after last use          | Legal               | Secure purge        |
| **Communications**       |                                 |                     |                     |
| Support tickets                | 3 years after close             | Business            | Archive → delete   |
| Email notifications            | Not retained                    | N/A                 | Not stored          |
| In-app messages                | 2 years                         | Business            | Rolling purge       |
| **System Data**          |                                 |                     |                     |
| Audit logs                     | 2 years                         | Compliance          | Rolling archive     |
| Error logs                     | 90 days                         | Operations          | Rolling purge       |
| Access logs                    | 1 year                          | Security            | Rolling archive     |
| Analytics data                 | 2 years (aggregated)            | Business            | Aggregation         |
| **Backups**              |                                 |                     |                     |
| Daily backups                  | 30 days                         | Operations          | Rolling delete      |
| Weekly backups                 | 90 days                         | Operations          | Rolling delete      |
| Monthly backups                | 1 year                          | Compliance          | Rolling delete      |
| Yearly backups                 | 7 years                         | Legal               | Archive storage     |

4.2 Retention Period Calculation

```
Retention Start:
  - User data: Account creation or last activity
  - Transaction data: Transaction date
  - Project data: Project completion or archival
  - Logs: Event timestamp

Retention End:
  - Start + retention period
  - OR legal hold release
  - OR user deletion request (where applicable)
```

4.3 Retention Triggers

| Trigger              | Action                      |
| -------------------- | --------------------------- |
| Account deletion     | Start 30-day grace period   |
| Project archive      | Start retention countdown   |
| Contract end         | Start contractual retention |
| Inactivity threshold | Flag for review/purge       |
| Legal hold           | Suspend all deletion        |
| Retention expiry     | Queue for deletion          |

4.4 Retention Exceptions

| Exception                | Handling                        |
| ------------------------ | ------------------------------- |
| Legal hold               | Suspend deletion until released |
| Active dispute           | Retain until resolution         |
| Regulatory investigation | Retain as directed              |
| Contractual requirement  | Follow contract terms           |
| Anonymized data          | May retain indefinitely         |

5. Data Deletion

Deletion procedures ensure data is properly removed according to classification.

5.1 Deletion Types

| Type          | Description                     | Reversible | Use Case               |
| ------------- | ------------------------------- | ---------- | ---------------------- |
| Soft delete   | Flag as deleted, hide from view | Yes        | User-initiated delete  |
| Hard delete   | Remove from primary storage     | No         | After grace period     |
| Secure delete | Overwrite + remove              | No         | RESTRICTED data        |
| Crypto shred  | Destroy encryption keys         | No         | Backup tapes, archives |

5.2 Deletion Workflow

```
Deletion Triggered
      ↓
Check legal holds
      ↓ (if held, stop)
Classification check
      ↓
┌─────────────────────────────────────────────┐
│ PUBLIC/INTERNAL: Standard delete            │
│ CONFIDENTIAL: Secure delete + audit         │
│ RESTRICTED: Secure delete + verification    │
└─────────────────────────────────────────────┘
      ↓
Remove from primary storage
      ↓
Queue backup purge (next cycle)
      ↓
Remove from search indexes
      ↓
Remove from caches
      ↓
Audit log entry
      ↓
Deletion certificate (RESTRICTED)
```

5.3 Deletion by Classification

| Classification | Primary Delete     | Backup Delete         | Verification |
| -------------- | ------------------ | --------------------- | ------------ |
| PUBLIC         | Standard           | Next cycle            | None         |
| INTERNAL       | Standard           | Next cycle            | Log only     |
| CONFIDENTIAL   | Secure             | Within retention      | Audit log    |
| RESTRICTED     | Secure + overwrite | Immediate if possible | Certificate  |

5.4 Cascade Deletion

Parent deletion triggers child deletion:

```
Account deleted
    ├── User profile
    ├── All owned projects
    │       ├── Tasks
    │       ├── Milestones
    │       ├── Documents
    │       └── Comments
    ├── Messages
    ├── Invoices (archive, not delete)
    └── Audit logs (retain per schedule)
```

5.5 Deletion Verification

For RESTRICTED data:

```typescript
interface DeletionCertificate {
  certificate_id: string;
  data_type: string;
  data_identifiers: string[];
  classification: 'RESTRICTED';
  deletion_method: 'secure_delete' | 'crypto_shred';
  deleted_from: string[];       // System names
  deleted_by: string;           // USR-*
  deleted_at: string;           // ISO 8601
  verified_by?: string;         // For audit
  verification_method: string;
  retention_basis: string;
  legal_holds_checked: boolean;
}
```

5.6 Third-Party Deletion

When data shared with third parties:

1. Notify third party of deletion requirement
2. Request deletion confirmation
3. Document in deletion record
4. Verify (where possible)
5. Include in deletion certificate
6. Legal Hold

Legal holds preserve data relevant to litigation or investigations.

6.1 Legal Hold Process

```
Legal/Compliance initiates hold
      ↓
Define scope (data types, date range, custodians)
      ↓
Identify affected systems
      ↓
Implement hold (suspend deletion)
      ↓
Notify data custodians
      ↓
Document hold parameters
      ↓
Monitor compliance
      ↓
[Investigation/litigation concludes]
      ↓
Legal authorizes release
      ↓
Remove hold
      ↓
Resume normal retention
```

6.2 Legal Hold Record

```typescript
interface LegalHold {
  id: string;                    // LH-XXXXXX
  name: string;                  // "Smith v. CYBERCUBE"
  matter_number: string;         // Legal reference
  status: 'active' | 'released';
  
  // Scope
  scope: {
    data_types: string[];        // ["email", "documents", "chat"]
    date_range: {
      start: string;             // ISO 8601
      end: string;
    };
    custodians: string[];        // USR-* identifiers
    keywords?: string[];         // Search terms
    systems: string[];           // Affected systems
  };
  
  // Tracking
  created_by: string;            // Legal counsel
  created_at: string;
  released_by?: string;
  released_at?: string;
  
  // Documentation
  reason: string;
  external_counsel?: string;
  notes: string[];
}
```

6.3 Legal Hold Requirements

| Requirement               | Description                   |
| ------------------------- | ----------------------------- |
| Scope documentation       | Clear definition of held data |
| Custodian notification    | Inform data owners            |
| Preservation confirmation | Verify hold is effective      |
| Periodic review           | Assess ongoing necessity      |
| Release authorization     | Legal approval required       |
| Audit trail               | Complete history of hold      |

6.4 Legal Hold System Integration

Systems MUST:

- Check legal hold status before deletion
- Prevent deletion of held data
- Log all hold-related actions
- Support hold search/identification
- Generate preservation reports

```sql
-- Legal hold check before deletion
SELECT COUNT(*) FROM legal_holds lh
JOIN legal_hold_scope lhs ON lh.id = lhs.hold_id
WHERE lh.status = 'active'
  AND lhs.data_type = $1
  AND lhs.custodian_id = $2
  AND $3 BETWEEN lhs.date_start AND lhs.date_end;

-- If count > 0, deletion blocked
```

7. Backup & Recovery

Backups must maintain data classification and support compliance requirements.

7.1 Backup Strategy

| Backup Type      | Frequency          | Retention | Storage Tier |
| ---------------- | ------------------ | --------- | ------------ |
| Transaction logs | Continuous         | 7 days    | Hot          |
| Daily full       | Daily (02:00 UTC)  | 30 days   | Warm         |
| Weekly full      | Sunday (02:00 UTC) | 90 days   | Warm         |
| Monthly full     | 1st of month       | 1 year    | Cold         |
| Yearly archive   | January 1st        | 7 years   | Cold         |

7.2 Backup Classification

Backups inherit source classification:

| Source Classification | Backup Classification | Encryption    | Access              |
| --------------------- | --------------------- | ------------- | ------------------- |
| PUBLIC                | PUBLIC                | Optional      | Standard            |
| INTERNAL              | INTERNAL              | At rest       | Standard            |
| CONFIDENTIAL          | CONFIDENTIAL          | At rest       | Restricted          |
| RESTRICTED            | RESTRICTED            | At rest + key | Strictly controlled |

7.3 Backup Encryption

| Component       | Encryption  | Key Management |
| --------------- | ----------- | -------------- |
| Backup data     | AES-256-GCM | KMS managed    |
| Backup metadata | AES-256     | KMS managed    |
| Transport       | TLS 1.3     | Certificate    |
| Tape/archive    | AES-256     | HSM + escrow   |

Key rotation:

- Data encryption keys: Annually
- Key encryption keys: Per policy
- Escrow keys: Secured with legal

7.4 Backup Testing

| Test Type            | Frequency | Scope            |
| -------------------- | --------- | ---------------- |
| Restore verification | Weekly    | Sample data      |
| Full restore test    | Quarterly | Complete system  |
| Disaster recovery    | Annually  | Full DR exercise |
| Integrity check      | Daily     | All backups      |

7.5 Backup Deletion

Backup deletion follows retention schedule:

```
Backup reaches retention end
      ↓
Check legal holds (all data in backup)
      ↓
If held: Retain until release
If not held: Proceed
      ↓
For tape/physical: Secure destruction
For cloud: Cryptographic deletion
      ↓
Verify deletion
      ↓
Update backup inventory
      ↓
Audit log entry
```

7.6 Recovery Procedures

| Scenario          | RTO      | RPO      | Procedure               |
| ----------------- | -------- | -------- | ----------------------- |
| File recovery     | 1 hour   | 24 hours | Self-service or support |
| Database recovery | 4 hours  | 1 hour   | DBA-assisted            |
| Full system       | 24 hours | 4 hours  | DR procedure            |
| Tenant data       | 4 hours  | 24 hours | Support-assisted        |

RTO = Recovery Time Objective
RPO = Recovery Point Objective

8. Data Processing Agreements

Third-party data sharing requires documented agreements.

8.1 DPA Requirements

| Clause              | Description                       | Required |
| ------------------- | --------------------------------- | -------- |
| Processing scope    | What data, for what purpose       | Yes      |
| Duration            | Processing timeframe              | Yes      |
| Security measures   | Technical/organizational controls | Yes      |
| Sub-processors      | List of sub-processors            | Yes      |
| Data location       | Where data is processed           | Yes      |
| Audit rights        | Controller audit capability       | Yes      |
| Breach notification | Timeline and process              | Yes      |
| Deletion/return     | Data handling at termination      | Yes      |
| Liability           | Responsibility allocation         | Yes      |

8.2 Sub-Processor Management

Current CYBERCUBE sub-processors:

| Sub-Processor          | Purpose        | Data Types      | Location |
| ---------------------- | -------------- | --------------- | -------- |
| AWS                    | Infrastructure | All             | US/EU    |
| Stripe                 | Payments       | Payment data    | US/EU    |
| SendGrid               | Email          | Email addresses | US       |
| [Others as applicable] |                |                 |          |

Sub-processor changes:

- 30-day advance notice
- Customer objection right
- Updated DPA

8.3 Data Transfer

Cross-border transfers require:

| Mechanism                    | Description           |
| ---------------------------- | --------------------- |
| Adequacy decision            | EU-approved country   |
| Standard Contractual Clauses | EU-approved contracts |
| Binding Corporate Rules      | Intra-group transfers |
| Consent                      | Explicit, informed    |

CYBERCUBE default: Standard Contractual Clauses (SCCs)

9. Implementation Guidelines

9.1 Classification Implementation

```typescript
// data-classification.ts

export enum Classification {
  PUBLIC = 'PUB',
  INTERNAL = 'INT',
  CONFIDENTIAL = 'CON',
  RESTRICTED = 'RST'
}

interface ClassifiedData {
  data: any;
  classification: Classification;
  data_owner: string;
  retention_policy: string;
  created_at: Date;
  legal_holds?: string[];
}

// Classification decorator for API responses
function classify(level: Classification) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args);
      // Add classification header to response
      this.res.setHeader('X-Data-Classification', level);
      return result;
    };
  };
}

// Usage
class ProjectController {
  @classify(Classification.CONFIDENTIAL)
  async getProject(id: string) {
    // ...
  }
}
```

9.2 Retention Implementation

```typescript
// retention-service.ts

interface RetentionPolicy {
  data_type: string;
  retention_days: number;
  legal_basis: string;
  deletion_method: 'soft' | 'hard' | 'secure' | 'crypto_shred' | 'archive';
  requires_verification: boolean;
}

const RETENTION_POLICIES: Record<string, RetentionPolicy> = {
  'user_profile': {
    data_type: 'user_profile',
    retention_days: 30,  // After deletion request
    legal_basis: 'contract',
    deletion_method: 'hard',
    requires_verification: false
  },
  'invoice': {
    data_type: 'invoice',
    retention_days: 2555,  // 7 years
    legal_basis: 'legal_obligation',
    deletion_method: 'archive',
    requires_verification: true
  },
  'api_key': {
    data_type: 'api_key',
    retention_days: 0,  // Immediate on revocation
    legal_basis: 'contract',
    deletion_method: 'secure',
    requires_verification: true
  }
};

class RetentionService {
  async processRetention() {
    for (const [type, policy] of Object.entries(RETENTION_POLICIES)) {
      const expiredRecords = await this.findExpiredRecords(type, policy);
    
      for (const record of expiredRecords) {
        // Check legal holds
        if (await this.hasLegalHold(record)) {
          continue;  // Skip, held data
        }
      
        await this.deleteRecord(record, policy);
      }
    }
  }
  
  private async hasLegalHold(record: any): Promise<boolean> {
    const holds = await db.query(`
      SELECT 1 FROM legal_holds lh
      JOIN legal_hold_scope lhs ON lh.id = lhs.hold_id
      WHERE lh.status = 'active'
        AND lhs.data_type = $1
        AND ($2 BETWEEN lhs.date_start AND COALESCE(lhs.date_end, NOW()))
      LIMIT 1
    `, [record.type, record.created_at]);
  
    return holds.length > 0;
  }
}
```

9.3 Database Schema

```sql
-- Data Classification Schema

-- Classification labels for tables
CREATE TABLE data_classification (
    table_name VARCHAR(100) PRIMARY KEY,
    classification VARCHAR(3) NOT NULL,
    data_owner VARCHAR(100) NOT NULL,
    retention_policy VARCHAR(50) NOT NULL,
    pii_fields TEXT[],
    encryption_required BOOLEAN NOT NULL DEFAULT FALSE,
  
    CONSTRAINT valid_classification CHECK (
        classification IN ('PUB', 'INT', 'CON', 'RST')
    )
);

-- Retention policies
CREATE TABLE retention_policies (
    id VARCHAR(50) PRIMARY KEY,
    data_type VARCHAR(100) NOT NULL,
    retention_days INTEGER NOT NULL,
    legal_basis VARCHAR(50) NOT NULL,
    deletion_method VARCHAR(20) NOT NULL,
    requires_verification BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
  
    CONSTRAINT valid_deletion_method CHECK (
        deletion_method IN ('soft', 'hard', 'secure', 'crypto_shred', 'archive')
    )
);

-- Legal holds
CREATE TABLE legal_holds (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    matter_number VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    scope JSONB NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    released_by UUID REFERENCES users(id),
    released_at TIMESTAMPTZ,
    reason TEXT NOT NULL,
    notes TEXT[],
  
    CONSTRAINT valid_status CHECK (status IN ('active', 'released'))
);

CREATE INDEX idx_legal_holds_status ON legal_holds (status);

-- Deletion log
CREATE TABLE deletion_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_type VARCHAR(100) NOT NULL,
    record_id VARCHAR(100) NOT NULL,
    classification VARCHAR(3) NOT NULL,
    deletion_method VARCHAR(20) NOT NULL,
    deleted_by UUID REFERENCES users(id),
    deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    retention_policy VARCHAR(50),
    legal_hold_checked BOOLEAN NOT NULL DEFAULT TRUE,
    verification_status VARCHAR(20),
    certificate_id VARCHAR(50)
);

CREATE INDEX idx_deletion_log_date ON deletion_log (deleted_at);
CREATE INDEX idx_deletion_log_type ON deletion_log (data_type);

-- DSAR tracking
CREATE TABLE dsar_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type VARCHAR(50) NOT NULL,
    data_subject_email VARCHAR(254) NOT NULL,
    data_subject_verified BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    due_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    assigned_to UUID REFERENCES users(id),
    response_sent BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT[],
  
    CONSTRAINT valid_request_type CHECK (
        request_type IN ('access', 'rectification', 'erasure', 'portability', 'restriction', 'objection')
    ),
    CONSTRAINT valid_status CHECK (
        status IN ('pending', 'in_progress', 'completed', 'rejected')
    )
);

CREATE INDEX idx_dsar_status ON dsar_requests (status);
CREATE INDEX idx_dsar_due ON dsar_requests (due_at);

-- PII inventory
CREATE TABLE pii_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_element VARCHAR(100) NOT NULL,
    classification VARCHAR(3) NOT NULL,
    storage_location VARCHAR(200) NOT NULL,
    legal_basis VARCHAR(50) NOT NULL,
    purpose TEXT NOT NULL,
    retention_days INTEGER NOT NULL,
    data_owner VARCHAR(100) NOT NULL,
    third_party_sharing BOOLEAN NOT NULL DEFAULT FALSE,
    third_parties TEXT[],
    last_reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id),
  
    UNIQUE (data_element, storage_location)
);
```

9.4 Error Codes

| Code                         | Description                |
| ---------------------------- | -------------------------- |
| DATA_CLASSIFICATION_REQUIRED | Missing classification     |
| DATA_ACCESS_DENIED           | Insufficient clearance     |
| DATA_LEGAL_HOLD              | Deletion blocked by hold   |
| DATA_RETENTION_ACTIVE        | Within retention period    |
| DATA_DELETION_FAILED         | Deletion process error     |
| DSAR_INVALID_REQUEST         | Invalid DSAR format        |
| DSAR_IDENTITY_UNVERIFIED     | Cannot verify requestor    |
| DSAR_EXEMPTION_APPLIES       | Request denied (exemption) |

---

CYBERCUBE Data Classification — Developer Cheat Sheet

Print it. Pin it. Reference it.

🔹 Classification Levels

| Level        | Code | Examples            |
| ------------ | ---- | ------------------- |
| PUBLIC       | PUB  | Docs, marketing     |
| INTERNAL     | INT  | Reports, metrics    |
| CONFIDENTIAL | CON  | PII, customer data  |
| RESTRICTED   | RST  | Credentials, health |

🔹 Classification by Data Type

```
Password hashes     → RESTRICTED
API keys/secrets    → RESTRICTED
Payment card data   → RESTRICTED
Health data         → RESTRICTED

Email addresses     → CONFIDENTIAL
Phone numbers       → CONFIDENTIAL
Customer data       → CONFIDENTIAL
Invoices            → CONFIDENTIAL

Internal reports    → INTERNAL
Error logs          → INTERNAL
Metrics             → INTERNAL

Marketing content   → PUBLIC
Public docs         → PUBLIC
```

🔹 Encryption Requirements

| Level | At Rest | In Transit |
| ----- | ------- | ---------- |
| PUB   | No      | Optional   |
| INT   | No      | TLS 1.2+   |
| CON   | AES-256 | TLS 1.2+   |
| RST   | AES-256 | TLS 1.3    |

🔹 Retention Periods

```
User profile:      Account + 30 days
Session tokens:    Session + 24 hours
Login history:     2 years
Projects:          7 years (archived)
Invoices:          7 years
Support tickets:   3 years
Audit logs:        2 years
Error logs:        90 days
Daily backups:     30 days
Monthly backups:   1 year
Yearly backups:    7 years
```

🔹 Deletion Flow

```
1. Check legal holds → if held: STOP
2. Check retention → if active: STOP
3. Soft delete (30 day grace)
4. Hard delete
5. Purge from backups
6. Clear caches
7. Audit log
```

🔹 PII Handling

```
Collection:   Only what's needed
Storage:      Encrypted (CON/RST)
Access:       Role-based, logged
Sharing:      DPA required
Retention:    Per schedule
Deletion:     On request (30 days)
```

🔹 Data Subject Rights (GDPR)

| Right         | Response |
| ------------- | -------- |
| Access        | 30 days  |
| Rectification | 30 days  |
| Erasure       | 30 days  |
| Portability   | 30 days  |

🔹 Legal Hold Rules

```
When active:
✗ No deletion
✗ No modification
✗ No archival purge
✓ Normal access continues
✓ Must preserve all copies
```

🔹 Masking Patterns

```
Email:  j***@example.com
Phone:  +1-***-***-7890
Card:   ****-****-****-1234
SSN:    ***-**-1234
API:    sk_live_****XYZ
```

🔹 What You MUST Do

✅ Classify all data on creation
✅ Check legal holds before delete
✅ Encrypt CONFIDENTIAL+ at rest
✅ Log all CONFIDENTIAL+ access
✅ Honor DSAR within 30 days
✅ Follow retention schedule

🔹 What You MUST NOT Do

❌ Store passwords in plain text
❌ Log PII unmasked
❌ Delete held data
❌ Share without DPA
❌ Retain beyond schedule
❌ Skip classification

🔹 Quick Classification Test

```
Is it public info?           → PUBLIC
Internal business only?      → INTERNAL
Contains PII?                → CONFIDENTIAL
Credentials/health/finance?  → RESTRICTED
```

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component             | Status  | Notes             |
| --------------------- | ------- | ----------------- |
| Classification Schema | PENDING | Add to all tables |
| Retention Policies    | PENDING | Define per type   |
| Legal Hold System     | PENDING | Not implemented   |
| DSAR Workflow         | PENDING | Manual process    |
| Deletion Pipeline     | PARTIAL | Basic soft delete |
| PII Inventory         | PENDING | Document all PII  |
| Backup Encryption     | PARTIAL | AWS-managed       |
| Data Masking          | PARTIAL | Some APIs         |
| Audit Logging         | PARTIAL | Extend coverage   |

### Migration Path

1. **Phase 1**: Classification schema + inventory
2. **Phase 2**: Retention policy enforcement
3. **Phase 3**: Legal hold implementation
4. **Phase 4**: DSAR automation
5. **Phase 5**: Deletion pipeline hardening
6. **Phase 6**: Compliance audit

### Compliance Checklist

| Regulation | Status  | Audit Date |
| ---------- | ------- | ---------- |
| GDPR       | PARTIAL | —         |
| CCPA       | PARTIAL | —         |
| ISO 27001  | PENDING | —         |
| SOC 2      | PENDING | —         |

---

Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |



┌─────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE DATA CLASSIFICATION & RETENTION — DIRECTIVE BLOCK                │
├─────────────────────────────────────────────────────────────────────────────┤
│ AUTHORITY                                                                   │
│ Standard ID: STD-DAT-001                                                     │
│ Owner: Security Team / Data Protection                                      │
│ Applies to: ALL data processed, stored, transmitted by CYBERCUBE            │
│ Binding: MANDATORY                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PURPOSE                                                                     │
│ Establish mandatory rules for data classification, handling, retention,     │
│ deletion, and legal preservation to ensure regulatory compliance and risk   │
│ control.                                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ DESIGN PRINCIPLES                                                           │
│ • Data minimization                                                         │
│ • Purpose limitation                                                        │
│ • Storage limitation                                                        │
│ • Classification by default                                                 │
│ • Defense in depth                                                          │
│ • Accountability & auditability                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ CLASSIFICATION LEVELS (MANDATORY)                                            │
│ PUBLIC (PUB)        — Non-sensitive                                         │
│ INTERNAL (INT)      — Business-only                                         │
│ CONFIDENTIAL (CON) — PII / sensitive business                               │
│ RESTRICTED (RST)   — Credentials, secrets, sensitive PII                    │
│                                                                             │
│ • All data MUST be classified at creation                                   │
│ • Data inherits the highest classification of its components                │
├─────────────────────────────────────────────────────────────────────────────┤
│ OWNERSHIP & INVENTORY                                                       │
│ • Every data category MUST have an owner                                    │
│ • Central data inventory REQUIRED                                           │
│ • Inventory fields: category, classification, location, purpose, retention │
├─────────────────────────────────────────────────────────────────────────────┤
│ HANDLING CONTROLS (BY CLASSIFICATION)                                       │
│ PUBLIC: Open access                                                         │
│ INTERNAL: Authenticated access                                              │
│ CONFIDENTIAL: Role-based, logged, encrypted                                 │
│ RESTRICTED: Need-to-know, MFA, full audit, isolated                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ ENCRYPTION REQUIREMENTS                                                     │
│ • CONFIDENTIAL+: AES-256 at rest                                            │
│ • RESTRICTED: Field-level encryption + HSM                                  │
│ • Transit: TLS 1.2+ (TLS 1.3 for RST)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ MASKING & LOGGING                                                           │
│ • PII masked in logs and displays                                           │
│ • Secrets and credentials NEVER logged                                      │
│ • Access to CONFIDENTIAL+ logged per user                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ RETENTION RULES                                                             │
│ • Retention defined per data category                                       │
│ • Legal, contractual, and business bases documented                          │
│ • Retention expiry triggers deletion                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ DELETION REQUIREMENTS                                                       │
│ • Legal hold check REQUIRED before deletion                                 │
│ • CONFIDENTIAL: Secure deletion + audit log                                  │
│ • RESTRICTED: Secure deletion + verification certificate                    │
│ • Backups purged per retention schedule                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ LEGAL HOLD                                                                  │
│ • Suspends all deletion                                                     │
│ • Applies to all copies and backups                                         │
│ • Legal authorization REQUIRED for release                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ PERSONAL DATA (PII)                                                         │
│ • Lawful basis REQUIRED                                                     │
│ • DSAR support mandatory                                                    │
│ • DPIA REQUIRED for high-risk processing                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ THIRD PARTIES                                                               │
│ • DPA REQUIRED                                                             │
│ • Classification-appropriate controls enforced                              │
│ • Deletion requests flowed down                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ GOVERNANCE & REVIEW                                                         │
│ • Annual review MINIMUM                                                     │
│ • Changes logged and auditable                                              │
│ • Integrated with Privacy, Security, IR, ERM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ OUTCOME                                                                     │
│ • No unclassified data                                                      │
│ • Predictable retention & deletion                                          │
│ • Enforceable legal holds                                                   │
│ • Audit-grade data lifecycle control                                        │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE DATA CLASSIFICATION & RETENTION — COMPLIANCE MATRIX (0–5)        │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                               │
│ 0 = Not defined                                                             │
│ 1 = Defined only                                                            │
│ 2 = Partially implemented                                                   │
│ 3 = Implemented (baseline compliant)                                        │
│ 4 = Enforced, measured                                                      │
│ 5 = Institutionalized, audited                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ D1 — DATA GOVERNANCE & OWNERSHIP                                            │
│ • Owners assigned                                                          │
│ • Accountability enforced                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ D2 — DATA INVENTORY & CLASSIFICATION                                       │
│ • All data cataloged                                                       │
│ • Classification applied at creation                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ D3 — CLASSIFICATION CONTROLS                                                │
│ • Access, encryption, logging by level                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ D4 — ENCRYPTION & KEY MANAGEMENT                                           │
│ • CONFIDENTIAL+/RST controls enforced                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ D5 — LOGGING & MASKING                                                      │
│ • PII masked                                                              │
│ • Secrets never logged                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ D6 — RETENTION SCHEDULE                                                     │
│ • Retention defined for all data                                           │
│ • Legal basis documented                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ D7 — DELETION & PURGING                                                     │
│ • Secure deletion enforced                                                 │
│ • Backups handled                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ D8 — LEGAL HOLD MANAGEMENT                                                  │
│ • Holds block deletion                                                     │
│ • Release controlled by legal                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ D9 — PERSONAL DATA & DSAR                                                   │
│ • Rights supported                                                        │
│ • Timelines met                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ D10 — THIRD-PARTY DATA HANDLING                                             │
│ • DPAs in place                                                           │
│ • Downstream deletion enforced                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ D11 — AUDITABILITY & EVIDENCE                                               │
│ • Logs, certificates, records retained                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                │
│ • Max: 55                                                                 │
│ • ≥50 = Data-Lifecycle Mature                                             │
│ • 41–49 = Managed                                                         │
│ • 33–40 = Elevated compliance risk                                        │
│ • <33 = Unacceptable                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ HARD FAIL CONDITIONS                                                       │
│ • D2 < 3 (Unclassified data present)                                      │
│ • D6 < 3 (Undefined retention)                                            │
│ • D8 < 3 (Legal hold failure)                                             │
│ • D7 < 3 (Deletion not enforceable)                                       │
└─────────────────────────────────────────────────────────────────────────────┘
