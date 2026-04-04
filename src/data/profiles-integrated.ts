// 192가지 유형을 위한 통합 서사 생성기
// MBTI + 기질을 분리하지 않고, 하나의 통합된 인생 공략집으로 제공

import { MBTIResult, TemperamentResult } from './types';

// ────────────────────────────────────────────
// MBTI 축별 기본 특성 데이터 (기질과 결합하기 위한 원자료)
// ────────────────────────────────────────────

interface AxisTraits {
  label: string;
  high: string; // E, N, F, P
  low: string;  // I, S, T, J
  highDesc: string;
  lowDesc: string;
}

const axisTraits: Record<string, AxisTraits> = {
  EI: { label: '에너지 방향', high: 'E', low: 'I', highDesc: '외부 세계와의 교류에서 에너지를 얻는', lowDesc: '내면의 세계에서 에너지를 충전하는' },
  SN: { label: '인식 방식', high: 'N', low: 'S', highDesc: '가능성과 직관을 통해 세상을 읽는', lowDesc: '구체적인 사실과 경험을 통해 세상을 파악하는' },
  TF: { label: '판단 방식', high: 'F', low: 'T', highDesc: '사람과 감정을 중심에 놓고 판단하는', lowDesc: '논리와 원칙을 기준으로 판단하는' },
  JP: { label: '생활 방식', high: 'P', low: 'J', highDesc: '유연하고 열린 가능성을 선호하는', lowDesc: '계획적이고 체계적인 삶을 선호하는' },
};

// ────────────────────────────────────────────
// 기질별 핵심 동기 & 내면 특성
// ────────────────────────────────────────────

interface TemperamentCore {
  name: string;
  nameEn: string;
  essence: string;         // 한 줄 본질
  element: string;         // 4원소 (불/물/공기/흙)
  humor: string;           // 체액 (혈액/담즙/점액/흑담즙)
  season: string;          // 계절
  eysenckMapping: string;  // Eysenck 2축 위치
  innerDrive: string;      // 내면 동력
  hiddenSelf: string;      // 숨겨진 모습
  coreWeakness: string;    // 핵심 약점 (히포크라테스 전통)
  stressMode: string;      // 스트레스 시 모드
  stressPattern: string;   // 투쟁/도피/동결/순응
  loveLanguage: string;    // 사랑의 언어
  loveDetail: string;      // 연애 상세
  parentingStyle: string;  // 양육 스타일
  lifePhilosophy: string;  // 삶의 철학
  neuroscience: string;    // 신경과학 연결
  bodyConnection: string;  // 체액과 신체 연결
}

