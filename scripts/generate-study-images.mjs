// Generate infographics for "MBTI 공부법 — 시험 공부 효율 + 집중 패턴"
// Output: public/blog/study-{name}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', card: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb', divider: '#d1d5db',
  study: '#6366f1', studyDeep: '#4338ca', studySoft: '#e0e7ff',
  pen: '#f59e0b',
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
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 공부법 리포트</text>
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
    <linearGradient id="sBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#eef2ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#sBg)"/>

  <text x="180" y="200" font-size="50" opacity="0.2">📚</text>
  <text x="960" y="180" font-size="50" opacity="0.2">✏️</text>
  <text x="200" y="760" font-size="45" opacity="0.2">💡</text>
  <text x="940" y="740" font-size="50" opacity="0.2">🎓</text>

  <rect x="120" y="260" width="960" height="410" rx="36" fill="#ffffff" stroke="${C.studyDeep}" stroke-width="4" opacity="0.97"/>
  <text x="600" y="340" text-anchor="middle" font-size="30" font-weight="800" fill="${C.studyDeep}">192TYPES · STUDY REPORT 2026</text>
  <text x="600" y="445" text-anchor="middle" font-size="82" font-weight="900" fill="${C.text}">MBTI 공부법</text>
  <text x="600" y="520" text-anchor="middle" font-size="40" font-weight="700" fill="${C.textSoft}">시험 효율 + 집중 패턴 16유형</text>
  <text x="600" y="615" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">암기 · 이해 · 적용 · 토론 4가지 공부 DNA</text>
  `);
}

function efficiency() {
  const data = [
    { type: 'INTJ', score: 94, note: '체계 + 장기 설계' },
    { type: 'ISTJ', score: 92, note: '꾸준함 + 반복' },
    { type: 'INTP', score: 88, note: '원리 이해 깊이' },
    { type: 'ENTJ', score: 86, note: '목표 + 실행력' },
    { type: 'INFJ', score: 80, note: '의미 + 집중' },
    { type: 'ESTJ', score: 78, note: '실전 적용 + 관리' },
    { type: 'ISFJ', score: 72, note: '반복 + 꼼꼼' },
    { type: 'ENTP', score: 68, note: '아이디어 + 토론' },
    { type: 'INFP', score: 62, note: '가치 + 이상 학습' },
    { type: 'ISTP', score: 58, note: '실습 + 문제 해결' },
    { type: 'ENFJ', score: 52, note: '가르칠 때 더 배움' },
    { type: 'ESFJ', score: 48, note: '그룹 스터디 강점' },
    { type: 'ENFP', score: 42, note: '관심만큼 폭발' },
    { type: 'ISFP', score: 36, note: '감각 자극 필요' },
    { type: 'ESTP', score: 30, note: '실전 외 지루' },
    { type: 'ESFP', score: 24, note: '집중 유지 어려움' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">16유형 공부 효율 랭킹</text>
  <text x="600" y="80" text-anchor="middle" font-size="20" font-weight="500" fill="${C.textMuted}">학습 지속력 + 이해도 + 시험 성적 종합 100점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 47;
    const barW = d.score * 7.5;
    const color = COLOR_OF[GROUP_OF[d.type]];
    return `
      <text x="50" y="${y + 22}" font-size="20" font-weight="800" fill="${C.textFaint}">${String(i + 1).padStart(2, '0')}</text>
      <text x="95" y="${y + 22}" font-size="25" font-weight="800" fill="${color}">${d.type}</text>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.25"/>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.85"/>
      <text x="${180 + barW}" y="${y + 25}" font-size="20" font-weight="800" fill="${color}">${d.score}</text>
      <text x="920" y="${y + 27}" font-size="18" font-weight="600" fill="${C.textMuted}">${d.note}</text>
    `;
  }).join('')}
  `);
}

