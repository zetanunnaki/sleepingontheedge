import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "SleepStackHQ is an independent publication helping people sleep better through honest reviews and science-backed guides.",
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
        About <span className="italic text-indigo-300">SleepStackHQ.</span>
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
          SleepStackHQ exists for one reason: most sleep advice on the internet
          is written by people who don&apos;t test what they recommend. We do.
        </p>
        <h2>Our editorial standards</h2>
        <ul>
          <li>
            <strong>We buy our own gear.</strong> No PR loans. No free samples
            we don&apos;t disclose.
          </li>
          <li>
            <strong>We test for at least 30 nights</strong> before publishing a
            full review.
          </li>
          <li>
            <strong>We update.</strong> When a product changes, we say so —
            with a date stamp.
          </li>
        </ul>
        <h2>How we make money</h2>
        <p>
          SleepStackHQ is a member of the Amazon Associates and Walmart
          Associates programs. When you buy something through our links, we
          earn a small commission at no extra cost to you. This is the only
          way we get paid — we don&apos;t take sponsored posts, paid
          placement, or &quot;rankings&quot; from manufacturers.
        </p>
        <h2>Get in touch</h2>
        <p>
          Have feedback, a correction, or a product you&apos;d like us to
          test? Email us at <code>hello@sleepstackhq.com</code>.
        </p>
      </div>
    </div>
  );
}
