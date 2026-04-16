// Generate infographics for "MBTI 재테크 DNA — 내 유형의 돈 관리 스타일"
// Output: public/blog/invest-{name}.{svg,webp} (primary SVG + WebP for SEO)
//
// Image set (8):
//   01 hero           - 브랜드 히어로 카드
//   02 matrix         - 리스크 × 시야 4분면 매트릭스 (refined)
//   03 spending-map   - 16유형 지출 스타일 카테고리 매핑
//   04 risk-ranking   - 리스크 감수성 순위 (16유형)
//   05 saving-ranking - 저축률 순위 (16유형)
//   06 temperament    - 4기질 × 돈 관리 핵심 차이
//   07 couple-money   - 커플 돈 궁합 히트맵
//   08 action-checklist - 유형별 재테크 액션 체크리스트

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa',
  bgSoft: '#f3f4f6',
  card: '#ffffff',
  text: '#171717',
  textSoft: '#374151',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  border: '#e5e7eb',
  divider: '#d1d5db',
  gold: '#f59e0b', silver: '#9ca3af', bronze: '#b45309',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  money: '#65a30d',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · MBTI 경제학 시리즈</text>
</svg>`;

const COLOR_OF = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
const BG_OF = { NT: C.nt50, NF: C.nf50, SJ: C.sj50, SP: C.sp50 };

// ---------- 01 HERO ----------
function hero() {
  return wrap(`
  <defs>
    <radialGradient id="hG" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f4f6"/>
    </radialGradient>
    <linearGradient id="coinG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- Scattered coins with MBTI types -->
  ${[
    { t: 'INTJ', x: 160, y: 260, r: 52, c: C.nt600 },
    { t: 'INTP', x: 1040, y: 240, r: 54, c: C.nt600 },
    { t: 'ISTJ', x: 200, y: 560, r: 48, c: C.sj600 },
    { t: 'ESFP', x: 1010, y: 590, r: 46, c: C.sp500 },
    { t: 'ENFP', x: 130, y: 740, r: 40, c: C.nf500 },
    { t: 'ENTJ', x: 1080, y: 780, r: 44, c: C.nt500 },
  ].map(b => `
    <circle cx="${b.x}" cy="${b.y}" r="${b.r + 10}" fill="${b.c}" opacity="0.1"/>
    <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.c}"/>
    <text x="${b.x}" y="${b.y + 6}" text-anchor="middle" font-size="${b.r * 0.4}" font-weight="800" fill="#fff">${b.t}</text>
  `).join('')}

  <!-- Currency symbols decoration -->
  <text x="350" y="280" font-size="40" font-weight="800" fill="${C.money}" opacity="0.15">₩</text>
  <text x="880" y="350" font-size="36" font-weight="800" fill="${C.money}" opacity="0.15">$</text>
  <text x="400" y="670" font-size="32" font-weight="800" fill="${C.money}" opacity="0.15">€</text>
  <text x="820" y="650" font-size="44" font-weight="800" fill="${C.money}" opacity="0.15">¥</text>

  <!-- Center card -->
  <rect x="120" y="190" width="960" height="370" rx="28" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="255" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">MBTI ECONOMICS · 2026</text>
  <text x="600" y="355" text-anchor="middle" font-size="78" font-weight="900" fill="${C.text}">MBTI 재테크 DNA</text>
  <text x="600" y="420" text-anchor="middle" font-size="38" font-weight="700" fill="${C.textSoft}">내 유형의 돈 관리 스타일</text>
  <line x1="380" y1="450" x2="820" y2="450" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="490" text-anchor="middle" font-size="22" font-weight="600" fill="${C.textMuted}">16유형 × 4기질 × 3가지 머니 프로파일</text>
  <text x="600" y="528" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textFaint}">소비 · 저축 · 투자 · 리스크 · 커플 돈궁합</text>

  <g transform="translate(300, 540)">
    ${[
      { l: 'NT · 전략가', c: C.nt600, x: 0 },
      { l: 'NF · 가치기반', c: C.nf600, x: 155 },
      { l: 'SJ · 안정형', c: C.sj600, x: 330 },
      { l: 'SP · 기회포착', c: C.sp600, x: 490 },
    ].map(({ l, c, x }) => `
      <g transform="translate(${x},0)">
        <circle cx="12" cy="24" r="9" fill="${c}"/>
        <text x="28" y="29" font-size="13" font-weight="600" fill="${C.textSoft}">${l}</text>
      </g>
    `).join('')}
  </g>

  <text x="600" y="680" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">32가지 지출 패턴 · 16가지 투자 성향 · 실전 액션 체크리스트</text>
  `);
}

// ---------- 02 RISK × HORIZON MATRIX (refined) ----------
function matrix() {
  const types = [
    // TL: SJ (low risk, long horizon) — emerald
    { t: 'ISTJ', g: 'SJ', x: 250, y: 240 },
    { t: 'ESTJ', g: 'SJ', x: 340, y: 320 },
    { t: 'ISFJ', g: 'SJ', x: 480, y: 230 },
    { t: 'ESFJ', g: 'SJ', x: 540, y: 380 },
    // TR: NT (high risk, long horizon) — cyan
    { t: 'INTJ', g: 'NT', x: 740, y: 220 },
    { t: 'ENTJ', g: 'NT', x: 900, y: 280 },
    { t: 'INTP', g: 'NT', x: 700, y: 380 },
    { t: 'ENTP', g: 'NT', x: 960, y: 370 },
    // BL: NF (low risk, short horizon) — rose
    { t: 'INFJ', g: 'NF', x: 290, y: 540 },
    { t: 'INFP', g: 'NF', x: 420, y: 600 },
    { t: 'ENFJ', g: 'NF', x: 360, y: 690 },
    { t: 'ENFP', g: 'NF', x: 520, y: 660 },
    // BR: SP (high risk, short horizon) — amber
    { t: 'ISTP', g: 'SP', x: 680, y: 540 },
    { t: 'ESTP', g: 'SP', x: 860, y: 580 },
    { t: 'ISFP', g: 'SP', x: 760, y: 680 },
    { t: 'ESFP', g: 'SP', x: 960, y: 700 },
  ];
  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">리스크 × 투자 시야 매트릭스</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">16유형을 감수성과 시간지평으로 펼쳐본 맵</text>

  <!-- Quadrant backgrounds -->
  <rect x="150" y="140" width="450" height="310" fill="${C.sj50}" opacity="0.55"/>
  <rect x="600" y="140" width="450" height="310" fill="${C.nt50}" opacity="0.55"/>
  <rect x="150" y="450" width="450" height="310" fill="${C.nf50}" opacity="0.55"/>
  <rect x="600" y="450" width="450" height="310" fill="${C.sp50}" opacity="0.55"/>

  <!-- Quadrant labels -->
  <text x="170" y="170" font-size="13" font-weight="700" fill="${C.sj700}" letter-spacing="2">SJ · 보수적 저축가</text>
  <text x="170" y="188" font-size="11" fill="${C.sj700}" opacity="0.8">연금·예적금·장기운용</text>

  <text x="1030" y="170" text-anchor="end" font-size="13" font-weight="700" fill="${C.nt700}" letter-spacing="2">NT · 전략 투자가</text>
  <text x="1030" y="188" text-anchor="end" font-size="11" fill="${C.nt700}" opacity="0.8">가치투자·레버리지·포트폴리오</text>

  <text x="170" y="480" font-size="13" font-weight="700" fill="${C.nf700}" letter-spacing="2">NF · 가치기반 소비자</text>
  <text x="170" y="498" font-size="11" fill="${C.nf700}" opacity="0.8">ESG·후원·경험 중심 지출</text>

  <text x="1030" y="480" text-anchor="end" font-size="13" font-weight="700" fill="${C.sp700}" letter-spacing="2">SP · 기회포착형</text>
  <text x="1030" y="498" text-anchor="end" font-size="11" fill="${C.sp700}" opacity="0.8">단타·스윙·사이드잡·즉흥소비</text>

  <!-- Axes -->
  <line x1="150" y1="450" x2="1050" y2="450" stroke="${C.divider}" stroke-width="1.5"/>
  <line x1="600" y1="140" x2="600" y2="760" stroke="${C.divider}" stroke-width="1.5"/>
  <polygon points="1050,450 1040,445 1040,455" fill="${C.divider}"/>
  <polygon points="600,140 595,150 605,150" fill="${C.divider}"/>
  <polygon points="150,450 160,445 160,455" fill="${C.divider}"/>
  <polygon points="600,760 595,750 605,750" fill="${C.divider}"/>

  <text x="140" y="455" text-anchor="end" font-size="13" font-weight="600" fill="${C.textSoft}">리스크 회피</text>
  <text x="1060" y="455" font-size="13" font-weight="600" fill="${C.textSoft}">리스크 추구</text>
  <text x="600" y="128" text-anchor="middle" font-size="13" font-weight="600" fill="${C.textSoft}">장기 시야</text>
  <text x="600" y="780" text-anchor="middle" font-size="13" font-weight="600" fill="${C.textSoft}">단기 시야</text>

  ${types.map(t => `
    <circle cx="${t.x}" cy="${t.y}" r="30" fill="${COLOR_OF[t.g]}"/>
    <text x="${t.x}" y="${t.y + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${t.t}</text>
  `).join('')}

  <!-- Legend -->
  <g transform="translate(150, 810)">
    <rect x="0" y="0" width="900" height="56" fill="#fff" stroke="${C.border}" stroke-width="1" rx="8"/>
    ${[
      { c: C.sj600, l: 'SJ · 안정형', d: '예적금 · 연금', x: 30 },
      { c: C.nt600, l: 'NT · 전략형', d: '장기·분석', x: 250 },
      { c: C.nf600, l: 'NF · 가치형', d: '의미·경험', x: 470 },
      { c: C.sp600, l: 'SP · 기회형', d: '실전·즉흥', x: 690 },
    ].map(({ c, l, d, x }) => `
      <circle cx="${x}" cy="28" r="8" fill="${c}"/>
      <text x="${x + 15}" y="24" font-size="12" font-weight="700" fill="${C.textSoft}">${l}</text>
      <text x="${x + 15}" y="42" font-size="10" fill="${C.textMuted}">${d}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 03 SPENDING MAP ----------
