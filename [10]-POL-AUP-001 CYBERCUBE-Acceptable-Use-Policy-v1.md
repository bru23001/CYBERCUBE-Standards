# CYBERCUBE Acceptable Use Policy (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Acceptable
Use Policy.

All definitions are normative unless stated otherwise.

### A

**Acceptable Use**

Use of company resources consistent with this policy and business purposes.

Standard: Reasonable, professional, lawful

**Account**

User identity for accessing systems.

Components: Username, credentials, permissions

**Asset**

Any company-owned or managed resource.

Types: Hardware, software, data, services

### B

**BYOD (Bring Your Own Device)**

Personal devices used for work purposes.

Requirement: Must comply with device policy

### C

**Company Resources**

All systems, devices, data, and services provided or managed by CYBERCUBE.

Ownership: Company property

**Confidential Information**

Information requiring protection from unauthorized disclosure.

Classification: Per Data Classification Standard

### D

**Data**

Any information stored, processed, or transmitted via company resources.

Types: Company data, customer data, personal data

**Device**

Hardware used to access company resources.

Types: Laptops, phones, tablets, workstations

### I

**Incident**

Security event or policy violation.

Response: Per Incident Response Standard

### M

**Malware**

Software designed to harm or exploit systems.

Types: Viruses, ransomware, trojans, spyware

**Misuse**

Use of company resources contrary to this policy.

Consequence: Disciplinary action

**Monitoring**

Observation and recording of system activity.

Purpose: Security, compliance, performance

### P

**Personal Use**

Use of company resources for non-business purposes.

Allowance: Limited, reasonable, per policy

**Privileged Access**

Elevated permissions beyond standard user access.

Requirement: Additional responsibilities

### S

**Sensitive Data**

Data requiring special protection.

Examples: PII, financial data, credentials

**System**

Any computing resource provided by the company.

Types: Servers, applications, networks, cloud services

### U

**Unauthorized Access**

Access without proper authorization.

Violation: Serious policy breach

**User**

Any person accessing company resources.

Types: Employees, contractors, vendors

---

# CYBERCUBE Acceptable Use Policy (v1)

**Standard ID:** POL-AUP-001  
**Status:** Active  
**Effective:** 2026-01-17  
**Owner:** Director of Engineering  
**Next Review:** 2027-01-17  
**Classification:** INTERNAL  
**Applies to:** All employees, contractors, and authorized users

---

## 0. Purpose & Scope

This Acceptable Use Policy (AUP) defines the rules for using CYBERCUBE's
information technology resources. It protects the company, employees,
customers, and partners by establishing clear expectations for appropriate
system and data usage.

**Industry Alignment:**
- ISO/IEC 27001:2022 (A.5.10 Acceptable Use, A.6.2 Terms of Employment)
- SOC 2 Type II (Common Criteria)
- NIST Cybersecurity Framework
- GDPR (Accountability requirements)
- Standard corporate governance practices

**This policy applies to:**
- All employees (full-time, part-time, temporary)
- Contractors and consultants
- Vendors with system access
- Any person using CYBERCUBE resources

**Resources covered:**
- All company-provided hardware and devices
- All company software and applications
- All company data and information
- Company networks and internet access
- Cloud services and SaaS applications
- Communication systems (email, messaging, phone)
- Personal devices used for work (BYOD)

**Design Principles:**

1. **Trust** — We trust employees to use good judgment
2. **Security** — Security is everyone's responsibility
3. **Respect** — Respect for others, property, and data
4. **Accountability** — Actions have consequences
5. **Transparency** — Clear rules, fair enforcement

---

## 1. General Principles

### 1.1 Ownership & Privacy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OWNERSHIP & PRIVACY EXPECTATIONS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COMPANY RESOURCES                                                         │
│  ├── All company-provided equipment is company property                    │
│  ├── All data on company systems is company property                       │
│  ├── Company reserves the right to access any company resource             │
│  └── No expectation of personal privacy on company systems                 │
│                                                                             │
│  MONITORING                                                                │
│  ├── Company may monitor system usage without notice                       │
│  ├── Monitoring includes email, browsing, files, messages                  │
│  ├── Monitoring is for security, compliance, and business purposes         │
│  └── Monitoring data retained per Retention Standard                       │
│                                                                             │
│  YOUR RESPONSIBILITY                                                       │
│  ├── You are responsible for activities under your account                 │
│  ├── You must protect your credentials                                     │
│  ├── You must report suspected misuse                                      │
│  └── You must comply with this policy                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 User Responsibilities

