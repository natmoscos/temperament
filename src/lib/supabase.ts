import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!_supabase) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// 하위 호환
export const supabase = {
  from: (...args: Parameters<SupabaseClient['from']>) => {
    const client = getSupabase();
    if (!client) throw new Error('Supabase not configured');
    return client.from(...args);
  },
};

// ── 타입 정의 ──
export interface Post {
  id: string;
  nickname: string;
  type_code: string; // e.g. "ENFP-SC"
  title: string;
  content: string;
  likes: number;
  created_at: string;
  comment_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  nickname: string;
  type_code: string;
  content: string;
  created_at: string;
}

// ── 닉네임 생성 ──
const adjectives = [
  '용감한', '조용한', '불꽃', '잔잔한', '날카로운', '따뜻한', '자유로운',
  '신비한', '단단한', '재빠른', '깊은', '밝은', '진지한', '엉뚱한',
  '느긋한', '열정의', '차분한', '대담한',
];
const nouns = [
  '다람쥐', '여우', '올빼미', '사슴', '독수리', '고래', '호랑이',
  '나비', '늑대', '돌고래', '팬더', '매', '수달', '고양이',
  '펭귄', '사자', '토끼', '부엉이',
];

export function generateNickname(typeCode: string): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${typeCode} ${adj}${noun}`;
}
