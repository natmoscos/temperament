import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

// Each celebrity: name prefix, search queries for section photos
const PHOTO_PLAN = [
  { prefix: 'trump', queries: ['Donald Trump president speech', 'Donald Trump White House'] },
  { prefix: 'taylor-swift', queries: ['Taylor Swift concert Eras Tour', 'Taylor Swift Grammy Award'] },
  { prefix: 'elon-musk', queries: ['Elon Musk Tesla SpaceX', 'Elon Musk interview'] },
  { prefix: 'ronaldo', queries: ['Cristiano Ronaldo football goal', 'Cristiano Ronaldo celebration'] },
  { prefix: 'lady-gaga', queries: ['Lady Gaga performance concert', 'Lady Gaga Oscar award'] },
  { prefix: 'zendaya', queries: ['Zendaya actress premiere', 'Zendaya Euphoria'] },
  { prefix: 'timothee-chalamet', queries: ['Timothée Chalamet film premiere', 'Timothée Chalamet actor'] },
  { prefix: 'mrbeast', queries: ['MrBeast Jimmy Donaldson YouTube', 'MrBeast philanthropy'] },
  { prefix: 'billie-eilish', queries: ['Billie Eilish performance', 'Billie Eilish Grammy'] },
  { prefix: 'dwayne-johnson', queries: ['Dwayne Johnson Rock actor', 'Dwayne Johnson movie premiere'] },
  { prefix: 'bad-bunny', queries: ['Bad Bunny concert', 'Bad Bunny performance'] },
];

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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetch(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];

  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      // Only jpg/png, at least 400px wide, has thumbnail
      return (ii.mime === 'image/jpeg' || ii.mime === 'image/png') && ii.width >= 400 && ii.thumburl;
    })
    .sort((a, b) => {
      // Prefer larger images
      const aSize = a.imageinfo[0].width * a.imageinfo[0].height;
      const bSize = b.imageinfo[0].width * b.imageinfo[0].height;
      return bSize - aSize;
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

  // Import sharp dynamically
  const sharp = (await import('sharp')).default;

  await sharp(res.data)
    .resize(900, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  return stat.size;
}

async function main() {
  console.log('Starting section photo downloads...\n');
  const results = {};

  for (const celeb of PHOTO_PLAN) {
    console.log(`\n=== ${celeb.prefix} ===`);
    results[celeb.prefix] = [];

    for (let i = 0; i < celeb.queries.length; i++) {
      const query = celeb.queries[i];
      const outFile = `${celeb.prefix}-section-${i + 1}.jpg`;
      const outPath = path.join(OUT_DIR, outFile);

      // Skip if already exists
      if (fs.existsSync(outPath)) {
        const stat = fs.statSync(outPath);
        if (stat.size > 5000) {
          console.log(`  [SKIP] ${outFile} already exists (${Math.round(stat.size/1024)}KB)`);
          results[celeb.prefix].push(outFile);
          continue;
        }
      }

      console.log(`  Searching: "${query}"`);
      try {
        const images = await searchWikimedia(query);
        if (images.length === 0) {
          console.log(`  [WARN] No images found for "${query}"`);
          continue;
        }

        // Try top 3 images until one succeeds
        let success = false;
        for (let j = 0; j < Math.min(3, images.length); j++) {
          const img = images[j];
          console.log(`  Trying: ${img.title} (${img.width}x${img.height})`);
          try {
            const url = img.width > 1200 ? img.url : img.originalUrl;
            const size = await downloadAndOptimize(url, outPath);
            console.log(`  [OK] ${outFile} (${Math.round(size/1024)}KB)`);
            results[celeb.prefix].push(outFile);
            success = true;
            break;
          } catch (err) {
            console.log(`  [FAIL] ${err.message}, trying next...`);
          }
        }
        if (!success) console.log(`  [WARN] All attempts failed for "${query}"`);
      } catch (err) {
        console.log(`  [ERROR] ${err.message}`);
      }

      // Small delay between API calls
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n\n=== RESULTS ===');
  for (const [celeb, files] of Object.entries(results)) {
    console.log(`${celeb}: ${files.length > 0 ? files.join(', ') : '(none)'}`);
  }
}

main().catch(console.error);
