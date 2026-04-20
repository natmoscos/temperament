// 2개 신규 글 이미지 (hero + content 각 2장 = 4장)
//   parents-mbti-*    어버이날 × MBTI
//   interview-mbti-*  MBTI 면접 합격 공식

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
  pink: '#fb7185', pinkSoft: '#fecdd3',
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
  <rect x="100" y="90" rx="24" width="280" height="48" fill="${C.white}" stroke="${accent}" stroke-width="2"/>
  <text x="240" y="122" text-anchor="middle" font-size="18" font-weight="800" fill="${accent}">${esc(badge)}</text>
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

// ─── 1. 어버이날 × MBTI ──────────────────────
const heroParents = hero({
  badge: '🌸 5월 8일 어버이날 공략',
  title1: '부모님 MBTI',
  title2: '대화법이 바뀐다',
  sub: '카네이션 말고 진짜 꽂히는 선물 · 유형별 대화 꿀팁',
  emoji: '🌷',
  color1: C.pink,
  color2: C.rose,
  accent: C.rose,
});

const matrixParents = matrix({
  title: '4기질별 부모님 공략법',
  cells: [
    { icon: 'NT', label: '분석가 부모', desc: '논리적 감사 + 실용 고기능 제품. "엄마 투자 조언이 제 재테크 기반이 됐어요" 식.', color: C.indigo },
    { icon: 'NF', label: '이상주의 부모', desc: '손편지 + 구체 에피소드. 스토리 있는 선물. 의미가 가격보다 중요.', color: C.rose },
    { icon: 'SJ', label: '관리자 부모', desc: '한국에서 제일 많은 유형. 건강검진권·실용품. 과거 기억 언급에 감동.', color: C.emerald },
    { icon: 'SP', label: '탐험가 부모', desc: '물건보다 함께하는 경험. 근교 1박 여행·맛집. 즉흥성이 정답.', color: C.amber },
  ],
});

// ─── 2. MBTI 면접 합격 공식 ──────────────────
const heroInterview = hero({
  badge: '💼 취업 시즌 합격 공식',
  title1: 'MBTI 면접',
  title2: '약점 보완법',
  sub: '박서연 3번 떨어진 ENFP 실수담 · 이준형 12년 면접관 뷰',
  emoji: '💼',
  color1: C.navy,
  color2: C.indigo,
  accent: C.indigo,
});

const matrixInterview = matrix({
  title: '유형별 면접 치명 약점',
  cells: [
    { icon: 'NT', label: '분석가형', desc: '논리 강, 감정 약. "왜 우리 회사?" 질문에 IR 보고서처럼 답하면 탈락.', color: C.indigo },
    { icon: 'NF', label: '이상주의형', desc: '가치관 강, 성과 숫자 약. 감정 3분 풀고 구체 결과 없으면 기억 안 남음.', color: C.rose },
    { icon: 'SJ', label: '관리자형', desc: '안정성 강, 창의성 약. "창의적 경험" 질문 대비: 기존 개선 사례로 재정의.', color: C.emerald },
    { icon: 'SP', label: '탐험가형', desc: '순발력 강, 장기계획 약. "5년 후" 질문 멈춤. 미리 대본 외워두기.', color: C.amber },
  ],
});

// ─── 렌더 ─────────────────────────────────
const images = [
  { name: 'parents-mbti-01-hero', svg: heroParents },
  { name: 'parents-mbti-02-matrix', svg: matrixParents },
  { name: 'interview-mbti-01-hero', svg: heroInterview },
  { name: 'interview-mbti-02-types', svg: matrixInterview },
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
