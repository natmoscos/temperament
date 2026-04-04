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

        {/* ━━━ 비교표: 빠른 검사 vs 정밀 검사 ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 text-center">빠른 검사 vs 정밀 검사</h3>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-2.5 text-sm">
            {/* Header */}
            <div className="text-xs text-gray-400 font-medium" />
            <div className="text-center">
              <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">30문항</span>
              <p className="text-[11px] text-gray-400 mt-0.5">정확도 ~70%</p>
            </div>
            <div className="text-center">
              <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-bold">100문항</span>
              <p className="text-[11px] text-indigo-500 font-semibold mt-0.5">정확도 95%+</p>
            </div>
            {/* Rows */}
            {[
              { label: '기본 유형 코드', quick: true, full: true },
              { label: '성격 심층 분석', quick: false, full: true },
              { label: '연애 스타일 & 궁합', quick: false, full: true },
              { label: '커리어 전략', quick: false, full: true },
              { label: '스트레스 패턴', quick: false, full: true },
              { label: '과학적 근거', quick: false, full: true },
              { label: 'PDF 보고서', quick: false, full: true },
            ].map((row) => (
              <div key={row.label} className="contents">
                <p className="text-gray-600 py-1 border-t border-gray-50">{row.label}</p>
                <p className="text-center py-1 border-t border-gray-50">
                  {row.quick
                    ? <span className="text-emerald-500 font-bold">✅</span>
                    : <span className="text-gray-300">❌</span>}
                </p>
                <p className="text-center py-1 border-t border-gray-50">
                  <span className="text-emerald-500 font-bold">✅</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ 잠긴 콘텐츠 미리보기 (블러 티저) ━━━ */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-800 text-center">정밀 검사에서 확인할 수 있는 내용</h3>

          {/* 성격 인사이트 티저 카드 */}
          <div className="relative bg-white rounded-2xl border border-gray-100 p-5 overflow-hidden">
            <div className="blur-[6px] select-none pointer-events-none" aria-hidden="true">
              <p className="text-sm font-bold text-gray-800 mb-2">🎭 숨겨진 성격 분석</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                당신의 {mbti.type} 유형은 겉으로는 차분해 보이지만,
                내면에서는 강렬한 감정의 소용돌이가 일어납니다.
                특히 가까운 관계에서는 예상과 다른 모습이 나타나며...
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">내면 분석</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">갈등 패턴</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">성장 포인트</span>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
              <span className="text-3xl mb-2">🔒</span>
              <p className="text-sm font-bold text-gray-700">정밀 검사 후 확인 가능</p>
              <p className="text-xs text-gray-400 mt-0.5">192가지 유형별 맞춤 분석</p>
            </div>
          </div>

          {/* 궁합 티저 카드 */}
          <div className="relative bg-white rounded-2xl border border-gray-100 p-5 overflow-hidden">
            <div className="blur-[6px] select-none pointer-events-none" aria-hidden="true">
              <p className="text-sm font-bold text-gray-800 mb-2">❤️ 연애 궁합 분석</p>
              <div className="flex items-center justify-around mb-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-1" />
                  <p className="text-xs text-gray-500">{result.fullCode}</p>
                </div>
                <span className="text-xl">💕</span>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full mx-auto mb-1" />
                  <p className="text-xs text-gray-500">???</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-pink-400 to-red-400 h-3 rounded-full w-4/5" />
              </div>
              <p className="text-xs text-gray-500">궁합 점수: 87%</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
              <span className="text-3xl mb-2">🔒</span>
              <p className="text-sm font-bold text-gray-700">정밀 검사 후 확인 가능</p>
              <p className="text-xs text-gray-400 mt-0.5">연애 스타일 & 궁합 심층 분석</p>
            </div>
          </div>
        </div>

        {/* ━━━ 잠긴 콘텐츠 목록 ━━━ */}
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
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs text-indigo-100 mb-3">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full" />
              지금 바로 시작 가능
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-2">100문항 정밀 검사로<br />진짜 나를 만나보세요</h3>
            <p className="text-sm text-indigo-200 mb-5">
              지금 바로 정밀 검사를 시작하면<br />
              12~15분 안에 완전한 분석을 받을 수 있어요
            </p>

            {/* Accuracy comparison bar */}
            <div className="flex items-center gap-3 max-w-xs mx-auto mb-5">
              <div className="flex-1">
                <p className="text-xs text-indigo-200 mb-1">빠른 검사</p>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div className="bg-white/40 h-2.5 rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-xs text-indigo-300 mt-0.5">~70%</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white font-semibold mb-1">정밀 검사</p>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-amber-300 to-yellow-300 h-2.5 rounded-full" style={{ width: '95%' }} />
                </div>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">95%+</p>
              </div>
            </div>

            <a
              href="/test"
              onClick={() => localStorage.removeItem('temperament-test-answers')}
              className="inline-block w-full py-4 bg-white text-indigo-700 rounded-xl text-lg font-bold hover:bg-indigo-50 transition shadow-lg animate-[pulse_2s_ease-in-out_infinite] hover:animate-none"
            >
              무료 정밀 검사 시작하기 →
            </a>
            <p className="text-xs text-indigo-200 mt-3">약 12~15분 소요 | 100문항 | 완전 무료</p>
          </div>
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
