Glossary

This glossary defines key terms used throughout the CYBERCUBE Authentication & Identity
Standard.

All definitions are normative unless stated otherwise.

A

Access Token

A short-lived credential issued after successful authentication, used to authorize API requests.

Properties:

- Issued server-side only
- Contains no PII in payload (JWT claims limited to subject ID and scope)
- MUST be transmitted over TLS only
- MUST NOT be stored in localStorage (use httpOnly cookies or memory)

See also: Refresh Token, Session

Account Lockout

A security control that temporarily disables authentication attempts after repeated failures.

Purpose:

- Prevent brute-force attacks
- Protect user accounts from credential stuffing
- Rate-limit enumeration attempts

CYBERCUBE default: 5 failed attempts → 15-minute lockout

Account Recovery

The process by which a user regains access to their account after losing credentials.

Supported methods:

- Email-based password reset (primary)
- Magic link (if enabled)
- Administrator-assisted recovery (emergency)

See also: Password Reset, Magic Link

Argon2

The recommended password hashing algorithm for CYBERCUBE systems (Argon2id variant).

Properties:

- Memory-hard (resists GPU attacks)
- Winner of Password Hashing Competition (2015)
- Configurable time, memory, and parallelism parameters

See also: Password Hashing, bcrypt

Authentication (AuthN)

The process of verifying that a user or system is who they claim to be.

CYBERCUBE supports:

- Password-based authentication
- Magic link (passwordless)
- OAuth 2.0 / OIDC (social/enterprise)
- SSO via SAML 2.0
- MFA (TOTP, WebAuthn)

Note: Authentication proves identity; it does not grant access to resources.

Authorization (AuthZ)

The process of determining what actions an authenticated principal is allowed to perform.

Authorization is handled separately from authentication and uses:

- Role-based access control (RBAC)
- Attribute-based policies
- Resource ownership checks

Note: Possession of a CC-PID does not constitute authorization.

B

bcrypt

An acceptable password hashing algorithm for legacy systems.

Properties:

- Cost factor (work factor) must be ≥ 12
- Max input length: 72 bytes
- Deprecated for new implementations (use Argon2id)

C

Credential

Any secret used to prove identity.

Types:

- Password
- Magic link token
- OAuth authorization code
- MFA code (TOTP/WebAuthn)
- API key secret

Credentials MUST:

- Be transmitted over TLS only
- Never be logged
- Be stored using approved hashing/encryption
- Be rotated on compromise

Credential Stuffing

An attack using leaked username/password pairs from other breaches.

Mitigations (REQUIRED):

- Account lockout
- Rate limiting
- Breached password detection
- MFA enforcement

E

Email Verification

The process of confirming that a user controls the email address they provided.

Rules:

- REQUIRED before account activation
- Verification token: single-use, time-limited
- Token format: cryptographically random, 32+ bytes
- Expiration: 24 hours (configurable, max 72 hours)

I

Identity Provider (IdP)

An external system that authenticates users and provides identity assertions.

Supported:

- Google (OIDC)
- Microsoft Entra ID (OIDC/SAML)
- GitHub (OAuth 2.0)
- Custom SAML 2.0 IdPs

M

Magic Link

A passwordless authentication method using a single-use, time-limited link sent via email.

Properties:

- Token: cryptographically random, 32+ bytes
- Expiration: 15 minutes (REQUIRED)
- Single-use (invalidated after use or expiration)
- MUST NOT be logged or exposed in URLs after use

Multi-Factor Authentication (MFA)

Authentication requiring two or more independent factors.

Factor types:

- Something you know (password)
- Something you have (TOTP device, security key)
- Something you are (biometrics, future)

CYBERCUBE supports:

- TOTP (RFC 6238)
- WebAuthn/FIDO2 (preferred)

O

OAuth 2.0

An authorization framework used for delegated access and federated authentication.

CYBERCUBE uses OAuth 2.0 + OIDC for:

- Social login (Google, GitHub)
- Enterprise SSO
- API authorization

Required flows:

- Authorization Code + PKCE (web/mobile)
- Client Credentials (service-to-service)

Forbidden flows:

- Implicit (deprecated, insecure)
- Resource Owner Password Credentials (deprecated)

P

Password

A user-provided secret used for authentication.

Requirements (NIST 800-63B aligned):

- Minimum length: 12 characters
- Maximum length: 128 characters
- No composition rules (no forced uppercase/symbols)
- Breached password check: REQUIRED
- No periodic rotation requirement (rotate on compromise only)

Password Hashing

The process of converting a password into a non-reversible digest for storage.

Approved algorithms:

- Argon2id (REQUIRED for new implementations)
- bcrypt with cost ≥ 12 (acceptable for legacy)

Forbidden:

- MD5, SHA-1, SHA-256 without salt
- Plain text storage

Password Reset

The process of changing a forgotten password via email verification.

Token requirements:

- Cryptographically random, 32+ bytes
- Single-use
- Expiration: 1 hour (max 24 hours)
- Invalidates all active sessions on success

R

Refresh Token

A long-lived credential used to obtain new access tokens without re-authentication.

Properties:

- Server-side storage (opaque reference)
- Rotation on use (REQUIRED)
- Absolute expiration: 7 days (default), max 30 days
- Revocable

S

Session

A server-side record of an authenticated user's login state.

Properties:

- Identifier: cryptographically random, 32+ bytes
- Storage: server-side (database or cache)
- MUST NOT store session ID in URL
- Regenerate session ID after privilege change

Session Lifecycle:

- Idle timeout: 30 minutes (configurable)
- Absolute timeout: 24 hours (configurable, max 7 days)
- Explicit logout: destroys session immediately

Single Sign-On (SSO)

A mechanism allowing users to authenticate once and access multiple applications.

CYBERCUBE supports:

- SAML 2.0 (enterprise)
- OIDC (modern apps)

T

Token

A credential representing authentication state or authorization grant.

Types in CYBERCUBE:

- Access Token (short-lived, API authorization)
- Refresh Token (long-lived, token renewal)
- Verification Token (email/password reset)
- Magic Link Token (passwordless auth)
- TOTP Code (MFA)

Note: "Token" in CC-PID context refers to the random component of a Public Entity ID (unrelated to authentication tokens).

TOTP (Time-based One-Time Password)

An MFA method generating time-limited codes from a shared secret.

Specification: RFC 6238

Parameters:

- Algorithm: SHA-256 (default) or SHA-1 (legacy compatibility only)
- Digits: 6
- Period: 30 seconds
- Allowed drift: ±1 period

W

