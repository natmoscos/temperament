// ISTJ 여친 선물 글 — 4가지 이미지 스타일 샘플
// 승인 후 본 글 작업 시 이 템플릿을 기반으로 확장한다.
//
// 샘플 4개:
//   01 카톡 UI 말풍선      — 민지와 대화 (훅킹 섹션 느낌)
//   02 노트 찢은 감성      — 5원칙 리스트 (스티커 · 손글씨)
//   03 감성 매거진         — TOP 10 리스트 (비대칭 그리드)
//   04 제품 일러스트 카드  — 향수병 + 이름 각인 (제품 카드 예시)

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

  // 파스텔
  pink: '#ffe5ec',
  pinkDeep: '#ec4899',
  rosegold: '#b76e79',
  lavender: '#e0bbe4',
  peach: '#ffdab9',
  honey: '#f5e6ca',
  mint: '#d1f2eb',
  navy: '#2c3e50',

  // 카톡
  kakaoYellow: '#fee500',
  kakaoBrown: '#3c1e1e',
  kakaoBubble: '#ffffff',
  kakaoMyBubble: '#fef4c6',

  // 노트
  noteBg: '#fdf6e3',
  noteLine: '#e8dcc0',
  noteHole: '#d4c5a0',

  // 액센트
  red: '#dc2626',
  redSoft: '#fee2e2',
};

