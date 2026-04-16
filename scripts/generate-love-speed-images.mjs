// Generate infographics for "MBTI 연애 속도 순위 — 금사빠부터 J병까지"
// Output: public/blog/love-speed-{name}.{svg,webp}
//
// Image set (7):
//   01 hero            - 브랜드 히어로
//   02 speed-ranking   - 16유형 연애 속도 TOP 16 (첫 만남~연애 확정 평균 일수)
//   03 fall-curve      - 4기질 × 호감→사랑 감정 곡선
//   04 red-flag        - 속도별 위험 신호 (금사빠 zone vs J병 zone)
//   05 couple-matrix   - 속도 × 속도 커플 케미 4×4 히트맵
//   06 language-map    - 유형별 호감 표현 언어 매핑
//   07 balance-guide   - 기질별 건강한 속도 조절 체크리스트

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
  love: '#ec4899', loveSoft: '#fce7f3', loveDeep: '#be185d',
  danger: '#dc2626', warn: '#f59e0b', safe: '#16a34a',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · MBTI 연애 시리즈</text>
</svg>`;

const COLOR_OF = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
const BG_OF = { NT: C.nt50, NF: C.nf50, SJ: C.sj50, SP: C.sp50 };

const GROUP_OF = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

// ---------- 01 HERO ----------
function hero() {
  return wrap(`
  <defs>
    <radialGradient id="hG" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fdf2f8"/>
    </radialGradient>
    <linearGradient id="heartG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- Scattered hearts with MBTI types (floating) -->
  ${[
    { t: 'ENFP', x: 180, y: 230, s: 1.2, c: C.nf500, label: '금사빠' },
    { t: 'ESFP', x: 1030, y: 210, s: 1.1, c: C.sp500, label: '즉흥빠짐' },
    { t: 'INTJ', x: 200, y: 680, s: 1.0, c: C.nt600, label: '5단계 검증' },
    { t: 'ISTJ', x: 1020, y: 700, s: 1.0, c: C.sj600, label: 'J병' },
    { t: 'INFP', x: 130, y: 440, s: 0.9, c: C.nf600, label: '짝사랑' },
    { t: 'ENTP', x: 1080, y: 450, s: 0.9, c: C.nt500, label: '재밌으면 훅' },
  ].map(b => `
    <g transform="translate(${b.x},${b.y}) scale(${b.s})">
      <path d="M0,-30 C-24,-60 -60,-40 -60,-10 C-60,30 0,55 0,55 C0,55 60,30 60,-10 C60,-40 24,-60 0,-30 Z" fill="${b.c}" opacity="0.15"/>
      <path d="M0,-26 C-20,-52 -52,-35 -52,-8 C-52,26 0,48 0,48 C0,48 52,26 52,-8 C52,-35 20,-52 0,-26 Z" fill="${b.c}"/>
      <text x="0" y="5" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">${b.t}</text>
      <text x="0" y="74" text-anchor="middle" font-size="12" font-weight="700" fill="${b.c}">${b.label}</text>
    </g>
  `).join('')}

  <!-- Center card -->
  <rect x="140" y="240" width="920" height="420" rx="32" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="305" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">MBTI · LOVE SPEED · 2026</text>
  <text x="600" y="400" text-anchor="middle" font-size="74" font-weight="900" fill="${C.text}">MBTI 연애 속도 순위</text>
  <text x="600" y="460" text-anchor="middle" font-size="36" font-weight="800" fill="${C.love}">금사빠부터 J병까지</text>
  <line x1="380" y1="495" x2="820" y2="495" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="535" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">첫 만남 → 연애 확정 · 16유형 랭킹</text>
  <text x="600" y="572" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">인지기능 + 4기질 감정 돌입 속도 분석</text>
  <text x="600" y="615" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textFaint}">© 192types · ENFP 박서연의 현장 리포트</text>
  `);
}

// ---------- 02 SPEED RANKING ----------
function speedRanking() {
  // days to "confirmed dating" from first meeting — lower = faster
  const ranking = [
    { t: 'ENFP', d: 9,   desc: '호감 → 올인 풀스윙' },
    { t: 'ESFP', d: 11,  desc: '지금 이 순간에 빠짐' },
    { t: 'ENTP', d: 14,  desc: '재밌으면 그 날 훅' },
    { t: 'ESTP', d: 16,  desc: '끌리면 바로 행동' },
    { t: 'ENFJ', d: 22,  desc: '확신 서면 올인' },
    { t: 'ISFP', d: 28,  desc: '조용히 빠르게' },
    { t: 'ESFJ', d: 32,  desc: '상호 호감 확인 후 돌진' },
    { t: 'ISTP', d: 40,  desc: '말 없이 관찰 후 결심' },
    { t: 'INFP', d: 48,  desc: '짝사랑 기간 김' },
    { t: 'ENTJ', d: 52,  desc: '조건·호감 계산 후 결정' },
    { t: 'INTP', d: 68,  desc: '분석 끝나야 고백' },
    { t: 'ESTJ', d: 74,  desc: '미래 그림 맞아야' },
    { t: 'ISFJ', d: 96,  desc: '진심 확인 여러 번' },
    { t: 'INFJ', d: 118, desc: '영혼 점검 통과해야' },
    { t: 'ISTJ', d: 142, desc: '검증된 루틴만' },
    { t: 'INTJ', d: 168, desc: '5단계 시뮬레이션 후' },
  ];
  const MAX = 180;
  const left = 210;
  const right = 1040;
  const barW = right - left;
  const top = 105;
  const rowH = 45;
  const tiers = [
    { name: '⚡ 금사빠 Zone',   from: 0, to: 3,   color: C.nf500 },
    { name: '⚖ 균형 Zone',     from: 4, to: 11,  color: C.sp600 },
    { name: '🔒 J병 Zone',      from: 12, to: 15, color: C.nt600 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">16유형 연애 속도 랭킹 — 첫 만남 → 연애 확정까지 평균 일수</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">낮을수록 금사빠, 높을수록 신중 · 박서연 데이터 리포트 N=412 + 인지기능 보정</text>

  ${ranking.map((r, i) => {
    const y = top + i * rowH;
    const w = Math.max(40, (r.d / MAX) * barW);
    const tier = tiers.find(t => i >= t.from && i <= t.to);
    const g = GROUP_OF[r.t];
    return `
      <text x="45" y="${y + 28}" font-size="20" font-weight="700" fill="${C.textMuted}">${String(i + 1).padStart(2, '0')}</text>
      <text x="85" y="${y + 28}" font-size="22" font-weight="800" fill="${COLOR_OF[g]}">${r.t}</text>
      <rect x="${left}" y="${y + 10}" width="${w}" height="26" rx="13" fill="${tier.color}" opacity="0.88"/>
      <text x="${left + w - 10}" y="${y + 28}" text-anchor="end" font-size="18" font-weight="800" fill="#fff">${r.d}일</text>
      <text x="${left + w + 14}" y="${y + 28}" font-size="17" font-weight="600" fill="${C.textSoft}">${r.desc}</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(280, 830)">
    ${tiers.map((t, i) => `
      <rect x="${i * 210}" y="0" width="14" height="14" rx="3" fill="${t.color}"/>
      <text x="${i * 210 + 22}" y="12" font-size="17" font-weight="700" fill="${C.textSoft}">${t.name}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 03 FALL CURVE (4 temperaments) ----------
function fallCurve() {
  const W = 1200, H = 900;
  const groups = [
    { name: '다혈질 (Sanguine) · ENFP·ESFP·ESFJ·ENFJ', color: C.nf500,
      desc: '폭발적 상승 → 빠른 정점 → 유지 난이도',
      curve: 'spike' },
    { name: '담즙질 (Choleric) · ENTJ·ESTJ·ENTP·ESTP', color: C.nt600,
      desc: '조건 확인 후 급가속 → 안정',
      curve: 'step' },
    { name: '점액질 (Phlegmatic) · ISFJ·ISTJ·INFP·ISFP', color: C.sj600,
      desc: '완만 상승 → 장기 유지',
      curve: 'slow' },
    { name: '우울질 (Melancholic) · INTJ·INFJ·ISTP·INTP', color: C.nt700,
      desc: '저강도 관찰 → 확신 후 깊이 몰입',
      curve: 'late' },
  ];

  const cardW = 520, cardH = 310;
  const positions = [
    { x: 60,  y: 110 },
    { x: 620, y: 110 },
    { x: 60,  y: 470 },
    { x: 620, y: 470 },
  ];

  const makeCurve = (type, color) => {
    // viewbox inside card: 0..480 x, 0..180 y (y=180 bottom, y=0 top)
    if (type === 'spike') {
      return `<path d="M20,180 Q50,180 80,60 Q120,10 160,20 Q260,60 360,90 Q420,110 460,100" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'step') {
      return `<path d="M20,180 L120,170 L180,150 Q220,80 280,50 L460,45" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'slow') {
      return `<path d="M20,180 Q140,170 220,140 Q320,100 460,50" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'late') {
      return `<path d="M20,180 L180,175 L260,170 Q310,130 340,90 Q400,30 460,25" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    return '';
  };

  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">4기질별 "호감 → 사랑" 감정 곡선</text>
  <text x="600" y="82" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">같은 MBTI여도 기질에 따라 빠지는 속도와 모양이 완전히 달라져</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <text x="28" y="40" font-size="24" font-weight="800" fill="${g.color}">${g.name}</text>
        <text x="28" y="65" font-size="17" font-weight="500" fill="${C.textMuted}">${g.desc}</text>
        <!-- Chart axes -->
        <g transform="translate(28, 95)">
          <line x1="0" y1="180" x2="470" y2="180" stroke="${C.divider}"/>
          <line x1="0" y1="0" x2="0" y2="180" stroke="${C.divider}"/>
          <text x="-8" y="8" text-anchor="end" font-size="14" fill="${C.textFaint}">몰입</text>
          <text x="465" y="198" text-anchor="end" font-size="14" fill="${C.textFaint}">시간 →</text>
          <!-- grid -->
          <line x1="0" y1="45" x2="470" y2="45" stroke="${C.bgSoft}"/>
          <line x1="0" y1="90" x2="470" y2="90" stroke="${C.bgSoft}"/>
          <line x1="0" y1="135" x2="470" y2="135" stroke="${C.bgSoft}"/>
          ${makeCurve(g.curve, g.color)}
        </g>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 RED FLAG ZONES ----------
function redFlag() {
  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">연애 속도별 위험 신호 — 금사빠 Zone vs J병 Zone</text>
  <text x="600" y="82" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">너무 빠른 것도, 너무 느린 것도 각자의 패턴으로 무너져</text>

  <!-- Left: Too fast -->
  <g transform="translate(60,120)">
    <rect width="530" height="700" rx="20" fill="${C.nf50}" stroke="${C.nf500}"/>
    <text x="28" y="50" font-size="31" font-weight="800" fill="${C.nf700}">⚡ 너무 빠름 — 금사빠 Zone</text>
    <text x="28" y="78" font-size="18" font-weight="600" fill="${C.textSoft}">ENFP · ESFP · ENTP · ESTP · ENFJ · ISFP</text>

    ${[
      { icon: '💥', title: '즉시 올인', desc: '3일 안에 "내 평생 사람"이라 말함. 근데 3주 뒤엔 "그냥 우린 안 맞았어".' },
      { icon: '🌀', title: '감정 롤러코스터', desc: '좋을 때 하루 50번 연락, 식으면 하루 0번. 상대가 롤러코스터 멀미 해.' },
      { icon: '🎭', title: '상대를 이상화', desc: '상대의 실제 모습보다 "내가 만든 이미지"에 반함. 현실이 보이면 식어.' },
      { icon: '💸', title: '충동적 이벤트', desc: '첫 주에 1박 여행, 커플템, 커플링. 기반 없는 관계에 투자만 쌓여.' },
      { icon: '📉', title: '빠른 회복 → 또 빠짐', desc: '이별 1주 뒤 다음 사람. 민지가 제일 걱정하는 패턴이야.' },
      { icon: '🚨', title: 'SNS 공개 과속', desc: '사귄 지 2주차에 커플샷 업로드. 3주차에 비공개 전환 루틴.' },
    ].map((d, i) => `
      <g transform="translate(28, ${115 + i * 90})">
        <text x="0" y="26" font-size="36">${d.icon}</text>
        <text x="46" y="20" font-size="21" font-weight="800" fill="${C.nf700}">${d.title}</text>
        <text x="46" y="44" font-size="17" font-weight="500" fill="${C.textSoft}">${d.desc.slice(0, 38)}</text>
        <text x="46" y="62" font-size="17" font-weight="500" fill="${C.textSoft}">${d.desc.slice(38)}</text>
      </g>
    `).join('')}
  </g>

  <!-- Right: Too slow -->
  <g transform="translate(610,120)">
    <rect width="530" height="700" rx="20" fill="${C.nt50}" stroke="${C.nt600}"/>
    <text x="28" y="50" font-size="31" font-weight="800" fill="${C.nt700}">🔒 너무 느림 — J병 Zone</text>
    <text x="28" y="78" font-size="18" font-weight="600" fill="${C.textSoft}">INTJ · ISTJ · INFJ · ISFJ · ESTJ · INTP</text>

    ${[
      { icon: '🧮', title: '과도한 조건 검증', desc: '가치관 · 재정 · 가족관 3번씩 확인. 상대는 "면접 보는 것 같다".' },
      { icon: '⏳', title: '표현 지연', desc: '마음 있으면서 100일 넘게 "그냥 친구". 상대는 질려서 떠남.' },
      { icon: '📐', title: '완벽 타이밍 고집', desc: '"아직 준비 안 됐어"를 반복. 준비는 영원히 완성 안 돼.' },
      { icon: '🧊', title: '감정 표현 최소화', desc: '좋은데 "응, 괜찮은 것 같아"로 표현. 상대는 호감 읽지 못함.' },
      { icon: '🔄', title: '재확인 루프', desc: '사귄 뒤에도 "정말 이 사람 맞을까?" 3개월마다 재검토.' },
      { icon: '🗂', title: '플랜 공유 지연', desc: '이미 100일인데 부모님 소개·여행 계획 전부 "나중에".' },
    ].map((d, i) => `
      <g transform="translate(28, ${115 + i * 90})">
        <text x="0" y="26" font-size="36">${d.icon}</text>
        <text x="46" y="20" font-size="21" font-weight="800" fill="${C.nt700}">${d.title}</text>
        <text x="46" y="44" font-size="17" font-weight="500" fill="${C.textSoft}">${d.desc.slice(0, 38)}</text>
        <text x="46" y="62" font-size="17" font-weight="500" fill="${C.textSoft}">${d.desc.slice(38)}</text>
      </g>
    `).join('')}
  </g>
  `);
}

