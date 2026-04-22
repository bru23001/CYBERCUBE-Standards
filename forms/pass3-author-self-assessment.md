# Pass-3 Friction Audit — Author Self-Assessment Form

**Audience:** Named Owner of each CYBERCUBE standard (one response per standard).
**Window:** 2026-04-22 → 2026-05-06 (14 calendar days).
**Purpose:** Capture the author's honest self-rating of the standard on the four Pass-3 axes. Your score is one of several inputs — an opinion, not a verdict.
**Return to:** Standards Council via pull request appending your response block to §21.8 of `CYBERCUBE-Standards-Audit-Report-v1.md`, or email to the `standards-council@` alias.

---

## Instructions

1. Fill out one copy of this form per standard you own. If you own more than one, one form each.
2. Rate each axis from 1 (worst) to 5 (best). Use the rubric in §A below. Half-integers (e.g. 3.5) are allowed.
3. For every axis you score ≤ 3, briefly name the concrete obstacle. One sentence is fine.
4. Do **not** self-validate. If your score is systematically higher than the delivery-team survey results, the Standards Council will reconcile using both signals.

---

## Response Block

Copy-paste this block, fill in, and submit:

```yaml
# ------------------------------------------------------------
# Pass-3 Author Self-Assessment — Response
# ------------------------------------------------------------

standard_id: STD-XXX-###           # e.g., STD-SEC-003
standard_file: "[18]-STD-SEC-003 CYBERCUBE-Authentication-Identity-Standard-v1.md"
owner: "your-name (role)"
date_submitted: 2026-0X-XX

scores:
  clarity:         X   # 1–5 (§A.1)
  actionability:   X   # 1–5 (§A.2)
  automatability:  X   # 1–5 (§A.3)
  proportionality: X   # 1–5 (§A.4)

obstacles:
  # Only fill in for axes scored ≤ 3. One sentence each. Leave blank otherwise.
  clarity: >
    e.g. "T1 rule 3 combines two ideas — ought to be split."
  actionability: >
    e.g. "T1 rule 2 requires a tool we don't own yet; downgrade to T2."
  automatability: >
    e.g. "Impossible to automate without an LMS integration we don't have."
  proportionality: >
    e.g. "T3 requirements leak into T1 via cross-ref from §4.2."

# Agreement with Pass-3 objective scoring (§21.2 of the audit report):
# "agree" | "higher_than_yours" | "lower_than_yours" | "not_reviewed"
agreement_with_objective_score: agree

# Single biggest lever (your proposal) to move the composite score up by +0.5:
biggest_lever: >
  e.g. "Split the standard into two: rules + data."

# Optional: concerns not captured by the four axes.
other_concerns: >
  Leave empty if none.
```

---

## A. Rubric

### A.1 Clarity (C)

| Score | Meaning |
|------:|---------|
| 5 | Every MUST is a single, testable, unambiguous sentence. A new engineer understands it on first read. |
| 4 | ~80% of MUSTs are unambiguous. A few require one clarification. |
| 3 | Most MUSTs are clear; a handful are multi-part or context-dependent. |
| 2 | Significant prose required to interpret most MUSTs; terms are inconsistent or redundant. |
| 1 | Jargon-heavy, multi-page explanations before the actual rules; readers give up. |

Cues that reduce the Clarity score:

- Document > 2,500 lines.
- MUST count > 25 without explicit subsections.
- Cross-references without anchor links.
- T1/T2/T3 intermixed inside the same prose block.

### A.2 Actionability (A)

| Score | Meaning |
|------:|---------|
| 5 | T1 items are achievable by a 2-person team in under 1 day each; tooling exists. |
| 4 | Most T1 items are achievable within 1–3 days; tooling mostly exists. |
| 3 | T1 items require moderate effort (1–2 weeks) or some tooling-build. |
| 2 | T1 items imply headcount or tools the tier cannot reasonably assume. |
| 1 | T1 aspirations are realistically T3 — the tiering is wrong. |

Cues that reduce the Actionability score:

- ROADMAP : IN-PLACE ratio > 1.0 (more aspiration than reality).
- T1 requires specific vendor tools.
- Implementation Status rows dominated by ROADMAP.

### A.3 Automatability (M)

| Score | Meaning |
|------:|---------|
| 5 | Linter / CI / tests can verify ≥ 60% of MUSTs mechanically. |
| 4 | 40–60% of MUSTs mechanically verifiable. |
| 3 | 20–40% mechanically verifiable; some registered tooling exists. |
| 2 | < 20% mechanically verifiable; most rely on human review. |
| 1 | No practical automation — standards is fundamentally human process (e.g. personnel policies, BCP). |

**Note:** A score of 1 is not always a defect. If your standard is in a domain where automation is genuinely infeasible (personnel, legal, plan-of-record documents), mark `automatability: 1` and note `obstacles.automatability: "Domain-natural. No automation feasible."` — this is scored separately from defects.

### A.4 Proportionality (P)

| Score | Meaning |
|------:|---------|
| 5 | Tier and burden are coherent; no T3-masquerading-as-T1; reasonable risk-to-effort ratio. |
| 4 | Mostly coherent; one or two rules could move between tiers. |
| 3 | Some T1 rules feel onerous for small projects, or T3 rules are absent where the risk is clear. |
| 2 | Tiering is systematically too strict or too lax in multiple places. |
| 1 | Tiering is inverted (regulated-only items marked T1 MUST, or obvious baseline items marked T3). |

---

## B. What happens to your response

1. Your score is compared with the Pass-3 objective score (§21.2).
2. A large delta (|Δ| ≥ 1.0 on any axis) triggers a Standards Council discussion item at the next weekly review.
3. The median of (author-self, objective, delivery-team-median) becomes the **Pass-3-v2 composite** recorded in §21.8.
4. Any axis scoring median ≤ 2 remains flagged as Friction-Risk until a remediation PR lands.

---

## C. Example response (filled)

```yaml
standard_id: STD-SEC-003
standard_file: "[18]-STD-SEC-003 CYBERCUBE-Authentication-Identity-Standard-v1.md"
owner: "sec-lead (Jane Doe)"
date_submitted: 2026-04-25

scores:
  clarity:         3
  actionability:   3
  automatability:  4
  proportionality: 4

obstacles:
  clarity: >
    T1 rules 3 and 4 both talk about sessions; they should merge.
  actionability: >
    T1 rule 5 (secrets in key-store) requires migration work we scoped at 4 weeks.
  automatability: >
    ""
  proportionality: >
    ""

agreement_with_objective_score: agree
biggest_lever: >
  Publish an auth-decision-log JSON schema and a conformance-test harness;
  raise M from 4 to 5 and clarify T1 compliance.
other_concerns: >
  ""
```

---

*End of Author Self-Assessment Form.*
