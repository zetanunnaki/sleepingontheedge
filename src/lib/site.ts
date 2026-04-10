export const siteConfig = {
  name: "SleepStackHQ",
  tagline: "Stack the science of better sleep.",
  description:
    "Independent reviews, science-backed guides, and the best gear for deeper, more restorative sleep.",
  url: "https://sleepstackhq.com",
  nav: [
    { label: "Stacks", href: "/best" },
    { label: "Lab Reports", href: "/reviews" },
    { label: "Protocols", href: "/guides" },
  ],
  categories: [
    {
      slug: "mattresses",
      title: "Mattresses",
      description: "Foam, hybrid, and cooling picks tested for every sleeper.",
    },
    {
      slug: "pillows",
      title: "Pillows",
      description: "Neck-friendly options for side, back, and stomach sleepers.",
    },
    {
      slug: "sound-machines",
      title: "Sound & Light",
      description: "Smart alarms, white noise, and circadian lighting.",
    },
    {
      slug: "supplements",
      title: "Supplements",
      description: "Magnesium, melatonin, and the science behind them.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
