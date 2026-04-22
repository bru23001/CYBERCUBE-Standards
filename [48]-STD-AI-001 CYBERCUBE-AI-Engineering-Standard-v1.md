# CYBERCUBE AI Engineering Standard (v1.0)

**Standard ID:** STD-AI-001  
**Catalog Number:** 8.1 (Engineering / AI)  
**Status:** Active  
**Effective:** 2026-04-22  
**Classification:** INTERNAL  
**Owner:** Engineering Lead + Security Lead  
**Applies to:** Engineers building product features that call an AI model (own-hosted or third-party), and the platform services that operate such features.

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All projects building or operating AI-powered features | **T1 MUST** | *None at v1.0 — intentional.* T1 for AI model-ops is premature at CYBERCUBE's current portfolio state. The three personnel-side T1 rules in [11] POL-AI-001 (approved tools, prohibited data, human review) cover the non-negotiable floor. Engineering T1s will be introduced in future revisions as specific rules mature (candidates: model registry exists; unsafe-output rate has a named KRI owner). | — |
| SaaS / customer-facing AI features | **T2 SHOULD** | (1) Any AI model used in a production path has a **registered model identity** (vendor/model-id/version) and a **named owner** per [29] STD-ENG-001 Namespace-M. (2) Prompts and system prompts for production AI features are **versioned** (stored in repo under a `prompts/` folder or equivalent, with the active version referenced in code). (3) Each production AI feature has a documented **evaluation harness** — a golden dataset + regression suite that runs on prompt / model / context changes (cross-ref [35] STD-ENG-005). (4) Prompt-injection and jailbreak mitigations follow [21] STD-SEC-002 §AI-Assisted-Code and §Prompt-Injection. (5) Observability: unsafe-output rate and drift score emitted to [38] STD-OPS-003 / [45] STD-GOV-005; token usage emitted as operational metric. (6) User-facing disclosure banner present on every AI-powered feature (implements [11] POL-AI-001 §7.3). | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk AI features | **T3 MAY** | (7) **Bias / fairness audit** executed per §6 protocol before GA and on schedule (annual or per material model change). (8) **Model cards** published internally per §8 template for every production model (own-trained or fine-tuned; vendor foundation models may rely on vendor model cards referenced in the CYBERCUBE model card). (9) **Provenance & supply-chain** attestation for foundation-model choice (vendor SBOM / certifications; in-house fine-tunes signed). (10) **Red-team protocol** executed before GA for any customer-facing AI feature with automated-decision impact. (11) AI Governance Committee ([11] POL-AI-001 §1) engineering remit enforced: committee reviews §2 model-registry additions, §6 bias-audit results, §8 model cards quarterly. | Formal waiver with risk assessment per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v1.0 (2026-04-22) — new standard, RFC-0002 split.** Created as the engineering-side companion to [11] POL-AI-001 v2.0. No T1 at v1.0 by design — engineering AI practice is still maturing and forcing universal MUST rules now would be premature. Eight T2/T3 rules enumerate the current expected state. Expected to grow as model-ops practice matures (quarterly updates for the first 12 months per RFC-0002 §8).

---

## 0. Purpose & Scope

This standard governs **how engineers build product features that call an AI model**, whether the model is CYBERCUBE-hosted, self-hosted open-weights, or a third-party API (OpenAI, Anthropic, Google, AWS Bedrock, etc.). The personnel rules (who may use which tool, what data may not be entered) are in **[11] POL-AI-001 AI Use Policy** and are not restated here.

**In scope:**

- Model lifecycle: selection, versioning, deployment, rollback, deprecation.
- Evaluation: golden datasets, regression gates, red-team protocol.
- Prompt engineering: system-prompt management, context-window discipline, prompt-injection / jailbreak mitigation.
- Observability: unsafe-output rate, drift score, token-usage metrics.
- Bias / fairness audit protocol (T3).
- Model cards and documentation.
- Provenance / supply-chain for foundation models and fine-tunes.

**Out of scope (owned elsewhere):**

- Personnel rules on AI tool use → [11] POL-AI-001.
- Data classification / retention for AI inputs and outputs → [25] STD-DAT-001.
- Secure-coding patterns that happen to involve AI (input validation for prompt injection is owned here; the surrounding secure-coding posture is [21] STD-SEC-002).
- RFC process, ADR templates → [30] STD-ENG-007.
- Release gates → [37] STD-ENG-006.

