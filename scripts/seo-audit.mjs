import fs from "node:fs";
import path from "node:path";

function findHtml(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(findHtml(full));
    else if (entry.name === "index.html") results.push(full);
  }
  return results;
}

const files = findHtml("out")
  .filter((f) => !f.includes("_next") && !f.includes("_not-found"))
  .sort();

const issues = [];
const good = [];
let total = 0;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const page = file.replace(/^out[\\/]/, "/").replace(/[\\/]index\.html$/, "") || "/";
  total++;

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch?.[1] || "";
  if (!title) issues.push({ page, issue: "MISSING title tag", severity: "critical" });
  else if (title.length > 70)
    issues.push({ page, issue: `Title too long (${title.length}ch)`, severity: "warn" });

  // Meta description
  const descMatch = html.match(/name="description" content="([^"]*)"/);
  const desc = descMatch?.[1] || "";
  if (!desc) issues.push({ page, issue: "MISSING meta description", severity: "critical" });
  else if (desc.length > 165)
    issues.push({ page, issue: `Description too long (${desc.length}ch)`, severity: "warn" });
  else if (desc.length < 50)
    issues.push({ page, issue: `Description too short (${desc.length}ch)`, severity: "warn" });

  // H1 count
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) issues.push({ page, issue: "NO H1 tag", severity: "critical" });
  else if (h1s > 1) issues.push({ page, issue: `MULTIPLE H1 tags (${h1s})`, severity: "warn" });

  // OG tags
  const ogTitle = html.includes("og:title");
  const ogDesc = html.includes("og:description");
  const ogImage = html.includes("og:image");
  if (!ogTitle) issues.push({ page, issue: "Missing og:title", severity: "warn" });
  if (!ogDesc) issues.push({ page, issue: "Missing og:description", severity: "warn" });
  if (!ogImage) issues.push({ page, issue: "Missing og:image", severity: "info" });

  // Canonical
  const hasCanonical = html.includes('rel="canonical"');
  if (!hasCanonical) issues.push({ page, issue: "No canonical URL", severity: "warn" });

  // JSON-LD
  const jsonLdCount = (html.match(/application\/ld\+json/g) || []).length;
  const isArticle =
    (page.includes("/best/") || page.includes("/reviews/") || page.includes("/guides/")) &&
    page.split("/").filter(Boolean).length >= 2;
  if (isArticle && jsonLdCount < 2)
    issues.push({ page, issue: `Only ${jsonLdCount} JSON-LD schema(s) on article page`, severity: "info" });

  // Images without alt
  const imgs = html.match(/<img[^>]*>/g) || [];
  const noAlt = imgs.filter((t) => !t.includes("alt=")).length;
  if (noAlt > 0) issues.push({ page, issue: `${noAlt} image(s) missing alt attribute`, severity: "warn" });
}

// Report
console.log("=== ON-PAGE SEO AUDIT ===");
console.log(`Pages audited: ${total}`);
console.log("");

const critical = issues.filter((i) => i.severity === "critical");
const warnings = issues.filter((i) => i.severity === "warn");
const info = issues.filter((i) => i.severity === "info");

if (critical.length) {
  console.log(`CRITICAL (${critical.length}):`);
  critical.forEach((i) => console.log(`  ${i.page} -> ${i.issue}`));
  console.log("");
}
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}):`);
  warnings.forEach((i) => console.log(`  ${i.page} -> ${i.issue}`));
  console.log("");
}
if (info.length) {
  console.log(`INFO (${info.length}):`);
  info.forEach((i) => console.log(`  ${i.page} -> ${i.issue}`));
  console.log("");
}
if (issues.length === 0) {
  console.log("No issues found! All pages pass SEO checks.");
}

console.log(`\nSummary: ${critical.length} critical, ${warnings.length} warnings, ${info.length} info out of ${total} pages`);
