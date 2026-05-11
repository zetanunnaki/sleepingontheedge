const STORAGE_KEY = "soe-cookie-consent";

export type ConsentState = "pending" | "accepted" | "declined";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "pending";
    const parsed = JSON.parse(raw);
    return parsed.accepted ? "accepted" : "declined";
  } catch {
    return "pending";
  }
}

export function setConsent(accepted: boolean) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted, at: Date.now() }),
    );
  } catch {}
}
