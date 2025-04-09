"use server";

import path from "node:path";
import { emailSchema } from "@/lib/validations/email-schema"; // Assuming '@/' maps to 'src/'
import { format } from "date-fns-tz";
import { google } from "googleapis";
import { z } from "zod";

// --- Configuration ---
// Ensure this path is correct relative to the compiled output or use absolute paths/env vars in production
const KEY_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "siredesign-4227867bd281.json",
);
const SPREADSHEET_ID = "1uBawMgtpx7h0AEL1dlnHq221T5wDR5QirHQR7ZnxLeI";
const SHEET_NAME = "Website Signups"; // Confirmed correct name
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TIME_ZONE = "America/New_York";

// --- Google Sheets Client Initialization ---
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

// --- Server Action ---
interface ActionResult {
  success: boolean;
  message: string;
}

export async function addEmailToSheet(
  formData: FormData,
): Promise<ActionResult> {
  const rawEmail = formData.get("email");

  // 1. Validate Input
  const validationResult = emailSchema.safeParse({ email: rawEmail });

  if (!validationResult.success) {
    // Return specific validation error message
    return {
      success: false,
      message:
        validationResult.error.errors[0]?.message || "Invalid email format.",
    };
  }

  const validatedEmail = validationResult.data.email;

  try {
    // 2. Authenticate and Get Client
    const client = await auth.getClient();
    // @ts-ignore // Ignore type checking for JWT client specifically
    const sheets = google.sheets({ version: "v4", auth: client });

    // 3. Format Timestamp
    const now = new Date();
    const formattedTimestamp = format(now, "yyyy-MM-dd HH:mm:ss zzzz", {
      timeZone: TIME_ZONE,
    });

    // 4. Prepare Data
    const values = [[validatedEmail, formattedTimestamp]];
    const resource = {
      values,
    };

    // 5. Append to Sheet
    console.log(`Attempting to append to ${SHEET_NAME}:`, values);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`, // Append to columns A and B
      valueInputOption: "USER_ENTERED",
      requestBody: resource,
    });

    console.log(`Successfully appended ${validatedEmail} to sheet.`);
    return {
      success: true,
      message: "Thank you for subscribing!",
    };
  } catch (error) {
    console.error("Error appending email to Google Sheet:", error);
    // Generic error for the client, specific error logged server-side
    return {
      success: false,
      message: "Submission failed. Please try again later.",
    };
  }
}
