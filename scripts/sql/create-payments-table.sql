-- 결제 및 AI 리포트 저장 테이블
-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL,
  payment_key TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'confirmed' | 'failed'
  full_code TEXT,            -- e.g. 'INTJ-CM'
  mbti_type TEXT,            -- e.g. 'INTJ'
  temperament_code TEXT,     -- e.g. 'CM'
  report_data JSONB,         -- Claude가 생성한 리포트 JSON
  report_generated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

-- orderId로 빠른 조회 인덱스
CREATE INDEX IF NOT EXISTS payments_order_id_idx ON payments (order_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON payments (status);

-- RLS 비활성화 (서버사이드 서비스 롤로만 접근)
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
