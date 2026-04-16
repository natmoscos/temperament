// Generate infographics for "MBTI 16유형 부 축적 경로"
// Output: public/blog/wealth-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  money: '#16a34a', moneyDeep: '#15803d',
  gold: '#eab308', goldDeep: '#a16207', goldSoft: '#fef3c7',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  safe: '#16a34a', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 경제학 리포트</text>
</svg>`;

const COLOR_OF = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
const GROUP_OF = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

function hero() {
  return wrap(`
  <defs>
    <linearGradient id="wBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#d1fae5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#wBg)"/>

  <text x="180" y="200" font-size="50" opacity="0.2">💰</text>
  <text x="960" y="200" font-size="50" opacity="0.2">📈</text>
  <text x="200" y="740" font-size="50" opacity="0.2">🏠</text>
  <text x="940" y="740" font-size="50" opacity="0.2">💎</text>

  <rect x="80" y="240" width="1040" height="430" rx="36" fill="#ffffff" stroke="${C.goldDeep}" stroke-width="4" opacity="0.97"/>
  <text x="600" y="320" text-anchor="middle" font-size="30" font-weight="800" fill="${C.goldDeep}">192TYPES · WEALTH PATH 2026</text>
  <text x="600" y="420" text-anchor="middle" font-size="72" font-weight="900" fill="${C.text}">MBTI 16유형 부 축적 경로</text>
  <text x="600" y="500" text-anchor="middle" font-size="40" font-weight="700" fill="${C.textSoft}">20대 → 60대 자산 설계 로드맵</text>
  <text x="600" y="600" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">유형별 최적 자산 · 소득 루트 · 시기별 전략</text>
  `);
}

function pathTable() {
  const data = [
    { type: 'INTJ', path: '창업 · 지분 · 장기 집중 투자', asset: '기업 지분 · 인덱스 · 부동산' },
    { type: 'INTP', path: '전문 프리랜서 · 저작권 · 강의', asset: '개인 브랜드 · 저작권 · 주식' },
    { type: 'ENTJ', path: '창업 · CEO · M&amp;A', asset: '기업 지분 · 부동산 · 사업체' },
    { type: 'ENTP', path: '시리얼 창업 · 여러 사업', asset: '스타트업 지분 · 파트너 투자' },
    { type: 'INFJ', path: '저술 · 상담 · 의미 브랜드', asset: '저작권 · 클래스 · 소자본' },
    { type: 'INFP', path: '콘텐츠 · 작가 · 치료사', asset: '저작권 · 스트리밍 · 아트' },
    { type: 'ENFJ', path: 'HR · 교육 · 강연 · 리더십', asset: '브랜드 · 강연료 · 지분' },
    { type: 'ENFP', path: '마케팅 · 크리에이티브 · 미디어', asset: 'SNS 브랜드 · 광고 · 스타트업' },
    { type: 'ISTJ', path: '전문직 · 꾸준 저축 · 부동산', asset: '예금 · 부동산 · 배당주' },
    { type: 'ISFJ', path: '공무원 · 간호 · 교육 · 안정', asset: '예금 · 연금 · 배당주' },
    { type: 'ESTJ', path: '대기업 임원 · 경영직', asset: '임원 스톡옵션 · 부동산' },
    { type: 'ESFJ', path: '영업 · 서비스 · 팀 리더', asset: '부동산 · 장기 예금 · 배당' },
    { type: 'ISTP', path: '기술직 · 1인 사업 · 프리랜서', asset: '기술 장비 · 실전 자산' },
    { type: 'ISFP', path: '예술 · 디자인 · 크리에이터', asset: '아트 · 콘텐츠 · 소자본' },
    { type: 'ESTP', path: '세일즈 · 부동산 · 단기 트레이딩', asset: '부동산 · 주식 · 사업체' },
    { type: 'ESFP', path: '이벤트 · 엔터 · 서비스', asset: '현금흐름 사업체 · 예금' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 최적 부 축적 경로</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">주기능 강점 기반 · 추천 소득 루트 + 자산 포트폴리오</text>

  ${data.map((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 560;
    const y = 110 + row * 92;
    const color = COLOR_OF[GROUP_OF[d.type]];
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="82" rx="14" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="82" rx="4" fill="${color}"/>

        <g transform="translate(25, 20)">
          <rect width="70" height="40" rx="10" fill="${color}"/>
          <text x="35" y="28" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${d.type}</text>
        </g>

        <text x="110" y="30" font-size="12" font-weight="800" fill="${color}">소득 루트</text>
        <text x="110" y="50" font-size="12" font-weight="600" fill="${C.textSoft}">${d.path}</text>

        <text x="110" y="65" font-size="10" font-weight="800" fill="${color}">주 자산</text>
        <text x="170" y="65" font-size="10" font-weight="500" fill="${C.textMuted}">${d.asset.slice(0, 36)}</text>
      </g>
    `;
  }).join('')}
  `);
}

function tempAssetMix() {
  const groups = [
    { name: 'NT 분석가형 포트폴리오', color: C.nt600, icon: '🔬',
      types: 'INTJ · INTP · ENTJ · ENTP',
      mix: [
        { label: '주식 (집중 투자 · 성장주)', pct: 50 },
        { label: '사업/지분 (창업 · 스타트업)', pct: 25 },
        { label: '부동산', pct: 15 },
        { label: '현금 · 비상금', pct: 10 },
      ] },
    { name: 'NF 이상주의형 포트폴리오', color: C.nf500, icon: '✨',
      types: 'INFJ · INFP · ENFJ · ENFP',
      mix: [
        { label: '인덱스 · ESG 펀드', pct: 45 },
        { label: '개인 브랜드 · 콘텐츠', pct: 20 },
        { label: '부동산', pct: 20 },
        { label: '현금', pct: 15 },
      ] },
    { name: 'SJ 관리자형 포트폴리오', color: C.sj600, icon: '🏦',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      mix: [
        { label: '부동산 (거주 + 수익)', pct: 40 },
        { label: '배당주 · 인덱스', pct: 30 },
        { label: '예금 · 연금', pct: 20 },
        { label: '현금', pct: 10 },
      ] },
    { name: 'SP 기회포착형 포트폴리오', color: C.sp600, icon: '🚀',
      types: 'ISTP · ISFP · ESTP · ESFP',
      mix: [
        { label: '부동산 (실거주 + 투자)', pct: 35 },
        { label: '사업체 · 사이드 소득', pct: 25 },
        { label: '주식 (중단기)', pct: 20 },
        { label: '비상금 6개월+', pct: 20 },
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 510 }, { x: 620, y: 510 },
  ];
  const w = 520, h = 360;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4기질별 자산 배분 모델</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">기질 DNA에 맞는 최적 포트폴리오 믹스 · 30~40대 기준</text>

  ${positions.map((p, i) => {
    const m = groups[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="22" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="12" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        ${m.mix.map((mx, j) => {
          const y = 110 + j * 60;
          const barW = mx.pct * 4.2;
          return `
            <text x="30" y="${y}" font-size="13" font-weight="700" fill="${C.text}">${mx.label}</text>
            <rect x="30" y="${y + 8}" width="${barW}" height="20" rx="10" fill="${m.color}" opacity="0.25"/>
            <rect x="30" y="${y + 8}" width="${barW}" height="20" rx="10" fill="${m.color}" opacity="0.85"/>
            <text x="${45 + barW}" y="${y + 23}" font-size="12" font-weight="900" fill="${m.color}">${mx.pct}%</text>
          `;
        }).join('')}
      </g>
    `;
  }).join('')}
  `);
}

function ageTimeline() {
  const stages = [
    { age: '20대', color: '#06b6d4', focus: '소득 극대 + 기본 저축',
      todo: ['첫 자산 1억 목표', '인덱스 · ETF 자동 적립', '비상금 6개월분', '커리어 투자(자격·교육)'] },
    { age: '30대', color: '#0891b2', focus: '자산 복리 본격화',
      todo: ['부동산 · 주식 비율 설정', '사이드 소득 1개', '월 50만+ 재투자', '장기 연금 시작'] },
    { age: '40대', color: '#059669', focus: '피크 소득 · 자산 레버리지',
      todo: ['자산 10억 목표', '창업/투자 실행', '자녀 교육 재정 분리', '건강 투자 필수'] },
    { age: '50대', color: '#eab308', focus: '자산 보존 + 은퇴 준비',
      todo: ['리스크 자산 비중 감소', '배당 수익 전환', '독립 옵션 마련', '현금흐름 자산 구축'] },
    { age: '60대+', color: '#a16207', focus: '은퇴 · 패시브 소득',
      todo: ['월 400만+ 패시브 목표', '자산 분산 (예금·부동산·주식)', '상속 계획', '의미 있는 지출'] },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">20대 → 60대 자산 설계 로드맵</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">연령대별 부 축적 단계 · 모든 유형 공통 타임라인</text>

  ${stages.map((s, i) => {
    const y = 120 + i * 145;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="130" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="130" rx="4" fill="${s.color}"/>

        <circle cx="60" cy="65" r="40" fill="${s.color}" opacity="0.15"/>
        <text x="60" y="76" text-anchor="middle" font-size="22" font-weight="900" fill="${s.color}">${s.age}</text>

        <text x="130" y="45" font-size="19" font-weight="900" fill="${s.color}">${s.focus}</text>

        ${s.todo.map((t, j) => `
          <g transform="translate(${130 + (j % 2) * 430}, ${75 + Math.floor(j / 2) * 28})">
            <circle cx="6" cy="-4" r="5" fill="${s.color}"/>
            <text x="20" y="0" font-size="13" font-weight="600" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

