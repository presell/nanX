"use client";

import dynamic from "next/dynamic";

// Completely disable SSR for this Plasmic page
const PlasmicCheckout1 = dynamic(
  () =>
    import("../../components/plasmic/nan_x/PlasmicCheckout1").then(
      (m) => m.PlasmicCheckout1
    ),
  { ssr: false }
);

export default function CheckoutPage() {
  return <PlasmicCheckout1 />;
}
