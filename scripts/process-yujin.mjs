import { createRequire } from 'module';
const require = createRequire(import.meta.url);
process.env['npm_package_config_libvips'] = '';
const sharp = require('sharp');

async function run() {
  // 가로 900px로만 맞추고 세로는 원본 비율 유지 → 인물 전체가 나옴
  await sharp('public/blog/ive-yujin-mbti-raw0.png')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-yujin-mbti.jpg');
  console.log('thumbnail done');

  await sharp('public/blog/ive-yujin-mbti-raw1.png')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-yujin-mbti-1.jpg');
  console.log('section1 done');

  await sharp('public/blog/ive-yujin-mbti-raw2.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-yujin-mbti-2.jpg');
  console.log('section2 done');
}
run().catch(console.error);
