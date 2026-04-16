// Inject image refs into blog-posts.ts for the 20 photoless posts.
// For each post:
//   - section[1] gets image: '/blog/{slug}-section-1.jpg'
//   - section[3] (or last section) gets image: '/blog/{slug}-section-2.jpg'
// If the post has only 2–3 sections, use section[0] and section[last].

import fs from 'node:fs';

const FILE = 'D:/claude/temperament/src/data/blog-posts.ts';

const slugs = [
  'mbti-economics-intro',
  'mbti-compatibility-ranking',
  'mbti-love-style-all-types',
  'mbti-career-guide',
  'mbti-vs-temperament-192-types',
  'extraversion-introversion-neuroscience',
  'workplace-mbti-compatibility',
  'temperament-stress-response',
  'enfp-infj-compatibility-analysis',
  'temperament-leadership-styles',
  'mbti-shadow-functions-explained',
  'personality-psychology-history',
  'understanding-child-temperament',
  'personality-type-learning-styles',
  'same-infp-different-temperament',
  'popular-mbti-types-2026-temperament',
  'mbti-burnout-warning-signs',
  'enfp-intj-compatibility-192types',
  'mbti-career-aptitude-temperament',
  'mbti-anger-style-temperament',
];

let text = fs.readFileSync(FILE, 'utf8');

// Find the post block boundaries. Since the file is formatted consistently,
// each post starts with `slug: 'xxx'` line and ends at the start of next post's `{`.
// We'll find each post's sections array and inject image into 2nd and 4th (or last) section.

let totalInjected = 0;
const report = [];

