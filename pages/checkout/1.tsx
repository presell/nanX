"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// ⛔ DO NOT import PlasmicCheckout1 directly
// import { PlasmicCheckout1 } from "../../components/plasmic/nan_x/PlasmicCheckout1";

// ✅ Dynamic import the WHOLE Plasmic component tree
const PlasmicCheckout1 = dynamic(
  () =>
    import("../../components/plasmic/nan_x/PlasmicCheckout1").then(
      (m) => m.PlasmicCheckout1
    ),
  { ssr: false }
);

export default function Checkout1() {
  const router = useRouter();

  return (
    <PlasmicCheckout1
      route={router?.pathname}
      params={router?.query}
      query={router?.query}
    />
  );
}