const temperamentCores: Record<string, TemperamentCore> = {
  S: {
    name: '다혈질', nameEn: 'Sanguine',
    essence: '삶의 모든 순간에서 기쁨과 연결을 찾으려는 영혼',
    element: '공기(Air)',
    humor: '혈액(Blood)',
    season: '봄',
    coreWeakness: '의지가 약하고 무질서한 경향이 있습니다. 감정이 예민하고 활동적이지만, 하나의 일에 끈기 있게 집중하기 어렵습니다. 무슨 일이든 쉽게 자원하지만 마무리가 약하고, 순진하고 순박한 면이 있어 쉽게 이용당할 수 있습니다. 히포크라테스는 혈액이 과다한 사람이 쾌활하지만 변덕스럽다고 보았습니다.',
    bodyConnection: '히포크라테스의 4체액설에서 혈액(Blood)이 우세한 유형입니다. 혈액은 공기의 원소와 연결되며, 따뜻하고 습한 성질을 가집니다. 봄의 기운처럼 생명력이 넘치고, 끊임없이 움직이며, 새로운 것을 향해 퍼져나가는 특성을 보입니다.',
    eysenckMapping: '안정적 외향형 (Stable Extravert) — Eysenck의 2차원 모델에서 높은 외향성 + 낮은 신경증에 위치합니다. 대뇌 피질의 기본 각성 수준이 낮아 끊임없이 외부 자극을 추구하며, 자율신경계가 안정적이어서 감정적 회복이 빠릅니다.',
    innerDrive: '새로운 자극과 사람들 속에서 살아있음을 느끼는 것',
    hiddenSelf: '밝은 웃음 뒤에 "나를 진짜로 이해해주는 사람이 있을까"라는 외로움을 간직하고 있습니다. 타고난 무대 체질이라 사람들을 끌어들이고, 이야기를 좋아하고, 적극적으로 자신을 표현하며, 다른 사람들이 일하게 만드는 재주가 있습니다. 피부 접촉을 좋아하고 힘과 정력이 넘치지만, 넓지만 얕은 관계들 속에서 정작 자신의 깊은 내면을 보여줄 수 있는 사람은 극소수입니다.',
    stressMode: '도피(Flight) 반응이 나타납니다. 더 많은 사람, 더 많은 활동, 더 많은 자극으로 공허함을 채우려 합니다. 일정을 과도하게 잡고, 수면 패턴이 불규칙해지며, 약속을 놓치면서 죄책감이 쌓입니다. 정작 필요한 건 멈추고 자신과 대화하는 시간입니다.',
    stressPattern: '도피/사회적 완충 — 사회적 활동과 긍정적 재해석으로 해소하려 합니다',
    loveLanguage: '함께하는 시간과 말로 표현하는 애정',
    loveDetail: '4가지 기질 중 가장 로맨틱한 유형입니다. 사랑에 가장 자주 빠지며, 로맨틱한 저녁과 주말을 정성스럽게 계획합니다. 하지만 한 사람에게 헌신하는 데 어려움을 겪을 수 있습니다. 관심의 욕구가 강해서, 한 사람이 그 욕구를 채워주지 못한다고 느끼면 관계를 끝낼 수도 있습니다.',
    parentingStyle: '재미있고 사교적이며 열정적인 부모입니다. 아이 같은 에너지로 자녀와 잘 연결되지만, 훈육과 규칙에 일관성이 부족할 수 있습니다. 활동으로 가득한 흥미진진한 가정 환경을 만들지만, 과외 활동을 제한하는 것이 필요합니다.',
    lifePhilosophy: '인생은 즐기기 위해 존재한다',
    neuroscience: 'Helen Fisher의 연구에 따르면 도파민 시스템이 우세한 "탐험가(Explorer)" 유형과 연관됩니다. 호기심이 많고, 창의적이며, 자발적이고, 위험을 감수하며, 정신적으로 유연합니다.',
  },
  C: {
    name: '담즙질', nameEn: 'Choleric',
    essence: '세상에 자신의 흔적을 남기고자 하는 불꽃 같은 영혼',
    element: '불(Fire)',
    humor: '황담즙(Yellow Bile)',
    season: '여름',
    coreWeakness: '의지와 투쟁심이 강하지만 오만해질 수 있습니다. 독립적이고 결단력이 있으나, 타인의 의견을 무시하고 자기 방식만을 고집하는 독선에 빠지기 쉽습니다. 잘못된 것은 반드시 고쳐야 한다고 생각하며 반대에도 굴하지 않아, 주변 사람들과 마찰을 일으킬 수 있습니다. 히포크라테스는 담즙이 과다한 사람이 화를 잘 내고 공격적이라고 보았습니다.',
    bodyConnection: '히포크라테스의 4체액설에서 황담즙(Yellow Bile)이 우세한 유형입니다. 황담즙은 불의 원소와 연결되며, 뜨겁고 건조한 성질을 가집니다. 여름의 강렬한 태양처럼 에너지를 집중시키고, 장애물을 태워버리며, 목표를 향해 돌진하는 특성을 보입니다.',
    eysenckMapping: '불안정 외향형 (Unstable Extravert) — Eysenck 모델에서 높은 외향성 + 높은 신경증에 위치합니다. 높은 기본 각성이 외부를 향하면서 강렬한 행동력이 되지만, 자율신경계의 높은 반응성이 분노와 좌절의 폭발력을 만듭니다.',
    innerDrive: '목표를 달성하고, 상황을 주도하며, 결과를 만들어내는 것',
    hiddenSelf: '강한 모습 뒤에 "내가 충분히 잘하고 있는 걸까"라는 끊임없는 자기 검증을 하고 있습니다. 천성적 지도자로서 전체를 바라보는 시야를 가지고 있고, 무엇이든지 감당할 수 있다는 자신감이 있으며, 다른 사람에게 위임하고 참여시키는 능력이 뛰어납니다. 하지만 관계가 적고, 깊은 유대를 형성하기 어려우며, 감정에 치우치지 않는 성향 때문에 분노 폭발 후에 깊은 후회를 느끼면서도 이를 잘 드러내지 않습니다.',
    stressMode: '투쟁(Fight) 반응이 나타납니다. 스트레스의 원인을 직접 공격하며, 더 많은 통제와 더 많은 일로 대응합니다. 분노가 폭발하고, 지배적인 행동이 강화되며, 신체적 긴장이 높아집니다. 위임 능력이 사라지고, 모든 것을 혼자 처리하려 합니다.',
    stressPattern: '투쟁/공격 — 스트레스 원인을 직접 공격하고 통제력을 되찾으려 합니다',
    loveLanguage: '함께 목표를 향해 나아가는 동반자적 사랑',
    loveDetail: '여러 관계에 동시에 관심이 없으며, 젊을 때 데이트 경험이 적은 편입니다. 관심이 있으면 매우 직접적으로 표현하고, 없으면 무관심하고 조급해 보입니다. 관계를 갑작스럽게 끝낼 수 있습니다. 헌신하면 강렬하게 집중하며, 행동과 제공으로 사랑을 표현합니다.',
    parentingStyle: '권위적이며 높은 기대치를 가진 부모입니다. 탁월함을 요구하고 훈육과 책임을 강조합니다. 느리게 발달하는 자녀에게 인내심이 부족할 수 있으며, 명령보다 설명하는 법을 배울 필요가 있습니다.',
    lifePhilosophy: '멈춰 있으면 뒤처진다',
    neuroscience: 'Helen Fisher의 모델에서 테스토스테론 시스템이 우세한 "지휘자(Director)" 유형과 연관됩니다. 분석적이고, 논리적이며, 직접적이고, 결단력 있고, 경쟁적입니다.',
  },
  P: {
    name: '점액질', nameEn: 'Phlegmatic',
    essence: '세상의 소란 속에서도 고요한 중심을 지키는 평화로운 영혼',
    element: '물(Water)',
    humor: '점액(Phlegm)',
    season: '겨울',
    coreWeakness: '유머와 명랑함이 있지만 느긋한 특성으로 인한 게으름이 약점입니다. 태평스럽고 느긋해서 변화를 싫어하고 현상 유지에 안주하며, 결단이 필요한 순간에 우유부단해질 수 있습니다. 쉬운 길을 찾는 경향이 있고, 감정을 드러내지 않아 속마음을 알기 어렵습니다. 히포크라테스는 점액이 과다한 사람이 무기력하고 소극적이라고 보았습니다.',
    bodyConnection: '히포크라테스의 4체액설에서 점액(Phlegm)이 우세한 유형입니다. 점액은 물의 원소와 연결되며, 차갑고 습한 성질을 가집니다. 겨울의 고요한 호수처럼 깊고 안정적이며, 주변을 감싸 안고, 흐르는 물처럼 유연하게 적응하는 특성을 보입니다.',
    eysenckMapping: '안정적 내향형 (Stable Introvert) — Eysenck 모델에서 낮은 외향성 + 낮은 신경증에 위치합니다. 높은 기본 피질 각성으로 인해 외부 자극을 덜 필요로 하며, 안정적인 자율신경계로 감정적 동요가 적습니다.',
    innerDrive: '안정적이고 조화로운 환경에서 편안하게 존재하는 것',
    hiddenSelf: '온화한 태도 뒤에 "내 목소리도 들어줄 사람이 있으면 좋겠다"라는 간절함을 품고 있습니다. 겸손하고 온유하며, 고요하고 냉정하고 침착합니다. 조용하지만 위트가 있고, 압력을 받아도 잘 견디며, 현실을 즐겁게 받아들이는 능력이 있습니다. 유능하고 꾸준하며, 동정심이 있고 친절하지만, 갈등 회피가 심해 문제를 키울 수 있고, 표면 아래에 원망과 좌절을 축적합니다. 어떤 일에도 잘 적응하지만 그 적응력이 자신의 욕구를 억누르는 데 쓰이기도 합니다.',
    stressMode: '순응/동결(Fawn/Freeze) 반응이 나타납니다. 사람들의 비위를 맞추고, 수용하며, 자신의 욕구를 억누릅니다. 완전히 철수하거나, 수동적으로 저항하거나, 숨겨진 원망이 쌓입니다. 극도의 무기력감과 신체적 피로가 나타납니다.',
    stressPattern: '순응/동결 — 사람 좋은 태도로 대응하며, 자신의 욕구를 억누릅니다',
    loveLanguage: '말없이 곁에 있어주는 묵묵한 헌신',
    loveDetail: '항상 결혼이나 장기적 헌신적 관계를 추구합니다. "한 사람"을 찾으면 친밀감 유지를 위해 끊임없이 노력합니다. 관계에서 갈등을 피하며, 주요 조정과 희생도 기꺼이 합니다. 일생 동안 깊이 충성하고 헌신적이지만, 자신의 욕구와 바람을 표현하도록 독려받을 필요가 있습니다.',
    parentingStyle: '차분하고, 인내심 있으며, 협력적인 부모입니다. 평화롭고 안정적인 가정 환경을 만들지만, 갈등 회피로 인해 지나치게 허용적일 수 있습니다. 자녀를 (그리고 자신을) 안전지대 밖으로 밀어줄 필요가 있습니다.',
    lifePhilosophy: '급하지 않아도 결국 도착한다',
    neuroscience: 'Helen Fisher의 모델에서 세로토닌 시스템이 우세한 "건설자(Builder)" 유형과 연관됩니다. 전통적이고, 안정적이며, 체계적이고, 조심스럽고, 조직적이며, 충성스럽습니다.',
  },
  M: {
    name: '우울질', nameEn: 'Melancholic',
    essence: '세상을 있는 그대로가 아닌 있어야 할 모습으로 바라보는 이상주의 영혼',
    element: '흙(Earth)',
    humor: '흑담즙(Black Bile)',
    season: '가을',
    coreWeakness: '풍부한 감성을 지니지만 자기중심적이며 변덕스러울 수 있습니다. 자기 감정에 깊이 몰입하여 타인의 관점을 놓치고, 이상과 현실의 괴리에서 오는 좌절감에 빠지기 쉽습니다. 완벽주의자로서 높은 표준을 갖기 때문에 시작한 것은 끝을 내야 하고, 도표와 그래프와 목록을 좋아하며, 세세한 것까지 신경을 씁니다. 히포크라테스는 흑담즙이 과다한 사람이 비관적이고 근심이 많다고 보았습니다.',
    bodyConnection: '히포크라테스의 4체액설에서 흑담즙(Black Bile)이 우세한 유형입니다. 흑담즙은 흙의 원소와 연결되며, 차갑고 건조한 성질을 가집니다. 가을의 숙성하는 대지처럼 깊이와 무게감이 있으며, 본질을 파고들고, 단단한 결과물을 만들어내는 특성을 보입니다.',
    eysenckMapping: '불안정 내향형 (Unstable Introvert) — Eysenck 모델에서 낮은 외향성 + 높은 신경증에 위치합니다. 높은 피질 각성으로 외부 자극에 쉽게 압도되며, 자율신경계의 높은 반응성이 깊고 지속적인 감정 경험을 만듭니다.',
    innerDrive: '완벽한 아름다움, 질서, 의미를 추구하는 것',
    hiddenSelf: '차분한 겉모습 아래 "이 세상은 왜 내가 생각하는 것처럼 아름답지 않을까"라는 깊은 아쉬움이 있습니다. 천재적인 면이 있고, 철학적이고 시적이며, 심미안을 가진 예술가적 영혼입니다. 경제적이고 신중하며 이상을 추구하지만, 자신의 기준에 미치지 못하면 자기 비판이 시작되고, 세상의 잔혹함과 비극에 몰두하여 우울에 빠지기 쉽습니다. 다른 사람들에게 민감하고 자기희생적이지만, 정작 자신에게는 가장 가혹한 비평가입니다.',
    stressMode: '동결/철수(Freeze/Withdraw) 반응이 나타납니다. 내면으로 깊이 퇴각하며, 우울하고 불안해지고 비관적이 됩니다. 경직된 사고, 심화되는 자기 비판, 사회적 철수가 나타납니다. 완벽주의가 분석 마비로 이어져 아무것도 시작하지 못합니다.',
    stressPattern: '동결/철수 — 내면으로 퇴각하며, 비관적이고 자기 비판적이 됩니다',
    loveLanguage: '깊은 이해와 영혼의 교감',
    loveDetail: '천천히, 체계적으로 연인을 사귑니다. 로맨스를 꼼꼼하게 계획하며, 일이 계획대로 되길 바랍니다. 장기적 전망(결혼, 자녀)을 일찍부터 신중하게 생각합니다. 4가지 기질 중 성적으로 가장 충동적이지 않으며, 익숙함을 선호합니다. 깊이 충성하고 헌신적이지만, 파트너가 거칠거나 조급하면 눈물에 잠길 수 있습니다.',
    parentingStyle: '자녀에게 높은 기준을 설정하고 체계적이며 일관된 부모입니다. 지적으로 자극적인 환경을 만들지만, 자녀의 성적에 지나치게 불안해하거나 비판적일 수 있습니다. 더 많은 칭찬과 더 적은 교정을 배울 필요가 있습니다.',
    lifePhilosophy: '의미 없는 삶은 삶이 아니다',
    neuroscience: 'Helen Fisher의 모델에서 에스트로겐 시스템이 우세한 "협상가(Negotiator)" 유형과 연관됩니다. 전체를 보는 사고, 직관적이며, 공감적이고, 양육적이며, 신체 언어를 읽는 데 능숙합니다.',
  },
};

// ────────────────────────────────────────────
// MBTI 유형별 핵심 키워드 (기질과 결합할 때 사용)
// ────────────────────────────────────────────

interface MBTICore {
  nickname: string;
  emoji: string;
  essence: string;
  cognitiveStack: string; // 예: "Fe-Ni-Se-Ti"
  population: string;     // 예: "2.5% (희귀)"
  gripStress: string;     // 열등기능 폭주 시 행동
  loveLanguage: string;   // 사랑의 언어
  attachmentStyle: string; // 애착 패턴
  dealBreaker: string;     // 연애 딜브레이커
  careers: string[];
  bestMatch: string[];
  celebrities: string[];
}

