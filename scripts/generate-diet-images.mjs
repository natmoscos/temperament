// Generate infographics for "MBTI 다이어트 성공 공식"
// Output: public/blog/diet-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  fit: '#10b981', fitDeep: '#047857', fitSoft: '#d1fae5',
  fire: '#ef4444', fireSoft: '#fee2e2',
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
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 다이어트 리포트</text>
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
    <linearGradient id="dBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d1fae5"/>
      <stop offset="100%" stop-color="#ecfdf5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#dBg)"/>

  <text x="180" y="200" font-size="50" opacity="0.2">🥗</text>
  <text x="960" y="180" font-size="50" opacity="0.2">💪</text>
  <text x="200" y="760" font-size="45" opacity="0.2">⚖️</text>
  <text x="940" y="740" font-size="50" opacity="0.2">🏃</text>

  <rect x="180" y="300" width="840" height="280" rx="32" fill="#ffffff" stroke="${C.fitDeep}" stroke-width="3" opacity="0.97"/>
  <text x="600" y="370" text-anchor="middle" font-size="22" font-weight="700" fill="${C.fitDeep}">192TYPES · DIET REPORT 2026</text>
  <text x="600" y="445" text-anchor="middle" font-size="52" font-weight="900" fill="${C.text}">MBTI 다이어트 성공 공식</text>
  <text x="600" y="495" text-anchor="middle" font-size="28" font-weight="700" fill="${C.textSoft}">감량 성공률 + 요요 위험 랭킹 TOP 16</text>
  <text x="600" y="550" text-anchor="middle" font-size="17" font-weight="600" fill="${C.textMuted}">네 유형에 맞는 식단 · 운동 · 동기부여 전략</text>
  `);
}

function successRank() {
  const data = [
    { type: 'ESTJ', score: 92, note: '실행력 · 목표 달성' },
    { type: 'ENTJ', score: 88, note: '계획적 · 수치 관리' },
    { type: 'ISTJ', score: 86, note: '루틴 장기 유지' },
    { type: 'INTJ', score: 82, note: '데이터 기반 접근' },
    { type: 'ISTP', score: 78, note: '신체 감각 민감' },
    { type: 'ESTP', score: 74, note: '도전 좋아함' },
    { type: 'ISFJ', score: 70, note: '꾸준함 · 인내' },
    { type: 'ENFJ', score: 66, note: '책임감 있음' },
    { type: 'ESFJ', score: 62, note: '주변 시선 동기' },
    { type: 'INTP', score: 56, note: '이론 과잉 · 실행 부족' },
    { type: 'ENTP', score: 52, note: '시작은 빠른데 포기 빠름' },
    { type: 'INFJ', score: 48, note: '이상형 · 현실 갭' },
    { type: 'INFP', score: 44, note: '감정 기복 따라 요요' },
    { type: 'ENFP', score: 38, note: '금방 싫증 · 폭식 충동' },
    { type: 'ESFP', score: 32, note: '현재 즐거움 > 장기 목표' },
    { type: 'ISFP', score: 26, note: '감각 자극 의존' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 다이어트 성공률 랭킹</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">6개월 감량 목표 달성률 + 유지력 종합 100점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 47;
    const barW = d.score * 7.5;
    const color = COLOR_OF[GROUP_OF[d.type]];
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

function yoyoRisk() {
  const data = [
    { type: 'ENFP', yoyo: 82 }, { type: 'ESFP', yoyo: 78 }, { type: 'INFP', yoyo: 74 }, { type: 'ISFP', yoyo: 72 },
    { type: 'ENTP', yoyo: 68 }, { type: 'ENFJ', yoyo: 60 }, { type: 'ESFJ', yoyo: 56 }, { type: 'INFJ', yoyo: 52 },
    { type: 'INTP', yoyo: 48 }, { type: 'ESTP', yoyo: 42 }, { type: 'ISTP', yoyo: 34 }, { type: 'ISTJ', yoyo: 28 },
    { type: 'ESTJ', yoyo: 24 }, { type: 'ENTJ', yoyo: 22 }, { type: 'ISFJ', yoyo: 20 }, { type: 'INTJ', yoyo: 18 },
  ];
  const lv = (v) => v >= 70 ? 'HIGH' : v >= 40 ? 'MID' : 'LOW';
  const lvColor = { LOW: C.safe, MID: C.warn, HIGH: C.danger };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">요요 위험도 랭킹 — 감량 후 6개월 재증가</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">감량 성공 후 체중 원복 확률 · 높을수록 위험</text>

  ${data.map((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * 560;
    const y = 130 + row * 80;
    const barW = d.yoyo * 4.5;
    const color = lvColor[lv(d.yoyo)];
    const typeColor = COLOR_OF[GROUP_OF[d.type]];
    return `
      <g transform="translate(${x}, ${y})">
        <text x="0" y="20" font-size="16" font-weight="900" fill="${C.textFaint}">${String(i + 1).padStart(2, '0')}</text>
        <text x="35" y="20" font-size="18" font-weight="800" fill="${typeColor}">${d.type}</text>
        <rect x="110" y="5" width="${barW}" height="24" rx="12" fill="${color}" opacity="0.25"/>
        <rect x="110" y="5" width="${barW}" height="24" rx="12" fill="${color}" opacity="0.85"/>
        <text x="${120 + barW}" y="22" font-size="13" font-weight="800" fill="${color}">${d.yoyo}%</text>
        <rect x="460" y="5" width="56" height="24" rx="12" fill="${color}"/>
        <text x="488" y="21" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${lv(d.yoyo)}</text>
      </g>
    `;
  }).join('')}
  `);
}

