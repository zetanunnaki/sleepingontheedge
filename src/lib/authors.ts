export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  twitter?: string;
}

const authorsData: Record<string, Author> = {
  "sleep-team": {
    slug: "sleep-team",
    name: "Sleep Team",
    role: "Editorial",
    bio: "The SleepStackHQ editorial team is a small group of biohackers, former insomniacs, and obsessive testers. We buy our own gear, log every night, and only publish what survives 30+ nights of real use.",
    credentials: [
      "30+ nights of testing per product",
      "No PR loans, no paid placement",
      "Reviewed by an MD before publishing health claims",
    ],
  },
  "dr-elena-vance": {
    slug: "dr-elena-vance",
    name: "Dr. Elena Vance",
    role: "Medical Reviewer",
    bio: "Elena is a board-certified sleep medicine physician with over a decade of clinical practice. She reviews every supplement and protocol on SleepStackHQ for safety and evidence quality.",
    credentials: [
      "MD, Board-certified in Sleep Medicine",
      "10+ years of clinical practice",
      "Peer-reviewed research in circadian biology",
    ],
  },
};

export function getAuthor(slugOrName: string): Author {
  const direct = authorsData[slugOrName];
  if (direct) return direct;
  const fallback = Object.values(authorsData).find(
    (a) => a.name.toLowerCase() === slugOrName.toLowerCase(),
  );
  return fallback ?? authorsData["sleep-team"];
}

export function getAllAuthors(): Author[] {
  return Object.values(authorsData);
}

export function getAllAuthorSlugs(): string[] {
  return Object.keys(authorsData);
}
