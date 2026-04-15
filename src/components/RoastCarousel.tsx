'use client';

import { useState, useEffect, useRef } from 'react';

const roasts = [
  { type: 'ENFP', text: '아이디어 100개, 실행 0개. 그래도 자신감은 100개.' },
  { type: 'INTJ', text: '혼자 세운 계획이 틀리면 세상이 잘못된 거임.' },
  { type: 'INFP', text: '머릿속에선 이미 소설 3편 완결, 현실에선 출근도 힘듦.' },
  { type: 'ENTP', text: '토론에서 이기면 기분 좋고, 지면 "나 원래 그 편 아니었음".' },
  { type: 'ISFJ', text: '다 괜찮다고 하면서 속으로 울고 있는 사람.' },
  { type: 'ESTP', text: '생각보다 행동이 먼저. 후회도 행동 후에.' },
  { type: 'INFJ', text: '"나는 사람을 좋아해" (근데 3명 이상이면 도망감).' },
  { type: 'ISTJ', text: '규칙 안 지키는 사람 보면 혈압 상승하는 타입.' },
  { type: 'ESFP', text: '파티 분위기 메이커. 근데 내일 시험임.' },
  { type: 'INTP', text: '"그건 논리적으로 말이 안 되는데" 가 입버릇.' },
  { type: 'ENTJ', text: 'CEO 기질인데 아직 월급쟁이. 마음은 이미 사장.' },
  { type: 'ISFP', text: '감성 충만한데 표현은 못 함. 눈빛으로 말하는 타입.' },
  { type: 'ESTJ', text: '조별과제 = 내가 다 함. 그리고 평가도 내가 함.' },
  { type: 'ESFJ', text: '남 걱정하느라 정작 본인 밥은 안 먹은 사람.' },
  { type: 'ISTP', text: '말 적은데 가끔 한마디가 핵사이다.' },
  { type: 'ENFJ', text: '"다들 괜찮아?" 를 하루에 17번 묻는 사람.' },
];

export default function RoastCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      animTimerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roasts.length);
        setIsAnimating(false);
      }, 300);
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  const current = roasts[currentIndex];

  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-amber-300">한 줄 팩폭</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === currentIndex % 3 ? 'bg-amber-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 팩폭 내용 */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 px-2 py-0.5 bg-indigo-500/30 text-indigo-300 rounded-md text-xs font-bold mt-0.5">
              {current.type}
            </span>
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              {current.text}
            </p>
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="text-[10px] text-indigo-300/40 mt-3 text-right">
          {currentIndex + 1} / {roasts.length}
        </p>
      </div>
    </div>
  );
}
