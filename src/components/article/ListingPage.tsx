import { ArticleCard } from "./ArticleCard";
import { FeaturedHero } from "./FeaturedHero";
import type { ContentItem } from "@/lib/content";

interface ListingPageProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  items: ContentItem[];
  emptyMessage?: string;
  featuredEyebrow?: string;
}

export function ListingPage({
  eyebrow,
  title,
  description,
  items,
  emptyMessage = "Nothing published here yet — check back soon.",
  featuredEyebrow,
}: ListingPageProps) {
  const [featured, ...rest] = items;
  const showFeatured = items.length >= 2 && featuredEyebrow !== undefined;
  const grid = showFeatured ? rest : items;

  return (
    <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 md:py-24">
      <header className="animate-fade-up mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          {description}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
          <span className="h-px w-8 bg-slate-700" />
          <span>{items.length} {items.length === 1 ? "article" : "articles"}</span>
          <span className="h-px w-8 bg-slate-700" />
        </div>
      </header>

      <div className="animate-fade-up delay-150 mx-auto mt-12 max-w-6xl sm:mt-16">
        {items.length === 0 ? (
          <p className="text-center text-sm text-slate-500">{emptyMessage}</p>
        ) : (
          <>
            {showFeatured && featured && (
              <div className="mb-8 sm:mb-10">
                <FeaturedHero item={featured} eyebrow={featuredEyebrow} />
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {grid.map((item) => (
                <ArticleCard key={item.url} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
