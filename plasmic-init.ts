import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import StripePaymentElement from "@/components/StripePaymentElement"; // <— IMPORTANT

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

// Register StripePaymentElement so BOTH Studio + CLI know about it
PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  importPath: "@/components/StripePaymentElement", // <- matches the import above
  props: {
    amount: {
      type: "number",
      defaultValue: 4490, // or whatever makes sense
    },
    className: {
      type: "string",
    },
  },
});
