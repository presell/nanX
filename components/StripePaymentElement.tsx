// components/StripePaymentElement.tsx
"use client";

/**
 * @plasmicImport StripePaymentElement from "@/components/StripePaymentElement"
 */

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

// ------------------
// Inner form
// ------------------
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

// ------------------
// Main component
// ------------------
export default function StripePaymentElement(props: {
  amount: number; // dollars, e.g. 44.9
  className?: string;
}) {
  const { amount, className } = props;
  const [clientSecret, setClientSecret] = useState("");

  // amount comes in as dollars; convert to cents for the API
  const dollars = Number(amount) || 0;

  useEffect(() => {
    async function loadIntent() {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: dollars }),
        });

        if (!res.ok) {
          console.error("Failed to create payment intent", await res.text());
          return;
        }

        const data = await res.json();
        if (!data?.clientSecret) {
          console.error("No clientSecret returned from API", data);
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Failed to load payment intent", err);
      }
    }

    loadIntent();
  }, [dollars]);

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
