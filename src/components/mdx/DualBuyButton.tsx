import { ExternalLink } from "lucide-react";
import { getProduct } from "@/lib/products";

interface DualBuyButtonProps {
  productId: string;
}

export function DualBuyButton({ productId }: DualBuyButtonProps) {
  const product = getProduct(productId);
  if (!product) {
    return (
      <div className="not-prose my-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
        Missing product: <code>{productId}</code>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      <a
        href={product.amazonLink}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-4 text-center text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-300"
      >
        Check Price on Amazon <ExternalLink size={16} />
      </a>
      <a
        href={product.walmartLink}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:bg-blue-500"
      >
        Check Price on Walmart <ExternalLink size={16} />
      </a>
    </div>
  );
}
