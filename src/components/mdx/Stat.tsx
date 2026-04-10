interface StatItem {
  value: string;
  label: string;
  source?: string;
}

interface StatProps {
  items: StatItem[];
}

export function Stat({ items }: StatProps) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6"
        >
          <div className="font-serif text-5xl text-indigo-300">
            {item.value}
          </div>
          <div className="mt-2 text-sm text-slate-300">{item.label}</div>
          {item.source && (
            <div className="mt-3 text-[10px] uppercase tracking-[0.15em] text-slate-500">
              {item.source}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
