# M-24 — File Upload Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.24 (lines 1669–1706)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.24 File Upload Module (M-24) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IFileUploadService                                                      │
│  MODULE: M-24 File Upload                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Upload                                                                          │
│  generatePresignedUrl(config: UploadConfig) → Result<PresignedUpload, Error>       │
│  completeUpload(uploadId: UploadId) → Result<FileMetadata, Error>                  │
│  cancelUpload(uploadId: UploadId) → Result<void, Error>                            │
│                                                                                     │
│  // Validation                                                                      │
│  validateFileType(file: File, allowedTypes: List<MimeType>) → Result<void, Error>  │
│  validateFileSize(file: File, maxSize: Bytes) → Result<void, Error>                │
│  scanForVirus(fileId: FileId) → Result<ScanResult, Error>                          │
│                                                                                     │
│  // Retrieval                                                                       │
│  getDownloadUrl(fileId: FileId, expiry: Duration) → Result<URL, Error>             │
│  getMetadata(fileId: FileId) → Result<FileMetadata, NotFoundError>                 │
│  deleteFile(fileId: FileId) → Result<void, Error>                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  LIMITS: Max size 100MB (configurable) | Allowed types: configurable per endpoint  │
│  STORAGE: S3-compatible (AWS S3, MinIO, GCS, Azure Blob)                           │
│  SECURITY: Virus scan required | Content-Type validation | No executable upload    │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ERROR CODES: FILE_001 Size exceeded | FILE_002 Type not allowed |                 │
│               FILE_003 Virus detected | FILE_004 Upload expired                     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
