# CYBERCUBE Vendor Risk Management Policy (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Vendor Risk
Management Policy.

All definitions are normative unless stated otherwise.

### A

**Assessment**

Evaluation of vendor's security and risk posture.

Types: Initial, periodic, triggered

**Attestation**

Vendor's formal statement of compliance.

Examples: SOC 2 report, ISO certificate

### B

**Business Associate**

Vendor handling protected health information.

Requirement: BAA (if applicable)

### C

**Contractual Controls**

Security requirements in vendor agreements.

Components: DPA, SLA, security terms

**Critical Vendor**

Vendor whose failure would significantly impact operations.

Requirement: Enhanced due diligence

### D

**Data Processing Agreement (DPA)**

Contract governing personal data handling.

Requirement: GDPR, privacy compliance

**Due Diligence**

Investigation of vendor before engagement.

Scope: Security, financial, operational

### F

**Fourth Party**

Vendor's vendors (sub-processors, subcontractors).

Risk: Extended supply chain

### I

**Inherent Risk**

Risk before any controls applied.

Factors: Data access, criticality, integration

**Integration**

Technical connection between CYBERCUBE and vendor.

Types: API, data feed, network, SSO

### O

**Offboarding**

Process of terminating vendor relationship.

Components: Access revocation, data return/deletion

**Onboarding**

Process of engaging new vendor.

Components: Assessment, contracts, access setup

### P

**Processor**

Vendor processing personal data on our behalf.

Requirement: DPA, documented instructions

### R

**Residual Risk**

Risk remaining after controls applied.

Assessment: Accept, mitigate, or avoid

**Risk Acceptance**

Formal acknowledgment of accepted risk.

Authority: Per risk level

**Risk Register**

Inventory of identified vendor risks.

Maintenance: Continuous

### S

**Security Questionnaire**

Standardized assessment of vendor security.

Types: SIG, CAIQ, custom

**Service Level Agreement (SLA)**

Contractual performance commitments.

Components: Uptime, response time, support

**SOC 2**

Service Organization Control audit report.

Types: Type I (point-in-time), Type II (period)

**Sub-Processor**

Third party engaged by processor.

Requirement: Disclosure, contractual flow-down

### T

**Third Party**

External entity providing services or products.

Synonym: Vendor, supplier, partner

**TPRM (Third-Party Risk Management)**

Program for managing vendor risks.

Framework: This policy

### V

**Vendor**

External organization providing goods or services.

Scope: All third parties with access or data

**Vendor Risk Assessment**

Evaluation of risks from vendor relationship.

Output: Risk rating, required controls

---

# CYBERCUBE Vendor Risk Management Policy (v1)

**Standard ID:** POL-VEN-001  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Owner:** Security + Legal + Procurement  
**Applies to:** All third-party relationships

---

## 0. Purpose & Scope

This policy establishes the framework for identifying, assessing, and managing
risks associated with third-party vendors who have access to CYBERCUBE systems,
data, or facilities, or who provide critical services.

**Industry Alignment:**
- ISO/IEC 27001 (A.15 Supplier Relationships)
- SOC 2 Type II (CC9.2 Vendor Management)
- NIST Cybersecurity Framework (ID.SC)
- GDPR (Article 28 - Processors)
- PCI DSS (Requirement 12.8)

**This policy applies to:**
- All vendors with access to company systems
- All vendors processing company or customer data
- All vendors providing critical services
- All vendors with physical access to facilities
- SaaS and cloud service providers
- Contractors and consultants
- Partners with system integration

**Out of Scope:**
- One-time purchases without data/system access
- Standard utilities without data access
- General suppliers without integration
- Open-source libraries (governed by 2.2 Secure Coding Standard, not this policy)

**Clarification — Free-Tier SaaS:**
Free-tier SaaS tools that process company or customer data ARE in scope and must be classified. The absence of a paid contract does not remove risk. Examples: free Slack workspace storing internal discussions, free-tier analytics processing customer data.

**Goals:**
1. Identify and classify vendor risks
2. Ensure appropriate due diligence
3. Establish contractual protections
4. Monitor vendor security posture
5. Manage vendor lifecycle
6. Protect customer and company data

**Design Principles:**

1. **Risk-Based** — Assessment depth proportional to risk
2. **Comprehensive** — Cover security, privacy, operational risks
3. **Continuous** — Ongoing monitoring, not one-time
4. **Contractual** — Requirements in binding agreements
5. **Accountable** — Clear ownership throughout lifecycle

---

## 1. Vendor Classification

