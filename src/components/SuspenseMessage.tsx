'use client';

import { useState, useEffect, useRef } from 'react';

interface SuspenseMessageProps {
  milestone: number; // 현재 도달한 마일스톤 (25, 50, 75, 0=없음)
  onDismiss: () => void;
}

const messages: Record<number, { emoji: string; title: string; subtitle: string }> = {
  25: {
    emoji: '🔍',
    title: '흥미로운 패턴이 보이기 시작합니다...',
    subtitle: '당신의 기질이 조금씩 드러나고 있어요',
  },
  50: {
    emoji: '🧬',
    title: '절반 완료! 유형이 윤곽을 잡고 있어요',
    subtitle: '지금까지의 답변으로 흥미로운 조합이 예상됩니다',
  },
  75: {
    emoji: '🔮',
    title: '거의 다 왔어요! 결과가 기대됩니다',
    subtitle: '192가지 중 당신의 유형이 곧 밝혀집니다',
  },
};

export default function SuspenseMessage({ milestone, onDismiss }: SuspenseMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (milestone === 0) return;
    // 등장 애니메이션
    setIsVisible(true);

    // 2.5초 후 자동 닫기
    const timer = setTimeout(() => {
      setIsVisible(false);
      dismissTimerRef.current = setTimeout(onDismiss, 400); // 퇴장 애니메이션 대기
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [milestone, onDismiss]);

  if (milestone === 0 || !messages[milestone]) return null;

  const msg = messages[milestone];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mx-4 max-w-sm text-center transition-all duration-400 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <span className="text-4xl block mb-3">{msg.emoji}</span>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">{msg.title}</h3>
        <p className="text-sm text-gray-500">{msg.subtitle}</p>
        <div className="mt-4 flex justify-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
