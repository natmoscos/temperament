// Generate infographics for Pillar 1: "MBTI 여자·남자 특징 총정리"
// Output: public/blog/pillar-gender-{name}.{svg,webp} (primary SVG + WebP for SEO)
//
// Image set (6):
//   01 hero           - 브랜드 히어로 카드
//   02 matrix         - 4기질 × 16유형 매트릭스
//   03 nt-gender      - NT 분석가형 여자 vs 남자 비교 카드
//   04 nf-gender      - NF 이상주의형 여자 vs 남자 비교 카드
//   05 sj-gender      - SJ 관리자형 여자 vs 남자 비교 카드
//   06 sp-gender      - SP 기회포착형 여자 vs 남자 비교 카드
//   07 summary        - 16유형 × 여자/남자 한눈 요약 격자

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

// Design tokens
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
  pinkBg: '#fdf2f8', pink600: '#db2777', pink700: '#be185d',
  blueBg: '#eff6ff', blue600: '#2563eb', blue700: '#1d4ed8',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · MBTI 성별 특징 가이드</text>
</svg>`;

// ---------- 01 HERO ----------
function hero() {
  const types = [
    { t: 'INTJ', g: 'NT' }, { t: 'INTP', g: 'NT' }, { t: 'ENTJ', g: 'NT' }, { t: 'ENTP', g: 'NT' },
    { t: 'INFJ', g: 'NF' }, { t: 'INFP', g: 'NF' }, { t: 'ENFJ', g: 'NF' }, { t: 'ENFP', g: 'NF' },
    { t: 'ISTJ', g: 'SJ' }, { t: 'ISFJ', g: 'SJ' }, { t: 'ESTJ', g: 'SJ' }, { t: 'ESFJ', g: 'SJ' },
    { t: 'ISTP', g: 'SP' }, { t: 'ISFP', g: 'SP' }, { t: 'ESTP', g: 'SP' }, { t: 'ESFP', g: 'SP' },
  ];
  const colorMap = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
  // Decorative type badges scattered around
  const scatter = [
    { i: 0, x: 130, y: 260 }, { i: 4, x: 1060, y: 240 },
    { i: 2, x: 200, y: 480 }, { i: 5, x: 1080, y: 500 },
    { i: 8, x: 110, y: 680 }, { i: 13, x: 1090, y: 700 },
  ];
  return wrap(`
  <defs>
    <radialGradient id="hG" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f4f6"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  ${scatter.map(({ i, x, y }) => {
    const d = types[i];
    const r = 50;
    return `
      <circle cx="${x}" cy="${y}" r="${r + 10}" fill="${colorMap[d.g]}" opacity="0.1"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${colorMap[d.g]}"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="${r * 0.4}" font-weight="800" fill="#fff">${d.t}</text>
    `;
  }).join('')}

  <!-- Gender tag chips top -->
  <g transform="translate(430, 150)">
    <rect x="0" y="0" width="140" height="38" rx="19" fill="${C.pinkBg}" stroke="${C.pink600}" stroke-width="1.5"/>
    <text x="70" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="${C.pink700}">♀ 여자 16유형</text>
    <rect x="165" y="0" width="140" height="38" rx="19" fill="${C.blueBg}" stroke="${C.blue600}" stroke-width="1.5"/>
    <text x="235" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="${C.blue700}">♂ 남자 16유형</text>
  </g>

  <!-- Center card -->
  <rect x="270" y="230" width="660" height="270" rx="24" fill="#ffffff" stroke="${C.border}" stroke-width="1"/>
  <text x="600" y="285" text-anchor="middle" font-size="17" font-weight="600" fill="${C.textMuted}" letter-spacing="8">PILLAR GUIDE · 2026</text>
  <text x="600" y="352" text-anchor="middle" font-size="46" font-weight="800" fill="${C.text}">MBTI 여자 · 남자 특징</text>
  <text x="600" y="395" text-anchor="middle" font-size="30" font-weight="700" fill="${C.textSoft}">완전 정리</text>
  <line x1="460" y1="420" x2="740" y2="420" stroke="${C.border}" stroke-width="1"/>
  <text x="600" y="445" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textMuted}">16유형 × 성별 = 32가지 조합 · 인지기능 기반 해석</text>
  <text x="600" y="473" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textFaint}">매력 포인트 · 연애 스타일 · 오해받는 이유</text>

  <!-- Bottom 4-temperament chip row -->
  <g transform="translate(300, 560)">
    ${[
      { l: 'NT 분석가형', c: C.nt600, x: 0 },
      { l: 'NF 이상주의형', c: C.nf600, x: 155 },
      { l: 'SJ 관리자형', c: C.sj600, x: 320 },
      { l: 'SP 기회포착형', c: C.sp600, x: 470 },
    ].map(({ l, c, x }) => `
      <g transform="translate(${x},0)">
        <circle cx="12" cy="24" r="9" fill="${c}"/>
        <text x="28" y="29" font-size="13" font-weight="600" fill="${C.textSoft}">${l}</text>
      </g>
    `).join('')}
  </g>

  <!-- Decorative badge: total 32 -->
  <g transform="translate(545, 630)">
    <rect x="0" y="0" width="110" height="44" rx="22" fill="${C.text}"/>
    <text x="55" y="29" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">TOTAL · 32</text>
  </g>
  <text x="600" y="705" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">한 번에 읽는 16유형 × 여자 · 남자 가이드</text>
  `);
}

// ---------- 02 MATRIX (4기질 × 4유형 격자) ----------
function matrix() {
  const rows = [
    { label: 'NT · 분석가형', color: C.nt600, bg: C.nt50, desc: '전략 · 논리 · 통찰', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
    { label: 'NF · 이상주의형', color: C.nf600, bg: C.nf50, desc: '가치 · 공감 · 의미', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
    { label: 'SJ · 관리자형', color: C.sj600, bg: C.sj50, desc: '책임 · 안정 · 전통', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
    { label: 'SP · 기회포착형', color: C.sp600, bg: C.sp50, desc: '실전 · 감각 · 현재', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
  ];
  const colX = [280, 480, 680, 880];
  const rowY = [210, 360, 510, 660];
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">16유형 × 4기질 매트릭스</text>
  <text x="600" y="92" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">어떤 기질에 속하는지에 따라 여자·남자 특징이 달라져</text>

  <!-- Column headers: I/E + S/N split not needed; just 4 groups -->
  <g>
    ${['내향 판단(IxxJ)', '내향 인식(IxxP)', '외향 판단(ExxJ)', '외향 인식(ExxP)'].map((l, i) => `
      <text x="${colX[i]}" y="175" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textMuted}" letter-spacing="1">${l}</text>
    `).join('')}
  </g>

  ${rows.map((r, ri) => `
    <!-- Row label -->
    <rect x="40" y="${rowY[ri] - 50}" width="200" height="110" rx="12" fill="${r.bg}" stroke="${r.color}" stroke-width="1"/>
    <text x="140" y="${rowY[ri] - 17}" text-anchor="middle" font-size="16" font-weight="800" fill="${r.color}">${r.label}</text>
    <text x="140" y="${rowY[ri] + 10}" text-anchor="middle" font-size="12" font-weight="500" fill="${C.textSoft}">${r.desc}</text>
    <text x="140" y="${rowY[ri] + 38}" text-anchor="middle" font-size="11" font-weight="600" fill="${r.color}" opacity="0.7">4 TYPES</text>

    <!-- Type badges -->
    ${r.types.map((t, ti) => `
      <circle cx="${colX[ti]}" cy="${rowY[ri]}" r="44" fill="${r.color}"/>
      <text x="${colX[ti]}" y="${rowY[ri] + 6}" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${t}</text>
      <g transform="translate(${colX[ti] - 36}, ${rowY[ri] + 50})">
        <rect x="0" y="0" width="32" height="20" rx="10" fill="${C.pinkBg}" stroke="${C.pink600}" stroke-width="1"/>
        <text x="16" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="${C.pink700}">♀</text>
        <rect x="40" y="0" width="32" height="20" rx="10" fill="${C.blueBg}" stroke="${C.blue600}" stroke-width="1"/>
        <text x="56" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="${C.blue700}">♂</text>
      </g>
    `).join('')}
  `).join('')}

  <!-- Legend -->
  <g transform="translate(180, 800)">
    <rect x="0" y="0" width="840" height="56" fill="#fff" stroke="${C.border}" stroke-width="1" rx="10"/>
    <text x="24" y="25" font-size="12" font-weight="700" fill="${C.textSoft}">읽는 법</text>
    <text x="24" y="44" font-size="11" fill="${C.textMuted}">행 = 4가지 기질 · 열 = 인지 태도(I/E × 판단/인식) · 각 유형 아래 ♀/♂ 탭이 여자/남자 특징 글로 연결</text>
  </g>
  `);
}

