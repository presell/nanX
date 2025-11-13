import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

import { PlasmicRootProvider } from "@plasmicapp/react-web";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  //
  // Google Analytics: Track route changes
  //
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", "G-NV5QCKX1X7", {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <PlasmicRootProvider>
      {/* Google Analytics loading */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-NV5QCKX1X7"
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NV5QCKX1X7', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* The actual Plasmic-rendered page */}
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