WebAuthn / FIDO2

A passwordless/MFA standard using cryptographic credentials bound to devices.

Properties:

- Phishing-resistant
- No shared secrets
- Hardware-backed (security keys, platform authenticators)

CYBERCUBE supports:

- Platform authenticators (Touch ID, Windows Hello)
- Roaming authenticators (YubiKey, security keys)

---

CYBERCUBE Authentication & Identity Standard (v1)

**Standard ID:** STD-SEC-003**Status:** Active**Effective:** 2026-01-17**Classification:** INTERNAL**Owner:** Security Team**Applies to:** All CYBERCUBE products, services, and integrations requiring user authentication

0. Purpose & Design Principles

This standard defines how authentication, identity verification, and session management are
implemented across CYBERCUBE systems. It establishes mandatory controls aligned with:

- NIST 800-63 (Digital Identity Guidelines)
- OWASP ASVS v4.0 (Application Security Verification Standard)
- SOC 2 Type II (Trust Services Criteria)
- ISO 27001 (Information Security Management)

Design principles:

- Defense in depth — multiple layers of security controls
- Least privilege — grant minimum necessary access
- Fail secure — deny access on error conditions
- Separation of concerns — authentication ≠ authorization ≠ session
- User safety — protect users from phishing, credential theft, and account takeover

This document does NOT define:

- Authorization models (RBAC/ABAC) — see Authorization & Access Control Standard
- API security patterns — see API Design & Versioning Standard
- Encryption at rest — see Data Classification & Retention Standard
- Public Entity IDs — see Naming & Identifier Standard

1. Authentication Methods

CYBERCUBE supports multiple authentication methods. The method(s) available depend on
account configuration and security requirements.

1.1 Supported Methods

| Method           | Use Case               | Security Level | MFA Compatible     |
| ---------------- | ---------------------- | -------------- | ------------------ |
| Password + Email | Default registration   | Medium         | REQUIRED           |
| Magic Link       | Passwordless login     | Medium-High    | Optional           |
| OAuth 2.0 / OIDC | Social/federated login | High           | Inherited from IdP |
| SAML 2.0 SSO     | Enterprise integration | High           | Inherited from IdP |
| WebAuthn/FIDO2   | Passwordless/MFA       | Very High      | N/A (is MFA)       |
| API Key + Secret | Service-to-service     | High           | N/A                |

1.2 Method Selection Rules

1. **Default**: Password + Email verification + MFA
2. **Enterprise**: SSO with IdP-managed MFA
3. **Passwordless**: Magic link OR WebAuthn (user choice)
4. **Service accounts**: API Key + Secret (no interactive login)

1.3 Method-Specific Requirements

1.3.1 Password Authentication

Flow:

```
User submits (email, password)
    ↓
Server validates email format
    ↓
Server retrieves stored hash by email
    ↓
Server verifies password against hash (timing-safe)
    ↓
If valid → check MFA requirement → create session
If invalid → increment failure counter → return generic error
```

Requirements:

- Input validation: email format, password length (12-128 chars)
- Timing-safe comparison of password hashes
- Generic error messages ("Invalid email or password")
- No user enumeration (same response for unknown email)
- Rate limiting: 10 attempts per minute per IP
- Account lockout: 5 failures → 15-minute lockout

1.3.2 Magic Link Authentication

Flow:

```
User submits email
    ↓
Server generates token (CSPRNG, 32 bytes, URL-safe base64)
    ↓
Server stores hash of token with expiration (15 min)
    ↓
Server sends email with link containing token
    ↓
User clicks link
    ↓
Server validates token hash + expiration
    ↓
If valid → invalidate token → create session
If invalid → return error (do not reveal reason)
```

Token requirements:

- Generation: CSPRNG (crypto.randomBytes or equivalent)
- Length: 32 bytes minimum (256 bits entropy)
- Format: URL-safe base64 (no padding)
- Storage: hash only (SHA-256)
- Expiration: 15 minutes (MUST NOT exceed 60 minutes)
- Usage: single-use (delete after verification or expiration)

Email requirements:

- Send from verified domain (SPF/DKIM/DMARC)
- Include: link, expiration time, "not you?" warning
- Do NOT include: user's password, other credentials

1.3.3 OAuth 2.0 / OIDC

Supported flows:

- Authorization Code + PKCE (REQUIRED for all clients)

Forbidden flows:

- Implicit flow (deprecated, tokens in URL)
- Resource Owner Password Credentials (deprecated)

Provider requirements:

- Validate `state` parameter (CSRF protection)
- Validate `nonce` in ID token (replay protection)
- Verify ID token signature (RS256 or ES256)
- Check `iss`, `aud`, `exp` claims
- Request minimal scopes (`openid email profile`)

Account linking:

- Match by verified email from IdP
- Do NOT auto-create accounts without email verification
- Allow users to link/unlink OAuth providers

1.3.4 SAML 2.0 SSO

Requirements:

- Validate XML signature (enveloped or detached)
- Check `Issuer`, `Audience`, `NotBefore`, `NotOnOrAfter`
- Validate `InResponseTo` (replay protection)
- Reject unsigned assertions
- Store IdP metadata securely

CYBERCUBE as Service Provider (SP):

- Metadata endpoint: `/.well-known/saml-metadata`
- ACS endpoint: `/api/v1/auth/saml/callback`
- SLO endpoint: `/api/v1/auth/saml/logout` (optional)

1.3.5 WebAuthn / FIDO2

Registration flow:

```
Server generates challenge (CSPRNG, 32 bytes)
    ↓
Client creates credential (authenticator)
    ↓
Server validates attestation (optional)
    ↓
Server stores: credentialId, publicKey, counter, transports
```

Authentication flow:

```
Server generates challenge (CSPRNG, 32 bytes)
    ↓
Client signs challenge with private key
    ↓
Server verifies signature + counter
    ↓
Server updates counter (replay protection)
```

Requirements:

- Challenge: CSPRNG, 32 bytes, single-use, 5-minute expiration
- Credential storage: credentialId, publicKey (COSE), signCount, transports
- Counter validation: reject if signCount ≤ stored (clone detection)
- User verification: REQUIRED for passwordless, PREFERRED for MFA
- Attestation: none (privacy) or direct (enterprise)

2. Multi-Factor Authentication (MFA)

MFA provides defense against credential compromise by requiring additional proof of identity.

2.1 MFA Policy

| Account Type        | MFA Requirement | Enforcement     |
| ------------------- | --------------- | --------------- |
| Standard user       | RECOMMENDED     | User opt-in     |
| Admin/privileged    | REQUIRED        | System enforced |
| Enterprise SSO      | Inherited       | IdP policy      |
| API service account | N/A             | Key + secret    |

