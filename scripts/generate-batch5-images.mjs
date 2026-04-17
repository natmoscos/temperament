// 5개 신규 블로그 글 이미지 일괄 생성
// 주제:
//   drink-*        MBTI 술버릇 완전분석
//   drive-*        MBTI 운전 스타일
//   crush-*        MBTI 짝사랑 고백 스타일
//   goyoonjung-*   고윤정 MBTI 완벽분석 (ISTP)
//   sonbinah-*     손빈아 MBTI 분석 (ISTJ)

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#faf8f5', white: '#ffffff',
  text: '#1a1a1a', textSoft: '#4b5563', textMuted: '#6b7280', textFaint: '#9ca3af',
  noteBg: '#fdf6e3', noteLine: '#e8dcc0',
  pink: '#ffe5ec', pinkDeep: '#ec4899', pinkSoft: '#fce7f3',
  rosegold: '#b76e79',
  lavender: '#e0bbe4', lavenderDeep: '#a855f7',
  peach: '#ffdab9', peachDeep: '#fb923c',
  honey: '#f5e6ca',
  mint: '#d1f2eb', mintDeep: '#10b981',
  sky: '#dbeafe', skyDeep: '#0284c7',
  navy: '#2c3e50', cream: '#fef9e7',
  red: '#dc2626', redSoft: '#fee2e2',
  amber: '#f59e0b', amberSoft: '#fef3c7',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const FONT_HAND = `'Nanum Pen Script', 'Gamja Flower', 'Jua', cursive, ${FONT}`;

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">${escapeXml(footer)}</text>
</svg>`;

// ─────────────────────────────────────────
// 공통 헬퍼
// ─────────────────────────────────────────

function heroGradient({ title, sub, badge, tag, color1, color2, accent, footer }) {
  return wrap(`
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#heroBg)"/>

  <g transform="translate(600, 160)">
    <rect x="-230" y="-38" width="460" height="76" rx="38" fill="${C.white}" opacity="0.75"/>
    <text x="0" y="14" text-anchor="middle" font-size="28" font-weight="900" fill="${accent}" letter-spacing="6">${escapeXml(badge)}</text>
  </g>

  <text x="600" y="380" text-anchor="middle" font-size="92" font-weight="900" fill="${C.navy}">${escapeXml(title[0] || '')}</text>
  <text x="600" y="490" text-anchor="middle" font-size="92" font-weight="900" fill="${accent}">${escapeXml(title[1] || '')}</text>

  <line x1="480" y1="540" x2="720" y2="540" stroke="${accent}" stroke-width="5"/>

  <text x="600" y="600" text-anchor="middle" font-size="36" font-weight="800" fill="${C.textSoft}">${escapeXml(sub)}</text>

  ${tag ? `
  <g transform="translate(600, 700)">
    <rect x="-300" y="0" width="600" height="70" rx="18" fill="${C.white}" opacity="0.85"/>
    <text x="0" y="45" text-anchor="middle" font-size="24" font-weight="700" fill="${C.text}">${escapeXml(tag)}</text>
  </g>
  ` : ''}

  <text x="600" y="820" text-anchor="middle" font-size="22" font-weight="700" fill="${accent}">by. 박서연 (ENFP)</text>
  `, footer);
}

function rankListStyle({ title, sub, items, color, footer }) {
  return wrap(`
  <rect x="0" y="0" width="1200" height="140" fill="${C.navy}"/>
  <text x="600" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="${C.pinkSoft}" letter-spacing="6">RANKING</text>
  <text x="600" y="115" text-anchor="middle" font-size="42" font-weight="900" fill="#ffffff">${escapeXml(title)}</text>

  ${items.map((item, i) => {
    const y = 180 + i * 115;
    return `
      <g transform="translate(60, ${y})">
        <rect x="0" y="0" width="1080" height="95" rx="18" fill="${C.white}" stroke="${color}" stroke-width="2"/>
        <rect x="0" y="0" width="110" height="95" rx="18 0 0 18" fill="${color}"/>
        <text x="55" y="62" text-anchor="middle" font-size="40" font-weight="900" fill="${C.white}">${i + 1}</text>

        <text x="140" y="40" font-size="30" font-weight="900" fill="${C.text}">${escapeXml(item.type)}</text>
        <text x="140" y="72" font-size="22" font-weight="600" fill="${C.textSoft}">${escapeXml(item.note)}</text>

        ${item.tag ? `
        <g transform="translate(920, 47)">
          <rect x="-65" y="-22" width="130" height="44" rx="22" fill="${color}" opacity="0.15"/>
          <text x="0" y="8" text-anchor="middle" font-size="18" font-weight="900" fill="${color}">${escapeXml(item.tag)}</text>
        </g>
        ` : ''}
      </g>
    `;
  }).join('')}
  `, footer);
}

function noteListStyle({ title, sub, rules, footer }) {
  return wrap(`
  <rect width="1200" height="900" fill="${C.noteBg}"/>

  ${[120, 270, 420, 570, 720].map(y => `
    <circle cx="90" cy="${y}" r="14" fill="#d4c5a0"/>
    <circle cx="90" cy="${y}" r="8" fill="${C.noteBg}"/>
  `).join('')}
  <line x1="135" y1="60" x2="135" y2="870" stroke="${C.red}" stroke-width="2" opacity="0.5"/>
  ${Array.from({ length: 20 }, (_, i) => 110 + i * 40).map(y => `
    <line x1="150" y1="${y}" x2="1150" y2="${y}" stroke="${C.noteLine}" stroke-width="1.5"/>
  `).join('')}

  <g transform="translate(800, 75) rotate(5)" opacity="0.6">
    <rect x="0" y="0" width="160" height="36" fill="#fbbf24" opacity="0.4"/>
  </g>

  <text x="175" y="130" font-size="58" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">
    ${escapeXml(title)}
  </text>
  <text x="175" y="168" font-size="26" font-weight="600" fill="${C.rosegold}" font-family="${FONT_HAND}">
    ${escapeXml(sub)}
  </text>

  ${rules.map((r, i) => {
    const y = 225 + i * 125;
    return `
      <g transform="translate(175, ${y})">
        <rect x="0" y="0" width="75" height="75" rx="16" fill="${C.pinkDeep}"/>
        <text x="37" y="52" text-anchor="middle" font-size="32" font-weight="900" fill="#ffffff">${String(i + 1).padStart(2, '0')}</text>

        <text x="105" y="42" font-size="40" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${escapeXml(r.headline)}</text>
        <text x="105" y="72" font-size="22" font-weight="600" fill="${C.textSoft}">${escapeXml(r.desc)}</text>
      </g>
    `;
  }).join('')}

  <g transform="translate(850, 850) rotate(-3)">
    <text font-size="26" font-weight="700" fill="${C.rosegold}" font-family="${FONT_HAND}">
      - 박서연 💕
    </text>
  </g>
  `, footer);
}

function matrixStyle({ title, sub, items, color, footer }) {
  return wrap(`
  <rect x="0" y="0" width="1200" height="140" fill="${color}"/>
  <text x="600" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="${C.white}" opacity="0.85" letter-spacing="6">MATRIX</text>
  <text x="600" y="115" text-anchor="middle" font-size="40" font-weight="900" fill="${C.white}">${escapeXml(title)}</text>

  ${items.map((item, i) => {
    const y = 175 + i * 135;
    return `
      <g transform="translate(60, ${y})">
        <rect x="0" y="0" width="1080" height="115" rx="20" fill="${C.white}" stroke="#e5e7eb" stroke-width="2"/>
        <rect x="0" y="0" width="12" height="115" rx="6 0 0 6" fill="${color}"/>

        <text x="40" y="62" font-size="52">${item.icon}</text>

        <text x="125" y="48" font-size="30" font-weight="900" fill="${C.text}">${escapeXml(item.label)}</text>
        <text x="125" y="82" font-size="22" font-weight="600" fill="${C.textSoft}">${escapeXml(item.desc)}</text>
      </g>
    `;
  }).join('')}
  `, footer);
}

function quoteOutro({ mainLine1, mainLine2, mainLine3, sub, color1, color2, accent, footer }) {
  return wrap(`
  <defs>
    <linearGradient id="outroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#outroBg)"/>

  <text x="600" y="220" text-anchor="middle" font-size="28" font-weight="700" fill="${accent}" letter-spacing="6">ONE LINE</text>

  <text x="100" y="320" font-size="180" font-weight="900" fill="${accent}" opacity="0.5">&quot;</text>

  <text x="600" y="440" text-anchor="middle" font-size="62" font-weight="900" fill="#ffffff">${escapeXml(mainLine1)}</text>
  <text x="600" y="525" text-anchor="middle" font-size="62" font-weight="900" fill="${accent}">${escapeXml(mainLine2)}</text>
  <text x="600" y="610" text-anchor="middle" font-size="62" font-weight="900" fill="#ffffff">${escapeXml(mainLine3)}</text>

  <text x="1100" y="680" text-anchor="end" font-size="180" font-weight="900" fill="${accent}" opacity="0.5">&quot;</text>

  <line x1="400" y1="760" x2="800" y2="760" stroke="${accent}" stroke-width="2"/>
  <text x="600" y="810" text-anchor="middle" font-size="26" font-weight="700" fill="${accent}">
    ${escapeXml(sub)}
  </text>
  <text x="600" y="850" text-anchor="middle" font-size="20" font-weight="600" fill="${accent}" opacity="0.85">
    192types.co.kr · 100문항 정밀 검사 (무료)
  </text>
  `, footer);
}

function avoidStyle({ title, sub, items, footer }) {
  return wrap(`
  <rect width="1200" height="900" fill="${C.bg}"/>
  <rect x="0" y="0" width="1200" height="150" fill="${C.redSoft}"/>
  <text x="600" y="70" text-anchor="middle" font-size="40" font-weight="900" fill="${C.red}">${escapeXml(title)}</text>
  <text x="600" y="115" text-anchor="middle" font-size="24" font-weight="700" fill="${C.textSoft}">${escapeXml(sub)}</text>

  ${items.map((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 60 : 620;
    const y = 200 + row * 180;
    const isLast = i === 4 && items.length === 5;
    const finalX = isLast ? 340 : x;
    const finalY = isLast ? 560 : y;
    return `
      <g transform="translate(${finalX}, ${finalY})">
        <rect x="0" y="0" width="520" height="160" rx="20" fill="${C.white}" stroke="${C.red}" stroke-width="3"/>
        <g transform="translate(50, 80)">
          <circle cx="0" cy="0" r="38" fill="${C.red}"/>
          <text x="0" y="15" text-anchor="middle" font-size="44" font-weight="900" fill="#ffffff">✕</text>
        </g>
        <text x="110" y="48" font-size="20" font-weight="800" fill="${C.red}" opacity="0.6">NO. ${String(i + 1).padStart(2, '0')}</text>
        <text x="110" y="88" font-size="28" font-weight="900" fill="${C.text}">${escapeXml(item.title)}</text>
        <text x="110" y="125" font-size="21" font-weight="600" fill="${C.textSoft}">${escapeXml(item.desc)}</text>
      </g>
    `;
  }).join('')}
  `, footer);
}

function celebTimelineStyle({ title, events, color, accent, footer }) {
  return wrap(`
  <rect x="0" y="0" width="1200" height="140" fill="${color}"/>
  <text x="600" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="${C.white}" opacity="0.85" letter-spacing="6">TIMELINE</text>
  <text x="600" y="115" text-anchor="middle" font-size="42" font-weight="900" fill="#ffffff">${escapeXml(title)}</text>

  <line x1="160" y1="240" x2="160" y2="820" stroke="${color}" stroke-width="4"/>

  ${events.map((e, i) => {
    const y = 240 + i * 115;
    return `
      <g transform="translate(0, ${y})">
        <circle cx="160" cy="0" r="22" fill="${color}"/>
        <circle cx="160" cy="0" r="12" fill="${C.white}"/>

        <rect x="220" y="-40" width="920" height="85" rx="16" fill="${C.white}" stroke="${color}" stroke-width="2"/>
        <text x="245" y="-5" font-size="28" font-weight="900" fill="${color}">${escapeXml(e.year)}</text>
        <text x="340" y="-5" font-size="24" font-weight="800" fill="${C.text}">${escapeXml(e.title)}</text>
        <text x="245" y="28" font-size="20" font-weight="600" fill="${C.textSoft}">${escapeXml(e.desc)}</text>
      </g>
    `;
  }).join('')}
  `, footer);
}

function bigBadgeStyle({ title, label, number, desc, color1, color2, accent, footer }) {
  return wrap(`
  <defs>
    <linearGradient id="bbBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bbBg)"/>

  <text x="600" y="120" text-anchor="middle" font-size="28" font-weight="700" fill="${accent}" letter-spacing="6">${escapeXml(label)}</text>

  <g transform="translate(600, 460)">
    <circle cx="0" cy="0" r="260" fill="${C.white}" opacity="0.95"/>
    <circle cx="0" cy="0" r="240" fill="none" stroke="${accent}" stroke-width="6"/>
    <text x="0" y="-60" text-anchor="middle" font-size="38" font-weight="800" fill="${C.textMuted}">${escapeXml(title)}</text>
    <text x="0" y="60" text-anchor="middle" font-size="200" font-weight="900" fill="${accent}">${escapeXml(number)}</text>
    <text x="0" y="130" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textMuted}">${escapeXml(desc)}</text>
  </g>

  <text x="600" y="800" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">
    by. 192types · 박서연
  </text>
  `, footer);
}

// ─────────────────────────────────────────
// 글 1. MBTI 술버릇 완전분석
// ─────────────────────────────────────────

function drinkHero() {
  return heroGradient({
    title: ['MBTI 술버릇', '완전분석'],
    sub: '16유형이 취하면 드러나는 진짜 민낯',
    badge: 'DRINKING STYLE',
    tag: '즉답형 · 고백형 · 통곡형 · 잠수형 4대 DNA',
    color1: '#fef3c7', color2: '#fde68a', accent: '#b45309',
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkRanking() {
  return rankListStyle({
    title: '16유형 취중진담 랭킹',
    items: [
      { type: 'ENFP', note: '3잔부터 모두한테 사랑 고백', tag: '고백형' },
      { type: 'ESFP', note: '테이블 위에서 댄스 타임', tag: '댄스형' },
      { type: 'ENFJ', note: '친구 인생 상담 1시간', tag: '상담형' },
      { type: 'INFP', note: '조용히 눈물 흘리며 감상적', tag: '감성형' },
      { type: 'INTJ', note: '평소 안 하던 진지한 철학', tag: '각성형' },
      { type: 'ISTJ', note: '똑같이 멀쩡, 집에 걸어감', tag: '무변화형' },
    ],
    color: '#b45309',
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkMatrix() {
  return matrixStyle({
    title: '4가지 취중 DNA 모드',
    items: [
      { icon: '💖', label: '고백형 — ENFP · ESFP · ENFJ · ESFJ', desc: '사랑·감사 쏟아냄 · 다음날 이불킥' },
      { icon: '😭', label: '통곡형 — INFP · INFJ · ISFP · ISFJ', desc: '과거 꺼내며 감정 폭발' },
      { icon: '🎤', label: '각성형 — INTJ · INTP · ENTJ · ENTP', desc: '평소보다 말 많아짐, 논쟁 돌입' },
      { icon: '🤐', label: '무변화형 — ISTJ · ISTP · ESTJ · ESTP', desc: '똑같이 멀쩡, 본인은 모름' },
    ],
    color: '#b45309',
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkRules() {
  return noteListStyle({
    title: '안전한 술자리 5원칙 ✎',
    sub: '— 박서연이 모든 유형 친구들에게 하는 조언',
    rules: [
      { headline: '고백형 → 핸드폰 회수', desc: '다음날 이불킥 방지' },
      { headline: '통곡형 → 감정 경청', desc: '멈추려 하지 말 것' },
      { headline: '각성형 → 논쟁 피하기', desc: '답 없는 논쟁 발동' },
      { headline: '무변화형 → 양 조절', desc: '본인이 취한지 모름' },
      { headline: '누구든 물 → 한 잔씩', desc: '다음날 살릴 수 있음' },
    ],
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkAvoid() {
  return avoidStyle({
    title: '⛔ 술자리 절대 피해야 할 5가지',
    sub: 'MBTI 불문 — 관계 박살나는 행동 TOP 5',
    items: [
      { title: '전 연인 이야기', desc: 'INFP·ENFP 눈물 버튼' },
      { title: '정치·종교 논쟁', desc: 'NT형 각성 모드 돌입' },
      { title: '과거 상처 들추기', desc: 'NF형 통곡 모드 발동' },
      { title: '반강요 술 권하기', desc: 'ISTP·INTP 즉시 퇴장' },
      { title: '사진 몰래 찍기', desc: '모든 유형 도어슬램' },
    ],
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkRitual() {
  return matrixStyle({
    title: '기질별 숙취 극복 공식',
    items: [
      { icon: '🌟', label: '다혈질 — ENFP · ESFP · ESFJ · ENFJ', desc: '수분 + 친구 전화로 감정 정리' },
      { icon: '⚡', label: '담즙질 — ENTJ · ESTJ · ENTP · ESTP', desc: '운동 + 일 복귀로 리셋' },
      { icon: '🌾', label: '점액질 — ISFJ · ISTJ · INFP · ISFP', desc: '이불 속 하루 완전 격리' },
      { icon: '🌙', label: '우울질 — INTJ · INFJ · INTP · ISTP', desc: '혼자 조용히 독서·영화' },
    ],
    color: '#b45309',
    footer: '192types.co.kr · 술버릇 리포트',
  });
}
function drinkOutro() {
  return quoteOutro({
    mainLine1: '술은 본성의 확대경',
    mainLine2: '네 유형의 뿌리가',
    mainLine3: '가장 선명해지는 순간',
    sub: '내 진짜 유형 알아보기 — 100문항 무료 검사',
    color1: '#b45309', color2: '#fbbf24', accent: '#fef3c7',
    footer: '192types.co.kr · 술버릇 리포트',
  });
}

// ─────────────────────────────────────────
// 글 2. MBTI 운전 스타일
// ─────────────────────────────────────────

function driveHero() {
  return heroGradient({
    title: ['MBTI 운전 스타일', ''],
    sub: '도로에서 드러나는 16유형 진짜 성격',
    badge: 'DRIVING STYLE',
    tag: '신중형 · 질주형 · 양보형 · 초보형 4대 DNA',
    color1: '#dbeafe', color2: '#bfdbfe', accent: '#0284c7',
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveRanking() {
  return rankListStyle({
    title: '16유형 운전 유형 랭킹',
    items: [
      { type: 'ISTJ', note: '안전거리 정확 · 규정 100% 준수', tag: '모범운전' },
      { type: 'ESTJ', note: '빠르지만 정확 · 길 안내 정통', tag: '베테랑' },
      { type: 'INTJ', note: '합리적 코스 선택 · 감정 배제', tag: '전략가' },
      { type: 'ESTP', note: '급가속·급차선 · 스릴 추구', tag: '질주파' },
      { type: 'ENFP', note: '대화하다 길 놓침 · 다시 하기', tag: '수다파' },
      { type: 'INFP', note: '초보 때 멈춤 · 평생 조심', tag: '초보형' },
    ],
    color: '#0284c7',
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveMatrix() {
  return matrixStyle({
    title: '4가지 운전 DNA 모드',
    items: [
      { icon: '🛡', label: '신중형 — ISTJ · ISFJ · INFP · ISFP', desc: '안전거리 최우선 · 방어운전' },
      { icon: '🚀', label: '질주형 — ESTP · ENTP · ESTJ · ENTJ', desc: '빠른 차선 변경 · 추월 즐김' },
      { icon: '🤝', label: '양보형 — ENFJ · ESFJ · INFJ · ENFP', desc: '깜빡이 양보 · 경적 절대 X' },
      { icon: '🌱', label: '초보형 — INTP · ISTP · INTJ · ESFP', desc: '운전 자체 선호 안 함' },
    ],
    color: '#0284c7',
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveRules() {
  return noteListStyle({
    title: '기질별 운전 꿀팁 5가지 ✎',
    sub: '— 박서연이 친구들 운전 관찰 후 정리',
    rules: [
      { headline: '신중형 → 속도 올리기', desc: '너무 느려서 오히려 위험' },
      { headline: '질주형 → 10km 줄이기', desc: '자기 확신이 사고 부름' },
      { headline: '양보형 → 본인 차선 지키기', desc: '과한 양보가 혼란 유발' },
      { headline: '초보형 → 연습 3배', desc: '경험치만 쌓으면 해결' },
      { headline: '누구든 네비 → 미리 세팅', desc: '주행 중 조작 금지' },
    ],
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveAvoid() {
  return avoidStyle({
    title: '⛔ 운전 중 절대 피해야 할 5가지',
    sub: '유형 불문 · 사고 유발 습관 TOP 5',
    items: [
      { title: '핸드폰 보기', desc: '1초 = 27m (50km/h)' },
      { title: '급가속·급제동', desc: '연비·안전 모두 파괴' },
      { title: '경적 남발', desc: '보복 운전 유발' },
      { title: '차간 거리 무시', desc: '추돌 사고 1순위' },
      { title: '졸음운전', desc: '음주보다 위험' },
    ],
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveRitual() {
  return matrixStyle({
    title: '유형별 장거리 운전 필수템',
    items: [
      { icon: '☕', label: 'NT — 커피 · 오디오북', desc: '정신 각성 + 지식 충전 동시' },
      { icon: '🎵', label: 'NF — 감성 플레이리스트', desc: '기분 유지가 운전의 반' },
      { icon: '🥤', label: 'SJ — 보온 텀블러 · 손수건', desc: '루틴 안정성 최고' },
      { icon: '🍫', label: 'SP — 간식 · 짧은 휴게소', desc: '지루함이 최대 적' },
    ],
    color: '#0284c7',
    footer: '192types.co.kr · 운전 리포트',
  });
}
function driveOutro() {
  return quoteOutro({
    mainLine1: '도로 위에서는',
    mainLine2: '가면이 벗겨진다',
    mainLine3: '네 핸들이 네 성격',
    sub: '내 진짜 유형 알아보기 — 100문항 무료 검사',
    color1: '#0284c7', color2: '#38bdf8', accent: '#dbeafe',
    footer: '192types.co.kr · 운전 리포트',
  });
}

// ─────────────────────────────────────────
// 글 3. MBTI 짝사랑 고백 스타일
// ─────────────────────────────────────────

function crushHero() {
  return heroGradient({
    title: ['MBTI 짝사랑', '고백 스타일'],
    sub: '16유형이 "좋아해"를 말하는 방식',
    badge: 'CRUSH · CONFESSION',
    tag: '직진형 · 돌려말형 · 행동형 · 잠수형 4대 DNA',
    color1: '#ffe5ec', color2: '#fce7f3', accent: '#ec4899',
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushRanking() {
  return rankListStyle({
    title: '16유형 고백 스타일 랭킹',
    items: [
      { type: 'ENTJ', note: '만난지 2주 "우리 사귀자"', tag: '직진형' },
      { type: 'ESTP', note: '즉흥 이벤트 + 큰 고백', tag: '이벤트형' },
      { type: 'ENFP', note: '감정 폭발 편지 + 꽃', tag: '폭발형' },
      { type: 'INFJ', note: '1년 관찰 후 편지로', tag: '편지형' },
      { type: 'INTJ', note: '3개월 분석 후 합리 제안', tag: '논리형' },
      { type: 'INFP', note: '평생 짝사랑 · 고백 못함', tag: '짝사랑형' },
    ],
    color: '#ec4899',
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushMatrix() {
  return matrixStyle({
    title: '4가지 고백 DNA 모드',
    items: [
      { icon: '🏹', label: '직진형 — ENTJ · ESTP · ESTJ · ENTP', desc: '의심 없이 빠르게 제안' },
      { icon: '🌸', label: '편지형 — INFJ · INFP · ENFJ · ENFP', desc: '글로 마음 정리 후 전달' },
      { icon: '🎁', label: '행동형 — ISTP · ISFP · ESFP · ISTJ', desc: '말보다 행동으로 먼저' },
      { icon: '🌙', label: '잠수형 — INTJ · INTP · ISFJ · ESFJ', desc: '간접 신호만 · 직접 고백 회피' },
    ],
    color: '#ec4899',
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushRules() {
  return noteListStyle({
    title: '짝사랑 고백 타이밍 5원칙 ✎',
    sub: '— 박서연의 고백 통계 관찰기',
    rules: [
      { headline: '3개월 넘으면 NO', desc: '더 오래 짝사랑 = 관계 고착' },
      { headline: '밤 고백 금지', desc: '분위기에 휩쓸린 후회 고백' },
      { headline: '술 취해서 NO', desc: '진심 의심 받음' },
      { headline: '단체톡으로 NO', desc: '1:1 대화가 기본' },
      { headline: '친구 통해서 NO', desc: '초등학생 스타일' },
    ],
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushAvoid() {
  return avoidStyle({
    title: '⛔ 고백 실패하는 5가지 실수',
    sub: '성공률 높이는 반대 공식',
    items: [
      { title: '과한 이벤트', desc: '상대 부담 = 거절 확률 ↑' },
      { title: '대중 앞 고백', desc: '거절해도 착한 척 의무 발생' },
      { title: '일기처럼 긴 글', desc: '3줄 이내 진심이 이김' },
      { title: '"언제부터" 질문', desc: '대답 강요는 부담' },
      { title: '답 재촉', desc: '24시간 이상 여유 주기' },
    ],
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushRitual() {
  return matrixStyle({
    title: '유형별 고백 성공 공식',
    items: [
      { icon: '💌', label: 'NT — 논리 + 미래 공유', desc: '"우리 관계의 가치" 제안' },
      { icon: '🌹', label: 'NF — 감정 + 깊이 공유', desc: '"내가 느낀 진심" 전달' },
      { icon: '📖', label: 'SJ — 시간 + 신뢰 누적', desc: '"오래 봐온 너" 강조' },
      { icon: '🎭', label: 'SP — 경험 + 함께한 순간', desc: '"지금 이 순간" 포착' },
    ],
    color: '#ec4899',
    footer: '192types.co.kr · 고백 리포트',
  });
}
function crushOutro() {
  return quoteOutro({
    mainLine1: '고백은 타이밍이 아니라',
    mainLine2: '용기의 문제야',
    mainLine3: '네 유형이 네 언어',
    sub: '내 진짜 유형 알아보기 — 100문항 무료 검사',
    color1: '#be185d', color2: '#ec4899', accent: '#fce7f3',
    footer: '192types.co.kr · 고백 리포트',
  });
}

// ─────────────────────────────────────────
// 글 4. 고윤정 MBTI (ISTP)
// ─────────────────────────────────────────

function goHero() {
  return heroGradient({
    title: ['고윤정 MBTI', '완벽분석'],
    sub: 'ISTP — "미지근한 도라미"의 진짜 매력',
    badge: 'CELEBRITY · ISTP',
    tag: '본인 인증 MBTI · 인터뷰·행동 기반 심층 분석',
    color1: '#fef3c7', color2: '#fce7f3', accent: '#9333ea',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goBadge() {
  return bigBadgeStyle({
    title: '고윤정의 MBTI',
    label: 'CONFIRMED BY HERSELF',
    number: 'ISTP',
    desc: '"뒤끝 없고 의리 있는" · 본인 인증',
    color1: '#a855f7', color2: '#ec4899', accent: '#fef3c7',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goTimeline() {
  return celebTimelineStyle({
    title: '고윤정 필모그래피 · ISTP 흔적',
    events: [
      { year: '2019', title: '데뷔 · 모델', desc: '조용한 등장, 기본기 중심' },
      { year: '2022', title: '스물다섯 스물하나', desc: '차분한 절제의 연기력 입증' },
      { year: '2023', title: '무빙 · 장희수 役', desc: '강함과 섬세함의 공존 (Ti+Se)' },
      { year: '2024', title: '선재 업고 튀어 · 김태하', desc: '미지근한 매력의 정수' },
      { year: '2025', title: '이번 생도 잘 부탁해', desc: '존재감 100% 주연 안착' },
    ],
    color: '#9333ea',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goFunctions() {
  return matrixStyle({
    title: '고윤정의 ISTP 인지기능 DNA',
    items: [
      { icon: '🧠', label: 'Ti 주기능 — 내적 논리', desc: '"생각 많지 않다" = 깊게 핵심만' },
      { icon: '👁', label: 'Se 보조 — 현장 감각', desc: '연기 시 즉각 반응 · 장면 몰입' },
      { icon: '🔮', label: 'Ni 3차 — 깊은 통찰', desc: '캐릭터 본질 꿰뚫는 시선' },
      { icon: '💝', label: 'Fe 열등 — 감정 표현 X', desc: '"미지근한 성격" = 담담한 사랑' },
    ],
    color: '#9333ea',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goTraits() {
  return noteListStyle({
    title: '고윤정 × ISTP 증거 5가지 ✎',
    sub: '— 본인 발언·동료 증언·행동 패턴 분석',
    rules: [
      { headline: '"생각 많지 않다"', desc: 'Ti의 "불필요한 것 제거" 특징' },
      { headline: '"뒤끝 없다·의리"', desc: 'ISTP의 Fi 3차 원칙 중심' },
      { headline: '"돌려 말 못 한다"', desc: '직설 화법 = Ti 주기능 전형' },
      { headline: '털털 · 장난 잘 침', desc: 'Se가 주는 현장 편안함' },
      { headline: '감정 기복 적음', desc: 'Fe 열등 → 안정된 내면' },
    ],
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goCharms() {
  return matrixStyle({
    title: 'ISTP 고윤정 매력 포인트 4',
    items: [
      { icon: '🎯', label: '차갑지 않은 절제', desc: 'Ti 절제 + Se 따뜻함의 균형' },
      { icon: '🌊', label: '깊은 물처럼 잔잔', desc: '감정 파동 적지만 본질은 깊음' },
      { icon: '🔥', label: '순간 폭발 연기력', desc: 'Se 현장 본능이 주는 몰입' },
      { icon: '💎', label: '자기 중심 단단', desc: 'Fi 3차 + Ti가 만드는 코어' },
    ],
    color: '#9333ea',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function goOutro() {
  return quoteOutro({
    mainLine1: '고윤정은',
    mainLine2: '미지근해서 뜨거운',
    mainLine3: 'ISTP 그 자체',
    sub: '내 MBTI 궁금하면 — 100문항 무료 검사',
    color1: '#7e22ce', color2: '#ec4899', accent: '#fef3c7',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}

// ─────────────────────────────────────────
// 글 5. 손빈아 MBTI (ISTJ 추정)
// ─────────────────────────────────────────

function sbHero() {
  return heroGradient({
    title: ['손빈아 MBTI', '분석'],
    sub: 'ISTJ 추정 — 공학도에서 트로트 1위까지',
    badge: 'CELEBRITY · ISTJ',
    tag: '공개 인터뷰·경력 기반 심층 분석',
    color1: '#d1fae5', color2: '#ecfdf5', accent: '#047857',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbBadge() {
  return bigBadgeStyle({
    title: '손빈아의 추정 MBTI',
    label: 'ANALYZED BY 192TYPES',
    number: 'ISTJ',
    desc: '공학도 + 백두대간 완주 + 준결승 1위',
    color1: '#047857', color2: '#10b981', accent: '#d1fae5',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbTimeline() {
  return celebTimelineStyle({
    title: '손빈아 타임라인 · ISTJ 증거',
    events: [
      { year: '2011', title: '창원기계공고 졸업', desc: '공학도 출발 · Si 검증 성향' },
      { year: '2016', title: '연암공대 기계설계 졸업', desc: '체계적 전공 완주 · Te 실행' },
      { year: '2018', title: '1집 앨범 데뷔', desc: '공학 → 트로트 전환 · 5년 준비' },
      { year: '2023', title: '백두대간 완주 1호 가수', desc: '단계적 도전 완수 · 담즙질 지구력' },
      { year: '2025', title: '미스터트롯3 준결승 1위', desc: '매 라운드 발전 · Si의 누적 힘' },
    ],
    color: '#047857',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbFunctions() {
  return matrixStyle({
    title: '손빈아의 ISTJ 인지기능 DNA',
    items: [
      { icon: '📚', label: 'Si 주기능 — 검증의 축적', desc: '공학도 출신 + 백두대간 단계 완주' },
      { icon: '⚙', label: 'Te 보조 — 체계적 실행', desc: '트로트 전향 후 5년 준비 · 커리어 설계' },
      { icon: '💚', label: 'Fi 3차 — 내면 가치', desc: '"엄마·가족" 중심 + 하동 애향심' },
      { icon: '✨', label: 'Ne 열등 — 보수적 변화', desc: '전향은 드물지만 한번 하면 끝까지' },
    ],
    color: '#047857',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbEvidence() {
  return noteListStyle({
    title: '손빈아 × ISTJ 증거 5가지 ✎',
    sub: '— 공개 활동·경력·인터뷰 패턴 분석',
    rules: [
      { headline: '공학도 → 트로트', desc: 'Si의 "신중한 대전환" 사례' },
      { headline: '백두대간 완주', desc: '단계별 체계 + 인내 = SJ 전형' },
      { headline: '준결승 1위 누적', desc: '매 라운드 발전 = Si 누적력' },
      { headline: '하동 홍보대사', desc: 'Si는 뿌리 있는 곳과 오래 감' },
      { headline: '가족 중심 발언', desc: 'Fi 3차 + Si의 신뢰 코어' },
    ],
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbCharms() {
  return matrixStyle({
    title: 'ISTJ 손빈아 매력 포인트 4',
    items: [
      { icon: '🏔', label: '집념의 누적', desc: '한 번 시작하면 끝까지 가는 힘' },
      { icon: '🎼', label: '진정성 보이스', desc: 'Fi가 실리는 담담한 트로트 감성' },
      { icon: '⚡', label: '체계적 성장', desc: '매 무대마다 한 단계 업그레이드' },
      { icon: '🌳', label: '뿌리 있는 사람', desc: '고향·가족·초심 흔들림 없음' },
    ],
    color: '#047857',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}
function sbOutro() {
  return quoteOutro({
    mainLine1: '손빈아는',
    mainLine2: '조용한 집념이',
    mainLine3: '무대를 만드는 사람',
    sub: '내 MBTI 궁금하면 — 100문항 무료 검사',
    color1: '#065f46', color2: '#10b981', accent: '#d1fae5',
    footer: '192types.co.kr · 셀럽 MBTI',
  });
}

// ─────────────────────────────────────────
// 렌더링
// ─────────────────────────────────────────

const items = [
  // 글 1: 술버릇
  { name: 'drink-01-hero', svg: drinkHero() },
  { name: 'drink-02-ranking', svg: drinkRanking() },
  { name: 'drink-03-matrix', svg: drinkMatrix() },
  { name: 'drink-04-rules', svg: drinkRules() },
  { name: 'drink-05-avoid', svg: drinkAvoid() },
  { name: 'drink-06-ritual', svg: drinkRitual() },
  { name: 'drink-07-outro', svg: drinkOutro() },

  // 글 2: 운전
  { name: 'drive-01-hero', svg: driveHero() },
  { name: 'drive-02-ranking', svg: driveRanking() },
  { name: 'drive-03-matrix', svg: driveMatrix() },
  { name: 'drive-04-rules', svg: driveRules() },
  { name: 'drive-05-avoid', svg: driveAvoid() },
  { name: 'drive-06-ritual', svg: driveRitual() },
  { name: 'drive-07-outro', svg: driveOutro() },

  // 글 3: 짝사랑
  { name: 'crush-01-hero', svg: crushHero() },
  { name: 'crush-02-ranking', svg: crushRanking() },
  { name: 'crush-03-matrix', svg: crushMatrix() },
  { name: 'crush-04-rules', svg: crushRules() },
  { name: 'crush-05-avoid', svg: crushAvoid() },
  { name: 'crush-06-ritual', svg: crushRitual() },
  { name: 'crush-07-outro', svg: crushOutro() },

  // 글 4: 고윤정
  { name: 'goyoonjung-01-hero', svg: goHero() },
  { name: 'goyoonjung-02-badge', svg: goBadge() },
  { name: 'goyoonjung-03-timeline', svg: goTimeline() },
  { name: 'goyoonjung-04-functions', svg: goFunctions() },
  { name: 'goyoonjung-05-traits', svg: goTraits() },
  { name: 'goyoonjung-06-charms', svg: goCharms() },
  { name: 'goyoonjung-07-outro', svg: goOutro() },

  // 글 5: 손빈아
  { name: 'sonbinah-01-hero', svg: sbHero() },
  { name: 'sonbinah-02-badge', svg: sbBadge() },
  { name: 'sonbinah-03-timeline', svg: sbTimeline() },
  { name: 'sonbinah-04-functions', svg: sbFunctions() },
  { name: 'sonbinah-05-evidence', svg: sbEvidence() },
  { name: 'sonbinah-06-charms', svg: sbCharms() },
  { name: 'sonbinah-07-outro', svg: sbOutro() },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  let totalKb = 0;
  for (const it of items) {
    const svgPath = `${OUT_DIR}/${it.name}.svg`;
    const webpPath = `${OUT_DIR}/${it.name}.webp`;
    fs.writeFileSync(svgPath, it.svg, 'utf-8');
    await sharp(Buffer.from(it.svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(webpPath);
    const webpKB = fs.statSync(webpPath).size / 1024;
    totalKb += webpKB;
    console.log(`✓ ${it.name}  webp=${webpKB.toFixed(1)}KB`);
  }
  console.log(`\n✅ 총 ${items.length}개 이미지 생성 — ${totalKb.toFixed(0)}KB`);
}

run();