const mbtiCores: Record<string, MBTICore> = {
  ISTJ: {
    nickname: '신뢰의 수호자', emoji: '🛡️',
    essence: '약속을 지키고, 체계를 세우고, 묵묵히 책임을 완수하는',
    cognitiveStack: 'Si-Te-Fi-Ne',
    population: '11.6% (매우 흔함)',
    gripStress: '평소 현실적이고 침착한 사람이 갑자기 최악의 시나리오에 사로잡힙니다. 열등기능 Ne(외향 직관)가 폭주하면서 "만약 이렇게 되면 어쩌지?"라는 파국적 상상이 통제 불능으로 밀려옵니다. 평소 믿을 수 있는 사실과 경험에 의지하던 사람이, 갑자기 모든 것이 무너질 거라는 근거 없는 불안에 휩싸이는 것입니다.',
    loveLanguage: '봉사의 행동(Acts of Service) + 함께하는 시간(Quality Time)',
    attachmentStyle: '건강할 때 안정 애착, 스트레스 시 회피형으로 전환 — 일과 의무 속으로 도피합니다',
    dealBreaker: '도덕적 일관성 결여, 약속 불이행, 거짓말. 말과 행동이 다른 파트너에게 존경을 잃습니다.',
    careers: ['회계사', '감사관', '군 장교', '판사', '데이터베이스 관리자', '프로젝트 관리자'],
    bestMatch: ['ESFP', 'ESTP'], celebrities: ['워런 버핏(MP)', '안젤라 메르켈(MC)', '나탈리 포트만(MP)'],
  },
  ISFJ: {
    nickname: '따뜻한 수호자', emoji: '🌸',
    essence: '조용히 곁에서 사람들을 보살피며 헌신하는',
    cognitiveStack: 'Si-Fe-Ti-Ne',
    population: '13.8% (가장 흔함, 한국에서는 약 22%)',
    gripStress: '평소 따뜻하고 헌신적인 사람이 갑자기 냉소적이고 비관적으로 변합니다. 열등기능 Ne가 폭주하면서 "모두가 나를 싫어하는 건 아닐까?", "이 병이 치명적이면 어쩌지?"라는 파국적 사고에 빠집니다. 평소와 달리 날카롭고 비꼬는 말을 내뱉어 주변 사람들을 놀라게 합니다.',
    loveLanguage: '봉사의 행동(Acts of Service) + 함께하는 시간(Quality Time)',
    attachmentStyle: '불안 애착 경향 — 너무 많이 주면서 관계에 의존하게 되고, 버림받을까 두려워합니다',
    dealBreaker: '감정에 대한 무감각, 당연하게 여기는 태도. 끝없는 헌신이 인정받지 못하면 원망이 쌓입니다.',
    careers: ['간호사', '초등교사', '사회복지사', '사서', 'HR 담당자', '행정 비서'],
    bestMatch: ['ESFP', 'ESTP'], celebrities: ['엘리자베스 2세(MC)', '마더 테레사(MC)', '정한·세븐틴(MP)', '다현·트와이스(MS)'],
  },
  INFJ: {
    nickname: '통찰의 예언자', emoji: '🔮',
    essence: '깊은 직관으로 사람의 본질을 꿰뚫어 보며 의미를 추구하는',
    cognitiveStack: 'Ni-Fe-Ti-Se',
    population: '1.5% (전 세계에서 가장 희귀한 유형)',
    gripStress: '평소 깊은 통찰력과 절제력의 소유자가, 열등기능 Se(외향 감각)가 폭주하면서 통제 불능의 감각 탐닉에 빠집니다. 폭식, 충동 쇼핑, 과음 등 평소와 전혀 다른 행동을 하며, 심한 경우 공격적이고 대립적인 모습을 보입니다. 가장 무서운 것은 평소 믿어왔던 직관이 "오프라인"이 된 느낌 — 사람을 읽는 능력을 잃었다고 느끼는 것입니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 인정하는 말(Words of Affirmation)',
    attachmentStyle: '불안-회피 혼합형 — 깊은 연결을 갈망하면서도 진짜 자신이 드러나고 거부당할까 두려워합니다. "INFJ 도어슬램"은 최후의 회피 방어입니다.',
    dealBreaker: '피상적인 관계, 거짓, 신뢰 불가. 깊이 없는 연결에는 관심이 없으며, 완전히 신뢰할 수 없으면 문을 닫아버립니다.',
    careers: ['심리상담사', '작가', '심리학자', '대학교수', 'NGO 대표', 'UX 연구원'],
    bestMatch: ['ENFP', 'ENTP'], celebrities: ['마틴 루터 킹(MC)', '넬슨 만델라(MC)', '원우·세븐틴(MP)', '우지·세븐틴(MC)'],
  },
  INTJ: {
    nickname: '전략의 설계자', emoji: '♟️',
    essence: '독창적인 비전을 세우고 체계적으로 실현하는',
    cognitiveStack: 'Ni-Te-Fi-Se',
    population: '2.1% (희귀)',
    gripStress: '평소 전략적이고 미래지향적인 사람이 열등기능 Se 폭주로 감각적 과잉에 빠집니다. 폭식, 과도한 운동, 충동 구매, 강박적 청소 등에 몰두하며, 자신의 Ni가 작동하지 않는다는 공포감을 느낍니다. 예측과 계획 능력을 잃었다고 느끼는 것이 INTJ에게는 가장 큰 공포입니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 봉사의 행동(Acts of Service)',
    attachmentStyle: '초기 관계에서 회피형 경향 — 개인 공간이 필수적이며 감정적 압도 시 철수합니다. 신뢰하는 파트너와는 점차 안정형으로.',
    dealBreaker: '거짓말과 불성실. 정보에 기반한 결정을 하는 사람이기에, 솔직하지 않은 파트너와는 즉시 관계를 끊습니다. 또한 성장을 추구하지 않는 파트너.',
    careers: ['소프트웨어 아키텍트', '과학자', '전략 컨설턴트', '투자 분석가', '외과의사', 'STEM 교수'],
    bestMatch: ['ENFP', 'ENTP'], celebrities: ['일론 머스크(MC)', '크리스토퍼 놀란(MP)', '류진·있지(MC)'],
  },
  ISTP: {
    nickname: '냉철한 장인', emoji: '🔧',
    essence: '논리적으로 원리를 파악하고 위기에서 빛나는',
    cognitiveStack: 'Ti-Se-Ni-Fe',
    population: '5.4% (보통)',
    gripStress: '평소 독립적이고 감정에 동요하지 않는 사람이, 열등기능 Fe(외향 감정)가 폭주하면서 갑자기 감정적으로 과민해집니다. "다들 나를 싫어하는 건 아닐까"라는 불안에 사로잡히고, 평소와 달리 집착적으로 관계를 확인하려 합니다. 통제할 수 없는 감정에 자기 자신도 당황합니다.',
    loveLanguage: '스킨십(Physical Touch) + 함께하는 활동(Quality Time)',
    attachmentStyle: '회피형 경향 — 독립성을 매우 중시하며, 끊임없는 감정적 확인을 요구하는 파트너에게 질식감을 느낍니다.',
    dealBreaker: '드라마. 감정적 소란과 과장을 참지 못하며, 갈등을 즐기는 듯한 파트너와는 빠르게 관계를 끝냅니다.',
    careers: ['기계공학자', '응급구조사(EMT)', '파일럿', '포렌식 과학자', '전기기사', '소프트웨어 개발자'],
    bestMatch: ['ESTJ', 'ENTJ'], celebrities: ['클린트 이스트우드(PM)', '톰 크루즈(PC)', '해린·뉴진스(PM)', '미나·트와이스(PM)'],
  },
  ISFP: {
    nickname: '호기심 많은 예술가', emoji: '🎨',
    essence: '자신만의 아름다움과 가치관으로 세상을 표현하는',
    cognitiveStack: 'Fi-Se-Ni-Te',
    population: '8.8% (흔함)',
    gripStress: '평소 온화하고 수용적인 사람이 열등기능 Te(외향 사고)가 폭주하면서 갑자기 공격적이고 통제적으로 변합니다. 비효율과 무능을 향한 날카로운 비판을 쏟아내며, 주변을 강박적으로 정리하려 합니다. 평소의 부드러운 모습과는 완전히 다른 모습에 가장 가까운 사람들이 충격을 받습니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 스킨십(Physical Touch)',
    attachmentStyle: '불안형 경향 — 감정적으로 깊이 투자하면서 거부를 두려워합니다.',
    dealBreaker: '자유를 억압하거나 자신을 변화시키려는 파트너. 무감각하고 냉담한 태도.',
    careers: ['그래픽 디자이너', '셰프', '수의사', '물리치료사', '인테리어 디자이너', '음악가'],
    bestMatch: ['ENFJ', 'ESFJ'], celebrities: ['데이비드 보위(PS)', '슈가·BTS(PM)', '제니·블랙핑크(PS)', '라이언 고슬링(PM)'],
  },
  INFP: {
    nickname: '이상의 중재자', emoji: '🦋',
    essence: '이상과 진정성을 추구하며 내면의 세계가 풍요로운',
    cognitiveStack: 'Fi-Ne-Si-Te',
    population: '4.4% (보통)',
    gripStress: '평소 부드럽고 이해심 깊은 사람이 열등기능 Te가 폭주하면서 갑자기 독단적이고 공격적으로 변합니다. 주변의 모든 것을 강박적으로 정리하고 통제하려 하며, 평소와 달리 가혹하고 비판적인 말을 내뱉습니다. 자신의 감정은 완전히 무시한 채 "효율"과 "생산성"에 집착하는 모습을 보입니다.',
    loveLanguage: '인정하는 말(Words of Affirmation) + 함께하는 시간(Quality Time)',
    attachmentStyle: '불안형 경향 — 이상화된 관계를 추구하며, 영혼의 단짝을 찾고자 합니다. 현실이 이상에 미치지 못할 때 깊은 실망을 느낍니다.',
    dealBreaker: '진정성 부족, 가치관 충돌. 자신의 핵심 가치를 존중하지 않는 파트너와는 함께할 수 없습니다.',
    careers: ['작가', '심리상담사', '그래픽 디자이너', '콘텐츠 크리에이터', '번역가', '사회운동가'],
    bestMatch: ['ENFJ', 'ENTJ'], celebrities: ['아이유(PM)', '뷔·BTS(PS)', '정국·BTS(PM)', '하니·뉴진스(PM)', '조니 뎁(PS)'],
  },
  INTP: {
    nickname: '논리의 사색가', emoji: '🧠',
    essence: '끝없는 지적 호기심으로 세상의 원리를 탐구하는',
    cognitiveStack: 'Ti-Ne-Si-Fe',
    population: '3.3% (드묾)',
    gripStress: '평소 논리적이고 초연한 사람이 열등기능 Fe가 폭주하면서 갑자기 감정에 휘말립니다. "아무도 나를 이해하지 못해", "나는 가치 없는 사람이야"라는 감정적 소용돌이에 빠지며, 평소와 달리 타인의 인정과 호감에 집착합니다. 논리로 해결할 수 없는 감정에 압도당하는 느낌이 가장 괴롭습니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 인정하는 말(Words of Affirmation)',
    attachmentStyle: '회피형 경향 — 개인 공간과 지적 자유가 필수적. 감정적 요구가 과도한 관계에서 질식감.',
    dealBreaker: '지적 호기심 부족, 논리적 대화가 불가능한 파트너. 폐쇄적이고 성장을 거부하는 태도.',
    careers: ['연구원', '소프트웨어 개발자', '수학자', '물리학자', '시스템 분석가', '경제학자'],
    bestMatch: ['ENTJ', 'ENFJ'], celebrities: ['아인슈타인(PM)', '빌 머레이(PS)', '진·BTS(PS)', '티나 페이(PM)'],
  },
  ESTP: {
    nickname: '모험의 사업가', emoji: '🏄',
    essence: '현재를 살며 몸으로 세상을 경험하는',
    cognitiveStack: 'Se-Ti-Fe-Ni',
    population: '4.3% (보통)',
    gripStress: '평소 현재에 집중하고 유연한 사람이 열등기능 Ni(내향 직관)가 폭주하면서 갑자기 어두운 미래 예언에 사로잡힙니다. "모든 것이 의미 없다"는 실존적 공허감, 음모론적 사고, 근거 없는 직감에 의한 판단을 하며, 평소의 행동력을 완전히 잃고 무기력에 빠집니다.',
    loveLanguage: '스킨십(Physical Touch) + 함께하는 활동(Quality Time)',
    attachmentStyle: '회피형 경향 — 자유를 중시하며 속박을 싫어합니다. 진심으로 좋아하는 사람에게만 놀라운 헌신.',
    dealBreaker: '지루함. 일상이 반복되고 새로운 자극이 없는 관계를 견디지 못합니다.',
    careers: ['기업가', '영업 매니저', '응급구조사', '소방관', '스포츠 선수', '마케터'],
    bestMatch: ['ISFJ', 'ISTJ'], celebrities: ['헤밍웨이(SC)', '마돈나(SC)', '마이클 조던(SC)', '베어 그릴스(SC)'],
  },
  ESFP: {
    nickname: '자유로운 연예인', emoji: '🎭',
    essence: '주변을 환하게 밝히며 현재의 즐거움을 만끽하는',
    cognitiveStack: 'Se-Fi-Te-Ni',
    population: '8.5% (흔함)',
    gripStress: '평소 밝고 낙관적인 사람이 열등기능 Ni가 폭주하면서 갑자기 비관적이고 철학적으로 변합니다. "모든 것이 무의미하다"는 허무감, 미래에 대한 암울한 예감, 상징적인 것에 과도한 의미 부여를 합니다. 평소의 밝은 에너지가 완전히 사라지고 어둡고 고립된 모습을 보입니다.',
    loveLanguage: '스킨십(Physical Touch) + 인정하는 말(Words of Affirmation)',
    attachmentStyle: '안정-불안 혼합 — 열정적이고 애정 표현이 풍부하지만, 진지한 대화를 회피하는 경향.',
    dealBreaker: '재미 없는 관계. 무겁고 제한적인 파트너. 자유를 억압하는 규칙.',
    careers: ['연예인', '이벤트 플래너', 'SNS 인플루언서', '여행 가이드', '인테리어 디자이너', '초등교사'],
    bestMatch: ['ISFJ', 'ISTJ'], celebrities: ['윌 스미스(SC)', '마릴린 먼로(SP)', '케이티 페리(SC)', '빌 클린턴(SC)'],
  },
  ENFP: {
    nickname: '열정의 캠페이너', emoji: '🌟',
    essence: '무한한 가능성을 탐험하며 사람들에게 영감을 주는',
    cognitiveStack: 'Ne-Fi-Te-Si',
    population: '8.1% (흔함)',
    gripStress: '평소 가능성과 영감으로 가득한 사람이 열등기능 Si(내향 감각)가 폭주하면서 갑자기 과거에 집착하고 통제적으로 변합니다. 경이로움의 감각을 잃고, 익숙한 것에 대한 강박적 필요, 반복적 행동(같은 프로그램만 보기, 침대에서 나오지 않기)에 빠집니다. 감정적으로 고갈되고 통제력을 잃은 느낌.',
    loveLanguage: '인정하는 말(Words of Affirmation) + 함께하는 시간(Quality Time)',
    attachmentStyle: '불안형 경향 — 열정적으로 몰두하며, 파트너의 잠재력을 발견하고 응원합니다. 관계에서 인정받지 못할 때 상처가 큽니다.',
    dealBreaker: '가능성을 닫는 파트너. 비전과 꿈을 비웃거나 현실적이지 않다고 폄하하는 태도.',
    careers: ['마케터', '작가', '기업가', '상담사', '크리에이티브 디렉터', '저널리스트'],
    bestMatch: ['INFJ', 'INTJ'], celebrities: ['RM·BTS(SP)', '로빈 윌리엄스(SC)', '로제·블랙핑크(SP)', '송중기(SP)', '창빈·스트레이키즈(SC)'],
  },
  ENTP: {
    nickname: '발명의 토론가', emoji: '💡',
    essence: '기존의 틀을 깨며 끊임없이 새로운 가능성을 탐구하는',
    cognitiveStack: 'Ne-Ti-Fe-Si',
    population: '3.2% (드묾)',
    gripStress: '평소 재치 있고 유연한 사람이 열등기능 Si가 폭주하면서 갑자기 세부사항과 과거에 집착합니다. 건강 문제에 과도한 불안, 신체 증상에 대한 강박적 모니터링, "옛날이 좋았다"는 비전형적 향수병에 빠집니다. 평소의 미래지향적 낙관주의가 사라지고 경직되고 비관적으로 변합니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 인정하는 말(Words of Affirmation)',
    attachmentStyle: '회피-안정 혼합 — 지적 자유가 핵심. 지적으로 자극을 주는 파트너에게 깊이 빠지지만, 감정적 깊이에는 시간이 걸립니다.',
    dealBreaker: '지적 대화 불가, 지루함. 새로운 아이디어를 탐구하지 않는 정체된 관계.',
    careers: ['기업가', '변호사', '마케팅 전략가', '컨설턴트', '발명가', '벤처 투자자'],
    bestMatch: ['INFJ', 'INTJ'], celebrities: ['마크 트웨인(SC)', '승관·세븐틴(SC)', '현진·스트레이키즈(SP)', '라미란(SC)'],
  },
  ESTJ: {
    nickname: '엄격한 관리자', emoji: '📋',
    essence: '질서와 효율로 조직을 이끄는',
    cognitiveStack: 'Te-Si-Ne-Fi',
    population: '8.7% (흔함)',
    gripStress: '평소 논리적이고 체계적인 사람이 열등기능 Fi(내향 감정)가 폭주하면서 갑자기 감정적으로 과민해집니다. "아무도 나를 인정해주지 않는다"는 서운함, 자신의 가치에 대한 의심, 평소와 달리 눈물을 보이거나 감정적으로 폭발합니다. 이성적으로 해결할 수 없는 감정에 당혹감을 느낍니다.',
    loveLanguage: '봉사의 행동(Acts of Service) + 함께하는 시간(Quality Time)',
    attachmentStyle: '안정형 경향 — 관계에서도 책임감 있고 신뢰할 수 있는 파트너. 감정 표현보다 행동으로.',
    dealBreaker: '무책임함, 약속 불이행. 체계 없이 사는 파트너에 대한 존경 상실.',
    careers: ['경영자', '군 장교', '판사', '재무관리자', '프로젝트 매니저', '학교 교장'],
    bestMatch: ['ISTP', 'ISFP'], celebrities: ['주디 판사(CM)', '민지·뉴진스(CM)', '지수·블랙핑크(CM)'],
  },
  ESFJ: {
    nickname: '사교의 외교관', emoji: '🤝',
    essence: '따뜻한 마음으로 사람들을 돌보고 조화를 만드는',
    cognitiveStack: 'Fe-Si-Ne-Ti',
    population: '12.0% (매우 흔함)',
    gripStress: '평소 따뜻하고 조화를 중시하는 사람이 열등기능 Ti(내향 사고)가 폭주하면서 갑자기 냉소적이고 비판적으로 변합니다. 평소와 달리 사람들의 논리적 결함을 가차 없이 지적하고, "감정 따위는 중요하지 않다"는 듯 차갑게 구는 모습을 보입니다. 관계보다 "사실"에 집착하게 됩니다.',
    loveLanguage: '인정하는 말(Words of Affirmation) + 봉사의 행동(Acts of Service)',
    attachmentStyle: '불안형 경향 — 관계에서 인정과 감사를 받을 때 가장 행복하며, 노력이 인정받지 못하면 불안해합니다.',
    dealBreaker: '감사 표현의 부재. 끝없이 베풀어도 당연시하는 파트너.',
    careers: ['교사', '간호사', '이벤트 플래너', 'HR 매니저', '호텔 매니저', '영업 매니저'],
    bestMatch: ['ISTP', 'ISFP'], celebrities: ['테일러 스위프트(CS)', '제이홉·BTS(SC)', '리사·블랙핑크(CS)', '돌리 파튼(SC)'],
  },
  ENFJ: {
    nickname: '정의의 선도자', emoji: '🌈',
    essence: '사람들의 잠재력을 발견하고 더 나은 세상을 만드는',
    cognitiveStack: 'Fe-Ni-Se-Ti',
    population: '2.5% (희귀)',
    gripStress: '평소 사람들을 이끌고 영감을 주는 리더가 열등기능 Ti가 폭주하면서 갑자기 냉혹한 논리의 칼날을 휘두릅니다. "너의 감정은 비논리적이야"라며 상대를 무참히 분석하고, 인간관계의 모든 것을 효율과 논리로 재단합니다. 평소 가장 중시하던 공감과 따뜻함이 완전히 사라진 모습에 본인도 충격을 받습니다.',
    loveLanguage: '인정하는 말(Words of Affirmation) + 함께하는 시간(Quality Time)',
    attachmentStyle: '불안-안정 혼합 — 파트너의 성장을 진심으로 응원하며, 관계에 많은 에너지를 투자합니다. 상대의 감정 변화에 매우 민감.',
    dealBreaker: '냉담함, 성장 거부. 자신의 잠재력을 낭비하는 파트너에 대한 좌절감.',
    careers: ['교사/교수', '심리상담사', '정치인', 'HR 매니저', 'NGO 대표', '코치'],
    bestMatch: ['INFP', 'ISFP'], celebrities: ['오프라 윈프리(CS)', '방찬·스트레이키즈(CP)', '지민·BTS(CS)', '다니엘·뉴진스(CS)'],
  },
  ENTJ: {
    nickname: '대담한 통솔자', emoji: '👑',
    essence: '비전을 제시하고 강한 추진력으로 실현하는',
    cognitiveStack: 'Te-Ni-Se-Fi',
    population: '1.8% (희귀)',
    gripStress: '평소 자신감 넘치고 결단력 있는 리더가 열등기능 Fi(내향 감정)가 폭주하면서 갑자기 감정적으로 무너집니다. "아무도 진심으로 나를 좋아하지 않는다", "나는 사랑받을 자격이 없다"는 자기 의심에 빠지며, 혼자 숨어 울거나 과거의 관계 실패를 되새깁니다. 강철 같은 외면 아래 가장 연약한 내면이 드러나는 순간입니다.',
    loveLanguage: '함께하는 시간(Quality Time) + 봉사의 행동(Acts of Service)',
    attachmentStyle: '안정-회피 혼합 — 관계에서도 주도권을 원하며, 독립적이고 성장지향적 파트너를 존중합니다.',
    dealBreaker: '무능력, 의지 부족. 목표와 비전 없이 사는 파트너에 대한 존경 상실.',
    careers: ['CEO', '변호사', '경영 컨설턴트', '정치인', '투자은행가', '대학 총장'],
    bestMatch: ['INFP', 'INTP'], celebrities: ['스티브 잡스(CM)', '마거릿 대처(CM)', '고든 램지(CS)', '잭 마(CS)'],
  },
};