2.2 Supported MFA Methods

| Method                   | Type               | Phishing Resistant | Recommended      |
| ------------------------ | ------------------ | ------------------ | ---------------- |
| TOTP (Authenticator app) | Something you have | No                 | Yes              |
| WebAuthn (Security key)  | Something you have | Yes                | Yes (preferred)  |
| SMS OTP                  | Something you have | No                 | No (discouraged) |
| Email OTP                | Something you have | No                 | No (discouraged) |

2.3 TOTP Implementation

Specification: RFC 6238

Parameters (REQUIRED):

```
Algorithm: SHA-256 (default) or SHA-1 (legacy compatibility only)
Digits: 6
Period: 30 seconds
Secret length: 160 bits minimum (20 bytes)
Allowed drift: ±1 period (±30 seconds)
```

Enrollment flow:

```
Server generates secret (CSPRNG, 20 bytes)
    ↓
Server returns secret as otpauth:// URI + QR code
    ↓
User scans QR in authenticator app
    ↓
User submits current code
    ↓
Server validates code (allowing ±1 drift)
    ↓
If valid → store secret (encrypted) + enable TOTP
If invalid → retry or abort
```

Recovery codes:

- Generate 10 single-use codes (CSPRNG, 12 chars each, 64 bits entropy)
- Store hashed (bcrypt or Argon2)
- Display once at enrollment (user must save)
- Each code is single-use
- Regenerate all codes if user requests

2.4 WebAuthn as MFA

When used as second factor (password + WebAuthn):

- User verification: PREFERRED
- Authenticator attachment: cross-platform (security keys encouraged)

When used as passwordless (WebAuthn only):

- User verification: REQUIRED
- Authenticator attachment: platform or cross-platform

2.5 MFA Bypass Prevention

Forbidden:

- "Remember this device" for admin accounts
- MFA bypass via support request without identity verification
- Fallback to SMS after WebAuthn enrollment

Required controls:

- MFA status check on every session creation
- MFA re-verification for sensitive operations (password change, MFA disable)
- Audit logging of all MFA events

3. Password Policy

Password requirements are aligned with NIST 800-63B and prioritize length over complexity.

3.1 Password Requirements

| Requirement             | Value          | Rationale                           |
| ----------------------- | -------------- | ----------------------------------- |
| Minimum length          | 12 characters  | Entropy threshold                   |
| Maximum length          | 128 characters | Prevent DoS                         |
| Composition rules       | NONE           | NIST 800-63B                        |
| Breached password check | REQUIRED       | Prevent known compromised passwords |
| Periodic rotation       | NOT REQUIRED   | Rotate on compromise only           |

3.2 Breached Password Detection

REQUIRED: Check passwords against known breach databases.

Implementation options:

- Have I Been Pwned API (k-anonymity model)
- Local breach database (updated monthly)

Enforcement:

- Block registration with breached password
- Block login with breached password (prompt reset)
- Check on password change

3.3 Password Hashing

Approved algorithms:

1. **Argon2id** (REQUIRED for new implementations)

```
Parameters:
  Memory: 64 MB (m=65536)
  Iterations: 3 (t=3)
  Parallelism: 4 (p=4)
  Salt: 16 bytes (CSPRNG)
  Hash length: 32 bytes
```

2. **bcrypt** (acceptable for legacy systems)

```
Parameters:
  Cost factor: ≥ 12
  Salt: built-in (22 chars)
```

Migration path:

- On successful login with bcrypt hash → rehash with Argon2id
- Store algorithm identifier with hash for version detection

Forbidden:

- MD5, SHA-1, SHA-256 without key derivation
- Plain text storage
- Reversible encryption

3.4 Password Storage Schema

```sql
-- Example schema (guidance)
CREATE TABLE user_credentials (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    password_hash VARCHAR(255) NOT NULL,
    hash_algorithm VARCHAR(20) NOT NULL DEFAULT 'argon2id',
    hash_params JSONB, -- {m: 65536, t: 3, p: 4}
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    -- Constraints
    CONSTRAINT valid_algorithm CHECK (hash_algorithm IN ('argon2id', 'bcrypt'))
);
```

3.5 Password Change Flow

```
User submits (current_password, new_password)
    ↓
Verify current_password against stored hash
    ↓
Validate new_password requirements (length, not breached)
    ↓
Check new_password ≠ current_password
    ↓
Hash new_password with Argon2id
    ↓
Update stored hash
    ↓
Invalidate all other sessions (REQUIRED)
    ↓
Send notification email
```

4. Session Management

Sessions track authenticated state and must be protected against hijacking, fixation, and replay.

4.1 Session Lifecycle

```
Authentication Success
        ↓
    Create Session
    (new random ID, bind to user)
        ↓
    Set Session Cookie
    (httpOnly, secure, sameSite=strict)
        ↓
    ┌─────────────────────────────────────┐
    │         ACTIVE SESSION              │
    │  ─ Validate on each request         │
    │  ─ Check idle timeout               │
    │  ─ Check absolute timeout           │
    │  ─ Regenerate ID on privilege change│
    └─────────────────────────────────────┘
        ↓
    Session End
    (logout, timeout, or revocation)
        ↓
    Destroy Session
    (server-side deletion)
```

4.2 Session Configuration

| Parameter         | Default                           | Maximum | Notes                    |
| ----------------- | --------------------------------- | ------- | ------------------------ |
| Idle timeout      | 30 minutes                        | 4 hours | Inactivity limit         |
| Absolute timeout  | 24 hours                          | 7 days  | Maximum session duration |
| Session ID length | 32 bytes                          | —      | 256 bits entropy         |
| Cookie flags      | httpOnly, secure, sameSite=strict | —      | REQUIRED                 |

4.3 Session ID Requirements

- Generation: CSPRNG (crypto.randomBytes or equivalent)
- Length: 32 bytes minimum (256 bits entropy)
- Format: URL-safe base64 or hex
- Storage: server-side only (database or cache)
- Transmission: cookie only (never in URL)

4.4 Session Storage Schema

```sql
-- Example schema (guidance)
CREATE TABLE sessions (
    id VARCHAR(64) PRIMARY KEY, -- hashed session ID
    user_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address INET,
    user_agent TEXT,
    mfa_verified BOOLEAN NOT NULL DEFAULT FALSE
);

-- Indexes for cleanup
CREATE INDEX idx_sessions_user_id ON sessions (user_id);
CREATE INDEX idx_sessions_expires_at ON sessions (expires_at);
```

