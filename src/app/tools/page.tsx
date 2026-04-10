import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Wrench, Coffee, Compass } from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, science-backed sleep tools — calculate cycles, time your last coffee, and optimize your wind-down.",
  alternates: { canonical: canonical("/tools") },
};

const TOOLS = [
  {
    href: "/tools/sleep-stack-quiz",
    icon: Compass,
    title: "Sleep Stack Quiz",
    description:
      "Answer four questions, get a personalized starting point — articles and tools matched to your specific problem.",
  },
  {
    href: "/tools/sleep-cycle-calculator",
    icon: Calculator,
    title: "Sleep Cycle Calculator",
    description:
      "Find the bedtime that lets you wake at the end of a 90-minute cycle — not in the middle of one.",
  },
  {
    href: "/tools/caffeine-cutoff-calculator",
    icon: Coffee,
    title: "Caffeine Cutoff Calculator",
    description:
      "Caffeine has a 5-hour half-life. Find the latest you can have a coffee without wrecking your deep sleep.",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Wrench size={12} /> The Workshop
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Free sleep <span className="italic text-indigo-300">tools.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Science-backed calculators and trackers — no signup, no email, no
          BS. Use them as often as you like.
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <tool.icon size={22} />
            </div>
            <h2 className="mt-6 font-serif text-2xl text-white group-hover:text-indigo-300">
              {tool.title}
            </h2>
            <p className="mt-3 flex-1 text-sm text-slate-400">
              {tool.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
              Open tool <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
