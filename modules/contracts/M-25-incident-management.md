# M-25 — Incident Management Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.25 (lines 1705–1742)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.25 Incident Management Module (M-25) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IIncidentManagementService                                              │
│  MODULE: M-25 Incident Management                                                   │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Incident Lifecycle                                                              │
│  declare(incident: IncidentDeclaration) → Result<IncidentId, Error>                │
│  update(incidentId: IncidentId, update: IncidentUpdate) → Result<void, Error>      │
│  resolve(incidentId: IncidentId, resolution: Resolution) → Result<void, Error>     │
│  close(incidentId: IncidentId) → Result<void, Error>                               │
│                                                                                     │
│  // Classification                                                                  │
│  setSeverity(incidentId: IncidentId, severity: Severity) → Result<void, Error>     │
│  setImpact(incidentId: IncidentId, impact: Impact) → Result<void, Error>           │
│  categorize(incidentId: IncidentId, category: Category) → Result<void, Error>      │
│                                                                                     │
│  // Escalation                                                                      │
│  escalate(incidentId: IncidentId, level: EscalationLevel) → Result<void, Error>    │
│  assignResponder(incidentId: IncidentId, userId: UserId) → Result<void, Error>     │
│  pageOnCall(incidentId: IncidentId) → Result<void, Error>                          │
│                                                                                     │
│  // Postmortem                                                                      │
│  createPostmortem(incidentId: IncidentId) → Result<PostmortemId, Error>            │
│  getTimeline(incidentId: IncidentId) → Result<List<TimelineEvent>, Error>          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SEVERITIES: SEV1 (Critical) | SEV2 (High) | SEV3 (Medium) | SEV4 (Low)            │
│  SLA: SEV1 → 15min response | SEV2 → 1hr | SEV3 → 4hr | SEV4 → 24hr               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
