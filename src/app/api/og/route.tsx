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

// 블로그 카테고리 한글 라벨
const categoryLabels: Record<string, string> = {
  compatibility: '궁합',
  mbti: 'MBTI',
  temperament: '기질론',
  career: '커리어',
  guide: '가이드',
  psychology: '심리학',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  // ━━━ type=blog: 블로그 포스트용 OG 이미지 ━━━
  if (type === 'blog') {
    const title = searchParams.get('title') ?? '블로그';
    const category = searchParams.get('category') ?? '';
    const categoryLabel = categoryLabels[category] ?? category;

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
            background: 'linear-gradient(145deg, #1B2A4A 0%, #0F1B33 50%, #1B2A4A 100%)',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 배경 장식 원 */}
          <div style={{
            position: 'absolute', top: '-120px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.08)', display: 'flex',
          }} />
          <div style={{
            position: 'absolute', bottom: '-100px', left: '-60px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.06)', display: 'flex',
          }} />

          {/* 좌측 장식 라인 */}
          <div style={{
            position: 'absolute', left: '0', top: '0', bottom: '0', width: '6px',
            background: 'linear-gradient(180deg, #6366F1, #A855F7, transparent)',
            display: 'flex',
          }} />

          {/* 상단 브랜딩 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '40px',
            }}
          >
            <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.5px' }}>192types.com</span>
            <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>|</span>
            <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>블로그</span>
          </div>

          {/* 카테고리 배지 */}
          {categoryLabel && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                borderRadius: '50px',
                padding: '8px 24px',
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '20px', color: '#A5B4FC', fontWeight: 700, letterSpacing: '0.5px' }}>{categoryLabel}</span>
            </div>
          )}

          {/* 블로그 제목 */}
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              fontSize: title.length > 30 ? '48px' : '56px',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.3,
              letterSpacing: '-1px',
              maxWidth: '1000px',
              padding: '0 40px',
            }}
          >
            {title}
          </div>

          {/* 하단 CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '48px',
              padding: '12px 36px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
            }}
          >
            <span style={{ fontSize: '20px', color: 'white', fontWeight: 700 }}>192 성격 유형 검사 바로가기 →</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  // ━━━ type=home: 홈페이지용 OG 이미지 ━━━
  if (type === 'home') {
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
            background: 'linear-gradient(145deg, #0F172A 0%, #1E1B4B 40%, #312E81 70%, #0F172A 100%)',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 배경 장식 */}
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.1)', display: 'flex',
          }} />
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.08)', display: 'flex',
          }} />

          {/* 상단 브랜드 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '1px' }}>192types.com</span>
          </div>

          {/* 기질 이모지 라인 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            {['🌞', '🔥', '🌿', '🌊'].map((emoji) => (
              <div
                key={emoji}
                style={{
                  display: 'flex',
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                }}
              >
                {emoji}
              </div>
            ))}
          </div>

          {/* 메인 타이틀 */}
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #F59E0B, #EC4899, #A855F7)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.15,
              letterSpacing: '-2px',
              marginBottom: '16px',
            }}
          >
            192 성격 유형 검사
          </div>

          {/* 서브타이틀 */}
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '-0.5px',
              marginBottom: '40px',
            }}
          >
            MBTI + 히포크라테스 기질론
          </div>

          {/* 정보 태그 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {['100문항 정밀 검사', '완전 무료', '회원가입 불필요'].map((text) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  padding: '10px 24px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  // ━━━ 기본: 성격 유형 결과용 OG 이미지 ━━━
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
