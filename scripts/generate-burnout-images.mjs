// Generate infographics for "MBTI 번아웃 취약도 순위 — 네가 무너지는 진짜 포인트"
// Output: public/blog/burnout-{name}.{svg,webp}
//
// Image set (6):
//   01 hero          - 브랜드 히어로
//   02 ranking       - 번아웃 취약도 16유형 순위
//   03 trigger-map   - 16유형 × 무너지는 트리거 매트릭스
//   04 warning-signs - 4기질별 번아웃 전조 증상
//   05 recovery-time - 유형별 회복 속도 (일수)
//   06 recovery-ritual - 기질별 회복 루틴 체크리스트

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
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  burn: '#dc2626', burnSoft: '#fee2e2', burnDeep: '#991b1b',
  recover: '#16a34a', recoverSoft: '#dcfce7',
  danger: '#dc2626', warn: '#f59e0b', safe: '#16a34a', mid: '#84cc16',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 번아웃 리포트</text>
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
      <stop offset="100%" stop-color="#fef2f2"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- Flame/ashes scattered -->
  ${[
    { x: 180, y: 230, r: 46, c: C.burn, label: 'ENFJ' },
    { x: 1020, y: 210, r: 44, c: C.burn, label: 'INFJ' },
    { x: 130, y: 490, r: 40, c: C.burnDeep, label: 'ISFJ' },
    { x: 1080, y: 480, r: 42, c: C.warn, label: 'INFP' },
    { x: 200, y: 720, r: 46, c: C.warn, label: 'ESFJ' },
    { x: 1010, y: 710, r: 44, c: C.recover, label: 'ISTP' },
  ].map(b => `
    <circle cx="${b.x}" cy="${b.y}" r="${b.r + 12}" fill="${b.c}" opacity="0.12"/>
    <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.c}"/>
    <text x="${b.x}" y="${b.y + 6}" text-anchor="middle" font-size="${b.r * 0.4}" font-weight="800" fill="#fff">${b.label}</text>
  `).join('')}

  <!-- Flame emoji scattered -->
  <text x="380" y="270" font-size="40" opacity="0.25">🔥</text>
  <text x="820" y="360" font-size="36" opacity="0.22">🔥</text>
  <text x="440" y="640" font-size="32" opacity="0.2">🔥</text>
  <text x="780" y="650" font-size="42" opacity="0.22">🔥</text>

  <!-- Center card -->
  <rect x="140" y="230" width="920" height="430" rx="32" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="295" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">BURNOUT REPORT · 2026</text>
  <text x="600" y="390" text-anchor="middle" font-size="72" font-weight="900" fill="${C.text}">MBTI 번아웃 취약도</text>
  <text x="600" y="450" text-anchor="middle" font-size="36" font-weight="800" fill="${C.burn}">네가 무너지는 진짜 포인트</text>
  <line x1="380" y1="485" x2="820" y2="485" stroke="${C.border}" stroke-width="2"/>
  <text x="600" y="525" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">16유형 × 4기질 번아웃 + 회복 공식</text>
  <text x="600" y="565" text-anchor="middle" font-size="20" font-weight="600" fill="${C.textMuted}">ENFJ 93 · ISFJ 88 · ISTP 28 · INTP 34</text>
  <text x="600" y="615" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textFaint}">© 192types · 박서연의 현장 리포트</text>
  `);
}

// ---------- 02 RANKING ----------
function ranking() {
  const list = [
    { t: 'ENFJ', v: 93, note: '남의 감정 다 흡수해서 본인이 소진' },
    { t: 'INFJ', v: 90, note: '이상 vs 현실 갭에서 쌓이는 회의감' },
    { t: 'ISFJ', v: 88, note: '말없이 다 챙기다 스스로 방치' },
    { t: 'INFP', v: 85, note: '의미 없는 일에 급속 탈진' },
    { t: 'ESFJ', v: 82, note: '그룹 갈등 떠안다 탈진' },
    { t: 'ENFP', v: 76, note: '설렘 떨어지면 의욕 0' },
    { t: 'ISTJ', v: 68, note: '과부하 누적을 말 안 해서' },
    { t: 'ESTJ', v: 64, note: '완벽주의 강박 + 자기검열' },
    { t: 'ENTJ', v: 58, note: '성과 압박에 본인 갈아넣음' },
    { t: 'INTJ', v: 54, note: '장기 플랜 실패 시 허탈감' },
    { t: 'ISFP', v: 48, note: '감각 자극 과다 노출' },
    { t: 'ESFP', v: 42, note: '혼자 있는 시간 지속 시' },
    { t: 'ENTP', v: 38, note: '반복 루틴에서 의욕 소멸' },
    { t: 'ESTP', v: 36, note: '동력 잃으면 급격한 무기력' },
    { t: 'INTP', v: 34, note: '외부 압박이 클 때만' },
    { t: 'ISTP', v: 28, note: '거리두기 능력으로 방어' },
  ];
  const top = 110;
  const rowH = 44;
  const left = 210;
  const barW = 820;

  const colorFor = (v) => {
    if (v >= 85) return C.burn;
    if (v >= 70) return C.warn;
    if (v >= 55) return '#eab308';
    if (v >= 40) return C.mid;
    return C.recover;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">16유형 번아웃 취약도 랭킹</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">100점 만점 · 감정 흡수 + 내적 과부하 + 회복 지연 종합 · 높을수록 무너지기 쉬움</text>

  ${list.map((r, i) => {
    const y = top + i * rowH;
    const w = (r.v / 100) * barW;
    const g = GROUP_OF[r.t];
    return `
      <text x="45" y="${y + 28}" font-size="14" font-weight="700" fill="${C.textMuted}">${String(i + 1).padStart(2, '0')}</text>
      <text x="90" y="${y + 28}" font-size="16" font-weight="800" fill="${COLOR_OF[g]}">${r.t}</text>
      <rect x="${left}" y="${y + 9}" width="${w}" height="26" rx="13" fill="${colorFor(r.v)}" opacity="0.92"/>
      <text x="${left + w - 12}" y="${y + 27}" text-anchor="end" font-size="13" font-weight="800" fill="#fff">${r.v}</text>
      <text x="${left + w + 14}" y="${y + 27}" font-size="12" font-weight="600" fill="${C.textSoft}">${r.note}</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(180, 820)">
    ${[
      { c: C.burn, label: '매우 취약 85+' },
      { c: C.warn, label: '취약 70~84' },
      { c: '#eab308', label: '중간 55~69' },
      { c: C.mid, label: '비교적 강함 40~54' },
      { c: C.recover, label: '강함 ~39' },
    ].map((t, i) => `
      <rect x="${i * 180}" y="0" width="14" height="14" rx="3" fill="${t.c}"/>
      <text x="${i * 180 + 22}" y="12" font-size="12" font-weight="700" fill="${C.textSoft}">${t.label}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 03 TRIGGER MAP ----------
function triggerMap() {
  const items = [
    { t: 'INTJ', trigger: '장기 계획 붕괴 / 무의미한 반복 업무' },
    { t: 'INTP', trigger: '비합리적 지시 / 의미 없는 회의 연속' },
    { t: 'ENTJ', trigger: '성과 좌절 / 팀원 역량 부족' },
    { t: 'ENTP', trigger: '루틴화 / 새로움 차단' },
    { t: 'INFJ', trigger: '가치 배신 / 이상과 현실 격차' },
    { t: 'INFP', trigger: '위선적 환경 / 정체성 강요' },
    { t: 'ENFJ', trigger: '돌봄 일방 지속 / 인정 없음' },
    { t: 'ENFP', trigger: '자유 제한 / 감정 차단' },
    { t: 'ISTJ', trigger: '규칙 붕괴 / 예측 불가' },
    { t: 'ISFJ', trigger: '본인 돌봄 방치 / 감사 없는 헌신' },
    { t: 'ESTJ', trigger: '통제 불가 상황 / 혼돈 지속' },
    { t: 'ESFJ', trigger: '관계 갈등 지속 / 소외감' },
    { t: 'ISTP', trigger: '자율성 박탈 / 관계 과밀도' },
    { t: 'ISFP', trigger: '감각 과부하 / 가치관 충돌' },
    { t: 'ESTP', trigger: '자극 없는 지루함 / 갇힌 환경' },
    { t: 'ESFP', trigger: '외로움 / 분위기 악화' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">16유형 번아웃 트리거 매트릭스</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네가 정확히 어떤 상황에서 무너지는지 · 유형별 1순위 트리거 지도</text>

  ${items.map((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 580;
    const y = 115 + row * 95;
    const g = GROUP_OF[it.t];
    return `
      <rect x="${x}" y="${y}" width="555" height="80" rx="14" fill="${BG_OF[g]}" stroke="${C.border}"/>
      <rect x="${x}" y="${y}" width="7" height="80" rx="3" fill="${COLOR_OF[g]}"/>
      <text x="${x + 22}" y="${y + 32}" font-size="17" font-weight="800" fill="${COLOR_OF[g]}">${it.t}</text>
      <text x="${x + 22}" y="${y + 57}" font-size="12" font-weight="600" fill="${C.textSoft}">${it.trigger}</text>
    `;
  }).join('')}
  `);
}

