"use client";

import dynamic from "next/dynamic";

// Dynamically load entire Plasmic checkout component on the client only
const PlasmicCheckout1 = dynamic(
  () =>
    import("../../components/plasmic/nan_x/PlasmicCheckout1").then(
      (m) => m.PlasmicCheckout1
    ),
  { ssr: false }
);

export default function Checkout1() {
  return <PlasmicCheckout1 />;
}
