const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('D:/claude/temperament/node_modules/sharp');

const OUTPUT_DIR = 'D:/claude/temperament/public/profiles';

// Helper: fetch URL and return buffer
function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ProfileDownloader/1.0; +https://example.com)',
        'Accept': 'image/webp,image/jpeg,image/*,*/*'
      },
      timeout: 30000
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) {
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
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// Helper: fetch JSON
async function fetchJson(url) {
  const buf = await fetchBuffer(url);
  return JSON.parse(buf.toString('utf8'));
}

// Process and save image
async function processAndSave(imageBuffer, slug) {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  await sharp(imageBuffer)
    .resize(600, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85 })
    .toFile(outPath);
  console.log(`  ✓ Saved ${outPath}`);
  return outPath;
}

// Get image URL from Wikipedia page title
async function getWikipediaImageUrl(pageTitle) {
  const encodedTitle = encodeURIComponent(pageTitle);
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedTitle}&prop=pageimages&piprop=original&format=json`;
  try {
    const data = await fetchJson(url);
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    const page = pages[pageId];
    if (page.original && page.original.source) {
      return page.original.source;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Get image URL from Wikimedia Commons file name
async function getCommonsImageUrl(filename) {
  const encodedFile = encodeURIComponent(`File:${filename}`);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodedFile}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const data = await fetchJson(url);
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    const page = pages[pageId];
    if (page.imageinfo && page.imageinfo[0]) {
      return page.imageinfo[0].url;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Search Wikimedia Commons for images
async function searchCommons(query, limit = 5) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodedQuery}&srnamespace=6&srlimit=${limit}&format=json`;
  try {
    const data = await fetchJson(url);
    const results = data.query.search || [];
    return results.map(r => r.title.replace('File:', ''));
  } catch (e) {
    return [];
  }
}

// Try to download from a direct URL
async function tryDownload(url, slug) {
  try {
    console.log(`  Trying: ${url.substring(0, 100)}`);
    const buf = await fetchBuffer(url);
    if (buf.length < 5000) {
      console.log(`  Too small (${buf.length} bytes), skipping`);
      return false;
    }
    await processAndSave(buf, slug);
    return true;
  } catch (e) {
    console.log(`  Failed: ${e.message}`);
    return false;
  }
}

const results = {
  success: [],
  failed: []
};

