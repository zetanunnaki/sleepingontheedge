import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { getAllBrands } from "@/lib/products";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Every sleep brand we've curated from customer reviews on SleepingOnTheEdge.",
  alternates: { canonical: canonical("/brands") },
};

export default function BrandsIndexPage() {
  const brands = getAllBrands();

  return (
    <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 md:py-24">
      <header className="animate-fade-up mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Building2 size={12} /> The Roster
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Brands on the{" "}
          <span className="italic text-indigo-300">shortlist.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          Every brand below has at least one product that consistently leads
          aggregated customer reviews. We don&apos;t list brands whose products
          keep appearing in the complaint pile.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:mt-6">
          <span className="h-px w-8 bg-slate-700" />
          <span>{brands.length} brands</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      <div className="animate-fade-up delay-150 mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-16 sm:grid-cols-2">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-6"
          >
            <div>
              <h2 className="font-serif text-xl text-white group-hover:text-indigo-300 sm:text-2xl">
                {brand.name}
              </h2>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
                {brand.productCount} product
                {brand.productCount !== 1 ? "s" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
