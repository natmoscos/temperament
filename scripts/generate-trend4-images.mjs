// 구글 트렌드 상위 검색어 기반 4개 글 이미지
//   free-*        MBTI 무료 검사 비교 (+150% 급상승)
//   types-*       MBTI 검사 종류 완전정리 (1위 키워드)
//   accuracy-*    MBTI 테스트 정확도 과학
//   traits-*      MBTI 특징 한눈 정리 (+10%)

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#faf8f5', white: '#ffffff',
  text: '#1a1a1a', textSoft: '#4b5563', textMuted: '#6b7280', textFaint: '#9ca3af',
  noteBg: '#fdf6e3', noteLine: '#e8dcc0',
  pink: '#ffe5ec', pinkDeep: '#ec4899', pinkSoft: '#fce7f3',
  rosegold: '#b76e79',
  lavender: '#e0bbe4',
  navy: '#2c3e50',
  red: '#dc2626', redSoft: '#fee2e2',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const FONT_HAND = `'Nanum Pen Script', 'Gamja Flower', 'Jua', cursive, ${FONT}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">${esc(footer)}</text>
</svg>`;

// 공통 — hero
function hero({ line1, line2, sub, badge, tag, color1, color2, accent, footer }) {
  return wrap(`
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hg)"/>
  <g transform="translate(600, 160)">
    <rect x="-240" y="-38" width="480" height="76" rx="38" fill="${C.white}" opacity="0.75"/>
    <text x="0" y="14" text-anchor="middle" font-size="28" font-weight="900" fill="${accent}" letter-spacing="6">${esc(badge)}</text>
  </g>
  <text x="600" y="380" text-anchor="middle" font-size="86" font-weight="900" fill="${C.navy}">${esc(line1)}</text>
  <text x="600" y="480" text-anchor="middle" font-size="86" font-weight="900" fill="${accent}">${esc(line2)}</text>
  <line x1="480" y1="530" x2="720" y2="530" stroke="${accent}" stroke-width="5"/>
  <text x="600" y="590" text-anchor="middle" font-size="34" font-weight="800" fill="${C.textSoft}">${esc(sub)}</text>
  ${tag ? `
  <g transform="translate(600, 680)">
    <rect x="-320" y="0" width="640" height="72" rx="18" fill="${C.white}" opacity="0.85"/>
    <text x="0" y="46" text-anchor="middle" font-size="24" font-weight="700" fill="${C.text}">${esc(tag)}</text>
  </g>
  ` : ''}
  <text x="600" y="820" text-anchor="middle" font-size="22" font-weight="700" fill="${accent}">by. 박서연 (ENFP)</text>
  `, footer);
}

function rankList({ title, items, color, footer }) {
  return wrap(`
  <rect x="0" y="0" width="1200" height="140" fill="${C.navy}"/>
  <text x="600" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="${C.pinkSoft}" letter-spacing="6">TOP RANKING</text>
  <text x="600" y="115" text-anchor="middle" font-size="42" font-weight="900" fill="#ffffff">${esc(title)}</text>
  ${items.map((item, i) => {
    const y = 180 + i * 115;
    return `
      <g transform="translate(60, ${y})">
        <rect x="0" y="0" width="1080" height="95" rx="18" fill="${C.white}" stroke="${color}" stroke-width="2"/>
        <rect x="0" y="0" width="110" height="95" rx="18 0 0 18" fill="${color}"/>
        <text x="55" y="62" text-anchor="middle" font-size="40" font-weight="900" fill="${C.white}">${i + 1}</text>
        <text x="140" y="40" font-size="30" font-weight="900" fill="${C.text}">${esc(item.name)}</text>
        <text x="140" y="72" font-size="22" font-weight="600" fill="${C.textSoft}">${esc(item.note)}</text>
        ${item.tag ? `
        <g transform="translate(920, 47)">
          <rect x="-70" y="-22" width="140" height="44" rx="22" fill="${color}" opacity="0.15"/>
          <text x="0" y="8" text-anchor="middle" font-size="18" font-weight="900" fill="${color}">${esc(item.tag)}</text>
        </g>
        ` : ''}
      </g>
    `;
  }).join('')}
  `, footer);
}

