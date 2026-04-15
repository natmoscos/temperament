import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'PersonalityTestBlog/1.0 (contact@192types.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks), headers: res.headers }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetch(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];

  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      return (ii.mime === 'image/jpeg' || ii.mime === 'image/png') && ii.width >= 400 && ii.thumburl;
    })
    .map(p => ({
      title: p.title,
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      originalUrl: p.imageinfo[0].url,
      width: p.imageinfo[0].width,
      height: p.imageinfo[0].height,
    }));
}

async function downloadAndOptimize(imageUrl, outputPath) {
  const res = await fetch(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const sharp = (await import('sharp')).default;
  await sharp(res.data)
    .resize(900, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);
  const stat = fs.statSync(outputPath);
  return stat.size;
}

// Fix specific problematic photos
const FIXES = [
  // Zendaya - section 1 got Bella Thorne (wrong person!)
  { file: 'zendaya-section-1.jpg', query: 'Zendaya Coleman actress', nameFilter: 'zendaya' },
  // Zendaya - section 2 didn't download
  { file: 'zendaya-section-2.jpg', query: 'Zendaya red carpet fashion', nameFilter: 'zendaya' },
  // Ronaldo section-1 got "Christian Rontini" (wrong person)
  { file: 'ronaldo-section-1.jpg', query: 'Cristiano Ronaldo Portugal', nameFilter: 'ronaldo' },
  // Bad Bunny section-2 got cosplayers (wrong!)
  { file: 'bad-bunny-section-2.jpg', query: 'Bad Bunny reggaeton artist', nameFilter: 'bad bunny' },
];

async function main() {
  for (const fix of FIXES) {
    const outPath = path.join(OUT_DIR, fix.file);
    console.log(`\nFixing ${fix.file}: "${fix.query}"`);

    const images = await searchWikimedia(fix.query);
    console.log(`  Found ${images.length} images`);

    // Filter by name if specified
    let filtered = images;
    if (fix.nameFilter) {
      filtered = images.filter(img => img.title.toLowerCase().includes(fix.nameFilter));
      console.log(`  After name filter "${fix.nameFilter}": ${filtered.length}`);
      if (filtered.length === 0) filtered = images; // fallback
    }

    // Log all results for debugging
    for (const img of filtered.slice(0, 5)) {
      console.log(`  - ${img.title} (${img.width}x${img.height})`);
    }

    let success = false;
    for (let j = 0; j < Math.min(5, filtered.length); j++) {
      const img = filtered[j];
      console.log(`  Trying: ${img.title}`);
      try {
        const url = img.width > 1200 ? img.url : img.originalUrl;
        const size = await downloadAndOptimize(url, outPath);
        console.log(`  [OK] ${fix.file} (${Math.round(size/1024)}KB)`);
        success = true;
        break;
      } catch (err) {
        console.log(`  [FAIL] ${err.message}`);
      }
    }
    if (!success) console.log(`  [WARN] Failed to fix ${fix.file}`);

    await new Promise(r => setTimeout(r, 500));
  }
}

main().catch(console.error);
