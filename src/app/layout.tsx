import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "SleepingOnTheEdge Editorial" }],
  keywords: [
    "sleep optimization",
    "sleep science",
    "sleep tracker reviews",
    "magnesium for sleep",
    "circadian rhythm",
    "blue light blocking",
    "sleep guides",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sleepingontheedge",
    creator: "@sleepingontheedge",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  other: {
    // Pinterest verification — replace with your real verification code from
    // pinterest.com/business/claim-website/ once you have a Pinterest account.
    "p:domain_verify": "PINTEREST_VERIFICATION_CODE",
    // Facebook page ID — replace once you have a real Facebook page.
    "fb:pages": "FACEBOOK_PAGE_ID",
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[#020617] font-sans text-slate-50 selection:bg-indigo-500/30">
        <GoogleAnalytics />
        <JsonLd data={organizationSchema()} />
        {/* Background Aura orbs */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl"
        >
          Skip to content
        </a>
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