function focusCurve() {
  // 4기질의 집중력 곡선 (0~120분)
  const curves = [
    { group: '담즙질', color: C.nt600, peak: { x: 15, y: 180 }, decay: 0.3,
      note: '15분 폭발 → 45분 후 급감 → 짧은 재시작' },
    { group: '우울질', color: C.nt700, peak: { x: 60, y: 170 }, decay: 0.15,
      note: '60분 피크 → 120분까지 완만 감소' },
    { group: '점액질', color: C.sj600, peak: { x: 45, y: 200 }, decay: 0.1,
      note: '45분 피크 → 2시간+ 장시간 유지' },
    { group: '다혈질', color: C.nf500, peak: { x: 10, y: 190 }, decay: 0.5,
      note: '10분 폭발 → 30분 후 급감 → 자극 필요' },
  ];

  const leftPad = 100, rightPad = 80, topPad = 140, botPad = 260;
  const gW = 1200 - leftPad - rightPad;
  const gH = 900 - topPad - botPad;
  const axisY = 900 - botPad;

  const curvePath = (c, max = 120) => {
    const pts = [];
    for (let x = 0; x <= max; x += 5) {
      const dx = Math.abs(x - c.peak.x);
      const v = Math.max(0, c.peak.y * Math.exp(-c.decay * dx * 0.04));
      const px = leftPad + (x / max) * gW;
      const py = axisY - v;
      pts.push(`${px},${py}`);
    }
    return pts;
  };

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">4기질별 집중력 곡선</text>
  <text x="600" y="80" text-anchor="middle" font-size="20" font-weight="500" fill="${C.textMuted}">공부 시작 후 시간별 집중도 변화 · 네 기질에 맞는 타이머 설정</text>

  <!-- Axes -->
  <line x1="${leftPad}" y1="${axisY}" x2="${1200 - rightPad}" y2="${axisY}" stroke="${C.textMuted}" stroke-width="2"/>
  <line x1="${leftPad}" y1="${topPad}" x2="${leftPad}" y2="${axisY}" stroke="${C.textMuted}" stroke-width="2"/>

  <!-- X labels (minutes) -->
  ${[0, 30, 60, 90, 120].map(x => {
    const px = leftPad + (x / 120) * gW;
    return `
      <line x1="${px}" y1="${axisY}" x2="${px}" y2="${axisY + 6}" stroke="${C.textMuted}" stroke-width="2"/>
      <text x="${px}" y="${axisY + 24}" text-anchor="middle" font-size="17" font-weight="700" fill="${C.textMuted}">${x}분</text>
    `;
  }).join('')}

  <text x="${leftPad - 10}" y="${topPad - 10}" text-anchor="end" font-size="17" font-weight="700" fill="${C.textMuted}">집중도</text>

  <!-- Curves -->
  ${curves.map(c => `
    <polyline points="${curvePath(c).join(' ')}" fill="none" stroke="${c.color}" stroke-width="4" opacity="0.85"/>
  `).join('')}

  <!-- Legend + description -->
  ${curves.map((c, i) => `
    <g transform="translate(${80 + (i % 2) * 560}, ${axisY + 60 + Math.floor(i / 2) * 50})">
      <rect width="14" height="14" rx="3" fill="${c.color}"/>
      <text x="24" y="12" font-size="20" font-weight="800" fill="${c.color}">${c.group}</text>
      <text x="100" y="12" font-size="17" font-weight="500" fill="${C.textSoft}">${c.note}</text>
    </g>
  `).join('')}
  `);
}

function methodMatrix() {
  const methods = [
    { name: '암기형 공부', icon: '📝', color: C.sj600,
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      core: '반복 + 체계화',
      how: [
        '서브노트 · 요약 카드 최강',
        '같은 내용 3~5회 반복 회독',
        '시험 전날 총정리 페이지 제작',
        '암기 과목에 강점',
      ] },
    { name: '이해형 공부', icon: '🧠', color: C.nt600,
      types: 'INTJ · INTP · INFJ · INFP',
      core: '원리 + 구조 파악',
      how: [
        '첫 학습 시 전체 구조부터',
        '개념 간 연결고리 그리기',
        '"왜?" 질문 무한 반복',
        '이론 · 추상 과목 최강',
      ] },
    { name: '적용형 공부', icon: '🔧', color: C.sp600,
      types: 'ISTP · ESTP · ISFP · ESFP',
      core: '실습 + 문제 풀이',
      how: [
        '이론 먼저 X, 문제 풀이 시작',
        '실험 · 실기 · 코딩 선호',
        '손으로 익히는 게 최강',
        '실기 · 기술 과목 최강',
      ] },
    { name: '토론형 공부', icon: '💬', color: C.nf500,
      types: 'ENTJ · ENTP · ENFJ · ENFP',
      core: '대화 + 가르치기',
      how: [
        '스터디 그룹에서 폭발',
        '설명하면서 진짜 이해',
        '글쓰기 · 발표로 정리',
        '논술 · 인문학 과목 최강',
      ] },
  ];

  const w = 520, h = 360;
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 510 }, { x: 620, y: 510 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">4가지 공부 DNA — 네 방법은?</text>
  <text x="600" y="80" text-anchor="middle" font-size="20" font-weight="500" fill="${C.textMuted}">인지기능별 최적 공부법 · 암기 / 이해 / 적용 / 토론</text>

  ${positions.map((p, i) => {
    const m = methods[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="34" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="18" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        <rect x="30" y="88" width="${w - 60}" height="40" rx="12" fill="${m.color}" opacity="0.1"/>
        <text x="45" y="113" font-size="18" font-weight="700" fill="${m.color}">${m.core}</text>

        ${m.how.map((t, j) => `
          <g transform="translate(30, ${160 + j * 45})">
            <circle cx="10" cy="0" r="11" fill="${m.color}" opacity="0.2"/>
            <text x="10" y="5" text-anchor="middle" font-size="17" font-weight="900" fill="${m.color}">${j + 1}</text>
            <text x="32" y="5" font-size="18" font-weight="600" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

function subjectFit() {
  const rows = [
    { group: 'NT', color: C.nt600, label: 'NT 분석가형',
      types: 'INTJ · INTP · ENTJ · ENTP',
      strong: '수학 · 물리 · 공학 · 프로그래밍 · 철학',
      weak: '암기 문과 · 루틴 반복' },
    { group: 'NF', color: C.nf600, label: 'NF 이상주의형',
      types: 'INFJ · INFP · ENFJ · ENFP',
      strong: '국어 · 문학 · 심리 · 외국어 · 예술사',
      weak: '암기 수학 · 기계적 반복' },
    { group: 'SJ', color: C.sj600, label: 'SJ 관리자형',
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      strong: '법학 · 회계 · 역사 · 외국어 · 의학',
      weak: '추상 이론 · 창의 서술' },
    { group: 'SP', color: C.sp600, label: 'SP 기회포착형',
      types: 'ISTP · ISFP · ESTP · ESFP',
      strong: '실기 · 미술 · 체육 · 기술 · 실험',
      weak: '장기 이론 · 단순 암기' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="42" font-weight="800" fill="${C.text}">4기질 × 과목 적합성</text>
  <text x="600" y="80" text-anchor="middle" font-size="20" font-weight="500" fill="${C.textMuted}">네 기질의 강점 과목 vs 약점 과목 · 전략 짤 때 참고</text>

  ${rows.map((r, i) => {
    const y = 120 + i * 180;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="160" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="160" rx="4" fill="${r.color}"/>
        <text x="30" y="45" font-size="34" font-weight="900" fill="${r.color}">${r.label}</text>
        <text x="30" y="68" font-size="18" font-weight="700" fill="${C.textMuted}">${r.types}</text>

        <g transform="translate(30, 85)">
          <rect width="90" height="28" rx="14" fill="${C.safe}" opacity="0.2"/>
          <text x="45" y="20" text-anchor="middle" font-size="18" font-weight="900" fill="${C.safe}">강점</text>
          <text x="110" y="20" font-size="20" font-weight="700" fill="${C.textSoft}">${r.strong}</text>
        </g>

        <g transform="translate(30, 125)">
          <rect width="90" height="28" rx="14" fill="${C.danger}" opacity="0.2"/>
          <text x="45" y="20" text-anchor="middle" font-size="18" font-weight="900" fill="${C.danger}">약점</text>
          <text x="110" y="20" font-size="20" font-weight="700" fill="${C.textSoft}">${r.weak}</text>
        </g>
      </g>
    `;
  }).join('')}
  `);
}

function ritual() {
  const groups = [
    { name: '다혈질 공부 루틴', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 15분 타이머 + 5분 쉬기 반복',
        '② 스터디 그룹 필수 — 혼자 집중 실패율 80%',
        '③ 관심 과목부터 시작 → 약점 과목 에너지 남을 때',
        '④ 설명하기 공부법 — 친구/인형/카메라에',
      ] },
    { name: '담즙질 공부 루틴', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 목표 수치화 — 주간 분량 + 시험 목표 점수',
        '② 15~30분 폭발 집중 + 짧은 재시작',
        '③ 과부하 경계 — 체력 분배 필수',
        '④ 경쟁 요소 활용 — 모의고사 랭킹 등',
      ] },
    { name: '점액질 공부 루틴', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 하루 같은 시간 · 같은 자리 고정',
        '② 2시간+ 장시간 집중 가능 활용',
        '③ 반복 회독 3~5회 — 이게 핵심 강점',
        '④ 시험 직전 새로운 교재 금지',
      ] },
    { name: '우울질 공부 루틴', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 전체 구조부터 → 세부 나중에',
        '② 60분 집중 + 10분 사색 리듬',
        '③ 조용한 1인 공간 절대 필수',
        '④ 완벽주의 조기 마감 — 80% 완성 후 공개',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 }, { x: 620, y: 115 },
    { x: 60, y: 490 }, { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="39" font-weight="800" fill="${C.text}">기질별 공부 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="18" font-weight="500" fill="${C.textMuted}">시험 D-30부터 적용 가능 · 기질 최적화 4단계</text>

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
  { name: 'study-01-hero', svg: hero() },
  { name: 'study-02-efficiency', svg: efficiency() },
  { name: 'study-03-focus-curve', svg: focusCurve() },
  { name: 'study-04-method', svg: methodMatrix() },
  { name: 'study-05-subject-fit', svg: subjectFit() },
  { name: 'study-06-ritual', svg: ritual() },
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
