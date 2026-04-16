// Generate infographics for "일론 머스크 vs 마크 저커버그 MBTI"
// Output: public/blog/mz-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  musk: '#dc2626', muskSoft: '#fee2e2',
  zuck: '#2563eb', zuckSoft: '#dbeafe',
  safe: '#16a34a', warn: '#f59e0b', danger: '#dc2626',
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
    <linearGradient id="mzBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fee2e2"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#mzBg)"/>

  <text x="200" y="200" font-size="50" opacity="0.2">🚀</text>
  <text x="960" y="200" font-size="50" opacity="0.2">🌐</text>

  <rect x="180" y="300" width="840" height="280" rx="32" fill="#ffffff" stroke="#6b7280" stroke-width="3" opacity="0.97"/>
  <text x="600" y="370" text-anchor="middle" font-size="22" font-weight="700" fill="#6b7280">192TYPES · TITANS COMPARED</text>
  <text x="600" y="445" text-anchor="middle" font-size="48" font-weight="900" fill="${C.text}">머스크 vs 저커버그</text>
  <text x="600" y="495" text-anchor="middle" font-size="26" font-weight="700" fill="${C.textSoft}">같은 INTJ 추정 · 180도 다른 경영 DNA</text>
  <text x="600" y="550" text-anchor="middle" font-size="17" font-weight="600" fill="${C.textMuted}">Te vs Ti 보조기능이 만든 두 리더의 길</text>
  `);
}

function compareCard() {
  const specs = [
    { field: '태어난 해', m: '1971', z: '1984' },
    { field: '회사', m: 'Tesla · SpaceX · X', z: 'Meta (Facebook)' },
    { field: '추정 MBTI', m: 'INTJ', z: 'INTJ' },
    { field: '주기능', m: 'Ni (비전)', z: 'Ni (비전)' },
    { field: '보조기능', m: 'Te (효율 실행)', z: 'Ti (논리 분석)' },
    { field: '공개 표현 스타일', m: '직설적 · 논쟁적', z: '신중 · 방어적' },
    { field: '의사결정', m: '직관 → 즉시 실행', z: '분석 → 데이터 검증' },
    { field: '리스크 허용', m: '극단적 (총 자산 재투입)', z: '체계적 (점진 확장)' },
    { field: '실패 대응', m: '공개 · 재시도', z: '조용히 수정 · 계속' },
    { field: '대표 프로젝트', m: '화성 이주 · 자율주행', z: 'Metaverse · AI' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">INTJ vs INTJ — 어디가 다를까?</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">둘 다 INTJ 추정 · Te vs Ti 보조기능 차이가 180도 경영 스타일 만듦</text>

  <!-- Column headers -->
  <g transform="translate(60, 110)">
    <rect x="300" width="360" height="60" rx="14" fill="${C.musk}"/>
    <text x="480" y="38" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">일론 머스크</text>

    <rect x="720" width="360" height="60" rx="14" fill="${C.zuck}"/>
    <text x="900" y="38" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">마크 저커버그</text>
  </g>

  ${specs.map((s, i) => {
    const y = 200 + i * 65;
    return `
      <g transform="translate(60, ${y})">
        <rect width="280" height="50" rx="10" fill="${C.border}" opacity="0.4"/>
        <text x="20" y="32" font-size="14" font-weight="800" fill="${C.textSoft}">${s.field}</text>

        <rect x="300" width="360" height="50" rx="10" fill="${C.muskSoft}"/>
        <text x="480" y="32" text-anchor="middle" font-size="13" font-weight="700" fill="${C.musk}">${s.m}</text>

        <rect x="720" width="360" height="50" rx="10" fill="${C.zuckSoft}"/>
        <text x="900" y="32" text-anchor="middle" font-size="13" font-weight="700" fill="${C.zuck}">${s.z}</text>
      </g>
    `;
  }).join('')}
  `);
}

