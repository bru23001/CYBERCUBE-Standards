#!/usr/bin/env node

/**
 * CYBERCUBE Registry Renderer
 *
 * Reads JSON registry files and regenerates auto-generated sections
 * in CYBERCUBE-Name-Registry.md using BEGIN/END markers.
 *
 * Static sections (artifacts, component types, lookup guide) are preserved.
 * Only sections between markers are replaced.
 *
 * Usage: node registries/render-registry.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resolve = (...parts) => join(__dirname, ...parts);
const REGISTRY_PATH = resolve("..", "CYBERCUBE-Name-Registry.md");

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

function loadJson(relPath) {
  return JSON.parse(readFileSync(resolve(relPath), "utf-8"));
}

const entityCodes = loadJson("entity-codes.json");
const modules = loadJson("modules.json");
const products = loadJson("products.json");
const projects = loadJson("projects.json");

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function renderEntityCodes() {
  const lines = [];
  lines.push("| Code | Entity Name | Category | Status | DB Table |");
  lines.push("|------|-------------|----------|--------|----------|");

  for (const e of entityCodes) {
    lines.push(`| **${e.code}** | ${e.name} | ${e.category} | ${e.status} | \`${e.dbTable}\` |`);
  }

  const active = entityCodes.filter((e) => e.status === "ACTIVE").length;
  const deprecated = entityCodes.filter((e) => e.status === "DEPRECATED").length;
  lines.push("");
  lines.push(`**Total:** ${entityCodes.length} entity codes (${active} ACTIVE${deprecated > 0 ? `, ${deprecated} DEPRECATED` : ""})`);

  return lines.join("\n");
}

function renderProducts() {
  if (products.length === 0) {
    return [
      "| ID | Product Name | PCL Code | Domain Tags | Criticality | Owner | Status |",
      "|----|-------------|----------|-------------|-------------|-------|--------|",
      "| *(none registered yet — add to `registries/products.json`)* | | | | | | |",
      "",
      `**Total:** 0 products`,
    ].join("\n");
  }

  const lines = [];
  lines.push("| ID | Product Name | PCL Code | Domain Tags | Owner | Status |");
  lines.push("|----|-------------|----------|-------------|-------|--------|");

  for (const p of products) {
    const tags = p.domainTags.join(", ");
    lines.push(`| ${p.id} | ${p.name} | \`${p.pcl}\` | ${tags} | ${p.owner} | ${p.status} |`);
  }

  lines.push("");
  lines.push(`**Total:** ${products.length} products`);
  return lines.join("\n");
}

function renderModules() {
  const lines = [];
  lines.push("| ID | Slug | Name | Scope | Reusability | Stability | Owner | Source Std |");
  lines.push("|----|------|------|-------|-------------|-----------|-------|-----------|");

  for (const m of modules) {
    lines.push(`| ${m.id} | \`${m.slug}\` | ${m.name} | ${m.scope} | ${m.reusability} | ${m.stability} | ${m.owner} | ${m.sourceStandard} |`);
  }

  lines.push("");
  lines.push(`**Total:** ${modules.length} modules registered`);
  return lines.join("\n");
}

function renderUuidCrosswalk() {
  // Build status map from entity codes
  const statusMap = {};
  for (const e of entityCodes) {
    statusMap[e.code] = e.ccpidStatus;
  }

  // Sort: COMPLETE first, then MIGRATION READY, then PENDING
  const order = { COMPLETE: 0, "MIGRATION READY": 1, PENDING: 2 };
  const sorted = [...entityCodes].sort((a, b) => {
    const oa = order[a.ccpidStatus] ?? 3;
    const ob = order[b.ccpidStatus] ?? 3;
    return oa - ob;
  });

  const lines = [];
  lines.push("| Entity | CC-PID Code | UUID Column | CC-PID Column | CC-PID Status |");
  lines.push("|--------|-------------|-------------|---------------|---------------|");

  for (const e of sorted) {
    lines.push(`| ${e.name} | ${e.code} | \`id\` (UUIDv7) | \`public_id\` | ${e.ccpidStatus} |`);
  }

  return lines.join("\n");
}

function renderProjects() {
  if (projects.length === 0) {
    return [
      "| CC-PID | Project Name | Product (PRD) | Domain Code | Classification | WOE Prefix | Status |",
      "|--------|-------------|---------------|-------------|----------------|------------|--------|",
      "| *(none registered yet — add to `registries/projects.json`)* | | | | | | |",
    ].join("\n");
  }

  const lines = [];
  lines.push("| CC-PID | Project Name | Product (PRD) | Domain Code | Classification | WOE Prefix | Status |");
  lines.push("|--------|-------------|---------------|-------------|----------------|------------|--------|");

  for (const p of projects) {
    const prd = p.productId || "—";
    const woe = p.woePrefix || "—";
    lines.push(`| ${p.ccpid} | ${p.name} | ${prd} | ${p.domainCode} | ${p.classification} | ${woe} | ${p.status} |`);
  }

  lines.push("");
  lines.push(`**Total:** ${projects.length} projects`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Marker replacement
// ---------------------------------------------------------------------------

function replaceSection(markdown, sectionName, newContent) {
  const beginMarker = `<!-- BEGIN:${sectionName} -->`;
  const endMarker = `<!-- END:${sectionName} -->`;

  const beginIdx = markdown.indexOf(beginMarker);
  const endIdx = markdown.indexOf(endMarker);

  if (beginIdx === -1 || endIdx === -1) {
    console.warn(`  WARNING: Markers for ${sectionName} not found — skipping`);
    return markdown;
  }

  const before = markdown.substring(0, beginIdx + beginMarker.length);
  const after = markdown.substring(endIdx);

  return `${before}\n${newContent}\n${after}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("CYBERCUBE Registry Renderer");
console.log("==========================\n");

let md = readFileSync(REGISTRY_PATH, "utf-8");

const sections = [
  ["ENTITY_CODES", renderEntityCodes()],
  ["PRODUCTS", renderProducts()],
  ["MODULES", renderModules()],
  ["UUID_CROSSWALK", renderUuidCrosswalk()],
  ["PROJECTS", renderProjects()],
];

for (const [name, content] of sections) {
  const before = md.length;
  md = replaceSection(md, name, content);
  if (md.length !== before) {
    console.log(`  Updated: ${name}`);
  }
}

writeFileSync(REGISTRY_PATH, md, "utf-8");
console.log(`\nWrote ${REGISTRY_PATH}`);
console.log("Done.");
