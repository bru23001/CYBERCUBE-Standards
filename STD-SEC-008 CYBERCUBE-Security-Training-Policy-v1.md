Glossary

This glossary defines key terms used throughout the CYBERCUBE Security
Training Policy.

All definitions are normative unless stated otherwise.

### A

**Awareness**

General knowledge of security risks and responsibilities.

Distinction: Broader than training, ongoing reinforcement

**Assessment**

Evaluation of knowledge or skills.

Types: Quiz, practical exercise, simulation

### B

**Baseline Training**

Foundational security training required for all personnel.

Synonym: Core training, mandatory training

### C

**Cadence**

Frequency or schedule of recurring activities.

Example: Annual, quarterly, monthly

**Certification**

Formal recognition of completing training requirements.

Evidence: Certificate, completion record

**Completion Rate**

Percentage of required personnel who completed training.

Target: 100% within deadline

### D

**Drill**

Practical exercise simulating a real scenario.

Types: Phishing simulation, incident response drill

### E

**Effectiveness**

Measure of training impact on behavior or knowledge.

Metrics: Quiz scores, simulation results, incident rates

### L

**Learning Management System (LMS)**

Platform for delivering and tracking training.

Functions: Content delivery, tracking, reporting

### M

**Microlearning**

Brief, focused learning content.

Duration: 3-10 minutes

**Module**

Self-contained unit of training content.

Structure: Lesson, quiz, completion

### O

**Onboarding**

Initial training for new personnel.

Timing: Before or during first week

### P

**Phishing**

Social engineering attack via deceptive messages.

Goal: Steal credentials, deliver malware, gain access

**Phishing Simulation**

Controlled exercise testing phishing awareness.

Purpose: Training, measurement, reinforcement

### R

**Refresher**

Updated or repeated training on previously covered topics.

Purpose: Reinforce, update, maintain awareness

**Remediation**

Additional training required after failure.

Trigger: Failed assessment, simulation failure

**Role-Based Training**

Training specific to job function or access level.

Examples: Developer security, admin security, manager security

### S

**Security Awareness**

Understanding of security threats and proper behavior.

Goal: Security-conscious culture

**Simulation**

Realistic exercise mimicking real-world scenarios.

Types: Phishing, social engineering, incident response

### T

**Training**

Structured learning to develop knowledge or skills.

Delivery: Online, in-person, self-paced, instructor-led

---

CYBERCUBE Security Training Policy (v1)

**Standard ID:** STD-SEC-008
**Status:** Active
**Effective:** 2026-01-17
**Classification:** INTERNAL
**Owner:** Security Team + HR
**Applies to:** All employees, contractors, and authorized users

---

## 0. Purpose & Scope

This policy establishes CYBERCUBE's security training and awareness program
to ensure all personnel have the knowledge and skills to protect company
and customer data from security threats.

**Industry Alignment:**

- ISO/IEC 27001 (A.7.2.2 Information Security Awareness)
- SOC 2 Type II (CC1.4 Security Awareness)
- NIST Cybersecurity Framework (PR.AT)
- PCI DSS (Requirement 12.6)
- GDPR Article 39 (Awareness training)

**This policy applies to:**

- All employees (full-time, part-time, temporary)
- Contractors and consultants with system access
- Vendors with access to company systems
- Third parties handling company or customer data

**Goals:**

1. Build a security-aware culture
2. Reduce human-factor security risks
3. Meet compliance requirements
4. Prepare personnel to recognize and respond to threats
5. Continuously improve security posture

**Design Principles:**

1. **Universal** — Everyone receives security training
2. **Relevant** — Training appropriate to role and risk
3. **Engaging** — Interactive, practical, memorable
4. **Measured** — Track completion and effectiveness
5. **Continuous** — Ongoing reinforcement, not one-time

---

## 1. Training Program Structure

### 1.1 Training Categories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY TRAINING CATEGORIES                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BASELINE TRAINING (All Personnel)                                         │
│  ├── Security Awareness Fundamentals                                       │
│  ├── Phishing & Social Engineering                                         │
│  ├── Password & Authentication Security                                    │
│  ├── Data Handling & Classification                                        │
│  ├── Physical Security                                                     │
│  ├── Remote Work Security                                                  │
│  ├── Incident Reporting                                                    │
│  └── Acceptable Use Policy                                                 │
│                                                                             │
│  ROLE-BASED TRAINING (By Function)                                         │
│  ├── Engineering: Secure coding, OWASP, dependency security               │
│  ├── Operations: Infrastructure security, access management               │
│  ├── Customer-facing: Customer data handling, privacy                     │
│  ├── Finance: Financial fraud, payment security                           │
│  ├── HR: Personnel security, confidentiality                              │
│  ├── Management: Security leadership, incident management                 │
│  └── Executives: Strategic risk, crisis management                        │
│                                                                             │
│  SPECIALIZED TRAINING (By Access/Role)                                     │
│  ├── Privileged Access: Admin security, elevated responsibilities         │
│  ├── Production Access: Production security, change management            │
│  ├── Customer Data: Privacy, data protection, GDPR/CCPA                   │
│  ├── Security Team: Advanced threat detection, incident response          │
│  └── Incident Responders: IR procedures, forensics basics                 │
│                                                                             │
│  COMPLIANCE TRAINING (As Required)                                         │
│  ├── GDPR Awareness                                                        │
│  ├── CCPA/CPRA Requirements                                               │
│  ├── SOC 2 Controls                                                        │
│  ├── Industry-Specific (as applicable)                                    │
│  └── Customer-Required Training                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Training Matrix

