export const siteConfig = {
  name: "SleepStackHQ",
  tagline: "Stack the science of better sleep.",
  description:
    "Independent reviews, science-backed guides, and the best gear for deeper, more restorative sleep.",
  url: "https://sleepstackhq.vercel.app",
  nav: [
    { label: "Stacks", href: "/best" },
    { label: "Lab Reports", href: "/reviews" },
    { label: "Protocols", href: "/guides" },
    { label: "Tools", href: "/tools" },
  ],
  categories: [
    {
      slug: "sleep-tech",
      title: "Sleep Tech",
      description: "Smart alarms, sound machines, and the bedside hardware worth its outlet.",
      href: "/tags/sleep-tech",
    },
    {
      slug: "supplements",
      title: "Supplements",
      description: "Magnesium, melatonin, and the chemistry of falling asleep.",
      href: "/tags/supplements",
    },
    {
      slug: "environment",
      title: "Environment",
      description: "Light, sound, and temperature — the cheap optimizations that beat any gadget.",
      href: "/tags/environment",
    },
    {
      slug: "light-hygiene",
      title: "Light Hygiene",
      description: "Blue blockers, sunrise alarms, and reclaiming your circadian rhythm.",
      href: "/tags/light-hygiene",
    },
  ],
  socials: {
    twitter: "https://x.com/sleepstackhq",
    instagram: "https://instagram.com/sleepstackhq",
    pinterest: "https://pinterest.com/sleepstackhq",
    youtube: "https://youtube.com/@sleepstackhq",
    tiktok: "https://tiktok.com/@sleepstackhq",
    facebook: "https://facebook.com/sleepstackhq",
  },
};

export type SiteConfig = typeof siteConfig;

export function canonical(path: string) {
  return `${siteConfig.url}${path}`;
}
