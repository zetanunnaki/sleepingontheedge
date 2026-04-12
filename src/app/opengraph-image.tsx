import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 10%, rgba(79,70,229,0.35), transparent 50%), radial-gradient(circle at 90% 90%, rgba(245,158,11,0.15), transparent 50%), #020617",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              background: "#4f46e5",
              boxShadow: "0 0 40px rgba(79,70,229,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🌙
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            <span>Sleeping</span>
            <span style={{ color: "#a5b4fc" }}>OnThe</span>
            <span>Edge</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "28px",
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: 700,
            }}
          >
            Cutting-Edge Sleep Science
          </div>
          <div
            style={{
              fontSize: "76px",
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "1040px",
            }}
          >
            The sharpest sleep advice on the internet.
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>sleepingontheedge.com</span>
          <span>Reader-supported. Independent.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
