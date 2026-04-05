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
    group: '분석가',
    groupEn: 'Analysts',
    description: '직관(N)과 사고(T)를 사용하는 전략가들. 논리와 독창성으로 세상의 구조를 꿰뚫습니다.',
    color: 'bg-purple-600',
    cardBg: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    textColor: 'text-purple-700',
    tagColor: 'text-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700',
    types: [
      { code: 'INTJ', name: '전략의 설계자', tagline: '머릿속에 이미 3수 앞까지 계산된 사람', emoji: '♟️', temp: 'MC' },
      { code: 'INTP', name: '논리의 사색가', tagline: '끝없는 호기심으로 진리를 파헤치는 몽상가', emoji: '🧠', temp: 'MP' },
      { code: 'ENTJ', name: '대담한 통솔자', tagline: '불가능이란 단어가 사전에 없는 타고난 지휘관', emoji: '👑', temp: 'CM' },
      { code: 'ENTP', name: '발명의 토론가', tagline: '지적 도발을 즐기는 아이디어 파괴자', emoji: '💡', temp: 'CS' },
    ],
  },
  {
    group: '외교관',
    groupEn: 'Diplomats',
    description: '직관(N)과 감정(F)을 사용하는 이상주의자들. 공감과 영감으로 더 나은 세상을 꿈꿉니다.',
    color: 'bg-emerald-600',
    cardBg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    textColor: 'text-emerald-700',
    tagColor: 'text-emerald-500',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    types: [
      { code: 'INFJ', name: '통찰의 예언자', tagline: '조용히 세상을 바꾸는 가장 희귀한 영혼', emoji: '🔮', temp: 'MP' },
      { code: 'INFP', name: '이상의 중재자', tagline: '겉은 온화하지만, 안에 불꽃을 품은 시인', emoji: '🦋', temp: 'MS' },
      { code: 'ENFJ', name: '정의의 선도자', tagline: '말 한마디로 사람의 마음을 움직이는 리더', emoji: '🌈', temp: 'SC' },
      { code: 'ENFP', name: '열정의 캠페이너', tagline: '가능성을 보면 멈출 수 없는 자유로운 영혼', emoji: '🌟', temp: 'SM' },
    ],
  },
  {
    group: '관리자',
    groupEn: 'Sentinels',
    description: '감각(S)과 판단(J)을 사용하는 수호자들. 책임감과 신뢰로 세상의 질서를 지킵니다.',
    color: 'bg-sky-600',
    cardBg: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    textColor: 'text-sky-700',
    tagColor: 'text-sky-500',
    badgeColor: 'bg-sky-100 text-sky-700',
    types: [
      { code: 'ISTJ', name: '신뢰의 수호자', tagline: '한 번 맡으면 끝까지 해내는 묵직한 기둥', emoji: '🛡️', temp: 'PM' },
      { code: 'ISFJ', name: '따뜻한 수호자', tagline: '말없이 모두를 챙기는 가장 헌신적인 사람', emoji: '🌸', temp: 'PS' },
      { code: 'ESTJ', name: '엄격한 관리자', tagline: '혼란 속에서도 체계를 세우는 조직의 심장', emoji: '📋', temp: 'CP' },
      { code: 'ESFJ', name: '사교의 외교관', tagline: '주변 사람을 빛나게 만드는 따뜻한 태양', emoji: '🤝', temp: 'SP' },
    ],
  },
  {
    group: '탐험가',
    groupEn: 'Explorers',
    description: '감각(S)과 인식(P)을 사용하는 행동파들. 유연함과 감각으로 지금 이 순간을 지배합니다.',
    color: 'bg-amber-500',
    cardBg: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    textColor: 'text-amber-700',
    tagColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    types: [
      { code: 'ISTP', name: '냉철한 장인', tagline: '손에 잡히는 모든 것을 분해하고 재조립하는 해커', emoji: '🔧', temp: 'PC' },
      { code: 'ISFP', name: '호기심 많은 예술가', tagline: '세상의 아름다움을 몸으로 느끼는 감각주의자', emoji: '🎨', temp: 'SM' },
      { code: 'ESTP', name: '모험의 사업가', tagline: '위험할수록 눈이 빛나는 타고난 승부사', emoji: '🏄', temp: 'CS' },
      { code: 'ESFP', name: '자유로운 연예인', tagline: '이 사람이 등장하면 파티가 시작된다', emoji: '🎭', temp: 'SC' },
    ],
  },
];

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            16가지 성격, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-emerald-500 to-amber-500">192가지 이야기</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            같은 MBTI도 기질이 다르면 완전히 다른 사람입니다.<br className="hidden sm:block" />
            당신의 유형을 클릭하고 숨겨진 차이를 발견하세요.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-12 sm:space-y-16">
          {typeGroups.map((group) => (
            <section key={group.group}>
              {/* 그룹 헤더 */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1.5 h-10 rounded-full ${group.color}`} />
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-black ${group.textColor}`}>
                    {group.group}
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-500 mb-6 ml-5">{group.description}</p>

              {/* 유형 카드 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.types.map((t) => (
                  <Link
                    key={t.code}
                    href={`/types/${t.code.toLowerCase()}`}
                    className={`rounded-2xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${group.cardBg}`}
                  >
                    {/* 아바타 */}
                    <div className="flex justify-center mb-4">
                      <CharacterAvatar mbtiType={t.code} temperamentCode={t.temp} size={80} />
                    </div>

                    {/* 유형 이름 */}
                    <div className="text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${group.badgeColor}`}>
                        {t.code}
                      </span>
                      <h3 className={`text-lg font-bold ${group.textColor} group-hover:scale-105 transition-transform`}>
                        {t.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        {t.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="mt-16 mb-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
            <p className="text-sm text-gray-400 mb-2">아직 내 유형을 모르겠다면?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              5분이면 충분합니다
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              100문항으로 MBTI + 기질을 동시에 분석합니다.<br />
              192가지 중 당신만의 유형을 찾아보세요.
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-xl shadow-indigo-200/50"
            >
              무료 검사 시작 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
