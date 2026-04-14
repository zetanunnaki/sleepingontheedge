import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getAllContentAcrossTypes } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search",
  description: "Browse every article on SleepingOnTheEdge in one place.",
  alternates: { canonical: canonical("/search") },
};

export default function SearchPage() {
  const items = getAllContentAcrossTypes();

  return (
    <div className="container relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="animate-fade-up mt-8 text-center sm:mt-10">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Search size={12} /> Browse
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Everything we&apos;ve{" "}
          <span className="italic text-indigo-300">published.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          Looking for something specific? Press{" "}
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          anywhere on the site to open the live search.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:mt-6">
          <span className="h-px w-8 bg-slate-700" />
          <span>{items.length} total articles</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      <div className="animate-fade-up delay-150 mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <ArticleCard key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