function decisionStyle() {
  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">의사결정 스타일 — Te vs Ti</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">같은 Ni 비전 · 다른 보조기능이 만드는 정반대 경로</text>

  <!-- Musk: Te -->
  <g transform="translate(60, 140)">
    <rect width="520" height="680" rx="22" fill="#ffffff" stroke="${C.musk}" stroke-width="2"/>
    <rect width="8" height="680" rx="4" fill="${C.musk}"/>

    <text x="30" y="45" font-size="24" font-weight="900" fill="${C.musk}">머스크 (Ni + Te)</text>
    <text x="30" y="75" font-size="14" font-weight="700" fill="${C.textMuted}">외향 사고: 효율 · 실행 · 감정 배제</text>

    <text x="30" y="130" font-size="18" font-weight="900" fill="${C.musk}">⚡ 결정 프로세스</text>

    ${[
      { t: 'Step 1 — 비전 설정', d: '"화성에 인간 정착" 같은 10년+ 목표' },
      { t: 'Step 2 — 즉시 실행', d: '분석 길게 X · 일단 시작' },
      { t: 'Step 3 — 피드백 학습', d: '실패 공개 · 빠른 재설계' },
      { t: 'Step 4 — 직원 압박', d: '주 80시간+ 요구 · 단기 가혹' },
      { t: 'Step 5 — 자산 재투입', d: '2008년 Tesla+SpaceX 파산 직전' },
    ].map((x, i) => `
      <g transform="translate(30, ${175 + i * 95})">
        <circle cx="10" cy="5" r="12" fill="${C.musk}" opacity="0.2"/>
        <text x="10" y="10" text-anchor="middle" font-size="12" font-weight="900" fill="${C.musk}">${i + 1}</text>
        <text x="32" y="7" font-size="14" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="32" y="30" font-size="12" font-weight="500" fill="${C.textMuted}">${x.d}</text>
      </g>
    `).join('')}
  </g>

  <!-- Zuck: Ti -->
  <g transform="translate(620, 140)">
    <rect width="520" height="680" rx="22" fill="#ffffff" stroke="${C.zuck}" stroke-width="2"/>
    <rect width="8" height="680" rx="4" fill="${C.zuck}"/>

    <text x="30" y="45" font-size="24" font-weight="900" fill="${C.zuck}">저커버그 (Ni + Ti)</text>
    <text x="30" y="75" font-size="14" font-weight="700" fill="${C.textMuted}">내향 사고: 분석 · 구조 · 정확성</text>

    <text x="30" y="130" font-size="18" font-weight="900" fill="${C.zuck}">🧠 결정 프로세스</text>

    ${[
      { t: 'Step 1 — 비전 설정', d: '"세계 연결 · Metaverse" 같은 장기 비전' },
      { t: 'Step 2 — 데이터 분석', d: '수치 · 사용자 행동 심층 연구' },
      { t: 'Step 3 — A/B 테스트', d: '소규모 실험 → 확장' },
      { t: 'Step 4 — 체계적 인재 관리', d: '구조화된 승진 · 보상' },
      { t: 'Step 5 — 점진 확장', d: '60B 투자도 10년 분할' },
    ].map((x, i) => `
      <g transform="translate(30, ${175 + i * 95})">
        <circle cx="10" cy="5" r="12" fill="${C.zuck}" opacity="0.2"/>
        <text x="10" y="10" text-anchor="middle" font-size="12" font-weight="900" fill="${C.zuck}">${i + 1}</text>
        <text x="32" y="7" font-size="14" font-weight="800" fill="${C.text}">${x.t}</text>
        <text x="32" y="30" font-size="12" font-weight="500" fill="${C.textMuted}">${x.d}</text>
      </g>
    `).join('')}
  </g>
  `);
}

function riskProfile() {
  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">리스크 허용도 · 실패 대응</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">Te는 "다 던지고 해결", Ti는 "단계별 실험" 스타일</text>

  <!-- Risk scale -->
  <g transform="translate(100, 160)">
    <text x="0" y="0" font-size="16" font-weight="800" fill="${C.text}">총 자산 대비 단일 투자 비율</text>

    <rect x="0" y="20" width="1000" height="40" rx="20" fill="${C.border}" opacity="0.3"/>

    <!-- Zuck marker (30%) -->
    <rect x="0" y="20" width="300" height="40" rx="20" fill="${C.zuck}" opacity="0.85"/>
    <circle cx="300" cy="40" r="14" fill="${C.zuck}" stroke="#fff" stroke-width="3"/>
    <text x="300" y="85" text-anchor="middle" font-size="13" font-weight="900" fill="${C.zuck}">저커버그</text>
    <text x="300" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textMuted}">점진 확장 30%</text>

    <!-- Musk marker (95%) -->
    <rect x="300" y="20" width="650" height="40" rx="0" fill="${C.musk}" opacity="0.85"/>
    <circle cx="950" cy="40" r="14" fill="${C.musk}" stroke="#fff" stroke-width="3"/>
    <text x="950" y="85" text-anchor="middle" font-size="13" font-weight="900" fill="${C.musk}">머스크</text>
    <text x="950" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${C.textMuted}">극단 95%</text>
  </g>

  <!-- Failure response -->
  <g transform="translate(60, 350)">
    <text x="540" y="0" text-anchor="middle" font-size="22" font-weight="800" fill="${C.text}">실패 대응 방식</text>

    <rect x="60" y="40" width="460" height="220" rx="20" fill="#ffffff" stroke="${C.musk}"/>
    <rect x="60" y="40" width="8" height="220" rx="4" fill="${C.musk}"/>
    <text x="90" y="80" font-size="20" font-weight="900" fill="${C.musk}">🚀 머스크 방식</text>
    <text x="90" y="115" font-size="13" font-weight="700" fill="${C.text}">실패 공개 + 즉시 재시도</text>

    ${[
      '• SpaceX 로켓 4번 폭발 공개',
      '• Tesla Model 3 생산 위기 "생산 지옥"',
      '• Twitter (X) 인수 후 공개 혼란',
      '• 실패를 학습 데이터로',
    ].map((t, i) => `
      <text x="90" y="${150 + i * 25}" font-size="12" font-weight="500" fill="${C.textSoft}">${t}</text>
    `).join('')}

    <rect x="560" y="40" width="460" height="220" rx="20" fill="#ffffff" stroke="${C.zuck}"/>
    <rect x="560" y="40" width="8" height="220" rx="4" fill="${C.zuck}"/>
    <text x="590" y="80" font-size="20" font-weight="900" fill="${C.zuck}">🌐 저커버그 방식</text>
    <text x="590" y="115" font-size="13" font-weight="700" fill="${C.text}">조용히 수정 + 장기 전환</text>

    ${[
      '• Meta 이름 변경 조용히 진행',
      '• Metaverse 비용 손실 인정 후 AI 전환',
      '• 알고리즘 변경 사용자 모르게',
      '• 공개 갈등 회피',
    ].map((t, i) => `
      <text x="590" y="${150 + i * 25}" font-size="12" font-weight="500" fill="${C.textSoft}">${t}</text>
    `).join('')}
  </g>
  `);
}

