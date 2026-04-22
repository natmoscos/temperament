/**
 * PDF 프리미엄: Career Suite
 *
 * 16personalities Premium Career Suite ($49) 벤치마크.
 * 50개 직업 × 16 MBTI 적합도 + 근무 환경 4축 점수 + 면접·협상 스타일.
 *
 * 점수 체계:
 *   5 = 타고난 적합 (best fit)
 *   4 = 호환 (good fit)
 *   3 = 중립 (workable)
 *   2 = 도전 (challenging)
 *   1 = 부적합 (poor fit — 사실상 회피)
 *
 * 각 직업에 bestTypes / goodTypes / challengeTypes 지정, 나머지는 3 기본값.
 * Keirsey(1998) 기질-직업 매핑 + Myers(1995) 인지기능-직업 연구 기반.
 */

import type { MbtiType } from './pdf-premium-compatibility';

export interface Career {
  id: string;
  title: string;
  category: string;
  emoji: string;
  description: string;       // 한 줄 직무 설명
  bestTypes: MbtiType[];     // 점수 5
  goodTypes: MbtiType[];     // 점수 4
  challengeTypes: MbtiType[]; // 점수 2
}

/**
 * 50개 직업 카탈로그 (10 카테고리 × 5 직업)
 */
export const CAREER_CATALOG: Career[] = [
  // ─── 경영·경제 ───
  {
    id: 'ceo', title: 'CEO·창업가', category: '경영·경제', emoji: '👑',
    description: '조직의 비전을 세우고 자원을 배분하는 최고 리더',
    bestTypes: ['ENTJ', 'ESTJ', 'INTJ'],
    goodTypes: ['ENTP', 'ENFJ'],
    challengeTypes: ['INFP', 'ISFP'],
  },
  {
    id: 'consultant', title: '경영 컨설턴트', category: '경영·경제', emoji: '📊',
    description: '기업 문제를 분석하고 전략을 제안하는 전문가',
    bestTypes: ['INTJ', 'ENTJ', 'ENTP'],
    goodTypes: ['INTP', 'ESTJ'],
    challengeTypes: ['ESFP', 'ISFP'],
  },
  {
    id: 'ib_analyst', title: '투자은행 애널리스트', category: '경영·경제', emoji: '💹',
    description: '기업 가치와 시장을 분석해 투자 결정을 돕는 전문가',
    bestTypes: ['INTJ', 'INTP', 'ENTJ'],
    goodTypes: ['ISTJ', 'ESTJ'],
    challengeTypes: ['ESFP', 'ENFP'],
  },
  {
    id: 'accountant', title: '회계사·재무관리자', category: '경영·경제', emoji: '🧮',
    description: '정확한 숫자와 규정으로 재무를 관리하는 전문가',
    bestTypes: ['ISTJ', 'ESTJ', 'INTJ'],
    goodTypes: ['ISFJ', 'INTP'],
    challengeTypes: ['ENFP', 'ESFP'],
  },
  {
    id: 'entrepreneur', title: '스타트업 창업자', category: '경영·경제', emoji: '🚀',
    description: '새 아이디어를 비즈니스로 구현하는 모험가',
    bestTypes: ['ENTP', 'ENTJ', 'ENFP'],
    goodTypes: ['INTJ', 'ESTP'],
    challengeTypes: ['ISFJ', 'ISTJ'],
  },

  // ─── IT·기술 ───
  {
    id: 'swe', title: '소프트웨어 엔지니어', category: 'IT·기술', emoji: '💻',
    description: '코드로 제품을 만드는 기술 전문가',
    bestTypes: ['INTP', 'INTJ', 'ISTP'],
    goodTypes: ['ENTP', 'ISTJ'],
    challengeTypes: ['ESFJ', 'ESFP'],
  },
  {
    id: 'data_scientist', title: '데이터 과학자·AI 엔지니어', category: 'IT·기술', emoji: '🤖',
    description: '대용량 데이터에서 통찰을 추출하는 연구자',
    bestTypes: ['INTJ', 'INTP', 'ENTJ'],
    goodTypes: ['ISTJ', 'ENTP'],
    challengeTypes: ['ESFP', 'ESFJ'],
  },
  {
    id: 'ux_designer', title: 'UX·프로덕트 디자이너', category: 'IT·기술', emoji: '🎨',
    description: '사용자 경험을 설계하는 공감형 크리에이터',
    bestTypes: ['INFJ', 'INFP', 'ENFJ'],
    goodTypes: ['ISFP', 'ENFP'],
    challengeTypes: ['ESTJ', 'ISTJ'],
  },
  {
    id: 'devops', title: 'DevOps·시스템 엔지니어', category: 'IT·기술', emoji: '⚙️',
    description: '시스템 안정성을 책임지는 인프라 전문가',
    bestTypes: ['ISTJ', 'ISTP', 'INTJ'],
    goodTypes: ['INTP', 'ESTJ'],
    challengeTypes: ['ENFP', 'ESFP'],
  },
  {
    id: 'pm_tech', title: '테크 프로덕트 매니저', category: 'IT·기술', emoji: '📱',
    description: '기술·사업·디자인을 조율해 제품을 만드는 리더',
    bestTypes: ['ENTJ', 'ENTP', 'INTJ'],
    goodTypes: ['ENFJ', 'ESTJ'],
    challengeTypes: ['ISFP', 'ISTP'],
  },

  // ─── 의료·건강 ───
  {
    id: 'doctor', title: '의사 (임상)', category: '의료·건강', emoji: '🩺',
    description: '환자를 진단·치료하는 전문 의료인',
    bestTypes: ['ISTJ', 'INTJ', 'ESTJ'],
    goodTypes: ['ISFJ', 'INFJ'],
    challengeTypes: ['ENFP', 'ESFP'],
  },
  {
    id: 'nurse', title: '간호사', category: '의료·건강', emoji: '🏥',
    description: '환자를 세심하게 돌보는 현장 의료 전문가',
    bestTypes: ['ISFJ', 'ESFJ', 'ISFP'],
    goodTypes: ['INFJ', 'ENFJ'],
    challengeTypes: ['INTP', 'INTJ'],
  },
  {
    id: 'therapist', title: '심리 상담사', category: '의료·건강', emoji: '🧠',
    description: '내담자의 내면을 이해하고 성장을 돕는 전문가',
    bestTypes: ['INFJ', 'ENFJ', 'INFP'],
    goodTypes: ['ISFJ', 'ENFP'],
    challengeTypes: ['ESTJ', 'ESTP'],
  },
  {
    id: 'physiotherapist', title: '물리치료사', category: '의료·건강', emoji: '💪',
    description: '신체 기능 회복을 돕는 실전 재활 전문가',
    bestTypes: ['ISFJ', 'ESFJ', 'ISFP'],
    goodTypes: ['ISTJ', 'ESFP'],
    challengeTypes: ['INTJ', 'INTP'],
  },
  {
    id: 'pharmacist', title: '약사', category: '의료·건강', emoji: '💊',
    description: '정확한 약물 관리와 상담을 제공하는 전문가',
    bestTypes: ['ISTJ', 'ISFJ', 'INTJ'],
    goodTypes: ['ESTJ', 'INFJ'],
    challengeTypes: ['ENFP', 'ESFP'],
  },

  // ─── 교육·연구 ───
  {
    id: 'professor', title: '대학 교수·연구자', category: '교육·연구', emoji: '🎓',
    description: '학문을 탐구하고 지식을 전수하는 지식인',
    bestTypes: ['INTJ', 'INTP', 'INFJ'],
    goodTypes: ['ENTP', 'INFP'],
    challengeTypes: ['ESFP', 'ESTP'],
  },
  {
    id: 'teacher', title: '초·중·고 교사', category: '교육·연구', emoji: '📚',
    description: '아이들의 성장을 돕는 교육 현장 전문가',
    bestTypes: ['ESFJ', 'ENFJ', 'ISFJ'],
    goodTypes: ['INFJ', 'ENFP'],
    challengeTypes: ['INTP', 'ISTP'],
  },
  {
    id: 'researcher', title: '연구원 (R&D)', category: '교육·연구', emoji: '🔬',
    description: '실험과 분석으로 새로운 지식을 만드는 학자',
    bestTypes: ['INTJ', 'INTP', 'ISTJ'],
    goodTypes: ['ENTP', 'INFJ'],
    challengeTypes: ['ESFP', 'ESFJ'],
  },
  {
    id: 'librarian', title: '사서·아키비스트', category: '교육·연구', emoji: '📖',
    description: '지식을 체계적으로 정리·보존하는 전문가',
    bestTypes: ['ISFJ', 'INFJ', 'ISTJ'],
    goodTypes: ['INFP', 'INTP'],
    challengeTypes: ['ESTP', 'ESFP'],
  },
  {
    id: 'instructor', title: '강사·코치', category: '교육·연구', emoji: '🎤',
    description: '성인 학습자의 성장을 돕는 교육 전문가',
    bestTypes: ['ENFJ', 'ENTJ', 'ESFJ'],
    goodTypes: ['ENFP', 'ESTJ'],
    challengeTypes: ['INTP', 'INFP'],
  },

  // ─── 창작·예술 ───
  {
    id: 'writer', title: '작가·소설가', category: '창작·예술', emoji: '✍️',
    description: '언어로 세상을 표현하는 스토리텔러',
    bestTypes: ['INFP', 'INFJ', 'INTJ'],
    goodTypes: ['INTP', 'ENFP'],
    challengeTypes: ['ESTJ', 'ESTP'],
  },
  {
    id: 'designer', title: '그래픽·비주얼 디자이너', category: '창작·예술', emoji: '🖼️',
    description: '이미지로 메시지를 전달하는 시각 예술가',
    bestTypes: ['ISFP', 'INFP', 'ENFP'],
    goodTypes: ['INFJ', 'ESFP'],
    challengeTypes: ['ESTJ', 'ISTJ'],
  },
  {
    id: 'video_creator', title: '영상 제작자·PD', category: '창작·예술', emoji: '🎬',
    description: '영상 콘텐츠를 기획·제작하는 크리에이터',
    bestTypes: ['ENFP', 'ENTP', 'ESFP'],
    goodTypes: ['INFP', 'ENFJ'],
    challengeTypes: ['ISTJ', 'ISFJ'],
  },
  {
    id: 'musician', title: '음악가·프로듀서', category: '창작·예술', emoji: '🎵',
    description: '소리와 감정으로 세상과 소통하는 예술가',
    bestTypes: ['ISFP', 'INFP', 'ENFP'],
    goodTypes: ['INFJ', 'ESFP'],
    challengeTypes: ['ESTJ', 'ISTJ'],
  },
  {
    id: 'actor', title: '배우·공연 예술가', category: '창작·예술', emoji: '🎭',
    description: '자신의 감정과 타인의 삶을 연기로 표현',
    bestTypes: ['ESFP', 'ENFP', 'ISFP'],
    goodTypes: ['INFP', 'ENFJ'],
    challengeTypes: ['ISTJ', 'INTP'],
  },

  // ─── 법률·공공 ───
  {
    id: 'lawyer', title: '변호사', category: '법률·공공', emoji: '⚖️',
    description: '법적 문제를 해결하는 논리 전문가',
    bestTypes: ['INTJ', 'ENTJ', 'ESTJ'],
    goodTypes: ['ISTJ', 'ENTP'],
    challengeTypes: ['ISFP', 'ESFP'],
  },
  {
    id: 'judge', title: '판사·검사', category: '법률·공공', emoji: '🏛️',
    description: '공정한 판단으로 정의를 실현하는 법관',
    bestTypes: ['ISTJ', 'INTJ', 'ESTJ'],
    goodTypes: ['ENTJ', 'ISFJ'],
    challengeTypes: ['ENFP', 'ESFP'],
  },
  {
    id: 'police', title: '경찰·수사관', category: '법률·공공', emoji: '🚔',
    description: '공공 안전을 지키는 현장 전문가',
    bestTypes: ['ISTJ', 'ESTJ', 'ISTP'],
    goodTypes: ['ESTP', 'ENTJ'],
    challengeTypes: ['INFP', 'ISFP'],
  },
  {
    id: 'civil_servant', title: '공무원·행정직', category: '법률·공공', emoji: '🏢',
    description: '공공 시스템을 운영하는 안정형 전문가',
    bestTypes: ['ISTJ', 'ESTJ', 'ISFJ'],
    goodTypes: ['ESFJ', 'INTJ'],
    challengeTypes: ['ENFP', 'ENTP'],
  },
  {
    id: 'ngo_activist', title: 'NGO 활동가·사회운동가', category: '법률·공공', emoji: '🌍',
    description: '사회 변화를 위해 움직이는 가치 지향 전문가',
    bestTypes: ['ENFJ', 'INFJ', 'INFP'],
    goodTypes: ['ENFP', 'ISFJ'],
    challengeTypes: ['ISTP', 'ISTJ'],
  },

  // ─── 영업·마케팅 ───
  {
    id: 'sales_mgr', title: '영업 매니저', category: '영업·마케팅', emoji: '🤝',
    description: '고객 관계를 구축해 매출을 만드는 설득 전문가',
    bestTypes: ['ESTP', 'ESTJ', 'ENTJ'],
    goodTypes: ['ESFJ', 'ENFJ'],
    challengeTypes: ['INTP', 'INFP'],
  },
  {
    id: 'marketer', title: '디지털 마케터', category: '영업·마케팅', emoji: '📱',
    description: '데이터와 창의성으로 브랜드를 성장시키는 전문가',
    bestTypes: ['ENTP', 'ENFP', 'ENTJ'],
    goodTypes: ['ENFJ', 'ESTP'],
    challengeTypes: ['ISTJ', 'ISFJ'],
  },
  {
    id: 'pr_specialist', title: 'PR·홍보 전문가', category: '영업·마케팅', emoji: '📢',
    description: '브랜드 메시지를 전달하는 커뮤니케이션 전문가',
    bestTypes: ['ENFJ', 'ESFJ', 'ENFP'],
    goodTypes: ['ENTP', 'ESFP'],
    challengeTypes: ['INTP', 'ISTP'],
  },
  {
    id: 'brand_mgr', title: '브랜드 매니저', category: '영업·마케팅', emoji: '💎',
    description: '브랜드의 정체성과 장기 성장을 관리하는 전략가',
    bestTypes: ['ENFJ', 'ENTJ', 'ENFP'],
    goodTypes: ['INFJ', 'ESFJ'],
    challengeTypes: ['ISTP', 'ISTJ'],
  },
  {
    id: 'event_planner', title: '이벤트·컨퍼런스 플래너', category: '영업·마케팅', emoji: '🎪',
    description: '행사를 기획·운영하는 현장 조율 전문가',
    bestTypes: ['ESFJ', 'ESFP', 'ENFJ'],
    goodTypes: ['ENFP', 'ESTJ'],
    challengeTypes: ['INTP', 'INTJ'],
  },

  // ─── 미디어·콘텐츠 ───
  {
    id: 'journalist', title: '기자·언론인', category: '미디어·콘텐츠', emoji: '📰',
    description: '사실을 조사하고 전달하는 취재 전문가',
    bestTypes: ['ENTP', 'ENFP', 'INFJ'],
    goodTypes: ['INFP', 'ENTJ'],
    challengeTypes: ['ISFJ', 'ISFP'],
  },
  {
    id: 'youtuber', title: '유튜버·크리에이터', category: '미디어·콘텐츠', emoji: '📹',
    description: '개인 채널로 대중과 소통하는 콘텐츠 제작자',
    bestTypes: ['ENFP', 'ENTP', 'ESFP'],
    goodTypes: ['ENFJ', 'INFP'],
    challengeTypes: ['ISTJ', 'ISFJ'],
  },
  {
    id: 'influencer', title: 'SNS 인플루언서', category: '미디어·콘텐츠', emoji: '💫',
    description: '개인 브랜드로 팔로워 영향력을 키우는 크리에이터',
    bestTypes: ['ESFP', 'ENFP', 'ESFJ'],
    goodTypes: ['ENFJ', 'ESTP'],
    challengeTypes: ['ISTP', 'ISTJ'],
  },
  {
    id: 'editor', title: '에디터·큐레이터', category: '미디어·콘텐츠', emoji: '📝',
    description: '콘텐츠를 선별·편집해 가치를 만드는 전문가',
    bestTypes: ['INFJ', 'INTJ', 'INFP'],
    goodTypes: ['ISFJ', 'INTP'],
    challengeTypes: ['ESTP', 'ESFP'],
  },
  {
    id: 'broadcaster', title: '아나운서·방송인', category: '미디어·콘텐츠', emoji: '🎙️',
    description: '카메라 앞에서 정보와 감정을 전달하는 전문가',
    bestTypes: ['ENFJ', 'ESFJ', 'ESFP'],
    goodTypes: ['ENFP', 'ENTJ'],
    challengeTypes: ['INTP', 'ISTP'],
  },

  // ─── 서비스·기타 ───
  {
    id: 'chef', title: '셰프·요리사', category: '서비스·기타', emoji: '👨‍🍳',
    description: '감각과 기술로 요리를 창조하는 장인',
    bestTypes: ['ISFP', 'ESFP', 'ISTP'],
    goodTypes: ['ESTP', 'ENFP'],
    challengeTypes: ['INTJ', 'INTP'],
  },
  {
    id: 'hotel_mgr', title: '호텔·레스토랑 매니저', category: '서비스·기타', emoji: '🏨',
    description: '고객 경험 전체를 책임지는 서비스 리더',
    bestTypes: ['ESFJ', 'ESTJ', 'ENFJ'],
    goodTypes: ['ISFJ', 'ESFP'],
    challengeTypes: ['INTP', 'INFP'],
  },
  {
    id: 'flight_attendant', title: '항공 승무원', category: '서비스·기타', emoji: '✈️',
    description: '승객 안전과 편안함을 책임지는 현장 전문가',
    bestTypes: ['ESFJ', 'ESFP', 'ISFJ'],
    goodTypes: ['ENFJ', 'ESTJ'],
    challengeTypes: ['INTP', 'INTJ'],
  },
  {
    id: 'travel_guide', title: '여행 가이드·투어 플래너', category: '서비스·기타', emoji: '🗺️',
    description: '여행자에게 문화와 경험을 전달하는 전문가',
    bestTypes: ['ESFP', 'ENFP', 'ESTP'],
    goodTypes: ['ENFJ', 'ESFJ'],
    challengeTypes: ['INTJ', 'INTP'],
  },
  {
    id: 'personal_trainer', title: '퍼스널 트레이너·코치', category: '서비스·기타', emoji: '🏋️',
    description: '1:1 신체 훈련으로 고객 목표 달성을 돕는 전문가',
    bestTypes: ['ESTP', 'ESFP', 'ESFJ'],
    goodTypes: ['ENFJ', 'ESTJ'],
    challengeTypes: ['INTP', 'INFP'],
  },

  // ─── 전문직·기타 ───
  {
    id: 'architect', title: '건축가·도시 설계사', category: '전문직', emoji: '🏛️',
    description: '공간과 구조를 설계하는 창의·기술 전문가',
    bestTypes: ['INTJ', 'INTP', 'ISTP'],
    goodTypes: ['INFJ', 'ENTJ'],
    challengeTypes: ['ESFP', 'ESFJ'],
  },
  {
    id: 'engineer', title: '기계·전기 엔지니어', category: '전문직', emoji: '🔧',
    description: '제품과 시스템을 설계·제작하는 기술 전문가',
    bestTypes: ['ISTP', 'INTJ', 'ISTJ'],
    goodTypes: ['INTP', 'ESTJ'],
    challengeTypes: ['ESFP', 'ENFP'],
  },
  {
    id: 'scientist', title: '과학자·기초 연구자', category: '전문직', emoji: '⚗️',
    description: '자연 현상을 탐구하는 이론·실험 전문가',
    bestTypes: ['INTJ', 'INTP', 'ISTJ'],
    goodTypes: ['ENTP', 'INFJ'],
    challengeTypes: ['ESFP', 'ESFJ'],
  },
  {
    id: 'pilot', title: '파일럿·항공 운항', category: '전문직', emoji: '🛩️',
    description: '정밀한 판단으로 항공기를 조종하는 전문가',
    bestTypes: ['ISTP', 'ISTJ', 'INTJ'],
    goodTypes: ['ESTJ', 'ESTP'],
    challengeTypes: ['INFP', 'ISFP'],
  },
  {
    id: 'freelancer', title: '프리랜서·독립 크리에이터', category: '전문직', emoji: '💼',
    description: '본인 브랜드로 독립적으로 일하는 전문가',
    bestTypes: ['INFP', 'ENFP', 'ISFP'],
    goodTypes: ['INTP', 'ENTP'],
    challengeTypes: ['ESFJ', 'ESTJ'],
  },
];

