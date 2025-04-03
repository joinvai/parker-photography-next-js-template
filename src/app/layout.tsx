import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header"; // Import the Header component

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
  variable: '--font-dm-sans'
});

const editorialNew = localFont({
  src: [
    {
      path: '../../public/fonts/Editorial New/PPEditorialNew-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Editorial New/PPEditorialNew-Ultrabold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-editorial-new'
});

export const metadata: Metadata = {
  title: "Sire Design Studio | High-End Interior Design & Architecture",
  description: "Sire Design Studio creates sophisticated, luxurious spaces through high-end interior design and architectural solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${editorialNew.variable} antialiased`}
      >
        <Header /> {/* Render the Header component */}
        {children}
      </body>
    </html>
  );
}
