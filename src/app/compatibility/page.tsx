'use client';

import { useState, useEffect } from 'react';
import { useResult } from '@/hooks/useResult';
import { analyzeCompatibility, CompatibilityResult } from '@/data/compatibility';
import { Section, Paragraph, LoadingSpinner } from '@/components/ResultSection';
import { MiniCharacterGrid } from '@/components/CharacterAvatar';
import AdPlaceholder from '@/components/AdPlaceholder';
import ShareButtons from '@/components/ShareButtons';

const mbtiTypes = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'] as const;
const tempCodes = ['SC','SP','SM','CS','CP','CM','PS','PC','PM','MS','MC','MP'] as const;

const mbtiGroups = [
  { label: '분석가', types: ['INTJ','INTP','ENTJ','ENTP'], color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { label: '외교관', types: ['INFJ','INFP','ENFJ','ENFP'], color: 'bg-green-50 border-green-200 text-green-700' },
  { label: '관리자', types: ['ISTJ','ISFJ','ESTJ','ESFJ'], color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: '탐험가', types: ['ISTP','ISFP','ESTP','ESFP'], color: 'bg-amber-50 border-amber-200 text-amber-700' },
];

const temperamentNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? '#EC4899' : score >= 75 ? '#8B5CF6' : score >= 65 ? '#6366F1' : score >= 55 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-400">/ 100</span>
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const { result, profile, loading } = useResult();
  const [step, setStep] = useState<'select-my' | 'select-mbti' | 'select-temp' | 'result'>('select-my');
  const [myMbti, setMyMbti] = useState<string>('');
  const [myTemp, setMyTemp] = useState<string>('');
  const [myEditMode, setMyEditMode] = useState<'none' | 'mbti' | 'temp'>('none');
  const [partnerMbti, setPartnerMbti] = useState<string>('');
  const [partnerTemp, setPartnerTemp] = useState<string>('');
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);

  // 테스트 결과에서 나의 유형 초기화
  useEffect(() => {
    if (result) {
      setMyMbti(result.mbti.type);
      setMyTemp(result.temperament.code);
    }
  }, [result]);

  // URL 파라미터로 상대 유형이 전달된 경우
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const withCode = params.get('with');
      if (withCode && result) {
        const parts = withCode.split('-');
        if (parts[0] && parts[1]) {
          setPartnerMbti(parts[0]);
          setPartnerTemp(parts[1]);
          const myCode = `${result.mbti.type}-${result.temperament.code}`;
          setCompatibility(analyzeCompatibility(myCode, withCode));
          setStep('result');
        }
      }
    }
  }, [result]);

  const myCode = `${myMbti}-${myTemp}`;

  const handleConfirmMyType = () => {
    setMyEditMode('none');
    setStep('select-mbti');
  };

  const handleSelectMbti = (type: string) => {
    setPartnerMbti(type);
    setStep('select-temp');
  };

  const handleSelectTemp = (code: string) => {
    setPartnerTemp(code);
    if (myMbti && myTemp) {
      const partnerCode = `${partnerMbti}-${code}`;
      setCompatibility(analyzeCompatibility(myCode, partnerCode));
      setStep('result');
    }
  };

  const handleReset = () => {
    setStep('select-mbti');
    setPartnerMbti('');
    setPartnerTemp('');
    setCompatibility(null);
  };

  if (loading || !result || !profile) return <LoadingSpinner />;

  // ── STEP 0: 나의 유형 확인/변경 ──
  if (step === 'select-my') {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-5 py-8 px-4">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-gray-800 mt-1">궁합 검사</h1>
          <p className="text-sm text-gray-500 mt-2">먼저 나의 유형을 확인하세요</p>
        </div>

        {/* 나의 유형 표시 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p className="text-xs text-gray-400 mb-1">나의 유형</p>
          {myEditMode === 'none' && (
            <>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{myCode}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.mbtiEmoji} {profile.mbtiNickname} · {profile.temperamentNickname}</p>
              <button
                onClick={() => setMyEditMode('mbti')}
                className="mt-3 px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-xl font-medium hover:bg-indigo-100 transition"
              >
                변경하기
              </button>
            </>
          )}

          {/* MBTI 변경 모드 */}
          {myEditMode === 'mbti' && (
            <div className="mt-4 space-y-4 text-left">
              <p className="text-sm font-semibold text-gray-600 text-center">나의 MBTI를 선택하세요</p>
              {mbtiGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-semibold text-gray-500 mb-2 ml-1">{group.label}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {group.types.map((type) => (
                      <button
                        key={type}
                        onClick={() => { setMyMbti(type); setMyEditMode('temp'); }}
                        className={`py-3 rounded-xl border font-bold text-sm transition hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                          myMbti === type ? 'ring-2 ring-indigo-500 ' : ''
                        }${group.color}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 기질 변경 모드 */}
          {myEditMode === 'temp' && (
            <div className="mt-4 space-y-4 text-left">
              <p className="text-sm font-semibold text-gray-600 text-center">나의 기질 조합을 선택하세요 (MBTI: {myMbti})</p>
              <div className="grid grid-cols-3 gap-3">
                {tempCodes.map((code) => (
                  <button
                    key={code}
                    onClick={() => { setMyTemp(code); setMyEditMode('none'); }}
                    className={`py-4 bg-white rounded-xl border hover:border-indigo-300 hover:shadow-md transition text-center ${
                      myTemp === code ? 'border-indigo-400 ring-2 ring-indigo-500' : 'border-gray-200'
                    }`}
                  >
                    <p className="font-bold text-gray-800">{code}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {temperamentNames[code[0]]}+{temperamentNames[code[1]]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 다음 단계 버튼 */}
        {myEditMode === 'none' && (
          <button
            onClick={handleConfirmMyType}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-base hover:shadow-lg transition"
          >
            상대 유형 선택하기 →
          </button>
        )}
      </div>
    );
  }

  // ── STEP 1: MBTI 선택 ──
  if (step === 'select-mbti') {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-5 py-8 px-4">
        <div className="text-center py-4">
          <p className="text-sm text-indigo-500 font-medium">{myCode}</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">궁합 검사</h1>
          <p className="text-sm text-gray-500 mt-2">상대방의 MBTI 유형을 선택하세요</p>
        </div>

        {/* 내 유형 표시 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
          <p className="text-xs text-gray-400 mb-1">나의 유형</p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{myCode}</p>
          <button
            onClick={() => { setStep('select-my'); setMyEditMode('mbti'); }}
            className="mt-1 text-xs text-indigo-500 hover:text-indigo-700 underline transition"
          >
            변경하기
          </button>
        </div>

        <div className="text-center text-2xl text-gray-300 py-2">×</div>

        {/* MBTI 선택 그리드 */}
        <div className="space-y-4">
          {mbtiGroups.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-semibold text-gray-500 mb-2 ml-1">{group.label}</p>
              <div className="grid grid-cols-4 gap-2">
                {group.types.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSelectMbti(type)}
                    className={`py-3 rounded-xl border font-bold text-sm transition hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${group.color}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">상대방의 유형을 모르나요? 검사 링크를 공유해보세요!</p>
        <div className="flex justify-center">
          <a href="/test" className="px-5 py-2.5 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-200 transition">
            검사 링크 공유하기
          </a>
        </div>
      </div>
    );
  }

  // ── STEP 2: 기질 선택 ──
  if (step === 'select-temp') {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-5 py-8 px-4">
        <div className="text-center py-4">
          <p className="text-sm text-indigo-500 font-medium">{myCode} × {partnerMbti}-?</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">상대의 기질 조합을 선택하세요</h1>
          <p className="text-sm text-gray-500 mt-2">모르면 &ldquo;모름&rdquo;을 선택하세요 (MBTI만으로 분석)</p>
        </div>

        {/* 기질 조합 선택 */}
        <div className="grid grid-cols-3 gap-3">
          {tempCodes.map((code) => (
            <button
              key={code}
              onClick={() => handleSelectTemp(code)}
              className="py-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition text-center"
            >
              <p className="font-bold text-gray-800">{code}</p>
              <p className="text-xs text-gray-500 mt-1">
                {temperamentNames[code[0]]}+{temperamentNames[code[1]]}
              </p>
            </button>
          ))}
        </div>

        {/* 모름 옵션 (기본 기질로 분석) */}
        <button
          onClick={() => handleSelectTemp('SC')}
          className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
        >
          기질을 모름 (MBTI만으로 분석)
        </button>

        <button
          onClick={() => setStep('select-mbti')}
          className="w-full py-3 text-gray-400 text-sm hover:text-gray-600 transition"
        >
          ← MBTI 다시 선택
        </button>
      </div>
    );
  }

  // ── STEP 3: 결과 ──
  if (!compatibility) return <LoadingSpinner />;
  const partnerCode = `${partnerMbti}-${partnerTemp}`;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 py-8 px-4">

      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
        <p className="text-sm text-gray-400 mb-4">궁합 분석 결과</p>

        {/* 두 유형 표시 */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{myCode}</p>
            <p className="text-xs text-gray-500 mt-1">나</p>
          </div>
          <div className="text-3xl text-pink-400">♥</div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">{partnerCode}</p>
            <p className="text-xs text-gray-500 mt-1">상대</p>
          </div>
        </div>

        {/* 종합 점수 */}
        <div className="flex justify-center mb-4">
          <ScoreRing score={compatibility.overallScore} />
        </div>
        <p className="text-2xl font-bold text-gray-800">{compatibility.emoji} {compatibility.label}</p>
      </div>

      {/* 점수 상세 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
          <p className="text-sm font-semibold text-gray-500 mb-1">🧠 MBTI 호환성</p>
          <p className="text-3xl font-black text-indigo-600">{compatibility.mbtiScore}<span className="text-sm text-gray-400">점</span></p>
          <p className="text-xs text-gray-400 mt-1">인지기능 기반</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
          <p className="text-sm font-semibold text-gray-500 mb-1">🧬 기질 호환성</p>
          <p className="text-3xl font-black text-purple-600">{compatibility.temperamentScore}<span className="text-sm text-gray-400">점</span></p>
          <p className="text-xs text-gray-400 mt-1">기질 화학 반응</p>
        </div>
      </div>

      {/* 요약 */}
      <Section icon="💫" title="궁합 요약">
        <Paragraph text={compatibility.summary} />
      </Section>

      <AdPlaceholder />

      {/* 기질 케미 */}
      <Section icon="⚗️" title="기질의 화학 반응" subtitle="두 기질이 만났을 때 일어나는 일">
        <Paragraph text={compatibility.temperamentDynamic} />
      </Section>

      {/* 강점 & 도전 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
          <h4 className="font-bold text-green-800 flex items-center gap-2 mb-3">💚 이 관계의 강점</h4>
          <ul className="space-y-2">
            {compatibility.strengths.map((s, i) => (
              <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                <span className="mt-0.5">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
          <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3">⚠️ 주의할 점</h4>
          <ul className="space-y-2">
            {compatibility.challenges.map((c, i) => (
              <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="mt-0.5">!</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AdPlaceholder />

      {/* 소통 가이드 */}
      <Section icon="💬" title="소통 가이드" subtitle="이 관계에서의 대화법">
        <Paragraph text={compatibility.communicationGuide} />
      </Section>

      {/* 갈등 패턴 */}
      <Section icon="🌊" title="갈등 패턴" subtitle="충돌이 생겼을 때 예상되는 패턴">
        <Paragraph text={compatibility.conflictPattern} />
      </Section>

      {/* 성장 팁 */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <span className="text-2xl">🌱</span> 함께 성장하려면
        </h3>
        <Paragraph text={compatibility.growthTip} />
      </div>

      <AdPlaceholder />

      {/* 공유 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
        <p className="text-sm text-gray-500 mb-3">궁합 결과를 상대에게 공유해보세요</p>
        <ShareButtons
          fullCode={`${myCode} ♥ ${partnerCode}`}
          mbtiNickname={`궁합 ${compatibility.overallScore}점`}
          temperamentNickname={compatibility.label}
        />
      </div>

      {/* 다른 유형과 비교 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition"
        >
          다른 유형과 궁합 보기
        </button>
        <a
          href="/result"
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition text-center"
        >
          내 결과 보기
        </a>
      </div>
    </div>
  );
}
