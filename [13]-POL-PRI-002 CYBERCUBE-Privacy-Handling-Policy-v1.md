CYBERCUBE Privacy Handling Policy (v1)

Internal Policy — Not for External Distribution

> Key terms are defined in **Appendix A: Glossary** at the end of this document.

---

CYBERCUBE Privacy Handling Policy (v1.1)

Standard ID: POL-PRI-002
Status: Active
Effective: 2026-01-17 (v1), 2026-04-22 (v1.1)
Classification: INTERNAL — Not for External Distribution
Applies to: All CYBERCUBE employees, contractors, and systems

### Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Policy | Waiver Path |
| ------------- | ---- | ---------------------------------- | ----------- |
| All projects handling personal data | **T1 MUST** | (1) Every project that collects, stores, or processes personal data MUST classify it per STD-DAT-001 T1 (PII inventory). (2) A lawful basis (GDPR) / valid collection purpose (CCPA) MUST be identified and documented before collection. (3) Personal data MUST NOT be used for purposes materially outside the disclosed purpose without re-consent or a new lawful basis. (4) Data-subject-access / deletion / correction requests received via any channel MUST be routed to the named privacy contact within 5 business days. (5) Suspected PII exposures MUST be treated as security incidents per STD-SEC-007 T1 (clause 5 — Legal flag). | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Documented DPIA triage (decide-to-DPIA workflow), consent management platform, data-subject-request (DSR) ticket workflow with SLA tracking, data-processing-agreement (DPA) inventory (per TPL-LGL-001), annual privacy training (paired with STD-SEC-008 T2), sub-processor registry, retention-schedule audit. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk (sensitive categories, children, biometrics) | **T3 MAY** | Full DPIAs per Art. 35 GDPR, data-minimization-by-design review, pseudonymization / differential privacy where applicable, binding corporate rules or SCC suite for transfers, privacy engineering reviews on architectural changes, regulator-liaison playbook. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.1 (2026-04-22) — Tier Table addition.** T1 = five enforceable rules that every product team can follow today: PII classification, lawful basis, no purpose-creep, DSR routing, treat-exposure-as-incident.

0. Purpose & Design Principles

This policy establishes how CYBERCUBE handles personal data across all
operations. It ensures compliance with privacy regulations, protects
individual rights, and maintains trust with customers and users.

Regulatory alignment:

- GDPR (EU General Data Protection Regulation)
- CCPA/CPRA (California Consumer Privacy Act/Rights Act)
- UK GDPR (post-Brexit)
- LGPD (Brazil)
- Other applicable privacy laws

Design principles:

1. **Privacy by Design** — Build privacy into all systems
2. **Data Minimization** — Collect only what's necessary
3. **Purpose Limitation** — Use data only as stated
4. **Transparency** — Be clear about data practices
5. **Accountability** — Document and demonstrate compliance
6. **Individual Rights** — Respect and facilitate rights

Conventions:

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in RFC 2119.

This policy does NOT replace:

- Public Privacy Policy — see customer-facing document
- Data Classification & Retention Standard — data governance
- Security Policy — security controls

1. Scope & Applicability

1.1 Who This Policy Applies To

| Role           | Obligation    |
| -------------- | ------------- |
| Employees      | Must comply   |
| Contractors    | Must comply   |
| Vendors        | Via contract  |
| Partners       | Via agreement |
| Sub-processors | Via DPA       |

1.2 What Data This Covers

| Data Type              | In Scope |
| ---------------------- | -------- |
| Customer personal data | YES      |
| Employee personal data | YES      |
| Prospect/lead data     | YES      |
| Website visitor data   | YES      |
| Support ticket data    | YES      |
| Marketing contact data | YES      |
| Business contact data  | YES      |

1.3 Geographic Scope

This policy applies globally. Additional requirements apply based on:

| Jurisdiction | Additional Requirements |
| ------------ | ----------------------- |
| EU/EEA       | GDPR compliance         |
| UK           | UK GDPR compliance      |
| California   | CCPA/CPRA compliance    |
| Brazil       | LGPD compliance         |
| Other        | Local law compliance    |

> **Note:** LGPD requirements are substantially aligned with GDPR provisions in this policy. Key LGPD differences (e.g., 10 legal bases instead of 6, ANPD as supervisory authority) are addressed on a case-by-case basis by Legal.

2. CYBERCUBE's Role

2.1 Controller vs. Processor

| Context          | CYBERCUBE Role | Basis                       |
| ---------------- | -------------- | --------------------------- |
| Own operations   | Controller     | Determines purposes         |
| Customer data    | Processor      | Acts on instructions        |
| Website visitors | Controller     | Determines purposes         |
| Employee data    | Controller     | Employment necessity        |
| Marketing        | Controller     | Legitimate interest/consent |

2.2 Controller Responsibilities

As Controller, CYBERCUBE must:

- [ ] Determine lawful basis for processing
- [ ] Provide privacy notices
- [ ] Respond to data subject requests
- [ ] Implement appropriate security
- [ ] Notify authorities of breaches
- [ ] Maintain processing records
- [ ] Conduct DPIAs when required

2.3 Processor Responsibilities

As Processor for customer data, CYBERCUBE must:

- [ ] Process only on documented instructions
- [ ] Ensure personnel confidentiality
- [ ] Implement security measures
- [ ] Engage sub-processors only with authorization
- [ ] Assist with data subject requests
- [ ] Support audits and compliance
- [ ] Delete/return data at end of service
- [ ] Notify of breaches without undue delay

