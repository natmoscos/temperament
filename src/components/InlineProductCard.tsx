// 블로그 본문 섹션 사이에 인라인으로 노출되는 제휴 제품 카드.
//
// 설계 원칙:
// - 독자 스크롤 흐름 중간에 배치해 클릭율 최적화 (끝 노출 대비 3~5배 전환 차이 연구 결과).
// - 가로형 레이아웃 (데스크톱): 이모지 아이콘 | 제품 정보 | CTA 버튼
// - 모바일 세로 스택 (500px 이하).
// - 고지 문구는 검정색 — 공정위 가이드 + 사용자 가독성 요구.
// - 카드 한 장당 고지 문구 1개 포함 (여러 카드가 있을 때 반복되어도 법적 안전).

import type { AffiliateProduct } from '@/data/blog-posts';
import {
  AFFILIATE_PERSONAS,
  PLATFORMS,
  buildDisclosureText,
} from '@/data/affiliate-personas';

interface Props {
  product: AffiliateProduct;
  personaId?: 'lee-junhyung' | 'park-seoyeon';
}

export default function InlineProductCard({
  product,
  personaId = 'lee-junhyung',
}: Props) {
  const persona = AFFILIATE_PERSONAS[personaId];
  const platform = PLATFORMS[product.platform];
  const disclosure = buildDisclosureText([product.platform]);

  return (
    <div className="my-8">
      <a
        href={product.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg"
        style={{
          borderColor: platform.brandColor,
          backgroundColor: '#ffffff',
        }}
      >
        {/* 상단 플랫폼 배지 + 카테고리 */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: platform.brandBg }}
        >
          <span
            className="text-[12px] font-black tracking-wide"
            style={{ color: platform.brandColor }}
          >
            {platform.shortName} · {product.category}
          </span>
          <span
            className="text-[11px] font-bold tracking-widest"
            style={{ color: platform.brandColor, opacity: 0.7 }}
          >
            PRODUCT PICK
          </span>
        </div>

        {/* 카드 본체 — 가로 레이아웃 (모바일 세로) */}
        <div className="flex flex-col sm:flex-row">
          {/* 좌측 대형 이모지 */}
          <div
            className="flex items-center justify-center py-6 sm:py-0 sm:w-36 sm:min-h-[180px] shrink-0"
            style={{ backgroundColor: `${platform.brandColor}10` }}
          >
            <span className="text-6xl sm:text-7xl" aria-hidden>
              {product.categoryIcon}
            </span>
          </div>

          {/* 중앙 정보 영역 */}
          <div className="flex-1 p-5 sm:p-6">
            {/* 제품명 */}
            <h4 className="text-[17px] sm:text-[18px] font-black text-gray-900 leading-snug mb-1">
              {product.title}
            </h4>
            {product.brand && (
              <p className="text-[13px] font-semibold text-gray-500 mb-3">
                {product.brand}
              </p>
            )}

            {/* 페르소나 멘트 */}
            {product.personaComment && (
              <p
                className="text-[14px] leading-relaxed text-gray-700 border-l-4 pl-3 mb-4"
                style={{ borderColor: platform.brandColor }}
              >
                <span className="italic">{product.personaComment}</span>
                <span className="block mt-2 text-[12px] font-bold text-gray-600 not-italic">
                  — {persona.name} ({persona.mbti}, {persona.role})
                </span>
              </p>
            )}

            {/* CTA 버튼 */}
            <div
              className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 text-[14px] font-black text-white transition-all group-hover:brightness-110 w-full sm:w-auto"
              style={{ backgroundColor: platform.brandColor }}
            >
              {platform.ctaText} →
            </div>
          </div>
        </div>
      </a>

      {/* 고지 문구 — 검정색으로 가독성 확보 */}
      <p className="mt-2.5 text-[12px] leading-relaxed text-black font-medium px-1">
        {disclosure}
      </p>
    </div>
  );
}
