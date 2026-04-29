// 2026-04-30 신규 글 2개 hero 이미지
//   parents-day-mbti-2026-hero.webp     (어버이날 시즌성 — 만족도 충격)
//   mbti-changes-scientific-hero.webp   (학술 답변 — 50% 통계 강조)

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  white: '#ffffff',
  black: '#0a0a0a',
  cream: '#fef7ed',
  rose: '#f43f5e',
  pink: '#ec4899',
  orange: '#fb923c',
  carnation: '#ff5e7e',
  carnationDeep: '#c1184c',
  sage: '#84cc16',
  sageDeep: '#3f6212',
  navy: '#0b1437',
  midnight: '#1e1b4b',
  neonYellow: '#f5ff3d',
  neonCyan: '#00e5ff',
  neonMagenta: '#ff006e',
  warmYellow: '#fbbf24',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

// ─── 어버이날 가이드 ────────────────────────────────
// 컨셉: D-8 카운트다운 + 만족도 6.2/10 충격 통계 + 카네이션 모티프
// 색감: 따뜻한 핑크·코럴·옐로 (어버이날 감성)
// 좌표 사전 설계:
//   상단 D-Day 뱃지   | 70,80   320×56
//   메인 카피1 (이름) | 70,210  "어버이날 2026" font 76
//   충격 통계 강조    | 70,330  "만족도 6.2/10" font 88
//   부연              | 70,400  "왜 매년 빗나갈까?" font 36
//   4분류 박스 4개 (각 250×120)
//     SJ (45%):  x=70,  y=470
//     SP (28%):  x=340, y=470
//     NF (15%):  x=610, y=470
//     NT (12%):  x=880, y=470
//   하단 CTA          | 70,720  "MBTI별 부모님 코드 정답" + D-8
const svgParents = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-p" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.cream}"/>
      <stop offset="60%" stop-color="#fce7f3"/>
      <stop offset="100%" stop-color="#fed7d7"/>
    </linearGradient>
    <radialGradient id="glow-p" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${C.carnation}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${C.carnation}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-p)"/>
  <rect width="1200" height="900" fill="url(#glow-p)"/>

  <!-- D-Day 뱃지 -->
  <rect x="70" y="80" rx="10" width="320" height="56" fill="${C.carnationDeep}"/>
  <text x="230" y="118" text-anchor="middle" font-size="24" font-weight="900" fill="${C.white}" letter-spacing="1">🌹 5월 8일 D-8 가이드</text>

  <!-- 메인 카피 1: 시즌 -->
  <text x="70" y="210" font-size="76" font-weight="900" fill="${C.black}" letter-spacing="-3">어버이날 2026</text>

  <!-- 충격 통계 강조 -->
  <rect x="70" y="270" width="14" height="84" fill="${C.carnationDeep}"/>
  <text x="100" y="320" font-size="38" font-weight="800" fill="${C.carnationDeep}">한국 부모님 만족도</text>
  <text x="100" y="385" font-size="92" font-weight="900" fill="${C.black}" letter-spacing="-3">6.2 <tspan font-size="48" fill="${C.carnationDeep}">/ 10</tspan></text>

  <!-- 부연 -->
  <text x="70" y="445" font-size="34" font-weight="700" fill="${C.black}" opacity="0.85">왜 매년 빗나갈까? — 본인 결로 추정해서</text>

  <!-- 4분류 박스 -->
  <g transform="translate(70, 510)">
    <!-- SJ (오렌지) -->
    <rect x="0" y="0" rx="14" width="250" height="130" fill="${C.warmYellow}" opacity="0.25"/>
    <rect x="0" y="0" rx="14" width="250" height="130" fill="none" stroke="${C.warmYellow}" stroke-width="3"/>
    <text x="125" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.sageDeep}">SJ 관리자형</text>
    <text x="125" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="${C.black}">45%</text>
    <text x="125" y="110" text-anchor="middle" font-size="16" font-weight="700" fill="${C.black}" opacity="0.7">한국 60대 절반</text>

    <!-- SP (코럴) -->
    <rect x="270" y="0" rx="14" width="250" height="130" fill="${C.carnation}" opacity="0.25"/>
    <rect x="270" y="0" rx="14" width="250" height="130" fill="none" stroke="${C.carnation}" stroke-width="3"/>
    <text x="395" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.carnationDeep}">SP 탐험가형</text>
    <text x="395" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="${C.black}">28%</text>
    <text x="395" y="110" text-anchor="middle" font-size="16" font-weight="700" fill="${C.black}" opacity="0.7">경험 중심</text>

    <!-- NF (핑크) -->
    <rect x="540" y="0" rx="14" width="250" height="130" fill="${C.pink}" opacity="0.25"/>
    <rect x="540" y="0" rx="14" width="250" height="130" fill="none" stroke="${C.pink}" stroke-width="3"/>
    <text x="665" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.pink}">NF 외교관형</text>
    <text x="665" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="${C.black}">15%</text>
    <text x="665" y="110" text-anchor="middle" font-size="16" font-weight="700" fill="${C.black}" opacity="0.7">감정·서사</text>

    <!-- NT (그린) -->
    <rect x="810" y="0" rx="14" width="250" height="130" fill="${C.sage}" opacity="0.25"/>
    <rect x="810" y="0" rx="14" width="250" height="130" fill="none" stroke="${C.sage}" stroke-width="3"/>
    <text x="935" y="42" text-anchor="middle" font-size="22" font-weight="900" fill="${C.sageDeep}">NT 분석가형</text>
    <text x="935" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="${C.black}">12%</text>
    <text x="935" y="110" text-anchor="middle" font-size="16" font-weight="700" fill="${C.black}" opacity="0.7">효율·실용</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="700" width="14" height="60" fill="${C.carnationDeep}"/>
  <text x="100" y="730" font-size="28" font-weight="900" fill="${C.black}">MBTI별 부모님 코드 정답</text>
  <text x="100" y="762" font-size="20" font-weight="700" fill="${C.black}" opacity="0.8">대화법 + 선물 + 상호작용 매트릭스 · 5/8까지 8일 남았어</text>

  <!-- 하단 보조 정보 -->
  <text x="70" y="820" font-size="16" font-weight="700" fill="${C.carnationDeep}">📚 한국갤럽 2024 · Norton·Quenk 학술 인용</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.carnationDeep}">192types.co.kr</text>
