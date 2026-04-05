import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '히포크라테스 4가지 기질론 — 다혈질 담즙질 점액질 우울질',
  description: '히포크라테스의 4가지 기질(다혈질, 담즙질, 점액질, 우울질)을 Eysenck 모델과 Helen Fisher 신경과학으로 분석합니다. 12가지 복합 기질 조합도 확인하세요.',
  keywords: ['기질론', '히포크라테스', '4가지 기질', '다혈질', '담즙질', '점액질', '우울질', 'Eysenck', '성격 유형'],
  openGraph: {
    title: '히포크라테스 4가지 기질론 — 다혈질 담즙질 점액질 우울질',
    description: '히포크라테스의 4가지 기질을 현대 심리학으로 분석합니다. Eysenck 모델과 Helen Fisher 신경과학 이론 기반.',
  },
};

const temperaments = [
  {
    code: 'S', name: '다혈질', nameEn: 'Sanguine', emoji: '🔥',
    color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50 border-amber-200',
    element: '공기(Air)', season: '봄', humor: '혈액(Blood)',
    modernLabel: '쾌락을 추구하고 사교적인 (Pleasure-seeking and sociable)',
    eysenck: '안정적 외향형 (Stable Extravert)',
    keywords: ['사교적', '낙관적', '충동적', '유머러스', '에너지 넘침', '빠른 감정 변화', '분위기 중시'],
    summary: '혈액이 우세한 기질로, 밝고 낙관적이며 풍부한 감정 표현과 빠른 감정 변화가 특징입니다. 자발적이고 활동적이며 자극과 변화를 사랑하는 사람 중심의 성격입니다. 아이디어가 풍부하지만 끈기와 후속 실행이 약하고, 세부 사항보다 분위기를 중시합니다. Tim LaHaye는 이 기질을 "감정적 외향형으로, 인기가 많지만 일관성이 부족하다"고 설명합니다. 산만하고 계획성·지속성이 약하며, 감정적·물질적 "과소비" 경향이 약점입니다.',
    stressResponse: '도피(Flight) — 더 많은 활동과 사교로 해소하려 합니다',
    neuroscience: '도파민 시스템 우세 (Helen Fisher: 탐험가형)',
  },
  {
    code: 'C', name: '담즙질', nameEn: 'Choleric', emoji: '⚡',
    color: 'from-red-400 to-rose-500', bg: 'bg-red-50 border-red-200',
    element: '불(Fire)', season: '여름', humor: '황담즙(Yellow Bile)',
    modernLabel: '야심차고 지도자적인 (Ambitious and leader-like)',
    eysenck: '불안정 외향형 (Unstable Extravert)',
    keywords: ['목표지향', '리더십', '결단력', '경쟁적', '독립적', '강한 열정', '통제욕'],
    summary: '황담즙이 우세한 기질로, 강한 열정과 분노, 경쟁심을 가지며 감정을 즉시 행동으로 전환합니다. 능동적이고 결단력이 있으며, 생산성과 성취를 최우선시하는 강한 지배력의 소유자입니다. 목표에 집중하며 전략·조직·의사결정에 탁월하지만, 공격적이고 독단적이며 지배적인 성격으로 타인의 감정을 쉽게 무시할 수 있습니다.',
    stressResponse: '투쟁(Fight) — 스트레스 원인을 직접 공격하고 통제하려 합니다',
    neuroscience: '테스토스테론 시스템 우세 (Helen Fisher: 지휘자형)',
  },
  {
    code: 'P', name: '점액질', nameEn: 'Phlegmatic', emoji: '🌿',
    color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50 border-emerald-200',
    element: '물(Water)', season: '겨울', humor: '점액(Phlegm)',
    modernLabel: '편안하고 사려깊은 (Relaxed and thoughtful)',
    eysenck: '안정적 내향형 (Stable Introvert)',
    keywords: ['차분', '인내심', '평화적', '경청', '충성', '습관 선호', '위험 회피'],
    summary: '점액이 우세한 기질로, 감정 변동이 적고 안정적이며 평화와 조화를 소중히 여깁니다. 느긋하고 차분하며 타협과 중재에 능한 강력한 조정자이자, 습관과 루틴을 선호합니다. 현실적이고 실용적이며 효율과 안정을 고려하는 위험 회피적 사고를 합니다. 다만 수동적이고 우유부단하며, 미루는 경향이 있어 "게으르다"는 인상을 줄 수 있습니다.',
    stressResponse: '순응/동결(Fawn/Freeze) — 자신의 욕구를 억누르고 타인에게 맞춥니다',
    neuroscience: '세로토닌 시스템 우세 (Helen Fisher: 건설자형)',
  },
  {
    code: 'M', name: '우울질', nameEn: 'Melancholic', emoji: '🌙',
    color: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50 border-blue-200',
    element: '흙(Earth)', season: '가을', humor: '흑담즙(Black Bile)',
    modernLabel: '분석적이고 세밀한 (Analytical and literal)',
    eysenck: '불안정 내향형 (Unstable Introvert)',
    keywords: ['분석적', '완벽주의', '깊은 사고', '섬세함', '이상주의', '규칙 준수', '장기 집중'],
    summary: '흑담즙이 우세한 기질로, 감정이 깊고 강렬하며 상처를 오래 기억하고, 불안·죄책감·완벽주의가 뒤섞여 있습니다. 신중하고 규칙을 따르며, 장기 프로젝트·연구·예술에서 강한 인내력을 발휘합니다. 분석적이고 비판적이며 체계적인 사고로 원칙·구조·완성도를 중시합니다. 비관적이고 자책하며, 융통성이 부족하고 지나치게 엄격한 기준을 자신과 타인에게 적용하는 것이 약점입니다.',
    stressResponse: '동결/철수(Freeze/Withdraw) — 내면으로 퇴각하며 비관적이 됩니다',
    neuroscience: '에스트로겐 시스템 우세 (Helen Fisher: 협상가형)',
  },
];

