import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getAllContentAcrossTypes } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search",
  description: "Browse every article on SleepStackHQ in one place.",
  alternates: { canonical: canonical("/search") },
};

export default function SearchPage() {
  const items = getAllContentAcrossTypes();

  return (
    <div className="container relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Search size={12} /> Browse
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Everything we&apos;ve{" "}
          <span className="italic text-indigo-300">published.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Looking for something specific? Press{" "}
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          anywhere on the site to open the live search.
        </p>
      </header>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ArticleCard key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
