import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getAuthor, getAllAuthorSlugs } from "@/lib/authors";
import { getAllContentAcrossTypes } from "@/lib/content";
import { ArticleCard } from "@/components/article/ArticleCard";
import { JsonLd, personSchema } from "@/components/seo/JsonLd";
import { canonical } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: `Articles and credentials for ${author.name} on SleepingOnTheEdge.`,
    alternates: { canonical: canonical("/authors/" + slug) },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author || author.slug !== slug) notFound();

  const articles = getAllContentAcrossTypes().filter(
    (a) => a.frontmatter.author === author.name,
  );

  return (
    <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
      <JsonLd data={personSchema(author)} />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mt-10 flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600/20 font-serif text-3xl font-bold text-indigo-300 shadow-[0_0_60px_rgba(79,70,229,0.4)]">
          {author.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
          {author.role}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-white sm:text-7xl">
          {author.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          {author.bio}
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {author.credentials.map((c) => (
            <li
              key={c}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {c}
            </li>
          ))}
        </ul>
      </header>

      {articles.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Articles by{" "}
            <span className="italic text-indigo-300">
              {author.name.split(" ")[0]}.
            </span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <ArticleCard key={item.url} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
