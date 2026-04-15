import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'PersonalityTestBlog/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let next = res.headers.location;
        if (next.startsWith('/')) {
          const u = new URL(url);
          next = u.origin + next;
        }
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

// Search Wikimedia by exact filename or title keyword
async function getWikimediaImageUrl(filename) {
  // Use the Wikimedia API to get direct image URL from a known filename
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200&format=json`;
  const res = await fetchUrl(url);
  const json = JSON.parse(res.data.toString());
  const pages = json.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (!page?.imageinfo?.[0]) return null;
  const ii = page.imageinfo[0];
  return {
    url: ii.thumburl || ii.url,
    originalUrl: ii.url,
    width: ii.width,
    height: ii.height,
    mime: ii.mime
  };
}

// Search by category members
async function searchCategory(category, limit = 30) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmtype=file&cmlimit=${limit}&prop=imageinfo&format=json`;
  const res = await fetchUrl(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.categorymembers) return [];

  // Get image info for all returned files
  const titles = json.query.categorymembers.map(m => m.title).join('|');
  if (!titles) return [];

  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200&format=json`;
  const infoRes = await fetchUrl(infoUrl);
  const infoJson = JSON.parse(infoRes.data.toString());

  return Object.values(infoJson.query?.pages || {})
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      if (ii.width < 600) return false;
      return ii.width / ii.height >= 1.2;
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

// General search
async function searchWikimedia(query, limit = 25) {
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
      return ii.width / ii.height >= 1.2;
    })
    .sort((a, b) => {
      const aR = a.imageinfo[0].width / a.imageinfo[0].height;
      const bR = b.imageinfo[0].width / b.imageinfo[0].height;
      const aS = -Math.abs(aR - 1.5) + (a.imageinfo[0].width > 1500 ? 0.3 : 0);
      const bS = -Math.abs(bR - 1.5) + (b.imageinfo[0].width > 1500 ? 0.3 : 0);
      return bS - aS;
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
  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${(meta.width/meta.height).toFixed(2)})`);

  await sharp(res.data)
    .resize(900, 600, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  return stat.size;
}

// Strategy: Use KNOWN good filenames from Wikimedia Commons
// These are verified landscape photos of the correct celebrities
const DIRECT_FILES = [
  // Taylor Swift - known landscape photos on Wikimedia
  {
    file: 'taylor-swift-mbti.jpg',
    wikimediaFiles: [
      'Taylor_Swift_-_The_Eras_Tour_2023_(53147613182).jpg',
      'Taylor_Swift_-_The_1989_World_Tour_-_Philadelphia_-_June_13_(18764513498).jpg',
      'Taylor_Swift_2_(6966830005).jpg',
      'Taylor_Swift_011_(18118515800).jpg',
    ]
  },
  {
    file: 'taylor-swift-section-1.jpg',
    wikimediaFiles: [
      'Taylor_Swift_(6966655163).jpg',
      'Taylor_Swift_Reputation_Tour36_(cropped).jpg',
      'Taylor_Swift_RED_Tour_2013.jpg',
      'Taylor_Swift_(7075076503).jpg',
    ]
  },
  {
    file: 'taylor-swift-section-2.jpg',
    wikimediaFiles: [
      'Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_(2).png',
      'Taylor_Swift_(7075074883).jpg',
      'Taylor_Swift_(6966830773).jpg',
    ]
  },
  // Elon Musk
  {
    file: 'elon-musk-mbti.jpg',
    wikimediaFiles: [
      'Elon_Musk_at_the_SpaceX_CRS-8_post-launch_press_conference_(25711430523).jpg',
      'Elon_Musk_at_a_Tesla_event_(cropped).jpg',
      'Elon_Musk_Royal_Society_(crop2).jpg',
      'SpaceX_CEO_Elon_Musk_visits_N%26NC_and_CCAFS_(24080422488).jpg',
    ]
  },
  // Lady Gaga
  {
    file: 'lady-gaga-mbti.jpg',
    wikimediaFiles: [
      'Lady_Gaga_performing_at_Europride_2011.jpg',
      'Lady_Gaga_BTW_Ball_Antwerp_02.jpg',
      'Lady_Gaga_-_The_Monster_Ball_Tour_-_Burswood_Dome_Perth_(4483548453).jpg',
      'Lady_Gaga_ArtRave.jpg',
    ]
  },
  // Zendaya
  {
    file: 'zendaya-mbti.jpg',
    wikimediaFiles: [
      'Zendaya_-_2019_by_Glenn_Francis.jpg',
      'SDCC_2016_-_Zendaya_(28550891122).jpg',
    ],
    searches: ['Zendaya Coleman 2019', 'Zendaya Spider-Man premiere']
  },
  {
    file: 'zendaya-section-2.jpg',
    wikimediaFiles: [
      'Zendaya_Coleman,_Paris_Fashion_Week_2015.jpg',
    ],
    searches: ['Zendaya Coleman event', 'Zendaya interview 2019']
  },
  // Dwayne Johnson
  {
    file: 'dwayne-johnson-mbti.jpg',
    wikimediaFiles: [
      'Dwayne_Johnson_2%2C_2013.jpg',
      'Dwayne_Johnson_Hercules_2014_(cropped).jpg',
      'Dwayne_%22The_Rock%22_Johnson_Visits_Camp_Pendleton_(15020261889).jpg',
      'Dwayne_Johnson_at_the_2009_Tribeca_Film_Festival.jpg',
    ],
    searches: ['Dwayne "The Rock" Johnson visit', 'Dwayne Johnson Hercules premiere']
  },
  // Bad Bunny
  {
    file: 'bad-bunny-mbti.jpg',
    wikimediaFiles: [
      'Bad_Bunny_2023.jpg',
      'Bad_Bunny_-_2023.jpg',
    ],
    searches: ['Bad Bunny Benito concert 2023', 'Bad Bunny reggaeton stage']
  },
  // Billie Eilish
  {
    file: 'billie-eilish-mbti.jpg',
    wikimediaFiles: [
      'Billie_Eilish_at_Pukkelpop_Festival_-_18_August_2019_(3)_(cropped).jpg',
      'Billie_Eilish_2019_by_Glenn_Francis.jpg',
      'Billie_Eilish_performs_at_Coachella_(2019).jpg',
    ],
    searches: ['Billie Eilish Pukkelpop 2019', 'Billie Eilish Coachella', 'Billie Eilish festival']
  },
];

