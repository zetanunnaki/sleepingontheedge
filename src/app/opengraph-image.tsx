import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const ogBg = readFileSync(
    join(process.cwd(), "public/images/hero/og-home.png"),
  );
  const ogBgBase64 = `data:image/png;base64,${ogBg.toString("base64")}`;

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
          color: "#f8fafc",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
          background: "#020617",
        }}
      >
        {/* Background image */}
        <img
          src={ogBgBase64}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        {/* Dark overlay for text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.5) 50%, rgba(2,6,23,0.3) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
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

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
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
            position: "relative",
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