3. Lawful Basis for Processing

3.1 GDPR Lawful Bases

| Basis               | When Used                  | Documentation      |
| ------------------- | -------------------------- | ------------------ |
| Consent             | Marketing, cookies         | Consent record     |
| Contract            | Service delivery           | Customer agreement |
| Legal obligation    | Tax, employment law        | Legal reference    |
| Vital interests     | Emergency safety           | Rare, documented   |
| Public task         | N/A for CYBERCUBE          | —                 |
| Legitimate interest | Security, fraud prevention | LIA required       |

3.2 Lawful Basis Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LAWFUL BASIS DECISION TREE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Is processing necessary to perform a contract?                            │
│         │                                                                   │
│    YES ─┴─▶ CONTRACT                                                       │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  Is processing required by law?                                            │
│         │                                                                   │
│    YES ─┴─▶ LEGAL OBLIGATION                                               │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  Does CYBERCUBE have a legitimate interest?                                │
│  AND does it not override individual rights?                               │
│         │                                                                   │
│    YES ─┴─▶ LEGITIMATE INTEREST (requires LIA)                             │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  CONSENT (must be freely given, specific, informed)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

3.3 Legitimate Interest Assessment (LIA)

Required before relying on legitimate interest:

```markdown
## Legitimate Interest Assessment

### Processing Activity
[Description of processing]

### Purpose Test
What is the legitimate interest?
- [ ] Business interest identified
- [ ] Interest is lawful
- [ ] Interest is clearly articulated

### Necessity Test
Is processing necessary for the purpose?
- [ ] Processing achieves the purpose
- [ ] No less intrusive way exists
- [ ] Processing is proportionate

### Balancing Test
Do individual rights override the interest?
- [ ] Nature of data considered
- [ ] Expectations of individuals assessed
- [ ] Impact on individuals evaluated
- [ ] Safeguards implemented

### Outcome
- [ ] APPROVED — Legitimate interest valid
- [ ] REJECTED — Use different basis or don't process
```

4. Consent Management

4.1 Valid Consent Requirements

| Requirement  | Implementation                        |
| ------------ | ------------------------------------- |
| Freely given | No bundling, no penalty for refusal   |
| Specific     | Per-purpose consent                   |
| Informed     | Clear language, identified controller |
| Unambiguous  | Affirmative action required           |
| Withdrawable | Easy withdrawal mechanism             |
| Documented   | Consent records maintained            |

4.2 Consent Collection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONSENT COLLECTION FLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PRESENT              2. COLLECT             3. RECORD                  │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐           │
│  │ Clear notice │──────▶│ Affirmative  │──────▶│ Store with   │           │
│  │ of purpose   │       │ action (opt- │       │ timestamp,   │           │
│  │ + controller │       │ in checkbox) │       │ version, IP  │           │
│  └──────────────┘       └──────────────┘       └──────────────┘           │
│                                │                      │                    │
│                         No pre-checked               │                    │
│                         boxes                        │                    │
│                                                      ▼                    │
│                                               ┌──────────────┐           │
│                                               │ 4. HONOR     │           │
│                                               │ Process per  │           │
│                                               │ consent scope│           │
│                                               └──────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

4.3 Consent Record Schema

```typescript
interface ConsentRecord {
  consent_id: string;           // CC-PID
  subject_id: string;           // User CC-PID
  purpose: string;              // Specific purpose
  scope: string[];              // What data, what processing
  mechanism: string;            // How collected
  timestamp: Date;              // When given
  version: string;              // Consent text version
  ip_address?: string;          // Collection context
  user_agent?: string;          // Collection context
  status: 'active' | 'withdrawn';
  withdrawn_at?: Date;
  source: string;               // Where collected
}
```

4.4 Consent Withdrawal

- Available at any time
- As easy as giving consent
- Effective immediately for future processing
- Does not affect lawfulness of prior processing
- Documented with timestamp

Withdrawal mechanisms:

- Account settings
- Unsubscribe links
- Privacy request form
- Direct contact

5. Data Subject Rights

5.1 Rights Overview

| Right               | GDPR Article | CCPA Equivalent  | GDPR Time | CCPA Time |
| ------------------- | ------------ | ---------------- | --------- | --------- |
| Access              | Art. 15      | Right to Know    | 30 days   | 45 days   |
| Rectification       | Art. 16      | Right to Correct | 30 days   | 45 days   |
| Erasure             | Art. 17      | Right to Delete  | 30 days   | 45 days   |
| Restriction         | Art. 18      | —               | 30 days   | —        |
| Portability         | Art. 20      | —               | 30 days   | —        |
| Object              | Art. 21      | Right to Opt-Out | 30 days   | 15 days   |
| Automated decisions | Art. 22      | Right to Limit   | 30 days   | 45 days   |
| Non-discrimination  | —           | CCPA right       | —        | Ongoing   |

**Extensions:** GDPR allows +60 days for complex requests (Art. 12(3)); CCPA allows +45 days with notice.

