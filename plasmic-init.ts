// plasmic-init.ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import StripePaymentElement from "./components/StripePaymentElement"; // <-- IMPORTANT: relative path

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

// SINGLE source of truth for StripePaymentElement registration.
// There must be NO OTHER PLASMIC.registerComponent(...) for this name anywhere.
PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  importPath: "./components/StripePaymentElement", // <-- what CLI uses to generate imports
  props: {
    amount: {
      type: "number",
      defaultValue: 4490, // or whatever
    },
    className: {
      type: "string",
    },
  },
});
