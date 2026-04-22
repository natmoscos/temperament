/**
 * PDF 프리미엄: 16×16 궁합 매트릭스
 *
 * 기준: Keirsey(1998) 기질 매칭 + Myers(1995) 인지기능 보완성 전통
 * 각 유형 쌍의 점수 (1~5 별점) + 짧은 관계 설명.
 *
 * 16p의 Relationship Assessment 벤치마크. 무료 결과에는 bestMatch 2개만
 * 노출되는데, PDF에서는 당신 유형과 16가지 모든 상대 유형의 궁합을 제공.
 */

export type MbtiType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export const ALL_MBTI_TYPES: MbtiType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
];

/**
 * 유형 쌍별 궁합 점수 (1=어려움, 2=도전, 3=보통, 4=좋음, 5=최고)
 * Keirsey 기질 + 인지기능 보완성 + 커뮤니티 축적 경험 기반.
 *
 * 대각선(자기-자기)은 4 (자기 이해는 좋지만 성장 정체 가능).
 */
const COMPATIBILITY_MATRIX: Record<MbtiType, Record<MbtiType, number>> = {
  ISTJ: {
    ISTJ: 4, ISFJ: 4, INFJ: 3, INTJ: 4, ISTP: 4, ISFP: 3, INFP: 2, INTP: 3,
    ESTP: 5, ESFP: 5, ENFP: 3, ENTP: 3, ESTJ: 4, ESFJ: 4, ENFJ: 3, ENTJ: 4,
  },
  ISFJ: {
    ISTJ: 4, ISFJ: 4, INFJ: 4, INTJ: 3, ISTP: 3, ISFP: 4, INFP: 4, INTP: 2,
    ESTP: 5, ESFP: 5, ENFP: 4, ENTP: 3, ESTJ: 4, ESFJ: 4, ENFJ: 4, ENTJ: 3,
  },
  INFJ: {
    ISTJ: 3, ISFJ: 4, INFJ: 4, INTJ: 4, ISTP: 3, ISFP: 4, INFP: 4, INTP: 4,
    ESTP: 2, ESFP: 3, ENFP: 5, ENTP: 5, ESTJ: 2, ESFJ: 3, ENFJ: 4, ENTJ: 3,
  },
  INTJ: {
    ISTJ: 4, ISFJ: 3, INFJ: 4, INTJ: 4, ISTP: 4, ISFP: 3, INFP: 4, INTP: 4,
    ESTP: 3, ESFP: 2, ENFP: 5, ENTP: 5, ESTJ: 3, ESFJ: 2, ENFJ: 3, ENTJ: 4,
  },
  ISTP: {
    ISTJ: 4, ISFJ: 3, INFJ: 3, INTJ: 4, ISTP: 4, ISFP: 4, INFP: 3, INTP: 4,
    ESTP: 4, ESFP: 4, ENFP: 3, ENTP: 4, ESTJ: 5, ESFJ: 4, ENFJ: 3, ENTJ: 5,
  },
  ISFP: {
    ISTJ: 3, ISFJ: 4, INFJ: 4, INTJ: 3, ISTP: 4, ISFP: 4, INFP: 4, INTP: 3,
    ESTP: 4, ESFP: 4, ENFP: 4, ENTP: 3, ESTJ: 4, ESFJ: 5, ENFJ: 5, ENTJ: 3,
  },
  INFP: {
    ISTJ: 2, ISFJ: 4, INFJ: 4, INTJ: 4, ISTP: 3, ISFP: 4, INFP: 4, INTP: 4,
    ESTP: 2, ESFP: 3, ENFP: 4, ENTP: 4, ESTJ: 2, ESFJ: 3, ENFJ: 5, ENTJ: 5,
  },
  INTP: {
    ISTJ: 3, ISFJ: 2, INFJ: 4, INTJ: 4, ISTP: 4, ISFP: 3, INFP: 4, INTP: 4,
    ESTP: 3, ESFP: 2, ENFP: 4, ENTP: 4, ESTJ: 3, ESFJ: 2, ENFJ: 5, ENTJ: 5,
  },
  ESTP: {
    ISTJ: 5, ISFJ: 5, INFJ: 2, INTJ: 3, ISTP: 4, ISFP: 4, INFP: 2, INTP: 3,
    ESTP: 4, ESFP: 4, ENFP: 3, ENTP: 4, ESTJ: 4, ESFJ: 4, ENFJ: 3, ENTJ: 4,
  },
  ESFP: {
    ISTJ: 5, ISFJ: 5, INFJ: 3, INTJ: 2, ISTP: 4, ISFP: 4, INFP: 3, INTP: 2,
    ESTP: 4, ESFP: 4, ENFP: 4, ENTP: 3, ESTJ: 4, ESFJ: 4, ENFJ: 4, ENTJ: 3,
  },
  ENFP: {
    ISTJ: 3, ISFJ: 4, INFJ: 5, INTJ: 5, ISTP: 3, ISFP: 4, INFP: 4, INTP: 4,
    ESTP: 3, ESFP: 4, ENFP: 4, ENTP: 4, ESTJ: 3, ESFJ: 4, ENFJ: 4, ENTJ: 4,
  },
  ENTP: {
    ISTJ: 3, ISFJ: 3, INFJ: 5, INTJ: 5, ISTP: 4, ISFP: 3, INFP: 4, INTP: 4,
    ESTP: 4, ESFP: 3, ENFP: 4, ENTP: 4, ESTJ: 3, ESFJ: 3, ENFJ: 4, ENTJ: 4,
  },
  ESTJ: {
    ISTJ: 4, ISFJ: 4, INFJ: 2, INTJ: 3, ISTP: 5, ISFP: 4, INFP: 2, INTP: 3,
    ESTP: 4, ESFP: 4, ENFP: 3, ENTP: 3, ESTJ: 4, ESFJ: 4, ENFJ: 3, ENTJ: 4,
  },
  ESFJ: {
    ISTJ: 4, ISFJ: 4, INFJ: 3, INTJ: 2, ISTP: 4, ISFP: 5, INFP: 3, INTP: 2,
    ESTP: 4, ESFP: 4, ENFP: 4, ENTP: 3, ESTJ: 4, ESFJ: 4, ENFJ: 4, ENTJ: 3,
  },
  ENFJ: {
    ISTJ: 3, ISFJ: 4, INFJ: 4, INTJ: 3, ISTP: 3, ISFP: 5, INFP: 5, INTP: 5,
    ESTP: 3, ESFP: 4, ENFP: 4, ENTP: 4, ESTJ: 3, ESFJ: 4, ENFJ: 4, ENTJ: 3,
  },
  ENTJ: {
    ISTJ: 4, ISFJ: 3, INFJ: 3, INTJ: 4, ISTP: 5, ISFP: 3, INFP: 5, INTP: 5,
    ESTP: 4, ESFP: 3, ENFP: 4, ENTP: 4, ESTJ: 4, ESFJ: 3, ENFJ: 3, ENTJ: 4,
  },
};

