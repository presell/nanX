"use client";

import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

// Register Stripe component ONLY on client
async function registerStripe() {
  if (typeof window === "undefined") return;

  const mod = await import("@/components/StripePaymentElement");

  PLASMIC.registerComponent(mod.default, {
    name: "StripePaymentElement",
    props: {
      amount: {
        type: "number",
        defaultValue: 44.9,
      },
      className: {
        type: "string",
      },
    },
  });
}

registerStripe();

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
