// Generate infographics for "워런 버핏 MBTI — ISTJ 버핏의 투자 철학"
// Output: public/blog/buffett-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  buf: '#1e40af', bufDeep: '#1e3a8a', bufSoft: '#dbeafe',
  money: '#16a34a',
  nt600: '#0891b2', nt700: '#0e7490',
  sj600: '#059669', sj700: '#047857',
  sp600: '#d97706',
  gold: '#eab308', goldDeep: '#a16207',
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
    <linearGradient id="bBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#dbeafe"/>
      <stop offset="100%" stop-color="#eff6ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bBg)"/>

  <text x="180" y="200" font-size="50" opacity="0.2">📈</text>
  <text x="960" y="180" font-size="50" opacity="0.2">💼</text>
  <text x="200" y="760" font-size="45" opacity="0.2">🏦</text>
  <text x="940" y="740" font-size="50" opacity="0.2">💎</text>

  <rect x="120" y="240" width="960" height="420" rx="36" fill="#ffffff" stroke="${C.bufDeep}" stroke-width="4" opacity="0.97"/>
  <text x="600" y="320" text-anchor="middle" font-size="30" font-weight="800" fill="${C.bufDeep}">192TYPES · WARREN BUFFETT</text>
  <text x="600" y="425" text-anchor="middle" font-size="76" font-weight="900" fill="${C.text}">ISTJ 버핏의 투자 철학</text>
  <text x="600" y="505" text-anchor="middle" font-size="40" font-weight="700" fill="${C.textSoft}">94세 현역 · 연복리 20% · 70년 유지</text>
  <text x="600" y="600" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">Si 검증 + Te 실행이 만든 "복리의 신"</text>
  `);
}

function timeline() {
  const events = [
    { year: '1941', age: 11, event: '첫 주식 매수 (Cities Service Preferred)' },
    { year: '1956', age: 26, event: 'Buffett Partnership 창립' },
    { year: '1965', age: 35, event: 'Berkshire Hathaway 인수' },
    { year: '1988', age: 58, event: 'Coca-Cola 대량 매수 (ISTJ 검증 투자)' },
    { year: '2008', age: 78, event: '금융위기 중 Goldman Sachs 투자' },
    { year: '2019', age: 89, event: 'Apple 최대 보유 종목 (Si 과거 검증 후 기술주 수용)' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">버핏 투자 70년 연대기</text>
  <text x="600" y="80" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">11세 첫 투자 → 94세 현재까지 · Si의 장기 축적 대표 사례</text>

  <!-- Timeline line -->
  <line x1="150" y1="420" x2="1050" y2="420" stroke="${C.bufDeep}" stroke-width="4"/>

  ${events.map((e, i) => {
    const x = 150 + i * (900 / (events.length - 1));
    const up = i % 2 === 0;
    const labelY = up ? 290 : 560;
    const lineY1 = up ? 350 : 430;
    const lineY2 = up ? 410 : 490;
    return `
      <circle cx="${x}" cy="420" r="14" fill="${C.bufDeep}"/>
      <circle cx="${x}" cy="420" r="8" fill="${C.bufSoft}"/>
      <line x1="${x}" y1="${lineY1}" x2="${x}" y2="${lineY2}" stroke="${C.bufDeep}" stroke-width="2" stroke-dasharray="4,3"/>
      <g transform="translate(${x}, ${labelY})">
        <rect x="-85" y="-40" width="170" height="80" rx="14" fill="#ffffff" stroke="${C.bufDeep}"/>
        <text x="0" y="-15" text-anchor="middle" font-size="22" font-weight="900" fill="${C.bufDeep}">${e.year}</text>
        <text x="0" y="5" text-anchor="middle" font-size="15" font-weight="600" fill="${C.textMuted}">${e.age}세</text>
        <text x="0" y="28" text-anchor="middle" font-size="15" font-weight="500" fill="${C.textSoft}">${e.event.slice(0, 18)}</text>
      </g>
    `;
  }).join('')}

  <!-- Bottom insight -->
  <rect x="200" y="750" width="800" height="80" rx="16" fill="${C.bufSoft}" stroke="${C.bufDeep}"/>
  <text x="600" y="785" text-anchor="middle" font-size="21" font-weight="800" fill="${C.bufDeep}">💡 핵심: 70년간 같은 원칙 유지 — Si 주기능의 장기 일관성</text>
  <text x="600" y="810" text-anchor="middle" font-size="18" font-weight="500" fill="${C.text}">단기 유행 무시 · 검증된 기업만 · "평생 보유" 원칙</text>
  `);
}

