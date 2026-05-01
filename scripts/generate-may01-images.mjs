// 2026-05-01 학술 설명형 글 2편 hero 이미지
//   cognitive-functions-8-hero.webp   (8 인지기능 매트릭스)
//   four-temperaments-hero.webp       (4기질 BC 400 → 2026 학술 계보)

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
  parchment: '#fef7e6',
  parchmentDark: '#f5e6c5',
  ink: '#1a1a1a',
  rust: '#b45309',

  // 8 인지기능 색상 (감각/직관/사고/감정 × 외향/내향)
  funcSe: '#fbbf24', // 외향감각 — 노란
  funcSi: '#92400e', // 내향감각 — 갈색
  funcNe: '#f472b6', // 외향직관 — 핑크
  funcNi: '#7c3aed', // 내향직관 — 보라
  funcTe: '#06b6d4', // 외향사고 — 시안
  funcTi: '#1e40af', // 내향사고 — 진청
  funcFe: '#f97316', // 외향감정 — 오렌지
  funcFi: '#be123c', // 내향감정 — 진적

  // 4기질 색상
  sanguine: '#fbbf24',    // 다혈 — 봄바람 옐로
  choleric: '#dc2626',    // 담즙 — 여름태양 레드
  phlegmatic: '#16a34a',  // 점액 — 가을 그린
  melancholic: '#1e40af', // 우울 — 겨울 블루

  neonYellow: '#f5ff3d',
  neonCyan: '#00e5ff',
  neonGold: '#ffd700',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

