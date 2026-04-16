export function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

  // ── 일반 크롤러 + AI/LLM 크롤러 명시 허용 ──
  // GEO(Generative Engine Optimization): ChatGPT·Claude·Perplexity·Gemini 등이
  // 답변에 인용할 수 있도록 주요 AI 봇 User-agent에 대해 Allow 정책을 명시한다.
  const robotsTxt = `# 192types.com — 성격 유형 + 기질론 통합 검사
# robots.txt · 일반 검색 봇 + AI/LLM 봇 정책

User-agent: *
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# ── AI / LLM 크롤러 (GEO 허용 정책) ──
# OpenAI · ChatGPT 검색
User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: OAI-SearchBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: ChatGPT-User
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Anthropic · Claude
User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: Claude-Web
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: anthropic-ai
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Perplexity
User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: Perplexity-User
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Google Gemini / Bard (AI 학습용)
User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Common Crawl (여러 LLM 학습 데이터)
User-agent: CCBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Cohere / You.com / DuckDuckGo AI
User-agent: cohere-ai
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: YouBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: DuckAssistBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Amazonbot / Applebot-Extended (AI)
User-agent: Amazonbot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: Applebot-Extended
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Meta AI (Llama)
User-agent: Meta-ExternalAgent
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

User-agent: FacebookBot
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Mistral
User-agent: MistralAI-User
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

# Bytedance / 기타
User-agent: Bytespider
Allow: /
Disallow: /api/
Disallow: /result/
Disallow: /quick-result

Sitemap: ${SITE_URL}/sitemap.xml

# LLM 친화적 사이트 요약 (AI 전용 manifest)
# https://llmstxt.org
# ${SITE_URL}/llms.txt

#DaumWebMasterTool:a9d06058ee12e17ea3141b8d2e52caae51b68375c20c567acbf9dee46c1ede83:N+z8ZHuz9tbabRU+Gt0kQQ==
`;

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