5.2 DSAR Handling Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DSAR HANDLING WORKFLOW                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. RECEIVE            2. VERIFY             3. SCOPE                      │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│  │ Log request  │────▶│ Verify       │────▶│ Clarify if   │               │
│  │ Acknowledge  │     │ identity     │     │ needed       │               │
│  │ (within 3d)  │     │              │     │              │               │
│  └──────────────┘     └──────────────┘     └──────────────┘               │
│                              │                    │                        │
│                        ┌─────┴─────┐             │                        │
│                        │           │             ▼                        │
│                     Verified    Unverified  ┌──────────────┐             │
│                        │        (request    │ 4. SEARCH    │             │
│                        │         more       │ Locate all   │             │
│                        │         info)      │ personal data│             │
│                        ▼                    └──────────────┘             │
│                     Continue                       │                      │
│                                                    ▼                      │
│  5. REVIEW             6. FULFILL           7. RESPOND                   │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│  │ Check        │────▶│ Execute      │────▶│ Deliver      │             │
│  │ exemptions   │     │ request      │     │ response     │             │
│  │              │     │              │     │ (within 30d) │             │
│  └──────────────┘     └──────────────┘     └──────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

5.3 DSAR Response Template

```markdown
## Data Subject Request Response

Request ID: DSAR-2026-0001
Subject: [Name/Identifier]
Request Type: [Access/Deletion/Correction/etc.]
Received: [Date]
Response Due: [Date + 30 days (GDPR) / 45 days (CCPA)]

### Verification
- [ ] Identity verified via [method]
- [ ] Authority confirmed (if agent)

### Scope
Data categories searched:
- [ ] Account data
- [ ] Transaction history
- [ ] Communications
- [ ] Support tickets
- [ ] Marketing data
- [ ] Analytics data

### Response

#### For Access Requests
Categories of personal data:
- [Category 1]: [Description]
- [Category 2]: [Description]

Sources: [How data was collected]
Recipients: [Who data was shared with]
Retention: [How long data is kept]

[Attached: Exported data file]

#### For Deletion Requests
Data deleted:
- [Category 1]: Deleted on [date]
- [Category 2]: Deleted on [date]

Data retained (with legal basis):
- [Category]: [Legal basis for retention]

#### For Correction Requests
Corrections made:
- [Field]: [Old value] → [New value]

### Completion
- [ ] Response sent to subject
- [ ] Record updated in DSAR log
- [ ] Evidence retained
```

5.4 Exemptions & Limitations

| Exemption            | Applies To       | Basis                 |
| -------------------- | ---------------- | --------------------- |
| Legal privilege      | Access           | Legal proceedings     |
| Third-party rights   | Access, Deletion | Others' privacy       |
| Manifestly unfounded | All              | Bad faith requests    |
| Excessive requests   | All              | Repeated requests     |
| Legal retention      | Deletion         | Legal obligations     |
| Ongoing contract     | Deletion         | Necessary for service |

5.5 CCPA-Specific Requirements

| Requirement                 | Implementation             |
| --------------------------- | -------------------------- |
| "Do Not Sell or Share" link | Prominent website link     |
| Opt-out mechanism           | No account required        |
| 12-month lookback           | Disclose 12 months of data |
| Authorized agents           | Accept with verification   |
| Non-discrimination          | Equal service/pricing      |
| Sensitive PI notice         | Disclose use, allow limit  |

6. Cookie & Tracking

6.1 Cookie Categories

| Category           | Consent Required | Examples                       |
| ------------------ | ---------------- | ------------------------------ |
| Strictly Necessary | No               | Auth, security, load balancing |
| Functional         | Yes (EU)         | Preferences, language          |
| Analytics          | Yes              | Google Analytics, Mixpanel     |
| Advertising        | Yes              | Ad networks, retargeting       |

6.2 Cookie Consent Requirements

| Jurisdiction | Requirement                     |
| ------------ | ------------------------------- |
| EU/UK        | Prior consent for non-essential |
| California   | Disclosure + opt-out for "sale" |
| Other US     | Disclosure only                 |

6.3 Cookie Consent Banner

Requirements:

- [ ] Displayed before non-essential cookies set
- [ ] Clear accept/reject options
- [ ] Granular category choices
- [ ] Link to cookie policy
- [ ] No dark patterns
- [ ] Consent recorded
- [ ] Easy withdrawal

6.4 Cookie Implementation

```typescript
interface CookieConsent {
  consent_id: string;
  timestamp: Date;
  categories: {
    necessary: true;           // Always true
    functional: boolean;
    analytics: boolean;
    advertising: boolean;
  };
  jurisdiction: string;
  ip_country: string;
  banner_version: string;
}

// Implementation rules
const cookieRules = {
  // Set only necessary cookies until consent
  preConsent: ['necessary'],
  
  // EU: explicit opt-in required
  EU: {
    default: 'opt-out',
    required: ['functional', 'analytics', 'advertising'],
  },
  
  // US: disclosure + opt-out
  US: {
    default: 'opt-in',
    optOut: ['advertising'], // "sale" category
  },
};
```

6.5 Cookie Inventory

Maintain an inventory of all cookies:

```yaml
# Cookie Inventory Template
cookies:
  - name: "session_id"
    category: necessary
    purpose: "User authentication"
    duration: "Session"
    provider: "CYBERCUBE"
  
  - name: "_ga"
    category: analytics
    purpose: "Google Analytics - user distinction"
    duration: "2 years"
    provider: "Google"
  
  - name: "preferences"
    category: functional
    purpose: "Store user preferences"
    duration: "1 year"
    provider: "CYBERCUBE"
```

7. Cross-Border Data Transfers

7.1 Transfer Mechanisms

