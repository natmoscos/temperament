// Generate 12 infographics for "혼자 잘 노는 MBTI 순위" blog post
// Output: public/blog/solo-01.svg ~ solo-12.svg + matching .webp files

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa',
  card: '#ffffff',
  text: '#171717',
  textSoft: '#374151',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  border: '#e5e7eb',
  grid: '#f3f4f6',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  gold: '#f59e0b', silver: '#9ca3af', bronze: '#b45309',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner, { noWatermark = false } = {}) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
${noWatermark ? '' : `<text x="1180" y="890" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.8">192types.co.kr · 2026 MBTI 트렌드 시리즈</text>`}
</svg>`;

// -----------------------------
// 01. HERO
// -----------------------------
function hero() {
  const badges = [
    { t: 'INTP', x: 220, y: 260, r: 55, c: C.nt600, rank: 1 },
    { t: 'INFP', x: 980, y: 250, r: 52, c: C.nf600, rank: 2 },
    { t: 'INTJ', x: 180, y: 600, r: 50, c: C.nt500, rank: 3 },
    { t: 'INFJ', x: 1010, y: 610, r: 46, c: C.nf500, rank: 4 },
    { t: 'ISTP', x: 320, y: 770, r: 40, c: C.sp600, rank: 5 },
    { t: 'ISFP', x: 880, y: 780, r: 38, c: C.sp500, rank: 6 },
    { t: 'ISTJ', x: 100, y: 420, r: 36, c: C.sj600, rank: 7 },
    { t: 'ISFJ', x: 1100, y: 430, r: 34, c: C.sj500, rank: 8 },
  ];
  return wrap(`
  <defs>
    <radialGradient id="heroBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f4f6"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#heroBg)"/>
  ${badges.map(b => `
    <circle cx="${b.x}" cy="${b.y}" r="${b.r + 8}" fill="${b.c}" opacity="0.12"/>
    <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.c}"/>
    <text x="${b.x}" y="${b.y - 2}" text-anchor="middle" font-size="${b.r * 0.42}" font-weight="800" fill="#fff">${b.t}</text>
    <text x="${b.x}" y="${b.y + b.r * 0.36}" text-anchor="middle" font-size="${b.r * 0.26}" font-weight="600" fill="#fff" opacity="0.85">#${b.rank}</text>
  `).join('')}
  <rect x="140" y="280" width="920" height="340" rx="28" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="345" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="6">2026 MBTI TREND REPORT</text>
  <text x="600" y="440" text-anchor="middle" font-size="74" font-weight="900" fill="${C.text}">혼자 잘 노는 MBTI</text>
  <text x="600" y="500" text-anchor="middle" font-size="28" font-weight="700" fill="${C.textSoft}">내향 · 몰입 · 자기완결 랭킹</text>
  <line x1="380" y1="535" x2="820" y2="535" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="575" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textFaint}">TOP 16 · 과학적 랭킹 · 기질론 기반 해석</text>
  `);
}

// -----------------------------
// 02. MAIN RANKING CHART (refined from sample)
// -----------------------------
function ranking() {
  const data = [
    { r: 1, t: 'INTP', d: '논리적 탐구자', s: 95, c: C.nt600, g: 'NT' },
    { r: 2, t: 'INFP', d: '상상 속 세계인', s: 92, c: C.nf600, g: 'NF' },
    { r: 3, t: 'INTJ', d: '전략적 은둔자', s: 90, c: C.nt600, g: 'NT' },
    { r: 4, t: 'INFJ', d: '깊은 사색가', s: 86, c: C.nf600, g: 'NF' },
    { r: 5, t: 'ISTP', d: '기계 만지는 장인', s: 82, c: C.sp600, g: 'SP' },
    { r: 6, t: 'ISFP', d: '감각적 예술가', s: 78, c: C.sp600, g: 'SP' },
    { r: 7, t: 'ISTJ', d: '루틴의 완성자', s: 72, c: C.sj600, g: 'SJ' },
    { r: 8, t: 'ISFJ', d: '조용한 돌봄이', s: 68, c: C.sj600, g: 'SJ' },
    { r: 9, t: 'ENTP', d: '아이디어 외톨이', s: 58, c: C.nt500, g: 'NT' },
    { r: 10, t: 'ENTJ', d: '프로젝트 몰입형', s: 54, c: C.nt500, g: 'NT' },
    { r: 11, t: 'ENFP', d: '금방 외로워짐', s: 48, c: C.nf500, g: 'NF' },
    { r: 12, t: 'ESTP', d: '활동 없으면 지루', s: 42, c: C.sp500, g: 'SP' },
    { r: 13, t: 'ENFJ', d: '관계 없인 공허', s: 38, c: C.nf500, g: 'NF' },
    { r: 14, t: 'ESTJ', d: '일 없으면 불안', s: 32, c: C.sj500, g: 'SJ' },
    { r: 15, t: 'ESFP', d: '주목받아야 충전', s: 26, c: C.sp500, g: 'SP' },
    { r: 16, t: 'ESFJ', d: '혼자 = 우울 신호', s: 22, c: C.sj500, g: 'SJ' },
  ];
  const barMax = 600;
  const barX = 300;
  const rowH = 40;
  const rowY = (r) => 150 + (r - 1) * rowH;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="34" font-weight="800" fill="${C.text}">혼자 잘 노는 MBTI 순위</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">16유형 솔로 적응력 점수 · 내향성 × 몰입력 × 자기완결성</text>
  <!-- grid -->
  ${[20, 40, 60, 80, 100].map(v => `
    <line x1="${barX + (v * barMax / 100)}" y1="130" x2="${barX + (v * barMax / 100)}" y2="790" stroke="${C.border}" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="${barX + (v * barMax / 100)}" y="125" text-anchor="middle" font-size="10" fill="${C.textFaint}" font-weight="500">${v}</text>
  `).join('')}
  ${data.map(d => {
    const w = d.s * barMax / 100;
    const isTop3 = d.r <= 3;
    const h = isTop3 ? 30 : 24;
    const yOff = isTop3 ? 15 : 12;
    return `
    <g>
      <text x="50" y="${rowY(d.r) + 6}" font-size="${isTop3 ? 18 : 16}" font-weight="${isTop3 ? 800 : 700}" fill="${C.text}">${d.r}</text>
      ${d.r === 1 ? `<circle cx="100" cy="${rowY(d.r)}" r="14" fill="${C.gold}" stroke="#d97706" stroke-width="2"/><text x="100" y="${rowY(d.r) + 5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">金</text>` : ''}
      ${d.r === 2 ? `<circle cx="100" cy="${rowY(d.r)}" r="14" fill="#d1d5db" stroke="${C.silver}" stroke-width="2"/><text x="100" y="${rowY(d.r) + 5}" text-anchor="middle" font-size="12" font-weight="800" fill="#374151">銀</text>` : ''}
      ${d.r === 3 ? `<circle cx="100" cy="${rowY(d.r)}" r="14" fill="${C.bronze}" stroke="#92400e" stroke-width="2"/><text x="100" y="${rowY(d.r) + 5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">銅</text>` : ''}
      <text x="135" y="${rowY(d.r) + 6}" font-size="${isTop3 ? 16 : 15}" font-weight="700" fill="${d.c}">${d.t}</text>
      <text x="200" y="${rowY(d.r) + 6}" font-size="11" fill="${C.textMuted}">${d.d}</text>
      <rect x="${barX}" y="${rowY(d.r) - yOff}" width="${w}" height="${h}" rx="${h/2}" fill="${d.c}"/>
      <text x="${barX + w + 18}" y="${rowY(d.r) + 6}" font-size="${isTop3 ? 16 : 14}" font-weight="${isTop3 ? 800 : 700}" fill="${d.c}">${d.s}</text>
    </g>`;
  }).join('')}
  <!-- Divider I/E -->
  <line x1="30" y1="475" x2="1170" y2="475" stroke="${C.textFaint}" stroke-width="1" stroke-dasharray="6 4"/>
  <text x="60" y="470" font-size="10" font-weight="600" fill="${C.textMuted}">▲ 내향형(I) · 혼자도 충전되는 유형</text>
  <text x="60" y="492" font-size="10" font-weight="600" fill="${C.textFaint}">▼ 외향형(E) · 혼자 있으면 방전되는 유형</text>
  <!-- Legend -->
  <g transform="translate(150, 822)">
    <rect x="0" y="0" width="900" height="56" fill="${C.card}" stroke="${C.border}" stroke-width="1" rx="8"/>
    <circle cx="35" cy="28" r="9" fill="${C.nt600}"/><text x="52" y="32" font-size="12" font-weight="600" fill="${C.textSoft}">NT · 분석가형</text>
    <circle cx="215" cy="28" r="9" fill="${C.nf600}"/><text x="232" y="32" font-size="12" font-weight="600" fill="${C.textSoft}">NF · 이상주의형</text>
    <circle cx="410" cy="28" r="9" fill="${C.sj600}"/><text x="427" y="32" font-size="12" font-weight="600" fill="${C.textSoft}">SJ · 관리자형</text>
    <circle cx="595" cy="28" r="9" fill="${C.sp600}"/><text x="612" y="32" font-size="12" font-weight="600" fill="${C.textSoft}">SP · 기회포착형</text>
  </g>
  `);
}

