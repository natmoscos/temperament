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
    code: 'S',
    name: '다혈질',
    nameEn: 'Sanguine',
    icon: '☀️',
    element: '공기(Air)',
    season: '봄',
    humor: '혈액(Blood)',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    accentBg: 'bg-amber-100',
    tagline: '세상은 즐기라고 있는 것',
    oneLiner: '사람들 사이에서 빛나는 에너지 그 자체. 어디를 가든 분위기가 달라집니다.',
    fullDescription: 'Eysenck 모델에서 안정적 외향(높은 외향성 + 낮은 신경증)에 해당하며, Helen Fisher의 신경과학 분류에서는 도파민 시스템이 지배적인 탐험가형입니다. 분트(Wundt)의 분류로는 감정 변화가 빠르고 감정 강도가 강한 유형으로, 봄의 에너지처럼 퍼져나가고 움직이며 끊임없이 새로운 것을 찾아 나섭니다. 호기심이 많고 창의적이며 즉흥적이고, 정신적 유연성이 뛰어나 어떤 환경에서든 빠르게 적응합니다. 타고난 무대 체질로 사람들을 끌어당기고, 뛰어난 이야기꾼이며, 자기표현에 적극적입니다. 다만 Big Five 성격 모델에서 외향성은 높지만 성실성이 낮은 편으로, 자원해서 나서기는 잘하지만 마무리가 약하고, 넓고 얕은 관계를 맺는 경향이 있습니다.',
    eysenck: '안정적 외향',
    eysenckDesc: '높은 외향성 + 낮은 신경증',
    neuroscience: '도파민 시스템 (탐험가형)',
    stressResponse: '도피 — 더 많은 자극 속으로',
    keywords: ['사교적', '낙관적', '유머', '즉흥적', '에너지', '창의적', '정신적 유연성', '이야기꾼'],
    strengths: '설득력, 분위기 메이커, 빠른 적응력',
    shadows: '산만함, 약속 잊음, 깊이 부족',
    hiddenSelf: '밝은 미소 뒤에는 "나를 진심으로 이해해주는 사람이 있을까?"라는 외로움이 숨어 있습니다. 스킨십을 좋아하고 에너지가 넘치며 주변 사람들을 자연스럽게 움직이게 만들지만, 정작 관계의 깊이는 얕아 진정한 내면을 나눌 상대가 드뭅니다. 순진하고 쉽게 속아넘어가는 면도 있어, 타인에게 이용당하기 쉽습니다.',
    loveStyle: '네 기질 중 가장 로맨틱한 유형입니다. 가장 자주 사랑에 빠지며, 로맨틱한 저녁을 세심하게 계획합니다. 하지만 한 사람에게 깊이 헌신하는 것에는 어려움을 느끼며, 새로운 설렘을 끊임없이 추구하는 경향이 있습니다.',
    parentingHint: '재미있고 사교적이며 열정적인 부모입니다. 아이 같은 에너지로 자녀와 잘 통하지만, 일관성 있는 훈육에는 약한 모습을 보입니다.',
  },
  {
    code: 'C',
    name: '담즙질',
    nameEn: 'Choleric',
    icon: '🔥',
    element: '불(Fire)',
    season: '여름',
    humor: '황담즙(Yellow Bile)',
    color: 'bg-rose-500',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    accentBg: 'bg-rose-100',
    tagline: '멈춰 있으면 뒤처진다',
    oneLiner: '목표가 보이면 돌진합니다. 결과로 말하는 타고난 지휘관.',
    fullDescription: 'Eysenck 모델에서 불안정 외향(높은 외향성 + 높은 신경증)에 해당하며, Helen Fisher의 분류에서는 테스토스테론 시스템이 지배적인 지휘자형입니다. 분석적이고 논리적이며 직접적이고, 결단력과 경쟁심이 강한 것이 핵심 특성입니다. 강한 의지와 투지를 가졌으나 오만에 빠지기 쉬우며, 독립적이고 결단력 있지만 타인의 의견을 무시하는 경향이 있습니다. 스트레스 상황에서는 투쟁 반응이 나타나 스트레스 원인을 직접 공격하고, 더 많은 통제와 더 많은 업무를 떠안으며, 분노가 폭발하고 지배적 행동이 강화됩니다. 평소에는 뛰어난 위임 능력을 발휘하지만, 극심한 스트레스 하에서는 모든 것을 혼자 처리하려 합니다.',
    eysenck: '불안정 외향',
    eysenckDesc: '높은 외향성 + 높은 신경증',
    neuroscience: '테스토스테론 시스템 (지휘자형)',
    stressResponse: '투쟁 — 원인을 직접 공격',
    keywords: ['결단력', '리더십', '경쟁심', '독립적', '목표지향', '분석적', '논리적', '직접적'],
    strengths: '추진력, 위기관리, 빠른 의사결정',
    shadows: '독선, 분노 폭발, 감정 무시',
    hiddenSelf: '강인한 모습 뒤에는 "나는 충분히 잘하고 있는 걸까?"라는 끊임없는 자기 검증이 숨어 있습니다. 큰 그림을 보는 타고난 리더로 자신감 있고 위임을 잘하지만, 관계가 적고 깊은 유대를 형성하기 어렵습니다. 분노가 폭발한 뒤에는 깊은 후회가 따라오지만 그것을 결코 밖으로 드러내지 않습니다.',
    loveStyle: '여러 사람과 동시에 관계하는 것에 관심이 없으며, 젊은 시절 연애 경험이 적은 편입니다. 관심 있는 상대에게는 매우 직접적이고, 관심 없으면 냉정하게 거절합니다. 한번 헌신하면 강렬하게 집중하지만, 관계를 갑작스럽게 끝내버리기도 합니다.',
    parentingHint: '높은 기대치를 가진 권위적인 양육 스타일입니다. 탁월함을 요구하고 규율을 강조하며, 느리게 성장하는 아이에게는 인내심이 부족할 수 있습니다.',
  },
  {
    code: 'P',
    name: '점액질',
    nameEn: 'Phlegmatic',
    icon: '🌊',
    element: '물(Water)',
    season: '겨울',
    humor: '점액(Phlegm)',
    color: 'bg-teal-500',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    accentBg: 'bg-teal-100',
    tagline: '흔들리지 않는 편안함',
    oneLiner: '태풍 속에서도 고요한 호수. 곁에 있으면 이유 없이 안심됩니다.',
    fullDescription: 'Eysenck 모델에서 안정적 내향(낮은 외향성 + 낮은 신경증)에 해당하며, Helen Fisher의 분류에서는 세로토닌 시스템이 지배적인 건설자형입니다. 차분하고 사회적 규범을 따르며 세부 사항에 주의를 기울이고 질서 정연한 것이 특징입니다. 겸손하고 온유하며 조용하지만 재치가 있고, 압박을 잘 견디며 현실을 쾌활하게 받아들입니다. 유능하고 꾸준하며 공감능력이 뛰어나고 친절하지만, 변화를 극도로 싫어하고 현상 유지에 안주하며 우유부단한 면이 있습니다. 스트레스 상황에서는 순응/동결 반응을 보여 남의 비위를 맞추고, 자기 욕구를 억누르며, 극단적인 무기력과 신체적 피로에 빠지기도 합니다. 갈등 회피가 극심하여 오히려 문제를 키우고, 표면 아래에 원한이 쌓일 수 있습니다.',
    eysenck: '안정적 내향',
    eysenckDesc: '낮은 외향성 + 낮은 신경증',
    neuroscience: '세로토닌 시스템 (건설자형)',
    stressResponse: '순응 — 자기 욕구를 억누름',
    keywords: ['차분', '인내심', '경청', '충성', '평화적', '세부지향', '질서정연', '공감능력'],
    strengths: '중재력, 꾸준함, 위기 시 냉정함',
    shadows: '우유부단, 수동성, 변화 회피',
    hiddenSelf: '온화한 겉모습 뒤에는 "누군가 내 목소리에도 귀 기울여주면 좋겠다"는 바람이 숨어 있습니다. 조용하지만 위트가 있고 압박 속에서도 흔들리지 않는 내면의 힘이 있지만, 극단적인 갈등 회피로 인해 문제가 점점 커질 수 있습니다. 표면 아래에 원한이 조용히 축적되며, 수동적 저항의 형태로 표출됩니다.',
    loveStyle: '네 기질 중 가장 충성스럽고 믿음직한 파트너입니다. 헌신하기까지 시간이 걸리지만 한번 마음을 정하면 놀라울 정도로 충실합니다. 평화롭고 안정적인 가정환경을 만들어내지만, 로맨틱한 감정을 말로 표현하는 데 어려움을 겪습니다.',
    parentingHint: '안정감 있고 인내심 강한 양육 스타일입니다. 아이에게 평화로운 환경을 제공하지만, 변화가 필요한 상황에서 결단력이 부족할 수 있습니다.',
  },
  {
    code: 'M',
    name: '우울질',
    nameEn: 'Melancholic',
    icon: '🌙',
    element: '흙(Earth)',
    season: '가을',
    humor: '흑담즙(Black Bile)',
    color: 'bg-indigo-500',
    lightBg: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    accentBg: 'bg-indigo-100',
    tagline: '깊이 없는 삶은 의미 없다',
    oneLiner: '남들이 스쳐 지나가는 곳에서 의미를 찾아냅니다. 완벽을 향한 조용한 집념.',
    fullDescription: 'Eysenck 모델에서 불안정 내향(낮은 외향성 + 높은 신경증)에 해당하며, Helen Fisher의 분류에서는 에스트로겐 시스템이 지배적인 협상가형입니다. 상상력이 풍부하고 직관적이며 공감능력이 뛰어나고 감정 표현이 깊은 것이 특징입니다. 다른 사람들이 스쳐 지나가는 곳에서 아름다움과 의미를 발견하는 깊은 사색가로, 소수의 사람에게 희생적인 사랑을 쏟습니다. 그러나 깊은 감정과 비관적 경향이 공존하며, 상처를 오래 기억하고, 불안, 죄책감, 완벽주의가 뒤엉켜 있습니다. 스트레스 상황에서는 동결/철수 반응을 보여 내면으로 후퇴하고, 분석 마비에 빠져 모든 결정을 과도하게 고민하며, 불면증, 식욕 변화, 긴장성 두통 등 신체 증상이 나타나기도 합니다.',
    eysenck: '불안정 내향',
    eysenckDesc: '낮은 외향성 + 높은 신경증',
    neuroscience: '에스트로겐 시스템 (협상가형)',
    stressResponse: '동결 — 내면으로 철수',
    keywords: ['분석적', '완벽주의', '섬세함', '이상주의', '깊은 사고', '직관적', '공감능력', '희생적'],
    strengths: '분석력, 완성도, 장기 집중력',
    shadows: '자기비판, 비관, 융통성 부족',
    hiddenSelf: '다른 사람이 지나치는 곳에서 아름다움과 의미를 발견하는 깊은 사색가입니다. 소수의 사람에게 희생적인 사랑을 쏟지만, 상처를 받으면 고립 속으로 후퇴합니다. 자기 자신에게 가장 가혹한 비평가가 되어, 끝없는 자기 검열과 높은 기준 사이에서 지쳐가기도 합니다.',
    loveStyle: '네 기질 중 가장 깊고 희생적인 사랑을 합니다. 한번 헌신하면 거의 모든 것을 견디어 내며, 상대를 위해 자신을 기꺼이 내어줍니다. 하지만 불가능하리만치 높은 기준이 관계를 방해할 수 있으며, 사랑받고 있다는 말을 끊임없이 확인해야 안심합니다.',
    parentingHint: '세심하고 헌신적인 양육 스타일입니다. 아이의 감정을 깊이 이해하지만, 완벽주의적 기준을 아이에게도 적용하여 과도한 압박을 줄 수 있습니다.',
  },
];

