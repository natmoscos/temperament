'use client';

import { useEffect, useState } from 'react';
import { TestResult } from '@/data/types';
import { calculateResult } from '@/data/scoring';
import { questions } from '@/data/questions';
import { Answer } from '@/data/types';
import { generateIntegratedProfile, IntegratedProfile } from '@/data/profiles-integrated';

interface UseResultReturn {
  result: TestResult | null;
  profile: IntegratedProfile | null;
  loading: boolean;
}

export function useResult(): UseResultReturn {
  const [result, setResult] = useState<TestResult | null>(null);
  const [profile, setProfile] = useState<IntegratedProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('temperament-test-answers');
      if (saved) {
        const answers: Answer[] = JSON.parse(saved);
        if (answers.length === questions.length) {
          const r = calculateResult(answers);
          setResult(r);
          setProfile(generateIntegratedProfile(r.mbti, r.temperament));
        } else {
          window.location.href = '/test';
        }
      } else {
        window.location.href = '/test';
      }
    } catch {
      window.location.href = '/test';
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, profile, loading };
}
