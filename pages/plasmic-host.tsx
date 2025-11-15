import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

// Safe dynamic import — prevents SSR crash
async function registerStripeComponent() {
  if (typeof window === "undefined") return;
  const mod = await import("@/components/StripePaymentElement");
  PLASMIC.registerComponent(mod.default, {
    name: "StripePaymentElement",
    props: {
      amount: "number",
    },
  });
}

registerStripeComponent();

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