// ────────────────────────────────────────────
// 통합 서사 생성 함수들
// ────────────────────────────────────────────

// MBTI 축 + 기질이 만들 때 생기는 "모순 해소" 인사이트
function generateContradictionInsight(mbtiType: string, tempCode: string): string[] {
  const insights: string[] = [];
  const primary = tempCode[0];
  const secondary = tempCode[1];
  const isE = mbtiType[0] === 'E';
  const isN = mbtiType[1] === 'N';
  const isF = mbtiType[2] === 'F';
  const isP = mbtiType[3] === 'P';

  // E/I + 기질 조합 모순 해소
  if (isE && (primary === 'M' || secondary === 'M')) {
    insights.push('당신은 외향형이지만 종종 "나 정말 E 맞나?" 하고 의문을 가졌을 겁니다. 이것은 우울질 기질 때문입니다. 사교적인 자리에서 에너지를 얻지만, 동시에 깊이 있는 사색과 혼자만의 시간이 없으면 공허해지는 이중적인 면이 있습니다. 파티에서 누구보다 활발하다가도, 집에 돌아오면 깊은 내면의 세계로 들어가고 싶어지죠. 이것은 모순이 아니라, 당신만의 독특한 에너지 패턴입니다.');
  }
  if (!isE && (primary === 'S' || secondary === 'S')) {
    insights.push('당신은 내향형이지만, 가끔 놀라울 정도로 사교적인 모습을 보여서 주변 사람들이 "진짜 I야?"라고 물어본 적이 있을 겁니다. 이것은 다혈질 기질이 만들어내는 현상입니다. 기본적으로 혼자만의 시간에서 에너지를 충전하지만, 다혈질의 영향으로 재미있는 상황이나 좋아하는 사람들 앞에서는 놀라울 정도로 밝고 활기차게 변합니다. 하지만 그 뒤에는 반드시 충전 시간이 필요하죠.');
  }
  if (!isE && (primary === 'C' || secondary === 'C')) {
    insights.push('내향형이면서 담즙질 기질을 가진 당신은 독특한 조합입니다. 평소에는 조용하고 혼자 있는 것을 좋아하지만, 목표가 명확하거나 리더십이 필요한 순간에는 마치 다른 사람처럼 강하고 적극적으로 변합니다. "목표가 있을 때만 외향적이 되는 사람" — 이것이 당신의 진짜 모습입니다. MBTI만으로는 결코 설명할 수 없는, 기질이 만들어낸 당신만의 전환 스위치입니다.');
  }
  if (isE && (primary === 'P' || secondary === 'P')) {
    insights.push('외향형이면서 점액질 기질을 가진 당신은, 사교적이면서도 어딘가 차분하고 조용한 에너지를 풍깁니다. 사람들 사이에서 에너지를 얻지만, 시끄럽거나 갈등이 있는 모임은 오히려 피곤합니다. "편안한 외향형" — 모임에 가면 좋지만, 그 모임이 평화롭고 따뜻해야 진짜 즐거운 타입이죠.');
  }

  // T/F + 기질 조합 모순 해소
  if (!isF && (primary === 'S' || primary === 'P')) {
    insights.push('사고형(T)이면서도 주변 분위기에 민감하게 반응하는 자신을 발견한 적이 있을 겁니다. 논리적으로 판단하면서도 사람들의 기분을 살피게 되는 건, 기질이 만들어내는 자연스러운 균형입니다. 머리는 논리로 판단하지만, 마음 한쪽에서는 조화와 관계를 신경 쓰고 있는 것이죠. 이 균형이야말로 당신의 큰 강점입니다.');
  }
  if (isF && (primary === 'C' || secondary === 'C')) {
    insights.push('감정형(F)이면서 담즙질 기질을 가진 당신은, "따뜻하지만 강한" 독특한 조합입니다. 사람의 감정을 깊이 이해하면서도, 필요할 때는 단호하게 결정을 내릴 수 있습니다. "왜 나는 공감하면서도 동시에 냉정해질 수 있지?"라고 느꼈다면, 그것이 바로 감정형 + 담즙질이 만들어내는 당신만의 리더십입니다.');
  }
  if (isF && (primary === 'M' || secondary === 'M')) {
    insights.push('감정형(F)에 우울질 기질까지 더해진 당신은, 세상에서 가장 깊은 감수성을 가진 사람 중 한 명입니다. 남들이 스쳐 지나가는 것들에서 아름다움과 슬픔을 동시에 느끼며, 타인의 고통을 마치 자신의 것처럼 느낍니다. 이 깊이는 때로 무거운 짐이 되지만, 동시에 누구도 흉내 낼 수 없는 당신만의 공감 능력이기도 합니다.');
  }

  // J/P + 기질 조합 모순 해소
  if (!isP && (primary === 'S' || secondary === 'S')) {
    insights.push('판단형(J)이면서 다혈질 기질이 있는 당신은, 계획을 세우면서도 즉흥적인 유혹에 자주 흔들립니다. "계획대로 살고 싶은데 재미있는 게 생기면 참을 수가 없어!" — 이 내면의 갈등이 익숙하다면, 그것은 당신이 약해서가 아니라 두 가지 강한 성향이 동시에 존재하기 때문입니다. 핵심은 중요한 것은 계획을 지키되, 여유 공간을 미리 만들어두는 것입니다.');
  }
  if (isP && (primary === 'C' || secondary === 'C')) {
    insights.push('인식형(P)이면서 담즙질 기질을 가진 당신은 독특한 역동성을 보입니다. 기본적으로 유연하고 열린 태도를 가지고 있지만, 목표가 생기는 순간 놀라울 정도로 집요하고 추진력 있게 변합니다. 주변 사람들은 "평소엔 느긋하더니 일 할 때는 완전 다른 사람"이라고 느낄 겁니다.');
  }
  if (isP && (primary === 'M' || secondary === 'M')) {
    insights.push('인식형(P)이면서 우울질 기질이 있는 당신은, 자유로움과 완벽주의 사이에서 끊임없이 줄다리기를 합니다. 계획에 얽매이기 싫지만, 동시에 결과물이 완벽하지 않으면 마음이 불편합니다. "자유롭게 하고 싶은데 대충은 못 하겠어" — 이 내면의 긴장이 당신만의 창의적 에너지의 원천입니다.');
  }

  // S/N + 기질 조합
  if (isN && (primary === 'P' || secondary === 'P')) {
    insights.push('직관형(N)이면서 점액질 기질을 가진 당신은, 상상력은 풍부하지만 그것을 실행으로 옮기는 데 시간이 오래 걸립니다. 머릿속에는 멋진 아이디어가 가득하지만, 행동으로 옮기기까지 에너지를 모으는 과정이 필요하죠. 이것은 게으름이 아니라, 점액질 특유의 신중함과 직관형의 풍부한 내면 세계가 만나 만들어지는 현상입니다.');
  }
  if (!isN && (primary === 'M' || secondary === 'M')) {
    insights.push('감각형(S)이면서 우울질 기질을 가진 당신은, 현실적이면서도 이상주의적인 독특한 조합입니다. 실제 경험과 사실을 중시하지만, 동시에 "더 나은 방법이 있을 텐데"라는 완벽주의적 생각을 놓지 못합니다. 현실 감각과 이상의 균형 — 이것이 당신의 큰 잠재력입니다.');
  }

  // 기질 조합 자체의 모순 해소
  if (primary === 'S' && secondary === 'M') {
    insights.push('다혈질(S)과 우울질(M)의 조합인 당신은, 내면에 두 개의 세계를 가지고 있습니다. 밖에서는 밝고 유쾌하지만, 혼자가 되면 깊은 생각과 감정의 바다에 잠깁니다. "왜 나는 즐겁다가도 갑자기 우울해지지?" — 이것은 당신의 문제가 아닙니다. 다혈질의 밝은 에너지와 우울질의 깊은 감수성이 교대로 표면에 올라오는 자연스러운 패턴입니다.');
  }
  if (primary === 'C' && secondary === 'P') {
    insights.push('담즙질(C)과 점액질(P)의 조합인 당신은, 겉으로는 매우 차분해 보이지만 내면에는 강한 불꽃을 품고 있습니다. 평소에는 온화하고 여유롭지만, 중요한 순간에 놀라울 정도의 결단력과 추진력을 보여줍니다. 사람들은 종종 당신의 이런 반전에 놀랍니다.');
  }
  if (primary === 'M' && secondary === 'S') {
    insights.push('우울질(M)과 다혈질(S)의 조합인 당신은, 깊이와 밝음이 공존하는 매력적인 사람입니다. 예술적 감수성으로 깊은 작품을 만들어내면서도, 그것을 사람들 앞에서 매력적으로 표현하는 능력이 있습니다. 이 조합은 많은 위대한 예술가와 크리에이터에게서 발견됩니다.');
  }
  if (primary === 'C' && secondary === 'M') {
    insights.push('담즙질(C)과 우울질(M) 조합인 당신은, 자신에게 가장 엄격한 사람입니다. 높은 목표를 세우고 강하게 밀어붙이면서도, 동시에 "이게 정말 완벽한가"를 끊임없이 점검합니다. 이 조합은 엄청난 성과를 만들어내지만, 동시에 번아웃의 위험도 가장 높습니다. 가끔은 스스로에게 "잘하고 있어"라고 말해주세요.');
  }

  return insights;
}

