// 2026-05-02 SBTI vs MBTI 결과 차이 hero 이미지
//   sbti-mbti-different-hero.webp
//
// 컨셉: "같은 사람, 다른 결과" 충격 카피 + 측정 차원 비교 시각화
// 좌표 사전 설계:
//   뱃지       | 70,80   380×56
//   메인 카피1 | 70,210  "같은 사람인데" font 56
//   메인 카피2 | 70,300  "결과는 완전 달라?" font 70
//   대형 비교 (좌·우 박스):
//     SBTI:  x=70,  y=380, w=510, h=170
//     화살표: x=600, y=465 ↔ (양방향)
//     MBTI:  x=620, y=380, w=510, h=170
//   본질 카피  | 70,610  "측정 차원이 다르다" font 50
//   부연      | 70,660  "검사 오류 아님 — 두 검사가 다른 각도로 본다"
//   학술 출처  | 70,720
//   하단 태그  | 70,790

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
  deepIndigo: '#312e81',
  neonPink: '#ff2d8a',
  neonCyan: '#00e5ff',
  neonYellow: '#f5ff3d',
  neonMagenta: '#ff006e',
  neonOrange: '#ff6b1a',
  warmYellow: '#fbbf24',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.black}"/>
      <stop offset="50%" stop-color="${C.deepIndigo}"/>
      <stop offset="100%" stop-color="${C.midnight}"/>
    </linearGradient>
    <radialGradient id="glow-l" cx="20%" cy="40%" r="40%">
      <stop offset="0%" stop-color="${C.neonPink}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${C.neonPink}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-r" cx="80%" cy="40%" r="40%">
      <stop offset="0%" stop-color="${C.neonCyan}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${C.neonCyan}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#glow-l)"/>
  <rect width="1200" height="900" fill="url(#glow-r)"/>

  <!-- 뱃지 -->
  <rect x="70" y="80" rx="10" width="380" height="56" fill="${C.neonYellow}"/>
  <text x="260" y="118" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">📚 학술 답변 · 측정 차원 분석</text>

  <!-- 메인 카피 -->
  <text x="70" y="210" font-size="50" font-weight="900" fill="${C.white}" opacity="0.85" letter-spacing="-2">같은 사람인데</text>
  <text x="70" y="290" font-size="68" font-weight="900" fill="${C.neonYellow}" letter-spacing="-3">결과는 완전 달라?</text>

  <!-- 비교 박스 좌·우 -->
  <g transform="translate(70, 370)">
    <!-- SBTI 박스 (좌측 핑크) -->
    <rect x="0" y="0" rx="14" width="510" height="170" fill="${C.neonPink}" opacity="0.18"/>
    <rect x="0" y="0" rx="14" width="510" height="170" fill="none" stroke="${C.neonPink}" stroke-width="3"/>
    <text x="40" y="55" font-size="40" font-weight="900" fill="${C.neonPink}" letter-spacing="-1">SBTI</text>
    <text x="170" y="55" font-size="22" font-weight="800" fill="${C.white}">CTRL</text>
    <text x="40" y="100" font-size="20" font-weight="700" fill="${C.white}" opacity="0.85">행동 패턴 매칭형</text>
    <text x="40" y="135" font-size="16" font-weight="700" fill="${C.white}" opacity="0.7">27유형 × 5대 영역 × 15차원</text>

    <!-- 양방향 화살표 (위에 ≠) -->
    <text x="585" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="${C.neonYellow}">≠</text>
    <text x="585" y="120" text-anchor="middle" font-size="20" font-weight="800" fill="${C.white}" opacity="0.85">다른 차원</text>

    <!-- MBTI 박스 (우측 시안) -->
    <rect x="610" y="0" rx="14" width="510" height="170" fill="${C.neonCyan}" opacity="0.18"/>
    <rect x="610" y="0" rx="14" width="510" height="170" fill="none" stroke="${C.neonCyan}" stroke-width="3"/>
    <text x="650" y="55" font-size="40" font-weight="900" fill="${C.neonCyan}" letter-spacing="-1">MBTI</text>
    <text x="790" y="55" font-size="22" font-weight="800" fill="${C.white}">INFP</text>
    <text x="650" y="100" font-size="20" font-weight="700" fill="${C.white}" opacity="0.85">인지기능 양식 분류형</text>
    <text x="650" y="135" font-size="16" font-weight="700" fill="${C.white}" opacity="0.7">16범주 × Jung 8기능</text>
  </g>

  <!-- 본질 카피 -->
  <rect x="70" y="600" width="14" height="64" fill="${C.neonYellow}"/>
  <text x="100" y="640" font-size="44" font-weight="900" fill="${C.neonYellow}" letter-spacing="-2">측정 차원이 다르다</text>
  <text x="100" y="678" font-size="22" font-weight="700" fill="${C.white}" opacity="0.9">검사 오류 아님 — 두 검사가 다른 각도로 본다</text>

  <!-- 학술 출처 박스 -->
  <g transform="translate(70, 710)">
    <rect x="0" y="0" rx="10" width="1060" height="60" fill="${C.white}" opacity="0.08"/>
    <rect x="0" y="0" rx="10" width="1060" height="60" fill="none" stroke="${C.white}" stroke-width="1.5" stroke-opacity="0.3"/>
    <text x="30" y="38" font-size="18" font-weight="800" fill="${C.warmYellow}">📖 Pittenger 1993 · McCrae &amp; Costa 1989 · Boyle 1995 · 아푸 SBTI 공식 자료</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="800" width="14" height="56" fill="${C.neonYellow}"/>
  <text x="100" y="828" font-size="24" font-weight="900" fill="${C.white}">결과 차이의 5가지 원인 + FAQ 6 + 일반화 매핑</text>
  <text x="100" y="855" font-size="16" font-weight="700" fill="${C.white}" opacity="0.85">범주형 vs 태그 매칭형 · 신뢰도 33년 vs 0년 · 학술 인용</text>

  <text x="1130" y="876" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonYellow}">192types.co.kr</text>
</svg>`;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const name = 'sbti-mbti-different-hero';
const svgPath = path.join(OUT_DIR, `${name}.svg`);
const webpPath = path.join(OUT_DIR, `${name}.webp`);
fs.writeFileSync(svgPath, svg);
await sharp(Buffer.from(svg), { density: 200 }).resize(1200).webp({ quality: 90 }).toFile(webpPath);
const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
console.log(`✅ ${name}.webp (${kb} KB)`);
