// Regenerate specific product images
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function submit(prompt, ratio = "1:1") {
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

const PRODUCTS = [
  [
    "fitbit-charge-6.jpg",
    "Product photograph of a slim black fitness tracker wristband with rectangular screen on a plain dark surface, studio lighting, plain dark background",
  ],
];

async function main() {
  const outDir = "public/images/products";
  fs.mkdirSync(outDir, { recursive: true });

  const tasks = [];
  console.log("=== Submitting product regens ===");
  for (const [filename, prompt] of PRODUCTS) {
    const taskId = await submit(prompt, "1:1");
    console.log(`  ${filename} -> ${taskId}`);
    tasks.push({ filename, taskId });
    await sleep(800);
  }

  console.log("\n=== Waiting 30s ===\n");
  await sleep(30000);

  let ok = 0,
    fail = 0;
  for (const { filename, taskId } of tasks) {
    if (!taskId) {
      fail++;
      continue;
    }
    process.stdout.write(`Polling ${filename}...`);
    const url = await poll(taskId);
    if (url) {
      const dest = path.join(outDir, filename);
      await download(url, dest);
      console.log(` OK (${(fs.statSync(dest).size / 1024).toFixed(0)}KB)`);
      ok++;
    } else {
      console.log(" FAIL");
      fail++;
    }
  }
  console.log(`\n=== Done: ${ok} ok, ${fail} fail ===`);
}

main().catch(console.error);
