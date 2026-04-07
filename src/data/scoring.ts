import { questions } from './questions';
import {
  Answer,
  MBTIResult,
  TemperamentResult,
  ReliabilityResult,
  TestResult,
  MBTIAxis,
  TemperamentType,
  ValidationPair,
} from './types';

// 검증 문항 쌍 목록
export const validationPairs: ValidationPair[] = questions
  .filter((q) => q.validationPairId)
  .map((q) => ({
    originalId: q.validationPairId!,
    validationId: q.id,
    category: q.category.type === 'mbti' ? q.category.axis : q.category.temperament,
  }));

// 역방향 문항 점수 변환
function normalizeScore(value: number, reversed: boolean): number {
  return reversed ? 8 - value : value;
}

// MBTI 채점
function scoreMBTI(answers: Answer[]): MBTIResult {
  const axisScores: Record<MBTIAxis, number[]> = { EI: [], SN: [], TF: [], JP: [] };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question || question.category.type !== 'mbti') continue;
    const score = normalizeScore(answer.value, question.reversed);
    axisScores[question.category.axis].push(score);
  }

  const numQ = 15; // 축당 문항 수
  const minScore = numQ * 1; // 최소 점수 (모두 1점) = 15
  const maxScore = numQ * 7; // 최대 점수 (모두 7점) = 105
  const midpoint = numQ * 4; // 중간점 (모두 4점) = 60
  const range = maxScore - minScore; // 실제 점수 범위 = 90

  const calcAxis = (axis: MBTIAxis) => {
    const total = axisScores[axis].reduce((a, b) => a + b, 0);
    // 0~100% 스케일로 변환 (50% = 중간점, >50% = E/N/F/P)
    const percentage = Math.round(((total - minScore) / range) * 100);
    return { score: total, percentage };
  };

  const ei = calcAxis('EI');
  const sn = calcAxis('SN');
  const tf = calcAxis('TF');
  const jp = calcAxis('JP');

  const axes = {
    EI: { ...ei, label: (ei.score > midpoint ? 'E' : 'I') as 'E' | 'I' },
    SN: { ...sn, label: (sn.score > midpoint ? 'N' : 'S') as 'S' | 'N' },
    TF: { ...tf, label: (tf.score > midpoint ? 'F' : 'T') as 'T' | 'F' },
    JP: { ...jp, label: (jp.score > midpoint ? 'P' : 'J') as 'J' | 'P' },
  };

  return {
    type: `${axes.EI.label}${axes.SN.label}${axes.TF.label}${axes.JP.label}`,
    axes,
  };
}

// 기질 채점
function scoreTemperament(answers: Answer[]): TemperamentResult {
  const tempScores: Record<TemperamentType, number[]> = { S: [], C: [], P: [], M: [] };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question || question.category.type !== 'temperament') continue;
    const score = normalizeScore(answer.value, question.reversed);
    tempScores[question.category.temperament].push(score);
  }

  const numQ = 10; // 기질당 문항 수
  const minScore = numQ * 1; // 최소 점수 = 10
  const maxScore = numQ * 7; // 최대 점수 = 70
  const range = maxScore - minScore; // 실제 범위 = 60

  const all = Object.fromEntries(
    (['S', 'C', 'P', 'M'] as TemperamentType[]).map((t) => {
      const total = tempScores[t].reduce((a, b) => a + b, 0);
      // 0~100% 스케일로 정규화 (최소=0%, 최대=100%)
      return [t, { score: total, percentage: Math.round(((total - minScore) / range) * 100) }];
    })
  ) as Record<TemperamentType, { score: number; percentage: number }>;

  // 점수 내림차순 정렬
  const sorted = (['S', 'C', 'P', 'M'] as TemperamentType[]).sort(
    (a, b) => all[b].score - all[a].score
  );

  return {
    code: `${sorted[0]}${sorted[1]}`,
    primary: { type: sorted[0], ...all[sorted[0]] },
    secondary: { type: sorted[1], ...all[sorted[1]] },
    all,
  };
}

// 신뢰도 검증
function checkReliability(answers: Answer[]): ReliabilityResult {
  const answerMap = new Map<string, number>();
  for (const a of answers) {
    const question = questions.find((q) => q.id === a.questionId);
    if (!question) continue;
    answerMap.set(a.questionId, normalizeScore(a.value, question.reversed));
  }

  const details = validationPairs.map((pair) => {
    const origScore = answerMap.get(pair.originalId) ?? 0;
    const valScore = answerMap.get(pair.validationId) ?? 0;
    const diff = Math.abs(origScore - valScore);
    return {
      originalId: pair.originalId,
      validationId: pair.validationId,
      diff,
      warning: diff >= 4,
    };
  });

  const warningCount = details.filter((d) => d.warning).length;
  let grade: 'A' | 'B' | 'C';
  if (warningCount <= 2) grade = 'A';
  else if (warningCount <= 5) grade = 'B';
  else grade = 'C';

  return { grade, totalPairs: details.length, warningCount, details };
}

// 최종 결과 산출
export function calculateResult(answers: Answer[]): TestResult {
  const mbti = scoreMBTI(answers);
  const temperament = scoreTemperament(answers);
  const reliability = checkReliability(answers);

  return {
    mbti,
    temperament,
    reliability,
    fullCode: `${mbti.type}-${temperament.code}`,
  };
}
