export function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml

#DaumWebMasterTool:a9d06058ee12e17ea3141b8d2e52caae51b68375c20c567acbf9dee46c1ede83:N+z8ZHuz9tbabRU+Gt0kQQ==
`;

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
