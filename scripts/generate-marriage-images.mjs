// Generate infographics for "MBTI 결혼 만족도 랭킹 — 장기 결혼 행복도 TOP 16"
// Output: public/blog/marriage-{name}.{svg,webp}
//
// Image set (6):
//   01 hero             - 결혼 브랜드 히어로
//   02 satisfaction     - 16유형 결혼 만족도 랭킹
//   03 marriage-style   - 4가지 결혼 스타일 (로맨스/파트너/가족/독립)
//   04 divorce-risk     - 4기질별 이혼 위험도 + 주요 원인
//   05 conflict-map     - 부부 갈등 포인트 매트릭스
//   06 ritual           - 기질별 결혼 유지 체크리스트

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
  ring: '#b45309', ringGold: '#fbbf24', ringSoft: '#fef3c7',
  love: '#ec4899', loveSoft: '#fce7f3',
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
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 결혼 만족도 리포트</text>
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
    <linearGradient id="mBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fef9e7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#mBg)"/>

  <!-- Two rings interlocked -->
  <g opacity="0.4">
    <circle cx="500" cy="720" r="70" fill="none" stroke="${C.ringGold}" stroke-width="14"/>
    <circle cx="580" cy="720" r="70" fill="none" stroke="${C.ring}" stroke-width="14"/>
  </g>

  <text x="180" y="200" font-size="45" opacity="0.2">💍</text>
  <text x="950" y="180" font-size="45" opacity="0.2">💐</text>
  <text x="220" y="780" font-size="45" opacity="0.2">🏠</text>
  <text x="940" y="760" font-size="45" opacity="0.2">🕊</text>

  <!-- Center brand card -->
  <rect x="120" y="240" width="960" height="410" rx="36" fill="#ffffff" stroke="${C.ring}" stroke-width="4" opacity="0.97"/>
  <text x="600" y="320" text-anchor="middle" font-size="30" font-weight="800" fill="${C.ring}">192TYPES · MARRIAGE REPORT 2026</text>
  <text x="600" y="425" text-anchor="middle" font-size="78" font-weight="900" fill="${C.text}">MBTI 결혼 만족도</text>
  <text x="600" y="500" text-anchor="middle" font-size="40" font-weight="700" fill="${C.textSoft}">장기 결혼 행복도 TOP 16</text>
  <text x="600" y="595" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">16유형 × 4기질로 본 결혼 후 5년 / 10년 / 20년</text>
  `);
}

// ---------- 02 SATISFACTION RANKING ----------
function satisfaction() {
  const data = [
    { type: 'ISFJ', score: 94, note: '헌신형 · 가정 중심' },
    { type: 'ESFJ', score: 92, note: '케어 공유 파트너' },
    { type: 'ENFJ', score: 88, note: '동반 성장 리더' },
    { type: 'ISTJ', score: 86, note: '약속 지키는 반려자' },
    { type: 'ESTJ', score: 82, note: '가정 운영의 CEO' },
    { type: 'INFJ', score: 76, note: '영혼의 파트너' },
    { type: 'ISFP', score: 72, note: '조용한 동반자' },
    { type: 'ENFP', score: 66, note: '감정 기복 많음' },
    { type: 'ENTJ', score: 62, note: '성취 중심 결혼' },
    { type: 'ESFP', score: 58, note: '현재 중심 부부' },
    { type: 'INFP', score: 52, note: '이상-현실 갭 큼' },
    { type: 'INTJ', score: 48, note: '감정 표현 약점' },
    { type: 'ENTP', score: 42, note: '루틴 권태 빠름' },
    { type: 'ESTP', score: 36, note: '자극 추구 리스크' },
    { type: 'ISTP', score: 30, note: '독립성 우선' },
    { type: 'INTP', score: 24, note: '결혼 제도 회의' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">MBTI 결혼 만족도 랭킹 TOP 16</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">결혼 5~20년차 장기 만족도 · 관계 안정성 + 갈등 회복력 종합 100점</text>

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
      <text x="920" y="${y + 27}" font-size="13" font-weight="600" fill="${C.textMuted}">${d.note}</text>
    `;
  }).join('')}
  `);
}

// ---------- 03 MARRIAGE STYLES ----------
function marriageStyles() {
  const styles = [
    { name: '로맨스형 결혼', icon: '💖', color: C.love,
      types: 'ENFP · INFP · ENFJ · INFJ',
      core: '감정적 연결이 결혼의 본질',
      traits: [
        '기념일·서프라이즈 필수',
        '감정 대화를 매일 요구',
        '권태 오면 로맨스 재점화로 회복',
        '파트너의 내면 성장에 투자',
      ] },
    { name: '파트너형 결혼', icon: '🤝', color: C.nt600,
      types: 'ENTJ · INTJ · ENTP · INTP',
      core: '공동 목표 달성이 결혼의 본질',
      traits: [
        '재정·커리어 전략 함께 설계',
        '감정보다 실행·결과 공유',
        '각자 독립 공간 존중',
        '갈등은 문제 해결 회의로',
      ] },
    { name: '가족형 결혼', icon: '🏡', color: C.sj600,
      types: 'ISFJ · ESFJ · ISTJ · ESTJ',
      core: '가정 안정이 결혼의 본질',
      traits: [
        '자녀·집안·친척 관계 중심',
        '역할 분담 명확 · 루틴 견고',
        '경제·주거 안정 최우선',
        '갈등 회피보다 시스템으로 관리',
      ] },
    { name: '독립형 결혼', icon: '🌿', color: C.sp600,
      types: 'ISTP · ISFP · ESTP · ESFP',
      core: '서로의 자유가 결혼의 본질',
      traits: [
        '각자 취미·친구·여행 보장',
        '과도한 감정 대화 지양',
        '현재 즐거움 우선',
        '결혼 룰은 최소한만',
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
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4가지 결혼 스타일 — 너는 어느 쪽?</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">기질별 결혼 접근법 · 로맨스 / 파트너 / 가족 / 독립</text>

  ${positions.map((p, i) => {
    const m = styles[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="24" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="13" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        <rect x="30" y="88" width="${w - 60}" height="40" rx="12" fill="${m.color}" opacity="0.1"/>
        <text x="45" y="113" font-size="13" font-weight="700" fill="${m.color}">${m.core}</text>

        ${m.traits.map((t, j) => `
          <g transform="translate(30, ${160 + j * 45})">
            <circle cx="10" cy="0" r="11" fill="${m.color}" opacity="0.2"/>
            <text x="10" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="${m.color}">${j + 1}</text>
            <text x="32" y="5" font-size="13" font-weight="600" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 DIVORCE RISK ----------
