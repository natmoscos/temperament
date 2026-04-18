#!/usr/bin/env node
// blog-posts.ts 5000+줄 단일 파일을 src/data/blog-posts/ 디렉토리로 분할.
//
// 전략:
//  1. 타입 정의(AffiliateProduct, AffiliateSection, BlogPost) → types.ts
//  2. blogPosts 배열을 ~25개씩 청크로 나눔 → posts-NN.ts
//  3. index.ts 가 types + 모든 청크를 re-export
//  4. 각 포스트의 원본 주석 헤더(// ── N. ... ──)를 보존
//  5. 분할 후 공백·개행까지 원본과 동일(연결 시 바이트 단위 일치 보장)
//
// 사용:
//   node scripts/split-blog-posts.mjs            # 실제 분할 수행
//   node scripts/split-blog-posts.mjs --dry-run  # 분할 결과만 계산, 쓰지 않음

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_FILE = path.join(ROOT, 'src/data/blog-posts.ts');
const OUT_DIR = path.join(ROOT, 'src/data/blog-posts');

const DRY_RUN = process.argv.includes('--dry-run');
const CHUNK_SIZE = 25;  // 포스트 개수 기준

const src = fs.readFileSync(SRC_FILE, 'utf8');

// ── 1. 배열 시작/끝 위치 찾기 ──────────────────────────
const ARR_DECL = 'export const blogPosts: BlogPost[] = [';
const declIdx = src.indexOf(ARR_DECL);
if (declIdx < 0) throw new Error('blogPosts 배열 선언을 찾지 못함');
// `[` 위치는 `ARR_DECL` 의 마지막 문자 = 배열 리터럴 여는 브래킷.
const arrOpenIdx = declIdx + ARR_DECL.length - 1;
const arrContentStart = arrOpenIdx + 1;

