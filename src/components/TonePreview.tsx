'use client';

import { useState } from 'react';
import Link from 'next/link';

const examples = [
  {
    type: 'ENFP-SC',
    mild: {
      title: '열정적인 자유로운 영혼',
      desc: '새로운 가능성을 탐구하며 주변 사람들에게 긍정적인 에너지를 나누는 따뜻한 성격입니다.',
    },
    spicy: {
      title: '아이디어 폭주 다혈질 나비',
      desc: '머릿속에 1초마다 새 아이디어가 튀어나오는데 실행력은 0.5초. 그래도 웃고 있으면 다 괜찮은 줄 아는 긍정 괴물.',
    },
  },
  {
    type: 'INTJ-CM',
    mild: {
      title: '전략적 완벽주의자',
      desc: '장기적 비전을 설계하고 체계적으로 실행하는 뛰어난 전략가입니다.',
    },
    spicy: {
      title: '혼자 세계정복 계획 세우는 담즙 교수',
      desc: '남들이 점심 뭐 먹을지 고민할 때 5개년 계획 수정 중. 감정? 그거 먹는 건가요?',
    },
  },
];

export default function TonePreview() {
  const [isSpicy, setIsSpicy] = useState(false);
  const [exampleIndex] = useState(() => Math.floor(Math.random() * examples.length));

  const example = examples[exampleIndex];
  const content = isSpicy ? example.spicy : example.mild;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 sm:p-6">
        {/* 헤더 + 토글 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-800">결과 미리보기</h3>
            <p className="text-xs text-gray-400">실제 검사 결과는 더 자세해요</p>
          </div>
          <button
            onClick={() => setIsSpicy(!isSpicy)}
            className={`relative inline-flex items-center h-8 w-[120px] rounded-full transition-colors duration-300 ${
              isSpicy ? 'bg-red-100' : 'bg-indigo-100'
            }`}
          >
            <span className={`absolute left-2 text-xs font-bold transition-opacity ${isSpicy ? 'opacity-40' : 'opacity-100 text-indigo-700'}`}>
              🍀 순한맛
            </span>
            <span className={`absolute right-2 text-xs font-bold transition-opacity ${isSpicy ? 'opacity-100 text-red-700' : 'opacity-40'}`}>
              🌶️ 매운맛
            </span>
            <span
              className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                isSpicy ? 'translate-x-[90px]' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 예시 카드 */}
        <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-300 ${
          isSpicy
            ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-xs font-bold">
              {example.type}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
              isSpicy ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {isSpicy ? '매운맛 🌶️' : '순한맛 🍀'}
            </span>
          </div>
          <h4 className="text-base font-bold text-gray-800 mb-2">{content.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{content.desc}</p>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/test"
            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-bold transition"
          >
            내 유형 결과 보러 가기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
