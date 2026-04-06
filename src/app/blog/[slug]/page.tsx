import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllSlugs, blogPosts } from '@/data/blog-posts';
import AdPlaceholder from '@/components/AdPlaceholder';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

// 정적 경로 생성
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// SEO 메타데이터
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: '글을 찾을 수 없습니다' };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://192types.com'}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishDate,
      images: [`/api/og?type=blog&title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og?type=blog&title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`],
    },
  };
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  compatibility: { label: '궁합', color: 'bg-pink-100 text-pink-700' },
  mbti: { label: 'MBTI', color: 'bg-indigo-100 text-indigo-700' },
  temperament: { label: '기질론', color: 'bg-amber-100 text-amber-700' },
  career: { label: '커리어', color: 'bg-emerald-100 text-emerald-700' },
  guide: { label: '가이드', color: 'bg-purple-100 text-purple-700' },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const cat = categoryLabels[post.category] ?? { label: post.category, color: 'bg-gray-100 text-gray-700' };

  // 관련 글 (같은 카테고리, 현재 글 제외, 최대 3개)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: {
          '@type': 'Organization',
          name: '192 성격 유형 검사',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: '192 성격 유형 검사',
          url: SITE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${slug}`,
        },
        keywords: post.keywords.join(', '),
        inLanguage: 'ko',
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
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
        </header>

        {/* 썸네일 히어로 이미지 */}
        {post.thumbnail && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.keywords.map((kw) => (
            <span key={kw} className="text-xs text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
              #{kw}
            </span>
          ))}
        </div>

        {/* 본문 섹션 */}
        <div className="space-y-8">
          {post.sections.map((section, idx) => (
            <div key={idx}>
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 leading-snug">
                  {section.heading}
                </h2>
                {section.image && (
                  <div className="relative w-full rounded-xl overflow-hidden my-4">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-auto object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="text-gray-600 text-[15px] leading-[1.9] whitespace-pre-line">
                  {section.content}
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

        {/* 하단 CTA */}
        <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">192가지 중 나는 어떤 유형일까?</h3>
          <p className="text-sm text-indigo-200 mb-4">
            MBTI + 기질론 통합 검사로 진짜 나를 발견하세요
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