// ---------- 04 WARNING SIGNS BY TEMPERAMENT ----------
function warningSigns() {
  const groups = [
    { name: '다혈질 (Sanguine)', color: C.nf500, icon: '🔥',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      signs: [
        '예전엔 매일 인스타 스토리였는데 최근 7일 업로드 0개',
        '친구 만나고도 "재미없었어" 반복 (전조 1순위)',
        '웃음 텐션이 확 낮아지고 연락이 뜸해짐',
        '카페·외식 지출이 갑자기 감소 → 방에만 있음',
      ] },
    { name: '담즙질 (Choleric)', color: C.nt600, icon: '🎯',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      signs: [
        '목표 체크리스트를 갑자기 미루기 시작',
        '팀원에게 예민해지고 말투가 공격적으로 변함',
        '수면 4시간 이하가 일주일 지속',
        '성과가 나와도 만족 없음 → 공허감 호소',
      ] },
    { name: '점액질 (Phlegmatic)', color: C.sj600, icon: '🌿',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      signs: [
        '루틴이 갑자기 무너짐 (식사·수면·운동)',
        '말수가 더 줄고 "괜찮아"만 반복',
        '가족 연락 응답 시간이 길어짐',
        '좋아하던 루틴(드라마·운동)에도 흥미 0',
      ] },
    { name: '우울질 (Melancholic)', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      signs: [
        '부정적 시나리오를 반복해서 곱씹음',
        '혼자 있는 시간이 2주 이상 극단적으로 길어짐',
        '감각 무뎌짐: 음식 맛·음악·날씨에 무반응',
        '"아무것도 하기 싫다" 대신 "아무것도 의미 없다"',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">4기질별 번아웃 전조 증상</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 기질에서 가장 먼저 나타나는 4가지 신호 · 3개 이상이면 회복 모드 필수</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="20" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        <text x="28" y="66" font-size="12" font-weight="600" fill="${C.textMuted}">${g.types}</text>
        ${g.signs.map((s, j) => `
          <g transform="translate(28, ${110 + j * 52})">
            <circle cx="10" cy="0" r="8" fill="${g.color}" opacity="0.25"/>
            <text x="10" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="${g.color}">${j + 1}</text>
            <text x="28" y="5" font-size="13" font-weight="600" fill="${C.textSoft}">${s}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 05 RECOVERY TIME ----------
function recoveryTime() {
  const list = [
    { t: 'ISTP', d: 3 },
    { t: 'INTP', d: 5 },
    { t: 'ENTP', d: 7 },
    { t: 'ESTP', d: 8 },
    { t: 'INTJ', d: 10 },
    { t: 'ENTJ', d: 11 },
    { t: 'ISFP', d: 12 },
    { t: 'ESFP', d: 14 },
    { t: 'ISTJ', d: 18 },
    { t: 'ESTJ', d: 20 },
    { t: 'ENFP', d: 24 },
    { t: 'INFP', d: 32 },
    { t: 'ESFJ', d: 36 },
    { t: 'ISFJ', d: 42 },
    { t: 'INFJ', d: 52 },
    { t: 'ENFJ', d: 58 },
  ];
  const MAX = 60;
  const left = 210;
  const right = 1040;
  const barW = right - left;
  const top = 115;
  const rowH = 45;

  const colorFor = (d) => {
    if (d <= 7) return C.recover;
    if (d <= 15) return C.mid;
    if (d <= 25) return '#eab308';
    if (d <= 40) return C.warn;
    return C.burn;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">유형별 번아웃 회복 기간 (평균)</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">완전 소진 → 평소 컨디션 복귀까지 · ISTP 3일, ENFJ 58일</text>

  ${list.map((r, i) => {
    const y = top + i * rowH;
    const w = Math.max(35, (r.d / MAX) * barW);
    const g = GROUP_OF[r.t];
    return `
      <text x="45" y="${y + 28}" font-size="14" font-weight="700" fill="${C.textMuted}">${String(i + 1).padStart(2, '0')}</text>
      <text x="90" y="${y + 28}" font-size="16" font-weight="800" fill="${COLOR_OF[g]}">${r.t}</text>
      <rect x="${left}" y="${y + 10}" width="${w}" height="26" rx="13" fill="${colorFor(r.d)}" opacity="0.92"/>
      <text x="${left + w - 12}" y="${y + 28}" text-anchor="end" font-size="13" font-weight="800" fill="#fff">${r.d}일</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(280, 830)">
    ${[
      { c: C.recover, label: '빠름 ~7일' },
      { c: C.mid, label: '보통 8~15일' },
      { c: '#eab308', label: '중간 16~25일' },
      { c: C.warn, label: '느림 26~40일' },
      { c: C.burn, label: '매우 느림 40일+' },
    ].map((t, i) => `
      <rect x="${i * 130}" y="0" width="14" height="14" rx="3" fill="${t.c}"/>
      <text x="${i * 130 + 22}" y="12" font-size="11" font-weight="700" fill="${C.textSoft}">${t.label}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 06 RECOVERY RITUAL ----------
function recoveryRitual() {
  const groups = [
    { name: '다혈질 회복 루틴', color: C.nf500, icon: '🔥',
      types: 'ENFP · ESFP · ESFJ · ENFJ · (회복 24~58일)',
      items: [
        '① 감정 쏟아낼 대상 확보 (민지 같은 친구 1명)',
        '② 새로운 장소 방문 (2주에 한 번은 새 카페/동네)',
        '③ SNS 30일 해독 — 다른 사람 감정 차단',
        '④ 짧은 기쁨 의식 — 하루 30분 좋아하는 일',
      ] },
    { name: '담즙질 회복 루틴', color: C.nt600, icon: '🎯',
      types: 'ENTJ · ESTJ · ENTP · ESTP · (회복 7~20일)',
      items: [
        '① "아무것도 안 하는 24시간" 확보 (제일 어려움)',
        '② 수면 8시간 강제 — 알람 앱 사용',
        '③ 성과 지표 잠시 OFF — 목표 없는 취미 도입',
        '④ 측근 1명과 약한 소리 공유',
      ] },
    { name: '점액질 회복 루틴', color: C.sj600, icon: '🌿',
      types: 'ISFJ · ISTJ · INFP · ISFP · (회복 12~42일)',
      items: [
        '① 루틴 먼저 복구 (식사·수면부터)',
        '② "안 해도 되는 일" 리스트 작성 → 삭제',
        '③ 돌봄 방향 역전 — 누군가 나를 돌보게 허락',
        '④ 조용한 재충전 공간 확보 (방·카페·산책로)',
      ] },
    { name: '우울질 회복 루틴', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP · (회복 3~52일)',
      items: [
        '① 부정 시나리오 반복 인식 → 종이에 적기',
        '② 몸을 움직이는 활동 (산책 20분)',
        '③ 감각 복구 — 음식 맛·음악·빛 의식적 인식',
        '④ 신뢰하는 1명과 5분 대화 (혼자 오래 있지 않기)',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 번아웃 회복 루틴 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 기질에 맞는 4단계 회복 프로토콜 · 오늘부터 1개씩 실천</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="20" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        <text x="28" y="66" font-size="12" font-weight="600" fill="${C.textMuted}">${g.types}</text>
        ${g.items.map((it, j) => `
          <text x="28" y="${115 + j * 52}" font-size="13" font-weight="600" fill="${C.textSoft}">${it}</text>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- RUNNER ----------
const items = [
  { name: 'burnout-01-hero', svg: hero() },
  { name: 'burnout-02-ranking', svg: ranking() },
  { name: 'burnout-03-trigger-map', svg: triggerMap() },
  { name: 'burnout-04-warning-signs', svg: warningSigns() },
  { name: 'burnout-05-recovery-time', svg: recoveryTime() },
  { name: 'burnout-06-recovery-ritual', svg: recoveryRitual() },
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
