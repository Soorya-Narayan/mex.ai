import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getProduct, getCaseStudy, getInsight } from "@/lib/content";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") || "product";
  const slug = searchParams.get("slug") || "";

  let badge = "PRODUCT OVERVIEW";
  let badgeColor = "#12EEF5";
  let title = "MEX Automation";
  let subtitle = "Autonomous Precision. Zero Downtime.";
  let pathLabel = "mexautomation.in";

  if (type === "product") {
    const product = getProduct(slug);
    if (!product) {
      return new Response("Not Found", { status: 404 });
    }
    title = product.frontmatter.title;
    subtitle = product.frontmatter.tagline;
    pathLabel = `mexautomation.in/products/${product.slug}`;
  } else if (type === "case-study") {
    const cs = getCaseStudy(slug);
    if (!cs) {
      return new Response("Not Found", { status: 404 });
    }
    badge = `CASE STUDY · ${cs.frontmatter.industry.toUpperCase()}`;
    badgeColor = "#E81CE6";
    title = cs.frontmatter.title;
    subtitle = cs.frontmatter.client;
    pathLabel = `mexautomation.in/case-studies/${cs.slug}`;
  } else if (type === "insight") {
    const post = getInsight(slug);
    if (!post) {
      return new Response("Not Found", { status: 404 });
    }
    badge = "ENGINEERING INSIGHTS";
    title = post.frontmatter.title;
    subtitle = `By ${post.frontmatter.author}`;
    pathLabel = `mexautomation.in/insights/${post.slug}`;
  } else {
    return new Response("Not Found", { status: 404 });
  }

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
              color: badgeColor,
              padding: "8px 18px",
              borderRadius: "999px",
              border: `1px solid ${badgeColor}`,
            }}
          >
            {badge}
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
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.35,
              color: "#94A3B8",
            }}
          >
            {subtitle}
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
          <span>{pathLabel}</span>
          <span style={{ color: "#94A3B8" }}>Autonomous Precision</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

