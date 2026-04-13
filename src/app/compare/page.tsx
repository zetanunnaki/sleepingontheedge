import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { getProduct } from "@/lib/products";
import { CoverFallback } from "@/components/article/CoverFallback";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Head-to-head comparisons of the top sleep products — based on aggregated reviews, specs, and who each one is actually built for.",
  alternates: { canonical: canonical("/compare") },
};

interface ComparisonCard {
  slug: string;
  productA: string;
  productB: string;
  question: string;
  answer: string;
  href: string;
}

const COMPARISONS: ComparisonCard[] = [
  {
    slug: "hatch-vs-loftie",
    productA: "hatch-restore-2",
    productB: "loftie-clock",
    question: "Hatch Restore 2 vs. Loftie Clock",
    answer:
      "The Hatch is the all-in-one with sunrise light + routines. The Loftie is the minimalist phone-free pick with a gentler alarm. Choose sunrise or simplicity.",
    href: "/best/best-smart-alarm-clocks",
  },
  {
    slug: "oura-vs-fitbit",
    productA: "oura-ring-gen-3",
    productB: "fitbit-charge-6",
    question: "Oura Ring vs. Fitbit Charge 6",
    answer:
      "Oura has the most published sleep validation and a ring form factor — no screen, no distractions. Fitbit Charge 6 is the mainstream pick with Google integrations and a bigger display. Choose data purity or daily versatility.",
    href: "/best/best-sleep-trackers",
  },
  {
    slug: "swannies-vs-uvex",
    productA: "swanwick-blue-blockers",
    productB: "wenzel-blue-blockers-budget",
    question: "Swannies vs. Uvex Skyper",
    answer:
      "Swannies are the designer pick — comfortable, stylish, priced for everyday use. Uvex Skyper are safety-glass ugly but cost under $12 with a near-identical amber lens. Choose aesthetics or budget.",
    href: "/best/best-blue-light-blocking-glasses",
  },
  {
    slug: "bearaby-vs-luna",
    productA: "bearaby-cotton-napper",
    productB: "luna-weighted-blanket",
    question: "Bearaby Cotton Napper vs. Luna Weighted Blanket",
    answer:
      "Bearaby is the premium, beadless, breathable pick at ~$250. Luna is the value champion at ~$70 with glass bead fill. Choose breathability or budget.",
    href: "/best/best-weighted-blankets",
  },
  {
    slug: "coop-vs-beckham",
    productA: "coop-eden-pillow",
    productB: "beckham-hotel-collection-pillow",
    question: "Coop Eden vs. Beckham Hotel Collection Pillow",
    answer:
      "Coop is adjustable — add or remove fill for your exact loft. Beckham is fixed but costs 1/3 the price with 200K+ reviews. Choose customization or value.",
    href: "/best/best-pillows-for-sleep",
  },
  {
    slug: "zinus-vs-purple",
    productA: "zinus-memory-foam-mattress",
    productB: "purple-mattress",
    question: "Zinus Green Tea vs. Purple Mattress",
    answer:
      "Zinus is traditional memory foam at a fraction of the price — best for budget-constrained back pain sufferers. Purple uses a hyper-elastic grid that sleeps cool and pressure-relieves differently. Choose budget or unique pressure relief.",
    href: "/best/best-mattress-back-pain",
  },
  {
    slug: "tempur-vs-coop",
    productA: "tempur-neck-pillow",
    productB: "coop-eden-pillow",
    question: "TEMPUR-Neck vs. Coop Eden",
    answer:
      "TEMPUR-Neck is a structured contour pillow for chronic pain — fixed geometry, dense foam, dedicated neck ridge. Coop Eden is adjustable shredded foam that lets you dial in exact loft. Choose structured support or customization.",
    href: "/best/best-pillows-neck-pain",
  },
  {
    slug: "bamboo-vs-cotton",
    productA: "bedsure-bamboo-sheets",
    productB: "brooklinen-luxe-sheets",
    question: "Bedsure Bamboo vs. Brooklinen Luxe",
    answer:
      "Bamboo wicks moisture fastest for night sweats; premium cotton percale dries fastest between episodes. Both are good picks for hot sleepers — bamboo for the sweat moment, cotton for the recovery.",
    href: "/best/best-sheets-night-sweats",
  },
  {
    slug: "latex-vs-memory-foam-topper",
    productA: "pure-green-latex-topper",
    productB: "linenspa-gel-memory-foam-topper",
    question: "Pure Green Latex vs. Linenspa Gel Memory Foam Topper",
    answer:
      "Latex sleeps genuinely cool all night and lasts 10+ years. Gel memory foam feels cool briefly then equilibrates with body temperature, and lasts 3–4 years. Choose long-term cooling or budget conforming feel.",
    href: "/best/best-cooling-mattress-topper",
  },
  {
    slug: "hatch-vs-philips",
    productA: "hatch-restore-2",
    productB: "philips-smartsleep-wakeup",
    question: "Hatch Restore 2 vs. Philips SmartSleep HF3520",
    answer:
      "Hatch is an all-in-one bedside platform — sound, light, wind-down routines, smart alarm. Philips is a dedicated sunrise lamp with brighter peak light, better for deep sleepers who need real brightness. Choose platform or brightness.",
    href: "/best/best-sunrise-alarm-clocks",
  },
  {
    slug: "yogasleep-vs-lectrofan",
    productA: "yogasleep-dohm",
    productB: "lectrofan-evo",
    question: "Yogasleep Dohm vs. LectroFan EVO",
    answer:
      "The Dohm is a real fan inside a housing — the sound is truly natural and never loops. The EVO is electronic with 20+ sound options including rain and ocean. Choose natural texture or variety.",
    href: "/best/best-sound-machines",
  },
  {
    slug: "magnesium-vs-ltheanine",
    productA: "doctors-best-magnesium-glycinate",
    productB: "now-l-theanine",
    question: "Magnesium Glycinate vs. L-Theanine",
    answer:
      "Magnesium calms the nervous system and muscles through GABA pathways — best for tense sleepers. L-theanine reduces mental activation without sedation — best for racing-brain insomnia. Different mechanisms; many users stack both.",
    href: "/best/best-bedtime-supplement-stack",
  },
  {
    slug: "loop-vs-macks",
    productA: "loop-quiet-earplugs",
    productB: "macks-slim-fit-foam",
    question: "Loop Quiet vs. Mack's Slim Fit",
    answer:
      "Loop Quiet is reusable silicone — flush fit, great for side sleepers, 24 dB NRR. Mack's Slim Fit is disposable foam with 29 dB NRR — more sound blocking for loud snorers but less comfortable long-term. Choose comfort or max attenuation.",
    href: "/best/best-earplugs-snoring-spouse",
  },
  {
    slug: "bearaby-vs-ynm",
    productA: "bearaby-cotton-napper",
    productB: "thrive-mood-blanket",
    question: "Bearaby Cotton Napper vs. YnM Cooling Bamboo",
    answer:
      "Bearaby is chunky knit — most breathable, best for hot sleepers, gentlest weight distribution. YnM uses traditional glass beads with a bamboo cover — deeper pressure feel, still cooler than polyester-covered alternatives. Choose breathability or deep pressure.",
    href: "/best/best-weighted-blanket-anxiety",
  },
];

function ProductThumb({
  productId,
  side,
}: {
  productId: string;
  side: "left" | "right";
}) {
  const product = getProduct(productId);
  if (!product) return null;
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <CoverFallback seed={productId} />
        )}
      </div>
      <div>
        <p className="text-xs font-bold text-white">{product.name}</p>
        <p className="text-[10px] text-indigo-400">{product.price}</p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Zap size={12} /> Head to Head
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Product <span className="italic text-indigo-300">comparisons.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          The questions people search most — answered with aggregated data, not
          opinions. Each comparison links to the full roundup for deeper context.
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-4xl gap-6">
        {COMPARISONS.map((comp) => (
          <Link
            key={comp.slug}
            href={comp.href}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <ProductThumb productId={comp.productA} side="left" />
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-sm font-black text-amber-400">
                VS
              </div>
              <ProductThumb productId={comp.productB} side="right" />
            </div>
            <div className="mt-8 text-center">
              <h2 className="font-serif text-2xl text-white group-hover:text-indigo-300 sm:text-3xl">
                {comp.question}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {comp.answer}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                Read the full breakdown <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
