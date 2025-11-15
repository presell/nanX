"use client";

import { useEffect, useState } from "react";
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

// ----- Inner form -----
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: any) {
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
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        style={{
          marginTop: 20,
          padding: "12px 16px",
          width: "100%",
          borderRadius: 8,
          background: "#000",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        {isSubmitting ? "Processing…" : "Pay Now"}
      </button>

      {message && (
        <div style={{ marginTop: 12, color: "red" }}>{message}</div>
      )}
    </form>
  );
}

export default function StripePaymentElement({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const [clientSecret, setClientSecret] = useState("");

  // ❗ Skip everything inside /plasmic-host (fixes publish)
  const isPlasmicHost =
    typeof window !== "undefined" &&
    window.location.pathname.includes("plasmic-host");

  useEffect(() => {
    if (isPlasmicHost) return; // 🔥 Prevents Plasmic sync crash

    async function loadIntent() {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Failed to load payment intent", err);
      }
    }

    loadIntent();
  }, [amount, isPlasmicHost]);

  if (isPlasmicHost) {
    return <div className={className}>Stripe disabled in Plasmic Studio</div>;
  }

  if (!clientSecret) {
    return <div className={className}>Loading payment form…</div>;
  }

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
