# CYBERCUBE Business Associate Agreement (BAA) Standard Template

> **META-EXEMPT (POL-GOV-001 §8.8.1).** This is a legal *template* for customer BAAs under the HIPAA Privacy & Security Rules, not a normative standard for delivery projects. Instances of this template inherit their applicability tier from the triggering standard (HIPAA-scope products carry T3 tiering per [7] STD-GOV-006 and [25] STD-DAT-001). No Applicability Tier Table is required on the template itself.

**Standard ID:** TPL-LGL-002  
**Catalog Number:** 7.8 (Legal / Templates)  
**Version:** 1.0  
**Effective:** 2026-04-22  
**Classification:** INTERNAL — Template for Customer Agreements  
**Owner:** Legal Lead + Privacy Lead  
**Primary Compliance:** HIPAA Privacy Rule (45 CFR §160, §164 Subparts A & E), HIPAA Security Rule (45 CFR §164.306-318), HITECH Act, HHS Omnibus Rule (2013)  
**Authority:** U.S. Department of Health and Human Services — Office for Civil Rights (HHS/OCR)

---

## About This Template

This template establishes CYBERCUBE's standard Business Associate Agreement terms for customers who are Covered Entities (CEs) under HIPAA, or Business Associates (BAs) of CEs, and who cause CYBERCUBE to create, receive, maintain, or transmit Protected Health Information (PHI) on their behalf.

**Relationship to [16] TPL-LGL-001:**

- [16] TPL-LGL-001 DPA — GDPR/UK-GDPR/CCPA-shaped; processor/controller relationship under data-protection laws.
- [46] TPL-LGL-002 BAA (this document) — HIPAA-shaped; business-associate/covered-entity relationship under 45 CFR §164.504(e).
- The two templates are complementary; when a customer is both a EU/UK data controller and a HIPAA Covered Entity, both are executed (BAA for PHI, DPA for other personal data).

**Usage:**

- Attach as exhibit/schedule to Master Service Agreement (MSA), or execute as standalone agreement.
- Customize Schedules A-C per customer requirements with `legal-lead` sign-off per deal.
- The HIPAA Security Rule content carried by CYBERCUBE's UCM is mapped in `governance/compliance-maps/hipaa-security-rule.md` — that map identifies the CYBERCUBE technical safeguards an auditor/CE can reference as evidence.

**Legal Review:** All material modifications require `legal-lead` approval. Changes to the breach-notification window, subcontractor flow-down language, HHS access provisions, or Minimum Necessary acknowledgment are material and require `legal-lead` + `privacy-lead` dual sign-off.

---

# BUSINESS ASSOCIATE AGREEMENT

This Business Associate Agreement ("**BAA**") forms part of the Agreement between:

**Customer** (the "**Covered Entity**" or "**CE**"):  
[Customer Legal Name]  
[Address]  
[HIPAA Privacy Officer Contact Email]

and

**CYBERCUBE Inc.** (the "**Business Associate**" or "**BA**"):  
[CYBERCUBE Address]  
[Contact: baa@cybercube.software]

(each a "**Party**" and together the "**Parties**")

**Effective Date:** [Date]

---

## RECITALS

**WHEREAS:**

A. The Parties have entered into an agreement for the provision of services (the "**Principal Agreement**" or "**Agreement**");

B. In connection with the Principal Agreement, the Business Associate will create, receive, maintain, or transmit Protected Health Information on behalf of the Covered Entity;

C. The Parties wish to ensure that such activities comply with the HIPAA Privacy Rule, Security Rule, Breach Notification Rule, and Enforcement Rule (collectively, the "**HIPAA Rules**"), as amended by the HITECH Act and the Omnibus Rule;

D. This BAA is entered into to meet the requirements of 45 CFR §164.504(e).

**NOW, THEREFORE,** the Parties agree as follows:

---

## 1. DEFINITIONS AND INTERPRETATION

### 1.1 Definitions

Capitalized terms used but not defined in this BAA have the meanings assigned in 45 CFR §160.103 and §164.501.

