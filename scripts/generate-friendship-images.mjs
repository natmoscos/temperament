// Generate infographics for "MBTI 친구 관계 랭킹 — 평생 절친 궁합 + 손절각 시그널"
// Output: public/blog/friend-{name}.{svg,webp}
//
// Image set (6):
//   01 hero             - 친구 관계 브랜드 히어로
//   02 tier             - 16유형 절친 가능성 랭킹
//   03 best-match       - 절친 궁합 TOP 8 카드
//   04 pattern          - 4기질별 우정 스타일
//   05 signals          - 손절 시그널 6종 지도
//   06 ritual           - 기질별 우정 유지 체크리스트

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
  friend: '#8b5cf6', friendSoft: '#ede9fe', friendDeep: '#6d28d9',
  heart: '#ec4899',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  safe: '#16a34a', mid: '#84cc16', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 친구 관계 리포트</text>
</svg>`;

const COLOR_OF = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
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
    <linearGradient id="fBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#faf5ff"/>
      <stop offset="100%" stop-color="#fdf2f8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#fBg)"/>

  <!-- Floating heart emojis -->
  <text x="150" y="200" font-size="40" opacity="0.2">🤝</text>
  <text x="900" y="180" font-size="45" opacity="0.2">💜</text>
  <text x="220" y="720" font-size="45" opacity="0.2">✨</text>
  <text x="950" y="720" font-size="40" opacity="0.2">👯</text>
  <text x="550" y="150" font-size="35" opacity="0.15">🫂</text>
  <text x="550" y="780" font-size="35" opacity="0.15">💫</text>

  <!-- Two connected circles -->
  <g opacity="0.25">
    <circle cx="450" cy="450" r="130" fill="${C.friend}" stroke="${C.friendDeep}" stroke-width="4"/>
    <circle cx="750" cy="450" r="130" fill="${C.heart}" stroke="${C.nf600}" stroke-width="4"/>
    <text x="450" y="465" text-anchor="middle" font-size="30" font-weight="800" fill="${C.friendDeep}">YOU</text>
    <text x="750" y="465" text-anchor="middle" font-size="30" font-weight="800" fill="${C.nf600}">FRIEND</text>
  </g>

  <!-- Center brand card -->
  <rect x="180" y="330" width="840" height="280" rx="32" fill="#ffffff" stroke="${C.friendDeep}" stroke-width="3" opacity="0.97"/>
  <text x="600" y="400" text-anchor="middle" font-size="22" font-weight="700" fill="${C.friendDeep}">192TYPES · FRIENDSHIP REPORT 2026</text>
  <text x="600" y="475" text-anchor="middle" font-size="52" font-weight="900" fill="${C.text}">MBTI 친구 관계</text>
  <text x="600" y="525" text-anchor="middle" font-size="28" font-weight="700" fill="${C.textSoft}">평생 절친 궁합 + 손절각 시그널 TOP 16</text>
  <text x="600" y="580" text-anchor="middle" font-size="17" font-weight="600" fill="${C.textMuted}">너의 우정 DNA · 절친 유형 · 손절 시그널 완전분석</text>
  `);
}

