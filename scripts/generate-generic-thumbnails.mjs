// Generate generic hero thumbnails for posts that lack one.
// Output: public/blog/thumb-{slug}.{svg,webp}

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa', white: '#ffffff',
  text: '#171717', textSoft: '#374151', textMuted: '#6b7280', textFaint: '#9ca3af',
  border: '#e5e7eb',
};

const CATEGORY = {
  compatibility: { main: '#e11d48', soft: '#fff1f2', bg1: '#fce7f3', bg2: '#fdf2f8', emoji: ['💕', '👫', '✨', '💖'], label: 'COMPATIBILITY' },
  mbti: { main: '#4338ca', soft: '#e0e7ff', bg1: '#e0e7ff', bg2: '#eef2ff', emoji: ['🧠', '🔮', '💡', '🎯'], label: 'PERSONALITY' },
  temperament: { main: '#b45309', soft: '#fef3c7', bg1: '#fef3c7', bg2: '#fffbeb', emoji: ['🏛', '📜', '🎭', '🌿'], label: 'TEMPERAMENT' },
  career: { main: '#047857', soft: '#d1fae5', bg1: '#d1fae5', bg2: '#ecfdf5', emoji: ['💼', '📈', '🎯', '🚀'], label: 'CAREER' },
  guide: { main: '#6d28d9', soft: '#ede9fe', bg1: '#ede9fe', bg2: '#f5f3ff', emoji: ['📚', '💡', '🎓', '✨'], label: 'GUIDE' },
  science: { main: '#0e7490', soft: '#cffafe', bg1: '#cffafe', bg2: '#ecfeff', emoji: ['🔬', '🧬', '🧪', '📊'], label: 'SCIENCE' },
  psychology: { main: '#be123c', soft: '#fce7f3', bg1: '#fce7f3', bg2: '#fdf2f8', emoji: ['🧘', '💭', '🌊', '🫧'], label: 'PSYCHOLOGY' },
  'mbti-economics': { main: '#a16207', soft: '#fef3c7', bg1: '#fef3c7', bg2: '#fffbeb', emoji: ['💰', '📈', '💎', '🏦'], label: 'ECONOMICS' },
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner, footer = '192types.co.kr') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">${footer}</text>
</svg>`;

// Split a title into 1~2 lines for dramatic typography.
// If title has " — " or " · ", split into two lines.
function splitTitle(title) {
  // Strip trailing site title or colons
  const t = title.trim();
  // Split by em dash, dash, middle dot, or colon priority
  const separators = [' — ', ' – ', ' - ', ' · ', ': ', ', '];
  for (const sep of separators) {
    if (t.includes(sep)) {
      const idx = t.indexOf(sep);
      const a = t.slice(0, idx).trim();
      const b = t.slice(idx + sep.length).trim();
      if (a.length > 0 && b.length > 0 && a.length < 30 && b.length < 40) {
        return { top: a, bottom: b };
      }
    }
  }
  // No split, break at halfway on space
  if (t.length > 18) {
    const mid = Math.floor(t.length / 2);
    let splitAt = t.indexOf(' ', mid);
    if (splitAt < 0) splitAt = t.lastIndexOf(' ', mid);
    if (splitAt > 0) {
      return { top: t.slice(0, splitAt).trim(), bottom: t.slice(splitAt).trim() };
    }
  }
  return { top: t, bottom: '' };
}

function makeThumb({ slug, title, category, subtitle }) {
  const cat = CATEGORY[category] ?? CATEGORY.mbti;
  const { top, bottom } = splitTitle(title);

  // Adjust font size based on text length
  const topFontSize = top.length > 20 ? 62 : top.length > 15 ? 72 : 82;
  const bottomFontSize = bottom.length > 24 ? 32 : bottom.length > 18 ? 38 : 42;

  return wrap(`
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cat.bg1}"/>
      <stop offset="100%" stop-color="${cat.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>

  <!-- Decorative emojis in background -->
  <text x="180" y="200" font-size="60" opacity="0.18">${cat.emoji[0]}</text>
  <text x="960" y="180" font-size="60" opacity="0.18">${cat.emoji[1]}</text>
  <text x="200" y="760" font-size="60" opacity="0.18">${cat.emoji[2]}</text>
  <text x="940" y="740" font-size="60" opacity="0.18">${cat.emoji[3]}</text>

  <!-- Center white card -->
  <rect x="90" y="220" width="1020" height="460" rx="36" fill="${C.white}" stroke="${cat.main}" stroke-width="4" opacity="0.97"/>

  <!-- Brand label -->
  <text x="600" y="300" text-anchor="middle" font-size="28" font-weight="700" fill="${cat.main}" letter-spacing="6">192TYPES · ${cat.label}</text>

  <!-- Title line 1 -->
  <text x="600" y="${bottom ? 420 : 470}" text-anchor="middle" font-size="${topFontSize}" font-weight="900" fill="${C.text}">${escapeXml(top)}</text>

  ${bottom ? `
  <!-- Title line 2 -->
  <text x="600" y="510" text-anchor="middle" font-size="${bottomFontSize}" font-weight="800" fill="${cat.main}">${escapeXml(bottom)}</text>
  ` : ''}

  <!-- Subtitle -->
  ${subtitle ? `
  <line x1="380" y1="${bottom ? 560 : 540}" x2="820" y2="${bottom ? 560 : 540}" stroke="${cat.main}" stroke-width="2" opacity="0.35"/>
  <text x="600" y="${bottom ? 610 : 590}" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">${escapeXml(subtitle)}</text>
  ` : ''}
  `);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Posts without thumbnails — map slug → category + optional subtitle override
const posts = [
  { slug: 'mbti-economics-intro', title: 'MBTI 경제학', category: 'mbti-economics', subtitle: '16유형이 돈을 다루는 방식' },
  { slug: 'mbti-compatibility-ranking', title: '성격 유형 궁합 순위 TOP 10', category: 'compatibility', subtitle: '인지기능 분석 · 최고의 조합' },
  { slug: 'mbti-love-style-all-types', title: '16유형별 연애 스타일', category: 'compatibility', subtitle: '16가지 사랑의 방식' },
  { slug: 'mbti-career-guide', title: '16유형별 직업 추천', category: 'career', subtitle: '나에게 맞는 커리어 찾기' },
  { slug: 'mbti-vs-temperament-192-types', title: '왜 192유형이 필요한가', category: 'guide', subtitle: '16유형으로는 부족한 이유' },
  { slug: 'extraversion-introversion-neuroscience', title: '외향성 vs 내향성 신경과학', category: 'science', subtitle: '뇌가 결정하는 성격의 방향' },
  { slug: 'workplace-mbti-compatibility', title: '직장 궁합 조합', category: 'compatibility', subtitle: '인지기능 기반 팀워크의 비밀' },
  { slug: 'temperament-stress-response', title: '기질별 스트레스 반응', category: 'temperament', subtitle: '네 가지 기질의 대처 방식' },
  { slug: 'enfp-infj-compatibility-analysis', title: 'ENFP × INFJ 궁합', category: 'compatibility', subtitle: '진짜 천생연분인지 심층 분석' },
  { slug: 'temperament-leadership-styles', title: '4기질 리더십 스타일', category: 'temperament', subtitle: '기질이 결정하는 리더의 방식' },
  { slug: 'mbti-shadow-functions-explained', title: '그림자 기능이란?', category: 'science', subtitle: '8기능 모델 완전 해설' },
  { slug: 'personality-psychology-history', title: '성격 심리학의 역사', category: 'temperament', subtitle: '히포크라테스 → 현대 2,400년' },
  { slug: 'understanding-child-temperament', title: '자녀 기질 이해 가이드', category: 'guide', subtitle: 'Chess & Thomas 9가지 차원' },
  { slug: 'personality-type-learning-styles', title: '유형별 학습 방법', category: 'guide', subtitle: '인지기능 × 학습 스타일' },
  { slug: 'same-infp-different-temperament', title: '같은 INFP 다른 이유', category: 'mbti', subtitle: '192유형으로 보는 진짜 차이' },
  { slug: 'popular-mbti-types-2026-temperament', title: '2026 인기 MBTI TOP 5', category: 'mbti', subtitle: '기질별 숨겨진 매력' },
  { slug: 'mbti-burnout-warning-signs', title: '번아웃 경고 신호', category: 'psychology', subtitle: '유형별 기질별 회복 방법' },
  { slug: 'enfp-intj-compatibility-192types', title: 'ENFP × INTJ 궁합', category: 'compatibility', subtitle: '192유형으로 심층 분석' },
  { slug: 'mbti-career-aptitude-temperament', title: '유형별 직업 적성', category: 'career', subtitle: '기질이 바꾸는 커리어 방향' },
  { slug: 'mbti-anger-style-temperament', title: '유형별 분노 스타일', category: 'psychology', subtitle: '기질이 바꾸는 16가지 분노' },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const p of posts) {
    const name = `thumb-${p.slug}`;
    const svg = makeThumb(p);
    const svgPath = `${OUT_DIR}/${name}.svg`;
    const webpPath = `${OUT_DIR}/${name}.webp`;
    fs.writeFileSync(svgPath, svg, 'utf-8');
    await sharp(Buffer.from(svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(webpPath);
    const svgKB = (fs.statSync(svgPath).size / 1024).toFixed(1);
    const webpKB = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${name}  svg=${svgKB}KB  webp=${webpKB}KB`);
  }
  console.log(`\n✅ Generated ${posts.length} thumbnails → ${OUT_DIR}`);
}

run();
