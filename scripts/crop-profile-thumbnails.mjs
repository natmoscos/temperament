// Crop existing 4:3 blog thumbnails to 1:1 square profile photos.
// Uses sharp's attention-based crop to preserve faces/subjects.
//
// Usage:
//   node scripts/crop-profile-thumbnails.mjs
//
// Output: /public/profiles/{slug}.jpg at 600×600, quality 85.

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// slug → source file (relative to /public)
const MAPPINGS = [
  { slug: 'taylor-swift',       src: '/blog/taylor-swift-mbti.jpg' },
  { slug: 'bad-bunny',          src: '/blog/bad-bunny-mbti.jpg' },
  { slug: 'zendaya',            src: '/blog/zendaya-mbti.jpg' },
  { slug: 'dwayne-johnson',     src: '/blog/dwayne-johnson-mbti.jpg' },
  { slug: 'cristiano-ronaldo',  src: '/blog/ronaldo-mbti.jpg' },
  { slug: 'lady-gaga',          src: '/blog/lady-gaga-mbti.jpg' },
  { slug: 'elon-musk',          src: '/blog/elon-musk-mbti.jpg' },
  { slug: 'mrbeast',            src: '/blog/mrbeast-mbti.jpg' },
  { slug: 'billie-eilish',      src: '/blog/billie-eilish-mbti.jpg' },
  { slug: 'timothee-chalamet',  src: '/blog/timothee-chalamet-mbti.jpg' },
  { slug: 'friedrich-nietzsche', src: '/blog/nietzsche-mbti.jpg' },
  { slug: 'socrates',           src: '/blog/socrates-mbti.jpg' },
  { slug: 'hippocrates',        src: '/blog/hippocrates-192types.jpg' },
];

const PUBLIC_DIR = resolve(process.cwd(), 'public');
const OUT_DIR = resolve(PUBLIC_DIR, 'profiles');

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

let ok = 0;
let failed = 0;

for (const { slug, src } of MAPPINGS) {
  const inputPath = resolve(PUBLIC_DIR, src.replace(/^\//, ''));
  const outputPath = resolve(OUT_DIR, `${slug}.jpg`);

  if (!existsSync(inputPath)) {
    console.log(`⚠️  skip ${slug}: source not found (${src})`);
    failed++;
    continue;
  }

  try {
    const { width, height } = await sharp(inputPath).metadata();

    await sharp(inputPath)
      .resize(600, 600, {
        fit: 'cover',
        // 'attention' = face/salient-region aware crop
        position: sharp.strategy.attention,
      })
      .jpeg({ quality: 85, mozjpeg: true, progressive: true })
      .toFile(outputPath);

    console.log(`✅ ${slug.padEnd(20)} ${width}×${height}  →  profiles/${slug}.jpg`);
    ok++;
  } catch (e) {
    console.error(`❌ ${slug}:`, e.message);
    failed++;
  }
}

console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);
