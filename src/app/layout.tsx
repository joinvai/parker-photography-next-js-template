import type { Metadata } from "next";
import localFont from 'next/font/local';
import { editorialNew } from './fonts';
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
    <html lang="en" className={`${dmSans.variable} ${editorialNew.variable} antialiased`}>
      <body>
        <Header /> {/* Render the Header component */}
        {children}
      </body>
    </html>
  );
}
