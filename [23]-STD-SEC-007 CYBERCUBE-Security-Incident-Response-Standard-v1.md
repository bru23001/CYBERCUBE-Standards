CYBERCUBE Security Incident Response Standard (v1)

Glossary

This glossary defines key terms used throughout the CYBERCUBE Security Incident
Response Standard.

All definitions are normative unless stated otherwise.

A

Advanced Persistent Threat (APT)

A sophisticated, prolonged attack by a skilled adversary.

Characteristics: Stealth, persistence, specific targeting

Attack Vector

The path or method used by an attacker.

Examples: Phishing, vulnerability exploitation, credential theft

Artifact

Evidence collected during incident investigation.

Types: Logs, memory dumps, disk images, network captures

B

Breach

Unauthorized access to or disclosure of protected data.

Synonym: Data breach, security breach

C

Chain of Custody

Documentation tracking evidence handling from collection to disposition.

Required for: Legal proceedings, regulatory compliance

Command and Control (C2)

Infrastructure used by attackers to maintain communication with compromised systems.

Indicator: Outbound connections to suspicious destinations

Compromise

The state of a system being under unauthorized control.

Types: Full compromise, partial compromise

Containment

Actions to limit the spread or impact of an incident.

Types: Short-term (immediate), long-term (sustained)

Credential Stuffing

Attack using stolen credentials from other breaches.

Mitigation: MFA, breach detection, rate limiting

D

Data Breach

Unauthorized acquisition of personal or sensitive data.

Triggers: Notification requirements under GDPR, CCPA, etc.

Data Exfiltration

Unauthorized transfer of data out of the environment.

Indicators: Unusual outbound traffic, large data transfers

Digital Forensics

Scientific examination of digital evidence.

Activities: Collection, preservation, analysis, reporting

E

Eradication

Removal of the threat from the environment.

Activities: Malware removal, vulnerability patching, credential reset

Evidence

Information supporting incident analysis and conclusions.

Types: Volatile (memory), non-volatile (disk), network

Evidence Bag

A secure container for physical evidence.

Requirements: Tamper-evident, labeled, logged

F

False Positive

An alert that incorrectly identifies benign activity as malicious.

Impact: Alert fatigue, resource waste

First Responder

The initial person responding to a security incident.

Responsibility: Triage, initial containment, escalation

Forensic Image

A bit-for-bit copy of digital media.

Tool: dd, FTK Imager, EnCase

I

Impact Assessment

Evaluation of the incident's effect on the organization.

Factors: Data affected, systems compromised, business impact

Incident

An event that compromises the security of information or systems.

Types: Malware, unauthorized access, data breach, DoS

Incident Commander (IC)

The person coordinating security incident response.

Authority: Resource allocation, decision-making, communication

Incident Response Plan (IRP)

Documented procedures for handling security incidents.

This standard defines the IRP.

Indicators of Compromise (IOC)

Artifacts indicating a security breach has occurred.

Examples: Malicious IPs, file hashes, registry keys, domains

L

Lateral Movement

Attacker technique for moving through a network after initial access.

Indicators: Unusual authentication patterns, privilege escalation

Legal Hold

Requirement to preserve evidence for legal proceedings.

Trigger: Litigation, regulatory investigation, law enforcement

M

Malware

Software designed to damage or gain unauthorized access.

Types: Virus, worm, ransomware, trojan, rootkit

N

Notification

Formal communication about a security incident.

Recipients: Affected parties, regulators, law enforcement

O

Outbreak

Rapid spread of malware or compromise across multiple systems.

Response: Mass containment, isolation

P

Phishing

Social engineering attack using fraudulent communications.

Types: Email phishing, spear phishing, whaling, smishing

Post-Incident Review

Analysis after incident closure to improve future response.

Synonym: Lessons learned, after-action review

Privilege Escalation

Gaining higher-level permissions than initially obtained.

Types: Vertical (admin), horizontal (other user)

R

Ransomware

Malware that encrypts data and demands payment.

Response: Isolation, backup recovery, NO payment

Recovery

Returning systems to normal operation after an incident.

Activities: System restoration, validation, monitoring

Remediation

Actions to address the root cause of an incident.

Types: Patching, configuration changes, process improvements

Retainer

Pre-arranged agreement with external incident responders.

Purpose: Rapid engagement during incidents

Root Cause

The fundamental reason an incident occurred.

Identified through: Forensic analysis, timeline reconstruction

S

Security Operations Center (SOC)

Team responsible for monitoring and responding to security events.

Functions: Detection, triage, initial response

Severity

The level of impact and urgency of an incident.

Levels: Critical, High, Medium, Low

Spillage

Unauthorized disclosure of classified or sensitive information.

Response: Containment, notification, cleanup

T

Threat Actor

An individual or group responsible for malicious activity.

Types: Nation-state, criminal, hacktivist, insider

Threat Hunting

Proactive search for threats not detected by automated tools.

Triggered by: Intelligence, anomalies, incident findings

Threat Intelligence

Information about threats and threat actors.

Sources: Commercial feeds, ISACs, government, open source

Timeline

Chronological reconstruction of incident events.

Purpose: Understanding attack progression, identifying gaps

Triage

Initial assessment of incident severity and response priority.

Output: Severity level, response team, immediate actions

V

Volatile Evidence

Evidence that is lost when power is removed.

Examples: RAM contents, running processes, network connections

Vulnerability

A weakness that could be exploited by a threat.

Types: Software bugs, misconfigurations, design flaws

W

Write Blocker

Device preventing modification of evidence during acquisition.

Required for: Forensic imaging of storage media

Z

Zero Day

A previously unknown vulnerability with no available patch.

Response: Compensating controls, vendor notification

---

CYBERCUBE Security Incident Response Standard (v1.1)

**Standard ID:** STD-SEC-007
**Status:** Active
**Effective:** 2026-01-17 (v1), 2026-04-22 (v1.1)
**Classification:** INTERNAL
**Owner:** Security Team
**Applies to:** All security incidents affecting CYBERCUBE systems or data

### Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects | **T1 MUST** | (1) Every security-class incident MUST follow STD-OPS-004 severity taxonomy (SEV1–SEV4) and MUST be declared in the same incident channel/tool as operational incidents. (2) The SIRT primary contact MUST be the `sec-lead` role per STD-ENG-007 Appendix X; a backup contact MUST be named. (3) Evidence preservation MUST begin at incident declaration (freeze logs, snapshot affected systems, do not mutate artifacts). (4) A written post-incident report MUST be produced for every SEV1/SEV2 security incident within 5 business days. (5) Any incident that may trigger breach-notification obligations (PII exposure, customer-data loss, credential theft) MUST be flagged to Legal (`general-counsel`) at declaration time. | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Per-category playbooks (credential compromise, data exfiltration, DDoS, ransomware, insider), tabletop exercises at least annually, notification templates legal-reviewed, incident metrics reported quarterly, automated evidence collection (log pull, snapshot automation), defined IR roles beyond commander (communicator, scribe, investigator). | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | External IR retainer under contract with defined SLA, chain-of-custody forms for forensic handling, 24×7 on-call security coverage, executive-briefing cadence during active SEV1, dedicated forensic toolchain (EDR, memory-capture, disk imaging), regulator-notification clocks automated (GDPR 72h, HIPAA 60d, etc.), specialist legal counsel on retainer. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.1 (2026-04-22) — Unfreeze (Path B).** T1 = five enforceable rules using STD-OPS-004 infrastructure: severity taxonomy, SIRT named contact, evidence-preservation-on-declare, 5-BD post-mortem, Legal flag for notification triggers. Playbooks, tabletops, IR retainer, forensic tools reclassified to T2/T3 ROADMAP. Heavy deference to STD-OPS-004 — this standard now only carries the *security-specific* incident deltas.

0. Purpose & Design Principles

This standard defines how CYBERCUBE detects, responds to, investigates, and
recovers from security incidents. It establishes procedures for evidence
preservation, regulatory notification, forensic analysis, and post-incident
improvement specifically for security-related events.

This standard is DISTINCT from the Incident Response & Reliability Standard,
which covers operational incidents. Security incidents require specialized
handling due to legal, regulatory, and forensic requirements.

Industry alignment:

- NIST SP 800-61r2 (Computer Security Incident Handling)
- ISO/IEC 27035 (Information Security Incident Management)
- SANS Incident Handling Process
- CISA Incident Response Playbooks
- GDPR Articles 33-34 (Breach Notification)
- SOC 2 Type II (CC7.3, CC7.4, CC7.5)

Design principles:

1. **Speed** — Rapid detection and containment
2. **Preservation** — Evidence integrity maintained
3. **Compliance** — Regulatory requirements met
4. **Transparency** — Appropriate stakeholder communication
5. **Learning** — Every incident improves defenses
6. **Accountability** — Clear roles and responsibilities

This document does NOT define:

- Operational incident response — see Incident Response & Reliability Standard
- Business continuity — see Business Continuity Plan
- Disaster recovery — see Disaster Recovery Plan

1. Security Incident Classification

Security incidents are classified by type and severity.

1.1 Incident Categories

| Category              | Description                                  | Examples                                 |
| --------------------- | -------------------------------------------- | ---------------------------------------- |
| Data Breach           | Unauthorized access to or disclosure of data | Database exposure, credential leak       |
| Unauthorized Access   | Illegitimate system or account access        | Account compromise, privilege escalation |
| Malware               | Malicious software infection                 | Ransomware, trojan, cryptominer          |
| Denial of Service     | Disruption of service availability           | DDoS attack, resource exhaustion         |
| Insider Threat        | Malicious activity by authorized user        | Data theft, sabotage                     |
| Social Engineering    | Manipulation to obtain access or data        | Phishing, pretexting                     |
| Vulnerability Exploit | Active exploitation of a weakness            | Zero-day attack, unpatched CVE           |
| Physical Security     | Physical access or theft                     | Device theft, unauthorized entry         |

1.2 Severity Classification

| Severity       | Impact                                                      | Response Time        | Examples                                      |
| -------------- | ----------------------------------------------------------- | -------------------- | --------------------------------------------- |
| SEV-1 CRITICAL | Active breach, data exfiltration, widespread compromise     | Immediate (< 15 min) | Active ransomware, confirmed data breach, APT |
| SEV-2 HIGH     | Confirmed compromise, limited scope, contained              | < 1 hour             | Single account compromise, contained malware  |
| SEV-3 MEDIUM   | Attempted attack, suspicious activity, investigation needed | < 4 hours            | Phishing attempt, policy violation, anomaly   |
| SEV-4 LOW      | Minor policy violation, informational                       | < 24 hours           | Failed login attempts, scan activity          |

1.3 Severity Decision Matrix

| Factor              | SEV-1               | SEV-2                 | SEV-3          | SEV-4       |
| ------------------- | ------------------- | --------------------- | -------------- | ----------- |
| Data at risk        | Confirmed exposure  | Possible exposure     | No exposure    | No risk     |
| Systems compromised | Multiple / Critical | Single / Non-critical | None confirmed | None        |
| Active attacker     | Yes, ongoing        | Evidence of past      | Possible       | No evidence |
| Customer impact     | Yes                 | Possible              | No             | No          |
| Regulatory trigger  | Yes                 | Possible              | No             | No          |
| Business disruption | Significant         | Moderate              | Minimal        | None        |

1.4 Automatic SEV-1 Triggers

The following automatically trigger SEV-1:

- Confirmed data breach involving customer PII
- Active ransomware infection
- Compromise of privileged credentials (admin, root)
- Evidence of APT activity
- Breach of production database
- Compromise of authentication/authorization systems
- Successful exploitation of critical vulnerability
- Insider threat with data exfiltration

2. Incident Response Team

Security incidents require a specialized response team.

2.1 Security Incident Response Team (SIRT)

| Role               | Responsibility                  | Availability |
| ------------------ | ------------------------------- | ------------ |
| Incident Commander | Overall coordination, decisions | 24/7 on-call |
| Security Analyst   | Investigation, forensics        | 24/7 on-call |
| Engineering Lead   | Technical remediation           | On-call      |
| Legal Counsel      | Legal guidance, notifications   | On-call      |
| Communications     | Internal/external messaging     | On-call      |
| Executive Sponsor  | Business decisions, resources   | On-call      |

2.2 RACI Matrix

