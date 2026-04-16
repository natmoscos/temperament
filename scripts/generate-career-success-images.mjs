// Generate infographics for "MBTI 커리어 성공률 2026 — 유형별 연봉 상승 속도 랭킹"
// Output: public/blog/career-{name}.{svg,webp}
//
// Image set (6):
//   01 hero             - 브랜드 히어로
//   02 salary-growth    - 16유형 연봉 상승 속도 랭킹
//   03 curve-shapes     - 4기질별 커리어 성장 곡선
//   04 job-fit-matrix   - 16유형 × 직무 적합성 매트릭스
//   05 promotion-pattern - 승진 & 이직 타이밍 패턴
//   06 ritual           - 기질별 커리어 성장 체크리스트

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
  success: '#22c55e', gold: '#eab308', growth: '#0284c7',
  safe: '#16a34a', mid: '#84cc16', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 커리어 리포트</text>
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
      <stop offset="100%" stop-color="#eff6ff"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hG)"/>

  <!-- Success graph bars in background -->
  ${[
    { x: 140, y: 680, h: 120, label: 'ENTJ', c: C.nt600 },
    { x: 220, y: 640, h: 160, label: 'INTJ', c: C.nt700 },
    { x: 300, y: 660, h: 140, label: 'ESTJ', c: C.sj600 },
    { x: 900, y: 700, h: 100, label: 'ENFP', c: C.nf500 },
    { x: 980, y: 720, h: 80,  label: 'INFP', c: C.nf600 },
    { x: 1060, y: 680, h: 120, label: 'INFJ', c: C.nf700 },
  ].map(b => `
    <rect x="${b.x}" y="${b.y}" width="56" height="${b.h}" rx="6" fill="${b.c}" opacity="0.3"/>
    <rect x="${b.x}" y="${b.y}" width="56" height="${b.h}" rx="6" fill="${b.c}" opacity="0.7" stroke="${b.c}" stroke-width="2"/>
    <text x="${b.x + 28}" y="${b.y - 10}" text-anchor="middle" font-size="12" font-weight="800" fill="${b.c}">${b.label}</text>
  `).join('')}

  <!-- Upward arrows -->
  <text x="420" y="300" font-size="50" opacity="0.15">📈</text>
  <text x="780" y="280" font-size="45" opacity="0.15">💼</text>
  <text x="450" y="620" font-size="40" opacity="0.15">⭐</text>

  <!-- Center card -->
  <rect x="290" y="230" width="620" height="340" rx="28" fill="#ffffff" stroke="${C.border}"/>
  <text x="600" y="285" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textMuted}" letter-spacing="8">CAREER SUCCESS · 2026</text>
  <text x="600" y="380" text-anchor="middle" font-size="72" font-weight="900" fill="${C.text}">MBTI 커리어 성공률</text>
  <text x="600" y="440" text-anchor="middle" font-size="38" font-weight="800" fill="${C.growth}">유형별 연봉 상승 속도 랭킹</text>
  <line x1="460" y1="428" x2="740" y2="428" stroke="${C.border}"/>
  <text x="600" y="510" text-anchor="middle" font-size="24" font-weight="700" fill="${C.textSoft}">16유형 × 4기질별 커리어 성장 곡선</text>
  <text x="600" y="555" text-anchor="middle" font-size="20" font-weight="600" fill="${C.textMuted}">연봉 속도 · 직무 적성 · 승진 타이밍 · 이직 패턴</text>
  <text x="600" y="600" text-anchor="middle" font-size="16" font-weight="500" fill="${C.textFaint}">© 192types · 박서연의 현장 관찰 N=612</text>
  `);
}

// ---------- 02 SALARY GROWTH RANKING ----------
function salaryGrowth() {
  const list = [
    { t: 'ENTJ', v: 94, note: '전략적 이직 + 협상력 최상위' },
    { t: 'INTJ', v: 88, note: '10년 플랜 기반 폭발적 점프' },
    { t: 'ESTJ', v: 84, note: '조직 내 승진 속도 최상위' },
    { t: 'ENTP', v: 78, note: '창업/프리랜서로 상한선 돌파' },
    { t: 'ESTP', v: 72, note: '영업·사업 인센티브 레버리지' },
    { t: 'INTP', v: 68, note: '전문성 축적 후 후반 폭발' },
    { t: 'ESFJ', v: 64, note: '관계 자본 기반 꾸준한 상승' },
    { t: 'ISTJ', v: 60, note: '성실 누적형 · 15년차 역전' },
    { t: 'ENFJ', v: 56, note: '리더십 → 매니지먼트 경로' },
    { t: 'ENFP', v: 52, note: '브랜드·콘텐츠·교육 분야 강세' },
    { t: 'ISTP', v: 48, note: '기술직 전문가 프리미엄' },
    { t: 'ISFJ', v: 42, note: '안정 지향 → 대기업 장기근속' },
    { t: 'INFJ', v: 38, note: '상담·기획 분야 깊이 있는 성장' },
    { t: 'ESFP', v: 34, note: '퍼포먼스·서비스 분야 성장' },
    { t: 'ISFP', v: 30, note: '크리에이터·공예 슬로우 빌드' },
    { t: 'INFP', v: 26, note: '의미 중심 → 금전 후순위 선택' },
  ];
  const top = 110;
  const rowH = 44;
  const left = 210;
  const barW = 820;

  const colorFor = (v) => {
    if (v >= 80) return C.success;
    if (v >= 60) return C.mid;
    if (v >= 40) return C.gold;
    if (v >= 25) return C.warn;
    return '#f87171';
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">16유형 연봉 상승 속도 랭킹</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">입사 초봉 대비 10년차 연봉 배율 기준 · 인지기능 + 기질 보정 · 100점 만점</text>

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

  <g transform="translate(260, 825)">
    ${[
      { c: C.success, label: '급상승 80+' },
      { c: C.mid, label: '성장 60~79' },
      { c: C.gold, label: '안정 40~59' },
      { c: C.warn, label: '슬로우 25~39' },
      { c: '#f87171', label: '비금전형 ~24' },
    ].map((t, i) => `
      <rect x="${i * 140}" y="0" width="14" height="14" rx="3" fill="${t.c}"/>
      <text x="${i * 140 + 22}" y="12" font-size="11" font-weight="700" fill="${C.textSoft}">${t.label}</text>
    `).join('')}
  </g>
  `);
}

