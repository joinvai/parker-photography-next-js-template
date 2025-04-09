"use client";

// Use alias path now that server action is in the correct location
import { addEmailToSheet } from "@/actions/add-email-to-sheet";
import { toast } from "@/lib/utils/toast";
import { emailSchema } from "@/lib/validations/email-schema";
import {
  type FC,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { z } from "zod";

// Assuming you have a header font defined in your Tailwind config or global CSS
// Use the variable defined in layout.tsx (e.g., editorialNew.variable is --font-editorial-new)
// const headerFontClass = "font-editorial"; // Use the CSS variable name directly
const beigeTextColor = "text-beige-600"; // Define your beige color class - needs configuration in tailwind.config.js

// Component to handle newsletter subscription input
const SubscribeInput: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (
    event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event && "preventDefault" in event) {
      event.preventDefault();
    }

    // Clear previous error
    setError(null);

    // 1. Client-side validation
    const validationResult = emailSchema.safeParse({ email });
    if (!validationResult.success) {
      setError(
        validationResult.error.errors[0]?.message || "Invalid email address.",
      );
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("email", email);

    // 2. Call Server Action
    startTransition(async () => {
      const result = await addEmailToSheet(formData);
      if (result.success) {
        toast(result.message);
        setEmail(""); // Clear input on success
        formRef.current?.reset(); // Reset the form element itself
      } else {
        setError(result.message);
      }
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission if any
      handleSubmit(event);
    }
  };

  return (
    // Use relative positioning for the error message container
    <div className="relative w-full max-w-xs">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-baseline" // Use flex and align baseline for label/input
      >
        <label
          htmlFor="email-subscribe"
          className="text-sm font-medium uppercase mr-2 whitespace-nowrap font-heading"
        >
          SUBSCRIBE TO NEWSLETTER
        </label>
        <input
          id="email-subscribe"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          // Remove placeholder
          disabled={isPending}
          className={`
            flex-grow // Allow input to take remaining space
            border-b border-gray-500 dark:border-gray-400
            bg-transparent
            focus:outline-none focus:border-black dark:focus:border-white
            text-sm leading-none py-1 // Adjusted padding/leading for minimal look
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
            ${error ? "border-red-500" : ""} 
          `}
          aria-describedby="email-error"
        />
      </form>
      {error && (
        // Position error below the form container
        <p
          id="email-error"
          className={`mt-1 text-xs ${beigeTextColor} absolute left-0`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default SubscribeInput;
