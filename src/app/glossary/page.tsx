import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import glossaryData from "@/data/glossary.json";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, canonical } from "@/lib/site";

interface GlossaryEntry {
  term: string;
  definition: string;
}

export const metadata: Metadata = {
  title: "Sleep Glossary",
  description:
    "Plain-English definitions of the sleep science terms you'll see across SleepingOnTheEdge — from adenosine to zeitgebers.",
  alternates: { canonical: canonical("/glossary") },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function GlossaryPage() {
  const entries = glossaryData as GlossaryEntry[];
  const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term));

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "SleepingOnTheEdge Sleep Glossary",
    url: `${siteConfig.url}/glossary`,
    hasDefinedTerm: sorted.map((e) => ({
      "@type": "DefinedTerm",
      name: e.term,
      description: e.definition,
      url: `${siteConfig.url}/glossary#${slugify(e.term)}`,
    })),
  };

  return (
    <div className="container relative z-10 mx-auto max-w-4xl px-5 py-12 sm:px-6 md:py-24">
      <JsonLd data={definedTermSchema} />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="animate-fade-up mt-8 text-center sm:mt-10">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <BookOpen size={12} /> Reference
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Sleep <span className="italic text-indigo-300">glossary.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          Plain-English definitions for every term you&apos;ll see across the
          site — from adenosine to zeitgebers.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:mt-6">
          <span className="h-px w-8 bg-slate-700" />
          <span>{sorted.length} terms</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      {/* Jump nav */}
      <nav className="animate-fade-up delay-100 mt-10 flex flex-wrap justify-center gap-2 sm:mt-12">
        {sorted.map((e) => (
          <a
            key={e.term}
            href={`#${slugify(e.term)}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:text-white"
          >
            {e.term}
          </a>
        ))}
      </nav>

      <dl className="animate-fade-up delay-200 mt-12 space-y-8 sm:mt-16 sm:space-y-10">
        {sorted.map((e) => (
          <div
            key={e.term}
            id={slugify(e.term)}
            className="scroll-mt-24 border-l-2 border-indigo-500/40 pl-5 sm:pl-6"
          >
            <dt className="font-serif text-2xl text-white sm:text-3xl">{e.term}</dt>
            <dd className="mt-3 text-base leading-[1.75] text-slate-300">
              {e.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
