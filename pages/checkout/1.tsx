"use client";

import * as React from "react";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";
import { PlasmicCheckout1 } from "../../components/plasmic/nan_x/PlasmicCheckout1";
import { useRouter } from "next/router";
import ClientOnly from "@/components/ClientOnly";

function Checkout1() {
  const router = useRouter();

  return (
    <PageParamsProvider__
      route={router?.pathname}
      params={router?.query}
      query={router?.query}
    >
      <ClientOnly>
        <PlasmicCheckout1 />
      </ClientOnly>
    </PageParamsProvider__>
  );
}

export default Checkout1;
