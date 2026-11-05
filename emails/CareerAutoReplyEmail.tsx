import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

interface CareerAutoReplyEmailProps {
  name: string;
  role: string;
}

export function CareerAutoReplyEmail({
  name,
  role,
}: CareerAutoReplyEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body
        style={{
          backgroundColor: "#05050A",
          color: "#F8FAFC",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          padding: "24px",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: "#0E0E18",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "28px",
          }}
        >
          <Heading
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#12EEF5",
              margin: "0 0 16px 0",
            }}
          >
            Application Received — MEX Automation
          </Heading>
          <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#F8FAFC" }}>
            Dear {name},
          </Text>
          <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#94A3B8" }}>
            Thank you for applying for <strong>{role}</strong> at MEX Automation.
            Our engineering team has received your application and will review
            your profile.
          </Text>
          <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#94A3B8" }}>
            If your experience aligns with our active openings, we will contact you directly to schedule an interview.
          </Text>

          <Hr style={{ borderColor: "#1E293B", margin: "24px 0" }} />

          <Text style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
            MEX Automation Pvt. Ltd. · Kochi &amp; Kerala, India
            <br />
            Engineering Autonomous Industrial Systems
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
