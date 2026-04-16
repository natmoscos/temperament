// Generate infographics for "한국 재벌 총수 MBTI 분석"
// Output: public/blog/chaebol-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  korea: '#c0392b', koreaSoft: '#fde8e8',
  gold: '#eab308', goldDeep: '#a16207',
  samsung: '#1428a0',
  hyundai: '#002c5f',
  sk: '#ea002c',
  lg: '#a50034',
  cj: '#a50034',
  nt600: '#0891b2', nt700: '#0e7490',
  sj600: '#059669', sj700: '#047857',
  sp600: '#d97706',
  nf600: '#e11d48',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 경제학 리포트</text>
</svg>`;

function hero() {
  return wrap(`
  <defs>
    <linearGradient id="cBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde8e8"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#cBg)"/>

  <text x="200" y="200" font-size="50" opacity="0.2">🏢</text>
  <text x="960" y="200" font-size="50" opacity="0.2">💼</text>
  <text x="200" y="740" font-size="50" opacity="0.2">🇰🇷</text>
  <text x="960" y="740" font-size="50" opacity="0.2">📊</text>

  <rect x="180" y="290" width="840" height="300" rx="32" fill="#ffffff" stroke="${C.korea}" stroke-width="3" opacity="0.97"/>
  <text x="600" y="360" text-anchor="middle" font-size="22" font-weight="700" fill="${C.korea}">192TYPES · K-CHAEBOL REPORT 2026</text>
  <text x="600" y="440" text-anchor="middle" font-size="48" font-weight="900" fill="${C.text}">한국 재벌 총수 MBTI</text>
  <text x="600" y="495" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textSoft}">이재용 · 정의선 · 최태원 · 구광모</text>
  <text x="600" y="545" text-anchor="middle" font-size="16" font-weight="600" fill="${C.textMuted}">공개 행보 · 인터뷰 · 의사결정 패턴 기반 추정</text>
  `);
}

function chaebolCards() {
  const ceos = [
    {
      name: '이재용', company: '삼성전자',
      mbti: 'INTJ', color: C.samsung,
      func: 'Ni + Te',
      style: '신중 · 장기 · 글로벌',
      known: '반도체 비전 · 조용한 리더십',
      strategy: '10년 R&amp;D 투자 · 글로벌 파트너십',
    },
    {
      name: '정의선', company: '현대자동차',
      mbti: 'ENTJ', color: C.hyundai,
      func: 'Te + Ni',
      style: '추진력 · 대담 · 선제 투자',
      known: '전기차 전환 · 수소 선제 투자',
      strategy: 'EV 대전환 · UAM(도심항공)',
    },
    {
      name: '최태원', company: 'SK그룹',
      mbti: 'ENTP', color: C.sk,
      func: 'Ne + Ti',
      style: '혁신 · 유연 · 외교형',
      known: '딥체인지 슬로건 · 대외 활발',
      strategy: '바이오 · ESG · 에너지 전환',
    },
    {
      name: '구광모', company: 'LG그룹',
      mbti: 'INTJ', color: C.lg,
      func: 'Ni + Te',
      style: '데이터 · 체계 · 조용',
      known: '계열 정리 · 전기차 부품 집중',
      strategy: '미래 모빌리티 · 배터리',
    },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">한국 4대 재벌 총수 MBTI 추정</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">공개 인터뷰 · 행보 · 의사결정 패턴 기반 · 2026년 기준</text>

  ${ceos.map((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 570;
    const y = 120 + row * 370;
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="350" rx="22" fill="#ffffff" stroke="${c.color}" stroke-width="2"/>
        <rect width="8" height="350" rx="4" fill="${c.color}"/>

        <text x="30" y="50" font-size="28" font-weight="900" fill="${c.color}">${c.name}</text>
        <text x="30" y="78" font-size="14" font-weight="700" fill="${C.textMuted}">${c.company}</text>

        <g transform="translate(400, 25)">
          <rect width="110" height="40" rx="20" fill="${c.color}"/>
          <text x="55" y="28" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">${c.mbti}</text>
        </g>
        <text x="455" y="78" text-anchor="middle" font-size="12" font-weight="600" fill="${C.textMuted}">${c.func}</text>

        <text x="30" y="130" font-size="13" font-weight="800" fill="${c.color}">경영 스타일</text>
        <text x="30" y="155" font-size="14" font-weight="600" fill="${C.textSoft}">${c.style}</text>

        <text x="30" y="195" font-size="13" font-weight="800" fill="${c.color}">대표 특징</text>
        <text x="30" y="220" font-size="14" font-weight="600" fill="${C.textSoft}">${c.known}</text>

        <text x="30" y="260" font-size="13" font-weight="800" fill="${c.color}">전략 포커스</text>
        <text x="30" y="285" font-size="14" font-weight="600" fill="${C.textSoft}">${c.strategy}</text>

        <rect x="20" y="310" width="500" height="25" rx="10" fill="${c.color}" opacity="0.08"/>
        <text x="270" y="327" text-anchor="middle" font-size="11" font-weight="700" fill="${c.color}">💡 한국 재벌 = NT 중심(INTJ·ENTJ·ENTP)</text>
      </g>
    `;
  }).join('')}
  `);
}

function koreaDistribution() {
  const dist = [
    { mbti: 'INTJ', count: 2, pct: 50, color: C.nt700 },
    { mbti: 'ENTJ', count: 1, pct: 25, color: C.nt600 },
    { mbti: 'ENTP', count: 1, pct: 25, color: '#06b6d4' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">한국 재벌 MBTI 분포 (4대 그룹)</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">100% NT 분석가형 · 세계 부자 80% NT와 동일한 패턴</text>

  ${dist.map((d, i) => {
    const y = 180 + i * 180;
    const barW = (d.count / 2) * 600;
    return `
      <g transform="translate(200, ${y})">
        <text x="0" y="50" font-size="28" font-weight="900" fill="${d.color}">${d.mbti}</text>
        <rect x="140" y="22" width="${barW}" height="60" rx="30" fill="${d.color}" opacity="0.25"/>
        <rect x="140" y="22" width="${barW}" height="60" rx="30" fill="${d.color}" opacity="0.85"/>
        <text x="${150 + barW}" y="60" font-size="24" font-weight="900" fill="${d.color}">${d.count}명</text>
        <text x="${150 + barW + 70}" y="60" font-size="16" font-weight="700" fill="${C.textMuted}">${d.pct}%</text>
      </g>
    `;
  }).join('')}

  <rect x="100" y="770" width="1000" height="90" rx="16" fill="${C.koreaSoft}" stroke="${C.korea}"/>
  <text x="600" y="805" text-anchor="middle" font-size="15" font-weight="900" fill="${C.korea}">🔥 한국 재벌 공통 인지기능</text>
  <text x="600" y="830" text-anchor="middle" font-size="14" font-weight="700" fill="${C.text}">Ni(장기 비전) + Te(효율 실행) → 세계 부자 TOP 10과 동일 공식</text>
  <text x="600" y="852" text-anchor="middle" font-size="12" font-weight="500" fill="${C.textMuted}">단, 한국 특유 "가족 경영 승계 + 집단 조직 문화"가 변수로 추가</text>
  `);
}

