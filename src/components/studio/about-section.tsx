"use client";

import { shimmer, toBase64 } from "@/lib/utils"; // Import from shared utils
import { motion } from "framer-motion"; // Import motion for later use
import Image from "next/image";

// --- Utility functions copied from TeamPageClient for placeholder ---
// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#eee" offset="20%" />
//       <stop stop-color="#ddd" offset="50%" />
//       <stop stop-color="#eee" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#eee" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = (str: string) =>
//   typeof window === "undefined"
//     ? Buffer.from(str).toString("base64")
//     : window.btoa(str);
// --- End Utility functions ---

export default function AboutSection() {
  const imageWidth = 800;
  const imageHeight = 1000;

  // --- Animation Variants (similar to TeamPageClient) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
        delayChildren: 0.1, // Optional delay before children start
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly down and transparent
    visible: {
      opacity: 1,
      y: 0, // End at original position and fully opaque
      transition: { duration: 0.5 },
    },
  };
  // --- End Animation Variants ---

  return (
    <section
      className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto overflow-hidden"
      aria-labelledby="about-sire-heading"
    >
      {/* Heading (Can also be animated if desired) */}
      <motion.h1
        id="about-sire-heading"
        className="text-4xl md:text-5xl font-geist-mono tracking-tighter mb-8 md:mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={itemVariants} // Use item variant for heading animation
      >
        About Sire Design
      </motion.h1>

      {/* Content Area with Animation Container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Trigger animation when in view
        viewport={{ once: true, amount: 0.2 }} // Trigger sooner
      >
        {/* Image Column with Animation Item */}
        <motion.div
          className="w-full aspect-[3/4] overflow-hidden relative"
          variants={itemVariants}
        >
          <Image
            src="/team/studio.jpg"
            alt="Sire Design studio or representative project image"
            width={imageWidth}
            height={imageHeight}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(imageWidth, imageHeight),
            )}`}
          />
        </motion.div>

        {/* Text Column with Animation Item */}
        <motion.div
          className="flex flex-col justify-center"
          variants={itemVariants}
        >
          {/* Actual Content Added */}
          <p className="mb-4 text-gray-700 leading-relaxed">
            Sire Design's projects are based on strong design concepts and great
            attention to detail. With a design approach rooted in modernist
            principles of design and architecture, Sire Design takes an
            analytical approach to interiors while having an open-minded view of
            innovation.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Each of the firm's designs are made stylistically and functionally
            everlasting with the use of premium materials and unparalleled
            craftsmanship. The extraordinary spaces they design are highly
            detail-oriented and are the sum of carefully curated ideas. Sire
            Design believes that, as interior design creatives, their role is to
            transform and re-purpose each space - breathing new life into every
            project.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Specializing in residential, development, and commercial interior
            design, they have completed projects in over three countries and a
            dozen cities nationally.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
