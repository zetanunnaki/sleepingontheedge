import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calculator,
  Compass,
  Coffee,
  BookOpen,
  Library,
  Zap,
  FileText,
} from "lucide-react";
import { getAllContent } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Every tool, guide, glossary term, and reference on SleepingOnTheEdge — organized by what you're trying to accomplish.",
  alternates: { canonical: canonical("/resources") },
};

interface ResourceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  count?: number;
}

function ResourceCard({ icon: Icon, title, description, href, count }: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-300 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-xl text-white group-hover:text-indigo-300">
            {title}
          </h3>
          {count !== undefined && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-400">
              {count}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
          Open <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export default function ResourcesPage() {
  const guidesCount = getAllContent("guides").length;
  const roundupsCount = getAllContent("roundups").length;
  const reviewsCount = getAllContent("reviews").length;

  return (
    <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Library size={12} /> Everything in one place
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Sleep <span className="italic text-indigo-300">resources.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Every tool, guide, review, glossary term, and reference — organized
          by what you&apos;re trying to accomplish.
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-4xl space-y-16">
        {/* Interactive Tools */}
        <section>
          <h2 className="font-serif text-3xl text-white">
            Interactive <span className="italic text-indigo-300">tools</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Free, no-signup calculators and quizzes. Use them as often as you like.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResourceCard
              icon={Compass}
              title="Sleep Edge Quiz"
              description="4 questions, a personalized starting point matched to your specific sleep problem."
              href="/tools/sleep-edge-quiz"
            />
            <ResourceCard
              icon={Calculator}
              title="Sleep Cycle Calculator"
              description="Find the bedtime that wakes you between cycles, not in the middle of one."
              href="/tools/sleep-cycle-calculator"
            />
            <ResourceCard
              icon={Coffee}
              title="Caffeine Cutoff Calculator"
              description="Your personalized caffeine deadline based on dose and bedtime."
              href="/tools/caffeine-cutoff-calculator"
            />
            <ResourceCard
              icon={BookOpen}
              title="Sleep Glossary"
              description="28 sleep science terms explained in plain English."
              href="/glossary"
              count={28}
            />
          </div>
        </section>

        {/* Content */}
        <section>
          <h2 className="font-serif text-3xl text-white">
            Guides & <span className="italic text-indigo-300">research</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Long-form, research-cited content organized by type.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResourceCard
              icon={FileText}
              title="Protocols"
              description="Step-by-step, research-backed sleep guides."
              href="/guides"
              count={guidesCount}
            />
            <ResourceCard
              icon={Zap}
              title="The Edge"
              description="Product roundups for every layer of your stack."
              href="/best"
              count={roundupsCount}
            />
            <ResourceCard
              icon={FileText}
              title="Lab Reports"
              description="Aggregated product reviews based on buyer feedback."
              href="/reviews"
              count={reviewsCount}
            />
          </div>
        </section>

        {/* Reference */}
        <section>
          <h2 className="font-serif text-3xl text-white">
            Reference & <span className="italic text-indigo-300">navigation</span>
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResourceCard
              icon={Zap}
              title="Product Comparisons"
              description="Head-to-head matchups of the most-compared sleep products."
              href="/compare"
            />
            <ResourceCard
              icon={Library}
              title="Brands"
              description="Every brand we've covered, with all their reviewed products."
              href="/brands"
            />
            <ResourceCard
              icon={BookOpen}
              title="Tags"
              description="Browse all content by topic."
              href="/tags"
            />
            <ResourceCard
              icon={FileText}
              title="Full Sitemap"
              description="Every published page on the site, in one place."
              href="/sitemap"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
