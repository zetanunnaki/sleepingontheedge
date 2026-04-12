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
    bio: "SleepingOnTheEdge is written by a small team of writers who curate sleep product recommendations based on aggregated customer reviews from Amazon, Walmart, and sleep communities — then put what real buyers are saying in plain English. We are writers, not clinicians. We do not test products and we do not conduct research.",
    credentials: [
      "Independent writer team — no paid placement",
      "Product picks based on aggregated customer reviews",
      "Not medical advice — always consult a qualified provider",
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