async function main() {
  console.log('=== Fixing ALL photos with direct Wikimedia file lookups ===\n');

  const sharp = (await import('sharp')).default;
  let successCount = 0;
  let failCount = 0;

  for (const item of DIRECT_FILES) {
    const outPath = path.join(OUT_DIR, item.file);
    console.log(`\n📸 ${item.file}`);

    let success = false;

    // Strategy 1: Try known filenames directly
    for (const wikiFile of item.wikimediaFiles) {
      console.log(`  📎 Direct: ${wikiFile}`);
      try {
        const info = await getWikimediaImageUrl(wikiFile);
        if (!info) {
          console.log(`    Not found`);
          continue;
        }
        const ratio = info.width / info.height;
        console.log(`    Found: ${info.width}x${info.height} ratio:${ratio.toFixed(2)}`);

        if (ratio < 1.1) {
          console.log(`    ⏭️ Too portrait, skipping`);
          continue;
        }

        const url = info.width > 1200 ? (info.url || info.originalUrl) : info.originalUrl;
        const size = await downloadAndSave(url, outPath);
        console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
        success = true;
        break;
      } catch (err) {
        console.log(`    ❌ ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 300));
    }

    // Strategy 2: If direct files failed, try searches
    if (!success && item.searches) {
      for (const query of item.searches) {
        console.log(`  🔍 Search: "${query}"`);
        try {
          const images = await searchWikimedia(query);
          console.log(`    Found: ${images.length} landscape images`);
          for (let i = 0; i < Math.min(5, images.length); i++) {
            const img = images[i];
            console.log(`    Trying: ${img.title} (${img.width}x${img.height})`);
            try {
              const url = img.width > 1200 ? img.url : img.originalUrl;
              const size = await downloadAndSave(url, outPath);
              console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
              success = true;
              break;
            } catch (err) {
              console.log(`    ❌ ${err.message}`);
            }
          }
          if (success) break;
        } catch (err) {
          console.log(`    ❌ Search failed: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // Strategy 3: Category search as last resort
    if (!success) {
      const categorySearches = {
        'taylor-swift': ['Taylor_Swift_in_2023', 'Taylor_Swift_in_2024', 'Taylor_Swift_concerts'],
        'elon-musk': ['Elon_Musk_in_2023', 'Elon_Musk', 'SpaceX_people'],
        'lady-gaga': ['Lady_Gaga_in_concert', 'Lady_Gaga_performing', 'Lady_Gaga_in_2017'],
        'zendaya': ['Zendaya', 'Zendaya_in_2019'],
        'dwayne-johnson': ['Dwayne_Johnson', 'Dwayne_Johnson_in_2014'],
        'bad-bunny': ['Bad_Bunny', 'Bad_Bunny_in_2023'],
        'billie-eilish': ['Billie_Eilish_in_2019', 'Billie_Eilish_performing'],
      };
      const key = item.file.replace(/-mbti\.jpg|(-section-\d+\.jpg)/g, '');
      const cats = categorySearches[key] || [];
      for (const cat of cats) {
        console.log(`  📂 Category: ${cat}`);
        try {
          const images = await searchCategory(cat);
          console.log(`    Found: ${images.length} landscape images`);
          for (let i = 0; i < Math.min(3, images.length); i++) {
            const img = images[i];
            console.log(`    Trying: ${img.title} (${img.width}x${img.height})`);
            try {
              const url = img.width > 1200 ? img.url : img.originalUrl;
              const size = await downloadAndSave(url, outPath);
              console.log(`  ✅ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
              success = true;
              break;
            } catch (err) {
              console.log(`    ❌ ${err.message}`);
            }
          }
          if (success) break;
        } catch (err) {
          console.log(`    ❌ Category failed: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 300));
      }
    }

    if (success) successCount++;
    else {
      failCount++;
      console.log(`  ⚠️ FAILED: ${item.file}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  // Final verification
  console.log('\n\n=== FINAL VERIFICATION ===');
  for (const item of DIRECT_FILES) {
    const p = path.join(OUT_DIR, item.file);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      const stat = fs.statSync(p);
      console.log(`${item.file.padEnd(40)} ${meta.width}x${meta.height} ${Math.round(stat.size / 1024)}KB`);
    } else {
      console.log(`❌ ${item.file.padEnd(40)} MISSING`);
    }
  }
  console.log(`\n=== ${successCount} success, ${failCount} failed ===`);
}

main().catch(console.error);
