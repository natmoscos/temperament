// 측정 영역 타입
export type MBTIAxis = 'EI' | 'SN' | 'TF' | 'JP';
export type TemperamentType = 'S' | 'C' | 'P' | 'M'; // Sanguine, Choleric, Phlegmatic, Melancholic

export type QuestionCategory =
  | { type: 'mbti'; axis: MBTIAxis }
  | { type: 'temperament'; temperament: TemperamentType };

export interface Question {
  id: string;           // 예: "EI-01", "TS-03"
  order: number;        // 실제 출제 순서 (1~100)
  text: string;         // 질문 텍스트
  category: QuestionCategory;
  reversed: boolean;    // 역방향 문항 여부
  validationPairId?: string; // 검증 쌍 원본 문항 ID (검증 문항인 경우)
}

export interface Answer {
  questionId: string;
  order: number;
  value: number; // 1~7 (리커트 척도)
}

// 검증 쌍
export interface ValidationPair {
  originalId: string;
  validationId: string;
  category: string;
}

// MBTI 결과
export interface MBTIResult {
  type: string; // 예: "ENFJ"
  axes: {
    EI: { score: number; percentage: number; label: 'E' | 'I' };
    SN: { score: number; percentage: number; label: 'S' | 'N' };
    TF: { score: number; percentage: number; label: 'T' | 'F' };
    JP: { score: number; percentage: number; label: 'J' | 'P' };
  };
}

// 기질 결과
export interface TemperamentResult {
  code: string; // 예: "SC"
  primary: { type: TemperamentType; score: number; percentage: number };
  secondary: { type: TemperamentType; score: number; percentage: number };
  all: Record<TemperamentType, { score: number; percentage: number }>;
}

// 신뢰도 결과
export type ReliabilityGrade = 'A' | 'B' | 'C';
export interface ReliabilityResult {
  grade: ReliabilityGrade;
  totalPairs: number;
  warningCount: number;
  details: { originalId: string; validationId: string; diff: number; warning: boolean }[];
}

// 최종 결과
export interface TestResult {
  mbti: MBTIResult;
  temperament: TemperamentResult;
  reliability: ReliabilityResult;
  fullCode: string; // 예: "ENFJ-SC"
}
