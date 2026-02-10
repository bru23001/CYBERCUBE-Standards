CYBERCUBE Cryptography & Key Management Standard (v1)

> Key terms are defined in **Appendix A: Glossary** at the end of this document.

---

**Standard ID:** STD-SEC-005**Status:** Active**Effective:** 2026-01-17**Classification:** INTERNAL**Owner:** Security Team**Applies to:** All CYBERCUBE systems handling cryptographic operations

0. Purpose & Design Principles

This standard defines approved cryptographic algorithms, key management
requirements, secrets handling procedures, and certificate management for
CYBERCUBE systems. It ensures consistent, auditable, and secure use of
cryptography across all products and services.

Industry alignment:

- NIST SP 800-57 (Key Management)
- NIST SP 800-131A (Cryptographic Standards)
- OWASP Cryptographic Failures Prevention
- PCI DSS (Cryptography Requirements)
- SOC 2 Type II (CC6.1, CC6.7)
- ISO/IEC 27001 (A.10 Cryptography)

Design principles:

1. **Approved Only** — Use only vetted, approved algorithms
2. **Defense in Depth** — Layered cryptographic protection
3. **Key Separation** — Different keys for different purposes
4. **Automated Rotation** — Keys rotate without manual intervention
5. **Secrets Never Exposed** — No plaintext secrets in code or logs
6. **Auditable** — All key operations logged

Conventions:

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in RFC 2119.

This document does NOT define:

- Application-level authentication — see Authentication & Identity Standard
- Access control decisions — see Authorization & Access Control Standard
- Data classification — see Data Classification & Retention Standard

1. Approved Algorithms

Only approved algorithms may be used in CYBERCUBE systems.

1.1 Symmetric Encryption

| Algorithm | Key Size | Mode       | Use Case           | Status     |
| --------- | -------- | ---------- | ------------------ | ---------- |
| AES       | 256-bit  | GCM        | Data encryption    | APPROVED   |
| AES       | 256-bit  | CBC + HMAC | Legacy only        | DEPRECATED |
| AES       | 128-bit  | Any        | —                 | PROHIBITED |
| ChaCha20  | 256-bit  | Poly1305   | Alternative to AES | APPROVED   |
| 3DES      | Any      | Any        | —                 | PROHIBITED |
| DES       | Any      | Any        | —                 | PROHIBITED |
| RC4       | Any      | Any        | —                 | PROHIBITED |
| Blowfish  | Any      | Any        | —                 | PROHIBITED |

**Default:** AES-256-GCM

```typescript
// ✅ Approved: AES-256-GCM
import { createCipheriv, randomBytes } from 'crypto';

function encryptAES256GCM(plaintext: Buffer, key: Buffer): EncryptedData {
  const iv = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  
  const ciphertext = Buffer.concat([
    cipher.update(plaintext),
    cipher.final()
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return { iv, ciphertext, authTag };
}

// ❌ PROHIBITED: AES-128, CBC without HMAC, DES, 3DES, RC4
```

1.2 Asymmetric Encryption

| Algorithm | Key Size   | Use Case              | Status               |
| --------- | ---------- | --------------------- | -------------------- |
| RSA       | 4096-bit   | Signing, key exchange | APPROVED (preferred) |
| RSA       | 2048-bit   | Signing, key exchange | APPROVED (minimum)   |
| RSA       | < 2048-bit | —                    | PROHIBITED           |
| ECDSA     | P-384      | Signing               | APPROVED (preferred) |
| ECDSA     | P-256      | Signing               | APPROVED             |
| ECDSA     | P-521      | High security         | APPROVED             |
| Ed25519   | 256-bit    | Signing               | APPROVED             |
| X25519    | 256-bit    | Key exchange          | APPROVED             |
| DSA       | Any        | —                    | PROHIBITED           |

**Default signing:** Ed25519 or ECDSA P-384
**Default key exchange:** X25519 or ECDH P-384

```typescript
// ✅ Approved: Ed25519 signing
import { generateKeyPairSync, sign, verify } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('ed25519');

function signData(data: Buffer, privateKey: KeyObject): Buffer {
  return sign(null, data, privateKey);
}

function verifySignature(data: Buffer, signature: Buffer, publicKey: KeyObject): boolean {
  return verify(null, data, publicKey, signature);
}
```

1.3 Hash Functions

| Algorithm | Output Size | Use Case              | Status     |
| --------- | ----------- | --------------------- | ---------- |
| SHA-512   | 512-bit     | High security hashing | APPROVED   |
| SHA-384   | 384-bit     | General hashing       | APPROVED   |
| SHA-256   | 256-bit     | General hashing       | APPROVED   |
| SHA-3-256 | 256-bit     | Alternative           | APPROVED   |
| BLAKE3    | Variable    | High performance      | APPROVED   |
| SHA-1     | 160-bit     | —                    | PROHIBITED |
| MD5       | 128-bit     | —                    | PROHIBITED |
| MD4       | 128-bit     | —                    | PROHIBITED |

**Default:** SHA-256 (general), SHA-512 (high security)

```typescript
// ✅ Approved: SHA-256
import { createHash } from 'crypto';

function hashSHA256(data: Buffer): Buffer {
  return createHash('sha256').update(data).digest();
}

// ❌ PROHIBITED: MD5, SHA-1
// const hash = createHash('md5').update(data).digest(); // NEVER
```

1.4 Password Hashing

| Algorithm       | Parameters                | Use Case         | Status               |
| --------------- | ------------------------- | ---------------- | -------------------- |
| Argon2id        | m=64MB, t=3, p=4          | Password storage | APPROVED (preferred) |
| bcrypt          | cost=12+                  | Password storage | APPROVED             |
| scrypt          | N=2^17, r=8, p=1          | Password storage | APPROVED             |
| PBKDF2          | SHA-256, 600k+ iterations | Password storage | APPROVED (legacy)    |
| SHA-256 (plain) | —                        | —               | PROHIBITED           |
| MD5 (plain)     | —                        | —               | PROHIBITED           |

