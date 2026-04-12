import Link from "next/link";
import {
  Moon,
  ChevronRight,
  ArrowRight,
  Activity,
  Compass,
  Calculator,
  Coffee,
  BookOpen,
  Library,
  ShieldCheck,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { getAllContentAcrossTypes } from "@/lib/content";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CoverFallback } from "@/components/article/CoverFallback";
import { siteConfig } from "@/lib/site";
import { getProducts } from "@/lib/products";

const FEATURED_PRODUCT_IDS = [
  "hatch-restore-2",
  "manta-sleep-mask",
  "magnesium-breakthrough",
  "oura-ring-gen-3",
  "bearaby-cotton-napper",
  "yogasleep-dohm",
  "chilipad-cube",
  "swanwick-blue-blockers",
];

const TOOL_CARDS = [
  {
    href: "/tools/sleep-stack-quiz",
    icon: Compass,
    title: "Sleep Stack Quiz",
    body: "Four questions, a personalized starting point.",
  },
  {
    href: "/tools/sleep-cycle-calculator",
    icon: Calculator,
    title: "Sleep Cycle Calculator",
    body: "Find the bedtime that wakes you between cycles.",
  },
  {
    href: "/tools/caffeine-cutoff-calculator",
    icon: Coffee,
    title: "Caffeine Cutoff Calculator",
    body: "Stop drinking coffee at the actual safe time.",
  },
  {
    href: "/glossary",
    icon: BookOpen,
    title: "Sleep Glossary",
    body: "Plain-English definitions for every term.",
  },
];

const TRUST_PILLARS = [
  {
    icon: Library,
    title: "Research, not opinions",
    body: "Every health claim sourced from peer-reviewed studies and clinical guidelines.",
  },
  {
    icon: Layers,
    title: "Aggregated reviews",
    body: "Picks reflect patterns across thousands of verified buyer reviews — never a single opinion.",
  },
  {
    icon: ShieldCheck,
    title: "No paid placement",
    body: "Brands cannot buy their way onto our shortlists. Affiliate revenue never moves rankings.",
  },
];

export default function HomePage() {
  const all = getAllContentAcrossTypes();
  const recent = all.slice(0, 6);
  const featured = all[0];

  return (
    <>
      {/* HERO */}
      <header className="relative z-10 px-6 pb-24 pt-16 text-center md:pb-32 md:pt-20">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Activity size={12} /> The 2026 Sleep Optimization Guide
        </div>
        <h1 className="mx-auto mb-8 max-w-5xl font-serif text-5xl leading-[1.05] sm:text-6xl md:text-8xl">
          Sleep better, on{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-amber-200 bg-clip-text italic text-transparent">
            evidence — not hype.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
          SleepStackHQ aggregates peer-reviewed research, clinical guidelines,
          and verified buyer reviews into one place — so you can build a
          better night&apos;s sleep without wading through marketing copy.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <Link
            href="/tools/sleep-stack-quiz"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] sm:w-auto md:px-10 md:py-5"
          >
            Take the 4-Question Quiz <ChevronRight size={18} />
          </Link>
          <Link
            href="/best"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-base font-bold transition-all hover:border-slate-600 hover:bg-slate-800 sm:w-auto md:px-10 md:py-5"
          >
            Browse the Stacks
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <pillar.icon className="h-5 w-5 text-indigo-400" />
              <p className="mt-3 text-sm font-bold text-white">
                {pillar.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* FEATURED GLASS CARDS */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Feature Card */}
          <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:rounded-[40px] md:p-10 lg:col-span-8">
            <div
              aria-hidden
              className="absolute right-0 top-0 p-10 opacity-10 transition-opacity group-hover:opacity-20"
            >
              <Moon size={200} />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Featured Guide
              </span>
              <h2 className="mb-6 mt-4 font-serif text-3xl leading-tight md:text-4xl">
                {featured?.frontmatter.title ??
                  "How to Reset Your Sleep Schedule"}
              </h2>
              <p className="mb-8 max-w-md text-slate-400">
                {featured?.frontmatter.description ??
                  "A research-backed week-long plan to fix your sleep."}
              </p>
              <Link
                href={featured?.url ?? "/guides"}
                className="group/cta inline-flex items-center gap-2 font-bold text-indigo-400"
              >
                Read the full guide{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover/cta:translate-x-2"
                />
              </Link>
            </div>
          </div>

          {/* Side Data Card */}
          <div className="flex flex-col justify-between gap-8 rounded-[32px] bg-indigo-600 p-8 text-white md:rounded-[40px] md:p-10 lg:col-span-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">
                Quick Protocol
              </span>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl">
                The Wind-Down
              </h3>
            </div>
            <div className="space-y-5">
              {[
                "8:00 PM — Dim overhead lights",
                "9:30 PM — Phone out of bedroom",
                "10:00 PM — Bedroom at 65°F",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>
            <Link
              href="/guides/sleep-better-tonight-12-tips"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-100 hover:text-white"
            >
              See all 12 tips <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            The Layers
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">
            Build it{" "}
            <span className="italic text-indigo-300">layer by layer.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400">
            Sleep optimization isn&apos;t one big lever — it&apos;s a stack of
            small ones. Pick the layer that&apos;s missing from your routine.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <p className="font-serif text-2xl text-white group-hover:text-indigo-300">
                {cat.title}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {cat.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FREE TOOLS */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            The Workshop
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">
            Free <span className="italic text-indigo-300">sleep tools.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400">
            Calculators, quizzes, and references — no signup, no email, no
            tracking. Use them as often as you like.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOL_CARDS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                <tool.icon size={20} />
              </div>
              <p className="mt-5 font-serif text-xl text-white group-hover:text-indigo-300">
                {tool.title}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {tool.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                Open <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              The Shelf
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Top sleep <span className="italic text-indigo-300">picks.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-400">
              Highly-rated sleep products curated from aggregated buyer
              reviews. Click through for the full review or jump to the
              listing.
            </p>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-white"
          >
            All brands <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {getProducts(FEATURED_PRODUCT_IDS).map((p) => (
            <a
              key={p.id}
              href={p.amazonLink}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <CoverFallback seed={p.id} label={p.brand} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                  {p.brand}
                </p>
                <h3 className="mt-2 font-serif text-xl text-white group-hover:text-indigo-300">
                  {p.name}
                </h3>
                <p className="mt-2 text-base font-bold text-indigo-400">
                  {p.price}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                  View on Amazon <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/best"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-white"
          >
            See all product roundups <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* RECENT ARTICLES */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              The Archive
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Latest <span className="italic text-indigo-300">findings.</span>
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-white"
          >
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-slate-400">
            Add MDX files in <code>src/content/</code> to populate this list.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((item) => (
              <ArticleCard key={item.url} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* CLOSING CTA */}
      <section className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-600 to-indigo-900 p-10 text-center md:rounded-[40px] md:p-16">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Ready to fix the layer that&apos;s costing you the most?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-indigo-100 md:text-lg">
            Take the 4-question quiz and we&apos;ll point you at the article,
            tool, or habit that will move your sleep the most — based on your
            answers, not a generic checklist.
          </p>
          <Link
            href="/tools/sleep-stack-quiz"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-black/20 transition-all hover:scale-[1.02] hover:bg-indigo-100"
          >
            Start the quiz <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
