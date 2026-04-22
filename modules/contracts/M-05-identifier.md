# M-05 — Identifier Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.7 (lines 1015–1053)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.7 Identifier Module (M-05) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IIdentifierService                                                      │
│  MODULE: M-05 Identifier                                                            │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Generation                                                                      │
│  generate(entityCode: EntityCode) → CC_PID                                         │
│  generateBatch(entityCode: EntityCode, count: Int) → List<CC_PID>                  │
│                                                                                     │
│  // Validation                                                                      │
│  validate(id: String) → Boolean                                                    │
│  validateCheckDigit(id: String) → Boolean                                          │
│  parse(id: String) → Result<ParsedId, ParseError>                                  │
│                                                                                     │
│  // Registry                                                                        │
│  registerEntityCode(code: EntityCode, description: String) → Result<void, Error>   │
│  getEntityCodes() → List<EntityCodeInfo>                                           │
│  isEntityCodeValid(code: EntityCode) → Boolean                                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CC-PID FORMAT: {EntityCode}-{RandomChars}{CheckDigit}                             │
│  Example: USR-7K3M9X2P where USR=entity, 7K3M9X2=random, P=check digit             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Globally unique within entity type                                               │
│  • URL-safe characters only                                                         │
│  • Check digit detects single-char errors                                           │
│  • No sequential/guessable patterns                                                 │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
