// Generate infographics for "MBTI 이별 회복 속도 순위 — 금사빠 ENFP부터 장기간 여운 INFJ까지"
// Output: public/blog/breakup-{name}.{svg,webp}
//
// Image set (6):
//   01 hero            - 브랜드 히어로
//   02 ranking         - 16유형 이별 회복 기간 랭킹
//   03 reaction-types  - 4가지 이별 반응 유형 (울음/분석/은둔/새사람)
//   04 doorslam-map    - 도어슬램 위험도 16유형 매트릭스
//   05 reconnect-heat  - 재결합 확률 × 회복 단계 히트맵
//   06 ritual          - 기질별 이별 극복 루틴

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
  divider: '#d1d5db',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  pain: '#be185d', painSoft: '#fce7f3',
  cool: '#0369a1',
  safe: '#16a34a', mid: '#84cc16', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 이별 회복 리포트</text>
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
    <radialGradient id="hG" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fff"/>
      <stop offset="100%" stop-color="#fdf2f8"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- Broken hearts scattered -->
  ${[
    { t: 'ESTP', x: 180, y: 220, c: C.sp500, days: '2일' },
    { t: 'ENTP', x: 1020, y: 230, c: C.nt500, days: '4일' },
    { t: 'ENFP', x: 160, y: 490, c: C.nf500, days: '14일' },
    { t: 'INFP', x: 1040, y: 480, c: C.nf600, days: '72일' },
    { t: 'ISFJ', x: 200, y: 720, c: C.sj600, days: '110일' },
    { t: 'INFJ', x: 1010, y: 710, c: C.pain, days: '180일' },
  ].map(b => `
    <g transform="translate(${b.x},${b.y})">
      <path d="M0,-30 C-24,-60 -60,-40 -60,-10 C-60,30 0,55 0,55 C0,55 60,30 60,-10 C60,-40 24,-60 0,-30 Z" fill="${b.c}" opacity="0.14"/>
      <path d="M0,-26 C-20,-52 -52,-35 -52,-8 C-52,26 0,48 0,48 C0,48 52,26 52,-8 C52,-35 20,-52 0,-26 Z" fill="${b.c}"/>
      <!-- Crack line -->
      <path d="M-4,-22 L6,-8 L-8,6 L8,22 L-2,40" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.85"/>
      <text x="0" y="3" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">${b.t}</text>
      <text x="0" y="72" text-anchor="middle" font-size="13" font-weight="800" fill="${b.c}">${b.days}</text>
    </g>
  `).join('')}

  <!-- Center card -->
  <rect x="140" y="220" width="920" height="450" rx="32" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="285" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">BREAKUP RECOVERY · 2026</text>
  <text x="600" y="380" text-anchor="middle" font-size="72" font-weight="900" fill="${C.text}">MBTI 이별 회복 속도</text>
  <text x="600" y="440" text-anchor="middle" font-size="36" font-weight="800" fill="${C.pain}">너는 며칠이면 괜찮아져?</text>
  <line x1="380" y1="475" x2="820" y2="475" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="515" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">16유형 × 4가지 이별 반응 × 회복 공식</text>
  <text x="600" y="555" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">도어슬램 · 재결합 · 잠수 vs 분석 vs 새사람</text>
  <text x="600" y="620" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textFaint}">© 192types · 박서연 N=348 리포트</text>
  `);
}

// ---------- 02 RECOVERY RANKING ----------
function ranking() {
  const list = [
    { t: 'ESTP', d: 2,   note: '다음 파티에서 새 사람' },
    { t: 'ENTP', d: 4,   note: '2일 울고 3일차 새 프로젝트' },
    { t: 'ISTP', d: 5,   note: '말없이 일상 복귀' },
    { t: 'ENTJ', d: 7,   note: '감정 정리 후 성장 목표로 전환' },
    { t: 'ESFP', d: 10,  note: '친구와 술 → 새 사람으로 덮기' },
    { t: 'INTP', d: 12,  note: '원인 분석 완료 후 종결' },
    { t: 'INTJ', d: 18,  note: '10년 계획에서 상대 삭제' },
    { t: 'ESTJ', d: 22,  note: '감정 처리 후 루틴 재건' },
    { t: 'ENFP', d: 14,  note: '민지랑 술 → 새 설렘 찾아 떠남' },
    { t: 'ISFP', d: 26,  note: '감각적으로 앓고 조용히 회복' },
    { t: 'ESFJ', d: 35,  note: '주변에 털어놓으며 서서히 복구' },
    { t: 'ISTJ', d: 48,  note: '일상 루틴 무너진 만큼 복구 오래' },
    { t: 'ENFJ', d: 62,  note: '상대 걱정 + 자기 회복 이중 부담' },
    { t: 'INFP', d: 72,  note: '내면 세계에 상대가 여전히 살아' },
    { t: 'ISFJ', d: 110, note: '기억과 일상에 상대 흔적이 많음' },
    { t: 'INFJ', d: 180, note: '영혼이 기억하는 잔상 6개월 이상' },
  ];
  // Re-sort by d
  list.sort((a, b) => a.d - b.d);

  const MAX = 200;
  const left = 210;
  const right = 1040;
  const barW = right - left;
  const top = 105;
  const rowH = 45;

  const colorFor = (d) => {
    if (d <= 7) return C.safe;
    if (d <= 20) return C.mid;
    if (d <= 45) return C.warn;
    if (d <= 80) return '#ea580c';
    return C.pain;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">16유형 이별 회복 기간 랭킹 — 평균 며칠이면 괜찮아져?</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">이별 당일 → 일상 컨디션 복귀까지 · 192types 설문 N=348 + 인지기능 보정</text>

  ${list.map((r, i) => {
    const y = top + i * rowH;
    const w = Math.max(45, (r.d / MAX) * barW);
    const g = GROUP_OF[r.t];
    return `
      <text x="45" y="${y + 28}" font-size="20" font-weight="700" fill="${C.textMuted}">${String(i + 1).padStart(2, '0')}</text>
      <text x="90" y="${y + 28}" font-size="22" font-weight="800" fill="${COLOR_OF[g]}">${r.t}</text>
      <rect x="${left}" y="${y + 10}" width="${w}" height="26" rx="13" fill="${colorFor(r.d)}" opacity="0.92"/>
      <text x="${left + w - 12}" y="${y + 28}" text-anchor="end" font-size="18" font-weight="800" fill="#fff">${r.d}일</text>
      <text x="${left + w + 14}" y="${y + 28}" font-size="17" font-weight="600" fill="${C.textSoft}">${r.note}</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(220, 830)">
    ${[
      { c: C.safe, label: '빠름 ~7일' },
      { c: C.mid, label: '보통 8~20일' },
      { c: C.warn, label: '중간 21~45일' },
      { c: '#ea580c', label: '느림 46~80일' },
      { c: C.pain, label: '여운 80일+' },
    ].map((t, i) => `
      <rect x="${i * 150}" y="0" width="14" height="14" rx="3" fill="${t.c}"/>
      <text x="${i * 150 + 22}" y="12" font-size="15" font-weight="700" fill="${C.textSoft}">${t.label}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 03 REACTION TYPES ----------
function reactionTypes() {
  const types = [
    { name: '울음형 (Fi 폭발)', icon: '😢', color: C.nf500,
      who: 'INFP · ISFP · ENFP · ESFP',
      desc: '감정 먼저 쏟아내고 시작',
      details: [
        '이별 당일 10시간 연속 울음',
        '감성 플레이리스트 무한 반복',
        '친구에게 새벽 전화 패턴',
        '우는 게 회복 시작이라 건강한 유형',
      ] },
    { name: '분석형 (Ti/Te 가동)', icon: '🔍', color: C.nt600,
      who: 'INTP · INTJ · ENTP · ENTJ',
      desc: '원인 파악 끝나야 종결',
      details: [
        '이별 사유를 5단계로 분해',
        '상대 패턴 역추적 · 엑셀화',
        '감정보다 "왜" 먼저 해결',
        '분석 끝나면 빠르게 종결',
      ] },
    { name: '은둔형 (Si/Ni 침잠)', icon: '🌑', color: C.sj600,
      who: 'ISFJ · ISTJ · INFJ · INTJ',
      desc: '조용히 방에서 삭히기',
      details: [
        '2~4주 SNS 완전 비공개',
        '가족/가까운 1명 외 연락 차단',
        '일상 루틴으로 몸부터 복구',
        '길지만 재발 확률 낮음',
      ] },
    { name: '새사람형 (Se 전환)', icon: '✨', color: C.sp500,
      who: 'ESTP · ENTP · ESFP · ENFP',
      desc: '다음 경험으로 덮어쓰기',
      details: [
        '1주 내 새로운 만남/소개팅',
        '새 헤어스타일·피트니스 시작',
        '감정은 빠르게 처리',
        '덮어쓰기가 지속되면 패턴화 위험',
      ] },
  ];

  const w = 520, h = 340;
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 490 },
    { x: 620, y: 490 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">4가지 이별 반응 유형 — 너는 어떤 방식으로 앓아?</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">Fi 폭발 · Ti/Te 분석 · Si/Ni 침잠 · Se 전환 · 네 주기능이 결정해</text>

  ${positions.map((p, i) => {
    const t = types[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${t.color}"/>
        <text x="28" y="44" font-size="31" font-weight="800" fill="${t.color}">${t.icon} ${t.name}</text>
        <text x="28" y="68" font-size="17" font-weight="600" fill="${C.textMuted}">${t.who}</text>
        <text x="28" y="92" font-size="18" font-weight="700" fill="${C.textSoft}">· ${t.desc}</text>
        ${t.details.map((d, j) => `
          <g transform="translate(28, ${135 + j * 44})">
            <circle cx="7" cy="0" r="6" fill="${t.color}" opacity="0.25"/>
            <text x="7" y="3" text-anchor="middle" font-size="9" font-weight="800" fill="${t.color}">${j + 1}</text>
            <text x="22" y="4" font-size="18" font-weight="600" fill="${C.textSoft}">${d}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 DOORSLAM MAP ----------
function doorslamMap() {
  const list = [
    { t: 'INFJ', v: 98, note: '한번 문 닫으면 영원히 안 열림' },
    { t: 'INTJ', v: 92, note: '판단 끝나면 관계 즉시 삭제' },
    { t: 'INFP', v: 86, note: '가치 배신 시 조용한 도어슬램' },
    { t: 'ISFP', v: 78, note: '선 넘으면 말 없이 차단' },
    { t: 'INTP', v: 66, note: '분석 끝나면 감정 없이 종결' },
    { t: 'ISTP', v: 62, note: '흥미 잃으면 자연스럽게 단절' },
    { t: 'ISTJ', v: 58, note: '원칙 어기면 단호한 단절' },
    { t: 'ENTJ', v: 54, note: '효율성 판단 후 관계 종료' },
    { t: 'ENTP', v: 42, note: '잘 차단 안 하고 다시 연락' },
    { t: 'ISFJ', v: 38, note: '참다가 끊지만 후회 많음' },
    { t: 'ENFJ', v: 34, note: '상대 걱정이 차단을 막음' },
    { t: 'ESTJ', v: 32, note: '실용적으로 연락 유지' },
    { t: 'ESTP', v: 22, note: '인연은 재활용이 편함' },
    { t: 'ENFP', v: 18, note: '안 차단하고 친구로 전환 시도' },
    { t: 'ESFJ', v: 14, note: '관계 유지 본능이 강함' },
    { t: 'ESFP', v: 12, note: '기억은 짧고 재회는 쉬워' },
  ];

  const top = 110;
  const rowH = 44;
  const left = 210;
  const barW = 820;

  const colorFor = (v) => {
    if (v >= 85) return C.danger;
    if (v >= 65) return C.warn;
    if (v >= 40) return '#eab308';
    if (v >= 25) return C.mid;
    return C.safe;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">도어슬램 위험도 — 한 번 차단하면 영원한 유형 TOP 16</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">"연락 차단 + 기억 삭제 + 재접촉 거부" 강도 100점 만점</text>

  ${list.map((r, i) => {
    const y = top + i * rowH;
    const w = (r.v / 100) * barW;
    const g = GROUP_OF[r.t];
    return `
      <text x="45" y="${y + 28}" font-size="20" font-weight="700" fill="${C.textMuted}">${String(i + 1).padStart(2, '0')}</text>
      <text x="90" y="${y + 28}" font-size="22" font-weight="800" fill="${COLOR_OF[g]}">${r.t}</text>
      <rect x="${left}" y="${y + 9}" width="${w}" height="26" rx="13" fill="${colorFor(r.v)}" opacity="0.92"/>
      <text x="${left + w - 12}" y="${y + 27}" text-anchor="end" font-size="18" font-weight="800" fill="#fff">${r.v}</text>
      <text x="${left + w + 14}" y="${y + 27}" font-size="17" font-weight="600" fill="${C.textSoft}">${r.note}</text>
    `;
  }).join('')}

  <g transform="translate(220, 820)">
    ${[
      { c: C.danger, label: '영구 차단 85+' },
      { c: C.warn, label: '단호 65~84' },
      { c: '#eab308', label: '중립 40~64' },
      { c: C.mid, label: '유지형 25~39' },
      { c: C.safe, label: '재연결형 ~24' },
    ].map((t, i) => `
      <rect x="${i * 160}" y="0" width="14" height="14" rx="3" fill="${t.c}"/>
      <text x="${i * 160 + 22}" y="12" font-size="15" font-weight="700" fill="${C.textSoft}">${t.label}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 05 RECONNECTION HEATMAP ----------
function reconnectHeat() {
  const stages = ['회복 초기\n(1~7일)', '중기\n(8~30일)', '후기\n(31~90일)', '완전 회복\n(90일+)'];
  const groups = ['다혈질\n(Sanguine)', '담즙질\n(Choleric)', '점액질\n(Phlegmatic)', '우울질\n(Melancholic)'];
  // 4 groups x 4 stages reconnection probability (%)
  const matrix = [
    [62, 58, 45, 28], // 다혈질 (빠른 재연결 가능)
    [18, 32, 42, 30], // 담즙질 (후기 재평가)
    [28, 46, 58, 52], // 점액질 (천천히 재연결)
    [8, 14, 22, 18],  // 우울질 (도어슬램 경향)
  ];
  const labels = [
    ['열정 재점화', '잠깐 재회', '친구 복귀', '완전 해방'],
    ['정리 불충분', '조건 재평가', '재협상 가능', '성장 후 만남'],
    ['아직 상처', '생활 복귀', '여유의 재접촉', '깊은 이해 후 재회'],
    ['충격 최대치', '내면 심연', '조용한 관조', '영구 도어슬램'],
  ];
  const cell = 160;
  const ox = 210;
  const oy = 220;

  const colorFor = (v) => {
    if (v >= 55) return C.warn;
    if (v >= 40) return '#eab308';
    if (v >= 25) return C.mid;
    return C.safe;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">재결합 확률 × 회복 단계 히트맵</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">4기질별 · 회복 단계에 따라 "다시 만날 수 있을까?" 확률 (%)</text>

  <!-- Column headers -->
  ${stages.map((s, i) => {
    const lines = s.split('\n');
    return `
      <text x="${ox + i * cell + cell / 2}" y="${oy - 30}" text-anchor="middle" font-size="18" font-weight="700" fill="${C.textSoft}">${lines[0]}</text>
      <text x="${ox + i * cell + cell / 2}" y="${oy - 12}" text-anchor="middle" font-size="15" font-weight="600" fill="${C.textMuted}">${lines[1]}</text>
    `;
  }).join('')}

  <!-- Row headers -->
  ${groups.map((g, i) => {
    const lines = g.split('\n');
    return `
      <text x="${ox - 18}" y="${oy + i * cell + cell / 2 - 6}" text-anchor="end" font-size="18" font-weight="700" fill="${C.textSoft}">${lines[0]}</text>
      <text x="${ox - 18}" y="${oy + i * cell + cell / 2 + 12}" text-anchor="end" font-size="15" font-weight="600" fill="${C.textMuted}">${lines[1]}</text>
    `;
  }).join('')}

  ${matrix.map((row, r) => row.map((v, c) => `
    <rect x="${ox + c * cell}" y="${oy + r * cell}" width="${cell - 6}" height="${cell - 6}" rx="12" fill="${colorFor(v)}" opacity="0.9"/>
    <text x="${ox + c * cell + (cell - 6) / 2}" y="${oy + r * cell + 52}" text-anchor="middle" font-size="42" font-weight="800" fill="#fff">${v}%</text>
    <text x="${ox + c * cell + (cell - 6) / 2}" y="${oy + r * cell + 85}" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff" opacity="0.95">${labels[r][c].slice(0, 8)}</text>
    <text x="${ox + c * cell + (cell - 6) / 2}" y="${oy + r * cell + 102}" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff" opacity="0.95">${labels[r][c].slice(8)}</text>
  `).join('')).join('')}

  <g transform="translate(220, 860)">
    <text x="0" y="12" font-size="17" font-weight="600" fill="${C.textSoft}">· 다혈질: 초기 재연결이 쉽지만 같은 패턴 반복 · 우울질: 초기 재접촉은 거의 불가 · 점액질: 시간이 답</text>
  </g>
  `);
}

// ---------- 06 TEMPERAMENT RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 이별 회복', color: C.nf500, icon: '🌸',
      types: 'ENFP · ESFP · ESFJ · ENFJ · (평균 14~62일)',
      items: [
        '① 절친 1명과 3시간 감정 배출 (민지 같은 안전지대)',
        '② SNS 상대 계정 2주 뮤트 → 1달 언팔',
        '③ "새 만남" 대신 "새 장소" 탐험 (리바운드 회피)',
        '④ 이별 일기 30일 쓰고 태우기 세리머니',
      ] },
    { name: '담즙질 이별 회복', color: C.nt600, icon: '📊',
      types: 'ENTJ · ESTJ · ENTP · ESTP · (평균 2~22일)',
      items: [
        '① 이별 사유 1페이지로 요약 후 종결 선언',
        '② 자기개발 목표 1개로 에너지 전환',
        '③ 감정 무시 금지 — 하루 10분 "슬픔 시간" 확보',
        '④ 새 관계는 2개월 이후 시작',
      ] },
    { name: '점액질 이별 회복', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP · (평균 26~110일)',
      items: [
        '① 일상 루틴 복구 먼저 (식사·수면)',
        '② 집 안 상대 흔적 정리 — 물건 박스 포장',
        '③ 믿을 만한 1명과 주 1회 감정 체크인',
        '④ 급하게 회복 안 해도 됨 — 시간이 치유',
      ] },
    { name: '우울질 이별 회복', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP · (평균 5~180일)',
      items: [
        '① "도어슬램 전" 1문장으로 마음 정리 기록',
        '② 상대 시나리오 반복 인식 → 종이에 쓰고 덮기',
        '③ 몸을 움직이는 활동 (산책 · 수영 · 스트레칭)',
        '④ 의미 찾기 금지 — "그냥 끝났다"로 마무리',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 490 },
    { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">기질별 이별 극복 루틴 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">네 기질에 맞는 4단계 회복 프로토콜 · 지금 바로 1개 시작</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="28" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        <text x="28" y="66" font-size="17" font-weight="600" fill="${C.textMuted}">${g.types}</text>
        ${g.items.map((it, j) => `
          <text x="28" y="${115 + j * 52}" font-size="18" font-weight="600" fill="${C.textSoft}">${it}</text>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- RUNNER ----------
const items = [
  { name: 'breakup-01-hero', svg: hero() },
  { name: 'breakup-02-ranking', svg: ranking() },
  { name: 'breakup-03-reaction-types', svg: reactionTypes() },
  { name: 'breakup-04-doorslam-map', svg: doorslamMap() },
  { name: 'breakup-05-reconnect-heat', svg: reconnectHeat() },
  { name: 'breakup-06-ritual', svg: ritual() },
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
