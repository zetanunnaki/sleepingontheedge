import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms under which you use SleepingOnTheEdge. We are an affiliate content site — here's what that means for how you use our content and links.",
  alternates: { canonical: canonical("/terms") },
};

export default function TermsPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-500">
        Last updated: April 12, 2026
      </p>
      <div
        className="prose prose-invert prose-lg mt-10 max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-12 prose-h2:text-3xl
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-li:text-slate-300"
      >
        <h2>Acceptance of terms</h2>
        <p>
          By accessing or using {siteConfig.name} ({siteConfig.url}), you agree
          to be bound by these Terms of Service and our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/disclaimer">Disclaimer</Link>. If you do not agree,
          please do not use the site.
        </p>

        <h2>What this site is</h2>
        <p>
          {siteConfig.name} is an independent affiliate content website
          operated by a small team of writers. We publish curated product
          recommendations and general sleep-related educational content. We
          are not clinicians, not product testers, and not affiliated with any
          product manufacturer. See our{" "}
          <Link href="/methodology">methodology</Link> for how we work.
        </p>

        <h2>Use of content</h2>
        <p>
          The content on this site — articles, images, guides, calculators,
          and other materials — is provided for your personal,
          non-commercial use. You may:
        </p>
        <ul>
          <li>Read our content on this site</li>
          <li>Share links to our pages on social media and with friends</li>
          <li>Quote short excerpts with attribution and a link back</li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>Copy, republish, or redistribute our articles without permission</li>
          <li>Use our content to train machine learning models without permission</li>
          <li>Scrape the site in ways that violate standard crawling etiquette</li>
          <li>Remove attribution or copyright notices</li>
          <li>Use our content in ways that imply endorsement of your product or service</li>
        </ul>

        <h2>Affiliate relationships</h2>
        <p>
          {siteConfig.name} participates in affiliate programs including the
          Amazon Services LLC Associates Program, Walmart Associates, and
          others. When you click a product link and make a purchase, we may
          receive a commission at no extra cost to you. As an Amazon
          Associate, we earn from qualifying purchases. See our{" "}
          <Link href="/disclaimer">disclaimer</Link> for full details on how
          affiliate relationships work and how they do (and do not) influence
          our content.
        </p>

        <h2>No professional advice</h2>
        <p>
          Content on {siteConfig.name} is for general informational and
          educational purposes only. It is <strong>not</strong> medical,
          health, legal, or financial advice. Always consult a qualified
          professional before making decisions about your health, medications,
          supplements, or any product that affects a medical condition.
        </p>

        <h2>No guarantees</h2>
        <p>
          We make no guarantees about the accuracy, completeness, or
          usefulness of any content on this site. Product information can
          change. Prices change. Research evolves. We revisit our articles
          periodically but cannot guarantee that any given piece of
          information is currently accurate or applicable to your situation.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.name},
          its writers, owners, and affiliates disclaim all liability for any
          direct, indirect, incidental, consequential, or special damages
          arising from your use of the site, its content, or any product or
          service purchased through our affiliate links. Your use of the site
          is entirely at your own risk. Nothing in these terms is intended to
          exclude liability that cannot be excluded under applicable law.
        </p>

        <h2>Third-party links</h2>
        <p>
          Our articles link to third-party websites and retailers. We are not
          responsible for the content, accuracy, privacy practices, or
          product availability on any third-party site. Once you click an
          external link, the terms and policies of that site govern your
          interaction with it.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The &quot;Last
          updated&quot; date at the top of this page reflects the most recent
          revision. Continued use of the site after changes means you accept
          the updated terms.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the United States and the
          state in which the site operator is based, without regard to
          conflict-of-law principles. Any dispute arising from the use of
          this site will be resolved in the courts of that jurisdiction.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <code>hello@sleepingontheedge.com</code>.
        </p>
      </div>
    </div>
  );
}