| Audience         | Baseline    | Role-Based              | Specialized       | Compliance  |
| ---------------- | ----------- | ----------------------- | ----------------- | ----------- |
| All Employees    | ✓ Required | By role                 | By access         | As required |
| Engineering      | ✓          | Secure Development      | Production Access | SOC 2       |
| SRE/DevOps       | ✓          | Infrastructure Security | Privileged Access | SOC 2       |
| Customer Success | ✓          | Customer Data Handling  | Customer Data     | GDPR/CCPA   |
| Sales            | ✓          | Customer Data Handling  | —                | GDPR/CCPA   |
| Finance          | ✓          | Financial Security      | —                | SOC 2       |
| HR               | ✓          | Personnel Security      | —                | GDPR        |
| Security Team    | ✓          | All Technical           | All               | All         |
| Managers         | ✓          | Security Leadership     | By team           | As required |
| Executives       | ✓          | Executive Security      | Crisis Management | As required |
| Contractors      | ✓          | By role                 | By access         | As required |

---

## 2. Training Cadence

### 2.1 Training Schedule

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TRAINING CADENCE REQUIREMENTS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ONBOARDING (Before/During First Week)                                     │
│  ├── Security Awareness Fundamentals ──────────── Required Day 1          │
│  ├── Acceptable Use Policy ─────────────────────── Required Day 1          │
│  ├── Data Classification & Handling ────────────── Required Week 1         │
│  ├── Phishing Awareness ────────────────────────── Required Week 1         │
│  └── Role-Based Training ───────────────────────── Required First 30 days  │
│                                                                             │
│  ANNUAL (Every 12 Months)                                                  │
│  ├── Security Awareness Refresher ─────────────── All personnel           │
│  ├── Policy Acknowledgment ─────────────────────── All personnel           │
│  ├── Role-Based Refresher ──────────────────────── By role                 │
│  ├── Compliance Training Updates ───────────────── As required             │
│  └── Annual Assessment ─────────────────────────── All personnel           │
│                                                                             │
│  QUARTERLY                                                                  │
│  ├── Phishing Simulation ───────────────────────── All personnel           │
│  ├── Security Newsletter/Update ────────────────── All personnel           │
│  └── Microlearning Module ──────────────────────── All personnel           │
│                                                                             │
│  MONTHLY                                                                    │
│  ├── Security Tips/Reminders ───────────────────── All personnel           │
│  └── Threat Briefing (optional) ────────────────── Security-aware roles    │
│                                                                             │
│  AS NEEDED                                                                  │
│  ├── New Threat Training ───────────────────────── When threats emerge     │
│  ├── Incident Lessons Learned ──────────────────── After incidents         │
│  ├── Policy Update Training ────────────────────── When policies change    │
│  ├── Remediation Training ──────────────────────── After failures          │
│  └── Promotion/Role Change ─────────────────────── New responsibilities    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Completion Deadlines

| Training Type        | Deadline        | Grace Period    | Escalation         |
| -------------------- | --------------- | --------------- | ------------------ |
| Onboarding (Day 1)   | First day       | None            | Manager + HR       |
| Onboarding (Week 1)  | 7 days          | +3 days         | Manager            |
| Onboarding (30 days) | 30 days         | +7 days         | Manager + HR       |
| Annual Refresher     | Anniversary     | +14 days        | Manager            |
| Quarterly Modules    | End of quarter  | +7 days         | Manager            |
| Compliance Training  | Per requirement | Per requirement | Compliance         |
| Remediation          | 7 days          | None            | Manager + Security |

### 2.3 Training Calendar

| Month               | Activities                                 |
| ------------------- | ------------------------------------------ |
| **January**   | Annual planning, Q1 phishing simulation    |
| **February**  | Security awareness month kickoff           |
| **March**     | Q1 microlearning, compliance review        |
| **April**     | Q2 phishing simulation                     |
| **May**       | Privacy awareness (GDPR anniversary)       |
| **June**      | Q2 microlearning, mid-year assessment      |
| **July**      | Q3 phishing simulation                     |
| **August**    | Secure development focus                   |
| **September** | Q3 microlearning, compliance review        |
| **October**   | Cybersecurity Awareness Month, Q4 phishing |
| **November**  | Annual training refresh begins             |
| **December**  | Q4 microlearning, year-end completion push |

---

## 3. Baseline Training Curriculum

### 3.1 Core Modules (All Personnel)

