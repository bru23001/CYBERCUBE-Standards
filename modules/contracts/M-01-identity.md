# M-01 — Identity Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.1 (lines 682–746)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.1 Identity Module (M-01) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IIdentityService                                                        │
│  MODULE: M-01 Identity                                                              │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // User Lifecycle                                                                  │
│  register(email: Email, password: Password) → Result<UserId, RegistrationError>    │
│  verifyEmail(token: VerificationToken) → Result<void, VerificationError>           │
│  getUser(userId: UserId) → Result<User, NotFoundError>                             │
│  getUserByEmail(email: Email) → Result<User, NotFoundError>                        │
│  updateUser(userId: UserId, patch: UserPatch) → Result<User, UpdateError>          │
│  deleteUser(userId: UserId) → Result<void, DeletionError>                          │
│                                                                                     │
│  // Credential Management                                                           │
│  verifyCredentials(email: Email, password: Password) → Result<User, AuthError>     │
│  changePassword(userId: UserId, old: Password, new: Password) → Result<void, Err>  │
│  resetPassword(token: ResetToken, newPassword: Password) → Result<void, Error>     │
│  initiatePasswordReset(email: Email) → Result<void, Error>                         │
│                                                                                     │
│  // MFA                                                                             │
│  enrollMFA(userId: UserId, method: MFAMethod) → Result<MFAEnrollment, Error>       │
│  verifyMFA(userId: UserId, challenge: MFAChallenge, code: String) → Result<void>   │
│  getMFAStatus(userId: UserId) → Result<MFAStatus, Error>                           │
│                                                                                     │
│  // Account Status                                                                  │
│  lockAccount(userId: UserId, reason: LockReason) → Result<void, Error>             │
│  unlockAccount(userId: UserId) → Result<void, Error>                               │
│  getAccountStatus(userId: UserId) → Result<AccountStatus, Error>                   │
│                                                                                     │
│  // Magic Link                                                                      │
│  initiateMagicLink(email: Email) → Result<void, Error>                             │
│  verifyMagicLinkToken(token: MagicLinkToken) → Result<User, TokenError>            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS EMITTED (→ M-09 Audit):                                                     │
│  • USER_REGISTERED { userId, email, timestamp }                                     │
│  • USER_VERIFIED { userId, timestamp }                                              │
│  • USER_LOGIN_SUCCESS { userId, ip, userAgent, timestamp }                          │
│  • USER_LOGIN_FAILED { email, ip, reason, timestamp }                               │
│  • USER_LOCKED { userId, reason, timestamp }                                        │
│  • USER_UNLOCKED { userId, unlockedBy, timestamp }                                  │
│  • MFA_ENROLLED { userId, method, timestamp }                                       │
│  • MFA_VERIFIED { userId, method, timestamp }                                       │
│  • PASSWORD_CHANGED { userId, timestamp }                                           │
│  • MAGIC_LINK_SENT { email, timestamp }                                             │
│  • MAGIC_LINK_VERIFIED { userId, timestamp }                                        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • IUserRepository         — User persistence                                       │
│  • IPasswordHasher         — Argon2id hashing                                       │
│  • ICryptoService          — Token generation                                       │
│  • IAuditPort              — Event emission                                         │
│  • IEmailService           — Verification emails                                    │
│  • ITenantContext          — Multi-tenant isolation                                 │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
