/**
 * PDF 프리미엄: 192 조합 고유 심층 분석
 *
 * 우리 사이트의 최고 차별점 — "같은 MBTI, 다른 기질"의 세계 유일 통합 분석.
 * 16 MBTI × 12 기질 조합 = 192가지 고유 유형 각각에 대한 심층 프로파일.
 *
 * 구조:
 *   12 기질 조합별 "확장 메타데이터" (역사적 인물, 빛나는 순간, 무너지는 순간)
 *   + MBTI와 결합 시 동적 서사 생성
 *   = 총 192개 고유 분석
 *
 * 이 콘텐츠는 **다른 MBTI 사이트에서는 절대 얻을 수 없음**.
 * PDF 구매의 핵심 정당화 포인트.
 */

import type { MbtiType } from './pdf-premium-compatibility';

export type ComboCode =
  | 'SC' | 'SP' | 'SM'
  | 'CS' | 'CP' | 'CM'
  | 'PS' | 'PC' | 'PM'
  | 'MS' | 'MC' | 'MP';

export interface ComboExtended {
  nickname: string;
  essence: string;              // 한 줄 본질
  historicalFigures: string[];  // 2~3명의 대표 인물 (MBTI와 무관한 기질 측면)
  shiningMoment: string;        // 이 조합이 가장 빛나는 상황
  breakingPoint: string;        // 이 조합이 가장 무너지는 상황
  uniqueTrait: string;          // 이 조합만의 고유 특성 (1~2 문단)
  growthDirection: string;      // 이 조합의 성장 방향
}

/**
 * 12 기질 조합의 확장 프로파일.
 * (주기질 × 보조기질 순서로 읽음. 예: SC = Sanguine 주 + Choleric 보조)
 */
