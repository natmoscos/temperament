// Replace 8 awkward blog photos with better CC-licensed Wikimedia Commons photos.
// Processing: sharp().resize(900, null).jpeg({quality: 85}) — preserve aspect, 900px wide.

import https from 'node:https';
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';

const OUTPUT_DIR = 'D:/claude/temperament/public/blog';

function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; TemperamentBlogPhotoBot/1.0; +https://192types.com)',
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

async function searchCommons(query, limit = 20) {
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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
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

// Bad filename tokens — logos, brands, political, military, engravings, paintings
const BAD_TOKENS = /(logo|signature|flag|coat_of_arms|chart|map|advertisement|campaign|political|military|army|navy|soldier|weapon|engraving|lithograph|19th_century|18th_century|17th_century|16th_century|medieval|renaissance|baroque|painting|portrait_of|rembrandt|da_vinci|caravaggio|van_gogh|monet|picasso|lg_|nike_|samsung_|apple_inc|coca_cola|pepsi|adidas|mcdonald)/i;

// Filename brand/commercial tokens (case-insensitive standalone words)
const BRAND_TOKENS = /\b(LG|Nike|Adidas|Samsung|Apple|Sony|Microsoft|Google|Amazon|Facebook|Meta|Coca[-_ ]?Cola|Pepsi|McDonald|Starbucks|IBM|Intel|Huawei|Xiaomi)\b/i;

async function processAndSave(imageBuffer, filename) {
  const outPath = path.join(OUTPUT_DIR, filename);
  await sharp(imageBuffer)
    .resize(900, null)
    .jpeg({ quality: 85 })
    .toFile(outPath);
  return outPath;
}

async function tryFromSearch(query, filename) {
  const files = await searchCommons(query, 20);
  for (const title of files) {
    if (!/\.(jpe?g|png)$/i.test(title)) continue;
    if (BAD_TOKENS.test(title)) continue;
    if (BRAND_TOKENS.test(title)) continue;

    const info = await getFileInfo(title);
    if (!info?.url) continue;
    if (info.width && info.width < 600) continue;

    // Prefer reasonable aspect ratios (not extreme panoramas)
    if (info.width && info.height) {
      const ar = info.width / info.height;
      if (ar > 3 || ar < 0.4) continue;
    }

    try {
      console.log(`  try: ${title} (${info.width}x${info.height})`);
      const buf = await fetchBuffer(info.url);
      if (buf.length < 10000) continue;
      await processAndSave(buf, filename);
      console.log(`  OK saved /blog/${filename} (source: ${title})`);
      return title;
    } catch (e) {
      console.log(`    fail: ${e.message}`);
      continue;
    }
  }
  return null;
}

const targets = [
  {
    filename: 'mbti-love-style-all-types-section-1.jpg',
    queries: [
      'couple sunset silhouette',
      'couple holding hands',
      'young couple park',
      'couple love',
    ],
  },
  {
    filename: 'mbti-career-guide-section-1.jpg',
    queries: [
      'modern office workplace',
      'business professional laptop',
      'office desk work',
      'coworking space',
    ],
  },
  {
    filename: 'extraversion-introversion-neuroscience-section-1.jpg',
    queries: [
      'human brain MRI',
      'neuron synapse illustration',
      'brain 3D rendering',
      'cerebral cortex diagram',
      'brain scan',
    ],
  },
  {
    filename: 'temperament-stress-response-section-1.jpg',
    queries: [
      'stressed woman office',
      'anxiety person',
      'tired professional',
      'headache stress',
      'person worried',
    ],
  },
  {
    filename: 'temperament-leadership-styles-section-2.jpg',
    queries: [
      'business team meeting',
      'speaker conference presentation',
      'team leader office',
      'workshop collaboration',
    ],
  },
  {
    filename: 'popular-mbti-types-2026-temperament-section-1.jpg',
    queries: [
      'diverse group young people',
      'friends smiling group',
      'young people city',
      'group of friends',
    ],
  },
  {
    filename: 'mbti-career-aptitude-temperament-section-1.jpg',
    queries: [
      'woman working laptop',
      'businesswoman office',
      'professional writing notebook',
      'career planning',
    ],
  },
  {
    filename: 'mbti-anger-style-temperament-section-2.jpg',
    queries: [
      'couple arguing',
      'angry person expression',
      'disagreement conflict',
      'frustrated man',
      'argument',
    ],
  },
];

const oldSizes = {};
for (const t of targets) {
  const p = path.join(OUTPUT_DIR, t.filename);
  try {
    oldSizes[t.filename] = fs.statSync(p).size;
  } catch {
    oldSizes[t.filename] = 0;
  }
}

const results = [];

for (const t of targets) {
  console.log(`\n[${t.filename}]`);
  let chosen = null;
  for (const q of t.queries) {
    console.log(`  search: "${q}"`);
    chosen = await tryFromSearch(q, t.filename);
    if (chosen) break;
  }
  results.push({ filename: t.filename, source: chosen });
}

console.log(`\n----- Summary -----`);
for (const r of results) {
  const p = path.join(OUTPUT_DIR, r.filename);
  let newSize = 0;
  try {
    newSize = fs.statSync(p).size;
  } catch {}
  const oldSize = oldSizes[r.filename] || 0;
  const changed = newSize !== oldSize;
  console.log(
    `${r.source ? 'OK' : 'FAIL'}  ${r.filename}  old=${oldSize}  new=${newSize}  changed=${changed}  src=${r.source ?? '(none)'}`
  );
}

const okCount = results.filter((r) => r.source).length;
console.log(`\nSuccess: ${okCount}/${targets.length}`);
