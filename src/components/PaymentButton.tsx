'use client';

import { useState, useEffect } from 'react';
import { isPdfPurchased, getPurchasedOrderId, generateOrderId } from '@/lib/payment';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

interface Props {
  result: TestResult;
  profile: IntegratedProfile;
}

export default function PaymentButton({ result }: Props) {
  const [purchased, setPurchased] = useState(false);
  const [purchasedOrderId, setPurchasedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sdkAvailable, setSdkAvailable] = useState<boolean | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  useEffect(() => {
    const hasPurchased = isPdfPurchased();
    setPurchased(hasPurchased);
    if (hasPurchased) {
      setPurchasedOrderId(getPurchasedOrderId());
    }
  }, []);

  // Check if Toss SDK is available
  useEffect(() => {
    if (!clientKey) {
      setSdkAvailable(false);
      return;
    }
    import('@tosspayments/tosspayments-sdk')
      .then(() => setSdkAvailable(true))
      .catch(() => setSdkAvailable(false));
  }, [clientKey]);

  // If SDK not available or no client key
  if (sdkAvailable === false) {
    return <PaymentUnavailable result={result} />;
  }

  // Still checking SDK availability
  if (sdkAvailable === null) {
    return (
      <div data-pdf-download className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 sm:p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Already purchased — show view report button
  if (purchased) {
    return <PurchasedReportButton result={result} orderId={purchasedOrderId} />;
  }

  const handlePayment = async () => {
    setLoading(true);
    trackEvent('payment_click', { type: result.fullCode });
    try {
      const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
      const tossPayments = await loadTossPayments(clientKey!);
      const payment = tossPayments.payment({ customerKey: 'ANONYMOUS' });

      const orderId = generateOrderId();

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: 9900 },
        orderId,
        orderName: 'AI 개인화 리포트',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error?.code !== 'USER_CANCEL') {
        console.error('Payment error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-pdf-download className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 sm:p-8">
      <div className="text-center">
        <span className="text-3xl mb-3 block">🧠</span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          AI 개인화 리포트
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          Claude AI가 <strong>{result.fullCode}</strong> 유형만을 위해 작성
        </p>
        <p className="text-xs text-gray-400 mb-5">
          심층 성격 분석 · 연애 패턴 · 커리어 전략 · 성장 가이드
        </p>

        <ul className="text-xs text-gray-500 space-y-1 mb-5 text-left max-w-xs mx-auto">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            {result.fullCode} 조합에만 해당하는 맞춤 분석
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            핵심 강점 5가지 + 놓치기 쉬운 맹점 4가지
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            연애 스타일 · 커리어 전략 · 스트레스 회복법
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            오늘 바로 실천할 5가지 성장 팁
          </li>
        </ul>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-wait'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-indigo-200'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              결제 진행 중...
            </>
          ) : (
            <>
              <span>✨</span>
              AI 리포트 받기
              <span className="text-indigo-200 font-normal">₩9,900</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 mt-3">
          카드, 카카오페이, 토스 결제 가능
        </p>
      </div>
    </div>
  );
}

function PurchasedReportButton({ result, orderId }: { result: TestResult; orderId: string | null }) {
  return (
    <div data-pdf-download className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 sm:p-8">
      <div className="text-center">
        <span className="text-3xl mb-3 block">✅</span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          AI 리포트 구매 완료
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          {result.fullCode} 유형 맞춤 AI 리포트를 확인하세요
        </p>

        {orderId ? (
          <Link
            href={`/report/${orderId}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-green-200"
          >
            <span>📋</span>
            AI 리포트 보기
          </Link>
        ) : (
          <p className="text-sm text-gray-400">
            주문번호를 찾을 수 없습니다. 결제 완료 후 받은 페이지 URL을 확인해주세요.
          </p>
        )}
      </div>
    </div>
  );
}

function PaymentUnavailable({ result }: { result: TestResult }) {
  return (
    <div data-pdf-download className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
      <div className="text-center">
        <span className="text-3xl mb-3 block">🧠</span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">AI 개인화 리포트</h3>
        <p className="text-sm text-gray-500 mb-1">
          <strong>{result.fullCode}</strong> 유형 맞춤 분석
        </p>
        <p className="text-xs text-gray-400 mt-2">결제 시스템을 불러오지 못했습니다.</p>
        <p className="text-xs text-gray-400">페이지를 새로고침하거나 PC에서 접속해주세요.</p>
      </div>
    </div>
  );
}