### 1.1 Classification Framework

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENDOR RISK CLASSIFICATION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIER 1 — CRITICAL                                                         │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: Vendors whose failure would significantly impact operations   │
│              or whose compromise would cause major harm                    │
│                                                                             │
│  Criteria (any one):                                                       │
│  • Processes or stores Restricted/Confidential customer data              │
│  • Has privileged access to production systems                            │
│  • Single point of failure for critical business function                 │
│  • Handles payment processing                                             │
│  • Provides core infrastructure (cloud, security)                         │
│                                                                             │
│  Examples: Cloud provider (GCP), payment processor (Stripe),              │
│            identity provider (Auth0), core SaaS (database)                │
│                                                                             │
│  TIER 2 — HIGH                                                             │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: Vendors with significant data access or operational role     │
│                                                                             │
│  Criteria (any one):                                                       │
│  • Processes or stores Internal/Confidential company data                 │
│  • Has access to production systems (non-privileged)                      │
│  • Provides important but replaceable services                            │
│  • Integrates with customer-facing systems                                │
│                                                                             │
│  Examples: CRM (Salesforce), email (SendGrid), monitoring tools,          │
│            customer support platform                                       │
│                                                                             │
│  TIER 3 — MODERATE                                                         │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: Vendors with limited data access or operational impact       │
│                                                                             │
│  Criteria:                                                                 │
│  • Processes or stores Internal company data only                         │
│  • No production system access                                            │
│  • Easily replaceable services                                            │
│  • Limited integration                                                    │
│                                                                             │
│  Examples: HR tools, marketing platforms, productivity tools,             │
│            development tools (non-production)                             │
│                                                                             │
│  TIER 4 — LOW                                                              │
│  ──────────────────────────────────────────────────────────────────────    │
│  Definition: Vendors with minimal risk exposure                           │
│                                                                             │
│  Criteria:                                                                 │
│  • No sensitive data access                                               │
│  • No system integration                                                  │
│  • Commodity services                                                     │
│  • No customer data exposure                                              │
│                                                                             │
│  Examples: Office supplies, general consulting (no data access),          │
│            standard subscriptions                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Classification Criteria Matrix

| Factor | Critical (T1) | High (T2) | Moderate (T3) | Low (T4) |
|--------|---------------|-----------|---------------|----------|
| **Customer data** | Restricted/Confidential | Internal | None | None |
| **Company data** | Confidential | Internal | Internal | Public only |
| **System access** | Privileged/Production | Production | Non-prod | None |
| **Business impact** | Severe | Significant | Moderate | Minimal |
| **Replaceability** | Difficult | Moderate | Easy | Trivial |
| **Integration depth** | Deep | Moderate | Light | None |

### 1.3 Classification Decision Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENDOR CLASSIFICATION DECISION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  START: Does vendor have access to customer data?                          │
│  │                                                                          │
│  ├── YES: Is it Restricted or Confidential?                                │
│  │   ├── YES ──────────────────────────────────────▶ TIER 1 (Critical)     │
│  │   └── NO (Internal only) ──────────────────────▶ TIER 2 (High)         │
│  │                                                                          │
│  └── NO: Does vendor have production system access?                        │
│      │                                                                      │
│      ├── YES: Privileged access?                                           │
│      │   ├── YES ──────────────────────────────────▶ TIER 1 (Critical)     │
│      │   └── NO ───────────────────────────────────▶ TIER 2 (High)        │
│      │                                                                      │
│      └── NO: Is vendor critical to operations?                             │
│          │                                                                  │
│          ├── YES: Single point of failure?                                 │
│          │   ├── YES ──────────────────────────────▶ TIER 1 (Critical)     │
│          │   └── NO ───────────────────────────────▶ TIER 2 (High)        │
│          │                                                                  │
│          └── NO: Does vendor have any system integration?                  │
│              │                                                              │
│              ├── YES ──────────────────────────────▶ TIER 3 (Moderate)     │
│              └── NO ───────────────────────────────▶ TIER 4 (Low)         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Requirements by Tier

| Requirement | T1 Critical | T2 High | T3 Moderate | T4 Low |
|-------------|-------------|---------|-------------|--------|
| **Security questionnaire** | Full SIG/Custom | Standard | Abbreviated | None |
| **SOC 2 / ISO cert** | Required | Required | Preferred | Not required |
| **DPA** | Required | If data | If data | Not required |
| **Security review** | Deep dive | Standard | Light | None |
| **Legal review** | Full | Standard | Light | Standard T&C |
| **Approval level** | Security + Legal + Exec | Security + Legal | Security | Procurement |
| **Review frequency** | Annual + continuous | Annual | Biennial | None |
| **Offboarding plan** | Detailed | Standard | Basic | Standard |

### 1.5 Vendor Concentration Risk

Vendor concentration risk occurs when CYBERCUBE is overly dependent on a single vendor for critical functions or when multiple critical vendors share the same jurisdiction or infrastructure.

