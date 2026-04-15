'use client';

import { useEffect, useState } from 'react';
import { getSupabase, Profile, ProfileVote, getVoterFingerprint } from '@/lib/supabase';
import { TypeBadge } from './TypeBadge';

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const TEMPS = [
  { value: 'S', label: '다혈질', hint: '밝고 사교적, 즐거움 추구' },
  { value: 'C', label: '담즙질', hint: '추진력 있고 목표 지향적' },
  { value: 'P', label: '점액질', hint: '차분하고 안정적' },
  { value: 'M', label: '우울질', hint: '섬세하고 깊이 있는' },
];

const tempNameMap: Record<string, string> = {
  S: '다혈',
  C: '담즙',
  P: '점액',
  M: '우울',
};

interface Props {
  profile: Profile;
  onVoted?: (votes: ProfileVote[]) => void;
}

export function VotePanel({ profile, onVoted }: Props) {
  const [step, setStep] = useState<'mbti' | 'temp1' | 'temp2' | 'done'>('mbti');
  const [selectedMbti, setSelectedMbti] = useState<string>('');
  const [selectedTemp1, setSelectedTemp1] = useState<string>('');
  const [selectedTemp2, setSelectedTemp2] = useState<string>('');
  const [votes, setVotes] = useState<ProfileVote[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  // 기존 투표 로드 & 본인 투표 확인
  useEffect(() => {
    (async () => {
      const supa = getSupabase();
      if (!supa) return;

      const { data } = await supa
        .from('profile_votes')
        .select('*')
        .eq('profile_id', profile.id);

      const allVotes = (data ?? []) as ProfileVote[];
      setVotes(allVotes);

      const fp = getVoterFingerprint();
      const existing = allVotes.find((v) => v.voter_fingerprint === fp);
      if (existing) {
        setSelectedMbti(existing.mbti_type);
        setSelectedTemp1(existing.temperament_1);
        setSelectedTemp2(existing.temperament_2);
        setAlreadyVoted(true);
        setStep('done');
      }
    })();
  }, [profile.id]);

  async function submit() {
    if (!selectedMbti || !selectedTemp1 || !selectedTemp2) return;
    if (selectedTemp1 === selectedTemp2) {
      setError('1차와 2차 기질은 달라야 합니다.');
      return;
    }
    setSubmitting(true);
    setError('');

    const supa = getSupabase();
    if (!supa) {
      setError('서버 연결이 안 되어 있어요.');
      setSubmitting(false);
      return;
    }

    const fp = getVoterFingerprint();
    const { error: insertErr } = await supa.from('profile_votes').insert({
      profile_id: profile.id,
      voter_fingerprint: fp,
      mbti_type: selectedMbti,
      temperament_1: selectedTemp1,
      temperament_2: selectedTemp2,
    });

    if (insertErr) {
      if (insertErr.code === '23505') {
        setError('이미 투표하셨어요.');
        setAlreadyVoted(true);
        setStep('done');
      } else {
        setError('투표 저장 실패: ' + insertErr.message);
      }
      setSubmitting(false);
      return;
    }

    // 재조회
    const { data: fresh } = await supa
      .from('profile_votes')
      .select('*')
      .eq('profile_id', profile.id);

    const freshVotes = (fresh ?? []) as ProfileVote[];
    setVotes(freshVotes);
    setAlreadyVoted(true);
    setStep('done');
    setSubmitting(false);
    onVoted?.(freshVotes);
  }

  // ── 통계 집계 ──
  const mbtiStats = aggregateBy(votes, (v) => v.mbti_type);
  const temp1Stats = aggregateBy(votes, (v) => v.temperament_1);
  const temp2Stats = aggregateBy(votes, (v) => v.temperament_2);

  const topMbti = mbtiStats[0]?.value ?? null;
  const topTemp1 = temp1Stats[0]?.value ?? null;
  const topTemp2 = temp2Stats[0]?.value ?? null;

  // ── UI ──
  if (step === 'done') {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              {alreadyVoted ? '투표해주셔서 감사합니다!' : '투표 결과'}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              총 {votes.length.toLocaleString()}명이 투표했어요
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 mb-0.5">당신의 선택</div>
            <TypeBadge
              mbti={selectedMbti}
              temp={selectedTemp1 + selectedTemp2}
              size="sm"
            />
          </div>
        </div>

        {/* 상위 결과 하이라이트 */}
        {topMbti && (
          <div className="bg-white rounded-xl p-4 mb-4 border border-indigo-100">
            <div className="text-[11px] text-gray-500 mb-1">커뮤니티 1위</div>
            <div className="flex items-baseline gap-2">
              <TypeBadge mbti={topMbti} temp={(topTemp1 ?? '') + (topTemp2 ?? '')} size="lg" />
              <span className="text-xs text-gray-600">
                {Math.round(((mbtiStats[0]?.count ?? 0) / votes.length) * 100)}% 의견
              </span>
            </div>
          </div>
        )}

        {/* MBTI 통계 */}
        <StatsBar title="MBTI 투표 분포" stats={mbtiStats} total={votes.length} type="mbti" />

        {/* 1차 기질 통계 */}
        <StatsBar
          title="1차 기질"
          stats={temp1Stats}
          total={votes.length}
          type="temp"
        />

        {/* 2차 기질 통계 */}
        <StatsBar
          title="2차 기질"
          stats={temp2Stats}
          total={votes.length}
          type="temp"
        />
      </div>
    );
  }

  // ── 투표 단계 ──
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">
          {step === 'mbti' && '🗳️ MBTI 유형은?'}
          {step === 'temp1' && '🗳️ 1차 기질은?'}
          {step === 'temp2' && '🗳️ 2차 기질은?'}
        </h3>
        <div className="flex gap-1">
          <Dot active={step === 'mbti'} />
          <Dot active={step === 'temp1'} />
          <Dot active={step === 'temp2'} />
        </div>
      </div>

      {step === 'mbti' && (
        <div className="grid grid-cols-4 gap-2">
          {MBTI_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedMbti(t);
                setStep('temp1');
              }}
              className="py-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors font-bold text-xs text-gray-800"
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {step === 'temp1' && (
        <div className="space-y-2">
          {TEMPS.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setSelectedTemp1(t.value);
                setStep('temp2');
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
            >
              <span className="font-bold text-sm text-gray-900">{t.label}</span>
              <span className="text-[11px] text-gray-500">{t.hint}</span>
            </button>
          ))}
        </div>
      )}

      {step === 'temp2' && (
        <div className="space-y-2">
          {TEMPS.filter((t) => t.value !== selectedTemp1).map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setSelectedTemp2(t.value);
                // auto-submit
                setTimeout(() => submitInline(t.value), 50);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
            >
              <span className="font-bold text-sm text-gray-900">{t.label}</span>
              <span className="text-[11px] text-gray-500">{t.hint}</span>
            </button>
          ))}
          <button
            onClick={() => setStep('temp1')}
            className="w-full py-2 text-xs text-gray-500 hover:text-gray-700"
          >
            ← 1차 기질 다시 선택
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      {submitting && <p className="mt-3 text-xs text-gray-500">저장 중...</p>}
    </div>
  );

  // temp2를 즉시 전달받아 제출
  async function submitInline(temp2Value: string) {
    if (!selectedMbti || !selectedTemp1 || !temp2Value) return;
    if (selectedTemp1 === temp2Value) return;
    setSubmitting(true);
    setError('');

    const supa = getSupabase();
    if (!supa) {
      setError('서버 연결이 안 되어 있어요.');
      setSubmitting(false);
      return;
    }

    const fp = getVoterFingerprint();
    const { error: insertErr } = await supa.from('profile_votes').insert({
      profile_id: profile.id,
      voter_fingerprint: fp,
      mbti_type: selectedMbti,
      temperament_1: selectedTemp1,
      temperament_2: temp2Value,
    });

    if (insertErr) {
      if (insertErr.code === '23505') {
        setAlreadyVoted(true);
      } else {
        setError('투표 저장 실패: ' + insertErr.message);
        setSubmitting(false);
        return;
      }
    }

    const { data: fresh } = await supa
      .from('profile_votes')
      .select('*')
      .eq('profile_id', profile.id);

    const freshVotes = (fresh ?? []) as ProfileVote[];
    setVotes(freshVotes);
    setAlreadyVoted(true);
    setStep('done');
    setSubmitting(false);
    onVoted?.(freshVotes);
  }
}