// MBTI + 기질을 결합한 통합 인격 서술
function generatePersonalityNarrative(mbtiType: string, tempCode: string): string {
  const mbti = mbtiCores[mbtiType];
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];

  const tempNicknames: Record<string, string> = {
    SC: '탁월한 지도자', SP: '즐거움을 주는 사람', SM: '섬세한 팔방미인',
    CS: '타고난 카리스마', CP: '타고난 행정가', CM: '섬세하고 뛰어난 언변가',
    PS: '관계가 편안한 사람', PC: '잠재력이 뛰어난 사람', PM: '성실한 후원자',
    MS: '인간적인 사람', MC: '철저한 준비성의 사람', MP: '탁월한 전문가',
  };
  const comboName = tempNicknames[tempCode] ?? '독특한 조합';

  return `당신은 ${mbti.essence} ${mbti.nickname}(${mbtiType})이면서, 동시에 ${primary.essence}인 ${primary.name}이 주된 기질로 자리 잡고 있습니다.

히포크라테스의 기질론에서 ${primary.name}은 ${primary.element}의 원소, ${primary.humor}과 연결됩니다. ${primary.season}의 기운을 타고난 당신은, ${primary.innerDrive}을(를) 핵심 동력으로 삼아 삶을 살아갑니다.

여기에 ${secondary.name}(${secondary.element}, ${secondary.humor})이 보조 기질로 더해지면서, 단순한 ${mbtiType} 유형으로는 설명되지 않는 독특한 깊이와 복합성을 만들어냅니다.

이 두 기질의 조합은 전통 기질론에서 "${comboName}"으로 불리며, ${mbtiType}의 인지 기능(${mbti.cognitiveStack})과 결합되어 세상에서 유일한 당신만의 성격 패턴을 형성합니다.`;
}