// ---------- 05 COUPLE SPEED COMPAT HEATMAP ----------
function coupleMatrix() {
  const speeds = ['금사빠', '빠름', '균형', '신중'];
  // 4x4 heatmap scores (0~100), self = 중립 구역
  const matrix = [
    // 금사빠 × [금사빠, 빠름, 균형, 신중]
    [42, 68, 82, 52],
    // 빠름
    [70, 78, 84, 70],
    // 균형
    [84, 86, 90, 78],
    // 신중
    [54, 72, 80, 66],
  ];
  const labels = [
    ['폭풍→번아웃', '단기 스파크', '베스트', '케미 기대'],
    ['단기 스파크', '균형의 재미', '상위 궁합', '성장 페어'],
    ['베스트', '상위 궁합', '이상적 조합', '장기 파트너'],
    ['케미 기대', '성장 페어', '장기 파트너', '안정 루틴'],
  ];
  const cell = 160;
  const originX = 210;
  const originY = 200;

  const colorFor = (v) => {
    if (v >= 85) return C.safe;
    if (v >= 75) return '#22c55e';
    if (v >= 65) return '#84cc16';
    if (v >= 55) return C.warn;
    return C.danger;
  };

  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">연애 속도 × 속도 커플 궁합 히트맵</text>
  <text x="600" y="82" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">4가지 속도 × 4가지 속도 = 16가지 커플 케미 (100점 만점)</text>

  <!-- Axes -->
  <text x="110" y="190" font-size="20" font-weight="700" fill="${C.textMuted}">상대 →</text>
  <text x="${originX - 30}" y="180" font-size="20" font-weight="700" fill="${C.textMuted}" text-anchor="end">↓ 나</text>

  ${speeds.map((s, i) => `
    <text x="${originX + i * cell + cell / 2}" y="190" text-anchor="middle" font-size="20" font-weight="700" fill="${C.textSoft}">${s}</text>
    <text x="${originX - 16}" y="${originY + i * cell + cell / 2 + 5}" text-anchor="end" font-size="20" font-weight="700" fill="${C.textSoft}">${s}</text>
  `).join('')}

  ${matrix.map((row, r) => row.map((v, c) => `
    <rect x="${originX + c * cell}" y="${originY + r * cell}" width="${cell - 6}" height="${cell - 6}" rx="12" fill="${colorFor(v)}" opacity="0.9"/>
    <text x="${originX + c * cell + (cell - 6) / 2}" y="${originY + r * cell + 52}" text-anchor="middle" font-size="45" font-weight="800" fill="#fff">${v}</text>
    <text x="${originX + c * cell + (cell - 6) / 2}" y="${originY + r * cell + 82}" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff" opacity="0.95">${labels[r][c].slice(0, 8)}</text>
    <text x="${originX + c * cell + (cell - 6) / 2}" y="${originY + r * cell + 100}" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff" opacity="0.95">${labels[r][c].slice(8)}</text>
  `).join('')).join('')}

  <!-- Bottom description -->
  <g transform="translate(210, 860)">
    <text x="0" y="12" font-size="17" font-weight="600" fill="${C.textSoft}">· 균형 × 균형 (90점) 최고 · 신중 × 신중 (66점) 안정 · 금사빠 × 금사빠 (42점) 위험</text>
  </g>
  `);
}

// ---------- 06 LANGUAGE MAP ----------
function languageMap() {
  const items = [
    { t: 'INTJ', g: 'NT', lang: '"같이 5년 계획 짜볼래?" · 미래 시뮬레이션 초대' },
    { t: 'INTP', g: 'NT', lang: '"이 이론 어떻게 생각해?" · 지적 공명 확인' },
    { t: 'ENTJ', g: 'NT', lang: '"너 스펙 좋네. 식사 한번 하자." · 효율적 직진' },
    { t: 'ENTP', g: 'NT', lang: '"너 말하는 거 재밌어" · 뇌풀이 공유' },
    { t: 'INFJ', g: 'NF', lang: '"너 왜 그때 그렇게 말했어?" · 영혼 해독' },
    { t: 'INFP', g: 'NF', lang: '"너 덕분에 이 노래가 달라졌어" · 감정 각인' },
    { t: 'ENFJ', g: 'NF', lang: '"넌 어떤 사람이 되고 싶어?" · 성장 동반자 제안' },
    { t: 'ENFP', g: 'NF', lang: '"이거 봤어? 너 생각났어" · 세상의 모든 걸 너로 연결' },
    { t: 'ISTJ', g: 'SJ', lang: '"이번 달 일정표 공유할게" · 루틴 안에 자리 마련' },
    { t: 'ISFJ', g: 'SJ', lang: '"너 감기 걸릴 것 같아" · 돌봄의 촉' },
    { t: 'ESTJ', g: 'SJ', lang: '"우리 3개월 후에 이거 같이 하자" · 계획 공유' },
    { t: 'ESFJ', g: 'SJ', lang: '"네 친구들도 다 초대할게" · 관계망 통합' },
    { t: 'ISTP', g: 'SP', lang: '(차 고쳐줌, 짐 들어줌) · 행동이 곧 고백' },
    { t: 'ISFP', g: 'SP', lang: '"네 사진 찍어도 돼?" · 감각적 기록 요청' },
    { t: 'ESTP', g: 'SP', lang: '"지금 나올래?" · 즉흥 만남 제안' },
    { t: 'ESFP', g: 'SP', lang: '"야 나 오늘 너무 재밌어" · 감정 즉시 방출' },
  ];
  const col = 2;
  const rowH = 78;

  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">유형별 호감 표현 언어 사전</text>
  <text x="600" y="82" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">"이거 관심 있다는 뜻이야" 16가지 모드 · 놓치지 말고 해석해</text>

  ${items.map((it, i) => {
    const r = i % 8;
    const c = i < 8 ? 0 : 1;
    const x = 60 + c * 580;
    const y = 115 + r * rowH;
    return `
      <rect x="${x}" y="${y}" width="555" height="66" rx="12" fill="${BG_OF[it.g]}" stroke="${C.border}"/>
      <rect x="${x}" y="${y}" width="6" height="66" rx="3" fill="${COLOR_OF[it.g]}"/>
      <text x="${x + 22}" y="${y + 28}" font-size="22" font-weight="800" fill="${COLOR_OF[it.g]}">${it.t}</text>
      <text x="${x + 22}" y="${y + 51}" font-size="17" font-weight="600" fill="${C.textSoft}">${it.lang}</text>
    `;
  }).join('')}
  `);
}

