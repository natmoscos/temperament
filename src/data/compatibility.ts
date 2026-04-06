// ────────────────────────────────────────────
// 궁합 분석 엔진
// MBTI 인지기능 호환성 + 기질 화학반응
// ────────────────────────────────────────────

import { expandedChemistry, ExpandedChemistry } from './compatibility-details';

// MBTI 인지기능 스택
const cognitiveStacks: Record<string, string[]> = {
  ISTJ: ['Si','Te','Fi','Ne'], ISFJ: ['Si','Fe','Ti','Ne'],
  INFJ: ['Ni','Fe','Ti','Se'], INTJ: ['Ni','Te','Fi','Se'],
  ISTP: ['Ti','Se','Ni','Fe'], ISFP: ['Fi','Se','Ni','Te'],
  INFP: ['Fi','Ne','Si','Te'], INTP: ['Ti','Ne','Si','Fe'],
  ESTP: ['Se','Ti','Fe','Ni'], ESFP: ['Se','Fi','Te','Ni'],
  ENFP: ['Ne','Fi','Te','Si'], ENTP: ['Ne','Ti','Fe','Si'],
  ESTJ: ['Te','Si','Ne','Fi'], ESFJ: ['Fe','Si','Ne','Ti'],
  ENFJ: ['Fe','Ni','Se','Ti'], ENTJ: ['Te','Ni','Se','Fi'],
};

// 전통적 궁합 (Golden Pair & Silver Pair)
const idealPairs: Record<string, string[]> = {
  INFP: ['ENFJ','ENTJ'], ENFP: ['INFJ','INTJ'],
  INFJ: ['ENFP','ENTP'], ENFJ: ['INFP','ISFP'],
  INTP: ['ENTJ','ENFJ'], ENTP: ['INFJ','INTJ'],
  INTJ: ['ENFP','ENTP'], ENTJ: ['INFP','INTP'],
  ISFP: ['ENFJ','ESFJ'], ESFP: ['ISFJ','ISTJ'],
  ISFJ: ['ESFP','ESTP'], ESFJ: ['ISTP','ISFP'],
  ISTP: ['ESFJ','ESTJ'], ESTP: ['ISFJ','ISTJ'],
  ISTJ: ['ESFP','ESTP'], ESTJ: ['ISTP','ISFP'],
};

