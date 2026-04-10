import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllBrands, getBrandBySlug } from "@/lib/products";
import { ProductCard } from "@/components/mdx/ProductCard";
import { canonical } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBrands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: `Every ${brand.name} sleep product tested and reviewed on SleepStackHQ.`,
    alternates: { canonical: canonical("/brands/" + slug) },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <div className="container relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
      <Link
        href="/brands"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> All brands
      </Link>

      <header className="mt-10 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          Brand · {brand.productCount} product
          {brand.productCount !== 1 ? "s" : ""}
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          <span className="italic text-indigo-300">{brand.name}</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Every {brand.name} product we&apos;ve tested, ranked by what we
          actually recommend.
        </p>
      </header>

      <div className="mt-12">
        {brand.products.map((p) => (
          <ProductCard key={p.id} productId={p.id} />
        ))}
      </div>
    </div>
  );
}
