import { Metadata } from 'next';
import Link from 'next/link';

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
  const bgColor = primaryTemp === 'S' ? 'from-amber-50 to-orange-50' :
                  primaryTemp === 'C' ? 'from-red-50 to-rose-50' :
                  primaryTemp === 'P' ? 'from-emerald-50 to-green-50' :
                  'from-blue-50 to-indigo-50';

  const accentColor = primaryTemp === 'S' ? 'text-amber-600' :
                      primaryTemp === 'C' ? 'text-red-600' :
                      primaryTemp === 'P' ? 'text-emerald-600' :
                      'text-blue-600';

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColor} flex flex-col items-center justify-center px-4 py-12`}>
      <div className="w-full max-w-lg text-center space-y-6">

        {/* 상단 라벨 */}
        <p className="text-sm text-gray-400">친구의 검사 결과</p>

        {/* 메인 유형 코드 */}
        <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
          {fullCode}
        </h1>

        {/* 닉네임 */}
        <div>
          <p className="text-2xl font-bold text-gray-800">{mbtiInfo.emoji} {mbtiInfo.nickname}</p>
          <p className={`text-lg font-medium mt-1 ${accentColor}`}>{tempNickname}</p>
        </div>

        {/* 설명 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left space-y-3">
          <p className="text-gray-600 text-[15px] leading-relaxed">
            당신의 친구는 <strong>{mbtiType}</strong> 유형에 <strong>{tempNickname}</strong> 기질을 가진,
            세상에서 192가지 중 하나뿐인 독특한 성격의 소유자입니다.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            MBTI 16가지 유형만으로는 설명할 수 없었던 &ldquo;진짜 나&rdquo;를 찾아보세요.
            히포크라테스의 기질론을 결합한 192가지 성격 유형 검사가 당신의 숨겨진 면까지 알려줍니다.
          </p>
        </div>

        {/* CTA 버튼 */}
        <Link
          href="/test"
          className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          나도 검사하기 (무료)
        </Link>

        <p className="text-xs text-gray-400">약 12~15분 소요 | 100문항</p>

        {/* 유형 비교 유도 */}
        <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">
            검사를 완료하면 <strong>{fullCode}</strong> 유형과의 궁합도 확인할 수 있어요!
          </p>
        </div>
      </div>
    </div>
  );
}
