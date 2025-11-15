import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { amount } = req.body;

    if (
      amount === undefined ||
      amount === null ||
      Number.isNaN(Number(amount))
    ) {
      return res.status(400).json({ error: "Invalid or missing amount." });
    }

    // Amount is already in cents from the frontend
    const amountInCents = Math.round(Number(amount));

    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: intent.client_secret,
    });
  } catch (err: any) {
    console.error("Stripe PI error:", err);
    res.status(500).json({ error: err.message });
  }
}