// -----------------------------
// 03. TOP 3 DETAIL CARDS
// -----------------------------
function top3Cards() {
  const cards = [
    {
      rank: 1, medal: '金', medalColor: C.gold, medalTextColor: '#fff', medalStroke: '#d97706',
      type: 'INTP', name: '논리적 탐구자', score: 95, c: C.nt600, cSoft: C.nt50, cDeep: C.nt700,
      tags: ['호기심 무한', '혼자 몰입', '지적 탐험'],
      activities: ['위키 서핑 3시간', '코딩 사이드 프로젝트', '유튜브 다큐 몰아보기'],
    },
    {
      rank: 2, medal: '銀', medalColor: '#d1d5db', medalTextColor: '#374151', medalStroke: C.silver,
      type: 'INFP', name: '상상 속 세계인', score: 92, c: C.nf600, cSoft: C.nf50, cDeep: C.nf700,
      tags: ['내면 세계', '감수성 깊음', '창작 몰입'],
      activities: ['일기·시 쓰기', '플레이리스트 큐레이션', '혼자 영화관 관람'],
    },
    {
      rank: 3, medal: '銅', medalColor: C.bronze, medalTextColor: '#fff', medalStroke: '#92400e',
      type: 'INTJ', name: '전략적 은둔자', score: 90, c: C.nt600, cSoft: C.nt50, cDeep: C.nt700,
      tags: ['장기 계획', '시스템 사고', '효율 추구'],
      activities: ['독서·자기계발 학습', '전략 게임·체스', '자기 루틴 설계'],
    },
  ];
  const cardW = 340, cardH = 580, gap = 40;
  const startX = (1200 - (cardW * 3 + gap * 2)) / 2;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">TOP 3 · 혼자 노는 왕들</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">금·은·동 메달리스트 상세 프로필</text>
  ${cards.map((k, i) => {
    const x = startX + i * (cardW + gap);
    const y = 140;
    return `
    <g>
      <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="20" fill="${C.card}" stroke="${k.c}" stroke-width="3"/>
      <!-- Top strip -->
      <rect x="${x}" y="${y}" width="${cardW}" height="80" rx="20" fill="${k.cSoft}"/>
      <rect x="${x}" y="${y + 60}" width="${cardW}" height="20" fill="${k.cSoft}"/>
      <!-- Medal -->
      <circle cx="${x + 60}" cy="${y + 42}" r="26" fill="${k.medalColor}" stroke="${k.medalStroke}" stroke-width="3"/>
      <text x="${x + 60}" y="${y + 50}" text-anchor="middle" font-size="22" font-weight="800" fill="${k.medalTextColor}">${k.medal}</text>
      <text x="${x + 100}" y="${y + 38}" font-size="12" font-weight="600" fill="${C.textMuted}" letter-spacing="2">RANK ${k.rank}</text>
      <text x="${x + 100}" y="${y + 62}" font-size="26" font-weight="800" fill="${k.cDeep}">${k.type}</text>
      <!-- Name -->
      <text x="${x + cardW/2}" y="${y + 130}" text-anchor="middle" font-size="18" font-weight="700" fill="${C.text}">${k.name}</text>
      <!-- Score -->
      <text x="${x + cardW/2}" y="${y + 195}" text-anchor="middle" font-size="64" font-weight="800" fill="${k.c}">${k.score}</text>
      <text x="${x + cardW/2}" y="${y + 220}" text-anchor="middle" font-size="12" font-weight="500" fill="${C.textMuted}">솔로 적응력 점수 / 100</text>
      <!-- Tags -->
      <text x="${x + 25}" y="${y + 270}" font-size="11" font-weight="700" fill="${C.textMuted}" letter-spacing="2">핵심 성향</text>
      ${k.tags.map((tag, j) => `
        <rect x="${x + 25}" y="${y + 285 + j * 34}" width="${cardW - 50}" height="26" rx="13" fill="${k.cSoft}"/>
        <text x="${x + cardW/2}" y="${y + 302 + j * 34}" text-anchor="middle" font-size="12" font-weight="600" fill="${k.cDeep}">${tag}</text>
      `).join('')}
      <!-- Activities -->
      <text x="${x + 25}" y="${y + 430}" font-size="11" font-weight="700" fill="${C.textMuted}" letter-spacing="2">추천 혼놀 활동</text>
      ${k.activities.map((act, j) => `
        <circle cx="${x + 32}" cy="${y + 455 + j * 30}" r="4" fill="${k.c}"/>
        <text x="${x + 45}" y="${y + 459 + j * 30}" font-size="13" font-weight="500" fill="${C.textSoft}">${act}</text>
      `).join('')}
    </g>`;
  }).join('')}
  `);
}

// -----------------------------
// 04. TEMPERAMENT DONUT
// -----------------------------
function temperamentDonut() {
  const data = [
    { g: 'NT', label: '분석가형', avg: 74, c: C.nt600 },
    { g: 'NF', label: '이상주의형', avg: 66, c: C.nf600 },
    { g: 'SP', label: '기회포착형', avg: 57, c: C.sp600 },
    { g: 'SJ', label: '관리자형', avg: 48, c: C.sj600 },
  ];
  const total = data.reduce((a, b) => a + b.avg, 0);
  const cx = 600, cy = 470, r = 180, stroke = 60;
  let cumulative = 0;
  const segs = data.map(d => {
    const frac = d.avg / total;
    const start = cumulative * 2 * Math.PI - Math.PI / 2;
    const end = (cumulative + frac) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const large = frac > 0.5 ? 1 : 0;
    const midAng = (start + end) / 2;
    const labelX = cx + (r + 60) * Math.cos(midAng);
    const labelY = cy + (r + 60) * Math.sin(midAng);
    cumulative += frac;
    return { ...d, path: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`, labelX, labelY, pct: Math.round(frac * 100) };
  });
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">4기질별 평균 점수</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">혼자 놀기 능력은 기질마다 뚜렷하게 갈린다</text>
  ${segs.map(s => `
    <path d="${s.path}" fill="none" stroke="${s.c}" stroke-width="${stroke}" stroke-linecap="butt"/>
  `).join('')}
  <!-- center text -->
  <text x="${cx}" y="${cy - 10}" text-anchor="middle" font-size="15" font-weight="600" fill="${C.textMuted}">16유형 평균</text>
  <text x="${cx}" y="${cy + 30}" text-anchor="middle" font-size="56" font-weight="800" fill="${C.text}">61</text>
  <text x="${cx}" y="${cy + 55}" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textFaint}">/ 100점</text>
  <!-- labels -->
  ${segs.map(s => `
    <text x="${s.labelX}" y="${s.labelY - 8}" text-anchor="middle" font-size="18" font-weight="800" fill="${s.c}">${s.g}</text>
    <text x="${s.labelX}" y="${s.labelY + 12}" text-anchor="middle" font-size="11" font-weight="600" fill="${C.textSoft}">${s.label}</text>
    <text x="${s.labelX}" y="${s.labelY + 30}" text-anchor="middle" font-size="20" font-weight="800" fill="${C.text}">${s.avg}</text>
  `).join('')}
  <!-- bottom ranking bar -->
  <g transform="translate(240, 770)">
    <rect x="0" y="0" width="720" height="80" rx="12" fill="${C.card}" stroke="${C.border}"/>
    <text x="360" y="25" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textMuted}" letter-spacing="3">혼자 놀기 기질 순위</text>
    ${segs.sort((a,b) => b.avg - a.avg).map((s, i) => `
      <g transform="translate(${60 + i * 150}, 40)">
        <text x="0" y="0" font-size="16" font-weight="800" fill="${C.textFaint}">${i + 1}</text>
        <circle cx="25" cy="-5" r="8" fill="${s.c}"/>
        <text x="40" y="0" font-size="14" font-weight="700" fill="${s.c}">${s.g}</text>
        <text x="75" y="0" font-size="14" font-weight="700" fill="${C.text}">${s.avg}점</text>
      </g>
    `).join('')}
  </g>
  `);
}

// -----------------------------
// 05. ENERGY CURVE (I vs E)
// -----------------------------
function energyCurve() {
  const w = 900, h = 440;
  const ox = 180, oy = 200;
  // I curve: starts 40, rises to 95 at 24h
  const iPoints = [];
  for (let t = 0; t <= 24; t++) {
    const e = 40 + (95 - 40) * (1 - Math.exp(-t / 8));
    iPoints.push({ x: ox + (t / 24) * w, y: oy + h - (e / 100) * h });
  }
  // E curve: starts 90, falls to 20 at 24h
  const ePoints = [];
  for (let t = 0; t <= 24; t++) {
    const e = 90 - (90 - 20) * (1 - Math.exp(-t / 10));
    ePoints.push({ x: ox + (t / 24) * w, y: oy + h - (e / 100) * h });
  }
  const path = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">I형 vs E형 · 혼자 있을 때 에너지 변화</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">시간이 지날수록 완전히 반대로 가는 에너지 곡선</text>
  <!-- grid -->
  ${[0, 25, 50, 75, 100].map(v => `
    <line x1="${ox}" y1="${oy + h - (v/100) * h}" x2="${ox + w}" y2="${oy + h - (v/100) * h}" stroke="${C.border}" stroke-dasharray="3 3"/>
    <text x="${ox - 12}" y="${oy + h - (v/100) * h + 4}" text-anchor="end" font-size="11" fill="${C.textFaint}" font-weight="500">${v}%</text>
  `).join('')}
  ${[0, 6, 12, 18, 24].map(t => `
    <text x="${ox + (t/24) * w}" y="${oy + h + 24}" text-anchor="middle" font-size="11" fill="${C.textFaint}" font-weight="500">${t}h</text>
  `).join('')}
  <!-- axis labels -->
  <text x="${ox - 55}" y="${oy + h/2}" text-anchor="middle" font-size="12" font-weight="600" fill="${C.textSoft}" transform="rotate(-90 ${ox - 55} ${oy + h/2})">에너지 레벨</text>
  <text x="${ox + w/2}" y="${oy + h + 50}" text-anchor="middle" font-size="12" font-weight="600" fill="${C.textSoft}">혼자 있는 시간 (hour)</text>
  <!-- axis lines -->
  <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy + h}" stroke="${C.textFaint}" stroke-width="1.5"/>
  <line x1="${ox}" y1="${oy + h}" x2="${ox + w}" y2="${oy + h}" stroke="${C.textFaint}" stroke-width="1.5"/>
  <!-- I area fill -->
  <path d="${path(iPoints)} L ${iPoints[iPoints.length-1].x} ${oy + h} L ${iPoints[0].x} ${oy + h} Z" fill="${C.nt600}" opacity="0.08"/>
  <!-- E area fill -->
  <path d="${path(ePoints)} L ${ePoints[ePoints.length-1].x} ${oy + h} L ${ePoints[0].x} ${oy + h} Z" fill="${C.nf600}" opacity="0.08"/>
  <!-- I line -->
  <path d="${path(iPoints)}" fill="none" stroke="${C.nt600}" stroke-width="4" stroke-linecap="round"/>
  <!-- E line -->
  <path d="${path(ePoints)}" fill="none" stroke="${C.nf600}" stroke-width="4" stroke-linecap="round"/>
  <!-- endpoints -->
  <circle cx="${iPoints[iPoints.length-1].x}" cy="${iPoints[iPoints.length-1].y}" r="8" fill="${C.nt600}"/>
  <circle cx="${ePoints[ePoints.length-1].x}" cy="${ePoints[ePoints.length-1].y}" r="8" fill="${C.nf600}"/>
  <!-- labels on curves -->
  <rect x="${iPoints[iPoints.length-1].x - 90}" y="${iPoints[iPoints.length-1].y - 48}" width="85" height="32" rx="6" fill="${C.nt600}"/>
  <text x="${iPoints[iPoints.length-1].x - 47}" y="${iPoints[iPoints.length-1].y - 27}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">I형 95%</text>
  <rect x="${ePoints[ePoints.length-1].x - 90}" y="${ePoints[ePoints.length-1].y + 16}" width="85" height="32" rx="6" fill="${C.nf600}"/>
  <text x="${ePoints[ePoints.length-1].x - 47}" y="${ePoints[ePoints.length-1].y + 37}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">E형 20%</text>
  <!-- annotation -->
  <g transform="translate(200, 740)">
    <rect x="0" y="0" width="380" height="120" rx="12" fill="${C.nt50}" stroke="${C.nt600}" stroke-width="1"/>
    <text x="20" y="30" font-size="14" font-weight="800" fill="${C.nt700}">I형: 혼자 있을수록 충전된다</text>
    <text x="20" y="54" font-size="12" fill="${C.textSoft}">사색·집중·몰입으로 에너지가 오히려 증가.</text>
    <text x="20" y="74" font-size="12" fill="${C.textSoft}">8시간 이후 평정 상태 진입.</text>
    <text x="20" y="100" font-size="11" font-weight="600" fill="${C.nt600}">▶ 혼자놀기 고수 영역</text>
  </g>
  <g transform="translate(620, 740)">
    <rect x="0" y="0" width="380" height="120" rx="12" fill="${C.nf50}" stroke="${C.nf600}" stroke-width="1"/>
    <text x="20" y="30" font-size="14" font-weight="800" fill="${C.nf700}">E형: 혼자 있을수록 방전된다</text>
    <text x="20" y="54" font-size="12" fill="${C.textSoft}">외부 자극 차단 시 에너지 급격히 감소.</text>
    <text x="20" y="74" font-size="12" fill="${C.textSoft}">6시간 넘으면 우울감·무기력 발생.</text>
    <text x="20" y="100" font-size="11" font-weight="600" fill="${C.nf600}">▶ 사교 필수 영역</text>
  </g>
  `);
}