4.5 Session Security Controls

**Session Fixation Prevention**:

- Regenerate session ID after successful authentication
- Regenerate session ID after privilege elevation
- Do NOT accept session ID from URL parameters

**Session Hijacking Prevention**:

- Cookie flags: httpOnly (no JS access), secure (HTTPS only), sameSite=strict
- Bind session to: user agent (optional), IP range (optional, careful with mobile)
- TLS required for all authenticated requests

**Session Revocation**:

- Explicit logout: delete session record immediately
- Password change: revoke all sessions except current
- Account compromise: revoke all sessions
- Admin action: revoke specific or all sessions

4.6 Concurrent Session Policy

| Account Type              | Max Sessions | Action on Exceed |
| ------------------------- | ------------ | ---------------- |
| Standard user             | 5            | Revoke oldest    |
| Admin user                | 3            | Revoke oldest    |
| Enterprise (configurable) | Per policy   | Per policy       |

5. Token Management

Authentication tokens have different purposes, lifetimes, and security requirements.

5.1 Token Types and TTLs

| Token Type         | TTL             | Renewable    | Storage                       |
| ------------------ | --------------- | ------------ | ----------------------------- |
| Access Token (JWT) | 15 minutes      | Via refresh  | Memory/httpOnly cookie        |
| Refresh Token      | 7 days (max 30) | Yes (rotate) | Server-side + httpOnly cookie |
| Email Verification | 24 hours        | No           | Server-side (hashed)          |
| Password Reset     | 1 hour          | No           | Server-side (hashed)          |
| Magic Link         | 15 minutes      | No           | Server-side (hashed)          |
| TOTP Code          | 30 seconds      | N/A          | N/A (computed)                |
| WebAuthn Challenge | 5 minutes       | No           | Server-side                   |

5.2 Access Token (JWT) Specification

Format: JSON Web Token (RFC 7519)
Algorithm: RS256 (asymmetric) or ES256 (preferred)

Claims (REQUIRED):

```json
{
  "iss": "https://api.cybercube.software",
  "sub": "USR-X2M8KD-7",          // User CC-PID
  "aud": "cybercube-api",
  "iat": 1737100000,
  "exp": 1737100900,              // 15 minutes
  "jti": "unique-token-id",       // For revocation
  "scope": "read write"
}
```

Claims (FORBIDDEN in access tokens):

- Email address
- Name
- Phone number
- Any PII

Validation (REQUIRED):

- Verify signature (use public key from JWKS)
- Check `exp` (reject expired)
- Check `iat` (reject future-issued)
- Check `iss` (must match expected issuer)
- Check `aud` (must match service)
- Check revocation status (if JTI revocation enabled)

5.3 Refresh Token Specification

Properties:

- Format: opaque (random string, 32 bytes)
- Storage: server-side (hashed reference)
- Binding: specific to user + device/session
- Rotation: REQUIRED (issue new refresh token on use)

Rotation flow:

```
Client submits refresh_token
    ↓
Server validates token (hash lookup)
    ↓
Server revokes old refresh_token
    ↓
Server issues new access_token + new refresh_token
    ↓
Server stores new refresh_token (hashed)
    ↓
Client receives new tokens
```

Revocation triggers:

- User logout
- Password change
- Account suspension
- Refresh token reuse (potential theft indicator)

5.4 Verification Token Specification

Used for: email verification, password reset, magic link

Generation:

```typescript
// REQUIRED: CSPRNG, 32 bytes minimum
const token = crypto.randomBytes(32).toString('base64url');
```

Storage:

```sql
-- Store hash only, never plaintext
INSERT INTO verification_tokens (
    token_hash,        -- SHA-256(token)
    user_id,
    token_type,        -- 'email_verification' | 'password_reset' | 'magic_link'
    expires_at,
    created_at
) VALUES (...);
```

Validation:

```
Receive token from request
    ↓
Compute hash: SHA-256(token)
    ↓
Lookup by hash + type + not expired
    ↓
If found → delete token → proceed
If not found → return generic error
```

6. Email Verification

Email verification confirms user control of their email address and is REQUIRED before account
activation.

6.1 Verification Flow

```
User registers with email
    ↓
Server creates user record (status: UNVERIFIED)
    ↓
Server generates verification token
    ↓
Server sends verification email
    ↓
User clicks link
    ↓
Server validates token
    ↓
Server updates user status (status: ACTIVE)
    ↓
Server deletes/invalidates token
```

6.2 Verification Requirements

| Requirement   | Value                                                   |
| ------------- | ------------------------------------------------------- |
| Token entropy | 256 bits (32 bytes CSPRNG)                              |
| Token format  | URL-safe base64                                         |
| Token storage | SHA-256 hash only                                       |
| Expiration    | 24 hours (configurable, max 72 hours)                   |
| Usage         | Single-use                                              |
| Resend limit  | 3 per hour                                              |
| Link format   | `https://app.cybercube.software/verify?token=<token>` |

6.3 Unverified Account Restrictions

Unverified accounts MUST NOT:

- Access protected resources
- Send messages
- Create or modify data
- Receive notifications

Unverified accounts MAY:

- View public content
- Request new verification email
- Log out

6.4 Email Change Verification

When a verified user changes their email:

```
User submits new email
    ↓
Server validates format + not already registered
    ↓
Server sends verification to NEW email
    ↓
User clicks link (new email)
    ↓
Server updates email address
    ↓
Server sends notification to OLD email
    ↓
Server invalidates all sessions except current
```

7. Account Recovery

Account recovery restores access when normal authentication fails.

7.1 Password Reset Flow

```
User submits email (forgot password)
    ↓
Server validates email format
    ↓
Server generates reset token (if account exists)
    ↓
Server sends email (always, even if account doesn't exist)
    ↓
[User receives email if account exists]
    ↓
User clicks link + submits new password
    ↓
Server validates token + password requirements
    ↓
Server updates password hash
    ↓
Server invalidates ALL sessions
    ↓
Server invalidates reset token
    ↓
Server sends confirmation email
```

7.2 Password Reset Requirements

| Requirement    | Value                         |
| -------------- | ----------------------------- |
| Token entropy  | 256 bits (32 bytes CSPRNG)    |
| Expiration     | 1 hour (max 24 hours)         |
| Usage          | Single-use                    |
| Rate limit     | 3 requests per hour per email |
| Session impact | Invalidate ALL sessions       |

7.3 Account Lockout Recovery

After account lockout (5 failed attempts):

