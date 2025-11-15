/**
 * @plasmicImport StripePaymentElement
 */
"use client";

import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

export default function PlasmicHost() {
  React.useEffect(() => {
    // Register StripePaymentElement only in the browser
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
