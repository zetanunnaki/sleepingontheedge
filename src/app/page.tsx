import Link from "next/link";
import {
  Moon,
  ChevronRight,
  Star,
  ArrowRight,
  Activity,
} from "lucide-react";
import { getAllContentAcrossTypes } from "@/lib/content";
import { ArticleCard } from "@/components/article/ArticleCard";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const recent = getAllContentAcrossTypes().slice(0, 6);
  const featured = recent[0];

  return (
    <>
      {/* HERO */}
      <header className="relative z-10 px-6 pb-32 pt-20 text-center">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Activity size={12} /> The 2026 Biohacking Guide
        </div>
        <h1 className="mx-auto mb-8 max-w-5xl font-serif text-6xl leading-[1.1] md:text-8xl">
          Optimize your sleep <br />
          <span className="bg-gradient-to-r from-indigo-400 to-amber-200 bg-clip-text italic text-transparent">
            with scientific precision.
          </span>
        </h1>
        <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400">
          We bridge the gap between clinical research and your bedroom. Vetted
          supplement stacks and environment hardware for elite recovery.
        </p>
        <div className="flex flex-col justify-center gap-6 md:flex-row">
          <Link
            href="/best"
            className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-10 py-5 font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-105"
          >
            Build Your Stack <ChevronRight size={18} />
          </Link>
          <Link
            href="/reviews"
            className="rounded-2xl border border-slate-800 bg-slate-900 px-10 py-5 text-center font-bold transition-all hover:bg-slate-800"
          >
            View Lab Reports
          </Link>
        </div>
      </header>

      {/* FEATURED GLASS CARDS */}
      <section className="container relative z-10 mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Feature Card */}
          <div className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-10 lg:col-span-8">
            <div className="absolute right-0 top-0 p-10 opacity-10 transition-opacity group-hover:opacity-20">
              <Moon size={200} />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Editor&apos;s Choice
              </span>
              <h2 className="mb-6 mt-4 font-serif text-4xl">
                The Magnesium <br /> Breakthrough Stack
              </h2>
              <div className="mb-8 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill="#fbbf24"
                    className="text-amber-400"
                  />
                ))}
                <span className="ml-2 text-xs text-slate-500">
                  (128 Reviews)
                </span>
              </div>
              <p className="mb-10 max-w-md text-slate-400">
                Our proprietary blend recommendation for reducing sleep latency
                by 22% and increasing REM cycles.
              </p>
              <Link
                href={featured?.url ?? "/best"}
                className="group/cta flex items-center gap-2 font-bold text-indigo-400"
              >
                Read the Analysis{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover/cta:translate-x-2"
                />
              </Link>
            </div>
          </div>

          {/* Side Data Card */}
          <div className="flex flex-col justify-between rounded-[40px] bg-indigo-600 p-10 text-white lg:col-span-4">
            <h3 className="font-serif text-2xl">
              Quick Protocol: <br /> The Wind Down
            </h3>
            <div className="space-y-6">
              {[
                "8:00 PM: Blue Light Blockers On",
                "9:30 PM: 400mg Mag Glycinate",
                "10:00 PM: 65°F Room Temp",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container relative z-10 mx-auto px-6 pb-32">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            The Layers
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">
            Build it{" "}
            <span className="italic text-indigo-300">layer by layer.</span>
          </h2>
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

      {/* RECENT ARTICLES */}
      <section className="container relative z-10 mx-auto px-6 pb-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              The Archive
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Latest <span className="italic text-indigo-300">findings.</span>
            </h2>
          </div>
          <Link
            href="/best"
            className="hidden text-sm font-bold text-slate-400 hover:text-white md:inline-flex md:items-center md:gap-1"
          >
            View all <ArrowRight size={14} />
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
    </>
  );
}