- Automatic unlock after 15 minutes
- OR immediate unlock via password reset
- OR admin intervention

7.4 MFA Recovery

If user loses MFA device:

1. Recovery codes (if saved during enrollment)
2. Admin-assisted recovery (with identity verification)
3. Account recovery process (extended verification)

Admin-assisted MFA reset REQUIRES:

- Identity verification (government ID, video call, etc.)
- Manager approval (for enterprise accounts)
- Audit log entry
- Notification to user's verified email

8. Security Controls

Cross-cutting security controls that apply to all authentication flows.

8.1 Rate Limiting

| Endpoint           | Limit       | Window    | Action on Exceed          |
| ------------------ | ----------- | --------- | ------------------------- |
| Login              | 10 attempts | 1 minute  | 429 + exponential backoff |
| Password reset     | 3 requests  | 1 hour    | 429 + silent drop         |
| Magic link         | 3 requests  | 1 hour    | 429 + silent drop         |
| Email verification | 3 resends   | 1 hour    | 429                       |
| TOTP validation    | 5 attempts  | 5 minutes | Account lockout           |

8.2 Account Lockout

Trigger: 5 consecutive failed authentication attempts

Duration: 15 minutes (automatic unlock)

Scope: Per account (not per IP)

Bypass: Password reset flow

Notification: Email to account owner

8.3 Audit Logging

REQUIRED events to log:

| Event                    | Data to Log                                       |
| ------------------------ | ------------------------------------------------- |
| Login success            | user_id, timestamp, IP, user_agent, method        |
| Login failure            | email (hashed), timestamp, IP, user_agent, reason |
| Logout                   | user_id, timestamp, session_id (hashed)           |
| Password change          | user_id, timestamp, IP                            |
| Password reset request   | email (hashed), timestamp, IP                     |
| Password reset complete  | user_id, timestamp, IP                            |
| MFA enrollment           | user_id, timestamp, method                        |
| MFA verification success | user_id, timestamp, method                        |
| MFA verification failure | user_id, timestamp, method                        |
| Session revocation       | user_id, timestamp, reason                        |
| Account lockout          | user_id, timestamp, IP                            |

Log retention: 90 days minimum (configurable per compliance requirements)

8.4 Secure Headers

REQUIRED headers for authentication pages:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; frame-ancestors 'none';
Referrer-Policy: strict-origin-when-cross-origin
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
```

8.5 Transport Security

REQUIRED:

- TLS 1.2 minimum (TLS 1.3 preferred)
- Strong cipher suites only
- HSTS enabled with preload
- Certificate transparency

FORBIDDEN:

- HTTP for any authentication flow
- Self-signed certificates in production
- TLS 1.0/1.1

9. Implementation Guidelines

9.1 Reference Implementation

```typescript
// auth-service.ts - Reference implementation (TypeScript)

import crypto from 'crypto';
import argon2 from 'argon2';

/**
 * CYBERCUBE Authentication Service
 * Reference implementation for v1 standard
 */
export class AuthService {
  // Token generation constants
  static readonly TOKEN_LENGTH = 32; // 256 bits
  static readonly SESSION_ID_LENGTH = 32;
  
  // Argon2id parameters (NIST/OWASP aligned)
  static readonly ARGON2_CONFIG = {
    type: argon2.argon2id,
    memoryCost: 65536,    // 64 MB
    timeCost: 3,
    parallelism: 4,
    hashLength: 32,
  };

  // TTLs in milliseconds
  static readonly TTL = {
    ACCESS_TOKEN: 15 * 60 * 1000,           // 15 minutes
    REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
    SESSION_IDLE: 30 * 60 * 1000,           // 30 minutes
    SESSION_ABSOLUTE: 24 * 60 * 60 * 1000,  // 24 hours
    EMAIL_VERIFICATION: 24 * 60 * 60 * 1000,// 24 hours
    PASSWORD_RESET: 60 * 60 * 1000,         // 1 hour
    MAGIC_LINK: 15 * 60 * 1000,             // 15 minutes
    WEBAUTHN_CHALLENGE: 5 * 60 * 1000,      // 5 minutes
  };

  /**
   * Generate cryptographically secure random token
   * @param length - Number of bytes (default 32)
   * @returns URL-safe base64 encoded token
   */
  static generateToken(length: number = this.TOKEN_LENGTH): string {
    return crypto.randomBytes(length).toString('base64url');
  }

  /**
   * Generate session ID
   * @returns Cryptographically random session identifier
   */
  static generateSessionId(): string {
    return crypto.randomBytes(this.SESSION_ID_LENGTH).toString('hex');
  }

  /**
   * Hash token for storage (verification tokens, magic links, etc.)
   * @param token - Raw token
   * @returns SHA-256 hash of token
   */
  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Hash password using Argon2id
   * @param password - Plain text password
   * @returns Argon2id hash
   */
  static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, this.ARGON2_CONFIG);
  }

  /**
   * Verify password against hash
   * @param hash - Stored hash
   * @param password - Password to verify
   * @returns true if match, false otherwise
   */
  static async verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch {
      return false;
    }
  }

  /**
   * Check if password hash needs rehashing (algorithm upgrade)
   * @param hash - Stored hash
   * @returns true if rehash needed
   */
  static needsRehash(hash: string): boolean {
    return argon2.needsRehash(hash, this.ARGON2_CONFIG);
  }

  /**
   * Generate TOTP secret
   * @returns Base32 encoded secret (20 bytes = 160 bits)
   */
  static generateTotpSecret(): string {
    const buffer = crypto.randomBytes(20);
    return this.base32Encode(buffer);
  }

  /**
   * Generate recovery codes for MFA backup
   * @param count - Number of codes to generate (default 10)
   * @returns Array of recovery codes
   */
  static generateRecoveryCodes(count: number = 10): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      // 12 character alphanumeric code (8 random bytes = 64 bits entropy)
      const code = crypto.randomBytes(8).toString('hex').toUpperCase().slice(0, 12);
      codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`);
    }
    return codes;
  }

  /**
   * Validate password meets requirements
   * @param password - Password to validate
   * @returns Validation result
   */
  static validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 12) {
      return { valid: false, error: 'Password must be at least 12 characters' };
    }
    if (password.length > 128) {
      return { valid: false, error: 'Password must be at most 128 characters' };
    }
    // No composition rules per NIST 800-63B
    return { valid: true };
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns true if valid format
   */
  static validateEmail(email: string): boolean {
    // RFC 5322 simplified
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Calculate token expiration timestamp
   * @param ttlMs - Time to live in milliseconds
   * @returns Expiration date
   */
  static calculateExpiration(ttlMs: number): Date {
    return new Date(Date.now() + ttlMs);
  }

  /**
   * Check if timestamp has expired
   * @param expiresAt - Expiration timestamp
   * @returns true if expired
   */
  static isExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  // Base32 encoding helper (for TOTP)
  private static base32Encode(buffer: Buffer): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < buffer.length; i++) {
      value = (value << 8) | buffer[i];
      bits += 8;

      while (bits >= 5) {
        output += alphabet[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += alphabet[(value << (5 - bits)) & 31];
    }

    return output;
  }
}
```