function istjPrinciples() {
  const principles = [
    { num: '01', rule: '내가 이해하는 사업만 산다', func: 'Si 검증' },
    { num: '02', rule: '영원히 보유할 기업만 산다', func: 'Si 지속' },
    { num: '03', rule: '경쟁 우위(해자) 있는 기업만', func: 'Te 판단' },
    { num: '04', rule: '정직한 경영진이 필수', func: 'Si 신뢰' },
    { num: '05', rule: '내재 가치보다 싸게 산다', func: 'Te 수치' },
    { num: '06', rule: '남들이 탐욕스러울 때 두려워한다', func: 'Si 역발상' },
    { num: '07', rule: '첫 번째 원칙: 돈 잃지 않기', func: 'Te 리스크' },
    { num: '08', rule: '시간이 훌륭한 기업의 친구', func: 'Si 복리' },
    { num: '09', rule: '시장 예측 안 한다', func: 'Te 현실' },
    { num: '10', rule: '내가 아는 사업으로 부자 된다', func: 'Si 집중' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">ISTJ 버핏의 투자 10원칙</text>
  <text x="600" y="80" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">Si(검증) + Te(실행) 조합의 교과서 · 70년간 변하지 않은 철칙</text>

  ${principles.map((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 570;
    const y = 120 + row * 145;
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="130" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="130" rx="4" fill="${C.bufDeep}"/>

        <text x="30" y="50" font-size="36" font-weight="900" fill="${C.gold}">${p.num}</text>
        <text x="90" y="50" font-size="22" font-weight="800" fill="${C.text}">${p.rule}</text>

        <g transform="translate(90, 75)">
          <rect width="80" height="26" rx="13" fill="${C.bufDeep}" opacity="0.15"/>
          <text x="40" y="18" text-anchor="middle" font-size="18" font-weight="900" fill="${C.bufDeep}">${p.func}</text>
        </g>
      </g>
    `;
  }).join('')}
  `);
}

function compareBuffett() {
  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">INTJ 머스크 vs ISTJ 버핏 — 부의 두 길</text>
  <text x="600" y="80" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">같은 부자인데 투자 DNA는 정반대 · 너는 어느 쪽이야?</text>

  <!-- Left: Musk -->
  <g transform="translate(60, 120)">
    <rect width="520" height="720" rx="22" fill="#ffffff" stroke="${C.nt700}" stroke-width="2"/>
    <rect width="8" height="720" rx="4" fill="${C.nt700}"/>

    <text x="30" y="45" font-size="34" font-weight="900" fill="${C.nt700}">일론 머스크</text>
    <g transform="translate(30, 60)">
      <rect width="70" height="26" rx="13" fill="${C.nt700}"/>
      <text x="35" y="19" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">INTJ</text>
    </g>
    <text x="110" y="80" font-size="20" font-weight="700" fill="${C.textMuted}">Ni + Te 주·보조</text>

    <text x="30" y="130" font-size="25" font-weight="900" fill="${C.nt700}">🚀 부의 공식</text>

    ${[
      { t: '비전 기반 점프', d: '10년 후 세계 설계 → 지금 실행' },
      { t: '리스크 극대', d: '총 자산 재투입 가능' },
      { t: '신사업 창조', d: '없는 시장을 만든다' },
      { t: '단기 손실 무시', d: '장기 비전 고수' },
      { t: '기술 레버리지', d: 'AI · 로봇 · 우주' },
      { t: '5억 → 4천억 달러', d: '25년 만에 800배' },
    ].map((x, i) => `
      <g transform="translate(30, ${170 + i * 85})">
        <circle cx="10" cy="0" r="12" fill="${C.nt700}" opacity="0.2"/>
        <text x="10" y="5" text-anchor="middle" font-size="17" font-weight="900" fill="${C.nt700}">${i + 1}</text>
        <text x="32" y="3" font-size="20" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="32" y="26" font-size="17" font-weight="500" fill="${C.textMuted}">${x.d}</text>
      </g>
    `).join('')}
  </g>

  <!-- Right: Buffett -->
  <g transform="translate(620, 120)">
    <rect width="520" height="720" rx="22" fill="#ffffff" stroke="${C.bufDeep}" stroke-width="2"/>
    <rect width="8" height="720" rx="4" fill="${C.bufDeep}"/>

    <text x="30" y="45" font-size="34" font-weight="900" fill="${C.bufDeep}">워런 버핏</text>
    <g transform="translate(30, 60)">
      <rect width="70" height="26" rx="13" fill="${C.bufDeep}"/>
      <text x="35" y="19" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">ISTJ</text>
    </g>
    <text x="110" y="80" font-size="20" font-weight="700" fill="${C.textMuted}">Si + Te 주·보조</text>

    <text x="30" y="130" font-size="25" font-weight="900" fill="${C.bufDeep}">📈 부의 공식</text>

    ${[
      { t: '검증 기반 누적', d: '이해한 사업만 매수' },
      { t: '리스크 최소', d: '원금 보존 최우선' },
      { t: '기존 시장 점유', d: '있는 기업 가치 발굴' },
      { t: '단기 시장 무시', d: '10년+ 장기 보유' },
      { t: '내수·소비 레버리지', d: '코카콜라 · 애플' },
      { t: '초기 1만불 → 1.5천억', d: '70년 만에 1500만배' },
    ].map((x, i) => `
      <g transform="translate(30, ${170 + i * 85})">
        <circle cx="10" cy="0" r="12" fill="${C.bufDeep}" opacity="0.2"/>
        <text x="10" y="5" text-anchor="middle" font-size="17" font-weight="900" fill="${C.bufDeep}">${i + 1}</text>
        <text x="32" y="3" font-size="20" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="32" y="26" font-size="17" font-weight="500" fill="${C.textMuted}">${x.d}</text>
      </g>
    `).join('')}
  </g>
  `);
}

function buffettStrategies() {
  const strats = [
    { n: '1', t: '서클 오브 컴피턴스', desc: '내가 이해하는 범위 안에서만 투자', action: '매일 읽는 산업 분석 30분' },
    { n: '2', t: '미스터 마켓 활용', desc: '시장의 감정 변동을 기회로 삼기', action: '하락장에 추가 매수 여력 확보' },
    { n: '3', t: '안전 마진(Margin of Safety)', desc: '내재 가치보다 30%+ 할인된 가격', action: '목표가의 70% 이하에서만 매수' },
    { n: '4', t: '경제적 해자(Moat)', desc: '경쟁자가 못 따라잡을 우위', action: '브랜드 · 네트워크 · 특허 보유 기업' },
    { n: '5', t: '복리의 8번째 경이', desc: '시간이 자산을 키우게 두기', action: '매매 빈도 최소화 · 배당 재투자' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">버핏 투자 5계명 — 오늘부터 적용</text>
  <text x="600" y="80" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">ISTJ가 아니어도 따라할 수 있는 실전 규칙</text>

  ${strats.map((s, i) => {
    const y = 120 + i * 145;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="130" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="130" rx="4" fill="${C.bufDeep}"/>

        <circle cx="60" cy="65" r="38" fill="${C.bufDeep}" opacity="0.15"/>
        <text x="60" y="77" text-anchor="middle" font-size="42" font-weight="900" fill="${C.bufDeep}">${s.n}</text>

        <text x="130" y="45" font-size="28" font-weight="900" fill="${C.bufDeep}">${s.t}</text>
        <text x="130" y="72" font-size="20" font-weight="600" fill="${C.textSoft}">${s.desc}</text>
        <text x="130" y="103" font-size="18" font-weight="700" fill="${C.money}">👉 ${s.action}</text>
      </g>
    `;
  }).join('')}
  `);
}

function ritual() {
  const groups = [
    { name: 'NT 유형의 버핏 배우기', color: C.nt700, icon: '🔬',
      types: 'INTJ · INTP · ENTJ · ENTP',
      items: [
        '① 네 비전 + 버핏의 검증 = 최강 조합',
        '② 단기 예측 재능 남용 주의',
        '③ 분석 → 실행까지 기한 정하기',
        '④ "이해하는 것"만 투자 룰 도입',
      ] },
    { name: 'NF 유형의 버핏 배우기', color: '#e11d48', icon: '✨',
      types: 'INFJ · INFP · ENFJ · ENFP',
      items: [
        '① 가치 공감 기업에 장기 투자',
        '② 감정 트레이딩 금지 룰',
        '③ 매매 전 24시간 쿨다운',
        '④ 자동 매수 시스템으로 감정 배제',
      ] },
    { name: 'SJ 유형의 버핏 배우기', color: C.sj700, icon: '🏦',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      items: [
        '① DNA 호환 — 그대로 적용 가능',
        '② 배당주 + 인덱스 꾸준 매입',
        '③ 연 1회 리밸런싱 루틴',
        '④ 분산 투자로 안정성 강화',
      ] },
    { name: 'SP 유형의 버핏 배우기', color: C.sp600, icon: '🚀',
      types: 'ISTP · ISFP · ESTP · ESFP',
      items: [
        '① 단기 본능 억제 훈련 필수',
        '② 자동이체 · 자동매수 시스템',
        '③ 실전 감각은 소액 트레이딩에만',
        '④ 장기 포지션은 건드리지 않기',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">기질별 "버핏 방식" 적용 가이드</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">ISTJ가 아니어도 적용 가능한 4단계 루틴</text>

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

const items = [
  { name: 'buffett-01-hero', svg: hero() },
  { name: 'buffett-02-timeline', svg: timeline() },
  { name: 'buffett-03-principles', svg: istjPrinciples() },
  { name: 'buffett-04-vs-musk', svg: compareBuffett() },
  { name: 'buffett-05-strategies', svg: buffettStrategies() },
  { name: 'buffett-06-ritual', svg: ritual() },
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
