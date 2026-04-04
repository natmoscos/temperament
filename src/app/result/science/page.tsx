'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner } from '@/components/ResultSection';
import { PremiumSectionTeaser } from '@/components/PremiumTeaser';
import PremiumTeaser from '@/components/PremiumTeaser';
import ShareButtons from '@/components/ShareButtons';
import AdPlaceholder from '@/components/AdPlaceholder';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import ResultSaveReminder from '@/components/ResultSaveReminder';

export default function SciencePage() {
  const { result, profile, loading } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className="text-sm text-indigo-500 font-medium">{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">과학적 근거</h1>
      </div>

      {/* ━━━ Eysenck (FREE) ━━━ */}
      <Section icon="🔬" title="Eysenck의 2차원 성격 모델" subtitle="당신의 기질이 가진 신경생물학적 기반">
        <Paragraph text={profile.eysenckInsight} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ 신경과학 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon="🧪"
        title="Helen Fisher의 신경화학 이론"
        subtitle="도파민, 세로토닌, 테스토스테론, 에스트로겐과 기질의 관계"
        content={profile.neuroscienceInsight}
      />

      {/* ━━━ 4체액설 (PREMIUM) ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">🏺</span>히포크라테스의 4체액설
          </h3>
          <p className="text-sm text-gray-400 mt-1 ml-9">2,400년 전의 통찰이 현대 과학과 만나다</p>
        </div>

        {/* 4원소 시각화 (FREE — visual element) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-center text-sm">
          <div className={`rounded-xl p-3 border ${result.temperament.code[0] === 'S' ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-400' : 'bg-amber-50 border-amber-100'}`}>
            <p className="text-xl mb-1">💨</p>
            <p className="font-bold text-amber-700">공기(Air)</p>
            <p className="text-amber-500 text-xs">혈액 · 봄 · 다혈질</p>
          </div>
          <div className={`rounded-xl p-3 border ${result.temperament.code[0] === 'C' ? 'bg-red-100 border-red-300 ring-2 ring-red-400' : 'bg-red-50 border-red-100'}`}>
            <p className="text-xl mb-1">🔥</p>
            <p className="font-bold text-red-700">불(Fire)</p>
            <p className="text-red-500 text-xs">황담즙 · 여름 · 담즙질</p>
          </div>
          <div className={`rounded-xl p-3 border ${result.temperament.code[0] === 'P' ? 'bg-emerald-100 border-emerald-300 ring-2 ring-emerald-400' : 'bg-emerald-50 border-emerald-100'}`}>
            <p className="text-xl mb-1">💧</p>
            <p className="font-bold text-emerald-700">물(Water)</p>
            <p className="text-emerald-500 text-xs">점액 · 겨울 · 점액질</p>
          </div>
          <div className={`rounded-xl p-3 border ${result.temperament.code[0] === 'M' ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-400' : 'bg-blue-50 border-blue-100'}`}>
            <p className="text-xl mb-1">🌍</p>
            <p className="font-bold text-blue-700">흙(Earth)</p>
            <p className="text-blue-500 text-xs">흑담즙 · 가을 · 우울질</p>
          </div>
        </div>

        {/* 4체액설 텍스트 (PREMIUM) */}
        <PremiumTeaser content={profile.humorTheoryInsight} />
      </div>

      <AdPlaceholder />

      {/* ━━━ 참고 문헌 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
          <span className="text-xl">📚</span>참고 자료
        </h3>
        <ul className="space-y-2 text-sm text-gray-500 leading-relaxed">
          <li>• Eysenck, H.J. (1967). <em>The Biological Basis of Personality</em>. Springfield, IL: Thomas.</li>
          <li>• Fisher, H. (2009). <em>Why Him? Why Her?: How to Find and Keep Lasting Love</em>. Henry Holt.</li>
          <li>• Keirsey, D. (1998). <em>Please Understand Me II: Temperament, Character, Intelligence</em>. Prometheus Nemesis.</li>
          <li>• Myers, I.B. & Myers, P.B. (1995). <em>Gifts Differing: Understanding Personality Type</em>. Davies-Black.</li>
          <li>• Quenk, N.L. (2002). <em>Was That Really Me? How Everyday Stress Brings Out Our Hidden Personality</em>. Davies-Black.</li>
          <li>• 히포크라테스 4체액설 — 인체를 구성하는 4원소(불, 물, 공기, 흙)와 체액의 균형 이론</li>
        </ul>
      </div>

      {/* ━━━ PDF 저장 리마인더 ━━━ */}
      <ResultSaveReminder />

      {/* ━━━ PDF 보고서 ━━━ */}
      <PdfDownloadButton result={result} profile={profile} />

      {/* ━━━ 마무리 CTA ━━━ */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-6 sm:p-8 text-center">
        <p className="text-3xl mb-3">🎉</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{result.fullCode} 분석을 모두 읽었습니다!</h3>
        <p className="text-sm text-gray-500 mb-5">친구와 결과를 공유하고 서로의 유형을 비교해보세요</p>
        <ShareButtons
          fullCode={result.fullCode}
          mbtiNickname={profile.mbtiNickname}
          temperamentNickname={profile.temperamentNickname}
        />
      </div>

      {/* ━━━ 다른 섹션 보기 ━━━ */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: '/result', icon: '🏠', label: '결과 요약' },
          { href: '/result/personality', icon: '🪞', label: '성격 분석' },
          { href: '/result/love', icon: '❤️', label: '연애 & 궁합' },
          { href: '/result/career', icon: '🚀', label: '커리어' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            <span>{item.icon}</span> {item.label}
          </a>
        ))}
      </div>

      {/* ━━━ 재검사 ━━━ */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => {
            localStorage.removeItem('temperament-test-answers');
            window.location.href = '/test';
          }}
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          다시 검사하기
        </button>
      </div>
    </div>
  );
}