**Default:** Argon2id

```typescript
// ✅ Approved: Argon2id
import argon2 from 'argon2';

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,      // 64 MB
    timeCost: 3,            // 3 iterations
    parallelism: 4,         // 4 parallel threads
  });
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
```

1.5 Message Authentication

| Algorithm   | Use Case          | Status     |
| ----------- | ----------------- | ---------- |
| HMAC-SHA256 | General MAC       | APPROVED   |
| HMAC-SHA384 | High security MAC | APPROVED   |
| HMAC-SHA512 | High security MAC | APPROVED   |
| Poly1305    | With ChaCha20     | APPROVED   |
| HMAC-MD5    | —                | PROHIBITED |
| HMAC-SHA1   | —                | DEPRECATED |

**Default:** HMAC-SHA256

```typescript
// ✅ Approved: HMAC-SHA256
import { createHmac, timingSafeEqual } from 'crypto';

function createMAC(data: Buffer, key: Buffer): Buffer {
  return createHmac('sha256', key).update(data).digest();
}

function verifyMAC(data: Buffer, mac: Buffer, key: Buffer): boolean {
  const expected = createMAC(data, key);
  return timingSafeEqual(expected, mac);
}
```

1.6 Key Derivation

| Algorithm | Use Case                         | Status   |
| --------- | -------------------------------- | -------- |
| HKDF      | Key derivation from high-entropy | APPROVED |
| PBKDF2    | Key derivation from passwords    | APPROVED |
| Argon2    | Key derivation from passwords    | APPROVED |
| scrypt    | Key derivation from passwords    | APPROVED |

```typescript
// ✅ Approved: HKDF for key derivation
import { hkdf } from 'crypto';

async function deriveKey(
  masterKey: Buffer,
  salt: Buffer,
  info: string,
  length: number
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    hkdf('sha256', masterKey, salt, info, length, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(Buffer.from(derivedKey));
    });
  });
}
```

2. Transport Layer Security

All network communications must use approved TLS configurations.

2.1 TLS Version Requirements

| Version | Status     | Notes              |
| ------- | ---------- | ------------------ |
| TLS 1.3 | PREFERRED  | Use when supported |
| TLS 1.2 | APPROVED   | Minimum required   |
| TLS 1.1 | PROHIBITED | Must be disabled   |
| TLS 1.0 | PROHIBITED | Must be disabled   |
| SSL 3.0 | PROHIBITED | Must be disabled   |
| SSL 2.0 | PROHIBITED | Must be disabled   |

2.2 Approved Cipher Suites

**TLS 1.3 (preferred):**

```
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
```

**TLS 1.2 (minimum):**

```
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
```

> **Note:** AES-128 cipher suites are excluded to align with §1.1 (AES-256 only).

**PROHIBITED cipher suites:**

- Any with NULL encryption
- Any with RC4, DES, 3DES
- Any with MD5 MAC
- Any with EXPORT grade
- Any without forward secrecy (non-ECDHE/DHE)

2.3 TLS Configuration

```nginx
# Nginx TLS configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';
ssl_ecdh_curve X25519:P-384:P-256;
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
```

```typescript
// Node.js TLS configuration
import { createServer } from 'https';
import { readFileSync } from 'fs';

// Note: TLS 1.3 cipher suites are managed by Node.js internally
// and cannot be set via the 'ciphers' option. Only TLS 1.2 suites
// are configured here; TLS 1.3 defaults are secure.
const server = createServer({
  key: readFileSync('server.key'),
  cert: readFileSync('server.crt'),
  minVersion: 'TLSv1.2',
  ciphers: [
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'ECDHE-RSA-CHACHA20-POLY1305',
    'ECDHE-ECDSA-CHACHA20-POLY1305',
  ].join(':'),
  honorCipherOrder: true,
  ecdhCurve: 'X25519:P-384:P-256',
});
```

2.4 Certificate Requirements

| Attribute  | Requirement                                |
| ---------- | ------------------------------------------ |
| Key type   | RSA-2048+ or ECDSA P-256+                  |
| Signature  | SHA-256 or stronger                        |
| Validity   | 90 days (public), 1 year (internal)        |
| SAN        | Required (CN deprecated for host identity) |
| Chain      | Complete chain must be served              |
| Revocation | OCSP stapling preferred                    |

3. Key Management

Cryptographic keys must be managed according to their classification and purpose.

3.1 Key Classification

| Classification      | Examples                     | Storage            | Access             |
| ------------------- | ---------------------------- | ------------------ | ------------------ |
| Master Key          | KMS root, HSM master         | HSM only           | Security team only |
| Key Encryption Key  | KEKs for envelope encryption | KMS                | Service accounts   |
| Data Encryption Key | DEKs for data                | Encrypted (by KEK) | Application        |
| Signing Key         | Code signing, API signing    | KMS/HSM            | CI/CD, services    |
| API Key             | Service authentication       | Secrets manager    | Application        |
| TLS Certificate     | Server identity              | Secrets manager    | Load balancer      |

3.2 Key Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          KEY LIFECYCLE                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│  │ GENERATE │──▶│ ACTIVATE │──▶│  ACTIVE  │──▶│ ROTATE   │──▶│ RETIRED  │ │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘ │
│       │                             │                              │        │
│       ▼                             ▼                              ▼        │
│   Secure RNG                   In use for                    Decrypt only   │
│   Approved algo                encrypt/sign                  (grace period) │
│   Proper length                                                             │
│                                                              ┌──────────┐  │
│                                                              │ DESTROY  │  │
│                                                              └──────────┘  │
│                                                                    │        │
│                                                                    ▼        │
│                                                              Secure wipe    │
│                                                              Audit logged   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

