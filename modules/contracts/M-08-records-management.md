# M-08 — Records Management Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.10 (lines 1127–1164)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.10 Records Management Module (M-08) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IRecordsManagementService                                               │
│  MODULE: M-08 Records Management                                                    │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Retention                                                                       │
│  setRetentionPolicy(resourceType: String, policy: RetentionPolicy) → Result<void>  │
│  getRetentionPolicy(resourceType: String) → Result<RetentionPolicy, NotFoundError> │
│  getRetentionExpiry(resourceId: ResourceId) → Result<Timestamp, Error>             │
│                                                                                     │
│  // Legal Hold                                                                      │
│  applyLegalHold(resourceId: ResourceId, holdId: HoldId) → Result<void, Error>      │
│  releaseLegalHold(resourceId: ResourceId, holdId: HoldId) → Result<void, Error>    │
│  isUnderLegalHold(resourceId: ResourceId) → Boolean                                │
│  getLegalHolds(resourceId: ResourceId) → List<LegalHold>                           │
│                                                                                     │
│  // Archive                                                                         │
│  archive(resourceId: ResourceId) → Result<ArchiveRef, Error>                       │
│  retrieveFromArchive(archiveRef: ArchiveRef) → Result<Resource, Error>             │
│                                                                                     │
│  // Disposal                                                                        │
│  scheduleDisposal(resourceId: ResourceId) → Result<DisposalJob, Error>             │
│  executeDisposal(jobId: JobId) → Result<DisposalReceipt, Error>                    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: LEGAL_HOLD_APPLIED | LEGAL_HOLD_RELEASED | RECORD_ARCHIVED |              │
│          RECORD_DISPOSED | RETENTION_POLICY_UPDATED                                 │
│  ERROR CODES: REC_001 Under legal hold | REC_002 Retention not expired             │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
