// Batch downloader: fetch 2 Wikimedia Commons CC photos per blog post.
// Saves to /public/blog/{slug}-section-1.jpg and -section-2.jpg
// Resizes to 900px wide, JPEG q85, preserves aspect ratio.

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
            'Mozilla/5.0 (compatible; TemperamentBlogDownloader/1.0; +https://192types.com)',
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
  } catch (e) {
    console.log(`    search error: ${e.message}`);
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

// Brand/undesired patterns for filename filtering
const BAD_PATTERNS =
  /logo|signature|flag|coat_of_arms|chart|diagram|graph|map_of|sketch_of|samsung|nike|coca[-_ ]?cola|lg[-_ ]|pepsi|mcdonald|google_|facebook|twitter|copyright|©|®|trademark|icon_of|banner|poster_of|advert|product_of|screenshot|cover_of/i;

async function processAndSave(imageBuffer, outPath) {
  await sharp(imageBuffer)
    .resize(900, null, { withoutEnlargement: false })
    .jpeg({ quality: 85 })
    .toFile(outPath);
}

async function trySearchAndSave(queries, outPath, used) {
  for (const q of queries) {
    console.log(`    search: "${q}"`);
    const files = await searchCommons(q, 20);
    for (const title of files) {
      if (!/\.(jpe?g|png)$/i.test(title)) continue;
      if (BAD_PATTERNS.test(title)) continue;
      if (used.has(title)) continue;

      const info = await getFileInfo(title);
      if (!info?.url) continue;
      if (info.mime && !/image\/(jpeg|png)/.test(info.mime)) continue;
      if (info.width && info.width < 500) continue;

      try {
        console.log(`      try: ${title.slice(0, 70)} (${info.width}x${info.height})`);
        const buf = await fetchBuffer(info.url);
        if (buf.length < 10000) continue;
        await processAndSave(buf, outPath);
        used.add(title);
        console.log(`      saved: ${path.basename(outPath)}`);
        return { ok: true, title };
      } catch (e) {
        console.log(`      fail: ${e.message}`);
        continue;
      }
    }
  }
  return { ok: false };
}

// Per-post queries: [section-1 list, section-2 list]
const POSTS = [
  {
    slug: 'mbti-economics-intro',
    s1: ['stack of coins', 'pile of coins', 'euro coins money'],
    s2: ['shopping bags', 'wallet money', 'korean won banknotes'],
  },
  {
    slug: 'mbti-compatibility-ranking',
    s1: ['couple holding hands', 'couple in love', 'two hands holding'],
    s2: ['couple silhouette sunset', 'couple walking beach', 'couple park'],
  },
  {
    slug: 'mbti-love-style-all-types',
    s1: ['romantic couple', 'couple kiss forehead', 'couple dating'],
    s2: ['love letter rose', 'heart hands', 'couple dancing'],
  },
  {
    slug: 'mbti-career-guide',
    s1: ['office workers meeting', 'business meeting conference', 'professionals working'],
    s2: ['laptop workspace desk', 'woman working computer office', 'coworking space'],
  },
  {
    slug: 'mbti-vs-temperament-192-types',
    s1: ['Hippocrates bust', 'Hippocrates portrait', 'Hippocrates statue'],
    s2: ['Carl Jung portrait', 'Carl Gustav Jung photograph', 'Jung psychologist'],
  },
  {
    slug: 'extraversion-introversion-neuroscience',
    s1: ['human brain anatomy', 'brain illustration', 'neuron drawing'],
    s2: ['neuron synapse', 'brain scan MRI', 'brain cells microscope'],
  },
  {
    slug: 'workplace-mbti-compatibility',
    s1: ['team meeting office', 'coworkers teamwork', 'office collaboration'],
    s2: ['handshake business', 'conference table discussion', 'team brainstorming'],
  },
  {
    slug: 'temperament-stress-response',
    s1: ['stressed person desk', 'tired worker', 'exhausted person'],
    s2: ['meditation relaxation', 'person meditating', 'yoga meditation'],
  },
  {
    slug: 'enfp-infj-compatibility-analysis',
    s1: ['couple talking cafe', 'two people conversation', 'couple deep conversation'],
    s2: ['couple walking autumn', 'couple park bench', 'couple sunset silhouette'],
  },
  {
    slug: 'temperament-leadership-styles',
    s1: ['leader speaking presentation', 'business leader podium', 'manager team'],
    s2: ['team leader office meeting', 'ceo meeting', 'leadership conference'],
  },
  {
    slug: 'mbti-shadow-functions-explained',
    s1: ['Carl Jung photograph', 'Carl Gustav Jung 1910', 'Jung psychiatrist'],
    s2: ['shadow silhouette person', 'human shadow wall', 'mirror reflection face'],
  },
  {
    slug: 'personality-psychology-history',
    s1: ['Hippocrates portrait', 'Hippocrates of Kos', 'Hippocrates bust ancient'],
    s2: ['Sigmund Freud portrait', 'Freud photograph', 'Freud psychoanalyst'],
  },
  {
    slug: 'understanding-child-temperament',
    s1: ['child playing outdoors', 'happy child smiling', 'kid playing park'],
    s2: ['mother child reading', 'parent child together', 'family with child'],
  },
  {
    slug: 'personality-type-learning-styles',
    s1: ['student studying library', 'library books reading', 'student with books'],
    s2: ['classroom students learning', 'student writing notebook', 'student laptop study'],
  },
  {
    slug: 'same-infp-different-temperament',
    s1: ['woman window thinking', 'pensive portrait woman', 'thoughtful person window'],
    s2: ['person silhouette sunset', 'contemplation nature', 'introspection solitude'],
  },
  {
    slug: 'popular-mbti-types-2026-temperament',
    s1: ['portrait young woman smile', 'young person smiling', 'portrait young man'],
    s2: ['group of friends', 'diverse people portrait', 'young adults group'],
  },
  {
    slug: 'mbti-burnout-warning-signs',
    s1: ['tired office worker', 'exhausted at desk', 'burnout stressed'],
    s2: ['person hands on face tired', 'woman stressed laptop', 'headache desk'],
  },
  {
    slug: 'enfp-intj-compatibility-192types',
    s1: ['couple discussion cafe', 'two people laughing talk', 'couple conversation'],
    s2: ['couple walking city', 'couple hand in hand', 'couple dating evening'],
  },
  {
    slug: 'mbti-career-aptitude-temperament',
    s1: ['office workers collaboration', 'job interview meeting', 'professional workspace'],
    s2: ['laptop woman work', 'engineer working', 'workshop craftsman'],
  },
  {
    slug: 'mbti-anger-style-temperament',
    s1: ['angry face portrait', 'frustrated person', 'upset person'],
    s2: ['person shouting emotion', 'facial expression anger', 'emotional portrait'],
  },
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = { success: [], failed: [] };
  const used = new Set();

  for (const post of POSTS) {
    console.log(`\n[${post.slug}]`);

    const out1 = path.join(OUTPUT_DIR, `${post.slug}-section-1.jpg`);
    const out2 = path.join(OUTPUT_DIR, `${post.slug}-section-2.jpg`);

    console.log(`  section-1:`);
    const r1 = await trySearchAndSave(post.s1, out1, used);

    console.log(`  section-2:`);
    const r2 = await trySearchAndSave(post.s2, out2, used);

    if (r1.ok && r2.ok) {
      results.success.push(post.slug);
      console.log(`  OK both sections`);
    } else {
      results.failed.push({
        slug: post.slug,
        s1: r1.ok,
        s2: r2.ok,
      });
      console.log(`  partial/failed - s1:${r1.ok} s2:${r2.ok}`);
    }
  }

  console.log(`\n────────────────────────────`);
  console.log(`Success (both photos): ${results.success.length}/${POSTS.length}`);
  const totalPhotos = results.success.length * 2 +
    results.failed.reduce((sum, f) => sum + (f.s1 ? 1 : 0) + (f.s2 ? 1 : 0), 0);
  console.log(`Total photos saved: ${totalPhotos}/${POSTS.length * 2}`);
  if (results.failed.length) {
    console.log(`\nPartial/failed posts:`);
    for (const f of results.failed) {
      console.log(`  - ${f.slug}: s1=${f.s1 ? 'OK' : 'FAIL'} s2=${f.s2 ? 'OK' : 'FAIL'}`);
    }
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
