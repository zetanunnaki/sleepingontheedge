import { Stethoscope } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <aside
      role="note"
      className="not-prose my-8 flex items-start gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 text-sm text-sky-100"
    >
      <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400">
          For information only
        </p>
        <p className="mt-2 leading-relaxed">
          This article is for general educational purposes and is not medical
          advice, diagnosis, or treatment. Always speak with a qualified
          healthcare provider before starting any supplement, changing your
          sleep medication, or making decisions about a medical condition.
          Information here may not reflect your individual situation.
        </p>
      </div>
    </aside>
  );
}