**Requirements:**
- All Tier 1 vendors MUST have their concentration risk documented during assessment
- Tier 1 vendors that represent a single point of failure SHOULD have a documented contingency or alternative identified
- The vendor registry MUST track geographic jurisdiction for all Tier 1 and Tier 2 vendors
- Concentration risk MUST be reviewed as part of annual Tier 1 vendor reviews

**Concentration risk is elevated when:**
- A single vendor provides more than one critical function
- Multiple critical vendors share the same cloud infrastructure
- Tier 1 vendors operate exclusively in jurisdictions with regulatory instability

NOTE: Multi-vendor strategies are not required at this time. The goal is awareness and documentation, not immediate diversification.

---

## 2. Vendor Assessment Process

### 2.1 Assessment Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENDOR ASSESSMENT LIFECYCLE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. IDENTIFICATION                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Business need identified                                           │  │
│  │  • Initial vendor research                                            │  │
│  │  • Preliminary classification                                         │  │
│  │  • Assessment scope determined                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  2. DUE DILIGENCE                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Security questionnaire                                             │  │
│  │  • Documentation review (SOC 2, certs)                               │  │
│  │  • Technical assessment (if needed)                                   │  │
│  │  • Privacy assessment                                                 │  │
│  │  • Financial/operational review (if critical)                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  3. RISK EVALUATION                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Inherent risk assessment                                          │  │
│  │  • Control effectiveness evaluation                                   │  │
│  │  • Residual risk determination                                        │  │
│  │  • Risk acceptance or remediation                                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  4. CONTRACTING                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Security terms negotiation                                         │  │
│  │  • DPA execution (if applicable)                                      │  │
│  │  • SLA definition                                                     │  │
│  │  • Contract execution                                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  5. ONBOARDING                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Access provisioning                                                │  │
│  │  • Integration setup                                                  │  │
│  │  • Vendor registry entry                                              │  │
│  │  • Monitoring configuration                                           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  6. ONGOING MONITORING                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Periodic reassessment                                              │  │
│  │  • Continuous monitoring (critical)                                   │  │
│  │  • Incident tracking                                                  │  │
│  │  • Performance review                                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Security Questionnaire

#### 2.2.1 Questionnaire Types

| Type | Use For | Questions | Time |
|------|---------|-----------|------|
| **Full SIG/CAIQ** | Tier 1 Critical | 300+ | 2-4 weeks |
| **Standard Custom** | Tier 2 High | 80-150 | 1-2 weeks |
| **Abbreviated** | Tier 3 Moderate | 30-50 | 1 week |
| **None** | Tier 4 Low | N/A | N/A |

#### 2.2.2 Core Assessment Domains

| Domain | Topics | Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|--------|--------|
| **Security Governance** | Policies, leadership, risk management | Deep | Standard | Light |
| **Access Control** | Identity, authentication, authorization | Deep | Standard | Standard |
| **Data Protection** | Encryption, classification, handling | Deep | Standard | Light |
| **Network Security** | Architecture, segmentation, monitoring | Deep | Standard | Light |
| **Incident Response** | Detection, response, notification | Deep | Standard | Light |
| **Business Continuity** | Backup, DR, availability | Deep | Standard | Light |
| **Compliance** | Certifications, audits, regulations | Deep | Standard | Light |
| **HR Security** | Background checks, training | Standard | Standard | Light |
| **Physical Security** | Facilities, data centers | Standard | Light | Light |
| **Third-Party Management** | Their vendor management | Standard | Light | N/A |

#### 2.2.3 Sample Security Questions

```markdown
## Security Questionnaire - Core Questions

### Security Governance
1. Do you have a documented information security policy?
2. Is there executive leadership responsible for security?
3. Do you conduct regular risk assessments?
4. Do you have cyber insurance coverage?

### Access Control
5. Do you require MFA for all system access?
6. Do you follow least privilege principles?
7. How often do you review access rights?
8. Do you have a formal access provisioning/deprovisioning process?

### Data Protection
9. How is data encrypted at rest and in transit?
10. What data classification scheme do you use?
11. Where is data stored (geographically)?
12. How is customer data segregated?

### Incident Response
13. Do you have a documented incident response plan?
14. What is your breach notification timeline?
15. Have you experienced security incidents in the past 24 months?
16. Do you conduct incident response exercises?

### Compliance
17. Do you have SOC 2 Type II certification?
18. What other certifications do you hold?
19. When was your last external audit?
20. Are you GDPR compliant?
```

### 2.3 Documentation Requirements

