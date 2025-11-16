"use client";

import React from "react"; // ← REQUIRED because cloneElement is used
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState, FormEvent } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

/* -------------------------------------------------------------------------- */
/*                               Checkout Form                                */
/* -------------------------------------------------------------------------- */

function CheckoutForm({ isCompleteOverride = false }: { isCompleteOverride?: boolean }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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

  const isDisabled = !stripe || isSubmitting || !isCompleteOverride;
  const buttonOpacity = isDisabled ? 0.5 : 1;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        onChange={(event) => {
          window.dispatchEvent(
            new CustomEvent("payment-complete-change", {
              detail: { complete: event.complete },
            })
          );
        }}
      />

      <button
        type="submit"
        disabled={isDisabled}
        style={{
          marginTop: 20,
          padding: "12px 16px",
          width: "100%",
          borderRadius: 10,
          background: "#1C3A13",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          opacity: buttonOpacity,
          transition: "opacity 0.2s ease",
          cursor: isDisabled ? "not-allowed" : "pointer",
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
/*                         Main PaymentElement Wrapper                         */
/* -------------------------------------------------------------------------- */

export default function StripePaymentElement({
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
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
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
            },
          },
        }}
      >
        <CompletionStateProvider>
          <CheckoutForm />
        </CompletionStateProvider>
      </Elements>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*      Provide "complete" state from the PaymentElement to form              */
/* -------------------------------------------------------------------------- */

function CompletionStateProvider({ children }: any) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      setComplete(e.detail.complete);
    };

    window.addEventListener("payment-complete-change", handler);
    return () => window.removeEventListener("payment-complete-change", handler);
  }, []);

  return React.cloneElement(children, { isCompleteOverride: complete });
}
