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
    bio: "The SleepStackHQ editorial team curates sleep-related content by gathering information from published studies, clinical guidelines, and verified buyer reviews — then puts it in plain English so you can make better decisions about your sleep.",
    credentials: [
      "Source-cited content",
      "No paid placement, no sponsored rankings",
      "Health content reviewed by a medical advisor",
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
