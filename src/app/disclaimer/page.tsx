import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "SleepStackHQ provides general educational information about sleep and is not a substitute for medical advice. Read our full disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
        Disclaimer
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
          prose-li:text-slate-300"
      >
        <h2>No medical advice</h2>
        <p>
          The content on SleepStackHQ — including articles, guides, product
          summaries, calculators, and the glossary — is provided for general
          informational and educational purposes only. It is{" "}
          <strong>
            not intended to be a substitute for professional medical advice,
            diagnosis, or treatment.
          </strong>{" "}
          Always seek the advice of a qualified healthcare provider with any
          questions you may have regarding a medical condition, including
          sleep disorders.
        </p>
        <p>
          Never disregard professional medical advice or delay seeking it
          because of something you have read on this website. If you think
          you may have a medical emergency, call your doctor or emergency
          services immediately.
        </p>

        <h2>No clinical testing claims</h2>
        <p>
          SleepStackHQ does not operate a clinical testing facility, conduct
          original peer-reviewed studies, or publish primary research. Our
          editorial content is based on:
        </p>
        <ul>
          <li>Aggregated verified-buyer reviews from major retailers,</li>
          <li>
            Published peer-reviewed research and clinical guidelines from
            recognized organizations, and
          </li>
          <li>Manufacturer-published specifications and documentation.</li>
        </ul>
        <p>
          When we say a product is &quot;highly rated&quot; or &quot;top
          recommended,&quot; we are summarizing patterns we observe across
          publicly available reviews and references — not making clinical or
          performance claims of our own.
        </p>

        <h2>No guarantee of results</h2>
        <p>
          Sleep is highly individual. Strategies, products, or supplements
          that work well for some readers may not work for others, and may
          have side effects or contraindications depending on your health
          status and medications. We make no guarantees about the
          effectiveness of any product, protocol, or technique mentioned on
          the site.
        </p>

        <h2>Affiliate links</h2>
        <p>
          SleepStackHQ participates in affiliate programs, including the
          Amazon Services LLC Associates Program and the Walmart Associates
          program. We may earn a commission when you purchase a product
          through one of our links, at no additional cost to you. Affiliate
          relationships do not influence which products we feature.
        </p>

        <h2>External links</h2>
        <p>
          Articles on this site may link to third-party websites for further
          reading. We are not responsible for the content, privacy practices,
          or accuracy of any third-party site.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer? Email{" "}
          <code>hello@sleepstackhq.com</code>.
        </p>
      </div>
    </div>
  );
}
