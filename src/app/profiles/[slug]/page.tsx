'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getSupabase, Profile, PROFILE_CATEGORIES } from '@/lib/supabase';
import { VotePanel } from '@/components/VotePanel';
import { SimilarProfiles } from '@/components/SimilarProfiles';
import { TypeBadge } from '@/components/TypeBadge';

const catMap = Object.fromEntries(PROFILE_CATEGORIES.map((c) => [c.value, c]));

function initials(name: string): string {
  const clean = name.replace(/\([^)]*\)/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return ((parts[0][0] || '') + (parts[1][0] || '')).toUpperCase();
}

function pickGradient(seed: string): string {
  const gradients = [
    'from-rose-400 to-pink-600',
    'from-amber-400 to-orange-600',
    'from-lime-400 to-emerald-600',
    'from-sky-400 to-indigo-600',
    'from-violet-400 to-purple-600',
    'from-fuchsia-400 to-pink-600',
    'from-teal-400 to-cyan-600',
    'from-yellow-400 to-red-500',
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const supa = getSupabase();
      if (!supa) {
        setLoading(false);
        return;
      }
      const { data, error } = await supa
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile(data as Profile);
        // view_count 증가 (fire & forget)
        supa
          .from('profiles')
          .update({ view_count: (data as Profile).view_count + 1 })
          .eq('id', (data as Profile).id)
          .then(() => {});
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        불러오는 중...
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-3">🤔</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">인물을 찾을 수 없어요</h1>
        <p className="text-sm text-gray-500 mb-6">
          URL이 잘못되었거나 아직 등록되지 않았을 수 있어요.
        </p>
        <Link
          href="/profiles"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
        >
          ← 인물 목록으로
        </Link>
      </div>
    );
  }

  const cat = catMap[profile.category];
  const gradient = pickGradient(profile.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 */}
      <section className="relative">
        {/* 배경 이미지 or 그라데이션 */}
        <div className="absolute inset-0 overflow-hidden">
          {profile.thumbnail ? (
            <div className="absolute inset-0">
              <img
                src={profile.thumbnail}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover blur-2xl opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
            </div>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-14">
          <Link
            href="/profiles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 transition"
          >
            ← 인물 목록
          </Link>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* 썸네일 */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/20 shrink-0">
              {profile.thumbnail ? (
                <img
                  src={profile.thumbnail}
                  alt={profile.name_ko}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
                >
                  <span className="text-white text-5xl font-black opacity-90">
                    {initials(profile.name_en)}
                  </span>
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 text-white">
              {cat && (
                <span className="inline-block bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
                  {cat.emoji} {cat.label}
                  {profile.subcategory ? ` · ${profile.subcategory}` : ''}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">
                {profile.name_ko}
              </h1>
              <p className="text-sm text-white/70 mb-4">{profile.name_en}</p>
              {profile.description && (
                <p className="text-[15px] sm:text-base text-white/95 max-w-xl leading-relaxed drop-shadow">
                  {profile.description}
                </p>
              )}
              {profile.consensus_mbti && (
                <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-xl px-3 py-2">
                  <span className="text-[10px] text-white/80">커뮤니티 합의</span>
                  <TypeBadge
                    mbti={profile.consensus_mbti}
                    temp={profile.consensus_temp}
                    size="md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 통계 바 */}
          <div className="mt-6 flex gap-3 text-white/90 text-xs">
            <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5">
              🗳️ <strong className="font-bold">{profile.vote_count.toLocaleString()}</strong> 투표
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5">
              👁️ <strong className="font-bold">{profile.view_count.toLocaleString()}</strong> 조회
            </div>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <VotePanel profile={profile} />

        <SimilarProfiles profile={profile} />

        {/* 푸터 CTA */}
        <div className="mt-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5">
          <p className="text-sm text-gray-700 mb-3">
            <strong>나의 유형</strong>은 어떨까요? 아직 검사를 안 해봤다면 지금 해보세요.
          </p>
          <Link
            href="/test"
            className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow hover:shadow-md transition-all"
          >
            192가지 유형 검사 시작 →
          </Link>
        </div>
      </section>
    </div>
  );
}
