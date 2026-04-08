'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import { PremiumSectionTeaser } from '@/components/PremiumTeaser';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToneToggle from '@/components/ToneToggle';
import { temperamentProfiles } from '@/data/profiles-temperament';

export default function PersonalityPage() {
  const { result, profile, loading, tone, setTone } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  const temperamentProfile = temperamentProfiles[result.temperament.code];

  const allInsights = tone === 'spicy' ? profile.spicy.contradictionInsights : profile.contradictionInsights;
  const freeInsights = allInsights.slice(0, 2);
  const hasMore = allInsights.length > 2;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className={`text-sm font-medium ${tone === 'spicy' ? 'text-red-500' : 'text-indigo-500'}`}>{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{tone === 'spicy' ? '🌶️ 성격 팩폭 분석' : '성격 심층 분석'}</h1>
      </div>

      <ToneToggle tone={tone} setTone={setTone} />

      {/* ━━━ 당신은 이런 사람입니다 (FREE) ━━━ */}
      <Section
        icon={tone === 'spicy' ? '🌶️' : '🪞'}
        title={tone === 'spicy' ? '팩폭: 당신은 이런 사람입니다' : '당신은 이런 사람입니다'}
        subtitle={tone === 'spicy' ? '뼈 때리는 자기 분석 — 심장이 약하면 순한맛으로 전환하세요' : '성격 유형과 기질론이 만나 그려내는 당신의 초상화'}
      >
        <Paragraph text={tone === 'spicy' ? profile.spicy.personalityNarrative : profile.personalityNarrative} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ 기질 심층 분석 (FREE) ━━━ */}
      {temperamentProfile && (
        <Section icon="🧬" title="기질 심층 분석" subtitle="고대 체액설에서 현대 심리학까지, 당신의 기질을 깊이 들여다봅니다">
          <div className="space-y-4">
            {[
              { icon: '🧪', label: '체액 기원', value: temperamentProfile.origin },
              { icon: '🔬', label: '현대 심리학적 정의', value: temperamentProfile.modernLabel },
              { icon: '💫', label: '감정 패턴', value: temperamentProfile.emotionalStyle },
              { icon: '⚡', label: '행동 패턴', value: temperamentProfile.behaviorStyle },
              { icon: '🧠', label: '인지 패턴', value: temperamentProfile.cognitiveStyle },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">{item.label}</h4>
                    <p className="text-gray-700 leading-[1.85] text-[15px]">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ MBTI만으로는 설명할 수 없었던 것들 (FREE: first 2) ━━━ */}
      {allInsights.length > 0 && (
        <Section
          icon={tone === 'spicy' ? '🎯' : '🔑'}
          title={tone === 'spicy' ? '팩폭: 당신의 모순을 까발린다' : '기존 16가지 유형만으로는 설명할 수 없었던 것들'}
          subtitle={tone === 'spicy' ? '불편한 자기 인식의 시간' : '기질론이 풀어주는 당신의 모순과 혼란'}
        >
          <div className="space-y-5">
            {freeInsights.map((insight, i) => (
              <div key={i} className={`rounded-xl p-5 border ${tone === 'spicy' ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-100' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'}`}>
                <p className="text-gray-700 leading-[1.85] text-[15px]">{insight}</p>
              </div>
            ))}
            {hasMore && (
              <div className="flex flex-col items-center gap-2 py-4 px-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/60">
                <p className="text-sm font-semibold text-amber-700 flex items-center gap-1.5">
                  <span>&#x1f512;</span> {allInsights.length - 2}개의 인사이트가 더 있습니다
                </p>
                <a
                  href="#pdf-download"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector('[data-pdf-download]');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="text-xs text-amber-600 hover:text-amber-800 underline underline-offset-2 transition"
                >
                  PDF 보고서에서 전체 내용 확인 &rarr;
                </a>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ━━━ 사람들이 모르는 진짜 당신 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon={tone === 'spicy' ? '💀' : '🎭'}
        title={tone === 'spicy' ? '팩폭: 아무도 안 보는 진짜 당신' : '사람들이 모르는 진짜 당신'}
        subtitle={tone === 'spicy' ? '민낯 주의. 불편할 수 있습니다.' : '밖에서 보이는 모습과 실제 내면 사이의 이야기'}
        content={tone === 'spicy' ? profile.spicy.hiddenSelf : profile.hiddenSelf}
      />

      {/* ━━━ 대화와 소통의 비밀 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon={tone === 'spicy' ? '🗣️' : '💬'}
        title={tone === 'spicy' ? '팩폭: 대화할 때 당신의 민낯' : '대화와 소통의 비밀'}
        subtitle={tone === 'spicy' ? '듣기 불편해도 알아야 할 진실' : '당신이 소통할 때 일어나는 일들'}
        content={tone === 'spicy' ? profile.spicy.communicationGuide : profile.communicationGuide}
      />

      <AdPlaceholder />

      {/* ━━━ 유명인 (FREE) ━━━ */}
      {profile.celebrities.length > 0 && (
        <Section icon="⭐" title={`같은 유형(${result.mbti.type})의 유명인`}>
          <div className="flex gap-2 flex-wrap">
            {profile.celebrities.map((c, i) => (
              <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-100">{c}</span>
            ))}
          </div>
        </Section>
      )}

      <NextPageCTA
        href="/result/love"
        icon="❤️"
        title="연애할 때 당신은"
        description="기질과 성격이 만들어내는 당신만의 사랑 방식과 궁합"
      />
    </div>
  );
}
