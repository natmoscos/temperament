// 제휴 PICK 섹션 자동 매칭 시스템
//
// 3단계 폴백 우선순위 (위에서부터 적용):
//   1. 글이 개별 지정한 `affiliateSection` (가장 세밀)
//   2. `POST_SPECIFIC_SECTIONS` — slug 기반 정확 매칭
//   3. `CATEGORY_DEFAULT_SECTIONS` — 카테고리 기본값 (가장 포괄적)
//   4. 아무것도 없으면 `undefined` → 섹션 렌더 안 됨
//
// 링크가 준비된 것만 채우고, 나머지는 `null`로 두면 자동 비활성.

import type { AffiliateSection, BlogPost } from './blog-posts';

type Category = BlogPost['category'];

// ─────────────────────────────────────────────────────
// 🎁 재사용 가능한 PICK 세트 (여러 글에 같은 세트 적용 가능)
// ─────────────────────────────────────────────────────

const STUDY_EFFICIENCY_SET: AffiliateSection = {
  title: '공부 효율 세트 — 16유형 공용',
  personaId: 'lee-junhyung',
  intro:
    '결론부터. 공부법은 유형마다 다르지만, 이 3가지는 16유형 누구한테나 본전 이상이에요. 제가 증권사 입사 후 12년간 책상에 올려뒀던 기본 세트입니다. 서연이도 입사 3개월차에 똑같이 추천했고, 1년 빨리 승진했죠.',
  targetTypes: ['INTJ', 'ISTJ', 'INTP', 'ENTJ', 'INFJ', 'ISFJ', 'ENFP', 'ESFP'],
  products: [
    {
      platform: 'coupang',
      category: '공부법 책',
      categoryIcon: '📚',
      title: '메타인지 학습법',
      brand: '베스트셀러 공부법 서적',
      url: 'https://link.coupang.com/a/eq25nO',
      personaComment:
        '"공부법의 본질은 내가 뭘 모르는지 아는 것." 후배 30명에게 권했던 책입니다. 초반 이론은 잠깐 지루해도 실전 챕터가 본전을 찾아줘요.',
    },
    {
      platform: 'coupang',
      category: '독서대',
      categoryIcon: '📖',
      title: '스틸리 알루미늄 접이식 독서대',
      brand: '각도·높이 조절 · 투명 디자인',
      url: 'https://link.coupang.com/a/eq26DH',
      personaComment:
        '제 책상에 10년째 올려둔 모델의 최신 버전입니다. 알루미늄이라 가볍고, 높이·각도 모두 조절돼서 목·허리 피로가 절반으로 줄어요.',
    },
    {
      platform: 'coupang',
      category: '스터디 플래너',
      categoryIcon: '📓',
      title: '모트모트 텐미닛 플래너',
      brand: '10분 단위 시간 관리 · 국민 플래너',
      url: 'https://link.coupang.com/a/eq28V7',
      personaComment:
        '매년 1월 새로 사는 관례. 저는 13권째 쓰는 중이에요. 10분 단위로 쪼개는 방식이 ISTJ·INTJ의 꾸준 공부 DNA에 완벽히 맞습니다.',
    },
  ],
};

// ─────────────────────────────────────────────────────
// 🌱 성장 루틴 세트 (범용) — 책·독서대·플래너
// ─────────────────────────────────────────────────────
// STUDY_EFFICIENCY_SET과 제품은 동일하나 intro를 더 포괄적으로 재작성하여
// career·guide·mbti·mbti-economics·science·temperament 카테고리 전역에 적용.
const GROWTH_ROUTINE_SET: AffiliateSection = {
  title: '성장 루틴 세트 — 16유형 공용',
  personaId: 'lee-junhyung',
  intro:
    '결론부터 말하자면, 성격 유형이 무엇이든 "꾸준함"은 공통 언어입니다. 제가 12년간 증권사 책상에 둔 이 3가지는 INTJ든 ENFP든 결과를 만들어낸 기본기예요. 서연이(ENFP)가 입사 3개월차에 똑같이 셋업해서 1년 빨리 승진했고, 저희 팀 신입들 중 1년 뒤 살아남는 사람들 자리엔 공통으로 이 셋이 놓여 있습니다.',
  targetTypes: [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ],
  products: [
    {
      platform: 'coupang',
      category: '자기계발 책',
      categoryIcon: '📚',
      title: '메타인지 학습법',
      brand: '베스트셀러 · 성격 유형 무관 공용',
      url: 'https://link.coupang.com/a/eq25nO',
      personaComment:
        '"내가 뭘 모르는지 아는 것"이 성장의 출발선이라는 책. 직장에서도, 공부에서도, 관계에서도 같은 원리가 작동합니다. 후배 30명에게 권했고 반응 일관적으로 좋았어요.',
    },
    {
      platform: 'coupang',
      category: '독서대',
      categoryIcon: '📖',
      title: '스틸리 알루미늄 접이식 독서대',
      brand: '각도·높이 조절 · 재택·출퇴근 겸용',
      url: 'https://link.coupang.com/a/eq26DH',
      personaComment:
        '제 책상에 10년째 있는 모델의 최신 버전. 책이든 노트북이든 올라가서 목·허리 피로가 절반으로 줄어요. 집중력 유지는 결국 자세에서 옵니다.',
    },
    {
      platform: 'coupang',
      category: '플래너',
      categoryIcon: '📓',
      title: '모트모트 텐미닛 플래너',
      brand: '10분 단위 시간 관리 · 국민 플래너',
      url: 'https://link.coupang.com/a/eq28V7',
      personaComment:
        '13권째 쓰는 중입니다. 10분 단위로 쪼개는 방식이 꾸준함에 약한 유형(ENFP·ENTP·ESFP)에게 특히 효과 좋고, 계획형 유형(ISTJ·ESTJ)에겐 본능 확장입니다.',
    },
  ],
};

