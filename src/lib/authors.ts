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
    bio: "The SleepStackHQ editorial team is a small group of writers and researchers who synthesize peer-reviewed sleep science and aggregate buyer feedback into plain-English guides. We don't run clinical trials and we don't sell anything ourselves.",
    credentials: [
      "Research-driven, source-cited content",
      "No paid placement, no sponsored rankings",
      "Editorial review by a medical advisor before publishing health-related content",
    ],
  },
  "dr-elena-vance": {
    slug: "dr-elena-vance",
    name: "Dr. Elena Vance",
    role: "Medical Advisor",
    bio: "Elena is a board-certified sleep medicine physician with over a decade of clinical practice. She reviews SleepStackHQ articles touching on health, supplements, or sleep disorders for accuracy and to ensure they avoid framing that could be mistaken for medical advice.",
    credentials: [
      "MD, Board-certified in Sleep Medicine",
      "10+ years of clinical practice",
      "Peer-reviewed contributions in circadian biology",
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
