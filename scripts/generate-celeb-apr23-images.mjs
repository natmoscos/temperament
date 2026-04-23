// 2026-04-23 연예인 MBTI 글 2개 hero 이미지 (자극적 타이포 스타일)
//   kim-soo-hyun-mbti-01-hero.webp  (ISFJ 추정, 눈물의 여왕)
//   jang-wonyoung-mbti-01-hero.webp (ENTJ 본인 공개, IVE)
//
// 디자인 원칙:
//   - 비비드 그라디언트 full-bleed 배경 (구글 이미지 검색에서 즉시 차별화)
//   - 대형 타이포그래피 우세 (이모지 최소)
//   - 네온 액센트·취소선·강조 라벨로 호기심 유발
//   - 텍스트 읽기만으로 "뭐? 반전이야?" 훅 작동

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  white: '#ffffff',
  black: '#0a0a0a',
  navy: '#0b1437',
  midnight: '#1e1b4b',
  neonYellow: '#f5ff3d',
  neonPink: '#ff2d8a',
  neonMagenta: '#ff006e',
  neonCyan: '#00e5ff',
  neonLime: '#c6ff1a',
  hotPink: '#ff3bac',
  cobalt: '#1446ff',
  violet: '#7c3aed',
  deepRed: '#be0032',
  amber: '#ffb020',
  shadow: 'rgba(0,0,0,0.35)',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── 김수현 ISFJ ─────────────────────────────────────
// 컨셉: "김수현 MBTI? → 공식 비공개 → 팬 추정 ISFJ"의 3단 반전
const svgKimSooHyun = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-k" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.navy}"/>
      <stop offset="55%" stop-color="${C.midnight}"/>
      <stop offset="100%" stop-color="${C.black}"/>
    </linearGradient>
    <radialGradient id="glow-k" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="${C.neonPink}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${C.neonPink}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-k)"/>
  <rect width="1200" height="900" fill="url(#glow-k)"/>

  <!-- 좌상단 뱃지 -->
  <rect x="70" y="80" rx="8" width="280" height="52" fill="${C.neonYellow}"/>
  <text x="210" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">🎭 배우 MBTI 분석</text>

  <!-- 메인 카피 1: 질문 -->
  <text x="70" y="280" font-size="110" font-weight="900" fill="${C.white}" letter-spacing="-3">김수현</text>
  <text x="440" y="280" font-size="110" font-weight="900" fill="${C.neonYellow}" letter-spacing="-3">MBTI?</text>

  <!-- 메인 카피 2: 반전 라벨 -->
  <rect x="70" y="330" width="420" height="4" fill="${C.neonPink}"/>
  <text x="70" y="400" font-size="44" font-weight="800" fill="${C.neonPink}" letter-spacing="-1">공식 비공개</text>
  <text x="70" y="450" font-size="30" font-weight="700" fill="${C.white}" opacity="0.85">→ 팬 커뮤니티 다수 추정</text>

  <!-- 메인 카피 3: 진짜 답 (초대형) -->
  <text x="70" y="720" font-size="250" font-weight="900" fill="${C.neonYellow}" letter-spacing="-8">ISFJ</text>

  <!-- 우측 포인트 라벨 -->
  <g transform="translate(780, 430)">
    <rect x="0" y="0" rx="14" width="360" height="180" fill="${C.white}" opacity="0.08"/>
    <rect x="0" y="0" rx="14" width="360" height="180" fill="none" stroke="${C.neonPink}" stroke-width="3"/>
    <text x="180" y="60" text-anchor="middle" font-size="26" font-weight="900" fill="${C.neonPink}" letter-spacing="1">왜 ISFJ?</text>
    <text x="180" y="105" text-anchor="middle" font-size="20" font-weight="700" fill="${C.white}">백현우·도민준·백승찬</text>
    <text x="180" y="140" text-anchor="middle" font-size="20" font-weight="700" fill="${C.white}">세 캐릭터의 공통 Si</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="775" width="14" height="52" fill="${C.neonYellow}"/>
  <text x="100" y="800" font-size="22" font-weight="800" fill="${C.white}">눈물의 여왕 백현우로 읽는 수호자 기질</text>
  <text x="100" y="830" font-size="18" font-weight="600" fill="${C.white}" opacity="0.7">15년 롱런의 비밀 · 김지원과의 케미 분석</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonYellow}" opacity="0.9">192types.co.kr</text>
