import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

// IMPORTANT:
// Never import Stripe components here.
// They must be registered dynamically at runtime inside the browser only.

export default function PlasmicHost() {
  React.useEffect(() => {
    async function register() {
      if (typeof window === "undefined") return;

      const mod = await import("@/components/StripePaymentElement");

      PLASMIC.registerComponent(mod.default, {
        name: "StripePaymentElement",
        props: {
          amount: "number",
          className: "string",
        },
      });
    }

    register();
  }, []);

  return <PlasmicCanvasHost />;
}
