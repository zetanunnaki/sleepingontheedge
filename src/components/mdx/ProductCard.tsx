import Image from "next/image";
import { Check, X, Award } from "lucide-react";
import { getProduct } from "@/lib/products";
import { DualBuyButton } from "./DualBuyButton";
import { CoverFallback } from "@/components/article/CoverFallback";

interface ProductCardProps {
  productId: string;
  badge?: string;
}

export function ProductCard({ productId, badge }: ProductCardProps) {
  const product = getProduct(productId);
  if (!product) {
    return (
      <div className="not-prose my-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
        Missing product: <code>{productId}</code>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl shadow-black/40">
      {badge && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-indigo-600/90 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          <Award size={14} /> {badge}
        </div>
      )}
      <div className="grid gap-8 p-8 md:grid-cols-[220px_1fr]">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 220px, 100vw"
              className="object-cover"
            />
          ) : (
            <CoverFallback seed={productId} label={product.brand} />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
            {product.brand}
          </p>
          <h3 className="mt-2 font-serif text-3xl text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-bold text-indigo-400">
            {product.price}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Pros
              </p>
              <ul className="mt-3 space-y-2">
                {product.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2 text-sm text-slate-300"
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
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DualBuyButton productId={productId} />
        </div>
      </div>
    </div>
  );
}
