'use client';

/**
 * SVG 캐릭터 아바타 생성기
 * 기질(색상 팔레트 + 분위기) × MBTI(표정 + 소품 + 포즈) = 192가지 조합
 *
 * 디자인 컨셉: 둥글둥글한 미니멀 캐릭터 (플랫 디자인, 소프트 컬러)
 */

interface CharacterAvatarProps {
  mbtiType: string;
  temperamentCode: string;
  size?: number;
  className?: string;
}

// ── 기질별 색상 팔레트 ──
const temperamentPalettes: Record<string, { skin: string; hair: string; outfit: string; outfitDark: string; accent: string; bg: string; bgLight: string }> = {
  S: { skin: '#FDDCB5', hair: '#D4822E', outfit: '#FF9F43', outfitDark: '#E8891A', accent: '#FFD32A', bg: '#FFF3E0', bgLight: '#FFFBF2' }, // 다혈질: 따뜻한 오렌지/골드
  C: { skin: '#F5D0B5', hair: '#5D3A1A', outfit: '#E74C3C', outfitDark: '#C0392B', accent: '#FF6B6B', bg: '#FFEBEE', bgLight: '#FFF5F5' }, // 담즙질: 강렬한 레드
  P: { skin: '#FDE8D0', hair: '#8B7355', outfit: '#2ECC71', outfitDark: '#27AE60', accent: '#A8E6CF', bg: '#E8F5E9', bgLight: '#F1FFF6' }, // 점액질: 차분한 그린
  M: { skin: '#F0D5C4', hair: '#3D3D5C', outfit: '#5B7FE8', outfitDark: '#4A6BC9', accent: '#A29BFE', bg: '#E8EAF6', bgLight: '#F3F4FF' }, // 우울질: 깊은 블루
};

// ── MBTI별 표정/소품 특성 ──
interface MBTICharacterTraits {
  eyeStyle: 'round' | 'sharp' | 'gentle' | 'curious';
  mouthStyle: 'smile' | 'grin' | 'neutral' | 'slight';
  accessory: 'none' | 'glasses' | 'book' | 'star' | 'heart' | 'lightbulb' | 'shield' | 'crown' | 'palette' | 'wrench' | 'flower' | 'music' | 'pen' | 'compass' | 'megaphone' | 'chart' | 'chess';
  headTilt: number;     // 머리 기울기 (-5 ~ 5)
  bodyScale: number;    // 체형 (0.9 ~ 1.1)
  hasBlush: boolean;    // 볼터치
}

const mbtiTraits: Record<string, MBTICharacterTraits> = {
  ISTJ: { eyeStyle: 'sharp', mouthStyle: 'neutral', accessory: 'shield', headTilt: 0, bodyScale: 1.0, hasBlush: false },
  ISFJ: { eyeStyle: 'gentle', mouthStyle: 'slight', accessory: 'flower', headTilt: 3, bodyScale: 0.95, hasBlush: true },
  INFJ: { eyeStyle: 'gentle', mouthStyle: 'slight', accessory: 'book', headTilt: -3, bodyScale: 0.95, hasBlush: false },
  INTJ: { eyeStyle: 'sharp', mouthStyle: 'neutral', accessory: 'chess', headTilt: -2, bodyScale: 1.0, hasBlush: false },
  ISTP: { eyeStyle: 'sharp', mouthStyle: 'neutral', accessory: 'wrench', headTilt: 0, bodyScale: 1.05, hasBlush: false },
  ISFP: { eyeStyle: 'gentle', mouthStyle: 'smile', accessory: 'palette', headTilt: 5, bodyScale: 0.93, hasBlush: true },
  INFP: { eyeStyle: 'curious', mouthStyle: 'slight', accessory: 'pen', headTilt: 4, bodyScale: 0.92, hasBlush: true },
  INTP: { eyeStyle: 'curious', mouthStyle: 'neutral', accessory: 'lightbulb', headTilt: -4, bodyScale: 0.95, hasBlush: false },
  ESTP: { eyeStyle: 'sharp', mouthStyle: 'grin', accessory: 'compass', headTilt: 2, bodyScale: 1.08, hasBlush: false },
  ESFP: { eyeStyle: 'round', mouthStyle: 'grin', accessory: 'star', headTilt: 5, bodyScale: 1.0, hasBlush: true },
  ENFP: { eyeStyle: 'round', mouthStyle: 'grin', accessory: 'star', headTilt: 4, bodyScale: 0.98, hasBlush: true },
  ENTP: { eyeStyle: 'curious', mouthStyle: 'grin', accessory: 'lightbulb', headTilt: -3, bodyScale: 1.02, hasBlush: false },
  ESTJ: { eyeStyle: 'sharp', mouthStyle: 'neutral', accessory: 'chart', headTilt: 0, bodyScale: 1.05, hasBlush: false },
  ESFJ: { eyeStyle: 'gentle', mouthStyle: 'smile', accessory: 'heart', headTilt: 3, bodyScale: 0.98, hasBlush: true },
  ENFJ: { eyeStyle: 'gentle', mouthStyle: 'smile', accessory: 'megaphone', headTilt: 2, bodyScale: 1.0, hasBlush: true },
  ENTJ: { eyeStyle: 'sharp', mouthStyle: 'neutral', accessory: 'crown', headTilt: -1, bodyScale: 1.08, hasBlush: false },
};

