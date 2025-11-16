"use client";

import React from "react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements || !isComplete) return;

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

  const disabled = !stripe || !isComplete || isSubmitting;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        onChange={(e: any) => {
          if (typeof e.complete === "boolean") {
            setIsComplete(e.complete);
          }
        }}
      />

      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop: 20,
          padding: "12px 16px",
          width: "100%",
          borderRadius: 10,
          background: "#1C3A13",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          opacity: disabled ? 0.5 : 1,
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

  const options: any = {
    clientSecret,

    // Styling
    appearance: {
      variables: {
        borderRadius: "10px",
      },
      rules: {
        ".Input": {
          border: "1px solid #D3D3D3",
          borderRadius: "10px",
          padding: "12px 14px",
          boxShadow: "none",
        },
        ".Input:focus": {
          borderColor: "#1C3A13",
          boxShadow: "0 0 0 1px #1C3A13",
        },
        ".Label": {
          fontSize: "15px",
        },
        ".Error": {
          color: "#ff4d4f",
        },
      },
    },

    // Inline layout restored
    layout: {
      type: "tabs",
    },
  };

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
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
