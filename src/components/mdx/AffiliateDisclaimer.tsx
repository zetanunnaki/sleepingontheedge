import { Info } from "lucide-react";

export function AffiliateDisclaimer() {
  return (
    <aside
      role="note"
      className="not-prose my-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
      <p className="leading-relaxed">
        <strong className="font-semibold text-amber-100">
          SleepStackHQ is reader-supported.
        </strong>{" "}
        Some links in this article are affiliate links. If you click and buy,
        we may earn a small commission at no extra cost to you. Our editorial
        picks are based on aggregated customer reviews and published research,
        not paid placement.
      </p>
    </aside>
  );
}