function riskMap() {
  const risks = [
    { type: 'ENFP', pos: { x: 200, y: 220 }, risk: 'HIGH', note: '감정 소비' },
    { type: 'ESFP', pos: { x: 260, y: 270 }, risk: 'HIGH', note: '충동 소비' },
    { type: 'INFP', pos: { x: 240, y: 320 }, risk: 'HIGH', note: '후원 소비' },
    { type: 'ISFP', pos: { x: 220, y: 370 }, risk: 'HIGH', note: '감성 소비' },
    { type: 'ENTP', pos: { x: 330, y: 250 }, risk: 'MID', note: '새 시도 과다' },
    { type: 'ESTP', pos: { x: 340, y: 330 }, risk: 'MID', note: '리스크 과잉' },
    { type: 'ENFJ', pos: { x: 310, y: 410 }, risk: 'MID', note: '타인 지원 과다' },
    { type: 'INFJ', pos: { x: 300, y: 460 }, risk: 'MID', note: '이상 투자' },
    { type: 'ESFJ', pos: { x: 780, y: 250 }, risk: 'LOW-MID', note: '선물 비용' },
    { type: 'ISFJ', pos: { x: 760, y: 310 }, risk: 'LOW', note: '가족 위한 저축' },
    { type: 'ENTJ', pos: { x: 880, y: 250 }, risk: 'LOW', note: '체계 투자' },
    { type: 'INTP', pos: { x: 890, y: 330 }, risk: 'LOW', note: '이론 과다' },
    { type: 'ESTJ', pos: { x: 870, y: 420 }, risk: 'LOW', note: '체계 저축' },
    { type: 'ISTJ', pos: { x: 890, y: 490 }, risk: 'LOW', note: '장기 안정' },
    { type: 'ISTP', pos: { x: 830, y: 560 }, risk: 'LOW', note: '실용 투자' },
    { type: 'INTJ', pos: { x: 820, y: 640 }, risk: 'LOW', note: '계산된 리스크' },
  ];
  const rColor = { HIGH: '#dc2626', MID: '#f59e0b', 'LOW-MID': '#84cc16', LOW: '#16a34a' };

  return wrap(`
  <text x="600" y="45" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 재정 리스크 매트릭스</text>
  <text x="600" y="72" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">가로 = 감정(좌) vs 논리(우), 세로 = 직관(상) vs 감각(하)</text>

  <!-- Axes -->
  <line x1="600" y1="110" x2="600" y2="780" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>
  <line x1="120" y1="445" x2="1080" y2="445" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>

  <text x="600" y="100" text-anchor="middle" font-size="13" font-weight="800" fill="${C.nt600}">직관 N (미래)</text>
  <text x="600" y="800" text-anchor="middle" font-size="13" font-weight="800" fill="${C.nt600}">감각 S (현재)</text>
  <text x="130" y="450" font-size="13" font-weight="800" fill="${C.nf600}">감정 F</text>
  <text x="1015" y="450" font-size="13" font-weight="800" fill="${C.nt600}">논리 T</text>

  <!-- Quadrant backgrounds -->
  <rect x="120" y="110" width="480" height="335" fill="${C.nf50}" opacity="0.35"/>
  <rect x="600" y="110" width="480" height="335" fill="${C.nt50}" opacity="0.35"/>
  <rect x="120" y="445" width="480" height="335" fill="${C.sp50}" opacity="0.35"/>
  <rect x="600" y="445" width="480" height="335" fill="${C.sj50}" opacity="0.35"/>

  ${risks.map(r => {
    const color = rColor[r.risk];
    return `
      <circle cx="${r.pos.x}" cy="${r.pos.y}" r="28" fill="${color}" opacity="0.2"/>
      <circle cx="${r.pos.x}" cy="${r.pos.y}" r="22" fill="${color}" opacity="0.85" stroke="#fff" stroke-width="2"/>
      <text x="${r.pos.x}" y="${r.pos.y + 4}" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">${r.type}</text>
    `;
  }).join('')}

  <!-- Legend -->
  <g transform="translate(120, 810)">
    <circle cx="15" cy="12" r="10" fill="${rColor.LOW}"/>
    <text x="35" y="17" font-size="12" font-weight="700" fill="${C.textSoft}">LOW · 재정 안정 DNA</text>

    <circle cx="240" cy="12" r="10" fill="${rColor['LOW-MID']}"/>
    <text x="260" y="17" font-size="12" font-weight="700" fill="${C.textSoft}">LOW-MID · 안정형</text>

    <circle cx="460" cy="12" r="10" fill="${rColor.MID}"/>
    <text x="480" y="17" font-size="12" font-weight="700" fill="${C.textSoft}">MID · 관리 필요</text>

    <circle cx="670" cy="12" r="10" fill="${rColor.HIGH}"/>
    <text x="690" y="17" font-size="12" font-weight="700" fill="${C.textSoft}">HIGH · 시스템 필수</text>
  </g>
  `);
}

