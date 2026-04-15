import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Patch env before sharp loads
process.env['npm_package_config_libvips'] = '';
const sharp = require('sharp');

async function run() {
  await sharp('public/blog/iu-mbti-infj-raw.png')
    .resize(900, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88 })
    .toFile('public/blog/iu-mbti-infj.jpg');
  console.log('IU done');

  await sharp('public/blog/son-heungmin-mbti-raw.jpg')
    .resize(900, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88 })
    .toFile('public/blog/son-heungmin-mbti.jpg');
  console.log('Son done');

  await sharp('public/blog/bts-members-mbti-raw.jpg')
    .resize(900, 600, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88 })
    .toFile('public/blog/bts-members-mbti.jpg');
  console.log('BTS done');
}

run().catch(console.error);
