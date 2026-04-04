import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* 링크 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">검사</p>
            <div className="space-y-2">
              <Link href="/test" className="block text-sm text-gray-600 hover:text-indigo-600 transition">정밀 검사 (100문항)</Link>
              <Link href="/quick-test" className="block text-sm text-gray-600 hover:text-indigo-600 transition">빠른 검사 (30문항)</Link>
              <Link href="/compatibility" className="block text-sm text-gray-600 hover:text-indigo-600 transition">궁합 검사</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">성격 유형</p>
            <div className="space-y-2">
              <Link href="/types" className="block text-sm text-gray-600 hover:text-indigo-600 transition">MBTI 16유형</Link>
              <Link href="/temperaments" className="block text-sm text-gray-600 hover:text-indigo-600 transition">기질론 가이드</Link>
              <Link href="/blog" className="block text-sm text-gray-600 hover:text-indigo-600 transition">블로그</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">서비스</p>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-600 hover:text-indigo-600 transition">서비스 소개</Link>
              <Link href="/privacy" className="block text-sm text-gray-600 hover:text-indigo-600 transition">개인정보처리방침</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">연락처</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">contact@192types.com</p>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-[10px] text-white font-black">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-500">192 Temperament</span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; 2026 192 성격 유형 검사. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
