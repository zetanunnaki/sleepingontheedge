export const siteConfig = {
  name: "SleepingOnTheEdge",
  displayName: "Sleeping On The Edge",
  tagline: "The sharpest sleep advice on the internet.",
  description:
    "Cutting-edge sleep science, honest product breakdowns, and the edge you need to actually sleep better. Independent, research-backed, no BS.",
  url: "https://sleepingontheedge.com",
  nav: [
    { label: "The Edge", href: "/best" },
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
      slug: "bedding",
      title: "Bedding",
      description: "Sheets, pillows, mattresses, and toppers that actually change how you sleep.",
      href: "/tags/bedding",
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
    twitter: "https://x.com/sleepingontheedge",
    instagram: "https://instagram.com/sleepingontheedge",
    pinterest: "https://pinterest.com/sleepingontheedge",
    youtube: "https://youtube.com/@sleepingontheedge",
    tiktok: "https://tiktok.com/@sleepingontheedge",
    facebook: "https://facebook.com/sleepingontheedge",
  },
};

export type SiteConfig = typeof siteConfig;

export function canonical(path: string) {
  return `${siteConfig.url}${path}`;
}
