import Link from "next/link";
import { Moon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600/20 shadow-[0_0_60px_rgba(79,70,229,0.4)]">
        <Moon size={40} className="text-indigo-300" />
      </div>
      <p className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
        404 — Lost in the Dark
      </p>
      <h1 className="mt-4 font-serif text-6xl leading-[1.05] text-white sm:text-7xl">
        This page is{" "}
        <span className="italic text-indigo-300">still asleep.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-slate-400">
        We couldn&apos;t find what you were looking for. It may have been moved,
        renamed, or never existed in the first place.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-105"
      >
        <ArrowLeft size={18} /> Back to base
      </Link>
    </div>
  );
}