3.3 Key Rotation Schedule

| Key Type            | Rotation Period | Grace Period | Automation            |
| ------------------- | --------------- | ------------ | --------------------- |
| Master/Root Key     | 2 years         | N/A          | Manual (HSM ceremony) |
| KEK (KMS)           | 1 year          | 30 days      | Automatic             |
| DEK (Data)          | 90 days         | 14 days      | Automatic             |
| TLS Certificate     | 90 days         | 30 days      | Automatic (ACME)      |
| API Signing Key     | 6 months        | 14 days      | Automatic             |
| Service Account Key | 90 days         | 7 days       | Automatic             |
| User API Key        | On request      | Immediate    | Manual                |
| SSH Key             | 1 year          | 7 days       | Semi-automatic        |

3.4 Key Generation Requirements

| Requirement         | Specification                 |
| ------------------- | ----------------------------- |
| Entropy source      | CSPRNG (OS-provided or HSM)   |
| Minimum entropy     | 256 bits for symmetric keys   |
| Key uniqueness      | Every key must be unique      |
| Key purpose         | Single purpose per key        |
| Generation location | KMS, HSM, or approved library |

```typescript
// ✅ Approved: Key generation
import { randomBytes, generateKeyPairSync } from 'crypto';

// Symmetric key generation
function generateSymmetricKey(): Buffer {
  return randomBytes(32); // 256-bit key
}

// Asymmetric key generation
function generateKeyPair() {
  return generateKeyPairSync('ec', {
    namedCurve: 'P-384',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

// ❌ PROHIBITED: Weak key generation
// const key = 'my-secret-key'; // NEVER - not random
// const key = crypto.randomBytes(8); // NEVER - too short
```

3.5 Key Storage Requirements

| Key Type    | Storage Location    | Protection                  |
| ----------- | ------------------- | --------------------------- |
| Master Key  | HSM                 | Hardware protected          |
| KEK         | KMS                 | KMS-managed, IAM-controlled |
| DEK         | Encrypted file/DB   | Encrypted by KEK            |
| Private Key | KMS/Secrets Manager | Access-controlled           |
| API Key     | Secrets Manager     | Access-controlled           |
| Certificate | Secrets Manager     | Access-controlled           |

**PROHIBITED storage locations:**

- Source code repositories
- Configuration files (unencrypted)
- Environment variables (for long-term secrets)
- Local filesystems (unencrypted)
- Logs or monitoring systems
- Email or chat systems
- Spreadsheets or documents

3.6 Envelope Encryption

All data encryption must use envelope encryption:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENVELOPE ENCRYPTION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           KMS / HSM                                 │   │
│  │                                                                     │   │
│  │   ┌─────────────┐                                                   │   │
│  │   │ Master Key  │  (Never leaves KMS/HSM)                           │   │
│  │   └──────┬──────┘                                                   │   │
│  │          │                                                          │   │
│  │          ▼                                                          │   │
│  │   ┌─────────────┐                                                   │   │
│  │   │    KEK      │  (Key Encryption Key)                             │   │
│  │   └──────┬──────┘                                                   │   │
│  │          │                                                          │   │
│  └──────────│──────────────────────────────────────────────────────────┘   │
│             │                                                               │
│             ▼  Encrypts                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Application                                  │   │
│  │                                                                     │   │
│  │   ┌─────────────┐         ┌─────────────────────────────────────┐  │   │
│  │   │    DEK      │ ──────▶ │         Encrypted Data              │  │   │
│  │   │ (encrypted) │         │                                     │  │   │
│  │   └─────────────┘         └─────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

```typescript
// Envelope encryption implementation
import { KMSClient, GenerateDataKeyCommand, DecryptCommand } from '@aws-sdk/client-kms';

class EnvelopeEncryption {
  private kms: KMSClient;
  private keyId: string;
  
  async encrypt(plaintext: Buffer): Promise<EncryptedEnvelope> {
    // Generate DEK via KMS
    const { Plaintext: dek, CiphertextBlob: encryptedDek } = await this.kms.send(
      new GenerateDataKeyCommand({
        KeyId: this.keyId,
        KeySpec: 'AES_256',
      })
    );
  
    // Encrypt data with DEK
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', dek, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const authTag = cipher.getAuthTag();
  
    // Clear DEK from memory
    dek.fill(0);
  
    return {
      encryptedDek: Buffer.from(encryptedDek!),
      iv,
      ciphertext,
      authTag,
    };
  }
  
  async decrypt(envelope: EncryptedEnvelope): Promise<Buffer> {
    // Decrypt DEK via KMS
    const { Plaintext: dek } = await this.kms.send(
      new DecryptCommand({
        CiphertextBlob: envelope.encryptedDek,
      })
    );
  
    // Decrypt data with DEK
    const decipher = createDecipheriv('aes-256-gcm', dek, envelope.iv);
    decipher.setAuthTag(envelope.authTag);
    const plaintext = Buffer.concat([
      decipher.update(envelope.ciphertext),
      decipher.final(),
    ]);
  
    // Clear DEK from memory
    dek.fill(0);
  
    return plaintext;
  }
}
```

4. Secrets Management

All secrets must be stored and accessed through approved secrets management.

4.1 Secret Types

| Type                 | Examples                          | Storage         |
| -------------------- | --------------------------------- | --------------- |
| Cryptographic Keys   | AES keys, RSA private keys        | KMS / HSM       |
| API Credentials      | API keys, OAuth secrets           | Secrets Manager |
| Database Credentials | Passwords, connection strings     | Secrets Manager |
| Service Tokens       | JWT signing keys, webhook secrets | Secrets Manager |
| Certificates         | TLS certificates, signing certs   | Secrets Manager |
| Infrastructure       | Cloud credentials, SSH keys       | Secrets Manager |

