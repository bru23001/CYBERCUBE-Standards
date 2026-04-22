# CYBERCUBE RFCs

Active and accepted Requests for Comment against the standards portfolio.

RFC process owner: **STD-ENG-007 Documentation & RFC Standard**. ID allocation: **RFC-####** via the governance-registry namespace (STD-ENG-001 Namespace G).

## Index

| RFC | Title | Status | Target | Owners | Decision by |
|-----|-------|--------|--------|--------|-------------|
| [RFC-0001](./RFC-0001-split-std-eng-001-naming.md) | Split STD-ENG-001 Naming into umbrella + 3 sub-standards | DRAFT | [29] STD-ENG-001 | eng-lead, sec-lead, oncall-sre | 2026-05-13 |
| [RFC-0002](./RFC-0002-split-pol-ai-001-ai-ethics.md) | Split POL-AI-001 into personnel policy + STD-AI-001 engineering standard | DRAFT | [11] POL-AI-001 | eng-lead, sec-lead, oncall-sre, legal-lead | 2026-05-20 |
| [RFC-0003](./RFC-0003-collapse-pol-rec-001-into-std-dat-001.md) | Collapse POL-REC-001 duplications into STD-DAT-001; reshape POL-REC-001 as thin records-governance policy | DRAFT | [14] POL-REC-001, [25] STD-DAT-001 | legal-lead, privacy-lead, data-owner, sec-lead | 2026-05-27 |
| [RFC-0004](./RFC-0004-starter-kits.md) | Starter kits & project templates (internal-tool · T2-SaaS · T3-regulated · AI-feature) + [33] small-project exclusion | DRAFT | [4] FWK-GOV-001, [33] STD-ENG-008, new `docs/starters/*` | eng-lead, sec-lead, oncall-sre, standards-council | 2026-05-27 |
| [RFC-0005](./RFC-0005-regulation-mapping-artifacts.md) | Regulation mapping artifacts (PCI DSS 4.0 / HIPAA / SOC2) + HIPAA primitives ([46] TPL-LGL-002 BAA, [47] STD-DAT-005 De-identification) | DRAFT | [7] STD-GOV-006, new `governance/compliance-maps/*`, new [46] + [47] | sec-lead, legal-lead, privacy-lead, standards-council | 2026-05-27 |

## Lifecycle

```
DRAFT → COMMENT (2-week window) → DECISION (trio sign-off) → ACCEPTED (moved to rfcs/accepted/)
                                                            ↘ REJECTED  (moved to rfcs/rejected/ with rationale)
                                                            ↘ WITHDRAWN (moved to rfcs/withdrawn/)
```

Structural template: STD-ENG-007 Appendix X. One RFC = one structural decision; implementation tickets are tracked separately.