| Term | Definition |
|------|------------|
| **Breach** | As defined at 45 CFR §164.402 — the acquisition, access, use, or disclosure of PHI in a manner not permitted under the Privacy Rule that compromises the security or privacy of the PHI. |
| **Business Associate** | As defined at 45 CFR §160.103. For purposes of this BAA, CYBERCUBE Inc. |
| **Covered Entity** | As defined at 45 CFR §160.103. For purposes of this BAA, the Customer. |
| **Electronic PHI (ePHI)** | PHI transmitted by or maintained in electronic media (45 CFR §160.103). |
| **HIPAA Rules** | The Privacy, Security, Breach Notification, and Enforcement Rules at 45 CFR Parts 160 and 164. |
| **Protected Health Information (PHI)** | As defined at 45 CFR §160.103, limited to information that the BA creates, receives, maintains, or transmits on behalf of the CE. |
| **Required by Law** | As defined at 45 CFR §164.103. |
| **Secretary** | The Secretary of the U.S. Department of Health and Human Services or designee. |
| **Services** | The services provided by the BA to the CE under the Principal Agreement. |
| **Subcontractor** | As defined at 45 CFR §160.103 — a person to whom the BA delegates a function, activity, or service involving PHI. |
| **Unsecured PHI** | As defined at 45 CFR §164.402 — PHI not rendered unusable, unreadable, or indecipherable per HHS guidance (typically encryption per NIST SP 800-111 / FIPS 140-2-3). |

### 1.2 Interpretation

Any ambiguity in this BAA is resolved in favor of a meaning that permits the Parties to comply with the HIPAA Rules.

---

## 2. PERMITTED AND REQUIRED USES AND DISCLOSURES OF PHI

### 2.1 Permitted Uses and Disclosures

The Business Associate may use or disclose PHI only:

(a) As necessary to perform the Services set forth in the Principal Agreement;

(b) As Required by Law;

(c) For the proper management and administration of the BA or to carry out the BA's legal responsibilities, provided that (i) disclosures are Required by Law, or (ii) the BA obtains reasonable assurances from the recipient that the PHI will be held confidentially and used or further disclosed only as Required by Law or for the purposes for which it was disclosed, and (iii) the recipient notifies the BA of any known breach of confidentiality;

(d) To provide Data Aggregation services relating to the health care operations of the Covered Entity, if permitted under the Principal Agreement (45 CFR §164.504(e)(2)(i)(B)).

### 2.2 Minimum Necessary

The Business Associate will make reasonable efforts to use, disclose, and request only the minimum amount of PHI necessary to accomplish the intended purpose, consistent with 45 CFR §164.502(b) and the CE's own Minimum Necessary policies as communicated.

### 2.3 Prohibited Uses and Disclosures

The Business Associate will not use or disclose PHI in any manner that would violate the Privacy Rule if done by the Covered Entity, except as expressly permitted in Section 2.1.

The Business Associate will not sell PHI or use PHI for marketing purposes except as permitted under 45 CFR §164.508 with the Covered Entity's written authorization on behalf of the individual.

### 2.4 De-identification

De-identified health information (per 45 CFR §164.514(b)) is not PHI and is not subject to this BAA. De-identification by the BA is permitted only per the procedures in [47] STD-DAT-005 (Safe-Harbor or Expert-Determination path) and with CE written consent.

---

## 3. SAFEGUARDS

### 3.1 Administrative, Physical, and Technical Safeguards

The Business Associate will implement administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of ePHI as required by the Security Rule (45 CFR §164.308, §164.310, §164.312, §164.316).

The BA's current safeguards are documented in the CYBERCUBE UCM ([7] STD-GOV-006) and mapped to HIPAA Security Rule requirements in `governance/compliance-maps/hipaa-security-rule.md`. Upon CE request, the BA will provide a current version of this mapping as evidence of compliance.

### 3.2 Required Safeguards Highlights

Without limiting §3.1, the BA commits to the following technical safeguards as part of baseline service:

