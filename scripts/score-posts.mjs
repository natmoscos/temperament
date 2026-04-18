#!/usr/bin/env node
// 블로그 포스트 "핵심 정리 지수" 계산 — 리라이트 우선순위 자동 정렬.
//
// docs/writing-style.md 의 금지 패턴을 점수화해서 워스트 포스트를 랭킹으로 뽑는다.
//
// 점수 기준 (높을수록 리라이트 필요):
//  +3  금지 표현 ("핵심은", "정리하자면", "결론적으로", "요약하면", "다음과 같다")
//  +2  문장 끝이 "~다." 로 끝나는 비율 (교과서체)
//  +2  리스트 마커 (1. / 1위 / ※) 개수
//  +2  평균 문장 길이 < 25자 (짧은 단문 나열)
//  -1  1인칭 "나 / 내 / 나는" 출현 (스토리텔링 신호)
//  -1  고유명사 앵커 ("민지 / 박서연 / 이준형") 출현
//  -1  구어체 어미 ("~야 / ~거든 / ~잖아 / ~더라고 / ~해봐")
//
// 사용: node scripts/score-posts.mjs [--top N] [--json]
//   --top N   상위 N개만 표시 (default 20)
//   --json    JSON 출력 (다른 스크립트에서 소비용)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/data/blog-posts');

const TOP_N = (() => {
  const i = process.argv.indexOf('--top');
  return i > -1 ? parseInt(process.argv[i + 1], 10) || 20 : 20;
})();
const AS_JSON = process.argv.includes('--json');

// ── 패턴 정의 ──────────────────────────────────
const BANNED_PHRASES = [
  '핵심은',
  '정리하자면',
  '결론적으로',
  '요약하면',
  '다음과 같다',
  '~라고 할 수 있다',
  '~하는 것이 중요',
  '~에 대해 알아보자',
  '즉,',
];

const TEXTBOOK_ENDING = /[가-힣](다|습니다|ㅂ니다)\.\s/g; // "~다." "~습니다." 종결
const LIST_MARKERS = /(?:^|\n)\s*(\d+[.위]|[①-⑨]|※)\s/gm;
const FIRST_PERSON = /(?:^|[^가-힣])(나|내가|내|나는|나도)(?:[^가-힣]|$)/g;
const ANCHOR_NAMES = /(민지|박서연|이준형|서연|우리 팀|우리 회사|내 친구|내 동기)/g;
const SPOKEN_ENDINGS = /(?:야|거든|잖아|더라고|해봐|됐어|했어|그랬어)\.\s/g;

// ── 포스트 파싱 ──────────────────────────────
function extractPosts() {
  const chunkFiles = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /^chunk-\d+\.ts$/.test(f))
    .sort()
    .map((f) => path.join(POSTS_DIR, f));

  const posts = [];
  for (const file of chunkFiles) {
    const src = fs.readFileSync(file, 'utf8');

    // slug 단위로 포스트 추출. 정규식 대신 단순 스캔 — 각 `slug: '...'` 블록 이후
    // 다음 `slug:` 나오기 전까지를 본문으로.
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const matches = [];
    let m;
    while ((m = slugRegex.exec(src)) !== null) {
      matches.push({ slug: m[1], start: m.index });
    }
    for (let i = 0; i < matches.length; i++) {
      const end = matches[i + 1]?.start ?? src.length;
      const body = src.slice(matches[i].start, end);
      // 본문은 content: 필드에 들어있는 문자열만 사용 (heading, title 제외).
      // 단일따옴표·쌍따옴표 문자열을 분리해서 매칭 — 작은따옴표 문자열 안에
      // 쌍따옴표가 있으면 조기 종료하던 버그 수정.
      const contentRegex = /content:\s*(?:'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)")/g;
      let c;
      const contents = [];
      while ((c = contentRegex.exec(body)) !== null) {
        contents.push(c[1] ?? c[2] ?? '');
      }
      const fullText = contents.join('\n\n');
      // title + publishDate 도 수집
      const titleM = body.match(/title:\s*['"]([^'"]+)['"]/);
      const dateM = body.match(/publishDate:\s*['"]([^'"]+)['"]/);
      posts.push({
        slug: matches[i].slug,
        title: titleM ? titleM[1] : matches[i].slug,
        date: dateM ? dateM[1] : '',
        text: fullText,
        file: path.basename(file),
      });
    }
  }
  return posts;
}

