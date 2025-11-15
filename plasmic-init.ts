import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import StripePaymentElement from "./components/StripePaymentElement"; // ✅ REQUIRED STATIC IMPORT

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

// ✅ STATIC REGISTRATION (required for CLI sync + GitHub publishing)
PLASMIC.registerComponent(StripePaymentElement, {
  name: "StripePaymentElement",
  importPath: "./components/StripePaymentElement", // 🔥 THIS is the missing piece
  props: {
    amount: {
      type: "number",
      defaultValue: 1,
    },
    className: "string",
  },
});
