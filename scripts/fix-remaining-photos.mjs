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
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PersonalityTestBlog/1.0)',
        'Accept': 'image/*,*/*'
      }
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
      if (ii.width < 600) return false;
      return true; // Return ALL orientations, we'll handle it
    })
    .map(p => ({
      title: p.title,
      thumburl: p.imageinfo[0].thumburl,
      url: p.imageinfo[0].url,
      width: p.imageinfo[0].width,
      height: p.imageinfo[0].height,
      ratio: (p.imageinfo[0].width / p.imageinfo[0].height).toFixed(2),
      isLandscape: p.imageinfo[0].width / p.imageinfo[0].height >= 1.2,
    }));
}

async function downloadAndSave(imageUrl, outputPath, position = 'centre') {
  const res = await fetchUrl(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const sharp = (await import('sharp')).default;

  const meta = await sharp(res.data).metadata();
  const ratio = meta.width / meta.height;
  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${ratio.toFixed(2)})`);

  // For landscape sources: normal cover crop
  // For portrait sources with ratio > 0.8: use top-center to capture face+upper body
  const cropPosition = ratio >= 1.2 ? 'centre' : (position || 'north');

  await sharp(res.data)
    .resize(900, 600, { fit: 'cover', position: cropPosition })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  return stat.size;
}

// Remaining photos to fix - with prioritized search strategies
const REMAINING = [
  {
    file: 'billie-eilish-mbti.jpg',
    searches: [
      // These exist on Wikimedia, were just rate-limited before
      { query: 'Billie Eilish Pukkelpop 2019', landscapeOnly: true },
      { query: 'Billie Eilish Coachella 2019', landscapeOnly: true },
      { query: 'Billie Eilish concert 2019', landscapeOnly: true },
    ]
  },
  {
    file: 'taylor-swift-mbti.jpg',
    searches: [
      { query: 'Taylor Swift RED tour concert', landscapeOnly: true },
      { query: 'Taylor Swift 1989 tour', landscapeOnly: true },
      { query: 'Taylor Swift Speak Now tour', landscapeOnly: true },
      { query: 'Taylor Swift concert 2013', landscapeOnly: true },
      { query: 'Taylor Swift performing live', landscapeOnly: false },
    ]
  },
  {
    file: 'taylor-swift-section-1.jpg',
    searches: [
      { query: 'Taylor Swift reputation tour stage', landscapeOnly: true },
      { query: 'Taylor Swift Speak Now concert', landscapeOnly: true },
      { query: 'Taylor Swift performing guitar', landscapeOnly: false },
      { query: 'Taylor Swift award acceptance', landscapeOnly: true },
    ]
  },
  {
    file: 'taylor-swift-section-2.jpg',
    searches: [
      { query: 'Taylor Swift Fearless tour', landscapeOnly: true },
      { query: 'Taylor Swift concert crowd stage', landscapeOnly: true },
      { query: 'Taylor Swift singing microphone', landscapeOnly: false },
    ]
  },
  {
    file: 'zendaya-mbti.jpg',
    searches: [
      { query: 'Zendaya Spider-Man Homecoming premiere', landscapeOnly: false },
      { query: 'Zendaya Dune premiere', landscapeOnly: false },
      { query: 'Zendaya Coleman 2023', landscapeOnly: false },
      { query: 'Zendaya panel discussion SDCC', landscapeOnly: true },
    ]
  },
  {
    file: 'zendaya-section-2.jpg',
    searches: [
      { query: 'Zendaya Euphoria HBO premiere', landscapeOnly: false },
      { query: 'Zendaya Greatest Showman premiere', landscapeOnly: false },
      { query: 'Zendaya Met Gala', landscapeOnly: false },
    ]
  },
  {
    file: 'bad-bunny-mbti.jpg',
    searches: [
      { query: 'Bad Bunny performing concert stage', landscapeOnly: true },
      { query: 'Bad Bunny Coachella 2023', landscapeOnly: true },
      { query: 'Bad Bunny reggaeton live', landscapeOnly: false },
      { query: 'Benito Antonio Martinez Ocasio', landscapeOnly: false },
    ]
  },
];

async function main() {
  console.log('=== Fixing remaining photos (with proper rate limit handling) ===\n');
  const sharp = (await import('sharp')).default;

  let successCount = 0;

  for (const item of REMAINING) {
    const outPath = path.join(OUT_DIR, item.file);
    console.log(`\n📸 ${item.file}`);

    let success = false;
    for (const s of item.searches) {
      console.log(`  🔍 "${s.query}"`);

      // Add significant delay between API calls to avoid rate limiting
      await sleep(2000);

      try {
        const all = await searchWikimedia(s.query);
        const candidates = s.landscapeOnly ? all.filter(i => i.isLandscape) : all;
        console.log(`    Found: ${candidates.length} candidates (${all.length} total)`);

        // Try each candidate with delays
        for (let i = 0; i < Math.min(3, candidates.length); i++) {
          const img = candidates[i];

          // Skip clearly wrong images (album covers, signatures, logos)
          const lowerTitle = img.title.toLowerCase();
          if (lowerTitle.includes('logo') || lowerTitle.includes('sig.') ||
              lowerTitle.includes('album') || lowerTitle.includes('portada') ||
              lowerTitle.includes('cover') || lowerTitle.includes('flag') ||
              lowerTitle.includes('.svg') || lowerTitle.includes('icon')) {
            console.log(`    ⏭️ Skipping non-photo: ${img.title}`);
            continue;
          }

          console.log(`    Trying: ${img.title} (${img.width}x${img.height}, ratio:${img.ratio})`);
          await sleep(2000); // Delay before each download

          try {
            // Use thumburl (scaled version) when available to avoid 429
            const url = img.thumburl || img.url;
            const size = await downloadAndSave(url, outPath, img.isLandscape ? 'centre' : 'north');
            console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
            success = true;
            break;
          } catch (err) {
            console.log(`    ❌ ${err.message}`);
            if (err.message.includes('429')) {
              console.log(`    ⏳ Rate limited, waiting 5s...`);
              await sleep(5000);
            }
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`    ❌ Search failed: ${err.message}`);
      }
    }

    if (success) successCount++;
    else console.log(`  ⚠️ STILL FAILED: ${item.file}`);
  }

  // Final check
  console.log('\n\n=== FINAL VERIFICATION ===');
  for (const item of REMAINING) {
    const p = path.join(OUT_DIR, item.file);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      const stat = fs.statSync(p);
      console.log(`${item.file.padEnd(40)} ${meta.width}x${meta.height} ${Math.round(stat.size/1024)}KB`);
    }
  }
  console.log(`\nFixed: ${successCount}/${REMAINING.length}`);
}

main().catch(console.error);
