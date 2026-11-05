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

interface CareerNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  role: string;
  resumeUrl: string;
  note: string;
}

export function CareerNotificationEmail({
  name,
  email,
  phone,
  role,
  resumeUrl,
  note,
}: CareerNotificationEmailProps) {
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
            New Job Application — MEX Careers
          </Heading>
          <Text
            style={{ fontSize: "14px", color: "#94A3B8", margin: "0 0 20px 0" }}
          >
            A new candidate submitted an application on mexautomation.in:
          </Text>

          <Section style={{ fontSize: "14px", lineHeight: "1.6" }}>
            <Text style={{ margin: "6px 0" }}>
              <strong>Applicant Name:</strong> {name}
            </Text>
            <Text style={{ margin: "6px 0" }}>
              <strong>Role:</strong> {role}
            </Text>
            <Text style={{ margin: "6px 0" }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ margin: "6px 0" }}>
              <strong>Phone:</strong> {phone || "Not provided"}
            </Text>
            <Text style={{ margin: "6px 0" }}>
              <strong>Resume / Profile URL:</strong>{" "}
              <Link href={resumeUrl} style={{ color: "#12EEF5" }}>
                {resumeUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={{ borderColor: "#1E293B", margin: "20px 0" }} />

          <Section>
            <Text
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#94A3B8",
                margin: "0 0 8px 0",
              }}
            >
              Candidate Note &amp; Experience
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#F8FAFC",
                whiteSpace: "pre-wrap",
                backgroundColor: "#05050A",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #1E293B",
              }}
            >
              {note}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