| Mechanism         | Use Case                        | Requirements            |
| ----------------- | ------------------------------- | ----------------------- |
| Adequacy Decision | Transfers to adequate countries | Verify decision current |
| SCCs              | Most third-country transfers    | Execute 2021 SCCs       |
| BCRs              | Intra-group transfers           | DPA approval            |
| Derogations       | Limited specific situations     | Document reliance       |

7.2 Transfer Decision Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TRANSFER MECHANISM SELECTION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Is recipient in EEA?                                                      │
│         │                                                                   │
│    YES ─┴─▶ No transfer mechanism needed                                   │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  Is there an adequacy decision?                                            │
│         │                                                                   │
│    YES ─┴─▶ ADEQUACY (document decision)                                   │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  Is recipient within CYBERCUBE group?                                      │
│         │                                                                   │
│    YES ─┴─▶ Consider BCRs (if approved)                                    │
│         │                                                                   │
│        NO                                                                   │
│         │                                                                   │
│         ▼                                                                   │
│  STANDARD CONTRACTUAL CLAUSES                                              │
│  + Transfer Impact Assessment (TIA)                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

7.3 Transfer Impact Assessment (TIA)

Required for SCCs to non-adequate countries:

```markdown
## Transfer Impact Assessment

### Transfer Details
- Data Exporter: CYBERCUBE [Entity]
- Data Importer: [Recipient]
- Recipient Country: [Country]
- Data Categories: [Types]
- Transfer Purpose: [Purpose]

### Legal Assessment
- [ ] Relevant laws identified
- [ ] Government access risks assessed
- [ ] Importer access to data assessed

### Supplementary Measures
Technical:
- [ ] Encryption in transit
- [ ] Encryption at rest
- [ ] Pseudonymization

Organizational:
- [ ] Confidentiality agreements
- [ ] Access controls
- [ ] Training

Contractual:
- [ ] SCCs executed
- [ ] Additional clauses

### Risk Conclusion
- [ ] Transfer can proceed — risks mitigated
- [ ] Transfer cannot proceed — unmitigable risks
```

7.4 Adequacy Countries (as of 2026-01)

EU adequacy decisions in effect:

- Andorra, Argentina, Canada (commercial), Faroe Islands
- Guernsey, Israel, Isle of Man, Japan, Jersey
- New Zealand, South Korea, Switzerland, UK, Uruguay
- US (Data Privacy Framework participants)

7.5 US Data Privacy Framework

For transfers to US:

- Verify recipient is DPF-certified
- Check certification is current (Commerce Dept list)
- Document reliance on DPF

8. Privacy Impact Assessment (DPIA)

8.1 When DPIA Required

| Trigger                                | Example                             |
| -------------------------------------- | ----------------------------------- |
| Systematic profiling                   | Credit scoring, behavioral analysis |
| Large-scale special categories         | Health data processing              |
| Large-scale public monitoring          | CCTV, location tracking             |
| New technology                         | AI/ML processing personal data      |
| Automated decisions with legal effects | Automated loan decisions            |
| Cross-referencing datasets             | Combining data sources              |
| Vulnerable individuals                 | Children, employees                 |

8.2 DPIA Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DPIA PROCESS                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. THRESHOLD           2. DESCRIBE           3. ASSESS                    │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐             │
│  │ Is DPIA      │─YES─▶│ Document     │─────▶│ Identify     │             │
│  │ required?    │      │ processing   │      │ risks        │             │
│  └──────────────┘      └──────────────┘      └──────────────┘             │
│         │                                           │                      │
│        NO                                           ▼                      │
│         │                                    ┌──────────────┐             │
│         ▼                                    │ 4. MITIGATE  │             │
│    Document                                  │ Plan         │             │
│    decision                                  │ safeguards   │             │
│                                              └──────────────┘             │
│                                                    │                      │
│  5. CONSULT (if needed)        6. DOCUMENT        │                      │
│  ┌──────────────┐             ┌──────────────┐    │                      │
│  │ DPA          │◀───High────│ Record DPIA  │◀───┘                      │
│  │ consultation │    Risk    │ & decision   │                            │
│  └──────────────┘             └──────────────┘                            │
│                                      │                                    │
│                                      ▼                                    │
│                               ┌──────────────┐                           │
│                               │ 7. REVIEW    │                           │
│                               │ Periodic     │                           │
│                               │ reassessment │                           │
│                               └──────────────┘                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

8.3 DPIA Template

```markdown
## Data Protection Impact Assessment

### Project Information
- Project Name: [Name]
- Project Lead: [Name]
- Date: [Date]
- Version: [Version]

### 1. Processing Description
**What data?**
[Categories of personal data]

**Whose data?**
[Categories of data subjects]

**Why?**
[Purpose of processing]

**How?**
[Processing operations]

**How long?**
[Retention period]

**Who has access?**
[Recipients]

### 2. Necessity & Proportionality
- [ ] Lawful basis identified: [Basis]
- [ ] Purpose is legitimate and clear
- [ ] Processing is necessary for purpose
- [ ] Data minimization applied
- [ ] Retention is limited

### 3. Risk Assessment
| Risk | Likelihood | Severity | Score |
|------|------------|----------|-------|
| [Risk 1] | H/M/L | H/M/L | [1-9] |
| [Risk 2] | H/M/L | H/M/L | [1-9] |

### 4. Mitigation Measures
| Risk | Measure | Residual Risk |
|------|---------|---------------|
| [Risk 1] | [Control] | H/M/L |

### 5. Consultation
- [ ] DPO consulted: [Date, Opinion]
- [ ] DPA consultation required: [Yes/No]

### 6. Decision
- [ ] APPROVED — proceed with measures
- [ ] REJECTED — do not proceed
- [ ] MODIFY — changes required

### 7. Review Schedule
Next review: [Date]
Trigger for earlier review: [Conditions]
```

