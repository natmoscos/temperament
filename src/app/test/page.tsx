'use client';

import { useEffect, useState } from 'react';
import { useTest } from '@/hooks/useTest';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import Link from 'next/link';

export default function TestPage() {
  const {
    currentIndex,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    progress,
    answers,
    result,
    submitAnswer,
    goBack,
    reset,
  } = useTest();

  const [showResume, setShowResume] = useState<boolean | null>(null);

  // 최초 마운트 시에만 이전 기록 확인 (한 번만 실행)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('temperament-test-answers');
      if (saved) {
        const savedAnswers = JSON.parse(saved);
        if (savedAnswers.length > 0 && savedAnswers.length < totalQuestions) {
          setShowResume(true);
          return;
        }
      }
    } catch {}
    setShowResume(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 결과가 나오면 결과 페이지로 이동
  useEffect(() => {
    if (result) {
      window.location.href = '/result';
    }
  }, [result]);

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // 초기 로딩 중
  if (showResume === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // 이어하기 / 처음부터 선택 화면
  if (showResume) {
    const answeredPercent = Math.round((answers.length / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-4xl block mb-4">📝</span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">이전 검사 기록이 있습니다</h2>
            <p className="text-sm text-gray-500 mb-2">
              {totalQuestions}문항 중 <strong className="text-indigo-600">{answers.length}문항</strong> 완료 ({answeredPercent}%)
            </p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${answeredPercent}%` }} />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowResume(false)}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition text-base"
              >
                이어서 검사하기
              </button>
              <button
                onClick={() => { reset(); setShowResume(false); }}
                className="w-full py-3.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition text-sm"
              >
                처음부터 다시 하기
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-500 transition">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 검사 진행 화면
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressBar current={currentIndex} total={totalQuestions} percentage={progress} />
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestion.order}
          currentAnswer={currentAnswer}
          onAnswer={submitAnswer}
          onBack={goBack}
          canGoBack={currentIndex > 0}
        />

        {/* 검사 중 초기화 버튼 */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (window.confirm('처음부터 다시 시작하시겠습니까? 현재까지의 응답이 모두 삭제됩니다.')) {
                reset();
              }
            }}
            className="text-xs text-gray-400 hover:text-red-500 transition"
          >
            처음부터 다시 하기
          </button>
        </div>
      </div>
    </div>
  );
}