| Activity      | IC | Security | Engineering | Legal | Comms | Exec |
| ------------- | -- | -------- | ----------- | ----- | ----- | ---- |
| Detection     | I  | R        | I           | -     | -     | -    |
| Triage        | A  | R        | C           | I     | -     | I    |
| Containment   | A  | R        | R           | C     | I     | I    |
| Investigation | A  | R        | C           | C     | -     | I    |
| Eradication   | A  | C        | R           | I     | -     | I    |
| Recovery      | A  | C        | R           | I     | -     | I    |
| Notification  | C  | C        | I           | R     | R     | A    |
| Post-Incident | A  | R        | R           | C     | I     | I    |

R = Responsible, A = Accountable, C = Consulted, I = Informed

2.3 External Resources

| Resource                 | Use Case                        | Engagement            |
| ------------------------ | ------------------------------- | --------------------- |
| IR Retainer Firm         | Major incidents, forensics      | Pre-arranged contract |
| Legal Counsel (External) | Litigation risk, regulatory     | As needed             |
| Law Enforcement          | Criminal activity, nation-state | Per legal guidance    |
| Cyber Insurance          | Breach costs, liability         | Per policy terms      |
| PR/Crisis Comms          | Public disclosure               | As needed             |

2.4 Contact Information

```
SECURITY INCIDENT CONTACTS

Emergency (24/7):
- Security Hotline: [phone]
- Security Email: security-incident@cybercube.software
- PagerDuty: [policy]

IR Retainer: [Firm Name]
- Hotline: [phone]
- Email: [email]
- Contract #: [number]

Legal Counsel:
- Internal: [name, phone]
- External: [firm, phone]

Cyber Insurance:
- Carrier: [name]
- Policy #: [number]
- Claims: [phone]

Law Enforcement:
- FBI Cyber: [field office]
- CISA: report@cisa.gov
- Local PD: [number]
```

3. Incident Response Lifecycle

Security incidents follow a structured response lifecycle.

3.1 Lifecycle Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SECURITY INCIDENT RESPONSE LIFECYCLE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ DETECT   │─▶│ TRIAGE   │─▶│ CONTAIN  │─▶│INVESTIGATE│─▶│ERADICATE │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│       │             │             │              │              │           │
│       ▼             ▼             ▼              ▼              ▼           │
│   Monitoring    Severity     Stop spread    Root cause     Remove         │
│   Alerting      Assessment   Preserve       Forensics      threat         │
│   Reporting     Escalation   evidence       Timeline       Patch          │
│                                                                             │
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────────────────────────┐ │
│  │ RECOVER  │─▶│ NOTIFY   │─▶│           POST-INCIDENT                 │ │
│  └──────────┘  └──────────┘  └──────────────────────────────────────────┘ │
│       │             │                           │                          │
│       ▼             ▼                           ▼                          │
│   Restore       Regulators                  Lessons learned               │
│   Validate      Customers                   Remediation                   │
│   Monitor       Leadership                  Report                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

3.2 Phase 1: Detection

**Goal:** Identify security incidents as quickly as possible.

Detection sources:

- Security monitoring (SIEM, EDR, IDS/IPS)
- Vulnerability scanning alerts
- Threat intelligence feeds
- User reports
- Third-party notifications
- Penetration test findings
- Bug bounty reports

Detection metrics:

| Metric                     | Target               |
| -------------------------- | -------------------- |
| Mean Time to Detect (MTTD) | < 24 hours           |
| False Positive Rate        | < 10%                |
| Coverage                   | 100% critical assets |

3.3 Phase 2: Triage

**Goal:** Assess severity and mobilize appropriate response.

Triage checklist:

```markdown
## Security Incident Triage

### Initial Assessment (< 15 minutes)
- [ ] What type of incident? (category)
- [ ] What systems/data affected?
- [ ] Is the attack ongoing?
- [ ] What is the potential impact?
- [ ] Initial severity assignment

### Escalation (if SEV-1/2)
- [ ] Page Incident Commander
- [ ] Activate SIRT
- [ ] Create secure incident channel
- [ ] Begin timeline documentation

### Immediate Actions
- [ ] Preserve volatile evidence
- [ ] Isolate affected systems (if safe)
- [ ] Capture initial IOCs
- [ ] Document everything
```

3.4 Phase 3: Containment

**Goal:** Stop the spread and limit damage while preserving evidence.

**Short-term containment (immediate):**

- Isolate affected systems from network
- Disable compromised accounts
- Block malicious IPs/domains
- Revoke leaked credentials
- Enable enhanced logging

**Long-term containment (sustained):**

- Implement additional monitoring
- Deploy temporary controls
- Segment network if needed
- Maintain business operations

**Containment decision matrix:**

| Scenario                 | Action                    | Evidence Impact   |
| ------------------------ | ------------------------- | ----------------- |
| Active data exfiltration | Immediate isolation       | Accept some loss  |
| Dormant malware          | Image first, then isolate | Preserve all      |
| Compromised credentials  | Disable/reset immediately | Minimal impact    |
| Ransomware active        | Isolate immediately       | Accept some loss  |
| Reconnaissance only      | Monitor, prepare          | Full preservation |

3.5 Phase 4: Investigation

**Goal:** Determine root cause, scope, and timeline.

Investigation activities:

- Forensic imaging of affected systems
- Log analysis (SIEM, application, network)
- Malware analysis (if applicable)
- Timeline reconstruction
- Scope determination
- IOC extraction
- Attribution (if possible)

Key questions:

```markdown
## Investigation Questions

### Initial Access
- How did the attacker gain access?
- What vulnerability was exploited?
- When did the compromise occur?

### Scope
- What systems were accessed?
- What data was accessed/exfiltrated?
- What accounts were compromised?
- Is the attacker still present?

### Impact
- Was customer data affected?
- What is the business impact?
- Are there regulatory implications?

### Attribution
- What are the attacker's objectives?
- What TTPs were used?
- Any attribution indicators?
```

3.6 Phase 5: Eradication

**Goal:** Remove the threat completely from the environment.

Eradication activities:

- Remove malware and artifacts
- Patch exploited vulnerabilities
- Reset all compromised credentials
- Rebuild compromised systems (if needed)
- Close attacker access paths
- Remove persistence mechanisms

Eradication verification:

- [ ] All malware removed
- [ ] All backdoors closed
- [ ] All credentials reset
- [ ] Vulnerability patched
- [ ] IOCs blocked
- [ ] No active threat indicators

3.7 Phase 6: Recovery

**Goal:** Return to normal operations safely.

Recovery activities:

- Restore systems from clean backups
- Rebuild systems if needed
- Validate system integrity
- Re-enable services gradually
- Implement enhanced monitoring
- Verify no remaining compromise