function actionPlan() {
  const groups = [
    { name: 'NT 부 축적 플랜', color: C.nt600, icon: '🔬',
      types: 'INTJ · INTP · ENTJ · ENTP',
      items: [
        '① 20대: 창업·고연봉 전문직 베이스 구축',
        '② 30대: 지분/주식 복리 집중 (재투자 70%+)',
        '③ 40대: 사업 레버리지 · 인재 영입',
        '④ 50대+: 장기 복리 폭발 · 은퇴도 장기 관점',
      ] },
    { name: 'NF 부 축적 플랜', color: C.nf500, icon: '✨',
      types: 'INFJ · INFP · ENFJ · ENFP',
      items: [
        '① 20대: 감정 소비 방지 · 자동이체 시스템',
        '② 30대: 브랜드/콘텐츠 구축 · 의미 소득',
        '③ 40대: 개인 브랜드 폭발 · 콘텐츠 복리',
        '④ 50대+: 저술·강연·멘토 2모작',
      ] },
    { name: 'SJ 부 축적 플랜', color: C.sj600, icon: '🏦',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      items: [
        '① 20대: 안정 본업 + 꾸준 저축 30%+',
        '② 30대: 거주 부동산 · 배당주 복리',
        '③ 40대: 자산 1순위 · 리밸런싱 루틴',
        '④ 50대+: 연금 + 배당 · 안정 은퇴',
      ] },
    { name: 'SP 부 축적 플랜', color: C.sp600, icon: '🚀',
      types: 'ISTP · ISFP · ESTP · ESFP',
      items: [
        '① 20대: 현장 경험 축적 + 비상금 확보',
        '② 30대: 세일즈·부동산·사업체 기회 포착',
        '③ 40대: 실전 자산 복수화 · 부동산 레버리지',
        '④ 50대+: 패시브 전환 · 현금흐름 자산',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 20~60대 부 축적 로드맵</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 유형에 맞는 연령대별 실행 체크리스트</text>

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

const items = [
  { name: 'wealth-01-hero', svg: hero() },
  { name: 'wealth-02-path', svg: pathTable() },
  { name: 'wealth-03-asset-mix', svg: tempAssetMix() },
  { name: 'wealth-04-timeline', svg: ageTimeline() },
  { name: 'wealth-05-risk-map', svg: riskMap() },
  { name: 'wealth-06-action', svg: actionPlan() },
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

run();
