"use client";
/**
 * @plasmicImport StripePaymentElement from "@/components/StripePaymentElement"
 */

import dynamic from "next/dynamic";
import { useEffect, useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? "Processing…" : "Pay Now"}
      </button>
      {message && <div style={{ color: "red" }}>{message}</div>}
    </form>
  );
}

function StripePaymentElementImpl({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const [clientSecret, setClientSecret] = useState("");

  const cents = Math.round(Number(amount) * 100);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cents }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    }

    load();
  }, [cents]);

  if (!clientSecret) return <div className={className}>Loading...</div>;

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

// 🚨 THIS IS THE FIX — NEVER SSR THIS COMPONENT
export default dynamic(() => Promise.resolve(StripePaymentElementImpl), {
  ssr: false,
});
