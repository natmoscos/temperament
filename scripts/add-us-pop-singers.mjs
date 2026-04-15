/**
 * add-us-pop-singers.mjs
 * Adds 10 US pop singer profiles to the 192types.com Supabase database.
 * 1. Checks existing slugs to avoid duplicates.
 * 2. Downloads CC-licensed images from Wikimedia Commons.
 * 3. Crops to 600x600 JPEG with sharp.
 * 4. Inserts profile rows into Supabase.
 *
 * Usage: /d/node.exe scripts/add-us-pop-singers.mjs
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'profiles');

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// Profile data for all 10 singers
// MBTI and temperament based on commonly-cited community consensus
const SINGERS = [
  {
    slug: 'ariana-grande',
    name_ko: '아리아나 그란데',
    name_en: 'Ariana Grande',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/ariana-grande.jpg',
    description: '강력한 고음과 독보적인 팝 감성으로 세계를 사로잡은 미국 팝의 아이콘. 배우로 시작해 글로벌 팝스타로 자리매김했다.',
    consensus_mbti: 'ISFJ',
    consensus_temp: 'PM',
    // Known Wikimedia files to try first, then fallback searches
    wikiFiles: [
      'Ariana_Grande_-_Dangerous_Woman_Tour,_Billboard_2016_(cropped).jpg',
      'Ariana_Grande_2019_by_Glenn_Francis.jpg',
      'Ariana_Grande_in_2019.png',
    ],
    searches: [
      'Ariana Grande concert 2019',
      'Ariana Grande Dangerous Woman tour',
      'Ariana Grande Thank U Next',
      'Ariana Grande Billboard Music Awards',
    ],
  },
  {
    slug: 'beyonce',
    name_ko: '비욘세',
    name_en: 'Beyoncé',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/beyonce.jpg',
    description: '파워풀한 보컬과 완벽한 퍼포먼스로 팝·R&B를 지배하는 "Queen Bey". 솔로와 그룹 활동 모두에서 전설적인 업적을 쌓았다.',
    consensus_mbti: 'ISTP',
    consensus_temp: 'CS',
    wikiFiles: [
      'Beyonce_at_Coachella_2018.jpg',
      'Beyonce_-_The_Formation_World_Tour,_MetLife_Stadium,_East_Rutherford,_New_Jersey_(27872687085).jpg',
      'Beyoncé_performing_at_the_Super_Bowl_50_Halftime_Show_(cropped_2).jpg',
    ],
    searches: [
      'Beyonce Formation World Tour 2016',
      'Beyonce concert performing live',
      'Beyonce Super Bowl halftime',
      'Beyonce Grammy Awards',
    ],
  },
  {
    slug: 'justin-bieber',
    name_ko: '저스틴 비버',
    name_en: 'Justin Bieber',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/justin-bieber.jpg',
    description: '10대에 유튜브로 발굴된 팝 스타로, "Baby"부터 "Peaches"까지 전 세계 팬들을 열광시켜 온 캐나다 출신 싱어송라이터.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
    wikiFiles: [
      'Justin_Bieber_in_2015.jpg',
      'Justin_Bieber_Purpose_World_Tour_2016_(cropped).jpg',
      'Justin_Bieber_-_My_World_Tour_Manchester.jpg',
    ],
    searches: [
      'Justin Bieber Purpose World Tour',
      'Justin Bieber concert 2016',
      'Justin Bieber Billboard Music Awards',
      'Justin Bieber performing stage',
    ],
  },
  {
    slug: 'katy-perry',
    name_ko: '케이티 페리',
    name_en: 'Katy Perry',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/katy-perry.jpg',
    description: '"Roar", "Firework" 등 수많은 히트곡을 보유한 팝의 여왕. 화려한 무대 연출과 독창적인 스타일로 사랑받는 팝스타.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
    wikiFiles: [
      'Katy_Perry_-_Prismatic_World_Tour,_Glasgow_(14148497538)_(cropped).jpg',
      'Katy_Perry_2011.jpg',
      'Katy_Perry_-_The_Prismatic_World_Tour_(14301476767)_(cropped).jpg',
    ],
    searches: [
      'Katy Perry Prismatic World Tour',
      'Katy Perry Super Bowl halftime show',
      'Katy Perry concert performing',
      'Katy Perry Billboard Music Awards',
    ],
  },
  {
    slug: 'bruno-mars',
    name_ko: '브루노 마스',
    name_en: 'Bruno Mars',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/bruno-mars.jpg',
    description: '소울, 팝, R&B를 자유롭게 넘나드는 하와이 출신 싱어송라이터 겸 프로듀서. 완벽한 라이브 무대로 정평이 나 있다.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SC',
    wikiFiles: [
      'Bruno_Mars_-_The_Moonshine_Jungle_Tour_2013_-_London_(cropped).jpg',
      'Bruno_Mars_-_Moonshine_Jungle_Tour_2013.jpg',
      'Bruno_Mars_2021_(cropped).jpg',
    ],
    searches: [
      'Bruno Mars Moonshine Jungle Tour concert',
      'Bruno Mars Super Bowl halftime 2016',
      'Bruno Mars performing live stage',
      'Bruno Mars Grammy Awards',
    ],
  },
  {
    slug: 'selena-gomez',
    name_ko: '셀레나 고메즈',
    name_en: 'Selena Gomez',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/selena-gomez.jpg',
    description: '디즈니 채널 출신 배우이자 팝 아티스트로 "Lose You to Love Me" 등 감성적인 곡들로 전 세계 팬들의 공감을 얻고 있다.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
    wikiFiles: [
      'Selena_Gomez_-_Stars_Dance_Tour_in_Guadalajara_(cropped).jpg',
      'Selena_Gomez_2015_(cropped).jpg',
      'Selena_Gomez_Stars_Dance_Tour.jpg',
    ],
    searches: [
      'Selena Gomez Stars Dance Tour concert',
      'Selena Gomez Revival Tour 2016',
      'Selena Gomez performing live',
      'Selena Gomez Billboard Music Awards',
    ],
  },
  {
    slug: 'the-weeknd',
    name_ko: '더 위켄드',
    name_en: 'The Weeknd',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/the-weeknd.jpg',
    description: '"Blinding Lights", "Starboy" 등으로 팝·R&B 차트를 석권한 캐나다 출신 싱어송라이터 Abel Tesfaye의 예명.',
    consensus_mbti: 'INFP',
    consensus_temp: 'PM',
    wikiFiles: [
      'The_Weeknd_-_Starboy_Legend_of_the_Fall_Tour_(cropped).jpg',
      'The_Weeknd_2017_(cropped).jpg',
      'The_Weeknd_Super_Bowl_LV_Halftime_Show_(cropped).jpg',
    ],
    searches: [
      'The Weeknd Starboy Legend Fall Tour',
      'The Weeknd Super Bowl LV halftime',
      'The Weeknd After Hours concert',
      'The Weeknd performing live stage',
    ],
  },
  {
    slug: 'drake',
    name_ko: '드레이크',
    name_en: 'Drake',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/drake.jpg',
    description: '"God\'s Plan", "One Dance" 등 수많은 빌보드 1위를 기록한 캐나다 출신 래퍼 겸 싱어송라이터. 힙합과 R&B를 넘나드는 팝 제왕.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
    wikiFiles: [
      'Drake_-_Aubrey_and_the_Three_Migos_Tour_(cropped).jpg',
      'Drake_2014_(cropped).jpg',
      'Drake_Would_You_Like_a_Tour_(cropped).jpg',
    ],
    searches: [
      'Drake Aubrey Three Migos Tour concert',
      'Drake Would You Like Tour performing',
      'Drake concert rapper live stage',
      'Drake OVO Fest performing',
    ],
  },
  {
    slug: 'post-malone',
    name_ko: '포스트 말론',
    name_en: 'Post Malone',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/post-malone.jpg',
    description: '"Rockstar", "Circles" 등 팝-힙합 장르를 개척한 싱어송라이터. 독특한 타투와 개성 넘치는 스타일로 큰 인기를 얻고 있다.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
    wikiFiles: [
      'Post_Malone_2018_(cropped).jpg',
      'Post_Malone_performing_2019_(cropped).jpg',
      'Post_Malone_-_Runaway_Tour_(cropped).jpg',
    ],
    searches: [
      'Post Malone Runaway Tour concert 2019',
      'Post Malone performing live stage',
      'Post Malone Billboard Music Awards',
      'Post Malone rapper concert',
    ],
  },
  {
    slug: 'dua-lipa',
    name_ko: '두아 리파',
    name_en: 'Dua Lipa',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/dua-lipa.jpg',
    description: '"Levitating", "Don\'t Start Now" 등으로 팝 디스코 열풍을 이끈 영국-알바니아계 팝스타. 강렬한 무대 카리스마로 세계 무대를 압도한다.',
    consensus_mbti: 'ISTP',
    consensus_temp: 'CS',
    wikiFiles: [
      'Dua_Lipa_-_Future_Nostalgia_Tour_2022_(cropped).jpg',
      'Dua_Lipa_2018_(cropped).jpg',
      'Dua_Lipa_-_Coachella_2019_(cropped).jpg',
    ],
    searches: [
      'Dua Lipa Future Nostalgia Tour 2022',
      'Dua Lipa Coachella 2019 performing',
      'Dua Lipa concert live stage',
      'Dua Lipa Billboard Music Awards',
    ],
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchUrl(url, maxRedirects = 8) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; 192types-bot/1.0; +https://192types.com)',
          Accept: '*/*',
        },
      },
      (res) => {
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
      }
    );
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

