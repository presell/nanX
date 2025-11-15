// pages/checkout/1.tsx
"use client";

import dynamic from "next/dynamic";

// Load the generated Plasmic page, but only on the client
const PlasmicCheckout1 = dynamic(
  () =>
    import("../../components/plasmic/nan_x/PlasmicCheckout1").then(
      (m) => m.PlasmicCheckout1
    ),
  {
    ssr: false,
  }
);

export default function Checkout1() {
  return <PlasmicCheckout1 />;
}
