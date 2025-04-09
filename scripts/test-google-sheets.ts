import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

// Explicitly define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEY_FILE_PATH = path.join(
  __dirname,
  "../src/lib/siredesign-4227867bd281.json",
);
const SPREADSHEET_ID = "1uBawMgtpx7h0AEL1dlnHq221T5wDR5QirHQR7ZnxLeI"; // From PRD Appendix
const SHEET_NAME = "Website Signups"; // Corrected sheet name from user confirmation
// Revert back to write scope
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function testGoogleSheetsWrite() {
  // Revert function name
  console.log("Attempting to authenticate with Google Sheets API..."); // Revert log message
  console.log(`Using key file: ${KEY_FILE_PATH}`);

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    // @ts-ignore // Ignore type checking for JWT client specifically
    const sheets = google.sheets({ version: "v4", auth: client });

    console.log("Authentication successful.");
    console.log(
      `Attempting to write to Spreadsheet ID: ${SPREADSHEET_ID}, Sheet: ${SHEET_NAME}...`, // Revert log message
    );

    const timestamp = new Date().toISOString();
    const values = [["Test Email from Script", timestamp]];

    const resource = {
      values,
    };

    // Append the row (Revert back to append)
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`, // Ensure range uses the correct sheet name
      valueInputOption: "USER_ENTERED", // How the input data should be interpreted
      requestBody: resource,
    });

    console.log("Successfully appended data to Google Sheet:"); // Revert log message
    console.log(JSON.stringify(response.data, null, 2));
    console.log(`
Please check your sheet "${SHEET_NAME}" in spreadsheet ID ${SPREADSHEET_ID} to confirm.`); // Revert log message
  } catch (error) {
    console.error("Error writing to Google Sheet:", error); // Revert log message
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      // @ts-ignore // Check for specific Google API error details if available
      if ("response" in error && (error as any).response?.data) {
        // @ts-ignore
        console.error(
          "Google API Error details:",
          JSON.stringify((error as any).response.data, null, 2),
        );
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
    console.error("Troubleshooting Tips:");
    console.error(
      "1. Ensure the key file path is correct and the file exists.",
    );
    console.error(
      "2. Verify the service account email has EDIT access to the Google Sheet.", // Revert log message
    );
    console.error(
      "3. Check if the Google Sheets API is enabled in your Google Cloud project.",
    );
    console.error(`4. Ensure the sheet name "${SHEET_NAME}" is correct.`); // Revert log message
  }
}

testGoogleSheetsWrite(); // Revert function call
