// Update profiles.thumbnail to point to the new 1:1 cropped images
// under /profiles/{slug}.jpg (instead of the old 4:3 /blog/*-mbti.jpg).
//
// Usage:
//   node scripts/update-profile-thumbnails.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const SLUGS = [
  'taylor-swift',
  'bad-bunny',
  'zendaya',
  'dwayne-johnson',
  'cristiano-ronaldo',
  'lady-gaga',
  'elon-musk',
  'mrbeast',
  'billie-eilish',
  'timothee-chalamet',
  'friedrich-nietzsche',
  'socrates',
  'hippocrates',
];

let updated = 0;
let failed = 0;

for (const slug of SLUGS) {
  const newPath = `/profiles/${slug}.jpg`;

  const { data, error } = await supabase
    .from('profiles')
    .update({ thumbnail: newPath })
    .eq('slug', slug)
    .select('slug, thumbnail');

  if (error) {
    console.error(`❌ ${slug}:`, error.message);
    failed++;
    continue;
  }
  if (!data || data.length === 0) {
    console.warn(`⚠️  ${slug}: no matching row`);
    failed++;
    continue;
  }
  console.log(`✅ ${slug.padEnd(20)} → ${data[0].thumbnail}`);
  updated++;
}

console.log(`\nDone. ${updated} updated, ${failed} failed.`);
