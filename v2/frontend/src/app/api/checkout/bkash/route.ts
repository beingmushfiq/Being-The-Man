import { NextResponse } from 'next/server';
import BkashGateway from 'bkash-payment-gateway';

const bkash = new BkashGateway({
  baseURL: process.env.BKASH_BASE_URL || 'https://checkout.sandbox.bka.sh/v1.2.0-beta',
  key: process.env.BKASH_APP_KEY || 'sandbox_key',
  secret: process.env.BKASH_APP_SECRET || 'sandbox_secret',
  username: process.env.BKASH_USERNAME || 'sandbox_user',
  password: process.env.BKASH_PASSWORD || 'sandbox_pass',
});

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const paymentData = await bkash.createPayment({
      amount: Number(amount),
      orderID: orderId,
      intent: 'sale',
    });

    return NextResponse.json(paymentData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
