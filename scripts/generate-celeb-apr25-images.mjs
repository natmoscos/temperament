// 2026-04-25 연예인 MBTI 글 2개 hero 이미지 (v2 스타일 — 변화 서사 강조)
//   bts-v-mbti-01-hero.webp     (V 4번 변화: ENFP→INFP→ENTP)
//   karina-mbti-01-hero.webp    (카리나 5번 변화: ENTJ→ESTJ→INTJ→ISFJ→ESTJ)
//
// v2 디자인 컨셉:
//   - 변화 타임라인을 시각화 (정국 글 박스 디자인 확장)
//   - 학술적 권위감 연출 (참고 문헌 짧게 노출)
//   - 강한 호기심 카피 ("4번 바뀐 V", "5번 변동 카리나")

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  white: '#ffffff',
  black: '#0a0a0a',
  midnight: '#1e1b4b',
  navy: '#0b1437',
  btsViolet: '#7c3aed',
  btsDeep: '#2d0a4e',
  neonYellow: '#f5ff3d',
  neonPink: '#ff2d8a',
  neonMagenta: '#ff006e',
  neonCyan: '#00e5ff',
  neonOrange: '#ff6b1a',
  neonGreen: '#7cff5b',
  neonBlue: '#4d8bff',
  neonPurple: '#c084fc',
  cobalt: '#1446ff',
  hotPink: '#ff3bac',
  espaTeal: '#0fdfb5',
  espaDeep: '#062231',
  espaGold: '#ffd700',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── BTS V (김태형) — 4번 변화 시각화 ───────────────
