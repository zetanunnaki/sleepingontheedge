#!/usr/bin/env node
/**
 * Amazon Product Advertising API 5.0 sync.
 *
 * What this does:
 *   - Reads src/data/products.json
 *   - Extracts the ASIN from each product's amazonLink
 *   - Calls PA-API GetItems (batched by 10 ASINs at a time)
 *   - Downloads the high-res primary image to public/images/products/<id>.jpg
 *   - Updates price in products.json with the live Amazon price
 *
 * Prerequisites (all required — script will exit cleanly if missing):
 *   AMAZON_ACCESS_KEY      - PA-API access key
 *   AMAZON_SECRET_KEY      - PA-API secret key
 *   AMAZON_PARTNER_TAG     - Associates tag (e.g. slpedge-20)
 *
 * Also required: real ASINs in products.json amazonLink fields.
 *   Placeholder links containing "YOUR_ID" will be skipped.
 *
 * Docs: https://webservices.amazon.com/paapi5/documentation/
 *
 * Usage:
 *   AMAZON_ACCESS_KEY=... AMAZON_SECRET_KEY=... AMAZON_PARTNER_TAG=slpedge-20 \
 *     node scripts/sync-amazon-paapi.mjs
 *
 *   node scripts/sync-amazon-paapi.mjs --dry-run    # show what would change without calling the API
 */

import crypto from "node:crypto";
import fs from "node:fs";
import https from "node:https";
import path from "node:path";

const PRODUCTS_FILE = "src/data/products.json";
const IMAGE_DIR = "public/images/products";
const REGION = "us-east-1";
const HOST = "webservices.amazon.com";
const URI = "/paapi5/getitems";
const MARKETPLACE = "www.amazon.com";

const ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
const SECRET_KEY = process.env.AMAZON_SECRET_KEY;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG;
const DRY_RUN = process.argv.includes("--dry-run");

function extractAsin(url) {
  if (!url) return null;
  if (url.includes("YOUR_ID")) return null;
  const m = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/product\/([A-Z0-9]{10})/i);
  return m ? m[1].toUpperCase() : null;
}

function sha256Hex(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function hmac(key, data, encoding) {
  const h = crypto.createHmac("sha256", key).update(data);
  return encoding ? h.digest(encoding) : h.digest();
}

function awsSignV4(payload) {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const target = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems";
  const contentType = "application/json; charset=utf-8";
  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:${contentType}\n` +
    `host:${HOST}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${target}\n`;
  const signedHeaders = "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const payloadHash = sha256Hex(payload);
  const canonicalRequest = `POST\n${URI}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const algorithm = "AWS4-HMAC-SHA256";
  const credentialScope = `${dateStamp}/${REGION}/ProductAdvertisingAPI/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${sha256Hex(canonicalRequest)}`;
  const kDate = hmac("AWS4" + SECRET_KEY, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, "ProductAdvertisingAPI");
  const kSigning = hmac(kService, "aws4_request");
  const signature = hmac(kSigning, stringToSign, "hex");
  return {
    Authorization: `${algorithm} Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    "Content-Encoding": "amz-1.0",
    "Content-Type": contentType,
    Host: HOST,
    "X-Amz-Date": amzDate,
    "X-Amz-Target": target,
  };
}

function httpsRequest(headers, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: HOST,
        port: 443,
        path: URI,
        method: "POST",
        headers: { ...headers, "Content-Length": Buffer.byteLength(payload) },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`JSON parse error: ${data}`));
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function getItems(asins) {
  const body = JSON.stringify({
    ItemIds: asins,
    Resources: [
      "Images.Primary.Large",
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
      "Offers.Listings.Availability.Message",
    ],
    PartnerTag: PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: MARKETPLACE,
  });
  const headers = awsSignV4(body);
  return httpsRequest(headers, body);
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
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`Image download ${res.statusCode}`));
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

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function main() {
  if (!DRY_RUN && (!ACCESS_KEY || !SECRET_KEY || !PARTNER_TAG)) {
    console.error(
      "Missing credentials. Set AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG — or pass --dry-run.",
    );
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
  const entries = Object.entries(products);
  const asinMap = new Map(); // asin -> productId
  const skipped = [];

  for (const [id, p] of entries) {
    const asin = extractAsin(p.amazonLink);
    if (!asin) {
      skipped.push(id);
      continue;
    }
    asinMap.set(asin, id);
  }

  console.log(`Found ${asinMap.size} products with real ASINs (${skipped.length} skipped with placeholders).`);
  if (asinMap.size === 0) {
    console.log("Nothing to sync. Fill real ASINs into products.json amazonLink fields first.");
    return;
  }

  if (DRY_RUN) {
    console.log("\n=== DRY RUN — no API calls, no downloads ===");
    for (const [asin, id] of asinMap) console.log(`  ${id} -> ${asin}`);
    return;
  }

  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const asins = [...asinMap.keys()];
  let updated = 0;
  let imagesDownloaded = 0;

  for (const batch of chunk(asins, 10)) {
    console.log(`\nFetching batch of ${batch.length}...`);
    let resp;
    try {
      resp = await getItems(batch);
    } catch (e) {
      console.error(`  Batch failed: ${e.message}`);
      continue;
    }
    const items = resp?.ItemsResult?.Items ?? [];
    for (const item of items) {
      const id = asinMap.get(item.ASIN);
      if (!id) continue;
      const product = products[id];
      const price = item?.Offers?.Listings?.[0]?.Price?.DisplayAmount;
      const imageUrl = item?.Images?.Primary?.Large?.URL;
      if (price) {
        product.price = price;
        updated++;
      }
      if (imageUrl) {
        const imgPath = path.join(IMAGE_DIR, `${id}.jpg`);
        try {
          await download(imageUrl, imgPath);
          product.image = `/images/products/${id}.jpg`;
          imagesDownloaded++;
          console.log(`  ${id}: ${price ?? "no price"} + image`);
        } catch (e) {
          console.error(`  ${id}: image download failed — ${e.message}`);
        }
      }
    }
    // PA-API rate limit: 1 request per second per seller for new accounts
    await new Promise((r) => setTimeout(r, 1500));
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  console.log(`\n=== Done: ${updated} prices updated, ${imagesDownloaded} images downloaded ===`);
  console.log("Review changes with: git diff src/data/products.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