// 통합 "숨겨진 진짜 모습"
function generateHiddenSelf(mbtiType: string, tempCode: string): string {
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];

  return `사람들이 보는 당신과 진짜 당신 사이에는 간극이 있습니다.

${primary.hiddenSelf}

그리고 보조 기질인 ${secondary.name}의 영향으로, ${secondary.hiddenSelf.replace('있습니다', '있기도 합니다')}

이 두 층의 내면이 겹치면서, 당신은 때때로 스스로도 자신을 이해하기 어려운 순간을 경험합니다. 하지만 이것은 혼란이 아닙니다. 당신이라는 사람의 풍부한 내면 세계가 만들어내는 자연스러운 복합성입니다.`;
}

// 통합 연애 스타일
function generateLoveNarrative(mbtiType: string, tempCode: string): string {
  const isE = mbtiType[0] === 'E';
  const isF = mbtiType[2] === 'F';
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];
  const mbti = mbtiCores[mbtiType];

  const approach = isE
    ? '연애를 시작할 때 비교적 적극적으로 다가가는 편입니다.'
    : '연애를 시작할 때 시간을 두고 천천히 마음을 열어가는 편입니다.';

  const emotional = isF
    ? '감정 표현이 풍부하고, 파트너의 감정 변화에 민감하게 반응합니다.'
    : '감정 표현은 서툴 수 있지만, 실질적인 행동과 문제 해결로 사랑을 증명합니다.';

  return `${approach} ${emotional}

${primary.name} 기질의 영향으로, 당신의 사랑의 언어는 "${primary.loveLanguage}"입니다. 이것이 ${mbtiType} 유형의 특성과 만나면서 독특한 연애 패턴을 만들어냅니다.

보조 기질인 ${secondary.name}의 영향으로 "${secondary.loveLanguage}" 또한 중요하게 여기며, 이 두 가지 사랑의 언어가 균형을 이룰 때 관계에서 가장 큰 행복을 느낍니다.

당신에게 가장 잘 맞는 파트너는, 당신의 이런 복합적인 면을 이해하고 받아들여주는 사람입니다. MBTI 기준으로는 ${mbti.bestMatch.join(', ')} 유형과 궁합이 좋지만, 기질의 호환성도 중요합니다. 당신의 ${primary.name} 에너지를 안정시켜줄 수 있는 사람, 그리고 ${secondary.name} 면을 이해해줄 수 있는 사람이 최고의 파트너입니다.`;
}

// 통합 스트레스 & 회복 가이드
function generateStressGuide(mbtiType: string, tempCode: string): string {
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];

  return `스트레스가 찾아오면, 당신의 ${primary.name} 기질이 먼저 반응합니다.

${primary.stressMode}

스트레스가 깊어지면 보조 기질인 ${secondary.name}의 반응이 겹치면서 더 복잡해집니다. ${secondary.stressMode}

당신만의 회복법: 먼저 자신이 스트레스를 받고 있다는 것을 인정하세요. ${primary.name}이 주된 기질인 당신에게는 "${primary.lifePhilosophy}"라는 삶의 철학이 있습니다. 스트레스 상황에서도 이 본래의 가치로 돌아오는 것이 회복의 시작입니다.`;
}

// 통합 커리어 가이드
function generateCareerGuide(mbtiType: string, tempCode: string): string {
  const mbti = mbtiCores[mbtiType];
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];
  const primaryKey = tempCode[0];

  let workEnvironment = '';
  if (primaryKey === 'S') workEnvironment = '활기차고 사람들과 교류가 많은 환경, 자유롭고 창의적인 분위기';
  else if (primaryKey === 'C') workEnvironment = '도전적이고 성과 중심의 환경, 자율성과 의사결정권이 주어지는 곳';
  else if (primaryKey === 'P') workEnvironment = '안정적이고 예측 가능한 환경, 갈등이 적고 협력적인 분위기';
  else workEnvironment = '집중할 수 있는 조용한 환경, 깊이 있는 작업과 품질을 인정받는 곳';

  return `${mbtiType} 유형으로서 ${mbti.careers.slice(0, 3).join(', ')} 등의 직업에서 재능을 발휘할 수 있습니다.

하지만 여기서 기질을 고려하면 더 정확한 그림이 그려집니다.

${primary.name} 기질이 주된 당신에게 가장 맞는 업무 환경은 "${workEnvironment}"입니다. 같은 ${mbtiType}라도 기질에 따라 최적의 환경이 크게 달라집니다.

${secondary.name}이 보조 기질이기 때문에, ${secondary.name === '우울질' ? '세부적인 완성도가 중요한 업무에서도 빛을 발합니다' : secondary.name === '담즙질' ? '리더십이 필요한 순간에 놀라운 추진력을 보여줍니다' : secondary.name === '다혈질' ? '사람들과 소통하고 분위기를 이끄는 역할도 잘 해냅니다' : '안정적으로 꾸준히 성과를 내는 장기 프로젝트에 강합니다'}.

핵심 조언: ${mbtiType}에게 일반적으로 추천되는 직업 목록을 그대로 따르기보다, ${primary.name} 기질이 원하는 환경과 에너지를 먼저 고려하세요. 직업의 종류보다 일하는 방식과 환경이 당신의 만족도를 더 크게 좌우합니다.`;
}

