'use client';

import CharacterAvatar from './CharacterAvatar';
import Link from 'next/link';

// MBTI 유형별 상세 데이터
interface TypeData {
  nickname: string;
  emoji: string;
  cognitiveStack: string;
  population: string;
  group: string;
  description: string;
  temperamentConnection: string; // 기질론과의 연결 설명
  cognitiveDetail: string;
  strengths: string[];
  weaknesses: string[];
  gripStress: string;
  loveStyle: string;
  careers: string[];
  growthTips: string[];
  defaultTemp: string; // 대표 기질 (캐릭터 표시용)
}

const typeData: Record<string, TypeData> = {
  ISTJ: {
    nickname: '신뢰의 수호자', emoji: '🛡️', cognitiveStack: 'Si-Te-Fi-Ne', population: '11.6%', group: '관리자형',
    description: 'ISTJ는 조직의 기둥입니다. 철저하고 체계적이며, 다른 사람들이 놓치는 불일치, 누락, 함정을 발견합니다. 사실과 구체적 데이터를 이론과 추상적 아이디어보다 신뢰하며, 규칙을 따르고 다른 사람도 규칙을 따르도록 합니다. 과거의 경험과 사실에 대한 뛰어난 기억력을 가지고 있습니다.',
    temperamentConnection: 'ISTJ는 히포크라테스 기질론에서 점액질(Phlegmatic) 또는 우울질(Melancholic)과 가장 많이 결합됩니다. Keirsey 이론에서는 "수호자(Guardian/SJ)" 그룹에 속하며, 이는 전통적으로 우울질의 의무감, 신중함, 안정 추구와 맞닿아 있습니다.\n\n그러나 같은 ISTJ라도 기질에 따라 크게 달라집니다. 담즙질 기질의 ISTJ는 규칙을 따르면서도 리더십이 강하고, 다혈질 기질의 ISTJ는 체계적이면서도 의외로 사교적인 모습을 보입니다. 이것이 MBTI만으로는 설명할 수 없는 개인차이며, 기질론이 보완하는 지점입니다.',
    cognitiveDetail: '주기능 Si(내향 감각)는 과거의 경험과 세부 정보를 정밀하게 저장하고 활용합니다. 보조기능 Te(외향 사고)는 외부 세계를 논리적으로 조직하고 효율을 추구합니다. 이 조합으로 ISTJ는 "검증된 방법으로 체계적으로 실행하는" 사람이 됩니다.\n\n3차기능 Fi(내향 감정)는 조용하지만 강한 개인적 가치관을 형성하고, 열등기능 Ne(외향 직관)는 미래 가능성을 보는 것이 약점 — 스트레스 시 파국적 상상에 빠질 수 있습니다.',
    strengths: ['뛰어난 책임감과 성실함 — 약속을 반드시 지킵니다', '세부사항에 대한 높은 주의력 — 남들이 놓치는 오류를 발견합니다', '정직과 진실됨 — 감정적 조작이나 거짓말을 거부합니다', '인내심과 끈기 — 지루한 작업도 끝까지 해냅니다', '조직력과 체계성 — 명확한 규칙과 절차를 만들어냅니다'],
    weaknesses: ['변화에 대한 강한 저항 — "원래 이렇게 해왔다"에 집착합니다', '감정 표현의 어려움 — 솔직함이 무심함으로 보일 수 있습니다', '유연성 부족 — 규칙을 완화하는 것을 꺼립니다', '자기 과부하 — 자신만이 제대로 할 수 있다고 생각하며 일을 떠맡습니다', '모호한 상황에서의 불안 — 절차나 전례가 없으면 스트레스를 받습니다'],
    gripStress: '극도의 스트레스 시 열등기능 Ne가 폭주하면서, 평소 현실적이고 침착한 ISTJ가 갑자기 최악의 시나리오에 사로잡힙니다. "만약 모든 것이 무너지면?", 무고한 말에서 숨겨진 악의를 읽으며, 근거 없는 공포에 산만해집니다.',
    loveStyle: '행동으로 사랑을 보여줍니다 — 기념일을 기억하고, 약속을 지키고, 실질적인 지원을 합니다. 안정적이고 예측 가능한 관계를 원하며, 파트너의 도덕적 일관성을 가장 중요하게 봅니다. 사랑의 언어는 봉사의 행동(Acts of Service)과 함께하는 시간(Quality Time)입니다.',
    careers: ['회계사/감사관', '군 장교', '판사/법률가', '데이터베이스 관리자', '품질 관리 검사관', '프로젝트 관리자'],
    growthTips: ['일주일에 한 번, 평소와 다른 새로운 것을 시도해보세요', '피드백을 줄 때 상대의 감정을 먼저 고려하는 연습을 하세요', '"모르겠다"는 상태를 15분간 견뎌보는 연습을 하세요', '작은 일부터 다른 사람에게 위임하고, 다시 하고 싶은 충동을 참아보세요', '창의적 활동(글쓰기, 그림)으로 Ne를 의식적으로 훈련하세요'],
    defaultTemp: 'PM',
  },
  ISFJ: {
    nickname: '따뜻한 수호자', emoji: '🌸', cognitiveStack: 'Si-Fe-Ti-Ne', population: '13.8% (한국 약 22%)', group: '관리자형',
    description: 'ISFJ는 따뜻하고 헌신적이며, 주변 사람들에 대한 깊은 책임감을 느낍니다. Si의 세밀한 기억력과 Fe의 감정적 공감이 결합되어, 사람들의 생일, 좋아하는 음식, 6개월 전 지나가듯 한 말까지 기억합니다. 가족과 직장의 감정적 닻 역할을 하며, 어디에든 안정감과 따뜻함을 만들어냅니다.',
    temperamentConnection: 'ISFJ는 점액질(Phlegmatic)과 가장 자연스럽게 연결됩니다. 둘 다 조화를 추구하고, 갈등을 피하며, 다른 사람을 배려하는 것을 우선시합니다. Keirsey의 "수호자(Guardian/SJ)" 그룹에 속합니다.\n\n하지만 담즙질 기질의 ISFJ는 헌신적이면서도 놀라울 정도로 강한 의지를 보여주고, 다혈질 기질의 ISFJ는 돌보면서도 사교적이고 밝은 에너지를 풍깁니다. 한국에서 가장 흔한 유형(약 22%)이지만, 기질에 따라 완전히 다른 사람처럼 느껴질 수 있습니다.',
    cognitiveDetail: '주기능 Si(내향 감각)가 사람들에 대한 세밀한 기억을 저장하고, 보조기능 Fe(외향 감정)가 그 기억을 타인을 돌보는 데 활용합니다. 이 조합이 "당신이 6개월 전에 원한다고 한 그 책"을 선물하는 사람을 만듭니다.\n\n3차기능 Ti(내향 사고)는 내부적 논리 분석을, 열등기능 Ne(외향 직관)는 스트레스 시 "모든 사람이 나를 싫어하면 어쩌지?"라는 파국적 불안을 일으킵니다.',
    strengths: ['탁월한 충성심 — 관계를 수십 년간 유지합니다', '관찰적 공감 — 사람들의 세부 사항을 기억하여 감동을 줍니다', '강한 직업 윤리 — "충분히 좋은"으로 만족하지 않습니다', '갈등 중재 — 감정의 저류를 읽고 긴장이 커지기 전에 개입합니다', '실용적 돌봄 — 공감에서 그치지 않고 행동합니다'],
    weaknesses: ['변화에 대한 저항 — 특히 갑작스러운 변화에 스트레스', '완벽주의 — 기대를 넘기려 하다 탈진합니다', '거절 어려움 — 타인의 짐을 떠맡다 과부하', '대립 회피 — 개인적 불편을 감수하며 문제를 방치', '칭찬 받기 어려움 — 노력이 인정받지 못하면 깊이 상처받습니다'],
    gripStress: '열등기능 Ne 폭주 시, "모든 사람이 나를 싫어하면?", "이 병이 치명적이면?" 등의 파국적 사고에 빠집니다. 평소와 달리 냉소적이고 비꼬는 말을 하며, 양육적 따뜻함이 완전히 사라집니다.',
    loveStyle: '행동으로 사랑을 보여줍니다 — 요리하고, 집을 정리하고, 파트너가 걱정하지 않도록 실무를 처리합니다. 감정적 안전, 일관성, 노력을 알아봐주는 파트너가 필요합니다. 끝없이 주다가 인정받지 못하면 관계에 균열이 생깁니다.',
    careers: ['간호사/의료인', '초등교사', '사회복지사', '사서', 'HR 전문가', '행정 비서'],
    growthTips: ['일주일에 한 번, 작은 부탁을 거절하는 연습을 하세요', '"나는 ~이 필요해"라고 직접 말하는 연습을 하세요', '의견 충돌을 관계 위협이 아닌 이해의 기회로 재해석하세요', 'Ne 불안이 시작되면 최악의 시나리오와 가장 가능성 높은 시나리오를 비교해보세요', '타인의 감정 전에 "논리적으로 맞는가?"를 먼저 물어보세요'],
    defaultTemp: 'PS',
  },
  INFJ: {
    nickname: '통찰의 예언자', emoji: '🔮', cognitiveStack: 'Ni-Fe-Ti-Se', population: '1.5% (가장 희귀)', group: '외교관형',
    description: 'INFJ는 전 세계에서 가장 희귀한 성격 유형입니다. Ni가 끊임없이 패턴을 인식하고 미래를 예측하며, Fe가 사람들의 감정을 깊이 읽습니다. 이 조합으로 "말하지 않아도 상대가 무엇을 필요로 하는지 아는" 거의 초자연적인 공감 능력을 보여줍니다. 역설적으로, 다른 사람을 깊이 이해하면서도 자신은 깊이 오해받는다고 느끼는 유형입니다.',
    temperamentConnection: 'INFJ는 Keirsey의 "이상주의자(Idealist/NF)" 그룹에 속합니다. 기질론에서는 우울질(Melancholic)과 깊은 연관이 있습니다 — 둘 다 이상주의적이고, 의미를 추구하며, 내면 세계가 풍부합니다.\n\n하지만 담즙질 기질의 INFJ는 비전을 조용히 품는 대신 강력하게 실행하고, 다혈질 기질의 INFJ는 깊이 있으면서도 놀라울 정도로 사교적입니다. INFJ의 유명한 "도어슬램"(갑자기 관계를 끊는 행동)도 기질에 따라 발현 방식이 완전히 다릅니다.',
    cognitiveDetail: '주기능 Ni(내향 직관)가 백그라운드에서 끊임없이 정보를 종합하여 깊은 통찰과 미래 예측을 만들어냅니다. 보조기능 Fe(외향 감정)가 감정의 풍경을 읽어, "말하지 않은 것을 아는" 능력을 만듭니다.\n\n3차기능 Ti(내향 사고)는 내부적 논리 프레임을, 열등기능 Se(외향 감각)는 현실 세계와의 연결이 약점 — 스트레스 시 폭식, 충동 구매 등 감각 탐닉에 빠질 수 있습니다.',
    strengths: ['탁월한 직관력 — "어떻게 알았어?"를 자주 듣습니다', '비범한 공감력 — 신뢰를 구축하고, 요청 전에 필요를 파악합니다', '비전 제시 — 이상적 미래를 보고 실현할 결단력이 있습니다', '깊은 경청 — 말뿐 아니라 감정, 맥락, 숨은 의미까지 흡수합니다', '글과 표현 — Ni-Fe-Ti가 복잡한 아이디어를 감정적 깊이와 논리적 구조로 전달합니다'],
    weaknesses: ['완벽주의와 자기 비판 — 불가능한 기준을 세웁니다', '거절 어려움 — 타인의 필요에 자신을 소진합니다', 'INFJ 도어슬램 — 인내의 한계를 넘으면 경고 없이 관계를 끊습니다', '신체 방치 — 열등기능 Se로 인해 식사, 수면, 운동을 잊습니다', '정보 과부하 — 여러 관점을 동시에 들고 있으면 창의성 마비'],
    gripStress: '열등기능 Se 폭주 시, 폭식, 충동 쇼핑, 과음 등 평소와 완전히 다른 감각 탐닉에 빠집니다. 가장 무서운 것은 직관이 "오프라인" 되는 느낌 — 사람을 읽는 능력을 잃었다고 느끼는 것이 INFJ에게는 정체성 위기입니다.',
    loveStyle: '깊고 영혼적인 연결을 추구합니다. 표면적 관계에는 관심이 없으며, 상대의 가장 깊은 곳까지 알고 알려지길 원합니다. 사랑의 언어는 Quality Time + Words of Affirmation. 신뢰가 깨지면 도어슬램이 발동됩니다.',
    careers: ['심리상담사/치료사', '작가/저자', '심리학자', '대학교수(인문학)', '비영리단체 대표', 'UX 연구원'],
    growthTips: ['규칙적인 운동으로 Se를 의식적으로 개발하세요', '경계 설정을 자기 존중의 행위로 재해석하세요', '도어슬램 지점에 도달하기 전에 불편함을 일찍 표현하세요', '"충분히 좋은"을 낮은 위험 상황에서 연습하세요', 'Fe 이전에 Ti를 사용하세요 — "이것이 사실인가?" 먼저 물어보세요'],
    defaultTemp: 'MP',
  },
  INTJ: {
    nickname: '전략의 설계자', emoji: '♟️', cognitiveStack: 'Ni-Te-Fi-Se', population: '2.1% (희귀)', group: '분석가형',
    description: 'INTJ는 MBTI의 전략적 마스터마인드입니다. Ni가 끊임없이 정보를 종합하여 미래를 예측하고, Te가 그 비전을 체계적 계획으로 실현합니다. 모든 것이 어떻게 연결되어 있는지 자연스럽게 파악하며, 다른 사람이 해결 불가능하다고 보는 문제에 집요하게 집중합니다.',
    temperamentConnection: 'INTJ는 Keirsey의 "합리주의자(Rational/NT)" 그룹에 속합니다. 기질론에서는 우울질(Melancholic)의 분석력 + 담즙질(Choleric)의 추진력이 결합된 MC 조합과 자주 연결됩니다.\n\n점액질 기질의 INTJ는 전략적이면서도 놀라울 정도로 인내심이 강하고, 다혈질 기질의 INTJ는 비전을 세우면서도 의외로 사교적으로 표현할 수 있습니다.',
    cognitiveDetail: '주기능 Ni(내향 직관)가 관점을 빠르게 전환하며 하나의 진실이나 예측을 찾아냅니다. 보조기능 Te(외향 사고)가 비전을 효율적 시스템으로 구축합니다.\n\n3차기능 Fi(내향 감정)는 깊이 느끼지만 표현이 어렵고, 열등기능 Se(외향 감각)는 현실 세계의 감각적 세부사항이 약점입니다.',
    strengths: ['전략적 패턴 인식 — 모든 것의 연결 고리를 봅니다', '독립적 사고 — 인기가 아닌 증거에 기반한 결론', '효율 최적화 — 낭비를 제거하고 시스템을 개선합니다', '지적 호기심 — 평생 학습자로 여러 분야의 전문가', '불굴의 결단력 — 비전에 대한 집요한 추구'],
    weaknesses: ['오만하게 보일 수 있음 — Ni 통찰에 대한 자신감이 거만으로 읽힘', '감정 처리 어려움 — 내면은 깊이 느끼지만 표현이 서투름', '예측불가에 약함 — Ni가 예측하지 못한 사건에 크게 동요', '사회적 피로 — 지속적인 사교가 극도로 소모적', '완벽주의 — 이상과 현실의 괴리를 참지 못함'],
    gripStress: '열등기능 Se 폭주 시, 감각적 과잉에 빠집니다. 폭식, 과도한 운동, 충동 구매, 강박적 청소. Ni의 전략적 비전이 "오프라인"되는 느낌이 INTJ에게 가장 큰 공포입니다.',
    loveStyle: '지적으로 강렬하고 깊이 충성합니다. 문제 해결, 장기 계획, 지적 교류로 사랑을 표현합니다. 정직, 지적 자극, 성장하는 파트너가 필요합니다. 거짓말을 하면 즉시 관계를 끊습니다.',
    careers: ['소프트웨어 아키텍트', '과학자/연구원', '전략 컨설턴트', '투자 분석가', '외과의사', 'STEM 교수'],
    growthTips: ['감정 일기를 써서 Fi를 의식적으로 개발하세요', '요리, 정원, 무술 등 Se를 사용하는 취미를 시작하세요', '모든 사람이 당신의 속도로 정보를 처리하지 않음을 인정하세요', '신뢰하는 사람에게 감정을 보여주세요 — 취약함은 약함이 아닙니다', '저위험 상황에서 "충분히 좋은" 결정을 연습하세요'],
    defaultTemp: 'MC',
  },
  ISTP: {
    nickname: '냉철한 장인', emoji: '🔧', cognitiveStack: 'Ti-Se-Ni-Fe', population: '5.4%', group: '탐험가형',
    description: 'ISTP는 조용한 문제 해결사입니다. 직접 해보면서 세상을 이해하며, 사물을 분해하고 재조립하는 데 탁월합니다. 위기 상황에서 다른 사람들이 얼어붙을 때 빛나며, 현재 순간에 확고히 살면서 이론보다 경험을 신뢰합니다.',
    temperamentConnection: 'ISTP는 Keirsey의 "장인(Artisan/SP)" 그룹에 속하며, 히포크라테스의 다혈질(Sanguine)과 일부 연결됩니다. 하지만 내향형이므로 점액질(Phlegmatic)의 차분함과 더 가까운 경우가 많습니다.\n\n담즙질 기질의 ISTP는 위기 대응이 특히 뛰어나고, 우울질 기질의 ISTP는 기계를 다루면서도 깊은 분석력을 보여줍니다.',
    cognitiveDetail: '주기능 Ti(내향 사고)가 세상의 원리를 내부적으로 분석하고, 보조기능 Se(외향 감각)가 현재 순간의 물리적 세계와 직접 상호작용합니다.\n\n3차기능 Ni는 직감적 패턴 인식을, 열등기능 Fe는 감정 표현과 관계가 약점입니다.',
    strengths: ['기계/기술 마스터리', '위기 상황에서의 침착함', '효율적 문제 해결', '높은 적응력', '독립성과 자기 충족'],
    weaknesses: ['감정 표현 서투름', '무모한 자극 추구', '약속과 장기 계획 회피', '감정적 무감각', '타인의 감정을 무시할 수 있음'],
    gripStress: '열등기능 Fe 폭주 시, 갑자기 감정적으로 과민해집니다. "다들 나를 싫어해"라는 불안, 평소와 달리 집착적 관계 확인, 통제 불능의 감정에 자기 자신도 당황합니다.',
    loveStyle: '함께 활동하면서 사랑을 보여줍니다. 서프라이즈와 실용적 도움으로 표현하며, 자유와 공간이 필수입니다. 감정적 드라마를 참지 못합니다.',
    careers: ['기계공학자', '응급구조사(EMT)', '파일럿', '포렌식 과학자', '전기기사', '소프트웨어 개발자'],
    growthTips: ['매일 하나의 감정을 인식하고 이름 붙이세요', '신뢰하는 사람에게 주 1회 개인적 감정을 공유하세요', '하나의 프로젝트에 헌신하고, 지루함이 올 때 참아보세요', '충동적 행동 전 "6개월 후 어떻게 될까?" 물어보세요', '해결책 제시 전 상대의 말을 끝까지 들어보세요'],
    defaultTemp: 'PC',
  },
  ISFP: {
    nickname: '호기심 많은 예술가', emoji: '🎨', cognitiveStack: 'Fi-Se-Ni-Te', population: '8.8%', group: '탐험가형',
    description: 'ISFP는 부드럽고 감성적인 예술가입니다. 풍부한 감각 경험과 깊은 개인적 가치관의 세계에서 삽니다. 일몰을 보기만 하는 것이 아니라 느낍니다. 자유로운 자기 표현을 최우선으로 하며, 강한 내적 도덕 나침반으로 세상을 항해합니다.',
    temperamentConnection: 'ISFP는 기질론에서 다혈질(Sanguine)의 감각적 즐거움과 점액질(Phlegmatic)의 온화함이 자주 결합됩니다.\n\n우울질 기질의 ISFP는 예술적 깊이가 특히 두드러지고, 담즙질 기질의 ISFP는 부드러우면서도 의외로 강한 의지를 보여줍니다.',
    cognitiveDetail: '주기능 Fi가 깊은 개인적 가치 체계를 형성하고, 보조기능 Se가 현재 순간의 아름다움을 풍부하게 경험합니다. 열등기능 Te 폭주 시 갑자기 공격적이고 통제적으로 변합니다.',
    strengths: ['진정한 자기 표현', '비판단적 수용', '미적 감수성', '현재에 충실한 삶', '깊은 감정적 연결'],
    weaknesses: ['구조와 계획에 대한 반감', '비판에 극도로 예민', '자기 주장 부족', '장기 계획 어려움', '자신의 능력 과소평가'],
    gripStress: '열등기능 Te 폭주 시, 갑자기 공격적이고 통제적으로 변합니다. 비효율과 무능을 향한 날카로운 비판을 쏟아내며, 평소의 부드러운 모습이 완전히 사라집니다.',
    loveStyle: '조용한 헌신을 함께하는 감각 경험으로 표현합니다. 개성을 존중하고 자유를 주는 파트너가 필요합니다. 자신을 바꾸려는 파트너는 거부합니다.',
    careers: ['그래픽 디자이너', '셰프', '수의사', '물리치료사', '인테리어 디자이너', '음악가'],
    growthTips: ['작은 단기 목표부터 계획하는 연습을 하세요', '"나는 다르게 봅니다"라고 말하는 용기를 키우세요', '피드백을 인격 공격이 아닌 정보로 재해석하세요', 'Te를 의식적으로 사용해 장단점 목록을 만들어보세요', '기본 예산과 저축 계획을 세워보세요'],
    defaultTemp: 'SM',
  },
  INFP: {
    nickname: '이상의 중재자', emoji: '🦋', cognitiveStack: 'Fi-Ne-Si-Te', population: '4.4%', group: '외교관형',
    description: 'INFP는 세상을 있는 그대로가 아닌 있어야 할 모습으로 바라봅니다. 진정성, 의미, 긍정적 영향을 깊이 추구하며, 풍부한 내면 세계에서 상상과 감정을 탐험합니다. 조용하지만 자신의 가치에 대해서는 놀라울 정도로 열정적입니다.',
    temperamentConnection: 'INFP는 기질론에서 점액질(Phlegmatic)의 온화함과 우울질(Melancholic)의 이상주의가 자연스럽게 결합됩니다.\n\n다혈질 기질의 INFP는 이상주의적이면서도 사교적 매력이 넘치고, 담즙질 기질의 INFP는 부드러운 외면 아래 강한 추진력을 품고 있습니다.',
    cognitiveDetail: '주기능 Fi가 강력한 내적 가치 체계를 형성하고, 보조기능 Ne가 무한한 가능성을 탐색합니다. 3차기능 Si는 과거의 편안함에 의지하고, 열등기능 Te 폭주 시 독단적이고 공격적으로 변합니다.',
    strengths: ['풍부한 상상력과 창의력', '깊은 공감과 이해심', '강한 도덕적 가치관', '적응력과 개방성', '진정성 있는 인간관계'],
    weaknesses: ['비현실적 기대', '비판에 극도로 예민', '결정 장애', '자기 비판 경향', '현실적 문제 처리 어려움'],
    gripStress: '열등기능 Te 폭주 시, 갑자기 독단적이고 공격적으로 변합니다. 모든 것을 강박적으로 통제하고, 가혹하고 비판적인 말을 합니다. 자신의 감정은 완전히 무시한 채 "효율"에 집착합니다.',
    loveStyle: '동화 같은 순수하고 낭만적인 사랑을 꿈꿉니다. 영혼의 단짝을 찾으며, 헌신적이지만 이상화된 기대가 실망으로 이어질 수 있습니다.',
    careers: ['작가', '심리상담사', '그래픽 디자이너', '콘텐츠 크리에이터', '번역가', '사회운동가'],
    growthTips: ['이상은 소중하지만 작은 행동부터 시작하세요', '직접적으로 "나는 ~이 필요해"라고 말하세요', '피드백은 당신의 가치가 아닌 결과물에 대한 것입니다', 'Te를 연습하세요 — 장단점 목록, 마감 설정', '70%의 완성도로 세상에 내놓는 용기를 가지세요'],
    defaultTemp: 'MS',
  },
  INTP: {
    nickname: '논리의 사색가', emoji: '🧠', cognitiveStack: 'Ti-Ne-Si-Fe', population: '3.3% (드묾)', group: '분석가형',
    description: 'INTP는 세상의 원리를 탐구하는 조용한 사색가입니다. 논리적 사고를 즐기며, 아이디어의 논리적 일관성을 끊임없이 추구합니다. 복잡한 문제를 분석하고 해결하는 것을 좋아하며, 독립적이고 비판적인 사고를 합니다.',
    temperamentConnection: 'INTP는 기질론에서 우울질(Melancholic)의 분석력과 점액질(Phlegmatic)의 차분함이 자주 결합됩니다.\n\n담즙질 기질의 INTP는 이론을 세우면서도 실행력이 강하고, 다혈질 기질의 INTP는 분석적이면서도 의외로 유머가 넘칩니다.',
    cognitiveDetail: '주기능 Ti가 내부적 논리 프레임을 구축하고, 보조기능 Ne가 가능성을 탐색합니다. 열등기능 Fe 폭주 시 "아무도 나를 이해하지 못해"라는 감정적 소용돌이에 빠집니다.',
    strengths: ['탁월한 분석력', '높은 창의성', '객관적 판단', '복잡한 개념의 빠른 이해', '독립적 지적 호기심'],
    weaknesses: ['사회적 상호작용 어려움', '감정 표현 부재', '아이디어 실행 실패', '일상 업무 무관심', '완성 못하는 프로젝트들'],
    gripStress: '열등기능 Fe 폭주 시, "아무도 나를 이해하지 못해", "나는 가치 없는 사람"이라는 감정에 빠지며, 타인의 인정과 호감에 집착합니다.',
    loveStyle: '지적 대화를 통해 유대감을 형성합니다. 개인 공간을 중시하며, 지적으로 자극을 주는 파트너에게 매력을 느낍니다.',
    careers: ['연구원', '소프트웨어 개발자', '수학자', '물리학자', '시스템 분석가', '경제학자'],
    growthTips: ['아이디어를 실행으로 옮기는 연습을 하세요', '"충분히 좋은"에서 시작하는 용기를 가지세요', '하루 하나의 감정을 인식하고 기록하세요', '인내심을 가지고 다른 사고 방식을 존중하세요', '공감만으로 충분한 순간이 있음을 기억하세요'],
    defaultTemp: 'MP',
  },
  ESTP: {
    nickname: '모험의 사업가', emoji: '🏄', cognitiveStack: 'Se-Ti-Fe-Ni', population: '4.3%', group: '탐험가형',
    description: 'ESTP는 에너지 넘치고 수완 좋은 현실주의 행동가입니다. 현재 순간에 살며, 문제가 생기면 즉각적으로 해결합니다. 위험을 두려워하지 않고, 직접 몸으로 경험하는 것을 좋아합니다.',
    temperamentConnection: 'ESTP는 Keirsey의 "장인(Artisan/SP)" 그룹에 속하며, 히포크라테스의 다혈질(Sanguine)과 강하게 연결됩니다. 담즙질(Choleric)의 추진력과도 자주 결합됩니다.',
    cognitiveDetail: '주기능 Se가 현재 순간을 날카롭게 인식하고, 보조기능 Ti가 즉석에서 논리적 분석을 합니다. 열등기능 Ni 폭주 시 어두운 미래 예언에 사로잡힙니다.',
    strengths: ['뛰어난 상황 판단력', '강한 행동력', '위기 대처 능력', '사교성과 설득력', '현실적 문제 해결'],
    weaknesses: ['인내심 부족', '장기적 결과 무시', '규칙 반감', '타인 감정에 둔감', '충동적 결정'],
    gripStress: '열등기능 Ni 폭주 시, "모든 것이 의미 없다"는 실존적 공허감, 음모론적 사고에 빠지며 평소의 행동력을 잃고 무기력해집니다.',
    loveStyle: '에너지 넘치고 재미있는 연애. 자유를 중시하고 속박을 싫어하지만, 진심인 상대에게는 놀라운 헌신을 보여줍니다.',
    careers: ['기업가', '영업 매니저', '응급구조사', '소방관', '스포츠 선수', '마케터'],
    growthTips: ['행동 전 깊이 생각하는 시간을 가지세요', '장기 목표를 세우면 뛰어난 실행력이 더 빛납니다', '타인의 감정적 필요를 인식하는 연습을 하세요', '충동적 결정 전 24시간 규칙을 적용하세요', '한 가지 프로젝트에 끝까지 집중하는 연습을 하세요'],
    defaultTemp: 'CS',
  },
  ESFP: {
    nickname: '자유로운 연예인', emoji: '🎭', cognitiveStack: 'Se-Fi-Te-Ni', population: '8.5%', group: '탐험가형',
    description: 'ESFP는 삶을 즐기는 것을 가장 중요시합니다. 주변 사람들에게 즐거움과 활력을 주며, 현재 순간을 100% 만끽합니다. 유연하고 적응력이 뛰어나며, 사람들과 어울리는 것을 좋아합니다.',
    temperamentConnection: 'ESFP는 다혈질(Sanguine)과 가장 자연스럽게 연결됩니다. 둘 다 사교적이고, 즐거움을 추구하며, 현재에 집중합니다.',
    cognitiveDetail: '주기능 Se가 현재의 감각 경험을 풍부하게 하고, 보조기능 Fi가 깊은 개인적 가치를 형성합니다. 열등기능 Ni 폭주 시 비관적이고 허무적으로 변합니다.',
    strengths: ['뛰어난 대인관계', '긍정적 에너지', '현실 감각', '높은 적응력', '영감을 주는 능력'],
    weaknesses: ['장기 계획 부재', '심각한 대화 회피', '충동적 소비', '비판에 예민', '집중력 유지 어려움'],
    gripStress: '열등기능 Ni 폭주 시, "모든 것이 무의미하다"는 허무감, 미래에 대한 암울한 예감에 빠지며, 밝은 에너지가 완전히 사라집니다.',
    loveStyle: '즐겁고 활기찬 연애. 서프라이즈와 낭만적 제스처를 좋아하며, 모든 순간을 특별하게 만듭니다.',
    careers: ['연예인', '이벤트 플래너', 'SNS 인플루언서', '여행 가이드', '인테리어 디자이너', '초등교사'],
    growthTips: ['미래를 위한 투자에 하루 10분을 할애하세요', '진지한 대화를 피하지 말고 직면하세요', '충동 구매 전 24시간 대기하세요', '피드백을 성장의 기회로 받아들이세요', '한 가지 장기 프로젝트에 끝까지 헌신하세요'],
    defaultTemp: 'SC',
  },
  ENFP: {
    nickname: '열정의 캠페이너', emoji: '🌟', cognitiveStack: 'Ne-Fi-Te-Si', population: '8.1%', group: '외교관형',
    description: 'ENFP는 열정적이고 창의적이며, 새로운 가능성을 발견하는 것을 즐깁니다. 사교적이고 따뜻하며, 사람들에게 영감을 줍니다. 자유롭고 독립적인 정신을 가지고 있습니다.',
    temperamentConnection: 'ENFP는 다혈질(Sanguine)의 사교성과 에너지가 핵심이며, 우울질(Melancholic)의 깊이가 보조로 결합되는 경우가 많습니다. Keirsey의 "이상주의자(Idealist/NF)" 그룹에 속합니다.',
    cognitiveDetail: '주기능 Ne가 무한한 가능성을 탐색하고, 보조기능 Fi가 깊은 개인적 가치를 형성합니다. 열등기능 Si 폭주 시 과거에 집착하고 통제적으로 변합니다.',
    strengths: ['뛰어난 소통 능력과 카리스마', '창의적 아이디어', '높은 공감 능력', '열정적 에너지', '유연한 적응력'],
    weaknesses: ['집중력 부족', '과도한 이상주의', '마무리 약함', '감정 기복', '승인 욕구'],
    gripStress: '열등기능 Si 폭주 시, 경이로움의 감각을 잃고 과거에 집착합니다. 같은 프로그램만 반복 시청, 침대에서 나오지 않는 등 감정 고갈 상태.',
    loveStyle: '열정적이고 낭만적. 파트너의 잠재력을 발견하고 응원하며, 깊은 대화와 새로운 경험을 통해 유대감을 키웁니다.',
    careers: ['마케터', '작가', '기업가', '상담사', '크리에이티브 디렉터', '저널리스트'],
    growthTips: ['시작한 일을 끝까지 해보세요', '깊이 있는 한 가지에 집중하는 연습을 하세요', '현실적 단계로 꿈을 나누세요', '감정에 따른 결정을 24시간 유예하세요', 'Si를 의식적으로 개발하세요 — 루틴과 기록 습관'],
    defaultTemp: 'SM',
  },
  ENTP: {
    nickname: '발명의 토론가', emoji: '💡', cognitiveStack: 'Ne-Ti-Fe-Si', population: '3.2% (드묾)', group: '분석가형',
    description: 'ENTP는 기발하고 도전적인 아이디어의 발명가입니다. 기존의 방식에 의문을 제기하고, 지적 자극을 원하며, 토론과 논쟁을 즐깁니다.',
    temperamentConnection: 'ENTP는 다혈질(Sanguine)의 사교성과 담즙질(Choleric)의 도전 정신이 자주 결합됩니다. Keirsey의 "합리주의자(Rational/NT)" 그룹에 속합니다.',
    cognitiveDetail: '주기능 Ne가 가능성을 끊임없이 탐색하고, 보조기능 Ti가 논리적으로 분석합니다. 열등기능 Si 폭주 시 세부사항과 과거에 집착합니다.',
    strengths: ['뛰어난 창의력', '빠른 학습', '유머와 재치', '도전적 자신감', '다양한 관점에서 분석'],
    weaknesses: ['논쟁을 위한 논쟁', '인내심 부족', '규칙 반감', '감정적 민감도 부족', '실행력 부족'],
    gripStress: '열등기능 Si 폭주 시, 건강 문제에 대한 강박적 불안, 과거 향수병, 평소의 미래지향적 낙관이 사라지고 경직됩니다.',
    loveStyle: '지적 대화와 새로운 경험으로 가득한 관계. 도전적이고 자극적인 파트너에게 끌리며, 지루한 관계는 견디지 못합니다.',
    careers: ['기업가', '변호사', '마케팅 전략가', '컨설턴트', '발명가', '벤처 투자자'],
    growthTips: ['아이디어를 현실로 만드는 연습을 하세요', '가까운 사람의 감정에 더 귀 기울이세요', '한 프로젝트를 완성하는 것의 가치를 배우세요', '감정적 대화에서 논리적 반박을 자제하세요', '루틴의 가치를 실험해보세요 — 1주 도전'],
    defaultTemp: 'CS',
  },
  ESTJ: {
    nickname: '엄격한 관리자', emoji: '📋', cognitiveStack: 'Te-Si-Ne-Fi', population: '8.7%', group: '관리자형',
    description: 'ESTJ는 실질적이고 현실적이며 단호합니다. 조직과 사람을 관리하는 능력이 뛰어나고, 규칙과 질서를 중시합니다. 효율적인 시스템을 구축하며, 명확하고 직접적인 소통을 선호합니다.',
    temperamentConnection: 'ESTJ는 담즙질(Choleric)의 리더십과 우울질(Melancholic)의 체계성이 자주 결합됩니다. Keirsey의 "수호자(Guardian/SJ)" 그룹에 속합니다.',
    cognitiveDetail: '주기능 Te가 외부 세계를 효율적으로 조직하고, 보조기능 Si가 검증된 방법과 전례를 활용합니다. 열등기능 Fi 폭주 시 갑자기 감정적으로 과민해집니다.',
    strengths: ['뛰어난 조직력', '강한 리더십', '책임감과 신뢰성', '실용적 접근', '명확한 소통'],
    weaknesses: ['유연성 부족', '감정 간과', '지나친 통제', '변화 저항', '고집'],
    gripStress: '열등기능 Fi 폭주 시, "아무도 나를 인정하지 않는다"는 서운함에 빠지며, 이성적으로 해결할 수 없는 감정에 당혹감을 느낍니다.',
    loveStyle: '안정적이고 신뢰할 수 있는 관계. 책임감 있고, 행동으로 사랑을 증명합니다.',
    careers: ['경영자', '군 장교', '판사', '재무관리자', '프로젝트 매니저', '학교 교장'],
    growthTips: ['리더십은 통제가 아니라 영감입니다', '다른 사람의 방식도 존중하세요', '감정을 표현하는 것은 약함이 아닙니다', '규칙에 예외를 허용하는 연습을 하세요', '피드백을 줄 때 상대의 감정을 먼저 고려하세요'],
    defaultTemp: 'CP',
  },
  ESFJ: {
    nickname: '사교의 외교관', emoji: '🤝', cognitiveStack: 'Fe-Si-Ne-Ti', population: '12.0% (매우 흔함)', group: '관리자형',
    description: 'ESFJ는 따뜻하고 양심적이며 협동적입니다. 조화를 중시하고, 다른 사람의 필요에 민감합니다. 전통과 예절을 중시하며, 안정된 환경을 만드는 데 기여합니다.',
    temperamentConnection: 'ESFJ는 다혈질(Sanguine)의 사교성과 점액질(Phlegmatic)의 배려가 자연스럽게 결합됩니다.',
    cognitiveDetail: '주기능 Fe가 타인의 감정을 읽고 조화를 추구하며, 보조기능 Si가 세부 사항을 기억합니다. 열등기능 Ti 폭주 시 냉소적이고 비판적으로 변합니다.',
    strengths: ['뛰어난 대인관계', '강한 책임감', '세심한 배려', '조화로운 환경 조성', '실질적 도움'],
    weaknesses: ['타인 평가에 과민', '변화 불안', '갈등 회피', '자기 욕구 무시', '타인 의존'],
    gripStress: '열등기능 Ti 폭주 시, 냉소적이고 비판적으로 변합니다. "감정 따위는 중요하지 않다"는 듯 차갑게 행동합니다.',
    loveStyle: '따뜻하고 헌신적. 기념일, 서프라이즈, 세심한 배려로 관계를 풍성하게 합니다. 인정과 감사를 받을 때 가장 행복합니다.',
    careers: ['교사', '간호사', '이벤트 플래너', 'HR 매니저', '호텔 매니저', '영업 매니저'],
    growthTips: ['모든 사람을 기쁘게 할 수는 없습니다', '자신의 욕구와 경계를 설정하세요', '비판을 성장의 기회로 받아들이세요', '혼자만의 시간도 소중합니다', 'Ti를 의식적으로 사용하세요 — 논리적 분석 연습'],
    defaultTemp: 'SP',
  },
  ENFJ: {
    nickname: '정의의 선도자', emoji: '🌈', cognitiveStack: 'Fe-Ni-Se-Ti', population: '2.5% (희귀)', group: '외교관형',
    description: 'ENFJ는 사람들의 잠재력을 발견하고 끌어내는 능력이 탁월합니다. 이타적이며, 비전을 제시하고 사람들을 하나로 모읍니다. 뛰어난 언변과 리더십으로 주변을 영감합니다.',
    temperamentConnection: 'ENFJ는 다혈질(Sanguine)의 카리스마와 담즙질(Choleric)의 리더십이 자주 결합됩니다. Keirsey의 "이상주의자(Idealist/NF)" 그룹에 속합니다.',
    cognitiveDetail: '주기능 Fe가 사람들의 감정을 읽고 동기부여하며, 보조기능 Ni가 미래 비전을 제시합니다. 열등기능 Ti 폭주 시 냉혹한 논리의 칼날을 휘두릅니다.',
    strengths: ['탁월한 리더십', '높은 공감 능력', '뛰어난 소통', '동기부여 능력', '강한 사명감'],
    weaknesses: ['자기 희생', '비판에 과민', '타인 문제에 과잉 관여', '완벽주의', '자기 욕구 무시'],
    gripStress: '열등기능 Ti 폭주 시, "너의 감정은 비논리적"이라며 상대를 무참히 분석합니다. 공감과 따뜻함이 사라진 모습에 본인도 충격을 받습니다.',
    loveStyle: '깊고 의미 있는 관계. 파트너의 성장을 가장 중요하게 생각하며, 함께 성장하는 관계를 이상으로 여깁니다.',
    careers: ['교사/교수', '심리상담사', '정치인', 'HR 매니저', 'NGO 대표', '코치'],
    growthTips: ['자신을 돌보는 것이 이기적인 게 아닙니다', '"도와줄 수 없다"고 말하는 것도 괜찮습니다', '타인의 문제를 해결하려는 충동을 자제하세요', '혼자만의 재충전 시간을 확보하세요', 'Ti를 사용하세요 — 감정 전에 논리를 점검'],
    defaultTemp: 'SC',
  },
  ENTJ: {
    nickname: '대담한 통솔자', emoji: '👑', cognitiveStack: 'Te-Ni-Se-Fi', population: '1.8% (희귀)', group: '분석가형',
    description: 'ENTJ는 자신감 있고 결단력이 있으며, 강한 리더십을 발휘합니다. 장기적인 비전을 세워 실현하며, 도전을 두려워하지 않습니다. 높은 기준을 갖고 최선을 요구합니다.',
    temperamentConnection: 'ENTJ는 담즙질(Choleric)과 가장 강하게 연결됩니다. 둘 다 목표지향적이고, 리더십이 강하며, 결과를 중시합니다. Keirsey의 "합리주의자(Rational/NT)" 그룹에 속합니다.',
    cognitiveDetail: '주기능 Te가 외부 세계를 효율적으로 조직하고, 보조기능 Ni가 장기 전략적 비전을 제공합니다. 열등기능 Fi 폭주 시 감정적으로 완전히 무너집니다.',
    strengths: ['강력한 리더십', '전략적 사고', '높은 효율성', '자신감과 카리스마', '뛰어난 문제 해결'],
    weaknesses: ['지나친 지배욕', '감정 무감각', '인내심 부족', '타인 의견 무시', '일중독'],
    gripStress: '열등기능 Fi 폭주 시, "아무도 진심으로 나를 좋아하지 않는다"는 자기 의심에 빠집니다. 강철 같은 외면 아래 가장 연약한 내면이 드러나는 순간입니다.',
    loveStyle: '관계에서도 주도권을 원하며, 독립적이고 성장지향적 파트너를 존중합니다. 감정 표현은 서툴지만, 실질적 지원에는 아끼지 않습니다.',
    careers: ['CEO', '변호사', '경영 컨설턴트', '정치인', '투자은행가', '대학 총장'],
    growthTips: ['효율성이 전부가 아닙니다', '과정을 즐기고, 사람들의 감정에 귀 기울이세요', '약함을 보여주는 것이 진짜 강함입니다', '모든 결정을 최적화하지 않아도 됩니다', 'Fi를 개발하세요 — 감정 일기, 예술 감상'],
    defaultTemp: 'CM',
  },
};

