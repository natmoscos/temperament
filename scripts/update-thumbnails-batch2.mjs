// After downloading new profile photos, set thumbnail='/profiles/{slug}.jpg' for all
// rows where the photo file now exists on disk but DB still has NULL thumbnail.

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
const PROFILES_DIR = 'D:/claude/temperament/public/profiles';

// Load all rows with NULL thumbnail
const { data: rows, error } = await supabase
  .from('profiles')
  .select('id, slug, thumbnail')
  .is('thumbnail', null);

if (error) {
  console.error(error);
  process.exit(1);
}

console.log(`Rows with NULL thumbnail: ${rows.length}`);

let ok = 0, skip = 0, fail = 0;
for (const row of rows) {
  const filePath = path.join(PROFILES_DIR, `${row.slug}.jpg`);
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip] ${row.slug} — no photo file on disk`);
    skip++;
    continue;
  }
  const url = `/profiles/${row.slug}.jpg`;
  const { error: upErr } = await supabase
    .from('profiles')
    .update({ thumbnail: url })
    .eq('id', row.id);
  if (upErr) {
    console.log(`  [FAIL] ${row.slug}: ${upErr.message}`);
    fail++;
  } else {
    console.log(`  [OK]   ${row.slug} → ${url}`);
    ok++;
  }
}

console.log(`\nUpdated: ${ok}`);
console.log(`Skipped (no photo file): ${skip}`);
console.log(`Failed: ${fail}`);