All users must:

| Responsibility | Description |
|----------------|-------------|
| **Protect credentials** | Keep passwords secure, use MFA, never share |
| **Protect data** | Handle data per classification, encrypt sensitive data |
| **Report incidents** | Report security issues, policy violations, suspicious activity |
| **Stay current** | Complete security training, read policy updates |
| **Use professionally** | Use resources for business purposes |
| **Comply with law** | Follow all applicable laws and regulations |
| **Respect others** | No harassment, discrimination, or inappropriate conduct |

### 1.3 Acknowledgment Requirement

All users must acknowledge this policy:
- Upon hire/engagement
- Annually during security awareness training
- Upon material policy updates

Acknowledgment confirms understanding and agreement to comply.

---

## 2. System Access Rules

### 2.1 Account Management

| Rule | Requirement |
|------|-------------|
| **One account per person** | No shared accounts except designated service accounts |
| **Unique credentials** | Each account has unique, personal credentials |
| **Strong passwords** | Meet password requirements per Security Standard |
| **MFA required** | Multi-factor authentication on all accounts |
| **Minimum access** | Only permissions needed for role (least privilege) |
| **Access reviews** | Quarterly review of access rights |
| **Prompt deprovisioning** | Access revoked upon termination/role change |

### 2.2 Authentication Requirements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION REQUIREMENTS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSWORDS                                                                  │
│  ├── Minimum 12 characters                                                 │
│  ├── Mix of upper, lower, numbers, symbols                                 │
│  ├── No dictionary words or personal info                                  │
│  ├── Unique per system (no reuse)                                         │
│  ├── Changed immediately if compromised or suspected compromised           │
│  ├── Periodic rotation is NOT required (per NIST 800-63B guidance)         │
│  └── Stored only in approved password manager                              │
│                                                                             │
│  MULTI-FACTOR AUTHENTICATION                                               │
│  ├── Required for all company systems                                      │
│  ├── Approved methods: Authenticator app, hardware key                     │
│  ├── SMS/phone MFA: Discouraged, use only if no alternative               │
│  └── Backup codes: Store securely, report if compromised                   │
│                                                                             │
│  SESSION SECURITY                                                          │
│  ├── Lock screen when away (auto-lock: 5 minutes)                         │
│  ├── Log out of shared/public systems                                      │
│  ├── Don't save passwords in browsers (use password manager)               │
│  └── Close sensitive sessions when done                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Access Authorization

| Access Type | Authorization Required | Approval |
|-------------|------------------------|----------|
| **Standard user** | HR + Manager | Automatic via onboarding |
| **Elevated access** | Manager + System owner | Request form |
| **Admin access** | Manager + IT Security + System owner | Request + justification |
| **Production access** | Manager + Engineering Lead + Security | Request + training |
| **Customer data access** | Manager + Compliance + Need documented | Formal request |
| **Vendor access** | Vendor manager + IT Security | Contract + NDA |

### 2.4 Remote Access

| Requirement | Description |
|-------------|-------------|
| **VPN required** | Use company VPN for accessing internal systems |
| **Secure network** | No sensitive work on public WiFi without VPN |
| **Approved devices** | Only company or approved BYOD devices |
| **Endpoint protection** | Device must meet security requirements |
| **Physical security** | Screen not visible to others in public |
| **Session timeout** | Remote sessions auto-terminate after inactivity |

---

## 3. Device Usage

### 3.1 Company-Provided Devices

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMPANY DEVICE REQUIREMENTS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SECURITY CONFIGURATION                                                    │
│  ├── Full disk encryption enabled                                          │
│  ├── Endpoint protection (antivirus/EDR) installed                        │
│  ├── Automatic updates enabled                                             │
│  ├── Firewall enabled                                                      │
│  ├── Screen lock configured (max 5 min timeout)                           │
│  └── Company MDM enrolled (if applicable)                                  │
│                                                                             │
│  SOFTWARE                                                                   │
│  ├── Only approved software installed                                      │
│  ├── No pirated or unlicensed software                                    │
│  ├── Browser extensions: Only approved                                     │
│  ├── Updates applied promptly                                              │
│  └── Admin rights: Only with IT approval                                  │
│                                                                             │
│  PHYSICAL SECURITY                                                         │
│  ├── Never leave unattended in public                                      │
│  ├── Don't check in luggage when traveling                                │
│  ├── Store securely when not in use                                        │
│  ├── Report loss/theft immediately                                         │
│  └── Return upon termination                                               │
│                                                                             │
│  MODIFICATIONS                                                              │
│  ├── No hardware modifications without IT approval                         │
│  ├── No disabling security features                                        │
│  ├── No jailbreaking/rooting                                              │
│  └── No unauthorized repairs                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 BYOD (Personal Devices)

