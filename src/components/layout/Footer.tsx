import Link from "next/link";
import { Moon } from "lucide-react";
import { siteConfig } from "@/lib/site";

const COLUMNS: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
  {
    heading: "Discover",
    links: [
      { label: "Stacks", href: "/best" },
      { label: "Lab Reports", href: "/reviews" },
      { label: "Protocols", href: "/guides" },
      { label: "Compare", href: "/compare" },
      { label: "Brands", href: "/brands" },
      { label: "Tags", href: "/tags" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "All Resources", href: "/resources" },
      { label: "Sleep Cycle Calculator", href: "/tools/sleep-cycle-calculator" },
      { label: "Caffeine Cutoff Calculator", href: "/tools/caffeine-cutoff-calculator" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tighter text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                <Moon size={16} fill="white" className="text-white" />
              </span>
              <span>
                SleepStack<span className="text-indigo-400">HQ</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-slate-500">
              SleepStackHQ is reader-supported. Some links on this site are
              affiliate links — if you click and buy, we may earn a small
              commission at no extra cost to you. Our editorial picks are based
              on aggregated customer reviews and published research, not paid
              placement. Read our full{" "}
              <Link
                href="/disclaimer"
                className="text-slate-400 underline-offset-2 hover:text-white hover:underline"
              >
                disclaimer
              </Link>
              .
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>&copy; {year} SleepStackHQ. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
