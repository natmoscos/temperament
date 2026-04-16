// Fix indentation of injected `image:` lines in blog-posts.ts.
// All injected lines currently start at column 0; they should be indented like content lines.

import fs from 'node:fs';

const FILE = 'D:/claude/temperament/src/data/blog-posts.ts';
let text = fs.readFileSync(FILE, 'utf8');

// Pattern: a line that starts with `image: '/blog/` at column 0 (no leading spaces),
// preceded by a line ending with `heading: '...',`. Indent it with 8 spaces.
const fixed = text.replace(/\nimage: '\/blog\/[^']+',/g, (match) => {
  return '\n        ' + match.trim();
});

fs.writeFileSync(FILE, fixed, 'utf8');

const changedCount = (text.match(/\nimage: '\/blog\/[^']+',/g) || []).length;
console.log(`Fixed indentation on ${changedCount} image lines.`);