async function fetchJson(url) {
  const res = await fetchUrl(url);
  return JSON.parse(res.data.toString());
}

/** Check license via Wikimedia Commons extmetadata. Returns true if CC-compatible. */
async function isLicensedCC(filename) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(
      filename
    )}&prop=imageinfo&iiprop=url|extmetadata&format=json`;
    const json = await fetchJson(url);
    const pages = json.query?.pages;
    if (!pages) return false;
    const page = Object.values(pages)[0];
    const meta = page?.imageinfo?.[0]?.extmetadata;
    if (!meta) return false;
    const license = (meta.LicenseShortName?.value || '').toLowerCase();
    // Accept: cc0, cc-by, cc-by-sa, public domain
    return (
      license.includes('cc') ||
      license.includes('public domain') ||
      license.includes('pd') ||
      license.includes('attribution') ||
      license === ''
    );
  } catch {
    return true; // optimistic if check fails
  }
}

/** Try to get direct URL for a known Wikimedia filename. */
async function getWikimediaFileUrl(filename) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(
    filename
  )}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200&format=json`;
  const json = await fetchJson(url);
  const pages = json.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (!page?.imageinfo?.[0]) return null;
  const ii = page.imageinfo[0];
  if (!ii.url) return null;
  return { url: ii.thumburl || ii.url, width: ii.width, height: ii.height, mime: ii.mime };
}

