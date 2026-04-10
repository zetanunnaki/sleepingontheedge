import Image from "next/image";
import { getProducts } from "@/lib/products";

interface ComparisonTableProps {
  productIds: string[];
}

export function ComparisonTable({ productIds }: ComparisonTableProps) {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return (
      <div className="not-prose my-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
        ComparisonTable: <code>productIds</code> must be an array.
      </div>
    );
  }
  const products = getProducts(productIds);
  if (products.length === 0) return null;

  return (
    <div className="not-prose my-10 overflow-x-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl shadow-black/40">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <tr>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Brand</th>
            <th className="px-5 py-4">Price</th>
            <th className="px-5 py-4">Top Pro</th>
            <th className="px-5 py-4 text-right">Buy</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((p) => (
            <tr
              key={p.id}
              className="align-middle transition-colors hover:bg-white/[0.02]"
            >
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-serif text-lg text-white">
                    {p.name}
                  </span>
                </div>
              </td>
              <td className="px-5 py-5 text-slate-400">{p.brand}</td>
              <td className="px-5 py-5 font-bold text-indigo-400">{p.price}</td>
              <td className="px-5 py-5 text-slate-400">{p.pros[0] ?? "—"}</td>
              <td className="px-5 py-5 text-right">
                <a
                  href={p.amazonLink}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="inline-block rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  Amazon
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
