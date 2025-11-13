import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

import { PlasmicRootProvider } from "@plasmicapp/react-web";
import { PlasmicPageLoader } from "../plasmic-init";

export default function MyApp({ Component, pageProps, router }: AppProps) {
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
          gtag('config', 'G-NV5QCKX1X7');
        `}
      </Script>

      {/* Track route changes */}
      <Script id="ga-route-track" strategy="afterInteractive">
        {`
          if (typeof window !== "undefined") {
            const handleRoute = (url) => {
              if (window.gtag) {
                window.gtag("config", "G-NV5QCKX1X7", {
                  page_path: url,
                });
              }
            };

            window.addEventListener("plasmic:pageview", (e) =>
              handleRoute(e.detail?.path || window.location.pathname)
            );
          }
        `}
      </Script>

      {/* Render the page with Plasmic loader */}
      <PlasmicPageLoader>
        <Component {...pageProps} />
      </PlasmicPageLoader>
    </PlasmicRootProvider>
  );
}
