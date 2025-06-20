import path from "node:path";
import { cwd } from "node:process";
import { type Auth, google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const KEYFILEPATH = path.join(
  cwd(),
  "src",
  "lib",
  "siredesign-4227867bd281.json",
);
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
const TARGET_RANGE = "Website Leads!A:N";

// Moved function definition up
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  const sheets = google.sheets({
    version: "v4",
    auth: authClient as Auth.OAuth2Client,
  });
  return sheets;
}

// Export a function that returns the initialized client
export const getGoogleSheetsClient = async () => {
  return await getSheetsClient(); // Now defined above
};

// Function to append data to the sheet
export async function appendDataToSheet(
  dataRow: (string | number | boolean)[],
) {
  try {
    const sheets = await getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: TARGET_RANGE,
      valueInputOption: "USER_ENTERED", // Interpret data as if user typed it
      insertDataOption: "INSERT_ROWS", // Insert new row instead of overwriting
      requestBody: {
        values: [dataRow], // Data needs to be an array of arrays
      },
    });

    console.log("Appended data to Google Sheet:", response.data);
    return { success: true, message: "Data added to sheet successfully." };
  } catch (error) {
    console.error("Error appending data to Google Sheet:", error);
    // Rethrow or return a structured error
    throw new Error("Failed to append data to Google Sheet.");
    // Or: return { success: false, message: "Failed to append data to Google Sheet." };
  }
}
