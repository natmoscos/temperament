import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const VALID_AMOUNTS = [9900, 24900, 3900]; // 허용 결제 금액

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount, fullCode, mbtiType, temperamentCode } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return Response.json({ error: '필수 파라미터가 누락되었습니다.' }, { status: 400 });
    }

    // 유효한 결제 금액 검증
    if (!VALID_AMOUNTS.includes(amount)) {
      return Response.json({ error: '유효하지 않은 결제 금액입니다.' }, { status: 400 });
    }

    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      return Response.json({ error: '결제 시스템이 설정되지 않았습니다.' }, { status: 500 });
    }

    // 중복 결제 확인
    const { data: existing } = await supabase
      .from('payments')
      .select('id, status')
      .eq('order_id', orderId)
      .single();

    if (existing?.status === 'confirmed') {
      return Response.json({ success: true, orderId });
    }

    // Toss 결제 확인 API 호출
    const tossResponse = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      // 실패 기록 저장
      await supabase.from('payments').upsert({
        order_id: orderId,
        payment_key: paymentKey,
        amount,
        status: 'failed',
        full_code: fullCode,
        mbti_type: mbtiType,
        temperament_code: temperamentCode,
      }, { onConflict: 'order_id' });

      return Response.json(
        { error: tossData.message || '결제 확인에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 결제 성공 — Supabase에 저장
    await supabase.from('payments').upsert({
      order_id: orderId,
      payment_key: paymentKey,
      amount,
      status: 'confirmed',
      full_code: fullCode,
      mbti_type: mbtiType,
      temperament_code: temperamentCode,
      confirmed_at: new Date().toISOString(),
    }, { onConflict: 'order_id' });

    return Response.json({ success: true, orderId });
  } catch (err) {
    console.error('Payment confirm error:', err);
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
