'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { setPdfPurchased } from '@/lib/payment';
import type { TestResult } from '@/data/types';
import type { IntegratedProfile } from '@/data/profiles-integrated';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [profile, setProfile] = useState<IntegratedProfile | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  // Load test result from localStorage
  useEffect(() => {
    async function loadResult() {
      try {
        const saved = localStorage.getItem('temperament-test-answers');
        if (saved) {
          const { questions } = await import('@/data/questions');
          const { calculateResult } = await import('@/data/scoring');
          const { generateIntegratedProfile } = await import('@/data/profiles-integrated');
          const answers = JSON.parse(saved);
          if (answers.length === questions.length) {
            const r = calculateResult(answers);
            setResult(r);
            setProfile(generateIntegratedProfile(r.mbti, r.temperament));
          }
        }
      } catch {
        // Result loading is non-critical for payment confirmation
      }
    }
    loadResult();
  }, []);

  // Confirm payment with server
  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (!paymentKey || !orderId || !amount) {
      setStatus('error');
      setErrorMsg('결제 정보가 올바르지 않습니다.');
      return;
    }

    async function confirmPayment() {
      try {
        const res = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setPdfPurchased(data.orderId || orderId!);
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMsg(data.error || '결제 확인에 실패했습니다.');
        }
      } catch {
        setStatus('error');
        setErrorMsg('서버 연결에 실패했습니다.');
      }
    }

    confirmPayment();
  }, [searchParams]);

  const handleDownload = async () => {
    if (!result || !profile) return;
    setDownloading(true);
    try {
      const { generatePremiumPDF } = await import('@/lib/generate-pdf');
      await generatePremiumPDF(result, profile);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3000);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setDownloading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <span className="text-5xl block mb-4">&#x274C;</span>
          <h1 className="text-xl font-bold text-gray-800 mb-2">결제 확인 실패</h1>
          <p className="text-gray-500 mb-6">{errorMsg}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/result"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              다시 시도
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
            >
              홈으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <span className="text-5xl block mb-4">&#x2705;</span>
        <h1 className="text-xl font-bold text-gray-800 mb-2">결제가 완료되었습니다!</h1>
        <p className="text-gray-500 mb-6">
          프리미엄 PDF 보고서를 다운로드할 수 있습니다.
        </p>

        {result && profile ? (
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg mb-4 ${
              downloadDone
                ? 'bg-green-500 text-white shadow-green-200'
                : downloading
                ? 'bg-gray-300 text-gray-500 cursor-wait'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-green-200'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                PDF 생성 중...
              </>
            ) : downloadDone ? (
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
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            검사 결과를 찾을 수 없습니다. 결과 페이지에서 다운로드해주세요.
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Link
            href="/result"
            className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          >
            결과 페이지로 돌아가기
          </Link>
        </div>

        <p className="text-[10px] text-gray-400 mt-4">
          30일간 결과 페이지에서도 PDF를 다운로드할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
