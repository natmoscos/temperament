-- ============================================================
-- PROFILES & VOTING SYSTEM SCHEMA  (Supabase 전용)
-- Supabase Dashboard → SQL Editor 에 전체 복붙 후 Run.
-- 문제가 생기면 섹션 1~7을 따로따로 실행해도 됩니다.
-- ============================================================

-- ── 0. Extensions (uuid 생성용) ──
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ── 1. profiles 테이블 ──
CREATE TABLE IF NOT EXISTS public.profiles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name_ko         text NOT NULL,
  name_en         text NOT NULL,
  category        text NOT NULL,
  subcategory     text,
  thumbnail       text,
  description     text,
  consensus_mbti  text,
  consensus_temp  text,
  vote_count      integer NOT NULL DEFAULT 0,
  view_count      integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_category   ON public.profiles(category);
CREATE INDEX IF NOT EXISTS idx_profiles_vote_count ON public.profiles(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_created    ON public.profiles(created_at DESC);


-- ── 2. profile_votes 테이블 ──
CREATE TABLE IF NOT EXISTS public.profile_votes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id        uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  voter_fingerprint text NOT NULL,
  mbti_type         text NOT NULL,
  temperament_1     text NOT NULL,
  temperament_2     text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profile_votes_unique UNIQUE (profile_id, voter_fingerprint)
);

CREATE INDEX IF NOT EXISTS idx_profile_votes_profile_id ON public.profile_votes(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_votes_mbti       ON public.profile_votes(mbti_type);


-- ── 3. 투표 count 증가 트리거 ──
CREATE OR REPLACE FUNCTION public.fn_increment_profile_vote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
     SET vote_count = vote_count + 1
   WHERE id = NEW.profile_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profile_vote_insert ON public.profile_votes;

CREATE TRIGGER trg_profile_vote_insert
AFTER INSERT ON public.profile_votes
FOR EACH ROW
EXECUTE FUNCTION public.fn_increment_profile_vote_count();


-- ── 4. GRANT (anon/authenticated가 REST API로 접근 가능하도록) ──
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles      TO anon, authenticated;
GRANT SELECT, INSERT         ON public.profile_votes TO anon, authenticated;


-- ── 5. RLS 활성화 ──
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_votes  ENABLE ROW LEVEL SECURITY;


-- ── 6. profiles 정책 ──
DROP POLICY IF EXISTS profiles_select_all     ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_all     ON public.profiles;
DROP POLICY IF EXISTS profiles_update_all     ON public.profiles;

CREATE POLICY profiles_select_all ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY profiles_insert_all ON public.profiles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY profiles_update_all ON public.profiles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);


-- ── 7. profile_votes 정책 ──
DROP POLICY IF EXISTS profile_votes_select_all ON public.profile_votes;
DROP POLICY IF EXISTS profile_votes_insert_all ON public.profile_votes;

CREATE POLICY profile_votes_select_all ON public.profile_votes
  FOR SELECT
  USING (true);

CREATE POLICY profile_votes_insert_all ON public.profile_votes
  FOR INSERT
  WITH CHECK (
    char_length(voter_fingerprint) BETWEEN 8 AND 64
    AND temperament_1 IN ('S','C','P','M')
    AND temperament_2 IN ('S','C','P','M')
  );


-- ============================================================
-- 확인: 아래 쿼리로 테이블이 생성됐는지 체크
-- SELECT table_name FROM information_schema.tables
--  WHERE table_schema='public' AND table_name IN ('profiles','profile_votes');
-- ============================================================
