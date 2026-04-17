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
// const COUPLE_GIFT_SET: AffiliateSection = { ... };
// const HEALING_SET: AffiliateSection = { ... };
// const INVESTMENT_SET: AffiliateSection = { ... };
// const BEAUTY_SET: AffiliateSection = { ... };

// ─────────────────────────────────────────────────────
// 🎯 slug 기반 정확 매칭 (개별 글에 특정 세트 적용)
// ─────────────────────────────────────────────────────

export const POST_SPECIFIC_SECTIONS: Record<string, AffiliateSection> = {
  'mbti-study-method-guide': STUDY_EFFICIENCY_SET,
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