| Document | T1 | T2 | T3 | T4 |
|----------|----|----|----|----|
| **SOC 2 Type II** | Required | Required | Preferred | — |
| **ISO 27001 cert** | Preferred | Preferred | — | — |
| **Penetration test** | Required (annual) | Preferred | — | — |
| **Security policy** | Required | Required | — | — |
| **Privacy policy** | Required | Required | Required | — |
| **DPA/BAA** | Required | If applicable | If applicable | — |
| **Insurance cert** | Required | Required | — | — |
| **Business continuity** | Required | Preferred | — | — |

### 2.4 Risk Rating

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENDOR RISK RATING                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INHERENT RISK (Before Controls)                                           │
│  ──────────────────────────────────────────────────────────────────────    │
│  Factors:                                                                   │
│  • Data sensitivity (what data do they access?)                           │
│  • Data volume (how much?)                                                │
│  • System access (what can they do?)                                      │
│  • Business criticality (how important?)                                  │
│  • Integration depth (how connected?)                                     │
│  • Geographic location (jurisdiction risks?)                              │
│                                                                             │
│  CONTROL EFFECTIVENESS                                                     │
│  ──────────────────────────────────────────────────────────────────────    │
│  Evaluation:                                                               │
│  • Strong: Comprehensive controls, validated                              │
│  • Adequate: Good controls, minor gaps                                    │
│  • Weak: Significant gaps or concerns                                     │
│  • Inadequate: Major deficiencies                                        │
│                                                                             │
│  RESIDUAL RISK MATRIX                                                      │
│  ──────────────────────────────────────────────────────────────────────    │
│                                                                             │
│  Inherent Risk   │ Strong    │ Adequate  │ Weak      │ Inadequate         │
│  ────────────────┼───────────┼───────────┼───────────┼──────────────────  │
│  Critical        │ High      │ High      │ Critical  │ Unacceptable       │
│  High            │ Moderate  │ High      │ High      │ Critical           │
│  Moderate        │ Low       │ Moderate  │ High      │ High               │
│  Low             │ Low       │ Low       │ Moderate  │ Moderate           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Risk Acceptance Authority

| Residual Risk | Approval Required |
|---------------|-------------------|
| **Low** | Security Team |
| **Moderate** | Security Lead + Business Owner |
| **High** | CISO/CTO + Legal |
| **Critical** | Executive Team |
| **Unacceptable** | Cannot proceed without remediation |

### 2.6 Expedited Vendor Onboarding

For urgent business needs, an expedited assessment path is available with appropriate guardrails.

**Eligibility:** Business-critical need with documented urgency and executive sponsor.

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Business owner submits expedited request with justification | Day 0 |
| 2 | Preliminary classification (tier determination) | Day 0 |
| 3 | Abbreviated security assessment (core domains only) | 1-3 days |
| 4 | Temporary approval by Security Lead + Business Owner | Day 3 |
| 5 | Vendor onboarded with monitoring | Day 3-5 |
| 6 | Full assessment completed | Within 30 days |
| 7 | Final approval or remediation/offboarding | Within 45 days |

**Constraints:**
- Expedited path is NOT available for Tier 1 Critical vendors — full assessment required
- Temporary approval is valid for 30 days maximum
- Vendor access is limited to minimum necessary during temporary period
- Executive sponsor must accept interim risk in writing
- If full assessment reveals unacceptable risk, offboarding begins immediately

### 2.7 Fourth-Party / Sub-Processor Management

Vendors often rely on their own vendors (fourth parties / sub-processors), extending the risk chain. CYBERCUBE must have visibility into this extended supply chain.

**Requirements by tier:**

| Requirement | T1 Critical | T2 High | T3 Moderate | T4 Low |
|-------------|-------------|---------|-------------|--------|
| Sub-processor list required | Yes | Yes | No | No |
| Prior approval of new sub-processors | Yes | Notification | No | No |
| Flow-down of security requirements | Required | Required | Preferred | No |
| Right to object to sub-processor | Yes | Yes | No | No |
| Sub-processor audit rights | Preferred | No | No | No |

**Sub-processor change process:**
1. Vendor notifies CYBERCUBE of intended sub-processor change (minimum 30 days for T1, 14 days for T2)
2. Security team assesses the sub-processor's impact on risk posture
3. CYBERCUBE approves, objects, or requests additional information
4. If objection is sustained and vendor proceeds, CYBERCUBE reserves right to terminate

**Contractual provisions:**
- DPA MUST include sub-processor clause for T1 and T2 vendors
- Vendor remains fully liable for sub-processor actions
- Sub-processor list MUST be maintained and available upon request

---

## 3. Contractual Requirements

### 3.1 Standard Contract Terms

