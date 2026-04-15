'use client';

import { useState } from 'react';
import Link from 'next/link';

const elements = [
  {
    emoji: '🔥',
    name: '불',
    color: 'from-red-500 to-orange-500',
    borderColor: 'border-red-400',
    bgActive: 'bg-red-500/20',
    temperament: '담즙질',
    traits: ['리더십', '추진력', '결단력'],
    desc: '불꽃처럼 뜨거운 열정! 한번 시작하면 끝을 봐야 하는 당신',
  },
  {
    emoji: '🌊',
    name: '물',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-400',
    bgActive: 'bg-blue-500/20',
    temperament: '우울질',
    traits: ['감성', '완벽주의', '깊은 사고'],
    desc: '깊은 바다처럼 풍부한 내면! 예술적이고 섬세한 당신',
  },
  {
    emoji: '🌿',
    name: '나무',
    color: 'from-emerald-500 to-green-600',
    borderColor: 'border-emerald-400',
    bgActive: 'bg-emerald-500/20',
    temperament: '점액질',
    traits: ['안정', '중재', '인내'],
    desc: '든든한 나무처럼 묵직한 존재감! 모두의 안식처인 당신',
  },
  {
    emoji: '🌞',
    name: '빛',
    color: 'from-amber-400 to-yellow-500',
    borderColor: 'border-amber-400',
    bgActive: 'bg-amber-400/20',
    temperament: '다혈질',
    traits: ['사교', '낙관', '에너지'],
    desc: '눈부신 햇살 같은 에너지! 어디서든 분위기 메이커인 당신',
  },
];

export default function ElementPreview() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = selectedIndex !== null ? elements[selectedIndex] : null;

  return (
    <div className="w-full max-w-2xl mb-12">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 sm:p-6">
        {/* 헤더 */}
        <div className="text-center mb-5">
          <h3 className="text-lg sm:text-xl font-black text-white mb-1">
            끌리는 원소를 골라보세요
          </h3>
          <p className="text-xs text-indigo-300/60">직감적으로! 생각하지 마세요</p>
        </div>

        {/* 원소 버튼 */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {elements.map((el, i) => (
            <button
              key={el.name}
              onClick={() => setSelectedIndex(i)}
              className={`group flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedIndex === i
                  ? `${el.borderColor} ${el.bgActive} scale-105`
                  : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:scale-[1.03] active:scale-[0.97]'
              }`}
            >
              <span className={`text-2xl sm:text-3xl transition-transform duration-300 ${selectedIndex === i ? 'scale-110' : 'group-hover:scale-110'}`}>
                {el.emoji}
              </span>
              <span className="text-xs font-semibold text-white/80">{el.name}</span>
            </button>
          ))}
        </div>

        {/* 결과 */}
        {selected && (
          <div className="animate-fadeIn">
            <div className={`bg-gradient-to-r ${selected.color} rounded-xl p-4 sm:p-5 mb-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{selected.emoji}</span>
                <span className="text-sm font-black text-white">{selected.temperament} 성향</span>
              </div>
              <p className="text-sm text-white/90 font-medium leading-relaxed mb-3">
                {selected.desc}
              </p>
              <div className="flex gap-2">
                {selected.traits.map((trait) => (
                  <span key={trait} className="px-2 py-0.5 bg-white/20 rounded-md text-xs text-white font-semibold">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-indigo-200/60 mb-2">
                이건 4가지 기질 중 하나! 당신의 <strong className="text-amber-300">2차 기질</strong>까지 알아보려면?
              </p>
              <Link
                href="/test"
                className="inline-flex items-center gap-1 text-sm text-amber-300 hover:text-amber-200 font-bold transition"
              >
                정밀 검사 시작하기 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
