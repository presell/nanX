import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

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

// ---------------------------------------------------------------------------
// TEMPORARY: Register StripePaymentElement ONLY so Plasmic CLI can resolve it.
// You MUST delete this after removing Stripe components from all Plasmic pages.
// ---------------------------------------------------------------------------

PLASMIC.registerComponent(
  () => import("../components/StripePaymentElement"),
  {
    name: "StripePaymentElement",
    importPath: "../components/StripePaymentElement",
    props: {
      amount: {
        type: "number",
        defaultValue: 0,
      },
      className: {
        type: "string",
      },
    },
  }
);