Recovery criteria:

- [ ] Systems validated clean
- [ ] Backups verified uncompromised
- [ ] Enhanced monitoring in place
- [ ] Business sign-off obtained
- [ ] No new IOC alerts (48 hours)

3.8 Phase 7: Notification

**Goal:** Meet legal and ethical notification obligations.

See Section 5 for detailed notification requirements.

3.9 Phase 8: Post-Incident

**Goal:** Learn and improve from the incident.

See Section 8 for detailed post-incident requirements.

4. Evidence Handling

Evidence must be preserved and handled properly for legal and forensic purposes.

4.1 Evidence Principles

1. **Preserve** — Maintain evidence integrity
2. **Document** — Record all handling
3. **Protect** — Secure from tampering
4. **Minimize** — Limit access to authorized personnel
5. **Legal** — Support potential litigation

4.2 Evidence Types

| Type          | Volatility | Collection Priority | Examples                      |
| ------------- | ---------- | ------------------- | ----------------------------- |
| Memory        | Highest    | 1st                 | RAM dump, running processes   |
| Network       | High       | 2nd                 | Active connections, traffic   |
| Disk (live)   | Medium     | 3rd                 | Open files, temp files        |
| Logs          | Medium     | 4th                 | System, application, security |
| Disk (static) | Low        | 5th                 | Full disk image               |
| Physical      | None       | As needed           | Devices, documents            |

4.3 Evidence Collection Procedures

**Memory acquisition:**

```bash
# Linux memory acquisition (using LiME - Linux Memory Extractor)
# Note: /dev/mem is restricted on modern kernels (3.x+) and cannot dump full RAM
sudo insmod lime.ko "path=/mnt/evidence/memory.lime format=lime"

# Alternative: AVML (Acquire Volatile Memory for Linux)
sudo avml /mnt/evidence/memory.lime

# Windows memory acquisition (using winpmem)
winpmem.exe output.raw
```

**Disk imaging:**

```bash
# Create forensic image with hash verification
sudo dcfldd if=/dev/sda of=/mnt/evidence/disk.raw hash=sha256 \
  hashlog=/mnt/evidence/disk.hash

# Using dd with write blocker
sudo dd if=/dev/sda of=/mnt/evidence/disk.raw bs=4M conv=sync,noerror
sha256sum /mnt/evidence/disk.raw > /mnt/evidence/disk.sha256
```

**Log collection:**

```bash
# Collect logs with timestamps preserved
tar -cvzf /mnt/evidence/logs-$(date +%Y%m%d).tar.gz \
  --preserve-permissions \
  /var/log/

# Cloud logs (AWS CloudTrail)
aws cloudtrail lookup-events \
  --start-time "2026-01-01T00:00:00Z" \
  --end-time "2026-01-17T23:59:59Z" \
  > cloudtrail-events.json
```

4.4 Chain of Custody

Every piece of evidence requires chain of custody documentation:

```markdown
## Chain of Custody Record

### Evidence Information
- Evidence ID: SEC-2026-001-E01
- Description: Memory dump from server prod-api-01
- Date/Time Collected: 2026-01-17 14:30:00 UTC
- Collected By: Alice Security
- Collection Method: LiME kernel module
- Original Hash (SHA-256): abc123...

### Custody Log
| Date/Time | From | To | Purpose | Signature |
|-----------|------|-----|---------|-----------|
| 2026-01-17 14:30 | — | Alice Security | Collection | [sig] |
| 2026-01-17 15:00 | Alice Security | Evidence Locker | Storage | [sig] |
| 2026-01-18 09:00 | Evidence Locker | Bob Forensics | Analysis | [sig] |
| 2026-01-18 17:00 | Bob Forensics | Evidence Locker | Return | [sig] |

### Storage Location
- Primary: Evidence locker, Room 301, Slot A-15
- Backup: Encrypted cloud storage (evidence bucket)

### Notes
- Write blocker used during imaging
- Hash verified after transfer
```

4.5 Evidence Storage

| Storage Type             | Security              | Access             | Retention      |
| ------------------------ | --------------------- | ------------------ | -------------- |
| Physical evidence locker | Locked, access logged | Security team only | Per legal hold |
| Encrypted storage        | AES-256, key escrow   | SIRT + Legal       | Per legal hold |
| Cloud evidence bucket    | Encrypted, versioned  | SIRT + Legal       | Per legal hold |

Evidence storage requirements:

- Access control (need-to-know)
- Encryption at rest
- Integrity verification (hashes)
- Immutable storage (WORM)
- Audit logging
- Backup copies
- Legal hold support

4.6 Evidence Handling Rules

**MANDATORY:**

- Use write blockers for disk imaging
- Calculate and verify hashes
- Document all access and handling
- Store in approved evidence storage
- Maintain chain of custody
- Preserve original evidence unchanged

**PROHIBITED:**

- Accessing evidence without documentation
- Modifying original evidence
- Storing evidence on personal devices
- Sharing evidence outside authorized channels
- Destroying evidence without approval
- Breaking chain of custody

5. Notification Requirements

Security incidents may trigger notification obligations.

5.1 Notification Decision Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NOTIFICATION DECISION TREE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    Was personal data affected?                              │
│                              │                                              │
│                    ┌────────┴────────┐                                     │
│                    │                  │                                     │
│                   YES                NO ──────▶ Internal only               │
│                    │                                                        │
│                    ▼                                                        │
│         Is there risk to individuals?                                       │
│                    │                                                        │
│          ┌────────┴────────┐                                               │
│          │                  │                                               │
│         YES                NO                                               │
│          │                  │                                               │
│          ▼                  ▼                                               │
│    REGULATORY          May require                                         │
│    NOTIFICATION        assessment                                          │
│    REQUIRED                                                                │
│          │                                                                  │
│          ▼                                                                  │
│    GDPR: 72 hours to DPA                                                   │
│    CCPA: "Without unreasonable delay"                                      │
│    Other: Per jurisdiction                                                 │
│          │                                                                  │
│          ▼                                                                  │
│    High risk to individuals?                                               │
│          │                                                                  │
│    ┌────┴────┐                                                             │
│   YES       NO                                                              │
│    │                                                                        │
│    ▼                                                                        │
│  INDIVIDUAL                                                                │
│  NOTIFICATION                                                              │
│  REQUIRED                                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