// 기질 조합 화학 반응
const temperamentChemistry: Record<string, { score: number; dynamic: string; strengths: string[]; challenges: string[] }> = {
  'S-S': { score: 85, dynamic: '함께 있으면 에너지가 폭발하는 조합입니다. 즐거움과 활기가 넘치지만, 둘 다 깊이 있는 대화를 피하면 관계가 피상적이 될 수 있습니다.',
    strengths: ['함께 있으면 즐거움이 배가됨', '사교적 활동에서 환상의 팀', '긍정적 에너지 시너지'],
    challenges: ['진지한 대화를 미루는 경향', '장기 계획 수립이 약함', '갈등을 유머로 넘기다 키울 수 있음'] },
  'S-C': { score: 75, dynamic: '다혈질의 밝은 에너지와 담즙질의 추진력이 만나면 강력한 팀이 됩니다. 하지만 담즙질이 주도하고 다혈질이 따르는 패턴이 고착되면 불균형이 생깁니다.',
    strengths: ['실행력이 매우 강한 조합', '사교성 + 리더십의 시너지', '서로의 약점을 보완'],
    challenges: ['주도권 싸움 가능성', '다혈질이 억압당할 수 있음', '속도 차이로 인한 갈등'] },
  'S-P': { score: 90, dynamic: '가장 편안하고 조화로운 조합 중 하나입니다. 다혈질의 활기와 점액질의 안정감이 완벽한 균형을 이룹니다.',
    strengths: ['자연스러운 균형과 조화', '갈등이 거의 없음', '서로에게 편안한 존재'],
    challenges: ['변화에 대한 동력이 부족할 수 있음', '점액질이 다혈질의 속도에 지칠 수 있음', '중요한 결정을 미루는 경향'] },
  'S-M': { score: 65, dynamic: '밝음과 깊이가 만나는 매력적이지만 도전적인 조합입니다. 다혈질은 우울질에게 활기를, 우울질은 다혈질에게 깊이를 줍니다.',
    strengths: ['서로에게 없는 것을 줌', '창의적 시너지 가능', '다혈질이 우울질을 밝게 해줌'],
    challenges: ['에너지 수준 차이가 큼', '다혈질의 가벼움이 우울질을 상처 줄 수 있음', '소통 방식의 근본적 차이'] },
  'C-S': { score: 75, dynamic: '담즙질이 방향을 제시하고 다혈질이 분위기를 만드는 역동적 조합입니다.',
    strengths: ['리더십 + 사교성의 강력한 팀', '목표 달성 능력이 뛰어남', '서로의 강점이 보완적'],
    challenges: ['담즙질의 지배적 성향', '감정적 깊이 부족 가능', '경쟁이 될 수 있음'] },
  'C-C': { score: 55, dynamic: '두 불꽃이 만나면 엄청난 성과를 내거나, 격렬한 충돌이 일어납니다. 중간은 없습니다.',
    strengths: ['목표 달성 능력 극대화', '서로의 야망을 이해', '강력한 파트너십 가능'],
    challenges: ['주도권 싸움이 치열', '양보가 어려움', '감정적 돌봄이 부족'] },
  'C-P': { score: 80, dynamic: '담즙질의 추진력과 점액질의 안정감이 만나 효율적이고 균형 잡힌 관계를 만듭니다.',
    strengths: ['리더-서포터 역할 분담이 자연스러움', '갈등이 적음', '안정적이면서 생산적'],
    challenges: ['점액질이 담즙질에게 휘둘릴 수 있음', '점액질의 의견이 묻힐 수 있음', '담즙질의 성급함에 점액질이 지칠 수 있음'] },
  'C-M': { score: 70, dynamic: '실행력과 완벽주의가 만나면 놀라운 결과물을 만들어냅니다. 하지만 두 기질 모두 타협이 어렵습니다.',
    strengths: ['높은 기준의 성과물 생산', '전략적 + 분석적 시너지', '서로의 능력에 대한 존경'],
    challenges: ['둘 다 비판적이라 상처를 줄 수 있음', '감정 표현이 부족', '완벽주의의 충돌'] },
  'P-S': { score: 90, dynamic: '점액질의 안정감이 다혈질의 활기를 받아들여 매우 편안한 관계를 만듭니다.',
    strengths: ['서로에게 가장 편안한 존재', '자연스러운 조화', '갈등 해결이 원만'],
    challenges: ['성장 동력이 부족할 수 있음', '외부 자극이 없으면 매너리즘', '다혈질의 에너지에 점액질이 피로할 수 있음'] },
  'P-C': { score: 80, dynamic: '점액질의 부드러움이 담즙질의 날카로움을 중화시키는 보완적 관계입니다.',
    strengths: ['자연스러운 역할 분담', '점액질이 담즙질을 진정시킴', '안정적 파트너십'],
    challenges: ['점액질이 자기 주장을 못 할 수 있음', '권력 불균형', '점액질의 수동적 저항'] },
  'P-P': { score: 75, dynamic: '세상에서 가장 평화로운 조합이지만, 변화와 성장의 동력이 부족할 수 있습니다.',
    strengths: ['갈등이 거의 없음', '서로에게 매우 편안', '안정적이고 예측 가능한 관계'],
    challenges: ['발전이 정체될 수 있음', '중요한 결정을 계속 미룸', '외부 자극 부족'] },
  'P-M': { score: 70, dynamic: '고요함과 깊이가 만나는 조용하지만 의미 있는 관계입니다.',
    strengths: ['깊이 있는 대화 가능', '서로의 내면을 존중', '조용하지만 강한 유대'],
    challenges: ['에너지가 너무 낮아질 수 있음', '외부 활동이 부족', '우울질의 비판에 점액질이 상처받을 수 있음'] },
  'M-S': { score: 65, dynamic: '우울질의 깊이와 다혈질의 밝음이 서로를 매료시키지만, 유지하기 어려운 조합입니다.',
    strengths: ['서로에게 새로운 세계를 열어줌', '다혈질이 우울질을 세상으로 이끌어줌', '창의적 영감의 원천'],
    challenges: ['근본적인 에너지 차이', '우울질이 다혈질의 가벼움에 실망', '소통 방식의 괴리'] },
  'M-C': { score: 70, dynamic: '분석력과 실행력의 강력한 조합이지만, 둘 다 감정 표현에 서투릅니다.',
    strengths: ['전략적 + 실행적 시너지', '높은 기준과 성과', '지적 존중'],
    challenges: ['감정적 돌봄 부족', '비판의 날이 날카로움', '권력 다툼 가능'] },
  'M-P': { score: 70, dynamic: '우울질의 깊이와 점액질의 인내가 만나 조용하지만 단단한 관계를 만듭니다.',
    strengths: ['서로의 공간을 존중', '깊이 있는 신뢰 관계', '꾸준하고 안정적'],
    challenges: ['활력이 부족할 수 있음', '감정 표현의 부족', '변화에 대한 저항'] },
  'M-M': { score: 60, dynamic: '깊이가 만나면 영혼의 교감이 가능하지만, 두 사람 모두 우울의 나락에 빠질 위험이 있습니다.',
    strengths: ['이 세상에서 가장 깊은 이해', '예술적/지적 교감', '진정성 있는 관계'],
    challenges: ['부정적 감정의 증폭', '둘 다 비관적이 될 때 탈출구 없음', '완벽주의의 충돌'] },
};

