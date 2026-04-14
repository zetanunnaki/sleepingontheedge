import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SleepingOnTheEdge is an independent affiliate content website — a small team of writers curating real customer reviews into honest sleep product recommendations.",
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
          SleepingOnTheEdge exists because most sleep advice on the internet is
          either thinly disguised marketing or recycled headline noise.
          We&apos;re a small team of writers trying to do something simpler:
          gather information from real customer reviews and reputable sources,
          put it in one place, and present it in plain English — so you can
          make better decisions about your sleep without doing all the digging
          yourself.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>
            <strong>Curate from customer reviews.</strong> Our product picks
            reflect patterns across thousands of verified buyer reviews on
            Amazon, Walmart, and sleep-focused communities — not personal
            endorsements.
          </li>
          <li>
            <strong>Write plain-English guides.</strong> We distill what&apos;s
            actually known about sleep into readable articles, with links to
            the underlying sources so you can check our work.
          </li>
          <li>
            <strong>Build free tools.</strong> Calculators, glossaries, and
            references that anyone can use without signing up.
          </li>
        </ul>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>
            <strong>We are not doctors.</strong> Nothing on this site is a
            substitute for a conversation with a qualified healthcare
            provider.
          </li>
          <li>
            <strong>We don&apos;t test products.</strong> We read reviews,
            we don&apos;t run a lab. When we say a product is highly rated,
            we mean thousands of verified buyers said so — not us.
          </li>
          <li>
            <strong>We don&apos;t do original research.</strong> We gather
            and present existing information — we don&apos;t run our own
            studies.
          </li>
          <li>
            <strong>We don&apos;t take paid placements.</strong> Brands cannot
            buy their way onto our shortlists.
          </li>
        </ul>
        <h2>How we make money</h2>
        <p>
          SleepingOnTheEdge participates in the Amazon Associates and Walmart
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
