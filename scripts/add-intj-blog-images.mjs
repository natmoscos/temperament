/**
 * Downloads and processes 3 copyright-free images for the intj-man-features blog post
 *
 * Sources (all Wikimedia Commons):
 * 1. Thumbnail: "Critical Thinking (Unsplash).jpg" — CC0 Public Domain
 * 2. Section 1: "Man reads a book while sitting at a table.jpg" — CC BY 2.0 (credit: Shixart1985)
 * 3. Section 2: "Curly hair and freckles man (Unsplash).jpg" — CC0 Public Domain
 */

import sharp from 'sharp';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../public/blog');

const IMAGES = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Critical_Thinking_%28Unsplash%29.jpg',
    filename: 'intj-man-features.jpg',
    license: 'CC0 Public Domain',
    description: 'Thumbnail - man thinking on steps (CC0)',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Man_reads_a_book_while_sitting_at_a_table.jpg',
    filename: 'intj-man-features-section-1.jpg',
    license: 'CC BY 2.0 — Shixart1985',
    description: 'Section 1 - man reading a book (CC BY 2.0)',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Curly_hair_and_freckles_man_%28Unsplash%29.jpg',
    filename: 'intj-man-features-section-2.jpg',
    license: 'CC0 Public Domain',
    description: 'Section 2 - man portrait B&W intense gaze (CC0)',
  },
];

function downloadFile(url, tempPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tempPath);
    const request = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(tempPath);
        return downloadFile(response.headers.location, tempPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    request.on('error', (err) => { fs.unlinkSync(tempPath); reject(err); });
  });
}

async function processImage(url, filename, description) {
  const tempPath = path.join(OUTPUT_DIR, `_tmp_${filename}`);
  const outputPath = path.join(OUTPUT_DIR, filename);

  console.log(`\n📥 Downloading: ${description}`);
  console.log(`   URL: ${url}`);
  await downloadFile(url, tempPath);
  console.log(`   ✓ Downloaded`);

  console.log(`   🔧 Processing to 900×600 (attention crop)...`);
  await sharp(tempPath)
    .resize(900, 600, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(outputPath);

  fs.unlinkSync(tempPath);
  const stat = fs.statSync(outputPath);
  console.log(`   ✓ Saved: ${filename} (${(stat.size / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('🖼️  Adding blog images for intj-man-features\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const img of IMAGES) {
    await processImage(img.url, img.filename, img.description);
    console.log(`   License: ${img.license}`);
  }

  console.log('\n✅ All 3 images processed successfully!');
  console.log('\nImage summary:');
  IMAGES.forEach(img => {
    const p = path.join(OUTPUT_DIR, img.filename);
    const size = fs.existsSync(p) ? `${(fs.statSync(p).size / 1024).toFixed(0)} KB` : 'missing';
    console.log(`  /public/blog/${img.filename} — ${size} — ${img.license}`);
  });
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