/**
 * 직업 × MBTI 점수 계산
 */
export function getCareerScore(career: Career, type: MbtiType): number {
  if (career.bestTypes.includes(type)) return 5;
  if (career.goodTypes.includes(type)) return 4;
  if (career.challengeTypes.includes(type)) return 2;
  return 3;
}

/**
 * 당신 MBTI의 TOP 10 적합 직업
 */
export function getTopCareers(type: MbtiType, limit = 10): Career[] {
  return [...CAREER_CATALOG]
    .map((c) => ({ career: c, score: getCareerScore(c, type) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ career }) => career);
}

/**
 * 당신 MBTI의 BOTTOM 5 주의 직업
 */
export function getBottomCareers(type: MbtiType, limit = 5): Career[] {
  return [...CAREER_CATALOG]
    .map((c) => ({ career: c, score: getCareerScore(c, type) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(({ career }) => career);
}

// ─────────────────────────────────────────────────
// 근무 환경 4축 점수 (0~100)
// ─────────────────────────────────────────────────

export interface WorkEnvironment {
  remoteVsOffice: number;     // 0=완전 원격 선호, 100=완전 대면 선호
  soloVsTeam: number;         // 0=독립 작업 선호, 100=팀 협업 선호
  structuredVsFlex: number;   // 0=유연한 일정, 100=체계적 구조
  stableVsDynamic: number;    // 0=안정적 환경, 100=변화·도전
}

/**
 * MBTI 4축 + 기질(주기능)을 조합해 근무 환경 선호도 계산
 */
export function getWorkEnvironment(type: MbtiType): WorkEnvironment {
  const isE = type[0] === 'E';
  const isN = type[1] === 'N';
  const isT = type[2] === 'T';
  const isJ = type[3] === 'J';

  return {
    // E: 대면 선호, I: 원격 선호
    remoteVsOffice: isE ? 75 : 30,
    // T 독립 성향 + F 팀 성향
    soloVsTeam: isT ? 35 : 70,
    // J: 구조, P: 유연
    structuredVsFlex: isJ ? 80 : 25,
    // N: 변화 선호, S: 안정 선호 (N이 변화, S가 안정에 가까움)
    stableVsDynamic: isN ? 70 : 35,
  };
}

// ─────────────────────────────────────────────────
// 면접·협상 스타일
// ─────────────────────────────────────────────────

export interface InterviewStyle {
  strength: string;        // 면접에서 자연스러운 강점
  weakness: string;        // 주의할 약점
  preparation: string[];   // 준비 팁 3개
  negotiation: string;     // 협상 스타일·요령
}

export const INTERVIEW_STYLES: Record<MbtiType, InterviewStyle> = {
  ISTJ: {
    strength: '성실함과 책임감이 자연스럽게 드러납니다. 구체적 사실·경험·숫자로 답변해 신뢰를 줍니다.',
    weakness: '융통성·창의성 질문에 말이 막힐 수 있습니다. 감정 표현이 부족해 "차갑다" 인상 가능.',
    preparation: [
      '과거 성과를 구체적 숫자·기간·결과로 정리 (STAR 기법)',
      '"예상치 못한 상황에서의 대응" 시나리오 2~3개 미리 준비',
      '열정·에너지를 의식적으로 표현 (톤·표정 리허설)',
    ],
    negotiation: '데이터 기반 직접 협상이 최적. 시장 평균 연봉, 본인 성과 지표를 근거로 제시. 감정적 밀당은 부담스러우니 사실에 집중.',
  },
  ISFJ: {
    strength: '배려심과 팀 기여 의지가 면접관에게 따뜻함으로 전달됩니다. 세부사항을 놓치지 않는 성실함이 강점.',
    weakness: '자신의 성과를 과소평가해 "임팩트"가 약해 보일 수 있음. 불편한 질문에 동요 가능.',
    preparation: [
      '"저는 그냥 도왔을 뿐" 대신 구체 역할·기여도로 재구성',
      '본인 강점 3개를 숫자·사례와 함께 외우기',
      '갈등 대응 질문: "조화 유지하며 의견 나눈 경험" 1~2개',
    ],
    negotiation: '직접 협상은 불편하므로 "시장 자료를 보니" 식 3자 인용법. 동료 의견도 근거로 활용.',
  },
  INFJ: {
    strength: '깊이 있는 통찰과 사람 이해력이 강한 인상을 줍니다. 가치·비전 질문에 탁월함.',
    weakness: '완벽주의로 답변을 너무 다듬다 자연스러움을 잃을 수 있음. 본인 성과를 축소 설명.',
    preparation: [
      '리허설은 대본 암기가 아닌 "핵심 메시지 5개" 위주',
      '"약점" 질문에 진정성 있되 방어적이지 않게',
      '비전·가치 질문에서 본인 언어 유지 (템플릿 거부)',
    ],
    negotiation: '관계 기반 협상이 맞습니다. 회사 비전과 본인 가치가 일치함을 어필하며 장기 기여 강조.',
  },
  INTJ: {
    strength: '전략적 사고와 장기 비전이 강력하게 전달됩니다. 복잡한 문제 해결 능력이 빛남.',
    weakness: '감정 표현 부족으로 "차갑다" 오해. 겸손이 부족해 보일 수 있음.',
    preparation: [
      '팀워크 질문에 "협업 성과" 구체 사례 준비',
      '의식적 미소·아이컨택트 리허설',
      '"왜 우리 회사?" 답변을 논리 + 약간의 열정으로',
    ],
    negotiation: '정면 협상에 강합니다. 본인 시장 가치 분석을 수치로 제시. 단 상대 입장을 "공감"으로 보여야 장기 관계.',
  },
  ISTP: {
    strength: '실용적 문제 해결력이 즉시 드러납니다. 위기 상황 대응 질문에 강력함.',
    weakness: '감정 표현·열정 어필이 약해 "의욕 없어 보인다" 평가 위험.',
    preparation: [
      '본인 포트폴리오·실적을 "한 마디 + 과정" 구조로 정리',
      '"왜 우리 회사?" 질문 대답 미리 준비 (즉흥 약함)',
      '열정 표현 리허설 (본인 스타일 아니라도 의식적으로)',
    ],
    negotiation: '실리적 직접 협상. 복지·자율성·시간 등 비금전 조건도 명시적으로 요구.',
  },
  ISFP: {
    strength: '진정성과 차분함이 면접관 마음을 엽니다. 창작·실무 포트폴리오가 강력.',
    weakness: '본인 PR이 약해 "경쟁력 부족" 인상. 압박 질문에 위축 가능.',
    preparation: [
      '포트폴리오 중심으로 준비 — "말보다 작품"',
      '강점 3개를 "작은 일화"와 함께 연습',
      '압박 질문 대응 — 한 번 깊게 호흡하고 본인 속도 유지',
    ],
    negotiation: '직접 협상 어려우므로 이메일 서면 협상 선호. 조건을 서류화해 요구.',
  },
  INFP: {
    strength: '가치관과 진정성이 강하게 전달됩니다. 창의적 아이디어·스토리텔링 강점.',
    weakness: '구체 성과 설명 약함. "이상주의적" 인상으로 실무 역량 의심 가능.',
    preparation: [
      '이상·가치를 구체 프로젝트·결과로 연결',
      '숫자 3개 외우기 (본인 대표 성과)',
      '"5년 후 계획" 답변 미리 준비 (약점 영역)',
    ],
    negotiation: '감성 협상 함정 주의. 본인 가치에 맞는 조건을 명시적으로 요구하는 연습 필요.',
  },
  INTP: {
    strength: '분석력과 독창적 사고가 자연스럽게 드러납니다. 기술 질문에 탁월.',
    weakness: '사회적 관습 답변 약함. "팀 플레이어"로 안 보일 위험. 감정 질문에 당황.',
    preparation: [
      '"팀워크 경험" 구체 사례 2개 외우기',
      '"왜 우리 회사" — 논리 + 감정 섞기',
      '표정·아이컨택트 의식적 훈련',
    ],
    negotiation: '논리 기반 협상. 본인 희소 역량을 시장 데이터로 증명. 장기 관계보다 즉시 성과로 어필.',
  },
  ESTP: {
    strength: '자신감과 현장 대응력이 강렬한 인상을 남깁니다. 즉흥 질문에 강함.',
    weakness: '"5년 계획" 약점. 경솔해 보일 수 있는 즉흥성.',
    preparation: [
      '장기 계획 답변 대본 암기',
      '"신중함 + 추진력" 균형 어필',
      '과거 실수에서 배운 점 — 성숙함 연출',
    ],
    negotiation: '현장 협상 강점. 즉석에서 조건 조율 가능. 단 "너무 밀어붙인다" 인상 경계.',
  },
  ESFP: {
    strength: '에너지·친화력으로 면접관이 "함께 일하고 싶다" 느끼게 합니다.',
    weakness: '전략적 사고 약점. "장기 비전" 질문에서 말이 막힘.',
    preparation: [
      '미래 계획 구체적으로 준비 (3년·5년)',
      '본인 성과를 숫자·데이터로 표현 연습',
      '즉흥 유머 자제 (진지한 자리 구분)',
    ],
    negotiation: '관계 중심 협상 가능. 단 "확정 조건 서면 요구" 잊지 말기.',
  },
  ENFP: {
    strength: '열정과 가능성으로 면접관에게 영감을 줍니다. 창의적 답변 폭발력.',
    weakness: '말이 너무 길어지는 경향. 구체 숫자·결과 부족.',
    preparation: [
      '답변 30초 시간 제한 연습',
      '핵심 성과 3개 숫자로 외우기',
      '"5년 계획" 대본 암기 (약점 방어)',
    ],
    negotiation: '감정 협상 능숙. 단 "열정만"이 아닌 "실리"도 챙기기.',
  },
  ENTP: {
    strength: '재치 있는 답변과 기발한 아이디어가 면접관의 기억에 남습니다.',
    weakness: '논쟁적으로 보일 위험. 구체적 마무리·실행 의심 가능.',
    preparation: [
      '"완수한 프로젝트" 구체 사례 3개 (중단 프로젝트 제외)',
      '논쟁 말고 "동의하며 발전" 화법 연습',
      '감정 표현 리허설 (공감 표시)',
    ],
    negotiation: '상상력·설득력이 강력한 무기. 단 "조건 서면 확정" 필수.',
  },
  ESTJ: {
    strength: '조직력과 리더십이 즉시 드러납니다. 명확한 성과 수치로 답변.',
    weakness: '감정·공감 부족 평가. 유연성 질문에 경직 가능.',
    preparation: [
      '"변화 적응" 사례 준비 (약점 영역)',
      '팀원 감정 배려 에피소드',
      '본인 "부드러운 면" 의식적 표현',
    ],
    negotiation: '직접 협상의 달인. 단 관계 유지 위해 "win-win" 프레임 활용.',
  },
  ESFJ: {
    strength: '팀 화합력과 배려심이 면접관에게 따뜻함으로 전달됩니다.',
    weakness: '개인 성과 설명 약함. 갈등 해결 질문에 회피적.',
    preparation: [
      '"본인 주도 프로젝트" 구체 성과',
      '갈등 대응: 회피 아닌 "조율 경험"으로',
      '비판 수용 질문 — "개선에 반영" 프레임',
    ],
    negotiation: '관계 협상 능숙. 단 본인 이익 명시 요구 연습.',
  },
  ENFJ: {
    strength: '카리스마와 공감력으로 면접관에게 확신을 줍니다. 비전 전달 탁월.',
    weakness: '완벽주의로 본인 약점을 과잉 드러낼 수 있음.',
    preparation: [
      '약점 질문 답변 — 긍정적 프레임',
      '본인 비전과 회사 비전 연결',
      '구체 성과 숫자 3개 외우기',
    ],
    negotiation: '관계 기반 협상 + 회사 비전 공유로 장기 파트너 프레임.',
  },
  ENTJ: {
    strength: '강력한 추진력과 전략적 비전이 즉시 전달됩니다. 리더십 질문에 탁월.',
    weakness: '권위적으로 보일 위험. 팀원 감정 배려 부족 인상.',
    preparation: [
      '"팀원 성장 도움" 사례 준비',
      '겸손 표현 ("배움 여전히 필요")',
      '아이컨택트 + 가끔 미소',
    ],
    negotiation: '협상 자체를 즐깁니다. 본인 가치 정면 제시 + 회사 ROI 논리로 설득.',
  },
};