// ─────────────────────────────────────────────────────
// 💝 선물·관계 큐레이션 세트 (범용) — 연애·관계 카테고리용
// ─────────────────────────────────────────────────────
const RELATIONSHIP_GIFT_SET: AffiliateSection = {
  title: '관계를 깊게 만드는 선물 — 실패 없는 공식',
  personaId: 'lee-junhyung',
  intro:
    '결론부터. 관계를 오래 유지하는 선물은 "화려함"이 아니라 "매일 떠오르게 하는 것"입니다. 제가 12년간 아내(ISTJ)에게 실제 선물해 본 것 중, 반응이 가장 오래 간 4가지만 골랐어요. 성격 유형과 기질 조합에 관계없이 "매일 손이 가는" 공통 조건을 만족합니다.',
  targetTypes: [
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISFJ', 'ISFP', 'ESFJ', 'ESFP',
    'ISTJ', 'ESTJ',
  ],
  products: [
    {
      platform: 'coupang',
      category: '텀블러',
      categoryIcon: '🥤',
      title: '스탠리 퀜처 텀블러',
      brand: '각인 가능 · 10년 내구성',
      url: 'https://link.coupang.com/a/eq4d2F',
      personaComment:
        '아내가 3년째 매일 쓰고 있는 모델. 각인 서비스 추가하면 관계 안정성 유형(ISTJ·ISFJ)에게 특히 효과가 오래 갑니다. "검증된 브랜드 + 각인" 조합이 핵심.',
    },
    {
      platform: 'coupang',
      category: '주얼리',
      categoryIcon: '💎',
      title: '이름 각인 실버 목걸이',
      brand: '이니셜·기념일 각인 서비스',
      url: 'https://link.coupang.com/a/eq4eVu',
      personaComment:
        '10년 뒤에도 차고 있을 선물. 화려하지 않은 심플한 디자인이 관계 심화형 유형(INFJ·ISFJ·ISFP)에게 닿습니다. 한 번 받은 사람은 오래 기억해요.',
    },
    {
      platform: 'coupang',
      category: '홈카페',
      categoryIcon: '🕯',
      title: '양키캔들 시그니처 세트',
      brand: '20년 스테디셀러 · 장시간 연소',
      url: 'https://link.coupang.com/a/eq4fK8',
      personaComment:
        '단가는 낮은데 매일 불을 켤 때마다 준 사람이 떠오르는 제품. 감성 유형(INFP·ISFP·ENFP)에게 반응이 가장 큽니다. 공간 분위기로 사람을 기억하는 장치.',
    },
    {
      platform: 'oliveyoung',
      category: '스킨케어',
      categoryIcon: '🧴',
      title: '록시땅 시어 버터 핸드크림 30ml',
      brand: '25년 스테디셀러 · 검증된 프리미엄',
      url: 'https://oy.run/sk7FaLoOdU92i6',
      personaComment:
        '매일 여러 번 바르면서 매번 준 사람이 떠오르는 선물. 브랜드 신뢰도·내구성·실용성 모두 만점. 서연도 2년째 같은 제품을 재구매 중입니다.',
    },
  ],
};

// 🧰 향후 추가될 세트들이 여기 차례대로 들어옴
// const INVESTMENT_SET: AffiliateSection = { ... };
// const BEAUTY_SET: AffiliateSection = { ... };

