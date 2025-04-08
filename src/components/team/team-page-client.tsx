"use client";

import type { TeamMember } from "@/app/studio/team";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamPageClientProps {
  teamData: TeamMember[];
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

export default function TeamPageClient({ teamData }: TeamPageClientProps) {
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
    <motion.div
      className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {teamData.map((member) => (
        <motion.div
          key={member.fullName}
          className="flex flex-col items-start"
          variants={itemVariants}
        >
          <div className="w-full mb-6 aspect-[3/4] overflow-hidden">
            <Image
              src={member.mainImage}
              alt={`${member.fullName} - ${member.role}`}
              width={800}
              height={1000}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 1000))}`}
            />
          </div>
          <div className="w-full">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              {member.role}
            </h3>
            <h2 className="text-3xl font-geist-mono mb-4">{member.fullName}</h2>
            <p className="mb-6 text-gray-700">{member.bio}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