// 인지기능 호환성 점수
function calculateCognitiveCompatibility(type1: string, type2: string): number {
  const stack1 = cognitiveStacks[type1] ?? [];
  const stack2 = cognitiveStacks[type2] ?? [];
  if (stack1.length === 0 || stack2.length === 0) return 50;

  let score = 50;

  // 주기능-보조기능 보완성
  const dom1 = stack1[0], aux1 = stack1[1];
  const dom2 = stack2[0], aux2 = stack2[1];

  // 이상적 궁합 체크
  if (idealPairs[type1]?.includes(type2)) score += 25;
  else if (idealPairs[type2]?.includes(type1)) score += 25;

  // 같은 인지기능 공유 (이해도 높음)
  const shared = stack1.filter(f => stack2.includes(f));
  score += shared.length * 5;

  // 주기능이 상대의 열등기능과 같은 경우 (성장 잠재력이지만 갈등)
  if (dom1 === stack2[3]) score += 3;
  if (dom2 === stack1[3]) score += 3;

  // E/I 보완
  if (type1[0] !== type2[0]) score += 5;

  // J/P 유사 (생활방식 호환)
  if (type1[3] === type2[3]) score += 3;

  return Math.min(100, Math.max(0, score));
}

// 기질 호환성
function getTemperamentChemistry(temp1: string, temp2: string) {
  const key = `${temp1}-${temp2}`;
  return temperamentChemistry[key] ?? {
    score: 70,
    dynamic: '독특한 기질 조합으로, 서로에 대한 이해와 노력이 관계의 질을 결정합니다.',
    strengths: ['서로의 다름에서 배울 점이 많음'],
    challenges: ['소통 방식의 차이를 이해해야 함'],
  };
}

// 소통 스타일 호환성
function getCommunicationMatch(type1: string, type2: string, temp1Primary: string, temp2Primary: string): string {
  const bothE = type1[0] === 'E' && type2[0] === 'E';
  const bothI = type1[0] === 'I' && type2[0] === 'I';
  const bothF = type1[2] === 'F' && type2[2] === 'F';
  const bothT = type1[2] === 'T' && type2[2] === 'T';

  let comm = '';
  if (bothE) {
    comm = '둘 다 외향형이라 대화가 활발하고 에너지가 넘칩니다. 다만 서로의 이야기를 듣기보다 말하려고 할 수 있으니, 의식적으로 경청하는 시간을 만들어보세요.';
  } else if (bothI) {
    comm = '둘 다 내향형이라 깊이 있는 대화가 가능하지만, 중요한 이야기를 꺼내기까지 시간이 오래 걸릴 수 있습니다. "불편한 대화"를 미루지 않는 것이 관계의 핵심입니다.';
  } else {
    comm = '외향형과 내향형의 조합은 자연스러운 균형을 만듭니다. 외향형이 대화를 이끌고, 내향형이 깊이를 더합니다. 다만 외향형은 내향형에게 충분한 생각할 시간을 주고, 내향형은 때로 먼저 의견을 표현하는 노력이 필요합니다.';
  }

  if (bothF) {
    comm += '\n\n감정형끼리의 조합이라 서로의 감정에 대한 이해도가 높습니다. 하지만 갈등 상황에서 둘 다 감정적으로 반응하면 문제 해결이 어려워질 수 있습니다.';
  } else if (bothT) {
    comm += '\n\n사고형끼리의 조합이라 논리적 대화가 원활합니다. 하지만 감정적 돌봄이 부족해질 수 있으니, 가끔은 "맞아, 힘들었겠다"라는 한마디가 필요합니다.';
  } else {
    comm += '\n\n사고형과 감정형의 조합은 관점의 균형을 제공합니다. 사고형은 객관적 해결책을, 감정형은 관계적 맥락을 고려합니다. "나는 해결책을 원하는 게 아니라 공감을 원해"라는 신호를 서로 읽는 것이 중요합니다.';
  }

  return comm;
}

