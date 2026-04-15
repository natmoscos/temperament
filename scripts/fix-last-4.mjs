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
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PersonalityTestBlog/1.0)', 'Accept': '*/*' }
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

async function searchWikimedia(query, limit = 40) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetchUrl(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];
  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      if (ii.width < 800 && ii.height < 800) return false;
      if (ii.width / ii.height > 3) return false;
      return true;
    })
    .map(p => {
      const ii = p.imageinfo[0];
      return { title: p.title, thumburl: ii.thumburl, url: ii.url, width: ii.width, height: ii.height, ratio: (ii.width / ii.height).toFixed(2) };
    });
}

function isGoodCandidateTitle(title, celebrity) {
  const lower = title.toLowerCase();
  // Must skip non-person items
  const skip = ['logo', 'sig.', 'signature', 'album', 'portada', 'cover', 'flag',
                 '.svg', 'icon', 'map', 'chart', 'diagram', 'screenshot', 'ticket',
                 'poster', 'flyer', 'banner', 'stamp', 'coin', 'trophy',
                 'songbook', 'trail', 'museum', 'display', 'exhibit', 'mannequin',
                 'bus', 'train', 'car', 'plane', 'atenu', 'kmbbus', 'route',
                 'building', 'arena empty', 'venue', 'clock', 't-shirt', 'shirt',
                 'mia (portada)', 'yhlqmdlg'];
  if (skip.some(s => lower.includes(s))) return false;
  // Must contain celebrity name reference (at least partial)
  const nameCheck = celebrity.toLowerCase().split(' ');
  return nameCheck.some(n => lower.includes(n));
}

async function downloadAndCrop(imageUrl, outputPath) {
  const res = await fetchUrl(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const sharp = (await import('sharp')).default;
  const meta = await sharp(res.data).metadata();
  const ratio = meta.width / meta.height;
  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${ratio.toFixed(2)})`);

  if (ratio >= 1.2) {
    await sharp(res.data)
      .resize(900, 600, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);
  } else {
    // Portrait — extract upper 65% to get face+upper body, then crop
    const cropH = Math.round(meta.height * 0.65);
    await sharp(res.data)
      .extract({ left: 0, top: 0, width: meta.width, height: cropH })
      .resize(900, 600, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);
  }

  return fs.statSync(outputPath).size;
}

const FIXES = [
  {
    file: 'taylor-swift-mbti.jpg',
    celebrity: 'Taylor Swift',
    searches: [
      // Need ACTUAL Taylor Swift performing, not museum items
      'Taylor Swift Speak Now tour 2011',
      'Taylor Swift RED tour 2013 singing',
      'Taylor Swift 1989 world tour live',
      'Taylor Swift 2014 concert',
      'Taylor Swift country music awards performing',
    ]
  },
  {
    file: 'taylor-swift-section-1.jpg',
    celebrity: 'Taylor Swift',
    searches: [
      'Taylor Swift Fearless tour concert',
      'Taylor Swift 2010 concert live',
      'Taylor Swift Grammy awards performing 2016',
      'Taylor Swift American Music Awards 2019',
    ]
  },
  {
    file: 'zendaya-section-2.jpg',
    celebrity: 'Zendaya',
    searches: [
      'Zendaya San Diego Comic-Con',
      'Zendaya SDCC Spider-Man',
      'Zendaya 2017 event press',
      'Zendaya Coleman panel',
    ]
  },
  {
    file: 'bad-bunny-mbti.jpg',
    celebrity: 'Bad Bunny',
    searches: [
      'Bad Bunny performing live',
      'Bad Bunny concert stage 2022',
      'Bad Bunny Premio Lo Nuestro',
      'Bad Bunny Latin Grammy',
      'Bad Bunny Billboard awards',
    ]
  },
];

async function main() {
  console.log('=== Final 4 photos fix ===\n');

  for (const item of FIXES) {
    const outPath = path.join(OUT_DIR, item.file);
    console.log(`\n📸 ${item.file}`);

    let success = false;
    for (const query of item.searches) {
      console.log(`  🔍 "${query}"`);
      await sleep(3000);

      try {
        const results = await searchWikimedia(query);
        const filtered = results
          .filter(r => isGoodCandidateTitle(r.title, item.celebrity))
          .sort((a, b) => {
            const aL = parseFloat(a.ratio) >= 1.2 ? 1 : 0;
            const bL = parseFloat(b.ratio) >= 1.2 ? 1 : 0;
            if (aL !== bL) return bL - aL;
            return (b.width * b.height) - (a.width * a.height);
          });

        console.log(`    Good candidates: ${filtered.length} (of ${results.length} total)`);

        if (filtered.length > 0) {
          // Show all candidates
          filtered.slice(0, 5).forEach((f, i) => console.log(`      ${i}: ${f.title} (${f.width}x${f.height} r:${f.ratio})`));
        }

        for (let i = 0; i < Math.min(3, filtered.length); i++) {
          const img = filtered[i];
          console.log(`    Trying #${i}: ${img.title}`);
          await sleep(3000);
          try {
            const url = img.thumburl || img.url;
            const size = await downloadAndCrop(url, outPath);
            console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
            success = true;
            break;
          } catch (err) {
            console.log(`    ❌ ${err.message}`);
            if (err.message.includes('429')) await sleep(8000);
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`    ❌ Search error: ${err.message}`);
      }
    }

    if (!success) console.log(`  ⚠️ FAILED: ${item.file}`);
  }
}

main().catch(console.error);