5.2 Regulatory Notification Requirements

| Regulation   | Trigger                         | Timeline                                                             | Recipient                                             |
| ------------ | ------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| GDPR Art. 33 | Personal data breach with risk  | 72 hours                                                             | Supervisory Authority                                 |
| GDPR Art. 34 | High risk to individuals        | Without undue delay                                                  | Affected individuals                                  |
| CCPA         | Personal information breach     | Without unreasonable delay                                           | Affected CA residents; CA AG (if 500+)                |
| HIPAA        | Any PHI breach                  | 60 days (individuals); 60 days to HHS if 500+; annual to HHS if <500 | HHS, affected individuals; media (if 500+ in a state) |
| PCI DSS      | Cardholder data compromise      | Immediately                                                          | Card brands, acquirer                                 |
| SEC          | Material cybersecurity incident | 4 business days                                                      | SEC (Form 8-K)                                        |
| State Laws   | Varies by state                 | Varies                                                               | AG, affected individuals                              |

5.3 Notification Timeline

```
Incident Discovered (T=0)
        │
        ▼
    Assessment (T+24h)
    - Scope determination
    - Data affected
    - Risk assessment
        │
        ▼
    Legal Consultation (T+48h)
    - Notification requirements
    - Law enforcement consideration
        │
        ▼
    Regulatory Notification (T+72h)
    - GDPR supervisory authority
    - Other regulators as required
        │
        ▼
    Individual Notification (T+7-30 days)
    - Affected individuals
    - Credit monitoring (if applicable)
        │
        ▼
    Public Disclosure (if required)
    - Press release
    - Website notice
```

5.4 Notification Content

**Regulatory notification must include:**

- Nature of the breach
- Categories and approximate number of individuals affected
- Categories and approximate number of records affected
- Name and contact details of DPO/privacy contact
- Likely consequences of the breach
- Measures taken or proposed to address the breach

**Individual notification must include:**

- Nature of the breach (plain language)
- What data was affected
- What we are doing about it
- What they should do (recommended actions)
- How to contact us
- Resources (credit monitoring if applicable)

5.5 Notification Templates

```markdown
## Regulatory Notification Template (GDPR)

To: [Supervisory Authority]
From: CYBERCUBE [DPO Contact]
Date: [Date]
Subject: Personal Data Breach Notification - Article 33 GDPR

1. NATURE OF BREACH
[Description of what happened]

2. CATEGORIES OF DATA SUBJECTS
- Approximately [number] individuals affected
- Categories: [customers/employees/etc.]

3. CATEGORIES OF PERSONAL DATA
- [List affected data types]

4. LIKELY CONSEQUENCES
[Assessment of potential impact to individuals]

5. MEASURES TAKEN
- Immediate containment: [actions]
- Remediation: [actions]
- Prevention: [planned actions]

6. DATA PROTECTION OFFICER CONTACT
[Name, email, phone]

7. ADDITIONAL INFORMATION
[Any other relevant details]
```

```markdown
## Individual Notification Template

Subject: Important Security Notice from CYBERCUBE

Dear [Name],

We are writing to inform you of a security incident that may have 
affected your personal information.

WHAT HAPPENED
On [date], we discovered [brief description]. We immediately 
[containment actions].

WHAT INFORMATION WAS INVOLVED
The following types of information may have been affected:
- [List data types]

WHAT WE ARE DOING
- [Containment and remediation actions]
- [Preventive measures]
- [Complimentary services if applicable]

WHAT YOU CAN DO
We recommend you:
- [Specific recommendations]
- [Password changes if applicable]
- [Credit monitoring if applicable]

FOR MORE INFORMATION
If you have questions, please contact:
- Email: [email]
- Phone: [phone]
- Website: [incident page URL]

We sincerely apologize for any concern this may cause.

[Signature]
```

5.6 Law Enforcement Engagement

Criteria for law enforcement notification:

- Criminal activity evident
- Nation-state involvement suspected
- Significant financial impact
- Ongoing threat to others
- Legal requirement

Engagement process:

```
1. Legal counsel approval
2. Executive sponsor approval
3. Designated contact makes report
4. Document interaction
5. Coordinate evidence sharing
6. Maintain confidentiality of investigation
```

6. Incident Communication

Clear communication is critical during security incidents.

6.1 Communication Channels

| Channel                 | Use                  | Security                        |
| ----------------------- | -------------------- | ------------------------------- |
| Secure incident channel | SIRT coordination    | Encrypted (Signal/secure Slack) |
| Incident bridge         | Voice coordination   | Secure conference line          |
| Status page (internal)  | Organization updates | Authenticated access            |
| Status page (external)  | Customer updates     | Public (when appropriate)       |
| Executive briefings     | Leadership updates   | Confidential                    |

6.2 Communication Principles

**DO:**

- Use secure, authenticated channels
- Communicate facts, not speculation
- Provide regular updates (even if no change)
- Document all communications
- Coordinate messaging through Communications lead

**DON'T:**

- Discuss incidents on public channels
- Speculate about attribution
- Share technical details externally
- Promise outcomes you can't guarantee
- Communicate without legal review (external)

6.3 Internal Communication Templates

```markdown
## SIRT Status Update Template

SECURITY INCIDENT UPDATE - [INC-2026-001]
Time: [timestamp]
Severity: [SEV-1/2/3/4]
Status: [Investigating/Containing/Eradicating/Recovering/Closed]

CURRENT SITUATION
[2-3 sentence summary of current state]

ACTIONS TAKEN
- [Action 1]
- [Action 2]

NEXT STEPS
- [Planned action 1]
- [Planned action 2]

TIMELINE
- [Key events with timestamps]

IC: [Name]
Next Update: [Time]
```

6.4 Executive Briefing Template

```markdown
## Executive Security Briefing

INCIDENT: [Brief title]
DATE: [Date]
SEVERITY: [Level]
STATUS: [Current status]

EXECUTIVE SUMMARY
[2-3 sentence summary suitable for executives]

BUSINESS IMPACT
- Customer impact: [Yes/No, description]
- Operational impact: [Description]
- Financial impact: [Estimated if known]
- Regulatory impact: [Notification required?]
- Reputational impact: [Assessment]

KEY DECISIONS NEEDED
1. [Decision needed]
2. [Decision needed]

TIMELINE
- [Discovery]: [date/time]
- [Key milestone]: [date/time]
- [Expected resolution]: [estimate]

RECOMMENDATIONS
[What you're recommending]

CONTACT
IC: [Name, phone]
```

