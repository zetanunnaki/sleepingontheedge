import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SleepQuiz } from "@/components/tools/SleepQuiz";

export const metadata: Metadata = {
  title: "Sleep Stack Quiz",
  description:
    "Answer four quick questions and get a personalized starting point — articles, tools, and habits matched to your specific sleep problem.",
};

export default function SleepStackQuizPage() {
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
          Sleep stack <span className="italic text-indigo-300">quiz.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Four quick questions. A personalized starting point — no signup, no
          email, no medical advice.
        </p>
      </header>

      <div className="mt-12">
        <SleepQuiz />
      </div>
    </div>
  );
}
