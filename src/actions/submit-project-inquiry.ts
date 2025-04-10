"use server";

import { appendDataToSheet } from "@/lib/google-sheets";
import {
  type ProjectInquirySchema,
  projectInquirySchema,
} from "@/lib/validation/project-inquiry";
import { format } from "date-fns-tz";

// Define Timezone (matching add-email-to-sheet.ts)
const TIME_ZONE = "America/New_York";

// Define the expected return type for the action
interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | null; // For validation errors
}

export async function submitProjectInquiry(
  formData: FormData,
): Promise<ActionResult> {
  // 1. Extract data and perform type coercion
  const rawFormData = Object.fromEntries(formData.entries());

  // Coerce checkbox value to boolean
  const coercedData = {
    ...rawFormData,
    ongoingProject: rawFormData.ongoingProject === "on", // Convert 'on'/undefined to boolean
    // Add other coercions here if needed (e.g., for numbers)
  };

  // 2. Validate data using Zod schema
  const validationResult = projectInquirySchema.safeParse(coercedData); // Use coerced data

  if (!validationResult.success) {
    // Validation failed logic (implementation in next step)
    console.error(
      "Server-side validation failed:",
      validationResult.error.flatten(),
    );
    return {
      success: false,
      message: "Validation failed on the server.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 3. Process valid data and format for Google Sheets
  const validatedData = validationResult.data;
  console.log("Server received valid data:", validatedData);

  // Add a timestamp using the correct format and timezone
  const now = new Date();
  const timestamp = format(now, "yyyy-MM-dd HH:mm:ss zzzz", {
    timeZone: TIME_ZONE,
  });

  // Define the order of columns for Google Sheets
  const sheetDataRow = [
    timestamp,
    validatedData.firstName,
    validatedData.lastName,
    validatedData.email,
    validatedData.phone ?? "", // Use empty string for optional fields
    validatedData.projectAddress ?? "",
    validatedData.projectType,
    validatedData.projectDescription,
    validatedData.ongoingProject ? "Yes" : "No", // Format boolean
    validatedData.projectDetails ?? "",
    validatedData.projectState ?? "",
    validatedData.budget ?? "",
    validatedData.projectScopeDetails ?? "",
    validatedData.referralSource ?? "",
  ];

  console.log("Formatted data for Google Sheet:", sheetDataRow);

  // 4. Call Google Sheets append function
  try {
    // Replace placeholder with actual call
    const appendResult = await appendDataToSheet(sheetDataRow);

    if (!appendResult.success) {
      // If appendDataToSheet returns an error object (optional based on its implementation)
      throw new Error(
        appendResult.message || "Failed to append data to sheet.",
      );
    }

    console.log("Successfully appended data to Google Sheet.");

    return {
      success: true,
      message: "Inquiry submitted successfully and saved!",
      errors: null,
    };
  } catch (error) {
    console.error("Error during submission to Google Sheets:", error);
    // Return a more specific error message if possible
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during submission.";
    return {
      success: false,
      message: errorMessage,
      errors: null,
    };
  }
}
