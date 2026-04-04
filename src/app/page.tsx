import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 flex flex-col items-center px-4">
      {/* ━━━ Hero Section ━━━ */}
      <div className="text-center max-w-2xl mx-auto pt-12 sm:pt-20 pb-16">

        {/* 신뢰 배지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-indigo-200 font-medium">2,400년 검증된 성격 과학</span>
        </div>

        {/* 헤드카피 */}
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-[1.15] tracking-tight">
          같은 ENFJ인데<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
            왜 이렇게 다를까?
          </span>
        </h1>

        {/* 서브카피 */}
        <p className="text-lg sm:text-xl text-indigo-200/90 leading-relaxed max-w-md mx-auto mb-4">
          MBTI가 알려주지 않는<br className="sm:hidden" />
          <strong className="text-white">나의 숨겨진 성격</strong>을 찾아보세요.
        </p>
        <p className="text-sm text-indigo-300/60 mb-10">
          히포크라테스 기질론 × MBTI = 192가지 유형
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
          className="inline-flex items-center gap-2 px-10 py-4.5 bg-gradient-to-r from-amber-400 to-pink-500 text-gray-900 text-lg font-black rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200"
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

        {/* 사회적 증거 */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {['🟡', '🔴', '🔵', '🟢'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-white/20 border-2 border-indigo-950 flex items-center justify-center text-xs">
                {c}
              </div>
            ))}
          </div>
          <p className="text-sm text-indigo-300/70">
            <strong className="text-indigo-200">2,847명</strong>이 성격을 발견했습니다
          </p>
        </div>
      </div>

      {/* ━━━ 도발 섹션 ━━━ */}
      <div className="w-full max-w-2xl mb-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 text-center">
          <p className="text-2xl sm:text-3xl font-black text-white mb-3 leading-snug">
            &ldquo;나 진짜 I야? E야?&rdquo;
          </p>
          <p className="text-base text-indigo-200/80 leading-relaxed max-w-md mx-auto">
            그 혼란의 이유는 MBTI에 빠진 한 가지 차원 때문입니다.<br />
            <strong className="text-amber-300">기질(Temperament)</strong>이 그 답을 알고 있습니다.
          </p>
        </div>
      </div>

      {/* ━━━ 비교 카드 (밝은 영역) ━━━ */}
      <div className="w-full bg-white rounded-t-[2.5rem] pt-12 pb-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* USP */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              MBTI <span className="text-indigo-600">16가지</span>로는 부족했다
            </h2>
            <p className="text-sm text-gray-500">같은 유형이라도 기질에 따라 완전히 달라집니다</p>
          </div>

          {/* 비교 예시 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
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
          </div>

          <div className="text-center mb-10">
            <p className="text-sm text-gray-500 mb-1">같은 ENFJ인데 이렇게 다릅니다</p>
            <p className="text-xs text-gray-400">MBTI 16유형 × 기질 12조합 = <strong className="text-indigo-600">192가지</strong> 고유한 성격</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            {[
              { icon: '🧩', title: 'MBTI 16유형', desc: '인지기능 분석', color: 'bg-indigo-50 border-indigo-100' },
              { icon: '🧬', title: '기질 12조합', desc: '4기질 × 2 조합', color: 'bg-purple-50 border-purple-100' },
              { icon: '📖', title: '인생 공략집', desc: '맞춤형 가이드', color: 'bg-pink-50 border-pink-100' },
            ].map((f) => (
              <div key={f.title} className={`rounded-2xl p-4 sm:p-5 border text-center ${f.color}`}>
                <span className="text-2xl block mb-2">{f.icon}</span>
                <p className="text-sm font-bold text-gray-800">{f.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* 제공 분석 미리보기 */}
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
      </div>
    </div>
  );
}