**Design principles:**

1. **Delegation over duplication** — rules live in one place; this standard cross-refs rather than restates.
2. **Engineering-velocity-aware** — T2 rules are what a competent team can adopt in a sprint; T3 adds protocol and governance.
3. **Observability-first** — any AI rule must be measurable; unobservable rules are not enforceable.
4. **Model-agnostic where possible** — rules target the *integration pattern*, not the vendor.

---

## 1. Model Identity & Versioning

### 1.1 Model Registry (T2 #1)

Every AI model used in a production path has a row in a **model registry** (initial form: a `models/models.json` file in the product repo, or equivalent structured artifact). Minimum fields:

| Field | Example | Notes |
|-------|---------|-------|
| `id` | `M-AI-001` | Namespace-M per [29] STD-ENG-001; globally unique within the product. |
| `name` | "Customer-support intent classifier" | Human-readable. |
| `vendor` | `anthropic` / `openai` / `self-hosted` / `aws-bedrock` | Canonical vendor slug. |
| `vendor_model_id` | `claude-3-7-sonnet-20250219` | Vendor's canonical version string. |
| `version` | `1.2.0` | CYBERCUBE-managed semver of the integration (prompt + params + routing), not the vendor's model version. |
| `owner` | `oncall:product-ai` | Named owner per [29] STD-ENG-001. |
| `status` | `active` / `deprecated` / `retired` | Lifecycle state. |
| `classification_envelope` | `INTERNAL` | Highest [25] STD-DAT-001 classification permitted in prompts to this model. |
| `last_evaluated` | `2026-04-01` | Date of last evaluation-harness run (§3). |

### 1.2 Versioning Semantics (T2 #1, clarified)

- **Patch** (1.2.0 → 1.2.1): prompt wording tweak, parameter tweak (temperature, max tokens), retry/timeout change.
- **Minor** (1.2.x → 1.3.0): new output field, additional tool/function-call, widened context.
- **Major** (1.x → 2.0): vendor change, base-model change, semantics change in outputs.

A **vendor-side model version bump** (e.g. Anthropic retires a Sonnet variant) forces at least a minor bump even if no integration code changed — this ensures the `vendor_model_id` field is never stale.

### 1.3 Rollback

Every model registry row MUST have a fallback strategy, one of: (a) previous version still served to a fraction of traffic via feature-flag, (b) graceful-degradation path (rule-based default), or (c) explicit "feature disabled" state. The fallback strategy is documented in the row (free-form `fallback` field acceptable at v1.0).

### 1.4 Deprecation

Deprecated models stay in the registry with `status=deprecated` for ≥ 30 days before `retired`. Downstream callers have that window to migrate; breaking the contract without deprecation violates T2 #1.

---

## 2. Prompt Engineering

### 2.1 System-Prompt Versioning (T2 #2)

Prompts and system prompts for production AI features are stored in the product repo under a `prompts/` folder (or equivalent package structure). Each prompt file carries a version header:

```
# Prompt: customer-support-intent
# Version: 2.3.0
# Last-Modified: 2026-04-18
# Owner: oncall:product-ai
# Linked-model-registry: M-AI-001
```

Code references prompts by `(prompt-id, version)`; drift between the active code reference and `prompts/` is a CI failure.

### 2.2 Context-Window Discipline

- Long-running conversations MUST implement context truncation or summarization explicitly; relying on the model's silent context-window cutoff is prohibited for customer-facing features.
- Token counts for in-bound context and out-bound completion are measured and emitted as operational metrics (§5).

### 2.3 Prompt-Injection Mitigation (T2 #4)

Defer to **[21] STD-SEC-002 §Prompt-Injection** for the canonical mitigation patterns. This standard adds the following AI-specific requirements:

- System-prompt and user-prompt are **structurally separated** in the integration (not concatenated as free text) where the vendor supports it (role-tagged messages, Anthropic `<user>`-style tagging, OpenAI function-calling).
- Untrusted retrieved content (RAG) is **bracketed** with a delimiter the model is told to treat as opaque; the retrieval source is cited in the response (grounding).
- Tools / function calls invoked by the model go through the **same authorization gate** as a human-initiated call for the same resource — the model is not a privileged caller.
- **Jailbreak attempts** (known suspect-string patterns, policy-violation outputs) are logged to the AI incident stream (§5.4).

