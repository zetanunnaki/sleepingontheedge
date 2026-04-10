import { ArticleCard } from "./ArticleCard";
import {
  getAllContentAcrossTypes,
  type ContentItem,
} from "@/lib/content";

interface RelatedArticlesProps {
  current: ContentItem;
  limit?: number;
}

export function RelatedArticles({ current, limit = 3 }: RelatedArticlesProps) {
  const all = getAllContentAcrossTypes();
  const sameType = all.filter(
    (i) => i.type === current.type && i.url !== current.url,
  );
  const others = all.filter(
    (i) => i.type !== current.type && i.url !== current.url,
  );
  const items = [...sameType, ...others].slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="not-prose mt-20 border-t border-white/10 pt-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            Keep Reading
          </span>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
            Related <span className="italic text-indigo-300">findings.</span>
          </h2>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ArticleCard key={item.url} item={item} />
        ))}
      </div>
    </section>
  );
}
