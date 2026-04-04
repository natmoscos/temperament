'use client';

import { useEffect } from 'react';
import { useTest } from '@/hooks/useTest';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';

export default function TestPage() {
  const {
    currentIndex,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    progress,
    result,
    submitAnswer,
    goBack,
  } = useTest();

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
      </div>
    </div>
  );
}
