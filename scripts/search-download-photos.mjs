// Smart downloader: search Commons for each person, then download the best result.
// For failed ones from the first pass.

import https from 'node:https';
import path from 'node:path';
import sharp from 'sharp';

const OUTPUT_DIR = 'D:/claude/temperament/public/profiles';

function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; TemperamentProfileDownloader/1.0; +https://192types.com)',
          Accept: 'image/*,*/*',
        },
        timeout: 30000,
      },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error('Redirect without location'));
          const newUrl = loc.startsWith('http') ? loc : new URL(loc, url).href;
          res.resume();
          return resolve(fetchBuffer(newUrl, redirectCount + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function fetchJson(url) {
  const buf = await fetchBuffer(url);
  return JSON.parse(buf.toString('utf8'));
}

// Search Commons for files matching query (srnamespace=6 = File: namespace)
async function searchCommons(query, limit = 10) {
  const encoded = encodeURIComponent(query);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&srnamespace=6&srlimit=${limit}&format=json`;
  try {
    const data = await fetchJson(url);
    return (data.query?.search || []).map((r) => r.title);
  } catch {
    return [];
  }
}

async function getFileInfo(title) {
  const encoded = encodeURIComponent(title);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  try {
    const data = await fetchJson(url);
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    return pages[pageId].imageinfo?.[0] ?? null;
  } catch {
    return null;
  }
}

async function processAndSave(imageBuffer, slug) {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  await sharp(imageBuffer)
    .resize(600, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85 })
    .toFile(outPath);
  return outPath;
}

async function tryFromSearch(query, slug) {
  const files = await searchCommons(query, 15);
  for (const title of files) {
    // Skip irrelevant formats
    if (!/\.(jpe?g|png)$/i.test(title)) continue;
    // Skip logos, charts, family-tree type files
    if (/logo|signature|flag|chart|map|coat_of_arms/i.test(title)) continue;

    const info = await getFileInfo(title);
    if (!info?.url) continue;
    // Image big enough?
    if (info.width && info.width < 400) continue;
    try {
      console.log(`  try: ${title} (${info.width}×${info.height})`);
      const buf = await fetchBuffer(info.url);
      if (buf.length < 5000) continue;
      await processAndSave(buf, slug);
      console.log(`  ✓ saved /profiles/${slug}.jpg`);
      return true;
    } catch (e) {
      console.log(`    fail: ${e.message}`);
      continue;
    }
  }
  return false;
}

// Failed slugs from first pass: use broad search queries
const failedTargets = [
  { slug: 'blackpink-lisa', queries: ['Lalisa Manobal', 'Blackpink Lisa'] },
  { slug: 'blackpink-jisoo', queries: ['Jisoo Blackpink', 'Kim Jisoo 1995'] },
  { slug: 'newjeans-minji', queries: ['NewJeans Minji', 'Kim Minji NewJeans'] },
  { slug: 'newjeans-haerin', queries: ['NewJeans Haerin', 'Kang Haerin'] },
  { slug: 'newjeans-danielle', queries: ['NewJeans Danielle', 'Danielle Marsh'] },
  { slug: 'ive-wonyoung', queries: ['Jang Wonyoung', 'IVE Wonyoung'] },
  { slug: 'ive-yujin', queries: ['An Yujin', 'IVE Yujin'] },
  { slug: 'aespa-karina', queries: ['Aespa Karina', 'Yoo Jimin Karina'] },
  { slug: 'twice-nayeon', queries: ['Twice Nayeon', 'Im Nayeon'] },
  { slug: 'bts-jungkook', queries: ['Jungkook BTS', 'Jeon Jungkook'] },
  { slug: 'bts-v', queries: ['V BTS Kim Taehyung', 'Kim Taehyung singer'] },
  { slug: 'bts-jimin', queries: ['Jimin BTS', 'Park Jimin 1995'] },
  { slug: 'bts-jin', queries: ['Jin BTS', 'Kim Seokjin BTS'] },
  { slug: 'seventeen-woozi', queries: ['Seventeen Woozi', 'Lee Jihoon Seventeen'] },
  { slug: 'gdragon', queries: ['G-Dragon', 'Kwon Jiyong G-Dragon'] },
  { slug: 'hyun-bin', queries: ['Hyun Bin', 'Kim Taepyung'] },
  { slug: 'son-ye-jin', queries: ['Son Yejin', 'Son Ye-jin'] },
  { slug: 'gong-yoo', queries: ['Gong Yoo', 'Gong Ji-chul'] },
  { slug: 'lee-min-ho', queries: ['Lee Min-ho actor', 'Lee Minho 1987'] },
  { slug: 'cha-eun-woo', queries: ['Cha Eun-woo', 'Lee Dongmin Astro'] },
  { slug: 'kim-soo-hyun', queries: ['Kim Soo-hyun actor', 'Kim Soohyun 1988'] },
  { slug: 'jun-ji-hyun', queries: ['Jun Ji-hyun', 'Jeon Jihyun'] },
  { slug: 'song-hye-kyo', queries: ['Song Hye-kyo', 'Song Hyekyo'] },
  { slug: 'jung-hae-in', queries: ['Jung Hae-in', 'Jung Haein'] },
  { slug: 'park-bo-gum', queries: ['Park Bo-gum', 'Park Bogum'] },
  { slug: 'kylian-mbappe', queries: ['Kylian Mbappe', 'Mbappe France'] },
  { slug: 'ariana-grande', queries: ['Ariana Grande', 'Ariana Grande singer'] },
  { slug: 'rihanna', queries: ['Rihanna', 'Robyn Fenty'] },
  { slug: 'margot-robbie', queries: ['Margot Robbie', 'Margot Robbie actress'] },
  { slug: 'lee-jae-yong', queries: ['Lee Jae-yong Samsung', 'Jay Y. Lee'] },
];

const success = [];
const failed = [];

for (const t of failedTargets) {
  console.log(`\n[${t.slug}]`);
  let done = false;
  for (const q of t.queries) {
    console.log(`  search: "${q}"`);
    if (await tryFromSearch(q, t.slug)) {
      success.push(t.slug);
      done = true;
      break;
    }
  }
  if (!done) {
    console.log(`  ✗ FAILED all queries for ${t.slug}`);
    failed.push(t.slug);
  }
}

console.log(`\n────────────────────────────`);
console.log(`Success: ${success.length}/${failedTargets.length}`);
console.log(`Failed : ${failed.length}`);
if (failed.length) console.log(`Failed slugs: ${failed.join(', ')}`);
