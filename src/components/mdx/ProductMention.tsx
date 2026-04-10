import { ExternalLink } from "lucide-react";
import { getProduct } from "@/lib/products";

interface ProductMentionProps {
  productId: string;
  retailer?: "amazon" | "walmart";
  children?: React.ReactNode;
}

export function ProductMention({
  productId,
  retailer = "amazon",
  children,
}: ProductMentionProps) {
  const product = getProduct(productId);
  if (!product) {
    return <span className="text-rose-400">[missing product]</span>;
  }
  const href =
    retailer === "walmart" ? product.walmartLink : product.amazonLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="inline-flex items-center gap-1 font-semibold text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
    >
      {children ?? product.name}
      <ExternalLink size={12} className="opacity-60" />
    </a>
  );
}