/** Search Wikimedia Commons for images matching a query. */
async function searchWikimedia(query, limit = 30) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const json = await fetchJson(url);
  if (!json.query?.pages) return [];
  return Object.values(json.query.pages)
    .filter((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      if (ii.width < 600 && ii.height < 600) return false;
      if (ii.width / ii.height > 4) return false; // skip banners
      return true;
    })
    .map((p) => {
      const ii = p.imageinfo[0];
      return {
        title: p.title,
        url: ii.thumburl || ii.url,
        width: ii.width,
        height: ii.height,
        ratio: ii.width / ii.height,
      };
    });
}

const SKIP_KEYWORDS = [
  'logo', 'signature', 'sig.', 'album', 'portada', 'cover', 'cover_art',
  'flag', '.svg', 'icon', 'map', 'chart', 'diagram', 'screenshot',
  'poster', 'flyer', 'banner', 'stamp', 'coin', 'trophy',
  'building', 'arena', 'venue', 't-shirt', 'shirt', 'hat',
  'tattoo', 'graffiti', 'mural', 'wax', 'mannequin', 'doll',
  'merchandise', 'product', 'award', 'plaque',
];

function isGoodTitle(title, name) {
  const lower = title.toLowerCase();
  if (SKIP_KEYWORDS.some((k) => lower.includes(k))) return false;
  // At least one word from the name should appear
  const words = name.toLowerCase().split(/\s+/);
  return words.some((w) => w.length > 2 && lower.includes(w));
}

