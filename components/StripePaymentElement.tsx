"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

/* -------------------------------------------------------------------------- */
/*                                Checkout Form                                */
/* -------------------------------------------------------------------------- */

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements || !isCardComplete) return;

    setIsSubmitting(true);

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement! },
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
      return;
    }

    // SUCCESS → redirect
    window.location.href = "/confirmation";
  }

  const disabled = isSubmitting || !isCardComplete;

  return (
    <form onSubmit={handleSubmit}>
      {/* ---------------- CARD INPUT STYLED WRAPPER ---------------- */}
      <div
        style={{
          border: "1px solid #D3D3D3",
          padding: "12px 14px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <CardElement
          onChange={(event) => setIsCardComplete(event.complete)}
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": { color: "#999" },
              },
              invalid: {
                color: "#ff4d4f",
              },
            },
          }}
        />
      </div>

      {/* ---------------------- PAY BUTTON ------------------------- */}
      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop: 20,
          width: "100%",
          height: "60px",              // ← NEW height
          borderRadius: "6px",          // ← NEW radius
          background: "#1C3A13",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          opacity: disabled ? 0.5 : 1,  // ← NEW opacity state
          transition: "opacity 0.2s ease",
          cursor: disabled ? "not-allowed" : "pointer",
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

/* -------------------------------------------------------------------------- */
/*                            Stripe Wrapper (NO SSR)                          */
/* -------------------------------------------------------------------------- */

function StripePaymentElementImpl({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function loadIntent() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    }
    loadIntent();
  }, [amount]);

  if (!clientSecret) {
    return <div className={className}>Loading…</div>;
  }

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}

const StripePaymentElement = dynamic(
  () => Promise.resolve(StripePaymentElementImpl),
  { ssr: false }
);

export default StripePaymentElement;
export { StripePaymentElement };
