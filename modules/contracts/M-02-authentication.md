# M-02 — Authentication Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.2 (lines 747–816)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.2 Authentication Module (M-02) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IAuthenticationService                                                  │
│  MODULE: M-02 Authentication                                                        │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Session Management                                                              │
│  login(credentials: Credentials) → Result<AuthTokens, LoginError>                  │
│  logout(sessionId: SessionId) → Result<void, Error>                                │
│  logoutAll(userId: UserId) → Result<void, Error>                                   │
│  refreshTokens(refreshToken: RefreshToken) → Result<AuthTokens, RefreshError>      │
│                                                                                     │
│  // Token Operations                                                                │
│  verifyAccessToken(token: AccessToken) → Result<TokenClaims, TokenError>           │
│  revokeToken(token: Token) → Result<void, Error>                                   │
│  introspectToken(token: Token) → Result<TokenInfo, Error>                          │
│                                                                                     │
│  // Session Queries                                                                 │
│  getActiveSessions(userId: UserId) → Result<List<Session>, Error>                  │
│  getSession(sessionId: SessionId) → Result<Session, NotFoundError>                 │
│                                                                                     │
│  // OAuth/OIDC                                                                      │
│  initiateOAuthFlow(provider: OAuthProvider) → Result<AuthorizationUrl, Error>      │
│  handleOAuthCallback(code: AuthCode, state: State) → Result<AuthTokens, Error>     │
│                                                                                     │
│  // SAML SSO                                                                        │
│  initiateSAMLFlow(provider: SAMLProvider) → Result<AuthnRequestUrl, Error>         │
│  handleSAMLCallback(samlResponse: SAMLResponse) → Result<AuthTokens, Error>        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CONSUMES (← M-01 Identity):                                                        │
│  • verifyCredentials(email, password) → User                                        │
│  • verifyMFA(userId, challenge, code) → void                                        │
│  • getMFAStatus(userId) → MFAStatus                                                 │
│  • getAccountStatus(userId) → AccountStatus                                         │
│  • getUserByEmail(email) → User                                                     │
│  • verifyMagicLinkToken(token) → User                                               │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS EMITTED (→ M-09 Audit):                                                     │
│  • SESSION_CREATED { sessionId, userId, ip, userAgent, authMethod, timestamp }      │
│  • SESSION_REFRESHED { sessionId, timestamp }                                       │
│  • SESSION_TERMINATED { sessionId, reason, timestamp }                              │
│  • TOKEN_REVOKED { tokenId, revokedBy, timestamp }                                  │
│  • TOKEN_REFRESH_REUSE_DETECTED { userId, tokenId, timestamp }                      │
│  • OAUTH_LOGIN { userId, provider, timestamp }                                      │
│  • OAUTH_LINK_CREATED { userId, provider, providerUserId, timestamp }               │
│  • OAUTH_FLOW_FAILED { provider, reason, timestamp }                                │
│  • SAML_LOGIN { userId, provider, timestamp }                                       │
│  • SAML_VALIDATION_FAILED { provider, reason, timestamp }                           │
│  • SESSION_LIMIT_EXCEEDED { userId, terminatedSessionId, timestamp }                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • ISessionRepository       — Session persistence (Redis)                           │
│  • IRefreshTokenRepository  — Refresh token metadata (PostgreSQL + RLS)             │
│  • IOAuthStateRepository    — Transient OAuth state (Redis, 5min TTL)               │
│  • ICryptoPort              — Token signing, secure random (→ M-16)                 │
│  • ISecretPort              — Signing keys, OAuth secrets (→ M-17)                  │
│  • IAuditPort               — Event emission (→ M-09)                               │
│  • ITenantContext           — Multi-tenant isolation (→ M-10)                        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