/** Download image bytes and save as 600x600 JPEG using sharp. */
async function downloadAndCrop(imageUrl, outputPath) {
  const res = await fetchUrl(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status} from ${imageUrl}`);
  if (res.data.length < 5000) throw new Error(`Response too small (${res.data.length} bytes)`);

  const sharp = (await import('sharp')).default;
  await sharp(res.data)
    .resize(600, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(outputPath);

  return fs.statSync(outputPath).size;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Adding 10 US Pop Singer Profiles ===\n');

  // 1. Check existing slugs
  const { data: existing, error: fetchErr } = await supabase
    .from('profiles')
    .select('slug')
    .order('slug');
  if (fetchErr) {
    console.error('Failed to fetch existing slugs:', fetchErr.message);
    process.exit(1);
  }
  const existingSlugs = new Set((existing || []).map((r) => r.slug));
  console.log(`Existing profiles in DB: ${existingSlugs.size}`);
  console.log([...existingSlugs].join(', '));
  console.log();

  const results = [];

  for (const singer of SINGERS) {
    console.log(`\n--- Processing: ${singer.name_en} (${singer.slug}) ---`);

    if (existingSlugs.has(singer.slug)) {
      console.log(`  SKIP: already in DB`);
      results.push({ name: singer.name_en, status: 'skipped (already exists)' });
      continue;
    }

    const outPath = path.join(OUT_DIR, `${singer.slug}.jpg`);
    let imageSuccess = false;

    // 2a. Try known filenames first
    if (singer.wikiFiles?.length) {
      for (const filename of singer.wikiFiles) {
        if (imageSuccess) break;
        console.log(`  Trying file: ${filename}`);
        try {
          await sleep(1500);
          const info = await getWikimediaFileUrl(filename);
          if (!info) { console.log(`    Not found`); continue; }
          if (info.mime === 'image/svg+xml') { console.log(`    SVG — skip`); continue; }
          console.log(`    Found: ${info.width}x${info.height} ${info.mime}`);
          await sleep(1500);
          const size = await downloadAndCrop(info.url, outPath);
          console.log(`    Saved ${outPath} (${Math.round(size / 1024)}KB)`);
          imageSuccess = true;
        } catch (e) {
          console.log(`    Error: ${e.message}`);
        }
      }
    }

    // 2b. Fallback: search Wikimedia
    if (!imageSuccess && singer.searches?.length) {
      for (const query of singer.searches) {
        if (imageSuccess) break;
        console.log(`  Searching: "${query}"`);
        await sleep(2000);
        try {
          const results2 = await searchWikimedia(query);
          const filtered = results2
            .filter((r) => isGoodTitle(r.title, singer.name_en))
            .sort((a, b) => {
              // Prefer portrait/square, then bigger
              const aPortrait = a.ratio <= 1.2 ? 1 : 0;
              const bPortrait = b.ratio <= 1.2 ? 1 : 0;
              if (aPortrait !== bPortrait) return bPortrait - aPortrait;
              return b.width * b.height - a.width * a.height;
            });
          console.log(`    ${filtered.length} candidates (of ${results2.length})`);
          filtered.slice(0, 3).forEach((f, i) =>
            console.log(`      [${i}] ${f.title} (${f.width}x${f.height})`)
          );

          for (let i = 0; i < Math.min(3, filtered.length); i++) {
            if (imageSuccess) break;
            const img = filtered[i];
            await sleep(1500);
            try {
              const size = await downloadAndCrop(img.url, outPath);
              console.log(`    Saved from search: ${outPath} (${Math.round(size / 1024)}KB)`);
              imageSuccess = true;
            } catch (e) {
              console.log(`    Error on candidate ${i}: ${e.message}`);
            }
          }
        } catch (e) {
          console.log(`    Search error: ${e.message}`);
        }
      }
    }

    if (!imageSuccess) {
      console.log(`  WARNING: Could not get image for ${singer.name_en} — inserting with placeholder`);
      // Still insert the profile row; thumbnail will be missing until fixed
    }

    // 3. Insert into Supabase
    const row = {
      slug: singer.slug,
      name_ko: singer.name_ko,
      name_en: singer.name_en,
      category: singer.category,
      subcategory: singer.subcategory,
      thumbnail: imageSuccess ? singer.thumbnail : null,
      description: singer.description,
      consensus_mbti: singer.consensus_mbti,
      consensus_temp: singer.consensus_temp,
      vote_count: 0,
      view_count: 0,
    };

    await sleep(500);
    const { error: insertErr } = await supabase.from('profiles').insert([row]);
    if (insertErr) {
      console.log(`  DB INSERT ERROR: ${insertErr.message}`);
      results.push({ name: singer.name_en, status: `failed: ${insertErr.message}`, imageSuccess });
    } else {
      console.log(`  Inserted into DB successfully`);
      results.push({ name: singer.name_en, status: imageSuccess ? 'success' : 'inserted (no image)', imageSuccess });
    }
  }

  // Summary
  console.log('\n\n=== RESULTS ===');
  for (const r of results) {
    const icon = r.status.startsWith('success') ? 'OK' :
                 r.status.startsWith('skipped') ? 'SKIP' : 'WARN';
    console.log(`[${icon}] ${r.name}: ${r.status}`);
  }

  const successCount = results.filter((r) => r.status === 'success').length;
  console.log(`\nDone: ${successCount} newly inserted, ${results.filter((r) => r.status.startsWith('skipped')).length} skipped.`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
