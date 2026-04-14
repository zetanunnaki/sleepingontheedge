import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { getProduct } from "@/lib/products";
import { CoverFallback } from "@/components/article/CoverFallback";
import { canonical } from "@/lib/site";
import { COMPARISONS } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Head-to-head comparisons of the top sleep products — based on aggregated reviews, specs, and who each one is actually built for.",
  alternates: { canonical: canonical("/compare") },
};

function ProductThumb({ productId }: { productId: string }) {
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
    <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="animate-fade-up mt-8 text-center sm:mt-10">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Zap size={12} /> Head to Head
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Product <span className="italic text-indigo-300">comparisons.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          The questions people search most — answered with aggregated data, not
          opinions. Each comparison has a full head-to-head breakdown.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:mt-6">
          <span className="h-px w-8 bg-slate-700" />
          <span>{COMPARISONS.length} comparisons</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      <div className="animate-fade-up delay-150 mx-auto mt-12 grid max-w-4xl gap-5 sm:mt-16 sm:gap-6">
        {COMPARISONS.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[28px] sm:p-8"
          >
            <div className="flex items-center justify-center gap-5 sm:gap-10">
              <ProductThumb productId={comp.productA} />
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-sm font-black text-amber-400">
                VS
              </div>
              <ProductThumb productId={comp.productB} />
            </div>
            <div className="mt-6 text-center sm:mt-8">
              <h2 className="font-serif text-xl leading-tight text-white group-hover:text-indigo-300 sm:text-2xl md:text-3xl">
                {comp.question}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:mt-4">
                {comp.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400 sm:mt-5">
                Read the full comparison{" "}
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
