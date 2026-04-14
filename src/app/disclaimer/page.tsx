import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "SleepingOnTheEdge provides general educational information about sleep and is not a substitute for medical advice. Read our full disclaimer.",
  alternates: { canonical: canonical("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="animate-fade-up mt-6 font-serif text-[2.5rem] leading-[1.05] text-white sm:mt-8 sm:text-5xl md:text-6xl">
        Disclaimer
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-slate-500">
        Last updated: April 9, 2026
      </p>
      <div
        className="animate-fade-up delay-100 prose prose-invert prose-base mt-8 max-w-none sm:prose-lg sm:mt-10
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-10 prose-h2:text-2xl sm:prose-h2:mt-12 sm:prose-h2:text-3xl
          prose-p:text-slate-300 prose-p:leading-[1.75]
          prose-strong:text-white
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-li:text-slate-300 prose-li:leading-[1.75]"
      >
        <h2>No medical advice</h2>
        <p>
          The content on SleepingOnTheEdge — including articles, guides, product
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

        <h2>We are writers, not testers or clinicians</h2>
        <p>
          SleepingOnTheEdge is an independent affiliate website operated by a
          small team of <strong>writers</strong>. We are not doctors, nurses,
          sleep coaches, clinicians, or licensed medical professionals of any
          kind. We do not operate a lab. We do not test products ourselves.
          We do not conduct original research.
        </p>
        <p>
          Everything on this site is written by curating publicly available
          information — primarily aggregated customer reviews from Amazon,
          Walmart, and manufacturer sites, supplemented by publicly
          available clinical references where relevant. When we say a product
          is &quot;highly rated&quot; or &quot;best for&quot; a use case, we
          are summarizing patterns in what verified buyers have written about
          the product. We are not making independent clinical, performance,
          or efficacy claims of our own.
        </p>

        <h2>No guarantee of results</h2>
        <p>
          Sleep is highly individual. Strategies, products, or supplements
          that work well for some readers may not work for others, and may
          have side effects or contraindications depending on your health
          status and medications. <strong>We make no guarantees about the
          effectiveness of any product, protocol, or technique mentioned on
          this site,</strong> and nothing here should be interpreted as a
          promise or warranty of any outcome.
        </p>

        <h2>Use at your own risk; limitation of liability</h2>
        <p>
          Your use of SleepingOnTheEdge is entirely at your own risk. To the
          maximum extent permitted by law, SleepingOnTheEdge, its writers,
          owners, and affiliates disclaim all liability for any direct,
          indirect, incidental, consequential, or special damages arising
          out of or in any way connected with your use of information on
          this site or any product purchased through our links. Nothing in
          this disclaimer is intended to exclude liability that cannot be
          excluded under applicable law.
        </p>

        <h2>Affiliate disclosure (FTC)</h2>
        <p>
          SleepingOnTheEdge is a participant in the Amazon Services LLC
          Associates Program and other affiliate programs including Walmart
          Associates. As an Amazon Associate, we earn from qualifying
          purchases. When you click a link on this site and purchase a
          product, we may receive a commission at no additional cost to
          you. These affiliate relationships do not influence our
          recommendations, which are based on aggregated customer review
          patterns and not on commission rates.
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
          <code>hello@sleepingontheedge.com</code>.
        </p>
      </div>
    </div>
  );
}
