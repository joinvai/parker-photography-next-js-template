"use client"; // Add this directive

import type { Metadata } from "next"; // Keep Metadata for potential future use
import localFont from "next/font/local";
import { usePathname } from "next/navigation"; // Correctly import usePathname
import { editorialNew } from "./fonts"; // Assuming this is correctly imported from a file named fonts.ts or fonts/index.ts
import "./globals.css";
import Footer from "@/components/footer"; // Import the Footer component
import Header from "@/components/header"; // Import the Header component
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner"; // Import Toaster

// Define dmSans font configuration
const dmSans = localFont({
  src: [
    {
      path: "../../public/fonts/DM Sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DM Sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/DM Sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans", // Define CSS variable name for DM Sans
});

// Metadata definition should ideally be moved to layout.tsx in the parent directory (app/layout.tsx) if possible
// or handled differently for Client Components. For now, commenting it out.
// export const metadata: Metadata = {
//   title: "Sire Design Studio | High-End Interior Design & Architecture",
//   description: "Sire Design Studio creates sophisticated, luxurious spaces through high-end interior design and architectural solutions.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route path
  const isHomePage = pathname === "/"; // Check if it's the homepage
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // Window resize handler
  useEffect(() => {
    // Set initial values
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);

    // Function to update dimensions
    const handleResize = () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          const width = window.innerWidth;
          setWindowWidth(width);
          setIsMobile(width < 768);
        });
      } else {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsMobile(width < 768);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // No dependencies needed here

  // Get page title based on path for screen reader announcements
  const getPageTitle = useCallback(() => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/projects")) {
      if (pathname === "/projects") return "Projects";
      return "Project Details";
    }
    return pathname.split("/").pop()?.replace(/-/g, " ") || "Page";
  }, [pathname]);

  // Route change detection for accessibility announcements
  useEffect(() => {
    setIsRouteChanging(true);

    // Short delay to allow for route change to complete
    const timer = setTimeout(() => {
      setIsRouteChanging(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]); // Keep pathname as dependency

  // Determine padding top based on device and page
  const getTopPadding = useCallback(() => {
    if (isHomePage) return "";
    if (isMobile) return "pt-20 sm:pt-24";
    return "pt-28 md:pt-32";
  }, [isHomePage, isMobile]);

  // Focus management for keyboard navigation
  useEffect(() => {
    // Skip focus on back/forward navigation
    if (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      // Find the main content area and set focus
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        // Set tabindex temporarily to make it focusable
        mainContent.tabIndex = -1;
        mainContent.focus({ preventScroll: true });

        // Remove tabindex after focus
        setTimeout(() => {
          mainContent.removeAttribute("tabindex");
        }, 100);
      }
    }
  }, [pathname]); // Keep pathname as dependency

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${editorialNew.variable} antialiased`}
    >
      <body className="bg-#FAF9F5 text-black transition-colors duration-300">
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          Skip to main content
        </a>
        {/* Route change announcement for screen readers */}
        {isRouteChanging && (
          <div aria-live="assertive" className="sr-only">
            Navigating to {getPageTitle()} page
          </div>
        )}
        <Header /> {/* Render the Header component */}
        {/* Apply padding-top dynamically based on the route and device */}
        <main
          id="main-content"
          className={`${getTopPadding()} transition-all duration-300 outline-none`}
        >
          {children} {/* Render the page content */}
        </main>
        <Footer /> {/* Add the Footer component */}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