// ── 스코어링 ────────────────────────────────
function score(post) {
  const t = post.text;
  if (!t || t.length < 100) return { score: 0, signals: {}, length: t.length };

  let score = 0;
  const signals = {};

  // 금지 표현 카운트
  let bannedCount = 0;
  for (const phrase of BANNED_PHRASES) {
    const count = (t.match(new RegExp(phrase, 'g')) || []).length;
    bannedCount += count;
  }
  signals.banned = bannedCount;
  score += bannedCount * 3;

  // 교과서 종결 비율
  const textbookEndings = (t.match(TEXTBOOK_ENDING) || []).length;
  const spokenEndings = (t.match(SPOKEN_ENDINGS) || []).length;
  const totalEndings = textbookEndings + spokenEndings || 1;
  const textbookRatio = textbookEndings / totalEndings;
  signals.textbookRatio = Number(textbookRatio.toFixed(2));
  score += Math.round(textbookRatio * 10) * 2;

  // 리스트 마커
  const listCount = (t.match(LIST_MARKERS) || []).length;
  signals.listMarkers = listCount;
  score += Math.min(listCount, 10) * 2; // 최대 +20

  // 평균 문장 길이 (대충 마침표 기준)
  const sentences = t.split(/[.!?]\s/).filter((s) => s.trim().length > 0);
  const avgLen = sentences.length ? t.length / sentences.length : 0;
  signals.avgSentLen = Math.round(avgLen);
  if (avgLen > 0 && avgLen < 25) score += 5;

  // 1인칭 — 감점 (좋은 신호)
  const firstPerson = (t.match(FIRST_PERSON) || []).length;
  signals.firstPerson = firstPerson;
  score -= Math.min(firstPerson, 20);

  // 고유명사 앵커 — 감점
  const anchors = (t.match(ANCHOR_NAMES) || []).length;
  signals.anchors = anchors;
  score -= Math.min(anchors, 15);

  // 구어체 어미 — 감점
  signals.spokenEndings = spokenEndings;
  score -= Math.min(spokenEndings, 15);

  return { score, signals, length: t.length };
}

// ── 실행 ───────────────────────────────────
const posts = extractPosts();
const scored = posts
  .map((p) => ({ ...p, ...score(p) }))
  .filter((p) => p.length > 500) // 너무 짧은 포스트 제외
  .sort((a, b) => b.score - a.score);

if (AS_JSON) {
  console.log(JSON.stringify(scored.slice(0, TOP_N), null, 2));
  process.exit(0);
}

console.log(`── 블로그 포스트 "핵심 정리 지수" 랭킹 ──`);
console.log(`총 ${posts.length}개 중 본문 500자 이상 ${scored.length}개 분석\n`);
console.log(`워스트 ${Math.min(TOP_N, scored.length)}개 (점수 높을수록 리라이트 시급):\n`);

console.log(
  '  점수  슬러그                                           날짜       | 금지 교과서비 리스트 문장길이 1인칭 앵커 구어체',
);
console.log('  ' + '─'.repeat(130));
for (const p of scored.slice(0, TOP_N)) {
  const s = p.signals;
  const line =
    `  ${String(p.score).padStart(4)}  ` +
    `${p.slug.slice(0, 48).padEnd(49)} ${p.date.padEnd(10)} | ` +
    `${String(s.banned).padStart(3)}  ${String(s.textbookRatio).padStart(6)}    ` +
    `${String(s.listMarkers).padStart(4)}   ${String(s.avgSentLen).padStart(5)}   ` +
    `${String(s.firstPerson).padStart(4)} ${String(s.anchors).padStart(3)}   ${String(s.spokenEndings).padStart(3)}`;
  console.log(line);
}

console.log('\n해석:');
console.log('  - 점수 > 30: 긴급 리라이트 대상');
console.log('  - 점수 10~30: 부분 리라이트 권장');
console.log('  - 점수 < 10: 현재 톤 괜찮음');
console.log('\n리라이트 가이드는 docs/writing-style.md 참조.');
