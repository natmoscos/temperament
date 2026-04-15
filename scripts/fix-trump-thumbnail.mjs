// One-off: remove the wrong placeholder thumbnail from Donald Trump's profile.
// The initial seed used `/blog/socrates-mbti.jpg` as a placeholder, which
// caused the detail page to show a photo of Socrates.
//
// Usage:
//   node scripts/fix-trump-thumbnail.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const { data, error } = await supabase
  .from('profiles')
  .update({ thumbnail: null })
  .eq('slug', 'donald-trump')
  .select();

if (error) {
  console.error('❌ Failed:', error);
  process.exit(1);
}

console.log('✅ Updated:', data);
