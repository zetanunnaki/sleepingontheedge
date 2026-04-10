// Generate all product and cover images via Kie.ai Flux Kontext Pro API
// Usage: node scripts/generate-images.mjs

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
      { hostname: u.hostname, path: u.pathname, method: "POST", headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } },
      (res) => { let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => resolve(JSON.parse(d))); }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search, headers: { Authorization: `Bearer ${API_KEY}` } }, (res) => {
      let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => resolve(JSON.parse(d)));
    }).on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function submit(prompt, ratio = "1:1") {
  const resp = await post(`${BASE}/generate`, {
    prompt, aspectRatio: ratio, outputFormat: "jpeg", model: "flux-kontext-pro", safetyTolerance: 2,
  });
  return resp?.data?.taskId;
}

async function poll(taskId, maxTries = 40) {
  for (let i = 0; i < maxTries; i++) {
    const resp = await get(`${BASE}/record-info?taskId=${taskId}`);
    const d = resp?.data;
    if (d?.successFlag === 1 && d?.response?.resultImageUrl) return d.response.resultImageUrl;
    if (d?.successFlag >= 2) return null;
    await sleep(5000);
  }
  return null;
}

// All images to generate
const PRODUCTS = [
  ["hatch-restore-2.jpg", "Minimalist product photo of a modern smart sunrise alarm clock, rounded white design with warm amber LED glow, on a dark wood nightstand, moody dark bedroom, editorial product photography, soft shadows"],
  ["yogasleep-dohm.jpg", "Minimalist product photo of a round white noise machine with dome shape and air vents around the middle, on a dark nightstand, moody dark bedroom, editorial product photography"],
  ["loftie-clock.jpg", "Minimalist product photo of a small rectangular bedside clock with minimal LED display, light beige housing, on a dark nightstand, moody dark bedroom, editorial product photography"],
  ["magnesium-breakthrough.jpg", "Minimalist product photo of a dark supplement bottle with gold label, white capsules scattered beside it, dark surface, moody studio lighting, editorial health product photography"],
  ["manta-sleep-mask.jpg", "Minimalist product photo of a black sleep mask with adjustable eye cups laid flat on dark surface, moody studio lighting, editorial product photography"],
  ["chilipad-cube.jpg", "Minimalist product photo of a small white bedside cooling unit with water reservoir connected to a mattress pad, dark bedroom, editorial product photography"],
  ["oura-ring-gen-3.jpg", "Minimalist product photo of a sleek titanium smart ring, silver metallic finish, subtle sensor dots inside, resting on dark stone, moody studio lighting, editorial jewelry photography"],
  ["whoop-4.jpg", "Minimalist product photo of a slim black fitness strap wearable, simple black fabric band with small rectangular sensor, dark background, editorial fitness product photography"],
  ["swanwick-blue-blockers.jpg", "Minimalist product photo of amber-tinted blue light blocking glasses with classic frame, warm orange lenses, resting on dark surface, editorial eyewear photography"],
  ["ra-optics-twilight.jpg", "Minimalist product photo of premium wraparound blue light blocking glasses with deep amber lenses and dark frame, on dark surface, editorial eyewear photography"],
  ["bearaby-cotton-napper.jpg", "Minimalist product photo of a chunky knit weighted blanket in natural cream cotton draped over a dark bed corner, thick braided knit texture, editorial textile photography"],
  ["luna-weighted-blanket.jpg", "Minimalist product photo of a folded gray weighted blanket on a dark bed, smooth cotton surface with quilted squares, moody bedroom lighting, editorial textile photography"],
  ["coop-eden-pillow.jpg", "Minimalist product photo of a plush white memory foam pillow with soft cover on a dark bed surface, moody bedroom lighting, editorial bedding photography"],
  ["beckham-hotel-pillow.jpg", "Minimalist product photo of two plush white hotel-style pillows stacked on a dark bed, fluffy and inviting, moody bedroom lighting, editorial bedding photography"],
];