4.2 Approved Secrets Managers

| Provider  | Service         | Use Case              |
| --------- | --------------- | --------------------- |
| AWS       | Secrets Manager | Application secrets   |
| AWS       | KMS             | Cryptographic keys    |
| GCP       | Secret Manager  | Application secrets   |
| GCP       | Cloud KMS       | Cryptographic keys    |
| HashiCorp | Vault           | Multi-cloud, advanced |
| Azure     | Key Vault       | Azure environments    |

4.3 Secrets Handling Rules

**MANDATORY:**

- All secrets stored in approved secrets manager
- Secrets accessed at runtime only (not bundled)
- Secrets injected via secure mechanisms
- Secrets audit logged on access
- Secrets rotated per schedule

**PROHIBITED:**

- Secrets in source code
- Secrets in configuration files
- Secrets in container images
- Secrets in logs or monitoring
- Secrets transmitted in plaintext
- Secrets in email or chat
- Hardcoded secrets anywhere

4.4 Environment Variables

Environment variables may contain secret **references**, not secrets:

```yaml
# ✅ Approved: Reference to secrets manager
environment:
  DATABASE_URL: "secretsmanager://prod/database/url"
  API_KEY_SECRET_ID: "arn:aws:secretsmanager:us-east-1:123456789:secret:api-key"

# ❌ PROHIBITED: Actual secrets in env vars
environment:
  DATABASE_PASSWORD: "super-secret-password"  # NEVER
  API_KEY: "sk_live_123456789"  # NEVER
```

```typescript
// ✅ Approved: Fetch secret at runtime
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

async function getSecret(secretId: string): Promise<string> {
  const client = new SecretsManager();
  const response = await client.getSecretValue({ SecretId: secretId });
  return response.SecretString!;
}

// Use in application
const dbPassword = await getSecret(process.env.DB_PASSWORD_SECRET_ID);
```

4.5 Secret Rotation

```typescript
// Automated secret rotation
interface SecretRotation {
  secretId: string;
  rotationPeriod: number;  // days
  rotationLambda: string;
}

const rotationConfig: SecretRotation[] = [
  { secretId: 'prod/database/password', rotationPeriod: 30, rotationLambda: 'rotate-db-password' },
  { secretId: 'prod/api/signing-key', rotationPeriod: 90, rotationLambda: 'rotate-api-key' },
];
```

```json
// AWS Secrets Manager rotation IAM policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:RotateSecret",
        "secretsmanager:GetSecretValue",
        "secretsmanager:PutSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:*:*:secret:prod/*"
    }
  ]
}
```

4.6 Pre-Commit Secret Detection

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
        exclude: 'tests/.*|\.secrets\.baseline'

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

```yaml
# CI/CD secret scanning
- name: Scan for secrets
  uses: trufflesecurity/trufflehog@main
  with:
    path: ./
    extra_args: --only-verified
```

5. Certificate Management

Digital certificates must be managed throughout their lifecycle.

5.1 Certificate Types

| Type             | Use Case            | Validity   | Storage         |
| ---------------- | ------------------- | ---------- | --------------- |
| TLS Server       | HTTPS endpoints     | 90 days    | Secrets Manager |
| TLS Client       | mTLS authentication | 1 year     | Secrets Manager |
| Code Signing     | Software signing    | 1 year     | HSM             |
| Document Signing | PDF, contracts      | 1 year     | HSM             |
| Internal CA      | Private PKI         | 5-10 years | HSM             |

5.2 Certificate Requirements

| Attribute  | Public TLS               | Internal TLS | Code Signing            |
| ---------- | ------------------------ | ------------ | ----------------------- |
| Key Type   | ECDSA P-384 or RSA-2048+ | ECDSA P-256+ | RSA-4096 or ECDSA P-384 |
| Hash       | SHA-256+                 | SHA-256+     | SHA-256+                |
| Validity   | 90 days max              | 1 year max   | 1 year max              |
| Revocation | OCSP stapling            | CRL or OCSP  | CRL required            |
| Extensions | SAN required             | SAN required | EKU: Code Signing       |

5.3 Certificate Automation

```yaml
# cert-manager for Kubernetes
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: api-tls
  namespace: production
spec:
  secretName: api-tls-secret
  duration: 2160h    # 90 days
  renewBefore: 360h  # 15 days before expiry
  isCA: false
  privateKey:
    algorithm: ECDSA
    size: 384
  usages:
    - server auth
  dnsNames:
    - api.cybercube.software
    - "*.api.cybercube.software"
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
```

5.4 Certificate Monitoring

```typescript
// Certificate expiration monitoring
interface CertificateInfo {
  domain: string;
  expiresAt: Date;
  daysRemaining: number;
  issuer: string;
}

async function checkCertificateExpiration(domain: string): Promise<CertificateInfo> {
  // Implementation to check certificate
  // Alert if daysRemaining < 30
}

// Monitoring thresholds
const CERT_ALERT_THRESHOLDS = {
  warning: 30,  // days
  critical: 14, // days
  expired: 0,
};
```

6. Hardware Security Modules (HSM)

HSMs provide hardware-backed security for high-value keys.

6.1 HSM Requirements

| Requirement   | Specification                                                |
| ------------- | ------------------------------------------------------------ |
| Certification | FIPS 140-2 Level 3 minimum (FIPS 140-3 for new procurements) |
| Key Types     | Master keys, root CA, signing keys                           |
| Access        | Multi-person control (M-of-N)                                |
| Audit         | All operations logged                                        |
| Backup        | Secure key backup procedures                                 |

6.2 HSM Use Cases

| Use Case              | Requirement Level |
| --------------------- | ----------------- |
| Master/Root Keys      | REQUIRED          |
| Certificate Authority | REQUIRED          |
| Code Signing          | REQUIRED          |
| Payment Processing    | REQUIRED          |
| High-Value Signing    | RECOMMENDED       |
| Key Encryption Keys   | RECOMMENDED       |

