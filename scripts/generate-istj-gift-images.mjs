// ISTJ 여자친구 선물 추천 글 — 7개 섹션 이미지
// 모든 이미지 글자·색·레이아웃 중심 (일러스트·사람 묘사 없음)
//
// 이미지 매핑:
//   01 hero         — 대형 타이포그래피 히어로 (썸네일 겸용)
//   02 principles   — 5원칙 노트 감성
//   03 top10        — TOP 10 거대 숫자 강조
//   04 situations   — 5가지 상황별 탭 카드
//   05 avoid        — 피해야 할 5가지 경고 배지
//   06 wrapping     — 선물 포장 편지 감성
//   07 outro        — 매거진 임팩트 마무리

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

// 한국 감성 파스텔 팔레트
const C = {
  bg: '#faf8f5',
  white: '#ffffff',
  text: '#1a1a1a',
  textSoft: '#4b5563',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  pink: '#ffe5ec',
  pinkDeep: '#ec4899',
  pinkSoft: '#fce7f3',
  rosegold: '#b76e79',
  lavender: '#e0bbe4',
  lavenderDeep: '#a855f7',
  peach: '#ffdab9',
  peachDeep: '#fb923c',
  honey: '#f5e6ca',
  mint: '#d1f2eb',
  mintDeep: '#10b981',
  navy: '#2c3e50',
  cream: '#fef9e7',
  red: '#dc2626',
  redSoft: '#fee2e2',
  noteBg: '#fdf6e3',
  noteLine: '#e8dcc0',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const FONT_HAND = `'Nanum Pen Script', 'Nanum Myeongjo', 'Gamja Flower', 'Jua', cursive, ${FONT}`;

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 선물 가이드</text>
</svg>`;

// ─────────────────────────────────────────
// 01. HERO — 대형 타이포그래피 히어로
// ─────────────────────────────────────────
function hero() {
  return wrap(`
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe5ec"/>
      <stop offset="50%" stop-color="#fce7f3"/>
      <stop offset="100%" stop-color="#e0bbe4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#heroBg)"/>

  <!-- 상단 카테고리 라벨 -->
  <g transform="translate(600, 150)">
    <rect x="-220" y="-38" width="440" height="76" rx="38" fill="${C.white}" opacity="0.7"/>
    <text x="0" y="14" text-anchor="middle" font-size="28" font-weight="900" fill="${C.pinkDeep}" letter-spacing="6">ISTJ GIFT GUIDE</text>
  </g>

  <!-- 거대 메인 타이틀 -->
  <text x="600" y="360" text-anchor="middle" font-size="96" font-weight="900" fill="${C.navy}">ISTJ 여자친구</text>
  <text x="600" y="470" text-anchor="middle" font-size="96" font-weight="900" fill="${C.pinkDeep}">선물 추천</text>

  <!-- 구분선 -->
  <line x1="500" y1="520" x2="700" y2="520" stroke="${C.rosegold}" stroke-width="5"/>

  <!-- 서브타이틀 -->
  <text x="600" y="580" text-anchor="middle" font-size="38" font-weight="800" fill="${C.textSoft}">10년 쓸 선물 · 한 번에 성공하는 공식</text>

  <!-- 중간 강조 박스 -->
  <g transform="translate(600, 670)">
    <rect x="-380" y="0" width="760" height="90" rx="20" fill="${C.white}" opacity="0.85"/>
    <text x="0" y="40" text-anchor="middle" font-size="26" font-weight="700" fill="${C.text}">실용성 60% × 감성 40%의 황금 비율</text>
    <text x="0" y="72" text-anchor="middle" font-size="22" font-weight="600" fill="${C.textMuted}">ISTJ 여자 특성 기반 큐레이션 5선 수록</text>
  </g>

  <!-- 페르소나 크레딧 -->
  <g transform="translate(600, 810)">
    <text x="0" y="0" text-anchor="middle" font-size="22" font-weight="700" fill="${C.rosegold}">by. 박서연 (ENFP, 연애 관찰자) × 이준형 (ISTJ, 차장 12년차)</text>
  </g>
  `);
}

// ─────────────────────────────────────────
// 02. 5원칙 — 노트 감성
// ─────────────────────────────────────────
function principles() {
  const rules = [
    { num: '01', headline: '화려함 < 실용성', desc: 'ISTJ는 "쓸모"가 사랑의 증거' },
    { num: '02', headline: '검증된 브랜드', desc: '10년 된 스테디셀러 > 신상' },
    { num: '03', headline: '예고된 선물', desc: '깜짝 이벤트는 오히려 부담' },
    { num: '04', headline: '이름·기념일 각인', desc: '기억을 물건에 새기기' },
    { num: '05', headline: '10년 쓸 물건', desc: '소모성보다 내구성 중시' },
  ];

  return wrap(`
  <rect width="1200" height="900" fill="${C.noteBg}"/>

  <!-- 바인더 구멍 -->
  ${[120, 270, 420, 570, 720].map(y => `
    <circle cx="90" cy="${y}" r="14" fill="#d4c5a0"/>
    <circle cx="90" cy="${y}" r="8" fill="${C.noteBg}"/>
  `).join('')}
  <line x1="135" y1="60" x2="135" y2="870" stroke="${C.red}" stroke-width="2" opacity="0.5"/>

  <!-- 노트 줄 -->
  ${Array.from({ length: 20 }, (_, i) => 110 + i * 40).map(y => `
    <line x1="150" y1="${y}" x2="1150" y2="${y}" stroke="${C.noteLine}" stroke-width="1.5"/>
  `).join('')}

  <!-- 스카치테이프 장식 -->
  <g transform="translate(800, 75) rotate(5)" opacity="0.6">
    <rect x="0" y="0" width="160" height="36" fill="#fbbf24" opacity="0.4"/>
  </g>

  <!-- 제목 (손글씨) -->
  <text x="175" y="130" font-size="58" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">
    ISTJ 여친 선물 5원칙 ✎
  </text>
  <text x="175" y="168" font-size="26" font-weight="600" fill="${C.rosegold}" font-family="${FONT_HAND}">
    — 이준형이 아내 12년 보며 얻은 공식
  </text>

  <!-- 5원칙 카드 -->
  ${rules.map((r, i) => {
    const y = 225 + i * 125;
    return `
      <g transform="translate(175, ${y})">
        <rect x="0" y="0" width="75" height="75" rx="16" fill="${C.pinkDeep}"/>
        <text x="37" y="52" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">${r.num}</text>

        <text x="105" y="42" font-size="40" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${escapeXml(r.headline)}</text>
        <text x="105" y="72" font-size="24" font-weight="600" fill="${C.textSoft}">${escapeXml(r.desc)}</text>
      </g>
    `;
  }).join('')}

  <!-- 사인 -->
  <g transform="translate(850, 850) rotate(-3)">
    <text font-size="28" font-weight="700" fill="${C.rosegold}" font-family="${FONT_HAND}">
      - 박서연 💕
    </text>
  </g>
  `);
}

// ─────────────────────────────────────────
// 03. TOP 10 — 거대 숫자 강조
// ─────────────────────────────────────────
function top10() {
  return wrap(`
  <defs>
    <linearGradient id="top10Bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.cream}"/>
      <stop offset="100%" stop-color="${C.pinkSoft}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#top10Bg)"/>

  <!-- 상단 라벨 -->
  <text x="600" y="90" text-anchor="middle" font-size="24" font-weight="700" fill="${C.pinkDeep}" letter-spacing="8">EDITOR'S SELECTION</text>

  <!-- 거대한 TOP 10 -->
  <g transform="translate(600, 430)">
    <text x="0" y="0" text-anchor="middle" font-size="320" font-weight="900" fill="${C.navy}" letter-spacing="-8">TOP</text>
    <text x="0" y="150" text-anchor="middle" font-size="200" font-weight="900" fill="${C.pinkDeep}">10</text>
  </g>

  <!-- 서브타이틀 -->
  <text x="600" y="670" text-anchor="middle" font-size="46" font-weight="900" fill="${C.text}">ISTJ 여자가 진심으로 좋아하는</text>
  <text x="600" y="720" text-anchor="middle" font-size="46" font-weight="900" fill="${C.text}">선물 10가지</text>

  <!-- 하단 카테고리 태그 -->
  <g transform="translate(600, 790)">
    ${[
      { text: '💎 주얼리', color: C.pinkDeep, x: -400 },
      { text: '🌸 뷰티', color: C.lavenderDeep, x: -200 },
      { text: '🥤 데일리', color: C.peachDeep, x: 0 },
      { text: '🧴 스킨케어', color: C.mintDeep, x: 200 },
      { text: '🕯 홈카페', color: C.rosegold, x: 400 },
    ].map(t => `
      <g transform="translate(${t.x}, 0)">
        <rect x="-80" y="-22" width="160" height="44" rx="22" fill="${t.color}"/>
        <text x="0" y="8" text-anchor="middle" font-size="20" font-weight="900" fill="#ffffff">${escapeXml(t.text)}</text>
      </g>
    `).join('')}
  </g>
  `);
}

// ─────────────────────────────────────────
// 04. 상황별 매트릭스 — 탭 카드
// ─────────────────────────────────────────
function situations() {
  const items = [
    { icon: '🎂', title: '생일', desc: '각인 주얼리 or 시그니처 향수', color: C.pinkDeep, bg: '#fdf2f8' },
    { icon: '🎄', title: '크리스마스', desc: '시즌 한정 캔들 + 손편지', color: C.mintDeep, bg: '#ecfdf5' },
    { icon: '💕', title: '1주년', desc: '실버 목걸이 (각인 필수)', color: C.rosegold, bg: '#fdf6f8' },
    { icon: '💍', title: '프로포즈', desc: '작은 주얼리 + 프리미엄 향수', color: C.lavenderDeep, bg: '#faf5ff' },
    { icon: '🎉', title: '승진 축하', desc: '고급 텀블러 (각인) or 만년필', color: C.peachDeep, bg: '#fff7ed' },
  ];

  return wrap(`
  <!-- 상단 제목 -->
  <rect x="0" y="0" width="1200" height="140" fill="${C.navy}"/>
  <text x="600" y="70" text-anchor="middle" font-size="30" font-weight="700" fill="${C.pinkSoft}" letter-spacing="6">SITUATION × GIFT MATRIX</text>
  <text x="600" y="115" text-anchor="middle" font-size="44" font-weight="900" fill="#ffffff">상황별 맞춤 선물 매칭표</text>

  <!-- 5개 상황 카드 (세로 스택) -->
  ${items.map((item, i) => {
    const y = 180 + i * 135;
    return `
      <g transform="translate(60, ${y})">
        <rect x="0" y="0" width="1080" height="115" rx="20" fill="${item.bg}"/>
        <rect x="0" y="0" width="10" height="115" rx="5" fill="${item.color}"/>

        <text x="60" y="72" font-size="60">${item.icon}</text>

        <text x="150" y="52" font-size="36" font-weight="900" fill="${C.text}">${escapeXml(item.title)}</text>
        <text x="150" y="88" font-size="24" font-weight="600" fill="${C.textSoft}">${escapeXml(item.desc)}</text>

        <g transform="translate(950, 57)">
          <rect x="-70" y="-22" width="140" height="44" rx="22" fill="${item.color}"/>
          <text x="0" y="8" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">추천 ★★★★★</text>
        </g>
      </g>
    `;
  }).join('')}
  `);
}

// ─────────────────────────────────────────
// 05. 피해야 할 5가지 — 경고 배지
// ─────────────────────────────────────────
function avoid() {
  const items = [
    { num: '01', title: '즉흥 서프라이즈', desc: '예고 없는 이벤트 = 부담' },
    { num: '02', title: '자극적 디자인', desc: '네온·화려한 컬러 NO' },
    { num: '03', title: '본인이 골라야 하는 것', desc: '립스틱 색·옷 사이즈' },
    { num: '04', title: '명품 과시용 브랜드', desc: '불편함 · 부담감 유발' },
    { num: '05', title: '소모성 꽃다발만', desc: '대신 화분 or 드라이플라워' },
  ];

  return wrap(`
  <rect width="1200" height="900" fill="${C.bg}"/>

  <!-- 상단 빨간 경고띠 -->
  <rect x="0" y="0" width="1200" height="150" fill="${C.redSoft}"/>
  <text x="600" y="70" text-anchor="middle" font-size="40" font-weight="900" fill="${C.red}">⛔ 절대 피해야 할 5가지</text>
  <text x="600" y="115" text-anchor="middle" font-size="24" font-weight="700" fill="${C.textSoft}">ISTJ 여자한테는 이것만은 NO — Ne 열등기능 자극 주의</text>

  <!-- 5가지 X 카드 -->
  ${items.map((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 60 : 620;
    const y = 200 + row * 180;

    // 마지막 하나는 가운데
    const isLast = i === 4;
    const finalX = isLast ? 340 : x;
    const finalY = isLast ? 560 : y;

    return `
      <g transform="translate(${finalX}, ${finalY})">
        <rect x="0" y="0" width="520" height="160" rx="20" fill="#ffffff" stroke="${C.red}" stroke-width="3"/>

        <!-- X 배지 -->
        <g transform="translate(50, 80)">
          <circle cx="0" cy="0" r="38" fill="${C.red}"/>
          <text x="0" y="15" text-anchor="middle" font-size="44" font-weight="900" fill="#ffffff">✕</text>
        </g>

        <!-- 번호 -->
        <text x="110" y="48" font-size="20" font-weight="800" fill="${C.red}" opacity="0.6">NO. ${item.num}</text>

        <!-- 제목 -->
        <text x="110" y="88" font-size="30" font-weight="900" fill="${C.text}">${escapeXml(item.title)}</text>

        <!-- 설명 -->
        <text x="110" y="125" font-size="22" font-weight="600" fill="${C.textSoft}">${escapeXml(item.desc)}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ─────────────────────────────────────────
// 06. 선물 포장 꿀팁 — 편지 감성
// ─────────────────────────────────────────
function wrapping() {
  const tips = [
    { title: '포장 컬러', content: '베이지 · 크림 · 더스티 핑크. 네온 금지.' },
    { title: '리본 소재', content: '실크 or 린넨. 플라스틱 X.' },
    { title: '카드 위치', content: '선물 위에 올려놓기. 안쪽 숨기기 NO.' },
    { title: '편지 분량', content: '3~5줄. 과한 미사여구 X, 구체 에피소드 O.' },
    { title: '타이밍', content: '저녁보다 아침. ISTJ는 하루 종일 여운 즐김.' },
  ];

  return wrap(`
  <defs>
    <linearGradient id="letterBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef9e7"/>
      <stop offset="100%" stop-color="#fff4d4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#letterBg)"/>

  <!-- 편지지 느낌 상단 장식 -->
  <g transform="translate(600, 110)">
    <text x="0" y="0" text-anchor="middle" font-size="56" font-weight="900" fill="${C.rosegold}" font-family="${FONT_HAND}">
      ✉ 선물 포장·편지 꿀팁
    </text>
    <text x="0" y="45" text-anchor="middle" font-size="24" font-weight="700" fill="${C.textMuted}">
      — ISTJ가 감동받는 디테일 5가지
    </text>
    <line x1="-120" y1="65" x2="120" y2="65" stroke="${C.rosegold}" stroke-width="3"/>
  </g>

  <!-- 5가지 팁 (편지 형식) -->
  ${tips.map((tip, i) => {
    const y = 250 + i * 115;
    return `
      <g transform="translate(100, ${y})">
        <!-- 번호 원 -->
        <circle cx="40" cy="40" r="34" fill="${C.rosegold}" opacity="0.15"/>
        <text x="40" y="52" text-anchor="middle" font-size="32" font-weight="900" fill="${C.rosegold}" font-family="${FONT_HAND}">
          ${i + 1}
        </text>

        <!-- 제목 -->
        <text x="110" y="35" font-size="32" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${escapeXml(tip.title)}</text>

        <!-- 내용 -->
        <text x="110" y="70" font-size="24" font-weight="600" fill="${C.textSoft}">${escapeXml(tip.content)}</text>

        <!-- 하단 구분선 (편지지 줄) -->
        <line x1="0" y1="92" x2="1000" y2="92" stroke="${C.noteLine}" stroke-width="1" stroke-dasharray="4,6"/>
      </g>
    `;
  }).join('')}

  <!-- 사인 -->
  <g transform="translate(950, 855) rotate(-3)">
    <text font-size="24" font-weight="700" fill="${C.rosegold}" font-family="${FONT_HAND}">
      from. 박서연 ♡
    </text>
  </g>
  `);
}

// ─────────────────────────────────────────
// 07. 마무리 — 매거진 임팩트
// ─────────────────────────────────────────
function outro() {
  return wrap(`
  <defs>
    <linearGradient id="outroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.navy}"/>
      <stop offset="100%" stop-color="${C.rosegold}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#outroBg)"/>

  <!-- 중앙 거대 메시지 -->
  <text x="600" y="220" text-anchor="middle" font-size="28" font-weight="700" fill="${C.pinkSoft}" letter-spacing="6">ONE LINE TO REMEMBER</text>

  <!-- 큰 인용구 -->
  <text x="100" y="320" font-size="180" font-weight="900" fill="${C.pinkSoft}" opacity="0.6">"</text>

  <text x="600" y="440" text-anchor="middle" font-size="68" font-weight="900" fill="#ffffff">
    ISTJ 여자는
  </text>
  <text x="600" y="530" text-anchor="middle" font-size="68" font-weight="900" fill="${C.pinkSoft}">
    10년 쓸 물건을 주는 사람을
  </text>
  <text x="600" y="620" text-anchor="middle" font-size="68" font-weight="900" fill="#ffffff">
    10년 기억한다
  </text>

  <text x="1100" y="680" text-anchor="end" font-size="180" font-weight="900" fill="${C.pinkSoft}" opacity="0.6">"</text>

  <!-- 하단 CTA 라인 -->
  <line x1="400" y1="760" x2="800" y2="760" stroke="${C.pinkSoft}" stroke-width="2"/>
  <text x="600" y="810" text-anchor="middle" font-size="28" font-weight="700" fill="${C.pinkSoft}">
    내 여친 MBTI 더 깊이 알아보고 싶다면
  </text>
  <text x="600" y="850" text-anchor="middle" font-size="22" font-weight="600" fill="${C.pinkSoft}" opacity="0.8">
    192types.co.kr · 100문항 정밀 검사 (무료)
  </text>
  `);
}

// ─────────────────────────────────────────
// 렌더링
// ─────────────────────────────────────────

const items = [
  { name: 'istj-gift-01-hero', svg: hero() },
  { name: 'istj-gift-02-principles', svg: principles() },
  { name: 'istj-gift-03-top10', svg: top10() },
  { name: 'istj-gift-04-situations', svg: situations() },
  { name: 'istj-gift-05-avoid', svg: avoid() },
  { name: 'istj-gift-06-wrapping', svg: wrapping() },
  { name: 'istj-gift-07-outro', svg: outro() },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const it of items) {
    const svgPath = `${OUT_DIR}/${it.name}.svg`;
    const webpPath = `${OUT_DIR}/${it.name}.webp`;
    fs.writeFileSync(svgPath, it.svg, 'utf-8');
    await sharp(Buffer.from(it.svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 90 })
      .toFile(webpPath);
    const svgKB = (fs.statSync(svgPath).size / 1024).toFixed(1);
    const webpKB = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${it.name}  svg=${svgKB}KB  webp=${webpKB}KB`);
  }
  console.log(`\n✅ ${items.length}개 이미지 생성 완료`);
}

run();