export function TypeDetailContent({ mbtiType }: { mbtiType: string }) {
  const data = typeData[mbtiType];
  if (!data) return <p>유형 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-4">
          <CharacterAvatar mbtiType={mbtiType} temperamentCode={data.defaultTemp} size={140} className="drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">{mbtiType}</h1>
        <p className="text-xl text-indigo-600 font-semibold mt-1">{data.emoji} {data.nickname}</p>
        <div className="flex justify-center gap-3 mt-3 text-sm">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg">{data.group}</span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg">{data.cognitiveStack}</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg">인구 {data.population}</span>
        </div>
      </div>

      {/* 성격 설명 */}
      <Section icon="📖" title="성격 특성">
        <p className="text-gray-600 leading-[1.85] text-[15px]">{data.description}</p>
      </Section>

      {/* 인지기능 상세 */}
      <Section icon="🧬" title="인지기능 분석" subtitle={data.cognitiveStack}>
        <Paragraph text={data.cognitiveDetail} />
      </Section>

      {/* 기질론과의 연결 — 핵심 차별화 */}
      <Section icon="🔗" title="히포크라테스 기질론과의 연결" subtitle="MBTI만으로는 설명할 수 없는 것들">
        <Paragraph text={data.temperamentConnection} />
        <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-sm text-indigo-700">
            <strong>당신이 {mbtiType}라면?</strong> 검사를 통해 기질 조합까지 확인하면, 같은 {mbtiType} 중에서도 당신만의 고유한 패턴을 발견할 수 있습니다.
          </p>
          <Link href="/test" className="inline-block mt-2 text-sm text-indigo-600 font-medium hover:text-indigo-800">
            무료 검사 시작하기 →
          </Link>
        </div>
      </Section>

      {/* 강점/약점 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section icon="💪" title="강점">
          <ul className="space-y-2">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 shrink-0">●</span>{s}
              </li>
            ))}
          </ul>
        </Section>
        <Section icon="⚠️" title="약점">
          <ul className="space-y-2">
            {data.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                <span className="text-red-400 mt-0.5 shrink-0">●</span>{w}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* 스트레스 */}
      <Section icon="🌊" title="극도의 스트레스 시 (Grip 상태)">
        <p className="text-gray-600 leading-[1.85] text-[15px]">{data.gripStress}</p>
      </Section>

      {/* 연애 */}
      <Section icon="❤️" title="연애 스타일">
        <p className="text-gray-600 leading-[1.85] text-[15px]">{data.loveStyle}</p>
      </Section>

      {/* 커리어 */}
      <Section icon="💼" title="추천 커리어">
        <div className="flex flex-wrap gap-2">
          {data.careers.map((c, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">{c}</span>
          ))}
        </div>
      </Section>

      {/* 성장 */}
      <Section icon="🌱" title="성장 가이드">
        <ul className="space-y-3">
          {data.growthTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
              <span className="text-indigo-500 font-bold shrink-0">{i + 1}.</span>{tip}
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <p className="text-gray-600 mb-3">같은 {mbtiType}도 기질에 따라 완전히 다릅니다</p>
        <Link
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-indigo-200"
        >
          192가지 유형 검사 시작하기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// 재사용 컴포넌트
function Section({ icon, title, subtitle, children }: { icon: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><span className="text-xl">{icon}</span>{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-0.5 ml-8">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="text-gray-600 leading-[1.85] text-[15px]">{p}</p>
      ))}
    </div>
  );
}