// 갈등 패턴 분석
function getConflictPattern(type1: string, type2: string, temp1: string, temp2: string): string {
  const t1Primary = temp1[0];
  const t2Primary = temp2[0];

  const stressResponses: Record<string, string> = {
    S: '도피(더 많은 활동과 사람으로 채우려 함)',
    C: '투쟁(공격적으로 문제를 해결하려 함)',
    P: '순응(자신의 욕구를 억누르고 맞춤)',
    M: '동결(내면으로 철수하고 침묵)',
  };

  return `갈등이 발생하면, ${type1}-${temp1}은 ${stressResponses[t1Primary] ?? '스트레스 반응'}의 패턴을 보이고, ${type2}-${temp2}는 ${stressResponses[t2Primary] ?? '스트레스 반응'}의 패턴을 보입니다.

${t1Primary === 'C' && t2Primary === 'P' ? '담즙질이 공격하고 점액질이 움츠리는 패턴이 반복되면, 겉으로는 담즙질이 이기는 것 같지만 점액질 내부에 원망이 쌓입니다. 담즙질이 먼저 목소리를 낮추고, 점액질이 솔직하게 감정을 표현하는 연습이 필요합니다.' :
  t1Primary === 'S' && t2Primary === 'M' ? '다혈질이 문제를 가볍게 넘기려 하고 우울질이 깊이 파고들려는 패턴이 반복됩니다. 다혈질은 "그게 왜 그렇게 큰 일이야?"라고 느끼고, 우울질은 "왜 진지하게 받아들이지 않지?"라고 느낍니다. 중간 지점을 찾는 것이 핵심입니다.' :
  t1Primary === t2Primary ? `같은 ${t1Primary === 'S' ? '다혈질' : t1Primary === 'C' ? '담즙질' : t1Primary === 'P' ? '점액질' : '우울질'} 기질끼리는 스트레스 반응이 비슷해서 갈등이 증폭될 수 있습니다. 한 쪽이 먼저 한 발 물러서는 것이 중요합니다.` :
  '서로 다른 스트레스 반응 패턴을 이해하는 것이 갈등 해결의 첫걸음입니다. 상대가 스트레스를 받았을 때 "왜 저렇게 행동하지?"가 아니라 "아, 저 사람의 기질적 반응이구나"라고 이해하면 불필요한 갈등을 줄일 수 있습니다.'}`;
}

// ────────────────────────────────────────────
// 메인 궁합 분석 함수
// ────────────────────────────────────────────

export interface CompatibilityResult {
  overallScore: number;       // 종합 점수 (0-100)
  mbtiScore: number;          // MBTI 호환성
  temperamentScore: number;   // 기질 호환성
  label: string;              // "환상의 궁합", "좋은 궁합" 등
  emoji: string;
  summary: string;
  temperamentDynamic: string;
  strengths: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  communicationGuide: string;
  conflictPattern: string;
  growthTip: string;
  // 확장 콘텐츠
  datingStyle: string;
  communicationDos: string[];
  communicationDonts: string[];
  loveLanguage: string;
  dailyScenario: string;
  longTermAdvice: string;
}

