import { Answer, MBTIAxis, TemperamentType, MBTIResult, TemperamentResult, TestResult } from './types';
import { quickQuestions } from './questions-quick';

function normalizeScore(value: number, reversed: boolean): number {
  return reversed ? (8 - value) : value;
}

export function calculateQuickResult(answers: Answer[]): TestResult {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // MBTI 점수 (축당 4문항)
  const mbtiScores: Record<MBTIAxis, number[]> = { EI: [], SN: [], TF: [], JP: [] };

  // 기질 점수 (기질당 3문항)
  const tempScores: Record<TemperamentType, number[]> = { S: [], C: [], P: [], M: [] };

  for (const q of quickQuestions) {
    if (q.validationPairId) continue; // 검증 문항은 점수에서 제외
    const raw = answerMap.get(q.id);
    if (raw === undefined) continue;
    const score = normalizeScore(raw, q.reversed);

    if (q.category.type === 'mbti') {
      mbtiScores[q.category.axis].push(score);
    } else {
      tempScores[q.category.temperament].push(score);
    }
  }

  // MBTI 계산
  const calcAxis = (scores: number[]): { score: number; percentage: number } => {
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 4;
    const pct = Math.round(((avg - 1) / 6) * 100);
    return { score: avg, percentage: pct };
  };

  const ei = calcAxis(mbtiScores.EI);
  const sn = calcAxis(mbtiScores.SN);
  const tf = calcAxis(mbtiScores.TF);
  const jp = calcAxis(mbtiScores.JP);

  const mbtiResult: MBTIResult = {
    type: `${ei.percentage >= 50 ? 'E' : 'I'}${sn.percentage >= 50 ? 'N' : 'S'}${tf.percentage >= 50 ? 'F' : 'T'}${jp.percentage >= 50 ? 'P' : 'J'}`,
    axes: {
      EI: { ...ei, label: ei.percentage >= 50 ? 'E' : 'I' },
      SN: { ...sn, label: sn.percentage >= 50 ? 'N' : 'S' },
      TF: { ...tf, label: tf.percentage >= 50 ? 'F' : 'T' },
      JP: { ...jp, label: jp.percentage >= 50 ? 'P' : 'J' },
    },
  };

  // 기질 계산
  const tempResults: { type: TemperamentType; avg: number }[] = (['S', 'C', 'P', 'M'] as TemperamentType[]).map(t => ({
    type: t,
    avg: tempScores[t].length > 0 ? tempScores[t].reduce((a, b) => a + b, 0) / tempScores[t].length : 0,
  }));

  tempResults.sort((a, b) => b.avg - a.avg);
  const totalAvg = tempResults.reduce((s, t) => s + t.avg, 0) || 1;

  const allTemps = {} as Record<TemperamentType, { score: number; percentage: number }>;
  for (const t of tempResults) {
    allTemps[t.type] = { score: t.avg, percentage: Math.round((t.avg / totalAvg) * 100) };
  }

  const temperamentResult: TemperamentResult = {
    code: `${tempResults[0].type}${tempResults[1].type}`,
    primary: { type: tempResults[0].type, score: tempResults[0].avg, percentage: allTemps[tempResults[0].type].percentage },
    secondary: { type: tempResults[1].type, score: tempResults[1].avg, percentage: allTemps[tempResults[1].type].percentage },
    all: allTemps,
  };

  // 간편 검사 신뢰도 (항상 B등급 — 문항 수 부족)
  const reliability = {
    grade: 'B' as const,
    totalPairs: 2,
    warningCount: 0,
    details: [],
  };

  return {
    mbti: mbtiResult,
    temperament: temperamentResult,
    reliability,
    fullCode: `${mbtiResult.type}-${temperamentResult.code}`,
  };
}
