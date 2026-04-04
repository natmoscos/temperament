import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Emoji */}
        <div className="text-7xl sm:text-8xl mb-8">🔍</div>

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
          <span className="text-xs text-indigo-200 font-medium">404 Not Found</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
          페이지를 찾을 수 없어요
        </h1>

        {/* Sub text */}
        <p className="text-base sm:text-lg text-indigo-200/80 leading-relaxed mb-10">
          요청하신 페이지가 존재하지 않거나 이동되었습니다
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/test"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 text-sm"
          >
            성격 검사 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
