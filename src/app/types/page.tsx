import { Metadata } from 'next';
import Link from 'next/link';
import CharacterAvatar from '@/components/CharacterAvatar';

export const metadata: Metadata = {
  title: 'MBTI 16유형 × 기질 12조합 — 192가지 성격 유형 목록',
  description: 'MBTI 16가지 유형과 히포크라테스 기질 12조합으로 만들어지는 192가지 성격 유형을 모두 확인하세요. 각 유형의 특징과 기질 해석을 제공합니다.',
  keywords: ['MBTI 유형', '성격 유형 목록', '192 성격 유형', 'MBTI 16유형', '기질론 조합', 'INTJ', 'ENFP', 'INFJ', 'ENTP'],
  openGraph: {
    title: 'MBTI 16유형 × 기질 12조합 — 192가지 성격 유형 목록',
    description: 'MBTI 16가지 유형과 히포크라테스 기질 12조합으로 만들어지는 192가지 성격 유형을 모두 확인하세요.',
  },
};

const typeGroups = [
  {
    group: '분석가형',
    description: '상상력이 풍부하고 전략적인 사고가',
    color: 'from-purple-500 to-indigo-600',
    types: [
      { code: 'INTJ', name: '전략의 설계자', emoji: '♟️', temp: 'MC' },
      { code: 'INTP', name: '논리의 사색가', emoji: '🧠', temp: 'MP' },
      { code: 'ENTJ', name: '대담한 통솔자', emoji: '👑', temp: 'CM' },
      { code: 'ENTP', name: '발명의 토론가', emoji: '💡', temp: 'CS' },
    ],
  },
  {
    group: '외교관형',
    description: '공감 능력이 뛰어나고 이상을 추구하는',
    color: 'from-green-500 to-emerald-600',
    types: [
      { code: 'INFJ', name: '통찰의 예언자', emoji: '🔮', temp: 'MP' },
      { code: 'INFP', name: '이상의 중재자', emoji: '🦋', temp: 'MS' },
      { code: 'ENFJ', name: '정의의 선도자', emoji: '🌈', temp: 'SC' },
      { code: 'ENFP', name: '열정의 캠페이너', emoji: '🌟', temp: 'SM' },
    ],
  },
  {
    group: '관리자형',
    description: '실용적이고 질서를 중시하는',
    color: 'from-blue-500 to-cyan-600',
    types: [
      { code: 'ISTJ', name: '신뢰의 수호자', emoji: '🛡️', temp: 'PM' },
      { code: 'ISFJ', name: '따뜻한 수호자', emoji: '🌸', temp: 'PS' },
      { code: 'ESTJ', name: '엄격한 관리자', emoji: '📋', temp: 'CP' },
      { code: 'ESFJ', name: '사교의 외교관', emoji: '🤝', temp: 'SP' },
    ],
  },
  {
    group: '탐험가형',
    description: '유연하고 실용적인 행동파',
    color: 'from-amber-500 to-orange-600',
    types: [
      { code: 'ISTP', name: '냉철한 장인', emoji: '🔧', temp: 'PC' },
      { code: 'ISFP', name: '호기심 많은 예술가', emoji: '🎨', temp: 'SM' },
      { code: 'ESTP', name: '모험의 사업가', emoji: '🏄', temp: 'CS' },
      { code: 'ESFP', name: '자유로운 연예인', emoji: '🎭', temp: 'SC' },
    ],
  },
];

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">192가지 성격 유형</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            MBTI 16유형 × 히포크라테스 기질 12조합. 각 유형을 클릭하면 상세한 설명과 기질론과의 결합 해석을 확인할 수 있습니다.
          </p>
        </div>

        <div className="space-y-10">
          {typeGroups.map((group) => (
            <div key={group.group}>
              <div className="mb-4">
                <h2 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${group.color}`}>
                  {group.group}
                </h2>
                <p className="text-sm text-gray-400">{group.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {group.types.map((t) => (
                  <Link
                    key={t.code}
                    href={`/types/${t.code.toLowerCase()}`}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 text-center group"
                  >
                    <div className="flex justify-center mb-3">
                      <CharacterAvatar mbtiType={t.code} temperamentCode={t.temp} size={72} />
                    </div>
                    <p className="text-lg font-black text-gray-800 group-hover:text-indigo-600 transition-colors">{t.code}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
