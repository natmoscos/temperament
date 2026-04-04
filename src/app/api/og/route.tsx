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
          background: `linear-gradient(145deg, ${palette.bg1} 0%, ${palette.bg2} 40%, white 70%, ${palette.bg1} 100%)`,
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 대형 장식 원 */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: palette.bg2, opacity: 0.3, display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: palette.bg2, opacity: 0.2, display: 'flex',
        }} />

        {/* 배경 이모지 장식 */}
        <div style={{ position: 'absolute', top: '50px', left: '70px', fontSize: '90px', opacity: 0.1, display: 'flex' }}>
          {palette.emoji}
        </div>
        <div style={{ position: 'absolute', bottom: '50px', right: '70px', fontSize: '90px', opacity: 0.1, display: 'flex' }}>
          {mbtiInfo.emoji}
        </div>

        {/* 좌측 장식 라인 */}
        <div style={{
          position: 'absolute', left: '0', top: '0', bottom: '0', width: '6px',
          background: `linear-gradient(180deg, ${palette.accent}, transparent)`,
          display: 'flex',
        }} />

        {/* 상단 브랜딩 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '50px',
            padding: '10px 30px',
            marginBottom: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <span style={{ fontSize: '20px', color: '#6366F1', fontWeight: 800, letterSpacing: '-0.5px' }}>192 성격 유형 검사</span>
          <span style={{ fontSize: '16px', color: '#A855F7', fontWeight: 500 }}>결과</span>
        </div>

        {/* 메인 유형 코드 */}
        <div
          style={{
            fontSize: '130px',
            fontWeight: 900,
            letterSpacing: '-4px',
            background: `linear-gradient(135deg, ${palette.accent}, #6366F1, #A855F7)`,
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.05,
            display: 'flex',
            textShadow: '0 2px 40px rgba(99,102,241,0.15)',
          }}
        >
          {code}
        </div>

        {/* MBTI 닉네임 - 크게 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '18px',
            fontSize: '40px',
            fontWeight: 800,
            color: '#1F2937',
            letterSpacing: '-1px',
          }}
        >
          <span>{mbtiInfo.emoji}</span>
          <span>{mbtiInfo.nickname}</span>
        </div>

        {/* 기질 조합 설명 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '10px',
            fontSize: '24px',
            fontWeight: 600,
            color: palette.text,
          }}
        >
          <span style={{
            background: `${palette.bg2}`,
            padding: '4px 14px',
            borderRadius: '8px',
            fontSize: '22px',
          }}>{temperamentPalettes[tempCode[0]]?.name ?? ''}</span>
          <span style={{ color: '#9CA3AF', fontSize: '18px' }}>+</span>
          <span style={{
            background: `${(temperamentPalettes[tempCode[1]] ?? palette).bg2}`,
            padding: '4px 14px',
            borderRadius: '8px',
            fontSize: '22px',
          }}>{temperamentPalettes[tempCode[1]]?.name ?? ''}</span>
          <span style={{ color: '#6B7280', marginLeft: '4px' }}>{tempNickname}</span>
        </div>

        {/* 하단 CTA 버튼 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '36px',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: 'white',
            borderRadius: '20px',
            padding: '16px 44px',
            fontSize: '24px',
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
            letterSpacing: '-0.5px',
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
