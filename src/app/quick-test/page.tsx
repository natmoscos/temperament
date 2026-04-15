'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuickTest } from '@/hooks/useQuickTest';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';

export default function QuickTestPage() {
  const router = useRouter();
  const {
    currentIndex,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    progress,
    result,
    submitAnswer,
    goBack,
  } = useQuickTest();

  useEffect(() => {
    if (result) {
      router.push('/quick-result');
    }
  }, [result, router]);

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* 간편 검사 배지 */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
            ⚡ 3분 빠른 검사
          </span>
        </div>

        <ProgressBar current={currentIndex} total={totalQuestions} percentage={progress} />
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestion.order}
          currentAnswer={currentAnswer ?? null}
          onAnswer={submitAnswer}
          onBack={goBack}
          canGoBack={currentIndex > 0}
        />
      </div>
    </div>
  );
}