| Requirement | T1 | T2 | T3 | T4 | Description |
|-------------|----|----|----|----|-------------|
| **Security standards** | ✓ | ✓ | ✓ | — | Maintain reasonable security |
| **Incident notification** | ✓ | ✓ | ✓ | — | Notify within 48h of awareness of confirmed or suspected incident |
| **Audit rights** | ✓ | ✓ | — | — | Right to audit or review SOC 2 |
| **Subcontractor controls** | ✓ | ✓ | — | — | Flow-down requirements |
| **Data handling** | ✓ | ✓ | ✓ | — | Per data classification |
| **Termination rights** | ✓ | ✓ | ✓ | ✓ | For cause, convenience |
| **Data return/deletion** | ✓ | ✓ | ✓ | — | On termination |
| **Insurance minimums** | ✓ | ✓ | — | — | Cyber, E&O coverage |
| **Compliance obligations** | ✓ | ✓ | ✓ | — | Applicable regulations |
| **Confidentiality** | ✓ | ✓ | ✓ | ✓ | NDA or confidentiality clause |

### 3.2 Data Processing Agreement (DPA)

**Required when:** Vendor processes personal data on CYBERCUBE's behalf.

**Key Terms:**

| Term | Requirement |
|------|-------------|
| **Processing purpose** | Clearly defined, limited |
| **Data types** | Specified categories |
| **Instructions** | Process only on documented instructions |
| **Confidentiality** | Personnel bound to confidentiality |
| **Security measures** | Appropriate technical/organizational measures |
| **Sub-processors** | Prior approval, flow-down |
| **Data subject rights** | Assistance with requests |
| **Deletion/return** | On termination |
| **Audit** | Allow audits or provide attestation |
| **Breach notification** | Without undue delay |
| **International transfers** | SCCs if applicable |

### 3.3 Service Level Agreement (SLA)

| Component | T1 Critical | T2 High | T3+ |
|-----------|-------------|---------|-----|
| **Uptime** | 99.9%+ | 99.5%+ | Per service |
| **Response time** | Defined | Defined | — |
| **Support hours** | 24/7 | Business hours | Standard |
| **Incident response** | < 1 hour | < 4 hours | Standard |
| **Credits** | Required | Preferred | — |
| **Termination rights** | For SLA breach | For material breach | Standard |

### 3.4 Security Addendum Template

```markdown
## Security Requirements Addendum

### 1. Security Standards
Vendor shall maintain security controls consistent with:
- Industry best practices
- SOC 2 Type II criteria (or equivalent)
- Applicable laws and regulations

### 2. Access Control
- Implement least privilege access
- Require MFA for system access
- Conduct regular access reviews
- Promptly deprovision terminated personnel

### 3. Data Protection
- Encrypt data at rest (AES-256 or equivalent)
- Encrypt data in transit (TLS 1.2+)
- Implement data classification
- Maintain data segregation

### 4. Incident Response
- Maintain documented incident response plan
- Notify CYBERCUBE within 48 hours of becoming aware of confirmed or suspected security incident
- Cooperate in incident investigation
- Provide incident report within 72 hours

### 5. Personnel Security
- Conduct background checks (as permitted by law)
- Provide security awareness training
- Maintain confidentiality obligations

### 6. Business Continuity
- Maintain business continuity/disaster recovery plans
- Test plans at least annually
- Maintain backups with defined RPO/RTO

### 7. Compliance
- Maintain required certifications
- Provide audit reports upon request
- Notify of compliance issues

### 8. Subcontractors
- Obtain prior approval for subcontractors
- Flow down security requirements
- Remain responsible for subcontractor compliance
```

---

## 4. Periodic Reviews

### 4.1 Review Schedule

| Tier | Frequency | Scope | Trigger Events |
|------|-----------|-------|----------------|
| **T1 Critical** | Annual + Continuous | Full reassessment | Any change, incident |
| **T2 High** | Annual | Standard reassessment | Material change, incident |
| **T3 Moderate** | Biennial | Light review | Incident, contract renewal |
| **T4 Low** | Contract renewal | Reconfirm classification | Incident |

### 4.2 Annual Review Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANNUAL VENDOR REVIEW                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DOCUMENTATION REFRESH                                                  │
│  ├── Request updated SOC 2 report                                         │
│  ├── Request updated certifications                                        │
│  ├── Review any security incident reports                                  │
│  └── Obtain updated insurance certificates                                 │
│                                                                             │
│  2. QUESTIONNAIRE UPDATE                                                   │
│  ├── Send focused update questionnaire (changes only)                     │
│  │   OR                                                                    │
│  ├── Full questionnaire if significant changes                            │
│  └── Review responses for material changes                                │
│                                                                             │
│  3. PERFORMANCE REVIEW                                                     │
│  ├── Review SLA compliance                                                │
│  ├── Review incident history                                              │
│  ├── Assess business relationship                                         │
│  └── Gather stakeholder feedback                                          │
│                                                                             │
│  4. RISK REASSESSMENT                                                      │
│  ├── Revalidate classification                                            │
│  ├── Update risk rating                                                   │
│  ├── Identify new risks                                                   │
│  └── Document any risk acceptances                                        │
│                                                                             │
│  5. ACTION ITEMS                                                           │
│  ├── Address any gaps identified                                          │
│  ├── Update contract if needed                                            │
│  ├── Communicate findings to stakeholders                                 │
│  └── Update vendor registry                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Continuous Monitoring (Critical Vendors)

