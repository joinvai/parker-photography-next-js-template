import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  description?: string;
  // Add other sonner options as needed (e.g., duration, icon)
}

/**
 * Displays a toast notification using sonner.
 *
 * @param message The main message to display.
 * @param options Optional configuration for the toast.
 */
export function toast(message: string, options?: ToastOptions) {
  sonnerToast(message, {
    description: options?.description,
    // Add default options or pass through others here
  });
}

// Optionally, you could add specific functions like:
// export function toastSuccess(message: string, options?: ToastOptions) { ... }
// export function toastError(message: string, options?: ToastOptions) { ... }
