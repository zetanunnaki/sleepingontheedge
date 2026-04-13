// Regenerate specific cover images
// Usage: node scripts/regenerate-covers.mjs

import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const API_KEY = "a34ec7e113fd3f211e45fc9c44ecaabb";
const BASE = "https://api.kie.ai/api/v1/flux/kontext";

function post(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname,
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(JSON.parse(d)));
      },
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https
      .get(
        {
          hostname: u.hostname,
          path: u.pathname + u.search,
          headers: { Authorization: `Bearer ${API_KEY}` },
        },
        (res) => {
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => resolve(JSON.parse(d)));
        },
      )
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (e) => {
        try {
          fs.unlinkSync(dest);
        } catch {}
        reject(e);
      });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function submit(prompt, ratio = "16:9") {
  const resp = await post(`${BASE}/generate`, {
    prompt,
    aspectRatio: ratio,
    outputFormat: "jpeg",
    model: "flux-kontext-pro",
    safetyTolerance: 2,
  });
  return resp?.data?.taskId;
}

async function poll(taskId, maxTries = 60) {
  for (let i = 0; i < maxTries; i++) {
    const resp = await get(`${BASE}/record-info?taskId=${taskId}`);
    const d = resp?.data;
    if (d?.successFlag === 1 && d?.response?.resultImageUrl) return d.response.resultImageUrl;
    if (d?.successFlag >= 2) return null;
    await sleep(5000);
  }
  return null;
}

const COVERS = [
  [
    "doctors-best-magnesium-glycinate-review.jpg",
    "Simple product photograph. A small brown glass supplement bottle with plain white label stands on a dark stone surface. White capsules scattered next to the bottle. Plain dark grey background. No people. No faces. Just the bottle and capsules.",
  ],
];

async function main() {
  const outDir = "public/images/covers";
  fs.mkdirSync(outDir, { recursive: true });

  const tasks = [];
  console.log("=== Submitting cover regenerations ===");
  for (const [filename, prompt] of COVERS) {
    const taskId = await submit(prompt, "16:9");
    console.log(`  ${filename} -> ${taskId}`);
    tasks.push({ filename, taskId });
    await sleep(800);
  }

  console.log("\n=== Waiting 30s before polling ===\n");
  await sleep(30000);

  let success = 0;
  let fail = 0;
  for (const { filename, taskId } of tasks) {
    if (!taskId) {
      console.log(`${filename}: no taskId`);
      fail++;
      continue;
    }
    process.stdout.write(`Polling ${filename}...`);
    const url = await poll(taskId);
    if (url) {
      const dest = path.join(outDir, filename);
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(` OK (${(size / 1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(" FAILED");
      fail++;
    }
  }

  console.log(`\n=== Done: ${success} ok, ${fail} fail ===`);
}

main().catch(console.error);
