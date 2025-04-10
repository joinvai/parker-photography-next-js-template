import { z } from "zod";

export const projectInquirySchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string().optional(), // Optional field
  projectAddress: z.string().optional(),
  projectType: z.string().min(1, { message: "Project type is required" }),
  projectDescription: z
    .string()
    .min(1, { message: "Project description is required" }),
  referralSource: z.string().optional(),
  ongoingProject: z.boolean(),
  projectDetails: z.string().optional(),
  projectState: z.string().optional(), // Can refine with enum later if needed
  budget: z
    .enum([
      "No budget",
      "Less than $500k",
      "$500k - $1.5M",
      "$1.5M - $2.5M",
      "$2.5M +",
      "Other",
    ])
    .optional(), // Make the enum optional
  projectScopeDetails: z.string().optional(),
});

// Export a type alias for the schema
export type ProjectInquirySchema = z.infer<typeof projectInquirySchema>;
