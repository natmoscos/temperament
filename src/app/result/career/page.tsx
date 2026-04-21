'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import PremiumTeaser from '@/components/PremiumTeaser';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToneToggle from '@/components/ToneToggle';
import CitationBox from '@/components/CitationBox';
import AffiliateSectionBlock from '@/components/AffiliateSection';
import { CATEGORY_DEFAULT_SECTIONS } from '@/data/affiliate-category-defaults';

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
      <Section
        icon={tone === 'spicy' ? '💼' : '🚀'}
        title={tone === 'spicy' ? '팩폭: 커리어에서 당신의 맹점' : '당신만의 커리어 전략'}
        subtitle={tone === 'spicy' ? '잘하는 것만 보지 말고 못하는 것도 직시하세요' : '성격 유형 + 기질이 알려주는 당신에게 맞는 일과 환경'}
      >
        <Paragraph text={tone === 'spicy' ? profile.spicy.careerGuide : profile.careerGuide} />
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.careers.map((c, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">{c}</span>
          ))}
        </div>
      </Section>

      {/* ━━━ 학술 인용: Keirsey 4기질-직업 ━━━ */}
      {tone !== 'spicy' && (
        <CitationBox
          variant="emerald"
          source="Keirsey, D. (1998). Please Understand Me II: Temperament, Character, Intelligence. Prometheus Nemesis"
          quote="히포크라테스의 4기질은 개인의 직업 적성을 예측하는 네 가지 행동 양식 — Artisan(장인)·Guardian(수호자)·Idealist(이상가)·Rational(합리가) — 으로 재정의될 수 있다."
          relevance={`당신의 ${profile.primaryTemperament.name} 기질은 Keirsey 모델에서 ${profile.primaryTemperament.name === '다혈질' ? 'Artisan(장인) — 즉흥·현장 대응' : profile.primaryTemperament.name === '담즙질' ? 'Rational(합리가) — 전략·시스템 구축' : profile.primaryTemperament.name === '점액질' ? 'Guardian(수호자) — 안정·책임 수행' : 'Idealist(이상가) — 의미·사람 연결'} 군에 해당하며, 위에 추천된 직업군의 근거가 됩니다.`}
        />
      )}

      <AdPlaceholder />

      {/* ━━━ 업무 환경 매트릭스 (PREMIUM) ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span className="text-2xl">🏢</span>업무 환경 적합도
        </h3>
        <PremiumTeaser content="당신의 성격 유형과 기질 조합을 기반으로 6가지 업무 환경(집중 환경, 팀 협업, 도전적 환경, 안정적 환경, 창의적 환경, 리더십)에 대한 적합도를 분석합니다." maxChars={90} />
      </div>

      <AdPlaceholder />

      {/* ━━━ 제휴 제품 추천 — 성장 루틴 세트 ━━━ */}
      {tone !== 'spicy' && CATEGORY_DEFAULT_SECTIONS.career && (
        <AffiliateSectionBlock section={CATEGORY_DEFAULT_SECTIONS.career} />
      )}

      <NextPageCTA
        href="/result/stress"
        icon="🌱"
        title="스트레스 & 성장 가이드"
        description="극도의 스트레스 패턴과 인생 공략집"
      />
    </div>
  );
}
