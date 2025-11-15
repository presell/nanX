// plasmic-init.ts
"use client";

import dynamic from "next/dynamic";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

// ⛔ DO NOT import StripePaymentElement directly
// import StripePaymentElement from "@/components/StripePaymentElement";

// ✅ Instead: dynamic import, client-only
const StripePaymentElement = dynamic(
  () => import("@/components/StripePaymentElement"),
  { ssr: false }
);

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "4jNtNf7ennmHcnVPPcPauY",
      token:
        "6so33r9xTOt0c2tdo9yC8OoZDfPjnn1E7hbQoRe5f5iPAdvb0Kk3FatMcU9BA6wgT8z8ABEb3ZcxTZ3uNg",
    },
  ],
  preview: false,
});

// Register Stripe safely
PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  importPath: "@/components/StripePaymentElement",
  props: {
    amount: { type: "number", defaultValue: 49.90 },
    className: "string",
  },
});