function dietPattern() {
  const modes = [
    { name: '스프린트 다이어트', icon: '⚡', color: C.nt600,
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      style: '고강도 + 단기 목표 + 수치 경쟁',
      method: [
        '월 목표: -3kg 같은 명확 수치',
        '고강도 운동 · 케톤·간헐적 단식 선호',
        '결과 미달성 시 더 공격적 세팅',
        '성공 후 유지 전략 설계 필수',
      ] },
    { name: '루틴 다이어트', icon: '🌾', color: C.sj600,
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      style: '저강도 + 장기 지속 + 습관화',
      method: [
        '월 목표: -1~2kg 현실적',
        '같은 시간·같은 장소 루틴 고정',
        '식단도 반복 3~5가지만 돌림',
        '기록·자격 취득(요가 등) 동기',
      ] },
    { name: '게임화 다이어트', icon: '🎮', color: C.sp600,
      types: 'ESTP · ESFP · ISTP · ISFP',
      style: '재미 + 도전 + 사회성 활용',
      method: [
        '크로스핏·PT 그룹·런닝 크루',
        '체중보다 퍼포먼스 목표 (5km 완주)',
        '지루하면 종목 전환 OK',
        '성과 공유로 동기 유지',
      ] },
    { name: '의미 다이어트', icon: '💖', color: C.nf500,
      types: 'ENFP · INFP · ENFJ · INFJ',
      style: '가치 + 감정 + 몸 돌봄',
      method: [
        '"건강한 나" 이상 이미지 설정',
        '감정 폭식 인식 + 대체 루틴',
        '같이 하는 파트너 존재 필수',
        '느린 변화 수용 + 자기 용서',
      ] },
  ];

  const w = 520, h = 360;
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 510 }, { x: 620, y: 510 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">4가지 다이어트 DNA — 네 유형 접근법</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">기질별 다이어트 최적화 전략 · 스프린트 / 루틴 / 게임 / 의미</text>

  ${positions.map((p, i) => {
    const m = modes[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="24" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="13" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        <rect x="30" y="88" width="${w - 60}" height="40" rx="12" fill="${m.color}" opacity="0.1"/>
        <text x="45" y="113" font-size="13" font-weight="700" fill="${m.color}">${m.style}</text>

        ${m.method.map((t, j) => `
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

function motivationMap() {
  // 4분면: 가로=보상 시점(즉시↔장기), 세로=동기원(내부↔외부)
  const points = [
    { t: 'ESTP', x: 850, y: 220 }, { t: 'ESFP', x: 870, y: 270 },
    { t: 'ESTJ', x: 850, y: 560 }, { t: 'ENTJ', x: 880, y: 620 },
    { t: 'ISTP', x: 780, y: 250 }, { t: 'ISFP', x: 800, y: 290 },
    { t: 'ISTJ', x: 780, y: 580 }, { t: 'INTJ', x: 810, y: 640 },
    { t: 'ENFP', x: 340, y: 230 }, { t: 'ESFJ', x: 320, y: 290 },
    { t: 'ENFJ', x: 310, y: 560 }, { t: 'ENTP', x: 350, y: 640 },
    { t: 'INFP', x: 260, y: 260 }, { t: 'ISFJ', x: 230, y: 320 },
    { t: 'INFJ', x: 220, y: 580 }, { t: 'INTP', x: 270, y: 650 },
  ];

  return wrap(`
  <text x="600" y="45" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">다이어트 동기부여 4분면</text>
  <text x="600" y="72" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">가로 = 보상 시점(내부 ↔ 외부), 세로 = 동기원(즉시 ↔ 장기)</text>

  <line x1="600" y1="100" x2="600" y2="800" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>
  <line x1="120" y1="450" x2="1080" y2="450" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>

  <text x="600" y="93" text-anchor="middle" font-size="14" font-weight="800" fill="${C.nt600}">즉시 보상 (3일~1주)</text>
  <text x="600" y="820" text-anchor="middle" font-size="14" font-weight="800" fill="${C.nt600}">장기 보상 (3~6개월)</text>
  <text x="130" y="455" font-size="14" font-weight="800" fill="${C.textMuted}">내부 동기</text>
  <text x="970" y="455" font-size="14" font-weight="800" fill="${C.textMuted}">외부 동기</text>

  <rect x="120" y="100" width="480" height="350" fill="${C.nf50}" opacity="0.3"/>
  <rect x="600" y="100" width="480" height="350" fill="${C.sp50}" opacity="0.3"/>
  <rect x="120" y="450" width="480" height="350" fill="${C.nt50}" opacity="0.3"/>
  <rect x="600" y="450" width="480" height="350" fill="${C.sj50}" opacity="0.3"/>

  ${points.map(p => {
    const color = COLOR_OF[GROUP_OF[p.t]];
    return `
      <circle cx="${p.x}" cy="${p.y}" r="30" fill="${color}" opacity="0.18"/>
      <circle cx="${p.x}" cy="${p.y}" r="24" fill="${color}" opacity="0.85" stroke="#fff" stroke-width="2"/>
      <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">${p.t}</text>
    `;
  }).join('')}

  <!-- Quadrant labels -->
  <text x="240" y="150" font-size="13" font-weight="800" fill="${C.nf600}">감정 · 기분 즉시 보상</text>
  <text x="720" y="150" font-size="13" font-weight="800" fill="${C.sp600}">사회적 인정 · SNS</text>
  <text x="240" y="790" font-size="13" font-weight="800" fill="${C.nt600}">건강 · 자기성장</text>
  <text x="720" y="790" font-size="13" font-weight="800" fill="${C.sj600}">목표 달성 · 수치</text>
  `);
}

function ritual() {
  const groups = [
    { name: '다혈질 다이어트 루틴', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 감정 폭식 인식 → 10분 산책으로 대체',
        '② 파트너 1명 함께 — 다혈질은 혼자 실패율 80%',
        '③ 재미 요소 필수 — 클래스·크루 참여',
        '④ 완벽주의 포기 — 치팅 데이 주 1회 허용',
      ] },
    { name: '담즙질 다이어트 루틴', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 명확한 수치 목표 + 2주 체크인',
        '② 과도한 공격적 세팅 주의 (부상 위험)',
        '③ 감량 후 유지 전략 미리 설계',
        '④ 통제 내려놓기 — 휴식도 프로그램',
      ] },
    { name: '점액질 다이어트 루틴', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 같은 시간·같은 장소 루틴 고정',
        '② 식단 3~5가지 반복 (선택 피로 감소)',
        '③ 기록 + 월 진행 리뷰',
        '④ 변화는 느리지만 확실 — 조급해 말기',
      ] },
    { name: '우울질 다이어트 루틴', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 데이터 기반 접근 — 체지방·근육량 추적',
        '② 이론 학습만 하지 말고 실행 주간 할당',
        '③ 혼자 운동 + 월 1회 코치 점검',
        '④ 몸 신호 과분석 금지 — 평균값으로 판단',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 다이어트 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">네 기질 최적화된 4단계 · 오늘부터 1개씩</text>

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
  { name: 'diet-01-hero', svg: hero() },
  { name: 'diet-02-success-rank', svg: successRank() },
  { name: 'diet-03-yoyo-risk', svg: yoyoRisk() },
  { name: 'diet-04-pattern', svg: dietPattern() },
  { name: 'diet-05-motivation', svg: motivationMap() },
  { name: 'diet-06-ritual', svg: ritual() },
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