/**
 * 쌍별 한 줄 관계 설명.
 * "당신(A)이 B를 만났을 때" 관점. 192×16 = 전부 작성은 공수 크므로,
 * 기질군 조합 + 인지기능 보완성 기반으로 동적 생성.
 */
const TEMPERAMENT_GROUP: Record<MbtiType, 'NT' | 'NF' | 'SJ' | 'SP'> = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

/**
 * 인지기능 주기능 매핑 (Jung)
 */
const DOMINANT_FUNCTION: Record<MbtiType, string> = {
  ISTJ: 'Si', ISFJ: 'Si', INFJ: 'Ni', INTJ: 'Ni',
  ISTP: 'Ti', ISFP: 'Fi', INFP: 'Fi', INTP: 'Ti',
  ESTP: 'Se', ESFP: 'Se', ENFP: 'Ne', ENTP: 'Ne',
  ESTJ: 'Te', ESFJ: 'Fe', ENFJ: 'Fe', ENTJ: 'Te',
};

/**
 * 한 줄 관계 설명 생성 (자기 유형 A가 상대 유형 B를 만났을 때)
 */
export function getRelationshipSummary(a: MbtiType, b: MbtiType, score: number): string {
  if (a === b) return '같은 유형. 서로 완벽히 이해하지만 성장 자극이 부족할 수 있습니다.';

  const ga = TEMPERAMENT_GROUP[a];
  const gb = TEMPERAMENT_GROUP[b];
  const fa = DOMINANT_FUNCTION[a];
  const fb = DOMINANT_FUNCTION[b];

  // 5점: 인지기능 보완성 최상 (Ni-Ne, Si-Se, Ti-Te, Fi-Fe 반대 방향)
  if (score === 5) {
    if ((fa === 'Ni' && fb === 'Ne') || (fa === 'Ne' && fb === 'Ni'))
      return '직관 보완. 당신의 깊은 통찰과 상대의 확산적 아이디어가 최고의 시너지를 만듭니다.';
    if ((fa === 'Si' && fb === 'Se') || (fa === 'Se' && fb === 'Si'))
      return '감각 보완. 당신의 안정성과 상대의 현장감이 서로를 완성합니다.';
    if ((fa === 'Ti' && fb === 'Te') || (fa === 'Te' && fb === 'Ti'))
      return '사고 보완. 당신의 논리 깊이와 상대의 실행력이 강력한 팀을 만듭니다.';
    if ((fa === 'Fi' && fb === 'Fe') || (fa === 'Fe' && fb === 'Fi'))
      return '감정 보완. 당신의 진정성과 상대의 조율력이 관계의 깊이와 너비를 모두 제공합니다.';
    return '최고의 궁합. 서로의 약점을 채우고 강점을 증폭시키는 관계입니다.';
  }

  // 4점: 같은 기질군 또는 강한 보완
  if (score === 4) {
    if (ga === gb) return `같은 ${ga} 기질군. 가치관과 사고 방식이 유사해 편안한 관계입니다.`;
    return '서로 다른 관점에서 배울 점이 많은 관계. 대화에 노력이 필요하지만 성장 잠재력이 큽니다.';
  }

  // 3점: 보통
  if (score === 3) {
    return '중립적 관계. 갈등 소지는 적지만 깊은 유대를 만들려면 의식적 노력이 필요합니다.';
  }

  // 2점: 도전
  if (score === 2) {
    return '가치관 차이가 큰 관계. 서로의 다름을 존중하는 태도가 있어야 지속됩니다.';
  }

  // 1점: 어려움 (실제로는 거의 없음)
  return '근본적 차이가 커서 관계 유지에 많은 에너지가 필요합니다.';
}

/**
 * 당신 유형의 TOP 3 호환 유형 반환 (자기 제외, 점수 높은 순)
 */
export function getTopCompatible(type: MbtiType): { type: MbtiType; score: number }[] {
  const row = COMPATIBILITY_MATRIX[type];
  return ALL_MBTI_TYPES
    .filter((t) => t !== type)
    .map((t) => ({ type: t, score: row[t] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/**
 * 당신 유형의 주의 관계 3개 반환 (점수 낮은 순)
 */
export function getBottomCompatible(type: MbtiType): { type: MbtiType; score: number }[] {
  const row = COMPATIBILITY_MATRIX[type];
  return ALL_MBTI_TYPES
    .filter((t) => t !== type)
    .map((t) => ({ type: t, score: row[t] }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
}

/**
 * 전체 매트릭스 행 반환 (16 유형 순서대로)
 */
export function getFullCompatibilityRow(type: MbtiType): { type: MbtiType; score: number }[] {
  const row = COMPATIBILITY_MATRIX[type];
  return ALL_MBTI_TYPES.map((t) => ({ type: t, score: row[t] }));
}
