import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

// Import your Stripe payment element component
import StripePaymentElement from "@/components/StripePaymentElement";

// Register the component so it appears inside Plasmic Studio
PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  props: {},
});

export default function PlasmicHost() {
  return PLASMIC && <PlasmicCanvasHost />;
}