// ─── 인지기능 8개 매트릭스 ───────────────────────────
// 컨셉: 8개 인지기능을 4×2 매트릭스 (감각·직관·사고·감정 × 외향·내향)
// 학술적 권위감 + 정보 시각화
const svgCognitive = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-c" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.black}"/>
      <stop offset="55%" stop-color="${C.navy}"/>
      <stop offset="100%" stop-color="${C.deepIndigo}"/>
    </linearGradient>
    <radialGradient id="glow-c" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${C.neonGold}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${C.neonGold}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="900" fill="url(#bg-c)"/>
  <rect width="1200" height="900" fill="url(#glow-c)"/>

  <!-- 뱃지 -->
  <rect x="70" y="80" rx="10" width="380" height="56" fill="${C.neonGold}"/>
  <text x="260" y="118" text-anchor="middle" font-size="22" font-weight="900" fill="${C.black}" letter-spacing="1">📚 학술 가이드 · Jung 1921</text>

  <!-- 메인 카피 -->
  <text x="70" y="200" font-size="62" font-weight="900" fill="${C.white}" letter-spacing="-3">8개 인지기능 완전 정리</text>
  <text x="70" y="245" font-size="28" font-weight="700" fill="${C.neonGold}" opacity="0.9">MBTI 16유형의 진짜 메커니즘</text>

  <!-- 8기능 매트릭스 (4 × 2) -->
  <g transform="translate(70, 290)">
    <!-- 헤더 -->
    <text x="280" y="0" text-anchor="middle" font-size="20" font-weight="900" fill="${C.white}" opacity="0.7" letter-spacing="2">외향 (e)</text>
    <text x="780" y="0" text-anchor="middle" font-size="20" font-weight="900" fill="${C.white}" opacity="0.7" letter-spacing="2">내향 (i)</text>

    <!-- Row 1: 감각 (S) -->
    <text x="-20" y="80" text-anchor="end" font-size="22" font-weight="900" fill="${C.white}" opacity="0.85">감각</text>

    <!-- Se -->
    <rect x="0" y="20" rx="14" width="510" height="110" fill="${C.funcSe}" opacity="0.18"/>
    <rect x="0" y="20" rx="14" width="510" height="110" fill="none" stroke="${C.funcSe}" stroke-width="3"/>
    <text x="40" y="62" font-size="40" font-weight="900" fill="${C.funcSe}">Se</text>
    <text x="115" y="62" font-size="22" font-weight="800" fill="${C.white}">외향 감각</text>
    <text x="40" y="105" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">지금 이 순간 감각 자극 · ESTP·ESFP 주기능</text>

    <!-- Si -->
    <rect x="540" y="20" rx="14" width="510" height="110" fill="${C.funcSi}" opacity="0.22"/>
    <rect x="540" y="20" rx="14" width="510" height="110" fill="none" stroke="${C.funcSi}" stroke-width="3"/>
    <text x="580" y="62" font-size="40" font-weight="900" fill="${C.parchmentDark}">Si</text>
    <text x="655" y="62" font-size="22" font-weight="800" fill="${C.white}">내향 감각</text>
    <text x="580" y="105" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">과거 기억 정밀 보관 · ISTJ·ISFJ 주기능</text>

    <!-- Row 2: 직관 (N) -->
    <text x="-20" y="200" text-anchor="end" font-size="22" font-weight="900" fill="${C.white}" opacity="0.85">직관</text>

    <!-- Ne -->
    <rect x="0" y="140" rx="14" width="510" height="110" fill="${C.funcNe}" opacity="0.18"/>
    <rect x="0" y="140" rx="14" width="510" height="110" fill="none" stroke="${C.funcNe}" stroke-width="3"/>
    <text x="40" y="182" font-size="40" font-weight="900" fill="${C.funcNe}">Ne</text>
    <text x="115" y="182" font-size="22" font-weight="800" fill="${C.white}">외향 직관</text>
    <text x="40" y="225" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">가능성 무한 확장 · ENTP·ENFP 주기능</text>

    <!-- Ni -->
    <rect x="540" y="140" rx="14" width="510" height="110" fill="${C.funcNi}" opacity="0.22"/>
    <rect x="540" y="140" rx="14" width="510" height="110" fill="none" stroke="${C.funcNi}" stroke-width="3"/>
    <text x="580" y="182" font-size="40" font-weight="900" fill="${C.funcNi}">Ni</text>
    <text x="655" y="182" font-size="22" font-weight="800" fill="${C.white}">내향 직관</text>
    <text x="580" y="225" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">미래 한 점 응시 · INTJ·INFJ 주기능</text>

    <!-- Row 3: 사고 (T) -->
    <text x="-20" y="320" text-anchor="end" font-size="22" font-weight="900" fill="${C.white}" opacity="0.85">사고</text>

    <!-- Te -->
    <rect x="0" y="260" rx="14" width="510" height="110" fill="${C.funcTe}" opacity="0.18"/>
    <rect x="0" y="260" rx="14" width="510" height="110" fill="none" stroke="${C.funcTe}" stroke-width="3"/>
    <text x="40" y="302" font-size="40" font-weight="900" fill="${C.funcTe}">Te</text>
    <text x="115" y="302" font-size="22" font-weight="800" fill="${C.white}">외향 사고</text>
    <text x="40" y="345" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">외부 시스템 효율 최적화 · ENTJ·ESTJ 주기능</text>

    <!-- Ti -->
    <rect x="540" y="260" rx="14" width="510" height="110" fill="${C.funcTi}" opacity="0.25"/>
    <rect x="540" y="260" rx="14" width="510" height="110" fill="none" stroke="${C.funcTi}" stroke-width="3"/>
    <text x="580" y="302" font-size="40" font-weight="900" fill="${C.neonCyan}">Ti</text>
    <text x="655" y="302" font-size="22" font-weight="800" fill="${C.white}">내향 사고</text>
    <text x="580" y="345" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">내부 논리 체계 구축 · INTP·ISTP 주기능</text>

    <!-- Row 4: 감정 (F) -->
    <text x="-20" y="440" text-anchor="end" font-size="22" font-weight="900" fill="${C.white}" opacity="0.85">감정</text>

    <!-- Fe -->
    <rect x="0" y="380" rx="14" width="510" height="110" fill="${C.funcFe}" opacity="0.20"/>
    <rect x="0" y="380" rx="14" width="510" height="110" fill="none" stroke="${C.funcFe}" stroke-width="3"/>
    <text x="40" y="422" font-size="40" font-weight="900" fill="${C.funcFe}">Fe</text>
    <text x="115" y="422" font-size="22" font-weight="800" fill="${C.white}">외향 감정</text>
    <text x="40" y="465" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">집단 가치 조율 · ENFJ·ESFJ 주기능</text>

    <!-- Fi -->
    <rect x="540" y="380" rx="14" width="510" height="110" fill="${C.funcFi}" opacity="0.22"/>
    <rect x="540" y="380" rx="14" width="510" height="110" fill="none" stroke="${C.funcFi}" stroke-width="3"/>
    <text x="580" y="422" font-size="40" font-weight="900" fill="${C.funcFi}">Fi</text>
    <text x="655" y="422" font-size="22" font-weight="800" fill="${C.white}">내향 감정</text>
    <text x="580" y="465" font-size="18" font-weight="700" fill="${C.white}" opacity="0.85">개인 가치 진실 · INFP·ISFP 주기능</text>
  </g>

  <!-- 하단 태그라인 -->
  <rect x="70" y="800" width="14" height="56" fill="${C.neonGold}"/>
  <text x="100" y="828" font-size="22" font-weight="900" fill="${C.white}">8기능 위계 + 16유형 매핑 + Beebe 8기능 모델</text>
  <text x="100" y="855" font-size="16" font-weight="700" fill="${C.white}" opacity="0.85">Jung 1921 · Beebe 2004 · Quenk 2002 학술 인용</text>

  <!-- 우하단 브랜드 -->
  <text x="1130" y="876" text-anchor="end" font-size="16" font-weight="800" fill="${C.neonGold}">192types.co.kr</text>
