// 2026-05-04 스승의날 글 hero 이미지
// 컨셉: D-11 카운트다운 + 김영란법 안전 영역 명시 + 4분류 박스
// 색감: 진중·따뜻한 톤 (네이비 + 카네이션 핑크)

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  white: '#ffffff',
  black: '#0a0a0a',
  navy: '#1e3a5f',
  navyDeep: '#0f2444',
  cream: '#fef7e6',
  carnation: '#ff6b8b',
  carnationDeep: '#c1184c',
  warmYellow: '#fbbf24',
  warmYellowDeep: '#d97706',
  green: '#16a34a',
  greenDeep: '#15803d',
  blue: '#3b82f6',
  blueDeep: '#1e40af',
  rose: '#f43f5e',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.navyDeep}"/>
      <stop offset="60%" stop-color="${C.navy}"/>
      <stop offset="100%" stop-color="${C.navyDeep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${C.carnation}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${C.carnation}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#glow)"/>

  <!-- D-Day 뱃지 -->
  <rect x="70" y="80" rx="10" width="320" height="56" fill="${C.carnationDeep}"/>
  <text x="230" y="118" text-anchor="middle" font-size="24" font-weight="900" fill="${C.white}" letter-spacing="1">🌹 5월 15일 D-11 가이드</text>

  <!-- 메인 카피 1 -->
  <text x="70" y="210" font-size="76" font-weight="900" fill="${C.white}" letter-spacing="-3">스승의날 2026</text>

  <!-- 충격 한 줄 -->
  <rect x="70" y="270" width="14" height="76" fill="${C.carnation}"/>
  <text x="100" y="315" font-size="42" font-weight="900" fill="${C.carnation}" letter-spacing="-1">선물 거의 다 ❌</text>
  <text x="100" y="350" font-size="22" font-weight="700" fill="${C.white}" opacity="0.85">김영란법 시대의 정답: 메시지 + 손편지 + 카네이션</text>

  <!-- 합법 vs 불법 박스 -->
  <g transform="translate(70, 390)">
    <!-- 합법 영역 -->
    <rect x="0" y="0" rx="14" width="510" height="100" fill="${C.green}" opacity="0.25"/>
    <rect x="0" y="0" rx="14" width="510" height="100" fill="none" stroke="${C.green}" stroke-width="3"/>
    <text x="40" y="42" font-size="22" font-weight="900" fill="${C.green}">✅ 합법 영역</text>
    <text x="40" y="78" font-size="18" font-weight="700" fill="${C.white}" opacity="0.9">카톡 · 손편지 · 카네이션 1송이</text>

    <!-- 불법 영역 -->
    <rect x="540" y="0" rx="14" width="510" height="100" fill="${C.rose}" opacity="0.18"/>
    <rect x="540" y="0" rx="14" width="510" height="100" fill="none" stroke="${C.rose}" stroke-width="3"/>
    <text x="580" y="42" font-size="22" font-weight="900" fill="${C.rose}">❌ 불법 영역</text>
    <text x="580" y="78" font-size="18" font-weight="700" fill="${C.white}" opacity="0.9">현금·상품권·5만원 초과 선물</text>
  </g>

  <!-- 4분류 박스 (선생님 MBTI) -->
  <g transform="translate(70, 520)">
    <!-- SJ -->
    <rect x="0" y="0" rx="14" width="250" height="120" fill="${C.warmYellow}" opacity="0.20"/>
    <rect x="0" y="0" rx="14" width="250" height="120" fill="none" stroke="${C.warmYellow}" stroke-width="3"/>
    <text x="125" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.warmYellow}">SJ 관리자형</text>
    <text x="125" y="78" text-anchor="middle" font-size="38" font-weight="900" fill="${C.white}">50%</text>
    <text x="125" y="105" text-anchor="middle" font-size="14" font-weight="700" fill="${C.white}" opacity="0.7">디테일·전통</text>

    <!-- NF -->
    <rect x="270" y="0" rx="14" width="250" height="120" fill="${C.carnation}" opacity="0.22"/>
    <rect x="270" y="0" rx="14" width="250" height="120" fill="none" stroke="${C.carnation}" stroke-width="3"/>
    <text x="395" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.carnation}">NF 외교관형</text>
    <text x="395" y="78" text-anchor="middle" font-size="38" font-weight="900" fill="${C.white}">20%</text>
    <text x="395" y="105" text-anchor="middle" font-size="14" font-weight="700" fill="${C.white}" opacity="0.7">감정·서사</text>

    <!-- NT -->
    <rect x="540" y="0" rx="14" width="250" height="120" fill="${C.blue}" opacity="0.22"/>
    <rect x="540" y="0" rx="14" width="250" height="120" fill="none" stroke="${C.blue}" stroke-width="3"/>
    <text x="665" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.blue}">NT 분석가형</text>
    <text x="665" y="78" text-anchor="middle" font-size="38" font-weight="900" fill="${C.white}">18%</text>
    <text x="665" y="105" text-anchor="middle" font-size="14" font-weight="700" fill="${C.white}" opacity="0.7">논리·구체</text>

    <!-- SP -->
    <rect x="810" y="0" rx="14" width="250" height="120" fill="${C.green}" opacity="0.22"/>
    <rect x="810" y="0" rx="14" width="250" height="120" fill="none" stroke="${C.green}" stroke-width="3"/>
    <text x="935" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.green}">SP 탐험가형</text>
    <text x="935" y="78" text-anchor="middle" font-size="38" font-weight="900" fill="${C.white}">12%</text>
    <text x="935" y="105" text-anchor="middle" font-size="14" font-weight="700" fill="${C.white}" opacity="0.7">활동·즉흥</text>
  </g>

  <!-- 한국 교사 비고 -->
  <text x="70" y="675" font-size="16" font-weight="700" fill="${C.white}" opacity="0.7">📊 한국 교사 MBTI 분포 추정 — SJ 절반, 모르겠으면 SJ 결로</text>

  <!-- 하단 태그라인 -->
  <rect x="70" y="720" width="14" height="60" fill="${C.carnation}"/>
  <text x="100" y="750" font-size="28" font-weight="900" fill="${C.white}">선생님 MBTI별 한국어 메시지 템플릿</text>
  <text x="100" y="782" font-size="20" font-weight="700" fill="${C.white}" opacity="0.85">학생용 · 학부모용 둘 다 활용 · 5/15 D-11 단계별 체크리스트</text>

  <!-- 학술 출처 -->
  <text x="70" y="830" font-size="16" font-weight="700" fill="${C.carnation}">📚 청탁금지법 2026 · Quenk SJ Si 분석 · Norton 수제 메시지</text>

  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.carnation}">192types.co.kr</text>
</svg>`;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const name = 'teachers-day-mbti-2026-hero';
const svgPath = path.join(OUT_DIR, `${name}.svg`);
const webpPath = path.join(OUT_DIR, `${name}.webp`);
fs.writeFileSync(svgPath, svg);
await sharp(Buffer.from(svg), { density: 200 }).resize(1200).webp({ quality: 90 }).toFile(webpPath);
const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
console.log(`✅ ${name}.webp (${kb} KB)`);
