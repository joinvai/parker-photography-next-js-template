"use client";

import { ProjectInquiryForm } from "@/components/project-inquiry-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [selectedInquiry, setSelectedInquiry] = useState('project'); // Default to 'project'
  const [isHovered, setIsHovered] = useState(false);
  const [isCareersSheetOpen, setIsCareersSheetOpen] = useState(false);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <main className="min-h-screen bg-eggshell text-black p-8 pt-24 md:p-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* New Wrapper for Heading Section - Adjusted Vertical Padding */}
        <motion.div
          variants={itemVariants}
          className="px-[50px] pt-[120px] pb-[50px] text-center max-[991px]:px-[38px] max-[991px]:pt-[80px] max-[991px]:pb-[25px] max-[767px]:px-0 max-[767px]:pt-[100px] max-[767px]:pb-[50px] max-[479px]:px-[10px]"
        >
          {/* Added text-center */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[13px] leading-[26px] tracking-[2px] uppercase mb-4 text-center max-[991px]:text-left"
          >
            SIRE DESIGN STUDIO
          </motion.p>
          {/* Added text-center */}
          <motion.h1
            variants={itemVariants}
            className="font-header text-5xl md:text-5xl tracking-medium text-center"
          >
            GET IN TOUCH
          </motion.h1>
        </motion.div>

        {/* --- Rest of the page content starts here --- */}
        {/* Updated Column Widths Layout */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 md:gap-x-[100px] gap-y-12 mt-12 md:mt-16 max-md:flex max-md:flex-col max-md:gap-8" // Changed to md:grid-cols-4
        >
          {/* Left Column: Inquiry Type Selection - Spanning 2 cols (50%) */}
          <div className="space-y-2 md:col-span-2"> {/* Added md:col-span-2 */} 
            <button 
              onClick={() => setSelectedInquiry('project')}
              className={`block w-full text-left py-3 border-b ${selectedInquiry === 'project' ? 'border-black' : 'border-gray-300'} hover:border-black transition-colors font-header text-2xl max-sm:py-2`}
            >
              New Project Inquiries
            </button>
            <button 
              onClick={() => setSelectedInquiry('marketing')}
              className={`block w-full text-left py-3 border-b ${selectedInquiry === 'marketing' ? 'border-black' : 'border-gray-300'} hover:border-black transition-colors font-header text-2xl max-sm:py-2`}
            >
              Marketing/Collabs
            </button>
            <button 
              onClick={() => setSelectedInquiry('general')}
              className={`block w-full text-left py-3 border-b ${selectedInquiry === 'general' ? 'border-black' : 'border-gray-300'} hover:border-black transition-colors font-header text-2xl max-sm:py-2`}
            >
              General Questions
            </button>
          </div>

          {/* Middle Column: Phone & E-mail - 1 col (25%) */}
          <div className="space-y-6">
            <div>
              {/* Phone Heading: font-header, text-xl (20px) */}
              <p className="font-header text-xl uppercase tracking-wider mb-1">
                PHONE
              </p>
              {/* Phone Number: font-sans, text-xs (12px), uppercase */}
              <p className="font-sans text-xs leading-5 uppercase">
                305-402-4202
              </p>
            </div>
            <div>
              {/* Email Heading: font-header, text-xl (20px) */}
              <p className="font-header text-xl uppercase tracking-wider mb-1">
                E-MAIL
              </p>
              {/* Email Link: font-sans, text-xs (12px), uppercase, hover:italic */}
              <a href="mailto:info@siredesign.com" className="font-sans text-xs leading-5 uppercase hover:italic">
                info@siredesign.com
              </a>
            </div>
          </div>

          {/* Right Column: Address - 1 col (25%) */}
          <div> 
            <div>
              {/* Address Heading: font-header, text-xl (20px) */}
              <p className="font-header text-xl uppercase tracking-wider mb-1">
                ADDRESS
              </p>
              {/* Address Lines: font-sans, text-xs (12px), uppercase */}
              <p className="font-sans text-xs leading-5 uppercase">7500 NE 4TH COURT, #103</p>
              <p className="font-sans text-xs leading-5 uppercase">MIAMI FL 33138</p>
              {/* View Map Link: font-sans, text-xs (12px), uppercase, hover:italic */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="font-sans text-xs leading-5 uppercase hover:italic block mt-1">
                VIEW MAP
              </a> 
            </div>
          </div>
        </motion.div>

        {/* Forms will be conditionally rendered here based on selectedInquiry */}
        {/* TODO: Implement forms */}

        {/* REMOVED CAREERS SECTION */}
      </motion.div>
    </main>
  );
}
