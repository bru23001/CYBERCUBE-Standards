# Pass-3 Friction Audit — Delivery-Team Survey

**Audience:** Any engineer, PM, SRE, security engineer, or designer who has **delivered a project under CYBERCUBE standards in the last 12 months**.
**Window:** 2026-04-22 → 2026-05-06 (14 calendar days).
**Expected time:** 10–15 minutes.
**Purpose:** Tell us where the standards get in your way. We are explicitly looking for friction, not for compliance. Honest "2" scores are more useful than polite "4"s.
**Return to:** `standards-council@` email alias OR submit a PR appending your anonymized response block to §21.9 of `CYBERCUBE-Standards-Audit-Report-v1.md`.

---

## Section 1 — About You (1 minute)

```yaml
role: "eng" | "sre" | "sec" | "pm" | "design" | "qa" | "other"
seniority: "junior" | "mid" | "senior" | "staff+"
projects_in_last_12mo: N
primary_domain: "frontend" | "backend" | "platform" | "data" | "ml/ai" | "mobile" | "infra" | "other"
anonymous: true | false        # If false, provide handle below.
handle: ""                      # Optional.
```

---

## Section 2 — Portfolio-Level Experience (3 minutes)

Rate how often you experienced each friction pattern on your last 2–3 projects. Scale: **Never (0) — Rarely (1) — Sometimes (2) — Often (3) — Always (4)**.

```yaml
frictions:
  "I could not tell which standards applied to my project":                         X
  "I could not tell which tier (T1/T2/T3) a specific rule fell into":               X
  "A standard required tooling my project did not have":                            X
  "A standard required behavior I could not mechanically verify":                   X
  "I read a long standard to find one rule and it was buried":                      X
  "Two standards contradicted each other":                                          X
  "I could not find the owner to ask a question":                                   X
  "My team agreed to a waiver but the exception process felt heavy":                X
  "I could not distinguish aspirational ROADMAP items from required items":         X
  "I copied boilerplate from another project because the standard was unclear":     X
```

---

## Section 3 — Worst-Offender Nomination (5 minutes)

Think of the **three standards** (by name or number) that gave you the most friction in the last 12 months. For each, briefly explain why and suggest one change.

```yaml
worst_offenders:
  - standard: "e.g. [29] STD-ENG-001 Naming"
    friction_pattern: >
      e.g. "Too long. I never read it end-to-end; I grep for the rule I need."
    one_change: >
      e.g. "Split into three smaller standards."

  - standard: ""
    friction_pattern: >
    one_change: >

  - standard: ""
    friction_pattern: >
    one_change: >
```

---

## Section 4 — Best-In-Class Nomination (1 minute)

Now name the **one standard** that you found *genuinely useful and easy to apply*. This helps us identify positive exemplars.

```yaml
best_in_class:
  standard: ""
  why: >
    e.g. "Clear T1 list, short, links to the tool I needed."
```

---

## Section 5 — Automation Leverage (2 minutes)

For each category, mark whether you would **use an automated check** (linter / CI / pre-commit) if it existed, and how high a priority.

Scale: `no_interest` | `nice_to_have` | `would_adopt` | `need_now`.

```yaml
automation_demand:
  naming_convention_linter:          ""
  openapi_contract_linter:           ""
  tfsec_iac_preset:                  ""
  dependency_update_bot:             ""
  auth_decision_log_validator:       ""
  secrets_scanner:                   ""
  license_compliance_scanner:        ""
  approved_algorithms_check:         ""
  approved_tech_stack_check:         ""
  adr_template_scaffolder:           ""
  documentation_link_checker:        ""
  test_coverage_gate:                ""
  observability_boilerplate_lib:     ""
  release_checklist_automation:      ""
  risk_register_schema_validator:    ""
```

---

## Section 6 — Tier Placement Feedback (2 minutes)

Did the Applicability Tier Table (T1/T2/T3) correctly match your project?

```yaml
tier_placement:
  my_project_tier_self_assessed: "T1" | "T2" | "T3"
  my_project_tier_in_prcs:       "T1" | "T2" | "T3" | "not_classified"
  match: true | false
  comment: >
    If false, what did the tier table get wrong? e.g. "My project is internal-only
    but the standard treated all API projects as T2."
```

---

## Section 7 — Open Question (optional, 1 minute)

```yaml
one_thing_i_would_change: >
  One sentence. What's the single change that would help your team most?
```

---

## What happens to your response

1. Responses are aggregated and anonymized into §21.9 of the audit report.
2. Each standard receives a **Delivery-Team Score (DTS)** = median of friction-pattern mentions ÷ respondent count. DTS > 0.5 triggers a Standards Council review item.
3. The `worst_offenders` nominations are cross-tabulated against the Pass-3 objective scoring (§21.2). Any standard named ≥ 3 times by distinct respondents gets fast-tracked into the remediation queue.
4. `automation_demand` responses are forwarded to the Engineering Platform team and fed into tooling-roadmap prioritization.
5. `tier_placement.match = false` responses feed back into the PCL criticality heuristic in STD-GOV-001.

---

*End of Delivery-Team Survey. Thank you for your time — honest low scores are more useful than polite high ones.*
