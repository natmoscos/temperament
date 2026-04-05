import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: '성격 유형 블로그 — MBTI × 기질론 인사이트',
  description: 'MBTI 궁합, 연애 스타일, 직업 추천, 기질론 가이드 등 성격 유형에 관한 깊이 있는 콘텐츠를 제공합니다.',
  keywords: ['MBTI 블로그', 'MBTI 궁합', 'MBTI 연애', 'MBTI 직업', '기질론 가이드', '성격 유형 분석'],
  openGraph: {
    title: '성격 유형 블로그 — MBTI × 기질론 인사이트',
    description: 'MBTI 궁합, 연애 스타일, 직업 추천, 기질론 가이드 등 성격 유형에 관한 깊이 있는 콘텐츠를 제공합니다.',
  },
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  compatibility: { label: '궁합', color: 'bg-pink-100 text-pink-700' },
  mbti: { label: 'MBTI', color: 'bg-indigo-100 text-indigo-700' },
  temperament: { label: '기질론', color: 'bg-amber-100 text-amber-700' },
  career: { label: '커리어', color: 'bg-emerald-100 text-emerald-700' },
  guide: { label: '가이드', color: 'bg-purple-100 text-purple-700' },
  science: { label: '과학', color: 'bg-cyan-100 text-cyan-700' },
  psychology: { label: '심리학', color: 'bg-rose-100 text-rose-700' },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="w-full max-w-3xl mx-auto">

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
            MBTI와 기질론에 대한 깊이 있는 인사이트를 만나보세요.
          </p>
        </div>

        {/* 글 목록 */}
        <div className="space-y-4">
          {blogPosts.map((post) => {
            const cat = categoryLabels[post.category] ?? { label: post.category, color: 'bg-gray-100 text-gray-700' };
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all p-5 sm:p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className="text-xs text-gray-300">{post.publishDate}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-snug mb-1.5">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                    {post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.keywords.slice(0, 3).map((kw) => (
                          <span key={kw} className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-colors mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 검사 CTA */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">나의 192가지 성격 유형은?</h3>
          <p className="text-sm text-indigo-200 mb-5">MBTI + 기질론을 결합한 정밀 분석 검사</p>
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