const ISTJ_GIRLFRIEND_GIFT_SET: AffiliateSection = {
  title: 'ISTJ 여친 선물 BEST 5 — 실패 없는 공식',
  personaId: 'lee-junhyung',
  intro:
    '결론부터. ISTJ 여자는 "10년 쓸 물건을 주는 사람"을 10년 기억합니다. 제가 제 아내(ISTJ)에게 12년간 실제 선물해본 것 중 반응이 가장 좋았던 5가지만 추렸어요. 실용성 60% + 감성 40% 황금 비율로.',
  targetTypes: ['ISTJ'],
  products: [
    {
      platform: 'coupang',
      category: '텀블러',
      categoryIcon: '🥤',
      title: '스탠리 퀜처 텀블러',
      brand: '각인 가능 · 10년 내구성',
      url: 'https://link.coupang.com/a/eq4d2F',
      personaComment:
        '제 아내가 3년째 매일 쓰고 있는 모델. 각인 서비스 추가하면 ISTJ 여자친구 심장 직격입니다. "검증된 브랜드 + 각인"은 ISTJ의 Si 주기능 정면 저격이에요.',
    },
    {
      platform: 'coupang',
      category: '주얼리',
      categoryIcon: '💎',
      title: '이름 각인 실버 목걸이',
      brand: '이니셜·기념일 각인 서비스',
      url: 'https://link.coupang.com/a/eq4eVu',
      personaComment:
        '10년 뒤에도 차고 있을 선물. ISTJ는 한 번 맺은 관계·물건과 오래 가는 본능이 강해요. 화려하지 않은 심플한 디자인이 핵심입니다.',
    },
    {
      platform: 'coupang',
      category: '홈카페',
      categoryIcon: '🕯',
      title: '양키캔들 시그니처 세트',
      brand: '20년 스테디셀러 · 장시간 연소',
      url: 'https://link.coupang.com/a/eq4fK8',
      personaComment:
        '캔들은 단가는 낮은데 매일 킬 때마다 떠오르는 제품입니다. 공간 관리·루틴을 중시하는 ISTJ가 조용히 감동하는 선물이에요.',
    },
    {
      platform: 'oliveyoung',
      category: '향수',
      categoryIcon: '🌸',
      title: '아뜰리에페이 퍼퓸 마이 스킨 벗 베러 30ml',
      brand: '본인이 절대 안 사는 고급 니치 향수',
      url: 'https://oy.run/jWQ1FZvnMNvzH0',
      personaComment:
        '본인이 직접 사기엔 부담스러운 5만원대 니치 향수가 가장 기억에 남아요. ISTJ는 시그니처 향을 오래 쓰는 성향이라 한 번 손에 들어가면 평생 리필합니다.',
    },
    {
      platform: 'oliveyoung',
      category: '스킨케어',
      categoryIcon: '🧴',
      title: '록시땅 시어 버터 핸드크림 30ml (카리테 콩포르)',
      brand: '25년 스테디셀러 · 검증된 프리미엄',
      url: 'https://oy.run/sk7FaLoOdU92i6',
      personaComment:
        '매일 여러 번 바르면서 매번 준 사람이 떠오르는 선물. 브랜드 신뢰도·내구성·실용성 모두 만점. 박서연도 2년째 같은 제품 재구매 중입니다.',
    },
  ],
};

// ─────────────────────────────────────────────────────
// 🎯 slug 기반 정확 매칭 (개별 글에 특정 세트 적용)
// ─────────────────────────────────────────────────────

export const POST_SPECIFIC_SECTIONS: Record<string, AffiliateSection> = {
  'mbti-study-method-guide': STUDY_EFFICIENCY_SET,
  // istj-girlfriend-gift-guide-2026은 인라인 배치로 전환 — 각 섹션 inlineProducts 사용.
  // 링크 준비되는 대로 추가:
  // 'mbti-diet-success-formula': DIET_FITNESS_SET,
  // 'mbti-career-success-ranking': CAREER_SELF_GROWTH_SET,
  // 'mbti-investment-dna-guide': INVESTMENT_SET,
  // 'mbti-burnout-ranking': HEALING_SET,
};

// ─────────────────────────────────────────────────────
// 🗂 카테고리 기본값 (포괄적 폴백)
// ─────────────────────────────────────────────────────
//
// 같은 카테고리의 "매핑 안 된 모든 글"에 자동 적용됨.
// 현재는 전부 null — slug 기반 매칭만 사용.
// 카테고리별 범용 세트 준비되면 null → 세트로 교체하면 즉시 전체 글 자동 적용.

// 카테고리 매핑 원칙:
//   - career / guide / mbti-economics / science → 성장 루틴 (공부·자기계발)
//   - compatibility / psychology → 선물·관계 큐레이션
//   - mbti / temperament → 성장 루틴 (기본 유형 이해 후 다음 단계 = 성장)
export const CATEGORY_DEFAULT_SECTIONS: Record<Category, AffiliateSection | null> = {
  guide: GROWTH_ROUTINE_SET,
  career: GROWTH_ROUTINE_SET,
  compatibility: RELATIONSHIP_GIFT_SET,
  psychology: RELATIONSHIP_GIFT_SET,
  'mbti-economics': GROWTH_ROUTINE_SET,
  mbti: GROWTH_ROUTINE_SET,
  temperament: GROWTH_ROUTINE_SET,
  science: GROWTH_ROUTINE_SET,
};

// ─────────────────────────────────────────────────────
// 🔧 폴백 리졸버
// ─────────────────────────────────────────────────────

export function resolveAffiliateSection(
  post: Pick<BlogPost, 'slug' | 'category' | 'affiliateSection'>,
): AffiliateSection | undefined {
  // 1. 글 자체가 지정한 섹션 최우선
  if (post.affiliateSection) return post.affiliateSection;

  // 2. slug 기반 정확 매칭
  const slugSpecific = POST_SPECIFIC_SECTIONS[post.slug];
  if (slugSpecific) return slugSpecific;

  // 3. 카테고리 기본값
  const categoryDefault = CATEGORY_DEFAULT_SECTIONS[post.category];
  return categoryDefault ?? undefined;
}