export const COMBO_EXTENDED: Record<ComboCode, ComboExtended> = {
  SC: {
    nickname: '탁월한 지도자',
    essence: '사람들을 끌어당기며 목표를 향해 이끄는 카리스마',
    historicalFigures: ['오프라 윈프리 (대화의 거장)', '리처드 브랜슨 (모험적 CEO)', '시어도어 루즈벨트 (열정적 대통령)'],
    shiningMoment: '수백 명 앞에서 비전을 제시하고 즉시 행동으로 옮기게 만드는 순간. 분위기 메이커이면서도 조직을 진짜 움직이는 결과를 만드는 현장.',
    breakingPoint: '혼자 조용히 깊이 생각해야 하는 시기. 자극이 없으면 공허함에 빠지고, 과부하에서도 "괜찮아 보이는" 가면 때문에 주변이 신호를 못 잡습니다.',
    uniqueTrait: '다혈질의 봄(Spring) 에너지가 담즙질의 여름(Summer) 추진력과 결합되어, 이 조합의 사람은 대중을 끌어모으면서 동시에 구체적 결과를 만들어냅니다. 12 조합 중 가장 "따라가고 싶은 리더"로 인식되는 유형. 단, 본인의 내면 성찰은 가장 약한 영역이라 40대 이후 번아웃 리스크가 큽니다.',
    growthDirection: '월간 1회 이상의 혼자 시간 + 감정 일기. 외향 에너지가 내면의 공허를 덮어 쓰지 않도록 정기 점검 시스템 구축이 핵심.',
  },
  SP: {
    nickname: '즐거움을 주는 사람',
    essence: '시끄럽지 않으면서 분위기를 따뜻하게 만드는 평화의 사람',
    historicalFigures: ['돌리 파튼 (따뜻한 대중 스타)', '엘렌 드제너러스 (편안한 토크쇼 진행자)', '톰 행크스 (호감의 대명사)'],
    shiningMoment: '갈등 상황에 들어가 농담 한 마디로 분위기를 완화하는 순간. 적이 없는 사람. 모두가 좋아하는 사람으로 포지셔닝되어 장기 신뢰를 쌓습니다.',
    breakingPoint: '자기 목소리를 내야 하는 순간. 불편한 진실을 말해야 할 때 본능적으로 회피하다 "모호한 사람"으로 오해받곤 합니다.',
    uniqueTrait: '다혈질의 밝음과 점액질의 수용성이 균형을 이뤄, 12 조합 중 정서적으로 가장 안정된 대인관계를 형성합니다. 둘 다 "안정적(Stable)" Eysenck 축에 위치해 감정 기복이 가장 적음. 단 편안함에 안주해 자기 성장 욕구가 약해질 수 있습니다.',
    growthDirection: '일부러 "불편한 진실"을 말하는 연습. 관계를 깨뜨리지 않으면서도 자기 경계를 세우는 기술이 평생 과제.',
  },
  SM: {
    nickname: '섬세한 팔방미인',
    essence: '밝은 무대 뒤에 깊은 내면 세계를 숨긴 예술적 표현주의자',
    historicalFigures: ['로빈 윌리엄스 (유머 뒤의 우울)', '에이미 와인하우스 (활기와 고통의 공존)', '앤서니 부르댕 (세계를 누비던 내향인)'],
    shiningMoment: '공개된 자리에서 유머와 쾌활함을 뿜으면서 동시에 깊은 통찰을 던지는 순간. 예술·엔터테인먼트에서 강한 팬층을 만듭니다.',
    breakingPoint: '공개 페르소나와 실제 내면의 괴리가 커질 때. 남들은 "저 사람 재미있고 잘 산다" 보는데 본인만 아는 공허가 깊어져 우울로 갈 수 있습니다.',
    uniqueTrait: '안정적 외향(Sanguine) + 불안정 내향(Melancholic)이라는 정반대 축이 한 사람 안에 공존합니다. 12 조합 중 감정 스펙트럼이 가장 넓음. 사람들 앞에서 빛나는 에너지와 혼자일 때의 어둠이 모두 진짜라는 점을 받아들이는 것이 핵심.',
    growthDirection: '창작·예술·표현을 통한 내면 배출 채널 필수. 억누르면 폭발, 표현하면 치유되는 유형.',
  },
  CS: {
    nickname: '타고난 카리스마',
    essence: '목표를 위해 사람을 전략적으로 움직이는 지휘관',
    historicalFigures: ['스티브 잡스 (비전으로 이끄는 리더)', '마거릿 대처 (철의 여인)', '고든 램지 (강렬한 추진력)'],
    shiningMoment: '명확한 목표 아래 팀을 압도적 속도로 이끌어 결과를 만드는 순간. 연설·영업·조직 리더십에서 폭발력.',
    breakingPoint: '목표 앞에서 사람을 도구화하는 순간. 결과는 나오지만 관계 비용이 쌓여, 40대 이후 "아무도 나를 좋아하지 않는다"는 고립감에 직면합니다.',
    uniqueTrait: '담즙질의 여름(Summer) 열정을 다혈질의 봄(Spring) 사교력으로 전달. 단순한 독재자가 아니라 "설득하며 이끄는" 유형. 단 SC와 달리 사람보다 목표가 먼저이므로 과정의 인간성을 놓치기 쉽습니다.',
    growthDirection: '목표 달성 뒤 "같이 한 사람들에게 어떻게 보상할까"를 의식적으로 설계하는 습관. 결과와 관계를 동시에 관리.',
  },
  CP: {
    nickname: '타고난 행정가',
    essence: '겉으로 냉정해 보이지만 내면은 불꽃인 조용한 전략가',
    historicalFigures: ['워런 버핏 (오랜 기다림의 대가)', '앙겔라 메르켈 (차분한 리더)', '클린트 이스트우드 (침묵의 카리스마)'],
    shiningMoment: '10년짜리 프로젝트를 흔들림 없이 완수하는 순간. 시끄러운 리더들이 소진될 때 여전히 서 있는 존재감.',
    breakingPoint: '속마음을 충분히 표현 안 해서 주변이 "이 사람 진의를 모르겠다" 느끼는 순간. 신뢰는 있는데 친밀감이 부족해 고독.',
    uniqueTrait: '담즙질 불안정 외향 + 점액질 안정 내향 = 내면 불꽃 × 외면 냉정. 12 조합 중 "조용히 강한" 리더십의 교과서. 장기전에 무조건 강하지만 단기 스파크는 약함.',
    growthDirection: '의도적으로 감정·생각을 언어화해 공유하는 훈련. 침묵이 기본값이면 관계가 얕게 고립됨.',
  },
  CM: {
    nickname: '섬세하고 뛰어난 언변가',
    essence: '이상을 향한 완벽주의적 추진력을 가진 개혁가',
    historicalFigures: ['윈스턴 처칠 (완벽주의 전략가)', '스티븐 호킹 (이상을 실현하는 과학자)', '버지니아 울프 (분석적 작가)'],
    shiningMoment: '높은 기준의 구조·시스템·정책을 설계하고 밀어붙이는 순간. 설득과 논증에서 12 조합 중 가장 강력한 영향력.',
    breakingPoint: '자기 기준을 자신에게도 가혹하게 적용해 번아웃 빠지는 순간. 두 축 모두 불안정(Unstable)이라 내면 긴장이 항상 높음.',
    uniqueTrait: '담즙질 여름 + 우울질 가을. 결단력과 분석력이 동시에 최대. "이상적인 세상은 가능하다"는 신념이 개혁의 동력. 단 현실의 타협을 견디기 어려워 관계와 조직에서 마찰.',
    growthDirection: '완벽 대신 "80%면 충분"을 의식적으로 받아들이는 훈련. 자기 비판의 강도를 의도적으로 낮추기.',
  },
  PS: {
    nickname: '관계가 편안한 사람',
    essence: '갈등 없이 자연스럽게 관계를 따뜻하게 유지하는 이상적 동반자',
    historicalFigures: ['미스터 로저스 (평생 따뜻함)', '키아누 리브스 (낮은 자세의 스타)', '지미 카터 (평화주의 대통령)'],
    shiningMoment: '갈등이 폭발할 상황에 들어가 조용히 분위기를 중화시키는 순간. 모두가 "저 사람이 있으면 편하다" 인식.',
    breakingPoint: '자기 욕구를 표현해야 할 순간. 평화 유지가 너무 우선이라 내면에 쌓인 불만이 결국 우회로로 터집니다.',
    uniqueTrait: '점액질 겨울 + 다혈질 봄. 두 축 모두 안정(Stable)이라 12 조합 중 정서적 동요가 가장 적음. 따뜻하지만 수동적으로 비칠 위험.',
    growthDirection: '"불편한 진실을 말하는 용기" 연습. 관계의 깊이는 화합이 아닌 진실에서 옴.',
  },
  PC: {
    nickname: '잠재력이 뛰어난 사람',
    essence: '부드러운 외피 속 강철 의지를 숨긴 실용주의자',
    historicalFigures: ['빌 게이츠 (조용한 추진력)', '드와이트 아이젠하워 (차분한 장군)', '이소룡 (침착한 집중)'],
    shiningMoment: '평소엔 조용한데 결정적 순간 놀라운 실행력을 발휘하는 순간. 주변이 "저 사람이 이렇게 강했나" 놀라곤 합니다.',
    breakingPoint: '내면 의지를 외부에 드러내지 않아 "그냥 평범한 사람"으로 저평가되는 순간. 본인 가치를 세상에 알리는 데 서툼.',
    uniqueTrait: '점액질 안정 내향 + 담즙질 불안정 외향. 겉은 물, 속은 불. 불필요한 갈등은 만들지 않으면서 필요할 때 과감한 결정.',
    growthDirection: '자기 성취와 강점을 의도적으로 표현하는 훈련. 침묵의 겸손이 저평가로 이어지지 않도록 자기 PR.',
  },
  PM: {
    nickname: '성실한 후원자',
    essence: '서두르지 않는 깊이로 장기 관계와 프로젝트에서 빛나는 사색적 관찰자',
    historicalFigures: ['칼 융 (내면 깊이의 심리학자)', '프레드 로저스 (아동 교육의 헌신자)', '오드리 헵번 (조용한 우아함)'],
    shiningMoment: '상담·코칭·교육·돌봄에서 상대의 진짜 필요를 꿰뚫어 보는 순간. 누구보다 신뢰할 수 있는 묵직한 존재감.',
    breakingPoint: '자신의 가치를 세상에 드러내야 할 순간. 12 조합 중 가장 내향적이라 SNS·네트워킹에 약해 저평가 쉽습니다.',
    uniqueTrait: '점액질 겨울 + 우울질 가을. 두 축 모두 내향(Introvert). 내적 성찰의 깊이가 가장 깊은 유형. 화려하지 않지만 만난 사람 모두에게 오래 기억됨.',
    growthDirection: '소수의 깊은 관계와 충분한 고독 시간 확보. 외부 평가가 없어도 내면 가치를 알아볼 줄 아는 자기 인정.',
  },
  MS: {
    nickname: '인간적인 사람',
    essence: '깊은 감정을 밝은 표현으로 승화시키는 깊은 표현주의자',
    historicalFigures: ['조지 오웰 (사회적 통찰 작가)', '레오나르도 디카프리오 (환경 운동가 배우)', '조니 캐시 (깊이 있는 가수)'],
    shiningMoment: '오랜 준비와 연구를 거쳐 발표·강연·창작물을 세상에 내놓는 순간. "축적과 분출"의 패턴이 대중에게 강한 인상.',
    breakingPoint: '자기 기준과 타인 기대를 동시에 충족하려다 완벽주의적 소진에 빠지는 순간. 이상주의자의 고질적 한계.',
    uniqueTrait: '우울질 가을 + 다혈질 봄. 깊이(Melancholic) × 표현력(Sanguine)의 희귀 결합. 예술·철학·심리학에서 강점.',
    growthDirection: '완벽한 준비 대신 "초안 공개"의 용기. 세상에 꺼내놓은 뒤 피드백으로 다듬기.',
  },
  MC: {
    nickname: '철저한 준비성의 사람',
    essence: '분석적 깊이와 실행력을 갖춘 원칙주의적 개혁가',
    historicalFigures: ['알버트 아인슈타인 (분석적 천재)', '마리 퀴리 (집요한 연구자)', '레오나르도 다빈치 (완벽주의적 다재다능)'],
    shiningMoment: '장기 전략·정책·시스템 설계에서 우울질의 가을 정밀함 뒤 담즙질의 여름 실행이 폭발하는 순간. 한번 시작한 일은 반드시 최고 수준.',
    breakingPoint: '원칙과 현실의 타협점을 못 찾는 순간. 두 축 모두 불안정(Unstable)이라 내면 긴장이 가장 높아 번아웃과 우울 주의.',
    uniqueTrait: '우울질 가을 + 담즙질 여름. 분석과 추진의 결합. 세상을 이상적으로 바꾸려는 강한 동력이 있지만 그 기준을 자신에게도 적용해 내상.',
    growthDirection: '자기 비판의 강도를 조절. 원칙을 지키면서도 유연성 훈련. 휴식을 "비효율"이 아닌 "재충전"으로 재정의.',
  },
  MP: {
    nickname: '탁월한 전문가',
    essence: '구조화된 환경에서 한 분야를 묵묵히 파고드는 조용한 대가',
    historicalFigures: ['이사벨 마이어스 (MBTI 창시자)', '제인 구달 (침묵의 관찰자)', '스티븐 킹 (고독한 작가)'],
    shiningMoment: '한 분야에서 10년 이상 쌓은 전문성이 인정받는 순간. 소규모의 깊은 관계에서 한번 신뢰를 쌓으면 매우 헌신적.',
    breakingPoint: '자기 가치를 세상에 드러내야 할 때. 두 축 모두 내향이라 SNS·네트워킹·세일즈가 고통스러움.',
    uniqueTrait: '우울질 가을 + 점액질 겨울. 깊이와 지속력의 결합. 외부 자극보다 내면의 지적 탐구에서 에너지.',
    growthDirection: '자기 작품·성취를 세상에 알리는 마케팅 훈련. 겸손이 저평가로 이어지지 않도록.',
  },
};

