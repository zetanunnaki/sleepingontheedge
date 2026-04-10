import { ArticleCard } from "./ArticleCard";
import type { ContentItem } from "@/lib/content";

interface ListingPageProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  items: ContentItem[];
  emptyMessage?: string;
}

export function ListingPage({
  eyebrow,
  title,
  description,
  items,
  emptyMessage = "Nothing published here yet — check back soon.",
}: ListingPageProps) {
  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-slate-400">{description}</p>
      </header>

      <div className="mx-auto mt-16 max-w-6xl">
        {items.length === 0 ? (
          <p className="text-center text-sm text-slate-500">{emptyMessage}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ArticleCard key={item.url} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
