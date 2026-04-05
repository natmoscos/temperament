'use client';

import { Question } from '@/data/types';
import LikertScale from './LikertScale';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  currentAnswer: number | null;
  onAnswer: (value: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  currentAnswer,
  onAnswer,
  onBack,
  canGoBack,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 질문 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-10">
        <p className="text-sm text-indigo-500 font-medium mb-3">Q{questionNumber}</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed">
          {question.text}
        </h2>

        {/* 리커트 척도 */}
        <LikertScale value={currentAnswer} onChange={onAnswer} />
      </div>

      {/* 이전 버튼 */}
      <div className="mt-6 flex justify-between">
        {canGoBack ? (
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 질문
          </button>
        ) : (
          <div />
        )}
        <p className="text-xs text-gray-300 hidden sm:block">질문을 선택하면 자동으로 다음으로 넘어갑니다</p>
      </div>
    </div>
  );
}
