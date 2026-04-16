// Generate 16 thumbnails for "남자 특징 완전 정리" series (v2)
// Output: public/blog/m2-{type}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', white: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb',
  blue: '#2563eb', blueSoft: '#dbeafe', blueBg: '#eff6ff',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const TYPES = [
  { t: 'INTJ', catch: '전략 설계자', desc: '차가운 외면 × 뜨거운 집념', color: '#0e7490', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'INTP', catch: '이론 탐구자', desc: '머릿속 우주의 조용한 천재', color: '#06b6d4', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'ENTJ', catch: '타고난 리더', desc: '카리스마 × 결과로 말하는 남자', color: '#0891b2', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'ENTP', catch: '아이디어 뱅크', desc: '논쟁을 좋아하지만 진실을 좇음', color: '#0e7490', bg1: '#cffafe', bg2: '#ecfeff' },
  { t: 'INFJ', catch: '섬세한 이상주의자', desc: '읽기 어려운 깊은 남자', color: '#be123c', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'INFP', catch: '감성 사색가', desc: '부드러움 뒤 단단한 가치관', color: '#e11d48', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ENFJ', catch: '모두의 멘토', desc: '따뜻한 리더의 숨은 고독', color: '#f43f5e', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ENFP', catch: '빛나는 자유인', desc: '재밌는데 갑자기 사라지는 남자', color: '#f43f5e', bg1: '#fce7f3', bg2: '#fdf2f8' },
  { t: 'ISTJ', catch: '믿음직한 약속남', desc: '무뚝뚝하지만 약속 하나 철저', color: '#047857', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ISFJ', catch: '조용한 수호자', desc: '세심한 돌봄, 아무도 모르는', color: '#059669', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ESTJ', catch: '책임의 리더', desc: '딱딱한 겉 × 책임지는 속', color: '#047857', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ESFJ', catch: '따뜻한 공동체', desc: '다정해 보이는데 책임감 최강', color: '#10b981', bg1: '#d1fae5', bg2: '#ecfdf5' },
  { t: 'ISTP', catch: '말 적은 장인', desc: '말은 적은데 손은 바쁜 남자', color: '#b45309', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ISFP', catch: '감각적 독립러', desc: '감성적이고 부드러운 자립인', color: '#d97706', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ESTP', catch: '계산된 용기', desc: '무모한 듯 계산된 용기의 남자', color: '#b45309', bg1: '#fef3c7', bg2: '#fffbeb' },
  { t: 'ESFP', catch: '자유로운 영혼', desc: '현재를 즐기는 빛나는 남자', color: '#f59e0b', bg1: '#fef3c7', bg2: '#fffbeb' },
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
  <linearGradient id="blueStripe" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.blue}" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="${C.blue}" stop-opacity="0.55"/>
  </linearGradient>
</defs>
<rect width="1200" height="900" fill="url(#bg)"/>

<!-- Decorative emoji/symbols -->
<text x="150" y="200" font-size="70" opacity="0.18">♂</text>
<text x="1000" y="200" font-size="70" opacity="0.18">⚡</text>
<text x="180" y="780" font-size="70" opacity="0.18">🎯</text>
<text x="980" y="760" font-size="70" opacity="0.18">💙</text>

<!-- Blue top stripe for "Men" series branding -->
<rect x="0" y="130" width="1200" height="6" fill="url(#blueStripe)"/>

<!-- Main card -->
<rect x="100" y="210" width="1000" height="480" rx="36" fill="${C.white}" stroke="${color}" stroke-width="5" opacity="0.97"/>

<!-- Series label -->
<text x="600" y="285" text-anchor="middle" font-size="28" font-weight="700" fill="${C.blue}" letter-spacing="8">♂ MEN GUIDE · 2026</text>

<!-- Huge type badge -->
<g transform="translate(600, 390)">
  <rect x="-170" y="-62" width="340" height="124" rx="28" fill="${color}"/>
  <text x="0" y="20" text-anchor="middle" font-size="92" font-weight="900" fill="#fff" letter-spacing="4">${t}</text>
</g>

<!-- Catch phrase -->
<text x="600" y="520" text-anchor="middle" font-size="60" font-weight="900" fill="${C.text}">${escapeXml(ct)}</text>

<!-- Description -->
<line x1="380" y1="550" x2="820" y2="550" stroke="${color}" stroke-width="2" opacity="0.4"/>
<text x="600" y="600" text-anchor="middle" font-size="28" font-weight="700" fill="${color}">${escapeXml(desc)}</text>

<!-- Sub tagline -->
<text x="600" y="660" text-anchor="middle" font-size="22" font-weight="600" fill="${C.textMuted}">인지기능 × 4기질 완전 해부 가이드</text>

<!-- Footer -->
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 남자 특징 완전정리</text>
</svg>`;
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const T of TYPES) {
    const name = `m2-${T.t.toLowerCase()}`;
    const svg = make(T);
    fs.writeFileSync(`${OUT_DIR}/${name}.svg`, svg, 'utf-8');
    await sharp(Buffer.from(svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(`${OUT_DIR}/${name}.webp`);
    console.log(`✓ ${name}`);
  }
  console.log(`\n✅ Generated ${TYPES.length} men guide thumbnails → ${OUT_DIR}`);
}

run();
