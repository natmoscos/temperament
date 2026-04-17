// 제휴 커머스 큐레이션 담당 페르소나 정의
// 박서연(ENFP-다혈질 24세) — 블로그 본문 담당
// 이준형(ISTJ-담즙질 41세) — 제품 추천 섹션 담당

export type AffiliatePlatform = 'coupang' | 'oliveyoung' | 'toss';

export interface AffiliatePersona {
  id: string;
  name: string;
  mbti: string;
  age: number;
  role: string;
  bio: string;
  philosophy: string;
  avatarColor: string;    // 브랜드 컬러 hex
  avatarEmoji: string;    // 대표 이모지
  tagline: string;         // 프로필 한 줄 요약
}

// ── 이준형 (제품 추천 담당) ──────────────────────────
export const LEE_JUNHYUNG: AffiliatePersona = {
  id: 'lee-junhyung',
  name: '이준형',
  mbti: 'ISTJ-담즙질',
  age: 41,
  role: '증권사 자산관리팀 차장 12년차',
  bio: '연세대 경영학과 졸업 후 증권사 신입 공채로 입사. 12년째 같은 회사에서 자산관리 전문가로 근무 중. 박서연의 오빠의 대학 선배로 가끔 멘토 역할을 함.',
  philosophy: '검증 안 된 건 절대 안 사. 대신 검증된 건 3년 쓴다.',
  avatarColor: '#1e40af',
  avatarEmoji: '👔',
  tagline: 'ISTJ · 12년차 차장 · 3년 이상 써본 것만 추천',
};

// ── 박서연 (블로그 본문 담당) ─────────────────────────
// 제품 추천 섹션에서는 사용하지 않지만 기록용
export const PARK_SEOYEON: AffiliatePersona = {
  id: 'park-seoyeon',
  name: '박서연',
  mbti: 'ENFP-다혈질',
  age: 24,
  role: '패션 스타트업 MD',
  bio: 'MBTI에 미친 24세. 매일 민지와 카페에서 MBTI 분석하며 수다 떠는 게 낙.',
  philosophy: '마음이 먼저, 그 다음에 분석.',
  avatarColor: '#ec4899',
  avatarEmoji: '✨',
  tagline: 'ENFP · 24세 · 블로그 본문 스토리텔러',
};

export const AFFILIATE_PERSONAS: Record<string, AffiliatePersona> = {
  'lee-junhyung': LEE_JUNHYUNG,
  'park-seoyeon': PARK_SEOYEON,
};

// ── 플랫폼별 설정 (고지 문구 · 브랜딩) ─────────────────
export interface PlatformConfig {
  id: AffiliatePlatform;
  name: string;            // 공식 이름
  shortName: string;       // 짧은 이름 (카드 배지용)
  brandColor: string;      // 브랜드 컬러
  brandBg: string;         // 배지 배경
  ctaText: string;         // CTA 버튼 텍스트
  disclosureLabel: string; // 고지 문구에 들어가는 이름
}

export const PLATFORMS: Record<AffiliatePlatform, PlatformConfig> = {
  coupang: {
    id: 'coupang',
    name: '쿠팡',
    shortName: '쿠팡',
    brandColor: '#e11d48',
    brandBg: '#fee2e2',
    ctaText: '쿠팡에서 보기',
    disclosureLabel: '쿠팡파트너스',
  },
  oliveyoung: {
    id: 'oliveyoung',
    name: '올리브영',
    shortName: '올영',
    brandColor: '#84cc16',
    brandBg: '#ecfccb',
    ctaText: '올리브영에서 보기',
    disclosureLabel: '올리브영 쇼핑 큐레이터',
  },
  toss: {
    id: 'toss',
    name: '토스쇼핑',
    shortName: '토스',
    brandColor: '#0064ff',
    brandBg: '#dbeafe',
    ctaText: '토스쇼핑에서 보기',
    disclosureLabel: '토스쇼핑 쉐어링크',
  },
};

// ── 고지 문구 자동 생성 함수 ─────────────────────────
export function buildDisclosureText(platforms: AffiliatePlatform[]): string {
  const uniquePlatforms = Array.from(new Set(platforms));
  const labels = uniquePlatforms.map((p) => PLATFORMS[p].disclosureLabel);

  let joined: string;
  if (labels.length === 1) {
    joined = labels[0];
  } else if (labels.length === 2) {
    joined = `${labels[0]} 및 ${labels[1]}`;
  } else {
    joined = `${labels.slice(0, -1).join(', ')} 및 ${labels[labels.length - 1]}`;
  }

  return `※ 이 포스팅은 ${joined} 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.`;
}