// -----------------------------
// 06. RADAR CHART — 4 요소 비교
// -----------------------------
function radarChart() {
  const cx = 600, cy = 460, r = 220;
  const axes = ['내향성', '몰입력', '자기완결성', '상상력'];
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI / 4);
  const pt = (i, v) => ({
    x: cx + r * (v / 100) * Math.cos(angle(i)),
    y: cy + r * (v / 100) * Math.sin(angle(i)),
  });
  const intp = [92, 98, 90, 95];
  const esfj = [22, 38, 20, 35];
  const polyPath = (values) => values.map((v, i) => {
    const p = pt(i, v);
    return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(' ') + ' Z';
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">솔로 적응력 · 4대 요소 분석</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">1위 INTP vs 16위 ESFJ · 모든 축에서 정반대</text>
  <!-- grid circles -->
  ${[25, 50, 75, 100].map(v => `
    <circle cx="${cx}" cy="${cy}" r="${r * v / 100}" fill="none" stroke="${C.border}" stroke-width="1" stroke-dasharray="2 4"/>
    <text x="${cx + 4}" y="${cy - r * v / 100 + 4}" font-size="10" fill="${C.textFaint}" font-weight="500">${v}</text>
  `).join('')}
  <!-- axes -->
  ${axes.map((_, i) => {
    const p = pt(i, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="${C.border}" stroke-width="1.5"/>`;
  }).join('')}
  <!-- INTP polygon -->
  <path d="${polyPath(intp)}" fill="${C.nt600}" fill-opacity="0.22" stroke="${C.nt600}" stroke-width="3"/>
  ${intp.map((v, i) => {
    const p = pt(i, v);
    return `<circle cx="${p.x}" cy="${p.y}" r="6" fill="${C.nt600}"/>`;
  }).join('')}
  <!-- ESFJ polygon -->
  <path d="${polyPath(esfj)}" fill="${C.nf600}" fill-opacity="0.18" stroke="${C.nf600}" stroke-width="3" stroke-dasharray="6 3"/>
  ${esfj.map((v, i) => {
    const p = pt(i, v);
    return `<circle cx="${p.x}" cy="${p.y}" r="6" fill="${C.nf600}"/>`;
  }).join('')}
  <!-- axis labels -->
  ${axes.map((label, i) => {
    const p = pt(i, 128);
    return `<text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="16" font-weight="800" fill="${C.text}">${label}</text>`;
  }).join('')}
  <!-- value labels for INTP -->
  ${intp.map((v, i) => {
    const p = pt(i, v);
    const offset = i === 0 ? -18 : i === 2 ? 18 : 0;
    return `<text x="${p.x}" y="${p.y + offset}" text-anchor="middle" font-size="12" font-weight="700" fill="${C.nt700}">${v}</text>`;
  }).join('')}
  <!-- Legend -->
  <g transform="translate(240, 790)">
    <rect x="0" y="0" width="720" height="70" rx="12" fill="${C.card}" stroke="${C.border}"/>
    <rect x="30" y="25" width="30" height="18" fill="${C.nt600}" fill-opacity="0.22" stroke="${C.nt600}" stroke-width="2"/>
    <text x="75" y="30" font-size="14" font-weight="800" fill="${C.nt700}">INTP</text>
    <text x="75" y="52" font-size="11" font-weight="500" fill="${C.textMuted}">혼자놀기 1위 · 평균 94점</text>
    <rect x="400" y="25" width="30" height="18" fill="${C.nf600}" fill-opacity="0.18" stroke="${C.nf600}" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="445" y="30" font-size="14" font-weight="800" fill="${C.nf700}">ESFJ</text>
    <text x="445" y="52" font-size="11" font-weight="500" fill="${C.textMuted}">혼자놀기 16위 · 평균 29점</text>
  </g>
  `);
}

// -----------------------------
// 07. LEVELS PYRAMID
// -----------------------------
function levelsPyramid() {
  const levels = [
    { lv: 'Lv.3', name: '혼놀 마스터', desc: '창작·학습·자기성찰로 에너지를 생산', types: 'INTP · INFP · INTJ · INFJ', c: C.nt600, cDeep: C.nt700, cSoft: C.nt50,
      examples: ['장편 소설 집필', '독학으로 새 언어', '철학·명상 수련'] },
    { lv: 'Lv.2', name: '혼놀 중급자', desc: '취미·운동·독서로 루틴 유지', types: 'ISTP · ISFP · ISTJ · ISFJ', c: C.sj600, cDeep: C.sj700, cSoft: C.sj50,
      examples: ['독서 기록 앱', '혼자 등산·러닝', 'DIY·원예 취미'] },
    { lv: 'Lv.1', name: '혼놀 입문자', desc: '넷플릭스·SNS·게임 등 수동 소비', types: 'ENTP · ENFP · ESTP · 기타', c: C.sp600, cDeep: C.sp700, cSoft: C.sp50,
      examples: ['넷플릭스 몰아보기', 'SNS 무한 스크롤', '모바일 게임'] },
  ];
  // pyramid: base wider, top narrower
  const bottomW = 900, topW = 260, height = 480;
  const cx = 600;
  const layers = levels.map((l, i) => {
    // i=0 is top (Lv.3), i=2 is bottom (Lv.1)
    const yTop = 150 + (i * height / 3);
    const yBot = 150 + ((i + 1) * height / 3);
    const wTop = topW + (bottomW - topW) * (i / 3);
    const wBot = topW + (bottomW - topW) * ((i + 1) / 3);
    return { ...l, yTop, yBot, wTop, wBot };
  });
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">혼놀 레벨 피라미드</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">수동 소비 → 능동 창작으로 올라갈수록 삶의 질이 달라진다</text>
  ${layers.map((l, i) => {
    const path = `M ${cx - l.wTop/2} ${l.yTop} L ${cx + l.wTop/2} ${l.yTop} L ${cx + l.wBot/2} ${l.yBot} L ${cx - l.wBot/2} ${l.yBot} Z`;
    return `
    <path d="${path}" fill="${l.cSoft}" stroke="${l.c}" stroke-width="2.5"/>
    <text x="${cx - l.wTop/2 - 30}" y="${(l.yTop + l.yBot)/2 - 10}" text-anchor="end" font-size="22" font-weight="800" fill="${l.cDeep}">${l.lv}</text>
    <text x="${cx - l.wTop/2 - 30}" y="${(l.yTop + l.yBot)/2 + 14}" text-anchor="end" font-size="14" font-weight="600" fill="${l.cDeep}">${l.name}</text>
    <text x="${cx}" y="${(l.yTop + l.yBot)/2 - 14}" text-anchor="middle" font-size="14" font-weight="600" fill="${l.cDeep}">${l.types}</text>
    <text x="${cx}" y="${(l.yTop + l.yBot)/2 + 10}" text-anchor="middle" font-size="12" font-weight="500" fill="${C.textSoft}">${l.desc}</text>
    <text x="${cx}" y="${(l.yTop + l.yBot)/2 + 32}" text-anchor="middle" font-size="11" font-weight="500" fill="${C.textMuted}">예: ${l.examples.join(' · ')}</text>
    `;
  }).join('')}
  <!-- Arrow up -->
  <g transform="translate(1080, 150)">
    <line x1="20" y1="480" x2="20" y2="20" stroke="${C.textFaint}" stroke-width="2"/>
    <polygon points="20,0 12,18 28,18" fill="${C.textFaint}"/>
    <text x="50" y="480" font-size="11" font-weight="600" fill="${C.textMuted}">수동</text>
    <text x="50" y="20" font-size="11" font-weight="600" fill="${C.textMuted}">능동</text>
  </g>
  `);
}

// -----------------------------
// 08. KOREA SOLO CULTURE TREND
// -----------------------------
function koreaTrend() {
  const data = [
    { y: 2015, v: 27 },
    { y: 2016, v: 29 },
    { y: 2017, v: 31 },
    { y: 2018, v: 33 },
    { y: 2019, v: 35 },
    { y: 2020, v: 41 },
    { y: 2021, v: 46 },
    { y: 2022, v: 52 },
    { y: 2023, v: 58 },
    { y: 2024, v: 63 },
    { y: 2025, v: 68 },
    { y: 2026, v: 74 },
  ];
  const ox = 130, oy = 180, w = 940, h = 500;
  const xAt = (i) => ox + (i * w / (data.length - 1));
  const yAt = (v) => oy + h - (v / 80) * h;
  const pts = data.map((d, i) => `${xAt(i)},${yAt(d.v).toFixed(1)}`).join(' ');
  const areaPath = `M ${xAt(0)} ${yAt(data[0].v)} ` + data.map((d, i) => `L ${xAt(i)} ${yAt(d.v).toFixed(1)}`).join(' ') + ` L ${xAt(data.length - 1)} ${oy + h} L ${xAt(0)} ${oy + h} Z`;
  const events = [
    { y: 2017, label: '혼밥 트렌드 확산', offset: -40 },
    { y: 2020, label: '팬데믹 사회적 거리두기', offset: -40 },
    { y: 2022, label: 'MBTI 열풍', offset: -40 },
    { y: 2026, label: '메타센싱 · 필코노미', offset: -60 },
  ];
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">한국 '혼자 문화' 성장 추이 2015–2026</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">1인 가구 비율 (%) · 통계청 · 10년 새 2.7배 증가</text>
  <defs>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.nt600}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${C.nt600}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <!-- grid -->
  ${[0, 20, 40, 60, 80].map(v => `
    <line x1="${ox}" y1="${yAt(v)}" x2="${ox + w}" y2="${yAt(v)}" stroke="${C.border}" stroke-dasharray="3 3"/>
    <text x="${ox - 12}" y="${yAt(v) + 4}" text-anchor="end" font-size="11" fill="${C.textFaint}" font-weight="500">${v}%</text>
  `).join('')}
  ${data.map((d, i) => i % 1 === 0 ? `<text x="${xAt(i)}" y="${oy + h + 24}" text-anchor="middle" font-size="11" fill="${C.textMuted}" font-weight="500">${d.y}</text>` : '').join('')}
  <!-- axis -->
  <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy + h}" stroke="${C.textFaint}" stroke-width="1.5"/>
  <line x1="${ox}" y1="${oy + h}" x2="${ox + w}" y2="${oy + h}" stroke="${C.textFaint}" stroke-width="1.5"/>
  <!-- area -->
  <path d="${areaPath}" fill="url(#areaGrad)"/>
  <!-- line -->
  <polyline points="${pts}" fill="none" stroke="${C.nt600}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- points -->
  ${data.map((d, i) => `<circle cx="${xAt(i)}" cy="${yAt(d.v)}" r="5" fill="#fff" stroke="${C.nt600}" stroke-width="3"/>`).join('')}
  <!-- event markers -->
  ${events.map(e => {
    const i = data.findIndex(d => d.y === e.y);
    const d = data[i];
    return `
      <line x1="${xAt(i)}" y1="${yAt(d.v) - 8}" x2="${xAt(i)}" y2="${yAt(d.v) + e.offset}" stroke="${C.nf600}" stroke-width="1.5" stroke-dasharray="3 2"/>
      <rect x="${xAt(i) - 75}" y="${yAt(d.v) + e.offset - 30}" width="150" height="28" rx="6" fill="${C.nf600}"/>
      <text x="${xAt(i)}" y="${yAt(d.v) + e.offset - 11}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${e.label}</text>
    `;
  }).join('')}
  <!-- highlight 2026 -->
  <circle cx="${xAt(11)}" cy="${yAt(74)}" r="10" fill="${C.nt600}"/>
  <text x="${xAt(11) + 24}" y="${yAt(74) + 5}" font-size="18" font-weight="800" fill="${C.nt700}">74%</text>
  <!-- insight box -->
  <g transform="translate(130, 760)">
    <rect x="0" y="0" width="940" height="90" rx="12" fill="${C.nt50}" stroke="${C.nt600}" stroke-width="1"/>
    <text x="20" y="30" font-size="14" font-weight="800" fill="${C.nt700}">▶ 통찰: '혼자 놀기'는 이제 소수 취향이 아니라 주류 라이프스타일</text>
    <text x="20" y="54" font-size="13" font-weight="500" fill="${C.textSoft}">2015년 27% → 2026년 74%. 한국은 OECD 1인 가구 증가율 1위.</text>
    <text x="20" y="76" font-size="13" font-weight="500" fill="${C.textSoft}">혼자서도 잘 노는 능력은 이제 선택이 아닌 필수 생존 스킬이 됐다.</text>
  </g>
  `);
}

// -----------------------------
// 09. ISOLATION vs SOLITUDE
// -----------------------------
function isolationVsSolitude() {
  const iso = {
    title: '고립 (Isolation)',
    subtitle: '원치 않는 단절',
    color: C.nf600, soft: C.nf50, deep: C.nf700,
    traits: [
      { emoji: '✕', text: '수동적 · 무기력' },
      { emoji: '✕', text: '연결 단절감 · 외로움' },
      { emoji: '✕', text: '회피 · 두려움이 동기' },
      { emoji: '✕', text: '시간이 지나도 에너지 ↓' },
      { emoji: '✕', text: '우울·불안 위험 증가' },
    ],
    signal: '스스로 선택한 것이 아니면 = 위험 신호',
  };
  const sol = {
    title: '독립 (Solitude)',
    subtitle: '선택한 혼자 시간',
    color: C.nt600, soft: C.nt50, deep: C.nt700,
    traits: [
      { emoji: '✓', text: '능동적 · 창의적' },
      { emoji: '✓', text: '내면과의 연결감 · 충만' },
      { emoji: '✓', text: '성장 · 호기심이 동기' },
      { emoji: '✓', text: '시간이 지날수록 에너지 ↑' },
      { emoji: '✓', text: '자기이해·회복 촉진' },
    ],
    signal: '스스로 선택한 것이면 = 고도의 기술',
  };
  const cardW = 500, cardH = 620, gap = 40;
  const cards = [iso, sol];
  const startX = (1200 - (cardW * 2 + gap)) / 2;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">혼자 = 외로움? 천만에</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">'고립'과 '독립'은 같은 혼자라도 정반대의 상태</text>
  ${cards.map((k, i) => {
    const x = startX + i * (cardW + gap);
    const y = 135;
    return `
    <g>
      <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="20" fill="${k.soft}" stroke="${k.color}" stroke-width="2.5"/>
      <rect x="${x}" y="${y}" width="${cardW}" height="100" rx="20" fill="${k.color}"/>
      <rect x="${x}" y="${y + 80}" width="${cardW}" height="20" fill="${k.color}"/>
      <text x="${x + cardW/2}" y="${y + 45}" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">${k.title}</text>
      <text x="${x + cardW/2}" y="${y + 75}" text-anchor="middle" font-size="14" font-weight="500" fill="#fff" opacity="0.9">${k.subtitle}</text>
      ${k.traits.map((tr, j) => `
        <g transform="translate(${x + 30}, ${y + 140 + j * 60})">
          <circle cx="18" cy="20" r="18" fill="${k.color}"/>
          <text x="18" y="27" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">${tr.emoji}</text>
          <text x="52" y="27" font-size="15" font-weight="600" fill="${C.text}">${tr.text}</text>
        </g>
      `).join('')}
      <rect x="${x + 25}" y="${y + cardH - 80}" width="${cardW - 50}" height="58" rx="10" fill="${k.color}" fill-opacity="0.12" stroke="${k.color}" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="${x + cardW/2}" y="${y + cardH - 45}" text-anchor="middle" font-size="13" font-weight="700" fill="${k.deep}">${k.signal}</text>
    </g>`;
  }).join('')}
  <!-- VS divider -->
  <circle cx="600" cy="445" r="36" fill="${C.card}" stroke="${C.textFaint}" stroke-width="2"/>
  <text x="600" y="454" text-anchor="middle" font-size="20" font-weight="800" fill="${C.textSoft}">VS</text>
  `);
}

// -----------------------------
// 10. ACTIVITIES MATRIX (simplified heatmap)
// -----------------------------
function activitiesMatrix() {
  const activities = ['독서·학습', '혼자 산책', '창작·글쓰기', '게임', '영상 시청', '명상·사색'];
  const types = [
    { t: 'INTP', g: 'NT', scores: [5, 3, 4, 5, 4, 5] },
    { t: 'INTJ', g: 'NT', scores: [5, 4, 4, 4, 3, 5] },
    { t: 'INFJ', g: 'NF', scores: [5, 5, 5, 2, 3, 5] },
    { t: 'INFP', g: 'NF', scores: [5, 5, 5, 3, 4, 4] },
    { t: 'ISTJ', g: 'SJ', scores: [4, 4, 2, 3, 4, 3] },
    { t: 'ISFJ', g: 'SJ', scores: [3, 4, 3, 2, 4, 3] },
    { t: 'ISTP', g: 'SP', scores: [3, 4, 2, 5, 4, 3] },
    { t: 'ISFP', g: 'SP', scores: [3, 5, 5, 3, 4, 4] },
    { t: 'ENTP', g: 'NT', scores: [4, 2, 3, 4, 3, 3] },
    { t: 'ENTJ', g: 'NT', scores: [4, 2, 3, 3, 2, 2] },
    { t: 'ENFP', g: 'NF', scores: [3, 3, 4, 3, 3, 3] },
    { t: 'ENFJ', g: 'NF', scores: [3, 3, 3, 2, 3, 3] },
    { t: 'ESTP', g: 'SP', scores: [2, 2, 1, 5, 3, 1] },
    { t: 'ESTJ', g: 'SJ', scores: [3, 2, 2, 2, 2, 1] },
    { t: 'ESFP', g: 'SP', scores: [2, 2, 2, 4, 4, 1] },
    { t: 'ESFJ', g: 'SJ', scores: [2, 2, 2, 2, 3, 1] },
  ];
  const colorByGroup = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
  const cellW = 100, cellH = 36;
  const startX = 200, startY = 160;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">유형별 혼놀 활동 선호도</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">진할수록 해당 활동에 깊게 빠지는 유형 (1~5점)</text>
  <!-- column headers -->
  ${activities.map((a, i) => `
    <text x="${startX + cellW * (i + 0.5)}" y="${startY - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textSoft}">${a}</text>
  `).join('')}
  <!-- rows -->
  ${types.map((t, rowI) => `
    <g>
      <rect x="${startX - 90}" y="${startY + rowI * cellH}" width="80" height="${cellH - 4}" rx="6" fill="${colorByGroup[t.g]}" fill-opacity="0.12"/>
      <text x="${startX - 50}" y="${startY + rowI * cellH + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="${colorByGroup[t.g]}">${t.t}</text>
      ${t.scores.map((s, colI) => {
        const opacity = 0.15 + (s / 5) * 0.85;
        return `
          <rect x="${startX + colI * cellW + 4}" y="${startY + rowI * cellH + 2}" width="${cellW - 8}" height="${cellH - 8}" rx="4" fill="${colorByGroup[t.g]}" fill-opacity="${opacity}"/>
          <text x="${startX + colI * cellW + cellW/2}" y="${startY + rowI * cellH + 22}" text-anchor="middle" font-size="12" font-weight="700" fill="${s >= 4 ? '#fff' : C.textSoft}">${s}</text>
        `;
      }).join('')}
    </g>
  `).join('')}
  <!-- legend -->
  <g transform="translate(200, 785)">
    <text x="0" y="15" font-size="11" font-weight="700" fill="${C.textMuted}" letter-spacing="2">선호도 스케일</text>
    ${[1, 2, 3, 4, 5].map(n => `
      <rect x="${100 + (n - 1) * 40}" y="0" width="36" height="22" rx="4" fill="${C.nt600}" fill-opacity="${0.15 + (n / 5) * 0.85}"/>
      <text x="${100 + (n - 1) * 40 + 18}" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="${n >= 4 ? '#fff' : C.textSoft}">${n}</text>
    `).join('')}
    <text x="320" y="15" font-size="11" font-weight="500" fill="${C.textMuted}">1=관심 없음 · 5=깊이 몰입</text>
    <circle cx="600" cy="11" r="7" fill="${C.nt600}"/><text x="615" y="15" font-size="11" font-weight="600" fill="${C.textSoft}">NT</text>
    <circle cx="655" cy="11" r="7" fill="${C.nf600}"/><text x="670" y="15" font-size="11" font-weight="600" fill="${C.textSoft}">NF</text>
    <circle cx="710" cy="11" r="7" fill="${C.sj600}"/><text x="725" y="15" font-size="11" font-weight="600" fill="${C.textSoft}">SJ</text>
    <circle cx="765" cy="11" r="7" fill="${C.sp600}"/><text x="780" y="15" font-size="11" font-weight="600" fill="${C.textSoft}">SP</text>
  </g>
  `);
}

// -----------------------------
// 11. MASTER CHECKLIST
// -----------------------------
function checklist() {
  const items = [
    { n: '01', title: '정기적으로 스마트폰을 꺼둔다', desc: '하루 30분 이상 완전 차단 시간 확보' },
    { n: '02', title: '혼자만의 공간과 루틴이 있다', desc: '카페·책상 등 "내 자리"를 물리적으로 확보' },
    { n: '03', title: '한 번에 하나만 깊게 몰입한다', desc: '멀티태스킹보다 싱글태스킹 선호' },
    { n: '04', title: '결과물 없이도 과정을 즐긴다', desc: 'SNS 업로드 없이 그냥 재미있어서 한다' },
    { n: '05', title: '무료함을 불편해하지 않는다', desc: '자극 없이도 5분 이상 편안하게 있을 수 있다' },
    { n: '06', title: '나만의 취향을 알고 있다', desc: '추천·유행 없이 내가 좋아하는 것을 고를 수 있다' },
    { n: '07', title: '생각과 감정을 기록한다', desc: '일기·메모·노션 등 어떤 형태든 좋다' },
    { n: '08', title: '혼자 식당·영화관에 갈 수 있다', desc: '타인의 시선을 불편해하지 않는다' },
    { n: '09', title: '사람을 그리워할 줄도 안다', desc: '혼자를 택하지만 고립은 피하는 균형감' },
    { n: '10', title: '창작·학습에 시간을 쓴다', desc: '소비보다 생산의 비중이 절반은 넘는다' },
  ];
  const cardW = 500, cardH = 90, gap = 14;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">혼놀 고수 체크리스트 · 10가지</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">8개 이상 YES면 당신은 이미 혼놀 상위 10%</text>
  ${items.map((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * (cardW + 40);
    const y = 140 + row * (cardH + gap);
    return `
    <g>
      <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="12" fill="${C.card}" stroke="${C.border}" stroke-width="1.5"/>
      <rect x="${x}" y="${y}" width="6" height="${cardH}" rx="3" fill="${C.nt600}"/>
      <rect x="${x + 22}" y="${y + 22}" width="44" height="44" rx="10" fill="${C.nt50}" stroke="${C.nt600}" stroke-width="1.5"/>
      <text x="${x + 44}" y="${y + 51}" text-anchor="middle" font-size="16" font-weight="800" fill="${C.nt700}">${it.n}</text>
      <text x="${x + 80}" y="${y + 40}" font-size="15" font-weight="700" fill="${C.text}">${it.title}</text>
      <text x="${x + 80}" y="${y + 64}" font-size="12" font-weight="500" fill="${C.textMuted}">${it.desc}</text>
      <!-- checkbox -->
      <rect x="${x + cardW - 50}" y="${y + 30}" width="28" height="28" rx="6" fill="${C.nt50}" stroke="${C.nt600}" stroke-width="2"/>
      <path d="M ${x + cardW - 43} ${y + 44} l 5 5 l 10 -12" fill="none" stroke="${C.nt600}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }).join('')}
  <!-- score band -->
  <g transform="translate(160, 790)">
    <rect x="0" y="0" width="880" height="60" rx="12" fill="${C.nt50}" stroke="${C.nt600}" stroke-width="1"/>
    <text x="30" y="24" font-size="13" font-weight="800" fill="${C.nt700}">당신의 점수는?</text>
    <text x="30" y="44" font-size="12" font-weight="500" fill="${C.textSoft}">0~3 입문자  ·  4~7 중급자  ·  8~9 고수  ·  10 마스터 (INTP 수준)</text>
  </g>
  `);
}

// -----------------------------
// 12. BALANCE FLOW (3 steps)
// -----------------------------
function balanceFlow() {
  const steps = [
    { n: '01', title: '혼자 시간 확보', sub: 'Self-recovery', desc: 'I 주기능 회복\n에너지 재충전', c: C.nt600, cSoft: C.nt50, cDeep: C.nt700 },
    { n: '02', title: '핵심 관계만 선별', sub: 'Curated-social', desc: '신뢰 가능한\n소수와의 깊은 교류', c: C.sj600, cSoft: C.sj50, cDeep: C.sj700 },
    { n: '03', title: '유연한 전환', sub: 'Flexible-switch', desc: '에너지 상태 따라\n혼자 ↔ 같이 자유 전환', c: C.sp600, cSoft: C.sp50, cDeep: C.sp700 },
  ];
  const boxW = 300, boxH = 320, gap = 60;
  const startX = (1200 - (boxW * 3 + gap * 2)) / 2;
  return wrap(`
  <text x="600" y="58" text-anchor="middle" font-size="32" font-weight="800" fill="${C.text}">혼자도 · 같이도 잘 노는 3단계</text>
  <text x="600" y="90" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textMuted}">고립도 의존도 아닌, 건강한 관계 설계법</text>
  ${steps.map((s, i) => {
    const x = startX + i * (boxW + gap);
    const y = 190;
    return `
    <g>
      <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="20" fill="${s.cSoft}" stroke="${s.c}" stroke-width="2.5"/>
      <!-- step number circle -->
      <circle cx="${x + boxW/2}" cy="${y - 5}" r="40" fill="${s.c}"/>
      <text x="${x + boxW/2}" y="${y + 10}" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">${s.n}</text>
      <!-- content -->
      <text x="${x + boxW/2}" y="${y + 95}" text-anchor="middle" font-size="12" font-weight="600" fill="${s.cDeep}" letter-spacing="3">STEP ${s.n}</text>
      <text x="${x + boxW/2}" y="${y + 140}" text-anchor="middle" font-size="24" font-weight="800" fill="${s.cDeep}">${s.title}</text>
      <text x="${x + boxW/2}" y="${y + 170}" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}" font-style="italic">${s.sub}</text>
      <!-- description (2 lines) -->
      ${s.desc.split('\n').map((line, j) => `
        <text x="${x + boxW/2}" y="${y + 230 + j * 28}" text-anchor="middle" font-size="15" font-weight="600" fill="${C.textSoft}">${line}</text>
      `).join('')}
    </g>
    ${i < steps.length - 1 ? `
      <!-- arrow between -->
      <g transform="translate(${x + boxW}, ${y + boxH/2})">
        <line x1="0" y1="0" x2="${gap - 20}" y2="0" stroke="${C.textFaint}" stroke-width="3"/>
        <polygon points="${gap - 20},0 ${gap - 30},-8 ${gap - 30},8" fill="${C.textFaint}"/>
      </g>
    ` : ''}
    `;
  }).join('')}
  <!-- bottom insight -->
  <g transform="translate(150, 720)">
    <rect x="0" y="0" width="900" height="120" rx="16" fill="${C.card}" stroke="${C.border}" stroke-width="1.5"/>
    <text x="30" y="35" font-size="14" font-weight="800" fill="${C.text}">핵심 원칙 · Solo 70 : Social 30</text>
    <text x="30" y="62" font-size="13" font-weight="500" fill="${C.textSoft}">혼놀 고수일수록 혼자 시간 70%, 타인과 시간 30%의 비율을 유지한다.</text>
    <text x="30" y="82" font-size="13" font-weight="500" fill="${C.textSoft}">이 균형이 깨지면 외로움(혼자 &gt;90%) 또는 에너지 고갈(혼자 &lt;40%)로 이어진다.</text>
    <text x="30" y="104" font-size="12" font-weight="600" fill="${C.nt700}">▶ 자기 에너지를 관찰하는 습관 = 메타센싱(2026 메가트렌드)</text>
  </g>
  `);
}

// -----------------------------
// WRITE & CONVERT ALL
// -----------------------------
const images = [
  { name: 'solo-01-hero', svg: hero() },
  { name: 'solo-02-ranking', svg: ranking() },
  { name: 'solo-03-top3-cards', svg: top3Cards() },
  { name: 'solo-04-temperament-donut', svg: temperamentDonut() },
  { name: 'solo-05-energy-curve', svg: energyCurve() },
  { name: 'solo-06-radar', svg: radarChart() },
  { name: 'solo-07-levels-pyramid', svg: levelsPyramid() },
  { name: 'solo-08-korea-trend', svg: koreaTrend() },
  { name: 'solo-09-isolation-vs-solitude', svg: isolationVsSolitude() },
  { name: 'solo-10-activities', svg: activitiesMatrix() },
  { name: 'solo-11-checklist', svg: checklist() },
  { name: 'solo-12-balance', svg: balanceFlow() },
];

console.log(`Generating ${images.length} infographics...\n`);
for (const img of images) {
  const svgPath = `${OUT_DIR}/${img.name}.svg`;
  const webpPath = `${OUT_DIR}/${img.name}.webp`;
  const pngPath = `${OUT_DIR}/${img.name}.png`;
  fs.writeFileSync(svgPath, img.svg);
  const buf = Buffer.from(img.svg);
  const webpInfo = await sharp(buf, { density: 200 }).resize(1200, null).webp({ quality: 88 }).toFile(webpPath);
  const pngInfo = await sharp(buf, { density: 200 }).resize(1200, null).png().toFile(pngPath);
  console.log(`✓ ${img.name}  SVG ${(img.svg.length/1024).toFixed(1)}KB  WebP ${Math.round(webpInfo.size/1024)}KB  PNG ${Math.round(pngInfo.size/1024)}KB`);
}

console.log(`\nDone. ${images.length} SVG + ${images.length} WebP + ${images.length} PNG files written to ${OUT_DIR}/`);