| Safeguard | HIPAA Reference | CYBERCUBE Standard |
|-----------|-----------------|--------------------|
| Access control + unique user identification | 164.312(a)(2)(i) | STD-SEC-003, STD-SEC-004 |
| Audit controls — logging and review | 164.312(b) | STD-SEC-004 (AuthZ logging), STD-OPS-003 |
| Integrity — PHI not improperly altered | 164.312(c) | STD-SEC-005 (crypto), STD-DAT-002 (soft-delete lifecycle) |
| Transmission security — encryption in motion | 164.312(e)(1) | STD-SEC-005 (TLS 1.2+) |
| Encryption at rest (Addressable) | 164.312(a)(2)(iv) | STD-SEC-005 — CYBERCUBE treats as IMPLEMENT for any RESTRICTED data classification |

### 3.3 Incident Response

The BA will maintain an incident-response capability per [23] STD-SEC-007 with a documented triage process, documented response playbooks, and a named Privacy/Security contact on call.

---

## 4. REPORTING AND BREACH NOTIFICATION

### 4.1 Reporting of Non-Breach Security Incidents

The Business Associate will report to the Covered Entity any Security Incident (as defined in 45 CFR §164.304) involving ePHI of which the BA becomes aware. Successful unauthorized access, use, disclosure, modification, or destruction of ePHI will be reported **within 48 hours** of discovery. Attempted-but-unsuccessful incidents of routine character (e.g., port scans, failed login attempts against general infrastructure) are reported in an aggregated quarterly summary.

### 4.2 Breach Notification

The Business Associate will notify the Covered Entity of any Breach of Unsecured PHI **without unreasonable delay and in no case later than sixty (60) calendar days** after discovery (45 CFR §164.410), with the following prioritization:

- Initial notification within **five (5) business days** of discovery with preliminary information.
- Full report per 45 CFR §164.410(c) within thirty (30) calendar days (types of PHI, identification of individuals if known, actions taken, mitigation in progress).
- Final supplementary report at sixty (60) calendar days or sooner if investigation concludes earlier.

### 4.3 Content of Breach Notification

The BA's notification will include, to the extent known:

(a) Identification of each individual whose Unsecured PHI has been, or is reasonably believed to have been, accessed, acquired, used, or disclosed;

(b) A brief description of what happened, including the date of the breach and the date of discovery, if known;

(c) A description of the types of Unsecured PHI involved (name, social security number, date of birth, home address, account number, diagnosis, disability code, etc.);

(d) A brief description of what the BA is doing to investigate, mitigate harm, and protect against further breaches;

(e) Contact information for the BA's response team.

### 4.4 Cooperation

The BA will cooperate with the CE in the CE's fulfillment of its own breach-notification duties under 45 CFR §164.404.

---

## 5. SUBCONTRACTORS

### 5.1 Flow-Down Obligation

In accordance with 45 CFR §164.502(e)(1)(ii) and §164.308(b)(2), the Business Associate will ensure that any Subcontractor that creates, receives, maintains, or transmits PHI on behalf of the BA agrees in writing to restrictions and conditions at least as stringent as those in this BAA.

### 5.2 Subcontractor Register

The BA maintains a register of Subcontractors that process PHI per [9] POL-VEN-001 vendor-inventory governance; the CE may request a current list with categories of PHI accessed.

### 5.3 Addition of Subcontractors

The BA will provide the CE with **prior written notice** of any new Subcontractor that will process PHI, at least **thirty (30) days** before engagement. The CE may object on reasonable grounds; the Parties will cooperate in good faith to resolve objections.

---

## 6. INDIVIDUAL RIGHTS

### 6.1 Access

Within **fifteen (15) business days** of a CE request, the BA will make PHI in a Designated Record Set available to the CE (or at CE direction, to the individual) per 45 CFR §164.524.

### 6.2 Amendment

Within **fifteen (15) business days** of a CE request, the BA will make PHI available for amendment and incorporate any amendments as the CE directs, per 45 CFR §164.526.

### 6.3 Accounting of Disclosures

The BA will maintain a record of disclosures of PHI for purposes of an accounting under 45 CFR §164.528, and will provide this record within **thirty (30) days** of CE request.

### 6.4 Restrictions

If the CE agrees to a restriction under 45 CFR §164.522, the BA will comply with the restriction as communicated.

---

## 7. HHS ACCESS

