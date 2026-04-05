'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const message = searchParams.get('message') || '결제가 취소되었거나 오류가 발생했습니다.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <span className="text-5xl block mb-4">&#x1F6AB;</span>
        <h1 className="text-xl font-bold text-gray-800 mb-2">결제에 실패했습니다</h1>
        <p className="text-gray-500 mb-2">{message}</p>
        {code && (
          <p className="text-xs text-gray-400 mb-6">오류 코드: {code}</p>
        )}

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

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
}