function spendingMap() {
  const cats = [
    { c: '🍽 외식·경험', types: ['ESFP', 'ENFP', 'ESTP'], color: C.sp600, x: 100, y: 180, w: 300, h: 160 },
    { c: '📚 지식·책', types: ['INTP', 'INTJ', 'INFJ'], color: C.nt600, x: 450, y: 180, w: 300, h: 160 },
    { c: '🛠 도구·취미', types: ['ISTP', 'ISFP', 'ENTP'], color: C.sp500, x: 800, y: 180, w: 300, h: 160 },
    { c: '🎁 선물·관계', types: ['ESFJ', 'ENFJ', 'ISFJ'], color: C.nf600, x: 100, y: 400, w: 300, h: 160 },
    { c: '🎨 예술·디자인', types: ['INFP', 'ISFP', 'INFJ'], color: C.nf500, x: 450, y: 400, w: 300, h: 160 },
    { c: '🏠 안정·자산', types: ['ISTJ', 'ESTJ', 'ISFJ'], color: C.sj600, x: 800, y: 400, w: 300, h: 160 },
    { c: '💼 투자·수익', types: ['ENTJ', 'INTJ', 'ESTP'], color: C.nt500, x: 275, y: 620, w: 300, h: 160 },
    { c: '✈ 여행·모험', types: ['ENFP', 'ENTP', 'ESFP'], color: C.sj500, x: 625, y: 620, w: 300, h: 160 },
  ];
  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 지출 카테고리 TOP 8</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">각 카테고리에 돈을 제일 많이 쓰는 유형 상위 3</text>
  <text x="600" y="112" text-anchor="middle" font-size="12" font-weight="500" fill="${C.textFaint}">"나 이거 맞아..." 싶으면 카드 명세서 한 번 보기</text>

  ${cats.map(cat => `
    <rect x="${cat.x}" y="${cat.y}" width="${cat.w}" height="${cat.h}" rx="14" fill="#fff" stroke="${cat.color}" stroke-width="2"/>
    <rect x="${cat.x}" y="${cat.y}" width="${cat.w}" height="42" rx="14" fill="${cat.color}"/>
    <rect x="${cat.x}" y="${cat.y + 28}" width="${cat.w}" height="14" fill="${cat.color}"/>
    <text x="${cat.x + cat.w / 2}" y="${cat.y + 28}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${cat.c}</text>

    ${cat.types.map((t, i) => `
      <g transform="translate(${cat.x + 20 + i * 90}, ${cat.y + 70})">
        <rect x="0" y="0" width="76" height="60" rx="10" fill="${cat.color}" opacity="0.12"/>
        <text x="38" y="22" text-anchor="middle" font-size="10" font-weight="600" fill="${cat.color}">${['TOP 1', 'TOP 2', 'TOP 3'][i]}</text>
        <text x="38" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="${cat.color}">${t}</text>
      </g>
    `).join('')}
  `).join('')}
  `);
}

// ---------- 04 RISK RANKING ----------
function riskRanking() {
  const data = [
    { r: 1, t: 'ENTP', g: 'NT', s: 94, d: '신기술·크립토 얼리어답터' },
    { r: 2, t: 'ESTP', g: 'SP', s: 91, d: '단타·급매 기회포착' },
    { r: 3, t: 'ENTJ', g: 'NT', s: 88, d: '레버리지·사업 투자' },
    { r: 4, t: 'INTP', g: 'NT', s: 82, d: '이론 만든 후 적극 실행' },
    { r: 5, t: 'INTJ', g: 'NT', s: 78, d: '분석 후 큰 베팅' },
    { r: 6, t: 'ESFP', g: 'SP', s: 72, d: '기분 따라 과감한 지출' },
    { r: 7, t: 'ENFP', g: 'NF', s: 66, d: '꽂히면 올인' },
    { r: 8, t: 'ISTP', g: 'SP', s: 62, d: '이해한 분야만 과감' },
    { r: 9, t: 'ISFP', g: 'SP', s: 50, d: '감각적 수집품 투자' },
    { r: 10, t: 'ENFJ', g: 'NF', s: 44, d: '관계·커리어에 베팅' },
    { r: 11, t: 'INFP', g: 'NF', s: 38, d: '가치 맞으면 후원' },
    { r: 12, t: 'INFJ', g: 'NF', s: 34, d: '조용히 ESG 장기' },
    { r: 13, t: 'ESTJ', g: 'SJ', s: 28, d: '검증된 자산만' },
    { r: 14, t: 'ISTJ', g: 'SJ', s: 22, d: '예적금·국채 선호' },
    { r: 15, t: 'ESFJ', g: 'SJ', s: 18, d: '가족 안정이 우선' },
    { r: 16, t: 'ISFJ', g: 'SJ', s: 14, d: '원금 보장이 최우선' },
  ];
  return wrap(`
  <text x="600" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">리스크 감수성 16유형 순위</text>
  <text x="600" y="82" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">얼마나 큰 리스크를 감당할 수 있는지 · 100점 만점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 44;
    const barW = d.s * 8;
    const medal = d.r === 1 ? C.gold : d.r === 2 ? C.silver : d.r === 3 ? C.bronze : null;
    return `
      <text x="45" y="${y + 26}" font-size="${d.r <= 3 ? 16 : 13}" font-weight="${d.r <= 3 ? 800 : 600}" fill="${medal || C.textSoft}">${d.r}</text>
      <circle cx="95" cy="${y + 21}" r="12" fill="${COLOR_OF[d.g]}"/>
      <text x="115" y="${y + 26}" font-size="${d.r <= 3 ? 15 : 13}" font-weight="${d.r <= 3 ? 800 : 700}" fill="${COLOR_OF[d.g]}">${d.t}</text>
      <text x="170" y="${y + 26}" font-size="11" fill="${C.textMuted}">${d.d}</text>
      <rect x="430" y="${y + 10}" width="${barW}" height="22" rx="11" fill="${COLOR_OF[d.g]}" opacity="${d.r <= 8 ? 1 : 0.55}"/>
      <text x="${430 + barW + 10}" y="${y + 26}" font-size="12" font-weight="800" fill="${COLOR_OF[d.g]}">${d.s}</text>
    `;
  }).join('')}
  `);
}

// ---------- 05 SAVING RANKING ----------
function savingRanking() {
  const data = [
    { r: 1, t: 'ISTJ', g: 'SJ', s: 96, d: '월급의 50%+ 자동 이체' },
    { r: 2, t: 'ISFJ', g: 'SJ', s: 92, d: '가족 미래 대비 비상금' },
    { r: 3, t: 'INTJ', g: 'NT', s: 88, d: '장기 계획형 체계 저축' },
    { r: 4, t: 'ESTJ', g: 'SJ', s: 85, d: '목표 기반 타임라인 저축' },
    { r: 5, t: 'INFJ', g: 'NF', s: 78, d: '조용한 꾸준함' },
    { r: 6, t: 'ESFJ', g: 'SJ', s: 74, d: '가족 이벤트 대비' },
    { r: 7, t: 'INTP', g: 'NT', s: 66, d: '이론상 합리적 배분' },
    { r: 8, t: 'ISTP', g: 'SP', s: 62, d: '도구 살 때만 지출, 나머지 저축' },
    { r: 9, t: 'ENTJ', g: 'NT', s: 58, d: '재투자 우선 저축 후순위' },
    { r: 10, t: 'ISFP', g: 'SP', s: 48, d: '감각적 소비 빈번' },
    { r: 11, t: 'ENTP', g: 'NT', s: 42, d: '포트폴리오 자주 리셋' },
    { r: 12, t: 'INFP', g: 'NF', s: 38, d: '충동 후원 소비' },
    { r: 13, t: 'ENFJ', g: 'NF', s: 34, d: '관계 유지비가 큼' },
    { r: 14, t: 'ENFP', g: 'NF', s: 28, d: '경험형 소비자' },
    { r: 15, t: 'ESTP', g: 'SP', s: 22, d: '쓰고 버는 구조' },
    { r: 16, t: 'ESFP', g: 'SP', s: 16, d: '지금의 즐거움 우선' },
  ];
  return wrap(`
  <text x="600" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">저축률 16유형 순위</text>
  <text x="600" y="82" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">소득 대비 저축 비율 · 100점 만점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 44;
    const barW = d.s * 8;
    const medal = d.r === 1 ? C.gold : d.r === 2 ? C.silver : d.r === 3 ? C.bronze : null;
    return `
      <text x="45" y="${y + 26}" font-size="${d.r <= 3 ? 16 : 13}" font-weight="${d.r <= 3 ? 800 : 600}" fill="${medal || C.textSoft}">${d.r}</text>
      <circle cx="95" cy="${y + 21}" r="12" fill="${COLOR_OF[d.g]}"/>
      <text x="115" y="${y + 26}" font-size="${d.r <= 3 ? 15 : 13}" font-weight="${d.r <= 3 ? 800 : 700}" fill="${COLOR_OF[d.g]}">${d.t}</text>
      <text x="170" y="${y + 26}" font-size="11" fill="${C.textMuted}">${d.d}</text>
      <rect x="430" y="${y + 10}" width="${barW}" height="22" rx="11" fill="${COLOR_OF[d.g]}" opacity="${d.r <= 8 ? 1 : 0.55}"/>
      <text x="${430 + barW + 10}" y="${y + 26}" font-size="12" font-weight="800" fill="${COLOR_OF[d.g]}">${d.s}</text>
    `;
  }).join('')}
  `);
}

// ---------- 06 TEMPERAMENT × MONEY ----------
function temperamentMoney() {
  const items = [
    { g: '다혈질 (Sanguine)', color: '#f59e0b', desc: '충동 소비 · 경험 우선', strong: '생활의 즐거움', weak: '즉흥 결제', tip: '2주 쿨링오프 룰' },
    { g: '담즙질 (Choleric)', color: '#dc2626', desc: '목표지향 · 과감한 투자', strong: '빠른 결단', weak: '과신 레버리지', tip: '포지션 사이즈 제한' },
    { g: '점액질 (Phlegmatic)', color: '#0891b2', desc: '안정 지향 · 루틴 저축', strong: '꾸준한 축적', weak: '기회 놓침', tip: '월 10% 위험자산 할당' },
    { g: '우울질 (Melancholic)', color: '#7c3aed', desc: '치밀 분석 · 과도한 대비', strong: '리스크 관리', weak: '분석마비', tip: '실행 데드라인 설정' },
  ];
  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4기질 × 돈 관리 핵심 차이</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">MBTI 같아도 기질 다르면 지출·저축 패턴 완전히 달라</text>

  ${items.map((it, i) => {
    const x = 60 + (i % 2) * 560;
    const y = 130 + Math.floor(i / 2) * 340;
    return `
      <rect x="${x}" y="${y}" width="540" height="310" rx="16" fill="#fff" stroke="${it.color}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="540" height="72" rx="16" fill="${it.color}"/>
      <rect x="${x}" y="${y + 56}" width="540" height="16" fill="${it.color}"/>
      <text x="${x + 30}" y="${y + 35}" font-size="22" font-weight="800" fill="#fff">${it.g}</text>
      <text x="${x + 30}" y="${y + 58}" font-size="13" font-weight="500" fill="#fff" opacity="0.9">${it.desc}</text>

      <g transform="translate(${x + 30}, ${y + 105})">
        <text x="0" y="0" font-size="12" font-weight="700" fill="${C.money}">✓ 강점</text>
        <text x="60" y="0" font-size="14" font-weight="600" fill="${C.textSoft}">${it.strong}</text>
      </g>
      <g transform="translate(${x + 30}, ${y + 150})">
        <text x="0" y="0" font-size="12" font-weight="700" fill="${C.nf600}">⚠ 약점</text>
        <text x="60" y="0" font-size="14" font-weight="600" fill="${C.textSoft}">${it.weak}</text>
      </g>
      <g transform="translate(${x + 30}, ${y + 200})">
        <rect x="-10" y="-22" width="490" height="70" rx="10" fill="${it.color}" opacity="0.08"/>
        <text x="0" y="0" font-size="12" font-weight="700" fill="${it.color}">💡 실전 팁</text>
        <text x="0" y="22" font-size="14" font-weight="600" fill="${it.color}">${it.tip}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 07 COUPLE MONEY HEATMAP ----------
