import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { getProduct } from "@/lib/products";
import { CoverFallback } from "@/components/article/CoverFallback";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Head-to-head comparisons of the top sleep products — based on aggregated reviews, specs, and who each one is actually built for.",
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
    slug: "oura-vs-whoop",
    productA: "oura-ring-gen-3",
    productB: "whoop-4",
    question: "Oura Ring vs. Whoop 4.0",
    answer:
      "Oura has the most published validation and a ring form factor. Whoop integrates sleep with athletic recovery and strain. Choose data purity or training integration.",
    href: "/best/best-sleep-trackers",
  },
  {
    slug: "swannies-vs-ra-optics",
    productA: "swanwick-blue-blockers",
    productB: "ra-optics-twilight",
    question: "Swannies vs. Ra Optics Twilight",
    answer:
      "Swannies are the popular, comfortable all-rounder. Ra Optics publishes lab-verified lens data and has a premium wraparound frame. Choose comfort or verified specs.",
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
