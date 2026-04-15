'use client';

import { useState, useEffect, useCallback } from 'react';

// ── 타입 정의 ──
interface TypePulseProps {
  typeCode: string; // e.g. "ENFJ-SC"
}

interface PollOption {
  emoji: string;
  label: string;
  /** Pre-seeded base vote count for realistic-looking results */
  baseVotes: number;
}

interface PollQuestion {
  id: string;
  question: string;
  options: [PollOption, PollOption, PollOption];
}

type TypeGroup = 'NF' | 'NT' | 'SF' | 'ST';

// ── 유형 그룹 판별 ──
function getTypeGroup(typeCode: string): TypeGroup {
  // typeCode 예시: "ENFJ-SC" → MBTI = "ENFJ"
  const mbti = typeCode.split('-')[0];
  const sn = mbti.charAt(1); // S or N
  const tf = mbti.charAt(2); // T or F
  const group = `${sn}${tf}`;
  if (group === 'NF' || group === 'NT' || group === 'SF' || group === 'ST') return group;
  return 'NF'; // fallback
}

// ── 그룹별 질문 데이터 (3개씩) ──
const questionsByGroup: Record<TypeGroup, PollQuestion[]> = {
  NF: [
    {
      id: 'nf-1',
      question: '친구가 고민을 말할 때 나는?',
      options: [
        { emoji: '😊', label: '일단 공감부터', baseVotes: 847 },
        { emoji: '🤔', label: '해결책 제시', baseVotes: 423 },
        { emoji: '🤗', label: '같이 울어줌', baseVotes: 631 },
      ],
    },
    {
      id: 'nf-2',
      question: '혼자 있을 때 갑자기 드는 생각은?',
      options: [
        { emoji: '🌌', label: '인생의 의미', baseVotes: 712 },
        { emoji: '💭', label: '과거 대화 복기', baseVotes: 894 },
        { emoji: '🎨', label: '창작 아이디어', baseVotes: 503 },
      ],
    },
    {
      id: 'nf-3',
      question: '감동적인 영화를 보면?',
      options: [
        { emoji: '😭', label: '펑펑 울음', baseVotes: 923 },
        { emoji: '🥹', label: '참다가 눈물 한 방울', baseVotes: 687 },
        { emoji: '📝', label: '감상문 쓰고 싶음', baseVotes: 341 },
      ],
    },
  ],
  NT: [
    {
      id: 'nt-1',
      question: '비효율적인 회의를 보면?',
      options: [
        { emoji: '😤', label: '참다가 폭발', baseVotes: 567 },
        { emoji: '📝', label: '혼자 정리', baseVotes: 892 },
        { emoji: '🚪', label: '슬쩍 빠짐', baseVotes: 445 },
      ],
    },
    {
      id: 'nt-2',
      question: '토론에서 상대가 논리 오류를 범하면?',
      options: [
        { emoji: '🎯', label: '즉시 지적', baseVotes: 734 },
        { emoji: '😏', label: '속으로 승리감', baseVotes: 612 },
        { emoji: '🤷', label: '에너지 아까워서 패스', baseVotes: 558 },
      ],
    },
    {
      id: 'nt-3',
      question: '새로운 지식을 발견했을 때?',
      options: [
        { emoji: '🐇', label: '위키 서핑 시작', baseVotes: 876 },
        { emoji: '🧪', label: '직접 실험해봄', baseVotes: 534 },
        { emoji: '📢', label: '아는 사람에게 설명', baseVotes: 423 },
      ],
    },
  ],
  SF: [
    {
      id: 'sf-1',
      question: '친구 생일 선물 고를 때?',
      options: [
        { emoji: '🎁', label: '실용적인 것', baseVotes: 645 },
        { emoji: '❤️', label: '의미있는 것', baseVotes: 823 },
        { emoji: '💰', label: '현금이 최고', baseVotes: 534 },
      ],
    },
    {
      id: 'sf-2',
      question: '단체 모임에서 나의 역할은?',
      options: [
        { emoji: '🎤', label: '분위기 메이커', baseVotes: 567 },
        { emoji: '📋', label: '총무/진행자', baseVotes: 734 },
        { emoji: '😊', label: '리액션 담당', baseVotes: 698 },
      ],
    },
    {
      id: 'sf-3',
      question: '스트레스 받으면 하는 것은?',
      options: [
        { emoji: '🛍️', label: '쇼핑 or 맛집', baseVotes: 812 },
        { emoji: '📞', label: '친구에게 전화', baseVotes: 645 },
        { emoji: '🏠', label: '집 정리/청소', baseVotes: 543 },
      ],
    },
  ],
  ST: [
    {
      id: 'st-1',
      question: '약속에 친구가 30분 늦으면?',
      options: [
        { emoji: '😊', label: '괜찮아~', baseVotes: 345 },
        { emoji: '😤', label: '조용히 화남', baseVotes: 756 },
        { emoji: '📱', label: '연락 폭격', baseVotes: 534 },
      ],
    },
    {
      id: 'st-2',
      question: '팀 프로젝트에서 내 스타일은?',
      options: [
        { emoji: '📊', label: '계획 세우고 실행', baseVotes: 867 },
        { emoji: '🔧', label: '일단 해보면서 수정', baseVotes: 623 },
        { emoji: '👀', label: '맡은 부분만 완벽히', baseVotes: 512 },
      ],
    },
    {
      id: 'st-3',
      question: '길을 잃었을 때 나는?',
      options: [
        { emoji: '🗺️', label: '지도앱 바로 켬', baseVotes: 923 },
        { emoji: '🚶', label: '감으로 걸어봄', baseVotes: 345 },
        { emoji: '🙋', label: '지나가는 사람에게 질문', baseVotes: 534 },
      ],
    },
  ],
};

