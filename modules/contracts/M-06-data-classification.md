# M-06 — Data Classification Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.8 (lines 1052–1086)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.8 Data Classification Module (M-06) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IDataClassificationService                                              │
│  MODULE: M-06 Data Classification                                                   │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Classification                                                                  │
│  classify(resourceId: ResourceId, level: ClassificationLevel) → Result<void>       │
│  getClassification(resourceId: ResourceId) → Result<Classification, NotFoundError> │
│  reclassify(resourceId: ResourceId, newLevel: ClassificationLevel) → Result<void>  │
│                                                                                     │
│  // Policy                                                                          │
│  getHandlingRules(level: ClassificationLevel) → HandlingRules                      │
│  requiresEncryption(level: ClassificationLevel) → Boolean                          │
│  getAllowedExportFormats(level: ClassificationLevel) → List<ExportFormat>          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CLASSIFICATION LEVELS:                                                             │
│  • PUBLIC        — No restrictions                                                  │
│  • INTERNAL      — Company employees only                                           │
│  • CONFIDENTIAL  — Need-to-know, encrypted at rest                                  │
│  • RESTRICTED    — Encrypted, audit all access, no export                           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: DATA_CLASSIFIED | DATA_RECLASSIFIED | CLASSIFICATION_VIOLATION            │
│  ERROR CODES: CLS_001 Invalid level | CLS_002 Downgrade not allowed                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
