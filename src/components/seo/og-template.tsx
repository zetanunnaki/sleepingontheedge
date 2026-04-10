import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

interface ArticleOgProps {
  type: string;
  title: string;
}

export function articleOgImage({ type, title }: ArticleOgProps) {
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
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            <span>SleepStack</span>
            <span style={{ color: "#a5b4fc" }}>HQ</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#fbbf24",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: 800,
            }}
          >
            {type}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? "60px" : "76px",
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: "1040px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#94a3b8",
          }}
        >
          <span>sleepstackhq.com</span>
          <span>Reader-supported · Independent</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
