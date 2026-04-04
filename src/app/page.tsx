import Link from 'next/link';
import { LandingCharacters } from '@/components/LandingCharacters';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        {/* 캐릭터 미리보기 */}
        <div className="mb-8">
          <LandingCharacters />
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            나를 깊이 이해하는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              192가지 성격 유형
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg mx-auto">
            MBTI만으로는 설명되지 않던 당신의 모습.<br />
            히포크라테스 기질론과 결합해 진짜 당신을 발견하세요.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/test"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-105 transition-all duration-200"
        >
          무료 검사 시작하기
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="mt-4 text-sm text-gray-400">약 12~15분 소요 | 100문항 | 무료</p>

        {/* 간편 검사 CTA */}
        <div className="mt-3">
          <Link
            href="/quick-test"
            className="inline-flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-700 font-medium transition"
          >
            ⚡ 시간이 없다면? 3분 빠른 검사 →
          </Link>
        </div>

        {/* USP Section */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 text-left">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">왜 192가지일까요?</h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <span className="font-semibold text-indigo-600">같은 ENFJ라도 다릅니다.</span>{' '}
              담즙질 ENFJ는 목표가 있을 때 폭발적으로 외향적이 되지만,
              우울질 ENFJ는 깊은 공감 속에서 조용히 이끕니다.
            </p>
            <p>
              <span className="font-semibold text-purple-600">MBTI로 설명 안 되던 모순, 기질이 풀어줍니다.</span>{' '}
              &ldquo;나 정말 I야? E야?&rdquo; 그 혼란의 답이 여기에 있습니다.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-3 mx-auto text-xl">
              🧩
            </div>
            <h3 className="font-bold text-gray-800 mb-1">MBTI 16유형</h3>
            <p className="text-sm text-gray-400">인지 기능 기반 성격 분석</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3 mx-auto text-xl">
              🧬
            </div>
            <h3 className="font-bold text-gray-800 mb-1">기질 12조합</h3>
            <p className="text-sm text-gray-400">히포크라테스 4기질 × 2 조합</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-3 mx-auto text-xl">
              📖
            </div>
            <h3 className="font-bold text-gray-800 mb-1">인생 공략집</h3>
            <p className="text-sm text-gray-400">맞춤형 성장 가이드 제공</p>
          </div>
        </div>
      </div>

      {/* 블로그 미리보기 */}
      <div className="mt-16 w-full max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">📖 인기 글</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/blog/mbti-compatibility-ranking', title: 'MBTI 궁합 순위 TOP 10', tag: '궁합' },
            { href: '/blog/mbti-love-style-all-types', title: 'MBTI 유형별 연애 스타일 총정리', tag: 'MBTI' },
            { href: '/blog/four-temperaments-guide', title: '다혈질 담즙질 점액질 우울질 완벽 가이드', tag: '기질론' },
            { href: '/blog/mbti-career-guide', title: 'MBTI 유형별 직업 추천', tag: '커리어' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition group"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">{item.tag}</span>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition mt-1 leading-snug">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/blog" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
            블로그 더보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
