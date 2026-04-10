import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SleepCycleCalculator } from "@/components/tools/SleepCycleCalculator";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator",
  description:
    "Find the optimal bedtime for your wake-up time — based on 90-minute REM cycles. Free, no signup.",
};

export default function SleepCycleCalculatorPage() {
  return (
    <div className="container relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> All Tools
      </Link>
      <header className="mt-8 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          The Workshop · Free Tool
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
          Sleep Cycle{" "}
          <span className="italic text-indigo-300">calculator.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Wake up at the end of a 90-minute cycle, not the middle of one. The
          difference is the difference between groggy and clear.
        </p>
      </header>

      <div className="mt-12">
        <SleepCycleCalculator />
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-white">
          How <span className="italic text-indigo-300">it works.</span>
        </h2>
        <div className="prose prose-invert prose-lg mt-6 max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-slate-300">
          <p>
            Sleep happens in repeating ~90-minute cycles of light, deep, and
            REM stages. If your alarm fires while you&apos;re mid-cycle —
            especially mid-deep-sleep — you&apos;ll feel groggy for 30+
            minutes. This phenomenon is called <em>sleep inertia</em>.
          </p>
          <p>
            This calculator works backward from your target wake time, in
            90-minute increments, plus a 14-minute average for falling asleep.
            The result is a list of bedtimes where your alarm will fire at a
            cycle <em>boundary</em> — the moment your brain is naturally
            primed to wake.
          </p>
        </div>
      </section>
    </div>
  );
}
