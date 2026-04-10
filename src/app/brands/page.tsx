import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { getAllBrands } from "@/lib/products";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Every sleep brand we've tested and recommended on SleepStackHQ.",
};

export default function BrandsIndexPage() {
  const brands = getAllBrands();

  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Building2 size={12} /> The Roster
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Brands we&apos;ve <span className="italic text-indigo-300">tested.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Every brand below has at least one product that survived our 30-night
          test cycle. We don&apos;t list brands we don&apos;t recommend.
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div>
              <h2 className="font-serif text-2xl text-white group-hover:text-indigo-300">
                {brand.name}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">
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
