'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'result-save-reminder-dismissed';

export default function ResultSaveReminder() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!wasDismissed) setDismissed(false);
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const handleScrollToPdf = () => {
    const el = document.querySelector('[data-pdf-download]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="relative bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 sm:px-5 sm:py-4 flex items-start gap-3">
      <span className="text-xl shrink-0 mt-0.5">💾</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">검사 결과는 브라우저에만 저장됩니다</p>
        <p className="text-xs text-amber-600 mt-0.5">브라우저 데이터를 삭제하면 결과가 사라져요. PDF 보고서로 영구 보관하세요.</p>
        <button
          onClick={handleScrollToPdf}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg px-3 py-1.5 transition"
        >
          PDF로 저장하기 →
        </button>
      </div>
      <button
        onClick={handleDismiss}
        className="shrink-0 text-amber-400 hover:text-amber-600 transition p-0.5"
        aria-label="닫기"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
