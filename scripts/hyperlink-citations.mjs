import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const MDX_DIR = "src/content";

function globMdx(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...globMdx(full));
    else if (full.endsWith(".mdx")) results.push(full);
  }
  return results;
}
const PUBMED_SEARCH =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";

const CITATION_RE =
  /^- \*\*(.+?)\*\* (.+?)\. \*(.+?)\*,? (\d{4})\.$/;

async function searchPubMed(title) {
  const query = encodeURIComponent(title.replace(/[^\w\s]/g, " ").trim());
  const url = `${PUBMED_SEARCH}?db=pubmed&retmode=json&retmax=1&term=${query}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const ids = data?.esearchresult?.idlist;
    return ids?.length ? ids[0] : null;
  } catch {
    return null;
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const files = globMdx(MDX_DIR);
  let totalUpdated = 0;
  let totalLinked = 0;

  // Collect all unique citations first
  const citationMap = new Map(); // citation line -> { author, title, journal, year }
  const fileLines = new Map(); // filepath -> lines[]

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const lines = content.split("\n");
    fileLines.set(file, lines);

    for (const line of lines) {
      const match = line.match(CITATION_RE);
      if (match && !citationMap.has(line)) {
        citationMap.set(line, {
          author: match[1],
          title: match[2],
          journal: match[3],
          year: match[4],
        });
      }
    }
  }

  console.log(`Found ${citationMap.size} unique citations across ${files.length} files`);

  // Look up each citation on PubMed
  const linkMap = new Map(); // original line -> new line with link
  let i = 0;
  for (const [line, cite] of citationMap) {
    i++;
    // Search by title + journal + year for best match
    const searchTerm = `${cite.title} ${cite.journal} ${cite.year}`;
    const pmid = await searchPubMed(searchTerm);

    if (pmid) {
      const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
      // Wrap the citation in a link
      const linked = `- **${cite.author}** [${cite.title}](${pubmedUrl}). *${cite.journal}*, ${cite.year}.`;
      linkMap.set(line, linked);
      totalLinked++;
      console.log(`[${i}/${citationMap.size}] ✓ ${cite.author} → PMID ${pmid}`);
    } else {
      console.log(`[${i}/${citationMap.size}] ✗ ${cite.author} — not found`);
    }

    // Rate limit: 3 req/sec without API key
    await sleep(350);
  }

  // Update files
  for (const [file, lines] of fileLines) {
    let changed = false;
    const newLines = lines.map((line) => {
      if (linkMap.has(line)) {
        changed = true;
        return linkMap.get(line);
      }
      return line;
    });

    if (changed) {
      writeFileSync(file, newLines.join("\n"), "utf-8");
      totalUpdated++;
    }
  }

  console.log(`\nDone: ${totalLinked} citations linked across ${totalUpdated} files`);
}

main();
