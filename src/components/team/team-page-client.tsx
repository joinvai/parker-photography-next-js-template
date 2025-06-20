"use client";

import type { TeamMember } from "@/app/studio/team";
import { motion } from "framer-motion";
import Image from "next/image";

// Import the Accordion components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  // Filter out John Doe as he's already displayed above
  const filteredTeamData = teamData.filter(member => member.fullName !== "John Doe");

  return (
    <motion.div
      className="pb-[50px] gap-[30px] grid grid-cols-1 one-column max-[991px]:px-[50px] max-[479px]:px-[35px] max-[479px]:py-[25px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredTeamData.map((member) => (
        <motion.div
          key={member.fullName}
          className="grid grid-cols-[0.5fr_0.75fr] gap-0 _1-column max-[991px]:flex max-[991px]:flex-col max-[991px]:justify-center max-[991px]:items-center max-[991px]:px-0"
          variants={itemVariants}
        >
          {/* Image Container */}
          <div className="w-full aspect-[3/4] overflow-hidden">
            <Image
              src={member.mainImage}
              alt={`${member.fullName} - ${member.role}`}
              width={800}
              height={1000}
              className="w-full h-full object-cover object-[50%_7.5%]"
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 1000))}`}
            />
          </div>

          {/* Description Container */}
          <div className="px-[113px] py-[25px] flex flex-col justify-center items-center _1-column max-[991px]:py-[25px] max-[991px]:px-0 max-[991px]:text-center max-[767px]:px-0 max-[479px]:w-auto max-[479px]:px-0">
            {/* Name and Title */}
            <div className="w-full text-left _1-column max-[991px]:text-center">
              <h2 className="text-[24px] leading-[24px] font-header mb-2 hover:italic text-left min-[1920px]:text-[28px] min-[1920px]:leading-[32px] max-[991px]:text-center">
                {member.fullName}
              </h2>
              <h3 className="font-sans text-[13px] uppercase tracking-[2px] mb-4 hover:italic text-left min-[1920px]:text-[15px] min-[1920px]:leading-[32px] max-[991px]:text-center">
                {member.role}
              </h3>
            </div>

            {/* Bio */}
            {member.bio && (
              <div className="w-full text-left _1-column max-[991px]:px-0 max-[991px]:text-center">
                <p className="font-sans text-[13px] leading-[26px] text-justify _1-column min-[1920px]:text-[15px] min-[1920px]:leading-[32px]">
                  {member.bio}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
