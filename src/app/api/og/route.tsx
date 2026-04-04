import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 기질별 색상 팔레트
const temperamentPalettes: Record<string, { bg1: string; bg2: string; text: string; accent: string; name: string; emoji: string }> = {
  S: { bg1: '#FFF7ED', bg2: '#FED7AA', text: '#9A3412', accent: '#F97316', name: '다혈질', emoji: '🔥' },
  C: { bg1: '#FEF2F2', bg2: '#FECACA', text: '#991B1B', accent: '#EF4444', name: '담즙질', emoji: '⚡' },
  P: { bg1: '#F0FDF4', bg2: '#BBF7D0', text: '#166534', accent: '#22C55E', name: '점액질', emoji: '🌿' },
  M: { bg1: '#EFF6FF', bg2: '#BFDBFE', text: '#1E40AF', accent: '#3B82F6', name: '우울질', emoji: '🌙' },
};

// MBTI 유형별 닉네임
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

// 기질 조합 닉네임
const tempNicknames: Record<string, string> = {
  SC: '탁월한 지도자', SP: '즐거움을 주는 사람', SM: '섬세한 팔방미인',
  CS: '타고난 카리스마', CP: '타고난 행정가', CM: '섬세하고 뛰어난 언변가',
  PS: '관계가 편안한 사람', PC: '잠재력이 뛰어난 사람', PM: '성실한 후원자',
  MS: '인간적인 사람', MC: '철저한 준비성의 사람', MP: '탁월한 전문가',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') ?? 'ENFJ-SC';

  // 코드 파싱: "ENFJ-SC" → mbti="ENFJ", temp="SC"
  const parts = code.split('-');
  const mbtiType = parts[0] ?? 'ENFJ';
  const tempCode = parts[1] ?? 'SC';
  const primaryTemp = tempCode[0] ?? 'S';

  const palette = temperamentPalettes[primaryTemp] ?? temperamentPalettes['S'];
  const mbtiInfo = mbtiNicknames[mbtiType] ?? { nickname: '탐험가', emoji: '✨' };
  const tempNickname = tempNicknames[tempCode] ?? '독특한 조합';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${palette.bg1} 0%, ${palette.bg2} 50%, ${palette.bg1} 100%)`,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div style={{ position: 'absolute', top: '40px', left: '60px', fontSize: '80px', opacity: 0.15, display: 'flex' }}>
          {palette.emoji}
        </div>
        <div style={{ position: 'absolute', bottom: '40px', right: '60px', fontSize: '80px', opacity: 0.15, display: 'flex' }}>
          {mbtiInfo.emoji}
        </div>
        <div style={{ position: 'absolute', top: '40px', right: '80px', fontSize: '60px', opacity: 0.1, display: 'flex' }}>
          {palette.emoji}
        </div>
        <div style={{ position: 'absolute', bottom: '50px', left: '80px', fontSize: '60px', opacity: 0.1, display: 'flex' }}>
          {mbtiInfo.emoji}
        </div>

        {/* 상단 레이블 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '50px',
            padding: '10px 28px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#6366F1', fontWeight: 700 }}>192 성격 유형 검사 결과</span>
        </div>

        {/* 메인 유형 코드 */}
        <div
          style={{
            fontSize: '120px',
            fontWeight: 900,
            letterSpacing: '-3px',
            background: `linear-gradient(135deg, #6366F1, #A855F7)`,
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          {code}
        </div>

        {/* MBTI 닉네임 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '16px',
            fontSize: '36px',
            fontWeight: 700,
            color: '#374151',
          }}
        >
          <span>{mbtiInfo.emoji}</span>
          <span>{mbtiInfo.nickname}</span>
        </div>

        {/* 기질 닉네임 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            fontSize: '26px',
            fontWeight: 500,
            color: palette.text,
          }}
        >
          <span>{tempNickname}</span>
          <span style={{ opacity: 0.6 }}>({temperamentPalettes[tempCode[0]]?.name ?? ''} + {temperamentPalettes[tempCode[1]]?.name ?? ''})</span>
        </div>

        {/* 하단 CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '40px',
            background: '#6366F1',
            color: 'white',
            borderRadius: '16px',
            padding: '14px 36px',
            fontSize: '22px',
            fontWeight: 700,
          }}
        >
          나도 검사하기 →
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
