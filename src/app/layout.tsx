'use client'; // Add this directive

import type { Metadata } from "next"; // Keep Metadata for potential future use
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation'; // Correctly import usePathname
import { editorialNew } from './fonts'; // Assuming this is correctly imported from a file named fonts.ts or fonts/index.ts
import "./globals.css";
import Header from "@/components/header"; // Import the Header component

// Define dmSans font configuration
const dmSans = localFont({
  src: [
    {
      path: '../../public/fonts/DM Sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DM Sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DM Sans/DMSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-dm-sans' // Define CSS variable name for DM Sans
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
  const isHomePage = pathname === '/'; // Check if it's the homepage

  return (
    <html lang="en" className={`${dmSans.variable} ${editorialNew.variable} antialiased`}>
      <body>
        <Header /> {/* Render the Header component */}
        {/* Apply padding-top dynamically based on the route */}
        <main className={isHomePage ? '' : 'pt-32'}> {/* Apply 'pt-32' unless it's the homepage */}
          {children} {/* Render the page content */}
        </main>
      </body>
    </html>
  );
}