9. Data Breach Notification

9.1 Breach Notification Requirements

| Jurisdiction | Authority Notification       | Individual Notification            |
| ------------ | ---------------------------- | ---------------------------------- |
| GDPR         | 72 hours (if risk)           | Without undue delay (if high risk) |
| UK GDPR      | 72 hours (if risk)           | Without undue delay (if high risk) |
| CCPA         | Per Cal. Civ. Code §1798.82 | "Most expedient time possible"     |

9.2 Breach Assessment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BREACH NOTIFICATION ASSESSMENT                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Is personal data affected?                                                │
│         │                                                                   │
│        NO ─▶ Not a data breach (may be security incident)                  │
│         │                                                                   │
│        YES                                                                  │
│         │                                                                   │
│         ▼                                                                   │
│  Is there a risk to individuals' rights and freedoms?                      │
│         │                                                                   │
│        NO ─▶ Document but no notification required                         │
│         │                                                                   │
│        YES                                                                  │
│         │                                                                   │
│         ▼                                                                   │
│  NOTIFY SUPERVISORY AUTHORITY (72 hours)                                   │
│         │                                                                   │
│         ▼                                                                   │
│  Is there HIGH risk to individuals?                                        │
│         │                                                                   │
│        NO ─▶ Authority notification only                                   │
│         │                                                                   │
│        YES                                                                  │
│         │                                                                   │
│         ▼                                                                   │
│  NOTIFY AFFECTED INDIVIDUALS                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

9.3 High-Risk Factors

Indicators of high risk requiring individual notification:

- Special category data exposed
- Financial data exposed
- Authentication credentials exposed
- Large number of individuals affected
- Data could enable identity theft
- Data could enable fraud
- Vulnerable individuals affected

9.4 Notification Content

**Authority notification must include:**

- Nature of breach
- Categories and approximate number of individuals
- Categories and approximate number of records
- DPO contact details
- Likely consequences
- Measures taken/proposed

**Individual notification must include:**

- Nature of breach in clear language
- DPO contact details
- Likely consequences
- Measures taken/proposed
- Recommendations for individuals

10. Vendor & Sub-Processor Management

10.1 Sub-Processor Requirements

| Requirement           | Implementation                         |
| --------------------- | -------------------------------------- |
| Written authorization | Customer DPA permits sub-processors    |
| Due diligence         | Security assessment before engagement  |
| DPA required          | Sub-processor DPA in place             |
| Same obligations      | Flow-down of processor obligations     |
| Notification          | Inform customers of new sub-processors |

10.2 Sub-Processor Assessment

```markdown
## Sub-Processor Assessment

### Vendor Information
- Name: [Vendor]
- Service: [Description]
- Location(s): [Countries]

### Data Processing
- Data categories: [Types]
- Data subjects: [Categories]
- Processing purpose: [Purpose]

### Security Assessment
- [ ] SOC 2 report reviewed
- [ ] ISO 27001 certified
- [ ] Security questionnaire completed
- [ ] Penetration test results reviewed

### Privacy Assessment
- [ ] Privacy policy reviewed
- [ ] DPA executed
- [ ] Sub-processor list obtained
- [ ] Transfer mechanism confirmed

### Approval
- [ ] Legal approved
- [ ] Security approved
- [ ] Privacy approved

### Monitoring
- Review frequency: [Annual/etc.]
- Next review: [Date]
```

10.3 Sub-Processor List

Maintain and publish sub-processor list:

```markdown
## CYBERCUBE Sub-Processors

Last Updated: [Date]

| Sub-Processor | Purpose | Location | Transfer Mechanism |
|---------------|---------|----------|-------------------|
| AWS | Cloud hosting | US, EU | DPF + SCCs |
| Google Cloud | Cloud hosting | US, EU | DPF + SCCs |
| Stripe | Payment processing | US | DPF |
| SendGrid | Email delivery | US | DPF |
| Datadog | Monitoring | US | DPF + SCCs |

Changes to this list will be notified [30] days in advance.
```

11. Training & Awareness

11.1 Training Requirements

| Role          | Training             | Frequency           |
| ------------- | -------------------- | ------------------- |
| All employees | Privacy fundamentals | Onboarding + annual |
| Engineering   | Privacy by design    | Onboarding + annual |
| Support       | DSAR handling        | Onboarding + annual |
| Marketing     | Consent & cookies    | Onboarding + annual |
| HR            | Employee data        | Onboarding + annual |
| Leadership    | Privacy governance   | Annual              |

11.2 Training Topics

**Privacy Fundamentals:**

- What is personal data
- GDPR/CCPA basics
- Data subject rights
- Breach recognition
- Reporting concerns

**Role-Specific:**

- Privacy by design (Engineering)
- DSAR response (Support)
- Consent management (Marketing)
- Employee data handling (HR)

12. Governance & Accountability

12.1 Privacy Organization