export function analyzeCompatibility(
  myCode: string,   // "ENFJ-SC"
  partnerCode: string // "INTJ-MC"
): CompatibilityResult {
  const [myMbti, myTemp] = myCode.split('-');
  const [partnerMbti, partnerTemp] = partnerCode.split('-');

  const myTempPrimary = (myTemp ?? 'SC')[0];
  const partnerTempPrimary = (partnerTemp ?? 'SC')[0];

  // 점수 계산
  const mbtiScore = calculateCognitiveCompatibility(myMbti, partnerMbti);
  const tempChem = getTemperamentChemistry(myTempPrimary, partnerTempPrimary);
  const temperamentScore = tempChem.score;
  const overallScore = Math.round(mbtiScore * 0.5 + temperamentScore * 0.5);

  // 라벨
  let label: string, emoji: string;
  if (overallScore >= 85) { label = '환상의 궁합'; emoji = '💘'; }
  else if (overallScore >= 75) { label = '좋은 궁합'; emoji = '💕'; }
  else if (overallScore >= 65) { label = '성장하는 궁합'; emoji = '🌱'; }
  else if (overallScore >= 55) { label = '도전적 궁합'; emoji = '⚡'; }
  else { label = '정반대 궁합'; emoji = '🔥'; }

  // 요약
  const summary = overallScore >= 75
    ? `${myCode}와 ${partnerCode}는 서로의 강점을 이해하고 약점을 보완할 수 있는 조합입니다. 자연스러운 조화 속에서 함께 성장할 수 있는 관계입니다.`
    : overallScore >= 60
    ? `${myCode}와 ${partnerCode}는 차이점이 있지만, 그 차이가 오히려 서로에게 배울 점을 제공합니다. 서로를 이해하려는 노력이 관계를 더 깊게 만듭니다.`
    : `${myCode}와 ${partnerCode}는 매우 다른 세계관을 가진 조합입니다. 도전적이지만, 그만큼 서로에게 완전히 새로운 관점을 열어줄 수 있습니다.`;

  const communicationGuide = getCommunicationMatch(myMbti, partnerMbti, myTemp ?? 'SC', partnerTemp ?? 'SC');
  const conflictPattern = getConflictPattern(myMbti, partnerMbti, myTemp ?? 'SC', partnerTemp ?? 'SC');

  const growthTip = `이 관계에서 성장하려면: ${myCode}는 ${partnerTempPrimary === 'S' ? '상대의 밝은 에너지를 즐기되, 깊이 있는 대화도 요청하세요' : partnerTempPrimary === 'C' ? '상대의 추진력을 존중하되, 자신의 속도도 지켜주세요' : partnerTempPrimary === 'P' ? '상대의 침묵이 동의가 아닐 수 있음을 기억하세요' : '상대의 완벽주의를 이해하되, 불완전함도 괜찮다고 말해주세요'}. ${partnerCode}는 ${myTempPrimary === 'S' ? '상대의 활기를 소중히 여기되, 진지한 순간에는 함께 머물러주세요' : myTempPrimary === 'C' ? '상대의 결단력에 감사하되, 부드러운 표현도 요청하세요' : myTempPrimary === 'P' ? '상대의 평화로움을 존중하되, 가끔은 함께 모험도 해보세요' : '상대의 깊이를 이해하되, 가벼운 즐거움도 함께 나눠주세요'}.`;

  // 확장 콘텐츠 가져오기
  const tempKey = `${myTempPrimary}-${partnerTempPrimary}`;
  const expanded = expandedChemistry[tempKey];

  // 확장 데이터가 있으면 그걸 사용, 없으면 기존 데이터를 변환
  const strengths = expanded
    ? expanded.strengths
    : tempChem.strengths.map(s => ({ title: s, description: '' }));
  const challenges = expanded
    ? expanded.challenges
    : tempChem.challenges.map(c => ({ title: c, description: '' }));

  return {
    overallScore,
    mbtiScore,
    temperamentScore,
    label,
    emoji,
    summary,
    temperamentDynamic: expanded?.dynamic ?? tempChem.dynamic,
    strengths,
    challenges,
    communicationGuide,
    conflictPattern,
    growthTip,
    // 확장 콘텐츠
    datingStyle: expanded?.datingStyle ?? '',
    communicationDos: expanded?.communicationDos ?? [],
    communicationDonts: expanded?.communicationDonts ?? [],
    loveLanguage: expanded?.loveLanguage ?? '',
    dailyScenario: expanded?.dailyScenario ?? '',
    longTermAdvice: expanded?.longTermAdvice ?? '',
  };
}
