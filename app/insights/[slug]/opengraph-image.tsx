import { ImageResponse } from "next/og";
import { getInsight, getAllInsights } from "@/lib/content";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllInsights().map((post) => ({ slug: post.slug }));
}

export default async function InsightOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  const title = post?.frontmatter.title || "MEX Engineering Insights";
  const author = post?.frontmatter.author || "MEX Engineering Team";

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#FFFFFF",
            }}
          >
            MEX AUTOMATION
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#12EEF5",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid #12EEF5",
            }}
          >
            ENGINEERING INSIGHTS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "24px", color: "#94A3B8" }}>
            {`By ${author}`}
          </div>
        </div>

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
          <span>{`mexautomation.in/insights/${slug}`}</span>
          <span style={{ color: "#94A3B8" }}>Industrial AI Blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
