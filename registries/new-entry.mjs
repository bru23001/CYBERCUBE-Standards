#!/usr/bin/env node

/**
 * CYBERCUBE Registry — Interactive Decision Tree
 *
 * Guides you through classifying a new item, writes it to the correct
 * JSON registry file, validates, and renders the markdown.
 *
 * Every choice point includes a definition so decisions are consistent.
 * Type 'q' at any prompt to exit without saving.
 *
 * Usage: node registries/new-entry.mjs
 * Requires: Node.js >= 18 (uses readline/promises)
 */

import { createInterface } from "node:readline/promises";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { stdin, stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resolve = (...parts) => join(__dirname, ...parts);

const rl = createInterface({ input: stdin, output: stdout });

// ---------------------------------------------------------------------------
// ANSI helpers (works in every modern terminal)
// ---------------------------------------------------------------------------

const c = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  dim:     "\x1b[2m",
  italic:  "\x1b[3m",
  cyan:    "\x1b[36m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  red:     "\x1b[31m",
  magenta: "\x1b[35m",
  blue:    "\x1b[34m",
  white:   "\x1b[37m",
  bgCyan:  "\x1b[46m",
  bgBlue:  "\x1b[44m",
};

// ---------------------------------------------------------------------------
// Exit handling — type 'q' at any prompt
// ---------------------------------------------------------------------------

class UserExit extends Error { constructor() { super("exit"); } }

function checkQuit(input) {
  const v = input.trim().toLowerCase();
  if (v === "q" || v === "quit" || v === "exit") throw new UserExit();
}

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

function loadJson(relPath) {
  return JSON.parse(readFileSync(resolve(relPath), "utf-8"));
}

function saveJson(relPath, data) {
  writeFileSync(resolve(relPath), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

function banner() {
  console.log();
  console.log(`  ${c.bgBlue}${c.bold}${c.white}                                                    ${c.reset}`);
  console.log(`  ${c.bgBlue}${c.bold}${c.white}    CYBERCUBE Registry — New Entry Decision Tree     ${c.reset}`);
  console.log(`  ${c.bgBlue}${c.bold}${c.white}                                                    ${c.reset}`);
  console.log();
}

function hr() {
  console.log(`\n  ${c.dim}${"─".repeat(56)}${c.reset}\n`);
}

function step(current, total, title) {
  console.log();
  console.log(`  ${c.cyan}${c.bold}Step ${current}/${total}${c.reset}  ${c.bold}${title}${c.reset}`);
}

function hint() {
  console.log(`  ${c.dim}Type ${c.yellow}q${c.dim} at any prompt to exit without saving.${c.reset}`);
}

function define(title, lines) {
  console.log();
  console.log(`  ${c.cyan}┌─ ${c.bold}${title}${c.reset}`);
  for (const line of lines) {
    console.log(`  ${c.cyan}│${c.reset}  ${c.dim}${line}${c.reset}`);
  }
  console.log(`  ${c.cyan}└─${c.reset}`);
}

function success(msg) {
  console.log(`\n  ${c.green}${c.bold}[OK]${c.reset} ${msg}`);
}

function info(msg) {
  console.log(`  ${c.blue}[i]${c.reset} ${msg}`);
}

function warn(msg) {
  console.log(`  ${c.yellow}[!]${c.reset} ${msg}`);
}

// ---------------------------------------------------------------------------
// Prompt helpers (all support 'q' to quit)
// ---------------------------------------------------------------------------

async function ask(prompt, defaultVal) {
  const suffix = defaultVal !== undefined ? ` ${c.dim}[${defaultVal}]${c.reset}` : "";
  const raw = await rl.question(`  ${c.white}${prompt}${c.reset}${suffix}${c.bold}${c.white}: ${c.reset}`);
  const answer = raw.trim();
  checkQuit(answer);
  return answer || defaultVal || "";
}

async function choose(prompt, options) {
  console.log(`\n  ${c.bold}${prompt}${c.reset}\n`);
  for (let i = 0; i < options.length; i++) {
    const o = options[i];
    const label = typeof o === "string" ? o : o.label;
    const desc = typeof o === "object" && o.desc ? o.desc : null;
    const num = `${c.cyan}${c.bold}${String(i + 1).padStart(2)}${c.reset}`;
    console.log(`    ${num}${c.dim})${c.reset} ${label}`);
    if (desc) {
      console.log(`        ${c.dim}${desc}${c.reset}`);
    }
  }
  console.log();
  while (true) {
    const raw = await rl.question(`  ${c.white}Choose${c.reset} ${c.dim}[1-${options.length}]${c.reset}${c.bold}${c.white}: ${c.reset}`);
    const answer = raw.trim();
    checkQuit(answer);
    const idx = parseInt(answer, 10) - 1;
    if (idx >= 0 && idx < options.length) {
      const o = options[idx];
      const selected = typeof o === "string" ? o : o.label;
      console.log(`  ${c.dim}  → ${selected}${c.reset}`);
      return typeof o === "string" ? o : o.value;
    }
    console.log(`  ${c.red}Invalid choice.${c.reset} Enter a number between 1 and ${options.length}.`);
  }
}

async function chooseMultiple(prompt, options) {
  console.log(`\n  ${c.bold}${prompt}${c.reset}\n`);
  for (let i = 0; i < options.length; i++) {
    const o = options[i];
    const label = typeof o === "string" ? o : o.label;
    const desc = typeof o === "object" && o.desc ? o.desc : null;
    const num = `${c.cyan}${c.bold}${String(i + 1).padStart(2)}${c.reset}`;
    console.log(`    ${num}${c.dim})${c.reset} ${label}`);
    if (desc) {
      console.log(`        ${c.dim}${desc}${c.reset}`);
    }
  }
  console.log();
  while (true) {
    const raw = await rl.question(`  ${c.white}Choose${c.reset} ${c.dim}[comma-separated, e.g. 1,3,5]${c.reset}${c.bold}${c.white}: ${c.reset}`);
    checkQuit(raw.trim());
    const indices = raw.split(",").map((s) => parseInt(s.trim(), 10) - 1);
    if (indices.length > 0 && indices.every((i) => i >= 0 && i < options.length)) {
      const selected = indices.map((i) => {
        const o = options[i];
        return typeof o === "string" ? o : o.label;
      });
      console.log(`  ${c.dim}  → ${selected.join(", ")}${c.reset}`);
      return indices.map((i) => {
        const o = options[i];
        return typeof o === "string" ? o : (o.value ?? o.label);
      });
    }
    console.log(`  ${c.red}Invalid selection.${c.reset} Use comma-separated numbers (1-${options.length}).`);
  }
}

async function confirm(prompt) {
  const raw = await rl.question(`  ${c.white}${prompt}${c.reset} ${c.dim}[Y/n/q]${c.reset}${c.bold}${c.white}: ${c.reset}`);
  const answer = raw.trim().toLowerCase();
  checkQuit(answer);
  return answer !== "n" && answer !== "no";
}

// ---------------------------------------------------------------------------
// Decision Tree — Root
// ---------------------------------------------------------------------------

async function main() {
  banner();

  console.log(`  ${c.dim}Answer the questions below to classify your item`);
  console.log(`  and register it in the correct namespace.${c.reset}`);
  hint();

  define("What goes where?", [
    "Entity Code  = a TYPE of database record that needs a public ID (CC-PID).",
    '               Ask: "Does this represent a new kind of row in the DB?"',
    "Module       = a reusable SOFTWARE COMPONENT shared across products.",
    '               Ask: "Is this a building block I will import/depend on?"',
    "Product      = a DELIVERABLE with its own roadmap, users, and lifecycle.",
    '               Ask: "Does this ship to users or run as a platform?"',
    "Project      = a TIME-BOUND body of work (engagement, sprint container).",
    '               Ask: "Is this a specific piece of work with a start/end?"',
    "Standard     = a GOVERNANCE DOCUMENT (standard, policy, plan, template, framework).",
    '               Ask: "Is this a normative or governance document for the organization?"',
  ]);

  const type = await choose("What are you registering?", [
    { label: "Entity Code", desc: "New DB entity type needing a CC-PID (e.g., 'Workspace', 'Report'). You already have 52.", value: "entity" },
    { label: "Module", desc: "Reusable architectural building block designed once, imported by many (e.g., 'Billing Engine').", value: "module" },
    { label: "Product", desc: "Customer-facing product OR internal platform with its own lifecycle (e.g., 'CYBERCUBE PM').", value: "product" },
    { label: "Project", desc: "A specific engagement or body of work, may be linked to a product (e.g., 'Portal Redesign Q1').", value: "project" },
    { label: "Standard", desc: "Governance document: standard, policy, plan, template, or framework definition.", value: "standard" },
  ]);

  hr();

  switch (type) {
    case "entity": await registerEntityCode(); break;
    case "module": await registerModule(); break;
    case "product": await registerProduct(); break;
    case "project": await registerProject(); break;
    case "standard": await registerStandard(); break;
  }
}

// ---------------------------------------------------------------------------
// Entity Code Flow
// ---------------------------------------------------------------------------

async function registerEntityCode() {
  const totalSteps = 5;

  step(1, totalSteps, "Review existing codes");

  define("Entity Code (Namespace B)", [
    "A 3-letter code that becomes the PREFIX of every public ID for this entity type.",
    "Format: <CODE>-<TOKEN>-<CHK>  (e.g., PRJ-X2M8KD-F)",
    "",
    "Create one when: a new kind of database record needs to be referenced",
    "  externally (in URLs, emails, exports, webhooks, PDFs).",
    "Do NOT create one for: internal-only tables, join tables, or config rows",
    "  that are never shown to users.",
  ]);

  const existing = loadJson("entity-codes.json");
  const existingCodes = new Set(existing.map((e) => e.code));

  console.log(`\n  ${c.bold}Existing codes by category:${c.reset}\n`);
  const byCategory = {};
  for (const e of existing) {
    if (!byCategory[e.category]) byCategory[e.category] = [];
    byCategory[e.category].push(`${c.cyan}${e.code}${c.reset} ${c.dim}(${e.name})${c.reset}`);
  }
  for (const [cat, codes] of Object.entries(byCategory)) {
    console.log(`    ${c.bold}${cat}:${c.reset} ${codes.join(", ")}`);
  }

  hr();

  const covered = await confirm("Does an existing code already cover your entity?");
  if (covered) {
    info("No new code needed. Use the existing entity code.");
    info("To create a record ID: PublicIdService.generate('<CODE>')");
    return;
  }

  step(2, totalSteps, "Define the new code");

  let code;
  while (true) {
    code = (await ask("3-letter entity code (uppercase)")).toUpperCase();
    if (!/^[A-Z]{3}$/.test(code)) { warn("Must be exactly 3 uppercase letters."); continue; }
    if (existingCodes.has(code)) { warn(`'${code}' already exists (${existing.find((e) => e.code === code).name}). Choose another.`); continue; }
    break;
  }

  const name = await ask("Human-readable entity name (e.g., 'Invoice', 'Workspace')");

  step(3, totalSteps, "Categorize");

  define("Category", [
    "Which functional area does this entity belong to?",
    "",
    "Customer & Org      = clients, accounts, users, contacts, addresses",
    "Support & Comms     = tickets, notifications, messages, comments",
    "Project Mgmt        = projects, boards, tasks, sprints, milestones, deliverables",
    "Billing & Finance   = invoices, payments, subscriptions, plans, transactions",
    "Content & Docs      = documents, pages, files, folders, templates, forms, tags",
    "System & Integration = sessions, tokens, API keys, audit events, jobs, webhooks",
    "Access Control      = roles, permissions, policies",
  ]);

  const category = await choose("Category:", [
    { label: "Customer & Org", desc: "Entities representing people, organizations, and their details.", value: "Customer & Org" },
    { label: "Support & Comms", desc: "Entities for communication and support interactions.", value: "Support & Comms" },
    { label: "Project Mgmt", desc: "Entities for organizing and tracking work.", value: "Project Mgmt" },
    { label: "Billing & Finance", desc: "Entities for money, pricing, and financial transactions.", value: "Billing & Finance" },
    { label: "Content & Docs", desc: "Entities for files, documents, and structured content.", value: "Content & Docs" },
    { label: "System & Integration", desc: "Entities for system internals exposed externally (sessions, jobs, webhooks).", value: "System & Integration" },
    { label: "Access Control", desc: "Entities for authorization: roles, permissions, policies.", value: "Access Control" },
  ]);

  step(4, totalSteps, "Details");

  const description = await ask("One-sentence description (what does this entity identify?)");

  let dbTable;
  while (true) {
    dbTable = await ask("Database table name (snake_case, plural, e.g., 'workspaces')");
    if (/^[a-z][a-z0-9_]*$/.test(dbTable)) break;
    warn("Must be lowercase snake_case starting with a letter.");
  }

  step(5, totalSteps, "Confirm & save");

  const entry = { code, name, category, description, dbTable, status: "ACTIVE", ccpidStatus: "PENDING", createdAt: today() };

  hr();
  console.log(`  ${c.bold}New entity code entry:${c.reset}\n`);
  prettyJson(entry);

  if (!(await confirm("Add to entity-codes.json?"))) {
    warn("Cancelled. Nothing was saved.");
    return;
  }

  existing.push(entry);
  saveJson("entity-codes.json", existing);
  success(`Added ${c.cyan}${code}${c.reset} to entity-codes.json`);

  await runPipeline();

  hr();
  warn("REMINDER: Also update api/shared/entity-codes.ts with the new code.");
}

// ---------------------------------------------------------------------------
// Module Flow
// ---------------------------------------------------------------------------

async function registerModule() {
  const totalSteps = 6;

  step(1, totalSteps, "Name & slug");

  define("Module (Namespace G/M)", [
    "A module is a REUSABLE ARCHITECTURAL BUILDING BLOCK — a self-contained",
    "package of code designed once and imported by one or more products.",
    "",
    "It has: an immutable ID (MOD-NNN), an immutable slug, a barrel export (index.ts),",
    "  its own directory (modules/{slug}/), and clear boundaries (no circular deps).",
    "",
    "Create one when: you are building a standalone capability that will be",
    "  imported by multiple products or could be in the future.",
    "Do NOT create one for: product-specific features, one-off scripts,",
    "  or code that only lives inside a single product.",
  ]);

  const existing = loadJson("modules.json");
  const existingSlugs = new Set(existing.map((m) => m.slug));
  const nextNum = existing.length + 1;
  const nextId = `MOD-${String(nextNum).padStart(3, "0")}`;

  info(`Next available ID: ${c.cyan}${c.bold}${nextId}${c.reset}`);
  info(`Currently registered: ${existing.length} modules`);
  console.log();

  const name = await ask("Module name (e.g., 'Search Module', 'Billing Engine')");

  let slug;
  while (true) {
    const suggested = name.toLowerCase().replace(/\s+module$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    slug = await ask("Slug (kebab-case, immutable forever once assigned)", suggested);
    if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(slug)) { warn("Must be kebab-case (lowercase, hyphens, starts with letter)."); continue; }
    if (existingSlugs.has(slug)) { warn(`'${slug}' already exists. Choose another.`); continue; }
    break;
  }

  step(2, totalSteps, "Scope");

  define("Scope", [
    "What LAYER of the system does this module operate in?",
    "",
    "Platform      = Horizontal infrastructure used by everything. Not business-specific.",
    '                Test: "Would this exist even if we had zero business features?"',
    "Core          = Foundational capabilities most features depend on. Cross-cutting.",
    '                Test: "Is this a security/identity/data primitive?"',
    "Domain        = Business-domain-specific logic. Tied to a particular problem space.",
    '                Test: "Does this implement business rules for a specific domain?"',
    "Integration   = Connects to EXTERNAL systems. Adapters and connectors.",
    '                Test: "Does this primarily talk to a third-party service?"',
    "UI            = Frontend components, pages, layouts. Visual building blocks.",
    '                Test: "Is this rendered in the browser?"',
    "Governance    = Supports organizational processes, policies, and compliance.",
    '                Test: "Does this enforce or track an organizational process?"',
    "Experimental  = Proof-of-concept. Not yet proven. API will change.",
    '                Test: "Would I be uncomfortable if production depended on this?"',
  ]);

  const scope = await choose("Scope:", [
    { label: "Platform", desc: "Horizontal infra (logging, metrics, flags). Exists even without business features.", value: "Platform" },
    { label: "Core", desc: "Foundational primitives (auth, crypto, validation). Most features depend on these.", value: "Core" },
    { label: "Domain", desc: "Business-specific logic (billing, notifications). Tied to a problem space.", value: "Domain" },
    { label: "Integration", desc: "External system connectors (email, webhooks, payment gateways).", value: "Integration" },
    { label: "UI", desc: "Frontend components rendered in the browser (design system, widgets).", value: "UI" },
    { label: "Governance", desc: "Organizational process support (audit, change mgmt, incident mgmt).", value: "Governance" },
    { label: "Experimental", desc: "Proof-of-concept. Not production-proven. API will change.", value: "Experimental" },
  ]);

  step(3, totalSteps, "Reusability");

  define("Reusability", [
    "How WIDELY will this module be shared?",
    "",
    "Global    = Used (or designed to be used) by ALL products. Product-agnostic.",
    "Portfolio = Shared within a SUBSET of products (a product group), not all.",
    "Product   = Built for and used by a SINGLE product only (today).",
  ]);

  const reusability = await choose("Reusability:", [
    { label: "Global", desc: "Product-agnostic. Any product can depend on it.", value: "Global" },
    { label: "Portfolio", desc: "Shared within a product group, not all products.", value: "Portfolio" },
    { label: "Product", desc: "Used by a single product only (today).", value: "Product" },
  ]);

  step(4, totalSteps, "Stability");

  define("Stability (Lifecycle Stage)", [
    "How MATURE is this module?",
    "",
    "Experimental = API WILL change. Not safe for production. May be abandoned.",
    "Beta         = Feature-complete, mostly stable. Internal use OK. Migration possible.",
    "Stable       = Production-ready. API frozen. Breaking changes = major version.",
  ]);

  const stability = await choose("Stability:", [
    { label: "Experimental", desc: "API will change. Not safe for production. May be abandoned.", value: "Experimental" },
    { label: "Beta", desc: "Feature-complete, mostly stable API. Internal use OK.", value: "Beta" },
    { label: "Stable", desc: "Production-ready. API frozen. Breaking changes need major version.", value: "Stable" },
  ]);

  step(5, totalSteps, "Ownership & dependencies");

  const owner = await ask("Owner (which team maintains this?)", "Engineering");
  const sourceStandard = await ask("Source CYBERCUBE standard this implements (e.g., '2.3', '5.2', or empty)", "");

  let dependencies = [];
  if (existing.length > 0) {
    const wantDeps = await confirm("Does this module import from other registered modules?");
    if (wantDeps) {
      console.log(`\n  ${c.bold}Available modules:${c.reset}\n`);
      for (const m of existing) {
        console.log(`    ${c.cyan}${m.id}${c.reset} — ${m.name} ${c.dim}[${m.slug}] (${m.scope}, ${m.stability})${c.reset}`);
      }
      const depInput = await ask("\nDependency IDs (comma-separated, e.g., MOD-001,MOD-005)");
      if (depInput) { dependencies = depInput.split(",").map((s) => s.trim()).filter(Boolean); }
    }
  }

  step(6, totalSteps, "Confirm & save");

  const entry = { id: nextId, slug, name, scope, reusability, stability, owner, sourceStandard, dependencies, usedByProducts: [], createdAt: today() };

  hr();
  console.log(`  ${c.bold}New module entry:${c.reset}\n`);
  prettyJson(entry);

  if (!(await confirm("Add to modules.json?"))) {
    warn("Cancelled. Nothing was saved.");
    return;
  }

  existing.push(entry);
  saveJson("modules.json", existing);
  success(`Added ${c.cyan}${nextId}${c.reset} (${slug}) to modules.json`);

  await runPipeline();
}

// ---------------------------------------------------------------------------
// Product Flow — PCL Data
// ---------------------------------------------------------------------------

const PCL_LAYERS = [
  { value: "0", label: "0 — Data", desc: "Pure data layer (databases, data stores, data APIs). No application logic." },
  { value: "1", label: "1 — Application", desc: "End-user application (web app, mobile app, CLI). Has UI or user interaction." },
  { value: "2", label: "2 — Platform", desc: "Shared platform layer (API gateway, auth service). Other apps build on top of it." },
  { value: "3", label: "3 — App + Platform", desc: "Both an end-user app AND a platform that other apps consume." },
  { value: "4", label: "4 — Infrastructure", desc: "Infrastructure tooling (CI/CD, IaC, monitoring). Supports ops, not end users." },
  { value: "5", label: "5 — App + Infra", desc: "Application with significant infrastructure components." },
  { value: "6", label: "6 — Platform + Infra", desc: "Platform with infrastructure components (e.g., PaaS with built-in monitoring)." },
  { value: "7", label: "7 — Full Stack", desc: "Spans all layers: data + app + platform + infra. Complete vertical solution." },
  { value: "8", label: "8 — Embedded", desc: "Runs on hardware/firmware (IoT, embedded systems). Resource-constrained." },
  { value: "9", label: "9 — Other", desc: "None of the above. REQUIRES written rationale in the product record." },
];

const PCL_DELIVERY = [
  { value: "0", label: "0 — Library", desc: "Distributed as a package/dependency (npm, pip, gem). No runtime." },
  { value: "1", label: "1 — SaaS", desc: "Cloud-hosted, accessed via browser. We operate it. Multi-tenant." },
  { value: "2", label: "2 — On-Prem", desc: "Installed in the customer's environment. Customer operates it." },
  { value: "3", label: "3 — Hybrid", desc: "Mix of cloud + on-prem components. Both parties operate parts." },
  { value: "4", label: "4 — Managed Service", desc: "We host and operate it FOR a specific customer. Dedicated." },
  { value: "5", label: "5 — Embedded", desc: "Ships inside another product or hardware. Not independently installable." },
  { value: "6", label: "6 — Desktop", desc: "Installable desktop application (macOS, Windows, Linux)." },
  { value: "7", label: "7 — Mobile", desc: "Mobile application (iOS, Android, or cross-platform)." },
  { value: "9", label: "9 — Other", desc: "None of the above. REQUIRES written rationale in the product record." },
];

const PCL_EXTENSIBILITY = [
  { value: "0", label: "0 — None", desc: "Closed system. No programmatic extension points." },
  { value: "1", label: "1 — API", desc: "Exposes a REST/GraphQL/gRPC API for external consumption." },
  { value: "2", label: "2 — Webhooks", desc: "Sends event notifications to external URLs (outbound only)." },
  { value: "3", label: "3 — API + Webhooks", desc: "Both inbound API and outbound webhook notifications." },
  { value: "4", label: "4 — Plugins", desc: "Supports loadable plugins/extensions that run inside the product." },
  { value: "5", label: "5 — SDK", desc: "Provides a client SDK for programmatic integration." },
  { value: "6", label: "6 — API + Plugins", desc: "External API plus an internal plugin system." },
  { value: "7", label: "7 — API + Webhooks + Plugins", desc: "All three: API, webhooks, and plugins." },
  { value: "8", label: "8 — Open Source", desc: "Source code available. Community can fork/extend/contribute." },
  { value: "9", label: "9 — Other", desc: "None of the above. REQUIRES written rationale in the product record." },
];

const PCL_CRITICALITY = [
  { value: "0", label: "0 — Low", desc: "Internal tool or experiment. Failure has minimal impact. Team lead approval." },
  { value: "1", label: "1 — Medium", desc: "Production but not revenue-critical. Needs arch review + security checklist." },
  { value: "2", label: "2 — High", desc: "Revenue-critical or customer-facing. Downtime = business impact. Formal reviews + SLA." },
  { value: "3", label: "3 — Regulated", desc: "GDPR/HIPAA/SOC 2. All of High + compliance verification + audit trail + legal." },
  { value: "4", label: "4 — Safety-Critical", desc: "Harm to people/systems possible. All of Regulated + CTO sign-off + external audit." },
  { value: "9", label: "9 — Other", desc: "None of the above. REQUIRES written rationale in the product record." },
];

const DOMAIN_TAGS = [
  { label: "Analytics", desc: "Data analysis, dashboards, reporting, BI.", value: "Analytics" },
  { label: "Collaboration", desc: "Team coordination, shared workspaces, co-editing.", value: "Collaboration" },
  { label: "Commerce", desc: "Buying/selling, catalogs, carts, orders.", value: "Commerce" },
  { label: "Communication", desc: "Messaging, email, video, chat, notifications.", value: "Communication" },
  { label: "Compliance", desc: "Regulatory adherence, audit trails, policy.", value: "Compliance" },
  { label: "Data Management", desc: "Data storage, ETL, quality, master data.", value: "Data Management" },
  { label: "Developer Tools", desc: "IDEs, SDKs, CLIs, build tools, DX.", value: "Developer Tools" },
  { label: "Education", desc: "Learning, training, courses, certs.", value: "Education" },
  { label: "Finance", desc: "Invoicing, payments, accounting.", value: "Finance" },
  { label: "Healthcare", desc: "Patient records, clinical workflows.", value: "Healthcare" },
  { label: "Identity/Auth", desc: "User identity, authentication, SSO, MFA.", value: "Identity/Auth" },
  { label: "Infrastructure", desc: "Servers, networking, cloud, IaC.", value: "Infrastructure" },
  { label: "Marketing", desc: "Campaigns, content marketing, CRM.", value: "Marketing" },
  { label: "Operations", desc: "Business ops, logistics, process mgmt.", value: "Operations" },
  { label: "Productivity", desc: "Task mgmt, calendars, note-taking.", value: "Productivity" },
  { label: "Project Management", desc: "Planning, tracking, boards, milestones.", value: "Project Management" },
  { label: "Security", desc: "Threat detection, vuln mgmt, encryption.", value: "Security" },
  { label: "Other", desc: "Does not fit above. REQUIRES justification.", value: "Other" },
];

// ---------------------------------------------------------------------------
// Product Flow
// ---------------------------------------------------------------------------

async function registerProduct() {
  const totalSteps = 7;

  step(1, totalSteps, "Product identity");

  define("Product (Namespace G — PRD-XXX)", [
    "A product is a DELIVERABLE — something that ships to users or runs as a platform.",
    "It has its own roadmap, lifecycle (Active > Sunset > Deprecated > Archived),",
    "and identity (PRD-XXX).",
    "",
    "Create one when: building something deployed, maintained, and used standalone.",
    "Do NOT create one for: a reusable module, a one-off script, or a body of work.",
  ]);

  const existing = loadJson("products.json");
  const nextNum = existing.length + 1;
  const nextId = `PRD-${String(nextNum).padStart(3, "0")}`;

  info(`Next available ID: ${c.cyan}${c.bold}${nextId}${c.reset}`);
  info(`Currently registered: ${existing.length} products`);
  console.log();

  const name = await ask("Product name");

  step(2, totalSteps, "PCL — Layer");
  define("PCL — Layer (L)", [
    "What ARCHITECTURAL LAYERS does this product span?",
    "Think: database? app UI? platform API? infra tooling? Which combo?",
  ]);
  const layer = await choose("Layer:", PCL_LAYERS);

  step(3, totalSteps, "PCL — Delivery");
  define("PCL — Delivery (D)", [
    "How do USERS ACCESS or RECEIVE this product?",
    "Think: do we host it? do they install it? is it a library they import?",
  ]);
  const delivery = await choose("Delivery:", PCL_DELIVERY);

  step(4, totalSteps, "PCL — Extensibility");
  define("PCL — Extensibility (E)", [
    "How can EXTERNAL PARTIES extend or integrate with this product?",
    "Think: APIs, webhooks, plugins, SDKs, open source?",
  ]);
  const extensibility = await choose("Extensibility:", PCL_EXTENSIBILITY);

  step(5, totalSteps, "PCL — Criticality");
  define("PCL — Criticality (C)", [
    "What GOVERNANCE LEVEL does this product require?",
    "Choose based on: business impact of failure + regulatory exposure.",
  ]);
  const criticality = await choose("Criticality:", PCL_CRITICALITY);

  const pcl = `PCL-${layer}.${delivery}.${extensibility}.${criticality}`;

  hr();
  console.log(`  ${c.bold}Computed PCL:${c.reset} ${c.cyan}${c.bold}${pcl}${c.reset}\n`);

  const critNum = parseInt(criticality, 10);
  if (critNum >= 1) {
    console.log(`  ${c.yellow}${c.bold}Governance requirements triggered:${c.reset}\n`);
    if (critNum >= 1) console.log(`    ${c.yellow}*${c.reset} Architecture review REQUIRED`);
    if (critNum >= 1) console.log(`    ${c.yellow}*${c.reset} Security checklist REQUIRED`);
    if (critNum >= 2) console.log(`    ${c.yellow}*${c.reset} Formal security review REQUIRED (per 2.1)`);
    if (critNum >= 2) console.log(`    ${c.yellow}*${c.reset} SLA definition REQUIRED (per 4.6)`);
    if (critNum >= 3) console.log(`    ${c.yellow}*${c.reset} Compliance verification REQUIRED`);
    if (critNum >= 3) console.log(`    ${c.yellow}*${c.reset} Audit trail REQUIRED`);
    if (critNum >= 3) console.log(`    ${c.yellow}*${c.reset} Legal review REQUIRED`);
    if (critNum >= 4) console.log(`    ${c.red}*${c.reset} CTO sign-off REQUIRED`);
    if (critNum >= 4) console.log(`    ${c.red}*${c.reset} External audit REQUIRED`);
    if (critNum >= 4) console.log(`    ${c.red}*${c.reset} Incident simulation REQUIRED`);
  }

  step(6, totalSteps, "Domain tags & descriptors");
  define("Domain Tags", [
    "Which business domains does this product serve?",
    "Select ALL that apply (at least one). Used for portfolio visibility.",
  ]);
  const domainTags = await chooseMultiple("Domain tags:", DOMAIN_TAGS);

  const descriptors = await ask("Function descriptors (comma-separated keywords, e.g., 'task tracking, boards')", "");
  const functionDescriptors = descriptors ? descriptors.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const owner = await ask("Owner (which team owns this product?)", "Engineering");

  step(7, totalSteps, "Confirm & save");

  const entry = { id: nextId, name, pcl, domainTags, functionDescriptors, owner, status: "Active", createdAt: today() };

  hr();
  console.log(`  ${c.bold}New product entry:${c.reset}\n`);
  prettyJson(entry);

  if (!(await confirm("Add to products.json?"))) {
    warn("Cancelled. Nothing was saved.");
    return;
  }

  existing.push(entry);
  saveJson("products.json", existing);
  success(`Added ${c.cyan}${nextId}${c.reset} (${name}) to products.json`);

  await runPipeline();
}

// ---------------------------------------------------------------------------
// Project Flow — Domain Data
// ---------------------------------------------------------------------------

const DOMAIN_PARENTS = [
  { value: "WA", label: "WA — Web Apps", desc: "Browser-based (SaaS, portals, e-commerce, CMS)." },
  { value: "MA", label: "MA — Mobile Apps", desc: "iOS, Android, cross-platform, or PWA." },
  { value: "DA", label: "DA — Desktop Apps", desc: "Installable apps for macOS, Windows, or Linux." },
  { value: "CS", label: "CS — Custom Software", desc: "Bespoke internal tools, ERP/CRM, suites." },
  { value: "AP", label: "AP — API & Backend", desc: "REST, GraphQL, microservices, real-time APIs." },
  { value: "A1", label: "A1 — AI & ML", desc: "AI assistants, predictive models, NLP/CV/RAG." },
  { value: "DT", label: "DT — Data & Analytics", desc: "BI, ETL pipelines, data warehouses, reporting." },
  { value: "DC", label: "DC — DevOps & Cloud", desc: "CI/CD, cloud migration, IaC, monitoring." },
  { value: "SC", label: "SC — Security & Compliance", desc: "Auth, encryption, pen testing, compliance." },
  { value: "I1", label: "I1 — Embedded / IoT", desc: "Firmware, device sync, sensors, RTOS." },
  { value: "GM", label: "GM — Games & Interactive", desc: "2D/3D games, simulations, VR/AR." },
  { value: "BC", label: "BC — Blockchain / Web3", desc: "Smart contracts, NFTs, wallets, DeFi." },
  { value: "RP", label: "RP — Automation / RPA", desc: "Bots, RPA workflows, no-code automation." },
  { value: "IN", label: "IN — System Integrations", desc: "ERP, payment, API bridge, legacy connectors." },
  { value: "MN", label: "MN — Maintenance / Support", desc: "Bug fixing, updates, optimization, config." },
  { value: "CM", label: "CM — Communication", desc: "Chat, email, video conferencing, collaboration." },
  { value: "QA", label: "QA — Testing / QA", desc: "Automated/perf/manual testing, monitoring." },
];

const SUBTYPES = {
  WA: [
    { value: "SS", label: "SS — SaaS", desc: "Multi-user, subscription-based, cloud-hosted, multi-tenant." },
    { value: "PO", label: "PO — Portals", desc: "User-specific views, role-based dashboards, aggregated data." },
    { value: "EC", label: "EC — E-Commerce", desc: "Product catalog, shopping cart, checkout, payment gateway." },
    { value: "CM", label: "CM — Content Management", desc: "Content authoring, versioning, publishing, media library." },
  ],
  MA: [
    { value: "IO", label: "IO — iOS Native", desc: "Native iOS SDK. App Store distribution." },
    { value: "AD", label: "AD — Android Native", desc: "Native Android SDK. Google Play distribution." },
    { value: "XP", label: "XP — Cross-Platform", desc: "Single codebase (Flutter, React Native). iOS + Android." },
    { value: "PW", label: "PW — PWA", desc: "Installable web app with offline support." },
  ],
  DA: [
    { value: "MC", label: "MC — macOS", desc: "Native macOS application." },
    { value: "WN", label: "WN — Windows", desc: "Native Windows application (.exe/.msi)." },
    { value: "LX", label: "LX — Linux", desc: "Linux-native (deb, rpm, AppImage, Flatpak)." },
    { value: "XP", label: "XP — Cross-Platform", desc: "Single codebase (Electron, Tauri, Qt)." },
  ],
  CS: [
    { value: "WF", label: "WF — Custom Workflow", desc: "Business-specific process automation." },
    { value: "ER", label: "ER — ERP/CRM Systems", desc: "Enterprise resource planning or CRM." },
    { value: "IT", label: "IT — Internal Tools", desc: "Organization-specific, internal users only." },
    { value: "ST", label: "ST — Suites", desc: "Multiple integrated apps with shared auth/data." },
  ],
  AP: [
    { value: "RS", label: "RS — REST API", desc: "RESTful endpoints, resource-based URLs." },
    { value: "GQ", label: "GQ — GraphQL", desc: "GraphQL schema with queries and mutations." },
    { value: "MS", label: "MS — Microservices", desc: "Independently deployable, domain-driven." },
    { value: "RT", label: "RT — Real-Time API", desc: "WebSockets, SSE, persistent connections." },
    { value: "BE", label: "BE — Backend Services", desc: "Background processing, scheduled jobs." },
  ],
  A1: [
    { value: "AS", label: "AS — AI Assistants", desc: "Conversational AI, LLM/NLP-powered." },
    { value: "PD", label: "PD — Predictive", desc: "Forecasting models on historical data." },
    { value: "RC", label: "RC — Recommender", desc: "Personalized suggestions." },
    { value: "NL", label: "NL — NLP/CV/RAG", desc: "NLP, computer vision, or retrieval-augmented." },
  ],
  DT: [
    { value: "BI", label: "BI — Business Intelligence", desc: "KPI dashboards, trend analysis." },
    { value: "ET", label: "ET — ETL Pipelines", desc: "Extract, transform, load between systems." },
    { value: "DW", label: "DW — Data Warehouse", desc: "Centralized analytical repository." },
    { value: "RP", label: "RP — Reporting", desc: "Operational reports, scheduled delivery." },
  ],
  DC: [
    { value: "CD", label: "CD — CI/CD", desc: "Automated build, test, deploy pipelines." },
    { value: "MG", label: "MG — Cloud Migration", desc: "Moving workloads to/between clouds." },
    { value: "IA", label: "IA — IaC", desc: "Terraform, Pulumi, CloudFormation." },
    { value: "MN", label: "MN — Monitoring", desc: "Logging, alerting, observability." },
  ],
  SC: [
    { value: "AU", label: "AU — Auth / Identity", desc: "SSO, OAuth2, JWT, identity mgmt." },
    { value: "KM", label: "KM — Encryption / KMS", desc: "Key management, encryption, secrets." },
    { value: "PT", label: "PT — Pen Testing", desc: "Vulnerability scanning, threat modeling." },
    { value: "CM", label: "CM — Compliance", desc: "Regulatory auditing, policy enforcement." },
  ],
  I1: [
    { value: "FW", label: "FW — Firmware", desc: "Hardware-level logic, microcontrollers." },
    { value: "SY", label: "SY — Sync", desc: "Cloud-to-device synchronization." },
    { value: "SN", label: "SN — Sensors", desc: "Sensor data, real-time readings." },
    { value: "RT", label: "RT — RTOS", desc: "Real-time OS constraints." },
  ],
  GM: [
    { value: "2D", label: "2D — 2D Games", desc: "Sprites, vector graphics, 2D physics." },
    { value: "3D", label: "3D — 3D Games", desc: "3D models, shaders, spatial audio." },
    { value: "SM", label: "SM — Simulation", desc: "System modeling, simulation logic." },
    { value: "VR", label: "VR — VR/AR", desc: "Immersive virtual/augmented reality." },
  ],
  BC: [
    { value: "SC", label: "SC — Smart Contracts", desc: "On-chain logic, contract deployment." },
    { value: "NF", label: "NF — NFT", desc: "Token minting, metadata, marketplace." },
    { value: "WL", label: "WL — Wallet", desc: "Key management, transaction signing." },
    { value: "DF", label: "DF — DeFi", desc: "Decentralized finance, liquidity pools." },
  ],
  RP: [
    { value: "BT", label: "BT — Bots", desc: "Automated agents performing tasks." },
    { value: "WF", label: "WF — RPA Workflow", desc: "Trigger-based sequences, UI scraping." },
    { value: "NC", label: "NC — No-code Automation", desc: "Visual drag-and-drop workflow builder." },
  ],
  IN: [
    { value: "ER", label: "ER — ERP/CRM Integration", desc: "Enterprise system connectors, bidirectional sync." },
    { value: "PM", label: "PM — Payment Integration", desc: "Payment gateway, secure transactions." },
    { value: "BR", label: "BR — API Bridge", desc: "Middleware, data transformation, routing." },
    { value: "LG", label: "LG — Legacy Integration", desc: "Legacy connectors, modernization bridge." },
  ],
  MN: [
    { value: "BG", label: "BG — Bug Fixing", desc: "Defect resolution, hotfixes." },
    { value: "UP", label: "UP — Updates", desc: "Enhancements, dependency/security patches." },
    { value: "OP", label: "OP — Optimization", desc: "Performance, refactoring, query tuning." },
    { value: "TN", label: "TN — Configuration", desc: "System tuning, environment config." },
  ],
  CM: [
    { value: "CH", label: "CH — Chat / Messaging", desc: "Real-time messaging, presence." },
    { value: "EM", label: "EM — Email Systems", desc: "Email composition, inbox, threading." },
    { value: "VC", label: "VC — Video Conferencing", desc: "Video/audio, screen sharing, recording." },
    { value: "CL", label: "CL — Collaboration", desc: "Shared workspaces, co-editing, feeds." },
  ],
  QA: [
    { value: "AT", label: "AT — Automated Testing", desc: "Test automation, CI integration." },
    { value: "PT", label: "PT — Performance Testing", desc: "Load/stress testing, scalability." },
    { value: "MT", label: "MT — Manual Testing", desc: "Test case docs, defect lifecycle." },
    { value: "MN", label: "MN — Monitoring", desc: "App health, error tracking, SLAs." },
  ],
};

// ---------------------------------------------------------------------------
// Project Flow
// ---------------------------------------------------------------------------

async function registerProject() {
  const totalSteps = 6;

  step(1, totalSteps, "Project identity");

  define("Project (PRJ CC-PID)", [
    "A project is a TIME-BOUND BODY OF WORK — a specific engagement, initiative,",
    "or sprint container that produces deliverables.",
    "",
    "Create one when: starting work that needs tracking, has a timeline,",
    "  and will produce artifacts (code, docs, deployments).",
    "Do NOT create one for: a reusable building block (Module) or a",
    "  product with its own lifecycle (Product).",
  ]);

  const existing = loadJson("projects.json");
  const products = loadJson("products.json");

  info(`Currently registered: ${existing.length} projects`);
  console.log();

  const name = await ask("Project name");

  let productId = null;
  if (products.length > 0) {
    define("Product Link", [
      "If this project builds features FOR a registered product, link it.",
      "If standalone (one-off client work, internal tooling), leave unlinked.",
    ]);
    const linkProduct = await confirm("Is this project linked to a registered product?");
    if (linkProduct) {
      console.log(`\n  ${c.bold}Registered products:${c.reset}\n`);
      for (const p of products) {
        console.log(`    ${c.cyan}${p.id}${c.reset} — ${p.name} ${c.dim}(${p.pcl})${c.reset}`);
      }
      productId = await ask("\nProduct ID (e.g., PRD-001)");
    }
  }

  step(2, totalSteps, "Domain classification");

  define("Domain Code", [
    "Every project is classified by domain: PARENT-SUB (e.g., WA-SS, AP-RS).",
    "This determines: work type, WOE prefix in tracker, artifact naming pattern.",
    "Choose the domain that best describes the PRIMARY deliverable.",
  ]);

  const parent = await choose("Primary domain:", DOMAIN_PARENTS);
  const sub = await choose("Subtype:", SUBTYPES[parent]);
  const domainCode = `${parent}-${sub}`;
  success(`Domain code: ${c.cyan}${c.bold}${domainCode}${c.reset}`);

  step(3, totalSteps, "Governance classification");

  define("Governance Classification", [
    "One-off  = Single delivery. Not versioned for reuse. One engagement.",
    '           Example: "Build a landing page for Client X."',
    "Product  = Builds features for a product with its own roadmap.",
    '           Example: "Q1 sprint for CYBERCUBE PM board feature."',
    "RSM      = Builds a Reusable Standard Module (certified building block).",
    '           Example: "Build the Identity Module v1.0."',
  ]);

  const classification = await choose("Governance classification:", [
    { label: "One-off", desc: "Single delivery, not versioned. One engagement.", value: "One-off" },
    { label: "Product", desc: "Builds features for a product with its own roadmap.", value: "Product" },
    { label: "RSM", desc: "Builds a Reusable Standard Module (certified building block).", value: "RSM" },
  ]);

  step(4, totalSteps, "Tracker & WOE");

  const useWoeAsPrefix = await confirm(`Use '${domainCode}' as the WOE prefix in your tracker?`);
  const woePrefix = useWoeAsPrefix ? domainCode : await ask("WOE prefix (e.g., CS-ER)");

  const tracker = await choose("Issue tracker:", [
    { label: "GitHub", desc: "GitHub Issues or GitHub Projects.", value: "GitHub" },
    { label: "Jira", desc: "Atlassian Jira (cloud or server).", value: "Jira" },
    { label: "Linear", desc: "Linear issue tracker.", value: "Linear" },
  ]);

  step(5, totalSteps, "CC-PID");

  define("CC-PID Assignment", [
    "Format: PRJ-XXXXXX-X  (6-8 char token + 1 check digit)",
    "Token chars: A-H, J-N, P-Z, 2-9 (no I, O, 0, 1)",
    "",
    "Generate with: PublicIdService.generate('PRJ')",
    "If not available, ask your platform lead for a valid CC-PID.",
  ]);

  let ccpid;
  while (true) {
    ccpid = await ask("CC-PID (e.g., PRJ-X2M8KD-F)");
    if (/^PRJ-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$/.test(ccpid)) break;
    warn("Must match: PRJ-XXXXXX-X (6-8 chars + check). No I, O, 0, 1.");
  }

  if (existing.some((p) => p.ccpid === ccpid)) {
    warn(`${ccpid} already exists in projects.json. Aborting.`);
    return;
  }

  step(6, totalSteps, "Confirm & save");

  const entry = { ccpid, name, productId, domainCode, classification, woePrefix, tracker, status: "Active", createdAt: today() };

  hr();
  console.log(`  ${c.bold}New project entry:${c.reset}\n`);
  prettyJson(entry);

  if (!(await confirm("Add to projects.json?"))) {
    warn("Cancelled. Nothing was saved.");
    return;
  }

  existing.push(entry);
  saveJson("projects.json", existing);
  success(`Added ${c.cyan}${ccpid}${c.reset} (${name}) to projects.json`);

  await runPipeline();

  hr();
  info(`Your WOE items should use prefix: ${c.cyan}${c.bold}${woePrefix}${c.reset}`);
  info(`Example: ${woePrefix}-0001, ${woePrefix}-0002, ...`);
}

// ---------------------------------------------------------------------------
// Pretty JSON printer
// ---------------------------------------------------------------------------

function prettyJson(obj) {
  const lines = JSON.stringify(obj, null, 4).split("\n");
  for (const line of lines) {
    // Color keys cyan, strings green, rest dim
    const colored = line
      .replace(/"([^"]+)":/g, `${c.cyan}"$1"${c.reset}:`)
      .replace(/: "([^"]*)"/g, `: ${c.green}"$1"${c.reset}`)
      .replace(/: (\d+)/g, `: ${c.yellow}$1${c.reset}`)
      .replace(/: (true|false|null)/g, `: ${c.magenta}$1${c.reset}`);
    console.log(`    ${colored}`);
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Post-write pipeline
// ---------------------------------------------------------------------------

async function runPipeline() {
  hr();
  console.log(`  ${c.bold}Running validation...${c.reset}\n`);

  try {
    const validateOut = execSync("node " + JSON.stringify(resolve("validate-registry.mjs")), { encoding: "utf-8", cwd: __dirname });
    // Show just the result line
    const resultLine = validateOut.split("\n").find((l) => l.includes("Result:")) || "";
    const passed = validateOut.includes("VALIDATION PASSED");
    if (passed) {
      success("Validation passed" + (resultLine ? ` ${c.dim}(${resultLine.trim()})${c.reset}` : ""));
    } else {
      console.log(validateOut);
    }
  } catch (e) {
    console.error(`  ${c.red}${c.bold}VALIDATION FAILED${c.reset} — please fix errors manually.\n`);
    console.error(e.stdout || e.message);
    return;
  }

  console.log(`  ${c.bold}Rendering markdown...${c.reset}`);

  try {
    execSync("node " + JSON.stringify(resolve("render-registry.mjs")), { encoding: "utf-8", cwd: __dirname });
    success("Markdown rendered.");
  } catch (e) {
    console.error(`  ${c.red}RENDER FAILED:${c.reset}\n`);
    console.error(e.stdout || e.message);
    return;
  }

  hr();
  console.log(`  ${c.green}${c.bold}All done.${c.reset} Commit these files together:`);
  console.log(`  ${c.dim}  - The modified JSON registry file${c.reset}`);
  console.log(`  ${c.dim}  - CYBERCUBE-Name-Registry.md${c.reset}`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main()
  .catch((e) => {
    if (e instanceof UserExit) {
      console.log(`\n  ${c.yellow}${c.bold}Exited.${c.reset} Nothing was saved.\n`);
    } else {
      console.error(e);
    }
  })
  .finally(() => {
    rl.close();
  });
