import { Question } from './types';

// 간편 검사 30문항
// MBTI: 축당 4문항 = 16문항
// 기질: 기질당 3문항 = 12문항
// 검증: 2문항 (가장 명확한 문항의 검증 쌍)
// 총 30문항, 약 3~5분 소요

export const quickQuestions: Question[] = [
  // ── MBTI: E/I (4문항) ──
  { id: 'QEI-01', order: 1, text: '새로운 사람들을 만나면 에너지가 충전되는 느낌이 든다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  { id: 'QEI-02', order: 2, text: '주말에는 집에서 조용히 보내는 것이 가장 좋다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },
  { id: 'QEI-03', order: 3, text: '모임에서 먼저 대화를 시작하는 편이다.', category: { type: 'mbti', axis: 'EI' }, reversed: false },
  { id: 'QEI-04', order: 4, text: '혼자 있을 때 가장 생산적이고 창의적이다.', category: { type: 'mbti', axis: 'EI' }, reversed: true },

  // ── MBTI: S/N (4문항) ──
  { id: 'QSN-01', order: 5, text: '미래의 가능성에 대해 상상하는 것이 즐겁다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  { id: 'QSN-02', order: 6, text: '구체적인 사실과 데이터를 기반으로 판단하는 것을 선호한다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },
  { id: 'QSN-03', order: 7, text: '세부적인 내용보다 전체적인 큰 그림을 먼저 파악하려 한다.', category: { type: 'mbti', axis: 'SN' }, reversed: false },
  { id: 'QSN-04', order: 8, text: '검증된 방법을 따르는 것이 새로운 시도보다 낫다고 생각한다.', category: { type: 'mbti', axis: 'SN' }, reversed: true },

  // ── MBTI: T/F (4문항) ──
  { id: 'QTF-01', order: 9, text: '결정을 내릴 때 관련된 사람들의 감정을 가장 먼저 고려한다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  { id: 'QTF-02', order: 10, text: '논리적으로 옳은 것이 중요하지, 기분이 상하는 것은 별개의 문제다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },
  { id: 'QTF-03', order: 11, text: '타인의 감정 변화를 빠르게 알아차린다.', category: { type: 'mbti', axis: 'TF' }, reversed: false },
  { id: 'QTF-04', order: 12, text: '공정함과 일관된 원칙 적용이 가장 중요하다.', category: { type: 'mbti', axis: 'TF' }, reversed: true },

  // ── MBTI: J/P (4문항) ──
  { id: 'QJP-01', order: 13, text: '계획 없이 즉흥적으로 행동하는 것이 더 재미있다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  { id: 'QJP-02', order: 14, text: '일정표나 할 일 목록 없이는 불안하다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },
  { id: 'QJP-03', order: 15, text: '마감 직전에 집중력이 폭발하는 타입이다.', category: { type: 'mbti', axis: 'JP' }, reversed: false },
  { id: 'QJP-04', order: 16, text: '물건이나 파일을 항상 정해진 자리에 정리해둔다.', category: { type: 'mbti', axis: 'JP' }, reversed: true },

  // ── 기질: 다혈질 S (3문항) ──
  { id: 'QTS-01', order: 17, text: '어디를 가든 분위기를 밝게 만드는 편이다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  { id: 'QTS-02', order: 18, text: '실패해도 금방 기분이 회복되고 다시 도전할 수 있다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },
  { id: 'QTS-03', order: 19, text: '지루한 상황을 견디기 어렵고, 항상 새로운 자극을 원한다.', category: { type: 'temperament', temperament: 'S' }, reversed: false },

  // ── 기질: 담즙질 C (3문항) ──
  { id: 'QTC-01', order: 20, text: '그룹에서 자연스럽게 주도적인 역할을 맡게 된다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  { id: 'QTC-02', order: 21, text: '목표를 달성하기 위해서라면 어려운 결정도 주저하지 않는다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },
  { id: 'QTC-03', order: 22, text: '일의 속도가 느린 사람을 보면 답답함을 느낀다.', category: { type: 'temperament', temperament: 'C' }, reversed: false },

  // ── 기질: 점액질 P (3문항) ──
  { id: 'QTP-01', order: 23, text: '갈등 상황에서 양쪽의 입장을 이해하고 중재하려 한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  { id: 'QTP-02', order: 24, text: '급격한 변화보다 안정적이고 예측 가능한 환경을 선호한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },
  { id: 'QTP-03', order: 25, text: '다른 사람들이 나를 편안하고 믿음직하다고 평가한다.', category: { type: 'temperament', temperament: 'P' }, reversed: false },

  // ── 기질: 우울질 M (3문항) ──
  { id: 'QTM-01', order: 26, text: '일을 시작하기 전에 모든 세부 사항을 철저하게 계획한다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  { id: 'QTM-02', order: 27, text: '사소한 실수에도 마음이 오래 쓰이고 반복적으로 떠오른다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },
  { id: 'QTM-03', order: 28, text: '높은 기준을 세우고 그에 미치지 못하면 실망하는 편이다.', category: { type: 'temperament', temperament: 'M' }, reversed: false },

  // ── 검증 문항 (2문항) ──
  { id: 'QV-01', order: 29, text: '사람들과 어울리는 것에서 활력을 얻는다.', category: { type: 'mbti', axis: 'EI' }, reversed: false, validationPairId: 'QEI-01' },
  { id: 'QV-02', order: 30, text: '일을 하기 전에 먼저 완벽하게 준비하려는 성향이 있다.', category: { type: 'temperament', temperament: 'M' }, reversed: false, validationPairId: 'QTM-01' },
];
