'use client';

import { useState, useCallback, useEffect } from 'react';
import { questions } from '@/data/questions';
import { Answer, TestResult } from '@/data/types';
import { calculateResult } from '@/data/scoring';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'temperament-test-answers';

export function useTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  // localStorage에서 진행 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Answer[];
        setAnswers(parsed);
        // 마지막 답변 다음 문항으로 이동
        if (parsed.length > 0 && parsed.length < questions.length) {
          setCurrentIndex(parsed.length);
        }
      }
    } catch {
      // 무시
    }
  }, []);

  // 답변 저장 시 localStorage에도 저장
  const saveAnswers = useCallback((newAnswers: Answer[]) => {
    setAnswers(newAnswers);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    } catch {
      // 무시
    }
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;
  const totalQuestions = questions.length;
  const progress = Math.round((currentIndex / totalQuestions) * 100);

  // 현재 문항에 대한 기존 답변 조회
  const currentAnswer = currentQuestion
    ? answers.find((a) => a.questionId === currentQuestion.id)?.value ?? null
    : null;

  // 답변 제출
  const submitAnswer = useCallback(
    (value: number) => {
      if (!currentQuestion) return;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        order: currentQuestion.order,
        value,
      };

      const existing = answers.findIndex((a) => a.questionId === currentQuestion.id);
      let newAnswers: Answer[];
      if (existing >= 0) {
        newAnswers = [...answers];
        newAnswers[existing] = newAnswer;
      } else {
        newAnswers = [...answers, newAnswer];
      }

      // Track test_start on first answer
      if (answers.length === 0) {
        trackEvent('test_start');
      }

      // Track halfway point
      if (newAnswers.length === Math.floor(totalQuestions / 2)) {
        trackEvent('test_halfway', { questions: Math.floor(totalQuestions / 2) });
      }

      saveAnswers(newAnswers);

      // 마지막 문항이면 결과 산출
      if (currentIndex === totalQuestions - 1) {
        setResult(calculateResult(newAnswers));
        trackEvent('test_complete', { questions: totalQuestions });
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentQuestion, currentIndex, totalQuestions, answers, saveAnswers]
  );

  // 이전 문항으로
  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // 다음 문항으로 (이미 답변한 경우)
  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalQuestions]);

  // 검사 초기화
  const reset = useCallback(() => {
    trackEvent('test_reset');
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 결과 직접 계산 (마지막 문항 답변 후)
  const finishTest = useCallback(() => {
    if (answers.length === totalQuestions) {
      setResult(calculateResult(answers));
    }
  }, [answers, totalQuestions]);

  return {
    currentIndex,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    progress,
    answers,
    result,
    submitAnswer,
    goBack,
    goNext,
    reset,
    finishTest,
  };
}
