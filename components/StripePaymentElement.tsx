// components/StripePaymentElement.tsx
"use client";

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

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(
      // PaymentIntent client secret is passed by Elements in context
      undefined,
      {
        payment_method: {
          card: cardElement!,
        },
        return_url: `${window.location.origin}/confirmation`,
      }
    );

    if (error) {
      console.error("[Stripe] confirmCardPayment error:", error);
      setMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: "16px",
              color: "#000",
              "::placeholder": { color: "#999" },
            },
          },
        }}
      />

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
// Main wrapper
// ------------------
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
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (!data?.clientSecret) return;

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("[Stripe] Error loading payment intent:", err);
      }
    }

    loadIntent();
  }, [amount]);

  if (!clientSecret) {
    return <div className={className}>Loading payment form…</div>;
  }

  return (
    <div className={className}>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: { theme: "stripe" },
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}

// ------------------
// No-SSR export
// ------------------
const StripePaymentElement = dynamic(
  () => Promise.resolve(StripePaymentElementImpl),
  { ssr: false }
);

export default StripePaymentElement;
export { StripePaymentElement };