// 배열 끝 `]` 를 찾기 위해 상태 머신으로 깊이 추적
function findMatchingClose(str, openIdx) {
  let depth = 0;
  let inStr = null;
  let inLineComment = false;
  let inBlockComment = false;
  let escape = false;

  for (let i = openIdx; i < str.length; i++) {
    const c = str[i];
    const next = str[i + 1];

    if (escape) { escape = false; continue; }
    if (inStr) {
      if (c === '\\') { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (inLineComment) {
      if (c === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (c === '*' && next === '/') { inBlockComment = false; i++; }
      continue;
    }
    if (c === '/' && next === '/') { inLineComment = true; i++; continue; }
    if (c === '/' && next === '*') { inBlockComment = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('매칭되는 닫는 괄호 없음');
}

const arrCloseIdx = findMatchingClose(src, arrOpenIdx);

const headerText = src.slice(0, declIdx);       // 파일 맨 앞 ~ `export const` 전
const preArrayText = src.slice(declIdx, arrContentStart);  // `export const blogPosts...= [`
const arrayBody = src.slice(arrContentStart, arrCloseIdx);  // `[` ~ `]` 사이
const postArrayText = src.slice(arrCloseIdx);   // `]` 부터 끝까지

// ── 2. 배열 내부를 포스트 단위로 분할 ──────────────────
// 각 포스트 = 하나의 top-level 객체 `{...}`. 그 앞에 붙은 주석/공백도 포함.
function splitPosts(body) {
  const posts = [];
  let depth = 0;
  let inStr = null;
  let inLineComment = false;
  let inBlockComment = false;
  let escape = false;
  let chunkStart = 0;  // 현재 포스트(주석 포함)의 시작 위치

  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    const next = body[i + 1];

    if (escape) { escape = false; continue; }
    if (inStr) {
      if (c === '\\') { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (inLineComment) {
      if (c === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (c === '*' && next === '/') { inBlockComment = false; i++; }
      continue;
    }
    if (c === '/' && next === '/') { inLineComment = true; i++; continue; }
    if (c === '/' && next === '*') { inBlockComment = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }

    if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0 && c === '}') {
        // 포스트 객체 끝. 뒤이어 오는 `,` 와 개행까지 포함하고 끊는다.
        let end = i + 1;
        // 콤마 찾기
        while (end < body.length && body[end] !== ',' && body[end] !== '\n') end++;
        if (body[end] === ',') end++;
        // 개행 1개까지 포함
        if (body[end] === '\n') end++;
        posts.push(body.slice(chunkStart, end));
        chunkStart = end;
      }
    }
  }
  // 배열 끝에 남은 공백/주석이 있으면 마지막 포스트에 붙임
  if (chunkStart < body.length) {
    const tail = body.slice(chunkStart);
    if (posts.length) posts[posts.length - 1] += tail;
    else posts.push(tail);
  }
  return posts;
}

const posts = splitPosts(arrayBody);

// ── 3. 포스트에서 slug 추출 (청크 이름용) ──────────────
function extractSlug(postText) {
  const m = postText.match(/slug:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : '(unknown)';
}

// ── 4. 라운드트립 검증: 분할한 걸 다시 합치면 원본과 같아야 함 ──
const rejoined = headerText + preArrayText + posts.join('') + postArrayText;
if (rejoined !== src) {
  // 디버그: 어디부터 달라졌는지 찾기
  let diffIdx = 0;
  while (diffIdx < src.length && rejoined[diffIdx] === src[diffIdx]) diffIdx++;
  console.error(`❌ 라운드트립 실패. 원본과 ${diffIdx} 바이트부터 다름`);
  console.error('원본 주변:', JSON.stringify(src.slice(diffIdx, diffIdx + 80)));
  console.error('재합본 주변:', JSON.stringify(rejoined.slice(diffIdx, diffIdx + 80)));
  process.exit(1);
}
console.log(`✅ 라운드트립 검증 통과 (포스트 ${posts.length}개, ${src.length} 바이트)`);

// ── 5. 타입 정의만 추출 (headerText에서 interface 블록) ──
// headerText 에는 import + interface 3개 + 주석이 들어있음.
// 그대로 types.ts 로 옮기되, 마지막의 빈 줄 하나만 남긴다.
// 디렉토리 한 단계 깊어지므로 상대경로 '../' 로 조정.
const typesText = headerText
  .replace(/from ['"]\.\/([^'"]+)['"]/g, "from '../$1'")
  .replace(/\s+$/, '\n');

// ── 6. 청크 만들기 ────────────────────────────────────
const chunks = [];
for (let i = 0; i < posts.length; i += CHUNK_SIZE) {
  chunks.push(posts.slice(i, i + CHUNK_SIZE));
}

console.log(`청크 ${chunks.length}개로 분할 (청크당 최대 ${CHUNK_SIZE}개)`);
chunks.forEach((chunk, idx) => {
  const n = String(idx + 1).padStart(2, '0');
  const first = extractSlug(chunk[0]);
  const last = extractSlug(chunk[chunk.length - 1]);
  console.log(`  chunk-${n}.ts  — ${chunk.length}개  (${first} ... ${last})`);
});

if (DRY_RUN) {
  console.log('\n--dry-run: 파일 쓰기 생략');
  process.exit(0);
}

// ── 7. 파일 쓰기 ──────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// 7-a) types.ts
fs.writeFileSync(path.join(OUT_DIR, 'types.ts'), typesText);

// 7-b) chunk-NN.ts
chunks.forEach((chunk, idx) => {
  const n = String(idx + 1).padStart(2, '0');
  const content =
    `import type { BlogPost } from './types';\n\n` +
    `export const chunk${n}: BlogPost[] = [\n` +
    chunk.join('') +
    `];\n`;
  fs.writeFileSync(path.join(OUT_DIR, `chunk-${n}.ts`), content);
});

// 7-c) index.ts
const imports = chunks
  .map((_, idx) => {
    const n = String(idx + 1).padStart(2, '0');
    return `import { chunk${n} } from './chunk-${n}';`;
  })
  .join('\n');
const concat = chunks.map((_, idx) => `...chunk${String(idx + 1).padStart(2, '0')}`).join(', ');

// postArrayText 의 앞부분 `]` 를 제거 — 이미 `blogPosts = [...]` 로 대체할 거라서.
// 남는 건 helper 함수 (getBlogPost, getAllSlugs 등).
const helpersText = postArrayText.replace(/^\s*\]\s*;\s*/, '\n').trimEnd() + '\n';

const indexText =
  `// 블로그 포스트 통합 export. 실제 데이터는 chunk-NN.ts 에 있다.\n` +
  `// 새 글 추가 시: 가장 최근 chunk-NN.ts 에 append, 25개 넘으면 다음 번호로.\n\n` +
  `export * from './types';\n` +
  `import type { BlogPost } from './types';\n` +
  imports + '\n\n' +
  `export const blogPosts: BlogPost[] = [${concat}];\n` +
  helpersText;
fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexText);

// 7-d) 원본 blog-posts.ts 삭제
fs.unlinkSync(SRC_FILE);

console.log(`\n✅ 분할 완료. ${OUT_DIR} 확인.`);
console.log(`  - types.ts (${typesText.length} bytes)`);
console.log(`  - chunk-01.ts ~ chunk-${String(chunks.length).padStart(2, '0')}.ts`);
console.log(`  - index.ts`);
console.log(`  - (삭제됨) blog-posts.ts`);
