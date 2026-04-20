import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/notion';
import JsonLd from '@/components/JsonLd';

// 1시간마다 자동 갱신 (Notion 새 글 반영)
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export const metadata: Metadata = {
  title: '성격 유형 블로그 — 16가지 성격 × 기질론 인사이트',
  description: '성격 유형 궁합, 연애 스타일, 직업 추천, 기질론 가이드 등 성격 유형에 관한 깊이 있는 콘텐츠를 제공합니다.',
  keywords: ['성격 유형 블로그', '성격 유형 궁합', '성격 유형별 연애', '성격 유형별 직업', '기질론 가이드', '성격 유형 분석'],
  alternates: {
    canonical: 'https://192types.com/blog',
  },
  openGraph: {
    title: '성격 유형 블로그 — 16가지 성격 × 기질론 인사이트',
    description: '성격 유형 궁합, 연애 스타일, 직업 추천, 기질론 가이드 등 성격 유형에 관한 깊이 있는 콘텐츠를 제공합니다.',
  },
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  compatibility: { label: '궁합', color: 'bg-pink-100 text-pink-700' },
  mbti: { label: '성격 유형', color: 'bg-indigo-100 text-indigo-700' },
  temperament: { label: '기질론', color: 'bg-amber-100 text-amber-700' },
  career: { label: '커리어', color: 'bg-emerald-100 text-emerald-700' },
  guide: { label: '가이드', color: 'bg-purple-100 text-purple-700' },
  science: { label: '과학', color: 'bg-cyan-100 text-cyan-700' },
  psychology: { label: '심리분석', color: 'bg-rose-100 text-rose-700' },
  'mbti-economics': { label: 'MBTI 경제학', color: 'bg-yellow-100 text-yellow-800' },
};

export default async function BlogIndexPage() {
  const allPosts = await getAllBlogPosts();
  // noindex 글은 블로그 리스트에서도 숨김 (크롤 예산 절약 + 리스트 품질 유지)
  const blogPosts = allPosts.filter((p) => !p.noindex);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '블로그' },
        ],
      }} />
      <div className="w-full max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-10">
          <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-4 inline-block">
            ← 홈으로
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            성격 유형{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              블로그
            </span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
            성격 유형과 기질론에 대한 깊이 있는 인사이트를 만나보세요.
          </p>
        </div>

        {/* 글 목록 — 반응형 3열 그리드 (데스크톱 3 / 태블릿 2 / 모바일 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post) => {
            const cat = categoryLabels[post.category] ?? { label: post.category, color: 'bg-gray-100 text-gray-700' };
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all overflow-hidden group"
              >
                {post.thumbnail && (
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${cat.color}`}>
                      {cat.label}
                    </span>
                    <span className="text-xs text-gray-300">{post.publishDate}</span>
                  </div>
                  <h2 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 mb-3">
                    {post.description}
                  </p>
                  {post.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-100">
                      {post.keywords.slice(0, 3).map((kw) => (
                        <span key={kw} className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* 검사 CTA */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">나의 192가지 성격 유형은?</h3>
          <p className="text-sm text-indigo-200 mb-5">성격 유형 + 기질론을 결합한 정밀 분석 검사</p>
          <Link
            href="/test"
            className="inline-block px-8 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg"
          >
            무료 검사 시작하기
          </Link>
          <p className="text-xs text-indigo-200 mt-3">약 12~15분 소요 | 100문항</p>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 text-center text-xs text-gray-300">
          <p>Temperament &copy; 2026. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