Personal devices may be used for work only if:

| Requirement | Description |
|-------------|-------------|
| **Approval** | Pre-approved by IT |
| **Registration** | Registered with IT Security |
| **Security standards** | Meets minimum security requirements |
| **MDM consent** | Consent to mobile device management (if required) |
| **Separation** | Work data in managed container (if applicable) |
| **Wipe consent** | Consent to remote wipe of work data |
| **Updates** | OS and apps kept current |
| **Encryption** | Device encryption enabled |

**BYOD Minimum Requirements:**

| Requirement | iOS | Android | Laptop |
|-------------|-----|---------|--------|
| OS version | Current or N-1 | Current or N-1 | Current or N-1 |
| Encryption | ✓ | ✓ | ✓ |
| Screen lock | ✓ (PIN/biometric) | ✓ (PIN/biometric) | ✓ |
| MDM enrolled | As required | As required | As required |
| Jailbroken/rooted | Not allowed | Not allowed | N/A |

### 3.3 Mobile Devices

| Rule | Requirement |
|------|-------------|
| **Screen lock** | Biometric or 6+ digit PIN |
| **Encryption** | Device encryption enabled |
| **Remote wipe** | Find My Device / remote wipe enabled |
| **App sources** | Official app stores only |
| **Work apps** | Only approved work apps |
| **Lost/stolen** | Report immediately |

### 3.4 Removable Media

| Media Type | Policy |
|------------|--------|
| **USB drives** | Company-provided only, encrypted |
| **External drives** | IT-approved, encrypted |
| **SD cards** | Not for sensitive data |
| **CDs/DVDs** | Rarely needed, secure disposal |

**Restrictions:**
- No confidential data on personal removable media
- Scan all external media before use
- Encrypt any sensitive data on removable media
- Secure disposal when no longer needed

---

## 4. Acceptable Activities

### 4.1 Permitted Use

Company resources may be used for:

| Activity | Conditions |
|----------|------------|
| **Business operations** | Primary purpose, always acceptable |
| **Professional development** | Work-related learning, courses, research |
| **Limited personal use** | Reasonable, doesn't interfere with work |
| **Communication** | Professional, work-related communication |
| **Collaboration** | With colleagues, customers, partners |

### 4.2 Personal Use Guidelines

Limited personal use is permitted provided:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PERSONAL USE GUIDELINES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PERMITTED (Reasonable, Limited)                                           │
│  ├── Brief personal email/messaging                                        │
│  ├── Quick personal web browsing (breaks, lunch)                          │
│  ├── Personal phone calls (reasonable duration)                            │
│  ├── Online banking (secure connection)                                    │
│  └── News, weather, general information                                    │
│                                                                             │
│  CONDITIONS                                                                 │
│  ├── Does not interfere with work duties                                   │
│  ├── Does not consume excessive resources                                  │
│  ├── Does not violate any policy                                          │
│  ├── Does not create security risk                                         │
│  ├── Does not include prohibited activities                                │
│  └── Manager may restrict if abused                                        │
│                                                                             │
│  NOT PERMITTED                                                              │
│  ├── Personal business/side work                                           │
│  ├── Excessive streaming/downloads                                         │
│  ├── Installing personal software                                          │
│  ├── Storing personal files (large quantities)                            │
│  └── Anything in "Prohibited Actions" section                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Communication Standards

All business communication must be:

| Standard | Description |
|----------|-------------|
| **Professional** | Courteous, respectful tone |
| **Accurate** | Truthful, not misleading |
| **Appropriate** | Suitable for business context |
| **Compliant** | Follows legal and policy requirements |
| **Secure** | Uses approved channels for sensitive info |

---

## 5. Prohibited Actions

### 5.1 Strictly Prohibited

