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
  Users,
  Eye,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { getAllContentAcrossTypes, getAllContent } from "@/lib/content";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CoverFallback } from "@/components/article/CoverFallback";
import { siteConfig } from "@/lib/site";
import { getProducts } from "@/lib/products";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";

const FEATURED_PRODUCT_IDS = [
  "hatch-restore-2",
  "manta-sleep-mask",
  "coop-eden-pillow",
  "oura-ring-gen-3",
  "bearaby-cotton-napper",
  "yogasleep-dohm",
  "fitbit-charge-6",
  "swanwick-blue-blockers",
];

const TOOL_CARDS = [
  {
    href: "/tools/sleep-edge-quiz",
    icon: Compass,
    title: "Sleep Edge Quiz",
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
    icon: Users,
    title: "Curated from customer reviews",
    body: "Every pick reflects patterns across thousands of verified buyer reviews — never a single opinion, never our own testing.",
  },
  {
    icon: Eye,
    title: "Writers, not clinicians",
    body: "We're a small team of writers who put real buyer feedback into plain English. Not testers, not doctors, not paid influencers.",
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
  const roundupCount = getAllContent("roundups").length;
  const guideCount = getAllContent("guides").length;
  const reviewCount = getAllContent("reviews").length;

  return (
    <>
      {/* HERO */}
      <header className="relative z-10 px-5 pb-20 pt-12 text-center sm:px-6 md:pb-32 md:pt-20">
        <div className="animate-fade-down mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 sm:mb-8">
          <Activity size={12} /> Cutting-Edge Sleep Science
        </div>
        <h1 className="animate-fade-up mx-auto mb-6 max-w-5xl font-serif text-[2.5rem] leading-[1.02] sm:text-6xl md:mb-8 md:text-8xl">
          The sharpest sleep advice{" "}
          <span className="gradient-text-animated italic">
            on the internet.
          </span>
        </h1>
        <p className="animate-fade-up delay-100 mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:mb-10 md:text-xl">
          Honest product breakdowns and practical protocols curated from real
          buyer reviews — so you can skip the noise and actually sleep better.
        </p>
        <div className="animate-fade-up delay-200 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:gap-6">
          <Link
            href="/tools/sleep-edge-quiz"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:bg-indigo-500 sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5"
          >
            Take the 4-Question Quiz <ChevronRight size={18} />
          </Link>
          <Link
            href="/best"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-800 sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5"
          >
            Get the Edge
          </Link>
        </div>

        {/* Stats bar — credibility at a glance */}
        <div className="animate-fade-up delay-300 mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 border-y border-white/10 py-6 sm:mt-16 sm:gap-8">
          <div className="text-center">
            <p className="font-serif text-3xl text-white sm:text-4xl">
              {roundupCount}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
              Roundups
            </p>
          </div>
          <div className="border-x border-white/10 text-center">
            <p className="font-serif text-3xl text-white sm:text-4xl">
              {guideCount}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
              Guides
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-white sm:text-4xl">
              {reviewCount}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
              Reviews
            </p>
          </div>
        </div>

        {/* Trust pillars */}
        <div className="animate-fade-up delay-400 mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card rounded-2xl p-4 transition-all"
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
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
          {/* Main Feature Card */}
          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 sm:p-8 md:rounded-[40px] md:p-10 lg:col-span-8">
            <div
              aria-hidden
              className="animate-orb-drift absolute right-0 top-0 p-10 opacity-10 transition-opacity group-hover:opacity-20"
            >
              <Moon size={200} />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Featured Guide
              </span>
              <h2 className="mb-5 mt-3 font-serif text-2xl leading-tight sm:mb-6 sm:text-3xl md:text-4xl">
                {featured?.frontmatter.title ??
                  "How to Reset Your Sleep Schedule"}
              </h2>
              <p className="mb-7 max-w-md text-sm leading-relaxed text-slate-400 sm:mb-8 sm:text-base">
                {featured?.frontmatter.description ??
                  "A week-long plan to fix your sleep."}
              </p>
              <Link
                href={featured?.url ?? "/guides"}
                className="group/cta inline-flex items-center gap-2 font-bold text-indigo-400 hover:text-indigo-300"
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
          <div className="flex flex-col justify-between gap-6 rounded-[28px] bg-gradient-to-br from-indigo-500 to-indigo-700 p-7 text-white sm:gap-8 sm:p-8 md:rounded-[40px] md:p-10 lg:col-span-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">
                Quick Protocol
              </span>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl">
                The Wind-Down
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {[
                "8:00 PM — Dim overhead lights",
                "9:30 PM — Phone out of bedroom",
                "10:00 PM — Bedroom at 65°F",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold backdrop-blur-sm">
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
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mb-8 sm:mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            The Edges
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Sharpen every{" "}
            <span className="italic text-indigo-300">edge.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Better sleep isn&apos;t one big fix — it&apos;s a handful of small
            edges. Find the one that&apos;s missing from your routine.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[28px] sm:p-7"
            >
              <p className="font-serif text-xl text-white group-hover:text-indigo-300 sm:text-2xl">
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
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mb-8 sm:mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            The Workshop
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Free <span className="italic text-indigo-300">sleep tools.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Calculators, quizzes, and references — no signup, no email, no
            tracking. Use them as often as you like.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {TOOL_CARDS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[28px] sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-transform group-hover:scale-110">
                <tool.icon size={20} />
              </div>
              <p className="mt-5 font-serif text-lg text-white group-hover:text-indigo-300 sm:text-xl">
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
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              <Sparkles size={12} /> The Shelf
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Top sleep <span className="italic text-indigo-300">picks.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Highly-rated sleep products curated from aggregated buyer
              reviews. Click through to Amazon or Walmart.
            </p>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-white"
          >
            All brands <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {getProducts(FEATURED_PRODUCT_IDS).map((p) => (
            <TrackedAffiliateLink
              key={p.id}
              href={p.amazonLink}
              productId={p.id}
              productName={p.name}
              brand={p.brand}
              price={p.price}
              retailer="amazon"
              location="homepage_featured"
              className="group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[28px]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-slate-950/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  {p.brand}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-serif text-base leading-tight text-white group-hover:text-indigo-300 sm:text-lg">
                  {p.name}
                </h3>
                <p className="mt-2 text-base font-bold text-indigo-400">
                  {p.price}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-400 sm:text-xs">
                  View on Amazon <ArrowRight size={12} />
                </span>
              </div>
            </TrackedAffiliateLink>
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
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              The Archive
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
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
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {recent.map((item) => (
              <ArticleCard key={item.url} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* CLOSING CTA */}
      <section className="container relative z-10 mx-auto px-5 pb-20 sm:px-6 md:pb-32">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-950 p-8 text-center sm:p-10 md:rounded-[40px] md:p-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-dotgrid opacity-20"
          />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Ready to fix the layer that&apos;s costing you the most?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-indigo-100 sm:text-base md:text-lg">
              Take the 4-question quiz and we&apos;ll point you at the article,
              tool, or habit that will move your sleep the most.
            </p>
            <Link
              href="/tools/sleep-edge-quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition-all hover:scale-[1.02] hover:bg-indigo-100 sm:px-8 sm:py-4 sm:text-base"
            >
              Start the quiz <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
