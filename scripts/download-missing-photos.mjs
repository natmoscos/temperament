// Download CC-licensed photos for all profiles that have no thumbnail.
// Uses Wikimedia Commons as the primary source (CC BY, CC BY-SA, CC0, PD).
//
// Usage: node scripts/download-missing-photos.mjs

import https from 'node:https';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUTPUT_DIR = 'D:/claude/temperament/public/profiles';

// ── Network helpers ────────────────────────────────────────────────────
function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; TemperamentProfileDownloader/1.0; +https://192types.com)',
          Accept: 'image/webp,image/jpeg,image/png,image/*,*/*',
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
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
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

// ── Commons helpers ────────────────────────────────────────────────────
async function getCommonsImageUrl(filename) {
  const encoded = encodeURIComponent(`File:${filename}`);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const data = await fetchJson(url);
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    const page = pages[pageId];
    return page.imageinfo?.[0]?.url ?? null;
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

async function tryDownload(url, slug) {
  try {
    const buf = await fetchBuffer(url);
    if (buf.length < 5000) return false;
    await processAndSave(buf, slug);
    return true;
  } catch (e) {
    console.log(`    fail: ${e.message}`);
    return false;
  }
}

// ── Targets ────────────────────────────────────────────────────────────
// Each entry: { slug, commonsFiles: ['File name on Commons (CC-licensed)'] }
// Wikimedia Commons filenames (spaces converted to underscores).
// All must be CC BY / CC BY-SA / CC0 / Public Domain.
const targets = [
  // ── K-POP (15) ──
  { slug: 'blackpink-lisa', commonsFiles: ['Lisa_at_Dior_Fall_2022_Show_(cropped).jpg', '221105_리사_@_BORN_PINK_LAS_VEGAS_(1)_(cropped).jpg', '230526_리사_@_MET_GALA_2023.jpg'] },
  { slug: 'blackpink-jisoo', commonsFiles: ['Jisoo_at_Dior_Fall_2022_Show_(cropped).jpg', '211206_지수_Snowdrop_제작발표회_02_(cropped).jpg', '221016_BORN_PINK_LOS_ANGELES_지수_(cropped).jpg'] },
  { slug: 'newjeans-minji', commonsFiles: ['230719_뉴진스_민지.jpg', '230928_뉴진스_민지_1.jpg'] },
  { slug: 'newjeans-haerin', commonsFiles: ['230928_뉴진스_해린.jpg', '230719_뉴진스_해린.jpg'] },
  { slug: 'newjeans-danielle', commonsFiles: ['230928_뉴진스_다니엘.jpg', '230719_뉴진스_다니엘.jpg'] },
  { slug: 'ive-wonyoung', commonsFiles: ['220811_장원영.jpg', 'Jang_Won-young_at_the_2022_Melon_Music_Awards.png', '230324_아이브_장원영_김천.jpg'] },
  { slug: 'ive-yujin', commonsFiles: ['220811_안유진.jpg', 'An_Yu-jin_at_the_2022_Melon_Music_Awards.png'] },
  { slug: 'aespa-karina', commonsFiles: ['221015_에스파_카리나_팬미팅_(cropped).jpg', 'Karina_at_a_Lotte_Duty_Free_event,_22_May_2022_02.png'] },
  { slug: 'twice-nayeon', commonsFiles: ['190706_트와이스_나연.jpg', '230525_나연.jpg'] },
  { slug: 'bts-jungkook', commonsFiles: ['Jungkook_for_Dispatch_White_Day_Special,_28_February_2019_01.png', '190601_방탄소년단_정국.jpg'] },
  { slug: 'bts-v', commonsFiles: ['V_for_Dispatch_White_Day_Special,_28_February_2019_01.png', '190601_방탄소년단_뷔.jpg'] },
  { slug: 'bts-jimin', commonsFiles: ['Jimin_for_Dispatch_White_Day_Special,_28_February_2019_01.png', '190601_방탄소년단_지민.jpg'] },
  { slug: 'bts-jin', commonsFiles: ['Jin_for_Dispatch_White_Day_Special,_28_February_2019_01.png', '190601_방탄소년단_진.jpg'] },
  { slug: 'seventeen-woozi', commonsFiles: ['Woozi_at_a_Hyundai_Department_Store_fansign_on_May_15,_2018.png'] },
  { slug: 'gdragon', commonsFiles: ['G-Dragon_at_Chanel_show,_October_2016.jpg', 'G-Dragon_at_the_Saint_Laurent_Fall_2019_fashion_show.jpg'] },

  // ── K-DRAMA (10) ──
  { slug: 'hyun-bin', commonsFiles: ['Hyun_Bin_at_the_2019_Blue_Dragon_Film_Awards.jpg', 'Hyun_Bin_at_Mr._Sunshine_press_conference,_19_July_2018.jpg'] },
  { slug: 'son-ye-jin', commonsFiles: ['Son_Ye-jin_at_the_2018_Baeksang_Arts_Awards_red_carpet,_3_May_2018.jpg', 'Son_Ye-jin_in_2019.png'] },
  { slug: 'gong-yoo', commonsFiles: ['Gong_Yoo_at_the_2019_Seoul_International_Drama_Awards.png', 'Gong_Yoo_at_the_Kim_Ji-young,_Born_1982_press_conference_on_October_14,_2019.png'] },
  { slug: 'lee-min-ho', commonsFiles: ['Lee_Min-ho_at_2019_MAMA.png', 'Lee_Min-ho_in_November_2019_02.jpg'] },
  { slug: 'cha-eun-woo', commonsFiles: ['180501_MBC_가요대제전_차은우.png', 'Cha_Eun-woo_at_the_KCON_2018_NY.jpg'] },
  { slug: 'kim-soo-hyun', commonsFiles: ['Kim_Soo-hyun_at_the_2014_Baeksang_Arts_Awards.jpg', '김수현_2014.jpg'] },
  { slug: 'jun-ji-hyun', commonsFiles: ['Jun_Ji-hyun_at_the_Busan_International_Film_Festival_2012.jpg', 'Jun_Ji-hyun_in_2011.jpg'] },
  { slug: 'song-hye-kyo', commonsFiles: ['Song_Hye-kyo_in_2019.png', 'Song_Hye-kyo_at_the_KBS_Drama_Awards,_2016.jpg'] },
  { slug: 'jung-hae-in', commonsFiles: ['Jung_Hae-in_in_October_2018.jpg', 'Jung_Hae-in_at_the_2019_Blue_Dragon_Film_Awards.jpg'] },
  { slug: 'park-bo-gum', commonsFiles: ['Park_Bo-gum_at_the_2017_Baeksang_Arts_Awards.jpg', 'Park_Bo-gum_at_Tiffany_and_Co._event,_7_September_2017.jpg'] },

  // ── Athletes (5) ──
  { slug: 'michael-jordan', commonsFiles: ['Michael_Jordan_in_2014.jpg', 'Michael_Jordan_Laureus_2003.jpg'] },
  { slug: 'serena-williams', commonsFiles: ['Serena_Williams_at_2013_US_Open.jpg', 'Serena_Williams_at_2013_Wimbledon.jpg'] },
  { slug: 'roger-federer', commonsFiles: ['Roger_Federer_2015.jpg', 'Roger_Federer_(38708071432).jpg'] },
  { slug: 'kylian-mbappe', commonsFiles: ['Kylian_Mbappé_2019.jpg', 'Kylian_Mbappé_Training_PSG_28_August_2018.jpg'] },
  { slug: 'neymar', commonsFiles: ['Neymar_2018.jpg', 'Neymar_in_2016.jpg'] },

  // ── Celebrities (6) ──
  { slug: 'ariana-grande', commonsFiles: ['Ariana_Grande_Grammys_Red_Carpet_2020.png', 'Ariana_Grande_at_the_2018_American_Music_Awards_(cropped).png'] },
  { slug: 'beyonce', commonsFiles: ['Beyoncé_at_The_Lion_King_European_Premiere_2019.png', 'Beyonce_-_Revel_Presents_Beyonce_Live_-_2_(cropped).jpg'] },
  { slug: 'rihanna', commonsFiles: ['Rihanna_Fenty_Beauty_2019_Dubai_Mall_2.png', 'Rihanna_at_the_2018_Met_Gala.png'] },
  { slug: 'kim-kardashian', commonsFiles: ['Kim_Kardashian_2019.jpg', 'Kim_Kardashian_2009.jpg'] },
  { slug: 'leonardo-dicaprio', commonsFiles: ['Leonardo_DiCaprio_Cannes_2019.jpg', 'Leonardo_DiCaprio_2014.jpg'] },
  { slug: 'margot-robbie', commonsFiles: ['Margot_Robbie_(48462422446)_(cropped).jpg', 'Margot_Robbie_2015_(cropped).jpg'] },

  // ── Historical (5, public domain) ──
  { slug: 'confucius', commonsFiles: ['Confucius_Tang_Dynasty.jpg', 'Life_of_Confucius.jpg', 'Half_Portraits_of_the_Great_Sage_and_Virtuous_Men_of_Old_-_Confucius_(孔子).jpg'] },
  { slug: 'aristotle', commonsFiles: ['Aristotle_Altemps_Inv8575.jpg', 'Aristotle_by_Jusepe_de_Ribera.jpg'] },
  { slug: 'einstein', commonsFiles: ['Einstein_1921_by_F_Schmutzer_-_restoration.jpg', 'Albert_Einstein_Head.jpg'] },
  { slug: 'leonardo-da-vinci', commonsFiles: ['Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg', 'Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg'] },
  { slug: 'cleopatra', commonsFiles: ['Kleopatra-VII.-Altes-Museum-Berlin1.jpg', 'Cleopatra_VII_statue.jpg'] },

  // ── Tech (4) ──
  { slug: 'jeff-bezos', commonsFiles: ['Jeff_Bezos_2019_by_Glenn_Francis.jpg', 'Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_(39074799225)_(cropped).jpg'] },
  { slug: 'warren-buffett', commonsFiles: ['Warren_Buffett_KU_Visit.jpg', 'Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg'] },
  { slug: 'jensen-huang', commonsFiles: ['Jensen_Huang_(cropped).jpg', 'NVIDIA_Jensen_Huang_Speaks_at_Computex_Taipei_2023.jpg'] },
  { slug: 'lee-jae-yong', commonsFiles: ['Lee_Jae-yong_2019.jpg', 'Lee_Jae-yong,_CES_2020.jpg'] },
];

// ── Run ────────────────────────────────────────────────────────────────
const success = [];
const failed = [];

for (const t of targets) {
  console.log(`\n[${t.slug}]`);
  let done = false;
  for (const file of t.commonsFiles) {
    const url = await getCommonsImageUrl(file);
    if (!url) {
      console.log(`  skip: ${file} (not found)`);
      continue;
    }
    console.log(`  try: ${file}`);
    if (await tryDownload(url, t.slug)) {
      console.log(`  ✓ saved /profiles/${t.slug}.jpg`);
      success.push(t.slug);
      done = true;
      break;
    }
  }
  if (!done) {
    console.log(`  ✗ FAILED all attempts for ${t.slug}`);
    failed.push(t.slug);
  }
}

console.log(`\n────────────────────────────`);
console.log(`Success: ${success.length}/${targets.length}`);
console.log(`Failed : ${failed.length}`);
if (failed.length) console.log(`Failed slugs: ${failed.join(', ')}`);