6.3 Cloud HSM Services

| Provider | Service       | FIPS Level  | Notes           |
| -------- | ------------- | ----------- | --------------- |
| AWS      | CloudHSM      | 140-2 L3    | Dedicated HSM   |
| AWS      | KMS           | 140-2 L2/L3 | Managed service |
| GCP      | Cloud HSM     | 140-2 L3    | Managed HSM     |
| Azure    | Dedicated HSM | 140-2 L3    | Dedicated HSM   |
| Azure    | Managed HSM   | 140-2 L3    | Managed service |

6.4 HSM Key Ceremony

Root key generation requires a formal ceremony:

```markdown
# HSM Key Ceremony Checklist

## Participants (M-of-N required, e.g., 3-of-5)
- [ ] Security Officer 1
- [ ] Security Officer 2
- [ ] Security Officer 3
- [ ] Witness 1
- [ ] Witness 2

## Pre-Ceremony
- [ ] Verify HSM integrity
- [ ] Verify smart cards / tokens
- [ ] Prepare air-gapped workstation
- [ ] Video recording enabled
- [ ] Audit log enabled

## Ceremony Steps
1. [ ] Initialize HSM (if new)
2. [ ] Generate master key
3. [ ] Split key into shares (M-of-N)
4. [ ] Distribute shares to custodians
5. [ ] Verify key reconstruction
6. [ ] Backup encrypted key material
7. [ ] Document serial numbers

## Post-Ceremony
- [ ] Secure storage of key shares
- [ ] Archive video recording
- [ ] Sign ceremony documentation
- [ ] Update key inventory
```

7. Encryption at Rest

All sensitive data must be encrypted at rest.

7.1 Data Categories

| Data Classification | Encryption Required | Key Management                    |
| ------------------- | ------------------- | --------------------------------- |
| RESTRICTED          | MANDATORY           | Customer-managed or CYBERCUBE KMS |
| CONFIDENTIAL        | MANDATORY           | CYBERCUBE KMS                     |
| INTERNAL            | REQUIRED            | CYBERCUBE KMS                     |
| PUBLIC              | OPTIONAL            | Platform default                  |

7.2 Database Encryption

```sql
-- PostgreSQL Transparent Data Encryption (via cloud provider)
-- AWS RDS: encryption-at-rest enabled at instance level
-- GCP Cloud SQL: encryption-at-rest enabled by default

-- Column-level encryption for highly sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example: Encrypt PII fields
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email_encrypted BYTEA,
  email_iv BYTEA,
  -- Other fields...
);

-- Application handles encryption/decryption via envelope encryption
```

7.3 File/Object Encryption

```typescript
// S3 server-side encryption with KMS
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client();

await s3.send(new PutObjectCommand({
  Bucket: 'sensitive-data',
  Key: 'document.pdf',
  Body: fileBuffer,
  ServerSideEncryption: 'aws:kms',
  SSEKMSKeyId: 'arn:aws:kms:us-east-1:123456789:key/key-id',
}));
```

7.4 Backup Encryption

| Backup Type         | Encryption                     | Key Storage          |
| ------------------- | ------------------------------ | -------------------- |
| Database            | AES-256 (RDS/CloudSQL default) | Cloud KMS            |
| File Storage        | AES-256 (S3/GCS default)       | Cloud KMS            |
| Application Backups | AES-256-GCM                    | Dedicated backup KEK |
| Disaster Recovery   | AES-256-GCM                    | Cross-region KEK     |

8. Audit & Compliance

All cryptographic operations must be auditable.

8.1 Audit Requirements

| Operation              | Logging Required                |
| ---------------------- | ------------------------------- |
| Key generation         | YES - who, when, key ID         |
| Key rotation           | YES - old key, new key, reason  |
| Key destruction        | YES - key ID, method, approver  |
| Encryption operations  | NO (volume too high)            |
| Decryption operations  | NO (volume too high)            |
| Key access grants      | YES - who, to whom, permissions |
| Key access revocations | YES - who, from whom, reason    |
| Certificate issuance   | YES - subject, validity, issuer |
| Certificate revocation | YES - serial, reason, time      |

8.2 KMS Audit Logging

```json
// AWS CloudTrail KMS event
{
  "eventVersion": "1.08",
  "eventSource": "kms.amazonaws.com",
  "eventName": "GenerateDataKey",
  "eventTime": "2026-01-17T12:00:00Z",
  "userIdentity": {
    "type": "AssumedRole",
    "principalId": "AROAEXAMPLE:api-service",
    "arn": "arn:aws:sts::123456789:assumed-role/api-service-role/api-service"
  },
  "requestParameters": {
    "keyId": "arn:aws:kms:us-east-1:123456789:key/key-id",
    "keySpec": "AES_256"
  },
  "responseElements": null,
  "resources": [
    {
      "ARN": "arn:aws:kms:us-east-1:123456789:key/key-id",
      "accountId": "123456789"
    }
  ]
}
```

8.3 Compliance Mapping

| Requirement             | SOC 2 | ISO 27001 | PCI DSS  |
| ----------------------- | ----- | --------- | -------- |
| Approved algorithms     | CC6.1 | A.10.1.1  | 3.5, 4.1 |
| Key management          | CC6.1 | A.10.1.2  | 3.5, 3.6 |
| Transport encryption    | CC6.7 | A.13.1.1  | 4.1      |
| Data-at-rest encryption | CC6.1 | A.10.1.1  | 3.4      |
| Key rotation            | CC6.1 | A.10.1.2  | 3.6      |
| Audit logging           | CC7.2 | A.12.4.1  | 10.5     |

---

9. Key Compromise Response

When a cryptographic key is suspected or confirmed compromised, immediate action is required.

