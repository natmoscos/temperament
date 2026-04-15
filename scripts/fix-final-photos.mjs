import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PersonalityTestBlog/1.0)', 'Accept': 'image/*,*/*' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let next = res.headers.location;
        if (next.startsWith('/')) { const u = new URL(url); next = u.origin + next; }
        return fetchUrl(next, maxRedirects - 1).then(resolve).catch(reject);
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

async function searchWikimedia(query, limit = 30) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetchUrl(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];
  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      // Require minimum resolution for quality
      if (ii.width < 800 && ii.height < 800) return false;
      // Skip very wide panoramic shots where person would be tiny
      if (ii.width / ii.height > 3) return false;
      return true;
    })
    .map(p => {
      const ii = p.imageinfo[0];
      return {
        title: p.title,
        thumburl: ii.thumburl,
        url: ii.url,
        width: ii.width,
        height: ii.height,
        ratio: (ii.width / ii.height).toFixed(2),
      };
    });
}

// Filter: skip non-photo items based on title
function isLikelyPhoto(title) {
  const lower = title.toLowerCase();
  const skip = ['logo', 'sig.', 'signature', 'album', 'portada', 'cover', 'flag',
                 '.svg', 'icon', 'map', 'chart', 'diagram', 'screenshot', 'ticket',
                 'poster', 'flyer', 'banner', 'stamp', 'coin', 'trophy', 'award',
                 'arena', 'stadium', 'venue', 'building', 'clock', 't-shirt', 'shirt',
                 'bus', 'train', 'car', 'plane', 'atenu', 'kmbbus'];
  return !skip.some(s => lower.includes(s));
}

// Smart crop: for portrait sources, extract face+upper body region
async function smartCropAndSave(imageBuffer, outputPath) {
  const sharp = (await import('sharp')).default;
  const meta = await sharp(imageBuffer).metadata();
  const ratio = meta.width / meta.height;

  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${ratio.toFixed(2)})`);

  if (ratio >= 1.2) {
    // Landscape source - simple center crop
    await sharp(imageBuffer)
      .resize(900, 600, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);
  } else if (ratio >= 0.6) {
    // Portrait/square source — use "attention" mode which detects faces/interesting areas
    // First extract upper portion (top 70%) to focus on face+upper body
    const cropHeight = Math.round(meta.height * 0.7);
    await sharp(imageBuffer)
      .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
      .resize(900, 600, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);
  } else {
    // Very narrow portrait - just use attention crop
    await sharp(imageBuffer)
      .resize(900, 600, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);
  }

  const stat = fs.statSync(outputPath);
  return stat.size;
}

// Photos still needing fixes
const FIXES = [
  {
    file: 'taylor-swift-mbti.jpg',
    searches: [
      // Try to find actual performer photos, not venue/setup
      '"Taylor Swift" performing microphone',
      '"Taylor Swift" singing concert',
      '"Taylor Swift" CMA awards',
      'Taylor Swift American Music Awards',
      'Taylor Swift GMA performance',
    ]
  },
  {
    file: 'taylor-swift-section-1.jpg',
    searches: [
      'Taylor Swift Reputation Stadium Tour performing',
      'Taylor Swift 1989 world tour singing',
      'Taylor Swift Eras tour performing',
      '"Taylor Swift" live performance 2019',
    ]
  },
  {
    file: 'taylor-swift-section-2.jpg',
    searches: [
      'Taylor Swift Speak Now tour performing',
      'Taylor Swift Red Tour performing close',
      '"Taylor Swift" Grammy performance',
      '"Taylor Swift" singing 2015',
    ]
  },
  {
    file: 'zendaya-mbti.jpg',
    searches: [
      '"Zendaya" 2022 portrait',
      'Zendaya Coleman actress',
      '"Zendaya" event gala',
      '"Zendaya" premiere photo 2019',
    ]
  },
  {
    file: 'zendaya-section-2.jpg',
    searches: [
      '"Zendaya" 2018 event',
      'Zendaya Coleman SDCC panel',
      '"Zendaya" fashion week Paris',
      '"Zendaya" interview press',
    ]
  },
  {
    file: 'bad-bunny-mbti.jpg',
    searches: [
      '"Bad Bunny" performing 2022',
      '"Bad Bunny" concert 2023',
      '"Bad Bunny" "World\'s Hottest Tour"',
      'Bad Bunny festival performer',
      'Bad Bunny Grammy 2024',
    ]
  },
];

async function main() {
  console.log('=== Final photo fix attempt ===\n');
  const sharp = (await import('sharp')).default;

  for (const item of FIXES) {
    const outPath = path.join(OUT_DIR, item.file);
    console.log(`\n📸 ${item.file}`);

    let success = false;
    for (const query of item.searches) {
      console.log(`  🔍 "${query}"`);
      await sleep(3000);

      try {
        const results = await searchWikimedia(query);
        // Filter out non-photo items and prioritize landscape, then high-res portrait
        const filtered = results
          .filter(r => isLikelyPhoto(r.title))
          .sort((a, b) => {
            // Prefer landscape, then larger resolution
            const aLand = parseFloat(a.ratio) >= 1.2 ? 1 : 0;
            const bLand = parseFloat(b.ratio) >= 1.2 ? 1 : 0;
            if (aLand !== bLand) return bLand - aLand;
            // Among same orientation, prefer higher resolution
            return (b.width * b.height) - (a.width * a.height);
          });

        console.log(`    Found: ${filtered.length} candidate photos`);

        for (let i = 0; i < Math.min(3, filtered.length); i++) {
          const img = filtered[i];
          // Skip very low res
          if (img.width < 600 || img.height < 600) {
            console.log(`    ⏭️ Too small: ${img.title} (${img.width}x${img.height})`);
            continue;
          }
          console.log(`    Trying: ${img.title} (${img.width}x${img.height}, ratio:${img.ratio})`);
          await sleep(2500);

          try {
            const url = img.thumburl || img.url;
            const res = await fetchUrl(url);
            if (res.status !== 200) throw new Error(`HTTP ${res.status}`);

            const size = await smartCropAndSave(res.data, outPath);
            console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
            success = true;
            break;
          } catch (err) {
            console.log(`    ❌ ${err.message}`);
            if (err.message.includes('429')) {
              console.log(`    ⏳ Rate limited, waiting 8s...`);
              await sleep(8000);
            }
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`    ❌ Search failed: ${err.message}`);
      }
    }

    if (!success) console.log(`  ⚠️ STILL FAILED: ${item.file}`);
  }

  // Verify all problem photos
  console.log('\n\n=== ALL CELEBRITY PHOTO STATUS ===');
  const allFiles = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  for (const f of allFiles.sort()) {
    const p = path.join(OUT_DIR, f);
    const meta = await sharp(p).metadata();
    const stat = fs.statSync(p);
    const ratio = (meta.width / meta.height).toFixed(2);
    console.log(`${f.padEnd(45)} ${meta.width}x${meta.height} ratio:${ratio} ${Math.round(stat.size/1024)}KB`);
  }
}

main().catch(console.error);
