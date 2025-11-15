// pages/api/create-payment-intent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Rely on the account's default API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { amount } = req.body;

    if (amount == null || isNaN(Number(amount))) {
      return res.status(400).json({ error: "Invalid or missing amount." });
    }

    // `amount` is already in dollars from Plasmic; convert to cents once
    const amountInCents = Math.round(Number(amount) * 100);

    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      clientSecret: intent.client_secret,
    });
  } catch (err: any) {
    console.error("Error creating payment intent:", err);
    return res.status(500).json({ error: err?.message ?? "Server error." });
  }
}
