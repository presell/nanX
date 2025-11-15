// pages/checkout/1.tsx
"use client";

import dynamic from "next/dynamic";

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
