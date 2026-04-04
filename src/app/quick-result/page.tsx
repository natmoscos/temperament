'use client';

import { useEffect, useState } from 'react';
import { TestResult } from '@/data/types';
import { calculateQuickResult } from '@/data/scoring-quick';
import { quickQuestions } from '@/data/questions-quick';
import { Answer } from '@/data/types';
import { generateIntegratedProfile } from '@/data/profiles-integrated';
import { HeroCharacter } from '@/components/CharacterAvatar';
import ShareButtons from '@/components/ShareButtons';
import AdPlaceholder from '@/components/AdPlaceholder';

const temperamentNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
const temperamentTextColors: Record<string, string> = { S: 'text-amber-700', C: 'text-red-700', P: 'text-emerald-700', M: 'text-blue-700' };
const temperamentBgColors: Record<string, string> = { S: 'bg-amber-50 border-amber-200', C: 'bg-red-50 border-red-200', P: 'bg-emerald-50 border-emerald-200', M: 'bg-blue-50 border-blue-200' };

export default function QuickResultPage() {
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('temperament-quick-test-answers');
      if (saved) {
        const answers: Answer[] = JSON.parse(saved);
        if (answers.length >= quickQuestions.length) {
          setResult(calculateQuickResult(answers));
        } else {
          window.location.href = '/quick-test';
        }
      } else {
        window.location.href = '/quick-test';
      }
    } catch {
      window.location.href = '/quick-test';
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const profile = generateIntegratedProfile(result.mbti, result.temperament);
  const { mbti, temperament } = result;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="w-full max-w-lg mx-auto space-y-5">

        {/* 간편 검사 배지 */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
            ⚡ 빠른 검사 결과 (참고용)
          </span>
        </div>

        {/* ━━━ 메인 결과 ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-8 px-6">
          <div className="mb-4">
            <HeroCharacter mbtiType={mbti.type} temperamentCode={temperament.code} />
          </div>
          <p className="text-sm text-gray-400 mb-2">당신의 성격 유형</p>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 tracking-tight">
            {result.fullCode}
          </h1>
          <p className="text-lg text-gray-700 font-semibold">{profile.mbtiEmoji} {profile.mbtiNickname}</p>
          <p className="text-base text-gray-500 mt-1">{profile.temperamentNickname}</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.primary.type]} ${temperamentTextColors[temperament.primary.type]}`}>
              1차 {temperamentNames[temperament.primary.type]}
            </span>
            <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.secondary.type]} ${temperamentTextColors[temperament.secondary.type]}`}>
              2차 {temperamentNames[temperament.secondary.type]}
            </span>
          </div>
        </div>

        {/* ━━━ 간략 설명 (맛보기) ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-800 mb-3">🪞 당신은 이런 사람입니다</h3>
          <p className="text-gray-600 leading-[1.85] text-[15px]">
            {profile.personalityNarrative.split('\n\n').slice(0, 2).join('\n\n')}
          </p>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
            <p className="text-xs text-gray-400">... 더 많은 분석이 있습니다</p>
          </div>
        </div>

        {/* ━━━ 잠긴 콘텐츠 미리보기 ━━━ */}
        <div className="space-y-3">
          {[
            { icon: '🔑', title: 'MBTI만으로는 설명할 수 없었던 것들', desc: '기질론이 풀어주는 당신의 모순' },
            { icon: '🎭', title: '사람들이 모르는 진짜 당신', desc: '겉과 다른 내면의 이야기' },
            { icon: '❤️', title: '연애할 때 당신은', desc: '사랑의 언어와 궁합 분석' },
            { icon: '🚀', title: '당신만의 커리어 전략', desc: '기질별 최적 업무 환경' },
            { icon: '🌊', title: '극도의 스트레스 패턴', desc: 'Grip 상태와 회복법' },
            { icon: '📖', title: '인생 공략집', desc: '성장을 위한 맞춤 전략' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 opacity-60"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <span className="text-xs text-gray-300 bg-gray-100 px-2 py-1 rounded-md">🔒</span>
            </div>
          ))}
        </div>

        <AdPlaceholder />

        {/* ━━━ 정밀 검사 CTA (핵심!) ━━━ */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
          <p className="text-sm text-indigo-200 mb-2">30문항 간편 검사의 정확도는 약 70%입니다</p>
          <h3 className="text-xl font-bold mb-3">100문항 정밀 검사로<br />진짜 나를 만나보세요</h3>
          <ul className="text-sm text-indigo-100 space-y-1.5 mb-5 text-left max-w-xs mx-auto">
            <li>✓ 정확도 95%+ 의 정밀 분석</li>
            <li>✓ 192유형 맞춤 인생 공략집</li>
            <li>✓ 연애, 커리어, 스트레스 심층 분석</li>
            <li>✓ Grip 스트레스 패턴 + 회복법</li>
            <li>✓ 과학적 근거 (Eysenck, Helen Fisher)</li>
            <li>✓ 궁합 검사 기능</li>
          </ul>
          <a
            href="/test"
            onClick={() => localStorage.removeItem('temperament-test-answers')}
            className="inline-block w-full py-4 bg-white text-indigo-700 rounded-xl text-lg font-bold hover:bg-indigo-50 transition shadow-lg"
          >
            무료 정밀 검사 시작하기
          </a>
          <p className="text-xs text-indigo-200 mt-3">약 12~15분 소요 | 100문항 | 완전 무료</p>
        </div>

        {/* ━━━ 공유 ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ShareButtons
            fullCode={result.fullCode}
            mbtiNickname={profile.mbtiNickname}
            temperamentNickname={profile.temperamentNickname}
          />
        </div>

        {/* ━━━ 재검사 ━━━ */}
        <div className="flex justify-center pb-8">
          <button
            onClick={() => {
              localStorage.removeItem('temperament-quick-test-answers');
              window.location.href = '/quick-test';
            }}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition text-sm"
          >
            간편 검사 다시 하기
          </button>
        </div>
      </div>
    </div>
  );
}
