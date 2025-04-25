"use client";

import type { ShowAppearance } from "@/app/watch/data"; // Adjust path if needed
import { motion } from "framer-motion";
import Image from "next/image";

interface WatchPageClientProps {
  showData: ShowAppearance[];
}

// Basic blur placeholder SVG
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ddd" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function WatchPageClient({ showData }: WatchPageClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    // Apply motion to the grid container
    <motion.div
      className="mx-auto grid grid-cols-1 gap-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showData.map((show) => (
        <motion.div
          key={show.showName}
          className="tv-show-link flex flex-col items-start"
          variants={itemVariants}
        >
          <h3 className="font-header show-heading">{show.tvNetwork}</h3>
          <div className="w-full mb-6 aspect-video overflow-hidden">
            <Image
              src={show.mainImage}
              alt={`${show.showName} on ${show.tvNetwork}`}
              width={800}
              height={450}
              className="tv-image"
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 450))}`}
            />
          </div>
          <div className="tv-heading-holder">
            <h2 className="tracking-widest text-neutral-700 tv-heading">
              {show.showName}
            </h2>
            <p>{show.showDescription}</p>
            <a href={show.watchUrl} target="_blank" rel="noopener noreferrer" className="button">
              {show.buttonText}
            </a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
