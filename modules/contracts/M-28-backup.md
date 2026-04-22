# M-28 — Backup Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.28 (lines 1818–1861)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.28 Backup Module (M-28) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IBackupService                                                          │
│  MODULE: M-28 Backup                                                                │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Backup Operations                                                               │
│  createBackup(config: BackupConfig) → Result<BackupId, Error>                      │
│  scheduleBackup(config: BackupConfig, schedule: CronSchedule) → Result<JobId>      │
│  cancelBackup(backupId: BackupId) → Result<void, Error>                            │
│  getBackupStatus(backupId: BackupId) → Result<BackupStatus, Error>                 │
│                                                                                     │
│  // Restore Operations                                                              │
│  initiateRestore(backupId: BackupId, target: RestoreTarget) → Result<RestoreId>    │
│  getRestoreStatus(restoreId: RestoreId) → Result<RestoreStatus, Error>             │
│  validateBackup(backupId: BackupId) → Result<ValidationResult, Error>              │
│                                                                                     │
│  // Retention                                                                       │
│  setRetentionPolicy(policy: RetentionPolicy) → Result<void, Error>                 │
│  listBackups(filter: BackupFilter, page: Page) → Result<PagedResult<BackupInfo>>   │
│  deleteBackup(backupId: BackupId) → Result<void, Error>                            │
│                                                                                     │
│  // Testing                                                                         │
│  scheduleRestoreTest(backupId: BackupId) → Result<TestId, Error>                   │
│  getLastTestResult(backupId: BackupId) → Result<TestResult, Error>                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  TYPES: Full | Incremental | Differential | Point-in-time                          │
│  RETENTION: Daily (7d) | Weekly (4w) | Monthly (12m) | Yearly (7y) — configurable  │
│  RTO/RPO: Configurable per backup policy                                            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: BACKUP_STARTED | BACKUP_COMPLETED | BACKUP_FAILED | RESTORE_COMPLETED     │
│  ERROR CODES: BKP_001 Storage full | BKP_002 Corruption detected |                 │
│               BKP_003 Restore failed                                                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
