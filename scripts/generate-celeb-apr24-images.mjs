// 2026-04-24 연예인 MBTI 글 2개 hero 이미지 (타이포 스타일 v2)
//   an-yujin-mbti-01-hero.webp       (ISTP 본인 공개, IVE 리더)
//   jungkook-mbti-01-hero.webp       (INFP→ISFP→INTP 변화 서사, BTS)
//
// 설계 원칙 (어제 피드백 반영):
//   1. 모든 요소 y좌표 + font-size 충돌 사전 계산
//   2. 박스 내 텍스트는 text-anchor="middle" + 수직 중앙 계산
//   3. 텍스트 간격 ≥ font-size * 1.4 확보
//   4. Read 2회 QA 예정

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  white: '#ffffff',
  black: '#0a0a0a',
  deepViolet: '#1a0b3d',
  midViolet: '#2d1b69',
  neonCyan: '#00e5ff',
  neonMint: '#0fffa1',
  neonYellow: '#f5ff3d',
  neonPink: '#ff2d8a',
  neonMagenta: '#ff006e',
  neonOrange: '#ff6b1a',
  neonGreen: '#7cff5b',
  neonBlue: '#4d8bff',
  purpleDark: '#2d0a4e',
  purpleMid: '#4c1d95',
  btsViolet: '#7c3aed',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── 안유진 ISTP ─────────────────────────────────────
// 레이아웃 (1200×900):
//   뱃지    | 70,80      → 310,132 (rect 280×52)
//   이름    | 70,230     "IVE 안유진" (font 86)
//   반전    | 70,340     "ENFP? 아냐" 취소선 (font 64) stroke y=315
//   ISTP    | 70,690     초대형 (font 280, top≈480)   → 반전 340+ ISTP top 480 gap 140 ✓
//   우측원  | 중심 980,450 r=135   (ISTP 최대 x ≈ 730, gap 55 ✓)
//   태그    | 70,810     "IVE 리더의 냉철한 장인 기질" (font 26)
//   서브    | 70,842     "장원영 ENTJ와 같은 T, 다른 결" (font 18)
const svgAnYujin = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.deepViolet}"/>
      <stop offset="55%" stop-color="${C.midViolet}"/>
      <stop offset="100%" stop-color="${C.black}"/>
    </linearGradient>
    <radialGradient id="glow-a" cx="85%" cy="30%" r="55%">
      <stop offset="0%" stop-color="${C.neonCyan}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${C.neonCyan}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-a)"/>
  <rect width="1200" height="900" fill="url(#glow-a)"/>

  <!-- 뱃지 (상단) -->
  <rect x="70" y="80" rx="8" width="280" height="52" fill="${C.neonCyan}"/>
  <text x="210" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">⚡ 본인 입으로 공개</text>

  <!-- 이름 -->
  <text x="70" y="230" font-size="86" font-weight="900" fill="${C.white}" letter-spacing="-3">IVE 안유진</text>

  <!-- 반전 섹션: ENFP? 아냐 (취소선 글자 중앙 통과) -->
  <text x="70" y="345" font-size="64" font-weight="900" fill="${C.white}" opacity="0.85" letter-spacing="-2">ENFP? 아냐</text>
  <line x1="55" y1="327" x2="490" y2="327" stroke="${C.neonCyan}" stroke-width="10"/>

  <!-- ISTP 초대형 -->
  <text x="70" y="690" font-size="260" font-weight="900" fill="${C.neonCyan}" letter-spacing="-8" stroke="${C.black}" stroke-width="2">ISTP</text>

  <!-- 우측 원형 포인트 스티커 (중심 980,450 반경 135) -->
  <circle cx="980" cy="450" r="135" fill="${C.white}" opacity="0.06"/>
  <circle cx="980" cy="450" r="135" fill="none" stroke="${C.neonCyan}" stroke-width="4"/>
  <text x="980" y="400" text-anchor="middle" font-size="22" font-weight="900" fill="${C.neonCyan}" letter-spacing="1">IVE 두 센터</text>
  <text x="980" y="440" text-anchor="middle" font-size="24" font-weight="900" fill="${C.white}">장원영 ENTJ</text>
  <text x="980" y="470" text-anchor="middle" font-size="20" font-weight="700" fill="${C.white}" opacity="0.7">+</text>
  <text x="980" y="500" text-anchor="middle" font-size="24" font-weight="900" fill="${C.neonCyan}">안유진 ISTP</text>
  <text x="980" y="532" text-anchor="middle" font-size="18" font-weight="800" fill="${C.white}" opacity="0.85">둘 다 T</text>

  <!-- 하단 태그라인 -->
  <rect x="70" y="780" width="14" height="58" fill="${C.neonCyan}"/>
  <text x="100" y="810" font-size="26" font-weight="900" fill="${C.white}">IVE 리더의 냉철한 장인 기질</text>
  <text x="100" y="842" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">장원영 ENTJ와 같은 T, 다른 결 · Ti-Se 조합 해부</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonCyan}" opacity="0.9">192types.co.kr</text>