The following are **strictly prohibited** and may result in immediate termination:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRICTLY PROHIBITED ACTIVITIES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SECURITY VIOLATIONS                                                       │
│  ├── Sharing credentials with anyone                                       │
│  ├── Using another person's account                                        │
│  ├── Attempting unauthorized access                                        │
│  ├── Bypassing security controls                                           │
│  ├── Installing unauthorized software/malware                              │
│  ├── Disabling security features                                           │
│  ├── Connecting unauthorized devices to network                            │
│  └── Exfiltrating company or customer data                                │
│                                                                             │
│  DATA VIOLATIONS                                                           │
│  ├── Unauthorized access to confidential data                              │
│  ├── Unauthorized disclosure of confidential data                          │
│  ├── Copying company data for personal use                                │
│  ├── Sharing customer data inappropriately                                 │
│  ├── Taking data when leaving company                                      │
│  └── Destroying data to hide misconduct                                   │
│                                                                             │
│  ILLEGAL ACTIVITIES                                                        │
│  ├── Any illegal activity using company resources                          │
│  ├── Accessing/distributing illegal content                                │
│  ├── Intellectual property theft                                           │
│  ├── Fraud or misrepresentation                                           │
│  ├── Harassment or threats                                                 │
│  └── Hacking or attacking any system                                       │
│                                                                             │
│  HARMFUL CONDUCT                                                           │
│  ├── Harassment, bullying, discrimination                                  │
│  ├── Creating hostile work environment                                     │
│  ├── Distributing offensive content                                        │
│  ├── Impersonating others                                                  │
│  └── Intentionally damaging systems or data                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Prohibited Content

Users must not access, store, transmit, or distribute:

| Content Type | Examples |
|--------------|----------|
| **Illegal material** | Pirated software, illegal downloads |
| **Obscene material** | Pornography, explicit content |
| **Offensive material** | Hate speech, discriminatory content |
| **Malicious content** | Malware, hacking tools (except authorized security) |
| **Gambling** | Online gambling sites |
| **Personal business** | Running side business on company resources |

### 5.3 Prohibited Actions by Category

#### 5.3.1 Email & Communication

| Prohibited Action | Reason |
|-------------------|--------|
| Sending spam or chain letters | Resource abuse, reputation |
| Forging headers or sender info | Fraud |
| Mass unsolicited email | Legal violation |
| Sharing confidential info externally | Data protection |
| Using personal email for work data | Security, compliance |
| Harassment via any channel | Workplace conduct |

#### 5.3.2 Internet & Network

| Prohibited Action | Reason |
|-------------------|--------|
| Bypassing content filters | Security |
| Using unauthorized VPNs/proxies | Security bypass |
| Excessive bandwidth consumption | Resource abuse |
| Peer-to-peer file sharing | Security, legal |
| Cryptocurrency mining | Resource abuse |
| Running network scanners | Security (unless authorized) |
| Connecting rogue devices | Network security |

#### 5.3.3 Software & Systems

| Prohibited Action | Reason |
|-------------------|--------|
| Installing unapproved software | Security |
| Using pirated software | Legal |
| Modifying system configurations | Stability, security |
| Running servers without approval | Security, compliance |
| Disabling security software | Security |
| Using admin rights unnecessarily | Least privilege |

### 5.4 Prohibited Actions Matrix

| Action | Severity | Typical Consequence |
|--------|----------|---------------------|
| Sharing password (accidental) | Medium | Warning + training |
| Sharing password (intentional) | High | Final warning or termination |
| Unauthorized data access (accidental) | Medium | Warning + training |
| Unauthorized data access (intentional) | Critical | Termination |
| Installing unapproved software | Low-Medium | Warning |
| Accessing inappropriate content | Medium-High | Warning to termination |
| Data exfiltration | Critical | Termination + legal |
| Security bypass | High | Final warning or termination |
| Harassment | High-Critical | Final warning or termination |
| Illegal activity | Critical | Termination + legal |

---

## 6. Specific Use Policies

### 6.1 Email Use

| Requirement | Description |
|-------------|-------------|
| **Business email** | Use company email for all work communication |
| **Professional content** | Professional tone, accurate content |
| **Signatures** | Use approved signature format |
| **Attachments** | Scan before opening, encrypt sensitive |
| **External recipients** | Verify before sending confidential info |
| **Retention** | Subject to email retention policies |
| **Personal email** | Do not use for work matters |

### 6.2 Internet Use

