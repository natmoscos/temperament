'use client';

import { useState, useEffect } from 'react';

interface ResultCountdownProps {
  onComplete: () => void;
}

const suspenseTexts = [
  '192가지 중 당신의 유형은...',
  '기질 분석 완료...',
  '결과를 공개합니다!',
];

export default function ResultCountdown({ onComplete }: ResultCountdownProps) {
  const [count, setCount] = useState(3);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
      setTextIndex((prev) => Math.min(prev + 1, suspenseTexts.length - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 px-4">
      <div className="text-center">
        {/* 카운트다운 숫자 */}
        <div className="relative mb-6">
          <span
            key={count}
            className="inline-block text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500 animate-countPulse"
          >
            {count}
          </span>
        </div>

        {/* 서스펜스 텍스트 */}
        <p
          key={textIndex}
          className="text-lg sm:text-xl text-indigo-200 font-medium animate-fadeIn"
        >
          {suspenseTexts[textIndex]}
        </p>

        {/* 로딩 바 */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-purple-400 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((3 - count) / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
