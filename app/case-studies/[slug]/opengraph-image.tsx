import { ImageResponse } from "next/og";
import { getCaseStudy, getAllCaseStudies } from "@/lib/content";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const title = cs?.frontmatter.title || "MEX Automation Case Study";
  const industry = cs?.frontmatter.industry || "Industrial Automation";

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
              color: "#E81CE6",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid #E81CE6",
            }}
          >
            {`CASE STUDY · ${industry.toUpperCase()}`}
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
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#FFFFFF",
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
            borderTop: "1px solid #1E293B",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#12EEF5",
          }}
        >
          <span>{`mexautomation.in/case-studies/${slug}`}</span>
          <span style={{ color: "#94A3B8" }}>Measured Plant Outcomes</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