</svg>`;

// ─── 정국 INFP→ISFP→INTP 변화 ────────────────────────
// 레이아웃 (1200×900):
//   뱃지    | 70,80      → 380,132 (rect 310×52)
//   이름    | 70,230     "BTS 정국" (font 86)
//   변화서사 (3 박스 + 2 화살표 수평 배치):
//     Box1 (2019 INFP): x=70,  y=300, w=320, h=170  → 중심 230, 385
//     Arrow1:           x=408, y=385  "→"
//     Box2 (2020 ISFP): x=440, y=300, w=320, h=170  → 중심 600, 385
//     Arrow2:           x=778, y=385  "→"
//     Box3 (2022 INTP): x=810, y=300, w=320, h=170  → 중심 970, 385
//   강조선  | x=70,520 w=20 h=80 (왼쪽 세로선)
//   카피   | 100,560     "I와 P는 평생 고정" (font 56)
//   부연   | 100,610     "= 정국의 IxxP 뼈대" (font 28)
//   태그   | 70,780      바 + "본인이 밝힌 MBTI 변화 서사" (font 26)
//   서브   | 100,842     "각 시기 인지기능 재배치 완전 분석" (font 18)
const svgJungkook = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-j" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.black}"/>
      <stop offset="55%" stop-color="${C.purpleDark}"/>
      <stop offset="100%" stop-color="${C.purpleMid}"/>
    </linearGradient>
    <radialGradient id="glow-j" cx="50%" cy="80%" r="70%">
      <stop offset="0%" stop-color="${C.btsViolet}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${C.btsViolet}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-j)"/>
  <rect width="1200" height="900" fill="url(#glow-j)"/>

  <!-- 뱃지 (상단) -->
  <rect x="70" y="80" rx="8" width="310" height="52" fill="${C.neonYellow}"/>
  <text x="225" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">🎤 3번 바뀐 MBTI</text>

  <!-- 이름 -->
  <text x="70" y="230" font-size="86" font-weight="900" fill="${C.white}" letter-spacing="-3">BTS 정국</text>

  <!-- 변화 박스 3개 + 화살표 2개 (수평 배치) -->
  <!-- Box1: 2019 INFP (주황/핑크 = 감정) -->
  <rect x="70" y="300" rx="16" width="320" height="170" fill="${C.neonOrange}" opacity="0.15"/>
  <rect x="70" y="300" rx="16" width="320" height="170" fill="none" stroke="${C.neonOrange}" stroke-width="4"/>
  <text x="230" y="350" text-anchor="middle" font-size="26" font-weight="900" fill="${C.neonOrange}" letter-spacing="1">2019</text>
  <text x="230" y="430" text-anchor="middle" font-size="72" font-weight="900" fill="${C.white}" letter-spacing="-2">INFP</text>

  <!-- Arrow1: → -->
  <text x="412" y="405" text-anchor="middle" font-size="44" font-weight="900" fill="${C.neonYellow}">→</text>

  <!-- Box2: 2020 ISFP (그린 = 감각) -->
  <rect x="440" y="300" rx="16" width="320" height="170" fill="${C.neonGreen}" opacity="0.15"/>
  <rect x="440" y="300" rx="16" width="320" height="170" fill="none" stroke="${C.neonGreen}" stroke-width="4"/>
  <text x="600" y="350" text-anchor="middle" font-size="26" font-weight="900" fill="${C.neonGreen}" letter-spacing="1">2020</text>
  <text x="600" y="430" text-anchor="middle" font-size="72" font-weight="900" fill="${C.white}" letter-spacing="-2">ISFP</text>

  <!-- Arrow2: → -->
  <text x="782" y="405" text-anchor="middle" font-size="44" font-weight="900" fill="${C.neonYellow}">→</text>

  <!-- Box3: 2022 INTP (블루 = 논리) -->
  <rect x="810" y="300" rx="16" width="320" height="170" fill="${C.neonBlue}" opacity="0.18"/>
  <rect x="810" y="300" rx="16" width="320" height="170" fill="none" stroke="${C.neonBlue}" stroke-width="4"/>
  <text x="970" y="350" text-anchor="middle" font-size="26" font-weight="900" fill="${C.neonBlue}" letter-spacing="1">2022</text>
  <text x="970" y="430" text-anchor="middle" font-size="72" font-weight="900" fill="${C.white}" letter-spacing="-2">INTP</text>

  <!-- 강조 세로선 + 본인 발언 인용 -->
  <rect x="70" y="530" width="14" height="90" fill="${C.neonYellow}"/>
  <text x="100" y="570" font-size="56" font-weight="900" fill="${C.neonYellow}" letter-spacing="-2">I와 P는 평생 고정</text>
  <text x="100" y="610" font-size="26" font-weight="700" fill="${C.white}" opacity="0.9">= 정국의 IxxP 뼈대는 안 바뀐다</text>

  <!-- 하단 태그라인 -->
  <rect x="70" y="780" width="14" height="58" fill="${C.neonYellow}"/>
  <text x="100" y="810" font-size="26" font-weight="900" fill="${C.white}">본인이 밝힌 MBTI 변화 서사</text>
  <text x="100" y="842" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">각 시기 인지기능 재배치 완전 분석 · Fi → Fi → Ti</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonYellow}" opacity="0.9">192types.co.kr</text>
</svg>`;

// ─── 렌더 ───────────────────────────────────────────
const images = [
  { name: 'an-yujin-mbti-01-hero', svg: svgAnYujin },
  { name: 'jungkook-mbti-01-hero', svg: svgJungkook },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { name, svg } of images) {
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  const webpPath = path.join(OUT_DIR, `${name}.webp`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg), { density: 200 }).resize(1200).webp({ quality: 90 }).toFile(webpPath);
  const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  console.log(`✅ ${name}.webp (${kb} KB)`);
}
console.log(`\n완료: ${images.length}/${images.length}`);
