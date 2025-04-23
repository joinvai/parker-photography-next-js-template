"use client";

import AboutSection from "@/components/studio/about-section";
import StudioQuote from "@/components/studio/studio-quote";
import TeamPageClient from "@/components/team/team-page-client";
import { teamData } from "./team";
import { motion } from "framer-motion";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";

export default function StudioPage() {
  // Animation variants for founder image
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-eggshell text-black pt-24">
      <StudioQuote />
      <AboutSection />
      <div className="p-8 md:p-16">

        {/* Eilyn Jimenez Image - Centered above the grid */}
        <div className="max-w-screen-xl mx-auto mb-16">
          <motion.div
            className="w-full aspect-square relative overflow-hidden mb-6 md:mb-8 max-w-[min(100%,_calc(100vh_-_200px))] mx-auto"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src="/team/eilyn.jpg"
              alt="Eilyn Jimenez - Founder & Creative Director"
              fill
              className="w-full h-full object-cover object-top"
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1000, 1000)
              )}`}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
          <div className="flex max-w-[min(100%,_calc(100vh_-_200px))] py-5 flex-col gap-[5px] mx-auto lg:mx-auto md:py-[37px] md:justify-center md:items-center md:w-auto md:px-0 max-[479px]:w-auto max-[479px]:px-0 max-[479px]:text-left">
            <h2 className="mt-0 mb-2 text-[24px] leading-[24px] text-center normal-case font-header hover:italic min-[1920px]:text-[28px] min-[1920px]:leading-[32px] max-[991px]:text-center">Eilyn Jimenez</h2>
            <h3 className="mb-5 text-center tracking-[2px] uppercase hover:italic font-sans text-[13px] min-[1920px]:text-[15px] min-[1920px]:leading-[32px]">
              Founder & Creative Director
            </h3>
            <p className="font-sans text-[13px] leading-[26px] text-justify min-[1920px]:text-[15px] mb-4">
            Eilyn Jimenez is an interior designer, TV personality, and visionary Founder and Creative Director of Miami-based interior design firm, Sire Design. Eilyn is driven by a passion for the transformative power of design. With a nuanced understanding of how spaces influence emotions and well-being, Eilyn believes that our environments have the power to inspire, comfort, and energize their inhabitants, and has made it her mission to harness this ineffable power in service of her clients. Her design philosophy revolves around creating spaces that are not only functionally efficient and aesthetically pleasing, but also profoundly personal, resonating with the unique emotional landscapes of her clients.
            </p>
            <p className="font-sans text-[13px] leading-[26px] text-justify min-[1920px]:text-[15px] mb-4">
            At the heart of Sire Design is Eilyn’s commitment to building meaningful relationships with those she works with. She sees her role as not just a designer, but a storyteller who brings her clients’ narratives to life. Eilyn takes the time to truly understand her clients’ stories, souls, and dreams, ensuring that every design decision is a reflection of their identity. Her meticulous attention to detail and empathetic approach elevates and transforms spaces, expertly crafting each corner to tell a part of the client’s journey.
            </p>
            <p className="font-sans text-[13px] leading-[26px] text-justify min-[1920px]:text-[15px] mb-4">
            Eilyn’s expertise and dedication have garnered significant recognition and success. She has managed many projects across the country, showcasing her versatility and international appeal in residential, developmental, and commercial projects alike. Eilyn’s innovative designs and engaging personality have also led her to star in the Netflix show Designing Miami, alongside her designer husband, as well as a new show premiering on HGTV, Divided by Design, bringing her creative process and designs to a wider audience. Her work has been featured in esteemed publications such as The Wall Street Journal and on national platforms like The Today Show, further cementing her status as a leading figure in the interior design industry.
            </p>
          </div>
        </div>

        <TeamPageClient teamData={teamData} />
      </div>
    </main>
  );
}
