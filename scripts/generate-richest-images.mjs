// Generate infographics for "세계 부자 TOP 10 MBTI 분석"
// Output: public/blog/richest-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  gold: '#eab308', goldDeep: '#a16207', goldSoft: '#fef9c3',
  money: '#16a34a', moneyDeep: '#15803d',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
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
    <linearGradient id="rBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="100%" stop-color="#fffbeb"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#rBg)"/>

  <text x="180" y="200" font-size="55" opacity="0.2">💰</text>
  <text x="960" y="180" font-size="55" opacity="0.2">🏆</text>
  <text x="200" y="760" font-size="50" opacity="0.2">📈</text>
  <text x="940" y="740" font-size="55" opacity="0.2">💎</text>

  <rect x="180" y="300" width="840" height="280" rx="32" fill="#ffffff" stroke="${C.goldDeep}" stroke-width="3" opacity="0.97"/>
  <text x="600" y="370" text-anchor="middle" font-size="22" font-weight="700" fill="${C.goldDeep}">192TYPES · ECONOMICS REPORT 2026</text>
  <text x="600" y="445" text-anchor="middle" font-size="48" font-weight="900" fill="${C.text}">세계 부자 TOP 10 MBTI</text>
  <text x="600" y="495" text-anchor="middle" font-size="28" font-weight="700" fill="${C.textSoft}">머스크 · 베조스 · 자커버그 · 버핏 · LVMH</text>
  <text x="600" y="550" text-anchor="middle" font-size="17" font-weight="600" fill="${C.textMuted}">부자들의 MBTI 분포 + 공통 인지기능 패턴 분석</text>
  `);
}

function richestList() {
  const data = [
    { rank: 1, name: '일론 머스크', co: 'Tesla · SpaceX · X', mbti: 'INTJ', est: '약 4천억 달러', trait: 'Ni 비전 + Te 실행' },
    { rank: 2, name: '제프 베조스', co: 'Amazon', mbti: 'INTJ', est: '약 2천억 달러', trait: 'Ni 장기 + Te 효율' },
    { rank: 3, name: '마크 저커버그', co: 'Meta', mbti: 'INTJ', est: '약 2천억 달러', trait: 'Ni 비전 + Ti 분석' },
    { rank: 4, name: '래리 엘리슨', co: 'Oracle', mbti: 'ESTP', est: '약 1.8천억 달러', trait: 'Se 기회 + Ti 실전' },
    { rank: 5, name: '베르나르 아르노', co: 'LVMH', mbti: 'ENTJ', est: '약 1.7천억 달러', trait: 'Te 지배 + Ni 브랜드' },
    { rank: 6, name: '워런 버핏', co: 'Berkshire', mbti: 'ISTJ', est: '약 1.5천억 달러', trait: 'Si 꾸준 + Te 판단' },
    { rank: 7, name: '래리 페이지', co: 'Google/Alphabet', mbti: 'INTP', est: '약 1.5천억 달러', trait: 'Ti 논리 + Ne 혁신' },
    { rank: 8, name: '세르게이 브린', co: 'Google/Alphabet', mbti: 'INTP', est: '약 1.4천억 달러', trait: 'Ti 논리 + Ne 탐색' },
    { rank: 9, name: '빌 게이츠', co: 'Microsoft', mbti: 'INTJ', est: '약 1.4천억 달러', trait: 'Ni 전략 + Te 효율' },
    { rank: 10, name: '스티브 발머', co: 'Microsoft 前', mbti: 'ENTJ', est: '약 1.3천억 달러', trait: 'Te 추진 + Ni 구조' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">세계 부자 TOP 10 MBTI 추정</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">공개된 인터뷰 · 전기 · 행동 패턴 기반 · 2026년 기준</text>

  ${data.map((d, i) => {
    const y = 120 + i * 72;
    const color = COLOR_OF[GROUP_OF[d.mbti]];
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="62" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="62" rx="4" fill="${color}"/>

        <text x="30" y="40" font-size="22" font-weight="900" fill="${C.gold}">#${d.rank}</text>

        <text x="90" y="26" font-size="17" font-weight="900" fill="${C.text}">${d.name}</text>
        <text x="90" y="48" font-size="12" font-weight="600" fill="${C.textMuted}">${d.co}</text>

        <g transform="translate(530, 18)">
          <rect width="70" height="28" rx="14" fill="${color}"/>
          <text x="35" y="20" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">${d.mbti}</text>
        </g>

        <text x="620" y="38" font-size="13" font-weight="700" fill="${C.moneyDeep}">${d.est}</text>
        <text x="790" y="38" font-size="12" font-weight="600" fill="${C.textSoft}">${d.trait}</text>
      </g>
    `;
  }).join('')}
  `);
}

function mbtiDistribution() {
  const dist = [
    { mbti: 'INTJ', count: 4, color: C.nt700 },
    { mbti: 'ENTJ', count: 2, color: C.nt600 },
    { mbti: 'INTP', count: 2, color: C.nt500 },
    { mbti: 'ISTJ', count: 1, color: C.sj600 },
    { mbti: 'ESTP', count: 1, color: C.sp600 },
  ];
  const total = dist.reduce((s, d) => s + d.count, 0);

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">부자 TOP 10 MBTI 분포</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">NT 분석가형(INTJ+ENTJ+INTP)이 80% — 일반 인구 비율 5% 대비 16배</text>

  <!-- Bars -->
  ${dist.map((d, i) => {
    const y = 160 + i * 130;
    const barW = (d.count / 4) * 700;
    return `
      <g transform="translate(200, ${y})">
        <text x="0" y="40" font-size="24" font-weight="900" fill="${d.color}">${d.mbti}</text>
        <rect x="120" y="20" width="${barW}" height="44" rx="22" fill="${d.color}" opacity="0.25"/>
        <rect x="120" y="20" width="${barW}" height="44" rx="22" fill="${d.color}" opacity="0.85"/>
        <text x="${130 + barW}" y="48" font-size="20" font-weight="900" fill="${d.color}">${d.count}명</text>
        <text x="${130 + barW + 60}" y="48" font-size="14" font-weight="600" fill="${C.textMuted}">${Math.round(d.count / total * 100)}%</text>
      </g>
    `;
  }).join('')}

  <!-- Insight box -->
  <rect x="100" y="810" width="1000" height="70" rx="16" fill="${C.goldSoft}" stroke="${C.goldDeep}"/>
  <text x="600" y="840" text-anchor="middle" font-size="14" font-weight="800" fill="${C.goldDeep}">💡 공통점: Ni(장기 비전) 또는 Ti(논리 분석) 주·보조기능 · Te(효율 실행) 보유</text>
  <text x="600" y="865" text-anchor="middle" font-size="13" font-weight="600" fill="${C.text}">→ "10~20년 미래 설계 + 감정 배제한 실행" 조합이 부의 공식</text>
  `);
}