| Module                                  | Duration | Topics                                               | Assessment       |
| --------------------------------------- | -------- | ---------------------------------------------------- | ---------------- |
| **Security Fundamentals**         | 45 min   | Threat landscape, security mindset, responsibilities | Quiz (80%)       |
| **Phishing & Social Engineering** | 30 min   | Recognition, reporting, examples                     | Quiz + scenarios |
| **Password & Authentication**     | 20 min   | Strong passwords, MFA, password managers             | Quiz (80%)       |
| **Data Handling**                 | 30 min   | Classification, handling rules, encryption           | Quiz + scenarios |
| **Physical Security**             | 15 min   | Clean desk, visitor policy, device security          | Quiz (80%)       |
| **Remote Work Security**          | 20 min   | Home network, VPN, device security                   | Quiz (80%)       |
| **Incident Reporting**            | 15 min   | What to report, how to report, no blame              | Quiz (80%)       |
| **Acceptable Use**                | 20 min   | Policy overview, dos/don'ts, consequences            | Acknowledgment   |

**Total Baseline Training:** ~3.5 hours (initial), ~2 hours (annual refresher)

### 3.2 Module Details

#### 3.2.1 Security Fundamentals

```markdown
## Module: Security Fundamentals

### Learning Objectives
By the end of this module, you will be able to:
- Explain why security matters to CYBERCUBE
- Identify common security threats
- Describe your security responsibilities
- Recognize security-conscious behavior

### Topics Covered
1. The Security Landscape
   - Why attackers target companies like ours
   - Real-world breach examples
   - Impact of security incidents

2. Your Role in Security
   - Security is everyone's job
   - The human factor in security
   - Creating a security culture

3. Key Security Principles
   - Least privilege
   - Defense in depth
   - Never trust, always verify
   - When in doubt, ask

4. Security Responsibilities
   - Protecting credentials
   - Handling data appropriately
   - Reporting incidents
   - Staying vigilant

### Assessment
- 10 multiple choice questions
- Passing score: 80%
- Unlimited retakes
```

#### 3.2.2 Phishing & Social Engineering

```markdown
## Module: Phishing & Social Engineering

### Learning Objectives
By the end of this module, you will be able to:
- Recognize phishing attempts
- Identify social engineering tactics
- Respond appropriately to suspicious messages
- Report phishing attempts correctly

### Topics Covered
1. What is Phishing?
   - Email phishing
   - Spear phishing
   - Smishing (SMS)
   - Vishing (voice)
   - Business Email Compromise (BEC)

2. Recognition Techniques
   - Sender verification
   - URL inspection
   - Attachment caution
   - Urgency red flags
   - Request verification

3. Social Engineering Tactics
   - Authority
   - Urgency
   - Fear
   - Curiosity
   - Helpfulness exploitation

4. Response Procedures
   - Don't click, don't reply
   - Report to security
   - Verify through other channels
   - When to escalate

### Interactive Elements
- Real phishing examples (anonymized)
- "Spot the phish" exercises
- Reporting practice

### Assessment
- Scenario-based questions
- Identify red flags
- Passing score: 80%
```

---

## 4. Role-Based Training

### 4.1 Engineering & Development

| Module                                 | Audience          | Duration | Topics                                                                                     |
| -------------------------------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------ |
| **Secure Coding Fundamentals**   | All developers    | 2 hours  | OWASP Top 10, secure coding principles                                                     |
| **Input Validation & Injection** | All developers    | 1 hour   | SQL injection, XSS, command injection                                                      |
| **Authentication & Session**     | All developers    | 1 hour   | Auth security, session management                                                          |
| **Dependency Security**          | All developers    | 30 min   | Supply chain, vulnerability scanning                                                       |
| **Secrets Management**           | All developers    | 30 min   | Handling credentials, secrets in code                                                      |
| **CYBERCUBE Standards Overview** | All developers    | 1 hour   | Secure Coding (STD-SEC-002), Auth (STD-SEC-003), AuthZ (STD-SEC-004), Crypto (STD-SEC-005) |
| **Security Code Review**         | Senior developers | 1 hour   | Reviewing for security issues                                                              |
| **Threat Modeling**              | Tech leads        | 2 hours  | STRIDE, threat modeling process                                                            |

### 4.2 Operations & Infrastructure

| Module                                 | Audience   | Duration | Topics                                                                               |
| -------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------ |
| **Infrastructure Security**      | SRE/DevOps | 2 hours  | Cloud security, network security                                                     |
| **Access Management**            | SRE/DevOps | 1 hour   | IAM, least privilege, access reviews                                                 |
| **Logging & Monitoring**         | SRE/DevOps | 1 hour   | Security logging, alert response                                                     |
| **Incident Response**            | SRE/DevOps | 2 hours  | IR procedures, communication                                                         |
| **Privileged Access Security**   | Admins     | 1 hour   | Admin responsibilities, audit                                                        |
| **CYBERCUBE Standards Overview** | SRE/DevOps | 1 hour   | AuthZ (STD-SEC-004), Crypto (STD-SEC-005), Vuln Mgmt (STD-SEC-006), IR (STD-SEC-007) |

### 4.3 Customer-Facing Roles

| Module                               | Audience            | Duration | Topics                              |
| ------------------------------------ | ------------------- | -------- | ----------------------------------- |
| **Customer Data Handling**     | All customer-facing | 1 hour   | Data protection, access limits      |
| **Privacy Fundamentals**       | All customer-facing | 1 hour   | GDPR/CCPA basics, customer rights   |
| **Secure Communication**       | Support/Success     | 30 min   | Verifying customers, secure sharing |
| **Social Engineering Defense** | Support             | 30 min   | Recognizing manipulation attempts   |

