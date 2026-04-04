'use client';

import { useState, useEffect, useCallback } from 'react';
import { quickQuestions } from '@/data/questions-quick';
import { calculateQuickResult } from '@/data/scoring-quick';
import { Answer, TestResult } from '@/data/types';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'temperament-quick-test-answers';

export function useQuickTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  const totalQuestions = quickQuestions.length;
  const currentQuestion = quickQuestions[currentIndex] ?? null;
  const progress = totalQuestions > 0 ? Math.round((answers.length / totalQuestions) * 100) : 0;
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id)?.value;

  // localStorage 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Answer[] = JSON.parse(saved);
        setAnswers(parsed);
        if (parsed.length >= totalQuestions) {
          setResult(calculateQuickResult(parsed));
        } else {
          setCurrentIndex(parsed.length);
        }
      }
    } catch { /* ignore */ }
  }, [totalQuestions]);

  const submitAnswer = useCallback((value: number) => {
    if (!currentQuestion) return;

    const newAnswer: Answer = { questionId: currentQuestion.id, order: currentQuestion.order, value };
    const updated = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];

    // Track quick_test_start on first answer
    if (answers.length === 0) {
      trackEvent('quick_test_start');
    }

    setAnswers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (currentIndex >= totalQuestions - 1) {
      setResult(calculateQuickResult(updated));
      trackEvent('quick_test_complete');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentQuestion, currentIndex, answers, totalQuestions]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { currentIndex, currentQuestion, currentAnswer, totalQuestions, progress, result, submitAnswer, goBack, reset };
}
