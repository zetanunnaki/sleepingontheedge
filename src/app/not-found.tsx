import Link from "next/link";
import { Moon, ArrowLeft, Search, BookOpen, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="animate-fade-up relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6">
      <div className="animate-pulse-glow flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600/20 shadow-[0_0_60px_rgba(79,70,229,0.4)]">
        <Moon size={40} className="text-indigo-300" />
      </div>
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 sm:mt-10">
        404 — Lost in the Dark
      </p>
      <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
        This page is{" "}
        <span className="italic text-indigo-300">still asleep.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
        We couldn&apos;t find what you were looking for. It may have been moved,
        renamed, or never existed in the first place.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-500 sm:mt-10 sm:px-8 sm:py-4 sm:text-base"
      >
        <ArrowLeft size={18} /> Back to base
      </Link>
      <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-3 text-[10px] font-bold uppercase tracking-[0.15em] sm:mt-12">
        <Link
          href="/best"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:text-white"
        >
          <BookOpen size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
          Edge Picks
        </Link>
        <Link
          href="/tools"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:text-white"
        >
          <Compass size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
          Tools
        </Link>
        <Link
          href="/search"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:text-white"
        >
          <Search size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
          Search
        </Link>
      </div>
    </div>
  );
}
