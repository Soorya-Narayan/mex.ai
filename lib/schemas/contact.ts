import { z } from "zod";

export const PRODUCT_INTEREST_OPTIONS = [
  { value: "heatwatch", label: "HeatWatch" },
  { value: "crate-pouch-counting", label: "Crate & Pouch Counting" },
  { value: "bottle-counting", label: "Bottle Detection & Counting" },
  { value: "data-logger", label: "Data Logger" },
  { value: "dashboards", label: "Dashboards" },
  { value: "twinforge-studio", label: "TwinForge Studio" },
  { value: "request-demo", label: "Request a Demo" },
  { value: "general-inquiry", label: "General Inquiry" },
] as const;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  company: z
    .string()
    .min(2, "Please enter your company or plant name.")
    .max(120, "Company name must be 120 characters or fewer."),
  email: z
    .string()
    .email("Please enter a valid work email address.")
    .max(160, "Email must be 160 characters or fewer."),
  phone: z
    .string()
    .max(30, "Phone number must be 30 characters or fewer.")
    .optional()
    .or(z.literal("")),
  productInterest: z.string().min(1, "Please select a product or topic."),
  message: z
    .string()
    .min(10, "Please share a few details (at least 10 characters).")
    .max(2000, "Message must be 2000 characters or fewer."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to our Privacy Policy to submit this form.",
  }),
  // Honeypot field — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
  brochureFile: z.string().max(100).optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