</svg>`;

// ─── 4기질 학술 계보 ────────────────────────────────
// 컨셉: BC 400 → 2026 시간 흐름 + 4기질 4박스 + 신경전달물질 매핑
const svgTemperaments = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
  <defs>
    <linearGradient id="bg-t" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.parchment}"/>
      <stop offset="100%" stop-color="${C.parchmentDark}"/>
    </linearGradient>
  </defs>

  <!-- 배경 (양피지 톤 — 학술적 권위) -->
  <rect width="1200" height="900" fill="url(#bg-t)"/>

  <!-- 뱃지 -->
  <rect x="70" y="80" rx="10" width="380" height="56" fill="${C.ink}"/>
  <text x="260" y="118" text-anchor="middle" font-size="22" font-weight="900" fill="${C.parchment}" letter-spacing="1">📜 BC 400 → 2026 · 2400년</text>

  <!-- 메인 카피 -->
  <text x="70" y="200" font-size="62" font-weight="900" fill="${C.ink}" letter-spacing="-3">히포크라테스 4기질</text>

  <!-- 학술 계보 라인 (시간 흐름 시각화) -->
  <g transform="translate(70, 245)">
    <line x1="0" y1="20" x2="1060" y2="20" stroke="${C.ink}" stroke-width="2" opacity="0.4"/>
    <!-- BC 400 -->
    <circle cx="0" cy="20" r="6" fill="${C.ink}"/>
    <text x="0" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.ink}">BC 400</text>
    <text x="0" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.7">히포크라테스</text>
    <!-- AD 200 -->
    <circle cx="180" cy="20" r="6" fill="${C.ink}"/>
    <text x="180" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.ink}">AD 200</text>
    <text x="180" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.7">갈렌</text>
    <!-- 1798 -->
    <circle cx="430" cy="20" r="6" fill="${C.ink}"/>
    <text x="430" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.ink}">1798</text>
    <text x="430" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.7">칸트</text>
    <!-- 1957 -->
    <circle cx="680" cy="20" r="6" fill="${C.ink}"/>
    <text x="680" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.ink}">1957</text>
    <text x="680" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.7">아이젠크</text>
    <!-- 2009 -->
    <circle cx="880" cy="20" r="6" fill="${C.ink}"/>
    <text x="880" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.ink}">2009</text>
    <text x="880" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}" opacity="0.7">피셔</text>
    <!-- 2026 -->
    <circle cx="1060" cy="20" r="8" fill="${C.rust}"/>
    <text x="1060" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="${C.rust}">2026</text>
    <text x="1060" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="${C.rust}">192조합</text>
  </g>

  <!-- 4기질 박스 (4개 가로 배치) -->
  <g transform="translate(70, 360)">
    <!-- 다혈질 (sanguine) -->
    <rect x="0" y="0" rx="14" width="250" height="240" fill="${C.sanguine}" opacity="0.30"/>
    <rect x="0" y="0" rx="14" width="250" height="240" fill="none" stroke="${C.sanguine}" stroke-width="3"/>
    <text x="125" y="50" text-anchor="middle" font-size="22" font-weight="900" fill="${C.rust}">🌸 봄바람</text>
    <text x="125" y="100" text-anchor="middle" font-size="36" font-weight="900" fill="${C.ink}">다혈질</text>
    <text x="125" y="135" text-anchor="middle" font-size="16" font-weight="800" fill="${C.ink}" opacity="0.7">Sanguine</text>
    <text x="125" y="175" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">도파민 우세</text>
    <text x="125" y="200" text-anchor="middle" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.85">사교·낙관·즉흥</text>
    <text x="125" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.7">한국 ~30%</text>

    <!-- 담즙질 (choleric) -->
    <rect x="270" y="0" rx="14" width="250" height="240" fill="${C.choleric}" opacity="0.18"/>
    <rect x="270" y="0" rx="14" width="250" height="240" fill="none" stroke="${C.choleric}" stroke-width="3"/>
    <text x="395" y="50" text-anchor="middle" font-size="22" font-weight="900" fill="${C.choleric}">☀️ 여름태양</text>
    <text x="395" y="100" text-anchor="middle" font-size="36" font-weight="900" fill="${C.ink}">담즙질</text>
    <text x="395" y="135" text-anchor="middle" font-size="16" font-weight="800" fill="${C.ink}" opacity="0.7">Choleric</text>
    <text x="395" y="175" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">노르에피네프린</text>
    <text x="395" y="200" text-anchor="middle" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.85">목표·실행·통제</text>
    <text x="395" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.7">한국 ~10%</text>

    <!-- 점액질 (phlegmatic) -->
    <rect x="540" y="0" rx="14" width="250" height="240" fill="${C.phlegmatic}" opacity="0.20"/>
    <rect x="540" y="0" rx="14" width="250" height="240" fill="none" stroke="${C.phlegmatic}" stroke-width="3"/>
    <text x="665" y="50" text-anchor="middle" font-size="22" font-weight="900" fill="${C.phlegmatic}">🍂 가을 안개</text>
    <text x="665" y="100" text-anchor="middle" font-size="36" font-weight="900" fill="${C.ink}">점액질</text>
    <text x="665" y="135" text-anchor="middle" font-size="16" font-weight="800" fill="${C.ink}" opacity="0.7">Phlegmatic</text>
    <text x="665" y="175" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">세로토닌 우세</text>
    <text x="665" y="200" text-anchor="middle" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.85">안정·평화·일관</text>
    <text x="665" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.7">한국 ~38%</text>

    <!-- 우울질 (melancholic) -->
    <rect x="810" y="0" rx="14" width="250" height="240" fill="${C.melancholic}" opacity="0.20"/>
    <rect x="810" y="0" rx="14" width="250" height="240" fill="none" stroke="${C.melancholic}" stroke-width="3"/>
    <text x="935" y="50" text-anchor="middle" font-size="22" font-weight="900" fill="${C.melancholic}">❄️ 겨울 호수</text>
    <text x="935" y="100" text-anchor="middle" font-size="36" font-weight="900" fill="${C.ink}">우울질</text>
    <text x="935" y="135" text-anchor="middle" font-size="16" font-weight="800" fill="${C.ink}" opacity="0.7">Melancholic</text>
    <text x="935" y="175" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">저각성 + 깊은 처리</text>
    <text x="935" y="200" text-anchor="middle" font-size="13" font-weight="600" fill="${C.ink}" opacity="0.85">분석·완성도·섬세</text>
    <text x="935" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}" opacity="0.7">한국 ~22%</text>
  </g>

  <!-- 결합 박스 -->
  <g transform="translate(70, 645)">
    <rect x="0" y="0" rx="12" width="1060" height="100" fill="${C.ink}" opacity="0.92"/>
    <text x="40" y="40" font-size="22" font-weight="900" fill="${C.neonGold}">MBTI 16유형 × 4기질 × 보조 기질 = 192조합</text>
    <text x="40" y="72" font-size="17" font-weight="700" fill="${C.parchment}" opacity="0.9">같은 INFP라도 우울질 INFP는 예술가형, 다혈질 INFP는 사교적 표현자형으로 살아간다</text>
  </g>

  <!-- 하단 태그 -->
  <rect x="70" y="775" width="14" height="56" fill="${C.rust}"/>
  <text x="100" y="803" font-size="22" font-weight="900" fill="${C.ink}">현대 신경과학으로 검증된 4가지 신경계 패턴</text>
  <text x="100" y="830" font-size="16" font-weight="700" fill="${C.ink}" opacity="0.8">Hippocrates · Galen · Kant · Eysenck · Fisher 학술 계보</text>

  <text x="1130" y="850" text-anchor="end" font-size="16" font-weight="800" fill="${C.rust}">192types.co.kr</text>
</svg>`;

// ─── 렌더 ───────────────────────────────────────────
const images = [
  { name: 'cognitive-functions-8-hero', svg: svgCognitive },
  { name: 'four-temperaments-hero', svg: svgTemperaments },
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
