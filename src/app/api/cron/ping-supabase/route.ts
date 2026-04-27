import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

/**
 * Supabase Free-tier Auto-pause Prevention
 *
 * Supabase 무료 플랜은 7일간 DB 활동이 없으면 프로젝트를 자동으로 일시정지한다.
 * 이 라우트는 Vercel Cron으로 매주 1회 호출돼서 가벼운 SELECT 쿼리를 실행해
 * "활동 중" 상태를 유지한다.
 *
 * Cron schedule: vercel.json `0 0 * * 1` (매주 월요일 UTC 00:00 = KST 09:00)
 *
 * 보안: Vercel Cron은 자동으로 Authorization 헤더에 CRON_SECRET을 보낸다.
 * Vercel Cron 외부에서 호출하지 못하게 검증.
 */
export async function GET(request: Request) {
  // Vercel Cron 시그니처 검증
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.CRON_SECRET;

  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase not configured', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }

  try {
    // 가장 가벼운 쿼리: count(head:true)는 데이터를 반환하지 않고 카운트만 가져옴
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase pinged successfully — 7-day pause prevented',
      timestamp: new Date().toISOString(),
      profilesCount: count,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