// ---------- 02 FRIENDSHIP TIER RANKING ----------
function tier() {
  const data = [
    { type: 'ENFJ', score: 96, note: '주변 돌봄 본능' },
    { type: 'ESFJ', score: 94, note: '관계 유지의 달인' },
    { type: 'ESFP', score: 88, note: '분위기 살리는 친구' },
    { type: 'ENFP', score: 86, note: '에너지 주는 존재' },
    { type: 'ISFJ', score: 84, note: '조용한 평생 동반' },
    { type: 'INFJ', score: 78, note: '소수 깊은 관계' },
    { type: 'ENTJ', score: 70, note: '성과형 파트너' },
    { type: 'INFP', score: 66, note: '영혼의 친구' },
    { type: 'ISFP', score: 64, note: '편안한 같이 있기' },
    { type: 'ESTJ', score: 58, note: '실리적 동료' },
    { type: 'ENTP', score: 54, note: '지적 자극 파트너' },
    { type: 'ESTP', score: 48, note: '논 친구 최강' },
    { type: 'ISTJ', score: 42, note: '약속 지키는 친구' },
    { type: 'INTJ', score: 34, note: '소수 검증 후' },
    { type: 'ISTP', score: 28, note: '적당한 거리 유지' },
    { type: 'INTP', score: 22, note: '친구 개념 재정의' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 절친 가능성 랭킹</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">관계 유지력 · 공감 능력 · 장기 연결 지속성 종합 100점 만점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 47;
    const barW = d.score * 7.5;
    const grp = GROUP_OF[d.type];
    const color = COLOR_OF[grp];
    return `
      <text x="50" y="${y + 22}" font-size="14" font-weight="800" fill="${C.textFaint}">${String(i + 1).padStart(2, '0')}</text>
      <text x="95" y="${y + 22}" font-size="18" font-weight="800" fill="${color}">${d.type}</text>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.25"/>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.85"/>
      <text x="${180 + barW}" y="${y + 25}" font-size="14" font-weight="800" fill="${color}">${d.score}</text>
      <text x="930" y="${y + 27}" font-size="13" font-weight="600" fill="${C.textMuted}">${d.note}</text>
    `;
  }).join('')}
  `);
}

// ---------- 03 BEST MATCH ----------
function bestMatch() {
  const matches = [
    { pair: 'ENFJ × INFP', color: C.nf600, desc: '돌봄 × 진정성',
      why: 'ENFJ의 따뜻함이 INFP의 내면 치유와 만나 평생 단짝' },
    { pair: 'ENFP × INFJ', color: C.nf500, desc: '에너지 × 깊이',
      why: 'ENFP가 INFJ를 세상에 꺼내고, INFJ는 ENFP에게 깊이를 줌' },
    { pair: 'ESFJ × ISFJ', color: C.sj600, desc: '케어 × 케어',
      why: '서로의 디테일을 서로 챙겨주는 최고의 감정 동맹' },
    { pair: 'ESFP × ISFP', color: C.sp600, desc: '분위기 × 감각',
      why: '지금 이 순간을 같이 즐기는 현재주의자 콤비' },
    { pair: 'ENTJ × INTJ', color: C.nt600, desc: '전략 × 비전',
      why: '같은 목표 공유, 서로 도전하며 커리어 파트너로 진화' },
    { pair: 'ENTP × INTP', color: C.nt500, desc: '발산 × 분석',
      why: '아이디어 캐치볼로 몇 시간 수다 떨어도 지치지 않음' },
    { pair: 'ESTJ × ISTJ', color: C.sj700, desc: '실행 × 검증',
      why: '원칙 공유, 약속 지키기로 20년 넘는 우정 가능' },
    { pair: 'ESTP × ISTP', color: C.sp700, desc: '도전 × 장인',
      why: '말 많이 안 해도 같이 움직이는 것만으로 통하는 사이' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">절친 궁합 BEST 8 — 평생 우정 조합</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">같은 기질 × 다른 강도 조합이 가장 오래 가는 절친 공식</text>

  ${matches.map((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 570;
    const y = 120 + row * 185;
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="165" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="165" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="22" font-weight="900" fill="${m.color}">${m.pair}</text>
        <text x="30" y="70" font-size="13" font-weight="700" fill="${C.textMuted}">${m.desc}</text>
        <rect x="30" y="85" width="${540 - 60}" height="62" rx="12" fill="${m.color}" opacity="0.08"/>
        <text x="45" y="110" font-size="13" font-weight="700" fill="${m.color}">WHY</text>
        <text x="45" y="130" font-size="13" font-weight="500" fill="${C.textSoft}">${m.why}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 PATTERN ----------
function pattern() {
  const modes = [
    { name: '돌봄형 우정', icon: '🤗', color: C.nf500,
      types: 'ENFJ · ESFJ · ISFJ · ENFP',
      traits: [
        '상대 기분 살피는 게 본능',
        '생일·기념일 놓치지 않음',
        '힘든 일 있으면 먼저 연락',
        '관계가 삶의 의미',
      ] },
    { name: '성장형 우정', icon: '🚀', color: C.nt600,
      types: 'ENTJ · INTJ · ENTP · INTP',
      traits: [
        '배울 점 있는 친구 선호',
        '감정 위로보다 해결책 선호',
        '깊이 통하는 소수만',
        '친구도 레벨업의 도구',
      ] },
    { name: '신뢰형 우정', icon: '🤝', color: C.sj600,
      types: 'ISTJ · ESTJ · ISFJ · ESFJ',
      traits: [
        '약속·시간 엄수',
        '관계 일관성 최우선',
        '10년 넘는 장기 우정 많음',
        '갈등 회피, 직접 대화 선호',
      ] },
    { name: '현재형 우정', icon: '🎉', color: C.sp600,
      types: 'ESTP · ESFP · ISTP · ISFP',
      traits: [
        '지금 같이 노는 게 핵심',
        '말보다 함께하는 경험',
        '가벼운 듯 깊은 진심',
        '손절도 빠르고 복구도 빠름',
      ] },
  ];

  const w = 520, h = 360;
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 510 },
    { x: 620, y: 510 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4가지 우정 DNA — 네 스타일은?</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">기질별 친구 관계 접근법 · 돌봄 / 성장 / 신뢰 / 현재</text>

  ${positions.map((p, i) => {
    const m = modes[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="24" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="13" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        ${m.traits.map((t, j) => `
          <g transform="translate(30, ${125 + j * 48})">
            <circle cx="10" cy="0" r="12" fill="${m.color}" opacity="0.2"/>
            <text x="10" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="${m.color}">${j + 1}</text>
            <text x="32" y="5" font-size="14" font-weight="600" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 05 SIGNALS ----------