### 4.4 Management & Leadership

| Module                         | Audience        | Duration | Topics                                  |
| ------------------------------ | --------------- | -------- | --------------------------------------- |
| **Security Leadership**  | All managers    | 1 hour   | Leading security culture, team security |
| **Incident Management**  | All managers    | 1 hour   | Manager role in incidents               |
| **Security Metrics**     | Senior managers | 30 min   | Understanding security metrics          |
| **Crisis Communication** | Executives      | 1 hour   | Communication during incidents          |
| **Security Governance**  | Executives      | 1 hour   | Board reporting, risk decisions         |

### 4.5 Role-Based Training Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ROLE-BASED TRAINING REQUIREMENTS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Role                    │ Required Modules                     │ Hours    │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Software Engineer       │ Secure Coding, Input Validation,     │ 6        │
│                          │ Auth & Session, Dependencies,        │          │
│                          │ Secrets, CYBERCUBE Standards          │          │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Senior Engineer         │ Above + Security Code Review         │ 7        │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Tech Lead               │ Above + Threat Modeling              │ 9        │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  SRE/DevOps              │ Infrastructure, Access Mgmt,         │ 7        │
│                          │ Logging, IR, CYBERCUBE Standards      │          │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  System Admin            │ Above + Privileged Access            │ 8        │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Customer Support        │ Customer Data, Privacy, Secure       │ 3        │
│                          │ Communication, Social Engineering    │          │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Customer Success        │ Customer Data, Privacy, Secure       │ 2.5      │
│                          │ Communication                        │          │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Sales                   │ Customer Data, Privacy               │ 2        │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Manager                 │ Security Leadership, Incident Mgmt   │ 2        │
│  ────────────────────────┼──────────────────────────────────────┼────────  │
│  Executive               │ Security Leadership, Crisis Comm,    │ 3        │
│                          │ Security Governance                  │          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. New Hire Onboarding

### 5.1 Onboarding Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURITY ONBOARDING TIMELINE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRE-START (Before Day 1)                                                  │
│  ├── Welcome email with security expectations                              │
│  ├── LMS account created                                                   │
│  └── Pre-reading materials sent (optional)                                 │
│                                                                             │
│  DAY 1                                                                     │
│  ├── Security Fundamentals module ──────────────────────── 45 min         │
│  ├── Acceptable Use Policy acknowledgment ──────────────── 20 min         │
│  ├── Credential setup with MFA ─────────────────────────── IT assisted    │
│  └── Device security configuration ─────────────────────── IT assisted    │
│                                                                             │
│  WEEK 1                                                                    │
│  ├── Phishing & Social Engineering module ──────────────── 30 min         │
│  ├── Password & Authentication module ──────────────────── 20 min         │
│  ├── Data Handling module ──────────────────────────────── 30 min         │
│  ├── Incident Reporting module ───────────────────────────── 15 min         │
│  ├── Remote Work Security (if applicable) ──────────────── 20 min         │
│  └── Physical Security (if office-based) ───────────────── 15 min         │
│                                                                             │
│  FIRST 30 DAYS                                                             │
│  ├── Role-based training (per role matrix) ─────────────── Variable       │
│  ├── Specialized training (if applicable) ──────────────── Variable       │
│  ├── Compliance training (if required) ─────────────────── Variable       │
│  ├── Security mentor check-in ──────────────────────────── 30 min         │
│  └── First phishing simulation (educational) ───────────── Surprise       │
│                                                                             │
│  FIRST 90 DAYS                                                             │
│  ├── Complete all assigned training ────────────────────── Checkpoint     │
│  ├── Security Q&A session ──────────────────────────────── Optional       │
│  └── Full integration into simulation program ──────────── Ongoing        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Onboarding Checklist

```markdown
## Security Onboarding Checklist

### Employee: _________________ Start Date: _____________

### Day 1 Requirements
- [ ] LMS account activated
- [ ] Security Fundamentals module completed
- [ ] Acceptable Use Policy acknowledged
- [ ] MFA configured on primary account
- [ ] Device encryption verified
- [ ] Endpoint protection installed
- [ ] Password manager setup

### Week 1 Requirements
- [ ] Phishing & Social Engineering module completed
- [ ] Password & Authentication module completed
- [ ] Data Handling module completed
- [ ] Incident Reporting module completed
- [ ] Email security features reviewed (recognizing spoofing indicators)

### First 30 Days
- [ ] All baseline modules completed
- [ ] Role-based training assigned
- [ ] Role-based training started
- [ ] Security mentor introduced
- [ ] Added to security communications

### First 90 Days
- [ ] All role-based training completed
- [ ] Specialized training completed (if applicable)
- [ ] First phishing simulation received
- [ ] Security Q&A attended (optional)
- [ ] Full onboarding complete

### Sign-off
- **Employee:** _________________ Date: _______
- **Manager:** _________________ Date: _______
- **Security:** _________________ Date: _______
```

### 5.3 Contractor Onboarding

