import { z } from "zod";

export const CareersFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer."),
  phone: z
    .string()
    .max(30, "Phone number must be 30 characters or fewer.")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .min(2, "Please select the role you are applying for.")
    .max(120, "Role must be 120 characters or fewer."),
  resumeUrl: z
    .string()
    .url("Please enter a valid URL for your resume, LinkedIn, or GitHub profile.")
    .max(300, "URL must be 300 characters or fewer."),
  note: z
    .string()
    .min(10, "Please share a brief note on your experience (at least 10 characters).")
    .max(2000, "Note must be 2000 characters or fewer."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to our Privacy Policy to submit this application.",
  }),
  // Honeypot field — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type CareersFormValues = z.infer<typeof CareersFormSchema>;