| Activity | Frequency | Source |
|----------|-----------|--------|
| **Security news monitoring** | Continuous | News, alerts |
| **Breach database check** | Monthly | HaveIBeenPwned, etc. |
| **Rating service check** | Quarterly | SecurityScorecard, BitSight |
| **SOC 2 report review** | Upon issuance | Vendor |
| **Subcontractor changes** | Upon notification | Vendor |
| **SLA performance** | Monthly | Service data |
| **Incident review** | Per incident | Internal, vendor |

### 4.4 Triggered Reviews

| Trigger | Action | Timeline |
|---------|--------|----------|
| **Vendor security incident** | Assess impact, full review | Immediate |
| **Vendor breach (public)** | Contact vendor, assess impact | 24 hours |
| **Significant service change** | Reassess scope, controls | Before change |
| **Contract renewal** | Full periodic review | 60 days before |
| **Acquisition of vendor** | Reassess new entity | 30 days |
| **Regulatory change** | Assess compliance impact | Per regulation |
| **Internal incident involving vendor** | Root cause, vendor review | Per incident |

### 4.5 Vendor Incident Response

When a vendor experiences a security incident that may affect CYBERCUBE data or systems, the following process applies. For full incident response procedures, see 4.3 Incident Response Standard.

**Vendor incident response process:**

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Receive vendor notification or detect incident | Security Team | T+0 |
| 2 | Assess potential impact on CYBERCUBE data/systems | Security Team | Within 4 hours |
| 3 | Classify severity (SEV-1 through SEV-4) | Security Lead | Within 4 hours |
| 4 | If SEV-1/SEV-2: Declare incident, invoke Incident Response Standard | Incident Commander | Immediately |
| 5 | Contact vendor for detailed information and timeline | Security Team | Within 24 hours |
| 6 | Determine customer notification obligations | Security + Legal | Within 24 hours |
| 7 | Implement protective measures (credential rotation, access review) | Security + Engineering | Per severity |
| 8 | Monitor vendor remediation progress | Security Team | Ongoing |
| 9 | Obtain vendor incident report and root cause analysis | Security Team | Within 30 days |
| 10 | Full vendor reassessment if warranted | Security Team | Within 60 days |

**Impact assessment criteria:**
- Was CYBERCUBE customer data exposed or potentially exposed?
- Was CYBERCUBE system access compromised?
- Were credentials, keys, or tokens potentially compromised?
- Is the vendor's service availability affected?
- Are there regulatory notification obligations?

**Protective measures by severity:**

| Severity | Measures |
|----------|----------|
| **SEV-1 (Critical)** | Immediately rotate credentials, restrict vendor access, consider service isolation, invoke incident response |
| **SEV-2 (High)** | Rotate credentials within 24h, review vendor access logs, increased monitoring |
| **SEV-3 (Medium)** | Review access, monitor for anomalies, request vendor status updates |
| **SEV-4 (Low)** | Log incident, monitor vendor communications, review at next periodic assessment |

---

## 5. Offboarding

### 5.1 Offboarding Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENDOR OFFBOARDING PROCESS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. INITIATION                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Decision to terminate (business or cause)                          │  │
│  │  • Formal termination notice per contract                            │  │
│  │  • Transition planning initiated                                      │  │
│  │  • Stakeholders notified                                              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  2. ACCESS REVOCATION                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Disable all vendor accounts                                        │  │
│  │  • Revoke API keys and tokens                                         │  │
│  │  • Remove from SSO/identity systems                                   │  │
│  │  • Remove VPN access                                                  │  │
│  │  • Revoke physical access (if applicable)                            │  │
│  │  • Remove from communication channels                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  3. DATA HANDLING                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Request data export/return                                         │  │
│  │  • Verify data received                                               │  │
│  │  • Request deletion confirmation                                      │  │
│  │  • Obtain deletion certificate                                        │  │
│  │  • Verify deletion (if audit rights)                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  4. INTEGRATION REMOVAL                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Disconnect API integrations                                        │  │
│  │  • Remove from internal systems                                       │  │
│  │  • Update DNS/network configurations                                  │  │
│  │  • Remove dependencies in code                                        │  │
│  │  • Update documentation                                               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              │                                              │
│                              ▼                                              │
│  5. CLOSURE                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  • Update vendor registry (status: terminated)                        │  │
│  │  • Archive vendor documentation                                       │  │
│  │  • Final invoices/payments                                            │  │
│  │  • Lessons learned (if significant vendor)                           │  │
│  │  • Close vendor record                                                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Offboarding Checklist

