'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase, Profile, ProfileVote, PROFILE_CATEGORIES } from '@/lib/supabase';
import { TypeBadge } from './TypeBadge';

const catMap = Object.fromEntries(PROFILE_CATEGORIES.map((c) => [c.value, c]));

function initials(name: string): string {
  const clean = name.replace(/\([^)]*\)/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return ((parts[0][0] || '') + (parts[1][0] || '')).toUpperCase();
}

// 날짜 기반 결정적 선택 (매일 같은 인물)
function dayIndex(): number {
  const d = new Date();
  const dayNum = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
  return dayNum;
}

export function TodaysDebateHero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [votes, setVotes] = useState<ProfileVote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supa = getSupabase();
      if (!supa) {
        setLoading(false);
        return;
      }

      // vote_count 높은 top 10 중 날짜로 결정적 선택
      const { data: list } = await supa
        .from('profiles')
        .select('*')
        .order('vote_count', { ascending: false })
        .limit(12);

      if (!list || list.length === 0) {
        setLoading(false);
        return;
      }

      const pick = (list as Profile[])[dayIndex() % list.length];
      setProfile(pick);

      const { data: voteRows } = await supa
        .from('profile_votes')
        .select('*')
        .eq('profile_id', pick.id);

      setVotes((voteRows ?? []) as ProfileVote[]);
      setLoading(false);
    })();
  }, []);

  if (loading || !profile) return null;

  // MBTI 투표 집계
  const mbtiMap = new Map<string, number>();
  votes.forEach((v) => mbtiMap.set(v.mbti_type, (mbtiMap.get(v.mbti_type) ?? 0) + 1));
  const topMbti = Array.from(mbtiMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const cat = catMap[profile.category];

  return (
    <div className="w-full max-w-2xl mb-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/20 via-pink-500/20 to-purple-600/20 backdrop-blur rounded-3xl border border-white/20 p-6 sm:p-8">
        {/* 배경 장식 */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
              🔥 오늘의 토론 인물
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-4 leading-snug">
            <span className="text-amber-300">{profile.name_ko}</span>의 성격 유형은?
          </h2>

          <div className="flex items-start gap-4">
            {/* 썸네일 */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/20 shrink-0">
              {profile.thumbnail ? (
                <img
                  src={profile.thumbnail}
                  alt={profile.name_ko}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-pink-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-black">
                    {initials(profile.name_en)}
                  </span>
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              {cat && (
                <span className="inline-block bg-white/10 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/80 mb-1">
                  {cat.emoji} {cat.label}
                </span>
              )}
              {profile.description && (
                <p className="text-xs text-white/70 leading-relaxed line-clamp-2 mb-2">
                  {profile.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                🗳️ <strong className="font-bold">{profile.vote_count.toLocaleString()}</strong>명 투표 참여
              </div>
            </div>
          </div>

          {/* 현재 TOP 3 */}
          {topMbti.length > 0 && (
            <div className="mt-5 p-4 bg-black/20 backdrop-blur rounded-xl border border-white/10">
              <div className="text-[10px] text-white/60 mb-2 font-semibold uppercase tracking-wider">
                현재 커뮤니티 TOP 3
              </div>
              <div className="space-y-1.5">
                {topMbti.map(([mbti, count], i) => {
                  const pct = Math.round((count / votes.length) * 100);
                  return (
                    <div key={mbti} className="flex items-center gap-2">
                      <span className="text-amber-300 font-black text-xs w-4">{i + 1}</span>
                      <div className="w-14 shrink-0">
                        <TypeBadge mbti={mbti} size="sm" />
                      </div>
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-white/70 tabular-nums w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/profiles/${profile.slug}`}
            className="mt-5 flex items-center justify-center gap-2 w-full px-5 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-xl font-black text-sm shadow-lg shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            나도 투표하기 →
          </Link>
          <Link
            href="/profiles"
            className="mt-2 block text-center text-xs text-white/60 hover:text-white transition"
          >
            전체 인물 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
