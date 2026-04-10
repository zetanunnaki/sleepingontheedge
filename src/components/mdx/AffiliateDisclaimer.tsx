import { Info } from "lucide-react";

export function AffiliateDisclaimer() {
  return (
    <aside
      role="note"
      className="not-prose my-8 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
      <p className="leading-relaxed">
        <strong className="font-semibold text-amber-100">
          SleepStackHQ is reader-supported.
        </strong>{" "}
        We may earn a commission through products purchased using links on this
        page, at no additional cost to you.
      </p>
    </aside>
  );
}