// ── 눈 그리기 ──
function renderEyes(style: string, palette: typeof temperamentPalettes.S) {
  const baseY = 72;
  switch (style) {
    case 'round':
      return (<>
        <circle cx="88" cy={baseY} r="5" fill="#2D3436" />
        <circle cx="112" cy={baseY} r="5" fill="#2D3436" />
        <circle cx="90" cy={baseY - 1.5} r="1.8" fill="white" />
        <circle cx="114" cy={baseY - 1.5} r="1.8" fill="white" />
      </>);
    case 'sharp':
      return (<>
        <ellipse cx="88" cy={baseY} rx="4.5" ry="4" fill="#2D3436" />
        <ellipse cx="112" cy={baseY} rx="4.5" ry="4" fill="#2D3436" />
        <line x1="82" y1={baseY - 5} x2="93" y2={baseY - 6} stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        <line x1="107" y1={baseY - 6} x2="118" y2={baseY - 5} stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
      </>);
    case 'gentle':
      return (<>
        <path d={`M84,${baseY} Q88,${baseY - 6} 92,${baseY}`} stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={`M108,${baseY} Q112,${baseY - 6} 116,${baseY}`} stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>);
    case 'curious':
      return (<>
        <circle cx="88" cy={baseY} r="5.5" fill="#2D3436" />
        <circle cx="112" cy={baseY} r="5.5" fill="#2D3436" />
        <circle cx="90" cy={baseY - 2} r="2.2" fill="white" />
        <circle cx="114" cy={baseY - 2} r="2.2" fill="white" />
        <path d={`M83,${baseY - 7} Q88,${baseY - 11} 93,${baseY - 8}`} stroke="#2D3436" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </>);
    default:
      return null;
  }
}

// ── 입 그리기 ──
function renderMouth(style: string) {
  const baseY = 85;
  switch (style) {
    case 'grin':
      return <path d={`M90,${baseY} Q100,${baseY + 10} 110,${baseY}`} stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    case 'smile':
      return <path d={`M93,${baseY} Q100,${baseY + 7} 107,${baseY}`} stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />;
    case 'slight':
      return <path d={`M95,${baseY + 1} Q100,${baseY + 4} 105,${baseY + 1}`} stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />;
    case 'neutral':
      return <line x1="94" y1={baseY + 2} x2="106" y2={baseY + 2} stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />;
    default:
      return null;
  }
}