/**
 * MBTI × 기질 조합의 동적 분석 생성
 * - 192 조합 고유 "결합 특성" 반환
 */
export interface ComboAnalysis {
  combo: ComboExtended;
  mbtiMeetCombo: string;      // MBTI가 이 기질을 만났을 때 일어나는 일
  sameTypeDiff: string;       // 같은 MBTI인데 다른 기질인 사람과의 차이
  sameComboDiff: string;      // 같은 기질인데 다른 MBTI인 사람과의 차이
  integratedLifePath: string; // 이 조합의 통합된 인생 경로
}

const MBTI_GROUP: Record<MbtiType, 'NT' | 'NF' | 'SJ' | 'SP'> = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

const MBTI_GROUP_NAME: Record<'NT' | 'NF' | 'SJ' | 'SP', string> = {
  NT: '분석가(NT)', NF: '이상주의자(NF)', SJ: '관리자(SJ)', SP: '탐험가(SP)',
};

const COMBO_DOMINANT: Record<ComboCode, 'S' | 'C' | 'P' | 'M'> = {
  SC: 'S', SP: 'S', SM: 'S',
  CS: 'C', CP: 'C', CM: 'C',
  PS: 'P', PC: 'P', PM: 'P',
  MS: 'M', MC: 'M', MP: 'M',
};