9.1 Compromise Severity

| Severity           | Scope                                  | Examples                       | Response Time        |
| ------------------ | -------------------------------------- | ------------------------------ | -------------------- |
| **Critical** | Master key, root CA, signing key       | HSM breach, root key exposure  | Immediate (< 1 hour) |
| **High**     | KEK, service signing key, TLS wildcard | KMS access breach, leaked cert | < 4 hours            |
| **Medium**   | DEK, individual TLS cert, API key      | Single secret leaked           | < 24 hours           |
| **Low**      | Expired/rotated key found in logs      | Historical exposure            | Next business day    |

9.2 Response Procedure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KEY COMPROMISE RESPONSE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DETECT           2. CONTAIN          3. ROTATE                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Identify     │──▶│ Revoke       │──▶│ Generate new  │                   │
│  │ compromised  │   │ compromised  │   │ key, rotate   │                   │
│  │ key(s)       │   │ key access   │   │ dependents    │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│  4. ASSESS           5. RE-ENCRYPT      6. REPORT                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Determine    │◀──│ Re-encrypt   │──▶│ Incident      │                   │
│  │ blast radius │   │ affected     │   │ report +      │                   │
│  │ + data at    │   │ data with    │   │ lessons       │                   │
│  │ risk         │   │ new keys     │   │ learned       │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

9.3 Immediate Actions by Key Type

| Compromised Key    | Immediate Action                                                       |
| ------------------ | ---------------------------------------------------------------------- |
| Master / Root Key  | HSM emergency ceremony, revoke all derived keys, notify Security + CTO |
| KEK                | Rotate KEK, re-wrap all DEKs, audit access logs                        |
| DEK                | Rotate DEK, re-encrypt affected data, assess data exposure             |
| TLS Certificate    | Revoke via CA (OCSP/CRL), deploy replacement, notify dependents        |
| API / Signing Key  | Revoke immediately, issue new key, rotate all consumers                |
| Service Credential | Rotate in Secrets Manager, restart affected services                   |

9.4 Post-Incident

After containment:

1. Conduct root cause analysis
2. Assess whether data was exposed during compromise window
3. Notify affected parties per Incident Response Standard
4. Update key management procedures if gap identified
5. Log incident in compliance records

---

10. Quick Reference Card

CYBERCUBE Cryptography — Quick Reference Card

Print it. Keep it handy.

🔹 Approved Algorithms

| Purpose    | Algorithm                      |
| ---------- | ------------------------------ |
| Symmetric  | AES-256-GCM                    |
| Asymmetric | RSA-4096, ECDSA P-384, Ed25519 |
| Hashing    | SHA-256, SHA-384, SHA-512      |
| Password   | Argon2id                       |
| MAC        | HMAC-SHA256                    |
| KDF        | HKDF, PBKDF2                   |

🔹 TLS Requirements

```
Minimum: TLS 1.2
Preferred: TLS 1.3
Ciphers: AES-256-GCM, ChaCha20-Poly1305
Forward Secrecy: REQUIRED (ECDHE)
```

🔹 Key Rotation Schedule

| Key Type   | Period  |
| ---------- | ------- |
| Master Key | 2 years |
| KEK        | 1 year  |
| DEK        | 90 days |
| TLS Cert   | 90 days |
| API Key    | 90 days |

🔹 Secrets Rules

✅ Store in Secrets Manager / KMS
✅ Access at runtime only
✅ Rotate per schedule
✅ Audit all access
❌ Never in code
❌ Never in config files
❌ Never in logs
❌ Never in env vars (use refs)

🔹 Envelope Encryption

```
Master Key (HSM)
    └── KEK (KMS)
          └── DEK (App)
                └── Data
```

🔹 Certificate Requirements

```
Type: ECDSA P-384 or RSA-2048+
Hash: SHA-256+
Validity: 90 days (public)
SAN: Required
OCSP: Stapling preferred
```

🔹 PROHIBITED

❌ AES-128, DES, 3DES, RC4
❌ MD5, SHA-1
❌ RSA < 2048 bits
❌ TLS 1.0, 1.1, SSL
❌ Plaintext secrets
❌ Hardcoded keys

🔹 Pre-Commit Checks

```bash
detect-secrets scan
gitleaks detect
trufflehog filesystem .
```

🔹 HSM Use Cases

| Use          | Required |
| ------------ | -------- |
| Master keys  | YES      |
| Root CA      | YES      |
| Code signing | YES      |
| Payment      | YES      |

---

## 11. Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component               | Status   | Notes            |
| ----------------------- | -------- | ---------------- |
| Approved algorithm list | COMPLETE | This standard    |
| TLS configuration       | PARTIAL  | Audit existing   |
| KMS integration         | PARTIAL  | AWS KMS in use   |
| Secrets Manager         | PARTIAL  | Migration needed |
| Key rotation automation | PENDING  | Implement        |
| Certificate automation  | PENDING  | cert-manager     |
| Pre-commit scanning     | PENDING  | Add hooks        |
| HSM for root keys       | PENDING  | Evaluate need    |
| Envelope encryption     | PARTIAL  | Standardize      |
| Audit logging           | PARTIAL  | Enhance KMS logs |

### Migration Path

1. **Phase 1**: Audit current cryptographic usage
2. **Phase 2**: Migrate secrets to Secrets Manager
3. **Phase 3**: Implement key rotation automation
4. **Phase 4**: Deploy certificate automation
5. **Phase 5**: Add pre-commit secret scanning
6. **Phase 6**: Evaluate HSM requirements

## 12. References