function divorceRisk() {
  const groups = [
    { name: '다혈질 이혼 리스크', level: 'MID', color: C.nf500,
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      risk: 45,
      main: '감정 기복 · 권태 · 관계 소진',
      trigger: ['루틴 권태로 새로운 자극 갈망', '상대 냉담 반응에 급격 상처', '과도한 감정 노출로 피로 누적'] },
    { name: '담즙질 이혼 리스크', level: 'HIGH', color: C.nt600,
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      risk: 58,
      main: '감정 표현 부족 · 통제 욕구 · 일 우선',
      trigger: ['감정 대화 거부로 쌓인 벽', '가정 운영을 경영처럼 관리', '성과 정체기에 결혼 재평가'] },
    { name: '점액질 이혼 리스크', level: 'LOW', color: C.sj600,
      types: 'ISFJ · ISTJ · INFP · ISFP',
      risk: 22,
      main: '도어슬램 · 참다가 터짐',
      trigger: ['장기 참음 끝 일방적 결심', '감정 표현 부족으로 누적된 오해', '변화 회피로 관계 정체'] },
    { name: '우울질 이혼 리스크', level: 'MID', color: C.nt700,
      types: 'INTJ · INFJ · INTP · ISTP',
      risk: 42,
      main: '감정 거리 · 이상 갭 · 독립 욕구',
      trigger: ['감정 연결 부재로 냉전', '이상-현실 갭 확대', '독립 욕구로 공유 거부'] },
  ];
  const lvColor = { LOW: C.safe, MID: C.warn, HIGH: C.danger };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4기질별 이혼 위험도 · 주요 원인</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">결혼 5~15년차 이혼율 종합 데이터 · 네 기질의 사각지대 확인</text>

  ${groups.map((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 60 + col * 570;
    const y = 120 + row * 370;
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="540" height="350" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="350" rx="4" fill="${g.color}"/>
        <text x="30" y="45" font-size="20" font-weight="900" fill="${g.color}">${g.name}</text>
        <text x="30" y="70" font-size="12" font-weight="600" fill="${C.textMuted}">${g.types}</text>

        <g transform="translate(30, 90)">
          <rect width="75" height="28" rx="14" fill="${lvColor[g.level]}"/>
          <text x="37.5" y="20" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">${g.level}</text>
          <text x="90" y="20" font-size="16" font-weight="800" fill="${lvColor[g.level]}">${g.risk}%</text>
          <text x="150" y="20" font-size="12" font-weight="600" fill="${C.textMuted}">위험도</text>
        </g>

        <text x="30" y="150" font-size="13" font-weight="800" fill="${C.textSoft}">핵심 원인</text>
        <text x="30" y="175" font-size="13" font-weight="500" fill="${C.textSoft}">${g.main}</text>

        <text x="30" y="210" font-size="13" font-weight="800" fill="${C.textSoft}">위기 트리거</text>
        ${g.trigger.map((t, j) => `
          <g transform="translate(30, ${240 + j * 32})">
            <circle cx="6" cy="-4" r="5" fill="${g.color}"/>
            <text x="20" y="0" font-size="12" font-weight="500" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 05 CONFLICT MAP ----------
function conflictMap() {
  const conflicts = [
    { area: '💰 돈 · 재정', impact: 'HIGH',
      pattern: 'NT vs SP: 장기 투자 vs 현재 소비 / SJ vs NF: 저축 vs 경험 지출' },
    { area: '🏡 집안일 분담', impact: 'HIGH',
      pattern: 'SJ(루틴 기대) vs NF/SP(융통성 선호) / J vs P 완벽 기준 차이' },
    { area: '👶 자녀 양육', impact: 'HIGH',
      pattern: 'NF(감정 공감) vs NT(독립 훈련) / SJ(규칙) vs SP(자유) 갈등' },
    { area: '💬 감정 표현', impact: 'MID',
      pattern: 'F 유형(언어화 요구) vs T 유형(행동 증명) 표현 방식 차이' },
    { area: '🛋 휴식 · 여가', impact: 'MID',
      pattern: 'E(외출 · 사람) vs I(집 · 혼자) 에너지 충전 방식' },
    { area: '👪 시가/친가 관계', impact: 'MID',
      pattern: 'F(감정 부담) vs T(의무 이행) / J(정기 방문) vs P(필요시)' },
  ];
  const imColor = { LOW: C.safe, MID: C.warn, HIGH: C.danger };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">부부 갈등 6대 포인트 지도</text>
  <text x="600" y="80" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">인지기능 · 기질 차이로 발생하는 전형적 갈등 영역 · 미리 알면 60% 예방</text>

  ${conflicts.map((c, i) => {
    const y = 120 + i * 120;
    const color = imColor[c.impact];
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="100" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="100" rx="4" fill="${color}"/>
        <text x="40" y="45" font-size="22" font-weight="800" fill="${C.text}">${c.area}</text>
        <g transform="translate(280, 25)">
          <rect width="75" height="28" rx="14" fill="${color}"/>
          <text x="37.5" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">${c.impact}</text>
        </g>
        <text x="40" y="78" font-size="13" font-weight="500" fill="${C.textMuted}">${c.pattern}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 06 RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 결혼 유지 루틴', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 주 1회 "감정 상태 공유" 30분 대화',
        '② 권태 신호 감지 → 분기 1회 여행·이벤트',
        '③ 과도한 감정 의존 방지 — 자기 친구 유지',
        '④ 상대 T형이면 감정 언어화 교육 대신 행동 인정',
      ] },
    { name: '담즙질 결혼 유지 루틴', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 일 끝나면 "가정 모드" 전환 의식 만들기',
        '② 감정 대화를 "회의 30분"처럼 주간 예약',
        '③ 통제 욕구 내려놓기 — 상대 영역 존중',
        '④ 성과 정체기에도 결혼 유지 가치 되새기기',
      ] },
    { name: '점액질 결혼 유지 루틴', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 참지 말고 "작은 불만" 월 1회 정리 표현',
        '② 자기 필요 "나는 이게 필요해" 말로 요청',
        '③ 관계 변화 수용 — 20년차에도 재학습 필요',
        '④ 도어슬램 예방 — 한계 오기 전 대화 시작',
      ] },
    { name: '우울질 결혼 유지 루틴', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 감정 표현 훈련 — "사랑해" "고맙다" 말로',
        '② 이상-현실 갭 크면 기대치 재조정 대화',
        '③ 독립 욕구 인정하되 "같이 있는 시간" 확보',
        '④ 장기 비전 공유 — 결혼 10년 후 로드맵',
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
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 결혼 유지 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">20년 가는 결혼의 공식 · 기질별 4단계 실전 루틴</text>

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
  { name: 'marriage-01-hero', svg: hero() },
  { name: 'marriage-02-satisfaction', svg: satisfaction() },
  { name: 'marriage-03-styles', svg: marriageStyles() },
  { name: 'marriage-04-divorce-risk', svg: divorceRisk() },
  { name: 'marriage-05-conflict-map', svg: conflictMap() },
  { name: 'marriage-06-ritual', svg: ritual() },
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
