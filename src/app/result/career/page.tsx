'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import PremiumTeaser from '@/components/PremiumTeaser';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToneToggle from '@/components/ToneToggle';

export default function CareerPage() {
  const { result, profile, loading, tone, setTone } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className={`text-sm font-medium ${tone === 'spicy' ? 'text-red-500' : 'text-indigo-500'}`}>{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">커리어 전략</h1>
      </div>

      <ToneToggle tone={tone} setTone={setTone} />

      {/* ━━━ 커리어 가이드 (FREE) ━━━ */}
      <Section icon="🚀" title="당신만의 커리어 전략" subtitle="성격 유형 + 기질이 알려주는 당신에게 맞는 일과 환경">
        <Paragraph text={profile.careerGuide} />
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.careers.map((c, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">{c}</span>
          ))}
        </div>
      </Section>

      <AdPlaceholder />

      {/* ━━━ 업무 환경 매트릭스 (PREMIUM) ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span className="text-2xl">🏢</span>업무 환경 적합도
        </h3>
        <PremiumTeaser content="당신의 성격 유형과 기질 조합을 기반으로 6가지 업무 환경(집중 환경, 팀 협업, 도전적 환경, 안정적 환경, 창의적 환경, 리더십)에 대한 적합도를 분석합니다." maxChars={90} />
      </div>

      <AdPlaceholder />

      <NextPageCTA
        href="/result/stress"
        icon="🌱"
        title="스트레스 & 성장 가이드"
        description="극도의 스트레스 패턴과 인생 공략집"
      />
    </div>
  );
}