function matrix({ title, items, color, footer }) {
  return wrap(`
  <rect x="0" y="0" width="1200" height="140" fill="${color}"/>
  <text x="600" y="70" text-anchor="middle" font-size="28" font-weight="700" fill="${C.white}" opacity="0.85" letter-spacing="6">COMPARISON</text>
  <text x="600" y="115" text-anchor="middle" font-size="40" font-weight="900" fill="${C.white}">${esc(title)}</text>
  ${items.map((item, i) => {
    const y = 175 + i * 135;
    return `
      <g transform="translate(60, ${y})">
        <rect x="0" y="0" width="1080" height="115" rx="20" fill="${C.white}" stroke="#e5e7eb" stroke-width="2"/>
        <rect x="0" y="0" width="12" height="115" rx="6 0 0 6" fill="${color}"/>
        <text x="40" y="62" font-size="52">${item.icon}</text>
        <text x="125" y="48" font-size="30" font-weight="900" fill="${C.text}">${esc(item.label)}</text>
        <text x="125" y="82" font-size="22" font-weight="600" fill="${C.textSoft}">${esc(item.desc)}</text>
      </g>
    `;
  }).join('')}
  `, footer);
}

function noteList({ title, sub, rules, footer }) {
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
  <text x="175" y="130" font-size="58" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${esc(title)}</text>
  <text x="175" y="168" font-size="26" font-weight="600" fill="${C.rosegold}" font-family="${FONT_HAND}">${esc(sub)}</text>
  ${rules.map((r, i) => {
    const y = 225 + i * 125;
    return `
      <g transform="translate(175, ${y})">
        <rect x="0" y="0" width="75" height="75" rx="16" fill="${C.pinkDeep}"/>
        <text x="37" y="52" text-anchor="middle" font-size="32" font-weight="900" fill="#ffffff">${String(i + 1).padStart(2, '0')}</text>
        <text x="105" y="42" font-size="40" font-weight="900" fill="${C.text}" font-family="${FONT_HAND}">${esc(r.headline)}</text>
        <text x="105" y="72" font-size="22" font-weight="600" fill="${C.textSoft}">${esc(r.desc)}</text>
      </g>
    `;
  }).join('')}
  <g transform="translate(850, 850) rotate(-3)">
    <text font-size="26" font-weight="700" fill="${C.rosegold}" font-family="${FONT_HAND}">- 박서연 💕</text>
  </g>
  `, footer);
}

function outro({ line1, line2, line3, sub, color1, color2, accent, footer }) {
  return wrap(`
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#og)"/>
  <text x="600" y="220" text-anchor="middle" font-size="28" font-weight="700" fill="${accent}" letter-spacing="6">ONE LINE</text>
  <text x="100" y="320" font-size="180" font-weight="900" fill="${accent}" opacity="0.5">&quot;</text>
  <text x="600" y="440" text-anchor="middle" font-size="62" font-weight="900" fill="#ffffff">${esc(line1)}</text>
  <text x="600" y="525" text-anchor="middle" font-size="62" font-weight="900" fill="${accent}">${esc(line2)}</text>
  <text x="600" y="610" text-anchor="middle" font-size="62" font-weight="900" fill="#ffffff">${esc(line3)}</text>
  <text x="1100" y="680" text-anchor="end" font-size="180" font-weight="900" fill="${accent}" opacity="0.5">&quot;</text>
  <line x1="400" y1="760" x2="800" y2="760" stroke="${accent}" stroke-width="2"/>
  <text x="600" y="810" text-anchor="middle" font-size="26" font-weight="700" fill="${accent}">${esc(sub)}</text>
  <text x="600" y="850" text-anchor="middle" font-size="20" font-weight="600" fill="${accent}" opacity="0.85">192types.co.kr · 100문항 정밀 검사 (무료)</text>
  `, footer);
}

// ─────── 글 1: 무료 MBTI 검사 비교 ───────
function freeHero() {
  return hero({
    line1: '무료 MBTI 검사', line2: 'TOP 5 비교',
    sub: '2026년 "무료" 키워드 +150% 급상승',
    badge: 'FREE MBTI · 2026',
    tag: '회원가입 · 문항수 · 정확도 3축 비교',
    color1: '#dbeafe', color2: '#e0e7ff', accent: '#4338ca',
    footer: '192types.co.kr · 무료 검사 리포트',
  });
}
function freeRanking() {
  return rankList({
    title: '무료 MBTI 검사 신뢰도 TOP 5',
    items: [
      { name: '16Personalities.com', note: '60문항 · 영어/한국어 · 프리미엄 유료', tag: '글로벌' },
      { name: '192types.com', note: '100문항 · 16유형 × 4기질 × 3강도', tag: '정밀' },
      { name: '심리스케일', note: '48문항 · 빠른 결과', tag: '빠름' },
      { name: 'TruthConsulting', note: 'MBTI® 한국 공식 유료 + 간이 무료', tag: '공식' },
      { name: '네이버 백과 간이', note: '10~20문항 · 참고용', tag: '심플' },
    ],
    color: '#4338ca',
    footer: '192types.co.kr · 무료 검사 리포트',
  });
}
function freeMatrix() {
  return matrix({
    title: '검사별 특징 한눈 비교',
    items: [
      { icon: '🌍', label: '16Personalities — 글로벌 표준', desc: '세계 3천만 이용 · NERIS 테스트 기반' },
      { icon: '🎯', label: '192types — 기질론 통합', desc: 'MBTI × 히포크라테스 4기질 × 3단계 강도' },
      { icon: '⚡', label: '심리스케일 — 간편형', desc: '5분 컷 · 재미로 보기 좋음' },
      { icon: '📜', label: 'MBTI® 공식 — 한국형', desc: '유료(15만원+) · 전문가 해석 포함' },
    ],
    color: '#4338ca',
    footer: '192types.co.kr · 무료 검사 리포트',
  });
}
function freeRules() {
  return noteList({
    title: '무료 검사 고르는 5원칙 ✎',
    sub: '— 박서연이 5개 다 해본 후 정리',
    rules: [
      { headline: '문항수 40개+ 필수', desc: '10~20문항은 참고용' },
      { headline: '결과 해석 길어야', desc: '3줄 설명 = 의미 없음' },
      { headline: '회원가입 없어야', desc: '정보 팔아먹는 사이트 X' },
      { headline: '재검사 무료', desc: '시간 차로 다시 해보기' },
      { headline: '한국어 자연스러움', desc: '번역투 = 신뢰 ↓' },
    ],
    footer: '192types.co.kr · 무료 검사 리포트',
  });
}
function freeOutro() {
  return outro({
    line1: '무료라고 다 같지 않아',
    line2: '네 시간 30분을',
    line3: '진짜 가치 있게 써',
    sub: '192가지 유형 정밀 검사 — 100문항 무료',
    color1: '#3730a3', color2: '#6366f1', accent: '#e0e7ff',
    footer: '192types.co.kr · 무료 검사 리포트',
  });
}

// ─────── 글 2: MBTI 검사 종류 완전정리 ───────
function typesHero() {
  return hero({
    line1: 'MBTI 검사 종류', line2: '완전정리',
    sub: '16Personalities · 공식 MBTI® · 192types 차이',
    badge: 'MBTI TEST GUIDE',
    tag: '원조 · 온라인 · 기질 통합 3대 흐름',
    color1: '#cffafe', color2: '#dbeafe', accent: '#0e7490',
    footer: '192types.co.kr · 검사 가이드',
  });
}
function typesRanking() {
  return rankList({
    title: '대표 MBTI 검사 5가지',
    items: [
      { name: '공식 MBTI® (Myers-Briggs)', note: '1943년 원조 · 93문항 · 유료 15만원+', tag: '원조' },
      { name: '16Personalities (NERIS)', note: '60문항 · 글로벌 무료 · 일부 유료', tag: '대중' },
      { name: '192types.com', note: '100문항 · 기질론 통합 · 전체 무료', tag: '정밀' },
      { name: 'Keirsey Temperament', note: '기질 4분류 · 심리학자 Keirsey', tag: '학문' },
      { name: 'Socionics', note: '러시아·동유럽 계열 변형', tag: '학파' },
    ],
    color: '#0e7490',
    footer: '192types.co.kr · 검사 가이드',
  });
}
function typesMatrix() {
  return matrix({
    title: '3대 검사 차이 한눈에',
    items: [
      { icon: '📜', label: 'MBTI® 원조 — 전문가 해석', desc: '공인 자격 상담사 필수 · 정밀 but 비쌈' },
      { icon: '🌐', label: '16Personalities — 온라인 대중', desc: 'NERIS 자체 알고리즘 · 공식 MBTI와 별개' },
      { icon: '🎯', label: '192types — 기질 통합', desc: '16유형 × 4기질 = 192 조합 · 정밀 무료' },
    ],
    color: '#0e7490',
    footer: '192types.co.kr · 검사 가이드',
  });
}
function typesRules() {
  return noteList({
    title: '검사 고를 때 체크 5가지 ✎',
    sub: '— 재미·연구·상담 목적별 추천',
    rules: [
      { headline: '재미로 → 16Personalities', desc: '10분 무료 · 결과도 깔끔' },
      { headline: '정밀 → 192types', desc: '기질까지 보면 자기 이해 깊어' },
      { headline: '공인 → MBTI® 공식', desc: '상담·코칭 목적이면 유료 OK' },
      { headline: '연구 → Keirsey·Socionics', desc: '학문적 관심 있는 사람만' },
      { headline: '10문항 이하 → 패스', desc: '신뢰 불가능' },
    ],
    footer: '192types.co.kr · 검사 가이드',
  });
}
function typesOutro() {
  return outro({
    line1: 'MBTI는 하나가 아냐',
    line2: '네 목적에 맞는',
    line3: '검사를 고르자',
    sub: '192가지 유형 정밀 검사 — 100문항 무료',
    color1: '#0e7490', color2: '#06b6d4', accent: '#cffafe',
    footer: '192types.co.kr · 검사 가이드',
  });
}

// ─────── 글 3: MBTI 테스트 정확도 과학 ───────
function accHero() {
  return hero({
    line1: '왜 MBTI 테스트는', line2: '매번 다를까?',
    sub: '정확도의 진짜 과학 · 5가지 이유',
    badge: 'TEST ACCURACY',
    tag: '재검사 신뢰도 · 기분 영향 · 자기 인식의 벽',
    color1: '#fce7f3', color2: '#f3e8ff', accent: '#7e22ce',
    footer: '192types.co.kr · 정확도 과학',
  });
}
function accRanking() {
  return rankList({
    title: 'MBTI 테스트 결과가 달라지는 이유 TOP 5',
    items: [
      { name: '기분·컨디션 영향', note: '피곤할 때 I 쪽 · 들뜰 때 E 쪽', tag: '상태' },
      { name: '상황·맥락 상상', note: '회사 생각 vs 친구 생각 답 달라', tag: '맥락' },
      { name: '자기 이상형 투영', note: '"이렇고 싶다"로 답하는 무의식', tag: '왜곡' },
      { name: '경계선 유형', note: '50:50 경계에 있으면 매번 반전', tag: '중앙' },
      { name: '검사 품질 차이', note: '10문항 vs 100문항 결과 다름', tag: '도구' },
    ],
    color: '#7e22ce',
    footer: '192types.co.kr · 정확도 과학',
  });
}
function accMatrix() {
  return matrix({
    title: '정확도 높이는 4대 공식',
    items: [
      { icon: '🧘', label: '컨디션 좋을 때 검사', desc: '스트레스 ↓ · 피곤 ↓ 상태에서' },
      { icon: '🏠', label: '일상 상황 기준', desc: '회사 특수 상황 X · 평소 모습으로' },
      { icon: '❌', label: '"이상형" 제외', desc: '되고 싶은 모습 X · 진짜 반응' },
      { icon: '📏', label: '40문항+ 사용', desc: '짧은 검사는 오차 범위 큼' },
    ],
    color: '#7e22ce',
    footer: '192types.co.kr · 정확도 과학',
  });
}
function accRules() {
  return noteList({
    title: '검사 잘 받는 5가지 팁 ✎',
    sub: '— 박서연이 5번 해보고 깨달은 것',
    rules: [
      { headline: '주말 아침에', desc: '월요일 피곤할 때 X' },
      { headline: '5초 안에 답', desc: '고민 길어지면 왜곡' },
      { headline: '평소의 나 기준', desc: '특수 상황 제외' },
      { headline: '세 번 검사해보기', desc: '일관성 있으면 확실' },
      { headline: '친한 사람 피드백', desc: '외부 관점으로 검증' },
    ],
    footer: '192types.co.kr · 정확도 과학',
  });
}
function accOutro() {
  return outro({
    line1: '정확도는',
    line2: '검사 도구 + 마음 상태',
    line3: '둘 다의 합이다',
    sub: '192가지 정밀 검사 — 100문항이라 오차 최소',
    color1: '#6b21a8', color2: '#a855f7', accent: '#fce7f3',
    footer: '192types.co.kr · 정확도 과학',
  });
}

// ─────── 글 4: MBTI 16유형 특징 한눈 정리 ───────
function traitsHero() {
  return hero({
    line1: 'MBTI 16유형 특징', line2: '한눈 정리',
    sub: '유형별 키워드 3개로 빠르게 파악',
    badge: '16 TYPES · QUICK',
    tag: '각 유형 핵심 3키워드 · 3분 완독 가능',
    color1: '#fef3c7', color2: '#fed7aa', accent: '#c2410c',
    footer: '192types.co.kr · 16유형 요약',
  });
}
function traitsNT() {
  return matrix({
    title: 'NT 분석가형 — 논리·전략·독립',
    items: [
      { icon: '🧠', label: 'INTJ · 전략가', desc: '장기 비전 · 냉정한 실행 · 독립 철저' },
      { icon: '🔬', label: 'INTP · 논리학자', desc: '원리 탐구 · 토론 사랑 · 실행 약점' },
      { icon: '⚡', label: 'ENTJ · 사령관', desc: '카리스마 리더 · 결과 중심 · 추진력' },
      { icon: '💡', label: 'ENTP · 발명가', desc: '아이디어 뱅크 · 유머 · 논쟁 즐김' },
    ],
    color: '#0891b2',
    footer: '192types.co.kr · 16유형 요약',
  });
}
function traitsNF() {
  return matrix({
    title: 'NF 이상주의형 — 가치·의미·감정',
    items: [
      { icon: '🔮', label: 'INFJ · 옹호자', desc: '이상주의 · 깊은 통찰 · 조용한 헌신' },
      { icon: '🌿', label: 'INFP · 중재자', desc: '진정성 · 내면 세계 · 이상 현실' },
      { icon: '☀️', label: 'ENFJ · 선도자', desc: '따뜻한 리더 · 타인 돌봄 · 공감' },
      { icon: '✨', label: 'ENFP · 활동가', desc: '감정 폭발 · 자유 영혼 · 가능성' },
    ],
    color: '#e11d48',
    footer: '192types.co.kr · 16유형 요약',
  });
}
function traitsSJ() {
  return matrix({
    title: 'SJ 관리자형 — 책임·규칙·안정',
    items: [
      { icon: '📚', label: 'ISTJ · 현실주의자', desc: '꾸준함 · 원칙 · 약속 철저' },
      { icon: '🤲', label: 'ISFJ · 수호자', desc: '조용한 돌봄 · 세심 · 헌신' },
      { icon: '📋', label: 'ESTJ · 경영자', desc: '실행 · 체계 · 책임감' },
      { icon: '🎀', label: 'ESFJ · 외교관', desc: '배려 · 공동체 · 친화력' },
    ],
    color: '#059669',
    footer: '192types.co.kr · 16유형 요약',
  });
}
function traitsSP() {
  return matrix({
    title: 'SP 탐험가형 — 감각·행동·자유',
    items: [
      { icon: '🔧', label: 'ISTP · 장인', desc: '손재주 · 쿨함 · 문제 해결' },
      { icon: '🎨', label: 'ISFP · 모험가', desc: '감성 예술 · 자기 가치 · 조용' },
      { icon: '🏎', label: 'ESTP · 사업가', desc: '즉흥 · 대담 · 현장 강함' },
      { icon: '🎉', label: 'ESFP · 엔터테이너', desc: '밝음 · 사교 · 현재 순간' },
    ],
    color: '#d97706',
    footer: '192types.co.kr · 16유형 요약',
  });
}
function traitsOutro() {
  return outro({
    line1: '16유형은 시작일 뿐',
    line2: '기질까지 보면',
    line3: '진짜 내가 보인다',
    sub: '192가지 유형 정밀 검사 — 100문항 무료',
    color1: '#b45309', color2: '#f59e0b', accent: '#fef3c7',
    footer: '192types.co.kr · 16유형 요약',
  });
}

const items = [
  // 글 1: 무료 검사
  { name: 'free-01-hero', svg: freeHero() },
  { name: 'free-02-ranking', svg: freeRanking() },
  { name: 'free-03-matrix', svg: freeMatrix() },
  { name: 'free-04-rules', svg: freeRules() },
  { name: 'free-05-outro', svg: freeOutro() },

  // 글 2: 검사 종류
  { name: 'types-01-hero', svg: typesHero() },
  { name: 'types-02-ranking', svg: typesRanking() },
  { name: 'types-03-matrix', svg: typesMatrix() },
  { name: 'types-04-rules', svg: typesRules() },
  { name: 'types-05-outro', svg: typesOutro() },

  // 글 3: 정확도 과학
  { name: 'accuracy-01-hero', svg: accHero() },
  { name: 'accuracy-02-ranking', svg: accRanking() },
  { name: 'accuracy-03-matrix', svg: accMatrix() },
  { name: 'accuracy-04-rules', svg: accRules() },
  { name: 'accuracy-05-outro', svg: accOutro() },

  // 글 4: 16유형 특징
  { name: 'traits-01-hero', svg: traitsHero() },
  { name: 'traits-02-nt', svg: traitsNT() },
  { name: 'traits-03-nf', svg: traitsNF() },
  { name: 'traits-04-sj', svg: traitsSJ() },
  { name: 'traits-05-sp', svg: traitsSP() },
  { name: 'traits-06-outro', svg: traitsOutro() },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const it of items) {
    const svgPath = `${OUT_DIR}/${it.name}.svg`;
    const webpPath = `${OUT_DIR}/${it.name}.webp`;
    fs.writeFileSync(svgPath, it.svg, 'utf-8');
    await sharp(Buffer.from(it.svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(webpPath);
    const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${it.name}  webp=${kb}KB`);
  }
  console.log(`\n✅ 총 ${items.length}개 이미지 생성`);
}

run();
