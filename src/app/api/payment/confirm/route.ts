import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      return Response.json({ error: 'Payment not configured' }, { status: 500 });
    }

    // Verify amount matches expected price
    if (amount !== 3900) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Confirm payment with Toss API
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data.message || 'Payment failed' }, { status: 400 });
    }

    return Response.json({ success: true, orderId: data.orderId });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
