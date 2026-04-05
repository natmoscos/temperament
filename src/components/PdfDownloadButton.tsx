'use client';

import { useState, useEffect } from 'react';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';
import { trackEvent } from '@/lib/analytics';

interface Props {
  result: TestResult;
  profile: IntegratedProfile;
}

export default function PdfDownloadButton({ result, profile }: Props) {
  const isPaymentConfigured = !!process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  // If payment is configured, render PaymentButton instead
  if (isPaymentConfigured) {
    return <DynamicPaymentButton result={result} profile={profile} />;
  }

  // Otherwise, show the free download button
  return <FreePdfDownloadButton result={result} profile={profile} />;
}

/** Dynamically loads PaymentButton to avoid bundling Toss SDK when not needed */
function DynamicPaymentButton({ result, profile }: Props) {
  const [PaymentBtn, setPaymentBtn] = useState<React.ComponentType<Props> | null>(null);

  useEffect(() => {
    import('@/components/PaymentButton').then((mod) => {
      setPaymentBtn(() => mod.default);
    }).catch(() => {
      // If PaymentButton fails to load, will render nothing (free button shown as fallback inside PaymentButton)
    });
  }, []);

  if (!PaymentBtn) {
    // Show a placeholder while loading
    return (
      <div data-pdf-download className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 sm:p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return <PaymentBtn result={result} profile={profile} />;
}

/** Original free PDF download button */
function FreePdfDownloadButton({ result, profile }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    trackEvent('pdf_download_click', { type: result.fullCode });
    try {
      const { generatePremiumPDF } = await import('@/lib/generate-pdf');
      await generatePremiumPDF(result, profile);
      trackEvent('pdf_download_success', { type: result.fullCode });
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-pdf-download className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8">
      <div className="text-center">
        <span className="text-3xl mb-3 block">📄</span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          프리미엄 PDF 보고서
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          {result.fullCode} 유형의 모든 분석을 한 파일에
        </p>
        <p className="text-xs text-gray-400 mb-5">
          성격 심층 분석 · 연애 · 커리어 · 스트레스 · 과학적 근거
        </p>

        <ul className="text-xs text-gray-500 space-y-1 mb-5 text-left max-w-xs mx-auto">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            A4 다페이지 보고서 (10~15쪽)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            MBTI + 기질 성향 분석 차트
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            연애 궁합 · 커리어 전략 · 성장 가이드
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            인쇄 가능한 고품질 PDF
          </li>
        </ul>

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg ${
            done
              ? 'bg-green-500 text-white shadow-green-200'
              : loading
              ? 'bg-gray-300 text-gray-500 cursor-wait'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-amber-200'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              PDF 생성 중...
            </>
          ) : done ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              다운로드 완료!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF 보고서 다운로드
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 mt-3">
          회원가입 불필요 · 즉시 다운로드
        </p>
      </div>
    </div>
  );
}