const TEMP_NAME: Record<'S' | 'C' | 'P' | 'M', string> = {
  S: '다혈질', C: '담즙질', P: '점액질', M: '우울질',
};

export function generateComboAnalysis(mbtiType: MbtiType, comboCode: ComboCode): ComboAnalysis {
  const combo = COMBO_EXTENDED[comboCode];
  const group = MBTI_GROUP[mbtiType];
  const groupName = MBTI_GROUP_NAME[group];
  const dom = COMBO_DOMINANT[comboCode];
  const domName = TEMP_NAME[dom];

  // MBTI × 기질 결합 서술
  const mbtiMeetCombo = buildMbtiMeetCombo(mbtiType, group, comboCode, combo);
  const sameTypeDiff = buildSameTypeDiff(mbtiType, comboCode, domName);
  const sameComboDiff = buildSameComboDiff(mbtiType, groupName, comboCode, combo);
  const integratedLifePath = buildIntegratedPath(mbtiType, combo, group);

  return { combo, mbtiMeetCombo, sameTypeDiff, sameComboDiff, integratedLifePath };
}

function buildMbtiMeetCombo(mbtiType: MbtiType, group: string, _code: ComboCode, combo: ComboExtended): string {
  const groupDesc: Record<string, string> = {
    NT: '논리와 체계를 중시하는 사고가',
    NF: '이상과 가치를 중시하는 감성이',
    SJ: '안정과 책임을 중시하는 성실함이',
    SP: '현장과 즉흥을 중시하는 유연성이',
  };
  return `${mbtiType}의 ${groupDesc[group]} "${combo.nickname}" 기질 조합을 만나면 다음과 같은 고유 패턴이 나타납니다.\n\n${combo.uniqueTrait}\n\n이 결합이 만드는 당신만의 특징은 단순한 ${mbtiType} 분석에서는 보이지 않는 영역입니다. 같은 ${mbtiType} 중에서도 이 기질 조합을 가진 사람은 실제로 다른 삶을 살아갑니다.`;
}

