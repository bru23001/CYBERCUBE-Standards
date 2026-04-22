# M-16 — Cryptography Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.16 (lines 1357–1403)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.16 Cryptography Module (M-16) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: ICryptographyService                                                    │
│  MODULE: M-16 Cryptography                                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Symmetric Encryption                                                            │
│  encrypt(plaintext: Bytes, keyId: KeyId) → EncryptedPayload                        │
│  decrypt(payload: EncryptedPayload) → Result<Bytes, DecryptError>                  │
│                                                                                     │
│  // Envelope Encryption                                                             │
│  encryptWithDEK(plaintext: Bytes) → { ciphertext: Bytes, encryptedDEK: Bytes }     │
│  decryptWithDEK(ciphertext: Bytes, encryptedDEK: Bytes) → Result<Bytes, Error>     │
│                                                                                     │
│  // Key Operations                                                                  │
│  generateKey(algorithm: Algorithm) → Result<KeyId, Error>                          │
│  rotateKey(keyId: KeyId) → Result<KeyId, Error>                                    │
│  getKeyMetadata(keyId: KeyId) → Result<KeyMetadata, NotFoundError>                 │
│                                                                                     │
│  // Hashing                                                                         │
│  hash(data: Bytes, algorithm: HashAlgorithm) → Bytes                               │
│  hashPassword(password: String) → HashedPassword        // Argon2id                │
│  verifyPassword(password: String, hash: HashedPassword) → Boolean                  │
│                                                                                     │
│  // Utilities                                                                       │
│  generateSecureRandom(length: Int) → Bytes                                         │
│  constantTimeEquals(a: Bytes, b: Bytes) → Boolean                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ALGORITHMS:                                                                        │
│  • Symmetric: AES-256-GCM (default), ChaCha20-Poly1305                             │
│  • Asymmetric: RSA-2048+ (RSA-OAEP), ECDSA P-256 (ES256), Ed25519                 │
│  • Hashing: SHA-256+, SHA-3, BLAKE3                                                │
│  • Password: Argon2id (required)                                                    │
│  • MAC: HMAC-SHA256+                                                                │
│  • KDF: HKDF, Argon2, scrypt                                                       │
│  PROHIBITED (STD-SEC-005): AES-128, DES/3DES, RC4, MD5, SHA-1, DSA                │
│  KEY ROTATION: Automatic, configurable interval (default 90 days)                   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
