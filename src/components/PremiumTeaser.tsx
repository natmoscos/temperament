'use client';

/**
 * PremiumTeaser — shows a teaser snippet of premium content with a fade overlay
 * and a lock message pointing users to the PDF report.
 */
export default function PremiumTeaser({ content, maxChars = 80 }: { content: string; maxChars?: number }) {
  const snippet = content.length > maxChars ? content.slice(0, maxChars) : content;

  return (
    <div className="relative">
      {/* Teaser text */}
      <p className="text-gray-600 leading-[1.85] text-[15px]">{snippet}...</p>

      {/* Gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none" />

      {/* Lock message */}
      <div className="relative mt-2 pt-2">
        <div className="flex flex-col items-center gap-2 py-4 px-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/60">
          <p className="text-sm font-semibold text-amber-700 flex items-center gap-1.5">
            <span>&#x1f512;</span>
            {process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
              ? 'PDF 보고서를 구매하면 전체 내용을 확인할 수 있어요 (₩3,900)'
              : 'PDF 보고서에서 전체 내용을 확인하세요'}
          </p>
          <a
            href="#pdf-download"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('[data-pdf-download]');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="text-xs text-amber-600 hover:text-amber-800 underline underline-offset-2 transition"
          >
            {process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ? 'PDF 보고서 구매하기' : 'PDF 보고서 다운로드'} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * PremiumSection — wraps a full section (with heading) and replaces its children
 * with a teaser. Use this to wrap entire Section-like blocks that should be gated.
 */
export function PremiumSectionTeaser({
  icon,
  title,
  subtitle,
  content,
  maxChars = 80,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  content: string;
  maxChars?: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">{icon}</span>{title}
        </h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1 ml-9">{subtitle}</p>}
      </div>
      <PremiumTeaser content={content} maxChars={maxChars} />
    </div>
  );
}
