import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'blog');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'PersonalityTestBlog/1.0 (contact@192types.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
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

async function searchWikimedia(query, limit = 15) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200&format=json`;
  const res = await fetch(url);
  const json = JSON.parse(res.data.toString());
  if (!json.query?.pages) return [];

  return Object.values(json.query.pages)
    .filter(p => {
      const ii = p.imageinfo?.[0];
      if (!ii) return false;
      if (ii.mime !== 'image/jpeg' && ii.mime !== 'image/png') return false;
      if (ii.width < 600) return false;
      // ★ 핵심: 가로형(landscape)만 허용 - 비율 1.2 이상
      const ratio = ii.width / ii.height;
      return ratio >= 1.2;
    })
    .sort((a, b) => {
      const aRatio = a.imageinfo[0].width / a.imageinfo[0].height;
      const bRatio = b.imageinfo[0].width / b.imageinfo[0].height;
      // 1.5~1.8 비율을 선호 (3:2 ~ 16:9)
      const aScore = -Math.abs(aRatio - 1.6) + (a.imageinfo[0].width > 2000 ? 0.3 : 0);
      const bScore = -Math.abs(bRatio - 1.6) + (b.imageinfo[0].width > 2000 ? 0.3 : 0);
      return bScore - aScore;
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

async function downloadAndOptimize(imageUrl, outputPath) {
  const res = await fetch(imageUrl);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const sharp = (await import('sharp')).default;

  // 원본 메타데이터 확인
  const meta = await sharp(res.data).metadata();
  const srcRatio = meta.width / meta.height;

  console.log(`    Source: ${meta.width}x${meta.height} (ratio: ${srcRatio.toFixed(2)})`);

  // 가로형이면 일반 커버 크롭 (얼굴이 과도하게 확대되지 않음)
  await sharp(res.data)
    .resize(900, 600, {
      fit: 'cover',
      position: srcRatio > 1.5 ? 'centre' : 'attention' // 넓은 사진은 중앙, 좁은 사진은 스마트 크롭
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stat = fs.statSync(outputPath);
  return stat.size;
}

// 문제 사진 목록 + 더 나은 검색어
const FIXES = [
  // 트럼프: 공식 초상화(세로) → 연설/이벤트 사진(가로)
  { file: 'trump-mbti.jpg', queries: ['Donald Trump speech podium', 'Donald Trump rally event', 'Donald Trump press conference'] },
  { file: 'trump-section-2.jpg', queries: ['Donald Trump signing White House', 'Donald Trump oval office desk', 'Donald Trump meeting'] },

  // 젠데이아: 세로 사진 → 레드카펫/이벤트 가로 사진
  { file: 'zendaya-section-1.jpg', queries: ['Zendaya Coleman interview event', 'Zendaya press conference', 'Zendaya panel'] },

  // 티모시 샬라메: 세로 × 2 → 가로 이벤트 사진
  { file: 'timothee-chalamet-section-1.jpg', queries: ['Timothée Chalamet film festival panel', 'Timothée Chalamet press conference', 'Timothée Chalamet interview event'] },
  { file: 'timothee-chalamet-section-2.jpg', queries: ['Timothée Chalamet premiere red carpet wide', 'Timothée Chalamet photocall', 'Timothée Chalamet Venice festival'] },

  // 미스터비스트: 세로 사진 → 이벤트/유튜브 관련 가로
  { file: 'mrbeast-section-1.jpg', queries: ['MrBeast YouTube event', 'MrBeast Jimmy Donaldson conference', 'MrBeast charity event'] },

  // 드웨인 존슨: 세로 사진 → 가로 이벤트
  { file: 'dwayne-johnson-section-2.jpg', queries: ['Dwayne Johnson movie set', 'Dwayne Johnson press tour wide', 'The Rock premiere event'] },

  // 빌리 아일리시: 작은 정방형 → 더 큰 가로
  { file: 'billie-eilish-section-2.jpg', queries: ['Billie Eilish award ceremony stage', 'Billie Eilish Grammy performance', 'Billie Eilish concert stage wide'] },
];

async function main() {
  console.log('=== 세로형 문제 사진 교체 시작 ===\n');

  for (const fix of FIXES) {
    const outPath = path.join(OUT_DIR, fix.file);
    console.log(`\n📸 ${fix.file}`);

    let success = false;
    for (const query of fix.queries) {
      console.log(`  검색: "${query}"`);
      try {
        const images = await searchWikimedia(query);
        console.log(`  결과: ${images.length}개 가로형 이미지`);

        for (let i = 0; i < Math.min(3, images.length); i++) {
          const img = images[i];
          console.log(`  시도: ${img.title} (${img.width}x${img.height}, ratio:${img.ratio})`);
          try {
            const url = img.width > 1200 ? img.url : img.originalUrl;
            const size = await downloadAndOptimize(url, outPath);
            console.log(`  ✅ ${fix.file} (${Math.round(size/1024)}KB)`);
            success = true;
            break;
          } catch (err) {
            console.log(`  ❌ ${err.message}`);
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`  ❌ 검색 실패: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 300));
    }
    if (!success) console.log(`  ⚠️ ${fix.file} 교체 실패!`);
    await new Promise(r => setTimeout(r, 500));
  }

  // 최종 검증
  console.log('\n\n=== 최종 검증 ===');
  const sharp = (await import('sharp')).default;
  for (const fix of FIXES) {
    const p = path.join(OUT_DIR, fix.file);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      const stat = fs.statSync(p);
      const ratio = (meta.width / meta.height).toFixed(2);
      console.log(`${fix.file.padEnd(40)} ${meta.width}x${meta.height} ratio:${ratio} ${Math.round(stat.size/1024)}KB`);
    }
  }
}

main().catch(console.error);