function globalVsKorea() {
  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">글로벌 부자 vs 한국 재벌 — 차이점</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">둘 다 NT 공통이지만 환경 변수가 완전 다른 행동 유도</text>

  <!-- Left: Global -->
  <g transform="translate(60, 130)">
    <rect width="520" height="700" rx="22" fill="#ffffff" stroke="#6b7280" stroke-width="2"/>
    <rect width="8" height="700" rx="4" fill="#6b7280"/>
    <text x="30" y="50" font-size="24" font-weight="900" fill="#374151">글로벌 부자 (머스크·베조스)</text>
    <text x="30" y="80" font-size="13" font-weight="700" fill="${C.textMuted}">1세대 창업 · 개인 카리스마 · 공격적 공개 소통</text>

    ${[
      { t: '📍 시작점', d: '0에서 창업 · 개인 리스크 100%' },
      { t: '🎯 목표', d: '새 시장 창조 · 파괴적 혁신' },
      { t: '💼 경영 스타일', d: '개인 카리스마 · 공개 소통 · 직설' },
      { t: '⚡ 의사결정', d: '본인 단독 결정 · 빠른 실행' },
      { t: '🌐 공개 행보', d: 'SNS 활발 · 인터뷰 · 논쟁 참여' },
      { t: '🏆 성공 지표', d: '혁신성 · 기업 가치 · 글로벌 점유' },
      { t: '⚠️ 리스크', d: '개인 번아웃 · 관계 악화' },
    ].map((x, i) => `
      <g transform="translate(30, ${130 + i * 80})">
        <text x="0" y="0" font-size="15" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="0" y="28" font-size="13" font-weight="500" fill="${C.textSoft}">${x.d}</text>
      </g>
    `).join('')}
  </g>

  <!-- Right: Korean -->
  <g transform="translate(620, 130)">
    <rect width="520" height="700" rx="22" fill="#ffffff" stroke="${C.korea}" stroke-width="2"/>
    <rect width="8" height="700" rx="4" fill="${C.korea}"/>
    <text x="30" y="50" font-size="24" font-weight="900" fill="${C.korea}">한국 재벌 (이재용·정의선)</text>
    <text x="30" y="80" font-size="13" font-weight="700" fill="${C.textMuted}">3~4세대 승계 · 집단 조직 · 신중 공개 소통</text>

    ${[
      { t: '📍 시작점', d: '그룹 승계 · 1조+ 자산 상속' },
      { t: '🎯 목표', d: '기존 그룹 전환 · 미래 산업 축' },
      { t: '💼 경영 스타일', d: '집단 의사결정 · 전문경영인 활용' },
      { t: '⚡ 의사결정', d: '임원회의 · 법무 검토 · 리스크 관리' },
      { t: '🌐 공개 행보', d: '신중 · 제한된 인터뷰 · 현장 방문' },
      { t: '🏆 성공 지표', d: '승계 안정 · 그룹 미래 축 확보' },
      { t: '⚠️ 리스크', d: '승계 논란 · 사법 리스크 · 세대 차이' },
    ].map((x, i) => `
      <g transform="translate(30, ${130 + i * 80})">
        <text x="0" y="0" font-size="15" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="0" y="28" font-size="13" font-weight="500" fill="${C.textSoft}">${x.d}</text>
      </g>
    `).join('')}
  </g>
  `);
}

function koreaContext() {
  const factors = [
    { name: '가족 승계 압력', level: 'HIGH', color: C.korea,
      what: '개인 비전보다 그룹 안정 우선', impact: 'Ni 비전 제약 · Te 실행 보수적' },
    { name: '집단 조직 문화', level: 'HIGH', color: '#f59e0b',
      what: '개인 결정보다 임원진 합의', impact: '카리스마형 Te 제한 · Ti 분석 선호' },
    { name: '사법 리스크', level: 'MID', color: '#0891b2',
      what: '수시 법무 검토 · 공개 행보 신중', impact: '머스크식 공개 소통 불가능' },
    { name: '대기업 의존 생태계', level: 'MID', color: '#059669',
      what: '협력사 · 관계 유지 중요', impact: 'Fe 보조 사용 증가 · 관계 정치' },
    { name: '노동 문화 · 노조', level: 'MID', color: '#e11d48',
      what: '공격적 구조조정 어려움', impact: '머스크식 해고 불가능 · 장기 전환' },
    { name: '세대 전환', level: 'LOW', color: '#8b5cf6',
      what: '2~4세대의 글로벌 교육 배경', impact: '현 세대는 이전 세대보다 NT 뚜렷' },
  ];
  const lvColor = { LOW: '#16a34a', MID: '#f59e0b', HIGH: '#dc2626' };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">한국 재벌의 특수 환경 변수</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">글로벌 부자와 다른 6가지 변수 · 같은 NT여도 행동 달라지는 이유</text>

  ${factors.map((f, i) => {
    const y = 120 + i * 120;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="105" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="105" rx="4" fill="${f.color}"/>

        <text x="40" y="35" font-size="18" font-weight="900" fill="${f.color}">${f.name}</text>
        <g transform="translate(40, 48)">
          <rect width="65" height="24" rx="12" fill="${lvColor[f.level]}"/>
          <text x="32" y="17" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${f.level}</text>
        </g>

        <text x="130" y="65" font-size="14" font-weight="700" fill="${C.textSoft}">${f.what}</text>
        <text x="130" y="88" font-size="12" font-weight="500" fill="${C.textMuted}">→ ${f.impact}</text>
      </g>
    `;
  }).join('')}
  `);
}

function applyGuide() {
  const groups = [
    { name: '한국 NT형 커리어 전략', color: C.nt600, icon: '🇰🇷',
      types: 'INTJ · INTP · ENTJ · ENTP',
      items: [
        '① 개인 카리스마 &lt; 조직 내 영향력',
        '② 공개 행보보다 내부 신뢰 구축',
        '③ 승진 타이밍 = 집단 합의 타이밍',
        '④ 관계 정치 10% 의식 배분',
      ] },
    { name: '한국 NF형 커리어 전략', color: C.nf600, icon: '✨',
      types: 'INFJ · INFP · ENFJ · ENFP',
      items: [
        '① 감정 공감 강점 → HR · 교육 · 브랜드',
        '② 집단 조화 속에서 본인 가치 공유',
        '③ 의미 · 가치 중심 커리어 설계',
        '④ NT 리더 아래 파트너 포지션 최적',
      ] },
    { name: '한국 SJ형 커리어 전략', color: C.sj600, icon: '🏦',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      items: [
        '① 한국 사회 가장 잘 맞는 기질',
        '② 공무원 · 전문직 · 대기업 최적',
        '③ 장기 안정 + 꾸준 승진',
        '④ 규칙 준수 문화가 강점',
      ] },
    { name: '한국 SP형 커리어 전략', color: C.sp600, icon: '🚀',
      types: 'ISTP · ISFP · ESTP · ESFP',
      items: [
        '① 실전 감각 강점 → 세일즈 · 부동산 · 미디어',
        '② 한국 대기업보단 자율 환경',
        '③ 스타트업 · 프리랜서 · 창업',
        '④ 실시간 네트워크 강점 활용',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">한국 사회 맞춤 유형별 커리어 가이드</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">글로벌 공식과 다른 한국 특수 환경에 맞는 전략</text>

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
  { name: 'chaebol-01-hero', svg: hero() },
  { name: 'chaebol-02-cards', svg: chaebolCards() },
  { name: 'chaebol-03-distribution', svg: koreaDistribution() },
  { name: 'chaebol-04-vs-global', svg: globalVsKorea() },
  { name: 'chaebol-05-context', svg: koreaContext() },
  { name: 'chaebol-06-apply', svg: applyGuide() },
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