9.2 Database Schema (Reference)

```sql
-- CYBERCUBE Authentication Schema (PostgreSQL)
-- Reference implementation for v1 standard

-- Users table (identity)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(16) NOT NULL UNIQUE, -- CC-PID: USR-XXXXXX-X
    email VARCHAR(254) NOT NULL UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'UNVERIFIED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    CONSTRAINT users_status_check CHECK (status IN ('UNVERIFIED', 'ACTIVE', 'SUSPENDED', 'DELETED'))
);

-- Credentials table (passwords)
CREATE TABLE user_credentials (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    hash_algorithm VARCHAR(20) NOT NULL DEFAULT 'argon2id',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    CONSTRAINT valid_algorithm CHECK (hash_algorithm IN ('argon2id', 'bcrypt'))
);

-- Sessions table
CREATE TABLE sessions (
    id VARCHAR(64) PRIMARY KEY, -- SHA-256(session_id)
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address INET,
    user_agent TEXT,
    mfa_verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_sessions_user_id ON sessions (user_id);
CREATE INDEX idx_sessions_expires_at ON sessions (expires_at);

-- Refresh tokens table
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256(token)
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(64) REFERENCES sessions(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens (user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens (expires_at);

-- Verification tokens (email, password reset, magic link)
CREATE TABLE verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256(token)
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(254), -- For email verification before user exists
    token_type VARCHAR(30) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    used_at TIMESTAMPTZ,
  
    CONSTRAINT valid_token_type CHECK (token_type IN (
        'email_verification', 'password_reset', 'magic_link', 'email_change'
    ))
);

CREATE INDEX idx_verification_tokens_expires ON verification_tokens (expires_at);

-- MFA credentials (TOTP, WebAuthn)
CREATE TABLE mfa_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mfa_type VARCHAR(20) NOT NULL,
    credential_data JSONB NOT NULL, -- Encrypted TOTP secret or WebAuthn credential
    name VARCHAR(100), -- User-friendly name
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at TIMESTAMPTZ,
  
    CONSTRAINT valid_mfa_type CHECK (mfa_type IN ('totp', 'webauthn'))
);

CREATE INDEX idx_mfa_user_id ON mfa_credentials (user_id);

-- MFA recovery codes
CREATE TABLE mfa_recovery_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code_hash VARCHAR(255) NOT NULL, -- Argon2 hash
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_recovery_codes_user_id ON mfa_recovery_codes (user_id);

-- OAuth connections (social/enterprise)
CREATE TABLE oauth_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'github', 'microsoft', etc.
    provider_user_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(254),
    access_token_encrypted BYTEA,
    refresh_token_encrypted BYTEA,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    UNIQUE (provider, provider_user_id)
);

CREATE INDEX idx_oauth_user_id ON oauth_connections (user_id);

-- Login attempts (rate limiting, lockout)
CREATE TABLE login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_hash VARCHAR(64) NOT NULL, -- SHA-256(lowercase(email))
    ip_address INET NOT NULL,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(50),
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_login_attempts_email_time ON login_attempts (email_hash, attempted_at);
CREATE INDEX idx_login_attempts_ip_time ON login_attempts (ip_address, attempted_at);

-- Audit log (authentication events)
CREATE TABLE auth_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id),
    session_id_hash VARCHAR(64),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_user_id ON auth_audit_log (user_id);
CREATE INDEX idx_audit_event_type ON auth_audit_log (event_type);
CREATE INDEX idx_audit_created_at ON auth_audit_log (created_at);

-- Cleanup job: expired sessions
CREATE INDEX CONCURRENTLY idx_sessions_cleanup 
    ON sessions (expires_at) 
    WHERE expires_at < NOW();

-- Cleanup job: expired tokens
CREATE INDEX CONCURRENTLY idx_tokens_cleanup 
    ON verification_tokens (expires_at) 
    WHERE used_at IS NULL AND expires_at < NOW();
```

9.3 Error Codes (Normative)

All authentication services MUST use these standard error codes:

| Code                     | HTTP Status | Description                       |
| ------------------------ | ----------- | --------------------------------- |
| AUTH_INVALID_CREDENTIALS | 401         | Invalid email or password         |
| AUTH_ACCOUNT_LOCKED      | 423         | Account temporarily locked        |
| AUTH_ACCOUNT_SUSPENDED   | 403         | Account suspended by admin        |
| AUTH_EMAIL_NOT_VERIFIED  | 403         | Email verification required       |
| AUTH_MFA_REQUIRED        | 403         | MFA verification required         |
| AUTH_MFA_INVALID         | 401         | Invalid MFA code                  |
| AUTH_TOKEN_EXPIRED       | 401         | Token has expired                 |
| AUTH_TOKEN_INVALID       | 401         | Token is invalid or revoked       |
| AUTH_SESSION_EXPIRED     | 401         | Session has expired               |
| AUTH_PASSWORD_BREACHED   | 400         | Password found in breach database |
| AUTH_PASSWORD_TOO_SHORT  | 400         | Password below minimum length     |
| AUTH_PASSWORD_TOO_LONG   | 400         | Password exceeds maximum length   |
| AUTH_RATE_LIMITED        | 429         | Too many requests                 |

Error response format:

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

10. Compliance Mapping

10.1 NIST 800-63B Alignment

| NIST Requirement                | CYBERCUBE Implementation                     |
| ------------------------------- | -------------------------------------------- |
| AAL1 (single factor)            | Password with email verification             |
| AAL2 (multi-factor)             | Password + TOTP/WebAuthn                     |
| AAL3 (hardware token)           | WebAuthn with hardware authenticator         |
| Memorized secret (password)     | 12+ chars, breached check, no composition    |
| Look-up secret (recovery)       | 10 single-use codes, hashed storage          |
| Out-of-band (email/SMS)         | Email for verification only, SMS discouraged |
| OTP device (TOTP)               | RFC 6238, SHA-1/SHA-256, 30s period          |
| Cryptographic device (WebAuthn) | FIDO2/WebAuthn L1+                           |

