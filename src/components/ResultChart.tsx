'use client';

import { TestResult } from '@/data/types';
import { generateIntegratedProfile } from '@/data/profiles-integrated';
import { HeroCharacter } from '@/components/CharacterAvatar';
import ShareButtons from '@/components/ShareButtons';

const temperamentNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
const temperamentColors: Record<string, string> = { S: 'bg-amber-400', C: 'bg-red-400', P: 'bg-emerald-400', M: 'bg-blue-400' };
const temperamentTextColors: Record<string, string> = { S: 'text-amber-700', C: 'text-red-700', P: 'text-emerald-700', M: 'text-blue-700' };
const temperamentBgColors: Record<string, string> = { S: 'bg-amber-50 border-amber-200', C: 'bg-red-50 border-red-200', P: 'bg-emerald-50 border-emerald-200', M: 'bg-blue-50 border-blue-200' };
const mbtiAxisLabels: Record<string, [string, string]> = { EI: ['외향 (E)', '내향 (I)'], SN: ['직관 (N)', '감각 (S)'], TF: ['감정 (F)', '사고 (T)'], JP: ['인식 (P)', '판단 (J)'] };
const reliabilityInfo: Record<string, { text: string; color: string }> = {
  A: { text: '높은 신뢰도 — 결과를 신뢰할 수 있습니다', color: 'text-green-600 bg-green-50 border-green-200' },
  B: { text: '보통 신뢰도 — 참고용으로 활용하세요', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  C: { text: '낮은 신뢰도 — 조용한 환경에서 재검사를 권장합니다', color: 'text-red-600 bg-red-50 border-red-200' },
};

function Section({ icon, title, subtitle, children, accent }: { icon: string; title: string; subtitle?: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 ${accent ?? ''}`}>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><span className="text-2xl">{icon}</span>{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1 ml-9">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="text-gray-600 leading-[1.85] text-[15px]">{p}</p>
      ))}
    </div>
  );
}

export default function ResultChart({ result }: { result: TestResult }) {
  const { mbti, temperament, reliability } = result;
  const profile = generateIntegratedProfile(mbti, temperament);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* ━━━ 메인 결과 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-10 sm:py-14 px-4 sm:px-6">
        {/* 캐릭터 아바타 */}
        <div className="mb-6">
          <HeroCharacter mbtiType={mbti.type} temperamentCode={temperament.code} />
        </div>

        <p className="text-sm text-gray-400 mb-3">당신의 성격 유형</p>
        <h1 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3 tracking-tight">
          {result.fullCode}
        </h1>
        <p className="text-xl text-gray-700 font-semibold">{profile.mbtiEmoji} {profile.mbtiNickname}</p>
        <p className="text-lg text-gray-500 mt-1">{profile.temperamentNickname}</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.primary.type]} ${temperamentTextColors[temperament.primary.type]}`}>
            1차 {temperamentNames[temperament.primary.type]}
          </span>
          <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.secondary.type]} ${temperamentTextColors[temperament.secondary.type]}`}>
            2차 {temperamentNames[temperament.secondary.type]}
          </span>
        </div>
      </div>

      {/* ━━━ 복합 기질 조합 설명 ━━━ */}
      {profile.dualTemperamentDescription && (
        <div className={`rounded-2xl border p-6 sm:p-8 ${temperamentBgColors[temperament.primary.type]}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧬</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{temperament.code} — "{profile.temperamentNickname}"</h3>
              <p className="text-xs text-gray-500">히포크라테스 12가지 복합 기질 중 당신의 유형</p>
            </div>
          </div>
          <p className="text-gray-700 leading-[1.85] text-[15px]">{profile.dualTemperamentDescription}</p>
        </div>
      )}

      {/* ━━━ 1. 당신은 이런 사람입니다 ━━━ */}
      <Section icon="🪞" title="당신은 이런 사람입니다" subtitle="MBTI와 기질론이 만나 그려내는 당신의 초상화">
        <Paragraph text={profile.personalityNarrative} />
      </Section>

      {/* ━━━ 인지기능 & 인구비율 뱃지 ━━━ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-1">🧬 인지기능 스택</p>
          <p className="text-lg font-bold text-indigo-600 tracking-wide">{profile.cognitiveStack}</p>
          <p className="text-xs text-gray-400 mt-1">주기능 → 보조기능 → 3차기능 → 열등기능</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-1">🌍 인구 비율</p>
          <p className="text-lg font-bold text-purple-600">{profile.population}</p>
          <p className="text-xs text-gray-400 mt-1">전 세계 기준 ({mbti.type} 유형)</p>
        </div>
      </div>

      {/* ━━━ 2. 성향 분석 차트 (간결하게) ━━━ */}
      <Section icon="📊" title="성향 분석" subtitle="숫자로 보는 당신의 내면 지형도">
        <div className="space-y-4 mb-6">
          {(['EI', 'SN', 'TF', 'JP'] as const).map((axis) => {
            const d = mbti.axes[axis];
            const l = d.percentage, r = 100 - d.percentage;
            const lb = mbtiAxisLabels[axis];
            return (
              <div key={axis}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={l >= 50 ? 'text-indigo-600 font-medium' : 'text-gray-400'}>{lb[0]} {l}%</span>
                  <span className={r > 50 ? 'text-purple-600 font-medium' : 'text-gray-400'}>{r}% {lb[1]}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: `${l}%` }} />
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500" style={{ width: `${r}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-100 pt-5">
          <p className="text-sm font-semibold text-gray-500 mb-3">기질 분포</p>
          <div className="space-y-3">
            {(['S', 'C', 'P', 'M'] as const).map((t) => {
              const d = temperament.all[t];
              const is1 = temperament.primary.type === t;
              const is2 = temperament.secondary.type === t;
              return (
                <div key={t}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={is1 ? `font-semibold ${temperamentTextColors[t]}` : is2 ? 'font-medium text-gray-600' : 'text-gray-400'}>
                      {temperamentNames[t]} {is1 ? '(1차)' : is2 ? '(2차)' : ''}
                    </span>
                    <span className={is1 ? temperamentTextColors[t] : 'text-gray-400'}>{d.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${temperamentColors[t]}`} style={{ width: `${d.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ━━━ 3. MBTI만으로는 설명할 수 없었던 것들 (핵심 차별화) ━━━ */}
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

      {/* ━━━ 4. 사람들이 모르는 진짜 당신 ━━━ */}
      <Section icon="🎭" title="사람들이 모르는 진짜 당신" subtitle="밖에서 보이는 모습과 실제 내면 사이의 이야기">
        <Paragraph text={profile.hiddenSelf} />
      </Section>

      {/* ━━━ 5. 대화와 소통의 비밀 ━━━ */}
      <Section icon="💬" title="대화와 소통의 비밀" subtitle="당신이 소통할 때 일어나는 일들">
        <Paragraph text={profile.communicationGuide} />
      </Section>

      {/* ━━━ 6. 연애할 때 당신은 ━━━ */}
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

      {/* ━━━ 7. 극도의 스트레스 (Grip 상태) ━━━ */}
      <Section icon="🌊" title="극도의 스트레스가 올 때" subtitle="열등기능이 폭주하는 순간 — 평소와 전혀 다른 당신이 나타납니다">
        <Paragraph text={profile.gripStressNarrative} />
      </Section>

      {/* ━━━ 8. 당신만의 커리어 전략 ━━━ */}
      <Section icon="🚀" title="당신만의 커리어 전략" subtitle="MBTI + 기질이 알려주는 당신에게 맞는 일과 환경">
        <Paragraph text={profile.careerGuide} />
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.careers.map((c, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">{c}</span>
          ))}
        </div>
      </Section>

      {/* ━━━ 9. 인생 공략집 ━━━ */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-sm border border-indigo-100 p-6 sm:p-8">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📖</span> 당신의 인생 공략집
          </h3>
          <p className="text-sm text-gray-400 mt-1 ml-9">{result.fullCode}로 살아가는 당신을 위한 성장 가이드</p>
        </div>
        <Paragraph text={profile.lifeStrategy} />
      </div>

      {/* ━━━ 10. 부모가 된다면 ━━━ */}
      <Section icon="👨‍👩‍👧‍👦" title="부모가 된다면" subtitle="기질과 성격이 만들어내는 당신만의 양육 스타일">
        <Paragraph text={profile.parentingInsight} />
      </Section>

      {/* ━━━ 기질적 약점과 성장 포인트 ━━━ */}
      <Section icon="⚖️" title="빛과 그림자" subtitle="당신 기질의 약점을 아는 것이 성장의 시작입니다">
        <Paragraph text={profile.weaknessInsight} />
      </Section>

      {/* ━━━ 11. 과학적 근거 ━━━ */}
      <Section icon="🔬" title="과학적 근거" subtitle="Eysenck의 2차원 성격 모델과 신경과학이 설명하는 당신의 기질">
        <Paragraph text={profile.eysenckInsight} />
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-2">🧪 신경과학적 연결</p>
          <Paragraph text={profile.neuroscienceInsight} />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-2">🏺 히포크라테스의 4체액설</p>
          <Paragraph text={profile.humorTheoryInsight} />
        </div>
      </Section>

      {/* ━━━ 12. 같은 유형의 유명인 ━━━ */}
      {profile.celebrities.length > 0 && (
        <Section icon="⭐" title={`같은 유형(${mbti.type})의 유명인`}>
          <div className="flex gap-2 flex-wrap">
            {profile.celebrities.map((c, i) => (
              <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-100">{c}</span>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ 신뢰도 ━━━ */}
      <div className={`rounded-2xl p-4 text-center text-sm font-medium border ${reliabilityInfo[reliability.grade].color}`}>
        검사 신뢰도 {reliability.grade}등급 — {reliabilityInfo[reliability.grade].text}
      </div>

      {/* ━━━ 공유 버튼 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <ShareButtons
          fullCode={result.fullCode}
          mbtiNickname={profile.mbtiNickname}
          temperamentNickname={profile.temperamentNickname}
        />
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