// People configuration with specific known Commons files where possible
const people = [
  {
    slug: 'bill-gates',
    name: 'Bill Gates',
    wikiTitle: 'Bill Gates',
    commonsFiles: ['Bill_Gates_2018.jpg', 'Bill_Gates_2017_(cropped).jpg', 'BillGates2012.jpg'],
    license: 'CC BY 2.0'
  },
  {
    slug: 'donald-trump',
    name: 'Donald Trump',
    wikiTitle: 'Donald Trump',
    commonsFiles: ['Donald_Trump_official_portrait.jpg', 'Donald_Trump_2020_photo_portrait.jpg'],
    directUrls: ['https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg'],
    license: 'Public Domain (US Government)'
  },
  {
    slug: 'mark-zuckerberg',
    name: 'Mark Zuckerberg',
    wikiTitle: 'Mark Zuckerberg',
    commonsFiles: ['Mark_Zuckerberg_F8_2019_Keynote_(32830578717)_(cropped).jpg', 'Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_(cropped).jpg'],
    license: 'CC BY 2.0'
  },
  {
    slug: 'sam-altman',
    name: 'Sam Altman',
    wikiTitle: 'Sam Altman',
    commonsFiles: ['Sam_Altman_CropEdit_James_Tamim.jpg', 'Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_(cropped).jpg'],
    license: 'CC BY 2.0'
  },
  {
    slug: 'lebron-james',
    name: 'LeBron James',
    wikiTitle: 'LeBron James',
    commonsFiles: ['LeBron_James_-_52095908656_(cropped).jpg', 'LeBron_James_(cropped).jpg'],
    license: 'CC BY-SA 2.0'
  },
  {
    slug: 'lionel-messi',
    name: 'Lionel Messi',
    wikiTitle: 'Lionel Messi',
    commonsFiles: ['Lionel_Messi_20180626.jpg', 'Messi_vs_Nigeria_2018.jpg'],
    license: 'CC BY-SA 3.0'
  },
  {
    slug: 'son-heung-min',
    name: 'Son Heung-min',
    wikiTitle: 'Son Heung-min',
    commonsFiles: ['Son_Heung-min_2019.jpg', '손흥민.jpg'],
    license: 'CC BY-SA 2.0'
  },
  {
    slug: 'steve-jobs',
    name: 'Steve Jobs',
    wikiTitle: 'Steve Jobs',
    commonsFiles: ['Steve_Jobs_Headshot_2010-CROP_(cropped_2).jpg', 'Steve_Jobs_Headshot_2010-CROP.jpg'],
    license: 'CC BY-SA 2.0'
  },
  {
    slug: 'lee-jung-jae',
    name: 'Lee Jung-jae',
    wikiTitle: 'Lee Jung-jae',
    commonsFiles: ['Lee_Jung-jae_at_the_94th_Academy_Awards.png', 'Lee_Jung-jae_(이정재)_(cropped).jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'song-kang-ho',
    name: 'Song Kang-ho',
    wikiTitle: 'Song Kang-ho',
    commonsFiles: ['Song_Kang-ho_at_the_2022_Cannes_Film_Festival.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'iu',
    name: 'IU',
    wikiTitle: 'IU (singer)',
    commonsFiles: ['IU_at_the_3rd_Asia_Artist_Awards.jpg', 'IU_2019.jpg'],
    license: 'CC BY-SA 2.0'
  },
  {
    slug: 'kim-go-eun',
    name: 'Kim Go-eun',
    wikiTitle: 'Kim Go-eun',
    commonsFiles: ['Kim_Go-eun_at_the_36th_Blue_Dragon_Film_Awards.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'park-seo-joon',
    name: 'Park Seo-joon',
    wikiTitle: 'Park Seo-joon',
    commonsFiles: ['Park_Seo-joon_(actor,_born_1988).jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'newjeans-hanni',
    name: 'Hanni NewJeans',
    wikiTitle: 'Hanni (singer)',
    commonsFiles: ['Hanni_at_MAMA_Awards_2022.jpg', 'NewJeans_Hanni.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'bts-rm',
    name: 'RM BTS',
    wikiTitle: 'RM (rapper)',
    commonsFiles: ['RM_at_MAMA_Awards_2022.jpg', 'BTS_RM.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'bts-suga',
    name: 'Suga BTS',
    wikiTitle: 'Suga (rapper)',
    commonsFiles: ['Suga_BTS_2019.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'blackpink-jennie',
    name: 'Jennie BLACKPINK',
    wikiTitle: 'Jennie (rapper)',
    commonsFiles: ['Jennie_BLACKPINK.jpg', 'Jennie_Kim_at_MAMA_2022.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'blackpink-rose',
    name: 'Rose BLACKPINK',
    wikiTitle: 'Rosé (singer)',
    commonsFiles: ['Rose_BLACKPINK.jpg', 'Rosé_at_MAMA_Awards_2022.jpg'],
    license: 'CC BY-SA 4.0'
  },
  {
    slug: 'stray-kids-bangchan',
    name: 'Bang Chan Stray Kids',
    wikiTitle: 'Bang Chan',
    commonsFiles: ['Bang_Chan_Stray_Kids.jpg'],
    license: 'CC BY-SA 4.0'
  },
  // Fictional characters - try specific known public domain / CC images
  {
    slug: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    wikiTitle: 'Sherlock Holmes',
    commonsFiles: ['Sherlock_Holmes_Portrait_Paget.jpg', 'SHERLOCK_HOLMES_-_Sidney_Paget.jpg'],
    license: 'Public Domain'
  },
  {
    slug: 'harry-potter',
    name: 'Harry Potter',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
  {
    slug: 'hermione-granger',
    name: 'Hermione Granger',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
  {
    slug: 'joker',
    name: 'Joker DC',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
  {
    slug: 'naruto-uzumaki',
    name: 'Naruto Uzumaki',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
  {
    slug: 'tony-stark',
    name: 'Tony Stark',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
  {
    slug: 'walter-white',
    name: 'Walter White',
    wikiTitle: null,
    commonsFiles: [],
    license: null,
    note: 'Fictional - no CC images available'
  },
];

async function processPerson(person) {
  console.log(`\n=== Processing: ${person.name} (${person.slug}) ===`);

  if (person.note) {
    console.log(`  Skipping: ${person.note}`);
    results.failed.push({ slug: person.slug, reason: person.note });
    return false;
  }

  // Try direct URLs first
  if (person.directUrls) {
    for (const url of person.directUrls) {
      const ok = await tryDownload(url, person.slug);
      if (ok) {
        results.success.push({ slug: person.slug, license: person.license, url });
        return true;
      }
    }
  }

  // Try known Commons files
  for (const filename of (person.commonsFiles || [])) {
    const imageUrl = await getCommonsImageUrl(filename);
    if (imageUrl) {
      const ok = await tryDownload(imageUrl, person.slug);
      if (ok) {
        results.success.push({ slug: person.slug, license: person.license, filename });
        return true;
      }
    }
  }

  // Try Wikipedia page image
  if (person.wikiTitle) {
    console.log(`  Trying Wikipedia page image for: ${person.wikiTitle}`);
    const imageUrl = await getWikipediaImageUrl(person.wikiTitle);
    if (imageUrl) {
      const ok = await tryDownload(imageUrl, person.slug);
      if (ok) {
        results.success.push({ slug: person.slug, license: person.license || 'Wikipedia (verify license)', url: imageUrl });
        return true;
      }
    }
  }

  // Try Commons search
  console.log(`  Searching Commons for: ${person.name}`);
  const searchResults = await searchCommons(person.name, 10);
  console.log(`  Found ${searchResults.length} Commons results`);
  for (const filename of searchResults.slice(0, 5)) {
    if (!filename.match(/\.(jpg|jpeg|png|webp|gif)$/i)) continue;
    const imageUrl = await getCommonsImageUrl(filename);
    if (imageUrl) {
      const ok = await tryDownload(imageUrl, person.slug);
      if (ok) {
        results.success.push({ slug: person.slug, license: 'CC (verify)', filename });
        return true;
      }
    }
  }

  console.log(`  FAILED: Could not find suitable image for ${person.name}`);
  results.failed.push({ slug: person.slug, reason: 'No CC image found after multiple attempts' });
  return false;
}

async function main() {
  for (const person of people) {
    await processPerson(person);
  }

  console.log('\n\n=== RESULTS ===');
  console.log('\nSUCCESS:');
  for (const s of results.success) {
    console.log(`  ${s.slug}: ${s.license}`);
  }
  console.log('\nFAILED:');
  for (const f of results.failed) {
    console.log(`  ${f.slug}: ${f.reason}`);
  }

  // Save results for Supabase update
  fs.writeFileSync('D:/claude/temperament/scripts/profile-results.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
