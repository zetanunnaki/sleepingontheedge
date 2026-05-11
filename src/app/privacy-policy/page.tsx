import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SleepingOnTheEdge collects, uses, and protects your information, plus our affiliate disclosures.",
  alternates: { canonical: canonical("/privacy-policy") },
};

export default function PrivacyPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="animate-fade-up mt-6 font-serif text-[2.5rem] leading-[1.05] text-white sm:mt-8 sm:text-5xl md:text-6xl">
        Privacy <span className="italic text-indigo-300">Policy.</span>
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-500">
        Last updated: May 11, 2026
      </p>
      <div
        className="animate-fade-up delay-100 prose prose-invert prose-base mt-8 max-w-none sm:prose-lg sm:mt-10
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-10 prose-h2:text-2xl sm:prose-h2:mt-12 sm:prose-h2:text-3xl
          prose-p:text-slate-300 prose-p:leading-[1.75]
          prose-strong:text-white
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-li:text-slate-300 prose-li:leading-[1.75]
          prose-code:text-amber-300 prose-code:before:content-none prose-code:after:content-none"
      >
        <h2>Information we collect</h2>
        <p>
          SleepingOnTheEdge is a static website. We do not require user
          accounts and do not collect personal information directly (no
          sign-up forms, no email list). Our hosting provider (Vercel) may
          log standard server request data — IP address, browser user agent,
          and timestamp — for security and performance purposes.
        </p>

        <h2>Cookies and tracking technologies</h2>
        <p>
          We use three categories of cookies. <strong>Analytics and
          advertising cookies only load after you give explicit
          consent</strong> via the cookie banner shown on your first visit.
        </p>
        <ul>
          <li>
            <strong>Essential cookies.</strong> A single localStorage entry
            that records your cookie consent preference. This is strictly
            necessary for the site to remember your choice and does not track
            you.
          </li>
          <li>
            <strong>Analytics cookies (optional).</strong> If you accept, we
            load Google Analytics (GA4, measurement ID G-XZCTS0QGYX). GA
            sets cookies such as <code>_ga</code> and <code>_gid</code> to
            distinguish unique visitors and track page views. We have enabled
            IP anonymization. Google processes this data under its own{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            . You can opt out of Google Analytics across all websites by
            installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
          <li>
            <strong>Advertising cookies (optional).</strong> If you accept,
            Google AdSense may set cookies to serve ads based on your prior
            visits to this site and other websites. Google and its partners
            use cookies to personalize ads. You can opt out of personalized
            advertising at{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ad Settings
            </a>{" "}
            or visit{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>{" "}
            for broader industry opt-out options.
          </li>
        </ul>
        <p>
          If you decline cookies or close the banner, no analytics or
          advertising scripts are loaded and no tracking cookies are set.
          Third-party services linked from this site (such as Amazon and
          Walmart) may set their own cookies once you click an outbound
          link; their cookie practices are governed by their respective
          privacy policies.
        </p>

        <h2>How we use your information</h2>
        <p>
          The limited data we collect is used solely to understand aggregate
          site traffic patterns (which articles are read, how long visitors
          stay) and to support the site through advertising revenue. We do
          not build user profiles, we do not sell or share personal data
          with third parties for their marketing purposes, and we do not
          use your data for any purpose beyond operating this website.
        </p>

        <h2>Affiliate disclosure</h2>
        <p>
          SleepingOnTheEdge is a participant in the Amazon Services LLC
          Associates Program and the Walmart Creator/Associates program, both
          affiliate advertising programs designed to provide a means for
          sites to earn fees by linking to Amazon.com and Walmart.com. As an
          Amazon Associate we earn from qualifying purchases.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to:
        </p>
        <ul>
          <li>
            <strong>Access</strong> the personal data we hold about you.
          </li>
          <li>
            <strong>Delete</strong> your personal data. Since we do not
            maintain user accounts or store personal data beyond what Google
            Analytics collects, you can clear cookies in your browser or use
            the Google opt-out tools above to remove tracking.
          </li>
          <li>
            <strong>Withdraw consent</strong> at any time by clearing your
            browser&apos;s localStorage (which resets the cookie banner) or
            using your browser&apos;s cookie settings.
          </li>
          <li>
            <strong>Object to processing</strong> — decline cookies via
            the consent banner, and no analytics or advertising data is
            collected.
          </li>
        </ul>
        <p>
          <strong>For EU/EEA/UK residents (GDPR):</strong> Our legal basis
          for processing analytics data is your consent, given via the cookie
          banner. You may withdraw consent at any time. If you believe your
          data protection rights have been violated, you have the right to
          lodge a complaint with your local data protection authority.
        </p>
        <p>
          <strong>For California residents (CCPA):</strong> We do not sell
          personal information. You have the right to know what data is
          collected and to request its deletion.
        </p>

        <h2>Data retention</h2>
        <p>
          Google Analytics data is retained for 14 months, after which it is
          automatically deleted. We do not maintain any separate database of
          user information.
        </p>

        <h2>Children</h2>
        <p>
          Our site is not directed to children under 16 (or under 13 in
          jurisdictions where 13 is the applicable threshold), and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this privacy policy from time to time. The &quot;Last
          updated&quot; date at the top of this page reflects the most recent
          revision. Continued use of the site after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <code>privacy@sleepingontheedge.com</code>.
        </p>
      </div>
    </div>
  );
}