7. Forensic Investigation

Detailed forensic investigation procedures for security incidents.

7.1 Forensic Investigation Triggers

| Severity | Forensic Investigation |
| -------- | ---------------------- |
| SEV-1    | REQUIRED (full)        |
| SEV-2    | REQUIRED (scoped)      |
| SEV-3    | As needed              |
| SEV-4    | Not required           |

7.2 Investigation Types

| Type   | Scope                  | Duration | Output           |
| ------ | ---------------------- | -------- | ---------------- |
| Triage | Quick assessment       | Hours    | Initial findings |
| Scoped | Specific systems/data  | Days     | Technical report |
| Full   | Complete investigation | Weeks    | Forensic report  |
| Legal  | Litigation support     | Variable | Expert testimony |

7.3 Investigation Methodology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FORENSIC INVESTIGATION PROCESS                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PREPARATION        2. COLLECTION         3. EXAMINATION                │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐             │
│  │ Scope        │─────▶│ Evidence     │─────▶│ Data         │             │
│  │ Resources    │      │ acquisition  │      │ extraction   │             │
│  │ Legal auth   │      │ Chain of     │      │ Timeline     │             │
│  │              │      │ custody      │      │ reconstruction│             │
│  └──────────────┘      └──────────────┘      └──────────────┘             │
│                                                     │                      │
│                                    ┌────────────────┘                      │
│                                    ▼                                       │
│  4. ANALYSIS           5. REPORTING                                       │
│  ┌──────────────┐      ┌──────────────┐                                   │
│  │ Correlation  │─────▶│ Findings      │                                  │
│  │ Attribution  │      │ Recommendations│                                  │
│  │ Root cause   │      │ Evidence       │                                  │
│  └──────────────┘      └──────────────┘                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

7.4 Timeline Reconstruction

```markdown
## Incident Timeline Template

### Pre-Incident
| Date/Time | Event | Source | Notes |
|-----------|-------|--------|-------|
| 2026-01-10 08:00 | Phishing email sent | Email logs | Initial vector |
| 2026-01-10 09:15 | User clicked link | Proxy logs | Credential harvested |

### Initial Compromise
| Date/Time | Event | Source | Notes |
|-----------|-------|--------|-------|
| 2026-01-10 14:30 | First login with stolen creds | Auth logs | From [IP] |
| 2026-01-10 14:35 | Privilege escalation attempt | Audit logs | Failed |

### Lateral Movement
| Date/Time | Event | Source | Notes |
|-----------|-------|--------|-------|
| 2026-01-11 02:00 | Access to server B | SSH logs | Successful |

### Data Access / Exfiltration
| Date/Time | Event | Source | Notes |
|-----------|-------|--------|-------|
| 2026-01-12 03:00 | Database queries | DB audit | Customer data |
| 2026-01-12 03:30 | Large outbound transfer | Network flow | 500MB to [IP] |

### Detection
| Date/Time | Event | Source | Notes |
|-----------|-------|--------|-------|
| 2026-01-17 10:00 | SIEM alert triggered | SIEM | Anomaly detection |
```

7.5 Forensic Report Template

```markdown
## Security Incident Forensic Report

DOCUMENT CLASSIFICATION: CONFIDENTIAL
INCIDENT ID: SEC-2026-001
PREPARED BY: [Forensic Analyst]
DATE: [Date]

### 1. EXECUTIVE SUMMARY
[2-3 paragraph summary for non-technical readers]

### 2. INCIDENT OVERVIEW
- Incident type: [Category]
- Severity: [Level]
- Discovery date: [Date]
- Investigation period: [Start - End]

### 3. SCOPE OF INVESTIGATION
- Systems analyzed: [List]
- Data sources: [List]
- Timeframe: [Date range]
- Limitations: [Any constraints]

### 4. FINDINGS

#### 4.1 Attack Timeline
[Detailed timeline with evidence citations]

#### 4.2 Initial Access Vector
[How the attacker gained entry]

#### 4.3 Techniques Used
[MITRE ATT&CK mapping if applicable]

#### 4.4 Systems Compromised
[List of affected systems]

#### 4.5 Data Accessed/Exfiltrated
[What data was affected]

#### 4.6 Indicators of Compromise
| Type | Value | Context |
|------|-------|---------|
| IP | x.x.x.x | C2 server |
| Hash | abc123 | Malware |
| Domain | evil.com | Phishing |

### 5. ROOT CAUSE ANALYSIS
[Fundamental cause of the incident]

### 6. IMPACT ASSESSMENT
- Data impact: [Assessment]
- Business impact: [Assessment]
- Regulatory impact: [Assessment]

### 7. RECOMMENDATIONS
1. [Immediate recommendation]
2. [Short-term recommendation]
3. [Long-term recommendation]

### 8. APPENDICES
- A: Evidence inventory
- B: Chain of custody records
- C: Technical analysis details
- D: IOC list (machine-readable)
```

8. Post-Incident Activities

Learning from incidents improves future security posture.

8.1 Post-Incident Review Requirements

| Severity | Review Required           | Timeline       | Participants      |
| -------- | ------------------------- | -------------- | ----------------- |
| SEV-1    | Full post-incident review | Within 5 days  | SIRT + Executives |
| SEV-2    | Post-incident review      | Within 10 days | SIRT              |
| SEV-3    | Lessons learned           | Within 14 days | Security team     |
| SEV-4    | Optional                  | —             | —                |

8.2 Post-Incident Review Agenda

```markdown
## Security Incident Post-Incident Review

INCIDENT: [ID]
DATE: [Review date]
FACILITATOR: [Name]
PARTICIPANTS: [Names]

### 1. INCIDENT SUMMARY (10 min)
- What happened
- Timeline review
- Impact summary

### 2. WHAT WENT WELL (15 min)
- Detection effectiveness
- Response speed
- Communication
- Collaboration

### 3. WHAT COULD BE IMPROVED (20 min)
- Detection gaps
- Response delays
- Process issues
- Tool limitations

### 4. ROOT CAUSE DISCUSSION (15 min)
- Technical root cause
- Process root cause
- Contributing factors

### 5. ACTION ITEMS (15 min)
- Preventive measures
- Detective improvements
- Process changes
- Owners and deadlines

### 6. WRAP-UP (5 min)
- Summarize decisions
- Confirm action item owners
- Schedule follow-up
```

