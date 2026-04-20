/**
 * StrengthsWeaknessesSection — 16personalities 벤치마크
 *
 * 장점(Strengths)과 약점(Weaknesses)을 bullet 리스트로 병렬 제시.
 * - 데스크톱: 좌우 분할 (Strengths / Weaknesses)
 * - 모바일: 상하 스택
 *
 * 데이터: IntegratedProfile.strengths[] (7개) + weaknessBullets[] (6개)
 *
 * 왜 중요한가:
 *  - AdSense 심사: "긴 문단 + bullet 리스트" 구조가 SEO·스캔성 모두 유리
 *  - 체류시간: 독자가 자기 유형의 강점·약점을 훑으며 자연스럽게 스크롤
 *  - 학술 신뢰: 기존의 weaknessInsight(긴 문단)와 중복 아닌 보완 관계
 */

interface Props {
  strengths: string[];
  weaknesses: string[];
  mbtiType: string;
}

export default function StrengthsWeaknessesSection({ strengths, weaknesses, mbtiType }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          강점과 약점
        </h3>
        <p className="text-sm text-gray-400 mt-1 ml-9">
          {mbtiType} 유형과 기질이 결합되어 나타나는 당신만의 패턴
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ─── 강점 ─── */}
        <section className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5">
          <h4 className="flex items-center gap-2 text-base font-bold text-emerald-700 mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm">✓</span>
            강점 <span className="text-xs font-medium text-emerald-600/70 ml-1">({strengths.length}가지)</span>
          </h4>
          <ul className="space-y-2.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-[14.5px] text-gray-700 leading-relaxed">
                <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 약점 ─── */}
        <section className="bg-amber-50/40 border border-amber-100 rounded-xl p-5">
          <h4 className="flex items-center gap-2 text-base font-bold text-amber-700 mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-sm">⚠</span>
            약점 <span className="text-xs font-medium text-amber-600/70 ml-1">({weaknesses.length}가지)</span>
          </h4>
          <ul className="space-y-2.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex gap-2 text-[14.5px] text-gray-700 leading-relaxed">
                <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-5 text-xs text-gray-400 leading-relaxed">
        * 강점과 약점은 동전의 양면입니다. 같은 특성이 맥락에 따라 다르게 작용하며, 이를 인식하는 것이 성장의 시작입니다.
      </p>
    </div>
  );
}
