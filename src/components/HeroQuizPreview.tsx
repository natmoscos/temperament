'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PreviewQuestion {
  question: string;
  optionA: { emoji: string; label: string };
  optionB: { emoji: string; label: string };
  resultA: string;
  resultB: string;
  tag: string;
}

const previewQuestions: PreviewQuestion[] = [
  {
    question: '금요일 저녁, 당신의 선택은?',
    optionA: { emoji: '🎉', label: '약속 잡기' },
    optionB: { emoji: '🏠', label: '넷플릭스 정주행' },
    resultA: 'E 성향이 강하시네요! 사람에게서 에너지를 얻는 타입',
    resultB: 'I 성향이 강하시네요! 혼자만의 시간이 충전소인 타입',
    tag: '외향 / 내향',
  },
  {
    question: '친구가 실연당해서 울고 있다면?',
    optionA: { emoji: '💡', label: '해결책을 찾아줌' },
    optionB: { emoji: '🤗', label: '같이 울어줌' },
    resultA: 'T 성향이 강하시네요! 감정보다 해결이 먼저인 타입',
    resultB: 'F 성향이 강하시네요! 공감 능력이 폭발하는 타입',
    tag: '사고 / 감정',
  },
  {
    question: '화가 나면 나는...',
    optionA: { emoji: '🔥', label: '바로 표현한다' },
    optionB: { emoji: '🧊', label: '속으로 삭힌다' },
    resultA: '담즙질 성향! 열정적이고 에너지 넘치는 기질',
    resultB: '점액질 성향! 차분하고 안정적인 기질',
    tag: '기질 미리보기',
  },
  {
    question: '여행 스타일은?',
    optionA: { emoji: '📅', label: '분 단위 완벽 일정' },
    optionB: { emoji: '🎲', label: '그때그때 결정' },
    resultA: 'J 성향이 강하시네요! 계획이 곧 안정인 타입',
    resultB: 'P 성향이 강하시네요! 즉흥이 곧 재미인 타입',
    tag: '판단 / 인식',
  },
  {
    question: '새로운 일을 시작할 때?',
    optionA: { emoji: '🔍', label: '구체적 사실부터 확인' },
    optionB: { emoji: '💫', label: '큰 그림부터 그림' },
    resultA: 'S 성향이 강하시네요! 현실과 디테일의 달인',
    resultB: 'N 성향이 강하시네요! 가능성과 상상력의 달인',
    tag: '감각 / 직관',
  },
];

export default function HeroQuizPreview() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  // 매번 랜덤 문항으로 시작
  useEffect(() => {
    setQuestionIndex(Math.floor(Math.random() * previewQuestions.length));
  }, []);

  const q = previewQuestions[questionIndex];

  const handleSelect = (option: 'A' | 'B') => {
    if (selected) return; // 이미 선택했으면 무시
    setSelected(option);
    // 짧은 딜레이 후 결과 공개 애니메이션
    setTimeout(() => setIsRevealing(true), 300);
  };

  const handleNextQuestion = () => {
    let nextIndex = questionIndex;
    // 다른 문항으로 전환 (같은 문항 방지)
    while (nextIndex === questionIndex) {
      nextIndex = Math.floor(Math.random() * previewQuestions.length);
    }
    setQuestionIndex(nextIndex);
    setSelected(null);
    setIsRevealing(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-2">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 sm:p-6 shadow-xl">
        {/* 태그 */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-xs text-amber-300 font-bold tracking-wide">미니 성격 테스트</span>
          <span className="text-xs text-indigo-300/50">|</span>
          <span className="text-xs text-indigo-300/60">{q.tag}</span>
        </div>

        {/* 질문 */}
        <p className="text-base sm:text-lg font-bold text-white text-center mb-5 leading-snug">
          {q.question}
        </p>

        {/* 선택지 */}
        {!isRevealing ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSelect('A')}
              className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                selected === 'A'
                  ? 'border-amber-400 bg-amber-400/20 scale-105'
                  : selected === 'B'
                  ? 'border-white/10 bg-white/5 opacity-50 scale-95'
                  : 'border-white/20 bg-white/5 hover:border-amber-400/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {q.optionA.emoji}
              </span>
              <span className="text-sm font-semibold text-white">{q.optionA.label}</span>
            </button>

            <button
              onClick={() => handleSelect('B')}
              className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                selected === 'B'
                  ? 'border-amber-400 bg-amber-400/20 scale-105'
                  : selected === 'A'
                  ? 'border-white/10 bg-white/5 opacity-50 scale-95'
                  : 'border-white/20 bg-white/5 hover:border-amber-400/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {q.optionB.emoji}
              </span>
              <span className="text-sm font-semibold text-white">{q.optionB.label}</span>
            </button>
          </div>
        ) : (
          /* 결과 리빌 */
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-xl p-4 border border-amber-400/30 mb-4">
              <p className="text-sm sm:text-base text-white font-semibold text-center leading-relaxed">
                {selected === 'A' ? q.resultA : q.resultB}
              </p>
            </div>

            <p className="text-xs text-indigo-200/70 text-center mb-3 leading-relaxed">
              하지만 이건 빙산의 일각!<br />
              <strong className="text-amber-300">192가지 유형</strong> 중 진짜 나를 찾으려면?
            </p>

            <Link
              href="/test"
              className="flex items-center justify-center gap-2 w-full py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98] transition-all duration-200 text-sm"
            >
              100문항 검사로 진짜 나 찾기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <button
              onClick={handleNextQuestion}
              className="w-full mt-2 py-2 text-xs text-indigo-300/70 hover:text-white font-medium transition-colors"
            >
              🔄 다른 문제 풀기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