// ---------- 03 CAREER CURVE SHAPES ----------
function curveShapes() {
  const W = 1200, H = 900;
  const groups = [
    { name: '담즙질 커브 · ENTJ·ESTJ·ENTP·ESTP',
      color: C.nt600,
      desc: '초반 급가속 → 30대 초 플래토 → 임원 점프',
      curve: 'sprint' },
    { name: '우울질 커브 · INTJ·INFJ·INTP·ISTP',
      color: C.nt700,
      desc: '느린 시작 → 전문성 축적 → 후반 폭발',
      curve: 'lateboom' },
    { name: '점액질 커브 · ISFJ·ISTJ·INFP·ISFP',
      color: C.sj600,
      desc: '안정적 누적 → 15년차 이후 역전',
      curve: 'linear' },
    { name: '다혈질 커브 · ENFP·ESFP·ESFJ·ENFJ',
      color: C.nf500,
      desc: '관계 확장형 · 파동형 성장',
      curve: 'wave' },
  ];
  const cardW = 520, cardH = 310;
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 470 },
    { x: 620, y: 470 },
  ];

  const makeCurve = (type, color) => {
    if (type === 'sprint') {
      return `<path d="M20,180 Q50,120 120,70 Q200,50 280,60 L400,55 Q440,30 460,18" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'lateboom') {
      return `<path d="M20,180 L100,170 Q180,155 260,130 Q340,80 400,40 L460,20" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'linear') {
      return `<path d="M20,180 L100,150 L180,120 L260,90 L340,60 L460,35" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    if (type === 'wave') {
      return `<path d="M20,180 Q60,100 110,140 Q160,60 220,90 Q280,30 340,70 Q400,20 460,50" stroke="${color}" stroke-width="4" fill="none"/>`;
    }
    return '';
  };

  return wrap(`
  <text x="600" y="55" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">4기질별 커리어 성장 곡선</text>
  <text x="600" y="82" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">연봉만이 아닌 "어떤 모양으로 성장하느냐" · 네 기질이 네 속도를 결정해</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <text x="28" y="40" font-size="17" font-weight="800" fill="${g.color}">${g.name}</text>
        <text x="28" y="65" font-size="12" font-weight="500" fill="${C.textMuted}">${g.desc}</text>
        <g transform="translate(28, 95)">
          <line x1="0" y1="180" x2="470" y2="180" stroke="${C.divider}"/>
          <line x1="0" y1="0" x2="0" y2="180" stroke="${C.divider}"/>
          <text x="-8" y="8" text-anchor="end" font-size="10" fill="${C.textFaint}">연봉</text>
          <text x="465" y="198" text-anchor="end" font-size="10" fill="${C.textFaint}">연차 →</text>
          <!-- years axis -->
          <text x="0" y="198" text-anchor="middle" font-size="9" fill="${C.textFaint}">1</text>
          <text x="120" y="198" text-anchor="middle" font-size="9" fill="${C.textFaint}">5</text>
          <text x="240" y="198" text-anchor="middle" font-size="9" fill="${C.textFaint}">10</text>
          <text x="360" y="198" text-anchor="middle" font-size="9" fill="${C.textFaint}">15</text>
          <text x="460" y="198" text-anchor="middle" font-size="9" fill="${C.textFaint}">20</text>
          <line x1="0" y1="45" x2="470" y2="45" stroke="${C.bgSoft || '#f3f4f6'}"/>
          <line x1="0" y1="90" x2="470" y2="90" stroke="${C.bgSoft || '#f3f4f6'}"/>
          <line x1="0" y1="135" x2="470" y2="135" stroke="${C.bgSoft || '#f3f4f6'}"/>
          ${makeCurve(g.curve, g.color)}
        </g>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 JOB FIT MATRIX ----------
function jobFitMatrix() {
  const items = [
    { t: 'INTJ', fit: '전략컨설팅 · 투자분석 · AI엔지니어 · 경영기획' },
    { t: 'INTP', fit: '연구원 · 데이터사이언스 · SW아키텍처 · 저술가' },
    { t: 'ENTJ', fit: '경영자 · VC · 프로덕트리드 · 전략책임자' },
    { t: 'ENTP', fit: '스타트업창업 · 마케터 · 상품기획 · 크리에이터' },
    { t: 'INFJ', fit: '상담심리 · 브랜드스토리 · HR제도 · 작가' },
    { t: 'INFP', fit: '콘텐츠에디터 · 카피라이터 · 일러스트 · NGO기획' },
    { t: 'ENFJ', fit: '교육코치 · 팀리드 · PR · 강연가 · 커뮤니티매니저' },
    { t: 'ENFP', fit: '브랜드마케터 · PD · 크리에이터 · 교육/코칭' },
    { t: 'ISTJ', fit: '회계사 · 감사 · 공무원 · 법무 · 품질관리' },
    { t: 'ISFJ', fit: '간호사 · 교사 · HR운영 · 상담 · 비서/지원' },
    { t: 'ESTJ', fit: '프로젝트매니저 · 영업팀장 · 군·공공리더 · 관리자' },
    { t: 'ESFJ', fit: '이벤트기획 · 호텔·서비스 · 간호·교육 매니저' },
    { t: 'ISTP', fit: '엔지니어 · 기술직 · 공예 · 스포츠 · 분석가' },
    { t: 'ISFP', fit: '디자이너 · 포토그래퍼 · 요리 · 플로리스트' },
    { t: 'ESTP', fit: '세일즈 · 트레이더 · 부동산 · 이벤트 · 스포츠마케팅' },
    { t: 'ESFP', fit: '퍼포머 · 방송 · MC · 서비스 · 패션 MD' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">16유형 × 직무 적합성 매트릭스</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">인지기능 강점 기반 · 상위 4~5개 직무 추천 (N=612 커리어 만족도 데이터)</text>

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
      <text x="${x + 22}" y="${y + 57}" font-size="12" font-weight="600" fill="${C.textSoft}">${it.fit}</text>
    `;
  }).join('')}
  `);
}

// ---------- 05 PROMOTION PATTERN ----------
function promotionPattern() {
  const patterns = [
    { name: '빠른 내부 승진', color: C.success, icon: '🚀',
      types: 'ENTJ · ESTJ · ENFJ',
      when: '3~5년차 첫 승진 · 10년 내 팀장급',
      how: [
        '조직 정치에 능하고 상사 신뢰 확보 빠름',
        '가시적 성과 지표를 잘 관리',
        '승진 타이밍에 자기 PR 적극적',
        '이직보다 내부 사다리가 유리',
      ] },
    { name: '전략적 이직 점프', color: C.growth, icon: '🎯',
      types: 'INTJ · ENTP · ESTP · INTP',
      when: '3~4년 주기 이직 · 연봉 20~40% 점프',
      how: [
        '시장 가치 데이터 기반 협상',
        '이직 전 6개월 포트폴리오 빌드',
        '업계 네트워크로 숨은 포지션 포착',
        '한 회사 최대 5년 원칙',
      ] },
    { name: '전문성 프리미엄', color: C.gold, icon: '🛠',
      types: 'ISTP · INTP · ISTJ · INFJ',
      when: '10~15년차 전문가 프리미엄 발동',
      how: [
        '특정 분야 10년+ 깊이 축적',
        '자격증 · 저술 · 강연으로 권위 축적',
        '프리랜서/컨설팅 전환 시기 포착',
        '이직보다 독립이 레버리지',
      ] },
    { name: '느린 누적 + 후반 폭발', color: C.mid, icon: '🌱',
      types: 'ISFJ · ENFP · INFP · ISFP · ESFP',
      when: '15년+ 안정 누적 → 40대 터닝포인트',
      how: [
        '초중기 연봉보다 의미·환경 우선',
        '번아웃 방지 루틴이 최대 자산',
        '40대 자기 브랜드 구축 → 폭발',
        '창업/콘텐츠/강의로 2모작 성공',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">MBTI 승진 &amp; 이직 4대 패턴</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 성장 패턴을 알면 언제 이직/승진을 노려야 하는지 보여</text>

  ${positions.map((p, i) => {
    const g = patterns[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="20" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        <text x="28" y="66" font-size="12" font-weight="600" fill="${C.textMuted}">${g.types}</text>
        <text x="28" y="90" font-size="12" font-weight="700" fill="${C.textSoft}">· ${g.when}</text>
        ${g.how.map((h, j) => `
          <g transform="translate(28, ${125 + j * 44})">
            <circle cx="8" cy="0" r="7" fill="${g.color}" opacity="0.25"/>
            <text x="8" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="${g.color}">${j + 1}</text>
            <text x="26" y="4" font-size="13" font-weight="600" fill="${C.textSoft}">${h}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 06 TEMPERAMENT CAREER RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 커리어 전략', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 3년 단위 커리어 이야기 만들기 (브랜드 서사)',
        '② 번아웃 방지 루틴이 최대 자산 — 월 2일 휴식 강제',
        '③ 관계 자본은 투자가치 → 동료 식사·네트워킹',
        '④ 돈보다 의미 우선하되, 40대까진 기본급 방어',
      ] },
    { name: '담즙질 커리어 전략', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 3~5년 이직 사이클 · 협상 프레임 연습',
        '② 시장가치 데이터베이스 관리 (링크드인 + 레퍼런스)',
        '③ 부하 직원 번아웃 감시 — 성과 지속성 확보',
        '④ 건강 투자 필수 — 40대 급격 쇠퇴 예방',
      ] },
    { name: '점액질 커리어 전략', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 자격증·면허 축적 = 장기 경쟁력',
        '② 연봉 협상 연습 3회/년 — 암묵적 낮춤 방지',
        '③ 안정적 대기업보다 "안정 + 의미" 찾기',
        '④ 15년차에 전문가 독립 옵션 준비',
      ] },
    { name: '우울질 커리어 전략', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 깊이 우선 전략 — 한 분야 10년 이상',
        '② 자기 PR 약점 보완 — 외부 매체 5회/년 기고',
        '③ 완벽주의 조기 마감 — "80% 완성 후 공개"',
        '④ 팀장보다 전문가 트랙이 유리',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 커리어 성장 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 기질에 최적화된 4단계 실전 전략 · 지금 1개부터 시작</text>

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
  { name: 'career-01-hero', svg: hero() },
  { name: 'career-02-salary-growth', svg: salaryGrowth() },
  { name: 'career-03-curve-shapes', svg: curveShapes() },
  { name: 'career-04-job-fit-matrix', svg: jobFitMatrix() },
  { name: 'career-05-promotion-pattern', svg: promotionPattern() },
  { name: 'career-06-ritual', svg: ritual() },
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