function buildSameTypeDiff(mbtiType: MbtiType, comboCode: ComboCode, domName: string): string {
  const otherCombos = (['SC','SP','SM','CS','CP','CM','PS','PC','PM','MS','MC','MP'] as ComboCode[])
    .filter((c) => c !== comboCode)
    .slice(0, 3)
    .map((c) => `${mbtiType}-${c}(${COMBO_EXTENDED[c].nickname})`);

  return `같은 ${mbtiType} 유형이어도 기질에 따라 완전히 다른 사람이 됩니다. 예시로 ${otherCombos.join(', ')} — 이들은 이름은 ${mbtiType}이지만 일상에서 내리는 결정, 스트레스 반응, 관계 패턴이 서로 크게 다릅니다.\n\n당신의 ${mbtiType}-${comboCode}는 ${domName} 기질이 주도하는 버전. MBTI만 보면 놓치는 "왜 나는 같은 ${mbtiType}인데 저 친구랑 스타일이 다를까"의 답이 바로 이 기질 차이에 있습니다.`;
}

function buildSameComboDiff(mbtiType: MbtiType, groupName: string, comboCode: ComboCode, combo: ComboExtended): string {
  return `거꾸로, 같은 "${combo.nickname}"(${comboCode}) 기질이어도 MBTI 유형에 따라 표현 방식이 다릅니다. 당신은 ${groupName} 집단 안의 ${mbtiType}로서 이 기질을 표현합니다.\n\n예를 들어 같은 ${comboCode} 기질이어도 NF 유형이면 감성적 비전으로, NT 유형이면 논리적 전략으로, SJ 유형이면 체계적 실행으로, SP 유형이면 현장 대응으로 발현됩니다. 당신의 ${mbtiType}-${comboCode} 조합은 이 4가지 중 고유한 하나의 표현.`;
}

function buildIntegratedPath(mbtiType: MbtiType, combo: ComboExtended, _group: string): string {
  return `${mbtiType}-${combo.nickname.split(' ').slice(-1)[0] || combo.nickname}의 통합 인생 경로는 다음과 같은 흐름을 가집니다.\n\n• 빛나는 순간: ${combo.shiningMoment}\n\n• 무너지는 지점: ${combo.breakingPoint}\n\n• 성장 방향: ${combo.growthDirection}\n\n이 경로는 당신의 MBTI만으로는 그려지지 않는, 기질이 만드는 고유한 삶의 패턴입니다. 192 조합 중에서도 당신은 이 특별한 경로 위에 있습니다.`;
}