// ── Helpers ──
function aggregateBy<T>(
  items: T[],
  keyFn: (item: T) => string
): { value: string; count: number; pct: number }[] {
  const map = new Map<string, number>();
  items.forEach((i) => {
    const k = keyFn(i);
    map.set(k, (map.get(k) ?? 0) + 1);
  });
  const total = items.length || 1;
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count, pct: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count);
}

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className={`block w-2 h-2 rounded-full ${active ? 'bg-indigo-600' : 'bg-gray-300'}`}
    />
  );
}

const mbtiChipColors: Record<string, string> = {
  E: 'text-amber-700',
  I: 'text-indigo-700',
  S: 'text-green-700',
  N: 'text-purple-700',
  T: 'text-cyan-700',
  F: 'text-pink-700',
  J: 'text-red-700',
  P: 'text-blue-700',
};

function StatsBar({
  title,
  stats,
  total,
  type,
}: {
  title: string;
  stats: { value: string; count: number; pct: number }[];
  total: number;
  type: 'mbti' | 'temp';
}) {
  if (total === 0 || stats.length === 0) return null;
  const show = stats.slice(0, type === 'mbti' ? 5 : 4);

  return (
    <div className="mb-3 last:mb-0">
      <div className="text-[11px] font-semibold text-gray-600 mb-1.5">{title}</div>
      <div className="space-y-1">
        {show.map((s) => (
          <div key={s.value} className="flex items-center gap-2">
            <div className="w-14 text-[11px] font-bold text-gray-700 shrink-0">
              {type === 'mbti'
                ? s.value
                : (tempNameMap[s.value] || s.value) + '질'}
            </div>
            <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${Math.max(s.pct, 2)}%` }}
              />
            </div>
            <div className="w-10 text-[10px] text-gray-500 text-right tabular-nums">
              {Math.round(s.pct)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
