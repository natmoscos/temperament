const https = require('https');

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

// All successfully downloaded profiles
const successfulSlugs = [
  'bill-gates',
  'donald-trump',
  'mark-zuckerberg',
  'sam-altman',
  'lebron-james',
  'lionel-messi',
  'son-heung-min',
  'steve-jobs',
  'lee-jung-jae',
  'song-kang-ho',
  'iu',
  'kim-go-eun',
  'park-seo-joon',
  'newjeans-hanni',
  'bts-rm',
  'bts-suga',
  'blackpink-jennie',
  'blackpink-rose',
  'stray-kids-bangchan',
  'sherlock-holmes',
];

function supabaseRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'qfbjsooglcxterpkbgwa.supabase.co',
      path: path,
      method: method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };
    if (bodyStr) {
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        try {
          resolve({ status: res.statusCode, data: JSON.parse(text) });
        } catch {
          resolve({ status: res.statusCode, data: text });
        }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function updateThumbnails() {
  console.log('Updating Supabase thumbnail paths...\n');

  const results = { success: [], failed: [] };

  for (const slug of successfulSlugs) {
    const thumbnailPath = `/profiles/${slug}.jpg`;

    // Update the character/person record where slug matches
    // Try updating with slug field
    const res = await supabaseRequest(
      'PATCH',
      `/rest/v1/profiles?slug=eq.${slug}`,
      { thumbnail: thumbnailPath }
    );

    if (res.status === 200 || res.status === 204) {
      // Check if anything was updated
      const updated = Array.isArray(res.data) ? res.data.length : (res.status === 204 ? 1 : 0);
      if (updated > 0 || res.status === 204) {
        console.log(`  ✓ Updated ${slug} -> ${thumbnailPath}`);
        results.success.push(slug);
      } else {
        console.log(`  ? No rows updated for ${slug} (may not exist with that slug)`);
        results.failed.push({ slug, reason: 'No rows matched' });
      }
    } else {
      console.log(`  ✗ Failed for ${slug}: HTTP ${res.status}`, typeof res.data === 'string' ? res.data.substring(0, 200) : JSON.stringify(res.data).substring(0, 200));
      results.failed.push({ slug, reason: `HTTP ${res.status}` });
    }
  }

  console.log('\n=== Supabase Update Summary ===');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('Failed:', results.failed);
  }

  return results;
}

// First, let's also check what tables exist and what the schema looks like
async function checkSchema() {
  console.log('Checking Supabase schema...');
  // Try to query characters table
  const res = await supabaseRequest('GET', '/rest/v1/profiles?select=slug,thumbnail&limit=5', null);
  console.log('Profiles table sample:', JSON.stringify(res.data, null, 2).substring(0, 500));
  return res;
}

async function main() {
  await checkSchema();
  console.log('');
  await updateThumbnails();
}

main().catch(console.error);
