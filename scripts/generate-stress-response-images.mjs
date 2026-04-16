// Generate infographics for "MBTI 스트레스 대응 스타일 — 압박 받을 때 드러나는 진짜 민낯"
// Output: public/blog/stress-{name}.{svg,webp}
//
// Image set (6):
//   01 hero             - 브랜드 히어로
//   02 four-modes       - 4가지 스트레스 반응 모드 (공격/회피/분석/은둔)
//   03 grip-function    - 그립(민낯) 기능 16유형 매핑
//   04 intensity-rank   - 16유형 스트레스 강도 랭킹
//   05 acute-chronic    - 급성 × 만성 스트레스 반응 4분면
//   06 ritual           - 기질별 단기 스트레스 해소 루틴

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
  attack: '#dc2626', avoid: '#7c3aed', analyze: '#0369a1', withdraw: '#475569',
  safe: '#16a34a', mid: '#84cc16', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 스트레스 리포트</text>
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
      <stop offset="100%" stop-color="#f1f5f9"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- 4 corners showing stress modes -->
  <g transform="translate(150, 200)">
    <circle cx="0" cy="0" r="60" fill="${C.attack}" opacity="0.15"/>
    <circle cx="0" cy="0" r="50" fill="${C.attack}"/>
    <text x="0" y="5" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">⚔</text>
    <text x="0" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="${C.attack}">공격</text>
    <text x="0" y="100" text-anchor="middle" font-size="10" font-weight="600" fill="${C.textMuted}">ENTJ · ESTJ · ESTP</text>
  </g>
  <g transform="translate(1050, 200)">
    <circle cx="0" cy="0" r="60" fill="${C.avoid}" opacity="0.15"/>
    <circle cx="0" cy="0" r="50" fill="${C.avoid}"/>
    <text x="0" y="5" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">🏃</text>
    <text x="0" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="${C.avoid}">회피</text>
    <text x="0" y="100" text-anchor="middle" font-size="10" font-weight="600" fill="${C.textMuted}">ENFP · ESFP · ENTP</text>
  </g>
  <g transform="translate(150, 700)">
    <circle cx="0" cy="0" r="60" fill="${C.analyze}" opacity="0.15"/>
    <circle cx="0" cy="0" r="50" fill="${C.analyze}"/>
    <text x="0" y="5" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">🔬</text>
    <text x="0" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="${C.analyze}">분석</text>
    <text x="0" y="100" text-anchor="middle" font-size="10" font-weight="600" fill="${C.textMuted}">INTJ · INTP · INFJ</text>
  </g>
  <g transform="translate(1050, 700)">
    <circle cx="0" cy="0" r="60" fill="${C.withdraw}" opacity="0.15"/>
    <circle cx="0" cy="0" r="50" fill="${C.withdraw}"/>
    <text x="0" y="5" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">🌑</text>
    <text x="0" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="${C.withdraw}">은둔</text>
    <text x="0" y="100" text-anchor="middle" font-size="10" font-weight="600" fill="${C.textMuted}">ISFJ · ISTJ · ISFP</text>
  </g>

  <!-- Center card -->
  <rect x="140" y="250" width="920" height="420" rx="32" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="315" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">STRESS RESPONSE · 2026</text>
  <text x="600" y="410" text-anchor="middle" font-size="72" font-weight="900" fill="${C.text}">MBTI 스트레스 대응</text>
  <text x="600" y="470" text-anchor="middle" font-size="36" font-weight="800" fill="${C.attack}">압박 받을 때 나오는 민낯</text>
  <line x1="380" y1="505" x2="820" y2="505" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="545" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">16유형 × 4가지 반응 × 그림자 기능</text>
  <text x="600" y="585" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">급성 vs 만성 · 압박 임계치 · 해소 공식</text>
  <text x="600" y="645" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textFaint}">© 192types · 박서연의 현장 관찰기</text>
  `);
}

// ---------- 02 FOUR MODES ----------
function fourModes() {
  const modes = [
    { name: '공격 모드 (Attack)', icon: '⚔', color: C.attack,
      who: 'ENTJ · ESTJ · ESTP · ENTP · INTJ',
      mech: 'Te/Se 과잉 → 외부로 폭발',
      signs: [
        '말투가 갑자기 날카로워짐',
        '메일·카톡에 느낌표 증가',
        '팀원에게 예민 → 갈등 유발',
        '회의에서 즉각적인 이의 제기',
      ] },
    { name: '회피 모드 (Avoid)', icon: '🏃', color: C.avoid,
      who: 'ENFP · ESFP · ENTP · ISFP',
      mech: 'Ne/Se 주기능이 "지금" 탈출',
      signs: [
        '갑자기 새 프로젝트·취미 시작',
        '일은 미루고 쇼핑/여행 충동',
        '핸드폰 무한 스크롤 3시간+',
        '본질 대화 회피 → 가벼운 농담',
      ] },
    { name: '분석 모드 (Analyze)', icon: '🔬', color: C.analyze,
      who: 'INTJ · INTP · INFJ · INFP',
      mech: 'Ti/Ni 주기능 과부하',
      signs: [
        '같은 상황을 50번 머릿속 재생',
        '엑셀/노션에 원인 분해 문서화',
        '새벽까지 머리가 안 꺼짐',
        '결론 없이 반복되는 사고 루프',
      ] },
    { name: '은둔 모드 (Withdraw)', icon: '🌑', color: C.withdraw,
      who: 'ISFJ · ISTJ · ISTP · ISFP',
      mech: 'Si 과잉 → 안전 공간 회귀',
      signs: [
        '약속 취소 + 방에만 있음',
        '연락 응답 시간 3배 이상',
        '말수 급격히 감소 · "괜찮아" 반복',
        '루틴 몰입으로 외부 차단',
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
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">스트레스 반응 4가지 모드 — 너는 어느 쪽이야?</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">주기능이 과부하되면 4가지 반응 중 하나로 튀어나와 · 반응 모드 = 대처 전략의 출발점</text>

  ${positions.map((p, i) => {
    const m = modes[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="28" y="42" font-size="28" font-weight="800" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="28" y="66" font-size="17" font-weight="600" fill="${C.textMuted}">${m.who}</text>
        <text x="28" y="90" font-size="17" font-weight="700" fill="${C.textSoft}">· ${m.mech}</text>
        ${m.signs.map((s, j) => `
          <g transform="translate(28, ${130 + j * 46})">
            <circle cx="8" cy="0" r="7" fill="${m.color}" opacity="0.25"/>
            <text x="8" y="4" text-anchor="middle" font-size="14" font-weight="800" fill="${m.color}">${j + 1}</text>
            <text x="26" y="4" font-size="18" font-weight="600" fill="${C.textSoft}">${s}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 03 GRIP FUNCTION ----------
