'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getSupabase, Profile, PROFILE_CATEGORIES, ProfileCategory } from '@/lib/supabase';
import { ProfileCard } from '@/components/ProfileCard';

type SortKey = 'votes' | 'newest' | 'name';

const MBTI_LIST = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const TEMP_LIST = [
  { value: 'S', label: '다혈' },
  { value: 'C', label: '담즙' },
  { value: 'P', label: '점액' },
  { value: 'M', label: '우울' },
];

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProfileCategory | ''>('');
  const [mbtiFilter, setMbtiFilter] = useState('');
  const [tempFilter, setTempFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('votes');

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
        .order('vote_count', { ascending: false })
        .limit(300);

      if (!error && data) setProfiles(data as Profile[]);
      setLoading(false);
    })();
  }, []);

  // ── 필터 & 정렬 ──
  const filtered = useMemo(() => {
    let list = [...profiles];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name_ko.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          (p.subcategory ?? '').toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (mbtiFilter) list = list.filter((p) => p.consensus_mbti === mbtiFilter);
    if (tempFilter)
      list = list.filter((p) => (p.consensus_temp ?? '').includes(tempFilter));

    if (sortBy === 'votes') {
      list.sort((a, b) => b.vote_count - a.vote_count);
    } else if (sortBy === 'newest') {
      list.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name_ko.localeCompare(b.name_ko, 'ko'));
    }

    return list;
  }, [profiles, query, category, mbtiFilter, tempFilter, sortBy]);

  const activeFilterCount =
    (query ? 1 : 0) + (category ? 1 : 0) + (mbtiFilter ? 1 : 0) + (tempFilter ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 헤더 */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">🗳️ 인물 유형 투표</h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl">
            셀럽, K-POP 아이돌, 영화 캐릭터 — 모두의 MBTI와 기질을 커뮤니티가 투표로 결정합니다.
            당신이 생각하는 유형은?
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/80">
            <span>🎬 영화·드라마</span>
            <span>🎤 K-POP</span>
            <span>⭐ 셀럽</span>
            <span>⚽ 스포츠</span>
            <span>💡 테크 기업가</span>
            <span>📖 애니 캐릭터</span>
          </div>
        </div>
      </section>

      {/* 검색 & 필터 */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              type="text"
              placeholder="🔍 이름으로 검색 (예: 테일러, 해리 포터)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="votes">🔥 인기순</option>
                <option value="newest">🆕 최신순</option>
                <option value="name">가나다순</option>
              </select>
            </div>
          </div>

          {/* 카테고리 칩 */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                category === ''
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            {PROFILE_CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === c.value
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {/* 고급 필터 (접힘 가능) */}
          <details className="mt-3">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-indigo-600 select-none">
              ⚙️ 고급 필터 (MBTI · 기질)
              {(mbtiFilter || tempFilter) && (
                <span className="ml-2 text-indigo-600 font-semibold">
                  활성 {(mbtiFilter ? 1 : 0) + (tempFilter ? 1 : 0)}개
                </span>
              )}
            </summary>
            <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="text-[11px] font-semibold text-gray-600 mb-1.5">MBTI 유형</div>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setMbtiFilter('')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      mbtiFilter === '' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  {MBTI_LIST.map((t) => (
                    <button
                      key={t}
                      onClick={() => setMbtiFilter(t)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        mbtiFilter === t ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-gray-600 mb-1.5">기질 포함</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setTempFilter('')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      tempFilter === '' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  {TEMP_LIST.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTempFilter(t.value)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        tempFilter === t.value ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setQuery('');
                    setCategory('');
                    setMbtiFilter('');
                    setTempFilter('');
                  }}
                  className="text-[11px] text-red-600 hover:underline"
                >
                  모든 필터 초기화
                </button>
              )}
            </div>
          </details>
        </div>
      </section>

      {/* 결과 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-3">🔍</div>
            <div className="text-gray-600 text-sm mb-2">
              {profiles.length === 0
                ? '아직 등록된 인물이 없습니다.'
                : '검색 결과가 없습니다.'}
            </div>
            {profiles.length === 0 ? (
              <p className="text-xs text-gray-400">
                데이터베이스를 아직 초기화하지 않았을 수 있어요.
              </p>
            ) : (
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('');
                  setMbtiFilter('');
                  setTempFilter('');
                }}
                className="text-indigo-600 text-xs hover:underline"
              >
                필터 초기화
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                총 <span className="font-bold text-gray-900">{filtered.length}</span>명
              </div>
              <Link
                href="/community"
                className="text-xs text-indigo-600 hover:underline"
              >
                💬 커뮤니티로 →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((p) => (
                <ProfileCard key={p.id} profile={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