// 통합 인생 공략집 (성장 가이드)
function generateLifeStrategy(mbtiType: string, tempCode: string): string {
  const primary = temperamentCores[tempCode[0]];
  const secondary = temperamentCores[tempCode[1]];
  const primaryKey = tempCode[0];
  const secondaryKey = tempCode[1];

  let tip1 = '';
  let tip2 = '';
  let tip3 = '';

  // 1차 기질 기반 핵심 전략
  if (primaryKey === 'S') {
    tip1 = '당신의 밝은 에너지는 천부적인 재능입니다. 하지만 "재미있는 것"과 "의미 있는 것"을 구분하는 눈을 키우세요. 시작의 달인인 당신에게 필요한 건, 마무리의 기술입니다. 하나의 프로젝트를 끝까지 완성하는 경험이 당신의 자존감을 한 차원 높여줄 것입니다.';
  } else if (primaryKey === 'C') {
    tip1 = '당신의 추진력은 세상을 움직이는 힘입니다. 하지만 "더 빨리, 더 많이"만이 답이 아닙니다. 가끔 멈춰서 주변을 돌아보세요. 혼자 달리는 것보다 함께 걷는 것이 더 먼 곳에 도달하게 합니다. 약함을 보여주는 것이 진짜 강함이라는 것을 기억하세요.';
  } else if (primaryKey === 'P') {
    tip1 = '당신의 평화로운 에너지는 이 시끄러운 세상에 꼭 필요한 존재입니다. 하지만 편안함에 안주하지 마세요. 갈등을 피하는 것이 아니라, 갈등을 건설적으로 다루는 법을 배우세요. 당신의 의견은 중요하고, 당신의 목소리는 들릴 자격이 있습니다.';
  } else {
    tip1 = '당신의 깊이와 감수성은 세상이 놓치는 것을 포착하는 안테나입니다. 하지만 완벽을 기다리느라 시작하지 못하는 것은 세상의 손실입니다. "불완전해도 가치가 있다"는 것을 믿으세요. 당신이 70%의 완성도로 내놓은 것이 다른 사람의 100%를 넘는 경우가 많습니다.';
  }

  // 2차 기질 기반 보조 전략
  if (secondaryKey === 'S') {
    tip2 = '다혈질 보조 기질을 활용하세요. 당신에게는 사람들과 연결되는 능력이 있습니다. 이 사교성을 전략적으로 사용하면, 인생의 많은 문이 열립니다.';
  } else if (secondaryKey === 'C') {
    tip2 = '담즙질 보조 기질을 활용하세요. 필요할 때 발휘되는 추진력과 결단력이 당신의 숨겨진 무기입니다. 중요한 순간에 이 에너지를 믿고 행동하세요.';
  } else if (secondaryKey === 'P') {
    tip2 = '점액질 보조 기질을 활용하세요. 인내심과 안정감이 당신의 숨겨진 강점입니다. 급할 때일수록 이 차분함을 꺼내면 더 나은 결과를 만들어낼 수 있습니다.';
  } else {
    tip2 = '우울질 보조 기질을 활용하세요. 세부 사항에 대한 감각과 높은 기준이 당신의 숨겨진 강점입니다. 중요한 결정에서 이 분석력을 발휘하면 실수를 크게 줄일 수 있습니다.';
  }

  // 통합 핵심 메시지
  tip3 = `${primary.name}(${primaryKey})과 ${secondary.name}(${secondaryKey})의 조합, 그리고 ${mbtiType}의 인지 기능이 만들어내는 당신만의 패턴을 이해하는 것이 성장의 첫걸음입니다. 당신은 한 가지 유형으로 정의될 수 없는 복합적인 존재이며, 그것이야말로 당신의 가장 큰 경쟁력입니다.`;

  return `${tip1}\n\n${tip2}\n\n${tip3}`;
}

// 통합 소통 가이드
function generateCommunicationGuide(mbtiType: string, tempCode: string): string {
  const isE = mbtiType[0] === 'E';
  const isF = mbtiType[2] === 'F';
  const primaryKey = tempCode[0];

  let base = isE
    ? '기본적으로 대화를 즐기고, 생각을 말로 표현하면서 정리하는 스타일입니다.'
    : '기본적으로 충분히 생각한 후에 말하는 스타일이며, 깊이 있는 일대일 대화를 선호합니다.';

  let temperamentLayer = '';
  if (primaryKey === 'S') {
    temperamentLayer = '다혈질 기질의 영향으로 대화에 유머와 에너지가 넘칩니다. 이야기의 핵심보다 분위기와 재미를 우선시할 때가 있어, 진지한 대화가 필요한 상황에서는 의식적으로 집중하는 것이 좋습니다.';
  } else if (primaryKey === 'C') {
    temperamentLayer = '담즙질 기질의 영향으로 대화에서 주도권을 잡으려 합니다. 결론부터 말하는 경향이 있고, 비효율적인 대화에 인내심이 부족합니다. 상대가 자신의 속도에 맞추기를 기대하기보다, 상대의 리듬을 존중하는 연습이 필요합니다.';
  } else if (primaryKey === 'P') {
    temperamentLayer = '점액질 기질의 영향으로 대화에서 경청의 달인입니다. 하지만 자신의 의견을 충분히 표현하지 않아 "동의하는 건가, 관심 없는 건가" 모호하게 느껴질 수 있습니다. 침묵이 동의를 의미하지 않는다면, 그것을 말로 표현해주세요.';
  } else {
    temperamentLayer = '우울질 기질의 영향으로 대화에서 정확성과 깊이를 추구합니다. 가벼운 잡담보다 의미 있는 대화를 원하며, 상대의 말 속에 숨겨진 의미를 분석합니다. 모든 대화가 깊을 필요는 없다는 것을 받아들이면 인간관계가 더 편해집니다.';
  }

  const emotionalLayer = isF
    ? '감정형(F)의 특성이 더해져, 대화에서 상대의 감정 상태를 예민하게 포착합니다. 이것은 큰 강점이지만, 때로는 상대의 감정에 과도하게 영향받지 않도록 경계를 설정하는 것도 중요합니다.'
    : '사고형(T)의 특성이 더해져, 대화에서 논리와 일관성을 중시합니다. 하지만 모든 대화가 논리적일 필요는 없습니다. 가끔은 공감만으로 충분한 순간이 있다는 것을 기억하세요.';

  return `${base}\n\n${temperamentLayer}\n\n${emotionalLayer}`;
}

// ────────────────────────────────────────────
// 최종 통합 프로필 생성 함수 (외부에서 호출)
// ────────────────────────────────────────────

export interface IntegratedProfile {
  fullCode: string;
  mbtiNickname: string;
  mbtiEmoji: string;
  temperamentNickname: string;
  dualTemperamentDescription: string;  // 12가지 복합 기질 조합 상세 설명
  cognitiveStack: string;
  population: string;
  personalityNarrative: string;
  contradictionInsights: string[];
  hiddenSelf: string;
  gripStressNarrative: string;
  loveNarrative: string;
  stressGuide: string;
  careerGuide: string;
  communicationGuide: string;
  lifeStrategy: string;
  eysenckInsight: string;
  neuroscienceInsight: string;
  humorTheoryInsight: string;  // 4체액설 과학적 배경
  parentingInsight: string;
  weaknessInsight: string;     // 기질적 약점과 성장 포인트
  careers: string[];
  bestMatch: string[];
  celebrities: string[];
  primaryTemperament: TemperamentCore;
  secondaryTemperament: TemperamentCore;
}