// ---------- 03-06 Gender comparison cards ----------
function genderCard({ title, subtitle, groupLabel, color, bg, types }) {
  // types: [{ t, w: {title, traits[3], celeb}, m: {title, traits[3], celeb} }]
  return wrap(`
  <!-- Title band -->
  <rect x="0" y="0" width="1200" height="110" fill="${bg}"/>
  <text x="80" y="55" font-size="14" font-weight="700" fill="${color}" letter-spacing="4">${groupLabel}</text>
  <text x="80" y="92" font-size="28" font-weight="800" fill="${C.text}">${title}</text>
  <text x="1120" y="75" text-anchor="end" font-size="13" font-weight="500" fill="${C.textMuted}">${subtitle}</text>
  <line x1="0" y1="110" x2="1200" y2="110" stroke="${color}" stroke-width="3"/>

  <!-- 4 row comparison: 유형 | 여자 | 남자 -->
  <g transform="translate(0, 135)">
    <!-- Column headers -->
    <rect x="80" y="0" width="150" height="38" rx="8" fill="${C.bgSoft}"/>
    <text x="155" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="${C.textSoft}">유형</text>
    <rect x="250" y="0" width="420" height="38" rx="8" fill="${C.pinkBg}"/>
    <text x="460" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="${C.pink700}">♀ 여자 특징</text>
    <rect x="690" y="0" width="420" height="38" rx="8" fill="${C.blueBg}"/>
    <text x="900" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="${C.blue700}">♂ 남자 특징</text>

    ${types.map((row, i) => {
      const y = 60 + i * 155;
      return `
      <!-- Type badge -->
      <rect x="80" y="${y}" width="150" height="135" rx="12" fill="${color}"/>
      <text x="155" y="${y + 52}" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">${row.t}</text>
      <line x1="100" y1="${y + 68}" x2="210" y2="${y + 68}" stroke="#fff" stroke-width="1" opacity="0.5"/>
      <text x="155" y="${y + 92}" text-anchor="middle" font-size="11" font-weight="600" fill="#fff" opacity="0.9">${row.code}</text>
      <text x="155" y="${y + 115}" text-anchor="middle" font-size="10" font-weight="500" fill="#fff" opacity="0.75">${row.label}</text>

      <!-- Women column -->
      <rect x="250" y="${y}" width="420" height="135" rx="12" fill="#fff" stroke="${C.pink600}" stroke-width="1.5"/>
      <text x="270" y="${y + 28}" font-size="15" font-weight="800" fill="${C.pink700}">${row.w.title}</text>
      ${row.w.traits.map((tr, ti) => `
        <circle cx="278" cy="${y + 56 + ti * 22}" r="3" fill="${C.pink600}"/>
        <text x="290" y="${y + 60 + ti * 22}" font-size="12" fill="${C.textSoft}">${tr}</text>
      `).join('')}
      <text x="652" y="${y + 125}" text-anchor="end" font-size="11" font-style="italic" fill="${C.pink600}">★ ${row.w.celeb}</text>

      <!-- Men column -->
      <rect x="690" y="${y}" width="420" height="135" rx="12" fill="#fff" stroke="${C.blue600}" stroke-width="1.5"/>
      <text x="710" y="${y + 28}" font-size="15" font-weight="800" fill="${C.blue700}">${row.m.title}</text>
      ${row.m.traits.map((tr, ti) => `
        <circle cx="718" cy="${y + 56 + ti * 22}" r="3" fill="${C.blue600}"/>
        <text x="730" y="${y + 60 + ti * 22}" font-size="12" fill="${C.textSoft}">${tr}</text>
      `).join('')}
      <text x="1092" y="${y + 125}" text-anchor="end" font-size="11" font-style="italic" fill="${C.blue600}">★ ${row.m.celeb}</text>
      `;
    }).join('')}
  </g>
  `);
}

