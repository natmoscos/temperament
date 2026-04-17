import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { getBlogPostBySlug, getAllSlugsFromNotion } from '@/lib/notion';
import AdPlaceholder from '@/components/AdPlaceholder';
import JsonLd from '@/components/JsonLd';
import BlogShareButtons from '@/components/BlogShareButtons';
import AffiliateSectionBlock from '@/components/AffiliateSection';

// 1시간마다 자동 갱신 (Notion 콘텐츠 반영)
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

// 정적 경로 생성 (빌드 시 로컬 + Notion 글 모두 생성)
export async function generateStaticParams() {
  const slugs = await getAllSlugsFromNotion();
  return slugs.map((slug) => ({ slug }));
}

// SEO 메타데이터
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: '글을 찾을 수 없습니다' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://192types.com';
  // 썸네일이 있으면 실제 사진 사용, 없으면 사이트 기본 OG 이미지
  const ogImage = post.thumbnail
    ? `${siteUrl}${post.thumbnail}`
    : `${siteUrl}/og-default.jpg`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishDate,
      images: [{ url: ogImage, width: post.thumbnail ? 900 : 1200, height: post.thumbnail ? 600 : 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

// 인라인 마크다운 링크 파서: [text](/path) → <Link>, 외부 URL은 <a target="_blank">
// Pillar-Cluster 내부 링크용. 개행과 공백은 whitespace-pre-line 이 처리.
function renderContentWithLinks(content: string): React.ReactNode {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(content.slice(lastIndex, match.index));
    }
    const [, text, href] = match;
    const isInternal = href.startsWith('/');
    nodes.push(
      isInternal ? (
        <Link
          key={`l-${key++}`}
          href={href}
          className="text-indigo-600 font-semibold underline decoration-indigo-200 decoration-2 underline-offset-2 hover:text-indigo-800 hover:decoration-indigo-500 transition"
        >
          {text}
        </Link>
      ) : (
        <a
          key={`l-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold underline decoration-indigo-200 decoration-2 underline-offset-2 hover:text-indigo-800 transition"
        >
          {text}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) nodes.push(content.slice(lastIndex));
  return nodes.length > 0 ? nodes : content;
}

// ── GEO 보조: 글마다 자동 TL;DR + FAQ 생성 ──
// AI 검색(ChatGPT, Perplexity, Claude)이 답변에 인용할 수 있는
// "직접 답변(direct answer)" 블록을 자동으로 만들어준다.
// 글 작성자가 별도 데이터를 추가하지 않아도 description + 첫 섹션 + 키워드에서 추출.

function buildTldr(post: { title: string; description: string; sections: { heading: string; content: string }[]; keywords: string[] }): string[] {
  const bullets: string[] = [];
  bullets.push(post.description);

  // 첫 섹션 content의 가장 정보 밀도 높은 문장 1개 추출
  const firstSection = post.sections[0];
  if (firstSection) {
    const sentences = firstSection.content.split(/(?<=[.!?。…])\s+/);
    // 숫자/랭킹/192/MBTI 등이 들어간 문장 우선
    const info = sentences.find((s) =>
      /(\d|MBTI|유형|192|기질|공식|랭킹|차이|이유|핵심|결과)/i.test(s) && s.length < 180 && s.length > 30,
    );
    if (info) bullets.push(info.trim());
  }

  // 마지막 섹션에서 액션/체크리스트 문장 추출
  const lastSection = post.sections[post.sections.length - 1];
  if (lastSection && lastSection !== firstSection) {
    const sentences = lastSection.content.split(/(?<=[.!?。…])\s+/);
    const action = sentences.find((s) =>
      /(시작|해봐|확인|체크|실행|루틴|전략|해결|추천|팁)/i.test(s) && s.length < 160 && s.length > 30,
    );
    if (action) bullets.push(action.trim());
  }

  return bullets.filter(Boolean).slice(0, 3);
}

function buildFaqs(post: { title: string; description: string; sections: { heading: string; content: string }[]; keywords: string[]; relatedTypes?: string[] }): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  // Q1: 이 글이 뭐야? — description 활용
  faqs.push({
    q: `${post.title}`,
    a: post.description,
  });

  // Q2: 섹션 2개를 Q&A로 변환 (heading → question, content 첫 문장 → answer)
  post.sections.slice(0, 4).forEach((s) => {
    const firstSentence = s.content.split(/(?<=[.!?。…])\s+/)[0] ?? s.content;
    const answer = firstSentence.length > 320 ? `${firstSentence.slice(0, 300)}…` : firstSentence;
    const question = s.heading.length > 60 ? `${s.heading.slice(0, 58)}…` : s.heading;
    // heading이 이미 문장형이면 그대로, 아니면 "~란?" 형태 변환
    const isQuestion = /[\?？]$/.test(question) || /\b(이란|는 뭐|가 뭐|의 이유|의 차이|의 핵심)\b/.test(question);
    faqs.push({
      q: isQuestion ? question : `${question}란?`,
      a: answer,
    });
  });

  // Q3 (fixed): 검사 방법
  faqs.push({
    q: '192가지 성격 유형 검사는 어떻게 받나요?',
    a: '192types.com에서 100문항 정밀 검사 또는 15문항 빠른 검사를 무료로 받을 수 있습니다. MBTI 16유형 × 히포크라테스 4기질 × 3단계 강도를 결합해 192가지 조합으로 성격을 분류하며, 회원가입 없이 바로 검사 가능합니다.',
  });

  return faqs.slice(0, 6);
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  compatibility: { label: '궁합', color: 'bg-pink-100 text-pink-700' },
  mbti: { label: '성격 유형', color: 'bg-indigo-100 text-indigo-700' },
  temperament: { label: '기질론', color: 'bg-amber-100 text-amber-700' },
  career: { label: '커리어', color: 'bg-emerald-100 text-emerald-700' },
  guide: { label: '가이드', color: 'bg-purple-100 text-purple-700' },
  psychology: { label: '심리분석', color: 'bg-rose-100 text-rose-700' },
  science: { label: '과학', color: 'bg-cyan-100 text-cyan-700' },
  'mbti-economics': { label: 'MBTI 경제학', color: 'bg-yellow-100 text-yellow-800' },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const cat = categoryLabels[post.category] ?? { label: post.category, color: 'bg-gray-100 text-gray-700' };

  // 관련 글 (같은 카테고리, 현재 글 제외, 최대 3개)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

  const tldr = buildTldr(post);
  const faqs = buildFaqs(post);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      {/* ── GEO: Article schema 확장 (articleBody·wordCount·speakable·Person author) ── */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: {
          '@type': 'Person',
          name: '박서연',
          description:
            'ENFP-다혈질, 24세 패션 스타트업 MD. 친구 민지(ISFJ-점액질, 대학병원 간호사)와 함께 192가지 성격 유형을 일상 언어로 풀어쓴다.',
          worksFor: {
            '@type': 'Organization',
            name: '192 성격 유형 검사',
            url: SITE_URL,
          },
          knowsAbout: [
            'MBTI',
            '히포크라테스 기질론',
            '성격 유형',
            '인지기능',
            '연애 심리',
            '직장 심리',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: '192 성격 유형 검사',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/og-default.jpg`,
            width: 1200,
            height: 630,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${slug}`,
        },
        image: post.thumbnail
          ? [`${SITE_URL}${post.thumbnail}`]
          : [`${SITE_URL}/og-default.jpg`],
        articleSection: cat.label,
        keywords: post.keywords.join(', '),
        articleBody: post.sections.map((s) => `${s.heading}\n${s.content}`).join('\n\n'),
        wordCount: post.sections.reduce((sum, s) => sum + s.content.length, 0),
        inLanguage: 'ko-KR',
        isAccessibleForFree: true,
        // AI 음성 요약 / 보조 기술이 우선 읽어야 하는 영역 지정
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'article > header p', '.tldr'],
        },
        about: (post.relatedTypes ?? []).map((t) => ({
          '@type': 'Thing',
          name: `MBTI ${t} 유형`,
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
        ],
      }} />
      {/* ── GEO: FAQPage schema (AI 답변 인용 최적화) ── */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: buildFaqs(post).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }} />
      <article className="w-full max-w-2xl mx-auto">

        {/* 네비게이션 */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-400 hover:text-indigo-500 transition">홈</Link>
          <span className="text-gray-300">/</span>
          <Link href="/blog" className="text-gray-400 hover:text-indigo-500 transition">블로그</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 truncate">{post.title.slice(0, 20)}...</span>
        </nav>

        {/* 헤더 */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${cat.color}`}>
              {cat.label}
            </span>
            <time className="text-xs text-gray-400">{post.publishDate}</time>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4">
            <BlogShareButtons title={post.title} description={post.description} slug={slug} />
          </div>
        </header>

        {/* 썸네일 히어로 이미지 — 원본 비율 유지 (크롭 없음, 얼굴 전체 표시) */}
        {post.thumbnail && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto rounded-2xl"
              loading="eager"
            />
          </div>
        )}

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.keywords.map((kw) => (
            <span key={kw} className="text-xs text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
              #{kw}
            </span>
          ))}
        </div>

        {/* ── GEO: TL;DR 직접 답변 블록 (AI가 요약 인용하는 구간) ── */}
        {tldr.length > 0 && (
          <aside
            className="tldr mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 sm:p-6"
            aria-label="글 핵심 요약"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📌</span>
              <h2 className="text-sm font-black text-indigo-800 tracking-wide">
                한 눈에 보기 (TL;DR)
              </h2>
            </div>
            <ul className="space-y-2 text-[14px] leading-relaxed text-gray-700">
              {tldr.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 text-indigo-500 font-bold">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Pillar 배너 — 여자/남자 특징 cluster 글 상단에 노출 */}
        {(slug.endsWith('-women-characteristics') || slug.endsWith('-men-characteristics')) && (
          <div className="mb-8 bg-gradient-to-br from-indigo-50 via-rose-50 to-sky-50 border border-indigo-100 rounded-2xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">📌</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-indigo-700 mb-1 tracking-wide">
                  PILLAR 가이드 · 16유형 × 여자·남자 종합
                </p>
                <Link
                  href="/blog/mbti-women-men-characteristics-guide"
                  className="block text-[15px] font-bold text-gray-800 hover:text-indigo-600 transition leading-snug"
                >
                  MBTI 여자·남자 특징 총정리 — 16유형 × 성별 32가지 한눈에 보기 →
                </Link>
                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                  이 글은 상위 가이드의 유형별 파트야. 다른 유형과 비교하거나 4기질 관점에서 보려면 위 링크로!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 본문 섹션 */}
        <div className="space-y-8">
          {post.sections.map((section, idx) => (
            <div key={idx}>
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 leading-snug">
                  {section.heading}
                </h2>
                {section.image && (
                  <div className="relative w-full rounded-xl overflow-hidden my-4 bg-gray-100">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-auto rounded-xl"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="text-gray-600 text-[15px] leading-[1.9] whitespace-pre-line">
                  {renderContentWithLinks(section.content)}
                </div>
              </section>

              {/* 2번째, 4번째 섹션 뒤에 광고 */}
              {(idx === 1 || idx === 3) && <AdPlaceholder />}

              {/* 중간 CTA (3번째 섹션 뒤) */}
              {idx === 2 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-700 font-medium mb-2">
                    나의 성격 유형이 궁금하다면?
                  </p>
                  <Link
                    href="/quick-test"
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 font-bold hover:text-indigo-800 transition"
                  >
                    ⚡ 3분 빠른 검사 해보기 →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <AdPlaceholder />

        {/* ── 제휴 제품 추천 섹션 (이준형 PICK 등) ── */}
        {post.affiliateSection && (
          <AffiliateSectionBlock section={post.affiliateSection} />
        )}

        {/* 관련 유형 페이지 내부 링크 */}
        {post.relatedTypes && post.relatedTypes.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-lg">🔗</span> 관련 성격 유형 알아보기
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.relatedTypes.map((type) => (
                <Link
                  key={type}
                  href={`/types/${type.toLowerCase()}`}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100 hover:bg-indigo-100 transition"
                >
                  {type} 유형 보기 →
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              <Link href="/types" className="text-xs text-gray-500 hover:text-indigo-600 transition">
                전체 192 유형 보기 →
              </Link>
              <Link href="/temperaments" className="text-xs text-gray-500 hover:text-indigo-600 transition">
                4가지 기질론 알아보기 →
              </Link>
              <Link href="/compatibility" className="text-xs text-gray-500 hover:text-indigo-600 transition">
                궁합 검사하기 →
              </Link>
            </div>
          </div>
        )}

        {/* 항상 표시되는 사이트 내부 링크 */}
        {(!post.relatedTypes || post.relatedTypes.length === 0) && (
          <div className="mt-8 bg-gray-50 rounded-2xl p-5 flex flex-wrap gap-3 justify-center">
            <Link href="/types" className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              192 유형 보기
            </Link>
            <Link href="/temperaments" className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              4가지 기질론
            </Link>
            <Link href="/compatibility" className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              궁합 검사
            </Link>
            <Link href="/blog" className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              다른 글 보기
            </Link>
          </div>
        )}

        {/* 하단 공유 버튼 (본문 끝) */}
        <div className="mt-6 flex items-center justify-center gap-3 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">이 글이 도움이 되셨나요?</span>
          <BlogShareButtons title={post.title} description={post.description} slug={slug} />
        </div>

        {/* 하단 CTA */}
        <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">192가지 중 나는 어떤 유형일까?</h3>
          <p className="text-sm text-indigo-200 mb-4">
            성격 유형 + 기질론 통합 검사로 진짜 나를 발견하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/test"
              className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg"
            >
              100문항 정밀 검사
            </Link>
            <Link
              href="/quick-test"
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition border border-white/30"
            >
              ⚡ 3분 빠른 검사
            </Link>
          </div>
          <p className="text-xs text-indigo-200 mt-3">완전 무료 | 회원가입 불필요</p>
        </div>

        {/* ── GEO: 자주 묻는 질문(FAQ) — 생성형 AI 답변 인용 핵심 구간 ── */}
        {faqs.length > 0 && (
          <section
            className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            aria-labelledby="faq-heading"
          >
            <h2
              id="faq-heading"
              className="text-base font-black text-gray-800 mb-4 flex items-center gap-2"
            >
              <span className="text-lg">💬</span> 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  open={i === 0}
                  className="group border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <summary className="cursor-pointer list-none text-[14px] font-bold text-gray-800 flex items-start gap-2 hover:text-indigo-600 transition">
                    <span className="shrink-0 text-indigo-500 text-sm mt-[2px]">Q.</span>
                    <span className="flex-1">{f.q}</span>
                  </summary>
                  <p className="mt-2 pl-6 text-[13.5px] leading-relaxed text-gray-600">
                    <span className="text-indigo-500 font-bold mr-1">A.</span>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4">관련 글</h3>
            <div className="space-y-3">
              {relatedPosts.map((rp) => {
                const rc = categoryLabels[rp.category] ?? { label: rp.category, color: 'bg-gray-100 text-gray-700' };
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rc.color}`}>
                        {rc.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors leading-snug">
                      {rp.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 블로그 목록 돌아가기 */}
        <div className="mt-8 text-center pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 font-medium transition"
          >
            ← 블로그 목록으로
          </Link>
        </div>
      </article>
    </div>
  );
}
