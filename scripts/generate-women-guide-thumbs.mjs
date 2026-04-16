// Generate 16 thumbnails for "여자 특징 완전 정리" series (v2)
// Output: public/blog/w2-{type}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', white: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb',
  pink: '#ec4899', pinkSoft: '#fce7f3', pinkBg: '#fdf2f8',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const TYPES = [
  { t: 'INTJ', catch: '전략 여왕', desc: '차가운 외면 · 뜨거운 내면', color: '#0e7490', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'INTP', catch: '우주 탐구자', desc: '머릿속 우주의 발랄한 천재', color: '#06b6d4', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'ENTJ', catch: '철녀 리더', desc: '카리스마 뒤 숨은 섬세함', color: '#0891b2', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'ENTP', catch: '자유 영혼', desc: '지적 스파크 + 엉뚱한 매력', color: '#0e7490', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'INFJ', catch: '깊은 우물', desc: '이상주의자의 섬세한 직관', color: '#be123c', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'INFP', catch: '감성 시인', desc: '부드러운데 단단한 자아', color: '#e11d48', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ENFJ', catch: '돌봄의 여신', desc: '따뜻한 리더 · 숨은 눈물', color: '#f43f5e', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ENFP', catch: '빛나는 파동', desc: '밝음 속 깊은 진심', color: '#f43f5e', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ISTJ', catch: '믿음직한 꾸준', desc: '반전 매력의 성실녀', color: '#047857', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ISFJ', catch: '조용한 수호자', desc: '세심한 돌봄 · 외로운 진심', color: '#059669', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ESTJ', catch: '솔직한 리더', desc: '까칠함 뒤 따뜻한 속', color: '#047857', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ESFJ', catch: '배려의 달인', desc: '공동체의 심장 · 섬세함', color: '#10b981', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ISTP', catch: '진짜 쿨녀', desc: '쿨한 척 아닌 진짜 쿨', color: '#b45309', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ISFP', catch: '감성 예술가', desc: '조용한데 강한 자아', color: '#d97706', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ESTP', catch: '현장 해결사', desc: '첫인상과 다른 진짜 모습', color: '#b45309', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ESFP', catch: '분위기 메이커', desc: '발랄함 뒤 숨은 눈물', color: '#f59e0b', bg1: '#fef3c7', bg2: '#fffbeb' },
];

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function make({ t, catch: ct, desc, color, bg1, bg2 }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${bg1}"/>
    <stop offset="100%" stop-color="${bg2}"/>
  </linearGradient>
  <linearGradient id="pinkStripe" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.pink}" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="${C.pink}" stop-opacity="0.55"/>
  </linearGradient>
</defs>
<rect width="1200" height="900" fill="url(#bg)"/>

<!-- Decorative emoji/symbols -->
<text x="150" y="200" font-size="70" opacity="0.18">♀</text>
<text x="1000" y="200" font-size="70" opacity="0.18">✨</text>
<text x="180" y="780" font-size="70" opacity="0.18">💫</text>
<text x="980" y="760" font-size="70" opacity="0.18">💖</text>

<!-- Pink top stripe for "Women" series branding -->
<rect x="0" y="130" width="1200" height="6" fill="url(#pinkStripe)"/>

<!-- Main card -->
<rect x="100" y="210" width="1000" height="480" rx="36" fill="${C.white}" stroke="${color}" stroke-width="5" opacity="0.97"/>

<!-- Series label -->
<text x="600" y="285" text-anchor="middle" font-size="28" font-weight="700" fill="${C.pink}" letter-spacing="8">♀ WOMEN GUIDE · 2026</text>

<!-- Huge type badge -->
<g transform="translate(600, 390)">
  <rect x="-170" y="-62" width="340" height="124" rx="28" fill="${color}"/>
  <text x="0" y="20" text-anchor="middle" font-size="92" font-weight="900" fill="#fff" letter-spacing="4">${t}</text>
</g>

<!-- Catch phrase -->
<text x="600" y="520" text-anchor="middle" font-size="60" font-weight="900" fill="${C.text}">${escapeXml(ct)}</text>

<!-- Description -->
<line x1="380" y1="550" x2="820" y2="550" stroke="${color}" stroke-width="2" opacity="0.4"/>
<text x="600" y="600" text-anchor="middle" font-size="30" font-weight="700" fill="${color}">${escapeXml(desc)}</text>

<!-- Sub tagline -->
<text x="600" y="660" text-anchor="middle" font-size="22" font-weight="600" fill="${C.textMuted}">인지기능 × 4기질 완전 해부 가이드</text>

<!-- Footer -->
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 여자 특징 완전정리</text>
</svg>`;
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const T of TYPES) {
    const name = `w2-${T.t.toLowerCase()}`;
    const svg = make(T);
    fs.writeFileSync(`${OUT_DIR}/${name}.svg`, svg, 'utf-8');
    await sharp(Buffer.from(svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(`${OUT_DIR}/${name}.webp`);
    console.log(`✓ ${name}`);
  }
  console.log(`\n✅ Generated ${TYPES.length} women guide thumbnails → ${OUT_DIR}`);
}

run();