| Timeline      | Requirements                              |
| ------------- | ----------------------------------------- |
| Before access | Security Fundamentals, AUP acknowledgment |
| First week    | Phishing, Data Handling, role-specific    |
| Ongoing       | Quarterly simulations, annual refresher   |

**Contractor-Specific Topics:**

- Scope of authorized access
- Data handling restrictions
- Reporting requirements
- Termination procedures

---

## 6. Phishing Simulations

### 6.1 Simulation Program

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHISHING SIMULATION PROGRAM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PURPOSE                                                                   │
│  ├── Train employees to recognize phishing                                 │
│  ├── Measure organizational awareness                                      │
│  ├── Identify high-risk individuals for remediation                        │
│  ├── Reinforce training with practical experience                          │
│  └── Track improvement over time                                           │
│                                                                             │
│  FREQUENCY                                                                 │
│  ├── Organization-wide: Quarterly (4x/year)                               │
│  ├── Targeted (high-risk roles): Monthly                                   │
│  ├── Remediation: Within 7 days of failure                                │
│  └── New hires: Within first 30 days                                       │
│                                                                             │
│  DIFFICULTY PROGRESSION                                                    │
│  ├── Q1: Basic indicators (obvious red flags)                             │
│  ├── Q2: Moderate (fewer obvious indicators)                              │
│  ├── Q3: Advanced (sophisticated, targeted)                               │
│  └── Q4: Mixed difficulty assessment                                       │
│                                                                             │
│  SIMULATION TYPES                                                          │
│  ├── Credential harvest (fake login pages)                                │
│  ├── Malicious attachment (simulated)                                     │
│  ├── Malicious link                                                       │
│  ├── Business email compromise                                            │
│  ├── SMS phishing (smishing)                                              │
│  └── Voice phishing (vishing) — targeted only                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Simulation Scenarios

| Scenario Type                  | Description                     | Difficulty |
| ------------------------------ | ------------------------------- | ---------- |
| **IT Password Reset**    | Fake password reset request     | Basic      |
| **HR Benefits Update**   | Fake HR notification            | Basic      |
| **Package Delivery**     | Fake shipping notification      | Basic      |
| **Executive Request**    | Fake request from leadership    | Moderate   |
| **Invoice/Payment**      | Fake invoice or payment request | Moderate   |
| **Shared Document**      | Fake file sharing notification  | Moderate   |
| **LinkedIn Connection**  | Fake social media notification  | Moderate   |
| **Vendor Communication** | Impersonating known vendor      | Advanced   |
| **Internal IT Alert**    | Sophisticated internal-looking  | Advanced   |
| **Targeted Spear Phish** | Role-specific, researched       | Advanced   |

### 6.3 Response Handling

| Action                          | Classification | Follow-up                                                  |
| ------------------------------- | -------------- | ---------------------------------------------------------- |
| **Reported** (correct)    | Pass           | Positive reinforcement, recognition                        |
| **Ignored** (no action)   | Neutral        | General awareness reminder                                 |
| **Clicked link**          | Fail           | Immediate training, flag for monitoring                    |
| **Submitted credentials** | Critical fail  | Immediate training, credential reset, manager notification |
| **Opened attachment**     | Fail           | Immediate training, flag for monitoring                    |
| **Replied with info**     | Critical fail  | Immediate training, manager notification                   |

### 6.4 Remediation Program

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHISHING REMEDIATION PROCESS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FIRST FAILURE                                                             │
│  ├── Immediate educational content displayed                               │
│  ├── "Why this was phishing" explanation                                  │
│  ├── 15-minute remediation module assigned                                │
│  ├── Completion required within 7 days                                    │
│  └── Tracked but no escalation                                            │
│                                                                             │
│  SECOND FAILURE (within 12 months)                                         │
│  ├── Above + 30-minute advanced phishing training                         │
│  ├── Manager notified                                                      │
│  ├── Increased simulation frequency (monthly)                             │
│  └── Security team outreach                                               │
│                                                                             │
│  THIRD FAILURE (within 12 months)                                          │
│  ├── Above + 1:1 with security team                                       │
│  ├── Manager meeting required                                             │
│  ├── Customized training plan                                             │
│  ├── Weekly simulations for 4 weeks                                       │
│  └── Document in personnel file                                           │
│                                                                             │
│  CONTINUED FAILURES                                                        │
│  ├── HR involvement                                                       │
│  ├── Access restrictions considered                                       │
│  ├── Performance improvement plan                                         │
│  └── Potential disciplinary action                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.5 Metrics & Reporting

| Metric                           | Target                | Frequency      |
| -------------------------------- | --------------------- | -------------- |
| **Click rate**             | < 5%                  | Per simulation |
| **Report rate**            | > 70%                 | Per simulation |
| **Credential submission**  | < 2%                  | Per simulation |
| **Remediation completion** | 100% within deadline  | Weekly         |
| **Repeat offender rate**   | < 10%                 | Quarterly      |
| **Improvement trend**      | Decreasing click rate | Quarterly      |

---

## 7. Training Delivery

### 7.1 Delivery Methods

