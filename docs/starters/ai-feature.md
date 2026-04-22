# Starter: AI Feature (T2 + AI-specific)

**Archetype:** AI-backed product feature layered on an existing T2 parent. Overlay — not standalone.
**Cites:** [4] FWK-GOV-001 v1.4 Tier Cheat-Sheet · [11] POL-AI-001 · [48] STD-AI-001 · [21] STD-SEC-002 §11 (prompt-injection) · [45] STD-GOV-005 (KRI) · [9] POL-VEN-001 · [25] STD-DAT-001.
**Addresses:** Pass-4 F1 (starter kits) · Pass-4 S5 (foundation-model vendor-inventory row, prompt-versioning stub).

---

## 1. Applicability

Overlay **on top of** the parent product's archetype. Use when the feature uses a foundation model (LLM, multi-modal, embeddings at scale) — self-hosted, API-provider, or fine-tuned.

Typical pairings:

- Parent is `t2-saas.md` → overlay this file
- Parent is `t3-regulated.md` → overlay this file + apply [48] STD-AI-001 T3
- Parent is `internal-tool.md` → rare; if you do, treat the AI vendor as customer-data-equivalent given the likely `CONFIDENTIAL` prompt content

Not all AI-looking features qualify. Examples **out of scope** for this overlay: static ML models shipped in-app without a foundation-model vendor, deterministic classifiers, rule-based "AI" marketing copy.

---

## 2. Fill-ins

| Key | Value |
|---|---|
| Parent product | `[FILL]` — parent PCL + archetype |
| AI feature name | `[FILL]` |
| Foundation-model vendor(s) | `[FILL]` — e.g., OpenAI, Anthropic, Google, AWS Bedrock |
| Model ID(s) pinned | `[FILL]` — e.g., `gpt-4.1-2026-01`, `claude-opus-4.7-2026-03` |
| Classification of prompt input ([25]) | `[FILL]` — usually `CONFIDENTIAL` (inherits customer context); `RESTRICTED` if PHI / PII-heavy |
| Classification of model output ([25]) | `[FILL]` — typically inherits prompt classification |
| Automated-decision scope | `[FILL]` — `none` / `recommendation-only` / `automated-decision` (triggers [48] T3 pre-GA red-team) |
| AI feature owner | `[FILL]` |
| Model-registry owner ([48] T2) | `[FILL]` |
| AI Governance Committee rep ([48] T3) | `[FILL]` — if T3 |

---

## 3. Parent baseline

**All items from the parent archetype's §3 and §4 apply.** This overlay adds AI-specific obligations on top. No parent item is skipped.

---

## 4. AI-specific T1 (non-waivable)

From [11] POL-AI-001 T1 — applies even at internal-tool tier:

- [ ] **Approved-list vendor use only.** Foundation-model vendor is on the Approved list. If not → escalate to `sec-lead` + `legal-lead` before first call.
- [ ] **No PII / secrets / customer data to unapproved services.** Prompt-content classification is declared; unapproved vendors cannot see `CONFIDENTIAL` or higher.
- [ ] **Human review of AI output before merge.** For any AI-assisted engineering artifact (generated code, generated docs, generated SQL) → human review recorded in the PR.

Note: **[48] STD-AI-001 v1 has no T1 rules by design** — engineering-side MUSTs are T2/T3. This is the correct distribution per RFC-0002.

---

## 5. AI-specific T2 Pre-GA Checklist

### Model & Prompt Engineering ([48] STD-AI-001 T2)

- [ ] **Registered model identity** — entry in the model registry per production model:
  - `model_id` (vendor:name:version), `owner`, `production_since`, `classification_envelope` (max input classification, max output classification)
  - Deprecated / retired state tracked