| Role                | Responsibilities                           |
| ------------------- | ------------------------------------------ |
| DPO (if applicable) | Independent oversight, advice, DPA liaison |
| Privacy Lead        | Day-to-day privacy operations              |
| Legal               | Regulatory interpretation, contracts       |
| Security            | Technical controls, breach response        |
| Engineering         | Privacy by design implementation           |
| Each Team           | Compliance within their scope              |

12.2 Records of Processing Activities (ROPA)

Maintain Article 30 records:

```yaml
# ROPA Entry Template
processing_activity:
  name: "Customer Account Management"
  controller: "CYBERCUBE Inc."
  purposes:
    - "Service delivery"
    - "Account administration"
  lawful_basis: "Contract"
  data_subjects:
    - "Customers"
  data_categories:
    - "Identity data"
    - "Contact data"
    - "Account data"
  recipients:
    - "Service providers (per sub-processor list)"
  transfers:
    - country: "US"
      mechanism: "DPF"
  retention: "Duration of contract + 7 years"
  security_measures:
    - "Encryption"
    - "Access controls"
    - "Audit logging"
```

12.3 Policy Review

| Activity             | Frequency            |
| -------------------- | -------------------- |
| Policy review        | Annual               |
| ROPA update          | Quarterly            |
| Sub-processor review | Quarterly            |
| Training update      | Annual               |
| DPIA review          | Per project + annual |

---

## 13. Quick Reference Card

Print it. Keep it handy.

🔹 CYBERCUBE Role

| Context          | Role       |
| ---------------- | ---------- |
| Own operations   | Controller |
| Customer data    | Processor  |
| Website visitors | Controller |

🔹 Lawful Bases

```
Contract → Legal Obligation → Legitimate Interest → Consent
```

🔹 DSAR Response Times

```
GDPR: 30 days (extendable +60)
CCPA: 45 days (extendable +45)
```

🔹 Data Subject Rights

- Access
- Rectification
- Erasure
- Restriction
- Portability
- Object
- Automated decisions

🔹 Breach Notification

```
Authority: 72 hours (GDPR)
Individuals: Without undue delay (if high risk)
```

🔹 Cookie Consent

```
EU: Opt-in for non-essential
US: Disclosure + opt-out (advertising)
```

🔹 Transfer Mechanisms

```
1. Adequacy decision
2. Standard Contractual Clauses
3. Binding Corporate Rules
4. Derogations (limited)
```

🔹 DPIA Triggers

- Systematic profiling
- Large-scale special categories
- New technology
- Automated decisions

🔹 Report Privacy Concerns

```
privacy@cybercube.software
DPO: dpo@cybercube.software
```

---

## 14. Implementation Status

**Last Updated:** 2026-01-17
**Policy Version:** v1

### Core Implementation

| Component                  | Status      | Notes                         |
| -------------------------- | ----------- | ----------------------------- |
| Lawful basis documentation | PARTIAL     | Complete for key activities   |
| Consent management         | PARTIAL     | Implement consent platform    |
| DSAR process               | PARTIAL     | Formalize workflow            |
| Cookie consent             | PARTIAL     | Deploy consent banner         |
| Transfer mechanisms        | PARTIAL     | Execute SCCs with vendors     |
| Sub-processor list         | PENDING     | Compile and publish           |
| ROPA                       | PENDING     | Create comprehensive register |
| DPIA process               | PENDING     | Establish formal process      |
| Training program           | PENDING     | Develop curriculum            |
| Public privacy policy      | IN PROGRESS | See companion document        |

---

## 15. References

