import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { getAllTags } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse every article on SleepStackHQ by topic — from circadian science and supplements to sleep tech and environment optimization.",
  alternates: { canonical: canonical("/tags") },
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          The Index
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Browse by <span className="italic text-indigo-300">topic.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Every article on SleepStackHQ is tagged so you can dig into the
          topics that matter to your stack.
        </p>
      </header>

      <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-3">
        {tags.length === 0 ? (
          <p className="text-sm text-slate-500">No tags yet.</p>
        ) : (
          tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
            >
              <Tag size={14} className="text-indigo-400" />
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
