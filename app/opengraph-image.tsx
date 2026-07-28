import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AZIZI EGATRI MU'THI — Software Engineer & Product Builder"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0f172a 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            height: "3px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
          }}
        />

        {/* Domain badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
            padding: "8px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(99,102,241,0.4)",
            background: "rgba(99,102,241,0.08)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#6366f1",
            }}
          />
          <span
            style={{
              color: "#a5b4fc",
              fontSize: "16px",
              letterSpacing: "0.05em",
            }}
          >
            aziziem.xyz
          </span>
        </div>

        {/* Main name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: "1.0",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          AZIZI EGATRI MU&#39;THI
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: "2px",
            marginBottom: "28px",
          }}
        />

        {/* Role */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "#94a3b8",
            letterSpacing: "0.01em",
            marginBottom: "12px",
          }}
        >
          Software Engineer &amp; Product Builder
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: "20px",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🇮🇩 Indonesia — Building scalable products that solve real problems
        </div>
      </div>
    ),
    { ...size }
  )
}