- GDPR — Regulation (EU) 2016/679 (https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- CCPA/CPRA — Cal. Civ. Code §1798.100-199.100 (https://oag.ca.gov/privacy/ccpa)
- UK GDPR — UK Data Protection Act 2018 (https://www.legislation.gov.uk/ukpga/2018/12)
- LGPD — Lei Geral de Proteção de Dados (https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- EU SCCs — Commission Implementing Decision 2021/914 (https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj)
- EU-US Data Privacy Framework (https://www.dataprivacyframework.gov/)
- RFC 2119 — Key words for use in RFCs (https://www.rfc-editor.org/rfc/rfc2119)

---

Version History

| Version | Date       | Changes         | Author       |
| ------- | ---------- | --------------- | ------------ |
| v1.0    | 2026-01-17 | Initial release | Privacy Lead |

---

## Appendix A: Glossary

This glossary defines key terms used throughout the CYBERCUBE Privacy Handling Policy. All definitions are normative unless stated otherwise.

**Adequacy Decision** — EU Commission determination that a third country provides adequate data protection. Countries: UK, Switzerland, Canada, Japan, South Korea, etc.

**Anonymization** — Irreversible process removing all identifiable information. Result: Data no longer considered personal data.

**Binding Corporate Rules (BCRs)** — Internal rules for data transfers within multinational organizations. Alternative to SCCs for intra-group transfers.

**CCPA (California Consumer Privacy Act)** — California privacy law granting consumer rights over personal information. Amended by CPRA (California Privacy Rights Act).

**Consent** — Freely given, specific, informed, and unambiguous agreement. GDPR Art. 4(11): Must be affirmative action.

**Controller** — Entity determining purposes and means of processing. CYBERCUBE role: Controller (own data), Processor (customer data).

**Cookie** — Small text file stored on user's device. Types: Strictly necessary, functional, analytics, advertising.

**Data Breach** — Security incident affecting personal data confidentiality, integrity, or availability. Notification: GDPR 72 hours, CCPA per Cal. Civ. Code §1798.82.

**Data Minimization** — Collecting only data necessary for specified purpose. GDPR Art. 5(1)(c).

**Data Protection Impact Assessment (DPIA)** — Risk assessment for high-risk processing activities. Required for systematic profiling, large-scale special categories.

**Data Protection Officer (DPO)** — Designated privacy compliance expert. Required when: large-scale monitoring or special categories.

**Data Subject** — Identified or identifiable natural person. Synonym: Individual, consumer, user.

**DSAR (Data Subject Access Request)** — Request to exercise data subject rights. Response time: GDPR 30 days, CCPA 45 days.

**Erasure (Right to)** — Right to have personal data deleted. Synonym: Right to be forgotten (GDPR Art. 17).

**Explicit Consent** — Consent given through clear affirmative statement. Required for special categories, cross-border transfers.

**GDPR (General Data Protection Regulation)** — EU regulation on data protection and privacy. Effective: May 25, 2018.

**High-Risk Processing** — Processing likely to result in high risk to rights and freedoms. Triggers DPIA requirement.

**Lawful Basis** — Legal ground for processing personal data. GDPR Art. 6: Consent, contract, legal obligation, vital interests, public task, legitimate interests.

**Legitimate Interest** — Lawful basis where processing serves controller's legitimate purposes. Requires Legitimate Interest Assessment (LIA).

**Personal Data** — Any information relating to identified or identifiable natural person. Examples: Name, email, IP address, location, device ID.

**Personal Information (PI)** — CCPA term equivalent to personal data. Includes: Identifiers, commercial info, internet activity, geolocation.

**Privacy by Design** — Building privacy into systems from the outset. GDPR Art. 25.

**Privacy Notice** — Document informing individuals about data processing. Synonym: Privacy policy (external).

**Processing** — Any operation performed on personal data. Includes: Collection, storage, use, disclosure, deletion.

**Processor** — Entity processing data on behalf of controller. CYBERCUBE role: Processor for customer data.

**Profiling** — Automated processing to evaluate personal aspects. Examples: Performance, reliability, behavior, location.

**Pseudonymization** — Processing so data cannot be attributed without additional information. Reversible (unlike anonymization).

**Purpose Limitation** — Data collected for specified, explicit, legitimate purposes. GDPR Art. 5(1)(b).

**Rectification (Right to)** — Right to correct inaccurate personal data. GDPR Art. 16.

**Retention Period** — Duration personal data is kept. Principle: No longer than necessary.

**Sale (of Personal Information)** — CCPA/CPRA: Disclosure for monetary or valuable consideration. Consumer right: Opt-out of sale or sharing.

**Sensitive Personal Information** — Data requiring heightened protection. CCPA: SSN, financial, health, biometric, precise geolocation.

**Special Category Data** — GDPR Art. 9 data requiring explicit consent or exemption. Includes: Racial origin, health, biometric, political, religious.

**Standard Contractual Clauses (SCCs)** — EU-approved contract terms for international transfers. Version: 2021 SCCs (modular).

**Sub-Processor** — Processor engaged by another processor. Requires controller authorization.

**Third Party** — Entity other than data subject, controller, or processor. Examples: Partners, vendors, service providers.

**Transfer** — Disclosure of personal data to recipient in another country. Requires adequate safeguards.

**Transparency** — Clear information about data processing provided to individuals. GDPR Art. 12-14.


┌─────────────────────────────────────────────────────────────────────────────┐
│        CYBERCUBE PRIVACY HANDLING POLICY — DIRECTIVE BLOCK                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ AUTHORITY                                                                   │
│ Classification: INTERNAL                                                    │
│ Owner: Privacy Lead / Legal                                                 │
│ Applies to: ALL employees, contractors, systems                              │
│ Binding: MANDATORY                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PURPOSE                                                                     │
│ Define mandatory internal rules for lawful, secure, and accountable         │
│ handling of personal data across all CYBERCUBE operations.                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ GOVERNING PRINCIPLES                                                        │
│ • Privacy by Design                                                         │
│ • Data Minimization                                                         │
│ • Purpose Limitation                                                        │
│ • Transparency                                                             │
│ • Accountability                                                           │
│ • Respect for Individual Rights                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCOPE                                                                       │
│ • All personal data (customer, employee, prospect, visitor, support)       │
│ • Global applicability                                                     │
│ • Jurisdictional overlays applied as required                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ CONTROLLER / PROCESSOR ROLES                                                 │
│ • Controller: CYBERCUBE own operations, employees, website                  │
│ • Processor: Customer data per contract/DPA                                 │
│                                                                             │
│ Role MUST be determined and documented per processing activity.             │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAWFUL BASIS REQUIREMENTS                                                   │
│ • Every processing activity MUST have a documented lawful basis             │
│ • Allowed bases: Contract | Legal Obligation | Legitimate Interest | Consent │
│ • Legitimate Interest REQUIRES LIA                                          │
│ • Consent MUST be freely given, revocable, and recorded                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ CONSENT MANAGEMENT                                                          │
│ • No pre-checked boxes                                                      │
│ • Purpose-specific consent only                                             │
│ • Withdrawal MUST be as easy as grant                                       │
│ • Consent records retained                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ DATA SUBJECT RIGHTS (DSAR)                                                   │
│ • Access | Rectification | Erasure | Restriction                             │
│ • Portability | Objection | Automated decisions                             │
│ • Non-discrimination guaranteed                                             │
│                                                                             │
│ Response deadlines: GDPR 30d (+60) | CCPA 45d (+45)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ DSAR HANDLING (MANDATORY)                                                    │
│ Receive → Verify Identity → Scope → Search → Review → Fulfill → Respond     │
│                                                                             │
│ • All requests logged                                                      │
│ • Exemptions documented                                                     │
│ • Evidence retained                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ DATA RETENTION & DELETION                                                    │
│ • Retention limited to stated purpose                                      │
│ • Legal holds override deletion                                             │
│ • Secure deletion or anonymization REQUIRED                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ COOKIES & TRACKING                                                          │
│ • Necessary | Functional | Analytics | Advertising                          │
│ • EU/UK: prior opt-in for non-essential                                     │
│ • US: disclosure + opt-out (sale/share)                                     │
│ • Consent banner REQUIRED                                                   │
│ • Cookie inventory maintained                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ CROSS-BORDER TRANSFERS                                                       │
│ • Adequacy | SCCs | BCRs | Derogations (limited)                             │
│ • Transfer Impact Assessment REQUIRED where applicable                      │
│ • Safeguards documented                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ DPIA (PRIVACY IMPACT ASSESSMENT)                                             │
│ • REQUIRED for high-risk processing                                         │
│ • Risks identified, mitigated, approved                                     │
│ • DPA consultation where required                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ DATA BREACH NOTIFICATION                                                    │
│ • Assess risk to individuals                                                │
│ • Authority notification ≤72h (GDPR)                                        │
│ • Individual notification if high risk                                      │
│ • Aligned with Incident Response Standard                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ VENDORS & SUB-PROCESSORS                                                     │
│ • Due diligence REQUIRED                                                    │
│ • DPA REQUIRED                                                             │
│ • Same obligations flowed down                                             │
│ • Sub-processor list maintained and notified                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ RECORDS & GOVERNANCE                                                        │
│ • ROPA (Art. 30) REQUIRED                                                   │
│ • Decisions documented                                                     │
│ • Evidence audit-ready                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ TRAINING                                                                    │
│ • Privacy training REQUIRED by role                                        │
│ • Annual refreshers minimum                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ REVIEW & MAINTENANCE                                                        │
│ • Annual review MINIMUM                                                     │
│ • Material change triggers immediate review                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ OUTCOME                                                                     │
│ • Lawful internal data handling                                             │
│ • Enforceable privacy controls                                              │
│ • Audit-grade accountability                                                │
│ • No undocumented or unlawful processing                                    │
└─────────────────────────────────────────────────────────────────────────────┘



┌─────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE PRIVACY HANDLING — COMPLIANCE MATRIX (0–5)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                               │
│ 0 = Not defined                                                             │
│ 1 = Defined only                                                            │
│ 2 = Partially implemented                                                   │
│ 3 = Implemented (baseline compliant)                                        │
│ 4 = Enforced, measured                                                      │
│ 5 = Institutionalized, audited                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH1 — GOVERNANCE & OWNERSHIP                                               │
│ • Privacy lead defined                                                     │
│ • Roles (Controller/Processor) clear                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH2 — DATA INVENTORY & SCOPE                                               │
│ • All data categories identified                                          │
│ • ROPA maintained                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH3 — LAWFUL BASIS MANAGEMENT                                              │
│ • Lawful basis documented                                                 │
│ • LIAs completed where required                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH4 — CONSENT MANAGEMENT                                                   │
│ • Valid consent collected                                                 │
│ • Withdrawal honored                                                      │
│ • Records retained                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH5 — DATA SUBJECT RIGHTS                                                  │
│ • DSAR intake & verification                                              │
│ • Deadlines met                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH6 — DATA RETENTION & DELETION                                            │
│ • Retention schedules defined                                             │
│ • Secure deletion enforced                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH7 — COOKIES & TRACKING                                                   │
│ • Consent banner deployed                                                 │
│ • Cookie inventory maintained                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH8 — CROSS-BORDER TRANSFERS                                               │
│ • Transfer mechanisms documented                                          │
│ • TIAs completed where required                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH9 — DPIA & HIGH-RISK PROCESSING                                          │
│ • DPIA triggers identified                                                │
│ • Mitigations implemented                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH10 — BREACH & INCIDENT HANDLING                                          │
│ • Notification timelines met                                              │
│ • Coordination with IR                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH11 — VENDORS & SUB-PROCESSORS                                            │
│ • DPAs executed                                                           │
│ • Ongoing monitoring                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PH12 — TRAINING & AWARENESS                                                │
│ • Role-based training                                                     │
│ • Completion tracked                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                │
│ • Max: 60                                                                 │
│ • ≥54 = Privacy-Handling Mature                                           │
│ • 45–53 = Managed                                                         │
│ • 36–44 = Elevated compliance risk                                        │
│ • <36 = Unacceptable                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ HARD FAIL CONDITIONS                                                       │
│ • PH1 < 3 (No accountable owner)                                          │
│ • PH3 < 3 (Unlawful processing risk)                                      │
│ • PH5 < 3 (Rights not enforceable)                                        │
│ • PH8 < 3 (Unsafe transfers)                                              │
└─────────────────────────────────────────────────────────────────────────────┘
