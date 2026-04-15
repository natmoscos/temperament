'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { setPdfPurchased } from '@/lib/payment';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

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
      // Read type info from localStorage
      let fullCode: string | undefined;
      let mbtiType: string | undefined;
      let temperamentCode: string | undefined;

      try {
        const saved = localStorage.getItem('temperament-test-result');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.fullCode) {
            fullCode = parsed.fullCode;
            const parts = parsed.fullCode.split('-');
            mbtiType = parts[0];
            temperamentCode = parts[1];
          }
        }
      } catch {
        // Non-critical — payment can still confirm without type info
      }

      try {
        const res = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
            fullCode,
            mbtiType,
            temperamentCode,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setPdfPurchased(data.orderId || orderId!);
          setStatus('success');
          // Redirect to AI report page
          router.push(`/report/${data.orderId || orderId}`);
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
  }, [searchParams, router]);

  if (status === 'loading' || status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-xl">✨</div>
          </div>
          <p className="text-gray-700 font-semibold">결제를 확인하고 있습니다...</p>
          <p className="text-sm text-gray-400 mt-1">AI 리포트 페이지로 이동합니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <span className="text-5xl block mb-4">⚠️</span>
        <h1 className="text-xl font-bold text-gray-800 mb-2">결제 확인 실패</h1>
        <p className="text-gray-500 mb-2">{errorMsg}</p>
        <p className="text-xs text-gray-400 mb-6">
          결제가 완료되었다면 잠시 후 다시 시도해주세요.<br />
          문제가 지속되면 zx.mocz@gmail.com으로 문의해주세요.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            다시 시도
          </button>
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