Per 45 CFR §164.504(e)(2)(ii)(I), the Business Associate will make its internal practices, books, and records relating to the use and disclosure of PHI available to the Secretary of HHS for purposes of determining the Covered Entity's compliance with the Privacy Rule. CE will be notified promptly of any such request unless the notice is prohibited by law.

---

## 8. TERM AND TERMINATION

### 8.1 Term

This BAA is effective as of the Effective Date and continues until termination of the Principal Agreement or termination of this BAA pursuant to §8.2.

### 8.2 Termination for Cause

The CE may terminate this BAA (and the Principal Agreement, to the extent it permits) if the CE determines that the BA has materially breached an obligation of this BAA and has failed to cure within thirty (30) days of written notice. In the case of a breach that is not cured or not curable, the CE may proceed to termination without delay.

### 8.3 Return or Destruction of PHI

Upon termination of this BAA for any reason, the BA will, as directed by the CE and if feasible:

(a) Return to the CE or destroy all PHI received from, or created, maintained, or received on behalf of, the CE, including PHI in possession of Subcontractors; and

(b) Retain no copies of such PHI.

If return or destruction is not feasible, the BA will notify the CE of the reasons and extend the protections of this BAA to the retained PHI for as long as it is retained, limiting further uses and disclosures to the purposes that make return or destruction infeasible.

---

## 9. REPRESENTATIONS, MISCELLANEOUS

### 9.1 No Third-Party Beneficiaries

Nothing in this BAA confers benefits or rights on any third party.

### 9.2 Amendment to Comply with Law

The Parties agree to amend this BAA as reasonably necessary to comply with future changes to the HIPAA Rules or other applicable law.

### 9.3 Interpretation

In the event of an inconsistency between the provisions of this BAA and any other agreement between the Parties, the provisions of this BAA control to the extent required to comply with the HIPAA Rules.

### 9.4 Notices

All notices under this BAA to the Business Associate go to **baa@cybercube.software**; notices to the Covered Entity go to the contact identified in the Principal Agreement.

### 9.5 Governing Law

This BAA is governed by the laws specified in the Principal Agreement, except to the extent preempted by federal law.

---

## Schedule A — Scope of PHI Processed

*(customize per deal; covers the categories of PHI involved: demographics, clinical records, claims, imaging, lab results, genetic information, etc.)*

## Schedule B — Security Certifications (if any)

*(SOC 2 Type II, HITRUST CSF, ISO 27001 reports; refer CE to CYBERCUBE compliance-maps as starting point)*

## Schedule C — Subcontractor List (initial)

*(current list of BA's subcontractors that process PHI; categories of data; location of processing)*

## Schedule D — Schedule of Fees for Extraordinary Requests

*(e.g., the BA's cost-recovery rate for bulk data export, custom reports, or extraordinary audit support)*

---

## Cross-References

- **HIPAA Security Rule map** — `governance/compliance-maps/hipaa-security-rule.md` — the crosswalk between CYBERCUBE UCM and the 45 CFR §164.306-318 requirements.
- **[7] STD-GOV-006 UCM** — authoritative source for CYBERCUBE control rows.
- **[9] POL-VEN-001 Vendor Policy** — subcontractor inventory rules.
- **[15] STD-LGL-001 Legal Hold & eDiscovery** — compatibility rules for preservation obligations that intersect PHI retention.
- **[23] STD-SEC-007 Incident Response** — incident-response process referenced by §3.3 and §4.1.
- **[25] STD-DAT-001 Data Classification & Retention** — PHI carries RESTRICTED classification and T3 tier retention/protection rules.
- **[38] STD-OPS-003 Observability** — audit-log pipeline referenced by §3.2 Audit controls.
- **[47] STD-DAT-005 De-identification** — procedures that move data out of BAA scope.
- **[16] TPL-LGL-001 DPA Template** — sibling template for GDPR/UK-DPA/CCPA.

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-22 | Legal Lead + Privacy Lead | Initial publication per RFC-0005 §3.3. BAA template covering 45 CFR §164.504(e) required content: permitted uses, safeguards, breach notification (60-day max), subcontractor flow-down, HHS access rights, term + termination, return-or-destroy, Minimum Necessary. |

---

*End of CYBERCUBE BAA Standard Template.*
