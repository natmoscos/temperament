'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import { PremiumSectionTeaser } from '@/components/PremiumTeaser';
import PremiumTeaser from '@/components/PremiumTeaser';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToneToggle from '@/components/ToneToggle';
import CitationBox from '@/components/CitationBox';
import AffiliateSectionBlock from '@/components/AffiliateSection';
import { CATEGORY_DEFAULT_SECTIONS } from '@/data/affiliate-category-defaults';

export default function StressPage() {
  const { result, profile, loading, tone, setTone } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className={`text-sm font-medium ${tone === 'spicy' ? 'text-red-500' : 'text-indigo-500'}`}>{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{tone === 'spicy' ? '🌶️ 스트레스 팩폭' : '스트레스 & 성장 가이드'}</h1>
      </div>

      <ToneToggle tone={tone} setTone={setTone} />

      {/* ━━━ Grip 스트레스 (FREE) ━━━ */}
      <Section
        icon={tone === 'spicy' ? '💥' : '🌊'}
        title={tone === 'spicy' ? '팩폭: 스트레스 받을 때 당신의 쇼' : '극도의 스트레스가 올 때'}
        subtitle={tone === 'spicy' ? '자기 객관화의 시간입니다' : '열등기능이 폭주하는 순간 — 평소와 전혀 다른 당신이 나타납니다'}
      >
        <Paragraph text={tone === 'spicy' ? profile.spicy.gripStressNarrative : profile.gripStressNarrative} />
        {tone !== 'spicy' && (
          <CitationBox
            variant="amber"
            source="Quenk, N.L. (2002). Was That Really Me? How Everyday Stress Brings Out Our Hidden Personality. Davies-Black"
            quote="장기 스트레스 상태에서 열등기능(Inferior Function)이 통제 불능으로 분출하는 현상을 '그립(Grip) 상태'라 부르며, 이는 평소 주기능과 정반대의 행동으로 나타난다."
            relevance={`당신의 ${profile.cognitiveStack} 스택에서 열등기능이 폭주할 때 평소와 전혀 다른 모습이 나타나는 것은 정상적인 심리 반응이며, 이 패턴을 인지하는 것이 회복의 첫걸음입니다.`}
          />
        )}
      </Section>

      <AdPlaceholder />

      {/* ━━━ 스트레스 회복 가이드 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon={tone === 'spicy' ? '🚨' : '🧘'}
        title={tone === 'spicy' ? '팩폭: 당신의 회복법은 진짜 회복이 아닐 수도' : '스트레스 회복 가이드'}
        subtitle={tone === 'spicy' ? '가짜 회복 패턴을 직시하세요' : '기질에 맞는 당신만의 회복법'}
        content={tone === 'spicy' ? profile.spicy.stressGuide : profile.stressGuide}
      />

      {/* ━━━ 빛과 그림자 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon={tone === 'spicy' ? '🔪' : '⚖️'}
        title={tone === 'spicy' ? '팩폭: 뼈 때리는 약점 분석' : '빛과 그림자'}
        subtitle={tone === 'spicy' ? '아픈 만큼 성장합니다' : '당신 기질의 약점을 아는 것이 성장의 시작입니다'}
        content={tone === 'spicy' ? profile.spicy.weaknessInsight : profile.weaknessInsight}
      />

      <AdPlaceholder />

      {/* ━━━ 인생 공략집 (PREMIUM) ━━━ */}
      <div className={`rounded-2xl shadow-sm border p-6 sm:p-8 ${tone === 'spicy' ? 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-red-100' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-100'}`}>
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">{tone === 'spicy' ? '🔥' : '📖'}</span> {tone === 'spicy' ? '인생 공략집 매운맛' : '당신의 인생 공략집'}
          </h3>
          <p className="text-sm text-gray-400 mt-1 ml-9">{tone === 'spicy' ? '듣기 싫어도 필요한 말들' : `${result.fullCode}로 살아가는 당신을 위한 성장 가이드`}</p>
        </div>
        <PremiumTeaser content={tone === 'spicy' ? profile.spicy.lifeStrategy : profile.lifeStrategy} />
      </div>

      {/* ━━━ 부모가 된다면 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon={tone === 'spicy' ? '😬' : '👨‍👩‍👧‍👦'}
        title={tone === 'spicy' ? '팩폭: 부모로서 당신의 맹점' : '부모가 된다면'}
        subtitle={tone === 'spicy' ? '자녀가 말 못 하는 불만을 대신 알려드립니다' : '기질과 성격이 만들어내는 당신만의 양육 스타일'}
        content={tone === 'spicy' ? profile.spicy.parentingInsight : profile.parentingInsight}
      />

      <AdPlaceholder />

      {/* ━━━ 제휴 제품 추천 — 성장·힐링 루틴 ━━━ */}
      {tone !== 'spicy' && CATEGORY_DEFAULT_SECTIONS.guide && (
        <AffiliateSectionBlock section={CATEGORY_DEFAULT_SECTIONS.guide} />
      )}

      <NextPageCTA
        href="/result/science"
        icon="🔬"
        title="과학적 근거"
        description="Eysenck, Helen Fisher, 히포크라테스 — 2,400년의 통찰"
      />
    </div>
  );
}
