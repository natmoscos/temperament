import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import LiveTestFeed from '@/components/LiveTestFeed';
import ScrollReveal from '@/components/ScrollReveal';
import TonePreview from '@/components/TonePreview';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://192types.com/',
  },
  openGraph: {
    images: ['/api/og?type=home'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '192 성격 유형 검사',
  url: SITE_URL,
  description: '16가지 성격 유형과 히포크라테스 기질론을 결합한 192가지 성격 유형 검사',
  inLanguage: 'ko',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/types/{search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '192 성격 유형 검사는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '192 성격 유형 검사는 칼 융의 인지기능 이론(흔히 MBTI로 알려진 16가지 성격 유형)과 히포크라테스의 4가지 기질론(12가지 조합)을 과학적으로 결합한 통합 성격 분석 검사입니다. 16 × 12 = 192가지 고유한 성격 유형으로 당신을 분석합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '16가지 성격 유형과 기질론의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '흔히 MBTI로 알려진 16가지 성격 유형은 인지기능(사고·감정·감각·직관의 방향)을 분류하고, 기질론은 감정의 기본 반응 패턴(다혈질·담즙질·점액질·우울질)을 분류합니다. 같은 성격 유형이라도 기질에 따라 완전히 다른 성격이 됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '검사는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 100문항 정밀 검사와 30문항 빠른 검사 모두 완전 무료입니다. 회원가입도 필요하지 않습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '검사 시간은 얼마나 걸리나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100문항 정밀 검사는 약 12~15분, 30문항 빠른 검사는 약 3분이 소요됩니다. 정밀 검사는 중간에 저장되어 이어서 할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '192가지 유형은 어떻게 나뉘나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '16가지 성격 유형(ISTJ, ISFJ 등)에 히포크라테스 기질 12가지 조합(다혈담즙, 담즙다혈 등)을 곱하여 16 × 12 = 192가지 고유한 성격 유형이 만들어집니다. 예를 들어 같은 ENFJ라도 담즙질 ENFJ와 우울질 ENFJ는 전혀 다른 성격입니다.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 flex flex-col items-center px-4">
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <LiveTestFeed />
      {/* ━━━ Hero Section ━━━ */}
      <div className="text-center max-w-2xl mx-auto pt-12 sm:pt-20 pb-16">

        {/* 신뢰 배지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-indigo-200 font-medium">16가지 성격 유형으로는 부족했습니다</span>
        </div>

        {/* 헤드카피 */}
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-[1.15] tracking-tight">
          같은 ENFJ인데<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
            왜 이렇게 다를까?
          </span>
        </h1>

        {/* 서브카피 */}
        <p className="text-lg sm:text-xl text-indigo-200/90 leading-relaxed max-w-lg mx-auto mb-4">
          기존 16가지 유형이 알려주지 않는 <strong className="text-white">나의 숨겨진 성격</strong>을 찾아보세요
        </p>
        <p className="text-sm text-indigo-300/60 mb-10">
          히포크라테스 기질론 × 16가지 성격 유형 = 192가지 유형
        </p>

        {/* 캐릭터 4인 */}
        <div className="flex items-end justify-center gap-4 sm:gap-6 mb-10">
          {[
            { emoji: '🌞', label: '다혈질', color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/40' },
            { emoji: '🔥', label: '담즙질', color: 'from-red-400 to-rose-600', glow: 'shadow-red-500/40' },
            { emoji: '🌿', label: '점액질', color: 'from-emerald-400 to-green-600', glow: 'shadow-emerald-500/40' },
            { emoji: '🌊', label: '우울질', color: 'from-blue-400 to-indigo-600', glow: 'shadow-blue-500/40' },
          ].map((char, i) => (
            <div key={char.label} className="flex flex-col items-center group cursor-default">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${char.color} flex items-center justify-center text-3xl sm:text-4xl shadow-lg ${char.glow} transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 ${i === 1 || i === 2 ? 'sm:w-24 sm:h-24 sm:text-5xl' : ''}`}>
                {char.emoji}
              </div>
              <span className="text-xs text-indigo-300/70 mt-2 font-medium">{char.label}</span>
            </div>
          ))}
        </div>

        {/* 정보 태그 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            { icon: '📝', text: '100문항' },
            { icon: '⏱️', text: '약 15분' },
            { icon: '✨', text: '무료' },
          ].map((tag) => (
            <div key={tag.text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg border border-white/10">
              <span className="text-sm">{tag.icon}</span>
              <span className="text-xs text-indigo-200 font-medium">{tag.text}</span>
            </div>
          ))}
        </div>

        {/* 메인 CTA */}
        <Link
          href="/test"
          className="inline-flex items-center gap-2 px-10 py-4.5 bg-amber-400 hover:bg-amber-300 text-gray-900 text-lg font-black rounded-2xl shadow-xl shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 hover:scale-105 active:scale-[0.98] transition-all duration-200"
        >
          내 숨겨진 성격 확인하기
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {/* 빠른 검사 */}
        <div className="mt-4">
          <Link
            href="/quick-test"
            className="inline-flex items-center gap-1 text-sm text-indigo-300/80 hover:text-white font-medium transition"
          >
            ⚡ 시간 없다면? 3분 빠른 검사 →
          </Link>
        </div>

        {/* 사회적 증거 한 줄 */}
        <p className="mt-8 text-xs text-indigo-400/50">
          🔬 Eysenck 성격 모델 · 🧬 Helen Fisher 신경화학 · 🏺 2,400년 기질론 통합
        </p>
      </div>

      {/* ━━━ NAS 50% 통계 — 검사 당위성 ━━━ */}
      <div className="w-full max-w-2xl mb-12">
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 sm:p-8 text-center">
          <span className="text-4xl sm:text-5xl font-black text-amber-300">50%</span>
          <p className="text-sm sm:text-base text-amber-200/90 mt-2 font-medium leading-relaxed">
            같은 16가지 유형 검사를 5주 뒤 다시 받으면<br />
            <strong className="text-white">절반이 다른 유형</strong>을 받습니다.
          </p>
          <p className="text-[11px] text-indigo-300/50 mt-3">
            — 미국 국립과학원(NAS) 1991년 공식 검증 보고서
          </p>
          <p className="text-sm text-indigo-100/80 mt-4 max-w-md mx-auto">
            인지기능 하나만으로는 부족합니다. <strong className="text-amber-300">기질</strong>이 그 빈 자리를 채웁니다.
          </p>
        </div>
      </div>

      {/* ━━━ 비교 카드 (밝은 영역) ━━━ */}
      <div className="w-full bg-white rounded-t-[2.5rem] pt-12 pb-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* 비교 예시 — 같은 ENFJ 기질별 차이 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-lg">담즙질 ENFJ</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  목표가 생기면 <strong>폭발적으로 외향적</strong>이 됩니다.
                  팀을 이끌며 결과를 만들어내는 카리스마 리더.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌊</span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">우울질 ENFJ</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  깊은 공감 속에서 <strong>조용히 이끕니다</strong>.
                  한 명 한 명의 마음을 움직이는 상담가형 리더.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 mb-1">같은 ENFJ인데 이렇게 다릅니다</p>
            <p className="text-sm text-gray-400">16가지 성격 유형 × 기질 12조합 = <strong className="text-indigo-600">192가지</strong> 고유한 성격</p>
          </div>

          {/* 제공 분석 미리보기 */}
          <ScrollReveal>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 mb-12">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">검사하면 이런 걸 알 수 있어요</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: '🪞', text: '숨겨진 성격' },
                { icon: '❤️', text: '연애 스타일' },
                { icon: '🚀', text: '맞춤 커리어' },
                { icon: '🌊', text: '스트레스 패턴' },
                { icon: '💘', text: '궁합 분석' },
                { icon: '📄', text: 'PDF 보고서' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>

          {/* 매운맛/순한맛 토글 체험 */}
          <ScrollReveal>
            <TonePreview />
          </ScrollReveal>

          {/* 하단 CTA */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 sm:p-8 text-center shadow-xl mb-12">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              당신은 192가지 중<br />어떤 유형일까요?
            </h3>
            <p className="text-sm text-indigo-200 mb-6">무료로 당신만의 유형을 발견하세요</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/test"
                className="px-8 py-3.5 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg text-base"
              >
                100문항 정밀 검사
              </Link>
              <Link
                href="/quick-test"
                className="px-8 py-3.5 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition border border-white/30 text-base"
              >
                ⚡ 3분 빠른 검사
              </Link>
            </div>
          </div>

          {/* 블로그 미리보기 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">📖 인기 글</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/blog/mbti-compatibility-ranking', title: '성격 유형 궁합 순위 TOP 10', tag: '궁합' },
                { href: '/blog/mbti-love-style-all-types', title: '성격 유형별 연애 스타일 총정리', tag: '성격' },
                { href: '/blog/four-temperaments-guide', title: '다혈질 담즙질 점액질 우울질 완벽 가이드', tag: '기질론' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition group"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">{item.tag}</span>
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

          {/* ━━━ 더 알아보기 (내부 링크) ━━━ */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">더 알아보기</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/temperaments"
                className="bg-amber-50 rounded-xl p-4 border border-amber-100 hover:shadow-md hover:border-amber-200 transition group text-center"
              >
                <span className="text-2xl block mb-2">🏺</span>
                <p className="text-sm font-bold text-gray-800 group-hover:text-amber-700 transition">히포크라테스 기질론</p>
                <p className="text-xs text-gray-400 mt-1">다혈질 · 담즙질 · 점액질 · 우울질</p>
              </Link>
              <Link
                href="/types"
                className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 hover:shadow-md hover:border-indigo-200 transition group text-center"
              >
                <span className="text-2xl block mb-2">🧩</span>
                <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition">192가지 유형 목록</p>
                <p className="text-xs text-gray-400 mt-1">16가지 성격 유형 × 기질 12조합</p>
              </Link>
              <Link
                href="/compatibility"
                className="bg-pink-50 rounded-xl p-4 border border-pink-100 hover:shadow-md hover:border-pink-200 transition group text-center"
              >
                <span className="text-2xl block mb-2">💘</span>
                <p className="text-sm font-bold text-gray-800 group-hover:text-pink-700 transition">궁합 검사</p>
                <p className="text-xs text-gray-400 mt-1">성격 유형 + 기질 궁합 분석</p>
              </Link>
            </div>
          </div>

          {/* ━━━ FAQ 섹션 ━━━ */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">자주 묻는 질문</h2>
            <div className="space-y-3">
              {[
                {
                  q: '192 성격 유형 검사는 무엇인가요?',
                  a: '칼 융의 인지기능 이론(흔히 MBTI로 알려진 16가지 성격 유형)과 히포크라테스의 4가지 기질론(12가지 조합)을 과학적으로 결합한 통합 성격 분석 검사입니다. 16 × 12 = 192가지 고유한 성격 유형으로 당신을 분석합니다.',
                },
                {
                  q: '16가지 성격 유형과 기질론의 차이는 무엇인가요?',
                  a: '흔히 MBTI로 알려진 16가지 성격 유형은 인지기능(사고·감정·감각·직관의 방향)을 분류하고, 기질론은 감정의 기본 반응 패턴(다혈질·담즙질·점액질·우울질)을 분류합니다. 같은 성격 유형이라도 기질에 따라 완전히 다른 성격이 됩니다.',
                },
                {
                  q: '검사는 무료인가요?',
                  a: '네, 100문항 정밀 검사와 30문항 빠른 검사 모두 완전 무료입니다. 회원가입도 필요하지 않습니다.',
                },
                {
                  q: '검사 시간은 얼마나 걸리나요?',
                  a: '100문항 정밀 검사는 약 12~15분, 30문항 빠른 검사는 약 3분이 소요됩니다. 정밀 검사는 중간에 저장되어 이어서 할 수 있습니다.',
                },
                {
                  q: '192가지 유형은 어떻게 나뉘나요?',
                  a: '16가지 성격 유형(ISTJ, ISFJ 등)에 히포크라테스 기질 12가지 조합(다혈담즙, 담즙다혈 등)을 곱하여 16 × 12 = 192가지 고유한 성격 유형이 만들어집니다.',
                },
              ].map((faq) => (
                <details key={faq.q} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                  <summary className="p-4 sm:p-5 cursor-pointer font-semibold text-gray-800 text-sm sm:text-base flex items-center justify-between gap-2 list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
