import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import "../styles/globals.css";

// --- Fix TS error by declaring gtag on Window (inline) ---
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-NV5QCKX1X7", {
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
    <>
      {/* Google Analytics script loader */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-NV5QCKX1X7"
      />

      {/* GA initialization */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;

          gtag('js', new Date());
          gtag('config', 'G-NV5QCKX1X7', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