// 레이아웃 (1200×900):
//   뱃지    | 70,80    310×52  "🎤 4번 바뀐 MBTI"
//   이름    | 70,230   "BTS V 김태형" (font 86)
//   변화박스 4개 + 화살표 3개:
//     Box1 (2019 ENFP):   x=70,  y=300, w=240, h=140  (오렌지)
//     Arrow1:             x=320, y=370 "→"
//     Box2 (2021 INFP):   x=350, y=300, w=240, h=140  (핑크)
//     Arrow2:             x=600, y=370 "→"
//     Box3 (2025 ENTP):   x=630, y=300, w=240, h=140  (시안)
//     Arrow3:             x=880, y=370 "?"
//     Box4 (미래?):       x=910, y=300, w=220, h=140  (퍼플 점선)
//   강조선  | x=70,490 w=14 h=70
//   카피   | 100,530  "NP 뼈대는 평생 안 바뀐다" (font 50)
//   출처   | 100,575  "Pittenger 1993 · Beebe 8기능 모델" (font 18)
//   태그   | 70,790  바 + "군대가 바꾼 인지기능 재배치" (font 26)
//   서브   | 100,822 "Ne 주기능 + 보조 Fi → Ti 횡단의 학술 분석" (font 18)
const svgV = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.black}"/>
      <stop offset="55%" stop-color="${C.btsDeep}"/>
      <stop offset="100%" stop-color="${C.btsViolet}"/>
    </linearGradient>
    <radialGradient id="glow-v" cx="50%" cy="80%" r="70%">
      <stop offset="0%" stop-color="${C.btsViolet}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${C.btsViolet}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-v)"/>
  <rect width="1200" height="900" fill="url(#glow-v)"/>

  <!-- 뱃지 -->
  <rect x="70" y="80" rx="8" width="310" height="52" fill="${C.neonYellow}"/>
  <text x="225" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">🎤 4번 바뀐 MBTI</text>

  <!-- 이름 -->
  <text x="70" y="230" font-size="86" font-weight="900" fill="${C.white}" letter-spacing="-3">BTS V 김태형</text>

  <!-- Box1: 2019 ENFP (오렌지 = 외향 시작) -->
  <rect x="70" y="300" rx="14" width="240" height="140" fill="${C.neonOrange}" opacity="0.15"/>
  <rect x="70" y="300" rx="14" width="240" height="140" fill="none" stroke="${C.neonOrange}" stroke-width="3"/>
  <text x="190" y="345" text-anchor="middle" font-size="22" font-weight="900" fill="${C.neonOrange}" letter-spacing="1">2019</text>
  <text x="190" y="410" text-anchor="middle" font-size="58" font-weight="900" fill="${C.white}" letter-spacing="-2">ENFP</text>

  <!-- Arrow1 -->
  <text x="330" y="385" text-anchor="middle" font-size="40" font-weight="900" fill="${C.neonYellow}">→</text>

  <!-- Box2: 2021 INFP (핑크 = 감정 깊어짐) -->
  <rect x="350" y="300" rx="14" width="240" height="140" fill="${C.neonPink}" opacity="0.18"/>
  <rect x="350" y="300" rx="14" width="240" height="140" fill="none" stroke="${C.neonPink}" stroke-width="3"/>
  <text x="470" y="345" text-anchor="middle" font-size="22" font-weight="900" fill="${C.neonPink}" letter-spacing="1">2021</text>
  <text x="470" y="410" text-anchor="middle" font-size="58" font-weight="900" fill="${C.white}" letter-spacing="-2">INFP</text>

  <!-- Arrow2 -->
  <text x="610" y="385" text-anchor="middle" font-size="40" font-weight="900" fill="${C.neonYellow}">→</text>

  <!-- Box3: 2025 ENTP (시안 = 논리 전환, 군대 후) -->
  <rect x="630" y="300" rx="14" width="240" height="140" fill="${C.neonCyan}" opacity="0.18"/>
  <rect x="630" y="300" rx="14" width="240" height="140" fill="none" stroke="${C.neonCyan}" stroke-width="3"/>
  <text x="750" y="345" text-anchor="middle" font-size="22" font-weight="900" fill="${C.neonCyan}" letter-spacing="1">2025</text>
  <text x="750" y="410" text-anchor="middle" font-size="58" font-weight="900" fill="${C.white}" letter-spacing="-2">ENTP</text>

  <!-- Arrow3 (점선 — 미래 불확실) -->
  <text x="890" y="385" text-anchor="middle" font-size="40" font-weight="900" fill="${C.neonPurple}" opacity="0.7">→</text>

  <!-- Box4: ? (점선 박스 — 미래) -->
  <rect x="910" y="300" rx="14" width="220" height="140" fill="${C.neonPurple}" opacity="0.08"/>
  <rect x="910" y="300" rx="14" width="220" height="140" fill="none" stroke="${C.neonPurple}" stroke-width="3" stroke-dasharray="8,6"/>
  <text x="1020" y="345" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonPurple}" letter-spacing="1">미래?</text>
  <text x="1020" y="410" text-anchor="middle" font-size="58" font-weight="900" fill="${C.white}" letter-spacing="-2">?</text>

  <!-- 강조 카피 -->
  <rect x="70" y="490" width="14" height="70" fill="${C.neonYellow}"/>
  <text x="100" y="530" font-size="50" font-weight="900" fill="${C.neonYellow}" letter-spacing="-2">NP 뼈대는 평생 안 바뀐다</text>
  <text x="100" y="575" font-size="20" font-weight="700" fill="${C.white}" opacity="0.9">📚 Pittenger 1993 검사 신뢰도 · Beebe 8기능 모델 인용</text>

  <!-- 비교 박스 (정국 vs V) -->
  <g transform="translate(70, 620)">
    <rect x="0" y="0" rx="12" width="1060" height="120" fill="${C.white}" opacity="0.08"/>
    <rect x="0" y="0" rx="12" width="1060" height="120" fill="none" stroke="${C.neonCyan}" stroke-width="2"/>
    <text x="30" y="40" font-size="22" font-weight="900" fill="${C.neonCyan}">정국 vs V — 같은 BTS, 다른 변화 패턴</text>
    <text x="30" y="75" font-size="18" font-weight="700" fill="${C.white}">정국: IxxP 빌딩 안에서 층 이동 (3회)</text>
    <text x="30" y="102" font-size="18" font-weight="700" fill="${C.white}">V: NP 빌딩 사이 횡단 (4회 — E↔I, F↔T 모두 흔들림)</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="780" width="14" height="58" fill="${C.neonYellow}"/>
  <text x="100" y="810" font-size="26" font-weight="900" fill="${C.white}">군대가 바꾼 V의 인지기능 재배치</text>
  <text x="100" y="842" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">Ne 주기능 + 보조 Fi → Ti 횡단 · 2025년 6월 위버스 ENTP 발언 분석</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonYellow}" opacity="0.9">192types.co.kr</text>
