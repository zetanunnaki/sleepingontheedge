import Link from "next/link";
import { Moon } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
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
            <p className="mt-5 text-xs text-slate-500">
              As an Amazon Associate and Walmart Associate, SleepStackHQ earns
              from qualifying purchases.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Legal
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
          &copy; {year} SleepStackHQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
