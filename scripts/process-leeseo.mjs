import { createRequire } from 'module';
const require = createRequire(import.meta.url);
process.env['npm_package_config_libvips'] = '';
const sharp = require('sharp');

async function run() {
  // Thumbnail: fan meeting (April 2023)
  await sharp('public/blog/ive-leeseo-mbti-raw0.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-leeseo-mbti.jpg');
  console.log('Leeseo thumbnail done (fan meeting)');

  // Section 3: Amsterdam concert (June 2024)
  await sharp('public/blog/ive-leeseo-mbti-raw1.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-leeseo-mbti-1.jpg');
  console.log('Leeseo section3 done (Amsterdam concert)');

  // Section 5: graduation ceremony (January 2026)
  await sharp('public/blog/ive-leeseo-mbti-raw2.png')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-leeseo-mbti-2.jpg');
  console.log('Leeseo section5 done (graduation)');

  const files = [
    'public/blog/ive-leeseo-mbti.jpg',
    'public/blog/ive-leeseo-mbti-1.jpg',
    'public/blog/ive-leeseo-mbti-2.jpg',
  ];
  for (const f of files) {
    const m = await sharp(f).metadata();
    console.log(f.split('/').pop(), m.width + 'x' + m.height);
  }
}
run().catch(console.error);
