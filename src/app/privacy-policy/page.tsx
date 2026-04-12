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
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
        Privacy <span className="italic text-indigo-300">Policy.</span>
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-500">
        Last updated: April 9, 2026
      </p>
      <div
        className="prose prose-invert prose-lg mt-10 max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-12 prose-h2:text-3xl
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-li:text-slate-300
          prose-code:text-amber-300 prose-code:before:content-none prose-code:after:content-none"
      >
        <h2>Information we collect</h2>
        <p>
          SleepingOnTheEdge is a static website. We do not require accounts and we
          do not collect personal information directly. Our hosting provider
          may log standard request data (IP address, user agent, timestamp)
          for security and analytics purposes.
        </p>
        <h2>Cookies</h2>
        <p>
          We do not set first-party tracking cookies. Third-party services
          linked from this site (such as Amazon and Walmart) may set their own
          cookies once you click an outbound link. Their cookie practices are
          governed by their respective privacy policies.
        </p>
        <h2>Affiliate disclosure</h2>
        <p>
          SleepingOnTheEdge is a participant in the Amazon Services LLC Associates
          Program and the Walmart Creator/Associates program, both affiliate
          advertising programs designed to provide a means for sites to earn
          fees by linking to Amazon.com and Walmart.com. As an Amazon
          Associate we earn from qualifying purchases.
        </p>
        <h2>Children</h2>
        <p>
          Our site is not directed to children under 13, and we do not
          knowingly collect personal information from children.
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
