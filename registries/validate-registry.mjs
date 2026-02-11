#!/usr/bin/env node

/**
 * CYBERCUBE Registry Validator
 *
 * Validates all registry JSON files against their schemas.
 * Zero external dependencies — runs with Node.js >= 18.
 *
 * Usage: node registries/validate-registry.mjs
 * Exit:  0 = valid, 1 = errors found
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resolve = (...parts) => join(__dirname, ...parts);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let errorCount = 0;
let warnCount = 0;

function error(file, msg) {
  console.error(`  ERROR [${file}]: ${msg}`);
  errorCount++;
}

function warn(file, msg) {
  console.warn(`  WARN  [${file}]: ${msg}`);
  warnCount++;
}

function loadJson(relPath) {
  const abs = resolve(relPath);
  try {
    const raw = readFileSync(abs, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    error(relPath, `Failed to parse JSON: ${e.message}`);
    return null;
  }
}

function matchesPattern(value, pattern) {
  return new RegExp(pattern).test(value);
}

function checkRequired(entry, fields, file, id) {
  for (const f of fields) {
    if (entry[f] === undefined || entry[f] === null) {
      error(file, `${id} missing required field '${f}'`);
    }
  }
}

function checkEnum(entry, field, allowed, file, id) {
  if (entry[field] !== undefined && !allowed.includes(entry[field])) {
    error(file, `${id} field '${field}' has invalid value '${entry[field]}'. Allowed: ${allowed.join(", ")}`);
  }
}

function checkPattern(entry, field, pattern, file, id) {
  if (entry[field] !== undefined && typeof entry[field] === "string" && !matchesPattern(entry[field], pattern)) {
    error(file, `${id} field '${field}' value '${entry[field]}' does not match pattern ${pattern}`);
  }
}

function checkUnique(arr, field, file) {
  const seen = new Set();
  for (const entry of arr) {
    const val = entry[field];
    if (val === undefined) continue;
    if (seen.has(val)) {
      error(file, `Duplicate ${field}: '${val}'`);
    }
    seen.add(val);
  }
}

function checkSequential(arr, field, prefix, file) {
  const ids = arr.map((e) => e[field]).filter(Boolean).sort();
  for (let i = 0; i < ids.length; i++) {
    const expected = `${prefix}-${String(i + 1).padStart(3, "0")}`;
    if (ids[i] !== expected) {
      error(file, `Expected sequential ID '${expected}' but found '${ids[i]}' at position ${i + 1}`);
      return; // stop on first gap
    }
  }
}

// ---------------------------------------------------------------------------
// Entity Codes
// ---------------------------------------------------------------------------

function validateEntityCodes() {
  const file = "entity-codes.json";
  console.log(`\nValidating ${file}...`);
  const data = loadJson(file);
  if (!data) return null;

  if (!Array.isArray(data)) {
    error(file, "Root must be an array");
    return null;
  }

  const required = ["code", "name", "category", "description", "dbTable", "status", "ccpidStatus", "createdAt"];
  const categories = ["Customer & Org", "Support & Comms", "Project Mgmt", "Billing & Finance", "Content & Docs", "System & Integration", "Access Control"];
  const statuses = ["ACTIVE", "DEPRECATED"];
  const ccpidStatuses = ["COMPLETE", "MIGRATION READY", "PENDING"];

  for (const entry of data) {
    const id = entry.code || "(no code)";
    checkRequired(entry, required, file, id);
    checkPattern(entry, "code", "^[A-Z]{3}$", file, id);
    checkEnum(entry, "category", categories, file, id);
    checkEnum(entry, "status", statuses, file, id);
    checkEnum(entry, "ccpidStatus", ccpidStatuses, file, id);
    checkPattern(entry, "dbTable", "^[a-z][a-z0-9_]*$", file, id);
  }

  checkUnique(data, "code", file);
  checkUnique(data, "dbTable", file);

  console.log(`  ${data.length} entity codes checked`);
  return data;
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

function validateModules() {
  const file = "modules.json";
  console.log(`\nValidating ${file}...`);
  const data = loadJson(file);
  if (!data) return null;

  if (!Array.isArray(data)) {
    error(file, "Root must be an array");
    return null;
  }

  const required = ["id", "slug", "name", "scope", "reusability", "stability", "owner", "sourceStandard", "createdAt"];
  const scopes = ["Platform", "Core", "Domain", "Integration", "UI", "Governance", "Experimental"];
  const reusabilities = ["Global", "Portfolio", "Product"];
  const stabilities = ["Experimental", "Beta", "Stable", "Deprecated", "Retired"];

  const modIds = new Set(data.map((e) => e.id));

  for (const entry of data) {
    const id = entry.id || "(no id)";
    checkRequired(entry, required, file, id);
    checkPattern(entry, "id", "^MOD-[0-9]{3}$", file, id);
    checkPattern(entry, "slug", "^[a-z][a-z0-9]*(-[a-z0-9]+)*$", file, id);
    checkEnum(entry, "scope", scopes, file, id);
    checkEnum(entry, "reusability", reusabilities, file, id);
    checkEnum(entry, "stability", stabilities, file, id);

    // Check dependency references
    if (Array.isArray(entry.dependencies)) {
      for (const dep of entry.dependencies) {
        if (!modIds.has(dep)) {
          error(file, `${id} depends on '${dep}' which does not exist in the registry`);
        }
        if (dep === entry.id) {
          error(file, `${id} depends on itself`);
        }
      }
    }

    // Check product references (will be validated cross-file later)
    if (Array.isArray(entry.usedByProducts)) {
      for (const prd of entry.usedByProducts) {
        if (!matchesPattern(prd, "^PRD-[0-9]{3}$")) {
          error(file, `${id} has invalid usedByProducts reference '${prd}'`);
        }
      }
    }
  }

  checkUnique(data, "id", file);
  checkUnique(data, "slug", file);
  checkSequential(data, "id", "MOD", file);

  console.log(`  ${data.length} modules checked`);
  return data;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

function validateProducts() {
  const file = "products.json";
  console.log(`\nValidating ${file}...`);
  const data = loadJson(file);
  if (!data) return null;

  if (!Array.isArray(data)) {
    error(file, "Root must be an array");
    return null;
  }

  if (data.length === 0) {
    console.log("  0 products (empty — ready for first registration)");
    return data;
  }

  const required = ["id", "name", "pcl", "domainTags", "owner", "status", "createdAt"];
  const statuses = ["Active", "Sunset", "Deprecated", "Archived"];
  const domainVocab = [
    "Analytics", "Collaboration", "Commerce", "Communication",
    "Compliance", "Data Management", "Developer Tools", "Education",
    "Finance", "Healthcare", "Identity/Auth", "Infrastructure",
    "Marketing", "Operations", "Productivity", "Project Management",
    "Security", "Other"
  ];

  for (const entry of data) {
    const id = entry.id || "(no id)";
    checkRequired(entry, required, file, id);
    checkPattern(entry, "id", "^PRD-[0-9]{3}$", file, id);
    checkPattern(entry, "pcl", "^PCL-[0-9]\\.[0-9]\\.[0-9]\\.[0-9]$", file, id);
    checkEnum(entry, "status", statuses, file, id);

    if (Array.isArray(entry.domainTags)) {
      if (entry.domainTags.length === 0) {
        error(file, `${id} must have at least one domain tag`);
      }
      for (const tag of entry.domainTags) {
        if (!domainVocab.includes(tag)) {
          error(file, `${id} has invalid domain tag '${tag}'`);
        }
      }
    }
  }

  checkUnique(data, "id", file);
  checkSequential(data, "id", "PRD", file);

  console.log(`  ${data.length} products checked`);
  return data;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

function validateProjects(products) {
  const file = "projects.json";
  console.log(`\nValidating ${file}...`);
  const data = loadJson(file);
  if (!data) return null;

  if (!Array.isArray(data)) {
    error(file, "Root must be an array");
    return null;
  }

  if (data.length === 0) {
    console.log("  0 projects (empty — ready for first registration)");
    return data;
  }

  const required = ["ccpid", "name", "domainCode", "classification", "tracker", "status", "createdAt"];
  const classifications = ["One-off", "Product", "RSM"];
  const trackers = ["Jira", "GitHub", "Linear"];
  const statuses = ["Active", "Complete", "Archived"];
  const productIds = new Set((products || []).map((p) => p.id));

  for (const entry of data) {
    const id = entry.ccpid || "(no ccpid)";
    checkRequired(entry, required, file, id);
    checkPattern(entry, "ccpid", "^PRJ-[A-HJ-NP-Z2-9]{6,8}-[A-HJ-NP-Z2-9]$", file, id);
    checkPattern(entry, "domainCode", "^[A-Z0-9]{2,3}-[A-Z0-9]{2,3}$", file, id);
    checkEnum(entry, "classification", classifications, file, id);
    checkEnum(entry, "tracker", trackers, file, id);
    checkEnum(entry, "status", statuses, file, id);

    if (entry.woePrefix !== null && entry.woePrefix !== undefined) {
      checkPattern(entry, "woePrefix", "^[A-Z0-9]{2,3}-[A-Z0-9]{2,3}$", file, id);
    }

    // Cross-ref: productId must exist in products.json
    if (entry.productId !== null && entry.productId !== undefined) {
      if (!matchesPattern(entry.productId, "^PRD-[0-9]{3}$")) {
        error(file, `${id} has invalid productId format '${entry.productId}'`);
      } else if (products && !productIds.has(entry.productId)) {
        error(file, `${id} references productId '${entry.productId}' which does not exist in products.json`);
      }
    }
  }

  checkUnique(data, "ccpid", file);

  console.log(`  ${data.length} projects checked`);
  return data;
}

// ---------------------------------------------------------------------------
// Standards
// ---------------------------------------------------------------------------

function validateStandards() {
  const file = "standards.json";
  console.log(`\nValidating ${file}...`);
  const data = loadJson(file);
  if (!data) return null;

  if (!Array.isArray(data)) {
    error(file, "Root must be an array");
    return null;
  }

  const required = ["id", "catalogNumber", "name", "type", "domain", "version", "owner", "status", "effective", "classification", "filename", "createdAt"];
  const types = ["Standard", "Policy", "Plan", "Template", "Framework"];
  const domains = ["Governance", "Security", "Data & Privacy", "Operations", "Engineering", "Audit & Metrics", "Policies"];
  const statuses = ["Active", "Deprecated", "Withdrawn"];
  const classifications = ["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"];

  for (const entry of data) {
    const id = entry.id || "(no id)";
    checkRequired(entry, required, file, id);
    checkPattern(entry, "id", "^(STD|POL|PLN|TPL|FWK)-[A-Z]{2,3}-[0-9]{3}$", file, id);
    checkPattern(entry, "catalogNumber", "^[0-9]+\\.[0-9]+$", file, id);
    checkPattern(entry, "version", "^v[0-9]+(\\.[0-9]+)*$", file, id);
    checkPattern(entry, "filename", "^(STD|POL|PLN|TPL|FWK)-[A-Z]{2,3}-[0-9]{3} CYBERCUBE-.+\\.md$", file, id);
    checkEnum(entry, "type", types, file, id);
    checkEnum(entry, "domain", domains, file, id);
    checkEnum(entry, "status", statuses, file, id);
    checkEnum(entry, "classification", classifications, file, id);
  }

  checkUnique(data, "id", file);
  checkUnique(data, "catalogNumber", file);
  checkUnique(data, "filename", file);

  console.log(`  ${data.length} standards checked`);
  return data;
}

// ---------------------------------------------------------------------------
// Cross-file validation
// ---------------------------------------------------------------------------

function validateCrossRefs(modules, products, standards) {
  console.log("\nCross-reference validation...");

  if (!modules || !products) {
    warn("cross-ref", "Skipping (one or more registries failed to load)");
    return;
  }

  const productIds = new Set(products.map((p) => p.id));

  // Check module usedByProducts references
  for (const mod of modules) {
    if (Array.isArray(mod.usedByProducts)) {
      for (const prd of mod.usedByProducts) {
        if (!productIds.has(prd)) {
          error("cross-ref", `Module ${mod.id} references product '${prd}' which does not exist in products.json`);
        }
      }
    }
  }

  // Check module sourceStandard references against standards registry
  if (standards) {
    const catalogNumbers = new Set(standards.map((s) => s.catalogNumber));
    for (const mod of modules) {
      if (mod.sourceStandard && !catalogNumbers.has(mod.sourceStandard)) {
        error("cross-ref", `Module ${mod.id} references sourceStandard '${mod.sourceStandard}' which does not exist in standards.json`);
      }
    }
  }

  console.log("  Cross-references checked");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("CYBERCUBE Registry Validator");
console.log("===========================");

const entityCodes = validateEntityCodes();
const modules = validateModules();
const products = validateProducts();
const projects = validateProjects(products);
const standards = validateStandards();
validateCrossRefs(modules, products, standards);

console.log("\n---");
console.log(`Result: ${errorCount} error(s), ${warnCount} warning(s)`);

if (errorCount > 0) {
  console.error("\nVALIDATION FAILED");
  process.exit(1);
} else {
  console.log("\nVALIDATION PASSED");
  process.exit(0);
}
