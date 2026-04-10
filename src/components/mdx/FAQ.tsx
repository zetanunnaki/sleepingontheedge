import { JsonLd } from "@/components/seo/JsonLd";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <section className="not-prose my-12">
      <JsonLd data={schema} />
      <div className="mb-6 flex items-end gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          FAQ
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={`${item.q}-${i}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04]"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span className="text-2xl text-indigo-400 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 text-sm leading-relaxed text-slate-400">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
