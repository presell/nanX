"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
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
        // Redirect after success
        return_url: `${window.location.origin}/payment-success`,
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

export default function StripePaymentElement() {
  const [clientSecret, setClientSecret] = useState("");

  // Call API route when the component mounts
  useEffect(() => {
    async function loadIntent() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    }

    loadIntent();
  }, []);

  if (!clientSecret) return <div>Loading payment form…</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