// ── 소품/액세서리 그리기 ──
function renderAccessory(type: string, accent: string) {
  const x = 148, y = 55;
  switch (type) {
    case 'star':
      return <text x={x} y={y} fontSize="24" textAnchor="middle">✦</text>;
    case 'heart':
      return <text x={x} y={y} fontSize="22" textAnchor="middle">♥</text>;
    case 'lightbulb':
      return <text x={x} y={y} fontSize="22" textAnchor="middle">💡</text>;
    case 'book':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">📖</text>;
    case 'shield':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🛡</text>;
    case 'crown':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">👑</text>;
    case 'palette':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🎨</text>;
    case 'wrench':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🔧</text>;
    case 'flower':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🌸</text>;
    case 'music':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🎵</text>;
    case 'pen':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">✒️</text>;
    case 'compass':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">🧭</text>;
    case 'megaphone':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">📢</text>;
    case 'chart':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">📊</text>;
    case 'chess':
      return <text x={x} y={y} fontSize="20" textAnchor="middle">♟️</text>;
    default:
      return null;
  }
}

// ── 기질별 배경 장식 ──
function renderBackground(temperamentKey: string, palette: typeof temperamentPalettes.S) {
  switch (temperamentKey) {
    case 'S': // 다혈질: 반짝이는 별/동그라미
      return (<>
        <circle cx="30" cy="30" r="4" fill={palette.accent} opacity="0.3" />
        <circle cx="165" cy="25" r="3" fill={palette.accent} opacity="0.4" />
        <circle cx="25" cy="150" r="5" fill={palette.accent} opacity="0.2" />
        <circle cx="170" cy="160" r="3.5" fill={palette.accent} opacity="0.3" />
        <circle cx="50" cy="170" r="2.5" fill={palette.accent} opacity="0.35" />
      </>);
    case 'C': // 담즙질: 날카로운 삼각형/번개
      return (<>
        <polygon points="25,20 30,30 20,30" fill={palette.accent} opacity="0.25" />
        <polygon points="170,25 175,35 165,35" fill={palette.accent} opacity="0.3" />
        <polygon points="20,160 25,170 15,170" fill={palette.accent} opacity="0.2" />
        <polygon points="175,155 180,165 170,165" fill={palette.accent} opacity="0.25" />
      </>);
    case 'P': // 점액질: 부드러운 웨이브/잎
      return (<>
        <path d="M20,35 Q35,25 30,40" stroke={palette.accent} strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M165,30 Q175,22 172,38" stroke={palette.accent} strokeWidth="2" fill="none" opacity="0.25" />
        <circle cx="30" cy="165" r="6" fill={palette.accent} opacity="0.12" />
        <circle cx="165" cy="170" r="8" fill={palette.accent} opacity="0.1" />
      </>);
    case 'M': // 우울질: 별자리/달
      return (<>
        <circle cx="28" cy="28" r="2" fill={palette.accent} opacity="0.4" />
        <circle cx="38" cy="22" r="1.5" fill={palette.accent} opacity="0.3" />
        <line x1="28" y1="28" x2="38" y2="22" stroke={palette.accent} strokeWidth="0.8" opacity="0.2" />
        <circle cx="168" cy="30" r="2" fill={palette.accent} opacity="0.35" />
        <circle cx="160" cy="22" r="1.5" fill={palette.accent} opacity="0.3" />
        <path d="M20,160 Q22,155 26,160 Q22,158 20,160" fill={palette.accent} opacity="0.2" />
      </>);
    default:
      return null;
  }
}

