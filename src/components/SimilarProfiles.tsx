'use client';

import { useEffect, useState } from 'react';
import { getSupabase, Profile } from '@/lib/supabase';
import { ProfileCard } from './ProfileCard';

// 유사도 점수:
// - 같은 카테고리 +1
// - 같은 MBTI 첫 글자(E/I) +0.5, 전체 동일 +2
// - 기질 1글자 공유 +0.5, 전체 동일 +1.5
export function SimilarProfiles({ profile }: { profile: Profile }) {
  const [similar, setSimilar] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supa = getSupabase();
      if (!supa) {
        setLoading(false);
        return;
      }
      const { data } = await supa
        .from('profiles')
        .select('*')
        .neq('id', profile.id)
        .limit(60);

      const candidates = (data ?? []) as Profile[];
      const scored = candidates.map((p) => ({
        profile: p,
        score: computeSimilarity(profile, p),
      }));
      scored.sort((a, b) => b.score - a.score);

      setSimilar(scored.slice(0, 8).map((s) => s.profile));
      setLoading(false);
    })();
  }, [profile.id]);

  if (loading || similar.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
        ✨ 비슷한 유형의 인물
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        {profile.name_ko}와(과) 같은 카테고리·MBTI·기질을 공유하는 인물들
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {similar.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}
      </div>
    </section>
  );
}

function computeSimilarity(a: Profile, b: Profile): number {
  let score = 0;
  if (a.category === b.category) score += 1;

  const mA = a.consensus_mbti ?? '';
  const mB = b.consensus_mbti ?? '';
  if (mA && mB) {
    if (mA === mB) {
      score += 2;
    } else {
      // 글자 단위 일치
      for (let i = 0; i < 4; i++) {
        if (mA[i] === mB[i]) score += 0.25;
      }
    }
  }

  const tA = a.consensus_temp ?? '';
  const tB = b.consensus_temp ?? '';
  if (tA && tB) {
    if (tA === tB) {
      score += 1.5;
    } else {
      // 공통 글자 카운트
      const common = tA.split('').filter((c) => tB.includes(c)).length;
      score += common * 0.25;
    }
  }
  return score;
}
