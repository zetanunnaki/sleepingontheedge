import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

const SOCIAL_ICONS: Record<string, { label: string; icon: React.ReactNode }> = {
  pinterest: {
    label: "Pinterest",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>,
  },
  facebook: {
    label: "Facebook",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  instagram: {
    label: "Instagram",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
};

const COLUMNS: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
  {
    heading: "Discover",
    links: [
      { label: "The Edge", href: "/best" },
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
      { label: "Terms of Service", href: "/terms" },
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
              <Image
                src="/brand/logo-icon.png"
                alt=""
                aria-hidden
                width={32}
                height={32}
                className="h-8 w-8 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
              />
              <span>
                Sleeping<span className="text-indigo-400">OnThe</span>Edge
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-slate-400">
              <strong className="font-semibold text-slate-300">
                Affiliate Disclosure.
              </strong>{" "}
              SleepingOnTheEdge is reader-supported. As an Amazon Associate we
              earn from qualifying purchases. Some links on this site are
              affiliate links — if you click and buy, we may earn a small
              commission at no extra cost to you. Our recommendations are based
              on extensive research across verified buyer reviews and sleep
              science literature — never paid placement. This site does not
              provide medical advice. Read our full{" "}
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
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
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <span className="text-xs text-slate-400">
            &copy; {year} SleepingOnTheEdge. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            {Object.entries(siteConfig.socials).map(([key, url]) => {
              const social = SOCIAL_ICONS[key];
              if (!social) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