</svg>`;

// ─── 장원영 ENTJ ──────────────────────────────────────
// 컨셉: "ENFP라고?" 취소선 → "ENTJ" 초대형 폭발
const svgJangWonyoung = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-w" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.hotPink}"/>
      <stop offset="50%" stop-color="${C.neonMagenta}"/>
      <stop offset="100%" stop-color="${C.cobalt}"/>
    </linearGradient>
    <radialGradient id="glow-w" cx="20%" cy="85%" r="60%">
      <stop offset="0%" stop-color="${C.neonYellow}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${C.neonYellow}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-w)"/>
  <rect width="1200" height="900" fill="url(#glow-w)"/>

  <!-- 좌상단 뱃지: 본인 입 공개 -->
  <rect x="70" y="80" rx="8" width="360" height="52" fill="${C.black}"/>
  <text x="250" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.neonYellow}" letter-spacing="1">✦ 본인 입으로 공개</text>

  <!-- 상단 이름 -->
  <text x="70" y="250" font-size="90" font-weight="900" fill="${C.white}" letter-spacing="-3">IVE 장원영</text>

  <!-- 반전 섹션: ENFP? 취소선 (글자 중앙 통과) -->
  <text x="70" y="400" font-size="88" font-weight="900" fill="${C.white}" opacity="0.85" letter-spacing="-2">ENFP 아냐</text>
  <line x1="55" y1="365" x2="625" y2="365" stroke="${C.neonYellow}" stroke-width="12"/>

  <!-- 메인 카피: ENTJ 초대형 -->
  <text x="70" y="660" font-size="290" font-weight="900" fill="${C.neonYellow}" letter-spacing="-10" stroke="${C.black}" stroke-width="3">ENTJ</text>

  <!-- 하단 태그라인 -->
  <rect x="70" y="750" width="14" height="58" fill="${C.neonYellow}"/>
  <text x="100" y="780" font-size="28" font-weight="900" fill="${C.white}">럭키비키 뒤에 숨은 사령관의 두뇌</text>
  <text x="100" y="812" font-size="20" font-weight="700" fill="${C.white}" opacity="0.92">2025년 덱스 냉터뷰 최초 공개 · Te 주기능 완전 해부</text>

  <!-- 우측 포인트 스티커 -->
  <g transform="translate(820, 230)">
    <circle cx="140" cy="140" r="140" fill="${C.neonYellow}"/>
    <text x="140" y="105" text-anchor="middle" font-size="28" font-weight="900" fill="${C.black}">대중 인식</text>
    <text x="140" y="145" text-anchor="middle" font-size="28" font-weight="900" fill="${C.black}" opacity="0.55">ENFP</text>
    <line x1="65" y1="140" x2="215" y2="140" stroke="${C.neonMagenta}" stroke-width="7"/>
    <text x="140" y="185" text-anchor="middle" font-size="26" font-weight="900" fill="${C.black}">실제 공개</text>
    <text x="140" y="220" text-anchor="middle" font-size="38" font-weight="900" fill="${C.neonMagenta}">ENTJ ✓</text>
  </g>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.white}" opacity="0.95">192types.co.kr</text>
</svg>`;

// ─── 렌더 ───────────────────────────────────────────
const images = [
  { name: 'kim-soo-hyun-mbti-01-hero', svg: svgKimSooHyun },
  { name: 'jang-wonyoung-mbti-01-hero', svg: svgJangWonyoung },
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
