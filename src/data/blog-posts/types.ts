// SEO 블로그 콘텐츠 데이터
// 각 글은 고트래픽 검색 키워드를 타겟팅

import type { AffiliatePlatform } from '../affiliate-personas';

// ── 제휴 제품 카드 데이터 ────────────────────────────
export interface AffiliateProduct {
  platform: AffiliatePlatform;   // 'coupang' | 'oliveyoung' | 'toss'
  category: string;              // "공부법 책", "독서대", "플래너" 등
  categoryIcon: string;          // 큰 이모지 (카드 상단 표시)
  title: string;                 // 제품 정식명
  brand?: string;                // 저자·브랜드 (선택)
  price?: string;                // "14,400원" 등 (선택)
  priceNote?: string;            // "★ 쿠팡 로켓배송" 등 (선택)
  url: string;                   // 파트너스 추적 링크
  personaComment: string;        // 페르소나의 추천 한마디
  /** 자체 호스팅 제품 이미지 경로 (예: "/blog/products/perfume.webp"). 없으면 이모지로 폴백. */
  imageUrl?: string;
}

// ── 제휴 섹션 블록 ────────────────────────────────
export interface AffiliateSection {
  title: string;                 // 예: "이준형의 PICK — 공부 효율 세트"
  personaId: 'lee-junhyung' | 'park-seoyeon';
  intro: string;                 // 섹션 도입 멘트 (페르소나 목소리)
  products: AffiliateProduct[];  // 제품 카드 (권장 3개)
  targetTypes?: string[];        // 대상 유형 (예: ['INTJ', 'INTP'])
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;       // meta description
  keywords: string[];         // SEO 키워드
  category: 'mbti' | 'temperament' | 'compatibility' | 'career' | 'guide' | 'science' | 'psychology' | 'mbti-economics';
  publishDate: string;
  thumbnail?: string;  // optional thumbnail image path (e.g., '/blog/socrates-mbti.jpg')
  sections: {
    heading: string;
    content: string;
    image?: string;
    /**
     * 이 섹션 본문 직후에 인라인으로 노출할 제휴 제품 카드.
     * 독자 스크롤 흐름 중간에 전환 기회를 배치해 클릭율을 높인다.
     * 각 제품 카드마다 고지 문구가 자동 포함된다.
     */
    inlineProducts?: AffiliateProduct[];
  }[];
  relatedTypes?: string[];    // 관련 MBTI 유형
  /** 글 하단 "전체 PICK" 섹션 (선택) — 요약 추천이 필요한 경우만. */
  affiliateSection?: AffiliateSection;
}