// 한글 안전한 폰트 스택
const FONT_SANS = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
// 손글씨 느낌 (시스템 대체)
const FONT_HAND = `'Nanum Pen Script', 'Nanum Myeongjo', 'Gamja Flower', 'Jua', cursive, ${FONT_SANS}`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT_SANS}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 선물 가이드</text>
</svg>`;

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─────────────────────────────────────────
// 01. 카톡 UI 말풍선 스타일
// ─────────────────────────────────────────
function kakaoBubbleStyle() {
  return wrap(`
  <!-- 카톡 배경 (하늘색 그라데이션) -->
  <defs>
    <linearGradient id="kakaoBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b2c7d9"/>
      <stop offset="100%" stop-color="#95adc2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#kakaoBg)"/>

  <!-- 상단 카톡 헤더 -->
  <rect x="0" y="0" width="1200" height="90" fill="${C.kakaoYellow}"/>
  <text x="600" y="55" text-anchor="middle" font-size="30" font-weight="900" fill="${C.kakaoBrown}">카톡 · 민지 💛</text>
  <text x="30" y="55" font-size="28" fill="${C.kakaoBrown}" font-weight="700">←</text>
  <circle cx="1120" cy="45" r="20" fill="${C.kakaoBrown}" opacity="0.1"/>
  <text x="1120" y="52" text-anchor="middle" font-size="20" fill="${C.kakaoBrown}" font-weight="700">⋮</text>

  <!-- 민지 아바타 + 첫 메시지 (왼쪽) -->
  <circle cx="80" cy="180" r="42" fill="${C.peach}"/>
  <text x="80" y="196" text-anchor="middle" font-size="40">👩</text>
  <text x="140" y="145" font-size="20" font-weight="700" fill="${C.kakaoBrown}">민지</text>
  <g transform="translate(140, 155)">
    <rect x="0" y="0" width="720" height="90" rx="24" fill="${C.kakaoBubble}"/>
    <text x="28" y="40" font-size="26" font-weight="600" fill="${C.text}">야 서연아 나 어떻게 해 😭</text>
    <text x="28" y="74" font-size="26" font-weight="600" fill="${C.text}">남친한테 선물 사야 하는데</text>
  </g>

  <!-- 민지 2번째 메시지 -->
  <g transform="translate(140, 260)">
    <rect x="0" y="0" width="800" height="90" rx="24" fill="${C.kakaoBubble}"/>
    <text x="28" y="40" font-size="26" font-weight="600" fill="${C.text}">남친이 ISTJ거든? 뭘 사야</text>
    <text x="28" y="74" font-size="26" font-weight="600" fill="${C.text}">좋아할지 진짜 모르겠어...</text>
  </g>

  <!-- 내(박서연) 답장 (오른쪽 노랑색) -->
  <g transform="translate(420, 380)">
    <rect x="0" y="0" width="680" height="90" rx="24" fill="${C.kakaoMyBubble}"/>
    <text x="28" y="40" font-size="26" font-weight="600" fill="${C.text}">오 ISTJ 여자 선물 진짜 쉬워</text>
    <text x="28" y="74" font-size="26" font-weight="600" fill="${C.text}">3원칙만 알면 돼 🎯</text>
  </g>

  <g transform="translate(620, 490)">
    <rect x="0" y="0" width="480" height="90" rx="24" fill="${C.kakaoMyBubble}"/>
    <text x="28" y="40" font-size="26" font-weight="600" fill="${C.text}">내가 지금 정리해서</text>
    <text x="28" y="74" font-size="26" font-weight="600" fill="${C.text}">보내줄게 ✨</text>
  </g>

  <!-- 민지 반응 -->
  <g transform="translate(140, 600)">
    <rect x="0" y="0" width="380" height="90" rx="24" fill="${C.kakaoBubble}"/>
    <text x="28" y="40" font-size="26" font-weight="600" fill="${C.text}">진짜?? 고마워 ㅠㅠ</text>
    <text x="28" y="74" font-size="26" font-weight="700" fill="${C.pinkDeep}">너 천잰가봐 💕</text>
  </g>

  <!-- 타이핑 중 표시 -->
  <g transform="translate(140, 710)">
    <rect x="0" y="0" width="180" height="66" rx="20" fill="${C.kakaoBubble}" opacity="0.95"/>
    <circle cx="45" cy="33" r="8" fill="${C.textMuted}"/>
    <circle cx="75" cy="33" r="8" fill="${C.textMuted}" opacity="0.7"/>
    <circle cx="105" cy="33" r="8" fill="${C.textMuted}" opacity="0.4"/>
    <text x="145" y="42" font-size="18" font-weight="600" fill="${C.textMuted}">서연 입력중...</text>
  </g>

  <!-- 하단 제목 띠 -->
  <rect x="0" y="820" width="1200" height="80" fill="${C.kakaoBrown}"/>
  <text x="600" y="870" text-anchor="middle" font-size="32" font-weight="900" fill="${C.kakaoYellow}">ISTJ 여자친구 선물 · 박서연 × 민지</text>
  `);
}

// ─────────────────────────────────────────
// 02. 노트 찢은 듯한 감성 (5원칙)
// ─────────────────────────────────────────
function noteStyle() {
  const rules = [
    { num: '01', text: '실용성 > 화려함', desc: 'ISTJ는 "쓸모"가 사랑의 증거' },
    { num: '02', text: '검증된 브랜드', desc: '오래된 신뢰가 이긴다' },
    { num: '03', text: '깜짝 이벤트 NO', desc: '예고된 사랑이 더 감동' },
    { num: '04', text: '이름/기념일 각인', desc: '기억을 물건에 새기기' },
    { num: '05', text: '10년 쓸 물건', desc: '소모보다 내구성' },
  ];

  return wrap(`
  <!-- 노트 배경 -->
  <rect width="1200" height="900" fill="${C.noteBg}"/>

  <!-- 스프링 바인더 구멍 -->
  ${[100, 220, 340, 460, 580, 700, 820].map(y => `
    <circle cx="90" cy="${y}" r="14" fill="${C.noteHole}"/>
    <circle cx="90" cy="${y}" r="9" fill="${C.noteBg}"/>
  `).join('')}
  <line x1="135" y1="60" x2="135" y2="850" stroke="${C.red}" stroke-width="2" opacity="0.5"/>

  <!-- 노트 줄 -->
  ${[130, 180, 230, 280, 330, 380, 430, 480, 530, 580, 630, 680, 730, 780].map(y => `
    <line x1="150" y1="${y}" x2="1150" y2="${y}" stroke="${C.noteLine}" stroke-width="1.5"/>
  `).join('')}

  <!-- 스카치테이프 (좌상단) -->
  <g transform="translate(180, 70) rotate(-5)" opacity="0.7">
    <rect x="0" y="0" width="200" height="42" fill="#ffffff" opacity="0.6"/>
    <rect x="0" y="0" width="200" height="42" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.5"/>
  </g>

  <!-- 제목 (손글씨 느낌) -->
  <g transform="translate(200, 115)">
    <text font-size="56" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">
      ISTJ 여친 선물 5원칙 ✎
    </text>
    <text y="40" font-size="26" font-weight="600" fill="${C.rosegold}" font-family="${FONT_HAND}">
      — 박서연이 실패 3번 끝에 얻은 공식
    </text>
  </g>

  <!-- 5가지 원칙 -->
  ${rules.map((r, i) => {
    const y = 230 + i * 110;
    return `
      <g transform="translate(175, ${y})">
        <!-- 체크박스 스타일 번호 -->
        <rect x="0" y="0" width="70" height="70" rx="14" fill="${C.pink}" stroke="${C.pinkDeep}" stroke-width="3"/>
        <text x="35" y="48" text-anchor="middle" font-size="32" font-weight="900" fill="${C.pinkDeep}">${r.num}</text>

        <!-- 본문 -->
        <text x="100" y="35" font-size="36" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${escapeXml(r.text)}</text>
        <text x="100" y="66" font-size="22" font-weight="600" fill="${C.textSoft}">${escapeXml(r.desc)}</text>
      </g>
    `;
  }).join('')}

  <!-- 하단 사인 -->
  <g transform="translate(850, 800) rotate(-3)">
    <text font-size="28" font-weight="700" fill="${C.rosegold}" font-family="${FONT_HAND}">
      - 박서연 💕
    </text>
  </g>
  `);
}

// ─────────────────────────────────────────
// 03. 감성 매거진 레이아웃 (TOP 10)
// ─────────────────────────────────────────
function magazineStyle() {
  const items = [
    { rank: '01', title: '이름 각인 실버 목걸이', cat: '주얼리', emoji: '💎', accent: '#f472b6' },
    { rank: '02', title: '조 말론 시그니처 향수', cat: '뷰티', emoji: '🌸', accent: '#c084fc' },
    { rank: '03', title: '스탠리 퀜처 텀블러', cat: '데일리', emoji: '🥤', accent: '#fb923c' },
    { rank: '04', title: '록시땅 핸드크림 세트', cat: '뷰티', emoji: '🧴', accent: '#a3e635' },
  ];

  return wrap(`
  <!-- 배경 그라디언트 -->
  <defs>
    <linearGradient id="magBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf2f8"/>
      <stop offset="100%" stop-color="#faf5ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#magBg)"/>

  <!-- 좌상단 대형 타이틀 -->
  <g transform="translate(60, 90)">
    <text font-size="24" font-weight="700" fill="${C.pinkDeep}" letter-spacing="6">ISTJ GIFT GUIDE · 2026</text>
    <text y="90" font-size="96" font-weight="900" fill="${C.text}">TOP 10</text>
    <text y="140" font-size="40" font-weight="800" fill="${C.textSoft}">여친 선물 · 절대 실패 없는 공식</text>
    <line x1="0" y1="170" x2="200" y2="170" stroke="${C.pinkDeep}" stroke-width="6"/>
  </g>

  <!-- 우상단 BEST 표시 -->
  <g transform="translate(970, 130)">
    <circle cx="80" cy="80" r="80" fill="${C.pinkDeep}"/>
    <circle cx="80" cy="80" r="68" fill="none" stroke="#ffffff" stroke-width="3"/>
    <text x="80" y="60" text-anchor="middle" font-size="20" font-weight="900" fill="#ffffff">EDITOR</text>
    <text x="80" y="90" text-anchor="middle" font-size="32" font-weight="900" fill="#ffffff">PICK</text>
    <text x="80" y="120" text-anchor="middle" font-size="18" font-weight="700" fill="#ffffff">★★★★★</text>
  </g>

  <!-- 제품 4개 (비대칭 그리드) -->
  ${items.map((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 560;
    const y = 330 + row * 270;
    const bigOffset = (i === 0 || i === 3) ? 20 : 0; // 1,4번이 큰 카드
    return `
      <g transform="translate(${x}, ${y})">
        <!-- 큰 이모지 배경 -->
        <rect x="0" y="0" width="520" height="240" rx="32" fill="${C.white}" stroke="${it.accent}" stroke-width="3"/>
        <rect x="0" y="0" width="520" height="60" rx="32 32 0 0" fill="${it.accent}"/>
        <text x="30" y="42" font-size="26" font-weight="900" fill="#ffffff">#${it.rank}</text>
        <text x="490" y="42" text-anchor="end" font-size="22" font-weight="700" fill="#ffffff">${escapeXml(it.cat)}</text>

        <!-- 제품 이모지 일러스트 -->
        <circle cx="130" cy="150" r="60" fill="${it.accent}" opacity="0.15"/>
        <text x="130" y="175" text-anchor="middle" font-size="80">${it.emoji}</text>

        <!-- 제품명 -->
        <text x="220" y="130" font-size="28" font-weight="900" fill="${C.text}">${escapeXml(it.title)}</text>
        <text x="220" y="165" font-size="20" font-weight="600" fill="${C.textMuted}">ISTJ 여자 호감도 ★★★★★</text>

        <!-- 하단 CTA -->
        <rect x="220" y="185" width="260" height="36" rx="18" fill="${it.accent}"/>
        <text x="350" y="209" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">자세히 보기 →</text>
      </g>
    `;
  }).join('')}
  `);
}

// ─────────────────────────────────────────
// 04. 제품 일러스트 카드 (향수병 감성)
// ─────────────────────────────────────────
function perfumeCardStyle() {
  return wrap(`
  <!-- 배경: 파스텔 그라데이션 + 빛 -->
  <defs>
    <radialGradient id="perfBg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#ffe5ec"/>
      <stop offset="100%" stop-color="${C.lavender}"/>
    </radialGradient>
    <linearGradient id="perfumeBottle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#fce7f3" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#perfBg)"/>

  <!-- 장식 꽃잎 (흩뿌림) -->
  ${[
    { x: 150, y: 180, s: 0.8, r: -15, c: '#fbcfe8' },
    { x: 1050, y: 150, s: 1.0, r: 20, c: '#ddd6fe' },
    { x: 200, y: 720, s: 0.9, r: 10, c: '#fecaca' },
    { x: 1000, y: 780, s: 0.7, r: -20, c: '#fed7aa' },
    { x: 950, y: 420, s: 0.6, r: 30, c: '#fbcfe8' },
  ].map(f => `
    <g transform="translate(${f.x}, ${f.y}) rotate(${f.r}) scale(${f.s})" opacity="0.7">
      <circle cx="0" cy="-25" r="22" fill="${f.c}"/>
      <circle cx="-22" cy="8" r="22" fill="${f.c}" opacity="0.9"/>
      <circle cx="22" cy="8" r="22" fill="${f.c}" opacity="0.9"/>
      <circle cx="-13" cy="25" r="22" fill="${f.c}" opacity="0.85"/>
      <circle cx="13" cy="25" r="22" fill="${f.c}" opacity="0.85"/>
      <circle cx="0" cy="0" r="10" fill="#fef3c7"/>
    </g>
  `).join('')}

  <!-- 중앙 향수병 일러스트 -->
  <g transform="translate(600, 450)">
    <!-- 향기 선 (위로 올라가는 웨이브) -->
    <g opacity="0.4" stroke="${C.rosegold}" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M -30 -230 Q -40 -260 -30 -290 Q -20 -320 -30 -350"/>
      <path d="M 0 -230 Q 10 -260 0 -290 Q -10 -320 0 -350"/>
      <path d="M 30 -230 Q 20 -260 30 -290 Q 40 -320 30 -350"/>
    </g>

    <!-- 뚜껑 -->
    <rect x="-35" y="-230" width="70" height="40" rx="6" fill="${C.navy}"/>
    <rect x="-40" y="-190" width="80" height="18" rx="4" fill="${C.rosegold}"/>

    <!-- 목 -->
    <rect x="-20" y="-172" width="40" height="35" fill="url(#perfumeBottle)" stroke="${C.rosegold}" stroke-width="2"/>

    <!-- 병 몸체 (둥근 사각) -->
    <path d="M -120 -137 L 120 -137 Q 140 -130 140 -100 L 140 140 Q 140 170 110 170 L -110 170 Q -140 170 -140 140 L -140 -100 Q -140 -130 -120 -137 Z" fill="url(#perfumeBottle)" stroke="${C.rosegold}" stroke-width="3"/>

    <!-- 라벨 -->
    <rect x="-80" y="-40" width="160" height="130" rx="8" fill="${C.white}" stroke="${C.rosegold}" stroke-width="1.5"/>
    <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rosegold}" letter-spacing="4">ISTJ</text>
    <line x1="-50" y1="8" x2="50" y2="8" stroke="${C.rosegold}" stroke-width="1"/>
    <text x="0" y="35" text-anchor="middle" font-size="22" font-weight="900" fill="${C.navy}">시그니처</text>
    <text x="0" y="60" text-anchor="middle" font-size="18" font-weight="700" fill="${C.textSoft}">SIGNATURE</text>
    <text x="0" y="85" text-anchor="middle" font-size="14" font-weight="600" fill="${C.rosegold}">EAU DE PARFUM</text>

    <!-- 액체 반사광 -->
    <ellipse cx="-90" cy="-80" rx="15" ry="80" fill="#ffffff" opacity="0.4"/>
  </g>

  <!-- 상단 카테고리 배지 -->
  <g transform="translate(600, 130)">
    <rect x="-140" y="-28" width="280" height="56" rx="28" fill="${C.rosegold}"/>
    <text x="0" y="10" text-anchor="middle" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="3">🌸 FRAGRANCE PICK</text>
  </g>

  <!-- 하단 제품 정보 -->
  <g transform="translate(600, 770)">
    <text x="0" y="0" text-anchor="middle" font-size="38" font-weight="900" fill="${C.text}">조 말론 시그니처 향수</text>
    <text x="0" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="${C.rosegold}">본인이 절대 안 사는, 그래서 가장 기억에 남는</text>
  </g>
  `);
}

// ─────────────────────────────────────────
// 렌더링
// ─────────────────────────────────────────

const items = [
  { name: 'sample-gift-01-kakao', svg: kakaoBubbleStyle() },
  { name: 'sample-gift-02-note', svg: noteStyle() },
  { name: 'sample-gift-03-magazine', svg: magazineStyle() },
  { name: 'sample-gift-04-perfume', svg: perfumeCardStyle() },
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
  console.log(`\n✅ 샘플 이미지 ${items.length}개 생성 완료 → ${OUT_DIR}`);
}

run();
