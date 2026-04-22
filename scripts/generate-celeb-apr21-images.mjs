// 2026-04-21 연예인 MBTI 글 2개 hero 이미지
//   park-jihoon-mbti-01-hero.webp  (ISFP, 섬세한 장인)
//   byun-wooseok-mbti-01-hero.webp (ENFJ, 따뜻한 리더)

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  bg: '#faf8f5', white: '#ffffff',
  text: '#1a1a1a', textSoft: '#4b5563', textMuted: '#6b7280', textFaint: '#9ca3af',
  indigo: '#6366f1', purple: '#a855f7', amber: '#f59e0b', rose: '#f43f5e',
  emerald: '#10b981', sky: '#0ea5e9',
  teal: '#14b8a6', orange: '#f97316', coral: '#fb7185',
  navy: '#1e293b',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">${esc(footer)}</text>
</svg>`;

function hero({ badge, title1, title2, sub, emoji, color1, color2, accent }) {
  return wrap(`
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hg)" opacity="0.12"/>
  <rect x="100" y="90" rx="24" width="340" height="48" fill="${C.white}" stroke="${accent}" stroke-width="2"/>
  <text x="270" y="122" text-anchor="middle" font-size="18" font-weight="800" fill="${accent}">${esc(badge)}</text>
  <text x="1050" y="280" text-anchor="middle" font-size="260">${esc(emoji)}</text>
  <text x="100" y="420" font-size="78" font-weight="900" fill="${C.text}">${esc(title1)}</text>
  <text x="100" y="520" font-size="78" font-weight="900" fill="${accent}">${esc(title2)}</text>
  <text x="100" y="620" font-size="28" font-weight="600" fill="${C.textSoft}">${esc(sub)}</text>
  <rect x="100" y="680" width="200" height="6" fill="${accent}"/>
`);
}

// ─── 1. 박지훈 ISFP ──────────────────────────
const heroJihoon = hero({
  badge: '🎭 박지훈 MBTI 분석',
  title1: '박지훈 ISFP',
  title2: '섬세한 장인 기질',
  sub: '약한영웅·왕과 사는 남자로 읽는 감정 억누름의 미학',
  emoji: '🎭',
  color1: C.rose,
  color2: C.purple,
  accent: C.purple,
});

// ─── 2. 변우석 ENFJ ──────────────────────────
const heroWooseok = hero({
  badge: '💫 변우석 MBTI 분석',
  title1: '변우석 ENFJ',
  title2: '따뜻한 리더의 반전',
  sub: '선재 업고 튀어가 보여준 Fe 주기능 완전체',
  emoji: '💫',
  color1: C.coral,
  color2: C.amber,
  accent: C.coral,
});

// ─── 렌더 ─────────────────────────────────
const images = [
  { name: 'park-jihoon-mbti-01-hero', svg: heroJihoon },
  { name: 'byun-wooseok-mbti-01-hero', svg: heroWooseok },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { name, svg } of images) {
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  const webpPath = path.join(OUT_DIR, `${name}.webp`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg), { density: 200 }).resize(1200).webp({ quality: 88 }).toFile(webpPath);
  const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  console.log(`✅ ${name}.webp (${kb} KB)`);
}
console.log(`\n완료: ${images.length}/${images.length}`);
