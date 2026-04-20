/**
 * CitationBox — 학술 인용 박스
 *
 * 결과 페이지 각 섹션에 자연스럽게 녹여서 "이 분석은 연구 기반"이라는
 * 신뢰 시그널을 제공. AdSense 심사관 / Google 크롤러 / 독자 모두에게
 * "정보성 사이트" 인상을 남기는 장치.
 *
 * 사용 예시:
 *   <CitationBox
 *     source="Eysenck, H.J. (1967). The Biological Basis of Personality"
 *     quote="외향성은 대뇌 피질의 기본 각성 수준과 반비례한다"
 *     relevance="당신의 외향·내향 성향이 단순한 취향이 아니라 신경생물학적 특성이라는 뜻"
 *   />
 */

interface CitationBoxProps {
  source: string;       // 저자·서명·연도 (예: "Eysenck, H.J. (1967). The Biological Basis of Personality")
  quote: string;        // 핵심 명제 — 직역 아닌 요약/의역
  relevance?: string;   // 이 인용이 당신 결과와 왜 관련 있는지 (선택)
  variant?: 'indigo' | 'rose' | 'emerald' | 'amber';
}

const variantStyles = {
  indigo:  { border: 'border-l-indigo-400',  bg: 'bg-indigo-50/40',   accent: 'text-indigo-700'   },
  rose:    { border: 'border-l-rose-400',    bg: 'bg-rose-50/40',     accent: 'text-rose-700'     },
  emerald: { border: 'border-l-emerald-400', bg: 'bg-emerald-50/40',  accent: 'text-emerald-700'  },
  amber:   { border: 'border-l-amber-400',   bg: 'bg-amber-50/40',    accent: 'text-amber-700'    },
};

export default function CitationBox({
  source,
  quote,
  relevance,
  variant = 'indigo',
}: CitationBoxProps) {
  const style = variantStyles[variant];

  return (
    <figure
      className={`relative border-l-4 ${style.border} ${style.bg} rounded-r-xl pl-5 pr-4 py-4 my-4`}
      aria-label="학술 인용"
    >
      <div className={`absolute top-3 left-3 text-xl ${style.accent} opacity-40 pointer-events-none select-none`}>
        &ldquo;
      </div>
      <blockquote className="text-[15px] text-gray-700 leading-[1.75] pl-5 italic">
        {quote}
      </blockquote>
      <figcaption className={`mt-2 pl-5 text-xs ${style.accent} font-semibold`}>
        — <cite className="not-italic">{source}</cite>
      </figcaption>
      {relevance && (
        <p className="mt-2 pl-5 text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-600">이 연구가 당신에게:</span> {relevance}
        </p>
      )}
    </figure>
  );
}
