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
      // Reduce top padding while keeping the sides consistent
      className="flex flex-col items-center gap-[25px] px-[50px] pt-6 sm:pt-8 md:pt-10 pb-[30px] max-[479px]:px-[35px] max-[479px]:pt-4 max-[479px]:pb-[20px] max-w-screen-xl mx-auto overflow-hidden"
      aria-labelledby="about-sire-heading"
    >
      {/* Image at the top */}
      <motion.div
        // Make image container square
        className="w-full aspect-square relative overflow-hidden mb-6 md:mb-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Image
          src="/team/studio.jpg"
          alt="Photography studio or representative nature photography"
          fill // Use fill to properly cover the square container
          // Apply image styles from .image-12
          className="w-full h-full object-cover object-center"
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(1000, 1000), // Square dimensions for shimmer
          )}`}
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </motion.div>

      {/* Text Content Below Image */}
      <motion.div
        // Set a constrained max-width that matches the square image's width
        className="w-full max-w-[min(100%,_calc(100vh_-_200px))] mx-auto px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          id="about-sire-heading"
          // Apply styles from .main-name-heading - add text-transform: none
          className="mt-0 mb-0 text-[44px] leading-[50px] text-center normal-case max-[767px]:leading-[125%] max-[479px]:text-[34px] max-[479px]:leading-[40px] font-header tracking-tighter"
          variants={itemVariants}
        >
          About Our Photography Studio
        </motion.h1>

        {/* Paragraphs with Animation Item */}
        <motion.div variants={itemVariants}>
          <p
            // Increase paragraph spacing from mb-5 (20px) to mb-8 (32px)
            className="mb-8 text-justify min-[1920px]:text-[15px] min-[1920px]:leading-[32px] leading-relaxed"
          >
            Our photography projects are based on strong compositional concepts and great
            attention to detail. With an approach rooted in capturing the raw beauty
            of nature and landscapes, we take an
            artistic approach to photography while having an open-minded view of
            innovation.
          </p>
          <p
            // Increase paragraph spacing from mb-5 (20px) to mb-8 (32px)
            className="mb-8 text-justify min-[1920px]:text-[15px] min-[1920px]:leading-[32px] leading-relaxed"
          >
            Each photograph is crafted to be artistically and emotionally
            timeless through the use of premium equipment and unparalleled
            technique. The extraordinary images captured are highly
            detail-oriented and are the sum of carefully composed moments. Our studio
            believes that, as nature photography artists, our role is to
            reveal and celebrate the natural world - breathing new perspective into every
            scene.
          </p>
          <p
            // Last paragraph still doesn't need bottom margin
            className="text-justify min-[1920px]:text-[15px] min-[1920px]:leading-[32px] leading-relaxed"
          >
            Specializing in landscape, wildlife, and adventure nature
            photography, our team has captured images in over three countries and a
            dozen national parks across diverse ecosystems.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