| Method                           | Use Case                       | Advantages                    |
| -------------------------------- | ------------------------------ | ----------------------------- |
| **Online self-paced**      | Baseline, most role-based      | Scalable, trackable, flexible |
| **Virtual instructor-led** | Complex topics, Q&A needed     | Interactive, clarification    |
| **In-person workshop**     | Hands-on skills, team building | Engagement, practice          |
| **Microlearning**          | Reinforcement, quick updates   | Low friction, frequent        |
| **Videos**                 | Demonstrations, scenarios      | Visual, memorable             |
| **Simulations**            | Practical skills               | Realistic experience          |
| **Games/quizzes**          | Engagement, assessment         | Fun, competitive              |

### 7.2 Learning Management System (LMS)

**LMS Requirements:**

- Host all training content
- Track completion and scores
- Automate assignments and reminders
- Generate compliance reports
- Support SCORM content
- Mobile-friendly access
- SSO integration

**LMS Capabilities:**

| Feature                       | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| **Auto-assignment**     | Assign training based on role/start date |
| **Deadline tracking**   | Monitor completion deadlines             |
| **Reminder automation** | Send reminders before deadlines          |
| **Escalation**          | Notify managers of overdue training      |
| **Reporting**           | Completion rates, scores, trends         |
| **Certificates**        | Generate completion certificates         |
| **Audit trail**         | Evidence for compliance                  |

### 7.3 Content Development

| Source                      | Use For                               |
| --------------------------- | ------------------------------------- |
| **Vendor content**    | Baseline awareness, compliance basics |
| **Custom content**    | Company-specific policies, procedures |
| **Internal examples** | Anonymized real incidents             |
| **Industry content**  | Threat updates, best practices        |

**Content Update Schedule:**

| Content Type       | Review Frequency | Update Trigger                |
| ------------------ | ---------------- | ----------------------------- |
| Baseline modules   | Annual           | Policy changes, new threats   |
| Role-based         | Annual           | Technology changes, incidents |
| Phishing scenarios | Quarterly        | Emerging techniques           |
| Compliance         | Per regulation   | Regulation updates            |
| Quick tips         | Monthly          | Current events, seasonal      |

---

## 8. Effectiveness Measurement

### 8.1 Training Metrics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TRAINING EFFECTIVENESS METRICS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COMPLETION METRICS                                                        │
│  ├── Overall completion rate ─────────────────── Target: 100%             │
│  ├── On-time completion rate ─────────────────── Target: >95%             │
│  ├── Onboarding completion rate ──────────────── Target: 100%             │
│  └── Role-based completion rate ──────────────── Target: 100%             │
│                                                                             │
│  KNOWLEDGE METRICS                                                         │
│  ├── Average assessment score ─────────────────── Target: >85%            │
│  ├── First-attempt pass rate ──────────────────── Target: >80%            │
│  ├── Knowledge retention (retest) ─────────────── Target: >80%            │
│  └── Score improvement over time ──────────────── Target: Increasing      │
│                                                                             │
│  BEHAVIOR METRICS                                                          │
│  ├── Phishing simulation click rate ───────────── Target: <5%             │
│  ├── Phishing report rate ─────────────────────── Target: >70%            │
│  ├── Security incident reports ────────────────── Target: Increasing      │
│  ├── Policy violations ────────────────────────── Target: Decreasing      │
│  └── Repeat offender rate ─────────────────────── Target: <10%            │
│                                                                             │
│  OUTCOME METRICS                                                           │
│  ├── Human-factor incidents ───────────────────── Target: Decreasing      │
│  ├── Time to report incidents ─────────────────── Target: Decreasing      │
│  ├── Security culture survey scores ───────────── Target: Improving       │
│  └── Audit findings (training) ────────────────── Target: Zero            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Reporting

| Report                         | Audience          | Frequency |
| ------------------------------ | ----------------- | --------- |
| **Completion dashboard** | HR, Security      | Real-time |
| **Overdue report**       | Managers          | Weekly    |
| **Department summary**   | Department heads  | Monthly   |
| **Executive summary**    | Leadership        | Quarterly |
| **Compliance report**    | Compliance, Audit | As needed |
| **Annual effectiveness** | Board, Executive  | Annual    |

### 8.3 Program Review

| Review Activity    | Frequency          | Participants               |
| ------------------ | ------------------ | -------------------------- |
| Content review     | Quarterly          | Security + Training        |
| Metrics review     | Monthly            | Security                   |
| Program assessment | Annual             | Security + HR + Leadership |
| External benchmark | Annual             | Security                   |
| Audit              | Per audit schedule | Compliance                 |

---

## 9. Compliance & Documentation

### 9.1 Compliance Requirements

| Requirement         | Evidence                            | Retention                        |
| ------------------- | ----------------------------------- | -------------------------------- |
| SOC 2 (CC1.4)       | Completion records, policy          | 7 years                          |
| ISO 27001 (A.7.2.2) | Training records, awareness program | 3 years                          |
| GDPR (Art. 39)      | Privacy training records            | Duration of employment + 3 years |
| PCI DSS (12.6)      | Security training records           | 1 year                           |
| Customer contracts  | As specified                        | Per contract                     |

### 9.2 Documentation Requirements