function strengths() {
  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">너는 Te형 INTJ? Ti형 INTJ?</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">INTJ · INTP · ENTJ · ENTP 유형 모두 참고 · 네 방식 선택</text>

  <!-- Left: Te -->
  <g transform="translate(60, 130)">
    <rect width="520" height="700" rx="22" fill="#ffffff" stroke="${C.musk}" stroke-width="2"/>
    <rect width="8" height="700" rx="4" fill="${C.musk}"/>

    <text x="30" y="50" font-size="22" font-weight="900" fill="${C.musk}">Te 강화형 (머스크 방식)</text>
    <text x="30" y="80" font-size="13" font-weight="700" fill="${C.textMuted}">효율 · 실행 · 공개 경쟁</text>

    <text x="30" y="140" font-size="16" font-weight="900" fill="${C.musk}">✅ 강점</text>
    ${[
      '빠른 실행 속도',
      '큰 판 짜기 능력',
      '위기 시 돌파력',
      '논쟁 뚫고 가는 힘',
    ].map((t, i) => `
      <text x="50" y="${170 + i * 30}" font-size="13" font-weight="600" fill="${C.safe}">• ${t}</text>
    `).join('')}

    <text x="30" y="320" font-size="16" font-weight="900" fill="${C.musk}">⚠️ 약점</text>
    ${[
      '주변 갈등 · 관계 소진',
      '번아웃 · 건강 악화',
      '감정 공감 부족',
      '충동적 결정 리스크',
    ].map((t, i) => `
      <text x="50" y="${350 + i * 30}" font-size="13" font-weight="600" fill="${C.danger}">• ${t}</text>
    `).join('')}

    <text x="30" y="500" font-size="16" font-weight="900" fill="${C.musk}">💼 적합 직무</text>
    ${[
      '창업 · CEO 포지션',
      '영업 · 세일즈 · 협상',
      '프로덕트 매니저',
      'M&amp;A · 투자은행',
    ].map((t, i) => `
      <text x="50" y="${530 + i * 30}" font-size="13" font-weight="600" fill="${C.textSoft}">• ${t}</text>
    `).join('')}
  </g>

  <!-- Right: Ti -->
  <g transform="translate(620, 130)">
    <rect width="520" height="700" rx="22" fill="#ffffff" stroke="${C.zuck}" stroke-width="2"/>
    <rect width="8" height="700" rx="4" fill="${C.zuck}"/>

    <text x="30" y="50" font-size="22" font-weight="900" fill="${C.zuck}">Ti 강화형 (저커버그 방식)</text>
    <text x="30" y="80" font-size="13" font-weight="700" fill="${C.textMuted}">분석 · 시스템 · 조용한 확장</text>

    <text x="30" y="140" font-size="16" font-weight="900" fill="${C.zuck}">✅ 강점</text>
    ${[
      '깊은 분석 · 구조 파악',
      '알고리즘 · 시스템 설계',
      '장기 실험 가능',
      '조용히 꾸준한 확장',
    ].map((t, i) => `
      <text x="50" y="${170 + i * 30}" font-size="13" font-weight="600" fill="${C.safe}">• ${t}</text>
    `).join('')}

    <text x="30" y="320" font-size="16" font-weight="900" fill="${C.zuck}">⚠️ 약점</text>
    ${[
      '결정 느림 · 분석 마비',
      '커뮤니케이션 약점',
      '위기 순간 망설임',
      '감정 표현 어려움',
    ].map((t, i) => `
      <text x="50" y="${350 + i * 30}" font-size="13" font-weight="600" fill="${C.danger}">• ${t}</text>
    `).join('')}

    <text x="30" y="500" font-size="16" font-weight="900" fill="${C.zuck}">💼 적합 직무</text>
    ${[
      '연구 · R&amp;D 리더',
      '소프트웨어 아키텍트',
      '데이터 사이언스',
      '전략 컨설팅',
    ].map((t, i) => `
      <text x="50" y="${530 + i * 30}" font-size="13" font-weight="600" fill="${C.textSoft}">• ${t}</text>
    `).join('')}
  </g>
  `);
}

function ritual() {
  const groups = [
    { name: 'Te형 강화하기 (머스크 배우기)', color: C.musk, icon: '🚀',
      items: [
        '① 분석보다 "실행 먼저" 30일 챌린지',
        '② 감정 배제 결정 훈련 · 데이터 중심',
        '③ 주 1회 큰 판 짜기 사고 · 10년 후',
        '④ 공개 소통 연습 · 블로그 · 트윗',
      ] },
    { name: 'Ti형 강화하기 (저커버그 배우기)', color: C.zuck, icon: '🧠',
      items: [
        '① 결정 전 체계적 분석 문서화',
        '② A/B 테스트 사고 · 작게 시작',
        '③ 장기 학습 · 원리 파악 우선',
        '④ 조용한 실행 · 과시 최소화',
      ] },
    { name: '둘 다 가진 통합 INTJ 만들기', color: '#6b7280', icon: '⚖️',
      items: [
        '① 비전 · 데이터 50:50 밸런스',
        '② 단기 실행(Te) + 장기 구조(Ti)',
        '③ 실패 공개(Te) + 정밀 수정(Ti)',
        '④ 분기 1회 방식 점검 + 전환',
      ] },
    { name: 'NT 전체 유형 공통 가이드', color: '#0891b2', icon: '🔬',
      items: [
        '① Fe(감정) 약점 훈련 · 주 1회 감정 표현',
        '② Se(현실) 보완 · 월 1회 현장 방문',
        '③ 번아웃 방지 · 주 2일 완전 휴식',
        '④ 인간관계 투자 · 절친 1~2명 유지',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">NT 유형 적용 가이드 — 너의 방식 선택</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">머스크형 vs 저커버그형 · 통합형 · NT 공통 체크리스트</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="18" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        ${g.items.map((it, j) => `
          <text x="28" y="${95 + j * 52}" font-size="13" font-weight="600" fill="${C.textSoft}">${it}</text>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

const items = [
  { name: 'mz-01-hero', svg: hero() },
  { name: 'mz-02-compare', svg: compareCard() },
  { name: 'mz-03-decision', svg: decisionStyle() },
  { name: 'mz-04-risk', svg: riskProfile() },
  { name: 'mz-05-strengths', svg: strengths() },
  { name: 'mz-06-ritual', svg: ritual() },
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
