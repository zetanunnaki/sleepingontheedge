import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Zap,
  Check,
  X,
  Minus,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { getProduct } from "@/lib/products";
import { CoverFallback } from "@/components/article/CoverFallback";
import { canonical } from "@/lib/site";
import {
  COMPARISONS,
  getComparisonBySlug,
  getAllComparisonSlugs,
} from "@/lib/comparisons";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};
  return {
    title: comp.question,
    description: comp.tagline,
    alternates: { canonical: canonical(`/compare/${slug}`) },
  };
}

function ProductColumn({
  productId,
  label,
}: {
  productId: string;
  label: string;
}) {
  const product = getProduct(productId);
  if (!product) return null;
  return (
    <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:rounded-[28px] sm:p-6">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-400">
        {label}
      </span>
      <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 280px, 100vw"
            className="object-cover"
          />
        ) : (
          <CoverFallback seed={productId} label={product.brand} />
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          {product.brand}
        </p>
        <h3 className="mt-1 font-serif text-lg leading-tight text-white sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-bold text-indigo-400">
          {product.price}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <TrackedAffiliateLink
          href={product.amazonLink}
          productId={productId}
          productName={product.name}
          brand={product.brand}
          price={product.price}
          retailer="amazon"
          location="compare_detail"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-3 py-2.5 text-[11px] font-bold text-slate-950 transition hover:bg-amber-300 sm:text-xs"
        >
          Amazon <ExternalLink size={12} />
        </TrackedAffiliateLink>
        <TrackedAffiliateLink
          href={product.walmartLink}
          productId={productId}
          productName={product.name}
          brand={product.brand}
          price={product.price}
          retailer="walmart"
          location="compare_detail"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-500 sm:text-xs"
        >
          Walmart <ExternalLink size={12} />
        </TrackedAffiliateLink>
      </div>
    </div>
  );
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  const productA = getProduct(comp.productA);
  const productB = getProduct(comp.productB);
  if (!productA || !productB) notFound();

  const otherComparisons = COMPARISONS.filter((c) => c.slug !== slug).slice(
    0,
    3,
  );

  return (
    <div className="container relative z-10 mx-auto max-w-4xl px-5 py-12 sm:px-6 md:py-24">
      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> All comparisons
      </Link>

      <header className="animate-fade-up mt-6 text-center sm:mt-8">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          <Zap size={12} /> Head to Head
        </span>
        <h1 className="mt-4 font-serif text-[2rem] leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {comp.question}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          {comp.tagline}
        </p>
      </header>

      {/* Side-by-side product cards */}
      <div className="animate-fade-up delay-100 mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
        <ProductColumn productId={comp.productA} label="Option A" />
        <ProductColumn productId={comp.productB} label="Option B" />
      </div>

      {/* Intro */}
      <section className="animate-fade-up delay-150 mt-12 sm:mt-16">
        <p className="text-base leading-[1.75] text-slate-300 sm:text-lg">
          {comp.intro}
        </p>
      </section>

      {/* Category-by-category winner */}
      <section className="animate-fade-up delay-200 mt-12 sm:mt-16">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Category by category
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-3 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 sm:p-4 sm:text-xs">
                  Category
                </th>
                <th className="p-3 text-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 sm:p-4 sm:text-xs">
                  Winner
                </th>
                <th className="hidden p-4 text-left text-xs font-black uppercase tracking-[0.15em] text-slate-400 md:table-cell">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              {comp.categories.map((cat, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-3 font-bold text-white sm:p-4">
                    {cat.category}
                  </td>
                  <td className="p-3 text-center sm:p-4">
                    {cat.winner === "A" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300 sm:text-xs">
                        <Check size={12} /> A
                      </span>
                    )}
                    {cat.winner === "B" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 sm:text-xs">
                        <Check size={12} /> B
                      </span>
                    )}
                    {cat.winner === "tie" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                        <Minus size={12} /> Tie
                      </span>
                    )}
                  </td>
                  <td className="hidden p-4 text-sm leading-relaxed text-slate-400 md:table-cell">
                    {cat.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile-only reasons */}
        <div className="mt-4 space-y-3 md:hidden">
          {comp.categories.map((cat, i) => (
            <p key={i} className="text-xs leading-relaxed text-slate-500">
              <span className="font-bold text-slate-300">{cat.category}:</span>{" "}
              {cat.reason}
            </p>
          ))}
        </div>
      </section>

      {/* Decision guide */}
      <section className="animate-fade-up delay-300 mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
        <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              Option A
            </span>
          </div>
          <h3 className="mt-3 font-serif text-xl text-white sm:text-2xl">
            Choose {productA.name.split(/[—(]/)[0].trim()} if…
          </h3>
          <ul className="mt-4 space-y-2.5">
            {comp.chooseA.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                  strokeWidth={3}
                />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Option B
            </span>
          </div>
          <h3 className="mt-3 font-serif text-xl text-white sm:text-2xl">
            Choose {productB.name.split(/[—(]/)[0].trim()} if…
          </h3>
          <ul className="mt-4 space-y-2.5">
            {comp.chooseB.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                  strokeWidth={3}
                />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="animate-fade-up delay-400 mt-12 sm:mt-16">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Frequently asked
        </h2>
        <div className="mt-6 space-y-4">
          {comp.faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-indigo-500/30"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 font-bold text-white">
                <span>{faq.q}</span>
                <span className="mt-1 text-indigo-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-[1.75] text-slate-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Where to go next */}
      <section className="mt-12 sm:mt-16">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Where to go next
        </h2>
        <Link
          href={comp.roundupHref}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-white"
        >
          {comp.roundupTitle} <ArrowRight size={14} />
        </Link>
        {otherComparisons.length > 0 && (
          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              More comparisons
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {otherComparisons.map((other) => (
                <Link
                  key={other.slug}
                  href={`/compare/${other.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5"
                >
                  <p className="font-serif text-sm leading-tight text-white group-hover:text-indigo-300">
                    {other.question}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
