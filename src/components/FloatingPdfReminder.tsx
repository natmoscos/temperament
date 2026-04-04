'use client';

import { useState, useEffect } from 'react';

export default function FloatingPdfReminder() {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const pdfEl = document.querySelector('[data-pdf-download]');
      if (pdfEl) setVisible(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || clicked) return null;

  const handleClick = () => {
    const el = document.querySelector('[data-pdf-download]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setClicked(true);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce-once"
    >
      <span>📄</span> PDF 저장
    </button>
  );
}