const dualCombinations = [
  { code: 'SC', name: '열정적 리더', primary: '다혈', secondary: '담즙', primaryColor: 'bg-amber-400', secondaryColor: 'bg-rose-400', desc: '카리스마와 추진력을 겸비한 행동형 지도자' },
  { code: 'SP', name: '온화한 인기인', primary: '다혈', secondary: '점액', primaryColor: 'bg-amber-400', secondaryColor: 'bg-teal-400', desc: '누구와도 편하게 어울리는 분위기 메이커' },
  { code: 'SM', name: '감성적 표현가', primary: '다혈', secondary: '우울', primaryColor: 'bg-amber-400', secondaryColor: 'bg-indigo-400', desc: '밝은 겉모습 뒤에 깊은 내면을 가진 예술가' },
  { code: 'CS', name: '카리스마 지휘관', primary: '담즙', secondary: '다혈', primaryColor: 'bg-rose-400', secondaryColor: 'bg-amber-400', desc: '사람을 끌어당기며 목표를 달성하는 통솔자' },
  { code: 'CP', name: '조용한 전략가', primary: '담즙', secondary: '점액', primaryColor: 'bg-rose-400', secondaryColor: 'bg-teal-400', desc: '차분하지만 결정적 순간에 폭발하는 실행가' },
  { code: 'CM', name: '완벽한 성취자', primary: '담즙', secondary: '우울', primaryColor: 'bg-rose-400', secondaryColor: 'bg-indigo-400', desc: '최고의 기준과 최강의 의지가 만난 완벽주의자' },
  { code: 'PS', name: '편안한 친구', primary: '점액', secondary: '다혈', primaryColor: 'bg-teal-400', secondaryColor: 'bg-amber-400', desc: '안정감과 유쾌함을 동시에 선물하는 사람' },
  { code: 'PC', name: '철벽 참모', primary: '점액', secondary: '담즙', primaryColor: 'bg-teal-400', secondaryColor: 'bg-rose-400', desc: '부드러운 겉모습 속에 강철 같은 의지를 숨긴 사람' },
  { code: 'PM', name: '사려깊은 관찰자', primary: '점액', secondary: '우울', primaryColor: 'bg-teal-400', secondaryColor: 'bg-indigo-400', desc: '조용히 세상을 읽어내는 통찰력의 소유자' },
  { code: 'MS', name: '깊은 표현가', primary: '우울', secondary: '다혈', primaryColor: 'bg-indigo-400', secondaryColor: 'bg-amber-400', desc: '깊이 느끼고 생생하게 표현하는 감수성의 달인' },
  { code: 'MC', name: '철저한 전략가', primary: '우울', secondary: '담즙', primaryColor: 'bg-indigo-400', secondaryColor: 'bg-rose-400', desc: '치밀한 분석에 강한 실행력을 더한 완성형' },
  { code: 'MP', name: '묵묵한 전문가', primary: '우울', secondary: '점액', primaryColor: 'bg-indigo-400', secondaryColor: 'bg-teal-400', desc: '한 분야를 끝까지 파고드는 깊이의 장인' },
];

