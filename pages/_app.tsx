import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

import { PlasmicRootProvider } from "@plasmicapp/react-web";
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
      {/* Google Analytics */}
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

      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "u5iwuk6kg7");
        `}
      </Script>

      {/* Axon Pixel */}
      <Script id="axon-pixel" strategy="afterInteractive">
        {`
          var AXON_EVENT_KEY = "73622822-ec61-4730-931c-71acc3c4b177";
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://red.appalon.com/p/loader.js";
          var e = document.getElementsByTagName("script")[0];
          e.parentNode.insertBefore(s, e);
        `}
      </Script>

      {/* Plasmic-rendered page */}
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
