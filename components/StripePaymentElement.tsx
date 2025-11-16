function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!elements) return;

    // Listen for card completeness
    const paymentElement = elements.getElement("payment");

    if (!paymentElement) return;

    const handler = (event: any) => {
      setIsComplete(event.complete);
    };

    paymentElement.on("change", handler);

    return () => {
      paymentElement.off("change", handler);
    };
  }, [elements]);

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
      console.error("[Stripe] confirmPayment error:", error);
      setMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
    }
  }

  const buttonOpacity = isComplete ? 1 : 0.5;
  const isDisabled = !stripe || isSubmitting || !isComplete;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

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
          opacity: buttonOpacity, // 🔥 opacity toggle
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