| Requirement | Description |
|-------------|-------------|
| **Business focus** | Primarily for work purposes |
| **HTTPS** | Use secure connections for sensitive sites |
| **Downloads** | Only from trusted, approved sources |
| **Streaming** | Limited, don't impact bandwidth |
| **Social media** | Per Section 6.4 below |
| **Personal accounts** | Separate from work |

### 6.3 Cloud Services

| Requirement | Description |
|-------------|-------------|
| **Approved services only** | Only IT-approved cloud services |
| **No shadow IT** | Don't use unapproved services for work data |
| **Data classification** | Only appropriate data in cloud |
| **Access controls** | Proper sharing settings |
| **SSO** | Use company SSO where available |

### 6.4 Social Media

| Requirement | Description |
|-------------|-------------|
| **Personal vs. company** | Distinguish personal opinions from company |
| **Confidentiality** | Never share confidential info |
| **Professionalism** | Conduct reflects on company |
| **Official accounts** | Only authorized persons post as company |
| **Customer info** | Never post customer information |

### 6.5 AI Tools

| Requirement | Description |
|-------------|-------------|
| **Approved tools only** | Only IT-approved AI services |
| **No confidential data** | Never input sensitive data to AI tools |
| **No customer data** | Never input customer data |
| **Code review** | AI-generated code must be reviewed |
| **Disclosure** | Disclose significant AI assistance where required |
| **Full policy** | For detailed AI governance, see AI Usage & Ethics Policy |

---

## 7. Privileged Access

### 7.1 Additional Responsibilities

Users with privileged (admin) access have additional responsibilities:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRIVILEGED ACCESS REQUIREMENTS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ACCESS MANAGEMENT                                                         │
│  ├── Use admin access only when necessary                                  │
│  ├── Use standard account for daily work                                   │
│  ├── Never share admin credentials                                         │
│  ├── Additional MFA required                                               │
│  └── Access logged and audited                                             │
│                                                                             │
│  RESPONSIBILITIES                                                          │
│  ├── Protect systems and data with extra care                              │
│  ├── Follow change management for all changes                              │
│  ├── Document administrative actions                                       │
│  ├── Report any suspicious admin activity                                  │
│  └── Complete additional security training                                 │
│                                                                             │
│  RESTRICTIONS                                                               │
│  ├── No personal use of admin access                                       │
│  ├── No access beyond scope of role                                        │
│  ├── No granting unauthorized access to others                             │
│  ├── No disabling audit logging                                           │
│  └── No circumventing security controls                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Privileged Access Agreement

Users with privileged access must sign additional acknowledgment confirming:
- Understanding of elevated responsibilities
- Agreement to additional monitoring
- Commitment to security practices
- Acceptance of consequences for misuse

---

## 8. Monitoring & Enforcement

### 8.1 Monitoring Activities

CYBERCUBE may monitor:

| Activity | Purpose |
|----------|---------|
| **Network traffic** | Security, performance |
| **Email content** | Security, compliance |
| **Web browsing** | Security, policy compliance |
| **File access** | Security, data protection |
| **Login activity** | Security, access patterns |
| **System usage** | Capacity, troubleshooting |
| **Application usage** | Licensing, productivity |

**Monitoring Notice:**
- Monitoring is for legitimate business purposes
- No expectation of privacy on company systems
- Monitoring data accessed only by authorized personnel
- Monitoring data retained per retention policies
- Where local law requires notice or consent for employee monitoring, CYBERCUBE
  will comply with applicable requirements

### 8.2 Violation Reporting

**All users must report:**
- Suspected policy violations
- Security incidents
- Lost or stolen devices
- Compromised credentials
- Suspicious activity

**How to report:**
- Security issues: security@cybercube.io or #security-incidents
- Policy violations: HR or manager
- Anonymous: Ethics hotline or designated confidential channel

**No retaliation:** Good-faith reports will not result in retaliation.

### 8.3 Investigation Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INVESTIGATION PROCESS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DETECTION                                                              │
│  ├── Report received or monitoring alert                                   │
│  ├── Initial assessment of severity                                        │
│  └── Preserve evidence                                                     │
│                                                                             │
│  2. INVESTIGATION                                                          │
│  ├── Gather facts (logs, interviews, evidence)                            │
│  ├── IT Security + HR involvement                                          │
│  ├── Legal consultation if needed                                          │
│  └── Document findings                                                     │
│                                                                             │
│  3. DETERMINATION                                                          │
│  ├── Violation confirmed or not                                            │
│  ├── Severity assessment                                                   │
│  ├── Mitigating/aggravating factors                                       │
│  └── Recommendation to management                                          │
│                                                                             │
│  4. ACTION                                                                 │
│  ├── Disciplinary action (if warranted)                                   │
│  ├── Remediation steps                                                     │
│  ├── Communication to affected parties                                     │
│  └── Documentation                                                         │
│                                                                             │
│  5. FOLLOW-UP                                                              │
│  ├── Verify remediation                                                    │
│  ├── Additional training if needed                                         │
│  └── Policy updates if systemic issue                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Enforcement & Consequences

