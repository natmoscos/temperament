// 2개 신규 글 이미지 (hero + groups 각 1장 = 총 4장)
//   midterm-mbti-*       MBTI 중간고사 벼락치기
//   teachers-day-mbti-*  MBTI 스승의 날 편지

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
const OUT_DIR = path.join(ROOT, 'public/blog');

const C = {
  bg: '#faf8f5', white: '#ffffff',
  text: '#1a1a1a', textSoft: '#4b5563', textMuted: '#6b7280', textFaint: '#9ca3af',
  indigo: '#6366f1', purple: '#a855f7', amber: '#f59e0b', rose: '#f43f5e',
  emerald: '#10b981', sky: '#0ea5e9',
  teal: '#14b8a6', orange: '#f97316', coral: '#fb7185',
  navy: '#1e293b',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="14" font-weight="600" fill="${C.textFaint}" opacity="0.85">${esc(footer)}</text>
</svg>`;

function hero({ badge, title1, title2, sub, emoji, color1, color2, accent }) {
  return wrap(`
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hg)" opacity="0.12"/>
  <rect x="100" y="90" rx="24" width="320" height="48" fill="${C.white}" stroke="${accent}" stroke-width="2"/>
  <text x="260" y="122" text-anchor="middle" font-size="18" font-weight="800" fill="${accent}">${esc(badge)}</text>
  <text x="1050" y="280" text-anchor="middle" font-size="260">${esc(emoji)}</text>
  <text x="100" y="420" font-size="78" font-weight="900" fill="${C.text}">${esc(title1)}</text>
  <text x="100" y="520" font-size="78" font-weight="900" fill="${accent}">${esc(title2)}</text>
  <text x="100" y="620" font-size="28" font-weight="600" fill="${C.textSoft}">${esc(sub)}</text>
  <rect x="100" y="680" width="200" height="6" fill="${accent}"/>
`);
}

function matrix({ title, cells }) {
  const boxes = cells.map((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 100 + col * 510;
    const y = 220 + row * 300;
    return `
      <rect x="${x}" y="${y}" width="480" height="260" rx="24" fill="${C.white}" stroke="${c.color}" stroke-width="3"/>
      <circle cx="${x + 50}" cy="${y + 60}" r="30" fill="${c.color}"/>
      <text x="${x + 50}" y="${y + 68}" text-anchor="middle" font-size="22" font-weight="900" fill="${C.white}">${esc(c.icon)}</text>
      <text x="${x + 100}" y="${y + 70}" font-size="26" font-weight="900" fill="${C.text}">${esc(c.label)}</text>
      <foreignObject x="${x + 40}" y="${y + 100}" width="400" height="140">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:${FONT};font-size:17px;line-height:1.5;color:${C.textSoft};font-weight:500;">${esc(c.desc)}</div>
      </foreignObject>
    `;
  }).join('\n');
  return wrap(`
  <text x="600" y="130" text-anchor="middle" font-size="46" font-weight="900" fill="${C.text}">${esc(title)}</text>
  <rect x="500" y="160" width="200" height="6" fill="${C.rose}"/>
  ${boxes}
  `);
}

// ─── 1. MBTI 중간고사 벼락치기 ──────────────────────
const heroMidterm = hero({
  badge: '📚 시험 3일 남았을 때',
  title1: 'MBTI 벼락치기',
  title2: '3일 점수 방어',
  sub: 'NT·NF·SJ·SP 네 그룹별 함정과 보완 공식 총정리',
  emoji: '📝',
  color1: C.indigo,
  color2: C.purple,
  accent: C.indigo,
});

const matrixMidterm = matrix({
  title: '유형별 벼락치기 치명 함정',
  cells: [
    { icon: 'NT', label: '분석가형', desc: '개념 완벽주의. 1단원 12시간 파고 4~10단원 못 훑고 시험. 훑기 1회 먼저 원칙.', color: C.indigo },
    { icon: 'NF', label: '이상주의형', desc: '감정 롤러코스터. 불안·유튜브·엄마 전화로 3시간 삭제. 포모도로 25분 엄수.', color: C.rose },
    { icon: 'SJ', label: '관리자형', desc: '완주 집착. 10단원 순서대로. 빈출 20%만 잡기 선언 + 기출 먼저 풀기.', color: C.emerald },
    { icon: 'SP', label: '탐험가형', desc: '벼락치기 자만. 2일 전 늦은 시작. 문제집 먼저 + 3일 전 착수 원칙.', color: C.amber },
  ],
});

// ─── 2. MBTI 스승의 날 편지 ──────────────────
const heroTeachers = hero({
  badge: '🌷 5월 15일 스승의 날',
  title1: 'MBTI 스승의 날',
  title2: '편지 실패 공식',
  sub: 'NT 형식과잉·NF 감정과잉·SJ 디테일과잉·SP 성의오해 해법',
  emoji: '💌',
  color1: C.coral,
  color2: C.rose,
  accent: C.rose,
});

const matrixTeachers = matrix({
  title: '유형별 편지 쓰기 함정',
  cells: [
    { icon: 'NT', label: '분석가형', desc: '형식 과잉. 논문 감사문 스타일. 구체 에피소드 1개 + 감정 단어 3개로 전환.', color: C.indigo },
    { icon: 'NF', label: '이상주의형', desc: '감정 폭주. 5장 눈물 편지. 선생님 걱정시킴. 3문단 룰로 압축.', color: C.rose },
    { icon: 'SJ', label: '관리자형', desc: '디테일 과잉. 월별 타임라인. 핵심 묻힘. 순간 1개 클로즈업으로 좁히기.', color: C.emerald },
    { icon: 'SP', label: '탐험가형', desc: '짧으면 성의없다 오해. 본인 머릿속만. 3문장 진심이 10장 형식보다 강함.', color: C.amber },
  ],
});

// ─── 렌더 ─────────────────────────────────
const images = [
  { name: 'midterm-mbti-01-hero', svg: heroMidterm },
  { name: 'midterm-mbti-02-groups', svg: matrixMidterm },
  { name: 'teachers-day-mbti-01-hero', svg: heroTeachers },
  { name: 'teachers-day-mbti-02-groups', svg: matrixTeachers },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { name, svg } of images) {
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  const webpPath = path.join(OUT_DIR, `${name}.webp`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg), { density: 200 }).resize(1200).webp({ quality: 88 }).toFile(webpPath);
  const kb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  console.log(`✅ ${name}.webp (${kb} KB)`);
}
console.log(`\n완료: ${images.length}/${images.length}`);
