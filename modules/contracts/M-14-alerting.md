# M-14 — Alerting Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.14 (lines 1288–1322)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.14 Alerting Module (M-14) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IAlertingService                                                        │
│  MODULE: M-14 Alerting                                                              │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Alert Rules                                                                     │
│  createRule(rule: AlertRule) → Result<RuleId, Error>                               │
│  updateRule(ruleId: RuleId, rule: AlertRule) → Result<void, Error>                 │
│  deleteRule(ruleId: RuleId) → Result<void, Error>                                  │
│  enableRule(ruleId: RuleId) → Result<void, Error>                                  │
│  disableRule(ruleId: RuleId) → Result<void, Error>                                 │
│                                                                                     │
│  // Alert Management                                                                │
│  getActiveAlerts(filter?: AlertFilter) → Result<List<Alert>, Error>                │
│  acknowledgeAlert(alertId: AlertId, userId: UserId) → Result<void, Error>          │
│  resolveAlert(alertId: AlertId, resolution: String) → Result<void, Error>          │
│  silenceAlert(alertId: AlertId, duration: Duration) → Result<void, Error>          │
│                                                                                     │
│  // Routing                                                                         │
│  setRoutingPolicy(severity: Severity, channels: List<Channel>) → Result<void>      │
│  getRunbookLink(alertType: String) → String?                                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SEVERITIES: CRITICAL (P1) | HIGH (P2) | MEDIUM (P3) | LOW (P4) | INFO             │
│  CHANNELS: PagerDuty | Slack | Email | SMS | Webhook                                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
