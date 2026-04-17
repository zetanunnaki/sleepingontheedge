import Script from "next/script";

/**
 * Google Analytics 4 setup.
 *
 * Replace GA_MEASUREMENT_ID below with your real GA4 measurement ID
 * (format: G-XXXXXXXXXX). Until you do, the script tag won't render —
 * tracking calls in the codebase will no-op safely.
 *
 * Once GA4 is approved and your affiliate accounts are live, simply
 * paste your real ID and every affiliate click on the site will start
 * reporting to your GA4 property automatically — no other code changes needed.
 */
const GA_MEASUREMENT_ID = "G-XZCTS0QGYX";

export function GoogleAnalytics() {
  // Don't render the script until a real measurement ID is set.
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
