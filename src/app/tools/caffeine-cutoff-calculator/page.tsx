import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CaffeineCalculator } from "@/components/tools/CaffeineCalculator";
import { JsonLd, softwareAppSchema } from "@/components/seo/JsonLd";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Caffeine Cutoff Calculator",
  description:
    "Find the latest you can drink coffee without wrecking your sleep. Based on a 5-hour caffeine half-life and your bedtime.",
  alternates: { canonical: canonical("/tools/caffeine-cutoff-calculator") },
};

export default function CaffeineCutoffPage() {
  return (
    <div className="container relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 md:py-24">
      <JsonLd data={softwareAppSchema({ name: "Caffeine Cutoff Calculator", description: "Find the latest you can drink coffee without wrecking your sleep.", url: "/tools/caffeine-cutoff-calculator" })} />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> All Tools
      </Link>
      <header className="animate-fade-up mt-6 text-center sm:mt-8">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          The Workshop · Free Tool
        </span>
        <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Caffeine cutoff{" "}
          <span className="italic text-indigo-300">calculator.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          Caffeine has a 5-hour half-life — that 4 PM coffee is still 25%
          active at midnight. Here&apos;s your real cutoff time.
        </p>
      </header>

      <div className="animate-fade-up delay-150 mt-10 sm:mt-12">
        <CaffeineCalculator />
      </div>

      <section className="mt-12 sm:mt-16">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Why this <span className="italic text-indigo-300">matters.</span>
        </h2>
        <div className="prose prose-invert prose-base mt-6 max-w-none sm:prose-lg prose-headings:font-serif prose-headings:text-white prose-p:text-slate-300 prose-p:leading-[1.75]">
          <p>
            Caffeine works by blocking adenosine receptors — the molecule
            that makes you feel sleepy. Even when you fall asleep with caffeine
            still in your system, it suppresses deep (slow-wave) sleep by up to
            20%. You can sleep 8 hours and still feel like you slept 6.
          </p>
          <p>
            The 5-hour figure is an average for healthy adults. People with the
            slow variant of the CYP1A2 enzyme can have half-lives closer to 8
            hours. If coffee at noon still keeps you up, you&apos;re probably
            one of them.
          </p>
        </div>
      </section>
    </div>
  );
}