const groupLabels: Record<TypeGroup, string> = {
  NF: '이상가형 (NF)',
  NT: '전략가형 (NT)',
  SF: '수호자형 (SF)',
  ST: '행동가형 (ST)',
};

const groupEmojis: Record<TypeGroup, string> = {
  NF: '💫',
  NT: '🧠',
  SF: '🤝',
  ST: '⚡',
};

// ── 로컬스토리지 헬퍼 ──
function getStoredVote(questionId: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(`poll-${questionId}`);
    if (stored !== null) return parseInt(stored, 10);
  } catch { /* 무시 */ }
  return null;
}

function storeVote(questionId: string, optionIndex: number): void {
  try {
    localStorage.setItem(`poll-${questionId}`, String(optionIndex));
  } catch { /* 무시 */ }
}

// ── 메인 컴포넌트 ──
export default function TypePulse({ typeCode }: TypePulseProps) {
  const group = getTypeGroup(typeCode);
  const questions = questionsByGroup[group];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, number | null>>({});
  const [animating, setAnimating] = useState(false);

  // 초기 로드 시 저장된 투표 불러오기
  useEffect(() => {
    const stored: Record<string, number | null> = {};
    for (const q of questions) {
      stored[q.id] = getStoredVote(q.id);
    }
    setVotes(stored);
  }, [questions]);

  const currentQuestion = questions[questionIndex];
  const userVote = votes[currentQuestion.id] ?? null;
  const hasVoted = userVote !== null;

  // 투표 처리
  const handleVote = useCallback((optionIndex: number) => {
    if (hasVoted) return;
    storeVote(currentQuestion.id, optionIndex);
    setVotes((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
  }, [hasVoted, currentQuestion.id]);

  // 다음 질문
  const nextQuestion = useCallback(() => {
    setQuestionIndex((prev) => (prev + 1) % questions.length);
  }, [questions.length]);

  // 결과 계산: baseVotes + 유저의 1표
  const getResults = useCallback(() => {
    const opts = currentQuestion.options;
    const totals = opts.map((opt, i) => opt.baseVotes + (userVote === i ? 1 : 0));
    const sum = totals.reduce((a, b) => a + b, 0);
    return opts.map((opt, i) => ({
      ...opt,
      total: totals[i],
      percent: Math.round((totals[i] / sum) * 100),
      isUserChoice: userVote === i,
    }));
  }, [currentQuestion, userVote]);

  // 투표 완료한 질문 수
  const answeredCount = questions.filter((q) => votes[q.id] !== null && votes[q.id] !== undefined).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">🗳️</span>Type Pulse
        </h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
          {groupEmojis[group]} {groupLabels[group]}
        </span>
      </div>

      {/* 질문 카운터 */}
      <div className="flex items-center gap-2 mb-4">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setQuestionIndex(i)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
              i === questionIndex
                ? 'bg-indigo-600 text-white scale-110 shadow-md'
                : votes[q.id] !== null && votes[q.id] !== undefined
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">
          {answeredCount}/{questions.length} 투표 완료
        </span>
      </div>

      {/* 질문 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4 border border-indigo-100">
        <p className="text-base font-semibold text-gray-800">{currentQuestion.question}</p>
      </div>

      {/* 옵션 or 결과 */}
      {!hasVoted ? (
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleVote(i)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group text-left"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{opt.emoji}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {getResults().map((result, i) => (
            <div key={i} className="relative">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                result.isUserChoice
                  ? 'border-indigo-300 bg-indigo-50'
                  : 'border-gray-100 bg-gray-50'
              }`}>
                <span className="text-xl shrink-0">{result.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm font-medium ${
                      result.isUserChoice ? 'text-indigo-700' : 'text-gray-600'
                    }`}>
                      {result.label}
                      {result.isUserChoice && (
                        <span className="ml-1.5 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">
                          내 선택
                        </span>
                      )}
                    </span>
                    <span className={`text-sm font-bold tabular-nums ${
                      result.isUserChoice ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {result.percent}%
                    </span>
                  </div>
                  {/* 애니메이션 바 */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        result.isUserChoice
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-gray-300'
                      }`}
                      style={{
                        width: animating ? '0%' : `${result.percent}%`,
                        transitionDelay: animating ? '0ms' : `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 text-center mt-1">
            {currentQuestion.options.reduce((sum, o) => sum + o.baseVotes, 0).toLocaleString()}+ 명 참여
          </p>
        </div>
      )}

      {/* 다음 질문 버튼 */}
      {hasVoted && (
        <button
          onClick={nextQuestion}
          className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          다음 질문 {questionIndex < questions.length - 1 ? '→' : '(처음으로)'}
        </button>
      )}
    </div>
  );
}