</svg>`;

// ─── 카리나 (aespa) — 5번 변화 + 미신 깨기 ──────────
// 레이아웃 (1200×900):
//   상단 미신 카피  | 70,90  "❌ ENTJ는 안 변한다?" (font 36, 빨간 X)
//   타이틀         | 70,180 "카리나가 깨버렸어" (font 60)
//   변화박스 5개 (작게):
//     Box1 (2020 ENTJ):   x=70,  y=290, w=200, h=130
//     Arrow1:             x=275, y=355 "→"
//     Box2 (2022 ESTJ):   x=300, y=290, w=200, h=130
//     Arrow2:             x=505, y=355 "→"
//     Box3 (2023 INTJ):   x=530, y=290, w=200, h=130
//     Arrow3:             x=735, y=355 "→"
//     Box4 (2024 ISFJ):   x=760, y=290, w=200, h=130
//     Arrow4:             x=965, y=355 "↩"
//     Box5 (2024+ ESTJ):  x=990, y=290, w=140, h=130 (회귀)
//   본질 라벨: x=70,470  "본질 = ESTJ" (font 50)
//   학술 출처: x=100,520 "Heilman 2007 · Marcia 1980" (font 18)
//   하단 태그: 70,790 바 + "한국 ENTJ 여성의 backlash 우회법"
const svgKarina = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-k" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.espaDeep}"/>
      <stop offset="60%" stop-color="${C.midnight}"/>
      <stop offset="100%" stop-color="${C.black}"/>
    </linearGradient>
    <radialGradient id="glow-k" cx="20%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${C.espaTeal}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${C.espaTeal}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-k)"/>
  <rect width="1200" height="900" fill="url(#glow-k)"/>

  <!-- 상단 뱃지 (미신 깨기) -->
  <rect x="70" y="80" rx="8" width="380" height="52" fill="${C.neonMagenta}"/>
  <text x="260" y="115" text-anchor="middle" font-size="22" font-weight="900" fill="${C.white}" letter-spacing="1">💥 미신 깨기 · 5번 공개</text>

  <!-- 미신 카피 -->
  <text x="70" y="200" font-size="48" font-weight="900" fill="${C.white}" opacity="0.55" letter-spacing="-2">"ENTJ는 안 변한다"</text>
  <line x1="55" y1="187" x2="650" y2="187" stroke="${C.neonMagenta}" stroke-width="8"/>

  <!-- 메인 카피 -->
  <text x="70" y="265" font-size="56" font-weight="900" fill="${C.espaTeal}" letter-spacing="-2">카리나가 깨버렸어 →</text>

  <!-- 변화박스 5개 + 화살표 4개 -->
  <!-- Box1: 2020 ENTJ -->
  <rect x="70" y="320" rx="12" width="195" height="125" fill="${C.neonOrange}" opacity="0.2"/>
  <rect x="70" y="320" rx="12" width="195" height="125" fill="none" stroke="${C.neonOrange}" stroke-width="3"/>
  <text x="167" y="360" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonOrange}">2020</text>
  <text x="167" y="415" text-anchor="middle" font-size="44" font-weight="900" fill="${C.white}" letter-spacing="-1">ENTJ</text>

  <!-- Arrow1 -->
  <text x="282" y="395" text-anchor="middle" font-size="32" font-weight="900" fill="${C.espaTeal}">→</text>

  <!-- Box2: 2022 ESTJ -->
  <rect x="300" y="320" rx="12" width="195" height="125" fill="${C.neonGreen}" opacity="0.2"/>
  <rect x="300" y="320" rx="12" width="195" height="125" fill="none" stroke="${C.neonGreen}" stroke-width="3"/>
  <text x="397" y="360" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonGreen}">2022</text>
  <text x="397" y="415" text-anchor="middle" font-size="44" font-weight="900" fill="${C.white}" letter-spacing="-1">ESTJ</text>

  <!-- Arrow2 -->
  <text x="512" y="395" text-anchor="middle" font-size="32" font-weight="900" fill="${C.espaTeal}">→</text>

  <!-- Box3: 2023 INTJ -->
  <rect x="530" y="320" rx="12" width="195" height="125" fill="${C.neonBlue}" opacity="0.2"/>
  <rect x="530" y="320" rx="12" width="195" height="125" fill="none" stroke="${C.neonBlue}" stroke-width="3"/>
  <text x="627" y="360" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonBlue}">2023</text>
  <text x="627" y="415" text-anchor="middle" font-size="44" font-weight="900" fill="${C.white}" letter-spacing="-1">INTJ</text>

  <!-- Arrow3 -->
  <text x="742" y="395" text-anchor="middle" font-size="32" font-weight="900" fill="${C.espaTeal}">→</text>

  <!-- Box4: 2024 ISFJ -->
  <rect x="760" y="320" rx="12" width="195" height="125" fill="${C.neonPink}" opacity="0.2"/>
  <rect x="760" y="320" rx="12" width="195" height="125" fill="none" stroke="${C.neonPink}" stroke-width="3"/>
  <text x="857" y="360" text-anchor="middle" font-size="20" font-weight="900" fill="${C.neonPink}">2024</text>
  <text x="857" y="415" text-anchor="middle" font-size="44" font-weight="900" fill="${C.white}" letter-spacing="-1">ISFJ</text>

  <!-- Arrow4 (회귀 화살표) -->
  <text x="977" y="395" text-anchor="middle" font-size="32" font-weight="900" fill="${C.espaGold}">↩</text>

  <!-- Box5: 2024+ ESTJ (회귀, 골드) -->
  <rect x="995" y="320" rx="12" width="135" height="125" fill="${C.espaGold}" opacity="0.2"/>
  <rect x="995" y="320" rx="12" width="135" height="125" fill="none" stroke="${C.espaGold}" stroke-width="3"/>
  <text x="1062" y="360" text-anchor="middle" font-size="16" font-weight="900" fill="${C.espaGold}">현재</text>
  <text x="1062" y="415" text-anchor="middle" font-size="36" font-weight="900" fill="${C.white}" letter-spacing="-1">ESTJ</text>

  <!-- 본질 라벨 -->
  <rect x="70" y="495" width="14" height="70" fill="${C.espaGold}"/>
  <text x="100" y="535" font-size="48" font-weight="900" fill="${C.espaGold}" letter-spacing="-2">본질 = ESTJ (본인 자가 진단)</text>
  <text x="100" y="580" font-size="20" font-weight="700" fill="${C.white}" opacity="0.9">📚 Heilman 2007 backlash · Marcia 1980 정체성 4단계</text>

  <!-- 비교 정보 박스 -->
  <g transform="translate(70, 620)">
    <rect x="0" y="0" rx="12" width="1060" height="120" fill="${C.white}" opacity="0.08"/>
    <rect x="0" y="0" rx="12" width="1060" height="120" fill="none" stroke="${C.espaTeal}" stroke-width="2"/>
    <text x="30" y="40" font-size="22" font-weight="900" fill="${C.espaTeal}">장원영 vs 카리나 — 같은 ENTJ, 다른 생존 전략</text>
    <text x="30" y="75" font-size="18" font-weight="700" fill="${C.white}">장원영: 정체성 유지 + 럭키비키 페르소나로 backlash 우회</text>
    <text x="30" y="102" font-size="18" font-weight="700" fill="${C.white}">카리나: 환경 따라 보조기능 활성화 (검사 결과 자체 변동)</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="780" width="14" height="58" fill="${C.espaGold}"/>
  <text x="100" y="810" font-size="26" font-weight="900" fill="${C.white}">한국 ENTJ 여성의 backlash 우회법</text>
  <text x="100" y="842" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">청년기 정체성 발달 모델로 본 5번 변동의 진짜 의미</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="862" text-anchor="end" font-size="16" font-weight="800" fill="${C.espaGold}" opacity="0.9">192types.co.kr</text>
</svg>`;

// ─── 렌더 ───────────────────────────────────────────
const images = [
  { name: 'bts-v-mbti-01-hero', svg: svgV },
  { name: 'karina-mbti-01-hero', svg: svgKarina },
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
