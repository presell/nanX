// plasmic-init.ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import StripePaymentElement from "./components/StripePaymentElement";

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

PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  importPath: "./components/StripePaymentElement",
  props: {
    amount: {
      type: "number",
      defaultValue: 44.9, // dollars in Plasmic props
    },
    className: {
      type: "string",
    },
  },
});
