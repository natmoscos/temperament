'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function StressPage() {
  const { result, profile, loading } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className="text-sm text-indigo-500 font-medium">{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">스트레스 & 성장 가이드</h1>
      </div>

      {/* ━━━ Grip 스트레스 ━━━ */}
      <Section icon="🌊" title="극도의 스트레스가 올 때" subtitle="열등기능이 폭주하는 순간 — 평소와 전혀 다른 당신이 나타납니다">
        <Paragraph text={profile.gripStressNarrative} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ 스트레스 회복 가이드 ━━━ */}
      <Section icon="🧘" title="스트레스 회복 가이드" subtitle="기질에 맞는 당신만의 회복법">
        <Paragraph text={profile.stressGuide} />
      </Section>

      {/* ━━━ 빛과 그림자 ━━━ */}
      <Section icon="⚖️" title="빛과 그림자" subtitle="당신 기질의 약점을 아는 것이 성장의 시작입니다">
        <Paragraph text={profile.weaknessInsight} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ 인생 공략집 ━━━ */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-sm border border-indigo-100 p-6 sm:p-8">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📖</span> 당신의 인생 공략집
          </h3>
          <p className="text-sm text-gray-400 mt-1 ml-9">{result.fullCode}로 살아가는 당신을 위한 성장 가이드</p>
        </div>
        <Paragraph text={profile.lifeStrategy} />
      </div>

      {/* ━━━ 부모가 된다면 ━━━ */}
      <Section icon="👨‍👩‍👧‍👦" title="부모가 된다면" subtitle="기질과 성격이 만들어내는 당신만의 양육 스타일">
        <Paragraph text={profile.parentingInsight} />
      </Section>

      <AdPlaceholder />

      <NextPageCTA
        href="/result/science"
        icon="🔬"
        title="과학적 근거"
        description="Eysenck, Helen Fisher, 히포크라테스 — 2,400년의 통찰"
      />
    </div>
  );
}