- [ ] **Prompt versioning** — prompts live under `prompts/` directory; version-controlled; one file per distinct prompt (system + user templates separate); `prompt_id` emitted in every call's log record
- [ ] **Evaluation harness** — golden dataset in `prompts/evals/`; regression gate in CI: prompt or model changes run the eval and cannot regress below defined thresholds (accuracy, refusal rate, unsafe-output rate)
- [ ] **Prompt-injection mitigation** per [21] STD-SEC-002 §11 — input separation (system prompt vs. user-controlled context); output parsing with strict schemas; privilege minimization (the model is not given tools it doesn't need); tool-use gating (human-in-loop for destructive actions)
- [ ] **Observability metrics** — unsafe-output rate, drift (response distribution shift vs. baseline), refusal rate, token usage per tenant, per model; feeds [45] KRI catalog
- [ ] **Customer-facing AI disclosure banner** — per [11] T2; implemented in the UI at the feature boundary; text reviewed by `legal-lead`

### Vendor management ([9] POL-VEN-001 + [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md))

- [ ] **Vendor register row** — foundation-model provider registered per [9] with `category: foundation-model` (from `schemas/vendor-inventory.schema.json` v1.1 enum)
- [ ] **DPA executed** — per [16] TPL-LGL-001; confirm "no training on customer data" clause; confirm data-residency guarantees
- [ ] **Sub-processor chain understood** — where does the vendor run inference? Cross-border implications?
- [ ] **Model deprecation policy known** — vendor-side sunset timelines; fallback model identified; migration path documented

### Data handling ([25] STD-DAT-001 + [38] STD-OPS-003)

- [ ] **Prompt inputs logged with classification** — structured log entry per inference call: `prompt_id`, `model_id`, `tenant_id`, `classification`, hash of content (not raw content unless retention permits)
- [ ] **Output stored with classification** — outputs inherit the prompt's classification unless explicitly re-classified by human review
- [ ] **PII redaction at prompt boundary** when vendor is not Approved for that classification
- [ ] **Retention policy** — inference logs retained per [25] class; vendor-side logs handled by the DPA terms

### Safety & disclosure

- [ ] **"Don't use for" list** published internally — tasks the feature is not safe for (legal advice, medical advice, financial advice unless specifically scoped)
- [ ] **Fallback / failure mode** — what the feature does when the model API fails or returns filtered content; graceful UX
- [ ] **Rate limiting** per tenant to prevent cost abuse and data-exfiltration probing
- [ ] **Cost guardrails** — per-tenant daily token budget; kill-switch on anomaly

---

## 6. AI-specific T3 (if parent is T3)

Apply [48] STD-AI-001 T3 rows in addition to the T2 overlay:

- [ ] **Bias / fairness audit protocol** — pre-GA + annual + on material model change. Protocol documented; results reviewed by AI Governance Committee; remediations tracked in ERM.
- [ ] **Model cards per production model** — use [48] Appendix A template; classification, intended use, limitations, evaluation results, bias-audit summary.
- [ ] **Foundation-model provenance** — vendor certifications (SOC 2 Type II, ISO 42001), SBOM for any self-hosted model weights, vendor model cards on file.
- [ ] **Fine-tune provenance** — if fine-tuning: training-data classification recorded, pipeline attestation, artifact signing (sigstore), training-run reproducibility.
- [ ] **Red-team protocol** — pre-GA for any **automated-decision** feature; scoped test plan; results reviewed by `sec-lead` + AI Governance Committee.
- [ ] **AI Governance Committee engineering agenda** — model-registry review, bias-audit review, KRI-trend review, red-team findings review; quarterly minimum.

---

## 7. Post-GA / ongoing

- **KRIs monitored continuously** — unsafe-output rate, drift, refusal rate, cost per tenant
- **Eval harness runs** at every prompt change, every model bump, and on a monthly scheduled cadence
- **Model pinning review** — when vendor releases a new model version, review before bumping; eval harness gates the bump
- **Prompt audit** — periodically review `prompts/` for drift from the evaluated baseline; close any ad-hoc prompts that bypassed the eval
- **Vendor annual refresh** — re-run [VENDOR-ONBOARDING.md](./VENDOR-ONBOARDING.md) Step 3 on the foundation-model vendor
- **Bias audit** — annual (T3) or on material model change
- **Regulator-watch** — EU AI Act deadlines, sector-specific AI rules (NYC Local Law 144, state laws); align with [11] T3 AI Governance Committee

---

## 8. Exclusions / escapes

- Static ML models, rule-based classifiers → this overlay does not apply; standard parent-archetype obligations suffice.
- If feature is disabled behind a feature-flag that is off by default for customers → T2 obligations still apply once the flag is on for any tenant; plan for enablement, don't skip the groundwork.
- Waivers via [6] STD-GOV-003 with compensating control + expiry. AI-specific waivers attract extra scrutiny given the disclosure obligations of [11].

---

## 9. Interim notes (RFC-0002 bridge)

- The prompt-versioning convention (`prompts/` directory, `prompt_id` in logs, eval-gated CI) is **authoritative under [48] STD-AI-001 v1** (RFC-0002 execution landed 2026-04-22). No interim language remains.
- If you are onboarding an AI feature authored before RFC-0002 (i.e., with prompts in source code rather than `prompts/`), migrate as part of your next release cycle; the [48] T2 model-registry row is the forcing function.

---

*Template repo: `cybercube-starter-ai-feature` (follow-on per RFC-0004 §5 step 8). Until it ships, this overlay + the parent starter + the cited standards are the canonical start.*