- NIST SP 800-57 — Recommendation for Key Management (https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)
- NIST SP 800-131A Rev. 2 — Transitioning Cryptographic Algorithms (https://csrc.nist.gov/publications/detail/sp/800-131a/rev-2/final)
- OWASP Cryptographic Failures (https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- PCI DSS v4.0 — Cryptography Requirements (https://www.pcisecuritystandards.org/)
- SOC 2 Trust Services Criteria (https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/sorhome)
- ISO/IEC 27001 — A.10 Cryptography (https://www.iso.org/standard/27001)
- RFC 2119 — Key words for use in RFCs (https://www.rfc-editor.org/rfc/rfc2119)
- FIPS 140-3 — Security Requirements for Cryptographic Modules (https://csrc.nist.gov/publications/detail/fips/140/3/final)

---

Version History

| Version | Date       | Changes         | Author        |
| ------- | ---------- | --------------- | ------------- |
| v1.0    | 2026-01-17 | Initial release | Security Team |

---

## Appendix A: Glossary

This glossary defines key terms used throughout the CYBERCUBE Cryptography &
Key Management Standard.

All definitions are normative unless stated otherwise.

**A**

**AES (Advanced Encryption Standard)** — A symmetric block cipher approved for protecting classified information. CYBERCUBE approved: AES-256-GCM.

**Algorithm** — A defined process for encryption, hashing, or signing. Must be from approved list only.

**Asymmetric Encryption** — Encryption using a key pair (public/private). Examples: RSA, ECC, Ed25519.

**Authenticated Encryption** — Encryption providing both confidentiality and integrity. Required mode: GCM, CCM, or similar AEAD.

**B**

**Block Cipher** — A cipher operating on fixed-size blocks. Example: AES (128-bit blocks).

**C**

**Certificate** — A digital document binding a public key to an identity. Format: X.509 v3.

**Certificate Authority (CA)** — An entity that issues digital certificates. Types: Public CA, Private CA, Internal CA.

**Cipher Suite** — A combination of algorithms for key exchange, encryption, and MAC. Example: TLS_AES_256_GCM_SHA384.

**Cryptographic Key** — A piece of information used to encrypt, decrypt, sign, or verify. Types: Symmetric, Asymmetric (public/private).

**D**

**Data Encryption Key (DEK)** — A key used to encrypt actual data. Protected by a KEK in envelope encryption.

**Decryption** — The process of converting ciphertext back to plaintext. Requires the appropriate key.

**Digital Signature** — A cryptographic proof of authenticity and integrity. Algorithms: RSA, ECDSA, EdDSA.

**E**

**ECC (Elliptic Curve Cryptography)** — Asymmetric cryptography based on elliptic curves. CYBERCUBE approved: P-256, P-384, Ed25519.

**Encryption** — The process of converting plaintext to ciphertext. Purpose: Confidentiality.

**Encryption at Rest** — Encryption of stored data. All sensitive data MUST be encrypted at rest.

**Encryption in Transit** — Encryption of data during transmission. TLS 1.2+ REQUIRED for all communications.

**Envelope Encryption** — A pattern where DEKs are encrypted by KEKs. Standard pattern for KMS usage.

**H**

**Hardware Security Module (HSM)** — A physical device for secure key storage and operations. Use: Root keys, signing keys, high-value secrets.

**Hash Function** — A one-way function producing a fixed-size digest. CYBERCUBE approved: SHA-256, SHA-384, SHA-512, BLAKE3.

**HMAC (Hash-based Message Authentication Code)** — A MAC using a hash function and secret key. CYBERCUBE approved: HMAC-SHA256, HMAC-SHA384.

**I**

**Initialization Vector (IV)** — A random value used with encryption to ensure uniqueness. Must be unique per encryption, never reused with same key.

**K**

**KEK (Key Encryption Key)** — A key used to encrypt other keys. Stored in KMS or HSM.

**Key Derivation Function (KDF)** — A function deriving keys from a master secret. CYBERCUBE approved: HKDF, PBKDF2, Argon2.

**Key Management System (KMS)** — A system for managing cryptographic keys lifecycle. Examples: AWS KMS, GCP Cloud KMS, HashiCorp Vault.

**Key Pair** — A mathematically related public and private key. Public: Shareable | Private: Secret.

**Key Rotation** — The process of replacing cryptographic keys periodically. Required per rotation schedule.

**Key Wrapping** — Encrypting a key for secure storage or transport. Algorithm: AES-KWP (Key Wrap with Padding).

**M**

**MAC (Message Authentication Code)** — A tag ensuring message integrity and authenticity. Types: HMAC, CMAC, Poly1305.

**Master Key** — The root key protecting all other keys. Storage: HSM or KMS only.

**N**

**Nonce** — A number used once to ensure uniqueness. Similar to IV; must never repeat.

**P**

**PBKDF2 (Password-Based Key Derivation Function 2)** — A KDF for deriving keys from passwords. CYBERCUBE: Minimum 600,000 iterations with SHA-256.

**PEM (Privacy Enhanced Mail)** — A base64-encoded format for keys and certificates. File extensions: .pem, .crt, .key.

**PKCS (Public Key Cryptography Standards)** — A family of standards for public key cryptography. Common: PKCS#1 (RSA), PKCS#8 (Private Keys), PKCS#12 (Bundles).

**Private Key** — The secret component of an asymmetric key pair. MUST never be exposed or transmitted.

**Public Key** — The shareable component of an asymmetric key pair. Can be freely distributed.

**R**

**RSA (Rivest-Shamir-Adleman)** — An asymmetric encryption and signing algorithm. CYBERCUBE approved: RSA-2048 (minimum), RSA-4096 (recommended).

**S**

**Salt** — A random value added to input before hashing. Purpose: Prevent rainbow table attacks.

**Secret** — Any sensitive credential: keys, passwords, tokens, API keys. MUST be stored in approved secrets manager.

**Secrets Manager** — A system for storing and accessing secrets securely. Examples: AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager.

**Symmetric Encryption** — Encryption using the same key for encrypt and decrypt. Example: AES.

**T**

**TLS (Transport Layer Security)** — A protocol for encrypted communication. CYBERCUBE: TLS 1.2 minimum, TLS 1.3 preferred.

**Token** — A credential representing identity or authorization. Types: Access token, Refresh token, API key.

**V**

**Vault** — A secrets management solution. Example: HashiCorp Vault.

**X**

**X.509** — A standard for public key certificates. Version: v3 required.




---

## Quick Reference Card — STD-SEC-005 Cryptography & Key Management Directive

**Authority**: STD-SEC-005 | Owner: Security Team | Applies to: ALL systems performing cryptographic operations | Binding: MANDATORY

**Purpose**: Define approved cryptography, key lifecycle controls, secrets handling, certificate management, and audit requirements.

### Governing Principles

- Approved algorithms only
- Defense in depth
- Key separation & single purpose
- Automated rotation
- Secrets never exposed
- All key operations auditable

### Algorithm Policy (MANDATORY)

| Category | Approved | Prohibited |
|----------|----------|------------|
| Symmetric | AES-256-GCM (default), ChaCha20-Poly1305 | AES-128, DES/3DES, RC4 |
| Asymmetric | RSA-2048+ (4096 preferred), ECDSA P-256+, Ed25519, X25519 | DSA |
| Hashing | SHA-256+, SHA-3, BLAKE3 | MD5, SHA-1 |
| Passwords | Argon2id (preferred) | — |
| MAC | HMAC-SHA256+ | — |
| KDF | HKDF, Argon2, PBKDF2, scrypt | — |

### TLS Requirements

- TLS 1.2 MINIMUM, TLS 1.3 PREFERRED
- Forward secrecy REQUIRED (ECDHE)
- AES-256-GCM or ChaCha20-Poly1305 only
- Weak, legacy, or export ciphers PROHIBITED

### Key Management (MANDATORY)

- Envelope encryption REQUIRED
- Key classes: Master → KEK → DEK
- Keys generated via CSPRNG or HSM
- Single-purpose per key
- Automated rotation per schedule
- Secure destruction required

### Key Rotation (Minimums)

| Key Type | Max Lifetime |
|----------|-------------|
| Master keys | 2 years (HSM ceremony) |
| KEKs | 1 year |
| DEKs | 90 days |
| TLS certs | 90 days |
| API / signing keys | 6 months |

### Key Storage Rules

- **Master keys**: HSM only
- **KEKs / signing keys**: KMS / HSM
- **Secrets**: Approved Secrets Manager
- **PROHIBITED**: code, configs, env vars (secrets), logs, files, chat, email

### Secrets Management

- Central secrets manager REQUIRED
- Runtime retrieval only
- Rotation enforced
- Access audit logged

### Certificate Management

- SAN required; CN not authoritative
- Public TLS validity <=90 days
- Internal TLS <=1 year
- OCSP/CRL enforced
- Automated issuance & renewal REQUIRED

### HSM Requirements

- FIPS 140-2 L3 minimum (140-3 preferred)
- Mandatory for master keys, root CA, code signing
- M-of-N control and ceremony required

### Encryption at Rest

- REQUIRED for INTERNAL+ data
- Mandatory for CONFIDENTIAL / RESTRICTED
- KMS-managed keys

### Audit & Logging

MUST log: Key generation, rotation, revocation, destruction · Key access grants and removals · Certificate issuance and revocation. Crypto operation volume logging NOT required.

### Compromise Response

- Immediate revoke → rotate → re-encrypt
- Severity-based response times
- Post-incident review REQUIRED

### Compliance & Review

- Annual review MINIMUM
- Deviations prohibited without approval
- Aligned to ERM, Security Policy, Incident Response

### Outcome

Consistent cryptography · Controlled key lifecycle · Audit-grade evidence · No weak, hidden, or unmanaged crypto

---

## Scorable Compliance Matrix — Crypto & Key Management (C1–C11)

**Dimensions**: C1–C11 | **Scale**: 0–5 | **Max**: 55 points (11 × 5)

### Scoring Scale

| Score | Meaning |
|-------|---------|
| 0 | Not defined |
| 1 | Defined only |
| 2 | Partially implemented |
| 3 | Implemented (baseline compliant) |
| 4 | Enforced, measured |
| 5 | Institutionalized, audited |

### Dimensions

| ID | Dimension | Criteria |
|----|-----------|----------|
| C1 | Approved Algorithms Only | No prohibited algorithms in use · Defaults enforced |
| C2 | TLS & Transport Security | TLS 1.2+ only · Approved cipher suites · Forward secrecy enforced |
| C3 | Key Generation & Entropy | CSPRNG / HSM only · Correct key sizes · Unique keys |
| C4 | Key Storage & Isolation | HSM/KMS usage · No plaintext storage · Access control enforced |
| C5 | Key Lifecycle & Rotation | Automated rotation · Defined grace periods · Secure destruction |
| C6 | Envelope Encryption | DEKs wrapped by KEKs · Master keys isolated |
| C7 | Secrets Management | Central secrets manager · No secrets in code/env/logs · Rotation enforced |
| C8 | Certificate Management | Validity limits enforced · Automated issuance & renewal · Revocation supported |
| C9 | HSM Governance | FIPS-compliant HSM · M-of-N access · Ceremony documented |
| C10 | Audit & Logging | Key events logged · Evidence retained · Reviewable |
| C11 | Compromise Response | Documented response · Time-bound actions · Post-incident review |

### Thresholds

| Range | Rating |
|-------|--------|
| >=50 | Crypto-mature |
| 42–49 | Managed |
| 33–41 | Elevated risk |
| <33 | Unacceptable |

### Hard Fail Conditions

- **C1 < 3** → Weak algorithms
- **C4 < 3** → Unsafe key storage
- **C7 < 3** → Secrets exposure risk