</svg>`;

// ─── 학술 답변 글 ───────────────────────────────────
// 컨셉: "50% 정상" 충격 통계 + 학술적 권위 + 4가지 패턴 시각화
// 색감: 다크 네이비 + 시안 (학술 권위)
// 좌표:
//   뱃지              | 70,80   340×56
//   메인 질문         | 70,200  "MBTI 자꾸 바뀐다고?" font 64
//   충격 답변 (대형)  | 70,360  "50%" 거대 폰트 220
//   답변 부연         | 360,360 "는 정상" font 64
//   학술 출처         | 70,440  "Pittenger 1993 검사 신뢰도"
//   4패턴 박스 (4개)  | y=520
//     NP형:    x=70  w=250
//     IxxP형:  x=340 w=250
//     노이즈형: x=610 w=250
//     격동기형: x=880 w=250
//   하단 태그
const svgScientific = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.black}"/>
      <stop offset="55%" stop-color="${C.navy}"/>
      <stop offset="100%" stop-color="${C.midnight}"/>
    </linearGradient>
    <radialGradient id="glow-s" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${C.neonCyan}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${C.neonCyan}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-s)"/>
  <rect width="1200" height="900" fill="url(#glow-s)"/>

  <!-- 뱃지 -->
  <rect x="70" y="80" rx="10" width="340" height="56" fill="${C.neonCyan}"/>
  <text x="240" y="118" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">📚 학술 답변 · 메타 분석</text>

  <!-- 메인 질문 -->
  <text x="70" y="210" font-size="58" font-weight="900" fill="${C.white}" letter-spacing="-2">MBTI 결과 자꾸 바뀐다고?</text>

  <!-- 충격 답변: 50% 초대형 + "는 정상" (겹침 회피로 위치 분리) -->
  <text x="70" y="400" font-size="200" font-weight="900" fill="${C.neonCyan}" letter-spacing="-8" stroke="${C.black}" stroke-width="2">50%</text>
  <text x="540" y="370" font-size="56" font-weight="900" fill="${C.white}" letter-spacing="-2">는 정상이야</text>
  <text x="540" y="420" font-size="26" font-weight="700" fill="${C.neonCyan}" opacity="0.9">학술적으로 검증됐다</text>

  <!-- 학술 출처 라인 -->
  <rect x="70" y="465" width="14" height="40" fill="${C.neonCyan}"/>
  <text x="100" y="495" font-size="22" font-weight="800" fill="${C.white}">📖 Pittenger 1993 · Beebe 8기능 · Marcia 정체성 4단계</text>

  <!-- 4패턴 박스 -->
  <g transform="translate(70, 540)">
    <!-- NP 뼈대형 (V) -->
    <rect x="0" y="0" rx="12" width="250" height="130" fill="${C.neonMagenta}" opacity="0.18"/>
    <rect x="0" y="0" rx="12" width="250" height="130" fill="none" stroke="${C.neonMagenta}" stroke-width="3"/>
    <text x="125" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonMagenta}" letter-spacing="1">패턴 1</text>
    <text x="125" y="78" text-anchor="middle" font-size="34" font-weight="900" fill="${C.white}">NP 뼈대형</text>
    <text x="125" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.white}" opacity="0.85">V (BTS) 사례</text>

    <!-- IxxP 뼈대형 (정국) -->
    <rect x="270" y="0" rx="12" width="250" height="130" fill="${C.warmYellow}" opacity="0.18"/>
    <rect x="270" y="0" rx="12" width="250" height="130" fill="none" stroke="${C.warmYellow}" stroke-width="3"/>
    <text x="395" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="${C.warmYellow}" letter-spacing="1">패턴 2</text>
    <text x="395" y="78" text-anchor="middle" font-size="34" font-weight="900" fill="${C.white}">IxxP 뼈대</text>
    <text x="395" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.white}" opacity="0.85">정국 (BTS) 사례</text>

    <!-- 검사 노이즈형 -->
    <rect x="540" y="0" rx="12" width="250" height="130" fill="${C.neonCyan}" opacity="0.18"/>
    <rect x="540" y="0" rx="12" width="250" height="130" fill="none" stroke="${C.neonCyan}" stroke-width="3"/>
    <text x="665" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonCyan}" letter-spacing="1">패턴 3</text>
    <text x="665" y="78" text-anchor="middle" font-size="32" font-weight="900" fill="${C.white}">검사 노이즈</text>
    <text x="665" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.white}" opacity="0.85">인구 60%+ 가장 흔함</text>

    <!-- 격동기형 -->
    <rect x="810" y="0" rx="12" width="250" height="130" fill="${C.neonYellow}" opacity="0.18"/>
    <rect x="810" y="0" rx="12" width="250" height="130" fill="none" stroke="${C.neonYellow}" stroke-width="3"/>
    <text x="935" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonYellow}" letter-spacing="1">패턴 4</text>
    <text x="935" y="78" text-anchor="middle" font-size="34" font-weight="900" fill="${C.white}">격동기형</text>
    <text x="935" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.white}" opacity="0.85">큰 환경 변화 직후</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="730" width="14" height="60" fill="${C.neonCyan}"/>
  <text x="100" y="760" font-size="26" font-weight="900" fill="${C.white}">너의 변동 패턴은 어느 쪽?</text>
  <text x="100" y="792" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">V·정국·카리나·장원영 사례로 풀어본 4가지 변화 패턴 분류</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonCyan}">192types.co.kr</text>
</svg>`;

const images = [
  { name: 'parents-day-mbti-2026-hero', svg: svgParents },
  { name: 'mbti-changes-scientific-hero', svg: svgScientific },
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