const COVERS = [
  ["smart-alarm-clocks.jpg", "Editorial hero image of a modern bedroom nightstand at dawn, warm sunrise light through sheer curtains, smart alarm clock glowing, peaceful calm, wide cinematic"],
  ["best-magnesium.jpg", "Editorial hero image of supplement capsules and glass of water on dark marble, soft warm evening lighting, calming purple and blue tones, cinematic health photography"],
  ["best-sleep-trackers.jpg", "Editorial hero image of sleeping person hand on white pillow wearing a smart ring, soft morning light, peaceful bedroom, cinematic muted tones"],
  ["best-blue-blockers.jpg", "Editorial hero image of amber glasses resting on an open book next to a warm lamp at night, cozy evening reading, cinematic"],
  ["best-weighted-blankets.jpg", "Editorial hero image of cozy bed with chunky knit blanket draped over it, warm dim lamplight, peaceful bedroom, cinematic muted warm tones"],
  ["best-pillows.jpg", "Editorial hero image of fresh white pillows on a neatly made dark bed, soft morning light from window, peaceful and inviting, cinematic"],
  ["hatch-restore-2-review.jpg", "Editorial hero image of sunrise alarm clock glowing with warm amber light on nightstand in dark bedroom, peaceful dawn, cinematic"],
  ["manta-sleep-mask-review.jpg", "Editorial hero image of black eye-cup sleep mask on white pillow, dark bedroom with soft blue moonlight through curtains, cinematic"],
  ["loftie-clock-review.jpg", "Editorial hero image of minimalist bedside clock on nightstand next to a book, warm evening lamp light, phone absent, peaceful bedroom, cinematic"],
  ["chilipad-cube-review.jpg", "Editorial hero image of cool blue-tinted bedroom at night, bed with thin cooling pad under white sheets, serene temperature-controlled, cinematic"],
  ["oura-ring-review.jpg", "Editorial hero image of hand wearing sleek smart ring resting on white pillow, soft morning light, minimalist peaceful bedroom, cinematic"],
  ["yogasleep-dohm-review.jpg", "Editorial hero image of round white noise machine on nightstand in dark bedroom, soft warm glow from lamp, peaceful sleeping, cinematic"],
  ["fix-sleep-schedule.jpg", "Editorial hero image of bright morning sunlight flooding through bedroom window onto empty bed, fresh start energy, cinematic warm tones"],
  ["bedroom-temperature.jpg", "Editorial hero image of cool-toned bedroom with modern thermostat on wall, peaceful sleeping atmosphere, blue-tinted moonlight, cinematic"],
  ["sleep-better-tonight.jpg", "Editorial hero image of peaceful person sleeping deeply in dark cool bedroom, soft moonlight, premium bedding, cinematic tranquil"],
  ["3-am-wake-up.jpg", "Editorial hero image of dark bedroom with digital clock showing 3:00 AM in soft red numbers, moonlight through curtains, empty bed rumpled sheets, moody cinematic"],
  ["melatonin-dosage.jpg", "Editorial hero image of small supplement capsule next to glass of water on dark nightstand at dusk, warm purple orange sunset light through window, cinematic"],
  ["napping-science.jpg", "Editorial hero image of person napping on a couch in afternoon sunlight, warm golden tones, book on chest, peaceful restorative, cinematic"],
  ["sleep-apnea-signs.jpg", "Editorial hero image of stethoscope resting on white pillow, dark moody bedroom lighting, medical meets sleep theme, cinematic"],
  ["caffeine-and-sleep.jpg", "Editorial hero image of coffee cup on saucer next to alarm clock on nightstand, coffee half-drunk, warm afternoon light, cinematic"],
  ["bedtime-routine.jpg", "Editorial hero image of warm dimly lit bedroom at night, book and reading glasses on nightstand, warm lamp light, candle, phone absent, cinematic peaceful"],
  ["sleep-debt.jpg", "Editorial hero image of rumpled empty bed sheets with morning light streaming in, alarm clock background, exhaustion theme, cinematic muted tones"],
];

async function main() {
  const tasks = [];

  // Submit all product images
  console.log("=== Submitting product images ===");
  for (const [filename, prompt] of PRODUCTS) {
    const taskId = await submit(prompt, "1:1");
    console.log(`  ${filename} -> ${taskId}`);
    tasks.push({ filename, taskId, dir: "public/images/products" });
    await sleep(500); // small delay between submissions
  }

  // Submit all cover images
  console.log("\n=== Submitting cover images ===");
  for (const [filename, prompt] of COVERS) {
    const taskId = await submit(prompt, "16:9");
    console.log(`  ${filename} -> ${taskId}`);
    tasks.push({ filename, taskId, dir: "public/images/covers" });
    await sleep(500);
  }

  console.log(`\n=== ${tasks.length} tasks submitted. Waiting 30s before polling... ===\n`);
  await sleep(30000);

  // Poll and download all
  let success = 0;
  let fail = 0;
  for (const { filename, taskId, dir } of tasks) {
    if (!taskId) { fail++; continue; }
    process.stdout.write(`Polling ${filename}...`);
    const url = await poll(taskId);
    if (url) {
      fs.mkdirSync(dir, { recursive: true });
      const dest = path.join(dir, filename);
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(` OK (${(size / 1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(" FAILED");
      fail++;
    }
  }

  console.log(`\n=== Done! ${success} succeeded, ${fail} failed ===`);
}

main().catch(console.error);
