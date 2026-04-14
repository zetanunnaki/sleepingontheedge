import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { getAllTags } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse every article on SleepingOnTheEdge by topic — from circadian science and supplements to sleep tech and environment optimization.",
  alternates: { canonical: canonical("/tags") },
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 md:py-24">
      <header className="animate-fade-up mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          The Index
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Browse by <span className="italic text-indigo-300">topic.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          Every article on SleepingOnTheEdge is tagged so you can dig into the
          topics that matter to you.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:mt-6">
          <span className="h-px w-8 bg-slate-700" />
          <span>{tags.length} tags</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      <div className="animate-fade-up delay-150 mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2 sm:mt-16 sm:gap-3">
        {tags.length === 0 ? (
          <p className="text-sm text-slate-500">No tags yet.</p>
        ) : (
          tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <Tag size={12} className="text-indigo-400 sm:h-3.5 sm:w-3.5" />
              <span>{tag.name}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-200">
                {tag.count}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