### 2.4 Retrieval-Augmented Generation (RAG)

When a feature uses RAG, the retrieval index is a first-class [29] STD-ENG-001 Namespace-M module and carries:

- A declared **source-of-truth** (which product data, what classification, which [25] STD-DAT-001 retention).
- A **refresh cadence** and **staleness SLO**.
- A **grounding marker** in the output so users can tell retrieval-answered from generation-answered.

---

## 3. Evaluation Harness (T2 #3)

### 3.1 Golden Datasets

Every production AI feature has:

- A **golden dataset** of representative inputs with expected / acceptable outputs (or graders for open-ended outputs).
- A **regression suite** — the golden dataset automated and run on every prompt/model/context change.
- A **green/red threshold** — for closed-form evals: accuracy / F1; for open-ended: LLM-grader score or rubric-based human grade sample.

Golden-dataset size at v1.0 is a judgment call (typical: 30–200 cases); the MUST is that *some* dataset exists and the regression suite is wired into CI for prompt-folder changes.

### 3.2 Regression Gate

Prompt / model version bumps MUST run the regression suite; a regression below the green/red threshold blocks merge. This is the engineering-side mirror of the personnel-side "human review before merge" T1 in [11] POL-AI-001 — code-review *and* eval-regression together form the T2 gate.

### 3.3 Red-Team Protocol (T3 #10)

Before GA for any customer-facing AI feature with automated-decision impact (T3), a red-team exercise MUST probe:

- Prompt-injection across user-controllable inputs.
- Jailbreak attempts (refusal-bypass, role-reversal).
- Harmful-content elicitation.
- PII-exfiltration probes (memorization risk).
- Abuse / cost-exhaustion attacks (prompt-size, token-runaway).

Red-team findings feed into §6 (bias / fairness if any finding overlaps) and into [23] STD-SEC-007 as potential incidents.

---

## 4. Observability (T2 #5)

AI features emit the following to the telemetry pipeline ([38] STD-OPS-003):

| Metric | Unit | Owner pipeline |
|--------|------|----------------|
| `ai.request.count` | counter (by model id) | [38] |
| `ai.latency_ms` | histogram (by model id) | [38] |
| `ai.tokens_in` / `ai.tokens_out` | counter (by model id) | [38] |
| `ai.cost_usd` | counter (by model id) | [38] + [45] |
| `ai.unsafe_output_rate` | gauge | [45] STD-GOV-005 KRI |
| `ai.drift_score` | gauge (where measurable) | [45] KRI |
| `ai.refusal_rate` | gauge (by model id) | [38] |
| `ai.regression_score` | gauge (latest eval-harness run) | [38] |

`unsafe_output_rate` and `drift_score` are registered as portfolio-level KRIs in [45] STD-GOV-005 once any production AI feature exists.

### 4.1 Alerting

- Spikes in `unsafe_output_rate` or `refusal_rate` page the model owner (`oncall:<product>-ai`) per [41] STD-OPS-004.
- Sustained drift triggers an evaluation-harness re-run; if the re-run crosses the red threshold, the feature is rolled back per §1.3.

### 4.2 AI Incident Stream

`ai.incident.*` events flow into [23] STD-SEC-007 incident channels when they involve data leakage, PII exposure, or jailbreak success; into [41] STD-OPS-004 when they are operational (availability / cost / latency).

---

## 5. Bias & Fairness Audit Protocol (T3 #7)

### 5.1 When Required

Mandatory before GA and annually thereafter for any T3 AI feature. Also mandatory on any **material model change** (major version bump in §1.2, or vendor change).

### 5.2 Protocol

1. **Define protected attributes** for the feature's user population (regulatory baseline: race, gender, age; add sector-specific attributes as applicable).
2. **Construct an evaluation slice** per protected attribute with adequate sample size.
3. **Measure outcome disparity** using at least one statistical parity metric (demographic parity, equal opportunity, calibration) appropriate to the decision type.
4. **Threshold**: disparity above the documented tolerance triggers a required mitigation (prompt-level, retrieval-level, or routing-level) before GA.
5. **Document** the audit in the model card (§7).

