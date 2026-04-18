// 네이버 트렌드 키워드 5개 기반 글 이미지 생성 (10장).
//   sbti-*          SBTI 테스트 (월 12,980 new)
//   coffee-expo-*   2026 서울커피엑스포 (60,300 +46)
//   starbucks-*     스타벅스 가방걸이 (7,390 new)
//   mcmorning-*     맥모닝 시간 (63,900 +16)
//   setlog-*        셋로그 (83,830)
//
// 각 글당 hero + content 이미지 2장씩. SVG → WebP (density 200, resize 1200, quality 88).

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  bg: '#faf8f5',
  white: '#ffffff',
  text: '#1a1a1a',
  textSoft: '#4b5563',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  indigo: '#6366f1',
  purple: '#a855f7',
  amber: '#f59e0b',
  rose: '#f43f5e',
  emerald: '#10b981',
  sky: '#0ea5e9',
  sangWarm: '#fcd34d',
  damRed: '#ef4444',
  jeomGreen: '#10b981',
  uBlue: '#3b82f6',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">${esc(footer)}</text>
</svg>`;

// 공통 hero 템플릿 — 상단 배지, 큰 제목 2줄, 하단 서브텍스트
function hero({ badge, title1, title2, sub, emoji, color1, color2, accent }) {
  return wrap(`
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hg)" opacity="0.12"/>

  <!-- 배지 -->
  <rect x="100" y="90" rx="24" width="240" height="48" fill="${C.white}" stroke="${accent}" stroke-width="2"/>
  <text x="220" y="122" text-anchor="middle" font-size="18" font-weight="800" fill="${accent}">${esc(badge)}</text>

  <!-- 대형 이모지 -->
  <text x="1050" y="280" text-anchor="middle" font-size="260">${esc(emoji)}</text>

  <!-- 제목 -->
  <text x="100" y="420" font-size="78" font-weight="900" fill="${C.text}">${esc(title1)}</text>
  <text x="100" y="520" font-size="78" font-weight="900" fill="${accent}">${esc(title2)}</text>

  <!-- 서브 -->
  <text x="100" y="620" font-size="28" font-weight="600" fill="${C.textSoft}">${esc(sub)}</text>

  <!-- 하단 강조선 -->
  <rect x="100" y="680" width="200" height="6" fill="${accent}"/>
