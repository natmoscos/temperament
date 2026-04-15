/**
 * 사용법:
 * 1. 사용자가 제공한 상남자 vs 하남자 이미지를 아래 경로에 저장
 *    → D:/claude/temperament/public/blog/intj-sang-vs-ha-source.jpg
 * 2. 이 스크립트 실행: D:/node.exe scripts/split-sang-vs-ha-image.mjs
 *
 * 결과: 3개 파일 생성
 *   - intj-sang-vs-ha.jpg         (썸네일용 전체 이미지 900×600)
 *   - intj-sang-vs-ha-section-1.jpg (왼쪽 절반 크롭 — 상남자 일러스트)
 *   - intj-sang-vs-ha-section-2.jpg (오른쪽 절반 크롭 — 하남자 사진)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../public/blog');
const SOURCE = path.join(BLOG_DIR, 'intj-sang-vs-ha-source.jpg');

if (!fs.existsSync(SOURCE)) {
  console.error('❌ 소스 이미지가 없습니다!');
  console.error('   다음 경로에 이미지를 저장해주세요:');
  console.error(`   ${SOURCE}`);
  process.exit(1);
}

async function main() {
  console.log('🖼️  intj-sang-vs-ha 블로그 이미지 처리 시작\n');

  const meta = await sharp(SOURCE).metadata();
  const { width, height } = meta;
  console.log(`   원본 이미지: ${width}×${height}px`);

  const halfW = Math.floor(width / 2);

  // 1. 썸네일 — 전체 이미지 900×600
  await sharp(SOURCE)
    .resize(900, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(path.join(BLOG_DIR, 'intj-sang-vs-ha.jpg'));
  console.log('   ✓ intj-sang-vs-ha.jpg (썸네일 900×600)');

  // 2. Section 1 — 왼쪽 절반 (상남자 일러스트)
  await sharp(SOURCE)
    .extract({ left: 0, top: 0, width: halfW, height })
    .resize(900, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(path.join(BLOG_DIR, 'intj-sang-vs-ha-section-1.jpg'));
  console.log('   ✓ intj-sang-vs-ha-section-1.jpg (왼쪽 상남자 900×600)');

  // 3. Section 2 — 오른쪽 절반 (하남자 사진)
  await sharp(SOURCE)
    .extract({ left: halfW, top: 0, width: width - halfW, height })
    .resize(900, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(path.join(BLOG_DIR, 'intj-sang-vs-ha-section-2.jpg'));
  console.log('   ✓ intj-sang-vs-ha-section-2.jpg (오른쪽 하남자 900×600)');

  console.log('\n✅ 완료! 3개 이미지 생성됨');
  ['intj-sang-vs-ha.jpg', 'intj-sang-vs-ha-section-1.jpg', 'intj-sang-vs-ha-section-2.jpg'].forEach(f => {
    const p = path.join(BLOG_DIR, f);
    console.log(`   /public/blog/${f} — ${(fs.statSync(p).size / 1024).toFixed(0)} KB`);
  });
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
