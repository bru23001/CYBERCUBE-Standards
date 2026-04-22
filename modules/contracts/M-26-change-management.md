# M-26 — Change Management Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.26 (lines 1745–1782)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.26 Change Management Module (M-26) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IChangeManagementService                                                │
│  MODULE: M-26 Change Management                                                     │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Change Requests                                                                 │
│  createChangeRequest(request: ChangeRequest) → Result<ChangeId, Error>             │
│  updateChangeRequest(changeId: ChangeId, update: ChangeUpdate) → Result<void>      │
│  cancelChangeRequest(changeId: ChangeId, reason: String) → Result<void, Error>     │
│                                                                                     │
│  // Approval Workflow                                                               │
│  submitForApproval(changeId: ChangeId) → Result<void, Error>                       │
│  approve(changeId: ChangeId, approverId: UserId) → Result<void, Error>             │
│  reject(changeId: ChangeId, approverId: UserId, reason: String) → Result<void>     │
│  getApprovalStatus(changeId: ChangeId) → Result<ApprovalStatus, Error>             │
│                                                                                     │
│  // Execution                                                                       │
│  scheduleChange(changeId: ChangeId, window: TimeWindow) → Result<void, Error>      │
│  startImplementation(changeId: ChangeId) → Result<void, Error>                     │
│  completeImplementation(changeId: ChangeId) → Result<void, Error>                  │
│                                                                                     │
│  // Rollback                                                                        │
│  initiateRollback(changeId: ChangeId, reason: String) → Result<RollbackId, Error>  │
│  getRollbackPlan(changeId: ChangeId) → Result<RollbackPlan, Error>                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CHANGE TYPES: Standard (requires CAB) | Normal (single approver) | Emergency      │
│  EVENTS: CHANGE_SUBMITTED | CHANGE_APPROVED | CHANGE_IMPLEMENTED | CHANGE_ROLLED_BACK│
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