export default function TemperamentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">히포크라테스 기질론</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            2,400년 전 히포크라테스가 제시한 4가지 기질 분류. 현대 심리학의 Eysenck 모델과 Helen Fisher의 신경과학 연구로 과학적 근거가 뒷받침됩니다.
          </p>
        </div>

        {/* Eysenck 2차원 모델 설명 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🔬 Eysenck의 2차원 성격 모델</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            심리학자 Hans Eysenck는 히포크라테스의 4기질을 <strong>외향성-내향성(Extraversion)</strong>과 <strong>신경증-안정성(Neuroticism)</strong> 두 축으로 매핑했습니다. 이 모델은 대뇌 피질의 각성 수준과 자율신경계의 반응성이라는 생물학적 기반을 가지고 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <p className="font-bold text-red-700">담즙질 ⚡</p>
              <p className="text-red-500 text-xs">불안정 + 외향</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="font-bold text-amber-700">다혈질 🔥</p>
              <p className="text-amber-500 text-xs">안정 + 외향</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="font-bold text-blue-700">우울질 🌙</p>
              <p className="text-blue-500 text-xs">불안정 + 내향</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <p className="font-bold text-emerald-700">점액질 🌿</p>
              <p className="text-emerald-500 text-xs">안정 + 내향</p>
            </div>
          </div>
        </div>

        {/* 4가지 기질 카드 */}
        <div className="space-y-6">
          {temperaments.map((t) => (
            <div key={t.code} className={`rounded-2xl border p-6 sm:p-8 ${t.bg}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{t.emoji}</span>
                <div>
                  <h2 className="text-xl font-black text-gray-800">{t.name} ({t.nameEn})</h2>
                  <p className="text-sm text-gray-500">{t.element} · {t.season} · {t.humor}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.modernLabel}</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">{t.summary}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {t.keywords.map((k) => (
                  <span key={k} className="px-2.5 py-1 bg-white/60 rounded-lg text-sm text-gray-600">{k}</span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-white/50 rounded-xl p-3">
                  <p className="font-semibold text-gray-700 mb-1">Eysenck 분류</p>
                  <p className="text-gray-500 text-xs">{t.eysenck}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-3">
                  <p className="font-semibold text-gray-700 mb-1">스트레스 반응</p>
                  <p className="text-gray-500 text-xs">{t.stressResponse}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-3">
                  <p className="font-semibold text-gray-700 mb-1">신경과학</p>
                  <p className="text-gray-500 text-xs">{t.neuroscience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4원소와 체액 이론 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🏺 히포크라테스의 4체액설</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            히포크라테스는 인체가 <strong>불, 물, 공기, 흙</strong>이라는 4원소로 이루어져 있으며, 이에 대응하는 4가지 체액(혈액, 담즙, 점액, 흑담즙)의 균형이 건강과 성격을 결정한다고 보았습니다. 어느 체액이 우세한가에 따라 사람의 기질이 나뉘며, 두 가지 기질을 조합하면 보다 정밀한 성격 분석이 가능합니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-xl mb-1">💨</p>
              <p className="font-bold text-amber-700">공기(Air)</p>
              <p className="text-amber-500 text-xs">혈액 · 봄</p>
              <p className="text-gray-400 text-xs mt-1">따뜻 + 습함</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <p className="text-xl mb-1">🔥</p>
              <p className="font-bold text-red-700">불(Fire)</p>
              <p className="text-red-500 text-xs">황담즙 · 여름</p>
              <p className="text-gray-400 text-xs mt-1">뜨거움 + 건조</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <p className="text-xl mb-1">💧</p>
              <p className="font-bold text-emerald-700">물(Water)</p>
              <p className="text-emerald-500 text-xs">점액 · 겨울</p>
              <p className="text-gray-400 text-xs mt-1">차가움 + 습함</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xl mb-1">🌍</p>
              <p className="font-bold text-blue-700">흙(Earth)</p>
              <p className="text-blue-500 text-xs">흑담즙 · 가을</p>
              <p className="text-gray-400 text-xs mt-1">차가움 + 건조</p>
            </div>
          </div>
        </div>

        {/* 12가지 복합 기질 조합 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">🧬 12가지 복합 기질 유형</h2>
          <p className="text-sm text-gray-500 mb-5">
            가장 비율이 높은 두 가지 기질을 순서대로 조합하여 12가지 복합 유형을 만듭니다. 같은 두 기질이라도 주/보조의 순서에 따라 성격이 달라집니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { code: 'SC', name: '다혈담즙', title: '탁월한 지도자', color: 'bg-amber-50 border-amber-200 text-amber-800' },
              { code: 'CS', name: '담즙다혈', title: '타고난 카리스마', color: 'bg-red-50 border-red-200 text-red-800' },
              { code: 'SP', name: '다혈점액', title: '즐거움을 주는 사람', color: 'bg-amber-50 border-amber-200 text-amber-800' },
              { code: 'PS', name: '점액다혈', title: '관계가 편안한 사람', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
              { code: 'SM', name: '다혈우울', title: '섬세한 팔방미인', color: 'bg-amber-50 border-amber-200 text-amber-800' },
              { code: 'MS', name: '우울다혈', title: '인간적인 사람', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { code: 'CM', name: '담즙우울', title: '섬세하고 뛰어난 언변가', color: 'bg-red-50 border-red-200 text-red-800' },
              { code: 'MC', name: '우울담즙', title: '철저한 준비성의 사람', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { code: 'CP', name: '담즙점액', title: '타고난 행정가', color: 'bg-red-50 border-red-200 text-red-800' },
              { code: 'PC', name: '점액담즙', title: '잠재력이 뛰어난 사람', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
              { code: 'PM', name: '점액우울', title: '성실한 후원자', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
              { code: 'MP', name: '우울점액', title: '탁월한 전문가', color: 'bg-blue-50 border-blue-200 text-blue-800' },
            ].map((combo) => (
              <div key={combo.code} className={`rounded-xl p-3 border ${combo.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">{combo.name}</span>
                    <span className="text-xs ml-2 opacity-70">({combo.code})</span>
                  </div>
                  <span className="text-sm">{combo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MBTI와의 결합 안내 */}
        <div className="mt-10 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-xl font-bold text-gray-800 mb-2">기질론 × MBTI = 192가지 유형</h2>
          <p className="text-gray-600 text-sm mb-4 max-w-lg mx-auto">
            같은 MBTI라도 기질이 다르면 완전히 다른 사람입니다. 검사를 통해 당신만의 고유한 조합을 발견하세요.
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-indigo-200"
          >
            무료 검사 시작하기 →
          </Link>
        </div>

        {/* 참고문헌 및 학술적 배경 */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">📚 참고문헌 및 학술적 배경</h2>
          <p className="text-sm text-gray-500 mb-6">
            이 사이트의 기질 분석은 고대 그리스 의학에서 시작되어 근대 철학, 현대 심리학, 그리고 최신 신경과학에 이르는 2,400년간의 학술적 전통을 종합하여 구성되었습니다.
          </p>

          <div className="space-y-4">
            {/* 고대 */}
            <div className="border-l-4 border-amber-400 pl-4 py-2">
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">고대 (Ancient)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">히포크라테스 (Hippocrates, c. 460–370 BC)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;On the Nature of Man&rdquo; — Corpus Hippocraticum</p>
                  <p className="text-xs text-gray-400 mt-0.5">4체액설(혈액, 황담즙, 점액, 흑담즙)과 4원소(공기, 불, 물, 흙)의 대응 관계를 최초로 체계화. 체액의 균형이 건강과 기질을 결정한다는 이론의 원형을 제시했습니다.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">갈레노스 (Galen, AD 129–c. 216)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;De Temperamentis&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-0.5">히포크라테스의 체액설을 발전시켜 다혈질(Sanguine), 담즙질(Choleric), 점액질(Phlegmatic), 우울질(Melancholic)의 4가지 기질 유형을 명확히 정의하고 체계화했습니다.</p>
                </div>
              </div>
            </div>

            {/* 근대 철학 */}
            <div className="border-l-4 border-blue-400 pl-4 py-2">
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">근대 철학 (Modern Philosophy)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">임마누엘 칸트 (Immanuel Kant, 1798)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;Anthropologie in pragmatischer Hinsicht&rdquo; (관찰적 관점에서 본 인간학)</p>
                  <p className="text-xs text-gray-400 mt-0.5">4기질을 감정(Feeling)과 활동(Activity)의 두 축으로 분류하여 철학적으로 재해석. 기질론을 경험적 인간학의 핵심 주제로 격상시켰습니다.</p>
                </div>
              </div>
            </div>

            {/* 현대 심리학 */}
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">현대 심리학 (Modern Psychology)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">빌헬름 분트 (Wilhelm Wundt, 1903)</p>
                  <p className="text-sm text-gray-600">감정의 강도(Strength of Emotion) × 변화의 속도(Speed of Change) 2차원 모델</p>
                  <p className="text-xs text-gray-400 mt-0.5">실험심리학의 아버지로 불리는 분트가 4기질을 두 가지 독립적 차원에 매핑하여 최초의 과학적 기질 모델을 제시했습니다.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">한스 아이젠크 (Hans Eysenck, 1967)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;The Biological Basis of Personality&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-0.5">4기질을 외향성(Extraversion) × 신경증(Neuroticism) 2차원 모델에 매핑. 대뇌 피질 각성 수준과 자율신경계 반응성이라는 생물학적 기반을 제시하여 기질론에 과학적 근거를 부여했습니다.</p>
                </div>
              </div>
            </div>

            {/* 교육 및 응용 */}
            <div className="border-l-4 border-emerald-400 pl-4 py-2">
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">교육 및 응용 (Education & Applications)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">루돌프 슈타이너 (Rudolf Steiner, 1919)</p>
                  <p className="text-sm text-gray-600">발도르프 학교 기질 교육 이론</p>
                  <p className="text-xs text-gray-400 mt-0.5">4기질론을 교육에 적용하여, 아이의 기질에 맞춘 개별화 교육 방법론을 발도르프(Waldorf) 학교 체계에서 실천했습니다.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">팀 라헤이 (Tim LaHaye, 1966)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;Spirit-Controlled Temperament&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-0.5">4가지 기질의 주/보조 조합으로 12가지 복합 기질 유형을 제안. 단일 기질로는 설명할 수 없는 개인차를 포착하는 실용적 프레임워크를 제시했습니다.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">데이비드 커시 (David Keirsey, 1984)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;Please Understand Me&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-0.5">히포크라테스의 4기질을 MBTI 16유형과 연결하여 기질-성격 통합 모델을 구축. Artisan, Guardian, Idealist, Rational의 4가지 기질 그룹을 제안했습니다.</p>
                </div>
              </div>
            </div>

            {/* 신경과학 */}
            <div className="border-l-4 border-rose-400 pl-4 py-2">
              <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide mb-1">신경과학 (Neuroscience)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">헬렌 피셔 (Helen Fisher, 2009)</p>
                  <p className="text-sm text-gray-600 italic">&ldquo;Why Him? Why Her?&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-0.5">4가지 신경전달물질 시스템 — 도파민(탐험가), 세로토닌(건설자), 테스토스테론(지휘자), 에스트로겐(협상가) — 이 성격과 관계 패턴을 결정한다는 신경화학적 기질 모델을 제시. 고대 4기질론이 뇌과학으로 재확인되었습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Big Five 대응 */}
          <div className="border-l-4 border-gray-400 pl-4 py-2 mt-4">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Big Five 성격 모델과의 대응</p>
            <p className="text-xs text-gray-400 mb-3">현대 성격심리학의 5요인 모델 중 외향성(Extraversion)과 성실성(Conscientiousness) 두 축으로 히포크라테스의 4기질을 매핑할 수 있습니다.</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                <span className="font-bold text-amber-700">다혈질</span>
                <span className="text-gray-500 ml-1">외향성↑ · 성실성↓</span>
              </div>
              <div className="bg-red-50 rounded-lg p-2.5 border border-red-100">
                <span className="font-bold text-red-700">담즙질</span>
                <span className="text-gray-500 ml-1">외향성↑ · 성실성↑</span>
              </div>
              <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                <span className="font-bold text-blue-700">우울질</span>
                <span className="text-gray-500 ml-1">외향성↓ · 성실성↑</span>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                <span className="font-bold text-emerald-700">점액질</span>
                <span className="text-gray-500 ml-1">외향성↓ · 성실성↓</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-500">본 사이트의 접근 방식:</strong> 위 학술 전통들을 종합하여, 히포크라테스-갈레노스의 4기질 분류를 기반으로 Eysenck의 2차원 성격 모델, LaHaye의 12가지 복합 기질 조합, Keirsey의 MBTI 연결, Helen Fisher의 신경화학 이론, 그리고 Big Five 성격 모델과의 대응을 통합한 다층적 성격 분석 프레임워크를 제공합니다. 이는 학술적 참고 자료이며 임상적 진단 도구가 아닙니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