export default function CharacterAvatar({ mbtiType, temperamentCode, size = 200, className = '' }: CharacterAvatarProps) {
  const primaryTemp = temperamentCode[0] || 'S';
  const palette = temperamentPalettes[primaryTemp] || temperamentPalettes.S;
  const traits = mbtiTraits[mbtiType] || mbtiTraits.ISTJ;

  const temperamentLabel: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
  const ariaLabel = `${mbtiType} ${temperamentLabel[primaryTemp] || ''} 캐릭터`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      {/* 배경 원 */}
      <circle cx="100" cy="100" r="98" fill={palette.bg} />
      <circle cx="100" cy="100" r="90" fill={palette.bgLight} />

      {/* 기질별 배경 장식 */}
      {renderBackground(primaryTemp, palette)}

      {/* 몸체 그룹 (기울기 적용) */}
      <g transform={`rotate(${traits.headTilt}, 100, 100) scale(${traits.bodyScale}) translate(${(1 - traits.bodyScale) * 100}, ${(1 - traits.bodyScale) * 50})`}>

        {/* 몸통 */}
        <path
          d="M70,110 Q70,100 80,98 L120,98 Q130,100 130,110 L135,160 Q135,170 125,170 L75,170 Q65,170 65,160 Z"
          fill={palette.outfit}
        />
        {/* 옷깃 / 디테일 */}
        <path
          d="M90,98 L100,115 L110,98"
          stroke={palette.outfitDark}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 목 */}
        <rect x="93" y="92" width="14" height="10" rx="4" fill={palette.skin} />

        {/* 머리 (둥근 형태) */}
        <circle cx="100" cy="68" r="32" fill={palette.skin} />

        {/* 머리카락 */}
        <path
          d={`M70,60 Q72,38 100,36 Q128,38 130,60 Q128,48 100,45 Q72,48 70,60`}
          fill={palette.hair}
        />
        {/* 앞머리 스타일 - MBTI에 따라 약간 다르게 */}
        {(traits.eyeStyle === 'sharp' || traits.eyeStyle === 'curious') ? (
          <path d="M75,55 Q85,42 100,44 Q90,50 82,55" fill={palette.hair} />
        ) : (
          <path d="M72,58 Q80,44 95,46 Q85,52 78,58" fill={palette.hair} />
        )}

        {/* 눈 */}
        {renderEyes(traits.eyeStyle, palette)}

        {/* 볼터치 */}
        {traits.hasBlush && (<>
          <circle cx="80" cy="80" r="5" fill="#FFB7B7" opacity="0.4" />
          <circle cx="120" cy="80" r="5" fill="#FFB7B7" opacity="0.4" />
        </>)}

        {/* 입 */}
        {renderMouth(traits.mouthStyle)}

        {/* 팔 (왼쪽) */}
        <path
          d="M70,105 Q55,120 52,140"
          stroke={palette.outfit}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* 손 (왼쪽) */}
        <circle cx="52" cy="142" r="7" fill={palette.skin} />

        {/* 팔 (오른쪽 - 소품을 향해) */}
        <path
          d="M130,105 Q145,115 148,130"
          stroke={palette.outfit}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* 손 (오른쪽) */}
        <circle cx="148" cy="132" r="7" fill={palette.skin} />
      </g>

      {/* 소품 (회전 밖에 배치) */}
      {renderAccessory(traits.accessory, palette.accent)}
    </svg>
  );
}

// ── 결과 페이지 상단 히어로용 큰 캐릭터 ──
export function HeroCharacter({ mbtiType, temperamentCode }: { mbtiType: string; temperamentCode: string }) {
  const primaryTemp = temperamentCode[0] || 'S';
  const palette = temperamentPalettes[primaryTemp] || temperamentPalettes.S;

  return (
    <div className="relative flex items-center justify-center">
      {/* 글로우 이펙트 */}
      <div
        className="absolute w-48 h-48 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: palette.accent }}
      />
      <CharacterAvatar
        mbtiType={mbtiType}
        temperamentCode={temperamentCode}
        size={200}
        className="relative z-10 drop-shadow-lg"
      />
    </div>
  );
}

// ── 랜딩 페이지용 미니 캐릭터 그리드 ──
export function MiniCharacterGrid() {
  const samples = [
    { mbti: 'ENFP', temp: 'SC' },
    { mbti: 'INTJ', temp: 'MC' },
    { mbti: 'ISFJ', temp: 'PS' },
    { mbti: 'ESTP', temp: 'CS' },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {samples.map((s, i) => (
        <CharacterAvatar
          key={i}
          mbtiType={s.mbti}
          temperamentCode={s.temp}
          size={64}
          className="opacity-80 hover:opacity-100 transition-opacity"
        />
      ))}
    </div>
  );
}
