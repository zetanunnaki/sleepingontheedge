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
    <div className="container relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
      <JsonLd data={definedTermSchema} />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <BookOpen size={12} /> Reference
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Sleep <span className="italic text-indigo-300">glossary.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Plain-English definitions for every term you&apos;ll see across the
          site — from adenosine to zeitgebers.
        </p>
      </header>

      {/* Jump nav */}
      <nav className="mt-12 flex flex-wrap justify-center gap-2">
        {sorted.map((e) => (
          <a
            key={e.term}
            href={`#${slugify(e.term)}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:border-indigo-500/40 hover:text-white"
          >
            {e.term}
          </a>
        ))}
      </nav>

      <dl className="mt-16 space-y-10">
        {sorted.map((e) => (
          <div
            key={e.term}
            id={slugify(e.term)}
            className="scroll-mt-24 border-l-2 border-indigo-500/40 pl-6"
          >
            <dt className="font-serif text-3xl text-white">{e.term}</dt>
            <dd className="mt-3 text-base leading-relaxed text-slate-300">
              {e.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
