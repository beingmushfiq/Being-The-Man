import { NextResponse } from 'next/server';
// @ts-ignore
import BkashGateway from 'bkash-payment-gateway';

const bkash = new BkashGateway({
  baseUrl: process.env.BKASH_BASE_URL || 'https://checkout.sandbox.bka.sh/v1.2.0-beta',
  key: process.env.BKASH_APP_KEY || 'sandbox_key',
  secret: process.env.BKASH_APP_SECRET || 'sandbox_secret',
  username: process.env.BKASH_USERNAME || 'sandbox_user',
  password: process.env.BKASH_PASSWORD || 'sandbox_pass',
});

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const paymentData = await bkash.createPayment({
      amount: amount.toString(),
      orderID: orderId,
      intent: 'sale',
      currency: 'BDT',
      merchantCallbackURL: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/checkout/bkash/callback`,
    });

    return NextResponse.json(paymentData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