// ---------- 07 SUMMARY GRID (16 x 2) ----------
function summary() {
  // Condensed "여자는 X, 남자는 Y" one-liners
  const data = [
    { t: 'INTJ', g: 'NT', w: '조용히 판 짜는 전략가', m: '차가워 보이는 장기 설계자' },
    { t: 'INTP', g: 'NT', w: '머릿속 세계가 우주인 탐구자', m: '논쟁보다 진실을 좇는 분석가' },
    { t: 'ENTJ', g: 'NT', w: '판을 주도하는 카리스마', m: '결과로 말하는 리더' },
    { t: 'ENTP', g: 'NT', w: '말 빠른 아이디어 뱅크', m: '논쟁 좋아하지만 순수한 진실파' },
    { t: 'INFJ', g: 'NF', w: '알 수 없는 조용한 통찰자', m: '읽기 어려운 섬세한 이상주의자' },
    { t: 'INFP', g: 'NF', w: '착해 보이지만 선 넘으면 끝', m: '남자답지 않다는 말 속 단단함' },
    { t: 'ENFJ', g: 'NF', w: '다정해서 먼저 지치는 사람', m: '모두의 멘토가 정작 외로움' },
    { t: 'ENFP', g: 'NF', w: '밝은데 가치관은 단단함', m: '재밌는데 갑자기 사라지는 이유' },
    { t: 'ISTJ', g: 'SJ', w: '재미없어 보이는 반전 매력', m: '무뚝뚝하지만 약속은 철저' },
    { t: 'ISFJ', g: 'SJ', w: '챙기는데 정작 본인은 외로움', m: '조용히 챙기는데 아무도 모름' },
    { t: 'ESTJ', g: 'SJ', w: '까칠해 보이는 따뜻한 리더', m: '딱딱한 듯 제일 책임지는 남자' },
    { t: 'ESFJ', g: 'SJ', w: '착해서 손해 보는 사람', m: '책임감 강한 다정함의 끝판' },
    { t: 'ISTP', g: 'SP', w: '쿨한 척이 아닌 진짜 쿨함', m: '말 적고 손 바쁜 장인' },
    { t: 'ISFP', g: 'SP', w: '조용한데 자아가 가장 강함', m: '감각적이고 부드러운 독립러' },
    { t: 'ESTP', g: 'SP', w: '첫인상과 실제가 다른 사람', m: '무모한 듯 계산된 용기의 남자' },
    { t: 'ESFP', g: 'SP', w: '분위기 메이커의 숨은 눈물', m: '현재를 즐기는 자유로운 영혼' },
  ];
  const colorMap = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
  const bgMap = { NT: C.nt50, NF: C.nf50, SJ: C.sj50, SP: C.sp50 };
  return wrap(`
  <text x="600" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 × 여자·남자 한눈 요약</text>
  <text x="600" y="86" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">각 유형의 성별별 핵심 매력 포인트</text>

  <!-- Column headers -->
  <g transform="translate(0, 110)">
    <rect x="60" y="0" width="100" height="32" rx="6" fill="${C.bgSoft}"/>
    <text x="110" y="21" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textSoft}">유형</text>
    <rect x="170" y="0" width="480" height="32" rx="6" fill="${C.pinkBg}"/>
    <text x="410" y="21" text-anchor="middle" font-size="13" font-weight="800" fill="${C.pink700}">♀ 여자</text>
    <rect x="660" y="0" width="480" height="32" rx="6" fill="${C.blueBg}"/>
    <text x="900" y="21" text-anchor="middle" font-size="13" font-weight="800" fill="${C.blue700}">♂ 남자</text>
  </g>

  <!-- 16 rows -->
  ${data.map((d, i) => {
    const y = 160 + i * 42;
    const stripe = i % 2 === 0 ? '#ffffff' : '#f9fafb';
    return `
      <rect x="30" y="${y - 21}" width="1140" height="40" fill="${stripe}"/>
      <circle cx="85" cy="${y - 1}" r="8" fill="${colorMap[d.g]}"/>
      <text x="110" y="${y + 4}" font-size="14" font-weight="800" fill="${colorMap[d.g]}">${d.t}</text>
      <text x="180" y="${y + 4}" font-size="12" fill="${C.textSoft}">${d.w}</text>
      <text x="670" y="${y + 4}" font-size="12" fill="${C.textSoft}">${d.m}</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(150, 845)">
    <circle cx="10" cy="12" r="7" fill="${C.nt600}"/>
    <text x="24" y="16" font-size="11" font-weight="600" fill="${C.textSoft}">NT 분석가형</text>
    <circle cx="160" cy="12" r="7" fill="${C.nf600}"/>
    <text x="174" y="16" font-size="11" font-weight="600" fill="${C.textSoft}">NF 이상주의형</text>
    <circle cx="325" cy="12" r="7" fill="${C.sj600}"/>
    <text x="339" y="16" font-size="11" font-weight="600" fill="${C.textSoft}">SJ 관리자형</text>
    <circle cx="475" cy="12" r="7" fill="${C.sp600}"/>
    <text x="489" y="16" font-size="11" font-weight="600" fill="${C.textSoft}">SP 기회포착형</text>
  </g>
  `);
}

// ---------- Data for quadrant cards ----------
const NT_TYPES = [
  {
    t: 'INTJ', code: 'Ni-Te', label: '전략적 은둔자',
    w: { title: '냉정해 보이는 장기 설계자', traits: ['에너지를 아껴 쓰는 침묵', '좋아하면 오히려 무뚝뚝', '자기 세계에 초대받는 게 사랑'], celeb: '제니 (BLACKPINK)' },
    m: { title: '소시오패스 오해받는 진심파', traits: ['말 대신 결과로 증명', '감정 표현은 서툴지만 충실', '혼자만의 방이 반드시 필요'], celeb: '유재하' },
  },
  {
    t: 'INTP', code: 'Ti-Ne', label: '논리적 탐구자',
    w: { title: '"여자답지 않다"가 칭찬인 사람', traits: ['머릿속이 24시간 돌아감', '감정보다 원리부터 궁금', '혼자 파고드는 걸 사랑'], celeb: '아이유' },
    m: { title: '말보다 생각이 앞서는 사색가', traits: ['답하기 전에 5초 고민', '확신 없으면 말 안 함', '논리 허점 보면 못 참음'], celeb: '빌 게이츠' },
  },
  {
    t: 'ENTJ', code: 'Te-Ni', label: '판을 짜는 리더',
    w: { title: '"무섭다"가 훈장인 카리스마', traits: ['방향이 명확한 추진력', '감정보다 결과로 승부', '파트너도 성장 파트너'], celeb: '스티브 잡스 스타일' },
    m: { title: '결과로 말하는 타고난 리더', traits: ['시스템을 짜고 굴림', '비효율 보이면 지적', '신뢰 쌓이면 속은 따뜻'], celeb: '손흥민 오너' },
  },
  {
    t: 'ENTP', code: 'Ne-Ti', label: '아이디어 뱅크',
    w: { title: '연애할 때 조심해야 할 유형?', traits: ['재밌고 말 빠르고 기발함', '루틴해지면 금방 지루', '논쟁에서 오히려 끌림'], celeb: '전소연 ((G)I-DLE)' },
    m: { title: '논쟁 좋아하지만 진실파', traits: ['상대 생각을 뒤집는 걸 즐김', '금방 흥미 잃어 보여도 충실', '아이디어 공유가 애정 표현'], celeb: '로버트 다우니 주니어' },
  },
];

const NF_TYPES = [
  {
    t: 'INFJ', code: 'Ni-Fe', label: '깊은 사색가',
    w: { title: '갑자기 연락 끊는 이유가 있다고', traits: ['사람은 좋아하지만 쉽게 지침', '신호를 참고 참다 도어슬램', '진짜 친한 사람은 2명 이하'], celeb: '아이유 (감정 표현 측면)' },
    m: { title: '"알 수 없는 사람" 1위 유형', traits: ['말수 적고 시선이 멀리', '진심 알아주면 무한히 충실', '본인도 본인을 잘 모름'], celeb: '방탄소년단 RM' },
  },
  {
    t: 'INFP', code: 'Fi-Ne', label: '상상 속 세계인',
    w: { title: '착해 보이지만 선 넘으면 끝', traits: ['감정에 빠지면 현실 멈춤', '말은 안 해도 속으로 기록', '참다가 예고 없이 사라짐'], celeb: '태연 (SNSD)' },
    m: { title: '"남자답지 않다" 속 단단함', traits: ['감정을 음악·글로 표현', '자기 가치 건드리면 단호', '조용하지만 꺾이지 않음'], celeb: '이상' },
  },
  {
    t: 'ENFJ', code: 'Fe-Ni', label: '다정한 멘토',
    w: { title: '다정해서 제일 먼저 지치는 사람', traits: ['남 감정에 공명하며 소진', '분위기 책임감이 과함', '자기 감정 돌보는 법을 배워야'], celeb: '박보영 (친절 캐릭터)' },
    m: { title: '모두의 멘토가 정작 멘토 없음', traits: ['관계 조율이 본능', '공감 능력 과잉으로 번아웃', '본인 취약함은 숨김'], celeb: '버락 오바마' },
  },
  {
    t: 'ENFP', code: 'Ne-Fi', label: '매력 폭발러',
    w: { title: '매력적인데 자꾸 오해받는 사람', traits: ['아이디어 점프가 특기', '밝은데 가치관은 단단', '진짜 빠지면 올인'], celeb: '전소미' },
    m: { title: '재밌는데 갑자기 사라지는 이유', traits: ['관계 초반 에너지 폭발', '루틴 오면 숨이 막힘', '새로움 함께 만들 사람 선호'], celeb: '로버트 다우니 주니어(캐주얼)' },
  },
];

const SJ_TYPES = [
  {
    t: 'ISTJ', code: 'Si-Te', label: '루틴의 완성자',
    w: { title: '"재미없다" 오해 속 반전 매력', traits: ['약속은 생명', '감정 표현은 적지만 꾸준', '신뢰를 쌓는 데 3년'], celeb: '수지 (차분한 이미지)' },
    m: { title: '무뚝뚝해도 약속은 철저한 사람', traits: ['감정보다 사실 기반', '한번 맺은 관계는 오래', '깜짝 이벤트보다 꾸준한 챙김'], celeb: '공유 (성실 캐릭터)' },
  },
  {
    t: 'ISFJ', code: 'Si-Fe', label: '조용한 돌봄이',
    w: { title: '챙기는데 본인은 외로운 사람', traits: ['말보다 행동으로 돌봄', '거절을 못 해 소진', '인정받고 싶은 마음을 숨김'], celeb: '아이유 (잔잔한 배려)' },
    m: { title: '조용히 챙기는데 아무도 모름', traits: ['생색 없는 배려의 달인', '감정 표현보다 실용적 도움', '고마움 표현 필요'], celeb: '김수현 (다정 캐릭터)' },
  },
  {
    t: 'ESTJ', code: 'Te-Si', label: '추진력의 끝판',
    w: { title: '까칠한 편견 속 따뜻한 리더', traits: ['30분 안에 역할 분담 끝', '직설적이지만 뒤끝 없음', '가족 모임도 본인이 주도'], celeb: '김연아 (자기관리)' },
    m: { title: '딱딱해 보이는 제일 책임지는 남자', traits: ['실용적 애정 표현', '감정보다 문제 해결', '신뢰 쌓으면 평생 간다'], celeb: '이승기 (리더형 MC)' },
  },
  {
    t: 'ESFJ', code: 'Fe-Si', label: '공동체의 심장',
    w: { title: '"착해서 손해 본다" 속뜻', traits: ['그룹 분위기 책임자', '갈등 싫어 먼저 희생', '섭섭함을 쌓고 표현 못 함'], celeb: '수지 (다정 이미지)' },
    m: { title: '다정한 듯 가장 책임감 강한 남자', traits: ['사회적 관계가 에너지', '책임지는 역할이 자존감', '인정과 감사로 힘남'], celeb: '유재석' },
  },
];

const SP_TYPES = [
  {
    t: 'ISTP', code: 'Ti-Se', label: '기계 만지는 장인',
    w: { title: '쿨한 척이 아닌 진짜 쿨함', traits: ['말은 적고 행동은 빠름', '관심 없으면 진짜 안 봄', '필요할 때 정확히 도움'], celeb: '크리스틴 스튜어트 (쿨톤)' },
    m: { title: '말 적고 손 바쁜 장인형 남자', traits: ['도구·스킬에 몰입', '감정보다 실전', '위기 때 의외로 듬직'], celeb: '키아누 리브스' },
  },
  {
    t: 'ISFP', code: 'Fi-Se', label: '감각적 예술가',
    w: { title: '조용한데 자아가 가장 강한 사람', traits: ['자기 가치 건드리면 움직임', '감각적인 취향이 뚜렷', '강요받으면 침묵으로 저항'], celeb: '문채원 (잔잔한 결' },
    m: { title: '감각적이고 부드러운 독립러', traits: ['말보다 취향과 스타일', '자기 페이스가 생명', '감정 공유는 가까운 사이만'], celeb: '차은우 (분위기형)' },
  },
  {
    t: 'ESTP', code: 'Se-Ti', label: '현장의 해결사',
    w: { title: '첫인상과 실제가 다른 사람', traits: ['텐션 높은데 속은 현실주의', '즉각적 반응이 매력', '지루함을 못 견딤'], celeb: '제니 (무대 퍼포먼스 측면)' },
    m: { title: '무모한 듯 계산된 용기의 남자', traits: ['리스크 계산 후 돌진', '말보다 움직임이 먼저', '감정 표현은 행동으로'], celeb: '마동석 (실전파)' },
  },
  {
    t: 'ESFP', code: 'Se-Fi', label: '분위기 메이커',
    w: { title: '분위기 메이커의 숨은 눈물', traits: ['밝은 겉과 섬세한 속', '혼자 있으면 급 우울', '사람으로 충전'], celeb: '혜리 (밝은 캐릭터)' },
    m: { title: '현재를 즐기는 자유로운 영혼', traits: ['즉흥적 감성 폭발', '미래 계획은 약함', '함께 노는 파트너를 사랑'], celeb: '지드래곤' },
  },
];

// ---------- Entry ----------
async function writeAll() {
  const items = [
    ['pillar-gender-01-hero', hero()],
    ['pillar-gender-02-matrix', matrix()],
    ['pillar-gender-03-nt', genderCard({
      title: 'NT 분석가형 · 여자 vs 남자',
      subtitle: 'Ni/Ti 주기능 · 전략 · 분석 · 통찰',
      groupLabel: 'NT · THE RATIONALS',
      color: C.nt600,
      bg: C.nt50,
      types: NT_TYPES,
    })],
    ['pillar-gender-04-nf', genderCard({
      title: 'NF 이상주의형 · 여자 vs 남자',
      subtitle: 'Fi/Fe 조합 · 가치 · 공감 · 의미',
      groupLabel: 'NF · THE IDEALISTS',
      color: C.nf600,
      bg: C.nf50,
      types: NF_TYPES,
    })],
    ['pillar-gender-05-sj', genderCard({
      title: 'SJ 관리자형 · 여자 vs 남자',
      subtitle: 'Si-Te/Fe · 책임 · 안정 · 전통',
      groupLabel: 'SJ · THE GUARDIANS',
      color: C.sj600,
      bg: C.sj50,
      types: SJ_TYPES,
    })],
    ['pillar-gender-06-sp', genderCard({
      title: 'SP 기회포착형 · 여자 vs 남자',
      subtitle: 'Se-Ti/Fi · 실전 · 감각 · 현재',
      groupLabel: 'SP · THE EXPLORERS',
      color: C.sp600,
      bg: C.sp50,
      types: SP_TYPES,
    })],
    ['pillar-gender-07-summary', summary()],
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