function signals() {
  const sigs = [
    { name: '카톡 잠수 7일+', level: 'MID', icon: '🌊',
      why: '에너지 고갈 신호일 수도, 관계 재평가 중일 수도' },
    { name: '약속 3회 연속 취소', level: 'HIGH', icon: '❌',
      why: '무의식적 회피 시작 — 우선순위에서 밀려나고 있음' },
    { name: '내 얘기 다른 사람에 공유', level: 'HIGH', icon: '🗣',
      why: '신뢰 경계 파괴 — 관계의 기본 룰 위반' },
    { name: '성공 말할 때 반응 차가움', level: 'MID', icon: '🥶',
      why: '질투·자기 상태 문제, 관계 거리 재조정 필요' },
    { name: '만날수록 에너지 고갈', level: 'HIGH', icon: '🔋',
      why: '에너지 뱀파이어 패턴 — 관계의 일방성 확인' },
    { name: '갈등 시 대화 거부', level: 'MID', icon: '🚪',
      why: '문제 회피 유형 — 관계 심화는 어려움' },
  ];
  const lvColor = { LOW: C.safe, MID: C.warn, HIGH: C.danger };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">손절 시그널 6종 — 너도 느낀 적 있어?</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">관계 파손 예고 신호 · MID는 대화 시도, HIGH는 거리 두기 권장</text>

  ${sigs.map((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 570;
    const y = 120 + row * 245;
    const color = lvColor[s.level];
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="225" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="225" rx="4" fill="${color}"/>
        <text x="40" y="60" font-size="40">${s.icon}</text>
        <text x="100" y="55" font-size="20" font-weight="900" fill="${C.text}">${s.name}</text>
        <g transform="translate(100, 68)">
          <rect width="80" height="26" rx="13" fill="${color}"/>
          <text x="40" y="18" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">${s.level}</text>
        </g>
        <text x="40" y="140" font-size="14" font-weight="700" fill="${color}">WHY</text>
        <text x="40" y="168" font-size="14" font-weight="500" fill="${C.textSoft}">${s.why.length > 30 ? s.why.slice(0, 30) : s.why}</text>
        <text x="40" y="192" font-size="14" font-weight="500" fill="${C.textSoft}">${s.why.length > 30 ? s.why.slice(30) : ''}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 06 RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 우정 루틴', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 3~5명 핵심 친구에 에너지 집중 (분산 방지)',
        '② 감정 의존 밸런스 점검 — 일방적 소비 주의',
        '③ 분기 1회 "친구 관계 정리 시간" 가지기',
        '④ SNS 활동량 조절 — 관계 피로도 방지',
      ] },
    { name: '담즙질 우정 루틴', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① "이 친구한테 뭘 배울까" 태도 탈피',
        '② 감정 대화 시 해결책 대신 공감 우선',
        '③ 약속 시간 존중 — 자기 스케줄 우선 주의',
        '④ 친구에게 "그냥 잘 지내?" 톡 주 1회',
      ] },
    { name: '점액질 우정 루틴', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 참지 말고 거슬리는 것 1개 표현',
        '② 관계 피로할 때 "나도 휴식 필요" 선언',
        '③ 장기 친구 3명에 집중 (넓히지 않기)',
        '④ 연말 "고마웠어" 한 통씩 — 관계 유지 비타민',
      ] },
    { name: '우울질 우정 루틴', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 소수 친구에 "나 이런 사람이야" 설명서 제공',
        '② 깊은 대화 욕구 친구에겐 예고 후 만남',
        '③ 잠수 길어지면 "나 회복 중" 1줄 메시지',
        '④ 진심 표현 훈련 — "고맙다" "미안하다" 말로',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 우정 유지 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 기질 최적화된 4단계 실전 가이드 · 오늘부터 1개씩</text>

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
  { name: 'friend-01-hero', svg: hero() },
  { name: 'friend-02-tier', svg: tier() },
  { name: 'friend-03-best-match', svg: bestMatch() },
  { name: 'friend-04-pattern', svg: pattern() },
  { name: 'friend-05-signals', svg: signals() },
  { name: 'friend-06-ritual', svg: ritual() },
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
