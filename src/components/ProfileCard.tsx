'use client';

import Link from 'next/link';
import { Profile, PROFILE_CATEGORIES } from '@/lib/supabase';
import { TypeBadge } from './TypeBadge';

const catMap = Object.fromEntries(
  PROFILE_CATEGORIES.map((c) => [c.value, c])
);

// 이니셜을 이용한 placeholder 배경 생성
function initials(name: string): string {
  // "Suga (BTS)" 같은 괄호 표기 제거
  const clean = name.replace(/\([^)]*\)/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return ((parts[0][0] || '') + (parts[1][0] || '')).toUpperCase();
}

// slug를 기반으로 결정적인 색상 선택
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

export function ProfileCard({ profile }: { profile: Profile }) {
  const cat = catMap[profile.category];
  const gradient = pickGradient(profile.slug);

  return (
    <Link
      href={`/profiles/${profile.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      {/* 썸네일 영역 (1:1) */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {profile.thumbnail ? (
          <img
            src={profile.thumbnail}
            alt={profile.name_ko}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <span className="text-white text-4xl font-black opacity-90">
              {initials(profile.name_en)}
            </span>
          </div>
        )}
        {cat && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700 shadow">
            {cat.emoji} {cat.label}
          </span>
        )}
        {profile.vote_count > 0 && (
          <span className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-0.5 rounded-full text-xs font-semibold text-white">
            🗳️ {profile.vote_count.toLocaleString()}
          </span>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-bold text-gray-900 truncate">
            {profile.name_ko}
          </h3>
        </div>
        <p className="text-[11px] text-gray-500 truncate mb-2">{profile.name_en}</p>
        {profile.consensus_mbti && (
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="shrink-0">
              <TypeBadge mbti={profile.consensus_mbti} temp={profile.consensus_temp} size="sm" />
            </div>
            {profile.subcategory && (
              <span className="text-[10px] text-gray-400 truncate text-right min-w-0">
                {profile.subcategory}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