8.3 Action Item Tracking

| Priority    | Timeline | Description                |
| ----------- | -------- | -------------------------- |
| P1-Critical | 7 days   | Prevents similar incident  |
| P2-High     | 30 days  | Significant risk reduction |
| P3-Medium   | 90 days  | Improvement opportunity    |
| P4-Low      | Backlog  | Nice to have               |

8.4 Metrics and Reporting

| Metric                 | Description                  | Target            |
| ---------------------- | ---------------------------- | ----------------- |
| MTTD                   | Mean time to detect          | < 24 hours        |
| MTTR                   | Mean time to respond         | < 1 hour (SEV-1)  |
| MTTC                   | Mean time to contain         | < 4 hours (SEV-1) |
| Incident count         | Total incidents by severity  | Trending down     |
| Recurrence rate        | Same root cause repeat       | < 5%              |
| Action item completion | Post-incident actions closed | > 90% on time     |

8.5 Continuous Improvement

```
Post-Incident Review
        │
        ▼
    Action Items
        │
        ├──▶ Technical controls
        │     - Patching
        │     - Configuration
        │     - Detection rules
        │
        ├──▶ Process improvements
        │     - Playbook updates
        │     - Training
        │     - Communication
        │
        └──▶ Program improvements
              - Tools
              - Resources
              - Partnerships
```

---

CYBERCUBE Security Incident Response — Quick Reference Card

Print it. Keep it handy.

🔹 Severity Levels

| SEV | Impact                    | Response   |
| --- | ------------------------- | ---------- |
| 1   | Active breach, data exfil | < 15 min   |
| 2   | Confirmed compromise      | < 1 hour   |
| 3   | Attempted/suspicious      | < 4 hours  |
| 4   | Minor/informational       | < 24 hours |

🔹 Auto SEV-1 Triggers

- Confirmed data breach (PII)
- Active ransomware
- Admin credential compromise
- APT evidence
- Production DB breach
- Auth system compromise

🔹 Response Lifecycle

```
DETECT → TRIAGE → CONTAIN → INVESTIGATE
    → ERADICATE → RECOVER → NOTIFY → REVIEW
```

🔹 SIRT Roles

| Role        | Responsibility |
| ----------- | -------------- |
| IC          | Coordination   |
| Security    | Investigation  |
| Engineering | Remediation    |
| Legal       | Notifications  |
| Comms       | Messaging      |
| Exec        | Decisions      |

🔹 Evidence Priority (Volatility)

```
1. Memory (highest)
2. Network connections
3. Live disk
4. Logs
5. Disk image (lowest)
```

🔹 Chain of Custody

- Evidence ID + description
- Collection date/time/method
- Hash (SHA-256)
- Custody transfer log
- Storage location
- Access log

🔹 Notification Timelines

| Regulation         | Timeline                     |
| ------------------ | ---------------------------- |
| GDPR (DPA)         | 72 hours                     |
| GDPR (individuals) | "Without undue delay"        |
| CCPA               | "Without unreasonable delay" |
| HIPAA              | 60 days                      |
| SEC                | 4 business days              |

🔹 Notification Content

- What happened
- What data affected
- What we're doing
- What they should do
- How to contact us

🔹 Post-Incident Review

| SEV | Timeline |
| --- | -------- |
| 1   | 5 days   |
| 2   | 10 days  |
| 3   | 14 days  |

🔹 Key Metrics

| Metric | Target       |
| ------ | ------------ |
| MTTD   | < 24h        |
| MTTR   | < 1h (SEV-1) |
| MTTC   | < 4h (SEV-1) |

🔹 Don't Forget

✅ Preserve evidence first
✅ Document everything
✅ Maintain chain of custody
✅ Coordinate with Legal
✅ Communicate securely
✅ Notify per requirements
✅ Learn and improve

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component               | Status   | Tier | Notes                |
| ----------------------- | -------- | ---- | -------------------- |
| Severity taxonomy (inherits STD-OPS-004) | IN PLACE | T1 | Same SEV1–SEV4 model |
| SIRT named primary + backup (sec-lead)   | IN PLACE | T1 | Per STD-ENG-007 Appendix X |
| Incident classification                  | COMPLETE | T1 | This standard §Classification |
| Evidence-preservation-on-declare         | PARTIAL | T1 | Documented; automation ROADMAP |
| 5-BD post-incident report for SEV1/SEV2  | IN PLACE | T1 | Template in STD-OPS-004 adopted |
| Legal flag on notification-trigger incidents | IN PLACE | T1 | Runbook step |
| Per-category playbooks                   | ROADMAP | T2 | Credential / data / DDoS / ransomware / insider |
| Annual tabletop exercise                 | ROADMAP | T2 | Re-trigger: Year-1 compliance cycle |
| Notification templates (legal-reviewed)  | ROADMAP | T2 | Paired with STD-LGL-001 T3 |
| Automated evidence collection            | ROADMAP | T2 | Re-trigger: after log-pipeline hardening (STD-OPS-003) |
| Quarterly incident metrics               | ROADMAP | T2 | Paired with STD-GOV-005 |
| Chain-of-custody forms                   | ROADMAP | T3 | Regulated projects only |
| External IR retainer                     | ROADMAP | T3 | Regulated projects only |
| 24×7 security on-call                    | ROADMAP | T3 | Regulated projects only |
| Regulator-clock automation (GDPR 72h…)   | ROADMAP | T3 | Regulated projects only |
| Forensic toolchain (EDR / memory / disk) | ROADMAP | T3 | Regulated projects only |

Status vocabulary: `IN PLACE` | `COMPLETE` | `PARTIAL` | `ROADMAP` | `N/A`.

### Migration Path

1. **Phase 1**: Formalize SIRT and contacts
2. **Phase 2**: Create evidence handling procedures
3. **Phase 3**: Develop incident playbooks
4. **Phase 4**: Contract IR retainer
5. **Phase 5**: Conduct tabletop exercise
6. **Phase 6**: Implement metrics/reporting

---

Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |
| v1.1    | 2026-04-22 | Unfreeze (Path B): Tier Table added (5 T1 rules leveraging STD-OPS-004 infrastructure). Playbooks, IR retainer, forensic toolchain reclassified to T2/T3 ROADMAP. Status vocabulary normalized. |




