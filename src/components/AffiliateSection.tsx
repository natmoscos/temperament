// 블로그 글 하단에 노출되는 제휴 제품 섹션 컴포넌트.
// 페르소나(이준형 등) 인사말 + 제품 카드 N개 + 고지 문구로 구성된다.
//
// 카드 디자인 원칙:
// - 제품 이미지 없이 "카테고리 이모지 + 타이포그래피" 중심.
//   쿠팡 이미지 URL은 만료/CORS 이슈가 있어 초기엔 외부 이미지 의존을 피한다.
// - 모바일 세로 스크롤, 태블릿 이상 가로 3열 그리드.
// - 플랫폼 컬러로 CTA 버튼 브랜딩.

import type { AffiliateSection } from '@/data/blog-posts';
import {
  AFFILIATE_PERSONAS,
  PLATFORMS,
  buildDisclosureText,
} from '@/data/affiliate-personas';

interface Props {
  section: AffiliateSection;
}

export default function AffiliateSectionBlock({ section }: Props) {
  const persona = AFFILIATE_PERSONAS[section.personaId];
  if (!persona) return null;

  // 섹션에 등장하는 플랫폼들을 수집해 고지 문구 자동 생성
  const platforms = section.products.map((p) => p.platform);
  const disclosure = buildDisclosureText(platforms);

  return (
    <section
      className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7"
      aria-label="추천 제품 섹션"
    >
      {/* 섹션 헤더 (페르소나 프로필) */}
      <header className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
        <div
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${persona.avatarColor}15` }}
          aria-hidden
        >
          {persona.avatarEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-bold tracking-wide" style={{ color: persona.avatarColor }}>
              {section.title}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-snug mb-1">
            {persona.name}의 PICK
          </h3>
          <p className="text-xs font-semibold text-gray-500">
            {persona.tagline}
          </p>
        </div>
      </header>

      {/* 페르소나 도입 멘트 */}
      {section.intro && (
        <div
          className="rounded-xl p-4 mb-6 text-[14px] leading-relaxed text-gray-700"
          style={{ backgroundColor: `${persona.avatarColor}08` }}
        >
          <span className="text-gray-400 mr-1">“</span>
          {section.intro}
          <span className="text-gray-400 ml-1">”</span>
          <span className="block mt-2 text-[12px] font-semibold text-gray-500">
            — {persona.name} ({persona.mbti}, {persona.role})
          </span>
        </div>
      )}

      {/* 제품 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.products.map((product, idx) => {
          const platform = PLATFORMS[product.platform];
          return (
            <a
              key={idx}
              href={product.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all"
            >
              {/* 카드 상단: 카테고리 이모지 + 라벨 */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-md tracking-wide"
                  style={{
                    color: platform.brandColor,
                    backgroundColor: platform.brandBg,
                  }}
                >
                  {platform.shortName}
                </span>
                <span className="text-[11px] font-semibold text-gray-400">
                  #{idx + 1}
                </span>
              </div>

              <div className="text-5xl mb-3 text-center" aria-hidden>
                {product.categoryIcon}
              </div>

              <div className="text-center text-[11px] font-bold text-gray-400 tracking-widest mb-2">
                {product.category.toUpperCase()}
              </div>

              {/* 제품명 */}
              <h4 className="text-[15px] font-bold text-gray-900 leading-snug mb-1 line-clamp-2 min-h-[40px]">
                {product.title}
              </h4>
              {product.brand && (
                <p className="text-[12px] font-semibold text-gray-500 mb-3">
                  {product.brand}
                </p>
              )}

              {/* 가격 */}
              {product.price && (
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="text-lg font-black text-gray-900">
                    {product.price}
                  </div>
                  {product.priceNote && (
                    <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                      {product.priceNote}
                    </div>
                  )}
                </div>
              )}

              {/* 페르소나 멘트 */}
              {product.personaComment && (
                <p className="mt-3 text-[12px] text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-3">
                  {product.personaComment}
                </p>
              )}

              {/* CTA 버튼 */}
              <div
                className="mt-4 rounded-xl py-3 text-center text-[13px] font-bold text-white transition-colors group-hover:brightness-110"
                style={{ backgroundColor: platform.brandColor }}
              >
                {platform.ctaText} →
              </div>
            </a>
          );
        })}
      </div>

      {/* 고지 문구 (플랫폼별 자동 생성) — 검정색으로 가독성 확보 */}
      <p className="mt-6 text-[12px] text-black font-medium leading-relaxed bg-gray-50 border border-gray-200 rounded-lg p-3">
        {disclosure}
      </p>
    </section>
  );
}