function gripFunction() {
  const items = [
    { t: 'INTJ', grip: '열등 Se 폭주 → 폭식·충동쇼핑' },
    { t: 'INTP', grip: '열등 Fe 폭주 → 울컥·과민반응' },
    { t: 'ENTJ', grip: '열등 Fi 폭주 → 감정 홍수·자책' },
    { t: 'ENTP', grip: '열등 Si 폭주 → 반복 불안·과거 집착' },
    { t: 'INFJ', grip: '열등 Se 폭주 → 충동 소비·감각 과잉' },
    { t: 'INFP', grip: '열등 Te 폭주 → 과잉 통제·목록 강박' },
    { t: 'ENFJ', grip: '열등 Ti 폭주 → 냉소적·차가운 분석' },
    { t: 'ENFP', grip: '열등 Si 폭주 → 몸이 아픔·건강염려' },
    { t: 'ISTJ', grip: '열등 Ne 폭주 → 과장된 걱정·시나리오' },
    { t: 'ISFJ', grip: '열등 Ne 폭주 → 최악 상상·불면' },
    { t: 'ESTJ', grip: '열등 Fi 폭주 → 격한 눈물·자기연민' },
    { t: 'ESFJ', grip: '열등 Ti 폭주 → 비난적 분석·공격' },
    { t: 'ISTP', grip: '열등 Fe 폭주 → 갑작스런 감정 폭발' },
    { t: 'ISFP', grip: '열등 Te 폭주 → 강박적 계획·통제' },
    { t: 'ESTP', grip: '열등 Ni 폭주 → 음모론·부정 예측' },
    { t: 'ESFP', grip: '열등 Ni 폭주 → 무의미감·종말 감각' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">그립(Grip) 기능 — 네 민낯이 튀어나오는 순간</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">극심한 스트레스에서 열등기능이 폭주하면 "평소의 나"와 정반대 모습이 드러나</text>

  ${items.map((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 580;
    const y = 115 + row * 95;
    const g = GROUP_OF[it.t];
    return `
      <rect x="${x}" y="${y}" width="555" height="80" rx="14" fill="${BG_OF[g]}" stroke="${C.border}"/>
      <rect x="${x}" y="${y}" width="7" height="80" rx="3" fill="${COLOR_OF[g]}"/>
      <text x="${x + 22}" y="${y + 32}" font-size="24" font-weight="800" fill="${COLOR_OF[g]}">${it.t}</text>
      <text x="${x + 22}" y="${y + 57}" font-size="17" font-weight="600" fill="${C.textSoft}">${it.grip}</text>
    `;
  }).join('')}
  `);
}

// ---------- 04 STRESS INTENSITY RANKING ----------
function intensityRank() {
  const list = [
    { t: 'INFJ', v: 92, note: '이상 붕괴 시 가장 강하게 반응' },
    { t: 'ENFJ', v: 88, note: '타인 감정까지 흡수해 과부하' },
    { t: 'ISFJ', v: 84, note: '참기의 한계에서 전신 증상' },
    { t: 'INFP', v: 80, note: '가치 배신 시 도어슬램 + 폭발' },
    { t: 'INTJ', v: 72, note: '장기 플랜 붕괴 시 그립 폭주' },
    { t: 'ESFJ', v: 70, note: '관계 갈등 지속 시 급속 악화' },
    { t: 'ESTJ', v: 64, note: '통제 상실 시 공격성 급증' },
    { t: 'ENTJ', v: 60, note: '실패 감지 시 자기 비판 극단' },
    { t: 'ENFP', v: 56, note: '설렘 차단 시 무기력 급락' },
    { t: 'ISTJ', v: 54, note: '참다가 한 번에 폭발' },
    { t: 'INTP', v: 48, note: '외부 압박이 강할 때만' },
    { t: 'ESFP', v: 42, note: '외로움 + 분위기 악화 시' },
    { t: 'ISFP', v: 40, note: '감각 과부하 시 은둔' },
    { t: 'ENTP', v: 36, note: '새로움 차단 시 일시 반응' },
    { t: 'ESTP', v: 30, note: '자극 없을 때만 민감' },
    { t: 'ISTP', v: 24, note: '거리두기 능력으로 방어' },
  ];
  const top = 110;
  const rowH = 44;
  const left = 210;
  const barW = 820;

  const colorFor = (v) => {
    if (v >= 80) return C.danger;
    if (v >= 60) return C.warn;
    if (v >= 40) return '#eab308';
    if (v >= 25) return C.mid;
    return C.safe;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">16유형 스트레스 민감도 랭킹</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">동일 압박 자극 대비 반응 강도 · 100점 만점 · 인지기능 + 기질 종합</text>

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
  `);
}

// ---------- 05 ACUTE × CHRONIC MATRIX ----------
function acuteChronic() {
  const types = [
    { t: 'ENTJ', g: 'NT', x: 920, y: 320 },
    { t: 'ESTJ', g: 'SJ', x: 950, y: 400 },
    { t: 'ESTP', g: 'SP', x: 900, y: 260 },
    { t: 'ENTP', g: 'NT', x: 840, y: 220 },
    { t: 'ENFJ', g: 'NF', x: 380, y: 340 },
    { t: 'ESFJ', g: 'SJ', x: 330, y: 400 },
    { t: 'ENFP', g: 'NF', x: 280, y: 260 },
    { t: 'ESFP', g: 'SP', x: 230, y: 300 },
    { t: 'INTJ', g: 'NT', x: 900, y: 620 },
    { t: 'INTP', g: 'NT', x: 820, y: 560 },
    { t: 'INFJ', g: 'NF', x: 380, y: 700 },
    { t: 'INFP', g: 'NF', x: 320, y: 660 },
    { t: 'ISTJ', g: 'SJ', x: 920, y: 720 },
    { t: 'ISFJ', g: 'SJ', x: 380, y: 760 },
    { t: 'ISTP', g: 'SP', x: 820, y: 680 },
    { t: 'ISFP', g: 'SP', x: 280, y: 620 },
  ];
  const ox = 160, oy = 160, w = 900, h = 600;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">급성 × 만성 스트레스 반응 4분면</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">가로: 표현 방식(외부 폭발 ↔ 내부 침잠) · 세로: 반응 강도(급성 폭발 ↔ 만성 누적)</text>

  <!-- Frame -->
  <rect x="${ox}" y="${oy}" width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>

  <!-- Cross lines -->
  <line x1="${ox + w / 2}" y1="${oy}" x2="${ox + w / 2}" y2="${oy + h}" stroke="${C.divider}" stroke-dasharray="4 6"/>
  <line x1="${ox}" y1="${oy + h / 2}" x2="${ox + w}" y2="${oy + h / 2}" stroke="${C.divider}" stroke-dasharray="4 6"/>

  <!-- Axis labels -->
  <text x="${ox + w / 2}" y="${oy - 14}" text-anchor="middle" font-size="17" font-weight="700" fill="${C.textMuted}">↑ 급성 폭발</text>
  <text x="${ox + w / 2}" y="${oy + h + 22}" text-anchor="middle" font-size="17" font-weight="700" fill="${C.textMuted}">↓ 만성 누적</text>
  <text x="${ox - 10}" y="${oy + h / 2 + 5}" text-anchor="end" font-size="17" font-weight="700" fill="${C.textMuted}">← 내부 침잠</text>
  <text x="${ox + w + 10}" y="${oy + h / 2 + 5}" font-size="17" font-weight="700" fill="${C.textMuted}">외부 폭발 →</text>

  <!-- Quadrant labels -->
  <text x="${ox + 40}" y="${oy + 40}" font-size="18" font-weight="800" fill="${C.textSoft}">급성 + 내부</text>
  <text x="${ox + 40}" y="${oy + 58}" font-size="15" font-weight="500" fill="${C.textMuted}">감정 폭발 · 울음 / 패닉</text>

  <text x="${ox + w - 40}" y="${oy + 40}" text-anchor="end" font-size="18" font-weight="800" fill="${C.textSoft}">급성 + 외부</text>
  <text x="${ox + w - 40}" y="${oy + 58}" text-anchor="end" font-size="15" font-weight="500" fill="${C.textMuted}">공격적 분출 · 대립</text>

  <text x="${ox + 40}" y="${oy + h - 48}" font-size="18" font-weight="800" fill="${C.textSoft}">만성 + 내부</text>
  <text x="${ox + 40}" y="${oy + h - 30}" font-size="15" font-weight="500" fill="${C.textMuted}">은둔 · 누적 우울</text>

  <text x="${ox + w - 40}" y="${oy + h - 48}" text-anchor="end" font-size="18" font-weight="800" fill="${C.textSoft}">만성 + 외부</text>
  <text x="${ox + w - 40}" y="${oy + h - 30}" text-anchor="end" font-size="15" font-weight="500" fill="${C.textMuted}">과열 번아웃 · 성취 집착</text>

  ${types.map(t => `
    <g transform="translate(${t.x},${t.y})">
      <circle r="28" fill="${COLOR_OF[t.g]}" opacity="0.9"/>
      <text y="5" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${t.t}</text>
    </g>
  `).join('')}
  `);
}

// ---------- 06 TEMPERAMENT RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 스트레스 해소', color: C.nf500, icon: '🌺',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 신뢰하는 1명에게 3분 통화 — 감정 언어화',
        '② 몸을 움직이는 짧은 활동 (산책 · 댄스)',
        '③ "나도 위로 받을 권리" 선언하기',
        '④ 충동적 회피(쇼핑/폭식) 24시간 지연',
      ] },
    { name: '담즙질 스트레스 해소', color: C.nt600, icon: '⚙️',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① "지금 이거 미룰 수 있을까?" 질문 루틴',
        '② 타인에게 책임 1개 위임 연습',
        '③ 5분 심호흡 · 몸 스캐닝',
        '④ 분노·공격 말투 24시간 쿨다운',
      ] },
    { name: '점액질 스트레스 해소', color: C.sj600, icon: '🍃',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 일상 루틴 보호 (식사·수면 지키기)',
        '② "참기 한도 그래프" 매일 체크',
        '③ 작은 거절 연습 → 부담 덜기',
        '④ 안전 공간(방·카페) 1시간 확보',
      ] },
    { name: '우울질 스트레스 해소', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 사고 루프 인식 → 종이에 적기',
        '② 몸 감각 복구 (따뜻한 차 · 음악 · 산책)',
        '③ 의미 찾기 금지 — "그냥 힘들다" 수용',
        '④ 신뢰 1명과 5분 비언어적 함께 있기',
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
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">기질별 스트레스 해소 루틴 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">네 기질에 맞는 4단계 즉시 적용 전략 · 지금 바로 1개 실천</text>

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
  { name: 'stress-01-hero', svg: hero() },
  { name: 'stress-02-four-modes', svg: fourModes() },
  { name: 'stress-03-grip-function', svg: gripFunction() },
  { name: 'stress-04-intensity-rank', svg: intensityRank() },
  { name: 'stress-05-acute-chronic', svg: acuteChronic() },
  { name: 'stress-06-ritual', svg: ritual() },
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
