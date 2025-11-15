import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 2000, // $20
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: intent.client_secret,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
