'use client';

import { useResult } from '@/hooks/useResult';
import { Section, Paragraph, LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function CareerPage() {
  const { result, profile, loading } = useResult();

  if (loading || !result || !profile) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* 페이지 타이틀 */}
      <div className="text-center py-4">
        <p className="text-sm text-indigo-500 font-medium">{result.fullCode}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">커리어 전략</h1>
      </div>

      {/* ━━━ 커리어 가이드 ━━━ */}
      <Section icon="🚀" title="당신만의 커리어 전략" subtitle="MBTI + 기질이 알려주는 당신에게 맞는 일과 환경">
        <Paragraph text={profile.careerGuide} />
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.careers.map((c, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">{c}</span>
          ))}
        </div>
      </Section>

      <AdPlaceholder />

      {/* ━━━ 업무 환경 매트릭스 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span className="text-2xl">🏢</span>업무 환경 적합도
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: '혼자 집중하는 환경',
              score: ['I', 'M', 'P'].filter(t => result.mbti.type.includes(t) || result.temperament.code.includes(t)).length,
            },
            {
              label: '팀 협업 환경',
              score: ['E', 'F', 'S'].filter(t => result.mbti.type.includes(t) || result.temperament.code[0] === t).length,
            },
            {
              label: '도전적/경쟁적 환경',
              score: ['E', 'T', 'J'].filter(t => result.mbti.type.includes(t)).length + (result.temperament.code.includes('C') ? 1 : 0),
            },
            {
              label: '안정적/체계적 환경',
              score: ['S', 'J'].filter(t => result.mbti.type.includes(t)).length + (result.temperament.code.includes('P') ? 1 : 0) + (result.temperament.code.includes('M') ? 1 : 0),
            },
            {
              label: '창의적/자유로운 환경',
              score: ['N', 'P'].filter(t => result.mbti.type.includes(t)).length + (result.temperament.code[0] === 'S' ? 1 : 0),
            },
            {
              label: '리더십/관리 역할',
              score: ['E', 'J', 'T'].filter(t => result.mbti.type.includes(t)).length + (result.temperament.code.includes('C') ? 1 : 0),
            },
          ].map((item) => {
            const maxScore = 4;
            const pct = Math.min(100, (item.score / maxScore) * 100);
            return (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="text-indigo-600 font-semibold">{Math.round(pct)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
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
