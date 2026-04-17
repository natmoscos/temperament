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

// 🧰 향후 추가될 세트들이 여기 차례대로 들어옴
// const CAREER_SELF_GROWTH_SET: AffiliateSection = { ... };
// const HEALING_SET: AffiliateSection = { ... };
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

export const CATEGORY_DEFAULT_SECTIONS: Record<Category, AffiliateSection | null> = {
  guide: null,
  career: null,
  compatibility: null,
  psychology: null,
  'mbti-economics': null,
  mbti: null,
  temperament: null,
  science: null,
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
