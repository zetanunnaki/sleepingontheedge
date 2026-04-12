import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SleepingOnTheEdge is an independent publication helping people make better sleep decisions through research-backed guides and aggregated buyer reviews.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
        About <span className="italic text-indigo-300">SleepingOnTheEdge.</span>
      </h1>
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
        <p>
          SleepingOnTheEdge exists because most sleep advice on the internet is
          either thinly disguised marketing or recycled headline science.
          We&apos;re trying to do something simpler: gather information from
          published studies and real buyer feedback, put it in one place,
          and present it in plain English — so you can make better decisions
          about your sleep without doing all the digging yourself.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>
            <strong>Gather and summarize.</strong> We collect information from
            peer-reviewed sleep studies, clinical guidelines, and reputable
            sources, then present it in plain English.
          </li>
          <li>
            <strong>Collect buyer feedback.</strong> Our product picks reflect
            patterns we see across thousands of verified buyer reviews — not
            personal endorsements.
          </li>
          <li>
            <strong>Build free tools.</strong> Calculators, glossaries, and
            references that anyone can use without signing up.
          </li>
        </ul>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>
            <strong>We don&apos;t give medical advice.</strong> Nothing on
            this site is a substitute for a conversation with a qualified
            healthcare provider.
          </li>
          <li>
            <strong>We don&apos;t do original research.</strong> We gather
            and present existing information — we don&apos;t run our own studies.
          </li>
          <li>
            <strong>We don&apos;t take paid placements.</strong> Brands cannot
            buy their way onto our shortlists.
          </li>
        </ul>
        <h2>How we make money</h2>
        <p>
          SleepingOnTheEdge is a participant in the Amazon Associates and Walmart
          Associates programs. When you buy something through one of our
          affiliate links, we earn a small commission at no extra cost to
          you. This is the only way we get paid. Affiliate revenue does not
          influence which products we feature.
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
