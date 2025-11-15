"use client";

import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import "@/plasmic-init"; // <-- ensures StripePaymentElement gets registered

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
