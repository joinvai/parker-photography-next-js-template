import { appendDataToSheet } from "@/lib/google-sheets"; // Function to mock
import { format } from "date-fns-tz";
import { submitProjectInquiry } from "../submit-project-inquiry";

// --- Mocking ---
// Mock the google-sheets module
jest.mock("@/lib/google-sheets", () => ({
  // Mock the specific named export
  appendDataToSheet: jest.fn(),
}));

// Mock date-fns-tz to control timestamp generation if needed, but jest timers might be enough
// jest.mock('date-fns-tz');

// --- Test Setup ---
const mockAppendDataToSheet = appendDataToSheet as jest.MockedFunction<
  typeof appendDataToSheet
>;

// Mock Date for consistent timestamps
const MOCK_DATE = new Date("2024-07-27T10:30:00.000Z"); // Use a fixed UTC time
const MOCK_TIMEZONE = "America/New_York";
const EXPECTED_TIMESTAMP = format(MOCK_DATE, "yyyy-MM-dd HH:mm:ss zzzz", {
  timeZone: MOCK_TIMEZONE, // Should match the action's timezone
});

// --- Helper Function ---
function createMockFormData(
  data: Record<string, string | boolean | null | undefined>,
): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      if (key === "ongoingProject" && typeof value === "boolean") {
        // Simulate checkbox 'on' value if true
        if (value) {
          formData.append(key, "on");
        }
        // If false, the key is simply not appended, like a real unchecked checkbox
      } else {
        formData.append(key, String(value));
      }
    }
  }
  return formData;
}

// --- Tests ---
describe("submitProjectInquiry Server Action", () => {
  beforeEach(() => {
    // Reset mocks and timers before each test
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
  });

  afterEach(() => {
    // Restore real timers after each test
    jest.useRealTimers();
  });

  it("should successfully validate and append valid data", async () => {
    // Arrange: Mock successful sheet append
    mockAppendDataToSheet.mockResolvedValue({
      success: true,
      message: "Mock success",
    });

    const validData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "1234567890",
      projectAddress: "123 Test St",
      projectType: "House",
      projectDescription: "A test project",
      referralSource: "Google",
      ongoingProject: true,
      projectDetails: "Existing details",
      projectState: "Planning",
      budget: "$500k - $1.5M",
      projectScopeDetails: "Scope details here",
    };
    const formData = createMockFormData(validData);

    // Act
    const result = await submitProjectInquiry(formData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Inquiry submitted successfully and saved!");
    expect(result.errors).toBeNull();

    // Assert appendDataToSheet was called correctly
    expect(mockAppendDataToSheet).toHaveBeenCalledTimes(1);
    const expectedSheetData = [
      EXPECTED_TIMESTAMP, // Check the timestamp format
      validData.firstName,
      validData.lastName,
      validData.email,
      validData.phone,
      validData.projectAddress,
      validData.projectType,
      validData.projectDescription,
      "Yes", // Check boolean formatting
      validData.projectDetails,
      validData.projectState,
      validData.budget,
      validData.projectScopeDetails,
      validData.referralSource,
    ];
    expect(mockAppendDataToSheet).toHaveBeenCalledWith(expectedSheetData);
  });

  it("should handle ongoingProject being false", async () => {
    // Arrange
    mockAppendDataToSheet.mockResolvedValue({
      success: true,
      message: "Mock success",
    });
    const validData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      projectType: "House",
      projectDescription: "A test project",
      ongoingProject: false, // Explicitly false
      // projectDetails should not be required/relevant here if logic hides it
    };
    const formData = createMockFormData(validData);

    // Act
    const result = await submitProjectInquiry(formData);

    // Assert
    expect(result.success).toBe(true);
    expect(mockAppendDataToSheet).toHaveBeenCalledTimes(1);
    const calledArgs = mockAppendDataToSheet.mock.calls[0][0]; // Get the array passed to the mock
    expect(calledArgs[8]).toBe("No"); // Index 8 is ongoingProject
  });

  it("should return validation errors for invalid data", async () => {
    // Arrange: Invalid data (missing required fields, invalid email)
    const invalidData = {
      firstName: "", // Missing
      lastName: "User",
      email: "not-an-email", // Invalid
      projectType: "", // Missing
      projectDescription: "", // Missing
      ongoingProject: false,
    };
    const formData = createMockFormData(invalidData);

    // Act
    const result = await submitProjectInquiry(formData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Validation failed on the server.");
    expect(result.errors).not.toBeNull();
    expect(result.errors?.firstName).toContain("First name is required");
    expect(result.errors?.email).toContain("Invalid email address");
    expect(result.errors?.projectType).toContain("Project type is required");
    expect(result.errors?.projectDescription).toContain(
      "Project description is required",
    );

    // Assert appendDataToSheet was NOT called
    expect(mockAppendDataToSheet).not.toHaveBeenCalled();
  });

  it("should return an error if appending to sheet fails", async () => {
    // Arrange: Mock failed sheet append
    const mockError = new Error("Failed to append data to Google Sheet.");
    mockAppendDataToSheet.mockRejectedValue(mockError); // Simulate the throw

    const validData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      projectType: "Apartment",
      projectDescription: "Another test",
      budget: "Less than $500k",
      ongoingProject: false,
    };
    const formData = createMockFormData(validData);

    // Act
    const result = await submitProjectInquiry(formData);

    // Assert
    expect(result.success).toBe(false);
    // Check the specific error message thrown by the catch block in the action
    expect(result.message).toBe("Failed to append data to Google Sheet.");
    expect(result.errors).toBeNull();

    // Assert appendDataToSheet was called
    expect(mockAppendDataToSheet).toHaveBeenCalledTimes(1);
  });
});
