'use client';

import { useState, useEffect, useRef } from 'react';

// 도시 + 유형 조합 (자연스러운 분포)
const cities = ['서울', '부산', '인천', '대구', '대전', '광주', '수원', '성남', '제주', '울산', '창원', '고양', '용인', '청주', '전주', '천안', '안산', '김포'];
const mbtiTypes = ['ENFP', 'INFJ', 'ENFJ', 'INTJ', 'ENTP', 'INFP', 'ISTJ', 'ESFJ', 'ISTP', 'ISFJ', 'ENTJ', 'INTP', 'ESFP', 'ISFP', 'ESTP', 'ESTJ'];
const temperaments = ['SC', 'CS', 'SP', 'PS', 'SM', 'MS', 'CP', 'PC', 'CM', 'MC', 'PM', 'MP'];
const timeAgo = ['방금', '1분 전', '2분 전', '3분 전'];

interface FeedItem {
  id: number;
  city: string;
  type: string;
  time: string;
}

function generateFeedItem(id: number): FeedItem {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const mbti = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
  const temp = temperaments[Math.floor(Math.random() * temperaments.length)];
  const time = timeAgo[Math.floor(Math.random() * timeAgo.length)];
  return { id, city, type: `${mbti}-${temp}`, time };
}

export default function LiveTestFeed() {
  const [currentItem, setCurrentItem] = useState<FeedItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const showNext = () => {
      const item = generateFeedItem(counterRef.current++);
      setCurrentItem(item);
      setIsVisible(true);

      // 이전 숨기기 타이머 정리
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      // 4초 후 숨기기
      hideTimerRef.current = setTimeout(() => setIsVisible(false), 4000);
    };

    // 첫 표시: 3초 후
    const initialTimer = setTimeout(showNext, 3000);

    // 이후 10초 간격으로 반복
    const interval = setInterval(showNext, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!currentItem) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 max-w-[320px]">
        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-sm">🧬</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">
            {currentItem.city}에서 <span className="text-indigo-600">{currentItem.type}</span> 결과!
          </p>
          <p className="text-[10px] text-gray-400">{currentItem.time} · 192 유형 검사</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-gray-500 transition"
          aria-label="알림 닫기"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
