import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

interface LeadAutoReplyEmailProps {
  name: string;
  productInterest: string;
}

export function LeadAutoReplyEmail({
  name,
  productInterest,
}: LeadAutoReplyEmailProps) {
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
            We Received Your Inquiry — MEX Automation
          </Heading>

          <Section style={{ fontSize: "14px", lineHeight: "1.6", color: "#E2E8F0" }}>
            <Text>Hello {name},</Text>
            <Text>
              Thank you for contacting <strong>MEX Automation</strong> regarding{" "}
              <strong>{productInterest}</strong>. Our application engineering
              team has received your message and will get back to you within one
              business day.
            </Text>
            <Text>
              In the meantime, you can explore our technical documentation and
              product overviews at{" "}
              <Link
                href="https://mexautomation.in/products"
                style={{ color: "#12EEF5", textDecoration: "underline" }}
              >
                mexautomation.in/products
              </Link>
              .
            </Text>
          </Section>

          <Hr style={{ borderColor: "#1E293B", margin: "20px 0" }} />

          <Text style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>
            MEX Automation &middot; Autonomous Precision. Zero Downtime.
            <br />
            If you did not submit this inquiry, please disregard this email or
            contact us at [EMAIL].
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