export default function TemperamentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
          <p className="text-sm text-gray-400 mb-3 tracking-wider">SINCE 400 BC</p>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            2,400년 된 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500">가장 오래된 성격 이론</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            히포크라테스는 사람의 체액이 성격을 결정한다고 보았습니다.<br className="hidden sm:block" />
            현대 심리학이 2,400년 만에 그의 직관이 옳았음을 증명했습니다.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">

        {/* ━━━ 4가지 기질 카드 ━━━ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {temperaments.map((t) => (
            <div key={t.code} className={`rounded-2xl border-2 ${t.borderColor} ${t.lightBg} overflow-hidden transition-all hover:shadow-lg`}>
              {/* 컬러 바 */}
              <div className={`${t.color} h-1.5`} />

              <div className="p-5 sm:p-7">
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{t.icon}</span>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-black ${t.textColor}`}>{t.name}</h2>
                      <p className="text-xs text-gray-400">{t.nameEn} · {t.element} · {t.season}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.accentBg} ${t.textColor}`}>
                    {t.humor}
                  </span>
                </div>

                {/* 태그라인 */}
                <p className={`text-base sm:text-lg font-bold ${t.textColor} mb-2 italic`}>
                  &ldquo;{t.tagline}&rdquo;
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{t.oneLiner}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{t.fullDescription}</p>

                {/* 키워드 */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.keywords.map((k) => (
                    <span key={k} className="px-2.5 py-1 bg-white/70 rounded-full text-xs text-gray-600 border border-white">
                      {k}
                    </span>
                  ))}
                </div>

                {/* 핵심 정보 그리드 */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-gray-400 mb-0.5">Eysenck 분류</p>
                    <p className={`font-bold ${t.textColor}`}>{t.eysenck}</p>
                    <p className="text-gray-400 mt-0.5">{t.eysenckDesc}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-gray-400 mb-0.5">신경과학</p>
                    <p className={`font-bold ${t.textColor}`}>{t.neuroscience}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-gray-400 mb-0.5">💪 강점</p>
                    <p className="font-medium text-gray-700">{t.strengths}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-gray-400 mb-0.5">⚠️ 그림자</p>
                    <p className="font-medium text-gray-700">{t.shadows}</p>
                  </div>
                </div>

                {/* 숨겨진 자아 */}
                <div className="mt-4 bg-white/60 rounded-xl p-4">
                  <p className={`text-xs font-bold ${t.textColor} mb-1.5`}>🎭 숨겨진 내면</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{t.hiddenSelf}</p>
                </div>

                {/* 사랑의 방식 */}
                <div className="mt-2.5 bg-white/60 rounded-xl p-4">
                  <p className={`text-xs font-bold ${t.textColor} mb-1.5`}>💕 사랑의 방식</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{t.loveStyle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ━━━ Eysenck 매핑 차트 ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">🧪 왜 과학자들이 주목하는가</h2>
          <p className="text-sm text-gray-500 mb-6">
            심리학자 Hans Eysenck는 4기질이 뇌의 각성 수준과 자율신경계 반응이라는 <strong>생물학적 기반</strong>을 가지고 있음을 밝혔습니다.
          </p>

          {/* 2x2 Eysenck 그래프 */}
          <div className="relative max-w-sm mx-auto">
            {/* Y축 라벨 */}
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-gray-400 tracking-wider">외향적 (Extravert)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 text-center">
                <p className="text-2xl mb-1">🔥</p>
                <p className="font-black text-rose-700">담즙질</p>
                <p className="text-xs text-gray-400 mt-1">불안정 × 외향</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
                <p className="text-2xl mb-1">☀️</p>
                <p className="font-black text-amber-700">다혈질</p>
                <p className="text-xs text-gray-400 mt-1">안정 × 외향</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-center">
                <p className="text-2xl mb-1">🌙</p>
                <p className="font-black text-indigo-700">우울질</p>
                <p className="text-xs text-gray-400 mt-1">불안정 × 내향</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 text-center">
                <p className="text-2xl mb-1">🌊</p>
                <p className="font-black text-teal-700">점액질</p>
                <p className="text-xs text-gray-400 mt-1">안정 × 내향</p>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs font-bold text-gray-400 tracking-wider">내향적 (Introvert)</span>
            </div>
            {/* X축 라벨 */}
            <div className="flex justify-between mt-1 px-2">
              <span className="text-xs font-bold text-gray-400">불안정</span>
              <span className="text-xs font-bold text-gray-400">안정</span>
            </div>
          </div>
        </div>

        {/* ━━━ 12가지 복합 기질 ━━━ */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">🧬 12가지 복합 기질</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              사람은 하나의 기질로 설명되지 않습니다. 가장 강한 두 기질의 조합이 당신의 진짜 성격입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dualCombinations.map((combo) => (
              <div
                key={combo.code}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* 기질 색상 도트 */}
                  <div className="flex -space-x-1.5">
                    <div className={`w-5 h-5 rounded-full ${combo.primaryColor} border-2 border-white`} />
                    <div className={`w-5 h-5 rounded-full ${combo.secondaryColor} border-2 border-white`} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {combo.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-1.5">
                      {combo.primary}+{combo.secondary} ({combo.code})
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{combo.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ 4원소 인포그래픽 ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">🏺 4원소와 체액의 연결</h2>
          <p className="text-sm text-gray-500 mb-6">
            히포크라테스는 만물이 4원소로 이루어져 있으며, 이에 대응하는 체액의 균형이 성격을 결정한다고 보았습니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '💨', element: '공기', humor: '혈액', season: '봄', quality: '따뜻+습함', color: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
              { icon: '🔥', element: '불', humor: '황담즙', season: '여름', quality: '뜨거움+건조', color: 'bg-rose-50 border-rose-200', text: 'text-rose-700' },
              { icon: '💧', element: '물', humor: '점액', season: '겨울', quality: '차가움+습함', color: 'bg-teal-50 border-teal-200', text: 'text-teal-700' },
              { icon: '🌍', element: '흙', humor: '흑담즙', season: '가을', quality: '차가움+건조', color: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700' },
            ].map((e) => (
              <div key={e.element} className={`rounded-xl p-4 border ${e.color} text-center`}>
                <p className="text-2xl mb-2">{e.icon}</p>
                <p className={`font-black ${e.text}`}>{e.element}</p>
                <p className="text-xs text-gray-500 mt-1">{e.humor} · {e.season}</p>
                <p className="text-xs text-gray-400 mt-0.5">{e.quality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ CTA ━━━ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center mb-12">
          <p className="text-sm text-gray-400 mb-2">내 안에 어떤 기질이 숨어있을까?</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            기질 × MBTI = 192가지 유형
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            같은 MBTI라도 기질이 다르면 완전히 다른 사람입니다.<br />
            검사를 통해 당신만의 조합을 찾아보세요.
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-xl shadow-indigo-200/50"
          >
            무료 검사 시작 →
          </Link>
        </div>

        {/* ━━━ 참고문헌 (접힌 형태) ━━━ */}
        <details className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <h2 className="text-lg font-bold text-gray-800">📚 참고문헌 및 학술적 배경</h2>
            <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▾</span>
          </summary>

          <div className="mt-5 space-y-4">
            <p className="text-sm text-gray-500">
              이 사이트의 기질 분석은 고대 그리스 의학에서 최신 신경과학에 이르는 2,400년간의 학술적 전통을 종합하여 구성되었습니다.
            </p>

            {/* 고대 */}
            <div className="border-l-4 border-amber-400 pl-4 py-2">
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-2">고대</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">히포크라테스 (c. 460–370 BC)</p>
                  <p className="text-xs text-gray-500 italic">&ldquo;On the Nature of Man&rdquo; — 4체액설의 원형</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">갈레노스 (AD 129–c. 216)</p>
                  <p className="text-xs text-gray-500 italic">&ldquo;De Temperamentis&rdquo; — 4기질 유형의 체계화</p>
                </div>
              </div>
            </div>

            {/* 근대 */}
            <div className="border-l-4 border-blue-400 pl-4 py-2">
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">근대</p>
              <div>
                <p className="text-sm font-semibold text-gray-800">임마누엘 칸트 (1798)</p>
                <p className="text-xs text-gray-500 italic">&ldquo;Anthropologie in pragmatischer Hinsicht&rdquo; — 기질론의 철학적 재해석</p>
              </div>
            </div>

            {/* 현대 심리학 */}
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-2">현대 심리학</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">빌헬름 분트 (1903)</p>
                  <p className="text-xs text-gray-500">감정 강도 × 변화 속도 2차원 모델 — 최초의 과학적 기질 모델</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">한스 아이젠크 (1967)</p>
                  <p className="text-xs text-gray-500 italic">&ldquo;The Biological Basis of Personality&rdquo; — 외향성 × 신경증 2차원 매핑</p>
                </div>
              </div>
            </div>

            {/* 응용 */}
            <div className="border-l-4 border-emerald-400 pl-4 py-2">
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-2">응용</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">루돌프 슈타이너 (1919)</p>
                  <p className="text-xs text-gray-500">발도르프 학교 기질 교육 이론</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">팀 라헤이 (1966)</p>
                  <p className="text-xs text-gray-500 italic">&ldquo;Spirit-Controlled Temperament&rdquo; — 12가지 복합 기질 조합</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">데이비드 커시 (1984)</p>
                  <p className="text-xs text-gray-500 italic">&ldquo;Please Understand Me&rdquo; — 기질론과 MBTI의 연결</p>
                </div>
              </div>
            </div>

            {/* 신경과학 */}
            <div className="border-l-4 border-rose-400 pl-4 py-2">
              <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide mb-2">신경과학</p>
              <div>
                <p className="text-sm font-semibold text-gray-800">헬렌 피셔 (2009)</p>
                <p className="text-xs text-gray-500 italic">&ldquo;Why Him? Why Her?&rdquo; — 4가지 신경전달물질 기반 기질 모델</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                본 사이트는 위 학술 전통들을 종합한 다층적 성격 분석 프레임워크를 제공합니다. 학술적 참고 자료이며 임상적 진단 도구가 아닙니다.
              </p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