| Document                      | Purpose                 | Retention               |
| ----------------------------- | ----------------------- | ----------------------- |
| **Training policy**     | Define requirements     | Current + prior version |
| **Completion records**  | Prove training occurred | 7 years                 |
| **Assessment scores**   | Prove knowledge         | 7 years                 |
| **Acknowledgments**     | Prove policy acceptance | Employment + 3 years    |
| **Simulation results**  | Prove testing           | 3 years                 |
| **Remediation records** | Document follow-up      | 3 years                 |

### 9.3 Audit Evidence Package

```markdown
## Security Training Audit Evidence

### Policy & Program
- [ ] Current Security Training Policy
- [ ] Training curriculum documentation
- [ ] Role-based training matrix
- [ ] Onboarding procedures

### Completion Evidence
- [ ] LMS completion report (all personnel)
- [ ] On-time completion rates
- [ ] Overdue resolution documentation
- [ ] New hire completion verification

### Assessment Evidence
- [ ] Assessment score reports
- [ ] Pass/fail rates
- [ ] Remediation records

### Simulation Evidence
- [ ] Phishing simulation schedule
- [ ] Simulation results (aggregated)
- [ ] Click rates and trends
- [ ] Remediation for failures

### Acknowledgments
- [ ] Policy acknowledgment records
- [ ] Date-stamped acknowledgments
- [ ] Version acknowledged
```

---

## Quick Reference Card

Print it. Keep it handy.

### Training Requirements

| Who        | What              | When                   |
| ---------- | ----------------- | ---------------------- |
| All        | Baseline          | Onboarding + Annual    |
| All        | Phishing sim      | Quarterly              |
| By role    | Role-based        | 30 days + Annual       |
| Privileged | Privileged access | Before access + Annual |

### Onboarding Timeline

```
Day 1: Security Fundamentals + AUP
Week 1: Phishing, Passwords, Data
30 days: Role-based training
90 days: All training complete
```

### Phishing Response

```
✓ Don't click links
✓ Don't open attachments
✓ Report to #security-incidents
✓ Forward to phishing@cybercube.io
✓ When in doubt, ask
```

### Key Contacts

```
Training questions: training@cybercube.io
Security questions: security@cybercube.io
Report phishing: phishing@cybercube.io
LMS support: lms-help@cybercube.io
```

### Completion Deadlines

```
Day 1 training: No grace period
Week 1 training: +3 days grace
Role-based: +7 days grace
Annual refresh: +14 days grace
Remediation: 7 days, no grace
```

---

## Implementation Status

**Last Updated:** 2026-01-17
**Policy Version:** v1

### Core Implementation

| Component              | Status   | Notes               |
| ---------------------- | -------- | ------------------- |
| Policy document        | COMPLETE | This policy         |
| LMS selection          | PENDING  | Evaluate platforms  |
| Baseline curriculum    | PARTIAL  | Core content needed |
| Role-based content     | PENDING  | Develop per role    |
| Phishing platform      | PENDING  | Select vendor       |
| Onboarding integration | PENDING  | HR process update   |
| Reporting dashboard    | PENDING  | Build or configure  |
| Annual calendar        | PENDING  | Schedule            |

---

## Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |

---

## Related Documents

| Document                                                        | Relationship                            |
| --------------------------------------------------------------- | --------------------------------------- |
| CYBERCUBE Security Policy (STD-SEC-001)                         | Overall security framework              |
| CYBERCUBE Secure Coding Standard (STD-SEC-002)                  | Secure development training content     |
| CYBERCUBE Authentication & Identity Standard (STD-SEC-003)      | Authentication training content         |
| CYBERCUBE Authorization & Access Control Standard (STD-SEC-004) | Access control training content         |
| CYBERCUBE Cryptography & Key Management Standard (STD-SEC-005)  | Cryptography training content           |
| CYBERCUBE Vulnerability Management Standard (STD-SEC-006)       | Vulnerability handling training content |
| CYBERCUBE Security Incident Response Standard (STD-SEC-007)     | Reporting procedures                    |
| Acceptable Use Policy                                           | Policy to be trained on                 |
| Data Classification Standard                                    | Data handling training                  |
| Privacy Handling Policy                                         | Privacy training content                |