```markdown
## Vendor Offboarding Checklist

### Vendor: _________________ Termination Date: _____________

### 1. Notification & Planning
- [ ] Termination notice sent per contract
- [ ] Transition plan documented
- [ ] Stakeholders notified
- [ ] Timeline established

### 2. Access Revocation
- [ ] User accounts disabled
- [ ] API keys/tokens revoked
- [ ] SSO/SAML disconnected
- [ ] VPN access removed
- [ ] Physical access badges collected
- [ ] Shared credentials rotated
- [ ] Removed from Slack/Teams channels
- [ ] Removed from email distribution lists

### 3. Data Handling
- [ ] Data export requested
- [ ] Data export received and verified
- [ ] Deletion requested
- [ ] Deletion confirmation received
- [ ] Certificate of destruction obtained

### 4. Integration Removal
- [ ] API connections disabled
- [ ] Webhooks removed
- [ ] DNS entries updated
- [ ] Network rules removed
- [ ] Code dependencies removed/replaced
- [ ] Documentation updated

### 5. Financial & Administrative
- [ ] Final invoices processed
- [ ] Deposits/prepayments reconciled
- [ ] Contract filed (retention)
- [ ] Vendor registry updated

### 6. Closure
- [ ] All checklist items complete
- [ ] Offboarding documented
- [ ] Vendor record archived

### Sign-off
- **IT/Security:** _________________ Date: _______
- **Business Owner:** _________________ Date: _______
- **Procurement:** _________________ Date: _______
```

### 5.3 Data Return & Deletion

| Requirement | Timeline | Evidence |
|-------------|----------|----------|
| **Data export request** | Per contract (typically 30 days) | Written request |
| **Data export delivery** | Per contract | Export files |
| **Deletion request** | Upon export confirmation | Written request |
| **Deletion completion** | Per contract (typically 30-90 days) | Vendor confirmation |
| **Deletion certificate** | Upon completion | Signed certificate |

**Deletion Certificate Must Include:**
- Date of deletion
- Scope of data deleted
- Method of deletion
- Attestation of completeness
- Confirmation of backup deletion

---

## 6. Vendor Registry

### 6.1 Registry Requirements

| Field | Required | Description |
|-------|----------|-------------|
| Vendor name | Yes | Legal entity name |
| Vendor ID | Yes | Internal identifier |
| Primary contact | Yes | Vendor contact |
| Business owner | Yes | Internal owner |
| Classification tier | Yes | T1-T4 |
| Services provided | Yes | Description |
| Data access | Yes | Types of data accessed |
| System access | Yes | Systems accessed |
| Contract dates | Yes | Start, end, renewal |
| Risk rating | Yes | Current rating |
| Last assessment | Yes | Date |
| Next review date | Yes | Scheduled |
| SOC 2 expiration | If applicable | Report end date |
| DPA status | Yes | Yes/No/NA |
| Status | Yes | Active/Inactive/Terminated |

### 6.2 Registry Maintenance

| Activity | Frequency | Owner |
|----------|-----------|-------|
| **New vendor entry** | Upon onboarding | Procurement + Security |
| **Status updates** | As changes occur | Business owner |
| **Assessment dates** | After assessment | Security |
| **Contract updates** | Upon renewal/change | Procurement |
| **Quarterly audit** | Quarterly | Security |
| **Annual validation** | Annual | Business owners |

---

## 7. Roles & Responsibilities

### 7.1 RACI Matrix

| Activity | Security | Legal | Procurement | Business Owner |
|----------|----------|-------|-------------|----------------|
| Vendor identification | C | I | R | A |
| Classification | A | C | I | R |
| Security assessment | R/A | C | I | C |
| Contract negotiation | C | A | R | C |
| DPA execution | C | A | R | I |
| Onboarding | R | I | R | A |
| Periodic review | R/A | C | I | C |
| Continuous monitoring | R/A | I | I | I |
| Offboarding | R | C | R | A |

### 7.2 Escalation Path

| Issue | First Contact | Escalation |
|-------|---------------|------------|
| Assessment delays | Procurement | Security Lead |
| Security concerns | Security Team | CISO/CTO |
| Contract issues | Legal | General Counsel |
| Vendor incidents | Security Team | Incident Response |
| Business disputes | Business Owner | Department Head |

---

## 8. Prohibited Practices

