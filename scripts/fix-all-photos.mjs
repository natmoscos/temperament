import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'PersonalityTestBlog/1.0 (contact@192types.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks) }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function searchWikimedia(query, limit = 20) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetchUrl(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];

  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      if (ii.width < 800) return false;
      // Only landscape images (ratio >= 1.2)
      const ratio = ii.width / ii.height;
      return ratio >= 1.2;
    })
    .sort((a, b) => {
      const aRatio = a.imageinfo[0].width / a.imageinfo[0].height;
      const bRatio = b.imageinfo[0].width / b.imageinfo[0].height;
      // Prefer 3:2 to 16:9 ratios, and higher resolution
      const aScore = -Math.abs(aRatio - 1.5) + (a.imageinfo[0].width > 2000 ? 0.3 : 0);
      const bScore = -Math.abs(bRatio - 1.5) + (b.imageinfo[0].width > 2000 ? 0.3 : 0);
      return bScore - aScore;
    })
    .map(p => ({
      title: p.title,
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      originalUrl: p.imageinfo[0].url,
      width: p.imageinfo[0].width,
      height: p.imageinfo[0].height,
      ratio: (p.imageinfo[0].width / p.imageinfo[0].height).toFixed(2),
    }));
}

async function downloadAndSave(imageUrl, outputPath) {
  const res = await fetchUrl(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const sharp = (await import('sharp')).default;

  const meta = await sharp(res.data).metadata();
  const srcRatio = meta.width / meta.height;
  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${srcRatio.toFixed(2)})`);

  // Resize to 900x600 with cover crop - since source is already landscape,
  // this won't cause extreme face closeups
  await sharp(res.data)
    .resize(900, 600, {
      fit: 'cover',
      position: 'centre'
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  return stat.size;
}

// ALL photos that need fixing
const FIXES = [
  // === THUMBNAILS (-mbti.jpg) with extreme closeups ===
  {
    file: 'taylor-swift-mbti.jpg',
    queries: [
      'Taylor Swift Eras Tour stage wide',
      'Taylor Swift concert performance stage',
      'Taylor Swift award ceremony speech',
      'Taylor Swift press conference event',
    ]
  },
  {
    file: 'elon-musk-mbti.jpg',
    queries: [
      'Elon Musk SpaceX presentation stage',
      'Elon Musk Tesla event keynote',
      'Elon Musk conference speech podium',
      'Elon Musk interview panel event',
    ]
  },
  {
    file: 'ronaldo-mbti.jpg',
    queries: [
      'Cristiano Ronaldo football match action',
      'Cristiano Ronaldo goal celebration stadium',
      'Cristiano Ronaldo press conference',
      'Cristiano Ronaldo training pitch',
    ]
  },
  {
    file: 'lady-gaga-mbti.jpg',
    queries: [
      'Lady Gaga concert stage performance',
      'Lady Gaga award ceremony stage',
      'Lady Gaga Super Bowl halftime',
      'Lady Gaga film premiere event',
    ]
  },
  {
    file: 'zendaya-mbti.jpg',
    queries: [
      'Zendaya red carpet event wide',
      'Zendaya film premiere photocall',
      'Zendaya Emmy award ceremony',
      'Zendaya fashion show event',
    ]
  },
  {
    file: 'timothee-chalamet-mbti.jpg',
    queries: [
      'Timothée Chalamet film premiere photocall',
      'Timothée Chalamet Venice film festival',
      'Timothée Chalamet press conference event',
      'Timothée Chalamet red carpet wide',
    ]
  },
  {
    file: 'dwayne-johnson-mbti.jpg',
    queries: [
      'Dwayne Johnson movie premiere event wide',
      'Dwayne Johnson press tour event',
      'Dwayne Johnson film premiere photocall',
      'The Rock movie event stage',
    ]
  },
  {
    file: 'bad-bunny-mbti.jpg',
    queries: [
      'Bad Bunny concert stage performance',
      'Bad Bunny Grammy award ceremony',
      'Bad Bunny music festival stage',
      'Bad Bunny live performance wide',
    ]
  },
  {
    file: 'billie-eilish-mbti.jpg',
    queries: [
      'Billie Eilish concert stage performance',
      'Billie Eilish Grammy award stage',
      'Billie Eilish festival performance wide',
      'Billie Eilish music event stage',
    ]
  },

  // === SECTION photos with WRONG content ===
  {
    file: 'taylor-swift-section-1.jpg',
    queries: [
      'Taylor Swift interview event',
      'Taylor Swift album release event',
      'Taylor Swift backstage candid',
      'Taylor Swift studio recording session',
    ]
  },
  {
    file: 'taylor-swift-section-2.jpg',
    queries: [
      'Taylor Swift fan meeting event',
      'Taylor Swift music video behind scenes',
      'Taylor Swift performing guitar acoustic',
      'Taylor Swift charity event appearance',
    ]
  },

  // === Borderline closeup section photo ===
  {
    file: 'zendaya-section-2.jpg',
    queries: [
      'Zendaya photoshoot fashion editorial wide',
      'Zendaya panel discussion event',
      'Zendaya Euphoria premiere event',
      'Zendaya Dune premiere red carpet',
    ]
  },
];

async function main() {
  console.log('=== Fixing ALL broken celebrity photos ===\n');
  console.log(`Total photos to fix: ${FIXES.length}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const fix of FIXES) {
    const outPath = path.join(OUT_DIR, fix.file);
    console.log(`\n📸 ${fix.file}`);

    let success = false;
    for (const query of fix.queries) {
      console.log(`  🔍 Searching: "${query}"`);
      try {
        const images = await searchWikimedia(query);
        console.log(`  Found: ${images.length} landscape images`);

        for (let i = 0; i < Math.min(5, images.length); i++) {
          const img = images[i];
          console.log(`  Trying: ${img.title} (${img.width}x${img.height}, ratio:${img.ratio})`);
          try {
            const url = img.width > 1200 ? img.url : img.originalUrl;
            const size = await downloadAndSave(url, outPath);
            console.log(`  ✅ Saved ${fix.file} (${Math.round(size / 1024)}KB)`);
            success = true;
            break;
          } catch (err) {
            console.log(`  ❌ Download failed: ${err.message}`);
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`  ❌ Search failed: ${err.message}`);
      }
      // Small delay between queries
      await new Promise(r => setTimeout(r, 500));
    }

    if (success) {
      successCount++;
    } else {
      failCount++;
      console.log(`  ⚠️ FAILED to fix ${fix.file}!`);
    }

    // Delay between photos to avoid rate limiting
    await new Promise(r => setTimeout(r, 800));
  }

  // Final verification
  console.log('\n\n=== FINAL VERIFICATION ===');
  const sharp = (await import('sharp')).default;
  for (const fix of FIXES) {
    const p = path.join(OUT_DIR, fix.file);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      const stat = fs.statSync(p);
      const ratio = (meta.width / meta.height).toFixed(2);
      const status = ratio >= 1.4 ? '✅' : '⚠️';
      console.log(`${status} ${fix.file.padEnd(40)} ${meta.width}x${meta.height} ratio:${ratio} ${Math.round(stat.size / 1024)}KB`);
    } else {
      console.log(`❌ ${fix.file.padEnd(40)} FILE MISSING`);
    }
  }

  console.log(`\n=== Results: ${successCount} success, ${failCount} failed ===`);
}

main().catch(console.error);