// ---------- 07 BALANCE GUIDE ----------
function balanceGuide() {
  const tips = [
    { name: '다혈질 (Sanguine)', color: C.nf500, icon: '🔥', types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 첫 2주 금지 리스트 세팅 — 커플링·여행·SNS 공개',
        '② 호감 강도 일기 — 매일 "오늘 상대에 대한 감정" 기록',
        '③ 3주 쿨다운 규칙 — 결정적 선언은 3주 뒤로',
        '④ 현실 확인 체크리스트 — 상대가 정말 지금 상황에 맞는지' ] },
    { name: '담즙질 (Choleric)', color: C.nt600, icon: '🎯', types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 조건 체크 횟수 제한 — 3번 확인했으면 결정',
        '② 효율 함정 경계 — 사랑은 ROI로 재지 않음',
        '③ 표현 스케줄링 — 감정 표현도 일정에 넣어야 함',
        '④ 상대 페이스 존중 — 내 속도에 끌려오지 않는 사람도 있음' ] },
    { name: '점액질 (Phlegmatic)', color: C.sj600, icon: '🌿', types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 표현 연습 — "좋다"는 말 입 밖으로 꺼내기',
        '② 관계 진도 체크포인트 — 30·60·90일에 상태 업데이트',
        '③ 거절/수락 시간 제한 — 2주 내 명확한 의사 표시',
        '④ 참고 싫음을 기록 — 쌓이기 전에 공유' ] },
    { name: '우울질 (Melancholic)', color: C.nt700, icon: '🌙', types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 최악 시나리오 점검은 1회만 — 반복은 관계의 독',
        '② "확신 없음 = 그만둬야 함" 공식 버리기',
        '③ 작은 고백 연습 — "네 말이 좋았어" 수준부터',
        '④ 침묵 대신 1문장 공유 — 해석 여지를 줄여라' ] },
  ];

  const posW = 520, posH = 320;
  const positions = [
    { x: 70,  y: 115 },
    { x: 620, y: 115 },
    { x: 70,  y: 470 },
    { x: 620, y: 470 },
  ];

  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">기질별 건강한 연애 속도 체크리스트</text>
  <text x="600" y="82" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">네 기질 유형의 과속/저속 루틴을 잡아줄 실전 4단계</text>

  ${positions.map((p, i) => {
    const t = tips[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${posW}" height="${posH}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${posH}" rx="4" fill="${t.color}"/>
        <text x="28" y="42" font-size="28" font-weight="800" fill="${t.color}">${t.icon} ${t.name}</text>
        <text x="28" y="66" font-size="17" font-weight="600" fill="${C.textMuted}">${t.types}</text>
        ${t.items.map((it, j) => `
          <text x="28" y="${110 + j * 48}" font-size="18" font-weight="600" fill="${C.textSoft}">${it}</text>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- RUNNER ----------
const items = [
  { name: 'love-speed-01-hero', svg: hero() },
  { name: 'love-speed-02-ranking', svg: speedRanking() },
  { name: 'love-speed-03-fall-curve', svg: fallCurve() },
  { name: 'love-speed-04-red-flag', svg: redFlag() },
  { name: 'love-speed-05-couple-matrix', svg: coupleMatrix() },
  { name: 'love-speed-06-language-map', svg: languageMap() },
  { name: 'love-speed-07-balance-guide', svg: balanceGuide() },
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
    const svgKB = (fs.statSync(svgPath).size / 1024).toFixed(1);
    const webpKB = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${it.name}  svg=${svgKB}KB  webp=${webpKB}KB`);
  }
  console.log(`\n✅ Generated ${items.length} infographics → ${OUT_DIR}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
