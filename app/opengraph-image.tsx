import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "MEX Automation — Autonomous Precision. Zero Downtime. Industrial AI & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05050A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Top brand gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12px",
            background:
              "linear-gradient(90deg, #E81CE6 0%, #8A0CF0 25%, #1A2BDB 50%, #1FA9F0 78%, #12EEF5 100%)",
          }}
        />

        {/* Header Row: Logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #E81CE6 0%, #8A0CF0 35%, #1A2BDB 70%, #12EEF5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "2px",
                color: "#FFFFFF",
              }}
            >
              MEX AUTOMATION
            </span>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "3px",
                color: "#12EEF5",
                textTransform: "uppercase",
              }}
            >
              Industrial AI &amp; Automation
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#FFFFFF",
            }}
          >
            Autonomous Precision. Zero Downtime.
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#94A3B8",
            }}
          >
            Thermal Intelligence · Physics-Informed Digital Twins · Vision
            Systems · Energy Monitoring
          </div>
        </div>

        {/* Footer Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1E293B",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#12EEF5",
          }}
        >
          <span>mexautomation.in</span>
          <span style={{ color: "#94A3B8", fontSize: "18px" }}>
            Engineered for Indian Manufacturing
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

