import { Question } from './types';

// 100문항 - Mixed Order (MBTI + 기질 섞임)
// 검증 문항(V)은 validationPairId로 원본 문항과 연결
export const questions: Question[] = [
  // Q01
  { id: 'EI-01', order: 1, text: '새로운 사람들을 만나면 에너지가 충전되는 느낌이 든다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q02
  { id: 'TS-01', order: 2, text: '어디를 가든 분위기를 밝게 만드는 편이다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q03
  { id: 'SN-01', order: 3, text: '미래의 가능성에 대해 상상하는 것이 즐겁다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q04
  { id: 'TC-01', order: 4, text: '그룹에서 자연스럽게 주도적인 역할을 맡게 된다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q05
  { id: 'TF-01', order: 5, text: '결정을 내릴 때 관련된 사람들의 감정을 가장 먼저 고려한다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q06
  { id: 'TP-01', order: 6, text: '갈등 상황에서 양쪽의 입장을 이해하고 중재하려 한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q07
  { id: 'JP-01', order: 7, text: '계획 없이 즉흥적으로 행동하는 것이 더 재미있다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q08
  { id: 'TM-01', order: 8, text: '일을 시작하기 전에 모든 세부 사항을 철저하게 계획한다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q09
  { id: 'EI-02', order: 9, text: '혼자만의 시간이 길어지면 답답하고 지루해진다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q10
  { id: 'SN-02', order: 10, text: '구체적인 사실과 데이터를 기반으로 판단하는 것을 선호한다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q11
  { id: 'TS-02', order: 11, text: '지루한 상황을 견디기 어렵고, 항상 새로운 자극을 원한다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q12
  { id: 'TF-02', order: 12, text: '논리적으로 옳은 것이 중요하지, 기분이 상하는 것은 별개의 문제다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q13
  { id: 'JP-02', order: 13, text: '일정표나 할 일 목록 없이는 불안하다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  // Q14
  { id: 'TC-02', order: 14, text: '목표를 달성하기 위해서라면 어려운 결정도 주저하지 않는다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q15
  { id: 'EI-03', order: 15, text: '모임에서 먼저 대화를 시작하는 편이다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q16
  { id: 'TM-02', order: 16, text: '사소한 실수에도 마음이 오래 쓰이고 반복적으로 떠오른다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q17
  { id: 'SN-03', order: 17, text: '비유나 은유적 표현을 자주 사용한다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q18
  { id: 'TP-02', order: 18, text: '급격한 변화보다 안정적이고 예측 가능한 환경을 선호한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q19
  { id: 'TF-03', order: 19, text: '타인의 감정 변화를 빠르게 알아차린다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q20
  { id: 'JP-03', order: 20, text: '마감 직전에 집중력이 폭발하는 타입이다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q21
  { id: 'EI-04', order: 21, text: '주말에는 집에서 조용히 보내는 것이 가장 좋다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q22
  { id: 'TS-03', order: 22, text: '실패해도 금방 기분이 회복되고 다시 도전할 수 있다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q23
  { id: 'SN-04', order: 23, text: '세부적인 내용보다 전체적인 큰 그림을 먼저 파악하려 한다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q24
  { id: 'TC-03', order: 24, text: '일의 속도가 느린 사람을 보면 답답함을 느낀다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q25
  { id: 'TF-04', order: 25, text: '공정함과 일관된 원칙 적용이 가장 중요하다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q26
  { id: 'TM-03', order: 26, text: '높은 기준을 세우고 그에 미치지 못하면 실망하는 편이다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q27
  { id: 'JP-04', order: 27, text: '물건이나 파일을 항상 정해진 자리에 정리해둔다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  // Q28
  { id: 'TP-03', order: 28, text: '화가 나는 상황에서도 겉으로 감정을 크게 드러내지 않는다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q29
  { id: 'EI-05', order: 29, text: '여러 명이 함께하는 활동이 혼자 하는 활동보다 즐겁다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q30
  { id: 'SN-05', order: 30, text: '검증된 방법을 따르는 것이 새로운 방법을 시도하는 것보다 안심된다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q31
  { id: 'TS-04', order: 31, text: '유머 감각이 좋다는 이야기를 자주 듣는다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q32
  { id: 'TF-05', order: 32, text: '비판을 받으면 내용보다 말투나 태도에 먼저 상처를 받는다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q33
  { id: 'TC-04', order: 33, text: '경쟁 상황에서 반드시 이기고 싶은 마음이 강하다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q34
  { id: 'JP-05', order: 34, text: '여행할 때 세부 일정보다 자유로운 탐험을 선호한다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q35
  { id: 'TM-04', order: 35, text: '혼자서 깊이 사색하는 시간이 매우 소중하다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q36
  { id: 'EI-06', order: 36, text: '생각을 말로 표현하면서 정리하는 편이다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q37
  { id: 'TP-04', order: 37, text: '주변 사람들이 나와 함께 있으면 편안하다고 말한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q38
  { id: 'SN-06', order: 38, text: '이론적이고 추상적인 주제에 대한 토론을 즐긴다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q39
  { id: 'TF-06', order: 39, text: '냉정하다는 소리를 듣는 것보다 비논리적이라는 말이 더 싫다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q40
  { id: 'JP-06', order: 40, text: '결정을 빨리 내리고 실행에 옮기는 편이다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  // Q41
  { id: 'TS-05', order: 41, text: '한 가지 일에 오래 집중하는 것보다 여러 일을 번갈아 하는 게 맞다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q42
  { id: 'EI-07', order: 42, text: '혼자 깊이 생각할 시간이 꼭 필요하다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q43
  { id: 'TC-05', order: 43, text: '비효율적인 절차나 규칙을 보면 바꾸고 싶어진다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q44
  { id: 'SN-07', order: 44, text: '오감으로 직접 경험한 것만 확실하게 믿는 편이다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q45
  { id: 'TM-05', order: 45, text: '다른 사람들이 놓치는 작은 디테일까지 신경 쓴다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q46
  { id: 'TF-07', order: 46, text: '누군가 힘들어하면 해결책보다 먼저 공감을 표현한다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q47
  { id: 'TP-05', order: 47, text: '서두르지 않고 꾸준히 하는 것이 나의 강점이다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q48
  { id: 'JP-07', order: 48, text: '여러 가지 일을 동시에 벌려놓는 경향이 있다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q49
  { id: 'EI-08', order: 49, text: '파티나 모임이 끝나면 에너지가 고갈된 느낌이 든다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q50
  { id: 'SN-08', order: 50, text: '현실적이고 실용적인 해결책을 선호한다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q51 - V(TS-01)
  { id: 'TS-06', order: 51, text: '낯선 환경에서도 빠르게 적응하고 사람들과 어울린다.', category: { type: 'temperament', temperament: 'S' }, reversed: false, validationPairId: 'TS-01' },
  // Q52 - V(TC-01)
  { id: 'TC-06', order: 52, text: '다른 사람의 지시를 받기보다 스스로 결정하고 이끄는 것을 선호한다.', category: { type: 'temperament', temperament: 'C' }, reversed: false, validationPairId: 'TC-01' },
  // Q53
  { id: 'TF-08', order: 53, text: '감정적인 호소보다 논리적인 설득이 더 효과적이라고 생각한다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q54
  { id: 'JP-08', order: 54, text: '한 번 세운 계획을 쉽게 바꾸지 않는다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  // Q55
  { id: 'TM-06', order: 55, text: '감정의 기복이 있고, 때때로 이유 없이 우울해지기도 한다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q56 - V(TP-01)
  { id: 'TP-06', order: 56, text: '논쟁보다 타협과 조화를 우선시한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false, validationPairId: 'TP-01' },
  // Q57 - V(EI-03)
  { id: 'EI-09', order: 57, text: '처음 보는 사람에게도 편하게 말을 건다.', category: { type: 'mbti', axis: 'EI' }, reversed: false, validationPairId: 'EI-03' },
  // Q58 - V(SN-01)
  { id: 'SN-09', order: 58, text: '아직 존재하지 않는 것을 구상하고 만들어내는 일에 끌린다.', category: { type: 'mbti', axis: 'SN' }, reversed: false, validationPairId: 'SN-01' },
  // Q59 - V(TF-01)
  { id: 'TF-09', order: 59, text: '다른 사람의 기분을 맞추느라 나의 의견을 양보할 때가 있다.', category: { type: 'mbti', axis: 'TF' }, reversed: false, validationPairId: 'TF-01' },
  // Q60 - V(JP-01)
  { id: 'JP-09', order: 60, text: '규칙이나 절차를 따르는 것보다 상황에 맞게 유연하게 대처하는 것이 낫다.', category: { type: 'mbti', axis: 'JP' }, reversed: false, validationPairId: 'JP-01' },
  // Q61
  { id: 'TS-07', order: 61, text: '즉흥적인 재미를 위해 계획을 바꾸는 것이 전혀 아깝지 않다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q62
  { id: 'TC-07', order: 62, text: '위기 상황에서 오히려 침착하고 빠르게 판단할 수 있다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q63
  { id: 'EI-10', order: 63, text: '소수의 깊은 관계가 많은 사람과의 관계보다 중요하다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q64
  { id: 'SN-10', order: 64, text: '설명서나 매뉴얼을 꼼꼼히 읽고 따르는 편이다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q65 - V(TM-03)
  { id: 'TM-07', order: 65, text: '완벽하지 않으면 시작하지 않거나 보여주지 않으려 한다.', category: { type: 'temperament', temperament: 'M' }, reversed: false, validationPairId: 'TM-03' },
  // Q66
  { id: 'TF-10', order: 66, text: '문제를 해결할 때 객관적 분석이 감정적 판단보다 우선이다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q67 - V(TP-03)
  { id: 'TP-07', order: 67, text: '어떤 상황에서도 크게 동요하지 않고 평정심을 유지한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false, validationPairId: 'TP-03' },
  // Q68
  { id: 'JP-10', order: 68, text: '마감 기한을 충분한 여유를 두고 미리 완료한다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  // Q69 - V(EI-01)
  { id: 'EI-11', order: 69, text: '사람들 속에 있으면 자연스럽게 활기가 넘친다.', category: { type: 'mbti', axis: 'EI' }, reversed: false, validationPairId: 'EI-01' },
  // Q70
  { id: 'TS-08', order: 70, text: '사람들에게 둘러싸여 있을 때 가장 행복하다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q71
  { id: 'SN-11', order: 71, text: '패턴이나 연결고리를 찾아내는 것을 잘한다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q72
  { id: 'TC-08', order: 72, text: '결과가 좋으면 과정에서의 갈등은 감수할 만하다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q73
  { id: 'TF-11', order: 73, text: '주변 사람들의 조화와 화합이 무엇보다 중요하다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q74
  { id: 'JP-11', order: 74, text: '예상치 못한 변화가 생기면 오히려 흥미를 느낀다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q75
  { id: 'TM-08', order: 75, text: '예술, 음악, 문학 등 깊이 있는 문화 활동에 강하게 끌린다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q76
  { id: 'TP-08', order: 76, text: '반복적이고 규칙적인 일상이 오히려 마음의 안정을 준다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q77
  { id: 'EI-12', order: 77, text: '대화할 때 듣는 것보다 말하는 시간이 더 길다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  // Q78 - V(SN-06)
  { id: 'SN-12', order: 78, text: '눈에 보이는 현실보다 숨겨진 의미를 파악하는 데 관심이 있다.', category: { type: 'mbti', axis: 'SN' }, reversed: false, validationPairId: 'SN-06' },
  // Q79 - V(TC-02)
  { id: 'TC-09', order: 79, text: '한 번 결심한 일은 끝까지 밀어붙이는 편이다.', category: { type: 'temperament', temperament: 'C' }, reversed: false, validationPairId: 'TC-02' },
  // Q80 - V(TF-02)
  { id: 'TF-12', order: 80, text: '진실이 상대를 불편하게 하더라도 솔직하게 말해야 한다.', category: { type: 'mbti', axis: 'TF' }, reversed: true, validationPairId: 'TF-02' },
  // Q81 - V(TS-03)
  { id: 'TS-09', order: 81, text: '과거의 실수보다 앞으로의 가능성에 더 집중하는 편이다.', category: { type: 'temperament', temperament: 'S' }, reversed: false, validationPairId: 'TS-03' },
  // Q82 - V(JP-02)
  { id: 'JP-12', order: 82, text: '하루의 시작 전에 오늘 할 일을 계획하는 습관이 있다.', category: { type: 'mbti', axis: 'JP' }, reversed: true, validationPairId: 'JP-02' },
  // Q83
  { id: 'TM-09', order: 83, text: '세상이 어떠해야 한다는 이상적인 그림이 머릿속에 있다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  // Q84
  { id: 'TP-09', order: 84, text: '다른 사람의 부탁을 거절하기가 어렵다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q85
  { id: 'EI-13', order: 85, text: '혼자 식사하거나 혼자 여행하는 것이 전혀 불편하지 않다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q86 - V(SN-07)
  { id: 'SN-13', order: 86, text: '구체적인 경험담이 추상적인 이론보다 와닿는다.', category: { type: 'mbti', axis: 'SN' }, reversed: true, validationPairId: 'SN-07' },
  // Q87
  { id: 'TF-13', order: 87, text: '슬픈 영화나 이야기에 쉽게 감정이입 된다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  // Q88
  { id: 'TC-10', order: 88, text: '내가 직접 하는 것이 남에게 맡기는 것보다 빠르고 정확하다고 느낀다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  // Q89
  { id: 'JP-13', order: 89, text: '선택지를 열어두는 것이 하나로 확정짓는 것보다 좋다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  // Q90 - V(TM-02)
  { id: 'TM-10', order: 90, text: '과거의 일을 곱씹으며 다르게 했으면 어땠을까 자주 생각한다.', category: { type: 'temperament', temperament: 'M' }, reversed: false, validationPairId: 'TM-02' },
  // Q91 - V(EI-02)
  { id: 'EI-14', order: 91, text: '조용한 환경에서 오래 있으면 불안하거나 심심해진다.', category: { type: 'mbti', axis: 'EI' }, reversed: false, validationPairId: 'EI-02' },
  // Q92
  { id: 'TS-10', order: 92, text: '이야기할 때 표정과 몸짓이 풍부하다는 말을 듣는다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  // Q93
  { id: 'SN-14', order: 93, text: '일을 할 때 정해진 순서대로 진행하는 것이 편하다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  // Q94
  { id: 'TP-10', order: 94, text: '내가 나서서 분위기를 주도하기보다 자연스럽게 흘러가는 것이 좋다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  // Q95
  { id: 'TF-14', order: 95, text: '토론에서 승패가 중요하지, 상대의 기분까지 신경 쓸 필요는 없다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  // Q96 - V(JP-04)
  { id: 'JP-14', order: 96, text: '작업 공간이 다소 어지러워도 나만의 체계가 있어 불편하지 않다.', category: { type: 'mbti', axis: 'JP' }, reversed: false, validationPairId: 'JP-04' },
  // Q97
  { id: 'SN-15', order: 97, text: '영감이나 직감에 따라 결정을 내리는 경우가 많다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  // Q98
  { id: 'EI-15', order: 98, text: '나의 개인적인 공간과 시간을 누군가 침범하면 스트레스를 받는다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  // Q99 - V(TF-03)
  { id: 'TF-15', order: 99, text: '다른 사람이 나를 어떻게 생각하는지 자주 신경 쓴다.', category: { type: 'mbti', axis: 'TF' }, reversed: false, validationPairId: 'TF-03' },
  // Q100
  { id: 'JP-15', order: 100, text: '약속 시간에 항상 정확하거나 일찍 도착하는 편이다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
];
