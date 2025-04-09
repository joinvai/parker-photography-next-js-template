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
const headerFontClass = "font-editorial"; // Use the CSS variable name directly
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative w-full max-w-xs"
    >
      <label
        htmlFor="email-subscribe"
        className={`block text-sm font-medium uppercase mb-1 ${headerFontClass}`}
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
        placeholder="Enter your email"
        disabled={isPending}
        className={`
          block w-full px-3 py-2 
          border-b border-gray-500 dark:border-gray-400 
          bg-transparent 
          focus:outline-none focus:border-black dark:focus:border-white
          placeholder-gray-400 dark:placeholder-gray-500
          text-sm
          ${isPending ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "border-red-500" : ""} // Use red for error border for now
        `}
        aria-describedby="email-error"
      />
      {error && (
        <p
          id="email-error"
          className={`mt-1 text-xs ${beigeTextColor} absolute -bottom-5 left-0`}
        >
          {error}
        </p>
      )}
      {/* Success message handling is now done via Toast */}
    </form>
  );
};

export default SubscribeInput;