10.2 OWASP ASVS v4.0 Alignment

| ASVS Control                | Section                          | Status |
| --------------------------- | -------------------------------- | ------ |
| V2.1 Password Security      | 3 (Password Policy)              | ✓     |
| V2.2 General Authenticator  | 1-2 (Auth Methods, MFA)          | ✓     |
| V2.5 Credential Recovery    | 7 (Account Recovery)             | ✓     |
| V2.7 Out of Band            | 1.3.2 (Magic Link)               | ✓     |
| V2.8 One Time Verifier      | 2.3 (TOTP)                       | ✓     |
| V2.9 Cryptographic Verifier | 2.4 (WebAuthn)                   | ✓     |
| V3.1 Session Management     | 4 (Session Management)           | ✓     |
| V3.2 Session Binding        | 4.5 (Security Controls)          | ✓     |
| V3.3 Session Termination    | 4.1, 4.5 (Lifecycle, Revocation) | ✓     |

10.3 SOC 2 Trust Services Criteria

| Criteria                  | CYBERCUBE Control                      |
| ------------------------- | -------------------------------------- |
| CC6.1 (Logical access)    | MFA, session management, access tokens |
| CC6.2 (Authentication)    | Password policy, MFA methods           |
| CC6.3 (Access removal)    | Session revocation, account suspension |
| CC6.6 (System boundaries) | TLS, secure headers, CORS              |
| CC7.2 (Monitoring)        | Audit logging, failed login tracking   |

---

CYBERCUBE Authentication & Identity — Developer Cheat Sheet

This is a developer-first cheat sheet for the CYBERCUBE Authentication & Identity Standard v1.

Print it. Pin it. Reference it.

🔹 Authentication Methods

| Method         | When to Use         | Security    |
| -------------- | ------------------- | ----------- |
| Password + MFA | Default             | Medium-High |
| Magic Link     | Passwordless option | Medium-High |
| OAuth/OIDC     | Social/federated    | High (IdP)  |
| SAML SSO       | Enterprise          | High (IdP)  |
| WebAuthn       | Passwordless/MFA    | Very High   |
| API Key        | Service-to-service  | High        |

🔹 Password Rules

```
Length:     12-128 characters
Complexity: NONE (NIST 800-63B)
Rotation:   On compromise only
Breached:   REQUIRED check
```

🔹 Password Hashing

```
Algorithm:  Argon2id (REQUIRED for new)
Memory:     64 MB (m=65536)
Iterations: 3 (t=3)
Parallel:   4 (p=4)
Salt:       16 bytes (auto)

Legacy:     bcrypt (cost ≥ 12)
```

🔹 Token TTLs

```
Access Token:      15 minutes
Refresh Token:     7 days (max 30)
Email Verify:      24 hours
Password Reset:    1 hour
Magic Link:        15 minutes
TOTP Code:         30 seconds
WebAuthn Challenge: 5 minutes
Session Idle:      30 minutes
Session Absolute:  24 hours
```

🔹 Token Generation

```typescript
// Always use CSPRNG
const token = crypto.randomBytes(32).toString('base64url');

// Store hash only
const hash = crypto.createHash('sha256').update(token).digest('hex');
```

🔹 Session Rules

```
ID Length:  32 bytes (256 bits)
Storage:    Server-side only
Cookie:     httpOnly + secure + sameSite=strict
Regenerate: After auth + privilege change
```

🔹 MFA Requirements

| Account Type | MFA         |
| ------------ | ----------- |
| Standard     | Recommended |
| Admin        | REQUIRED    |
| Enterprise   | Per policy  |

Supported:

- TOTP (Authenticator app)
- WebAuthn (Security key) ← Preferred

🔹 Rate Limits

```
Login:         10/min/IP
Password Reset: 3/hour/email
Magic Link:     3/hour/email
TOTP Validate:  5/5min → lockout
```

🔹 Account Lockout

```
Trigger:   5 failed attempts
Duration:  15 minutes
Bypass:    Password reset
Notify:    Email to user
```

