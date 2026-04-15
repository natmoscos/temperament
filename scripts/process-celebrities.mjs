import { createRequire } from 'module';
const require = createRequire(import.meta.url);
process.env['npm_package_config_libvips'] = '';
const sharp = require('sharp');

async function run() {
  // Yujin - replace section2 with concert photo
  await sharp('public/blog/ive-yujin-mbti-raw2b.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-yujin-mbti-2.jpg');
  console.log('Yujin section2 replaced (concert)');

  // Gaeul 3 photos
  await sharp('public/blog/ive-gaeul-mbti-raw0.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-gaeul-mbti.jpg');
  console.log('Gaeul thumbnail done');

  await sharp('public/blog/ive-gaeul-mbti-raw1.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-gaeul-mbti-1.jpg');
  console.log('Gaeul section1 done');

  await sharp('public/blog/ive-gaeul-mbti-raw2.jpg')
    .resize(900, null)
    .jpeg({ quality: 90 })
    .toFile('public/blog/ive-gaeul-mbti-2.jpg');
  console.log('Gaeul section2 done');

  // Check sizes
  const files = [
    'public/blog/ive-yujin-mbti-2.jpg',
    'public/blog/ive-gaeul-mbti.jpg',
    'public/blog/ive-gaeul-mbti-1.jpg',
    'public/blog/ive-gaeul-mbti-2.jpg',
  ];
  for (const f of files) {
    const m = await sharp(f).metadata();
    console.log(f.split('/').pop(), m.width + 'x' + m.height);
  }
}
run().catch(console.error);
