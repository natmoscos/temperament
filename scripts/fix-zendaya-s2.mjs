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

async function main() {
  const sharp = (await import('sharp')).default;

  // Get the "Jacob Batalon & Zendaya" SDCC photo directly
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:Jacob%20Batalon%20%26%20Zendaya%20(28035642754).jpg&prop=imageinfo&iiprop=url|size&iiurlwidth=1200&format=json`;

  console.log('Fetching Jacob Batalon & Zendaya SDCC photo...');
  const apiRes = await fetchUrl(apiUrl);
  const json = JSON.parse(apiRes.data.toString());
  const page = Object.values(json.query.pages)[0];
  const thumbUrl = page?.imageinfo?.[0]?.thumburl;

  if (!thumbUrl) {
    console.log('Not found via direct lookup, trying search...');
    // Fallback: search
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Jacob+Batalon+Zendaya+SDCC&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200&format=json`;
    const searchRes = await fetchUrl(searchUrl);
    const searchJson = JSON.parse(searchRes.data.toString());
    const pages = Object.values(searchJson.query?.pages || {});
    console.log(`Search results: ${pages.length}`);

    for (const p of pages) {
      console.log(`  ${p.title} ${p.imageinfo?.[0]?.width}x${p.imageinfo?.[0]?.height}`);
    }

    // Try the first landscape result
    const landscape = pages.filter(p => {
      const ii = p.imageinfo?.[0];
      return ii && ii.width / ii.height >= 1.2 && ii.width >= 800;
    });

    if (landscape.length > 0) {
      const img = landscape[0];
      const url = img.imageinfo[0].thumburl || img.imageinfo[0].url;
      console.log(`Downloading: ${img.title}`);
      const imgRes = await fetchUrl(url);
      if (imgRes.status === 200) {
        const outPath = path.join(OUT_DIR, 'zendaya-section-2.jpg');
        await sharp(imgRes.data)
          .resize(900, 600, { fit: 'cover', position: 'centre' })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(outPath);
        console.log('✅ Saved zendaya-section-2.jpg');
      }
    }
    return;
  }

  console.log(`Found: ${thumbUrl}`);
  const imgRes = await fetchUrl(thumbUrl);
  if (imgRes.status !== 200) throw new Error(`HTTP ${imgRes.status}`);

  const outPath = path.join(OUT_DIR, 'zendaya-section-2.jpg');
  const meta = await sharp(imgRes.data).metadata();
  console.log(`Source: ${meta.width}x${meta.height}`);

  await sharp(imgRes.data)
    .resize(900, 600, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  console.log('✅ Saved zendaya-section-2.jpg');
}

main().catch(console.error);
