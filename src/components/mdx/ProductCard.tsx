import Image from "next/image";
import Link from "next/link";
import { Check, X, Award, ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/products";
import { getReviewByProductId } from "@/lib/content";
import { DualBuyButton } from "./DualBuyButton";
import { CoverFallback } from "@/components/article/CoverFallback";

interface ProductCardProps {
  productId: string;
  badge?: string;
}

export function ProductCard({ productId, badge }: ProductCardProps) {
  const product = getProduct(productId);
  const review = getReviewByProductId(productId);
  if (!product) {
    return (
      <div className="not-prose my-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
        Missing product: <code>{productId}</code>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl shadow-indigo-950/30 ring-1 ring-white/5 sm:rounded-[32px]">
      {badge && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white sm:px-6">
          <Award size={14} /> {badge}
        </div>
      )}
      <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-[220px_1fr]">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/40">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 220px, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <CoverFallback seed={productId} label={product.brand} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent" />
        </div>
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
            {product.brand}
          </p>
          <h3 className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-bold text-indigo-400">
            {product.price}
          </p>
          <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Pros
              </p>
              <ul className="mt-3 space-y-2">
                {product.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">
                Cons
              </p>
              <ul className="mt-3 space-y-2">
                {product.cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DualBuyButton productId={productId} />
          {review && (
            <Link
              href={review.url}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Read full review <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
