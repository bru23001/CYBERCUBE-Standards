# M-17 — Secret Management Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.17 (lines 1406–1444)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.17 Secret Management Module (M-17) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ISecretManagementService                                                │
│  MODULE: M-17 Secret Management                                                     │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Secret Operations                                                               │
│  getSecret(secretId: SecretId) → Result<Secret, SecretError>                       │
│  setSecret(secretId: SecretId, value: SecretValue) → Result<void, Error>           │
│  deleteSecret(secretId: SecretId) → Result<void, Error>                            │
│  listSecrets(path: String) → Result<List<SecretMetadata>, Error>                   │
│                                                                                     │
│  // Rotation                                                                        │
│  rotateSecret(secretId: SecretId) → Result<Secret, Error>                          │
│  scheduleRotation(secretId: SecretId, interval: Duration) → Result<void, Error>    │
│  getRotationHistory(secretId: SecretId) → List<RotationEvent>                      │
│                                                                                     │
│  // Access Control                                                                  │
│  grantAccess(secretId: SecretId, principal: Principal) → Result<void, Error>       │
│  revokeAccess(secretId: SecretId, principal: Principal) → Result<void, Error>      │
│  getAccessPolicy(secretId: SecretId) → Result<AccessPolicy, Error>                 │
│                                                                                     │
│  // Injection                                                                       │
│  injectAsEnv(secretIds: List<SecretId>) → Map<String, String>                      │
│  injectAsFile(secretId: SecretId, path: FilePath) → Result<void, Error>            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  BACKENDS: GCP Secret Manager (primary) | HashiCorp Vault | AWS Secrets Manager |  │
│           Azure Key Vault | K8s Secrets                                            │
│  EVENTS: SECRET_ACCESSED | SECRET_ROTATED | SECRET_CREATED | SECRET_DELETED        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
