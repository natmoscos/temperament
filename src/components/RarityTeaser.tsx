'use client';

import { useState } from 'react';
import Link from 'next/link';

const rarityData = [
  { type: 'INFJ-MC', rarity: 0.5, emoji: '🦄', label: '유니콘급', color: 'bg-purple-500' },
  { type: 'ENTJ-PM', rarity: 0.8, emoji: '💎', label: '다이아몬드급', color: 'bg-blue-500' },
  { type: 'ENFP-SC', rarity: 2.1, emoji: '⭐', label: '별', color: 'bg-amber-500' },
  { type: 'ISFJ-SP', rarity: 4.3, emoji: '🌸', label: '꽃', color: 'bg-pink-400' },
  { type: 'ISTJ-PC', rarity: 5.2, emoji: '🪨', label: '바위', color: 'bg-gray-500' },
];

export default function RarityTeaser() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full max-w-2xl mb-12">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 sm:p-6">
        <div className="text-center mb-5">
          <h3 className="text-lg sm:text-xl font-black text-white mb-1">
            192유형 중 가장 <span className="text-amber-300">희귀한</span> 유형은?
          </h3>
          <p className="text-xs text-indigo-300/60">전체 인구 중 차지하는 비율 (추정치)</p>
        </div>

        {!revealed ? (
          <div className="text-center">
            <button
              onClick={() => setRevealed(true)}
              className="group px-6 py-3 bg-gradient-to-r from-purple-500/30 to-amber-500/30 border border-purple-400/40 rounded-xl text-white font-bold text-sm hover:from-purple-500/50 hover:to-amber-500/50 transition-all active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-lg group-hover:animate-bounce">🔮</span>
                희귀도 공개하기
              </span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 animate-fadeIn">
            {rarityData.map((item, i) => (
              <div key={item.type} className="flex items-center gap-3">
                <span className="text-lg w-8 text-center flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{item.type}</span>
                    <span className="text-xs text-indigo-300/70">{item.rarity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${Math.max(item.rarity * 8, 3)}%`,
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-3 border-t border-white/10 mt-4">
              <p className="text-xs text-indigo-200/60 mb-2">
                <span className="text-amber-300 font-bold">INFJ-MC</span>는 전체 인구의 <span className="text-amber-300 font-bold">0.5%</span>만 해당!
              </p>
              <p className="text-xs text-indigo-300/50 mb-3">당신은 몇 %에 속할까요?</p>
              <Link
                href="/test"
                className="inline-flex items-center gap-1 text-sm text-amber-300 hover:text-amber-200 font-bold transition"
              >
                내 희귀도 확인하기 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