🔹 Secure Headers (REQUIRED)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Cache-Control: no-store
```

🔹 What You MUST NOT Do

❌ Store passwords in plain text
❌ Use MD5/SHA-1 for passwords
❌ Put session ID in URL
❌ Use localStorage for tokens
❌ Return different errors for "user not found"
❌ Allow MFA bypass without verification
❌ Skip TLS for auth endpoints
❌ Log passwords or tokens

🔹 What You MUST Do

✅ Use Argon2id for password hashing
✅ Generate tokens with CSPRNG
✅ Store token hashes (not plaintext)
✅ Validate all inputs
✅ Regenerate session on auth
✅ Invalidate sessions on password change
✅ Log all auth events
✅ Enforce TLS everywhere

🔹 Error Codes (Memorize)

```
AUTH_INVALID_CREDENTIALS  → 401
AUTH_ACCOUNT_LOCKED       → 423
AUTH_MFA_REQUIRED         → 403
AUTH_TOKEN_EXPIRED        → 401
AUTH_RATE_LIMITED         → 429
```

🔹 Mental Model

```
Password → proves identity → hashed (Argon2id)
Token    → grants access  → short-lived
Session  → tracks state   → server-side
MFA      → extra proof    → required for admin
```

🔹 One-Line Rules

- Passwords: hash with Argon2id, never store plaintext
- Tokens: generate with CSPRNG, store only hash
- Sessions: server-side only, regenerate on auth
- MFA: TOTP or WebAuthn, no SMS

---

CYBERCUBE Support SOP — Authentication Issues

1) Common Authentication Issues

| Symptom              | Likely Cause             | Action                 |
| -------------------- | ------------------------ | ---------------------- |
| "Invalid password"   | Wrong password           | Suggest password reset |
| "Account locked"     | 5+ failed attempts       | Wait 15 min or reset   |
| "Session expired"    | Idle > 30 min            | Re-login               |
| "MFA required"       | Admin/privileged account | Use authenticator app  |
| "Email not verified" | New account              | Check spam, resend     |

2) Password Reset Guidance

- Direct user to "Forgot Password" link
- Token valid for 1 hour only
- Check spam folder for email
- Only 3 reset requests per hour

3) MFA Troubleshooting

If user lost MFA device:

1. Check if they saved recovery codes
2. If no codes → identity verification required
3. Admin reset requires manager approval
4. Document everything in ticket

4) Session Issues

- "Logged out unexpectedly" → idle timeout (30 min) or session limit
- "Can't stay logged in" → check cookie settings, browser privacy mode
- "Logged out everywhere" → password was changed

5) Security Reminders

- Never share passwords over support channels
- Never bypass MFA without identity verification
- Always verify user identity before account changes
- Log all authentication support actions

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component                   | Status  | Notes                     |
| --------------------------- | ------- | ------------------------- |
| Password Hashing (Argon2id) | PENDING | Implement in auth-service |
| Session Management          | PARTIAL | Basic sessions exist      |
| JWT Access Tokens           | PENDING | Design complete           |
| Refresh Token Rotation      | PENDING | Design complete           |
| Email Verification          | PARTIAL | Exists, needs audit       |
| Password Reset              | PARTIAL | Exists, needs audit       |
| Magic Link                  | PENDING | Not implemented           |
| OAuth/OIDC                  | PENDING | Provider config needed    |
| SAML SSO                    | PENDING | Enterprise feature        |
| WebAuthn                    | PENDING | Passwordless feature      |
| TOTP MFA                    | PENDING | Priority feature          |
| Rate Limiting               | PARTIAL | Basic limits exist        |
| Account Lockout             | PENDING | Design complete           |
| Audit Logging               | PARTIAL | Extend coverage           |

### Migration Path

1. **Phase 1**: Password hashing upgrade (bcrypt → Argon2id)
2. **Phase 2**: Session management hardening
3. **Phase 3**: MFA implementation (TOTP)
4. **Phase 4**: Token architecture (JWT + refresh)
5. **Phase 5**: OAuth/OIDC integration
6. **Phase 6**: WebAuthn/passwordless
7. **Phase 7**: Enterprise SSO (SAML)

### Compliance Checklist

| Standard        | Status  | Audit Date |
| --------------- | ------- | ---------- |
| NIST 800-63B    | PARTIAL | —         |
| OWASP ASVS v4.0 | PARTIAL | —         |
| SOC 2 Type II   | PENDING | —         |
| ISO 27001       | PENDING | —         |

---

Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |



---

## Quick Reference Card — STD-SEC-003 Authentication & Identity Directive

**Authority**: STD-SEC-003 — Authentication & Identity Standard v1 | Owner: Security Team | Effective: 2026-01-17

**Scope**: All CYBERCUBE products, services, APIs · All user, admin, and service identities

### Design Axioms (NON-NEGOTIABLE)

- Authentication ≠ Authorization ≠ Session
- Fail closed on all auth errors
- Identity proof before access

### Authentication Methods (Approved)

- Password + Email Verification (+ MFA default)
- Magic Link (passwordless, single-use, 15 min TTL)
- OAuth 2.0 / OIDC (Auth Code + PKCE only)
- SAML 2.0 SSO
- WebAuthn / FIDO2 (preferred, phishing-resistant)
- API Key + Secret (service-to-service)

### Forbidden

- Implicit OAuth flow
- ROPC grant
- Tokens in URLs
- localStorage for auth tokens

### Password Policy (NIST 800-63B)

- Length: 12–128 chars
- Breached password check REQUIRED
- No forced composition rules
- Rotate on compromise only

### Password Storage

- Argon2id REQUIRED (new systems)
- bcrypt (cost >=12) legacy only
- Plaintext / MD5 / SHA-1 FORBIDDEN

### MFA

- REQUIRED for admin / privileged users
- TOTP (RFC 6238) and WebAuthn supported
- SMS / Email OTP discouraged

### Session Management

- Server-side sessions only
- ID entropy >=256 bits
- Regenerate on login + privilege change
- httpOnly + secure + sameSite=strict

### Token Management

- Access tokens: <=15 min TTL, no PII
- Refresh tokens: rotation REQUIRED, server-side
- Verification tokens: single-use, hashed

### Account Protection

- Rate limiting enforced
- Lockout: 5 failures → 15 min
- Generic auth errors only

### Audit & Logging

- All auth events logged
- Tokens, passwords NEVER logged
- Retention >=90 days

### Governance

- OWASP ASVS / NIST 800-63B aligned
- Enforced via CI + security review
- Non-compliance = audit finding

**Status**: CONTROLLED / ENFORCED

---

## Scorable Compliance Matrix — Authentication (S1–S10)

**Dimensions**: S1–S10 | **Scale**: 0–5 | **Max**: 50 points (10 × 5)

### Scoring Scale

| Score | Meaning |
|-------|---------|
| 0 | Not defined / unmanaged |
| 1 | Defined only |
| 2 | Partially implemented |
| 3 | Implemented (baseline compliant) |
| 4 | Enforced, measured |
| 5 | Institutionalized, audited |

### Dimensions

| ID | Dimension | Criteria | 0–1 | 4–5 |
|----|-----------|----------|-----|-----|
| S1 | Identity Governance & Ownership | Auth standard approved/owned · Scope + exclusions explicit | No identity authority | Enforced, reviewed, audited |
| S2 | Authentication Methods | Only approved methods enabled · Forbidden flows blocked | Unsafe or legacy methods | Strong methods enforced |
| S3 | Password Policy & Storage | NIST-aligned policy · Argon2id / bcrypt enforcement | Weak or plaintext storage | Modern, verified hashing |
| S4 | MFA Enforcement | MFA required for privileged · WebAuthn / TOTP supported | MFA absent or bypassable | MFA enforced + audited |
| S5 | Session Management | Server-side only · Fixation + hijacking prevention | URL or client-stored sessions | Hardened, rotated, monitored |
| S6 | Token Lifecycle Control | Short-lived access tokens · Refresh token rotation | Long-lived or exposed tokens | Strict TTL + revocation |
| S7 | Account Protection | Rate limiting · Lockout policy enforced | Brute-force vulnerable | Tested, enforced, logged |
| S8 | Recovery & Verification | Secure password reset · Email verification required | Weak recovery flows | Single-use, audited recovery |
| S9 | Audit Logging | All auth events logged · No sensitive data logged | Incomplete or unsafe logs | Forensic-ready logs |
| S10 | Compliance Alignment | NIST 800-63B mapping · OWASP ASVS coverage | Non-auditable | Audit-ready, externally defensible |

### Thresholds

| Range | Rating |
|-------|--------|
| >=45 | Identity-Mature |
| 36–44 | Managed with minor gaps |
| 28–35 | Elevated identity risk |
| <28 | Unacceptable posture |

### Hard Fail Conditions

- **S2 < 3** → Unsafe authentication
- **S4 < 3** → Privileged MFA missing
- **S7 < 3** → Account takeover risk
