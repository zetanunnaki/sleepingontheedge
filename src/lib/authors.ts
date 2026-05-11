export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
}

const authorsData: Record<string, Author> = {
  "sleep-team": {
    slug: "sleep-team",
    name: "Sleep Team",
    role: "Editorial",
    bio: "SleepingOnTheEdge is an independent sleep publication. Our editorial team researches sleep products by analyzing thousands of verified buyer reviews from Amazon, Walmart, and sleep communities — then puts what real owners are saying in plain English.",
    credentials: [
      "Independent editorial team — no paid placement",
      "Recommendations based on verified buyer reviews and sleep science",
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
