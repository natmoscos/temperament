'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import { PremiumSectionTeaser } from '@/components/PremiumTeaser';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function LovePage() {
  const { result, profile, loading } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  const mbti = result.mbti;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className="text-sm text-indigo-500 font-medium">{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">연애 & 궁합</h1>
      </div>

      {/* ━━━ 연애 스타일 (FREE) ━━━ */}
      <Section icon="❤️" title="연애할 때 당신은" subtitle="기질과 성격이 만들어내는 당신만의 사랑 방식">
        <Paragraph text={profile.loveNarrative} />
        {profile.bestMatch.length > 0 && (
          <div className="mt-5 bg-pink-50 rounded-xl p-4 border border-pink-100">
            <p className="text-sm font-semibold text-pink-700 mb-2">MBTI 기준 추천 궁합</p>
            <div className="flex gap-2 flex-wrap">
              {profile.bestMatch.map((m) => (
                <span key={m} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-lg text-sm font-medium">{m}</span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <AdPlaceholder />

      {/* ━━━ 연애 핵심 키워드 (FREE) ━━━ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-2">💕 사랑의 언어</p>
          <p className="text-[15px] text-gray-700 leading-relaxed">{profile.primaryTemperament.loveLanguage}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-2">💔 관계의 딜브레이커</p>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            {mbti.type === 'ISTJ' ? '도덕적 일관성 결여, 약속 불이행' :
             mbti.type === 'ISFJ' ? '감정에 대한 무감각, 당연하게 여기는 태도' :
             mbti.type === 'INFJ' ? '피상적인 관계, 거짓, 신뢰 불가' :
             mbti.type === 'INTJ' ? '거짓말과 불성실, 성장을 추구하지 않는 태도' :
             mbti.type === 'ENFP' ? '가능성을 닫고, 꿈을 비웃는 태도' :
             mbti.type === 'ENTP' ? '지적 대화 불가, 정체된 관계' :
             mbti.type === 'ENFJ' ? '냉담함, 성장 거부' :
             mbti.type === 'ENTJ' ? '무능력, 의지 부족, 비전 없음' :
             '진정성 부족, 가치관 충돌'}
          </p>
        </div>
      </div>

      {/* ━━━ 연애 상세 (PREMIUM) ━━━ */}
      <PremiumSectionTeaser
        icon="🌹"
        title="기질이 만드는 연애 패턴"
        subtitle="히포크라테스 기질론으로 보는 당신의 사랑"
        content={profile.primaryTemperament.loveDetail}
      />

      <AdPlaceholder />

      {/* ━━━ 궁합 검사 유도 ━━━ */}
      <a
        href="/compatibility"
        className="block bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100 p-6 sm:p-8 text-center hover:shadow-lg hover:border-pink-200 transition group"
      >
        <p className="text-3xl mb-3">💘</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition">궁합 검사하기</h3>
        <p className="text-sm text-gray-500 mb-4">
          나와 상대방의 MBTI + 기질을 비교하여<br />
          관계의 강점, 주의점, 소통법을 분석합니다
        </p>
        <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-bold shadow-md group-hover:shadow-lg transition">
          궁합 확인하기 →
        </span>
      </a>

      <NextPageCTA
        href="/result/career"
        icon="🚀"
        title="당신만의 커리어 전략"
        description="MBTI + 기질이 알려주는 당신에게 맞는 일과 환경"
      />
    </div>
  );
}
