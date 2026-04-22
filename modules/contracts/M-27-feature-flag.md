# M-27 — Feature Flag Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.27 (lines 1783–1819)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.27 Feature Flag Module (M-27) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IFeatureFlagService                                                     │
│  MODULE: M-27 Feature Flag                                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Flag Evaluation                                                                 │
│  isEnabled(flagKey: String, context?: EvaluationContext) → Boolean                 │
│  getVariation<T>(flagKey: String, defaultValue: T, context?: EvaluationContext) →T │
│  getAllFlags(context?: EvaluationContext) → Map<String, FlagValue>                 │
│                                                                                     │
│  // Flag Management                                                                 │
│  createFlag(flag: FeatureFlag) → Result<FlagId, Error>                             │
│  updateFlag(flagKey: String, update: FlagUpdate) → Result<void, Error>             │
│  archiveFlag(flagKey: String) → Result<void, Error>                                │
│                                                                                     │
│  // Targeting                                                                       │
│  setTargetingRules(flagKey: String, rules: List<TargetingRule>) → Result<void>     │
│  setPercentageRollout(flagKey: String, percentage: Int) → Result<void, Error>      │
│  addUserToSegment(flagKey: String, userId: UserId) → Result<void, Error>           │
│                                                                                     │
│  // Kill Switch                                                                     │
│  killSwitch(flagKey: String) → Result<void, Error>     // Immediately disable      │
│  enableFlag(flagKey: String) → Result<void, Error>                                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVALUATION: User targeting | Percentage rollout | Segment rules | Time-based      │
│  CACHING: Client-side cache with TTL | Server-side evaluation preferred            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