The following practices are PROHIBITED:

| Practice | Reason | Alternative |
|----------|--------|-------------|
| Engaging vendors without assessment | Unknown risk exposure | Complete assessment before access/data sharing |
| Sharing employee credentials with vendors | Accountability loss, audit failure | Provision dedicated vendor accounts |
| Granting production access without Security approval | Uncontrolled privileged access | Follow assessment and approval process |
| Skipping offboarding steps | Lingering access, data retention | Complete offboarding checklist |
| Signing contracts without Security/Legal review (T1/T2) | Missing security terms | Route through approval workflow |
| Allowing vendors to self-classify | Conflict of interest | Internal classification by Security team |
| Using personal accounts for vendor SaaS | No organizational control | Use company-managed accounts |
| Ignoring vendor breach notifications | Delayed response, increased impact | Invoke vendor incident response process immediately |
| Storing vendor credentials in plaintext | Credential exposure | Use secrets management tool |
| Bypassing the expedited process for urgency | Unassessed risk in production | Use expedited onboarding path with guardrails |

---

## Quick Reference Card

Print it. Keep it handy.

### Vendor Tiers

| Tier | Data/Access | Review |
|------|-------------|--------|
| T1 Critical | Customer data, privileged | Annual + continuous |
| T2 High | Production access, integration | Annual |
| T3 Moderate | Internal data, limited | Biennial |
| T4 Low | No sensitive access | Contract renewal |

### Assessment Requirements

```
T1: Full SIG + SOC 2 + Deep review
T2: Standard questionnaire + SOC 2
T3: Abbreviated questionnaire
T4: Classification only
```

### Required Documents by Tier

| Document | T1 | T2 | T3 | T4 |
|----------|----|----|----|----|
| SOC 2 | ✓ | ✓ | — | — |
| DPA | ✓ | If data | If data | — |
| Security questionnaire | Full | Standard | Light | — |

### Offboarding Essentials

```
□ Revoke all access
□ Rotate shared credentials
□ Request data deletion
□ Get deletion certificate
□ Update registry
```

### Key Contacts

```
Security: security@cybercube.software
Legal: legal@cybercube.software
Procurement: procurement@cybercube.software
```

---

## Implementation Status

**Last Updated:** 2026-02-07  
**Policy Version:** v1.1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Policy document | COMPLETE | This policy |
| Classification framework | COMPLETE | Defined |
| Security questionnaire | PARTIAL | Customize SIG |
| Vendor registry | PENDING | Select tooling |
| Periodic review schedule | PENDING | Implement calendar |
| Offboarding checklist | COMPLETE | Defined |
| Concentration risk tracking | PENDING | Document T1 vendors |
| Fourth-party/sub-processor tracking | PENDING | Collect sub-processor lists |
| Vendor incident response process | COMPLETE | Defined |
| Expedited onboarding process | COMPLETE | Defined |
| Training | PENDING | Develop module |

### Migration Path

1. **Phase 1**: Classify all existing vendors into tiers; build initial vendor registry
2. **Phase 2**: Customize security questionnaire (SIG-based); collect T1 SOC 2 reports
3. **Phase 3**: Execute DPAs for all T1/T2 vendors processing personal data
4. **Phase 4**: Collect T1 sub-processor lists; document concentration risks
5. **Phase 5**: Implement periodic review calendar (T1 annual, T2 annual)
6. **Phase 6**: Deploy continuous monitoring for T1 vendors (rating services, news alerts)
7. **Phase 7**: Develop and deliver vendor management training for stakeholders

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
| v1.1 | 2026-02-07 | Added: concentration risk (1.5), expedited onboarding (2.6), fourth-party management (2.7), vendor incident response (4.5), prohibited practices (8). Fixed: email domain, breach notification clarity, free-tier SaaS scope, related documents. Added migration path |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| 2.1 CYBERCUBE-Security-Policy-v1 | Security framework |
| 2.2 CYBERCUBE-Secure-Coding-Standard-v1 | Open-source library governance |
| 3.3 CYBERCUBE-Data-Classification-Retention-Standard-v1 | Data handling requirements |
| 3.6 CYBERCUBE-DPA-Standard-Template-v1 | Processing agreement template |
| 3.2 CYBERCUBE-Privacy-Handling-Policy-v1 | Privacy requirements |
| 4.1 CYBERCUBE-Business-Continuity-Plan-v1 | Vendor continuity planning |
| 4.3 CYBERCUBE-Incident-Response-Standard-v1 | Vendor incident escalation |
| 4.6 CYBERCUBE-Service-Level-Policy-v1 | SLA alignment |
| 1.2 CYBERCUBE-Standards-Governance-Policy-v1 | Compliance, reviews |