for (const slug of slugs) {
  // Find the post object. Look for "slug: 'xxx'," then find the matching outer "}"
  const slugIdx = text.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) {
    report.push(`[MISS] ${slug}: slug not found`);
    continue;
  }

  // Find the "sections: [" array start
  const sectionsStart = text.indexOf('sections: [', slugIdx);
  if (sectionsStart === -1) {
    report.push(`[MISS] ${slug}: sections: [ not found`);
    continue;
  }

  // Find matching closing `],` for the sections array
  let depth = 0;
  let i = text.indexOf('[', sectionsStart);
  let sectionsEnd = -1;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) { sectionsEnd = i; break; }
    }
    // Skip strings (handle escaped quotes)
    if (ch === "'") {
      i++;
      while (i < text.length) {
        if (text[i] === '\\') { i += 2; continue; }
        if (text[i] === "'") break;
        i++;
      }
    }
    i++;
  }
  if (sectionsEnd === -1) {
    report.push(`[MISS] ${slug}: sections closing ] not found`);
    continue;
  }

  const sectionsText = text.substring(sectionsStart, sectionsEnd + 1);

  // Find section boundaries inside. Each section is `{ heading: ..., content: ..., },`
  // We find top-level `{` within the sections array (depth 1 of bracket stack).
  const sectionRanges = [];
  let sdepth = 0;
  let curStart = -1;
  for (let j = 0; j < sectionsText.length; j++) {
    const ch = sectionsText[j];
    if (ch === "'") {
      j++;
      while (j < sectionsText.length) {
        if (sectionsText[j] === '\\') { j += 2; continue; }
        if (sectionsText[j] === "'") break;
        j++;
      }
      continue;
    }
    if (ch === '{') {
      if (sdepth === 0) curStart = j;
      sdepth++;
    } else if (ch === '}') {
      sdepth--;
      if (sdepth === 0) {
        sectionRanges.push({ start: curStart, end: j });
      }
    }
  }

  if (sectionRanges.length === 0) {
    report.push(`[MISS] ${slug}: no sections found`);
    continue;
  }

  // Choose which sections to inject images into
  const n = sectionRanges.length;
  // Prefer section 1 (index 1) for image 1, section 3 (index 3) for image 2
  let idx1 = n >= 2 ? 1 : 0;
  let idx2 = n >= 5 ? 3 : n - 1;
  if (idx2 === idx1) idx2 = Math.min(n - 1, idx1 + 1);
  if (idx1 === idx2) {
    report.push(`[MISS] ${slug}: only ${n} sections — cannot inject 2 images`);
    continue;
  }

  // Now inject images. Build a new sectionsText by processing ranges in reverse
  // (to not shift indexes).
  let newSectionsText = sectionsText;
  const injections = [
    { idx: idx2, file: `/blog/${slug}-section-2.jpg` },
    { idx: idx1, file: `/blog/${slug}-section-1.jpg` },
  ].sort((a, b) => b.idx - a.idx); // descending

  for (const inj of injections) {
    const r = sectionRanges[inj.idx];
    const body = sectionsText.substring(r.start, r.end + 1);
    // Check if it already has an image field — skip if so
    if (/\bimage:\s*'/.test(body)) continue;
    // Inject `image: 'xxx',` after `heading: '...',`
    // Find the heading line's end: `heading: '...',` — the first closing quote + comma.
    const headingMatch = body.match(/heading:\s*'([^'\\]*(?:\\.[^'\\]*)*)',/);
    if (!headingMatch) {
      report.push(`[WARN] ${slug} sec[${inj.idx}]: no heading match`);
      continue;
    }
    const headingEnd = headingMatch.index + headingMatch[0].length;
    // Determine the indentation of the next line (heading line was probably preceded by indent)
    // Find newline before `heading` to get indent
    const beforeHeading = body.substring(0, headingMatch.index);
    const lastNewline = beforeHeading.lastIndexOf('\n');
    const indent = lastNewline === -1 ? '' : beforeHeading.substring(lastNewline + 1);
    const newBody =
      body.substring(0, headingEnd) +
      `\n${indent}image: '${inj.file}',` +
      body.substring(headingEnd);

    // Replace this range in newSectionsText
    const startInNew = r.start;
    const endInNew = r.end + 1;
    newSectionsText =
      newSectionsText.substring(0, startInNew) +
      newBody +
      newSectionsText.substring(endInNew);

    // The injection changed length — but since we process in descending order, earlier ranges stay valid.
    // BUT sectionRanges.start/end are relative to the ORIGINAL sectionsText. After we've modified
    // newSectionsText, subsequent replacements would still work on newSectionsText but ranges are for original.
    // SOLUTION: track offset per injection.
  }

  // To avoid offset issues, let's instead re-walk: process one injection, re-parse, process next.
  // Simpler: rebuild from scratch using sorted injection application with offset tracking.
  // Redo with cumulative offset:
  newSectionsText = sectionsText;
  let offset = 0;
  const ascendingInj = [
    { idx: idx1, file: `/blog/${slug}-section-1.jpg` },
    { idx: idx2, file: `/blog/${slug}-section-2.jpg` },
  ];
  for (const inj of ascendingInj) {
    const r = sectionRanges[inj.idx];
    const origBody = sectionsText.substring(r.start, r.end + 1);
    if (/\bimage:\s*'/.test(origBody)) continue;
    const headingMatch = origBody.match(/heading:\s*'([^'\\]*(?:\\.[^'\\]*)*)',/);
    if (!headingMatch) continue;
    const headingEnd = headingMatch.index + headingMatch[0].length;
    const beforeHeading = origBody.substring(0, headingMatch.index);
    const lastNewline = beforeHeading.lastIndexOf('\n');
    const indent = lastNewline === -1 ? '' : beforeHeading.substring(lastNewline + 1);
    const insert = `\n${indent}image: '${inj.file}',`;

    const insertPosInNew = r.start + offset + headingEnd;
    newSectionsText =
      newSectionsText.substring(0, insertPosInNew) +
      insert +
      newSectionsText.substring(insertPosInNew);
    offset += insert.length;
  }

  // Substitute back into full file
  text =
    text.substring(0, sectionsStart) +
    newSectionsText +
    text.substring(sectionsEnd + 1);

  totalInjected++;
  report.push(`[OK]   ${slug}: ${n} sections, injected at [${idx1}, ${idx2}]`);
}

fs.writeFileSync(FILE, text, 'utf8');
console.log(report.join('\n'));
console.log(`\nTotal injected: ${totalInjected}/${slugs.length}`);
