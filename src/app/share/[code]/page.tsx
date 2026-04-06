import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

// MBTI 닉네임 (서버 컴포넌트에서 사용)
const mbtiNicknames: Record<string, { nickname: string; emoji: string }> = {
  ISTJ: { nickname: '신뢰의 수호자', emoji: '🛡️' },
  ISFJ: { nickname: '따뜻한 수호자', emoji: '🌸' },
  INFJ: { nickname: '통찰의 예언자', emoji: '🔮' },
  INTJ: { nickname: '전략의 설계자', emoji: '♟️' },
  ISTP: { nickname: '냉철한 장인', emoji: '🔧' },
  ISFP: { nickname: '호기심 많은 예술가', emoji: '🎨' },
  INFP: { nickname: '이상의 중재자', emoji: '🦋' },
  INTP: { nickname: '논리의 사색가', emoji: '🧠' },
  ESTP: { nickname: '모험의 사업가', emoji: '🏄' },
  ESFP: { nickname: '자유로운 연예인', emoji: '🎭' },
  ENFP: { nickname: '열정의 캠페이너', emoji: '🌟' },
  ENTP: { nickname: '발명의 토론가', emoji: '💡' },
  ESTJ: { nickname: '엄격한 관리자', emoji: '📋' },
  ESFJ: { nickname: '사교의 외교관', emoji: '🤝' },
  ENFJ: { nickname: '정의의 선도자', emoji: '🌈' },
  ENTJ: { nickname: '대담한 통솔자', emoji: '👑' },
};

const tempNicknames: Record<string, string> = {
  SC: '탁월한 지도자', SP: '즐거움을 주는 사람', SM: '섬세한 팔방미인',
  CS: '타고난 카리스마', CP: '타고난 행정가', CM: '섬세하고 뛰어난 언변가',
  PS: '관계가 편안한 사람', PC: '잠재력이 뛰어난 사람', PM: '성실한 후원자',
  MS: '인간적인 사람', MC: '철저한 준비성의 사람', MP: '탁월한 전문가',
};

function parseCode(code: string) {
  const decoded = decodeURIComponent(code).toUpperCase();
  const parts = decoded.split('-');
  const mbtiType = parts[0] ?? 'ENFJ';
  const tempCode = parts[1] ?? 'SC';
  const fullCode = `${mbtiType}-${tempCode}`;
  const mbtiInfo = mbtiNicknames[mbtiType] ?? { nickname: '탐험가', emoji: '✨' };
  const tempNickname = tempNicknames[tempCode] ?? '독특한 조합';
  return { fullCode, mbtiType, tempCode, mbtiInfo, tempNickname };
}

// 동적 메타데이터 (OG 이미지 포함)
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const { fullCode, mbtiInfo, tempNickname } = parseCode(code);

  const title = `${fullCode} — ${mbtiInfo.emoji} ${mbtiInfo.nickname} | 192 성격 유형 검사`;
  const description = `${fullCode} 유형: ${mbtiInfo.nickname} × ${tempNickname}. MBTI와 히포크라테스 기질론을 결합한 192가지 성격 유형 중 당신의 유형을 확인하세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://192types.com'}/share/${code}`,
    },
    openGraph: {
      title,
      description,
      images: [`/api/og?code=${fullCode}`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?code=${fullCode}`],
    },
  };
}

// 192가지 유형의 정적 경로 생성
export function generateStaticParams() {
  const mbtiTypes = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
  const tempCodes = ['SC','SP','SM','CS','CP','CM','PS','PC','PM','MS','MC','MP'];
  const params: { code: string }[] = [];
  for (const m of mbtiTypes) {
    for (const t of tempCodes) {
      params.push({ code: `${m}-${t}` });
    }
  }
  return params;
}

// 공유 랜딩 페이지
export default async function SharePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { fullCode, mbtiType, tempCode, mbtiInfo, tempNickname } = parseCode(code);

  const primaryTemp = tempCode[0];
  const bgColor = primaryTemp === 'S' ? 'from-amber-50 via-orange-50 to-amber-50' :
                  primaryTemp === 'C' ? 'from-red-50 via-rose-50 to-red-50' :
                  primaryTemp === 'P' ? 'from-emerald-50 via-green-50 to-emerald-50' :
                  'from-blue-50 via-indigo-50 to-blue-50';

  const accentColor = primaryTemp === 'S' ? 'text-amber-600' :
                      primaryTemp === 'C' ? 'text-red-600' :
                      primaryTemp === 'P' ? 'text-emerald-600' :
                      'text-blue-600';

  const accentBorder = primaryTemp === 'S' ? 'border-amber-200' :
                       primaryTemp === 'C' ? 'border-red-200' :
                       primaryTemp === 'P' ? 'border-emerald-200' :
                       'border-blue-200';

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColor} flex flex-col items-center justify-center px-4 py-12`}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '성격 유형', item: `${SITE_URL}/types` },
          { '@type': 'ListItem', position: 3, name: fullCode },
        ],
      }} />
      <div className="w-full max-w-lg text-center space-y-6">

        {/* 상단 브랜딩 */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-5 py-2 shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-indigo-600">192 성격 유형 검사</span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-gray-400">친구의 결과</span>
        </div>

        {/* 훅 메시지 */}
        <p className="text-lg font-semibold text-gray-700">
          친구가 자신의 숨겨진 성격을 발견했어요
        </p>

        {/* 메인 유형 코드 */}
        <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight py-2">
          {fullCode}
        </h1>

        {/* 닉네임 */}
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-800">{mbtiInfo.emoji} {mbtiInfo.nickname}</p>
          <p className={`text-lg font-semibold ${accentColor}`}>&ldquo;{tempNickname}&rdquo;</p>
        </div>

        {/* 설명 카드 */}
        <div className={`bg-white rounded-2xl shadow-md border ${accentBorder} p-6 text-left space-y-4`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">🧬</span>
            <div>
              <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
                이 친구는 <strong className="text-indigo-600">{mbtiType}</strong> 유형에 <strong className={accentColor}>{tempNickname}</strong> 기질을 가진,
                192가지 중 하나뿐인 독특한 성격의 소유자!
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-500 text-sm leading-relaxed">
              MBTI 16가지만으로는 부족했다면?
              히포크라테스의 기질론을 결합한 <strong>192가지 성격 유형 검사</strong>로 숨겨진 진짜 나를 발견하세요.
            </p>
          </div>
        </div>

        {/* 메인 CTA 버튼 */}
        <div className="space-y-3 pt-2">
          <Link
            href="/test"
            className="block w-full px-8 py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            나도 내 유형 확인하기 (무료)
          </Link>
          <p className="text-xs text-gray-400">약 12~15분 소요 | 100문항 | 회원가입 불필요</p>
        </div>

        {/* 궁합 유도 카드 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-indigo-100 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            💘 검사를 완료하면?
          </p>
          <p className="text-sm text-gray-500">
            <strong className="text-indigo-600">{fullCode}</strong> 유형과의 궁합 분석도 바로 확인할 수 있어요!
          </p>
        </div>

        {/* 부가 CTA */}
        <Link
          href="/"
          className="inline-block text-sm text-gray-400 hover:text-gray-600 transition underline underline-offset-4"
        >
          192 성격 유형 검사 알아보기
        </Link>
      </div>
    </div>
  );
}
