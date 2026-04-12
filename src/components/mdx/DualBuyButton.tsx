import { ExternalLink } from "lucide-react";
import { getProduct } from "@/lib/products";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";

interface DualBuyButtonProps {
  productId: string;
  /** Optional location override for GA4 attribution. Defaults to "dual_buy_button". */
  location?: string;
}

export function DualBuyButton({
  productId,
  location = "dual_buy_button",
}: DualBuyButtonProps) {
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
      <TrackedAffiliateLink
        href={product.amazonLink}
        productId={productId}
        productName={product.name}
        brand={product.brand}
        price={product.price}
        retailer="amazon"
        location={location}
        className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-4 text-center text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-300"
      >
        Check Price on Amazon <ExternalLink size={16} />
      </TrackedAffiliateLink>
      <TrackedAffiliateLink
        href={product.walmartLink}
        productId={productId}
        productName={product.name}
        brand={product.brand}
        price={product.price}
        retailer="walmart"
        location={location}
        className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:bg-blue-500"
      >
        Check Price on Walmart <ExternalLink size={16} />
      </TrackedAffiliateLink>
    </div>
  );
}