### 5.3 Who Runs It

At v1.0: the feature's engineering owner runs the audit with support from `sec-lead` or an assigned auditor. At maturity: a dedicated AI evaluator role (TBD; RFC-queued) owns this.

### 5.4 What Fails

Any audit failure is a **GA blocker** for T3 features and a recorded risk (per [8] STD-ERM-001) with a remediation plan and named approver.

---

## 6. Model Cards (T3 #8)

Every production model (own-trained, fine-tuned, or third-party foundation) has a model card at `models/cards/<model-id>.md`. For third-party foundation models, the CYBERCUBE model card references the vendor's published card for the base-model sections and only authors CYBERCUBE-specific sections (integration scope, prompts, evaluation results, bias audit results).

### 6.1 Template (Appendix A)

See §Appendix A for the full template. Required sections:

- Model identity (mirrors `models.json` row fields).
- Intended use and out-of-scope uses.
- Training data summary (for fine-tunes; "vendor-provided" acceptable for foundation models with a link).
- Evaluation summary (latest harness scores, caveats).
- Bias audit summary (latest audit date + findings + mitigations).
- Limitations and known failure modes.
- Change log.

---

## 7. Transparency & Disclosure Patterns

### 7.1 Customer-Facing Disclosure Banner (T2 #6)

Every AI-powered user-facing feature MUST surface a short "AI-powered" disclosure when the AI is on the critical path of the interaction. Wording is drafted by Marketing + Legal ([11] POL-AI-001 §7.3 owners); placement and dismissal behavior are engineering decisions governed here:

- The banner MUST be visible before or during first use of the feature per user (not buried in a settings page).
- Dismissal state is per-user and per-feature; it does not disable the AI.
- An "learn more" link MUST point to the feature's public model card (or a summary of it).

### 7.2 Automated-Decision Explainability

For features that make a decision affecting a user (eligibility, ranking, access), the feature MUST be able to produce, on request, a **decision-summary** — free text or structured — indicating the primary factors in the decision. "The model decided" is not an acceptable summary.

### 7.3 Appeal Path

T3 features with automated-decision impact MUST have a non-AI appeal path surfaced at the point of decision (not just in the ToS). Implementation is product-specific; the requirement is existence.

---

## 8. Provenance & Supply Chain (T3 #9)

### 8.1 Foundation-Model Provenance

For every third-party foundation model used, record:

- Vendor name and public evaluation / safety documentation link.
- Vendor's own model card link.
- Relevant certifications (SOC 2, ISO 27001, GDPR DPA) — cross-ref [9] POL-VEN-001 vendor register.

### 8.2 Fine-Tune Provenance

For every CYBERCUBE fine-tune:

- Base model identity (§8.1).
- Training-data summary — classification ([25]), volume, provenance.
- Training pipeline attestation (who ran the training, reproducibility notes).
- Artifact signing (per [20] STD-SEC-005 cryptography when applicable).

---

## 9. Governance Interface

The AI Governance Committee defined in [11] POL-AI-001 §1 has an engineering remit owned by this standard:

| Quarterly review item | Source artifact | Owner |
|-----------------------|-----------------|-------|
| Model registry additions / deprecations | `models/models.json` | `eng-lead` |
| Evaluation harness coverage per production feature | CI dashboard | `eng-lead` |
| Bias-audit results for T3 features | model cards | `sec-lead` + audit owner |
| Unsafe-output-rate and drift-score trends | [45] STD-GOV-005 KRIs | `sec-lead` |
| Red-team findings (T3) | [23] STD-SEC-007 + this std §3.3 | `sec-lead` |
| Open AI incidents | [23] STD-SEC-007 + [41] STD-OPS-004 | `sec-lead` + `oncall-sre` |

Committee cadence, chair, and membership are in [11] POL-AI-001 §1; this standard contributes only the *engineering agenda items* above.

---

## Implementation Status

**Last Updated:** 2026-04-22  
**Standard Version:** v1.0

### Core Implementation