function coupleMoney() {
  // Simplified 4x4 heatmap by temperament group
  const groups = ['NT', 'NF', 'SJ', 'SP'];
  // score: 0-100, higher = better money compatibility
  const scores = {
    NT: { NT: 85, NF: 58, SJ: 82, SP: 55 },
    NF: { NT: 58, NF: 62, SJ: 68, SP: 48 },
    SJ: { NT: 82, NF: 68, SJ: 95, SP: 42 },
    SP: { NT: 55, NF: 48, SJ: 42, SP: 52 },
  };
  const cell = 140;
  const startX = 260, startY = 200;

  function heatColor(v) {
    if (v >= 80) return { bg: '#10b981', text: '#fff', label: '최고' };
    if (v >= 65) return { bg: '#84cc16', text: '#fff', label: '좋음' };
    if (v >= 50) return { bg: '#facc15', text: '#171717', label: '보통' };
    return { bg: '#f87171', text: '#fff', label: '주의' };
  }

  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">커플 돈 궁합 히트맵</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">4기질 조합별 재무 가치관 호환성 (100점 만점)</text>
  <text x="600" y="110" text-anchor="middle" font-size="11" font-weight="500" fill="${C.textFaint}">같은 기질끼리 맞는 듯해도 실제론 SJ×NT가 의외의 최고</text>

  <!-- Row labels -->
  ${groups.map((g, i) => `
    <text x="240" y="${startY + cell/2 + i * cell + 6}" text-anchor="end" font-size="15" font-weight="800" fill="${COLOR_OF[g]}">${g}</text>
    <circle cx="220" cy="${startY + cell/2 + i * cell}" r="10" fill="${COLOR_OF[g]}"/>
  `).join('')}

  <!-- Column labels -->
  ${groups.map((g, i) => `
    <text x="${startX + cell/2 + i * cell}" y="180" text-anchor="middle" font-size="15" font-weight="800" fill="${COLOR_OF[g]}">${g}</text>
  `).join('')}

  <!-- Heatmap cells -->
  ${groups.map((r, ri) => groups.map((c, ci) => {
    const v = scores[r][c];
    const col = heatColor(v);
    const x = startX + ci * cell;
    const y = startY + ri * cell;
    return `
      <rect x="${x}" y="${y}" width="${cell - 8}" height="${cell - 8}" rx="10" fill="${col.bg}" stroke="#fff" stroke-width="2"/>
      <text x="${x + (cell-8)/2}" y="${y + (cell-8)/2 + 5}" text-anchor="middle" font-size="24" font-weight="800" fill="${col.text}">${v}</text>
      <text x="${x + (cell-8)/2}" y="${y + (cell-8)/2 + 30}" text-anchor="middle" font-size="11" font-weight="600" fill="${col.text}" opacity="0.85">${col.label}</text>
    `;
  }).join('')).join('')}

  <!-- Legend -->
  <g transform="translate(270, 790)">
    ${[
      { c: '#10b981', l: '80+ 최고 궁합', x: 0 },
      { c: '#84cc16', l: '65~79 좋음', x: 180 },
      { c: '#facc15', l: '50~64 보통', x: 320 },
      { c: '#f87171', l: '~49 주의 필요', x: 460 },
    ].map(({ c, l, x }) => `
      <rect x="${x}" y="0" width="20" height="20" rx="4" fill="${c}"/>
      <text x="${x + 28}" y="15" font-size="12" font-weight="600" fill="${C.textSoft}">${l}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 08 ACTION CHECKLIST ----------
function actionChecklist() {
  const groups = [
    { t: 'NT · 전략가', color: C.nt600, items: [
      '월 포트폴리오 리밸런싱 (3·6·9·12월)',
      '관심 기업 재무제표 분기별 체크',
      '레버리지 상한 자산의 30% 룰',
      '세후 수익률 엑셀 자동 계산 시트 만들기',
    ] },
    { t: 'NF · 가치형', color: C.nf600, items: [
      'ESG 펀드 1~2개 장기 보유',
      '월 후원·기부 예산 고정 (5~10%)',
      '충동 후원 소비 2주 쿨링오프',
      '가치관 맞는 브랜드 정기구독 정리',
    ] },
    { t: 'SJ · 안정형', color: C.sj600, items: [
      '월급의 40%+ 자동 이체 저축',
      '비상금 6개월치 기본 확보',
      '보험·연금 점검 연 1회',
      '수익형 자산 10% 할당해 기회 놓치기 방지',
    ] },
    { t: 'SP · 기회형', color: C.sp600, items: [
      '현금 흐름 일일 체크 습관',
      '투자 포지션 사이즈 5% 제한',
      '월 고정 저축 자동화로 즉흥 방지',
      '사이드잡·부업 수익 별도 계좌 분리',
    ] },
  ];
  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">유형별 재테크 액션 체크리스트</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">오늘 당장 시작할 수 있는 4가지</text>

  ${groups.map((g, i) => {
    const x = 60 + (i % 2) * 560;
    const y = 130 + Math.floor(i / 2) * 340;
    return `
      <rect x="${x}" y="${y}" width="540" height="310" rx="16" fill="#fff" stroke="${g.color}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="540" height="60" rx="16" fill="${g.color}"/>
      <rect x="${x}" y="${y + 44}" width="540" height="16" fill="${g.color}"/>
      <text x="${x + 30}" y="${y + 38}" font-size="20" font-weight="800" fill="#fff">${g.t}</text>

      ${g.items.map((it, j) => `
        <g transform="translate(${x + 30}, ${y + 90 + j * 54})">
          <rect x="-5" y="-20" width="500" height="46" rx="8" fill="${g.color}" opacity="0.06"/>
          <rect x="5" y="-10" width="24" height="24" rx="5" fill="none" stroke="${g.color}" stroke-width="2"/>
          <text x="15" y="6" text-anchor="middle" font-size="14" font-weight="800" fill="${g.color}">${j + 1}</text>
          <text x="42" y="6" font-size="13" font-weight="600" fill="${C.textSoft}">${it}</text>
        </g>
      `).join('')}
    `;
  }).join('')}
  `);
}

// ---------- Entry ----------
async function writeAll() {
  const items = [
    ['invest-01-hero', hero()],
    ['invest-02-matrix', matrix()],
    ['invest-03-spending-map', spendingMap()],
    ['invest-04-risk-ranking', riskRanking()],
    ['invest-05-saving-ranking', savingRanking()],
    ['invest-06-temperament', temperamentMoney()],
    ['invest-07-couple-money', coupleMoney()],
    ['invest-08-action-checklist', actionChecklist()],
  ];

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [name, svg] of items) {
    const svgPath = `${OUT_DIR}/${name}.svg`;
    const webpPath = `${OUT_DIR}/${name}.webp`;
    fs.writeFileSync(svgPath, svg, 'utf8');
    await sharp(Buffer.from(svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(webpPath);
    const svgKb = (fs.statSync(svgPath).size / 1024).toFixed(1);
    const webpKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${name}  svg=${svgKb}KB  webp=${webpKb}KB`);
  }
  console.log(`\n✅ Generated ${items.length} infographics → ${OUT_DIR}`);
}

writeAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