function commonFunctions() {
  const funcs = [
    { code: 'Ni', name: '내향 직관', pct: 60, why: '장기 비전 · 10년 후 시나리오 감지' },
    { code: 'Te', name: '외향 사고', pct: 70, why: '감정 배제 + 효율 극대화 실행' },
    { code: 'Ti', name: '내향 사고', pct: 40, why: '시스템 · 논리 구조 분석' },
    { code: 'Se', name: '외향 감각', pct: 20, why: '실시간 기회 포착(소수형)' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">부자 TOP 10 공통 인지기능</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">사용 빈도 % · Ni + Te 조합이 핵심 "부의 공식"</text>

  ${funcs.map((f, i) => {
    const y = 150 + i * 160;
    const barW = f.pct * 8;
    const color = i < 2 ? C.nt700 : i === 2 ? C.nt500 : C.sp600;
    return `
      <g transform="translate(120, ${y})">
        <circle cx="40" cy="40" r="40" fill="${color}" opacity="0.15"/>
        <circle cx="40" cy="40" r="36" fill="${color}" opacity="0.85"/>
        <text x="40" y="47" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">${f.code}</text>

        <text x="110" y="30" font-size="20" font-weight="800" fill="${color}">${f.name}</text>

        <rect x="110" y="48" width="${barW}" height="22" rx="11" fill="${color}" opacity="0.25"/>
        <rect x="110" y="48" width="${barW}" height="22" rx="11" fill="${color}" opacity="0.85"/>
        <text x="${120 + barW}" y="65" font-size="14" font-weight="900" fill="${color}">${f.pct}%</text>

        <text x="110" y="98" font-size="13" font-weight="500" fill="${C.textSoft}">${f.why}</text>
      </g>
    `;
  }).join('')}
  `);
}

function pathToWealth() {
  const paths = [
    { path: '1. 비전 설계', stage: 'Ni', color: C.nt700, icon: '🔭',
      what: '10~20년 후 미래 시나리오 그리기',
      how: '3개 시나리오 작성 → 가장 유망한 1개 선택' },
    { path: '2. 시스템 구축', stage: 'Ti/Te', color: C.nt600, icon: '⚙️',
      what: '아이디어를 확장 가능한 구조로',
      how: '수익 모델 · 조직 · 자동화 시스템 설계' },
    { path: '3. 자본 레버리지', stage: 'Te', color: C.sj600, icon: '💼',
      what: '자본 · 인재 · 기술을 규모화',
      how: '투자 유치 · 인재 영입 · 제휴 확장' },
    { path: '4. 감정 배제 실행', stage: 'Te', color: C.sj700, icon: '🎯',
      what: '단기 소음 무시하고 계획 고수',
      how: '데이터 기반 판단 · 감정 흔들림 차단' },
    { path: '5. 장기 복리 신뢰', stage: 'Ni', color: C.money, icon: '📈',
      what: '10~30년 복리 힘 믿기',
      how: '단기 이익 포기 · 지속 재투자' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">부자 5단계 경로 — 공통 패턴</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">TOP 10 부자들의 공통 부 축적 단계 · 인지기능 활용 흐름</text>

  ${paths.map((p, i) => {
    const y = 130 + i * 150;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="130" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="130" rx="4" fill="${p.color}"/>

        <circle cx="60" cy="65" r="40" fill="${p.color}" opacity="0.15"/>
        <text x="60" y="78" text-anchor="middle" font-size="32">${p.icon}</text>

        <text x="130" y="45" font-size="20" font-weight="900" fill="${p.color}">${p.path}</text>
        <g transform="translate(130, 58)">
          <rect width="65" height="22" rx="11" fill="${p.color}" opacity="0.2"/>
          <text x="32" y="16" text-anchor="middle" font-size="12" font-weight="900" fill="${p.color}">${p.stage}</text>
        </g>

        <text x="220" y="74" font-size="15" font-weight="700" fill="${C.textSoft}">${p.what}</text>
        <text x="130" y="105" font-size="13" font-weight="500" fill="${C.textMuted}">👉 ${p.how}</text>
      </g>
    `;
  }).join('')}
  `);
}

function actionGuide() {
  const groups = [
    { name: 'NT (분석가형) 부 축적', color: C.nt600, icon: '🔮',
      types: 'INTJ · INTP · ENTJ · ENTP',
      items: [
        '① 네 강점 활용 — 10년 비전 + 시스템 구축',
        '② 단기 트레이딩보다 장기 성장 자산',
        '③ 사업 또는 고연봉 전문직이 최적',
        '④ 조급함 경계 — 복리는 10년 후 터짐',
      ] },
    { name: 'NF (이상주의형) 부 축적', color: C.nf500, icon: '✨',
      types: 'INFJ · INFP · ENFJ · ENFP',
      items: [
        '① 의미 있는 브랜드 · 콘텐츠 제작',
        '② 감정 소비 방지 + 공동 계좌 설계',
        '③ 파트너 재정관리자 둘 것',
        '④ 가치 일치하는 투자만 (ESG · 임팩트)',
      ] },
    { name: 'SJ (관리자형) 부 축적', color: C.sj600, icon: '🏦',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      items: [
        '① 버핏형 장기 꾸준 투자 최적',
        '② 자산 배분 체계화 · 리밸런싱 고정',
        '③ 안정 자산 70% + 성장 자산 30%',
        '④ 공무원 · 전문직 + 부업 소득',
      ] },
    { name: 'SP (기회포착형) 부 축적', color: C.sp600, icon: '🚀',
      types: 'ISTP · ISFP · ESTP · ESFP',
      items: [
        '① 실전 감각 활용 — 부동산 · 세일즈',
        '② 단기 트레이딩 재능 있으나 리스크 관리',
        '③ 비상금 6개월분 무조건 확보',
        '④ 충동 결정 24시간 쿨다운 룰',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 부 축적 가이드</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">부자들의 공식을 네 유형에 맞게 적용하는 4단계</text>

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
  { name: 'richest-01-hero', svg: hero() },
  { name: 'richest-02-top10', svg: richestList() },
  { name: 'richest-03-distribution', svg: mbtiDistribution() },
  { name: 'richest-04-functions', svg: commonFunctions() },
  { name: 'richest-05-path', svg: pathToWealth() },
  { name: 'richest-06-action', svg: actionGuide() },
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
