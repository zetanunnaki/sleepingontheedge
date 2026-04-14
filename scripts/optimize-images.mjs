#!/usr/bin/env node
/**
 * Image optimization pass.
 *
 * - Resizes cover images (16:9) to max 1600x900
 * - Resizes product images (1:1) to max 800x800
 * - Re-encodes as JPEG quality 82 (visually lossless, big file savings)
 * - Writes back in place — only if the new file is smaller
 *
 * Run with: node scripts/optimize-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TARGETS = [
  {
    dir: "public/images/covers",
    maxWidth: 1600,
    maxHeight: 900,
    quality: 82,
  },
  {
    dir: "public/images/products",
    maxWidth: 800,
    maxHeight: 800,
    quality: 82,
  },
  {
    dir: "public/brand",
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 85,
  },
];

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(0) + "KB";
}

async function processFile(filePath, maxWidth, maxHeight, quality) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const original = fs.readFileSync(filePath);
  const originalSize = original.length;

  let pipeline = sharp(original, { failOn: "none" }).resize({
    width: maxWidth,
    height: maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality, compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality, progressive: true, mozjpeg: true });
  }

  const optimized = await pipeline.toBuffer();
  const newSize = optimized.length;

  if (newSize < originalSize) {
    fs.writeFileSync(filePath, optimized);
    return { original: originalSize, optimized: newSize, saved: originalSize - newSize };
  }
  return { original: originalSize, optimized: originalSize, saved: 0, skipped: true };
}

async function main() {
  let grandTotalBefore = 0;
  let grandTotalAfter = 0;
  let processedCount = 0;

  for (const target of TARGETS) {
    if (!fs.existsSync(target.dir)) continue;
    const files = fs.readdirSync(target.dir).filter((f) => !f.startsWith("."));
    console.log(`\n=== ${target.dir} (${files.length} files) ===`);

    let dirBefore = 0;
    let dirAfter = 0;

    for (const file of files) {
      const filePath = path.join(target.dir, file);
      try {
        const result = await processFile(
          filePath,
          target.maxWidth,
          target.maxHeight,
          target.quality,
        );
        if (!result) continue;
        dirBefore += result.original;
        dirAfter += result.optimized;
        processedCount++;
        const tag = result.skipped ? "SKIP" : "OPT";
        console.log(
          `  [${tag}] ${file}: ${fmtKB(result.original)} -> ${fmtKB(result.optimized)}`,
        );
      } catch (e) {
        console.error(`  [ERR] ${file}: ${e.message}`);
      }
    }

    console.log(
      `  dir total: ${fmtKB(dirBefore)} -> ${fmtKB(dirAfter)} (${(
        ((dirBefore - dirAfter) / dirBefore) *
        100
      ).toFixed(0)}% reduction)`,
    );

    grandTotalBefore += dirBefore;
    grandTotalAfter += dirAfter;
  }

  console.log(
    `\n=== Grand total: ${fmtKB(grandTotalBefore)} -> ${fmtKB(grandTotalAfter)} ` +
      `(${(((grandTotalBefore - grandTotalAfter) / grandTotalBefore) * 100).toFixed(0)}% reduction) ` +
      `across ${processedCount} files ===`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
