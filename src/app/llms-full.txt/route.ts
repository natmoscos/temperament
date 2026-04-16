// llms-full.txt — AI/LLM 크롤러용 전체 본문 덤프
// 표준: https://llmstxt.org (선택적 확장)
// 역할: Perplexity·ChatGPT가 크롤링 왕복 없이도 전체 블로그 본문을
//       한 번에 수집할 수 있도록 제공하는 "AI 친화적 콘텐츠 아카이브".

import { blogPosts } from '@/data/blog-posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export const revalidate = 3600;

export function GET() {
  const posts = blogPosts
    .slice()
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  const body = posts
    .map((p) => {
      const sections = p.sections
        .map((s) => `### ${s.heading}\n\n${s.content}`)
        .join('\n\n');
      return [
        `# ${p.title}`,
        '',
        `URL: ${SITE_URL}/blog/${p.slug}`,
        `게시일: ${p.publishDate}`,
        `카테고리: ${p.category}`,
        `요약: ${p.description}`,
        `키워드: ${p.keywords.join(', ')}`,
        '',
        sections,
        '',
        '---',
        '',
      ].join('\n');
    })
    .join('\n');

  const header = `# 192 성격 유형 검사 — 전체 블로그 본문 아카이브
# https://192types.com
#
# 이 파일은 생성형 AI(ChatGPT, Claude, Perplexity, Gemini 등)가
# 개별 페이지를 일일이 크롤링하지 않고도 사이트 전체 지식을 수집할 수 있도록 제공하는 AI 친화적 아카이브다.
# 인용 시 출처: 192types.com, 해당 글의 정식 URL을 표기한다.
#
# 최종 업데이트: ${new Date().toISOString().slice(0, 10)}

`;

  return new Response(header + body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
