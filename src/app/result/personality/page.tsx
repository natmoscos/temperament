'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function PersonalityPage() {
  const { result, profile, loading } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className="text-sm text-indigo-500 font-medium">{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">성격 심층 분석</h1>
      </div>

      {/* ━━━ 당신은 이런 사람입니다 ━━━ */}
      <Section icon="🪞" title="당신은 이런 사람입니다" subtitle="MBTI와 기질론이 만나 그려내는 당신의 초상화">
        <Paragraph text={profile.personalityNarrative} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ MBTI만으로는 설명할 수 없었던 것들 ━━━ */}
      {profile.contradictionInsights.length > 0 && (
        <Section icon="🔑" title="MBTI만으로는 설명할 수 없었던 것들" subtitle="기질론이 풀어주는 당신의 모순과 혼란">
          <div className="space-y-5">
            {profile.contradictionInsights.map((insight, i) => (
              <div key={i} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                <p className="text-gray-700 leading-[1.85] text-[15px]">{insight}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ 사람들이 모르는 진짜 당신 ━━━ */}
      <Section icon="🎭" title="사람들이 모르는 진짜 당신" subtitle="밖에서 보이는 모습과 실제 내면 사이의 이야기">
        <Paragraph text={profile.hiddenSelf} />
      </Section>

      {/* ━━━ 대화와 소통의 비밀 ━━━ */}
      <Section icon="💬" title="대화와 소통의 비밀" subtitle="당신이 소통할 때 일어나는 일들">
        <Paragraph text={profile.communicationGuide} />
      </Section>

      <AdPlaceholder />

      {/* ━━━ 유명인 ━━━ */}
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