export function generateIntegratedProfile(
  mbtiResult: MBTIResult,
  temperamentResult: TemperamentResult
): IntegratedProfile {
  const mbtiType = mbtiResult.type;
  const tempCode = temperamentResult.code;
  const mbti = mbtiCores[mbtiType] ?? mbtiCores['ISTJ'];
  const primaryTemp = temperamentCores[tempCode[0]] ?? temperamentCores['S'];
  const secondaryTemp = temperamentCores[tempCode[1]] ?? temperamentCores['C'];

  // 기질 조합 닉네임 매핑 (전통 기질론 명칭 + 현대 해석)
  const tempNicknames: Record<string, string> = {
    SC: '탁월한 지도자', SP: '즐거움을 주는 사람', SM: '섬세한 팔방미인',
    CS: '타고난 카리스마', CP: '타고난 행정가', CM: '섬세하고 뛰어난 언변가',
    PS: '관계가 편안한 사람', PC: '잠재력이 뛰어난 사람', PM: '성실한 후원자',
    MS: '인간적인 사람', MC: '철저한 준비성의 사람', MP: '탁월한 전문가',
  };

  // 12가지 복합 기질 조합 상세 설명
  const dualTemperamentDescriptions: Record<string, string> = {
    SC: '다혈질의 사교적 에너지와 담즙질의 결단력이 결합된 당신은, 사람들을 끌어모으면서도 강력한 목표 의식으로 이끌 수 있는 천부적인 지도자입니다. 밝은 카리스마로 사람들의 마음을 사고, 강한 추진력으로 결과를 만들어냅니다.',
    SP: '다혈질의 밝은 에너지와 점액질의 따뜻한 안정감이 합쳐진 당신은, 어디서든 자연스럽게 사람들에게 즐거움과 편안함을 줍니다. 시끄럽지 않으면서도 분위기를 밝히는, 모두가 곁에 두고 싶어하는 사람입니다.',
    SM: '다혈질의 사교적 활기와 우울질의 섬세한 감수성이 공존하는 당신은, 넓은 인간관계를 유지하면서도 깊이 있는 표현력을 가진 팔방미인입니다. 밝은 모습 뒤에 깊은 내면 세계가 숨어있어, 사람들은 당신에게서 겉과 다른 깊이를 발견하고 놀랍니다.',
    CS: '담즙질의 강한 추진력과 다혈질의 사교적 매력이 결합된 당신은, 타고난 카리스마의 소유자입니다. 목표를 향해 달리면서도 사람들을 자연스럽게 끌어당기는 힘이 있어, 주변에 항상 따르는 사람이 생깁니다.',
    CP: '담즙질의 결단력과 점액질의 안정감이 합쳐진 당신은, 타고난 행정가이자 조직의 기둥입니다. 강한 의지로 일을 밀어붙이되, 차분하게 체계를 만들고 유지하는 능력이 탁월합니다. 조용하지만 강한 리더십의 전형입니다.',
    CM: '담즙질의 강한 의지와 우울질의 섬세함이 만난 당신은, 뛰어난 언변과 설득력을 가진 사람입니다. 논리적으로 파고들면서도 상대의 감정을 건드리는 표현을 할 수 있어, 사람들을 움직이는 데 탁월합니다.',
    PS: '점액질의 평화로운 안정감과 다혈질의 밝은 에너지가 결합된 당신은, 인생의 굴곡 없이 편안한 관계를 만드는 달인입니다. 갈등을 만들지 않으면서도 따뜻한 분위기를 유지하여, 누구와 함께해도 편안한 사람입니다.',
    PC: '점액질의 안정감과 담즙질의 잠재적 추진력이 공존하는 당신은, 평소에는 조용하지만 결정적 순간에 놀라운 힘을 발휘하는 잠재력의 소유자입니다. 필요할 때 폭발적인 에너지를 보여줘 주변을 놀라게 합니다.',
    PM: '점액질의 꾸준함과 우울질의 깊이가 결합된 당신은, 묵묵히 한 분야를 파고드는 성실한 후원자입니다. 화려하지 않지만 누구보다 신뢰할 수 있으며, 곁에 있으면 안심이 되는 존재입니다.',
    MS: '우울질의 깊은 감수성과 다혈질의 표현력이 만난 당신은, 인간적이고 따뜻한 매력의 소유자입니다. 깊이 느끼면서도 그것을 생생하게 표현할 수 있어, 사람들의 마음을 깊이 울리는 능력이 있습니다.',
    MC: '우울질의 철저한 분석력과 담즙질의 실행력이 결합된 당신은, 완벽한 준비성으로 무장한 전략가입니다. 치밀하게 계획하고 강하게 실행하여, 한번 시작한 일은 반드시 높은 수준으로 완성합니다.',
    MP: '우울질의 깊은 사고력과 점액질의 인내심이 만난 당신은, 한 분야에서 탁월한 전문성을 발휘하는 전문가형입니다. 조용하지만 누구보다 깊이 있는 지식과 통찰을 쌓아가며, 그 분야의 최고를 향해 묵묵히 나아갑니다.',
  };

  // Grip 스트레스 통합 서사
  const gripNarrative = `${mbti.gripStress}\n\n여기에 ${primaryTemp.name} 기질의 스트레스 패턴이 겹칩니다. ${primaryTemp.stressPattern}. ${primaryTemp.name}의 스트레스 반응과 ${mbtiType}의 열등기능 폭주가 동시에 일어나면, 평소의 당신과는 완전히 다른 모습이 됩니다. 주변 사람들이 "오늘 왜 이래?"라고 느끼는 순간이 바로 이 때입니다.\n\n회복의 첫걸음은 이 패턴을 알아차리는 것입니다. "아, 지금 내 열등기능이 폭주하고 있구나"라고 인지하는 것만으로도 절반은 해결됩니다.`;

  // Eysenck 과학적 인사이트
  const eysenckNarrative = `${primaryTemp.eysenckMapping}\n\n이것은 당신의 기질이 단순한 성격론이 아니라 신경생물학적 기반을 가지고 있다는 의미입니다. ${mbtiType}의 인지기능(${mbti.cognitiveStack})과 이 생물학적 기질이 결합되어, 당신만의 독특한 사고-감정-행동 패턴을 만들어냅니다.`;

  // 신경과학 인사이트
  const neuroscienceNarrative = `${primaryTemp.neuroscience}\n\n흥미로운 점은, MBTI에는 Big Five 성격 모델의 '신경증(Neuroticism)' 축이 빠져 있다는 것입니다. 바로 이 빈자리를 히포크라테스의 기질론이 채워줍니다. Eysenck의 연구에 따르면 ${primaryTemp.name}은 ${primaryTemp.name === '다혈질' || primaryTemp.name === '점액질' ? '안정적인(Low Neuroticism)' : '반응적인(High Neuroticism)'} 자율신경계를 가지고 있어, 같은 ${mbtiType}라도 기질에 따라 감정적 반응 강도가 크게 달라집니다.`;

  // 양육 스타일 통합
  const parentingNarrative = `${primaryTemp.parentingStyle}\n\n${mbtiType}의 인지기능과 결합하면, 당신은 ${mbtiType[2] === 'F' ? '자녀의 감정에 민감하게 반응하면서도' : '논리적이고 일관된 원칙을 중시하면서도'} ${primaryTemp.name} 기질의 영향으로 ${primaryTemp.name === '다혈질' ? '재미있고 활기찬' : primaryTemp.name === '담즙질' ? '높은 기대치와 성취를 강조하는' : primaryTemp.name === '점액질' ? '안정적이고 인내심 있는' : '세심하고 품질을 중시하는'} 부모가 됩니다.`;

  // 4체액설 과학적 배경
  const humorTheoryNarrative = `히포크라테스는 인체가 불, 물, 공기, 흙이라는 4원소로 이루어져 있으며, 이에 대응하는 4가지 체액의 균형이 건강과 성격을 결정한다고 보았습니다.\n\n당신의 주된 기질인 ${primaryTemp.name}은 ${primaryTemp.element}의 원소, ${primaryTemp.humor}과 연결됩니다. ${primaryTemp.bodyConnection}\n\n보조 기질인 ${secondaryTemp.name}은 ${secondaryTemp.element}의 원소, ${secondaryTemp.humor}과 연결되어, 당신의 성격에 두 번째 층위를 더합니다. 이 두 원소의 조합이 만들어내는 독특한 균형이 바로 당신만의 기질적 DNA입니다.\n\n현대의 관점에서 체액 자체가 성격을 결정한다는 주장은 과학적으로 검증되지 않았지만, 히포크라테스가 관찰한 4가지 성격 패턴 자체는 Eysenck의 2차원 성격 모델과 놀라울 정도로 일치하며, 2,400년이 지난 지금도 유효한 통찰로 인정받고 있습니다.`;

  // 기질적 약점과 성장 포인트
  const weaknessNarrative = `모든 기질에는 빛과 그림자가 있습니다. ${primaryTemp.name}의 그림자를 이해하는 것은 성장의 핵심입니다.\n\n${primaryTemp.coreWeakness}\n\n보조 기질인 ${secondaryTemp.name}의 약점도 알아두세요: ${secondaryTemp.coreWeakness}\n\n중요한 것은 이 약점이 당신의 결함이 아니라, 강점의 이면이라는 점입니다. ${primaryTemp.name}의 핵심 강점이 과하게 발현될 때 약점이 나타나는 것이며, 이를 인식하는 것 자체가 성장의 시작입니다. 보조 기질인 ${secondaryTemp.name}이 주된 기질의 약점을 보완해주는 역할을 하기도 합니다.`;

  return {
    fullCode: `${mbtiType}-${tempCode}`,
    mbtiNickname: mbti.nickname,
    mbtiEmoji: mbti.emoji,
    temperamentNickname: tempNicknames[tempCode] ?? '독특한 조합',
    dualTemperamentDescription: dualTemperamentDescriptions[tempCode] ?? '',
    cognitiveStack: mbti.cognitiveStack,
    population: mbti.population,
    personalityNarrative: generatePersonalityNarrative(mbtiType, tempCode),
    contradictionInsights: generateContradictionInsight(mbtiType, tempCode),
    hiddenSelf: generateHiddenSelf(mbtiType, tempCode),
    gripStressNarrative: gripNarrative,
    loveNarrative: generateLoveNarrative(mbtiType, tempCode),
    stressGuide: generateStressGuide(mbtiType, tempCode),
    careerGuide: generateCareerGuide(mbtiType, tempCode),
    communicationGuide: generateCommunicationGuide(mbtiType, tempCode),
    lifeStrategy: generateLifeStrategy(mbtiType, tempCode),
    eysenckInsight: eysenckNarrative,
    neuroscienceInsight: neuroscienceNarrative,
    humorTheoryInsight: humorTheoryNarrative,
    parentingInsight: parentingNarrative,
    weaknessInsight: weaknessNarrative,
    careers: mbti.careers,
    bestMatch: mbti.bestMatch,
    celebrities: mbti.celebrities,
    primaryTemperament: primaryTemp,
    secondaryTemperament: secondaryTemp,
  };
}