┌─────────────────────────────────────────────────────────────────────────────┐
│  CYBERCUBE SECURITY INCIDENT RESPONSE — DIRECTIVE BLOCK                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ AUTHORITY                                                                   │
│ Standard ID: STD-SEC-007                                                     │
│ Owner: Security Team                                                        │
│ Applies to: ALL security incidents affecting CYBERCUBE systems or data      │
│ Binding: MANDATORY                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PURPOSE                                                                     │
│ Define mandatory detection, response, investigation, notification,          │
│ evidence handling, and post-incident improvement for security incidents.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ GOVERNING PRINCIPLES                                                        │
│ • Speed of containment                                                      │
│ • Evidence preservation                                                     │
│ • Legal & regulatory compliance                                             │
│ • Clear accountability                                                      │
│ • Transparent communication                                                 │
│ • Continuous learning                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ INCIDENT SCOPE & SEPARATION                                                 │
│ • Applies ONLY to security incidents                                        │
│ • Operational incidents handled separately                                  │
│ • Legal and forensic handling REQUIRED                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ INCIDENT CLASSIFICATION                                                     │
│ Categories:                                                                 │
│ • Data Breach | Unauthorized Access | Malware | DoS | Insider Threat        │
│ • Social Engineering | Vulnerability Exploit | Physical Security            │
│                                                                             │
│ Severity Levels:                                                            │
│ SEV-1 Critical | SEV-2 High | SEV-3 Medium | SEV-4 Low                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ AUTOMATIC SEV-1 TRIGGERS                                                     │
│ • Confirmed PII breach                                                      │
│ • Active ransomware                                                         │
│ • Privileged credential compromise                                          │
│ • APT indicators                                                            │
│ • Production DB breach                                                      │
│ • Auth/AuthZ system compromise                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE AUTHORITY & ROLES                                                  │
│ • Incident Commander (IC): overall authority                                │
│ • Security Analysts: investigation & forensics                              │
│ • Engineering: remediation                                                  │
│ • Legal: regulatory & law enforcement coordination                          │
│ • Communications: internal/external messaging                               │
│ • Executive Sponsor: business decisions                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE LIFECYCLE (MANDATORY)                                              │
│ DETECT → TRIAGE → CONTAIN → INVESTIGATE → ERADICATE →                      │
│ RECOVER → NOTIFY → REVIEW                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE TIME REQUIREMENTS                                                  │
│ • SEV-1: < 15 minutes                                                       │
│ • SEV-2: < 1 hour                                                           │
│ • SEV-3: < 4 hours                                                          │
│ • SEV-4: < 24 hours                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ EVIDENCE HANDLING (MANDATORY)                                               │
│ • Preserve volatile evidence first                                          │
│ • Forensic imaging with write blockers                                      │
│ • Hash verification REQUIRED                                                │
│ • Chain of custody REQUIRED                                                 │
│ • Legal hold enforced when applicable                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ NOTIFICATION REQUIREMENTS                                                   │
│ • Regulatory notification per law (e.g., GDPR ≤ 72h)                        │
│ • Individual notification where risk exists                                 │
│ • Legal approval REQUIRED before external disclosure                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ FORENSICS                                                                   │
│ • Required for SEV-1 and SEV-2                                              │
│ • Scoped or optional for lower severities                                   │
│ • Root cause and timeline REQUIRED                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ POST-INCIDENT ACTIVITIES                                                    │
│ • Mandatory review by severity                                              │
│ • Root cause documented                                                     │
│ • Action items tracked to closure                                           │
│ • Metrics updated                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ METRICS                                                                     │
│ • MTTD | MTTR | MTTC                                                        │
│ • Incident count by severity                                                │
│ • Recurrence rate                                                          │
│ • Action item closure rate                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ COMPLIANCE & ENFORCEMENT                                                    │
│ • Undocumented deviations prohibited                                       │
│ • Violations escalate to leadership                                        │
│ • Aligned with ERM, Security Policy, Legal                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ OUTCOME                                                                    │
│ • Rapid, lawful incident response                                          │
│ • Preserved evidence                                                       │
│ • Reduced impact and recurrence                                            │
│ • Audit-grade incident governance                                          │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│ CYBERCUBE SECURITY IR — COMPLIANCE MATRIX (0–5)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCORING SCALE                                                               │
│ 0 = Not defined                                                             │
│ 1 = Defined only                                                            │
│ 2 = Partially implemented                                                   │
│ 3 = Implemented (baseline compliant)                                        │
│ 4 = Enforced, measured                                                      │
│ 5 = Institutionalized, audited                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR1 — INCIDENT GOVERNANCE & AUTHORITY                                      │
│ • IC authority defined                                                     │
│ • Clear RACI                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR2 — INCIDENT DETECTION                                                    │
│ • Monitoring coverage                                                     │
│ • MTTD targets met                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR3 — SEVERITY CLASSIFICATION                                               │
│ • Defined categories & severities                                         │
│ • Automatic SEV-1 triggers enforced                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR4 — RESPONSE SPEED                                                       │
│ • SLA adherence by severity                                               │
│ • On-call readiness                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR5 — CONTAINMENT & ERADICATION                                            │
│ • Effective isolation                                                     │
│ • Threat fully removed                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR6 — EVIDENCE HANDLING                                                    │
│ • Forensic procedures                                                     │
│ • Chain of custody maintained                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR7 — FORENSIC INVESTIGATION                                               │
│ • Root cause identified                                                   │
│ • Timeline reconstructed                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR8 — NOTIFICATION COMPLIANCE                                              │
│ • Regulatory timelines met                                                │
│ • Legal review documented                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR9 — COMMUNICATION & COORDINATION                                         │
│ • Secure channels                                                         │
│ • Executive visibility                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ IR10 — POST-INCIDENT REVIEW                                                │
│ • Reviews completed on time                                               │
│ • Action items closed                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL SCORE                                                                │
│ • Max: 50                                                                 │
│ • ≥45 = Incident-Response Mature                                          │
│ • 36–44 = Managed                                                         │
│ • 28–35 = Elevated risk                                                   │
│ • <28 = Unacceptable                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ HARD FAIL CONDITIONS                                                       │
│ • IR1 < 3 (No authority)                                                   │
│ • IR4 < 3 (Response SLAs missed)                                          │
│ • IR6 < 3 (Evidence integrity risk)                                       │
└─────────────────────────────────────────────────────────────────────────────┘
