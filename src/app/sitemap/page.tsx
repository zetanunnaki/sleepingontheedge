import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllContent, getAllTags } from "@/lib/content";
import { getAllAuthors } from "@/lib/authors";
import { getAllBrands } from "@/lib/products";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on SleepStackHQ — articles, tools, brands, tags, and references.",
  alternates: { canonical: canonical("/sitemap") },
};

interface SectionProps {
  heading: string;
  children: React.ReactNode;
}

function Section({ heading, children }: SectionProps) {
  return (
    <section className="border-t border-white/10 py-10 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-2xl text-white">{heading}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function LinkList({
  items,
}: {
  items: Array<{ href: string; label: string; sub?: string }>;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-baseline justify-between gap-3 rounded-xl border border-transparent px-3 py-2 text-sm transition-all hover:border-white/10 hover:bg-white/5"
          >
            <span className="text-slate-300 group-hover:text-white">
              {item.label}
            </span>
            {item.sub && (
              <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                {item.sub}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function HtmlSitemapPage() {
  const stacks = getAllContent("roundups");
  const reviews = getAllContent("reviews");
  const guides = getAllContent("guides");
  const tags = getAllTags();
  const authors = getAllAuthors();
  const brands = getAllBrands();

  return (
    <div className="container relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <header className="mt-10 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          Reference
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          Site <span className="italic text-indigo-300">map.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Every published page on SleepStackHQ, in one place. The XML version
          for crawlers lives at <code>/sitemap.xml</code>.
        </p>
      </header>

      <div className="mt-16">
        <Section heading="Pages">
          <LinkList
            items={[
              { href: "/", label: "Home" },
              { href: "/best", label: "Stacks" },
              { href: "/reviews", label: "Lab Reports" },
              { href: "/guides", label: "Protocols" },
              { href: "/tools", label: "Tools" },
              { href: "/brands", label: "Brands" },
              { href: "/tags", label: "Tags" },
              { href: "/glossary", label: "Glossary" },
              { href: "/methodology", label: "Methodology" },
              { href: "/about", label: "About" },
              { href: "/disclaimer", label: "Disclaimer" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ]}
          />
        </Section>

        <Section heading="Tools">
          <LinkList
            items={[
              { href: "/tools/sleep-cycle-calculator", label: "Sleep Cycle Calculator" },
              { href: "/tools/caffeine-cutoff-calculator", label: "Caffeine Cutoff Calculator" },
            ]}
          />
        </Section>

        <Section heading={`Stacks (${stacks.length})`}>
          <LinkList
            items={stacks.map((s) => ({
              href: s.url,
              label: s.frontmatter.title,
              sub: `${s.readingTime} min`,
            }))}
          />
        </Section>

        <Section heading={`Lab Reports (${reviews.length})`}>
          <LinkList
            items={reviews.map((s) => ({
              href: s.url,
              label: s.frontmatter.title,
              sub: `${s.readingTime} min`,
            }))}
          />
        </Section>

        <Section heading={`Protocols (${guides.length})`}>
          <LinkList
            items={guides.map((s) => ({
              href: s.url,
              label: s.frontmatter.title,
              sub: `${s.readingTime} min`,
            }))}
          />
        </Section>

        <Section heading={`Brands (${brands.length})`}>
          <LinkList
            items={brands.map((b) => ({
              href: `/brands/${b.slug}`,
              label: b.name,
              sub: `${b.productCount} product${b.productCount !== 1 ? "s" : ""}`,
            }))}
          />
        </Section>

        <Section heading={`Tags (${tags.length})`}>
          <LinkList
            items={tags.map((t) => ({
              href: `/tags/${t.slug}`,
              label: `#${t.name}`,
              sub: `${t.count}`,
            }))}
          />
        </Section>

        <Section heading={`Authors (${authors.length})`}>
          <LinkList
            items={authors.map((a) => ({
              href: `/authors/${a.slug}`,
              label: a.name,
              sub: a.role,
            }))}
          />
        </Section>
      </div>
    </div>
  );
}
