#!/usr/bin/env node
// 블로그 포스트 기본 무결성 검사.
//
// 목적: 배포 전에 "자기 자신도 알아차렸어야 할 기본 실수"를 잡는다.
//  - 렌더링 안 된 마크다운 볼드 (**text**)
//  - Unsplash 등 외부 스톡 URL 잔존
//  - public/ 에 실제로 없는 이미지 경로
//  - 제휴 URL 도메인 화이트리스트 위반
//  - SVG 파일의 이스케이프 안 된 `&`, `<` (엔티티 외)
//
// 사용:
//   node scripts/check-posts.mjs            # 전체 검사, 에러 있으면 exit 1
//   node scripts/check-posts.mjs --warn     # 경고만 출력, exit 0
//
// CI / pre-commit 훅에 바로 연결 가능.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WARN_ONLY = process.argv.includes('--warn');

// ── 검사 대상 파일 ────────────────────────────────────
// blog-posts 는 src/data/blog-posts/chunk-*.ts 로 분할됨 (2026-04-18~).
const POSTS_DIR = path.join(ROOT, 'src/data/blog-posts');
const PUBLIC_DIR = path.join(ROOT, 'public');

const POSTS_FILES = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR)
      .filter((f) => /^chunk-\d+\.ts$/.test(f))
      .sort()
      .map((f) => path.join(POSTS_DIR, f))
  : [];

if (POSTS_FILES.length === 0) {
  console.error('❌ src/data/blog-posts/chunk-*.ts 파일을 찾지 못함');
  process.exit(1);
}

// ── 제휴 URL 허용 도메인 ──────────────────────────────
const AFFILIATE_WHITELIST = [
  'link.coupang.com',   // 쿠팡파트너스
  'oy.run',             // 올리브영 단축 도메인
  'toss.me',            // 토스 쉐어링크
  'tossshopping.com',   // 토스쇼핑
  'tosss.kr',
];

// ── 수집된 이슈 ──────────────────────────────────────
/** @type {Array<{level:'error'|'warn',msg:string,file:string,line?:number}>} */
const issues = [];

function err(msg, file, line) {
  issues.push({ level: 'error', msg, file, line });
}
function warn(msg, file, line) {
  issues.push({ level: 'warn', msg, file, line });
}

// ── 1. 파일별 스캔 ────────────────────────────────────
let totalLines = 0;
const seenImagePaths = new Set();

for (const POSTS_FILE of POSTS_FILES) {
  const src = fs.readFileSync(POSTS_FILE, 'utf8');
  const lines = src.split('\n');
  totalLines += lines.length;

  // 1-a) 불균형 마크다운 볼드 (짝이 안 맞는 `**`)
  lines.forEach((line, i) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;
    const stripped = line.replace(/\/\*\*/g, '').replace(/\*\//g, '');
    const count = (stripped.match(/\*\*/g) || []).length;
    if (count % 2 === 1) {
      err(
        `불균형한 \`**\` ${count}개 — 짝 안 맞음, 렌더 시 본문에 \`**\` 노출됨`,
        POSTS_FILE,
        i + 1,
      );
    }
  });

  // 1-b) Unsplash / 외부 스톡 URL
  const STOCK_PATTERNS = [
    /unsplash\.com/gi,
    /images\.unsplash/gi,
    /pexels\.com/gi,
    /pixabay\.com/gi,
    /shutterstock/gi,
  ];
  lines.forEach((line, i) => {
    for (const re of STOCK_PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        err(`스톡 이미지 URL 감지 (${re.source}) — 커스텀 SVG로 교체 필요.`, POSTS_FILE, i + 1);
      }
    }
  });

  // 1-c) 이미지 경로 실존 여부
  const IMG_PATH_RE = /["'`](\/blog\/[a-zA-Z0-9_\-/.]+\.(?:webp|jpg|jpeg|png|svg|gif))["'`]/g;
  let match;
  while ((match = IMG_PATH_RE.exec(src)) !== null) {
    const rel = match[1];
    if (seenImagePaths.has(rel)) continue;
    seenImagePaths.add(rel);
    const absPath = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(absPath)) {
      const upto = src.slice(0, match.index);
      const line = upto.split('\n').length;
      err(`이미지 파일 없음: public${rel}`, POSTS_FILE, line);
    }
  }

  // 1-d) 제휴 URL 도메인 화이트리스트
  const URL_RE = /url:\s*["'`](https?:\/\/[^"'`\s]+)["'`]/g;
  while ((match = URL_RE.exec(src)) !== null) {
    try {
      const u = new URL(match[1]);
      const ok = AFFILIATE_WHITELIST.some(
        (dom) => u.hostname === dom || u.hostname.endsWith('.' + dom),
      );
      if (!ok) {
        const upto = src.slice(0, match.index);
        const line = upto.split('\n').length;
        warn(`제휴 URL 도메인 확인 필요: ${u.hostname}`, POSTS_FILE, line);
      }
    } catch {
      // ignore
    }
  }
}

// ── 2. SVG 파일 엔티티 검사 ────────────────────────
const SVG_DIR = path.join(PUBLIC_DIR, 'blog');
function walkSvgs(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) out.push(...walkSvgs(p));
    else if (name.endsWith('.svg')) out.push(p);
  }
  return out;
}
const svgs = walkSvgs(SVG_DIR);
for (const svg of svgs) {
  const content = fs.readFileSync(svg, 'utf8');
  const BAD_AMP = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g;
  const m = content.match(BAD_AMP);
  if (m) {
    err(`SVG 내부 이스케이프 안 된 '&' ${m.length}개 — &amp; 로 변환 필요`, svg);
  }
}

// ── 결과 출력 ────────────────────────────────────
const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warn');

function formatIssue(it) {
  const rel = path.relative(ROOT, it.file);
  const loc = it.line ? `${rel}:${it.line}` : rel;
  return `  [${it.level.toUpperCase()}] ${loc}  ${it.msg}`;
}

console.log('── 블로그 포스트 무결성 검사 ──');
console.log(`청크: ${POSTS_FILES.length}개 (총 ${totalLines}줄)`);
console.log(`이미지 경로 확인: ${seenImagePaths.size}개`);
console.log(`SVG 스캔: ${svgs.length}개`);
console.log();

if (errors.length) {
  console.log(`🔴 에러 ${errors.length}개:`);
  errors.forEach((it) => console.log(formatIssue(it)));
  console.log();
}
if (warnings.length) {
  console.log(`🟡 경고 ${warnings.length}개:`);
  warnings.slice(0, 50).forEach((it) => console.log(formatIssue(it)));
  if (warnings.length > 50) console.log(`  ... 외 ${warnings.length - 50}개 생략`);
  console.log();
}
if (!errors.length && !warnings.length) {
  console.log('✅ 문제 없음');
}

if (errors.length && !WARN_ONLY) {
  process.exit(1);
}