┌─────────────────────────────────────────────────────────────────────────────┐
│        CYBERCUBE SECURITY TRAINING & AWARENESS — DIRECTIVE BLOCK            │
├─────────────────────────────────────────────────────────────────────────────┤
│ AUTHORITY                                                                   │
│ Standard ID: STD-SEC-008                                                     │
│ Owner: Security Team + HR                                                    │
│ Applies to: ALL employees, contractors, vendors with system/data access     │
│ Binding: MANDATORY                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PURPOSE                                                                     │
│ Ensure all personnel possess role-appropriate security knowledge and        │
│ behaviors to reduce human-factor risk and meet regulatory obligations.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ GOVERNING PRINCIPLES                                                        │
│ • Universal coverage                                                        │
│ • Role- and risk-based relevance                                            │
│ • Continuous reinforcement                                                  │
│ • Measurable effectiveness                                                  │
│ • Audit-grade evidence                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ TRAINING CATEGORIES (MANDATORY)                                              │
│ • Baseline: all personnel                                                   │
│ • Role-Based: by job function                                               │
│ • Specialized: by access/privilege                                          │
│ • Compliance: regulatory/customer-driven                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ BASELINE TRAINING (ALL PERSONNEL)                                           │
│ • Security fundamentals                                                     │
│ • Phishing & social engineering                                             │
│ • Passwords & MFA                                                          │
│ • Data handling & classification                                            │
│ • Physical & remote work security                                           │
│ • Incident reporting                                                        │
│ • Acceptable Use Policy acknowledgment                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ ROLE-BASED & SPECIALIZED TRAINING                                           │
│ • Engineering: secure coding, OWASP, secrets                                │
│ • Ops/SRE: infrastructure, access mgmt, IR                                  │
│ • Customer-facing: privacy, customer data                                   │
│ • Privileged/Prod access: elevated responsibility                            │
│ • Leadership: security leadership, crisis management                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ TRAINING CADENCE                                                            │
│ • Onboarding: Day 1 → Week 1 → 30 days                                      │
│ • Annual: refreshers + policy acknowledgment                                 │
│ • Quarterly: phishing simulations + microlearning                            │
│ • Monthly: security reminders                                               │
│ • As-needed: incidents, new threats, role change                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHISHING SIMULATION PROGRAM                                                  │
│ • Org-wide quarterly; high-risk roles monthly                                │
│ • Difficulty progression enforced                                           │
│ • Failure triggers remediation                                              │
│ • Repeated failure escalates to management/HR                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ ASSESSMENT & REMEDIATION                                                     │
│ • Passing score ≥80%                                                        │
│ • Unlimited retakes allowed                                                 │
│ • Failed assessments require remediation ≤7 days                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ DELIVERY & LMS REQUIREMENTS                                                  │
│ • Central LMS REQUIRED                                                      │
│ • Auto-assignment by role/start date                                        │
│ • Deadline tracking & escalation                                            │
│ • Reporting and certificates                                                │
│ • Audit trail preserved                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ METRICS (MANDATORY)                                                         │
│ • Completion rate (target: 100%)                                            │
│ • On-time completion (>95%)                                                 │
│ • Assessment scores (>85% avg)                                              │
│ • Phishing click rate (<5%)                                                 │
│ • Report rate (>70%)                                                        │
│ • Repeat failure rate (<10%)                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ COMPLIANCE & ENFORCEMENT                                                     │
│ • Non-completion escalates to management/HR                                 │
│ • Access restriction permitted for non-compliance                           │
│ • Evidence retained per audit schedule                                      │
│ • Aligned with Security Policy, ERM, IR                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ REVIEW & MAINTENANCE                                                         │
│ • Annual review MINIMUM                                                     │
│ • Update upon policy, threat, or regulatory change                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ OUTCOME                                                                     │
│ • Security-aware culture                                                    │
│ • Reduced human-factor risk                                                 │
│ • Continuous compliance                                                     │
│ • Audit-ready training evidence                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE SECURITY TRAINING — COMPLIANCE MATRIX (0–5)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                               │
│ 0 = Not defined                                                             │
│ 1 = Defined only                                                            │
│ 2 = Partially implemented                                                   │
│ 3 = Implemented (baseline compliant)                                        │
│ 4 = Enforced, measured                                                      │
│ 5 = Institutionalized, audited                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ T1 — GOVERNANCE & OWNERSHIP                                                 │
│ • Policy owner defined                                                     │
│ • HR/Security accountability                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ T2 — SCOPE & COVERAGE                                                       │
│ • All personnel included                                                   │
│ • Contractors/vendors covered                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ T3 — BASELINE TRAINING                                                      │
│ • Core modules delivered                                                   │
│ • Onboarding deadlines met                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ T4 — ROLE-BASED & SPECIALIZED TRAINING                                      │
│ • Role mapping enforced                                                    │
│ • Privileged access training                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ T5 — TRAINING CADENCE                                                       │
│ • Annual refreshers                                                       │
│ • Ongoing reinforcement                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ T6 — PHISHING SIMULATION PROGRAM                                            │
│ • Regular simulations                                                     │
│ • Difficulty progression & remediation                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ T7 — ASSESSMENT & REMEDIATION                                               │
│ • Assessments scored                                                      │
│ • Failures remediated                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ T8 — LMS & EVIDENCE                                                         │
│ • Central LMS                                                             │
│ • Audit trail retained                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ T9 — METRICS & EFFECTIVENESS                                                │
│ • Completion & score tracking                                             │
│ • Behavior metrics (phish rate, reports)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ T10 — ENFORCEMENT & ESCALATION                                              │
│ • Overdue escalation                                                      │
│ • Access restriction applied if needed                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                │
│ • Max: 50                                                                 │
│ • ≥45 = Training-Mature                                                    │
│ • 36–44 = Managed                                                          │
│ • 28–35 = Elevated human-risk                                               │
│ • <28 = Unacceptable                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ HARD FAIL CONDITIONS                                                       │
│ • T2 < 3 (Incomplete coverage)                                            │
│ • T3 < 3 (Baseline not enforced)                                          │
│ • T8 < 3 (No auditable evidence)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
