import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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

      <Component {...pageProps} />
    </>
  );
}