### 9.1 Violation Severity Levels

| Level | Description | Examples |
|-------|-------------|----------|
| **Minor** | Inadvertent, low impact | Forgetting to lock screen, minor personal use |
| **Moderate** | Negligent, medium impact | Sharing password accidentally, unapproved software |
| **Serious** | Intentional or significant impact | Accessing unauthorized data, repeated violations |
| **Critical** | Malicious or severe impact | Data theft, harassment, illegal activity |

### 9.2 Disciplinary Actions

| Severity | First Occurrence | Repeat | Pattern |
|----------|------------------|--------|---------|
| **Minor** | Verbal warning + training | Written warning | Escalation |
| **Moderate** | Written warning + training | Final warning | Termination |
| **Serious** | Final warning or termination | Termination | Termination |
| **Critical** | Termination | N/A | N/A |

**Additional consequences may include:**
- Access suspension or restriction
- Additional monitoring
- Demotion or reassignment
- Recovery of damages
- Legal action (civil or criminal)
- Reporting to authorities

### 9.3 Factors in Determining Consequences

| Factor | Effect |
|--------|--------|
| **Intent** | Intentional violations treated more seriously |
| **Impact** | Greater harm = greater consequence |
| **History** | Prior violations considered |
| **Cooperation** | Cooperation may mitigate |
| **Self-reporting** | Self-reporting may mitigate |
| **Position** | Leaders held to higher standard |
| **Concealment** | Attempts to hide violation aggravate |

### 9.4 Appeal Process

Employees may appeal disciplinary actions:
1. Written appeal to HR within 5 business days
2. Review by HR and senior management
3. Final decision within 10 business days
4. Internal decision is final; this process does not affect any statutory rights

---

## 10. Training & Awareness

### 10.1 Required Training

| Training | Audience | Frequency |
|----------|----------|-----------|
| **AUP overview** | All users | Onboarding |
| **Security awareness** | All users | Annual |
| **Data handling** | Data accessors | Annual |
| **Privileged access** | Admins | Initial + annual |
| **Manager training** | Managers | As assigned |

### 10.2 Awareness Activities

- Security awareness campaigns
- Phishing simulations
- Policy reminders
- Incident lessons learned (anonymized)

---

## Quick Reference Card

Print it. Keep it handy.

### DO

```
✓ Use strong, unique passwords
✓ Enable and use MFA
✓ Lock your screen when away
✓ Report security incidents
✓ Keep software updated
✓ Use VPN for remote access
✓ Encrypt sensitive data
✓ Follow data classification
✓ Ask if unsure
```

### DON'T

```
✗ Share your password
✗ Use someone else's account
✗ Install unauthorized software
✗ Disable security features
✗ Access data you don't need
✗ Send sensitive data insecurely
✗ Use personal email for work
✗ Leave devices unattended
✗ Ignore suspicious activity
```

### Report To

```
Security issues: security@cybercube.io
Lost device: security@cybercube.io (immediate)
Policy questions: Your manager or HR
IT help: it-help@cybercube.io
```

### Remember

```
• Company resources = company property
• No expectation of privacy on company systems
• You're responsible for your account
• When in doubt, ask
• Violations have consequences
```

---

## Implementation Status

**Last Updated:** 2026-01-17  
**Policy Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Policy document | COMPLETE | This policy |
| Acknowledgment process | PARTIAL | Add to onboarding |
| Training module | PENDING | Develop content |
| Monitoring capability | PARTIAL | Basic logging in place |
| Enforcement process | PARTIAL | Document procedures |
| Annual review | PENDING | Schedule |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Security Policy | Overall security framework |
| Data Classification Standard | Data handling rules |
| Authentication & Identity Standard | Access controls |
| Privacy Handling Policy | Privacy requirements |
| Incident Response Standard | Reporting violations |
| Employee Handbook | HR policies |