`);
}

// 2x2 매트릭스 템플릿 — 네 박스에 라벨과 설명
function matrix({ title, cells }) {
  // cells: [{ label, desc, color }, …] 4개
  const boxes = cells
    .map((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 100 + col * 510;
      const y = 220 + row * 300;
      return `
        <rect x="${x}" y="${y}" width="480" height="260" rx="24" fill="${C.white}" stroke="${c.color}" stroke-width="3"/>
        <circle cx="${x + 50}" cy="${y + 60}" r="30" fill="${c.color}"/>
        <text x="${x + 50}" y="${y + 68}" text-anchor="middle" font-size="28" font-weight="900" fill="${C.white}">${esc(c.icon)}</text>
        <text x="${x + 100}" y="${y + 70}" font-size="30" font-weight="900" fill="${C.text}">${esc(c.label)}</text>
        <foreignObject x="${x + 40}" y="${y + 100}" width="400" height="140">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:${FONT};font-size:18px;line-height:1.5;color:${C.textSoft};font-weight:500;">${esc(c.desc)}</div>
        </foreignObject>
      `;
    })
    .join('\n');

  return wrap(`
  <text x="600" y="130" text-anchor="middle" font-size="48" font-weight="900" fill="${C.text}">${esc(title)}</text>
  <rect x="500" y="160" width="200" height="6" fill="${C.indigo}"/>
  ${boxes}
  `);
}

// 시간표 템플릿 — 맥모닝용
function timeline({ title, items }) {
  // items: [{ time, label, who, color }]
  const rows = items
    .map((r, i) => {
      const y = 220 + i * 130;
      return `
        <rect x="100" y="${y}" width="1000" height="110" rx="20" fill="${C.white}" stroke="${r.color}" stroke-width="3"/>
        <rect x="100" y="${y}" width="180" height="110" rx="20" fill="${r.color}"/>
        <text x="190" y="${y + 65}" text-anchor="middle" font-size="34" font-weight="900" fill="${C.white}">${esc(r.time)}</text>
        <text x="310" y="${y + 50}" font-size="28" font-weight="800" fill="${C.text}">${esc(r.label)}</text>
        <text x="310" y="${y + 82}" font-size="18" font-weight="500" fill="${C.textSoft}">${esc(r.who)}</text>
      `;
    })
    .join('\n');

  return wrap(`
  <text x="600" y="130" text-anchor="middle" font-size="48" font-weight="900" fill="${C.text}">${esc(title)}</text>
  <rect x="500" y="160" width="200" height="6" fill="${C.amber}"/>
  ${rows}
  `);
}

// ─── 1. SBTI vs MBTI ───────────────────────────
const heroSbti = hero({
  badge: '⚡ 월 12,980 검색 급상승',
  title1: 'SBTI 테스트',
  title2: '진짜 뭐야?',
  sub: 'MBTI 오타일까? 아니면 진짜 SBTI?',
  emoji: '🤔',
  color1: C.indigo,
  color2: C.purple,
  accent: C.indigo,
});

const compareSbti = matrix({
  title: 'SBTI vs MBTI — 완전 다른 두 개',
  cells: [
    {
      icon: 'S',
      label: 'SBTI (진짜)',
      desc: 'Science-Based Targets initiative — 기업 기후 목표 국제 이니셔티브. ESG 담당자용.',
      color: C.emerald,
    },
    {
      icon: 'M',
      label: 'MBTI (아마 이거)',
      desc: '16가지 성격 유형 검사. 칼 융 인지기능 이론 기반. 일상 심리 분석.',
      color: C.indigo,
    },
    {
      icon: '🔄',
      label: '오타 가능성 99%',
      desc: '키보드에서 S와 M이 나란히 있어서 흔한 실수. 민지도 나도 종종 틀림.',
      color: C.amber,
    },
    {
      icon: '192',
      label: '대안: 192types',
      desc: '같은 MBTI인데 왜 다를까? 기질론까지 합친 192가지 정밀 검사.',
      color: C.rose,
    },
  ],
});

// ─── 2. 2026 서울커피엑스포 ───────────────────
const heroCoffee = hero({
  badge: '☕ 월 60,300 +46% 급상승',
  title1: '2026 서울커피엑스포',
  title2: 'MBTI 관람 가이드',
  sub: '5월 15-18일 코엑스 · 네 동선은 네 유형이 결정해',
  emoji: '☕',
  color1: C.amber,
  color2: C.rose,
  accent: C.amber,
});

const routeCoffee = matrix({
  title: '기질별 커피엑스포 관람 동선',
  cells: [
    {
      icon: 'NT',
      label: '분석가형',
      desc: '스페셜티 로스터 → 추출 신기술 → 바리스타 챔피언십. 체류 3-4시간.',
      color: C.indigo,
    },
    {
      icon: 'NF',
      label: '이상주의형',
      desc: '농부 초청 부스 → 싱글 오리진 스토리 → 라떼아트. 체류 4-5시간.',
      color: C.rose,
    },
    {
      icon: 'SJ',
      label: '관리자형',
      desc: '유명 로스터리 → 장비 체험 → 창업 상담. 검증된 브랜드 위주 3-4시간.',
      color: C.emerald,
    },
    {
      icon: 'SP',
      label: '탐험가형',
      desc: '계획 X. 시식·체험 코너 즉흥 이동. 체류 2-3시간으로 짧고 강렬.',
      color: C.amber,
    },
  ],
});

// ─── 3. 스타벅스 MBTI ─────────────────────────
const heroStarbucks = hero({
  badge: '☕ 스벅 3년 관찰기',
  title1: '스타벅스 주문',
  title2: 'MBTI 완전해부',
  sub: '내가 3분 고민할 때, 민지는 0.5초로 주문',
  emoji: '☕',
  color1: C.emerald,
  color2: C.indigo,
  accent: C.emerald,
});

const matrixStarbucks = matrix({
  title: '16유형 스타벅스 주문 패턴',
  cells: [
    {
      icon: 'NT',
      label: '효율 극대',
      desc: 'INTJ 콜드브루 고정 · INTP 3분 고민 · ENTJ 커스텀 · ENTP 실험 주문.',
      color: C.indigo,
    },
    {
      icon: 'NF',
      label: '경험 구매',
      desc: 'INFJ 시즌 리미티드 · INFP 감성 메뉴 · ENFJ 일행 맞춤 · ENFP 신메뉴 덕후.',
      color: C.rose,
    },
    {
      icon: 'SJ',
      label: '루틴 고정',
      desc: 'ISTJ 3년 아메리카노 · ISFJ 매장 단골 · ESTJ 효율 · ESFJ 전원 결제.',
      color: C.emerald,
    },
    {
      icon: 'SP',
      label: '즉흥 폭발',
      desc: 'ISTP 가성비 · ISFP 비주얼 · ESTP 프로모션 사냥 · ESFP 함께 나눠 먹기.',
      color: C.amber,
    },
  ],
});

// ─── 4. 맥모닝 MBTI ──────────────────────────
const heroMcmorning = hero({
  badge: '🍟 월 63,900 +16% 인기 검색',
  title1: '맥모닝 10:30',
  title2: '누가 언제 가?',
  sub: '마감 시간 같은데 MBTI별 도착 시간은 3시간 차이',
  emoji: '🍳',
  color1: C.amber,
  color2: C.damRed,
  accent: C.damRed,
});

const timelineMcmorning = timeline({
  title: '기질별 맥모닝 도착 시간표',
  items: [
    {
      time: '07:30',
      label: '담즙질 오픈런형',
      who: 'ENTJ·ESTJ — 6시 기상 + 7시 운동 + 맥모닝 + 9시 전 사무실',
      color: C.damRed,
    },
    {
      time: '08:15',
      label: '우울질 루틴형',
      who: 'INTJ·INFJ — 3년째 같은 시간, 같은 메뉴, 같은 자리',
      color: C.uBlue,
    },
    {
      time: '스킵',
      label: '점액질 아침 건너뛰기',
      who: 'ISFJ·ISTJ — 10시 따뜻한 물 + 비스킷으로 11:30 브런치까지 버팀',
      color: C.jeomGreen,
    },
    {
      time: '10:27',
      label: '다혈질 아슬아슬형',
      who: 'ENFP·ESFP — 알람 5번 끈 뒤 마감 3분 전 겨우 세이프',
      color: C.sangWarm,
    },
  ],
});

// ─── 5. 셋로그 MBTI ───────────────────────────
const heroSetlog = hero({
  badge: '📱 월 83,830 인기 앱',
  title1: '셋로그 MBTI',
  title2: '기록 스타일 4가지',
  sub: '민지는 3일, 나는 1년 — 이 차이가 유형에 있어',
  emoji: '📝',
  color1: C.purple,
  color2: C.sky,
  accent: C.purple,
});

const stylesSetlog = matrix({
  title: 'MBTI별 기록 스타일 패턴',
  cells: [
    {
      icon: '📊',
      label: 'SJ·NT 데이터 수집가',
      desc: '구조화된 앱 최적. 세트 여러 개, 정량화 가능한 것 위주. 1년 쌓으면 분석 자료.',
      color: C.indigo,
    },
    {
      icon: '💭',
      label: 'NF 감정 폭발가',
      desc: '규칙성 X. 감정 터질 때만 기록. 매일 강제하면 앱 지워. 필요성 중심.',
      color: C.rose,
    },
    {
      icon: '📷',
      label: 'SP 순간 캡처러',
      desc: '글 대신 사진 + 한 줄. 셋로그 아닌 사진 앱이 나음. 실시간 감각 포착.',
      color: C.amber,
    },
    {
      icon: '🪞',
      label: 'INFJ 내면 관찰가',
      desc: '주말 깊은 회고. 한 번에 길게. "이번 주 불편함 3가지" 같은 주제로.',
      color: C.sky,
    },
  ],
});

// ─── 렌더 ─────────────────────────────────────
const images = [
  { name: 'sbti-01-hero', svg: heroSbti },
  { name: 'sbti-02-compare', svg: compareSbti },
  { name: 'coffee-expo-01-hero', svg: heroCoffee },
  { name: 'coffee-expo-02-route', svg: routeCoffee },
  { name: 'starbucks-01-hero', svg: heroStarbucks },
  { name: 'starbucks-02-matrix', svg: matrixStarbucks },
  { name: 'mcmorning-01-hero', svg: heroMcmorning },
  { name: 'mcmorning-02-schedule', svg: timelineMcmorning },
  { name: 'setlog-01-hero', svg: heroSetlog },
  { name: 'setlog-02-styles', svg: stylesSetlog },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

let okCount = 0;
for (const { name, svg } of images) {
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  const webpPath = path.join(OUT_DIR, `${name}.webp`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg), { density: 200 })
    .resize(1200)
    .webp({ quality: 88 })
    .toFile(webpPath);
  const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  console.log(`✅ ${name}.webp (${kb} KB)`);
  okCount++;
}

console.log(`\n완료: ${okCount}/${images.length}`);
