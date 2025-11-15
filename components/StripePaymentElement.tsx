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
// Inner checkout form
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

      {message && <div style={{ marginTop: 12, color: "red" }}>{message}</div>}
    </form>
  );
}

// ------------------
// Main exported component
// ------------------
export default function StripePaymentElement({
  amount,
  className,
}: {
  /** User-friendly dollars, e.g. 44.9 for $44.90 */
  amount: number;
  className?: string;
}) {
  // SSR guard — do NOT render Stripe on the server, just show a stub.
  if (typeof window === "undefined") {
    console.log("[STRIPE_DEBUG] StripePaymentElement rendered on server, returning stub.");
    return <div className={className}>Loading payment form…</div>;
  }

  const [clientSecret, setClientSecret] = useState("");

  // Convert dollars -> cents ONCE
  const stripeAmount = Math.round(Number(amount) * 100);

  console.log("[STRIPE_DEBUG] render", {
    amountProp: amount,
    stripeAmount,
    hasWindow: typeof window !== "undefined",
  });

  useEffect(() => {
    console.log("[STRIPE_DEBUG] useEffect -> loadIntent", { stripeAmount });

    async function loadIntent() {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // send CENTS to the API
          body: JSON.stringify({ amount: stripeAmount }),
        });

        const data = await res.json();
        console.log("[STRIPE_DEBUG] intent response", data);

        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("[STRIPE_DEBUG] No clientSecret returned", data);
        }
      } catch (err) {
        console.error("[STRIPE_DEBUG] Failed to load payment intent", err);
      }
    }

    loadIntent();
  }, [stripeAmount]);

  if (!clientSecret) {
    return <div className={className}>Loading payment form…</div>;
  }

  console.log("[STRIPE_DEBUG] Rendering <Elements> with clientSecret");

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
