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
    eysenck: '안정적 외향형 (Stable Extravert)',
    keywords: ['사교적', '낙관적', '충동적', '유머러스', '에너지 넘침'],
    summary: '어디서든 분위기를 밝히는 사람. 사람들 속에서 에너지를 얻으며, 새로운 경험을 끊임없이 추구합니다. 감정의 회복이 빠르고 자연스러운 리더십을 발휘하지만, 한 가지에 오래 집중하는 것은 도전입니다.',
    stressResponse: '도피(Flight) — 더 많은 활동과 사교로 해소하려 합니다',
    neuroscience: '도파민 시스템 우세 (Helen Fisher: 탐험가형)',
  },
  {
    code: 'C', name: '담즙질', nameEn: 'Choleric', emoji: '⚡',
    color: 'from-red-400 to-rose-500', bg: 'bg-red-50 border-red-200',
    element: '불(Fire)', season: '여름', humor: '황담즙(Yellow Bile)',
    eysenck: '불안정 외향형 (Unstable Extravert)',
    keywords: ['목표지향', '리더십', '결단력', '경쟁적', '독립적'],
    summary: '세상에 자신의 흔적을 남기려는 사람. 목표를 향해 강하게 밀어붙이며, 위기에서 빛납니다. 빠른 결단력과 행동력이 강점이지만, 타인의 감정을 간과하고 독선적이 될 수 있습니다.',
    stressResponse: '투쟁(Fight) — 스트레스 원인을 직접 공격하고 통제하려 합니다',
    neuroscience: '테스토스테론 시스템 우세 (Helen Fisher: 지휘자형)',
  },
  {
    code: 'P', name: '점액질', nameEn: 'Phlegmatic', emoji: '🌿',
    color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50 border-emerald-200',
    element: '물(Water)', season: '겨울', humor: '점액(Phlegm)',
    eysenck: '안정적 내향형 (Stable Introvert)',
    keywords: ['차분', '인내심', '평화적', '경청', '충성'],
    summary: '세상의 소란 속에서도 고요한 중심을 지키는 사람. 안정적이고 일관되며, 갈등을 중재하는 능력이 탁월합니다. 꾸준하고 믿을 수 있지만, 주도적으로 나서기 어려워하고 안주하는 경향이 있습니다.',
    stressResponse: '순응/동결(Fawn/Freeze) — 자신의 욕구를 억누르고 타인에게 맞춥니다',
    neuroscience: '세로토닌 시스템 우세 (Helen Fisher: 건설자형)',
  },
  {
    code: 'M', name: '우울질', nameEn: 'Melancholic', emoji: '🌙',
    color: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50 border-blue-200',
    element: '흙(Earth)', season: '가을', humor: '흑담즙(Black Bile)',
    eysenck: '불안정 내향형 (Unstable Introvert)',
    keywords: ['분석적', '완벽주의', '깊은 사고', '섬세함', '이상주의'],
    summary: '세상을 있어야 할 모습으로 바라보는 이상주의자. 세부 사항에 대한 놀라운 주의력과 높은 기준을 가지고 있습니다. 깊은 창의성과 분석력이 강점이지만, 자기 비판과 완벽주의에 시달릴 수 있습니다.',
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
      </div>
    </div>
  );
}
