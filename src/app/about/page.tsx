import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SleepingOnTheEdge is an independent sleep publication — our editorial team researches products and sleep science so you can make better decisions about your rest.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="animate-fade-up mt-6 font-serif text-[2.5rem] leading-[1.05] text-white sm:mt-8 sm:text-6xl md:text-7xl">
        About <span className="italic text-indigo-300">SleepingOnTheEdge.</span>
      </h1>
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
        <p>
          SleepingOnTheEdge is an independent sleep publication. Our editorial
          team researches sleep science, evaluates products through verified
          buyer data, and writes in-depth guides — so you can make better
          decisions about your rest without wading through marketing noise.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>
            <strong>Research products thoroughly.</strong> Every recommendation
            is backed by analysis of thousands of verified buyer reviews,
            manufacturer specs, and sleep science literature. We look for
            patterns across real-world use — not just marketing claims.
          </li>
          <li>
            <strong>Write evidence-based guides.</strong> Our sleep guides
            reference published research and link to the underlying sources
            so you can verify everything we say.
          </li>
          <li>
            <strong>Build free tools.</strong> Calculators, glossaries, and
            references that anyone can use without signing up.
          </li>
        </ul>
        <h2>Our editorial standards</h2>
        <ul>
          <li>
            <strong>No paid placements.</strong> Brands cannot buy their way
            onto our shortlists. Every product earns its spot through
            consistent performance in buyer reviews.
          </li>
          <li>
            <strong>Transparency first.</strong> We clearly disclose affiliate
            relationships on every product page. We also link to every source
            we reference so you can check our work.
          </li>
          <li>
            <strong>Not medical advice.</strong> Our content is for
            informational purposes. We always recommend consulting a
            healthcare provider for sleep disorders or medical concerns.
          </li>
        </ul>
        <h2>How we make money</h2>
        <p>
          SleepingOnTheEdge is reader-supported. We participate in the Amazon
          Associates and Walmart Associates programs. When you buy something
          through one of our links, we earn a small commission at no extra
          cost to you. This is the only way we get paid — and it never
          influences which products we recommend.
        </p>
        <h2>Get in touch</h2>
        <p>
          Have feedback, a correction, or a topic you&apos;d like us to
          cover? Email us at <code>hello@sleepingontheedge.com</code>. We read
          everything, even when we can&apos;t reply to all of it.
        </p>
      </div>
    </div>
  );
}