| Component | Status | Tier | Notes |
|-----------|--------|------|-------|
| This standard | IN PLACE | T2/T3 | v1.0 created per RFC-0002 |
| `models/models.json` schema seed | ROADMAP | T2 | Follow-on slice; initial schema to mirror [9] `vendor-inventory` pattern |
| `prompts/` folder convention | ROADMAP | T2 | Adopted per product as AI features land |
| Evaluation harness template | ROADMAP | T2 | Follow-on; cross-ref [35] STD-ENG-005 template library |
| Unsafe-output-rate KRI in [45] | ROADMAP | T2 | Triggered by first production AI feature |
| Bias-audit protocol | ROADMAP | T3 | Triggered by first T3 AI feature |
| Model-card template (§Appendix A) | ROADMAP | T3 | Follow-on authored alongside first T3 feature |
| Red-team protocol runbook | ROADMAP | T3 | Follow-on |

Status vocabulary: `IN PLACE` | `COMPLETE` | `PARTIAL` | `ROADMAP` | `N/A`.

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1.0 | 2026-04-22 | Standards Council + Engineering Lead | **Initial release per RFC-0002 split.** New engineering-side home for model versioning, prompt engineering, evaluation, observability, bias audits, model cards, and provenance. No T1 at v1.0 by design; 6 T2 + 5 T3 rules. Expected growth cadence: quarterly updates for first 12 months. |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [11] POL-AI-001 AI Use Policy | **Personnel-side companion.** Approved tools, prohibited data, human-review T1, ethics-review / governance committee (policy body). |
| [21] STD-SEC-002 Secure Coding Standard | Canonical for prompt-injection / jailbreak secure-coding patterns; cross-referenced from §2.3. |
| [35] STD-ENG-005 Testing & Quality Standard | Canonical for test infrastructure; cross-referenced from §3 (evaluation harness uses the same tooling). |
| [23] STD-SEC-007 Security Incident Response Standard | AI incidents (data leakage, jailbreak success, PII exfiltration) flow here. |
| [41] STD-OPS-004 Incident Response Standard | Operational AI incidents (availability, cost runaway, latency) flow here. |
| [38] STD-OPS-003 Observability & Telemetry Standard | Metrics pipeline for §4 observability. |
| [45] STD-GOV-005 Metrics / KRIs / Governance Dashboards Standard | Registers `unsafe_output_rate` and `drift_score` as portfolio-level KRIs. |
| [29] STD-ENG-001 Naming & Identifier Standard | Namespace-M for model ids; owner-handle format for model owners. |
| [25] STD-DAT-001 Data Classification & Retention Standard | Classification envelope for model prompts and outputs. |
| [9] POL-VEN-001 Vendor Risk Management Policy | Vendor register for foundation-model vendors. |
| [20] STD-SEC-005 Cryptography & Key Management Standard | Artifact signing for fine-tunes (§8.2). |
| [8] STD-ERM-001 Enterprise Risk Management Policy | Bias-audit failures and red-team findings recorded as risks. |

---

## Appendix A — Model Card Template (stub at v1.0)

```
# Model Card: <model-name>

**Model ID:** <M-AI-NNN>
**Version:** <CYBERCUBE integration semver>
**Vendor model id:** <vendor slug + vendor version>
**Owner:** <oncall:handle>
**Last updated:** <YYYY-MM-DD>
**Classification envelope:** <PUBLIC | INTERNAL | CONFIDENTIAL | RESTRICTED>

## Intended Use
<feature the model powers; user population; decisions it influences>

## Out-of-Scope Uses
<explicit list of uses this model is NOT for>

## Training Data
<for fine-tunes: classification, volume, provenance>
<for foundation models: "vendor-provided" + link to vendor's training documentation>

## Evaluation
- Golden-dataset size: <N>
- Latest regression score: <metric> on <date>
- Grader type: <closed-form | LLM-grader | human-rubric>

## Bias & Fairness
- Last audit: <YYYY-MM-DD>
- Protected attributes measured: <list>
- Disparity tolerance: <threshold>
- Findings: <summary>
- Mitigations: <summary>

## Limitations & Known Failure Modes
<free text>

## Changelog
<version / date / owner / summary>
```

Full template is a ROADMAP deliverable (§Implementation Status); v1.0 ships this stub as the binding minimum.
