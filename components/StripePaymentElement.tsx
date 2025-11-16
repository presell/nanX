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
/*                             Checkout Form                                   */
/* -------------------------------------------------------------------------- */

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");

  const isZipComplete = zip.trim().length >= 5;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements || !isCardComplete || !isZipComplete) return;

    setIsSubmitting(true);

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: {
          address: { postal_code: zip },
        },
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = "/confirmation";
  }

  const disabled = isSubmitting || !isCardComplete || !isZipComplete;

  return (
    <form onSubmit={handleSubmit}>
      {/* -------- COMBINED INPUT WRAPPER -------- */}
      <div style={{ width: "100%" }}>
        
        {/* ---- CARD FIELD (Top) ---- */}
        <div
          style={{
            border: "1px solid #D3D3D3",
            borderBottom: "none",
            borderRadius: "10px 10px 0 0",
            backgroundColor: "#fff",
            padding: "14px",
            minHeight: "55px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
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
                  fontWeight: "400",
                  "::placeholder": { color: "#999" },
                },
                invalid: { color: "#ff4d4f" },
              },
            }}
          />
        </div>

        {/* ---- ZIP FIELD (Bottom) ---- */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          placeholder="Billing ZIP Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #D3D3D3",
            borderTop: "1px solid #D3D3D3",
            borderRadius: "0 0 10px 10px",
            backgroundColor: "#fff",
            fontSize: "16px",
            fontWeight: "400",       // matches Stripe's weight
            color: "#000",           // fixes invisible text issue
            padding: "14px",
            height: "55px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* -------- PAY BUTTON -------- */}
      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop: 20,
          width: "100%",
          height: "60px",
          borderRadius: "6px",
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

/* -------------------------------------------------------------------------- */
/*                         Stripe Wrapper (NO SSR)                             */
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
